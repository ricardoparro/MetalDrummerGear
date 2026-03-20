/**
 * Signature Gear Spotlight Data Module
 * Issue #739 - Dedicated pages for iconic signature gear pieces
 * 
 * Contains detailed information about legendary signature gear items
 * including stories, specs, media, and affiliate links.
 */

// ==========================================
// SIGNATURE GEAR DATABASE
// ==========================================

export const SIGNATURE_GEAR = {
  // ==========================================
  // #1 PRIORITY: Joey Jordison's Pearl Signature Snare
  // ==========================================
  'joey-jordison-pearl-signature-snare': {
    slug: 'joey-jordison-pearl-signature-snare',
    name: 'Pearl Joey Jordison Signature Snare',
    fullName: 'Pearl Joey Jordison Signature Snare 13x6.5"',
    model: 'Pearl JJ1365N',
    drummerId: 2,
    drummerName: 'Joey Jordison',
    drummerSlug: 'joey-jordison',
    brand: 'Pearl',
    category: 'snare',
    gearType: 'Snare Drum',
    
    // Hero Section
    hero: {
      tagline: 'The Sound That Defined Nu-Metal',
      subtitle: 'The aggressive, cutting snare that powered Slipknot\'s most iconic albums',
      heroImage: '/images/gear/joey-jordison-snare-hero.webp',
      badgeText: 'Signature Series',
    },
    
    // Story Section
    story: {
      title: 'A Legend\'s Weapon of Choice',
      content: `When Joey Jordison joined forces with Pearl Drums in 1999, the goal was clear: create a snare drum as aggressive and uncompromising as Slipknot's music itself. The result was the Pearl Joey Jordison Signature Snare—a 13x6.5" weapon that would define the sound of nu-metal and extreme drumming for a generation.

The development process was intense. Joey worked closely with Pearl's engineers to achieve a specific sound: a snare that could cut through nine musicians playing at maximum intensity while maintaining the crack and body needed for both blast beats and groove-heavy passages. The smaller 13" diameter was unconventional for metal at the time, but it proved to be the secret weapon.

"I wanted something that sounded like a gunshot," Joey explained in a 2004 Modern Drummer interview. "Not warm and pretty—I wanted pure aggression. The 13-inch size gives me that tight, focused crack that cuts through everything."

The Iowa Sessions (2001):
Joey recorded the entire Iowa album with this snare, creating what many consider the most intense drum recording in metal history. The snare's cutting attack punches through the album's dense, down-tuned guitar walls on tracks like "People = Shit," "Disasterpieces," and "The Heretic Anthem."

Production engineer Ross Robinson noted: "That snare was perfect for what we were trying to achieve. It had this almost violent quality—like it was attacking you. Most snares get lost in a mix that heavy, but Joey's cut through like nothing else."

Legacy:
The Pearl Joey Jordison Signature Snare became one of the best-selling signature drums in metal history. Its influence extended beyond Slipknot fans to death metal, hardcore, and industrial drummers seeking that same aggressive bite. Even after Joey's passing in 2021, the snare remains a favorite among metal drummers worldwide.`,
      images: [
        { src: '/images/gear/joey-jordison-snare-iowa.webp', alt: 'Joey Jordison with snare during Iowa sessions', caption: 'Iowa recording sessions, 2001' },
        { src: '/images/gear/joey-jordison-live-2002.webp', alt: 'Joey Jordison live performance', caption: 'Disasterpieces tour, 2002' },
      ],
    },
    
    // Specifications Section
    specs: {
      title: 'Technical Specifications',
      dimensions: {
        diameter: '13"',
        depth: '6.5"',
        shell: '6-ply maple with reinforcement rings',
        finish: 'Black Powder Coat / Chrome Hardware',
      },
      features: [
        {
          name: 'Shell Construction',
          value: '6-ply All Maple',
          description: 'Premium maple shell provides warm fundamental with excellent projection',
        },
        {
          name: 'Diameter',
          value: '13 inches',
          description: 'Smaller diameter for tighter, more focused attack',
        },
        {
          name: 'Depth',
          value: '6.5 inches',
          description: 'Standard depth for versatility and body',
        },
        {
          name: 'Bearing Edge',
          value: '45-degree',
          description: 'Sharp edge for maximum head-to-shell contact and attack',
        },
        {
          name: 'Snare Wires',
          value: '20-strand steel',
          description: 'Sensitive response for ghost notes and aggressive crack for rimshots',
        },
        {
          name: 'Lugs',
          value: '8 Bridge Lugs',
          description: 'Low-mass design for maximum shell resonance',
        },
        {
          name: 'Strainer',
          value: 'Pearl SR-150 Gladiator',
          description: 'Quick-release mechanism with precise tension adjustment',
        },
        {
          name: 'Weight',
          value: 'Approximately 11 lbs (5 kg)',
          description: 'Substantial weight for stability and tone',
        },
      ],
      tuningTips: [
        'Joey tuned the batter head medium-tight for maximum crack and rebound',
        'Resonant head should be slightly tighter than batter for snare sensitivity',
        'Use moon gels or tape to control overtones for recording',
        'For the authentic Iowa sound, crank the snare wires tight',
      ],
    },
    
    // Sound Section with YouTube embeds
    sound: {
      title: 'Hear It In Action',
      description: 'The Pearl Joey Jordison Signature Snare defined the sound of Slipknot\'s most aggressive era. Listen to these iconic tracks to hear its cutting attack.',
      videos: [
        {
          youtubeId: 'tUibKh0Z--c',
          title: 'Disasterpieces Drum Solo - Joey Jordison',
          description: 'Joey\'s legendary drum solo showcasing the snare\'s full range',
          year: 2002,
        },
        {
          youtubeId: 'zRS9uKs3Rlk',
          title: 'People = Shit - Drum Cam (London 2002)',
          description: 'Raw drum cam footage demonstrating the snare\'s cutting attack',
          year: 2002,
        },
        {
          youtubeId: 'RdXMcj7xv20',
          title: 'Joey Jordison Drum Cam Compilation',
          description: 'Multiple songs featuring the signature snare sound',
          year: 2000,
        },
      ],
      featuredTracks: [
        { song: 'People = Shit', album: 'Iowa (2001)', note: 'The opening snare hits define the album' },
        { song: 'Disasterpieces', album: 'Iowa (2001)', note: 'Blast beats with crystal-clear snare articulation' },
        { song: 'The Heretic Anthem', album: 'Iowa (2001)', note: 'Aggressive groove showcasing the snare\'s cut' },
        { song: 'Duality', album: 'Vol. 3 (2004)', note: 'Iconic rimshot pattern on intro and verse' },
      ],
    },
    
    // Affiliate CTAs
    affiliate: {
      title: 'Get This Gear',
      description: 'Ready to get that legendary Jordison crack? Here\'s where to find the Pearl Joey Jordison Signature Snare.',
      currentPrice: {
        range: '$400-550',
        note: 'Prices vary by finish and availability',
      },
      alternatives: [
        {
          name: 'Pearl Sensitone Heritage Alloy 13x6.5"',
          price: '$299-399',
          reason: 'Similar size, aggressive attack, more affordable',
        },
        {
          name: 'Pearl Masters Maple Complete 13x6.5"',
          price: '$450-550',
          reason: 'Same shell size, professional quality',
        },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
        { name: 'Guitar Center', url: 'https://www.guitarcenter.com', logo: '/images/retailers/guitarcenter.svg' },
      ],
      usedMarket: {
        note: 'Original production models are highly collectible',
        priceRange: '$350-500',
        tips: 'Look for models with original Pearl lugs and strainer. Check for dents in the bearing edges.',
      },
    },
    
    // Used On (albums/tours)
    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        {
          title: 'Iowa',
          artist: 'Slipknot',
          year: 2001,
          cover: '/images/albums/iowa.webp',
          note: 'The definitive Joey Jordison drum sound',
        },
        {
          title: 'Vol. 3: (The Subliminal Verses)',
          artist: 'Slipknot',
          year: 2004,
          cover: '/images/albums/vol3.webp',
          note: 'More refined but still aggressive',
        },
        {
          title: 'All Hope Is Gone',
          artist: 'Slipknot',
          year: 2008,
          cover: '/images/albums/all-hope-is-gone.webp',
          note: 'Grammy-winning drum performances',
        },
        {
          title: 'Beyond the Valley of the Murderdolls',
          artist: 'Murderdolls',
          year: 2002,
          cover: '/images/albums/murderdolls.webp',
          note: 'Joey\'s side project with the same snare',
        },
      ],
      tours: [
        'Tattoo the Earth Festival (2000)',
        'Iowa World Tour (2001-2002)',
        'Disasterpieces Tour (2002)',
        'Subliminal Verses World Tour (2004-2005)',
        'All Hope Is Gone World Tour (2008-2009)',
      ],
    },
    
    // Similar Gear Section
    similarGear: {
      title: 'Similar Gear You Might Like',
      items: [
        {
          name: 'Pearl Sensitone Heritage Alloy 13x6.5"',
          slug: 'pearl-sensitone-heritage-alloy',
          image: '/images/gear/pearl-sensitone.webp',
          price: '$299-399',
          reason: 'Similar aggressive attack, great alternative',
        },
        {
          name: 'Tama S.L.P. G-Maple 14x6"',
          slug: 'tama-slp-g-maple',
          image: '/images/gear/tama-slp-g-maple.webp',
          price: '$400-500',
          reason: 'Maple attack with diagonal grain projection',
        },
        {
          name: 'DW Performance Series 13x6.5"',
          slug: 'dw-performance-series-snare',
          image: '/images/gear/dw-performance-snare.webp',
          price: '$449-549',
          reason: 'Same size, premium maple construction',
        },
      ],
      drummerAlternatives: [
        {
          drummer: 'Eloy Casagrande',
          drummerSlug: 'eloy-casagrande',
          snare: 'Tama S.L.P. Sonic Steel 14x6"',
          note: 'Current Slipknot drummer\'s choice',
        },
        {
          drummer: 'Jay Weinberg',
          drummerSlug: 'jay-weinberg',
          snare: 'Pearl Reference 14x5"',
          note: 'Slipknot\'s second drummer (2014-2023)',
        },
      ],
    },
    
    // Discussion/Community Section
    discussion: {
      title: 'Join the Discussion',
      topics: [
        'What\'s your favorite Joey Jordison snare moment?',
        'How do you tune your signature snare?',
        'Share your gear setup inspired by Joey',
      ],
      relatedDrummers: [2, 21, 7], // Joey, Jay Weinberg, Eloy
    },
    
    // SEO Data
    seo: {
      title: 'Pearl Joey Jordison Signature Snare 13x6.5" - Complete Guide | MetalForge',
      description: 'Discover the Pearl Joey Jordison Signature Snare that defined Slipknot\'s sound. Full specs, story, videos, and buying guide for the legendary 13x6.5" maple snare.',
      keywords: [
        'joey jordison snare',
        'pearl joey jordison signature',
        'slipknot snare drum',
        'joey jordison drum gear',
        'iowa snare drum',
        'pearl jj1365n',
        '13 inch snare drum',
        'nu metal snare',
      ],
      ogImage: '/images/gear/joey-jordison-snare-og.webp',
    },
    
    // Schema.org Data
    schema: {
      type: 'Product',
      brand: 'Pearl',
      model: 'Joey Jordison Signature Snare JJ1365N',
      category: 'Musical Instruments > Drums > Snare Drums',
    },
    
    // Metadata
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: 'MetalForge Editorial',
    status: 'published',
    priority: 1, // Priority in the #739 issue list
  },
  
  // ==========================================
  // #2 PRIORITY: Lars Ulrich's 20" Paiste Rude China
  // ==========================================
  'lars-ulrich-paiste-rude-china': {
    slug: 'lars-ulrich-paiste-rude-china',
    name: 'Paiste 20" Rude China',
    fullName: 'Paiste 20" RUDE Wild China',
    model: 'Paiste RUDE 20" Wild China',
    drummerId: 1,
    drummerName: 'Lars Ulrich',
    drummerSlug: 'lars-ulrich',
    brand: 'Paiste',
    category: 'cymbal',
    gearType: 'China Cymbal',
    
    hero: {
      tagline: 'The Thrash Metal China',
      subtitle: 'The aggressive, trashy china that defined Metallica\'s cymbal sound',
      heroImage: '/images/gear/lars-paiste-china-hero.webp',
      badgeText: 'Legendary',
    },
    
    story: {
      title: 'The Sound of Thrash',
      content: `Lars Ulrich's use of the Paiste RUDE China cymbal helped define the sound of thrash metal in the 1980s. Before Lars, china cymbals were rarely used in heavy music. After the Black Album era, they became essential to the metal drummer's arsenal.

The RUDE series was designed specifically for heavy hitters. The "Wild" designation indicates an unlathed bell and aggressive, cutting overtones that slice through any mix. At 20 inches, this china provides the perfect balance of explosive attack and sustain.

Lars discovered the RUDE series during the recording of "...And Justice for All" (1988) and never looked back. The china's trashy, aggressive quality became a signature element of Metallica's live sound, punctuating riffs and marking transitions with unmistakable authority.

Recording engineer Bob Rock noted during the Black Album sessions: "That china cut through everything. Even in the densest parts, you knew exactly when Lars hit it. It became as recognizable as James's rhythm tone."`,
      images: [],
    },
    
    specs: {
      title: 'Technical Specifications',
      dimensions: {
        diameter: '20"',
        weight: 'Heavy',
        alloy: 'CuSn8 Bronze',
        finish: 'Unlathed Bell, Lathed Bow',
      },
      features: [
        { name: 'Diameter', value: '20 inches', description: 'Full-size china for maximum projection' },
        { name: 'Weight', value: 'Heavy', description: 'Designed for powerful, aggressive playing' },
        { name: 'Bell', value: 'Unlathed', description: 'Raw bell for cutting attack' },
        { name: 'Edge', value: 'Upturned', description: 'Traditional china edge for trashy decay' },
        { name: 'Alloy', value: 'CuSn8 Bronze', description: 'Paiste\'s signature bronze formula' },
      ],
      tuningTips: [
        'Mount at a slight angle for optimal stick attack',
        'Heavier felts will control wobble and sustain',
        'Position for easy reach during fill transitions',
      ],
    },
    
    sound: {
      title: 'Hear It In Action',
      description: 'The RUDE China\'s trashy attack cuts through Metallica\'s heaviest moments.',
      videos: [
        { youtubeId: 'A96QtqEpqUA', title: 'Sad But True - Drum Cam', description: 'China accents throughout', year: 2023 },
        { youtubeId: 'Z_qLd2uj21w', title: 'For Whom The Bell Tolls - Lars Angle', description: 'Classic Metallica drum footage', year: 1997 },
      ],
      featuredTracks: [
        { song: 'Enter Sandman', album: 'Metallica (1991)', note: 'Iconic china crashes in the verse' },
        { song: 'Sad But True', album: 'Metallica (1991)', note: 'Aggressive accents throughout' },
        { song: 'One', album: '...And Justice for All (1988)', note: 'Dramatic china hits in the heavy section' },
      ],
    },
    
    affiliate: {
      title: 'Get This Gear',
      description: 'The Paiste RUDE 20" Wild China remains in production and available worldwide.',
      currentPrice: { range: '$350-450', note: 'Price varies by retailer' },
      alternatives: [
        { name: 'Paiste 2002 20" China', price: '$300-350', reason: 'Slightly warmer alternative' },
        { name: 'Sabian AAX 20" Chinese', price: '$280-350', reason: 'Similar aggression, different voice' },
      ],
      retailers: [
        { name: 'Sweetwater', url: 'https://www.sweetwater.com', logo: '/images/retailers/sweetwater.svg' },
        { name: 'Thomann', url: 'https://www.thomann.de', logo: '/images/retailers/thomann.svg' },
      ],
    },
    
    usedOn: {
      title: 'Featured On These Recordings',
      albums: [
        { title: 'Metallica (Black Album)', artist: 'Metallica', year: 1991, cover: '/images/albums/black-album.webp', note: 'Peak Lars china sound' },
        { title: '...And Justice for All', artist: 'Metallica', year: 1988, cover: '/images/albums/justice.webp', note: 'First album with RUDE china' },
      ],
      tours: ['Black Album Tour (1991-1993)', 'Reload Tour (1997-1999)', 'Death Magnetic Tour (2008-2010)'],
    },
    
    similarGear: {
      title: 'Similar Gear',
      items: [
        { name: 'Paiste 2002 20" China', slug: 'paiste-2002-china', image: '/images/gear/paiste-2002-china.webp', price: '$300-350', reason: 'Classic Paiste china tone' },
        { name: 'Zildjian Oriental 20" China Trash', slug: 'zildjian-oriental-china', image: '/images/gear/zildjian-oriental-china.webp', price: '$280-350', reason: 'Alternative metal china' },
      ],
      drummerAlternatives: [],
    },
    
    discussion: {
      title: 'Join the Discussion',
      topics: ['Best china placement tips', 'RUDE vs 2002 - which do you prefer?'],
      relatedDrummers: [1, 4, 9],
    },
    
    seo: {
      title: 'Paiste RUDE 20" Wild China - Lars Ulrich\'s Signature Sound | MetalForge',
      description: 'Explore the Paiste RUDE 20" Wild China cymbal that defined Metallica\'s cymbal sound. Full specs, videos, and buying guide.',
      keywords: ['lars ulrich china', 'paiste rude china', 'metallica cymbal', 'thrash metal china'],
      ogImage: '/images/gear/lars-china-og.webp',
    },
    
    schema: {
      type: 'Product',
      brand: 'Paiste',
      model: 'RUDE 20" Wild China',
      category: 'Musical Instruments > Cymbals > China Cymbals',
    },
    
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: 'MetalForge Editorial',
    status: 'draft',
    priority: 2,
  },
  
  // Placeholder for #3-5 priorities - to be implemented after prototype validation
  // #3: Danny Carey's Paiste Giant Beat Gongs
  // #4: Mario Duplantier's Tama Starphonic Bronze
  // #5: Gene Hoglan's Pearl Drums
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Get all signature gear items
 * @returns {Array} All signature gear items
 */
