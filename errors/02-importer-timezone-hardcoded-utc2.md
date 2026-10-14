# Fix 02: Importer date parsing hardcodes UTC+2, so winter events are an hour off

**Repo:** `backend`
**Priority:** P0
**Dependencies:** none
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

An event advertised as 19:00 on a December evening is stored as 20:00
Europe/Warsaw and displayed to users at the wrong time. Everything between
late October and late March is shifted by one hour; summer dates happen to be
correct.

## Evidence

`src/importers/download/shared/normalize.ts` converts wall-clock strings by
subtracting a **fixed** two hours:

- Line 31 — the Polish `DD.MM.YYYY` branch:
  ```ts
  const d = new Date(Date.UTC(year, month, day, hour - 2, minute, second));
  ```
- Line 57 — the bare-ISO branch (`2026-08-14T17:00:00`, no offset):
  ```ts
  Number(h) - 2,
  ```

Both comments acknowledge it (lines 30 and 46: "approximated via UTC+2",
"UTC+2 approximation"). Poland is **CEST = UTC+2 only from the last Sunday in
March to the last Sunday in October**; the rest of the year is **CET = UTC+1**.

Scale: every source that goes through `parseFlexibleDate` is affected — the
ebilet/goout listing scrapers, the `ebilet-state` parser
(`parsers/ebilet-state.ts:85,105`), the Ticketmaster dump parser's
`localDate`/`localTime` fallback (`parsers/ticketmaster.ts`), and the Poznań,
Warsaw and Wrocław portal parsers.

## Root cause

A DST-naive fixed-offset conversion standing in for a real timezone
conversion. It cannot be right year-round, because the offset depends on the
date being parsed.

## Fix

- [x] P0 **Convert via the IANA zone, not a constant.** Add one helper in
      `normalize.ts` — e.g. `warsawWallTimeToUtc(y, mo, d, h, mi, s): Date` — that
      resolves the correct offset **for that instant** and use it from both
      branches. Two acceptable implementations:
  - `Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Warsaw', timeZoneName: 'longOffset' })`
    on a probe date, then apply the offset (no new dependency); or
  - a pinned `date-fns-tz` (exact version, no `^`) `fromZonedTime(…, 'Europe/Warsaw')`.
    Check whether `date-fns` is already a backend dependency before adding anything.
- [x] P0 **Handle the two DST edge cases explicitly** and document the choice in
      a comment:
  - Spring forward — 02:30 on the switch day does not exist. Pick the mapping
    (shift forward to 03:30) rather than producing `Invalid Date`.
  - Fall back — 02:30 occurs twice. Pick one (the first, earlier offset) deterministically.
- [x] P1 **Leave offset-bearing input alone.** Strings that already carry `Z`
      or `±HH:MM` must keep flowing through the `Date.parse` path untouched
      (`normalize.ts:66`) — do not apply any correction to those.
- [x] P1 **Audit for the same pattern elsewhere:**
  ```bash
  grep -rn "\- 2\b\|UTC+2\|+02:00" backend/src/importers
  ```
  Fix any other fixed-offset arithmetic found, or confirm there is none.

### Tests

- [x] P0 **Unit tests for `parseFlexibleDate`** in a new
      `src/importers/download/shared/normalize.spec.ts`, each asserting an exact
      ISO instant:
  - `"15.12.2026 19:00"` → `2026-12-15T18:00:00.000Z` (CET, UTC+1).
  - `"15.07.2026 19:00"` → `2026-07-15T17:00:00.000Z` (CEST, UTC+2).
  - `"2026-12-15T19:00:00"` (bare ISO) → `2026-12-15T18:00:00.000Z`.
  - `"2026-07-15T19:00:00Z"` → unchanged, `2026-07-15T19:00:00.000Z`.
  - DST boundary days: 2026-03-29 and 2026-10-25, both edge cases above.
  - Garbage input → `null`.
- [x] P0 **The suite must not depend on the host timezone.** Either set
      `process.env.TZ` in the jest config / test setup, or assert only on
      `toISOString()`. State which was chosen in the test file header.

## Verification

```bash
pnpm -C backend test -- normalize
TZ=America/New_York pnpm -C backend test -- normalize   # must pass identically
TZ=Australia/Sydney  pnpm -C backend test -- normalize   # must pass identically
```

## Needs human / staging

- [~] Existing rows in `events` imported before this fix carry the wrong instant
  for winter dates. Decide whether to (a) leave them — they age out via
  `StalenessService` — or (b) re-ingest the affected dumps from
  `backend/data/imports/` after the fix. A blanket `-1h` UPDATE is **not**
  safe, because summer rows are already correct.
  — deferred: needs a human decision plus a staging/production DB; nothing in
  this commit touches existing rows.

## Acceptance criteria

