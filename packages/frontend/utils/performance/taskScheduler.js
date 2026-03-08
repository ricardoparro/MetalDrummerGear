/**
 * Main Thread Task Scheduler - Issue #668
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
};
