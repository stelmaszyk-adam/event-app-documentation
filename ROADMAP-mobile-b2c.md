# EventApp — Mobile B2C Roadmap

> **Platform:** React Native (CLI) — iOS + Android consumer app
> **Repo:** `eventapp-mobile-b2c`
> **Central roadmap:** [ROADMAP.md](./ROADMAP.md)

---

## Design Reference

> **Design system:** [`documentation/designs/DESIGN.md`](./designs/DESIGN.md)
> **Figma — Light Foundation:** [StartupMVP — Light](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=2-5&t=70ljQRJQdMB3LkP3-0)
> **Figma — Dark Foundation:** [StartupMVP — Dark](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=3-4314&t=70ljQRJQdMB3LkP3-0)

---

## Phase 0 — Preparation (Week 1-2)

### 0.4.2 Component Library — Mobile B2C

- [x] P0 **UI framework: NativeWind** (Tailwind for React Native) — decision documented in ARCHITECTURE.md ADR #14
- [x] P0 **State management: Zustand** — decision documented in ARCHITECTURE.md ADR #18. Used for auth state, selected city, filter state, cached user preferences. API/server state handled by the API client layer (orval-generated Axios functions).
- [ ] P0 **Core components** (built on chosen framework, consuming design tokens):
  - Button (primary, secondary, ghost, destructive — with loading state)
  - Text / Heading (using typography scale)
  - Card (event card, venue card, mini-card)
  - Input / TextArea / Select
  - Badge (category badge, status badge)
  - Avatar (venue photo, user photo)
  - Bottom Sheet (event details, filters)
  - Tab Bar / Navigation
  - Empty State (no results, no connection)
  - Skeleton loaders (for map cards, lists)
- [ ] P1 **Map-specific components:**
  - Custom map pin (per-category icon + color)
  - Map mini-card (photo + name + time + distance)
  - Cluster indicator
- [ ] P1 **Image placeholder / loading strategy:**
  - Placeholder images when venues/events have no photos (branded fallback per category)
  - Progressive image loading (blur hash / LQIP from Cloudflare Images)
  - Broken image fallbacks (graceful fallback to placeholder on load error)

### 0.4.7 Mock Environment (MSW) — Mobile B2C

