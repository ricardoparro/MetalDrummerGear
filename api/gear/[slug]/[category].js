// Vercel Serverless Function - Drummer Gear Category Pages
// Issue #770: SEO Blitz — Auto-Generate 50 Long-Tail Keyword Pages (Gear-Specific)
// 
// URL Pattern: /drummer/:slug/:category
// Captures long-tail searches like "joey jordison cymbals", "what drums does lars ulrich use"

import { drummers } from '../../drummers/index.js';

// Valid gear categories
const VALID_CATEGORIES = ['cymbals', 'drums', 'pedals', 'hardware', 'snare', 'sticks', 'heads'];

// Category display names and meta
const CATEGORY_META = {
  cymbals: {
    title: 'Cymbals',
    emoji: '🔔',
    searchIntent: ['cymbals', 'hi-hats', 'crashes', 'rides', 'chinas'],
  },
  drums: {
    title: 'Drums',
    emoji: '🥁',
    searchIntent: ['drums', 'kit', 'shells', 'toms', 'bass drum'],
  },
  pedals: {
    title: 'Pedals',
    emoji: '🦶',
    searchIntent: ['pedals', 'double bass pedal', 'kick pedal', 'hi-hat stand'],
  },
  hardware: {
    title: 'Hardware',
    emoji: '⚙️',
    searchIntent: ['hardware', 'rack', 'throne', 'stands', 'mounts'],
  },
  snare: {
    title: 'Snare',
    emoji: '🪘',
    searchIntent: ['snare', 'snare drum', 'signature snare'],
  },
  sticks: {
    title: 'Drumsticks',
    emoji: '🥢',
    searchIntent: ['sticks', 'drumsticks', 'signature sticks'],
  },
  heads: {
    title: 'Drumheads',
    emoji: '🎯',
    searchIntent: ['heads', 'drumheads', 'skins'],
  },
};

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Extract brand from gear string
function extractBrand(gearString) {
  if (!gearString) return null;
  // Common brands
  const brands = [
    'Pearl', 'Tama', 'DW', 'Sonor', 'Ludwig', 'Mapex', 'Yamaha', 'Gretsch', 'SJC', 'ddrum',
    'Zildjian', 'Sabian', 'Meinl', 'Paiste',
    'Vic Firth', 'Promark', 'Ahead', 'Vater', 'Wincent',
    'Evans', 'Remo', 'Aquarian',
    'DW', 'Gibraltar', 'Trick', 'Axis'
  ];
  for (const brand of brands) {
    if (gearString.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return null;
}

// Parse gear string into structured items
function parseGearItems(gearString, category) {
  if (!gearString) return [];
  
  // Split by common delimiters
  const items = gearString.split(/,\s*(?=[A-Z])|\)\s*,\s*/);
  
  return items.map(item => {
    const trimmed = item.trim();
    if (!trimmed) return null;
    
    // Try to extract size/model info
    const sizeMatch = trimmed.match(/(\d+(?:\.\d+)?["']?(?:x\d+(?:\.\d+)?["']?)?)/);
    const size = sizeMatch ? sizeMatch[1] : null;
    
    // Extract brand
    const brand = extractBrand(trimmed);
    
    return {
      name: trimmed + (trimmed.endsWith(')') ? '' : ''),
      brand,
      size,
      raw: trimmed,
    };
  }).filter(Boolean);
}

// Generate SEO-friendly description
function generateDescription(drummer, category, gearData) {
  const catMeta = CATEGORY_META[category];
  const brand = extractBrand(gearData);
  
  const templates = [
    `Explore ${drummer.name}'s complete ${category} setup: ${gearData}. Detailed specs, prices, and where to buy the same ${category} used by the ${drummer.band} drummer.`,
    `${drummer.name} uses ${brand ? brand + ' ' : ''}${category}. Complete breakdown of the ${drummer.band} drummer's ${category} setup with specs and affiliate links.`,
    `What ${category} does ${drummer.name} use? The ${drummer.band} drummer plays ${gearData.substring(0, 100)}${gearData.length > 100 ? '...' : ''}.`,
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

// Generate FAQ data for schema
function generateFAQ(drummer, category, gearData) {
  const catMeta = CATEGORY_META[category];
  const brand = extractBrand(gearData);
  
  return [
    {
      question: `What ${category} does ${drummer.name} use?`,
      answer: `${drummer.name} uses ${gearData}.`,
    },
    {
      question: `Why does ${drummer.name} use ${brand || 'these'} ${category}?`,
      answer: `${drummer.name} has been using ${brand || 'this'} ${category} for their signature sound with ${drummer.band}. The ${category} provide the tone and reliability needed for professional metal drumming.`,
    },
    {
      question: `How much do ${drummer.name}'s ${category} cost?`,
      answer: `${drummer.name}'s ${category} setup varies in price depending on specific models. Check our gear database for current prices and affiliate links.`,
    },
  ];
}

// Generate related drummers who use similar gear
function getRelatedDrummers(allDrummers, currentDrummer, category, limit = 5) {
  const currentGear = currentDrummer.gear?.[category]?.toLowerCase() || '';
  const currentBrand = extractBrand(currentGear);
  
  if (!currentBrand) return [];
  
  return allDrummers
    .filter(d => d.id !== currentDrummer.id)
    .filter(d => {
      const gear = d.gear?.[category]?.toLowerCase() || '';
      return gear.includes(currentBrand.toLowerCase());
    })
    .slice(0, limit)
    .map(d => ({
      id: d.id,
      name: d.name,
      slug: generateSlug(d.name),
      band: d.band,
      gear: d.gear?.[category],
      brand: extractBrand(d.gear?.[category]),
    }));
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { slug, category } = req.query;

  // Validate category
  if (!VALID_CATEGORIES.includes(category?.toLowerCase())) {
    return res.status(404).json({ 
      error: 'Invalid category',
      validCategories: VALID_CATEGORIES,
    });
  }

  // Find drummer by slug
  const normalizedSlug = slug?.toLowerCase();
  const drummer = drummers.find(d => 
    generateSlug(d.name) === normalizedSlug ||
    d.id?.toString() === normalizedSlug
  );

  if (!drummer) {
    return res.status(404).json({ error: 'Drummer not found' });
  }

  // Get gear data for this category
  const gearData = drummer.gear?.[category];
  
  if (!gearData) {
    return res.status(404).json({ 
      error: 'No gear data available for this category',
      drummer: drummer.name,
      category,
    });
  }

  const catMeta = CATEGORY_META[category];
  const drummerSlug = generateSlug(drummer.name);
  const brand = extractBrand(gearData);
  const gearItems = parseGearItems(gearData, category);
  const relatedDrummers = getRelatedDrummers(drummers, drummer, category);
  const faq = generateFAQ(drummer, category, gearData);

  // Build response
  const response = {
    drummer: {
      id: drummer.id,
      name: drummer.name,
      slug: drummerSlug,
      band: drummer.band,
      bands: drummer.bands,
      genre: drummer.genre,
      country: drummer.country,
      image: drummer.image,
      bio: drummer.bio,
    },
    category: {
      key: category,
      title: catMeta.title,
      emoji: catMeta.emoji,
    },
    gear: {
      raw: gearData,
      brand,
      items: gearItems,
      rationale: drummer.gear?.[`${category}Rationale`],
      verified: drummer.gear?.verified || false,
      verifiedAt: drummer.gear?.verifiedAt,
      sources: drummer.gear?.sources,
    },
    seo: {
      title: `${drummer.name}'s ${catMeta.title}: ${brand || 'Complete'} Setup | MetalForge`,
      description: generateDescription(drummer, category, gearData),
      keywords: [
        `${drummer.name} ${category}`,
        `what ${category} does ${drummer.name} use`,
        `${drummer.band} drummer ${category}`,
        brand ? `${brand} ${category}` : null,
        `${drummer.name} gear`,
        `${drummer.name} drum setup`,
      ].filter(Boolean),
      canonicalUrl: `https://metalforge.io/drummer/${drummerSlug}/${category}`,
    },
    schema: {
      breadcrumbs: [
        { name: 'Home', url: 'https://metalforge.io' },
        { name: 'Drummers', url: 'https://metalforge.io' },
        { name: drummer.name, url: `https://metalforge.io/drummer/${drummerSlug}` },
        { name: catMeta.title, url: `https://metalforge.io/drummer/${drummerSlug}/${category}` },
      ],
      faq,
    },
    relatedDrummers,
    relatedLinks: {
      fullProfile: `/drummer/${drummerSlug}`,
      otherCategories: VALID_CATEGORIES
        .filter(c => c !== category && drummer.gear?.[c])
        .map(c => ({
          category: c,
          title: CATEGORY_META[c].title,
          url: `/drummer/${drummerSlug}/${c}`,
        })),
      comparisons: relatedDrummers.slice(0, 3).map(d => ({
        name: `${drummer.name} vs ${d.name}`,
        url: `/vs/${drummerSlug}-vs-${d.slug}`,
      })),
    },
    endorsements: drummer.endorsements?.filter(e => {
      const name = e.name.toLowerCase();
      return name.includes(category) || 
             (category === 'cymbals' && name.includes('cymbal')) ||
             (category === 'drums' && name.includes('drum')) ||
             (category === 'sticks' && (name.includes('stick') || name.includes('promark') || name.includes('vic firth') || name.includes('vater')));
    }),
    videos: drummer.videos?.slice(0, 3),
  };

  res.status(200).json(response);
}
