// Vercel Serverless Function - Embed View Tracking
// Issue #744: Track referrer domains for analytics
//
// This endpoint receives tracking pings from embedded widgets
// to monitor which domains are embedding MetalForge content.

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Return a 1x1 transparent GIF
  const PIXEL = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    'base64'
  );
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  try {
    const { slug, referrer } = req.query;
    
    if (slug && referrer) {
      // Parse the referrer domain
      let domain = 'unknown';
      try {
        const url = new URL(referrer);
        domain = url.hostname;
      } catch (e) {
        domain = referrer.substring(0, 100); // Truncate if not a valid URL
      }
      
      // Get current date for daily tracking
      const today = new Date().toISOString().split('T')[0];
      
      // Track the embed view in KV store
      // Key format: embed:views:YYYY-MM-DD
      // Value: { [slug]: { [domain]: count } }
      const key = `embed:views:${today}`;
      
      try {
        // Get existing data
        const existing = await kv.get(key) || {};
        
        // Initialize structure if needed
        if (!existing[slug]) {
          existing[slug] = {};
        }
        if (!existing[slug][domain]) {
          existing[slug][domain] = 0;
        }
        
        // Increment count
        existing[slug][domain]++;
        
        // Save back with 90 day TTL
        await kv.set(key, existing, { ex: 90 * 24 * 60 * 60 });
        
        // Also track total embed views
        const totalKey = `embed:total:${slug}`;
        await kv.incr(totalKey);
        
        // Track unique domains
        const domainsKey = `embed:domains:${slug}`;
        await kv.sadd(domainsKey, domain);
        
      } catch (kvError) {
        // KV might not be configured in dev - just log
        console.log('Embed tracking (KV not available):', { slug, domain, date: today });
      }
    }
  } catch (error) {
    // Don't fail the request for tracking errors
    console.error('Embed tracking error:', error);
  }

  // Always return the pixel
  return res.status(200).send(PIXEL);
}
