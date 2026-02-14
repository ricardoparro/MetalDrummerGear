// Gear Comparison Data - Brand vs Brand comparisons for SEO (Issue #345)
// Targeting searches like "Tama vs Pearl for metal" or "Zildjian vs Sabian cymbals"

export const COMPARISONS = [
  {
    slug: 'tama-vs-pearl',
    title: 'Tama vs Pearl Drums',
    description: 'Comparing two of the biggest names in metal drumming. Which drum brand is right for you?',
    metaTitle: 'Tama vs Pearl Drums - Which Is Best for Metal? | MetalForge',
    metaDescription: 'In-depth comparison of Tama and Pearl drums for metal drumming. Compare specs, pricing, pro users, and find which brand suits your playing style.',
    category: 'drums',
    brands: ['Tama', 'Pearl'],
    overview: {
      Tama: 'Tama is a Japanese drum manufacturer known for their innovative hardware (Iron Cobra, Speed Cobra pedals) and flagship Starclassic series. They\'ve been the choice of metal legends like Lars Ulrich, Dave Lombardo, and Mike Portnoy.',
      Pearl: 'Pearl is another Japanese giant with a massive presence in metal. Their Reference and Masters series deliver powerful projection, and the Demon Drive pedal is a favorite among speed-focused drummers. Joey Jordison and Gene Hoglan are notable Pearl endorsers.'
    },
    specs: [
      { feature: 'Shell Material', Tama: 'Maple, Birch, Walnut/Birch hybrid', Pearl: 'Maple, Birch, Maple/Birch/Mahogany hybrid' },
      { feature: 'Flagship Line', Tama: 'Starclassic Walnut/Birch', Pearl: 'Reference Pure' },
      { feature: 'Mid-Range Line', Tama: 'Superstar Classic', Pearl: 'Masters Maple Complete' },
      { feature: 'Entry Line', Tama: 'Imperialstar', Pearl: 'Export' },
      { feature: 'Mounting System', Tama: 'Star-Cast', Pearl: 'OptiMount' },
      { feature: 'Hardware Series', Tama: 'Iron Cobra, Speed Cobra', Pearl: 'Demon Drive, Eliminator' },
      { feature: 'Country of Origin', Tama: 'Japan (pro), China (entry)', Pearl: 'Japan (pro), Taiwan/China (entry)' }
    ],
    priceComparison: [
      { tier: 'Entry Level', Tama: '€600-800', Pearl: '€550-750' },
      { tier: 'Mid-Range', Tama: '€1,500-2,500', Pearl: '€1,400-2,200' },
      { tier: 'Professional', Tama: '€3,500-5,000', Pearl: '€3,200-4,500' },
      { tier: 'Flagship', Tama: '€4,500-6,500', Pearl: '€4,000-6,000' }
    ],
    prosAndCons: {
      Tama: {
        pros: [
          'Industry-leading hardware innovation',
          'Excellent shell resonance and attack',
          'Strong metal heritage and artist roster',
          'Wide range of custom options'
        ],
        cons: [
          'Slightly higher pricing at entry level',
          'Heavier hardware can be cumbersome',
          'Limited color options on some lines'
        ]
      },
      Pearl: {
        pros: [
          'Excellent value across all price points',
          'Innovative shell construction technology',
          'Great projection for live metal',
          'Extensive product range'
        ],
        cons: [
          'Some find tone less warm than Tama',
          'Reference line availability can be limited',
          'Fewer signature snare options'
        ]
      }
    },
    drummersByBrand: {
      Tama: [1, 4, 12, 13, 15], // Lars, Lombardo, Charlie Benante, Portnoy, Mario Duplantier
      Pearl: [2, 3, 6, 8, 9, 18] // Joey Jordison, Gene Hoglan, George Kollias, Ray Luzier, John Otto, Matt Halpern
    },
    verdict: {
      forMetal: 'Both are excellent choices. Tama excels in attack and hardware innovation, while Pearl offers great value and projection. For extreme speed metal, Pearl\'s lighter hardware may be preferred. For tonal warmth and versatility, Tama edges ahead.',
      recommendation: 'If you value hardware innovation and warm tone: Choose Tama. If you want maximum projection and value: Choose Pearl.'
    },
    relatedComparisons: ['zildjian-vs-sabian', 'iron-cobra-vs-demon-drive']
  },
  {
    slug: 'zildjian-vs-sabian',
    title: 'Zildjian vs Sabian Cymbals',
    description: 'The cymbal rivalry that split a family. Which legendary brand wins for metal?',
    metaTitle: 'Zildjian vs Sabian Cymbals - Best for Metal Drumming | MetalForge',
    metaDescription: 'Comprehensive Zildjian vs Sabian comparison for metal drummers. Compare A Custom vs HHX, pricing, sound characteristics, and which metal pros use each brand.',
    category: 'cymbals',
    brands: ['Zildjian', 'Sabian'],
    overview: {
      Zildjian: 'Zildjian is the oldest cymbal company in the world, founded in Constantinople in 1623. Their A Custom series defined the sound of modern metal, with bright, cutting tones that slice through heavy guitars. Used by Lars Ulrich, George Kollias, and countless metal legends.',
      Sabian: 'Sabian was founded in 1981 by Robert Zildjian (yes, from that family). They\'ve carved out their own identity with darker, more complex sounds in their HHX and AAX lines. Gene Hoglan, Vinnie Paul, and Matt Halpern are notable Sabian artists.'
    },
    specs: [
      { feature: 'Founded', Zildjian: '1623', Sabian: '1981' },
      { feature: 'Metal Series', Zildjian: 'A Custom, Z Custom', Sabian: 'HHX, AAX' },
      { feature: 'Alloy', Zildjian: 'B20 Bronze', Sabian: 'B20 Bronze' },
      { feature: 'Manufacturing', Zildjian: 'USA (pro), Turkey (sheet)', Sabian: 'Canada' },
      { feature: 'Tonal Character', Zildjian: 'Bright, cutting, clear', Sabian: 'Dark, complex, warm' },
      { feature: 'Popular Crash', Zildjian: 'A Custom 18" Medium', Sabian: 'HHX Evolution 18"' },
      { feature: 'Popular Ride', Zildjian: 'A Custom 20" Ride', Sabian: 'HHX 21" Raw Bell Dry' }
    ],
    priceComparison: [
      { tier: 'Entry (Sheet Bronze)', Zildjian: '€200-400', Sabian: '€180-350' },
      { tier: 'Intermediate', Zildjian: '€350-600', Sabian: '€300-550' },
      { tier: 'Professional', Zildjian: '€500-900', Sabian: '€450-850' },
      { tier: 'Complete Setup (4pc)', Zildjian: '€1,800-2,500', Sabian: '€1,600-2,300' }
    ],
    prosAndCons: {
      Zildjian: {
        pros: [
          'Unmatched brand heritage and history',
          'Bright, cutting tone that slices through mix',
          'Excellent consistency in manufacturing',
          'Wide artist roster and variety'
        ],
        cons: [
          'Can be harsh in quieter settings',
          'Higher price point overall',
          'Some lines can sound generic'
        ]
      },
      Sabian: {
        pros: [
          'More complex, musical overtones',
          'Excellent value for quality',
          'Great for recording due to warmth',
          'Strong innovation in recent years'
        ],
        cons: [
          'Less cutting power in heavy live settings',
          'Smaller brand recognition',
          'Some inconsistency in lower lines'
        ]
      }
    },
    drummersByBrand: {
      Zildjian: [1, 4, 6, 8, 10, 12], // Lars, Lombardo, George Kollias, Ray Luzier, Jay Weinberg, Charlie Benante
      Sabian: [3, 5, 11, 13, 26] // Gene Hoglan, Tomas Haake, Vinnie Paul, Portnoy, Shannon Larkin
    },
    verdict: {
      forMetal: 'Zildjian delivers raw power and cut, ideal for thrash and traditional metal. Sabian excels in progressive and technical metal where complex overtones enhance the music. Both are used at the highest level.',
      recommendation: 'For cutting through walls of distortion: Zildjian. For complex, musical cymbal work: Sabian.'
    },
    relatedComparisons: ['tama-vs-pearl', 'meinl-vs-paiste']
  },
  {
    slug: 'iron-cobra-vs-demon-drive',
    title: 'Tama Iron Cobra vs Pearl Demon Drive',
    description: 'The ultimate double bass pedal showdown. Speed, feel, and reliability compared.',
    metaTitle: 'Tama Iron Cobra vs Pearl Demon Drive - Best Metal Bass Pedal | MetalForge',
    metaDescription: 'Detailed comparison of Tama Iron Cobra 900 and Pearl Demon Drive double bass pedals. Speed test, build quality, and which metal drummers prefer.',
    category: 'hardware',
    brands: ['Tama', 'Pearl'],
    overview: {
      'Tama': 'The Tama Iron Cobra has been the industry standard for metal double bass since the 1990s. The Power Glide cam delivers a linear, consistent feel that rewards technique. Used by Lars Ulrich, Charlie Benante, and countless metal drummers.',
      'Pearl': 'The Pearl Demon Drive raised the bar with its NiNjA bearing technology and interchangeable cams. It offers unmatched customization and silky-smooth action. Preferred by Joey Jordison, Gene Hoglan, and many extreme metal drummers.'
    },
    specs: [
      { feature: 'Cam Type', 'Tama': 'Power Glide (rolling)', 'Pearl': 'Interchangeable (Direct/Offset)' },
      { feature: 'Bearings', 'Tama': 'Speedo-Ring', 'Pearl': 'NiNjA Bearings' },
      { feature: 'Footboard', 'Tama': 'Speed Cobra style', 'Pearl': 'PowerShifter Longboard' },
      { feature: 'Beater', 'Tama': 'Dual surface (felt/plastic)', 'Pearl': 'Quad Beater (switchable)' },
      { feature: 'Spring Adjustment', 'Tama': 'Dial tension', 'Pearl': 'Click-Lock tension' },
      { feature: 'Case', 'Tama': 'Hard case included', 'Pearl': 'Hard case included' },
      { feature: 'Weight', 'Tama': '~5.8 kg', 'Pearl': '~6.2 kg' }
    ],
    priceComparison: [
      { tier: 'Single Pedal', 'Tama': '€280-320', 'Pearl': '€350-400' },
      { tier: 'Double Pedal', 'Tama': '€450-520', 'Pearl': '€550-650' },
      { tier: 'Direct Drive Version', 'Tama': 'N/A (Speed Cobra)', 'Pearl': '€650-750' }
    ],
    prosAndCons: {
      'Tama': {
        pros: [
          'Proven reliability over decades',
          'Excellent value for performance',
          'Linear feel rewards technique',
          'Easy to adjust and maintain'
        ],
        cons: [
          'Fixed cam design (no swapping)',
          'Heavier than some competitors',
          'Fewer customization options'
        ]
      },
      'Pearl': {
        pros: [
          'NiNjA bearings for ultimate smoothness',
          'Interchangeable cams for different feels',
          'Click-lock system for precise tension',
          'Highly customizable'
        ],
        cons: [
          'Higher price point',
          'More complex maintenance',
          'Heavier than Iron Cobra'
        ]
      }
    },
    drummersByBrand: {
      'Tama': [1, 12, 7, 15, 16], // Lars, Charlie Benante, Eloy Casagrande, Mario Duplantier, Brann Dailor
      'Pearl': [2, 3, 4, 6, 18, 19] // Joey Jordison, Gene Hoglan, Lombardo, George Kollias, Matt Halpern, Inferno
    },
    verdict: {
      forMetal: 'Both are top-tier choices. Iron Cobra offers reliability and value, while Demon Drive provides ultimate customization. For raw speed and budget-consciousness: Iron Cobra. For studio versatility and feel options: Demon Drive.',
      recommendation: 'Thrash/traditional metal: Iron Cobra. Technical/death metal: Demon Drive (direct drive cam).'
    },
    relatedComparisons: ['tama-vs-pearl', 'zildjian-vs-sabian']
  },
  {
    slug: 'evans-vs-remo',
    title: 'Evans vs Remo Drumheads',
    description: 'The drumhead debate: durability vs tone. Which brand rules metal?',
    metaTitle: 'Evans vs Remo Drumheads - Best for Metal Drums | MetalForge',
    metaDescription: 'Evans vs Remo drumhead comparison for metal drumming. Compare durability, tone, popular models like Hydraulic vs Pinstripe, and which pros prefer.',
    category: 'heads',
    brands: ['Evans', 'Remo'],
    overview: {
      Evans: 'Evans drumheads feature Level 360 Technology for even seating and tuning stability. Their Hydraulic series is legendary for deadening overtones and delivering a punchy, focused attack perfect for metal. UV1 and EC2 are also popular choices.',
      Remo: 'Remo is the original drumhead innovator, with the Pinstripe and Emperor series dominating studios and stages for decades. Their Controlled Sound dots deliver focused attack, and the Powerstroke series offers excellent bass drum response.'
    },
    specs: [
      { feature: 'Founded', Evans: '1956', Remo: '1957' },
      { feature: 'Metal Snare Head', Evans: 'Hydraulic/HD Dry', Remo: 'Controlled Sound/Powerstroke' },
      { feature: 'Metal Tom Head', Evans: 'EC2/G2', Remo: 'Emperor/Pinstripe' },
      { feature: 'Kick Head', Evans: 'EMAD/EQ3', Remo: 'Powerstroke 3' },
      { feature: 'Collar Technology', Evans: 'Level 360', Remo: 'Standard' },
      { feature: 'Coating', Evans: 'UV1 (durable)', Remo: 'Coated (various)' },
      { feature: 'Price Range', Evans: '€15-40 per head', Remo: '€12-35 per head' }
    ],
    priceComparison: [
      { tier: 'Single Snare Head', Evans: '€20-35', Remo: '€18-30' },
      { tier: 'Single Tom Head', Evans: '€18-28', Remo: '€15-25' },
      { tier: 'Kick Head', Evans: '€35-55', Remo: '€30-50' },
      { tier: 'Full Kit Set', Evans: '€120-180', Remo: '€100-160' }
    ],
    prosAndCons: {
      Evans: {
        pros: [
          'Level 360 for perfect seating',
          'Hydraulic series perfect for metal',
          'UV1 coating is extremely durable',
          'Consistent manufacturing'
        ],
        cons: [
          'Slightly higher cost',
          'Some find tone too controlled',
          'Fewer options at entry level'
        ]
      },
      Remo: {
        pros: [
          'Industry standard sound',
          'Wide variety of options',
          'Great value entry-level heads',
          'Classic tone many studios expect'
        ],
        cons: [
          'Standard collars can seat unevenly',
          'Coating durability varies',
          'Some inconsistency in batches'
        ]
      }
    },
    drummersByBrand: {
      Evans: [3, 5, 15, 16, 18], // Gene Hoglan, Tomas Haake, Mario Duplantier, Brann Dailor, Matt Halpern
      Remo: [1, 2, 4, 6, 13] // Lars, Joey Jordison, Lombardo, George Kollias, Portnoy
    },
    verdict: {
      forMetal: 'Evans Hydraulics are unbeatable for extreme metal\'s punchy, controlled sound. Remo offers more tonal variety and is preferred in thrash for its natural sustain. Both are used at the professional level.',
      recommendation: 'Death/tech metal (controlled, punchy): Evans. Thrash/classic metal (sustain, openness): Remo.'
    },
    relatedComparisons: ['tama-vs-pearl', 'zildjian-vs-sabian']
  },
  {
    slug: 'meinl-vs-paiste',
    title: 'Meinl vs Paiste Cymbals',
    description: 'European cymbal craftsmanship compared. Which brand delivers for modern metal?',
    metaTitle: 'Meinl vs Paiste Cymbals - Modern Metal Cymbal Guide | MetalForge',
    metaDescription: 'Meinl vs Paiste comparison for metal drummers. Byzance vs RUDE series, pricing, sound profiles, and which progressive and extreme metal drummers prefer.',
    category: 'cymbals',
    brands: ['Meinl', 'Paiste'],
    overview: {
      Meinl: 'Meinl has risen dramatically in the metal world with their hand-hammered Byzance series. The dark, complex tones appeal to progressive and modern metal drummers. Mario Duplantier, Matt Halpern, and Brann Dailor are notable Meinl artists.',
      Paiste: 'Paiste\'s RUDE series was designed specifically for heavy hitters. Made in Switzerland, these CuSn8 bronze cymbals deliver cutting power that slices through walls of guitar. Dave Lombardo and Shannon Lucas built their sound on Paiste.'
    },
    specs: [
      { feature: 'Founded', Meinl: '1951', Paiste: '1906' },
      { feature: 'Metal Series', Meinl: 'Byzance, Pure Alloy', Paiste: 'RUDE, 2002' },
      { feature: 'Alloy (Pro)', Meinl: 'B20 Bronze', Paiste: 'CuSn8 (RUDE), B20 (Signature)' },
      { feature: 'Manufacturing', Meinl: 'Germany/Turkey', Paiste: 'Switzerland/Germany' },
      { feature: 'Tonal Character', Meinl: 'Dark, complex, trashy', Paiste: 'Bright, cutting, aggressive' },
      { feature: 'Popular Line', Meinl: 'Byzance Extra Dry', Paiste: 'RUDE Power' },
      { feature: 'Finish Options', Meinl: 'Brilliant, Dark, Dual', Paiste: 'Color (RUDE), Natural' }
    ],
    priceComparison: [
      { tier: 'Entry Series', Meinl: '€150-300', Paiste: '€180-350' },
      { tier: 'Intermediate', Meinl: '€280-500', Paiste: '€300-550' },
      { tier: 'Professional', Meinl: '€450-850', Paiste: '€480-900' },
      { tier: 'Complete Setup', Meinl: '€1,500-2,400', Paiste: '€1,700-2,600' }
    ],
    prosAndCons: {
      Meinl: {
        pros: [
          'Incredible value at pro level',
          'Dark, complex overtones',
          'Hand-hammered quality',
          'Modern sound perfect for prog metal'
        ],
        cons: [
          'Can be too dark for thrash',
          'Some series inconsistent',
          'Not as established in metal'
        ]
      },
      Paiste: {
        pros: [
          'Unmatched cutting power (RUDE)',
          'Swiss precision manufacturing',
          'Built specifically for heavy hitting',
          'Distinctive visual appeal'
        ],
        cons: [
          'Higher price point',
          'RUDE series can be harsh',
          'Limited dark options'
        ]
      }
    },
    drummersByBrand: {
      Meinl: [7, 15, 16, 17, 18, 19], // Eloy Casagrande, Mario Duplantier, Brann Dailor, Chris Adler, Matt Halpern, Inferno
      Paiste: [4, 14, 3, 2] // Dave Lombardo, Danny Carey, Gene Hoglan, Joey Jordison
    },
    verdict: {
      forMetal: 'Meinl Byzance excels in progressive, djent, and modern metal with its complex dark tones. Paiste RUDE dominates thrash and extreme metal with unmatched cutting power. Both represent the pinnacle of European cymbal craftsmanship.',
      recommendation: 'Progressive/djent/modern metal: Meinl Byzance. Thrash/extreme metal: Paiste RUDE.'
    },
    relatedComparisons: ['zildjian-vs-sabian', 'tama-vs-pearl']
  }
];

// Get all comparisons
export function getAllComparisons() {
  return COMPARISONS;
}

// Get comparison by slug
export function getComparisonBySlug(slug) {
  return COMPARISONS.find(c => c.slug === slug) || null;
}

// Get comparisons by category
export function getComparisonsByCategory(category) {
  return COMPARISONS.filter(c => c.category === category);
}

// Get comparison slugs for sitemap
export function getComparisonSlugs() {
  return COMPARISONS.map(c => c.slug);
}

// Check if a comparison exists
export function comparisonExists(slug) {
  return COMPARISONS.some(c => c.slug === slug);
}

export default COMPARISONS;
