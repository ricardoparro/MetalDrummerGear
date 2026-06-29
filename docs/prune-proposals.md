# Prune Proposals — bounding the idea bank

`prune-proposals.yml` + `.agents/scripts/prune-proposals.cjs`

## Why this exists

The `seo-proposal` label is the "idea bank": the SEO Agent files proposals, the
CEO promotes a few to `ai-fix` (capped at 45), and the rest wait. The original
design called that parking "free — they cost nothing parked." It wasn't free:
the SEO Agent ran **14× a day filing 5–7 proposals each** with an explicit
"do NOT self-throttle on backlog depth" rule, and nothing ever closed the
un-promoted ones. The open `seo-proposal` count grew past **300**, burying the
signal and making the issue list unusable.

A proposal is a bet against **this week's** GSC/GA4 metrics. Weeks later the
metrics it cited have rolled over, so re-deriving the idea against fresh data
beats reviving a stale one. The bank should be **small and fresh**, not deep.

## The two-sided fix

1. **Throttle at the source (prompt + cadence).** `seo-agent.yml` now runs 3×/day
   and `.agents/seo/PROMPT.md` is **bank-capped**: the SEO Agent counts the open
   `seo-proposal` bank and files nothing once it's ≥40 (audit-only is a healthy
   outcome, not a failure). The CEO (`.agents/ceo/PROMPT.md`) is told to promote
   from the *freshest* proposals and not fight the prune.

2. **Deterministic backstop (this loop).** Prompt instructions never held the
   firehose back before, so this loop enforces the bound regardless of agent
   behaviour. Daily at **06:30 UTC** it:
   - closes un-promoted proposals older than `PRUNE_STALE_DAYS` (default **21**);
   - then caps the survivors at `PRUNE_BANK_CAP` (default **60**), closing the
     **oldest** excess (newest reflect fresher metrics);
   - throttles to `PRUNE_MAX_CLOSE` (default **100**) closures per run, so a
     large initial backlog drains over a few days without tripping GitHub's
     secondary rate limit.

## What is never touched

Any proposal carrying a protected label is skipped regardless of age or cap:
`ai-fix`, `in-progress`, `pr-opened`, `hold`, `do-not-merge`, `wip`, `blocked`,
`human`, `needs-human`, `human-founder`, **`keep`**. Add `keep` to any proposal
you want to exempt permanently.

## Reversibility

Every auto-close gets an explanatory comment, a **`pruned`** label, and
`state_reason: not_planned`. Nothing is deleted — reopen any issue to revive it
(it then skips the next prune for `STALE_DAYS`). If an idea was genuinely good,
the SEO Agent will also re-file it against fresh metrics on its next under-cap
run, so the SEO Agent searches `--state all` before filing to avoid churn.

## Operating it

- **Manual run:** trigger the **Prune Proposals** workflow (`workflow_dispatch`).
  Tick **dry_run** to print what *would* close without closing anything.
- **Tuning:** the cap / stale-window / throttle are env vars in the workflow;
  keep `PRUNE_BANK_CAP` aligned with the SEO Agent's stop-at threshold in
  `PROMPT.md` (the agent stops at ~40, the prune trims at ~60 — the gap means the
  prune mostly does staleness cleanup and only enforces the cap if the agent
  over-files).
- **Self-test:** `node .agents/scripts/prune-proposals.cjs --self-test` exercises
  the pure selection logic (eligibility, stale pass, cap pass, throttle) with no
  network. The workflow runs it as a gate before any live prune.
- **Visibility:** when it closes anything it posts a one-line Telegram summary
  (same channel as the digest/watchdog) if the Telegram secrets are set.
