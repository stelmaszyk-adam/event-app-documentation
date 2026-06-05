# Wydarzka — Web B2B Roadmap

> **Platform:** Next.js organizer dashboard — venue & event management
> **Repo:** `wydarzka-web-b2b`
> **Domain:** `dashboard.wydarzka.dev`
> **Central roadmap:** [ROADMAP.md](./ROADMAP.md)

---

## Design Reference

> **Design system:** [`documentation/designs/DESIGN.md`](./designs/DESIGN.md)
> **Figma — Light Foundation:** [StartupMVP — Light](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=2-5&t=70ljQRJQdMB3LkP3-0)
> **Figma — Dark Foundation:** [StartupMVP — Dark](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=3-4314&t=70ljQRJQdMB3LkP3-0)

---

## Phase 0 — Preparation (Week 1-2)

### 0.4.3 Component Library — Web (shared with Web B2C and Admin)

- [x] P0 **UI framework: shadcn/ui + Tailwind CSS** — decision documented in ARCHITECTURE.md ADR #15
- [ ] P0 **Tailwind config** with design tokens (colors, typography, spacing, radii) shared across all three web apps
  - Shared config package or copy (monorepo: shared package; multi-repo: published npm package or copy with version pin)
- [ ] P0 **Core components** (shadcn/ui primitives, themed with design tokens):
  - Button, Input, Textarea, Select, Checkbox, Radio
  - Card, Badge, Avatar
  - Dialog / Modal, Sheet (slide-over panel)
  - Table (for admin lists, B2B event lists)
  - Tabs, Dropdown Menu
  - Toast / Notification
  - Form (with react-hook-form + zod validation)
  - Skeleton loaders
- [ ] P0 **Web B2B specific:**
  - Dashboard layout (sidebar + main content)
  - Stat card (follower count, views, clicks)
  - Chart wrapper (for analytics, using Recharts or similar)

### 0.4.6 API Client Setup — Web B2B

