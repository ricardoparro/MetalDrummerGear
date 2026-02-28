/**
 * News API Endpoint
 * Issue #511: News Aggregation Phase 3 - API endpoints
 * 
 * GET /api/news - Returns cached news items
 * Query params:
 *   - drummer: Filter by drummer name/slug
 *   - band: Filter by band name/slug
 *   - source: Filter by source ID (blabbermouth, loudwire, metalinjection)
 *   - limit: Max items to return (default 50)
 */

// Dynamic import for ES module
let newsData;

async function loadModules() {
  if (!newsData) {
    newsData = await import('../../packages/backend/src/data/news.js');
  }
}

export default async function handler(req, res) {
  // Set CORS and cache headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await loadModules();

    const cache = newsData.getNewsCache();
    const { drummer, band, source, limit = 50 } = req.query;

    let items = cache.items || [];

    // Filter by drummer
    if (drummer) {
      items = newsData.getNewsForDrummer(drummer);
    }

    // Filter by band
    if (band) {
      items = newsData.getNewsForBand(band);
    }

    // Filter by source (blabbermouth, loudwire, metalinjection)
    if (source) {
      items = items.filter(item => item.sourceId === source);
    }

    // Apply limit
    items = items.slice(0, parseInt(limit, 10));

    res.status(200).json({
      success: true,
      count: items.length,
      lastFetch: cache.lastFetch,
      items,
    });
  } catch (error) {
    console.error('[API /news] Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news',
    });
  }
}
