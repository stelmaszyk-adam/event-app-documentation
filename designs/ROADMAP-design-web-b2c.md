# Figma Design Roadmap — Web B2C

> **Platform:** Next.js public discovery pages (read-only, SSR, SEO)
> **Design system:** The Radiant Curator (see [DESIGN.md](./DESIGN.md))
> **Feature reference:** [ROADMAP-web-b2c.md](../ROADMAP-web-b2c.md)
> **Breakpoints:** Mobile (320-767px), Tablet (768-1023px), Desktop (1024px+)

---

> ## Design Status — August 2026
>
> An interactive HTML prototype (`documentation/designs/web-b2c/EventB2CWeb/`) was produced in place of a Figma file. It covers the core screens and components below. Completed items are marked `[x]`. Items still needing design work remain `[ ]`.
>
> **⚠️ Category system divergence** — the prototype uses 13 categories that do not match the canonical 12 from ARCHITECTURE.md. See note at the end of Phase 0.2.

---

## Phase 0 — Foundations & Component Library

Before designing any screens, set up the Figma file structure, tokens, and reusable components.

### 0.1 Figma File Setup

- [ ] Create Figma file following the structure from DESIGN.md §9.10
- [ ] Set up **Cover** page with project name, version, and status
- [ ] Create **Foundations** page with color palette, typography, spacing, radius, elevation, and icon swatches
- [ ] Configure all Variable Collections per DESIGN.md §9.1:
  - Primitives (single mode) — raw color scale (§9.2)
  - Colors (Light + Dark modes) — semantic aliases (§9.3)
  - Spacing (single mode) — 4px base unit (§9.4)
  - Radius (single mode) — border radius scale (§9.5)
  - Numbers (single mode) — icon sizes, strokes, opacity (§9.6)
- [ ] Create all Text Styles per §9.7 (display, headline, title, body, label)
- [ ] Create all Effect Styles per §9.8 (elevation/sm through elevation/xl, glass/blur)

> *Note: CSS token system (`colors_and_type.css`) is implemented in the HTML prototype and maps to the above variable collections.*

### 0.2 Core Components

Build as Figma components with variants and auto-layout. Follow token bindings from DESIGN.md §9.9.

#### Buttons
- [x] **Primary button** — gradient fill, `radius/full`, states: default, hover, pressed, disabled
- [x] **Secondary button (Glass)** — glassmorphic fill, states: default, hover, pressed, disabled
- [x] **Tertiary button** — transparent, `primary` text only, states: default, hover, pressed, disabled
- [x] **Icon button** — circular, for map controls and actions
- [x] All buttons: min height 48px, touch target 44x44px

#### Cards
- [x] **Event card (large/grid)** — used in related events section; `radius/xl`, gradient overlay, title + date/time + venue metadata
- [x] **Event card (compact/list)** — horizontal layout with thumbnail, for search results list
- [x] **Event mini-card** — `MapPopup` on map pin click: photo + name + time + venue, with "View details" link
- [ ] **Venue card** — standalone venue card (photo, name, category, follower count, upcoming event count) — not yet designed as a reusable component; venue appears inline only on Event Detail

#### Navigation
- [x] **Top header/navbar** — logo, city selector, "Więcej" dropdown (Blog, Add Event, For Organizers, language toggle), auth actions
  - Desktop: full horizontal layout ✅
  - Tablet/Mobile: "Więcej" dropdown collapses secondary items ✅
  - > *Note: header structure differs from roadmap spec — search bar moved to filter bar below header, not in header itself*
- [x] **Footer** — `AppFooter` component with Discover, For Organizers, Legal, Get the App, Social sections

