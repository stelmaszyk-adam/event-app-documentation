# Figma Design Roadmap — Web B2B

> **Platform:** Next.js organizer dashboard — venue & event management
> **Design system:** The Radiant Curator (see [DESIGN.md](./DESIGN.md))
> **Feature reference:** [ROADMAP-web-b2b.md](../ROADMAP-web-b2b.md)
> **Figma — Light Foundation:** [StartupMVP — Light](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=2-5&t=70ljQRJQdMB3LkP3-0)
> **Figma — Dark Foundation:** [StartupMVP — Dark](https://www.figma.com/design/NQsJJ3f1GPTMlq8GSod9Qt/StartupMVP?node-id=3-4314&t=70ljQRJQdMB3LkP3-0)
> **Breakpoints:** Mobile (< 768px, functional but not optimized), Tablet (768-1023px), Desktop (1024px+ — primary target)

---

## Phase 0 — Foundations & Component Library

Before designing any screens, set up the Figma file structure, tokens, and reusable components specific to the B2B dashboard.

### 0.1 Figma File Setup

- [ ] Create Figma file following the structure from DESIGN.md §9.10 (Screens — Web B2B page)
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

### 0.2 Core Components (Shared with Web B2C and Admin)

Build as Figma components with variants and auto-layout. Follow token bindings from DESIGN.md §9.9.

#### Buttons
- [ ] **Primary button** — gradient fill (`primary` to `primary_container`), `radius/full`, states: default, hover, pressed, disabled
- [ ] **Secondary button (Glass)** — glassmorphic fill with backdrop blur, states: default, hover, pressed, disabled
- [ ] **Tertiary button** — transparent, `primary` text only, states: default, hover, pressed, disabled
- [ ] **Destructive button** — `error` fill for delete/destructive actions, states: default, hover, pressed, disabled
- [ ] **Icon button** — circular, for inline actions (edit, delete, duplicate)
- [ ] All buttons: min height 48px, touch target 44x44px

#### Form Elements
- [ ] **Text input** — `surface/container-low` fill, label above, helper text below, states: default, focused (ghost border), error, disabled
- [ ] **Textarea** — same styling as text input, resizable indicator
- [ ] **Select / Dropdown** — trigger button + dropdown panel with options
- [ ] **Checkbox** — with label, states: unchecked, checked, indeterminate, disabled
- [ ] **Radio group** — with labels, states: unselected, selected, disabled
- [ ] **Toggle / Switch** — for binary settings (e.g., recurring event)
- [ ] **Date picker** — calendar popup with single date and date-range selection
- [ ] **Time picker** — hour + minute selectors
- [ ] **File upload zone** — drag-and-drop area with click fallback, upload progress, preview thumbnail
- [ ] **Form error message** — inline error below input with `error` color, linked via `aria-describedby`

#### Data Display
- [ ] **Table** — header row, data rows, hover state, sortable column headers, pagination controls
- [ ] **Stat card** — large number + label + trend indicator (up/down arrow with percentage)
- [ ] **Badge** — status badges: Draft, Published, In Moderation, Rejected, Cancelled
- [ ] **Avatar** — venue photo placeholder, circular with fallback initial
- [ ] **Progress bar** — for onboarding checklist completion

#### Feedback
- [ ] **Toast / Notification** — success, error, info variants, auto-dismiss with close button
- [ ] **Confirmation modal** — title, message, cancel + confirm buttons (destructive variant for delete actions)
- [ ] **Skeleton loaders** — for dashboard cards, event lists, analytics charts, tables

#### Cards
- [ ] **Event list card** — horizontal layout: thumbnail + title + date + status badge + quick actions (edit, delete, duplicate)
- [ ] **Venue card (My Venues)** — venue photo, name, follower count, upcoming events count, quick-switch link
- [ ] **Notification history card** — push content preview, sent date, reach stats (sent/opened)

### 0.3 Dashboard Layout Components

#### Navigation
- [ ] **Sidebar navigation** — vertical nav with icons + labels, collapsible on tablet:
  - Dashboard (overview)
  - Events
  - Venue Profile
  - Push Notifications
  - Analytics
  - Settings / Account
  - Venue switcher (at top or bottom of sidebar)
- [ ] **Top bar** — page title, breadcrumbs, user avatar + dropdown (settings, logout)
- [ ] **Mobile navigation** — hamburger menu or bottom nav (functional fallback)

#### Layout Shells
- [ ] **Dashboard shell** — sidebar + top bar + main content area, responsive behavior:
  - Desktop (1024px+): persistent sidebar (240px) + main content
  - Tablet (768-1023px): collapsible sidebar (icon-only when collapsed) + full-width content
  - Mobile (< 768px): hidden sidebar behind hamburger, stacked full-width content

---

## Phase 1 — Screen Design: Auth & Onboarding

### 1.1 Authentication Pages

> Reference: ROADMAP-web-b2b §1.1

- [ ] **Registration page** — company email, password, confirm password, ToS checkbox (with link to Privacy Policy and Terms of Service), "Register" primary button
- [ ] **Login page** — email, password, "Log in" primary button, "Forgot password?" tertiary link, "Register" secondary link
- [ ] **Email verification page** — "Check your email" illustration/message, email address shown, "Resend verification" button with cooldown timer
- [ ] **Password reset — request** — email input, "Send reset link" button
- [ ] **Password reset — new password** — new password, confirm password, "Reset password" button
- [ ] **Session expired state** — redirect to login with info message: "Your session has expired, please log in again"
- [ ] All auth pages: centered card layout on `surface` background, brand logo at top, minimal — no sidebar

### 1.2 Terms of Service Re-consent Modal

> Reference: ROADMAP-web-b2b §1.10

- [ ] **Full-screen blocking modal** — no dismiss (blocks dashboard until accepted):
  - Summary of ToS changes or link to full text
  - "I accept the updated Terms of Service" primary button
  - Cannot interact with dashboard behind modal

### 1.3 Cookie Consent

> Reference: ROADMAP-web-b2b §1.11

- [ ] **Cookie consent banner** — bottom of screen:
  - Three buttons: Accept all / Reject all / Manage preferences
  - Glassmorphic or solid surface container style
- [ ] **Cookie preferences modal** — category toggles:
  - Essential (always on, disabled toggle)
  - Analytics (PostHog)
  - Save preferences button
- [ ] "Manage cookie preferences" link in dashboard footer

---

## Phase 2 — Screen Design: Venue Claim & Onboarding

### 2.1 Venue Claim Flow

> Reference: ROADMAP-web-b2b §2.1

- [ ] **Claim landing page** — "Do you manage this venue? Claim the profile for free."
  - Hero section with venue illustration or photo
  - Benefits list (manage events, send push notifications, view analytics)
  - "Start claim" primary CTA
- [ ] **Register new venue form** — for venues not on the map:
  - Name, address (with geocoding validation), category selector, phone, email
  - **Fallback: map pin placement** — drag-and-drop pin when address not recognized by geocoding API
  - "Submit for review" button with "Review time: max 24h" note
- [ ] **Verification method selection** — choose verification method:
  - Method 1: SMS verification (priority) — phone number display + OTP code input (6 digits)
  - Method 2: Email verification — email domain matching explanation + code/link input
  - Method 3: Google Business Profile (P1) — OAuth button
  - Method 4: Document upload (P1, fallback) — CEIDG/KRS/invoice upload zone
- [ ] **Verification code input** — OTP-style input with auto-advance, resend link with timer
- [ ] **Claim success page** — confirmation message, "Go to dashboard" primary CTA
- [ ] **Adopted events review** — list of aggregated events transferred on claim:
  - Each event: thumbnail, title, date, source attribution
  - Actions per event: Confirm / Edit / Delete
  - Bulk actions: "Confirm all" button

### 2.2 Organizer Onboarding

> Reference: ROADMAP-web-b2b §2.2

- [ ] **Onboarding checklist overlay/panel** — progress bar (X/5 complete):
  - [ ] Add venue photo — camera icon, links to venue profile editor
  - [ ] Complete description — text icon, links to venue profile editor
  - [ ] Add opening hours — clock icon, links to venue profile editor
  - [ ] Add first event — calendar icon, links to event creation form
  - [ ] Send push to followers — bell icon, links to push notification sender
- [ ] Each step: checkbox, label, brief description, chevron/link to corresponding section
- [ ] Completed steps: strikethrough or checkmark with muted styling
- [ ] Dismissable after completion (or manually skippable)

---

## Phase 3 — Screen Design: Dashboard Core

### 3.1 Dashboard Overview (Home)

> Reference: ROADMAP-web-b2b §2.6, §2.9

- [ ] **Stat cards row** — top of main content:
  - Follower count (with trend: "+X this week" arrow)
  - Total event views (last 30 days)
  - "Buy tickets" clicks (last 30 days)
  - "Navigate" clicks (last 30 days)
- [ ] **Aggregate view (multi-venue)** — combined stats across all venues with per-venue breakdown
- [ ] **Quick actions section** — "Create event", "Send push notification", "Edit venue profile"
- [ ] **Upcoming events list** — next 3-5 events with status badges, "View all" link
- [ ] **Recent push notifications** — last 2-3 pushes with reach stats
- [ ] **Onboarding checklist** (if incomplete) — compact inline version

### 3.2 Venue Switcher

> Reference: ROADMAP-web-b2b §2.9

- [ ] **Sidebar venue switcher** — dropdown at top of sidebar navigation:
  - Current venue name + avatar/photo
  - Dropdown list of all owned venues with follower count
  - "My Venues" link at bottom of dropdown
- [ ] **"My Venues" list page** — grid/list of all venues:
  - Venue card: photo, name, follower count, upcoming events count
  - Quick-switch links
  - "Claim another venue" CTA

### 3.3 Venue Profile Management

> Reference: ROADMAP-web-b2b §2.3, §2.3.1

- [ ] **Venue profile edit form** — full page within dashboard shell:
  - Name input
  - Description textarea (max 500 chars, character counter)
  - Category selector
  - Address input (with edit option if incorrect from aggregated data)
  - Website, Facebook, Instagram URL inputs
- [ ] **Photo gallery management section:**
  - Drag-and-drop upload zone (max 5 photos)
  - Uploaded photos grid: drag-to-reorder, main photo indicator (position 0), delete button per photo
  - Upload progress indicator per file
  - File validation errors: type (JPEG, PNG, WebP) and size (max 10 MB)
- [ ] **Opening hours editor:**
  - Per day of week: open/closed toggle + start/end time pickers
  - "Variable closing time" option ("Open until late" toggle)
  - Holiday/special hours section: date picker + override hours
  - Temporary closures: date range + optional reason text
- [ ] **Preview mode** — "Preview as user" button opens a modal/panel showing how profile appears to end users
- [ ] **Save/discard actions** — sticky bottom bar: "Save changes" primary button, "Discard" tertiary button

### 3.4 Event Management

> Reference: ROADMAP-web-b2b §2.4, §2.4.0, §2.4.1, §2.4.2

#### Event List Page
- [ ] **Tab navigation:** Upcoming / Past / Draft
- [ ] **Event table/list:** thumbnail, title, date, status badge (Draft / Published / In Moderation / Rejected), quick actions (edit, delete, duplicate)
- [ ] **Empty state:** "No events yet — create your first event" with primary CTA
- [ ] **"Create event" primary button** — top-right of page

#### Event Creation/Edit Form
- [ ] **Form layout** — single column, sections with clear headers:
  - Name (required) — text input
  - Date and time (required) — date picker + time picker, timezone label ("CET (UTC+1)")
  - Duration (optional) — numeric input or duration picker
  - Recurring toggle + recurrence picker (see below)
  - Category (required) — select dropdown (12 categories)
  - Description — rich text editor (basic: bold, italic, lists), max 1000 chars with counter
  - Photos — drag-and-drop upload zone (max 3), reorderable thumbnails
  - Price — radio: Free / Paid (with price input + currency)
  - Ticket link — URL input (eBilet / Going / own website)
  - Venue-optional toggle — "Event without permanent venue" (shows address input when enabled)
- [ ] **Recurring event picker** (shown when "Recurring: yes"):
  - Frequency: Daily / Weekly / Monthly radio/select
  - Weekly: day-of-week multi-select checkboxes
  - Monthly: day-of-month picker
  - End condition: "Never" / "On date" (date picker) / "After N occurrences" (number input)
  - Preview text: "This event will repeat every Wednesday until Dec 31, 2026 (38 occurrences)"
- [ ] **Form actions:** "Save as draft" secondary button, "Publish" primary button, "Discard" tertiary link
- [ ] **Auto-save indicator** — "Draft saved" label with timestamp (auto-save every 30 seconds)
- [ ] **Draft recovery prompt** — modal on page load if unsaved draft exists: "Restore draft?" with preview

#### Event Detail Page (Organizer View)
- [ ] **Event info display:**
  - Photo gallery (carousel)
  - Name, date, time, duration, category
  - Description
  - Price + ticket link
  - Venue name + address (with map pin)
  - Source attribution badge (if adopted): "Originally imported from [source]"
  - Status badge: Draft / Published / In Moderation / Rejected
- [ ] **Quick action buttons:**
  - Edit event (navigate to edit form)
  - Delete event (confirmation modal)
  - Duplicate event (pre-fill creation form)
  - "Notify followers" (navigate to push sender, pre-filled)
- [ ] **Inline analytics summary:**
  - Views count
  - "Buy tickets" clicks
  - "Navigate" clicks
  - Push reach and open rate (if push was sent)
- [ ] **Link to public event page** (Web B2C URL, "View public page" opens new tab)
- [ ] **Activity timeline** (P1) — created, published, push sent, moderation status changes

#### Recurring Event Management
- [ ] **Series management panel** — shown on event detail for recurring events:
  - Badge: "Recurring — [Weekly on Wednesdays]"
  - "View all occurrences" — paginated list with status per instance (upcoming / cancelled / modified)
  - Quick actions per instance: Edit / Cancel / Restore
- [ ] **Edit scope dialog** — modal on editing a recurring instance:
  - Radio options: "This event only" / "This and all future events" / "All events in the series"
  - Explanation text for each option
  - Destructive warning for "All events" option
- [ ] **Cancel occurrence modal** — "Cancel [Event Name] on [Date]?" with optional reason text field
- [ ] **Stop/delete series actions:**
  - "Stop recurring" — ends recurrence, keeps past instances
  - "Delete entire series" — confirmation modal with count of affected events

### 3.5 Push Notifications

> Reference: ROADMAP-web-b2b §2.5

- [ ] **"Notify followers" page/panel:**
  - Push content textarea (max 120 chars, character counter)
  - Live preview of how notification will appear on device (mock phone frame)
  - Daily limit indicator: "1 of 1 daily push remaining" or "Daily push already used"
  - Follower count display: "Will be sent to X followers"
  - Confirmation modal: "You will send a notification to X followers. This is your venue's daily push notification. Continue?"
  - "Send" primary button (disabled when limit reached)
- [ ] **Sent notifications history page:**
  - List of last 30 sent pushes
  - Per notification: content preview, sent date/time, reach (sent count), opens (open count + percentage)
- [ ] **Push stats inline** — on event detail page: push reach and open rate

### 3.6 Analytics

> Reference: ROADMAP-web-b2b §2.6

- [ ] **Analytics overview page:**
  - Follower count stat card with weekly trend chart
  - Total event views (last 30 days) with daily sparkline
  - "Buy tickets" clicks (last 30 days) with daily sparkline
  - "Navigate" clicks (last 30 days) with daily sparkline
- [ ] **Followers over time chart** (P1) — line chart, last 12 weeks, chart wrapper component using Recharts styling
- [ ] **Per-event analytics** — accessible from event detail page (see §3.4 Event Detail)
- [ ] **Category benchmark** (P1) — "Your event vs category average" comparison card

---

## Phase 4 — Screen Design: Settings & Utility

### 4.1 Account Settings

- [ ] **Account settings page:**
  - Email display (read-only or editable)
  - Change password form
  - Language preference (PL / EN)
  - Notification preferences
  - "Delete account" destructive link (with confirmation modal)
- [ ] **ToS and Privacy Policy links** — in page footer and account settings

### 4.2 Error & Empty States

> Reference: ROADMAP-web-b2b §2.10

- [ ] **404 page** — "Page not found" with link to dashboard home, brand-consistent styling
- [ ] **API error state** — inline error message within content area with "Retry" button
- [ ] **Empty states (all with illustration/icon + message + CTA):**
  - No events yet — "Create your first event" with primary CTA
  - No followers yet — "Share your venue to attract followers" message
  - No analytics data yet — "Analytics will appear after your first event is published"
  - No push notifications sent — "Send your first notification after publishing an event"
- [ ] **Loading states:**
  - Skeleton loaders for stat cards (pulsing rectangles)
  - Skeleton loaders for event list (repeated card placeholders)
  - Skeleton loaders for analytics charts (placeholder chart frame)
  - Skeleton loaders for table rows

### 4.3 Footer

- [ ] **Dashboard footer** — minimal:
  - Terms of Service link
  - Privacy Policy link
  - "Manage cookie preferences" link
  - App version / copyright

---

## Phase 5 — Interaction & Motion Design

### 5.1 Micro-interactions

> Reference: DESIGN.md §7.7 motion tokens

- [ ] **Sidebar collapse/expand** — smooth width transition, `duration_normal`, `easing_standard`
- [ ] **Venue switcher dropdown** — slide-down, `duration_fast`, `easing_decelerate`
- [ ] **Photo drag-and-drop reorder** — smooth position swap, `duration_fast`
- [ ] **Upload progress** — animated progress bar fill
- [ ] **Toast notifications** — slide in from top-right, auto-dismiss after 5s
- [ ] **Modal entrance** — fade + scale up, `duration_normal`, `easing_decelerate`
- [ ] **Tab switching** — content crossfade, `duration_fast`
- [ ] **Stat card trend animation** — number count-up on page load, `duration_slow`
- [ ] **Onboarding checklist step completion** — checkmark pop animation, `easing_pop`
- [ ] **Form validation errors** — shake on submit with errors, error messages fade in

### 5.2 Reduced Motion

- [ ] Design static alternatives for all animations (per `prefers-reduced-motion`)
- [ ] Opacity transitions remain; transforms and kinetic animations disabled

---

## Phase 6 — Dark Mode

### 6.1 Full Dark Mode Pass

> Reference: DESIGN.md §7.2

- [ ] Switch all screens to Dark mode using the Colors collection (Mode: Dark)
- [ ] Verify contrast ratios meet WCAG AA on dark surfaces
- [ ] Adjust glassmorphism recipe: `surface/container` at 60% opacity (dark mode variant)
- [ ] Verify stat cards, charts, and data visualizations on dark backgrounds
- [ ] Review all empty states and illustrations for dark mode compatibility

**Screens to verify in dark mode:**
- [ ] Login / Registration pages
- [ ] Dashboard overview
- [ ] Event list + event detail
- [ ] Event creation/edit form
- [ ] Venue profile editor
- [ ] Push notifications page
- [ ] Analytics page
- [ ] Settings page
- [ ] Error / empty states
- [ ] Cookie consent banner/modal
- [ ] ToS re-consent modal

---

## Phase 7 — Responsive Audit & Handoff

### 7.1 Responsive Completeness Check

Ensure every screen has been designed for all three breakpoints:

| Screen | Mobile (< 768) | Tablet (768-1023) | Desktop (1024+) |
|---|---|---|---|
| Login / Registration | [ ] | [ ] | [ ] |
| Email verification | [ ] | [ ] | [ ] |
| Password reset | [ ] | [ ] | [ ] |
| Venue claim flow | [ ] | [ ] | [ ] |
| Onboarding checklist | [ ] | [ ] | [ ] |
| Dashboard overview | [ ] | [ ] | [ ] |
| My Venues list | [ ] | [ ] | [ ] |
| Event list (tabs) | [ ] | [ ] | [ ] |
| Event creation/edit form | [ ] | [ ] | [ ] |
| Event detail (organizer) | [ ] | [ ] | [ ] |
| Recurring event management | [ ] | [ ] | [ ] |
| Venue profile editor | [ ] | [ ] | [ ] |
| Push notifications | [ ] | [ ] | [ ] |
| Analytics overview | [ ] | [ ] | [ ] |
| Account settings | [ ] | [ ] | [ ] |
| 404 page | [ ] | [ ] | [ ] |
| Cookie consent | [ ] | [ ] | [ ] |

### 7.2 Design QA Checklist

- [ ] All components use Figma variables — no hardcoded colors, spacing, or radius
- [ ] All text layers use Text Styles — no detached styles
- [ ] Auto-layout applied to all frames for proper responsive behavior
- [ ] Component variants cover all interactive states (default, hover, pressed, focused, disabled)
- [ ] Accessibility: focus rings visible (`2px solid outline`, `2px offset`)
- [ ] Accessibility: touch targets >= 44x44px on all interactive elements
- [ ] Accessibility: form inputs linked to labels and error messages via `aria-describedby`
- [ ] No use of `#000000` or `#FFFFFF` — only `on_surface` and `surface` tokens
- [ ] No 1px borders — only tonal shifts, ghost borders, or gradients
- [ ] Card/section separation uses whitespace (`space_8` / `space_12`), never dividers
- [ ] Tables use tonal row alternation or hover highlight, not row borders

### 7.3 Developer Handoff Preparation

- [ ] Annotate spacing, padding, and gap values with token names (not pixel values)
- [ ] Document component variant props and when to use each
- [ ] Export design tokens via Figma Variables or Token Studio for `tailwind.config.ts` mapping
- [ ] Provide asset exports: onboarding illustrations (SVG), empty state illustrations, favicon set
- [ ] Link each screen to its corresponding ROADMAP-web-b2b section for implementation context
- [ ] Document sidebar navigation behavior across breakpoints (persistent → collapsible → hamburger)

---

## Appendix A — Screen Inventory

Complete list of unique screens/views to design:

| # | Screen | Route | Priority |
|---|---|---|---|
| 1 | Registration | `/register` | P0 |
| 2 | Login | `/login` | P0 |
| 3 | Email verification | `/verify-email` | P0 |
| 4 | Password reset (request) | `/reset-password` | P0 |
| 5 | Password reset (new password) | `/reset-password/[token]` | P0 |
| 6 | Venue claim landing | `/claim` | P0 |
| 7 | Register new venue form | `/claim/new` | P0 |
| 8 | Verification method + code input | `/claim/verify` | P0 |
| 9 | Claim success + adopted events review | `/claim/success` | P0 |
| 10 | Onboarding checklist | `/onboarding` (or overlay) | P0 |
| 11 | Dashboard overview | `/dashboard` | P0 |
| 12 | My Venues list | `/dashboard/venues` | P0 |
| 13 | Event list (upcoming/past/draft tabs) | `/dashboard/events` | P0 |
| 14 | Event creation form | `/dashboard/events/new` | P0 |
| 15 | Event edit form | `/dashboard/events/[id]/edit` | P0 |
| 16 | Event detail (organizer view) | `/dashboard/events/[id]` | P0 |
| 17 | Recurring event series management | `/dashboard/events/[id]/series` | P1 |
| 18 | Venue profile editor | `/dashboard/venue/profile` | P0 |
| 19 | Push notifications — send | `/dashboard/push/new` | P0 |
| 20 | Push notifications — history | `/dashboard/push` | P0 |
| 21 | Analytics overview | `/dashboard/analytics` | P0 |
| 22 | Account settings | `/dashboard/settings` | P0 |
| 23 | 404 — Not Found | any invalid route | P0 |
| 24 | ToS re-consent modal | overlay (blocking) | P0 |
| 25 | Cookie consent banner + preferences | overlay | P0 |
| 26 | Social media graphic preview | `/dashboard/events/[id]/graphic` | P2 |

## Appendix B — Component Inventory

| # | Component | Variants | States |
|---|---|---|---|
| 1 | Button | Primary, Secondary (Glass), Tertiary, Destructive, Icon | Default, Hover, Pressed, Focused, Disabled |
| 2 | Text input | Standard, With icon, With suffix | Default, Focused, Error, Disabled, Filled |
| 3 | Textarea | Standard, With character counter | Default, Focused, Error, Disabled |
| 4 | Select / Dropdown | Standard | Closed, Open, Selected, Error, Disabled |
| 5 | Checkbox | Standard | Unchecked, Checked, Indeterminate, Disabled |
| 6 | Radio | Standard | Unselected, Selected, Disabled |
| 7 | Toggle / Switch | Standard | Off, On, Disabled |
| 8 | Date picker | Single date, Date range | Closed, Open, Date selected |
| 9 | Time picker | Standard | Closed, Open, Time selected |
| 10 | File upload zone | Single, Multi (gallery) | Empty, Dragging over, Uploading (progress), Complete, Error |
| 11 | Stat card | Standard, With trend, With sparkline | Default, Loading (skeleton) |
| 12 | Event list card | Standard, Adopted (with source badge) | Default, Hover, Loading (skeleton) |
| 13 | Venue card (My Venues) | Standard | Default, Hover, Loading (skeleton) |
| 14 | Notification history card | Standard | Default |
| 15 | Status badge | Draft, Published, In Moderation, Rejected, Cancelled | — |
| 16 | Table | With sorting, With pagination | Default, Loading (skeleton), Empty |
| 17 | Sidebar navigation | Expanded, Collapsed (icon-only) | Active item, Inactive item, Hover |
| 18 | Venue switcher | In sidebar | Closed, Expanded (dropdown) |
| 19 | Top bar | With breadcrumbs | Desktop, Tablet, Mobile |
| 20 | Onboarding checklist | Full (overlay), Compact (inline) | In progress, Complete |
| 21 | Toast | Success, Error, Info | Entering, Visible, Exiting |
| 22 | Confirmation modal | Standard, Destructive | — |
| 23 | ToS re-consent modal | Blocking | — |
| 24 | Cookie consent banner | Standard | Visible, Hidden |
| 25 | Cookie preferences modal | Standard | — |
| 26 | Skeleton loader | Card, Table row, Stat card, Chart | Shimmer animation |
| 27 | Empty state | No events, No followers, No analytics, No pushes | — |
| 28 | Progress bar | Onboarding | 0-100% fill |
| 29 | Photo gallery manager | Venue (5 max), Event (3 max) | Editing, Reordering |
| 30 | Recurring event picker | Frequency, End condition | Daily, Weekly, Monthly |
| 31 | Edit scope dialog | Recurring event edit | Three radio options |
| 32 | Push content preview | Device mock | Filled |
| 33 | Daily limit indicator | Available, Exhausted | — |
| 34 | Activity timeline | Event history | — |
| 35 | Chart wrapper | Line chart, Sparkline | Default, Loading, Empty |

---

*Living document — update as design progresses. Last updated: May 2026.*
