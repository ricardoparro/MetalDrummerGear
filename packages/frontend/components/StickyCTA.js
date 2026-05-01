/**
 * StickyCTA Component (Issue #820)
 * 
 * Persistent CTA bar that appears on scroll to convert traffic into engaged users.
 * - Shows after user scrolls 30% down page
 * - Dismissible (sets 24h localStorage)
 * - Dark theme matching MetalForge aesthetic
 * - Contextual CTAs by page type
 * - Mobile: FAB bottom-right, Desktop: Bottom bar
 * - GA4 tracking for all interactions
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated, useWindowDimensions } from 'react-native';
import { useTheme } from '../ThemeContext';
import { colors } from '../colors';
import { spacing } from '../spacing';
import { fontSize, fontWeight } from '../typography';

// Dismiss duration: 24 hours in milliseconds
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'metalforge_sticky_cta_dismissed';
const SCROLL_THRESHOLD = 0.30; // 30% scroll

// CTA configurations by page type
const CTA_CONFIG = {
  homepage: {
    text: '🤘 Which Metal Drummer Are You? Take Quiz →',
    shortText: '🤘 Take Quiz',
    link: '/quiz',
    action: 'quiz',
  },
  drummers: {
    text: 'Compare Your Favorites →',
    shortText: '⚔️ Compare',
    link: '/tools/compare',
    action: 'compare',
  },
  drummer: {
    text: 'Find Similar Drummers →',
    shortText: '🔍 Similar',
    link: null, // Scroll to similar widget
    action: 'similar',
  },
  quiz_results: {
    text: 'Share Your Result →',
    shortText: '📤 Share',
    link: null, // Opens share modal
    action: 'share',
  },
  stats: {
    text: 'Explore All Setups →',
    shortText: '🥁 Explore',
    link: '/drummers',
    action: 'explore',
  },
  tools: {
    text: 'Discover More Tools →',
    shortText: '🔧 Tools',
    link: '/tools',
    action: 'tools',
  },
};

/**
 * Detect page type from URL
 */
function getPageType() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return 'homepage';
  }
  
  const path = window.location.pathname;
  
  // Quiz results page (has query params indicating completed quiz)
  if (path === '/quiz' && window.location.search.includes('result=')) {
    return 'quiz_results';
  }
  
  // Quiz page (don't show CTA while taking quiz)
  if (path === '/quiz') {
    return null;
  }
  
  // Drummers list page
  if (path === '/drummers') {
    return 'drummers';
  }
  
  // Individual drummer page
  if (path.startsWith('/drummers/') && path.split('/').length === 3) {
    return 'drummer';
  }
  
  // Stats page
  if (path === '/stats' || path === '/gear-stats') {
    return 'stats';
  }
  
  // Tools pages (except tools hub itself)
  if (path.startsWith('/tools/') && path !== '/tools') {
    return 'tools';
  }
  
  // Homepage
  if (path === '/' || path === '') {
    return 'homepage';
  }
  
  // Default: don't show CTA on unknown pages
  return null;
}

/**
 * Check if CTA was dismissed within the last 24 hours
 */
function isDismissed() {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') {
    return false;
  }
  
  try {
    const dismissedAt = localStorage.getItem(STORAGE_KEY);
    if (!dismissedAt) return false;
    
    const dismissedTime = parseInt(dismissedAt, 10);
    const now = Date.now();
    
    // Still within dismiss period
    if (now - dismissedTime < DISMISS_DURATION_MS) {
      return true;
    }
    
    // Dismiss period expired, clear storage
    localStorage.removeItem(STORAGE_KEY);
    return false;
  } catch {
    return false;
  }
}

/**
 * Set dismiss state in localStorage
 */
function setDismissed() {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  } catch {
    // Ignore storage errors
  }
}

/**
 * Track CTA interactions with GA4
 */
function trackCTAEvent(eventName, pageType, scrollDepth, isMobile) {
  if (Platform.OS !== 'web' || typeof window === 'undefined' || !window.gtag) {
    return;
  }
  
  window.gtag('event', eventName, {
    page_type: pageType,
    cta_variant: CTA_CONFIG[pageType]?.action || 'unknown',
    scroll_depth: `${Math.round(scrollDepth * 100)}%`,
    device: isMobile ? 'mobile' : 'desktop',
  });
}

/**
 * Get current scroll depth (0-1)
 */
function getScrollDepth() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return 0;
  }
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  if (scrollHeight <= 0) return 0;
  return Math.min(1, scrollTop / scrollHeight);
}

