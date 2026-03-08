/**
 * Lazy Route Loading Optimization - Issue #666, #668
 * 
 * Implements intelligent route-level code splitting to reduce:
 * - TBT (Total Blocking Time) - Less JS to parse on initial load
 * - Mobile Performance Score - Smaller initial bundle
 * 
 * Strategy:
 * - Critical routes (homepage, drummer detail) load inline
 * - Secondary routes (quiz, compare, etc.) load on-demand
 * - Preload routes on hover/focus for instant navigation
 */

import { Platform } from 'react-native';

// ==========================================
// ROUTE REGISTRY
// ==========================================

// Routes that should be lazy-loaded with their import functions
// Priority: 1 = preload after TTI, 2 = load on hover, 3 = load on navigation
export const LAZY_ROUTES = {
  // Priority 2: Preload on homepage hover
  quiz: {
    priority: 2,
    paths: ['/quiz'],
    preloadOn: ['homepage-hover-quiz', 'nav-focus'],
  },
  compare: {
    priority: 2,
    paths: ['/compare'],
    preloadOn: ['homepage-hover-compare', 'nav-focus'],
  },
  
  // Priority 2: List pages
  lists: {
    priority: 2,
    paths: ['/lists', '/lists/*'],
    preloadOn: ['homepage-scroll', 'nav-focus'],
  },
  articles: {
    priority: 2,
    paths: ['/articles/*'],
    preloadOn: ['lists-hover'],
  },
  
  // Priority 3: Secondary pages
  kitBuilder: {
    priority: 3,
    paths: ['/kit-builder'],
    preloadOn: ['tools-hover'],
  },
  kitQuiz: {
    priority: 3,
    paths: ['/kit-quiz'],
    preloadOn: ['tools-hover'],
  },
  bpmTap: {
    priority: 3,
    paths: ['/bpm', '/bpm/*'],
    preloadOn: ['tools-hover'],
  },
  birthdays: {
    priority: 3,
    paths: ['/birthdays'],
    preloadOn: ['nav-focus'],
  },
  
  // Priority 3: Reference pages
  techniques: {
    priority: 3,
    paths: ['/techniques', '/techniques/*'],
    preloadOn: ['nav-focus'],
  },
  gearComparisons: {
    priority: 3,
    paths: ['/gear-vs', '/gear-vs/*'],
    preloadOn: ['nav-focus'],
  },
  drummerVs: {
    priority: 3,
    paths: ['/vs', '/vs/*'],
    preloadOn: ['nav-focus'],
  },
  
  // Priority 3: Landing pages
  genres: {
    priority: 3,
    paths: ['/genres', '/genres/*'],
    preloadOn: ['filter-hover'],
  },
  brands: {
    priority: 3,
    paths: ['/brands', '/brands/*'],
    preloadOn: ['filter-hover'],
  },
  bands: {
    priority: 3,
    paths: ['/bands/*'],
    preloadOn: ['drummer-detail-hover'],
  },
};

// ==========================================
// PRELOAD STATE MANAGEMENT
// ==========================================

const preloadedRoutes = new Set();
const preloadingRoutes = new Set();

/**
 * Check if a route is already preloaded
 */
export function isRoutePreloaded(routeKey) {
  return preloadedRoutes.has(routeKey);
}

/**
 * Mark a route as preloaded
 */
export function markRoutePreloaded(routeKey) {
  preloadedRoutes.add(routeKey);
  preloadingRoutes.delete(routeKey);
}

/**
 * Check if a path matches a route pattern
 */
function matchesPath(path, patterns) {
  return patterns.some(pattern => {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return regex.test(path);
  });
}

/**
 * Find route key for a given path
 */
export function getRouteKeyForPath(path) {
  for (const [key, config] of Object.entries(LAZY_ROUTES)) {
    if (matchesPath(path, config.paths)) {
      return key;
    }
  }
  return null;
}

// ==========================================
// IDLE-TIME PRELOADING
// ==========================================

/**
 * Schedule data preload during browser idle time
 * Uses requestIdleCallback with deadline checking
 */
export function scheduleIdlePreload(preloadFn, options = {}) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    preloadFn();
    return;
  }

  const { timeout = 5000, priority = 'low' } = options;

  const executePreload = (deadline) => {
    // Check if we have enough time, or if timeout reached
    if (deadline && deadline.timeRemaining() < 10 && !deadline.didTimeout) {
      // Reschedule if not enough time
      scheduleIdlePreload(preloadFn, options);
      return;
    }
    preloadFn();
  };

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(executePreload, { timeout });
  } else {
    // Fallback: use setTimeout with longer delay for low priority
    const delay = priority === 'high' ? 100 : 1000;
    setTimeout(() => executePreload(null), delay);
  }
}

