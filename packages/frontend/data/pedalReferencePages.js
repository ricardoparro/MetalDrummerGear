/**
 * Pedals Hub content module — Issue #4392 (epic #4387 phase 2/4).
 * Pillar page (/pedals) + reference pages (/pedals/drive-types|single-vs-double|setup-tuning).
 * Mirrors the snares hub pattern (data/snareReferencePages.js, epic #4308 phase 2)
 * and the cymbals/drumsticks hubs before it — same "typical, varies by brand/model"
 * discipline for every spec table, anchored to a manufacturer or drum-education
 * source rather than presented as a strict universal standard. All cited facts
 * were verified against the pages linked in `source`/`sources` before being
 * written here (no fabricated numbers or URLs).
 */

const BASE_URL = 'https://metalforge.io';

// ---------------------------------------------------------------------------
// Pillar page (/pedals)
// ---------------------------------------------------------------------------

export const PILLAR_PAGE = {
  slug: 'pedals',
  title: 'Bass Drum Pedal Guide: Drive Types, Double Pedals & Setup for Metal | MetalForge',
  description:
    'What actually shapes a metal drummer\'s pedal feel — drive type, single vs double, and spring/beater/footboard setup — plus the verified pedals of legendary metal drummers.',
  keywords: 'bass drum pedal, double bass pedal, direct drive vs chain pedal, single vs double bass pedal, longboard pedal, bass pedal spring tension, best pedal for metal',
  h1: 'Bass Drum Pedals: The Complete Guide for Metal Drummers',
  intro:
    'No other piece of gear is as personal to a metal drummer as the bass pedal. A snare or cymbal choice shapes the sound of the kit; the pedal shapes the physical feel of every single note a drummer\'s feet play, night after night, at tempos and note counts nothing else in music really demands. Three variables do almost all of the work in shaping that feel: the drive mechanism connecting the footboard to the beater, whether the setup is single or double, and how the pedal is tuned — spring tension, beater choice, and footboard length.',
  howToChoose: [
    {
      heading: 'Start with the drive type',
      body:
        'Chain drive is the universal standard — durable and familiar, but the chain can momentarily "collapse" or go slack on the upstroke. Belt drive swaps the chain for a reinforced strap, trading a touch of power transfer for a quieter, smoother stroke. Direct drive replaces both with a rigid link for a constant, flex-free connection — faster and more consistent, which is why so much of extreme metal has gravitated toward it. See the drive-types guide for the full chain-vs-belt-vs-direct-drive breakdown.',
    },
    {
      heading: 'Decide single vs double',
      body:
        'Single-pedal setups are common outside metal, but double bass drumming has been an integral part of heavy metal since early pioneers like Tommy Aldridge and Les Binks, and today it\'s close to a genre default. A double pedal adds a second footboard (the "slave" pedal) connected to the primary beater mechanism by a drive shaft, rather than requiring a second physical bass drum. See the single-vs-double guide for how that shaft-and-linkage mechanism actually works.',
    },
    {
      heading: 'Dial in spring tension, beater, and footboard',
      body:
        'Drive type and pedal count set the mechanical foundation; spring tension, beater material, and footboard length decide what actually happens under a drummer\'s feet on a given night. Tighter spring tension and a harder beater favor speed and cut; a longer "longboard" footboard changes how much of the foot\'s travel is usable for heel-up power strokes. See the setup-tuning guide for the full breakdown.',
    },
  ],
  brands: [
    { name: 'Tama', note: 'The single most common brand across the verified metal roster — the Iron Cobra (chain) and Speed Cobra (longboard footboard, chain) cover most of it, alongside the direct-drive Dyna-Sync line.' },
    { name: 'Pearl', note: 'The direct-drive Demon Drive is one of the most-used pedals on the verified roster; the Eliminator (including its longboard footboard option) is Pearl\'s chain/belt alternative.' },
    { name: 'DW', note: '5000 and 9000 Series chain-drive pedals are roster staples; the MFG Direct Drive (MDD) is DW\'s own direct-drive design, using a Floating Rotor and an Optimized Fulcrum Geometry linkage.' },
    { name: 'Axis (AXiS Pedal & Drum Co.)', note: 'Direct-drive specialists whose A and Longboard pedals became closely associated with extreme metal after Morbid Angel\'s Pete Sandoval\'s early adoption and advocacy.' },
    { name: 'Sonor', note: 'Perfect Balance and Giant Step pedals both appear on the verified roster, spanning single and double configurations.' },
    { name: 'Mapex', note: 'The Falcon double pedal is the brand\'s verified-roster pick, used by more than one metal drummer.' },
  ],
  bestForMetal:
    'There is no single "correct" metal pedal, but drummers chasing maximum speed and consistency at high note counts often gravitate toward a direct-drive double pedal (Axis A/Longboard, Pearl Demon Drive, DW MDD), a firmer spring tension, and a harder beater — see the drive-types, single-vs-double, and setup-tuning guides below for the full reasoning behind each part of that choice.',
  faq: [
    {
      question: 'What bass drum pedal do most metal drummers use?',
      answer:
        'There\'s no single pedal every metal drummer uses, but the verified roster skews heavily toward double pedals from Tama (Iron Cobra, Speed Cobra), Pearl (Demon Drive, Eliminator), and DW (5000/9000 Series, MFG Direct Drive), plus direct-drive Axis pedals among extreme-metal and blast-beat specialists.',
    },
    {
      question: 'Chain, belt, or direct drive — which is best for metal?',
      answer:
        'Chain drive is the most common and most universally serviceable; direct drive gives the fastest, most consistent response because there\'s no chain or belt to flex, which is why it\'s especially popular among extreme-metal and blast-beat drummers. Belt drive sits between the two — quieter than chain, with a bit less power transfer than a rigid direct-drive link.',
    },
    {
      question: 'Do you need a double pedal for metal?',
      answer:
        'Not strictly, but it\'s close to a genre default — double bass drumming has been core to heavy metal since early pioneers like Tommy Aldridge and Les Binks, and the overwhelming majority of the verified metal roster plays a double pedal (or true double bass drums) rather than a single pedal.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Drive-types reference page (/pedals/drive-types)
// ---------------------------------------------------------------------------

export const DRIVE_TYPES_TABLE = [
  { driveType: 'Chain drive', feel: 'A small amount of give; the chain can momentarily go slack ("collapse") on the upstroke.', powerTransfer: 'Efficient and durable — the long-standing industry default, with single- or double-chain options.', metalRole: 'The most common drive type across the verified metal roster (Tama Iron Cobra, DW 5000/9000 Series).' },
  { driveType: 'Belt drive', feel: 'Stiffer and quieter than chain, with no lubrication needed.', powerTransfer: 'Slightly more loss than chain or direct drive, so it asks a little more force from the foot.', metalRole: 'Less common in metal than chain or direct drive, but valued where a quieter stroke matters.' },
  { driveType: 'Direct drive', feel: 'A rigid link gives a constant, flex-free connection throughout the whole stroke.', powerTransfer: 'The fastest, most consistent power transfer of the three — nothing to flex or collapse.', metalRole: 'The extreme-metal and blast-beat standard for many players (Axis A/Longboard, Pearl Demon Drive, DW MFG Direct Drive).' },
];

export const DRIVE_TYPES_PAGE = {
  slug: 'drive-types',
  title: 'Direct Drive vs Chain Pedal (And Belt Drive Explained) | MetalForge',
  description:
    'How chain, belt, and direct-drive bass pedals actually work, the feel and power-transfer differences between them, and why extreme metal gravitates toward direct drive.',
  keywords: 'direct drive vs chain pedal, chain drive bass pedal, belt drive bass pedal, direct drive bass pedal, axis pedal, demon drive',
  h1: 'Bass Pedal Drive Types: Chain vs Belt vs Direct Drive',
  sections: [
    {
      heading: 'Chain drive: the universal standard',
      body:
        'A chain-drive pedal connects the footboard to the cam with a metal chain — single or double, with double chain more common today for its extra durability and reduced side-to-side flex. The trade-off is mechanical: a chain can momentarily go slack, or "collapse," on the upstroke, a brief moment where the connection isn\'t fully rigid. It\'s still the most widely used drive type by far, and the one every drummer learns on — Tama\'s Iron Cobra and DW\'s 5000/9000 Series pedals, both common across the verified metal roster, are chain drive.',
    },
    {
      heading: 'Belt drive: quieter, stiffer, less common',
      body:
        'Belt drive swaps the chain for a woven, reinforced belt. It\'s a stiffer connection than chain and needs no lubrication, running quieter as a result — Pearl\'s own engineering team has described a well-tensioned belt as behaving "somewhat like a direct-drive pedal." The trade-off is a small amount of extra power-transfer loss compared to chain or direct drive, meaning slightly more foot force is needed for the same output. It shows up far less often than chain or direct drive on the verified metal roster.',
    },
    {
      heading: 'Direct drive: the extreme-metal standard',
      body:
        'Direct drive removes the chain or belt entirely, bridging the footboard and beater with a rigid link so the connection never flexes or goes slack through the stroke. That constant connection is what makes direct drive feel faster and more consistent than chain or belt, especially at high note counts. Axis\'s A and Longboard pedals — direct drive since the line\'s 1990 debut — became closely associated with extreme metal in large part through Morbid Angel\'s Pete Sandoval\'s early adoption and advocacy. Pearl\'s Demon Drive and DW\'s MFG Direct Drive (MDD) are the other direct-drive pedals that show up repeatedly on the verified metal roster.',
    },
    {
      heading: 'So which is actually faster?',
      body:
        'Direct drive\'s rigid link gives it the edge in raw response and consistency, which is exactly why so many extreme-metal and blast-beat specialists use it. That doesn\'t make chain or belt "slow" — the overwhelming majority of professional metal drummers, including many playing at very high tempos, use chain-drive pedals like the Iron Cobra or DW 5000/9000 Series without issue. The practical differences are smaller than the marketing suggests; feel, personal technique, and familiarity matter as much as the mechanism itself.',
    },
  ],
  table: DRIVE_TYPES_TABLE,
  tableSource: { label: 'Modern Drummer — What You Need to Know About...Bass Drum Pedals', url: 'https://www.moderndrummer.com/2015/02/need-know-bass-drum-pedals/' },
  sources: [
    { label: 'Modern Drummer — What You Need to Know About...Bass Drum Pedals', url: 'https://www.moderndrummer.com/2015/02/need-know-bass-drum-pedals/' },
    { label: 'Yamaha Hub — The Modern Drum Set, Part 4: Foot Pedals', url: 'https://hub.yamaha.com/drums/stage/the-modern-drum-set-part-4-foot-pedals/' },
    { label: 'AXiS Pedal & Drum Co. — Longboard A-CAM Single Pedal', url: 'https://axispdc.com/products/longboard-a-cam-single-pedal' },
    { label: 'DW — MFG Direct Drive (MDD) Single Pedal', url: 'https://www.dwdrums.com/products/dwcpmdd-mfg-direct-drive-single-pedal/' },
  ],
  faq: [
    {
      question: 'What is a direct drive bass pedal?',
      answer:
        'A direct drive pedal replaces the chain or belt found on a standard pedal with a rigid link between the footboard and the beater mechanism, so the connection never flexes or goes slack through the stroke. Axis\'s A and Longboard pedals, Pearl\'s Demon Drive, and DW\'s MFG Direct Drive (MDD) are the best-known examples.',
    },
    {
      question: 'Is direct drive faster than chain drive?',
      answer:
        'Direct drive\'s rigid connection gives it a faster, more consistent response than chain drive, which can momentarily go slack ("collapse") on the upstroke. That said, the difference is more about consistency and feel than raw top speed — plenty of professional metal drummers play very fast on standard chain-drive pedals.',
    },
    {
      question: 'Why do metal drummers use direct drive pedals?',
      answer:
        'Direct drive\'s constant, flex-free connection appeals to drummers chasing maximum consistency at high note counts, which is why it\'s especially popular among extreme-metal and blast-beat specialists. Axis pedals in particular became closely tied to that scene through early advocates like Morbid Angel\'s Pete Sandoval.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Single-vs-double reference page (/pedals/single-vs-double)
// ---------------------------------------------------------------------------

export const SINGLE_VS_DOUBLE_TABLE = [
  { setup: 'Single pedal', mechanism: 'One footboard, one beater, one bass drum.', metalRole: 'Common outside metal; a minority setup on the verified metal roster.' },
  { setup: 'Double pedal (slave)', mechanism: 'Two footboards, one beater, one bass drum — the second (slave) footboard drives the beater via a drive shaft and linkage running to the primary pedal\'s mechanism.', metalRole: 'The dominant setup across the verified metal roster.' },
  { setup: 'True double bass drums', mechanism: 'Two physical bass drums, each with its own independent single pedal and beater.', metalRole: 'A less common alternative to a double pedal, used by some drummers for a similar two-footed effect.' },
];

export const SINGLE_VS_DOUBLE_PAGE = {
  slug: 'single-vs-double',
  title: 'Single vs Double Bass Pedal (And How Slave Pedals Work) | MetalForge',
  description:
    'Why double bass pedals are close to a metal genre default, how a slave pedal\'s drive shaft actually connects to the beater, and the real difference between a double pedal and true double bass drums.',
  keywords: 'single vs double bass pedal, double bass pedal, slave pedal, double pedal drive shaft',
  h1: 'Single vs Double Bass Pedal: Why Metal Lives on Two',
  sections: [
    {
      heading: 'Why metal drummers use a double pedal',
      body:
        'Double bass drumming has been an integral part of heavy metal since early pioneers like Tommy Aldridge and Les Binks helped establish it, and today it\'s close to a genre default rather than a specialty technique. A double pedal lets a drummer play fast, sustained two-footed bass drum patterns — the backbone of blast beats and double-time metal grooves — without needing a second physical bass drum.',
    },
    {
      heading: 'How a slave pedal actually works',
      body:
        'A double bass pedal operates much the same way a single pedal does, but with a second footboard controlling a second beater — most commonly by attaching that second (slave) footboard to a remote beater mechanism via a drive shaft running alongside the primary pedal\'s own mechanism. In practice that means one beater strikes the head, driven by whichever footboard is pressed; DW\'s "Complete Linkage Drive Assembly," for example, is the physical shaft-and-joint part that connects a 5000/9000 Series slave pedal to the master. Because the slave pedal has no bass drum of its own to rest against, it has to be leveled to the same height and angle as the master pedal before the drive-shaft connection is tightened.',
    },
    {
      heading: 'Double pedal vs true double bass drums',
      body:
        'It\'s worth separating two setups that get described the same way. A "double pedal" is two footboards driving one beater on one physical bass drum via the slave/drive-shaft mechanism above. "True" double bass drums instead use two separate physical bass drums, each with its own independent single pedal, for a similar two-footed effect — a setup some drummers choose over a double pedal, though it\'s less common on the verified metal roster than a single-drum double pedal.',
    },
  ],
  table: SINGLE_VS_DOUBLE_TABLE,
  tableSource: { label: 'Wikipedia — Double bass pedal', url: 'https://en.wikipedia.org/wiki/Double_bass_pedal' },
  sources: [
    { label: 'Wikipedia — Double bass pedal', url: 'https://en.wikipedia.org/wiki/Double_bass_pedal' },
    { label: 'DW — Complete Linkage Drive Assembly (DWSP211)', url: 'https://www.dwdrums.com/products/dwsp211-complete-linkage-drive-assembly/' },
    { label: 'Drumeo — How To Set Up Your Double Bass Pedals', url: 'https://www.drumeo.com/beat/double-bass-drumming-setup-tips/' },
  ],
  faq: [
    {
      question: 'What is a slave pedal?',
      answer:
        'The slave pedal is the second footboard in a double bass pedal setup — the one without a beater of its own. It\'s connected to the primary (master) pedal\'s beater mechanism by a drive shaft and linkage, so pressing either footboard strikes the same bass drum head.',
    },
    {
      question: 'Do you need two bass drums for double bass?',
      answer:
        'No — the overwhelming majority of double bass playing uses a double pedal (two footboards, one beater, one bass drum) rather than two separate physical bass drums. True double bass drums, each with its own independent single pedal, are a less common alternative some drummers still choose.',
    },
    {
      question: 'Why do metal drummers use double pedals instead of single?',
      answer:
        'Double bass drumming — fast, sustained two-footed bass drum patterns — has been core to heavy metal since early pioneers like Tommy Aldridge and Les Binks, and it underpins techniques like blast beats and double-time grooves that a single pedal can\'t sustain in the same way.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Setup-tuning reference page (/pedals/setup-tuning)
// ---------------------------------------------------------------------------

export const BEATER_TABLE = [
  { material: 'Felt', tone: 'The softest, warmest attack of the common beater materials, with more low-end thump and less high-frequency click.', metalRole: 'Still used by some metal drummers, often alongside a harder tip or patch for extra attack.' },
  { material: 'Plastic', tone: 'A harder, brighter attack than felt, with a more defined, percussive "click" on top of the low end.', metalRole: 'A common choice among metal drummers chasing a beater attack that cuts through a dense, distorted mix.' },
  { material: 'Wood', tone: 'The hardest, most percussive attack of the three, with the most pronounced click and the least low-end warmth.', metalRole: 'Popular for maximum cut and note definition at high speed, at the cost of some low-end body.' },
];

export const SETUP_TUNING_PAGE = {
  slug: 'setup-tuning',
  title: 'Bass Pedal Spring Tension, Beaters & Longboard Setup | MetalForge',
  description:
    'How spring tension, beater material and angle, and footboard length (standard vs longboard) shape a metal drummer\'s bass pedal feel — including Tama\'s Speed Cobra vs Iron Cobra.',
  keywords: 'bass pedal spring tension, longboard pedal, beater for metal, felt vs plastic beater, pedal footboard length',
  h1: 'Setting Up a Bass Pedal for Metal: Spring Tension, Beaters & Footboard',
  sections: [
    {
      heading: 'Spring tension: speed vs control',
      body:
        'Spring tension trades speed for control. A tighter spring returns the footboard to its starting position faster, which favors quick, repeated strokes and double bass playing, but it also asks more of the leg and can tire it out faster over a set. A looser spring is gentler on the leg and gives more room for dynamics and ghost notes, but it returns more slowly and can\'t keep up with the fastest patterns as easily. There\'s no single "correct" setting — many metal drummers run tighter tension specifically for sustained double bass passages and back it off for everything else.',
    },
    {
      heading: 'Beater material and angle',
      body:
        'Beater material changes the attack as much as any other single setting. Felt is the softest and warmest of the common materials; plastic is harder and brighter, with more defined click; wood is the hardest and most percussive of the three, trading away some low-end body for maximum cut and note definition — part of why it, and hard-plastic beaters, are common choices among metal drummers who want a beater attack that reads clearly against distorted, down-tuned guitars. Beater angle (typically adjustable in roughly the 30°–50° range) changes the trade-off further: a larger angle increases beater travel, volume, and power, while a smaller angle shortens the stroke for a faster, more responsive feel at somewhat lower volume.',
    },
    {
      heading: 'Footboard length: standard vs longboard',
      body:
        'Footboard length changes how much of the foot\'s travel is usable and where on the board different techniques land. A "longboard" is simply a longer-than-standard footboard, giving room for multiple foot positions — heel-up power strokes further forward, heel-toe technique further back — on a single pedal. Tama markets this trade-off directly: the company describes the Speed Cobra\'s footboard as deliberately built longer than the Iron Cobra\'s specifically to "rapidly accelerate the power and speed of the beater stroke... with less physical effort than ever before," citing roughly a 20% reduction in required exertion from its recessed heel setting. Axis\'s Longboard pedal (a 12"-long, 3.5"-wide footboard) applies the same idea from the direct-drive side — extending the board specifically so a player can shift technique across its length rather than being locked into one foot position.',
    },
  ],
  table: BEATER_TABLE,
  tableSource: { label: 'Drummingbase — Bass Drum Pedal Position Guide (Beater Angle and Height)', url: 'https://drummingbase.com/bass-drum-pedal-position-guide-beater-angle-and-height/' },
  sources: [
    { label: 'Grant Collins — Finding Your Groove: Loose vs. Tight Bass Drum Spring Tension', url: 'https://grantcollins.com/blog-page/b/finding-your-groove-loose-vs-tight-bass-drum-spring-tension' },
    { label: 'Drumeo — How To Set Up Your Double Bass Pedals', url: 'https://www.drumeo.com/beat/double-bass-drumming-setup-tips/' },
    { label: 'Drummingbase — Bass Drum Pedal Position Guide (Beater Angle and Height)', url: 'https://drummingbase.com/bass-drum-pedal-position-guide-beater-angle-and-height/' },
    { label: 'Tama — Speed Cobra HP310LW', url: 'https://www.tama.com/usa/products/detail/hp310lw.html' },
    { label: 'AXiS Pedal & Drum Co. — Longboard A-CAM Single Pedal', url: 'https://axispdc.com/products/longboard-a-cam-single-pedal' },
  ],
  faq: [
    {
      question: 'What spring tension is best for double bass playing?',
      answer:
        'Tighter spring tension generally favors fast, repeated double bass strokes because the footboard returns to position faster, though it asks more of the leg over a long set. Looser tension is easier on the leg and better for dynamics, but returns more slowly. Many drummers land somewhere in the middle and adjust by feel rather than following one fixed number.',
    },
    {
      question: 'Felt vs plastic vs wood beater — which is best for metal?',
      answer:
        'Wood and hard plastic beaters give the hardest, most percussive attack with the most defined click, which is why they\'re common choices among metal drummers chasing maximum cut against a dense mix. Felt is softer and warmer with more low-end thump. None is strictly "correct" — the choice comes down to how much click vs body a drummer wants.',
    },
    {
      question: 'What is a longboard pedal?',
      answer:
        'A longboard pedal has a footboard that\'s deliberately longer than a standard pedal\'s, giving room for multiple foot positions — heel-up power strokes further forward, heel-toe technique further back — on the same board. Tama\'s Speed Cobra (longer than its own Iron Cobra) and Axis\'s Longboard pedal are two well-known examples.',
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.h1,
    description: page.description,
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
  SINGLE_VS_DOUBLE_TABLE,
  BEATER_TABLE,
  getReferencePage,
  isValidReferenceSlug,
  generateCanonicalUrl,
  generateFaqSchema,
  generateArticleSchema,
};
