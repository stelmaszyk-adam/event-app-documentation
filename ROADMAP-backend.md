# Wydarzka — Backend Roadmap

> **Platform:** NestJS API server, database, infrastructure, aggregation pipeline
> **Repo:** `wydarzka-backend`
> **Central roadmap:** [ROADMAP.md](./ROADMAP.md)

---

## Phase 0 — Preparation (Week 1-2)

### 0.2 Database infrastructure

> **No migration strategy during MVP development.** While building Phases 0-4, the database schema will change frequently. Instead of maintaining migration files, use Drizzle `db push` and drop + recreate the database on schema changes. Seed data is regenerated via `pnpm db:seed`. There is no production data to protect until launch. A formal migration strategy is introduced in Phase 4 (see section 4.0).

- [x] P0 Design database schema:
  - `venues` (id, name, address, lat, lng, category [unified_category enum], venue_type [venue_type enum], description, photo_url, claimed_by, follower_count, source, is_claimed, trust_level, created_at)
  - `venue_photos` (id, venue_id, url, position [sort order], uploaded_by_user_id, created_at) — multiple photos per venue (3-5 typical)
  - `venue_opening_hours` (id, venue_id, day_of_week [0-6], open_time, close_time, is_flexible_close [boolean, for "open until late"]) — regular weekly schedule
  - `venue_hours_overrides` (id, venue_id, date, open_time, close_time, is_closed [boolean], is_flexible_close [boolean], reason [e.g., "Christmas Eve", "Renovation"]) — holiday hours, temporary closures, special hours; overrides regular schedule for specific dates
  - `events` (id, venue_id, name, start_time, end_time, category [unified_category enum], description, photo_url, price, ticket_url, source, is_native, is_approved, created_by_user_id, submitted_by_user_id [nullable, FK → users — set when event originates from a Community Scout tip], created_at)
  - `event_photos` (id, event_id, url, position [sort order], uploaded_by_user_id, created_at) — multiple photos per event
  - `users` (id, email, password_hash, google_id [nullable], apple_id [nullable], role[user|organizer|admin], preferred_locale [pl|en, default pl], analytics_consent [boolean, default false], push_token [nullable, FCM/APNs push token], created_at, reputation_score)
  - `follows` (user_id, venue_id, created_at)
  - `saved_events` (user_id, event_id, created_at)
  - `event_reports` (event_id, user_id, reason, created_at)
  - `claim_requests` (venue_id, user_id, method, status, document_url, created_at)
  - `notifications_log` (venue_id, event_id, sent_at, open_count)

  > **Additional tables introduced in later sections** (not listed here to avoid duplication — see referenced sections):
  > - `refresh_tokens` (section 1.1.1), `admin_totp_secrets`, `admin_recovery_codes`, `admin_login_attempts` (section 1.1.0)
  > - `notification_preferences`, `venue_mutes` (section 1.5)
  > - `tos_acceptances` (section 1.10)
  > - `event_tips` (section 1.7.1 — Community Scout)
  > - `recurring_event_templates` (section 2.4)
  > - `venue_source_mappings` (section 0.3)
  > - `import_runs` (section 0.2.1 seed data)

- [x] P0 Configure PostgreSQL with PostGIS extension (geospatial queries)
- [x] P0 Add geospatial index on lat/lng columns in `venues` and `events` tables
- [x] P0 Configure environments: development / staging / production
  - **Development (local):**
    - Docker Compose with PostgreSQL 16 + PostGIS 3.4 and Redis 7
    - Extensions enabled automatically on container start: `postgis`, `pg_trgm`, `pgcrypto`, `unaccent`
    - pgAdmin available optionally (`tools` profile)
    - `.env.example` file as template — copy to `.env.local` (never commit)
    - Environment variable validation via `zod` on application startup
  - **Staging:**
    - Railway staging project (separate instance, separate API keys)
    - Auto-deploy from `develop` branch (Vercel preview / Railway staging)
    - Data: copy of latest seed + data from test pipeline
  - **Production:**
    - Railway production project (separate credentials, separate API keys)
    - Deploy only from `main` after CI green + code review
    - Data exclusively from aggregation pipeline (no test data)
    - Separate keys for Cloudflare R2, Resend, Twilio, PostHog, Sentry

### 0.2.1 Seed data (test data for development)

> Realistic data for working on UI, API, and tests without needing to run the aggregation pipeline.

- [x] P0 Prepare database seeding script (`src/database/seeds/`) using `@faker-js/faker` (locale `pl`)
- [x] P0 **Seed: venues** — 200 venues in 7 cities (Poznan, Warsaw, Krakow, Wroclaw, Lodz, Gdansk, Szczecin):
  - Real GPS coordinates in each city center (+/- random offset up to 2 km)
  - Categories (unified): `music`, `nightlife`, `performing_arts`, `arts_culture`, `sport_fitness`, `food_drink`, `education`, `business`, `family`, `festival`, `wellness`, `other`
  - Venue types: `bar`, `club`, `theater`, `gallery`, `concert_hall`, `cinema`, `museum`, `stadium`, `sports_center`, `restaurant`, `cafe`, `cultural_center`, `community_center`, `coworking`, `outdoor_space`, `hotel`, `conference_venue`, `other`
  - Mix: 60% unclaimed, 30% claimed, 10% with pending claim request
  - Each venue with `follower_count` 0-500 (Pareto distribution — a few popular, most niche)
  - Each venue with 1-5 photos in `venue_photos` (placeholder images, varied positions)
- [x] P0 **Seed: events** — 1,000 events linked to venues:
  - Time distribution: 20% past (soft-deleted), 60% upcoming (1-30 days), 20% further out (1-3 months)
  - Categories (unified): `music`, `nightlife`, `performing_arts`, `arts_culture`, `sport_fitness`, `food_drink`, `education`, `business`, `family`, `festival`, `wellness`, `other`
  - Source mix: 40% `eventbrite`, 30% `google_places`, 15% `rss_feed`, 10% `manual`, 5% `user_submit`
  - 10% of events with `is_approved: false` (for moderation testing)
  - Prices: 50% free, 30% 20-80 PLN, 20% 80-300 PLN
  - Each event with 1-3 photos in `event_photos` (placeholder images, varied positions)
- [x] P0 **Seed: users** — 50 users:
  - Roles: 40 x `user`, 8 x `organizer`, 2 x `admin`
  - Organizers linked to claimed venues
  - Admins with dedicated email addresses (`admin@wydarzka.dev`)
  - Varied `reputation_score`: 0-100
- [x] P0 **Seed: relationships** — follows, saved_events, claim_requests:
  - Each user follows 3-15 random venues
  - Each user has 2-10 saved events
  - 10 claim_requests in various statuses: `pending`, `approved`, `rejected`
  - 5 event_reports with different `reason` (`outdated`, `spam`, `wrong_location`, `duplicate`)
- [x] P0 Seeding command: `pnpm db:seed` (idempotent — clears data and inserts from scratch)
- [x] P0 Reset command: `pnpm db:reset` (drop + migrate + seed in one step)
- [x] P1 Seed for pipeline data: `import_runs` table with 20 sample entries (for importer monitoring tests)
- [x] P0 **Seed: event_tips** — 30 event tips for Community Scout testing:
  - Mix of statuses: 15 x `pending`, 8 x `approved`, 5 x `rejected`, 2 x `converted` (linked to created event)
  - Linked to random `user` role accounts
  - Types: 50% with `link_url`, 30% with `image_url` (poster photo), 20% with only `description`
  - Categories: varied across unified categories

### 0.2.2 Email service

> Transactional email is used across multiple phases: auth (password reset), claims (dispute alerts, claim notifications), moderation (approve/reject notifications), onboarding (welcome email), and analytics (weekly reports).

- [x] P0 **Provider: Resend** — simple API, React Email templates, generous free tier (3,000 emails/month), scales to paid plans when needed
- [x] P0 Configure Resend account + API key per environment (dev / staging / production)
- [ ] P0 Set up sending domain: `mail.wydarzka.dev` (DNS: SPF, DKIM, DMARC records via Cloudflare)
- [x] P0 Create `EmailModule` in NestJS backend (wraps Resend SDK, injectable service)
- [x] P0 Build base email templates with React Email (`@react-email/components`):
  - Password reset (token link, 1h expiry)
  - Email verification (registration confirmation)
  - Welcome email (after venue claim, with onboarding checklist link)
  - Claim alert ("Your venue was just claimed by [email]" — 72h dispute window)
  - Moderation decision (event approved / rejected with reason)
