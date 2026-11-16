# MetalForge — Digest

*Generated 2026-11-16 08:27 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **21** |
| Open `seo-proposal` issues | 17 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **8** |
| Issues closed in window | 7 |
| Commits to `main` in window | 16 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **714** |
| Sessions | 781 |
| Page views | 1,012 |
| Engagement rate | 50.45% |
| GSC impressions | 14,938 |
| GSC clicks | 332 |
| GSC CTR | 2.22% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,337 |
| Est. ad revenue / mo | **~€13.01** |
| Progress to €1000/mo | 1.3% |
| Pageviews/mo needed for €1000 | ~333,333 (77× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 863 tracked queries) | 38 clicks · 5252 impr · CTR 0.7% · avg pos 10.8 | clicks (+4) · impr (−721) · pos (−0.2) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **13/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 235/250 indexed (−2) · rotating sample: 166/250 indexed · **full site: 2283 of 3159 sitemap URLs earned impressions (90d)** | 37 rejected-quality · 19 never-crawled |
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
| Chris Adler — 54º aniversário | 7d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 11d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 40d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 25 | 25 | 0 |
| Verify YouTube Videos | 16 | 8 | 7 |
| Verify Data Modules | 15 | 7 | 7 |
| Check Sitemap Drift | 14 | 7 | 6 |
| Check llms freshness | 9 | 0 | 8 |
| Perf Budget Gate | 8 | 0 | 7 |
| Health Check | 2 | 2 | 0 |
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
| Deploy to Production (batched) | 1 | 0 | 1 |

## 🧠 Today's CEO decisions

- 2026-11-16 00:23 (cheap pulse — 4/4 proposals verified+promoted #10692/10694/10695/10697)
- 2026-11-15 06:12 (cheap pulse — 4/4 proposals verified+promoted #10659-10662)
- 2026-11-15 00:21 — overnight pulse: 3/3 promotable proposals verified+promoted #10651/10653/10654, GSC content-gap row r
- 2026-11-15 12:10 (deep run — 8/8 proposals verified+promoted #10667-10674)
- 2026-11-15 18:09 (cheap pulse — 3/3 proposals verified+promoted #10681-10683)
- 2026-11-16 06:18 (cheap pulse — 4/4 proposals verified+promoted #10699-10702)

## 📦 Shipped to main (8)

- #10718 fix: #10701 SEO: Travis Orbin's Periphery tenure still '2006-2009' in top10Lists.js source (6 locations) — prior #10654 fix only patched the generated catalog, will drift back on rebuild
- #10717 fix: #10701 SEO: Travis Orbin's Periphery tenure still '2006-2009' in top10Lists.js source (6 locations) — prior #10654 fix only patched the generated catalog, will drift back on rebuild
- #10716 fix: #10700 SEO: Eloy Casagrande shown as concurrent 'Sepultura / Slipknot' in nameGeneratorData.js, missing ex- qualifier
- #10715 fix: #10699 SEO: Mario Duplantier mis-keyed under Tama STAR Classic Maple instead of Bubinga in drummersByKit.js
- #10706 fix: #10697 SEO: signatureGear.js fabricates 'Steel/Beech Hybrid' shell material for Tomas Haake's Sonor signature snare
- #10705 fix: #10695 SEO: evolutionTimeline.js Vinnie Paul entry says year: 1991 but names Cowboys from Hell (1990)
- #10704 fix: #10692 SEO: evolutionTimeline.js dates Tomas Haake's 'Contradictions Collapse' to 1993 — album released 1991
- #10703 fix: #10694 SEO: evolutionTimeline.js misattributes Mayhem's Deathcrush (1987) to Hellhammer, who joined in 1988

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 308h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2617h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2713h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2891h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3975h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
