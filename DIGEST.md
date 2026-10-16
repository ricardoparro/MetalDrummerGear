# MetalForge — Digest

*Generated 2026-10-16 08:21 UTC · Window: last 12h*

---

## 🚦 Pipeline health (last 12h)

| Metric | Value |
| --- | --- |
| Open `ai-fix` issues | **20** |
| Open `seo-proposal` issues | 13 |
| Open `human-founder` issues | 7 |
| Open `broken-video` issues | 0 |
| Open PRs | 0 |
| PRs merged in window | **14** |
| Issues closed in window | 14 |
| Commits to `main` in window | 18 |

## 📈 Business metrics

| Metric | Last 7d |
| --- | --- |
| Active users | **445** |
| Sessions | 488 |
| Page views | 693 |
| Engagement rate | 52.87% |
| GSC impressions | 12,432 |
| GSC clicks | 183 |
| GSC CTR | 1.47% |
| GSC avg position | 7.9 |

## 💰 Revenue trajectory (estimate)

> ⚠️ **Estimate**, not real earnings: ad revenue modeled as pageviews × €3/1k RPM. Real AdSense numbers need the AdSense Management API connected. Affiliate-click tracking not wired yet.

| Metric | Value |
| --- | --- |
| Est. pageviews / mo | ~2,970 |
| Est. ad revenue / mo | **~€8.91** |
| Progress to €1000/mo | 0.9% |
| Pageviews/mo needed for €1000 | ~333,333 (112× current) |

## 🔬 Improvement loops — are the KPIs moving?

