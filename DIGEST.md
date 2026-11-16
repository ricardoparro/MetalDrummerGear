# MetalForge — Digest

*Generated 2026-11-16 19:09 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **22** |
| Open `seo-proposal` issues | 10 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 2 |
| PRs merged in window | **14** |
| Issues closed in window | 13 |
| Commits to `main` in window | 24 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **743** |
| Sessions | 814 |
| Page views | 1,049 |
| Engagement rate | 50.86% |
| GSC impressions | 14,938 |
| GSC clicks | 332 |
| GSC CTR | 2.22% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,496 |
| Est. ad revenue / mo | **~€13.49** |
| Progress to €1000/mo | 1.3% |
| Pageviews/mo needed for €1000 | ~333,333 (74× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 863 tracked queries) | 38 clicks · 5252 impr · CTR 0.7% · avg pos 10.8 | clicks (+4) · impr (−721) · pos (−0.2) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **13/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 226/250 indexed (−9) · rotating sample: 141/250 indexed · **full site: 2272 of 3158 sitemap URLs earned impressions (90d)** | 39 rejected-quality · 35 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1188ms · **worst: Album article (Sacrament drum setup) — 52 perf, LCP 11.0s** · 2/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (±0) · TBT (+49)ms · chronic (−2) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 20 (+1)
- 🆕 New this week: facebook.com
- Top sources: aocr.org (11) · uk.search.yahoo.com (8) · m.facebook.com (4) · facebook.com (3) · noai.duckduckgo.com (3)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 7d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 11d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 40d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 27 | 27 | 0 |
| Verify YouTube Videos | 15 | 7 | 6 |
| Verify Data Modules | 14 | 7 | 5 |
| Check Sitemap Drift | 14 | 7 | 5 |
| Perf Budget Gate | 7 | 0 | 5 |
| Check llms freshness | 7 | 0 | 5 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Verify API Modules | 2 | 1 | 1 |
| Check Video SEO | 2 | 0 | 2 |
| Check Vercel Bot Rewrites | 2 | 1 | 1 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 1 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-16 00:23 (cheap pulse — 4/4 proposals verified+promoted #10692/10694/10695/10697)
- 2026-11-15 06:12 (cheap pulse — 4/4 proposals verified+promoted #10659-10662)
- 2026-11-15 00:21 — overnight pulse: 3/3 promotable proposals verified+promoted #10651/10653/10654, GSC content-gap row r
- 2026-11-15 12:10 (deep run — 8/8 proposals verified+promoted #10667-10674)
- 2026-11-15 18:09 (cheap pulse — 3/3 proposals verified+promoted #10681-10683)
- 2026-11-16 06:18 (cheap pulse — 4/4 proposals verified+promoted #10699-10702)

## 📦 Shipped to main (14)

- #10731 fix: #10720 Indexation regression: /guides/best-*-for-* template — 9 sentinel URLs flipped indexed→crawled-not-indexed, same lastCrawlTime
- #10730 fix: #10714 SEO: soundLikeGuides.js Mike Portnoy snare shell fabricated as 'Maple' — ground truth says steel, snares.js lists him unverified
- #10729 fix: #10713 SEO: soundLikeGuides.js Dave Lombardo tuning tip still says 'aluminum shell' after #9439 fixed the snare to Maple
- #10728 fix: #10712 SEO: genres.js Black Metal page fabricates Ludwig/Tama as common brands for Inferno and Hellhammer — both are single-brand (Pearl/Sonor)
- #10727 fix: #10711 SEO: gearSearchData.js Danny Carey sticks field defaults to generic 'Vic Firth 5B' — verified field is his own signature model
- #10726 fix: #10710 SEO: gearSearchData.js Mike Portnoy sticks field points to Joey Jordison's signature product ID
- #10725 fix: #10709 SEO: gearSearchData.js George Kollias snare fabricated as 'Pearl George Kollias Signature' — verified field is 'not independently verified'
- #10724 fix: #10708 SEO: gearSearchData.js Eloy Casagrande ↔ Charlie Benante pedal (hardware) fields swapped
- #10723 fix: #10707 SEO: gearSearchData.js Dave Lombardo drums field wrong wood — 'Tama Starclassic Maple' vs verified Walnut/Birch
- #10719 fix: #10702 SEO: cymbalBrands.js claims Meinl Classics Custom Dark 'not yet present in a verified roster setup' — contradicted by 2 verified cymbalSetups.js entries
- #10718 fix: #10701 SEO: Travis Orbin's Periphery tenure still '2006-2009' in top10Lists.js source (6 locations) — prior #10654 fix only patched the generated catalog, will drift back on rebuild
- #10717 fix: #10701 SEO: Travis Orbin's Periphery tenure still '2006-2009' in top10Lists.js source (6 locations) — prior #10654 fix only patched the generated catalog, will drift back on rebuild
- #10716 fix: #10700 SEO: Eloy Casagrande shown as concurrent 'Sepultura / Slipknot' in nameGeneratorData.js, missing ex- qualifier
- #10715 fix: #10699 SEO: Mario Duplantier mis-keyed under Tama STAR Classic Maple instead of Bubinga in drummersByKit.js

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 318h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2628h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2724h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2901h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3986h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
