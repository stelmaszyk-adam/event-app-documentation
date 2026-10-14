# Fix 08: Importers only ever run when a human types a command

**Repo:** `backend`
**Priority:** P2
**Dependencies:** `05-event-identity-and-update-path.md` (do not automate a pipeline that cannot update or expire events)
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

Event data is as fresh as the last time someone remembered to run a script.
Between runs the feed drifts: new events are missing, past events linger until
a manual staleness pass, and nobody is told when a source breaks.

## Evidence

`backend/IMPORTERS.md` states it as a design choice:

> The pipeline is **manual / admin-triggered** — there is no cron, no Bull
> queue, nothing runs in the backend on its own.

That was reasonable while the sources were being built. The infrastructure to
change it is already in the app:

- `@nestjs/schedule` is a dependency and in use —
  `src/kpis/kpis.module.ts:17` (`ScheduleModule.forRoot()`) and
  `src/kpis/kpi-alerts.service.ts:20` (`@Cron('0 7 * * *')`), plus
  `src/audit-log/audit-log.module.ts:2`.
- Bull and Redis are part of the stack per `CLAUDE.md`.
- `StalenessService` (`src/importers/shared/staleness.service.ts`) exists with a
  ready `run()` entry point and **no caller**.
- `import_runs` bookkeeping and the admin read endpoints
  (`src/importers/admin-importers.controller.ts`) already exist to observe runs.

So the only missing piece is the trigger.

## Fix

### Scheduled execution