#### Chips & Badges
- [x] **Category filter chip** — unselected and selected states, per-category accent color
- [x] **Date filter** — opens `DatePickerOverlay` with calendar and quick-select presets (Today, Tomorrow, This weekend, This week, Custom range)
- [x] **"Live Now" badge** — `badge-live` style with indicator
- [x] **"Selling Fast" badge** — `badge-fast` with flame icon
- [x] **Recurring event badge** — `badge-recur` with repeat icon
- [x] **"Tipped by @username" badge** — community scout attribution on card and detail page
- [x] **Distance filter chip** — opens `DistancePickerOverlay` with slider (5–150 km) *(addition beyond original roadmap)*

#### Inputs
- [x] **Search input** — `search-input` class, icon prefix, in filter bar below header
- [x] **City selector** — button in header, opens `CityPickerOverlay` with searchable city grid

#### Overlays & Banners
- [x] **Cookie consent banner** — Accept all / Reject all / Manage preferences; solid surface style
- [x] **Smart banner (app install)** — "Zapisz w aplikacji" on Event Detail with App Store / Google Play badges
- [ ] **Smart banner (community scout)** — "Submit an event tip in the app" — the "add event" flow is now a full web screen, not a smart banner
- [x] **"Know about an event?" CTA** — bottom of results list, links to Add Event screen
- [x] **"Search this area" pill** — `map-search-area` — appears on map after pan, triggers list refresh
- [x] **City picker overlay** — `CityPickerOverlay` — searchable grid of cities; shows "city not yet available" empty state with notify CTA
- [ ] **Toast / inline error** — form-level inline errors exist on auth/add-event screens; no global toast component yet
- [ ] **Network error banner** — not designed

#### Loading & Empty States
- [ ] **Skeleton loader: event card** — not designed
- [ ] **Skeleton loader: venue profile** — not designed
- [ ] **Skeleton loader: map pins** — not designed
- [x] **Empty state: no events found** — search screen shows icon + message + "change filters" suggestion
- [x] **Empty state: venue has no upcoming events** — friendly message with follow CTA
- [ ] **404 page** — not designed
- [ ] **500 / error page** — not designed

---

> ### ⚠️ Category System Divergence
>
> The canonical 12-category system (per ARCHITECTURE.md) is:
> `music, nightlife, performing_arts, arts_culture, sport_fitness, food_drink, education, business, family, festival, wellness, other`
>
> The prototype uses **13 categories** (+ special "live"):
> `music, club, art, food, sport, theatre, comedy, tech, film, festival, wellness, kids`
>
> **Mismatches:**
> - `nightlife` → `club` *(label change only — acceptable)*
> - `performing_arts` → `theatre` *(narrower — excludes comedy and film which became separate categories)*
> - `arts_culture` → `art` *(narrower label)*
> - `sport_fitness` → `sport` *(narrower label)*
> - `food_drink` → `food` *(narrower label)*
> - `education` → `tech` *(significant conceptual mismatch — tech events are a subset)*
> - `family` → `kids` *(label change — acceptable)*
> - `business` → **missing entirely**
> - `other` → **missing entirely**
> - `comedy`, `film` → **new categories not in canonical set**
>
> **Action required:** align the category set with ARCHITECTURE.md before implementation. Either extend the canonical list or remap the prototype categories.

---

## Phase 1 — Screen Design: Search & Discovery

The primary experience. **Booking.com-style split-screen pattern** on desktop/tablet; list-first with full-screen map overlay on mobile.

### 1.1 Search Results — Split-Screen Layout (Booking.com Pattern)

> Reference: ROADMAP-web-b2c §1.3

**Desktop (1024px+)**
- [x] **Split-screen layout:** scrollable results list (left, ~55%) + sticky interactive map (right, ~45%)
- [x] Results list is a vertical list of horizontal event cards
- [x] **Horizontal filter bar** pinned below header: category chips, date filter, distance filter, "Happening Now" toggle, sort dropdown (Relevance / Date / Distance)
- [x] City selector in main header; text search bar in filter bar
- [x] **Map-list synchronization:** hover card → pin highlights; click pin → list scrolls + card highlights
- [x] Custom pin icons per category (color-coded by category)
- [x] Pin clustering visualization (`+8` cluster decoy)
- [x] Event mini-card popup on pin click (`MapPopup`)
- [x] Map fullscreen expand/collapse button (Esc to close)
- [x] "Use my location" button on map (Locate icon)
- [x] **Results count** displayed above list with date label and distance
- [ ] Cursor-based infinite scroll — mock data only, no real pagination
- [x] "Know about an event?" CTA at bottom of results list

