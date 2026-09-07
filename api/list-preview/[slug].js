// /api/list-preview/:slug — tiny {title, description, emoji} payload for one
// top-10 list. Issue #7148 (L4 perf): the SPA's /lists/:slug page only
// renders real content after lazy-loading data/top10Lists.js in full (~830KB
// raw), which was the whole page's LCP-blocking chunk on slow connections.
// This endpoint serves just the two above-the-fold fields so the static
// hero markup in dist/index.html (see inject-ga.cjs) can be updated with the
// real title/description well before that big chunk finishes downloading —
// no waiting on the route chunk for the part Lighthouse counts as LCP.
//
// Source of truth stays packages/frontend/data/top10Lists.js — this reads
// the same export, never a duplicate copy.
import { TOP_10_LISTS } from '../../packages/frontend/data/top10Lists.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { slug } = req.query;
  const list = TOP_10_LISTS[slug];

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  res.status(200).json({
    title: list.title,
    description: list.description,
    emoji: list.emoji || null,
  });
}
