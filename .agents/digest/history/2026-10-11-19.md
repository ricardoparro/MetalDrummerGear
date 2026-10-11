# MetalForge — Digest

*Generated 2026-10-11 19:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **27** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 3 |
| PRs merged in window | **16** |
| Issues closed in window | 16 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **411** |
| Sessions | 463 |
| Page views | 608 |
| Engagement rate | 51.84% |
| GSC impressions | 11,647 |
| GSC clicks | 221 |
| GSC CTR | 1.90% |
| GSC avg position | 7.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,606 |
| Est. ad revenue / mo | **~€7.82** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (128× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 500 tracked queries) | 35 clicks · 3425 impr · CTR 1.0% · avg pos 9.3 | clicks (+11) · impr (+868) · pos (−0.7) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **47/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 238/250 indexed (−2) · rotating sample: 234/250 indexed · **full site: 2269 of 3162 sitemap URLs earned impressions (90d)** | 3 rejected-quality · 12 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 75 perf · TBT 1163ms · **worst: Top-10 list (best death metal drummers) — 50 perf, LCP 12.8s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+4) · TBT (−691)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (+1)
- 🆕 New this week: au.search.yahoo.com
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 20d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 43d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 47d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 27 | 26 | 1 |
| Verify YouTube Videos | 14 | 7 | 4 |
| Verify Data Modules | 14 | 7 | 4 |
| Check Sitemap Drift | 14 | 7 | 4 |
| Perf Budget Gate | 7 | 0 | 4 |
| Check llms freshness | 7 | 0 | 4 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-11 18:16 (mid-day pulse — 7/7 proposals verified+promoted, #8903-8909)
- 2026-10-11 12:17 (deep run — 8/8 proposals verified+promoted, #8887-8894)
- 2026-10-11 06:19 (cheap pulse — 8/8 fresh proposals verified+promoted, #8871-8878)
- 2026-10-11 00:36 — Evening-review catch-up: 8/8 fresh proposals verified+promoted (#8863-8870), 4 clean + 4 with tighten
- 2026-10-10 00:36 (evening review — 8/8 proposals verified+promoted, #8804-8811)
- 2026-10-10 06:19 (cheap pulse — 4/4 fresh proposals verified+promoted, #8821-8824)

## 📦 Shipped to main (16)

- #8917 fix: #8892 SEO: Paul Mazurkiewicz fabricated as Sabian cymbals + Evans heads user in 2 top10Lists.js entries — verified Meinl + Remo
- #8916 fix: #8894 SEO: Dirk Verbeuren sticks fabricated as 'Promark Shira Kashi Oak 5B' in 3 drummerComparisons.js entries — verified Tama O-DVM2 signature since 2016
- #8915 fix: #8893 SEO: Jay Weinberg fabricated as a Tama endorser in top10Lists.js 'Tama drummers' list — verified SJC Custom Drums since 2014
- #8914 fix: #8890 SEO: Mikkey Dee drummerEvolution.js gear.drums.notes + keyChanges still contradict #8626's already-fixed summary/description (sibling-field miss)
- #8913 fix: #8891 SEO: George Kollias drummerEvolution.js heads still fabricate 'Remo Emperor/Powerstroke 3' in 2 of 3 era blocks — #8302 only fixed 1 of 3
- #8912 fix: #8889 SEO: Matt Greiner albumArticles.js still fabricates 'Ludwig Classic Maple' + 'Paiste 2002' gear — survives 2 prior closed fixes (#7454, #7603)
- #8911 fix: #8888 SEO: Hellhammer top10Lists.js Viking-metal/war-metal FAQ fabricates 'Pearl Masters Premium + Meinl Byzance' gear — verified Sonor SQ2 + Paiste RUDE
- #8910 fix: #8887 SEO: Jaska Raatikainen albumArticles.js fabricates an entire 'Paiste 2002' cymbal era across 6 album articles (74 occurrences) — verified continuous Zildjian
- #8902 fix: #8878 SEO: Joey Jordison soundLikeGuides.js snare size wrong (14x5.5") — verified signature snare is 13x6.5"
- #8901 fix: #8877 SEO: Jocke Wallgren soundLikeGuides.js snare self-contradicts as brass-shell — verified maple Reference Pure, same file's own kit field
- #8900 fix: #8876 SEO: Matt Garstka gearPriceHistory.js claims 2016 signature snare/sticks launch — verified both released 2014, used on The Joy of Motion itself
- #8899 fix: #8874 SEO: Jason Bittner gearPriceHistory.js fabricates 2012 Overkill full-time join — verified May 2017
- #8898 fix: #8875 SEO: Flo Mounier gearPriceHistory.js 1996 sticks field fabricates Vic Firth 5B — verified 5A American Classic since 1992
- #8897 fix: #8873 SEO: Daray drummerEvolution.js 2008-2017 era fabricates 'Pearl Masterworks Stadium Exotic' kit — verified Pearl Reference Pure
- #8896 fix: #8872 SEO: Nick Menza drummerEvolution.js Cryptic Writings era fabricates 'Premier Signia' drums/Zildjian cymbals — verified Pearl Masterworks/Sabian AA
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1764h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1860h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2037h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3122h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5552h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
