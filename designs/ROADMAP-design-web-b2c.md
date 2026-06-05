# Figma Design Roadmap — Web B2C

> **Platform:** Next.js public discovery pages (read-only, SSR, SEO)
> **Design system:** The Radiant Curator (see [DESIGN.md](./DESIGN.md))
> **Feature reference:** [ROADMAP-web-b2c.md](../ROADMAP-web-b2c.md)
> **Breakpoints:** Mobile (320-767px), Tablet (768-1023px), Desktop (1024px+)

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

### 0.2 Core Components

Build as Figma components with variants and auto-layout. Follow token bindings from DESIGN.md §9.9.

#### Buttons
- [ ] **Primary button** — gradient fill (`primary` to `primary_container`), `radius/full`, states: default, hover, pressed, disabled
- [ ] **Secondary button (Glass)** — glassmorphic fill with backdrop blur, states: default, hover, pressed, disabled
- [ ] **Tertiary button** — transparent, `primary` text only, states: default, hover, pressed, disabled
- [ ] **Icon button** — circular, for map controls and actions
- [ ] All buttons: min height 48px, touch target 44x44px

#### Cards
- [ ] **Event card (large)** — image-dominant, `radius/xl`, gradient overlay on bottom 30%, title + date/time + venue metadata. No borders — tonal layering only
- [ ] **Event card (compact/list)** — horizontal layout with thumbnail, for list view
- [ ] **Event mini-card** — appears on map pin click: photo + name + time + venue, compact size
- [ ] **Venue card** — venue photo, name, category, follower count, upcoming event count

#### Navigation
- [ ] **Top header/navbar** — logo, city selector, search bar, "For Organizers" link, language toggle (PL/EN)
  - Desktop: full horizontal layout with all elements visible; "For Organizers" as a tertiary text link positioned after main nav items but before language toggle — should not visually compete with primary CTAs (no gradient, no button shape, subtle styling)
  - Tablet: condensed, search may collapse; "For Organizers" link remains visible or moves into collapsible menu
  - Mobile: hamburger or minimal bar, search icon triggers overlay; "For Organizers" inside hamburger menu
- [ ] **Footer** — organized in sections:
  - **Discover:** city links, category links
  - **For Organizers:** "Organizer Dashboard" link (→ `dashboard.wydarzka.dev`, external, new tab) with optional short description "Manage your venue, create events, and track analytics"
  - **Legal:** Terms of Service, Privacy Policy, Cookie Policy, "Manage cookie preferences"
  - **Get the App:** app store badges
  - **Social:** social media links

#### Chips & Badges
- [ ] **Category filter chip** — unselected (`surface/container-high`) and selected (`brand/primary`) states per §9.9
- [ ] **Date filter** — calendar date-range picker with quick-select presets (Today, Tomorrow, This weekend)
- [ ] **"Live Now" badge** — `tertiary` color, pulsing indicator
- [ ] **"Selling Fast" badge** — `tertiary` color
- [ ] **Recurring event badge** — "Part of a weekly series" indicator
- [ ] **"Tipped by @username" badge** — community scout attribution

#### Inputs
- [ ] **Search input** — `surface/container-low` fill, icon prefix, focus state with ghost border per §9.9
- [ ] **City selector dropdown** — list of Polish cities

#### Overlays & Banners
- [ ] **Cookie consent banner** — Accept all / Reject all / Manage preferences; glassmorphic or surface container
- [ ] **Smart banner (app install)** — "Save this event in the app" / "Follow this venue in the app" with app store link
- [ ] **Smart banner (community scout)** — "Submit an event tip in the app" with app store link / deep link to tip form
- [ ] **"Know about an event?" CTA** — footer or sidebar element on map/listing pages, links to community scout smart banner or app store
- [ ] **"Search this area" pill** — appears on map after pan/zoom, primary style, triggers list refresh
- [ ] **City picker overlay** — shown when geolocation fails; grid of city options
- [ ] **Toast / inline error** — for API errors with retry option
- [ ] **Network error banner** — "Check your connection"

#### Loading & Empty States
- [ ] **Skeleton loader: event card** — shimmer placeholder matching card dimensions
- [ ] **Skeleton loader: venue profile** — shimmer for photo, text blocks, event list
- [ ] **Skeleton loader: map pins** — placeholder pin clusters
- [ ] **Empty state: no events found** — illustration + message + suggestion to change filters/city
- [ ] **Empty state: venue has no upcoming events** — friendly message
- [ ] **404 page** — "Page not found" with search and homepage link
- [ ] **500 / error page** — "Something went wrong" with "Try again" and homepage link

