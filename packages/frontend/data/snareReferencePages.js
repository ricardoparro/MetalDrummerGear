/**
 * Snares Hub content module — Issue #4310 (epic #4308 phase 2/4).
 * Pillar page (/snares) + reference pages (/snares/shells|sizes|tuning-for-metal).
 * Mirrors the cymbals hub pattern (data/cymbalReferencePages.js, epic #4303 phase 2)
 * and the drumsticks hub pattern before it — same "typical, varies by brand/model"
 * discipline for every spec table, anchored to a manufacturer or drum-education
 * source rather than presented as a strict universal standard. All cited facts
 * were verified against the pages linked in `source`/`sources` before being
 * written here (no fabricated numbers or URLs).
 */

const BASE_URL = 'https://metalforge.io';

// ---------------------------------------------------------------------------
// Pillar page (/snares)
// ---------------------------------------------------------------------------

export const PILLAR_PAGE = {
  slug: 'snares',
  title: 'Snare Drums Guide: Shells, Sizes & Tuning for Metal Drummers | MetalForge',
  description:
    'What actually shapes a metal snare sound — shell material, size, and tuning — plus the verified signature snares of legendary metal drummers.',
  keywords: 'snare drum, snare shells, snare drum sizes, tuning a snare for metal, best snare for metal, steel vs maple snare, brass snare sound',
  h1: 'Snare Drums: The Complete Guide for Metal Drummers',
  intro:
    'Of everything in a metal drummer\'s kit, the snare does the most to define the sound of the whole performance. It carries the backbeat, drives blast beats and double-time grooves, and has to cut through distorted, down-tuned guitars and dense low end night after night. Three variables do almost all of the work in shaping that sound: the shell material it\'s built from, its diameter and depth, and how it\'s tuned — including the snare wires and heads on it.',
  howToChoose: [
    {
      heading: 'Start with the shell material',
      body:
        'Metal shells (steel, brass, bronze, aluminium) generally deliver more cut, more rimshot "crack," and more raw projection than wood; wood shells (maple, birch, walnut) generally deliver more warmth and tonal body. See the shells guide for the full steel-vs-maple, brass-snare-sound breakdown, including cast vs rolled/sheet construction.',
    },
    {
      heading: 'Pick a size that matches the attack you want',
      body:
        'A 14x6.5" shell is the metal workhorse — enough depth for body without losing crack. Shallower drums (13", or a 3"–4.5" deep piccolo) trade some low-end body for a sharper, higher-pitched attack. See the sizes guide for the full depth/diameter trade-off.',
    },
    {
      heading: 'Tune (and equip) it for the sound you\'re chasing',
      body:
        'Shell and size set the ceiling; tuning, snare wires, and heads decide what actually comes out of the drum on a given night. High-tension tuning with a tight, low-mass batter head and firm wire tension is how most modern metal drummers get a dry, clicky, cutting snare sound. See the tuning guide for the full breakdown.',
    },
  ],
  brands: [
    { name: 'Tama', note: 'The single most common brand across the verified metal roster — S.L.P. and Starclassic lines span steel, brass, and maple shells.' },
    { name: 'Pearl', note: 'Reference (brass/steel) and Masters (maple) series both show up widely, alongside several artist-signature models.' },
    { name: 'Ludwig', note: 'Home of the Black Beauty and Supraphonic — two of the most recorded metal shells (brass and aluminium/steel respectively) in drumming history.' },
    { name: 'Sonor', note: 'SQ2 (customizable maple) and several artist-signature models (Tomas Haake, Nicko McBrain) are common metal-roster picks.' },
    { name: 'Mapex', note: 'Black Panther and artist-signature lines (Chris Adler) cover both metal shells and maple/walnut hybrids.' },
    { name: 'DW', note: 'Collector\'s Series and Performance Series snares appear in both maple and steel across the verified roster.' },
  ],
  bestForMetal:
    'There is no single "correct" metal snare, but drummers chasing a cutting, high-endurance sound often gravitate toward a metal shell (steel or brass) in the 14x6.5" or 14x5.5"–6" range, high-tension tuning, and a batter head suited to hard, fast playing — see the shells, sizes, and tuning guides below for the full reasoning behind each part of that choice.',
  faq: [
    {
      question: 'What snare do most metal drummers use?',
      answer:
        'There\'s no single snare every metal drummer uses, but the verified roster skews heavily toward 14" diameter, 5.5"–6.5" deep shells in steel, brass, or maple from brands like Tama, Pearl, Ludwig, Sonor, and Mapex — including several purpose-built signature models.',
    },
    {
      question: 'Is a metal or wood snare better for metal music?',
      answer:
        'Neither is strictly "better" — metal shells (steel, brass, bronze, aluminium) tend to cut harder and deliver a sharper rimshot, while wood shells (maple, birch, walnut) tend to sound warmer with more tonal body. Plenty of professional metal drummers use both; see the shells guide for the full comparison.',
    },
    {
      question: 'What size snare is best for metal?',
      answer:
        '14x6.5" is the most common "workhorse" size across the verified metal roster, balancing crack with body. Shallower options like a 13" (e.g. Joey Jordison\'s signature model) or a 3"–4.5"-deep piccolo trade some low-end body for a sharper, higher-pitched attack.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Shells reference page (/snares/shells)
// ---------------------------------------------------------------------------

export const SHELLS_TABLE = [
  { material: 'Steel', category: 'Metal', tone: 'Bright, powerful cut with a very distinct, loud rimshot — the classic hard-rock/metal "crack."', metalRole: 'A default choice when the priority is slicing through loud, distorted guitars.' },
  { material: 'Brass', category: 'Metal', tone: 'Crisp yet warm — sits between a metal and wood snare, with a dark, full low-end attack.', metalRole: 'Popular where drummers want metal-shell cut without losing all wood-like warmth (e.g. Ludwig Black Beauty).' },
  { material: 'Bronze / Copper', category: 'Metal', tone: 'Darker and warmer than steel or brass, with less of the sharpest edge.', metalRole: 'Less common in metal than steel/brass, but used where a darker metal tone is wanted (e.g. artist-signature bronze models).' },
  { material: 'Aluminium', category: 'Metal', tone: 'Crisp and well-defined, but drier with less sustain than steel or brass.', metalRole: 'Used on classic all-around shells (e.g. Ludwig Supraphonic) that read as bright and articulate rather than heavy.' },
  { material: 'Maple', category: 'Wood', tone: 'Warm, balanced tone across the frequency range with a wide tuning range.', metalRole: 'The most common wood shell on the verified metal roster — versatile enough for both riffing and ballad dynamics.' },
  { material: 'Birch', category: 'Wood', tone: 'Brighter than maple, with emphasized highs and lows and a crisper attack.', metalRole: 'Chosen when a drummer wants a wood shell that still cuts through a dense mix.' },
  { material: 'Walnut', category: 'Wood', tone: 'Dense and dark-leaning; often blended with maple in hybrid shells for extra low-end weight.', metalRole: 'Typically paired with maple in metal-roster hybrid shells (e.g. Mapex\'s Chris Adler signature) rather than used alone.' },
];

export const SHELLS_PAGE = {
  slug: 'shells',
  title: 'Steel vs Maple Snare (And Every Other Shell Material Explained) | MetalForge',
  description:
    'Steel, brass, bronze, and aluminium metal snare shells vs maple, birch, and walnut wood shells — how each affects crack, cut, and projection, plus cast vs rolled construction.',
  keywords: 'steel vs maple snare, brass snare sound, snare shell materials, metal snare shells, wood snare shells, cast vs rolled snare',
  h1: 'Snare Shells: Steel vs Maple (And Everything In Between)',
  sections: [
    {
      heading: 'Metal shells: steel, brass, bronze, and aluminium',
      body:
        'Metal shells generally cut harder and deliver a sharper, more powerful rimshot than wood — a big part of why they\'re so common in metal. Steel is the brightest and most aggressive of the group, prized for raw cut. Brass sits between metal and wood, crisp but with real warmth (the Ludwig Black Beauty is the best-known example). Bronze and copper shells lean darker and warmer than steel or brass. Aluminium is crisp and well-defined but drier, with less sustain than steel or brass — the classic Ludwig Supraphonic is built this way.',
    },
    {
      heading: 'Wood shells: maple, birch, and walnut',
      body:
        'Wood shells trade some of that metallic cut for warmth and tonal body. Maple is the most common wood shell on the verified metal roster — a balanced, versatile tone across the frequency range. Birch is brighter than maple, with emphasized highs and lows that help it cut through a mix more than a typical wood shell. Walnut is denser and darker-leaning, and on the metal roster it usually shows up blended with maple in a hybrid shell for added low-end weight rather than used alone.',
    },
    {
      heading: 'Cast vs rolled (and hand-spun) construction',
      body:
        'How a metal shell is manufactured changes its tone as much as the material itself. Rolled/welded shells are sheet metal rolled into a cylinder and welded along a seam — an efficient, lower-cost process, though the seam can interrupt shell vibration and airflow, which tends to soften the tone a little compared to a seamless shell. Hand-spun (seamless) shells are stretched and formed over a mold with no weld seam, giving a fuller, more defined fundamental with a wider tonal range than a welded shell. Cast shells are poured from molten metal and then machined to final thickness — the slowest, most expensive method, associated with the most projective, full-bodied tone of the three.',
    },
  ],
  table: SHELLS_TABLE,
  tableSource: { label: 'AllThingsGear — Snare drum shell materials', url: 'https://allthingsgear.com/snare-drum-shell-materials/' },
  sources: [
    { label: 'AllThingsGear — Snare drum shell materials: how different woods and metals affect the sound of your snare', url: 'https://allthingsgear.com/snare-drum-shell-materials/' },
    { label: 'Sound Pure — Common Metal Snare Drum Shells (welded vs hand-spun vs cast construction)', url: 'https://www.soundpure.com/a/expert-advice/drums/common-metal-snare-drum-shells/' },
  ],
  faq: [
    {
      question: 'Steel vs maple snare — which is better for metal?',
      answer:
        'Steel shells generally deliver a brighter, more powerful cut and a louder, more distinct rimshot — useful for slicing through loud, distorted guitars. Maple shells deliver a warmer, more balanced tone with a wider tuning range. Many professional metal drummers use both; the right choice depends on whether you prioritize raw cut or tonal warmth.',
    },
    {
      question: 'What does a brass snare sound like?',
      answer:
        'A brass snare sits tonally between a metal and a wood shell — crisp and articulate like steel, but with a darker, warmer, fuller low-end attack than steel typically has. The Ludwig Black Beauty is the best-known example of this sound.',
    },
    {
      question: 'Is a cast snare shell better than a rolled one?',
      answer:
        'Cast shells are generally considered the most projective and full-bodied of the metal shell types, since they\'re poured from molten metal rather than rolled and welded, but they\'re also the most expensive to produce. Rolled/welded shells are more affordable and still widely used, though the weld seam can slightly soften the tone compared to a seamless (hand-spun) or cast shell.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Sizes reference page (/snares/sizes)
// ---------------------------------------------------------------------------

export const SIZES_TABLE = [
  { size: '14" x 6.5"', category: 'Workhorse', why: 'The most common size on the verified metal roster — deep enough for body and low end without giving up crack. The default "if in doubt" size.' },
  { size: '14" x 5.5"–6"', category: 'Workhorse (shallower)', why: 'A slightly shallower version of the workhorse — a touch more crack and a little less body/sustain than the 6.5" depth.' },
  { size: '13" x 6.5"', category: 'Smaller diameter', why: 'A smaller-diameter shell raises the pitch and sharpens the attack relative to a 14" of the same depth. Joey Jordison\'s signature Pearl model uses this size.' },
  { size: 'Piccolo (3"–4.5" deep)', category: 'Shallow / effects', why: 'A very shallow shell (typically 13" or 14" diameter) that produces a high-pitched, sharp "pop" with a fast attack but less overall volume and sustain than a standard-depth snare.' },
];

export const SIZES_PAGE = {
  slug: 'sizes',
  title: '13 vs 14 Snare (And Every Common Snare Drum Size Explained) | MetalForge',
  description:
    '14x6.5" as the metal workhorse size, 13" (Joey Jordison\'s signature) and piccolo depths, and how diameter and depth trade off crack against body.',
  keywords: 'snare drum sizes, 13 vs 14 snare, 14x6.5 snare, piccolo snare, snare depth',
  h1: 'Snare Drum Sizes: 13 vs 14, and What Depth Actually Changes',
  sections: [
    {
      heading: '14x6.5" — the metal workhorse',
      body:
        'A 14" diameter, 6.5" deep shell is the most common size across the verified metal roster, and for good reason: it\'s deep enough to give the drum real body and low-end weight without sacrificing the sharp attack a metal snare needs. Plenty of players use a slightly shallower 5.5"–6" depth instead, trading a little of that body for a touch more crack.',
    },
    {
      heading: '13" — a smaller-diameter alternative',
      body:
        'A smaller diameter (13" instead of 14") raises the shell\'s fundamental pitch and sharpens its attack relative to a same-depth 14" drum. Joey Jordison\'s signature Pearl snare is a well-known 13x6.5" example on the metal roster — proof that a smaller diameter can still carry plenty of depth and body when paired with a full 6.5" shell.',
    },
    {
      heading: 'Piccolo snares — maximum attack, minimum sustain',
      body:
        'A piccolo snare is a very shallow shell — typically 3" to 4.5" deep, usually at a 13" or 14" diameter — built for a high-pitched, sharp "pop" that cuts a mix instantly. The trade-off is volume and sustain: piccolo snares are less versatile than a standard-depth drum and are more commonly used as an accent/effects snare than as a primary metal workhorse.',
    },
    {
      heading: 'The general trade-off: diameter, depth, crack, and body',
      body:
        'As a rule of thumb, a larger diameter and deeper shell add low-end body, volume, and sustain, while a smaller diameter and shallower shell add a sharper, higher-pitched "crack" at the cost of some of that body. Most metal drummers land on a 14" diameter somewhere in the 5.5"–6.5" depth range as the balance point, reaching for a smaller or shallower drum specifically when they want that extra edge on top.',
    },
  ],
  table: SIZES_TABLE,
  tableSource: { label: 'Musical Expert — What Is a Piccolo Snare Drum?', url: 'https://www.musicalexpert.org/what-is-a-piccolo-snare-drum.htm' },
  sources: [
    { label: 'Musical Expert — What Is a Piccolo Snare Drum? (depth, diameter, and sound)', url: 'https://www.musicalexpert.org/what-is-a-piccolo-snare-drum.htm' },
  ],
  faq: [
    {
      question: '13 vs 14 snare — what\'s the difference?',
      answer:
        'A 13" snare has a smaller diameter than the more common 14", which raises its fundamental pitch and sharpens its attack when depth is otherwise equal. Joey Jordison\'s signature 13x6.5" Pearl snare is a well-known metal example — still deep enough for body, but higher-pitched and cutting than a same-depth 14".',
    },
    {
      question: 'What is the most common snare drum size?',
      answer:
        '14" diameter by 6.5" deep is the most common size across the verified metal roster, balancing low-end body with a sharp attack. A slightly shallower 5.5"–6" depth at the same 14" diameter is also widely used.',
    },
    {
      question: 'What is a piccolo snare used for?',
      answer:
        'A piccolo snare (typically 3"–4.5" deep) is used when a drummer wants a very high-pitched, sharp, cutting "pop" for accents or a specific effect, since its shallow shell trades away volume and sustain compared to a standard-depth drum.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Tuning-for-metal reference page (/snares/tuning-for-metal)
// ---------------------------------------------------------------------------

export const TUNING_PAGE = {
  slug: 'tuning-for-metal',
  title: 'How to Tune a Snare for Metal (High Tension, Wires & Heads) | MetalForge',
  description:
    'High-tension tuning, snare wire tension, and head choice for a tight, cutting metal snare sound — including the dry, clicky "typewriter" tone common in modern metal.',
  keywords: 'how to tune a snare for metal, high tension snare tuning, snare wires, snare heads for metal, typewriter snare sound',
  h1: 'How to Tune a Snare Drum for Metal',
  sections: [
    {
      heading: 'Start even, then go high-tension',
      body:
        'Standard tuning practice applies before anything metal-specific: finger-tighten every tension rod, then bring the batter head up evenly using a star or opposite-lug sequence so the pitch is consistent all the way around before you push the drum any higher. Most metal drummers then keep tuning past a "medium" pitch into high tension — the drum is tighter, the batter head is closer to its rated limit, and the resulting sound is short, dry, and immediate rather than open and ringing.',
    },
    {
      heading: 'Snare wires: tighter tension, less "buzz"',
      body:
        'Snare wire tension works alongside head tension to shape the sound. A firmer, more even wire tension across the strainer produces a crisper, more immediate "snap" with less loose buzz or rattle — important once the head is tuned high, since a slack wire tension against a high-tension head can sound washy or inconsistent. Wire count and gauge (typically 16, 20, or more strands) also affects sensitivity and crispness, with more/thinner wires generally reading as more sensitive and "snappy."',
    },
    {
      heading: 'Head choice: coated, single-ply, and dampened',
      body:
        'A thinner, single-ply batter head responds faster and tunes higher more comfortably than a thick, multi-ply head, which is part of why many metal drummers favor them for a cutting attack. Reso (snare-side) head tuning matters too — a common approach is tuning the snare-side head noticeably higher than the batter (a fourth or fifth higher is a commonly cited starting point) for fast wire response. Some dampening (a small gel pad, or a ring) is often added to control unwanted overtones at high tension without killing the attack.',
    },
    {
      heading: 'The "typewriter" metal snare sound',
      body:
        '"Typewriter" is a colloquial term some metal and djent drummers and engineers use for a very high-tension, dry, clicky snare tone — short decay, minimal ring, and a sharp transient that reads almost like a mechanical click rather than a ringing drum. It comes from stacking the ingredients above: high batter tension, a thin single-ply head, firm wire tension, and often some dampening, all aimed at a snare that sits precisely in a mix of down-tuned, high-gain guitars without smearing into the rest of the low end. It\'s one style among several valid metal snare sounds, not a universal requirement — plenty of professional metal drummers use a more open, resonant tuning instead.',
    },
  ],
  sources: [
    { label: 'Evans (D\'Addario) — How to Tune a Drumset / Concert Snare', url: 'https://www.daddario.com/resources/evans/how-to-tune-a-snare-drum/drumset-concert-snare/' },
  ],
  faq: [
    {
      question: 'How do you tune a snare drum for metal?',
      answer:
        'Start by finger-tightening and then evenly tensioning the batter head using a star or opposite-lug pattern, then continue tightening past a medium pitch into high tension for a short, dry, cutting sound. Firm up the snare wire tension to match, and consider a thinner single-ply batter head, which tunes higher more comfortably than a thick multi-ply head.',
    },
    {
      question: 'What is the "typewriter" snare sound?',
      answer:
        'It\'s a colloquial term for a very high-tension, dry, clicky snare tone with minimal ring — produced by combining high batter tension, a thin single-ply head, firm snare wire tension, and often some dampening. It\'s popular in modern metal and djent for cutting through down-tuned, high-gain guitars, but it\'s one stylistic choice, not the only valid metal snare sound.',
    },
    {
      question: 'Should snare wires be tight or loose for metal?',
      answer:
        'Generally tighter and more even across the strainer. A firmer wire tension gives a crisper, more immediate snap with less loose buzz, which matters more once the batter head itself is tuned to high tension, since a slack wire can sound washy against a tight head.',
    },
  ],
};

export const REFERENCE_PAGES = {
  shells: SHELLS_PAGE,
  sizes: SIZES_PAGE,
  'tuning-for-metal': TUNING_PAGE,
};

export const REFERENCE_PAGE_ORDER = ['shells', 'sizes', 'tuning-for-metal'];

export function getReferencePage(slug) {
  return REFERENCE_PAGES[slug] || null;
}

export function isValidReferenceSlug(slug) {
  return Object.prototype.hasOwnProperty.call(REFERENCE_PAGES, slug);
}

export function generateCanonicalUrl(slug) {
  return slug ? `${BASE_URL}/snares/${slug}` : `${BASE_URL}/snares`;
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
  SHELLS_PAGE,
  SIZES_PAGE,
  TUNING_PAGE,
  REFERENCE_PAGES,
  REFERENCE_PAGE_ORDER,
  SHELLS_TABLE,
  SIZES_TABLE,
  getReferencePage,
  isValidReferenceSlug,
  generateCanonicalUrl,
  generateFaqSchema,
  generateArticleSchema,
};
