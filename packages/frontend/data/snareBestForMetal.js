// Best Snares for Metal — Issue #4312 (epic #4308 phase 4/4)
// Buying-guide content for /snares/best-for-metal. High commercial-intent
// page: explains *why* metal drumming favours high-tension metal (steel/brass)
// shells, covers the wood-shell exceptions, then recommends the confirmed
// signature snares from data/snares.js.
//
// Recommendations are never hardcoded here — the component pulls the live
// SIGNATURE_SNARES list so the guide can't drift out of sync with (or
// fabricate beyond) the verified drummer->snare mapping. Same "cite source,
// don't guess" discipline as data/snareReferencePages.js (phase 2). Every
// factual claim below reuses the same sources already verified for that
// module (AllThingsGear, Sound Pure, Evans/D'Addario).

const BASE_URL = 'https://metalforge.io';

export const BEST_FOR_METAL_PAGE = {
  slug: 'best-for-metal',
  title: 'Best Snare Drums for Metal: Shell Material & Tuning Guide | MetalForge',
  description:
    'Why metal drumming favours high-tension steel and brass snares, the wood-shell exceptions (like Chris Adler\'s Walnut/Maple hybrid), and the confirmed signature snares legendary metal drummers actually play.',
  keywords: 'best snare drum for metal, best metal snare drums, steel vs brass snare for metal, high tension snare tuning, metal snare recommendations',
  h1: 'Best Snare Drums for Metal',
  intro:
    'There is no single "correct" metal snare — technique, genre, and even the room or mix a drummer is playing into all pull in different directions. But high-volume, high-endurance metal playing does reward a few consistent traits: a shell material that cuts through distorted, down-tuned guitars, and tuning tight enough to stay dry and articulate at speed. This guide covers why those traits matter and which confirmed signature snares from our verified database fit them.',
  whyMetalShells: {
    heading: 'Why metal favours steel and brass shells',
    body:
      'Metal shells — steel, brass, bronze, aluminium — generally cut harder and deliver a sharper, more powerful rimshot than wood, which is a big part of why they dominate the verified metal roster. Steel is the brightest and most aggressive of the group, prized for raw cut; brass sits between metal and wood, crisp but with real warmth (the Ludwig Black Beauty is the best-known example). See the /snares/shells guide for the full cast-vs-rolled construction breakdown and how each metal shell compares.',
  },
  whyHighTension: {
    heading: 'Why high-tension tuning matters as much as the shell',
    body:
      'Shell material sets the ceiling; tuning decides what actually comes out of the drum on a given night. Most modern metal drummers tune past a "medium" pitch into high tension, pair it with firm snare-wire tension, and often use a thin single-ply batter head — the combination that produces the dry, clicky, cutting "typewriter" sound common in modern metal and djent. See the /snares/tuning-for-metal guide for the full breakdown, including reso-head tuning and dampening.',
  },
  woodExceptions: {
    heading: 'The wood-shell exceptions',
    body:
      'Wood shells are not disqualified from metal — several verified roster drummers play maple, and at least one pairs maple with walnut specifically to add low-end weight without losing definition. Chris Adler\'s Mapex signature snare (14x5.5") uses a Walnut/Maple hybrid shell for exactly this reason: walnut is dense and dark-leaning, so blending it with maple\'s balanced tone keeps the drum from sounding thin under Lamb of God\'s guitars. Dave Lombardo and Mario Duplantier both play a Tama S.L.P. 14x6.5" G-Maple, and Hellhammer and Frost both play a Sonor SQ2 14" maple shell — proof that a well-chosen (and well-tuned) wood shell still holds up in a metal mix. See the /snares/shells guide for the full metal-vs-wood tone comparison.',
  },
  faq: [
    {
      question: 'What is the best snare drum shell for metal?',
      answer:
        'There is no single best shell, but steel and brass are the most common choices on the verified metal roster because they cut harder and deliver a sharper rimshot than wood. Maple and walnut/maple hybrid shells (like Chris Adler\'s signature Mapex) are a proven exception when paired with the right tuning.',
    },
    {
      question: 'Should a metal snare be tuned high or low?',
      answer:
        'Most metal drummers tune toward high tension for a short, dry, cutting sound, paired with firm snare-wire tension. See the /snares/tuning-for-metal guide for the full process, including the "typewriter" sound popular in modern metal and djent.',
    },
    {
      question: 'Can a wood snare work for metal?',
      answer:
        'Yes — several verified metal-roster drummers play maple or maple/walnut hybrid shells, including Dave Lombardo, Mario Duplantier, Hellhammer, Frost, and Chris Adler (whose signature Mapex snare blends walnut and maple specifically for added low-end weight). Wood shells trade some metallic cut for tonal warmth, but remain a legitimate choice.',
    },
    {
      question: 'What snare drums do professional metal drummers actually use?',
      answer:
        'See the confirmed signature snares below — they pull directly from our verified drummer-to-snare database, not guesses. Every entry links to the drummer\'s profile for the full gear breakdown and source.',
    },
  ],
  sources: [
    { label: 'AllThingsGear — Snare drum shell materials', url: 'https://allthingsgear.com/snare-drum-shell-materials/' },
    { label: 'Sound Pure — Common Metal Snare Drum Shells', url: 'https://www.soundpure.com/a/expert-advice/drums/common-metal-snare-drum-shells/' },
    { label: 'Evans (D\'Addario) — How to Tune a Drumset / Concert Snare', url: 'https://www.daddario.com/resources/evans/how-to-tune-a-snare-drum/drumset-concert-snare/' },
  ],
};

export function generateBestForMetalCanonicalUrl() {
  return `${BASE_URL}/snares/best-for-metal`;
}

export function generateBestForMetalFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: BEST_FOR_METAL_PAGE.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function generateBestForMetalArticleSchema() {
  const url = generateBestForMetalCanonicalUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: BEST_FOR_METAL_PAGE.h1,
    description: BEST_FOR_METAL_PAGE.description,
    url,
    author: { '@type': 'Organization', name: 'MetalForge Editorial' },
    publisher: { '@type': 'Organization', name: 'MetalForge', url: BASE_URL },
  };
}

// ItemList of the confirmed recommended (signature) snares, for rich-result
// eligibility. `snares` is the live SIGNATURE_SNARES array, passed in by the
// caller so this module never needs to import data/snares.js directly (keeps
// the dependency direction the same as the rest of the /snares data modules).
// Links to /drummer/<slug> rather than a /snares/signature/<slug> page since
// that route does not exist yet (epic phase 3 has not merged).
export function generateBestForMetalItemListSchema(snares) {
  if (!snares || snares.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Confirmed signature snare drums played by metal drummers',
    itemListElement: snares.map((snare, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${snare.brand ? `${snare.brand} ` : ''}${snare.model || snare.summary}`,
        brand: snare.brand ? { '@type': 'Brand', name: snare.brand } : undefined,
        category: 'Snare Drums',
        material: snare.shellMaterial || undefined,
        url: `${BASE_URL}/drummer/${snare.drummerSlug}`,
      },
    })),
  };
}

export function generateBestForMetalBreadcrumbSchema() {
  const url = generateBestForMetalCanonicalUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Snares', item: `${BASE_URL}/snares` },
      { '@type': 'ListItem', position: 2, name: 'Best for Metal', item: url },
    ],
  };
}

export default {
  BEST_FOR_METAL_PAGE,
  generateBestForMetalCanonicalUrl,
  generateBestForMetalFaqSchema,
  generateBestForMetalArticleSchema,
  generateBestForMetalItemListSchema,
  generateBestForMetalBreadcrumbSchema,
};
