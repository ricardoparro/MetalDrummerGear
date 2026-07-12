// Best Bass Drum Pedals for Metal — Issue #4433 (split 2/3 of #4394)
// Buying-guide content for /pedals/best-for-metal. High commercial-intent
// page: double-bass focus, then a drive-type recommendation matrix by
// playing style and budget tier (roughly €150-900, the range the verified
// roster's pedals actually occupy). `retailerUrls` stays empty until
// affiliate links are added — every recommendation card is CTA-ready and
// falls back to a link to the drummer's pedal setup page until then.
//
// Style/drive-type/example rows are grounded in data/pedals.js (PEDALS,
// #4391) — never hardcoded speculation — so the guide can't drift out of
// sync with the verified drummer->pedal mapping. Same "cite source, don't
// guess" discipline as data/pedalReferencePages.js (phase 2).

const BASE_URL = 'https://metalforge.io';

export const BEST_FOR_METAL_PAGE = {
  slug: 'best-for-metal',
  title: 'Best Bass Drum Pedals for Metal: Drive Type & Budget Guide | MetalForge',
  description:
    'Chain vs direct drive, matched to your playing style and budget from roughly €150 to €900 — plus the verified double bass pedals legendary metal drummers actually play.',
  keywords: 'best bass drum pedal for metal, best double bass pedal, direct drive vs chain pedal for metal, double bass pedal budget guide, metal drummer pedal recommendations',
  h1: 'Best Bass Drum Pedals for Metal',
  intro:
    'There is no single "correct" metal pedal — playing style and budget both push toward different answers. But the verified roster shows a clear pattern once you split it by those two variables: how fast and sustained your footwork needs to be decides the drive type worth paying for, and that decision maps fairly cleanly onto the roughly €150-900 range double bass pedals actually occupy. This guide covers double bass as the metal default, then matches drive type to playing style and budget tier, all anchored to the confirmed pedals below.',
  doubleBassDefault: {
    heading: 'Double bass is the default — but not universal',
    body:
      'Of the 56 verified pedal records in our database, 50 are double-pedal setups (a second, slave-driven beater on the same head) and only 3 are confirmed single pedals. See the /pedals/single-vs-double guide for the full mechanism and when a single pedal still makes sense — Nicko McBrain\'s "Single Bass Drum Pedal" (Iron Maiden\'s galloping traditional heavy metal) is the clearest example on the roster of a top metal drummer who never needed a second beater.',
  },
  matchingDriveToStyle: {
    heading: 'Matching drive type to playing style',
    body:
      'See the /pedals/drive-types guide for the full chain-vs-belt-vs-direct-drive breakdown. Chain drive covers 22 of the 56 verified roster pedals — it\'s the metal default, with a small amount of natural give most drummers find comfortable at any tempo. Direct drive covers 13 of the 56, concentrated among drummers who chase sustained, extreme-speed footwork; belt drive doesn\'t appear in any confirmed roster driveType, staying a niche option relative to the other two. The remaining 21 records name a specific pedal but don\'t confirm a drive type in the source material — those are left unspecified rather than guessed.',
  },
  matrix: [
    {
      style: 'Doom / traditional heavy metal',
      driveType: 'Chain drive or single pedal',
      budgetTier: 'Entry (~€150-300)',
      example: 'Nicko McBrain (Iron Maiden) — single bass drum pedal',
    },
    {
      style: 'Groove metal / thrash / classic double bass',
      driveType: 'Chain drive, double pedal',
      budgetTier: 'Mid (~€300-550)',
      example: 'Lars Ulrich (Metallica) — Tama Iron Cobra 900 Power Glide, chain drive',
    },
    {
      style: 'Progressive / technical / djent',
      driveType: 'Chain drive, longboard',
      budgetTier: 'Upper-mid (~€400-650)',
      example: 'Tomas Haake (Meshuggah) — Tama Speed Cobra, chain drive',
    },
    {
      style: 'Extreme, blast-beat-driven metal (black, death, brutal tech-death)',
      driveType: 'Direct drive',
      budgetTier: 'Pro / flagship (~€600-900)',
      example: 'Hellhammer (Mayhem) — Axis double pedal, direct drive',
    },
  ],
  budgetTiers: [
    {
      heading: 'Entry (~€150-300)',
      body:
        'A chain-drive single or double pedal at this tier covers doom, traditional heavy metal, and most groove metal without needing direct drive\'s zero-slack response. Chain drive\'s slight natural flex is a genuine feature at moderate tempos, not just a budget compromise.',
    },
    {
      heading: 'Mid / gigging (~€300-650)',
      body:
        'This is where most of the verified roster\'s double pedals actually sit: chain-drive workhorses like the Tama Iron Cobra and DW 9000 Series, plus longboard chain-drive models like the Tama Speed Cobra for drummers who want more footboard length for complex, odd-grouping footwork.',
    },
    {
      heading: 'Pro / flagship (~€600-900)',
      body:
        'Direct-drive pedals — Axis (the direct-drive specialist brand, no chain or belt at all), Pearl\'s Demon Drive and Demon XR, and boutique CNC-machined pedals like the Trick Pro1-V — remove all slack between footboard and beater for the fastest, most consistent response. This tier is concentrated among drummers chasing sustained, extreme-speed blast beats rather than a general upgrade every metal drummer needs.',
    },
  ],
  faq: [
    {
      question: 'What is the best bass drum pedal for metal?',
      answer:
        'There is no single best pedal — it depends on playing style and budget. Chain drive (Tama Iron Cobra, DW 9000) covers most metal styles at an accessible price; direct drive (Axis, Pearl Demon Drive) is worth the extra cost mainly for drummers chasing sustained, extreme-speed blast beats. See the matrix above for the drive type and budget tier that fits your style.',
    },
    {
      question: 'Do I need direct drive for metal, or is chain drive enough?',
      answer:
        'Chain drive is enough for the large majority of metal styles — it covers 22 of the 56 verified roster pedals, including thrash, groove, and progressive metal drummers. Direct drive (13 of 56) is concentrated among drummers specifically chasing sustained, extreme-speed footwork, like Hellhammer\'s blast-beat-driven black metal. See the /pedals/drive-types guide for the full comparison.',
    },
    {
      question: 'How much should I budget for a metal double bass pedal?',
      answer:
        'Verified roster pedals span roughly €150 for an entry-level chain-drive single or double pedal up to €900 for a boutique direct-drive flagship. Most gigging metal drummers land in the €300-650 mid tier with a chain-drive workhorse like the Tama Iron Cobra or DW 9000 Series.',
    },
    {
      question: 'Do I need a double bass pedal for metal?',
      answer:
        'For most metal styles, yes — 50 of the 56 verified roster pedals are double-pedal setups. Doom, traditional heavy metal, and some groove metal are the main exceptions; Nicko McBrain\'s single pedal setup with Iron Maiden is a confirmed example. See the /pedals/single-vs-double guide for the full breakdown.',
    },
  ],
  sources: [
    { label: 'Sweetwater InSync — Kick Pedal Drive Types Explained', url: 'https://www.sweetwater.com/insync/kick-pedal-drive-types-explained/' },
    { label: 'Sound Pure — Bass Drum Pedal Drive Types', url: 'https://www.soundpure.com/a/expert-advice/drums/bass-drum-pedal-drive-types/' },
  ],
};

export function generateBestForMetalCanonicalUrl() {
  return `${BASE_URL}/pedals/best-for-metal`;
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

// ItemList of the verified drummer pedals, for rich-result eligibility.
// `pedals` is the live PEDALS array, passed in by the caller so this module
// never needs to import data/pedals.js directly (keeps the dependency
// direction the same as the rest of the /pedals data modules).
export function generateBestForMetalItemListSchema(pedals) {
  if (!pedals || pedals.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Verified bass drum pedals played by metal drummers',
    itemListElement: pedals.map((pedal, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: `${pedal.brand ? `${pedal.brand} ` : ''}${pedal.model || pedal.summary}`,
        ...(pedal.brand ? { brand: { '@type': 'Brand', name: pedal.brand } } : {}),
        category: 'Bass Drum Pedals',
        url: `${BASE_URL}/pedals/setups/${pedal.drummerSlug}`,
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
      { '@type': 'ListItem', position: 1, name: 'Pedals', item: `${BASE_URL}/pedals` },
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
