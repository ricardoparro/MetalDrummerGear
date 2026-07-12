// Pedal brand detail page — Issue #4432 (split 1/3 of #4394)
// Renders /pedals/brands/<brand>: positioning, metal-relevant models, and
// confirmed drummers (derived live from data/pedals.js — never hardcoded, so
// this page can never show an unverified endorsement).

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import { toSlug } from '../utils/urlHelpers';
import {
  getBrand,
  getPedalsForBrand,
  generateBrandCanonicalUrl,
  generateBrandTitle,
  generateBrandDescription,
  generateBrandSchema,
} from '../data/pedalBrands';
import { hasBrand as hasFullBrandPage } from '../data/brands';

function injectSchema(id, schema) {
  if (Platform.OS !== 'web' || typeof document === 'undefined' || !schema) return;
  let script = document.querySelector(`script[data-schema="${id}"]`);
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

function removeSchema(id) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  const script = document.querySelector(`script[data-schema="${id}"]`);
  if (script) script.remove();
}

function CrawlableLink({ href, onPress, style, children }) {
  if (Platform.OS === 'web') {
    return (
      <a
        href={href}
        onClick={(e) => {
          if (onPress) {
            e.preventDefault();
            onPress();
          }
        }}
        style={{ textDecoration: 'none', ...style }}
      >
        {children}
      </a>
    );
  }
  return <View>{children}</View>;
}

function DrummerPedalRow({ pedal, drummer, theme, onNavigateToPedalSetup }) {
  return (
    <CrawlableLink
      href={`/pedals/setups/${pedal.drummerSlug}`}
      onPress={onNavigateToPedalSetup ? () => onNavigateToPedalSetup(pedal.drummerSlug) : undefined}
      style={{ display: 'block', width: '100%' }}
    >
      <View style={[styles.drummerRow, { borderColor: theme.border }]}>
        <Text style={[styles.drummerRowName, { color: theme.text }]}>
          {drummer ? drummer.name : pedal.drummerSlug}
        </Text>
        <Text style={[styles.drummerRowStick, { color: theme.secondaryText || theme.text }]} numberOfLines={2}>
          {pedal.summary}
        </Text>
      </View>
    </CrawlableLink>
  );
}