> See [central roadmap §0.4.6](./ROADMAP.md#046-mock-environment-all-frontends) and [ARCHITECTURE.md §5.2.1](./ARCHITECTURE.md) for full spec.

- [ ] P0 Install `msw` (dev dependency)
- [ ] P0 Create `src/mocks/` directory with MSW handlers matching backend OpenAPI spec
- [ ] P0 Server interceptor setup (`src/mocks/server.ts`) — MSW runs as Node.js server in React Native
- [ ] P0 Environment variable toggle: `API_MOCKING=true`
- [ ] P0 `.env.mock` file + `pnpm start:mock` script in `package.json`

### 0.5.4 GitHub Actions — eventapp-mobile-b2c

- [ ] P0 **CI workflow** (triggered on: push to `develop`, push to `main`, PR to either):
  - `pnpm install` (with dependency caching)
  - `pnpm lint` — ESLint
  - `pnpm type-check` — `tsc --noEmit`
- [ ] P0 **CD workflow** (on `main` only):
  - Fastlane or manual build for iOS (Xcode) and Android (Gradle)
  - Submit to App Store / Google Play via Fastlane or platform consoles
- [ ] P1 **OTA updates** — CodePush (App Center) or react-native-ota for JS bundle hotfixes without store review (see also section 4.2)

---

## Phase 1 — Core (Week 3-6)

### 1.1 Auth and user management

- [ ] P0 Registration / login screens:
  - Email + password form
  - Google Sign In button (OAuth)
  - Apple Sign In button (required for iOS App Store)
- [ ] P0 Password reset screen (enter email, enter new password via deep link)
- [ ] P0 Email verification screen — shown after registration; "Check your email" message with resend button; deep link from email opens app and confirms via `POST /auth/verify-email`
- [ ] P0 Account deletion screen (GDPR)

### 1.3 Map and discovery

- [ ] P0 Main screen: map with event pins (MapLibre Native via `@maplibre/maplibre-react-native` — see [ARCHITECTURE.md ADR #17](./ARCHITECTURE.md#11-key-architectural-decisions-log))
- [ ] P0 Geolocation — request location access on first launch
- [ ] P0 Fallback when no location — list view (not an empty map)
- [ ] P0 Pin clustering at high zoom-out (to avoid flooding with pins when many events)
- [ ] P0 Custom pin icons per unified category (12 categories — see [central roadmap](./ROADMAP.md#unified-category-system))
- [ ] P0 "Happening Now" filter — events within 0-8 hours
- [ ] P0 Date filter: calendar date-range picker (select start and end date) with quick-select presets (Today, Tomorrow, This weekend)
- [ ] P0 Category filter (multiselect)
- [ ] P0 Distance filter: 0.5 / 1 / 3 / 5 km
- [ ] P0 **City selection:** detected by default from geolocation, with option to change manually
  - List of available cities (active)
  - "Coming soon to your city" section — list of planned cities with "Express interest" button
  - New city request form (name + contact email)
- [ ] P0 Map <-> List toggle (same content, two views)
- [ ] P0 **Map-first onboarding** — map loads WITHOUT login, without tutorials, without slideshows
- [ ] P0 Event mini-card on pin click (photo + name + time + distance)

### 1.3.0 Onboarding / First-Time User Experience

- [ ] P0 **Location permission request UX:**
  - Clear rationale screen shown before system prompt ("We use your location to show events nearby")
  - On denial: show city picker immediately (same city list as section 1.3)
  - On "Ask Next Time" / dismiss: default to city picker, do not re-prompt automatically
  - Settings redirect: "Enable location in Settings" link/button for users who denied permanently
- [ ] P0 **First launch flow:**
  - If geolocation granted: map centers on user location, events load
  - If geolocation denied: city picker screen → map centers on selected city
  - No login wall, no tutorial slideshow, no onboarding carousel (map-first per section 1.3)
- [ ] P1 **Push notification permission timing:**
  - Request on first "Follow venue" action (per section 1.5.1)
  - Pre-permission screen explaining benefit before system prompt ("Get notified about new events from venues you follow")
  - On denial: follow still works, user sees in-app indicator that notifications are off
  - Settings redirect in user profile to re-enable push permissions
- [ ] P1 **Re-engagement after permission denial:**
  - Periodic soft prompt in user profile: "Turn on notifications to never miss events"
  - Do not re-trigger system prompt — link to device Settings instead

### 1.3.1 Offline / Poor Connectivity

- [ ] P1 Cache last-seen map data and event list for offline viewing (AsyncStorage / MMKV)
- [ ] P1 Graceful degradation when network is unavailable (offline banner, cached content shown with "Last updated X ago" indicator)
- [ ] P1 Retry logic for failed API calls (exponential backoff with max 3 retries)
- [ ] P1 Network status indicator (online/offline banner at top of screen)

### 1.4.1 Event details screen

- [ ] P0 Event details screen — header section:
  - Photo carousel (swipeable, sourced from `event_photos`; fallback to single `photo_url`)
  - Photo counter indicator (e.g., "1/3")
  - Name, date, time, address
- [ ] P0 Event details screen — description:
  - Description (max 500 characters, "Show more" if longer)
- [ ] P0 Event details screen — venue info:
  - Venue name with link to venue profile
- [ ] P0 Event details screen — CTAs:
  - CTA "Buy tickets" (deep link to external system)
  - CTA "Navigate" (deep link to Google Maps / Apple Maps)
- [ ] P0 Event details screen — user actions:
  - "Save event" button (heart/bookmark)
  - "Share" button
  - "Follow venue" button
- [ ] P0 Event details screen — recurring event indicator:
  - "Part of a weekly series" badge (or daily/monthly, based on recurrence type)
  - "View all dates" link -> list of all upcoming instances in the series
- [ ] P0 Event details screen — meta:
  - "Report a problem with event" link
  - Source attribution for aggregated events

### 1.4.2 Venue profile screen

- [ ] P0 Venue profile screen — photo gallery:
  - Swipeable photo carousel (3-5 photos typical, sourced from `venue_photos`)
  - Fallback to single `photo_url` if no gallery photos exist
  - Photo counter indicator (e.g., "2/5")
  - Tap to view full-screen photo with pinch-to-zoom
- [ ] P0 Venue profile screen — info section:
  - Name, category, description, opening hours (including temporary closures, holiday hours, and "open until late" indicators when applicable)
- [ ] P0 Venue profile screen — social:
  - Follower count
  - "Follow" / "Following" button (toggle)
- [ ] P0 Venue profile screen — events:
  - List of upcoming events
- [ ] P0 Follow venue — prompt to log in only when user clicks "Follow"

### 1.4.3 User profile screen

- [ ] P0 User profile screen — saved events:
  - List of saved events
- [ ] P0 User profile screen — Community Scout stats:
  - Scout badge (if earned)
  - "X events discovered" counter
  - Link to "My Tips" list
- [ ] P0 User profile screen — notification settings
- [ ] P0 User profile screen — account settings:
  - Change password
  - Delete account

### 1.4.4 My Events

- [ ] P1 "My Events" screen:
  - List of events user has saved (from `saved_events`)
  - Sorted by event date (soonest first)

### 1.4.5 Followed venues

- [ ] P0 Followed venues screen — dedicated screen accessible from user profile with list of all followed venues

### 1.5.1 Push notifications

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#15-push-notifications)

- [ ] P0 Push notifications integration via `@react-native-firebase/messaging` (FCM) + APNs
- [ ] P0 Register push token with backend on permission grant (`PATCH /users/me/push-token` with FCM/APNs token + device info); re-register on token refresh
- [ ] P0 Request push permission on first "Follow venue"
- [ ] P0 Deep link from push -> directly to event page
- [ ] P1 Receive and display "Weekend Digest" push
- [ ] P1 Receive and display "Event starts in 2 hours" push for saved events
- [ ] P1 Receive and display "Event updated" push with change summary (e.g., "New date: May 5, 18:00") for saved events
- [ ] P1 **Notification preferences screen** (accessible from user profile → notification settings):
  - Master push toggle (on/off — links to device Settings if system permission denied)
  - Per-type toggles: New events from followed venues | Event reminders | Weekend digest | Event updates
  - Default: all enabled
- [ ] P1 **Per-venue notification mute** (accessible from venue profile → "Mute notifications"):
  - Muted venues still appear in Followed list but send no pushes
  - Mute/unmute toggle on venue profile screen

### 1.6 Social sharing

- [ ] P0 "Share" button on event details screen -> **Native Share Sheet** (system)
  - iOS: iOS Share Sheet
  - Android: Android Intent
  - User chooses where (WhatsApp, SMS, email, Instagram Stories, etc.)
- [ ] P1 "Add to calendar" button:
  - Google Calendar (link with parameters)
  - Apple Calendar (.ics file)
  - Outlook (.ics file)
- [ ] P1 WhatsApp share button (wa.me deep link with pre-filled text) — Poland = WhatsApp dominant

### 1.7 Event submission form

- [ ] P1 "Submit an event" screen in mobile app:
  - Event name (required)
  - Date and time (required, validation: must be in the future)
  - Category (single select — matches `unified_category` enum, consistent with `events.category` schema)
  - Address or select from venue list
  - Description (optional, max 500 characters)
  - Photo (optional, upload)
  - Ticket link (optional)
- [ ] P1 Submission status visible to user: Pending / Approved / Rejected + reason

### 1.7.1 Community Scout — Event Tips

> Users can submit lightweight event tips (a link, a photo of a poster, or a short note) to help the platform discover events it doesn't know about. Contributors earn "Scout" recognition on their profile.
> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#171-community-scout--event-tips)

- [ ] P0 **"Know about an event?" floating action button** on home/map screen:
  - Positioned above bottom navigation (glassmorphic FAB, matches design system)
  - Opens lightweight tip submission bottom sheet
- [ ] P0 **Event tip submission bottom sheet** — minimal form:
  - Link (paste a URL — Facebook event, venue page, etc.) — optional
  - Photo (camera or gallery — snap a poster/flyer) — optional, upload to Cloudflare R2
  - Title (short text, optional — "Jazz night at Piwnica")
  - Date (optional date picker — "When is it?")
  - Category (optional — single select from 12 unified categories)
  - Note (optional, max 500 chars — any additional info)
  - **At least one field required** (link, photo, or title+note)
  - Submit button: "Send Tip"
  - Confirmation: "Thanks! We'll review your tip and publish it if it checks out."
- [ ] P0 **"My Tips" section in user profile screen:**
  - List of submitted tips with status badges: Pending / Approved / Rejected / Published
  - Tap on published tip → navigates to the resulting event detail page
  - Counter: "X tips submitted, Y published"
- [ ] P0 **Scout badge on user profile:**
  - Badge displayed next to username based on `scout_level` from API
  - `new`: no badge
  - `scout`: "Scout" badge (secondary color)
  - `top_scout`: "Top Scout" badge (primary color)
- [ ] P0 **"Tipped by @username"** attribution visible on event detail screen for community-sourced events
- [ ] P1 **Push notification** when tip is approved/converted: tapping opens the resulting event

### 1.8 Deep Linking / Universal Links

> Backend counterpart: [ROADMAP-backend.md](./ROADMAP-backend.md#18-deep-linking--universal-links)

- [ ] P0 Define URL scheme for the app (e.g., `eventapp://event/123`, `eventapp://venue/456`)
- [ ] P0 React Native deep linking configuration (React Navigation linking config, iOS `Info.plist` URL types + Android `AndroidManifest.xml` intent filters)
- [ ] P0 Route mapping: define which URLs open which screens (event detail, venue profile, password reset, etc.)
- [ ] P0 Fallback handling: unrecognized deep links open the app home screen gracefully

### 1.8.1 Android Back Button & Navigation

- [ ] P0 **Android hardware back button** navigates to the previous screen in the React Navigation stack (default behavior — verify it works correctly on all flows)
- [ ] P0 **Back from tab root screens** (map, search, profile): pressing back exits the app (Android default) — do not intercept
- [ ] P0 **Back from modals/bottom sheets**: closes the modal/sheet and returns to the underlying screen
- [ ] P0 **Back from deep link targets**: if the user arrived via deep link and there's no history, back navigates to the home screen (map tab) instead of exiting
- [ ] P1 **Gesture navigation (Android 10+)**: verify swipe-back gesture works consistently with React Navigation stack navigation

### 1.9 Internationalization (i18n)

> The app targets Poland — **Polish is the primary UI language.**

- [ ] P0 **Decision: language strategy** — PL + EN both available at launch
- [ ] P0 Set up i18n library (`react-i18next` + `react-native-localize`) in the mobile app
- [ ] P0 Create PL translation file (`locales/pl.json`) — all UI strings: buttons, labels, filters, error messages, onboarding text
- [ ] P0 Extract all hardcoded Polish strings from components into translation keys
- [ ] P0 Use device locale detection (`react-native-localize`) to set default language (PL if `pl-*`, fallback to PL for MVP)
- [ ] P0 Create EN translation file (`locales/en.json`) — full English translation of all UI strings
- [ ] P0 Language switcher in user profile settings (PL / EN)
- [ ] P0 Persist language preference per user (local storage + user profile on backend)

### 1.10 Terms of Service Acceptance

> Required by Apple App Store and Google Play — user must accept ToS before account creation; re-consent required when ToS version changes.

- [ ] P0 **ToS checkbox on registration screen:** required checkbox with link to Privacy Policy and Terms of Service (cannot register without accepting)
- [ ] P0 **Send `tos_accepted: true` + current ToS version** in registration API call
- [ ] P0 **Re-consent screen:** shown on app launch when backend returns `TOS_ACCEPTANCE_REQUIRED`:
  - Display summary of ToS changes (or link to full text)
  - "I accept" button → calls `POST /auth/tos/accept`
  - Block app usage until accepted (modal overlay, no dismiss)
- [ ] P0 **ToS and Privacy Policy links** accessible from user profile settings screen (read-only, opens in-app browser)

### 1.10.1 Error Monitoring & Analytics Integration

- [ ] P0 **Sentry integration** — configure `@sentry/react-native` for crash reporting and error tracking
  - Capture unhandled JS exceptions and native crashes
  - Attach `userId` and `correlationId` (from API responses) to error reports
  - Source maps upload via CI build hooks for readable stack traces
- [ ] P0 **PostHog integration** — configure `posthog-react-native` for product analytics
  - Initialize PostHog only if user has granted analytics consent (see section 1.11)
  - Track key events: `app_open`, `map_view`, `event_detail_view`, `venue_follow`, `venue_unfollow`, `navigate_tap`, `ticket_link_tap`, `push_received`, `push_opened`, `event_share`, `search_performed`, `search_zero_results`, `event_tip_submitted`, `event_tip_view_status`
  - Identify users (PostHog `identify()`) on login, reset on logout

### 1.11 Analytics Consent

- [ ] P0 **Analytics opt-in/opt-out toggle** in user profile settings screen
  - Default: opt-out (user must explicitly grant consent during onboarding)
  - If user opts out: disable PostHog tracking entirely (no events sent)
  - Persist preference locally and sync to backend (`users.analytics_consent` field)
- [ ] P0 First-launch analytics disclosure: brief notice explaining what is tracked and link to Privacy Policy

### 1.12 Accessibility (a11y) — Mobile

- [ ] P0 **Tap target sizes** — all interactive elements >= 44x44pt (Apple HIG) / 48x48dp (Material Design)
- [ ] P0 **Screen reader labels** — `accessibilityLabel` on all buttons, icons, and interactive elements (especially map pins and icon-only buttons)
- [ ] P0 **Color contrast** — text and interactive elements meet WCAG AA contrast ratios (4.5:1 normal text, 3:1 large text)
- [ ] P1 **Dynamic type support (iOS)** — respect system font size settings for core text elements
- [ ] P1 **Screen reader flow testing** — verify VoiceOver (iOS) and TalkBack (Android) can navigate key flows: map → event details → follow venue → share

### 1.13 App Size & Performance Budget

- [ ] P0 **App binary size target:** < 50 MB (initial install from App Store / Google Play)
  - Monitor with CI build size reports
  - Audit dependencies if size exceeds target (large libraries like moment.js, lodash — use lightweight alternatives)
- [ ] P0 **Startup time target:** cold start to interactive map < 3 seconds on mid-range device (e.g., iPhone 12, Samsung Galaxy A54)
- [ ] P1 **Memory usage target:** < 300 MB peak during map interaction with 1000+ pins

### 1.14 Splash Screen & App Icon

- [ ] P0 **Splash screen** — branded splash screen via `react-native-splash-screen`:
  - App logo centered on brand primary background color
  - Smooth transition to map screen (no flash)
  - Keep splash visible until initial data loads (map tiles + nearby events)
- [ ] P0 **App icon** — design and configure app icon:
  - iOS: 1024x1024 (Xcode asset catalog)
  - Android: adaptive icon (foreground + background layers)
  - Matches brand identity / design tokens

---

## Phase 4 — Testing and Launch (Week 9-12)

### 4.1 Testing

- [ ] P0 E2E test: event discovery -> follow venue -> receive push -> navigation
- [ ] P0 Push tests: verify delivery on iOS and Android (different permission systems)
- [ ] P0 Load tests: map with 1000+ pins does not cause lag on a mid-range phone
- [ ] P1 Accessibility tests: color contrasts, tap sizes (min 44x44px)
- [ ] P1 Beta test with 20-30 real users (TestFlight + Android beta)

### 4.2 App Update Strategy

- [ ] P0 Configure CodePush (App Center) or react-native-ota for OTA updates — enables pushing JS bundle fixes without App Store review cycle
  - Set up deployment channels per environment (development / staging / production)
  - Configure update check on app launch (background check, non-blocking)
  - Test OTA update flow end-to-end before launch
- [ ] P1 **OTA update rollback procedure:**
  - If crash rate spikes > 5% after OTA update, publish previous bundle as a new update via CodePush rollback
  - Monitor Sentry crash-free rate after each OTA update — alert if drops below 95%
- [ ] CUT Force update mechanism (minimum app version check) — not needed until breaking API changes exist post-launch
- [ ] CUT Version deprecation policy — defer until multiple live versions with incompatible APIs

### 4.3 App Store submission

- [ ] P0 Prepare App Store assets:
  - App icon (1024x1024)
  - Screenshots (iPhone 6.5", iPad optionally)
  - App description (EN + PL)
  - Privacy Policy URL
- [ ] P0 **Apple Privacy Nutrition Labels** (required for App Store submission):
  - Data types collected: email, location (while using), analytics identifiers
  - Data linked to user: email, saved events, followed venues
  - Data not linked to user: crash logs, performance data
  - Tracking: PostHog (with App Tracking Transparency prompt if needed)
- [ ] P0 **Google Play Data Safety section** (equivalent to Apple's labels):
  - Same data categories as Apple labels, formatted for Google Play Console
  - Declare data sharing with third parties (PostHog, Sentry)
- [ ] P0 Prepare Google Play assets:
  - Icon, feature graphic
  - Screenshots
  - Description (EN + PL)
- [ ] P0 Apple App Store review (usually 24-48h, but can be longer)
- [ ] P0 Google Play review (usually a few hours)
- [ ] P1 Configure App Store Optimization (ASO):
  - Keywords: "events nearby", "what to do today", "events warsaw"
  - Subtitle (iOS): "Find events in your area"

---

## Phase 5 — Post-launch (Month 4-6)

### 5.2 Ticketing (native)

> Build only after confirming that venues want to migrate ticketing from eBilet/Going to EventApp.

- [ ] P2 Ticket purchase flow in mobile app (select tickets -> pay -> receive QR)
- [ ] P2 QR ticket display in user profile
- [ ] P2 Refund request flow

### 5.3 Passes / loyalty cards

> Build only after launching ticketing.

- [ ] P2 User sees their passes in profile with remaining entry counter
- [ ] P2 Pass check-in (QR or NFC)

### 5.5 Post-event surveys

- [ ] P2 3-question survey screen (quick): Overall rating / What did you like most / What to improve

---

*Living document — update after each sprint. Last updated: April 2026.*
