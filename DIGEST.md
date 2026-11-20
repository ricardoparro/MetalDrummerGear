# MetalForge — Digest

*Generated 2026-11-20 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **21** |
| Open `seo-proposal` issues | 10 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **4** |
| Issues closed in window | 4 |
| Commits to `main` in window | 8 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **788** |
| Sessions | 847 |
| Page views | 1,108 |
| Engagement rate | 45.10% |
| GSC impressions | 14,865 |
| GSC clicks | 293 |
| GSC CTR | 1.97% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,749 |
| Est. ad revenue / mo | **~€14.25** |
| Progress to €1000/mo | 1.4% |
| Pageviews/mo needed for €1000 | ~333,333 (70× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 863 tracked queries) | 38 clicks · 5252 impr · CTR 0.7% · avg pos 10.8 | clicks (+4) · impr (−721) · pos (−0.2) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **13/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 226/250 indexed (−9) · rotating sample: 141/250 indexed · **full site: 2272 of 3158 sitemap URLs earned impressions (90d)** | 39 rejected-quality · 35 never-crawled |
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
| Chris Adler — 54º aniversário | 3d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 7d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 36d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 65d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 49 | 49 | 0 |
| Verify YouTube Videos | 9 | 5 | 4 |
| Verify Data Modules | 8 | 4 | 4 |
| Check Sitemap Drift | 8 | 4 | 4 |
| Check llms freshness | 5 | 0 | 5 |
| Perf Budget Gate | 4 | 0 | 4 |
| Health Check | 4 | 4 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Check Video SEO | 2 | 0 | 2 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-19 12:10 (deep run — 4/5 proposals verified+promoted #10863-10866, 1 rejected #10862)
- 2026-11-19 00:19 (cheap pulse — 5/5 proposals verified+promoted #10844-10848)
- 2026-11-19 06:15 (cheap pulse — 7/7 proposals verified+promoted #10849-10855)
- 2026-11-19 18:09 (mid-day pulse — 6/6 proposals verified+promoted #10874-10879)
- 2026-11-20 00:19 (cheap pulse — 3/3 proposals verified+promoted #10887/10888/10890)
- 2026-11-20 06:12 (cheap pulse — 2/2 proposals verified+promoted #10893/#10894)

## 📦 Shipped to main (4)

- #10900 fix: #10894 SEO: pedalReferencePages.js still implies George Kollias's Demon XR benefits from direct drive — #10844's fix was incomplete
- #10899 fix: #10893 SEO: gearCategoryPages.js sticks editorialIntro fabricates Benny Greb roster claim + mismatches Lars Ulrich's stick brand
- #10896 fix: #10890 SEO: licks/pete-sandoval.js frames unsourced BPM figures as his personal speed record (same class as closed #10850/#10853)
- #10895 fix: #10888 SEO: gearCategoryPages.js drums+hardware editorialIntro fabricate Gene Hoglan/Chris Adler gear pairings (sibling to #10845's snare-section fix)

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 403h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2713h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2809h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2986h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4071h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
