// Vercel Serverless Function - Get tier list by ID
// GET /api/tier-list/[id] - Retrieve a saved tier list

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string' || !/^[a-z0-9]{6,12}$/.test(id)) {
      return res.status(400).json({ error: 'Invalid tier list ID' });
    }

    const key = `tier-list:${id}`;
    const dataStr = await kv.get(key);

    if (!dataStr) {
      return res.status(404).json({ error: 'Tier list not found' });
    }

    const data = typeof dataStr === 'string' ? JSON.parse(dataStr) : dataStr;

    // Increment view count (fire and forget)
    kv.set(key, JSON.stringify({ ...data, views: (data.views || 0) + 1 }), {
      ex: 60 * 60 * 24 * 30, // Refresh 30-day expiration
    }).catch(() => {});

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error getting tier list:', error);
    return res.status(500).json({ error: 'Failed to retrieve tier list' });
  }
}
