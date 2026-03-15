// Vercel Serverless Function - Combined initial data endpoint
// Reduces HTTP requests by bundling drummers list in a single response
// This eliminates 1 HTTP request on initial page load
// Issue #536: Now includes spotlight drummer for LCP optimization
// Issue #511: Now includes news preview
// Issue #709: Uses FEATURED_ROTATION for consistent spotlight selection

import { drummers } from '../drummers/index.js';
import { getNewsCache } from '../../packages/backend/src/data/news.js';

// FEATURED_ROTATION - MUST match packages/frontend/data/featuredDrummer.js exactly
// This ensures server-side and client-side spotlight selection is identical
const FEATURED_ROTATION_IDS = [5, 14, 4, 1, 15, 3, 2, 6, 16, 17];

// Get current week number for spotlight rotation (matches getWeeksSinceEpoch in featuredDrummer.js)
function getWeekNumber() {
  const epochStart = new Date('2024-01-01').getTime();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((Date.now() - epochStart) / msPerWeek);
}

// Get current spotlight drummer ID from FEATURED_ROTATION
function getCurrentSpotlightId() {
  const weekNumber = getWeekNumber();
  const rotationIndex = weekNumber % FEATURED_ROTATION_IDS.length;
  return FEATURED_ROTATION_IDS[rotationIndex];
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  // Performance optimization: Add preconnect hints for LCP image origins (Issue #667)
  res.setHeader('Link', [
    '<https://upload.wikimedia.org>; rel=preconnect; crossorigin',
    '<https://i.ytimg.com>; rel=preconnect; crossorigin'
  ].join(', '));

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Return minimal drummer data for list view (same as /api/drummers)
  const drummersList = drummers.map(({ id, name, band, genre, country, image }) => ({
    id, name, band, genre, country, image
  }));

  // Compute current spotlight drummer using FEATURED_ROTATION (#709)
  // This ensures consistency with frontend featuredDrummer.js logic
  const spotlightId = getCurrentSpotlightId();
  const currentSpotlight = drummers.find(d => d.id === spotlightId && d.spotlight);
  
  // Include full spotlight data for immediate rendering (LCP optimization - Issue #667, #709)
  // Use local image path directly for faster LCP (no proxy redirect)
  const spotlightData = currentSpotlight ? {
    id: currentSpotlight.id,
    name: currentSpotlight.name,
    band: currentSpotlight.band,
    image: currentSpotlight.image,
    // Use local responsive image directly - no proxy needed for local images
    thumbnailUrl: currentSpotlight.image,
    spotlight: currentSpotlight.spotlight
  } : null;
  
  // Add LCP image preload hint using local responsive images
  if (spotlightData?.image?.startsWith('/images/')) {
    const basePath = spotlightData.image.replace(/\.webp$/, '');
    const linkHeader = res.getHeader('Link') || '';
    // Preload mobile (100w) and desktop (200w) responsive images
    res.setHeader('Link', [
      linkHeader,
      `<${basePath}-100w.webp>; rel=preload; as=image; type=image/webp; media="(max-width: 479px)"`,
      `<${basePath}-200w.webp>; rel=preload; as=image; type=image/webp; media="(min-width: 480px)"`
    ].filter(Boolean).join(', '));
  }

  // Get news preview (Phase 3 - #511)
  const newsCache = getNewsCache();
  const newsPreview = newsCache.items.slice(0, 5);

  // Combined response with version for cache busting if needed
  res.status(200).json({
    drummers: drummersList,
    currentSpotlight: spotlightData,
    spotlightWeek: getWeekNumber(),
    newsPreview: newsPreview,
    newsLastFetch: newsCache.lastFetch,
    version: '1.4', // Issue #709: LCP fix - synchronized spotlight rotation
    timestamp: Date.now()
  });
}