/**
 * Preload data modules needed for a route
 * Called during idle time based on route priority
 */
export function preloadRouteData(routeKey, preloadFunctions) {
  if (preloadedRoutes.has(routeKey) || preloadingRoutes.has(routeKey)) {
    return;
  }

  preloadingRoutes.add(routeKey);

  const doPreload = () => {
    const fns = preloadFunctions[routeKey];
    if (fns && Array.isArray(fns)) {
      Promise.all(fns.map(fn => fn())).then(() => {
        markRoutePreloaded(routeKey);
      }).catch(err => {
        console.warn(`[LazyRoutes] Failed to preload ${routeKey}:`, err);
        preloadingRoutes.delete(routeKey);
      });
    }
  };

  const config = LAZY_ROUTES[routeKey];
  const timeout = config?.priority === 1 ? 2000 : 5000;

  scheduleIdlePreload(doPreload, { timeout, priority: config?.priority === 1 ? 'high' : 'low' });
}

// ==========================================
// HOVER/FOCUS PRELOADING
// ==========================================

/**
 * Set up hover preloading for navigation links
 * Preloads route data when user hovers over a link
 */
export function setupHoverPreloading(preloadFunctions) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const handleHover = (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    try {
      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      const routeKey = getRouteKeyForPath(url.pathname);
      if (routeKey && !preloadedRoutes.has(routeKey)) {
        preloadRouteData(routeKey, preloadFunctions);
      }
    } catch (e) {
      // Invalid URL, ignore
    }
  };

  // Use event delegation with passive listener
  document.addEventListener('mouseover', handleHover, { passive: true });
  document.addEventListener('focusin', handleHover, { passive: true });

  // Return cleanup function
  return () => {
    document.removeEventListener('mouseover', handleHover);
    document.removeEventListener('focusin', handleHover);
  };
}

// ==========================================
// INITIAL LOAD OPTIMIZATION
// ==========================================

/**
 * Get list of high-priority routes to preload after TTI
 */
export function getHighPriorityRoutes() {
  return Object.entries(LAZY_ROUTES)
    .filter(([_, config]) => config.priority <= 2)
    .map(([key]) => key);
}

/**
 * Initialize route preloading system
 * - Sets up hover preloading
 * - Schedules high-priority route preloads after TTI
 */
export function initLazyRoutes(preloadFunctions) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;

  // Set up hover preloading
  const cleanup = setupHoverPreloading(preloadFunctions);

  // Schedule high-priority preloads after page is interactive
  const preloadHighPriority = () => {
    const highPriorityRoutes = getHighPriorityRoutes();
    highPriorityRoutes.forEach((routeKey, index) => {
      // Stagger preloads to avoid blocking
      setTimeout(() => {
        preloadRouteData(routeKey, preloadFunctions);
      }, index * 500);
    });
  };

  // Wait for page to be fully interactive
  if (document.readyState === 'complete') {
    // Use requestIdleCallback if available
    scheduleIdlePreload(preloadHighPriority, { timeout: 3000, priority: 'low' });
  } else {
    window.addEventListener('load', () => {
      scheduleIdlePreload(preloadHighPriority, { timeout: 3000, priority: 'low' });
    }, { once: true });
  }

  return cleanup;
}

// ==========================================
// CHUNK SPLITTING HELPERS
// ==========================================

/**
 * Get estimated chunk sizes for routes (KB)
 * Used for monitoring bundle size impact
 */
export const ROUTE_CHUNK_SIZES = {
  quiz: 25,
  compare: 20,
  lists: 15,
  articles: 18,
  kitBuilder: 30,
  kitQuiz: 22,
  bpmTap: 18,
  birthdays: 12,
  techniques: 20,
  gearComparisons: 25,
  drummerVs: 22,
  genres: 15,
  brands: 15,
  bands: 12,
};

/**
 * Calculate total preloaded chunk size
 */
export function getPreloadedSize() {
  let total = 0;
  preloadedRoutes.forEach(key => {
    total += ROUTE_CHUNK_SIZES[key] || 0;
  });
  return total;
}

export default {
  LAZY_ROUTES,
  isRoutePreloaded,
  markRoutePreloaded,
  getRouteKeyForPath,
  scheduleIdlePreload,
  preloadRouteData,
  setupHoverPreloading,
  getHighPriorityRoutes,
  initLazyRoutes,
  ROUTE_CHUNK_SIZES,
  getPreloadedSize,
};
