# MetalForge — Digest

*Generated 2026-11-13 08:15 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **4** |
| Issues closed in window | 4 |
| Commits to `main` in window | 8 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| GA4 | _unavailable_ |
| GSC impressions | 12,090 |
| GSC clicks | 291 |
| GSC CTR | 2.41% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

_No pageview data yet — needs GA4 metrics._

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
| Chris Adler — 54º aniversário | 10d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 14d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 43d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 46 | 46 | 0 |
| Verify YouTube Videos | 9 | 5 | 4 |
| Verify API Modules | 8 | 4 | 4 |
| Check Sitemap Drift | 8 | 4 | 4 |
| Verify Data Modules | 6 | 3 | 3 |
| Check llms freshness | 5 | 0 | 5 |
| Health Check | 4 | 4 | 0 |
| Perf Budget Gate | 3 | 0 | 3 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-13 00:20 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10577/10579)
- 2026-11-12 00:19 (cheap pulse — 2/2 proposals verified+promoted #10559/10560)
- 2026-11-12 06:13 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10562/10563/10564)
- 2026-11-12 12:11 (deep run — 3/3 proposals verified+promoted #10567/10568/10569)
- 2026-11-12 18:09 (cheap pulse — 1/1 proposal verified+promoted #10573)
- 2026-11-13 06:12 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10580/10581)

## 📦 Shipped to main (4)

- #10590 fix: #10581 SEO: Sons of Apollo band page live meta title/description fabricate 'Mike Mangini' as drummer — verified Mike Portnoy, self-contradicted by the record's own FAQ/drummerHistory
- #10589 fix: #10580 SEO: Gene Hoglan's api/drummers/index.js + extendedBios.js still credit him with Paul Bostaph's 2007-2011 Testament stint (Formation of Damnation) — root canonical file never fixed
- #10583 fix: #10577 SEO: George Kollias's root api/drummers/index.js record still fabricates 'Pearl George Kollias Signature' snare + 'K Mastersound/K Custom Dark' cymbals — 12+ closed issues fixed every mirror but never this file
- #10582 fix: #10579 SEO: Aquiles Priester + Daniel Erlandsson — stale 'endorsements' array in api/drummers/index.js still names pre-fix brands, contradicting the gear object 2-9 lines above

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 236h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2545h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2641h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2818h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3903h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
