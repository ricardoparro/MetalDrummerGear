# MetalForge — Digest

*Generated 2026-10-14 08:22 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **22** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **15** |
| Issues closed in window | 13 |
| Commits to `main` in window | 19 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **420** |
| Sessions | 483 |
| Page views | 691 |
| Engagement rate | 50.72% |
| GSC impressions | 10,837 |
| GSC clicks | 189 |
| GSC CTR | 1.74% |
| GSC avg position | 7.6 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,961 |
| Est. ad revenue / mo | **~€8.88** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (113× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 534 tracked queries) | 27 clicks · 3342 impr · CTR 0.8% · avg pos 9.5 | clicks (−8) · impr (−83) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **27/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 239/250 indexed (+1) · rotating sample: 204/250 indexed · **full site: 2281 of 3162 sitemap URLs earned impressions (90d)** | 4 rejected-quality · 6 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 75 perf · TBT 1163ms · **worst: Top-10 list (best death metal drummers) — 50 perf, LCP 12.8s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+4) · TBT (−691)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (±0)
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 17d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 40d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 44d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 23 | 22 | 1 |
| Verify YouTube Videos | 16 | 8 | 8 |
| Verify Data Modules | 15 | 7 | 8 |
| Check Sitemap Drift | 14 | 7 | 7 |
| Check llms freshness | 9 | 0 | 9 |
| Perf Budget Gate | 8 | 0 | 8 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-14 00:27 (evening-review catch-up for 10-13 — 8/8 proposals verified+promoted, #9039-9047)
- 2026-10-13 18:16 (mid-day pulse — 6/6 proposals verified+promoted, #9028-9033)
- 2026-10-13 12:19 (deep run — 4/4 proposals verified+promoted, #9014/#9015/#9017 + #9016 split into #9026/#9027)
- 2026-10-13 06:23 (cheap pulse — 8/8 proposals verified+promoted, #8996-9003)
- 2026-10-13 00:35 (evening-review catch-up for 10-12 — 8/8 proposals verified+promoted #8987-8994, follow-up #8995 filed)
- 2026-10-14 06:19 (cheap pulse — 6/6 proposals verified+promoted, #9055-9060)

## 📦 Shipped to main (15)

- #9082 fix: #9060 SEO: top10Lists.js Meinl-cymbals list cites Matt Greiner's 'Phantom Anthem' (2017) under his Byzance-era entry — verified he switched to Paiste in 2016
- #9081 fix: #9060 SEO: top10Lists.js Meinl-cymbals list cites Matt Greiner's 'Phantom Anthem' (2017) under his Byzance-era entry — verified he switched to Paiste in 2016
- #9080 fix: #9059 SEO: John Otto gearPriceHistory.js claims he 'long carried a Pearl hardware endorsement' — no Pearl hardware ever existed, verified Gibraltar since 1999
- #9079 fix: #9058 SEO: Gavin Harrison drummerEvolution.js metaDescription fabricates a pre-2002 'Tama kit' — #7883 fixed the era description/FAQ/summary but missed this field
- #9078 fix: #9057 SEO: Derek Roddy soundLikeGuides.js budgetSetups.pro.heads still says 'Full Remo setup' — #8352 only fixed the main gear.heads object
- #9077 fix: #9055 SEO: Flo Mounier drummerComparisons.js still fabricates 'Pearl Masters Maple Complete' kit/snare in 2 entries — #8281 only fixed the pedal field
- #9076 fix: #9055 SEO: Flo Mounier drummerComparisons.js still fabricates 'Pearl Masters Maple Complete' kit/snare in 2 entries — #8281 only fixed the pedal field
- #9069 fix: #9047 SEO: Blake Richardson albumArticles/blake-richardson.js still says 'double pedal' throughout — verified twin single pedals since 2018, #8552 only fixed albumArticlesCatalog.js
- #9068 fix: #9046 SEO: Ben Koller drummerEvolution.js modern-era block fabricates 'Tama Starclassic Maple' + 'Iron Cobra 900' — verified Starclassic Performer B/B + plain Iron Cobra Double Pedal, #5882 fixed snare/cymbals/heads only
- #9066 fix: #9044 SEO: Chris Adler pedals.js/pedalBrands.js fabricate Mapex Falcon double pedal — verified Trick Pro V, ~10 sibling files already fixed but these 2 were missed
- #9065 fix: #9045 SEO: Aquiles Priester drummerEvolution.js/soundLikeGuides.js still say born São Paulo, Brazil — #8536 corrected extendedBios.js to verified Outjo, Namibia but missed these 2 files
- #9064 fix: #9042 SEO: Gene Hoglan genreGearGuides.js misattributes Death's 'Human' to him — recorded by Sean Reinert per bands.js, #5682 only fixed evolutionTimeline.js
- #9063 fix: #9041 SEO: Shannon Larkin soundLikeGuides.js fabricates wrong birthdate/birthplace (Nov 24 1967, Westerly RI vs verified Apr 24 1967, Chicago IL) — #6634/#8525 never touched this line
- #9062 fix: #9040 SEO: Mike Portnoy albumArticles/mike-portnoy.js says Tama endorsee 'since the 1990s' — verified 1985, #8975 only fixed extendedBios.js
- #9061 fix: #9039 SEO: Lars Ulrich drummerEvolution.js dates Tama endorsement to 1985 — verified 1984 switch from Camco, plus self-contradicts the file's own 1984 era boundary

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1825h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1921h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2099h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3183h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5613h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
