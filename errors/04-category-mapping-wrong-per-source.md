# Fix 04: Every source is mapped with the city-portal vocabulary, so 50% of ebilet events become `other`

**Repo:** `backend`
**Priority:** P1
**Dependencies:** none
**Found:** 2026-10-14 — review of `src/importers`

---

## Symptom

Category filters are close to useless for ticketing-site imports. Classical
concerts, stage shows and book events all show up under `other` instead of
`music`, `performing_arts` and `education`/`arts_culture`.

## Evidence

`src/importers/scripts/ingest-dump.ts:273` routes **every** dump source
through the municipal-portal mapper:

```ts
const category = this.categoryMapper.mapCityPortalCategory(ev.categoryHint);
```

But each source speaks its own vocabulary. Measured against the dumps actually
sitting in `backend/data/imports/`:

```
ebilet/poznan-20260918-1042.json      118 events
  Muzyka 24, Klasyka 24, Event 23, Teatr 17, Widowiska 12, Rodzina 11, Biznes 7

city_portal/poznan-20260918-1042.json 1037 events
  Teatr 475, Muzyka 352, Sztuka 112, Inne 72, Książki 12, kultura 10, Film 4
```

`CITY_PORTAL_CATEGORY_MAP`
(`src/importers/shared/category-mapper.service.ts`) contains none of
**`klasyka`**, **`event`**, **`widowiska`** or **`książki`**. So for that
ebilet file: 24 + 23 + 12 = **59 events, 50%, fall through to `other`**, and
only `Muzyka`/`Teatr`/`Rodzina`/`Biznes` map correctly. Adding the `Książki`
miss from the portal dump, the unmapped total across both files is 71 events.

The fallback path is `mapCityPortalCategory` → no direct hit → per-token retry
→ `'other'` (service lines ~90-100).

## Root cause

One vocabulary table serving three different upstream taxonomies, with a silent
`'other'` fallback that makes the gap invisible.

## Fix

### Close the immediate gaps

- [x] P0 **Add the missing Polish terms** to `CITY_PORTAL_CATEGORY_MAP`:
  - `klasyka` → `music`
  - `widowiska`, `widowisko` → `performing_arts`
  - `ksiazki`, `ksiazka` → `education` (note: `normalizePolish` already strips
    the `ż`, so the key must be the stripped form — confirm against that helper)
  - `event`, `eventy` → `other` **explicitly**, so it is a decision rather than
    a fallthrough
- [x] P0 **Verify the whole observed vocabulary is covered.** Enumerate the
      hints present in the committed dumps and assert each maps somewhere
      deliberate:
  ```bash
  for f in backend/data/imports/*/*.json; do
    node -e "const d=require('./$f');const c={};for(const e of d.events)c[e.categoryHint??'null']=(c[e.categoryHint??'null']||0)+1;console.log('$f',JSON.stringify(c))"
  done
  ```

### Make the mapping per-source

- [x] P1 **Dispatch on the dump's source** instead of always calling the
      city-portal mapper. `CategoryMapperService` already has a source-aware entry
      point (the wrapper above `mapCityPortalCategory` delegates to it); give it
      real branches and call that from `ingest-dump.ts:273`:
  - `city_portal` → the existing Polish municipal map.
  - `ebilet`, `goout` → their own Polish commercial-ticketing terms.
  - `ticketmaster` → map the Discovery API's English
    `classifications[].segment.name` / `genre.name` (`Music`, `Sports`,
    `Arts & Theatre`, `Family`, `Rock`, `Classical`, …). Note
    `download/parsers/ticketmaster.ts` sets `categoryHint` from
    `genre.name ?? segment.name`, so both levels must be handled.
  - JSON-LD sources → the schema.org `@type` values that
    `normalize.ts:fromJsonLdEvent` puts in `categoryHint`
    (`MusicEvent`, `TheaterEvent`, `SportsEvent`, `ScreeningEvent`,
    `ComedyEvent`, `Festival`, `EducationEvent`, `BusinessEvent`).
- [x] P1 **Surface misses instead of swallowing them.** When a non-empty hint
      maps to `other`, log it once per run and count it into the run's
      `import_runs.metadata` (e.g. `unmappedCategoryHints: { Klasyka: 24 }`). That
      turns the next vocabulary drift into something visible in the admin status
      endpoint rather than a silent quality loss.

All 12 target categories are fixed and shared across platforms — `music`,
`nightlife`, `performing_arts`, `arts_culture`, `sport_fitness`, `food_drink`,
`education`, `business`, `family`, `festival`, `wellness`, `other`. Do not
invent new ones.

### Tests

- [x] P0 **Unit tests per source vocabulary** in a
      `category-mapper.service.spec.ts`: a table-driven case list covering every
      hint observed in the dumps above, each asserting its expected unified
      category.
- [x] P0 **A guard test for the fallback rate:** feed the committed ebilet
      Poznań dump's hint distribution through the mapper and assert the `other`
      share is below a threshold (e.g. 20%), so a future vocabulary change fails
      the suite instead of degrading quietly.

## Verification

```bash
pnpm -C backend test -- category-mapper
pnpm -C backend ingest:dump --path data/imports/ebilet
```

```sql
SELECT category, count(*) FROM events WHERE source = 'ebilet'
GROUP BY 1 ORDER BY 2 DESC;
-- `other` should no longer dominate
```

## Acceptance criteria

- [x] For the committed ebilet Poznań dump, `other` drops from 50.0% to 0.0%.
- [x] Ticketmaster and JSON-LD hints map through their own vocabularies, not the
      Polish municipal one.
- [x] Unmapped non-empty hints are counted in `import_runs.metadata`.

## References

