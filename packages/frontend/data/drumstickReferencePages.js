/**
 * Drumsticks Hub content module — Issue #4137 (epic #4135 phase 2/4).
 * Pillar page (/drumsticks) + reference pages (/drumsticks/sizes|materials|tips).
 *
 * Reference specs are presented as "typical, varies by brand" and anchored to
 * one brand's published specs (Vic Firth American Classic) rather than as a
 * single universal standard — sizing, weight, and taper differ by manufacturer.
 * All cited facts were verified against the brand pages linked in `source`/
 * `sources` fields before being written here (no fabricated numbers).
 */

const BASE_URL = 'https://metalforge.io';

// ---------------------------------------------------------------------------
// Pillar page (/drumsticks)
// ---------------------------------------------------------------------------

export const PILLAR_PAGE = {
  slug: 'drumsticks',
  title: 'Drumsticks Guide: Sizes, Materials & Tips for Metal Drummers | MetalForge',
  description:
    "What drumsticks are, how the size/material/tip system works, and how to pick a pair for metal — plus which legendary drummers' signature sticks to check out.",
  keywords: 'drumsticks, drumstick sizes, drumstick materials, drumstick tips, best drumsticks for metal, 5a vs 5b',
  h1: 'Drumsticks: The Complete Guide',
  intro:
    'A drumstick is a turned wooden (or synthetic) shaft, tapered down to a tip, that a drummer holds to strike drums and cymbals. Beyond that simple description, the size, wood, taper, and tip shape of a stick change how it feels in the hand, how loud it hits, how long it lasts, and how it makes a cymbal sing — details that matter even more in metal, where sticks take a beating night after night.',
  howToChoose: [
    {
      heading: 'Match the size to your power and grip',
      body:
        'Drumstick sizes use a number-and-letter code (like 5A or 2B) where the number tracks shaft thickness and the letter tracks the intended playing style. See the sizes guide below for the full breakdown and a typical spec table.',
    },
    {
      heading: 'Match the material to durability vs. feel',
      body:
        'Hickory is the standard all-rounder; oak is denser and more durable but heavier; maple is lighter and faster but wears out sooner; synthetic/aluminium sticks trade some feel for near-indestructibility. See the materials guide for the trade-offs.',
    },
    {
      heading: 'Match the tip to your cymbal sound',
      body:
        'Wood tips sound warmer and darker; nylon tips sound brighter and hold their shape (and their sound) far longer, which is why nylon is common in genres built around fast, articulate cymbal work. See the tips guide for shape-by-shape detail.',
    },
    {
      heading: 'Think about volume and durability, not just genre',
      body:
        'Metal drumming spans blast beats to grooove-heavy riffing, so there is no single "metal stick" — but heavier, more durable combinations (thicker shafts, hickory or oak, nylon tips) are common where drummers are hitting hard for long sets.',
    },
  ],
  brands: [
    { name: 'Vic Firth', note: 'Widest mainstream range; American Classic series is the industry reference point for sizing.' },
    { name: 'Pro-Mark', note: 'Long-running hickory/oak lines (TX/Rebound series), popular with hard-hitting drummers.' },
    { name: 'Vater', note: 'Known for extra-long and extra-thick "power" models aimed at heavier playing.' },
    { name: 'Ahead', note: 'Aluminium-core sticks with replaceable nylon sleeves — built for durability over raw wood feel.' },
  ],
  bestForMetal:
    'There is no single "correct" metal stick, but drummers playing high-volume, high-endurance sets often gravitate toward 2B/5B-range thickness, hickory or oak for durability, and nylon tips for consistent, cutting cymbal articulation that survives fast, repetitive playing.',
  faq: [
    {
      question: 'What are drumsticks made of?',
      answer:
        'Most drumsticks are hickory, a dense hardwood that balances durability and shock absorption. Maple and oak are the other common woods (maple lighter and faster, oak denser and more durable), and synthetic options like aluminium-core sticks with replaceable nylon sleeves or carbon-fibre shafts trade some traditional feel for extreme durability.',
    },
    {
      question: 'What do drumstick sizes mean?',
      answer:
        'Drumstick sizes use a number and a letter, like 5A or 2B. The number tracks shaft thickness — a lower number is a thicker stick. The letter tracks the style the size was originally aimed at: A for lighter orchestral/concert playing, B for heavier band playing, S for the heaviest marching/street sticks, and N as a suffix meaning a nylon (not wood) tip.',
    },
    {
      question: '5A vs 5B — which should I use?',
      answer:
        'A 5A and a 5B share the same "5" weight class but differ in the letter: the 5B is noticeably thicker in diameter than the 5A (roughly 0.6" vs 0.565" on Vic Firth\'s American Classic line), giving it more mass for louder, heavier playing, while the 5A stays lighter and faster for detailed work.',
    },
    {
      question: 'Wood vs nylon tips — which is better for metal?',
      answer:
        'Nylon tips are harder-wearing and give a brighter, more consistent cymbal attack as they wear, which is why many metal drummers who lean on fast cymbal work prefer them. Wood tips sound warmer but slowly change tone as they wear down.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Sizes reference page (/drumsticks/sizes)
// ---------------------------------------------------------------------------

// Verified against each model's individual spec sheet on vicfirth.com
// (American Classic line) — accessed 2026-07-09. Sorted thinnest → thickest.
export const SIZES_SPEC_TABLE = [
  { size: '7A', diameterIn: 0.54, diameterMm: 13.7, lengthIn: 15.5, lengthCm: 39.37, typicalUse: 'Lightest of the five — lower-volume, jazz/combo-style playing' },
  { size: '5A', diameterIn: 0.565, diameterMm: 14.4, lengthIn: 16, lengthCm: 40.64, typicalUse: 'The most common all-around size — moderate weight and speed' },
  { size: '3A', diameterIn: 0.58, diameterMm: 14.7, lengthIn: 16.1875, lengthCm: 41.12, typicalUse: 'Between 5A and 5B — light rock and fusion' },
  { size: '5B', diameterIn: 0.595, diameterMm: 15.1, lengthIn: 16, lengthCm: 40.64, typicalUse: 'Thicker than 5A — rock and louder venues' },
  { size: '2B', diameterIn: 0.63, diameterMm: 16.0, lengthIn: 16.25, lengthCm: 41.28, typicalUse: 'Thickest of the five — rock, metal, and other high-volume playing' },
];

export const SIZES_SPEC_SOURCE = {
  brand: 'Vic Firth',
  line: 'American Classic',
  url: 'https://vicfirth.com/collections/vic-firth-category-sticks-drum-set-american-classic',
};

export const SIZES_PAGE = {
  slug: 'sizes',
  title: 'What Do Drumstick Sizes Mean? Number & Letter System Explained | MetalForge',
  description:
    'How drumstick sizing works — what the number and letter mean, 5A vs 5B compared, and a typical spec table (7A/5A/3A/5B/2B) anchored to Vic Firth\'s published specs.',
  keywords: 'drumstick sizes, what do drumstick sizes mean, 5a vs 5b, drumstick size chart, 7a 5a 5b 2b 3a',
  h1: 'What Do Drumstick Sizes Mean?',
  sections: [
    {
      heading: 'What do drumstick sizes mean',
      body:
        "Drumstick sizes are written as a number followed by a letter — 5A, 5B, 7A, 2B, 3A, and so on. The number is a rough measure of the shaft's thickness: a lower number means a thicker (heavier) stick, and a higher number means a thinner (lighter) one. The letter is a holdover from an older classification of intended use: A originally stood for orchestra (lighter concert/orchestral playing), B for band (heavier brass/military band playing), and S for street — the heaviest sticks, built for marching and drumline. An N suffix (like 5AN) doesn't change the size at all — it just means the stick has a nylon tip instead of a wood one.",
    },
    {
      heading: '5A vs 5B',
      body:
        "5A and 5B are both \"5\"-weight sticks, but the letter changes the diameter: on Vic Firth's American Classic line, the 5B measures about 0.595\" across versus the 5A's 0.565\" — a noticeably thicker, heavier stick at the same length. Drummers who want more mass behind their hits (louder rock and metal playing) often prefer 5B or thicker; drummers who want more speed and control for detailed passages often prefer 5A or thinner.",
    },
    {
      heading: 'Reading a typical spec table',
      body:
        "Exact specs vary by brand — a 5A from one manufacturer is not guaranteed to be identical to a 5A from another, since the number/letter system was never a strict industry standard. The table below uses Vic Firth's American Classic line as a single, consistently-published worked example so the relative sizing makes sense; always check a stick's individual product page for its exact diameter and length before buying.",
    },
  ],
  table: SIZES_SPEC_TABLE,
  tableSource: SIZES_SPEC_SOURCE,
  faq: [
    {
      question: 'What do drumstick sizes mean?',
      answer:
        'The number in a drumstick size (like the 5 in 5A) tracks shaft thickness — lower numbers are thicker sticks. The letter tracks the style the size was originally built for: A for lighter orchestral/concert playing, B for heavier band playing, and S for the heaviest marching/street sticks. An N suffix means a nylon tip rather than wood.',
    },
    {
      question: '5A vs 5B — what is the difference?',
      answer:
        "Both are \"5\"-weight sticks, but the 5B is thicker in diameter than the 5A (about 0.595\" vs 0.565\" on Vic Firth's American Classic line) at the same roughly 16\" length, giving the 5B more mass for heavier, louder playing.",
    },
    {
      question: 'Are drumstick sizes standardized across brands?',
      answer:
        "No. The number/letter system is a widely used convention, not a strict standard, so exact diameter and length for a given size (like 5A) can vary from brand to brand. Always check the individual product's published spec sheet if precise dimensions matter.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Materials reference page (/drumsticks/materials)
// ---------------------------------------------------------------------------

export const MATERIALS_PAGE = {
  slug: 'materials',
  title: "What Are Drumsticks Made Of? Hickory vs Maple vs Oak | MetalForge",
  description:
    'Drumstick materials compared — hickory, maple, oak, and synthetic/specialty options like aluminium-core and carbon-fibre sticks — with a weight/durability/feel trade-off table.',
  keywords: 'what are drumsticks made of, drumstick materials, hickory vs maple vs oak, aluminum drumsticks, carbon fiber drumsticks',
  h1: 'What Are Drumsticks Made Of?',
  sections: [
    {
      heading: 'Hickory — the standard',
      body:
        'Hickory is the wood most drumsticks are made from. It is dense enough to withstand hard, repeated impact while still flexing slightly to absorb shock, which is why it became the industry default rather than a niche choice.',
    },
    {
      heading: 'Maple — lighter and faster',
      body:
        'Maple is a softer, lighter wood than hickory. Sticks made from it feel faster in the hand and give a warmer, airier tone, but they wear down and break sooner under hard hitting — a trade-off jazz and lower-volume players are more willing to make than metal drummers.',
    },
    {
      heading: 'Oak — the heaviest and most durable',
      body:
        "Oak is denser than both hickory and maple, making it the most durable of the three common woods and giving it a more powerful, aggressive attack. The trade-off is weight and stiffness: oak absorbs shock less effectively than hickory or maple, so hands can tire faster over a long set.",
    },
    {
      heading: 'Synthetic and specialty materials',
      body:
        "Ahead's sticks use an aluminium-tube core wrapped in a replaceable outer sleeve (with a nylon-tip option) — when the sleeve wears out, you replace the sleeve instead of the whole stick, and the aluminium core essentially can't break the way wood can. Carbon-fibre sticks (from brands like Kuppmen and Techra) aim for a similar durability gain while keeping a shape and weight closer to a traditional wood stick.",
    },
  ],
  tradeoffTable: [
    { material: 'Hickory', weight: 'Medium', durability: 'Good', feel: 'Balanced — the all-around default' },
    { material: 'Maple', weight: 'Light', durability: 'Lower', feel: 'Fast, warm, airier tone' },
    { material: 'Oak', weight: 'Heavy', durability: 'Best (of the woods)', feel: 'Powerful, less shock absorption' },
    { material: 'Aluminium + nylon sleeve (Ahead)', weight: 'Medium', durability: 'Very high — sleeve is replaceable', feel: 'Consistent, less "wood" feel' },
    { material: 'Carbon-fibre', weight: 'Medium', durability: 'Very high', feel: 'Close to wood feel, much longer-lasting' },
  ],
  sources: [
    { label: "D'Addario — hickory vs oak vs maple drumsticks", url: 'https://support.daddario.com/hc/en-us/articles/11916115982996-What-is-the-difference-between-hickory-oak-and-maple-drumsticks' },
    { label: 'Vic Firth — American Classic (hickory) product line', url: 'https://vicfirth.com/collections/vic-firth-category-sticks-drum-set-american-classic' },
  ],
  faq: [
    {
      question: 'What are drumsticks made of?',
      answer:
        'The large majority of drumsticks are made from hickory, a dense hardwood that balances durability with shock absorption. Maple (lighter, less durable) and oak (denser, most durable) are the other common woods. Synthetic options include aluminium-core sticks with replaceable nylon sleeves and carbon-fibre shafts.',
    },
    {
      question: 'Hickory vs maple vs oak — which is best for metal?',
      answer:
        "Hickory is the standard choice for most metal drumming — durable enough for hard hitting while still absorbing some shock. Oak is denser and even more durable but heavier and harder on the hands over a long set. Maple is lighter and faster but wears out fastest, so it's less common for heavy, high-volume playing.",
    },
    {
      question: 'Are aluminium or carbon-fibre drumsticks worth it?',
      answer:
        "Aluminium-core sticks (like Ahead's, with a replaceable nylon sleeve) and carbon-fibre sticks last far longer than wood under hard hitting, which can save money over time for drummers who break sticks often. The trade-off is a feel that many drummers describe as less organic than traditional wood.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Tips reference page (/drumsticks/tips)
// ---------------------------------------------------------------------------

export const TIP_SHAPES = [
  { shape: 'Round / ball', effect: 'Clean, bright, and articulate — a small, focused contact point.' },
  { shape: 'Barrel', effect: 'A wider, flatter contact area giving a darker, punchier, booming sound.' },
  { shape: 'Acorn / teardrop', effect: 'A large, rounded contact area producing a fuller, fatter, warmer tone.' },
  { shape: 'Oval', effect: 'A well-rounded, even frequency response across mids, highs, and lows.' },
];

export const TIPS_PAGE = {
  slug: 'tips',
  title: 'Wood vs Nylon Drumstick Tips (And Tip Shapes Explained) | MetalForge',
  description:
    'Wood vs nylon drumstick tips compared for cymbal sound and durability, plus how round, barrel, acorn/teardrop, and oval tip shapes each change your articulation.',
  keywords: 'wood vs nylon tips, drumstick tip shapes, nylon tip drumsticks, drumstick articulation, best drumstick tips for cymbals',
  h1: 'Wood vs Nylon Tips (And Tip Shapes Explained)',
  sections: [
    {
      heading: 'Wood vs nylon tips',
      body:
        'Wood tips are simply the same wood as the rest of the stick, shaped into a tip — they give a warmer, softer, more organic sound on cymbals, but the wood itself wears down and changes shape (and tone) over time. Nylon tips are a separate hard plastic cap molded onto the shaft; they give a brighter, harder, more consistent cymbal attack and hold that same sound far longer as they wear, since nylon degrades much more slowly and evenly than wood grain.',
    },
    {
      heading: 'Which should metal drummers use?',
      body:
        'Neither is objectively "correct" — it is a tone and durability choice. Nylon tips are common in genres (including a lot of metal) built around fast, articulate cymbal work, because the brighter attack cuts through a dense mix and the tip itself lasts longer under hard, repetitive playing. Wood tips remain popular where a warmer, darker cymbal tone is wanted.',
    },
    {
      heading: 'Tip and bead shapes',
      body:
        'Beyond wood-vs-nylon, the shape of the tip (sometimes called the "bead") changes articulation on its own, independent of material. The main shapes are round, barrel, acorn/teardrop, and oval — each shifts the balance of attack, warmth, and frequency spread differently.',
    },
  ],
  tipShapes: TIP_SHAPES,
  sources: [
    { label: 'Meinl Stick & Brush — tip comparison', url: 'https://meinlstickandbrush.com/en/topics/tip-comparison' },
    { label: 'Vic Firth — American Classic tip options', url: 'https://vicfirth.com/collections/vic-firth-category-sticks-drum-set-american-classic' },
  ],
  faq: [
    {
      question: 'Wood vs nylon tips — what is the difference?',
      answer:
        'Wood tips are shaped from the same wood as the stick and give a warmer, softer cymbal sound that slowly changes as the wood wears. Nylon tips are a separate hard-plastic cap that gives a brighter, more consistent cymbal attack and holds its shape and sound much longer under hard playing.',
    },
    {
      question: 'What tip shape is best for cymbals?',
      answer:
        'Round tips give the cleanest, most articulate cymbal attack. Barrel tips give a darker, punchier sound from a wider contact area. Acorn/teardrop tips give a fuller, warmer tone. Oval tips give the most even spread across the frequency range. The "best" shape depends on the tone you want, not a fixed rule.',
    },
    {
      question: 'Do nylon tips last longer than wood tips?',
      answer:
        'Yes. Nylon is a harder, more wear-resistant material than wood, so nylon tips generally keep their shape — and therefore their sound — for longer under repeated hard hitting than a wood tip does.',
    },
  ],
};

export const REFERENCE_PAGES = {
  sizes: SIZES_PAGE,
  materials: MATERIALS_PAGE,
  tips: TIPS_PAGE,
};

export const REFERENCE_PAGE_ORDER = ['sizes', 'materials', 'tips'];

export function getReferencePage(slug) {
  return REFERENCE_PAGES[slug] || null;
}

export function isValidReferenceSlug(slug) {
  return Object.prototype.hasOwnProperty.call(REFERENCE_PAGES, slug);
}

export function generateCanonicalUrl(slug) {
  return slug ? `${BASE_URL}/drumsticks/${slug}` : `${BASE_URL}/drumsticks`;
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
  SIZES_PAGE,
  MATERIALS_PAGE,
  TIPS_PAGE,
  REFERENCE_PAGES,
  REFERENCE_PAGE_ORDER,
  SIZES_SPEC_TABLE,
  SIZES_SPEC_SOURCE,
  TIP_SHAPES,
  getReferencePage,
  isValidReferenceSlug,
  generateCanonicalUrl,
  generateFaqSchema,
  generateArticleSchema,
};
