# Fix 09: Two parallel importer stacks, with Ticketmaster implemented twice

**Repo:** `backend`
**Priority:** P3
**Dependencies:** `05-event-identity-and-update-path.md` (consolidate onto the corrected write path, not the current one)
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

Every fix to the import logic has to be made twice, and the two
implementations have already drifted. A reader cannot tell which path produced
a given row in `events`.

## Evidence

### Two write paths

1. **`download/*` → JSON dump on disk → `ingest:dump` → DB.** Normalisation in
   `download/shared/normalize.ts`, venue matching and insertion in
   `scripts/ingest-dump.ts`.
2. **`sources/*` → straight to the DB.** Each importer under
   `src/importers/sources/` does its own normalisation, dedup and upsert, wired
   through `importer.service.ts` and `run-importer.ts`.

Two different `DownloadSource` / `EventSource` vocabularies, two category code
paths, two venue-matching implementations, two sets of counters.

### Ticketmaster exists in both, with different behavior

|             | `download/parsers/ticketmaster.ts`                          | `sources/ticketmaster/ticketmaster.importer.ts`                      |
| ----------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| Date window | none — unbounded, capped at 1000 by deep paging (lines 6-8) | `now … +90d`, explicit `startDateTime`/`endDateTime` (lines 131-132) |
| Output      | dump file, then `ingest:dump`                               | direct DB write                                                      |
| Caching     | none                                                        | 6h TTL (line 80)                                                     |

Fixing the truncation from task 06 in one of them leaves the other wrong.

### Duplicated per-city runners

`shared/run-listing-download.ts` already encapsulates the
resolve-cities → download → `writeDump` → print-summary loop, and ebilet/goout
use it. But `download-poznan.ts` (65 lines), `download-warsaw.ts` (128),
`download-wroclaw.ts` and `download-ticketmaster.ts` (58) each hand-roll that
same loop with slightly different logging, different `skippedNoDate` handling,
and in Poznań's case its own inline dedup `Set`.

### Dead or orphaned pieces

- `EventDedupService` — registered, never called (see task 01).
- `StalenessService` — no caller (see task 08).
- `sources/overture-maps`, `sources/dane-gov`, `sources/wikidata` etc. — confirm
  which are reachable from `run-importer.ts`'s `SUPPORTED_SOURCES` list
  (lines 13-24): `dane_gov` and `overture_maps` do not appear in it.
- `events.lat` / `events.lng` (`schema/events.ts:72-73`) with an index, never
  written by `ingest-dump.ts`; geo search reads `venues.lat/lng` instead
  (`src/events/events.service.ts:536,707`). Either populate them or drop the
  column and index.

## Fix

A refactor, not a behavior change: the observable output must be identical
except where an earlier task deliberately changed it. Do it **after** tasks
01–05 so there is test coverage to refactor against.

### Pick one pipeline

- [x] P0 **Standardise on `download → NormalizedEvent → single ingest`.** The
      dump step is worth keeping: it is replayable, diffable, reviewable before it
      touches the DB, and testable from fixtures.
- [x] P0 **Extract the ingest out of the script.** `scripts/ingest-dump.ts`
      currently declares its own `@Module` and `DumpIngestService` inline at the
      bottom of a 398-line file. Move the service into
      `src/importers/ingest/` as a normal provider in `importers.module.ts`, leaving
      the script as a thin CLI wrapper.
- [x] P0 **Make `sources/*` emit `NormalizedEvent[]`** and hand it to that one
      ingest service, instead of each writing to `events` itself. Venue-only
      importers (Google Places, OSM, Geoapify, Foursquare, Wikidata) keep their
      venue upsert path — the consolidation is about the **event** write path.
- [x] P0 **Collapse the duplicate Ticketmaster.** Keep one client; it should
      support both "write a dump" and "ingest directly". Carry over whichever
      behaviors are better from each: the explicit date window and the 6h cache
      from `sources/`, the dump output from `download/`.

### Collapse the per-city runners

- [x] P1 **Generalise `run-listing-download.ts`** into one runner taking
      `{ source, fetch(city, window), defaultCity }`, and reduce
      `download-poznan|warsaw|wroclaw|ticketmaster.ts` to a few lines each. Keep
      the `pnpm download:*` script names unchanged — they are documented in
      `IMPORTERS.md` and used by hand.
