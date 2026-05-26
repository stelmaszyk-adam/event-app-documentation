# EventApp — Web B2C Roadmap

> **Platform:** Next.js public pages — read-only discovery (SSR, SEO, OG tags)
> **Repo:** `eventapp-web-b2c`
> **Domain:** `eventapp.dev`
> **Central roadmap:** [ROADMAP.md](./ROADMAP.md)
> **Strategy:** [Read-only discovery strategy](./ROADMAP.md#web-b2c--read-only-discovery-strategy)

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

- [ ] P0 Install `openapi-typescript` (dev dependency) and `openapi-fetch` (runtime dependency)
- [ ] P0 Configure codegen script in `package.json`: `"api:generate": "openapi-typescript <spec-path> --output src/api/generated/schema.d.ts"`
- [ ] P0 Create `src/api/client.ts` — configured `openapi-fetch` client with `NEXT_PUBLIC_API_URL` base URL
- [ ] P0 First codegen run: generate types from backend `docs/openapi.json` (URL or file mode)
- [ ] P0 Add `src/api/generated/` to `.gitignore` (regenerated on demand, not committed)

### 0.4.7 Mock Environment (MSW) — Web B2C

> See [central roadmap §0.4.6](./ROADMAP.md#046-mock-environment-all-frontends) and [ARCHITECTURE.md §5.2.1](./ARCHITECTURE.md) for full spec.

- [ ] P0 Install `msw` (dev dependency)
- [ ] P0 Create `src/mocks/` directory with MSW handlers matching backend OpenAPI spec
- [ ] P0 Browser service worker setup (`src/mocks/browser.ts`) + server setup for tests (`src/mocks/server.ts`)
- [ ] P0 Environment variable toggle: `NEXT_PUBLIC_API_MOCKING=true`
- [ ] P0 `.env.mock` file + `pnpm dev:mock` script in `package.json`

### 0.5.3 GitHub Actions — eventapp-web-b2c

> Same CI/CD workflow as other web apps — see [central roadmap, section 0.5.3](./ROADMAP.md#053-github-actions--web-apps-b2c--b2b--admin).

- [ ] P0 **CI workflow** (triggered on: push to `develop`, push to `main`, PR to either):
  - `pnpm install` (with dependency caching)
  - `pnpm lint` — ESLint
  - `pnpm type-check` — `tsc --noEmit`
  - `pnpm build` — verify build succeeds
- [ ] P0 **CD workflow** — deploy to Cloudflare Pages / Vercel:
  - `develop` branch -> preview environment
  - `main` branch -> production environment

---

## Phase 1 — Core (Week 5-8)

### 1.3 Map and discovery

- [ ] P0 Main page: map with event pins (MapLibre GL JS + Stadia Maps — see [ARCHITECTURE.md ADR #17](./ARCHITECTURE.md#11-key-architectural-decisions-log))
- [ ] P0 Pin clustering at high zoom-out
- [ ] P0 Custom pin icons per unified category (same 12 categories as mobile — see [central roadmap](./ROADMAP.md#unified-category-system))
- [ ] P0 Category filter (multiselect)
- [ ] P0 Date filter: calendar date-range picker (select start and end date) with quick-select presets (Today, Tomorrow, This weekend)
- [ ] P0 City selection (same list as mobile)
- [ ] P0 Map <-> List toggle
- [ ] P0 Event mini-card on pin click (photo + name + time + venue)
- [ ] P0 City listing pages with SSR (`/poznan`, `/krakow`, `/wroclaw`, etc.) — SEO from day one
- [ ] P0 Category listing pages (`/poznan/music`, `/krakow/this-weekend`) — SEO
- [ ] P1 Text search bar (event name / venue name)
- [ ] P1 "Happening Now" filter

### 1.3.0 Onboarding / First-Visit Experience

- [ ] P0 **Browser geolocation flow:**
  - Do NOT prompt for geolocation on first page load (browsers penalise unprompted requests)
  - Show "Use my location" button on map — triggers browser geolocation prompt on click
  - On denial / dismiss: fall back to IP-based geolocation (coarse city-level, e.g. via Cloudflare `cf-ipcountry` + GeoIP)
  - If IP geolocation also fails: show city picker (same city list as mobile)
  - After denial: hide "Use my location" button, show "Location unavailable — select your city" with city picker
  - No re-prompt possible in browsers — link to browser site settings instructions if user wants to re-enable
- [ ] P0 **First-visit default state:**
  - Map centers on detected city (from IP geolocation) with events loaded
  - If no city can be detected: show city picker overlay before loading map
  - Cookie consent banner fires immediately (per section 1.11)
- [ ] P1 **City selection persistence:**
  - Store selected city in localStorage
  - On return visit: load last selected city (skip geolocation prompt)
  - "Change city" option always visible in header/nav

### 1.3.1 SEO Technical Foundations

- [ ] P0 **`sitemap.xml` generation** — dynamic, auto-updated sitemap covering:
  - City listing pages (`/poznan`, `/krakow`, etc.)
  - Category listing pages (`/poznan/music`, `/krakow/this-weekend`, etc.)
  - Event detail pages (with `lastmod` from `updated_at`)
  - Venue profile pages
  - Use Next.js `app/sitemap.ts` for automatic generation; split into sub-sitemaps if >50k URLs
- [ ] P0 **Sitemap freshness:**
  - Use Next.js ISR (Incremental Static Regeneration) for sitemap — revalidate every 1 hour
  - Set `<lastmod>` on event pages from `updated_at` timestamp
- [ ] P1 **Submit sitemap to Google Search Console** after launch
- [ ] P0 **`robots.txt`** — allow all public pages, disallow internal/preview routes, reference sitemap URL
- [ ] P0 **Structured data / JSON-LD for events** — [Google Event rich results](https://developers.google.com/search/docs/appearance/structured-data/event):
  - `Event` schema on every event detail page (`name`, `startDate`, `endDate`, `location`, `image`, `description`, `offers` if ticket URL exists)
  - `Place` schema on venue profile pages (`name`, `address`, `geo`)
  - Validate with Google Rich Results Test before launch
- [ ] P0 **Canonical URLs** — `<link rel="canonical">` on every page:
  - Locale variants: canonical points to default locale (`/poznan/music`), `hreflang` handles alternates (coordinates with section 1.9)
  - Query parameter pages (filters, pagination): canonical points to base URL without query params
  - Prevent duplicate content between `/poznan` and `/poznan?category=all`

### 1.4.1 Event details page

- [ ] P0 Event details page (SSR for SEO + OG tags):
  - Photo gallery (clickable thumbnails or carousel; sourced from `event_photos`, fallback to single `photo_url`)
  - Name, date, time, address
  - Description
  - Venue name with link to venue profile page
  - CTA "Buy tickets" (deep link to external system)
  - CTA "Navigate" (deep link to Google Maps / Apple Maps — free, no API key needed)
  - Source attribution for aggregated events
- [ ] P0 "Share" button (copy link)
- [ ] P1 "Add to calendar" button (dropdown with options):
  - Google Calendar (pre-filled link with event parameters)
  - Apple Calendar (.ics file download)
  - Outlook (.ics file download)
- [ ] P0 Smart banner: "Follow this venue in the app" -> app store link
- [ ] P0 Smart banner: "Save this event in the app" -> app store link

### 1.4.2 Venue profile page

- [ ] P0 Venue profile page (SSR for SEO):
  - Photo gallery (grid or carousel; sourced from `venue_photos`, fallback to single `photo_url`)
  - Name, category, description, opening hours (including temporary closures, holiday hours, and "open until late" indicators when applicable)
  - Follower count
  - List of upcoming events
  - Address with map
- [ ] P0 Smart banner: "Follow this venue in the app" -> app store link

### 1.4.25 "For Organizers" Cross-App Link

> Web B2C is the public-facing discovery site. The B2B organizer dashboard lives at `dashboard.eventapp.dev` (see [ARCHITECTURE.md §Domain Mapping](./ARCHITECTURE.md)). A persistent link in the B2C navigation allows venue owners and event organizers to discover and access the dashboard.

- [ ] P0 **Header link — "For Organizers":**
  - Visible in the top navbar on all pages (desktop: text link; tablet/mobile: inside hamburger menu)
  - Links to `dashboard.eventapp.dev` (opens in new tab, `target="_blank"` with `rel="noopener noreferrer"`)
  - Label: "For Organizers" (PL: "Dla Organizatorów") — uses i18n translation key
  - Positioned after main nav items but before language toggle
  - Visual treatment: tertiary/text style — should not compete with primary CTAs (e.g. no gradient, no button shape)
- [ ] P0 **Footer link — "Organizer Dashboard":**
  - In a "For Business" or "Organizers" section of the footer (alongside Terms, Privacy, Cookie Policy links)
  - Label: "Organizer Dashboard" (PL: "Panel Organizatora")
  - Same external link behavior (`dashboard.eventapp.dev`, new tab)
  - Optionally include a short description: "Manage your venue, create events, and track analytics"
- [ ] P1 **Contextual CTA on venue profile page:**
  - Below the venue info section, show a subtle CTA: "Is this your venue? Claim it on the Organizer Dashboard"
  - Links to `dashboard.eventapp.dev` (or a deep link to the venue claim flow if available)
  - Only shown as a static link (Web B2C has no auth, so no conditional logic based on ownership)

### 1.4.3 Community Scout — "Know about an event?" CTA

> Web B2C is read-only (no auth), so event tip submission redirects to the mobile app via smart banner.

- [ ] P0 **"Know about an event?" CTA** in page footer or sidebar on map/listing pages:
  - Smart banner: "Submit an event tip in the app" → app store link / deep link to tip form in mobile app
  - Matches existing pattern of directing interactive actions to mobile app
- [ ] P0 **"Tipped by @username"** attribution on event detail pages for community-sourced events (read-only display, SSR)

### 1.4.4 Recurring event display

- [ ] P0 **Recurring event indicator** on event detail page:
  - "Part of a weekly series" badge (or daily/monthly, based on recurrence type)
  - "View all dates" link -> list/accordion of all upcoming instances in the series
  - Each instance links to its own event detail page

### 1.5 Image placeholder / loading strategy

- [ ] P1 Placeholder images when venues/events have no photos (branded fallback per category)
- [ ] P1 Progressive image loading (blur hash / LQIP from Cloudflare Images, Next.js `<Image>` blur placeholder)
- [ ] P1 Broken image fallbacks (graceful fallback to placeholder on load error)

### 1.6 Social sharing / OG tags

- [ ] P0 Open Graph meta tags on every event page (SSR):
  - `og:title` — event name
  - `og:description` — date + venue + short description
  - `og:image` — dynamically generated graphic (Cloudflare Worker / satori)
  - `og:url` — canonical event URL
- [ ] P0 Dedicated URL for each event (deep link that opens app or website)

### 1.9 Internationalization (i18n)

- [ ] P0 Set up i18n in Next.js (`next-intl` or `next-i18next`) with PL as default locale
- [ ] P0 PL translation file for all web UI strings
- [ ] P0 SSR locale handling — serve PL content, set `<html lang="pl">`
- [ ] P0 EN translation file
- [ ] P0 URL-based locale prefix (`/en/poznan/music` vs `/poznan/music`) for SEO in both languages
- [ ] P0 `hreflang` tags for EN/PL alternate pages

### 1.10 Terms of Service & Privacy Policy Pages

> Web B2C is read-only (no user registration), but ToS and Privacy Policy pages must be hosted here — they are linked from the mobile app, B2B dashboard, and app store listings.

- [ ] P0 **Terms of Service page** (`/terms`) — static page with full ToS text, SSR for SEO
- [ ] P0 **Privacy Policy page** (`/privacy`) — static page with full Privacy Policy text, SSR for SEO
- [ ] P0 **Footer links** to Terms of Service and Privacy Policy on all pages
- [ ] P0 **Version indicator** on ToS/Privacy Policy pages (e.g. "Last updated: April 1, 2026") — matches `CURRENT_TOS_VERSION` from backend

### 1.12 Accessibility (a11y) — Web B2C

> Accessibility foundations are defined in the shared design system (see [Web B2B roadmap, section 0.4.5](./ROADMAP-web-b2b.md#045-accessibility-a11y-foundations--web-shared-with-web-b2c-and-admin)). This section covers B2C-specific considerations.

- [ ] P0 **Semantic HTML** — use correct heading hierarchy (`h1` > `h2` > `h3`) on SSR pages for screen readers and SEO
- [ ] P0 **Event/venue images** — `alt={event.name}` or `alt={venue.name}` on all content images; placeholder images use `alt=""`
- [ ] P1 **Map ↔ List toggle** — List view serves as the accessible alternative to the map; ensure list items are fully keyboard-navigable
- [ ] P1 **Search results announcements** — `aria-live="polite"` region to announce result count changes (e.g., "12 events found")
- [ ] P1 **Skip-to-content link** — hidden until focused, jumps past navigation to main content

### 1.11 Cookie Consent

> GDPR requires explicit consent before any non-essential tracking.

- [ ] P0 **Cookie consent banner** on all Web B2C pages:
  - Show on first visit (before any tracking fires)
  - Options: Accept all / Reject all / Manage preferences
  - Categories: Essential (always on), Analytics (PostHog), Marketing (if any future pixels)
  - Persist consent choice (cookie or localStorage)
  - Re-show banner if consent expires or user clears preferences
- [ ] P0 **PostHog consent management:**
  - Do NOT initialize PostHog until user grants analytics consent
  - If user rejects analytics: no PostHog scripts loaded, no events tracked
  - If user later changes preference (via settings/footer link): update PostHog state accordingly
- [ ] P0 **Cookie policy page** (`/cookie-policy`) — lists all cookies/trackers used, their purpose, and retention period
- [ ] P0 "Manage cookie preferences" link in footer (re-opens consent modal)

### 1.13 Error Monitoring & Analytics Integration

- [ ] P0 **Sentry integration** — configure `@sentry/nextjs` for error tracking
  - Capture client-side and server-side errors
  - Source maps upload during build for readable stack traces
  - Attach `correlationId` (from API response headers) to error reports
- [ ] P0 **PostHog integration** — configure `posthog-js` for product analytics
  - Initialize PostHog only after user grants analytics consent via cookie consent banner (see section 1.11)
  - Track key events: `page_view`, `map_view`, `event_detail_view`, `venue_profile_view`, `navigate_tap`, `ticket_link_tap`, `event_share`, `search_performed`, `search_zero_results`, `smart_banner_click`

### 1.14 Performance Budgets

- [ ] P0 **Core Web Vitals targets** (critical for SEO — Google uses CWV as a ranking signal):
  - LCP (Largest Contentful Paint): < 2.5s
  - FID / INP (Interaction to Next Paint): < 200ms
  - CLS (Cumulative Layout Shift): < 0.1
- [ ] P0 **Page load targets:**
  - SSR pages (event detail, venue profile, city listing): Time to First Byte (TTFB) < 800ms
  - JavaScript bundle size: < 150KB gzipped (first load)
- [ ] P1 **Lighthouse CI** — add Lighthouse audit to CI pipeline, fail build if performance score < 80
- [ ] P1 **Web Vitals monitoring** — report CWV metrics to PostHog or a dedicated RUM (Real User Monitoring) endpoint
- [ ] P1 **Bundle analysis** — add `@next/bundle-analyzer` to CI:
  - Generate bundle report on each build
  - Track bundle size trend — alert if first-load JS exceeds 150KB gzipped

### 1.15 Responsive Design

- [ ] P0 **Mobile-first responsive layout** — all pages usable on viewports from 320px to 2560px:
  - Mobile (320-767px): single-column layout, full-width map, stacked cards
  - Tablet (768-1023px): two-column card grid, side-by-side map+list
  - Desktop (1024px+): three-column card grid, persistent sidebar filters on map view
- [ ] P0 **Touch-friendly on mobile web** — tap targets >= 44x44px, adequate spacing between interactive elements
- [ ] P0 **Map responsiveness** — map fills available viewport height; controls (zoom, filters) positioned for thumb reach on mobile

### 1.16 Error & Empty States

- [ ] P0 **404 page** — custom "Page not found" with link to homepage and search
- [ ] P0 **500 / error page** — custom error page with "Try again" option and link to homepage
- [ ] P0 **Empty state: no events found** — friendly message with illustration, suggest changing filters or city
- [ ] P0 **Empty state: venue has no upcoming events** — message on venue profile page
- [ ] P0 **Loading states** — skeleton loaders for event cards, venue profile, and map pins during data fetching
- [ ] P1 **API error handling** — toast or inline error message when API calls fail (with retry option)
- [ ] P1 **Offline/network error** — banner when network is unavailable ("Check your connection")
- [ ] P1 **404 tracking** — track 404 pages in PostHog (`page_not_found` event with path) to detect broken links from external sources

### 1.17 PWA Foundations

- [ ] P1 **Web app manifest** (`manifest.json`) — app name, icons, theme color, display mode (`standalone`)
- [ ] P1 **Favicon and touch icons** — standard favicon set (16x16, 32x32, 192x192, 512x512) + Apple touch icon
- [ ] P1 **Theme color** — `<meta name="theme-color">` matching brand primary color (adapts to light/dark mode if supported)
- [ ] CUT Service worker / offline caching — not needed for MVP (SSR pages don't benefit from SW caching)

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

*Living document — update after each sprint. Last updated: April 2026.*
