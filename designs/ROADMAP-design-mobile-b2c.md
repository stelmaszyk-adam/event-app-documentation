# Wydarzka — Mobile B2C Figma Design Roadmap

> **Platform:** iOS + Android (React Native CLI)
> **Design system:** The Radiant Curator (see [DESIGN.md](./DESIGN.md))
> **Feature reference:** [ROADMAP-mobile-b2c.md](../ROADMAP-mobile-b2c.md)
> **Frame size:** 393 x 852 px (iPhone 15 — primary), 360 x 800 px (Android medium — secondary)

---

## Phase 0 — Figma Foundations (before any screens)

### 0.1 Token Setup in Figma

- [ ] P0 **Primitives collection** — create all raw color variables: `purple/`, `magenta/`, `violet/`, `neutral/`, `red/`, `green/`, `orange/` groups (per DESIGN.md 9.2)
- [ ] P0 **Colors collection** — semantic aliases with Light + Dark modes: `brand/`, `surface/`, `outline/`, `feedback/` groups (per DESIGN.md 9.3)
- [ ] P0 **Spacing collection** — `spacing/0` through `spacing/24` (4px base unit) (per DESIGN.md 9.4)
- [ ] P0 **Radius collection** — `radius/none` through `radius/full` (per DESIGN.md 9.5)
- [ ] P0 **Numbers collection** — icon sizes, stroke widths, opacity values (per DESIGN.md 9.6)
- [ ] P0 **Text styles** — all 15 styles from `display/lg` to `label/sm`, Inter font (per DESIGN.md 9.7)
- [ ] P0 **Effect styles** — `elevation/sm` through `elevation/xl` + `glass/blur` (per DESIGN.md 9.8)

### 0.2 Foundations Page

- [ ] P0 **Color palette reference** — swatches for all primitives, labeled with hex + variable name
- [ ] P0 **Semantic color mapping** — side-by-side Light vs Dark token comparison
- [ ] P0 **Typography scale** — all 15 text styles rendered with sample text, size, weight, spacing annotated
- [ ] P0 **Spacing & grid reference** — visual ruler showing all spacing tokens
- [ ] P0 **Radius reference** — visual samples of each radius token applied to rectangles
- [ ] P0 **Elevation & glassmorphism reference** — visual samples of all shadow styles + glass recipe
- [ ] P0 **Map pin color palette** — 12 category pins with colors and labels (per DESIGN.md 7.1 Map Pin Palette)

### 0.3 Core Component Library

> All components must use variables (not hardcoded hex). Each component needs: default, hover/pressed, disabled, focused, and loading states. Light + Dark mode variants via Figma modes.

- [ ] P0 **Buttons** — Primary (gradient), Secondary (glass), Tertiary (transparent), Destructive; states: default, pressed, disabled, loading (per DESIGN.md 9.9)
- [ ] P0 **Input fields** — default, focused, error, disabled states; with label, helper text, error message slots (per DESIGN.md 9.9)
- [ ] P0 **Selection chips** — unselected + selected states; used for category filter, date filter (per DESIGN.md 9.9)
- [ ] P0 **Badges** — category badge (12 category colors), status badge (Pending/Approved/Rejected/Published), Scout badge (scout/top_scout), "Live Now" badge (tertiary color)
- [ ] P0 **Event card** — image-dominant, no borders, `radius/xl`, gradient overlay on image bottom 30%; variants: standard, mini-card (map), horizontal list item (per DESIGN.md 9.9)
- [ ] P0 **Venue card** — photo, name, category, follower count; variants: standard, compact list item
- [ ] P0 **Avatar** — user photo, venue photo; sizes: sm (32px), md (40px), lg (64px); fallback initials
- [ ] P0 **Bottom navigation bar** — glassmorphic; 4-5 tabs; active/inactive icon + label states (per DESIGN.md 9.9)
- [ ] P0 **Top app bar** — transparent/glass overlay on map; solid on detail screens; with back button, title, action icons
- [ ] P0 **Bottom sheet** — drag handle, glassmorphic background, `radius/lg` top corners; half-sheet + full-sheet variants
- [ ] P1 **Skeleton loaders** — shimmer placeholders for: event card, venue card, map mini-card, event list, event detail header
- [ ] P1 **Empty state** — illustration slot + headline + body + optional CTA; variants: no results, no connection, no saved events, no followed venues
- [ ] P1 **Toast / snackbar** — success, error, info variants; auto-dismiss indicator
- [ ] P1 **Photo carousel** — swipeable images with counter indicator ("1/3"), dot pagination
- [ ] P1 **Network status banner** — offline indicator ("No internet connection — showing cached data")

