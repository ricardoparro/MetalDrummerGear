/**
 * Gear Category Pages Data Module
 * Issue #770: SEO Blitz - Auto-Generate Gear-Specific Pages
 *
 * Generates long-tail keyword pages at /drummer/:slug/:category
 * Captures searches like "joey jordison cymbals", "what drums does lars ulrich use"
 */

import { getExtendedBio } from './extendedBios';

// Valid gear categories for URL routing
// Issue #10135: 'heads' added — drummer.gear.heads is a real, verified field
// (see api/drummers/index.js) but this category was previously excluded here,
// leaving every /drummer/<slug>/heads page with zero FAQ content (isValidCategory
// gated FAQ generation on this list) and contributing to a crawled-not-indexed
// thin-content verdict on those URLs.
export const DRUMMER_GEAR_CATEGORIES = ['cymbals', 'drums', 'pedals', 'hardware', 'snare', 'sticks', 'heads'];

// Category metadata for SEO and display
export const CATEGORY_META = {
  cymbals: {
    label: 'Cymbals',
    icon: '🥁',
    pluralLabel: 'Cymbals',
    description: 'Complete cymbal setup including hi-hats, crashes, rides, and chinas',
    gearKeys: ['cymbals'],
    relatedCategories: ['drums', 'hardware'],
    editorialIntro: 'Cymbals define the sonic character of any metal drum kit, providing the explosive attack, shimmering sustain, and dark complexity that set metal drumming apart. The interplay between tight hi-hats, explosive crash cymbals, and complex rides determines how a drummer locks in with the rhythm section and punctuates the heaviest musical moments. In professional metal drumming, four brands dominate: Zildjian, Paiste, Sabian, and Meinl. Zildjian A Custom and K Custom series are fixtures in thrash and modern metal for their cutting, articulate response. Paiste 2002 and Rude models deliver explosive projection ideal for live metal performance. Sabian AAX and HHX lines provide bright, fast response across rapid passages. Meinl Byzance and Classics Custom Dark series are favored in death and black metal for their darker, drier tone. Cymbal thickness, alloy composition, and surface treatment all shape the final sound — making cymbal selection as critical as the kit itself. Many metal drummers also run a china cymbal for aggressive, trashy accents and layer splashes or stacks into fills for extra texture, tailoring the exact combination to their subgenre.',
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
    // Issue #10135: thin-content fix — generic, non-drummer-specific editorial
    // prose (same pattern as the cymbals entry below) so the bot-facing SSR
    // shell has a real paragraph instead of just title/description/FAQ.
    editorialIntro: 'A metal drum kit\'s shell material, depth, and hardware mounting shape how the entire rhythm section translates from stage to recording. Deeper toms add low-end punch for breakdowns, while birch and maple shells each offer a distinct balance of attack and sustain under heavy hitting. Professional metal drummers overwhelmingly favor a handful of road-tested brands: Tama Starclassic kits are a fixture in thrash and power metal (Nicko McBrain and Yoshiki both favor Tama), Pearl Masters and Masterworks kits are trusted by drummers like Gene Hoglan and Chad Smith for their durability and tone, DW Collector\'s series is popular across thrash and death metal for its rigid hardware mounting, and Mapex Saturn kits offer a budget-friendly alternative without sacrificing projection. Bass drum sizing is a key decision — 22 to 24-inch kicks deliver the low-frequency weight double-bass patterns need to cut through downtuned guitars, while rack and floor tom configurations vary widely by subgenre, from minimal 4-piece thrash setups to sprawling progressive-metal rigs with a dozen or more drums.',
  },
  pedals: {
    label: 'Pedals',
    icon: '🦶',
    pluralLabel: 'Bass Drum Pedals',
    description: 'Bass drum pedals and footwork setup',
    gearKeys: ['hardware'],
    relatedCategories: ['drums', 'hardware'],
    editorialIntro: 'Bass drum pedals are the most physically demanding piece of hardware in a metal drummer\'s rig, translating every foot movement into the rapid sixteenth-note patterns that define thrash, death, and technical metal. Double pedal and dual-chain-drive systems from Tama (Iron Cobra), Pearl (Eliminator, Demon), DW (5000, 9000 series), and Gibraltar dominate professional setups, each offering adjustable cam action, spring tension, and beater angle to fine-tune response speed versus power. Direct-drive pedals deliver a more immediate, one-to-one feel favored by technical and progressive drummers chasing precision at high tempos, while longboard chain-drive designs favor fluid, rebound-heavy footwork for blast beats and extended double-bass runs. Beater material — felt for a rounder, warmer attack or hard plastic for a sharper, more percussive click — further shapes how the kick drum cuts through dense, heavily distorted mixes. Pedal durability under constant hard use is non-negotiable, which is why touring metal drummers overwhelmingly settle on the same handful of road-tested, heavy-duty brands rather than switching setups between tours.',
  },
  hardware: {
    label: 'Hardware',
    icon: '⚙️',
    pluralLabel: 'Hardware Setup',
    description: 'Stands, racks, thrones, and all drum hardware',
    gearKeys: ['hardware'],
    relatedCategories: ['drums', 'pedals'],
    editorialIntro: 'Metal drumming requires double-braced stands rated for heavy, sustained use — a single-braced stand that works fine for a casual rock gig will wobble and eventually fail under the constant hard hitting metal demands. Tama, Pearl, DW, and Gibraltar supply the overwhelming majority of professional metal hardware, from hi-hat stands with smooth, fast action for rapid open-close work to snare stands with memory locks that keep height and angle consistent night after night on tour. Rack systems — Pearl\'s DR-503 and DW\'s DWCP9000 among the most common — replace a forest of individual stands with a single modular frame, a setup favored by drummers like Gene Hoglan and Chris Adler for the stability it gives large multi-tom configurations. Boom cymbal arms with ratchet tilters let drummers angle crashes and chinas precisely for both comfort and camera-friendly positioning, while heavy-duty thrones with wide, cushioned tops support the extended, high-intensity sets common in touring metal. Hardware choice is rarely glamorous, but it is often the difference between a kit that survives a tour and one that doesn\'t.',
  },
  snare: {
    label: 'Snare',
    icon: '🥁',
    pluralLabel: 'Snare Drums',
    description: 'Signature snare drums and snare setup',
    gearKeys: ['snare'],
    relatedCategories: ['drums', 'cymbals'],
    editorialIntro: 'The snare drum carries more of a metal kit\'s sonic identity than almost any other single piece, since it anchors the backbeat and has to cut cleanly through walls of distorted guitar. Steel and aluminium shells in the 6.5 to 8-inch depth range dominate professional metal setups for their sharp, cutting crack, and tighter-tensioned heads like Remo Ambassador Coated or Evans Genera HD reduce ring and overtones for a dry, punchy sound. Signature and custom models are common among top players — Joey Jordison\'s Tama signature snare, Lars Ulrich\'s Ludwig Black Beauty, and Gene Hoglan\'s Pearl Free-Floating are all built around this same cutting, low-overtone philosophy, just with different shell materials and finishing touches. Free-floating shell designs, which isolate the drum from its own hardware, are especially popular in metal because they maximize resonance and attack simultaneously. Snare tuning in metal also tends to run higher than in other genres, trading some low-end warmth for the piercing crack needed to stay audible over blast beats and high-gain guitar tones.',
  },
  sticks: {
    label: 'Sticks',
    icon: '🥢',
    pluralLabel: 'Drumsticks',
    description: 'Signature drumsticks and stick preferences',
    gearKeys: ['sticks'],
    relatedCategories: ['drums', 'hardware'],
    editorialIntro: 'Drumstick choice in metal comes down to a tradeoff between speed and durability: hickory wood holds up to the relentless hard hitting and rim shots of thrash, death, and black metal, while maple shaves weight for drummers chasing raw speed on blast beats and rapid single-stroke rolls. Heavier models — 5B and 2B being the standard weights across the genre — withstand the constant impact of metal drumming far better than lighter jazz or pop sticks, which tend to crack or splinter under sustained abuse. Vic Firth, Promark, and Zildjian supply most of the signature lines metal drummers reach for, with players like Benny Greb, Dave Lombardo, and Lars Ulrich each having a namesake model tuned to their own grip and attack. Nylon tips produce a brighter, more defined cymbal articulation that cuts through a dense mix, while wood tips give a warmer, rounder tone but wear down faster under heavy use. Grip taping and stick diameter also factor in, since sweat and long sets can turn an otherwise solid stick into a safety hazard mid-song.',
  },
  heads: {
    label: 'Heads',
    icon: '🎯',
    pluralLabel: 'Drumheads',
    description: 'Drumhead brand and models for each drum',
    gearKeys: ['heads'],
    relatedCategories: ['drums', 'snare'],
    editorialIntro: 'Drumhead selection shapes a metal kit\'s attack, sustain, and ability to survive night after night of hard hitting, and the choice is almost as important as the shells themselves. Remo and Evans dominate professional metal setups, with coated, double-ply heads like the Remo Emperor Coated and Evans G2 favored on toms for their durability and controlled, dampened overtones under heavy playing. Bass drum heads see even more specialized construction — models like the Evans EQ3 and Remo Powerstroke 3 build in reinforcement rings and internal muffling to deliver the tight, punchy low end that double-bass and blast-beat patterns need to stay articulate at high tempo. Snare batter heads typically run thinner and more tightly tuned than tom heads, trading some durability for the crack and immediate response metal drumming demands. Because metal drummers hit harder and more often than players in most other genres, head replacement is a routine maintenance item on tour, and the brand/model choice is usually dictated as much by how long a head survives under abuse as by its tone.',
  },
};