**Tablet (768-1023px)**
- [ ] Explicit tablet breakpoint — prototype adapts via CSS but no dedicated tablet-specific layout verified

**Mobile (320-767px)**
- [x] **List-first view** by default
- [x] Horizontal filter bar as scrollable chip row
- [x] **Floating "Show on map" button** (`show-on-map-fab`) — opens full-screen map sheet (`mapSheetOpen`)
- [x] Full-screen map overlay with "close" button
- [x] "Search this area" pill on map

### 1.2 Event Cards — Search Result Variant

- [x] **Horizontal layout:** thumbnail (left) + content stack (right)
- [x] Content stack: title, date + time, venue name + address, category chip, price indicator or "Free" badge
- [x] Card background: `surface/container-lowest`, `radius/lg`
- [x] **Hover state:** `is-highlighted` class — tonal background shift + map pin highlights
- [x] **Active/highlighted state** (when pin clicked): `is-highlighted` with left accent border
- [x] Badges overlay on thumbnail: Live Now, Selling Fast, Recurring
- [x] "Tipped by @username" in card footer
- [x] Favorite/save button (heart icon) per card
- [x] Entire card is clickable → event detail page

### 1.3 City Listing Pages

> SEO pages: `/poznan`, `/krakow`, `/wroclaw`, etc.

- [ ] Hero section with city name, event count, optional city photo
- [ ] Category quick-links row
- [ ] Featured/upcoming events grid below hero
- [ ] "This weekend in [City]" section
- [ ] All three breakpoints

### 1.4 Category Listing Pages

> SEO pages: `/poznan/music`, `/krakow/this-weekend`

- [ ] Category header with icon and name
- [ ] Filtered event grid for that category + city
- [ ] Breadcrumb navigation
- [ ] All three breakpoints

### 1.5 First-Visit / Onboarding States

> Reference: ROADMAP-web-b2c §1.3.0

- [ ] **State: geolocation prompt** — "Use my location" button, no browser prompt until click
- [ ] **State: geolocation denied** — city picker fallback
- [ ] **State: IP geolocation fallback** — map centers on detected city, info note
- [x] **State: city picker overlay** — `CityPickerOverlay` with city grid; "city not available" empty state with notify CTA
- [x] **State: return visit** — city selector in header shows last-selected city ("Change city" visible)

---

## Phase 2 — Screen Design: Event & Venue Detail

### 2.1 Event Detail Page

> Reference: ROADMAP-web-b2c §1.4.1

- [x] **Photo gallery** — hero image + clickable thumbnail row (4 thumbnails)
- [x] **Event info block:** name (display typography), date, time, address with breadcrumb
- [x] **Description** — body text section ("O wydarzeniu"), hashtag row
- [x] **Venue link** — venue mini-card in aside, links to venue profile
- [x] **CTA: "Buy tickets"** — primary button in price aside card
- [x] **CTA: "Navigate"** — secondary button
- [ ] **Source attribution** — not yet designed
- [x] **"Share" button** — icon button on hero image
- [x] **"Add to calendar" dropdown** — Google Calendar, Apple Calendar (.ics), Outlook (.ics) as expandable section
- [x] **Smart banner: "Save this event in the app"** — `smart-banner` with App Store / Google Play badges
- [ ] **Smart banner: "Follow this venue in the app"** — not separate on event detail (only on venue profile)
- [x] **Recurring event indicator** — badge on card + "See all dates" link in meta block
- [x] **"Tipped by @username"** — badge below event title
- [x] **Related events section** — horizontal/grid of similar events ("Może Cię też zainteresować")
- [x] **Save / favorite button** — heart button in price aside
- [x] All three breakpoints via responsive CSS

