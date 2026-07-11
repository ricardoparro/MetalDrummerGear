// Signature Snare Page Component — Issue #4311 (phase 3/4 of epic #4308)
//
// Renders /snares/signature/<drummer>: what snare a given drummer uses,
// sourced from the verified data/snares.js mapping. Only rendered for
// drummers with a confirmed isSignature: true record (gated in App.js's
// isSignatureSnarePage() and again here as a defensive check) — never a
// thin/empty page for a stock (non-signature) snare.

import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { toSlug } from '../utils/urlHelpers';
import {
  getSignatureSnarePageData,
  updateSignatureSnareMeta,
  generateSignatureSnareSchema,
  generateSignatureSnareDirectAnswer,
} from '../data/signatureSnarePages';
import { REFERENCE_PAGE_ORDER, REFERENCE_PAGES } from '../data/snareReferencePages';

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
  onNavigateToReference,
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
        <Text style={styles.emoji}>🥁</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Signature Snare Page Not Found</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          This drummer doesn't have a confirmed signature snare model yet.
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
  const directAnswer = generateSignatureSnareDirectAnswer(data);

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
          {drummerName} plays the {snare.brand} {snare.model}.
        </Text>
      </View>

      <View style={[styles.quickFacts, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.primary }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>⚡ Snare Specs</Text>
        {[
          { label: 'Brand', value: snare.brand },
          { label: 'Model', value: snare.model },
          { label: 'Size', value: `${snare.sizeIn}"` },
          { label: 'Depth', value: `${snare.depthIn}"` },
          ...(snare.shellMaterial ? [{ label: 'Shell', value: snare.shellMaterial }] : []),
        ].map((f) => (
          <View key={f.label} style={styles.factRow}>
            <Text style={[styles.factLabel, { color: theme.secondaryText }]}>{f.label}</Text>
            <Text style={[styles.factValue, { color: theme.text }]}>{f.value}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.prose, { color: theme.text }]}>{directAnswer}</Text>

      <Text style={[styles.sourceNote, { color: theme.secondaryText }]}>Source: {snare.source}.</Text>

      <View style={[styles.faqItem, { borderColor: theme.border }]}>
        <Text style={[styles.faqQuestion, { color: theme.text }]}>What snare does {drummerName} use?</Text>
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
          accessibilityLabel="Back to the snares guide"
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🥁 More on Snare Shells, Sizes & Tuning →</Text>
        </Pressable>
      )}

      <View style={styles.otherPages}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>More snare guides</Text>
        {REFERENCE_PAGE_ORDER.map((slug) => (
          <Pressable
            key={slug}
            onPress={() => onNavigateToReference && onNavigateToReference(slug)}
            style={{ marginBottom: 8 }}
            accessibilityRole="link"
          >
            <Text style={[styles.otherPageLink, { color: theme.primary }]}>{REFERENCE_PAGES[slug].h1}</Text>
          </Pressable>
        ))}
      </View>

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
  prose: { fontSize: 15, lineHeight: 22, marginBottom: 12 },
  sourceNote: { fontSize: 12, fontStyle: 'italic', marginBottom: 20 },
  faqItem: { borderTopWidth: 1, paddingTop: 12, marginBottom: 20 },
  faqQuestion: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  faqAnswer: { fontSize: 14, lineHeight: 21 },
  drummerCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  drummerName: { fontSize: 16, fontWeight: '600' },
  linkCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  otherPages: { marginTop: 8, marginBottom: 12 },
  otherPageLink: { fontSize: 15, fontWeight: '600' },
  backButton: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, marginVertical: 20 },
  backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default SignatureSnarePage;
