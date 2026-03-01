/**
 * Spacing Design System for MetalForge.io
 * 
 * EMERGENCY FIX: Use JSON.parse to create the spacing object.
 * This guarantees string keys because JSON always produces string keys.
 */

// Use JSON.parse - this ALWAYS creates string keys, no bundler optimization possible
export const spacing = JSON.parse('{"0":0,"1":4,"2":8,"3":12,"4":16,"5":20,"6":24,"8":32,"10":40,"12":48}');

// Semantic spacing aliases - direct values only
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
