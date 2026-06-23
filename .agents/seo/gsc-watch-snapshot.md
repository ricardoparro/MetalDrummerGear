# GSC Watch — weekly snapshot

*Auto-written by `.github/workflows/check-gsc-watched-queries.yml`. Do not edit by hand; edit `watched-queries.json` instead. CEO Agent: read this every run when deciding which seo-proposal patterns to keep promoting.*

> 🤖 **Auto-generated** by `.github/workflows/check-gsc-watched-queries.yml` — refreshed weekly.

**Generated:** 2026-06-23T22:51:08.427Z
**Site:** https://metalforge.io/ · **Window:** last 7 days
**Watches:** 7 total

**Counts:** win=4 · baselining=1 · no-data=2

## What this is

The **L1 loop** — closes the loop on the SEO Agent / Ralph pipeline. Each watched query has a baseline captured when it was added; this run compares the last 7 days to that baseline and classifies the delta. Patterns that consistently **win** get re-enforced; patterns that consistently **null** get flagged for de-prioritisation.

Classification rules:

- **win** — position improved ≥3, OR impressions doubled, OR clicks went from 0 to ≥1.
- **loss** — position worsened ≥3, OR impressions dropped ≥50%, OR clicks halved.
- **mixed** — at least one win and one loss signal on the same query.
- **null** — moved within the noise band.
- **no-data** — query did not surface at all in the current window.
- **baselining** — entry was added without a baseline; the current numbers become the baseline next week.

## 🏆 Wins (4)

| Query | Target entity | Baseline | Current | Reason |
| --- | --- | --- | --- | --- |
| `brann dailor drum kit` | drummer:brann-dailor | b: pos 5.5 • impr 10 • cl 0 | c: pos 5.8 • impr 22 • cl 0 | pos: 5.5 → 5.8 (=) · impr: 10 → 22 (2.2x) |
| `matt greiner drum kit` | drummer:matt-greiner | b: pos 6.4 • impr — • cl — | c: pos 5.0 • impr 2 • cl 1 | pos: 6.4 → 5.0 (=) · impr: 0 → 2 (first appearance) |
| `aquiles priester drum kit` | drummer:aquiles-priester | b: pos 5.0 • impr — • cl — | c: pos 7.6 • impr 11 • cl 0 | pos: 5.0 → 7.6 (=) · impr: 0 → 11 (first appearance) |
| `mario duplantier gear` | drummer:mario-duplantier | b: pos 7.3 • impr — • cl — | c: pos 5.5 • impr 2 • cl 0 | pos: 7.3 → 5.5 (=) · impr: 0 → 2 (first appearance) |

## ⚠️ Losses (0)

_(none)_

## 🔀 Mixed (0)

_(none)_

## 😐 Null (no significant movement) (0)

_(none)_

## 🌑 No data (query disappeared / never appeared) (2)

| Query | Target entity | Baseline | Current | Reason |
| --- | --- | --- | --- | --- |
| `fastest metal drummer` | lists:fastest-metal-drummers | b: pos — • impr — • cl — | c: pos — • impr 0 • cl 0 | No data yet — query not surfacing in the last 7 days. |
| `lars ulrich drum kit` | drummer:lars-ulrich | b: pos — • impr — • cl — | c: pos — • impr 0 • cl 0 | No data yet — query not surfacing in the last 7 days. |

## 🌱 Baselining (no baseline recorded yet) (1)

| Query | Target entity | Baseline | Current | Reason |
| --- | --- | --- | --- | --- |
| `joey jordison drum kit` | drummer:joey-jordison | b: pos — • impr — • cl — | c: pos 8.5 • impr 84 • cl 2 | No baseline recorded yet — this run becomes the baseline next week. |

---

**How to act on this:**

- 🏆 Wins → note the merged PR / on-page format that moved each query. Add the pattern to `.agents/seo/learned-patterns.md` (manual or via CEO Agent prompt).
- ⚠️ Losses → urgent. Open `ai-fix` issue: "Investigate ranking regression for `<query>`". Often caused by a recent merge that displaced the right content.
- 😐 Null after 60+ days from `added_at` → consider removing from `watched-queries.json` or revisiting strategy for that intent cluster.
- 🌑 No-data → the page may have been deindexed; cross-check with the broken-images report and the indexation coverage report.
- 🌱 Baselining → no action this run; baseline records next run.

Edit `.agents/seo/watched-queries.json` to add or remove watches. Use `node .agents/scripts/check-gsc-watched-queries.cjs --query "your query" --baseline` to print a ready-to-paste entry with the current 7-day numbers as baseline.