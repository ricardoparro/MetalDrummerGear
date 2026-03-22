/**
 * Deferred Initialization - Performance Optimization (Issue #751)
 * 
 * Delays non-critical initialization until after First Contentful Paint (FCP).
 * This reduces Total Blocking Time (TBT) and improves Time to Interactive (TTI).
 * 
 * Strategy:
 * 1. Critical path: Only load what's needed for initial render
 * 2. Post-FCP: Load analytics, feature flags, secondary UI
 * 3. Post-LCP: Preload likely next routes
 * 4. Idle time: Background preload heavy modules
 */

import { Platform } from 'react-native';
import { scheduleTask, TaskPriority, yieldToMain } from './taskScheduler';

// Track initialization stages
let initStage = 'pending';
let postFcpCallbacks = [];
let postLcpCallbacks = [];

/**
 * Schedule a callback to run after First Contentful Paint
 * @param {Function} callback 
 */
export function afterFcp(callback) {
  if (initStage === 'fcp_complete' || initStage === 'lcp_complete') {
    // Already past FCP, run immediately (but async)
    scheduleTask(callback, TaskPriority.BACKGROUND);
  } else {
    postFcpCallbacks.push(callback);
  }
}

/**
 * Schedule a callback to run after Largest Contentful Paint
 * @param {Function} callback 
 */
export function afterLcp(callback) {
  if (initStage === 'lcp_complete') {
    // Already past LCP, run immediately (but async)
    scheduleTask(callback, TaskPriority.BACKGROUND);
  } else {
    postLcpCallbacks.push(callback);
  }
}

/**
 * Run deferred post-FCP tasks
 */
async function runPostFcpTasks() {
  if (initStage !== 'pending') return;
  initStage = 'fcp_complete';
  
  // Process callbacks in small batches to avoid blocking
  for (let i = 0; i < postFcpCallbacks.length; i++) {
    try {
      postFcpCallbacks[i]();
    } catch (error) {
      console.error('[DeferredInit] Post-FCP task error:', error);
    }
    
    // Yield every few callbacks
    if (i > 0 && i % 3 === 0) {
      await yieldToMain();
    }
  }
  postFcpCallbacks = [];
}

/**
 * Run deferred post-LCP tasks
 */
async function runPostLcpTasks() {
  if (initStage !== 'fcp_complete') return;
  initStage = 'lcp_complete';
  
  // Process callbacks in small batches to avoid blocking
  for (let i = 0; i < postLcpCallbacks.length; i++) {
    try {
      postLcpCallbacks[i]();
    } catch (error) {
      console.error('[DeferredInit] Post-LCP task error:', error);
    }
    
    // Yield every few callbacks
    if (i > 0 && i % 3 === 0) {
      await yieldToMain();
    }
  }
  postLcpCallbacks = [];
}

/**
 * Initialize deferred loading system
 * Call this early in app initialization
 */
export function initDeferredLoading() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }
  
  // Detect FCP using PerformanceObserver
  if ('PerformanceObserver' in window) {
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            fcpObserver.disconnect();
            // Small delay to ensure paint is visible
            setTimeout(runPostFcpTasks, 50);
          }
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
      
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          // Run post-LCP tasks shortly after last LCP entry
          setTimeout(() => {
            lcpObserver.disconnect();
            runPostLcpTasks();
          }, 100);
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // Fallback: Use timing estimates
      console.warn('[DeferredInit] PerformanceObserver not available, using fallback');
      setTimeout(runPostFcpTasks, 500);
      setTimeout(runPostLcpTasks, 2000);
    }
  } else {
    // Fallback for older browsers
    setTimeout(runPostFcpTasks, 500);
    setTimeout(runPostLcpTasks, 2000);
  }
  
  // Also run on interaction (user engagement indicates page is usable)
  const interactionHandler = () => {
    if (initStage === 'pending') runPostFcpTasks();
    if (initStage === 'fcp_complete') runPostLcpTasks();
    document.removeEventListener('click', interactionHandler);
    document.removeEventListener('touchstart', interactionHandler);
    document.removeEventListener('scroll', interactionHandler);
  };
  
  document.addEventListener('click', interactionHandler, { passive: true, once: true });
  document.addEventListener('touchstart', interactionHandler, { passive: true, once: true });
  document.addEventListener('scroll', interactionHandler, { passive: true, once: true });
}

/**
 * Deferred preload of heavy modules
 * Called during idle time after initial render
 */
export function preloadHeavyModules() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return;
  }
  
  const schedule = window.requestIdleCallback || 
    ((cb) => setTimeout(cb, 1000));
  
  // Tier 1: Essential for common navigation
  schedule(() => {
    import('../../data/extendedBios').catch(() => {});
  }, { timeout: 5000 });
  
  // Tier 2: Secondary pages
  schedule(() => {
    import('../../data/top10Lists').catch(() => {});
    import('../../data/techniques').catch(() => {});
  }, { timeout: 10000 });
  
  // Tier 3: Rarely accessed
  schedule(() => {
    import('../../data/drummerComparisons').catch(() => {});
    import('../../data/gearComparisons').catch(() => {});
  }, { timeout: 15000 });
}

/**
 * Defer non-critical state updates
 * Wraps React state updates in startTransition
 */
export function deferStateUpdate(callback) {
  if (typeof window !== 'undefined' && window.React?.startTransition) {
    window.React.startTransition(callback);
  } else {
    callback();
  }
}

export default {
  afterFcp,
  afterLcp,
  initDeferredLoading,
  preloadHeavyModules,
  deferStateUpdate,
};
