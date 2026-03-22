/**
 * LCP (Largest Contentful Paint) Optimization Utilities
 * Issue #752 - Mobile LCP Above Target (2.8s vs 2.5s target)
 * 
 * Optimizations:
 * 1. Early spotlight data injection (eliminates API waterfall)
 * 2. Image size coordination (HTML preload matches React request)
 * 3. Cached srcset generation (reduces useMemo overhead)
 * 4. Deferred non-LCP initialization
 */

import { Platform } from 'react-native';

// ==========================================
// SPOTLIGHT IMAGE SIZES - MUST MATCH index.html
// ==========================================

/**
 * Spotlight image sizes used for preloading
 * These MUST match the sizes in index.html preload script
 * and the DrummerSpotlight component
 */
export const SPOTLIGHT_SIZES = {
  mobile: {
    width: 100,
    breakpoint: 479,  // max-width for mobile
    imageFile: '-100w.webp',
  },
  desktop: {
    width: 140,
    // For retina displays, we preload 200w
    imageFile: '-200w.webp',
  },
};

/**
 * Get the correct spotlight image URL for the current viewport
 * Ensures React requests the SAME image that HTML preloaded
 */
export function getSpotlightImageUrl(drummerSlug, isMobile = false) {
  if (!drummerSlug) return null;
  
  const size = isMobile ? SPOTLIGHT_SIZES.mobile : SPOTLIGHT_SIZES.desktop;
  return `/images/drummers/${drummerSlug}${size.imageFile}`;
}

/**
 * Get spotlight image props optimized for LCP
 * Returns width, height, and URL that match the preloaded resources
 */
export function getSpotlightImageProps(drummerSlug, isMobile = false) {
  const size = isMobile ? SPOTLIGHT_SIZES.mobile : SPOTLIGHT_SIZES.desktop;
  
  return {
    uri: getSpotlightImageUrl(drummerSlug, isMobile),
    width: size.width,
    height: size.width, // Square images
    fetchPriority: 'high',
    loading: 'eager',
    decoding: 'sync', // Sync decoding for LCP images
  };
}

// ==========================================
// SRCSET CACHE - Eliminate repeated useMemo
// ==========================================

const srcSetCache = new Map();
const MAX_CACHE_SIZE = 200;

/**
 * Get cached srcset for an image URL
 * Eliminates repeated string generation in useMemo
 */
export function getCachedSrcSet(imageUrl, widths = [100, 200, 400]) {
  if (!imageUrl) return '';
  
  const cacheKey = `${imageUrl}:${widths.join(',')}`;
  
  if (srcSetCache.has(cacheKey)) {
    return srcSetCache.get(cacheKey);
  }
  
  // Generate srcset
  const basePath = imageUrl.replace(/\.webp$/, '').replace(/-\d+w\.webp$/, '');
  const srcSet = widths.map(w => `${basePath}-${w}w.webp ${w}w`).join(', ');
  
  // Add to cache with size limit
  if (srcSetCache.size >= MAX_CACHE_SIZE) {
    const firstKey = srcSetCache.keys().next().value;
    srcSetCache.delete(firstKey);
  }
  srcSetCache.set(cacheKey, srcSet);
  
  return srcSet;
}

/**
 * Get cached local drummer image URL at specific width
 */
export function getCachedLocalImageUrl(imageUrl, targetWidth) {
  if (!imageUrl) return imageUrl;
  
  // Available widths: 100, 200, 400, original (~800)
  let width;
  if (targetWidth <= 100) width = 100;
  else if (targetWidth <= 200) width = 200;
  else if (targetWidth <= 400) width = 400;
  else return imageUrl; // Use original
  
  const basePath = imageUrl.replace(/\.webp$/, '').replace(/-\d+w\.webp$/, '');
  return `${basePath}-${width}w.webp`;
}

// ==========================================
// INLINE SPOTLIGHT DATA
// ==========================================

