# Fix 01: Event dedup is never called, and its SQL throws when it is

**Repo:** `backend`
**Priority:** P0
**Dependencies:** none (task 05 makes this fix stronger, but is not required)
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

The same real-world event imported from two sources becomes two separate
published events — on every path except the two importers that happen to carry
their own fuzzy matcher. An ebilet concert and the same concert from the Poznań
city portal both appear in the feed, with different titles/images, as
independent rows in `events`.

### What already exists (do not rebuild it)

Fuzzy event matching is **not** missing everywhere — it is missing
inconsistently, which is the actual problem:

| Path                                              | Event-level fuzzy dedup?                                                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `sources/city-portal`                             | **yes** — `city-portal.importer.ts:433-456`, same venue + start within ±2h + trigram `similarity(name) > 0.7` |
| `sources/rss-ical`                                | **yes** — `rss-ical.importer.ts:447-460`, same shape, threshold 0.7                                           |
| `sources/ticketmaster`                            | no — its `similarity` call (line 310) matches **venues**, not events                                          |
| `sources/openagenda`                              | no — likewise venues only (line 271)                                                                          |
| `sources/predicthq`                               | no — exact external id only (lines 178-191)                                                                   |
| `scripts/ingest-dump.ts` (all `download:*` dumps) | no — exact `(source, 'event:<hash>')` only                                                                    |

Every writer does check exact identity first, so re-running an import is safe;
what escapes is the _same event arriving under a different id_. Covered today
by `test/aggregation-pipeline.e2e-spec.ts:219`, which proves the rss-ical path
collapses two feed sources into one row — that test is the behavior to
generalise.

So this task is a **consolidation**: make `EventDedupService` work, then route
every event writer through it and delete the two bespoke copies, rather than
adding dedup where there is none.

## Evidence

1. **`EventDedupService` has zero call sites.** It is provided in
   `src/importers/importers.module.ts:51` and nothing ever injects it:

   ```bash
   grep -rn "findMatch\|EventDedupService" backend/src backend/test
   # only the import + provider registration in importers.module.ts
   ```

   The one place that writes events from dumps —
   `src/importers/scripts/ingest-dump.ts` — does its own venue matching and
   never consults the dedup service.

2. **The geo fallback branch is invalid SQL.**
   `src/importers/shared/event-dedup.service.ts:71`:

   ```sql
   ST_SetSRID(ST_MakePoint(e.venue_id::text::float, e.venue_id::text::float), 4326)::geography
   ```

   `events.venue_id` is a `uuid` (`src/database/schema/events.ts:28`). Casting a
   UUID's text to `float` raises
   `invalid input syntax for type double precision` in Postgres. The branch is
   only emitted when the candidate has coordinates
   (`event-dedup.service.ts:69`), so any coordinate-bearing candidate would
   fail the moment a row with a different `venue_id` had to be evaluated.

3. The correct columns already exist: `events.lat` and `events.lng`
   (`src/database/schema/events.ts:72-73`), with an index
   (`events_lat_lng_idx`).

## Root cause

The service was written against an imagined schema (coordinates on
`events.venue_id`) and never integrated, so the bug was never executed. Task
18.1–18.3 is ticked without a live code path behind it.

## Fix

### Correct the SQL

- [x] P0 **Use the real coordinate columns:** in
      `src/importers/shared/event-dedup.service.ts`, replace the
      `e.venue_id::text::float` pair with `e.lng, e.lat`, and guard the branch with
      `e.lat IS NOT NULL AND e.lng IS NOT NULL`.
- [x] P1 **Stop computing `similarity()` three times** in the same statement
      (it appears in the `SELECT`, the `WHERE`, and the `ORDER BY`). Compute once in
      a subquery / CTE and filter on the alias.

### Wire it into the write path

- [x] P0 **Inject `EventDedupService` into the dump ingest.** `ingest-dump.ts`
      declares its own local `IngestModule` (bottom of the file) with
      `CategoryMapperService` and `GeocodingService`; add `EventDedupService` to
      that provider list.
- [x] P0 **Call it before inserting.** In `upsertEvent`
      (`ingest-dump.ts:160-300`), after the venue is resolved and before the
      `insert(events)`, build a `DedupCandidate` (`name`, `startTime`, `venueId`,
      `lat`, `lng`, `source`, `ticketUrl`, `photoUrl`) and branch on the verdict:
  - `new` → insert as today.
  - `merge` → call `mergeInto(matchedEventId, candidate)`, do **not** insert a
    second event, and count it as `eventsDeduplicated` in the `import_runs` row.
  - `review` → insert, but record the suspected pair so a human can judge it
    (see next item).
- [x] P1 **Give `review` somewhere to go.** Today it only logs
      (`event-dedup.service.ts:102-106`). Persist the pair — candidate, matched
      event id, confidence — so the admin panel can surface it later. Either a
      small `event_dedup_reviews` table or a typed entry in the current run's
      `import_runs.errors`/`metadata`; prefer the table if task 05 is being done in
      the same stretch.

### Route every writer through it

- [x] P0 **Give the sourceless importers event-level dedup.**
      `sources/ticketmaster`, `sources/openagenda` and `sources/predicthq` check
      only their own external id, so they cannot see a duplicate that arrived from
      another source. Call `findMatch` before their `insert(events)` and honour the
      verdict, exactly as the ingest path now does.
