import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';

const ThemeContext = createContext();

// Storage key for persisting theme preference
const THEME_STORAGE_KEY = 'metalforge-theme-preference';

export const themes = {
  dark: {
    background: '#121212',
    text: '#ffffff',
    secondaryText: '#aaaaaa',
    card: '#1e1e1e',
    border: '#333333',
    error: '#ef5350',
    primary: '#ef4444',
    // Additional colors for comprehensive theming
    inputBackground: '#1e1e1e',
    inputText: '#ffffff',
    inputPlaceholder: '#888888',
    headerBackground: '#0a0a0a',
    buttonBackground: '#ef4444',
    buttonText: '#ffffff',
    shadowColor: '#000000',
  },
  light: {
    background: '#f5f5f5',
    text: '#1a1a1a',
    secondaryText: '#666666',
    card: '#ffffff',
    border: '#e0e0e0',
    error: '#d32f2f',
    primary: '#dc2626',
    // Additional colors for comprehensive theming
    inputBackground: '#ffffff',
    inputText: '#1a1a1a',
    inputPlaceholder: '#999999',
    headerBackground: '#ffffff',
    buttonBackground: '#dc2626',
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
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const bgColor = themeName === 'dark' ? '#0a0a0a' : '#f5f5f5';
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
