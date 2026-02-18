import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { colors } from './colors';

const ThemeContext = createContext();

// Storage key for persisting theme preference
const THEME_STORAGE_KEY = 'metalforge-theme-preference';

export const themes = {
  dark: {
    // Backgrounds (using new deeper near-black palette)
    background: colors.bg.primary,           // #0a0a0a (was #121212)
    surface: colors.bg.secondary,            // #141414 (new)
    surfaceElevated: colors.bg.elevated,     // #1e1e1e (new)
    card: colors.bg.secondary,               // #141414 (was #1e1e1e)
    
    // Text (zinc palette)
    text: colors.text.primary,               // #ffffff
    secondaryText: colors.text.secondary,    // #a1a1aa (was #b3b3b3)
    mutedText: colors.text.muted,            // #71717a (new)
    
    // Brand colors
    primary: colors.brand.primary,           // #dc2626 (was #ef4444)
    primaryHover: colors.brand.primaryHover, // #b91c1c (new)
    
    // Accent (bronze/gold for gear elements)
    accent: colors.accent.gold,              // #c9a227 (new)
    accentHover: colors.accent.goldHover,    // #d4af37 (new)
    
    // Borders (zinc)
    border: colors.border.default,           // #27272a (was #333333)
    borderHover: colors.border.hover,        // #3f3f46 (new)
    borderFocus: colors.border.focus,        // #dc2626 (new)
    
    // Semantic colors
    error: colors.semantic.error,            // #ef4444 (was #ef5350)
    success: colors.semantic.success,        // #22c55e (new)
    warning: colors.semantic.warning,        // #f97316 (new)
    info: colors.semantic.info,              // #3b82f6 (new)
    
    // Additional colors for comprehensive theming
    inputBackground: colors.bg.elevated,     // #1e1e1e
    inputText: colors.text.primary,          // #ffffff
    inputPlaceholder: colors.text.muted,     // #71717a (was #9a9a9a)
    headerBackground: colors.bg.primary,     // #0a0a0a
    buttonBackground: colors.brand.primary,  // #dc2626
    buttonText: colors.text.primary,         // #ffffff
    shadowColor: '#000000',
  },
  light: {
    // Backgrounds
    background: '#f5f5f5',
    surface: '#ffffff',
    surfaceElevated: '#ffffff',
    card: '#ffffff',
    
    // Text
    text: '#1a1a1a',
    secondaryText: '#595959',
    mutedText: '#767676',
    
    // Brand colors
    primary: colors.brand.primary,           // #dc2626
    primaryHover: colors.brand.primaryHover, // #b91c1c
    
    // Accent (bronze/gold for gear elements)
    accent: colors.accent.gold,              // #c9a227
    accentHover: colors.accent.goldHover,    // #d4af37
    
    // Borders
    border: '#e0e0e0',
    borderHover: '#d0d0d0',
    borderFocus: colors.brand.primary,       // #dc2626
    
    // Semantic colors
    error: colors.semantic.error,            // #ef4444
    success: colors.semantic.success,        // #22c55e
    warning: colors.semantic.warning,        // #f97316
    info: colors.semantic.info,              // #3b82f6
    
    // Additional colors for comprehensive theming
    inputBackground: '#ffffff',
    inputText: '#1a1a1a',
    inputPlaceholder: '#767676',
    headerBackground: '#ffffff',
    buttonBackground: colors.brand.primary,  // #dc2626
    buttonText: '#ffffff',
    shadowColor: '#000000',
  },
};

// Helper to get initial theme based on system preference
function getSystemTheme() {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark'; // Default to dark for native platforms
}

// Helper to get stored theme preference
function getStoredTheme() {
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }
  return null;
}

// Helper to store theme preference
function storeTheme(themeName) {
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch (e) {
      // localStorage not available
    }
  }
}

// Helper to update document body class for CSS theming
function updateDocumentTheme(themeName) {
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', themeName);
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${themeName}`);
    
    // Update meta theme-color for mobile browsers (use new deeper background)
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const bgColor = themeName === 'dark' ? colors.bg.primary : '#f5f5f5';
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', bgColor);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = bgColor;
      document.head.appendChild(meta);
    }
  }
}

export function ThemeProvider({ children }) {
  // Initialize theme: check stored preference, then system preference, default to dark
  const [themeName, setThemeName] = useState(() => {
    const stored = getStoredTheme();
    if (stored && (stored === 'dark' || stored === 'light')) {
      return stored;
    }
    return getSystemTheme();
  });

  const theme = themes[themeName];
  const isDarkMode = themeName === 'dark';

  // Toggle between dark and light mode
  const toggleTheme = useCallback(() => {
    setThemeName(current => {
      const newTheme = current === 'dark' ? 'light' : 'dark';
      storeTheme(newTheme);
      updateDocumentTheme(newTheme);
      return newTheme;
    });
  }, []);

  // Set a specific theme
  const setTheme = useCallback((newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeName(newTheme);
      storeTheme(newTheme);
      updateDocumentTheme(newTheme);
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        // Only auto-switch if user hasn't set a preference
        const storedPref = getStoredTheme();
        if (!storedPref) {
          const newTheme = e.matches ? 'dark' : 'light';
          setThemeName(newTheme);
          updateDocumentTheme(newTheme);
        }
      };

      // Use addEventListener if available (modern browsers)
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.addListener) {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);

  // Initialize document theme on mount
  useEffect(() => {
    updateDocumentTheme(themeName);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      isDarkMode, 
      themeName,
      toggleTheme,
      setTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
