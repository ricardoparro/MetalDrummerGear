# MetalForge — Digest

*Generated 2026-11-04 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **16** |
| Issues closed in window | 16 |
| Commits to `main` in window | 21 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **437** |
| Sessions | 501 |
| Page views | 703 |
| Engagement rate | 64.47% |
| GSC impressions | 14,087 |
| GSC clicks | 241 |
| GSC CTR | 1.71% |
| GSC avg position | 8.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,013 |
| Est. ad revenue / mo | **~€9.04** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (111× current) |

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
| Chris Adler — 54º aniversário | 19d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 23d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 52d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 29 | 28 | 1 |
| Verify YouTube Videos | 15 | 8 | 7 |
| Check Sitemap Drift | 14 | 7 | 7 |
| Verify Data Modules | 14 | 7 | 7 |
| Check llms freshness | 12 | 0 | 12 |
| Perf Budget Gate | 8 | 0 | 8 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-04 06:12 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10203-10210)
- 2026-11-04 00:19 (cheap pulse — 8/8 proposals verified+promoted #10193-10201)
- 2026-11-03 18:09 (mid-day pulse — 5/5 proposals verified+promoted #10176-10180)
- 2026-11-03 12:10 (daily deep run — 7/7 proposals verified+promoted #10163-10169, #10162 split, #10174/#10175 filed)
- 2026-11-03 00:18 (state-confirm — 2/2 proposals verified+promoted #10151/#10155)
- 2026-11-03 06:13 (cheap pulse, pre-deep-run — 4/4 proposals verified+promoted #10156-10159)

## 📦 Shipped to main (16)

- #10234 fix: #10210 SEO: Alex Bent public/llms/gear-history/alex-bent.md fabricates Pearl Reference/Meinl Byzance Trivium rig — verified Tama Starclassic Maple/Zildjian K Custom Hybrid
- #10233 fix: #10209 SEO: Nicko McBrain public/llms/gear-history/nicko-mcbrain.md invents '40+ years continuous Pearl endorsement' — verified Pearl only 1982-1985, then Yamaha/Sonor/BDC
- #10232 fix: #10208 SEO: Hellhammer public/llms/gear-history/hellhammer.md fabricates entire Pearl/Zildjian career — verified Sonor/Paiste RUDE/Axis — sibling to closed #9155 (evolution.md), never swept
- #10230 fix: #10207 SEO: Jocke Wallgren drummerEvolution.js still fabricates 'Rage and Evergrey' bands (5 locations) — #9675 only fixed endorsementNews.js
- #10229 fix: #10206 SEO: Morgan Ågren 'toured with Zappa' fabrication survives in gearPriceHistory.js + 2 llms gear-history mirrors — #9610 only fixed 5 other files
- #10227 fix: #10205 SEO: Art Cruz cymbalSetups.js splash cymbal size/model mismatches drummerEvolution.js (9" FX Trash Splash vs verified 10" splash)
- #10226 fix: #10204 SEO: Bill Ward cymbalSetups.js hi-hat/crash/ride sizes contradict extendedBios.js FAQ for same Zildjian Avedis era
- #10225 fix: #10203 SEO: Mikkey Dee endorsementNews.js 1992 timeline entry fabricates Tama kit — contradicts drummerEvolution.js's Sonor-era framing
- #10219 fix: #10201 SEO: Chris Adler drummerEvolution.js + albumArticlesCatalog.js still fabricate 'Mapex Black Panther' drums for final LoG era — verified Mapex Saturn (fixed in 8+ other files by #9963 class)
- #10217 fix: #10200 SEO: Sean Reinert public/llms/evolution.md fabricates entire 'Death — Spiritual Healing Era' section crediting him with an album he never played on
- #10216 fix: #10199 SEO: Blake Richardson public/llms/evolution.md names wrong BTBAM predecessor (Will Goodyear instead of Jason Roe) — #9596/#9614/#9176 fixed every other file, this mirror never swept
- #10215 fix: #10195 SEO: Lars Ulrich public/llms/gear-history.md Black Album era gear fabricated — sibling to closed #10064 (albumArticles.js), never swept
- #10214 fix: #10198 SEO: Igor Cavalera public/llms/gear-history.md fabricates Sepultura tenure ending 1996 — verified he stayed through 2006 (4 more albums)
- #10213 fix: #10196 SEO: Frost drummerEvolution.js keyChanges bullet at line 9953 still says 'Co-founded 1349' — #9147/#9932/#10159 fixed every other location, this one survived
- #10212 fix: #10194 SEO: George Kollias public/llms/gear-history.md current era fabricates 'Pearl Reference Pure' drums + 'Tama Iron Cobra' pedal — verified Pearl Masterworks Stadium Exotic + Pearl Demon XR
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2329h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2425h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2602h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3687h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6117h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
