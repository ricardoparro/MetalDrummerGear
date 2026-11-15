// Trending This Week - Top drummers by page views (Issue #671)
// Updated daily via cron job or manually from GA4 data

/**
 * Trending drummers data structure
 * Views are page views in the last 7 days
 * Change is percentage change vs previous 7 days (null = NEW)
 * 
 * This data can be:
 * - Updated manually based on GA4 reports
 * - Auto-generated via /api/cron/trending endpoint
 * - Updated via GitHub Action with GA4 API
 */

// Last updated timestamp (for debugging/freshness)
export const TRENDING_LAST_UPDATED = '2026-11-15T12:00:00Z';

// Trending period (for display)
export const TRENDING_PERIOD = {
  start: '2026-11-08',
  end: '2026-11-14',
};

/**
 * Trending drummers this week, from GA4 "Top pages" (.agents/ceo/metrics.md,
 * last-7d snapshot refreshed 2026-11-14 19:07 UTC vs the 2026-11-07 06:10 UTC
 * snapshot). Only drummers with a verified page-view number in both weeks get
 * a change %; drummers absent from the prior week's top-10 are marked NEW
 * rather than guessing a previousViews figure.
 * Ordered by page views (descending)
 */
export const TRENDING_DRUMMERS = [
  {
    id: 7,  // Eloy Casagrande
    views: 17,
    previousViews: 14,
    change: 21, // +21%
    isNew: false,
  },
  {
    id: 15, // Mario Duplantier
    views: 16,
    previousViews: 0,
    change: null, // NEW
    isNew: true,
  },
  {
    id: 30, // Bill Ward
    views: 14,
    previousViews: 0,
    change: null, // NEW
    isNew: true,
  },
];

/**
 * Get trending drummers with full drummer data
 * @param {Array} allDrummers - Full list of drummers from API
 * @returns {Array} Trending drummers with full data + trending metadata
 */
export function getTrendingDrummers(allDrummers) {
  if (!allDrummers || allDrummers.length === 0) return [];
  
  return TRENDING_DRUMMERS
    .map(trending => {
      const drummer = allDrummers.find(d => d.id === trending.id);
      if (!drummer) return null;
      
      return {
        ...drummer,
        trending: {
          views: trending.views,
          previousViews: trending.previousViews,
          change: trending.change,
          isNew: trending.isNew,
          rank: TRENDING_DRUMMERS.indexOf(trending) + 1,
        },
      };
    })
    .filter(Boolean);
}

/**
 * Format change percentage for display
 * @param {number|null} change - Percentage change (null = NEW)
 * @returns {string} Formatted string (e.g., '+127%', 'NEW')
 */
export function formatTrendingChange(change) {
  if (change === null) return 'NEW';
  if (change === 0) return '—';
  return change > 0 ? `+${change}%` : `${change}%`;
}

/**
 * Get trending badge color based on change
 * @param {number|null} change - Percentage change
 * @returns {string} Hex color code
 */
export function getTrendingColor(change) {
  if (change === null) return '#10b981'; // Green for NEW
  if (change >= 100) return '#f59e0b'; // Gold for viral
  if (change >= 50) return '#ef4444'; // Red-orange for hot
  if (change >= 20) return '#f97316'; // Orange for trending
  if (change > 0) return '#10b981'; // Green for growth
  if (change === 0) return '#7f7f8a'; // WCAG AA compliant gray for stable (~5.5:1 contrast)
  return '#ef4444'; // Red for decline
}

// This data is refreshed manually from GA4, not by a live cron — 24h would make
// the section permanently "stale" between manual refreshes.
const STALE_THRESHOLD_HOURS = 24 * 14; // 2 weeks

/**
 * Check if trending data is stale (older than STALE_THRESHOLD_HOURS)
 * @returns {boolean}
 */
export function isTrendingStale() {
  const lastUpdated = new Date(TRENDING_LAST_UPDATED);
  const now = new Date();
  const hoursDiff = (now - lastUpdated) / (1000 * 60 * 60);
  return hoursDiff > STALE_THRESHOLD_HOURS;
}
