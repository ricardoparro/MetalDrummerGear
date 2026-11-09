# MetalForge — Digest

*Generated 2026-11-09 08:17 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 8 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **7** |
| Issues closed in window | 8 |
| Commits to `main` in window | 14 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **441** |
| Sessions | 512 |
| Page views | 743 |
| Engagement rate | 64.26% |
| GSC impressions | 15,137 |
| GSC clicks | 307 |
| GSC CTR | 2.03% |
| GSC avg position | 8.1 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,184 |
| Est. ad revenue / mo | **~€9.55** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (105× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 839 tracked queries) | 34 clicks · 5973 impr · CTR 0.6% · avg pos 11.0 | clicks (−5) · impr (−3091) · pos (+0.1) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **16/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 237/250 indexed (−1) · rotating sample: 194/250 indexed · **full site: 2270 of 3159 sitemap URLs earned impressions (90d)** | 29 rejected-quality · 21 never-crawled |
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
| Chris Adler — 54º aniversário | 14d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 18d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 47d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 26 | 26 | 0 |
| Verify YouTube Videos | 15 | 8 | 7 |
| Verify Data Modules | 14 | 7 | 7 |
| Check Sitemap Drift | 14 | 7 | 7 |
| Check llms freshness | 8 | 0 | 8 |
| Perf Budget Gate | 7 | 0 | 7 |
| Health Check | 2 | 2 | 0 |
| Check Video SEO | 2 | 0 | 2 |
| Daily Digest | 1 | 0 | 0 |
| Check GSC watched queries | 1 | 1 | 0 |
| Check backlink signal | 1 | 1 | 0 |
| Check LLM citations | 1 | 1 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Check broken images | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |
| Roadie Night Fleet | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-09 00:21 — overnight pulse: 4/4 proposals verified+promoted #10477-10481, #10460 corrected-close (already resolv
- 2026-11-08 18:08 (cheap pulse — 3/3 proposals verified+promoted #10469-10471)
- 2026-11-08 12:xx — daily deep run: 5/5 fresh proposals verified+promoted #10456-10460
- 2026-11-08 06:11 (cheap pulse, pre-deep-run — 7/7 proposals verified+promoted #10446-10452)
- 2026-11-08 00:2x (cheap pulse — 3/3 proposals verified+promoted #10443-10445)
- 2026-11-09 06:20 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10485-10487)

## 📦 Shipped to main (7)

- #10496 fix: #10487 SEO: Danny Carey Paiste cymbal sizes fabricated in drummerComparisons.js + genreGearGuides.js (3 locations, 2 files) — verified 14"/18"&20" vs claimed 15"/18"&19"
- #10495 fix: #10486 SEO: Eloy Casagrande cymbal models invented in matt-greiner-vs-eloy-casagrande.md — contradicts file's own Setup section
- #10494 fix: #10485 SEO batch: 2 drummerComparisons.js George Kollias entries missed by both #9826 and #10471's restore
- #10491 fix: #10481 SEO: techniques.js mislabels Derek Roddy 'ex-Nile' (2 locations) — verified one-album session fill-in, never a member
- #10490 fix: #10480 SEO: signatureGear.js self-contradicts Danny Carey's 38" gong — narrative says 'Symphonic Gong', the page's own title/FAQ says 'Paiste Giant Beat Multi Gong'
- #10488 fix: #10477 SEO: drummerEvolution.js fabricates Dave Lombardo's Slayer tenure as continuous '1981-Present' — verified 3 separate stints ending 2013
- #10489 fix: #10478 SEO: Gene Hoglan's Dark Angel start year wrong as 1983 in drummerEvolution.js + its llms mirror — verified joined 1984

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 140h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2449h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2545h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2722h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3807h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
