import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const themes = {
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

export function ThemeProvider({ children }) {
  // Always use dark mode
  const theme = themes.dark;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode: true }}>
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
