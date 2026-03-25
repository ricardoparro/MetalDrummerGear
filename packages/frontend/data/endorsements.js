/**
 * Endorsement Brand Data for MetalForge
 * Issue #782: Drummer Endorsement Tracker - Phase 1
 * 
 * Comprehensive brand information including logos, categories, and display data
 * for showing endorsements prominently on drummer profiles.
 */

// Brand categories for filtering and organization
export const ENDORSEMENT_CATEGORIES = {
  drums: { id: 'drums', label: 'Drums', emoji: '🥁', order: 1 },
  cymbals: { id: 'cymbals', label: 'Cymbals', emoji: '🎵', order: 2 },
  sticks: { id: 'sticks', label: 'Sticks', emoji: '🪵', order: 3 },
  heads: { id: 'heads', label: 'Drum Heads', emoji: '⚪', order: 4 },
  hardware: { id: 'hardware', label: 'Hardware', emoji: '⚙️', order: 5 },
  pedals: { id: 'pedals', label: 'Pedals', emoji: '👟', order: 6 },
  electronics: { id: 'electronics', label: 'Electronics', emoji: '🎛️', order: 7 },
  other: { id: 'other', label: 'Other', emoji: '🔧', order: 8 },
};

// Comprehensive brand data with logos and information
export const ENDORSEMENT_BRANDS = {
  // ==================== DRUM BRANDS ====================
  tama: {
    slug: 'tama',
    name: 'Tama',
    category: 'drums',
    logo: '/images/brands/tama-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.tama.com',
    color: '#e11d48',
    bgColor: '#fef2f2',
    country: 'Japan',
    description: 'Precision engineering trusted by metal legends',
  },
  pearl: {
    slug: 'pearl',
    name: 'Pearl',
    category: 'drums',
    logo: '/images/brands/pearl-logo.svg',
    logoFallback: '🥁',
    url: 'https://pearldrum.com',
    color: '#0ea5e9',
    bgColor: '#f0f9ff',
    country: 'Japan',
    description: 'Industry standard for professional drummers',
  },
  dw: {
    slug: 'dw',
    name: 'DW',
    category: 'drums',
    logo: '/images/brands/dw-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.dwdrums.com',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    country: 'USA',
    description: 'Premium handcrafted American drums',
  },
  ludwig: {
    slug: 'ludwig',
    name: 'Ludwig',
    category: 'drums',
    logo: '/images/brands/ludwig-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.ludwig-drums.com',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    country: 'USA',
    description: 'The most famous name on drums since 1909',
  },
  sonor: {
    slug: 'sonor',
    name: 'Sonor',
    category: 'drums',
    logo: '/images/brands/sonor-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.sonor.com',
    color: '#059669',
    bgColor: '#ecfdf5',
    country: 'Germany',
    description: 'German precision engineering',
  },
  mapex: {
    slug: 'mapex',
    name: 'Mapex',
    category: 'drums',
    logo: '/images/brands/mapex-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.mapexdrums.com',
    color: '#dc2626',
    bgColor: '#fef2f2',
    country: 'Taiwan',
    description: 'Innovation and quality for all levels',
  },
  ddrum: {
    slug: 'ddrum',
    name: 'ddrum',
    category: 'drums',
    logo: '/images/brands/ddrum-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.ddrum.com',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    country: 'Sweden',
    description: 'Electronic and acoustic innovation',
  },
  sjc: {
    slug: 'sjc',
    name: 'SJC Custom Drums',
    category: 'drums',
    logo: '/images/brands/sjc-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.sjcdrums.com',
    color: '#f97316',
    bgColor: '#fff7ed',
    country: 'USA',
    description: 'Custom drums for modern drummers',
  },
  ocdp: {
    slug: 'ocdp',
    name: 'OCDP',
    category: 'drums',
    logo: '/images/brands/ocdp-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.ocdrum.com',
    color: '#ea580c',
    bgColor: '#fff7ed',
    country: 'USA',
    description: 'Orange County Drum & Percussion',
  },
  'noble-cooley': {
    slug: 'noble-cooley',
    name: 'Noble & Cooley',
    category: 'drums',
    logo: '/images/brands/noble-cooley-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.noblecooley.com',
    color: '#78350f',
    bgColor: '#fefce8',
    country: 'USA',
    description: 'America\'s oldest drum company',
  },
  'greiner-kilmer': {
    slug: 'greiner-kilmer',
    name: 'Greiner & Kilmer',
    category: 'drums',
    logo: '/images/brands/greiner-kilmer-logo.svg',
    logoFallback: '🥁',
    url: 'https://www.greinerkilmer.com',
    color: '#374151',
    bgColor: '#f3f4f6',
    country: 'USA',
    description: 'Custom drums by drummers, for drummers',
  },

  // ==================== CYMBAL BRANDS ====================
  zildjian: {
    slug: 'zildjian',
    name: 'Zildjian',
    category: 'cymbals',
    logo: '/images/brands/zildjian-logo.svg',
    logoFallback: '🎵',
    url: 'https://zildjian.com',
    color: '#eab308',
    bgColor: '#fefce8',
    country: 'USA',
    description: 'The world\'s oldest cymbal maker since 1623',
  },
  paiste: {
    slug: 'paiste',
    name: 'Paiste',
    category: 'cymbals',
    logo: '/images/brands/paiste-logo.svg',
    logoFallback: '🎵',
    url: 'https://www.paiste.com',
    color: '#dc2626',
    bgColor: '#fef2f2',
    country: 'Switzerland',
    description: 'Swiss precision, legendary sound',
  },
  meinl: {
    slug: 'meinl',
    name: 'Meinl',
    category: 'cymbals',
    logo: '/images/brands/meinl-logo.svg',
    logoFallback: '🎵',
    url: 'https://meinlcymbals.com',
    color: '#22c55e',
    bgColor: '#f0fdf4',
    country: 'Germany',
    description: 'German innovation, dark tones',
  },
  sabian: {
    slug: 'sabian',
    name: 'Sabian',
    category: 'cymbals',
    logo: '/images/brands/sabian-logo.svg',
    logoFallback: '🎵',
    url: 'https://www.sabian.com',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    country: 'Canada',
    description: 'Canadian craftsmanship since 1981',
  },

  // ==================== STICK BRANDS ====================
  'vic-firth': {
    slug: 'vic-firth',
    name: 'Vic Firth',
    category: 'sticks',
    logo: '/images/brands/vic-firth-logo.svg',
    logoFallback: '🪵',
    url: 'https://vicfirth.zildjian.com',
    color: '#1e3a8a',
    bgColor: '#eff6ff',
    country: 'USA',
    description: 'Perfect pair guarantee',
  },
  promark: {
    slug: 'promark',
    name: 'ProMark',
    category: 'sticks',
    logo: '/images/brands/promark-logo.svg',
    logoFallback: '🪵',
    url: 'https://www.daddario.com/promark',
    color: '#ef4444',
    bgColor: '#fef2f2',
    country: 'USA',
    description: 'Performance driven design',
  },
  vater: {
    slug: 'vater',
    name: 'Vater',
    category: 'sticks',
    logo: '/images/brands/vater-logo.svg',
    logoFallback: '🪵',
    url: 'https://www.vater.com',
    color: '#0d9488',
    bgColor: '#f0fdfa',
    country: 'USA',
    description: 'Hand-selected sugar maple',
  },
  ahead: {
    slug: 'ahead',
    name: 'Ahead',
    category: 'sticks',
    logo: '/images/brands/ahead-logo.svg',
    logoFallback: '🪵',
    url: 'https://www.aheaddrumsticks.com',
    color: '#6366f1',
    bgColor: '#eef2ff',
    country: 'USA',
    description: 'Aluminum alloy durability',
  },
  wincent: {
    slug: 'wincent',
    name: 'Wincent',
    category: 'sticks',
    logo: '/images/brands/wincent-logo.svg',
    logoFallback: '🪵',
    url: 'https://www.wincent.se',
    color: '#1e40af',
    bgColor: '#dbeafe',
    country: 'Sweden',
    description: 'Swedish birch perfection',
  },

  // ==================== DRUM HEAD BRANDS ====================
  remo: {
    slug: 'remo',
    name: 'Remo',
    category: 'heads',
    logo: '/images/brands/remo-logo.svg',
    logoFallback: '⚪',
    url: 'https://remo.com',
    color: '#dc2626',
    bgColor: '#fef2f2',
    country: 'USA',
    description: 'Industry standard drum heads',
  },
  evans: {
    slug: 'evans',
    name: 'Evans',
    category: 'heads',
    logo: '/images/brands/evans-logo.svg',
    logoFallback: '⚪',
    url: 'https://www.daddario.com/evans',
    color: '#1d4ed8',
    bgColor: '#eff6ff',
    country: 'USA',
    description: 'Level 360 technology',
  },
  attack: {
    slug: 'attack',
    name: 'Attack',
    category: 'heads',
    logo: '/images/brands/attack-logo.svg',
    logoFallback: '⚪',
    url: 'https://www.universalpercussion.com',
    color: '#b91c1c',
    bgColor: '#fef2f2',
    country: 'USA',
    description: 'No frills, great sound',
  },

  // ==================== HARDWARE & PEDAL BRANDS ====================
  gibraltar: {
    slug: 'gibraltar',
    name: 'Gibraltar',
    category: 'hardware',
    logo: '/images/brands/gibraltar-logo.svg',
    logoFallback: '⚙️',
    url: 'https://www.gibraltarhardware.com',
    color: '#374151',
    bgColor: '#f3f4f6',
    country: 'USA',
    description: 'Rock solid hardware',
  },
  trick: {
    slug: 'trick',
    name: 'Trick',
    category: 'pedals',
    logo: '/images/brands/trick-logo.svg',
    logoFallback: '👟',
    url: 'https://www.trickdrums.com',
    color: '#0ea5e9',
    bgColor: '#f0f9ff',
    country: 'USA',
    description: 'Precision engineering pedals',
  },
  axis: {
    slug: 'axis',
    name: 'Axis Percussion',
    category: 'pedals',
    logo: '/images/brands/axis-logo.svg',
    logoFallback: '👟',
    url: 'https://www.axispercussion.com',
    color: '#dc2626',
    bgColor: '#fef2f2',
    country: 'USA',
    description: 'Longboard specialists',
  },

  // ==================== ELECTRONICS ====================
  roland: {
    slug: 'roland',
    name: 'Roland',
    category: 'electronics',
    logo: '/images/brands/roland-logo.svg',
    logoFallback: '🎛️',
    url: 'https://www.roland.com',
    color: '#dc2626',
    bgColor: '#fef2f2',
    country: 'Japan',
    description: 'Electronic percussion pioneer',
  },
  mandala: {
    slug: 'mandala',
    name: 'Mandala Drums',
    category: 'electronics',
    logo: '/images/brands/mandala-logo.svg',
    logoFallback: '🎛️',
    url: 'https://www.mandaladrum.com',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    country: 'USA',
    description: 'Advanced trigger technology',
  },
};