- [x] P1 **One summary shape** for all of them (`DownloadSummary` in
      `download/shared/types.ts` already defines it) so logs are comparable, and
      Poznań's ad-hoc dedup `Set` moves into the shared runner.

### Remove the dead weight

- [x] P1 **Resolve each orphan explicitly** — wire it up, or delete it, and say
      which in the commit message. Do not leave a third state.
- [x] P1 **Decide `events.lat/lng`:** populate them during ingest (and use them
      in dedup, per task 01) or drop the column plus `events_lat_lng_idx` in a
      migration. Populating is preferable — it makes events geo-queryable
      independently of their venue.
- [x] P1 **Unify the source enums.** `DownloadSource`
      (`download/shared/types.ts`) and `eventSourceEnum`
      (`src/database/schema/enums.ts`) overlap but differ;
      `ingest-dump.ts:38-43` bridges them with a runtime throw. Derive one from the
      other so an unsupported source is a compile error.

### Documentation

- [x] P0 **Rewrite `IMPORTERS.md` §11** (the source-files table) to describe one
      pipeline, and state plainly which command to use for events vs. venues. The
      current document describes the `sources/*` path in detail and barely mentions
      `download:*`, which is what actually produced the dumps in `data/imports/`.

### Tests

- [x] P0 **Characterisation first.** Before refactoring, snapshot the current
      output: run each `download:*` against a fixture and store the resulting
      `NormalizedEvent[]`. The refactor must reproduce those snapshots byte for
      byte (modulo `fetchedAt`). This is the safety net that makes a P3 refactor
      safe to accept.
- [x] P0 **Keep the task 07 suites green** throughout; no test may be skipped
      or weakened to accommodate the new structure.

## Verification

```bash
pnpm -C backend lint && pnpm -C backend type-check && pnpm -C backend test && pnpm -C backend test:e2e
pnpm -C backend openapi:export && git -C backend diff --exit-code docs/openapi.json
```

The OpenAPI contract must not change — this task touches no HTTP surface. If
the admin trigger endpoint from task 08 has landed, that diff belongs to that
task, not this one.

Then re-run one download per source and diff against the pre-refactor dump:

```bash
pnpm -C backend download:poznan && pnpm -C backend download:ebilet --city poznan
```

## Acceptance criteria

- [x] One event write path; no module outside `src/importers/ingest/` inserts
      into `events`.
- [x] Exactly one Ticketmaster client.
- [x] `download-poznan|warsaw|wroclaw|ticketmaster.ts` contain no copy of the
      city loop.
- [x] Every orphaned provider is either wired up or gone.
- [~] Characterisation snapshots are unchanged; `docs/openapi.json` is unchanged.
  — deferred: `docs/openapi.json` verified unchanged. Snapshots were written
  _during_ this task (none existed before), so they pin the output from here
  rather than proving it against the pre-refactor code; the pre-existing
  field-level parser specs did that and all passed unmodified. The one
  deliberate output change is the Ticketmaster dump, which gains
  `description`, `price` and `venueExternalId` — see the Resolution.
- [x] `IMPORTERS.md` describes the single pipeline accurately.

## References

- `src/importers/scripts/ingest-dump.ts`
- `src/importers/download/shared/run-listing-download.ts`
- `src/importers/download/parsers/ticketmaster.ts` vs. `src/importers/sources/ticketmaster/ticketmaster.importer.ts`
- `src/importers/scripts/run-importer.ts` (`SUPPORTED_SOURCES`)
- `src/importers/importer.service.ts`
- `backend/IMPORTERS.md`

---

## Resolution (2026-10-15)

### What is now one thing

**One event write path.** `src/importers/ingest/` is new and holds three
providers of `ImportersModule`:

- `event-ingest.service.ts` — `EventIngestService`, the **only** module that
  inserts into `events` from an import. It owns the whole sequence: identity
  lookup → sighting → source-declared cancellation → field write-back → venue
  placement → cross-source dedup → insert → mapping, and returns one
  `EventIngestStats` whatever ran.
