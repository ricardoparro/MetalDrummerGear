/**
 * WishlistButton Component (Issue #823)
 * 
 * "Save to Wishlist" button for gear items across all drummer profiles.
 * Changes to "✓ Saved" when item is in wishlist.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useTheme } from '../ThemeContext';
import { spacing } from '../spacing';
import { fontSize, fontWeight } from '../typography';
import { 
  addToWishlist, 
  removeFromWishlist, 
  isInWishlist,
  getWishlist,
} from '../utils/wishlist';

/**
 * WishlistButton - Add/remove gear from wishlist
 * 
 * @param {Object} props
 * @param {string} props.drummerName - Drummer's full name
 * @param {string} props.drummerSlug - Drummer's URL slug
 * @param {string} props.gearType - Type of gear (drums, snare, cymbals, hardware, sticks)
 * @param {string} props.itemName - Full gear item description
 * @param {string} props.primaryProduct - Extracted primary product name
 * @param {number} props.estimatedPrice - Estimated price in EUR
 * @param {Object} props.style - Additional styles
 * @param {boolean} props.compact - Compact mode (icon only)
 */
export default function WishlistButton({
  drummerName,
  drummerSlug,
  gearType,
  itemName,
  primaryProduct,
  estimatedPrice,
  style,
  compact = false,
}) {
  const { theme } = useTheme();
  const [saved, setSaved] = useState(false);
  const [animValue] = useState(new Animated.Value(1));
  
  // Check if item is already in wishlist on mount
  useEffect(() => {
    if (drummerSlug && gearType) {
      setSaved(isInWishlist(drummerSlug, gearType));
    }
  }, [drummerSlug, gearType]);
  
  // Listen for wishlist updates
  useEffect(() => {
    const handleUpdate = () => {
      if (drummerSlug && gearType) {
        setSaved(isInWishlist(drummerSlug, gearType));
      }
    };
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('wishlist-updated', handleUpdate);
      return () => window.removeEventListener('wishlist-updated', handleUpdate);
    }
  }, [drummerSlug, gearType]);
  
  const handlePress = useCallback(() => {
    if (!drummerSlug || !gearType) return;
    
    // Animate button press
    Animated.sequence([
      Animated.spring(animValue, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.spring(animValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
      }),
    ]).start();
    
    if (saved) {
      // Find and remove the item
      const items = getWishlist();
      const item = items.find(
        i => i.drummerSlug === drummerSlug && i.gearType === gearType
      );
      if (item) {
        removeFromWishlist(item.id);
      }
      setSaved(false);
    } else {
      // Add to wishlist
      const added = addToWishlist({
        drummerName,
        drummerSlug,
        gearType,
        itemName,
        primaryProduct,
        estimatedPrice,
      });
      if (added) {
        setSaved(true);
      }
    }
  }, [saved, drummerName, drummerSlug, gearType, itemName, primaryProduct, estimatedPrice, animValue]);
  
  const buttonStyle = [
    styles.button,
    saved ? styles.buttonSaved : styles.buttonUnsaved,
    compact && styles.buttonCompact,
    { borderColor: saved ? theme.accent : theme.border },
    style,
  ];
  
  const textStyle = [
    styles.buttonText,
    saved ? [styles.buttonTextSaved, { color: theme.accent }] : { color: theme.text },
    compact && styles.buttonTextCompact,
  ];
  
  return (
    <Animated.View style={{ transform: [{ scale: animValue }] }}>
      <TouchableOpacity
        onPress={handlePress}
        style={buttonStyle}
        accessibilityRole="button"
        accessibilityLabel={saved ? `Remove ${itemName} from wishlist` : `Save ${itemName} to wishlist`}
        accessibilityState={{ checked: saved }}
      >
        <Text style={textStyle}>
          {compact 
            ? (saved ? '♥' : '♡')
            : (saved ? '♥ Saved' : '♡ Save to Wishlist')
          }
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

/**
 * WishlistBadge - Count badge for navigation showing saved items count
 */
export function WishlistBadge({ style, onPress }) {
  const { theme } = useTheme();
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Initial count
    setCount(getWishlist().length);
    
    // Listen for updates
    const handleUpdate = (e) => {
      const items = e.detail?.items || getWishlist();
      setCount(items.length);
    };
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('wishlist-updated', handleUpdate);
      return () => window.removeEventListener('wishlist-updated', handleUpdate);
    }
  }, []);
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = '/wishlist';
    }
  };
  
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.badge, { borderColor: theme.border }, style]}
      accessibilityRole="button"
      accessibilityLabel={`Wishlist: ${count} items`}
    >
      <Text style={[styles.badgeIcon, { color: count > 0 ? theme.accent : theme.text }]}>
        {count > 0 ? '♥' : '♡'}
      </Text>
      {count > 0 && (
        <Text style={[styles.badgeCount, { backgroundColor: theme.accent }]}>
          {count > 99 ? '99+' : count}
        </Text>
      )}
    </TouchableOpacity>
  );
}

/**
 * FloatingWishlistButton - Floating action button for wishlist access
 */
export function FloatingWishlistButton({ style, onPress }) {
  const { theme } = useTheme();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Initial count
    const items = getWishlist();
    setCount(items.length);
    setVisible(items.length > 0);
    
    // Listen for updates
    const handleUpdate = (e) => {
      const items = e.detail?.items || getWishlist();
      setCount(items.length);
      setVisible(items.length > 0);
    };
    
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('wishlist-updated', handleUpdate);
      return () => window.removeEventListener('wishlist-updated', handleUpdate);
    }
  }, []);
  
  if (!visible) return null;
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.href = '/wishlist';
    }
  };
  
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.fab, { backgroundColor: theme.accent }, style]}
      accessibilityRole="button"
      accessibilityLabel={`View wishlist: ${count} items`}
    >
      <Text style={styles.fabIcon}>♥</Text>
      <Text style={styles.fabCount}>{count}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Main button
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUnsaved: {
    backgroundColor: 'transparent',
  },
  buttonSaved: {
    backgroundColor: 'rgba(255,215,0,0.1)',
  },
  buttonCompact: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semiBold,
  },
  buttonTextSaved: {
    // Color applied dynamically
  },
  buttonTextCompact: {
    fontSize: 16,
  },
  
  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    position: 'relative',
  },
  badgeIcon: {
    fontSize: 18,
  },
  badgeCount: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    fontSize: 10,
    fontWeight: fontWeight.bold,
    color: '#000',
    textAlign: 'center',
    lineHeight: 18,
    overflow: 'hidden',
  },
  
  // FAB
  fab: {
    position: 'fixed',
    bottom: 80, // Above StickyCTA
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
  },
  fabIcon: {
    fontSize: 24,
    color: '#000',
  },
  fabCount: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff4444',
    color: '#fff',
    fontSize: 11,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    lineHeight: 20,
    overflow: 'hidden',
  },
});
