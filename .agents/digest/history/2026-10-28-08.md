# MetalForge — Digest

*Generated 2026-10-28 08:16 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 9 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **9** |
| Issues closed in window | 9 |
| Commits to `main` in window | 13 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **395** |
| Sessions | 441 |
| Page views | 648 |
| Engagement rate | 59.86% |
| GSC impressions | 17,039 |
| GSC clicks | 178 |
| GSC CTR | 1.04% |
| GSC avg position | 9.1 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,777 |
| Est. ad revenue / mo | **~€8.33** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (120× current) |

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
| Mikkey Dee — 63º aniversário | 3d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 26d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 30d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 59d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 27 | 27 | 0 |
| Verify YouTube Videos | 15 | 8 | 7 |
| Check Sitemap Drift | 14 | 7 | 7 |
| Verify Data Modules | 14 | 7 | 7 |
| Check llms freshness | 8 | 0 | 8 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Perf Budget Gate | 7 | 0 | 7 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-28 00:22 (cheap pulse — 5/5 proposals verified+promoted #9837/#9839-9842)
- 2026-10-27 00:30 (cheap pulse — 7/7 proposals verified+promoted #9783-9789, +1 companion ai-fix filed #9791)
- 2026-10-27 06:19 — cheap pulse (pre-deep-run), 7/7 proposals verified+promoted #9792-9798
- 2026-10-27 12:19 — daily deep run, 8/8 proposals verified+promoted #9808-9815
- 2026-10-27 18:10 — cheap pulse (mid/late-day), 4/4 proposals verified+promoted #9824-9827
- 2026-10-28 06:16 — cheap pulse (pre-deep-run), 4/4 proposals verified+promoted #9846-9849

## 📦 Shipped to main (9)

- #9864 fix: #9849 SEO: Matt Halpern gear fabricated in public/llms/vs/chris-adler-vs-matt-halpern.md mirror — source drummerComparisons.js is already correct
- #9863 fix: #9848 SEO: Hellhammer snare fabricated as 'Ludwig Acrolite' in hellhammer-vs-bill-ward entry — verified Sonor Steel Snare 14x5.5
- #9862 fix: #9846 SEO: Eloy Casagrande age-at-album-release off-by-one — Machine Messiah '24' should be '25', The Mediator '21' should be '22'
- #9861 fix: #9847 SEO: Mike Portnoy Dream Theater tenure says '20 years' in mike-portnoy-vs-mike-mangini entry, sibling entries correctly say '25 years'
- #9855 fix: #9842 SEO: Gene Hoglan Testament tenure fabricated as 'primary drummer since 2007' (verified: 1996-1997 and 2011-2022, Bostaph held 2007-2011)
- #9853 fix: #9839 SEO batch: Eloy Casagrande age-at-Sepultura-join wrong site-wide — '19' should be '20' (verified: born Aug 25 1991 + joined Nov 2011)
- #9852 fix: #9841 SEO: Gene Hoglan Dark Angel tenure fabricated as '1984-present' across 3 drummerComparisons.js entries (verified: ended 1991)
- #9851 fix: #9840 SEO: Dave Lombardo gear fabricated as Pearl drums in joey-jordison-vs-dave-lombardo entry (verified: Tama)
- #9850 fix: #9837 SEO: Eloy Casagrande birthdate self-contradicts within extendedBios.js — Jan 29 Santo André vs Aug 25 São Paulo (9+ file consensus)

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2161h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2257h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2434h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3519h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5949h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
