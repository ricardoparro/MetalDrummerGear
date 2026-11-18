# MetalForge — Digest

*Generated 2026-11-18 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 16 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **16** |
| Issues closed in window | 15 |
| Commits to `main` in window | 20 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **738** |
| Sessions | 804 |
| Page views | 1,023 |
| Engagement rate | 47.26% |
| GSC impressions | 12,396 |
| GSC clicks | 258 |
| GSC CTR | 2.08% |
| GSC avg position | 7.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,384 |
| Est. ad revenue / mo | **~€13.15** |
| Progress to €1000/mo | 1.3% |
| Pageviews/mo needed for €1000 | ~333,333 (76× current) |

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
| Chris Adler — 54º aniversário | 5d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 9d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 38d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 67d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 26 | 26 | 0 |
| Verify YouTube Videos | 17 | 9 | 8 |
| Verify Data Modules | 16 | 8 | 8 |
| Check Sitemap Drift | 16 | 8 | 8 |
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

- 2026-11-18 06:14 (cheap pulse — 7/7 proposals verified+promoted #10801-10807)
- 2026-11-18 00:19 (cheap pulse — 8/8 proposals verified+promoted #10793-10800)
- 2026-11-17 18:09 (mid-day pulse — 5/5 proposals verified+promoted #10774-10778)
- 2026-11-17 12:10 (deep run — 8/8 proposals verified+promoted #10763-10770; L1/L2/L3 not due this run)
- 2026-11-17 00:19 (cheap pulse — 8/8 proposals verified+promoted #10734-10741)
- 2026-11-17 06:12 (cheap pulse — 7/8 proposals verified+promoted #10742-10748, 1 rejected #10749)

## 📦 Shipped to main (16)

- #10831 fix: #10807 SEO: snares.js header comment + top10ListsCatalog.js signature-snare list still classify Danny Carey as unverified — root has verified:true since 2026-08-08 (same bug class as #10763, which only fixed Charlie Benante)
- #10830 fix: #10806 SEO: kitQuizData.js Question 10 (Vinnie Paul) asserts specific drums/cymbals/hardware models that root explicitly hedges as unverified — hardware brand is flat-out wrong (DW vs ddrum)
- #10829 fix: #10805 SEO: kitQuizData.js Question 9 (Mario Duplantier) fabricates signature snare model + wrong pedal line/configuration
- #10828 fix: #10805 SEO: kitQuizData.js Question 9 (Mario Duplantier) fabricates signature snare model + wrong pedal line/configuration
- #10826 fix: #10804 SEO: kitQuizData.js Question 7 (Mike Portnoy) drums field copy-pasted from Dave Lombardo's entry + fabricated 'Rolling Glide' pedal name
- #10822 fix: #10803 SEO: kitQuizData.js Question 6 (George Kollias) fabricates a signature snare model + wrong pedal name — root marks snare unverified, pedal is Demon XR not 'Demon Drive Direct'
- #10817 fix: #10802 SEO: extendedBios.js Joey Jordison self-contradicts its own FAQ — metaTitle/metaDescription + one FAQ answer still say 'Pearl Masters Premium Maple', another FAQ answer already says 'Pearl Reference Series'
- #10816 fix: #10801 SEO: kitQuizData.js Joey Jordison quiz drums field re-drifted to stale 'Pearl Masters Premium Maple' — root is now 'Pearl Reference Series'
- #10815 fix: #10798 SEO batch: snares.js fabricates 'Pearl Reference 14x6.5" Brass' as verified fact for 2 drummers whose root records were already corrected to unverified (Ryan Van Poederooyen, Jocke Wallgren) — residual of closed #10398 (~2 entries)
- #10814 fix: #10800 SEO: Shannon Larkin root api/drummers/index.js still says Sabian 'HHX' ride — cymbalSetups.js/drummerComparisons.js/top10Lists.js already fixed to AAX-only by #8974, root never touched
- #10813 fix: #10799 SEO: Sean Reinert cymbalSetups.js fabricates a piece-level A/K breakdown from his superseded pre-2008 era — root (#7648) corrected gear.cymbals to final K Custom Series
- #10812 fix: #10797 SEO: Daray's snares.js entry fabricates 'Pearl Reference 14x5.5" Brass' — verified snare is Tama S.L.P. Black Brass LBR1465 (George Kollias cross-contamination pattern)
- #10811 fix: #10796 SEO: Jaska Raatikainen root kitOverview calls Pearl Eliminator 'direct-drive' — pedalBrands.js/pedalReferencePages.js classify Eliminator as chain-drive, pedals.js itself leaves it unspecified
- #10810 fix: #10793 SEO: Adrian Erlandsson's Vic Firth sticks called an 'official signature model' in root + endorsementNews.js, but drumsticks.js's own sourced note denies it
- #10809 fix: #10795 SEO: Nicko McBrain pedals.js single-pedal entry still has brand:null/model:null — root's #10768 fix identified it as DW 5000 Series
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 355h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2665h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2761h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2938h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4023h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