- [x] P0 Template rendering: React Email -> HTML, with plain-text fallback
- [ ] P1 Email sending via Bull queue (background job, retry on failure, max 3 retries)
- [ ] P1 Additional templates:
  - Weekly organizer report (event views, follower growth, CTA clicks)
  - KPI alert for admins (threshold breach notification)
  - Venue outreach email (pre-launch, with follower count + claim link)

### 0.2.2.1 Database Connection Pooling

- [x] P0 **Configure Drizzle connection pool** — set pool size appropriate for Railway container limits:
  - Development: `max: 5` connections (local Docker PostgreSQL)
  - Staging: `max: 10`
  - Production: `max: 20` (tune based on Railway plan limits and concurrent request volume)
  - Configurable via `DATABASE_POOL_MAX` environment variable
- [x] P0 **Connection timeout:** set `connectionTimeoutMillis: 5000` (fail fast if pool exhausted)
- [x] P0 **Idle timeout:** set `idleTimeoutMillis: 30000` (release idle connections)
- [ ] P1 **Pool monitoring:** log pool stats (active/idle/waiting connections) at `debug` level on each request cycle; log at `warn` if waiting queue exceeds 5

### 0.2.2.2 Email Bounce Handling

- [ ] P1 **Resend webhook for bounce/complaint events:**
  - Configure webhook endpoint: `POST /webhooks/resend`
  - Verify webhook signature (Resend signing secret)
- [ ] P1 **Hard bounce handling:**
  - On hard bounce event: mark email as undeliverable in `users` table (`email_status: 'bounced'`)
  - Suppress all future email sends to bounced addresses
- [ ] P1 **Complaint handling:**
  - On complaint event: log complaint and suppress future marketing-style emails (keep transactional emails like password reset)

### 0.2.3 General API rate limiting

> Auth endpoints are rate-limited to 10/min and push to 1/day, but public endpoints need protection against abuse or scraping.

- [x] P0 Install `@nestjs/throttler` with Redis storage (custom ioredis implementation) — shared state across instances
- [x] P0 Configure global `ThrottlerGuard` with tiered limits:
  - **Short:** 20 requests/second/IP (burst protection)
  - **Medium:** 100 requests/minute/IP (sustained abuse)
  - **Long:** 1,000 requests/hour/IP (scraping prevention)
- [x] P0 Override limits on expensive endpoints:
  - `GET /events/search` — 5/sec, 30/min (pg_trgm queries are expensive)
  - `POST` write endpoints — tighter per-endpoint limits
- [x] P0 Skip rate limiting on `GET /health` and `GET /ready` endpoints (`@SkipThrottle()`)
- [ ] P1 Differentiate authenticated vs anonymous limits — logged-in users get higher limits (override `getTracker()` to use `userId`)
- [ ] P1 Add Cloudflare WAF rate limiting rules on `api.wydarzka.dev` as a first-layer defense before requests hit Railway
- [ ] P1 Monitor 429 responses in Sentry — tune limits based on real traffic after launch

#### Redis Memory Management

- [x] P0 **Set `maxmemory` per environment:**
  - Development: 64 MB
  - Staging: 128 MB
  - Production: 256 MB (tune based on Railway plan)
  - Configurable via `REDIS_MAXMEMORY` environment variable
- [x] P0 **Set eviction policy `allkeys-lru`** — rate limit keys and cache keys can be safely evicted; Bull keys are persistent and not affected by LRU eviction
- [ ] P1 **Monitor Redis memory usage** — alert at 80% capacity via Sentry or log-based alert

### 0.2.4 CORS configuration

> Three frontends and the mobile app all hit a single NestJS API.

- [x] P0 Configure CORS in NestJS (`@nestjs/common` `enableCors`) with explicit allowed origins:
  - `https://wydarzka.dev` (Web B2C)
  - `https://dashboard.wydarzka.dev` (Web B2B)
  - `https://admin.wydarzka.dev` (Web Admin)
  - `http://localhost:3000`, `http://localhost:3001`, `http://localhost:3002`, `http://localhost:3003` (local development)
- [x] P0 Load allowed origins from environment variable (`CORS_ALLOWED_ORIGINS`) — different per environment (dev / staging / production)
- [x] P0 Allow credentials (`credentials: true`) — needed for JWT auth cookies if used, and for `Authorization` header
- [x] P0 Restrict allowed methods to `GET, POST, PATCH, PUT, DELETE, OPTIONS`
- [x] P0 Restrict allowed headers to `Content-Type, Authorization, Accept-Language`
- [ ] P1 Add Cloudflare-level CORS headers as a fallback for preflight caching (reduce OPTIONS round-trips)

#### Security headers

- [x] P0 Install and configure `helmet` middleware in NestJS (`app.use(helmet())`) — sets CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy out of the box
- [x] P0 Tune `helmet` CSP policy to allow required origins (Cloudflare Images, Stadia Maps, Sentry, etc.)
- [ ] P1 Add security headers to Next.js apps via `next.config.js` `headers()` — CSP, X-Frame-Options, Permissions-Policy for Web B2C, Web B2B, and Web Admin

### 0.2.5 Structured Logging

#### Log infrastructure

- [x] P0 **Install structured logging library:** `nestjs-pino` (Pino logger for NestJS) — JSON output, low overhead, built-in request context
- [x] P0 **Configure log levels per environment:**
  - Development: `debug` (verbose, human-readable with `pino-pretty`)
  - Staging: `info`
  - Production: `info` (with `warn`/`error` for alerts)
  - Log level configurable via `LOG_LEVEL` environment variable (runtime override without redeploy)
- [x] P0 **Structured JSON format** for all log entries — every log line includes:
  - `timestamp` (ISO 8601)
  - `level` (debug / info / warn / error / fatal)
  - `message`
  - `correlationId` (see below)
  - `context` (NestJS module/service name)
  - `userId` (if authenticated request, omit for anonymous)
  - Additional metadata as needed (e.g., `eventId`, `venueId`, `endpoint`)

#### Request tracing (correlation IDs)

- [x] P0 **Generate a unique `correlationId`** (UUID v4) for every incoming HTTP request via NestJS middleware
  - Read from `X-Correlation-ID` header if present (for cross-service tracing); generate if missing
  - Attach to all log entries for that request (via Pino child logger or `AsyncLocalStorage`)
  - Include `correlationId` in all outgoing responses (`X-Correlation-ID` response header) — enables frontend/mobile to report issues with a traceable ID
- [x] P0 **Propagate `correlationId`** to:
  - Background jobs (Bull queues) — pass as job metadata
  - Outgoing HTTP calls (Resend, Twilio, external APIs) — include as header
  - Database query logs (if enabled at debug level)

#### Log aggregation

- [x] P0 **Railway log drain** — Railway captures stdout/stderr by default; ensure JSON logs are properly parsed in Railway's log viewer
- [ ] P1 **External log aggregation service** — evaluate and connect one of:
  - **Better Stack (Logtail)** — generous free tier, good UI, supports Pino JSON natively
  - **Axiom** — free tier, integrates with Vercel/Railway
  - **Datadog** (if budget allows) — full observability suite
  - Configure log drain from Railway to chosen service
- [ ] P1 **Log-based alerts** — configure alerts in aggregation service for:
  - Error rate spike (>10 errors/minute)
  - Repeated 5xx responses on same endpoint
  - Aggregation pipeline failures (importer errors)
  - Auth brute-force patterns (multiple failed logins from same IP)

#### Log hygiene

- [x] P0 **Sensitive data redaction** — ensure logs never contain:
  - Passwords, tokens, API keys, OTP codes
  - Full email addresses (mask: `a***@example.com`)
  - Configure Pino redact paths: `['req.headers.authorization', 'req.body.password', 'req.body.token']`
- [x] P0 **Request/response logging** — log every HTTP request with: method, path, status code, response time (ms), correlationId. Do NOT log request/response bodies in production (privacy + volume)
- [ ] P1 **Log retention policy** — define retention per environment:
  - Development: ephemeral (container lifecycle)
  - Staging: 7 days
  - Production: 30 days (extend to 90 days if using external aggregation service)

