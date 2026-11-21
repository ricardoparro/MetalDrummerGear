# MetalForge — Digest

*Generated 2026-11-21 19:07 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 17 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 3 |
| PRs merged in window | **9** |
| Issues closed in window | 9 |
| Commits to `main` in window | 14 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **916** |
| Sessions | 982 |
| Page views | 1,258 |
| Engagement rate | 39.71% |
| GSC impressions | 14,855 |
| GSC clicks | 293 |
| GSC CTR | 1.97% |
| GSC avg position | 7.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~5,391 |
| Est. ad revenue / mo | **~€16.17** |
| Progress to €1000/mo | 1.6% |
| Pageviews/mo needed for €1000 | ~333,333 (62× current) |

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
| Chris Adler — 54º aniversário | 2d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 6d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 35d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 64d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 53 | 52 | 0 |
| Check llms freshness | 7 | 0 | 5 |
| Verify Data Modules | 6 | 3 | 3 |
| Check Sitemap Drift | 6 | 3 | 3 |
| Verify YouTube Videos | 6 | 3 | 3 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| Health Check | 4 | 4 | 0 |
| Perf Budget Gate | 3 | 0 | 3 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-21 18:08 (mid-day pulse — 8/8 proposals verified+promoted #10938-10945)
- 2026-11-21 12:10 (daily deep run — 4/4 proposals verified+promoted #10929-10932)
- 2026-11-21 06:11 (cheap pulse — 5/5 proposals verified+promoted #10918-10922)
- 2026-11-21 00:19 (cheap pulse — 5/5 proposals verified+promoted #10913-10917)
- 2026-11-20 00:19 (cheap pulse — 3/3 proposals verified+promoted #10887/10888/10890)
- 2026-11-20 06:12 (cheap pulse — 2/2 proposals verified+promoted #10893/#10894)

## 📦 Shipped to main (9)

- #10949 fix: #10932 SEO: Alex Bent snare depth wrong in 2 files — 'TAMA Starclassic Maple 14x6.5"' vs verified 14x5"
- #10948 fix: #10930 SEO: Morgan Ågren's snare model name stuck at 'Sonor Designer Maple' across 3 files — verified 'Sonor SQ2 Beech'
- #10947 fix: #10931 SEO: public/llms/guides/how-to-sound-like-tim-yeung.md entirely fabricates Tim Yeung's kit (Pearl/Sabian/DW) — verified Tama Starclassic Bubinga + Sabian AAX/HHX + Speed Cobra 910
- #10946 fix: #10929 SEO: genreGearGuides.js fabricates Art Cruz's Ludwig Black Beauty snare shell as 'bronze' — verified brass (self-contradicting within the same file)
- #10937 fix: #10922 SEO: endorsementNews.js missing 1991 CYMBALS timeline entry for Sean Reinert — Zildjian A series origin only documented in the DRUMS category's notes
- #10936 fix: #10921 SEO: public/llms/guides/best-snare-drums-for-black-metal.md fabricates Frost's snare as 'Sonor SQ2 14x6" Maple' — verified Tama Starclassic Bubinga 14x5.5"
- #10935 fix: #10920 SEO: public/llms/guides/best-cymbals-for-progressive-metal.md says Blake Richardson 'trusts Meinl Byzance cymbals' — he switched to Sabian in 2018
- #10934 fix: #10919 SEO: public/llms/guides/best-drum-kits-for-djent.md fabricates Tomas Haake (TAMA Starclassic) + Matt Halpern (Pearl Reference Pure) — verified Sonor SQ2 / Pearl Reference Series
- #10933 fix: #10918 SEO: genreGearGuides.js fabricates Derek Roddy's ride cymbal as '22" Meinl Byzance Raw Bell Dark Ride' in 2 guide families — verified 21" Meinl Mb20 Heavy Ride

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 438h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2748h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2844h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 3021h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4106h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
