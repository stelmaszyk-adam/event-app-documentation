# Fix 07: The most bug-prone importer code has no tests

**Repo:** `backend`
**Priority:** P2
**Dependencies:** `02-importer-timezone-hardcoded-utc2.md` (tests should encode the corrected behavior, not the current one)
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

Date parsing, HTML extraction and the DB upsert — the three places where
importer bugs actually live — have no regression coverage. The defects in
tasks 01, 02 and 04 all sat in untested code and were found by reading, not by
a failing suite.

## Evidence

The entire `src/importers` tree (≈9200 lines across 55 files) has **three**
spec files:

```
src/importers/download/jsonld.spec.ts
src/importers/download/parsers/poznan.spec.ts
src/importers/download/parsers/warsaw.spec.ts
```

Untested, ranked by risk × size:

| File                                | Lines | Why it matters                                                                            |
| ----------------------------------- | ----- | ----------------------------------------------------------------------------------------- |
| `download/shared/normalize.ts`      | 156   | Timezone/date parsing and external-id generation — the layer two separate P0 bugs live in |
| `scripts/ingest-dump.ts`            | 398   | Every DB write from a dump: venue matching, geocoding fallback, event insert              |
| `download/parsers/html-listing.ts`  | 176   | The shared scraper behind ebilet and goout                                                |
| `download/parsers/ebilet-state.ts`  | 122   | Embedded-state extraction, breaks whenever the site ships a new build                     |
| `download/parsers/ticketmaster.ts`  | 137   | Pagination, field mapping, the 1000-event cap                                             |
| `shared/category-mapper.service.ts` | 211   | Covered by task 04                                                                        |
| `shared/event-dedup.service.ts`     | 169   | Covered by task 01                                                                        |
| `shared/geocoding.service.ts`       | 251   | External calls, cache behavior                                                            |
| `download/shared/http.ts`           | 193   | robots.txt handling, throttling, retry classification                                     |

The fixture pattern already exists — `download/__fixtures__/ebilet/listing.html`
— it is just barely used.

## Fix

Write tests against **committed fixtures**, never the live network. The point
is that a site's markup change produces a red test instead of a silently empty
dump.

### Fixtures

- [~] P0 **Capture one small fixture per parser** under
      `src/importers/download/__fixtures__/<source>/`: a trimmed real page for
      ebilet (exists), goout, kultura.poznan.pl, Warsaw, Wrocław, plus a saved
      Ticketmaster JSON response. Trim to a handful of events — a few KB each, not
      a full page dump. — deferred: no outbound network in the environment this
      was fixed in, so the fixtures are hand-trimmed to each parser's contract
      rather than saved from a live response. Replace them with real payloads on
      the next downloader run; `__fixtures__/README.md` says which file is which.
- [x] P0 **Record the capture date and source URL** in a comment or a sibling
      `.md` in each fixture folder, so a stale fixture is recognisable.

### Parser tests

