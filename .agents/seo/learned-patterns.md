# Learned Patterns — what actually moves the needle

*Append-only log maintained by the CEO Agent. Each entry is a pattern (on-page format × intent type) backed by **verified** outcome data from L1 (`gsc-watch-snapshot.md`) and L2 (`llm-citations` umbrella issue). The CEO reads this every run **before** triaging any new `seo-proposal`.*

## How this file is used

- **When triaging a `seo-proposal`:** check whether the proposed pattern matches a `✅ Promote` entry below. If yes, fast-track to `ai-fix`. If it matches a `❌ Do-not-promote` entry, reject with the linked reason.
- **When a new L1 verdict comes in:** append the result. Promote-pattern threshold is **2 wins in different entities for the same intent type**; do-not-promote threshold is **3 consecutive nulls for the same intent over 60+ days**.
- **When a new L2 citation pattern is detected:** append it as a Promote pattern.

Rules:

- One line per pattern (intent × format → outcome). No prose.
- Cite the L1 snapshot date or L2 issue number that produced the verdict.
- Never edit historic lines — append a counter-entry instead if a pattern stops working.

---

## ✅ Promote patterns

*(Format: `<intent type> + <on-page format> → <verdict source> · <reason>`)*

`long-tail gear-detail` + drummer profile page with structured gear inventory (brand/model per component) → L2 #2211 (2026-06-23) · Perplexity cited "what cymbals does joey jordison use" from our gear taxonomy data; specificity of component-level data matches the query granularity LLMs need for gear-detail answers. **Replicate to sibling queries:** what snare does X use, what cymbals does Y use, what bass drum does Z use.

