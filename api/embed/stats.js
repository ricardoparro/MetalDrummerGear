// Vercel Serverless Function - Embed Statistics
// Issue #744: Internal API to view embed analytics
//
// Usage: GET /api/embed/stats
// Optional: ?slug=joey-jordison (filter by drummer)
// Optional: ?days=7 (last N days, default 30)

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  
  // This endpoint should be protected in production
  // For now, just return stats
  
  try {
    const { slug, days = 30 } = req.query;
    const numDays = Math.min(parseInt(days) || 30, 90);
    
    // Get date range
    const dates = [];
    for (let i = 0; i < numDays; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    // Aggregate stats
    const stats = {
      period: `Last ${numDays} days`,
      totalViews: 0,
      uniqueDomains: new Set(),
      byDrummer: {},
      byDomain: {},
      byDate: {}
    };
    
    try {
      for (const date of dates) {
        const key = `embed:views:${date}`;
        const dayData = await kv.get(key);
        
        if (dayData) {
          stats.byDate[date] = { views: 0, drummers: [] };
          
          for (const [drummerSlug, domains] of Object.entries(dayData)) {
            // Filter by slug if provided
            if (slug && drummerSlug !== slug) continue;
            
            if (!stats.byDrummer[drummerSlug]) {
              stats.byDrummer[drummerSlug] = { views: 0, domains: {} };
            }
            
            stats.byDate[date].drummers.push(drummerSlug);
            
            for (const [domain, count] of Object.entries(domains)) {
              stats.totalViews += count;
              stats.uniqueDomains.add(domain);
              stats.byDate[date].views += count;
              
              stats.byDrummer[drummerSlug].views += count;
              stats.byDrummer[drummerSlug].domains[domain] = 
                (stats.byDrummer[drummerSlug].domains[domain] || 0) + count;
              
              stats.byDomain[domain] = (stats.byDomain[domain] || 0) + count;
            }
          }
        }
      }
    } catch (kvError) {
      // KV not configured
      return res.status(200).json({
        error: 'KV store not configured',
        message: 'Embed tracking requires Vercel KV to be set up',
        stats: null
      });
    }
    
    // Convert Set to array
    stats.uniqueDomains = Array.from(stats.uniqueDomains);
    
    // Sort domains by count
    stats.topDomains = Object.entries(stats.byDomain)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([domain, count]) => ({ domain, count }));
    
    // Sort drummers by views
    stats.topDrummers = Object.entries(stats.byDrummer)
      .sort((a, b) => b[1].views - a[1].views)
      .slice(0, 20)
      .map(([slug, data]) => ({ slug, views: data.views, domains: Object.keys(data.domains).length }));
    
    // Clean up response
    delete stats.byDomain;
    delete stats.byDrummer;
    
    return res.status(200).json(stats);
    
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
