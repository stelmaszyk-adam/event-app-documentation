# Fix 06: No date-window option, and Ticketmaster silently truncates at 1000 events

**Repo:** `backend`
**Priority:** P2
**Dependencies:** none
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

Two problems with one shared fix:

1. There is no way to download events for a specific period ("all of
   December", "the next two weeks"). Every script takes `--city` and nothing
   else.
2. For large cities, Ticketmaster downloads stop at 1000 events with no
   warning — the rest of the catalogue is simply never seen.

## Evidence

**No date argument anywhere.** The only CLI parser in the download layer is
`parseCityArg` (`src/importers/download/shared/http.ts:183`), used by
`download-ebilet`, `download-goout`, `download-poznan`, `download-warsaw`,
`download-wroclaw` and `download-ticketmaster`. `scripts/run-importer.ts:31`
accepts `--source` and `--city` only.

**Horizons are hardcoded** in the `sources/*` importers:

| Source        | Line                                                | Window                                                           |
| ------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| Ticketmaster  | `sources/ticketmaster/ticketmaster.importer.ts:117` | `now … now + 90d`                                                |
| PredictHQ     | `sources/predicthq/predicthq.importer.ts:114`       | `active.gte=now … +90d`                                          |
| RSS/iCal      | `sources/rss-ical/rss-ical.importer.ts:241`         | 90-day horizon                                                   |
| Poznań portal | `sources/city-portal/city-portal.importer.ts:86-97` | `POZNAN_PORTAL_HORIZON_DAYS` env — **the only configurable one** |

**The 1000-event cap.** `src/importers/download/parsers/ticketmaster.ts:6-8`:

```ts
const PAGE_SIZE = 200;
/** Ticketmaster "deep paging" restriction: only size * page < 1000 is served. */
const MAX_PAGE = Math.floor(999 / PAGE_SIZE); // 4 (pages 0..4 => up to 1000 events)
```

The loop at line 110 runs pages 0..4 and stops. `download-ticketmaster.ts`
passes only `lat`, `lng` and `radiusKm` — no date bounds — so for any city with
more than 1000 upcoming events the extra ones are unreachable. The standard
workaround for the Discovery API's deep-paging limit is exactly date slicing:
a windowed request returns under 1000 per slice, so the cap stops biting.

## Fix

### A shared window argument

- [x] P0 **Add a reusable parser** next to `parseCityArg` in
      `download/shared/http.ts` — `parseWindowArg(argv): { from: Date; to: Date }`:
  - `--from YYYY-MM-DD` / `--to YYYY-MM-DD` (inclusive dates, interpreted as
    Europe/Warsaw wall time — reuse the helper from task 02 rather than
    re-deriving an offset).
  - `--days N` as shorthand for `now … now + N days`.
  - Default when nothing is passed: `now … now + 90 days`, matching today's
    behavior so existing invocations are unchanged.
  - Reject `to < from` with a clear message and a non-zero exit.
  - Support both `--from X` and `--from=X`, as `parseCityArg` does.
- [x] P0 **Thread it through every download script:**
      `download-ticketmaster.ts`, `download-poznan.ts`, `download-warsaw.ts`,
      `download-wroclaw.ts`, and `shared/run-listing-download.ts` (ebilet/goout).
- [x] P0 **Thread it through `run-importer.ts`** as `--from`/`--to`/`--days`
      and pass it into `ImporterService.runPipeline` → each importer, replacing the
      four hardcoded 90-day constants above. Keep
      `POZNAN_PORTAL_HORIZON_DAYS` working as the default when no flag is given.

### Apply the window at the right layer per source

- [x] P0 **Natively, where the upstream supports it:**
  - Ticketmaster → `startDateTime` / `endDateTime` on the Discovery query
    (the `sources/` importer already builds these at lines 131-132; the
    `download/parsers/ticketmaster.ts` URL built at line 114 does not — add them).
  - PredictHQ → `active.gte` / `active.lte`.
  - Poznań SOAP portal → `dateFrom` / `dateTo`, already accepted by
    `sources/city-portal/poznan-portal.client.ts:16-30`.
- [x] P1 **As a post-parse filter for the HTML scrapers** (ebilet, goout,
      kultura.poznan.pl listings, Warsaw, Wrocław) — those listing pages expose no
      date parameters, so fetch as today and drop events outside the window before
      `writeDump`. Count the dropped ones in the summary (`skippedOutOfWindow`)
      so it is visible rather than silent.

### Break the 1000-event cap

- [x] P0 **Slice the Ticketmaster request** into sub-windows instead of one
      range: walk the requested period in chunks (weekly is a safe default),
      paginating within each chunk. Deduplicate across chunk boundaries by
      `event.id`.
- [x] P0 **Warn loudly on truncation.** If any single slice still returns
      `page.totalElements >= 1000`, log a warning naming the slice and record it in
      `import_runs.metadata.truncatedSlices`. Silent data loss is the actual defect
      here — a visible warning is the minimum bar even if the slicing is imperfect.
- [x] P1 **Check the other paged sources** for the same class of cap
      (`sources/openagenda`, `sources/foursquare`, `sources/predicthq`) and give
      them the same treatment or an explicit note that no cap applies.

### Documentation

- [x] P0 **Update `backend/IMPORTERS.md`** §4 usage block and the per-source
      sections with the new flags and worked examples.
- [x] P1 **Update the `--help` output** of `run-importer.ts:83` (`printUsage`).

### Tests

- [x] P0 **Unit tests for `parseWindowArg`:** both flag spellings, `--days`,
      the default, `to < from` rejection, and a DST-crossing range.
- [x] P0 **Unit test the Ticketmaster slicer** against a mocked `fetchText`:
      a 3-week request issues 3 sliced queries; events duplicated across a boundary
      appear once; a slice reporting `totalElements = 1200` produces a truncation
      warning.
- [x] P1 **Unit test the post-parse filter:** events outside the window are
      dropped and counted.

## Verification

```bash
pnpm -C backend test -- ticketmaster
pnpm -C backend download:ticketmaster --city warsaw --from 2026-12-01 --to 2026-12-31
pnpm -C backend download:ebilet --city poznan --days 14
```

Confirm the dump covers only the requested period:

```bash
node -e "const d=require('./backend/data/imports/ticketmaster/warsaw-<stamp>.json');
const s=d.events.map(e=>e.startTime).sort();console.log(d.events.length, s[0], s.at(-1))"
```

A Warsaw December run should now be obtainable even if the city has >1000
upcoming events in total.

## Needs human / staging

- `TICKETMASTER_API_KEY` in `backend/.env.local` is required to verify against
  the live API (free tier: 5000 calls/day, 5 req/sec). Without it, the mocked
  unit tests above are the limit of local verification.

## Acceptance criteria

- [x] Every download script and `importer:run` accept `--from`/`--to`/`--days`.
- [x] Omitting them reproduces today's 90-day behavior exactly — with one
      deliberate exception: RSS items, previously unbounded, now obey the
      90-day default like the iCal branch already did (see Resolution).
- [~] A December-only request produces a dump containing only December events
      — deferred: the request path and the post-parse filter are unit-tested
      with mocked fetches, but producing a real dump needs
      `TICKETMASTER_API_KEY` / live portal fetches.
- [~] A city with >1000 upcoming Ticketmaster events yields more than 1000
      across sliced requests, or logs an explicit truncation warning
      — deferred: slicing, cross-slice dedup and the truncation warning are
      unit-tested against a mocked `fetchText`; confirming the >1000 total on a
      live city needs `TICKETMASTER_API_KEY`.
- [x] `IMPORTERS.md` documents the flags.

## References

- `src/importers/download/shared/http.ts`
- `src/importers/download/parsers/ticketmaster.ts`
- `src/importers/scripts/run-importer.ts`
- `src/importers/sources/city-portal/poznan-portal.client.ts`
- `backend/IMPORTERS.md`

---

## Resolution (2026-10-14)

Implemented as specified. Six things worth recording.

1. **The window type lives in `src/importers/shared/date-window.ts`, not in
   `download/shared/http.ts`.** The plan put everything "next to
   `parseCityArg`", but the `sources/*` importers need the same type and the
   same slicing, and making them import the download layer's HTTP client (with
   its robots.txt cache and throttle) for a date type was the wrong dependency.
   So: `date-window.ts` holds `DateWindow`, `warsawDayStart/End`,
   `defaultWindow`, `addDays`, `describeWindow`, `sliceWindow` and
   `filterEventsToWindow`; `http.ts` keeps the CLI flag parsing
   (`parseWindowArg`, `parseOptionalWindowArg`) next to `parseCityArg` and
   re-exports the rest, so every download-layer caller still has one import
   site.

