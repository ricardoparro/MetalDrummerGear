# MetalForge — Digest

*Generated 2026-10-18 08:18 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **10** |
| Issues closed in window | 10 |
| Commits to `main` in window | 14 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **432** |
| Sessions | 479 |
| Page views | 707 |
| Engagement rate | 63.88% |
| GSC impressions | 17,476 |
| GSC clicks | 247 |
| GSC CTR | 1.41% |
| GSC avg position | 8.3 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,030 |
| Est. ad revenue / mo | **~€9.09** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (110× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 534 tracked queries) | 27 clicks · 3342 impr · CTR 0.8% · avg pos 9.5 | clicks (−8) · impr (−83) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **27/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 239/250 indexed (+1) · rotating sample: 204/250 indexed · **full site: 2281 of 3162 sitemap URLs earned impressions (90d)** | 4 rejected-quality · 6 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (±0)
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 13d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 36d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 40d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 24 | 24 | 0 |
| Verify YouTube Videos | 15 | 8 | 7 |
| Check Sitemap Drift | 14 | 0 | 14 |
| Verify Data Modules | 12 | 6 | 6 |
| Check llms freshness | 8 | 0 | 8 |
| .github/workflows/check-vercel-rewrites.yml | 8 | 0 | 8 |
| Perf Budget Gate | 6 | 0 | 6 |
| Verify API Modules | 4 | 2 | 2 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-18 06:17 (cheap pulse — 6/6 proposals verified+promoted, #9266-9271)
- 2026-10-18 00:31 (evening-review catch-up for 10-17 — 4/4 proposals verified+promoted, #9262-9265)
- 2026-10-17 00:27 (cheap pulse — 8/8 proposals verified+promoted, #9200-9207)
- 2026-10-17 06:16 (cheap pulse — 3/3 proposals verified+promoted, #9218-9220)
- 2026-10-17 12:14 (daily deep run — 8/8 proposals verified+promoted, #9231-9239)
- 2026-10-17 18:11 (mid-day pulse — 6/6 proposals verified+promoted, #9242-9247)

## 📦 Shipped to main (10)

- #9289 fix: #9271 SEO: Paul Bostaph extendedBios.js fabricates Testament tenure as '1999-2001, 2024-present' — verified 1992-1993, 2004 (touring), 2007-2011 per bands.js
- #9288 fix: #9270 SEO: Jason Bittner extendedBios.js trivia calls him a 'Connecticut native', contradicting the same file's own verified Niskayuna, New York birthplace
- #9287 fix: #9269 SEO: Jason Bittner drummerComparisons.js says Shadows Fall '(1999-2015)' in 3 entries — verified 2001-2015 (reverted/settled by #9145)
- #9286 fix: #9268 SEO: Paul Bostaph soundLikeGuides.js fabricates birthplace 'San Jose, California' — verified San Francisco (3 other files agree)
- #9285 fix: #9267 SEO: Gavin Harrison extendedBios.js discography entry says King Crimson 'Tours' 2014-2021, contradicting the same record's own 2008-present framing (4 other locations)
- #9284 fix: #9266 SEO: Sean Reinert birthdate fabricated 2 different wrong ways + wrong death-date + 'one day after his 49th birthday' age-math error propagated to 2 correct files
- #9275 fix: #9264 SEO: John Otto fabricated 'Gibraltar G Class' pedal survives in api/drummers/index.js + api/gear-finder/index.js — missed by #8929/#8945/#8934
- #9274 fix: #9263 SEO: Art Cruz — stale public/llms/*.md mirrors never regenerated after #8435/#9144 fixed the 'Ludwig Classic Maple' fabrication
- #9273 fix: #9265 SEO: Travis Orbin endorsementNews.js 2011 entry fabricates a post-departure Periphery recording credit, self-contradicts the same file's own 2016 entry
- #9272 fix: #9262 SEO: Hannes Grossmann — Hate Eternal (2015-2018) omitted from 'complete' band-membership lists in 4 sibling files

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1921h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2017h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2194h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3279h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5709h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
