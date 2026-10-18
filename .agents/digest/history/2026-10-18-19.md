# MetalForge — Digest

*Generated 2026-10-18 19:11 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 18 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 2 |
| PRs merged in window | **16** |
| Issues closed in window | 16 |
| Commits to `main` in window | 22 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **454** |
| Sessions | 505 |
| Page views | 736 |
| Engagement rate | 63.76% |
| GSC impressions | 17,476 |
| GSC clicks | 247 |
| GSC CTR | 1.41% |
| GSC avg position | 8.3 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,154 |
| Est. ad revenue / mo | **~€9.46** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (106× current) |

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
| PR Merger | 31 | 31 | 0 |
| Check Sitemap Drift | 13 | 0 | 11 |
| Verify YouTube Videos | 12 | 6 | 4 |
| Verify Data Modules | 12 | 6 | 4 |
| .github/workflows/check-vercel-rewrites.yml | 9 | 0 | 9 |
| Perf Budget Gate | 7 | 0 | 5 |
| Check llms freshness | 6 | 0 | 4 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-18 18:11 (mid-day pulse — 8/8 proposals verified+promoted, #9292-9299)
- 2026-10-18 12:14 (deep run — 8/8 proposals verified+promoted #9276-9283, +2 new ai-fix filed #9290-9291)
- 2026-10-18 06:17 (cheap pulse — 6/6 proposals verified+promoted, #9266-9271)
- 2026-10-18 00:31 (evening-review catch-up for 10-17 — 4/4 proposals verified+promoted, #9262-9265)
- 2026-10-17 00:27 (cheap pulse — 8/8 proposals verified+promoted, #9200-9207)
- 2026-10-17 06:16 (cheap pulse — 3/3 proposals verified+promoted, #9218-9220)

## 📦 Shipped to main (16)

- #9309 fix: #9291 fix: public/llms/gear-history/danny-carey.md still fabricates Evans drumheads (missed by #9283's evolution.md scope)
- #9308 fix: #9290 fix: Vinnie Paul gear fabrications in evolution.md mirror + gearPriceHistory.js DW pedal claim
- #9307 fix: #9283 SEO: Danny Carey public/llms/evolution/danny-carey.md still fabricates 'Evans' drumheads for 3 eras after drummerEvolution.js was corrected to Remo by #8952
- #9306 fix: #9282 SEO: Nick Menza public/llms mirrors never regenerated after drummerEvolution.js/gearPriceHistory.js fixes — stale era-timing + fully fabricated gear-history.md
- #9305 fix: #9281 SEO: Inferno (Behemoth) sticks fabricated as 'Vic Firth 2B' in extendedBios.js + kit misattributed as 'Pearl Masters Premium' across soundLikeGuides.js/llms guide — verified Extreme 5B sticks + Pearl Reference Series kit
- #9304 fix: #9280 SEO: George Kollias fabricated Guinness World Record claim (1,007 BPM blast beat) in soundLikeGuides.js — unsourced anywhere in the repo, external search finds no such record
- #9303 fix: #9279 SEO: George Kollias drummerEvolution.js + its llms mirror fabricate current gear as 'Pearl Reference Pure'/Paiste/Tama Iron Cobra — verified Pearl Masterworks/Zildjian A Custom/Pearl Demon XR
- #9302 fix: #9278 SEO: Vinnie Paul stick model fabricated as 'Vic Firth 2B' across all 5 drummerEvolution.js eras + 3 early albumArticles.js entries — verified American Classic 5B
- #9301 fix: #9277 SEO: public/llms/gear-history/vinnie-paul.md entirely fabricates his gear history — wrong brands for every era, invented DW/"Damage Plan" endorsement
- #9300 fix: #9276 SEO: Dave Lombardo extendedBios.js + 2 llms mirrors fabricate him as 2022 Pantera reunion touring drummer — verified Charlie Benante
- #9289 fix: #9271 SEO: Paul Bostaph extendedBios.js fabricates Testament tenure as '1999-2001, 2024-present' — verified 1992-1993, 2004 (touring), 2007-2011 per bands.js
- #9288 fix: #9270 SEO: Jason Bittner extendedBios.js trivia calls him a 'Connecticut native', contradicting the same file's own verified Niskayuna, New York birthplace
- #9287 fix: #9269 SEO: Jason Bittner drummerComparisons.js says Shadows Fall '(1999-2015)' in 3 entries — verified 2001-2015 (reverted/settled by #9145)
- #9286 fix: #9268 SEO: Paul Bostaph soundLikeGuides.js fabricates birthplace 'San Jose, California' — verified San Francisco (3 other files agree)
- #9285 fix: #9267 SEO: Gavin Harrison extendedBios.js discography entry says King Crimson 'Tours' 2014-2021, contradicting the same record's own 2008-present framing (4 other locations)
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1932h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2028h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2205h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3290h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5720h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
