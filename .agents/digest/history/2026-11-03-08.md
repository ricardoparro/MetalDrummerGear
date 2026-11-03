# MetalForge — Digest

*Generated 2026-11-03 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **6** |
| Issues closed in window | 6 |
| Commits to `main` in window | 11 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **437** |
| Sessions | 500 |
| Page views | 743 |
| Engagement rate | 63.80% |
| GSC impressions | 14,371 |
| GSC clicks | 237 |
| GSC CTR | 1.65% |
| GSC avg position | 8.7 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,184 |
| Est. ad revenue / mo | **~€9.55** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (105× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 775 tracked queries) | 39 clicks · 9064 impr · CTR 0.4% · avg pos 10.9 | clicks (+16) · impr (−4373) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **17/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 237/250 indexed (−1) · rotating sample: 194/250 indexed · **full site: 2270 of 3159 sitemap URLs earned impressions (90d)** | 29 rejected-quality · 21 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1139ms · **worst: Album article (Sacrament drum setup) — 51 perf, LCP 12.1s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+6) · TBT (−533)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 17 (+1)
- 🆕 New this week: oceanhero.today
- Top sources: uk.search.yahoo.com (5) · m.facebook.com (4) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 20d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 24d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 53d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 49 | 49 | 0 |
| Verify YouTube Videos | 9 | 5 | 4 |
| Check Sitemap Drift | 8 | 4 | 4 |
| Verify Data Modules | 8 | 4 | 4 |
| Check llms freshness | 7 | 0 | 7 |
| Perf Budget Gate | 4 | 0 | 4 |
| Health Check | 4 | 4 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-03 00:18 (state-confirm — 2/2 proposals verified+promoted #10151/#10155)
- 2026-11-02 00:20 (cheap pulse — 7/7 proposals verified+promoted #10089-10098, +1 companion ai-fix filed #10102)
- 2026-11-02 06:17 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10103-10110)
- 2026-11-02 12:11 (daily deep run — L2 regression investigated/ruled noise, 63-profile CTR anti-pattern found, #10135/#10
- 2026-11-02 18:09 (mid-day pulse — 2/2 proposals verified+promoted #10137/#10138)
- 2026-11-03 06:13 (cheap pulse, pre-deep-run — 4/4 proposals verified+promoted #10156-10159)

## 📦 Shipped to main (6)

- #10173 fix: #10159 SEO: Frost public/llms mirrors (2 files) still frame him as 1349 'co-founder' — #9147/#9932 fixed every other file, these were never swept
- #10172 fix: #10158 SEO: Ben Koller public/llms mirrors (3 files) fabricate nonexistent 'Tama Iron Cobra 900' pedal + invented 2001 kit narrative
- #10171 fix: #10157 SEO: Chris Adler albumArticles.js + llms mirror still fabricate 'Mapex Black Panther Fortress/Velvetone' kit — verified Mapex Saturn, per-drummer file never swept
- #10170 fix: #10156 SEO: Dave Lombardo albumArticles.js 'Early Slayer' gearTimeline block fabricates entire Tama/Paiste rig — verified Pearl Maxwin, self-contradicts same file
- #10161 fix: #10151 SEO batch: rewrite metaDescription bio-framing → gear-answer lead, batch 2/5 (14 profiles)
- #10160 fix: #10155 SEO: Pete Sandoval genreGearGuides.js snare guide still says '2013 departure' — verified 2010 (superseded by #9661/#9978 after #7855 shipped)

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2305h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2401h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2578h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3663h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6093h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
