// Gear Comparison Data for MetalForge
// Issue #345: Gear comparison pages (Tama vs Pearl, etc.)

/**
 * Gear comparison categories and metadata
 * Each comparison includes SEO-optimized content and structured data
 */

export const gearComparisons = {
  // Drum Kit Brands
  'tama-vs-pearl': {
    slug: 'tama-vs-pearl',
    title: 'Tama vs Pearl Drums',
    metaTitle: 'Tama vs Pearl Drums Comparison - Which Kit is Best for Metal? | MetalForge',
    metaDescription: 'Compare Tama and Pearl drums for metal drumming. See specs, pricing, pro endorsements, and which kit suits your playing style. Expert analysis from MetalForge.',
    category: 'drums',
    items: [
      {
        brand: 'Tama',
        model: 'Starclassic Walnut/Birch',
        image: 'https://www.tama.com/images/products/starclassic-wb.jpg',
        priceRange: '€3,500 - €4,500',
        pros: [
          'Hybrid shell delivers warmth and attack',
          'Star-Cast mounting system isolates shells',
          'Die-cast hoops for crisp rimshots',
          'Wide range of finish options',
        ],
        cons: [
          'Higher price point',
          'Heavy hardware',
        ],
        specs: {
          shells: 'Walnut/Birch hybrid',
          plies: '6mm (5-ply)',
          hoops: 'Die-Cast',
          mounting: 'Star-Cast',
        },
        usedBy: ['Lars Ulrich', 'Gene Hoglan', 'Charlie Benante', 'Eloy Casagrande'],
        bestFor: 'Thrash and progressive metal',
        rating: 4.8,
      },
      {
        brand: 'Pearl',
        model: 'Reference Series',
        image: 'https://pearldrum.com/images/products/reference.jpg',
        priceRange: '€3,200 - €4,200',
        pros: [
          'Reference Shell construction - optimized wood per drum size',
          'MasterCast hoops for durability',
          'Excellent studio tone',
          'OptiMount suspension system',
        ],
        cons: [
          'Complex shell formula may not suit all styles',
          'Premium pricing',
        ],
        specs: {
          shells: 'Birch/Maple/Mahogany hybrid',
          plies: 'Size-specific',
          hoops: 'MasterCast',
          mounting: 'OptiMount',
        },
        usedBy: ['Joey Jordison', 'Dave Lombardo', 'George Kollias', 'Matt Halpern'],
        bestFor: 'Death metal and extreme metal',
        rating: 4.7,
      },
    ],
    comparison: {
      sound: 'Tama Starclassic offers more warmth with controlled attack, while Pearl Reference delivers focused, punchy tones with size-optimized resonance.',
      durability: 'Both brands are built to withstand heavy hitting. Tama\'s die-cast hoops edge out slightly for rimshot-heavy players.',
      value: 'Pearl offers marginally better value with comparable quality. Tama commands premium for signature aesthetics.',
      forMetal: 'Both excel in metal. Tama suits progressive and thrash; Pearl dominates death metal and extreme genres.',
    },
    verdict: 'For metal drummers, both brands deliver world-class performance. Choose Tama for warm, articulate tones in progressive metal, or Pearl for focused attack in extreme metal styles.',
  },

  // Cymbal Brands
  'meinl-vs-zildjian': {
    slug: 'meinl-vs-zildjian',
    title: 'Meinl vs Zildjian Cymbals',
    metaTitle: 'Meinl vs Zildjian Cymbals - Best Cymbals for Metal Drumming | MetalForge',
    metaDescription: 'Meinl Byzance vs Zildjian A Custom for metal drumming. Compare dark vs bright tones, pricing, and which cymbals pro metal drummers prefer.',
    category: 'cymbals',
    items: [
      {
        brand: 'Meinl',
        model: 'Byzance Series',
        image: 'https://meinlcymbals.com/images/products/cymbal_byzance.jpg',
        priceRange: '€2,000 - €3,000',
        pros: [
          'Hand-hammered Turkish craftsmanship',
          'Dark, complex overtones',
          'Wide variety (Traditional, Brilliant, Extra Dry)',
          'Excellent for recording',
        ],
        cons: [
          'Can be too dark for some styles',
          'Higher learning curve for mixing',
        ],
        specs: {
          material: 'B20 Bronze',
          finish: 'Traditional/Brilliant/Extra Dry',
          manufacturing: 'Hand-hammered',
          origin: 'Turkey',
        },
        usedBy: ['Mario Duplantier', 'Brann Dailor', 'Matt Halpern', 'Chris Adler'],
        bestFor: 'Progressive metal, djent, modern metal',
        rating: 4.9,
      },
      {
        brand: 'Zildjian',
        model: 'A Custom Series',
        image: 'https://zildjian.com/images/products/a-custom.jpg',
        priceRange: '€1,800 - €2,600',
        pros: [
          'Bright, cutting projection',
          'Fast response for quick patterns',
          'Industry standard for decades',
          'Consistent quality',
        ],
        cons: [
          'Can be harsh in small rooms',
          'Less complex overtones than handmade',
        ],
        specs: {
          material: 'B20 Bronze',
          finish: 'Brilliant',
          manufacturing: 'Machine-hammered',
          origin: 'USA',
        },
        usedBy: ['Lars Ulrich', 'Ray Luzier', 'John Otto', 'Charlie Benante'],
        bestFor: 'Thrash metal, classic metal, nu-metal',
        rating: 4.6,
      },
    ],
    comparison: {
      sound: 'Meinl Byzance delivers dark, washy tones with complex harmonics. Zildjian A Custom cuts through with bright, focused attack.',
      durability: 'Both are professional-grade. Zildjian edges ahead for heavy hitters due to more consistent manufacturing.',
      value: 'Zildjian offers better value for standard metal sounds. Meinl justifies premium for unique tonal character.',
      forMetal: 'Meinl excels in progressive and modern metal. Zildjian dominates thrash and nu-metal.',
    },
    verdict: 'Meinl Byzance is the choice for progressive drummers seeking sonic depth. Zildjian A Custom remains the workhorse for aggressive, cutting metal tones.',
  },

  // Pedal Comparison
  'tama-iron-cobra-vs-pearl-demon-drive': {
    slug: 'tama-iron-cobra-vs-pearl-demon-drive',
    title: 'Tama Iron Cobra vs Pearl Demon Drive',
    metaTitle: 'Tama Iron Cobra vs Pearl Demon Drive - Best Double Pedal for Metal | MetalForge',
    metaDescription: 'Compare Tama Iron Cobra 900 and Pearl Demon Drive double bass pedals. Speed, feel, durability, and which pedal top metal drummers choose.',
    category: 'hardware',
    items: [
      {
        brand: 'Tama',
        model: 'Iron Cobra 900 Power Glide',
        image: 'https://www.tama.com/usa/products/images/HP900PTWN_main.jpg',
        priceRange: '€400 - €500',
        pros: [
          'Rolling Glide cam for linear feel',
          'Legendary reliability',
          'Dual-surface beaters included',
          'Hard case included',
        ],
        cons: [
          'Heavier than competition',
          'Less adjustability than Demon Drive',
        ],
        specs: {
          camType: 'Power Glide',
          beaterType: 'Dual-surface (felt/plastic)',
          footboard: 'Speed Cobra-style',
          case: 'Included hard case',
        },
        usedBy: ['Lars Ulrich', 'Gene Hoglan', 'Eloy Casagrande', 'Charlie Benante'],
        bestFor: 'Thrash metal, consistent speed runs',
        rating: 4.7,
      },
      {
        brand: 'Pearl',
        model: 'Demon Drive',
        image: 'https://pearldrum.com/images/products/demon-drive.jpg',
        priceRange: '€500 - €600',
        pros: [
          'NiNjA Bearing for ultra-smooth action',
          'Interchangeable cams (Direct/Standard)',
          'Click-lock spring tension adjustment',
          'Long board option for heel-toe',
        ],
        cons: [
          'Higher price point',
          'More complex setup',
        ],
        specs: {
          camType: 'Interchangeable',
          beaterType: 'Demon Beater (switchable)',
          footboard: 'PowerShifter Long Board',
          bearings: 'NiNjA Bearings',
        },
        usedBy: ['Joey Jordison', 'Dave Lombardo', 'Matt Halpern', 'George Kollias'],
        bestFor: 'Death metal, extreme speed, technical playing',
        rating: 4.8,
      },
    ],
    comparison: {
      speed: 'Demon Drive edges ahead for raw speed due to NiNjA bearings. Iron Cobra excels at consistent, controlled blast beats.',
      feel: 'Iron Cobra has a more linear, predictable feel. Demon Drive offers more customization but steeper learning curve.',
      durability: 'Both are tanks. Iron Cobra has proven longevity. Demon Drive\'s bearings need occasional maintenance.',
      forMetal: 'Demon Drive for death metal speed demons. Iron Cobra for thrash consistency.',
    },
    verdict: 'For extreme metal and maximum speed, Pearl Demon Drive leads. For reliability and thrash consistency, Tama Iron Cobra remains the proven choice.',
  },

  // More cymbal comparisons
  'paiste-vs-sabian': {
    slug: 'paiste-vs-sabian',
    title: 'Paiste vs Sabian Cymbals',
    metaTitle: 'Paiste RUDE vs Sabian HHX - Heavy Metal Cymbal Comparison | MetalForge',
    metaDescription: 'Compare Paiste RUDE and Sabian HHX cymbals for metal. Swiss precision vs Canadian craftsmanship. See which cymbals cut through heavy guitars.',
    category: 'cymbals',
    items: [
      {
        brand: 'Paiste',
        model: 'RUDE Series',
        image: 'https://www.paiste.com/images/products/rude.jpg',
        priceRange: '€1,800 - €2,400',
        pros: [
          'Designed for heavy hitting',
          'Cutting, aggressive tone',
          'Incredibly durable',
          'Iconic thrash metal sound',
        ],
        cons: [
          'Limited tonal range',
          'Too harsh for studio work',
        ],
        specs: {
          material: 'CuSn8 Bronze',
          finish: 'Colored',
          manufacturing: 'Machine-made',
          origin: 'Switzerland',
        },
        usedBy: ['Dave Lombardo', 'Joey Jordison', 'Pete Sandoval'],
        bestFor: 'Thrash metal, live performance',
        rating: 4.5,
      },
      {
        brand: 'Sabian',
        model: 'HHX Series',
        image: 'https://www.sabian.com/images/products/hhx.jpg',
        priceRange: '€1,900 - €2,500',
        pros: [
          'Hand-hammered warmth',
          'Excellent dynamic range',
          'Works live and in studio',
          'Dark, musical overtones',
        ],
        cons: [
          'May lack cut in extreme situations',
          'Softer alloy than RUDE',
        ],
        specs: {
          material: 'B20 Bronze',
          finish: 'Natural/Brilliant',
          manufacturing: 'Hand-hammered',
          origin: 'Canada',
        },
        usedBy: ['Tomas Haake', 'Danny Carey', 'Mike Portnoy'],
        bestFor: 'Progressive metal, studio recording',
        rating: 4.7,
      },
    ],
    comparison: {
      sound: 'Paiste RUDE is aggressive and cutting, made for volume. Sabian HHX is darker and more musical with better dynamic response.',
      durability: 'RUDE cymbals are nearly indestructible. HHX is durable but designed for touch, not abuse.',
      value: 'RUDE offers better value for live metal. HHX is worth the premium for versatility.',
      forMetal: 'RUDE for thrash aggression. HHX for progressive complexity.',
    },
    verdict: 'Paiste RUDE is the heavy metal live workhorse. Sabian HHX suits progressive players who need studio versatility with metal power.',
  },

  // Snare comparison
  'tama-slp-vs-pearl-sensitone': {
    slug: 'tama-slp-vs-pearl-sensitone',
    title: 'Tama SLP vs Pearl Sensitone Snares',
    metaTitle: 'Tama SLP vs Pearl Sensitone Snare Drums - Metal Snare Comparison | MetalForge',
    metaDescription: 'Compare Tama SLP and Pearl Sensitone snare drums for metal. Steel vs bronze, crack vs warmth. Find your perfect metal snare sound.',
    category: 'snares',
    items: [
      {
        brand: 'Tama',
        model: 'SLP Steel',
        image: 'https://www.tama.com/images/products/slp-steel.jpg',
        priceRange: '€350 - €450',
        pros: [
          'Cutting steel attack',
          'Super Sensitive Snare System',
          'Fat, ringy tone',
          'Classic metal sound',
        ],
        cons: [
          'Can be too bright for some',
          'Heavy',
        ],
        specs: {
          material: '1.2mm Steel',
          size: '14x6.5"',
          hoops: 'Die-Cast',
          snareWires: '42-strand',
        },
        usedBy: ['Lars Ulrich', 'Gene Hoglan'],
        bestFor: 'Thrash metal, aggressive snare',
        rating: 4.6,
      },
      {
        brand: 'Pearl',
        model: 'Sensitone Elite Bronze',
        image: 'https://pearldrum.com/images/products/sensitone.jpg',
        priceRange: '€300 - €400',
        pros: [
          'Warm, complex bronze tone',
          'Sensitive response',
          'Great for ghost notes',
          'Versatile across genres',
        ],
        cons: [
          'Less cutting than steel',
          'Requires tuning finesse',
        ],
        specs: {
          material: '1.5mm Bronze',
          size: '14x6.5"',
          hoops: 'Triple-flange',
          snareWires: '20-strand',
        },
        usedBy: ['Dave Lombardo', 'Matt Halpern'],
        bestFor: 'Death metal, progressive metal',
        rating: 4.5,
      },
    ],
    comparison: {
      sound: 'SLP Steel delivers classic metal crack with ring. Sensitone Bronze offers warmer, more controlled articulation.',
      durability: 'Both are professional-grade. Steel is more resistant to warping under extreme tension.',
      value: 'Sensitone offers more tonal options per dollar. SLP is the classic metal choice.',
      forMetal: 'SLP for thrash and classic metal. Sensitone for modern and progressive.',
    },
    verdict: 'Tama SLP Steel for classic thrash crack. Pearl Sensitone Bronze for progressive warmth with metal edge.',
  },

  // Drum brand extended
  'sonor-vs-dw': {
    slug: 'sonor-vs-dw',
    title: 'Sonor vs DW Drums',
    metaTitle: 'Sonor SQ2 vs DW Collector\'s Series - Premium Metal Drums Compared | MetalForge',
    metaDescription: 'Compare Sonor SQ2 and DW Collector\'s drums for metal. German engineering vs American craftsmanship. The ultimate premium drum kit battle.',
    category: 'drums',
    items: [
      {
        brand: 'Sonor',
        model: 'SQ2 Heavy Beech',
        image: 'https://www.sonor.com/images/products/sq2.jpg',
        priceRange: '€5,000 - €7,000',
        pros: [
          'German precision manufacturing',
          'Heavy beech shells for power',
          'TAR mount for resonance',
          'Fully customizable',
        ],
        cons: [
          'Premium pricing',
          'Long lead time for custom orders',
        ],
        specs: {
          shells: 'Heavy Beech',
          plies: '9mm (7-ply)',
          hoops: 'Die-Cast',
          hardware: 'TAR mount',
        },
        usedBy: ['Tomas Haake', 'Danny Carey'],
        bestFor: 'Progressive metal, studio work',
        rating: 4.9,
      },
      {
        brand: 'DW',
        model: 'Collector\'s Series Maple',
        image: 'https://www.dwdrums.com/images/collectors-maple.jpg',
        priceRange: '€4,500 - €6,500',
        pros: [
          'Timbre-Matched shell selection',
          'HVX shell technology',
          'True Pitch tuning rods',
          'Wide finish options',
        ],
        cons: [
          'High price point',
          'Maple may lack attack for extreme metal',
        ],
        specs: {
          shells: 'North American Maple',
          plies: 'HVX Technology',
          hoops: 'True Hoop',
          hardware: 'STM mount',
        },
        usedBy: ['Brann Dailor', 'Navene Koperweis'],
        bestFor: 'Modern metal, fusion, djent',
        rating: 4.8,
      },
    ],
    comparison: {
      sound: 'Sonor SQ2 is powerful and articulate with German precision. DW Collector\'s is warm and musical with American character.',
      durability: 'Both are heirloom-quality instruments built to last decades.',
      value: 'At this tier, both represent pinnacle craftsmanship. Sonor edges ahead for metal-specific features.',
      forMetal: 'Sonor SQ2 for progressive and technical metal. DW for modern metal and crossover styles.',
    },
    verdict: 'Sonor SQ2 is the progressive metal standard. DW Collector\'s excels in modern metal with studio versatility.',
  },

  // Issue #345: Accessories comparisons
  'evans-vs-remo': {
    slug: 'evans-vs-remo',
    title: 'Evans vs Remo Drumheads',
    metaTitle: 'Evans vs Remo Drumheads - Metal Drumheads Compared | MetalForge',
    metaDescription: 'Compare Evans and Remo drumheads for metal. Attack, durability, tuning stability.',
    category: 'accessories',
    items: [
      { brand: 'Evans', model: 'EMAD / EC2', priceRange: '€15-50', rating: 4.7, bestFor: 'Death metal', pros: ['Level 360 Tech', 'EMAD system'], cons: ['Higher price'], specs: { material: '2-ply', coating: 'UV-cured' }, usedBy: ['Gene Hoglan', 'George Kollias'] },
      { brand: 'Remo', model: 'Pinstripe / Emperor', priceRange: '€12-45', rating: 4.6, bestFor: 'Thrash metal', pros: ['Industry standard', 'Budget-friendly'], cons: ['Coating wears'], specs: { material: '2-ply Mylar' }, usedBy: ['Lars Ulrich', 'Dave Lombardo'] },
    ],
    comparison: { sound: 'Evans: controlled. Remo: classic open tone.', forMetal: 'Evans for death, Remo for thrash.' },
    verdict: 'Evans for extreme metal precision. Remo for classic thrash.',
  },
  'vic-firth-vs-promark': {
    slug: 'vic-firth-vs-promark',
    title: 'Vic Firth vs ProMark Drumsticks',
    metaTitle: 'Vic Firth vs ProMark Sticks - Metal Drumsticks Compared | MetalForge',
    metaDescription: 'Compare Vic Firth and ProMark drumsticks for metal. Weight, durability, feel.',
    category: 'accessories',
    items: [
      { brand: 'Vic Firth', model: 'American Classic 5B', priceRange: '€10-18', rating: 4.8, bestFor: 'Heavy hitting', pros: ['Perfect Pair matching', 'Premium hickory'], cons: ['Higher price'], specs: { material: 'Hickory' }, usedBy: ['Gene Hoglan', 'Danny Carey'] },
      { brand: 'ProMark', model: 'FireGrain 5B', priceRange: '€8-16', rating: 4.6, bestFor: 'Technical playing', pros: ['FireGrain durability', 'Budget-friendly'], cons: ['Weight variance'], specs: { material: 'Hickory' }, usedBy: ['Chris Adler', 'Matt Halpern'] },
    ],
    comparison: { durability: 'ProMark FireGrain lasts longer.', forMetal: 'Both excellent.' },
    verdict: 'Vic Firth for consistency. ProMark for budget durability.',
  },
};

/**
 * Get all gear comparisons
 */
export function getAllGearComparisons() {
  return Object.values(gearComparisons);
}

/**
 * Get gear comparison by slug
 */
export function getGearComparisonBySlug(slug) {
  return gearComparisons[slug] || null;
}

/**
 * Check if a gear comparison exists
 */
export function hasGearComparison(slug) {
  return slug in gearComparisons;
}

/**
 * Get all gear comparison slugs
 */
export function getAllGearComparisonSlugs() {
  return Object.keys(gearComparisons);
}

/**
 * Get gear comparisons by category
 */
export function getGearComparisonsByCategory(category) {
  return Object.values(gearComparisons).filter(c => c.category === category);
}