---

## Phase 1 — Screen Design: Search & Discovery

The primary experience. Follows a **Booking.com-style split-screen pattern**: the search results list and map are always visible together on desktop/tablet — no toggle between separate views. The list and map are synchronized: interacting with one highlights the corresponding element in the other.

### 1.1 Search Results — Split-Screen Layout (Booking.com Pattern)

> Reference: ROADMAP-web-b2c §1.3

**Desktop (1024px+)**
- [ ] **Split-screen layout:** scrollable results list (left, ~55-60% width) + sticky interactive map (right, ~40-45% width), both filling viewport height below header
- [ ] Results list is a **vertical list of horizontal cards** — each card shows: thumbnail image (left), event title + date/time + venue + category badge + price indicator (right). Not a grid — single column of rich list items
- [ ] **Horizontal filter bar** pinned below header (above results): category chips (multiselect, horizontally scrollable), date filter dropdown (calendar date-range picker with quick-select presets: Today / Tomorrow / This weekend), "Happening Now" toggle, sort dropdown (Relevance / Date / Distance)
- [ ] City selector and text search bar remain in the main header
- [ ] **Map-list synchronization:**
  - Hovering a list card highlights the corresponding map pin (scale up + accent ring)
  - Clicking a map pin scrolls the list to the corresponding card and highlights it
  - Moving/zooming the map updates the list to show only events visible in the current map bounds (with "Search this area" button pattern like Booking.com)
- [ ] Custom pin icons per category (12 categories, using map pin palette from DESIGN.md §7.1)
- [ ] Pin clustering visualization at high zoom-out
- [ ] Event mini-card popup on pin click (photo + name + time + venue, with "View details" link)
- [ ] "Use my location" button on map (corner control)
- [ ] **Results count** displayed above list: "127 events in Poznań" (updates on filter/map change)
- [ ] Cursor-based infinite scroll on the list panel
- [ ] "Know about an event?" CTA at bottom of results list

**Tablet (768-1023px)**
- [ ] Same split-screen layout with adjusted proportions: results list (~50%) + map (~50%)
- [ ] Horizontal filter bar scrollable, may truncate to "Filters" button opening a sheet for overflow
- [ ] Cards slightly more compact — smaller thumbnails
- [ ] Same map-list sync behavior as desktop

**Mobile (320-767px)**
- [ ] **List-first view** by default: full-width vertical list of horizontal event cards
- [ ] Horizontal filter bar as scrollable chip row above the list
- [ ] **Floating "Show on map" button** (bottom-center, primary style) — opens full-screen map overlay
- [ ] Full-screen map overlay:
  - Map fills entire viewport below header
  - Category pins with clustering
  - Mini-card popup on pin click
  - "Show list" floating button to return to list view
  - "Use my location" floating button
  - Horizontal filter chips remain visible at top of map
- [ ] "Search this area" pill appears when user pans the map
- [ ] Infinite scroll on list view

### 1.2 Event Cards — Search Result Variant

> Horizontal card layout optimized for scanning search results (Booking.com style)

- [ ] **Horizontal layout:** thumbnail image (left, fixed width ~120-160px desktop, ~100px mobile) + content stack (right)
- [ ] Content stack: event title (`title/md`), date + time (`label/md`), venue name + address (`body/sm`), category chip (small), price indicator or "Free" badge
- [ ] Card background: `surface/container-lowest`, corner radius `radius/lg`
- [ ] **Hover state:** subtle tonal lift (background shifts to `surface/container-low`), corresponding map pin highlights
- [ ] **Active/highlighted state** (when pin clicked): left accent border using `brand/primary`, slightly elevated tonal shift
- [ ] Badges overlay on thumbnail: "Live Now" (pulsing), "Selling Fast", "Recurring", "Tipped by @username"
- [ ] Card separation: `space_4` (16px) vertical gap — tighter than grid cards for scan efficiency
- [ ] Entire card is clickable, links to event detail page

### 1.3 City Listing Pages

> SEO pages: `/poznan`, `/krakow`, `/wroclaw`, etc.

- [ ] Hero section with city name (display typography), event count, optional city photo
- [ ] Category quick-links row (chips linking to `/poznan/music`, etc.)
- [ ] Featured/upcoming events grid below hero
- [ ] "This weekend in [City]" section
- [ ] All three breakpoints

### 1.4 Category Listing Pages

> SEO pages: `/poznan/music`, `/krakow/this-weekend`

