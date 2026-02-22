/**
 * Performance Optimization Utilities
 * Issue #535 - Mobile Performance Score Below Target
 * 
 * Central export for all performance optimization utilities.
 */

// Critical path optimizations (LCP, TBT)
export {
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
} from './criticalPath';

// Component optimization hooks and utilities
export {
  createPropsComparator,
  deepEqual,
  createSelector,
  useRenderCount,
  useStableCallback,
  useDeferredValue,
  getVisibleRange,
  useVirtualList,
  useBatchedState,
  getCachedComponent,
  clearComponentCache,
  useOptimizedPress,
} from './componentOptimization';

// Bundle optimization and code splitting
export {
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
} from './bundleOptimization';

/**
 * Initialize all performance optimizations
 */
export function initAllPerformanceOptimizations() {
  import('./criticalPath').then(({ initCriticalPathOptimizations }) => {
    initCriticalPathOptimizations();
  });
  
  import('./bundleOptimization').then(({ initBundleOptimization }) => {
    initBundleOptimization();
  });
}
