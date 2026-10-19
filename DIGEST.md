# MetalForge — Digest

*Generated 2026-10-19 08:26 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 9 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **10** |
| Issues closed in window | 9 |
| Commits to `main` in window | 17 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **409** |
| Sessions | 458 |
| Page views | 647 |
| Engagement rate | 63.32% |
| GSC impressions | 18,749 |
| GSC clicks | 245 |
| GSC CTR | 1.31% |
| GSC avg position | 8.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,773 |
| Est. ad revenue / mo | **~€8.32** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (120× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 617 tracked queries) | 30 clicks · 11185 impr · CTR 0.3% · avg pos 9.8 | clicks (+3) · impr (+7843) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **32/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 239/250 indexed (+1) · rotating sample: 204/250 indexed · **full site: 2281 of 3162 sitemap URLs earned impressions (90d)** | 4 rejected-quality · 6 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 15 (+1)
- 🆕 New this week: syntx.ai
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 12d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 35d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 39d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 21 | 21 | 0 |
| Verify YouTube Videos | 15 | 8 | 7 |
| Verify Data Modules | 14 | 7 | 7 |
| Check Sitemap Drift | 14 | 0 | 14 |
| Check llms freshness | 8 | 0 | 8 |
| .github/workflows/check-vercel-rewrites.yml | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 7 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Check GSC watched queries | 1 | 1 | 0 |
| Check backlink signal | 1 | 1 | 0 |
| Check LLM citations | 1 | 1 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Check broken images | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-19 00:31 (evening-review catch-up for 10-18 — 6/6 proposals verified+promoted, #9310-9315)
- 2026-10-18 18:11 (mid-day pulse — 8/8 proposals verified+promoted, #9292-9299)
- 2026-10-18 12:14 (deep run — 8/8 proposals verified+promoted #9276-9283, +2 new ai-fix filed #9290-9291)
- 2026-10-18 06:17 (cheap pulse — 6/6 proposals verified+promoted, #9266-9271)
- 2026-10-18 00:31 (evening-review catch-up for 10-17 — 4/4 proposals verified+promoted, #9262-9265)
- 2026-10-19 06:25 (cheap pulse — 3/3 proposals verified+promoted, #9325-9327)

## 📦 Shipped to main (10)

- #9342 fix: #9327 SEO: Paul Mazurkiewicz top10Lists.js says Cannibal Corpse "15 albums" — verified 16 studio albums
- #9341 fix: #9326 SEO: Brann Dailor top10Lists.js still says Mastodon formed 1999 — verified 2000 (missed by #9156)
- #9340 fix: #9326 SEO: Brann Dailor top10Lists.js still says Mastodon formed 1999 — verified 2000 (missed by #9156)
- #9339 fix: #9325 SEO: Aquiles Priester drummerComparisons.js fabricates Angra "2023-present" second stint (4 locations) — verified single 2001-2008 tenure
- #9333 fix: #9315 SEO: Eloy Casagrande public/llms/gear-history/eloy-casagrande.md wholesale-fabricates Mapex/Pearl/Vic Firth gear history — verified Tama/Paiste/Promark/Evans (distinct file from already-fixed #9187)
- #9332 fix: #9313 SEO: Chris Adler gearPriceHistory.js 2004 era hardware fabricated as "Mapex Falcon Double Pedal" — verified Trick Pro V since 2010s
- #9331 fix: #9314 SEO: Bill Ward gearPriceHistory.js 1970 debut era sticks fabricated as "Ludwig 2B Hickory" — verified Pro-Mark since 1970
- #9330 fix: #9312 SEO: Scott Travis drummerComparisons.js FAQ says Judas Priest "since 1990", self-contradicts same file's own 1989 join-date (4 locations) and bands.js
- #9329 fix: #9310 SEO: Mike Portnoy genres.js FAQ fabricates a Pearl drum history + wrong "Maple/Birch" shells — verified continuous Tama since 1985, Maple+Bubinga "Dream Monster" kit
- #9328 fix: #9311 SEO: Nick Augusto albumArticles/nick-augusto.js (Vengeance Falls entry, 8 locations) still fabricates "Pearl Demon Drive" pedal — verified DW 9000 Series, missed by #8059/#8908/#9100/#9219/#9236

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1945h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2041h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2219h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3303h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5733h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
