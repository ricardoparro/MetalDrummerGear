# MetalForge — repo orientation for Claude sessions

Metal drummer gear site (https://metalforge.io), grown autonomously through organic SEO
and LLM citations. React/Expo + Vercel serverless. Founder: Ricardo (@ricardoparro) —
solo, non-drummer, reads a daily Telegram digest; most communication is PT/EN mixed.

## Read these before changing anything strategic

- `docs/loops.md` — the full autonomous pipeline + every verifier loop, with links.
- `docs/seo-l2-l3-recovery.md` — 2026-07 L2/L3 analysis: findings, shipped fixes,
  OPEN items awaiting founder go, verification dates. Do not re-derive it.
- `.agents/seo/learned-patterns.md` — append-only record of verified SEO rules
  (meta-shell saga, tenure-verification lesson, CTR-noise thresholds…). Binding.
- `.agents/ceo/decisions-log.md` — CEO agent's recent decisions (hot 7 days).
- `docs/i18n-plan.md` — parked; unlock condition (L3 ≥50–60%) is now met, awaiting
  founder decision.

## The pipeline in one paragraph

SEO Agent files `seo-proposal` issues 3×/day → CEO Agent (hourly) triages/promotes to
`ai-fix` (backlog-capped ~80, starvation playbook below 15) → Roadie implements
(3-wide day `roadie.yml`, 8-wide night `roadie-night-fleet.yml`; drain logic in
`.roadie/drain.sh`) → PR Merger squash-merges CLEAN PRs ~15min → batched deploy.
Verifier loops close the loop: L1 GSC queries, L2 LLM citations (Perplexity),
L3 indexation (sentinels + rotation + earning-pages proxy), L4 performance.
Event Scanner (monthly) files anniversary content ahead of demand; X Agent posts
daily via API (needs `X_API_*` secrets); Watchdog pages when any loop goes stale.

## Binding accuracy rules (every content/data change)

1. **ONE data module per domain** — never a second file for the same data (duplicates
   drifted twice: #4279). Sitemap/llms/meta all derive by import.
2. **Verified-only, omit-if-unsure** — every fact needs a source; never guess. Drummer
   attribution must be verified against the **recording window** (#4160 Kairos lesson).
3. **No fabricated URLs/videos** — YouTube ids verified via oEmbed 200; `retailerUrls`
   stay empty until affiliates exist; internal links only to slugs that exist.
4. **URLs immutable once shipped.** Additive-refresh only on pages with L1 standing.
5. **Computed stats only** in /studies — numbers come from the stats engine, claims
   scoped to our dataset ("of the 67 drummers we cover").
6. **Thin-page gate** — no per-entity page without a content bar (see songs epic #4758
   phase 3); crawled-not-indexed at scale is the failure mode.
7. **vercel.json rewrites: N small per-family rules, never one consolidated regex**
   (meta-shell saga, 8 chapters — see learned-patterns).
8. **Sitemap: no `/llms/**.md`, `/vs/` only via `VS_DEMAND_DRUMMERS` gate, no
   combinatorial families without a demand gate.**

## CI / workflow gotchas

- `GITHUB_TOKEN` can NEVER push `.github/workflows/**` — Roadie checks out with
  `ROADIE_PAT` (repo secret, expires ~2027-07; on expiry workflow edits silently fail
  at push again). drain.sh gates workflow-touching diffs on trusted issue authors
  (repo is PUBLIC — this is a security control, do not weaken).
- Valid `permissions:` scopes do not include `workflows` — adding it breaks the file
  ("Invalid workflow file", happened 2026-07-13).
- Tracking epics are labeled `seo`+`keep` and marked "NOT directly implementable";
  phases carry `ai-fix`. Dependency-gated phases NEEDS_HUMAN themselves back.
- The GitHub MCP token cannot dispatch workflows (403); trigger loops by filing issues
  (Roadie) or waiting for cron.

## Current strategic state (2026-07-16)

- Traffic ~430 sessions/wk, GSC ~5.4K impr/wk, AdSense live (~€8/mo est). Goal:
  aggressive organic growth; revenue via ads+affiliates until traffic 10–20×.
- Active epics: bands drum-chair #4753, songs/BPM #4758, data studies #4763 (the
  backlink play), techniques upgrade #4767–68, drum-chair freshness #4769–70,
  video round-2 #4771.
- L2 open items #3/#4/#5 in `docs/seo-l2-l3-recovery.md` await founder go (#4 needs
  an OpenAI API key from Ricardo).
- Products/email: lead-magnet + email capture discussed, NOT approved yet; the chosen
  future product direction is structured practice programs.
