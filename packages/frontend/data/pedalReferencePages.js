/**
 * Pedals Hub content module — Issue #4392 (epic #4387 phase 2/4).
 * Pillar page (/pedals) + reference pages
 * (/pedals/drive-types|single-vs-double|setup-tuning).
 * Mirrors the snares hub pattern (data/snareReferencePages.js, epic #4308
 * phase 2) and the cymbals/drumsticks hubs before it — same "typical, varies
 * by brand/model" discipline for every spec table, anchored to a
 * manufacturer-education or drum-retailer source rather than presented as a
 * strict universal standard. All cited facts were verified against the pages
 * linked in `sources`/`tableSource` before being written here (no fabricated
 * numbers or URLs). Drummer/brand facts (Axis, Demon Drive, Speed Cobra,
 * Iron Cobra, etc.) are drawn from data/pedals.js (#4391), which is itself
 * parsed from verified roster gear.hardware strings.
 */

const BASE_URL = 'https://metalforge.io';

// ---------------------------------------------------------------------------
// Pillar page (/pedals)
// ---------------------------------------------------------------------------

export const PILLAR_PAGE = {
  slug: 'pedals',
  title: 'Bass Drum Pedals Guide: Drive Types, Setup & Tuning for Metal Drummers | MetalForge',
  description:
    'Chain vs belt vs direct drive, single vs double pedals, and how to set up spring tension, beater, and footboard for metal — plus the verified pedal of every legendary metal drummer.',
  keywords:
    'bass drum pedal, double bass pedal, direct drive vs chain pedal, single vs double bass pedal, bass pedal spring tension, longboard pedal',
  h1: 'Bass Drum Pedals: The Complete Guide for Metal Drummers',
  intro:
    'No piece of hardware is more personal to a metal drummer than the bass drum pedal. It\'s the one part of the kit in constant contact with the body for an entire set, translating leg strength and technique directly into blast beats, double-time grooves, and everything in between. Three decisions do almost all of the work in shaping how a pedal feels and performs: the drive mechanism connecting footboard to beater, whether you\'re running one pedal or two, and how the pedal is set up — spring tension, beater, and footboard length.',
  howToChoose: [
    {
      heading: 'Start with the drive type',
      body:
        'Chain, belt, and direct drive each transfer foot force to the beater differently, and that difference is the single biggest factor in how a pedal feels underfoot. Chain drive is the metal default; direct drive is why extreme metal specialists reach for an Axis or a Pearl Demon Drive. See the drive types guide for the full chain-vs-belt-vs-direct-drive breakdown.',
    },
    {
      heading: 'Decide single or double',
      body:
        'Modern metal — blast beats, constant sixteenth-note kick patterns, alternating footwork — runs on two beaters far more often than one. See the single-vs-double guide for how a second (slave) pedal actually drives a second beater on the same head, and when a single pedal still makes sense.',
    },
    {
      heading: 'Set it up for the sound and speed you need',
      body:
        'The pedal itself only sets the ceiling; spring tension, beater material, and footboard length decide what you actually feel and hear on a given night. See the setup & tuning guide for spring tension trade-offs, felt vs plastic vs wood beaters, and longboard vs standard footboards.',
    },
  ],
  brands: [
    { name: 'Tama', note: 'The single most common pedal brand across the verified metal roster — Iron Cobra (chain) and Speed Cobra (chain, longboard) cover most of the double-pedal roster.' },
    { name: 'Pearl', note: 'Demon Drive and Demon XR (direct drive) and Eliminator (chain) are the extreme-metal and technical-metal standard, from Hellhammer to George Kollias.' },
    { name: 'DW', note: '5000 and 9000 Series chain-drive pedals appear throughout the roster, prized for precision and touring reliability.' },
    { name: 'Axis', note: 'The direct-drive specialist brand — no chain or belt at all — used by drummers who prioritize instant, zero-slack response above everything else.' },
    { name: 'Mapex', note: 'The Falcon double pedal shows up across several roster drummers, including Chris Adler.' },
    { name: 'Trick', note: 'Boutique, CNC-machined direct-drive pedals (Pro1-V, Bigfoot) used by technically elite players who have outgrown production hardware.' },
  ],
  bestForMetal:
    'There is no single "correct" metal pedal, but the verified roster shows a clear pattern: a double pedal (not single) for anything beyond doom or traditional heavy metal, chain drive (Iron Cobra, Speed Cobra, DW 9000) as the versatile all-rounder, and direct drive (Axis, Pearl Demon Drive) for drummers who specifically chase extreme, sustained speed. See the drive types and single-vs-double guides below for the full reasoning behind each part of that choice.',
  faq: [
    {
      question: 'What bass drum pedal do most metal drummers use?',
      answer:
        'There\'s no single pedal every metal drummer uses, but the verified roster skews heavily toward double pedals from Tama (Iron Cobra, Speed Cobra), Pearl (Demon Drive, Eliminator), and DW (5000/9000 Series), with direct-drive options like Axis reserved mostly for extreme-speed specialists.',
    },
    {
      question: 'Is direct drive better than chain drive for metal?',
      answer:
        'Neither is strictly "better" — chain drive is the metal default, giving a natural, slightly cushioned feel that most drummers find comfortable and powerful. Direct drive removes all slack between footboard and beater for the fastest, most immediate response, which is why extreme metal drummers chasing sustained top-end speed often gravitate to it. See the drive types guide for the full comparison.',
    },
    {
      question: 'Do I need a double bass pedal for metal?',
      answer:
        'For most metal styles, yes. Blast beats and constant sixteenth-note kick patterns are built around two beaters. Only doom, traditional heavy metal, and some groove metal primarily run single bass drum setups — see the single-vs-double guide for the full breakdown.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Drive types reference page (/pedals/drive-types)
// ---------------------------------------------------------------------------

export const DRIVE_TYPES_TABLE = [
  { driveType: 'Chain drive', feel: 'Slight flex/give — a natural, slightly cushioned feel most drummers find comfortable.', response: 'A small amount of lag exists (every chain link is a point of contact), though it\'s effectively imperceptible in normal play.', examples: 'Tama Iron Cobra, Tama Speed Cobra, DW 5000/9000 Series, Pearl Eliminator' },
  { driveType: 'Belt drive', feel: 'Lighter and more responsive underfoot than chain — nylon or composite belts add strength without chain weight.', response: 'Faster than chain, won\'t "collapse" on the upstroke during rapid double strokes the way a slack chain can.', examples: 'Select Axis and boutique pedal models' },
  { driveType: 'Direct drive', feel: 'Rigid rod, zero slack — the most immediate, "cam-less" connection between footboard and beater.', response: 'The fastest and most consistent response of the three, with the least unaccounted-for sideways flex.', examples: 'Axis (all models), Pearl Demon Drive, Pearl Demon XR, Trick Pro1-V, Trick Bigfoot, DW MDD' },
];

export const DRIVE_TYPES_PAGE = {
  slug: 'drive-types',
  title: 'Direct Drive vs Chain Pedal (And Belt Drive Explained) | MetalForge',
  description:
    'Chain, belt, and direct drive bass drum pedals compared — feel, response, and power transfer — and why extreme metal gravitates to direct drive pedals like Axis and the Pearl Demon Drive.',
  keywords: 'direct drive vs chain pedal, chain drive bass pedal, belt drive bass pedal, direct drive bass pedal, Axis pedal, Demon Drive',
  h1: 'Bass Drum Pedal Drive Types: Chain vs Belt vs Direct Drive',
  sections: [
    {
      heading: 'Chain drive: the metal default',
      body:
        'Chain drive connects the footboard to the beater shaft (via the pedal\'s cam) with a metal chain, and has been the standard drive type since the 1970s — most pedals, in every genre, still use it. The chain has a small amount of natural flex, which gives a cushioned, forgiving feel that most drummers find comfortable and powerful. There is a tiny amount of lag, since every link in the chain is a point of contact, but it\'s microseconds and imperceptible to almost every player. Tama\'s Iron Cobra and Speed Cobra, DW\'s 5000 and 9000 Series, and Pearl\'s Eliminator are all chain drive, and together they cover the largest share of double pedals on the verified metal roster.',
    },
    {
      heading: 'Belt drive: a lighter middle ground',
      body:
        'Belt drive replaces the chain with a nylon or composite belt. It\'s lighter and more responsive underfoot than chain drive, and — unlike a chain, which can bunch up on a very fast upstroke — a belt stays taut through rapid double strokes. It sits between chain and direct drive in feel: faster and lighter than chain, but without direct drive\'s complete rigidity. It\'s less common in modern metal than the other two types, showing up mostly on select boutique and hybrid pedal designs.',
    },
    {
      heading: 'Direct drive: zero slack, maximum speed',
      body:
        'Direct drive pedals were actually the original bass drum pedal design, and they connect the footboard straight to the beater with a solid metal rod — no chain, no belt, no cam-driven slack of any kind. That rigid, "cam-less" connection gives the most immediate and consistent response of the three drive types, with far less unaccounted-for sideways flex than a chain or belt pedal. The trade-off is feel: direct drive is less forgiving and takes more technique adaptation for players used to chain drive\'s natural give, and direct-drive pedals tend to sit at a higher price point.',
    },
    {
      heading: 'Why extreme metal gravitates to direct drive',
      body:
        'Direct drive\'s biggest advantage — instant, zero-lag transfer from foot to beater — matters most exactly where extreme metal lives: sustained, maximum-speed single-stroke and blast-beat patterns where even microscopic response lag compounds over hundreds of strokes per minute. That\'s why Axis, a brand built entirely around direct drive, and the Pearl Demon Drive (used across the verified roster by drummers including George Kollias, Gene Hoglan, and several black and death metal specialists) are the go-to choice for drummers chasing raw, sustained top-end speed, while chain drive remains the comfortable, versatile default for every other style of metal.',
    },
  ],
  table: DRIVE_TYPES_TABLE,
  tableSource: { label: 'Sweetwater InSync — Kick Pedal Drive Types Explained', url: 'https://www.sweetwater.com/insync/kick-pedal-drive-types-explained/' },
  sources: [
    { label: 'Sweetwater InSync — Kick Pedal Drive Types Explained', url: 'https://www.sweetwater.com/insync/kick-pedal-drive-types-explained/' },
    { label: 'Sound Pure — Bass Drum Pedal Drive Types', url: 'https://www.soundpure.com/a/expert-advice/drums/bass-drum-pedal-drive-types/' },
  ],
  faq: [
    {
      question: 'Direct drive vs chain pedal — which is better for metal?',
      answer:
        'Neither is strictly "better." Chain drive gives a natural, slightly cushioned feel that most drummers find comfortable and is the metal default (Tama Iron Cobra, DW 9000). Direct drive removes all slack for the fastest, most consistent response, which is why extreme-speed specialists often prefer it (Axis, Pearl Demon Drive) — but it takes more technique adaptation and costs more.',
    },
    {
      question: 'What drive type does Axis use?',
      answer:
        'Axis pedals are direct drive — the brand is built entirely around a solid-rod connection between footboard and beater rather than a chain or belt, which is part of why Axis pedals are common among extreme metal drummers chasing maximum, zero-lag response.',
    },
    {
      question: 'Is belt drive faster than chain drive?',
      answer:
        'Belt drive is generally lighter and more responsive underfoot than chain drive, and a taut belt won\'t bunch up on a fast upstroke the way a slack chain sometimes can. It\'s still not as rigid or immediate as direct drive, and it\'s far less common than chain or direct drive in modern metal pedals.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Single vs double reference page (/pedals/single-vs-double)
// ---------------------------------------------------------------------------

export const CONFIGURATION_TABLE = [
  { configuration: 'Single pedal', mechanism: 'One footboard, one beater, mounted directly on the bass drum hoop.', bestFor: 'Doom, traditional heavy metal, and groove-focused metal where two feet aren\'t needed for the pattern.' },
  { configuration: 'Double pedal', mechanism: 'A primary pedal mounted on the hoop plus a slave pedal, linked by a drive shaft that runs along the floor and turns a second beater on the same head.', bestFor: 'Blast beats, sustained sixteenth-note kick patterns, and virtually every other modern metal subgenre.' },
];

export const SINGLE_VS_DOUBLE_PAGE = {
  slug: 'single-vs-double',
  title: 'Single vs Double Bass Pedal: Why Metal Lives on Two Beaters | MetalForge',
  description:
    'Why metal drumming runs almost entirely on double bass pedals — plus how a slave pedal and drive shaft actually work to fire a second beater on one bass drum head.',
  keywords: 'single vs double bass pedal, double bass pedal, slave pedal, drive shaft bass pedal',
  h1: 'Single vs Double Bass Pedal: Why Metal Lives on Two Beaters',
  sections: [
    {
      heading: 'Why metal lives on double pedals',
      body:
        'A single pedal gives one foot, one beater, and one stroke at a time — enough for most rock and traditional heavy metal grooves. Modern metal asks for far more: blast beats, constant sixteenth-note kick patterns, and rapid alternating footwork that a single foot simply can\'t sustain on its own. Across the verified metal roster, the overwhelming majority of drummers — from groove metal through death, black, and technical metal — run a double pedal rather than a single one. The exceptions cluster around doom, traditional heavy metal, and groove-oriented playing where the pattern genuinely doesn\'t call for two beaters.',
    },
    {
      heading: 'How a double pedal actually works: the slave pedal',
      body:
        'A double pedal setup uses two separate footboards. The primary pedal clamps onto the bass drum hoop exactly like a single pedal would and drives the main beater. The second footboard — the slave pedal — sits where a hi-hat pedal normally would, under the drummer\'s other foot, and doesn\'t touch the drum at all. Instead, pressing the slave footboard turns a drive shaft that runs across to the primary unit, which fires a second beater against the same bass drum head. Both beaters strike the one head, so to a listener it sounds identical to two separate bass drums.',
    },
    {
      heading: 'Drive shaft basics',
      body:
        'The drive shaft is a metal rod that runs along the floor in front of the kit, connecting the slave pedal to the primary pedal via a universal joint at each end. Those joints let the shaft transmit the slave pedal\'s motion to the primary unit\'s cam even though the two pedals sit at a slight angle to each other. Because everything routes through a single drive shaft, a double pedal only requires one bass drum — no need for two full-size kick drums to get two-beater speed and patterns.',
    },
  ],
  table: CONFIGURATION_TABLE,
  tableSource: { label: 'Drumeo — How To Set Up Your Double Bass Pedals', url: 'https://www.drumeo.com/beat/double-bass-drumming-setup-tips/' },
  sources: [
    { label: 'Drumeo — How To Set Up Your Double Bass Pedals', url: 'https://www.drumeo.com/beat/double-bass-drumming-setup-tips/' },
  ],
  faq: [
    {
      question: 'Single vs double bass pedal — what\'s the difference?',
      answer:
        'A single pedal drives one beater with one foot; a double pedal adds a slave pedal under the other foot, linked by a drive shaft, so both beaters strike the same bass drum head. Most modern metal — blast beats, sustained sixteenth-note kick patterns — is built around the double pedal\'s two-beater speed.',
    },
    {
      question: 'How does a slave pedal work?',
      answer:
        'The slave pedal sits where a hi-hat pedal normally would. Pressing it turns a drive shaft that runs across the floor to the primary pedal, which fires a second beater against the same bass drum head the primary pedal is mounted on — no second bass drum required.',
    },
    {
      question: 'Do you need two bass drums for a double pedal?',
      answer:
        'No. A double pedal fires two beaters at one bass drum head through a single drive shaft, which is exactly why it replaced the two-bass-drum setups common in earlier metal — same two-beater sound and speed, one drum, less to carry and mic.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Setup & tuning reference page (/pedals/setup-tuning)
// ---------------------------------------------------------------------------

export const BEATER_TABLE = [
  { material: 'Felt', tone: 'Warm, rounded thud with minimal attack — more boom than punch.', metalRole: 'Common on warmer, less aggressive metal tones where body matters more than cut.' },
  { material: 'Plastic (hard)', tone: 'Defined, bright, cutting attack that sits clearly in a mix.', metalRole: 'The standard modern-metal choice — the "click" most recorded metal kick tones are built around.' },
  { material: 'Wood', tone: 'Articulate and punchy with a darker tone, scooped mids and strong highs/lows.', metalRole: 'Used for a harder-edged, more percussive attack than felt without going as bright as plastic.' },
];

export const SETUP_TUNING_PAGE = {
  slug: 'setup-tuning',
  title: 'How to Set Up a Bass Drum Pedal for Metal (Spring, Beater & Footboard) | MetalForge',
  description:
    'Bass pedal spring tension, beater choice and angle (felt vs plastic vs wood), and longboard vs standard footboard length — including Tama Speed Cobra vs Iron Cobra.',
  keywords: 'bass pedal spring tension, longboard pedal, bass drum beater, felt vs plastic beater, footboard length',
  h1: 'How to Set Up and Tune a Bass Drum Pedal for Metal',
  sections: [
    {
      heading: 'Spring tension: control vs speed',
      body:
        'Spring tension is the first thing most drummers adjust, and it\'s largely a trade-off: looser tension gives more control at the cost of some rebound speed, while tighter tension gives faster rebound because the spring does more of the work bringing the beater back — useful for sustained straight sixteenths, but demanding more precise foot control. Many metal drummers chasing raw speed and endurance run their tension cranked high so the pedal does more of the work; others — including plenty of double-bass metal players — prefer a lower tension specifically because the added control outweighs the small speed cost. There\'s no universal "correct" setting; it comes down to technique and how much of the rebound you want the spring doing versus your foot.',
    },
    {
      heading: 'Beater choice and angle',
      body:
        'Beater material changes the pedal\'s tone as much as the drum itself. Felt gives a warm, rounded thud with minimal attack. Plastic gives a bright, defined, cutting attack — the standard choice behind most modern recorded metal kick tones, since a hard surface reads as brighter and sharper the harder it gets. Wood sits between the two: articulate and punchy, with a darker, more scooped tone than plastic. Beater angle matters too — a higher (more vertical) resting angle means a shorter stroke and a harder impact, favoring power, while a lower angle means a longer stroke with more speed potential; most metal drummers land on a mid-to-high angle as the balance point.',
    },
    {
      heading: 'Footboard length: longboard vs standard',
      body:
        'The other major setup variable is footboard length. A standard-length footboard (e.g. the Tama Iron Cobra) is the traditional size; a longboard (e.g. the Tama Speed Cobra) extends that length and moves the nose of the board back from the bass drum. A longer footboard is effectively a longer lever, so less foot strength is needed to move the beater — minimizing the effort per stroke, which is why longboards are associated with faster footwork and heel-toe technique. The trade-off is a slightly lighter feel that some drummers find gives up a touch of raw power compared to a standard board\'s more direct leverage.',
    },
  ],
  table: BEATER_TABLE,
  tableSource: { label: 'Sweetwater InSync — Different Types of Bass Drum Beaters', url: 'https://www.sweetwater.com/insync/different-types-of-bass-drum-beaters/' },
  sources: [
    { label: 'Sweetwater InSync — Different Types of Bass Drum Beaters', url: 'https://www.sweetwater.com/insync/different-types-of-bass-drum-beaters/' },
    { label: 'Drumming Base — Bass Drum Pedal Spring Tension: How to Get the Right Setup', url: 'https://drummingbase.com/bass-drum-pedal-spring-tension-how-to-get-the-right-setup/' },
    { label: 'Drumstrive — Iron Cobra vs Speed Cobra: Which Tama Pedal Should You Buy?', url: 'https://drumstrive.com/iron-cobra-vs-speed-cobra/' },
  ],
  faq: [
    {
      question: 'What spring tension is best for metal bass pedals?',
      answer:
        'There\'s no single correct setting — it\'s a control-vs-speed trade-off. Higher tension gives faster rebound and lets the spring do more of the work, which many speed-focused metal drummers prefer for sustained sixteenths. Lower tension gives more control and is often preferred by drummers who value precision over the small speed gain, including plenty of double-bass metal players.',
    },
    {
      question: 'What is a longboard pedal?',
      answer:
        'A longboard is an extended-length footboard — the Tama Speed Cobra is the best-known metal example, versus the standard-length board on a pedal like the Tama Iron Cobra. The extra length acts as a longer lever, needing less foot strength per stroke, which suits fast footwork and heel-toe technique at a slight cost to raw power.',
    },
    {
      question: 'Felt vs plastic beater — which is better for metal?',
      answer:
        'Plastic beaters give a brighter, more defined, cutting attack and are the standard behind most modern recorded metal kick tones. Felt beaters give a warmer, rounder thud with less attack. Wood sits in between, with a darker, punchier tone than plastic. The choice is about the tone you want, not a right-or-wrong answer.',
    },
  ],
};

export const REFERENCE_PAGES = {
  'drive-types': DRIVE_TYPES_PAGE,
  'single-vs-double': SINGLE_VS_DOUBLE_PAGE,
  'setup-tuning': SETUP_TUNING_PAGE,
};

export const REFERENCE_PAGE_ORDER = ['drive-types', 'single-vs-double', 'setup-tuning'];

export function getReferencePage(slug) {
  return REFERENCE_PAGES[slug] || null;
}

export function isValidReferenceSlug(slug) {
  return Object.prototype.hasOwnProperty.call(REFERENCE_PAGES, slug);
}

export function generateCanonicalUrl(slug) {
  return slug ? `${BASE_URL}/pedals/${slug}` : `${BASE_URL}/pedals`;
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
  DRIVE_TYPES_PAGE,
  SINGLE_VS_DOUBLE_PAGE,
  SETUP_TUNING_PAGE,
  REFERENCE_PAGES,
  REFERENCE_PAGE_ORDER,
  DRIVE_TYPES_TABLE,
  CONFIGURATION_TABLE,
  BEATER_TABLE,
  getReferencePage,
  isValidReferenceSlug,
  generateCanonicalUrl,
  generateFaqSchema,
  generateArticleSchema,
};
