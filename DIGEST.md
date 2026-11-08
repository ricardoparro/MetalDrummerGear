# MetalForge — Digest

*Generated 2026-11-08 19:07 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **24** |
| Open `seo-proposal` issues | 14 |
| Open `human-founder` issues | 8 |
| Open `broken-video` issues | 0 |
| Open PRs | 1 |
| PRs merged in window | **13** |
| Issues closed in window | 11 |
| Commits to `main` in window | 18 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **469** |
| Sessions | 539 |
| Page views | 779 |
| Engagement rate | 64.01% |
| GSC impressions | 15,637 |
| GSC clicks | 294 |
| GSC CTR | 1.88% |
| GSC avg position | 8.2 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~3,339 |
| Est. ad revenue / mo | **~€10.02** |
| Progress to €1000/mo | 1.0% |
| Pageviews/mo needed for €1000 | ~333,333 (100× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 775 tracked queries) | 39 clicks · 9064 impr · CTR 0.4% · avg pos 10.9 | clicks (+16) · impr (−4373) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **17/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 237/250 indexed (−1) · rotating sample: 194/250 indexed · **full site: 2270 of 3159 sitemap URLs earned impressions (90d)** | 29 rejected-quality · 21 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 76 perf · TBT 1139ms · **worst: Album article (Sacrament drum setup) — 51 perf, LCP 12.1s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (+6) · TBT (−533)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 17 (+1)
- 🆕 New this week: oceanhero.today
- Top sources: uk.search.yahoo.com (5) · m.facebook.com (4) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Chris Adler — 54º aniversário | 15d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 19d | _awaiting scanner run_ |
| Lars Ulrich — 63º aniversário | 48d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 37 | 37 | 0 |
| Check Sitemap Drift | 12 | 6 | 5 |
| Verify YouTube Videos | 12 | 6 | 5 |
| Verify Data Modules | 12 | 6 | 5 |
| Perf Budget Gate | 6 | 0 | 5 |
| Check llms freshness | 6 | 0 | 5 |
| Health Check | 3 | 3 | 0 |
| Roadie (Watcher + Implementer) | 3 | 3 | 0 |
| Loop Watchdog | 2 | 2 | 0 |
| SEO Agent | 2 | 1 | 0 |
| CEO Agent | 2 | 2 | 0 |
| Daily Digest | 1 | 0 | 0 |
| Roadie Night Fleet | 1 | 0 | 0 |
| X Agent | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-11-08 18:08 (cheap pulse — 3/3 proposals verified+promoted #10469-10471)
- 2026-11-08 12:xx — daily deep run: 5/5 fresh proposals verified+promoted #10456-10460
- 2026-11-08 06:11 (cheap pulse, pre-deep-run — 7/7 proposals verified+promoted #10446-10452)
- 2026-11-08 00:2x (cheap pulse — 3/3 proposals verified+promoted #10443-10445)
- 2026-11-07 18:1x (cheap pulse — 3/3 proposals verified+promoted #10429-10431)
- 2026-11-07 12:15 — daily deep run: 8/8 fresh proposals verified+promoted #10413-10420

## 📦 Shipped to main (13)

- #10476 fix: #10459 SEO: Eloy Casagrande bass drum size fabricated as 'dual 22x18"' in drummerComparisons.js — verified 22x16 & 24x14
- #10475 fix: #10458 SEO batch: Gene Hoglan + Ray Luzier unverified snares stated as hard fact across 8 drummerComparisons.js entries + stale snares.js verified:true flag
- #10473 fix: #10457 SEO: Chris Adler birthplace fabricated as 'Richmond, Virginia' in drummerComparisons.js:1942 (root cause of vs/dave-lombardo-vs-chris-adler.md)
- #10474 fix: #10457 SEO: Chris Adler birthplace fabricated as 'Richmond, Virginia' in drummerComparisons.js:1942 (root cause of vs/dave-lombardo-vs-chris-adler.md)
- #10472 fix: #10456 SEO batch: Bill Ward 'Ludwig Classic Maple' kit + fabricated 18" China cymbal across 13 drummerComparisons.js entries (root cause)
- #10468 fix: #10452 SEO: battles/inferno-vs-hellhammer.md frames Inferno's Behemoth tenure as unbroken since 1997, omits verified 1999-2000 gap
- #10467 fix: #10451 SEO: battles/vinnie-paul-vs-dave-lombardo.md fabricates Dave Lombardo's kit as 'Starclassic Maple' in FAQ (self-contradiction)
- #10466 fix: #10450 SEO: battles/tomas-haake-vs-mario-duplantier.md invents tom depths for both drummers (diameters-only in ground truth)
- #10465 fix: #10449 SEO: battles/lars-ulrich-vs-dave-lombardo.md fabricates Dave Lombardo's kit as 'Starclassic Maple' in FAQ (self-contradiction)
- #10464 fix: #10448 SEO: battles/gene-hoglan-vs-george-kollias.md states unverified 'Pearl Reference 14x6.5 Brass' snare as fact for Hoglan
- #10463 fix: #10448 SEO: battles/gene-hoglan-vs-george-kollias.md states unverified 'Pearl Reference 14x6.5 Brass' snare as fact for Hoglan
- #10462 fix: #10447 SEO: battles/danny-carey-vs-mike-portnoy.md still has fabricated 'Legend of the Seagullmen' band for Danny Carey
- #10461 fix: #10446 SEO: battles/brann-dailor-vs-chris-adler.md fabricates Chris Adler's kit as 'Mapex Black Panther Design Lab'

## 🔴 Needs attention

- 🧑 Issue #10174 — 🧑 Decide: should check-llms-freshness self-heal via direct-to-main commits? (split 2/2 of #10162) _(open 126h)_
- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 2436h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 2532h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2709h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3794h)_

---

_Next refresh: 08:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
