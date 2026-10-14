# Wydarzka — B2C Promotional Scenarios (Launch, Months 0–3)

Five campaign scenarios for getting B2C users to install and use Wydarzka during the 3-month launch window, starting in Poznań. They sit under the existing launch theme **"Odkryj swoje miasto"** and build on [MARKETING-B2C.md](../../MARKETING-B2C.md), which covers pre-launch SEO, the content calendar, organic loops and budget. This folder is the concrete campaign layer on top of that plan and doesn't replace it.

**Assumptions:** launch around late September / early October 2026. Paid budget is 500–2,000 PLN/month, and the whole set stays within ~2,000 PLN in any month. Push and location are opt-in only. No features beyond those in the product (no tickets, discounts, loyalty points or chat). No influencer content is presented as organic: every paid or barter collaboration is labelled.

## Scenarios

| # | File | Scenario |
|---|---|---|
| 1 | [01-piatek-dzieje-sie-teraz.md](01-piatek-dzieje-sie-teraz.md) | "Piątek 18:00" — Friday evening, Happening Now |
| 2 | [02-pierwszy-tydzien-mapa.md](02-pierwszy-tydzien-mapa.md) | "Pierwszy tydzień" — students' first week, map-first discovery |
| 3 | [03-ulubiona-scena-obserwuj.md](03-ulubiona-scena-obserwuj.md) | "Ulubiona scena" — culture lovers, Follow venue + push |
| 4 | [04-marcinki-zapisz-wyslij.md](04-marcinki-zapisz-wyslij.md) | "Zapisz. Wyślij. Idziemy." — St. Martin's Day & Christmas, Save/Share loop |
| 5 | [05-nowy-w-miescie-seo.md](05-nowy-w-miescie-seo.md) | "Nowy w mieście" — newcomers & tourists, SEO event pages |

Community Scout isn't a lead feature here, because five scenarios can't cover six features. It's the secondary hook in Scenario 3 and the fallback for thin event data in Scenario 1.

## Comparison

| Scenario | Segment | Lead feature | Channel mix | Cost (PLN, 3 mo) | Expected impact | Effort |
|---|---|---|---|---|---|---|
| 1. Piątek 18:00 | Urban explorers 18–35 (Friday evening trigger) | Happening Now | **Paid social** (Meta + TikTok) + organic reposts | 2,000–2,400 | H | M |
| 2. Pierwszy tydzień | Students 18–25 (start of academic year trigger) | Map-first discovery | **Offline/guerrilla** (tear-off flyers, posters, stickers) + student gov + organic TikTok | 600–900 | M | M |
| 3. Ulubiona scena | Culture enthusiasts 25–45 | Follow venue + push | **Organic/community** (venue partners, FB groups, local media) | 200–400 | M (H for retention) | H |
| 4. Zapisz. Wyślij. Idziemy. | Friend-group/family planners 22–40 (St. Martin's Day, Christmas trigger) | Save / Share | **Growth loop** (share links → web → app) + IG content + small boost | 500–800 | M | L |
| 5. Nowy w mieście | Newcomers & tourists | SEO event pages | Search (SEO + Google Ads) + relocation/host partners | 700–1,000 | M now, H long-term | M |
| **Total** | | | | **4,000–5,500** | | |

**Monthly spend check:** month 1 ≈ 1,700–1,900 PLN (S1 + S2 + S5 ads), month 2 ≈ 1,300–1,600 PLN (S1 + S3 + S4 St. Martin's Day + S5), month 3 ≈ 1,300–1,600 PLN (S1 + S4 Christmas + S5). All within the 2,000 PLN/month ceiling.

## Recommended rollout order

| When | Action | Why |
|---|---|---|
| **Pre-launch (week −2 to −1)** | S5: publish guide pages, submit sitemaps, fix structured data. S3: start venue outreach | SEO needs weeks to index, and venues need time to agree and prepare content |
| **Launch week** | S2: tear-off flyers and posters on campuses (start of academic year, 1 October) | The student moment happens once a year and lines up exactly with launch, so you can't postpone it |
| **Launch week** | S1: first Friday flight (Meta + TikTok), only if the event-density check passes | The highest-intent, most measurable acquisition. It gives early CPI and aha-rate data to tune onboarding |
| **Launch week → month 3** | S5: Google Ads baseline running continuously | Captures high-intent searches while organic ranking builds |
| **Weeks 3–6** | S3: venue posts and "Za kulisami" collab videos go live, plus monthly FB group listings | By now venues have events in the app, so the first push can actually arrive and deliver on the promise |
| **Month 2 (early November)** | S4: St. Martin's Day "Zapisz. Wyślij. Idziemy." | 11.11 is Poznań's biggest local hook of the window, and by then there's a user base big enough to start the share loop |
| **Month 2–3** | S5: relocation groups, host welcome cards, blogger links | Pages are indexed by now, so outreach sends people to pages that rank and convert |
| **Month 3 (late November–December)** | S4: Christmas edition. S1: shift weight to the best-performing creative, and test copying it to city #2 if CPI < 6 PLN | Reuses a proven loop for the holiday season and only expands paid spend once the unit economics are known |

## Shared measurement setup (do once, before launch)

- UTM convention: `utm_source` (meta, tiktok, google, offline, share, venue, host) · `utm_campaign` (scenario internal name) · `utm_content` (creative or location).
- App events needed for KPIs: `map_open`, `filter_happening_now`, `preset_selected`, `event_detail_open`, `navigate_tap`, `event_saved`, `event_shared`, `venue_followed`, `push_opt_in`, `scout_submitted`.
- Consent: analytics and ad attribution only after cookie/ATT consent (GDPR, ePrivacy, iOS ATT). Report on aggregated data only.
