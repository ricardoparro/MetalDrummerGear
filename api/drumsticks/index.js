// /api/drumsticks — serves the drumsticks dataset as JSON.
//
// The SINGLE SOURCE OF TRUTH for stick records is
// packages/frontend/data/drumsticks.js (used by the /drumsticks hub pages,
// drummer-page Sticks blocks, and api/sitemap.js). This endpoint re-exports it;
// an earlier version of this file carried its own duplicate copy of the data,
// which drifted from the canonical module — never add records here, add them
// to the canonical module instead.

import {
  DRUMSTICKS,
  DRUMMER_STICKS,
  getStickById,
  getSticksForDrummer,
} from '../../packages/frontend/data/drumsticks.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({ count: DRUMSTICKS.length, drumsticks: DRUMSTICKS });
}

// Back-compat alias for the earlier duplicate module's helper name.
function getDrumstick(id) {
  return getStickById(id);
}

export { DRUMSTICKS, DRUMMER_STICKS, getStickById, getSticksForDrummer, getDrumstick };
