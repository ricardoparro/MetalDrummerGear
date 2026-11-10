# MetalForge — Digest

*Generated 2026-11-10 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **23** |
| Open `seo-proposal` issues | 6 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **6** |
| Issues closed in window | 6 |
| Commits to `main` in window | 11 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **494** |
| Sessions | 568 |
| Page views | 794 |
| Engagement rate | 64.61% |
| GSC impressions | 15,047 |
| GSC clicks | 318 |
| GSC CTR | 2.11% |
| GSC avg position | 8.0 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,403 |
| Est. ad revenue / mo | **~€10.21** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (98× current) |

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
| Chris Adler — 54º aniversário | 13d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 17d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 46d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 52 | 52 | 0 |
| Verify YouTube Videos | 9 | 4 | 5 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| Check Sitemap Drift | 5 | 2 | 3 |
| Verify Data Modules | 5 | 2 | 3 |
| Health Check | 4 | 4 | 0 |
| Check llms freshness | 4 | 0 | 4 |
| Perf Budget Gate | 3 | 0 | 3 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Verify API Modules | 2 | 1 | 1 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |
| Validate URLs | 1 | 0 | 1 |

## 🧠 Today's CEO decisions

- 2026-11-10 06:12 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10507/10508)
- 2026-11-10 00:18 (cheap pulse — 5/5 proposals verified+promoted #10497/10498/10502/10503/10504)
- 2026-11-09 00:21 — overnight pulse: 4/4 proposals verified+promoted #10477-10481, #10460 corrected-close (already resolv
- 2026-11-09 06:20 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10485-10487)
- 2026-11-09 12:11 — daily deep run: L1/L2/L3 full close-the-loop, 2/2 proposals verified+promoted #10492-10493, L2 rotati
- 2026-11-10 12:10 — 4/4 proposals verified+promoted #10517-10520 (scope-gap sibling fixes)

## 📦 Shipped to main (6)

- #10529 fix: #10520 SEO: Alex Rüdinger soundLikeGuides.js band field stale 'The Faceless', omits current Trivium role
- #10528 fix: #10519 SEO: Chris Adler still 'Lamb of God' (not ex-) in api/gear-finder/index.js
- #10527 fix: #10518 SEO: Jay Weinberg still 'Slipknot' (not ex-) in nameGeneratorData.js — scope gap in closed #10065
- #10526 fix: #10517 SEO: Inferno's Behemoth bio missing verified 1999-2000 tenure gap in packages/backend/src/index.js
- #10522 fix: #10508 SEO batch: Mike Portnoy kit wood fabricated as 'Tama Starclassic Maple/Birch' in drummerComparisons.js (9 locations, 6 entries) — scope gap in closed #7821/#7836
- #10521 fix: #10507 SEO: Abe Cunningham snare still 'Maple/Bubinga shell pack' in drummerComparisons.js (6 locations, missed by #10191/#10176) + 4 public/llms mirrors

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 174h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2484h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2580h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2757h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3842h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
