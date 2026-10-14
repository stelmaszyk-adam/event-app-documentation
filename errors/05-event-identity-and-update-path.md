# Fix 05: Events have no identity table, are never updated, and never disappear

**Repo:** `backend`
**Priority:** P1
**Dependencies:** `03-venue-source-mappings-missing-index.md` (same table and migration area — do it first)
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

Three user-visible failures from one root cause:

1. **Stale content.** A re-download never corrects a changed title, start time,
   image or ticket URL. The first version imported is the version users see
   forever.
2. **Rescheduled events appear twice.** Move a concert from the 3rd to the
   10th and the next import creates a second event; the original keeps showing
   until its old date passes.
3. **Cancelled events stay published.** An event pulled from the source remains
   in the feed until its start time elapses.

## Evidence

1. **Events are tracked in the _venue_ mapping table.** There is no
   `event_source_mappings` table; `src/importers/scripts/ingest-dump.ts:165`
   synthesises a key instead:

   ```ts
   const mappingExternalId = `event:${ev.externalId}`;
   ```

   and stores the real event id inside a JSON blob
   (`ingest-dump.ts:293-301`, `rawDataJson.eventId`). Querying events by source
   therefore means string-prefix matching and JSON parsing.

2. **Ingest is insert-only.** `ingest-dump.ts:176-184` — when the mapping
   already exists it bumps the timestamp and returns, never comparing or
   writing event fields:

   ```ts
   if (existing[0]) {
     await this.db
       .update(venueSourceMappings)
       .set({ lastSeenAt: new Date() })
       .where(eq(venueSourceMappings.id, existing[0].id));
     return { eventCreated: false, venueCreated: false };
   }
   ```

3. **The external id hashes the start time**, so a reschedule is a new
   identity — `src/importers/download/shared/normalize.ts:71-78`
   (`stableExternalId`) is fed `[name, start.toISOString(), venueName, ticketUrl]`
   by `fromJsonLdEvent` and `normalizeManual`. `ticketUrl` is in the basis too,
   so a tracking-parameter change also forks the identity.

4. **Staleness only looks backwards.**
   `src/importers/shared/staleness.service.ts` soft-deletes events whose
   `end_time` (or `start_time + 8h`) is already past, and flags venues unseen
   for 90 days. Nothing acts on an event that vanished from its source while
   still in the future.

## Root cause

No stable per-source event identity, so the pipeline cannot tell "the same
event again" from "a new event" — which makes updating and expiring impossible.

## Fix

This is one coherent change; keep it in a single commit with its migration.

### Give events their own identity table

- [x] P0 **Create `event_source_mappings`** in `src/database/schema/` with:
      `id`, `event_id` (uuid → `events.id`, cascade delete), `source`
      (`eventSourceEnum`), `external_id` (varchar 500), `raw_data_json`,
      `first_seen_at`, `last_seen_at`, and a **unique index on
      `(source, external_id)`** plus an index on `event_id`. Mirror the style of
      `venueSourceMappings` in `src/database/schema/venues.ts`.
- [~] P0 **Migrate the existing rows** out of `venue_source_mappings`: every
      row whose `external_id` starts with `event:` carries its event id in
      `raw_data_json->>'eventId'`. Move them, then delete the originals. Include
      this as SQL in the generated migration. — deferred: the migration exists
      (`0005_event_identity_backfill.sql`, generated with
      `drizzle-kit generate --custom`) but has only been verified by inspection
      against the existing migrations; applying it and checking the backfill
      needs a database that is not shared with other concurrent work.
- [x] P0 **Point the ingest at the new table** — replace the
      `venueSourceMappings` lookup and both event-related inserts in
      `ingest-dump.ts` with `eventSourceMappings` equivalents, using
      `onConflictDoUpdate` on `(source, external_id)`.

### Make the identity stable

- [x] P0 **Prefer the source's own identifier** over a content hash in
      `stableExternalId` callers:
  - Ticketmaster → the Discovery API `event.id`
    (`download/parsers/ticketmaster.ts` already has it on `TmEvent`).
  - ebilet / goout / portals → the canonical event URL path, with query string
    and tracking parameters stripped.
  - Only when neither exists, fall back to the hash — and **drop `startTime`
    and `ticketUrl` from the hash basis**, keying on
    `[name, venueName, calendarDate]` so a time change updates rather than forks.
