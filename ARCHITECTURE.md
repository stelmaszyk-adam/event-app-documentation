# EventApp — Architecture (Multi-Repo)

> **Guiding principle:** 5 independent repositories, zero shared packages. The backend's OpenAPI specification is the single source of truth for all API contracts.

---

## 1. Repository Overview

| Repository | Purpose | Tech Stack | Deployment Target |
|---|---|---|---|
| `eventapp-backend` | REST API, aggregation pipeline, push jobs, auth | NestJS, Drizzle ORM, PostgreSQL + PostGIS, Redis, Bull | Railway |
| `eventapp-mobile-b2c` | Consumer mobile app (iOS + Android) | React Native (CLI), React Navigation, MapLibre Native | App Store / Google Play (Fastlane) |
| `eventapp-web-b2c` | Public read-only discovery pages (SSR, SEO, OG tags) | Next.js (App Router), SSR | Cloudflare Pages / Vercel |
| `eventapp-web-b2b` | Organizer dashboard — venue & event management | Next.js (App Router), TanStack Query | Cloudflare Pages / Vercel |
| `eventapp-web-admin-internal` | Internal admin panel — moderation, KPIs, user mgmt | Next.js (App Router), TanStack Query | Cloudflare Pages / Vercel (IP-restricted) |

Each repo has its own `package.json`, CI pipeline, deployment config, and `.env.example`. There is no monorepo, no shared `packages/` directory, and no workspace linking between repos.

---

## 2. Communication Pattern

```
                        ┌──────────────────────────────┐
                        │      eventapp-backend         │
                        │         (NestJS)              │
                        │                               │
                        │  GET /api/docs-json ──────────┼──── OpenAPI 3.0 spec (JSON)
                        │  GET /api/docs       (UI)     │
                        └──────────┬────────────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
            ┌───────▼──────┐ ┌────▼───────┐ ┌────▼────────────┐
            │ mobile-b2c   │ │  web-b2c   │ │ web-b2b /       │
            │ (RN CLI)     │ │  (Next.js) │ │ admin-internal  │
            │              │ │            │ │ (Next.js)       │
            │ orval →      │ │ openapi-   │ │ orval →         │
            │ Axios fns    │ │ typescript │ │ TanStack Query  │
            └──────────────┘ │ + openapi- │ │ hooks           │
                             │ fetch      │ └─────────────────┘
                             └────────────┘

        Each frontend auto-generates its own typed API client.
        No shared SDK. No shared types package.
```

Every frontend talks **only** to the backend REST API. Frontends never communicate with each other. The OpenAPI spec replaces the role a shared types package would play in a monorepo.

---

## 3. API Contract Workflow

### 3.1 Backend publishes the spec

The backend uses `@nestjs/swagger` decorators on every controller and DTO:

```typescript
// Example: events.controller.ts
@ApiTags('events')
@Controller('events')
export class EventsController {
  @Get()
  @ApiOperation({ summary: 'List events with geospatial filtering' })
  @ApiQuery({ name: 'lat', type: Number, required: true })
  @ApiQuery({ name: 'lng', type: Number, required: true })
  @ApiQuery({ name: 'radius', type: Number, required: false, description: 'km' })
  @ApiQuery({ name: 'category', enum: UnifiedCategory, required: false })
  @ApiResponse({ status: 200, type: PaginatedEventsDto })
  findAll(@Query() query: FindEventsQueryDto) { ... }
}
```

- **Swagger UI** available at `/api/docs` (development and staging only).
- **JSON spec** available at `/api/docs-json` (all environments).
- Spec is **committed** to the backend repo at `docs/openapi.json` so frontends can pin to a known version.

### 3.2 Backend CI exports the spec

The backend CI pipeline includes a step that:

1. Boots the NestJS app in a test mode.
2. Fetches `http://localhost:3000/api/docs-json`.
3. Saves the result as `docs/openapi.json`.
4. Commits the updated spec if it changed (or publishes it as a CI artifact).

### 3.3 Each frontend generates its own client

Every frontend repo contains a codegen script:

```jsonc
// package.json (each frontend)
{
  "scripts": {
    "api:generate": "<codegen-tool> --input <path-or-url-to-spec> --output src/api/generated"
  }
}
```

| Frontend | Codegen Tool | Output Style | Why |
|---|---|---|---|
| `eventapp-mobile-b2c` | `orval` | Axios request functions | Axios works well in React Native; orval generates clean function signatures |
| `eventapp-web-b2c` | `openapi-typescript` + `openapi-fetch` | Typed fetch wrapper | Lightweight, no runtime dependencies, SSR-friendly for Next.js server components |
| `eventapp-web-b2b` | `orval` | TanStack Query hooks | Dashboard is heavily interactive; auto-generated `useQuery`/`useMutation` hooks save boilerplate |
| `eventapp-web-admin-internal` | `orval` | TanStack Query hooks | Same rationale as B2B |

### 3.4 Spec consumption options

Frontends can consume the spec in two ways:

- **URL mode** (development): point codegen at `http://localhost:3000/api/docs-json`.
- **File mode** (CI / pinned): download `docs/openapi.json` from the backend repo (via raw GitHub URL or as a CI artifact) and reference it locally.

### 3.5 API versioning (MVP)

