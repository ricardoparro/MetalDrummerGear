# MetalForge — Digest

*Generated 2026-10-22 19:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **27** |
| Open `seo-proposal` issues | 16 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 3 |
| PRs merged in window | **17** |
| Issues closed in window | 17 |
| Commits to `main` in window | 22 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **448** |
| Sessions | 511 |
| Page views | 670 |
| Engagement rate | 58.12% |
| GSC impressions | 20,593 |
| GSC clicks | 236 |
| GSC CTR | 1.15% |
| GSC avg position | 8.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,871 |
| Est. ad revenue / mo | **~€8.61** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (116× current) |

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
| PR Merger | 58 | 57 | 0 |
| .github/workflows/check-vercel-rewrites.yml | 21 | 0 | 21 |
| Roadie (Watcher + Implementer) | 6 | 6 | 0 |
| Health Check | 4 | 4 | 0 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |
| Check llms freshness | 1 | 0 | 1 |

## 🧠 Today's CEO decisions

- 2026-10-22 18:14 (cheap pulse — 6/6 proposals verified+promoted #9536-9541, +1 companion ai-fix filed #9551)
- 2026-10-22 12:17 (daily deep run — 8/8 proposals verified+promoted #9518-9525, +1 new ai-fix filed #9535)
- 2026-10-22 00:33 (cheap pulse — 8/8 proposals verified+promoted, #9487-9492/9494-9495)
- 2026-10-21 00:27 (cheap pulse — 7/7 proposals verified+promoted, #9417-9423)
- 2026-10-21 06:18 (cheap pulse — 8/8 proposals verified+promoted, #9433-9441)
- 2026-10-21 12:16 (mid-day pulse — 8/8 proposals verified+promoted, #9449-9456)

## 📦 Shipped to main (17)

- #9550 fix: #9535 SEO: Eloy Casagrande gear-history/cymbals-setup llms files — wrong Sepultura exit year + divergent 9-piece cymbal rig
- #9549 fix: #9525 SEO: Charlie Benante llms mirror — self-contradicting double-pedal FAQ (cross-contaminated from Eloy Casagrande's text)
- #9548 fix: #9524 SEO: Matt Halpern llms mirror — wrong join year, fabricated snare/sticks/cymbal names, wrong song-album years
- #9547 fix: #9523 SEO: Travis Orbin llms mirror — fabricates Periphery album tenure + entire wrong gear rig (DW/Meinl/Remo vs SJC/Zildjian/Evans)
- #9546 fix: #9522 SEO: Dave Lombardo llms mirror — fabricated signature snare/shell, wrong ride and hi-hat models
- #9545 fix: #9521 SEO: Brann Dailor llms mirror — fabricated DW/Vic Firth/Remo rig (verified Tama/Vater/Evans, pedal Tama not DW)
- #9544 fix: #9520 SEO: Danny Carey llms mirror — fabricated snare shell/depth, wrong cymbal line name, wrong pedal brand
- #9543 fix: #9519 SEO: Eloy Casagrande llms mirror — entirely frozen in pre-2024 Sepultura framing, no Slipknot mention (#3 GA4 page)
- #9542 fix: #9518 SEO: Mario Duplantier llms mirror — fabricated kit wood/snare/cymbal brand/sticks + stale single-kick framing (#2 GA4 page)
- #9534 fix: #9506 SEO: Chris Adler llms mirror — fabricated Vic Firth sticks/Meinl Mb20/Mapex pedal (verified Promark TX5AXW signature/Byzance Dark-Transition/Trick Pro V)
- #9533 fix: #9505 SEO: Daray llms mirror — Vader tenure still '2006-2016' + kit chronology backwards, gap #9127 explicitly flagged but its fix PR never touched this file
- #9532 fix: #9503 SEO: Nick Augusto llms mirror — entire gear rig fabricated as Tama/Meinl/Promark, already fixed in soundLikeGuides.js by #6605 but never synced
- #9531 fix: #9504 SEO: Flo Mounier llms mirror — fabricated Pearl/Remo rig, already fixed in soundLikeGuides.js by #8047/#8265 but never synced
- #9529 fix: #9502 SEO: Morgan Ågren llms mirror — fabricated Meinl/DW cymbals+pedal + wrong snare depth, both already fixed in soundLikeGuides.js (#6575, #9407) but never synced
- #9528 fix: #9501 SEO: Jay Weinberg llms mirror — frames him as current Slipknot member + fabricated Pearl/Sabian/Remo gear (verified Former Slipknot/Former Suicidal Tendencies, SJC/Zildjian/Vater/Evans)
- _+2 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2028h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2124h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2301h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3386h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5816h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
