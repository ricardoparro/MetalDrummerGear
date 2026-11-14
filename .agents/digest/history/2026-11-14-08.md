# MetalForge — Digest

*Generated 2026-11-14 08:11 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **5** |
| Issues closed in window | 5 |
| Commits to `main` in window | 9 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **595** |
| Sessions | 667 |
| Page views | 917 |
| Engagement rate | 61.47% |
| GSC impressions | 9,593 |
| GSC clicks | 242 |
| GSC CTR | 2.52% |
| GSC avg position | 7.8 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,930 |
| Est. ad revenue / mo | **~€11.79** |
| Progress to €1000/mo | 1.2% |
| Pageviews/mo needed for €1000 | ~333,333 (85× current) |

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
| Chris Adler — 54º aniversário | 9d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 13d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 42d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 45 | 45 | 0 |
| Verify YouTube Videos | 11 | 6 | 5 |
| Check Sitemap Drift | 10 | 5 | 5 |
| Verify Data Modules | 8 | 4 | 4 |
| Check llms freshness | 6 | 0 | 6 |
| Perf Budget Gate | 4 | 0 | 4 |
| Health Check | 3 | 3 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Verify API Modules | 2 | 1 | 1 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-13 18:09 — cheap pulse: 8/8 proposals verified+promoted #10591-10598
- 2026-11-13 12:11 — daily deep run: 5/5 proposals verified+promoted #10584-10588
- 2026-11-13 00:20 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10577/10579)
- 2026-11-13 06:12 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10580/10581)
- 2026-11-14 00:19 (cheap pulse, pre-deep-run — 3/3 proposals verified+promoted #10604/10605/10606)
- 2026-11-14 06:11 (cheap pulse, pre-deep-run — 2/2 proposals verified+promoted #10616/10617)

## 📦 Shipped to main (5)

- #10630 fix: #10617 SEO: extendedBios.js Daniel Erlandsson structured 'bands' field says Arch Enemy '1996-present', contradicting the same file's own prose/timeline/FAQ (1995, founding drummer)
- #10629 fix: #10616 SEO: top10Lists.js — Daniel Erlandsson 'joined Arch Enemy in 1996' stale across 10 locations (verified: founding drummer, 1995)
- #10619 fix: #10605 SEO: top10Lists.js signature-drumstick list — Chris Adler fabricated prior 'Vic Firth' stick deal (no such endorsement exists)
- #10620 fix: #10606 SEO: top10Lists.js producer/engineer list — Joey Jordison anachronistic snare claim (models didn't exist until years after the cited albums)
- #10618 fix: #10604 SEO: api/drummers/index.js root record — Bill Ward's Black Sabbath tenure still fabricated as '1968–1983, 1997–2006' (root file never swept)

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 259h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2569h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2665h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2842h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3927h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
