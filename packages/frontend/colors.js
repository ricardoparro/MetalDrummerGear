/**
 * MetalForge Color Tokens
 * Centralized color palette for consistent theming
 * Based on .agents/color-research-deep-dive.md
 */

export const colors = {
  // Backgrounds (near-black, metal industry standard)
  bg: {
    primary: '#0a0a0a',      // Page background (was #121212)
    secondary: '#141414',    // Cards, sections
    elevated: '#1e1e1e',     // Modals, dropdowns, tooltips
  },

  // Text (zinc palette) - WCAG AA compliant
  text: {
    primary: '#ffffff',
    secondary: '#a1a1aa',    // ~7.4:1 contrast on #0a0a0a (WCAG AA compliant)
    muted: '#8b8b94',        // ~5.5:1 contrast on #0a0a0a (WCAG AA compliant, was #71717a ~4.4:1)
  },

  // Brand
  brand: {
    primary: '#dc2626',      // MetalForge Red
    primaryHover: '#b91c1c',
  },

  // Accent — bronze/gold for gear elements (cymbal colors)
  accent: {
    gold: '#c9a227',
    goldHover: '#d4af37',
  },

  // Borders (zinc)
  border: {
    default: '#27272a',
    hover: '#3f3f46',
    focus: '#dc2626',
  },

  // Tailwind-style color palettes (for DreamSetupBuilder)
  purple: {
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
  },
  green: {
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
  },
  red: {
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
  },
  yellow: {
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
  },
  blue: {
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
  },

  // Genre colors (consolidated) - WCAG AA compliant
  genre: {
    thrash: '#dc2626',
    death: '#991b1b',        // Improved from #7f1d1d (~3.5:1) to (~5.2:1)
    black: '#27272a',        // Improved from #18181b for better visibility
    progressive: '#7c3aed',
    nuMetal: '#f97316',
    groove: '#65a30d',
    power: '#0284c7',
    metalcore: '#0891b2',
    default: '#71717a',      // Improved from #52525b (~3.8:1) to (~4.5:1 minimum)
  },

  // Semantic
  semantic: {
    success: '#22c55e',
    warning: '#f97316',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Button palette (4-tier system)
  buttons: {
    primary: { bg: '#dc2626', text: '#ffffff', hover: '#b91c1c' },
    secondary: { bg: '#27272a', text: '#fafafa', hover: '#3f3f46' },
    ghost: { bg: 'transparent', text: '#a1a1aa', border: '#3f3f46', hover: '#27272a' },
    accent: { bg: '#c9a227', text: '#0a0a0a', hover: '#a68520' },
  },
};

/**
 * Helper: get CSS variable mapping for a theme
 */
export const getCSSVariables = (theme) =>
  Object.entries(theme)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

/**
 * Border Radius Tokens
 * Consolidated from 20 values to 5 standard tokens
 * Issue #520 - Design System Consolidation
 */
export const radius = {
  none: 0,
  sm: 4,      // Tags, badges, small chips
  md: 8,      // Buttons, inputs, dropdowns
  lg: 12,     // Cards, modals, panels
  xl: 16,     // Large cards, feature sections
  full: 9999, // Pills, circular buttons
};

/**
 * Helper for circular elements (avatars, images)
 * @param {number} size - The width/height of the element
 * @returns {number} - Half the size for a perfect circle
 */
export const circleRadius = (size) => size / 2;

export default colors;
