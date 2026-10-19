# MetalForge — Digest

*Generated 2026-10-19 19:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **26** |
| Open `seo-proposal` issues | 18 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 6 |
| PRs merged in window | **10** |
| Issues closed in window | 9 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **426** |
| Sessions | 480 |
| Page views | 670 |
| Engagement rate | 62.50% |
| GSC impressions | 18,749 |
| GSC clicks | 245 |
| GSC CTR | 1.31% |
| GSC avg position | 8.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,871 |
| Est. ad revenue / mo | **~€8.61** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (116× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 617 tracked queries) | 30 clicks · 11185 impr · CTR 0.3% · avg pos 9.8 | clicks (+3) · impr (+7843) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **32/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 237/249 indexed (−2) · rotating sample: 180/249 indexed · **full site: 2280 of 3161 sitemap URLs earned impressions (90d)** | 18 rejected-quality · 19 never-crawled |
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
| PR Merger | 27 | 24 | 1 |
| Verify YouTube Videos | 14 | 6 | 1 |
| Check Sitemap Drift | 13 | 0 | 6 |
| Verify Data Modules | 13 | 5 | 1 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Check llms freshness | 6 | 0 | 0 |
| Perf Budget Gate | 6 | 0 | 0 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Check Video SEO | 2 | 0 | 2 |
| Verify API Modules | 2 | 1 | 1 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-19 00:31 (evening-review catch-up for 10-18 — 6/6 proposals verified+promoted, #9310-9315)
- 2026-10-18 18:11 (mid-day pulse — 8/8 proposals verified+promoted, #9292-9299)
- 2026-10-18 12:14 (deep run — 8/8 proposals verified+promoted #9276-9283, +2 new ai-fix filed #9290-9291)
- 2026-10-18 06:17 (cheap pulse — 6/6 proposals verified+promoted, #9266-9271)
- 2026-10-18 00:31 (evening-review catch-up for 10-17 — 4/4 proposals verified+promoted, #9262-9265)
- 2026-10-19 12:18 (daily deep run — L1/L2/L3 close-the-loop + 5/5 proposals promoted, #9334-9338, #9343 filed)

## 📦 Shipped to main (10)

- #9355 fix: #9343 SEO: /drummers/<slug>/gear-history + /licks sub-pages render boilerplate 3-Q FAQ shell only — no era/technique narrative, crawled-not-indexed at scale (10 pages)
- #9354 fix: #9338 SEO: Martin Axenrot soundLikeGuides.js still implies he's Opeth's current drummer (left 2021)
- #9353 fix: #9337 SEO: Frost soundLikeGuides.js snare depth + sticks brand fabricated (6.5in should be 5.5in; 'Ahead' is cross-contamination)
- #9352 fix: #9336 SEO: Ben Koller soundLikeGuides.js still has pre-#9046 stale gear (Starclassic Maple/K Dark/Iron Cobra 900)
- #9351 fix: #9335 SEO: Richard Christy soundLikeGuides.js drum kit says 'Pearl Masters Series' — verified Pearl Masters Custom
- #9350 fix: #9334 SEO: Daniel Erlandsson soundLikeGuides.js fabricates 'Pearl Demon Drive' pedal — verified Pearl Eliminator
- #9342 fix: #9327 SEO: Paul Mazurkiewicz top10Lists.js says Cannibal Corpse "15 albums" — verified 16 studio albums
- #9341 fix: #9326 SEO: Brann Dailor top10Lists.js still says Mastodon formed 1999 — verified 2000 (missed by #9156)
- #9340 fix: #9326 SEO: Brann Dailor top10Lists.js still says Mastodon formed 1999 — verified 2000 (missed by #9156)
- #9339 fix: #9325 SEO: Aquiles Priester drummerComparisons.js fabricates Angra "2023-present" second stint (4 locations) — verified single 2001-2008 tenure

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1956h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2052h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2229h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3314h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5744h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