- [x] P1 **Normalise URLs before they enter any key:** strip `utm_*`, `fbclid`,
      trailing slashes, and the scheme's `www.` prefix. One helper in
      `download/shared/normalize.ts`, used by both the id basis and `ticketUrl`
      comparison.

### Update on re-see

- [x] P0 **Compare and write changed fields** when a mapping already exists,
      instead of returning early: `name`, `start_time`, `end_time`, `photo_url`,
      `ticket_url`, `category`, `description`. Record what changed in the run's
      `import_runs.metadata` (e.g. `eventsUpdated`, with a per-field tally) and add
      an `events_updated` counter alongside `events_new` /
      `events_deduplicated`.
- [x] P1 **Never let an import overwrite human/organizer edits.** Events have
      `is_native` and `is_approved` (`src/database/schema/events.ts`); an imported
      update must not clobber a claimed or organizer-owned event. Define the rule
      explicitly — suggested: skip field updates when `is_native = true`, and skip
      fields a moderator has touched if that provenance exists.

### Expire what disappeared

- [x] P0 **Mark the run's sighting set.** Each run already touches
      `last_seen_at` for everything it saw; add a `StalenessService` pass that
      soft-deletes (or sets `status`/`cancellation_reason` on) future events whose
      mapping has not been seen for N consecutive runs of that `(source, city)`.
- [x] P0 **Guard against a bad run wiping the feed.** If a download returns
      drastically fewer events than the previous successful run for the same
      source+city (suggested: < 50%), mark the run `failed` and **skip** the
      disappearance pass. A site layout change must not look like "everything was
      cancelled".
- [x] P1 **Distinguish cancelled from removed** where the source says so —
      `events.cancellation_reason` exists (`schema/events.ts:67`); Ticketmaster
      exposes a status on the event payload. Use it rather than a silent delete.

### Tests

- [x] P0 **E2E — update path:** ingest a dump, mutate the title and image in
      the dump file, re-ingest, assert the same `events.id` now carries the new
      values and `events_updated = 1` with `events_new = 0`.
- [x] P0 **E2E — reschedule:** same event with a changed `startTime` updates
      one row rather than creating a second.
- [x] P0 **E2E — disappearance:** ingest two events, re-ingest a dump
      containing only one, assert the missing future event is soft-deleted after
      the configured N runs and not before.
- [x] P0 **E2E — collapse guard:** a dump with 10% of the previous count leaves
      all existing events untouched and marks the run `failed`.
- [x] P0 **E2E — native events are protected:** an `is_native = true` event is
      not modified by an import touching the same identity.
- [x] P0 **Unit — id stability:** the same source event with a changed start
      time, and with `?utm_source=x` appended to its URL, both yield the same
      external id.

## Verification

```bash
pnpm -C backend type-check && pnpm -C backend test && pnpm -C backend test:e2e
pnpm -C backend ingest:dump --source city_portal   # twice; second pass must report updates, not inserts
```

```sql
SELECT source, status, events_new, events_updated, events_deduplicated, metadata
FROM import_runs ORDER BY started_at DESC LIMIT 5;

-- No future events whose mapping went unseen
SELECT count(*) FROM events e
JOIN event_source_mappings m ON m.event_id = e.id
WHERE e.deleted_at IS NULL AND e.start_time > now()
  AND m.last_seen_at < now() - interval '14 days';
```

## Needs human / staging

- ~~Choose N (consecutive unseen runs before expiry) and the collapse
  threshold.~~ Taken as suggested — `UNSEEN_RUNS_BEFORE_EXPIRY = 3`,
  `DOWNLOAD_COLLAPSE_RATIO = 0.5`, plus a third constant the plan did not
  anticipate (`MAPPING_LIVE_WINDOW_DAYS = 14`). All three are in
  `staleness.service.ts` with their reasoning and are recorded in
  `backend/IMPORTERS.md` §14, flagged to be revisited with task 08: N is a count
  of runs, so it only means something relative to how often a run happens.
- **Still needs a database:** applying `0004`/`0005` and checking the backfill
  (see the Resolution below for what it covers and what it cannot), and running
  `test/event-identity.e2e-spec.ts`.

## Acceptance criteria

