/**
 * Study Summary — small derived scalar index for the STUDIES registry in
 * packages/frontend/data/studies/index.js (title/description/headlineStat metadata
 * consumed by the /studies hub, sitemap, OG card generator, and llms.txt mirrors).
 * Carries only the handful of numbers that metadata needs (totalDrummers/totalSongs,
 * one top-ranked brand per study, one genre's avg BPM) — never the per-brand drummer
 * lists, hall-of-speed, or explicit shell configs that make the full datasets
 * (mostUsedGearBrands.js/drumEndorsementLandscape.js/tempoBySubgenre.js/
 * kitConfigurations.js) ~200KB (issue #7150).
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: the same in-memory structures used to write the four full
 * datasets above — every field here is copied from those, never re-derived
 * independently. Dataset snapshot date: 2026-07-25.
 *
 * Consumed by: packages/frontend/data/studies/index.js only. Each individual
 * /studies/<slug> page still reads its own full dataset directly for the detailed
 * breakdown tables/charts it renders.
 */

export const STUDY_SUMMARY = {
  "generatedAt": "2026-07-25",
  "mostUsedGearBrands": {
    "generatedAt": "2026-07-25",
    "totalDrummers": 72,
    "topKitBrand": {
      "brand": "Pearl",
      "count": 22,
      "percent": 30.6
    }
  },
  "tempoBySubgenre": {
    "generatedAt": "2026-07-25",
    "totalSongs": 254,
    "overallAvgBpm": 141.1,
    "deathMetalAvgBpm": 176.9
  },
  "drumEndorsementLandscape": {
    "generatedAt": "2026-07-25",
    "totalDrummers": 72,
    "topReachBrand": {
      "brand": "Vic Firth",
      "count": 44,
      "percent": 61.1
    }
  },
  "kitConfigurations": {
    "generatedAt": "2026-07-25",
    "totalDrummers": 72,
    "doublePedalCount": 59,
    "doublePedalPercent": 81.9
  }
};

export default STUDY_SUMMARY;
