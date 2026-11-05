# MetalForge — Digest

*Generated 2026-11-05 08:15 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **18** |
| Issues closed in window | 18 |
| Commits to `main` in window | 22 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **433** |
| Sessions | 498 |
| Page views | 702 |
| Engagement rate | 64.06% |
| GSC impressions | 16,215 |
| GSC clicks | 290 |
| GSC CTR | 1.79% |
| GSC avg position | 8.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,009 |
| Est. ad revenue / mo | **~€9.03** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (111× current) |

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
| Chris Adler — 54º aniversário | 18d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 22d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 51d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 30 | 30 | 0 |
| Verify YouTube Videos | 13 | 7 | 6 |
| Verify Data Modules | 12 | 6 | 6 |
| Check Sitemap Drift | 12 | 6 | 6 |
| Check llms freshness | 11 | 0 | 11 |
| Perf Budget Gate | 7 | 0 | 7 |
| Check Video SEO | 6 | 0 | 6 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Event Scanner | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-05 06:13 (cheap pulse, pre-deep-run — 7/7 proposals verified+promoted #10267-10273, 2 follow-ups filed #10282/#1
- 2026-11-05 00:19 (cheap pulse — 8/8 proposals verified+promoted #10258-10266)
- 2026-11-04 18:09 (mid-day pulse — 8/8 proposals verified+promoted #10235-10242)
- 2026-11-04 12:11 (daily deep run — 5/5 proposals verified+promoted #10220-10224)
- 2026-11-04 06:12 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10203-10210)
- 2026-11-04 00:19 (cheap pulse — 8/8 proposals verified+promoted #10193-10201)

## 📦 Shipped to main (18)

- #10302 fix: #10284 event: refresh /drummer/lars-ulrich — Lars Ulrich 63º aniversário (2026-12-26)
- #10301 fix: #10283 fix: gearPriceHistory.js + albumArticles/jocke-wallgren.js fabricate 'Rage, Evergrey' bands — verified Valkyria-only
- #10300 fix: #10282 fix: albumArticles/charlie-benante.js trackAnalysis has duplicate entries with conflicting BPMs for 3 Anthrax songs
- #10299 fix: #10273 SEO: public/llms/gear-history/igor-cavalera.md omits 1996 Tama switch — fabricates continuous 'Pearl' through 2006+
- #10298 fix: #10272 SEO: public/llms/gear-history/daray.md — Vader tenure wrong (2006-2016 vs 2004-2008) + Eonian-era Pearl-vs-Tama fabrication
- #10297 fix: #10271 SEO: public/llms/gear-history/jocke-wallgren.md fabricates Tama/DW rig + 'Rage, Evergrey' bands — verified Pearl/Vic Firth + Valkyria
- #10296 fix: #10270 SEO: public/llms/gear-history/frost.md fabricates whole-career 'Sonor' brand — verified Pearl→Tama since 2013
- #10295 fix: #10269 SEO: licks/adrian-erlandsson.js 'Blinded by Fear' BPM drift (195→250) vs metalSongsBpm.js
- #10294 fix: #10268 SEO: licks/charlie-benante.js BPM drift on 3 Anthrax songs vs metalSongsBpm.js
- #10293 fix: #10267 SEO: licks/brann-dailor.js BPM drift on 2 Mastodon songs (3 locations) vs metalSongsBpm.js
- #10281 fix: #10265 SEO: licks/vinnie-paul.js — 3 Pantera songs' BPM drift from metalSongsBpm.js (up to 76 BPM overstatement)
- #10280 fix: #10266 SEO: licks/jon-dette.js 'Postmortem' BPM drift (190→90) — sibling to open #10239 (dave-lombardo.js), same song, same error
- #10279 fix: #10264 SEO: licks/inferno.js — 3 Behemoth songs' BPM drift from metalSongsBpm.js (up to 85 BPM overstatement)
- #10278 fix: #10263 SEO: licks/matt-halpern.js — pedal field still anachronistic Pearl Demon Drive on 3 pre-2015 entries (gap left by #7031) + 4 BPM drifts
- #10277 fix: #10262 SEO: licks/martin-lopez.js — 'Bleak' wrong album + 3 BPM drifts + Soen-era cymbal model error
- _+3 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 44h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2353h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2449h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2626h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3711h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
