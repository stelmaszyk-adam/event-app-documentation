# Wydarzka — Web B2C Roadmap

> **Platform:** Next.js public pages — discovery (SSR, SEO, OG tags) + authenticated user actions (event submission, event tips)
> **Repo:** `wydarzka-web-b2c`
> **Domain:** `wydarzka.dev`
> **Central roadmap:** [ROADMAP.md](./ROADMAP.md)

---

## Design Reference

> **Location:** [`documentation/designs/web-b2c/EventB2CWeb/`](./designs/web-b2c/EventB2CWeb/)
> **Design roadmap:** [`ROADMAP-design-web-b2c.md`](./designs/web-b2c/EventB2CWeb/uploads/ROADMAP-design-web-b2c.md)
> **Figma — Light Foundation:** [StartupMVP — Light](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=2-5&t=70ljQRJQdMB3LkP3-0)
> **Figma — Dark Foundation:** [StartupMVP — Dark](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=3-4314&t=70ljQRJQdMB3LkP3-0)

The design prototype is a static HTML/JSX application that defines the visual direction for the Web B2C application. Serve locally to preview:

```bash
cd documentation/designs/web-b2c/EventB2CWeb
python3 -m http.server 8080   # or: npx serve -p 8080
```

### Screens

| Screen | Source file | Description |
|--------|------------|-------------|
| **Search & Discovery (main page)** | `src/screens.jsx` → `SearchDiscoveryScreen` | Split-view layout: scrollable event list (left) + interactive SVG map with category-colored pins (right). Top header includes logo, city selector dropdown, search input, "Dla Organizatorów" link, and PL/EN language toggle. Horizontal filter bar with icon chips (Dzieje się teraz, Muzyka, Klub, Sztuka, Jedzenie, Sport, Teatr, Komedia, Tech, Film, Festiwal, Wellness, Dzieci), date filter, and sort control (Trafność/Data/Odległość). Event cards show thumbnail with badges, category badge, title, date/time, venue, price, save button, and optional community scout attribution ("Polecone przez @username"). Map pins are color-coded by category with price labels; pin click shows mini-card popup. "Search this area" pill on map pan. "Wiesz o ciekawym wydarzeniu?" CTA at bottom of results list. Mobile: floating "Pokaż na mapie" FAB. Cookie consent banner overlays on first visit. Footer with Odkryj (city links), Kategorie, Dla biznesu (Panel Organizatora), Prawne (Regulamin, Polityka prywatności, cookies), app store badges, and social icons (Instagram, Facebook, TikTok). |
| **Event Detail** | `src/screens.jsx` → `EventDetailScreen` | Full event detail view: hero image with category badge, "Szybko znika" tag, share button, and thumbnail gallery. Breadcrumb navigation. Two-column layout — left: event title, community scout attribution badge, date/time with icon, venue with address, recurring event indicator ("Cotygodniowo" + "Zobacz wszystkie daty"), "O wydarzeniu" description with hashtags, "Dodaj do kalendarza" section (Google Calendar, Apple Calendar .ics, Outlook .ics), "Może Cię też zainteresować" related events grid. Right sidebar: price card (price in zł, urgency indicator "Ostatnie 12% biletów", "Kup bilety" CTA in violet), "Nawiguj" and "Zapisz" buttons, venue mini-card with avatar and follower count. Smart banner: "Zapisz w aplikacji — Otrzymuj przypomnienia 24 h przed wydarzeniem" with App Store / Google Play buttons. Full footer. |
| **Venue Profile** | `src/screens.jsx` → `VenueProfileScreen` | Venue detail view: hero image with category badge and share button. Breadcrumb navigation. Venue name, address, stats row (followers count, upcoming events count, open/closed status with hours). "O miejscu" description with "To Twoje miejsce? Przejmij je w Panelu Organizatora" CTA link. Opening hours table (daily schedule, today highlighted). "Nadchodzące wydarzenia" list with thumbnail, date/time, title, and date block. Empty state when no upcoming events. Right sidebar: embedded SVG map with category pin and address, "Nawiguj" button. Smart banner: "Obserwuj w aplikacji — Powiadomienia o nowych wydarzeniach" with App Store / Google Play buttons. Full footer. |
| **City Picker — city list** | `src/overlays.jsx` → `CityPickerOverlay` | Modal overlay "Wybierz miasto" with search input. Shows "Popularne miasta" grid with city tiles displaying name, event count, and region (Poznań, Kraków, Warszawa, Wrocław, Gdańsk, Łódź, Katowice, Lublin, Szczecin). Active city highlighted. Diacritics-insensitive search filtering. |
| **City Picker — no match** | `src/overlays.jsx` → `CityPickerOverlay` | Same modal — when searched city is not available, shows "[City] nie jest jeszcze dostępne" with description "Daj nam znać, że chcesz oglądać wydarzenia w swoim mieście" and a "Zgłoś [City]" primary button. |
| **Date Picker** | `src/overlays.jsx` → `DatePickerOverlay` | Modal "Wybierz datę" with quick-select preset chips: Dzisiaj, Jutro, W ten weekend, W tym tygodniu, Dowolny zakres. Month calendar (May 2026) with today highlighted and range selection (start/end/in-range/single states). "Wyczyść" and "Zastosuj" (violet) action buttons. |
| **Cookie Banner** | `src/overlays.jsx` → `CookieBanner` | Bottom banner with cookie icon: "Używamy plików cookie — Wykorzystujemy ciasteczka, by ulepszać Twoje doświadczenie, analizować ruch i personalizować treści." Three actions: "Akceptuj wszystkie" (primary violet), "Odrzuć wszystkie" (secondary), "Zarządzaj" (tertiary). |
| **Cookie Preferences** | `src/overlays.jsx` → `CookiePrefsOverlay` | Modal "Preferencje cookies" with category toggles: Niezbędne (always on, disabled toggle), Analityczne (PostHog), Marketingowe (Meta/Google pixels). "Anuluj" and "Zapisz preferencje" action buttons. |

