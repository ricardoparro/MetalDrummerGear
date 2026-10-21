# MetalForge — Digest

*Generated 2026-10-21 19:13 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 3 |
| PRs merged in window | **16** |
| Issues closed in window | 16 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **464** |
| Sessions | 525 |
| Page views | 711 |
| Engagement rate | 60.38% |
| GSC impressions | 20,184 |
| GSC clicks | 253 |
| GSC CTR | 1.25% |
| GSC avg position | 8.7 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,047 |
| Est. ad revenue / mo | **~€9.14** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (109× current) |

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
| PR Merger | 53 | 52 | 0 |
| .github/workflows/check-vercel-rewrites.yml | 14 | 0 | 14 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| Health Check | 4 | 4 | 0 |
| Verify YouTube Videos | 3 | 1 | 2 |
| Verify Data Modules | 3 | 1 | 2 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Verify API Modules | 2 | 1 | 1 |
| Check llms freshness | 2 | 0 | 2 |
| Perf Budget Gate | 2 | 0 | 2 |
| Check Sitemap Drift | 2 | 0 | 2 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-21 00:27 (cheap pulse — 7/7 proposals verified+promoted, #9417-9423)
- 2026-10-20 12:16 (daily deep run — 7/7 proposals verified+promoted, #9386-9392)
- 2026-10-20 00:28 (cheap pulse — 8/8 proposals verified+promoted, #9356-9366)
- 2026-10-20 06:18 (cheap pulse — 8/8 proposals verified+promoted, #9370-9377)
- 2026-10-20 18:14 (afternoon pulse — 8/8 proposals verified+promoted, #9401-9408)
- 2026-10-21 06:18 (cheap pulse — 8/8 proposals verified+promoted, #9433-9441)

## 📦 Shipped to main (16)

- #9482 fix: #9456 SEO: Paul Bostaph llms mirror public/llms/guides/how-to-sound-like-paul-bostaph.md has wrong birthplace + fabricates a 2024 Testament reunion already disproven in #9271
- #9481 fix: #9455 SEO: Pete Sandoval llms mirror public/llms/guides/how-to-sound-like-pete-sandoval.md fabricates specific Remo head models — verified only 'Pinstripe or Emperor' hedge
- #9480 fix: #9454 SEO: Ryan Van Poederooyen llms mirror public/llms/guides/how-to-sound-like-ryan-van-poederooyen.md says tenure 'since 1999' + credits him on Empath (2019) — verified 2002-2018, no Empath
- #9479 fix: #9453 SEO: Nicko McBrain llms mirror public/llms/guides/how-to-sound-like-nicko-mcbrain.md omits Dec 2024 touring retirement, implies he's still active
- #9477 fix: #9452 SEO: Nick Menza llms mirror public/llms/guides/how-to-sound-like-nick-menza.md invents a Sonor/Zildjian/Evans rig — verified final-era Pearl Reference Custom/Sabian/Remo
- #9476 fix: #9451 SEO: Paul Mazurkiewicz llms mirror public/llms/guides/how-to-sound-like-paul-mazurkiewicz.md fabricates cymbal brand (Sabian vs Meinl) + pedal (Tama vs Pearl Eliminator)
- #9475 fix: #9450 SEO: Scott Travis llms mirror public/llms/guides/how-to-sound-like-scott-travis.md has cross-contaminated birthdate/birthplace + wrong cymbal brand
- #9473 fix: #9449 SEO: Matt Greiner llms mirror public/llms/guides/how-to-sound-like-matt-greiner.md fabricates entire gear brand lineup (#1 GA4 page this week)
- #9464 fix: #9441 SEO: Matt Halpern cymbal/snare 'verified' fields in api/drummers/index.js contradict prior sourced investigations (#6377/#7716) + extendedBios.js's own unverified-snare hedge
- #9463 fix: #9440 SEO: Travis Orbin soundLikeGuides.js — snare shell material contradicts verified Maple (says Steel)
- #9462 fix: #9439 SEO: Dave Lombardo soundLikeGuides.js — fabricated signature snare model/shell + wrong ride cymbal size/model
- #9461 fix: #9437 SEO: Brann Dailor soundLikeGuides.js — fabricated Meinl Mb20/Mb8 cymbal series (verified Byzance) + wrong snare model
- #9460 fix: #9436 SEO: Jay Weinberg soundLikeGuides.js — stale current-Slipknot framing (post-Suicidal Tendencies departure) + 3 fabricated gear fields
- #9459 fix: #9435 SEO: Mike Mangini soundLikeGuides.js — entire guide frozen pre-2023 Dream Theater departure + 4 fabricated gear specs
- #9458 fix: #9434 SEO: Matt Greiner soundLikeGuides.js — wrong stick tip shape + mislabeled pedal drive type (high-traffic page)
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2004h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2100h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2277h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3362h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5792h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
