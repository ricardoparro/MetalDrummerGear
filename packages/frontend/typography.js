/**
 * Typography Design System for MetalForge.io
 * 
 * Issue #518: Reduce 19 font sizes to a 6-level scale for visual consistency.
 * 
 * Scale:
 * - xs (12px): Captions, badges, timestamps
 * - sm (14px): Secondary text, labels, metadata
 * - base (16px): Body text, inputs, buttons
 * - lg (18px): Section titles, emphasized content
 * - xl (24px): Page titles, hero text
 * - 2xl (32px): Major headings, feature numbers
 * 
 * Special sizes for display elements (quiz percentages, etc.) are kept separate.
 */

// Font Size Scale
export const fontSize = {
  xs: 12,    // Captions, badges, small labels
  sm: 14,    // Secondary text, metadata
  base: 16,  // Body text, standard content
  lg: 18,    // Section titles, card titles
  xl: 24,    // Page titles
  '2xl': 32, // Major headings
  
  // Display sizes for special UI elements (kept separate from main scale)
  display: {
    sm: 28,  // Large titles
    md: 48,  // Hero numbers
    lg: 72,  // Quiz percentage display
  },
};

// Line Height Scale (optimized for readability)
export const lineHeight = {
  xs: 16,    // 1.33x for smallest text
  sm: 20,    // 1.43x for secondary text
  base: 24,  // 1.5x for body text (optimal readability)
  lg: 26,    // 1.44x for larger content
  xl: 32,    // 1.33x for titles
  '2xl': 40, // 1.25x for headings
};

// Font Weight Scale
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Pre-built Text Styles (common combinations)
export const textStyles = {
  // Page-level headings
  pageTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.xl,
  },
  
  // Section headings
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.lg,
  },
  
  // Card titles and prominent labels
  cardTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.lg,
  },
  
  // Body text
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.base,
  },
  
  // Body text with emphasis
  bodyBold: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.base,
  },
  
  // Secondary/supporting text
  secondary: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.sm,
  },
  
  // Small labels and metadata
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.sm,
  },
  
  // Captions and timestamps
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.xs,
  },
  
  // Badges and tags
  badge: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.xs,
  },
  
  // Buttons
  button: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.base,
  },
  
  // Small buttons
  buttonSmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.sm,
  },
  
  // Large feature numbers
  featureNumber: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight['2xl'],
  },
  
  // Hero/display text
  hero: {
    fontSize: fontSize.display.md,
    fontWeight: fontWeight.bold,
    lineHeight: 56,
  },
};

// Helper function to get closest typography token for a pixel value
// Useful for migration: maps arbitrary sizes to the design system
export function mapToScale(pixelValue) {
  if (pixelValue <= 11) return 'xs';
  if (pixelValue <= 14) return 'sm';
  if (pixelValue <= 16) return 'base';
  if (pixelValue <= 18) return 'lg';
  if (pixelValue <= 28) return 'xl';
  return '2xl';
}

// Default export for convenient importing
export default {
  fontSize,
  lineHeight,
  fontWeight,
  textStyles,
  mapToScale,
};
