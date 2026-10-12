# MetalForge — Digest

*Generated 2026-10-12 19:13 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **25** |
| Open `seo-proposal` issues | 9 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 3 |
| PRs merged in window | **16** |
| Issues closed in window | 16 |
| Commits to `main` in window | 27 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **423** |
| Sessions | 479 |
| Page views | 657 |
| Engagement rate | 53.03% |
| GSC impressions | 12,168 |
| GSC clicks | 223 |
| GSC CTR | 1.83% |
| GSC avg position | 7.5 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,816 |
| Est. ad revenue / mo | **~€8.45** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (118× current) |

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
| Mikkey Dee — 63º aniversário | 19d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 42d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 46d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 20 | 20 | 0 |
| Verify YouTube Videos | 16 | 8 | 5 |
| Verify Data Modules | 14 | 7 | 4 |
| Check Sitemap Drift | 14 | 7 | 4 |
| .github/workflows/check-vercel-rewrites.yml | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 4 |
| Check llms freshness | 7 | 0 | 4 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Verify API Modules | 2 | 1 | 1 |
| Check Video SEO | 2 | 1 | 1 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-12 12:25 (deep run — L1/L2/L3 full close-the-loop + 5/5 proposals verified+promoted #8952-8956, L3 fix #8970 fil
- 2026-10-12 00:37 (evening-review catch-up — 8/8 proposals verified+promoted #8924-8932, follow-up #8934 filed)
- 2026-10-11 18:16 (mid-day pulse — 7/7 proposals verified+promoted, #8903-8909)
- 2026-10-11 12:17 (deep run — 8/8 proposals verified+promoted, #8887-8894)
- 2026-10-11 06:19 (cheap pulse — 8/8 fresh proposals verified+promoted, #8871-8878)
- 2026-10-11 00:36 — Evening-review catch-up: 8/8 fresh proposals verified+promoted (#8863-8870), 4 clean + 4 with tighten

## 📦 Shipped to main (16)

- #8981 fix: #8970 SEO: /articles/joey-jordison-legacy missing from /drummer/joey-jordison relatedArticles — discovered-not-indexed
- #8980 fix: #8956 SEO: Joey Jordison drummerComparisons.js fabricates 'Pearl Masters Premium Maple' kit (2 lines) — verified Pearl Reference Series
- #8979 fix: #8955 SEO: Bill Ward drummerEvolution.js + extendedBios.js fabricate a 'Ludwig Atlas Hardware' upgrade — verified unchanged Speed King pedal/hardware (distinct from #8934's pedal-model issue)
- #8978 fix: #8954 SEO: Eloy Casagrande drummerComparisons.js fabricates pedal model + snare depth across 10+ lines — verified plain Iron Cobra double pedal / Bell Brass 14x5.5"
- #8977 fix: #8953 SEO: Mario Duplantier drummerComparisons.js fabricates 'Starclassic Walnut/Birch' kit shell (10 lines) — verified Starclassic Bubinga
- #8976 fix: #8952 SEO: Danny Carey drummerEvolution.js fabricates two Evans drumhead eras (1994-2005) — verified Remo since 2000s, no documented switch
- #8969 fix: #8965 SEO: api/drummers/index.js Travis Orbin bio fabricates birthdate/birthplace, 'original studio drummer' credit, 2013 Darkest Hour join
- #8968 fix: #8960 SEO: Vinnie Paul 'Remo' kit fabrication also in genreGearGuides.js; separate Pearl Reference/1994 contradiction found
- #8967 fix: #8958 SEO: Vinnie Paul gear-evolution page has a third fabrication (Pearl, not Tama, for 1992-1996); FBD/Reinventing-the-Steel cross-reference also wrong
- #8966 fix: #8941 SEO: Brann Dailor albumArticles.js fabricates an entire 'Sabian HHX' cymbal era for Leviathan (2004) across 20 occurrences — verified continuous Meinl since 2004
- #8964 fix: #8940 SEO: top10Lists.js credits Travis Orbin with playing on Periphery's 2010 self-titled debut (6 locations) — he left in 2009, never recorded a Periphery album
- #8963 fix: #8939 SEO: Richard Christy drummerEvolution.js 1996-1999 Death/Control Denied eras still fabricate 'Pearl double pedal' — #8268 only fixed the 2009-Present era, verified Axis A Longboard since 1998
- #8962 fix: #8938 SEO: Aquiles Priester albumArticles.js line 83 self-contradicts as Evans heads user — verified Remo since 1996 (same file says Remo at line 397)
- #8961 fix: #8937 SEO: Gene Hoglan albumArticles.js 'Brotherhood of the Snake' (2016) article fabricates Pearl endorsement 2 years early — verified Pearl since 2018
- #8959 fix: #8936 SEO: Vinnie Paul albumArticles.js + extendedBios.js fabricate an entire 'Remo drums' era (1992-1996) — root cause of 5 prior misguided fixes, verified Tama through 1996 then Pearl
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1788h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1884h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2061h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3146h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5576h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
