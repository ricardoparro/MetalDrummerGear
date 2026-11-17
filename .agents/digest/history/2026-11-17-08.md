# MetalForge — Digest

*Generated 2026-11-17 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 16 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **16** |
| Issues closed in window | 16 |
| Commits to `main` in window | 20 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **752** |
| Sessions | 821 |
| Page views | 1,046 |
| Engagement rate | 48.23% |
| GSC impressions | 14,920 |
| GSC clicks | 326 |
| GSC CTR | 2.18% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,483 |
| Est. ad revenue / mo | **~€13.45** |
| Progress to €1000/mo | 1.3% |
| Pageviews/mo needed for €1000 | ~333,333 (74× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 863 tracked queries) | 38 clicks · 5252 impr · CTR 0.7% · avg pos 10.8 | clicks (+4) · impr (−721) · pos (−0.2) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **13/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 226/250 indexed (−9) · rotating sample: 141/250 indexed · **full site: 2272 of 3158 sitemap URLs earned impressions (90d)** | 39 rejected-quality · 35 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1188ms · **worst: Album article (Sacrament drum setup) — 52 perf, LCP 11.0s** · 2/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (±0) · TBT (+49)ms · chronic (−2) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 20 (+1)
- 🆕 New this week: facebook.com
- Top sources: aocr.org (11) · uk.search.yahoo.com (8) · m.facebook.com (4) · facebook.com (3) · noai.duckduckgo.com (3)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 6d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 10d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 39d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 27 | 27 | 0 |
| Verify YouTube Videos | 16 | 8 | 8 |
| Check Sitemap Drift | 15 | 7 | 8 |
| Verify Data Modules | 14 | 7 | 7 |
| Check llms freshness | 9 | 0 | 9 |
| Perf Budget Gate | 7 | 0 | 7 |
| Verify API Modules | 4 | 2 | 2 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-17 00:19 (cheap pulse — 8/8 proposals verified+promoted #10734-10741)
- 2026-11-16 00:23 (cheap pulse — 4/4 proposals verified+promoted #10692/10694/10695/10697)
- 2026-11-16 06:18 (cheap pulse — 4/4 proposals verified+promoted #10699-10702)
- 2026-11-16 12:15 (deep run — 8/8 proposals verified+promoted #10707-10714; L1/L2/L3 full close-the-loop; 1 L3 regression
- 2026-11-16 18:09 (cheap pulse — 2/2 proposals verified+promoted #10721/#10722)
- 2026-11-17 06:12 (cheap pulse — 7/8 proposals verified+promoted #10742-10748, 1 rejected #10749)

## 📦 Shipped to main (16)

- #10773 fix: #10748 SEO: Igor Cavalera soundLikeGuides.js undercounts Sepultura tenure as ending at Roots (1996) — verified through Dante XXI (2006)
- #10772 fix: #10747 SEO: Shannon Larkin's api/drummers/index.js root record still shows Godsmack '2002–present, current: true' — verified retired 2024
- #10771 fix: #10746 SEO: Mario Duplantier api/drummers/index.js root record self-contradicts on double pedal — regresses #9433's already-shipped fix
- #10761 fix: #10744 SEO: Nick Menza snare shell material fabricated as 'Maple' in soundLikeGuides.js — snares.js deliberately leaves it unverified
- #10762 fix: #10745 SEO: Gene Hoglan kit shell material wrong 'Maple/Birch Hybrid' in soundLikeGuides.js — verified kitOverview says maple/mahogany hybrid
- #10760 fix: #10743 SEO: Tomas Haake snare wrong depth (14x6" vs verified 14x6.5") + wrong shell material (Steel vs verified Bronze) in soundLikeGuides.js
- #10759 fix: #10742 SEO batch: soundLikeGuides.js drummerId mismatches drummerName in 28/72 entries — breaks live navigation
- #10758 fix: #10741 SEO: snares.js Abe Cunningham fabricates a specific 'Maple/Bubinga 14x6.5" ' snare model — root ground truth says no separate model is documented
- #10757 fix: #10741 SEO: snares.js Abe Cunningham fabricates a specific 'Maple/Bubinga 14x6.5" ' snare model — root ground truth says no separate model is documented
- #10756 fix: #10739 SEO: api/gear-finder/index.js Dave Lombardo drums field wrong wood — 'Tama Starclassic Maple' vs verified Walnut/Birch
- #10755 fix: #10740 SEO: api/gear-finder/index.js Chris Adler drums field wrong model — 'Mapex Black Panther Design Lab' vs verified Mapex Saturn — #10668's verify step incorrectly assumed this field was already correct
- #10754 fix: #10738 SEO: albumArticles/mario-duplantier.js FAQ block restates the pre-endorsement Tama fabrication that #9719 fixed everywhere else in the same file
- #10753 fix: #10737 SEO: evolutionTimeline.js Gene Hoglan/Death entry uses his 1992 join date as the year for an album-release-type event — Individual Thought Patterns released 1993
- #10752 fix: #10736 SEO: evolutionTimeline.js dates Matt Halpern/Periphery to 2008 — he didn't join until 2009, band formed 2005
- #10751 fix: #10734 SEO: pedals.js + endorsementNews.js state a fabricated 'Iron Cobra 900 Rolling Glide' model for Abe Cunningham — root ground truth renamed to Power Glide Twin Pedal (HP900PTW) in Aug 2026
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 331h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2641h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2737h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2914h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3999h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