### 0.4 Map-Specific Components

- [ ] P0 **Custom map pin** — per-category icon + color from Map Pin Palette (12 variants); states: default, selected (enlarged + shadow)
- [ ] P0 **Map mini-card** — appears on pin tap; photo + event name + time + distance; glassmorphic background; tap opens event detail
- [ ] P0 **Cluster indicator** — circle with event count; gradient fill primary → primary_container; scales with count
- [ ] P1 **Map controls overlay** — zoom in/out, my location button; glassmorphic style
- [ ] P1 **"Happening Now" pulse indicator** — animated ring on pins for currently-live events (tertiary color)

### 0.5 Icon Set

- [ ] P0 **Icon library frame** — import Lucide icons used across the app at 24px default, 1.75px stroke
- [ ] P0 Required icons: map-pin, calendar, clock, heart, heart-filled, share, bookmark, bookmark-filled, search, filter, navigation, chevron-left, chevron-right, x-close, plus, camera, link, user, settings, bell, bell-off, star, check, alert-triangle, info, external-link, map, list, globe, lock, mail, eye, eye-off
- [ ] P0 **Category icons** (12) — one icon per unified category: music, nightlife, performing_arts, arts_culture, sport_fitness, food_drink, education, business, family, festival, wellness, other

---

## Phase 1 — Core Screens (map to ROADMAP-mobile-b2c Phase 1)

### 1.0 Splash & App Icon

> Reference: ROADMAP-mobile-b2c 1.14

- [ ] P0 **Splash screen** — app logo centered on `primary` background; clean, minimal; smooth transition feel
- [ ] P0 **App icon** — 1024x1024 master; iOS version + Android adaptive icon (foreground + background layers); uses brand primary color and logo mark

### 1.1 Onboarding & First Launch

> Reference: ROADMAP-mobile-b2c 1.3.0

- [ ] P0 **Location permission rationale screen** — illustration + "We use your location to show events nearby" + "Allow" primary CTA + "Choose city instead" secondary CTA
- [ ] P0 **City picker screen** — search bar + list of active cities + "Coming soon" section with "Express interest" button + "Request new city" link
- [ ] P0 **First-launch state: map loaded** — map centered on user location with nearby event pins (the default successful state)
- [ ] P1 **Analytics consent notice** — brief disclosure at first launch; opt-in toggle; link to Privacy Policy

### 1.2 Auth Screens

> Reference: ROADMAP-mobile-b2c 1.1

- [ ] P0 **Login screen** — email + password inputs, "Forgot password?" link, "Log in" primary CTA, divider "or", Google Sign In button, Apple Sign In button, "Don't have an account? Register" link
- [ ] P0 **Registration screen** — email + password + confirm password inputs, ToS checkbox with link (per 1.10), "Create account" primary CTA, Google/Apple sign-in buttons, "Already have an account? Log in" link
- [ ] P0 **Email verification screen** — illustration + "Check your email" message + email address shown + "Resend" button + "Open email app" CTA
- [ ] P0 **Password reset — enter email** — email input + "Send reset link" CTA
- [ ] P0 **Password reset — new password** — new password + confirm inputs + "Reset password" CTA
- [ ] P0 **Account deletion confirmation screen** — warning message + "Delete my account" destructive button + "Cancel" secondary
- [ ] P0 **ToS re-consent modal** — full-screen overlay blocking app usage; summary of changes + link to full text + "I accept" CTA (per 1.10)

