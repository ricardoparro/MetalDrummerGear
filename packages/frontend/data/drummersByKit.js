// Curated flagship kit → drummer mapping for /gear/<brand>/<series>/drummers-using pages.
// Issue #2404 (split 2/4 of #2215): top-3 roster-signal brand+series pages.
//
// Hand-curated companion to data/gearIndex.js (auto-generated).
// Entries here take priority over GEAR_INDEX in gearSeriesPages.js so flagship
// pages can feature a specific curated roster independent of the generated index.
//
// Shape mirrors GEAR_INDEX: { [brand]: { [series]: [{ id, name, slug, configString }] } }

export const DRUMMERS_BY_KIT = {
  "Tama": {
    "Star Classic Maple": [
      {
        "id": 1,
        "name": "Lars Ulrich",
        "slug": "lars-ulrich",
        "configString": "Tama Star Classic Maple"
      },
      {
        "id": 10,
        "name": "Jay Weinberg",
        "slug": "jay-weinberg",
        "configString": "Tama Star Classic Maple (Slipknot, 2014–2023)"
      }
    ]
  },
  "DW": {
    "Collector's Maple": [
      {
        "id": 13,
        "name": "Mike Portnoy",
        "slug": "mike-portnoy",
        "configString": "DW Collector's Maple"
      },
      {
        "id": 32,
        "name": "Matt Greiner",
        "slug": "matt-greiner",
        "configString": "DW Collector's Maple"
      }
    ]
  },
  "Pearl": {
    "Reference Pure": [
      {
        "id": 31,
        "name": "Nick Augusto",
        "slug": "nick-augusto",
        "configString": "Pearl Reference Pure"
      },
      {
        "id": 29,
        "name": "Igor Cavalera",
        "slug": "igor-cavalera",
        "configString": "Pearl Reference Pure"
      }
    ]
  }
};
