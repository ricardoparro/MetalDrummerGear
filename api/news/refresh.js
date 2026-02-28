/**
 * Manual News Refresh Endpoint
 * Issue #512: News Aggregation Phase 4
 * 
 * POST /api/news/refresh - Manual trigger for news fetch (admin only)
 * Useful for testing and immediate content updates.
 */

import { drummers } from '../drummers/index.js';
import { bands } from '../../packages/frontend/data/bands.js';

// Dynamic import for CommonJS module
let newsAggregator;
let newsData;

async function loadModules() {
  if (!newsAggregator) {
    newsAggregator = await import('../../packages/backend/src/services/newsAggregator.js');
  }
  if (!newsData) {
    newsData = await import('../../packages/backend/src/data/news.js');
  }
}

// Get bands formatted for matching
function getAllBandsForMatching() {
  return Object.values(bands).map(band => ({
    name: band.name,
    slug: band.slug,
  }));
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Simple auth check via admin key
  const adminKey = req.headers['x-admin-key'];
  if (!process.env.ADMIN_KEY) {
    console.warn('[News Refresh] ADMIN_KEY not configured');
    return res.status(500).json({ error: 'Server not configured for manual refresh' });
  }

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized. Invalid or missing X-Admin-Key header.' });
  }

  console.log('[News Refresh] Manual refresh triggered');
  const startTime = Date.now();

  try {
    // Load CommonJS modules dynamically
    await loadModules();

    // Get drummers formatted for matching
    const drummersList = drummers.map(d => ({
      id: d.id,
      name: d.name,
      slug: d.id.toString(),
      band: d.band,
    }));

    // Get bands for matching
    const bandsList = getAllBandsForMatching();

    console.log(`[News Refresh] Fetching news for ${drummersList.length} drummers and ${bandsList.length} bands`);

    // Fetch and match news
    const news = await newsAggregator.fetchAllNews(drummersList, bandsList);

    // Update cache
    newsData.setNewsCache(news);

    const duration = Date.now() - startTime;
    console.log(`[News Refresh] Fetched ${news.length} news items in ${duration}ms`);

    res.status(200).json({
      success: true,
      itemCount: news.length,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
      message: 'News cache refreshed successfully',
    });
  } catch (error) {
    console.error('[News Refresh] Failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