### 1.3 Map & Discovery (Home Screen)

> Reference: ROADMAP-mobile-b2c 1.3

- [ ] P0 **Map view (default home)** — full-screen map with event pins, glassmorphic top bar (city name + search icon), glassmorphic bottom nav, "Happening Now" filter chip floating above bottom nav
- [ ] P0 **Map with open mini-card** — pin selected, mini-card visible at bottom (photo + name + time + distance + category badge)
- [ ] P0 **Map with pin clusters** — cluster circles at zoomed-out level showing count
- [ ] P0 **List view toggle** — same content as map but in vertical scrollable list; event cards with image, name, date, time, distance, category badge; toggle icon in top bar
- [ ] P0 **Filter bottom sheet** — opened from filter icon; sections: Date (calendar date-range picker with quick-select presets: Today/Tomorrow/This weekend), Category (12 category chips, multiselect), Distance (0.5/1/3/5 km chips); "Apply" primary CTA + "Clear all" tertiary; glassmorphic background
- [ ] P0 **City selection bottom sheet** — current city highlighted, list of active cities, "Coming soon" section, "Request new city" link
- [ ] P0 **"Know about an event?" FAB** — glassmorphic floating action button above bottom nav (per Community Scout 1.7.1)
- [ ] P1 **Map — empty/no results state** — map visible but no pins + overlay message "No events found nearby — try adjusting filters"
- [ ] P1 **Offline banner state** — map with cached pins + top banner "Offline — showing cached events from [time]"

### 1.4 Event Detail Screen

> Reference: ROADMAP-mobile-b2c 1.4.1

- [ ] P0 **Event detail — header** — full-width photo carousel (edge-to-edge bleed), swipe dots/counter, back button overlay (glassmorphic circle), share + save action buttons overlay
- [ ] P0 **Event detail — info section** — event name (`title/lg`), date + time + recurring badge (`label/md` uppercase), address with "Navigate" inline link, category badge
- [ ] P0 **Event detail — description** — body text (`body/lg`), "Show more" expand link if > 500 chars
- [ ] P0 **Event detail — venue section** — venue avatar + name (tappable link to venue profile) + "Follow" button
- [ ] P0 **Event detail — CTAs** — sticky bottom bar: "Buy tickets" primary CTA (full width if single) + "Navigate" secondary CTA; glassmorphic background
- [ ] P0 **Event detail — recurring event indicator** — "Part of a weekly series" badge + "View all dates" link
- [ ] P0 **Event detail — meta footer** — "Report a problem" link + source attribution for aggregated events
- [ ] P0 **Event detail — Community Scout attribution** — "Tipped by @username" badge with Scout icon (per 1.7.1)
- [ ] P1 **Event detail — skeleton loading** — shimmer state for header image, text blocks, buttons
- [ ] P1 **Event detail — photo full-screen** — full-screen photo viewer with pinch-to-zoom, swipe navigation, close button

### 1.5 Venue Profile Screen

> Reference: ROADMAP-mobile-b2c 1.4.2

- [ ] P0 **Venue profile — header** — photo carousel (edge-to-edge), back button, share button
- [ ] P0 **Venue profile — info section** — venue name (`headline/sm`), category badge, follower count, "Follow"/"Following" toggle button
- [ ] P0 **Venue profile — description & hours** — description text, opening hours list (with holiday/temporary closure indicators, "open until late" note)
- [ ] P0 **Venue profile — upcoming events** — vertical list of event cards (same component as home list view)
- [ ] P0 **Venue profile — login prompt** — inline prompt shown when unauthenticated user taps "Follow": "Log in to follow this venue" with "Log in" CTA
- [ ] P1 **Venue profile — mute notifications option** — accessible from overflow menu or settings icon; "Mute notifications" toggle

### 1.6 User Profile Screen

> Reference: ROADMAP-mobile-b2c 1.4.3, 1.4.4, 1.4.5

