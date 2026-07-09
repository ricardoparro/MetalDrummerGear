// Best Drumsticks for Metal — Issue #4139 (epic #4135 phase 4/4)
// Buying-guide content for /drumsticks/best-for-metal. High commercial-intent
// page: explains *why* metal favours heavier/front-weighted/durable sticks,
// then recommends the confirmed signature sticks from data/drumsticks.js.
//
// Recommendations are never hardcoded here — the component pulls the live
// DRUMSTICKS list so the guide can't drift out of sync with (or fabricate
// beyond) the verified drummer→stick mapping. Same "cite source, don't guess"
// discipline as data/drumstickReferencePages.js (phase 2).

const BASE_URL = 'https://metalforge.io';

export const BEST_FOR_METAL_PAGE = {
  slug: 'best-for-metal',
  title: 'Best Drumsticks for Metal: Weight, Balance & Tip Guide | MetalForge',
  description:
    'Why metal favours heavier 5B/2B, front-weighted, durable wood-tip drumsticks — plus the confirmed signature sticks legendary metal drummers actually play.',
  keywords: 'best drumsticks for metal, best metal drumsticks, drumsticks for double bass, drumsticks for blast beats, 5B vs 2B for metal',
  h1: 'Best Drumsticks for Metal',
  intro:
    "There is no single \"correct\" metal drumstick — technique, hand size, and genre (a black metal blast-beat set and a doom set have very different demands) all push in different directions. But high-volume, high-endurance metal playing does reward a few consistent traits: more mass, weight biased toward the tip, and enough durability to survive a full set without snapping or wearing unevenly. This guide covers why those traits matter and which confirmed signature sticks from our database fit them.",
  whyHeavier: {
    heading: 'Why metal favours heavier 5B/2B sticks over 5A',
    body:
      "Drumstick sizes use a number-and-letter code — see the /drumsticks/sizes guide for the full breakdown — where a lower number means a thicker shaft. A 5B is noticeably thicker than a 5A at the same length, and a 2B is thicker still. More mass behind each stroke means more volume and impact for the same amount of arm effort, which matters over a full set of aggressive, high-tempo playing. It also means less energy is lost to the stick flexing on contact, so accents and ghost notes stay more consistent as fatigue sets in. The trade-off is speed and control: a thinner 5A moves faster for intricate, quiet passages, which is why some technical/progressive metal drummers still prefer it. Heavier is a durability and power choice, not an automatic upgrade.",
  },
  whyFrontWeighted: {
    heading: 'Why front-weighted (barrel / teardrop / acorn) beats a light tip for metal',
    body:
      "Tip shape changes where a stick's mass is concentrated — see the /drumsticks/tips guide for the full shape breakdown. Barrel, teardrop, and acorn tips have a wider, heavier contact area than a small round tip, which puts more of the stick's weight toward the striking end (\"front-weighted\"). That produces a fuller, punchier, more cutting sound on cymbals and drum heads in a dense metal mix, where a thin, bright round-tip attack can get buried under distorted guitars. Several of the confirmed signature sticks below use exactly this kind of tip for that reason.",
  },
  whyDurability: {
    heading: 'Why durability matters as much as feel',
    body:
      "Blast beats, fast double bass, and hard, repeated snare/cymbal hits accelerate stick wear fast — a pair that feels great for the first ten minutes but splinters or chips mid-set is a real problem on stage, not just an inconvenience. Hickory is the standard choice because it balances shock absorption with density; drummers who break sticks constantly sometimes move to oak (denser, more durable, but heavier and harder on the hands) or to synthetic options like Ahead's aluminum-core sticks, which trade some traditional wood feel for a sleeve that gets replaced instead of the whole stick. See the /drumsticks/materials guide for the full trade-off table.",
  },
  woodVsNylonForMetal:
    'Wood tips give a warmer, darker attack that changes slightly as the tip wears; nylon tips are harder-wearing and stay bright and consistent for longer, which is why they show up on several signature sticks played by drummers doing fast, repetitive cymbal work. Neither is objectively correct for metal — it is a tone and durability call, covered in more depth on the /drumsticks/tips guide.',
  faq: [
    {
      question: 'What is the best drumstick size for metal?',
      answer:
        "There is no single best size, but 5B and 2B are the most common choices among hard-hitting metal drummers because their extra mass supports louder, more durable playing than a 5A. Drummers prioritising speed on technical or fast progressive-metal passages sometimes stay on 5A. Check the confirmed signature sticks below to see the actual sizes legendary metal drummers use.",
    },
    {
      question: 'Should metal drummers use wood or nylon tips?',
      answer:
        'Either can work. Nylon tips wear more slowly and keep a brighter, more consistent cymbal attack over a long set, which is common on fast, cymbal-heavy metal playing. Wood tips give a warmer tone but change slightly as they wear down. Several confirmed metal signature sticks use wood tips (teardrop, barrel, oval), so it is not a hard rule either way.',
    },
    {
      question: 'Are aluminum drumsticks (like Ahead) worth it for metal?',
      answer:
        "For drummers who break wood sticks often on tour, Ahead's aluminum-core sticks with a replaceable outer sleeve can be worth the higher upfront cost — the core essentially can't break, and only the sleeve wears out. Lars Ulrich's confirmed signature stick is an Ahead model for exactly this reason. The trade-off is a feel that many drummers describe as less organic than wood.",
    },
    {
      question: 'What drumsticks do professional metal drummers actually use?',
      answer:
        "See the confirmed list on this page — it pulls directly from our verified drummer-to-stick database, not guesses. Every entry links to a full spec breakdown (size, diameter, length, material, tip, taper) and its source.",
    },
  ],
  sources: [
    { label: 'Vic Firth — American Classic (sizing reference)', url: 'https://vicfirth.com/collections/vic-firth-category-sticks-drum-set-american-classic' },
    { label: "D'Addario — hickory vs oak vs maple drumsticks", url: 'https://support.daddario.com/hc/en-us/articles/11916115982996-What-is-the-difference-between-hickory-oak-and-maple-drumsticks' },
  ],
};

export function generateBestForMetalCanonicalUrl() {
  return `${BASE_URL}/drumsticks/best-for-metal`;
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

// ItemList of the confirmed recommended sticks, for rich-result eligibility.
// `sticks` is the live DRUMSTICKS array, passed in by the caller so this
// module never needs to import drumsticks.js directly (keeps the dependency
// direction the same as the rest of the /drumsticks data modules).
export function generateBestForMetalItemListSchema(sticks) {
  if (!sticks || sticks.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Confirmed drumsticks played by metal drummers',
    itemListElement: sticks.map((stick, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${stick.brand} ${stick.model}`,
        brand: { '@type': 'Brand', name: stick.brand },
        category: 'Drumsticks',
        material: stick.material,
        url: `${BASE_URL}/drumsticks/signature/${stick.drummerSlug}`,
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
      { '@type': 'ListItem', position: 1, name: 'Drumsticks', item: `${BASE_URL}/drumsticks` },
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