/**
 * Get inline spotlight data from window (injected by server)
 * This eliminates the API waterfall for initial spotlight load
 */
export function getInlineSpotlight() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  
  return window.__SPOTLIGHT_DATA__ || null;
}

/**
 * Check if spotlight data is available inline
 */
export function hasInlineSpotlight() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  
  return !!window.__SPOTLIGHT_DATA__;
}

// ==========================================
// LCP TIMING MARKERS
// ==========================================

/**
 * Mark LCP image as loaded for performance monitoring
 */
export function markLCPImageLoaded() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('lcp-image-loaded');
    
    // Measure from navigation start
    try {
      performance.measure('lcp-total', 'navigationStart', 'lcp-image-loaded');
    } catch (e) {
      // navigationStart may not be available in all contexts
    }
  }
}

/**
 * Report LCP timing to analytics
 */
export function reportLCPTiming() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  
  // Use PerformanceObserver to get actual LCP value
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry && typeof window.gtag === 'function') {
        window.gtag('event', 'lcp_timing', {
          event_category: 'Web Vitals',
          event_label: lastEntry.element?.tagName || 'unknown',
          value: Math.round(lastEntry.startTime),
          non_interaction: true,
        });
      }
      
      observer.disconnect();
    });
    
    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // LCP observation not supported
    }
  }
}

// ==========================================
// DEFERRED INITIALIZATION
// ==========================================

const deferredTasks = [];
let lcpComplete = false;

/**
 * Queue a task to run after LCP is complete
 * Prevents non-critical work from blocking LCP paint
 */
export function runAfterLCP(task) {
  if (lcpComplete) {
    // LCP already done, run immediately in idle time
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(task, { timeout: 2000 });
    } else {
      setTimeout(task, 50);
    }
  } else {
    deferredTasks.push(task);
  }
}

/**
 * Signal that LCP is complete and run deferred tasks
 */
export function signalLCPComplete() {
  if (lcpComplete) return;
  lcpComplete = true;
  
  // Run deferred tasks with idle scheduling
  const runNextTask = () => {
    if (deferredTasks.length === 0) return;
    
    const task = deferredTasks.shift();
    try {
      task();
    } catch (e) {
      console.error('[LCP] Deferred task error:', e);
    }
    
    if (deferredTasks.length > 0) {
      if (typeof requestIdleCallback === 'function') {
        requestIdleCallback(runNextTask, { timeout: 1000 });
      } else {
        setTimeout(runNextTask, 16);
      }
    }
  };
  
  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(runNextTask, { timeout: 500 });
  } else {
    setTimeout(runNextTask, 50);
  }
}

/**
 * Initialize LCP monitoring and auto-signal completion
 */
export function initLCPMonitoring() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  
  // Signal LCP complete when observed
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver(() => {
      signalLCPComplete();
      observer.disconnect();
    });
    
    try {
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // Fallback: signal after timeout
      setTimeout(signalLCPComplete, 3000);
    }
  } else {
    // Fallback for browsers without PerformanceObserver
    setTimeout(signalLCPComplete, 2500);
  }
  
  // Also start LCP timing report
  reportLCPTiming();
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize all LCP optimizations
 * Call this early in app bootstrap
 */
export function initLCPOptimizations() {
  if (Platform.OS !== 'web') return;
  
  initLCPMonitoring();
  
  // Clear srcset cache periodically to prevent memory bloat
  setInterval(() => {
    if (srcSetCache.size > MAX_CACHE_SIZE / 2) {
      srcSetCache.clear();
    }
  }, 60000);
}

export default {
  SPOTLIGHT_SIZES,
  getSpotlightImageUrl,
  getSpotlightImageProps,
  getCachedSrcSet,
  getCachedLocalImageUrl,
  getInlineSpotlight,
  hasInlineSpotlight,
  markLCPImageLoaded,
  reportLCPTiming,
  runAfterLCP,
  signalLCPComplete,
  initLCPMonitoring,
  initLCPOptimizations,
};
