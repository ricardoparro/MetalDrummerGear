import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { colors } from '../colors';
import { fontSize, fontWeight } from '../typography';
import { spacing } from '../spacing';

const HEADER_HEIGHT = 52;

export default function StickyGlobalHeader({ onNavigate, searchValue, onSearchChange, onSearchClear, rightSlot }) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const searchRef = useRef(null);

  const handleNavPress = useCallback((path) => {
    setMenuOpen(false);
    setSearchExpanded(false);
    if (onNavigate) onNavigate(path);
  }, [onNavigate]);

  const handleSearchIconPress = useCallback(() => {
    setSearchExpanded(true);
    // Focus input after state update
    setTimeout(() => searchRef.current?.focus(), 50);
  }, []);

  const handleSearchBlur = useCallback(() => {
    if (!searchValue) setSearchExpanded(false);
  }, [searchValue]);

  const navLinks = [
    { label: 'Drummers', path: '/drummers' },
    { label: 'Gear', path: '/gear' },
    { label: 'Tools', path: '/tools' },
  ];

  return (
    <View
      style={[styles.container, { backgroundColor: theme.cardBackground || colors.bg.secondary, borderBottomColor: colors.border.default }]}
      accessibilityRole="banner"
    >
      <View style={styles.inner}>
        {/* Logo */}
        <TouchableOpacity
          onPress={() => handleNavPress('/')}
          accessibilityRole="link"
          accessibilityLabel="Metal Drummer Gear — Home"
          style={styles.logoButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.logoText, { color: theme.text }]} numberOfLines={1}>
            🥁 <Text style={{ color: colors.brand.primary }}>Metal</Text> Drummer Gear
          </Text>
        </TouchableOpacity>

        {/* Desktop: search + nav */}
        {!isMobile && (
          <View style={styles.desktopRight}>
            {/* Compact search */}
            <View style={[styles.searchWrap, { backgroundColor: theme.background, borderColor: colors.border.default }]}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                ref={searchRef}
                value={searchValue || ''}
                onChangeText={onSearchChange}
                placeholder="Search drummers…"
                placeholderTextColor={colors.text.muted}
                style={[styles.searchInput, { color: theme.text }]}
                accessibilityLabel="Search drummers"
                returnKeyType="search"
              />
              {!!searchValue && (
                <TouchableOpacity onPress={onSearchClear} accessibilityLabel="Clear search" hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.clearIcon}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Nav links */}
            <View style={styles.navLinks} accessibilityRole="navigation" aria-label="Primary navigation">
              {navLinks.map(({ label, path }) => (
                <TouchableOpacity
                  key={path}
                  onPress={() => handleNavPress(path)}
                  accessibilityRole="link"
                  style={styles.navLink}
                >
                  <Text style={[styles.navLinkText, { color: theme.secondaryText || colors.text.secondary }]}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Right slot: WishlistBadge, ThemeToggle etc. */}
            {rightSlot && <View style={styles.rightSlot}>{rightSlot}</View>}
          </View>
        )}

        {/* Mobile: search icon + hamburger */}
        {isMobile && (
          <View style={styles.mobileRight}>
            {searchExpanded ? (
              <View style={[styles.mobileSearchWrap, { backgroundColor: theme.background, borderColor: colors.border.default }]}>
                <TextInput
                  ref={searchRef}
                  value={searchValue || ''}
                  onChangeText={onSearchChange}
                  onBlur={handleSearchBlur}
                  placeholder="Search…"
                  placeholderTextColor={colors.text.muted}
                  style={[styles.mobileSearchInput, { color: theme.text }]}
                  accessibilityLabel="Search drummers"
                  autoFocus
                  returnKeyType="search"
                />
                {!!searchValue && (
                  <TouchableOpacity onPress={onSearchClear} accessibilityLabel="Clear search" hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}>
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleSearchIconPress}
                accessibilityLabel="Open search"
                style={styles.iconButton}
              >
                <Text style={[styles.iconText, { color: theme.secondaryText || colors.text.secondary }]}>🔍</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => setMenuOpen(v => !v)}
              accessibilityLabel={menuOpen ? 'Close menu' : 'Open menu'}
              style={styles.iconButton}
            >
              <Text style={[styles.iconText, { color: theme.secondaryText || colors.text.secondary }]}>{menuOpen ? '✕' : '☰'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Mobile dropdown nav */}
      {isMobile && menuOpen && (
        <View
          style={[styles.mobileMenu, { backgroundColor: theme.cardBackground || colors.bg.secondary, borderTopColor: colors.border.default }]}
          accessibilityRole="navigation"
          aria-label="Primary navigation"
        >
          {navLinks.map(({ label, path }) => (
            <TouchableOpacity
              key={path}
              onPress={() => handleNavPress(path)}
              accessibilityRole="link"
              style={styles.mobileNavLink}
            >
              <Text style={[styles.mobileNavLinkText, { color: theme.text }]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export { HEADER_HEIGHT };

const styles = StyleSheet.create({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 900,
    borderBottomWidth: 1,
    // Shadow for depth
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    }),
  },
  inner: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    maxWidth: 1280,
    marginHorizontal: 'auto',
    width: '100%',
  },
  logoButton: {
    flexShrink: 0,
    minHeight: 44,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.3,
  },
  desktopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: spacing[2],
    height: 36,
    width: 220,
  },
  searchIcon: {
    fontSize: 13,
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.sm,
    height: 36,
    outlineStyle: 'none',
  },
  clearIcon: {
    color: colors.text.muted,
    fontSize: 12,
    paddingHorizontal: 4,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  rightSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    marginLeft: spacing[2],
  },
  navLink: {
    paddingHorizontal: spacing[3],
    minHeight: 44,
    justifyContent: 'center',
    borderRadius: 4,
  },
  navLinkText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  mobileRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  mobileSearchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: spacing[2],
    height: 36,
    width: 160,
  },
  mobileSearchInput: {
    flex: 1,
    fontSize: fontSize.sm,
    height: 36,
    outlineStyle: 'none',
  },
  mobileMenu: {
    borderTopWidth: 1,
    paddingVertical: spacing[2],
  },
  mobileNavLink: {
    paddingHorizontal: spacing[4],
    minHeight: 44,
    justifyContent: 'center',
  },
  mobileNavLinkText: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
});
