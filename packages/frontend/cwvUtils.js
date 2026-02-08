/**
 * Core Web Vitals Optimization Utilities
 * 
 * This module provides utilities to optimize:
 * - LCP (Largest Contentful Paint): Fast loading of hero content
 * - CLS (Cumulative Layout Shift): Stable layouts with reserved space
 * - INP (Interaction to Next Paint): Responsive interactions
 * 
 * @see https://web.dev/vitals/
 */

import { useCallback, useRef, useState, useEffect, startTransition } from 'react';
import { Platform } from 'react-native';

// ==========================================
// INP OPTIMIZATION: Debounce Hook
// ==========================================

/**
 * useDebounce - Debounce a value to reduce unnecessary updates
 * Helps INP by preventing rapid re-renders during user input
 * 
 * @param {any} value - Value to debounce
 * @param {number} delay - Debounce delay in ms (default: 150ms for search)
 * @returns {any} Debounced value
 */
export function useDebounce(value, delay = 150) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timerRef = useRef(null);

  useEffect(() => {
    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup on unmount or value change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useDebouncedCallback - Create a debounced callback function
 * Better for event handlers where you want to control the function call
 * 
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {Function} Debounced callback
 */
export function useDebouncedCallback(callback, delay = 150) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  // Update callback ref on each render
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);
}

// ==========================================
// INP OPTIMIZATION: Non-blocking State Updates
// ==========================================

/**
 * useNonBlockingState - State that uses startTransition for non-urgent updates
 * Helps INP by keeping the UI responsive during heavy state updates
 * 
 * @param {any} initialValue - Initial state value
 * @returns {[any, Function, boolean]} State, setter, and isPending flag
 */
export function useNonBlockingState(initialValue) {
  const [state, setState] = useState(initialValue);
  const [isPending, setIsPending] = useState(false);

  const setNonBlockingState = useCallback((value) => {
    setIsPending(true);
    startTransition(() => {
      setState(value);
      setIsPending(false);
    });
  }, []);

  return [state, setNonBlockingState, isPending];
}

/**
 * scheduleNonBlockingUpdate - Schedule a non-urgent update using startTransition
 * Use for filter changes, search updates, and other non-critical UI updates
 * 
 * @param {Function} updateFn - Function to run in transition
 */
export function scheduleNonBlockingUpdate(updateFn) {
  if (typeof startTransition === 'function') {
    startTransition(updateFn);
  } else {
    // Fallback for older React versions
    updateFn();
  }
}

// ==========================================
// CLS OPTIMIZATION: Layout Stability
// ==========================================

/**
 * Skeleton dimensions for common UI elements
 * Match these to actual component dimensions to prevent CLS
 */
export const SKELETON_DIMENSIONS = {
  // Drummer card skeleton
  drummerCard: {
    height: 80,
    marginBottom: 16,
    borderRadius: 12,
  },
  // Search bar skeleton
  searchBar: {
    height: 48,
    marginBottom: 16,
    borderRadius: 24,
  },
  // Filter bar skeleton
  filterBar: {
    height: 50,
    marginBottom: 16,
  },
  // Hero section skeleton
  heroSection: {
    height: 200,
    marginBottom: 24,
  },
  // Image placeholders with aspect ratios
  images: {
    thumbnail: { width: 60, height: 60 },
    card: { width: 200, height: 200 },
    hero: { width: '100%', aspectRatio: 16 / 9 },
    gallery: { width: 200, height: 150 },
  },
};

/**
 * Get placeholder style to reserve space and prevent CLS
 * 
 * @param {string} type - Type of skeleton ('drummerCard', 'searchBar', etc.)
 * @param {Object} customStyle - Additional custom styles
 * @returns {Object} Style object for placeholder
 */
export function getSkeletonStyle(type, customStyle = {}) {
  const base = SKELETON_DIMENSIONS[type] || {};
  return {
    ...base,
    backgroundColor: '#2a2a2a',
    ...customStyle,
  };
}

// ==========================================
// LCP OPTIMIZATION: Resource Hints
// ==========================================

/**
 * Preload critical resources programmatically
 * Use for dynamic content that becomes the LCP element
 * 
 * @param {string} url - URL to preload
 * @param {string} as - Resource type ('image', 'fetch', 'script', 'style')
 * @param {Object} options - Additional options
 */
