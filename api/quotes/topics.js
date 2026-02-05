// Vercel Serverless Function - Get all quote topics

import * as quotesData from '../quotes-data.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const quotes = quotesData.getAllQuotes();
  const topics = [...new Set(quotes.map(q => q.topic).filter(Boolean))].sort();
  
  // Add default topics if none found
  if (topics.length === 0) {
    topics.push('gear', 'technique', 'philosophy', 'career');
    topics.sort();
  }

  // Return in expected format with topics array wrapped in object
  return res.status(200).json({ topics });
}