export function PedalBrandPage({
  theme: themeProp,
  brandSlug,
  drummers = [],
  onBack,
  onNavigateToPedalSetup,
  onNavigateBestForMetal,
}) {
  const theme = themeProp || themes.dark;
  const brand = getBrand(brandSlug);
  const confirmedPedals = brand ? getPedalsForBrand(brand) : [];

  useEffect(() => {
    if (!brand) return;
    const url = generateBrandCanonicalUrl(brand.slug);
    updateOgMeta({
      title: generateBrandTitle(brand),
      description: generateBrandDescription(brand, confirmedPedals),
      keywords: `${brand.name.toLowerCase()} pedals, ${brand.name.toLowerCase()} bass drum pedals for metal`,
      url,
      type: 'article',
    });
    const schemas = generateBrandSchema(brand, confirmedPedals);
    schemas.forEach((schema, i) => injectSchema(`pedal-brand-${brand.slug}-${i}`, schema));
    return () => {
      schemas.forEach((_, i) => removeSchema(`pedal-brand-${brand.slug}-${i}`));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandSlug]);

  if (!brand) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={styles.emoji}>⚙️</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Brand Not Found</Text>
        {onBack && (
          <CrawlableLink href="/pedals" onPress={onBack}>
            <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Pedals guide</Text>
          </CrawlableLink>
        )}
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <View style={styles.breadcrumbs}>
        <CrawlableLink href="/pedals" onPress={onBack} style={{ marginRight: 4 }}>
          <Text style={[styles.breadcrumbText, { color: theme.primary || theme.text }]}>Pedals</Text>
        </CrawlableLink>
        <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> › </Text>
        <Text style={[styles.breadcrumbText, { color: theme.text }]}>{brand.name}</Text>
      </View>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">{brand.name} Bass Drum Pedals</Text>

      <View style={styles.metaRow}>
        {brand.founded && (
          <Text style={[styles.metaLine, { color: theme.secondaryText || theme.text }]}>Founded: {brand.founded}</Text>
        )}
        {brand.parent && (
          <Text style={[styles.metaLine, { color: theme.secondaryText || theme.text }]}>{brand.parent}</Text>
        )}
      </View>

      <Text style={[styles.body, { color: theme.text }]}>{brand.positioning}</Text>

      <Text style={[styles.h2, { color: theme.text }]}>Metal-relevant models</Text>
      {brand.notableLines.map((line) => (
        <View key={line.name} style={styles.lineRow}>
          <Text style={[styles.lineName, { color: theme.text }]}>{line.name}</Text>
          <Text style={[styles.lineDesc, { color: theme.secondaryText || theme.text }]}>{line.description}</Text>
        </View>
      ))}

      <Text style={[styles.h2, { color: theme.text }]}>Confirmed metal drummers</Text>
      {confirmedPedals.length > 0 ? (
        <View style={[styles.drummerList, { borderColor: theme.border }]}>
          {confirmedPedals.map((pedal) => {
            const drummer = drummers.find((d) => toSlug(d.name) === pedal.drummerSlug);
            return (
              <DrummerPedalRow
                key={pedal.drummerSlug}
                pedal={pedal}
                drummer={drummer}
                theme={theme}
                onNavigateToPedalSetup={onNavigateToPedalSetup}
              />
            );
          })}
        </View>
      ) : (
        <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>
          We haven't verified a {brand.name} pedal played by one of our mapped metal drummers yet —
          check back as more setups get confirmed.
        </Text>
      )}

      <Text style={[styles.sourceNote, { color: theme.secondaryText || theme.text }]}>
        Source: {brand.source.label}.
      </Text>

      {hasFullBrandPage(brand.slug) && (
        <CrawlableLink
          href={`/brands/${brand.slug}`}
          onPress={() => {
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', `/brands/${brand.slug}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          style={{ marginTop: 12 }}
        >
          <View style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
            <Text style={[styles.linkCardText, { color: theme.text }]}>📜 Full Brand History →</Text>
          </View>
        </CrawlableLink>
      )}

      <CrawlableLink href="/pedals/best-for-metal" onPress={onNavigateBestForMetal} style={{ marginTop: 10 }}>
        <View style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
          <Text style={[styles.linkCardText, { color: theme.text }]}>🤘 Best Pedals for Metal →</Text>
        </View>
      </CrawlableLink>

      {onBack && (
        <CrawlableLink href="/pedals" onPress={onBack} style={{ marginTop: 20 }}>
          <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Pedals guide</Text>
        </CrawlableLink>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { alignItems: 'center', justifyContent: 'center', padding: 16 },
  content: { padding: 16, paddingBottom: 48 },
  emoji: { fontSize: 48, marginBottom: 12 },
  notFoundTitle: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  breadcrumbs: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' },
  breadcrumbSeparator: { fontSize: 14 },
  breadcrumbText: { fontSize: 14, fontWeight: '600' },
  h1: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  h2: { fontSize: 20, fontWeight: '700', marginTop: 20, marginBottom: 10 },
  metaRow: { marginBottom: 14 },
  metaLine: { fontSize: 13, marginBottom: 2 },
  body: { fontSize: 15, lineHeight: 23 },
  lineRow: { marginBottom: 14 },
  lineName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  lineDesc: { fontSize: 14, lineHeight: 20 },
  drummerList: { borderWidth: 1, borderRadius: 10, overflow: 'hidden' },
  drummerRow: { padding: 14, borderBottomWidth: StyleSheet.hairlineWidth },
  drummerRowName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  drummerRowStick: { fontSize: 13 },
  sourceNote: { fontSize: 12, fontStyle: 'italic', marginTop: 16 },
  linkCard: { padding: 14, borderRadius: 8, borderWidth: 1 },
  linkCardText: { fontSize: 15, fontWeight: '600' },
  backLink: { fontSize: 15, fontWeight: '600' },
});

export default PedalBrandPage;
