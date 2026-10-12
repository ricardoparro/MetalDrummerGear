# MetalForge — Digest

*Generated 2026-10-12 08:37 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **22** |
| Open `seo-proposal` issues | 9 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 2 |
| PRs merged in window | **17** |
| Issues closed in window | 17 |
| Commits to `main` in window | 24 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **387** |
| Sessions | 439 |
| Page views | 614 |
| Engagement rate | 57.63% |
| GSC impressions | 9,884 |
| GSC clicks | 187 |
| GSC CTR | 1.89% |
| GSC avg position | 7.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,631 |
| Est. ad revenue / mo | **~€7.89** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (127× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 534 tracked queries) | 27 clicks · 3342 impr · CTR 0.8% · avg pos 9.5 | clicks (−8) · impr (−83) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **27/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 238/250 indexed (−2) · rotating sample: 234/250 indexed · **full site: 2269 of 3162 sitemap URLs earned impressions (90d)** | 3 rejected-quality · 12 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 75 perf · TBT 1163ms · **worst: Top-10 list (best death metal drummers) — 50 perf, LCP 12.8s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+4) · TBT (−691)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (±0)
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 19d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 42d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 46d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| Check Sitemap Drift | 19 | 9 | 8 |
| Verify YouTube Videos | 18 | 9 | 7 |
| Verify Data Modules | 17 | 8 | 8 |
| PR Merger | 11 | 10 | 0 |
| Check llms freshness | 11 | 0 | 9 |
| .github/workflows/check-vercel-rewrites.yml | 9 | 0 | 9 |
| Perf Budget Gate | 9 | 0 | 8 |
| Verify API Modules | 2 | 1 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Check GSC watched queries | 1 | 1 | 0 |
| Check backlink signal | 1 | 1 | 0 |
| Check LLM citations | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-12 00:37 (evening-review catch-up — 8/8 proposals verified+promoted #8924-8932, follow-up #8934 filed)
- 2026-10-11 18:16 (mid-day pulse — 7/7 proposals verified+promoted, #8903-8909)
- 2026-10-11 12:17 (deep run — 8/8 proposals verified+promoted, #8887-8894)
- 2026-10-11 06:19 (cheap pulse — 8/8 fresh proposals verified+promoted, #8871-8878)
- 2026-10-11 00:36 — Evening-review catch-up: 8/8 fresh proposals verified+promoted (#8863-8870), 4 clean + 4 with tighten
- 2026-10-12 06:30 (cheap pulse — 6/7 proposals verified+promoted, 1 closed stale, #8935-8941)

## 📦 Shipped to main (17)

- #8967 fix: #8958 SEO: Vinnie Paul gear-evolution page has a third fabrication (Pearl, not Tama, for 1992-1996); FBD/Reinventing-the-Steel cross-reference also wrong
- #8966 fix: #8941 SEO: Brann Dailor albumArticles.js fabricates an entire 'Sabian HHX' cymbal era for Leviathan (2004) across 20 occurrences — verified continuous Meinl since 2004
- #8964 fix: #8940 SEO: top10Lists.js credits Travis Orbin with playing on Periphery's 2010 self-titled debut (6 locations) — he left in 2009, never recorded a Periphery album
- #8963 fix: #8939 SEO: Richard Christy drummerEvolution.js 1996-1999 Death/Control Denied eras still fabricate 'Pearl double pedal' — #8268 only fixed the 2009-Present era, verified Axis A Longboard since 1998
- #8962 fix: #8938 SEO: Aquiles Priester albumArticles.js line 83 self-contradicts as Evans heads user — verified Remo since 1996 (same file says Remo at line 397)
- #8961 fix: #8937 SEO: Gene Hoglan albumArticles.js 'Brotherhood of the Snake' (2016) article fabricates Pearl endorsement 2 years early — verified Pearl since 2018
- #8959 fix: #8936 SEO: Vinnie Paul albumArticles.js + extendedBios.js fabricate an entire 'Remo drums' era (1992-1996) — root cause of 5 prior misguided fixes, verified Tama through 1996 then Pearl
- #8957 fix: #8935 SEO: Chris Adler drummerComparisons.js fabricates 'Mapex Black Panther Design Lab' kit across 12 locations — verified Mapex Saturn Satin Black Maple Burl
- #8951 fix: #8934 SEO: sweep remaining 'Atlas Pro'/Bill Ward and 'G Class'/John Otto fabrications (gearPriceHistory.js, pedals.js, extendedBios.js, soundLikeGuides.js, studies/*)
- #8950 fix: #8932 SEO batch: drummerComparisons.js 'Pearl Demon Drive' misattributed to George Kollias, Mike Mangini, Matt Halpern (15 lines, 3 drummers)
- #8949 fix: #8928 SEO: pedalBrands.js Ludwig entry fabricates 'Atlas Pro' double pedal for Bill Ward — verified Ludwig Speed King (single) since 1970
- #8948 fix: #8930 SEO: Ray Luzier soundLikeGuides.js drum kit model fabricated as 'Pearl Masters Maple Complete' across 5 locations — verified Pearl Reference Maple since 2013
- #8947 fix: #8931 SEO: Daray top10Lists.js FAQ lines (symphonic/gothic metal) still say Pearl drums — verified Tama Starclassic Performer B/B since 2014
- #8946 fix: #8929 SEO: pedalBrands.js Gibraltar entry fabricates 'G Class' pedal for John Otto — verified Gibraltar Professional Series since 1999
- #8944 fix: #8927 SEO: Navene Koperweis gearComparisons.js fabricates DW 'Collector's Series Maple' in 2 comparisons — verified Performance Series since 2015
- _+2 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1777h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1873h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2051h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3135h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5566h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
