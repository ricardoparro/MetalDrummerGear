/**
 * Route Preloader - Performance Optimization (Issue #751)
 * 
 * Intelligently preloads route modules based on user interactions:
 * - Hover over navigation links
 * - Visible viewport intersections
 * - Likely next routes based on current page
 * 
 * This reduces perceived load time for secondary pages while
 * keeping the initial bundle small.
 */

import { Platform } from 'react-native';

// Track which modules have been preloaded
const preloadedModules = new Set();
const preloadingModules = new Set();

// Module loaders map
const moduleLoaders = {
  // Heavy page components
  lazyPages: () => import('../../components/LazyPages'),
  soundLikeGuides: () => import('../../components/SoundLikeGuides'),
  beginnerGuide: () => import('../../components/BeginnerGearGuide'),
  nameGenerator: () => import('../../components/MetalDrummerNameGenerator'),
  gearSearch: () => import('../../components/GearSearch'),
  gearComparisonTool: () => import('../../components/GearComparisonTool'),
  signatureGear: () => import('../../components/SignatureGearSpotlight'),
  gearCards: () => import('../../components/GearCardsGallery'),
  signatureLicks: () => import('../../components/SignatureLicks'),
  
  // Heavy data modules
  albumArticles: () => import('../../data/albumArticles'),
  extendedBios: () => import('../../data/extendedBios'),
  techniques: () => import('../../data/techniques'),
  bands: () => import('../../data/bands'),
  drummerComparisons: () => import('../../data/drummerComparisons'),
  genres: () => import('../../data/genres'),
  top10Lists: () => import('../../data/top10Lists'),
  evolutionTimeline: () => import('../../data/evolutionTimeline'),
  birthdays: () => import('../../data/birthdays'),
};

/**
 * Preload a module by key
 * @param {string} moduleKey - Key from moduleLoaders
 * @returns {Promise} - Resolves when module is loaded
 */
export function preloadModule(moduleKey) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return Promise.resolve();
  }
  
  // Skip if already loaded or loading
  if (preloadedModules.has(moduleKey) || preloadingModules.has(moduleKey)) {
    return Promise.resolve();
  }
  
  const loader = moduleLoaders[moduleKey];
  if (!loader) {
    console.warn(`[Preloader] Unknown module: ${moduleKey}`);
    return Promise.resolve();
  }
  
  preloadingModules.add(moduleKey);
  
  return loader()
    .then((module) => {
      preloadedModules.add(moduleKey);
      preloadingModules.delete(moduleKey);
      return module;
    })
    .catch((error) => {
      preloadingModules.delete(moduleKey);
      console.error(`[Preloader] Failed to preload ${moduleKey}:`, error);
    });
}

/**
 * Preload modules for a specific route
 * @param {string} route - Route path (e.g., '/guides', '/tools/compare')
 */
export function preloadForRoute(route) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }
  
  // Use requestIdleCallback for non-blocking preload
  const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 100));
  
  schedule(() => {
    const routeModules = getModulesForRoute(route);
    routeModules.forEach(moduleKey => preloadModule(moduleKey));
  });
}

/**
 * Get modules that should be preloaded for a route
 * @param {string} route - Route path
 * @returns {string[]} - Array of module keys
 */
function getModulesForRoute(route) {
  const normalizedRoute = route.toLowerCase();
  
  // Route to module mapping
  const routeModuleMap = {
    '/guides': ['soundLikeGuides', 'beginnerGuide'],
    '/tools': ['nameGenerator', 'gearComparisonTool', 'gearSearch', 'lazyPages'],
    '/tools/compare': ['gearComparisonTool'],
    '/tools/metal-drummer-name-generator': ['nameGenerator'],
    '/tools/gear-search': ['gearSearch'],
    '/tools/kit-builder': ['lazyPages'],
    '/tools/bpm': ['lazyPages'],
    '/timeline': ['lazyPages', 'evolutionTimeline'],
    '/birthdays': ['lazyPages', 'birthdays'],
    '/quotes': ['lazyPages'],
    '/gear-stats': ['lazyPages'],
    '/vs': ['drummerComparisons'],
    '/techniques': ['techniques'],
    '/genres': ['genres'],
    '/lists': ['top10Lists'],
    '/articles': ['albumArticles'],
    '/cards': ['gearCards'],
    '/drummer/': ['extendedBios', 'bands'],
  };
  
  // Check for exact matches first
  if (routeModuleMap[normalizedRoute]) {
    return routeModuleMap[normalizedRoute];
  }
  
  // Check for prefix matches
  for (const [prefix, modules] of Object.entries(routeModuleMap)) {
    if (normalizedRoute.startsWith(prefix)) {
      return modules;
    }
  }
  
  return [];
}

/**
 * Setup hover-based preloading for navigation links
 * Call this once after initial render
 */
export function setupLinkPreloading() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }
  
  // Use event delegation on document
  document.addEventListener('mouseenter', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href && href.startsWith('/')) {
      preloadForRoute(href);
    }
  }, { passive: true, capture: true });
}

/**
 * Preload modules likely needed after initial render
 * Called during idle time after first paint
 */
export function preloadIdleModules() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }
  
  const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 2000));
  
  schedule(() => {
    // Preload commonly accessed secondary modules
    const priorityModules = [
      'extendedBios',    // Drummer detail pages
      'top10Lists',      // Lists section
    ];
    
    priorityModules.forEach((moduleKey, index) => {
      setTimeout(() => preloadModule(moduleKey), index * 500);
    });
  }, { timeout: 5000 });
}

/**
 * Check if a module has been preloaded
 * @param {string} moduleKey - Module key
 * @returns {boolean}
 */
export function isModulePreloaded(moduleKey) {
  return preloadedModules.has(moduleKey);
}

/**
 * Get preload statistics for debugging
 * @returns {Object}
 */
export function getPreloadStats() {
  return {
    preloaded: Array.from(preloadedModules),
    loading: Array.from(preloadingModules),
  };
}

export default {
  preloadModule,
  preloadForRoute,
  setupLinkPreloading,
  preloadIdleModules,
  isModulePreloaded,
  getPreloadStats,
};
