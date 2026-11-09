# MetalForge — Digest

*Generated 2026-11-09 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **5** |
| Issues closed in window | 5 |
| Commits to `main` in window | 14 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **457** |
| Sessions | 533 |
| Page views | 763 |
| Engagement rate | 64.54% |
| GSC impressions | 15,137 |
| GSC clicks | 307 |
| GSC CTR | 2.03% |
| GSC avg position | 8.1 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,270 |
| Est. ad revenue / mo | **~€9.81** |
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
| Chris Adler — 54º aniversário | 14d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 18d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 47d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 49 | 48 | 1 |
| Check Sitemap Drift | 6 | 3 | 3 |
| Verify YouTube Videos | 6 | 3 | 3 |
| Verify Data Modules | 6 | 3 | 3 |
| Roadie (Watcher + Implementer) | 5 | 5 | 0 |
| Health Check | 4 | 3 | 1 |
| Check llms freshness | 4 | 0 | 4 |
| Perf Budget Gate | 3 | 0 | 3 |
| Daily Digest | 2 | 1 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 1 | 1 |
| Verify API Modules | 2 | 1 | 1 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |
| Check structured data | 1 | 1 | 0 |
| Check indexation health | 1 | 1 | 0 |
| Check GSC watched queries | 1 | 1 | 0 |
| Check backlink signal | 1 | 1 | 0 |
| Check LLM citations | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-09 00:21 — overnight pulse: 4/4 proposals verified+promoted #10477-10481, #10460 corrected-close (already resolv
- 2026-11-08 18:08 (cheap pulse — 3/3 proposals verified+promoted #10469-10471)
- 2026-11-08 12:xx — daily deep run: 5/5 fresh proposals verified+promoted #10456-10460
- 2026-11-08 06:11 (cheap pulse, pre-deep-run — 7/7 proposals verified+promoted #10446-10452)
- 2026-11-08 00:2x (cheap pulse — 3/3 proposals verified+promoted #10443-10445)
- 2026-11-09 06:20 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10485-10487)

## 📦 Shipped to main (5)

- #10500 fix: #10493 SEO: Martin Lopez fabricated Morbid Angel 'Heretic' session credit in drummerComparisons.js (3 locations) — zero Morbid Angel connection in verified band history
- #10499 fix: #10492 SEO: Hellhammer's Dimmu Borgir tenure still stale '2005-2010' in api/drummers/index.js + extendedBios.js — verified 1999-2013 by 3 closed issues
- #10496 fix: #10487 SEO: Danny Carey Paiste cymbal sizes fabricated in drummerComparisons.js + genreGearGuides.js (3 locations, 2 files) — verified 14"/18"&20" vs claimed 15"/18"&19"
- #10495 fix: #10486 SEO: Eloy Casagrande cymbal models invented in matt-greiner-vs-eloy-casagrande.md — contradicts file's own Setup section
- #10494 fix: #10485 SEO batch: 2 drummerComparisons.js George Kollias entries missed by both #9826 and #10471's restore

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 150h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2460h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2556h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2733h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3818h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
