# MetalForge — Digest

*Generated 2026-11-02 08:16 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **17** |
| Issues closed in window | 17 |
| Commits to `main` in window | 24 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **450** |
| Sessions | 507 |
| Page views | 724 |
| Engagement rate | 63.12% |
| GSC impressions | 17,518 |
| GSC clicks | 291 |
| GSC CTR | 1.66% |
| GSC avg position | 8.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,103 |
| Est. ad revenue / mo | **~€9.31** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (107× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 775 tracked queries) | 39 clicks · 9064 impr · CTR 0.4% · avg pos 10.9 | clicks (+16) · impr (−4373) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **17/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 238/249 indexed (+1) · rotating sample: 191/248 indexed · **full site: 2268 of 3159 sitemap URLs earned impressions (90d)** | 27 rejected-quality · 17 never-crawled |
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
| PR Merger | 22 | 22 | 0 |
| Verify YouTube Videos | 17 | 9 | 8 |
| Verify Data Modules | 16 | 8 | 8 |
| Check Sitemap Drift | 16 | 8 | 8 |
| Check llms freshness | 9 | 0 | 9 |
| Perf Budget Gate | 8 | 0 | 8 |
| Daily Digest | 1 | 0 | 0 |
| Check GSC watched queries | 1 | 1 | 0 |
| Check backlink signal | 1 | 1 | 0 |
| Check LLM citations | 1 | 1 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Check broken images | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-02 00:20 (cheap pulse — 7/7 proposals verified+promoted #10089-10098, +1 companion ai-fix filed #10102)
- 2026-11-01 18:08 (mid-day pulse — 7/7 proposals verified+promoted #10068-10074)
- 2026-11-01 12:13 (daily deep run — 8/8 proposals verified+promoted #10058-10065)
- 2026-11-01 06:12 (cheap pulse, pre-deep-run — 7/8 proposals promoted, 1 held #10031-10038)
- 2026-11-01 00:23 (cheap pulse — 8/8 proposals verified+promoted #10021-10028)
- 2026-11-02 06:17 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10103-10110)

## 📦 Shipped to main (17)

- #10134 fix: #10110 SEO: Blake Richardson stale Meinl crash-cymbal claims survive in 3 genreGearGuides.js guide families — verified Sabian since 2018
- #10133 fix: #10109 SEO: Richard Christy albumArticles.js states Death join year as 1996, verified 1997
- #10132 fix: #10108 SEO: Matt Halpern albumArticles.js debut-era entry — wrong birthdate + DW/Sabian-vs-Pearl/Meinl self-contradiction
- #10131 fix: #10106 SEO: Tim Yeung albumArticles.js fabricates Morbid Angel 'Kingdoms Disdained' (2017) credit + wrong tenure era
- #10130 fix: #10107 SEO: John Otto albumArticles.js FAQ omits verified 2005 Sammy Siegler fill-in
- #10129 fix: #10105 SEO: Inferno (Behemoth) albumArticles.js fabricates birthdate/birthplace across 10 locations
- #10128 fix: #10103 SEO: Pete Sandoval albumArticles.js fabricates birthdate + extends Morbid Angel tenure to 2013
- #10127 fix: #10104 SEO: Derek Roddy albumArticles.js fabricates birthdate/birthplace + overstated Hate Eternal tenure
- #10118 fix: #10102 SEO: public/llms/guides/how-to-sound-like-scott-travis.md stale — still claims current Tama kit, missing ddrum/Pearl eras
- #10117 fix: #10098 SEO: public/llms/gear-history/scott-travis.md fabricates post-2000 gear eras (Sabian/Vater/Tama) — verified Paiste/Vic Firth/ddrum
- #10116 fix: #10096 SEO: Arin Ilejay sticks fabricated as 'Vic Firth 5A' in gearPriceHistory.js + its llms mirror — verified Promark 5B
- #10115 fix: #10093 SEO: Hannes Grossmann open-handed technique described backwards in albumArticles/hannes-grossmann.js — right/left hands swapped
- #10114 fix: #10095 SEO: Nick Barker gearPriceHistory.js fabricates Sonor shell material/sizes, contradicting its own 'not itemized by Sonor' note
- #10113 fix: #10094 SEO: John Longstreth gearPriceHistory.js fabricates Pearl shell model/sizes, contradicting its own 'not independently accessed' hedge
- #10112 fix: #10089 SEO: George Kollias fabricated as playing 'Pearl Reference drums' in drummerComparisons.js — verified Pearl Masterworks
- _+2 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2281h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2377h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2554h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3639h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6069h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
