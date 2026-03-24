/**
 * SeoHead Component - Dynamic Meta Tag Manager
 * Issue #769: Add Rich Social Meta Tags (Open Graph + Twitter Cards) to All Pages
 * 
 * Updates document head with proper meta tags for:
 * - SEO (title, description, canonical)
 * - Open Graph (Facebook, LinkedIn, WhatsApp)
 * - Twitter Cards
 * 
 * Note: For social crawlers that don't execute JS, we have
 * server-side rendering via /api/meta/* endpoints.
 */

import { useEffect } from 'react';
import { Platform } from 'react-native';

const BASE_URL = 'https://metalforge.io';
const SITE_NAME = 'MetalForge';
const TWITTER_HANDLE = '@MetalDrumGear';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * Update or create a meta tag
 */
function setMetaTag(property, content, isName = false) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  const attribute = isName ? 'name' : 'property';
  let element = document.querySelector(`meta[${attribute}="${property}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * Update document title
 */
function setTitle(title) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  document.title = title;
}

/**
 * Update canonical URL
 */
function setCanonical(url) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Set all meta tags for a page
 */
function setAllMetaTags({ title, description, image, url, type = 'website' }) {
  // Primary meta tags
  setTitle(title);
  setMetaTag('title', title, true);
  setMetaTag('description', description, true);
  
  // Open Graph
  setMetaTag('og:type', type);
  setMetaTag('og:url', url);
  setMetaTag('og:site_name', SITE_NAME);
  setMetaTag('og:title', title);
  setMetaTag('og:description', description);
  setMetaTag('og:image', image);
  setMetaTag('og:image:width', '1200');
  setMetaTag('og:image:height', '630');
  setMetaTag('og:image:alt', title);
  
  // Twitter Card
  setMetaTag('twitter:card', 'summary_large_image', true);
  setMetaTag('twitter:site', TWITTER_HANDLE, true);
  setMetaTag('twitter:creator', TWITTER_HANDLE, true);
  setMetaTag('twitter:title', title, true);
  setMetaTag('twitter:description', description, true);
  setMetaTag('twitter:image', image, true);
  setMetaTag('twitter:image:alt', title, true);
  
  // Canonical URL
  setCanonical(url);
}

/**
 * SeoHead Component
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (will be appended with site name if needed)
 * @param {string} props.description - Page description (max 160 chars recommended)
 * @param {string} [props.image] - OG image URL (defaults to site default)
 * @param {string} [props.url] - Canonical URL (defaults to current path)
 * @param {string} [props.type] - OG type (website, article, profile)
 * @param {Object} [props.drummer] - Drummer object for drummer profile pages
 */
export function SeoHead({ title, description, image, url, type = 'website', drummer }) {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    
    // Build full title
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    
    // Build image URL
    let ogImage = image || DEFAULT_IMAGE;
    
    // For drummer pages, use the card API for dynamic image
    if (drummer?.id) {
      const slug = drummer.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      if (slug) {
        ogImage = `${BASE_URL}/api/card/${slug}?format=twitter`;
      }
    }
    
    // Ensure image is absolute URL
    if (ogImage && !ogImage.startsWith('http')) {
      ogImage = `${BASE_URL}${ogImage}`;
    }
    
    // Build canonical URL
    const canonical = url || (typeof window !== 'undefined' ? `${BASE_URL}${window.location.pathname}` : BASE_URL);
    
    // Set all meta tags
    setAllMetaTags({
      title: fullTitle,
      description: description?.substring(0, 160) || '',
      image: ogImage,
      url: canonical,
      type,
    });
    
  }, [title, description, image, url, type, drummer]);
  
  // This component doesn't render anything visible
  return null;
}

/**
 * Pre-built SEO configurations for common pages
 */
export const SEO_CONFIGS = {
  home: {
    title: 'MetalForge — Metal Drummer Gear Database',
    description: 'Explore the drum kits, cymbals, and gear used by legendary metal drummers. Discover what Lars Ulrich, Joey Jordison, Dave Lombardo and 60+ pro drummers play.',
    type: 'website',
  },
  
  quiz: {
    title: 'Which Legendary Metal Drummer Are You? 🤘',
    description: 'Take the quiz and discover which legendary metal drummer matches your style! Joey Jordison? George Kollias? Lars Ulrich? Find out now!',
    image: `${BASE_URL}/api/og/quiz`,
    type: 'website',
  },
  
  stats: {
    title: 'Metal Drummer Gear Statistics — Data-Driven Insights',
    description: 'Most popular cymbals, drums, and gear among 60+ legendary metal drummers. See what the pros actually use (with real stats).',
    image: `${BASE_URL}/api/og/stats`,
    type: 'website',
  },
  
  drummers: {
    title: 'All Metal Drummers — Complete Gear Database',
    description: 'Browse 60+ legendary metal drummers and explore their complete gear setups. From Lars Ulrich to George Kollias, discover what the pros play.',
    type: 'website',
  },
  
  tools: {
    title: 'Drummer Tools & Calculators',
    description: 'Free tools for drummers: BPM calculator, kit builder, gear comparison, name generator, and more. Level up your drumming!',
    image: `${BASE_URL}/api/og/tools`,
    type: 'website',
  },
  
  compare: {
    title: 'Drummer Gear Comparison Tool',
    description: "Compare drum setups side-by-side. See how your favorite metal drummers' gear stacks up against each other.",
    image: `${BASE_URL}/api/og/compare`,
    type: 'website',
  },
  
  techniques: {
    title: 'Metal Drumming Techniques — Master the Skills',
    description: 'Learn essential metal drumming techniques: blast beats, double bass, polyrhythms, and more. Tips from the pros.',
    image: `${BASE_URL}/api/og?page=techniques`,
    type: 'website',
  },
  
  beginnerGuide: {
    title: "Metal Drumming Beginner's Guide",
    description: 'Start your metal drumming journey! Essential gear recommendations, technique basics, and tips from legendary drummers.',
    image: `${BASE_URL}/api/og?page=beginner-guide`,
    type: 'article',
  },
  
  gearNews: {
    title: 'Metal Drum Gear News & Updates',
    description: 'Latest news about metal drumming gear: new product releases, artist announcements, and industry updates.',
    image: `${BASE_URL}/api/og?page=gear-news`,
    type: 'website',
  },
  
  cards: {
    title: 'Drummer Gear Cards Gallery',
    description: 'Beautiful shareable gear cards for every drummer. Download and share on Instagram, Twitter, and more!',
    type: 'website',
  },
};

/**
 * Generate SEO config for a drummer profile
 */
export function getDrummerSeo(drummer) {
  if (!drummer) return SEO_CONFIGS.home;
  
  const slug = drummer.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  // Get primary brands from gear
  const brands = [];
  if (drummer.gear?.drums) {
    const match = drummer.gear.drums.match(/^([A-Z][a-z]+)/);
    if (match) brands.push(match[1]);
  }
  if (drummer.gear?.cymbals) {
    const match = drummer.gear.cymbals.match(/^([A-Z][a-z]+)/);
    if (match) brands.push(match[1]);
  }
  const brandsText = brands.length > 0 ? brands.join(', ') : 'pro gear';
  
  return {
    title: `${drummer.name} — Complete Gear Setup`,
    description: `Explore ${drummer.name}'s complete drum setup: ${brandsText}. ${drummer.band} legend's gear breakdown with videos, specs, and prices.`,
    image: `${BASE_URL}/api/card/${slug}?format=twitter`,
    url: `${BASE_URL}/${slug}`,
    type: 'profile',
    drummer,
  };
}

/**
 * Generate SEO config for a VS comparison page
 */
export function getVsComparisonSeo(drummer1, drummer2) {
  if (!drummer1 || !drummer2) return SEO_CONFIGS.compare;
  
  const slug1 = drummer1.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const slug2 = drummer2.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return {
    title: `${drummer1.name} vs ${drummer2.name} — Gear Comparison`,
    description: `Compare ${drummer1.name} (${drummer1.band}) vs ${drummer2.name} (${drummer2.band}) — drums, cymbals, hardware side-by-side.`,
    image: `${BASE_URL}/api/og/compare?d1=${slug1}&d2=${slug2}`,
    url: `${BASE_URL}/vs/${slug1}-vs-${slug2}`,
    type: 'article',
  };
}

/**
 * Generate SEO config for a sound-like guide
 */
export function getSoundLikeSeo(drummer) {
  if (!drummer) return SEO_CONFIGS.tools;
  
  const slug = drummer.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return {
    title: `How to Sound Like ${drummer.name}`,
    description: `Get the ${drummer.band} sound! Complete gear guide and technique tips to achieve ${drummer.name}'s legendary drum tone.`,
    image: `${BASE_URL}/api/og/guide?drummer=${slug}`,
    url: `${BASE_URL}/sound-like/${slug}`,
    type: 'article',
  };
}

export default SeoHead;
