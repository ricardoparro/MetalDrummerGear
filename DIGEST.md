# MetalForge — Digest

*Generated 2026-11-05 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 3 |
| PRs merged in window | **18** |
| Issues closed in window | 18 |
| Commits to `main` in window | 23 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **456** |
| Sessions | 526 |
| Page views | 730 |
| Engagement rate | 64.26% |
| GSC impressions | 16,215 |
| GSC clicks | 290 |
| GSC CTR | 1.79% |
| GSC avg position | 8.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,129 |
| Est. ad revenue / mo | **~€9.39** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (107× current) |

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
| PR Merger | 57 | 57 | 0 |
| Check llms freshness | 13 | 0 | 10 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| Health Check | 4 | 4 | 0 |
| Verify Data Modules | 3 | 0 | 1 |
| Check Sitemap Drift | 3 | 0 | 1 |
| Verify YouTube Videos | 3 | 0 | 1 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Perf Budget Gate | 1 | 0 | 0 |
| Check Video SEO | 1 | 0 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-05 18:09 (cheap pulse — 8/8 proposals verified+promoted #10303-10310)
- 2026-11-05 12:11 (daily deep run — 8/8 proposals promoted #10285-10292, eloy-casagrande CTR-gap ruled already-addressed)
- 2026-11-05 06:13 (cheap pulse, pre-deep-run — 7/7 proposals verified+promoted #10267-10273, 2 follow-ups filed #10282/#1
- 2026-11-05 00:19 (cheap pulse — 8/8 proposals verified+promoted #10258-10266)
- 2026-11-04 18:09 (mid-day pulse — 8/8 proposals verified+promoted #10235-10242)
- 2026-11-04 12:11 (daily deep run — 5/5 proposals verified+promoted #10220-10224)

## 📦 Shipped to main (18)

- #10318 fix: #10292 SEO: public/llms/gear-history/sean-reinert.md wrong Death/Cynic tenure dates — verified 1991-1992 Death, 1987 Cynic founding
- #10317 fix: #10291 SEO: public/llms/gear-history/travis-orbin.md fabricates a Darkest Hour band-member era (2017-2019) — verified 2013-2015 touring role only
- #10316 fix: #10290 SEO: public/llms/gear-history/dirk-verbeuren.md fabricates DW/Zildjian era + wrong snare/stick models
- #10315 fix: #10289 SEO: public/llms/gear-history/pete-sandoval.md fabricates Pearl/Tama/Sabian lineage — verified ddrum throughout, undocumented cymbal brand
- #10314 fix: #10288 SEO: public/llms/gear-history/chris-adler.md fabricates DW/Pearl/Black Panther era — verified continuous Mapex
- #10313 fix: #10287 SEO: public/llms/gear-history/bill-ward.md fabricates entire kit/cymbal/stick lineage — verified Ludwig Standard/Zildjian/Pro-Mark
- #10312 fix: #10286 SEO: public/llms/gear-history/abe-cunningham.md fabricates entire drum/stick brand lineage — verified continuous Tama/Pro-Mark
- #10311 fix: #10285 SEO: public/llms/evolution/igor-cavalera.md fabricates Zildjian cymbal narrative (1989-2006) — verified Paiste
- #10302 fix: #10284 event: refresh /drummer/lars-ulrich — Lars Ulrich 63º aniversário (2026-12-26)
- #10301 fix: #10283 fix: gearPriceHistory.js + albumArticles/jocke-wallgren.js fabricate 'Rage, Evergrey' bands — verified Valkyria-only
- #10300 fix: #10282 fix: albumArticles/charlie-benante.js trackAnalysis has duplicate entries with conflicting BPMs for 3 Anthrax songs
- #10299 fix: #10273 SEO: public/llms/gear-history/igor-cavalera.md omits 1996 Tama switch — fabricates continuous 'Pearl' through 2006+
- #10298 fix: #10272 SEO: public/llms/gear-history/daray.md — Vader tenure wrong (2006-2016 vs 2004-2008) + Eonian-era Pearl-vs-Tama fabrication
- #10297 fix: #10271 SEO: public/llms/gear-history/jocke-wallgren.md fabricates Tama/DW rig + 'Rage, Evergrey' bands — verified Pearl/Vic Firth + Valkyria
- #10296 fix: #10270 SEO: public/llms/gear-history/frost.md fabricates whole-career 'Sonor' brand — verified Pearl→Tama since 2013
- _+3 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 54h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2364h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2460h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2637h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3722h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