### Components

| Component | Source file | Description |
|-----------|------------|-------------|
| **AppHeader** | `src/components.jsx` | Logo, city selector with MapPin icon, search input, flex spacer, "Dla Organizatorów" external link with ArrowUpRight icon, PL/EN language toggle |
| **FilterBar** | `src/components.jsx` | Horizontal chip row: "Dzieje się teraz" toggle with Flame icon, divider, 12 category chips (each with icon and color), date filter chip, sort chip (cycles: Trafność → Data → Odległość) |
| **EventCard** | `src/components.jsx` | Horizontal search result card: thumbnail with overlay badges (Na żywo/Szybko znika/Cotygodniowo) and save heart button, body with category badge, date, time, title, venue + address, community tip attribution, price (or "Bezpłatne"). Highlighted state with accent border for map-list sync |
| **MapCanvas** | `src/components.jsx` | Stylized SVG map of Poznań with street grid, Warta river, parks (Sołacki, Cytadela), and neighborhood labels |
| **MapPin** | `src/components.jsx` | Category-colored pin bubble with icon and price label. Active state with scale-up |
| **MapPopup** | `src/components.jsx` | Mini-card on pin click: event image with category badge, close button, date/time, title, venue, "Zobacz szczegóły" link |
| **AppFooter** | `src/components.jsx` | 5-column footer: brand block (logo, tagline, App Store/Google Play badges), Odkryj (city links), Kategorie, Dla biznesu (Panel Organizatora + description), Prawne (Regulamin, Polityka prywatności, cookies). Bottom bar: copyright + social icons (Instagram, Facebook, TikTok) |
| **Icons** | `src/icons.jsx` | SVG icon library: MapPin, Search, ChevronDown, Calendar, Clock, Heart/HeartFill, Share, Navigation, Ticket, Flame, Repeat, AtSign, Filter, Plus, Minus, X, ChevronLeft, ChevronRight, ArrowUpRight, Bell, Users, Tag, Disc, Music, Palette, Utensils, Trophy, Drama, Laugh, Cpu, Film, Sparkles, Leaf, Baby, Locate, Cookie, Instagram, Facebook, Tiktok |

### Data & Assets

| File | Contents |
|------|----------|
| `src/data.jsx` | 13 categories (with icons and CSS variable colors), 9 Polish cities (with event counts and regions), 12 sample events (with venues, coordinates, badges, hashtags, descriptions), venue detail for SQ Klub (hours, followers, description) |
| `assets/colors_and_type.css` | CSS variables: color palette (violet primary, category colors, surface tones), typography scale (Inter font, display through caption), spacing, radius, and elevation tokens |
| `assets/app.css` | Full component styles: header, filter bar, event cards, map, pins, popups, detail pages, footer, overlays, cookie banner, responsive breakpoints |
| `assets/sample-*.jpg` | Sample images: 3 event photos (jazz, rock, techno) + 1 venue photo (Klub Stodoła) |

The companion **ROADMAP-design-web-b2c.md** contains the full design roadmap: core component inventory (buttons, cards, chips, overlays, loading/empty states), screen designs for all phases (search & discovery split-screen, event detail, venue profile, utility/legal pages), interaction & motion specs, dark mode pass, responsive audit checklist, and developer handoff preparation.

### Design Patterns & Visual Notes