- [x] P0 **Add a scheduler to the importers module.** A
      `ImporterSchedulerService` in `src/importers/` with `@Cron` entries, wired
      through `ScheduleModule.forRoot()` in `importers.module.ts` (follow the
      `kpis` module's pattern exactly).
- [x] P0 **Run sources on a staggered schedule**, not all at once — the
      download layer throttles to one request per host every 2s
      (`download/shared/http.ts:MIN_INTERVAL_MS`), so overlapping runs just queue
      up. Suggested starting points, all off-peak Europe/Warsaw:
  - city portals and RSS/iCal — nightly;
  - ticketing APIs (Ticketmaster) — nightly, offset by an hour;
  - venue discovery (Google Places, OSM) — weekly, since the 7-day
    `lastSeenAt` cache makes more frequent runs pointless;
  - `StalenessService.run()` — nightly, **after** the import jobs.
- [x] P0 **Make every interval configurable by env var** with the defaults
      above, and add an off switch (e.g. `IMPORTER_SCHEDULE_ENABLED=false`) that is
      **off by default in non-production**, so local `pnpm dev` does not start
      hitting external sites. Add the vars to `src/config/env.validation.ts`.
- [x] P0 **Call `StalenessService.run()` from the scheduler** — it is currently
      dead code.

### Don't let two runs collide

- [x] P0 **Take a lock per `(source, city)`** before a scheduled run, so a
      cron firing while a manual `importer:run` is in flight does not double-write.
      Redis is already available; a simple `SET NX` with a TTL is enough. The
      `import_runs` row with `status = 'running'` can serve as the check, but needs
      a stale-run timeout so a crashed run does not block forever.
- [x] P1 **Decide queue vs. in-process and write the reason down.** Bull is in
      the stack; a queued job survives a restart and gives retries, whereas an
      in-process `@Cron` is simpler but dies with the pod. For a single-instance
      deployment the cron is fine — if the backend runs more than one replica, the
      lock above is mandatory and Bull is the better answer.

### Observability

- [x] P0 **Alert when a source goes quiet or starts failing.** `kpi-alerts.service.ts`
      is the existing pattern to copy. Fire when: a scheduled run fails, a source
      has had no successful run in 48h, or a run's `errors_count` exceeds a
      threshold.
- [x] P1 **Expose a manual trigger endpoint** —
      `POST /admin/importers/run` (`@Roles('admin')`, body `{ source, city }`) in
      `admin-importers.controller.ts`, which is read-only today. That gives the
      future `web-admin-internal` panel a "run now" button and a place to retry a
      failed source without shell access. Must respect the same lock.
- [x] P1 **Keep `import_runs` from growing forever** — a retention pass (e.g.
      keep 90 days, or the last N runs per source+city) in the same nightly job.

### Documentation

- [x] P0 **Rewrite `backend/IMPORTERS.md` §1** — the "manual / admin-triggered,
      no cron" statement becomes false with this task. Document the schedule, the
      env vars, the kill switch and how to run a source manually anyway.

### Tests

- [x] P0 **Unit test the scheduler** with mocked importer + staleness services:
      the expected sources are invoked, `StalenessService.run()` is called after
      them, and nothing runs when the kill switch is off.
- [x] P0 **Unit test the lock:** a second concurrent run for the same
      `(source, city)` is skipped and says so, and a lock older than the TTL does
      not block a new run.
- [x] P1 **Test the alert conditions** against the `kpi-alerts` test pattern,
      if one exists.

## Verification

```bash
pnpm -C backend type-check && pnpm -C backend test -- scheduler
IMPORTER_SCHEDULE_ENABLED=true pnpm -C backend dev   # observe the cron logs
```

```sql
-- After a scheduled night, every active source should show a recent run
SELECT DISTINCT ON (source, city) source, city, status, started_at, errors_count
FROM import_runs ORDER BY source, city, started_at DESC;
```

## Needs human / staging

- The schedule must be validated on staging over at least one full night,
  watching external-API quota consumption (Google Places billing, Ticketmaster's
  5000 calls/day) before it is enabled in production.
- Confirm the production deployment's replica count before choosing cron vs.
  Bull — see the item above.

## Acceptance criteria

- [x] Sources run on a documented, env-configurable schedule, off by default
      outside production.
- [x] `StalenessService.run()` has a caller.
- [x] Two simultaneous runs of the same source+city cannot overlap.
- [x] A failing or silent source raises an alert.
- [x] `IMPORTERS.md` no longer claims the pipeline is manual-only.

## References

- `src/importers/shared/staleness.service.ts`
- `src/importers/admin-importers.controller.ts`
- `src/kpis/kpis.module.ts`, `src/kpis/kpi-alerts.service.ts` (the pattern to copy)
- `src/config/env.validation.ts`
- `backend/IMPORTERS.md`

---

## Resolution (2026-10-15)

Every checklist item has code and tests behind it. The schedule itself still has
to be watched on staging for a night before `IMPORTER_SCHEDULE_ENABLED` is left
on in production — that is the "Needs human" item, not a deliverable, so it is
not a `- [~]`.

### What was built

| File                                         | What                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| `src/importers/importer-schedule.ts`         | The schedule as pure data + `warsawClock`, `tiersDueAt`, `scheduleWarnings`, `parseSourceList`, `resolveScheduleEnabled` |
| `src/importers/importer-jobs.ts`             | Queue/job names, `RunSourceJobData`, `runSourceJobId`                     |
| `src/importers/importer-scheduler.service.ts`| The hourly `@Cron` → tier → Bull jobs                                     |
| `src/importers/importers.processor.ts`       | `run-source`, `staleness`, `run-retention`, `health-check`                |
| `src/importers/importer-health.service.ts`   | `import_runs` roll-up, `evaluateImporterHealth`, `pruneImportRuns`        |
| `src/importers/shared/importer-run-lock.ts`  | The `(source, city)` Redis lock                                           |
| `src/importers/importer-scheduler.module.ts` | Cron + queue + processor + admin controller                               |
| `src/email/templates/importer-alert.tsx`     | The alert email                                                           |
| `src/importers/dto/run-importer-*.dto.ts`    | `POST /admin/importers/run` request/response                              |

Modified: `importers.module.ts` (lock + its Redis client, exports), `app.module.ts`,
`admin-importers.controller.ts` (the new `POST run`), `scripts/run-importer.ts`
(takes the lock — 8 lines), `shared/staleness.service.ts` (`affectedRows` exported,
one word), `config/env.validation.ts`, `.env.example`, `IMPORTERS.md`,
`database/schema/relations.ts` + migration `0006_cool_mulholland_black.sql`,
`docs/openapi.json`.

### The schedule, and how it reconciles with N = 3

All hours Europe/Warsaw, DST-correct (the cron carries `timeZone`, and
`warsawClock` reads the hour through `Intl` rather than a fixed offset — a UTC
server would otherwise run "02:00" at 01:00 local for half the year).

- events (`city_portal`, `rss_feed`) — daily 02:00
- ticketing (`ticketmaster`) — daily 03:00
- venues (`google_places`, `openstreetmap`, `geoapify`) — Sunday 04:00
- maintenance (staleness → `import_runs` retention → health check) — daily 05:00
- cities: `poznan` only by default (the only p0 city, and the two event sources
  only cover it)

**Fix 05's first note, answered.** `UNSEEN_RUNS_BEFORE_EXPIRY = 3` is a count of
runs, so the cadence is what gives it a duration: **nightly × 3 = ~3 days**
between a source dropping a future event and the event being soft-deleted. N was
**kept at 3, not raised** — with the schedule pinned nightly, 3 runs *is* the
three-day duration the §14 table wanted, and raising it would only delay a
correct withdrawal. The important consequence is the other direction: a nightly
cadence is the *minimum* that keeps N = 3 bounded, and making the event tier
weekly would silently turn the withdrawal latency into three weeks without
touching the sweep. So the scheduler logs `UNSEEN_RUNS_BEFORE_EXPIRY × cadence`
at boot, `IMPORTERS.md` §15 spells the rule out ("if you slow the event tier,
lower N"), and §14's "revisit all three" note now points at that section.
`MAPPING_LIVE_WINDOW_DAYS` (14) stays time-based for the reason already
recorded — it judges *another* source's cadence, which this schedule does not
fix. The weekly venue tier never writes `event_source_mappings`, so it does not
interact with N at all.

### The lock, and fix 05's second note

`ImporterRunLockService.withLock(source, city, body)`:
`SET importer:lock:<source>:<city> <uuid> PX <ttl> NX`.

- **Lock held → the run is skipped**, not queued behind and not run anyway. The
  processor logs a `warn` with the holder's token and returns normally (a skip
  is not a failure: no alert, no Bull retry). The CLI logs an `error`, moves to
  the next city and exits non-zero.
- Release and heartbeat are both `EVAL` compare-and-swap on the token, so no run
  can free or extend a lock it does not own.
- A heartbeat re-arms the TTL every `ttl/3` while the body runs, so a long
  legitimate run keeps its lock without the TTL having to be the worst case;
  Redis's own expiry is what stops a SIGKILLed run blocking its pair forever.
  `IMPORTER_LOCK_TTL_SECONDS` therefore bounds *crash recovery*, not run length.
- Released in a `finally`, so a failed run does not block tomorrow's.

All three `runPipeline` callers take it — the processor (cron **and** the admin
endpoint) and `scripts/run-importer.ts` — which is the whole set, so "a cron
firing while a manual `importer:run` is in flight cannot double-write" is
actually true rather than true of one path. On top of that the Bull job id
(`run-source:<source>:<city>`) de-duplicates at the queue, so a tick firing
while yesterday's job is still pending cannot pile up a backlog.

### Where the plan was wrong or incomplete

1. **`@Cron` cannot take an env-configurable expression.** The plan asked for
   `@Cron` entries *and* for every interval to be an env var; those conflict.
   The decorator fixes its expression at class-definition time, and changing it
   later needs `SchedulerRegistry` plus a `CronTime` from `cron` — a transitive
   dependency of `@nestjs/schedule` that pnpm's strict layout does not expose,
   so it would have to be declared (and this worktree shares `node_modules`
   with another agent, so adding a dependency was not on). Resolved with **one**
   `@Cron('0 * * * *', { timeZone: 'Europe/Warsaw' })` tick that asks the pure
   `tiersDueAt()` what is due, and **hour-of-day / weekday** knobs instead of
   cron strings. Same control for a nightly/weekly schedule, and an hour cannot
   be mis-typed as `* * * * *` — which on the ticketing tier would burn
   Ticketmaster's 5000-calls/day quota in an afternoon.

2. **The scheduler could not live in `ImportersModule`.** The plan said to wire
   `ScheduleModule.forRoot()` into `importers.module.ts`. That module is booted
   standalone by `scripts/run-importer.ts` with `createApplicationContext`,
   where there is no `BullModule.forRoot` (it is in `AppModule`) and no global
   `EmailModule` — so a queue and a processor there break `pnpm importer:run`.
   The cron, queue, processor and admin controller moved into a new
   `ImporterSchedulerModule`; `ImportersModule` gained only the lock, which
   needs nothing but Redis and config, and which the CLI needs too.

3. **"The `import_runs` row with `status = 'running'` can serve as the check"
   was the wrong primitive.** It needs a stale-run timeout invented on top, and
   it cannot be taken atomically against a concurrent writer. `SET NX PX` is
   both at once, and the heartbeat makes the TTL a crash bound instead of a
   guess at the slowest run.

4. **Retention cannot be purely age-based.** "Keep 90 days" alone would, for a
   source quiet longer than the window, delete the row
   `StalenessService.previousEventsFound` reads as the collapse guard's baseline
   *and* the row `GET /admin/importers/status` shows — and a missing baseline
   disables the collapse guard entirely. The pass keeps the newest
   `RETENTION_IMPORT_RUNS_KEEP_PER_PAIR` (20) of each `(source, city)`
   regardless of age.

5. **`@Cron` handlers must not take parameters.** `cron` calls `onTick` with its
   own arguments, so a `handleTick(now = new Date())` would be handed something
   that is not a `Date`. The decorated method takes nothing and delegates to
   `runTick(now)`, which is also what the spec drives.

6. Four sources were deliberately left **out** of the default schedule and
   documented as such: `openagenda` and `predicthq` need paid/optional
   credentials, `foursquare` is capped at 500 calls a *month*, and `wikidata` is
   a one-off enrichment pass. They are one env var away.

### Alerts

One alert per `(source, city)`, most severe of: `no_successful_run` (no
`completed` run in `IMPORTER_ALERT_SILENCE_HOURS`, default 48, or never),
`last_run_failed`, `errors_above_threshold` (default 10). The nightly
`health-check` job evaluates **only pairs the schedule covers** — a source
someone ran once by hand must not alert forever — and sends one email listing
every alerting pair. A run that throws alerts immediately from the processor.
With `IMPORTER_ALERT_RECIPIENTS` empty (the default) everything is logged at
`warn` and nothing is sent, same as `data-cleanup`.

### Migration

`0006_cool_mulholland_black.sql` adds
`import_runs_source_city_started_at_idx (source, city, started_at DESC)` —
what the retention window function, the collapse-guard lookup and the admin
status `DISTINCT ON` all order by. Generated with `pnpm db:migrate:create`;
a second run reports "No schema changes". **Not applied** — `db:migrate` was
off-limits in this worktree.

### New env vars

16, all in `env.validation.ts` and `.env.example`, tabulated in `IMPORTERS.md`
§15: `IMPORTER_SCHEDULE_{ENABLED,CITIES,EVENT_SOURCES,TICKETING_SOURCES,VENUE_SOURCES,EVENTS_HOUR,TICKETING_HOUR,VENUES_HOUR,VENUES_WEEKDAY,MAINTENANCE_HOUR}`,
`IMPORTER_LOCK_TTL_SECONDS`,
`IMPORTER_ALERT_{RECIPIENTS,SILENCE_HOURS,ERRORS_THRESHOLD}`,
`RETENTION_IMPORT_RUNS_{DAYS,KEEP_PER_PAIR}`.

`IMPORTER_SCHEDULE_ENABLED` is a tri-state: unset means **on in production, off
everywhere else**, so `pnpm dev` never starts hitting city portals and an
explicit `true`/`false` wins in both directions. An unknown source or city in a
list is dropped with an `error` log rather than crashing the API at boot or
reaching `runPipeline`.

### Tests

756 → 837 unit tests, 62 → 68 suites, all passing. Six new specs:
`importer-schedule.spec.ts` (DST, tier selection, warnings, parsing),
`importer-run-lock.spec.ts` (an in-memory Redis stand-in implementing `SET NX
PX`, `GET` and the two Lua scripts for real, so expiry and compare-and-swap are
actually exercised), `importer-scheduler.service.spec.ts` (kill switch in all
three states, each tier at its hour, maintenance ordering, fan-out, bad input),
`importer-health.service.spec.ts` (every alert rule and both boundaries),
`importers.processor.spec.ts` (lock-held skip, failure alert, staleness called,
retention args, batched email), `admin-importers.controller.spec.ts` (queue, the
409, the city default).

`test/importer-scheduling.e2e-spec.ts` is new and **unexecuted** — it needs the
shared Postgres and Redis. It covers the lock against a real Redis (including
expiry, via a 1s planted key) and the retention `DELETE` against real rows. Note
for whoever runs it: `pruneImportRuns` is a global delete by design, so the spec
uses a one-year cutoff and seeds its rows at 400 days.

### Not done

- **No audit-log entry for `POST /admin/importers/run`.** `AUDIT_ACTIONS` and
  `AUDIT_TARGET_TYPES` have no importer entries, and that list is kept in sync
  with `ROADMAP-backend.md §3.2`, so adding one is a separate change. The
  endpoint logs the admin's user id instead.
- **`ingest:dump` does not take the lock.** It replays a pre-downloaded dump
  rather than running a source, so it has no `(source, city)` run to serialise
  against; running it while that city's importer is mid-run can still interleave
  writes. Recorded in `IMPORTERS.md` §15.
- **The scheduled runs pass no date window.** Fix 06's `--from/--to/--days` is
  CLI-only; a scheduled run uses each source's default horizon (90 days, or
  `POZNAN_PORTAL_HORIZON_DAYS`), which is the right default for a nightly
  refresh. A per-tier window knob would be the follow-up if a source ever needs
  a narrower nightly slice.
- `migration 0006` is generated but not applied, and the schedule is not
  validated against real quota — both need the shared DB / staging.
