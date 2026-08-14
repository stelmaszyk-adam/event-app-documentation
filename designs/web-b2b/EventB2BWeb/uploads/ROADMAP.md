# EventApp — Central Roadmap

> **This is the central roadmap.** It contains cross-cutting decisions, shared standards, success criteria, and links to platform-specific roadmaps. For implementation details, see the platform roadmaps below.

## Platform Roadmaps

| Roadmap | Repo / App | File |
|---------|-----------|------|
| Mobile B2C | React Native (CLI) — iOS + Android consumer app | [ROADMAP-mobile-b2c.md](./ROADMAP-mobile-b2c.md) |
| Web B2C | Next.js public pages — read-only discovery (SSR, SEO, OG tags) | [ROADMAP-web-b2c.md](./ROADMAP-web-b2c.md) |
| Web B2B | Next.js organizer dashboard — venue & event management | [ROADMAP-web-b2b.md](./ROADMAP-web-b2b.md) |
| Web Admin | Next.js admin panel (`eventapp-web-admin-internal` repo) — internal tools, IP-restricted | [ROADMAP-web-admin-internal.md](./ROADMAP-web-admin-internal.md) |
| Backend | NestJS API server, database, infrastructure, aggregation pipeline | [ROADMAP-backend.md](./ROADMAP-backend.md) |

---

## PoC Goal

> Launch the application in 7 Polish cities with a minimum of 1,000 events on the map, 200 claimed venues, and the first active organizers (claimed venue + published events + sent pushes) within 3 months of starting development.

**Stack:** React Native (CLI) · NestJS (backend API) · Next.js (web frontend: B2C pages + B2B dashboard + admin panel) · PostgreSQL + PostGIS · Railway · FCM + APNs (`@react-native-firebase/messaging`) · Cloudflare R2 + Cloudflare Images · Resend (transactional email) · PostHog · Twilio (SMS) · MapLibre GL JS + Stadia Maps (web) / MapLibre Native (mobile)

---

## Priority Legend

| Symbol | Meaning |
|--------|---------|
| P0 | Launch blocker — no product without this |
| P1 | Ship if time — important, but can come after launch |
| P2 | Post-validation — after confirming product-market fit |
| CUT | Cut from MVP scope — do not build now |

---

## Unified Category System

> **One category enum used everywhere:** map pins, filters, venue primary category, event category. Consistent across Mobile B2C, Web B2C, Web B2B, Admin, and Backend.

### Categories (shared between venues and events)

| Slug | Label (EN) | Label (PL) | Description / examples |
|------|-----------|------------|----------------------|
| `music` | Music | Muzyka | Concerts, live music, DJ sets, karaoke, open mic music nights |
| `nightlife` | Nightlife | Zycie nocne | Club nights, parties, bar crawls, themed nights |
| `performing_arts` | Performing Arts | Sztuki sceniczne | Theater, dance, opera, standup, comedy, improv, cabaret |
| `arts_culture` | Arts & Culture | Sztuka i kultura | Exhibitions, galleries, museums, film screenings, literary events |
| `sport_fitness` | Sport & Fitness | Sport i fitness | Sports events, runs, yoga, martial arts, fitness classes, tournaments |
| `food_drink` | Food & Drink | Jedzenie i picie | Food festivals, tastings, food trucks, markets (jarmarki), brunch events |
| `education` | Education | Edukacja | Workshops, courses, lectures, talks, conferences, meetups, masterclasses |
| `business` | Business | Biznes | Networking, startup events, professional meetups, career fairs |
| `family` | Family & Kids | Rodzina i dzieci | Kids events, family activities, educational events for children, playgrounds |
| `festival` | Festival | Festiwal | Multi-day festivals, city fairs, outdoor celebrations, cultural festivals |
| `wellness` | Wellness | Wellness | Meditation, spa events, mindfulness, wellness retreats, sound baths |
| `other` | Other | Inne | Anything that doesn't fit the above |

### Venue types (physical space descriptor — separate from category)

> A venue's **category** = what it primarily hosts (a bar -> `nightlife`, a theater -> `performing_arts`).
> A venue's **venue_type** = what kind of physical space it is.

| Slug | Label (EN) |
|------|-----------|
| `bar` | Bar / Pub |
| `club` | Club |
| `theater` | Theater |
| `gallery` | Gallery |
| `concert_hall` | Concert Hall |
| `cinema` | Cinema |
| `museum` | Museum |
| `stadium` | Stadium |
| `sports_center` | Sports Center |
| `restaurant` | Restaurant |
| `cafe` | Cafe |
| `cultural_center` | Cultural Center |
| `community_center` | Community Center |
| `coworking` | Coworking Space |
| `outdoor_space` | Outdoor Space / Park |
| `hotel` | Hotel |
| `conference_venue` | Conference Venue |
| `other` | Other |

