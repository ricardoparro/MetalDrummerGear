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
  },
  // ---------------------------------------------------------------------------
  // Batch 1 of the deep-research pass (14 drummers, two-angle research +
  // adversarial adjudication, all confirmed against brand/retailer sources).
  // ---------------------------------------------------------------------------
  // Source: daddario.com Mike Portnoy 420X ActiveGrip product page; Sweetwater
  // TXMP420XW-AG. .565" x 16.25", hickory, ActiveGrip coating, oval wood tip.
  'promark-txmp420xw-portnoy': {
    id: 'promark-txmp420xw-portnoy',
    brand: 'Pro-Mark',
    model: 'Mike Portnoy 420X ActiveGrip (TXMP420XW-AG)',
    size: '420X (oversized 5A-class)',
    diameterIn: 0.565,
    lengthIn: 16.25,
    material: 'Hickory — ActiveGrip coating',
    tip: 'Wood — oval',
    taper: 'Medium',
    endorsementType: 'signature-model',
    drummerSlug: 'mike-portnoy',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: wincentdrumsticks.com Tomas Haake Signature (W-THS); Sweetwater WTHS.
  // 16.2mm x 416mm, hickory, wax coating, oval wood tip, elongated "Haake taper".
  'wincent-wths-haake': {
    id: 'wincent-wths-haake',
    brand: 'Wincent',
    model: 'Tomas Haake Signature (W-THS)',
    size: '2B-class',
    diameterIn: 0.638,
    lengthIn: 16.4,
    material: 'Hickory — wax protection coating',
    tip: 'Wood — oval',
    taper: 'Elongated (Haake taper)',
    endorsementType: 'signature-model',
    drummerSlug: 'tomas-haake',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: vicfirth.com Signature Series Danny Carey (SDC; SDCN nylon variant).
  // .630" shaft x 16.5", hickory, wood teardrop tip, short taper.
  'vic-firth-sdc-carey': {
    id: 'vic-firth-sdc-carey',
    brand: 'Vic Firth',
    model: 'SDC (Danny Carey)',
    size: 'Signature (2B-weight)',
    diameterIn: 0.63,
    lengthIn: 16.5,
    material: 'Hickory',
    tip: 'Wood — teardrop (SDCN nylon variant)',
    taper: 'Short',
    endorsementType: 'signature-model',
    drummerSlug: 'danny-carey',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: vater.com/artists/154 (Brann Dailor artist page, his own quote on the
  // 5B); Vater VH5BW product listings. Stock model — endorsementType 'uses'.
  'vater-vh5bw-dailor': {
    id: 'vater-vh5bw-dailor',
    brand: 'Vater',
    model: 'American Hickory 5B (VH5BW)',
    size: '5B',
    diameterIn: 0.605,
    lengthIn: 16,
    material: 'Hickory',
    tip: 'Wood — acorn',
    taper: 'Short',
    endorsementType: 'uses',
    drummerSlug: 'brann-dailor',
    priceBand: '$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: Long & McQuade + Amazon listings for Vic Firth SVP Vinnie Paul
  // Signature. 16-7/8" x .630", hickory, enlarged teardrop wood tip.
  // DISCONTINUED (Vinnie Paul died 2018; absent from Vic Firth's current
  // catalog) — historical endorsement; do not wire live affiliate links.
  'vic-firth-svp-vinnie-paul': {
    id: 'vic-firth-svp-vinnie-paul',
    brand: 'Vic Firth',
    model: 'SVP (Vinnie Paul) — discontinued',
    size: 'Signature (oversized rock)',
    diameterIn: 0.63,
    lengthIn: 16.875,
    material: 'Hickory',
    tip: 'Wood — enlarged teardrop',
    taper: 'Short',
    endorsementType: 'signature-model',
    drummerSlug: 'vinnie-paul',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: daddario.com Eloy Casagrande Signature (TXECW), launched June 2026;
  // Sweetwater TXECW. Raw hickory, 5B shaft flaring to 2B shoulder, teardrop tip.
  'promark-txecw-casagrande': {
    id: 'promark-txecw-casagrande',
    brand: 'Pro-Mark',
    model: 'Eloy Casagrande Signature Raw Hickory (TXECW)',
    size: '5B (shoulder flares to 2B)',
    diameterIn: 0.59,
    lengthIn: 16,
    material: 'Hickory — raw/unlacquered',
    tip: 'Wood — teardrop',
    taper: 'Fortified shoulder (5B→2B flare)',
    endorsementType: 'signature-model',
    drummerSlug: 'eloy-casagrande',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: vater.com Jay Weinberg 908 Signature (VHJW908). .585" x 16.25",
  // hickory, medium barrel wood tip, quick taper. Sized between 5A and 5B.
  'vater-vhjw908-weinberg': {
    id: 'vater-vhjw908-weinberg',
    brand: 'Vater',
    model: 'Jay Weinberg 908 Signature (VHJW908)',
    size: '908 (between 5A and 5B)',
    diameterIn: 0.585,
    lengthIn: 16.25,
    material: 'Hickory',
    tip: 'Wood — medium barrel',
    taper: 'Quick',
    endorsementType: 'signature-model',
    drummerSlug: 'jay-weinberg',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: daddario.com Matt Halpern Signature (TXMHW). 2B size that plays like
  // a 5B: .630" x 16", hickory, large round wood tip, short taper.
  'promark-txmhw-halpern': {
    id: 'promark-txmhw-halpern',
    brand: 'Pro-Mark',
    model: 'Matt Halpern Signature (TXMHW)',
    size: '2B-size, 5B feel',
    diameterIn: 0.63,
    lengthIn: 16,
    material: 'Hickory',
    tip: 'Wood — large round',
    taper: 'Short',
    endorsementType: 'signature-model',
    drummerSlug: 'matt-halpern',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: ProMark Brasil (official) + TX419W Autograph listings. Classic 419,
  // 2B-class: .630" x ~16.1", hickory, wood tip. NOTE: roster previously said
  // "Vic Firth Aquiles Priester Signature" — research adjudicated ProMark as the
  // current endorsement; roster gear.sticks needs a follow-up correction.
  'promark-tx419w-priester': {
    id: 'promark-tx419w-priester',
    brand: 'Pro-Mark',
    model: 'TX419W Aquiles Priester Autograph (Classic 419)',
    size: '419 (2B-class)',
    diameterIn: 0.63,
    lengthIn: 16.1,
    material: 'Hickory',
    tip: 'Wood',
    taper: 'Medium',
    endorsementType: 'signature-model',
    drummerSlug: 'aquiles-priester',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: Tama via Meinl Shop (EU distributor) — O-DVM2 Dirk Verbeuren
  // Signature, based on Tama's 216B oak stick: 16mm x 406mm, Japanese oak, raw
  // finish, ball wood tip. NOTE: roster previously said "Vic Firth American
  // Classic 5B" — research adjudicated Tama; roster needs follow-up correction.
  'tama-o-dvm2-verbeuren': {
    id: 'tama-o-dvm2-verbeuren',
    brand: 'Tama',
    model: 'O-DVM2 Dirk Verbeuren Signature',
    size: '2B-equivalent (216B basis)',
    diameterIn: 0.63,
    lengthIn: 16,
    material: 'Japanese oak — raw finish',
    tip: 'Wood — ball',
    taper: 'Medium',
    endorsementType: 'signature-model',
    drummerSlug: 'dirk-verbeuren',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: tama.com artist page + H-MD retailer listings. Oversized: 16.5mm x
  // 432mm (17"), hickory, oval/teardrop wood tip, short taper.
  'tama-hmd-duplantier': {
    id: 'tama-hmd-duplantier',
    brand: 'Tama',
    model: 'H-MD Mario Duplantier Signature',
    size: 'Oversized (thicker/longer than 2B)',
    diameterIn: 0.65,
    lengthIn: 17,
    material: 'Hickory',
    tip: 'Wood — oval/teardrop',
    taper: 'Short',
    endorsementType: 'signature-model',
    drummerSlug: 'mario-duplantier',
    priceBand: '$$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: Magazyn Perkusista interview (Inferno names his sticks); Vic Firth
  // American Classic 2B is a current catalog model. Stock model — 'uses'.
  'vic-firth-2b-inferno': {
    id: 'vic-firth-2b-inferno',
    brand: 'Vic Firth',
    model: 'American Classic 2B',
    size: '2B',
    diameterIn: 0.63,
    lengthIn: 16.25,
    material: 'Hickory',
    tip: 'Wood — teardrop (2BN nylon variant)',
    taper: 'Medium',
    endorsementType: 'uses',
    drummerSlug: 'inferno',
    priceBand: '$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: equipboard.com/pros/alex-bent + Vic Firth American Classic 5B (VF5B)
  // catalog listings. Stock model — 'uses'.
  'vic-firth-5b-bent': {
    id: 'vic-firth-5b-bent',
    brand: 'Vic Firth',
    model: 'American Classic 5B',
    size: '5B',
    diameterIn: 0.595,
    lengthIn: 16,
    material: 'Hickory',
    tip: 'Wood — teardrop',
    taper: 'Medium',
    endorsementType: 'uses',
    drummerSlug: 'alex-bent',
    priceBand: '$',
    retailerUrls: { thomann: null, sweetwater: null, amazon: null }
  },
  // Source: vicfirth.com Signature Series Matt Garstka (SGAR). .585" x 16",
  // hickory, blended wood tip, long taper (weight toward the butt).
  'vic-firth-sgar-garstka': {
    id: 'vic-firth-sgar-garstka',
    brand: 'Vic Firth',
    model: 'SGAR (Matt Garstka)',
    size: 'Custom (between 55A and Buddy Rich)',
    diameterIn: 0.585,
    lengthIn: 16,
    material: 'Hickory',
    tip: 'Wood — blended',
    taper: 'Long',
    endorsementType: 'signature-model',
    drummerSlug: 'matt-garstka',
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
