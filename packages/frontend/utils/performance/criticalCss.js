/**
 * Critical CSS Optimization - Issue #666, #667, #669, #810
 * 
 * Injects critical above-the-fold CSS to improve:
 * - LCP (Largest Contentful Paint) - faster first paint
 * - Speed Index - faster visual completeness
 * - Mobile Performance Score
 * - WCAG AA color contrast compliance (Issue #810)
 * 
 * This CSS is inlined in the <head> to avoid render-blocking.
 */

import { Platform } from 'react-native';

// Critical CSS for above-the-fold content
// Minified and optimized for mobile devices
export const CRITICAL_CSS = `
/* Critical Reset & Base */
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background:#0a0a0a;color:#fff}

/* Skeleton Animation - Prevents CLS */
@keyframes skeleton-pulse{0%{opacity:1}50%{opacity:.4}100%{opacity:1}}
.skeleton{background:linear-gradient(90deg,#2a2a2a 25%,#3a3a3a 50%,#2a2a2a 75%);background-size:200% 100%;animation:skeleton-pulse 1.5s ease-in-out infinite}

/* Hero Section - LCP Critical */
.hero-section{min-height:280px;padding:48px 20px 32px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#141414 0%,#0a0a0a 100%)}
.hero-title{font-size:28px;font-weight:700;text-align:center;margin:0 0 12px;color:#fff}
.hero-subtitle{font-size:16px;text-align:center;color:#9ca3af;margin:0 0 24px;max-width:400px}

/* Search Bar - Above Fold */
.search-container{width:100%;max-width:500px;position:relative}
.search-input{width:100%;height:48px;padding:0 48px 0 16px;border-radius:24px;border:1px solid #374151;background:#1f2937;color:#fff;font-size:16px;outline:none}
.search-input:focus{border-color:#dc2626;box-shadow:0 0 0 3px rgba(220,38,38,.2)}

/* Drummer Card Skeleton */
.card-skeleton{height:80px;border-radius:12px;margin-bottom:16px;background:#1f2937}

/* Spotlight Section */
.spotlight-section{min-height:280px;margin:0 16px 16px;border-radius:16px;background:#1f2937;padding:20px}
.spotlight-title{font-size:18px;font-weight:700;color:#fff;margin:0 0 16px}

/* Content Visibility - TBT Optimization */
.below-fold{content-visibility:auto;contain-intrinsic-size:auto 500px}

/* Reduce Motion for Performance */
@media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}

/* Mobile-First Grid */
.drummer-grid{display:flex;flex-direction:column;gap:16px;padding:0 16px}

/* Loading State */
.loading-spinner{width:40px;height:40px;border:3px solid #374151;border-top-color:#dc2626;border-radius:50%;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* LCP Image Hints */
img[fetchpriority="high"]{content-visibility:visible}

/* Font Display Optimization */
@font-face{font-family:system-ui;font-display:swap}
`.trim();

// Non-critical CSS loaded async
export const DEFERRED_CSS = `
/* Transitions - Not needed for first paint */
.card{transition:transform .2s ease,box-shadow .2s ease}
.card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.3)}

/* Expanded States */
.expanded-content{animation:fadeIn .3s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}

/* Filter Bar Animations */
.filter-dropdown{animation:slideDown .2s ease}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

/* Video Player */
.video-container{position:relative;overflow:hidden;border-radius:8px}
.video-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.4)}

/* Smooth Scrolling - Defer to reduce TBT */
html{scroll-behavior:smooth}
`.trim();

/**
 * Inject critical CSS into document head
 * Should be called ASAP in app initialization
 */
export function injectCriticalCss() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // Check if already injected
  if (document.querySelector('style[data-critical]')) return;

  const style = document.createElement('style');
  style.setAttribute('data-critical', 'true');
  style.textContent = CRITICAL_CSS;
  
  // Insert at the beginning of head for highest priority
  const firstChild = document.head.firstChild;
  if (firstChild) {
    document.head.insertBefore(style, firstChild);
  } else {
    document.head.appendChild(style);
  }
}

/**
 * Load non-critical CSS asynchronously
 * Called after LCP is complete
 */
export function loadDeferredCss() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // Check if already loaded
  if (document.querySelector('style[data-deferred]')) return;

  // Use requestIdleCallback for non-blocking load
  const load = () => {
    const style = document.createElement('style');
    style.setAttribute('data-deferred', 'true');
    style.textContent = DEFERRED_CSS;
    document.head.appendChild(style);
  };

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(load, { timeout: 2000 });
  } else {
    setTimeout(load, 100);
  }
}

/**
 * Add preconnect hints for external resources
 * Reduces connection time for critical third-party resources
 */
export function addPreconnectHints() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const origins = [
    'https://upload.wikimedia.org',  // Drummer images
    'https://metalforge.io',          // Self for API
    'https://i.ytimg.com',            // YouTube thumbnails
  ];

  origins.forEach(origin => {
    // Check if already exists
    if (document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    // Also add dns-prefetch as fallback
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = origin;
    document.head.appendChild(dnsPrefetch);
  });
}

/**
 * Preload LCP image
 * Should be called with the hero/spotlight drummer image
 */
export function preloadLcpImage(imageUrl) {
  if (Platform.OS !== 'web' || typeof document === 'undefined' || !imageUrl) return;

  // Check if already preloading
  if (document.querySelector(`link[rel="preload"][href="${imageUrl}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  link.fetchPriority = 'high';
  
  // Add type hint for WebP
  if (imageUrl.includes('.webp') || imageUrl.includes('format=webp')) {
    link.type = 'image/webp';
  }

  document.head.appendChild(link);
}

/**
 * Initialize all critical CSS optimizations
 * Call this at app startup
 */
export function initCriticalCss() {
  injectCriticalCss();
  addPreconnectHints();
  
  // Load deferred CSS after LCP
  if (typeof window !== 'undefined') {
    // Use LCP observer to time deferred CSS load
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(() => {
          loadDeferredCss();
          observer.disconnect();
        });
      });
      
      try {
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // Fallback: load after short delay
        setTimeout(loadDeferredCss, 1000);
      }
    } else {
      setTimeout(loadDeferredCss, 1000);
    }
  }
}

export default {
  CRITICAL_CSS,
  DEFERRED_CSS,
  injectCriticalCss,
  loadDeferredCss,
  addPreconnectHints,
  preloadLcpImage,
  initCriticalCss,
};