### 0.2.6 Unified API Response Handling

> Every API response — success or failure — must follow a predictable shape so frontends and the mobile app can handle responses consistently without per-endpoint special cases. See [ARCHITECTURE.md §22](./ARCHITECTURE.md#22-error-handling-architecture) for the full specification of both success envelopes (§22.2) and error envelopes (§22.1).

#### Standardized success response shape

- [x] P0 Implement a NestJS interceptor that wraps all successful responses in the standard envelope (see [ARCHITECTURE.md §22.2](./ARCHITECTURE.md#222-success-response-envelope)):
  - Single resource: `{ "data": { ... } }`
  - List/paginated: `{ "data": [...], "meta": { "nextCursor", "hasMore", "total" } }`
  - Writes: `201` with `{ "data": { ...created } }` for `POST`, `200` with `{ "data": { ...updated } }` for `PATCH`/`PUT`, `204` empty body for `DELETE`
- [x] P0 Register the interceptor globally in `main.ts` (`app.useGlobalInterceptors(...)`)

#### Standardized error response shape

- [x] P0 Define and document the canonical error response DTO:
  ```json
  {
    "statusCode": 422,
    "error": "VALIDATION_ERROR",
    "message": "Human-readable summary",
    "correlationId": "uuid-from-0.2.5",
    "details": [
      { "field": "email", "message": "must be a valid email address" }
    ]
  }
  ```
  - `statusCode` — HTTP status code (mirrored in body for convenience)
  - `error` — machine-readable error code (constant string, e.g. `VALIDATION_ERROR`, `NOT_FOUND`, `UNAUTHORIZED`, `FORBIDDEN`, `CONFLICT`, `RATE_LIMITED`, `INTERNAL_ERROR`)
  - `message` — human-readable description (safe to display in UI)
  - `correlationId` — request correlation ID from structured logging (section 0.2.5) — enables support to trace any error
  - `details` — optional array of field-level errors (present only for validation errors)

#### Global exception filter

- [x] P0 Implement a NestJS `AllExceptionsFilter` (`@Catch()`) that catches every unhandled exception and maps it to the standardized shape:
  - `HttpException` subclasses -> use their status and message
  - `class-validator` `ValidationPipe` errors -> `422 VALIDATION_ERROR` with `details` array (one entry per field)
  - `ThrottlerException` -> `429 RATE_LIMITED`
  - `Drizzle` / database errors -> `500 INTERNAL_ERROR` (do NOT leak SQL details; log full error at `error` level)
  - Unknown errors -> `500 INTERNAL_ERROR` with generic message; log stack trace
- [x] P0 Register the filter globally in `main.ts` (`app.useGlobalFilters(...)`)
- [x] P0 Attach `correlationId` from the request context (AsyncLocalStorage / Pino child logger) to every error response

#### Client-friendly error codes

- [x] P0 Define an `ErrorCode` enum (or const map) shared between backend and API docs:
  - `VALIDATION_ERROR` — request body / query params failed validation
  - `NOT_FOUND` — resource does not exist
  - `UNAUTHORIZED` — missing or invalid auth token
  - `FORBIDDEN` — valid token but insufficient permissions
  - `CONFLICT` — duplicate resource (e.g., already following a venue)
  - `RATE_LIMITED` — throttler limit exceeded
  - `INTERNAL_ERROR` — unexpected server error
- [x] P0 Document error codes in Swagger (`@ApiResponse` decorators on each endpoint) so frontend teams can code against them
- [ ] P1 Include error codes in the exported `openapi.json` (CI artifact from section 0.5.2) for potential client SDK generation

#### Validation error formatting

- [x] P0 Configure `ValidationPipe` globally with `whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`
- [x] P0 Custom `exceptionFactory` on `ValidationPipe` that transforms `class-validator` `ValidationError[]` into the `details` array format (`{ field, message }[]`)
- [ ] P1 If any endpoints adopt Zod validation (e.g., via `nestjs-zod`), normalize Zod errors into the same `details` format inside the global exception filter

---

### 0.3 Aggregation pipeline — Sprint 1 (PRIORITY #1)

> Before any UI is built — the map must have data.

- [ ] P0 **Source #1 — Google Places API:** finding venues in a city -> checking if they have their own event pages -> automatic email invitation to join the app (sent via Resend)
- [ ] P0 **Source #2 — Eventbrite public API:** integration with the public API, periodic event fetching from free endpoints
- [ ] P0 **Source #3 — RSS / iCal venue feeds:** venue publishes a feed -> the app subscribes and automatically imports new events
- [ ] P0 **Source #4 — City portals and cultural institutions:** official public data (e.g., poznan.pl/events, community centers, libraries) — exclusively through official APIs or open data, no scraping
- [ ] P0 **Source #5 — WhatsApp / email bot collecting events from venues:** venue sends event info to a dedicated WhatsApp number or email (inbound via Resend webhook on `submit@wydarzka.dev`) -> auto-parser extracts data and writes to database — zero friction for the owner, full automation
- [ ] P1 **Source #6 — Self-submission form for venues:** "Add your event" available publicly — supplement for venues without an integrated feed (verify if not already implemented in B2B dashboard)
- [ ] P0 Implement **event deduplication pipeline** — the same event from two sources = one entry (fuzzy match: name + date + address)
- [ ] P0 Implement **venue deduplication pipeline** — the same venue from multiple sources (e.g., Google Places + Eventbrite) = one entry:
  - Match on: normalized name + geocoordinate proximity (< 100m) + address similarity
  - Merge strategy: prefer Google Places for location/photos/hours, Eventbrite for event links, keep all source IDs for traceability
  - `venue_source_mappings` table (venue_id, source, external_id, raw_data_json, last_seen_at) — track each source's reference to the canonical venue
  - On conflict: auto-merge if confidence > 0.9, flag for admin review if 0.7-0.9, skip if < 0.7
  - Re-run deduplication on each pipeline cycle (new imports may match existing venues)
- [ ] P0 Implement **staleness detection** — events with past dates removed automatically (soft-delete)
- [ ] P0 Implement source attribution — every aggregated event has a visible "Source: [name]"
- [ ] P0 Launch pipeline for city #1 (Poznan — as test) and collect >= 500 events
- [x] P0 Configure cron job: pipeline runs every 6 hours automatically
- [ ] P1 Extend pipeline to remaining 6 cities (Warsaw, Krakow, Wroclaw, Lodz, Gdansk, Szczecin)
- [ ] P1 Build importer monitoring: last_run, success_rate, error_count, events_imported

### 0.5.2 GitHub Actions — wydarzka-backend

- [ ] P0 **CI workflow** (triggered on: push to `develop`, push to `main`, PR to either):
  - `pnpm install` (with dependency caching)
  - `pnpm lint` — ESLint
  - `pnpm type-check` — `tsc --noEmit`
  - `pnpm test` — unit + integration tests
  - `pnpm build` — verify build succeeds
  - `pnpm openapi:export` — boot app, fetch `/api/docs-json`, save `docs/openapi.json`
  - Upload `docs/openapi.json` as CI artifact
- [ ] P0 **CD workflow** — deploy to Railway:
  - `develop` branch -> staging environment
  - `main` branch -> production environment (only after CI green + code review)
- [ ] P1 **Test database in CI** — spin up PostgreSQL + PostGIS via GitHub Actions service container for integration tests

---

## Phase 1 — Core (Week 3-6)

### 1.1 Auth and user management

- [x] P0 Implement B2C auth endpoints (email+password, Google OAuth, Apple Sign In)
- [x] P0 Implement JWT authentication (access token + refresh token rotation)
- [x] P0 Implement separate auth flow for B2B organizer (company email + venue verification)
- [x] P0 Role-based access control: `user` / `organizer` / `admin`
- [x] P0 Password reset via email (link with token, valid for 1h) — sent via Resend (`EmailModule`)
- [x] P0 Email verification on registration — send verification email via Resend; `POST /auth/verify-email?token=xxx` confirms the address and activates the account
- [x] P0 GDPR: endpoint for account deletion + user data export
- [x] P1 Rate limiting on auth endpoints (max 10 attempts/minute per IP)

#### 1.1.0 Admin Authentication Hardening

> Admin panel is IP-restricted, but admin accounts require additional protection given their elevated privileges. These items apply only to the `admin` role.

- [x] P1 **2FA/MFA (TOTP) for admin accounts:**
  - `admin_totp_secrets` table (id, user_id, secret_encrypted, is_verified, created_at)
  - `POST /admin/auth/totp/setup` — generate TOTP secret + QR code URI (otpauth://)
  - `POST /admin/auth/totp/verify-setup` — verify first code to activate 2FA
  - `POST /admin/auth/totp/validate` — validate TOTP code during login (second step after password)
  - Generate 10 single-use recovery codes on TOTP setup, stored hashed in `admin_recovery_codes` table
  - `POST /admin/auth/recovery` — login with recovery code (burns code on use)
  - Enforce 2FA setup on first admin login (cannot access admin routes until TOTP is configured)
- [x] P1 **Admin session timeout policy:**
  - Admin access tokens: short-lived (15 min TTL, vs 1h for regular users)
  - Admin refresh tokens: expire after 30 min of inactivity (sliding window), absolute max 8h
  - `last_activity_at` column on `refresh_tokens` table — updated on each token refresh
  - Reject refresh if `now() - last_activity_at > 30 min`
- [x] P1 **Admin failed login lockout:**
  - `admin_login_attempts` table (id, user_id, ip, attempted_at, success)
  - Lock admin account for 15 minutes after 5 failed login attempts (per account, not just per IP)
  - `POST /admin/auth/login` checks lockout before validating credentials
  - Log all failed admin login attempts to audit log (existing audit infrastructure from 3.2)
  - Alert via email (Resend) when admin account is locked out

#### 1.1.1 Session & Token Management

- [x] P0 Refresh token storage: `refresh_tokens` table (id, user_id, token_hash, device_info, expires_at, created_at, revoked_at)
- [x] P0 Refresh token rotation: issue new refresh + access token on each `/auth/refresh`, invalidate previous refresh token
- [x] P0 Token family tracking: if a revoked refresh token is reused, invalidate ALL tokens for that user (replay attack detection)
- [x] P0 Revoke all sessions on password change / password reset
- [x] P0 Revoke all sessions on account deletion (as part of GDPR cleanup)
- [x] P1 `GET /auth/sessions` — list active sessions for current user (device, last used, created_at)
- [x] P1 `DELETE /auth/sessions/:id` — revoke a specific session
- [x] P1 **Concurrent session limit:** max 5 active refresh tokens per user; on 6th login, revoke the oldest session automatically. Admin accounts: max 2 active sessions

### 1.2 API endpoints

#### Auth endpoints

- [x] P0 `POST /auth/register` — register new user (email, password, tos_accepted, tos_version); returns access + refresh tokens
- [x] P0 `POST /auth/login` — login with email + password; returns access + refresh tokens
- [x] P0 `POST /auth/refresh` — exchange valid refresh token for new access + refresh token pair (rotation)
- [x] P0 `POST /auth/logout` — revoke the current refresh token (requires auth)
- [x] P0 `POST /auth/oauth/google` — exchange Google authorization code for Wydarzka access + refresh tokens (creates or links user)
- [x] P0 `POST /auth/oauth/apple` — exchange Apple authorization code for Wydarzka access + refresh tokens (creates or links user)
- [x] P0 `POST /auth/password-reset/request` — send password reset email (accepts email, always returns 200 to prevent enumeration)
- [x] P0 `POST /auth/password-reset/confirm` — reset password using token from email link (token, new_password)
- [x] P0 `PATCH /auth/password` — change password for authenticated user (current_password, new_password); revokes all other sessions
- [x] P0 `POST /auth/verify-email` — verify email address using token from registration email (query param: `token`); activates account

#### User endpoints

- [x] P0 `GET /users/me` — return current user profile (email, role, preferred_locale, analytics_consent, reputation_score, created_at)
- [x] P0 `PATCH /users/me` — update user profile (preferred_locale, display settings)
- [x] P0 `DELETE /users/me` — GDPR account deletion; removes all user data, anonymizes ToS consent records, revokes all sessions
- [x] P0 `GET /users/me/data-export` — GDPR data portability; returns all user data (profile, follows, saved events, consent records) as JSON
- [x] P0 `PATCH /users/me/push-token` — register or update FCM/APNs push token for the current device (push_token, device_info)
- [x] P0 `GET /users/me/follows` — list of followed venues
- [x] P0 `GET /users/me/saved-events` — list of saved events (sorted by event date, soonest first; cursor-based pagination)

#### Event endpoints

- [x] P0 `GET /events` — event list with filtering (lat, lng, radius, category, date_from, date_to, happening_now)
  - `radius` accepts values in km (frontend presets: 0.5 / 1 / 3 / 5 km; backend validates max 50 km)
  - `happening_now=true` filter: returns events where `start_time <= now() AND (end_time >= now() OR (end_time IS NULL AND start_time >= now() - 8h))` — matches "Happening Now" filter on mobile and web
- [x] P0 `GET /events/:id` — event details
- [x] P0 `GET /venues` — venue list (geospatial query)
- [x] P0 `GET /venues/:id` — venue profile with event list and photo gallery (includes `venue_photos` sorted by position)
- [x] P0 `GET /venues/:id/photos` — venue photo gallery (ordered by position)
- [x] P0 `GET /events/:id/photos` — event photo gallery (ordered by position)
- [x] P0 `POST /follows` — follow venue (requires auth)
- [x] P0 `DELETE /follows/:venue_id` — unfollow
- [x] P0 `POST /saved-events` — save event
- [x] P0 `DELETE /saved-events/:event_id` — remove from saved
- [x] P0 `POST /event-reports` — report a problem with an event
- [x] P0 `POST /claim-requests` — submit a venue claim request
- [x] P0 `POST /events/user-submit` — B2C user submits an event (goes to moderation)
- [x] P0 `POST /event-tips` — Community Scout: user submits a lightweight event tip (requires auth; see section 1.7.1)
- [x] P0 `GET /users/me/event-tips` — list current user's submitted event tips with statuses (cursor-based pagination)
- [x] P0 Swagger (OpenAPI) — API documentation with interactive explorer (`/api/docs`), auto-generated from NestJS decorators (`@nestjs/swagger`)
- [ ] P0 `GET /cities` — list of supported cities with slug, name, region, coordinates, and live event count; optional `?active=true` filter (default) hides cities with zero events; cached in Redis (TTL: 15 min); used by Web B2C city picker, mobile city picker, and city listing pages (SEO)
- [x] P0 `GET /health` — health check endpoint returning `200 OK` with `{ status: 'ok', timestamp }` — used by Railway for deployment health checks and external uptime monitors. Skip rate limiting (`@SkipThrottle()`)
- [x] P1 `GET /events/search` — text search by event name / venue (see section 1.2.1)
- [x] P1 Pagination on all list endpoints — cursor-based (not offset); response shape follows [ARCHITECTURE.md §22.2](./ARCHITECTURE.md#222-success-response-envelope): `{ data: [...], meta: { nextCursor, hasMore, total? } }`
- [ ] P1 Response caching (Redis) for geospatial queries (TTL: 5 minutes)

### 1.2.1 Search Architecture

#### Index setup

- [x] P1 Create GIN trigram indexes for fuzzy / partial matching:
  - `CREATE INDEX idx_events_name_trgm ON events USING GIN (name gin_trgm_ops);`
  - `CREATE INDEX idx_venues_name_trgm ON venues USING GIN (name gin_trgm_ops);`
- [x] P1 Create GIN full-text search indexes for relevance ranking:
  - `CREATE INDEX idx_events_fts ON events USING GIN (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(description, '')));`
  - `CREATE INDEX idx_venues_fts ON venues USING GIN (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(description, '')));`
- [x] P1 Use the `simple` text search configuration (not `polish`) at launch — avoids stemming edge cases; revisit with `polish` config post-launch if recall is too low
- [x] P1 Enable `unaccent` extension (already in Docker setup) and integrate into search pipeline so queries like "krakow" match "Krakow"

#### Search ranking strategy

- [x] P1 Implement hybrid ranking combining full-text relevance and trigram similarity:
  - **Primary signal:** `ts_rank_cd` on `to_tsvector` match against the search query (rewards exact and stemmed word matches)
  - **Secondary signal:** `similarity()` from `pg_trgm` (rewards partial / fuzzy matches, handles typos)
  - **Boost factors:**
    - Events happening sooner get a time-decay boost (upcoming > far future)
    - Venues with higher `follower_count` get a minor popularity boost
    - Native events (`is_native = true`) rank slightly above aggregated events
  - **Combined score formula (example):** `score = (ts_rank_cd * 0.6) + (similarity * 0.3) + (time_boost * 0.05) + (popularity_boost * 0.05)`
- [x] P1 Apply `unaccent()` to both the search query and indexed columns so diacritics-insensitive search works transparently

#### `GET /events/search` endpoint specification

- [x] P1 **Query parameters:**
  - `q` (required, min 2 characters) — search query string
  - `lat`, `lng`, `radius` (optional) — geospatial filter (reuse existing geo logic from `GET /events`)
  - `category` (optional, unified category enum) — filter by category
  - `date_from`, `date_to` (optional) — date range filter
  - `cursor` (optional) — cursor-based pagination (consistent with other list endpoints)
  - `limit` (optional, default 20, max 50)
- [x] P1 **Response:** returns events matching the query, each with its associated venue (name, id), sorted by combined relevance score; includes `next_cursor` for pagination
- [x] P1 **Search scope:** searches across event name, event description, and venue name (joined query)
- [x] P1 **Edge cases:**
  - Empty or too-short query (`q.length < 2`) returns 400 with descriptive error
  - No results returns 200 with empty array (not 404)
  - Track zero-result queries in PostHog (`search_zero_results` event with anonymized query) for KPI monitoring

#### Performance considerations

- [x] P1 Add Redis caching layer for frequent/identical search queries (TTL: 2-3 minutes, cache key: normalized + lowercased query + filters hash)
- [x] P1 Set `pg_trgm.similarity_threshold` to 0.3 (default) — tune post-launch based on zero-result rate vs false-positive rate
- [x] P1 Use `LIMIT` pushdown in the query to avoid scoring the entire table — combine `WHERE similarity(name, $1) > 0.3` filter with `ORDER BY score DESC LIMIT 20`
- [ ] P2 Evaluate dedicated search engine (Meilisearch / Typesense) if PostgreSQL search latency exceeds 200ms p95 at scale (>10K events) — not needed for MVP

### 1.5 Push notifications

> Mobile counterpart: [ROADMAP-mobile-b2c.md](./ROADMAP-mobile-b2c.md#151-push-notifications)
> B2B counterpart: [ROADMAP-web-b2b.md](./ROADMAP-web-b2b.md#25-push-notifications)

- [x] P0 Trigger: venue adds new event -> push to all followers
  - Content: "[Venue] has a new event: [name] — [day] at [time]"
- [x] P0 Push rate limiting: max 1 push/day/venue per user (anti-spam)
- [x] P0 Quiet hours: no push between 23:00-8:00 (or per user settings)
- [x] P0 Tracking: delivery count, open rate (without identifying specific users — GDPR)
- [ ] P1 Optional "Weekend Digest" push job (Friday 16:00): "Your weekend: X saved events + Y new ones nearby"
- [ ] P1 Optional "Event starts in 2 hours" push job for saved events
- [ ] P1 Trigger: event date/time/location updated -> push to all users who saved the event
  - Content: "[Event name] has been updated: new date [day] at [time]" / "new location: [address]"
- [ ] P1 **Notification preferences storage and API:**
  - `notification_preferences` table: `user_id`, `type` (enum: `new_event`, `reminder`, `digest`, `event_update`), `enabled` (boolean, default `true`)
  - `venue_mutes` table: `user_id`, `venue_id`, `created_at`
  - `GET /users/me/notification-preferences` — return all preference toggles + muted venue IDs
  - `PATCH /users/me/notification-preferences` — update per-type toggles
  - `POST /users/me/muted-venues/:venueId` — mute a venue
  - `DELETE /users/me/muted-venues/:venueId` — unmute a venue
  - Push sender respects both per-type preferences and per-venue mutes before dispatching

### 1.6 Social sharing

- [x] P1 Dynamic OG graphic generation per event (venue photo + overlay with name + date + Wydarzka logo) via Cloudflare Worker / satori
- [x] P0 Deep link routing service (resolve event URLs -> app or web)

### 1.7 Event submission

- [x] P1 Auto-filters before moderation:
  - Fuzzy match with existing events (duplicate blocking)
  - Address validation (Nominatim geocoding)
  - Date validation (must be in the future)
  - Basic spam filter (regex on description)
  - Rate limit: max 2 submissions/day per user
- [ ] P1 Push to user after moderator decision

### 1.7.1 Community Scout — Event Tips

> **Goal:** Lower the barrier for users to contribute event intel. An event tip is lighter than a full event submission — it can be just a link, a photo of a poster, or a short description. Admins convert approved tips into full events. Contributors earn recognition ("Scout" status) which drives engagement and organic growth.

#### Schema

- [x] P0 **`event_tips` table:**
  - `id` (UUID, PK)
  - `user_id` (FK → users, NOT NULL)
  - `title` (varchar 200, optional — user can leave blank if just submitting a link/photo)
  - `event_date` (date, optional — approximate date if known)
  - `event_time` (time, optional)
  - `location_text` (varchar 300, optional — freeform: "near Stary Browar" or full address)
  - `category` (unified_category enum, optional)
  - `link_url` (varchar 500, optional — link to Facebook event, venue website, etc.)
  - `image_url` (varchar 500, optional — photo of poster/flyer, uploaded to Cloudflare R2)
  - `description` (text, optional, max 500 chars — any additional context)
  - `status` (enum: `pending` | `approved` | `rejected` | `converted`, default `pending`)
  - `admin_note` (text, optional — reason for rejection or internal note)
  - `converted_event_id` (FK → events, nullable — set when tip is converted to a full event)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  - **Validation:** at least one of `title`, `link_url`, `image_url`, or `description` must be present (not all null)

#### Endpoints

- [x] P0 `POST /event-tips` — submit an event tip (requires auth):
  - Body: `{ title?, event_date?, event_time?, location_text?, category?, link_url?, image_url?, description? }`
  - Validation: at least one content field required
  - Rate limit: max 5 tips/day/user
  - Returns: `201` with created tip
- [x] P0 `GET /users/me/event-tips` — list user's own tips (cursor-based pagination):
  - Filterable by `status` (pending | approved | rejected | converted)
  - Returns tip data + `converted_event_id` if converted (so user can see the resulting event)
- [x] P0 `GET /users/me/scout-stats` — return Community Scout stats for current user:
  - `{ tips_submitted, tips_approved, tips_converted, scout_level }`
  - `scout_level`: `"new"` (0-2 approved), `"scout"` (3-9 approved), `"top_scout"` (10+ approved)

#### Admin endpoints (event tip review)

- [x] P0 `GET /admin/event-tips` — list pending event tips (cursor-based pagination, filterable by status, sortable by created_at)
- [x] P0 `PATCH /admin/event-tips/:id/approve` — mark tip as approved
- [x] P0 `PATCH /admin/event-tips/:id/reject` — reject tip (body: `{ admin_note: string }`)
- [x] P0 `POST /admin/event-tips/:id/convert` — convert tip into a full event:
  - Admin fills in missing fields (full event creation form, pre-populated from tip data)
  - Sets `status = 'converted'` and `converted_event_id` on the tip
  - Created event has `source = 'community_scout'` and `submitted_by_user_id = tip.user_id`

#### Scout recognition

- [x] P0 **`submitted_by_user_id`** field on `events` table (nullable FK → users) — set when an event originates from a community scout tip
- [x] P0 **Public attribution on events:** events created from tips include `"submitted_by": { "id", "display_name" }` in API responses (visible on event detail screens as "Tipped by @username")
- [x] P0 **Scout level calculation:** based on count of `event_tips` with `status IN ('approved', 'converted')` for the user:
  - `new`: 0-2 approved tips
  - `scout`: 3-9 approved tips
  - `top_scout`: 10+ approved tips
- [x] P0 **Scout badge in user profile API** — `GET /users/me` response includes `scout_level` and `tips_approved_count`
- [ ] P1 **Push notification to user** when their tip is approved or converted: "Your event tip was published! Check it out."

#### Rate limiting & anti-abuse

- [x] P0 Rate limit: max 5 event tips/day/user
- [x] P0 Accounts created < 24h ago cannot submit tips (prevent spam accounts)
- [x] P0 Banned users cannot submit tips

### 1.8 Deep Linking / Universal Links

> Mobile counterpart: [ROADMAP-mobile-b2c.md](./ROADMAP-mobile-b2c.md#18-deep-linking--universal-links)

- [x] P0 Apple Universal Links: host `apple-app-site-association` file at `https://wydarzka.dev/.well-known/apple-app-site-association`
  - Configure `applinks` entries for event, venue, and password reset paths
  - Deploy via Cloudflare / Next.js public directory
- [x] P0 Android App Links: host `assetlinks.json` file at `https://wydarzka.dev/.well-known/assetlinks.json`
  - Configure `delegate_permission/common.handle_all_urls` with app package name and SHA-256 fingerprint
- [x] P0 Deep link routing service: resolve `https://wydarzka.dev/event/:id` -> open in app (if installed) or web (if not)
- [x] P0 Password reset deep link: `https://wydarzka.dev/reset-password?token=xxx` -> app screen or web page
- [x] P1 Deferred deep linking: user without the app clicks a link -> app store -> after install, app opens the original target screen

### 1.9 Internationalization (i18n)

- [x] P0 Category and venue type labels served from backend in both PL and EN (already defined in Unified Category System)
- [x] P0 `Accept-Language` header support — API responses include localized labels where applicable
- [x] P0 Email templates (Resend / React Email) — PL versions of all transactional emails
- [x] P0 EN versions of all email templates
- [x] P0 User language preference field in `users` table (`preferred_locale: pl | en`, default `pl`)
- [x] P0 Push notification content localized based on user's preferred locale

### 1.10 Terms of Service Acceptance

> Legal requirement — GDPR mandates provable consent; Apple App Store and Google Play both require recorded ToS/Privacy Policy acceptance.

- [x] P0 **Schema: `tos_acceptances` table** (id, user_id, tos_version [string, e.g. "2026-04-01"], accepted_at [timestamptz], ip_address, user_agent)
  - Append-only audit log — insert new row per version acceptance, never overwrite
- [x] P0 **Registration validation:** require `tos_accepted: true` in registration payload; reject registration if missing
  - Record acceptance row in `tos_acceptances` at registration time (with current ToS version, timestamp, IP, user agent)
- [x] P0 **Current ToS version config:** `CURRENT_TOS_VERSION` environment variable (e.g. `"2026-04-01"`) — single source of truth
- [x] P0 **Re-consent guard:** NestJS interceptor/guard on all authenticated routes:
  - Check if user has accepted `CURRENT_TOS_VERSION`
  - If not → return `403` with error code `TOS_ACCEPTANCE_REQUIRED` (frontends show re-consent screen)
  - Skip guard on `/auth/tos/*` endpoints and `/auth/logout`
- [x] P0 **Endpoints:**
  - `POST /auth/tos/accept` — record acceptance of a specific ToS version (body: `{ version: string }`)
  - `GET /auth/tos/status` — return `{ currentVersion, acceptedVersion, accepted: boolean }`
- [x] P0 **GDPR integration:**
  - Include `tos_acceptances` records in user data export (`GET /users/me/data-export`)
  - On account deletion: retain consent records for legal compliance (anonymize user_id but keep timestamp + version for audit)

### 1.11 Cookie Consent / Analytics Consent

- [x] P0 **`analytics_consent` field** on `users` table (`boolean`, default `false`). Frontends set to `true` only after user grants explicit consent (cookie banner on web, onboarding disclosure on mobile).
- [x] P0 Endpoint to update user analytics consent preference (`PATCH /users/me/consent`)
- [ ] P0 Respect consent flag: do not send analytics-related data to PostHog for users who opted out
- [x] P0 Consent audit log: record when consent was given/withdrawn (timestamp + method) for GDPR compliance

---

## Phase 2 — B2B Dashboard (Week 5-8)

### 2.1 Venue claim flow

> Web B2B counterpart: [ROADMAP-web-b2b.md](./ROADMAP-web-b2b.md#21-venue-claim-flow)

- [ ] P0 SMS verification — OTP code sent to the venue's listed phone number (Twilio/Vonage)
- [ ] P0 Email verification on own domain — auto-match email domain with venue website domain from aggregated data (verification email sent via Resend)
- [ ] P1 Google Business Profile API verification (OAuth)
- [ ] P1 Document upload processing — manual review by admin within 24h
- [ ] P0 72-hour dispute window — dispute email sent via Resend: "Your profile was just claimed by [email]. If this wasn't you, click here"
- [ ] P0 Claim alert email after each claim (to owner email from aggregated data if available) — via Resend
- [ ] P0 Claim rate limiting: max 3 attempts/account/week, accounts created <24h cannot claim
- [ ] P0 Venue registration endpoint — goes to admin moderation before publishing
- [ ] P1 Automatic address verification via CEIDG API (matching NIP or business address)

### 2.2 Organizer onboarding after claim

- [ ] P0 Welcome email after claim with link to checklist and video tutorial (Loom) — via Resend (template from `EmailModule`)
- [ ] P0 Onboarding progress tracking endpoints

### 2.3 Venue profile management

- [ ] P0 Venue profile CRUD endpoints (organizer-scoped)
- [ ] P1 Opening hours edge cases — backend support:
  - Temporary closures: store as date range + reason, surface on venue profile and suppress "open now" indicator
  - Holiday/special hours: date-specific overrides that take precedence over regular weekly schedule
  - Variable closing times: flexible closing flag per day (e.g., "Open until late" displayed instead of fixed hour)
- [ ] P0 Photo gallery endpoints:
  - `POST /venues/:id/photos` — upload photo (presigned URL to Cloudflare R2, max 5 per venue)
  - `PATCH /venues/:id/photos/reorder` — update photo positions (drag-to-reorder)
  - `DELETE /venues/:id/photos/:photoId` — remove a photo
  - First photo (position 0) is used as the main `photo_url` fallback

### 2.4 Event management

- [ ] P0 Event CRUD endpoints (organizer-scoped to their venue)
- [ ] P0 Event photo endpoints:
  - `POST /events/:id/photos` — upload photo (presigned URL to Cloudflare R2, max 3 per event)
  - `PATCH /events/:id/photos/reorder` — update photo positions
  - `DELETE /events/:id/photos/:photoId` — remove a photo
- [ ] P0 Draft / Publish state machine
- [ ] P0 Recurring event expansion (daily/weekly/monthly -> individual event instances)
- [ ] P1 **Recurring event edge cases (detailed spec):**
  - **Instance generation horizon:** Generate individual event instances 90 days ahead. A daily cron job (`recurring-event-expander`) extends the horizon each night, creating new instances as the window advances. Configurable via `RECURRING_HORIZON_DAYS` env var.
  - **Data model:**
    - `recurring_event_templates` table: stores the recurrence rule (frequency: `daily` | `weekly` | `monthly`, interval, day_of_week, day_of_month, end_date or occurrence_count, parent event metadata)
    - `events` table gains `recurring_template_id` (nullable FK) and `original_start_time` (for tracking the canonical slot even if rescheduled)
    - Each generated instance is a real row in `events` — queryable, indexable, and independently editable
  - **Editing instances — three modes:**
    - **"This event only"** — detach the instance from the template (`is_recurring_exception: true`), apply edits only to that row. Future regeneration skips this slot.
    - **"This and all future events"** — split the template: end the current template at the edited instance's date, create a new template with the updated values from that date onward. Regenerate future instances from the new template.
    - **"All events"** — update the template itself. Delete all non-exception future instances and regenerate. Past instances and exceptions are untouched.
  - **Canceling a single occurrence:**
    - Set `is_cancelled: true` on the instance (soft-cancel, not soft-delete). The event remains in the DB for audit but is excluded from public queries.
    - Optionally store `cancellation_reason` (e.g., "Holiday", "Venue unavailable").
    - If push notifications were sent for this event, send a cancellation push to users who saved it.
  - **Deleting the entire series:**
    - Soft-delete all instances + mark the template as `deleted_at`. No new instances are generated.
  - **End conditions:**
    - Recurrence ends when: `end_date` is reached, `occurrence_count` is exhausted, or organizer manually stops the series.
    - Template without an end condition repeats indefinitely (instances generated up to the horizon).
  - **Validation rules:**
    - Max recurrence duration: 1 year (to prevent accidental infinite series in the UI)
    - Min interval: 1 day (no sub-daily recurrence in MVP)
    - Monthly recurrence on day 29-31: skip months that don't have the day (e.g., Feb 30 is skipped), with a warning in the UI
  - **API endpoints:**
    - `POST /events` with `recurrence` object in body -> creates template + initial instances
    - `PATCH /events/:id` with `edit_scope: 'this' | 'this_and_future' | 'all'` header
    - `POST /events/:id/cancel` — cancel single occurrence
    - `DELETE /events/:id/series` — delete entire series (soft-delete)
    - `GET /events/:id/series` — list all instances of a recurring series

#### Concurrency Control

- [ ] P1 **Optimistic locking on venue profile updates:**
  - Add `version` column to `venues` table (integer, incremented on each update)
  - `PATCH /venues/:id` includes `version` in request body — reject with `409 CONFLICT` if stale
- [ ] P1 **Race condition prevention on venue claims:**
  - Database-level unique constraint on `claim_requests` (venue_id + status='approved') — prevents simultaneous successful claims
- [ ] P1 **Idempotency keys on push notification dispatch:**
  - Attach idempotency key (event_id + venue_id + date) to push jobs — prevent duplicate sends on retry

- [ ] P0 **Trust level system for B2B events:**
  - New venue (0-3 events): event goes to a short moderation queue (review within 24h)
  - Verified venue (3+ approved events): **auto-publish immediately**
  - Venue with flags (>3 reports from users): returns to moderation

### 2.5 Push notifications

> Web B2B counterpart: [ROADMAP-web-b2b.md](./ROADMAP-web-b2b.md#25-push-notifications)

- [ ] P0 B2B push send endpoint (organizer triggers push to venue followers)
- [ ] P0 Rate limiting: max 1 push/day/venue (message if limit reached)
- [ ] P0 Push delivery and open tracking

### 2.6 Analytics (basic)

- [ ] P0 Analytics aggregation endpoints (follower trends, event views, CTA clicks)
- [ ] P0 Per-event analytics query endpoints
- [ ] P1 Benchmark calculation: category averages (anonymized)

### 2.7 Social media graphics

- [ ] P2 Generate ready-made graphics per event via Cloudflare Worker with satori:
  - Format 1080x1080 (Instagram feed)
  - Format 1080x1920 (Instagram Stories)
  - Content: venue photo as background + overlay with event name + date + Wydarzka logo

### 2.8 Image Processing Pipeline

> Photos are uploaded to Cloudflare R2 for venues (up to 5 photos) and events (up to 3 photos). All gallery photos (`venue_photos`, `event_photos`) go through this pipeline.

- [ ] P0 **Image validation on upload:**
  - File type whitelist (JPEG, PNG, WebP only)
  - Max file size limit (e.g., 10 MB)
  - Minimum resolution check (e.g., 400x300 for usable display)
- [ ] P0 **Image compression and resizing:**
  - Auto-compress uploads to WebP (Cloudflare Images or Worker)
  - Generate standardized sizes on upload: original, large (1200px wide for detail pages), medium (600px for lists)
- [ ] P0 **Thumbnail generation:**
  - Small thumbnail (200x200) for map mini-cards and list views
  - Medium thumbnail (600px wide) for venue/event cards
  - Large image (1200px wide) for detail page headers
  - Serve appropriate size via Cloudflare Images variants or named transforms
- [ ] P1 **NSFW / content moderation for uploaded images:**
  - Integrate content moderation API (e.g., Cloudflare Images AI or third-party service)
  - Flag images that fail moderation — hold for manual admin review instead of publishing
  - Admin UI for reviewing flagged images (in Admin Panel, Phase 3)
- [ ] P1 **Per-organizer storage quota:**
  - Total storage limit per organizer account (e.g., 500 MB across all venues)
  - Track cumulative upload size in `users` or a new `organizer_storage` table
  - Return `413 QUOTA_EXCEEDED` with clear message when limit is reached (include current usage and limit in response)
  - Admin override endpoint to increase quota for specific organizers

### 2.9 Multi-Venue Organizer Support

- [ ] P0 `GET /venues/mine` — return all venues where `claimed_by = authenticated user` (with follower count, upcoming event count)
- [ ] P0 Scope all organizer endpoints (`/events`, `/venues/:id`, `/push`, `/analytics`) to verify the organizer owns the target venue (already implicit in auth guards — verify and test)
- [ ] P0 Seed data: ensure at least 2 organizer users each own 2-3 venues (for multi-venue testing)

---

## Phase 3 — Admin Panel (Week 6-8)

### 3.1 Event moderation

> Web Admin counterpart: [ROADMAP-web-admin-internal.md](./ROADMAP-web-admin-internal.md#31-event-moderation)

- [ ] P0 Moderation queue endpoints:
  - `GET /admin/moderation/events` — list events pending review (filterable by source: `user_submit` | `new_venue` | `reported`; sortable by `created_at`; cursor-based pagination)
  - `PATCH /admin/moderation/events/:id/approve` — approve event for publishing
  - `PATCH /admin/moderation/events/:id/reject` — reject event (body: `{ reason: string }`)
  - `PATCH /admin/moderation/events/:id/request-info` — request additional info from submitter (body: `{ message: string }`)
- [ ] P0 Notification to user/venue after each decision (email via Resend + in-app push)
- [ ] P0 Auto-alert: if event has >= 3 reports from users -> appears in queue

### 3.2 Venue management

> Web Admin counterpart: [ROADMAP-web-admin-internal.md](./ROADMAP-web-admin-internal.md#32-venue-management)

- [ ] P0 Admin venue management endpoints:
  - `GET /admin/venues` — list all venues (filterable by status: `unclaimed` | `claimed` | `banned` | `pending`; sortable by `created_at`, `follower_count`; cursor-based pagination)
  - `GET /admin/venues/:id` — venue detail with claim history, event history, follower count
  - `PATCH /admin/venues/:id/ban` — ban venue (body: `{ reason: string }`); sends notification to owner
  - `PATCH /admin/venues/:id/warn` — warn venue owner (body: `{ message: string }`)
  - `PATCH /admin/claims/:id/approve` — approve claim request
  - `PATCH /admin/claims/:id/reject` — reject claim request (body: `{ reason: string }`)
- [ ] P0 Audit log recording: every admin action persisted with actor, action, target, timestamp
  - `GET /admin/audit-log` — list audit log entries (filterable by admin user, action type, date range, target entity; cursor-based pagination)
  - `GET /admin/audit-log/export` — CSV download of audit log entries (for compliance reviews)
- [ ] P1 Admin venue create/edit endpoints:
  - `POST /admin/venues` — create venue (admin bypass of claim flow)
  - `PATCH /admin/venues/:id` — edit venue data

### 3.3 User management

> Web Admin counterpart: [ROADMAP-web-admin-internal.md](./ROADMAP-web-admin-internal.md#33-user-management)

- [ ] P0 Reputation score system: +1 for each approved event, -3 for each rejected event
- [ ] P0 Automatic upgrade to "Trusted reporter" upon reaching reputation >= 5 (5 approved events without rejections) -> events skip moderation
- [ ] P0 Admin user management endpoints:
  - `GET /admin/users` — list all users (filterable by role: `user` | `organizer` | `admin`, status: `active` | `banned`; searchable by email; sortable by `created_at`, `reputation_score`; cursor-based pagination)
  - `GET /admin/users/:id` — user detail (email, registration date, follow count, submitted event count, reputation score, claim history)
  - `PATCH /admin/users/:id/ban` — ban user (body: `{ reason: string }`); blocks event submissions and claims
  - `PATCH /admin/users/:id/downgrade-trust` — reset reputation score and revoke "Trusted reporter" status

### 3.4 Monitoring and KPIs

> Web Admin counterpart: [ROADMAP-web-admin-internal.md](./ROADMAP-web-admin-internal.md#34-monitoring-and-kpis)

- [ ] P0 KPI aggregation endpoints — all served from backend DB (admin panel has no direct PostHog access):
  - `GET /admin/kpis/overview` — DAU/WAU/MAU (tracked via `users.last_active_at`, updated on authenticated requests), registrations, events, venues, claim rate, push open rate
  - `GET /admin/kpis/search` — zero-result search rate (tracked via Redis counter incremented on zero-result `GET /events/search` responses)
- [ ] P0 Add `last_active_at` column to `users` table — updated via middleware on each authenticated request (throttled: at most once per 15 minutes per user to avoid write amplification)
- [ ] P0 Importer status endpoints (last_run, success_rate, error_count, events_imported)
- [ ] P1 Alert email when KPI below threshold (e.g., D7 retention < 20%) — via Resend

### 3.5 API versioning

- [ ] P1 **API versioning: deferred per [ARCHITECTURE.md §3.5](./ARCHITECTURE.md#35-api-versioning-mvp) / ADR #11.** Must be enabled before first mobile production release. Use NestJS built-in URI versioning (`/api/v1/`).

---

## Phase 4 — Testing and Launch (Week 9-12)

### 4.0 Database migration strategy

> During Phases 0-3, no migration files are maintained — the database is dropped and recreated on schema changes. This task introduces a formal migration workflow before production launch.

- [x] P0 **ORM: Drizzle** — decision documented in ARCHITECTURE.md ADR #16
- [ ] P0 Create baseline migration from the current (stable) schema
- [ ] P0 Set up migration tooling and commands (`pnpm db:migrate`, `pnpm db:migrate:create`)
- [ ] P0 Disable ORM synchronize mode for staging and production environments
- [ ] P0 Define migration workflow: who writes them, how they're reviewed, how they run in CI/CD and production
- [ ] P1 Add migration step to CI pipeline (verify migrations are up to date, run against test DB)

### 4.2 Data Retention & Cleanup Jobs

> During MVP development, tables accumulate stale rows (expired tokens, soft-deleted events, old logs). Before production launch, scheduled cleanup jobs must be in place to prevent unbounded table growth.

- [ ] P1 **Cleanup job infrastructure:**
  - Bull cron jobs (one per cleanup type) running on a configurable schedule
  - Each job logs rows examined and rows purged (structured log via Pino)
  - Retention periods configurable via environment variables (with sensible defaults)
  - Dry-run mode (`DATA_CLEANUP_DRY_RUN=true`) — logs what would be deleted without actually deleting (for initial rollout validation)
- [ ] P1 **Soft-deleted event cleanup:**
  - Remove events with `deleted_at` older than 30 days (configurable: `RETENTION_SOFT_DELETED_EVENTS_DAYS`)
  - Schedule: daily at 03:00 UTC
  - Also delete associated `event_photos` from Cloudflare R2 and `event_photos` table rows
- [ ] P1 **Expired OTP cleanup:**
  - Purge expired OTP codes from Redis (SMS verification for claims)
  - Redis TTL should handle this automatically — verify TTL is set on all OTP keys; add cleanup job only if keys lack TTL
- [ ] P1 **Notification log pruning:**
  - Delete `notifications_log` entries older than 90 days (configurable: `RETENTION_NOTIFICATION_LOG_DAYS`)
  - Schedule: daily at 03:30 UTC
- [ ] P1 **Stale claim request cleanup:**
  - Soft-delete `claim_requests` with status `rejected` older than 90 days (configurable: `RETENTION_REJECTED_CLAIMS_DAYS`)
  - Soft-delete `claim_requests` with status `pending` older than 30 days and auto-expire them (notify user via email that their claim expired)
  - Schedule: daily at 04:00 UTC
- [ ] P1 **Expired session / token cleanup:**
  - Delete `refresh_tokens` rows where `expires_at < now()` or `revoked_at` is older than 7 days
  - Delete `admin_login_attempts` older than 30 days
  - Schedule: daily at 04:30 UTC
- [ ] P1 **Monitoring:**
  - Track cleanup job execution in importer monitoring dashboard (last_run, rows_purged, duration, errors)
  - Alert (Sentry) if any cleanup job fails 3 consecutive times

### 4.1.1 Load Testing

- [ ] P1 **Load test with k6 or Artillery before launch:**
  - Target: 100 concurrent users, 50 req/sec sustained for 5 minutes
  - Key scenarios: `GET /events` (geo query), `GET /events/search`, `POST /auth/login`
  - Pass criteria: p95 < 500ms, error rate < 1%, no OOM
- [ ] P1 **Run against staging environment** (not production)
- [ ] P1 **Document results** and tune connection pool / Redis / query indexes based on findings

### 4.1 Testing

- [ ] P0 E2E test: aggregation pipeline — API/feed import -> deduplication -> appearance on map
- [ ] P0 Geospatial tests: verify that "events within 1km radius" returns correct results
- [ ] P0 GDPR tests: account deletion removes all user data

### 4.2.1 API Performance Targets

> Defined targets for monitoring alerts and optimization priorities.

- [ ] P0 **Response time targets (p95):**
  - `GET /events` (list with geo filter): < 500ms
  - `GET /events/:id` (detail): < 200ms
  - `GET /venues/:id` (profile with photos): < 300ms
  - `GET /events/search` (text search): < 800ms
  - `POST` write endpoints (create/update): < 500ms
  - Auth endpoints: < 300ms
- [ ] P0 **Availability target:** 99.5% uptime (measured monthly)
- [ ] P0 **Error rate target:** < 1% of requests return 5xx
- [ ] P1 **API response time monitoring** — configure Sentry performance monitoring to track p50, p95, p99 per endpoint
- [ ] P1 **Slow query logging** — log database queries exceeding 500ms at `warn` level with query plan

### 4.3 Launch and monitoring

- [ ] P0 Verification: >= 1,000 events in database (7 cities) before public launch
- [ ] P0 Verification: zero-result search rate < 10% for main queries in each city
- [ ] P0 Configure PostHog (analytics):
  - Events: `app_open`, `map_view`, `event_detail_view`, `venue_follow`, `venue_unfollow`, `navigate_tap`, `ticket_link_tap`, `push_received`, `push_opened`, `push_opt_out`, `claim_started`, `claim_completed`, `event_created`, `event_share`, `event_tip_submitted`, `event_tip_approved`, `event_tip_converted`
  - Funnels: activation funnel (open -> map -> event_detail -> follow)
  - Retention cohorts: D1, D7, D30
- [ ] P0 Configure monitoring alerts (Sentry or similar):
  - Error rate > 1% -> immediate alert
  - API response time > 2s -> alert
  - Importer failure -> alert
- [ ] P0 Configure `GET /health` as Railway health check path for deployment monitoring (endpoint defined in section 1.2)

#### Readiness Endpoint

- [ ] P1 **`GET /ready`** — returns `200 OK` only when both DB connection pool and Redis are connected and responsive:
  - Separate from `/health` (which confirms the process is alive)
  - Used by Railway for deployment readiness gates (gradual rollout — new instance only receives traffic after `/ready` returns 200)
  - Returns `503 Service Unavailable` if DB or Redis is unreachable
  - Skip rate limiting (`@SkipThrottle()`)

### 4.3 Launch and monitoring — Outreach

- [ ] P0 Outreach to first 50 venues in Poznan:
  - Outreach email via Resend (follower count + claim link, template from `EmailModule`)
  - Link to claim flow
  - Personal call to 10 key venues (City Launcher)
- [ ] P1 Press release / article on local media (Poznan.pl, local city blogs)

---

## Phase 5 — Post-launch (Month 4-6)

### 5.2 Ticketing (native)

- [ ] P2 Stripe integration (card payments)
- [ ] P2 QR ticket generation with unique code (generated per purchase)
- [ ] P2 Event capacity tracking (max attendees)
- [ ] P2 Refund system (automatic or via admin)
- [ ] P2 Platform commission: x% per ticket (to be determined after market analysis)
- [ ] P2 Payouts to organizers (Stripe Connect)

### 5.3 Passes / loyalty cards

- [ ] P2 Pass purchase and management endpoints
- [ ] P2 Check-in validation (QR or NFC)
- [ ] P2 Platform commission: x% per pass sale

### 5.4 Advanced analytics for organizers

- [ ] P2 Advanced analytics aggregation (demographics, time series, benchmarks)
- [ ] P2 Weekly email report (auto-generated every Monday via Resend + Bull cron job)
- [ ] P2 CSV export endpoint

### 5.5 Post-event surveys

- [ ] P2 After event: push to attendees (if we have data on who attended — check-in)
- [ ] P2 Survey submission and aggregation endpoints

---

*Living document — update after each sprint. Last updated: April 2026.*
