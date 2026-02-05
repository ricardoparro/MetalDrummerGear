// Vercel Serverless Function - Get a random quote

import * as quotesData from '../quotes-data.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const quotes = quotesData.getAllQuotes();
  
  if (quotes.length === 0) {
    return res.status(404).json({ error: 'No quotes found' });
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Return in expected format with drummer object
  return res.status(200).json({
    text: quote.text,
    source: quote.source,
    year: quote.year,
    topic: quote.topic,
    drummer: quote.drummer
  });
};
