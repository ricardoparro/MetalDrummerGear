# MetalForge — Digest

*Generated 2026-11-24 08:14 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **16** |
| Issues closed in window | 16 |
| Commits to `main` in window | 20 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **756** |
| Sessions | 803 |
| Page views | 1,073 |
| Engagement rate | 41.10% |
| GSC impressions | 15,827 |
| GSC clicks | 270 |
| GSC CTR | 1.71% |
| GSC avg position | 7.4 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~4,599 |
| Est. ad revenue / mo | **~€13.80** |
| Progress to €1000/mo | 1.4% |
| Pageviews/mo needed for €1000 | ~333,333 (72× current) |

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
| Charlie Benante — 64º aniversário | 3d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 32d | _awaiting scanner run_ |
| Sean Reinert — 7 anos | 61d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 62 | 62 | 0 |
| Check llms freshness | 18 | 0 | 18 |
| Health Check | 4 | 4 | 0 |
| SEO Agent | 2 | 2 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Roadie Night Fleet | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Verify YouTube Videos | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-24 07:xx (daily deep run — 8/8 proposals verified+promoted #11076-11083)
- 2026-11-24 00:18 (cheap pulse — 8/8 proposals verified+promoted #11060-11070)
- 2026-11-23 00:21 (cheap pulse — 4/4 proposals verified+promoted #11015/11017/11019/11021)
- 2026-11-23 06:18 (cheap pulse — 5/5 proposals verified+promoted #11023-11027)
- 2026-11-23 12:11 (daily deep run — L1/L2/L3 close-the-loop + 7/7 proposals verified+promoted #11032-11038)
- 2026-11-23 18:09 (mid-day pulse — 8/8 proposals verified+promoted #11044-11051)

## 📦 Shipped to main (16)

- #11106 fix: #11082 SEO: public/llms/brands/ludwig.md — Bill Ward kit/pedal/cymbals all fabricated
- #11107 fix: #11083 SEO: public/llms/brands/paiste.md — 3 findings, incl. Bill Ward fabricated as a Paiste cymbal user
- #11105 fix: #11081 SEO: public/llms/brands/meinl.md — 4 findings, incl. wholesale-fabricated endorsement for an undocumented drummer
- #11104 fix: #11080 SEO: public/llms/brands/dw.md — 6 findings, incl. Bill Ward fabricated as a DW hardware user (he has zero DW gear)
- #11103 fix: #11079 SEO: public/llms/brands/sabian.md — 6 findings, incl. 3-way cross-brand contradiction with meinl.md/paiste.md
- #11101 fix: #11078 SEO: public/llms/brands/zildjian.md — 7 fabricated/wrong facts, incl. cross-brand contamination
- #11100 fix: #11077 SEO: public/llms/brands/pearl.md — 10 fabricated/wrong gear facts, incl. 2 non-Pearl drummers presented as Pearl endorsers
- #11099 fix: #11076 SEO: public/llms/brands/tama.md — 13 fabricated/wrong gear facts across 12 drummers
- #11091 fix: #11067 SEO: evolution/paul-mazurkiewicz.md fabricates 'Pearl Demon Drive' pedal (cross-contaminated) + wrong current-era heads
- #11090 fix: #11070 SEO: evolution/daray.md fabricates 'Pearl Demon XR' pedal — that's George Kollias's co-designed model, verified Daray plays Demon Drive
- #11089 fix: #11066 SEO: evolution/paul-bostaph.md wrong drum model + cymbal series for 1987-96 era — verified Artstar II / Paiste RUDE
- #11088 fix: #11065 SEO: evolution/sean-reinert.md fabricates entire DW drum kit for Death/Cynic era — verified Tama Artstar II
- #11087 fix: #11060 SEO: evolution/derek-roddy.md fabricates entire early-career rig (Pearl/Sabian) for a period ground truth hedges as undocumented
- #11086 fix: #11063 SEO: evolution/lars-ulrich.md fabricates 'Tama steel snare' for St. Anger — verified borrowed Ludwig Vistalite acrylic, 'not a Tama'
- #11085 fix: #11062 SEO: evolution/jocke-wallgren.md repeats the exact fabricated snare string already purged elsewhere by #10798
- _+1 more_

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 499h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2809h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2905h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 3082h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 4167h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