- [ ] Category header with icon and name (headline typography)
- [ ] Filtered event grid for that category + city
- [ ] Breadcrumb navigation (Home > Poznan > Music)
- [ ] All three breakpoints

### 1.5 First-Visit / Onboarding States

> Reference: ROADMAP-web-b2c §1.3.0

- [ ] **State: geolocation prompt** — "Use my location" button on map, no browser prompt until click
- [ ] **State: geolocation denied** — "Location unavailable — select your city" with city picker
- [ ] **State: IP geolocation fallback** — map centers on detected city, subtle info note
- [ ] **State: city picker overlay** — when no city can be detected, full overlay with city grid
- [ ] **State: return visit** — loads last selected city from localStorage, "Change city" visible in header

---

## Phase 2 — Screen Design: Event & Venue Detail

### 2.1 Event Detail Page

> Reference: ROADMAP-web-b2c §1.4.1

- [ ] **Photo gallery** — clickable thumbnails or carousel; full-bleed hero image on mobile
- [ ] **Event info block:** name (display/headline typography), date, time, address
- [ ] **Description** — body text, expandable if long
- [ ] **Venue link** — venue name linking to venue profile page
- [ ] **CTA: "Buy tickets"** — primary button, deep link to external ticketing
- [ ] **CTA: "Navigate"** — secondary button, link to Google Maps
- [ ] **Source attribution** — for aggregated events, subtle label
- [ ] **"Share" button** — copy link action
- [ ] **"Add to calendar" dropdown** — Google Calendar, Apple Calendar (.ics), Outlook (.ics)
- [ ] **Smart banner: "Save this event in the app"** — app store link
- [ ] **Smart banner: "Follow this venue in the app"** — app store link
- [ ] **Recurring event indicator** — badge + "View all dates" expandable list
- [ ] **"Tipped by @username"** — community scout attribution badge
- [ ] **Related events section** — horizontal scroll of similar events
- [ ] All three breakpoints

### 2.2 Venue Profile Page

> Reference: ROADMAP-web-b2c §1.4.2

- [ ] **Photo gallery** — grid or carousel
- [ ] **Venue info:** name (headline typography), category, description
- [ ] **Opening hours** — including temporary closures, holiday hours, "open until late"
- [ ] **Follower count** — with icon
- [ ] **Upcoming events list** — vertical list of event cards
- [ ] **Empty state: no upcoming events** — friendly message
- [ ] **Address with embedded map** — small static map or interactive map snippet
- [ ] **Smart banner: "Follow this venue in the app"** — app store link
- [ ] **"Is this your venue?" CTA** — subtle contextual link below venue info: "Is this your venue? Claim it on the Organizer Dashboard" → links to `dashboard.wydarzka.dev` (external, new tab). Tertiary text style, visually understated — not a primary CTA. Positioned after venue description, before upcoming events list
- [ ] All three breakpoints

---

## Phase 3 — Screen Design: Utility Pages

### 3.1 Static / Legal Pages

- [ ] **Terms of Service** (`/terms`) — clean, readable layout, version indicator ("Last updated: ...")
- [ ] **Privacy Policy** (`/privacy`) — same layout as ToS
- [ ] **Cookie Policy** (`/cookie-policy`) — table of cookies/trackers, purpose, retention
- [ ] All use body typography on `surface` background, max-width content container
- [ ] Responsive: single column across all breakpoints

### 3.2 Error Pages

- [ ] **404 — Page Not Found** — illustration, headline, message, search bar, link to homepage
- [ ] **500 — Server Error** — illustration, headline, "Try again" button, link to homepage
- [ ] Both: brand-consistent with Radiant Curator aesthetic, no generic/template look

### 3.3 Cookie Consent Modal

- [ ] **Initial banner** — bottom-of-screen, glassmorphic or solid surface, three buttons: Accept all / Reject all / Manage preferences
- [ ] **Preferences modal** — category toggles: Essential (always on, disabled toggle), Analytics, Marketing
- [ ] **Re-consent trigger** — "Manage cookie preferences" footer link opens preferences modal
- [ ] Mobile + desktop variants

---

## Phase 4 — Interaction & Motion Design

### 4.1 Micro-interactions

> Reference: DESIGN.md §7.7 motion tokens

- [ ] **Chip selection** — pop animation (`easing_pop`, `duration_instant`)
- [ ] **Map pin click** — mini-card slide-in, `duration_normal`, `easing_decelerate`; corresponding list card highlights with accent border
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

- [ ] Switch all screens to Dark mode using the Colors collection (Mode: Dark)
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

---

## Phase 6 — Responsive Audit & Handoff

### 6.1 Responsive Completeness Check