export function getAllSignatureGear() {
  return Object.values(SIGNATURE_GEAR).filter(item => item.status === 'published');
}

/**
 * Get signature gear by slug
 * @param {string} slug - The gear slug
 * @returns {Object|null} The gear item or null
 */
export function getSignatureGearBySlug(slug) {
  return SIGNATURE_GEAR[slug] || null;
}

/**
 * Get signature gear for a specific drummer
 * @param {number} drummerId - The drummer's ID
 * @returns {Array} Array of signature gear items for the drummer
 */
export function getSignatureGearForDrummer(drummerId) {
  return Object.values(SIGNATURE_GEAR).filter(item => item.drummerId === drummerId);
}

/**
 * Get signature gear by drummer slug
 * @param {string} drummerSlug - The drummer's URL slug
 * @returns {Array} Array of signature gear items
 */
export function getSignatureGearByDrummerSlug(drummerSlug) {
  return Object.values(SIGNATURE_GEAR).filter(item => item.drummerSlug === drummerSlug);
}

/**
 * Check if a slug is a valid signature gear page
 * @param {string} slug - The gear slug to check
 * @returns {boolean}
 */
export function isSignatureGearSlug(slug) {
  return slug in SIGNATURE_GEAR;
}

/**
 * Get all signature gear slugs
 * @returns {Array} Array of all gear slugs
 */
