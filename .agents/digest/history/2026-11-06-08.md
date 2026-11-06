# MetalForge — Digest

*Generated 2026-11-06 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 13 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **17** |
| Issues closed in window | 16 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **429** |
| Sessions | 496 |
| Page views | 706 |
| Engagement rate | 63.51% |
| GSC impressions | 13,180 |
| GSC clicks | 245 |
| GSC CTR | 1.86% |
| GSC avg position | 8.4 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,026 |
| Est. ad revenue / mo | **~€9.08** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (110× current) |

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
| PR Merger | 52 | 52 | 0 |
| Check llms freshness | 19 | 0 | 19 |
| Verify YouTube Videos | 5 | 3 | 2 |
| Verify Data Modules | 4 | 2 | 2 |
| Check Sitemap Drift | 4 | 2 | 2 |
| Health Check | 3 | 3 | 0 |
| Perf Budget Gate | 2 | 0 | 2 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-06 00:20 (cheap pulse — 8/8 proposals verified+promoted #10327-10334)
- 2026-11-05 18:09 (cheap pulse — 8/8 proposals verified+promoted #10303-10310)
- 2026-11-05 12:11 (daily deep run — 8/8 proposals promoted #10285-10292, eloy-casagrande CTR-gap ruled already-addressed)
- 2026-11-05 06:13 (cheap pulse, pre-deep-run — 7/7 proposals verified+promoted #10267-10273, 2 follow-ups filed #10282/#1
- 2026-11-05 00:19 (cheap pulse — 8/8 proposals verified+promoted #10258-10266)
- 2026-11-06 06:14 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10335-10342)

## 📦 Shipped to main (17)

- #10367 fix: #10342 SEO: public/llms/evolution/ryan-van-poederooyen.md + drummerEvolution.js:19682 carry fabricated snare model already corrected elsewhere
- #10366 fix: #10341 SEO: public/llms/gear-history/brann-dailor.md wholesale-fabricates Mapex/Gretsch/Zildjian/Vic-Firth rig — verified continuous Tama/Meinl/Vater since 2000 (sibling evolution.md already fixed by #9156, this mirror never swept)
- #10365 fix: #10340 SEO: public/llms/gear-history/inferno.md wholesale-fabricates Sonor/Pearl-Custom/Meinl rig + wrong join year — verified Pearl Reference Series/Paiste RUDE/Czarcie Kopyto since 1997
- #10364 fix: #10339 SEO: public/llms/gear-history/matt-halpern.md wholesale-fabricates DW/Mapex rig — verified continuous Pearl Reference Series since 2015
- #10363 fix: #10338 SEO: public/llms/gear-history/matt-greiner.md omits verified 2016 Mapex/Paiste/DW switch + fabricates nonexistent 2023 'Pearl Masterworks Custom' era
- #10362 fix: #10337 SEO: public/llms/gear-history/nick-augusto.md wrong Trivium join year + fabricated pedal/sticks — verified 2010 join, DW 9000/ProMark
- #10361 fix: #10337 SEO: public/llms/gear-history/nick-augusto.md wrong Trivium join year + fabricated pedal/sticks — verified 2010 join, DW 9000/ProMark
- #10360 fix: #10336 SEO: public/llms/gear-history/aquiles-priester.md wholesale-fabricates Pearl/Sabian AAX/Evans rig + wrong band tenure dates — verified Mapex/Sabian HHX/ProMark/Remo
- #10359 fix: #10335 SEO: public/llms/gear-history/john-otto.md fabricates entire Sonor/Paiste era — verified continuous OCDP/Zildjian since 1999
- #10351 fix: #10334 SEO: public/llms/evolution/raymond-herrera.md + gear-history.md fabricate 2009 Fear Factory departure + fictional 'reunions' — verified departed 2006
- #10350 fix: #10332 SEO: public/llms/evolution/paul-mazurkiewicz.md fabricates 'Sabian AAX' cymbal brand throughout (7 locations) — verified Meinl Classics Custom/Byzance since 1990s
- #10349 fix: #10333 SEO: albumArticles/tomas-haake.js states wrong birthplace 'Örebro' — verified Örnsköldsvik, Sweden
- #10348 fix: #10331 SEO: public/llms/evolution/paul-bostaph.md fabricates ddrum/Zildjian current gear + nonexistent 2024 Testament rejoin — verified Pearl/Sabian/Vater since 2015, Testament tenure ended 2011
- #10347 fix: #10329 SEO: public/llms/evolution/tim-yeung.md fabricates entire Pearl/DW rig + wrong Kingdoms Disdained (2017) credit — verified Tama/Sabian since 2005, MA tenure 2010-2015 (Illud only)
- #10346 fix: #10330 SEO: public/llms/evolution/hannes-grossmann.md backdates DW Collectors Series to 2007 Obscura era — verified Tama Starclassic Maple until 2014 switch
- _+2 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 67h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2377h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2473h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2650h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3735h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
