// Drumsticks data module — Issue #4136 (phase 1 of the /drumsticks hub epic #4135)
// Seed data: 2 adversarially verified sticks. More entries land from a research
// pass in follow-up phases — do not invent additional sticks or drummer mappings.

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
  }
};

function getSticksForDrummer(slug) {
  return Object.values(DRUMSTICKS).filter(stick => stick.drummerSlug === slug);
}

function getDrumstick(id) {
  return DRUMSTICKS[id] || null;
}

export { DRUMSTICKS, getSticksForDrummer, getDrumstick };
