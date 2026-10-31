# MetalForge — Digest

*Generated 2026-10-31 19:07 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **28** |
| Open `seo-proposal` issues | 12 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 7 |
| PRs merged in window | **12** |
| Issues closed in window | 12 |
| Commits to `main` in window | 17 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **441** |
| Sessions | 503 |
| Page views | 710 |
| Engagement rate | 63.02% |
| GSC impressions | 18,774 |
| GSC clicks | 249 |
| GSC CTR | 1.33% |
| GSC avg position | 9.0 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,043 |
| Est. ad revenue / mo | **~€9.13** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (110× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 648 tracked queries) | 23 clicks · 13437 impr · CTR 0.2% · avg pos 10.5 | clicks (−7) · impr (+2252) · pos (+0.7) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **39/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 238/249 indexed (+1) · rotating sample: 191/248 indexed · **full site: 2268 of 3159 sitemap URLs earned impressions (90d)** | 27 rejected-quality · 17 never-crawled |
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
| Mikkey Dee — 63º aniversário | 0d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 23d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 27d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 56d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 27 | 24 | 2 |
| Verify YouTube Videos | 14 | 6 | 0 |
| Check Sitemap Drift | 14 | 7 | 0 |
| Verify Data Modules | 14 | 7 | 0 |
| Check llms freshness | 7 | 0 | 0 |
| Perf Budget Gate | 7 | 0 | 0 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-31 18:08 (mid-day pulse — 8/8 proposals verified+promoted #10000-10007)
- 2026-10-31 12:09 (daily deep run — 5/5 proposals verified+promoted #9988-9992)
- 2026-10-31 00:18 (cheap pulse — 4/4 proposals verified+promoted #9968-9971)
- 2026-10-30 00:22 (cheap pulse — 8/8 proposals verified+promoted #9929/#9930/#9932/#9933/#9934/#9936/#9937/#9938)
- 2026-10-30 06:14 (cheap pulse, pre-deep-run — 4/4 proposals verified+promoted #9941-9944)
- 2026-10-30 12:13 (daily deep run — 3/3 proposals verified+promoted #9953-9955)

## 📦 Shipped to main (12)

- #10012 fix: #9992 SEO batch: genreGearGuides.js black-metal-kits guide misattributes Inferno to 'Pearl Reference Pure' (~9 locations) — verified model is Reference Series
- #10011 fix: #9991 SEO: gearPriceHistory.js fabricates a nonexistent 'Ahead Joey Jordison Signature' stick for 2001 — his verified first signature deal is Promark TX515W (2008)
- #10010 fix: #9990 SEO: Mike Portnoy's extendedBios.js cites wrong ProMark stick model code (TX420N vs verified TXMP420XW-AG)
- #10009 fix: #9989 SEO: Igor Cavalera's extendedBios.js FAQ still says Paiste cymbals 2007-2018 — gearHighlights already fixed to Zildjian by #8103, FAQ never synced
- #10008 fix: #9988 SEO: gearComparisons.js wrongly lists Danny Carey as a Sonor SQ2 user — verified model is Sonor Custom
- #9999 fix: #9982 SEO: Dave Lombardo signatureGear.js invents an unverified 4-stage stick-brand timeline — contradicts drummerEvolution.js's own era data
- #9998 fix: #9981 SEO: Mario Duplantier signatureGear.js 'Tama Starphonic Bronze Snare' spotlight page fabricates his signature snare — verified Tama S.L.P. G-Maple 14x6.5"
- #9997 fix: #9980 SEO: Raymond Herrera extendedBios.js FAQ fabricates 'Zildjian A Custom and Z Custom' cymbals — verified Z Custom only, since 1995
- #9996 fix: #9979 SEO: Paul Mazurkiewicz soundLikeGuides.js tuning section still says 'maple snare' — self-contradicts the same file's own verified Steel snare field
- #9995 fix: #9978 SEO: Pete Sandoval soundLikeGuides.js tenure fabricated as '1988 through 2013' — verified 1988-2010 (sidelined by back surgery)
- #9994 fix: #9977 SEO: Sean Reinert soundLikeGuides.js wrongly credits him with Death's 'Spiritual Healing' (1990) — actually recorded by Bill Andrews, Reinert's debut was Human (1991)
- #9993 fix: #9976 SEO: Chris Adler soundLikeGuides.js cross-drummer contamination — Mapex 'Black Panther'/'Saturn V' labels belong to Matt Greiner/Jason Bittner, verified kit is plain Mapex Saturn

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2244h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2340h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2517h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3602h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 6032h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