- [ ] P0 **User profile — main** — user avatar + name, Scout badge (if earned), "X events discovered" counter
- [ ] P0 **User profile — saved events tab** — list of saved events sorted by date (soonest first); empty state if none
- [ ] P0 **User profile — followed venues tab** — list of followed venues; empty state if none
- [ ] P0 **User profile — My Tips section** — list of submitted tips with status badges (Pending/Approved/Rejected/Published), counter "X tips submitted, Y published"; tap on published tip navigates to event
- [ ] P0 **User profile — settings menu** — links to: Notification settings, Language (PL/EN), Analytics consent toggle, Change password, ToS & Privacy Policy, Delete account, Log out
- [ ] P0 **Notification settings screen** — master push toggle + per-type toggles: New events from followed venues, Event reminders, Weekend digest, Event updates; link to device Settings if system permission denied
- [ ] P0 **Language selector** — PL / EN toggle or selection; current language highlighted
- [ ] P1 **User profile — empty states** — "No saved events yet" with illustration + "Discover events" CTA; "No followed venues" with illustration + "Explore map" CTA

### 1.7 Event Submission & Community Scout

> Reference: ROADMAP-mobile-b2c 1.7, 1.7.1

- [ ] P1 **Event tip submission bottom sheet** — minimal form: link input, photo upload (camera/gallery), title, date picker, category select (12 chips), note (max 500 chars); "At least one field required" helper; "Send Tip" primary CTA
- [ ] P1 **Tip confirmation state** — success illustration + "Thanks! We'll review your tip and publish it if it checks out."
- [ ] P1 **Full event submission form** — separate screen: event name, date+time picker, category select, address/venue picker, description (500 chars), photo upload, ticket link; "Submit" CTA
- [ ] P1 **Submission status screen** — list of user's submissions with status: Pending / Approved / Rejected + reason

### 1.8 Push Notification Screens

> Reference: ROADMAP-mobile-b2c 1.5.1, 1.3.0

- [ ] P0 **Push permission pre-prompt** — shown on first "Follow venue" action: illustration + "Get notified about new events from venues you follow" + "Enable notifications" primary CTA + "Not now" tertiary
- [ ] P1 **Push notification examples** — visual mockup of lock-screen notifications: "New event from [Venue]", "Event starts in 2 hours", "Weekend Digest: 12 events near you"
- [ ] P1 **In-app notification indicator** — bell icon with badge count in top bar; "Notifications are off" subtle banner in profile

### 1.9 Social Sharing

> Reference: ROADMAP-mobile-b2c 1.6

- [ ] P0 **Share sheet trigger** — share icon on event detail; opens native iOS/Android share sheet (design the trigger, not the native sheet)
- [ ] P1 **"Add to calendar" bottom sheet** — options: Google Calendar, Apple Calendar, Outlook; calendar icon per option
- [ ] P1 **Share card preview** — the rich preview card that appears when event link is shared (Open Graph style): event photo, name, date, venue name, app branding

### 1.10 Internationalization Visual

> Reference: ROADMAP-mobile-b2c 1.9

- [ ] P0 **PL variant** — all core screens with Polish copy (primary language)
- [ ] P1 **EN variant** — key screens with English copy to verify layout doesn't break with longer/shorter strings

---

## Phase 2 — States, Edge Cases & Accessibility

### 2.1 Loading States

- [ ] P0 **Skeleton screens** for: home map (loading pins), event list, event detail, venue profile, user profile
- [ ] P0 **Button loading state** — spinner replacing label, disabled appearance
- [ ] P0 **Pull-to-refresh indicator** — branded spinner (primary color)

### 2.2 Error States

- [ ] P0 **Generic error screen** — illustration + "Something went wrong" + "Try again" CTA
- [ ] P0 **Network error** — illustration + "No internet connection" + "Retry" CTA
- [ ] P0 **404 / Not found** — "This event no longer exists" / "Venue not found" + "Back to map" CTA
- [ ] P0 **Form validation errors** — inline error messages below inputs (error color), field highlight (error border)