- `venue-resolver.service.ts` — the one `ST_DWithin` + `similarity()` placement
  query, with the real per-source differences declared as options
  (`GEOCODED_VENUE` for dumps and the municipal portals, `coordinateVenue()` for
  APIs that ship coordinates, `{ venueId }` for RSS/iCal's per-feed placeholder,
  `{ alwaysInsert, cityCenterFallback }` for PredictHQ).
- `normalized-event.ts` — `NormalizedEvent` plus the **single source
  vocabulary**: `EventSource` is the DB enum and `DownloadSource` is
  `Extract<EventSource, …>`, so a dump source the database does not know is a
  compile error. `asEventSource` stays as the runtime guard for JSON read off
  disk. `download/shared/types.ts` re-exports these, so the ~30 existing imports
  did not move.

`events`-inserting code deleted from five importers: `ticketmaster`,
`city-portal`, `openagenda`, `predicthq`, `rss-ical`. Each is now a fetcher that
returns `NormalizedEvent[]` and calls the ingest. `grep -rn 'insert(events)' src`
inside `src/importers/` returns exactly one hit.

**One Ticketmaster.** `download/parsers/ticketmaster.ts` is the only client;
`sources/ticketmaster/ticketmaster.importer.ts` went from 591 lines to ~115 and
is a thin adapter over it. The surviving client keeps the window + weekly
slicing + deep-paging warnings + cancellation detection from the download copy,
and gained from the `sources/` copy: `priceRanges[0].min` → `price`,
`info`/`pleaseNote` → `description`, `_embedded.venues[0].id` →
`venueExternalId`, the 16:9-preferring image choice, and 429 retries (expressed
as `fetchText({ retries, retryDelayMs })`, since `isRetryable` already covers
429 and 5xx). Its bespoke 200ms throttle is gone in favour of `fetchText`'s
2s/host one — slower than Discovery's 5 req/sec allowance but one scheduler for
every source.

**One per-city download loop.** `runCityDownload` in
`download/shared/run-listing-download.ts` takes `{ source, fetch(city, window),
defaultCity, supportedCities, windowAppliedByFetch }`.
`download-poznan|wroclaw|ticketmaster.ts` are 11–50 lines, `download-warsaw.ts`
is two calls (it writes two dumps, `city_portal` and `dane_gov`). Poznań's inline
dedup `Set` became `dedupeByExternalId` in the shared runner and now applies to
every download — a dump carrying the same `externalId` twice would otherwise
reach the ingest as an _update_ of its own first copy. `DownloadSummary` gained
`skippedDuplicate` and every download prints the same line (including Warsaw's
"…and N more errors" truncation, which only it had).

**One category table per source.** PredictHQ's private `PREDICTHQ_CATEGORY_MAP`
moved into `category-mapper.service.ts` as a `predicthq` vocabulary with the same
entries; Ticketmaster's private 5-entry `SEGMENT_MAP` is gone in favour of the
central `ticketmaster` vocabulary, which already covered all five segments plus
~70 genres. Every writer now goes through `mapEventCategory(source, …)` and
every run reports `unmappedCategoryHints` / `genericCategoryHints`, which only
the dump path did.

**One stats adoption.** `ImporterService.runPipeline` keeps its signature and
its result shape; the five near-identical event-source `case` bodies collapsed
into one `adopt(stats)`. The disappearance sweep now iterates
`stats.mappingSources` — what the run actually wrote — instead of hardcoding
`['rss_feed', 'ical_feed']` for `rss_feed` runs.

### What the earlier fixes had already unified

Worth stating, because the plan above was written before them and overstates
what was left: `EventDedupService` was already wired into all six writers (01),
`DumpIngestService` was already extracted out of `ingest-dump.ts` into
`scripts/` (01, so this task only moved it to `ingest/` and slimmed it from 547
to ~165 lines by handing the per-event work to `EventIngestService`), wall-clock
dates already went through `warsaw-time.ts` (02), every venue-mapping write
already went through `venue-source-mapping.ts` (03), the per-source category
vocabularies already lived in one service (04), all six writers already used
`event_source_mappings` and `normalize.ts` already owned identity (05), and both
Ticketmaster clients were already window-aware (06) — which is what made their
duplication so stark.

