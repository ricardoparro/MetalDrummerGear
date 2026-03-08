/**
 * Performance Optimization Utilities
 * Issues #666, #667, #668, #669 - Mobile Performance Optimization
 * 
 * Central export for all performance optimization utilities.
 * 
 * Targets:
 * - LCP < 2.5s (Issue #667)
 * - TBT < 200ms (Issue #668)
 * - SI < 3.4s (Issue #669)
 * - Performance Score >= 90 (Issue #666)
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

// Critical CSS optimization (Issue #667, #669)
export {
  CRITICAL_CSS,
  DEFERRED_CSS,
  injectCriticalCss,
  loadDeferredCss,
  addPreconnectHints,
  preloadLcpImage,
  initCriticalCss,
} from './criticalCss';

// Lazy route loading (Issue #666, #668)
export {
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
} from './lazyRoutes';

// Task scheduler for TBT optimization (Issue #668)
export {
  TaskPriority,
  yieldToMain,
  shouldYield,
  processInChunks,
  mapWithYield,
  filterWithYield,
  scheduleTask,
  getTaskQueueStats,
  batchDomUpdate,
  getSharedIntersectionObserver,
  observeElement,
  runIdleTasks,
  markTaskStart,
  markTaskEnd,
} from './taskScheduler';

/**
 * Initialize all performance optimizations
 * Call this at app startup for maximum performance gains
 */
export function initAllPerformanceOptimizations() {
  // Initialize critical CSS first (sync, non-blocking)
  import('./criticalCss').then(({ initCriticalCss }) => {
    initCriticalCss();
  });

  // Initialize critical path optimizations
  import('./criticalPath').then(({ initCriticalPathOptimizations }) => {
    initCriticalPathOptimizations();
  });
  
  // Initialize bundle optimization (deferred)
  import('./bundleOptimization').then(({ initBundleOptimization }) => {
    initBundleOptimization();
  });
}