### 2.3 Empty States

- [ ] P0 **No events nearby** — illustration + "No events found" + suggestion to adjust filters or explore a different city
- [ ] P0 **No saved events** — illustration + "Save events you're interested in" + "Explore" CTA
- [ ] P0 **No followed venues** — illustration + "Follow venues to get updates" + "Explore" CTA
- [ ] P0 **No search results** — "No results for '[query]'" + suggestion chips
- [ ] P0 **No tips submitted** — illustration + "Share events you know about" + "Send a tip" CTA

### 2.4 Accessibility Annotations

- [ ] P0 **Tap target annotations** — all interactive elements annotated with min 44x44pt touch areas
- [ ] P0 **Color contrast check** — annotate key text/background combinations with contrast ratios (must pass WCAG AA)
- [ ] P0 **Screen reader flow annotations** — document VoiceOver/TalkBack reading order for: map screen, event detail, venue profile
- [ ] P1 **Dynamic type preview** — show key screens at default + largest accessibility text size to verify layout holds

### 2.5 Dark Mode

- [ ] P0 **All core screens in Dark Mode** — using Dark mode tokens from Colors collection: home map, event detail, venue profile, user profile, auth screens, bottom sheets, filters
- [ ] P0 **Dark mode component states** — buttons, inputs, chips, cards, badges, navigation all verified in dark mode
- [ ] P1 **Map dark mode** — dark map style with adjusted pin colors for visibility on dark tiles

---

## Phase 3 — Interaction & Motion Specs

### 3.1 Transitions & Animations

- [ ] P1 **Screen transitions** — document transition type between screens: push (left-to-right), modal (bottom-to-top), fade
- [ ] P1 **Bottom sheet open/close** — spring animation, drag-to-dismiss gesture spec
- [ ] P1 **Chip selection pop** — `easing_pop` animation on category/date chip tap
- [ ] P1 **Heart/save animation** — scale pop + fill animation on save/unsave
- [ ] P1 **Map pin selection** — scale up + shadow appear on pin tap
- [ ] P1 **Splash to map transition** — `duration_cinematic` crossfade from splash to loaded map
- [ ] P1 **Photo carousel swipe** — smooth horizontal scroll with snap-to-card behavior

### 3.2 Gesture Specs

- [ ] P1 **Swipe gestures** — photo carousel (horizontal), bottom sheet dismiss (swipe down), screen back (swipe from left edge — iOS)
- [ ] P1 **Pinch-to-zoom** — full-screen photo viewer, map zoom
- [ ] P1 **Long-press** — event card (preview/haptic), map pin (show tooltip)
- [ ] P1 **Pull-to-refresh** — event list, venue profile events

---

## Phase 4 — App Store Assets & Handoff

### 4.1 App Store Screenshots

> Reference: ROADMAP-mobile-b2c 4.3