### 2.2 Venue Profile Page

> Reference: ROADMAP-web-b2c §1.4.2

- [x] **Photo hero** — full-bleed hero image with category badge and share button
- [x] **Venue info:** name (headline typography), category, description
- [x] **Opening hours** — day grid with current day highlighted, "open until X" status
- [x] **Follower count** — with Users icon
- [x] **Upcoming events list** — clickable rows with thumbnail, date block, title
- [x] **Empty state: no upcoming events** — friendly message with follow suggestion
- [x] **Address with map** — stylized SVG map snippet in aside with "Navigate" button
- [x] **Smart banner: "Follow this venue in the app"** — aside smart banner
- [x] **"Is this your venue?" CTA** — `claim-cta` in venue description section, links to Organizer Dashboard (external, new tab)
- [x] All three breakpoints via responsive CSS

---

## Phase 2.5 — Additional Screens (Beyond Original Roadmap)

*These screens were designed in the prototype but were not in the original roadmap. They represent scope additions that need product review before implementation.*

### 2.5.1 Authentication Screens

> The original roadmap described web-b2c as read-only with no user accounts. The prototype adds a full auth flow gated behind certain actions (Add Event, Save favorites).

- [x] **Login screen** — Google OAuth button + email/password form, "Remember me", forgot password link, auth intent banner ("You're adding an event — log in to continue")
- [x] **Register screen** — Google OAuth + email form, password strength meter, terms + newsletter checkboxes
- [x] **Password reset screen** — email input → "link sent" confirmation state
- [x] **Auth aside** — benefits panel shown on login/register screens ("Add events", "Save favorites", "Reminders")
- [x] **User menu** — avatar chip in header with dropdown: Add Event, Saved Events, Account Settings, Logout
- [x] Auth gate on Add Event — unauthenticated users redirected to login; intent preserved and user returned to form after auth

> **Decision needed:** Confirm whether web-b2c will have user accounts or remain read-only per original spec. If accounts are added, the auth screens above cover the needed flows.

### 2.5.2 Add Event / Community Submission Screen

> The roadmap described community event tips as an in-app (mobile) feature. The prototype implements a full web form for event submission.

- [x] **Add Event screen** — multi-section form: basic info (name, venue, description), datetime (start/end), category, ticket details (price, URL), address
- [x] **Organizer callout banner** — prominent redirect to Organizer Dashboard for venue owners
- [x] **Auth gate** — non-logged-in users see login screen first; redirected back to form after auth
- [x] **Submitted event** — created event appears in the results list immediately (optimistic, prototype only)

> **Decision needed:** Confirm whether community event submission belongs in web-b2c or only in the mobile app. If keeping it in web-b2c, align with the backend API for event submission.

### 2.5.3 Blog

> Not mentioned in any roadmap. The prototype adds an editorial blog section.

- [x] **Blog strip on home** — `BlogStrip` component: horizontal scroll of 3 featured posts, rendered at bottom of search screen
- [x] **Blog list screen** — filterable by category (Wszystko, Nightlife, Kultura, Muzyka, Jedzenie, Sport, Wywiady); card grid with author, read time, excerpt
- [x] **Blog detail screen** — article body with headings, quotes, paragraphs; embedded event cards inline in body; author bio, related posts strip
- [x] Blog navigable from "Więcej" menu in header

> **Decision needed:** Confirm whether blog/editorial content is in scope for web-b2c. It represents a new content type requiring backend support (CMS or database table), author management, and content moderation. It is not referenced in ROADMAP-web-b2c.md or ARCHITECTURE.md.

---

## Phase 3 — Screen Design: Utility Pages

### 3.1 Static / Legal Pages

