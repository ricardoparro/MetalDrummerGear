# MetalForge Roadmap

*Last updated: 2026-06-16 — Strategy realigned to organic+LLM compound*

## Vision
Become the #1 resource for metal drummer gear, driving traffic through **organic SEO compound growth + LLM citations**. Monetize via affiliate partnerships once organic reach hits the Thomann threshold organically.

## Primary KPI (2026-06)

**Indexed pages × organic CTR** — compound and defensible. Vanity DAU / followers / "Thomann unlock" thresholds explicitly retired as primary targets after months of external-gatekeeper blockage on Twitter/TikTok/affiliate-account asks.

### Sub-KPIs the CEO tracks every run

| KPI | Source | Current (2026-06-16) | Target (next 4 wk) |
|---|---|---|---|
| **Organic % of sessions** | GA4 | 79% (45/57) | hold ≥70% |
| **GSC weekly impressions** | GSC | 1,279 | 3,000 |
| **GSC weekly clicks** | GSC | 32 | 100 |
| **Avg GSC position** | GSC | 8.6 | <7 |
| **Content-gap queries (impr ≥50, CTR <2%)** | GSC | 0 | ≤5 (actionable) |
| **Indexed long-tail pages (sitemap)** | sitemap.xml | ~250 | 500 |
| **AI citations / week (Perplexity + ChatGPT)** | manual sample | _not yet tracked_ | start tracking |

### What's been retired

- ~~Daily Views: 500~~ (was Thomann affiliate threshold; CEO 2026-06-01 strategy shift)
- ~~Social Followers: 5,000~~ (was Twitter target; external API blocked)
- ~~Day 30/60/90 KPI tables~~ (calendar-based; compound SEO doesn't fit that cadence)

---

## Phase 1: Foundation ✅ COMPLETE

### Content
- [x] **62 drummers** with complete profiles (vs original 21 target — 3× delivered)
- [x] Video integration + daily broken-video verification (`verify-youtube.yml`)
- [x] Individual gear pages (`/gear/:slug`)
- [x] Verified gear data from official brand sources

### Tools
- [x] Gear Comparison Tool · Setup Cost Calculator · Search & Filters · Genre Tags · Deep linking

### SEO
- [x] Sitemap · robots.txt · meta tags · GA4 · GSC · FAQ + ItemList + BreadcrumbList schemas · sameAs entity links

---

## Phase 2: Organic Compound (Current — 2026-06)

**Goal:** Multiply indexable surface area on proven organic intent, with LLM citations as the moat.

### Active workstreams

| Workstream | Examples | Status |
|---|---|---|
| **Programmatic per-drummer pages** | `/drummer/<slug>/<category>` gear pages (#1125), licks (#1128/#1129/#1049/#1050) | In flight |
| **LLM markdown surface** | `/llms/<entity>.md` endpoints (#1126 techniques) | In flight |
| **Schema fill** | SearchAction · Organization · Person itemprops | Queued (#1062/#1064/#1069/#1072/#1075/#1078/#1083) |
| **Modularize for throughput** | `signatureLicks.js` 171KB monolith → per-drummer files (#1056) | In flight |
| **Internal-linking density** | Related drummers · drummers-using-this-gear blocks | Shipped (#1005-1007) |

### What's working (data-driven)

- **Joey Jordison dominates 5 of top 10 GSC queries** — compound authority. Joey-related pages are top 3 GA4 by views.
- **Long-tail "drummer-name + gear" queries rank 4-9** — exactly the intent the programmatic templates serve.
- **Matt Greiner page wins 21% CTR at position 6.4** — proof that single-drummer pages convert when ranked.

### What's NOT happening (intentionally retired)

- Newsletter signup, social sharing, viral quiz pushes — all require external accounts/services that have been blocked or are no-throughput.

---

## Phase 3: Scale (Q3 2026 — when Phase 2 plateaus)

Triggers to start Phase 3: organic sessions/week sustained >300, OR GSC impressions/week >5,000.

- [ ] 80+ drummers (selective additions based on GSC query gaps)
- [ ] Gear Timeline feature ("Lars: 1983 → 2024")
- [ ] Interview quotes database
- [ ] Direct affiliate apply once organic threshold met *(NOT before — confirmed external-gatekeeper waste)*
- [ ] Reassess social channels with a manual-posting tier *only* if organic stalls

---

## Agent Ecosystem (2026-06)

| Agent | Schedule | Role |
|---|---|---|
| **CEO Agent** | 14×/day (cron) | Strategic oversight, triage proposals, atomic-split, GSC-gap escalation |
| **SEO Agent** | 14×/day (cron) | Audit + file `seo-proposal` issues for CEO triage |
| **Watcher (local)** | manual | Drain `ai-fix` queue → open PRs (drain-the-queue loop) |
| **PR Merger (local)** | manual | Merge CLEAN PRs (drain-the-queue loop) |
| **verify-youtube** | daily + on PR | Pre-merge gate + umbrella issue for broken videos |
| **daily-digest** | 2×/day | Snapshot to Telegram + DIGEST.md |

---

## Strategic Priorities (in order)

1. **Compound organic via programmatic SEO + LLM markdown** — only path that doesn't depend on external gatekeepers
2. **Maintain pipeline throughput** — atomic issues, single-file PRs, drain-the-queue loops
3. **Track AI citations weekly** — sample Perplexity/ChatGPT for target queries (manual until Phase 3)
4. **Resolve human-founder blockers when raised** (#909 implementer setting, #1060 auto-merge, etc.) — these are the binding constraint, not idea supply

---

*Review weekly with the CEO Agent. Update primary KPI table from `metrics.md` not by hand.*