export function preloadResource(url, as = 'image', options = {}) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  // Check if already preloaded
  const existingLink = document.querySelector(`link[href="${url}"]`);
  if (existingLink) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = as;

  if (options.crossOrigin) {
    link.crossOrigin = options.crossOrigin;
  }
  if (options.type) {
    link.type = options.type;
  }
  if (options.fetchPriority) {
    link.fetchPriority = options.fetchPriority;
  }

  document.head.appendChild(link);
}

/**
 * Preconnect to a domain for faster subsequent requests
 * 
 * @param {string} origin - Origin to preconnect to (e.g., 'https://api.example.com')
 */
export function preconnect(origin) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;

  const existingLink = document.querySelector(`link[rel="preconnect"][href="${origin}"]`);
  if (existingLink) return;

  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = origin;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

// ==========================================
// INP OPTIMIZATION: Event Handler Utilities
// ==========================================

/**
 * Create a passive event listener options object
 * Passive listeners improve scroll and touch performance
 * 
 * @param {boolean} passive - Whether to use passive mode (default: true)
 * @returns {Object} Event listener options
 */
export function getPassiveOptions(passive = true) {
  // Check for passive event listener support
  let supportsPassive = false;
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
          return true;
        }
      });
      window.addEventListener('testPassive', null, opts);
      window.removeEventListener('testPassive', null, opts);
    } catch (e) {
      supportsPassive = false;
    }
  }

  return supportsPassive ? { passive } : false;
}

/**
 * usePassiveEventListener - Add a passive event listener
 * 
 * @param {string} eventName - Event name
 * @param {Function} handler - Event handler
 * @param {Element} element - Target element (default: window)
 */
export function usePassiveEventListener(eventName, handler, element = null) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;

    const targetElement = element || window;
    const passiveOptions = getPassiveOptions(true);

    const eventListener = (event) => savedHandler.current(event);
    targetElement.addEventListener(eventName, eventListener, passiveOptions);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, passiveOptions);
    };
  }, [eventName, element]);
}

// ==========================================
// CLS OPTIMIZATION: Content Visibility
// ==========================================

/**
 * Get CSS for content-visibility optimization
 * Helps browser skip rendering of off-screen content
 * 
 * @param {string} containIntrinsicSize - Estimated size (e.g., '500px')
 * @returns {Object} CSS style object
 */
export function getContentVisibilityStyle(containIntrinsicSize = '500px') {
  if (Platform.OS !== 'web') return {};

  return {
    contentVisibility: 'auto',
    containIntrinsicSize: containIntrinsicSize,
  };
}

/**
 * Get CSS containment style for layout optimization
 * Helps browser isolate layout calculations
 * 
 * @param {string} type - Containment type ('content', 'layout', 'style', 'paint', 'size')
 * @returns {Object} CSS style object
 */
export function getContainmentStyle(type = 'content') {
  if (Platform.OS !== 'web') return {};

  return {
    contain: type,
  };
}

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

/**
 * Report Core Web Vitals to analytics
 * Use with web-vitals library for accurate measurements
 * 
 * @param {Object} metric - Web vital metric object
 */
export function reportWebVital(metric) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[CWV] ${metric.name}:`, metric.value, metric.rating);
  }

  // Send to analytics (Google Analytics 4)
  if (typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

/**
 * Initialize Core Web Vitals monitoring
 * Call this once on app load
 */
export async function initWebVitalsMonitoring() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;

  try {
    // Dynamic import to avoid bundle bloat
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');

    onCLS(reportWebVital);
    onINP(reportWebVital);
    onLCP(reportWebVital);
    onFCP(reportWebVital);
    onTTFB(reportWebVital);
  } catch (e) {
    // web-vitals not installed, skip monitoring
    console.warn('[CWV] web-vitals library not available');
  }
}

export default {
  useDebounce,
  useDebouncedCallback,
  useNonBlockingState,
  scheduleNonBlockingUpdate,
  SKELETON_DIMENSIONS,
  getSkeletonStyle,
  preloadResource,
  preconnect,
  getPassiveOptions,
  usePassiveEventListener,
  getContentVisibilityStyle,
  getContainmentStyle,
  reportWebVital,
  initWebVitalsMonitoring,
};
