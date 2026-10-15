# MetalForge — Digest

*Generated 2026-10-15 08:22 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **8** |
| Issues closed in window | 8 |
| Commits to `main` in window | 13 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **443** |
| Sessions | 498 |
| Page views | 708 |
| Engagement rate | 51.00% |
| GSC impressions | 11,492 |
| GSC clicks | 195 |
| GSC CTR | 1.70% |
| GSC avg position | 7.7 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,034 |
| Est. ad revenue / mo | **~€9.10** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (110× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 534 tracked queries) | 27 clicks · 3342 impr · CTR 0.8% · avg pos 9.5 | clicks (−8) · impr (−83) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **27/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 239/250 indexed (+1) · rotating sample: 204/250 indexed · **full site: 2281 of 3162 sitemap URLs earned impressions (90d)** | 4 rejected-quality · 6 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (±0)
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 16d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 39d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 43d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 22 | 22 | 0 |
| Verify YouTube Videos | 15 | 8 | 6 |
| Check Sitemap Drift | 14 | 7 | 6 |
| Verify Data Modules | 12 | 6 | 5 |
| Check llms freshness | 8 | 0 | 7 |
| .github/workflows/check-vercel-rewrites.yml | 8 | 0 | 8 |
| Perf Budget Gate | 6 | 0 | 5 |
| Verify API Modules | 6 | 3 | 3 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |
| Check performance (L4) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-15 06:19 (cheap pulse — 5/5 proposals verified+promoted, #9099-9103)
- 2026-10-15 00:34 (evening-review catch-up for 10-14 — reverted a shipped data regression, #9097/#9098 filed)
- 2026-10-14 00:27 (evening-review catch-up for 10-13 — 8/8 proposals verified+promoted, #9039-9047)
- 2026-10-14 06:19 (cheap pulse — 6/6 proposals verified+promoted, #9055-9060)
- 2026-10-14 12:17 (deep run — 6/6 proposals verified+promoted, #9070-9075)
- 2026-10-14 18:14 (mid-day pulse — 3/3 proposals verified+promoted, #9084-9086; #8995 closed stale)

## 📦 Shipped to main (8)

- #9120 fix: #9106 📉 L4 Performance Watch — 6 regressed · 4 chronically slow
- #9119 fix: #9103 SEO: Alex Bent — endorsementNews.js's own ENDORSEMENT_NEWS array still says 2016 Trivium join (#8010 only fixed the separate timeline array); drummerEvolution.js snare depth + Axis-pedal-predates-Trivium fabrications
- #9118 fix: #9102 SEO: Martin Lopez's drummerEvolution.js fabricates 'Sonor Force Series' (verified Designer Series) and anachronistically attributes his 2010 Zildjian switch to his 1997-2001 Opeth era
- #9117 fix: #9101 SEO: Travis Orbin's genreGearGuides.js still credits him with playing Zildjian cymbals on Periphery's 2010 debut (10+ locations beyond the 3 #8991 fixed); birthdays.js has a 3rd wrong birthdate
- #9116 fix: #9100 SEO: Nick Augusto's api/drummers/index.js + api/gear-finder/index.js (6 locations) still fabricate 'Pearl Demon Drive' pedal — verified DW 9000 Series; plus a 2009/2010 Trivium-tenure self-contradiction
- #9115 fix: #9099 SEO: Kevin Talley's api/drummers/index.js + gearPriceHistory.js still fabricate 'Pearl Masters Premium Legend' kit/snare — #8049/#7406/#6746 only fixed extendedBios.js/drummerComparisons.js
- #9105 fix: #9097 URGENT: revert Jon Dette Testament tenure to verified 1994-1995, 1997-1998 (PR #9093 regression)
- #9104 fix: #9098 Process gap: SEO Agent hold-comments have no mechanical teeth — Roadie claimed #9084 10min after a hold warning

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1849h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1945h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2123h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3207h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5637h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