export function getAllSignatureGearSlugs() {
  return Object.keys(SIGNATURE_GEAR);
}

/**
 * Get gear items by category
 * @param {string} category - 'snare', 'cymbal', 'kit', etc.
 * @returns {Array}
 */
export function getSignatureGearByCategory(category) {
  return Object.values(SIGNATURE_GEAR).filter(item => item.category === category);
}

/**
 * Get featured/published signature gear for homepage or listing
 * @param {number} limit - Maximum items to return
 * @returns {Array}
 */
export function getFeaturedSignatureGear(limit = 5) {
  return Object.values(SIGNATURE_GEAR)
    .filter(item => item.status === 'published')
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}

/**
 * Generate schema.org Product markup for gear
 * @param {Object} gear - Signature gear item
 * @param {Object} drummer - Drummer data
 * @returns {Object} Schema.org JSON-LD object
 */
export function generateSignatureGearSchema(gear, drummer) {
  const baseUrl = 'https://metalforge.io';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': gear.fullName,
    'brand': {
      '@type': 'Brand',
      'name': gear.brand,
    },
    'description': gear.seo.description,
    'image': `${baseUrl}${gear.hero.heroImage}`,
    'url': `${baseUrl}/drummers/${gear.drummerSlug}/signature/${gear.slug}`,
    'category': gear.schema.category,
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'USD',
      'lowPrice': gear.affiliate.currentPrice.range.split('-')[0].replace(/[^0-9]/g, ''),
      'highPrice': gear.affiliate.currentPrice.range.split('-')[1]?.replace(/[^0-9]/g, '') || gear.affiliate.currentPrice.range.split('-')[0].replace(/[^0-9]/g, ''),
      'offerCount': gear.affiliate.retailers.length,
    },
    'review': {
      '@type': 'Review',
      'author': {
        '@type': 'Organization',
        'name': 'MetalForge',
      },
      'reviewBody': gear.story.content.substring(0, 300) + '...',
    },
    'associatedMedia': gear.sound.videos.map(video => ({
      '@type': 'VideoObject',
      'name': video.title,
      'description': video.description,
      'thumbnailUrl': `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
      'contentUrl': `https://www.youtube.com/watch?v=${video.youtubeId}`,
    })),
  };
}

/**
 * Generate BreadcrumbList schema for gear page
 * @param {Object} gear - Signature gear item
 * @returns {Object} Schema.org BreadcrumbList
 */
export function generateGearBreadcrumbSchema(gear) {
  const baseUrl = 'https://metalforge.io';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Drummers',
        'item': `${baseUrl}/drummers`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': gear.drummerName,
        'item': `${baseUrl}/drummer/${gear.drummerSlug}`,
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': 'Signature Gear',
        'item': `${baseUrl}/drummers/${gear.drummerSlug}/signature`,
      },
      {
        '@type': 'ListItem',
        'position': 5,
        'name': gear.name,
        'item': `${baseUrl}/drummers/${gear.drummerSlug}/signature/${gear.slug}`,
      },
    ],
  };
}

export default SIGNATURE_GEAR;
