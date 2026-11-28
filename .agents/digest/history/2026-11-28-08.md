# MetalForge — Digest

*Generated 2026-11-28 08:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 16 |
| Open `human-founder` issues | 9 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **11** |
| Issues closed in window | 11 |
| Commits to `main` in window | 15 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **737** |
| Sessions | 794 |
| Page views | 1,076 |
| Engagement rate | 47.61% |
| GSC impressions | 19,828 |
| GSC clicks | 330 |
| GSC CTR | 1.66% |
| GSC avg position | 7.2 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,611 |
| Est. ad revenue / mo | **~€13.83** |
| Progress to €1000/mo | 1.4% |
| Pageviews/mo needed for €1000 | ~333,333 (72× current) |

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
| Lars Ulrich — 63º aniversário | 28d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 57d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 41 | 40 | 1 |
| Check llms freshness | 12 | 0 | 12 |
| Verify YouTube Videos | 11 | 6 | 5 |
| Verify Data Modules | 10 | 5 | 5 |
| Check Sitemap Drift | 10 | 5 | 5 |
| Perf Budget Gate | 5 | 0 | 5 |
| SEO Agent | 2 | 2 | 0 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-28 06:13 (cheap pulse — 5/6 proposals verified+promoted #11221-11225, 1 held as cross-module conflict)
- 2026-11-28 00:18 (cheap pulse — 6/6 proposals verified+promoted #11205-11210, #11173 reclassified to human-founder)
- 2026-11-27 18:09 (mid-day pulse — 8/8 proposals verified+promoted #11189-11196)
- 2026-11-27 12:11 (daily deep run — 8/8 proposals verified+promoted #11180-11187, unstuck #11173)
- 2026-11-27 06:13 (cheap pulse — 1/1 proposal verified+promoted #11179)
- 2026-11-27 00:19 (cheap pulse — 1/1 proposal verified+promoted #11173)

## 📦 Shipped to main (11)

- #11243 fix: #11225 SEO: drummerComparisons.js + public/llms/vs/*.md still assert unhedged Nick Augusto 'Pearl Reference brass snare' as fact (3rd unswept #10443-family module)
- #11242 fix: #11224 SEO: evolution/jon-dette.md Testament-era kit cost drifted ($4,262 vs verified $4,200)
- #11241 fix: #11223 SEO: drummerEvolution.js self-contradicts Navene Koperweis's Animals as Leaders join year (2009 era block vs 2010 in 3 other spots)
- #11240 fix: #11222 SEO: drummerEvolution.js + evolution/inferno.md omit Inferno's 1999-2000 Behemoth departure/return around Satanica
- #11239 fix: #11221 SEO: evolution/travis-orbin.md states Remo drumheads across all eras; verified source says Evans EMAD/G2 Coated since 2010
- #11231 fix: #11210 SEO: brands/pro-mark.md states Gene Hoglan's stick tip as fact (verified source hedges it) and omits Jason Bittner's SKU being retired
- #11229 fix: #11205 SEO: guides/how-to-sound-like-art-cruz.md fabricates double-kick config + wrong floor tom size; root's own FAQ still says 'bronze' snare
- #11230 fix: #11209 SEO: guides/how-to-sound-like-ryan-van-poederooyen.md asserts unverified 'Pearl Reference Brass' snare as fact (pre-#10443 fix never synced)
- #11228 fix: #11207 SEO: guides/how-to-sound-like-martin-lopez.md still has pre-#7870/#9348 fabricated Opeth-era gear (Noble & Cooley/Zildjian K Dark/Axis Percussion)
- #11227 fix: #11208 SEO: guides/how-to-sound-like-nick-augusto.md asserts unverified 'Pearl Reference Brass' snare as fact (pre-#10443 fix never synced)
- #11226 fix: #11206 SEO: guides/how-to-sound-like-jocke-wallgren.md + soundLikeGuides.js config.snare field still assert unverified Pearl snare as fact

## 🔴 Needs attention

- 🧑 Issue #11173 — SEO: api/quotes-data.js + public/llms/quotes.md — entire /quotes feature (35 quotes, 12 drummers) carries unsourced, likely-fabricated attributed quotes _(open 37h)_
- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 595h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2905h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 3001h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 3178h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