2. **No dependency on task 02's timezone helper.** That fix is on a sibling
   branch, so `--from`/`--to` interpret Warsaw wall dates with `TZDate` from
   `@date-fns/tz` (already a dependency, already used by
   `venue-hours.service.ts`) rather than a re-derived offset. This is
   DST-correct, which the hardcoded `UTC+2` in `normalize.ts` is not: a
   December `--from 2026-12-01` resolves to `2026-11-30T23:00:00Z`, a July one
   to `22:00Z`. Pinned by the "keeps Warsaw wall time across the spring DST
   change" case in `http.spec.ts`. When task 02 lands, its helper and these two
   functions are the same idea in two places and can be merged — nothing here
   depends on which wins.

3. **`parseOptionalWindowArg` exists because "no flags" has to stay
   distinguishable from "90 days".** `POZNAN_PORTAL_HORIZON_DAYS` had to keep
   working as the Poznań default, so `run-importer.ts` passes a window only
   when a flag was actually given; `RunPipelineOptions.window` is optional all
   the way down and each importer falls back to its own default. The download
   scripts use `parseWindowArg`, which defaults to `now … now + 90d`.

4. **`--to` wins over `--days`; `--days` counts from `--from`.** The plan did
   not say what `--from X --days N` or `--to X --days N` mean. Documented in
   `--help`, in `IMPORTERS.md` §4 and tested.