- **Color palette:** Violet/purple primary (#7C3AED range), light gray backgrounds, white cards with subtle borders
- **Category badges:** Colored pill badges on event cards and detail pages (Music = violet, Art = green, Club = pink, Food = red, Theatre = blue, Festival = orange)
- **Map pins:** Color-coded by category with text labels, matching badge colors
- **Cards:** White background, soft rounded corners, no hard 1px borders — uses tonal elevation (consistent with "Radiant Curator" design system)
- **CTAs:** Primary actions in solid violet (Buy Tickets, Accept All, Apply), secondary in outline style
- **Smart banners:** Subtle app download prompts on event and venue pages with App Store / Play Store buttons
- **Footer:** 4-column layout — Discover (city + category links), For Organizers (dashboard link + description), Legal (ToS, Privacy, Cookie Policy, manage preferences), Get the App (store buttons + social icons)
- **Typography:** Clean sans-serif (Inter), strong size contrast between headings and body text

---

## Phase 0 — Preparation (Week 1-2)

### 0.4.3 Component Library — Web B2C

> Shared web components (shadcn/ui, Tailwind config) are defined in [ROADMAP-web-b2b.md](./ROADMAP-web-b2b.md#043-component-library--web-shared-with-web-b2c-and-admin). Web B2C consumes the same Tailwind config and shadcn/ui primitives.

### 0.4.6 API Client Setup — Web B2C

> Web B2C uses `openapi-typescript` + `openapi-fetch` for a lightweight, SSR-friendly typed API client (see [ARCHITECTURE.md §3.3](./ARCHITECTURE.md#33-each-frontend-generates-its-own-client)).

- [x] P0 Install `openapi-typescript` (dev dependency) and `openapi-fetch` (runtime dependency)
- [x] P0 Configure codegen script in `package.json`: `"api:generate": "openapi-typescript <spec-path> --output src/api/generated/schema.d.ts"`
- [x] P0 Create `src/api/client.ts` — configured `openapi-fetch` client with `NEXT_PUBLIC_API_URL` base URL
- [x] P0 First codegen run: generate types from backend `docs/openapi.json` (URL or file mode)
- [x] P0 Add `src/api/generated/` to `.gitignore` (regenerated on demand, not committed)

### 0.4.7 Mock Environment (MSW) — Web B2C

> See [central roadmap §0.4.6](./ROADMAP.md#046-mock-environment-all-frontends) and [ARCHITECTURE.md §5.2.1](./ARCHITECTURE.md) for full spec.

- [x] P0 Install `msw` (dev dependency)
- [ ] P0 Create `src/mocks/` directory with MSW handlers matching backend OpenAPI spec — PARTIAL: files exist but seed shapes/paths don't match live client
- [ ] P0 Browser service worker setup (`src/mocks/browser.ts`) + server setup for tests (`src/mocks/server.ts`) — PARTIAL: exports exist; `worker.start()` never called; no `mockServiceWorker.js`
- [ ] P0 Environment variable toggle: `NEXT_PUBLIC_API_MOCKING=true` — documented only; no start path
- [ ] P0 `.env.mock` file + `pnpm dev:mock` script in `package.json`

### 0.5.3 GitHub Actions — wydarzka-web-b2c

> Same CI/CD workflow as other web apps — see [central roadmap, section 0.5.3](./ROADMAP.md#053-github-actions--web-apps-b2c--b2b--admin).

- [x] P0 **CI workflow** (triggered on: push to `develop`, push to `main`, PR to either):
  - `pnpm install` (with dependency caching)
  - `pnpm lint` — ESLint
  - `pnpm type-check` — `tsc --noEmit`
  - `pnpm build` — verify build succeeds
- [ ] P0 **CD workflow** — deploy to Cloudflare Pages / Vercel: — NOT DONE: deploy steps are TODO placeholders
  - `develop` branch -> preview environment
  - `main` branch -> production environment

---

## Phase 1 — Core (Week 5-8)

### 1.1 Auth and user management

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#11-auth-and-user-management)
> Mobile B2C counterpart: [ROADMAP-mobile-b2c.md](./ROADMAP-mobile-b2c.md#11-auth-and-user-management)

Browsing the map and reading event/venue pages requires no login. Authentication gates only interactive write actions: event submission and event tip submission.

- [ ] P0 **"Sign In" entry point in header:**
  - Desktop: "Sign In" text link in the top-right of the navbar; replaced by user avatar dropdown when authenticated
  - Mobile (hamburger menu): "Sign In" item at the top of the menu
  - Avatar dropdown (authenticated): links to `/profile`, `/my-submissions`, `/my-tips`, and "Sign Out"
- [ ] P0 **Login page (`/login`):**
  - Email + password form
  - Google Sign In button (OAuth redirect flow)
  - "Don't have an account? Sign up" link → `/register`
  - "Forgot password?" link → `/forgot-password`
  - `next` query param support: after login, redirect to the page the user was visiting (e.g. `/login?next=/submit-event`)
- [ ] P0 **Registration page (`/register`):**
  - Email + password form
  - Google Sign In button (OAuth redirect flow — creates account if none exists)
  - ToS acceptance checkbox with links to `/terms` and `/privacy` (required before submitting)
  - "Already have an account? Sign in" link → `/login`
- [ ] P0 **Google OAuth web flow:**
  - Client redirects to Google authorization endpoint
  - Google redirects back to `/api/auth/callback/google` with authorization code
  - Next.js API route exchanges code via `POST /auth/oauth/google` → receives access + refresh tokens → sets `httpOnly` cookies
- [ ] P0 **JWT storage — `httpOnly` cookies:**
  - Access token and refresh token stored in `httpOnly`, `Secure`, `SameSite=Lax` cookies set by Next.js API route proxy (`/api/auth/*`)
  - Prevents XSS access to tokens; SSR-compatible (cookies are forwarded with every request)
  - Next.js middleware reads the access token cookie and attaches it as `Authorization: Bearer` header when proxying to the backend
- [ ] P0 **Token refresh — transparent middleware:**
  - Next.js middleware (`src/middleware.ts`) intercepts requests to protected routes
  - If access token is expired, middleware calls `POST /auth/refresh` with the refresh token cookie → stores new token pair in cookies → forwards the request transparently
  - User never sees a session expiry on short page loads
- [ ] P0 **Password reset flow:**
  - `/forgot-password` page: email input, calls `POST /auth/password-reset/request`; always shows "If an account exists, you'll receive an email"
  - `/reset-password` page: loaded via link from email (`?token=xxx`); accepts new password; calls `POST /auth/password-reset/confirm`
- [ ] P0 **Email verification:**
  - After registration, redirect to `/verify-email` page: "Check your email" message with resend button
  - Deep link from verification email hits `/api/auth/verify-email?token=xxx` → calls `POST /auth/verify-email` → confirms account and redirects to homepage
- [ ] P0 **Sign out:**
  - Calls `POST /auth/logout` (revokes refresh token on backend) then clears `httpOnly` cookies via Next.js API route
  - Redirects to homepage
- [ ] P1 **User profile page (`/profile`):**
  - Account info: email, display name
  - Change password form
  - Language preference toggle (PL / EN)
  - Links to "My Submissions" and "My Tips"
  - Account deletion (GDPR): "Delete my account" — confirmation dialog → calls account deletion endpoint → signs out and shows confirmation
- [ ] P1 **ToS re-consent:**
  - If backend returns `TOS_ACCEPTANCE_REQUIRED` on any authenticated request, show a re-consent modal matching the mobile-b2c flow (summary of changes, "I accept" button, blocks interaction until accepted)

### 1.3 Map and discovery

- [x] P0 Main page: map with event pins (MapLibre GL JS + Stadia Maps — see [ARCHITECTURE.md ADR #17](./ARCHITECTURE.md#11-key-architectural-decisions-log))
- [x] P0 Pin clustering at high zoom-out
- [x] P0 Custom pin icons per unified category (same 12 categories as mobile — see [central roadmap](./ROADMAP.md#unified-category-system))
- [x] P0 Category filter (multiselect)
- [x] P0 Date filter: calendar date-range picker (select start and end date) with quick-select presets (Today, Tomorrow, This weekend)
- [x] P0 Distance filter: 0.5 / 1 / 3 / 5 km (same presets as mobile)
- [x] P0 City selection (same list as mobile)
- [x] P0 Map <-> List toggle
- [x] P0 Event mini-card on pin click (photo + name + time + venue)
- [x] P0 City listing pages with SSR (`/poznan`, `/krakow`, `/wroclaw`, etc.) — SEO from day one
- [x] P0 Category listing pages (`/poznan/music`, `/krakow/this-weekend`) — SEO
- [ ] P1 Text search bar (event name / venue name) — PARTIAL: UI present, not wired to API
- [ ] P1 "Happening Now" filter — PARTIAL: toggle UI present, not applied to results

### 1.3.0 Onboarding / First-Visit Experience

- [ ] P0 **Browser geolocation flow:** — PARTIAL: click-to-prompt + denial → city picker work; IP/GeoIP fallback and browser-settings link missing
  - Do NOT prompt for geolocation on first page load (browsers penalise unprompted requests)
  - Show "Use my location" button on map — triggers browser geolocation prompt on click
  - On denial / dismiss: fall back to IP-based geolocation (coarse city-level, e.g. via Cloudflare `cf-ipcountry` + GeoIP)
  - If IP geolocation also fails: show city picker (same city list as mobile)
  - After denial: hide "Use my location" button, show "Location unavailable — select your city" with city picker
  - No re-prompt possible in browsers — link to browser site settings instructions if user wants to re-enable
- [ ] P0 **First-visit default state:** — PARTIAL: city picker + cookie banner on first visit; no IP-based city auto-detect
  - Map centers on detected city (from IP geolocation) with events loaded
  - If no city can be detected: show city picker overlay before loading map
  - Cookie consent banner fires immediately (per section 1.11)
- [x] P1 **City selection persistence:**
  - Store selected city in localStorage
  - On return visit: load last selected city (skip geolocation prompt)
  - "Change city" option always visible in header/nav

### 1.3.1 SEO Technical Foundations

- [ ] P0 **`sitemap.xml` generation** — dynamic, auto-updated sitemap covering: — PARTIAL: cities/categories/date filters included; event + venue URLs missing
  - City listing pages (`/poznan`, `/krakow`, etc.)
  - Category listing pages (`/poznan/music`, `/krakow/this-weekend`, etc.)
  - Event detail pages (with `lastmod` from `updated_at`)
  - Venue profile pages
  - Use Next.js `app/sitemap.ts` for automatic generation; split into sub-sitemaps if >50k URLs
- [ ] P0 **Sitemap freshness:** — PARTIAL: `revalidate = 3600` set; `lastModified` uses `now`, not entity `updated_at`
  - Use Next.js ISR (Incremental Static Regeneration) for sitemap — revalidate every 1 hour
  - Set `<lastmod>` on event pages from `updated_at` timestamp
- [ ] P1 **Submit sitemap to Google Search Console** after launch
- [x] P0 **`robots.txt`** — allow all public pages, disallow internal/preview routes, reference sitemap URL
- [x] P0 **Structured data / JSON-LD for events** — [Google Event rich results](https://developers.google.com/search/docs/appearance/structured-data/event):
  - `Event` schema on every event detail page (`name`, `startDate`, `endDate`, `location`, `image`, `description`, `offers` if ticket URL exists)
  - `Place` schema on venue profile pages (`name`, `address`, `geo`)
  - Validate with Google Rich Results Test before launch — still pending (Phase 4)
- [ ] P0 **Canonical URLs** — `<link rel="canonical">` on every page: — PARTIAL: present on city/filter/event/venue; missing on `/cookie-policy` and home
  - Locale variants: canonical points to default locale (`/poznan/music`), `hreflang` handles alternates (coordinates with section 1.9)
  - Query parameter pages (filters, pagination): canonical points to base URL without query params
  - Prevent duplicate content between `/poznan` and `/poznan?category=all`

### 1.4.1 Event details page

- [x] P0 Event details page (SSR for SEO + OG tags):
  - Photo gallery (clickable thumbnails or carousel; sourced from `event_photos`, fallback to single `photo_url`)
  - Name, date, time, address
  - Description
  - Venue name with link to venue profile page
  - CTA "Buy tickets" (deep link to external system)
  - CTA "Navigate" (deep link to Google Maps / Apple Maps — free, no API key needed)
  - Source attribution for aggregated events
- [x] P0 "Share" button (copy link)
- [x] P1 "Add to calendar" button (dropdown with options):
  - Google Calendar (pre-filled link with event parameters)
  - Apple Calendar (.ics file download)
  - Outlook (.ics file download)
- [x] P0 Smart banner: "Follow this venue in the app" -> app store link
- [x] P0 Smart banner: "Save this event in the app" -> app store link

### 1.4.2 Venue profile page

- [ ] P0 Venue profile page (SSR for SEO): — PARTIAL: gallery, hours, followers, upcoming events present; holiday/temporary-closure UI missing; map is decorative SVG not coords-bound
  - Photo gallery (grid or carousel; sourced from `venue_photos`, fallback to single `photo_url`)
  - Name, category, description, opening hours (including temporary closures, holiday hours, and "open until late" indicators when applicable)
  - Follower count
  - List of upcoming events
  - Address with map
- [x] P0 Smart banner: "Follow this venue in the app" -> app store link

### 1.4.25 "For Organizers" Cross-App Link

> Web B2C is the public-facing discovery site. The B2B organizer dashboard lives at `dashboard.wydarzka.dev` (see [ARCHITECTURE.md §Domain Mapping](./ARCHITECTURE.md)). A persistent link in the B2C navigation allows venue owners and event organizers to discover and access the dashboard.

- [x] P0 **Header link — "For Organizers":**
  - Visible in the top navbar on all pages (desktop: text link; tablet/mobile: inside hamburger menu)
  - Links to `dashboard.wydarzka.dev` (opens in new tab, `target="_blank"` with `rel="noopener noreferrer"`)
  - Label: "For Organizers" (PL: "Dla Organizatorów") — uses i18n translation key
  - Positioned after main nav items but before language toggle
  - Visual treatment: tertiary/text style — should not compete with primary CTAs (e.g. no gradient, no button shape)
- [x] P0 **Footer link — "Organizer Dashboard":**
  - In a "For Business" or "Organizers" section of the footer (alongside Terms, Privacy, Cookie Policy links)
  - Label: "Organizer Dashboard" (PL: "Panel Organizatora")
  - Same external link behavior (`dashboard.wydarzka.dev`, new tab)
  - Optionally include a short description: "Manage your venue, create events, and track analytics"
- [x] P1 **Contextual CTA on venue profile page:**
  - Below the venue info section, show a subtle CTA: "Is this your venue? Claim it on the Organizer Dashboard"
  - Links to `dashboard.wydarzka.dev` (or a deep link to the venue claim flow if available)
  - Only shown as a static link (Web B2C has no auth, so no conditional logic based on ownership)

### 1.4.3 Community Scout — "Know about an event?" CTA

> Full tip submission spec: [section 1.7.1](#171-community-scout--event-tips-web) below.
> Mobile B2C counterpart: [ROADMAP-mobile-b2c.md](./ROADMAP-mobile-b2c.md#171-community-scout--event-tips)

- [ ] P0 **"Know about an event?" CTA** on map/listing pages (visible to all users):
  - For **logged-in users**: clicking opens the lightweight tip submission modal (see section 1.7.1)
  - For **unauthenticated users**: clicking shows "Sign in to submit a tip" prompt with a link to `/login?next=/submit-tip`; also includes smart banner linking to the mobile app as an alternative
- [ ] P0 **"Tipped by @username"** attribution on event detail pages for community-sourced events (read-only display, SSR)

### 1.4.4 Recurring event display

- [ ] P0 **Recurring event indicator** on event detail page:
  - "Part of a weekly series" badge (or daily/monthly, based on recurrence type)
  - "View all dates" link -> list/accordion of all upcoming instances in the series
  - Each instance links to its own event detail page

### 1.5 Image placeholder / loading strategy

- [x] P1 Placeholder images when venues/events have no photos (branded fallback per category)
- [ ] P1 Progressive image loading (blur hash / LQIP from Cloudflare Images, Next.js `<Image>` blur placeholder) — PARTIAL: blur placeholder uses flat category-color SVG, not real Cloudflare LQIP
- [x] P1 Broken image fallbacks (graceful fallback to placeholder on load error)

### 1.6 Social sharing / OG tags

- [x] P0 Open Graph meta tags on every event page (SSR):
  - `og:title` — event name
  - `og:description` — date + venue + short description
  - `og:image` — dynamically generated graphic (Cloudflare Worker / satori)
  - `og:url` — canonical event URL
- [x] P0 Dedicated URL for each event (deep link that opens app or website)

### 1.7 Event submission form

> Backend endpoint: `POST /events/user-submit` (see [ROADMAP-backend.md](./ROADMAP-backend.md#12-api-endpoints))
> Mobile B2C counterpart: [ROADMAP-mobile-b2c.md](./ROADMAP-mobile-b2c.md#17-event-submission-form)

- [ ] P1 **"Submit an event" entry points:**
  - Header link "Dodaj wydarzenie" (PL) / "Submit an event" (EN) — visible when user is logged in; hidden when unauthenticated
  - Persistent CTA on the map/listing page (below filter bar or in the sidebar): "Wiesz o wydarzeniu? Dodaj je" — redirects to `/login?next=/submit-event` if unauthenticated
- [ ] P1 **`/submit-event` page** (requires auth; redirects to `/login?next=/submit-event` if unauthenticated):
  - **Event name** (required)
  - **Date and time** (required; date picker + time picker; validation: must be in the future)
  - **Category** (required; single select — 12 unified categories matching `unified_category` enum)
  - **Address or venue** (required; free-text address or autocomplete from known venue list; if venue selected, address pre-fills)
  - **Description** (optional; textarea, max 500 characters with live counter)
  - **Photo** (optional; file upload; presigned URL to Cloudflare R2 — same mechanism as mobile; max 1 photo on user submission)
  - **Ticket link** (optional; URL input with validation)
  - Submit button: "Wyślij wydarzenie" — calls `POST /events/user-submit`
  - On success: redirect to `/submit-event/success` with "Your event is pending review" confirmation message and link to `/my-submissions`
- [ ] P1 **`/my-submissions` page** (requires auth):
  - Lists all events submitted by the current user (from `GET /users/me/event-submissions` or similar)
  - Each submission shows: event name, date, submission date, and status badge:
    - `pending` → "Oczekuje na weryfikację" (yellow)
    - `approved` → "Zatwierdzone" (green) with link to the published event page
    - `rejected` → "Odrzucone" (red) with rejection reason displayed
  - Empty state: "You haven't submitted any events yet" with link to `/submit-event`
- [ ] P1 **Submission status tracking:**
  - Accessible from user avatar dropdown → "My Submissions"
  - Show submission count in the dropdown label if any are pending: "My Submissions (2 pending)"

### 1.7.1 Community Scout — Event Tips (Web)

> Backend endpoint: `POST /event-tips`, `GET /users/me/event-tips` (see [ROADMAP-backend.md](./ROADMAP-backend.md#171-community-scout--event-tips))
> Mobile B2C counterpart: [ROADMAP-mobile-b2c.md](./ROADMAP-mobile-b2c.md#171-community-scout--event-tips)

- [ ] P0 **Tip submission modal** (opens from the "Know about an event?" CTA for logged-in users):
  - Lightweight form — same fields as mobile bottom sheet:
    - **Link** (paste a URL — Facebook event, venue page, etc.) — optional
    - **Photo** (file upload — poster or flyer) — optional; presigned URL to Cloudflare R2
    - **Title** (short text, optional)
    - **Date** (optional date picker)
    - **Category** (optional; single select from 12 unified categories)
    - **Note** (optional, max 500 chars)
  - At least one field required (link, photo, or title + note)
  - Submit button: "Wyślij tip" — calls `POST /event-tips`
  - On success: toast or inline confirmation "Dzięki! Sprawdzimy twój tip i opublikujemy go, jeśli wszystko się zgadza."
- [ ] P0 **"My Tips" section** (accessible from user avatar dropdown):
  - Route: `/my-tips`
  - Lists all submitted tips with status badges: Pending / Approved / Rejected / Published
  - On "Published" status: link to the resulting event detail page
  - Counter: "X tips submitted, Y published"
- [ ] P0 **Scout badge on user profile page (`/profile`):**
  - Badge displayed next to username based on `scout_level` from `GET /users/me`:
    - `new`: no badge
    - `scout`: "Scout" badge (secondary color)
    - `top_scout`: "Top Scout" badge (primary color)
  - "X events discovered" counter
- [ ] P0 **"Tipped by @username"** attribution on event detail pages for community-sourced events (read-only display, SSR — same as existing section 1.4.3)
- [ ] P1 **Tip count in avatar dropdown:** "My Tips (1 pending)" label when tips are awaiting review

### 1.9 Internationalization (i18n)

- [x] P0 Set up i18n in Next.js (`next-intl` or `next-i18next`) with PL as default locale
- [x] P0 PL translation file for all web UI strings
- [ ] P0 SSR locale handling — serve PL content, set `<html lang="pl">` — PARTIAL: locale routing works; root `<html>` has no `lang`
- [x] P0 EN translation file
- [x] P0 URL-based locale prefix (`/en/poznan/music` vs `/poznan/music`) for SEO in both languages
- [x] P0 `hreflang` tags for EN/PL alternate pages

### 1.10 Terms of Service & Privacy Policy Pages

> Web B2C is read-only (no user registration), but ToS and Privacy Policy pages must be hosted here — they are linked from the mobile app, B2B dashboard, and app store listings.

- [ ] P0 **Terms of Service page** (`/terms`) — static page with full ToS text, SSR for SEO
- [ ] P0 **Privacy Policy page** (`/privacy`) — static page with full Privacy Policy text, SSR for SEO
- [ ] P0 **Footer links** to Terms of Service and Privacy Policy on all pages — PARTIAL: labels exist, both still `href="#"`
- [ ] P0 **Version indicator** on ToS/Privacy Policy pages (e.g. "Last updated: April 1, 2026") — matches `CURRENT_TOS_VERSION` from backend

### 1.12 Accessibility (a11y) — Web B2C

> Accessibility foundations are defined in the shared design system (see [Web B2B roadmap, section 0.4.5](./ROADMAP-web-b2b.md#045-accessibility-a11y-foundations--web-shared-with-web-b2c-and-admin)). This section covers B2C-specific considerations.

- [x] P0 **Semantic HTML** — use correct heading hierarchy (`h1` > `h2` > `h3`) on SSR pages for screen readers and SEO
- [x] P0 **Event/venue images** — `alt={event.name}` or `alt={venue.name}` on all content images; placeholder images use `alt=""`
- [x] P1 **Map ↔ List toggle** — List view serves as the accessible alternative to the map; ensure list items are fully keyboard-navigable
- [x] P1 **Search results announcements** — `aria-live="polite"` region to announce result count changes (e.g., "12 events found")
- [x] P1 **Skip-to-content link** — hidden until focused, jumps past navigation to main content

### 1.11 Cookie Consent

> GDPR requires explicit consent before any non-essential tracking.

- [x] P0 **Cookie consent banner** on all Web B2C pages:
  - Show on first visit (before any tracking fires)
  - Options: Accept all / Reject all / Manage preferences
  - Categories: Essential (always on), Analytics (PostHog), Marketing (if any future pixels)
  - Persist consent choice (cookie or localStorage)
  - Re-show banner if consent expires or user clears preferences
- [x] P0 **PostHog consent management:**
  - Do NOT initialize PostHog until user grants analytics consent
  - If user rejects analytics: no PostHog scripts loaded, no events tracked
  - If user later changes preference (via settings/footer link): update PostHog state accordingly
- [x] P0 **Cookie policy page** (`/cookie-policy`) — lists all cookies/trackers used, their purpose, and retention period
- [x] P0 "Manage cookie preferences" link in footer (re-opens consent modal)

### 1.13 Error Monitoring & Analytics Integration

- [x] P0 **Sentry integration** — configure `@sentry/nextjs` for error tracking
  - Capture client-side and server-side errors
  - Source maps upload during build for readable stack traces
  - Attach `correlationId` (from API response headers) to error reports
- [ ] P0 **PostHog integration** — configure `posthog-js` for product analytics — PARTIAL: consent-gated; most key events fire; `search_performed` / `search_zero_results` not wired
  - Initialize PostHog only after user grants analytics consent via cookie consent banner (see section 1.11)
  - Track key events: `page_view`, `map_view`, `event_detail_view`, `venue_profile_view`, `navigate_tap`, `ticket_link_tap`, `event_share`, `search_performed`, `search_zero_results`, `smart_banner_click`

### 1.14 Performance Budgets

- [ ] P0 **Core Web Vitals targets** (critical for SEO — Google uses CWV as a ranking signal): — PARTIAL: metrics reported to PostHog; budgets not verified/enforced
  - LCP (Largest Contentful Paint): < 2.5s
  - FID / INP (Interaction to Next Paint): < 200ms
  - CLS (Cumulative Layout Shift): < 0.1
- [ ] P0 **Page load targets:** — PARTIAL: TTFB reported; no CI assertion for TTFB/bundle budgets
  - SSR pages (event detail, venue profile, city listing): Time to First Byte (TTFB) < 800ms
  - JavaScript bundle size: < 150KB gzipped (first load)
- [x] P1 **Lighthouse CI** — add Lighthouse audit to CI pipeline, fail build if performance score < 80
- [x] P1 **Web Vitals monitoring** — report CWV metrics to PostHog or a dedicated RUM (Real User Monitoring) endpoint
- [ ] P1 **Bundle analysis** — add `@next/bundle-analyzer` to CI: — PARTIAL: `pnpm analyze` exists; not run in CI
  - Generate bundle report on each build
  - Track bundle size trend — alert if first-load JS exceeds 150KB gzipped

### 1.15 Responsive Design

- [ ] P0 **Mobile-first responsive layout** — all pages usable on viewports from 320px to 2560px: — PARTIAL: mobile + desktop work; tablet lacks side-by-side map+list; no persistent filter sidebar
  - Mobile (320-767px): single-column layout, full-width map, stacked cards
  - Tablet (768-1023px): two-column card grid, side-by-side map+list
  - Desktop (1024px+): three-column card grid, persistent sidebar filters on map view
- [ ] P0 **Touch-friendly on mobile web** — tap targets >= 44x44px, adequate spacing between interactive elements — PARTIAL: some controls below 44px
- [x] P0 **Map responsiveness** — map fills available viewport height; controls (zoom, filters) positioned for thumb reach on mobile

### 1.16 Error & Empty States

- [x] P0 **404 page** — custom "Page not found" with link to homepage and search
- [x] P0 **500 / error page** — custom error page with "Try again" option and link to homepage
- [ ] P0 **Empty state: no events found** — friendly message with illustration, suggest changing filters or city — PARTIAL: illustrated empty state only in desktop split view
- [x] P0 **Empty state: venue has no upcoming events** — message on venue profile page
- [ ] P0 **Loading states** — skeleton loaders for event cards, venue profile, and map pins during data fetching — NOT DONE: components exist but unused
- [ ] P1 **API error handling** — toast or inline error message when API calls fail (with retry option) — PARTIAL: toast provider mounted; never called from API layer
- [ ] P1 **Offline/network error** — banner when network is unavailable ("Check your connection") — PARTIAL: implemented but hidden in development / mock mode
- [x] P1 **404 tracking** — track 404 pages in PostHog (`page_not_found` event with path) to detect broken links from external sources

### 1.17 PWA Foundations

- [x] P1 **Web app manifest** (`manifest.json`) — app name, icons, theme color, display mode (`standalone`)
- [x] P1 **Favicon and touch icons** — standard favicon set (16x16, 32x32, 192x192, 512x512) + Apple touch icon
- [x] P1 **Theme color** — `<meta name="theme-color">` matching brand primary color (adapts to light/dark mode if supported)
- [x] CUT Service worker / offline caching — not needed for MVP (SSR pages don't benefit from SW caching)

---

## Phase 2.5 — Blog Pages (Week 9)

> **Goal:** Public-facing editorial content — blog list, detail, and city-scoped blog pages. SSR for SEO, full OG/Twitter Card tags, and JSON-LD `Article` structured data.
>
> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#25-blog-week-7-9)
> Web B2B counterpart: [ROADMAP-web-b2b.md](./ROADMAP-web-b2b.md#25-blog-editor)

### 2.5.1 Routes

```
app/blog/page.tsx                -- blog list: all published posts (/blog)
app/blog/[slug]/page.tsx         -- blog post detail (/blog/krakow-najlepsze-imprezy)
app/blog/sitemap.ts              -- sub-sitemap segment for blog posts
app/[city]/blog/page.tsx         -- city-scoped blog list (/poznan/blog)
```

### 2.5.2 Blog list page (`/blog`)

- [ ] P1 **Server Component** — `openapi-fetch` call to `GET /blog?locale=pl&limit=12` on the server; no client JS needed for initial render
- [ ] P1 **Editorial hero:** pinned admin city-guide post at the top — `display_lg` (3.5rem) headline per DESIGN.md tokens; gradient overlay on hero image
- [ ] P1 **Category filter chips:** `blog_category_enum` chips; `surface_container_high` unselected / `primary` selected — same `SelectionChip` pattern as the event filter bar
- [ ] P1 **Two-column `BlogPostCard` grid:**
  - Card: `radius_xl` (24px), image-dominant, gradient overlay on bottom 30% of image, no 1px borders (tonal shift instead) — consistent with Radiant Curator design philosophy
  - Content: author avatar + `label_md` uppercase date/category, `title_lg` headline, 2-line excerpt clamp
- [ ] P1 **"Load more" Client Component island** — calls `GET /blog?cursor=xxx` with cursor from previous response; appends results without full page reload; consistent with cursor-based pagination pattern
- [ ] P1 **City-scoped variant** (`/[city]/blog`): same layout, pre-filtered to posts tagged with the city; linked from city listing pages

### 2.5.3 Blog detail page (`/blog/[slug]`)

- [ ] P1 **`generateMetadata()`** — full OG and Twitter Card tags:
  ```typescript
  openGraph: {
    title: post.title,
    description: post.excerpt,
    images: [{ url: post.featured_image_url, width: 1200, height: 630 }],
    type: 'article',
    publishedTime: post.published_at,
    authors: [post.author.display_name],
  }
  ```
- [ ] P1 **JSON-LD `Article` structured data** (server-rendered `<script type="application/ld+json">`):
  - `@type: Article`, `headline`, `description`, `image`, `author` (`@type: Person`), `publisher` (`@type: Organization`), `datePublished`, `dateModified`
- [ ] P1 **Two-column layout** (mirrors Event Detail page structure):
  - **Left column:** hero image (R2 `large` variant), category badge + reading time label (`label_md`), `display_md` (2.75rem) headline, author byline (avatar + name + date in `label_md` ALL CAPS), **Tiptap-rendered article body** (server-side via `@tiptap/html` `generateHTML()` — zero client JS; styled with `@tailwindcss/typography` + Radiant Curator tokens), related events grid (3 `EventCard` components, same as map/listing page), related posts section
  - **Right sidebar:** author card (avatar, name, role/venue badge), table of contents (auto-generated from H2/H3 nodes in `content_json`), "Share" button (copy link / native share API)
- [ ] P1 **EventCard embed rendering:** for Tiptap `event-card` nodes in `content_json`, the Server Component fetches `GET /events/:id` for each embedded event ID and renders a mini event card inline — no client JS needed
- [ ] P1 **Sitemap entry:** `app/blog/sitemap.ts` generates entries for all published posts; `changeFrequency: 'weekly'`, `priority: 0.7`; ISR `revalidate = 3600` (same as existing sitemap)
- [ ] P1 **OG image:** MVP uses `featured_image_url` directly; Phase 2 upgrade: Cloudflare Worker / satori at `/og/blog/:slug` (1200×630, matching existing event OG pattern from section 1.6)

### 2.5.4 Sitemap extension

- [ ] P1 Extend `app/sitemap.ts` (section 1.3.1) with a reference to `app/blog/sitemap.ts` as a sub-sitemap index entry
- [ ] P1 Blog post URL format: `https://wydarzka.dev/blog/{slug}`
- [ ] P1 `<lastmod>` set from `post.updated_at` — same pattern as event sitemap

### 2.5.5 Design tokens applied

Per DESIGN.md ("Radiant Curator" design system):
- **Hero headline:** `display_lg` / `display_md` — 3.5rem / 2.75rem, letter-spacing -0.02em
- **Byline / metadata:** `label_md` — 0.75rem, ALL CAPS, letter-spacing +0.05em
- **Body text:** `body_lg` — 1rem, `on_surface_variant` color
- **Card border radius:** `radius_xl` (24px)
- **No 1px borders** — use tonal shifts (`surface_container_low` → `surface_container_lowest`) between sections
- **Article body:** `@tailwindcss/typography` `prose` class overridden with Radiant Curator tokens (primary color for links, `radius_md` for code blocks, `radius_lg` for images)

### 2.5.6 MSW mock handlers

- [ ] P1 `GET /blog` → 12 seeded blog posts
- [ ] P1 `GET /blog/:slug` → single post with full `content_json`
- [ ] P1 `GET /[city]/blog` → 6 seeded posts for the given city

### 2.5.7 API client (openapi-fetch)

- [ ] P1 After backend blog endpoints are implemented and `docs/openapi.json` is re-exported by CI: run `pnpm api:generate` to regenerate `src/api/generated/schema.d.ts` with blog types
- [ ] P1 All blog data fetching uses the existing typed `openapi-fetch` client (`src/api/client.ts`) — consistent with the rest of B2C

---

## Phase 4 — Testing and Launch (Week 9-12)

### 4.1 Testing

- [ ] P0 E2E test: city listing page renders events correctly (SSR verification)
- [ ] P0 E2E test: event detail page has correct OG meta tags (verify with HTML parser)
- [ ] P0 SEO verification: validate `sitemap.xml`, `robots.txt`, and structured data (JSON-LD) with Google Rich Results Test
- [ ] P0 Cross-browser testing: Chrome, Safari, Firefox (desktop + mobile viewports)
- [ ] P1 Lighthouse audit: all public pages score >= 80 on Performance, Accessibility, SEO
- [ ] P1 Accessibility audit: keyboard navigation, screen reader testing on key pages (event detail, venue profile, city listing)

---

*Living document — update after each sprint. Last updated: August 2026 (status synced from `web-b2c` repo).*