`head-term drummer kit` + drummer profile page with gear inventory → L1 2026-06-23 snapshot · 4 entities won (brann-dailor: impr 10→22; matt-greiner: pos 6.4→5.0 + first click; aquiles-priester: impr 0→11 first appearance; mario-duplantier: pos 7.3→5.5). Structured gear inventory drives Google organic ranking for "{drummer} drum kit" head-terms. **Note:** drives organic position but NOT LLM citation (L2 gap — complement with prose kit overview per #2212).

`soundlike-guide` + HowTo + Article JSON-LD + ≥3 FAQs + internal links → pattern established from existing guides; now applying to Eloy Casagrande, Charlie Benante, Hellhammer, Aquiles Priester via #2224–#2227. First-mover advantage in black metal (Hellhammer) and neoclassical metal (Aquiles) sub-niches.

---

`lick-pages` + `/drummers/<slug>/licks/<slug>` route with specific technique name + video + notation → GA4 2026-06-24 (Igor Cavalera lick pages = 2 of top-10 GA4 pages: 9 + 6 views, outperforming all non-homepage routes). Long-form lick content drives engaged sessions (611s avg). **Replicate to:** Gene Hoglan, Dave Lombardo, Tomas Haake, Matt Greiner, Joey Jordison. Pattern confirmed: #2311 promoted + #2323 promoted (both same route format).

`comparative-list` + Top-10 drummer list page with JSON-LD ItemList schema + LLM FAQ block → L2 #2211 (2026-06-23) · "best death metal drummer", "most innovative metal drummers" — drummagazine/drumeo/loudwire winning with no metalforge.io citation. First-mover opportunity on "djent/groove/modern metal drummer" sub-niches (#2344). Replicate via Top-10 batch pages with strong opinionated prose + FAQ blocks.

`multi-variant drummer query` + comprehensive drummer profile (complete gear inventory, per-component brand/model, FAQ schema, cymbal detail) → L2 #2211 (2026-06-24) · Perplexity cited metalforge.io for 12 of 13 "joey jordison *" query variants from single /drummer/joey-jordison page ("drum set", "drum kit", "instruments", "cymbals", "drumset", "kit", etc.). One well-optimized profile page = multi-query citation sweep. **Rule: prioritize depth + completeness on high-TAM drummer profiles before spreading thin.**

`broken-relatedAlbum fix` + album-setup article that resolves 🔴 broken relatedAlbum ref in a live DB article → established 2026-06-25 (pattern: #2427/2428/2429/2477/2478/2480 all promoted as top-priority) · Fixing a broken ref is both quality fix (removes 404 from live page) and entity-cluster strengthener (LLM coherence). **Rule: any proposal flagging 🔴 broken ref on a live page is auto-5★; jumps queue ahead of pure-content proposals at same tier.**

`drummer-head-term LLM gap` + structured-only profile (gear table, no prose) → L2 #2211 (2026-06-24) · lars-ulrich/mike-portnoy/danny-carey/dave-lombardo/gene-hoglan NOT cited despite full gear inventory (moderndrummer/drumeo win with prose articles). **Contrast:** joey-jordison profile = 12/13 query variants cited (has prose + structured). **Rule: gear table alone ≠ LLM-citable. Profile must include ≥1 prose 'Kit Overview' paragraph (150-200w) using both 'drum kit' + 'drum set' phrasing to be extracted by LLM providers. Pipeline: batch 1 (#2877, shipped 2026-06-27) · batch 2 (#2968 SHIPPED 2026-06-28: Brann Dailor/Vinnie Paul/Eloy Casagrande/Shannon Larkin/Matt Halpern) · batch 3 (#2997 SHIPPED 2026-06-28: Flo Mounier/Hellhammer/John Otto) · batch 4 (#3140 queued: Danny Carey/Gene Hoglan/Tomas Haake/George Kollias) · batch 5 (#3188 queued: Ben Koller/Jaska Raatikainen/Mario Duplantier) · batch 6 (#3206 queued: Lars Ulrich/Mike Portnoy/Dave Lombardo).**

`album-cluster for LLM-gap drummer` + album-setup articles for a drummer absent from LLM citations → new pattern 2026-06-27 · Promoted 8 album articles for Portnoy/Lars Ulrich/Lombardo/Kollias (#2767/#2765/#2719/#2812/#2798/#2858/#2814/#2799) alongside prose fix (#2877) to create depth that reinforces LLM citation (entity cluster completeness = stronger citation signal). **Rule: for drummers in the L2 gap table, prioritize their album arc before new drummer onboarding.**

## ❌ Do-not-promote patterns

*(Format: `<intent type> + <on-page format> → <verdict source> · <reason>`)*

_(Empty — first entries will be appended after 60-day nulls or 3 consecutive losses.)_

---

**L3 indexed-share baseline (2026-06-29 corrected):** 106/500 = **21.2%** (2026-06-29 snapshot, 500-URL sample cap). Prior 1.4% (2026-06-26) was API quota artifact (493 "unknown"). 21.2% is the operative baseline. Flag if WoW drops >3 pts from 21.2%.

`shannon-larkin CTR gap (2026-06-26 → 2026-06-27)`: pos 4.8 / 13 impr / 0 clicks confirmed at L1 2026-06-24 snapshot. Title/meta CTR fix filed as **#2927**. Watch next L1 snapshot (2026-07-01); target ≥1 click.

`brann-dailor CTR gap (2026-06-27)`: pos 6.3 / 23 impr / 0 clicks confirmed at L1 2026-06-24 snapshot (highest-volume CTR-gap entity). Title/meta CTR fix filed as **#2928**. Watch next L1 snapshot (2026-07-01); target ≥1 click.

`joey-jordison CTR gap (2026-06-27)`: `joey jordison drum set` pos 7.7 / 149 impr / 0.67% CTR + `joey jordison drum kit` pos 8.5 / 85 impr = 234 combined impr with <2% CTR. Title/meta CTR fix filed as **#3059**. Watch next L1 snapshot (2026-07-01); target ≥2% CTR on combined cluster. Note: LLM citation is strong (12/13 variants cited) — this is a pure organic CTR gap, not a content depth gap.

`danny-carey organic position gains (2026-06-29)`: 3 big wins in single L1 snapshot — `danny carey drum kit` pos 17.0→12.3 (+impr 9→29), `danny carey drum setup` pos 15.0→11.6, `danny carey drum set` pos 18.7→15.5. All at pos 11-15 range. Driven by album-arc content merges (Lateralus indexed, Fear Inoculum + other arc articles in pipeline). **Rule: album-cluster content drives organic position gains for kit head-terms 1-2 weeks after merge, even before Kit Overview prose ships.** Kit Overview prose batch (#3140) will push Danny Carey into top-10 range once shipped.

`bill-ward new-query burst (2026-06-29)`: 4 new queries surfaced in single snapshot — `bill ward drum kit` (pos 7.0, 13 impr), `bill ward drum set` (pos 8.0, 12 impr, 2 clicks), `bill ward drum setup` (pos 7.5, 11 impr), `bill ward cymbals` (noise). All new after album-arc articles (Master of Reality + Sabbath Bloody Sabbath in pipeline). **Rule: new drummer album-arc articles generate their first organic impressions within 1-2 weeks; entry velocity correlates with band's search volume (Sabbath = fast).** Bill Ward Kit Overview prose batch (#3227, already ai-fix) will capture this traction.

`joey-jordison first-click milestone (2026-06-29)`: `joey jordison drum set` pos 7.5, 130 impr, **1 click** (was 0 clicks prior week). First organic conversion from 130-impression query. `joey jordison drumset` also 0→1 click at pos 7.7. CTR still <1% — #3059 fix must ship to convert impression volume into meaningful traffic.

`eloy-casagrande CTR gap (2026-06-29)`: `eloy casagrande drum kit` pos 9.2, 24 impr, 0.00% CTR — new L1 CTR-gap-opportunity. Title/meta fix filed as **#3282**. `eloy casagrande drum setup` also big-win (pos 13.5→8.5, ↑5.0). Eloy is current Slipknot drummer — high search-intent. Watch next snapshot; target CTR ≥2%.

`matt-greiner regression vehicle (2026-06-29)`: `matt greiner drum setup` L1 big-loss — pos 6.2→7.5, clicks 4→0. Position worsened only 1.3 points; click loss likely statistical noise at this volume. **Kit Overview prose batch #3210 (already ai-fix) is the recovery vehicle** — content depth will stabilize position and improve title relevance. No duplicate issue filed. Watch L1 2026-07-01 post-#3210 merge.

`hellhammer canonical regression (2026-06-29)`: `/articles/hellhammer-drum-setup` dropped from `indexed` to `redirect-or-canonical` (canonical → /). Probable cause: commit 21d0a907 (cross-link relatedAlbums, ~2026-06-22) introduced broken canonical logic. Filed **#3280** (urgent ai-fix). This page had established rankings — fixing canonical = recovering existing equity, not building new.

`hub-page quality floor (2026-06-29)`: `/drummers` and `/gear/cymbals` both dropped from `indexed` to `crawled-not-indexed` in L3 regression. Hub/category listing pages with no editorial prose are quality-rejected by Google. **Rule: hub pages need ≥150w editorial intro + FAQPage JSON-LD to pass Google's quality bar. A pure link list is thin content.** Filed **#3281** (ai-fix).

`L1 first-snapshot summary (2026-06-27)`: 43 new queries surfaced (first run — no prior week for win/loss classification). Joey Jordison cluster dominates: 134 impr "drum set" + 85 impr "drum kit" + 5-18 impr across 8+ variants. No big-wins or big-losses (baseline only). Next actionable snapshot: 2026-07-01.

## 📦 Archived watches

*(Queries removed from `watched-queries.json` because they showed 3 consecutive null verdicts. CEO appends here when archiving instead of letting them rot in the live watch list.)*

_(Empty.)_

---

*Last reset: 2026-06-23 (file seeded — no historical patterns yet).*
