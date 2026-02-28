// Featured Drummer Module - Placeholder
// This file is needed for build but actual implementation is pending

export function getFeaturedDrummer(drummers) {
  // Return first drummer with spotlight or featured flag
  return drummers.find(d => d.featured || d.spotlight) || drummers[0] || null;
}

export function getFeaturedSchedule() {
  return [];
}

export const FEATURED_ROTATION = [];

export default { getFeaturedDrummer, getFeaturedSchedule, FEATURED_ROTATION };
