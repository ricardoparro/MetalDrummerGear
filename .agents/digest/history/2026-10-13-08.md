# MetalForge — Digest

*Generated 2026-10-13 08:27 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **22** |
| Open `seo-proposal` issues | 9 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **15** |
| Issues closed in window | 15 |
| Commits to `main` in window | 19 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **412** |
| Sessions | 468 |
| Page views | 663 |
| Engagement rate | 57.91% |
| GSC impressions | 10,403 |
| GSC clicks | 196 |
| GSC CTR | 1.88% |
| GSC avg position | 7.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,841 |
| Est. ad revenue / mo | **~€8.52** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (117× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 534 tracked queries) | 27 clicks · 3342 impr · CTR 0.8% · avg pos 9.5 | clicks (−8) · impr (−83) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **27/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 239/250 indexed (+1) · rotating sample: 204/250 indexed · **full site: 2281 of 3162 sitemap URLs earned impressions (90d)** | 4 rejected-quality · 6 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 75 perf · TBT 1163ms · **worst: Top-10 list (best death metal drummers) — 50 perf, LCP 12.8s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+4) · TBT (−691)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (±0)
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 18d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 41d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 45d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 20 | 19 | 1 |
| Verify YouTube Videos | 18 | 9 | 8 |
| Check Sitemap Drift | 13 | 6 | 7 |
| Verify Data Modules | 11 | 5 | 6 |
| Check llms freshness | 9 | 0 | 9 |
| .github/workflows/check-vercel-rewrites.yml | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 7 |
| Verify API Modules | 6 | 3 | 2 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-13 06:23 (cheap pulse — 8/8 proposals verified+promoted, #8996-9003)
- 2026-10-13 00:35 (evening-review catch-up for 10-12 — 8/8 proposals verified+promoted #8987-8994, follow-up #8995 filed)
- 2026-10-12 12:25 (deep run — L1/L2/L3 full close-the-loop + 5/5 proposals verified+promoted #8952-8956, L3 fix #8970 fil
- 2026-10-12 00:37 (evening-review catch-up — 8/8 proposals verified+promoted #8924-8932, follow-up #8934 filed)
- 2026-10-12 06:30 (cheap pulse — 6/7 proposals verified+promoted, 1 closed stale, #8935-8941)
- 2026-10-12 18:14 (mid-day pulse — 5/5 proposals verified+promoted, #8971-8975)

## 📦 Shipped to main (15)

- #9025 fix: #9003 SEO: Abe Cunningham cymbals era-misattributed to Koi No Yokan/Gore/Ohms as 'Zildjian' in extendedBios.js — verified Sabian HHX for that era
- #9023 fix: #9001 SEO: Vinnie Paul Vulgar Display/Far Beyond Driven era fabricated as 'Pearl Masters Custom' in drummerEvolution.js — verified Tama through 1996
- #9022 fix: #9000 SEO: Nick Menza drummerEvolution.js FAQ + 1992-1996 era block still fabricate Pearl Masters for Rust in Peace (1990) and Zildjian cymbals for Countdown/Youthanasia — root file never got the fixes its downstream copies received
- #9021 fix: #8999 SEO: Jocke Wallgren snare fabricated as "Pearl Reference 14x6.5\" Brass" in drummerEvolution.js (x2) + drummerComparisons.js (3 entries) + albumArticles/jocke-wallgren.js — verified: no snare model documented
- #9020 fix: #8998 SEO: Adrian Erlandsson Tama relationship fabricated as beginning 'in the late 1990s' in api/drummers/index.js kitOverview — verified 2014 switch (same bug as #8181, missed this file)
- #9019 fix: #8997 SEO: Daniel Erlandsson hardware fabricated as 'Pearl Demon Drive' in pedals.js — verified Pearl Eliminator Double Bass Pedal (root record behind 10+ prior downstream fixes)
- #9018 fix: #8996 SEO batch: api/stats/gear-insights.js is a hardcoded 62-entry duplicate gear array that has drifted from endorsementNews.js ground truth (CLAUDE.md Rule 1 violation)
- #9012 fix: #8994 SEO: Pete Sandoval snare fabricated as 'Pearl Steel Snare' in gearPriceHistory.js (missed by #7055's sweep) + cross-contaminated 'ddrum Dios Series' claim copy-pasted from Shannon Larkin
- #9011 fix: #8993 SEO: api/gear-finder/index.js (id 25, Alex Bent) fabricates Pearl drums/snare/throne — verified Tama Starclassic Maple, never touched by any of Bent's 5+ prior gear fixes
- #9010 fix: #8992 SEO: Morgan Ågren drummerEvolution.js 1983-1989 era block backdates Sonor/Paiste by decades — #7984 only fixed later eras, this one untouched
- #9009 fix: #8991 SEO: genreGearGuides.js (3 occurrences) says Travis Orbin recorded Periphery's self-titled debut — bands.js's own drummerHistory/discography says Matt Halpern recorded it, Orbin left in 2009
- #9008 fix: #8987 SEO: Inferno (Behemoth) drums fabricated as 'Pearl Masterworks' across extendedBios.js/api/drummers/index.js/top10Lists.js — endorsementNews.js has always said 'Reference Series'
- #9007 fix: #8990 SEO: kitQuizData.js Question 5 (Tomas Haake) — snare size and hardware fields still wrong, #7543 only fixed the adjacent cymbals field
- #9006 fix: #8989 SEO: Dave Lombardo fabricated pedal/brand claims in top10Lists.js (2 locations) + unsupported catalog entry in pedals.js
- #9004 fix: #8988 SEO: Richard Christy cymbals fabricated as 'Sabian HHX' in extendedBios.js/cymbalSetups.js (3 locations) — verified AA/AAX only, distinct from #8589's gearComparisons.js-only scope

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1801h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1897h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2075h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3159h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5589h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
