# MetalForge — Digest

*Generated 2026-10-27 08:22 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **16** |
| Issues closed in window | 15 |
| Commits to `main` in window | 20 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **397** |
| Sessions | 441 |
| Page views | 611 |
| Engagement rate | 57.14% |
| GSC impressions | 20,661 |
| GSC clicks | 211 |
| GSC CTR | 1.02% |
| GSC avg position | 9.1 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,619 |
| Est. ad revenue / mo | **~€7.86** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (127× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 648 tracked queries) | 23 clicks · 13437 impr · CTR 0.2% · avg pos 10.5 | clicks (−7) · impr (+2252) · pos (+0.7) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **39/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 238/249 indexed (+1) · rotating sample: 191/248 indexed · **full site: 2268 of 3159 sitemap URLs earned impressions (90d)** | 27 rejected-quality · 17 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 16 (+1)
- 🆕 New this week: es.search.yahoo.com
- Top sources: m.facebook.com (11) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 4d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 27d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 31d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 60d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 23 | 23 | 0 |
| Verify YouTube Videos | 15 | 8 | 7 |
| Check Sitemap Drift | 14 | 7 | 7 |
| Verify Data Modules | 14 | 7 | 7 |
| .github/workflows/check-vercel-rewrites.yml | 9 | 0 | 9 |
| Check llms freshness | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 7 |
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

- 2026-10-27 00:30 (cheap pulse — 7/7 proposals verified+promoted #9783-9789, +1 companion ai-fix filed #9791)
- 2026-10-26 06:30 (cheap pulse — 8/8 proposals verified+promoted #9744-9751, 4 with scope-expansion notes)
- 2026-10-26 00:30 (cheap pulse — 5/5 proposals verified+promoted #9731-9735, +2 companion ai-fix filed #9742-9743)
- 2026-10-26 13:40 — mid-day pulse, L1/L2/L3 weekly close-the-loop pass
- 2026-10-26 18:17 — cheap pulse, 3/3 proposals verified+promoted #9773-9775
- 2026-10-27 06:19 — cheap pulse (pre-deep-run), 7/7 proposals verified+promoted #9792-9798

## 📦 Shipped to main (16)

- #9823 fix: #9798 SEO: Matt Greiner missing historical CYMBALS entries for Meinl (2003/2011 era, pre-Paiste)
- #9822 fix: #9796 SEO: Sean Reinert endorsementNews.js still fabricates Death 'Spiritual Healing' (1990) recording debut — #5949 never synced this file
- #9821 fix: #9797 SEO: Gene Hoglan missing historical HARDWARE entry for Pearl Demon Drive Double Pedal (2018)
- #9820 fix: #9795 SEO: Igor Cavalera's Tama Iron Cobra pedal fabricated as driving 1993/1996 Chaos A.D./Roots era (genreGearGuides.js)
- #9818 fix: #9794 SEO: Matt Garstka llms/gear-history/matt-garstka.md still shows Pearl kit/Pearl Demon Drive pedal as current gear — denies verified Sept 2021 DW/Tama switch
- #9817 fix: #9793 SEO batch: Frost cymbals still fabricated as 'Zildjian A Custom & K Series' in drummerComparisons.js frost-vs-inferno + 4 stale llms /vs//comparisons mirrors
- #9816 fix: #9792 SEO: Matt Garstka fabricated as 'Tama Titan Series Hardware' user in genreGearGuides.js djent hardware guide — verified only Tama Speed Cobra 910 pedal
- #9807 fix: #9791 SEO: Dave Lombardo Yamaha/DW fabrication cluster (~10 locations) in best-bass-drums-for-thrash-metal.md llms mirror
- #9806 fix: #9786 SEO batch: Charlie Benante Speed Cobra switch misdated as 2010 vs verified 2013 across 5 files
- #9805 fix: #9789 SEO: Vinnie Paul evolution.md mirror fabricates a 1992-1995 'Pearl Masters Custom' era + fake Modern Drummer quote — verified Tama through 1996
- #9804 fix: #9788 SEO batch: Mikkey Dee gear-history.md + articles/mikkey-dee-evolution.md wholesale fabricate a Pearl/Premier/Zildjian gear history
- #9803 fix: #9787 SEO: Daniel Erlandsson Arch Enemy join year wrong as 1996 (drummerEvolution.js) / 1999 (llms evolution mirror) — verified founding drummer since 1995
- #9802 fix: #9786 SEO batch: Charlie Benante Speed Cobra switch misdated as 2010 vs verified 2013 across 5 files
- #9801 fix: #9784 SEO batch: Lars Ulrich fabricated Ludwig Black Beauty snare + Evans heads across 2 public/llms/guides/ roundup mirrors
- #9800 fix: #9785 SEO batch: Lars Ulrich public/llms/gear-history/lars-ulrich.md wholesale fabricates a multi-era pre-2008 gear history
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2137h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2233h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2411h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3495h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5925h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
