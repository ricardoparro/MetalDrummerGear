// Continue Exploring Rail — Issue #1240
//
// Personalised "pick up where you left off" rail for returning visitors, built
// from a client-only localStorage history of visited drummer/gear pages (see
// ../utils/recentlyViewed.js). Renders nothing for first-time visitors (and for
// crawlers, which never carry localStorage history), so it never displaces the
// homepage's <h1>/SSR content — the component simply isn't in the DOM for them.

import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { getRecentlyViewed } from '../utils/recentlyViewed';

function ContinueExploringCard({ item, theme }) {
  const label = item.type === 'gear' ? 'Gear' : 'Drummer';
  const anchorText = `Continue exploring ${item.title}`;

  const card = (
    <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.border }]}>
      <Image
        source={item.image ? { uri: item.image } : undefined}
        style={styles.image}
        contentFit="cover"
        cachePolicy="memory-disk"
        accessibilityLabel={`Photo related to ${item.title}`}
      />
      <View style={styles.info}>
        <Text style={[styles.badge, { color: theme.secondaryText || theme.text }]}>{label}</Text>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        {!!item.subtitle && (
          <Text style={[styles.subtitle, { color: theme.secondaryText || theme.text }]} numberOfLines={1}>
            {item.subtitle}
          </Text>
        )}
      </View>
    </View>
  );

  if (Platform.OS === 'web') {
    return (
      <a href={item.url} aria-label={anchorText} style={{ textDecoration: 'none', display: 'block' }}>
        {card}
      </a>
    );
  }

  return (
    <TouchableOpacity accessibilityRole="link" accessibilityLabel={anchorText}>
      {card}
    </TouchableOpacity>
  );
}

export default function ContinueExploringRail({ theme }) {
  const t = theme || { text: '#111', secondaryText: '#666', background: '#fff', border: '#e5e5e5', card: '#fff' };
  // Lazy-read localStorage once, synchronously, on first render — avoids a
  // flash-then-populate that would cause layout shift, and degrades to an
  // empty array (→ no render) when storage is unavailable.
  const [items] = useState(() => getRecentlyViewed());

  if (!items.length) return null;

  return (
    <View style={[styles.section, { backgroundColor: t.card, borderColor: t.border }]}>
      <Text style={[styles.heading, { color: t.text }]} accessibilityRole="header">
        Continue exploring
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.strip}
      >
        {items.map((item) => (
          <View key={item.url} style={styles.cell}>
            <ContinueExploringCard item={item} theme={t} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 0,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  strip: {
    flexDirection: 'row',
  },
  cell: {
    width: 140,
    marginRight: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  // Explicit dimensions reserve layout space → no CLS as the photo loads.
  image: {
    width: '100%',
    height: 90,
  },
  info: {
    padding: 8,
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 2,
  },
});
