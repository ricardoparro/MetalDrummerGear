# MetalForge — Digest

*Generated 2026-10-15 19:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **26** |
| Open `seo-proposal` issues | 10 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 3 |
| PRs merged in window | **17** |
| Issues closed in window | 15 |
| Commits to `main` in window | 22 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **473** |
| Sessions | 532 |
| Page views | 760 |
| Engagement rate | 56.20% |
| GSC impressions | 14,641 |
| GSC clicks | 228 |
| GSC CTR | 1.56% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,257 |
| Est. ad revenue / mo | **~€9.77** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (102× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 534 tracked queries) | 27 clicks · 3342 impr · CTR 0.8% · avg pos 9.5 | clicks (−8) · impr (−83) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **27/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 239/250 indexed (+1) · rotating sample: 204/250 indexed · **full site: 2281 of 3162 sitemap URLs earned impressions (90d)** | 4 rejected-quality · 6 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (±0)
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 16d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 39d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 43d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 25 | 24 | 0 |
| Verify YouTube Videos | 14 | 7 | 4 |
| Check Sitemap Drift | 14 | 3 | 8 |
| Verify Data Modules | 12 | 6 | 4 |
| Check llms freshness | 7 | 0 | 4 |
| Verify API Modules | 6 | 3 | 1 |
| Perf Budget Gate | 6 | 0 | 4 |
| .github/workflows/check-vercel-rewrites.yml | 6 | 0 | 6 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-15 18:14 (mid-day pulse — 6/6 proposals verified+promoted, #9123-9128)
- 2026-10-15 12:17 (cheap pulse — 8/8 proposals verified+promoted, #9107-9114; +1 self-filed from verification spillover, 
- 2026-10-15 06:19 (cheap pulse — 5/5 proposals verified+promoted, #9099-9103)
- 2026-10-15 00:34 (evening-review catch-up for 10-14 — reverted a shipped data regression, #9097/#9098 filed)
- 2026-10-14 00:27 (evening-review catch-up for 10-13 — 8/8 proposals verified+promoted, #9039-9047)
- 2026-10-14 06:19 (cheap pulse — 6/6 proposals verified+promoted, #9055-9060)

## 📦 Shipped to main (17)

- #9138 fix: #9122 SEO: albumArticles/raymond-herrera.js frames 2002 Fear Factory split as permanent, omitting the 2003-2006 reunion lineup bands.js verifies
- #9137 fix: #9114 SEO batch: Matt Halpern — entire fabricated 'Periphery V: Aliens' album article (fake release date/label/tracklist, ~15 locations) + wrong 'co-founded Periphery since 2005/2009' claims (4 locations in top10Lists.js)
- #9136 fix: #9113 SEO batch: Hellhammer — wrong birthplace (Oslo vs verified Trysil) across 7 locations, fabricated 'Roland Electronics' hardware in 2 API files + 3 genreGearGuides sections, and 2 internal tenure/discography self-contradictions
- #9135 fix: #9112 SEO batch: Ray Luzier — wrong birthdate (Feb 11 vs verified Jun 14, 1970) in 3 files, 'Pearl Masters Maple Complete' vs verified Reference Maple, 'Reference Pure' mislabel, and 'replacing Joey Jordison' misattribution (verified: David Silveria)
- #9134 fix: #9109 SEO: Raymond Herrera's Fear Factory departure still shown as 2009 in extendedBios.js + drummerEvolution.js — bands.js verifies he left in 2006
- #9133 fix: #9111 SEO: Jay Weinberg's Slipknot exit in drummerEvolution.js names a fabricated replacement 'Eric Morotti' (verified: Eloy Casagrande) and self-contradicts on the departure month
- #9132 fix: #9110 SEO: Jaska Raatikainen's birthplace still says 'Espoo, Finland' in soundLikeGuides.js + albumArticles (incl. JSON-LD) — #8525 only fixed extendedBios.js/birthdays.js to verified Lappeenranta
- #9131 fix: #9108 SEO: Martin Axenrot's Opeth tenure still shown as '2006-present' in extendedBios.js + api/drummers/index.js — bands.js already has the verified 2021 departure
- #9130 fix: #9108 SEO: Martin Axenrot's Opeth tenure still shown as '2006-present' in extendedBios.js + api/drummers/index.js — bands.js already has the verified 2021 departure
- #9129 fix: #9107 SEO: John Longstreth's Hate Eternal stint mislabeled as ongoing ('2018-present') in bands.js — api/drummers/index.js's own bio confirms it was a one-off Nov 2018 tour fill-in
- #9121 fix: #9106 📉 L4 Performance Watch — 6 regressed · 4 chronically slow
- #9120 fix: #9106 📉 L4 Performance Watch — 6 regressed · 4 chronically slow
- #9119 fix: #9103 SEO: Alex Bent — endorsementNews.js's own ENDORSEMENT_NEWS array still says 2016 Trivium join (#8010 only fixed the separate timeline array); drummerEvolution.js snare depth + Axis-pedal-predates-Trivium fabrications
- #9118 fix: #9102 SEO: Martin Lopez's drummerEvolution.js fabricates 'Sonor Force Series' (verified Designer Series) and anachronistically attributes his 2010 Zildjian switch to his 1997-2001 Opeth era
- #9117 fix: #9101 SEO: Travis Orbin's genreGearGuides.js still credits him with playing Zildjian cymbals on Periphery's 2010 debut (10+ locations beyond the 3 #8991 fixed); birthdays.js has a 3rd wrong birthdate
- _+2 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1860h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1956h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2133h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3218h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5648h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