- [~] `event_source_mappings` exists, is the only event identity store, and the
      old `event:` rows are migrated out of `venue_source_mappings`. — deferred:
      the table, every writer and the migration are in place, but the data move
      itself has not been run against a database.
- [x] Re-ingesting a changed dump updates events in place; counts show
      `events_updated`.
- [x] A rescheduled event stays one row.
- [x] A future event removed from its source leaves the feed; a collapsed
      download does not trigger that.
- [x] `backend/IMPORTERS.md` documents the new table, counters and thresholds
      (§14).

## References

- `src/importers/scripts/ingest-dump.ts`
- `src/importers/download/shared/normalize.ts`
- `src/importers/shared/staleness.service.ts`
- `src/database/schema/events.ts`, `src/database/schema/venues.ts`
- `backend/tasks/phase-0-preparation/0-09-aggregation-pipeline.md`

---

## Resolution (2026-10-14)

Done as specified, plus four things the plan did not anticipate. Every
`file:line` in the sections above predates fixes 01-03 and has drifted; the
ingest/upsert code quoted as `ingest-dump.ts:160-300` now lives in
`src/importers/scripts/dump-ingest.service.ts`.

### The identity decision, and the date-only question fix 02 handed over

`eventExternalId` (`download/shared/normalize.ts`) picks, in descending order of
trust: the source's own id → the event's own URL path → a hash of
`[name, venueName, Warsaw calendar date]`. The hash basis drops `startTime` and
`ticketUrl` exactly as asked.

The open question was the one fix 02 deliberately left here: a bare
`2026-08-14` parsed as UTC midnight via `Date.parse`, while a dotted
`14.08.2026` defaulted to Warsaw noon. **Both now resolve to Europe/Warsaw
noon**, and the branch returns its result straight through (`null` included) so
`2026-02-31` is rejected rather than rolled over into March the way `Date.parse`
does. Three reasons:

1. The two strings mean the same thing. A Polish source writing a bare date is
   not saying "01:00".
2. UTC midnight was a live bug independent of identity: the event rendered at
   "02:00" on the listing, and `StalenessService`'s `start_time + 8h` buffer
   retired it before 10:00 that morning — an all-day event vanished before the
   day was over.
3. Noon is the furthest point from both day boundaries, so no DST offset can
   push the event onto the neighbouring calendar day, which is the one thing a
   date-only source does tell us.

**The reason this is safe to change at the same time as the key:** the hash
basis is the *Warsaw calendar date*, not the instant. UTC midnight and Warsaw
noon on the same date are the same Warsaw day, so correcting the timezone
re-keys nothing. Had the basis stayed `start.toISOString()`, these two changes
would have had to ship apart.

### What re-keying costs, and what the backfill can and cannot do

`0004_swift_layla_miller.sql` creates the table. `0005_event_identity_backfill.sql`
(`drizzle-kit generate --custom`, split off so the table exists when it runs —
the same 0002/0003 split fix 03 used) moves the old rows and then deletes every
`event:` / `poznan_event:` row from `venue_source_mappings`. A second
`db:migrate:create` reports "No schema changes".

**Backfilled:** every `event:`/`poznan_event:` row whose `raw_data_json` carries
a uuid-shaped `eventId` that still exists in `events`. `external_id` is the old
key with the prefix stripped, which is exactly what every writer now produces,
so **any event the source identifies by its own id keeps its identity across
this change** — Ticketmaster, PredictHQ, OpenAgenda, ebilet state ids, the
Poznań portal. `first_seen_at` and `last_seen_at` both take the old
`last_seen_at` (the old table had no first sighting, and `now()` would have made
every migrated mapping look brand new to the staleness window).

**Not recoverable:**

- Rows with no uuid-shaped `eventId` in the payload, or one pointing at a
  deleted event. They identify nothing, and are deleted rather than migrated.
- The identity of events that were keyed by the **old hash** (a scraped listing
  with neither a source id nor a per-event URL). Their migrated mapping keeps
  the old key and will never be seen again; the next run computes the new key,
  `EventDedupService` matches the existing row (identical name, venue and start
  → confidence ~1.0, well past the 0.85 auto-merge cut-off) and
  `upsertEventSourceMapping` attaches the new key to that same event. So the
  event is not duplicated — it gains a second, live mapping and the dead one
  simply ages out. This is the one place the fix leans on fix 01 being in place.
