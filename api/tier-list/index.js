// Vercel Serverless Function - Save new tier list
// POST /api/tier-list - Save a new tier list

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, category, tiers, createdAt } = req.body;

    if (!id || !tiers) {
      return res.status(400).json({ error: 'Missing required fields: id, tiers' });
    }

    // Validate tier structure
    const validTiers = ['S', 'A', 'B', 'C', 'D', 'F'];
    for (const tier of validTiers) {
      if (!Array.isArray(tiers[tier])) {
        return res.status(400).json({ error: `Invalid tier data for tier ${tier}` });
      }
    }

    // Store in Vercel KV with 30-day expiration
    const key = `tier-list:${id}`;
    const data = {
      id,
      category: category || 'custom',
      tiers,
      createdAt: createdAt || new Date().toISOString(),
      views: 0,
    };

    await kv.set(key, JSON.stringify(data), {
      ex: 60 * 60 * 24 * 30, // 30 days expiration
    });

    return res.status(200).json({
      success: true,
      id,
      url: `https://metalforge.io/tier-list/${id}`,
    });
  } catch (error) {
    console.error('Error saving tier list:', error);
    return res.status(500).json({ error: 'Failed to save tier list' });
  }
}
