# MetalForge — Digest

*Generated 2026-11-04 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 5 |
| PRs merged in window | **14** |
| Issues closed in window | 14 |
| Commits to `main` in window | 19 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **453** |
| Sessions | 518 |
| Page views | 725 |
| Engagement rate | 64.48% |
| GSC impressions | 16,482 |
| GSC clicks | 289 |
| GSC CTR | 1.75% |
| GSC avg position | 8.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,107 |
| Est. ad revenue / mo | **~€9.32** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (107× current) |

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
| PR Merger | 30 | 28 | 0 |
| Check Sitemap Drift | 12 | 6 | 1 |
| Verify Data Modules | 12 | 6 | 1 |
| Verify YouTube Videos | 12 | 6 | 1 |
| Check Video SEO | 12 | 0 | 7 |
| Check llms freshness | 6 | 0 | 1 |
| Perf Budget Gate | 6 | 0 | 1 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-04 18:09 (mid-day pulse — 8/8 proposals verified+promoted #10235-10242)
- 2026-11-04 12:11 (daily deep run — 5/5 proposals verified+promoted #10220-10224)
- 2026-11-04 06:12 (cheap pulse, pre-deep-run — 8/8 proposals verified+promoted #10203-10210)
- 2026-11-04 00:19 (cheap pulse — 8/8 proposals verified+promoted #10193-10201)
- 2026-11-03 18:09 (mid-day pulse — 5/5 proposals verified+promoted #10176-10180)
- 2026-11-03 12:10 (daily deep run — 7/7 proposals verified+promoted #10163-10169, #10162 split, #10174/#10175 filed)

## 📦 Shipped to main (14)

- #10250 fix: #10243 🚨 Loop Watchdog — 1 active alert
- #10249 fix: #10221 SEO: Hellhammer licks/hellhammer.js credits him performing on Mayhem's Deathcrush EP (1987) — joined Mayhem 1988
- #10248 fix: #10224 SEO: gearIndex.js miscategorizes Ben Koller under Starclassic Maple — verified Starclassic Performer B/B since 2017
- #10247 fix: #10223 SEO: licks/eloy-casagrande.js fabricates 'Tama Speed Cobra Pedals' (3 locations) — verified Tama Iron Cobra
- #10246 fix: #10222 SEO: licks/lars-ulrich.js fabricates nonexistent 'Tama Artstar ES' kit (3 locations) + wrong 'Zildjian A Series' cymbals (2 locations)
- #10244 fix: #10220 SEO: Gene Hoglan licks/gene-hoglan.js misattributes Death's 'Pull the Plug' (Leprosy, 1988) — he didn't join until 1992
- #10234 fix: #10210 SEO: Alex Bent public/llms/gear-history/alex-bent.md fabricates Pearl Reference/Meinl Byzance Trivium rig — verified Tama Starclassic Maple/Zildjian K Custom Hybrid
- #10233 fix: #10209 SEO: Nicko McBrain public/llms/gear-history/nicko-mcbrain.md invents '40+ years continuous Pearl endorsement' — verified Pearl only 1982-1985, then Yamaha/Sonor/BDC
- #10232 fix: #10208 SEO: Hellhammer public/llms/gear-history/hellhammer.md fabricates entire Pearl/Zildjian career — verified Sonor/Paiste RUDE/Axis — sibling to closed #9155 (evolution.md), never swept
- #10230 fix: #10207 SEO: Jocke Wallgren drummerEvolution.js still fabricates 'Rage and Evergrey' bands (5 locations) — #9675 only fixed endorsementNews.js
- #10229 fix: #10206 SEO: Morgan Ågren 'toured with Zappa' fabrication survives in gearPriceHistory.js + 2 llms gear-history mirrors — #9610 only fixed 5 other files
- #10227 fix: #10205 SEO: Art Cruz cymbalSetups.js splash cymbal size/model mismatches drummerEvolution.js (9" FX Trash Splash vs verified 10" splash)
- #10226 fix: #10204 SEO: Bill Ward cymbalSetups.js hi-hat/crash/ride sizes contradict extendedBios.js FAQ for same Zildjian Avedis era
- #10225 fix: #10203 SEO: Mikkey Dee endorsementNews.js 1992 timeline entry fabricates Tama kit — contradicts drummerEvolution.js's Sonor-era framing

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 30h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2340h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2436h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2613h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3698h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