- [ ] P0 **iPhone screenshots** (6.5" — 1290 x 2796 px) — 5-6 screens showcasing: map discovery, event detail, category filters, venue profile, Community Scout tip, saved events
- [ ] P0 **Android screenshots** (phone — 1080 x 1920 px minimum) — same key flows adapted for Android frame
- [ ] P1 **iPad screenshots** (optional) — if tablet layout is supported
- [ ] P0 **Screenshot frames** — device mockup frames with marketing headlines in Polish + English:
  - "Odkrywaj wydarzenia w Twoim miescie" / "Discover events in your city"
  - "Znajdz cos na dzis wieczor" / "Find something for tonight"
  - "Sledz ulubione miejsca" / "Follow your favorite venues"

### 4.2 Feature Graphic & Promo

- [ ] P0 **Google Play feature graphic** (1024 x 500 px) — app logo + tagline + event imagery collage
- [ ] P1 **Social media promo cards** — 1200 x 630 px (Open Graph), 1080 x 1080 px (Instagram) — for launch marketing

### 4.3 Developer Handoff Annotations

- [ ] P0 **Spacing annotations** — all screens annotated with spacing tokens (not raw px values)
- [ ] P0 **Color annotations** — all fills/strokes reference semantic token names
- [ ] P0 **Typography annotations** — all text references text style names
- [ ] P0 **Component property annotations** — document variant props, boolean props, slot content for each component
- [ ] P0 **Navigation flow diagram** — screen-to-screen flow map: which taps lead where, back behavior, deep link entry points (per 1.8, 1.8.1)
- [ ] P0 **Android back button behavior notes** — annotate per-screen: back exits app (tab roots), closes modal (sheets), navigates to home (deep link with no history)

---

## Screen Inventory (complete list)

| # | Screen | Priority | Section |
|---|--------|----------|---------|
| 1 | Splash | P0 | 1.0 |
| 2 | Location permission rationale | P0 | 1.1 |
| 3 | City picker | P0 | 1.1 |
| 4 | Login | P0 | 1.2 |
| 5 | Registration | P0 | 1.2 |
| 6 | Email verification | P0 | 1.2 |
| 7 | Password reset — enter email | P0 | 1.2 |
| 8 | Password reset — new password | P0 | 1.2 |
| 9 | Account deletion confirmation | P0 | 1.2 |
| 10 | ToS re-consent modal | P0 | 1.2 |
| 11 | Home — Map view (default) | P0 | 1.3 |
| 12 | Home — Map with mini-card open | P0 | 1.3 |
| 13 | Home — Map with clusters | P0 | 1.3 |
| 14 | Home — List view | P0 | 1.3 |
| 15 | Filter bottom sheet | P0 | 1.3 |
| 16 | City selection bottom sheet | P0 | 1.3 |
| 17 | Event detail | P0 | 1.4 |
| 18 | Event detail — photo full-screen | P1 | 1.4 |
| 19 | Venue profile | P0 | 1.5 |
| 20 | Venue profile — login prompt (follow) | P0 | 1.5 |
| 21 | User profile — main | P0 | 1.6 |
| 22 | User profile — saved events | P0 | 1.6 |
| 23 | User profile — followed venues | P0 | 1.6 |
| 24 | User profile — My Tips | P0 | 1.6 |
| 25 | Settings menu | P0 | 1.6 |
| 26 | Notification settings | P0 | 1.6 |
| 27 | Language selector | P0 | 1.6 |
| 28 | Event tip bottom sheet | P1 | 1.7 |
| 29 | Event submission form | P1 | 1.7 |
| 30 | Submission status list | P1 | 1.7 |
| 31 | Push permission pre-prompt | P0 | 1.8 |
| 32 | Add to calendar sheet | P1 | 1.9 |
| 33 | Generic error screen | P0 | 2.2 |
| 34 | Network error screen | P0 | 2.2 |
| 35 | 404 / Not found screen | P0 | 2.2 |

**Total: 35 screens** (26 P0, 9 P1) + Dark Mode variants + skeleton/loading/empty states per screen.

---

## Design Principles Checklist (apply to every screen)

- [ ] **No 1px borders** — use tonal shifts and spacing to separate sections
- [ ] **No #000000 or #FFFFFF** — use `on_surface` and `surface` tokens only
- [ ] **No standard drop shadows** — use tinted ambient shadows or tonal layering
- [ ] **Image-dominant cards** — photos bleed to edges where possible
- [ ] **Glassmorphism for floating elements** — bottom nav, FAB, filter sheet, mini-card overlays
- [ ] **Editorial typography contrast** — large `display`/`headline` for titles, tight `label` uppercase for metadata
- [ ] **44x44pt minimum tap targets** — all buttons, icons, links
- [ ] **WCAG AA contrast** — all text meets 4.5:1 (normal) / 3:1 (large)
- [ ] **Semantic token usage** — never hardcode hex values; always reference Figma variables
- [ ] **Both Light + Dark modes** — every screen and component verified in both modes

---

*Living document — update as screens are designed and reviewed. Last updated: May 2026.*
