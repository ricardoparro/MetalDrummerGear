# MetalForge — Digest

*Generated 2026-11-21 08:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **11** |
| Issues closed in window | 11 |
| Commits to `main` in window | 15 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **870** |
| Sessions | 933 |
| Page views | 1,186 |
| Engagement rate | 40.30% |
| GSC impressions | 14,855 |
| GSC clicks | 293 |
| GSC CTR | 1.97% |
| GSC avg position | 7.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~5,083 |
| Est. ad revenue / mo | **~€15.25** |
| Progress to €1000/mo | 1.5% |
| Pageviews/mo needed for €1000 | ~333,333 (66× current) |

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
| PR Merger | 31 | 30 | 1 |
| Verify YouTube Videos | 14 | 7 | 7 |
| Check Sitemap Drift | 13 | 6 | 7 |
| Verify Data Modules | 12 | 6 | 6 |
| Check llms freshness | 11 | 0 | 11 |
| Perf Budget Gate | 6 | 0 | 6 |
| Check Video SEO | 4 | 0 | 4 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-21 06:11 (cheap pulse — 5/5 proposals verified+promoted #10918-10922)
- 2026-11-21 00:19 (cheap pulse — 5/5 proposals verified+promoted #10913-10917)
- 2026-11-20 00:19 (cheap pulse — 3/3 proposals verified+promoted #10887/10888/10890)
- 2026-11-20 06:12 (cheap pulse — 2/2 proposals verified+promoted #10893/#10894)
- 2026-11-20 12:10 (daily deep run — 2/2 proposals verified+promoted #10897/#10898)
- 2026-11-20 18:09 (mid-day pulse — 5/5 proposals verified+promoted #10901-10905)

## 📦 Shipped to main (11)

- #10937 fix: #10922 SEO: endorsementNews.js missing 1991 CYMBALS timeline entry for Sean Reinert — Zildjian A series origin only documented in the DRUMS category's notes
- #10936 fix: #10921 SEO: public/llms/guides/best-snare-drums-for-black-metal.md fabricates Frost's snare as 'Sonor SQ2 14x6" Maple' — verified Tama Starclassic Bubinga 14x5.5"
- #10935 fix: #10920 SEO: public/llms/guides/best-cymbals-for-progressive-metal.md says Blake Richardson 'trusts Meinl Byzance cymbals' — he switched to Sabian in 2018
- #10934 fix: #10919 SEO: public/llms/guides/best-drum-kits-for-djent.md fabricates Tomas Haake (TAMA Starclassic) + Matt Halpern (Pearl Reference Pure) — verified Sonor SQ2 / Pearl Reference Series
- #10933 fix: #10918 SEO: genreGearGuides.js fabricates Derek Roddy's ride cymbal as '22" Meinl Byzance Raw Bell Dark Ride' in 2 guide families — verified 21" Meinl Mb20 Heavy Ride
- #10928 fix: #10917 SEO: drummersByKit.js still files Jason Bittner under the wrong top-level kit key (mapex/armory) after #7655's data-only fix
- #10927 fix: #10887 SEO: regenerate /studies data files — 27 source-data commits of drift since last regen (#10512, 2026-11-10)
- #10926 fix: #10916 SEO: drummersByKit.js Tomas Haake entry fabricates a second bass drum + wrong tom sizes
- #10925 fix: #10915 SEO: licks/mikkey-dee.js still has 3 more 'Tama Artstar II/Swingstar Kit' entries — closed #10667 only fixed 3 of 6
- #10924 fix: #10914 SEO batch: licks/*.js drummerId doesn't match drummerName in 20 files — internal self-contradiction, likely wrong profile links
- #10923 fix: #10913 SEO CRITICAL: api/drummers/index.js has a duplicate 'bands' key in Igor Cavalera's record — second array silently overwrites his real bands

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 427h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2737h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2833h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 3010h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4095h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
