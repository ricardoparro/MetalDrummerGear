// Cymbal Setup Page Component — Issue #4306 (phase 3/4 of epic #4303)
//
// Renders /cymbals/setups/<drummer>: what cymbals a given drummer uses,
// sourced from the verified data/cymbalSetups.js mapping. Only rendered for
// drummers with a confirmed setup (gated in App.js's isCymbalSetupPage() and
// again here as a defensive check) — never a thin/empty page.

import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { toSlug } from '../utils/urlHelpers';
import {
  getCymbalSetupPageData,
  updateCymbalSetupMeta,
  generateCymbalSetupSchema,
  generateCymbalSetupDirectAnswer,
} from '../data/cymbalSetupPages';
import { getBrandForCymbalSetup } from '../data/cymbalBrands';

// ==========================================
// SEO SCHEMA INJECTION (mirrors SignatureSnarePage)
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

function pieceLabel(piece) {
  return `${piece.sizeIn}" ${piece.series ? `${piece.series} ` : ''}${piece.model}`;
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
  onNavigateToArticle,
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
        <Text style={styles.emoji}>🥁</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Cymbal Setup Page Not Found</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          This drummer doesn't have a confirmed cymbal setup yet.
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
  const directAnswer = generateCymbalSetupDirectAnswer(data);
  const brand = getBrandForCymbalSetup(setup);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.breadcrumbs}>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} accessibilityRole="link" accessibilityLabel="Cymbals guide">
            <Text style={[styles.breadcrumbText, { color: theme.primary }]}>Cymbals</Text>
          </Pressable>
        )}
        <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> › </Text>
        <Text style={[styles.breadcrumbText, { color: theme.text }]}>{drummerName}'s Cymbals</Text>
      </View>

      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          What Cymbals Does {drummerName} Use?
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>{directAnswer}</Text>
      </View>

      {setup.pieces.length > 0 && (
        <View style={[styles.quickFacts, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.primary }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>⚡ Cymbal Breakdown</Text>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderCell, styles.colType, { color: theme.secondaryText }]}>Type</Text>
            <Text style={[styles.tableHeaderCell, styles.colSize, { color: theme.secondaryText }]}>Size</Text>
            <Text style={[styles.tableHeaderCell, styles.colSeries, { color: theme.secondaryText }]}>Series</Text>
            <Text style={[styles.tableHeaderCell, styles.colModel, { color: theme.secondaryText }]}>Model</Text>
          </View>
          {setup.pieces.map((piece, i) => (
            <View key={`${piece.type}-${piece.sizeIn}-${i}`} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colType, { color: theme.text }]}>{piece.type}</Text>
              <Text style={[styles.tableCell, styles.colSize, { color: theme.text }]}>{piece.sizeIn}"</Text>
              <Text style={[styles.tableCell, styles.colSeries, { color: theme.text }]}>{piece.series || '—'}</Text>
              <Text style={[styles.tableCell, styles.colModel, { color: theme.text }]}>{piece.model}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={[styles.prose, { color: theme.text }]}>{setup.summary}</Text>

      <Text style={[styles.sourceNote, { color: theme.secondaryText }]}>Source: {setup.source}.</Text>

      <View style={[styles.faqItem, { borderColor: theme.border }]}>
        <Text style={[styles.faqQuestion, { color: theme.text }]}>What cymbals does {drummerName} use?</Text>
        <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>{directAnswer}</Text>
      </View>

      <Pressable
        onPress={() => onNavigateToDrummer && onNavigateToDrummer(drummerSlug)}
        style={[styles.drummerCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
        accessibilityRole="link"
        accessibilityLabel={`View ${drummerName}'s full drum setup`}
      >
        <Text style={[styles.drummerName, { color: theme.text }]}>🥁 View {drummerName}'s Full Drum Setup →</Text>
      </Pressable>

      {brand && (
        <Pressable
          onPress={() => onNavigateToBrand && onNavigateToBrand(brand.slug)}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`More about ${brand.name}`}
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🔔 More About {brand.name} →</Text>
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

      {setup.relatedArticle && onNavigateToArticle && (
        <Pressable
          onPress={() => onNavigateToArticle(setup.relatedArticle.slug)}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={setup.relatedArticle.label}
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🕯️ {setup.relatedArticle.label} →</Text>
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
  quickFacts: { padding: 20, borderRadius: 12, borderWidth: 2, marginBottom: 16 },
  tableHeaderRow: { flexDirection: 'row', paddingBottom: 6, marginBottom: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(128,128,128,0.3)' },
  tableHeaderCell: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', paddingVertical: 6 },
  tableCell: { fontSize: 14 },
  colType: { flex: 1.2, textTransform: 'capitalize' },
  colSize: { flex: 0.8 },
  colSeries: { flex: 1.5 },
  colModel: { flex: 1.8 },
  prose: { fontSize: 15, lineHeight: 22, marginBottom: 12 },
  sourceNote: { fontSize: 12, fontStyle: 'italic', marginBottom: 20 },
  faqItem: { borderTopWidth: 1, paddingTop: 12, marginBottom: 20 },
  faqQuestion: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  faqAnswer: { fontSize: 14, lineHeight: 21 },
  drummerCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  drummerName: { fontSize: 16, fontWeight: '600' },
  linkCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  backButton: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, marginVertical: 20 },
  backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default CymbalSetupPage;
