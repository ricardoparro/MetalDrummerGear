/**
 * Bundle Optimization Utilities
 * Issue #535 - Mobile Performance Score Below Target
 * 
 * Optimizes bundle loading strategy:
 * - Intelligent code splitting
 * - Module preloading based on user behavior
 */

import { Platform } from 'react-native';

// ==========================================
// MODULE LOADING PRIORITIES
// ==========================================

export const MODULE_PRIORITY = {
  CRITICAL: 1,
  HIGH: 2,
  MEDIUM: 3,
  LOW: 4,
  BACKGROUND: 5,
};

export const MODULE_CONFIG = {
  extendedBios: {
    priority: MODULE_PRIORITY.LOW,
    loadFn: () => import('../../data/extendedBios'),
    triggerRoutes: ['/drummer/*/bio'],
  },
  techniques: {
    priority: MODULE_PRIORITY.LOW,
    loadFn: () => import('../../data/techniques'),
    triggerRoutes: ['/techniques', '/techniques/*'],
  },
  top10Lists: {
    priority: MODULE_PRIORITY.MEDIUM,
    loadFn: () => import('../../data/top10Lists'),
    triggerRoutes: ['/lists', '/lists/*'],
  },
  quizData: {
    priority: MODULE_PRIORITY.LOW,
    loadFn: () => import('../../data/quizData'),
    triggerRoutes: ['/quiz'],
  },
};

// ==========================================
// INTELLIGENT PREFETCHING
// ==========================================

const loadedModules = new Set();
const loadingModules = new Map();

export async function loadModule(moduleName) {
  if (loadedModules.has(moduleName)) {
    return loadingModules.get(moduleName);
  }

  const config = MODULE_CONFIG[moduleName];
  if (!config) {
    console.warn(`[Bundle] Unknown module: ${moduleName}`);
    return null;
  }

  if (loadingModules.has(moduleName)) {
    return loadingModules.get(moduleName);
  }

  const loadPromise = config.loadFn();
  loadingModules.set(moduleName, loadPromise);

  try {
    const module = await loadPromise;
    loadedModules.add(moduleName);
    return module;
  } catch (error) {
    console.error(`[Bundle] Failed to load module: ${moduleName}`, error);
    loadingModules.delete(moduleName);
    throw error;
  }
}

export function prefetchForRoute(currentPath) {
  if (Platform.OS !== 'web') return;

  const modulesToPrefetch = [];

  Object.entries(MODULE_CONFIG).forEach(([name, config]) => {
    if (loadedModules.has(name)) return;

    const isLikelyNeeded = config.triggerRoutes.some(route => {
      const pattern = route.replace(/\*/g, '.*');
      const regex = new RegExp(`^${pattern}$`);
      
      if (currentPath === '/') {
        return config.priority <= MODULE_PRIORITY.MEDIUM;
      }
      
      return false;
    });

    if (isLikelyNeeded) {
      modulesToPrefetch.push({ name, priority: config.priority });
    }
  });

  modulesToPrefetch
    .sort((a, b) => a.priority - b.priority)
    .forEach(({ name }) => {
      prefetchModule(name);
    });
}

export function prefetchModule(moduleName) {
  if (loadedModules.has(moduleName) || loadingModules.has(moduleName)) {
    return;
  }

  const prefetch = () => {
    loadModule(moduleName).catch(() => {});
  };

  if (Platform.OS === 'web' && typeof requestIdleCallback === 'function') {
    requestIdleCallback(prefetch, { timeout: 10000 });
  } else {
    setTimeout(prefetch, 2000);
  }
}

// ==========================================
// NAVIGATION PREDICTION
// ==========================================

const navigationHistory = [];
const navigationPatterns = new Map();

export function recordNavigation(fromPath, toPath) {
  navigationHistory.push({ from: fromPath, to: toPath, timestamp: Date.now() });

  while (navigationHistory.length > 100) {
    navigationHistory.shift();
  }

  const key = fromPath;
  if (!navigationPatterns.has(key)) {
    navigationPatterns.set(key, new Map());
  }
  
  const destinations = navigationPatterns.get(key);
  destinations.set(toPath, (destinations.get(toPath) || 0) + 1);
}

export function predictNextNavigation(currentPath) {
  const destinations = navigationPatterns.get(currentPath);
  if (!destinations) return null;

  let maxCount = 0;
  let likelyNext = null;

  destinations.forEach((count, path) => {
    if (count > maxCount) {
      maxCount = count;
      likelyNext = path;
    }
  });

  return likelyNext;
}

// ==========================================
// BUNDLE SIZE TRACKING
// ==========================================

export const MODULE_SIZES = {
  extendedBios: 550,
  techniques: 43,
  bands: 32,
  metalSongsBpm: 28,
  genres: 27,
  birthdays: 24,
  gearComparisons: 17,
  quizData: 14,
  top10Lists: 9,
};

export function calculateBundleSize(moduleNames) {
  return moduleNames.reduce((total, name) => {
    return total + (MODULE_SIZES[name] || 0);
  }, 0);
}

export function getLargeModules(threshold = 50) {
  return Object.entries(MODULE_SIZES)
    .filter(([_, size]) => size > threshold)
    .map(([name]) => name);
}

// ==========================================
// CACHE HEADERS
// ==========================================

export const CACHE_DURATIONS = {
  static: 31536000,
  api: 3600,
  html: 86400,
  images: 31536000,
};

export function getCacheControlHeader(resourceType) {
  const duration = CACHE_DURATIONS[resourceType] || CACHE_DURATIONS.api;
  
  if (resourceType === 'static' || resourceType === 'images') {
    return `public, max-age=${duration}, immutable`;
  }
  
  return `public, s-maxage=${duration}, stale-while-revalidate=${duration * 2}`;
}

// ==========================================
// INITIALIZATION
// ==========================================

export function initBundleOptimization() {
  if (Platform.OS !== 'web') return;

  setTimeout(() => {
    const currentPath = window.location.pathname;
    prefetchForRoute(currentPath);
  }, 3000);

  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest('a');
    if (link && link.href) {
      try {
        const url = new URL(link.href);
        if (url.origin === window.location.origin) {
          prefetchForRoute(url.pathname);
        }
      } catch (e) {}
    }
  }, { passive: true });
}

export default {
  MODULE_PRIORITY,
  MODULE_CONFIG,
  loadModule,
  prefetchForRoute,
  prefetchModule,
  recordNavigation,
  predictNextNavigation,
  MODULE_SIZES,
  calculateBundleSize,
  getLargeModules,
  CACHE_DURATIONS,
  getCacheControlHeader,
  initBundleOptimization,
};
