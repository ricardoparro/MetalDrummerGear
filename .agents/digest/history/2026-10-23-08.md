# MetalForge — Digest

*Generated 2026-10-23 08:21 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **21** |
| Open `seo-proposal` issues | 9 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **13** |
| Issues closed in window | 13 |
| Commits to `main` in window | 17 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **396** |
| Sessions | 457 |
| Page views | 613 |
| Engagement rate | 59.30% |
| GSC impressions | 21,439 |
| GSC clicks | 218 |
| GSC CTR | 1.02% |
| GSC avg position | 8.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,627 |
| Est. ad revenue / mo | **~€7.88** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (127× current) |

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
| PR Merger | 23 | 23 | 0 |
| Verify YouTube Videos | 16 | 9 | 6 |
| Verify Data Modules | 15 | 8 | 6 |
| Check Sitemap Drift | 15 | 0 | 14 |
| Check llms freshness | 8 | 0 | 7 |
| .github/workflows/check-vercel-rewrites.yml | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 6 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-22 18:14 (cheap pulse — 6/6 proposals verified+promoted #9536-9541, +1 companion ai-fix filed #9551)
- 2026-10-22 12:17 (daily deep run — 8/8 proposals verified+promoted #9518-9525, +1 new ai-fix filed #9535)
- 2026-10-22 00:33 (cheap pulse — 8/8 proposals verified+promoted, #9487-9492/9494-9495)
- 2026-10-22 06:18 (early pulse — 8/8 proposals verified+promoted, #9499-9506)
- 2026-10-23 00:29 (cheap pulse — 8/8 proposals verified+promoted, #9554-9562 excl. #9558)
- 2026-10-23 06:19 (cheap pulse — 6/6 proposals verified+promoted, #9567-9572)

## 📦 Shipped to main (13)

- #9593 fix: #9571 SEO: Eloy Casagrande genreGearGuides.js fabricates Speed Cobra pedal + oversimplified 'Paiste 2002' cymbal setup
- #9592 fix: #9570 SEO: Bill Ward genreGearGuides.js falsely claims he has no MetalForge gear profile (10 lines, 5 doom-metal guides)
- #9591 fix: #9569 SEO: Alex Bent genreGearGuides.js presents him as current Trivium member — he departed Oct 2025
- #9590 fix: #9567 SEO batch: Ben Koller genreGearGuides.js cymbal + kit fabrications (62 lines, 6 guide families)
- #9589 fix: #9568 SEO: Scott Travis genreGearGuides.js power-metal drumsticks guide fabricates Vic Firth 5A — verified 5B
- #9583 fix: #9561 SEO: Dave Lombardo genreGearGuides.js thrash hi-hat guide fabricates 14" Paiste RUDE/2002 hi-hats — verified 15" Sound Edge; ride FAQ says wrong 20" size
- #9581 fix: #9562 SEO: Travis Orbin genreGearGuides.js drum-triggers/kit guides still claim he played on Periphery's 2010 self-titled debut — he left Feb 2009, pre-recording
- #9579 fix: #9560 SEO: Mario Duplantier genreGearGuides.js ride-cymbal guide still fabricates 'Paiste Twenty Custom Full Ride' — sibling gap left by #8387/#8416
- #9578 fix: #9559 SEO: Brann Dailor genreGearGuides.js post-metal pedal guide contradicts doom/sludge guides — single vs double Tama Speed Cobra
- #9577 fix: #9557 SEO: Danny Carey genreGearGuides.js doom-metal guide family relapsed — Custom Maple/dual-kick/Paiste RUDE/Tama Iron Cobra fabrications regrew after 6 prior closed fixes
- #9576 fix: #9556 SEO: Abe Cunningham genreGearGuides.js china guide fabricates 18" Zildjian K Custom China — verified 19" Zildjian A Custom China
- #9575 fix: #9554 SEO: Aquiles Priester genreGearGuides.js — fabricated '2023 Angra return' persists across 8 guide families (29 lines), missed by #9551/#9537
- #9573 fix: #9555 SEO: Hannes Grossmann genreGearGuides.js snare guide backdates DW Collector's snare to the pre-2014 Necrophagist/Obscura era — verified Tama S.L.P. G-Maple

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2041h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2137h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2314h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3399h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5829h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
