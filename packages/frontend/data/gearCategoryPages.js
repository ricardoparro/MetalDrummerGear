/**
 * Gear Category Pages Data Module
 * Issue #770: SEO Blitz - Auto-Generate Gear-Specific Pages
 * 
 * Generates long-tail keyword pages at /drummer/:slug/:category
 * Captures searches like "joey jordison cymbals", "what drums does lars ulrich use"
 */

// Valid gear categories for URL routing
export const DRUMMER_GEAR_CATEGORIES = ['cymbals', 'drums', 'pedals', 'hardware', 'snare', 'sticks'];

// Category metadata for SEO and display
export const CATEGORY_META = {
  cymbals: {
    label: 'Cymbals',
    icon: '🥁',
    pluralLabel: 'Cymbals',
    description: 'Complete cymbal setup including hi-hats, crashes, rides, and chinas',
    gearKeys: ['cymbals'],
    relatedCategories: ['drums', 'hardware'],
    editorialIntro: 'Cymbals define the sonic character of any metal drum kit, providing the explosive attack, shimmering sustain, and dark complexity that set metal drumming apart. The interplay between tight hi-hats, explosive crash cymbals, and complex rides determines how a drummer locks in with the rhythm section and punctuates the heaviest musical moments. In professional metal drumming, four brands dominate: Zildjian, Paiste, Sabian, and Meinl. Zildjian A Custom and K Custom series are fixtures in thrash and modern metal for their cutting, articulate response. Paiste 2002 and Rude models deliver explosive projection ideal for live metal performance. Sabian AAX and HHX lines provide bright, fast response across rapid passages. Meinl Byzance and Classics Custom Dark series are favored in death and black metal for their darker, drier tone. Cymbal thickness, alloy composition, and surface treatment all shape the final sound — making cymbal selection as critical as the kit itself.',
    faqItems: [
      {
        question: 'What cymbals do metal drummers use?',
        answer: 'Metal drummers typically use a combination of hi-hats (13–14 inch), one or two crash cymbals (16–18 inch), a ride cymbal (20–22 inch), and often a china cymbal for accent hits. Top brands include Zildjian (A Custom, K Custom), Paiste (2002, Rude), Sabian (AAX, HHX), and Meinl (Byzance, Classics Custom Dark). Many players also add splash and effect cymbals for sonic variety.',
      },
      {
        question: 'What are the best cymbal brands for metal drumming?',
        answer: 'The four dominant cymbal brands in professional metal drumming are Zildjian, Paiste, Sabian, and Meinl. Zildjian is trusted by Lars Ulrich (Metallica) and many thrash metal drummers. Paiste is favored for explosive projection, Sabian is popular in progressive metal, and Meinl Byzance series is widely used in death and black metal for its dark, dry tonal character.',
      },
      {
        question: 'What types of cymbals are essential for a metal drum kit?',
        answer: 'A complete metal cymbal setup includes hi-hats (13–14 inch, often tight and fast-sounding), at least two crash cymbals (16–18 inch) for powerful accents, a ride cymbal (20–22 inch for complex patterns), and a china cymbal for aggressive accent hits. Many metal drummers add stacks or effect cymbals. The exact combination varies by subgenre — death metal setups often differ significantly from progressive or groove metal configurations.',
      },
    ],
  },
  drums: {
    label: 'Drums',
    icon: '🥁',
    pluralLabel: 'Drum Kit',
    description: 'Full drum kit including bass drums, toms, and shells',
    gearKeys: ['drums'],
    relatedCategories: ['snare', 'cymbals', 'hardware'],
  },
  pedals: {
    label: 'Pedals',
    icon: '🦶',
    pluralLabel: 'Bass Drum Pedals',
    description: 'Bass drum pedals and footwork setup',
    gearKeys: ['hardware'],
    relatedCategories: ['drums', 'hardware'],
  },
  hardware: {
    label: 'Hardware',
    icon: '⚙️',
    pluralLabel: 'Hardware Setup',
    description: 'Stands, racks, thrones, and all drum hardware',
    gearKeys: ['hardware'],
    relatedCategories: ['drums', 'pedals'],
  },
  snare: {
    label: 'Snare',
    icon: '🥁',
    pluralLabel: 'Snare Drums',
    description: 'Signature snare drums and snare setup',
    gearKeys: ['snare'],
    relatedCategories: ['drums', 'cymbals'],
  },
  sticks: {
    label: 'Sticks',
    icon: '🥢',
    pluralLabel: 'Drumsticks',
    description: 'Signature drumsticks and stick preferences',
    gearKeys: ['sticks'],
    relatedCategories: ['drums', 'hardware'],
  },
};

const CYMBAL_BRANDS = ['Zildjian', 'Paiste', 'Sabian', 'Meinl'];
const DRUM_BRANDS = ['Tama', 'Pearl', 'Sonor', 'DW', 'Ludwig', 'Mapex', 'ddrum', 'SJC', 'OCDP'];
const PEDAL_BRANDS = ['Tama', 'Pearl', 'DW', 'Gibraltar'];

export function extractBrand(gearString, category) {
  if (!gearString) return null;
  const brands = category === 'cymbals' ? CYMBAL_BRANDS : 
                 category === 'drums' ? DRUM_BRANDS :
                 category === 'pedals' || category === 'hardware' ? [...PEDAL_BRANDS, ...DRUM_BRANDS] :
                 [...DRUM_BRANDS, ...CYMBAL_BRANDS];
  for (const brand of brands) {
    if (gearString.toLowerCase().includes(brand.toLowerCase())) return brand;
  }
  return null;
}

