// Gear kit data for /gear/:brand/:series/drummers-using pages.
// Issue #2403 (split 1/4 of #2215): scaffold + seed entries.
// Splits 2–4 populate the remaining kit entries with full content data.
//
// Shape: DRUMMERS_BY_KIT['brand/series'] = [{ slug, name, band, yearsUsed, config, endorsee }]
//   slug      — drummer profile slug (matches /drummers/:slug)
//   name      — display name
//   band      — primary band during the kit's use period
//   yearsUsed — approximate years used, e.g. '2002–present'
//   config    — full kit configuration string
//   endorsee  — true if an official brand endorser

export const DRUMMERS_BY_KIT = {
  'tama/star-classic-maple': [
    {
      slug: 'lars-ulrich',
      name: 'Lars Ulrich',
      band: 'Metallica',
      yearsUsed: '2002–present',
      config: 'Tama STAR Classic Maple (22"×18" Bass, 10"×8", 12"×9", 14"×12", 16"×14" Toms)',
      endorsee: true,
    },
    {
      slug: 'jay-weinberg',
      name: 'Jay Weinberg',
      band: 'Slipknot',
      yearsUsed: '2014–2023',
      config: 'Tama STAR Classic Maple (22"×18" Bass, 10"×8", 12"×9", 14"×12" Toms)',
      endorsee: true,
    },
    {
      slug: 'mario-duplantier',
      name: 'Mario Duplantier',
      band: 'Gojira',
      yearsUsed: '2018–present',
      config: 'Tama STAR Classic Maple (22"×18" Bass Drums ×2, 12"×9", 13"×10" Toms)',
      endorsee: true,
    },
  ],
  'tama/star-classic-bubinga': [],
  'tama/star-classic-walnut-birch': [],
  'pearl/masters-custom-maple': [],
  'pearl/reference-masters-maple': [],
  'dw/collectors-maple': [
    {
      slug: 'mike-portnoy',
      name: 'Mike Portnoy',
      band: 'Dream Theater',
      yearsUsed: '1994–2010',
      config: 'DW Collector\'s Maple (22"×18" Bass Drums ×2, 10"×7", 12"×8", 14"×12", 16"×14" Toms)',
      endorsee: true,
    },
    {
      slug: 'matt-greiner',
      name: 'Matt Greiner',
      band: 'August Burns Red',
      yearsUsed: '2010–present',
      config: 'DW Collector\'s Maple (22"×18" Bass, 10"×8", 12"×9", 14"×12", 16"×14" Toms)',
      endorsee: true,
    },
  ],
  'pearl/reference-pure': [
    {
      slug: 'nick-augusto',
      name: 'Nick Augusto',
      band: 'Trivium',
      yearsUsed: '2010–2014',
      config: 'Pearl Reference Pure (22"×18" Bass, 10"×8", 12"×9", 14"×12", 16"×14" Toms)',
      endorsee: true,
    },
    {
      slug: 'igor-cavalera',
      name: 'Igor Cavalera',
      band: 'Sepultura / Cavalera Conspiracy',
      yearsUsed: '2006–2016',
      config: 'Pearl Reference Pure (22"×18" Bass, 10"×8", 12"×9", 14"×12", 16"×14" Toms)',
      endorsee: false,
    },
  ],
  'sonor/sq2-heavy-maple': [],
  // Issue #2405 (split 3/4 of #2215): Sonor SQ2 general page (/gear/sonor/sq2/)
  'sonor/sq2': [
    {
      slug: 'tomas-haake',
      name: 'Tomas Haake',
      band: 'Meshuggah',
      yearsUsed: '2002–present',
      config: 'Sonor SQ2 Heavy Beech (24"×18" Bass ×2, 10"×8", 12"×9", 14"×12", 16"×16", 18"×16" Toms)',
      endorsee: true,
    },
    {
      slug: 'gene-hoglan',
      name: 'Gene Hoglan',
      band: 'Testament / Dethklok',
      yearsUsed: '2007–2014',
      config: 'Sonor SQ2 Heavy Maple (22"×18" Bass, 10"×8", 12"×9", 14"×12", 16"×14" Toms)',
      endorsee: false,
    },
  ],
  'mapex/orion': [],
  // Issue #2405 (split 3/4 of #2215): Mapex Armory page (/gear/mapex/armory/)
  'mapex/armory': [
    {
      slug: 'jason-bittner',
      name: 'Jason Bittner',
      band: 'Overkill / Shadows Fall',
      yearsUsed: '2015–present',
      config: 'Mapex Armory (22"×18" Bass, 10"×8", 12"×9", 14"×12", 16"×16" Toms)',
      endorsee: true,
    },
    {
      slug: 'matt-halpern',
      name: 'Matt Halpern',
      band: 'Periphery',
      yearsUsed: '2015–present',
      config: 'Mapex Armory (22"×18" Bass, 10"×8", 12"×9", 14"×12" Toms)',
      endorsee: true,
    },
  ],
  'ludwig/classic-maple': [],
  // Issue #2405 (split 3/4 of #2215): Gretsch USA Custom page (/gear/gretsch/usa-custom/)
  'gretsch/usa-custom': [
    {
      slug: 'matt-garstka',
      name: 'Matt Garstka',
      band: 'Animals as Leaders',
      yearsUsed: '2012–present',
      config: 'Gretsch USA Custom (22"×18" Bass, 10"×7", 12"×8", 14"×12" Toms)',
      endorsee: true,
    },
  ],
  'yamaha/recording-custom': [],
  'pdp/concept-maple': [],
};

export default DRUMMERS_BY_KIT;
