# MetalForge — Digest

*Generated 2026-11-11 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **7** |
| Issues closed in window | 7 |
| Commits to `main` in window | 11 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **505** |
| Sessions | 582 |
| Page views | 805 |
| Engagement rate | 62.37% |
| GSC impressions | 14,658 |
| GSC clicks | 324 |
| GSC CTR | 2.21% |
| GSC avg position | 7.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,450 |
| Est. ad revenue / mo | **~€10.35** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (97× current) |

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
| Chris Adler — 54º aniversário | 12d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 16d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 45d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 26 | 26 | 0 |
| Check Sitemap Drift | 13 | 6 | 7 |
| Verify Data Modules | 13 | 6 | 7 |
| Verify YouTube Videos | 13 | 7 | 6 |
| Check llms freshness | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 7 |
| Check Video SEO | 4 | 0 | 4 |
| Verify API Modules | 4 | 2 | 2 |
| Check Vercel Bot Rewrites | 4 | 2 | 2 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-11 00:2x (cheap pulse — 4/4 proposals verified+promoted #10531/10533/10534/10535)
- 2026-11-10 06:12 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10507/10508)
- 2026-11-10 00:18 (cheap pulse — 5/5 proposals verified+promoted #10497/10498/10502/10503/10504)
- 2026-11-10 12:10 — 4/4 proposals verified+promoted #10517-10520 (scope-gap sibling fixes)
- 2026-11-10 18:07 — 3/3 proposals verified+promoted #10523-10525 (scope-gap sibling fixes)
- 2026-11-11 06:12 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10537/10538/10539)

## 📦 Shipped to main (7)

- #10552 fix: #10539 SEO: Abe Cunningham 'Saturday Night Wrist' era fabricates kit wood as 'Maple/Birch' (9 locations) — relapse of #10022/#10176/#10524 bug class, contradicts this same file's own sibling era entry
- #10551 fix: #10538 SEO: Lars Ulrich kit mis-stated as 'Tama Starclassic Maple/Birch' in lars-ulrich-vs-bill-ward comparison — contradicts this same file's own correct template at 3 other entries
- #10549 fix: #10537 SEO: Mike Portnoy kit wood still fabricated as 'Tama Starclassic Maple/Birch' in LIVE meta tags + gear-finder API + album article (relapse of #7821/#7836/#9310/#10508/#10523)
- #10543 fix: #10531 SEO batch: Vinnie Paul gear wrongly fabricated as Tama/Sabian across groove-metal guide family in genreGearGuides.js (~50 locations)
- #10542 fix: #10535 SEO: Nick Augusto Trivium tenure off-by-one '2009' survives in genreGearGuides.js (6 locations) + adjacent Matt Greiner undated snare line
- #10541 fix: #10534 SEO batch: Ray Luzier snare over-specified as 'Pearl Reference 14x6.5 brass' across nu-metal guide family in genreGearGuides.js (~20 locations)
- #10540 fix: #10533 SEO: Pete Sandoval fabricated 'Remo Pinstripe/Emperor' drum heads in genreGearGuides.js extreme-metal heads guide (3 locations)

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 187h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2497h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2593h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2770h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3855h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