> Web B2B uses `orval` to generate TanStack Query hooks from the OpenAPI spec (see [ARCHITECTURE.md §3.3](./ARCHITECTURE.md#33-each-frontend-generates-its-own-client)).

- [ ] P0 Install `orval` (dev dependency), `@tanstack/react-query`, and `axios` (runtime dependencies)
- [ ] P0 Create `orval.config.ts` — configure input (spec path/URL), output (`src/api/generated/`), client (`axios`), and TanStack Query hook generation
- [ ] P0 Configure codegen script in `package.json`: `"api:generate": "orval"`
- [ ] P0 Create `src/api/client.ts` — configured Axios instance with `NEXT_PUBLIC_API_URL` base URL, JWT interceptor for auth header, and refresh token rotation on 401
- [ ] P0 First codegen run: generate hooks from backend `docs/openapi.json`
- [ ] P0 Add `src/api/generated/` to `.gitignore` (regenerated on demand, not committed)
- [ ] P0 Set up `QueryClientProvider` in root layout (`app/layout.tsx`)

### 0.4.7 Mock Environment (MSW) — Web B2B

> See [central roadmap §0.4.6](./ROADMAP.md#046-mock-environment-all-frontends) and [ARCHITECTURE.md §5.2.1](./ARCHITECTURE.md) for full spec.

- [ ] P0 Install `msw` (dev dependency)
- [ ] P0 Create `src/mocks/` directory with MSW handlers matching backend OpenAPI spec
- [ ] P0 Browser service worker setup (`src/mocks/browser.ts`) + server setup for tests (`src/mocks/server.ts`)
- [ ] P0 Environment variable toggle: `NEXT_PUBLIC_API_MOCKING=true`
- [ ] P0 `.env.mock` file + `pnpm dev:mock` script in `package.json`

### 0.4.5 Accessibility (a11y) Foundations — Web (shared with Web B2C and Admin)

> **Target: WCAG 2.1 AA compliance.** shadcn/ui (built on Radix UI) provides accessible primitives out of the box — the goal is to preserve and extend that baseline, not retrofit.

- [ ] P0 **WCAG 2.1 AA** declared as the compliance target for all three web apps
- [ ] P0 **Color contrast** — all design tokens pass AA contrast ratios (4.5:1 for normal text, 3:1 for large text and UI components); verify with contrast checker during token definition
- [ ] P0 **Keyboard navigation** — all interactive components keyboard-navigable (shadcn/ui default via Radix — do not override with `tabIndex` hacks or `onClick`-only handlers on non-button elements)
- [ ] P0 **Alt text convention** — event/venue name as `alt` for content images; decorative images use `alt=""`; enforce in shared `<EventImage>` / `<VenueImage>` components
- [ ] P0 **Focus indicators** — visible `focus-visible` styles on all interactive elements (Tailwind `focus-visible:ring-*` in shared config)
- [ ] P1 **Skip-to-content link** on all web apps (hidden until focused)
- [ ] P1 **Map accessibility** — List view as accessible alternative to map (already exists via Map ↔ List toggle); `aria-live` region to announce search result count changes
- [ ] P1 **Form error accessibility** — `aria-describedby` linking form inputs to error messages (react-hook-form + shadcn/ui Form component handles this; verify it's preserved in custom forms)
- [ ] P1 **Reduced motion** — respect `prefers-reduced-motion` media query for animations/transitions

---

## Phase 1 — Core (Week 3-6)

### 1.1 Auth and user management

- [ ] P0 Organizer registration / login page (company email + venue verification flow)
- [ ] P0 Email verification page — shown after registration; "Check your email" message with resend link; verification link redirects back to dashboard login
- [ ] P0 Password reset page

### 1.10 Terms of Service Acceptance

> Organizers must accept ToS before accessing the dashboard; re-consent required when ToS version changes.

- [ ] P0 **ToS checkbox on organizer registration page:** required checkbox with link to Privacy Policy and Terms of Service (cannot register without accepting)
- [ ] P0 **Send `tos_accepted: true` + current ToS version** in registration API call
- [ ] P0 **Re-consent modal:** shown when backend returns `TOS_ACCEPTANCE_REQUIRED`:
  - Display summary of ToS changes (or link to full text)
  - "I accept" button → calls `POST /auth/tos/accept`
  - Block dashboard access until accepted (full-screen modal, no dismiss)
- [ ] P0 **ToS and Privacy Policy links** in dashboard footer and in account settings page

### 1.9 Internationalization (i18n)

- [ ] P0 Set up i18n in organizer dashboard (`next-intl` or `next-i18next`) with PL as default
- [ ] P0 PL translation file for dashboard UI strings (forms, labels, modals, notifications)
- [ ] P0 EN translation file for dashboard

### 1.11 Cookie Consent

> GDPR requires explicit consent before non-essential tracking. Organizers are external users — cookie consent is mandatory.

- [ ] P0 **Cookie consent banner** on all Web B2B dashboard pages:
  - Show on first visit (before any tracking fires)
  - Options: Accept all / Reject all / Manage preferences
  - Categories: Essential (always on), Analytics (PostHog)
  - Persist consent choice (cookie or localStorage)
- [ ] P0 **PostHog consent management:**
  - Do NOT initialize PostHog until organizer grants analytics consent
  - If organizer rejects analytics: no PostHog scripts loaded, no events tracked
- [ ] P0 "Manage cookie preferences" link in dashboard footer (re-opens consent modal)

### 1.12 Error Monitoring & Analytics Integration

- [ ] P0 **Sentry integration** — configure `@sentry/nextjs` for error tracking
  - Capture client-side and server-side errors
  - Source maps upload during build for readable stack traces
  - Attach `correlationId` (from API response headers) to error reports
- [ ] P0 **PostHog integration** — configure `posthog-js` for product analytics
  - Initialize PostHog only after organizer grants analytics consent (see section 1.11)
  - Track key events: `dashboard_view`, `event_created`, `event_published`, `event_deleted`, `push_sent`, `venue_claimed`, `venue_profile_edited`, `analytics_viewed`

---

## Phase 2 — B2B Dashboard (Week 5-8)

> Dashboard for organizers — web app (Next.js frontend + NestJS API backend), not mobile.

### 2.1 Venue claim flow

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#21-venue-claim-flow)

- [ ] P0 Claim landing page: "Do you manage this venue? Claim the profile for free."
- [ ] P0 **Registration of a venue not on the map:** form with name, address, category, phone number, and email
  - Address validation via Nominatim geocoding (must be a valid location)
  - **Fallback when address is not recognized by Geocoding API:** organizer can manually set a pin on the map (drag & drop) — GPS coordinates saved directly, text address entered manually without validation
  - After admin approval: venue appears on the map, organizer automatically becomes its owner (without a separate claim flow)
  - Review time: max 24h
- [ ] P0 **Method 1 (priority):** SMS verification UI — enter OTP code received via SMS
- [ ] P0 **Method 2:** Email verification UI — backend auto-matches organizer's email domain with venue website domain from aggregated data; enter code or click verification link sent to that email
- [ ] P1 **Method 3:** Google Business Profile verification UI (OAuth flow)
- [ ] P1 **Method 4 (fallback):** Document upload form (CEIDG/KRS/invoice)
- [ ] P0 **Aggregated event handover on claim:**
  - On successful claim, existing aggregated events for the venue are "adopted" — ownership transfers to the organizer (`source` field preserved for attribution)
  - Aggregation pipeline stops importing new events for claimed venues
  - Post-claim review UI: organizer sees list of adopted events and can confirm, edit, or delete each before they appear under their name

### 2.2 Organizer onboarding after claim

- [ ] P0 Onboarding checklist with progress bar:
  - [ ] Add venue photo
  - [ ] Complete description
  - [ ] Add opening hours
  - [ ] Add first event
  - [ ] Send push to followers
- [ ] P0 Each checklist step opens the corresponding dashboard module

### 2.3 Venue profile management

- [ ] P0 Edit venue profile:
  - Name, description (max 500 characters)
  - Photo gallery management (upload up to 5 photos, drag-to-reorder, set main photo, delete individual photos — Cloudflare R2)
  - Venue category
  - Opening hours (per day of week)
  - Temporary closures (e.g., "Closed for renovation Jan 15-Feb 1") — date range + optional reason, displayed on venue profile
  - Holiday hours / special hours (e.g., Christmas Eve, New Year's — override regular hours for specific dates)
  - Variable closing times ("Open until late") — option to mark closing time as approximate/flexible instead of a fixed hour
  - Address (edit if incorrect from aggregated data)
  - Website, Facebook/Instagram profile
- [ ] P0 Preview of how the profile looks to users (preview mode)

### 2.3.1 Image Upload UX

> Backend image processing pipeline defined in [ROADMAP-backend.md](./ROADMAP-backend.md#28-image-processing-pipeline). This section covers the frontend upload experience.

- [ ] P0 **Drag-and-drop image upload** component (reusable for venue photos + event photos):
  - Drag-and-drop zone with click-to-browse fallback
  - Upload progress indicator (per file)
  - File type validation (JPEG, PNG, WebP) with clear error message on rejection
  - File size validation (max 10 MB) with clear error message
  - Preview thumbnail after upload completes
- [ ] P0 **Photo gallery management UI:**
  - Drag-to-reorder photos (updates `position` via `PATCH /venues/:id/photos/reorder`)
  - Delete individual photo with confirmation
  - Visual indicator for main photo (position 0)
- [ ] P1 **Upload error states:**
  - Network failure: retry button per failed upload
  - Quota exceeded: clear message with current usage vs limit
  - Moderation flagged: "Photo under review" indicator

### 2.4 Event management

- [ ] P0 Event list (upcoming / past / draft)
- [ ] P0 Event creation — form:
  - Name (required)
  - Date and time (required)
  - Duration (optional)
  - Recurring event: yes/no (daily/weekly/monthly) — see recurring event UI below
  - Category (required)
  - Description (basic rich text, max 1000 characters)
  - Photos (upload up to 3, reorderable — Cloudflare R2; first photo used as main)
  - Price: free / paid (enter price + link to external tickets)
  - Ticket link (eBilet / Going / own website)
  - Venue-optional: event without a permanent venue (food truck, pop-up) — enter address manually
- [ ] P0 Edit event
- [ ] P0 Delete event (soft-delete)
- [ ] P0 Draft / Publish flow (event does not appear publicly until published)
- [ ] P0 **Adopted (aggregated) event management:**
  - Organizer can edit and delete adopted events (full control, same as manually created events)
  - Source attribution badge on adopted events: "Originally imported from [source]" — visible to organizer, not shown publicly
  - If venue is unclaimed (organizer deletes account or releases venue), adopted events revert to aggregated state
- [ ] P1 **Recurring event UI management:**
  - **Recurrence picker** (shown when "Recurring: yes" is toggled):
    - Frequency selector: Daily / Weekly / Monthly
    - For weekly: day-of-week multi-select (e.g., every Mon + Wed)
    - For monthly: day-of-month picker (with warning for day 29-31 about month skipping)
    - End condition: "Never" (default) / "On date" (date picker) / "After N occurrences" (number input)
    - Max 1 year ahead limit with inline validation message
    - Preview: "This event will repeat every Wednesday until Dec 31, 2026 (38 occurrences)"
  - **Series management panel** (on event details page for recurring events):
    - Badge: "Recurring — [Weekly on Wednesdays]" with link to view all instances
    - "View all occurrences" — paginated list of all generated instances with status (upcoming / cancelled / modified)
    - Quick actions per instance: Edit / Cancel / Restore (if cancelled)
  - **Edit scope dialog** (triggered when editing a recurring event instance):
    - Modal with three radio options: "This event only" / "This and all future events" / "All events in the series"
    - Clear explanation text for each option
    - Destructive warning for "All events" option (overwrites future modifications)
  - **Cancel single occurrence:**
    - Confirmation modal: "Cancel [Event Name] on [Date]? Followers who saved this event will be notified."
    - Optional cancellation reason text field
    - Cancelled instances shown with strikethrough + "Cancelled" badge in the series list
  - **Stop/delete series:**
    - "Stop recurring" button on series management panel — ends recurrence, keeps past instances
    - "Delete entire series" — soft-deletes all instances + template, confirmation modal with count of affected events

### 2.4.2 Draft Auto-Save

- [ ] P1 **Auto-save event draft to localStorage** every 30 seconds while editing
- [ ] P1 **Draft recovery on page load:** check for unsaved draft, offer "Restore draft?" prompt with preview of saved data
- [ ] P1 **Clear draft** on successful publish or explicit discard (discard button in editor)

### 2.4.0 Timezone Display

- [ ] P0 **Display all event times in the venue's local timezone** — Poland = CET/CEST for MVP
- [ ] P0 **Show timezone label next to time inputs** (e.g., "CET (UTC+1)" in winter, "CEST (UTC+2)" in summer)
- [ ] P2 **Timezone selector** for venues outside Poland — deferred (single-country MVP)

### 2.4.1 Event details page

- [ ] P0 Event details page (read-only view for organizer):
  - Event photo gallery (carousel of all uploaded photos from `event_photos`)
  - Name, date, time, duration, category
  - Description (full text)
  - Price info + ticket link
  - Venue name + address (with map pin)
  - Source attribution (if aggregated)
  - Status badge: Draft / Published / In moderation / Rejected
- [ ] P0 Quick action buttons:
  - Edit event (navigate to edit form)
  - Delete event (soft-delete with confirmation modal)
  - Duplicate event (pre-fill creation form with event data)
  - "Notify followers" (navigate to push sender, pre-filled with event)
- [ ] P0 Analytics summary section (inline on details page):
  - Views count
  - "Buy tickets" clicks
  - "Navigate" clicks
  - Push reach and open rate (if push was sent)
- [ ] P1 Link to public event page (Web B2C URL, opens in new tab)
- [ ] P1 Event activity timeline: created, published, push sent, moderation status changes

### 2.5 Push notifications

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#25-push-notifications)

- [ ] P0 "Notify followers" button after publishing an event
- [ ] P0 Daily limit indicator: show remaining push quota (max 1/day/venue, enforced by backend)
- [ ] P0 Push content preview before sending (editable, max 120 characters)
- [ ] P0 Confirmation: "You will send a notification to X followers. This is your venue's daily push notification. Continue?"
- [ ] P0 Send tracking display: how many sent, how many opened (open rate)
- [ ] P0 Sent notifications history (last 30)

### 2.6 Analytics (basic)

- [ ] P0 Dashboard main view (overview):
  - Follower count (trend: +X this week vs previous)
  - Total event views (last 30 days)
  - Number of "Buy tickets" clicks (last 30 days)
  - Number of "Navigate" clicks (last 30 days)
- [ ] P0 Per-event analytics: views, CTA clicks, push reach
- [ ] P1 Simple chart: followers over time (last 12 weeks)
- [ ] P1 Comparison: "Your event vs category average" (anonymous benchmark)

### 2.7 Social media graphics

- [ ] P2 "Download graphic" button in organizer dashboard per event
- [ ] P2 Preview of generated graphics (1080x1080 feed + 1080x1920 stories)

### 2.9 Multi-Venue Organizer Support

> One organizer can claim and manage multiple venues.

- [ ] P0 **Venue switcher** in dashboard navigation — dropdown/list of all venues owned by the current organizer
  - Default selection: most recently claimed venue (or first alphabetically)
  - All dashboard views (events, analytics, push, profile) scoped to the selected venue
- [ ] P0 **"My Venues" list page** — overview of all organizer's venues with key stats (follower count, upcoming events count) and quick-switch links
- [ ] P0 Aggregate overview on dashboard home: combined follower count and event count across all venues (with per-venue breakdown)

### 2.10 Responsive Design & Error States

- [ ] P0 **Responsive dashboard layout:**
  - Desktop (1024px+): sidebar navigation + main content area (primary target)
  - Tablet (768-1023px): collapsible sidebar, full-width content
  - Mobile (< 768px): bottom navigation or hamburger menu, stacked layout — functional but not optimized (organizers primarily use desktop)
- [ ] P0 **Error & empty states:**
  - 404 page: "Page not found" with link to dashboard home
  - API error states: inline error messages with retry option on failed data loads
  - Empty states: "No events yet — create your first event" (with CTA), "No followers yet", "No analytics data yet"
  - Loading states: skeleton loaders for dashboard cards, event lists, analytics charts
- [ ] P0 **Session expired state:** redirect to login with "Your session has expired, please log in again" message

---

## Phase 4 — Testing and Launch (Week 9-12)

### 4.1 Testing

- [ ] P0 E2E test: claim venue -> add event -> push to followers
- [ ] P0 E2E test: organizer registration -> login -> venue claim -> onboarding checklist
- [ ] P0 E2E test: event CRUD — create draft -> publish -> edit -> delete
- [ ] P0 E2E test: photo upload -> reorder -> delete (venue and event photos)
- [ ] P1 E2E test: recurring event creation -> edit single instance -> cancel occurrence -> delete series
- [ ] P1 Cross-browser testing: Chrome, Safari, Firefox (desktop)
- [ ] P1 Accessibility audit: keyboard navigation through dashboard forms and modals

---

## Phase 5 — Post-launch (Month 4-6)

### 5.2 Ticketing (native)

- [ ] P2 Event capacity management UI (max attendees)
- [ ] P2 Check-in app for organizer (QR scan at entry)
- [ ] P2 Sales and payout overview

### 5.3 Passes / loyalty cards

- [ ] P2 Venue creates "10-entry pass" (punchcard)
- [ ] P2 Venue creates "monthly subscription" (recurring)

### 5.4 Advanced analytics for organizers

- [ ] P2 Charts: followers over time, event views over time
- [ ] P2 Follower demographics (age, city — anonymized, GDPR-safe)
- [ ] P2 Benchmark: "Your events vs category average in your city"
- [ ] P2 Data export to CSV

### 5.5 Post-event surveys

- [ ] P2 Survey results in organizer dashboard (average rating, comment word cloud)

---

*Living document — update after each sprint. Last updated: April 2026.*
