/**
 * Main Thread Task Scheduler - Issue #668, #753
 * 
 * Breaks up long main-thread tasks to reduce TBT (Total Blocking Time).
 * 
 * Problem: Tasks > 50ms block the main thread and hurt INP/TBT metrics.
 * Solution: Use scheduler.yield() or requestIdleCallback to break tasks.
 * 
 * Key optimizations:
 * - Yield control between heavy operations
 * - Prioritize user input over background work
 * - Batch DOM operations
 * - Progressive preloading with configurable delays (Issue #753)
 * 
 * Issue #753 enhancements:
 * - Added `deferToNextFrame` for guaranteed main thread yields
 * - Added `runProgressiveIdleTasks` for staggered preloading
 * - Added `createTaskBreaker` for automatic long task splitting
 */

import { Platform } from 'react-native';

// ==========================================
// TASK PRIORITY LEVELS
// ==========================================

export const TaskPriority = {
  USER_BLOCKING: 1,  // User input, clicks, navigation
  USER_VISIBLE: 2,   // Visible UI updates
  BACKGROUND: 3,     // Analytics, preloading, cleanup
};

// ==========================================
// YIELD UTILITIES
// ==========================================

/**
 * Yield control to the browser to allow input processing
 * Uses scheduler.yield() if available, falls back to setTimeout
 */
export async function yieldToMain() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return Promise.resolve();
  }

  // Use modern scheduler.yield() if available (Chrome 115+)
  if ('scheduler' in window && 'yield' in window.scheduler) {
    return window.scheduler.yield();
  }

  // Fallback: Use setTimeout(0) which yields to the event loop
  return new Promise(resolve => setTimeout(resolve, 0));
}

/**
 * Check if we should yield based on time elapsed
 * Yields if more than 40ms has passed (leaving 10ms buffer before 50ms threshold)
 */
export function shouldYield(startTime) {
  if (Platform.OS !== 'web' || typeof performance === 'undefined') {
    return false;
  }
  return performance.now() - startTime > 40;
}

// ==========================================
// CHUNKED ITERATION
// ==========================================

/**
 * Process an array in chunks, yielding between chunks to avoid long tasks
 * 
 * @param {Array} items - Array to process
 * @param {Function} processFn - Function to call for each item
 * @param {Object} options - Configuration options
 * @returns {Promise} Resolves when all items are processed
 * 
 * @example
 * await processInChunks(drummers, (drummer) => {
 *   renderDrummerCard(drummer);
 * }, { chunkSize: 10 });
 */
export async function processInChunks(items, processFn, options = {}) {
  const { 
    chunkSize = 10,
    yieldInterval = 40, // ms
    onProgress = null,
  } = options;

  if (!items || items.length === 0) return [];

  const results = [];
  let startTime = performance?.now?.() || Date.now();

  for (let i = 0; i < items.length; i++) {
    results.push(processFn(items[i], i, items));

    // Check if we need to yield
    const now = performance?.now?.() || Date.now();
    if (now - startTime > yieldInterval) {
      // Report progress if callback provided
      if (onProgress) {
        onProgress(i + 1, items.length);
      }

      // Yield to allow user input
      await yieldToMain();
      startTime = now;
    }
  }

  return results;
}

/**
 * Map over array with yielding
 */
export async function mapWithYield(items, mapFn, options = {}) {
  return processInChunks(items, mapFn, options);
}

/**
 * Filter array with yielding
 */
export async function filterWithYield(items, filterFn, options = {}) {
  const results = [];
  await processInChunks(items, (item, index) => {
    if (filterFn(item, index, items)) {
      results.push(item);
    }
  }, options);
  return results;
}

// ==========================================
// PRIORITY TASK QUEUE
// ==========================================

class TaskQueue {
  constructor() {
    this.queues = {
      [TaskPriority.USER_BLOCKING]: [],
      [TaskPriority.USER_VISIBLE]: [],
      [TaskPriority.BACKGROUND]: [],
    };
    this.isProcessing = false;
  }

