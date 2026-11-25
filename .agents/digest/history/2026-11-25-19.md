# MetalForge — Digest

*Generated 2026-11-25 19:08 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **22** |
| Open `seo-proposal` issues | 11 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 2 |
| PRs merged in window | **3** |
| Issues closed in window | 3 |
| Commits to `main` in window | 10 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **836** |
| Sessions | 882 |
| Page views | 1,149 |
| Engagement rate | 41.72% |
| GSC impressions | 16,313 |
| GSC clicks | 285 |
| GSC CTR | 1.75% |
| GSC avg position | 7.2 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,924 |
| Est. ad revenue / mo | **~€14.77** |
| Progress to €1000/mo | 1.5% |
| Pageviews/mo needed for €1000 | ~333,333 (68× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 929 tracked queries) | 26 clicks · 4843 impr · CTR 0.5% · avg pos 10.8 | clicks (−12) · impr (−409) · pos (±0) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **31/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 222/250 indexed (−4) · rotating sample: 226/250 indexed · **full site: 2282 of 3157 sitemap URLs earned impressions (90d)** | 25 rejected-quality · 12 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1188ms · **worst: Album article (Sacrament drum setup) — 52 perf, LCP 11.0s** · 2/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (±0) · TBT (+49)ms · chronic (−2) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 20 (±0)
- 🆕 New this week: br.search.yahoo.com
- Top sources: aocr.org (11) · uk.search.yahoo.com (8) · cn.bing.com (4) · facebook.com (3) · noai.duckduckgo.com (3)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Charlie Benante — 64º aniversário | 2d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 31d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 60d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 53 | 53 | 0 |
| Check llms freshness | 6 | 0 | 4 |
| Roadie (Watcher + Implementer) | 6 | 6 | 0 |
| Health Check | 4 | 4 | 0 |
| Loop Watchdog | 3 | 3 | 0 |
| Daily Digest | 2 | 1 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |
| Verify YouTube Videos | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-25 18:08 (cheap pulse — 2/2 proposals verified+promoted #11131-11132)
- 2026-11-25 12:11 (daily deep run — 3/3 proposals verified+promoted #11128-11130)
- 2026-11-24 07:xx (daily deep run — 8/8 proposals verified+promoted #11076-11083)
- 2026-11-24 00:18 (cheap pulse — 8/8 proposals verified+promoted #11060-11070)
- 2026-11-24 12:11 (cheap pulse — 7/7 proposals verified+promoted #11092-11098)
- 2026-11-24 18:09 (mid-day pulse — anti-noise hold, 2/2 proposals verified+promoted #11108-11109)

## 📦 Shipped to main (3)

- #11135 fix: #11130 SEO: public/llms/birthdays.md FAQ 'which month has the most birthdays' contradicts the file's own table
- #11134 fix: #11129 SEO: public/llms/facts.md — Nicko McBrain album count overstated (17→14) and Tama roster-share stat stale (40%→~29%)
- #11133 fix: #11128 SEO: public/llms/bpm.md — 6 BPM/drummer attribution errors already corrected in metalSongsBpm.js but never synced to the mirror

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 534h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2844h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2940h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 3117h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4202h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
