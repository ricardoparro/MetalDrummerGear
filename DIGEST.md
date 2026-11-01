# MetalForge — Digest

*Generated 2026-11-01 19:07 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **27** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 2 |
| PRs merged in window | **18** |
| Issues closed in window | 17 |
| Commits to `main` in window | 24 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **473** |
| Sessions | 529 |
| Page views | 751 |
| Engagement rate | 60.87% |
| GSC impressions | 18,269 |
| GSC clicks | 292 |
| GSC CTR | 1.60% |
| GSC avg position | 9.0 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,219 |
| Est. ad revenue / mo | **~€9.66** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (104× current) |

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
| PR Merger | 31 | 30 | 0 |
| Check Sitemap Drift | 15 | 8 | 5 |
| Verify YouTube Videos | 15 | 8 | 5 |
| Verify Data Modules | 14 | 8 | 4 |
| Perf Budget Gate | 7 | 0 | 5 |
| Check llms freshness | 6 | 0 | 4 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Verify API Modules | 2 | 1 | 1 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-01 18:08 (mid-day pulse — 7/7 proposals verified+promoted #10068-10074)
- 2026-11-01 12:13 (daily deep run — 8/8 proposals verified+promoted #10058-10065)
- 2026-11-01 06:12 (cheap pulse, pre-deep-run — 7/8 proposals promoted, 1 held #10031-10038)
- 2026-11-01 00:23 (cheap pulse — 8/8 proposals verified+promoted #10021-10028)
- 2026-10-31 18:08 (mid-day pulse — 8/8 proposals verified+promoted #10000-10007)
- 2026-10-31 12:09 (daily deep run — 5/5 proposals verified+promoted #9988-9992)

## 📦 Shipped to main (18)

- #10084 fix: #10065 SEO: api/drummers/index.js flat 'band' field desynced for Jay Weinberg + Alex Rüdinger; nameGeneratorData.js stale for Chris Adler
- #10083 fix: #10064 SEO: Lars Ulrich albumArticles.js Black Album (1991) era gear fabricated — drum kit, snare, and cymbals all contradict drummerEvolution.js
- #10082 fix: #10063 SEO: Eloy Casagrande albumArticles.js wholesale-fabricates 'Tama S.L.P. Sonic Steel' snare + 'Speed Cobra' pedal across entire file — verified Bell Brass BB146 / Iron Cobra
- #10080 fix: #10062 SEO: Jaska Raatikainen albumArticles.js fabricates 'DW 5000' pedal for 1999 Hatebreeder era — contradicts the file's own Pearl Eliminator claims + ground truth
- #10079 fix: #10061 SEO: Aquiles Priester albumArticles.js fabricates Angra tenure dates, a 2023 'return', Aqua (2010) credit, and W.A.S.P. tenure
- #10078 fix: #10050 📉 L4 Performance Watch — 4 chronically slow
- #10077 fix: #10060 SEO: Daray albumArticles.js Vader tenure fabricated as '2006-2016' + 2 album Kairos violations (verified 2004-2008)
- #10076 fix: #10059 SEO: Daniel Erlandsson albumArticles.js credits him with Stigmata (1998, actually Peter Wildoer) + misdates Wages of Sin as 2002 (verified 2001, 19+ locations)
- #10075 fix: #10058 SEO: Gene Hoglan albumArticles.js/licks.js fabricate Death's Human (1991) + Testament's Low/Gathering credits, plus internal birthdate contradiction
- #10067 Fix P0 crawler routing and LLM content freshness
- #10066 fix: #10038 SEO: kitQuizData.js Joey Jordison quiz answer names nonexistent 'Pearl Masters Maple Reserve' kit — verified Pearl Masters Premium Maple
- #10057 fix: #10037 SEO: kitQuizData.js Gene Hoglan snare regressed to fabricated model after ground-truth was corrected to 'not independently verified'
- #10056 fix: #10036 SEO: kitQuizData.js Danny Carey quiz answer wrong drums + pedal (Sonor Designer Series / DW 9000) vs verified Sonor SQ2 Heavy Beech / Sonor Giant Step
- #10055 fix: #10035 SEO: Matt Greiner's current-tense Pearl snare survives in 7 drummerComparisons.js locations — wording variant missed by closed #9915
- #10054 fix: #10034 SEO: igor-cavalera-vs-vinnie-paul drummerComparisons.js gear field flat-states Igor's old Tama era as undated current fact
- _+3 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2268h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2364h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2541h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3626h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6056h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