### Map pin icons

Map pins use the **category** field directly. Each of the 12 categories has a distinct icon and color. No separate pin categorization.

---

## Phase 0 — Preparation (Week 1-2)

> Before writing the first line of application code. Infrastructure and data.

### 0.1 Legal and compliance

- [ ] P0 Define the list of allowed aggregation sources (city portals, Eventbrite public API, Google Places API, RSS/iCal venue feeds)
- [ ] P0 Prepare Privacy Policy and Terms of Service (GDPR-compliant) — B2C and B2B users
- [ ] P0 Define what constitutes acceptable proof of venue ownership for claims (SMS to phone number from venue listing, email on own domain, CEIDG/KRS document)
- [ ] P1 Check availability of CEIDG API (public, free) for automatic business address verification
- [ ] P1 Check Google Business Profile API — scope and requirements for venue verification through Google

### 0.2 / 0.3 Database & Aggregation Pipeline

> Sections 0.2 (database infrastructure, seed data, email, rate limiting, CORS, logging, error handling) and 0.3 (aggregation pipeline) are backend-specific. See [ROADMAP-backend.md](./ROADMAP-backend.md#02-database-infrastructure) for full details.

### 0.4.1 Design Tokens & Foundations

- [ ] P0 **Color palette** — define primary, secondary, accent, semantic (success/warning/error/info), and neutral colors
  - Light mode palette (launch default)
  - Dark mode palette (P1 — infrastructure ready, ship post-launch)
- [ ] P0 **Typography scale** — font families, sizes, weights, line heights
  - Mobile: system fonts (SF Pro on iOS, Roboto on Android) for performance
  - Web: Inter or similar variable font (self-hosted via `next/font`)
  - Defined scale: xs / sm / base / lg / xl / 2xl / 3xl / 4xl
- [ ] P0 **Spacing & layout** — consistent spacing scale (4px base unit: 4, 8, 12, 16, 24, 32, 48, 64)
- [ ] P0 **Border radii** — standardized set (sm: 4px, md: 8px, lg: 12px, xl: 16px, full: 9999px)
- [ ] P0 **Shadows / elevation** — 3-4 levels for cards, modals, dropdowns
- [ ] P0 **Icon set** — choose one consistent icon library (e.g., Lucide for web, `react-native-vector-icons` with Lucide mapping for mobile)
- [ ] P0 **Map pin palette** — 12 distinct colors mapped to unified categories (must be distinguishable for colorblind users — test with colorblind simulator)

### 0.4.4 Design Token Sharing Strategy

- [ ] P0 **Single source of truth** for design tokens — JSON or TypeScript file that generates:
  - Tailwind theme config (web apps)
  - NativeWind theme (mobile app)
  - CSS custom properties (if needed for non-Tailwind contexts)
- [ ] P1 **Figma design file** — mirrors token values, used for design handoff and visual QA
- [ ] P1 **Storybook** for web components (shared across B2C, B2B, Admin) — visual testing and documentation

### 0.4.5 Accessibility (a11y) Foundations

> **Target: WCAG 2.1 AA.** Shared across Web B2C, Web B2B, and Web Admin. See [Web B2B roadmap, section 0.4.5](./ROADMAP-web-b2b.md#045-accessibility-a11y-foundations--web-shared-with-web-b2c-and-admin) for full spec. Web B2C-specific items in [Web B2C roadmap, section 1.12](./ROADMAP-web-b2c.md#112-accessibility-a11y--web-b2c).

### 0.4.6 Mock Environment (all frontends)

> **Every frontend app must have a mock environment (MSW).** See [ARCHITECTURE.md §5.2.1](./ARCHITECTURE.md) for full spec.

- [ ] P0 **MSW setup in each frontend repo** (web-b2c, web-b2b, web-admin-internal, mobile-b2c):
  - `src/mocks/` directory with MSW handlers mirroring backend OpenAPI spec
  - Environment variable toggle: `NEXT_PUBLIC_API_MOCKING=true` (web) / `API_MOCKING=true` (mobile)
  - `.env.mock` file for quick mock-mode startup
  - `pnpm dev:mock` script alias in `package.json`
- [ ] P0 **Mock handlers return realistic seed data** matching the API response envelope (`{ "data": ... }`)
- [ ] P1 **Storybook and test integration** — MSW mock server used in Storybook stories and integration/E2E tests

### 0.5.1 Shared CI foundations

- [ ] P0 **ESLint config** — set up ESLint with TypeScript rules in each repo (copy base config across repos; shared npm config package is P2)
- [ ] P0 **Prettier config** — consistent formatting across all repos (same `.prettierrc` copied to each)
- [ ] P0 **TypeScript strict mode** — enable `strict: true` in `tsconfig.json` for all repos from the start

### 0.5.3 GitHub Actions — Web apps (B2C / B2B / Admin)

> Same CI/CD workflow applies to all three Next.js web apps.

- [ ] P0 **CI workflow** (triggered on: push to `develop`, push to `main`, PR to either):
  - `pnpm install` (with dependency caching)
  - `pnpm lint` — ESLint
  - `pnpm type-check` — `tsc --noEmit`
  - `pnpm build` — verify build succeeds
- [ ] P0 **CD workflow** — deploy to Cloudflare Pages / Vercel:
  - `develop` branch -> preview environment
  - `main` branch -> production environment

### 0.5.6 Code Quality Tooling

- [ ] P0 **Pre-commit hooks** — `husky` + `lint-staged` in all repos:
  - Run ESLint + Prettier on staged files before each commit
  - Prevents committing code that fails lint or formatting checks
- [ ] P1 **Commit message linting** — `commitlint` with Conventional Commits format:
  - Enforces structured commit messages (`feat:`, `fix:`, `chore:`, etc.)
  - Enables automated changelogs later
- [ ] P1 **Dependency vulnerability scanning** — `pnpm audit` in CI pipeline:
  - Fail CI on high/critical severity vulnerabilities
  - Run on every push to `develop` and `main`

### 0.5.7 Dependency Management

- [ ] P0 **Pin exact versions** in `package.json` across all repos — no `^` or `~` prefixes for reproducible builds
- [ ] P1 **Automated dependency updates** — enable Renovate or Dependabot:
  - Weekly schedule for non-breaking updates
  - Separate PRs for major version bumps
  - Auto-merge for patch updates with passing CI (P2)
- [ ] P1 **License audit** — run `license-checker` in CI:
  - Block copyleft licenses (GPL, AGPL) without manual approval
  - Allow permissive licenses (MIT, Apache-2.0, BSD, ISC)

### 0.5.5 Branch protection rules

- [ ] P0 **Branch protection on `main`** (all repos):
  - Require PR with at least 1 approval before merge
  - Require CI status checks to pass before merge
  - No direct pushes to `main`
- [ ] P1 **Branch protection on `develop`** — require CI to pass (approvals optional for faster iteration)

---

## Cross-Platform Dependencies

> Sections where multiple platforms must stay in sync. When working on one side, check the counterpart.

| Feature | Platforms involved | Sections |
|---------|-------------------|----------|
| Auth | Mobile B2C + Web B2B + Web Admin + Backend | 1.1 in each roadmap |
| Admin auth hardening (2FA, session timeout, lockout) | Web Admin + Backend | 1.1.0 (backend), 1.1 (admin) |
| Push notifications | Mobile B2C + Web B2B + Backend | 1.5 (mobile), 2.5 (B2B), 1.5/2.5 (backend) |
| Venue claim flow | Web B2B + Backend | 2.1 in each |
| Deep linking | Mobile B2C + Backend | 1.8 in each |
| i18n | All platforms + Backend | 1.9 in each |
| Accessibility (a11y) | Web B2C + Web B2B + Web Admin | 0.4.5 (B2B shared), 1.12 (B2C) |
| Image uploads | Web B2B + Backend | 2.3, 2.3.1 (B2B), 2.8 (backend) |
| Event moderation | Web Admin + Backend | 3.1 in each |
| Social sharing / OG tags | Mobile B2C + Web B2C + Backend | 1.6 in each |
| Recurring events | Mobile B2C + Web B2C + Web B2B + Backend | 1.4.1 (mobile), 1.4.3 (web B2C), 2.4 (B2B), 2.4 (backend) |
| Error monitoring (Sentry) | All platforms + Backend | 1.10.1 (mobile), 1.13 (web B2C), 1.12 (B2B), 3.5 (admin), 4.3 (backend) |
| Cookie/analytics consent | Mobile B2C + Web B2C + Web B2B + Backend | 1.11 (mobile), 1.11 (web B2C), 1.11 (B2B), 1.11 (backend) |
| Performance budgets | Web B2C + Backend | 1.14 (web B2C), 4.2.1 (backend) |
| Error & empty states | All frontends | 1.16 (web B2C), 2.10 (B2B), 3.7 (admin), various (mobile) |
| Responsive design | Web B2C + Web B2B | 1.15 (web B2C), 2.10 (B2B) |
| Community Scout (event tips) | Mobile B2C + Web B2C + Web Admin + Backend | 1.7.1 (mobile), 1.4.3 (web B2C), 3.1.1 (admin), 1.7.1 (backend) |
| Health check | Backend | 1.2 (backend), 4.3 (backend) |

---

## Schedule (12 weeks)

| Week | What to do |
|------|------------|
| 1-2 | Phase 0: Legal, DB schema, CI/CD pipelines (all repos), aggregation pipeline for Poznan |
| 3-4 | Phase 1: Auth, API backend, aggregation for 7 cities |
| 5-6 | Phase 1 cont.: B2C mobile app (map, discovery, venue profile) |
| 7-8 | Phase 1 cont. + Phase 2: Push, social sharing, B2B dashboard (claim + event management) |
| 9-10 | Phase 3: Admin panel, moderation, analytics |
| 11 | Phase 4: Tests, App Store submission, launch preparation |
| 12 | **LAUNCH** — outreach to first 50 venues in Poznan, KPI monitoring |

---

## PoC Success Criteria (go / no-go for Phase 5)

| Metric | Target | Measurement deadline |
|--------|--------|---------------------|
| Activation rate (session 1) | > 50% | Week 2 after launch |
| D7 retention | > 30% | Week 3 |
| D30 retention | > 20% | Month 2 |
| Venue claim rate | > 10% | Month 3 |
| Supply-side activation (event within 7 days of claim) | > 60% | Month 3 |
| Events/venue/month | > 4 | Month 3 |
| Zero-result search rate | < 10% | Ongoing |
| Push opt-out rate | < 15% | Ongoing |

---

## Web B2C — Read-Only Discovery Strategy

> **Principle:** Web B2C is a read-only discovery tool (browsing, searching). Actions requiring an account (follow, save, push) direct to the mobile app.

### Why a lightweight web B2C in MVP

- **SEO compounds from day one.** City/category pages (`/poznan/music`, `/krakow/this-weekend`) start indexing immediately.
- **Lower friction for discovery.** Not everyone will install an app to browse events.
- **Share links that convert.** Shared links land on a full event page with context, not just a "download the app" wall.
- **Low incremental cost.** The API is already built for mobile. A Next.js SSR frontend adds ~1-2 weeks.
- **Retention still happens on mobile.** Web is read-only — follow/save/push all redirect to the app.

### Implementation phases

| Phase | What to do | When |
|-------|------------|------|
| **MVP** | Lightweight read-only web app: map with pins, filtering, event/venue pages — all SSR for SEO. Interactive actions redirect to mobile app via smart banners. | Week 5-8 |
| **Post-launch** | Text search, additional SEO landing pages, performance optimization. | Month 3-4 |
| **Scale** | Full interactive web B2C (follow, save, web push) — only if desktop traffic > 15%. | Month 6+ |

### Scope (read-only)

**Allowed on web (without login):**
- Browsing the map, filtering by category/date/city
- Event details, venue profile, text search
- CTA "Buy tickets" / "Navigate" (external links)
- Share event (link)

**Directs to mobile app (smart banner):**
- Follow venue, save event, push notifications, submit event, submit event tip (Community Scout)

**B2C <-> B2B navigation:**
- B2C site (`eventapp.dev`) links to B2B dashboard (`dashboard.eventapp.dev`) and vice versa
- No shared auth session — B2C is unauthenticated; organizers navigate to `dashboard.eventapp.dev` and log in separately

---

## Monetization Strategy (post-launch)

> **MVP = free for all organizers.** Monetization activates after confirming product-market fit (Phase 5 success criteria met).

### Why free during MVP

- Organizers must claim venues and post events **before** there's anything worth charging for.
- The core validation question is: "Do organizers find value in reaching followers through EventApp?" — measurable without payment.
- Once 50+ organizers are active and push open rates are proven, there's leverage to introduce paid tiers.

### Planned revenue model (Month 4-6, post-launch)

| Feature | Free | Pro (~99-199 PLN/month) |
|---------|------|-------------------------|
| Claim venue | Yes | Yes |
| Events/month | 2 | Unlimited |
| Push to followers | No | Yes |
| Analytics | Basic (views only) | Full (clicks, trends, benchmarks) |
| Moderation queue | Standard (24h) | Priority (4h) |
| Social media graphics | No | Yes |

### Implementation (when ready)

- Stripe Checkout for subscription billing
- `subscriptions` table (venue_id, stripe_customer_id, plan, status, current_period_end)
- Feature gates enforced in backend based on subscription tier
- Stripe Customer Portal for self-service billing management
- Stripe webhook handler (subscription lifecycle events)

### Later revenue streams (Phase 5+)

- Platform commission: x% per ticket (native ticketing — see section 5.2)
- Platform commission: x% per pass sale (loyalty cards — see section 5.3)
- Hyper-Boost / promoted events (requires scale)

---

## Risk Register

| # | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| 1 | **Apple App Store rejection** — content policy, missing privacy labels, or metadata issues | High — blocks mobile launch | Medium | Submit early (Week 10), allow 2 review cycles. Prepare Privacy Nutrition Labels. TestFlight beta first. |
| 2 | **Aggregation pipeline yields insufficient data** — fewer than 500 events per city | High — empty map = no retention | Medium | Start pipeline in Week 1. Manual data entry as fallback. Prioritize Poznan (densest). Lower city count if needed. |
| 3 | **Stadia Maps free tier exceeded** — high map tile usage beyond 200k/month | Low — cost overrun | Low | Stadia Maps paid plans are affordable at scale. Alternatively self-host tiles with OpenMapTiles. Monitor usage via https://client.stadiamaps.com dashboard. |
| 4 | **Venue owners don't claim profiles** — low B2B activation | High — no supply-side | Medium | Pre-launch outreach (50 venues, personal calls to 10). Show follower count as incentive. Free tier removes friction. |
| 5 | **GDPR compliance gaps** — insufficient consent tracking, data deletion issues | High — legal risk | Low | ToS acceptance audit trail, account deletion E2E tests, data export endpoint. Legal review of Privacy Policy. |
| 6 | **Third-party API changes** — Eventbrite, Google Places, Twilio rate limits or pricing changes | Medium — pipeline disruption | Low | Abstraction layer per source. Multiple sources reduce single-point dependency. Monitor deprecation notices. |
| 7 | **Single developer bottleneck** — key-person risk for a 1-3 person team | High — project stalls | Medium | Thorough documentation (this roadmap). Clean code with tests. No tribal knowledge. |
| 8 | **Push notification fatigue** — users opt out due to too many notifications | Medium — kills retention | Low | Rate limit: 1 push/day/venue. Quiet hours. Per-venue mute. Monitor opt-out rate (target < 15%). |

---

## API Contract Sync Workflow

> How frontends stay in sync with backend API changes in a multi-repo setup.

### Breaking change protocol

1. **Backend developer** updates the API and ensures `@nestjs/swagger` decorators are updated.
2. **CI pipeline** auto-exports `docs/openapi.json` as an artifact on every push to `develop`.
3. **Frontend developer** runs `pnpm api:generate` to regenerate the typed client from the updated spec.
4. **Type errors** surface immediately — TypeScript strict mode catches mismatches at compile time.
5. **Coordination:** for breaking changes, backend developer posts in team Slack/Discord before merging. Frontend PRs are opened simultaneously.

### Non-breaking changes

Non-breaking changes (new optional fields, new endpoints) require no frontend coordination. Frontends regenerate clients at their own pace.

### Versioning trigger

Introduce API versioning (`/api/v1/`) before:
- First mobile production release (cannot force-update installed apps)
- External API consumers appear
- Team grows beyond 3 developers

> **Note:** This is a post-MVP concern — not a blocker for web launch. Only mandatory before the first mobile production release.

---

## Launch Checklist

> Pre-launch verification — all items must be checked before public launch.

### Data & Content
- [ ] >= 1,000 events in database across 7 cities
- [ ] Zero-result search rate < 10% for main queries per city
- [ ] Privacy Policy and Terms of Service published at `eventapp.dev/privacy` and `eventapp.dev/terms`
- [ ] All email templates tested (password reset, claim alert, welcome, moderation decision)

### Infrastructure
- [ ] Production environment deployed and stable (backend, all web apps)
- [ ] DNS configured: `api.eventapp.dev`, `eventapp.dev`, `dashboard.eventapp.dev`, `admin.eventapp.dev`
- [ ] SSL certificates active on all domains
- [ ] CORS configured for production origins only
- [ ] Rate limiting active on all endpoints
- [ ] Health check endpoint responding on backend
- [ ] Cloudflare R2 bucket configured for production
- [ ] Email sending domain (`mail.eventapp.dev`) DNS records verified (SPF, DKIM, DMARC)
- [ ] Load test: API handles 100 concurrent users without degradation (see ROADMAP-backend 4.1.1)
- [ ] Redis eviction policy configured (`allkeys-lru`, `maxmemory` set per environment)

### Monitoring
- [ ] Sentry configured and receiving errors from all 5 platforms
- [ ] PostHog configured with key event tracking
- [ ] Monitoring alerts set: error rate > 1%, API response > 2s, importer failure
- [ ] Log aggregation active (Railway log drain at minimum)
- [ ] Slow query logging enabled (queries > 500ms logged at `warn` level)

### Security
- [ ] JWT secrets rotated from development values
- [ ] All third-party API keys are production keys (not test/sandbox)
- [ ] Admin panel IP restriction active
- [ ] Helmet security headers enabled on backend
- [ ] CORS restricted to known origins
- [ ] No test accounts in production database
- [ ] Pre-commit hooks active in all repos (see section 0.5.6)

### Mobile
- [ ] App Store submission approved (iOS)
- [ ] Google Play submission approved (Android)
- [ ] Deep links / Universal Links working (tested on both platforms)
- [ ] OTA update channels (CodePush) configured for production
- [ ] Apple Privacy Nutrition Labels prepared and submitted (see ROADMAP-mobile-b2c 4.3)

### Legal & Compliance
- [ ] Cookie consent banner live on all web apps
- [ ] Analytics consent opt-out functional
- [ ] GDPR account deletion endpoint tested end-to-end
- [ ] ToS acceptance recorded on registration
- [ ] DPAs signed with third-party data processors (Sentry, PostHog, Resend, Twilio) — see [ARCHITECTURE.md §24.6](./ARCHITECTURE.md#246-third-party-data-processors)

---

## What is NOT in MVP (intentionally cut)

| Feature | Reason for cutting |
|---------|-------------------|
| CUT Own ticketing system | Legal + technical complexity. Deep link is sufficient. Validate demand first. |
| CUT Passes / loyalty cards | Requires ticketing. Phase 5. |
| CUT Post-event surveys | Requires check-in. Phase 5. |
| CUT Chats / social feed | Users have WhatsApp. High cost, low differentiation. |
| CUT Reviews and event ratings | Cold-start problem. Zero value with a small user base. |
| CUT "Friends" and social graph | Too complex for PoC. Not needed for validation. |
| CUT EventApp+ premium for users | Kills growth before 50K MAU. |
| CUT Facebook / Instagram venue verification | Meta API — weeks of procedures. Phase 2+. |
| CUT Mobile dashboard for organizers | Web is sufficient. Bar owner manages at the computer. |
| CUT Hyper-Boost / contextual advertising | Requires scale. Phase 3+. |
| CUT Advanced analytics / AI recommendations | Requires data. Minimum 6 months of traction. |

---

## Technical Architecture — Summary

```
Repo: eventapp-mobile-b2c (React Native CLI)
    |-- B2C App (iOS + Android)
    |-- Push notifications (@react-native-firebase/messaging -> FCM + APNs)

Repo: eventapp-web-b2c (Next.js — SSR, no API routes)
    |-- Public Pages (SSR for SEO + og:tags)
    |-- Domain: eventapp.dev

Repo: eventapp-web-b2b (Next.js — Organizer Dashboard)
    |-- Venue management, Event management
    |-- Push notification sender, Analytics
    |-- Domain: dashboard.eventapp.dev

Repo: eventapp-web-admin-internal (Next.js — Admin Panel, IP-restricted)
    |-- Event moderation, Venue/User management, KPI dashboard

Repo: eventapp-backend (NestJS — standalone Node.js server)
    |-- AuthModule, EventsModule, VenuesModule, UsersModule
    |-- NotificationsModule, UploadsModule, ImportersModule
    |-- ClaimsModule, AdminModule

Infrastructure
    |-- PostgreSQL + PostGIS (Railway)
    |-- Redis (caching + rate limiting + OTP storage)
    |-- Cloudflare R2 + Cloudflare Images
    |-- Resend (transactional email)
    |-- Twilio (SMS verification)
    |-- PostHog (analytics)
    |-- Sentry (error monitoring)
```

---

*Living document — update after each sprint. Last updated: April 2026.*
