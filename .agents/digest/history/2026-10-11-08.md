# MetalForge — Digest

*Generated 2026-10-11 08:21 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **21** |
| Open `seo-proposal` issues | 13 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **15** |
| Issues closed in window | 15 |
| Commits to `main` in window | 19 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **387** |
| Sessions | 436 |
| Page views | 575 |
| Engagement rate | 55.05% |
| GSC impressions | 9,590 |
| GSC clicks | 189 |
| GSC CTR | 1.97% |
| GSC avg position | 7.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,464 |
| Est. ad revenue / mo | **~€7.39** |
| Progress to €1000/mo | 0.7% |
| Pageviews/mo needed for €1000 | ~333,333 (135× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 500 tracked queries) | 35 clicks · 3425 impr · CTR 1.0% · avg pos 9.3 | clicks (+11) · impr (+868) · pos (−0.7) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **47/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 238/250 indexed (−2) · rotating sample: 234/250 indexed · **full site: 2269 of 3162 sitemap URLs earned impressions (90d)** | 3 rejected-quality · 12 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 75 perf · TBT 1163ms · **worst: Top-10 list (best death metal drummers) — 50 perf, LCP 12.8s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+4) · TBT (−691)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (+1)
- 🆕 New this week: au.search.yahoo.com
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 20d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 43d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 47d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| Verify YouTube Videos | 17 | 9 | 7 |
| PR Merger | 16 | 16 | 0 |
| Verify Data Modules | 16 | 8 | 7 |
| Check Sitemap Drift | 16 | 8 | 7 |
| Check llms freshness | 9 | 0 | 8 |
| Perf Budget Gate | 8 | 0 | 7 |
| .github/workflows/check-vercel-rewrites.yml | 8 | 0 | 8 |
| Verify API Modules | 2 | 1 | 1 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-11 06:19 (cheap pulse — 8/8 fresh proposals verified+promoted, #8871-8878)
- 2026-10-11 00:36 — Evening-review catch-up: 8/8 fresh proposals verified+promoted (#8863-8870), 4 clean + 4 with tighten
- 2026-10-10 00:36 (evening review — 8/8 proposals verified+promoted, #8804-8811)
- 2026-10-10 06:19 (cheap pulse — 4/4 fresh proposals verified+promoted, #8821-8824)
- 2026-10-10 12:16 (deep run — 6/6 proposals verified+promoted, #8831-8836)
- 2026-10-10 18:16 (mid-day pulse — 8/8 proposals verified+promoted, #8841-8848)

## 📦 Shipped to main (15)

- #8901 fix: #8877 SEO: Jocke Wallgren soundLikeGuides.js snare self-contradicts as brass-shell — verified maple Reference Pure, same file's own kit field
- #8900 fix: #8876 SEO: Matt Garstka gearPriceHistory.js claims 2016 signature snare/sticks launch — verified both released 2014, used on The Joy of Motion itself
- #8899 fix: #8874 SEO: Jason Bittner gearPriceHistory.js fabricates 2012 Overkill full-time join — verified May 2017
- #8898 fix: #8875 SEO: Flo Mounier gearPriceHistory.js 1996 sticks field fabricates Vic Firth 5B — verified 5A American Classic since 1992
- #8897 fix: #8873 SEO: Daray drummerEvolution.js 2008-2017 era fabricates 'Pearl Masterworks Stadium Exotic' kit — verified Pearl Reference Pure
- #8896 fix: #8872 SEO: Nick Menza drummerEvolution.js Cryptic Writings era fabricates 'Premier Signia' drums/Zildjian cymbals — verified Pearl Masterworks/Sabian AA
- #8895 fix: #8871 SEO: Brann Dailor drummerComparisons.js fabricates Meinl Byzance cymbals (6 locations) — verified Meinl Mb20 & Mb8 Series
- #8885 fix: #8870 SEO: Abe Cunningham gearPriceHistory.js 2000 setup.sticks claims Vic Firth — verified Pro-Mark since 1997, no documented switch
- #8886 fix: #8868 SEO: Hannes Grossmann gearPriceHistory.js 2009 setup.heads dates Evans 5 years before verified 2014 signing
- #8884 fix: #8869 SEO: Derek Roddy gearPriceHistory.js setup.heads says Remo at 2005 — verified Evans since 2001, and the entry's own 2018 priceEvolution row already says Evans
- #8883 fix: #8865 SEO: Tim Yeung gearPriceHistory.js 2005 setup fabricates Pearl drums + DW hardware — verified Tama Starclassic Bubinga + Tama Speed Cobra established that same year/album
- #8882 fix: #8867 SEO: Gene Hoglan gearPriceHistory.js 1993 setup.sticks claims Pro-Mark 747 Oak — verified ProMark wasn't signed until 2018
- #8881 fix: #8866 SEO: Ben Koller gearPriceHistory.js 2001 setup.cymbals claims Zildjian A Series — verified Zildjian wasn't signed until 2004
- #8880 fix: #8864 SEO: Daniel Erlandsson gearPriceHistory.js setup.drums still says 'Pearl Masters Premium' at 2001 — same album's own Reference Pure switch already fixed elsewhere in the file
- #8879 fix: #8863 SEO: Adrian Erlandsson gearPriceHistory.js priceEvolution still carries 2 fabricated 1998/2011 era rows — verified single 2014 switch

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1753h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1849h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2026h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3111h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5541h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
