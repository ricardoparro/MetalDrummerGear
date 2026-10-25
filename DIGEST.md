# MetalForge — Digest

*Generated 2026-10-25 19:11 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **24** |
| Open `seo-proposal` issues | 10 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **15** |
| Issues closed in window | 15 |
| Commits to `main` in window | 20 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **419** |
| Sessions | 485 |
| Page views | 644 |
| Engagement rate | 57.11% |
| GSC impressions | 21,511 |
| GSC clicks | 237 |
| GSC CTR | 1.10% |
| GSC avg position | 9.0 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,760 |
| Est. ad revenue / mo | **~€8.28** |
| Progress to €1000/mo | 0.8% |
| Pageviews/mo needed for €1000 | ~333,333 (121× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 617 tracked queries) | 30 clicks · 11185 impr · CTR 0.3% · avg pos 9.8 | clicks (+3) · impr (+7843) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **32/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-249, trend-comparable): 237/249 indexed (−2) · rotating sample: 180/249 indexed · **full site: 2280 of 3161 sitemap URLs earned impressions (90d)** | 18 rejected-quality · 19 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 15 (+1)
- 🆕 New this week: syntx.ai
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 6d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 29d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 33d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 62d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 35 | 35 | 0 |
| Check Sitemap Drift | 11 | 6 | 5 |
| Verify Data Modules | 11 | 6 | 5 |
| Verify YouTube Videos | 11 | 6 | 5 |
| .github/workflows/check-vercel-rewrites.yml | 9 | 0 | 9 |
| Perf Budget Gate | 5 | 0 | 5 |
| Check llms freshness | 5 | 0 | 5 |
| Roadie (Watcher + Implementer) | 3 | 3 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| Health Check | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| CEO Agent | 1 | 1 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-25 12:14 (daily deep run — 8/8 proposals verified+promoted #9703-9712, 3 with scope-gap notes)
- 2026-10-25 00:31 (cheap pulse — 9/9 proposals verified+promoted #9675/9677-9684, GSC-gap held as known oscillator)
- 2026-10-24 00:28 (cheap pulse — 8/8 proposals verified+promoted #9607-9614, +1 companion ai-fix filed #9629)
- 2026-10-24 06:17 (cheap pulse — 8/8 proposals verified+promoted, #9630-9637)
- 2026-10-24 12:14 (daily deep run — 3/3 proposals verified+promoted #9647-9649, new mechanical pattern logged)
- 2026-10-24 18:11 (mid-day pulse — 8/8 proposals verified+promoted #9659-9666)

## 📦 Shipped to main (15)

- #9730 fix: #9712 SEO: Dave Lombardo llms mirrors still collapse his 3 Slayer stints into 2 + wrongly credit him with God Hates Us All
- #9729 fix: #9711 SEO: 3 Mario Duplantier llms mirrors never synced after #6028/#7290/#7921 fixed the Gretsch/Meinl/Sonor SQ2 fabrication in drummerEvolution.js
- #9727 fix: #9709 SEO: Lars Ulrich 'Kill 'Em All' article + llms mirror fabricate a pre-1984 'Tama Imperial Star' kit (verified: Camco until the 1984 Tama switch)
- #9726 fix: #9708 SEO: albumArticles/mike-portnoy.js self-contradicts stick brand — 8 blocks say 'Vic Firth', verified brand is Promark
- #9725 fix: #9706 SEO: Mike Portnoy drummerEvolution.js wording + gear-history llms mirror fabricate wrong Tama/cymbal history (verified: Tama since 1985, Sabian not Zildjian)
- #9724 fix: #9705 SEO: drummerComparisons.js self-contradicts Dave Lombardo's kit wood — 'Starclassic Maple' in 8 spots vs verified 'Walnut/Birch'
- #9723 fix: #9704 SEO: Dave Lombardo albumArticles.js repeatedly misattributes Diabolus in Musica + God Hates Us All to Lombardo (both are Paul Bostaph's)
- #9722 fix: #9703 SEO: Danny Carey gear-history llms mirror fabricates entire Pearl/Zildjian/DW rig (verified: Sonor/Paiste/Vic Firth)
- #9717 fix: #9691 SEO: Adrian Erlandsson llms mirrors mis-date his Tama/Sabian/Monolit gear switch to 1996-2011 instead of 2014
- #9716 fix: #9692 SEO: Martin Lopez evolution llms mirror summary table says 'Sonor Force Series' + Zildjian for his Opeth years
- #9715 fix: #9690 SEO: Martin Lopez gear-history llms mirror fabricates Noble & Cooley/Zildjian K Dark for his entire Opeth era
- #9714 fix: #9689 SEO: Nick Barker gear-history llms mirror fabricates a detailed Pearl/Paiste rig + fake magazine citation
- #9713 fix: #9688 SEO: top10Lists.js death-doom entry stale-claims Waltteri Väyrynen has 'no dedicated profile'
- #9710 fix: #9687 SEO: Waltteri Väyrynen's licks entry wrongly calls The Last Will and Testament his 'second' Opeth album
- #9707 fix: #9684 SEO: Hannes Grossmann gear-history llms mirror still says Alkaloid co-founded in 2013 (verified 2014 per closed #9143)

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2100h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2196h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2373h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3458h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5888h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