- `src/importers/shared/category-mapper.service.ts`
- `src/importers/scripts/ingest-dump.ts`
- `backend/data/imports/` (committed sample dumps — gitignored, present locally)
- `CLAUDE.md` § Key Conventions (the 12 unified categories)

---

## Resolution (2026-10-14)

Done as specified, plus one addition the plan did not anticipate and two
corrections to its evidence.

1. **`Event` is not an ebilet category — it is schema.org's `@type`.** The plan
   reads `Event 703` as an ebilet vocabulary term to map to `other`. It is not:
   `download/shared/normalize.ts#fromJsonLdEvent` copies the JSON-LD `@type`
   into `categoryHint`, and ebilet's listing pages only ever say
   `"@type": "Event"`. Mapping it to `other` would have written off 703 of the
   1695 local ebilet events (41%) that *are* categorisable — the category sits
   in the ticket URL: `https://www.ebilet.pl/teatr/komedia/<slug>`.
   So `ebilet` additionally declares a **URL taxonomy** (`urlTaxonomyHosts`,
   `urlTaxonomyDepth: 2`) and the mapper reads the two leading path segments
   when the hint itself resolves to nothing. Only those segments, never the
   title slug, and only for the configured host — pinned by
   "reads only the taxonomy segments, never the title slug" and
   "ignores URLs from other hosts and malformed URLs". `goout` has no such
   taxonomy (`goout.net/pl/<title-slug>/<id>/`), so it gets no URL fallback.

2. **Four outcomes, not two.** A single `other` could not distinguish "we
   decided" from "we have no idea", which is the root cause the plan names.
   `mapEventCategory` returns `{ category, match, hint }` with
   `match: 'mapped' | 'generic' | 'unmapped' | 'missing'`:
   `generic` is the deliberate catch-all set (`Event`, `Inne`, `Pozostałe`,
   `Miscellaneous`, …), `unmapped` is vocabulary drift, `missing` is a source
   that sent no hint at all. `CategoryHintReport` tallies the last two kinds
   separately into `import_runs.metadata.unmappedCategoryHints` and
   `.genericCategoryHints`, and `DumpIngestService` logs each new drifting hint
   once per run. The tally is computed before the exact-id dedup
   short-circuit, so a re-ingest still reports the dump's whole vocabulary.
   `inne` therefore moved out of the category map into the generic set — same
   `other`, but now visible as 171 events on the city-portal runs.

3. **Per-source vocabularies.** `SOURCE_VOCABULARIES` maps each source to an
   ordered list of tables: `POLISH_COMMON` (shared Polish terms) extended by
   `CITY_PORTAL_CATEGORY_MAP` (municipal, plus the English labels go2warsaw
   publishes) or `TICKETING_PL_CATEGORY_MAP` (ebilet/goout, incl. the genre
   segments), `TICKETMASTER_CATEGORY_MAP` (Discovery segments *and* genres —
   `parsers/ticketmaster.ts` prefers the genre, so both levels are keyed), and
   `JSON_LD_CATEGORY_MAP` (schema.org `@type`), which every source consults as
   a secondary table because any source can emit one. Whole-label lookups run
   before token lookups across all tables, which is what keeps Ticketmaster's
   `Dance/Electronic` (music) apart from its `Dance` (performing arts). The
   vocabularies genuinely diverge in one place today: on ebilet `wystawa`
   appears under `biznes` and means a trade fair (`business`), where a city
   portal's `Wystawa` is an art show (`arts_culture`).

4. **Measured, over every dump in `data/imports/` (read-only):**

   | source | events | `other` before | `other` after | unmapped hints left |
   |---|---|---|---|---|
   | `ebilet/poznan-20260918-1042.json` | 118 | 50.0% | **0.0%** | none |
   | `ebilet` (all 19 files) | 1695 | 64.1% | **0.0%** | none |
   | `city_portal` (all 9 files) | 1958 | 13.9% | **12.6%** | none (171 `Inne` + 75 no-hint) |
   | `goout` (all 12 files) | 90 | 100% | 100% | none (90 generic `Event`) |

   The quoted file now splits 54 `music` / 46 `performing_arts` / 11 `family` /
   7 `business`. **goout does not improve**: every goout event in the dumps is a
   permanent museum exhibition whose JSON-LD carries only `@type: Event`, and
   its URLs hold no taxonomy — they are now *counted* as generic instead of
   silently `other`. Guessing a category from the title slug would have been
   invention, so it was left out.

5. **Evidence nit.** The plan's `Książki` count is from a different file than
   the ebilet line; across the dumps it is 26 events, all city-portal, now
   `education` (the key is `ksiazki` — `normalizePolish` does strip `ż`, as the
   plan suspected).

**Side effect:** typing the mapper's returns as `UnifiedCategory` (derived from
`unifiedCategoryEnum`) made the `as UnifiedCategory` casts in
`google-places.importer.ts` and `openstreetmap.importer.ts` redundant;
`eslint --fix` removed them and their now-unused local type aliases.

**Verification run:** `pnpm -C backend lint`, `type-check` and `test` are all
green (47 suites, 508 tests; 69 of them in the new
`category-mapper.service.spec.ts`). `test/category-mapping.e2e-spec.ts` is new
and **was not run** — the local Postgres was shared with concurrent fixes — so
the database-level assertions (stored `events.category`, the metadata tally)
still need one `pnpm -C backend test:e2e`.

**Not addressed here** (out of scope): `openagenda.importer.ts` and
`rss-ical.importer.ts` still call `mapCityPortalCategory`, i.e. they read a
French/feed taxonomy with the Polish municipal vocabulary. That is the same
class of bug as this one, but there is no sample data in the repo to build
their vocabularies from, and `rss-ical` currently hard-codes
`categoryHint: null` anyway. Switching them is a one-line change per call site
once a dump exists.
