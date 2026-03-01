/**
 * Spacing Design System for MetalForge.io
 * 
 * Issue #519: Create spacing tokens using an 8px grid system.
 * Issue #625: CRITICAL FIX - Use Object.defineProperty with non-enumerable getters
 * 
 * BACKGROUND: react-native-web throws "Failed to set indexed property [0]" 
 * when style objects contain numeric keys that get enumerated. Despite multiple 
 * attempts with String(), reduce(), Object.create(null), etc., Metro bundler 
 * keeps converting keys to numbers during optimization.
 * 
 * SOLUTION: Use Object.defineProperty with enumerable: false to prevent the
 * spacing object from exposing numeric keys during iteration/spreading.
 * 
 * 8px Grid Scale:
 * - 0: 0px    - No spacing
 * - 1: 4px    - Tight: inline elements, icon gaps
 * - 2: 8px    - Compact: between related items
 * - 3: 12px   - Default: standard gap
 * - 4: 16px   - Comfortable: section padding
 * - 5: 20px   - Relaxed: (prefer 24px when possible)
 * - 6: 24px   - Spacious: between sections
 * - 8: 32px   - Large: major section breaks
 * - 10: 40px  - XL: page sections
 * - 12: 48px  - XXL: hero padding
 */

// Create spacing object with non-enumerable properties
// Using numeric keys (not strings) since JS converts them anyway
// Setting enumerable: false prevents issues when object is spread/iterated
const _spacing = Object.create(null);

// Define each spacing value as non-enumerable to prevent CSS key iteration issues
Object.defineProperty(_spacing, 0, { value: 0, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 1, { value: 4, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 2, { value: 8, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 3, { value: 12, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 4, { value: 16, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 5, { value: 20, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 6, { value: 24, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 8, { value: 32, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 10, { value: 40, enumerable: false, configurable: false, writable: false });
Object.defineProperty(_spacing, 12, { value: 48, enumerable: false, configurable: false, writable: false });

export const spacing = _spacing;

// Semantic spacing aliases - use direct values
export const space = {
  // Component internal padding (inset)
  inset: {
    xs: 4,   // spacing[1]
    sm: 8,   // spacing[2]
    md: 12,  // spacing[3]
    lg: 16,  // spacing[4]
    xl: 24,  // spacing[6]
  },
  
  // Vertical spacing between elements (stack)
  stack: {
    xs: 4,   // spacing[1]
    sm: 8,   // spacing[2]
    md: 12,  // spacing[3]
    lg: 16,  // spacing[4]
    xl: 24,  // spacing[6]
  },
  
  // Horizontal spacing between elements (inline)
  inline: {
    xs: 4,   // spacing[1]
    sm: 8,   // spacing[2]
    md: 12,  // spacing[3]
    lg: 16,  // spacing[4]
  },
  
  // Page-level spacing
  page: {
    x: 16,   // spacing[4]
    y: 24,   // spacing[6]
    top: 32, // spacing[8]
  },
};

// Helper function to map arbitrary pixel values to nearest grid token
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

// Default export for convenient importing
export default {
  spacing,
  space,
  mapToGrid,
};
