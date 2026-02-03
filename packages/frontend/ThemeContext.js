import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, Platform } from 'react-native';

const ThemeContext = createContext();

export const themes = {
  light: {
    background: '#ffffff',
    text: '#000000',
    secondaryText: '#666666',
    card: '#f5f5f5',
    border: '#e0e0e0',
    error: '#d32f2f',
    primary: '#dc2626',
  },
  dark: {
    background: '#121212',
    text: '#ffffff',
    secondaryText: '#aaaaaa',
    card: '#1e1e1e',
    border: '#333333',
    error: '#ef5350',
    primary: '#ef4444',
  },
};

// Get stored theme preference from localStorage (web only)
function getStoredTheme() {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem('metalforge-theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
  }
  return null; // No preference stored
}

// Save theme preference to localStorage (web only)
function saveTheme(isDark) {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem('metalforge-theme', isDark ? 'dark' : 'light');
  }
}

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  
  // Initialize: check localStorage first, then system preference, default to dark
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = getStoredTheme();
    if (stored !== null) return stored;
    return systemColorScheme === 'dark' || systemColorScheme === null;
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      saveTheme(newValue);
      return newValue;
    });
  };

  const theme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
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
