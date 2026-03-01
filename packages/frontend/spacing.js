/**
 * Spacing Design System for MetalForge.io
 * 
 * Issue #626: EMERGENCY FIX - Use simple function to completely avoid numeric keys
 * 
 * The issue: react-native-web's style processing throws errors when it encounters
 * objects with numeric keys. Even with non-enumerable properties, something in the
 * bundler or runtime is still creating numeric keys.
 * 
 * Solution: Replace the spacing object entirely with a function call pattern.
 * Instead of spacing[12], use spacing(12). This completely avoids any object
 * property access that could have numeric keys.
 */

// Simple function that returns spacing values
// No object with numeric keys - just a switch statement
function getSpacing(n) {
  switch (n) {
    case 0: return 0;
    case 1: return 4;
    case 2: return 8;
    case 3: return 12;
    case 4: return 16;
    case 5: return 20;
    case 6: return 24;
    case 8: return 32;
    case 10: return 40;
    case 12: return 48;
    default: return 0;
  }
}

// Export a callable that also works with bracket notation
// We use a Proxy that intercepts both function calls and property access
const spacingHandler = {
  get(target, prop) {
    if (typeof prop === 'symbol') return undefined;
    const num = parseInt(prop, 10);
    if (!isNaN(num)) {
      return getSpacing(num);
    }
    return undefined;
  },
  apply(target, thisArg, args) {
    return getSpacing(args[0]);
  },
  // Critical: prevent enumeration of any numeric keys
  ownKeys() {
    return [];
  },
  getOwnPropertyDescriptor() {
    return undefined;
  },
  has() {
    return false;
  }
};

// Create a callable proxy
function spacingFn(n) {
  return getSpacing(n);
}
export const spacing = new Proxy(spacingFn, spacingHandler);

// Semantic spacing aliases - use hardcoded values
export const space = {
  inset: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  stack: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  inline: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
  },
  page: {
    x: 16,
    y: 24,
    top: 32,
  },
};

// Helper function
export function mapToGrid(pixelValue) {
  if (pixelValue <= 2) return 0;
  if (pixelValue <= 6) return 1;
  if (pixelValue <= 10) return 2;
  if (pixelValue <= 14) return 3;
  if (pixelValue <= 18) return 4;
  if (pixelValue <= 22) return 5;
  if (pixelValue <= 28) return 6;
  if (pixelValue <= 36) return 8;
  if (pixelValue <= 44) return 10;
  return 12;
}

export default {
  spacing,
  space,
  mapToGrid,
};
