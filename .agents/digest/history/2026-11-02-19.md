# MetalForge — Digest

*Generated 2026-11-02 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **22** |
| Open `seo-proposal` issues | 9 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 3 |
| PRs merged in window | **20** |
| Issues closed in window | 19 |
| Commits to `main` in window | 30 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **464** |
| Sessions | 527 |
| Page views | 766 |
| Engagement rate | 63.95% |
| GSC impressions | 17,518 |
| GSC clicks | 291 |
| GSC CTR | 1.66% |
| GSC avg position | 8.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,283 |
| Est. ad revenue / mo | **~€9.85** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (102× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 775 tracked queries) | 39 clicks · 9064 impr · CTR 0.4% · avg pos 10.9 | clicks (+16) · impr (−4373) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **17/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 237/250 indexed (−1) · rotating sample: 194/250 indexed · **full site: 2270 of 3159 sitemap URLs earned impressions (90d)** | 29 rejected-quality · 21 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1139ms · **worst: Album article (Sacrament drum setup) — 51 perf, LCP 12.1s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+6) · TBT (−533)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 17 (+1)
- 🆕 New this week: oceanhero.today
- Top sources: uk.search.yahoo.com (5) · m.facebook.com (4) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 21d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 25d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 54d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 29 | 27 | 0 |
| Check Sitemap Drift | 14 | 5 | 4 |
| Verify YouTube Videos | 14 | 5 | 4 |
| Verify Data Modules | 13 | 4 | 4 |
| Perf Budget Gate | 7 | 0 | 4 |
| Check llms freshness | 7 | 0 | 4 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Check Video SEO | 2 | 0 | 2 |
| Verify API Modules | 2 | 1 | 1 |
| Check Vercel Bot Rewrites | 2 | 1 | 1 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-02 00:20 (cheap pulse — 7/7 proposals verified+promoted #10089-10098, +1 companion ai-fix filed #10102)
- 2026-11-01 18:08 (mid-day pulse — 7/7 proposals verified+promoted #10068-10074)
- 2026-11-01 12:13 (daily deep run — 8/8 proposals verified+promoted #10058-10065)
- 2026-11-01 06:12 (cheap pulse, pre-deep-run — 7/8 proposals promoted, 1 held #10031-10038)
- 2026-11-01 00:23 (cheap pulse — 8/8 proposals verified+promoted #10021-10028)
- 2026-11-02 06:17 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10103-10110)

## 📦 Shipped to main (20)

- #10150 fix: #10136 SEO batch: 15 drummer profiles still have biography-framed metaDescription — proven CTR-gap anti-pattern, roster-wide gap (63 total, this batch 1/5)
- #10149 fix: #10135 SEO: Expand /drummer/<slug>/<component> template — 29 URLs crawled-not-indexed (thin content, Google quality reject)
- #10148 fix: #10126 SEO: Matt Halpern djent-sticks guide in genreGearGuides.js still fabricates Vic Firth across 11 locations — #8419 only fixed 2 'reason' strings
- #10147 fix: #10125 SEO: Brann Dailor's Hushed and Grim album article still says Meinl Mb20/Mb8 — ground truth flipped to Byzance after #8383 shipped
- #10146 fix: #10124 SEO: Dave Lombardo albumArticles.js self-contradicts birth year (1964 vs 1965, verified 1965)
- #10145 fix: #10123 SEO: Frost (Satyricon) albumArticles.js fabricates birthdate and birthplace (June 21 1977 Oslo, verified June 28 1973 Øyer)
- #10144 fix: #10122 SEO: Hannes Grossmann albumArticles.js internally contradicts Alkaloid founding year (2014 vs 2015, 2 locations)
- #10143 fix: #10122 SEO: Hannes Grossmann albumArticles.js internally contradicts Alkaloid founding year (2014 vs 2015, 2 locations)
- #10142 fix: #10120 SEO: Jason Bittner albumArticles.js fabricates Shadows Fall join year as 1997 (verified 2001)
- #10141 fix: #10121 SEO: Kevin Talley albumArticles.js overstates Misery Index tenure + Kairos-violates Discordia (2006) credit
- #10140 fix: #10119 SEO: Martin Lopez albumArticles.js fabricates birthdate (Feb 8 1978, verified May 20 1978)
- #10139 fix: #6740 GSC-gap: 'jaska raatikainen' bare-name query 72 impr/1.39% CTR/pos 8.2 — metaDescription doesn't lead with gear answer
- #10134 fix: #10110 SEO: Blake Richardson stale Meinl crash-cymbal claims survive in 3 genreGearGuides.js guide families — verified Sabian since 2018
- #10133 fix: #10109 SEO: Richard Christy albumArticles.js states Death join year as 1996, verified 1997
- #10132 fix: #10108 SEO: Matt Halpern albumArticles.js debut-era entry — wrong birthdate + DW/Sabian-vs-Pearl/Meinl self-contradiction
- _+5 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2292h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2388h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2565h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3650h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6080h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
