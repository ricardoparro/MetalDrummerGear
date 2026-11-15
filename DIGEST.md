# MetalForge — Digest

*Generated 2026-11-15 08:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 16 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **8** |
| Issues closed in window | 8 |
| Commits to `main` in window | 13 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **582** |
| Sessions | 639 |
| Page views | 800 |
| Engagement rate | 52.43% |
| GSC impressions | 14,854 |
| GSC clicks | 348 |
| GSC CTR | 2.34% |
| GSC avg position | 7.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,429 |
| Est. ad revenue / mo | **~€10.29** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (97× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 839 tracked queries) | 34 clicks · 5973 impr · CTR 0.6% · avg pos 11.0 | clicks (−5) · impr (−3091) · pos (+0.1) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **16/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 235/250 indexed (−2) · rotating sample: 166/250 indexed · **full site: 2283 of 3159 sitemap URLs earned impressions (90d)** | 37 rejected-quality · 19 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1188ms · **worst: Album article (Sacrament drum setup) — 52 perf, LCP 11.0s** · 2/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (±0) · TBT (+49)ms · chronic (−2) _(TBT/chronic ↓ = better)_ |

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
| Chris Adler — 54º aniversário | 8d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 12d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 41d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 29 | 29 | 0 |
| Verify YouTube Videos | 16 | 9 | 7 |
| Check Sitemap Drift | 15 | 8 | 7 |
| Verify Data Modules | 13 | 7 | 6 |
| Check llms freshness | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 7 |
| Verify API Modules | 2 | 1 | 1 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |
| Check performance (L4) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-15 06:12 (cheap pulse — 4/4 proposals verified+promoted #10659-10662)
- 2026-11-15 00:21 — overnight pulse: 3/3 promotable proposals verified+promoted #10651/10653/10654, GSC content-gap row r
- 2026-11-14 00:19 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10604/10605/10606)
- 2026-11-14 06:11 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10616/10617)
- 2026-11-14 12:09 (deep run — 8/8 proposals verified+promoted #10621-10628)
- 2026-11-14 18:07 (mid-day pulse — 7/7 proposals verified+promoted #10631-10637)

## 📦 Shipped to main (8)

- #10680 fix: #10666 📉 L4 Performance Watch — 1 regressed · 2 chronically slow
- #10678 fix: #10662 SEO: api/drummers/index.js Dirk Verbeuren bands-array Soilwork period (2004–2016) self-contradicts its own bio/kitOverview prose in the same record (1998–2016, 18 years)
- #10677 fix: #10661 SEO: Joey Jordison snare shell material fabricated as 'Steel' in soundLikeGuides.js — ground truth deliberately withholds it (sibling of closed #10636, different file)
- #10676 fix: #10660 SEO: Joey Jordison's kit fabricated as a 'Pearl Joey Jordison Signature Kit' (Birch/Basswood) in soundLikeGuides.js — verified kit is Pearl Reference Series, only the snare is signature
- #10675 fix: #10659 SEO: George Kollias fabricated 'Pearl George Kollias Signature' snare + Vic Firth signature stick model in soundLikeGuides.js — never swept from this file
- #10665 fix: #10654 SEO: top10ListsCatalog.js states Travis Orbin's Periphery tenure as '2006-2009' — bands.js's own drummerHistory says 2008-2009
- #10664 fix: #10653 SEO: homepage 'Trending This Week' widget frozen on March 2026 data — isTrendingStale() exists but is never called
- #10663 fix: #10651 SEO: Igor Cavalera Tama Iron Cobra pedal misattributed to 1996 "Roots Bloody Roots" era in genreGearGuides.js (2 locations)

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 283h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2593h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2689h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2866h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3951h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