Also already dead on arrival in the plan: `EventDedupService` and
`StalenessService` are no longer orphans (01 and the 05/08 work wired them), and
`wikidata` is in `SUPPORTED_SOURCES`.

### Orphans, resolved explicitly

- **`OvertureMapImporter` — wired up.** It was a registered provider nothing
  injected and no CLI could reach, because `importPlaces(places)` takes a list
  from an Overture GeoParquet export rather than a city. New
  `pnpm ingest:overture --path places.ndjson`
  (`src/importers/scripts/ingest-overture.ts`).
- **`DaneGovClient` — deleted.** 134 lines that searched dane.gov.pl for
  _candidate datasets_; it wrote no rows, nothing called it, and the actual
  `dane_gov` event path is `download:warsaw` → dump → `ingest:dump`. Recorded in
  `IMPORTERS.md` with a pointer to the API docs for whoever picks the next
  dataset.
- **`events.lat` / `events.lng` — populated**, not dropped, so
  `events_lat_lng_idx` is usable and an event is geo-queryable without joining
  its venue. Written on insert from the resolved venue coordinates, in the one
  place that can now do it. No migration needed. `EventDedupService` already
  reads `COALESCE(e.lat, v.lat)` (fix 01), so its geo branch now scores against
  the event's own pair; for importer rows that is the venue's pair at insert
  time, so no scoring changes. `events.service.ts` geo search still reads
  `venues.lat/lng` — untouched, out of scope.

### Deliberately left as two code paths

- **The two _orchestrators_.** `DumpIngestService.ingestFile` and
  `ImporterService.runPipeline` both open an `import_runs` row, run the collapse
  guard and run the withdrawal sweep. They are not merged: one is keyed by a file
  path and one by `(source, city)`, and defect 08 is adding scheduling and a
  per-`(source, city)` run lock around `runPipeline`. The _write_ path and the
  _counter shape_ are shared, which is what the duplication cost was.
- **Venue-only importers** (Google Places, OSM, Geoapify, Wikidata, Foursquare,
  Overture) keep their own upsert path, as the plan says — they have no event
  dates, no sighting set and nothing to withdraw.
- **PredictHQ still creates a venue per event and writes no
  `venue_source_mappings` row** (the fix-05 note in `IMPORTERS.md` §14). It is
  preserved verbatim as `{ alwaysInsert: true, cityCenterFallback: true }` so
  this refactor stays behaviour-neutral. It is now a two-line change at one call
  site (`coordinateVenue({ mappingExternalId: … })`) instead of a rewrite; that
  belongs to whoever owns that defect, because it changes which events dedup
  against each other.
- **RSS/iCal's split mapping source** (`rss_feed` vs `ical_feed` inside an
  `rss_feed` run) stays. `IMPORTERS.md` §14 named defect 09 as the place to fix
  the per-feed granularity properly; it is not, and the entry now says so —
  scoping a sighting per _feed_ needs a new column on `event_source_mappings`
  (so a migration), and re-keying existing `ical_feed` rows would mint duplicate
  events. What did improve: the sweep covers only the sources a run wrote.

### Behaviour differences I had to decide between

A consolidation has to converge divergent behaviour somewhere. Each of these is
a deliberate choice, and each is toward the stricter or better-evidenced of the
two:

1. **An event that cannot be placed is a run error, uniformly.** The dump path
   and `city-portal` already recorded one; `ticketmaster` and `openagenda`
   returned silently. Now all six report it, which means such a run has
   `sightingSetComplete: false` and **skips** the withdrawal sweep. Skipping
   costs a delayed expiry; sweeping on a partial set costs a wrong one.
2. **Geocoding needs something to geocode.** `city-portal` only geocoded when
   `venueName || address` was present; the dump path always tried, with
   `venueName` defaulting to the city display name — which can only ever return
   the city center, the exact placeholder both paths' comments refuse to pin an
   event to. The stricter rule won: an event with neither a venue name nor an
   address is reported instead of pinned. (The e2e's ungeocodable fixture has a
   venue name, so it still reaches the geocoder and still fails there.)
3. **An unreadable payload is sighted, then reported.** `openagenda` and
   `predicthq` recorded the sighting and returned silently; `ticketmaster` and
   `rss-ical` skipped before sighting in some branches. The ingest now always
   records the sighting first (so a bad title cannot grow an unseen streak) and
   _then_ raises, so the run cannot expire anything.
