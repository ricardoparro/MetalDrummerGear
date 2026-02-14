// Vercel Serverless Function - List all gear comparisons (Issue #345)

import { getAllComparisons, getComparisonsByCategory } from '../../packages/frontend/data/comparisons.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category } = req.query;

  let comparisons = category 
    ? getComparisonsByCategory(category)
    : getAllComparisons();

  // Return summary data for list view
  const summaryData = comparisons.map(({ slug, title, description, category, brands, metaTitle, metaDescription }) => ({
    slug,
    title,
    description,
    category,
    brands,
    metaTitle,
    metaDescription
  }));

  res.status(200).json(summaryData);
}
