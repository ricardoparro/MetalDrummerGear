/**
 * Vercel Cron Job - Hourly News Fetcher
 * Issue #512: News Aggregation Phase 4
 * 
 * This endpoint is called automatically by Vercel Cron every hour
 * to fetch and cache news from metal RSS feeds.
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
  // Verify cron secret (Vercel sets this automatically for cron jobs)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    // Allow in development or if no secret configured
    if (process.env.NODE_ENV === 'production' && process.env.CRON_SECRET) {
      console.log('[Cron] Unauthorized request blocked');
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  console.log('[Cron] Starting news fetch...');
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

    console.log(`[Cron] Fetching news for ${drummersList.length} drummers and ${bandsList.length} bands`);

    // Fetch and match news
    const news = await newsAggregator.fetchAllNews(drummersList, bandsList);

    // Update cache
    newsData.setNewsCache(news);

    const duration = Date.now() - startTime;
    console.log(`[Cron] Fetched ${news.length} news items in ${duration}ms`);

    res.status(200).json({
      success: true,
      itemCount: news.length,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Cron] News fetch failed:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
