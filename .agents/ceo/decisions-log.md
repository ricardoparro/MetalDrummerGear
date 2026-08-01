# CEO Decisions Log — MetalForge

*Record of strategic decisions and reasoning. Hot log: last 7 days. Older entries archived monthly under `.agents/ceo/decisions-history/`.*

*Auto-rotated by `.agents/scripts/rotate-decisions-log.cjs` — last run 2026-08-01 12:24 UTC*

---
## 2026-08-01 18:22 (state-confirm — anti-noise hold, +1 promotion)
- Backlog: 0→1 ai-fix eligible (#5176 promoted) · 0 PRs open · proposals untriaged: 0 after triage
- Org/Sessions/Views (7d): 203/236/478 · GSC 6,646 impr/126 clicks/1.90% CTR/pos 11.7 — no content-gap rows
- **Promoted #5176**: SSR Person `image` ImageObject missing `contentUrl`+`name` (25/72 drummers) — 4th sibling in the #5142→#5170→#5171 SSR-schema-enrichment-gap class, purely additive, freeze-compliant L2 depth work, no duplicate found. #5170/#5171 confirmed already shipped (closed).
- Blockers unchanged: #5141/#5100/#4892/#875/#529/#526/#525 — no re-spam. Founder ideas inbox still empty since 06-19.
- Actions: promoted #5176; everything else holds.
- Next check: watch #5176 ship + live-verify per its own curl steps; next deep run ~2026-08-02 07:00 UTC.

---

## 2026-08-01 12:30 — Deep run: 2 fresh proposals promoted (SSR Person nationality + memberOf/@id gaps, both L2), #5142 caption confirmed shipped live, no starvation escalation

### Context (≤3 lines)
Metrics 12:24 UTC (199 users/231 sessions/474 views 7d; GSC 5,414 impr/99 clicks/1.83% CTR/pos 11.6, no content-gap rows). Eligible `ai-fix` backlog **0** at run start (20 open `ai-fix` still `hold`-labeled under the #5114 freeze). 2 fresh untriaged `seo-proposal` (#5170/#5171, filed 07:52 UTC).

### Actions taken
- **Promoted #5170** (SSR Person JSON-LD never emits `nationality`, though `App.js` sets it client-side and `drummer.country` exists for all 72 drummers) — verified live via GPTBot-UA curl on `/drummer/lars-ulrich` (no `nationality` key despite Denmark being in the plain-text description); fix is additive on an existing field, freeze-compliant depth/L2 work, no duplicate found.
- **Promoted #5171** (SSR Person `memberOf` hardcodes 1 band from legacy `drummer.band` string with no `@id`, instead of calling the already-imported `generateMemberOfFromDrummer()` that the client-side already uses — affects 49/72 multi-band drummers) — verified the function exists at `packages/frontend/data/bands.js:2990-3008` and is already imported (but unused) in `api/meta/[...path].js`; no duplicate found.
- Both are sibling gaps to the already-shipped #5142 (imageAlt caption) / #5065 (sameAs) class — same bug pattern (client-side schema enrichment never reaching the bot-facing SSR surface) — directly serves the freeze's L2/depth priority, zero new pages.
- **Verified #5142 (carried over from 07-31 log):** live GPTBot-UA curl on `/drummer/lars-ulrich` now shows `"image":{"@type":"ImageObject",...,"caption":"Lars Ulrich playing drums live with Metallica on stage"}` — confirmed shipped by the 06:50 UTC batch deploy as expected, not a regression.
- **L1/L2/L3:** all 3 snapshots still dated 07-27 (`gsc-watch-snapshot.md`, `indexation-snapshot.md`) / umbrella issues #3810 (5 actionable, 7 wins/534 queries) and #3819 (37 actionable, 406/500 indexed) unchanged since the 07-30 review — no fresh data, next refresh ~08-03, nothing new to action. L2 (#2211): 43/100 cited, still above the 25-floor, no forced-filing rule triggered (though today's 2 promotions are L2-serving regardless).
- **Starvation check:** eligible backlog was 0 and untriaged bank is now 0 post-promotion — technically both starvation trigger conditions. But SEO Agent output rate is healthy (5+ proposals in the last 3 days, 2 fresh again this morning) and every proposal has been triaged same-day for 4 straight runs (07-30/07-31/08-01) — this is the freeze producing a thin-but-flowing queue by design (fewer depth-only proposals exist than page-creation ones did), not a stalled fleet. No escalation; would reconsider only if SEO Agent output itself drops for 3 consecutive runs, which hasn't happened.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none. Human-founder blockers #5141/#5100/#4892/#875/#529/#526/#525 — no new comments, no re-spam.

### State delta
- ai-fix backlog: 0 → 2 eligible (#5170/#5171 promoted)
- Org/Sessions/Views (7d): 199/231/474 (up from 07-31's 167/200/446) · GSC: 5,414 impr / 99 clicks / 1.83% CTR / pos 11.6 (CTR softer WoW, no content-gap rows — within normal noise band per `learned-patterns.md` CTR-noise thresholds)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified, no duplicates, freeze-compliant. ✅ GSC-gap: none. ✅ L1/L2/L3: no fresh snapshot since 07-27, already closed out prior runs. ✅ Starvation: both trigger conditions technically met but attributed to freeze-by-design + healthy SEO Agent cadence, not a stalled fleet — no escalation. ✅ Atomic split: none eligible (only 2 open non-hold issues, both <1h old). ✅ Decisions logged.

### Next Run
1. Watch #5170/#5171 ship and re-verify live via GPTBot-UA curl per each issue's own verify steps.
2. Watch for the ~2026-08-03 L1/L2/L3 snapshot refresh — first fresh read since 07-27.
3. If SEO Agent output itself drops (not just bank depth) for 3 consecutive runs, revisit the starvation playbook step 1.
4. #5141/#5100/#4892/#875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---
## 2026-07-31 00:38 — Cheap pulse: 1 fresh proposal promoted (dead-code duplicate-key landmine), #5142 deploy-lag confirmed as expected batching, not a regression

### Context (≤3 lines)
Metrics 00:37 UTC (167 users/200 sessions/446 views 7d; GSC 5,482 impr/110 clicks/2.01% CTR/pos 11.5, no content-gap rows). Eligible `ai-fix` backlog **0** at run start (20 open `ai-fix` still `hold`-labeled under the #5114 freeze, unchanged). 1 fresh untriaged `seo-proposal` (#5144, filed 19:34 UTC).

### Actions taken
- **Promoted #5144** (`ai-fix`): homepage bot-shell's `getMetaForPath()` defines `faqSchema` twice in the same object literal (lines 628-637 and 646-655, byte-identical) — dead code today (second key wins, live FAQ output is correct) but a landmine for silent divergence on the next edit. Root cause: #5135 was independently fixed by two Roadie PRs (#5137, #5140) that both merged clean (no line overlap) but left a duplicate key. Verified via direct grep of both blocks; no duplicate issue found; freeze-compliant (cleanup on an existing page, zero new surface).
- **Verified #5142's ship** (this run's own carry-over item): live bot-UA curl of `/drummer/lars-ulrich` still shows a bare `image` string, not the `ImageObject`+`caption` the merged code (`api/meta/[...path].js:5721-5727`) should produce. Traced this to `deploy-prod.yml` — production deploys are **batched once/day at ~06:50 UTC**, not per-merge (`git.deploymentEnabled.main = false`); #5143 merged 13:54 UTC yesterday, so today's 06:50 UTC run is the first deploy that will actually ship it. Confirmed the batched-deploy cron has run cleanly 5/5 days straight (no stuck queue). **Not a regression** — re-verify after today's ~07:00 UTC deploy, not before.
- **L1/L2/L3:** snapshots unchanged since 07-27 (confirmed via `git log` on all three files), next refresh ~08-03 — nothing fresh to triage, already closed out in the 07-30 12:37 run.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none. Human-founder blockers #875/#529/#526/#525/#4892/#5100/#5141 — no re-spam.

### State delta
- ai-fix backlog: 0 → 1 eligible (#5144)
- Org/Sessions/Views (7d): 167/200/446 (up slightly from 07-30's 174/211/453 rolling window) · GSC: 5,482 impr / 110 clicks / 2.01% CTR / pos 11.5

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 1/1 fresh triaged and promoted, verified, no dupe, freeze-compliant. ✅ GSC-gap: none. ✅ L1/L2/L3: no fresh snapshot, already closed out. ✅ Starvation: backlog 0→1, still critically thin — this is the 3rd deep-adjacent run at this level since the freeze (07-28, 07-30, now); watching for the 3-consecutive-thin-run bar at the next true deep run (~07:00 UTC today) before considering a step-1 (SEO Agent prompt/quota) meta-issue. ✅ Atomic split: all 20 held issues are frozen page-creation work, not stalled — nothing eligible. ✅ Decisions logged.

### Next Run
1. Today's deep run (~07:00 UTC): re-verify #5142's caption is live post-deploy; if still bare after the 06:50 UTC batch, that IS a regression worth filing.
2. If backlog is still ≤2 with SEO Agent again producing ≤1 proposal, that's the 3-consecutive-thin-run bar — file a step-1 prompt/quota meta-issue (new-surface response stays excluded per the freeze).
3. #5141 (studies backlink outreach) and #5100 (L2 recovery items) are live founder asks — no re-spam.
4. #875/#529/#526/#525/#4892 unchanged — no re-spam.

---

---

---

## 2026-07-30 12:37 — Deep run: 1 fresh proposal promoted (SSR Person schema image caption, L2), L1 big-losses confirmed noise (no code suspect), backlog still 0-eligible under freeze

### Context (≤3 lines)
Metrics 12:37 UTC (174 users/211 sessions/453 views 7d; GSC 6,507 impr/140 clicks/2.15% CTR/pos 11.4, no content-gap rows). No log entry since 07-29 00:33 (36h gap — consistent with cheap-pulse holds going unlogged per the anti-noise rule, nothing changed until now). Eligible `ai-fix` backlog **0** at run start (20 open `ai-fix` still `hold`-labeled under the #5114 freeze, unchanged); 1 fresh untriaged `seo-proposal` (#5142, filed 07:56 UTC).

### Actions taken
- **Promoted #5142** (`ai-fix`): SSR bot-facing Person schema (`api/meta/[...path].js`, both drummer-profile branches ~L3807/~L5715) emits a bare `image` URL string with no caption, even though `extendedBios.js` has hand-authored `imageAlt` for 25/72 drummers. Verified live: grepped both branches, confirmed bare-string pattern at both sites; confirmed `imageAlt` count (25) via the issue's own node one-liner. Correctly scoped as distinct from #1174/#4632 (those fixed `App.js` client-side JSON-LD only — invisible to non-executing crawler bots). No duplicate found. Freeze-compliant: schema enrichment on existing URLs, directly serves L2 (LLM citation surface), zero new pages.
- **L1 (GSC watch, `.agents/seo/gsc-watch-snapshot.md`, generated 07-27, still the latest — next refresh ~08-03):** 3 big-losses (danny carey drum kit/drum set, mike mangini drum set) + 2 CTR-gaps (danny carey kit, bill ward drum kit), all already reviewed once in the 07-28 12:40 run. Re-checked for a code suspect this run per the established `learned-patterns.md` rule (mechanical big-loss without a suspect = noise, don't file): `git log --since="21 days ago"` on mike-mangini/danny-carey/bill-ward touches nothing but unrelated batch files (llms regen, video sitemap) — no page-level change in the window. All 5 rows are low-volume (8-35 impr) exactly like the prior confirmed-noise cases (Shannon Larkin, Portnoy/Wallgren oscillation). **No issue filed** — logging as confirmed noise, not escalating evidence.
- **L3 (indexation, generated 07-27):** unchanged from 07-28's review (81.2% indexed share, 1 `crawled-not-indexed` on `/drummers`, 36 URLs still canonicalizing to `/drummer/navene-koperweis`). That duplicate cluster already has a closed fix (#4621, 07-14) — same self-heal-pending pattern as the meta-shell saga's jay-weinberg cluster; not re-opening without a fresh regression signal.
- **L2 (#2211):** 43/100 cited, still above the 25-floor that forces ≥2 pattern issues/week — no forced filing.
- **Studies-epic/backlink-authority (freeze's named top priority):** confirmed **#5141** ("Backlink outreach for the 4 shipped /studies pages") already filed as `human-founder` this morning (07:00 UTC) — covers exactly the open question the 07-28 run flagged (new `/studies/<topic>` page arguably counts as new-page surface, needs a founder call, not a rushed one). No duplicate needed.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none.

### State delta
- ai-fix backlog: 0 → 1 eligible (#5142)
- Org/Sessions/Views (7d): 174/211/453 (up from 07-29's 167/197/403) · GSC: 6,507 impr / 140 clicks / 2.15% CTR / pos 11.4 (impressions up, CTR/position softer — within normal WoW range, no content-gap rows)

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 1/1 fresh triaged and promoted, verified, no duplicate, freeze-compliant. ✅ GSC-gap: none. ✅ L1/L2/L3 close-the-loop: all 3 reviewed; L1 losses confirmed noise (no suspect), L3 duplicate cluster already has a closed fix awaiting recrawl, L2 above floor. ✅ Starvation: backlog 0→1, still critically thin, but this is the 2nd deep run at this level since the freeze (07-28, now 07-30) — not yet the 3-consecutive-run bar for founder escalation, and new-surface response stays excluded per the freeze. Watching whether the depth-only backlog structurally can't stay above ~2-3 items given SEO Agent's reduced 2x/day cadence. ✅ Atomic split: none eligible (#5142 is fresh). ✅ Decisions logged.

### Next Run
1. Watch #5142 ship, then confirm caption appears on `/drummer/lars-ulrich` bot-UA curl per the issue's own verify steps.
2. If backlog is still ≤2 at the next deep run (~07-31 07:00 UTC) with SEO Agent again producing ≤1 proposal, that's 3 consecutive thin runs — worth a step-1 (prompt/quota) meta-issue per the starvation playbook, not new-page surface.
3. #5141 (studies backlink outreach) and #5100 (L2 recovery items) are live founder asks — no re-spam.
4. #875/#529/#526/#525/#4892 unchanged — no re-spam.

---

---

---

## 2026-07-29 00:33 (state-confirm — anti-noise hold)
- Backlog: 0 ai-fix eligible (20 open ai-fix all `hold`-labeled under the freeze — unchanged from the 12:40 deep run) · 0 PRs open · proposals untriaged: 0 (only 3 standing L1/L2/L3 umbrellas #2211/#3810/#3819)
- Org/Sessions/Views (7d): 167/197/403 · GSC 5,269/136/2.58%/pos 11.0 — no content-gap rows, WoW dip reads as normal rolling-window noise, not a fresh regression
- Blockers unchanged: #875/#529/#526/#525/#5100 — no re-spam; #4892 stays resolved-watching (Roadie + PR Merger both healthy per recent successful runs). Freeze (CLAUDE.md, #5114) still binding.
- Actions: none — SEO Agent's 19:28 UTC run (first clean run post-#5113-throttle) shipped 0 fresh proposals; only 1 data point since the 2x/day cadence change, not yet the 3-run pattern the starvation playbook's step 1 requires before filing a prompt-tune meta-issue. L1/L2/L3 snapshots unchanged since 07-27, already closed out in the 12:40 deep run.
- Next check: tomorrow's deep run (~07:00 UTC) — watch whether that SEO Agent run also yields 0 proposals; if so, that's 2/2 clean runs at 0 and worth a step-1 meta-issue before any founder escalation (new-surface step 2 stays excluded per the freeze).

---

---

---

## 2026-07-28 12:40 — Deep run: first log entry in 56h (both subscriptions hit weekly quota); new-page freeze now binding; backlog 0→3 via 3 verified depth/bug-fix promotions, incl. a live homepage-citation-blocking regression

### Context (≤3 lines)
Metrics 12:40 UTC (192 users/228 sessions/448 views 7d; GSC 6,160 impr/164 clicks/2.66% CTR/pos 11.0, no content-gap rows). No decision-log entry since 07-26 04:11: `ceo-agent.yml` failed on the quota-exhaustion signature every run from 07-26 09:38 through 07-28 06:48 (primary weekly limit resets Jul 31, backup Jul 30) — Ricardo diagnosed and fixed this himself this morning (#5113: SEO 12x→2x/day, CEO 8x→4x/day, freeing quota for Roadie) and separately shipped **#5114: new-page freeze + LLM-first mode**, both merged ~10:30 UTC today. Eligible `ai-fix` backlog was **0** at run start — every open `ai-fix` (22 issues: roster batch #5094-5108, bands re-split #5040-5048/#4932) is `hold`-labeled, applied by Ricardo himself (`ricardoparro`, 09:42 UTC) ahead of the freeze — correct, all of it is new-entity/new-page work now banned. `seo-proposal` bank had 3 fresh items (#5109/#5111/#5112) plus the 3 standing L1/L2/L3 umbrellas.

### Actions taken
- **Read the freeze block (CLAUDE.md, binding as of today) before touching anything.** No new pages; promote depth/CTR/schema/data-rot on existing URLs; L2 outranks equal L1; studies epic #4763 (backlink play) is top strategic priority; dead-tail cleanup encouraged; starvation playbook may no longer answer with new surface.
- **Promoted #5111** (`ai-fix` + `priority`): homepage bot meta-shell broken again — **4th occurrence** of the #4368→#4727→#5038 regression class, root-caused this time to `middleware.js:39` rewriting to `/api/meta/?path=`, which Vercel 308-redirects (empty catch-all segment) before the function ever runs. Live-verified via the issue's own cache-busted curls (no `x-meta-handler`, 0 JSON-LD blocks on the homepage since 07-25). This blocks every crawler UA (Googlebot, GPTBot, PerplexityBot, ClaudeBot, etc.) from seeing Organization/WebSite schema on the site's #1 organic page — directly suppresses L2, the KPI the freeze just made primary. Highest priority in the queue.
- **Promoted #5112**: `SITE_LASTMOD` sitemap constant frozen at 2026-06-26 (32 days stale) despite dozens of shipped batches since — one-line bump, not a `new Date()` regression of the #1072 bug it fixes. Data-rot / freshness-signal fix, exactly the class the freeze encourages.
- **Promoted #5109**: 3 orphaned pre-rename article slugs (`*-arsenal`) serve byte-identical duplicate title/meta to their canonical `whats-in-*-kit` counterparts; fix adds a 301 map and removes the dead entries. Dead-tail/duplicate-content cleanup, explicitly encouraged by the freeze, no new pages.
- All 3 searched against open+closed issues first (`gh issue list --search`) — no duplicates; each issue's own diff scope is additive/corrective, no fabricated data.
- **Did not touch** the 22 `hold`-labeled roster/bands issues — correctly frozen by Ricardo already; leaving them held (not closing) matches the freeze's "close or hold" instruction and preserves the sourcing work if the freeze ever lifts.
- **L2 check:** #2211 refreshed 07-27 08:49 — 43/100 cited (Perplexity), well above the 25-count floor that would force ≥2 pattern issues/week (that rule is currently inactive per `learned-patterns.md` 07-23 note). No forced L2 filing needed this run.
- **L1/L3 check:** both snapshots fresh (`gsc-watch-snapshot.md`/`indexation-snapshot.md`, generated 07-27) — 3 big-losses/2 CTR-gaps/7 big-wins (L1), 81.2% indexed share on this run's 500-URL sample, 1,211/3,180 URLs with any 90d impression (the freeze's own headline stat). Nothing new to action beyond what's already reflected in the freeze decision itself.
- **Studies epic (#4763, the freeze's named top-priority vehicle) confirmed fully closed/shipped** (all phases). Sourcing a genuinely new backlink-authority angle (next studies topic, or actual outreach — which likely needs founder involvement per the external-partnerships guardrail) needs real research, not a same-run reaction — flagged for the next deep run rather than freelancing something under the freeze's "no new pages" constraint (a new `/studies/<topic>` page is arguably itself new-page surface; needs a considered call, not a rushed one).
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none. Human-founder blockers #875/#529/#526/#525/#5100 unchanged — no re-spam. #4892 (capacity) superseded by #5113's fix; Roadie + PR Merger both ran successfully in the last hour (11:53/12:27 UTC) — quota crisis looks resolved, watching rather than declaring victory prematurely (weekly resets aren't until Jul 30/31).

### State delta
- ai-fix backlog: 0 → 3 eligible (#5109/#5111/#5112)
- New-page freeze + LLM-first mode now binding (CLAUDE.md); SEO cadence 12x→2x/day, CEO 8x→4x/day (~every 6h)
- Org/Sessions/Views (7d): 192/228/448 · GSC: 6,160 impr / 164 clicks / 2.66% CTR / pos 11.0

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 3/3 fresh triaged and promoted, verified, no duplicates, all freeze-compliant (no new pages). ✅ GSC-gap: none. ✅ L1/L2/L3 close-the-loop: all 3 snapshots fresh, reviewed, nothing new to file. ✅ Starvation: backlog was 0 (trigger met) — resolved via non-page-creating promotions per the freeze's amended playbook, no founder escalation needed. ✅ Atomic split: all held issues are policy-paused, not stuck/oversized — none eligible. ✅ Decisions logged (first entry in 56h — see context above for why).

### Next Run
1. Watch #5111 ship first (highest impact — live crawler-visibility bug on the homepage, directly suppresses L2).
2. Confirm the next `check-indexation`/`check-llm-citations` cycle reflects #5111/#5112/#5109 once deployed.
3. Source the next studies-epic phase or backlink-authority angle deliberately (not reactively) — first candidate for the next deep run, per the freeze's "top strategic priority" framing.
4. Watch whether Roadie's cadence stays healthy past today given the weekly quota resets (backup Jul 30, primary Jul 31) — don't re-diagnose #4892's class if it recurs, it's already root-caused and fixed by #5113.
5. #875/#529/#526/#525/#5100 human-founder blockers unchanged — no re-spam.

---

---

---

---

## 2026-07-26 04:11 (state-confirm — anti-noise hold, post-outage recovery)
- Backlog: 7 ai-fix (6 bands re-split #5043-5048 + #5089 schema batch) · 0 PRs open · proposals untriaged: 0 (only standing umbrellas #2211/#3810/#3819)
- Org/Sessions/Views (7d): 197/243/436 · GSC 4,809 impr/151 clicks/3.14% CTR/pos 10.6 — no content-gap rows
- Blockers unchanged: #875/#529/#526/#525/#4892 — no re-spam (github-actions auto-posted #4892's 3rd occurrence update at 00:24, still same 3 options, no new decision needed)
- Actions: none — recovered from the 21:16→04:11 capacity gap (ceo-agent failed 18:15/21:15, seo-agent failed 18:16/20:18/22:17, both cleared by 00:2x); confirmed via issue checks that snares(#4308)/pedals(#4387)/brands-museum(#4386) epics and the last roster batch (#4748) are all closed — the "proven surface" starvation-playbook options are mined out, and SEO Agent's last 2 runs (00:27, 03:01) filed 0 proposals, explicitly logging "schema sweep exhausted." Backlog still has runway (6/7 items are bands-epic re-split, not schema batches), so holding rather than rushing new-surface sourcing in a cheap pulse.
- Next check: **07:00 UTC deep run must source genuinely new epic-scale surface** (not another schema micro-fix sweep or hub replication — those are exhausted) — candidates need real research: drummer roster gaps vs competitors, or a decision on the parked i18n-plan.md (unlock condition now met per CLAUDE.md) / L2 recovery items awaiting founder go.

---

---

---

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

---

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

---

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

---

---

---