  /**
   * Add a task to the queue
   */
  enqueue(task, priority = TaskPriority.BACKGROUND) {
    this.queues[priority].push(task);
    this.processQueue();
  }

  /**
   * Process tasks in priority order
   */
  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const processNextTask = async () => {
      // Find highest priority task
      let task = null;
      for (const priority of [TaskPriority.USER_BLOCKING, TaskPriority.USER_VISIBLE, TaskPriority.BACKGROUND]) {
        if (this.queues[priority].length > 0) {
          task = this.queues[priority].shift();
          break;
        }
      }

      if (!task) {
        this.isProcessing = false;
        return;
      }

      try {
        await task();
      } catch (e) {
        console.error('[TaskQueue] Task failed:', e);
      }

      // Yield between tasks
      await yieldToMain();

      // Continue processing
      processNextTask();
    };

    processNextTask();
  }

  /**
   * Get queue lengths for monitoring
   */
  getStats() {
    return {
      userBlocking: this.queues[TaskPriority.USER_BLOCKING].length,
      userVisible: this.queues[TaskPriority.USER_VISIBLE].length,
      background: this.queues[TaskPriority.BACKGROUND].length,
      isProcessing: this.isProcessing,
    };
  }
}

// Singleton task queue
const globalTaskQueue = new TaskQueue();

/**
 * Schedule a task with priority
 */
export function scheduleTask(task, priority = TaskPriority.BACKGROUND) {
  globalTaskQueue.enqueue(task, priority);
}

/**
 * Get task queue stats
 */
export function getTaskQueueStats() {
  return globalTaskQueue.getStats();
}

// ==========================================
// DOM BATCHING
// ==========================================

let pendingDomUpdates = [];
let domBatchScheduled = false;

/**
 * Batch DOM updates to reduce layout thrashing
 * Groups multiple updates into a single animation frame
 */
export function batchDomUpdate(updateFn) {
  pendingDomUpdates.push(updateFn);

  if (!domBatchScheduled) {
    domBatchScheduled = true;
    requestAnimationFrame(() => {
      const updates = pendingDomUpdates;
      pendingDomUpdates = [];
      domBatchScheduled = false;

      // Execute all updates in one batch
      updates.forEach(fn => {
        try {
          fn();
        } catch (e) {
          console.error('[DOMBatch] Update failed:', e);
        }
      });
    });
  }
}

// ==========================================
// INTERSECTION OBSERVER BATCHING
// ==========================================

let observerCallbacks = new Map();
let sharedObserver = null;

/**
 * Get shared IntersectionObserver for lazy loading
 * Reduces overhead of multiple observers
 */
export function getSharedIntersectionObserver(options = {}) {
  if (Platform.OS !== 'web' || typeof IntersectionObserver === 'undefined') {
    return null;
  }

  const key = JSON.stringify(options);
  if (!sharedObserver) {
    sharedObserver = new Map();
  }

  if (!sharedObserver.has(key)) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const callback = observerCallbacks.get(entry.target);
        if (callback) {
          callback(entry);
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.1,
      ...options,
    });

    sharedObserver.set(key, observer);
  }

  return sharedObserver.get(key);
}

/**
 * Observe an element with the shared observer
 */
export function observeElement(element, callback, options = {}) {
  const observer = getSharedIntersectionObserver(options);
  if (!observer) return () => {};

  observerCallbacks.set(element, callback);
  observer.observe(element);

  return () => {
    observer.unobserve(element);
    observerCallbacks.delete(element);
  };
}

// ==========================================
// IDLE DEADLINE CHECKING
// ==========================================

/**
 * Run tasks during idle time with deadline checking
 * Pauses if deadline is reached to avoid jank
 */