- [ ] **Terms of Service** (`/terms`) — clean, readable layout, version indicator
- [ ] **Privacy Policy** (`/privacy`) — same layout as ToS
- [ ] **Cookie Policy** (`/cookie-policy`) — table of cookies/trackers, purpose, retention
- [ ] All use body typography on `surface` background, max-width content container
- [ ] Responsive: single column across all breakpoints

### 3.2 Error Pages

- [ ] **404 — Page Not Found** — illustration, headline, message, search bar, link to homepage
- [ ] **500 — Server Error** — illustration, headline, "Try again" button, link to homepage
- [ ] Both: brand-consistent with Radiant Curator aesthetic

### 3.3 Cookie Consent Modal

- [x] **Initial banner** — bottom-of-screen, solid surface, three buttons: Accept all / Reject all / Manage preferences
- [x] **Preferences modal** — category toggles: Essential (always on, disabled), Analytics, Marketing
- [x] **Re-consent trigger** — "Manage cookie preferences" footer link opens preferences modal
- [ ] Mobile + desktop variants explicitly verified

---

## Phase 4 — Interaction & Motion Design

### 4.1 Micro-interactions

> Reference: DESIGN.md §7.7 motion tokens

- [ ] **Chip selection** — pop animation (`easing_pop`, `duration_instant`)
- [ ] **Map pin click** — mini-card slide-in, `duration_normal`, `easing_decelerate`; list card highlights with accent border
- [ ] **Card hover** — map pin highlight syncs instantly, `duration_instant`
- [ ] **Filter change** — results list fade/reflow, `duration_normal`; map pins update simultaneously
- [ ] **Map pan/zoom** — "Search this area" pill fades in, `duration_fast`; list updates on click with skeleton transition
- [ ] **Page transition** — fade between pages, `duration_slow`
- [ ] **Search results update** — smooth list reflow, `duration_normal`
- [ ] **Smart banner entrance** — slide up from bottom, `duration_slow`, `easing_decelerate`
- [ ] **Toast notification** — slide in from top-right, auto-dismiss after 5s

### 4.2 Loading Transitions

- [ ] **Skeleton to content** — shimmer animation on skeleton, crossfade to real content
- [ ] **Image loading** — blur-up from LQIP placeholder to full image
- [ ] **Map loading** — pin fade-in as data loads, cluster animation on zoom

### 4.3 Reduced Motion

- [ ] Design static alternatives for all animations (per `prefers-reduced-motion`)
- [ ] Opacity transitions remain; transforms and kinetic animations disabled

---

## Phase 5 — Dark Mode

### 5.1 Full Dark Mode Pass

> Reference: DESIGN.md §7.2

- [x] Dark mode toggle implemented via `data-theme="dark"` on `<html>` (prototype tweaks panel)
- [x] Accent color theming (Purple / Indigo / Rose / Teal variants) implemented in prototype
- [ ] Verify contrast ratios meet WCAG AA on dark surfaces
- [ ] Adjust glassmorphism recipe: `surface/container` at 60% opacity (dark mode variant)
- [ ] Verify map pins remain distinguishable on dark map tiles
- [ ] Verify event card image overlays work on dark backgrounds
- [ ] Review all empty states and illustrations for dark mode compatibility

**Screens to verify in dark mode:**
- [ ] Map view (all breakpoints)
- [ ] List view (all breakpoints)
- [ ] Event detail page
- [ ] Venue profile page
- [ ] City listing page
- [ ] 404 / 500 error pages
- [ ] Cookie consent banner/modal
- [ ] Smart banners
- [ ] Auth screens
- [ ] Add Event screen
- [ ] Blog screens

---

## Phase 6 — Responsive Audit & Handoff

### 6.1 Responsive Completeness Check

Ensure every screen has been designed for all three breakpoints:

