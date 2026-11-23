# MetalForge — Digest

*Generated 2026-11-23 08:16 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **9** |
| Issues closed in window | 9 |
| Commits to `main` in window | 16 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **786** |
| Sessions | 844 |
| Page views | 1,141 |
| Engagement rate | 41.47% |
| GSC impressions | 15,587 |
| GSC clicks | 291 |
| GSC CTR | 1.87% |
| GSC avg position | 7.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,890 |
| Est. ad revenue / mo | **~€14.67** |
| Progress to €1000/mo | 1.5% |
| Pageviews/mo needed for €1000 | ~333,333 (68× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 863 tracked queries) | 38 clicks · 5252 impr · CTR 0.7% · avg pos 10.8 | clicks (+4) · impr (−721) · pos (−0.2) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **31/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 226/250 indexed (−9) · rotating sample: 141/250 indexed · **full site: 2272 of 3158 sitemap URLs earned impressions (90d)** | 39 rejected-quality · 35 never-crawled |
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
| Chris Adler — 54º aniversário | 0d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 4d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 33d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 62d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 52 | 52 | 0 |
| Check llms freshness | 10 | 0 | 10 |
| Health Check | 4 | 4 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Check GSC watched queries | 1 | 1 | 0 |
| Check backlink signal | 1 | 1 | 0 |
| Check LLM citations | 1 | 1 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Verify YouTube Videos | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Check broken images | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-23 00:21 (cheap pulse — 4/4 proposals verified+promoted #11015/11017/11019/11021)
- 2026-11-22 00:20 (cheap pulse — 8/8 proposals verified+promoted #10952/10953/10955-10960)
- 2026-11-22 06:12 (cheap pulse — 8/8 proposals verified+promoted #10966-10973, + #7981 closed/resolved)
- 2026-11-22 12:10 (daily deep run — 4/4 proposals verified+promoted #10984-10987)
- 2026-11-22 18:08 (mid-day pulse — 8/8 proposals verified+promoted #10998-11005)
- 2026-11-23 06:18 (cheap pulse — 5/5 proposals verified+promoted #11023-11027)

## 📦 Shipped to main (9)

- #11041 fix: #11024 SEO: gear-comparison.md says Pete Sandoval 'Pearl vs Pearl' matching George Kollias — verified ddrum
- #11043 fix: #11027 SEO: thrash.md FAQ invents a Lars Ulrich 'Pearl' kit era between Tama periods — root shows Camco/Ludwig then Tama only
- #11042 fix: #11026 SEO: name-generator.md invents a Vinnie Paul nickname 'Metal Method' — no such nickname exists in root
- #11040 fix: #11025 SEO: kit-builder.md attributes Sabian HHX cymbals to Eloy Casagrande — verified Paiste
- #11039 fix: #11023 SEO: dream-set-builder.md fabricates Pete Sandoval as 'Pearl shells' — verified ddrum, unverified
- #11031 fix: #11021 SEO: Richard Christy gear-history mirror states Death/Control Denied join year as 1996 — verified 1997
- #11030 fix: #11019 SEO: Frost how-to-sound-like mirror fabricates entire gear rig as Pearl — verified Tama Starclassic Bubinga since 2013
- #11029 fix: #11017 SEO: Ben Koller how-to-sound-like mirror fabricates entire gear rig as DW — verified Tama Starclassic Performer B/B
- #11028 fix: #11015 SEO: Adrian Erlandsson how-to-sound-like mirror misstates brother Daniel's Arch Enemy tenure as 'since 2005' — verified founding drummer since 1995

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 476h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2785h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2881h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 3058h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4143h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
