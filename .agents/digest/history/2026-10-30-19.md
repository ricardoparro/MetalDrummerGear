# MetalForge — Digest

*Generated 2026-10-30 19:09 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **24** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **8** |
| Issues closed in window | 7 |
| Commits to `main` in window | 13 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **424** |
| Sessions | 483 |
| Page views | 713 |
| Engagement rate | 62.94% |
| GSC impressions | 19,105 |
| GSC clicks | 259 |
| GSC CTR | 1.36% |
| GSC avg position | 9.1 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,056 |
| Est. ad revenue / mo | **~€9.17** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (109× current) |

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
| Mikkey Dee — 63º aniversário | 1d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 24d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 28d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 57d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 50 | 50 | 0 |
| Verify Data Modules | 7 | 3 | 4 |
| Verify YouTube Videos | 7 | 3 | 4 |
| Check Sitemap Drift | 6 | 3 | 3 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| .github/workflows/check-vercel-rewrites.yml | 4 | 0 | 4 |
| Health Check | 4 | 4 | 0 |
| Check llms freshness | 4 | 0 | 4 |
| Perf Budget Gate | 3 | 0 | 3 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-30 00:22 (cheap pulse — 8/8 proposals verified+promoted #9929/#9930/#9932/#9933/#9934/#9936/#9937/#9938)
- 2026-10-29 12:13 (daily deep run — 7/7 proposals verified+promoted #9903-9909, matt-halpern GSC spike investigated+logge
- 2026-10-29 06:17 (cheap pulse — 5/7 proposals promoted #9890-9893/#9895, 2 closed as already-resolved)
- 2026-10-29 00:22 (cheap pulse — 6/6 proposals verified+promoted #9877-9882, 3 with scope-expansion notes)
- 2026-10-29 18:11 (mid-day pulse — 5/5 proposals verified+promoted #9915-9919)
- 2026-10-30 06:14 (cheap pulse, pre-deep-run — 4/4 proposals verified+promoted #9941-9944)

## 📦 Shipped to main (8)

- #9967 fix: #9955 SEO batch: Vinnie Paul's Tama-era (1990-1996) snare fabricated as 14x5.5" — verified 14"×6.5" (3 locations + 2 llms mirrors)
- #9966 fix: #9954 SEO batch: Eloy Casagrande's gear fabricated as 'Tama S.L.P. Sonic Steel 14x6" snare' + 'twin Speed Cobra 910 pedals' in 2 drummerComparisons.js entries — missed by #8954
- #9965 fix: #9953 SEO: Eloy Casagrande 'took over the drum chair in 2023' residual FAQ line survives #9908's fix in the same entry
- #9960 fix: #9944 SEO: Dave Lombardo's snare fabricated as 'Tama Dave Lombardo Signature' + wrong cymbal sizes in paul-bostaph-vs-dave-lombardo entry (2 locations)
- #9959 fix: #9943 SEO batch: George Kollias blast-beat speed fabricated as '280+ BPM' in 4 drummerComparisons.js entries (8 locations) — verified figure is 240+ BPM
- #9958 fix: #9943 SEO batch: George Kollias blast-beat speed fabricated as '280+ BPM' in 4 drummerComparisons.js entries (8 locations) — verified figure is 240+ BPM
- #9957 fix: #9942 SEO batch: Bill Ward's Black Sabbath tenure fabricated as '1968 to 1983, and again from 1997 to 2006' across 7 drummerComparisons.js FAQ lines
- #9956 fix: #9941 SEO: Inferno's Behemoth tenure framed as unbroken 'since 1997', omits verified 1999-2000 departure/return gap

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2220h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2316h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2493h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3578h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6008h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
