/**
 * Cymbals Hub content module — Issue #4305 (epic #4303 phase 2/4).
 * Pillar page (/cymbals) + reference pages (/cymbals/types|alloys|sizes-weights).
 * Mirrors the drumsticks hub pattern (data/drumstickReferencePages.js, epic #4135
 * phase 2) — same "typical, varies by brand/series" discipline for every spec
 * table, anchored to a brand education page rather than presented as a strict
 * universal standard. All cited facts were verified against the pages linked in
 * `source`/`sources` before being written here (no fabricated numbers or URLs).
 */

const BASE_URL = 'https://metalforge.io';

// ---------------------------------------------------------------------------
// Pillar page (/cymbals)
// ---------------------------------------------------------------------------

export const PILLAR_PAGE = {
  slug: 'cymbals',
  title: 'Cymbals Guide: Types, Alloys & Sizes for Metal Drummers | MetalForge',
  description:
    'What cymbals do in a metal kit, how type/alloy/size shape the sound, and how to choose a setup for metal — plus the verified cymbal setups of dozens of legendary metal drummers.',
  keywords: 'cymbals, types of cymbals, cymbal alloys, b20 vs b8, cymbal sizes, best cymbals for metal, cymbal setup',
  h1: 'Cymbals: The Complete Guide',
  intro:
    'A cymbal is a shaped bronze (or brass) disc that a drummer strikes with a stick, mallet, or foot pedal to produce anything from a short, bright accent to a long, washy roar. A metal kit usually carries five to ten of them — hi-hats, crashes, a ride, and one or more chinas or splashes — and the type, alloy, and size/weight of each one changes how it cuts through a wall of distorted guitars, how long it holds up under repeated hard hitting, and how it responds at blast-beat tempos.',
  howToChoose: [
    {
      heading: 'Start with the type and the job it does',
      body:
        'Hi-hats keep time, crashes accent, a ride carries sustained patterns, and chinas/splashes/stacks add texture and aggression. See the types guide below for what each one is built to do and the sizes that are typical for it.',
    },
    {
      heading: 'Match the alloy to the tone you want',
      body:
        'Cast B20 bronze (80% copper, 20% tin) gives a darker, more complex professional tone; sheet B8 bronze (92% copper, 8% tin) gives a brighter, simpler, more affordable one. See the alloys guide for the full breakdown, including brass and the B10/B12 middle ground.',
    },
    {
      heading: 'Match size and weight to how hard you hit',
      body:
        'A bigger diameter lowers the pitch and adds sustain; a heavier weight adds volume, cut, and durability at the cost of a slower, less "open" response. See the sizes & weights guide for how those two variables interact in a metal setup.',
    },
    {
      heading: 'Plan for durability under sustained heavy hitting',
      body:
        'Metal drumming — especially blast beats and extended fast passages — puts more repeated stress on a cymbal than most other genres. Medium-heavy to heavy weights and B20 (or comparable cast) alloys tend to hold up best over a long set, though thinner, faster-responding cymbals still have a place for specific accents.',
    },
  ],
  brands: [
    { name: 'Zildjian', note: 'The oldest cymbal maker (est. 1623); A Custom and K Custom lines are a metal-kit staple.' },
    { name: 'Sabian', note: 'AAX (bright/cutting) and HHX (dark/complex) lines both show up widely across the metal roster.' },
    { name: 'Meinl', note: 'Byzance (hand-hammered B20) and Mb20 lines are common picks among modern metal and djent drummers.' },
    { name: 'Paiste', note: 'RUDE and 2002 series were built specifically for loud, high-volume rock and metal playing.' },
  ],
  bestForMetal:
    'There is no single "correct" metal cymbal setup, but drummers playing high-volume, high-endurance sets often gravitate toward medium-heavy to heavy weights for durability and cut, cast B20 (or comparable) alloys for a professional tone that still holds up over a long set, a ride with a pronounced bell for blast-beat patterns and accents, and at least one china for aggressive, trashy accents.',
  faq: [
    {
      question: 'What cymbals do metal drummers use?',
      answer:
        'Most metal drummers run a standard core of hi-hats, two or more crashes, and a ride, plus at least one china for aggressive accents — commonly from Zildjian (A Custom, K Custom), Sabian (AAX, HHX), Meinl (Byzance, Mb20), or Paiste (RUDE, 2002), all of which show up repeatedly across professional metal setups.',
    },
    {
      question: 'How many cymbals does a metal drummer need?',
      answer:
        'A functional metal setup can run on as few as four pieces — hi-hats, one crash, and a ride — but most professional metal drummers use five to eight: hi-hats, two or three crashes of different sizes, a ride, and one or two chinas or splashes for texture and accents.',
    },
    {
      question: 'What is the best cymbal setup for metal?',
      answer:
        'The best setup depends on the sub-genre and how hard you hit, but a durable, cutting starting point is medium-heavy hi-hats and crashes, a ride with a large bell for blast-beat patterns, and a china for aggressive accents — all in a cast B20 (or comparable) alloy for tone and longevity under heavy playing.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Types reference page (/cymbals/types)
// ---------------------------------------------------------------------------

export const TYPES_TABLE = [
  { type: 'Hi-hat', typicalSize: '13"–15" (14" most common)', metalRole: 'Two cymbals on a stand, played by foot and/or stick — the main timekeeper for tight, fast 16th-note patterns and blast beats.' },
  { type: 'Crash', typicalSize: '14"–20" (16"–19" most common)', metalRole: 'A short, explosive accent on strong beats and fills; metal kits often stack several sizes (e.g. 16"/17"/18") for different accent pitches.' },
  { type: 'Ride', typicalSize: '20"–24" (20"–22" most common)', metalRole: 'The largest, heaviest cymbal in most setups — carries sustained 16th-note "blast-beat" ride patterns and cuts through a dense mix, with the bell used for sharper accents.' },
  { type: 'China', typicalSize: '14"–22" (16"–18" popular)', metalRole: 'An upturned-edge cymbal with a trashy, explosive, dirty accent — a staple for breakdown and chorus hits in metal; sometimes mounted upside down for an even darker tone.' },
  { type: 'Splash', typicalSize: '6"–12"', metalRole: 'A small, thin cymbal for a quick, bright accent that decays almost instantly — used more sparingly in metal than in lighter genres, mostly for fill ornamentation.' },
  { type: 'Stack', typicalSize: 'Varies — two or more cymbals combined', metalRole: 'Two or more cymbals (often a crash and china, or two trash cymbals) clamped together for a short, choked, staccato hit — popular in modern metalcore/djent for tight rhythmic accents.' },
];

export const TYPES_PAGE = {
  slug: 'types',
  title: '5 Types of Cymbals Explained (Hi-Hat, Crash, Ride, China, Splash) | MetalForge',
  description:
    'The 5 types of cymbals — hi-hat, crash, ride, china, and splash (plus cymbal stacks) — with typical sizes and how each is actually used in metal drumming.',
  keywords: 'types of cymbals, what is a china cymbal, hi-hat vs crash, ride cymbal, splash cymbal, cymbal stack',
  h1: '5 Types of Cymbals (And How Metal Drummers Use Them)',
  sections: [
    {
      heading: 'Hi-hat',
      body:
        'A hi-hat is a pair of matched cymbals mounted face-to-face on a stand and operated by a foot pedal (to open and close them) as well as sticks. In most metal drumming the hi-hats are the primary timekeeper — closed, tight, and articulate enough to hold together fast, repetitive patterns, including the 16th-note hand patterns used in many blast beats.',
    },
    {
      heading: 'Crash',
      body:
        'A crash produces a quick "burst" of sound used to accent a strong beat, a fill, or a section change. Metal kits commonly carry two to four crashes of different diameters (for example 16", 17", 18", and 19") so the drummer has a range of accent pitches to reach for.',
    },
    {
      heading: 'Ride — including blast-beat ride patterns',
      body:
        'The ride is usually the largest, heaviest cymbal in the setup, built for sustained, clearly articulated patterns rather than one-off accents. In extreme metal, drummers frequently "ride" a fast, sustained 16th-note pattern on it — sometimes on the bell for a sharper, more piercing sound that cuts over blast-beat tempos and dense, distorted guitars.',
    },
    {
      heading: 'What is a china cymbal?',
      body:
        'A china cymbal has an upturned outer edge and (usually) an upturned bell, giving it a distinctly "trashy," sharp, and explosive sound rather than the more controlled wash of a crash. Metal drummers lean on chinas for aggressive accents — breakdown hits, chorus entries, and other moments that call for a dirtier, more violent sound than a standard crash provides.',
    },
    {
      heading: 'Splash and stack (effects cymbals)',
      body:
        'Splashes are small, thin cymbals (6"–12") that decay almost instantly, giving a quick, bright accent — used more sparingly in metal than in pop or fusion drumming. Cymbal stacks — two or more cymbals (often a crash and a china) clamped together — give a short, choked, staccato hit that has become a common texture in modern metalcore and djent for tight rhythmic accents.',
    },
  ],
  table: TYPES_TABLE,
  tableSource: { label: 'SABIAN — Cymbals 101', url: 'https://sabian.com/cymbals-101/' },
  faq: [
    {
      question: 'What are the 5 types of cymbals?',
      answer:
        'The five core cymbal types are hi-hat, crash, ride, china, and splash. Hi-hats keep time, crashes accent, the ride carries sustained patterns, chinas give a trashy accent, and splashes give a quick bright accent. Cymbal stacks (two or more cymbals combined) are a common sixth category built from combining these.',
    },
    {
      question: 'What is a china cymbal?',
      answer:
        'A china cymbal has an upturned outer edge and bell, producing a trashy, sharp, explosive accent that is dirtier and less controlled than a standard crash — widely used in metal for aggressive breakdown and section-change accents.',
    },
    {
      question: 'What size ride cymbal is used in metal?',
      answer:
        'Most metal drummers use a 20"–22" ride, occasionally up to 24", chosen heavy enough to survive being played almost continuously as a driving, sustained pattern at fast tempos.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Alloys reference page (/cymbals/alloys)
// ---------------------------------------------------------------------------

export const ALLOYS_TABLE = [
  { alloy: 'B20 bronze', composition: '80% copper / 20% tin', tone: 'Dark, complex, wide overtone spread', tier: 'Professional — cast (Zildjian A/K, Sabian HH/HHX, Meinl Byzance, Paiste Signature/2002)' },
  { alloy: 'B12 bronze', composition: '88% copper / 12% tin', tone: 'A shimmery, glassy middle ground between B8 and B20', tier: 'Mid-tier (e.g. Meinl Classics Custom, Pure Alloy)' },
  { alloy: 'B8 bronze', composition: '92% copper / 8% tin', tone: 'Brighter, more immediate, simpler overtones', tier: 'Entry-level — sheet (e.g. Zildjian ZBT/ZXT, Meinl HCS Bronze)' },
  { alloy: 'Brass', composition: 'Copper / zinc', tone: 'Brightest and least complex of the common alloys; softer metal', tier: 'Absolute entry-level / student packs' },
];

export const ALLOYS_PAGE = {
  slug: 'alloys',
  title: 'B20 vs B8 Cymbal Alloys Explained (Bronze, Brass, Cast vs Sheet) | MetalForge',
  description:
    'B20 vs B8 bronze cymbal alloys compared, plus brass and the B12 middle ground, and how cast vs sheet manufacturing shapes tone and durability under heavy playing.',
  keywords: 'b20 vs b8, cymbal alloys, cast bronze vs sheet bronze, brass cymbals, bronze cymbals',
  h1: 'B20 vs B8 (And What a Cymbal Is Actually Made Of)',
  sections: [
    {
      heading: 'B20 bronze — the professional standard',
      body:
        'B20 bronze is roughly 80% copper and 20% tin. It is the alloy behind most professional cast cymbal lines — including Zildjian\'s proprietary cast-bronze alloy, Meinl\'s Byzance series, and the top tiers of Sabian and Paiste — and is prized for a darker, more complex tone with a wide spread of overtones. It is harder to work than lower-tin alloys, which is part of why B20 lines carry a professional price point.',
    },
    {
      heading: 'B8 bronze — the brighter, more affordable option',
      body:
        'B8 bronze uses far less tin — about 92% copper to 8% tin — which makes it easier and cheaper to roll into sheets and stamp into cymbal blanks. The result is a brighter, more immediate, less harmonically complex sound than B20, which is why B8 shows up almost exclusively in entry-level and student lines rather than professional ones.',
    },
    {
      heading: 'Brass and the B12 middle ground',
      body:
        'Brass (a copper-zinc alloy rather than a copper-tin bronze) is the softest and brightest of the common cymbal materials, and is reserved for the most basic beginner packs. Between B8 and B20 sits B12 bronze (about 88% copper, 12% tin) — used by some mid-tier lines to land between the two extremes: more shimmer and definition than B8, without the cost of a full B20 cast line.',
    },
    {
      heading: 'Cast vs sheet — how a cymbal is actually made',
      body:
        'Cast cymbals are individually poured from raw molten alloy, then hammered and lathed by hand (or by controlled machine process) into their final shape — a slower, more expensive process that produces more complex, cymbal-to-cymbal-varied tone and is generally associated with better durability under sustained hard hitting. Sheet cymbals are cut from pre-rolled, uniform-thickness sheets of metal, which is faster and cheaper but produces a more uniform, simpler sound. Higher-tin alloys like B20 are almost always cast; lower-tin alloys like B8 are almost always sheet.',
    },
  ],
  tradeoffTable: ALLOYS_TABLE,
  sources: [
    { label: 'Zildjian — Frequently Asked Questions (cast vs. bronze cymbals, alloy composition)', url: 'https://zildjian.com/pages/frequently-asked-questions' },
    { label: 'Meinl Cymbals — Wiki (B8 / B10 / B12 / B20 bronze alloys)', url: 'https://meinlcymbals.com/en/Wiki' },
  ],
  faq: [
    {
      question: 'B20 vs B8 — what is the difference?',
      answer:
        'B20 bronze (80% copper, 20% tin) is cast and produces a darker, more complex professional tone; B8 bronze (92% copper, 8% tin) is cut from sheet metal and produces a brighter, simpler, more affordable sound. B20 dominates professional cymbal lines; B8 dominates entry-level and student lines.',
    },
    {
      question: 'What is the difference between cast and sheet bronze cymbals?',
      answer:
        'Cast cymbals are individually poured from molten alloy and then hand-shaped, giving a more complex tone and (generally) better durability under heavy playing. Sheet cymbals are cut from pre-rolled, uniform sheets of metal — faster and cheaper to produce, but simpler and brighter sounding, and typically less durable under sustained hard hitting.',
    },
    {
      question: 'Are brass cymbals bad?',
      answer:
        'Brass cymbals are not "bad," but they sit at the very entry level of cymbal alloys — softer and brighter than even B8 bronze, with the least complex tone — and are mainly found in the cheapest beginner packs rather than any line built for serious or heavy playing.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Sizes & Weights reference page (/cymbals/sizes-weights)
// ---------------------------------------------------------------------------

export const SIZES_WEIGHTS_TABLE = [
  { type: 'Hi-hat', typicalDiameter: '13"–15"', metalWeight: 'Medium to medium-heavy', why: 'Enough mass to cut through a dense mix and hold up to hard foot-and-stick work over a long set.' },
  { type: 'Crash', typicalDiameter: '16"–19"', metalWeight: 'Thin to medium', why: 'Thin enough to open up fast for an explosive accent, without being so fragile it cracks under repeated hard hits.' },
  { type: 'Ride', typicalDiameter: '20"–22"', metalWeight: 'Medium-heavy to heavy', why: 'Needs enough mass to survive being played almost continuously as a driving, sustained pattern at fast tempos.' },
  { type: 'China', typicalDiameter: '16"–20"', metalWeight: 'Thin to medium (thinner = trashier)', why: 'A thinner china opens up faster into that aggressive, explosive accent metal drummers want.' },
  { type: 'Splash', typicalDiameter: '8"–10"', metalWeight: 'Thin', why: 'Needs to speak instantly and decay fast for a quick accent — thickness would slow that response down.' },
];

export const SIZES_WEIGHTS_PAGE = {
  slug: 'sizes-weights',
  title: 'Best Cymbal Sizes & Weights for Metal (Diameter vs Pitch, Weight vs Attack) | MetalForge',
  description:
    'How cymbal diameter and weight change pitch, attack, wash, and durability — and what sizes and weights hold up best for heavy-hitting metal drumming.',
  keywords: 'best cymbal sizes for metal, cymbal weight, cymbal diameter, thin vs heavy cymbals, cymbal durability',
  h1: 'Cymbal Sizes & Weights: What Actually Changes the Sound',
  sections: [
    {
      heading: 'Diameter — bigger means lower and longer',
      body:
        'Increasing a cymbal\'s diameter lowers its fundamental pitch and generally increases both its volume potential and how long it sustains after being struck. A smaller cymbal of the same type and weight speaks higher, decays faster, and needs less energy to make it "open up" — one reason splashes and smaller crashes feel so immediate compared to a large ride.',
    },
    {
      heading: 'Weight — heavier means louder, more cutting, and more durable',
      body:
        'A heavier (thicker) cymbal is louder, projects a sharper attack, and generally survives harder, more repetitive hitting better than a thin one of the same diameter — all useful traits in metal. The trade-off is response: a heavy cymbal needs more force to "open up" into its full sound and tends to sound darker and less washy than a thin one, which is why thinner crashes are still common even in heavy genres, where an instantly explosive accent matters more than raw durability.',
    },
    {
      heading: 'Why metal setups skew heavier — durability under hard hitting',
      body:
        'Sustained fast, hard playing — blast beats especially — puts more repeated stress on a cymbal than most lighter styles. Medium-heavy to heavy weights, particularly on hi-hats and rides that take continuous contact, tend to resist cracking and keyholing (wear at the bell mounting hole) longer than thin cymbals under that kind of use, which is the main reason heavier weights are so common in metal setups even though they cost some responsiveness.',
    },
  ],
  table: SIZES_WEIGHTS_TABLE,
  tableSource: { label: 'SABIAN — Cymbals 101', url: 'https://sabian.com/cymbals-101/' },
  faq: [
    {
      question: 'Does cymbal size affect pitch?',
      answer:
        'Yes. A larger-diameter cymbal has a lower fundamental pitch and more sustain than a smaller one of the same type and weight; a smaller cymbal speaks higher and decays faster.',
    },
    {
      question: 'What is the best cymbal size for metal?',
      answer:
        'There is no single required size, but common, durable choices for metal are 13"–15" hi-hats, 16"–19" crashes, and a 20"–22" ride — sized to balance cutting through a dense mix with holding up to sustained hard hitting.',
    },
    {
      question: 'Do heavier cymbals last longer under hard hitting?',
      answer:
        'Generally yes — a heavier (thicker) cymbal resists cracking and wear at the bell better than a thin one under the same amount of hard, repeated playing, which is part of why medium-heavy to heavy weights are common in metal setups, even though they respond a little slower than thin cymbals.',
    },
  ],
};

export const REFERENCE_PAGES = {
  types: TYPES_PAGE,
  alloys: ALLOYS_PAGE,
  'sizes-weights': SIZES_WEIGHTS_PAGE,
};

export const REFERENCE_PAGE_ORDER = ['types', 'alloys', 'sizes-weights'];

export function getReferencePage(slug) {
  return REFERENCE_PAGES[slug] || null;
}

export function isValidReferenceSlug(slug) {
  return Object.prototype.hasOwnProperty.call(REFERENCE_PAGES, slug);
}

export function generateCanonicalUrl(slug) {
  return slug ? `${BASE_URL}/cymbals/${slug}` : `${BASE_URL}/cymbals`;
}

// FAQPage schema shared by the pillar page and every reference page.
export function generateFaqSchema(faq) {
  if (!faq || faq.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

// Article schema shared by the pillar page and every reference page.
export function generateArticleSchema(page, url) {
  const articleBody = page.sections
    ? page.sections.map(s => `${s.heading}\n\n${s.body}`).join('\n\n')
    : [page.intro, ...(page.howToChoose || []).map(s => `${s.heading}\n\n${s.body}`)].filter(Boolean).join('\n\n');
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
    articleBody,
    url,
    author: { '@type': 'Organization', name: 'MetalForge Editorial' },
    publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
  };
}

export default {
  PILLAR_PAGE,
  TYPES_PAGE,
  ALLOYS_PAGE,
  SIZES_WEIGHTS_PAGE,
  REFERENCE_PAGES,
  REFERENCE_PAGE_ORDER,
  TYPES_TABLE,
  ALLOYS_TABLE,
  SIZES_WEIGHTS_TABLE,
  getReferencePage,
  isValidReferenceSlug,
  generateCanonicalUrl,
  generateFaqSchema,
  generateArticleSchema,
};