/**
 * Get brand data by slug
 * @param {string} slug - Brand slug (e.g., 'tama', 'zildjian')
 * @returns {Object|null} Brand data or null if not found
 */
export function getBrandBySlug(slug) {
  if (!slug) return null;
  const normalized = slug.toLowerCase().replace(/\s+/g, '-');
  return ENDORSEMENT_BRANDS[normalized] || null;
}

/**
 * Get brand data by name (fuzzy match)
 * @param {string} name - Brand name (e.g., 'Tama Drums', 'Zildjian')
 * @returns {Object|null} Brand data or null if not found
 */
export function getBrandByName(name) {
  if (!name) return null;
  const normalized = name.toLowerCase().trim();
  
  // Direct match by slug
  for (const [slug, brand] of Object.entries(ENDORSEMENT_BRANDS)) {
    if (normalized === slug || 
        normalized === brand.name.toLowerCase() ||
        normalized.includes(brand.name.toLowerCase()) ||
        brand.name.toLowerCase().includes(normalized.replace(' drums', '').replace(' cymbals', '').replace(' sticks', ''))) {
      return brand;
    }
  }
  
  return null;
}

/**
 * Extract brand info from an endorsement object
 * @param {Object} endorsement - Endorsement object {name, url}
 * @returns {Object} Enhanced endorsement with brand data
 */