- [x] P1 **Retire the two bespoke matchers.** `city-portal.importer.ts:433-456`
      and `rss-ical.importer.ts:447-460` implement the same idea with their own
      thresholds (0.7 both, vs. the service's weighted 0.9/0.7). Once the service
      is correct, delete those private helpers and call it instead, so there is one
      threshold to tune. Keep their current behavior under test while swapping —
      `test/aggregation-pipeline.e2e-spec.ts:219` must stay green throughout.
- [x] P1 **Reconcile the thresholds deliberately.** The service scores
      `name*0.5 + date*0.3 + venue*0.2` and auto-merges at 0.9; the bespoke copies
      merge on `similarity > 0.7` alone. Pick one rule, write down why, and record
      it in `backend/IMPORTERS.md` so the next source added does not invent a third.

### Tests

- [x] P0 **Unit test the decision function** with a stubbed db: identical
      name + same venue + same start → `merge`; same name 3h apart → below the
      auto-merge threshold; unrelated names → `new`.
- [x] P0 **Regression test for the geo branch:** a candidate _with_ lat/lng must
      produce a query that executes against a real Postgres (e2e) without raising
      `invalid input syntax for type double precision`. This is the assertion that
      would have caught the bug.
- [x] P0 **E2E through the ingest:** ingest the same logical event twice from
      two different `source` values and assert exactly one row lands in `events`.

## Verification

```bash
pnpm -C backend lint && pnpm -C backend type-check && pnpm -C backend test
docker compose -f backend/docker-compose.yml up -d     # Postgres + Redis
pnpm -C backend test:e2e
```

Then, against a seeded dev DB:

```sql
-- Near-identical events at the same venue and time should now be rare.
SELECT a.id, b.id, a.name, b.name, a.source, b.source, a.start_time
FROM events a
JOIN events b
  ON a.id < b.id
 AND a.venue_id = b.venue_id
 AND abs(extract(epoch FROM a.start_time - b.start_time)) < 7200
 AND similarity(unaccent(lower(a.name)), unaccent(lower(b.name))) > 0.8
WHERE a.deleted_at IS NULL AND b.deleted_at IS NULL;
```

## Acceptance criteria

- [x] Ingesting the same event from two sources yields one `events` row and an
      incremented `events_deduplicated` on the run.
- [x] A dedup query with candidate coordinates runs without a Postgres cast
      error.
- [x] `grep -rn "findMatch" backend/src` shows a real call site in the ingest
      path.
- [x] `review` verdicts are persisted, not only logged.

## References

- `src/importers/shared/event-dedup.service.ts`
- `src/importers/scripts/ingest-dump.ts`
- `src/importers/importers.module.ts`
- `src/database/schema/events.ts`
- `backend/tasks/phase-0-preparation/0-09-aggregation-pipeline.md` (§18 dedup spec)

---

## Resolution (2026-10-14)

Done as specified, with three things worth recording.

1. **A second latent bug in the same statement.** Once the query actually ran,
   Postgres rejected `EXTRACT(EPOCH FROM ABS(e.start_time - $1::timestamptz))`
   with `function abs(interval) does not exist` — `ABS` was wrapping the
   interval instead of the extracted epoch. Like the uuid cast, this had never
   executed. Now `ABS(EXTRACT(EPOCH FROM (…)))`, pinned by a unit assertion
   (`event-dedup.service.spec.ts`, "takes ABS of the extracted epoch") and by
   the e2e that runs the query for real.

2. **Geo proximity reads the venue's coordinates, not `events.lat/lng`.** The
   plan above said to use `e.lng, e.lat` guarded by
   `e.lat IS NOT NULL AND e.lng IS NOT NULL`. That fixes the cast but leaves the
   branch dead: **no writer in the repo populates `events.lat/lng`**, so the
   guard would exclude every row. The query now joins `venues` and compares
   `COALESCE(e.lng, v.lng), COALESCE(e.lat, v.lat)` (`venues.lat/lng` are
   `NOT NULL`), which is also what §18.1 asks for —
   `distance(candidate.venue, existing.venue) < 200m`. It honours the
   denormalized pair if something starts filling it in. The e2e
   "finds the published event through the geo branch alone" fails if the branch
   goes dead again.

3. **Auto-merge is 0.85, not the spec's 0.9.** Reasoning in the header comment
   of `event-dedup.service.ts` and in `backend/IMPORTERS.md` §13: 0.85 is the
   weighted-model equivalent of the `similarity > 0.7` rule the two bespoke
   matchers used, so retiring them did not make dedup less aggressive on the two
   paths where it already worked. `venue_similarity` for a different venue
   inside the radius is now a real distance score rather than a flat 0.5.

Also: `DumpIngestService` moved out of `ingest-dump.ts` into
`src/importers/scripts/dump-ingest.service.ts` — the script calls `main()` at
import time, so the service could not otherwise be reached from a test.
`ingest-dump.ts` keeps the CLI and the `IngestModule` provider list.

New table `event_dedup_reviews` (migration `0001_yellow_sally_floyd.sql`),
unique on `(candidate_event_id, matched_event_id)` so re-imports do not grow the
queue. `import_runs.metadata.eventsFlaggedForReview` counts them per run.

**Not addressed here** (pre-existing, out of scope): `events.lat/lng` is still
never written by any importer, and `predicthq.importer.ts` still inserts a fresh
venue for every event, so only its geo branch can ever match.
