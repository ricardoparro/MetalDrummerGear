// Hand-curated kit → drummer mapping supplement.
// Issue #2404 (split 2/4 of #2215): top-3 flagship pages.
//
// Shape mirrors GEAR_INDEX: { [brand]: { [series]: [{ id, name, slug, configString }] } }
// Merged into the generated gearIndex at runtime by gearSeriesPages.getSlugMap().
// New series (not in gearIndex) require ≥2 entries to earn a page.
// Existing series get the listed drummers appended (deduped by id).

export const DRUMMERS_BY_KIT = {
  Tama: {
    'Star Classic Maple': [
      {
        id: 1,
        name: 'Lars Ulrich',
        slug: 'lars-ulrich',
        configString: 'Tama Star Classic Maple',
      },
      {
        id: 10,
        name: 'Jay Weinberg',
        slug: 'jay-weinberg',
        configString: 'Tama Star Classic Maple',
      },
    ],
  },
  DW: {
    "Collector's Maple": [
      {
        id: 13,
        name: 'Mike Portnoy',
        slug: 'mike-portnoy',
        configString: "DW Collector's Maple",
      },
      {
        id: 32,
        name: 'Matt Greiner',
        slug: 'matt-greiner',
        configString: "DW Collector's Maple",
      },
    ],
  },
  Pearl: {
    'Reference Pure': [
      {
        id: 31,
        name: 'Nick Augusto',
        slug: 'nick-augusto',
        configString: 'Pearl Reference Pure',
      },
      {
        id: 29,
        name: 'Igor Cavalera',
        slug: 'igor-cavalera',
        configString: 'Pearl Reference Pure',
      },
    ],
  },
};

export default DRUMMERS_BY_KIT;
