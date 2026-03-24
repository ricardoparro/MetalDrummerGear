// Gear Category Pages Data
// Issue #770: SEO Blitz — Auto-Generate 50 Long-Tail Keyword Pages (Gear-Specific)
// Supporting data for /gear/:category pages

/**
 * Available gear categories
 */
export const DRUMMER_GEAR_CATEGORIES = ['cymbals', 'drums', 'snares', 'pedals', 'hardware', 'sticks'];

/**
 * Category metadata for SEO and display
 */
export const CATEGORY_META = {
  cymbals: {
    title: 'Metal Cymbals',
    metaTitle: 'Best Cymbals for Metal Drumming - Professional Metal Cymbals Guide | MetalForge',
    description: 'Discover the best cymbals for metal drumming. From crashes to rides, hi-hats to chinas - explore professional cymbal setups used by legendary metal drummers.',
    icon: '🔔',
    emoji: '🥁',
  },
  drums: {
    title: 'Metal Drum Kits',
    metaTitle: 'Best Drum Kits for Metal - Professional Metal Drums Guide | MetalForge',
    description: 'Explore professional drum kits used by metal drummers. From Tama Starclassic to Sonor SQ2.',
    icon: '🥁',
    emoji: '🥁',
  },
  snares: {
    title: 'Metal Snare Drums',
    metaTitle: 'Best Snare Drums for Metal - Professional Metal Snare Guide | MetalForge',
    description: 'Find the perfect snare drum for metal. Compare steel, brass, and wood snares used by professional metal drummers.',
    icon: '🔊',
    emoji: '🥁',
  },
  pedals: {
    title: 'Metal Bass Drum Pedals',
    metaTitle: 'Best Bass Drum Pedals for Metal - Double Bass Pedal Guide | MetalForge',
    description: 'Compare the best bass drum pedals for metal drumming. Double pedals and direct drive options.',
    icon: '🦶',
    emoji: '🦶',
  },
  hardware: {
    title: 'Metal Drum Hardware',
    metaTitle: 'Best Drum Hardware for Metal - Professional Hardware Guide | MetalForge',
    description: 'Explore professional drum hardware for metal. Hi-hat stands, cymbal stands, thrones, and rack systems.',
    icon: '🔩',
    emoji: '🔧',
  },
  sticks: {
    title: 'Metal Drumsticks',
    metaTitle: 'Best Drumsticks for Metal - Heavy Duty Drumstick Guide | MetalForge',
    description: 'Find the perfect drumsticks for metal. Heavy-hitting sticks used by professional metal drummers.',
    icon: '🥢',
    emoji: '🪵',
  },
};

/**
 * Check if a category is valid
 */
export function isValidCategory(category) {
  return DRUMMER_GEAR_CATEGORIES.includes(category?.toLowerCase());
}

/**
 * Get gear items for a specific category from a drummer
 */
export function getGearForCategory(drummer, category) {
  if (!drummer || !category) return [];
  
  const gear = drummer.gear || {};
  const categoryLower = category.toLowerCase();
  
  switch (categoryLower) {
    case 'cymbals':
      return gear.cymbals || [];
    case 'drums':
      return gear.drums || gear.kit || [];
    case 'snares':
      return gear.snare ? [gear.snare] : [];
    case 'pedals':
      return gear.pedals ? [gear.pedals] : [];
    case 'hardware':
      return gear.hardware || [];
    case 'sticks':
      return gear.sticks ? [gear.sticks] : [];
    default:
      return [];
  }
}

/**
 * Generate SEO title for a gear category page
 */
export function generateTitle(drummer, category) {
  const meta = CATEGORY_META[category] || {};
  return `What ${meta.title || category} Does ${drummer?.name || 'This Drummer'} Use? | MetalForge`;
}

/**
 * Generate SEO description for a gear category page
 */
export function generateDescription(drummer, category) {
  const meta = CATEGORY_META[category] || {};
  return `Explore ${drummer?.name || 'this drummer'}'s ${category} setup. Complete gear list, specs, and buying options for ${meta.title || category}.`;
}

/**
 * Generate canonical URL for a gear category page
 */
export function generateCanonicalUrl(drummerSlug, category) {
  return `https://metalforge.io/drummer/${drummerSlug}/${category}`;
}

/**
 * Generate FAQ items for SEO
 */
export function generateFAQItems(drummer, category) {
  if (!drummer) return [];
  
  const meta = CATEGORY_META[category] || {};
  
  return [
    {
      question: `What ${category} does ${drummer.name} use?`,
      answer: `${drummer.name} uses professional-grade ${category} for their drumming. Check out the full list above.`,
    },
    {
      question: `Where can I buy ${drummer.name}'s ${category}?`,
      answer: `You can find ${drummer.name}'s ${category} at major music retailers like Thomann and Sweetwater. We've included direct links above.`,
    },
    {
      question: `Why does ${drummer.name} use these ${category}?`,
      answer: `${drummer.name} has chosen their ${category} for specific tonal qualities and durability needed for their playing style in ${drummer.band || 'their band'}.`,
    },
  ];
}

/**
 * Generate JSON-LD schema for gear category pages
 */
export function generateSchema(drummer, category, url) {
  const meta = CATEGORY_META[category] || {};
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: generateTitle(drummer, category),
    description: generateDescription(drummer, category),
    url: url,
    author: {
      '@type': 'Organization',
      name: 'MetalForge',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MetalForge',
      logo: {
        '@type': 'ImageObject',
        url: 'https://metalforge.io/images/logo.png',
      },
    },
    about: {
      '@type': 'Person',
      name: drummer?.name,
      jobTitle: 'Drummer',
      memberOf: drummer?.band ? {
        '@type': 'MusicGroup',
        name: drummer.band,
      } : undefined,
    },
    mainEntity: {
      '@type': 'ItemList',
      name: `${drummer?.name}'s ${meta.title || category}`,
      itemListElement: getGearForCategory(drummer, category).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: typeof item === 'string' ? item : item.name || item.model || 'Gear Item',
        },
      })),
    },
  };
}

/**
 * Get related pages for a category
 */
export function getRelatedPages(category) {
  return DRUMMER_GEAR_CATEGORIES.filter(c => c !== category).map(c => ({
    slug: c,
    ...CATEGORY_META[c],
  }));
}

/**
 * Extract brand from a gear item
 */
export function extractBrand(gearItem) {
  if (!gearItem) return null;
  if (typeof gearItem === 'string') {
    // Try to extract brand from string like "Zildjian K Custom"
    const parts = gearItem.split(' ');
    return parts[0] || null;
  }
  return gearItem.brand || gearItem.manufacturer || null;
}

/**
 * Check if we're on a gear category page
 */
export function isGearCategoryPage() {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return /^\/gear\/[a-z]+\/?$/i.test(pathname);
}

/**
 * Get category from URL
 */
export function getCategoryFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/gear\/([a-z]+)/i);
  return match ? match[1].toLowerCase() : null;
}
