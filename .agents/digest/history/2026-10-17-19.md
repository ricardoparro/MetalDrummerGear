# MetalForge — Digest

*Generated 2026-10-17 19:11 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **26** |
| Open `seo-proposal` issues | 10 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 5 |
| PRs merged in window | **12** |
| Issues closed in window | 12 |
| Commits to `main` in window | 17 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **452** |
| Sessions | 502 |
| Page views | 739 |
| Engagement rate | 63.75% |
| GSC impressions | 13,588 |
| GSC clicks | 201 |
| GSC CTR | 1.48% |
| GSC avg position | 8.1 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,167 |
| Est. ad revenue / mo | **~€9.50** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (105× current) |

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
| Mikkey Dee — 63º aniversário | 14d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 37d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 41d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 28 | 26 | 0 |
| Check Sitemap Drift | 14 | 0 | 9 |
| Verify YouTube Videos | 14 | 7 | 2 |
| Verify Data Modules | 12 | 6 | 2 |
| Check llms freshness | 7 | 0 | 2 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Perf Budget Gate | 6 | 0 | 2 |
| Verify API Modules | 2 | 1 | 0 |
| Health Check | 2 | 2 | 0 |
| Roadie (Watcher + Implementer) | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| SEO Agent | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-16 12:17 (deep run — 8/8 proposals verified+promoted, #9169-9176)
- 2026-10-16 06:19 (cheap pulse — 7/8 proposals verified+promoted, #9153-9156/9158-9160; #9157 held)
- 2026-10-16 00:27 (cheap pulse — 7/7 proposals verified+promoted, #9142-9148)
- 2026-10-16 18:13 (mid-day pulse — 8/8 proposals verified+promoted, #9184-9191)
- 2026-10-17 00:27 (cheap pulse — 8/8 proposals verified+promoted, #9200-9207)
- 2026-10-17 06:16 (cheap pulse — 3/3 proposals verified+promoted, #9218-9220)

## 📦 Shipped to main (12)

- #9255 fix: #9239 SEO: Ryan Van Poederooyen — endorsementNews.js/extendedBios.js/albumArticles.js falsely credit him with Empath (2019)/Lightwork (2022) and misattribute Gene Hoglan's "Physicist" (2000) as his debut; correct tenure is 2002–2018 only
- #9254 fix: #9238 SEO: Kevin Talley — soundLikeGuides.js still fabricates 'Pearl Masters Premium Legend'/14x5.5" snare (never fixed by #9099/#8904), gearPriceHistory.js 2000-era kit still says 'Pearl Export' (drummerEvolution.js fixed by #7553, this file wasn't)
- #9253 fix: #9237 SEO: Navene Koperweis Animals as Leaders tenure wrong across 3 files (2010-2012/2012-2014) — verified 2009-2012 per bands.js, plus unresolved self-contradiction in api/drummers/index.js
- #9252 fix: #9235 SEO: Isaac Lamb — endorsements self-contradiction in api/drummers/index.js, fabricated "Self-titled (2012)" album, and residual hyper-specific gear models in soundLikeGuides.js/top10Lists.js
- #9251 fix: #9234 SEO: Tim Yeung tenure, birthplace, and band-membership fabrications across 3 drummerComparisons.js entries — verified Hate Eternal 1997-2000 (one stint), Rochester NY birthplace, no Hour of Penance
- #9250 fix: #9233 SEO: Tim Yeung endorsementNews.js ground truth misdates Tama/Sabian switch to Hate Eternal's "I, Monarch" (2005) — that album was recorded by Derek Roddy, not Yeung
- #9249 fix: #9232 SEO: Jocke Wallgren drummerEvolution.js fabricates birthdate/birthplace "April 1, 1986, in Karlstad, Sweden" (verified: June 10 1985, Chile — missed by #8525 batch fix)
- #9248 fix: #9231 SEO batch: Jocke Wallgren wrongly credited with recording Amon Amarth's "Jomsviking" (2016) across 9 files — verified session drummer was Tobias Gustafsson, Wallgren's studio debut was "Berserker" (2019)
- #9241 fix: #9236 SEO: Nick Augusto drummerEvolution.js era-objects still say Pearl Demon Drive (verified DW 9000 Series)
- #9240 fix: #9220 SEO: Arin Ilejay llms/evolution.md invents Mapex Saturn Series rig (verified DW Collector's Series since 2011)
- #9230 fix: #9219 SEO: Nick Augusto llms/evolution.md fabricates Vic Firth sticks + Pearl Demon Drive pedal (verified Pro-Mark 5B / DW 9000)
- #9229 fix: #9218 SEO: Morgan Ågren llms/evolution.md invents Sonor→DW/Paiste→Zildjian switch (verified continuous Sonor/Paiste)

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1908h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2004h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2181h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3266h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5696h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