export function extractPedals(hardwareString) {
  if (!hardwareString) return null;
  const pedalKeywords = ['pedal', 'cobra', 'demon', 'eliminator', 'speed'];
  const items = hardwareString.split(/[,;]/).map(i => i.trim());
  const pedals = items.filter(item => pedalKeywords.some(kw => item.toLowerCase().includes(kw)));
  return pedals.length > 0 ? pedals.join(', ') : null;
}

export function getGearForCategory(drummer, category) {
  if (!drummer?.gear) return null;
  const meta = CATEGORY_META[category];
  if (!meta) return null;
  if (category === 'pedals') return extractPedals(drummer.gear.hardware);
  const gearItems = meta.gearKeys.map(key => drummer.gear[key]).filter(Boolean).join(', ');
  return gearItems || null;
}

export function generateTitle(drummer, category) {
  const meta = CATEGORY_META[category];
  if (!meta) return `${drummer.name}'s ${category} | MetalForge`;
  const gearString = getGearForCategory(drummer, category);
  const brand = extractBrand(gearString, category);
  if (brand) return `${drummer.name}'s ${meta.pluralLabel}: ${brand} Setup | MetalForge`;
  return `${drummer.name}'s ${meta.pluralLabel}: Complete Setup | MetalForge`;
}

export function generateDescription(drummer, category) {
  const meta = CATEGORY_META[category];
  if (!meta) return `Explore ${drummer.name}'s ${category} setup.`;
  const gearString = getGearForCategory(drummer, category);
  const brand = extractBrand(gearString, category);
  const brandText = brand ? `${brand} ` : '';
  return `Explore ${drummer.name}'s (${drummer.band}) complete ${brandText}${meta.label.toLowerCase()} setup. Detailed specs, video timestamps, and gear breakdown.`;
}

export function generateCanonicalUrl(drummerSlug, category) {
  return `https://metalforge.io/drummer/${drummerSlug}/${category}`;
}

export function generateFAQItems(drummer, category) {
  const meta = CATEGORY_META[category];
  if (!meta) return [];
  const gearString = getGearForCategory(drummer, category);
  const brand = extractBrand(gearString, category);
  const faqs = [];
  faqs.push({
    question: `What ${meta.label.toLowerCase()} does ${drummer.name} use?`,
    answer: gearString || `${drummer.name} uses professional-grade ${meta.label.toLowerCase()} for their setup with ${drummer.band}.`,
  });
  if (brand) {
    faqs.push({
      question: `Why does ${drummer.name} use ${brand}?`,
      answer: `${drummer.name} has been endorsed by ${brand} and uses their ${meta.label.toLowerCase()} for the distinctive sound heard on ${drummer.band} recordings.`,
    });
  }
  faqs.push({
    question: `How much do ${drummer.name}'s ${meta.label.toLowerCase()} cost?`,
    answer: `${drummer.name}'s ${meta.label.toLowerCase()} setup consists of professional-grade equipment. Check the detailed breakdown above for specific models and estimated prices.`,
  });
  return faqs;
}

export function generateSchema(drummer, category, url) {
  const meta = CATEGORY_META[category];
  const faqs = generateFAQItems(drummer, category);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        "url": url,
        "name": generateTitle(drummer, category),
        "description": generateDescription(drummer, category),
        "isPartOf": { "@id": "https://metalforge.io" },
        "about": { "@type": "Person", "name": drummer.name, "description": drummer.bio },
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      },
    ],
  };
}

export function getRelatedPages(drummerSlug, currentCategory) {
  const meta = CATEGORY_META[currentCategory];
  if (!meta) return [];
  return meta.relatedCategories.map(cat => ({
    category: cat,
    label: CATEGORY_META[cat]?.pluralLabel || cat,
    url: `/drummer/${drummerSlug}/${cat}`,
  }));
}

export function isValidCategory(category) {
  return DRUMMER_GEAR_CATEGORIES.includes(category);
}

export const PRIORITY_DRUMMERS = [
  'joey-jordison', 'lars-ulrich', 'george-kollias', 'mario-duplantier',
  'dave-lombardo', 'brann-dailor', 'tomas-haake', 'danny-carey',
  'gene-hoglan', 'eloy-casagrande', 'mike-portnoy', 'vinnie-paul',
  'charlie-benante', 'ray-luzier', 'john-otto', 'jay-weinberg',
];

export const PRIORITY_CATEGORIES = ['cymbals', 'drums', 'pedals', 'hardware'];

export function getPriorityPages() {
  const pages = [];
  for (const drummer of PRIORITY_DRUMMERS) {
    for (const category of PRIORITY_CATEGORIES) {
      pages.push({ drummerSlug: drummer, category, url: `/drummer/${drummer}/${category}` });
    }
  }
  return pages.slice(0, 50);
}

export default {
  DRUMMER_GEAR_CATEGORIES,
  CATEGORY_META,
  isValidCategory,
  getGearForCategory,
  generateTitle,
  generateDescription,
  generateCanonicalUrl,
  generateFAQItems,
  generateSchema,
  getRelatedPages,
  extractBrand,
  getPriorityPages,
  PRIORITY_DRUMMERS,
  PRIORITY_CATEGORIES,
};
