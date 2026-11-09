// Vercel Serverless Function - List all available Gear Cards
// Issue #747: Gear Cards Gallery
// Issue #764: Enhanced with proper API URLs and download support
// Issue #4766: added the studies card family (headline-stat OG cards)

import { STUDIES } from '../../packages/frontend/data/studies/index.js';
import { drummers as canonicalDrummers } from '../drummers/index.js';

const GEAR_CATEGORIES = ['drums', 'snare', 'cymbals', 'hardware', 'sticks'];

// Same slug rule as api/meta and api/card/[slug].js.
function drummerSlug(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function handler(req, res) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://metalforge.io';

  // Helper to generate card URLs for a drummer
  const getCardUrls = (slug) => ({
    // Instagram format (1080x1080)
    instagram: `${baseUrl}/api/card/${slug}`,
    instagramDownload: `${baseUrl}/api/card/${slug}?download=true`,
    // Twitter format (1200x675)
    twitter: `${baseUrl}/api/card/${slug}?format=twitter`,
    twitterDownload: `${baseUrl}/api/card/${slug}?format=twitter&download=true`,
    // Card types
    stats: `${baseUrl}/api/card/${slug}?type=stats`,
    statsTwitter: `${baseUrl}/api/card/${slug}?type=stats&format=twitter`,
    spotlight: `${baseUrl}/api/card/${slug}?type=spotlight`,
    spotlightTwitter: `${baseUrl}/api/card/${slug}?type=spotlight&format=twitter`,
  });

  // Derived from the one canonical drummer module (CLAUDE.md rule 1). The
  // previous hand-kept list covered 21 of 72 drummers and carried invented
  // piece-count and setup-cost figures; stats are now computed from the data.
  const cards = canonicalDrummers.map(d => {
    const slug = drummerSlug(d.name);
    const categories = GEAR_CATEGORIES.filter(k => typeof d.gear?.[k] === 'string' && d.gear[k].trim()).length;
    return {
      slug,
      name: d.name,
      band: d.band,
      genre: d.genre,
      country: d.country,
      stats: {
        categories,
        sources: Array.isArray(d.gear?.sources) ? d.gear.sources.length : 0,
      },
      cardUrls: getCardUrls(slug),
      profileUrl: `${baseUrl}/drummer/${slug}`,
    };
  });

  // Study cards — one headline-stat card per /studies/<slug> page (issue #4766).
  const studyCards = STUDIES.map((s) => ({
    slug: s.slug,
    title: s.title,
    headlineStat: s.headlineStat,
    cardUrls: {
      instagram: `${baseUrl}/api/card/${s.slug}`,
      instagramDownload: `${baseUrl}/api/card/${s.slug}?download=true`,
      twitter: `${baseUrl}/api/card/${s.slug}?format=twitter`,
      twitterDownload: `${baseUrl}/api/card/${s.slug}?format=twitter&download=true`,
    },
    studyUrl: `${baseUrl}/studies/${s.slug}`,
  }));

  // Set caching headers
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  res.status(200).json({
    total: cards.length,
    cards,
    studies: studyCards,
    formats: {
      instagram: {
        dimensions: '1080x1080',
        description: 'Square format for Instagram feed posts'
      },
      twitter: {
        dimensions: '1200x675',
        description: 'Landscape format for Twitter/X cards'
      },
    },
    types: {
      full: 'Complete gear list with drummer info - best for social sharing',
      stats: 'Key statistics (documented gear categories, cited sources) - great for quick sharing',
      spotlight: 'Focus on signature gear - ideal for brand highlights',
      study: 'Headline stat from a /studies page - the study\'s single most citable number',
    },
    usage: {
      download: 'Add ?download=true to any card URL to trigger a file download',
      format: 'Add ?format=twitter for Twitter-optimized dimensions (default: instagram)',
      type: 'Add ?type=stats or ?type=spotlight for different card styles (default: full)',
    },
    apiEndpoint: `${baseUrl}/api/card/[drummer-slug]`,
    galleryUrl: `${baseUrl}/cards`,
  });
}
