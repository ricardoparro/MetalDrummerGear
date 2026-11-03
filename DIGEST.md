# MetalForge — Digest

*Generated 2026-11-03 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **25** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **13** |
| Issues closed in window | 13 |
| Commits to `main` in window | 19 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **454** |
| Sessions | 521 |
| Page views | 774 |
| Engagement rate | 65.07% |
| GSC impressions | 17,279 |
| GSC clicks | 281 |
| GSC CTR | 1.63% |
| GSC avg position | 8.6 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,317 |
| Est. ad revenue / mo | **~€9.95** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (100× current) |

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
| PR Merger | 32 | 31 | 0 |
| Verify YouTube Videos | 14 | 6 | 6 |
| Check Sitemap Drift | 13 | 5 | 6 |
| Verify Data Modules | 12 | 6 | 6 |
| Check llms freshness | 9 | 0 | 8 |
| Perf Budget Gate | 6 | 0 | 6 |
| Verify API Modules | 4 | 1 | 1 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-03 18:09 (mid-day pulse — 5/5 proposals verified+promoted #10176-10180)
- 2026-11-03 12:10 (daily deep run — 7/7 proposals verified+promoted #10163-10169, #10162 split, #10174/#10175 filed)
- 2026-11-03 00:18 (state-confirm — 2/2 proposals verified+promoted #10151/#10155)
- 2026-11-02 00:20 (cheap pulse — 7/7 proposals verified+promoted #10089-10098, +1 companion ai-fix filed #10102)
- 2026-11-02 06:17 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10103-10110)
- 2026-11-02 12:11 (daily deep run — L2 regression investigated/ruled noise, 63-profile CTR anti-pattern found, #10135/#10

## 📦 Shipped to main (13)

- #10189 fix: #10175 SEO audit: gear-history/*.md hand-authored mirrors — check all 71 files for the DW-5000-pedal fabrication pattern found in 32/71 (follow-up to #10169)
- #10188 fix: #10169 SEO batch: hand-authored public/llms/gear-history/*.md mirrors fabricate gear for Dave Lombardo, Gene Hoglan, Mike Portnoy — not covered by any generator, independently drifted
- #10187 fix: #10168 SEO: Martin Axenrot albumArticles.js fabricates 'twin bass drums' across 5 locations — #9572 fixed genreGearGuides.js + extendedBios.js, this file never swept
- #10186 fix: #10167 SEO: Brann Dailor's Leviathan (2004) album article still says Meinl Mb20/Mb8 — ground truth flipped to Byzance after #8941 shipped, same pattern #10125 just fixed for a different section
- #10185 fix: #10166 SEO: Daniel Erlandsson albumArticles.js FAQ answers still claim 'every Arch Enemy studio album since 1995' without the Stigmata (1998) exception
- #10184 fix: #10165 SEO: Daray's Abrahadabra (2010) + Eonian (2018) album articles fabricate 'Pearl Masterworks Stadium Exotic' + 'Pearl Demon XR' — verified Pearl Reference Pure + Demon Drive for this era
- #10183 fix: #10164 SEO: Charlie Benante Speed Cobra switch year still '2010' in albumArticles.js + top10Lists.js — #9786 fixed 5 other files, these two never swept
- #10182 fix: #10163 
- #10181 fix: #10162 
- #10173 fix: #10159 SEO: Frost public/llms mirrors (2 files) still frame him as 1349 'co-founder' — #9147/#9932 fixed every other file, these were never swept
- #10172 fix: #10158 SEO: Ben Koller public/llms mirrors (3 files) fabricate nonexistent 'Tama Iron Cobra 900' pedal + invented 2001 kit narrative
- #10171 fix: #10157 SEO: Chris Adler albumArticles.js + llms mirror still fabricate 'Mapex Black Panther Fortress/Velvetone' kit — verified Mapex Saturn, per-drummer file never swept
- #10170 fix: #10156 SEO: Dave Lombardo albumArticles.js 'Early Slayer' gearTimeline block fabricates entire Tama/Paiste rig — verified Pearl Maxwin, self-contradicts same file

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2316h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2412h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2589h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3674h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6104h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
