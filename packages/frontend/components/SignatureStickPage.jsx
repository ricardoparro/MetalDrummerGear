// Signature Stick Page Component — Issue #4138 (phase 3/4 of epic #4135)
//
// Renders /drumsticks/signature/<drummer>: what drumsticks a given drummer uses,
// sourced from the verified data/drumsticks.js mapping. Only rendered for
// drummers with a confirmed mapping (gated in App.js's isSignatureStickPage()
// and again here as a defensive check) — never a thin/empty page.

import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { toSlug } from '../utils/urlHelpers';
import {
  getSignatureStickPageData,
  updateSignatureStickMeta,
  generateSignatureStickSchema,
} from '../data/signatureStickPages';
import { getBrandForStick } from '../data/drumstickBrands';

// ==========================================
// SEO SCHEMA INJECTION (mirrors GearSeriesPage)
// ==========================================
function injectSchema(schema) {
  if (typeof document === 'undefined' || !schema) return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="signature-stick"]');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'signature-stick');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="signature-stick"]');
  if (existing) existing.remove();
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export function SignatureStickPage({
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
  const data = drummer ? getSignatureStickPageData(drummerSlug, drummer.name) : null;

  useEffect(() => {
    if (data && Platform.OS === 'web') {
      updateSignatureStickMeta(data);
      injectSchema(generateSignatureStickSchema(data));
    }
    return () => removeSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drummerSlug, data?.stick?.id]);

  if (!data) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={styles.emoji}>🥢</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Signature Stick Page Not Found</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          This drummer doesn't have a confirmed signature stick mapping yet.
        </Text>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} style={[styles.backButton, { backgroundColor: theme.primary }]} accessibilityRole="link">
            <Text style={styles.backButtonText}>← Drumsticks Guide</Text>
          </Pressable>
        )}
      </View>
    );
  }

  const { stick, drummerName } = data;
  const brand = getBrandForStick(stick);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.breadcrumbs}>
        {onNavigateToHub && (
          <Pressable onPress={onNavigateToHub} accessibilityRole="link" accessibilityLabel="Drumsticks guide">
            <Text style={[styles.breadcrumbText, { color: theme.primary }]}>Drumsticks</Text>
          </Pressable>
        )}
        <Text style={[styles.breadcrumbSeparator, { color: theme.secondaryText }]}> › </Text>
        <Text style={[styles.breadcrumbText, { color: theme.text }]}>{drummerName}'s Sticks</Text>
      </View>

      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          What Drumsticks Does {drummerName} Use?
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          {drummerName} plays the {stick.brand} {stick.model}.
        </Text>
      </View>

      <View style={[styles.quickFacts, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.primary }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>⚡ Stick Specs</Text>
        {[
          { label: 'Brand', value: stick.brand },
          { label: 'Model', value: stick.model },
          { label: 'Size', value: stick.size },
          { label: 'Diameter', value: `${stick.diameterIn}"` },
          { label: 'Length', value: `${stick.lengthIn}"` },
          { label: 'Material', value: stick.material },
          { label: 'Tip', value: stick.tip },
          { label: 'Taper', value: stick.taper },
        ].map((f) => (
          <View key={f.label} style={styles.factRow}>
            <Text style={[styles.factLabel, { color: theme.secondaryText }]}>{f.label}</Text>
            <Text style={[styles.factValue, { color: theme.text }]}>{f.value}</Text>
          </View>
        ))}
      </View>

      {stick.notes && (
        <Text style={[styles.caveat, { color: theme.secondaryText }]}>{stick.notes}</Text>
      )}

      <Text style={[styles.sourceNote, { color: theme.secondaryText }]}>Source: {stick.source}.</Text>

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
          <Text style={[styles.drummerName, { color: theme.text }]}>🥢 More About {brand.name} →</Text>
        </Pressable>
      )}

      {onNavigateToHub && (
        <Pressable
          onPress={onNavigateToHub}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel="Back to the drumsticks guide"
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>📏 More on Drumstick Sizes, Materials & Tips →</Text>
        </Pressable>
      )}

      {stick.legacyArticleSlug && Platform.OS === 'web' && (
        <Pressable
          onPress={() => { window.location.href = `/articles/${stick.legacyArticleSlug}`; }}
          style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.card, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`Read ${drummerName}'s legacy tribute article`}
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>🕯️ 5 Years of Legacy →</Text>
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
  caveat: { fontSize: 13, lineHeight: 18, marginBottom: 12, fontStyle: 'italic' },
  sourceNote: { fontSize: 12, fontStyle: 'italic', marginBottom: 20 },
  drummerCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  drummerName: { fontSize: 16, fontWeight: '600' },
  linkCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  backButton: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, marginVertical: 20 },
  backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default SignatureStickPage;
