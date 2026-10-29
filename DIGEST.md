# MetalForge — Digest

*Generated 2026-10-29 08:16 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **12** |
| Issues closed in window | 13 |
| Commits to `main` in window | 16 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **413** |
| Sessions | 464 |
| Page views | 685 |
| Engagement rate | 59.91% |
| GSC impressions | 19,496 |
| GSC clicks | 241 |
| GSC CTR | 1.24% |
| GSC avg position | 9.2 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,936 |
| Est. ad revenue / mo | **~€8.81** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (114× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 648 tracked queries) | 23 clicks · 13437 impr · CTR 0.2% · avg pos 10.5 | clicks (−7) · impr (+2252) · pos (+0.7) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **39/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 238/249 indexed (+1) · rotating sample: 191/248 indexed · **full site: 2268 of 3159 sitemap URLs earned impressions (90d)** | 27 rejected-quality · 17 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

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
| Mikkey Dee — 63º aniversário | 2d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 25d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 29d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 58d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 30 | 29 | 1 |
| Verify YouTube Videos | 13 | 7 | 6 |
| Verify Data Modules | 13 | 6 | 7 |
| Check Sitemap Drift | 12 | 6 | 6 |
| .github/workflows/check-vercel-rewrites.yml | 9 | 0 | 9 |
| Check llms freshness | 8 | 0 | 8 |
| Perf Budget Gate | 6 | 0 | 6 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-29 06:17 (cheap pulse — 5/7 proposals promoted #9890-9893/#9895, 2 closed as already-resolved)
- 2026-10-29 00:22 (cheap pulse — 6/6 proposals verified+promoted #9877-9882, 3 with scope-expansion notes)
- 2026-10-28 00:22 (cheap pulse — 5/5 proposals verified+promoted #9837/#9839-9842)
- 2026-10-28 06:16 — cheap pulse (pre-deep-run), 4/4 proposals verified+promoted #9846-9849
- 2026-10-28 12:12 — daily deep run, 5/5 proposals verified+promoted #9856-9860
- 2026-10-28 18:11 — mid-day pulse, 6/6 proposals verified+promoted #9865-9870

## 📦 Shipped to main (12)

- #9914 fix: #9895 SEO: Raymond Herrera's Fear Factory departure still fabricated as 2009 at drummerComparisons.js:2876 + mirror — #9109 fixed 2 other files, verified 2006
- #9913 fix: #9893 SEO: Martin Lopez llms evolution mirror still has a fabricated 'Amon Amarth' era block + wrong birth date — removed from source by #8005, mirror never regenerated
- #9912 fix: #9892 SEO: Daray stale llms mirror public/llms/comparisons/frost-vs-daray.md fabricates Vader tenure, birth date, and gear — distinct file from #9505's scope
- #9911 fix: #9891 SEO batch: Blake Richardson's BTBAM album 'Colors II' misdated 2023 across 4 drummerComparisons.js locations + 2 mirrors — verified 2021
- #9910 fix: #9890 SEO: Mike Mangini pedal fabricated as 'Pearl Demon Drive' at drummerComparisons.js:3861 — #8932 fixed 8 other lines but missed this one
- #9901 fix: #9881 SEO: Isaac Lamb fabricated 'featured on Lamb of God's Another Nail for Your Coffin' collaboration
- #9902 fix: #9882 SEO: Inferno (Behemoth) drums fabricated as 'Pearl Masterworks' in public/llms/battles/inferno-vs-hellhammer.md — mirror never regenerated after #8987
- #9900 fix: #9880 SEO: Martin Axenrot wrongly framed as currently holding Opeth's drum chair in 3 drummerComparisons.js entries — left Nov 2021
- #9899 fix: #9879 SEO: Art Cruz stale llms mirror art-cruz-vs-jay-weinberg.md still has pre-#9144 Winds of Plague/Prong years
- #9898 fix: #9877 SEO: Alex Bent Trivium tenure self-contradicts as 'eight years' vs verified 'nine years' in drummerComparisons.js (5 locations, 2 entries)
- #9897 fix: #9877 SEO: Alex Bent Trivium tenure self-contradicts as 'eight years' vs verified 'nine years' in drummerComparisons.js (5 locations, 2 entries)
- #9896 fix: #9878 SEO: Jason Bittner Shadows Fall tenure residual '1999 to 2015' survives at drummerComparisons.js:3278 — verified 2001-2015

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2185h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2281h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2458h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3543h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5973h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
