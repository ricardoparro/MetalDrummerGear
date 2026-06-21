// Vercel Serverless Function - Get drummer by ID
//
// Source of truth for the drummer dataset is api/drummers/index.js — this
// handler reads the same exported `drummers` array so that any drummer added
// to the catalogue is immediately reachable via /api/drummers/<id>, instead
// of silently 404'ing because a second hardcoded copy drifted out of date.
// (Pre-fix bug: Isaac Lamb at id 61 lived only in index.js; the homepage
// fetched /api/drummers/61, got 404, swallowed the error, and the user
// appeared to bounce back to home. See #1888-era investigation.)

import { drummers } from './index.js';
import { getQuotesForDrummer } from '../quotes-data.js';
import { getNewsForDrummer } from '../../packages/backend/src/data/news.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const drummer = drummers.find(d => d.id === parseInt(id, 10));

  if (!drummer) {
    return res.status(404).json({ error: 'Drummer not found' });
  }

  // Inline quotes for this drummer (the dataset includes a `quotes` field on
  // some entries; this overlay merges in entries from the external quotes file).
  const quotes = getQuotesForDrummer(drummer.id);

  // News for this drummer (Phase 3 - #511).
  const drummerNews = getNewsForDrummer(drummer.name).slice(0, 5);

  res.status(200).json({
    ...drummer,
    // Prefer external quotes if present; otherwise fall back to whatever the
    // catalogue entry already carries (some entries include inline quotes).
    quotes: quotes.length > 0 ? quotes : (drummer.quotes || null),
    news: drummerNews.length > 0 ? drummerNews : null,
  });
}
