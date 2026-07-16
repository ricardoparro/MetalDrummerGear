/**
 * Kit Configurations study — bass-pedal setup (double bass / twin single pedals /
 * double pedal / single pedal) across all 67 roster drummers, and
 * cymbal-setup size (piece count) across cymbalSetups.js's verified
 * 56-drummer subset, both broken down by primary genre.
 *
 * GENERATED FILE — do not edit by hand.
 * Regenerate with: node scripts/compute-studies.cjs
 *
 * Source of truth: api/drummers/index.js (gear.drums + gear.hardware, current gear
 * only) and packages/frontend/data/cymbalSetups.js. Dataset snapshot date: 2026-07-16.
 *
 * Methodology: pedalConfig classification is text-pattern based against the literal
 * drums/hardware strings (see classifyPedalSetup in scripts/compute-studies.cjs) —
 * "unspecified" means neither field contained an unambiguous single/double-pedal
 * marker, not that the drummer has no pedal. gear.drums names only brand/series for
 * most of the roster, not full shell sizes, so a roster-wide "kit pieces" table isn't
 * possible from this data; explicitShellConfigs instead lists the 3
 * roster entries whose drums field does spell out every shell size, verbatim, as a
 * small supplementary table rather than a genre-wide claim. cymbalSetupSize covers
 * only the 56 of 67 drummers cymbalSetups.js has parsed
 * (gear.verified: true subset) — see that module's own header for the excluded list.
 * byGenre breakdowns only include genre buckets with >= 2 drummers.
 *
 * Consumed by: /studies/metal-kit-configurations (packages/frontend/pages) and the
 * bot-facing SSR handler (api/meta/[...path].js).
 */

export const KIT_CONFIGURATIONS = {
  "generatedAt": "2026-07-16",
  "totalDrummers": 67,
  "pedalConfig": {
    "overall": {
      "doubleBass": 2,
      "twinSinglePedals": 2,
      "doublePedal": 59,
      "singlePedal": 1,
      "unspecified": 3
    },
    "bucketMinDrummers": 2,
    "byGenre": [
      {
        "genre": "Progressive Metal",
        "totalDrummers": 11,
        "doubleBass": 0,
        "twinSinglePedals": 2,
        "doublePedal": 8,
        "singlePedal": 0,
        "unspecified": 1
      },
      {
        "genre": "Thrash Metal",
        "totalDrummers": 10,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 10,
        "singlePedal": 0,
        "unspecified": 0
      },
      {
        "genre": "Death Metal",
        "totalDrummers": 6,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 6,
        "singlePedal": 0,
        "unspecified": 0
      },
      {
        "genre": "Heavy Metal",
        "totalDrummers": 6,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 5,
        "singlePedal": 1,
        "unspecified": 0
      },
      {
        "genre": "Melodic Death Metal",
        "totalDrummers": 4,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 4,
        "singlePedal": 0,
        "unspecified": 0
      },
      {
        "genre": "Metalcore",
        "totalDrummers": 4,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 4,
        "singlePedal": 0,
        "unspecified": 0
      },
      {
        "genre": "Nu Metal",
        "totalDrummers": 4,
        "doubleBass": 1,
        "twinSinglePedals": 0,
        "doublePedal": 2,
        "singlePedal": 0,
        "unspecified": 1
      },
      {
        "genre": "Black Metal",
        "totalDrummers": 3,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 2,
        "singlePedal": 0,
        "unspecified": 1
      },
      {
        "genre": "Groove Metal",
        "totalDrummers": 3,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 3,
        "singlePedal": 0,
        "unspecified": 0
      },
      {
        "genre": "Technical Death Metal",
        "totalDrummers": 3,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 3,
        "singlePedal": 0,
        "unspecified": 0
      },
      {
        "genre": "Progressive",
        "totalDrummers": 2,
        "doubleBass": 0,
        "twinSinglePedals": 0,
        "doublePedal": 2,
        "singlePedal": 0,
        "unspecified": 0
      },
      {
        "genre": "Progressive Death Metal",
        "totalDrummers": 2,
        "doubleBass": 1,
        "twinSinglePedals": 0,
        "doublePedal": 1,
        "singlePedal": 0,
        "unspecified": 0
      }
    ]
  },
  "cymbalSetupSize": {
    "datasetSize": 56,
    "avgPieces": 5.3,
    "medianPieces": 5,
    "minPieces": 3,
    "maxPieces": 9,
    "bucketMinDrummers": 2,
    "byGenre": [
      {
        "genre": "Progressive Metal",
        "datasetSize": 9,
        "avgPieces": 5.6,
        "medianPieces": 5
      },
      {
        "genre": "Thrash Metal",
        "datasetSize": 9,
        "avgPieces": 5.1,
        "medianPieces": 5
      },
      {
        "genre": "Death Metal",
        "datasetSize": 5,
        "avgPieces": 4.8,
        "medianPieces": 5
      },
      {
        "genre": "Heavy Metal",
        "datasetSize": 5,
        "avgPieces": 5,
        "medianPieces": 5
      },
      {
        "genre": "Melodic Death Metal",
        "datasetSize": 4,
        "avgPieces": 3.8,
        "medianPieces": 4
      },
      {
        "genre": "Black Metal",
        "datasetSize": 3,
        "avgPieces": 5,
        "medianPieces": 5
      },
      {
        "genre": "Nu Metal",
        "datasetSize": 3,
        "avgPieces": 7.3,
        "medianPieces": 8
      },
      {
        "genre": "Technical Death Metal",
        "datasetSize": 3,
        "avgPieces": 4.7,
        "medianPieces": 5
      },
      {
        "genre": "Groove Metal",
        "datasetSize": 2,
        "avgPieces": 7,
        "medianPieces": 7
      },
      {
        "genre": "Metalcore",
        "datasetSize": 2,
        "avgPieces": 6,
        "medianPieces": 6
      },
      {
        "genre": "Progressive Death Metal",
        "datasetSize": 2,
        "avgPieces": 7,
        "medianPieces": 7
      }
    ],
    "pieceTypeCounts": {
      "hi-hat": 58,
      "crash": 122,
      "ride": 55,
      "china": 50,
      "splash": 8,
      "stack": 0,
      "other": 5
    }
  },
  "explicitShellConfigs": [
    {
      "drummerName": "Eloy Casagrande",
      "drummerSlug": "eloy-casagrande",
      "band": "Slipknot",
      "genre": "Nu Metal",
      "raw": "Tama Starclassic Bubinga (22\"x16\" & 24\"x14\" Bass Drums, 10\", 12\", 13\" Toms, 16\" & 18\" Floor Toms)",
      "bassCount": 2,
      "tomCount": 5,
      "totalShells": 7
    },
    {
      "drummerName": "Tomas Haake",
      "drummerSlug": "tomas-haake",
      "band": "Meshuggah",
      "genre": "Progressive Metal",
      "raw": "Sonor SQ2 Heavy Beech (24\"x18\" Bass, 10\"x8\", 12\"x9\", 13\"x10\", 16\"x14\", 18\"x16\" Toms)",
      "bassCount": 1,
      "tomCount": 5,
      "totalShells": 6
    },
    {
      "drummerName": "Mario Duplantier",
      "drummerSlug": "mario-duplantier",
      "band": "Gojira",
      "genre": "Progressive Death Metal",
      "raw": "Tama Starclassic Bubinga (22\"x18\" Bass Drums x2, 12\"x9\" & 13\"x10\" Toms, 16\"x16\" Floor Tom)",
      "bassCount": 2,
      "tomCount": 3,
      "totalShells": 5
    }
  ]
};

export default KIT_CONFIGURATIONS;