export function enhanceEndorsement(endorsement) {
  if (!endorsement) return null;
  
  const brand = getBrandByName(endorsement.name);
  
  if (brand) {
    return {
      ...endorsement,
      brandSlug: brand.slug,
      category: brand.category,
      categoryLabel: ENDORSEMENT_CATEGORIES[brand.category]?.label || 'Other',
      categoryEmoji: ENDORSEMENT_CATEGORIES[brand.category]?.emoji || '🔧',
      logo: brand.logo,
      logoFallback: brand.logoFallback,
      color: brand.color,
      bgColor: brand.bgColor,
      description: brand.description,
    };
  }
  
  // Return original with basic categorization
  return {
    ...endorsement,
    brandSlug: null,
    category: 'other',
    categoryLabel: 'Other',
    categoryEmoji: '🔧',
    logo: null,
    logoFallback: '🎵',
    color: '#6b7280',
    bgColor: '#f3f4f6',
    description: endorsement.name,
  };
}

/**
 * Group endorsements by category
 * @param {Array} endorsements - Array of endorsement objects
 * @returns {Object} Endorsements grouped by category
 */
export function groupEndorsementsByCategory(endorsements) {
  if (!endorsements || !Array.isArray(endorsements)) return {};
  
  const enhanced = endorsements.map(enhanceEndorsement).filter(Boolean);
  const grouped = {};
  
  // Group by category
  for (const endorsement of enhanced) {
    const category = endorsement.category || 'other';
    if (!grouped[category]) {
      grouped[category] = {
        category,
        label: ENDORSEMENT_CATEGORIES[category]?.label || 'Other',
        emoji: ENDORSEMENT_CATEGORIES[category]?.emoji || '🔧',
        order: ENDORSEMENT_CATEGORIES[category]?.order || 99,
        items: [],
      };
    }
    grouped[category].items.push(endorsement);
  }
  
  // Sort groups by order
  return Object.fromEntries(
    Object.entries(grouped).sort(([, a], [, b]) => a.order - b.order)
  );
}

