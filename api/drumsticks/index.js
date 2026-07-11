// Drumsticks data module — Issue #4136 (phase 1 of the /drumsticks hub epic #4135)
// Seed data: source-verified sticks only. Every record must be backed by a
// brand/product or major-retailer source before it ships; unverified claims are
// omitted, never guessed. More entries land as the research pass confirms them.

const DRUMSTICKS = {
  'vic-firth-sgk': {
    id: 'vic-firth-sgk',
    brand: 'Vic Firth',
    model: 'SGK (George Kollias)',
    size: '5A/5B hybrid',
    diameterIn: 0.585,
    lengthIn: 16,
    material: 'Hickory',
    tip: 'Wood — barrel',
    taper: 'Medium',
    endorsementType: 'signature-model',
    drummerSlug: 'george-kollias',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  'vic-firth-sben': {
    id: 'vic-firth-sben',
    brand: 'Vic Firth',
    model: 'SBEN (Charlie Benante)',
    size: 'Rock (.625")',
    diameterIn: 0.625,
    lengthIn: 16.625,
    material: 'Hickory',
    tip: 'Wood — modified oval',
    taper: 'Abrupt',
    endorsementType: 'signature-model',
    drummerSlug: 'charlie-benante',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Sources: aheaddrumsticks.com artist roster; Sweetwater AHLU product page
  // (16.25" / .595" / long taper / aluminium core, replaceable covers & nylon tips).
  'ahead-lars-ulrich': {
    id: 'ahead-lars-ulrich',
    brand: 'Ahead',
    model: 'Lars Ulrich Signature (AHLU)',
    size: '5B-class',
    diameterIn: 0.595,
    lengthIn: 16.25,
    material: 'Aluminium core — replaceable covers',
    tip: 'Nylon — replaceable',
    taper: 'Long',
    endorsementType: 'signature-model',
    drummerSlug: 'lars-ulrich',
    priceBand: '$$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Sources: Pro-Mark/D'Addario TX2BXN product listings (Thomann, Percussion
  // Source): 2BX, .630" x 16-1/8", hickory, oval nylon tip, short taper.
  'promark-tx2bxn-lombardo': {
    id: 'promark-tx2bxn-lombardo',
    brand: 'Pro-Mark',
    model: 'TX2BXN (Dave Lombardo)',
    size: '2BX',
    diameterIn: 0.63,
    lengthIn: 16.125,
    material: 'Hickory',
    tip: 'Nylon — oval',
    taper: 'Short',
    endorsementType: 'signature-model',
    drummerSlug: 'dave-lombardo',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Sources: Sweetwater PMTX515W product page: 515 design based on the 747 but
  // shorter, .551" x 16", hickory, round wood tip, long taper. Limited
  // availability post-2021 — re-check stock before wiring affiliate links.
  'promark-tx515w-jordison': {
    id: 'promark-tx515w-jordison',
    brand: 'Pro-Mark',
    model: 'TX515W / Hickory 515 (Joey Jordison)',
    size: '515 (5A-class)',
    diameterIn: 0.551,
    lengthIn: 16,
    material: 'Hickory',
    tip: 'Wood — round',
    taper: 'Long',
    endorsementType: 'signature-model',
    drummerSlug: 'joey-jordison',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Sources: Pro-Mark/D'Addario TX5AXW product listings (Amazon, Columbus
  // Percussion): 5AX — 5A length/diameter (.551" x 16") with an oversized
  // acorn/oval wood tip for volume with speed. Hickory.
  'promark-tx5axw-adler': {
    id: 'promark-tx5axw-adler',
    brand: 'Pro-Mark',
    model: 'TX5AXW / Hickory 5AX (Chris Adler)',
    size: '5AX',
    diameterIn: 0.551,
    lengthIn: 16,
    material: 'Hickory',
    tip: 'Wood — oversized acorn/oval',
    taper: 'Medium',
    endorsementType: 'signature-model',
    drummerSlug: 'chris-adler',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  }
};

function getSticksForDrummer(slug) {
  return Object.values(DRUMSTICKS).filter(stick => stick.drummerSlug === slug);
}

function getDrumstick(id) {
  return DRUMSTICKS[id] || null;
}

export { DRUMSTICKS, getSticksForDrummer, getDrumstick };
