# MetalForge — Digest

*Generated 2026-11-19 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 13 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **12** |
| Issues closed in window | 12 |
| Commits to `main` in window | 16 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **772** |
| Sessions | 840 |
| Page views | 1,107 |
| Engagement rate | 46.67% |
| GSC impressions | 14,926 |
| GSC clicks | 305 |
| GSC CTR | 2.04% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,744 |
| Est. ad revenue / mo | **~€14.23** |
| Progress to €1000/mo | 1.4% |
| Pageviews/mo needed for €1000 | ~333,333 (70× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 863 tracked queries) | 38 clicks · 5252 impr · CTR 0.7% · avg pos 10.8 | clicks (+4) · impr (−721) · pos (−0.2) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **13/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 226/250 indexed (−9) · rotating sample: 141/250 indexed · **full site: 2272 of 3158 sitemap URLs earned impressions (90d)** | 39 rejected-quality · 35 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1188ms · **worst: Album article (Sacrament drum setup) — 52 perf, LCP 11.0s** · 2/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (±0) · TBT (+49)ms · chronic (−2) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 20 (+1)
- 🆕 New this week: facebook.com
- Top sources: aocr.org (11) · uk.search.yahoo.com (8) · m.facebook.com (4) · facebook.com (3) · noai.duckduckgo.com (3)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 4d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 8d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 37d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 66d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 27 | 27 | 0 |
| Verify YouTube Videos | 17 | 9 | 8 |
| Check Sitemap Drift | 16 | 8 | 8 |
| Verify Data Modules | 15 | 7 | 8 |
| Check llms freshness | 9 | 0 | 9 |
| Perf Budget Gate | 8 | 0 | 8 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-18 12:10 (deep run — 8/8 proposals verified+promoted #10818-10827; L1/L2/L3 not due)
- 2026-11-18 06:14 (cheap pulse — 7/7 proposals verified+promoted #10801-10807)
- 2026-11-18 00:19 (cheap pulse — 8/8 proposals verified+promoted #10793-10800)
- 2026-11-18 18:08 (cheap pulse — 2/2 proposals verified+promoted #10832/#10833)
- 2026-11-19 00:19 (cheap pulse — 5/5 proposals verified+promoted #10844-10848)
- 2026-11-19 06:15 (cheap pulse — 7/7 proposals verified+promoted #10849-10855)

## 📦 Shipped to main (12)

- #10873 fix: #10855 SEO: gearPriceHistory.js fabricates Tim Yeung '200-280 BPM' speed-per-dollar framing as documented fact (3 locations)
- #10872 fix: #10854 SEO: drummerEvolution.js fabricates Tim Yeung '200-280 BPM' as documented fact (2 FAQ locations)
- #10871 fix: #10853 SEO batch: soundLikeGuides.js 'how-to-sound-like-pete-sandoval' guide fabricates '300+ BPM' as verified fact (6 factual-claim locations)
- #10870 fix: #10852 SEO batch: soundLikeGuides.js 'how-to-sound-like-tim-yeung' guide fabricates '280 BPM' as verified/documented fact (~13 locations in one guide)
- #10869 fix: #10851 SEO: drummerComparisons.js fabricates Tim Yeung '280 BPM' blast speed as 'verified'/'documented' fact (4 locations)
- #10868 fix: #10850 SEO: top10Lists.js fabricates Derek Roddy '260 BPM swivel' + unsourced Sandoval/Mounier BPM figures as verified fact (6 locations)
- #10867 fix: #10849 SEO batch: genreGearGuides.js fabricates Derek Roddy '260 BPM swivel technique' as verified fact (~15 locations) — root has zero BPM figure for him
- #10861 fix: #10848 SEO: gearSearchData.js John Otto snare still 'pearl-sensitone' — root now has a verified OCDP snare model (#7021 deliberately deferred this)
- #10860 fix: #10847 SEO: licks/george-kollias.js fabricates 280+/255 BPM blast-beat claims — verified ceiling is 240+ BPM
- #10859 fix: #10846 SEO: drummerComparisons.js states Vinnie Paul's unverified Tama-era snare as flat '14x6.5 Tama steel' fact — self-contradicts the file's own FAQ hedge (5 locations, 2 entries)
- #10858 fix: #10844 SEO: pedalReferencePages.js asserts George Kollias's Demon XR as 'direct drive' — pedals.js itself leaves driveType null
- #10856 fix: #10845 SEO: gearCategoryPages.js editorialIntro fabricates 4 drummer-gear pairings (Jordison/Tama, Ulrich/Ludwig, Hoglan/Pearl Free-Floating, McBrain/Tama)

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 379h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2689h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2785h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2962h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4047h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
