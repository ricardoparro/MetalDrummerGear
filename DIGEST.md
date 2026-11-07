# MetalForge — Digest

*Generated 2026-11-07 08:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **15** |
| Issues closed in window | 15 |
| Commits to `main` in window | 19 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **420** |
| Sessions | 484 |
| Page views | 692 |
| Engagement rate | 60.74% |
| GSC impressions | 13,008 |
| GSC clicks | 243 |
| GSC CTR | 1.87% |
| GSC avg position | 8.4 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,966 |
| Est. ad revenue / mo | **~€8.90** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (112× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 775 tracked queries) | 39 clicks · 9064 impr · CTR 0.4% · avg pos 10.9 | clicks (+16) · impr (−4373) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **17/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 237/250 indexed (−1) · rotating sample: 194/250 indexed · **full site: 2270 of 3159 sitemap URLs earned impressions (90d)** | 29 rejected-quality · 21 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1139ms · **worst: Album article (Sacrament drum setup) — 51 perf, LCP 12.1s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+6) · TBT (−533)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 17 (+1)
- 🆕 New this week: oceanhero.today
- Top sources: uk.search.yahoo.com (5) · m.facebook.com (4) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 16d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 20d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 49d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 59 | 59 | 0 |
| Check llms freshness | 16 | 0 | 16 |
| Health Check | 4 | 4 | 0 |
| Verify YouTube Videos | 3 | 2 | 1 |
| Check Sitemap Drift | 2 | 1 | 1 |
| Verify Data Modules | 2 | 1 | 1 |
| Verify API Modules | 2 | 1 | 1 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Perf Budget Gate | 1 | 0 | 1 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-07 06:13 (cheap pulse — 7/7 proposals verified+promoted #10398-10404, relapse found+filed #10412)
- 2026-11-07 00:17 (cheap pulse — 7/7 proposals verified+promoted #10385-10395)
- 2026-11-06 00:20 (cheap pulse — 8/8 proposals verified+promoted #10327-10334)
- 2026-11-06 06:14 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10335-10342)
- 2026-11-06 12:11 — daily deep run: 7/7 fresh proposals verified+promoted #10352-10358
- 2026-11-06 18:10 (mid-day pulse — 8/8 proposals verified+promoted #10368-10375)

## 📦 Shipped to main (15)

- #10428 fix: #10412 SEO: fictional 'Greiner & Kilmer' drum company relapsed in best-snare/drum-kits-for-mathcore.md — #7824's fix didn't hold
- #10427 fix: #10404 SEO: public/llms/gear-comparison/drummers-using-ludwig-classic-maple.md fabricates Bill Ward's drum series + invents unverified Art Cruz series specificity
- #10426 fix: #10403 SEO: public/llms/gear-comparison/drummers-using-mapex-armory.md fabricates Jason Bittner's series name + invents a Matt Halpern Mapex side-kit (verified exclusively Pearl)
- #10425 fix: #10402 SEO: public/llms/gear-comparison/drummers-using-dw-collectors-maple.md fabricates Mike Portnoy + Matt Greiner's entire rigs, incl. a fictional 'Greiner & Kilmer' signature snare
- #10424 fix: #10401 SEO: public/llms/gear-comparison/drummers-using-pearl-masters-maple.md fabricates Paul Mazurkiewicz's drum series and bass-drum spec — verified Pearl Reference
- #10423 fix: #10400 SEO: public/llms/gear-comparison/drummers-using-tama-star-classic-maple.md fabricates Jay Weinberg as a Tama user — verified SJC Custom Drums
- #10422 fix: #10399 SEO: public/llms/gear-comparison/drummers-using-sonor-sq2.md fabricates Gene Hoglan as a Sonor SQ2 user — verified Pearl Reference Pure
- #10421 fix: #10398 SEO: api/drummers/index.js source-of-truth still states fabricated 'Pearl Reference 14x6.5" Brass' snare as verified fact for 5 drummers, feeding gearIndex.js + gear-series/gear-comparison mirrors
- #10411 fix: #10395 SEO: public/llms/comparisons/shannon-larkin-vs-jay-weinberg.md fabricates Jay Weinberg's entire Slipknot-era gear + wrong Larkin birthplace
- #10410 fix: #10394 SEO: public/llms/comparisons/sean-reinert-vs-hannes-grossmann.md fabricates Sean Reinert's entire gear rig + wrong Grossmann birthplace
- #10409 fix: #10392 SEO: public/llms/comparisons/matt-greiner-vs-matt-halpern.md fabricates Matt Greiner's entire gear rig (Pearl/Sabian instead of verified Mapex/Paiste)
- #10408 fix: #10390 SEO: public/llms/comparisons/joey-jordison-vs-jay-weinberg.md fabricates Jay Weinberg's entire gear rig + wrong join date
- #10407 fix: #10387 SEO: public/llms/comparisons/jaska-raatikainen-vs-nicko-mcbrain.md still has pre-#10382 fabricated Nicko McBrain kit brand
- #10406 fix: #10385 SEO: public/llms/comparisons/bill-ward-vs-charlie-benante.md fabricates Bill Ward's kit model + wrong Sabbath tenure years
- #10405 fix: #10386 SEO: public/llms/comparisons/jaska-raatikainen-vs-matt-greiner.md fabricates fictional 'Greiner & Kilmer' drum company + wrong gear

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 91h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2401h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2497h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2674h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3759h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
