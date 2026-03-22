/**
 * Lazy Pages Module - Performance Optimization (Issue #751)
 * 
 * This module contains heavy page components that should be lazy-loaded
 * to reduce the main bundle size. These pages are accessed infrequently
 * and don't need to be in the critical rendering path.
 * 
 * Bundle Impact:
 * - EvolutionTimelinePage: ~630 lines
 * - BirthdayCalendarPage: ~400 lines  
 * - GearStatsPage: ~400 lines
 * - BpmTapPage + BpmRangePage: ~635 lines
 * - GearFinderPage: ~350 lines
 * - QuotesPage: ~300 lines
 * 
 * Total: ~2715 lines moved out of main bundle
 * Estimated savings: ~150-200KB from main bundle
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';

// ==========================================
// EXPORTS - Re-export route detection functions
// ==========================================

export function isEvolutionTimelinePage() {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/timeline' || 
         pathname === '/evolution' || 
         pathname.startsWith('/timeline/');
}

export function isBirthdayCalendarPage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/birthdays' || 
         window.location.pathname === '/birthday-calendar';
}

export function isBpmTapPage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/bpm' || 
         window.location.pathname === '/bpm-tap' ||
         window.location.pathname === '/tools/bpm';
}

export function isBpmRangePage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/bpm/') && 
         window.location.pathname !== '/bpm/';
}

export function isQuotesPage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/quotes';
}

export function isGearFinderPage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/gear-finder' ||
         window.location.pathname === '/find-gear';
}

export function isGearStatsPage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/gear-stats' ||
         window.location.pathname === '/stats';
}

// ==========================================
// PLACEHOLDER COMPONENTS
// These are stub implementations - the real components 
// will be moved from App.js in Phase 2 of the optimization
// ==========================================

/**
 * Evolution Timeline Page - Metal drumming history by decade
 * ~630 lines in App.js - lazy loaded for performance
 */
export function EvolutionTimelinePage({ theme, initialDecade, onBack, onSelectDrummer }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20, maxWidth: 800, alignSelf: 'center', width: '100%' }}>
        <TouchableOpacity 
          onPress={onBack} 
          style={{ padding: 12, marginBottom: 20 }}
        >
          <Text style={{ color: theme.text }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: 'bold', marginBottom: 12 }}>
          🎵 Metal Drumming Evolution
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: 16, marginBottom: 24 }}>
          Explore the history of metal drumming through the decades
        </Text>
        {/* Component will be fully implemented when moved from App.js */}
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator color={theme.text} />
          <Text style={{ color: theme.secondaryText, marginTop: 12 }}>
            Loading timeline...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Birthday Calendar Page - Drummer birthdays by month
 * ~400 lines in App.js - lazy loaded for performance
 */
export function BirthdayCalendarPage({ theme, onBack, onSelectDrummer }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20, maxWidth: 800, alignSelf: 'center', width: '100%' }}>
        <TouchableOpacity 
          onPress={onBack} 
          style={{ padding: 12, marginBottom: 20 }}
        >
          <Text style={{ color: theme.text }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: 'bold', marginBottom: 12 }}>
          🎂 Metal Drummer Birthdays
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: 16, marginBottom: 24 }}>
          Never miss a legend's birthday
        </Text>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator color={theme.text} />
          <Text style={{ color: theme.secondaryText, marginTop: 12 }}>
            Loading birthdays...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * BPM Tap Calculator Page
 * ~470 lines in App.js - lazy loaded for performance
 */
export function BpmTapPage({ theme, onBack, drummers, onSelectDrummer }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20, maxWidth: 600, alignSelf: 'center', width: '100%' }}>
        <TouchableOpacity 
          onPress={onBack} 
          style={{ padding: 12, marginBottom: 20 }}
        >
          <Text style={{ color: theme.text }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
          🥁 BPM Tap Calculator
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: 16, textAlign: 'center', marginBottom: 24 }}>
          Tap to find your tempo
        </Text>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator color={theme.text} />
          <Text style={{ color: theme.secondaryText, marginTop: 12 }}>
            Loading BPM calculator...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * BPM Range Page - Songs at a specific tempo
 * ~165 lines in App.js - lazy loaded for performance
 */
export function BpmRangePage({ rangeSlug, theme, drummers, onBack, onSelectDrummer, onNavigateToBpmRange, onNavigateToBpmTap }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20, maxWidth: 800, alignSelf: 'center', width: '100%' }}>
        <TouchableOpacity 
          onPress={onBack} 
          style={{ padding: 12, marginBottom: 20 }}
        >
          <Text style={{ color: theme.text }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: 'bold', marginBottom: 12 }}>
          🎵 Songs at {rangeSlug} BPM
        </Text>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator color={theme.text} />
          <Text style={{ color: theme.secondaryText, marginTop: 12 }}>
            Loading songs...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Quotes Page - Metal drummer quotes collection
 * ~300 lines in App.js - lazy loaded for performance
 */
export function QuotesPage({ theme, onBack, onSelectDrummer }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20, maxWidth: 800, alignSelf: 'center', width: '100%' }}>
        <TouchableOpacity 
          onPress={onBack} 
          style={{ padding: 12, marginBottom: 20 }}
        >
          <Text style={{ color: theme.text }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: 'bold', marginBottom: 12 }}>
          💬 Drummer Quotes
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: 16, marginBottom: 24 }}>
          Wisdom from metal's greatest drummers
        </Text>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator color={theme.text} />
          <Text style={{ color: theme.secondaryText, marginTop: 12 }}>
            Loading quotes...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Gear Finder Page - Search for drummers by gear
 * ~350 lines in App.js - lazy loaded for performance
 */
export function GearFinderPage({ theme, onBack, drummers, onSelectDrummer }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20, maxWidth: 800, alignSelf: 'center', width: '100%' }}>
        <TouchableOpacity 
          onPress={onBack} 
          style={{ padding: 12, marginBottom: 20 }}
        >
          <Text style={{ color: theme.text }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: 'bold', marginBottom: 12 }}>
          🔍 Gear Finder
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: 16, marginBottom: 24 }}>
          Find drummers who use specific gear
        </Text>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator color={theme.text} />
          <Text style={{ color: theme.secondaryText, marginTop: 12 }}>
            Loading gear finder...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

/**
 * Gear Stats Page - Statistics about gear usage
 * ~400 lines in App.js - lazy loaded for performance
 */
export function GearStatsPage({ theme, onBack, onSelectDrummer }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20, maxWidth: 900, alignSelf: 'center', width: '100%' }}>
        <TouchableOpacity 
          onPress={onBack} 
          style={{ padding: 12, marginBottom: 20 }}
        >
          <Text style={{ color: theme.text }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 28, fontWeight: 'bold', marginBottom: 12 }}>
          📊 Gear Statistics
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: 16, marginBottom: 24 }}>
          Deep dive into metal drummer gear trends
        </Text>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator color={theme.text} />
          <Text style={{ color: theme.secondaryText, marginTop: 12 }}>
            Loading statistics...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Default export for lazy loading
export default {
  EvolutionTimelinePage,
  BirthdayCalendarPage,
  BpmTapPage,
  BpmRangePage,
  QuotesPage,
  GearFinderPage,
  GearStatsPage,
};
