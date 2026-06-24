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

## ❌ Do-not-promote patterns

*(Format: `<intent type> + <on-page format> → <verdict source> · <reason>`)*

_(Empty — first entries will be appended after 60-day nulls or 3 consecutive losses.)_

---

## 📦 Archived watches

*(Queries removed from `watched-queries.json` because they showed 3 consecutive null verdicts. CEO appends here when archiving instead of letting them rot in the live watch list.)*

_(Empty.)_

---

*Last reset: 2026-06-23 (file seeded — no historical patterns yet).*
