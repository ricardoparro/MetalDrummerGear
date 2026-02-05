// Vercel Serverless Function - Combined initial data endpoint
// Reduces HTTP requests by bundling drummers list in a single response
// This eliminates 1 HTTP request on initial page load

import { drummers } from '../drummers/index.js';

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

  // Combined response with version for cache busting if needed
  res.status(200).json({
    drummers: drummersList,
    version: '1.0',
    timestamp: Date.now()
  });
}
