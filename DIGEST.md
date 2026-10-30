# MetalForge — Digest

*Generated 2026-10-30 08:16 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 7 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **13** |
| Issues closed in window | 12 |
| Commits to `main` in window | 17 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **409** |
| Sessions | 464 |
| Page views | 693 |
| Engagement rate | 62.93% |
| GSC impressions | 16,093 |
| GSC clicks | 208 |
| GSC CTR | 1.29% |
| GSC avg position | 9.2 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,970 |
| Est. ad revenue / mo | **~€8.91** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (112× current) |

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
| PR Merger | 27 | 27 | 0 |
| Verify YouTube Videos | 15 | 8 | 7 |
| Verify Data Modules | 14 | 7 | 7 |
| Check Sitemap Drift | 14 | 7 | 7 |
| Check llms freshness | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 7 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-30 00:22 (cheap pulse — 8/8 proposals verified+promoted #9929/#9930/#9932/#9933/#9934/#9936/#9937/#9938)
- 2026-10-29 12:13 (daily deep run — 7/7 proposals verified+promoted #9903-9909, matt-halpern GSC spike investigated+logge
- 2026-10-29 06:17 (cheap pulse — 5/7 proposals promoted #9890-9893/#9895, 2 closed as already-resolved)
- 2026-10-29 00:22 (cheap pulse — 6/6 proposals verified+promoted #9877-9882, 3 with scope-expansion notes)
- 2026-10-29 18:11 (mid-day pulse — 5/5 proposals verified+promoted #9915-9919)
- 2026-10-30 06:14 (cheap pulse, pre-deep-run — 4/4 proposals verified+promoted #9941-9944)

## 📦 Shipped to main (13)

- #9960 fix: #9944 SEO: Dave Lombardo's snare fabricated as 'Tama Dave Lombardo Signature' + wrong cymbal sizes in paul-bostaph-vs-dave-lombardo entry (2 locations)
- #9959 fix: #9943 SEO batch: George Kollias blast-beat speed fabricated as '280+ BPM' in 4 drummerComparisons.js entries (8 locations) — verified figure is 240+ BPM
- #9958 fix: #9943 SEO batch: George Kollias blast-beat speed fabricated as '280+ BPM' in 4 drummerComparisons.js entries (8 locations) — verified figure is 240+ BPM
- #9957 fix: #9942 SEO batch: Bill Ward's Black Sabbath tenure fabricated as '1968 to 1983, and again from 1997 to 2006' across 7 drummerComparisons.js FAQ lines
- #9956 fix: #9941 SEO: Inferno's Behemoth tenure framed as unbroken 'since 1997', omits verified 1999-2000 departure/return gap
- #9952 fix: #9938 SEO batch: Ryan Van Poederooyen's Devin Townsend tenure understated as '2009 to 2018' in 3 drummerComparisons.js locations + 2 mirrors — verified 2002-2018 (omits 7-year founding era)
- #9951 fix: #9937 SEO: paul-bostaph-vs-jon-dette self-contradicts — technique field credits Jon Dette with 'compositional contribution' on 2 Testament albums his own FAQ says he never recorded
- #9950 fix: #9936 SEO: Morgan Ågren's Kaipa tenure framed as open-ended 'since 2002' in morgan-agren-vs-mike-mangini FAQ — same file's aquiles-priester-vs-morgan-agren entry correctly bounds it 2002-2005
- #9949 fix: #9933 SEO: Jay Weinberg's Slipknot join date survives as 'December 2013'/'2013 onward' at drummerComparisons.js:1054 FAQ + 2 markdown mirrors — #9925 fixed 4 other locations but missed these
- #9948 fix: #9934 SEO batch: Matt Halpern wrongly framed as drumming for Periphery 'since the band's formation' in 4 drummerComparisons.js locations + 4 markdown mirrors — joined 2009, band formed 2005
- #9947 fix: #9932 SEO: Frost's extendedBios.js still frames him as 1349 co-founder in 2001 — #9147 fixed this framing everywhere except extendedBios.js
- #9946 fix: #9929 SEO batch: Bill Ward cymbals still fabricated as 'Paiste 2002 & Giant Beat Series' in 3 public/llms/comparisons/ mirror files — source + public/llms/vs/ already fixed to Zildjian Avedis
- #9945 fix: #9930 SEO: Dave Lombardo drummerEvolution.js 'Tama & Paiste Era' start year still says 1995 — verified Slayer return was 2001, missed by #7917's scope

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2209h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2305h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2482h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3567h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5997h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
