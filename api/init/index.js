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
  
  // Include full spotlight data for immediate rendering
  const spotlightData = currentSpotlight ? {
    id: currentSpotlight.id,
    name: currentSpotlight.name,
    band: currentSpotlight.band,
    image: currentSpotlight.image,
    spotlight: currentSpotlight.spotlight
  } : null;

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
    version: '1.2',
    timestamp: Date.now()
  });
}
