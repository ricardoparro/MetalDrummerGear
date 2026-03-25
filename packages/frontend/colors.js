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

  // Text (zinc palette)
  text: {
    primary: '#ffffff',
    secondary: '#a1a1aa',    // Was #b3b3b3
    muted: '#71717a',
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

  // Purple palette (for DreamSetupBuilder, progressive elements)
  purple: {
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
  },

  // Genre colors (consolidated)
  genre: {
    thrash: '#dc2626',
    death: '#7f1d1d',
    black: '#18181b',
    progressive: '#7c3aed',
    nuMetal: '#f97316',
    groove: '#65a30d',
    power: '#0284c7',
    metalcore: '#0891b2',
    default: '#52525b',
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