| Screen | Mobile (320-767) | Tablet (768-1023) | Desktop (1024+) |
|---|---|---|---|
| Search & discovery (split-screen) | [x] | [ ] | [x] |
| City listing | [ ] | [ ] | [ ] |
| Category listing | [ ] | [ ] | [ ] |
| Event detail | [x] | [ ] | [x] |
| Venue profile | [x] | [ ] | [x] |
| Terms of Service | [ ] | [ ] | [ ] |
| Privacy Policy | [ ] | [ ] | [ ] |
| Cookie Policy | [ ] | [ ] | [ ] |
| 404 page | [ ] | [ ] | [ ] |
| 500 page | [ ] | [ ] | [ ] |
| Cookie consent | [x] | [ ] | [x] |
| Login | [x] | [ ] | [x] |
| Register | [x] | [ ] | [x] |
| Password Reset | [x] | [ ] | [x] |
| Add Event | [x] | [ ] | [x] |
| Blog list | [x] | [ ] | [x] |
| Blog detail | [x] | [ ] | [x] |

### 6.2 Design QA Checklist

- [ ] All components use Figma variables — no hardcoded colors, spacing, or radius
- [ ] All text layers use Text Styles — no detached styles
- [ ] Auto-layout applied to all frames for proper responsive behavior
- [ ] Component variants cover all interactive states (default, hover, pressed, focused, disabled)
- [ ] Accessibility: focus rings visible (`2px solid outline`, `2px offset`)
- [ ] Accessibility: touch targets >= 44x44px on all interactive elements
- [ ] No use of `#000000` or `#FFFFFF` — only `on_surface` and `surface` tokens
- [ ] No 1px borders — only tonal shifts, ghost borders, or gradients
- [ ] Card separation uses whitespace (`space_8` / `space_12`), never dividers
- [ ] Images bleed to edges where possible (per Do's and Don'ts §6)

### 6.3 Developer Handoff Preparation

- [ ] Annotate spacing, padding, and gap values with token names (not pixel values)
- [ ] Document component variant props and when to use each
- [ ] Export design tokens via Figma Variables or Token Studio for `tailwind.config.ts` mapping
- [ ] Provide asset exports: category icons (SVG), placeholder illustrations, favicon set (16, 32, 192, 512px)
  - *14 category SVG icons already exported in `assets/` — review against final canonical category set*
- [ ] Link each screen to its corresponding ROADMAP-web-b2c section for implementation context

---

## Appendix A — Screen Inventory

Complete list of unique screens/views to design:

| # | Screen | Route | Priority | Status |
|---|---|---|---|---|
| 1 | Search & discovery (split-screen) | `/[city]` | P0 | ✅ Designed |
| 2 | City listing page | `/poznan`, `/krakow`, etc. | P0 | ❌ Missing |
| 3 | Category listing page | `/[city]/[category]` | P0 | ❌ Missing |
| 4 | Event detail page | `/[city]/event/[slug]` | P0 | ✅ Designed |
| 5 | Venue profile page | `/[city]/venue/[slug]` | P0 | ✅ Designed |
| 6 | Terms of Service | `/terms` | P0 | ❌ Missing |
| 7 | Privacy Policy | `/privacy` | P0 | ❌ Missing |
| 8 | Cookie Policy | `/cookie-policy` | P0 | ❌ Missing |
| 9 | 404 — Not Found | any invalid route | P0 | ❌ Missing |
| 10 | 500 — Server Error | error state | P0 | ❌ Missing |
| 11 | City picker overlay | first visit (no geo) | P0 | ✅ Designed |
| 12 | Cookie consent banner | first visit | P0 | ✅ Designed |
| 13 | Cookie preferences modal | from banner or footer | P0 | ✅ Designed |
| 14 | Search results view | `/[city]?q=...` | P1 | ⚠️ Partial (same screen, no dedicated state) |
| 15 | Login | `/login` | — | ✅ Designed (addition) |
| 16 | Register | `/register` | — | ✅ Designed (addition) |
| 17 | Password Reset | `/reset-password` | — | ✅ Designed (addition) |
| 18 | Add Event | `/add-event` | — | ✅ Designed (addition) |
| 19 | Blog list | `/blog` | — | ✅ Designed (addition) |
| 20 | Blog detail | `/blog/[slug]` | — | ✅ Designed (addition) |

