/**
 * Spacing Design System for MetalForge.io
 * 
 * Issue #519: Create spacing tokens using an 8px grid system.
 * Issue #600: Cache bust for production rebuild - 2026-02-28T19:25:00Z
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
// NOTE: Using string keys to avoid Metro bundler/react-native-web issue with
// numeric object keys that causes "Failed to set indexed property [0]" error
// in Playwright and some browsers (Issue #591, #596)
export const spacing = {
  '0': 0,
  '1': 4,   // Tight: inline elements
  '2': 8,   // Compact: between related items
  '3': 12,  // Default: standard gap
  '4': 16,  // Comfortable: section padding
  '5': 20,  // Relaxed: (use 24 instead when possible)
  '6': 24,  // Spacious: between sections
  '8': 32,  // Large: major section breaks
  '10': 40, // XL: page sections
  '12': 48, // XXL: hero padding
};

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

// Build cache buster for issue #600
export const BUILD_VERSION = '2026-02-28T19:35:00Z';

// Default export for convenient importing
export default {
  spacing,
  space,
  mapToGrid,
  BUILD_VERSION,
};
