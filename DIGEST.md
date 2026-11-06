# MetalForge — Digest

*Generated 2026-11-06 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 17 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 4 |
| PRs merged in window | **16** |
| Issues closed in window | 15 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **442** |
| Sessions | 511 |
| Page views | 723 |
| Engagement rate | 63.99% |
| GSC impressions | 15,683 |
| GSC clicks | 308 |
| GSC CTR | 1.96% |
| GSC avg position | 8.4 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,099 |
| Est. ad revenue / mo | **~€9.30** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (108× current) |

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
| Chris Adler — 54º aniversário | 17d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 21d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 50d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 60 | 58 | 0 |
| Check llms freshness | 14 | 0 | 10 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| Health Check | 4 | 4 | 0 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Verify Data Modules | 2 | 1 | 1 |
| Check Sitemap Drift | 2 | 1 | 1 |
| Verify YouTube Videos | 2 | 1 | 1 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |
| Perf Budget Gate | 1 | 0 | 1 |

## 🧠 Today's CEO decisions

- 2026-11-06 00:20 (cheap pulse — 8/8 proposals verified+promoted #10327-10334)
- 2026-11-05 18:09 (cheap pulse — 8/8 proposals verified+promoted #10303-10310)
- 2026-11-05 12:11 (daily deep run — 8/8 proposals promoted #10285-10292, eloy-casagrande CTR-gap ruled already-addressed)
- 2026-11-05 06:13 (cheap pulse, pre-deep-run — 7/7 proposals verified+promoted #10267-10273, 2 follow-ups filed #10282/#1
- 2026-11-05 00:19 (cheap pulse — 8/8 proposals verified+promoted #10258-10266)
- 2026-11-06 06:14 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10335-10342)

## 📦 Shipped to main (16)

- #10382 fix: #10358 SEO: public/llms/comparisons/scott-travis-vs-nicko-mcbrain.md fabricates Nicko McBrain's drum-kit brand (Sonor SQ2 vs verified British Drum Co.)
- #10381 fix: #10357 SEO: public/llms/comparisons/martin-axenrot-vs-martin-lopez.md fabricates both drummers' gear
- #10380 fix: #10356 SEO: public/llms/comparisons/mario-duplantier-vs-hellhammer.md wrong Hellhammer Dimmu Borgir tenure (2005-2010 vs verified 1999-2013)
- #10379 fix: #10355 SEO: public/llms/comparisons/gavin-harrison-vs-mike-mangini.md fabricates Mangini's record year, album count, and pedal model
- #10378 fix: #10354 SEO: public/llms/comparisons/flo-mounier-vs-george-kollias.md fabricates Kollias BPM (280+→240+) and Mounier pedal model
- #10377 fix: #10352 SEO: public/llms/gear-history/navene-koperweis.md fabricates DW/Byzance-Extra-Dry gear for 2009-2012 era + wrong 2014 AAL departure year
- #10376 fix: #10353 SEO: public/llms/comparisons/dirk-verbeuren-vs-paul-bostaph.md fabricates both drummers' current gear
- #10367 fix: #10342 SEO: public/llms/evolution/ryan-van-poederooyen.md + drummerEvolution.js:19682 carry fabricated snare model already corrected elsewhere
- #10366 fix: #10341 SEO: public/llms/gear-history/brann-dailor.md wholesale-fabricates Mapex/Gretsch/Zildjian/Vic-Firth rig — verified continuous Tama/Meinl/Vater since 2000 (sibling evolution.md already fixed by #9156, this mirror never swept)
- #10365 fix: #10340 SEO: public/llms/gear-history/inferno.md wholesale-fabricates Sonor/Pearl-Custom/Meinl rig + wrong join year — verified Pearl Reference Series/Paiste RUDE/Czarcie Kopyto since 1997
- #10364 fix: #10339 SEO: public/llms/gear-history/matt-halpern.md wholesale-fabricates DW/Mapex rig — verified continuous Pearl Reference Series since 2015
- #10363 fix: #10338 SEO: public/llms/gear-history/matt-greiner.md omits verified 2016 Mapex/Paiste/DW switch + fabricates nonexistent 2023 'Pearl Masterworks Custom' era
- #10362 fix: #10337 SEO: public/llms/gear-history/nick-augusto.md wrong Trivium join year + fabricated pedal/sticks — verified 2010 join, DW 9000/ProMark
- #10361 fix: #10337 SEO: public/llms/gear-history/nick-augusto.md wrong Trivium join year + fabricated pedal/sticks — verified 2010 join, DW 9000/ProMark
- #10360 fix: #10336 SEO: public/llms/gear-history/aquiles-priester.md wholesale-fabricates Pearl/Sabian AAX/Evans rig + wrong band tenure dates — verified Mapex/Sabian HHX/ProMark/Remo
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 78h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2388h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2484h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2661h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3746h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
