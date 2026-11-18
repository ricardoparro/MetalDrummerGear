# MetalForge — Digest

*Generated 2026-11-18 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **22** |
| Open `seo-proposal` issues | 10 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 2 |
| PRs merged in window | **16** |
| Issues closed in window | 15 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **762** |
| Sessions | 832 |
| Page views | 1,054 |
| Engagement rate | 47.12% |
| GSC impressions | 14,881 |
| GSC clicks | 314 |
| GSC CTR | 2.11% |
| GSC avg position | 7.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,517 |
| Est. ad revenue / mo | **~€13.55** |
| Progress to €1000/mo | 1.4% |
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
| Chris Adler — 54º aniversário | 5d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 9d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 38d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 67d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 31 | 31 | 0 |
| Verify Data Modules | 15 | 7 | 6 |
| Check Sitemap Drift | 15 | 7 | 6 |
| Verify YouTube Videos | 14 | 7 | 5 |
| Perf Budget Gate | 8 | 0 | 6 |
| Check llms freshness | 7 | 0 | 5 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 1 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-18 12:10 (deep run — 8/8 proposals verified+promoted #10818-10827; L1/L2/L3 not due)
- 2026-11-18 06:14 (cheap pulse — 7/7 proposals verified+promoted #10801-10807)
- 2026-11-18 00:19 (cheap pulse — 8/8 proposals verified+promoted #10793-10800)
- 2026-11-17 18:09 (mid-day pulse — 5/5 proposals verified+promoted #10774-10778)
- 2026-11-17 12:10 (deep run — 8/8 proposals verified+promoted #10763-10770; L1/L2/L3 not due this run)
- 2026-11-17 00:19 (cheap pulse — 8/8 proposals verified+promoted #10734-10741)

## 📦 Shipped to main (16)

- #10841 fix: #10827 SEO batch: nameGeneratorData.js Jay Weinberg + Shannon Larkin band strings stale vs root (2 entries)
- #10840 fix: #10825 SEO: cymbalBestForMetal.js asserts a B20-alloy majority and a ride/crash pairing pattern not supported by cymbalSetups.js
- #10839 fix: #10818 SEO batch: top10Lists.js fabricates George Kollias blast-beat speed as '280+ BPM' across ~40 locations — verified figure is 240+ BPM
- #10838 fix: #10824 SEO: pedalBestForMetal.js fabricates pedal-count statistics and cites a price range not present in any data field
- #10837 fix: #10823 SEO: top10Lists.js dates Gojira's 'Silvera' Grammy nomination to the wrong ceremony (58th/2016 vs verified 59th/2017) + unsupported 'first' claim
- #10836 fix: #10821 SEO: top10Lists.js credits Inferno with Behemoth's 'Grom' (1996, recorded by predecessor) + inflates his 90s output to 'four albums'
- #10835 fix: #10820 SEO: top10Lists.js credits Jason Bittner with 'Overkill's classic thrash catalog' — he joined in 2017, decades after it
- #10834 fix: #10819 SEO: top10Lists.js keys Alex Bent's bio text under Isaac Lamb's drummer ID (61 instead of 25) in 3 lists
- #10831 fix: #10807 SEO: snares.js header comment + top10ListsCatalog.js signature-snare list still classify Danny Carey as unverified — root has verified:true since 2026-08-08 (same bug class as #10763, which only fixed Charlie Benante)
- #10830 fix: #10806 SEO: kitQuizData.js Question 10 (Vinnie Paul) asserts specific drums/cymbals/hardware models that root explicitly hedges as unverified — hardware brand is flat-out wrong (DW vs ddrum)
- #10829 fix: #10805 SEO: kitQuizData.js Question 9 (Mario Duplantier) fabricates signature snare model + wrong pedal line/configuration
- #10828 fix: #10805 SEO: kitQuizData.js Question 9 (Mario Duplantier) fabricates signature snare model + wrong pedal line/configuration
- #10826 fix: #10804 SEO: kitQuizData.js Question 7 (Mike Portnoy) drums field copy-pasted from Dave Lombardo's entry + fabricated 'Rolling Glide' pedal name
- #10822 fix: #10803 SEO: kitQuizData.js Question 6 (George Kollias) fabricates a signature snare model + wrong pedal name — root marks snare unverified, pedal is Demon XR not 'Demon Drive Direct'
- #10817 fix: #10802 SEO: extendedBios.js Joey Jordison self-contradicts its own FAQ — metaTitle/metaDescription + one FAQ answer still say 'Pearl Masters Premium Maple', another FAQ answer already says 'Pearl Reference Series'
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 366h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2676h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2772h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2949h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4034h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