- [x] A December 19:00 event and a July 19:00 event both store an instant that
      renders as 19:00 Europe/Warsaw.
- [x] `normalize.spec.ts` passes under at least three different host `TZ`
      values.
- [x] No fixed `- 2` hour arithmetic remains in `src/importers`.

## References

- `src/importers/download/shared/normalize.ts`
- `src/importers/download/parsers/ebilet-state.ts`
- `src/importers/download/parsers/ticketmaster.ts`

---

## Resolution (2026-10-14)

Done as specified. The conversion now goes through the IANA zone, with no new
dependency: `src/importers/shared/warsaw-time.ts` exports
`warsawWallTimeToUtc(year, month /* 1-12 */, day, hour, minute, second)` and
resolves the offset in force **for the instant being parsed** by reading the
Europe/Warsaw wall clock back out of a cached `Intl.DateTimeFormat`
(Node ships full ICU). `date-fns-tz@3.2.0` *is* already a pinned dependency, but
`fromZonedTime` was rejected: for a bare string it parses the input in the
**host** timezone first, which re-introduces a host-TZ dependency on the host's
own DST gap. `normalize.ts` re-exports the helper so both importer stacks share
one implementation.

The algorithm: take the wall time as if it were UTC, probe the zone offset a day
either side (that brackets any transition on the date), and keep the candidate
instants that read back as the requested wall time. Two valid candidates means an
ambiguous fall-back time → the earlier instant (first, CEST occurrence) wins.
No valid candidate means a spring-forward gap → apply the pre-transition offset,
which lands just past the switch, so `02:30` reads back as `03:30` instead of
producing `Invalid Date`. Both choices are documented in the helper's doc
comment and pinned by tests.

Four things the plan did not have quite right.

1. **The Ticketmaster `localDate`/`localTime` fallback never went through the
   `- 2` arithmetic at all.** It builds `"2026-12-15 19:00:00"` (space, not `T`),
   which matched neither branch and fell through to `Date.parse` — i.e. it was
   silently resolved against the *host* timezone. The bare-datetime regex now
   accepts `[ T]` as the separator, so that fallback is pinned to Europe/Warsaw
   like everything else. Covered by
   "reads the space-separated Ticketmaster localDate/localTime fallback".

2. **The audit found a second site, outside `src/importers/download`.**
   `src/importers/sources/rss-ical/rss-ical.importer.ts` had the same fixed
   offset twice — `parseIcalDate` (line 344) and the Polish-month branch of
   `parseDate` (line 377). Both now call the shared helper. While there:
   `parseIcalDate` used to strip a trailing `Z` and then subtract 2 hours, so
   genuine UTC iCal values (RFC 5545 form 2) were shifted by the full offset; a
   trailing `Z` is now honoured as an absolute instant. New
   `rss-ical.importer.spec.ts` covers both methods. Nothing else in
   `src/importers` does fixed-offset arithmetic (verified by the grep in the
   checklist, which now only matches prose in comments and test names).

3. **The old Polish branch accepted impossible dates.** Its guard was
   `day <= 31 && month <= 11`, so `"31.02.2026 19:00"` silently became
   3 March. The helper round-trips the calendar components and returns `null`
   for a date that does not exist (and for two-digit years, which `Date.UTC`
   maps into the 1900s); `parseFlexibleDate` then falls through and ends at
   `null`. This is a deliberate behaviour change — tested.

4. **A date-only iCal `DTSTART` is now Warsaw midnight, not UTC midnight**
   (`20261215` → `2026-12-14T23:00:00Z`). An all-day local event starting at
   local midnight is the correct reading, but it does move those instants by an
   hour relative to the old code.

Test strategy: `normalize.spec.ts` and `rss-ical.importer.spec.ts` never set
`process.env.TZ` and never call a local-time getter — every assertion is on
`toISOString()` or on an explicit `Intl` rendering in `Europe/Warsaw`, so they
pass under any host `TZ`. Stated in each file's header. Verified with the default
host zone and with `TZ=America/New_York`, `TZ=Australia/Sydney` and `TZ=UTC`.
`pnpm -C backend lint`, `type-check` and `test` (48 suites, 481 tests) are green.

**Deliberately left out.** Bare ISO *date-only* strings (`"2026-12-15"`, no
time) still go through `Date.parse`, which the ECMAScript spec defines as UTC
midnight, whereas the dotted `15.12.2026` form defaults to Warsaw noon. Making
those two agree changes `stableExternalId` for existing rows, so it belongs with
task 05's identity work, not here. Also untouched: the many
`new Date(apiString)` calls in `src/importers/sources/**` (PredictHQ,
OpenAgenda, Ticketmaster, city portals) — those parse offset-bearing API values
and carry no fixed offset, so they are outside this defect; they would only be
wrong if a provider started sending offset-less strings.
