# Importer defects — standalone fix tasks

Findings from a review of `backend/src/importers` on 2026-10-14. Each file in this
folder is **one self-contained task**: symptom, evidence with `file:line`, root
cause, an ordered fix checklist, and verification steps. They are written so an
agent (or a human) can pick a single file, fix it, and open one commit without
reading the others.

All of them live in the **`backend`** repo.

## Index

| #   | Task                                                                                        | Priority | Blast radius                                                                    | Depends on |
| --- | ------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------- | ---------- |
| 01  | [Event dedup is unwired and its SQL throws](01-event-dedup-unwired-and-broken-sql.md)       | P0       | Duplicate events from every multi-source city                                   | none       |
| 02  | [Importer dates hardcode UTC+2](02-importer-timezone-hardcoded-utc2.md)                     | P0       | Every Nov–Mar event is 1h off                                                   | none       |
| 03  | [`venue_source_mappings` lacks a unique index](03-venue-source-mappings-missing-index.md)   | P0       | Quadratic ingest, duplicate mapping rows                                        | none       |
| 04  | [50% of ebilet events land in `other`](04-category-mapping-wrong-per-source.md)             | P1       | Category filters unusable                                                       | none       |
| 05  | [Events have no identity table and are never updated](05-event-identity-and-update-path.md) | P1       | Stale titles/times, rescheduled events shown twice, cancellations never removed | 03         |
| 06  | [No date window; Ticketmaster silently truncates at 1000](06-importer-date-window.md)       | P2       | Missing events in large cities                                                  | none       |
| 07  | [No tests on the date/parse layer](07-test-coverage-normalize-and-parsers.md)               | P2       | Regressions in the most bug-prone code                                          | 02         |
| 08  | [Importers never run on a schedule](08-importer-scheduling.md)                              | P2       | Data goes stale between manual runs                                             | 05         |
| 09  | [Two parallel importer stacks](09-consolidate-dual-importer-stacks.md)                      | P3       | Duplicated logic, divergent behavior                                            | 05         |

Suggested order: **01 → 02 → 03 → 04** (small, independent, each measurably
improves data quality), then **05** as one migration-shaped task, then the rest.

## How to pick one up

```bash
# 1. Read the task file end to end.
# 2. Branch per the repo convention (trunk-based, squash merge):
git -C backend checkout -b fix/<task-slug>
# 3. Implement the checklist, then:
pnpm -C backend lint && pnpm -C backend type-check && pnpm -C backend test
```

Mark checkboxes `- [x]` only when code **and** tests exist for the item; use
`- [~] … — deferred: reason` when something needs staging, credentials or a
human decision.

## Scope note

These files are **not** part of the `scripts/run-tasks.sh` pipeline — that reads
`backend/tasks/<phase>/NN-name.md` and `backend/CURRENT_TASK.md`. This folder is
a defect backlog for ad-hoc pickup. To run any of these through the pipeline
instead, register it as a real task (`/new-task`) and keep the file here as the
reference write-up.

## Repo conventions that apply to every task here

- TypeScript strict. Never silence anything with `@ts-ignore`, `eslint-disable`,
  `any`, `.skip`, or by deleting a test.
- Exact dependency versions (no `^` / `~`), pnpm only.
- Run commands from the workspace root as `pnpm -C backend <script>`; do not `cd`.
- Do not edit `CURRENT_TASK.md` or `documentation/PROGRESS.md` by hand — a hook
  blocks it.
- Never read or commit `.env.local` / `.env.production` / `.env.staging`.