/**
 * Get all brands in a category
 * @param {string} category - Category id (e.g., 'drums', 'cymbals')
 * @returns {Array} Array of brand objects
 */
export function getBrandsByCategory(category) {
  return Object.values(ENDORSEMENT_BRANDS).filter(brand => brand.category === category);
}

/**
 * Get endorsement summary for display
 * @param {Array} endorsements - Array of endorsement objects
 * @returns {Object} Summary with drums, cymbals, sticks brands
 */
export function getEndorsementSummary(endorsements) {
  if (!endorsements || !Array.isArray(endorsements)) {
    return { drums: null, cymbals: null, sticks: null };
  }
  
  const grouped = groupEndorsementsByCategory(endorsements);
  
  return {
    drums: grouped.drums?.items?.[0] || null,
    cymbals: grouped.cymbals?.items?.[0] || null,
    sticks: grouped.sticks?.items?.[0] || null,
    heads: grouped.heads?.items?.[0] || null,
    pedals: grouped.pedals?.items?.[0] || null,
    hardware: grouped.hardware?.items?.[0] || null,
    electronics: grouped.electronics?.items?.[0] || null,
    all: endorsements.map(enhanceEndorsement),
  };
}

/**
 * Generate endorsement badge text
 * @param {Array} endorsements - Array of endorsement objects
 * @returns {string} Badge text (e.g., "Tama • Zildjian • Vic Firth")
 */
export function getEndorsementBadgeText(endorsements) {
  if (!endorsements || !Array.isArray(endorsements) || endorsements.length === 0) {
    return '';
  }
  
  const summary = getEndorsementSummary(endorsements);
  const parts = [];
  
  if (summary.drums) parts.push(summary.drums.name.replace(' Drums', ''));
  if (summary.cymbals) parts.push(summary.cymbals.name.replace(' Cymbals', ''));
  if (summary.sticks) parts.push(summary.sticks.name.replace(' Sticks', '').replace(' Drumsticks', ''));
  
  return parts.join(' • ');
}

export default {
  ENDORSEMENT_CATEGORIES,
  ENDORSEMENT_BRANDS,
  getBrandBySlug,
  getBrandByName,
  enhanceEndorsement,
  groupEndorsementsByCategory,
  getBrandsByCategory,
  getEndorsementSummary,
  getEndorsementBadgeText,
};