const CYMBAL_BRANDS = ['Zildjian', 'Paiste', 'Sabian', 'Meinl'];
const DRUM_BRANDS = ['Tama', 'Pearl', 'Sonor', 'DW', 'Ludwig', 'Mapex', 'ddrum', 'SJC', 'OCDP'];
const PEDAL_BRANDS = ['Tama', 'Pearl', 'DW', 'Gibraltar'];
// Issue #10135: 'heads' and 'sticks' both fell through to the
// DRUM_BRANDS+CYMBAL_BRANDS default below, which never matches a drumhead or
// drumstick string (Remo/Evans/Vic Firth/Vater aren't drum or cymbal brands)
// — every /drummer/<slug>/heads and /sticks page silently lost its "Why does
// X use {brand}?" FAQ item, leaving only 2 of 3 FAQs.
const HEAD_BRANDS = ['Remo', 'Evans', 'Aquarian', 'Attack'];
const STICK_BRANDS = ['Vic Firth', 'Promark', 'Zildjian', 'Vater', 'Ahead', 'Wincent'];

export function extractBrand(gearString, category) {
  if (!gearString) return null;
  const brands = category === 'cymbals' ? CYMBAL_BRANDS :
                 category === 'drums' ? DRUM_BRANDS :
                 category === 'pedals' || category === 'hardware' ? [...PEDAL_BRANDS, ...DRUM_BRANDS] :
                 category === 'heads' ? HEAD_BRANDS :
                 category === 'sticks' ? STICK_BRANDS :
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

// Issue #10135: keywords used to find a category-relevant question inside a
// drummer's already-authored extendedBios.js FAQ list. 'drums' excludes
// snare/cymbal/stick matches since those are separate categories that would
// otherwise also match a loose /drum/i test. 'heads' uses a word boundary so
// it doesn't match unrelated words like "ahead".
const CATEGORY_FAQ_KEYWORDS = {
  cymbals: (q) => /cymbal/i.test(q),
  drums: (q) => /\bdrum(s| kit| set)?\b/i.test(q) && !/snare|cymbal|stick/i.test(q),
  pedals: (q) => /pedal/i.test(q),
  hardware: (q) => /hardware|\brack\b|\bstand\b|throne/i.test(q),
  snare: (q) => /snare/i.test(q),
  sticks: (q) => /\bsticks?\b/i.test(q),
  heads: (q) => /\bheads?\b/i.test(q),
};

// A richer, drummer-specific FAQ answer sourced from the extended bio's own
// hand-authored FAQ (data/extendedBios.js) — adds real per-drummer depth on
// top of generateFAQItems()'s templated questions, the way #7907 surfaced
// extendedBios FAQ content on the pedal-setup template. Returns null when the
// drummer has no extended bio or no FAQ entry matching this category.
export function getGearCategoryContextFaq(drummerSlug, category) {
  const bio = getExtendedBio(drummerSlug);
  const items = bio?.sections?.faq?.items || [];
  const matchesCategory = CATEGORY_FAQ_KEYWORDS[category];
  if (!matchesCategory) return null;
  const match = items.find((item) => matchesCategory(item.q));
  return match ? { question: match.q, answer: match.a } : null;
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
  getGearCategoryContextFaq,
  generateSchema,
  getRelatedPages,
  extractBrand,
  getPriorityPages,
  PRIORITY_DRUMMERS,
  PRIORITY_CATEGORIES,
};