export function runIdleTasks(tasks, onComplete) {
  if (Platform.OS !== 'web' || typeof requestIdleCallback === 'undefined') {
    // Fallback: run all tasks with small delay
    tasks.forEach((task, i) => setTimeout(task, i * 16));
    if (onComplete) setTimeout(onComplete, tasks.length * 16);
    return;
  }

  let index = 0;

  const processNext = (deadline) => {
    while (index < tasks.length && deadline.timeRemaining() > 1) {
      try {
        tasks[index]();
      } catch (e) {
        console.error('[IdleTasks] Task failed:', e);
      }
      index++;
    }

    if (index < tasks.length) {
      // More tasks remain, schedule next batch
      requestIdleCallback(processNext, { timeout: 1000 });
    } else if (onComplete) {
      onComplete();
    }
  };

  requestIdleCallback(processNext, { timeout: 2000 });
}

// ==========================================
// PERFORMANCE MARK HELPERS
// ==========================================

/**
 * Create a performance mark for measuring task duration
 */
export function markTaskStart(name) {
  if (Platform.OS === 'web' && typeof performance !== 'undefined') {
    performance.mark(`${name}-start`);
  }
}

/**
 * End a performance mark and measure duration
 */
export function markTaskEnd(name) {
  if (Platform.OS === 'web' && typeof performance !== 'undefined') {
    performance.mark(`${name}-end`);
    try {
      performance.measure(name, `${name}-start`, `${name}-end`);
      const entries = performance.getEntriesByName(name);
      const duration = entries[entries.length - 1]?.duration;
      
      // Warn if task exceeded 50ms (long task)
      if (duration > 50) {
        console.warn(`[Performance] Long task detected: ${name} took ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    } catch (e) {
      // Marks might not exist
      return null;
    }
  }
  return null;
}

// ==========================================
// ISSUE #753: PROGRESSIVE PRELOADING
// ==========================================

/**
 * Defer execution to next animation frame + microtask
 * Guarantees the main thread is freed between tasks
 * More reliable than setTimeout(0) for breaking up long tasks
 */
export function deferToNextFrame() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return Promise.resolve();
  }
  
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      // Use setTimeout to yield after paint
      setTimeout(resolve, 0);
    });
  });
}

/**
 * Run tasks progressively with configurable delays between them
 * This is more aggressive than runIdleTasks for reducing TBT
 * 
 * @param {Array<Function>} tasks - Tasks to execute
 * @param {Object} options - Configuration
 * @param {number} options.delayBetweenTasks - Minimum ms between tasks (default: 50)
 * @param {number} options.maxTaskDuration - Max ms per task before forced yield (default: 40)
 * @param {Function} options.onProgress - Progress callback (tasksCompleted, totalTasks)
 * @param {Function} options.onComplete - Called when all tasks complete
 * 
 * @example
 * runProgressiveIdleTasks([
 *   () => preloadBands(),
 *   () => preloadGenres(),
 *   () => preloadBirthdays(),
 * ], {
 *   delayBetweenTasks: 100, // 100ms between each preload
 *   onComplete: () => console.log('All preloads done')
 * });
 */
export function runProgressiveIdleTasks(tasks, options = {}) {
  const {
    delayBetweenTasks = 50,
    maxTaskDuration = 40,
    onProgress = null,
    onComplete = null,
  } = options;

  if (!tasks || tasks.length === 0) {
    if (onComplete) onComplete();
    return;
  }

  // Clone tasks array
  const taskQueue = [...tasks];
  let completedCount = 0;
  const totalTasks = tasks.length;

  const processNext = () => {
    if (taskQueue.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    const executeTask = () => {
      const task = taskQueue.shift();
      const startTime = performance?.now?.() || Date.now();
      
      try {
        const result = task();
        
        // Handle async tasks
        if (result && typeof result.then === 'function') {
          result.then(() => {
            completedCount++;
            if (onProgress) onProgress(completedCount, totalTasks);
            scheduleNext();
          }).catch(err => {
            console.warn('[ProgressiveIdle] Task failed:', err);
            completedCount++;
            scheduleNext();
          });
        } else {
          completedCount++;
          if (onProgress) onProgress(completedCount, totalTasks);
          scheduleNext();
        }
      } catch (err) {
        console.warn('[ProgressiveIdle] Task failed:', err);
        completedCount++;
        scheduleNext();
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback((deadline) => {
        // Only execute if we have time
        if (deadline.timeRemaining() > 10 || deadline.didTimeout) {
          executeTask();
        } else {
          // Reschedule
          processNext();
        }
      }, { timeout: 2000 });
    } else {
      setTimeout(executeTask, delayBetweenTasks);
    }
  };

  const scheduleNext = () => {
    // Use deferToNextFrame for guaranteed main thread break
    if (Platform.OS === 'web' && typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        setTimeout(processNext, delayBetweenTasks);
      });
    } else {
      setTimeout(processNext, delayBetweenTasks);
    }
  };

  // Start with a small delay to let initial render complete
  setTimeout(processNext, 100);
}

/**
 * Create a task breaker that automatically yields when execution time exceeds threshold
 * Useful for wrapping loops or heavy computations
 * 
 * @param {Object} options
 * @param {number} options.maxDuration - Max ms before yielding (default: 40)
 * @returns {Object} Task breaker with check() and reset() methods
 * 
 * @example
 * const breaker = createTaskBreaker();
 * for (const item of largeArray) {
 *   processItem(item);
 *   if (await breaker.check()) {
 *     // Yielded to main thread
 *   }
 * }
 */
export function createTaskBreaker(options = {}) {
  const { maxDuration = 40 } = options;
  let startTime = performance?.now?.() || Date.now();
  let yieldCount = 0;

  return {
    /**
     * Check if we should yield, and yield if necessary
     * Returns true if we yielded
     */
    async check() {
      const now = performance?.now?.() || Date.now();
      if (now - startTime > maxDuration) {
        await yieldToMain();
        startTime = performance?.now?.() || Date.now();
        yieldCount++;
        return true;
      }
      return false;
    },

    /**
     * Reset the timer (call after a natural break point)
     */
    reset() {
      startTime = performance?.now?.() || Date.now();
    },

    /**
     * Get stats for monitoring
     */
    getStats() {
      return { yieldCount };
    }
  };
}

/**
 * Wrap a function to automatically break long tasks
 * The wrapped function will yield to main thread every maxDuration ms
 * 
 * @param {Function} fn - Function that may take a long time
 * @param {Object} options - Configuration
 * @returns {Function} Wrapped function that yields periodically
 */
export function withTaskBreaking(fn, options = {}) {
  const { maxDuration = 40, onYield = null } = options;

  return async function(...args) {
    const startTime = performance?.now?.() || Date.now();
    const result = fn.apply(this, args);

    // Check if the function took too long
    const duration = (performance?.now?.() || Date.now()) - startTime;
    if (duration > maxDuration) {
      if (onYield) onYield(duration);
      await yieldToMain();
    }

    return result;
  };
}

/**
 * Schedule a preload after Time to Interactive (TTI)
 * Waits for the page to be fully interactive before starting preloads
 * 
 * @param {Function|Array<Function>} preloadTasks - Task(s) to run after TTI
 * @param {Object} options - Configuration
 */
export function scheduleAfterTTI(preloadTasks, options = {}) {
  const {
    minDelay = 500,  // Minimum delay after load
    useProgressiveLoading = true,
    delayBetweenTasks = 100,
  } = options;

  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    // Non-web: execute immediately
    const tasks = Array.isArray(preloadTasks) ? preloadTasks : [preloadTasks];
    tasks.forEach(t => t());
    return;
  }

  const startPreloading = () => {
    const tasks = Array.isArray(preloadTasks) ? preloadTasks : [preloadTasks];
    
    if (useProgressiveLoading) {
      runProgressiveIdleTasks(tasks, { delayBetweenTasks });
    } else {
      runIdleTasks(tasks);
    }
  };

  // Wait for page to be interactive
  if (document.readyState === 'complete') {
    // Page already loaded, add small delay
    setTimeout(startPreloading, minDelay);
  } else {
    // Wait for load event
    window.addEventListener('load', () => {
      setTimeout(startPreloading, minDelay);
    }, { once: true });
  }
}

export default {
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
  // Issue #753 additions
  deferToNextFrame,
  runProgressiveIdleTasks,
  createTaskBreaker,
  withTaskBreaking,
  scheduleAfterTTI,
};