- [x] P0 **`normalize.spec.ts`** — the date matrix from task 02, plus
      `stableExternalId`: same input → same id, and (after task 05) a changed start
      time or an added `utm_*` parameter → unchanged id. (The `utm_*`/start-time
      half is deliberately **not** asserted — it is task 05's behaviour change,
      and asserting today's behaviour would cement what 05 must change.)
- [x] P0 **`html-listing.spec.ts`** — against the ebilet and goout fixtures:
      the expected number of events is extracted; each has a non-empty name and a
      parseable `startTime`; an event with no date is counted in `skippedNoDate`
      rather than thrown away silently; malformed JSON-LD does not abort the page.
- [x] P0 **`ebilet-state.spec.ts`** — the embedded-state payload is found and
      mapped (`dateFrom`/`dateTo` → `startTime`/`endTime`, lines 85 and 105); a
      page whose state shape changed yields zero events **with an error**, not a
      silent empty list.
- [x] P0 **`ticketmaster.spec.ts`** — against the saved JSON: field mapping
      (`bestImage` picks the largest, venue address assembly, `categoryHint` from
      `genre ?? segment`); the `localDate`/`localTime` fallback when `dateTime` is
      absent; pagination stops at `MAX_PAGE`; an event with no parseable date is
      dropped.
- [x] P1 **`http.spec.ts`** — `assertRobotsAllowed` honours a `Disallow` for
      `*` and for `WydarzkaBot`, allows an unlisted path, and treats an
      unreachable robots.txt as permissive (lines 36-80); `isRetryable` classifies
      5xx/429/timeout as retryable and 404 as not (lines 126-133).

### Ingest tests

- [~] P0 **E2E for `ingest-dump`** in `test/` (there is an existing
      `test/aggregation-pipeline.e2e-spec.ts` to model on), driven by a small
      committed dump JSON:
  - a new event creates one venue and one event;
  - a second event at the same venue reuses the venue (trigram + 100m match,
    `ingest-dump.ts:186-205`);
  - an event whose geocoding fails is recorded in `import_runs.errors` and does
    not abort the file (`ingest-dump.ts:88-95`);
  - the city-center placeholder rejection path (`resolveCoords`, lines 134-158)
    behaves as documented;
  - counters on the finished `import_runs` row match what was ingested.
  - deferred: written as `test/ingest-dump.e2e-spec.ts`, covering all five
    bullets, but **unexecuted** — the e2e suite shares one local Postgres with
    the other concurrent fix branches and parallel runs corrupt each other. Run
    it serially: `pnpm -C backend test:e2e -- ingest-dump`.

### Hygiene

- [x] P0 **No network in unit tests.** Mock `fetchText`; a test must pass with
      networking unavailable. Verify by running the suite offline.
- [x] P1 **Keep the suite host-independent** — no reliance on the machine's
      `TZ` or locale (see task 02).
- [x] P1 **Add a coverage floor for the importers path** if the project uses
      one, so new parsers cannot land untested. Do not lower any existing
      threshold to make the suite pass.

Never satisfy this task with `.skip`, `any`, or deleted assertions.

## Verification

```bash
pnpm -C backend test -- importers
pnpm -C backend test:cov -- importers      # record the before/after number
pnpm -C backend test:e2e -- ingest
```

Sanity check that the tests have teeth: temporarily revert the task 02 fix and
confirm `normalize.spec.ts` fails; temporarily corrupt a fixture's markup and
confirm the parser spec fails.

## Acceptance criteria

- [x] `normalize.ts`, `html-listing.ts`, `ebilet-state.ts` and
      `parsers/ticketmaster.ts` each have a spec file passing against committed
      fixtures.
- [~] `ingest-dump` has an e2e spec covering create / reuse-venue /
      geocode-failure / counters. — deferred: written, not run (shared database).
- [x] The whole unit suite passes with no network access.
- [~] Reintroducing any of the bugs from tasks 01, 02 or 04 turns the suite red.
      — partially: verified for task 02 (and for the three defects found while
      writing these tests). Task 01 is covered by its own specs; task 04's
      per-source category mapping is not asserted here and stays with task 04.

## References

- `src/importers/download/__fixtures__/ebilet/listing.html` (existing pattern)
- `src/importers/download/parsers/poznan.spec.ts`, `warsaw.spec.ts` (existing style)
- `test/aggregation-pipeline.e2e-spec.ts`, `test/support/bootstrap-app.ts`

## Resolution (2026-10-14)

Unit suite **481 → 584 tests** (48 → 53 suites); `src/importers` **75 → 178
tests**. Coverage of `src/importers/download/**`: **23.00% → 55.68%**
statements (branches 24.01% → 60.24%, functions 26.21% → 54.28%, lines 24.44% →
57.80%).

New specs: `download/parsers/html-listing.spec.ts` (14),
`download/parsers/ebilet-state.spec.ts` (16),
`download/parsers/ticketmaster.spec.ts` (18),
`download/parsers/city-portals.spec.ts` (5, Wrocław),
`download/shared/http.spec.ts` (19). Extended:
`download/shared/normalize.spec.ts` (33 → 53),
`download/parsers/warsaw.spec.ts` (11 → 17),
`download/parsers/poznan.spec.ts` (1 → 6). New fixtures for goout,
kultura.poznan.pl, Warsaw (MEC page + open-data payload), Wrocław (listing +
RSS), Ticketmaster and ebilet's hydration blob, with provenance in
`__fixtures__/README.md`.

### What task 02 had already covered

Task 02 landed `download/shared/normalize.spec.ts` with 33 tests: the whole
`parseFlexibleDate` matrix (DD.MM.YYYY, bare ISO, explicit offsets, both 2026
DST switch days, unparseable input) plus `warsawWallTimeToUtc`. None of that was
rewritten. What was missing from that file and is now covered:
`stableExternalId` (determinism across processes, source namespacing, null-part
handling, part separation), `fromJsonLdEvent` (full mapping, ticket-url
precedence, null on a missing name/date, `@type` arrays, 500-char truncation)
and `normalizeManual`. Task 02 also added `sources/rss-ical/rss-ical.importer.spec.ts`,
which this task left alone.

### Three production bugs the new tests exposed (all fixed here)

1. **`parseWarsawOpenDataRecords` never used `parseFlexibleDate`** — it built
   dates with `new Date(raw)` (`parsers/warsaw.ts`), so a bare
   `"2026-06-21T18:00:00"` resolved against the **host** timezone (the exact
   defect task 02 was about, in a file task 02 did not touch: the stored instant
   differed by hours depending on where the importer ran), and the portal's
   dotted `"16.05.2026 18:00"` spelling was an `Invalid Date`, i.e. a **silently
   dropped record**. Both now go through `parseFlexibleDate`; pinned by
   "reads a bare datetime as Europe/Warsaw wall time, not host-local time" and
   "keeps a record whose date uses the dotted Polish spelling".
2. **Ticketmaster dropped a legitimate `0` coordinate** —
   `venue.location.latitude ? Number(…) : null` plus
   `lat && Number.isFinite(lat)` treated `0` as absent. Replaced with a
   `toCoordinate()` finiteness check that still rejects `""` and junk; pinned by
   "keeps a legitimate zero coordinate" and "rejects unparseable coordinates
   rather than storing NaN".
3. **Microdata ticket urls were stored page-relative** — the microdata branch of
   `html-listing.ts` stored `matchHref(block)` verbatim (`/wydarzenia/x`) while
   the anchor heuristic right below it absolutised its url. Now both absolutise.

### What the plan got wrong, and deliberate departures

- **`extractEbiletStateEvents` had to change signature.** The plan asks for
  "zero events **with an error**" on a shape change, which the old
  `NormalizedEvent[]` return could not express — a missing/renamed state blob
  was indistinguishable from a page with no events. It now returns
  `{ events, errors }` and `html-listing.ts` folds those errors into the
  download summary, so a new ebilet build shows up as a reported error instead
  of a dump quietly shrinking from ~100 events to the ~20 JSON-LD carousel
  items.
- **`isRetryable` is not exported and was not exported for this.** The retry
  classification is asserted through `fetchText`'s observable behaviour (a 503,
  a `TimeoutError` and a connection `TypeError` are retried; a 404 is not; the
  default is no retry), which is the contract callers depend on.