export default function StickyCTA({ onNavigate, onShareResult }) {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  
  const [isVisible, setIsVisible] = useState(false);
  const [pageType, setPageType] = useState(null);
  const [scrollDepth, setScrollDepth] = useState(0);
  const slideAnim = useState(() => new Animated.Value(100))[0]; // Start off-screen
  
  // Get CTA config for current page
  const ctaConfig = useMemo(() => {
    return pageType ? CTA_CONFIG[pageType] : null;
  }, [pageType]);
  
  // Handle navigation
  const handlePress = useCallback(() => {
    if (!pageType || !ctaConfig) return;
    
    trackCTAEvent('sticky_cta_click', pageType, scrollDepth, isMobile);
    
    if (ctaConfig.action === 'share' && onShareResult) {
      // Open share modal for quiz results
      onShareResult();
    } else if (ctaConfig.action === 'similar') {
      // Scroll to similar drummers section
      if (typeof document !== 'undefined') {
        const similarSection = document.querySelector('[data-testid="similar-drummers"]') ||
                               document.querySelector('.similar-drummers-section');
        if (similarSection) {
          similarSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (ctaConfig.link && onNavigate) {
      // Navigate to link
      onNavigate(ctaConfig.link);
    } else if (ctaConfig.link && Platform.OS === 'web' && typeof window !== 'undefined') {
      // Fallback: direct navigation
      window.history.pushState({}, '', ctaConfig.link);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }, [pageType, ctaConfig, scrollDepth, isMobile, onNavigate, onShareResult]);
  
  // Handle dismiss
  const handleDismiss = useCallback(() => {
    trackCTAEvent('sticky_cta_dismiss', pageType, scrollDepth, isMobile);
    setDismissed();
    setIsVisible(false);
    
    // Animate out
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [pageType, scrollDepth, isMobile, slideAnim]);
  
  // Update page type on navigation
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    
    const updatePageType = () => {
      const newPageType = getPageType();
      setPageType(newPageType);
    };
    
    updatePageType();
    window.addEventListener('popstate', updatePageType);
    
    return () => {
      window.removeEventListener('popstate', updatePageType);
    };
  }, []);
  
  // Handle scroll visibility
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    if (!pageType) return; // No CTA for this page
    if (isDismissed()) return;
    
    let rafId = null;
    let lastScrollTime = 0;
    const THROTTLE_MS = 100; // Throttle scroll handler
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < THROTTLE_MS) return;
      lastScrollTime = now;
      
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const depth = getScrollDepth();
        setScrollDepth(depth);
        
        const shouldShow = depth >= SCROLL_THRESHOLD;
        
        if (shouldShow && !isVisible) {
          setIsVisible(true);
          trackCTAEvent('sticky_cta_view', pageType, depth, isMobile);
          
          // Animate in
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 100,
            friction: 10,
            useNativeDriver: true,
          }).start();
        } else if (!shouldShow && isVisible) {
          setIsVisible(false);
          
          // Animate out
          Animated.timing(slideAnim, {
            toValue: 100,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [pageType, isVisible, isMobile, slideAnim]);
  
  // Don't render on non-web or if no CTA for this page
  if (Platform.OS !== 'web') return null;
  if (!pageType || !ctaConfig) return null;
  if (isDismissed() && !isVisible) return null;
  
  // Mobile: FAB (Floating Action Button)
  if (isMobile) {
    return (
      <Animated.View
        style={[
          styles.fabContainer,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
        pointerEvents={isVisible ? 'auto' : 'none'}
        data-testid="sticky-cta"
      >
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.fab, { backgroundColor: colors.brand.primary }]}
          accessibilityRole="button"
          accessibilityLabel={ctaConfig.text}
          activeOpacity={0.8}
        >
          <Text style={styles.fabText}>{ctaConfig.shortText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDismiss}
          style={styles.fabDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={styles.fabDismissText}>✕</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
  
  // Desktop: Bottom bar
  return (
    <Animated.View
      style={[
        styles.barContainer,
        {
          backgroundColor: colors.bg.elevated,
          borderTopColor: colors.border.default,
          transform: [{ translateY: slideAnim }],
        },
      ]}
      pointerEvents={isVisible ? 'auto' : 'none'}
      data-testid="sticky-cta"
    >
      <View style={styles.barContent}>
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.barButton, { backgroundColor: colors.brand.primary }]}
          accessibilityRole="button"
          accessibilityLabel={ctaConfig.text}
          activeOpacity={0.8}
        >
          <Text style={styles.barButtonText}>{ctaConfig.text}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDismiss}
          style={styles.barDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss call to action"
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={[styles.barDismissText, { color: colors.text.muted }]}>✕</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Mobile FAB styles
  fabContainer: {
    position: 'fixed',
    bottom: spacing[6],
    right: spacing[4],
    zIndex: 1000,
    alignItems: 'flex-end',
  },
  fab: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderRadius: 28, // Pill shape
    minHeight: 48, // Accessibility: min touch target
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  fabDismiss: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.bg.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  fabDismissText: {
    color: colors.text.muted,
    fontSize: 12,
    fontWeight: fontWeight.bold,
  },
  
  // Desktop bar styles
  barContainer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderTopWidth: 1,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  barContent: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[4],
  },
  barButton: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    borderRadius: 8,
    minHeight: 48, // Accessibility: min touch target
    justifyContent: 'center',
    alignItems: 'center',
  },
  barButtonText: {
    color: '#ffffff',
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  barDismiss: {
    padding: spacing[2],
  },
  barDismissText: {
    fontSize: fontSize.lg,
  },
});
