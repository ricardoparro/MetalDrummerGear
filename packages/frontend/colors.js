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

export default colors;
