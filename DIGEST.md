# MetalForge — Digest

*Generated 2026-10-13 19:12 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **27** |
| Open `seo-proposal` issues | 18 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 2 |
| PRs merged in window | **13** |
| Issues closed in window | 14 |
| Commits to `main` in window | 18 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **426** |
| Sessions | 487 |
| Page views | 687 |
| Engagement rate | 55.65% |
| GSC impressions | 12,691 |
| GSC clicks | 234 |
| GSC CTR | 1.84% |
| GSC avg position | 7.6 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,944 |
| Est. ad revenue / mo | **~€8.83** |
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
| Mikkey Dee — 63º aniversário | 18d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 41d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 45d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 24 | 23 | 0 |
| Verify YouTube Videos | 14 | 6 | 5 |
| Verify Data Modules | 14 | 6 | 5 |
| Check Sitemap Drift | 14 | 6 | 5 |
| Perf Budget Gate | 7 | 0 | 5 |
| Check llms freshness | 7 | 0 | 5 |
| .github/workflows/check-vercel-rewrites.yml | 7 | 0 | 7 |
| Roadie (Watcher + Implementer) | 3 | 3 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-13 18:16 (mid-day pulse — 6/6 proposals verified+promoted, #9028-9033)
- 2026-10-13 12:19 (deep run — 4/4 proposals verified+promoted, #9014/#9015/#9017 + #9016 split into #9026/#9027)
- 2026-10-13 06:23 (cheap pulse — 8/8 proposals verified+promoted, #8996-9003)
- 2026-10-13 00:35 (evening-review catch-up for 10-12 — 8/8 proposals verified+promoted #8987-8994, follow-up #8995 filed)
- 2026-10-12 12:25 (deep run — L1/L2/L3 full close-the-loop + 5/5 proposals verified+promoted #8952-8956, L3 fix #8970 fil
- 2026-10-12 00:37 (evening-review catch-up — 8/8 proposals verified+promoted #8924-8932, follow-up #8934 filed)

## 📦 Shipped to main (13)

- #9038 fix: #9027 feat(seo): fix Frost cymbal fabrication in symphonic-metal guides (split 2/2 of #9016)
- #9037 fix: #9026 feat(seo): fix Frost cymbal fabrication in black-metal guides (split 1/2 of #9016)
- #9036 fix: #9015 SEO: Nick Barker snare fabricated as 'Sonor 14x3.5 Piccolo' in gearPriceHistory.js — no snare model is verified at all
- #9035 fix: #9017 SEO: Paul Bostaph top10Lists.js entries cross-contaminated with Dave Lombardo's 'Christ Illusion' Grammy — Bostaph never played on it
- #9034 fix: #9014 SEO: Chris Turner sticks still fabricated as 'Promark or Vic Firth 5B' in drummerComparisons.js — verified Vic Firth American Classic 5A only
- #9024 fix: #9002 SEO: Igor Cavalera drums/cymbals/heads fabricated as 'Tama Starclassic/Paiste/Evans' in api/gear-finder/index.js — verified Yamaha/Zildjian/Remo
- #9025 fix: #9003 SEO: Abe Cunningham cymbals era-misattributed to Koi No Yokan/Gore/Ohms as 'Zildjian' in extendedBios.js — verified Sabian HHX for that era
- #9023 fix: #9001 SEO: Vinnie Paul Vulgar Display/Far Beyond Driven era fabricated as 'Pearl Masters Custom' in drummerEvolution.js — verified Tama through 1996
- #9022 fix: #9000 SEO: Nick Menza drummerEvolution.js FAQ + 1992-1996 era block still fabricate Pearl Masters for Rust in Peace (1990) and Zildjian cymbals for Countdown/Youthanasia — root file never got the fixes its downstream copies received
- #9021 fix: #8999 SEO: Jocke Wallgren snare fabricated as "Pearl Reference 14x6.5\" Brass" in drummerEvolution.js (x2) + drummerComparisons.js (3 entries) + albumArticles/jocke-wallgren.js — verified: no snare model documented
- #9020 fix: #8998 SEO: Adrian Erlandsson Tama relationship fabricated as beginning 'in the late 1990s' in api/drummers/index.js kitOverview — verified 2014 switch (same bug as #8181, missed this file)
- #9019 fix: #8997 SEO: Daniel Erlandsson hardware fabricated as 'Pearl Demon Drive' in pedals.js — verified Pearl Eliminator Double Bass Pedal (root record behind 10+ prior downstream fixes)
- #9018 fix: #8996 SEO batch: api/stats/gear-insights.js is a hardcoded 62-entry duplicate gear array that has drifted from endorsementNews.js ground truth (CLAUDE.md Rule 1 violation)

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1812h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1908h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2085h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3170h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5600h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
