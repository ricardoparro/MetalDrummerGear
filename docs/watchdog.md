# Loop Watchdog

A scheduled liveness check on the whole automation system. The loops grade
themselves, so when the pipeline silently breaks or stalls, nothing flags it —
the workflow "succeeds", the digest looks thin but not broken, and silence reads
as health. The watchdog puts an **external** check on top: it inspects the loops
from the GitHub API, and when something is wrong it **alerts via Telegram** (the
same channel the digest uses) plus a single auto-maintained umbrella issue.

## Why this exists

It was built after Roadie ran 51 minutes, opened **0 PRs**, and spammed one
issue **2000×**. Every individual signal looked "green": the run completed, no
workflow errored. The watchdog's drought check (below) catches exactly that
shape — output went to zero while the backlog was non-empty.

## What it checks

| # | Check | Alerts when |
| --- | --- | --- |
| 1 | **Critical-workflow failure** | the most recent run of any critical workflow has `conclusion` ∈ `{failure, cancelled, startup_failure, timed_out}`. Still-running runs are not judged. |
| 2 | **Roadie output drought** | `roadie/*` PRs opened in 24h = 0 **and** PRs merged in 24h = 0 **and** open `ai-fix` > 0. (The exact 0-PR stall.) |
| 3 | **Stale scheduled workflow** | a critical workflow's most recent run is older than **2× its expected interval + 1h buffer**. Lenient to avoid false alarms from a single skipped run. |
| 4 | **Verifier snapshot freshness** | `.agents/seo/indexation-snapshot.md` / `gsc-watch-snapshot.md` last commit is older than **8 days** (best-effort, via the commits API; skipped if not tracked). |

### Critical workflows + expected intervals

| Workflow | Expected interval (h) | Notes |
| --- | --- | --- |
| `roadie.yml` | 14 | Daytime-only; 14h covers the overnight gap so a quiet night never trips stale. |
| `roadie-night-fleet.yml` | 24 | |
| `pr-merger.yml` | 1 | ~15-min cron, generous threshold. |
| `ceo-agent.yml` | 3 | |
| `seo-agent.yml` | 3 | |
| `check-gsc-watched-queries.yml` (L1) | 168 | Weekly. |
| `check-llm-citations.yml` (L2) | 168 | Weekly. |
| `check-indexation.yml` (L3) | 168 | Weekly. |
| `check-structured-data.yml` | 168 | Weekly. |

The stale threshold is always `interval × 2 + 1h`, so e.g. PR Merger only alerts
after ~3h of silence, Roadie after ~29h, the weekly verifiers after ~15 days.

## Outputs

- **Telegram** — on any alert, one HTML message: `🚨 Loop Watchdog` + a bullet
  list of alerts + a link to the Actions tab. Reuses `postToTelegram` verbatim
  from `generate-digest.cjs` (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`; silently
  skips if the secrets are missing).
- **Umbrella issue** — a single durable record titled `🚨 Loop Watchdog …`,
  label `ops`, with a hidden marker. Upserted like the other loops: **open** when
  the first alert appears, **edit in place + comment** while alerts persist,
  **close** with an all-clear comment when everything passes again.
- **Weekly heartbeat** — when healthy, the watchdog is silent *except* on the
  heartbeat day (`WATCHDOG_HEARTBEAT_DAY`, default `Mon`), when it sends a
  `✅ all loops healthy` Telegram so that silence can't be mistaken for "the
  watchdog itself died".

## Behaviour guarantees

- **A detected problem is success.** The job never exits non-zero on an alert —
  only on the watchdog's own internal error. So a red watchdog run means the
  watchdog broke, not the pipeline.
- **Quiet by default.** No Telegram on a healthy non-heartbeat run.

## Pieces

| File | Role |
| --- | --- |
| `.agents/scripts/watchdog.cjs` | Pure Node. Collects state from the GitHub REST API, runs the pure alert evaluators, sends Telegram + upserts the umbrella issue. |
| `.github/workflows/watchdog.yml` | Cron `0 7,13,19 * * *` + `workflow_dispatch`. `permissions: contents: read, issues: write`. Runs `--self-test` as a gate, then the live check. |

## Flags

| Flag | Effect |
| --- | --- |
| `--self-test` | Runs the pure alert-evaluation functions against inline fixtures (failed-run → 1 alert, healthy set → 0, 0-PR + backlog → drought, stale workflow/snapshot). **No network.** Exit 1 on any mismatch. |
| `--dry-run` | Prints the Telegram message + issue body instead of sending/upserting. |

## Required secrets

All already configured — no new ones:

- `GITHUB_TOKEN` (auto in Actions) — read workflows/PRs/issues, write the issue.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — same secrets the digest uses.

## Local run

```bash
# Pure logic, no network — must pass before push.
node .agents/scripts/watchdog.cjs --self-test

# Live check against the API, printing instead of sending.
GITHUB_TOKEN=ghp_... REPO=ricardoparro/MetalDrummerGear \
  node .agents/scripts/watchdog.cjs --dry-run
```
