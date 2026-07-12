// Pedal Setup Page Component — Issue #4393 (phase 3/4 of epic #4387)
//
// Renders /pedals/setups/<drummer>: what bass drum pedal a given drummer
// uses, sourced from the verified data/pedals.js mapping. Only rendered for
// drummers with a confirmed pedal (gated in App.js's isPedalSetupPage() and
// again here as a defensive check) — never a thin/empty page.

import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { toSlug } from '../utils/urlHelpers';
import {
  getPedalSetupPageData,
  updatePedalSetupMeta,
  generatePedalSetupSchema,
  generatePedalSetupDirectAnswer,
} from '../data/pedalSetupPages';

// ==========================================
// SEO SCHEMA INJECTION (mirrors CymbalSetupPage)
// ==========================================
function injectSchema(schema) {
  if (typeof document === 'undefined' || !schema) return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="pedal-setup"]');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'pedal-setup');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="pedal-setup"]');
  if (existing) existing.remove();
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export function PedalSetupPage({
  drummerSlug,
  drummers = [],
  theme: themeProp,
  onBack,
  onNavigateToDrummer,
  onNavigateToHub,
  onNavigateToBestForMetal,
}) {
  const themeContext = useContext(ThemeContext);
  const theme = themeProp || themeContext;

  const drummer = drummerSlug ? drummers.find((d) => toSlug(d.name) === drummerSlug) : null;
  const data = drummer ? getPedalSetupPageData(drummerSlug, drummer.name) : null;

  useEffect(() => {
    if (data && Platform.OS === 'web') {
      updatePedalSetupMeta(data);
      injectSchema(generatePedalSetupSchema(data));
    }
    return () => removeSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drummerSlug, data?.pedal?.drummerSlug]);

  if (!data) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={styles.emoji}>⚙️</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Pedal Setup Page Not Found</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          This drummer doesn't have a confirmed pedal setup yet.
        </Text>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} style={[styles.backButton, { backgroundColor: theme.primary }]} accessibilityRole="link">
            <Text style={styles.backButtonText}>← Pedals Guide</Text>
          </Pressable>
        )}
      </View>
    );
  }

  const { pedal, drummerName } = data;
  const directAnswer = generatePedalSetupDirectAnswer(data);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.breadcrumbs}>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} accessibilityRole="link" accessibilityLabel="Pedals guide">
            <Text style={[styles.breadcrumbText, { color: theme.primary }]}>Pedals</Text>
          </Pressable>
        )}
        <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> › </Text>
        <Text style={[styles.breadcrumbText, { color: theme.text }]}>{drummerName}'s Pedal</Text>
      </View>

      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          What Pedals Does {drummerName} Use?
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>{directAnswer}</Text>
      </View>

      <View style={[styles.quickFacts, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.primary }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>⚡ Pedal Breakdown</Text>
        <View style={styles.tableRow}>
          <Text style={[styles.tableLabel, { color: theme.secondaryText }]}>Brand</Text>
          <Text style={[styles.tableValue, { color: theme.text }]}>{pedal.brand || '—'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableLabel, { color: theme.secondaryText }]}>Model</Text>
          <Text style={[styles.tableValue, { color: theme.text }]}>{pedal.model || '—'}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableLabel, { color: theme.secondaryText }]}>Configuration</Text>
          <Text style={[styles.tableValue, styles.capitalize, { color: theme.text }]}>{pedal.configuration}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableLabel, { color: theme.secondaryText }]}>Drive Type</Text>
          <Text style={[styles.tableValue, styles.capitalize, { color: theme.text }]}>{pedal.driveType || '—'}</Text>
        </View>
      </View>

      <Text style={[styles.prose, { color: theme.text }]}>{pedal.summary}</Text>

      <Text style={[styles.sourceNote, { color: theme.secondaryText }]}>Source: {pedal.source}.</Text>

      <View style={[styles.faqItem, { borderColor: theme.border }]}>
        <Text style={[styles.faqQuestion, { color: theme.text }]}>What pedals does {drummerName} use?</Text>
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

      {onNavigateToHub && (
        <Pressable
          onPress={onNavigateToHub}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel="Back to the pedals guide"
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>⚙️ More on Pedal Drive Types, Doubles & Setup →</Text>
        </Pressable>
      )}

      {onNavigateToBestForMetal && (
        <Pressable
          onPress={onNavigateToBestForMetal}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel="Best bass drum pedals for metal buying guide"
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🤘 Best Pedals for Metal: Drive Type & Budget Guide →</Text>
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
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(128,128,128,0.2)' },
  tableLabel: { fontSize: 13, fontWeight: '600', textTransform: 'uppercase' },
  tableValue: { fontSize: 14, fontWeight: '600' },
  capitalize: { textTransform: 'capitalize' },
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

export default PedalSetupPage;
