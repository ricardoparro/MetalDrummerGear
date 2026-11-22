# MetalForge — Digest

*Generated 2026-11-22 08:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **17** |
| Issues closed in window | 18 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **858** |
| Sessions | 920 |
| Page views | 1,197 |
| Engagement rate | 40.43% |
| GSC impressions | 12,466 |
| GSC clicks | 250 |
| GSC CTR | 2.01% |
| GSC avg position | 7.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~5,130 |
| Est. ad revenue / mo | **~€15.39** |
| Progress to €1000/mo | 1.5% |
| Pageviews/mo needed for €1000 | ~333,333 (65× current) |

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
| Chris Adler — 54º aniversário | 1d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 5d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 34d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 63d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 58 | 54 | 4 |
| Check llms freshness | 20 | 0 | 20 |
| Verify YouTube Videos | 3 | 2 | 1 |
| Health Check | 3 | 3 | 0 |
| Check Sitemap Drift | 2 | 1 | 1 |
| Verify Data Modules | 2 | 1 | 1 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Perf Budget Gate | 1 | 0 | 1 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-22 00:20 (cheap pulse — 8/8 proposals verified+promoted #10952/10953/10955-10960)
- 2026-11-21 18:08 (mid-day pulse — 8/8 proposals verified+promoted #10938-10945)
- 2026-11-21 12:10 (daily deep run — 4/4 proposals verified+promoted #10929-10932)
- 2026-11-21 06:11 (cheap pulse — 5/5 proposals verified+promoted #10918-10922)
- 2026-11-21 00:19 (cheap pulse — 5/5 proposals verified+promoted #10913-10917)
- 2026-11-22 06:12 (cheap pulse — 8/8 proposals verified+promoted #10966-10973, + #7981 closed/resolved)

## 📦 Shipped to main (17)

- #10997 fix: #10983 fix: genreGearGuides.js snare-guide section mislabels Derek Roddy's kit shell as his snare model — verified Tama SLP Black Brass, not Starclassic Bubinga
- #10996 fix: #10973 SEO: public/llms/gear-comparison/drummers-using-pearl-reference-pure.md fabricates Nick Augusto's pedal brand + invents shell sizes
- #10995 fix: #10972 SEO: public/llms/gear-history/tomas-haake.md wrong year for Sonor signature snare — 2008 vs verified 2005
- #10994 fix: #10971 SEO: public/llms/gear-history/ryan-van-poederooyen.md fabricates specific snare model + wrong stick size
- #10992 fix: #10970 SEO: public/llms/gear-history/paul-mazurkiewicz.md fabricates Sabian cymbals throughout — verified Meinl since the 1990s
- #10991 fix: #10969 SEO: public/llms/gear-history/nick-menza.md fabricates a 'Tama Titan Hardware' pedal for the Rust in Peace era
- #10990 fix: #10968 SEO: public/llms/gear-history/mikkey-dee.md stale 'Tama 1993-2012' era — ground truth flipped to Sonor continuous since 1992
- #10989 fix: #10967 SEO: public/llms/gear-history/mike-mangini.md fabricates Vic Firth sticks + a nonexistent 2013 Ludwig kit detour
- #10988 fix: #10966 SEO: public/llms/gear-history/gene-hoglan.md fabricates a 'Pearl Eliminator' pedal history + over-specific snare model
- #10981 fix: #10959 SEO: Art Cruz gear-history mirror has wrong Winds of Plague / Prong tenure years (re-drifted after #9144's root fix)
- #10982 fix: #10960 SEO: Daray gear-history mirror wrong stick brand (Promark vs verified Vic Firth) + wrong crash cymbal sizes
- #10979 fix: #10956 SEO batch: Flo Mounier gear-history mirror invents fabricated Pearl Reference Custom + Sonor SQ2 eras (2005-2012)
- #10980 fix: #10958 SEO: Dave Lombardo gear-history mirror says Tama Starclassic Maple, verified Walnut/Birch (3 locations)
- #10977 fix: #10957 SEO batch: Derek Roddy gear-history mirror fabricates entire 2008-present rig (DW/Meinl Classics/Vic Firth vs verified Tama/Meinl Byzance-Mb20/Vater)
- #10976 fix: #10955 SEO batch: Daniel Erlandsson gear-history mirror fabricates cymbal/stick brand throughout (Meinl→Sabian, Vic Firth→ProMark, ~15 locations)
- _+2 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 451h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2761h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2857h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 3034h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4119h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
