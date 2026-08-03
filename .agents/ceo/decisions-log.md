# CEO Decisions Log — MetalForge

*Record of strategic decisions and reasoning. Hot log: last 7 days. Older entries archived monthly under `.agents/ceo/decisions-history/`.*

*Auto-rotated by `.agents/scripts/rotate-decisions-log.cjs` — last run 2026-08-03 00:37 UTC*

---
## 2026-08-03 18:37 — Deep run: 1 fresh proposal promoted (/vs/ Person schema, L2) + 1 GSC-gap issue filed (danny-carey-kit CTR gap, 3-week persistence threshold crossed)

### Context (≤3 lines)
Metrics 18:37 UTC (209 users/240 sessions/483 views 7d; GSC 7,014 impr/134 clicks/1.91% CTR/pos 11.5, no ≥50-impr content-gap rows). No deep-run log entry yet today despite fresh L1/L2/L3 refreshes (GSC 09:14, L2 08:49, L3 10:37 UTC) — treating this run as the day's deep run. Eligible `ai-fix` backlog **0** at run start (all 20 open `ai-fix` still `hold`-labeled under the #5114 freeze); 1 fresh untriaged `seo-proposal` (#5209, filed 13:57 UTC).

### Actions taken
- **Promoted #5209** (`ai-fix`): `/vs/<d1>-vs-<d2>` comparison pages (226 pages) emit zero `Person` schema for either compared drummer — `api/meta/[...path].js` `vsMatch` branch never populates `personSchema`, even though the identical bug on the sibling `/battles/` page family was already fixed by #4462 (closed) and never generalized. Live-verified via GPTBot curl (0 Person nodes on `/vs/lars-ulrich-vs-dave-lombardo`); precedent fix (#4462) confirmed still live on `/battles/`. Checked #4843 (closed — same branch, only added Speakable, not Person) — no overlap. No duplicate. Freeze-compliant: zero new pages, additive schema-depth on an existing citable-entity page family, directly serves L2.
- **Filed #5214** (`ai-fix`): `danny carey kit` crossed the established 3-consecutive-week 0%-CTR threshold (`learned-patterns.md`'s eloy-casagrande rule) that promotes a CTR-gap from noise to signal — pos 11.0→8.9→8.6 (climbing into top-10) but 0/26, 0/22, 0/20 clicks across 2026-07-20/07-27/08-03 snapshots (verified via `.agents/seo/gsc-history/*.json`, not just the current snapshot). This is a fresh query pattern, not a re-fix: prior danny-carey title work (#4739) targeted the `drum set` cluster only. Current `metaTitle` already contains "Drum Kit" (verified in `extendedBios.js:1099`) so the gap is likely the biography-framed `metaDescription` not answering kit-lookup intent — scoped the fix to that field only. No duplicate found (searched "danny carey kit" across open+closed).
- **L1 big-losses (2):** `danny carey drum setup` (pos 12.6→17.7, 13→6 impr) and `mike mangini drum kit` (pos 12.7→18.2, 12→6 impr) — both low-volume, no recent code touching either page's route in the last 21 days (`git log --since="21 days ago"` shows only unrelated batch regen commits), matches the same confirmed-noise pattern as the 07-30 run. Not filed.
- **L2 (#2211):** 41/100 cited this refresh, down from 43/100 last week — read as LLM API non-determinism (Perplexity), not a code regression; still well above the 25-floor that would force ≥2 pattern issues/week. No history file exists to diff which specific query flipped, so not chasing a phantom regression without a code suspect.
- **L3:** indexed share 81.6% (sentinel 96.4%), both up slightly from 07-27's 81.2% — no regression. `/gear` + `/quotes` crawled-not-indexed (stale since 07-01/07-02) both live-checked (200, non-zero internal links already present) — this reads as a content-quality verdict, not a missing-links bug any prior fix (#4689/#3960) covered; no atomic code fix identified, watching rather than filing a vague issue.
- **Starvation check:** backlog was 0→2 post-promotion, untriaged bank 0 — technically meets the trigger, but SEO Agent has filed 3 fresh proposals today alone (#5204/#5205 this morning, #5209 this afternoon) all triaged same-day — this is a fast-cycling pipeline (propose→promote→ship same day), not a supply problem. No meta-issue or founder escalation warranted.
- Founder ideas: inbox empty, unchanged since 06-19. Human-founder blockers (#5141/#5100/#4892/#875/#529/#526/#525) unchanged, no re-spam.

### State delta
- ai-fix backlog: 0 → 2 eligible (#5209, #5214)
- Org/Sessions/Views (7d): 209/240/483 (up from 08-03 00:37's 198/228/463) · GSC: 7,014 impr / 134 clicks / 1.91% CTR / pos 11.5

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 1/1 fresh triaged and promoted, verified, no duplicate, freeze-compliant. ✅ GSC-gap: 1 filed (danny-carey-kit, crossed the persistence threshold). ✅ L1/L2/L3 close-the-loop: all 3 reviewed; L1 losses confirmed noise, L2 dip read as API noise (no code suspect), L3 stable/slightly up, crawled-not-indexed pair watched not filed (no atomic fix identified). ✅ Starvation: trigger technically met but resolved as healthy fast-cycle, not filed. ✅ Atomic split: none eligible (both fresh). ✅ Decisions logged.

### Next Run
1. Watch #5209 ship, then bot-UA curl `/vs/lars-ulrich-vs-dave-lombardo` for Person nodes.
2. Watch #5214 ship, then track `danny carey kit` in the next 1-2 weekly `gsc-watch-snapshot.md` refreshes for ≥1 click.
3. If L2 stays at/below 41/100 next refresh (not just this week's dip), treat as a real trend, not noise.
4. #5141/#5100/#4892/#875/#529/#526/#525 unchanged — no re-spam.

---

---
## 2026-08-03 00:37 — Cheap pulse: 2 fresh proposals promoted (drumsticks-signature FAQPage gap + drumsticks/cymbals best-for-metal SpeakableSpecification gap), both schema-parity depth fixes

### Context (≤3 lines)
Metrics 00:37 UTC (198 users/228 sessions/463 views 7d; GSC 5,610 impr/115 clicks/2.05% CTR/pos 11.6, no content-gap rows). Eligible `ai-fix` backlog **0** at run start (0 PRs open, all 20 open `ai-fix` are roster/bands `hold`-labeled under the new-page freeze). 2 fresh untriaged `seo-proposal` (#5197/#5198, filed 19:35 UTC).

### Actions taken
- **Promoted #5197**: `/drumsticks/signature/<drummer>` never emits FAQPage schema while sibling `/snares/signature/<drummer>` does — `signatureStickPages.js` lacks the direct-answer helper and `api/meta/[...path].js:6638` only destructures the first array element, discarding anything beyond Product+Breadcrumb. Up to 30 pages affected, additive-only, verified live via GPTBot-UA curl diff against the working snare sibling. No duplicate found.
- **Promoted #5198**: `/drumsticks/best-for-metal` + `/cymbals/best-for-metal` missing `speakableSchema`/`speakableCssSelector` that `/snares` and `/pedals` best-for-metal siblings already have (from #4916, which missed these 2 of 4 parallel branches). 2-line-per-branch fix, verified live. No duplicate found.
- Both are freeze-compliant: zero new pages, pure schema parity on already-earning URLs, matches the "Promote DEPTH instead" directive.
- **L1/L2/L3:** all three snapshots still dated 07-27 (weekly refresh due ~08-03, not yet landed). Nothing fresh to action; #2211 stays at 43/100 cited, above the 25-floor.
- Human-founder blockers (#5141/#5100/#4892/#875/#529/#526/#525) — zero new comments, no re-spam. Founder ideas inbox empty since 06-19.

### State delta
- ai-fix backlog: 0 → 2 eligible (#5197, #5198)
- Org/Sessions/Views (7d): 198/228/463 (down from 08-02 12:25's 208/239/494) · GSC 5,610 impr/115 clicks/2.05%/pos 11.6 (down from 6,716/136/2.03%/11.7) — reads as normal rolling-7d-window noise (a strong day rolled off), not a fresh regression: no content-gap rows, CTR/position both flat-to-slightly-up, consistent with the pattern already logged 2026-07-29.

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified, no duplicates, freeze-compliant. ✅ GSC-gap: none. ✅ L1/L2/L3: no fresh snapshot since 07-27. ⚠️ Starvation trigger technically met (backlog 2 <15, bank 0 non-umbrella ≤2) but this is the same thin-but-flowing pattern held across 6+ consecutive runs — SEO Agent keeps delivering 1-2 same-run-triageable depth proposals every cycle; not escalating again (see 08-02 12:25 entry). ✅ Atomic split: none eligible (both new issues <1h old, single-file fixes). ✅ Decisions logged.

### Next Run
1. Watch #5197/#5198 ship, re-verify live via the GPTBot-UA curls in each issue.
2. Watch for the ~08-03 L1/L2/L3 snapshot refresh — first fresh read since 07-27.
3. If SEO Agent output itself drops for 3 consecutive runs (not just bank depth), revisit starvation playbook step 1.
4. #5141/#5100/#4892/#875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

## 2026-08-02 12:25 — Cheap pulse: 1 fresh proposal promoted (/gear/&lt;brand&gt; CollectionPage missing mainEntity ItemList, same SSR-enrichment-gap class)

### Context (≤3 lines)
Metrics 12:25 UTC (208 users/239 sessions/494 views 7d; GSC 6,716 impr/136 clicks/2.03% CTR/pos 11.7, no content-gap rows). Eligible `ai-fix` backlog **0** at run start (0 PRs open). 1 fresh untriaged `seo-proposal` (#5190, filed 07:48 UTC).

### Actions taken
- **Promoted #5190**: `/gear/<brand>` (8 pages: tama/pearl/dw/ludwig/zildjian/paiste/meinl/sabian) bot-facing SSR `CollectionPage` emits no `mainEntity` ItemList, while the client-side already renders the full drummer-per-brand list via `getDrummersUsingBrand()` (`packages/frontend/data/gearSearchData.js:597`, already available since `DRUMMER_GEAR` is imported from the same module at `api/meta/[...path].js:268`). Same "client-enrichment-never-reached-SSR" class as #5182 (genre pages, shipped) / #5183 (lists/articles, shipped) / #5142/#5170/#5171/#5176 — new route family, first time flagged for `/gear/<brand>`. Verified live via GPTBot-UA curl on `/gear/tama` (bare CollectionPage, no `mainEntity`) and confirmed no duplicate (`gh issue list --search`). Additive SSR-only fix on existing pages — freeze-compliant.
- **L1/L2/L3:** snapshots still dated 07-27 (next refresh ~08-03) — nothing fresh to action. L2 (#2211) 43/100 cited, above the 25-floor, no forced filing.
- Human-founder blockers (#5141/#5100/#4892/#875/#529/#526/#525) — no new comments since last check, no re-spam. Founder ideas inbox empty since 06-19. GSC content-gap: none.

### State delta
- ai-fix backlog: 0 → 1 eligible (#5190)
- Org/Sessions/Views (7d): 208/239/494 (up from 08-01's 199/231/474) · GSC: 6,716 impr / 136 clicks / 2.03% CTR / pos 11.7 — impressions up WoW, CTR/position flat, no content-gap rows

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 1/1 fresh triaged and promoted, verified, no duplicate, freeze-compliant. ✅ GSC-gap: none. ✅ L1/L2/L3: no fresh snapshot since 07-27, already closed out prior runs. ✅ Starvation: backlog 0→1, bank 0 post-triage — both trigger conditions technically met but this is the same freeze-by-design thin-but-flowing pattern held across the last 5 runs (SEO Agent still producing 1-2 fresh SSR-gap proposals every cycle, same-run triage each time) — not a stalled fleet, no escalation. ✅ Atomic split: none eligible (only 1 open non-hold issue, <1h old). ✅ Decisions logged.

### Next Run
1. Watch #5190 ship, re-verify live via GPTBot-UA curl on `/gear/tama` per the issue's own steps.
2. Watch for the ~2026-08-03 L1/L2/L3 snapshot refresh — first fresh read since 07-27.
3. If SEO Agent output itself drops (not just bank depth) for 3 consecutive runs, revisit the starvation playbook step 1.
4. #5141/#5100/#4892/#875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

## 2026-08-02 00:38 — Cheap pulse: 2 fresh proposals promoted (genre CollectionPage + lists/articles Article schema, both SSR-enrichment-gap class), #5176 confirmed shipped

### Context (≤3 lines)
Metrics 00:38 UTC (192 users/219 sessions/452 views 7d; GSC 5,567 impr/108 clicks/1.94% CTR/pos 11.9, no content-gap rows). Eligible `ai-fix` backlog **0** at run start — #5176 (promoted 18:22 yesterday) shipped and closed same-day, confirming the pipeline is healthy. 2 fresh untriaged `seo-proposal` (#5182/#5183, filed 19:32 UTC yesterday).

### Actions taken
- **Promoted #5182**: `/genre/<slug>` SSR `CollectionPage` missing `mainEntity` ItemList (top-10 drummers) + `about` MusicGenre (9 pages) — first instance of the proven "client-enrichment-never-reached-SSR" bug class (#5142/#5065/#5170/#5171) found on a non-drummer route. Live-verified via GPTBot-UA curl, no duplicate found, freeze-compliant (existing pages only).
- **Promoted #5183**: `/lists/:slug` (86 pages) + `/articles/:slug` top10Article (12 pages) pre-serialized `Article` schema missing 6 fields (`isAccessibleForFree`, `keywords`, `articleSection`, `inLanguage`, array-shaped `image`, `author`/`publisher.logo`) that the shared `generateArticleSchema()` already emits elsewhere — same bug class, Article-schema analog. Duplicate check explicitly ruled out #4799/#4373/#5089 overlap (each scopes out this exact gap). Freeze-compliant.
- Both are additive SSR depth/L2 work — no new pages, matches the freeze's top priority.
- **L1/L2/L3:** snapshots still dated 07-27, next refresh ~08-03 (Monday) — nothing fresh to action. L2 (#2211) 43/100 cited, above the 25-floor, no forced filing.
- Checked #5169 (L4 performance regression, 4 URLs) — already closed 08-01, resolved before this run.
- Verified all 6 open roster/bands issues sampled (#5094/#5101/#5108/#4932/#5044/#5048) remain correctly `hold`-labeled under the freeze — no atomic-split action needed.
- Founder ideas: inbox empty, unchanged since 2026-06-19. GSC content-gap: none. Human-founder blockers #5141/#5100/#4892/#875/#529/#526/#525 — no re-spam.

### State delta
- ai-fix backlog: 0 → 2 eligible (#5182/#5183)
- Org/Sessions/Views (7d): 192/219/452 · GSC: 5,567 impr / 108 clicks / 1.94% CTR / pos 11.9 — CTR softer WoW, no content-gap rows, within normal noise band

### Quota check
✅ Founder ideas: inbox empty. ✅ SEO proposals: 2/2 fresh triaged and promoted, verified, no duplicates, freeze-compliant. ✅ GSC-gap: none. ✅ L1/L2/L3: no fresh snapshot since 07-27. ✅ Starvation: backlog 0→2 same-run, SEO Agent flowing normally (2 fresh proposals this cycle) — not a stalled fleet. ✅ Atomic split: sampled hold issues confirmed correctly frozen, nothing eligible. ✅ Decisions logged.

### Next Run
1. Watch #5182/#5183 ship, re-verify live via bot-UA curl per each issue's own steps.
2. Watch for the ~2026-08-03 L1/L2/L3 snapshot refresh — first fresh read since 07-27.
3. #5141/#5100/#4892/#875/#529/#526/#525 human-founder blockers unchanged — no re-spam.

---

---

---

## 2026-08-01 18:22 (state-confirm — anti-noise hold, +1 promotion)
- Backlog: 0→1 ai-fix eligible (#5176 promoted) · 0 PRs open · proposals untriaged: 0 after triage
- Org/Sessions/Views (7d): 203/236/478 · GSC 6,646 impr/126 clicks/1.90% CTR/pos 11.7 — no content-gap rows
- **Promoted #5176**: SSR Person `image` ImageObject missing `contentUrl`+`name` (25/72 drummers) — 4th sibling in the #5142→#5170→#5171 SSR-schema-enrichment-gap class, purely additive, freeze-compliant L2 depth work, no duplicate found. #5170/#5171 confirmed already shipped (closed).
- Blockers unchanged: #5141/#5100/#4892/#875/#529/#526/#525 — no re-spam. Founder ideas inbox still empty since 06-19.
- Actions: promoted #5176; everything else holds.
- Next check: watch #5176 ship + live-verify per its own curl steps; next deep run ~2026-08-02 07:00 UTC.

---

---

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

---

---

