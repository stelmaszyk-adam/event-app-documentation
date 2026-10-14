# Fix 03: `venue_source_mappings` has no index or unique constraint on its lookup key

**Repo:** `backend`
**Priority:** P0
**Dependencies:** none
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

Dump ingestion slows down as the table grows — the cost per event rises with
the number of rows already imported, so a 1000-event dump takes
disproportionately longer than ten 100-event dumps. Re-running the same
download can also leave duplicate mapping rows behind.

## Evidence

1. **No constraints at all** on the table —
   `src/database/schema/venues.ts`, the `venueSourceMappings` definition has no
   second `pgTable` argument, so no index and no unique index are declared:

   ```ts
   export const venueSourceMappings = pgTable("venue_source_mappings", {
     id: uuid("id").primaryKey().defaultRandom(),
     venueId: uuid("venue_id")
       .notNull()
       .references(() => venues.id, { onDelete: "cascade" }),
     source: eventSourceEnum("source").notNull(),
     externalId: varchar("external_id", { length: 500 }).notNull(),
     rawDataJson: text("raw_data_json"),
     lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
       .notNull()
       .defaultNow(),
   });
   ```

2. **`(source, external_id)` is the hot lookup key**, queried once per event
   during ingest — `src/importers/scripts/ingest-dump.ts:165-175`:

   ```ts
   const mappingExternalId = `event:${ev.externalId}`;
   const existing = await this.db
     .select()
     .from(venueSourceMappings)
     .where(
       and(
         eq(venueSourceMappings.source, source),
         eq(venueSourceMappings.externalId, mappingExternalId),
       ),
     )
     .limit(1);
   ```

   With no index this is a sequential scan per event, over a table that holds
   **one row per imported event** (plus one per venue) — so ingest is
   effectively quadratic in the corpus size. The Poznań city-portal dump alone
   carries 1037 events.

3. The same key is the documented dedup/cache key for the venue importers (the
   7-day `lastSeenAt` window described in `backend/IMPORTERS.md` §6), which read
   it on every Google Places / OSM candidate too.

4. Nothing prevents two rows with the same `(source, external_id)` — two
   concurrent runs, or a retried run, both insert.

## Root cause

The table was added for small-scale venue mapping and later reused as the event
identity store without revisiting its access pattern. (Task 05 moves events out
of it; this index is still correct and still needed for the venue rows.)

## Fix

- [x] P0 **Add a unique index** on `(source, external_id)` in
      `src/database/schema/venues.ts`:
  ```ts
  }, (table) => ({
    sourceExternalIdx: uniqueIndex('venue_source_mappings_source_external_idx')
      .on(table.source, table.externalId),
  }));
  ```
- [x] P0 **Add an index on `venue_id`** as well — `venues` cascade-deletes
      through it and several importers filter by it.
- [~] P0 **Generate and apply the migration:**
  ```bash
  pnpm -C backend db:migrate:create     # drizzle-kit generate
  pnpm -C backend db:migrate
  ```
  Commit the generated SQL alongside the schema change.
  — deferred: generated and committed (`0002_venue_source_mappings_dedup.sql`,
  `0003_volatile_maestro.sql`, journal + snapshots), but `db:migrate` was not
  run — the local Postgres is shared with concurrent agent runs, and staging and
  production are applied by the deploy job.
- [x] P0 **De-duplicate existing rows first.** A unique index will fail to
      build if duplicates are already present. Include a pre-step in the migration
      that keeps the most recently seen row per key:
  ```sql
  DELETE FROM venue_source_mappings a
  USING venue_source_mappings b
  WHERE a.source = b.source
    AND a.external_id = b.external_id
    AND (a.last_seen_at, a.id) < (b.last_seen_at, b.id);
  ```
- [x] P1 **Make the writes conflict-aware.** Every
      `insert(venueSourceMappings)` should become
      `.onConflictDoUpdate({ target: [source, externalId], set: { lastSeenAt: new Date() } })`
      so a re-run is idempotent instead of relying on the preceding SELECT.
      Call sites: `scripts/ingest-dump.ts` (two inserts, around lines 265 and 293),
      plus the `sources/*` importers that write mappings.
- [x] P1 **Fix the unscoped venue key while here.**
      `ingest-dump.ts:265` writes `externalId: 'venue:' + venueName.toLowerCase()`
      with no city in the key, so a "Stary Rynek" in two cities collides on one
      mapping — and under the new unique index that collision becomes a hard
      insert failure. Include the city slug (and ideally rounded coordinates) in
      that key.

### Tests

- [x] P0 **E2E:** ingest the same dump file twice and assert the
      `venue_source_mappings` row count is unchanged after the second pass, with
      `last_seen_at` advanced.
- [x] P0 **E2E:** two venues sharing a name in different cities both get their
      own mapping row (covers the previous item).

## Verification

```bash
pnpm -C backend type-check && pnpm -C backend test:e2e
```

```sql
-- Index present and used
EXPLAIN ANALYZE
SELECT * FROM venue_source_mappings WHERE source = 'ebilet' AND external_id = 'event:abc';
-- expect Index Scan, not Seq Scan

-- No duplicates remain
SELECT source, external_id, count(*) FROM venue_source_mappings
GROUP BY 1, 2 HAVING count(*) > 1;
```

Time a re-ingest before and after on a non-trivial dump and record both numbers
in the commit message:

```bash
time pnpm -C backend ingest:dump --path data/imports/city_portal
```

## Acceptance criteria

