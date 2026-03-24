// Drummer Gear Category Pages Data Module
// Issue #770: SEO Blitz — Auto-Generate 50 Long-Tail Keyword Pages (Gear-Specific)
//
// Provides data and utilities for rendering /drummer/:slug/:category pages

// Valid gear categories
export const VALID_CATEGORIES = ['cymbals', 'drums', 'pedals', 'hardware', 'snare', 'sticks', 'heads'];

// Category metadata for rendering
export const CATEGORY_META = {
  cymbals: {
    title: 'Cymbals',
    emoji: '🔔',
    icon: '🥇',
    description: 'Complete cymbal setup including hi-hats, crashes, rides, and chinas',
    color: '#FFD700',
  },
  drums: {
    title: 'Drums',
    emoji: '🥁',
    icon: '🎵',
    description: 'Drum kit shells, sizes, and configuration',
    color: '#8B4513',
  },
  pedals: {
    title: 'Pedals',
    emoji: '🦶',
    icon: '⚡',
    description: 'Bass drum pedals and hi-hat stands',
    color: '#C0C0C0',
  },
  hardware: {
    title: 'Hardware',
    emoji: '⚙️',
    icon: '🔧',
    description: 'Stands, racks, thrones, and mounting hardware',
    color: '#708090',
  },
  snare: {
    title: 'Snare',
    emoji: '🪘',
    icon: '💥',
    description: 'Snare drum specifications and signature models',
    color: '#CD853F',
  },
  sticks: {
    title: 'Drumsticks',
    emoji: '🥢',
    icon: '🎯',
    description: 'Drumstick brand, model, and specifications',
    color: '#DEB887',
  },
  heads: {
    title: 'Drumheads',
    emoji: '🎯',
    icon: '⭕',
    description: 'Drumhead brand and models for each drum',
    color: '#F5F5DC',
  },
};

// Priority drummers for initial 50 pages
export const PRIORITY_DRUMMERS = [
  'joey-jordison',
  'lars-ulrich',
  'george-kollias',
  'mario-duplantier',
  'dave-lombardo',
  'brann-dailor',
  'tomas-haake',
  'danny-carey',
  'gene-hoglan',
  'eloy-casagrande',
  'mike-portnoy',
  'vinnie-paul',
  'charlie-benante',
];

// Check if current URL is a drummer gear category page
export function isDrummerGearCategoryPage() {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  // Match /drummer/:slug/:category
  const match = pathname.match(/^\/drummer\/([a-z0-9-]+)\/([a-z]+)$/i);
  if (!match) return false;
  const category = match[2].toLowerCase();
  return VALID_CATEGORIES.includes(category);
}

// Get drummer slug and category from URL
export function getDrummerGearCategoryFromURL() {
  if (typeof window === 'undefined') return null;
  const pathname = window.location.pathname;
  const match = pathname.match(/^\/drummer\/([a-z0-9-]+)\/([a-z]+)$/i);
  if (!match) return null;
  const category = match[2].toLowerCase();
  if (!VALID_CATEGORIES.includes(category)) return null;
  return {
    drummerSlug: match[1].toLowerCase(),
    category: category,
  };
}

// Fetch gear category data from API
// Note: API endpoint moved to /api/gear to avoid conflict with /api/drummer/[id]
export async function fetchDrummerGearCategoryData(drummerSlug, category) {
  try {
    const response = await fetch(`/api/gear/${drummerSlug}/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching drummer gear category data:', error);
    return null;
  }
}

// Generate page title
export function generatePageTitle(drummerName, category) {
  const catMeta = CATEGORY_META[category];
  if (!catMeta) return `${drummerName}'s Gear | MetalForge`;
  return `${drummerName}'s ${catMeta.title}: Complete Setup | MetalForge`;
}

// Generate meta description
export function generateMetaDescription(drummerName, bandName, category, gearData) {
  const catMeta = CATEGORY_META[category];
  const shortGear = gearData?.substring(0, 80) || '';
  return `Explore ${drummerName}'s complete ${catMeta?.title || category} setup. ${shortGear}${gearData?.length > 80 ? '...' : ''} Full specs and breakdown for the ${bandName} drummer.`;
}

// Update meta tags for SEO
export function updateGearCategoryMeta(data) {
  if (typeof document === 'undefined' || !data) return;
  
  const { drummer, category, gear, seo } = data;
  
  // Update title
  document.title = seo?.title || generatePageTitle(drummer.name, category.key);
  
  // Helper to set meta tag
  const setMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attr}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attr, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  
  // Set standard meta tags
  setMeta('description', seo?.description || generateMetaDescription(drummer.name, drummer.band, category.key, gear.raw));
  setMeta('keywords', seo?.keywords?.join(', ') || `${drummer.name} ${category.key}, ${drummer.band} drummer gear`);
  
  // Open Graph tags
  setMeta('og:title', seo?.title || document.title, true);
  setMeta('og:description', seo?.description || '', true);
  setMeta('og:url', seo?.canonicalUrl || window.location.href, true);
  setMeta('og:type', 'article', true);
  if (drummer.image) {
    setMeta('og:image', drummer.image.startsWith('http') ? drummer.image : `https://metalforge.io${drummer.image}`, true);
  }
  
  // Twitter Card
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', seo?.title || document.title);
  setMeta('twitter:description', seo?.description || '');
  
  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seo?.canonicalUrl || window.location.href);
}

// Generate JSON-LD schema
export function generateSchemaMarkup(data) {
  if (!data) return null;
  
  const { drummer, category, gear, schema } = data;
  const catMeta = CATEGORY_META[category.key];
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Breadcrumbs
      {
        '@type': 'BreadcrumbList',
        'itemListElement': schema?.breadcrumbs?.map((item, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.name,
          'item': item.url,
        })) || [],
      },
      // FAQ
      {
        '@type': 'FAQPage',
        'mainEntity': schema?.faq?.map(q => ({
          '@type': 'Question',
          'name': q.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': q.answer,
          },
        })) || [],
      },
      // Product (gear)
      {
        '@type': 'Product',
        'name': `${drummer.name}'s ${catMeta?.title || category.key}`,
        'description': gear.raw,
        'brand': gear.brand ? { '@type': 'Brand', 'name': gear.brand } : undefined,
        'category': catMeta?.title || category.key,
      },
      // Person (drummer)
      {
        '@type': 'Person',
        'name': drummer.name,
        'jobTitle': 'Professional Drummer',
        'memberOf': { '@type': 'MusicGroup', 'name': drummer.band },
        'url': `https://metalforge.io/drummer/${drummer.slug}`,
      },
    ],
  };
}

// Update URL for navigation
export function updateGearCategoryURL(drummerSlug, category) {
  if (typeof window === 'undefined') return;
  const newPath = `/drummer/${drummerSlug}/${category}`;
  if (window.location.pathname !== newPath) {
    window.history.pushState({}, '', newPath);
  }
}

export default {
  VALID_CATEGORIES,
  CATEGORY_META,
  PRIORITY_DRUMMERS,
  isDrummerGearCategoryPage,
  getDrummerGearCategoryFromURL,
  fetchDrummerGearCategoryData,
  generatePageTitle,
  generateMetaDescription,
  updateGearCategoryMeta,
  generateSchemaMarkup,
  updateGearCategoryURL,
};
