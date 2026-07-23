# CEO Decisions Log — MetalForge

*Record of strategic decisions and reasoning. Hot log: last 7 days. Older entries archived monthly under `.agents/ceo/decisions-history/`.*

*Auto-rotated by `.agents/scripts/rotate-decisions-log.cjs` — last run 2026-07-23 00:23 UTC*

---
## 2026-07-19 03:01 — Cheap pulse: starvation trigger met but root-caused to the known capacity outage (#4892), held rather than forced new surface

### Context (≤3 lines)
Metrics 03:01 UTC (424 users/441 sessions/654 views 7d; GSC 4,981 impr/97 clicks/1.95% CTR/pos 11.1 — content-gap row `danny carey drum set` 72 impr/1.39% CTR/pos 10.7, same recurring row already actioned in prior runs, no re-file). Eligible `ai-fix` backlog is critically thin at **2** (#4748 roster-expansion, #4756 bands phase 3/4, both ~66h old) and untriaged `seo-proposal` bank is **0** (only the 3 standing L1/L2/L3 umbrellas) — the starvation trigger (backlog<15 AND bank≤2) is met.

### Actions taken
- **Step 1 of the starvation playbook (check SEO Agent output rate) before doing its job for it:** `seo-agent.yml` failed 7 of its last 8 runs (12:16→00:24 UTC) with the identical signature already diagnosed in #4892 — primary `You've hit your session limit`, backup `You've hit your weekly limit · resets Jul 23`. The one run that got a window (22:15 UTC) **did** file 2 fresh, well-scoped proposals (#4893/#4894) — both promoted and merged within the hour (#4905/#4911). This confirms the Agent itself is healthy and not underperforming on a prompt/quota level; the backlog thinness is 100% the capacity outage already escalated in #4892, not an idea drought.
- Per the precedent set 2026-07-18 21:16 (same root cause, judged "no action needed beyond what #4892 already covers"), did **not** file a duplicate human-founder issue and did **not** force Queue-Starvation Playbook step 2 (new surface) — the anti-pattern warning is about manufacturing work when the well is dry; here the well (SEO Agent + 2 substantial queued epics) is fine, only the tap (Claude capacity) is throttled. Forcing a 3rd backlog item wouldn't get consumed any faster than #4748/#4756 while Roadie is capacity-gated too.
- Confirmed PR merger did recover overnight regardless (5 PRs merged 23:26-23:29 UTC via a primary-token reset window), consistent with the self-healing pattern #4892 predicted, just with the backup still dead until 07-23.
- Founder ideas: inbox empty. Atomic-split: #4748/#4756 at ~66h, still short of the 72h threshold (crosses ~08:50-09:06 UTC today) — not yet actionable, flagging for the imminent 07:00 deep run. Human-founder blockers #875/#529/#526/#525/#4892 — 0 new comments on any, no re-spam.

### State delta
- ai-fix backlog: unchanged at 2 (no promotions — nothing untriaged to promote)
- Org/Sessions/Views (7d): 424/441/654 · GSC 4,981/97/1.95%/11.1 (softer than 21:16 snapshot — 7-day window rollover, not investigated further)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: none untriaged. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ Starvation check: triggered, root-caused to the already-escalated capacity outage (not a fresh SEO-Agent or idea-supply problem), correctly held rather than manufacturing work. ✅ Atomic split: #4748/#4756 not yet past 72h, watching. ✅ Decisions logged.

### Next Run
1. **The 07:00 UTC deep run should re-check #4748/#4756 against the 72h atomic-split threshold** (crosses ~08:50-09:06 UTC) — split if still open/undispatched then.
2. **If backlog is still ≤2 AND Roadie has regained capacity (PRs merging normally) by the next run, treat that as genuine starvation and run playbook step 2 for real** — the capacity excuse only covers thinness caused by an idle Roadie, not thinness with a healthy fleet.
3. Backup token dead until 2026-07-23 10:00 UTC per #4892 — no further action needed from Ricardo, just watch for recurrence.
4. #875/#529/#526/#525/#4892 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

## 2026-07-18 21:16 — Cheap pulse: root-caused the 17h zero-merge gap — backup Claude subscription hit a WEEKLY limit, filed human-founder capacity alert (#4892)

### Context (≤3 lines)
Metrics 21:16 UTC (428 users/452 sessions/752 views 7d; GSC 5,941 impr/120 clicks/2.02% CTR/pos 11.0 — content-gap row `danny carey drum set` 81 impr/1.23% CTR/pos 10.7, same recurring row, already actioned in prior runs, no re-file). Backlog was 10 eligible `ai-fix` (healthy — 8 of the 10 self-filed by SEO Agent today), 0 untriaged `seo-proposal`, 0 open PRs. Last PR merged 2026-07-18T04:30 UTC — a 17h gap that doesn't match the healthy backlog, so investigated instead of logging a routine hold.

### Actions taken
- Pulled every `roadie.yml`/`roadie-night-fleet.yml` run since 04:30 UTC: all 3 lanes on every run since ~11:30 UTC show every issue "produced no commits (rc=1)" in 2-8s — the exact throttle signature `.roadie/drain.sh`'s own `looks_rate_limited`/`dt<30` check exists to detect. `ceo-agent.yml` (29659311402, 20:14 UTC) and `seo-agent.yml` runs show the literal cause: primary token `You've hit your session limit · resets 8:30pm (UTC)`, failed over, then backup: `You've hit your weekly limit · resets Jul 23, 10am (UTC)`. Both tokens dead since ~11:30 UTC.
- Checked `.agents/ceo/decisions-log.md` for precedent: 2026-07-16 22:20 logged the same session-limit signature on both tokens and correctly called it "no action needed, self-resolves in hours." This time is materially different — the backup is on a **weekly** cap (5 days, not hours), so once primary session-limits again (near-certain given 8-wide night fleet at 19:00/23:00/03:00 UTC), there's zero failover until 2026-07-23. That crosses from "self-healing noise" to a real capacity risk worth Ricardo knowing about.
- Filed **#4892** (`human-founder`) — not `ai-fix`-shaped (billing/capacity decision), gave 3 concrete options (accept the stalls / add a 3rd token / temporarily throttle the night fleet) and explicitly said no action is needed from him right now, just visibility.
- Did **not** treat backlog=10 as starvation — supply is fine (8 fresh SEO-filed batches today alone); the bottleneck is implementation capacity being offline, which starvation-playbook surface-generation would not fix and would waste cycles on.
- Founder ideas: inbox empty. Atomic-split: #4748/#4756 both ~60h old (created 07-16 08:50/09:06), approaching but not yet past the 72h threshold — will cross it around 07-19 08:50-09:06 UTC, flagging for the next couple of runs. Human-founder blockers (#875/#529/#526/#525) — 0 comments each, no re-spam. L1(#3810)/L2(#2211)/L3(#3819) unchanged since 07-13, next refresh 07-20.

### State delta
- ai-fix backlog: unchanged at 10 (no promotions needed — no untriaged proposals)
- New: `human-founder` issue #4892 (Claude subscription capacity)
- Org/Sessions/Views (7d): 428/452/752 · GSC: 5,941 impr / 120 clicks / 2.02% CTR / pos 11.0

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: none untriaged. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ Starvation check: backlog<15 trigger technically met but supply-side is healthy — root cause is the outage, correctly not actioned as starvation. ✅ Atomic split: none past threshold yet, watching #4748/#4756 approach it. ✅ Decisions logged.

### Next Run
1. **Watch #4748/#4756 cross the 72h atomic-split threshold ~07-19 08:50-09:06 UTC** — split if still open and un-dispatched then.
2. Watch whether Roadie/SEO/CEO runs recover post-20:30 UTC primary reset — none had run yet as of this entry (this CEO run itself succeeded, suggesting recovery is underway) — confirm on next Roadie/night-fleet firing (23:00 UTC).
3. If the pipeline stalls again before 2026-07-23 with no PR activity, do not re-file a duplicate human-founder issue — #4892 already covers it; just note the recurrence in the next log entry.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

## 2026-07-18 00:21 — Cheap pulse: queue-starvation playbook triggered, filed new Speakable hub-gap issue (backlog 2→3)

### Context (≤3 lines)
Metrics 00:21 UTC (404 users/426 sessions/703 views 7d; GSC 5,019 impr/102 clicks/2.03% CTR/pos 11.1 — content-gap row `danny carey drum set` unchanged, already actioned in prior runs, no re-file). Night fleet (8-wide, cron 19/23/03 UTC) drained the entire SpeakableSpecification sweep overnight — backlog collapsed 13→2 eligible `ai-fix` (#4748 roster-expansion, #4756 bands phase 3/4), 0 fresh untriaged `seo-proposal` (only 3 standing L1/L2/L3 umbrellas). Trigger met (backlog<15, bank≤2) with the next night-fleet run at 03:00 UTC ~2.5h away — acted now rather than waiting for the 07:00 deep run.

### Actions taken
- **Step 1 (rule out upstream cause):** checked `seo-agent.yml` run history — 3 consecutive failures 14:31/16:25/18:20 UTC were git-push races against the busy night fleet (`Updates were rejected... unmerged files`), not content/prompt failures; the 22:15 run succeeded and filed 7 fresh Speakable-batch proposals (#4843-4849), all promoted+shipped by 23:26 UTC. SEO Agent output healthy — ruled out.
- **Checked epic-phase cover:** songs (#4758) and studies (#4763) epics fully closed (all phases shipped); bands (#4753) has only phase 3/4 (#4756) left, already in backlog; brands-museum (#4386) and snares/pedals hubs (#4387/#4308) fully closed including their own Speakable pass. No queued phase cover remains — genuine step-2 territory.
- **Step 2 (new surface, winning-format replication):** delegated an Explore agent to grep `api/meta/[...path].js` for which route branches still lack `SpeakableSpecification` after the sweep. Found 14 top-level hub/utility branches missed (sweep issues targeted detail-page templates, not hub indexes): `/`, `/drummers`, `/articles`, `/lists`, `/history`, `/genres`, `/techniques`, `/spotlights`, `/facts`, `/tools/compare`, `/compare`, `/bpm`, `/bpm-tap`, `/guess-the-kit`, `/birthdays`. Sibling detail pages in the same families (`/articles/<slug>`, `/techniques/<slug>`, `/genre/<slug>`, `/drummer/<slug>`, `/bands/<slug>`) already have it — confirmed genuine, not a re-dig of an exhausted hole.
- Searched `gh issue list --search "Speakable hub"` / `"Speakable homepage"` — no duplicate. Filed **#4863** (14-route hub-gap batch, single-file fix in `api/meta/[...path].js`).
- Founder ideas: inbox empty. Human-founder blockers #875/#529/#526/#525 — checked comment counts directly (all 0), no re-spam.

### State delta
- ai-fix backlog: 2 → 3 eligible (#4863 filed)
- Org/Sessions/Views (7d): 404/426/703 · GSC 5,019/102/2.03%/11.1 (both softer vs 07-17 23:18 snapshot — 7-day window rollover, not investigated further this run)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: none untriaged to review. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ Starvation playbook: triggered and actioned (step 1 ruled out upstream, step 2 opened verified new surface, one issue per event). ✅ Atomic split: nothing open >3 days. ✅ Decisions logged.

### Next Run
1. Backlog at 3 — still critical ahead of the 03:00 UTC night-fleet run; if it drains to 0 before fresh supply lands, this is starvation event toward the 3-consecutive human-founder escalation threshold.
2. Watch #4863 ship — closes the Speakable sweep to 100% route coverage.
3. #4748 (roster expansion) and #4756 (bands phase 3/4) are the only other backlog items — watch both dispatch.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

## 2026-07-17 00:23 (state-confirm — anti-noise hold)
- Backlog: 13 ai-fix · 0 PRs open · proposals untriaged: 0 (only umbrella trackers #2211/#3810/#3819)
- Org / Sessions / Views (7d): 411 / 435 / 584 — dip vs 23:17 (436/463/627) is a 7-day-window rollover artifact (GSC lag), not a real drop
- Blockers unchanged: #875/#529/#526/#525 — no re-spam
- Actions: none — hold continues (0 fresh proposals, 0 founder ideas, 0 new closed issues since 23:18)
- Next check: next hourly pulse; 07:00 UTC deep run will re-verify the metrics dip against a fuller data window

---

---

---

---

---

---

---

## 2026-07-16 23:17 — Pulse: 1 fresh proposal promoted, backlog 12→13

### Context (≤3 lines)
Metrics 23:17 UTC (436 users/463 sessions/627 views 7d; GSC unchanged — 5,882 impr/115 clicks/1.96% CTR/pos 10.4, flat since 07:00). Backlog was 12 eligible `ai-fix`. Only #4793 was genuinely new/untriaged (#4789/#4790 already carry `ai-fix` from the 21:21 run, just still show the `seo-proposal` label too).

### Actions taken
- **Promoted #4793** (add `Dataset` schema to the 4 `/studies/<slug>` pages + hub — additive alongside existing `Article` schema, same shape already used on `/stats`/`/stats/gear-insights`) — grep-verified `Dataset` only appears at lines 773/814 (the `/stats` pages), studies branches at 3483/3546/3613/3694 use only `articleSchema`. Confirmed disjoint from #4766 (phase 3/3, OG/llms-mirror) and #4790 (FAQPage) — three distinct schema-gap fixes on the same content family, no overlap.
- Founder ideas: inbox empty. GSC content-gap rows unchanged from 07:00 reasoning, no re-file. L1/L2/L3 snapshots unchanged (next refresh 2026-07-20). Human-founder blockers #875/#529/#526/#525 — 0 comments, no re-spam.

### State delta
- ai-fix backlog: 12 → 13 eligible (#4793 promoted)
- Org/Sessions/Views (7d): 436/463/627 · GSC unchanged

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 1/1 fresh triaged and promoted, grep-verified. ✅ GSC-gap: no new rows. ✅ Atomic split: nothing open >3 days. ✅ Decisions logged.

### Next Run
1. Backlog at 13 — still below the 45 floor; keep promoting liberally as fresh proposals land.
2. Watch #4793 ship alongside #4789/#4790.
3. Next L1/L2/L3 snapshot refresh 2026-07-20.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-16 21:21 — Pulse: 2 fresh proposals promoted, backlog 10→12

### Context (≤3 lines)
Metrics 21:21 UTC (432 users/459 sessions/623 views 7d; GSC 5,882 impr/115 clicks/1.96% CTR/pos 10.4 — flat since 20:17). Backlog was 10 eligible `ai-fix` (down from 15, healthy overnight/day drain, not starvation). 2 fresh untriaged `seo-proposal` (#4789/#4790, both filed 20:25 UTC) — broke the 2-consecutive-hold streak (19:27, 20:17), so this is a Full entry per the anti-noise rule.

### Actions taken
- **Promoted #4790** (`/studies` hub + `/studies/<slug>` pages emit no `FAQPage` schema — the new epic #4763 phase-1 content family was built after #4731 established the FAQPage-on-hub pattern but never got it) — grep-verified `api/meta/[...path].js` lines ~3448-3550: `articleSchema`/`breadcrumbSchema` present, no `faqSchema` in either branch. Distinct scope from #4766 (phase 3/3, already `ai-fix`, covers OG/llms-mirror/internal-links only).
- **Promoted #4789** (jon-dette is the last of 67 roster profiles with no curated `sections.sources.items` — still silently hits the Wikipedia name-guess fallback #4779 was built to eliminate) — live-verified via node: `extendedBios['jon-dette'].sections.sources` returns `undefined`, confirming the gap. Low-risk data-only fix (add one sources block), closes the roster-wide sweep to 67/67.
- Searched `gh issue list --label ai-fix --search` on both titles/keywords — no duplicates.
- Founder ideas: inbox empty (unchanged since 06-19). GSC content-gap: `danny carey drum set`/`joey jordison drum set` rows unchanged, both already actioned in prior runs (danny-carey #4739/#4746 shipped; joey-jordison held per #4550 recovery-watch) — no re-file. L1(#3810)/L2(#2211)/L3(#3819) unchanged since 07-13/07-06/06-23, next refresh 2026-07-20 — nothing fresh. Atomic-split: all 12 backlog issues well under 3 days old. Human-founder blockers (#875/#529/#526/#525) — checked comment counts directly (all 0), no re-spam.

### State delta
- ai-fix backlog: 10 → 12 eligible (#4789/#4790 promoted)
- Org/Sessions/Views (7d): 432/459/623 · GSC unchanged — flat since 20:17

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, grep/live-verified. ✅ GSC-gap: no new rows, both prior rows already actioned. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Backlog at 12 — still below the 45 floor; keep promoting liberally as fresh proposals land.
2. Watch #4789/#4790 ship — #4790 closes the FAQPage-on-hub pattern for the studies family; #4789 closes the sameAs roster sweep to 67/67.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20).
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-16 20:17 (cheap pulse — anti-noise hold)
- Backlog: 11 ai-fix eligible (15→11, active drain not starvation) · 0 PRs open · proposals untriaged: 0 (only L1/L2/L3 umbrella trackers, unchanged since 07-13/06-23)
- Org / Sessions / Views (7d): 429 / 455 / 622 · GSC: 5,882 impr / 115 clicks / 1.96% CTR / pos 10.4 — flat since 19:27
- Night fleet confirmed active: 4 issues closed + PRs merged 19:50-20:17 UTC (#4770/#4768/#4779/#4764); backlog drop is healthy throughput, not idle-fleet starvation — remaining 11 are meaty multi-phase epics (bands/songs/studies/video-seo), none open >3 days
- Blockers unchanged: #875/#529/#526/#525 human-founder (0 comments) — no re-spam
- Actions: none — hold continues (0 fresh seo-proposals, 0 founder ideas, no new gsc-watch/llm-citations/indexation-watch issues)
- Next check: cheap pulse cadence; next deep run 2026-07-17 07:00 UTC

---

---

---

---

---

---

---

---

## 2026-07-16 19:27 (evening review — anti-noise hold)
- Backlog: 15 ai-fix eligible · 0 PRs open · proposals untriaged: 0 (only L1/L2/L3 umbrella trackers #2211/#3810/#3819, unchanged since 07-13/06-23)
- Org / Sessions / Views (7d): 429 / 455 / 622 · GSC: 5,882 impr / 115 clicks / 1.96% CTR / pos 10.4 — flat since 15:31
- Since 15:31: 1 issue shipped (net 16→15), 0 new proposals landed; bands/songs/studies/techniques epic phases (#4753/#4758/#4763 families) still draining in dependency order, 0 stuck >3d
- Blockers unchanged: #875/#529/#526/#525 human-founder (0 new comments) — no re-spam
- Actions: none — hold continues (0 fresh seo-proposals, 0 founder ideas, GSC content-gap rows `danny carey drum set`/`joey jordison drum set` already actioned this morning, L1/L2/L3 next refresh 2026-07-20)
- Next check: cheap pulse cadence; next deep run 2026-07-17 07:00 UTC

---

---

---

---

---

---

---

---

## 2026-07-16 15:31 — Pulse: 1 fresh proposal promoted (E-E-A-T fix), backlog 15→16

### Context (≤3 lines)
Metrics 15:31 UTC (427 users/453 sessions/614 views 7d; GSC 5,882 impr/115 clicks/1.96% CTR/pos 10.4 — flat vs 14:39). Backlog was 15 eligible `ai-fix`, 0 open PRs. 1 fresh untriaged `seo-proposal` (#4779, filed 14:48 UTC).

### Actions taken
- **Promoted #4779** (`Person.sameAs` on `/drummer/<slug>` guesses Wikipedia URLs from display name instead of using the hand-curated correct URL already sitting in `extendedBios.js`'s `sources.items` — wrong/dead entity links on 7+ of 67 pages, e.g. Frost/Inferno/Hellhammer resolve to disambiguation or wrong-entity pages) — grep-verified `sameAs` guess pattern at `api/meta/[...path].js:4210` matches the issue's cited line. Well-scoped, atomic, sourced from already-authored data (same "authored data never wired into JSON-LD" class as #4635/#4779-adjacent fixes).
- Founder ideas: inbox empty. GSC content-gap: `danny carey drum set` and `joey jordison drum set` rows unchanged from 07:40/08:46 — both already actioned (danny-carey via #4739/#4746 shipped; joey-jordison deliberately held per #4550 recovery-watch), no re-file. L1(#3810)/L2(#2211)/L3(#3819) snapshots unchanged since 07-13, next refresh 2026-07-20. Atomic-split: all 16 backlog issues <7h old (13 are Ricardo's own epic-phase issues from 09:06-09:21, already atomic), nothing open >3 days. Human-founder blockers (#875/#529/#526/#525) unchanged, no re-spam.

### State delta
- ai-fix backlog: 15 → 16 eligible (#4779 promoted)
- Org/Sessions/Views (7d): 427/453/614 · GSC unchanged — flat since 14:39

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 1/1 fresh triaged and promoted, grep-verified. ✅ GSC-gap: no new rows, both prior rows already actioned. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Backlog at 16 — still well below the 45 floor; keep promoting liberally as fresh proposals land.
2. Watch #4779 ship, then spot-check `/drummer/lars-ulrich` for no regression (unaffected profiles should keep the guessed URL since it's already correct there).
3. Watch bands/songs/studies epic phases (#4753/#4758/#4763 families) ship in dependency order — Roadie has a deep, varied queue now.
4. L1/L2/L3 next refresh 2026-07-20 — nothing fresh until then. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-16 14:39 (mid-day pulse — anti-noise hold)
- Backlog: 15 ai-fix eligible · 0 PRs open · seo-proposal untriaged: 0 (only L1/L2/L3 umbrella trackers)
- Org/Sessions/Views (7d): 427/453/614 · GSC 5,882 impr/115 clicks/1.96% CTR/pos 10.4 — flat vs 08:46
- Blockers unchanged: #875/#529/#526/#525 · no re-spam
- Actions: none — Ricardo filed 13 epic-phase issues directly (#4753/#4755-4757 bands, #4758-4762 songs, #4763-4766 studies, #4768-4771) 09:06-09:21 UTC, already atomic + `ai-fix` labeled by him; Roadie shipped 11 issues since 07:00, 0 stuck >3d
- Next check: mid-day cadence; watch bands/songs/studies epic phases ship in dependency order

---

---

---

---

---

---

---

---

## 2026-07-16 08:46 — Pulse: Queue-Starvation Playbook triggered, filed 1 roster-expansion issue (backlog 0→1)

### Context (≤3 lines)
Metrics 08:44 UTC (422 users/446 sessions/599 views 7d; GSC 5,882 impr/115 clicks/1.96% CTR/pos 10.4 — same 2 content-gap rows as 07:40 run, both already actioned today: danny-carey shipped via #4739/PR#4746, joey-jordison deliberately held per #4550 recovery-watch). Backlog had drained 6→0 and proposal bank 0 (only L1/L2/L3 umbrella trackers open) since the 07:40 deep run — Roadie night-fleet cleared #4738/#4739 same morning. Pulled the just-merged PR #4747 (a prior session's CEO-agent prompt refresh) via `git pull` before proceeding since it changed the operating rules read this run.

### Actions taken
- **Confirmed Queue-Starvation Playbook trigger** (backlog<15 AND bank≤2, added to PROMPT.md 2026-07-14): checked SEO Agent output rate first (step 1) — healthy, 13+ proposals filed 2026-07-14→07-16 all same-day triaged/shipped, not underperforming — so skipped to step 2 (open new surface from proven patterns), not a prompt-tuning fix.
- **Filed #4748** — roster expansion, 5 verifiable notable metal drummers absent from the current 67-name roster (Jimmy DeGrasso/Megadeth, Nick Barker/Dimmu Borgir+Cradle of Filth, Waltteri Väyrynen/Paradise Lost, Alex Rüdinger/The Faceless, John Longstreth/Origin — ties into the already-live `/lists/fastest-metal-drummers` page). Checked all 4 theme-hub epics (#4308 snares/#4387 pedals/#4386 brands) are already closed/shipped, so hub-replication wasn't available as the "next vertical" isn't yet decided — roster expansion was the safer, precedented lever with no fabricated-data risk (issue mandates sourced gear or explicit unverified-marking, matching the existing `sources`+`verified:true` schema convention).
- Searched `gh issue list --search "roster expansion"`/`"missing drummer"` — no duplicate; all hits were enrichment of already-listed drummers, not net-new additions.
- Founder ideas: inbox empty. GSC content-gap: no new rows, both already actioned this morning. L1(#3810)/L2(#2211)/L3(#3819) unchanged since 07-13, next refresh 2026-07-20. Atomic-split: nothing open >3 days (backlog was 0). Human-founder blockers (#875/#529/#526/#525) unchanged, no re-spam.

### State delta
- ai-fix backlog: 0 → 1 eligible (#4748 filed)
- Org/Sessions/Views (7d): 422/446/599 · GSC: 5,882 impr/115 clicks/1.96% CTR/pos 10.4 (flat vs 07:40)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: none untriaged. ✅ GSC-gap: no new rows, both prior rows already actioned. ✅ Starvation check: triggered and handled (step 2, roster expansion). ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Watch #4748 ship — verify each of the 5 new drummers gets real (not fabricated) gear data or explicit unverified-marking, plus all 4 discovery surfaces (sitemap/llms-mirror/hub/list-page).
2. Backlog at 1 — still starvation territory; if next pulse also finds bank≤2, this is starvation event #2 (not yet 3 consecutive — no human-founder escalation warranted yet).
3. L1/L2/L3 next refresh 2026-07-20 — nothing to triage until then.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-16 07:40 — Deep run: promoted 1 critical regression + filed 1 novel GSC-CTR fix, backlog 4→6

### Context (≤3 lines)
Metrics 07:40 UTC (421 users/445 sessions/595 views 7d; GSC 5,882 impr/115 clicks/1.96% CTR/pos 10.4 — 2 content-gap rows: danny carey drum set 71impr/1.41%CTR/pos11.3, joey jordison drum set 51impr/1.96%CTR/pos10.7). Backlog was 4 eligible `ai-fix`, 0 open PRs. 5 seo-proposals existed but 4 (#4730/4731/4736/4737) were already promoted in a prior pass; only #4738 remained untriaged.

### Actions taken
- **Promoted #4738** (CRITICAL) — #4665/PR#4667's "Speakable schema on all 67 drummer pages" landed on a dead orphaned bare-slug route handler (`/lars-ulrich`, not in sitemap) instead of the canonical `/drummer/:slug` handler — live-verified 0/67 canonical pages actually got the schema despite the merged PR's claim. Well-verified with line-numbered root cause and curl proof.
- **Filed #4739** (new, not from L1/L2/L3 batch) — danny-carey title/meta/FAQ CTR fix for the 71-impr content-gap query, following the exact proven #3059 (Joey Jordison) template. Verified live: title has "Drum Kit" but no "drum set" phrasing, meta description is generic bio with no gear hook, FAQ lacks the exact-match question. Checked for duplicates first — no open or closed issue specifically optimizes danny-carey's title/meta for this cluster (prior Danny Carey work was Kit Overview prose #3140 and FAQ-depth #4593/#4607, a different lever).
- **Did NOT file for joey jordison drum set (51 impr/1.96% CTR)** — already exhaustively worked: title/meta CTR fix (#3059) shipped 2026-06-29, Kit Overview prose shipped, cannibalization theory investigated and ruled out 2026-07-13 (#4550, closed — 2 new JJ articles not yet indexed per that day's L3 snapshot, can't be cannibalizing). Per `learned-patterns.md` rule, watching for recovery at the next L1 snapshot (2026-07-20); filing another issue now would duplicate #4550's already-closed investigation with no new lever to pull.
- Founder ideas: inbox empty. L1(#3810)/L2(#2211)/L3(#3819) snapshots still dated 07-06/06-23, next refresh 2026-07-20 — nothing fresh to triage. Atomic-split: all 6 ai-fix issues filed today, nothing open >3 days. Human-founder blockers (#875/#529/#526/#525) unchanged, no re-spam.

### State delta
- ai-fix backlog: 4 → 6 eligible (#4738 promoted, #4739 filed fresh)
- Org/Sessions/Views (7d): 421/445/595 · GSC: 5,882 impr/115 clicks/1.96% CTR/pos 10.4

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 1/1 fresh (#4738) triaged and promoted. ✅ GSC-gap: 1 novel issue filed (#4739), 1 deliberately skipped as duplicate-in-substance. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Backlog at 6 — still far below the 45 floor; keep promoting/filing liberally as fresh proposals land.
2. Watch #4738 ship and re-curl `/drummer/lars-ulrich` for `SpeakableSpecification` before trusting "done" — this exact bug class (fix landed on wrong handler) is why #4738 exists in the first place.
3. L1/L2/L3 next refresh 2026-07-20 — that snapshot should also confirm/deny the joey-jordison recovery theory from #4550.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-16 01:32 — Backlog refill: 3 fresh proposals promoted incl. 1 CRITICAL homepage regression, backlog 0→3

### Context (≤3 lines)
Metrics 01:32 UTC (405 users/429 sessions/582 views 7d; GSC 4,748 impr/98 clicks/2.06% CTR/pos 9.5 — no content-gap rows, all queries with traction have decent CTR). Backlog was 0 eligible `ai-fix`, 0 open PRs. 3 fresh untriaged `seo-proposal` (#4727-4729, filed 00:30-00:31 UTC).

### Actions taken
- **Promoted #4727 (CRITICAL)** — homepage (`/`, the site's #1 traffic page at 113 views/77 users 7d) lost all bot-facing JSON-LD (Organization/WebSite/SearchAction) on 2026-07-11 when #4368's bot-UA rewrite started routing crawlers to `api/meta/[...path].js` instead of the static `dist/index.html` that carries the schema. Grep-verified independently: the homepage branch at line 553 of that file has no `articleSchema` field (every other route family does), and the `vercel.json:535` bot-UA rewrite for `/` is confirmed live. Real regression, not a net-new gap — top priority ship.
- **Promoted #4728** — 16 of 35 `/bands` pages (added by #4704) have no `/llms/<slug>.md` mirror and the `bands.md` hub still says "19 bands." Verified: `ls public/llms/bands/ | wc -l` → 19 (not 35), hub header unchanged. Same hub-mirror-lag pattern as ~7 prior shipped fixes.
- **Promoted #4729** — sitewide `og:locale` tag missing (`grep -c "og:locale" api/meta/[...path].js` → 0, confirmed insertion point next to `og:site_name` at line 5131). Low-impact but zero-risk one-liner.
- Founder ideas: inbox empty. GSC content-gap: none this run (resolved from prior runs' flagged rows). L1(#3810)/L2(#2211)/L3(#3819) unchanged since 07-13, next refresh 2026-07-20. Atomic-split: all 3 promoted issues brand new, nothing open >3 days. Human-founder blockers (#875/#529/#526/#525) — 0 new comments, no re-spam.

### State delta
- ai-fix backlog: 0 → 3 eligible (#4727-4729 promoted)
- Org/Sessions/Views (7d): 405/429/582 · GSC: 4,748 impr/98 clicks/2.06% CTR/pos 9.5

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 3/3 fresh triaged and promoted, grep-verified. ✅ GSC-gap: none present. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Watch #4727 ship first — it's a live regression on the highest-traffic page, verify with bot-UA curl (`curl -A ClaudeBot https://metalforge.io/ | grep '"@type":"WebSite"'`) before trusting "done."
2. Backlog at 3 — still far below the 45 floor; keep promoting liberally as fresh proposals land.
3. L1/L2/L3 next refresh 2026-07-20 — nothing to triage until then.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-16 07:00 — Deep run: 4 fresh proposals promoted, backlog 2→4 (fleet drained #4698-4708 overnight)

### Context (≤3 lines)
Metrics 06:46 UTC (417 users/441 sessions/593 views 7d; GSC 5,882 impr/115 clicks/1.96% CTR/pos 10.4). Backlog was 2 eligible `ai-fix` at run start (fleet cleared #4698-4708 overnight — all 11 shipped/closed, including #4728/#4729/#4727 same-vein follow-ons). 4 fresh untriaged `seo-proposal` (#4730/#4731/#4736/#4737, filed 03:06-05:07 UTC).

### Actions taken
- **Promoted #4730** (ssrLinks missing on `/quotes`, `/news`, `/gear` hubs) — grep-verified all 3 branches in `api/meta/[...path].js` lack `ssrLinks`, matches the established hub-link-gap class (#4355/#4650/#4656/#4689).
- **Promoted #4731** (FAQPage schema missing on `/quotes`, `/news`, `/spotlights`, `/beginner-guide` hubs) — verified same 4 branches emit no `FAQPage`; `/beginner-guide` also confirmed live (wired in sitemap + components, not dead code).
- **Promoted #4736** (ssrLinks missing on 4 gear-brand hub pages — 31 brand-detail pages one-directionally linked) — verified detail→hub link exists, hub→detail does not, across `/drumsticks/brands`, `/cymbals/brands`, `/snares/brands`, `/pedals/brands`.
- **Promoted #4737** (25 of 31 `/llms/<vertical>/brands/<slug>.md` files orphaned from vertical hub `.md`) — verified counts per vertical (drumsticks 10/0, cymbals 4/0, snares 6/0, pedals 11/6) — distinct surface from #4736 (static `.md` mirrors vs. live bot-HTML shell).
- Searched `gh issue list --label ai-fix --search` on all 4 titles/keywords — no duplicates (self-matches only).
- Founder ideas: inbox empty. GSC content-gap: `danny carey drum set` (71 impr, 1.41% CTR, pos 11.3) and `joey jordison drum set` (51 impr, 1.96% CTR, pos 10.7) — checked L1's own `ctr-gap-opportunity` classification (position 3-10 band) and neither qualifies (danny-carey pos 11.3, joey-jordison pos 10.7, both just past the window); joey-jordison is the known query-variant-redistribution/recrawl-pending case from `learned-patterns.md:111/119` (fix #4559 already shipped, watching recrawl). Danny Carey already has heavy content investment (Kit Overview prose #3140, FAQ depth, comparisons, discography arc) — low CTR at pos 11.3 is a position problem, not a snippet-fixable gap. No re-file for either. L1(#3810)/L2(#2211)/L3(#3819) snapshots unchanged since 07-13/07-06/06-23, next refresh 2026-07-20 — nothing fresh. Atomic-split: all 4 backlog issues <2h old, nothing open >3 days. Human-founder blockers (#875/#529/#526/#525) — checked comment counts directly (all 0), no re-spam.

### State delta
- ai-fix backlog: 2 → 4 eligible (#4730/#4731/#4736/#4737 promoted; prior batch #4698-4708 all shipped/closed overnight)
- Org/Sessions/Views (7d): 417/441/593 · GSC: 5,882 impr / 115 clicks / 1.96% CTR / pos 10.4 (impressions up from 5,729, CTR down slightly — position 10.4 vs 9.3 prior week, watch next L1 snapshot 07-20 for whether this is noise)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 4/4 fresh triaged and promoted, grep-verified. ✅ GSC-gap: both rows checked against L1's precise position-band rule, neither qualifies as snippet-fixable — no re-file, reasoning logged. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Backlog at 4 — still well below the 45 floor; keep promoting liberally as fresh proposals land.
2. Watch #4730/#4731 (hub ssrLinks+FAQ) and #4736/#4737 (brand-hub link graph, live HTML + `.md` mirror) ship.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20) — pos 10.4 vs 9.3 avg-position drift worth checking then.
4. #875/#529/#526/#525 human-founder blockers unchanged (0 comments) — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-16 22:20 — Pulse: 2 fresh proposals promoted (studies FAQPage gap, jon-dette sameAs)

### Context (≤3 lines)
Metrics 22:20 UTC (436 users/463 sessions/626 views 7d; GSC 5,882 impr/115 clicks/1.96% CTR/pos 10.4 — unchanged since 07:00 deep run). Backlog was 10 eligible `ai-fix` at run start. 2 fresh untriaged `seo-proposal` (#4789/#4790, filed 20:25-20:26 UTC).

### Actions taken
- **Promoted #4790** (`/studies` hub + `/studies/<slug>` pages emit no FAQPage schema — the one content-family hub not covered by the established FAQPage-on-hub pattern from #4731) — code-verified `api/meta/[...path].js` ~3443-3541 emits `articleSchema`+`breadcrumbSchema` but no `faqSchema`, matching the class fixed on `/quotes`/`/news`/`/spotlights`/`/beginner-guide`.
- **Promoted #4789** (jon-dette is the last roster profile with no curated `sections.sources.items` — `Person.sameAs` still falls back to name-guessing) — verified via the cited node script that 66/67 profiles now have curated sources post-#4779, jon-dette is the sole remaining gap.
- Searched `gh issue list --label ai-fix --search` on both titles/keywords — no duplicates (self-matches + known shipped predecessors #4779/#4214 only).
- Investigated the run-failure streak noted in GH Actions history (7 of last 15 `ceo-agent.yml` runs failed 09:38-19:26 today) — root cause is Claude subscription session-limit exhaustion ("hit session limit... backup subscription also limited"), not a code/workflow bug. Last 3 runs (19:26, 20:17, 21:20) succeeded — self-resolved as sessions reset. No action needed; not an `ai-fix`-shaped problem.
- Founder ideas: inbox empty. GSC content-gap: `danny carey drum set` (71 impr, 1.41% CTR, pos 11.3) and `joey jordison drum set` (51 impr, 1.96% CTR, pos 10.7) — unchanged from 07:00 run, same reasoning stands (position problem / recrawl-pending, not snippet-fixable), no re-file. L1(#3810)/L2(#2211)/L3(#3819) snapshots unchanged since 07-13/07-06/06-23, next refresh 2026-07-20. Atomic-split: all backlog issues <1 day old, nothing open >3 days. Human-founder blockers (#875/#529/#526/#525) — 0 new comments, no re-spam.

### State delta
- ai-fix backlog: 10 → 12 eligible (#4789/#4790 promoted)
- Org/Sessions/Views (7d): 436/463/626 · GSC unchanged — 5,882 impr / 115 clicks / 1.96% CTR / pos 10.4

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified. ✅ GSC-gap: both rows re-checked, no re-file, reasoning unchanged. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Backlog at 12 — still below the 45 floor; keep promoting liberally as fresh proposals land.
2. Watch #4789/#4790 ship.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20).
4. #875/#529/#526/#525 human-founder blockers unchanged (0 comments) — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-17 01:33 — Pulse: 2 fresh proposals promoted (ssrDrummerLinks batch, /articles hub isArticle links)

### Context (≤3 lines)
Metrics 01:33 UTC (411 users/435 sessions/585 views 7d; GSC 4,946 impr/88 clicks/1.78% CTR/pos 10.7 — content-gap row `danny carey drum set` 57 impr/1.75% CTR/pos 11.3 unchanged from 07-16 runs). Backlog was 13 eligible `ai-fix` at run start. 2 fresh untriaged `seo-proposal` (#4794/#4795, filed 00:32-00:33 UTC).

### Actions taken
- **Promoted #4794** (`ssrDrummerLinks` missing on `gearSeriesDrummersMatch` + `brandLevelDrummersMatch` blocks in `api/meta/[...path].js`, ~38 pages) — grep-cited, sibling gap to already-shipped #4673 (only covered `kitDrummersMatch`), non-overlapping block ranges verified in issue body.
- **Promoted #4795** (`/articles` hub `ssrLinks` omits the 12 `TOP_10_LISTS` `isArticle:true` pages) — grep-cited, reverse direction of already-shipped #4752 (which fixed links *from* those 12 pages *to* drummers, not hub *to* pages).
- Searched `gh issue list --label ai-fix --search` on both titles/keywords — no duplicates.
- Founder ideas: inbox empty. GSC content-gap: `danny carey drum set` unchanged (pos 11.3, same as 07-16 07:00/22:20 runs) — position problem not snippet-fixable, reasoning stands, no re-file. L1(#3810)/L2(#2211)/L3(#3819) snapshots unchanged since 07-13/06-23/07-06, next refresh 2026-07-20 — nothing fresh. Atomic-split: checked all open `ai-fix` for >3-day age with no in-progress/pr-opened/hold label — none found. Human-founder blockers (#875/#529/#526/#525) — unchanged, no re-spam.

### State delta
- ai-fix backlog: 13 → 15 eligible (#4794/#4795 promoted)
- Org/Sessions/Views (7d): 411/435/585 · GSC: 4,946 impr / 88 clicks / 1.78% CTR / pos 10.7 (slightly down from 5,882/115/1.96%/10.4 prior week — within normal noise band, watch next L1 snapshot 07-20)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, grep-verified. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Backlog at 15 — still below the 45 floor; keep promoting liberally as fresh proposals land.
2. Watch #4794/#4795 ship.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20) — GSC dip (CTR 1.96%→1.78%, impr 5,882→4,946) worth confirming isn't a trend then.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

## 2026-07-17 05:01 — Pulse: 4 fresh proposals promoted (schema completeness batch)

### Context (≤3 lines)
Metrics 05:01 UTC (414 users/438 sessions/585 views 7d; GSC 4,946 impr/88 clicks/1.78% CTR/pos 10.7 — unchanged from 01:33 run). Backlog dropped 15→7 eligible since last pulse — night-fleet Roadie cleared a large batch (bands epic phases 1-4, studies epic phases 1-3, techniques wiring, songs phase 1, drum-chair timeline, jon-dette/ssrDrummerLinks/articles-hub proposals from 01:33). 0 open PRs — Merger fully drained. 4 fresh untriaged `seo-proposal` (#4796-4799, filed 03:07-03:08 UTC).

### Actions taken
- **Promoted #4796** (MusicGroup schema missing `foundingDate`+`description` on 35 `/bands/<slug>` pages — both fields already populated in `bands.js`, 2-line fix, explicitly scopes OUT `dissolutionDate` to avoid fabricated data).
- **Promoted #4797** (VideoObject missing `duration` on 30 lick pages — computable from existing `startTime`/`endTime`; correctly cross-references #4771 in-flight to avoid duplicate calculation logic).
- **Promoted #4798** (`/technique/<slug>` VideoObject missing `uploadDate`, the exact field this codebase's own comment calls "REQUIRED by Google" — same fix already applied on sibling lick-page blocks, just 2 pages).
- **Promoted #4799** (`isAccessibleForFree: true` added to the shared `generateArticleSchema()` — single-line, sitewide, correctly scoped to exclude the pre-serialized JSON-LD branch).
- Searched `ai-fix` for `foundingDate|isAccessibleForFree|uploadDate|duration` — no duplicates (only #4771, already correctly cross-referenced by #4797 itself).
- Founder ideas: inbox empty. GSC content-gap: `danny carey drum set` unchanged (pos 11.3) — no re-file, reasoning stands. L1(#3810 07-13)/L2(#2211 07-13)/L3(#3819 07-13) snapshots unchanged, next refresh 2026-07-20. Atomic-split: no `ai-fix` open >3 days. Human-founder blockers (#875/#529/#526/#525) unchanged — no re-spam.

### State delta
- ai-fix backlog: 7 → 11 eligible (#4796/#4797/#4798/#4799 promoted); seo-proposal bank: 7 → 3 (only the 3 standing L1/L2/L3 umbrella issues remain, not real proposals)
- Org/Sessions/Views (7d): 414/438/585 · GSC: 4,946 impr / 88 clicks / 1.78% CTR / pos 10.7 (unchanged)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 4/4 fresh triaged and promoted, verified. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Backlog at 11 — still below 45 floor; promote liberally as fresh proposals land.
2. Watch #4796-4799 ship; confirm Roadie throughput stays healthy after last night's large clear.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20).
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

## 2026-07-17 06:46 — Pulse: 2 fresh proposals promoted (hub BreadcrumbList + FAQPage batch), backlog low — flagging for deep run

### Context (≤3 lines)
Metrics 06:44 UTC (414 users/438 sessions/586 views 7d; GSC 5,953 impr/115 clicks/1.93% CTR/pos 10.7; content-gap row `danny carey drum set` 69 impr/1.45% CTR/pos 11.0 — same recurring row, position problem not snippet-fixable, no re-file). Backlog was 6 eligible `ai-fix` at run start. 2 fresh untriaged `seo-proposal` (#4809/#4810, filed 05:10 UTC).

### Actions taken
- **Promoted #4809** (BreadcrumbList schema missing on 5 top-level hubs: `/history`, `/battles`, `/spotlights`, `/lists`, `/facts`) — line numbers in the issue were stale (studies epic shipped since filing, shifting the file), so I re-grepped current `api/meta/[...path].js` and confirmed all 5 handlers (now at lines 4031/4413/4460/4557/4706) still lack `breadcrumbSchema` in their own return block; `/battles` hub itself confirmed clean of it (the one hit in a wider grep belongs to the sibling `/battles/<slug>` detail handler, exactly as the issue describes).
- **Promoted #4810** (FAQPage schema missing on `/lists` + `/facts` hubs) — same re-verification; both blocks confirmed `articleSchema` (CollectionPage) present, no `faqSchema` key.
- Searched `ai-fix`/`seo-proposal` for both titles' keywords — no duplicates.
- Founder ideas: inbox empty. GSC content-gap: unchanged row, no re-file. L1(#3810)/L2(#2211)/L3(#3819) unchanged since 07-13, next refresh 07-20. Atomic-split: oldest open `ai-fix` is #4748 at ~22h — none past 3 days. Human-founder blockers (#875/#529/#526/#525) — 0 comments each, no re-spam.

### State delta
- ai-fix backlog: 6 → 8 eligible (#4809/#4810 promoted); seo-proposal bank: back to 0 real proposals (only the 3 standing L1/L2/L3 umbrellas)
- Org/Sessions/Views (7d): 414/438/586 · GSC: 5,953 impr / 115 clicks / 1.93% CTR / pos 10.7

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, re-verified against current file state. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ Atomic split: none needed. ⚠️ Starvation watch: backlog (8) < 15 and bank (0) ≤ 2 — trigger conditions met, but this is a pre-07:00 pulse, not the deep run the playbook is scoped to. Flagging for the imminent deep run rather than acting now.
✅ Decisions logged.

### Next Run
1. This run is ~15 min before the 07:00 UTC deep-run boundary — the next run should treat backlog=8/bank=0 as the starvation trigger and run the Queue-Starvation Playbook (step 1: check SEO Agent output rate over last 3 runs before opening new surface myself) if still true then.
2. Watch #4809/#4810 ship alongside the phased epics already in flight (#4756/#4760-4762/#4766, all <1 day old).
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20).
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

---

## 2026-07-17 07:38 — Deep run: 2 fresh proposals promoted (hub schema batch closes the pattern), FAQ-depth + hub-schema sweeps confirmed fully drained

### Context (≤3 lines)
Metrics 07:38 UTC (414 users/439 sessions/586 views 7d; GSC 5,953 impr/115 clicks/1.93% CTR/pos 10.7 — content-gap row `danny carey drum set` 69 impr/1.45% CTR/pos 11.0, same recurring row, position problem not snippet-fixable, no re-file). Backlog was 8 eligible `ai-fix` at run start (0 open PRs — Merger fully drained). 2 fresh untriaged `seo-proposal` (#4816/#4817, filed 06:52-06:53 UTC).

### Actions taken
- **Promoted #4816** (BreadcrumbList missing on 21 top-level hub/tool pages, disjoint from #4809's 5) — grep/curl-verified against current `api/meta/[...path].js`, no duplicates found.
- **Promoted #4817** (`/vs` hub missing FAQPage, companion to #4810's `/lists`+`/facts` fix) — grep/curl-verified, explicitly closes "the last gap in the hub-level FAQPage-pairing pattern" per its own body.
- **Verified the FAQ-depth-gap roster sweep is fully closed**: re-ran the count script from `learned-patterns.md` (`extendedBios.js` FAQ item counts) — distribution is now 50@9 / 16@10 / 1@11, zero profiles below the proven ≥9 threshold (was 53@8 + 7@5-6 on 07-15). Logged this + the hub-schema-pairing closure as one append to `learned-patterns.md` with a standing rule not to re-propose either pattern without a fresh regression count.
- **L2 minimum-pressure check**: confirmed 5 pattern-level L2 issues already filed this week since the 07-13 refresh (#4605, #4607, #4701, #4702, #4703) — quota already exceeded, no forced filing needed this run.
- **Starvation playbook check**: backlog dropped to 10 post-promotion (<15 trigger) and bank is now empty of real proposals (only the 3 standing L1/L2/L3 umbrella issues) — trigger met. Step 1 (SEO Agent output rate) ruled out: 8 fresh proposals filed across 3 batches in the last ~4.5h, healthy rate. Checked the 3 in-flight epics instead of forcing new surface: bands (#4753) has only phase 3/4 queued (#4756, phase 4 not yet filed pending its merge), songs (#4758) has all 3 remaining phases queued (#4760-4762), **studies (#4763) is on its FINAL phase (#4766, 3/3)** — once that merges, studies is complete and will need a genuinely new surface. Judged this as healthy phased-epic throughput, not idea drought — did not force a new epic/roster proposal this run; flagged the studies-epic completion as the real trigger to watch next.
- Founder ideas: inbox empty. Human-founder blockers (#875/#529/#526/#525) — checked comment counts directly, all 0, no re-spam. GSC content-gap unchanged, no re-file. L1(#3810)/L2(#2211)/L3(#3819) snapshots unchanged since 07-13/06-23(refreshed 07-13)/07-13, next refresh 2026-07-20. Atomic-split: oldest open `ai-fix` is #4748 at ~23h — none past 3 days.

### State delta
- ai-fix backlog: 8 → 10 eligible (#4816/#4817 promoted); seo-proposal bank: 2 → 0 real proposals (3 standing umbrella issues only)
- `learned-patterns.md`: appended FAQ-depth + hub-schema-pairing sweep closure (both patterns now fully drained)
- Org/Sessions/Views (7d): 414/439/586 · GSC: 5,953 impr / 115 clicks / 1.93% CTR / pos 10.7 (unchanged from 06:46 run)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ L2 minimum-pressure: 5/2 already filed this week, exceeded. ✅ Starvation check run: judged epic pipeline healthy, no forced new surface. ✅ Atomic split: none needed. ✅ Decisions logged.

### Next Run
1. Backlog at 10 — still below the 15 floor; keep promoting liberally as fresh proposals land.
2. **Watch #4766 (studies phase 3/3) merge** — once studies epic completes, apply the starvation playbook's step 2 (new surface) for real, since that epic's queue will go to zero.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20) — first real read on whether the FAQ-depth + hub-schema sweeps moved L1 position/CTR or L2 citation count (8/84 baseline).
4. #875/#529/#526/#525 human-founder blockers unchanged (0 comments) — no re-spam.

---

---

---

---

---

---

---

---

## 2026-07-17 08:42 (state-confirm — anti-noise hold)
- Backlog: 9 ai-fix · 0 PRs open · proposals untriaged: 0 (bank shows 6 seo-proposal-labeled but 3 are already-promoted #4810/#4816/#4817, 3 are standing L1/L2/L3 umbrellas)
- Org/Sessions/Views (7d): 414/439/592 · GSC 5,953 impr/115 clicks/1.93% CTR/pos 10.7 (unchanged from 07:38 deep run)
- Blockers unchanged: #875/#529/#526/#525 (0 comments each) · no re-spam
- Actions: none — hold continues; oldest open ai-fix (#4748) at ~24h, not yet atomic-split threshold
- Next check: mid-day pulse (~13:00 UTC) — watch #4766 (studies epic final phase) merge to trigger real starvation-playbook step 2

---

---

---

---

---

---

## 2026-07-17 10:32 (state-confirm — anti-noise hold)
- Backlog: 6 ai-fix (bands #4756, songs #4760/4761/4762, roster-exp #4748, schema #4821) · 0 PRs open · proposals untriaged: 0 (#4821 self-labeled ai-fix on filing; only umbrellas #3810/#3819/#2211 remain seo-proposal-only)
- Org/Sessions/Views (7d): 415/440/594 · GSC 5,953 impr/115 clicks/1.93% CTR/pos 10.7 (unchanged)
- Blockers unchanged: #875/#529/#526/#525 (0 comments each) · no re-spam
- Actions: none — studies epic (#4763) fully closed 09:20 UTC (final phase #4766 merged), the exact trigger flagged at 07:38 to re-check starvation. Backlog thinned 9→6 but bands+songs epics still carry 4 queued phases, so holding rather than forcing new surface on a cheap pulse.
- Next check: mid-day pulse (~13:00 UTC) — if backlog still <15 and bank still empty by then, run starvation-playbook step 2 (roster/theme-hub/format-replication) for real

---

---

---

---

---

---

## 2026-07-17 17:24 — Cheap pulse: queue-starvation playbook triggered for real, filed new Speakable batch (#4839)

### Context (≤3 lines)
Metrics 17:24 UTC (422 users/447 sessions/735 views 7d; GSC 5,953 impr/115 clicks/1.93% CTR/pos 10.7 — content-gap row `danny carey drum set` unchanged, no re-file). Backlog had thinned to 3 eligible `ai-fix` (from 6 at 10:32) with 0 untriaged `seo-proposal` (only 3 standing L1/L2/L3 umbrellas) — the starvation trigger flagged-but-deferred at 07:38/08:42/10:32 finally had no queued-epic-phase cover left: studies epic fully closed, songs epic fully closed, bands epic down to its last phase (#4756), roster-exp (#4748) still unstarted. With day-fleet 3-wide, 3 eligible items would hit 0 the moment they're all dispatched — genuine near-term starvation, not noise.

### Actions taken
- **Step 1 (SEO Agent rate check):** confirmed healthy — 4 batches filed today alone (04:16-04:21, 05:31-05:35, 08:41-09:22, 12:18-12:33), most self-labeling `ai-fix` directly. Output isn't the bottleneck; Roadie's 3-wide/8-wide throughput is outrunning it, as the framework predicts.
- **Step 2 (winning-format replication):** re-grepped `api/meta/[...path].js` for `speakableSchema` coverage across all 42 route-match branches (per `learned-patterns.md`'s 07-17 note flagging "per-entity Speakable coverage" as the next lever). Found 4 branches never covered, distinct from the already-queued #4833 (guides): `/vs/<slug1>-vs-<slug2>` comparison pages (226, `vsMatch` lines 942-999) + `/vs`, `/tools`, `/guides` hub indexes (1 each) = 229 pages, zero `speakableSchema` hits in that line range. Searched existing issues (open+closed) for "SpeakableSpecification" — no duplicate. Filed **#4839** (`ai-fix,seo`) with exact line numbers, fix snippet, and curl verify steps.
- Founder ideas: inbox empty. GSC content-gap unchanged, no re-file. L1(#3810)/L2(#2211)/L3(#3819) unchanged since 07-13, next refresh 07-20. Atomic-split: oldest open `ai-fix` (#4756, bands phase 3/4) at ~32h, #4748 (roster-exp) at ~32h — neither past 3-day threshold yet. Human-founder blockers (#875/#529/#526/#525) — 0 comments each, no re-spam.

### State delta
- ai-fix backlog: 3 → 4 eligible (#4839 filed)
- Org/Sessions/Views (7d): 422/447/735 · GSC: 5,953 impr / 115 clicks / 1.93% CTR / pos 10.7 (unchanged)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: none untriaged to review. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ Starvation playbook: triggered and actioned (step 1 ruled out upstream cause, step 2 opened new verified surface — one issue per starvation event, per the rule). ✅ Atomic split: none past threshold. ✅ Decisions logged.

### Next Run
1. Backlog at 4 — still critical; if #4756/#4748 both dispatch before the next fresh `seo-proposal` batch lands, re-check starvation and consider a 2nd lever (Kit Overview prose depth, per `learned-patterns.md`) if #4839 alone isn't enough runway.
2. Watch #4756 (bands phase 3/4, last queued phase of that epic) — once it merges, epic #4753 needs a phase-4 decision or closure.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20).
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

## 2026-07-17 22:15 (state-confirm — anti-noise hold)
- Backlog: 6 ai-fix (#4842/#4841/#4839/#4833 Speakable-sweep batches, #4756 bands phase 3/4, #4748 roster-exp) · 0 PRs open · proposals untriaged: 0 (only standing umbrellas #3810/#3819/#2211 remain seo-proposal-only)
- Org/Sessions/Views (7d): 425/451/749 · GSC 5,953 impr/115 clicks/1.93% CTR/pos 10.7 (unchanged)
- Blockers unchanged: #875/#529/#526/#525 (0 comments each) · no re-spam
- Actions: none — starvation self-resolved since 17:24: SEO Agent auto-filed and self-labeled 2 more Speakable-sweep batches (#4841/#4842, 21:20 UTC) covering drumstick/cymbal/snare/pedal brand+reference+setup+signature pages, refilling backlog 4→6 without CEO action
- Next check: next hourly pulse; re-run starvation check if backlog drops below 15 again with no fresh supply

---

---

---

---

---

---

## 2026-07-18 01:32 — Cheap pulse: 3 fresh proposals promoted (birthPlace/image, Article author, technique-drummers jobTitle+description)

### Context (≤3 lines)
Metrics 01:32 UTC (405 users/428 sessions/703 views 7d; GSC 5,019 impr/102 clicks/2.03% CTR/pos 11.1 — content-gap row `danny carey drum set` 56 impr/1.79% CTR/pos 10.9, same recurring row, position problem not snippet-fixable, no re-file). Backlog was 3 eligible `ai-fix` at run start (0 open PRs). 3 fresh untriaged `seo-proposal` (#4864/#4865/#4866, filed 00:30 UTC).

### Actions taken
- **Promoted #4864** (`/birthdays` curated ItemList Person entries missing `birthPlace`+`image`, 10 entries, data already imported from `birthdays.js`) — grep/curl-verified, explicitly respects the #4250 "don't change the curated 10" ruling.
- **Promoted #4865** (drummer-profile "Career & Drumming Style" Article block missing `author`, 67 profiles × 2 route occurrences) — verified against all 14 sibling `Article` blocks in the file, only this one lacks `author`.
- **Promoted #4866** (`/technique/<slug>/drummers` ItemList Person entries missing `jobTitle`+`description`, 29 pages/105 masters entries, single shared `.map()` fix) — verified 105/105 `masters` entries have `note` populated, zero fabrication risk.
- Searched open+closed issues for all three (`birthPlace birthdays`, `Career Drumming Style author`, `technique drummers jobTitle`) — found related-but-distinct closed issues (#4249, #4635, #1659), no duplicates.
- Founder ideas: inbox empty. GSC content-gap unchanged, no re-file. L1(#3810)/L2(#2211)/L3(#3819) unchanged since 07-13, next refresh 07-20. Atomic-split: oldest open `ai-fix` (#4756 bands phase 3/4, #4748 roster-exp) both ~1.75 days old, below 3-day threshold. Human-founder blockers (#875/#529/#526/#525) unchanged — no re-spam.

### State delta
- ai-fix backlog: 3 → 6 eligible (#4864/#4865/#4866 promoted)
- Org/Sessions/Views (7d): 405/428/703 · GSC: 5,019 impr / 102 clicks / 2.03% CTR / pos 11.1

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 3/3 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: unchanged row re-checked, no re-file. ✅ Starvation check: bank was 3 (>2), trigger not met. ✅ Atomic split: none past threshold. ✅ Decisions logged.

### Next Run
1. Backlog at 6 — still thin; keep promoting liberally as fresh proposals land, watch for starvation trigger (backlog<15 AND bank≤2) if #4863/#4756/#4748/#4864-4866 all dispatch before next batch.
2. Watch #4756 (bands phase 3/4, last queued phase) — once merged, epic #4753 needs phase-4 decision or closure.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20).
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

## 2026-07-18 03:00 (state-confirm — anti-noise hold)
- Backlog: 6 ai-fix (#4748 roster-exp, #4756 bands phase 3/4, #4863/#4864/#4865/#4866 Speakable/schema batches) · 0 PRs open · proposals untriaged: 0 (only standing umbrellas #3810/#3819/#2211 remain seo-proposal-only)
- Org/Sessions/Views (7d): 406/428/704 · GSC 5,019 impr/102 clicks/2.03% CTR/pos 11.1 (unchanged) · content-gap row `danny carey drum set` unchanged, no re-file
- Blockers unchanged: #875/#529/#526/#525 (0 comments each) · no re-spam
- Actions: none — #4867/#4868/#4869 (sitemap diet, L3 rotation+proxy, L2/L3 docs) merged 01:14-02:17 UTC but were already in-progress before the 01:32 entry, not part of the eligible-backlog count; oldest open ai-fix (#4748) at ~42h, below 3-day split threshold; backlog thin but SEO Agent has self-refilled twice in the last 12h without CEO action, holding rather than forcing starvation-playbook step 2 again so soon after 17:24
- Next check: mid-day pulse (~13:00 UTC) or sooner if backlog drops with no fresh supply

---

---

---

---

---

---

## 2026-07-18 06:36 (state-confirm — anti-noise hold)
- Backlog: 5 ai-fix (#4885/#4884/#4883 fresh Speakable/curated-content batches self-labeled by SEO Agent ~05:05 UTC, #4756 bands phase 3/4, #4748 roster-exp) · 0 PRs open · proposals untriaged: 0 (only standing umbrellas #3810/#3819/#2211)
- Org/Sessions/Views (7d): 413/435/714 · GSC 5,019 impr/102 clicks/2.03% CTR/pos 11.1 (unchanged) · content-gap row `danny carey drum set` unchanged, no re-file
- Blockers unchanged: #875/#529/#526/#525 (0 comments each) · no re-spam
- Actions: none — backlog composition turned over (#4863/#4864/#4865/#4866 dispatched, #4883-4885 self-filed) but count held near prior run; none of the 5 open items past 3-day atomic-split threshold (#4756/#4748 ~2 days old)
- Next check: this is the daily deep run once we cross 07:00 UTC — full metrics/GSC-gap/L1-L2-L3 pass then, including a real starvation-playbook check (backlog trending 6→5)

---

---

---

---

---

---

## 2026-07-19 08:46 — Deep run: 2 fresh proposals promoted; confirmed active Claude-capacity stall (#4892) explains thin backlog, held off forcing new surface

### Context (≤3 lines)
Metrics 08:45 UTC (429 users/448 sessions/661 views 7d; GSC 5,908 impr/118 clicks/2.00% CTR/pos 11.0 — content-gap row `danny carey drum set` 77 impr/1.30% CTR/pos 10.7, same recurring row last actioned by #4739 (closed 07-16, re-verified reasoning: position problem, not snippet-fixable, no re-file). Backlog was **2** eligible `ai-fix` at run start (0 open PRs), 2 fresh untriaged `seo-proposal` (#4912/#4913, filed 03:10 UTC) — starvation trigger (backlog<15 AND bank≤2) technically met.

### Actions taken
- **Promoted #4912** (bot-facing `Article` schema on `/drummer/<slug>` omits `gearHighlights` prose, 67 profiles, 2 route occurrences in `api/meta/[...path].js`) — additive fix alongside existing `careerHighlights`/`styleAndInfluences`, verified 67/67 profiles have real non-empty content, no dupes found.
- **Promoted #4913** (`/gear/<brand>/<series>/drummers-using` FAQ ignores curated `buildFAQ()`, 38 pages) — issue explicitly scopes itself away from the sibling `Product`/`AggregateOffer` schema (placeholder affiliate IDs per binding rule #3), FAQ-only change, no dupes found.
- **Investigated the queue-starvation trigger before acting on it, per the playbook's step 1** — pulled the last 2 `roadie.yml` runs' raw logs directly: every run since ~11:30 UTC yesterday shows `preferred Claude token looks limited... failing over to backup token` immediately followed by every dispatched issue (#4748/#4753/#4756/#4758/#4914) producing `no commits (rc=1)`. This is **not** an idea-supply problem (SEO Agent filed 15 proposals across 07-18 alone, healthy rate) — it's the exact capacity stall Ricardo was already asked about in **#4892** (backup token hit its *weekly* limit, no failover until 2026-07-23). Confirmed the fresh Watchdog umbrella **#4914** (07:45 UTC) independently corroborates this — both the SEO Agent (06:49 run) and this CEO Agent's own prior hourly run (07:41 run) failed for the same reason. **Decision: did not run starvation-playbook step 2 (forcing new roster/hub/format surface).** Manufacturing more `ai-fix` issues right now wouldn't unblock anything — Roadie can't execute regardless of queue depth until the token situation resolves — and would just bloat a backlog nobody can drain. Promoting the 2 real proposals already gives Roadie ready work for whenever capacity returns.
- **Atomic-split check:** #4748 (roster-exp, created 07-16 08:50) and #4756 (bands phase 3/4, created 07-16 09:06) are both at ~72h, crossing the nominal 3-day trigger — but per the #4205/#4267/#4276 precedent (pending-issues.md, 2026-07-13), they're not stuck from size/ambiguity (the condition the rule targets), they're stuck from the same known, already-escalated capacity issue. Splitting them would produce more capacity-blocked fragments, not progress. Held.
- Founder ideas: inbox empty. L1(#3810)/L2(#2211)/L3(#3819) snapshots unchanged since 07-13, next refresh due 2026-07-20. Human-founder blockers #875/#529/#526/#525 unchanged (0 comments) — no re-spam. **#4892 needs no new action from CEO** — it's a founder billing/capacity decision (do nothing / add a 3rd seat / throttle night fleet), correctly awaiting Ricardo, re-confirmed still accurate and current, not stale.

### State delta
- ai-fix backlog: 2 → 4 eligible (#4912/#4913 promoted)
- Org/Sessions/Views (7d): 429/448/661 · GSC: 5,908 impr / 118 clicks / 2.00% CTR / pos 11.0

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: unchanged recurring row re-checked, no re-file. ✅ Starvation playbook: triggered, investigated, root-caused to the known capacity stall — deliberately did not force new surface (see reasoning above). ✅ Atomic split: 2 issues crossed the time threshold but held per infra-block precedent. ✅ Decisions logged.

### Next Run
1. **Watch #4892 for Ricardo's decision** (do nothing / 3rd token seat / throttle night fleet) — this is the actual constraint on throughput right now, not idea supply. Backup token resets 2026-07-23 regardless.
2. Backlog at 4 (critically thin) — but do not force-fill further until either capacity returns or the SEO Agent's normal cadence tops it up; re-run the starvation playbook's step 2 only if the bank is also empty AND #4892 is resolved/expired with no throughput recovery.
3. Watch for next L1/L2/L3 snapshot refresh (2026-07-20) — first real read on whether the FAQ-depth/hub-schema/Speakable sweeps moved L1 position or L2 citation count.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

---

