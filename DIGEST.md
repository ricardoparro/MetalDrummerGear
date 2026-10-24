# MetalForge — Digest

*Generated 2026-10-24 08:19 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 7 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **18** |
| Issues closed in window | 17 |
| Commits to `main` in window | 22 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **401** |
| Sessions | 460 |
| Page views | 621 |
| Engagement rate | 59.78% |
| GSC impressions | 21,706 |
| GSC clicks | 218 |
| GSC CTR | 1.00% |
| GSC avg position | 8.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,661 |
| Est. ad revenue / mo | **~€7.98** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (125× current) |

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
| Mikkey Dee — 63º aniversário | 7d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 30d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 34d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 63d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 17 | 17 | 0 |
| Verify YouTube Videos | 17 | 9 | 8 |
| Verify Data Modules | 16 | 8 | 8 |
| Check Sitemap Drift | 16 | 8 | 8 |
| Check llms freshness | 9 | 0 | 9 |
| .github/workflows/check-vercel-rewrites.yml | 9 | 0 | 9 |
| Perf Budget Gate | 8 | 0 | 8 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-23 00:29 (cheap pulse — 8/8 proposals verified+promoted, #9554-9562 excl. #9558)
- 2026-10-23 06:19 (cheap pulse — 6/6 proposals verified+promoted, #9567-9572)
- 2026-10-23 12:15 (mid-day pulse — 4/4 proposals verified+promoted, #9585-9588)
- 2026-10-23 18:13 (afternoon pulse — 8/8 proposals verified+promoted, #9595-9602)
- 2026-10-24 00:28 (cheap pulse — 8/8 proposals verified+promoted #9607-9614, +1 companion ai-fix filed #9629)
- 2026-10-24 06:17 (cheap pulse — 8/8 proposals verified+promoted, #9630-9637)

## 📦 Shipped to main (18)

- #9658 fix: #9637 SEO: Daniel Erlandsson extendedBios.js falsely claims 'every Arch Enemy studio album' — contradicts bands.js's own Peter Wildoer / Stigmata (1998) record
- #9657 fix: #9636 SEO: Daray extendedBios.js 2008-2013 era kit still wrong model 'Pearl Masterworks Stadium Exotic' — verified 'Pearl Reference Pure', survived #8023's Tama-switch fix
- #9656 fix: #9635 SEO: Matt Garstka extendedBios.js FAQ still says he 'played Tama for his first two' AAL albums — #8048's fix only touched the gearHighlights prose, missed this FAQ echo
- #9655 fix: #9634 SEO: John Otto snare self-contradicts between drummerComparisons.js entries — single 14x7 Maple/Ash vs verified dual OCDP snares
- #9654 fix: #9634 SEO: John Otto snare self-contradicts between drummerComparisons.js entries — single 14x7 Maple/Ash vs verified dual OCDP snares
- #9653 fix: #9633 SEO: Chris Adler kit still fabricated as 'Mapex Black Panther Design Lab' in drummerComparisons.js dirk-verbeuren-vs-chris-adler entry — 13th location missed by #8935
- #9652 fix: #9632 SEO: Paul Mazurkiewicz album count still "15 studio albums" at 4 more top10Lists.js locations — #9327's fix only touched 1 of 5 occurrences
- #9651 fix: #9631 SEO: Tomas Haake Meshuggah tenure start fabricated as 1989/"late 1980s" in top10Lists.js, contradicts same file's own 1990 entries
- #9650 fix: #9630 SEO: verify-gear-consistency.cjs hardware category false-positives on legitimate 2nd hardware item (e.g. throne) in a different brand
- #9646 fix: #9629 SEO: Tim Yeung albumArticles.js + soundLikeGuides.js also misattribute I, Monarch (2005) & Fury & Flames (2008) — same fabrication as #9613
- #9645 fix: #9613 SEO: Tim Yeung drummerEvolution.js misattributes I, Monarch (2005) & Fury & Flames (2008) to him — verified Roddy/Simonetto
- #9644 fix: #9614 SEO: Blake Richardson drummerEvolution.js echoes wrong BTBAM predecessor 'Will Goodyear' (3 locations) — verified Jason Roe
- #9643 fix: #9611 SEO: Blake Richardson top10Lists.js self-contradicts BTBAM album count ('six' vs 'more than a dozen') — verified 9
- #9642 fix: #9612 SEO: Mikkey Dee drummerComparisons.js FAQ fabricates 24" bass drum vs verified 18"x22" in same entry
- #9641 fix: #9610 SEO: Morgan Ågren fabricates 'toured with Zappa's band in 1988' across 5 files — verified one-off guest sit-in
- _+3 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2065h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2161h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2338h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3423h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5853h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
