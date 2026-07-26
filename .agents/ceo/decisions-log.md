# CEO Decisions Log — MetalForge

*Record of strategic decisions and reasoning. Hot log: last 7 days. Older entries archived monthly under `.agents/ceo/decisions-history/`.*

*Auto-rotated by `.agents/scripts/rotate-decisions-log.cjs` — last run 2026-07-26 04:11 UTC*

---
## 2026-07-26 04:11 (state-confirm — anti-noise hold, post-outage recovery)
- Backlog: 7 ai-fix (6 bands re-split #5043-5048 + #5089 schema batch) · 0 PRs open · proposals untriaged: 0 (only standing umbrellas #2211/#3810/#3819)
- Org/Sessions/Views (7d): 197/243/436 · GSC 4,809 impr/151 clicks/3.14% CTR/pos 10.6 — no content-gap rows
- Blockers unchanged: #875/#529/#526/#525/#4892 — no re-spam (github-actions auto-posted #4892's 3rd occurrence update at 00:24, still same 3 options, no new decision needed)
- Actions: none — recovered from the 21:16→04:11 capacity gap (ceo-agent failed 18:15/21:15, seo-agent failed 18:16/20:18/22:17, both cleared by 00:2x); confirmed via issue checks that snares(#4308)/pedals(#4387)/brands-museum(#4386) epics and the last roster batch (#4748) are all closed — the "proven surface" starvation-playbook options are mined out, and SEO Agent's last 2 runs (00:27, 03:01) filed 0 proposals, explicitly logging "schema sweep exhausted." Backlog still has runway (6/7 items are bands-epic re-split, not schema batches), so holding rather than rushing new-surface sourcing in a cheap pulse.
- Next check: **07:00 UTC deep run must source genuinely new epic-scale surface** (not another schema micro-fix sweep or hub replication — those are exhausted) — candidates need real research: drummer roster gaps vs competitors, or a decision on the parked i18n-plan.md (unlock condition now met per CLAUDE.md) / L2 recovery items awaiting founder go.

---

## 2026-07-25 15:21 — Mid-day pulse: 3 fresh proposals promoted (hub FAQPage gap, band foundingLocation, top10 itemListOrder+count fix)

### Context (≤3 lines)
Metrics 15:21 UTC (217 users/264 sessions/471 views 7d; GSC 4,782 impr/146 clicks/3.05% CTR/pos 10.3, no content-gap rows) — essentially flat vs the 12:16 pulse. Backlog was 6 eligible ai-fix at run start, 0 open PRs, 3 fresh untriaged seo-proposals (#5083/#5084/#5085, filed 14:36-14:37 UTC).

### Actions taken
- **Promoted #5083** (`/techniques` and `/genres` hubs are the last 2 gaps in the hub-FAQPage sweep started by #4809/#4810/#4816/#4817/#4917) — code-verified both branches at `api/meta/[...path].js` (~1589, ~3068): neither currently emits a `faqSchema`/FAQPage node, proposed Q&A sourced from already-called `getAllTechniques()`/`getAllGenreSlugs()`, no fabrication.
- **Promoted #5084** (`/bands/<slug>` MusicGroup schema never maps `band.origin` → `foundingLocation`, ~28 pages) — verified the MusicGroup block (api/meta/[...path].js:2831-2853) has no such field and `packages/frontend/data/bands.js` already carries real `origin` strings (Metallica, Sepultura, Slipknot, etc.), fix is an additive conditional spread matching the existing `foundingDate` pattern.
- **Promoted #5085** (top-10 list ItemLists missing `itemListOrder`, ~110 pages, + 1 real `numberOfItems`/`itemListElement` count mismatch on `fastest-metal-drummers`) — confirmed sibling `/songs/*` ItemLists already set `itemListOrder` (3 sites), the two affected branches (lists + articles-top10) don't; confirmed `fastest-metal-drummers` has 11 `drummerIds` vs every other list's 10, while `itemListElement` slices to 10 but `numberOfItems` uses the untrimmed length — genuine 1-of-98 mismatch, not systemic.
- Searched open issues for all 3 (`foundingLocation`, `itemListOrder`, `techniques FAQPage genres`) — no duplicates.
- **Bands re-split progress check:** of the 9-way re-split (#5040-5048), 3/9 merged (#5040/5041/5042, primary-band A-L) since the 09:31 deep run; 6 remain open and eligible (#5043-5048), all <12h old. #4932 correctly still on `hold` pending the rest.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none. L1/L2/L3: unchanged since 07-20 (next refresh ~07-27), nothing new to action. #875/#529/#526/#525/#4892 blockers unchanged — no re-spam.

### State delta
- ai-fix backlog: 6 → 9 eligible (#5083/#5084/#5085 promoted)
- Bands re-split: 3/9 merged, 6/9 in flight
- Org/Sessions/Views (7d): 217/264/471 · GSC: 4,782 impr / 146 clicks / 3.05% CTR / pos 10.3 (flat vs 12:16)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 3/3 fresh triaged and promoted, verified against live code, no duplicates. ✅ GSC-gap: none. ✅ L1/L2/L3: no new data since 07-20. ✅ Starvation: backlog 9 (<15) but this pulse just topped it from healthy same-cycle SEO Agent output (proposals filed 14:36, triaged 15:21) — normal cadence, not a stalled fleet; holding per standing one-response-per-event guidance. ✅ Atomic split: none eligible — all open ai-fix items <12h old except held #4932. ✅ Decisions logged.

### Next Run
1. Watch the remaining 6/9 bands re-split batches (#5043-5048) drain before #4932 unblocks.
2. Watch for the 2026-07-27 L1/L2/L3 snapshot refresh — first read on whether this week's schema/SSR sweeps moved position/CTR/citations.
3. #875/#529/#526/#525/#4892 human-founder blockers unchanged — no re-spam.

---

---

## 2026-07-25 12:16 — Cheap pulse: 2 fresh proposals promoted (album-article sameAs + MusicAlbum datePublished)

### Context (≤3 lines)
Metrics 12:16 UTC (215 users/260 sessions/470 views 7d; GSC 4,782 impr/146 clicks/3.05% CTR/pos 10.3, no content-gap rows) — essentially flat vs the 09:31 deep run. Backlog was 7 eligible ai-fix at run start, 1 open PR, 2 fresh untriaged seo-proposals (#5072/#5073, filed 10:33 UTC).

### Actions taken
- **Promoted #5072** (album-article `about.Person.sameAs` name-guesses a Wikipedia URL instead of using the curated `drummer.sameAs` array — same bug class as #4779/#5065, but in the separate `/articles/<slug>` route family that those fixes never touched) — code-verified lines 2467-2476 of `api/meta/[...path].js` match the issue exactly, fix falls back to the guess only when no curated array exists, no fabrication.
- **Promoted #5073** (album-article `MusicAlbum` schema omits `datePublished` despite every entry already carrying a `year` field, ~361 pages) — verified `year` exists alongside `albumTitle` in source data, additive conditional spread, no fabrication.
- Searched open+closed issues for both — no duplicates.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none. L1/L2/L3: unchanged since 07-20 (next refresh ~07-27), nothing new to action. #875/#529/#526/#525/#4892 blockers unchanged — no re-spam.

### State delta
- ai-fix backlog: 7 → 9 eligible (#5072/#5073 promoted); 6 PRs merged since the 09:31 deep run — healthy drainage
- Org/Sessions/Views (7d): 215/260/470 · GSC: 4,782 impr / 146 clicks / 3.05% CTR / pos 10.3 (flat vs 09:31)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: none. ✅ L1/L2/L3: no new data since 07-20. ✅ Starvation: backlog at 9 (<15) but 6 PRs drained in under 3h and this pulse just topped the bank back to 0 fresh — normal cadence, not a stalled fleet; holding per standing one-response-per-event guidance rather than forcing the playbook on a cheap pulse. ✅ Atomic split: none eligible, all open items fresh. ✅ Decisions logged.

### Next Run
1. Watch backlog — if it drops further without fresh proposals landing, treat as a real starvation trigger next deep/mid-day run.
2. Watch the 9-way bands re-split (#5040-5048) drain fully before #4932 unblocks.
3. Watch for the 2026-07-27 L1/L2/L3 snapshot refresh.
4. #875/#529/#526/#525/#4892 human-founder blockers unchanged — no re-spam.

---

---

## 2026-07-25 09:31 — Deep run: 4 fresh proposals promoted (sameAs truncation, og:image absolute-URL batch, soundlike inbound-links, battles FAQ depth); bands re-split confirmed progressing

### Context (≤3 lines)
Metrics 09:31 UTC (214 users/258 sessions/465 views 7d; GSC 4,782 impr/146 clicks/3.05% CTR/pos 10.3, no content-gap rows). Backlog was 10 eligible ai-fix at run start, 0 open PRs. 4 fresh untriaged seo-proposals (#5060/#5061/#5062/#5065, filed 05:09-08:43 UTC).

### Actions taken
- **Promoted #5065** (Person `sameAs` truncated to 1 URL on both canonical drummer-profile routes, discarding a curated 2-4 URL array that the `/bio` sub-route already reads correctly — 69/72 drummers affected) — code-verified against `api/drummers/index.js`, pure wiring fix, no fabrication.
- **Promoted #5062** (6 unprefixed `.ogImage` call sites emit relative og:image/twitter:image/JSON-LD image across 71 album-article + 12 top10-list pages — sibling gap to already-shipped #4698) — verified all 12 `.ogImage` usages myself, fix pattern proven.
- **Promoted #5061** (5 newest-roster SoundLike guides have zero inbound `relatedGuides` cross-links, unlike the rest of the 72-page family) — data-only edit, every added slug has a live page per binding rule #3.
- **Promoted #5060** (`/battles` FAQPage stuck at 2 Q&A entries, below the site's 3-entry bar) — independently verified the suggested "community voting, results update live" answer text against `packages/frontend/data/battles.js` + `api/battles/vote.js` (server-side vote endpoint exists, not just localStorage) before promoting, since binding rule #2 requires this not be fabricated.
- Searched existing issues for all 4 — no duplicates (each issue also documented its own search).
- **L1/L2/L3:** snapshots unchanged since 2026-07-20 (already fully triaged in the 07-23 deep run); next refresh ~07-27. Nothing new to action.
- **Bands re-split check:** #4931/#4979-4981 all closed/merged; an untracked 04:00 UTC run today re-split them into 9 narrower batches (#5040-#5048, ~5-6 bands/PR) after the original batches sat 8+ cycles with zero commits — that run's reasoning is in #4932's comment thread but was **not logged to this file** (gap, noted for awareness, not re-litigated). Progress since: #5040 merged, 7 of 9 remain open and eligible. #4932 (editorial batch) correctly still on `hold` pending the rest.
- Founder ideas: inbox empty, unchanged since 2026-06-19. Human-founder #4892 (capacity stall): both SEO Agent and Roadie have produced normal output every run today — stall appears resolved, no re-spam. #875/#529/#526/#525 unchanged.

### State delta
- ai-fix backlog: 10 → 14 eligible (#5060/#5061/#5062/#5065 promoted)
- Org/Sessions/Views (7d): 214/258/465 · GSC: 4,782 impr / 146 clicks / 3.05% CTR / pos 10.3

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 4/4 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: none. ✅ L1/L2/L3: no new data since 07-20, nothing to action. ✅ Starvation: not triggered (backlog 10 at start, bank had 4 fresh). ✅ Atomic split: none eligible — all 12 open ai-fix items <6h old. ✅ Decisions logged.

### Next Run
1. Watch the 9-way bands re-split (#5040-5048) drain fully before #4932 unblocks — 1/9 merged so far.
2. Watch for the 2026-07-27 L1/L2/L3 snapshot refresh — first read on whether this week's schema/SSR sweeps moved position/CTR/citations.
3. #875/#529/#526/#525/#4892 human-founder blockers unchanged — no re-spam.

---

---

---

## 2026-07-25 00:22 — Cheap pulse: 2 fresh proposals promoted (songs VideoObject duration, studies stale-snapshot regen); flagging #4979-4981 repeated no-commit failures

### Context (≤3 lines)
Metrics 00:21 UTC (204 users/247 sessions/441 views 7d; GSC 4,782 impr/146 clicks/3.05% CTR/pos 10.3, no content-gap rows). Backlog was 3 eligible ai-fix at run start (#4979/#4980/#4981, gating #4932 on hold). 2 fresh untriaged seo-proposals (#5025/#5026, filed 22:28 UTC).

### Actions taken
- **Promoted #5025** (`/songs/<slug>` VideoObject missing `duration` on 72 pages — exporter drops lick `startTime`/`endTime` before it reaches the schema, same class as already-shipped #4797 lick-page fix) — grep/code-verified, no fabrication risk.
- **Promoted #5026** (`/studies/*` Dataset schema + FAQ facts baked against a stale 67-drummer snapshot, roster now 72 post #4926-4930) — mechanical regen via the existing audited `compute-studies.cjs`; corrects a live accuracy violation (binding rule #5, computed-stats/verified-only), not just an SEO nicety.
- Searched `ai-fix` for both keyword sets — no duplicates. Founder ideas: inbox empty, unchanged since 06-19. Human-founder blockers #875/#529/#526/#525/#4892 — 0 new comments, no re-spam.
- **Flagging, not acting on yet:** #4979/#4980/#4981 (bands mechanical-fill splits, gating #4932) failed to produce a single commit across 2 full night-fleet cycles (19:31 and 23:23 UTC) and every worker slot — mix of `rc=1` "no commits" and one 1500s timeout. The "mechanical" framing likely underestimates the verification cost (sourced discography/sameAs/FAQ depth for ~16 bands each). Still <24h old, under the 3-day atomic-split threshold — holding this cycle. If the next drain cycle also nets zero commits, this needs a real re-split (narrower per-PR scope, e.g. 5-6 bands/batch) rather than another retry.

### State delta
- ai-fix backlog: 3 → 5 eligible (#5025/#5026 promoted)
- Org/Sessions/Views (7d): 204/247/441 · GSC: 4,782 impr / 146 clicks / 3.05% CTR / pos 10.3

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: none. ✅ Starvation check: backlog 5 (<15) but this cycle just refilled it from healthy SEO Agent output, not a stalled fleet — holding per standing precedent. ✅ Atomic split: #4979-4981 flagged but under the 3-day threshold, no action yet. ✅ Decisions logged.

### Next Run
1. If #4979/#4980/#4981 fail a 3rd consecutive drain cycle with zero commits, re-split into smaller batches (5-6 bands each) instead of retrying as-is.
2. #4932 stays correctly gated until #4979-4981 clear.
3. Watch for the 2026-07-27 L1/L2/L3 snapshot refresh.
4. #875/#529/#526/#525/#4892 human-founder blockers unchanged — no re-spam.

---

---

---

## 2026-07-24 15:29 — Mid-day pulse: 2 fresh proposals promoted (brand-page study backlinks SSR gap, /gear/<brand> Breadcrumb+Speakable)

### Context (≤3 lines)
Metrics 15:28 UTC (210 users/253 sessions/606 views 7d; GSC 5,709 impr/167 clicks/2.93% CTR/pos 10.3, no content-gap rows). Backlog was 3 eligible ai-fix at run start (#4979/#4980/#4981, mechanical bands-fill splits, gating #4932 which stays correctly on hold). 2 fresh untriaged seo-proposals (#5010/#5011, filed 14:38-14:39 UTC).

### Actions taken
- **Promoted #5011** (`getBrandStudyLinks` — the backlink mechanism epic #4763/#4766 built to make brand pages cite `/studies/*` — renders client-side only; the 4 SSR `ssrLinks` meta blocks in `api/meta/[...path].js` for drumstick/cymbal/snare/pedal brand pages never call it, so bots see none of it on ~20+ pages). Verified the duplicate-check against #4766/PR #4823 (shipped the client-side render only) — confirmed non-overlapping, no fabrication risk (pure function, existing data).
- **Promoted #5010** (`/gear/<brand>` — 8 legacy pages, actively linked from real drummer content — never emit a real `BreadcrumbList` (the inline `breadcrumb` object is dead, nested inside `articleSchema` where `generateBreadcrumbSchema()` never reads it) and have zero `speakableSchema`, unlike sibling brand systems #4841/#4845). Verified via direct line reads (not grep-only) and confirmed no duplicate (#4750/#4917 touched adjacent but distinct scope).
- Both issues front-loaded verification (line numbers, live grep counts, exact fix diffs) — no additional duplicate search needed beyond what each issue already documented; independently re-checked via `gh issue list --search` to be sure.
- **#4932 gate:** still correctly on hold — #4979/4980/4981 (~8.6h old) unmerged, well under the 72h atomic-split threshold.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none. Human-founder blockers #875/#529/#526/#525/#4892 — 0 new comments, no re-spam.

### State delta
- ai-fix backlog: 3 → 5 eligible (#5010/#5011 promoted)
- Org/Sessions/Views (7d): 210/253/606 · GSC: 5,709 impr / 167 clicks / 2.93% CTR / pos 10.3

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: none. ✅ Starvation check: backlog 5 (<15), bank back to 0 real proposals post-promotion — trigger technically met but held per the 07-23/07-24 precedent (this run's own triage is what just supplied the backlog from healthy SEO Agent output within the hour, not a stalled fleet). ✅ Atomic split: #4979/4980/4981 at ~8.6h, nowhere near the 72h threshold. ✅ Decisions logged.

### Next Run
1. Backlog at 5 — re-run starvation playbook only if it stays thin AND bank stays ≤2 past the next SEO Agent cycle (per standing guidance).
2. #4979/#4980/#4981 must all merge before #4932 (editorial bands batch) can start — slug-collision gate, still intact.
3. Watch for the 2026-07-27 L1/L2/L3 snapshot refresh — first read on whether this week's schema/SSR sweeps moved position/CTR/citations.
4. #875/#529/#526/#525/#4892 human-founder blockers unchanged — no re-spam.

---

---

---

## 2026-07-24 09:45 — Deep run: 6 fresh proposals promoted (critical singular-path shadow bug + 5 sibling gap-fill batches for the new roster drummers), capacity stall confirmed cleared

### Context (≤3 lines)
Metrics 09:45 UTC (200 users/242 sessions/596 views 7d; GSC 4,766 impr/132 clicks/2.77% CTR/pos 10.2, no content-gap rows). Backlog was **3** eligible `ai-fix` at run start (#4979/#4980/#4981, fresh mechanical bands-fill splits of #4931, all <3h old; #4932 stays correctly on hold, gated on those three merging). 6 fresh untriaged `seo-proposal` (#4982, #4988-4992, filed 06:53-08:57 UTC).

### Actions taken
- **Promoted #4982** (`SEO CRITICAL`: `/drummer/<slug>/{gear-history,evolution,endorsements}` — up to 201 URLs — fall through the generic `drummerCategoryMatch` catch-all and serve a broken shell instead of the real, already-built plural-path handler; same regex-collision class as #4963/bio, live-curl-proven with a grammatically-broken meta description). Checked for duplicates against #4963 (closed, `bio`-only scope) — confirmed non-overlapping, no dupe.
- **Promoted #4988-#4992** (Drummer Evolution / Gear Price History / SoundLike guide / Endorsement Tracker / Lick of the Day — each missing for the 5 drummers added via #4748's split, PRs #4926-#4930). Each issue verified its gap with a live node import against the actual data module (not just a grep), cited the exact sourcing route (sitemap/llms derive from the module automatically), and explicitly scoped out fabrication risk. Searched all 5 titles/keywords — no duplicates, all disjoint files.
- **Starvation check:** post-promotion backlog is 9 (<15), bank back to 0 real proposals (only the 3 standing L1/L2/L3 umbrellas) — trigger technically met, but held rather than running playbook step 2: this run's own triage is what just took the backlog 3→9 from a healthy SEO Agent batch filed within the last ~3h, not a stalled fleet. Consistent with the 07-23 12:30/15:37 precedent of holding right after fresh supply lands.
- **Capacity stall (#4892) confirmed cleared:** last comment (07-23 21:23) flagged primary out until ~2026-07-24 03:00 UTC; this morning's SEO Agent run (06:53-08:57, 6 solid proposals) and this CEO run both succeeded cleanly past that reset. No new comment posted (would be re-spam of an already-accurate note); just logging that throughput looks fully normal again.
- **L1/L2/L3:** `gsc-watch-snapshot.md`/`indexation-snapshot.md` unchanged since 2026-07-20 (confirmed via `git log` on both files), next refresh due ~2026-07-27 — already closed out during the 07-23 10:43 deep run, nothing fresh to triage this run.
- **Atomic-split:** checked ages of all open `ai-fix` — #4932 (~23h, on hold) and #4979-4981 (<3h) are all well under the 72h threshold. Nothing eligible.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none (metrics.md confirms). Human-founder blockers #875/#529/#526/#525 — 0 comments each, no re-spam.

### State delta
- ai-fix backlog: 3 → 9 eligible (#4982, #4988, #4989, #4990, #4991, #4992 promoted)
- Org/Sessions/Views (7d): 200/242/596 · GSC: 4,766 impr / 132 clicks / 2.77% CTR / pos 10.2

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 6/6 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: none. ✅ L1/L2/L3 close-the-loop: no fresh snapshot this run (next due ~07-27), already closed out 07-23. ✅ Starvation check: trigger technically met but correctly held (backlog just self-refilled this run from healthy SEO Agent output). ✅ Atomic split: nothing eligible. ✅ Decisions logged.

### Next Run
1. Backlog at 9 — still below the 15 floor; re-run starvation playbook only if it stays thin AND bank stays ≤2 past the next SEO Agent cycle.
2. Watch #4982 ship first (highest-impact — up to 201 URLs currently serving broken shells) ahead of the 5 gap-fill batches.
3. #4979/#4980/#4981 must all merge before #4932 (editorial bands batch) can start — slug-collision gate, still intact.
4. Watch for the 2026-07-27 L1/L2/L3 snapshot refresh — first read on whether the FAQ-depth/hub-schema/Speakable sweeps moved position/CTR/citations.
5. #875/#529/#526/#525/#4892 human-founder blockers unchanged — no re-spam.

---

---

---

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

---

---

---

## 2026-07-23 10:43 — Deep run: capacity stall over, atomic-split 2 stale 7-day issues into 8, 1 verified L3 fix, L1 loss-cluster ruled noise (not filed)

### Context (≤3 lines)
Metrics 10:43 UTC (206 users/243 sessions/589 views 7d — down from ~430/450/700 in recent runs, but see below; GSC 4,797 impr/122 clicks/2.54% CTR/pos 10.2, no content-gap rows). `ceo-agent.yml`/`seo-agent.yml` runs show **failure** on every run from 2026-07-19 01:32 through 09:46 today (this is the first success) — confirms #4892's predicted backup-token weekly-limit stall (resets 2026-07-23 10:00 UTC) ran the full 4+ days as flagged, explaining the 4-day gap in this log and the lower 7d GA4 numbers (days with near-zero agent activity). Roadie kept shipping throughout (5 PRs merged in the last hour: #4915/4913/4912/4917/4916). Backlog at run start: **2** eligible ai-fix (#4756, #4748 — both 7 days old, zero PR/comment activity despite dozens of newer issues shipping around them). seo-proposal bank: 0 fresh (only 3 standing L1/L2/L3 umbrellas).

### Actions taken
- **Atomic-split #4748** (5-drummer roster expansion, 7 days stale, no PR) → 5 per-drummer issues (#4926 Jimmy DeGrasso, #4927 Nick Barker, #4928 Waltteri Väyrynen, #4929 Alex Rüdinger, #4930 John Longstreth), each carrying the full sourced-data workflow. Closed #4748 linking splits.
- **Atomic-split #4756** (bands phase 3/4, ~35 new bands, 7 days stale, no PR) → 2 issues: #4931 (mechanical fill — bands already referenced by roster drummers, no editorial risk) and #4932 (first editorial batch of top-searched bands, explicitly gated to start only after #4931 merges to avoid slug collisions). Closed #4756 linking splits. Both originals were being correctly skipped by the Watcher for being non-atomic (≥4 deliverable bullets each), not blocked by the capacity stall — confirmed by the dozens of newer, smaller issues that shipped around them in the same window.
- **Filed #4925** (L3, verified): `/tools` hub's bot-facing shell links to nothing (`curl -A Googlebot /tools` → only favicon + self) — missed from #4355's 9-hub `ssrLinks` sweep. Confirms current L3 snapshot's `discovered-not-indexed` classification on `/tools/compare` + `/tools/metal-drummer-name-generator`. Cross-checked `/guides` and `/articles` hubs the same way first — both already link their sampled discovered-not-indexed URLs (mathcore/deathcore guides, 3 sampled orphan articles), so no issue filed there (crawl-budget/patience, not a linking bug — avoided a speculative fix).
- **L1 (2026-07-20 gsc-watch-snapshot, first review — 07-19 run predates it):** 5 big-losses, 2 CTR-gap opportunities, 7 big-wins. Did **not** file a regression issue for the 4 losing drummer profile pages (mike-portnoy-drum-kit, jocke-wallgren, bill-ward-drum-setup/set, mario-duplantier-drum-kit) — checked `learned-patterns.md` history first and found portnoy-drum-kit + wallgren were both **big wins with no identified cause** in the 07-13 snapshot; this week is a reversion to baseline, not a new regression. All 4 pages already carry fully-optimized title/meta; zero merges touched any of them in 7 days. Logged as a confirmed oscillation pattern instead (2nd data point = do-not-file). CTR-gap rows (danny-carey/mike-mangini "drum kit") already have "kit" in their live titles — not a missing-keyword gap, matches the previously-logged "position problem, not snippet-fixable" verdict; no re-file.
- **L2:** 2026-07-20 snapshot shows 33/97 cited, crossing back above the 25-count floor that triggered the forced-pressure rule (added 07-14 at 8/84). Logged that the forcing quota is not currently active.
- **L3 duplicate cluster (25 URLs, all showing stale "canonical → navene-koperweis"):** live-curled 2 sample URLs — both have correct, self-referencing canonicals today. This is stale GSC index data from an already-fixed historical bug, not a live issue. No action; watch it shrink next snapshot.
- Founder ideas: inbox empty. GSC content-gap: none this run.

### State delta
- ai-fix backlog: 2 → 8 eligible (net of 2 closes + 8 new: #4925, #4926-4930, #4931-4932)
- Org/Sessions/Views (7d): 206/243/589 (reflects the multi-day capacity outage, not a real traffic drop) · GSC: 4,797 impr / 122 clicks / 2.54% CTR / pos 10.2

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: bank empty of fresh items, nothing to triage. ✅ GSC-gap: none. ✅ L1/L2/L3 close-the-loop: done, 1 issue filed (of ≤3 cap), 2 patterns logged as no-action-warranted with evidence. ✅ Starvation playbook: triggered (backlog was 2, bank 0-fresh) — responded via playbook step 2 (proven-pattern surface: roster expansion + band-hub replication) rather than step 3 escalation, since SEO Agent's low output was explained by the same capacity stall, not a supply problem. ✅ Atomic split: both overdue issues split. ✅ Decisions logged.

### Next Run
1. Backlog at 8 — still below the 15 floor; watch the in-progress SEO Agent run (started 10:43, same time as this one) for fresh proposals, and don't re-trigger the starvation playbook again this cycle — one response per event.
2. Confirm #4925 (/tools ssrLinks) ships and next L3 snapshot moves the 2 tools URLs off discovered-not-indexed.
3. #4931 must merge before #4932 starts (slug-collision gate) — if Roadie's dispatcher doesn't respect issue dependencies (known limitation, per the 2026-06-01 tier-gating precedent), watch for this and hold #4932 manually if needed.
4. Watch next L1/L3 snapshot (~2026-07-27) to see if the portnoy/wallgren/bill-ward/duplantier oscillation continues (3rd data point would strengthen the do-not-file verdict further).
5. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

---

## 2026-07-23 11:36 — Cheap pulse: 2 fresh proposals promoted (gear-reference articleBody, gear-news/endorsement-news dateModified+hasPart)

### Context (≤3 lines)
Metrics 11:36 UTC (206 users/243 sessions/589 views 7d — same capacity-outage-affected week as the 10:43 deep run; GSC 4,797 impr/122 clicks/2.54% CTR/pos 10.2, no content-gap rows). Backlog was 8 eligible ai-fix at run start (0 open PRs, all fresh from the 10:43 deep run's splits). 2 fresh untriaged seo-proposals (#4933/#4934, filed 10:52-10:53 UTC, right after the deep run closed out).

### Actions taken
- **Promoted #4933** (Article schema on all 16 gear-reference pages — drumsticks/cymbals/snares/pedals pillars+sub-pages — missing `articleBody`, same bug class as #4912 for drummer profiles) — verified prose already exists in `page.sections`/`page.intro`+`howToChoose`, explicitly declines to fabricate date/image fields it doesn't have data for.
- **Promoted #4934** (`/gear-news` + `/endorsement-news` CollectionPage missing `dateModified`+`hasPart`, following the established `/studies` hub pattern) — verified real `date` fields exist on every entry in both data arrays, flags its own sort-order risk (compute max via reduce, don't assume `[0]`) rather than assuming.
- Searched open+closed issues for both (`articleBody drumsticks cymbals`, `dateModified gear-news`/`hasPart endorsement-news`) — no duplicates, only the related-but-distinct #4912/#4635/#777.
- Founder ideas: inbox empty. GSC content-gap: none (metrics.md confirms). Backlog composition check: all 10 eligible ai-fix items are <1h old (from the 10:43 deep run's atomic splits + this pulse) — no atomic-split candidates.

### State delta
- ai-fix backlog: 8 → 10 eligible (#4933/#4934 promoted)
- Org/Sessions/Views (7d): 206/243/589 (unchanged since 10:43 — same outage week) · GSC: 4,797 impr / 122 clicks / 2.54% CTR / pos 10.2

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: none. ✅ Starvation check: backlog at 10 (<15) but bank replenishing normally post-outage, not forcing playbook step 2 again this soon after the 10:43 trigger/response. ✅ Atomic split: none eligible, all items fresh. ✅ Decisions logged.

### Next Run
1. Backlog at 10 — still below the 15 floor; watch whether SEO Agent's normal cadence tops it up before re-running starvation playbook.
2. Confirm #4925 (/tools ssrLinks) ships and next L3 snapshot moves the 2 tools URLs off discovered-not-indexed.
3. #4931 must merge before #4932 starts (slug-collision gate) — watch for this if Roadie doesn't respect issue dependencies.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

## 2026-07-23 12:30 (state-confirm — anti-noise hold)
- Backlog: 7 ai-fix (all <2h old, none atomic-split eligible) · 0 PRs open · proposals untriaged: 0 (only umbrellas #2211/#3810/#3819)
- Org/Sessions/Views (7d): 206/243/589 · GSC 4,797/122/2.54%/10.2 — unchanged, no content-gap rows
- Blockers unchanged: #875/#529/#526/#525 — no re-spam; #4925 shipped (PR #4936), #4926/#4927 shipped, #4931/#4932 gate still intact (neither merged yet)
- Actions: none — 5 PRs merged since 11:36 (normal fast drainage, not a new starvation event; per 10:43/11:36 guidance, holding on re-triggering the playbook this cycle)
- Next check: next hourly pulse; re-run starvation playbook only if backlog stays <15 AND bank stays ≤2 past the next SEO Agent cycle

---

---

---

---

## 2026-07-23 15:37 — Mid-day pulse: 3 fresh proposals promoted (HowTo date fields, 2 batches + 1 singleton)

### Context (≤3 lines)
Metrics 15:37 UTC (207 users/245 sessions/591 views 7d; GSC 5,688 impr/150 clicks/2.64% CTR/pos 10.2, no content-gap rows). Backlog was 5 eligible ai-fix at run start (0 open PRs — all items from the 10:43/11:36 runs already shipped or drained), 3 fresh untriaged seo-proposals (#4946/#4947/#4948, filed 12:37-12:38 UTC).

### Actions taken
- **Promoted #4946** (HowTo schema on 67 `/guides/how-to-sound-like-<drummer>` pages omits already-authored `datePublished`/`dateModified`) — verified fields exist on all 67 data entries, fix is additive (2 lines), no fabrication.
- **Promoted #4947** (same bug class, 278 `/guides/best-<gear>-for-<genre>` pages — sibling Article node already emits the dates correctly, only the paired HowTo node omits them) — verified pattern match, no fabrication.
- **Promoted #4948** (`/compare/zildjian-vs-sabian` Article schema ignores its one authored date pair; correctly scopes out the other 11 undated comparison slugs via conditional spread) — verified only 1/12 gearComparisons entries has real dates, fix respects that.
- Searched open ai-fix + closed issues for all three (`datePublished dateModified HowTo`, `gearComparisons datePublished`, sound-like guide history) — no duplicates.
- Confirmed #4933/#4934 (promoted last run) already carry `ai-fix` correctly; stale `seo-proposal` label left on them is cosmetic, not a re-triage miss.
- Founder ideas: inbox empty (`.agents/ceo/founder-ideas.md` unchanged since 2026-06-19). GSC content-gap: none. #4931/#4932 slug-collision gate still intact (neither merged yet, both open, no premature dispatch). Human-founder blockers #875/#529/#526/#525 unchanged — no re-spam.

### State delta
- ai-fix backlog: 5 → 8 eligible (#4946/#4947/#4948 promoted), all items <5h old — none atomic-split eligible
- Org/Sessions/Views (7d): 207/245/591 (recovering post-outage) · GSC: 5,688 impr / 150 clicks / 2.64% CTR / pos 10.2

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 3/3 fresh triaged and promoted, verified, no duplicates. ✅ GSC-gap: none. ✅ Starvation check: backlog 8 (<15), fresh bank now 0 — but this cycle just topped up backlog from active SEO Agent output within the hour, not a stalled fleet; holding per the 12:30 entry's "one response per event" guidance rather than re-triggering the playbook immediately after normal cadence delivered. ✅ Atomic split: none eligible, all fresh. ✅ Decisions logged.

### Next Run
1. Backlog at 8 — re-run starvation playbook only if it stays <15 AND bank stays ≤2 past the next SEO Agent cycle (per standing guidance).
2. #4931 must merge before #4932 starts (slug-collision gate) — still unmerged, watch for premature dispatch.
3. Confirm #4925 (/tools ssrLinks, shipped as PR #4936) reflected in next L3 snapshot (~2026-07-27).
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

---

## 2026-07-23 21:23 — Evening review: 14 PRs shipped today (strong day), both active epics (bands #4753, songs #4758) now fully phased/closed; capacity stall recurred with roles reversed, held on new surface

### Context (≤3 lines)
Metrics 21:23 UTC (218 users/257 sessions/599 views 7d; GSC 5,688 impr/150 clicks/2.64% CTR/pos 10.2, no content-gap rows). Eligible ai-fix backlog down to **3** (#4931/#4932 bands phase-3 split, gated on each other; #4948 schema fix) and 0 fresh seo-proposals (only standing L1/L2/L3 umbrellas) — starvation trigger technically met again.

### Actions taken
- **Reviewed the day's shipping:** 14 PRs merged since the 10:43 deep run — 5 roster additions (#4926-4930, split of #4748), 2 bands-epic splits still in flight (#4931/#4932), 6 schema/SSR fixes (#4918/4921/4922/4923/4924, #4936 for #4925), 2 Watchdog fixes (#4935/4938), plus 4 more schema batches (#4958/4959/4960/4961 from the 15:37 pulse's promotions). A genuinely productive day.
- **Confirmed both remaining active epics from CLAUDE.md's active-epics list are now complete:** checked #4753 (bands drum-chair) and #4758 (songs/BPM) — every phase issue (#4754-4757, #4759-4762, #4769/#4770) is closed; #4763 (data studies), #4767/#4768 (techniques), #4771 (video round-2) were already closed. Only #4756's re-split (#4931/#4932) remains open, mid-flight. **This means the proven-pattern epic pipeline that fueled most of this week's work is now dry** — worth flagging for the next deep run rather than acting on tonight.
- **Root-caused tonight's proposal drought before treating it as idea-supply starvation:** `seo-agent.yml`/`ceo-agent.yml` failed on the identical signature 4x this evening (14:44→20:22 UTC) — but inspecting the actual log (run 30041816943) showed it's a *recurrence of #4892's capacity class with roles reversed*: primary now weekly-limited (resets ~03:00 UTC tomorrow), backup cycling on shorter session limits (this 21:22 run got through because backup's 8:30pm UTC session window had just reset). Roadie stayed healthy all evening (last success 17:45 UTC) — this is throttling proposal-generation, not implementation. Posted an accuracy update to #4892 (still open, 0 comments from Ricardo) rather than filing a duplicate human-founder issue.
- **Held on Queue-Starvation Playbook step 2 (new surface) tonight** — two reasons, not the usual "capacity means nothing would get consumed" logic (Roadie is fine): (1) the epic pipeline that supplied this week's atomic work just ran dry today (see above), so manufacturing the *next* batch (further roster names, or a new theme-hub epic) needs real sourcing/verification work, not a quick evening pass — better done fresh in tomorrow's deep run; (2) only one starvation trigger+response already happened today (10:43 deep run → roster+bands splits), and the playbook caps at one response per event. Roadie has 3 items (incl. the gated #4931→#4932 pair) for overnight runway.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none. L1/L2/L3 snapshots unchanged since 07-20, next refresh ~07-27. Human-founder blockers #875/#529/#526/#525 unchanged — no re-spam.

### State delta
- ai-fix backlog: 10 (15:37) → 3 eligible (heavy drainage, 14 merges today, thin refill)
- Both tracked active epics (#4753, #4758) now fully closed/shipped — CLAUDE.md's "Active epics" list is stale on these two
- Org/Sessions/Views (7d): 218/257/599 · GSC: 5,688 impr / 150 clicks / 2.64% CTR / pos 10.2 (unchanged since 15:37, same week)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: bank empty of fresh items, nothing to triage. ✅ GSC-gap: none. ✅ Starvation playbook: triggered, root-caused to the known capacity recurrence (not idea supply — see #4892 comment) plus a genuinely dry epic pipeline; held rather than forced, one response per event already spent today. ✅ Atomic split: #4931/#4932 both <11h old, not eligible. ✅ Decisions logged.

### Next Run
1. **Tomorrow's deep run: source the next epic-scale surface** now that bands/songs/techniques/studies/video-round-2 are all shipped — candidates per the starvation playbook step 2: next roster batch beyond today's 5, or a new theme hub (snares/pedals per CLAUDE.md, or brands museum #4386). Don't wait for another starvation trigger to start this — the well is confirmed dry now.
2. Watch primary token reset (~03:00 UTC 2026-07-24) and confirm SEO Agent resumes normal 3x/day cadence.
3. #4931 must merge before #4932 starts (slug-collision gate) — still unmerged, watch for premature dispatch.
4. #875/#529/#526/#525 human-founder blockers unchanged — no re-spam. #4892 updated with tonight's accurate signature, still no action needed from Ricardo beyond the standing 3-option ask.

---

---

---

---

