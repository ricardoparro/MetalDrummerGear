# MetalForge — Digest

*Generated 2026-10-22 08:21 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **16** |
| Issues closed in window | 16 |
| Commits to `main` in window | 20 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **432** |
| Sessions | 493 |
| Page views | 649 |
| Engagement rate | 58.82% |
| GSC impressions | 16,971 |
| GSC clicks | 203 |
| GSC CTR | 1.20% |
| GSC avg position | 8.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,781 |
| Est. ad revenue / mo | **~€8.34** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (120× current) |

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
| Mikkey Dee — 63º aniversário | 9d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 32d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 36d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 65d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 33 | 33 | 0 |
| .github/workflows/check-vercel-rewrites.yml | 19 | 0 | 19 |
| Verify YouTube Videos | 11 | 7 | 4 |
| Verify Data Modules | 10 | 6 | 4 |
| Check Sitemap Drift | 10 | 0 | 10 |
| Check llms freshness | 5 | 0 | 5 |
| Perf Budget Gate | 4 | 0 | 4 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-22 00:33 (cheap pulse — 8/8 proposals verified+promoted, #9487-9492/9494-9495)
- 2026-10-21 00:27 (cheap pulse — 7/7 proposals verified+promoted, #9417-9423)
- 2026-10-21 06:18 (cheap pulse — 8/8 proposals verified+promoted, #9433-9441)
- 2026-10-21 12:16 (mid-day pulse — 8/8 proposals verified+promoted, #9449-9456)
- 2026-10-21 18:14 (afternoon pulse — 8/8 proposals verified+promoted, #9465-9472)
- 2026-10-22 06:18 (early pulse — 8/8 proposals verified+promoted, #9499-9506)

## 📦 Shipped to main (16)

- #9534 fix: #9506 SEO: Chris Adler llms mirror — fabricated Vic Firth sticks/Meinl Mb20/Mapex pedal (verified Promark TX5AXW signature/Byzance Dark-Transition/Trick Pro V)
- #9533 fix: #9505 SEO: Daray llms mirror — Vader tenure still '2006-2016' + kit chronology backwards, gap #9127 explicitly flagged but its fix PR never touched this file
- #9532 fix: #9503 SEO: Nick Augusto llms mirror — entire gear rig fabricated as Tama/Meinl/Promark, already fixed in soundLikeGuides.js by #6605 but never synced
- #9531 fix: #9504 SEO: Flo Mounier llms mirror — fabricated Pearl/Remo rig, already fixed in soundLikeGuides.js by #8047/#8265 but never synced
- #9529 fix: #9502 SEO: Morgan Ågren llms mirror — fabricated Meinl/DW cymbals+pedal + wrong snare depth, both already fixed in soundLikeGuides.js (#6575, #9407) but never synced
- #9528 fix: #9501 SEO: Jay Weinberg llms mirror — frames him as current Slipknot member + fabricated Pearl/Sabian/Remo gear (verified Former Slipknot/Former Suicidal Tendencies, SJC/Zildjian/Vater/Evans)
- #9527 fix: #9500 SEO: Mike Mangini llms mirror — fabricated Pearl→DW/Meinl/Vic Firth gear + omits 2023 DT exit/Godsmack move (verified Pearl/Sabian/Vater, tenure 2010-2023 + Godsmack 2026-present)
- #9526 fix: #9499 SEO: Matt Garstka llms mirror — entire gear rig fabricated as Tama/Meinl/Vic Firth-5A (verified DW Collector's Series/Byzance Dual/signature SGAR sticks)
- #9517 fix: #9491 SEO: George Kollias genreGearGuides.js — fabricated kit/cymbal/pedal brand across 13+ guide families (verified Pearl Masterworks / Zildjian A Custom / Pearl Demon XR)
- #9514 fix: #9495 SEO: Bill Ward llms mirror — fabricated Ludwig kit model + wrong cymbal brand (verified Ludwig Standard/Club Date + Zildjian Avedis, not Paiste)
- #9513 fix: #9494 SEO: Mikkey Dee llms mirror — fabricated Pearl/Paiste2002/DW/VicFirth gear (verified Sonor/Paiste Signature/DW5000/Wincent)
- #9511 fix: #9492 SEO: Mike Portnoy llms mirror — fabricated Pearl/Meinl/Vater gear + wrong album count (verified Tama/Sabian/Promark, ten albums)
- #9510 fix: #9490 SEO: Matt Halpern genreGearGuides.js — fabricated 'Pearl Eliminator' pedal across metalcore + djent pedal guides (verified Pearl Demon Drive)
- #9509 fix: #9489 SEO: Matt Halpern genreGearGuides.js — fabricated 'Pearl Reference Pure' kit model across djent kit + bass-drum guides (verified Pearl Reference Series)
- #9508 fix: #9488 SEO: Matt Halpern genreGearGuides.js — fabricated snare model/size across djent + metalcore snare guides (verified Pearl MH1460/B 14x6" brass)
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2017h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2113h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2290h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3375h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5805h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
