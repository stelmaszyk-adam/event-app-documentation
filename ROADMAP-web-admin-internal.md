# Wydarzka — Web Admin Internal Roadmap

> **Platform:** Next.js admin panel — internal tools, IP-restricted
> **Repo:** `wydarzka-web-admin-internal`
> **Domain:** `admin.wydarzka.dev`
> **Central roadmap:** [ROADMAP.md](./ROADMAP.md)

---

## Design Reference

> **Design system:** [`documentation/designs/DESIGN.md`](./designs/DESIGN.md)
> **Figma — Light Foundation:** [StartupMVP — Light](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=2-5&t=70ljQRJQdMB3LkP3-0)
> **Figma — Dark Foundation:** [StartupMVP — Dark](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=3-4314&t=70ljQRJQdMB3LkP3-0)

---

## Phase 0 — Preparation (Week 1-2)

### 0.4.3 Component Library — Web Admin specific

> Shared web components (shadcn/ui, Tailwind config) are defined in [ROADMAP-web-b2b.md](./ROADMAP-web-b2b.md#043-component-library--web-shared-with-web-b2c-and-admin).

- [ ] P0 **Web Admin specific components:**
  - Data table with sorting, filtering, pagination
  - Moderation card (event data + action buttons)
  - KPI card

### 0.4.7 Mock Environment (MSW) — Web Admin

> See [central roadmap §0.4.6](./ROADMAP.md#046-mock-environment-all-frontends) and [ARCHITECTURE.md §5.2.1](./ARCHITECTURE.md) for full spec.

- [ ] P0 Install `msw` (dev dependency)
- [ ] P0 Create `src/mocks/` directory with MSW handlers matching backend OpenAPI spec
- [ ] P0 Browser service worker setup (`src/mocks/browser.ts`) + server setup for tests (`src/mocks/server.ts`)
- [ ] P0 Environment variable toggle: `NEXT_PUBLIC_API_MOCKING=true`
- [ ] P0 `.env.mock` file + `pnpm dev:mock` script in `package.json`

### 0.5.3 GitHub Actions — wydarzka-web-admin-internal

> Same CI/CD workflow as other web apps — see [central roadmap, section 0.5.3](./ROADMAP.md#053-github-actions--web-apps-b2c--b2b--admin).

- [ ] P0 **CI workflow** (triggered on: push to `develop`, push to `main`, PR to either):
  - `pnpm install` (with dependency caching)
  - `pnpm lint` — ESLint
  - `pnpm type-check` — `tsc --noEmit`
  - `pnpm build` — verify build succeeds
- [ ] P0 **CD workflow** — deploy to Cloudflare Pages / Vercel:
  - `develop` branch -> preview environment
  - `main` branch -> production environment
  - IP restriction applied at infrastructure level (Cloudflare Access or firewall rules)

---

## Phase 1 — Core (Week 3-6)

### 1.1 Auth and user management

- [ ] P0 Admin login page (email + password, restricted to `admin` role)
- [ ] P1 **2FA/MFA setup and verification UI:**
  - TOTP setup flow: QR code display, manual key entry, verification code confirmation
  - TOTP code input on every login after password step
  - Recovery codes display (one-time, on setup) with download/copy option
- [ ] P1 **Session timeout handling:**
  - Access tokens expire every 15 min (auto-refreshed silently via refresh token)
  - Auto-logout after 30 min of inactivity (when refresh token expires; configurable)
  - Warning modal 5 minutes before session expiry with "Extend session" option
  - Redirect to login page on session expiry with "session expired" message
- [ ] P1 **Failed login lockout UI:**
  - Display remaining attempts after 3rd failed login
  - Lockout screen with countdown timer (15 min lockout after 5 failed attempts)
  - "Contact super-admin" link on lockout screen

---

## Phase 3 — Admin Panel (Week 6-8)

> Internal tool consuming NestJS API. IP-restricted. Must work, doesn't have to be beautiful.

### 3.1 Event moderation

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#31-event-moderation)

- [ ] P0 Moderation queue UI: events from new venues awaiting review
- [ ] P0 Moderation queue UI: events submitted by B2C users
- [ ] P0 Event card view in queue:
  - All event data
  - Map with address
  - Profile of user/venue that added it (when joined, event history, rejection history)
  - Previous event history for this venue
- [ ] P0 Buttons: Approve / Reject (with reason selection) / Ask user
- [ ] P0 Counters: how many events in queue, avg review time, % approved

### 3.1.1 Community Scout — Event Tip Review

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#171-community-scout--event-tips)

- [ ] P0 **Event tip review queue** — separate tab/section within moderation:
  - List of pending event tips (sortable by created_at, filterable by category)
  - Tip card view: submitted data (title, date, link, photo, note, category), user profile (join date, scout level, previous tip history)
  - Inline link preview if `link_url` provided (show title + thumbnail from URL)
  - Photo viewer if `image_url` provided (poster/flyer image)
- [ ] P0 **Tip actions:**
  - **Approve** — marks tip as approved, notifies user
  - **Reject** — with reason text field, notifies user
  - **Convert to Event** — opens event creation form pre-populated with tip data; on save, tip status becomes `converted` and links to the new event
- [ ] P0 **Tip queue counters:** pending tips count in sidebar badge (alongside moderation queue count)
- [ ] P0 **Scout user profile view** — from tip review, link to user detail with scout stats (tips submitted, approved, conversion rate)

### 3.2 Venue management

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#32-venue-management)

- [ ] P0 List of all venues (filter: unclaimed / claimed / banned / pending)
- [ ] P0 Venue detail view: data, claim history, event history, followers
- [ ] P0 Manual approval/rejection UI for claim requests (document method)
- [ ] P0 Ban venue button (+ message to owner)
- [ ] P0 Warning venue button (notification without ban)
- [ ] P0 Audit log view: every admin action (who, what, when, on which venue/event)
- [ ] P0 **Audit log scope:** all create/update/delete actions on venues, events, users, claims, and moderation decisions
- [ ] P0 **Audit log retention:** 1 year (compliance requirement)
- [ ] P1 **Audit log export:** CSV download for compliance reviews
- [ ] P1 **Audit log filtering:** by admin user, by action type, by date range, by target entity
- [ ] P1 Manual adding/editing venues UI (e.g., for City Launcher during onboarding)

### 3.3 User management

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#33-user-management)

- [ ] P0 User detail view: email, registration date, follow count, submitted event count, reputation score
- [ ] P0 Ban user button (block ability to add events)
- [ ] P1 "Trusted reporters" list with option for manual downgrade

### 3.4 Monitoring and KPIs

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#34-monitoring-and-kpis)
>
> **Data source:** All KPI data is served by backend aggregation endpoints (`GET /admin/kpis/*`), NOT fetched directly from PostHog. The backend computes metrics from its own database tables (users, events, venues, notifications_log, follows) and from PostHog's server-side API where needed (DAU/WAU/MAU). The admin panel has no PostHog JS SDK — it only renders data from the backend API.

- [ ] P0 KPI dashboard (refreshed via polling every 60 seconds or manual refresh button):
  - DAU / WAU / MAU (backend queries PostHog server-side API or tracks via `users.last_active_at`)
  - New registrations (today / week / month) — from `users` table
  - New events (native vs aggregated) — from `events` table
  - New venues (unclaimed vs claimed) — from `venues` table
  - Venue claim rate (%) — from `claim_requests` table
  - Zero-result search rate (%) — backend tracks via `search_zero_results` counter in Redis or DB
  - Push open rate (%) — from `notifications_log` table
- [ ] P0 Importer monitor view (API/feeds): last run status, number of imported events, errors

### 3.5 Error Monitoring

- [ ] P0 **Sentry integration** — configure `@sentry/nextjs` for error tracking
  - Capture client-side and server-side errors
  - Source maps upload during build for readable stack traces
  - Attach `correlationId` (from API response headers) to error reports

### 3.6 Internationalization (i18n)

> Admin panel is internal — English-only at launch. Polish localization is P2 if non-English-speaking team members join.

- [ ] P0 All admin UI strings in English (hardcoded is acceptable for MVP — no i18n library needed)
- [ ] P2 Evaluate need for PL translation based on team composition

### 3.7 Error & Empty States

- [ ] P0 **Error states:**
  - API error: inline error message with retry button on failed data loads
  - Session expired: redirect to login with "Session expired" message
  - 403 Forbidden (non-admin user): "Access denied — admin privileges required"
- [ ] P0 **Empty states:**
  - Empty moderation queue: "No events pending review" (with count badge showing 0)
  - Empty venue list (filtered): "No venues match your filters"
  - Empty user list: "No users found"
  - Empty audit log: "No actions recorded yet"
- [ ] P0 **Loading states:** skeleton loaders for data tables, KPI cards, moderation queue

### 3.8 Cookie Consent / Analytics

> Admin panel is IP-restricted and used only by internal team members. PostHog is not integrated (no analytics tracking on admin panel). No cookie consent banner needed — only essential cookies (auth session) are used.

---

## Phase 4 — Testing and Launch (Week 9-12)

### 4.1 Testing

- [ ] P0 Smoke test: admin login -> moderation queue -> approve/reject event
- [ ] P0 Smoke test: event tip review -> approve tip -> convert to event -> scout user notified
- [ ] P0 Smoke test: venue management -> ban venue -> audit log entry appears
- [ ] P0 Smoke test: KPI dashboard loads with correct data
- [ ] P1 Verify IP restriction works (requests from non-allowed IPs are blocked)
- [ ] P1 Verify 2FA/MFA flow end-to-end (setup, login, recovery code)

---

*Living document — update after each sprint. Last updated: April 2026.*
