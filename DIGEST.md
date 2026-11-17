# MetalForge — Digest

*Generated 2026-11-17 19:09 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **25** |
| Open `seo-proposal` issues | 13 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 4 |
| PRs merged in window | **15** |
| Issues closed in window | 15 |
| Commits to `main` in window | 20 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **775** |
| Sessions | 843 |
| Page views | 1,086 |
| Engagement rate | 48.99% |
| GSC impressions | 14,920 |
| GSC clicks | 326 |
| GSC CTR | 2.18% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,654 |
| Est. ad revenue / mo | **~€13.96** |
| Progress to €1000/mo | 1.4% |
| Pageviews/mo needed for €1000 | ~333,333 (72× current) |

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
| PR Merger | 31 | 29 | 1 |
| Check Sitemap Drift | 14 | 7 | 3 |
| Verify YouTube Videos | 14 | 7 | 3 |
| Verify Data Modules | 14 | 7 | 3 |
| Check llms freshness | 8 | 0 | 4 |
| Perf Budget Gate | 7 | 0 | 3 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Verify API Modules | 2 | 1 | 1 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-17 18:09 (mid-day pulse — 5/5 proposals verified+promoted #10774-10778)
- 2026-11-17 12:10 (deep run — 8/8 proposals verified+promoted #10763-10770; L1/L2/L3 not due this run)
- 2026-11-17 00:19 (cheap pulse — 8/8 proposals verified+promoted #10734-10741)
- 2026-11-16 00:23 (cheap pulse — 4/4 proposals verified+promoted #10692/10694/10695/10697)
- 2026-11-16 06:18 (cheap pulse — 4/4 proposals verified+promoted #10699-10702)
- 2026-11-16 12:15 (deep run — 8/8 proposals verified+promoted #10707-10714; L1/L2/L3 full close-the-loop; 1 L3 regression

## 📦 Shipped to main (15)

- #10786 fix: #10770 SEO: drummerEvolution.js Nick Augusto still fabricates 'Pearl Reference 14x6.5" Brass' snare (3 locations) — fixed in api/drummers/index.js by #10398 and soundLikeGuides.js by #10443, never swept here
- #10785 fix: #10768 SEO: Nicko McBrain pedal/hardware brand self-contradicts (endorsementNews.js says 'unconfirmed' AND 'DW since 1984'; root record says stale unsourced 'Sonor') — 4 already-shipped fixes assumed DW, root never updated
- #10784 fix: #10769 SEO: endorsementNews.js Mikkey Dee 1987 Paiste note wrongly says 'early Motörhead years' — he was in King Diamond until 1989, Motörhead didn't start until 1992
- #10783 fix: #10767 SEO: endorsementNews.js Matt Greiner fabricates a 2017 'Pearl signature snare' timeline entry — verified gear is Mapex since 2016
- #10782 fix: #10766 SEO: endorsementNews.js Gene Hoglan fabricates a nonexistent 'Tama Gene Hoglan Signature Snare 14x8"' (2008) — never touched despite #7928 fixing the same fabrication elsewhere
- #10781 fix: #10765 SEO: beginnerGuides.js George Kollias 'triggers' claim unsupported — survived #7073's brand fix, still unverified
- #10780 fix: #10764 SEO: beginnerGuides.js fabricates Chris Adler 'uses triggers' claim — unsupported by verified gear record
- #10779 fix: #10763 SEO: snares.js/top10ListsCatalog.js still exclude Charlie Benante's signature snare as 'unverified' — root record has been verified:true with sources since Aug 2026
- #10773 fix: #10748 SEO: Igor Cavalera soundLikeGuides.js undercounts Sepultura tenure as ending at Roots (1996) — verified through Dante XXI (2006)
- #10772 fix: #10747 SEO: Shannon Larkin's api/drummers/index.js root record still shows Godsmack '2002–present, current: true' — verified retired 2024
- #10771 fix: #10746 SEO: Mario Duplantier api/drummers/index.js root record self-contradicts on double pedal — regresses #9433's already-shipped fix
- #10761 fix: #10744 SEO: Nick Menza snare shell material fabricated as 'Maple' in soundLikeGuides.js — snares.js deliberately leaves it unverified
- #10762 fix: #10745 SEO: Gene Hoglan kit shell material wrong 'Maple/Birch Hybrid' in soundLikeGuides.js — verified kitOverview says maple/mahogany hybrid
- #10760 fix: #10743 SEO: Tomas Haake snare wrong depth (14x6" vs verified 14x6.5") + wrong shell material (Steel vs verified Bronze) in soundLikeGuides.js
- #10759 fix: #10742 SEO batch: soundLikeGuides.js drummerId mismatches drummerName in 28/72 entries — breaks live navigation

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 342h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2652h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2748h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2925h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4010h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
