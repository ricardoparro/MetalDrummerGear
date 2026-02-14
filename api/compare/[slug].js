// Vercel Serverless Function - Get single gear comparison by slug (Issue #345)

import { getComparisonBySlug } from '../../packages/frontend/data/comparisons.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'Slug parameter is required' });
  }

  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    return res.status(404).json({ error: 'Comparison not found' });
  }

  res.status(200).json(comparison);
}
