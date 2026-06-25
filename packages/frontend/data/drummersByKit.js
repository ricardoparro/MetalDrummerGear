// Drummers by Kit — purchase-intent pages data.
// Issue #2403 (split 1/4 of #2215): scaffold for /gear/:brand/:series/drummers-using.
//
// Shape: DRUMMERS_BY_KIT = { 'brand/series-slug': [{ slug, name, band, yearsUsed, config, endorsee }] }
// Splits 2–4 populate the empty arrays with content data.

export const DRUMMERS_BY_KIT = {
  'tama/star-classic-maple': [
    {
      slug: 'lars-ulrich',
      name: 'Lars Ulrich',
      band: 'Metallica',
      yearsUsed: '1993–2009',
      config: 'Tama Star Classic Maple (22"x16" Bass Drum, 10"x8", 12"x9", 14"x12" Rack Toms, 16"x14" Floor Tom)',
      endorsee: true,
    },
    {
      slug: 'jay-weinberg',
      name: 'Jay Weinberg',
      band: 'Slipknot',
      yearsUsed: '2014–2024',
      config: 'Tama Star Classic Maple (22"x18" Bass Drums x2, 10"x8", 12"x9", 13"x10" Rack Toms, 16"x14", 18"x16" Floor Toms)',
      endorsee: true,
    },
  ],
  'tama/star-classic-bubinga': [],
  'tama/speed-cobra-910': [],
  'pearl/reference-maple': [],
  'pearl/reference-pure': [],
  'pearl/demon-drive': [],
  'sonor/sq2-heavy-beech': [],
  'sonor/sq2': [],
  'meinl/byzance': [],
  'paiste/rude-2002': [],
  'sabian/aax': [],
  'dw/9000-series': [],
};

export default DRUMMERS_BY_KIT;
