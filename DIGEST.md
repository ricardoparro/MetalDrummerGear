# MetalForge — Digest

*Generated 2026-11-26 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **7** |
| Issues closed in window | 7 |
| Commits to `main` in window | 11 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **784** |
| Sessions | 831 |
| Page views | 1,071 |
| Engagement rate | 41.64% |
| GSC impressions | 17,060 |
| GSC clicks | 294 |
| GSC CTR | 1.72% |
| GSC avg position | 7.2 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,590 |
| Est. ad revenue / mo | **~€13.77** |
| Progress to €1000/mo | 1.4% |
| Pageviews/mo needed for €1000 | ~333,333 (73× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 929 tracked queries) | 26 clicks · 4843 impr · CTR 0.5% · avg pos 10.8 | clicks (−12) · impr (−409) · pos (±0) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **31/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 222/250 indexed (−4) · rotating sample: 226/250 indexed · **full site: 2282 of 3157 sitemap URLs earned impressions (90d)** | 25 rejected-quality · 12 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1188ms · **worst: Album article (Sacrament drum setup) — 52 perf, LCP 11.0s** · 2/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (±0) · TBT (+49)ms · chronic (−2) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 20 (±0)
- 🆕 New this week: br.search.yahoo.com
- Top sources: aocr.org (11) · uk.search.yahoo.com (8) · cn.bing.com (4) · facebook.com (3) · noai.duckduckgo.com (3)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Charlie Benante — 64º aniversário | 1d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 30d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 59d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 53 | 52 | 1 |
| Check llms freshness | 9 | 0 | 9 |
| Health Check | 4 | 4 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Verify YouTube Videos | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-26 00:19 (cheap pulse — 2/2 proposals verified+promoted #11136-11137)
- 2026-11-25 18:08 (cheap pulse — 2/2 proposals verified+promoted #11131-11132)
- 2026-11-25 12:11 (daily deep run — 3/3 proposals verified+promoted #11128-11130)
- 2026-11-25 06:13 (cheap pulse — 1 proposal triaged, closed as already-fixed)
- 2026-11-25 00:19 (cheap pulse — 4/4 proposals verified+promoted #11119-11122)
- 2026-11-26 06:13 (cheap pulse — 5/5 proposals verified+promoted #11140-11144, 1 scope-widened)

## 📦 Shipped to main (7)

- #11159 fix: #11144 SEO batch: ray-luzier.md gear-history omits the 2013 Pearl/Sabian transition, presents DW/Paiste through 2019
- #11158 fix: #11143 SEO: dave-lombardo.md gear-history wrong drum model + cymbal line for 2001-2010 Slayer reunion era
- #11157 fix: #11142 SEO: vic-firth.md wrong stick model for Inferno (Behemoth) — 2B vs verified American Classic Extreme 5B
- #11156 fix: #11141 SEO: remo.md fabricates 'ex-Battlecross' band credit for Alex Bent
- #11155 fix: #11140 SEO: mapex.md fabricates Chris Adler's pedal brand — Mapex Falcon vs verified Trick Pro V
- #11147 fix: #11136 SEO: restore Jaska Raatikainen's Tama Starclassic interlude (1999-2004) in evolution.md, omitted vs root data
- #11145 fix: #11137 SEO: jason-bittner.md evolution page invents an entire fabricated Tama/Sabian/DW era — root says continuous Mapex/Zildjian since 1997

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 547h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2857h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2953h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 3130h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4215h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
