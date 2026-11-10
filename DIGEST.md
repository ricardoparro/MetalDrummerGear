# MetalForge — Digest

*Generated 2026-11-10 08:15 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 10 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **8** |
| Issues closed in window | 7 |
| Commits to `main` in window | 13 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **478** |
| Sessions | 548 |
| Page views | 761 |
| Engagement rate | 64.05% |
| GSC impressions | 15,047 |
| GSC clicks | 318 |
| GSC CTR | 2.11% |
| GSC avg position | 8.0 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,261 |
| Est. ad revenue / mo | **~€9.78** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (102× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 839 tracked queries) | 34 clicks · 5973 impr · CTR 0.6% · avg pos 11.0 | clicks (−5) · impr (−3091) · pos (+0.1) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **16/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 235/250 indexed (−2) · rotating sample: 166/250 indexed · **full site: 2283 of 3159 sitemap URLs earned impressions (90d)** | 37 rejected-quality · 19 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1139ms · **worst: Album article (Sacrament drum setup) — 51 perf, LCP 12.1s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+6) · TBT (−533)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

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
| Chris Adler — 54º aniversário | 13d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 17d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 46d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 29 | 29 | 0 |
| Verify YouTube Videos | 16 | 9 | 7 |
| Check Sitemap Drift | 15 | 8 | 7 |
| Verify Data Modules | 14 | 8 | 6 |
| Check llms freshness | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 7 |
| Verify API Modules | 3 | 2 | 1 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-10 06:12 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10507/10508)
- 2026-11-10 00:18 (cheap pulse — 5/5 proposals verified+promoted #10497/10498/10502/10503/10504)
- 2026-11-09 00:21 — overnight pulse: 4/4 proposals verified+promoted #10477-10481, #10460 corrected-close (already resolv
- 2026-11-09 06:20 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10485-10487)
- 2026-11-09 12:11 — daily deep run: L1/L2/L3 full close-the-loop, 2/2 proposals verified+promoted #10492-10493, L2 rotati

## 📦 Shipped to main (8)

- #10522 fix: #10508 SEO batch: Mike Portnoy kit wood fabricated as 'Tama Starclassic Maple/Birch' in drummerComparisons.js (9 locations, 6 entries) — scope gap in closed #7821/#7836
- #10521 fix: #10507 SEO: Abe Cunningham snare still 'Maple/Bubinga shell pack' in drummerComparisons.js (6 locations, missed by #10191/#10176) + 4 public/llms mirrors
- #10516 fix: #10504 SEO batch: genreGearGuides.js frames Chris Adler as a current Lamb of God member throughout (~100+ locations) — verified ex-Lamb of God since 2019, replaced by Art Cruz
- #10512 fix: #10497 SEO batch: Art Cruz splash cymbal fabrication ('9" FX Trash Splash') survives in 4 files after #10205 only fixed cymbalSetups.js (~15 locations)
- #10511 fix: #10503 SEO batch: genreGearGuides.js frames Jay Weinberg as a current Slipknot member throughout (~25+ locations) — verified ex-Slipknot since 2023
- #10510 fix: #10502 SEO: genreGearGuides.js Abe Cunningham affiliateLink URLs still point to stale 'maple_bubinga' slug after #10176 (2 locations)
- #10509 fix: #10498 SEO: Gene Hoglan Dark Angel start year still '1983' in genreGearGuides.js FAQ, missed by today's #10478 fix
- #10506 fix: week-1 audit repairs — social images, crawler routing, 404s, analytics guard, broken pages

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 164h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2473h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2569h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2746h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3831h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
