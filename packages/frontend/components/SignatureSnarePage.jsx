// Signature Snare Page Component — Issue #4311 (phase 3 of epic #4308)
//
// Renders /snares/signature/<drummer>: the hero product page for a
// drummer's signature snare, sourced from the verified data/snares.js
// mapping (phase 1, #4309). Only rendered for drummers whose record has
// isSignature: true (gated in App.js's isSignatureSnarePage() and again
// here as a defensive check) — never a thin page for a stock snare.
// Mirrors SignatureStickPage.jsx (#4157) / CymbalSetupPage.jsx (#4306).

import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { toSlug } from '../utils/urlHelpers';
import {
  getSignatureSnarePageData,
  updateSignatureSnareMeta,
  generateSignatureSnareSchema,
  generateSignatureSnareAnswer,
} from '../data/signatureSnarePages';
import { hasBrand } from '../data/brands';

// ==========================================
// SEO SCHEMA INJECTION (mirrors SignatureStickPage)
// ==========================================
function injectSchema(schema) {
  if (typeof document === 'undefined' || !schema) return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="signature-snare"]');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'signature-snare');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="signature-snare"]');
  if (existing) existing.remove();
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export function SignatureSnarePage({
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
  const data = drummer ? getSignatureSnarePageData(drummerSlug, drummer.name) : null;

  useEffect(() => {
    if (data && Platform.OS === 'web') {
      updateSignatureSnareMeta(data);
      injectSchema(generateSignatureSnareSchema(data));
    }
    return () => removeSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drummerSlug, data?.snare?.drummerSlug]);

  if (!data) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={styles.emoji}>🪘</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Signature Snare Not Found</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          This drummer doesn't have a confirmed signature snare mapping yet.
        </Text>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} style={[styles.backButton, { backgroundColor: theme.primary }]} accessibilityRole="link">
            <Text style={styles.backButtonText}>← Snares Guide</Text>
          </Pressable>
        )}
      </View>
    );
  }

  const { snare, drummerName } = data;
  const brandSlug = snare.brand ? toSlug(snare.brand) : null;

  const specs = [
    { label: 'Brand', value: snare.brand },
    { label: 'Model', value: snare.model },
    { label: 'Size', value: `${snare.sizeIn}" x ${snare.depthIn}"` },
    ...(snare.shellMaterial ? [{ label: 'Shell', value: snare.shellMaterial }] : []),
  ].filter((f) => f.value != null);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.breadcrumbs}>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} accessibilityRole="link" accessibilityLabel="Snares guide">
            <Text style={[styles.breadcrumbText, { color: theme.primary }]}>Snares</Text>
          </Pressable>
        )}
        <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> › </Text>
        <Text style={[styles.breadcrumbText, { color: theme.text }]}>{drummerName}'s Signature Snare</Text>
      </View>

      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          What Snare Does {drummerName} Use?
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          {generateSignatureSnareAnswer(data)}
        </Text>
      </View>

      <View style={[styles.quickFacts, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.primary }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>🪘 Snare Specs</Text>
        {specs.map((f) => (
          <View key={f.label} style={styles.factRow}>
            <Text style={[styles.factLabel, { color: theme.secondaryText }]}>{f.label}</Text>
            <Text style={[styles.factValue, { color: theme.text }]}>{f.value}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sourceNote, { color: theme.secondaryText }]}>Source: {snare.source}.</Text>

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
          accessibilityLabel={`More about ${snare.brand}`}
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🪘 More About {snare.brand} →</Text>
        </Pressable>
      )}

      {onNavigateToHub && (
        <Pressable
          onPress={onNavigateToHub}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel="Back to the snares guide"
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🪘 More on Snare Shells, Sizes & Tuning →</Text>
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
  factRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  factLabel: { fontSize: 14 },
  factValue: { fontSize: 14, fontWeight: '600' },
  sourceNote: { fontSize: 12, fontStyle: 'italic', marginBottom: 20 },
  drummerCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  drummerName: { fontSize: 16, fontWeight: '600' },
  linkCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  backButton: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, marginVertical: 20 },
  backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default SignatureSnarePage;