4. **`venuesFound` / `venuesDeduplicated` count placements, not events.** The
   dump path bumped them once per _event_, so a re-ingest of a known event
   reported `venuesDeduplicated: 1` having looked at no venue at all. They now
   count only events that actually reached the venue stage. First-run numbers are
   unchanged (the e2e's `venuesFound: 3, venuesNew: 2, venuesDeduplicated: 1`
   still holds); a re-run reports zeros.
5. **`city_portal` venue mapping keys moved to `venueMappingExternalId`** —
   `venue:<city>:<name>:<lat>,<lng>` instead of `poznan_venue:<name>`, the
   city- and location-scoped key fix 03 introduced for exactly this collision.
   Existing `poznan_venue:` rows are left alone; new writes use the new key.
   Its `attribution` raw data is preserved.
6. **`openagenda` keeps the `city_portal` vocabulary** (`categorySource:
'city_portal'`), which is what `mapCityPortalCategory` gave it before. Moving
   it to an `openagenda` vocabulary would have changed which hints resolve, and
   that is fix 04's call, not this one.
7. **Ticketmaster's image choice** is now the 16:9-preferring score from the
   `sources/` copy rather than the download copy's area sort. For large artwork
   the area term dominates, so the choice is usually identical — and it is
   identical on the committed fixture, which the unmodified
   `ticketmaster.spec.ts` still asserts.
8. **`ingest:dump` now boots `ImportersModule`** instead of a private
   `IngestModule`, so the geocoder gets its Redis cache. The CLI still ends with
   an explicit `process.exit`, which is what closed the dangling connection the
   old comment worried about.

### The one intended output change

Ticketmaster dumps gain three keys — `description`, `price`, `venueExternalId`
— and `raw` gains `statusCode`. Without them the consolidated path would have
_lost_ the price and description the direct writer already stored, which the
rules forbid. Every other fetcher's `NormalizedEvent[]` is byte-identical:
`normalizeManual` adds the new fields with conditional spreads, so a caller that
does not pass them produces exactly the object it produced before, and
`git diff` over `download/parsers` + `download/shared/normalize.ts` touches only
`ticketmaster.ts` and `normalize.ts`.

### Tests

- Before: **62 suites / 756 tests**. After: **65 suites / 790 tests**, all
  green. Coverage thresholds (`src/importers/download/` and `normalize.ts`)
  still pass — `pnpm test:cov` exits 0; the new `src/importers/ingest/` sits at
  96–97% statements for the two services with specs.
- New `src/importers/download/characterisation.spec.ts` (7 whole-object
  snapshots, one per fixture) — the net the plan asked for.
- New `src/importers/ingest/event-ingest.service.spec.ts` (15 tests) and
  `venue-resolver.service.spec.ts` (12 tests), against a recording fake
  `Database`. This is the spec the six writers did not have between them.
- Changed, not weakened: `rss-ical.importer.spec.ts`'s constructor stub (three
  collaborators → two; the date-parsing assertions are untouched) and the five
  e2e specs' import path + provider list. `test/ingest-dump.e2e-spec.ts` also
  had two assertions corrected — `venuesDeduplicated` on a re-run (item 4
  above) and a "one source mapping per ingested event" check that was still
  querying `venue_source_mappings` for `event:<id>` keys, which fix 05 moved to
  `event_source_mappings`; it was failing before this task. Two of the five e2e
  specs were also missing `StalenessService` from their provider lists, which
  fix 05 made `DumpIngestService` require, so they could not have compiled a
  module — added.
- No test deleted, skipped or weakened; no `any`, `@ts-ignore` or
  `eslint-disable` added.

### Verified

`pnpm lint`, `pnpm type-check`, `pnpm test`, `pnpm test:cov`, `pnpm build` all
pass. `pnpm openapi:export` leaves `docs/openapi.json` byte-identical, as this
task touches no HTTP surface. **Not run** (shared local Postgres/Redis):
`pnpm test:e2e` — the five specs above plus `aggregation-pipeline.e2e-spec.ts`
need a run before this is trusted in staging.
