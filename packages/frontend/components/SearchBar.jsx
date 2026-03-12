/**
 * SearchBar - Pure HTML/React component
 * 
 * Completely independent from react-native-web to avoid CSS bugs.
 * Simple, predictive search that just works.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';

export function SearchBar({ 
  drummers = [], 
  onSelect, 
  theme = { text: '#1a1a2e', secondaryText: '#666', card: '#fff', border: '#e0e0e0', background: '#f5f5f5' },
  placeholder = "Search drummers, bands, gear..."
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Filter drummers based on query
  const filterDrummers = useCallback((searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      return [];
    }
    
    const q = searchQuery.toLowerCase().trim();
    
    return drummers
      .filter(d => {
        const name = (d.name || '').toLowerCase();
        const band = (d.band || '').toLowerCase();
        const gear = (d.gear?.drums || '').toLowerCase();
        
        return name.includes(q) || band.includes(q) || gear.includes(q);
      })
      .slice(0, 6)
      .map(d => ({
        id: d.id,
        name: d.name,
        band: d.band,
        image: d.image,
        type: 'drummer'
      }));
  }, [drummers]);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    const matches = filterDrummers(value);
    setSuggestions(matches);
    setIsOpen(matches.length > 0);
    setActiveIndex(-1);
  };

  // Handle suggestion selection
  const handleSelect = (suggestion) => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    
    if (onSelect) {
      onSelect(suggestion);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Escape') {
        setQuery('');
        setSuggestions([]);
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          handleSelect(suggestions[activeIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      maxWidth: '500px',
    },
    inputWrapper: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '12px',
      padding: '0 16px',
      height: '48px',
      gap: '12px',
    },
    icon: {
      fontSize: '18px',
      color: theme.secondaryText,
      flexShrink: 0,
    },
    input: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: '16px',
      color: theme.text,
      fontFamily: 'inherit',
      height: '100%',
      minHeight: '44px',
      WebkitAppearance: 'none',
      padding: 0,
    },
    clearButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      color: theme.secondaryText,
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    shortcut: {
      backgroundColor: theme.background,
      border: `1px solid ${theme.border}`,
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '12px',
      color: theme.secondaryText,
      fontFamily: 'monospace',
    },
    suggestions: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      marginTop: '8px',
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      zIndex: 1000,
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    suggestionItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      cursor: 'pointer',
      gap: '12px',
      borderBottom: `1px solid ${theme.border}`,
      transition: 'background-color 0.15s ease',
    },
    suggestionItemActive: {
      backgroundColor: theme.background,
    },
    suggestionImage: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
      backgroundColor: theme.background,
    },
    suggestionText: {
      flex: 1,
      minWidth: 0,
    },
    suggestionName: {
      fontSize: '15px',
      fontWeight: '600',
      color: theme.text,
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    suggestionBand: {
      fontSize: '13px',
      color: theme.secondaryText,
      margin: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    suggestionIcon: {
      fontSize: '16px',
      color: theme.secondaryText,
    },
  };

  return (
    <div ref={containerRef} style={styles.container}>
      <div style={styles.inputWrapper}>
        <span style={styles.icon}>🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          aria-label="Search drummers by name, band, or gear brand"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
          style={styles.input}
        />
        {query ? (
          <button 
            onClick={handleClear} 
            style={styles.clearButton}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        ) : (
          <span style={styles.shortcut}>⌘K</span>
        )}
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <ul style={styles.suggestions} role="listbox">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                ...styles.suggestionItem,
                ...(index === activeIndex ? styles.suggestionItemActive : {}),
                ...(index === suggestions.length - 1 ? { borderBottom: 'none' } : {}),
              }}
              role="option"
              aria-selected={index === activeIndex}
            >
              {suggestion.image && (
                <img 
                  src={suggestion.image} 
                  alt=""
                  style={styles.suggestionImage}
                  loading="lazy"
                />
              )}
              <div style={styles.suggestionText}>
                <p style={styles.suggestionName}>{suggestion.name}</p>
                <p style={styles.suggestionBand}>{suggestion.band}</p>
              </div>
              <span style={styles.suggestionIcon}>👤</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
