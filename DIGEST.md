# MetalForge — Digest

*Generated 2026-10-26 08:28 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **22** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 2 |
| PRs merged in window | **14** |
| Issues closed in window | 13 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **395** |
| Sessions | 450 |
| Page views | 612 |
| Engagement rate | 57.33% |
| GSC impressions | 21,250 |
| GSC clicks | 208 |
| GSC CTR | 0.98% |
| GSC avg position | 9.0 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,623 |
| Est. ad revenue / mo | **~€7.87** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (127× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 648 tracked queries) | 23 clicks · 13437 impr · CTR 0.2% · avg pos 10.5 | clicks (−7) · impr (+2252) · pos (+0.7) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **39/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 237/249 indexed (−2) · rotating sample: 180/249 indexed · **full site: 2280 of 3161 sitemap URLs earned impressions (90d)** | 18 rejected-quality · 19 never-crawled |
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
| Mikkey Dee — 63º aniversário | 5d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 28d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 32d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 61d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 22 | 22 | 0 |
| Verify YouTube Videos | 13 | 7 | 4 |
| Check Sitemap Drift | 12 | 6 | 4 |
| Verify Data Modules | 12 | 6 | 4 |
| .github/workflows/check-vercel-rewrites.yml | 11 | 0 | 11 |
| Check llms freshness | 7 | 0 | 5 |
| Perf Budget Gate | 6 | 0 | 4 |
| Verify API Modules | 4 | 2 | 2 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Check GSC watched queries | 1 | 1 | 0 |
| Check backlink signal | 1 | 1 | 0 |
| Check LLM citations | 1 | 1 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Check broken images | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-26 06:30 (cheap pulse — 8/8 proposals verified+promoted #9744-9751, 4 with scope-expansion notes)
- 2026-10-26 00:30 (cheap pulse — 5/5 proposals verified+promoted #9731-9735, +2 companion ai-fix filed #9742-9743)
- 2026-10-25 12:14 (daily deep run — 8/8 proposals verified+promoted #9703-9712, 3 with scope-gap notes)
- 2026-10-25 00:31 (cheap pulse — 9/9 proposals verified+promoted #9675/9677-9684, GSC-gap held as known oscillator)
- 2026-10-25 06:17 (cheap pulse — 6/6 proposals verified+promoted #9687-9692)
- 2026-10-25 18:12 (mid-day pulse — 4/4 proposals verified+promoted #9718-9721)

## 📦 Shipped to main (14)

- #9770 fix: #9749 SEO batch: Morgan Ågren gear-history.md mirror wholesale fabricates DW/Zildjian/Roland rig — verified Sonor/Paiste/no-electronics, also fixes hub regression
- #9769 fix: #9748 SEO: Morgan Ågren drummerEvolution.js backdates Sonor to 1990 + fabricates Roland SPD-SX/V-Drums electronics with zero endorsement support
- #9768 fix: #9747 SEO: Chris Turner — 4 llms mirror files never synced after #9244 fixed drummerEvolution.js/endorsementNews.js playthrough years + G-Maple snare date
- #9767 fix: #9745 SEO: how-to-sound-like-sean-reinert.md wholesale fabricates Pearl/Tama gear — verified Tama Artstar II/Zildjian/DW 5000 never synced to this mirror
- #9766 fix: #9746 SEO: Sean Reinert llms mirror 'Band History' section still says Death 1989-1991 — verified 1991-1992, leftover scope from closed #9597
- #9765 fix: #9744 SEO: Alex Rüdinger fabricated 'PureSound Super 30' snare wires ��� verified Evans-only heads, no snare-wire brand documented
- #9764 fix: #9744 SEO: Alex Rüdinger fabricated 'PureSound Super 30' snare wires — verified Evans-only heads, no snare-wire brand documented
- #9758 fix: #9735 SEO: George Kollias albumArticles.js Ithyphallic/Those Whom Gods Detest fabricate pre-Pearl 'Tama/DW' era — verified Pearl endorsement began 2004-2005
- #9757 fix: #9743 fix(george-kollias): public/llms evolution.md + gear-history.md mirror the fabricated 'Paiste' cymbal era — verified continuous Zildjian A Custom
- #9756 fix: #9734 SEO: Bill Ward albumArticles.js fabricates 'Ludwig 2B Hickory' sticks for 1970-1978 — verified continuous Pro-Mark since 1970
- #9755 fix: #9742 fix(george-kollias): drummerEvolution.js fabricates 'Paiste Signature Series' cymbals for 2005-2015 — verified continuous Zildjian A Custom
- #9754 fix: #9733 SEO: Joey Jordison albumArticles.js Post-Slipknot era fabricates Jay Weinberg's SJC Custom Drums — verified continuous Pearl Reference Series
- #9753 fix: #9731 SEO: John Otto albumArticles.js fabricates Pearl bass-pedal/hi-hat hardware for 1999-2000 — verified Gibraltar since 1999
- #9752 fix: #9732 SEO: Joey Jordison albumArticles.js gearTimeline self-contradicts dedicated 1999 debut article — verified ddrum/Zildjian A Custom/Tama Iron Cobra

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2113h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2209h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2387h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3471h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5901h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
