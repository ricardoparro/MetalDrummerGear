/**
 * Critical Path Optimization Utilities
 * Issue #535 - Mobile Performance Score Below Target
 * 
 * Optimizes:
 * - LCP (Largest Contentful Paint): Fast loading of hero content
 * - TBT (Total Blocking Time): Reduced JS execution on main thread
 * - Bundle size: Deferred loading of non-critical resources
 */

import { Platform } from 'react-native';

// ==========================================
// RESOURCE PRIORITIZATION
// ==========================================

/**
 * Inject critical resource hints into document head
 * Called early in the render cycle for fastest loading
 */
export function injectCriticalResourceHints() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // Preconnect to CDN and API origins for faster subsequent requests
  const preconnectOrigins = [
    'https://metalforge.io',
    'https://upload.wikimedia.org',  // Wikipedia images
    'https://i.ytimg.com',           // YouTube thumbnails
  ];

  preconnectOrigins.forEach(origin => {
    if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });

  // DNS prefetch for analytics (non-critical)
  const dnsPrefetchOrigins = [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ];

  dnsPrefetchOrigins.forEach(origin => {
    if (!document.querySelector(`link[rel="dns-prefetch"][href="${origin}"]`)) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = origin;
      document.head.appendChild(link);
    }
  });
}

/**
 * Preload the LCP candidate image
 * Called when we know which image will be the LCP element
 */
export function preloadLCPImage(imageUrl, sizes = '100vw') {
  if (Platform.OS !== 'web' || typeof document === 'undefined' || !imageUrl) return;

  // Check if already preloaded
  if (document.querySelector(`link[rel="preload"][href="${imageUrl}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  link.fetchPriority = 'high';
  
  if (sizes) {
    link.setAttribute('imagesizes', sizes);
  }

  document.head.appendChild(link);
}

// ==========================================
// SCRIPT DEFERRAL - TBT OPTIMIZATION
// ==========================================

/**
 * Defer non-critical work to after main thread is idle
 * Reduces TBT by breaking up long tasks
 */
export function deferToIdle(callback, options = {}) {
  const { timeout = 5000 } = options;

  if (Platform.OS !== 'web') {
    setTimeout(callback, 0);
    return;
  }

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 1);
  }
}

/**
 * Queue a deferred task
 */
const deferredQueue = [];
let isDeferredProcessing = false;

export function queueDeferredTask(callback) {
  deferredQueue.push(callback);
  
  if (!isDeferredProcessing) {
    isDeferredProcessing = true;
    deferToIdle(processDeferredQueue);
  }
}

function processDeferredQueue() {
  if (deferredQueue.length === 0) {
    isDeferredProcessing = false;
    return;
  }

  const task = deferredQueue.shift();
  try {
    task();
  } catch (e) {
    console.error('[Performance] Deferred task error:', e);
  }

  deferToIdle(processDeferredQueue);
}

// ==========================================
// CHUNK LOADING OPTIMIZATION
// ==========================================

const preloadedChunks = new Set();

/**
 * Preload a dynamic import chunk
 */
export function preloadChunk(importFn) {
  deferToIdle(() => {
    importFn().catch(() => {});
  });
}

/**
 * Preload a chunk only once
 */
export function preloadChunkOnce(key, importFn) {
  if (preloadedChunks.has(key)) return;
  preloadedChunks.add(key);
  preloadChunk(importFn);
}

// ==========================================
// INTERSECTION OBSERVER OPTIMIZATION
// ==========================================

/**
 * Create an optimized intersection observer
 */
export function createOptimizedObserver(callback, options = {}) {
  if (Platform.OS !== 'web' || typeof IntersectionObserver === 'undefined') {
    return null;
  }

  const defaultOptions = {
    rootMargin: '100px',
    threshold: 0,
  };

  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// ==========================================
// RENDER SCHEDULING
// ==========================================

let pendingRenderCallbacks = [];
let isRenderScheduled = false;

export function scheduleRender(callback) {
  pendingRenderCallbacks.push(callback);

  if (!isRenderScheduled) {
    isRenderScheduled = true;
    
    if (Platform.OS === 'web' && typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        const callbacks = pendingRenderCallbacks;
        pendingRenderCallbacks = [];
        isRenderScheduled = false;
        callbacks.forEach(cb => cb());
      });
    } else {
      setTimeout(() => {
        const callbacks = pendingRenderCallbacks;
        pendingRenderCallbacks = [];
        isRenderScheduled = false;
        callbacks.forEach(cb => cb());
      }, 0);
    }
  }
}

// ==========================================
// MEMORY OPTIMIZATION
// ==========================================

/**
 * Create a simple cache with size limit
 */
export function createWeakCache() {
  const cache = new Map();
  
  return {
    get(key) { return cache.get(key); },
    set(key, value) {
      cache.set(key, value);
      if (cache.size > 100) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
    },
    has(key) { return cache.has(key); },
    clear() { cache.clear(); }
  };
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize critical path optimizations
 */
export function initCriticalPathOptimizations() {
  if (Platform.OS !== 'web') return;
  injectCriticalResourceHints();
  
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('app-init-start');
  }
}

export default {
  injectCriticalResourceHints,
  preloadLCPImage,
  deferToIdle,
  queueDeferredTask,
  preloadChunk,
  preloadChunkOnce,
  createOptimizedObserver,
  scheduleRender,
  createWeakCache,
  initCriticalPathOptimizations,
};
