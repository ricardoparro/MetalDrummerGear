# MetalForge — Digest

*Generated 2026-10-20 19:13 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 19 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 5 |
| PRs merged in window | **15** |
| Issues closed in window | 15 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **406** |
| Sessions | 466 |
| Page views | 667 |
| Engagement rate | 63.09% |
| GSC impressions | 19,536 |
| GSC clicks | 252 |
| GSC CTR | 1.29% |
| GSC avg position | 8.6 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,859 |
| Est. ad revenue / mo | **~€8.58** |
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
| Mikkey Dee — 63º aniversário | 11d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 34d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 38d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 67d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 27 | 26 | 0 |
| Check Sitemap Drift | 14 | 0 | 9 |
| Verify Data Modules | 14 | 7 | 2 |
| Verify YouTube Videos | 14 | 7 | 2 |
| Check llms freshness | 7 | 0 | 2 |
| Perf Budget Gate | 7 | 0 | 2 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-20 12:16 (daily deep run — 7/7 proposals verified+promoted, #9386-9392)
- 2026-10-20 00:28 (cheap pulse — 8/8 proposals verified+promoted, #9356-9366)
- 2026-10-19 00:31 (evening-review catch-up for 10-18 — 6/6 proposals verified+promoted, #9310-9315)
- 2026-10-19 12:18 (daily deep run — L1/L2/L3 close-the-loop + 5/5 proposals promoted, #9334-9338, #9343 filed)
- 2026-10-19 06:25 (cheap pulse — 3/3 proposals verified+promoted, #9325-9327)
- 2026-10-19 18:14 (afternoon pulse — 6/6 proposals verified+promoted, #9344-9349)

## 📦 Shipped to main (15)

- #9416 fix: #9392 SEO: Joey Jordison soundLikeGuides.js — cymbal model names fabricate a non-existent 'Paiste Signature Series'
- #9414 fix: #9391 SEO: Jason Bittner soundLikeGuides.js — Shadows Fall join year conflated with endorsement year, wrong cymbal sizes, fabricated shell material
- #9413 fix: #9388 SEO: Hellhammer soundLikeGuides.js — fabricated shell material, snare shell, sticks model, and cymbal line (4 drift points)
- #9412 fix: #9390 SEO: Inferno (Behemoth) soundLikeGuides.js — sticks model missing 'Extreme' qualifier, 3 locations
- #9411 fix: #9389 SEO: Igor Cavalera soundLikeGuides.js — stale Tama-era framing, leftover Evans tuning tip, and pedal-era conflation
- #9410 fix: #9387 SEO: George Kollias soundLikeGuides.js — budgetSetups.pro + FAQ still fabricate 'Pearl Demon Drive' pedal
- #9409 fix: #9386 SEO: Gavin Harrison soundLikeGuides.js — fabricated kick/tom/floor-tom shell dimensions
- #9400 fix: #9377 SEO: Flo Mounier soundLikeGuides.js — wrong stick model, wrong snare size, fabricated cymbal lineup (survived #8047/#8265's brand-only fixes)
- #9399 fix: #9376 SEO: Daray soundLikeGuides.js fabricates a wrong-drummer, wrong-gear 'Death Cult Armageddon era' historical aside
- #9398 fix: #9375 SEO: Chris Adler soundLikeGuides.js — fabricated Meinl Mb20 cymbals, steel snare shell (self-contradicting), and budgetSetups Mapex Falcon pedal (sibling-field gap from #7626)
- #9397 fix: #9374 SEO: Blake Richardson soundLikeGuides.js — fabricated Bubinga snare + budgetSetups/description still frozen pre-2018 DW/Meinl era
- #9396 fix: #9372 SEO: Aquiles Priester soundLikeGuides.js fabricates an Angra 2023 'return' + wrong join year + misattributed Aqua (2010) credit
- #9395 fix: #9373 SEO: Art Cruz soundLikeGuides.js — fabricated 'Classic Maple/Oak' kit name, invented 2nd kick drum, wrong floor tom sizes, wrong snare shell material
- #9394 fix: #9371 SEO: Alex Rüdinger soundLikeGuides.js keySongs misattributes Trivium's 'Catastrophist' (Alex Bent's track)
- #9393 fix: #9370 SEO: Danny Carey soundLikeGuides.js budget-tier note cross-contaminates with Martin Lopez/Morgan Ågren's 'Designer' kit

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1980h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2076h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2253h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3338h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5768h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
