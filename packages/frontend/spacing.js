/**
 * Spacing Design System for MetalForge.io
 * 
 * Issue #519: Create spacing tokens using an 8px grid system.
 * Issue #601: Use string keys to avoid CSS error with react-native-web
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
 * 
 * Migration Reference:
 * Old Value → New Token
 * ----------------------
 * 4px       → spacing[1]
 * 6px       → spacing[2] (round up)
 * 8px       → spacing[2]
 * 10px      → spacing[3] (round up to 12)
 * 12px      → spacing[3]
 * 14px      → spacing[4] (round up to 16)
 * 15px      → spacing[4] (round up to 16)
 * 16px      → spacing[4]
 * 20px      → spacing[5] or spacing[6] (prefer 24)
 * 24px      → spacing[6]
 * 30px      → spacing[8] (round to 32)
 * 32px      → spacing[8]
 * 40px      → spacing[10]
 * 48px      → spacing[12]
 */

// Core spacing scale (8px grid)
// CRITICAL FIX for #608: Use Object.defineProperty to create string keys at runtime.
// Metro/Babel bundler aggressively converts numeric-looking keys ('0', '1', etc.) to
// actual numeric keys (0, 1, etc.) during optimization. This causes the error:
// "Failed to set indexed property [0] on CSSStyleDeclaration"
// in react-native-web because numeric keys aren't valid CSS property names.
//
// SOLUTION: Use Object.defineProperty() which cannot be statically optimized because
// the property name comes from a runtime function call (String()). The bundler cannot
// know at compile time that String(0) === '0', so it won't convert the key.
// (Issue #591, #596, #600, #601, #605, #608)
const _createSpacingScale = () => {
  const scale = Object.create(null);
  const values = [[0, 0], [1, 4], [2, 8], [3, 12], [4, 16], [5, 20], [6, 24], [8, 32], [10, 40], [12, 48]];
  for (const [key, value] of values) {
    Object.defineProperty(scale, String(key), {
      value: value,
      enumerable: true,
      writable: false,
      configurable: false
    });
  }
  return scale;
};
export const spacing = _createSpacingScale();

// Semantic spacing aliases
export const space = {
  // Component internal padding (inset)
  inset: {
    xs: spacing[1],  // 4px - tags, badges
    sm: spacing[2],  // 8px - buttons compact
    md: spacing[3],  // 12px - cards, inputs
    lg: spacing[4],  // 16px - large cards
    xl: spacing[6],  // 24px - sections
  },
  
  // Vertical spacing between elements (stack)
  stack: {
    xs: spacing[1],  // 4px
    sm: spacing[2],  // 8px
    md: spacing[3],  // 12px
    lg: spacing[4],  // 16px
    xl: spacing[6],  // 24px
  },
  
  // Horizontal spacing between elements (inline)
  inline: {
    xs: spacing[1],  // 4px
    sm: spacing[2],  // 8px
    md: spacing[3],  // 12px
    lg: spacing[4],  // 16px
  },
  
  // Page-level spacing
  page: {
    x: spacing[4],   // 16px horizontal padding
    y: spacing[6],   // 24px vertical padding
    top: spacing[8], // 32px from header
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
