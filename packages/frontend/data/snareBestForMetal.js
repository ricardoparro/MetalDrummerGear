// Best Snares for Metal — Issue #4312 (epic #4308 phase 4/4)
// Buying-guide content for /snares/best-for-metal. High commercial-intent
// page: explains *why* metal favours high-tension metal shells, covers the
// wood-shell exceptions (e.g. Chris Adler's Walnut/Maple hybrid), then
// recommends the verified signature snares. `retailerUrls` stays empty until
// affiliate links are added — every recommendation card is CTA-ready and
// falls back to a link to the drummer's full profile until then.
//
// Recommendations are grounded in data/snares.js (SIGNATURE_SNARES, never
// hardcoded here) so the guide can't drift out of sync with the verified
// drummer->snare mapping. Same "cite source, don't guess" discipline as
// data/snareReferencePages.js (phase 2).

const BASE_URL = 'https://metalforge.io';

export const BEST_FOR_METAL_PAGE = {
  slug: 'best-for-metal',
  title: 'Best Snares for Metal: Shells, Sizes & Signature Picks | MetalForge',
  description:
    'Why metal favours high-tension metal shells — with the wood-shell exceptions — plus recommended sizes and the verified signature snares legendary metal drummers actually play.',
  keywords: 'best snare for metal, best metal snare drum, steel vs maple snare for metal, metal snare recommendations, signature metal snares, brass snare for metal',
  h1: 'Best Snares for Metal',
  intro:
    'There is no single "correct" metal snare — sub-genre, budget, and the tone a drummer is chasing all push in different directions. But high-volume, high-endurance metal playing does reward a few consistent traits: a shell that cuts through distorted, down-tuned guitars, a size that keeps enough body without losing crack, and tuning built for a dry, immediate attack. This guide covers why those traits matter and which verified signature snares fit them.',
  whyMetalShells: {
    heading: 'Why metal favours high-tension metal shells',
    body:
      'See the /snares/shells guide for the full steel-vs-maple breakdown. Metal shells — steel, brass, bronze, aluminium — generally deliver more cut, a sharper rimshot "crack," and more raw projection than wood, which is why they show up so often across the verified metal roster (22 of the 56 mapped snares run a metal shell). That cut matters more in metal than almost any other genre: a snare has to slice through distorted, mid-heavy guitars and a wall of low end night after night, and a bright, high-tension metal shell holds its definition under that kind of pressure better than a warmer, more absorbent wood shell.',
  },
  woodExceptions: {
    heading: 'The wood-shell exceptions',
    body:
      'Metal shells are not universal, though — maple, birch, and walnut shells appear just as often across the verified roster (also 22 of 56), and several signature models are built around wood specifically for its warmth and tonal body rather than raw cut. Chris Adler\'s Mapex Black Panther signature snare is the clearest example: a Walnut/Maple hybrid shell, not a metal one, chosen for extra low-end weight and body alongside the walnut\'s density. Dave Lombardo\'s Tama S.L.P. G-Maple and Adrian Erlandsson\'s Tama Starclassic Bubinga follow the same logic. The takeaway: a metal shell is the default choice when raw cut is the priority, but plenty of professional metal drummers get their sound from a wood shell instead — see the /snares/shells guide for the tone trade-offs of each material.',
  },
  sizeAndTuning: {
    heading: 'Size and tuning matter as much as shell material',
    body:
      'A 14x6.5" shell is the workhorse size across the verified roster — see the /snares/sizes guide for the full diameter/depth trade-off, including shallower workhorse depths and Joey Jordison\'s 13x6.5" signature model. Shell and size set the ceiling, but tuning decides what actually comes out of the drum: most modern metal drummers push toward high-tension tuning with a thin, fast-responding batter head and firm snare-wire tension for a dry, cutting attack. See the /snares/tuning-for-metal guide for the full breakdown, including the high-tension "typewriter" sound common in modern metal and djent.',
  },
  faq: [
    {
      question: 'What is the best snare drum for metal?',
      answer:
        'There is no single best snare — steel and brass shells deliver more cut and a sharper rimshot, while wood shells (maple, walnut, birch) deliver more warmth and body. Both show up extensively across our verified metal drummer roster. See the signature snares below for specific verified picks, and the /snares/shells guide for the full material trade-off.',
    },
    {
      question: 'Is a metal or wood snare better for metal music?',
      answer:
        'Neither is strictly better. Metal shells (steel, brass, bronze) generally cut harder and deliver a sharper rimshot; wood shells (maple, walnut, birch) generally sound warmer with more tonal body. Chris Adler\'s Walnut/Maple signature snare is a clear example of a top metal drummer choosing wood over metal. See the /snares/shells guide for the full comparison.',
    },
    {
      question: 'What size snare is best for metal?',
      answer:
        '14x6.5" is the most common "workhorse" size across the verified metal roster, balancing crack with body. See the /snares/sizes guide for the full trade-off, including smaller-diameter and piccolo options.',
    },
    {
      question: 'What snares do professional metal drummers actually use?',
      answer:
        'See the confirmed signature snares below and the full roster on the /snares hub — every entry pulls directly from our verified drummer-to-snare database, not guesses, and links to the drummer\'s full profile.',
    },
  ],
  sources: [
    { label: 'AllThingsGear — Snare drum shell materials', url: 'https://allthingsgear.com/snare-drum-shell-materials/' },
    { label: 'Sound Pure — Common Metal Snare Drum Shells', url: 'https://www.soundpure.com/a/expert-advice/drums/common-metal-snare-drum-shells/' },
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

// ItemList of the verified signature snares, for rich-result eligibility.
// `signatureSnares` is the live SIGNATURE_SNARES array, passed in by the
// caller so this module never needs to import data/snares.js directly (keeps
// the dependency direction the same as the rest of the /snares data modules).
export function generateBestForMetalItemListSchema(signatureSnares) {
  if (!signatureSnares || signatureSnares.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Verified signature snares played by metal drummers',
    itemListElement: signatureSnares.map((snare, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${snare.brand} ${snare.model}`,
        brand: { '@type': 'Brand', name: snare.brand },
        category: 'Snare Drums',
        url: `${BASE_URL}/snares/signature/${snare.drummerSlug}`,
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
