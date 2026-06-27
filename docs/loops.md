# Automation loops — system map

MetalForge runs itself through autonomous loops on GitHub Actions. This is the
canonical map of every loop: what triggers it, how often it runs, what it does,
and how the pieces feed each other. Individual loops have their own deep-dive
docs (linked below); this file is the index.

All cron is **UTC** (GitHub Actions has no timezone). Wall-clock comments in the
workflows are calibrated for **Lisbon summer (UTC+1)**; in winter (UTC+0) the
night-window crons shift by one hour — each affected file says how.

---

## The closed loop

```
        ┌─────────────────────────  verifier loops (L1/L2/L3)  ──────────────────────────┐
        │  measure real-world impact weekly, file actionable umbrella issues              │
        ▼                                                                                 │
  SEO Agent ──files──> seo-proposal ──CEO Agent promotes (cap 45)──> ai-fix              │
                                                                        │                 │
                                                                        ▼                 │
                                                      Roadie (day 1-wide / night 6-wide)  │
                                                                        │ opens roadie/* PR
                                                                        ▼                 │
                                                                   PR Merger ──merge──> main
                                                                        │                 │
                                                                        ▼                 │
                                                                   production ────────────┘
```

The verifier loops are what make this a *loop* and not an open-ended content
firehose: they put an external check (Google, an LLM, Google's index) on whether
shipped work actually moved a KPI, and that read steers the next cycle.

---

## A. Production pipeline — creates & ships content

| Loop | Workflow | Trigger / cadence (UTC) | Role |
| --- | --- | --- | --- |
| **SEO Agent** | `seo-agent.yml` | night hourly `0 23,0–6`, day 3-hourly `0 7,10,13,16,19,22` | Audits GSC + the data modules, files net-new **`seo-proposal`** issues (article gaps, comparisons, guides, lick pages…). Verifies against the DB to avoid false positives. |
| **CEO Agent** | `ceo-agent.yml` | same cadence as SEO Agent | Triages proposals, **promotes `seo-proposal` → `ai-fix`** but only up to a **backlog cap of 45** (so work never outruns the implementer), closes zombies/duplicates, logs decisions. |
| **Roadie** (day) | `roadie.yml` | `13 7-17/2` (08:00–18:00 Lisbon) + on `issue opened/reopened`; 1 worker, 2h cap | Drains the eligible issue queue, one branch + PR each (`roadie/issue-<n>`). Implements via `claude --print` against `.roadie/AGENT.md`. |
| **Roadie Night Fleet** | `roadie-night-fleet.yml` | `0 19,23,3` = three 4h shifts covering **20:00–08:00 Lisbon**; 6 workers | Same drain as Roadie but parallel: each matrix worker takes a different issue (via `ROADIE_WORKER_OFFSET` + the `in-progress` label + a pre-PR dup guard). |
| **PR Merger** | `pr-merger.yml` | `7,22,37,52 * * * *` (~15 min) + on `check_suite completed` | Squash-merges CLEAN/UNSTABLE PRs oldest-first; **reaps DIRTY `roadie/*` (and legacy `ralph/*`) branches** — closes them and clears the issue labels so Roadie re-implements from fresh `main`. |

Day worker and night fleet partition the clock cleanly: **08:00–20:00 Lisbon =
1-wide day, 20:00–08:00 = 6-wide night**, with no overlap (overlap would just
make them compete for the Claude subscription rate limit).

> **Throughput ceiling:** once merge conflicts were removed (see the
> `albumArticles` split, below), the binding constraint is the **Claude
> subscription tier**, not the worker count. If PR output stops scaling with
> width, lower `max-parallel` rather than chase it.

---

## B. Verifier loops — L1 / L2 / L3 (measure impact, weekly)

These three are the only loops that put an **external, objective verifier** in
the seat instead of the agent grading itself. Each runs Monday morning, diffs
against the prior week, and files a single auto-maintained umbrella issue the CEO
Agent reads on its next run.

| Loop | Workflow | Cadence (UTC) | Verifies | Deep dive |
| --- | --- | --- | --- | --- |
| **L1 — GSC Watch** | `check-gsc-watched-queries.yml` | Mon `0 8` | Google **organic** position/CTR for every query GSC surfaced in 7 days, diffed vs last week. KPI: indexed pages × organic CTR. | [`gsc-watch-loop.md`](gsc-watch-loop.md) |
| **L2 — LLM Citation Check** | `check-llm-citations.yml` | Mon `30 7` | Whether `metalforge.io` is **cited by an LLM** (Perplexity) for target queries — body + cited URLs, classified us / competitor / other. KPI: AI citations/week. Needs `PERPLEXITY_API_KEY`. | [`llm-citation-check.md`](llm-citation-check.md) |
| **L3 — Indexation Health** | `check-indexation.yml` | Mon `0 9` | How many sitemap URLs Google **actually indexes** (GSC URL Inspection API), splitting "crawled–not-indexed" (content-quality signal) from "discovered–not-indexed" (internal-linking signal); flags WoW regressions. | [`indexation-loop.md`](indexation-loop.md) |

> **On the "L" numbering:** `L1`/`L2`/`L3` denote *exactly these three verifier
> loops* — organic, AI-citation, and index coverage. They are **not** a ladder
> for the whole system; there is no `L4`+ in the codebase. The production and
> monitoring loops below are named by role, not numbered. (If we ever want a
> single numbered taxonomy for everything, that's a deliberate future decision —
> don't infer one from the L1–L3 names.)

---

## C. Monitoring & digests

| Loop | Workflow | Cadence (UTC) | Role |
| --- | --- | --- | --- |
| **Daily Digest** | `daily-digest.yml` | `0 8,19` | Twice-daily summary (shipped PRs, CEO decisions, needs-attention) → `DIGEST.md` + history. |
| **Health Check** | `health-check.yml` | `0 */3` | Every 3h liveness/health probe. |
| **Verify YouTube (scan)** | `verify-youtube.yml` | daily `0 7` | Full scan for dead YouTube IDs already on `main`; files the umbrella `broken-video` issue. (Its PR-time half is a gate — see D.) |
| **Check broken images** | `check-broken-images.yml` | Mon `30 6` | Weekly dead-image sweep. |

---

## D. CI gates — pre-merge, event-driven (not loops, but part of the system)

| Gate | Workflow | Fires on | Blocks merge if… |
| --- | --- | --- | --- |
| **YouTube pre-merge gate (strict)** | `verify-youtube.yml` | PR touching data/components/api | the PR adds a YouTube ID that fails oEmbed (changed IDs only). |
| **Verify Data Modules** | `verify-data-modules.yml` | PR/push touching `packages/frontend/data/**` | `ALBUM_ARTICLES` / `SOUND_LIKE_GUIDES` / `SIGNATURE_LICKS` don't `import()` as ES modules with a sane entry count. Catches the "stray `};` closes the object early" bug that `node --check` misses. |
| **Validate URLs** | `validate-urls.yml` | event-driven | broken internal URLs. |

---

## E. Deploy

| Loop | Workflow | Cadence (UTC) | Role |
| --- | --- | --- | --- |
| **Deploy to Production (batched)** | `deploy-prod.yml` | daily `0 6` + `workflow_dispatch` | Batches merged work into a production deploy (Vercel auto-deploy on `main` is disabled in `vercel.json`; this controls release timing). |

---

## Conventions shared across loops

- **Branch prefixes:** `roadie/*` = the implementer (auto-reaped if DIRTY);
  `ralph/*` = legacy, still reaped during transition; `claude/*` = ad-hoc
  human/assistant branches.
- **Labels:** `seo-proposal` (idea bank), `ai-fix` (queued for Roadie),
  `in-progress` / `pr-opened` (in flight), `hold` / `do-not-merge` / `wip` /
  `blocked` (skip), `human` / `needs-human` (off-limits to the bots).
- **Backlog cap:** the CEO holds the eligible `ai-fix` queue at **≤ 45** so the
  implementer is never swamped; proposals park as `seo-proposal` until it clears.
- **Data modules:** album articles live in **per-drummer files** under
  `packages/frontend/data/albumArticles/<drummer>.js`, composed by
  `index.js`; the old `albumArticles.js` is a thin barrel. **Add new articles as
  a new/existing per-drummer file — never append to the barrel.** The
  `verify-data-modules` gate enforces the export stays loadable.
- **Auth:** the agent workers use the Claude **subscription** token
  (`CLAUDE_CODE_OAUTH_TOKEN`), so the plan tier — not per-call API billing — is
  the rate ceiling.