- `missed_runs` starts at 0 and `city` stays NULL for migrated rows, which is
  deliberate: a NULL city keeps a legacy mapping out of every `(source, city)`
  sighting sweep, so no migrated row can trigger an expiry.

I did **not** try to recompute the new hash in SQL. It would need `pgcrypto`,
the venue name as the importer saw it (not as `venues.name` stores it, truncated
to 255) and a Warsaw date conversion, and a near-miss would silently bind a key
to the wrong event. Losing the sighting history of hash-keyed rows is the
cheaper mistake.

### Withdrawal has to be reversible — the plan does not say so

The checklist only asks for the delete. Implemented literally, the identity
table becomes a one-way door: the key still resolves on the next run, so no new
event is ever minted, and the row stays invisible forever. Three realistic
triggers — three flaky runs (a paginated feed dropping a page is exactly what
the unseen-streak rule exists to tolerate, and the collapse guard only catches
*aggregate* collapse), a Ticketmaster `cancelled` → `rescheduled` flip, and a
recurring event at a stable URL whose previous occurrence was retired for being
over, with the next date then written onto that same row.

So a re-see of a retired event whose start is still in the future clears
`deleted_at`, `is_cancelled` and `cancellation_reason` along with any changed
fields. A `rejected` event, or one a moderator has touched (`moderated_at`), is
never revived: that would undo a human decision, which is the same line
`isImportProtected` draws. A past occurrence stays buried — it was retired for
being over, not for disappearing.

### Four more things the plan got wrong or did not cover

1. **"Point the ingest at the new table" was not enough.** The acceptance
   criterion says the table must be the *only* event identity store, and five
   other writers also wrote `event:` keys into `venue_source_mappings`:
   `city-portal`, `ticketmaster`, `rss-ical`, `openagenda` and `predicthq`. All
   six now share `src/importers/shared/event-source-mapping.ts`, built in the
   shape of fix 03's `venue-source-mapping.ts`. Its `ON CONFLICT` branch does
   more than the venue one: it also resets `missed_runs` (a sighting is what
   ends an unseen streak) and repoints `event_id` (a dedup merge changes which
   event a key belongs to). The venue path is untouched and still works — fix
   03's own e2e covers it, retargeted where it asserted on event rows.

2. **"N consecutive runs" needs a second threshold the plan does not mention.**
   An event can hold mappings from several sources, so one source dropping it is
   no evidence it is gone. The expiry condition is therefore "no mapping of this
   event is still *live*", where live means `missed_runs < N` **and** seen within
   `MAPPING_LIVE_WINDOW_DAYS` (14, matching the Verification query above). The
   time half is what stops a migrated mapping — `missed_runs = 0` forever,
   because its NULL city keeps it out of every sweep — from blocking its own
   event's expiry permanently.

3. **The collapse guard is not sufficient on its own.** A run that recorded any
   error (or, for `rss_feed`, any failed feed) has an incomplete sighting set:
   an event the source still lists was simply never looked at, and its
   `missed_runs` would grow for a reason that has nothing to do with the source.
   The sweep is skipped in that case too, recorded as
   `metadata.sightingSetComplete`. Skipping costs a delayed withdrawal; acting
   on a partial set costs a wrong one.

4. **The run's start time cannot come from `import_runs.started_at`.** That is
   the database's `now()`, while mapping `last_seen_at` is written from the
   application clock, and the sweep compares the two — any skew would make a
   run's own sightings look like misses. Both services now pass their own
   `new Date()` taken before the loop.

Also worth knowing: Ticketmaster's 6-hour `last_seen_at` short-circuit on events
is **gone**. It saved no API quota (the payload is already fetched when the
check runs) and skipped precisely the comparison that keeps a title or start
time current. The venue lookup is unaffected.

### Deliberately left out

- **`venue_id` is never updated on a re-see.** An event moving venue is a dedup
  question, not a field edit, and the plan's field list does not include it.
- **No per-field moderation provenance.** The plan suggests skipping "fields a
  moderator has touched if that provenance exists" — it does not exist in the
  schema. The rule is therefore all-or-nothing and stated once in
  `isImportProtected`: an import may only revise rows an import created
  (`is_native = false` and no `created_by_user_id` / `submitted_by_user_id`).
  `moderated_at` deliberately does *not* protect, or approving an imported event
  would freeze it against every future correction.
