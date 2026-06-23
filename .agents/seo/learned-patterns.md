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

_(Empty — first entries will be appended as L1 and L2 produce verifiable wins.)_

---

## ❌ Do-not-promote patterns

*(Format: `<intent type> + <on-page format> → <verdict source> · <reason>`)*

_(Empty — first entries will be appended after 60-day nulls or 3 consecutive losses.)_

---

## 📦 Archived watches

*(Queries removed from `watched-queries.json` because they showed 3 consecutive null verdicts. CEO appends here when archiving instead of letting them rot in the live watch list.)*

_(Empty.)_

---

*Last reset: 2026-06-23 (file seeded — no historical patterns yet).*
