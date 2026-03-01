/**
 * Spacing Design System for MetalForge.io
 * 
 * EMERGENCY FIX: Use getter functions instead of object properties
 * to completely avoid any numeric key issues with react-native-web.
 */

// Core spacing values (8px grid)
const SPACING_VALUES = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
};

// Create spacing object with only string keys, no numeric enumeration
const spacingObj = {};
Object.keys(SPACING_VALUES).forEach(key => {
  Object.defineProperty(spacingObj, key, {
    value: SPACING_VALUES[key],
    enumerable: false,  // Prevent enumeration
    configurable: false,
    writable: false,
  });
});

// Export as frozen object
export const spacing = Object.freeze(spacingObj);

// Semantic spacing aliases - use direct values, not spacing references
export const space = {
  inset: {
    xs: 4,   // spacing[1]
    sm: 8,   // spacing[2]
    md: 12,  // spacing[3]
    lg: 16,  // spacing[4]
    xl: 24,  // spacing[6]
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
    x: 16,  // spacing[4]
    y: 24,  // spacing[6]
    top: 32, // spacing[8]
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

export default { spacing, space, mapToGrid };