- **Line references in this task file had drifted** (`ingest-dump.ts:88-95`,
  `186-205`, `134-158` now live in `scripts/dump-ingest.service.ts`, extracted
  by task 01; `ebilet-state.ts:85/105` are now 85/105 in a longer file). The
  behaviour, not the line numbers, is what the specs pin.
- **No-network hygiene is now enforced, not just claimed.** `test/no-network.setup.ts`
  (wired via `jest.setupFiles`) replaces `globalThis.fetch` with a throwing stub
  for the unit suite; all 584 tests pass with it in place, which is the offline
  verification this task asked for. The e2e config is untouched.
- **The coverage floor is a directory aggregate, not per file.** Jest applies a
  *glob* threshold to every matching file individually, which would have forced
  a floor on the untested CLI entry points; a *directory* key aggregates. So:
  `src/importers/download/` at 52/56/50/54 (measured 55.68/60.24/54.28/57.80)
  plus `normalize.ts` at 95/90/100/95. No existing threshold was lowered —
  there were none. Verified to have teeth: running only `jsonld.spec.ts` under
  `--coverage` fails both groups.
- **Two behaviours were left as they are, on purpose.** `parseKulturaEventBoxes`
  dates a multi-day run from the **last** day of the range
  (`poznan.ts`, `range[2]`), which keeps a running exhibition listed as
  upcoming; it is now pinned by a test with that rationale rather than changed.
  And the anchor heuristic in `html-listing.ts` reads any date within 200
  characters of the link, so two cards closer than that share a date — the spec
  documents the window instead of papering over it.

### Teeth checks

Each reintroduced bug was confirmed to turn the suite red, then reverted:
task 02's fixed `UTC+2` offset in `parseFlexibleDate` (14 failures across
normalize/ebilet-state/html-listing/poznan), the `new Date(raw)` Warsaw
open-data parse (3), the truthiness coordinate test (1), and corrupting a
committed fixture (renaming goout's JSON-LD `name` key: 7 failures in
`html-listing.spec.ts`).

### Not addressed here

`download-*.ts` CLI entry points, `shared/city-urls.ts`, `write-dump.ts` and
`run-listing-download.ts` stay uncovered (argv/filesystem wrappers);
`geocoding.service.ts` and `category-mapper.service.ts` belong to tasks 04 and
their own follow-ups; `parsers/poznan.ts` and `parsers/warsaw.ts` keep their
network-walking functions (`fetchKulturaPoznanListing`, `fetchGo2WarsawEvents`,
`fetchWarsawOpenDataEvents`) untested — only their pure parsers are.