- **Per-feed granularity for `rss-ical`.** It writes mappings under `rss_feed`
  or `ical_feed` depending on the feed extension while the run is always
  `rss_feed`, so the pipeline sweeps both sources for one run. One feed quietly
  serving an empty document still grows its events' streaks, bounded only by the
  aggregate collapse guard. Noted in `IMPORTERS.md` §14 as work for fix 09.
- **`events.lat/lng` is still never written by any importer** (carried over from
  fix 01's note), and `predicthq` still creates a fresh venue per event.

### One side effect a reviewer should know about

`predicthq` only ever wrote *event* mapping rows — it creates a venue per event
and never registered it in `venue_source_mappings`. With the event rows gone
from that table, its venues now have no venue-level sighting at all, so
`StalenessService.markStaleVenues` will flag them (`trust_level = 'flagged'`,
which only deprioritises them in search) as soon as they have no upcoming event,
rather than 90 days after the last event sighting. That is arguably the correct
reading of "no upcoming events and no source has seen this venue", and these are
throwaway per-event venues, so it is left as is. Giving `predicthq` a real venue
mapping means first fixing its create-a-venue-per-event behaviour, which is
fix 09's territory.

### Found by review, after the first pass

A fresh-context review of the diff caught four defects worth recording, all now
fixed and covered:

1. **The sweep's row counts were always zero.** `db.execute()` with no field
   mapping hands back postgres.js's own result, which reports the affected-row
   count as **`count`**, not `rowCount` (it is also an array, so a bare
   `.length` reads 0 without a `RETURNING`). `StalenessService` had been reading
   `rowCount` since long before this task — harmless while the numbers were only
   logged, fatal once the disappearance pass acted on them:
   `metadata.eventsExpired` would have been permanently 0 and the e2e assertion
   could never pass. One `affectedRows()` helper now reads `count`, falls back to
   `rowCount` for a `node-postgres` connection, and is pinned by specs using
   both result shapes. The two older passes were silently wrong too and are
   fixed by the same helper.
2. **`rss-ical` counted a placeholder venue as an event found.** A pre-existing
   miscount that became load-bearing: `events_found` is the collapse guard's
   baseline, so a run that created placeholder venues inflated it and could make
   the *next healthy* run look collapsed.
3. **OpenAgenda and PredictHQ validated the payload before recording the
   sighting.** An event the source still lists, whose title or start time was
   momentarily unreadable, recorded no sighting, grew its unseen streak and
   would be withdrawn after three such runs — without pushing an error, so
   `sightingSetComplete` stayed true. Both now record the sighting first, as
   Ticketmaster already did.
4. **The migration comment overclaimed.** "Exactly what every writer now
   produces" is true only of the five API/feed importers; keys minted by
   `normalize.ts` change in this same commit. The comment now says which
   survive, which are re-keyed, and why the dedup merge is the recovery path.

Also from the review: `ImporterService` now resolves one spelling of the city
for the run row, the guard and the sweep (the importers write `cityConfig.name`
while the sweep used the raw option), and the two remaining race/scope caveats —
unserialised overlapping runs, and `city` being single-valued per mapping — are
written up in `IMPORTERS.md` §14 under Known limitations.

### Verification

`lint`, `type-check` and `test` all pass in the worktree: 53 suites, 560 tests,
up from 49/489. New unit specs: `download/shared/event-identity.spec.ts`,
`download/parsers/ticketmaster.spec.ts`, `shared/event-source-mapping.spec.ts`,
`shared/staleness.service.spec.ts`, plus date-only cases in
`download/shared/normalize.spec.ts`.

`test/event-identity.e2e-spec.ts` (update, no-op ticket-URL change, reschedule,
disappearance over four runs and the revival that follows, collapse guard,
source-declared cancellation and un-cancellation, native protection) is
**written but unexecuted** — the local Postgres was shared
with concurrent work, so neither it nor the migrations were run. Note that the
e2e fixtures use city `krakow` and one source per scenario on purpose: the
sweep mutates by `(source, city)`, so `event-dedup.e2e-spec.ts` (`poznan`) and
these cannot disturb each other.