| Loop | Now | Trend |
| --- | --- | --- |
| **L1 organic** (GSC, 534 tracked queries) | 27 clicks · 3342 impr · CTR 0.8% · avg pos 9.5 | clicks (−8) · impr (−83) · pos (+0.3) _(pos ↓ = better)_ |
| **L2 AI citations** (#2211) | **27/100** queries cite metalforge.io | _refreshed weekly_ |
| **L3 indexation** | sentinels (fixed top-250, trend-comparable): 239/250 indexed (+1) · rotating sample: 204/250 indexed · **full site: 2281 of 3162 sitemap URLs earned impressions (90d)** | 4 rejected-quality · 6 never-crawled |
| **L4 performance** (6 URLs, live site) | homepage 70 perf · TBT 1671ms · **worst: Cymbals hub — 48 perf, LCP 13.4s** · 4/6 URLs chronically slow (score < 60 or LCP > 4s) | homepage score (−5) · TBT (+508)ms · chronic (±0) _(TBT/chronic ↓ = better)_ |

> _L1/L3 are week-over-week and L4 is fortnight-over-fortnight, all from committed verifier snapshots; L2 is the weekly citation umbrella. Rising clicks / falling avg position / more indexed / higher perf score = the loops are working._

## 🔗 Backlink signal

**Referring domains (GA4 signal, 90d, clicked links only):** 14 (±0)
- Top sources: m.facebook.com (12) · noai.duckduckgo.com (3) · ca.search.yahoo.com (2) · cn.bing.com (2) · doubao.com (2)
_No manual GSC Links check logged yet — see `.agents/seo/backlinks-manual-log.json`._

> _The GA4 number counts domains that sent us a real click — it undercounts true backlinks (a link with zero clicks won't show) but is fully automated. GSC's actual Links report has no public API; the manual number above is the ground truth when logged._

## 📅 Event pipeline (next 67 days)

| Event | In | Page work |
| --- | --- | --- |
| Mikkey Dee — 63º aniversário | 15d | _awaiting scanner run_ |
| Chris Adler — 54º aniversário | 38d | _awaiting scanner run_ |
| Charlie Benante — 64º aniversário | 42d | _awaiting scanner run_ |

## 🤖 Agent / workflow runs (last 12h)

| Workflow | Total | ✅ | ❌ |
| --- | --- | --- | --- |
| PR Merger | 24 | 24 | 0 |
| Check Sitemap Drift | 14 | 0 | 14 |
| Verify YouTube Videos | 14 | 8 | 6 |
| Verify Data Modules | 13 | 7 | 6 |
| .github/workflows/check-vercel-rewrites.yml | 9 | 0 | 9 |
| Check llms freshness | 7 | 0 | 7 |
| Perf Budget Gate | 7 | 0 | 7 |
| Verify API Modules | 4 | 2 | 2 |
| Daily Digest | 1 | 0 | 0 |
| Roadie (Watcher + Implementer) | 1 | 1 | 0 |
| Loop Watchdog | 1 | 1 | 0 |
| SEO Agent | 1 | 1 | 0 |
| Prune Proposals | 1 | 1 | 0 |
| Health Check | 1 | 1 | 0 |
| CEO Agent | 1 | 1 | 0 |
| Deploy to Production (batched) | 1 | 1 | 0 |

## 🧠 Today's CEO decisions

- 2026-10-16 06:19 (cheap pulse — 7/8 proposals verified+promoted, #9153-9156/9158-9160; #9157 held)
- 2026-10-16 00:27 (cheap pulse — 7/7 proposals verified+promoted, #9142-9148)
- 2026-10-15 18:14 (mid-day pulse — 6/6 proposals verified+promoted, #9123-9128)
- 2026-10-15 12:17 (cheap pulse — 8/8 proposals verified+promoted, #9107-9114; +1 self-filed from verification spillover, 
- 2026-10-15 06:19 (cheap pulse — 5/5 proposals verified+promoted, #9099-9103)
- 2026-10-15 00:34 (evening-review catch-up for 10-14 — reverted a shipped data regression, #9097/#9098 filed)

## 📦 Shipped to main (14)

- #9181 fix: #9158 SEO: Charlie Benante wrongly called an Anthrax 'founding member' (verified: joined September 1983, band formed 1981)
- #9183 fix: #9160 SEO batch: Matt Greiner — extendedBios.js self-contradicts own 2003 founding claim with '2005-present'/'since 2005', + wrong birthdate (May 2) not fixed in 2 files despite closed #8536
- #9182 fix: #9159 SEO: Paul Mazurkiewicz / Cannibal Corpse album count wrong — 'seventeen'/'15+' studio albums, verified count is sixteen
- #9180 fix: #9156 SEO batch: Brann Dailor — Mastodon formation year wrong (1999→2000) + llms/evolution.md invents Mapex/Gretsch/Zildjian/Vic Firth/Remo/DW gear history (verified: Tama/Meinl/Vater/Evans)
- #9179 fix: #9155 SEO: Hellhammer llms/evolution.md invents Pearl/Zildjian gear history (verified: Sonor/Paiste/Vic Firth/Remo/Axis)
- #9178 fix: #9154 SEO batch: Mikkey Dee — llms/evolution.md invents Pearl/Zildjian/DW gear history (verified: Sonor/Paiste/Wincent/DW) + drummerEvolution.js King Diamond era wrong (1988→1985, missing Fatal Portrait/Abigail)
- #9177 fix: #9153 SEO: Joey Jordison llms/evolution.md final era fabricates SJC Custom Drums + Ahead sticks (verified: Pearl Reference + Promark signature)
- #9167 fix: #9147 SEO batch: Frost — birthplace fabrication + Zildjian K Custom Dark/K China leftovers (9 locations, 3 files) + 1349 founding-year misframing
- #9166 fix: #9148 SEO batch: Daniel Erlandsson — fabricated co-founder 'brother Michael Erlandsson', stale gear FAQ block (9 locations), fabricated Brujeria membership, wrong 2005 join-year framing
- #9165 fix: #9146 SEO batch: Ben Koller — birthdate fabrication + Converge join-year self-contradiction + 3 files not synced to #9046's Performer B/B correction
- #9164 fix: #9145 SEO batch: Jason Bittner — revert bad #9031/PR#9051 fix (2001 correct, not 1999) + T865 throne cross-contamination + Sledgehammer snare fabrication
- #9163 fix: #9144 SEO batch: Art Cruz — Ludwig Classic Maple fabrication (24 locations) + wrong Winds of Plague/Prong tenure years (3 files)
- #9162 fix: #9142 SEO: Chris Turner's birthdate fabricated as October 4, 1993 (verified February 4, 1992)
- #9161 fix: #9143 SEO: Hannes Grossmann's Alkaloid co-founding year self-contradicts in gearPriceHistory.js (2013 vs verified 2014)

## 🔴 Needs attention

- 🧑 Issue #5141 — 🧑 Backlink outreach for the 4 shipped /studies pages — the one lever agents can't pull _(open 1873h)_
- 🧑 Issue #5100 — 🧑 L2 recovery items #3/#4/#5 — need founder go (docs/seo-l2-l3-recovery.md) _(open 1969h)_
- 🧑 Issue #4892 — 🧑 Claude subscription capacity: backup token hit its WEEKLY limit (resets Jul 23) — pipeline has no failover until then _(open 2146h)_
- 🧑 Issue #875 — 🧑 GA4: Configure key events (affiliate-click, wishlist-save) — revenue intent is currently invisible _(open 3231h)_
- 🧑 Issue #529 — 🧑 Thomann Affiliate: Apply for program _(open 5661h)_

---

_Next refresh: 19:00 UTC_
_Source: `.agents/scripts/generate-digest.cjs` · History: `.agents/digest/history/`_