## Appendix B — Component Inventory

| # | Component | Variants | States | Status |
|---|---|---|---|---|
| 1 | Button | Primary, Secondary (Glass), Tertiary, Icon | Default, Hover, Pressed, Focused, Disabled | ✅ |
| 2 | Event card | Search result (horizontal), Mini (map popup) | Default, Hover, Highlighted (pin-synced), Saved | ✅ |
| 3 | Event card large | Grid variant (related events) | Default, Hover | ✅ |
| 4 | Venue card | — | — | ❌ Missing standalone |
| 5 | Category chip | — | Unselected, Selected | ✅ |
| 6 | Date filter (range picker + presets) | — | Closed, Open, Range selected, Preset selected | ✅ |
| 7 | Distance filter (slider + presets) | — | Closed, Open, Value selected | ✅ (addition) |
| 8 | Badge | Live Now, Selling Fast, Recurring, Community Tip, Free | — | ✅ |
| 9 | Search input | — | Empty, Filled, Focused | ✅ |
| 10 | City selector | — | Collapsed, Expanded (overlay) | ✅ |
| 11 | Top navbar | — | Desktop (with Więcej menu), Mobile (same) | ✅ |
| 12 | Footer | — | Desktop, Mobile | ✅ |
| 13 | Cookie banner | — | Visible | ✅ |
| 14 | Cookie preferences modal | — | Open | ✅ |
| 15 | Smart banner | Event save, Venue follow | Visible | ✅ |
| 16 | Toast | Error, Success, Info | — | ❌ Missing |
| 17 | Skeleton loader | Card, Profile, Map pins | Shimmer | ❌ Missing |
| 18 | Empty state | No events, No venue events | — | ✅ |
| 19 | Map pin | 13 category variants | Default, Hover, Selected | ✅ |
| 20 | Pin cluster | — | Various counts | ✅ |
| 21 | Language toggle | — | PL active, EN active | ✅ (in Więcej menu) |
| 22 | "Show on map" / "Show list" FAB | — (mobile only) | Map mode, List mode | ✅ |
| 23 | Calendar dropdown | — | Closed, Open | ✅ |
| 24 | "Know about an event?" CTA | Bottom of results list | Default | ✅ |
| 25 | "For Organizers" nav link | In Więcej dropdown | Default, Hover | ✅ |
| 26 | "Is this your venue?" CTA | Venue profile | Default | ✅ |
| 27 | "Search this area" pill | Map overlay | Hidden, Visible | ✅ |
| 28 | Sort dropdown | Relevance, Date, Distance | Collapsed, Cycling | ✅ |
| 29 | Filter bar | Horizontal chip bar + dropdowns | Desktop (full), Mobile (scrollable) | ✅ |
| 30 | Results count label | — | Default | ✅ |
| 31 | Login form | — | Empty, Filled, Loading, Error | ✅ (addition) |
| 32 | Register form | — | Empty, Filled, Loading, Error, PW strength | ✅ (addition) |
| 33 | Password reset form | — | Empty, Sent | ✅ (addition) |
| 34 | User menu (header) | — | Logged out (Login/Register buttons), Logged in (avatar + dropdown) | ✅ (addition) |
| 35 | Auth aside | — | Add-event intent, Generic | ✅ (addition) |
| 36 | Add Event form | — | Empty, Filled, Error, Organizer callout | ✅ (addition) |
| 37 | Blog card | Featured, Standard | Default, Hover | ✅ (addition) |
| 38 | Blog strip | — | Default | ✅ (addition) |
| 39 | Author bio | — | Default | ✅ (addition) |

---

*Living document — update as design progresses. Last reviewed: August 2026.*
