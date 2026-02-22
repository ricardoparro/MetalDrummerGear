/**
 * Component Optimization Utilities
 * Issue #535 - Mobile Performance Score Below Target
 * 
 * Provides React component optimization patterns:
 * - Memoization helpers
 * - Render batching
 * - Component lazy loading
 */

import { memo, useMemo, useCallback, useRef, useEffect, useState } from 'react';
import { Platform } from 'react-native';

// ==========================================
// MEMOIZATION HELPERS
// ==========================================

/**
 * Create a stable equality function for props comparison
 */
export function createPropsComparator(keys) {
  return (prevProps, nextProps) => {
    for (const key of keys) {
      if (prevProps[key] !== nextProps[key]) {
        return false;
      }
    }
    return true;
  };
}

/**
 * Deep comparison for complex props
 */
export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== typeof obj2) return false;
  if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

/**
 * Create a memoized selector
 */
export function createSelector(inputSelectors, resultFn) {
  let lastInputs = null;
  let lastResult = null;

  return (...args) => {
    const inputs = inputSelectors.map(selector => selector(...args));
    
    if (lastInputs && inputs.every((input, i) => input === lastInputs[i])) {
      return lastResult;
    }

    lastInputs = inputs;
    lastResult = resultFn(...inputs);
    return lastResult;
  };
}

// ==========================================
// RENDER OPTIMIZATION HOOKS
// ==========================================

/**
 * Hook to track render count (development only)
 */
export function useRenderCount(componentName) {
  const countRef = useRef(0);
  countRef.current++;

  if (process.env.NODE_ENV === 'development') {
    useEffect(() => {
      console.log(`[Render] ${componentName}: ${countRef.current}`);
    });
  }

  return countRef.current;
}

/**
 * Hook for stable callbacks
 */
export function useStableCallback(callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);
}

/**
 * Hook to defer expensive computations
 */
export function useDeferredValue(computeFn, initialValue, deps = []) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    let cancelled = false;

    const compute = () => {
      if (cancelled) return;
      const result = computeFn();
      if (!cancelled) setValue(result);
    };

    if (Platform.OS === 'web' && typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(compute, { timeout: 1000 });
      return () => { cancelled = true; cancelIdleCallback(id); };
    } else {
      const id = setTimeout(compute, 0);
      return () => { cancelled = true; clearTimeout(id); };
    }
  }, deps);

  return value;
}

// ==========================================
// LIST OPTIMIZATION
// ==========================================

/**
 * Calculate visible items for virtualization
 */
export function getVisibleRange(scrollTop, containerHeight, itemHeight, itemCount, overscan = 3) {
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(itemCount - 1, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan);
  return { startIndex, endIndex };
}

/**
 * Hook for basic list virtualization
 */
export function useVirtualList(itemCount, itemHeight, containerHeight, scrollTop = 0) {
  return useMemo(() => {
    const { startIndex, endIndex } = getVisibleRange(scrollTop, containerHeight, itemHeight, itemCount);

    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push({
        index: i,
        style: {
          position: 'absolute',
          top: i * itemHeight,
          height: itemHeight,
          left: 0,
          right: 0,
        }
      });
    }

    return {
      items,
      totalHeight: itemCount * itemHeight,
      startIndex,
      endIndex
    };
  }, [itemCount, itemHeight, containerHeight, scrollTop]);
}

// ==========================================
// BATCH UPDATES
// ==========================================

/**
 * Batch multiple state updates together
 */
export function useBatchedState(initialState) {
  const [state, setState] = useState(initialState);
  const pendingUpdates = useRef([]);
  const isBatching = useRef(false);

  const batchUpdate = useCallback((updates) => {
    pendingUpdates.current.push(updates);

    if (!isBatching.current) {
      isBatching.current = true;

      Promise.resolve().then(() => {
        const allUpdates = pendingUpdates.current;
        pendingUpdates.current = [];
        isBatching.current = false;

        setState(prevState => {
          return allUpdates.reduce((acc, update) => {
            if (typeof update === 'function') {
              return { ...acc, ...update(acc) };
            }
            return { ...acc, ...update };
          }, prevState);
        });
      });
    }
  }, []);

  return [state, batchUpdate];
}

// ==========================================
// COMPONENT CACHING
// ==========================================

const componentCache = new Map();

export function getCachedComponent(key, createFn) {
  if (componentCache.has(key)) {
    return componentCache.get(key);
  }

  const component = createFn();
  componentCache.set(key, component);

  if (componentCache.size > 50) {
    const firstKey = componentCache.keys().next().value;
    componentCache.delete(firstKey);
  }

  return component;
}

export function clearComponentCache() {
  componentCache.clear();
}

// ==========================================
// INTERACTION OPTIMIZATION
// ==========================================

/**
 * Hook for optimized touch handling
 */
export function useOptimizedPress(onPress, options = {}) {
  const { delay = 0 } = options;
  const pressStartRef = useRef(null);

  const handlePressIn = useCallback(() => {
    pressStartRef.current = Date.now();
  }, []);

  const handlePressOut = useCallback(() => {
    if (!pressStartRef.current) return;

    const pressDuration = Date.now() - pressStartRef.current;
    const remainingDelay = Math.max(0, delay - pressDuration);

    if (remainingDelay > 0) {
      setTimeout(onPress, remainingDelay);
    } else {
      onPress();
    }

    pressStartRef.current = null;
  }, [onPress, delay]);

  return { onPressIn: handlePressIn, onPressOut: handlePressOut };
}

export default {
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
};