Ensure every screen has been designed for all three breakpoints:

| Screen | Mobile (320-767) | Tablet (768-1023) | Desktop (1024+) |
|---|---|---|---|
| Search & discovery (split-screen) | [ ] | [ ] | [ ] |
| City listing | [ ] | [ ] | [ ] |
| Category listing | [ ] | [ ] | [ ] |
| Event detail | [ ] | [ ] | [ ] |
| Venue profile | [ ] | [ ] | [ ] |
| Terms of Service | [ ] | [ ] | [ ] |
| Privacy Policy | [ ] | [ ] | [ ] |
| Cookie Policy | [ ] | [ ] | [ ] |
| 404 page | [ ] | [ ] | [ ] |
| 500 page | [ ] | [ ] | [ ] |
| Cookie consent | [ ] | [ ] | [ ] |

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
- [ ] Link each screen to its corresponding ROADMAP-web-b2c section for implementation context

---

## Appendix A — Screen Inventory

Complete list of unique screens/views to design:

| # | Screen | Route | Priority |
|---|---|---|---|
| 1 | Search & discovery (split-screen) | `/[city]` — list + map side-by-side (desktop/tablet), list-first with map overlay (mobile) | P0 |
| 3 | City listing page | `/poznan`, `/krakow`, etc. | P0 |
| 4 | Category listing page | `/[city]/[category]` | P0 |
| 5 | Event detail page | `/[city]/event/[slug]` | P0 |
| 6 | Venue profile page | `/[city]/venue/[slug]` | P0 |
| 7 | Terms of Service | `/terms` | P0 |
| 8 | Privacy Policy | `/privacy` | P0 |
| 9 | Cookie Policy | `/cookie-policy` | P0 |
| 10 | 404 — Not Found | any invalid route | P0 |
| 11 | 500 — Server Error | error state | P0 |
| 12 | City picker overlay | first visit (no geo) | P0 |
| 13 | Cookie consent banner | first visit | P0 |
| 14 | Cookie preferences modal | from banner or footer | P0 |
| 15 | Search results view | `/[city]?q=...` | P1 |

## Appendix B — Component Inventory

| # | Component | Variants | States |
|---|---|---|---|
| 1 | Button | Primary, Secondary (Glass), Tertiary, Icon | Default, Hover, Pressed, Focused, Disabled |
| 2 | Event card | Large (detail/city pages), Search result (horizontal), Mini (map popup) | Default, Hover, Highlighted (pin-synced), Loading (skeleton) |
| 3 | Venue card | Standard | Default, Hover, Loading (skeleton) |
| 4 | Category chip | — | Unselected, Selected |
| 5 | Date filter (range picker + presets) | — | Closed, Open (calendar visible), Range selected, Preset selected |
| 6 | Badge | Live Now, Selling Fast, Recurring, Community Tip | — |
| 7 | Search input | — | Empty, Filled, Focused |
| 8 | City selector | — | Collapsed, Expanded |
| 9 | Top navbar | — | Desktop, Tablet, Mobile |
| 10 | Footer | — | Desktop, Mobile |
| 11 | Cookie banner | — | Visible, Hidden |
| 12 | Smart banner | Event, Venue, Community Scout | Visible, Dismissed |
| 13 | Toast | Error, Success, Info | Entering, Visible, Exiting |
| 14 | Skeleton loader | Card, Profile, Map pins | Shimmer animation |
| 15 | Empty state | No events, No venue events, No search results | — |
| 16 | Map pin | 12 category variants | Default, Hover, Selected |
| 17 | Pin cluster | — | Various counts |
| 18 | Language toggle | — | PL active, EN active |
| 19 | "Show on map" / "Show list" FAB | — (mobile only) | Map mode, List mode |
| 20 | Calendar dropdown | — | Closed, Open (3 options) |
| 21 | "Know about an event?" CTA | Sidebar, Footer | Default, Hover |
| 22 | "For Organizers" nav link | Header (text link), Hamburger menu item | Default, Hover |
| 23 | "Is this your venue?" CTA | Venue profile page | Default, Hover |
| 24 | "Search this area" pill | Map overlay (all breakpoints) | Hidden, Visible |
| 25 | Sort dropdown | Relevance, Date, Distance | Collapsed, Expanded |
| 26 | Filter bar | Horizontal chip bar + dropdowns | Desktop (full), Tablet (scrollable), Mobile (scrollable chips) |
| 27 | Results count label | — | Default, Updating (skeleton flash) |

---

*Living document — update as design progresses. Last updated: May 2026.*