5. **One deliberate behavior change: RSS items are now window-bounded.** The
   iCal branch of `rss-ical.importer.ts` already dropped anything past 90 days;
   the RSS branch bounded nothing at all, so with no flags it now drops items
   beyond the 90-day default that it previously imported. Leaving RSS unbounded
   would have made `--from`/`--to` silently not apply to half of that source,
   which is the defect this file is about.

6. **Slicing emits no degenerate tail slice.** `sliceWindow` absorbs a
   sub-second remainder into the last slice, so a `from … from + 21d` request
   is 3 queries, not 4 — one fewer API call that could only return duplicates.
   The sliced Ticketmaster fetch also stops the whole walk on HTTP 401/403
   (a rejected key fails identically for all 13 slices of a default run) and
   bounds the 429 retry at 3 attempts per slice, which the old `continue` did
   not — it silently skipped the page instead.

Where the window is applied: Ticketmaster `startDateTime`/`endDateTime` (both
the download parser and the `sources/` importer, weekly slices,
cross-slice dedup by `event.id`); PredictHQ `active.gte`/`active.lte`;
OpenAgenda `timings[gte]`/`timings[lte]`; Poznań SOAP `dateFrom`/`dateTo`;
post-parse filter for ebilet, goout, kultura.poznan.pl, go2warsaw,
dane.um.warszawa.pl and wroclaw.pl, counted as `skippedOutOfWindow` in every
summary line and in `import_runs.metadata.skippedOutOfWindow` for
`city_portal`. Truncated slices land in
`import_runs.metadata.truncatedSlices` and in a `logger.warn` / `console.warn`.

Other paged sources (P1 check): OpenAgenda and PredictHQ both read a single
page (100 and 200 items) and neither hits a cap for Polish cities, so instead
of slicing they now log a warning when the response's own `total` / `count`
exceeds what one page returned — the same "make it visible" bar. Foursquare is
per-venue enrichment with `limit=1`, no event dates and no cap; noted in a
comment rather than changed.

**Not done / deliberately left out.** The slice width (7 days) and the
1000-result threshold are constants, not env knobs — no new config knob, so
nothing to add to `env.validation.ts` or `.env.example`. Nothing was changed in
`normalize.ts` or in Ticketmaster's date *parsing*, which belongs to task 02.
No e2e spec: the window never reaches Postgres differently, so the value is in
the unit tests. Live verification (the commands under **Verification** above,
and the two acceptance criteria marked `[~]`) still needs
`TICKETMASTER_API_KEY` and live portal fetches.

Verified: `pnpm -C backend lint`, `type-check`, `test` (49 suites, 463 tests)
all green; `importer:run --help` and the `--from`/`--to`/`--days` parse paths
smoke-run offline. `test:e2e` not run (shared local Postgres).