No versioning for MVP. The API is at a single version. Breaking changes are coordinated via team communication (Slack/Discord) and simultaneous frontend updates. Must be introduced before the first mobile production release (cannot force-update installed apps). Also reconsider when the team grows beyond 3 developers or external consumers appear. See [ROADMAP.md — Versioning trigger](./ROADMAP.md#versioning-trigger) for the full trigger list.

---

## 4. Per-Repo Folder Structure

### eventapp-backend

```
eventapp-backend/
├── src/
│   ├── auth/              # AuthModule (JWT, OAuth, guards)
│   ├── events/            # EventsModule (CRUD, geospatial queries)
│   ├── venues/            # VenuesModule (CRUD, claims)
│   ├── users/             # UsersModule (follows, saved events, profiles)
│   ├── notifications/     # NotificationsModule (FCM/APNs push, email via Resend, Bull jobs)
│   ├── uploads/           # UploadsModule (Cloudflare R2 presigned URLs)
│   ├── importers/         # ImportersModule (aggregation pipeline, @nestjs/schedule cron)
│   ├── claims/            # ClaimsModule (SMS OTP, verification)
│   ├── admin/             # AdminModule (moderation, KPIs, audit log)
│   ├── common/            # Shared decorators, pipes, filters, DTOs
│   ├── config/            # Env validation (zod), config module
│   ├── database/          # Drizzle ORM config, migrations, seeds
│   └── main.ts
├── docs/
│   └── openapi.json       # Committed OpenAPI spec
├── docker-compose.yml     # PostgreSQL + PostGIS + Redis (local dev)
├── .env.example
├── nest-cli.json
├── tsconfig.json
└── package.json
```

### eventapp-mobile-b2c

```
eventapp-mobile-b2c/
├── src/
│   ├── api/
│   │   ├── generated/     # Auto-generated Axios functions (orval output)
│   │   └── client.ts      # Axios instance config (base URL, interceptors)
│   ├── navigation/        # React Navigation setup (stack, tab navigators)
│   ├── screens/           # Screen components
│   │   ├── tabs/          # Tab screens (map, search, profile)
│   │   ├── EventDetail.tsx
│   │   └── VenueDetail.tsx
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom hooks
│   ├── stores/            # State management (Zustand)
│   ├── utils/             # Helpers (formatting, geo, etc.)
│   └── constants/         # Colors, categories, config
├── assets/                # Images, fonts
├── orval.config.ts
├── .env.example
├── ios/                   # Native iOS project (Xcode)
├── android/               # Native Android project (Gradle)
└── package.json
```

### eventapp-web-b2c

```
eventapp-web-b2c/
├── src/
│   ├── api/
│   │   ├── generated/     # openapi-typescript types + openapi-fetch client
│   │   └── client.ts      # Configured fetch client
│   ├── app/               # Next.js App Router
│   │   ├── page.tsx       # Landing / city selector
│   │   ├── [city]/
│   │   │   ├── page.tsx   # City event listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Event detail (SSR, OG tags)
│   │   ├── venue/[id]/
│   │   │   └── page.tsx   # Venue profile
│   │   └── layout.tsx
│   ├── components/
│   └── lib/               # OG image generation, metadata helpers
├── public/
├── .env.example
├── next.config.ts
└── package.json
```

### eventapp-web-b2b

```
eventapp-web-b2b/
├── src/
│   ├── api/
│   │   ├── generated/     # orval TanStack Query hooks
│   │   └── client.ts      # Axios instance
│   ├── app/               # Next.js App Router
│   │   ├── (auth)/        # Login, register, password reset
│   │   ├── (dashboard)/   # Authenticated organizer pages
│   │   │   ├── overview/
│   │   │   ├── venue/
│   │   │   ├── events/
│   │   │   ├── notifications/
│   │   │   └── analytics/
│   │   └── layout.tsx
│   ├── components/
│   ├── hooks/
│   └── lib/
├── orval.config.ts
├── .env.example
├── next.config.ts
└── package.json
```

### eventapp-web-admin-internal

```
eventapp-web-admin-internal/
├── src/
│   ├── api/
│   │   ├── generated/     # orval TanStack Query hooks
│   │   └── client.ts
│   ├── app/               # Next.js App Router
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   │   ├── moderation/
│   │   │   ├── venues/
│   │   │   ├── users/
│   │   │   ├── kpis/
│   │   │   └── importers/
│   │   └── layout.tsx
│   ├── components/
│   ├── hooks/
│   └── lib/
├── orval.config.ts
├── .env.example
├── next.config.ts
└── package.json
```

---

## 5. Development Workflow

### 5.1 Local development

```
┌─────────────────────────────────────────────┐
│  Docker Compose (from eventapp-backend)     │
│  ┌──────────────────┐  ┌─────────────────┐  │
│  │ PostgreSQL 16     │  │ Redis 7         │  │
│  │ + PostGIS 3.4     │  │                 │  │
│  │ + pg_trgm         │  │                 │  │
│  │ + pgcrypto        │  │                 │  │
│  │ + unaccent        │  │                 │  │
│  │ Port: 5432        │  │ Port: 6379      │  │
│  └──────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────┘

Backend:   pnpm dev          → http://localhost:3000
Mobile:    npx react-native start    → iOS Simulator / Android Emulator
Web B2C:   pnpm dev          → http://localhost:3001
Web B2B:   pnpm dev          → http://localhost:3002
Admin:     pnpm dev          → http://localhost:3003
```

Each frontend's `.env.local` has:

```bash
API_URL=http://localhost:3000    # or NEXT_PUBLIC_API_URL for Next.js
```

### 5.2 Environment files

Each repo has its own `.env.example` with only the variables it needs. No cross-repo env sharing.

**Backend `.env.example`:**
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/eventapp
REDIS_URL=redis://localhost:6379
JWT_SECRET=change-me
JWT_REFRESH_SECRET=change-me
CLOUDFLARE_R2_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
APPLE_CLIENT_ID=
RESEND_API_KEY=
```

**Frontend `.env.example` (Next.js web apps):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_API_MOCKING=false          # set to "true" to enable MSW mock API
```

**Frontend `.env.example` (React Native mobile):**
```bash
API_URL=http://localhost:3000
API_MOCKING=false                      # set to "true" to enable MSW mock API
```

### 5.2.1 Mock environment (MSW)

Every frontend app (web-b2c, web-b2b, web-admin-internal, mobile-b2c) **must** include a mock environment powered by [MSW (Mock Service Worker)](https://mswjs.io/). This allows frontend development and testing to proceed independently of the backend.

**Requirements:**
- Each frontend repo contains an `src/mocks/` directory with MSW handlers that mirror the backend OpenAPI spec
- Mock mode is activated via environment variable (`NEXT_PUBLIC_API_MOCKING=true` for Next.js apps, `API_MOCKING=true` for mobile)
- Handlers return realistic seed data matching the API response envelope (`{ "data": ... }`)
- Mock handlers must cover all API endpoints used by the app — add new handlers as new features are built
- MSW runs as a service worker in web apps (`browser.ts`) and as a server interceptor in mobile/tests (`server.ts`)
- `.env.mock` file in each frontend repo pre-configures mock mode for quick startup:
  ```bash
  # .env.mock — start app with mock API (no backend needed)
  NEXT_PUBLIC_API_URL=http://localhost:3000   # ignored when mocking
  NEXT_PUBLIC_API_MOCKING=true
  ```
- `pnpm dev:mock` script alias in each frontend `package.json` loads `.env.mock` automatically

**Benefits:**
- Frontend developers can work without running the backend or Docker
- Consistent test data for Storybook, integration tests, and E2E tests
- Unblocks parallel frontend/backend development during early phases

### 5.3 Git branching strategy

Trunk-based development with short-lived feature branches:

```
main        ← production (auto-deploys to prod)
develop     ← staging (auto-deploys to staging)
feature/*   ← individual features (PR into develop)
hotfix/*    ← urgent fixes (PR into main, cherry-pick to develop)
```

- All PRs require at least 1 review (can be relaxed for solo devs).
- Squash merge to keep history clean.
- Delete branch after merge.

---

## 6. CI/CD Strategy Per Repo

### eventapp-backend

```yaml
# Triggered on: push to develop, push to main, PR
steps:
  - pnpm install
  - pnpm lint
  - pnpm test                  # Unit + integration tests
  - pnpm build
  - pnpm openapi:export        # Boot app, fetch /api/docs-json, save docs/openapi.json
  - Upload docs/openapi.json as artifact
  - Deploy to Railway (develop → staging, main → production)
```

### eventapp-web-b2c / eventapp-web-b2b / eventapp-web-admin-internal

```yaml
# Triggered on: push to develop, push to main, PR
steps:
  - pnpm install
  - pnpm lint
  - pnpm type-check            # tsc --noEmit
  - pnpm build
  - Deploy to Cloudflare Pages / Vercel (develop → preview, main → production)
```

### eventapp-mobile-b2c

```yaml
# Triggered on: push to develop, push to main, PR
steps:
  - pnpm install
  - pnpm lint
  - pnpm type-check            # tsc --noEmit
  # On main only:
  - fastlane ios build         # Xcode build (iOS)
  - fastlane android build     # Gradle build (Android)
  - fastlane ios release       # Submit to App Store
  - fastlane android release   # Submit to Google Play
```

---

## 7. Why No Shared Packages

| Concern | Decision | Rationale |
|---|---|---|
| Shared TypeScript types | Not needed | OpenAPI codegen produces typed clients per repo. The spec **is** the shared contract. |
| Shared UI components | Not needed | Mobile (React Native) vs Web (React DOM) — different primitives. Even the 3 web apps will diverge in UI as they serve different audiences. |
| Shared utilities | Not needed | Small helpers (date formatting, currency) are trivial to duplicate. Copy-paste of 10 lines is cheaper than maintaining a shared package + versioning + publishing. |
| Shared ESLint / Prettier config | Optional | Can publish an npm config package later if configs drift. For MVP, copy the config file. |
| Monorepo tooling (Turborepo, Nx) | Not needed | Adds learning curve, CI complexity, and merge conflicts for a 1-3 person team. |

### When to reconsider

- Team grows beyond 5 developers.
- A formal design system becomes a product requirement.
- More than 3 frontend repos need identical complex logic (not just types).
- API spec divergence causes frequent integration bugs.

At that point, consider extracting a `@eventapp/ui` design system package or moving to a monorepo with Turborepo.

---

## 8. Design System & UI Architecture

> Architectural decisions for the shared design language across all platforms. Implementation tasks are tracked in ROADMAP.md section 0.4.

### 8.1 Design Tokens

A single source of truth for design tokens — a JSON or TypeScript file that generates:

- **Tailwind theme config** (all three web apps)
- **NativeWind theme** (mobile app)
- **CSS custom properties** (if needed for non-Tailwind contexts)

Token categories:

| Token | Details |
|---|---|
| **Colors** | Primary, secondary, accent, semantic (success/warning/error/info), neutrals. Light mode at launch; dark mode infrastructure-ready (P1). |
| **Typography** | System fonts on mobile (SF Pro / Roboto); Inter or similar variable font on web (self-hosted via `next/font`). Scale: xs / sm / base / lg / xl / 2xl / 3xl / 4xl. |
| **Spacing** | 4px base unit: 4, 8, 12, 16, 24, 32, 48, 64. |
| **Border radii** | sm: 4px, md: 8px, lg: 12px, xl: 16px, full: 9999px. |
| **Shadows / elevation** | 3–4 levels for cards, modals, dropdowns. |
| **Icons** | Lucide for web; `react-native-vector-icons` with Lucide mapping for mobile. |
| **Map pin palette** | 12 distinct colors mapped to unified categories (colorblind-safe). |

### 8.2 Component Libraries

| Platform | UI Framework | Rationale |
|---|---|---|
| **Mobile B2C** | **NativeWind** | Tailwind familiarity across the entire stack (web + mobile). Utility-first styling with Tailwind CSS syntax compiled to React Native StyleSheet. Lower learning curve than Tamagui for a team already using Tailwind on web. |
| **Web B2C / B2B / Admin** | **shadcn/ui + Tailwind CSS** | Composable, customizable, no vendor lock-in. Shared Tailwind config across all three web apps. |

**Mobile core components:** Button, Text/Heading, Card (event/venue/mini), Input/TextArea/Select, Badge, Avatar, Bottom Sheet, Tab Bar, Empty State, Skeleton loaders, custom map pins, map mini-card, cluster indicator.

**Web core components (shadcn/ui):** Button, Input, Textarea, Select, Checkbox, Radio, Card, Badge, Avatar, Dialog/Modal, Sheet, Table, Tabs, Dropdown Menu, Toast, Form (react-hook-form + zod), Skeleton loaders. B2B adds dashboard layout, stat cards, and chart wrappers. Admin adds data tables with sorting/filtering/pagination, moderation cards, and KPI cards.

### 8.3 Token Sharing Strategy

```
design-tokens.ts (or .json)
        │
        ├──► tailwind.config.ts   (web-b2c, web-b2b, admin)
        ├──► nativewind theme      (mobile-b2c)
        └──► CSS custom properties (optional fallback)
```

Since the project uses multi-repo with no shared packages (see section 7), design tokens are shared by:

- **MVP:** Copy the token file across repos with a version pin. Update manually when tokens change.
- **Post-MVP (when team > 5):** Extract a published `@eventapp/design-tokens` npm package, or move to a monorepo with Turborepo.

Supporting tools (P1, post-launch):
- **Figma design file** mirroring token values for design handoff and visual QA.
- **Storybook** for web components (shared across B2C, B2B, Admin) for visual testing and documentation.

---

## 9. Infrastructure Overview

### DNS Routing

```
                    ┌──────────────────┐
                    │   Cloudflare     │
                    │   DNS + CDN      │
                    └────────┬─────────┘
                             │
          ┌──────────────────┼──────────────────────┐
          │                  │                       │
  ┌───────▼────────┐  ┌─────▼──────────┐  ┌────────▼───────────┐
  │ api.eventapp.dev│  │ eventapp.dev   │  │ dashboard.         │
  │                │  │                │  │ eventapp.dev       │
  │ → Railway      │  │ → Cloudflare   │  │ → Cloudflare       │
  │   (backend)    │  │   Pages/Vercel │  │   Pages/Vercel     │
  │                │  │   (web-b2c)    │  │   (web-b2b)        │
  └────────────────┘  └────────────────┘  └────────────────────┘
                                                    │
                                          ┌─────────▼──────────┐
                                          │ admin.eventapp.dev │
                                          │                    │
                                          │ → Cloudflare       │
                                          │   Pages/Vercel     │
                                          │   (admin-internal) │
                                          │   IP-restricted    │
                                          └────────────────────┘
```

| Domain | Service | Repo |
|---|---|---|
| `api.eventapp.dev` | Backend API | `eventapp-backend` |
| `eventapp.dev` | Public discovery pages | `eventapp-web-b2c` |
| `dashboard.eventapp.dev` | Organizer dashboard | `eventapp-web-b2b` |
| `admin.eventapp.dev` | Admin panel (IP-restricted) | `eventapp-web-admin-internal` |
| App Store / Google Play | Mobile app | `eventapp-mobile-b2c` |

### External services

| Service | Purpose |
|---|---|
| PostgreSQL + PostGIS (Railway) | Primary database with geospatial support |
| Redis (Railway) | Caching, rate limiting, Bull job queue, OTP storage |
| Cloudflare R2 + Cloudflare Images | Image storage, CDN, transformations |
| Twilio | SMS verification (venue claims) |
| FCM + APNs (`@react-native-firebase/messaging`) | Mobile push notifications |
| Resend | Transactional email (password reset, claim alerts, moderation, welcome emails, reports) |
| PostHog | Product analytics |
| Sentry | Error monitoring |
| MapLibre GL JS + Stadia Maps (web) / MapLibre Native (mobile) | Map rendering — see ADR #17 |

---

## 10. Security Boundaries

### Authentication per surface

| Surface | Auth Required | Auth Method |
|---|---|---|
| Web B2C (public pages) | No | Unauthenticated — read-only access |
| Mobile B2C (browsing) | No | Map and discovery work without login |
| Mobile B2C (actions) | Yes | JWT (email+password / Google OAuth / Apple Sign In) |
| Web B2B | Yes | JWT (organizer email+password) |
| Web Admin | Yes | JWT (admin email+password) |
| Backend API (public endpoints) | No | Rate-limited by IP |
| Backend API (protected endpoints) | Yes | JWT Bearer token (access + refresh rotation) |

### Role-based access control (RBAC)

| Role | Can access | Scope |
|---|---|---|
| `user` | Mobile B2C actions (follow, save, submit events, submit event tips) | Own data only |
| `organizer` | Web B2B dashboard | Own venue(s) only |
| `admin` | Web Admin panel + all API endpoints | Full system access |

### Security measures

- **Auth endpoints:** rate-limited to 10 attempts/minute/IP.
- **Push notifications:** max 1 push/day/venue, quiet hours 23:00-8:00.
- **Venue claims:** max 3 attempts/account/week, accounts < 24h old cannot claim.
- **Event submissions (B2C):** max 2/day/user.
- **Event tips (Community Scout):** max 5/day/user.
- **Admin panel:** IP-restricted at the infrastructure level (Cloudflare Access or firewall rules).
- **GDPR:** account deletion endpoint removes all user data; data export available on request.
- **CORS:** backend allows only known frontend origins (`eventapp.dev`, `dashboard.eventapp.dev`, `admin.eventapp.dev`).
- **Secrets:** no cross-repo env sharing; each repo holds only its own credentials.

---

## 11. Key Architectural Decisions Log

| # | Decision | Alternatives Considered | Rationale |
|---|---|---|---|
| 1 | **Multi-repo (5 repos)** over monorepo | Turborepo monorepo, Nx | 1-3 dev team; monorepo tooling overhead not justified. Independent deploy cycles. |
| 2 | **OpenAPI as single source of truth** over shared types package | Shared `@eventapp/types` npm package, tRPC | No publish/version/sync overhead. Each frontend generates exactly what it needs. |
| 3 | **No shared UI components** | `@eventapp/ui` component library | Mobile (React Native) vs Web (React DOM) — fundamentally different. Even web apps serve different audiences. |
| 4 | **NestJS** for backend | Express, Fastify, Hono | Built-in module system, DI, Swagger integration, guards, Bull queue support. Scales well for this domain. |
| 5 | **React Native (CLI)** for mobile | Flutter, native iOS/Android, Expo | JS/TS across the stack. React Navigation for routing. Fastlane for builds. Full native control without managed workflow constraints. |
| 6 | **Next.js App Router** for all web apps | Remix, Vite SPA, Astro | SSR for B2C SEO. Consistent DX across 3 web repos. App Router is the current standard. |
| 7 | **Railway** for backend hosting | Render, Fly.io, AWS ECS | Simple container deploys, managed PostgreSQL + Redis add-ons, good DX for small teams. |
| 8 | **Cloudflare Pages / Vercel** for web hosting | Netlify, AWS Amplify | Edge rendering, automatic preview deploys, zero-config for Next.js. |
| 9 | **orval** for API codegen (mobile, B2B, admin) | openapi-generator, swagger-codegen, hey-api | Generates TanStack Query hooks out of the box; clean Axios functions; active maintenance. |
| 10 | **openapi-typescript + openapi-fetch** for web-b2c | orval, openapi-generator | Zero runtime overhead, type-safe fetch, ideal for Next.js server components and SSR. |
| 11 | **No API versioning for MVP** | URL versioning (`/v1/`), header versioning | 1-3 devs control all consumers. Coordinate breaking changes directly. Revisit when external consumers appear. |
| 12 | **Trunk-based branching** | Gitflow, GitHub Flow | Simple, fast, suits a small team shipping frequently. |
| 13 | **Per-repo codegen** (duplicated clients) over shared SDK | Published `@eventapp/api-client` package | Each frontend needs different output (Axios fns vs fetch vs TanStack hooks). Shared SDK would be lowest-common-denominator. |
| 14 | **NativeWind** for mobile UI | Tamagui | Unified Tailwind mental model across web and mobile. Active community, good docs. Tamagui offers better raw performance but higher learning curve. |
| 15 | **shadcn/ui + Tailwind CSS** for web UI | Material UI, Chakra UI, Radix + custom | Composable primitives, full control over styling, no vendor lock-in. Copy-paste model avoids dependency version churn. |
| 16 | **Drizzle ORM** for database access | TypeORM, Prisma | TypeScript-first, SQL-like query builder with zero abstraction overhead. Lightweight, fast migrations, excellent PostgreSQL support. TypeORM has decorator-heavy API and maintenance concerns; Prisma adds a build step (generate) and uses a custom query engine. |
| 17 | **MapLibre + Stadia Maps** as the single map provider (mobile + web) | Google Maps, Mapbox | Open-source MapLibre GL JS (web) and MapLibre Native (mobile) with Stadia Maps as tile and data provider (https://client.stadiamaps.com). Poland has excellent OpenStreetMap coverage. Stadia Maps free tier covers 200k tile requests/month — eliminates Google Maps cost risk entirely. Full style customization, EU-hosted. Geocoding via Nominatim (free, self-hostable) replaces Google Geocoding API. Google Maps deep links remain for navigation CTAs (free). |
| 18 | **Zustand** for mobile state management | React Context, Jotai, Redux | Minimal boilerplate, tiny bundle size (~1KB), works seamlessly with React Native. No providers needed (unlike Context), no actions/reducers ceremony (unlike Redux). Jotai is comparable but Zustand has a larger ecosystem and better devtools. Used for: auth state, selected city, filter state, cached user preferences. Server state (API data) is handled by the API client layer, not Zustand. |

---

## 12. Observability & Monitoring Architecture

### 12.1 Error Monitoring (Sentry)

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ mobile-b2c       │  │ web-b2c / b2b /  │  │ eventapp-backend │
│ @sentry/react-   │  │ admin            │  │ @sentry/node     │
│ native           │  │ @sentry/nextjs   │  │                  │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                      │
         └─────────────────────┼──────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Sentry Cloud      │
                    │   (one org,         │
                    │    per-repo projects)│
                    └─────────────────────┘
```

| Component | Sentry SDK | Project |
|---|---|---|
| Backend | `@sentry/node` + `@sentry/nestjs` | `eventapp-backend` |
| Mobile B2C | `@sentry/react-native` | `eventapp-mobile` |
| Web B2C | `@sentry/nextjs` | `eventapp-web-b2c` |
| Web B2B | `@sentry/nextjs` | `eventapp-web-b2b` |
| Web Admin | `@sentry/nextjs` | `eventapp-web-admin` |

All projects share a single Sentry organization. `correlationId` (generated by the backend per request) is attached to both backend and frontend error reports for cross-layer tracing.

### 12.2 Product Analytics (PostHog)

- **Single PostHog project** shared across all platforms (events prefixed by platform where ambiguous).
- **Consent-gated:** PostHog SDKs are initialized only after the user grants analytics consent (GDPR). Backend respects the `analytics_consent` field on the `users` table.
- Mobile: `posthog-react-native`. Web apps: `posthog-js`. Backend: server-side PostHog SDK for backend-triggered events (push delivery, importer metrics).

### 12.3 Logging & Tracing

- **Backend:** `nestjs-pino` — structured JSON logs with correlation IDs (see ROADMAP-backend.md section 0.2.5).
- **Log drain:** Railway stdout → external aggregation (Better Stack / Axiom, evaluated post-launch).
- **Frontend:** no structured logging beyond Sentry error capture. Console logs stripped in production builds.

### 12.4 Uptime & Health Checks

| Surface | Health Check | Monitored By |
|---|---|---|
| Backend API | `GET /health` → `200 OK` | Railway health check + external uptime monitor (e.g., BetterStack) |
| Web B2C / B2B / Admin | Cloudflare Pages / Vercel built-in | Platform health checks |
| Database (PostgreSQL) | Railway managed | Railway dashboard alerts |
| Redis | Railway managed | Railway dashboard alerts |

---

## 13. Caching Strategy

### 13.1 Redis Usage Patterns

| Use Case | Key Pattern | TTL | Details |
|---|---|---|---|
| Geospatial query cache | `geo:{lat}:{lng}:{radius}:{filters_hash}` | 5 min | Cache `GET /events` responses for identical queries |
| Search query cache | `search:{normalized_query}:{filters_hash}` | 2-3 min | Cache `GET /events/search` results |
| Rate limiting | `throttle:{ip}:{endpoint}` | Variable | `@nestjs/throttler` with Redis storage |
| OTP codes (claim verification) | `otp:{userId}:{venueId}` | 10 min | SMS/email verification codes |
| Bull job queues | `bull:{queue_name}:*` | N/A | Push notifications, email sending, importer jobs |
| Session tracking | `refresh_token_family:{userId}` | 7 days | Token family tracking for replay detection |

### 13.2 Cache Invalidation

- **Event/venue mutations** (create, update, delete) invalidate related geo and search caches using pattern-based key deletion.
- **Cache-aside pattern:** read from cache first, fallback to DB, populate cache on miss.
- **No cache warming** at MVP — cold starts are acceptable given the 5-minute TTL.

---

## 14. Authentication Flow

### 14.1 JWT Token Lifecycle

```
┌──────────┐     POST /auth/login        ┌──────────────┐
│  Client  │ ──── email + password ─────►│   Backend    │
│          │                              │              │
│          │◄── access_token (15m/1h) ── │  Verify pwd  │
│          │    refresh_token (7d)        │  Issue JWTs  │
└────┬─────┘                              └──────────────┘
     │
     │  (access token expired)
     │
     │      POST /auth/refresh           ┌──────────────┐
     │ ──── refresh_token ──────────────►│  Validate    │
     │                                    │  Rotate      │
     │◄── new access_token ──────────── │  Revoke old  │
     │    new refresh_token              └──────────────┘
```

- **Access token TTL:** 1 hour (regular users), 15 minutes (admin users).
- **Refresh token TTL:** 7 days (regular), 8 hours absolute / 30 min idle (admin).
- **Token rotation:** every refresh issues a new pair and revokes the old refresh token.
- **Replay detection:** reuse of a revoked refresh token invalidates all tokens for that user.

### 14.2 OAuth Flow (Google / Apple)

```
Client → OAuth Provider (Google/Apple) → Authorization code
Client → POST /auth/oauth/google (or /apple) with code
Backend → Exchange code for provider token → Verify → Create/link user → Issue JWTs
```

---

## 15. Environment Strategy

| Aspect | Development | Staging | Production |
|---|---|---|---|
| Backend | `localhost:3000` | Railway staging | Railway production |
| Database | Docker Compose (local PostgreSQL + PostGIS) | Railway managed PostgreSQL | Railway managed PostgreSQL |
| Redis | Docker Compose (local Redis) | Railway managed Redis | Railway managed Redis |
| Web apps | `localhost:3001-3003` | Cloudflare Pages / Vercel preview | Cloudflare Pages / Vercel production |
| Mobile | iOS Simulator / Android Emulator | Fastlane (internal distribution) | App Store / Google Play |
| API keys | Test/sandbox keys | Separate staging keys | Separate production keys |
| Data | Seed data (`pnpm db:seed`) | Seed + test pipeline data | Aggregation pipeline only |
| Logs | `debug` level, pretty-printed | `info` level, JSON | `info` level, JSON |
| Sentry | Disabled or separate DSN | Staging DSN | Production DSN |
| Email (Resend) | Sandbox mode / test domain | Staging domain | `mail.eventapp.dev` |

| **Mock (frontends only)** | MSW intercepts all API calls — no backend needed | N/A | N/A |

> **Mock environment:** Every frontend app supports a dedicated mock mode via MSW (see §5.2.1). Activate with `pnpm dev:mock` or by setting `API_MOCKING=true` / `NEXT_PUBLIC_API_MOCKING=true`. This is the recommended mode for UI development, Storybook, and frontend tests.

Each environment has fully isolated credentials. No cross-environment data sharing.

---

## 16. Database Schema Overview

> Full schema details are in [ROADMAP-backend.md, section 0.2](./ROADMAP-backend.md#02-database-infrastructure). This is a summary for architectural reference.

### Core Tables

```
┌───────────────┐       ┌───────────────┐       ┌───────────────┐
│    venues     │──1:N──│    events      │       │    users      │
│               │       │               │       │               │
│ + PostGIS geo │       │ + PostGIS geo │       │ role: user /  │
│ + category    │       │ + category    │       │   organizer / │
│ + venue_type  │       │ + is_native   │       │   admin       │
└───────┬───────┘       └───────┬───────┘       └───────┬───────┘
        │                       │                       │
   ┌────┴────┐             ┌────┴────┐             ┌────┴────┐
   │ venue_  │             │ event_  │             │ follows │
   │ photos  │             │ photos  │             │ saved_  │
   │ opening_│             │         │             │ events  │
   │ hours   │             │         │             │ tos_    │
   │ hours_  │             │         │             │ accept. │
   │ overrides│            │         │             │         │
   └─────────┘             └─────────┘             └─────────┘
```

### Supporting Tables

| Table Group | Tables |
|---|---|
| Auth & Sessions | `refresh_tokens`, `admin_totp_secrets`, `admin_recovery_codes`, `admin_login_attempts` |
| Claims | `claim_requests`, `venue_source_mappings` |
| Notifications | `notifications_log`, `notification_preferences`, `venue_mutes` |
| Moderation | `event_reports` |
| Community Scout | `event_tips` |
| Recurring Events | `recurring_event_templates` |
| Analytics & Compliance | `tos_acceptances`, `import_runs` |

---

## 17. Testing Strategy

### 17.1 Testing Pyramid

| Layer | Tool | Scope | Target |
|---|---|---|---|
| **Unit** | Jest (backend), Vitest (frontends) | Individual functions, services, utilities | Backend: 80% coverage on services/modules |
| **Integration** | supertest + test database | API endpoints with real DB | Key flows: auth, events CRUD, geo queries, claims |
| **E2E** | Playwright (web apps), Detox or Maestro (mobile) | Full user flows across UI and API | Critical paths per platform (see Phase 4 in each ROADMAP) |

### 17.2 Test Database Strategy

- **CI:** GitHub Actions service containers with PostgreSQL 16 + PostGIS 3.4 (see ROADMAP-backend 0.5.2)
- **Local:** Docker Compose (same image as development — see section 5.1)
- **Test isolation:** each test suite runs in a transaction that rolls back, or uses a dedicated test schema

### 17.3 Contract Testing

- The **OpenAPI spec** (`docs/openapi.json`) serves as the API contract between backend and all frontends
- **CI validation:** backend CI exports the spec on every push (section 3.2); frontends regenerate typed clients and catch mismatches via TypeScript strict mode
- No dedicated contract testing tool (e.g., Pact) needed at MVP scale — the spec + codegen + strict types provide equivalent safety

### 17.4 Coverage Targets

| Repo | Unit Coverage | E2E Scope |
|---|---|---|
| `eventapp-backend` | 80% on services and modules | Auth flow, geo queries, claim flow, GDPR deletion |
| `eventapp-mobile-b2c` | Key hooks and utils | Discovery → follow → push → navigation |
| `eventapp-web-b2c` | — | SSR rendering, OG tags, sitemap validation |
| `eventapp-web-b2b` | — | Claim → event CRUD → push → analytics |
| `eventapp-web-admin-internal` | — | Login → moderation → audit log |

> Implementation tasks are tracked in Phase 4 (section 4.1) of each platform ROADMAP.

---

## 18. Rate Limiting Architecture

> Implementation details: [ROADMAP-backend.md, section 0.2.3](./ROADMAP-backend.md#023-general-api-rate-limiting)

### 18.1 Tiered Strategy

| Tier | Limit | Purpose |
|---|---|---|
| **Short** | 20 req/sec/IP | Burst protection |
| **Medium** | 100 req/min/IP | Sustained abuse prevention |
| **Long** | 1,000 req/hr/IP | Scraping prevention |

### 18.2 Per-Endpoint Overrides

Expensive queries receive tighter limits:
- `GET /events/search` (pg_trgm): 5/sec, 30/min
- `POST` write endpoints: tighter per-endpoint limits
- `GET /health` and `GET /ready`: exempt (`@SkipThrottle()`)

### 18.3 Authenticated vs Anonymous

Logged-in users receive higher rate limits (override `getTracker()` to use `userId` instead of IP). Anonymous requests are limited by IP only.

### 18.4 Infrastructure Layer

Cloudflare WAF rate limiting rules on `api.eventapp.dev` serve as a first-layer defense before requests reach Railway. This absorbs volumetric attacks without consuming application resources.

---

## 19. Search Architecture

> Implementation details: [ROADMAP-backend.md, section 1.2.1](./ROADMAP-backend.md#121-search-architecture)

### 19.1 PostgreSQL-Based Search

Search uses two complementary PostgreSQL extensions:
- **`pg_trgm`** — trigram-based fuzzy matching (handles typos, partial matches)
- **Full-text search** (`to_tsvector` / `ts_rank_cd`) — relevance ranking for exact and stemmed word matches

Both are indexed with GIN indexes for performance. The `unaccent` extension ensures diacritics-insensitive search (e.g., "krakow" matches "Krakow").

### 19.2 Hybrid Ranking Strategy

```
score = (ts_rank_cd * 0.6) + (similarity * 0.3) + (time_boost * 0.05) + (popularity_boost * 0.05)
```

- **Time decay:** upcoming events rank higher than far-future events
- **Popularity:** venues with higher `follower_count` get a minor boost
- **Native content:** `is_native = true` events rank slightly above aggregated events

### 19.3 Caching

Search results are cached in Redis (TTL: 2-3 minutes, key: normalized query + filters hash). Invalidated on event/venue mutations.

### 19.4 Scalability Path

If PostgreSQL search latency exceeds 200ms p95 at scale (>10K events), evaluate Meilisearch or Typesense as a dedicated search engine. Not needed for MVP.

---

## 20. File Upload & Image Pipeline

> Implementation details: [ROADMAP-backend.md, section 2.8](./ROADMAP-backend.md#28-image-processing-pipeline)

### 20.1 Upload Flow

```
Client → presigned URL request → Backend generates Cloudflare R2 presigned URL
Client → direct upload to R2 → R2 stores original
Backend (Bull job) → process image → generate variants → store in R2
```

### 20.2 Processing Pipeline

| Step | Details |
|---|---|
| **Validation** | JPEG/PNG/WebP only, max 10 MB, min resolution 400x300 |
| **Compression** | Auto-compress to WebP via Cloudflare Images or Worker |
| **Variants** | Small: 200x200 (map cards), Medium: 600px wide (list cards), Large: 1200px wide (detail pages) |

### 20.3 Limits

| Resource | Limit |
|---|---|
| File size | 10 MB per file |
| Venue photos | 5 per venue |
| Event photos | 3 per event |
| Organizer storage (P1) | 500 MB across all venues |

### 20.4 Content Moderation (P1)

- NSFW detection via Cloudflare Images AI or third-party service
- Flagged images held for admin review instead of publishing
- Admin UI for reviewing flagged images (Admin Panel, Phase 3)

---

## 21. Queue & Worker Architecture

### 21.1 Infrastructure

**Bull** (backed by Redis) handles all background jobs. Each queue has a dedicated purpose and can be scaled independently.

### 21.2 Queue Taxonomy

| Queue | Purpose | Schedule |
|---|---|---|
| `push-notifications` | FCM/APNs push dispatch to followers | Event-driven (on event publish) |
| `email-sending` | Transactional emails via Resend | Event-driven (on trigger) |
| `image-processing` | Compress, resize, generate variants | Event-driven (on upload) |
| `recurring-event-expansion` | Generate future instances from templates | Daily cron (see ROADMAP-backend 2.4) |
| `data-cleanup` | Purge expired tokens, soft-deleted events, old logs | Daily cron (see ROADMAP-backend 4.2) |
| `importer-pipeline` | Aggregation pipeline per source | Every 6 hours (see ROADMAP-backend 0.3) |

### 21.3 Job Retry Strategy

- **Default:** 3 retries with exponential backoff (1s, 4s, 16s)
- **Push notifications:** 3 retries (idempotency keys prevent duplicate sends)
- **Email sending:** 3 retries (Resend handles deduplication)
- **Image processing:** 3 retries (re-process from original)

### 21.4 Monitoring

- All job execution is logged via Pino (structured JSON with `correlationId`)
- Failed jobs after exhausting retries alert via Sentry
- Job metrics (queue depth, processing time, failure rate) logged at `info` level

---

## 22. Error Handling Architecture

> Implementation details: [ROADMAP-backend.md, section 0.2.6](./ROADMAP-backend.md#026-unified-error-handling)

### 22.1 Standardized Error Response

Every API error follows a predictable shape:

```json
{
  "statusCode": 422,
  "error": "VALIDATION_ERROR",
  "message": "Human-readable summary",
  "correlationId": "uuid",
  "details": [
    { "field": "email", "message": "must be a valid email address" }
  ]
}
```

### 22.2 Success Response Envelope

All successful API responses follow a predictable shape:

**Single resource (detail endpoints):**

```json
{
  "data": { "id": "uuid", "name": "...", ... }
}
```

**List / paginated endpoints (cursor-based):**

```json
{
  "data": [ { ... }, { ... } ],
  "meta": {
    "nextCursor": "opaque-string-or-null",
    "hasMore": true,
    "total": 142
  }
}
```

- `nextCursor` — opaque string to pass as `?cursor=` for the next page; `null` when no more results.
- `hasMore` — boolean convenience field (equivalent to `nextCursor !== null`).
- `total` — optional; included when the count is cheap to compute (e.g., `GET /users/me/follows`); omitted on expensive geospatial queries.

**Write endpoints (create / update / delete):**

- `201 Created` with `{ "data": { ...created resource } }` for `POST` creates.
- `200 OK` with `{ "data": { ...updated resource } }` for `PATCH` / `PUT`.
- `204 No Content` with empty body for `DELETE`.

### 22.3 Error Code Enum

| Code | HTTP Status | Meaning |
|---|---|---|
| `VALIDATION_ERROR` | 422 | Request body/query failed validation |
| `NOT_FOUND` | 404 | Resource does not exist |
| `UNAUTHORIZED` | 401 | Missing or invalid auth token |
| `FORBIDDEN` | 403 | Valid token but insufficient permissions |
| `CONFLICT` | 409 | Duplicate resource (e.g., already following) |
| `RATE_LIMITED` | 429 | Throttler limit exceeded |
| `TOS_ACCEPTANCE_REQUIRED` | 403 | User has not accepted current ToS version |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

### 22.4 Global Exception Filter

A NestJS `AllExceptionsFilter` (`@Catch()`) catches all unhandled exceptions:
- Maps `HttpException` subclasses to their status and message
- Converts `class-validator` errors to `422 VALIDATION_ERROR` with `details` array
- Converts `ThrottlerException` to `429 RATE_LIMITED`
- Converts database errors to `500 INTERNAL_ERROR` (never leaks SQL details)
- Attaches `correlationId` from the request context to every error response

---

## 23. Internationalization (i18n)

### 23.1 Language Strategy

**Polish (PL) is the primary language. English (EN) is the secondary language. Both available at launch.**

### 23.2 Per-Platform Implementation

| Platform | Library | Locale Detection | URL Strategy |
|---|---|---|---|
| **Backend** | N/A (labels served from DB/config) | `Accept-Language` header + `users.preferred_locale` | N/A |
| **Mobile B2C** | `react-i18next` + `react-native-localize` | Device locale detection | N/A |
| **Web B2C** | `next-intl` | URL-based locale prefix | `/en/poznan/music` vs `/poznan/music` |
| **Web B2B** | `next-intl` | User preference | PL/EN toggle |
| **Web Admin** | Hardcoded English | N/A (internal tool) | N/A |

### 23.3 Backend i18n Responsibilities

- Category and venue type labels served in both PL and EN
- Email templates (React Email via Resend) localized in PL and EN
- Push notification content localized based on `users.preferred_locale`
- `Accept-Language` header respected for API responses containing localized labels

### 23.4 SEO (Web B2C)

- `hreflang` tags on all public pages for EN/PL alternates
- Canonical URL points to the default locale (PL)
- Separate sitemap entries per locale

> Implementation tasks: section 1.9 in each platform ROADMAP.

---

## 24. GDPR & Data Privacy

### 24.1 Consent Management

| Consent Type | Mechanism | Storage |
|---|---|---|
| **ToS acceptance** | Checkbox on registration, re-consent guard on version change | `tos_acceptances` table (append-only audit trail) |
| **Analytics consent** | Opt-in/opt-out toggle in user profile | `users.analytics_consent` field |
| **Cookie consent (web)** | Banner on Web B2C and Web B2B (Accept/Reject/Manage) | localStorage or cookie |

### 24.2 Data Subject Rights

| Right | Implementation |
|---|---|
| **Right to erasure** | Account deletion endpoint removes all user data; ToS consent records retained (anonymized) for legal compliance |
| **Right to data portability** | `GET /users/me/data-export` — returns all user data (profile, follows, saved events, consent records) |
| **Right to withdraw consent** | `PATCH /users/me/consent` — updates analytics consent; PostHog tracking stops immediately |

### 24.3 Cookie Consent

- **Web B2C and Web B2B:** cookie consent banner fires before any non-essential tracking
- **Web Admin:** no cookie consent needed (internal tool, essential cookies only)
- **Mobile:** analytics opt-in/opt-out toggle in user profile settings
- **PostHog:** gated behind consent on all platforms — not initialized until user grants analytics consent

### 24.4 PII Handling

- **Log redaction:** emails masked (`a***@example.com`), passwords/tokens/OTP codes never logged
- **Pino redact paths:** `['req.headers.authorization', 'req.body.password', 'req.body.token']`
- **Request/response bodies:** not logged in production (privacy + volume)

### 24.5 Data Retention

| Data | Retention | Cleanup |
|---|---|---|
| Soft-deleted events | 30 days | Daily cleanup job (ROADMAP-backend 4.2) |
| Notification logs | 90 days | Daily cleanup job |
| Expired refresh tokens | 7 days after expiry | Daily cleanup job |
| Rejected claim requests | 90 days | Daily cleanup job |
| Admin login attempts | 30 days | Daily cleanup job |
| ToS consent records | Indefinite (legal requirement) | Anonymized on account deletion |

### 24.6 Third-Party Data Processors

Ensure Data Processing Agreements (DPAs) are in place before launch with all third-party services that process user data:

| Service | Data Processed | DPA Required |
|---|---|---|
| **Sentry** | Error reports (may contain user context) | Yes |
| **PostHog** | Analytics events, user identifiers | Yes |
| **Resend** | Email addresses, email content | Yes |
| **Twilio** | Phone numbers (SMS verification) | Yes |
| **Cloudflare** | Request logs, uploaded images | Yes (included in Enterprise ToS) |

> Implementation details: ROADMAP-backend sections 1.10, 1.11, 4.2.

---

## 25. Real-Time Data Strategy

### 25.1 MVP Approach: HTTP Polling

No WebSocket or Server-Sent Events (SSE) connections in MVP. All "live" dashboards use HTTP polling:

| Surface | Endpoint | Polling Interval | Rationale |
|---|---|---|---|
| Admin KPI dashboard | `GET /admin/kpis/overview` | 60 seconds | Low-frequency metrics; polling is simple and sufficient for 1-3 admin users |
| Admin moderation queue | `GET /admin/moderation/events` | 30 seconds | New events arrive infrequently; polling avoids WebSocket infrastructure |
| Admin importer monitor | `GET /admin/importers/status` | 60 seconds | Pipeline runs every 6 hours; near-real-time is not needed |
| B2B analytics dashboard | `GET /analytics/*` | Manual refresh (no auto-poll) | Organizers check analytics occasionally, not continuously |

All polling uses standard `GET` requests with the same auth and rate limiting as other endpoints. Frontend implementations use `setInterval` or TanStack Query's `refetchInterval`.

### 25.2 When to Introduce WebSockets

Evaluate WebSocket or SSE if any of these conditions are met post-launch:

- **Admin panel has 5+ concurrent users** and polling creates measurable backend load.
- **Real-time moderation** becomes a requirement (e.g., live content stream from multiple sources).
- **Live event feeds** are requested (e.g., real-time attendee count, live chat during events).
- **Collaborative editing** on venue/event management (multiple organizers editing simultaneously).

Preferred approach when needed: **Server-Sent Events (SSE)** over WebSocket — simpler, HTTP-native, works through proxies/CDNs, and NestJS has built-in SSE support via `@Sse()` decorator. WebSocket (via `@nestjs/websockets` + Socket.io) only if bidirectional communication is required.

---

## 26. Backup & Disaster Recovery

### 26.1 Database Backups (PostgreSQL)

| Aspect | Strategy |
|---|---|
| **Provider** | Railway managed PostgreSQL (automatic daily backups) |
| **Frequency** | Daily automated snapshots (Railway default) |
| **Retention** | 7 days (Railway default); extend to 30 days on production if plan allows |
| **Point-in-time recovery** | Available on Railway Pro plans (WAL-based, up to 7 days) |
| **Manual backup** | `pg_dump` via Railway CLI before risky migrations or schema changes |
| **Restore testing** | Test restore from backup to a scratch Railway instance at least once before launch and quarterly after |

### 26.2 Redis

Redis is used for ephemeral data (cache, rate limits, OTP codes, Bull job queues). No backup needed — data is reconstructible. Bull jobs in-flight at crash time are retried automatically (see section 21.3). Set `appendonly yes` on production Redis for persistence across restarts.

### 26.3 File Storage (Cloudflare R2)

Cloudflare R2 provides 99.999999999% (11 nines) durability. No additional backup strategy needed. Deleted images are not recoverable — soft-delete in the database before removing from R2 (cleanup job handles actual R2 deletion after retention period).

### 26.4 Deployment Rollback

| Platform | Rollback Method |
|---|---|
| **Backend (Railway)** | Redeploy previous successful build from Railway dashboard or `railway up --rollback` |
| **Web apps (Cloudflare Pages / Vercel)** | Instant rollback to previous deployment via platform dashboard |
| **Mobile (React Native)** | Publish previous JS bundle via CodePush rollback (OTA); native rollback requires new App Store / Play Store build |

### 26.5 Incident Response

1. **Detect** — Sentry alert or uptime monitor fires.
2. **Assess** — check `/health` and `/ready` endpoints, Railway logs, Sentry error details.
3. **Mitigate** — rollback deployment if caused by a release; scale up if resource-related; disable importer if pipeline is the source.
4. **Communicate** — update status page (if set up) or notify affected organizers via email.
5. **Post-mortem** — document root cause, timeline, and prevention measures within 48 hours.

---

*Living document — update when architectural decisions change. Last updated: April 2026.*
