# MetalForge — Digest

*Generated 2026-10-21 08:21 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **15** |
| Issues closed in window | 16 |
| Commits to `main` in window | 19 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **404** |
| Sessions | 457 |
| Page views | 630 |
| Engagement rate | 61.49% |
| GSC impressions | 16,387 |
| GSC clicks | 219 |
| GSC CTR | 1.34% |
| GSC avg position | 8.6 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,700 |
| Est. ad revenue / mo | **~€8.10** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (123× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 617 tracked queries) | 30 clicks · 11185 impr · CTR 0.3% · avg pos 9.8 | clicks (+3) · impr (+7843) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **32/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 237/249 indexed (−2) · rotating sample: 180/249 indexed · **full site: 2280 of 3161 sitemap URLs earned impressions (90d)** | 18 rejected-quality · 19 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 15 (+1)
- 🆕 New this week: syntx.ai
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 10d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 33d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 37d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 66d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| Verify YouTube Videos | 17 | 9 | 8 |
| PR Merger | 16 | 16 | 0 |
| Verify Data Modules | 16 | 8 | 8 |
| Check Sitemap Drift | 16 | 0 | 16 |
| Check llms freshness | 9 | 0 | 9 |
| Perf Budget Gate | 8 | 0 | 8 |
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

- 2026-10-21 00:27 (cheap pulse — 7/7 proposals verified+promoted, #9417-9423)
- 2026-10-20 12:16 (daily deep run — 7/7 proposals verified+promoted, #9386-9392)
- 2026-10-20 00:28 (cheap pulse — 8/8 proposals verified+promoted, #9356-9366)
- 2026-10-20 06:18 (cheap pulse — 8/8 proposals verified+promoted, #9370-9377)
- 2026-10-20 18:14 (afternoon pulse — 8/8 proposals verified+promoted, #9401-9408)
- 2026-10-21 06:18 (cheap pulse — 8/8 proposals verified+promoted, #9433-9441)

## 📦 Shipped to main (15)

- #9464 fix: #9441 SEO: Matt Halpern cymbal/snare 'verified' fields in api/drummers/index.js contradict prior sourced investigations (#6377/#7716) + extendedBios.js's own unverified-snare hedge
- #9463 fix: #9440 SEO: Travis Orbin soundLikeGuides.js — snare shell material contradicts verified Maple (says Steel)
- #9462 fix: #9439 SEO: Dave Lombardo soundLikeGuides.js — fabricated signature snare model/shell + wrong ride cymbal size/model
- #9461 fix: #9437 SEO: Brann Dailor soundLikeGuides.js — fabricated Meinl Mb20/Mb8 cymbal series (verified Byzance) + wrong snare model
- #9460 fix: #9436 SEO: Jay Weinberg soundLikeGuides.js — stale current-Slipknot framing (post-Suicidal Tendencies departure) + 3 fabricated gear fields
- #9459 fix: #9435 SEO: Mike Mangini soundLikeGuides.js — entire guide frozen pre-2023 Dream Theater departure + 4 fabricated gear specs
- #9458 fix: #9434 SEO: Matt Greiner soundLikeGuides.js — wrong stick tip shape + mislabeled pedal drive type (high-traffic page)
- #9457 fix: #9433 SEO: Mario Duplantier soundLikeGuides.js — single-kick field self-contradicts dual-kick fact + double-pedal contradiction + cymbal drift (high-traffic page)
- #9448 fix: #9423 SEO: Scott Travis soundLikeGuides.js — wrong birthdate/birthplace (cross-contaminated from Chris Adler) + cymbal piece models/ride size wrong
- #9446 fix: #9420 SEO: Paul Mazurkiewicz soundLikeGuides.js budgetSetups pedal tiers still say 'Pearl Demon Drive' after #9086 fixed the main field to Eliminator; cymbal sub-series/sizes also drift
- #9447 fix: #9422 SEO: Ryan Van Poederooyen soundLikeGuides.js intro still implies ongoing DTP tenure + falsely credits Empath (2019) — missed by #9239's fix
- #9445 fix: #9421 SEO: Pete Sandoval soundLikeGuides.js gear.heads fabricates specific Remo models (Powerstroke P3/Ambassador X/Emperor Clear) — verified only 'Pinstripe or Emperor'
- #9444 fix: #9419 SEO: Paul Bostaph soundLikeGuides.js intro misattributes God Hates Us All (2001) to his 2013-2019 Slayer stint
- #9443 fix: #9417 SEO: Nick Menza soundLikeGuides.js gear.cymbals/gear.snare + FAQ frozen at 1990-92 era, missed by #8581/#8584's sibling fixes
- #9442 fix: #9418 SEO: Nicko McBrain soundLikeGuides.js omits Dec 2024 touring retirement, fabricates steel snare shell, drops 'Signature Series' from cymbal line

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1993h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2089h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2266h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3351h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5781h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
