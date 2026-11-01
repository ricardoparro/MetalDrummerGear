# MetalForge — Digest

*Generated 2026-11-01 08:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 13 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **17** |
| Issues closed in window | 17 |
| Commits to `main` in window | 22 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **437** |
| Sessions | 493 |
| Page views | 700 |
| Engagement rate | 60.65% |
| GSC impressions | 18,269 |
| GSC clicks | 292 |
| GSC CTR | 1.60% |
| GSC avg position | 9.0 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,000 |
| Est. ad revenue / mo | **~€9.00** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (111× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 648 tracked queries) | 23 clicks · 13437 impr · CTR 0.2% · avg pos 10.5 | clicks (−7) · impr (+2252) · pos (+0.7) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **39/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 238/249 indexed (+1) · rotating sample: 191/248 indexed · **full site: 2268 of 3159 sitemap URLs earned impressions (90d)** | 27 rejected-quality · 17 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1139ms · **worst: Album article (Sacrament drum setup) — 51 perf, LCP 12.1s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+6) · TBT (−533)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 16 (+1)
- 🆕 New this week: es.search.yahoo.com
- Top sources: m.facebook.com (11) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 22d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 26d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 55d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 17 | 17 | 0 |
| Verify YouTube Videos | 17 | 9 | 8 |
| Check Sitemap Drift | 16 | 8 | 8 |
| Verify Data Modules | 16 | 8 | 8 |
| Check llms freshness | 9 | 0 | 9 |
| Perf Budget Gate | 8 | 0 | 8 |
| .github/workflows/check-vercel-rewrites.yml | 8 | 0 | 8 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |
| Check performance (L4) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-01 06:12 (cheap pulse, pre-deep-run — 7/8 proposals promoted, 1 held #10031-10038)
- 2026-11-01 00:23 (cheap pulse — 8/8 proposals verified+promoted #10021-10028)
- 2026-10-31 18:08 (mid-day pulse — 8/8 proposals verified+promoted #10000-10007)
- 2026-10-31 12:09 (daily deep run — 5/5 proposals verified+promoted #9988-9992)
- 2026-10-31 00:18 (cheap pulse — 4/4 proposals verified+promoted #9968-9971)
- 2026-10-31 06:10 (cheap pulse, pre-deep-run — 7/7 proposals verified+promoted #9976-9982)

## 📦 Shipped to main (17)

- #10066 fix: #10038 SEO: kitQuizData.js Joey Jordison quiz answer names nonexistent 'Pearl Masters Maple Reserve' kit — verified Pearl Masters Premium Maple
- #10057 fix: #10037 SEO: kitQuizData.js Gene Hoglan snare regressed to fabricated model after ground-truth was corrected to 'not independently verified'
- #10056 fix: #10036 SEO: kitQuizData.js Danny Carey quiz answer wrong drums + pedal (Sonor Designer Series / DW 9000) vs verified Sonor SQ2 Heavy Beech / Sonor Giant Step
- #10055 fix: #10035 SEO: Matt Greiner's current-tense Pearl snare survives in 7 drummerComparisons.js locations — wording variant missed by closed #9915
- #10054 fix: #10034 SEO: igor-cavalera-vs-vinnie-paul drummerComparisons.js gear field flat-states Igor's old Tama era as undated current fact
- #10053 fix: #10033 SEO: Flo Mounier drummerComparisons.js snare model desynced from extendedBios.js (S.L.P. Classic Dry Aluminum vs Starclassic Maple)
- #10052 fix: #10031 SEO: Vinnie Paul drummerComparisons.js states unverified '8-inch-deep steel' snare as fact (nick-menza-vs-vinnie-paul)
- #10051 fix: #10023 SEO: gearSearchData.js Charlie Benante snare field wrongly defaults to Tama S.L.P. placeholder
- #10049 fix: #10027 SEO: gearNews.js Brann Dailor hi-hat item fabricates Meinl Mb8, verified Meinl Byzance
- #10048 fix: #10028 SEO: drummersByKit.js Tomas Haake Sonor SQ2 start year wrong (2002 vs verified 2005)
- #10047 fix: #10026 SEO: signatureGear.js Dave Lombardo ProMark 2Bx stick spec wrong (model code, tip, taper, length)
- #10045 fix: #10025 SEO: albumArticles/jay-weinberg.js states 2013 Slipknot join year, verified 2014
- #10044 fix: #10024 SEO: gearSearchData.js Mike Portnoy snare field wrongly defaults to Tama S.L.P. placeholder
- #10042 fix: #10022 SEO: Abe Cunningham soundLikeGuides.js kit shell material wrong (Maple/Bubinga hybrid vs verified pure Bubinga)
- #10040 fix: #10021 SEO: Jaska Raatikainen soundLikeGuides.js kit model + cymbal series wrong (Pearl Masters Custom, Zildjian A Series)
- _+2 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2257h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2353h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2530h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3615h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6045h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
