// Vercel Serverless Function - Combined initial data endpoint
// Reduces HTTP requests by bundling drummers list in a single response
// This eliminates 1 HTTP request on initial page load
// Issue #536: Now includes spotlight drummer for LCP optimization
// Issue #511: Now includes news preview

import { drummers } from '../drummers/index.js';
import { getNewsCache } from '../../packages/backend/src/data/news.js';

// Get current week number for spotlight rotation
function getWeekNumber() {
  const epochStart = new Date('2024-01-01').getTime();
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor((Date.now() - epochStart) / msPerWeek);
}

// Get current spotlight drummer index
function getCurrentSpotlightIndex(totalDrummers) {
  return getWeekNumber() % totalDrummers;
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

  // Compute current spotlight drummer server-side for faster LCP (#536)
  const spotlightDrummers = drummers.filter(d => d.spotlight);
  const spotlightIndex = getCurrentSpotlightIndex(spotlightDrummers.length);
  const currentSpotlight = spotlightDrummers[spotlightIndex];
  
  // Include full spotlight data for immediate rendering (LCP optimization - Issue #667)
  const spotlightData = currentSpotlight ? {
    id: currentSpotlight.id,
    name: currentSpotlight.name,
    band: currentSpotlight.band,
    image: currentSpotlight.image,
    // Pre-compute optimized image URLs for faster LCP
    thumbnailUrl: currentSpotlight.image ? `/api/image?url=${encodeURIComponent(currentSpotlight.image)}&w=140&q=80` : null,
    spotlight: currentSpotlight.spotlight
  } : null;
  
  // Add LCP image hint if spotlight exists
  if (spotlightData?.thumbnailUrl) {
    const linkHeader = res.getHeader('Link') || '';
    res.setHeader('Link', `${linkHeader}${linkHeader ? ', ' : ''}<${spotlightData.thumbnailUrl}>; rel=preload; as=image`);
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
    version: '1.3', // Issue #666, #667, #668, #669: Mobile performance optimization
    timestamp: Date.now()
  });
}
