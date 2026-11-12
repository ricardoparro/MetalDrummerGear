# MetalForge — Digest

*Generated 2026-11-12 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **21** |
| Open `seo-proposal` issues | 8 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **6** |
| Issues closed in window | 6 |
| Commits to `main` in window | 11 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **567** |
| Sessions | 635 |
| Page views | 868 |
| Engagement rate | 60.31% |
| GSC impressions | 14,679 |
| GSC clicks | 329 |
| GSC CTR | 2.24% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,720 |
| Est. ad revenue / mo | **~€11.16** |
| Progress to €1000/mo | 1.1% |
| Pageviews/mo needed for €1000 | ~333,333 (90× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 839 tracked queries) | 34 clicks · 5973 impr · CTR 0.6% · avg pos 11.0 | clicks (−5) · impr (−3091) · pos (+0.1) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **16/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 235/250 indexed (−2) · rotating sample: 166/250 indexed · **full site: 2283 of 3159 sitemap URLs earned impressions (90d)** | 37 rejected-quality · 19 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1139ms · **worst: Album article (Sacrament drum setup) — 51 perf, LCP 12.1s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+6) · TBT (−533)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 19 (+2)
- 🆕 New this week: aocr.org, notebook.google.com
- Top sources: aocr.org (11) · uk.search.yahoo.com (6) · m.facebook.com (4) · noai.duckduckgo.com (3) · au.search.yahoo.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 11d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 15d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 44d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 51 | 51 | 0 |
| Verify YouTube Videos | 7 | 3 | 4 |
| Check Sitemap Drift | 7 | 3 | 4 |
| Verify Data Modules | 6 | 2 | 3 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| Check llms freshness | 5 | 0 | 5 |
| Health Check | 4 | 4 | 0 |
| Perf Budget Gate | 3 | 0 | 3 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Verify API Modules | 2 | 1 | 1 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-12 00:19 (cheap pulse — 2/2 proposals verified+promoted #10559/10560)
- 2026-11-11 18:08 — cheap pulse: 1/1 proposal verified+promoted #10553 (tooling fix)
- 2026-11-11 12:13 — daily deep run: 5/5 proposals verified+promoted #10544-10548
- 2026-11-11 00:2x (cheap pulse — 4/4 proposals verified+promoted #10531/10533/10534/10535)
- 2026-11-11 06:12 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10537/10538/10539)
- 2026-11-12 06:13 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10562/10563/10564)

## 📦 Shipped to main (6)

- #10576 fix: #10569 SEO: Travis Orbin's Darkest Hour join year wrong (2013) in blake-richardson-vs-travis-orbin comparison
- #10575 fix: #10568 SEO: Flo Mounier cymbal specs fabricated in flo-mounier-vs-jaska-raatikainen comparison entry
- #10574 fix: #10567 SEO: api/drummers/index.js — Richard Christy's Death/Iced Earth tenure periods still wrong in the single-source-of-truth bands array
- #10572 fix: #10564 SEO: Gene Hoglan's Death tenure wrong in extendedBios.js (1991-1995, verified 1992-1995 per bands.js)
- #10571 fix: #10563 SEO: Morgan Ågren snare still fabricated as 'Sonor Designer' in 2 drummerComparisons.js pairs (#9773 incomplete fix)
- #10570 fix: #10562 SEO batch: Nicko McBrain touring-retirement caveat missing from 5 more drummerComparisons.js pairs (#9860 scope gap)

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 222h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2532h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2628h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2805h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3890h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