- [~] `venue_source_mappings_source_external_idx` exists and the ingest lookup
      uses an index scan. — deferred: the index is in the schema and in migration
      `0003`, and the e2e spec asserts it exists (and is unique) once applied,
      but no migration was run here, so the `EXPLAIN` check is unverified. It
      also needs a populated table to be meaningful: on a near-empty
      `venue_source_mappings` the planner picks a sequential scan whatever
      indexes exist.
- [x] Re-ingesting a dump twice adds zero rows.
- [x] Same-name venues in different cities no longer collide.

## References

- `src/database/schema/venues.ts`
- `src/importers/scripts/ingest-dump.ts`
- `backend/IMPORTERS.md` §6 (the 7-day `lastSeenAt` cache)

---

## Resolution (2026-10-14)

Done as specified. Five things are worth recording.

1. **The de-dup pre-step is its own migration, not an edit to the generated
   one.** `backend/CLAUDE.md` forbids hand-writing or editing a file in
   `src/database/migrations/` — `drizzle-kit` diffs against `meta/`, and CI
   re-runs `db:migrate:create` and fails on any diff. So the plan's
   "include a pre-step in the migration" became two drizzle-generated
   migrations, both registered in `meta/_journal.json`:
   - `0002_venue_source_mappings_dedup.sql` — produced with
     `drizzle-kit generate --custom` (its snapshot is a copy of `0001`'s apart
     from the chained ids, so it does not disturb the diff chain) and filled with the
     plan's `DELETE … USING` statement.
   - `0003_volatile_maestro.sql` — the plain `db:migrate:create` output for the
     two new indexes.

   Order matters: `db:sql` was not an option for the de-dup, because it runs
   *after* `db:migrate`, by which point the unique index would already have
   failed to build. Re-running `db:migrate:create` afterwards reports
   "No schema changes", so the CI drift check passes.

2. **The index is created non-concurrently, on purpose.**
   `drizzle-kit migrate` wraps a migration in a transaction and
   `CREATE UNIQUE INDEX CONCURRENTLY` cannot run inside one; every existing
   index in this repo (`0000_baseline.sql`, `0001`) is created the ordinary
   way. A `CONCURRENTLY` build would have to be a manual, out-of-band step,
   which is a worse trade for a table this size than a brief write lock.

3. **All 27 mapping writes go through one helper, not 27 inline
   `.onConflictDoUpdate` chains.** `src/importers/shared/venue-source-mapping.ts`
   exports `upsertVenueSourceMapping(db, values)`; ten importers plus
   `dump-ingest.service.ts` call it. Each importer still does its own
   `SELECT`-then-insert for its own counters, but correctness no longer depends
   on that read. The conflict branch refreshes **only** `last_seen_at`:
   `venue_id` and `raw_data_json` stay with the first writer, because a later
   run resolving the same external id to a different venue is a dedup question,
   not something to overwrite silently — that is a deliberate narrowing of the
   plan's wording, asserted by a unit test and by an e2e case.

4. **The plan's line references were stale, and one call-site count was low.**
   `ingest-dump.ts:165-175/265/293` is now
   `src/importers/scripts/dump-ingest.service.ts` (fix 01 moved the service out
   of the CLI script), and the file has **three** mapping inserts, not two — the
   third is the merge path fix 01 added. Across `sources/*` there were 24 more,
   in ten importers, including `rss-ical`'s `rss_domain:<domain>` feed
   registry key, which the plan did not mention and which the unique index now
   also protects.

5. **The venue key is scoped by city *and* location.**
   `venueMappingExternalId(citySlug, name, coords)` builds
   `venue:<city>:<name>:<lat>,<lng>` with coordinates rounded to three decimals
   (~110 m, the same order as the 100 m radius the venue-dedup query uses), so
   re-geocoding a venue a few metres away keeps its key while two same-named
   venues in one city get their own. The name, never the cell, is what gets
   trimmed to fit `varchar(500)`.

### Tests

- `src/importers/shared/venue-source-mapping.spec.ts` (8 cases, runs under
  `pnpm test`): renders the upsert's SQL with `.toSQL()` against an unconnected
  `postgres()` client and asserts the `ON CONFLICT` target is exactly
  `("source","external_id")` — a mismatch there is not a type error but a
  runtime "no unique or exclusion constraint matching the ON CONFLICT
  specification" — that the update touches only `last_seen_at`, and the key
  builder's city scoping, stability, jitter tolerance and length cap.
- `backend/test/venue-source-mapping.e2e-spec.ts` (5 cases, needs a database,
  **not run here**): both e2e cases the plan asks for (re-ingesting the same
  dump adds no rows and advances `last_seen_at`; same-named venues in Poznań
  and Wrocław get their own rows pointing at distinct venues), plus the index
  declaration (`pg_indexes`, unique), the helper's conflict behaviour against
  the real constraint, and a bare duplicate insert being rejected.

### Deliberately left out

- **Applying the migration** (`db:migrate`) — the local Postgres is shared with
  other concurrent agent runs; staging and production get it from the deploy
  job. Consequently the `EXPLAIN ANALYZE` index-scan check and the
  before/after re-ingest timings the Verification section asks for are not
  recorded: both need a migrated, populated database, and on a small table the
  planner prefers a sequential scan regardless of the index.
- **`openagenda.importer.ts`'s `venue:openagenda:<name>` key** is unscoped by
  city in exactly the way the dump key was. It is now safe rather than fixed:
  `upsertVenueSourceMapping` turns the collision into "reuse the first venue's
  mapping row" instead of a unique violation. Scoping it properly is a
  behaviour change to a second importer and belongs in its own fix.
- **Backfilling old `venue:<name>` rows** to the new city-scoped key. The
  de-dup migration keeps one row per old key; existing rows keep their old
  external id, and only newly created venues get the new form. Nothing reads
  these venue keys back by name, so a rewrite would be churn.
