# MetalForge — Digest

*Generated 2026-10-23 19:13 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 20 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **10** |
| Issues closed in window | 10 |
| Commits to `main` in window | 16 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **422** |
| Sessions | 483 |
| Page views | 662 |
| Engagement rate | 59.83% |
| GSC impressions | 21,439 |
| GSC clicks | 218 |
| GSC CTR | 1.02% |
| GSC avg position | 8.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,837 |
| Est. ad revenue / mo | **~€8.51** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (117× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 617 tracked queries) | 30 clicks · 11185 impr · CTR 0.3% · avg pos 9.8 | clicks (+3) · impr (+7843) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **32/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 237/249 indexed (−2) · rotating sample: 180/249 indexed · **full site: 2280 of 3161 sitemap URLs earned impressions (90d)** | 18 rejected-quality · 19 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 15 (+1)
- 🆕 New this week: syntx.ai
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 8d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 31d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 35d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 64d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 43 | 43 | 0 |
| Verify YouTube Videos | 8 | 4 | 3 |
| Check Sitemap Drift | 8 | 0 | 7 |
| Verify Data Modules | 8 | 4 | 3 |
| .github/workflows/check-vercel-rewrites.yml | 5 | 0 | 5 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| Check llms freshness | 4 | 0 | 3 |
| Perf Budget Gate | 4 | 0 | 3 |
| Health Check | 4 | 4 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Check Video SEO | 2 | 0 | 2 |
| Daily Digest | 1 | 0 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-22 18:14 (cheap pulse — 6/6 proposals verified+promoted #9536-9541, +1 companion ai-fix filed #9551)
- 2026-10-22 12:17 (daily deep run — 8/8 proposals verified+promoted #9518-9525, +1 new ai-fix filed #9535)
- 2026-10-22 00:33 (cheap pulse — 8/8 proposals verified+promoted, #9487-9492/9494-9495)
- 2026-10-22 06:18 (early pulse — 8/8 proposals verified+promoted, #9499-9506)
- 2026-10-23 00:29 (cheap pulse — 8/8 proposals verified+promoted, #9554-9562 excl. #9558)
- 2026-10-23 06:19 (cheap pulse — 6/6 proposals verified+promoted, #9567-9572)

## 📦 Shipped to main (10)

- #9606 fix: #9588 SEO: verify-gear-consistency.cjs has 2 more false-positive classes (multi-item clause cross-contamination, brand-hyphenation mismatch)
- #9605 fix: #9587 SEO: Matt Halpern albumArticles.js Periphery IV (2019) section fabricates 'Vic Firth' signature stick — verified Promark since 2015
- #9604 fix: #9586 SEO: Tim Yeung licks.js + albumArticles.js 'Bleed the Fifth' entries fabricate Pearl kit/pedal — verified continuous Tama/Speed Cobra since 2005
- #9603 fix: #9585 SEO: Nick Menza extendedBios.js gearHighlights asserts unverified DW 5000 pedal + Vic Firth sticks for Rust in Peace era
- #9594 fix: #9572 SEO: Martin Axenrot genreGearGuides.js fabricates 'dual/twin bass drum' setup — verified single kick, cross-contaminated from Mario Duplantier
- #9593 fix: #9571 SEO: Eloy Casagrande genreGearGuides.js fabricates Speed Cobra pedal + oversimplified 'Paiste 2002' cymbal setup
- #9592 fix: #9570 SEO: Bill Ward genreGearGuides.js falsely claims he has no MetalForge gear profile (10 lines, 5 doom-metal guides)
- #9591 fix: #9569 SEO: Alex Bent genreGearGuides.js presents him as current Trivium member — he departed Oct 2025
- #9590 fix: #9567 SEO batch: Ben Koller genreGearGuides.js cymbal + kit fabrications (62 lines, 6 guide families)
- #9589 fix: #9568 SEO: Scott Travis genreGearGuides.js power-metal drumsticks guide fabricates Vic Firth 5A — verified 5B

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2052h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2148h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2325h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3410h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5840h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
