/**
 * WebApplication Schema Utility - Issue #778
 * Adds WebApplication structured data for interactive tools
 * 
 * Benefits:
 * - Helps Google understand these are interactive tools
 * - May appear in rich results for "metal drummer tools" queries
 * - Improves SEO discoverability
 */

import { Platform } from 'react-native';

const BASE_URL = 'https://metalforge.io';
const PUBLISHER = {
  "@type": "Organization",
  "name": "MetalForge",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${BASE_URL}/images/logo.png`
  }
};

/**
 * Inject WebApplication schema into the document head
 * 
 * @param {Object} config - Schema configuration
 * @param {string} config.name - Tool name (e.g., "Metal Drummer Tier List Builder")
 * @param {string} config.description - Tool description
 * @param {string} config.url - Tool URL path (e.g., "/tools/tier-list")
 * @param {string} [config.applicationCategory] - Category (default: "EntertainmentApplication")
 * @param {string} [config.schemaId] - Unique ID for the schema script element
 * @param {string} [config.image] - OG image URL
 * @param {Object} [config.aggregateRating] - Optional aggregate rating
 * @param {Array} [config.keywords] - Optional keywords array
 */
export function injectWebApplicationSchema(config) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  const {
    name,
    description,
    url,
    applicationCategory = 'EntertainmentApplication',
    schemaId = 'web-application-schema',
    image,
    aggregateRating,
    keywords = [],
  } = config;
  
  // Remove existing schema if present
  const existingSchema = document.getElementById(schemaId);
  if (existingSchema) {
    existingSchema.remove();
  }
  
  // Build the WebApplication schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url.startsWith('http') ? url : `${BASE_URL}${url}`,
    "applicationCategory": applicationCategory,
    "operatingSystem": "Web browser",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": PUBLISHER,
    "creator": PUBLISHER,
    "inLanguage": "en",
    "isAccessibleForFree": true,
  };
  
  // Add optional image
  if (image) {
    schema.image = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  }
  
  // Add optional aggregate rating
  if (aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ...aggregateRating
    };
  }
  
  // Add keywords if provided
  if (keywords.length > 0) {
    schema.keywords = keywords.join(', ');
  }
  
  // Create and inject the script element
  const scriptElement = document.createElement('script');
  scriptElement.type = 'application/ld+json';
  scriptElement.id = schemaId;
  scriptElement.textContent = JSON.stringify(schema);
  document.head.appendChild(scriptElement);
}

/**
 * Remove WebApplication schema from document head
 * 
 * @param {string} [schemaId] - Schema script element ID
 */
export function removeWebApplicationSchema(schemaId = 'web-application-schema') {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  const existingSchema = document.getElementById(schemaId);
  if (existingSchema) {
    existingSchema.remove();
  }
}

// Pre-configured schemas for MetalForge tools
export const TOOL_SCHEMAS = {
  tierList: {
    name: 'Metal Drummer Tier List Builder',
    description: 'Create and share your metal drummer tier list. Drag and drop to rank the best drummers in metal by technical skill, influence, speed, showmanship, and more.',
    url: '/tools/tier-list',
    applicationCategory: 'EntertainmentApplication',
    schemaId: 'tier-list-web-app-schema',
    image: '/images/og/tier-list.png',
    keywords: [
      'metal drummer tier list',
      'drummer ranking tool',
      'metal drummer comparison',
      'tier list maker',
      'drum tier list',
      'metal drumming ranking'
    ],
  },
  
  dreamSetup: {
    name: 'Dream Setup Builder',
    description: 'Build your perfect metal drum kit with our interactive Dream Setup Builder. Get personalized gear recommendations based on your budget, genre, skill level, and playing style.',
    url: '/tools/dream-setup',
    applicationCategory: 'EntertainmentApplication',
    schemaId: 'dream-setup-web-app-schema',
    image: '/images/og/dream-setup.png',
    keywords: [
      'drum kit builder',
      'metal drum setup',
      'dream drum kit',
      'drum gear selector',
      'custom drum kit',
      'drum equipment guide'
    ],
  },
  
  signatureLicks: {
    name: 'Signature Licks Discovery Engine',
    description: 'Explore and learn iconic drum fills, beats, and patterns from legendary metal drummers. Video tutorials, technique breakdowns, and practice tips.',
    url: '/tools/signature-licks',
    applicationCategory: 'EducationalApplication',
    schemaId: 'signature-licks-web-app-schema',
    image: '/images/og/signature-licks.png',
    keywords: [
      'drum licks',
      'metal drum fills',
      'drum patterns',
      'drum tutorial',
      'signature drum beats',
      'learn metal drumming'
    ],
  },
  
  kitBuilder: {
    name: 'Metal Drum Kit Builder',
    description: 'Build your metal drum kit piece by piece. Select drums, cymbals, hardware, and more with real-time price estimates and affiliate links to trusted retailers.',
    url: '/kit-builder',
    applicationCategory: 'ShoppingApplication',
    schemaId: 'kit-builder-web-app-schema',
    image: '/images/og/kit-builder.png',
    keywords: [
      'drum kit builder',
      'buy drum kit',
      'metal drums shopping',
      'drum gear prices',
      'custom drum setup'
    ],
  },
  
  nameGenerator: {
    name: 'Metal Drummer Name Generator',
    description: 'Generate your ultimate metal drummer name and discover which legendary drummer matches your style! Fun, free, and instantly shareable.',
    url: '/tools/metal-drummer-name-generator',
    applicationCategory: 'EntertainmentApplication',
    schemaId: 'name-generator-web-app-schema',
    image: '/images/og/name-generator.jpg',
    keywords: [
      'metal drummer name',
      'stage name generator',
      'drummer name generator',
      'metal band name',
      'heavy metal nickname'
    ],
  },
  
  gearComparison: {
    name: 'Gear Comparison Tool',
    description: 'Compare any two metal drummers\' complete gear setups side-by-side. Drums, cymbals, hardware, and more. Find out who has the ultimate kit!',
    url: '/tools/compare',
    applicationCategory: 'EntertainmentApplication',
    schemaId: 'gear-comparison-web-app-schema',
    image: '/images/og/gear-comparison.jpg',
    keywords: [
      'drum comparison',
      'drummer gear comparison',
      'drum kit comparison',
      'metal drummer equipment',
      'drum setup battle'
    ],
  },
};

export default injectWebApplicationSchema;
