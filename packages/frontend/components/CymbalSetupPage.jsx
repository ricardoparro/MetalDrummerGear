// Cymbal Setup Page Component — Issue #4306 (phase 3 of epic #4303)
//
// Renders /cymbals/setups/<drummer>: what cymbals a given drummer uses,
// sourced from the verified data/cymbalSetups.js mapping (phase 1, #4304).
// Only rendered for drummers with an entry in CYMBAL_SETUPS (gated in
// App.js's isCymbalSetupPage() and again here as a defensive check) — never
// a thin/empty page. Mirrors SignatureStickPage.jsx (#4157).

import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { toSlug } from '../utils/urlHelpers';
import {
  getCymbalSetupPageData,
  updateCymbalSetupMeta,
  generateCymbalSetupSchema,
  generateCymbalSetupAnswer,
} from '../data/cymbalSetupPages';
import { hasBrand } from '../data/brands';

const TYPE_LABELS = {
  'hi-hat': 'Hi-Hats',
  crash: 'Crash',
  ride: 'Ride',
  china: 'China',
  splash: 'Splash',
  stack: 'Stack',
  other: 'Other',
};

// ==========================================
// SEO SCHEMA INJECTION (mirrors SignatureStickPage)
// ==========================================
function injectSchema(schema) {
  if (typeof document === 'undefined' || !schema) return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="cymbal-setup"]');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'cymbal-setup');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="cymbal-setup"]');
  if (existing) existing.remove();
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export function CymbalSetupPage({
  drummerSlug,
  drummers = [],
  theme: themeProp,
  onBack,
  onNavigateToDrummer,
  onNavigateToHub,
  onNavigateToBrand,
}) {
  const themeContext = useContext(ThemeContext);
  const theme = themeProp || themeContext;

  const drummer = drummerSlug ? drummers.find((d) => toSlug(d.name) === drummerSlug) : null;
  const data = drummer ? getCymbalSetupPageData(drummerSlug, drummer.name) : null;

  useEffect(() => {
    if (data && Platform.OS === 'web') {
      updateCymbalSetupMeta(data);
      injectSchema(generateCymbalSetupSchema(data));
    }
    return () => removeSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drummerSlug, data?.setup?.drummerSlug]);

  if (!data) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={styles.emoji}>🔔</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Cymbal Setup Not Found</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          This drummer doesn't have a verified cymbal setup breakdown yet.
        </Text>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} style={[styles.backButton, { backgroundColor: theme.primary }]} accessibilityRole="link">
            <Text style={styles.backButtonText}>← Cymbals Guide</Text>
          </Pressable>
        )}
      </View>
    );
  }

  const { setup, drummerName } = data;
  const primaryBrand = setup.brands[0];
  const brandSlug = primaryBrand ? primaryBrand.toLowerCase() : null;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.breadcrumbs}>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} accessibilityRole="link" accessibilityLabel="Cymbals guide">
            <Text style={[styles.breadcrumbText, { color: theme.primary }]}>Cymbals</Text>
          </Pressable>
        )}
        <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> › </Text>
        <Text style={[styles.breadcrumbText, { color: theme.text }]}>{drummerName}'s Cymbal Setup</Text>
      </View>

      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          What Cymbals Does {drummerName} Use?
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          {generateCymbalSetupAnswer(data)}
        </Text>
      </View>

      <View style={[styles.tableCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.primary }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>🔔 Piece-by-Piece Breakdown</Text>
        <View style={styles.tableHeaderRow}>
          <Text style={[styles.tableHeaderCell, styles.colType, { color: theme.secondaryText }]}>Type</Text>
          <Text style={[styles.tableHeaderCell, styles.colSize, { color: theme.secondaryText }]}>Size</Text>
          <Text style={[styles.tableHeaderCell, styles.colSeries, { color: theme.secondaryText }]}>Series</Text>
          <Text style={[styles.tableHeaderCell, styles.colModel, { color: theme.secondaryText }]}>Model</Text>
        </View>
        {setup.pieces.map((piece, idx) => (
          <View key={`${piece.type}-${piece.sizeIn}-${idx}`} style={[styles.tableRow, { borderColor: theme.border }]}>
            <Text style={[styles.tableCell, styles.colType, { color: theme.text }]}>{TYPE_LABELS[piece.type] || piece.type}</Text>
            <Text style={[styles.tableCell, styles.colSize, { color: theme.text }]}>{piece.sizeIn}"</Text>
            <Text style={[styles.tableCell, styles.colSeries, { color: theme.secondaryText }]}>{piece.series || '—'}</Text>
            <Text style={[styles.tableCell, styles.colModel, { color: theme.text }]}>{piece.model}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.prose, { color: theme.secondaryText }]}>{setup.summary}</Text>

      <Text style={[styles.sourceNote, { color: theme.secondaryText }]}>Source: {setup.source}.</Text>

      <Pressable
        onPress={() => onNavigateToDrummer && onNavigateToDrummer(drummerSlug)}
        style={[styles.drummerCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
        accessibilityRole="link"
        accessibilityLabel={`View ${drummerName}'s full drum setup`}
      >
        <Text style={[styles.drummerName, { color: theme.text }]}>🥁 View {drummerName}'s Full Drum Setup →</Text>
      </Pressable>

      {brandSlug && hasBrand(brandSlug) && (
        <Pressable
          onPress={() => onNavigateToBrand && onNavigateToBrand(brandSlug)}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`More about ${primaryBrand}`}
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🔔 More About {primaryBrand} →</Text>
        </Pressable>
      )}

      {onNavigateToHub && (
        <Pressable
          onPress={onNavigateToHub}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel="Back to the cymbals guide"
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🔔 More on Cymbal Types, Alloys & Sizes →</Text>
        </Pressable>
      )}

      {onBack && (
        <Pressable onPress={onBack} style={[styles.backButton, { backgroundColor: theme.primary }]} accessibilityRole="link">
          <Text style={styles.backButtonText}>← Back to {drummerName}</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingBottom: 40 },
  emoji: { fontSize: 48, marginBottom: 12 },
  notFoundTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  emptyText: { fontSize: 14, textAlign: 'center', marginBottom: 16 },
  breadcrumbs: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, alignItems: 'center' },
  breadcrumbSeparator: { fontSize: 14 },
  breadcrumbText: { fontSize: 14, fontWeight: '600' },
  header: { marginBottom: 20 },
  pageTitle: { fontSize: 26, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  tableCard: { padding: 20, borderRadius: 12, borderWidth: 2, marginBottom: 16 },
  tableHeaderRow: { flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1, borderColor: 'rgba(128,128,128,0.3)' },
  tableHeaderCell: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth },
  tableCell: { fontSize: 14 },
  colType: { flex: 1.1 },
  colSize: { flex: 0.7 },
  colSeries: { flex: 1.3 },
  colModel: { flex: 1.6 },
  prose: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  sourceNote: { fontSize: 12, fontStyle: 'italic', marginBottom: 20 },
  drummerCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  drummerName: { fontSize: 16, fontWeight: '600' },
  linkCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  backButton: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, marginVertical: 20 },
  backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default CymbalSetupPage;
