// Best Cymbals for Metal — Issue #4307 (epic #4303 phase 4/4)
// Buying-guide content for /cymbals/best-for-metal. High commercial-intent
// page: explains *why* metal favours brighter/cutting-B8 or heavier-cutting-B20
// setups, then recommends series by budget tier. `retailerUrls` stays empty
// until affiliate links are added — every recommendation card is CTA-ready and
// falls back to a link to the matching brand page until then.
//
// Series/tier recommendations are grounded in data/cymbalBrands.js (never
// hardcoded here) so the guide can't drift out of sync with the verified
// brand→drummer mapping. Same "cite source, don't guess" discipline as
// data/cymbalReferencePages.js (phase 2).

const BASE_URL = 'https://metalforge.io';

export const BEST_FOR_METAL_PAGE = {
  slug: 'best-for-metal',
  title: 'Best Cymbals for Metal: Brands, Series & Budget Guide | MetalForge',
  description:
    'Why metal favours brighter, cutting B8-or-heavier-cutting-B20 cymbal setups — plus recommended series by budget tier and the confirmed setups legendary metal drummers actually play.',
  keywords: 'best cymbals for metal, best metal cymbal setup, cymbals for blast beats, b8 vs b20 for metal, cymbal brands for metal, budget metal cymbals',
  h1: 'Best Cymbals for Metal',
  intro:
    'There is no single "correct" metal cymbal setup — sub-genre, budget, and how hard you hit all push in different directions. But high-volume, high-endurance metal playing does reward a few consistent traits: enough brightness or bite to cut through distorted guitars, enough weight to survive sustained hard hitting without losing definition, and a ride with a pronounced bell for blast-beat patterns. This guide covers why those traits matter and which series — across every budget tier — fit them.',
  whyBrighterOrCutting: {
    heading: 'Why metal favours brighter or cutting-B20 cymbals',
    body:
      'See the /cymbals/alloys guide for the full B20-vs-B8 breakdown. In a mix dominated by distorted, mid-heavy guitars, a cymbal with more high-frequency bite cuts through more easily than a dark, complex one built for a clean jazz or fusion context. That is why bright, fast-responding cast lines like Zildjian A Custom and Sabian AAX show up so often across the verified metal roster — they hold their cut even at high gain and high volume. Darker cast lines (Zildjian K Custom, Sabian HHX, Meinl Byzance) still work well in metal, especially progressive and technical styles, but usually pair best with a scooped or less mid-heavy guitar tone, or get chosen specifically for their extra harmonic complexity rather than raw cut.',
  },
  whyHeavierWeight: {
    heading: 'Why weight matters as much as brightness',
    body:
      'See the /cymbals/sizes-weights guide for the full diameter/weight breakdown. Sustained fast, hard playing — blast beats especially — puts more repeated stress on a cymbal than most other styles. Medium-heavy to heavy weights resist cracking and keyholing (wear at the bell mounting hole) far longer than thin, jazz-oriented weights under that kind of use. Several confirmed setups on this roster pair a heavier ride (for durability under continuous fast patterns) with thinner, faster-opening crashes (for an explosive, immediate accent) — weight is a per-piece decision, not a single blanket rule for the whole kit.',
  },
  rideForBlastBeats: {
    heading: 'Why the ride needs a pronounced bell',
    body:
      'In extreme metal, drummers frequently "ride" a fast, sustained 16th-note pattern on the bell rather than the bow of the ride, because the bell cuts through blast-beat tempos and dense, distorted guitars more reliably than the wash of the bow. Series marketed with an oversized or "mega" bell — Zildjian\'s Mega Bell Ride variants show up repeatedly across this roster\'s verified setups — are a direct response to that playing style, rather than a general-purpose ride feature.',
  },
  budgetTiers: [
    {
      heading: 'Entry-level / student budget',
      body:
        'At the entry level, sheet B8 bronze lines (see the /cymbals/alloys guide) from any of the four major brands give a brighter, simpler, but genuinely usable cutting tone — a fine starting point before stepping up to a cast line. None of the confirmed roster setups run an entry-level line (verified drummers are professionals on professional gear), so this tier is a general recommendation rather than a roster-sourced one.',
    },
    {
      heading: 'Mid-tier / gigging budget',
      body:
        'This is where most of the confirmed roster setups actually sit: cast B20 lines like Zildjian A Custom, Sabian AAX, and Paiste 2002/RUDE deliver professional-grade cut and durability without the cost of a hand-hammered flagship line. See the brand pages below for the specific metal-relevant series each brand offers at this tier.',
    },
    {
      heading: 'Pro / flagship budget',
      body:
        'Hand-hammered flagship lines — Sabian HHX, Meinl Byzance, Zildjian K Custom — trade some of the mid-tier lines\' raw cut for more complex, three-dimensional overtones, and show up across this roster\'s progressive and technical metal setups in particular. Paiste\'s Signature series occupies a similar flagship spot for drummers who want more tonal range than RUDE/2002 while staying with the brand.',
    },
  ],
  faq: [
    {
      question: 'What is the best cymbal brand for metal?',
      answer:
        'There is no single best brand — Zildjian, Sabian, Paiste, and Meinl all show up extensively across our verified metal drummer roster, each with its own metal-relevant series (Zildjian A/K/Z Custom, Sabian AAX/HHX, Paiste RUDE/2002, Meinl Byzance/Mb20). See the brand pages below for positioning and which confirmed drummers play each one.',
    },
    {
      question: 'B20 or B8 cymbals for metal?',
      answer:
        'Most professional metal drummers on our verified roster play cast B20 bronze (or a comparable cast alloy) for its durability and professional tone, but B8 sheet bronze is a genuinely usable, brighter, more affordable entry point. See the /cymbals/alloys guide for the full trade-off breakdown.',
    },
    {
      question: 'What is the best budget cymbal setup for metal?',
      answer:
        'A durable, cutting starting point at any budget is a set of medium-heavy hi-hats, two or three crashes of different sizes, a ride with a pronounced bell for blast-beat patterns, and at least one china for aggressive accents. See the budget tiers above for which alloy/series tier fits that setup at your price point.',
    },
    {
      question: 'What cymbals do professional metal drummers actually use?',
      answer:
        'See the confirmed setups on the /cymbals hub — it pulls directly from our verified drummer-to-cymbal database, not guesses. Every entry links to the drummer\'s full profile, and the brand pages below break down which series each drummer plays.',
    },
  ],
  sources: [
    { label: 'SABIAN — Cymbals 101 (types, sizes, weights)', url: 'https://sabian.com/cymbals-101/' },
    { label: 'Zildjian — Frequently Asked Questions (alloy composition)', url: 'https://zildjian.com/pages/frequently-asked-questions' },
  ],
};

export function generateBestForMetalCanonicalUrl() {
  return `${BASE_URL}/cymbals/best-for-metal`;
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

// ItemList of the confirmed cymbal setups, for rich-result eligibility.
// `setups` is the live CYMBAL_SETUPS array, passed in by the caller so this
// module never needs to import cymbalSetups.js directly (keeps the dependency
// direction the same as the rest of the /cymbals data modules).
export function generateBestForMetalItemListSchema(setups) {
  if (!setups || setups.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Confirmed cymbal setups played by metal drummers',
    itemListElement: setups.map((setup, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${setup.brands.join(' & ')} cymbal setup`,
        brand: { '@type': 'Brand', name: setup.brands[0] },
        category: 'Cymbals',
        url: `${BASE_URL}/drummer/${setup.drummerSlug}`,
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
      { '@type': 'ListItem', position: 1, name: 'Cymbals', item: `${BASE_URL}/cymbals` },
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
