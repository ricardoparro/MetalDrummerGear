// Gear Series Page Component
// Issue #996 (split 2/4 of #871): /gear/<brand>/<series>/drummers-using
//
// Renders the reusable component for the "drummers using <brand> <series>"
// SEO landing pages. The data layer lives in data/gearSeriesPages.js (which
// builds page-ready content from the #995 gear index); this component turns
// that data into a themed, schema-rich page. #997 sitemaps the slugs.

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getGearSeriesData, updateGearSeriesMeta } from '../data/gearSeriesPages';

// ==========================================
// SEO SCHEMA INJECTION (mirrors TechniqueDrummersPage / DrummerGearCategoryPage)
// data.schema is an array [Product, FAQPage]; a single ld+json script may hold
// an array of schema objects.
// ==========================================
function injectSchema(schema) {
  if (typeof document === 'undefined' || !schema) return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="gear-series"]');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'gear-series');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="gear-series"]');
  if (existing) existing.remove();
}

function openExternal(url) {
  if (!url) return;
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

// ==========================================
// SECTION SUB-COMPONENTS
// ==========================================

function AffiliateCTA({ data, theme }) {
  if (!data.affiliate) return null;
  return (
    <View style={styles.ctaRow}>
      {data.affiliate.thomann && (
        <Pressable
          onPress={() => openExternal(data.affiliate.thomann)}
          style={[styles.ctaButton, { backgroundColor: theme.primary }]}
          accessibilityRole="link"
          accessibilityLabel={`Shop the ${data.brand} ${data.series} at Thomann`}
        >
          <Text style={styles.ctaButtonText}>🛒 Shop at Thomann (EU)</Text>
        </Pressable>
      )}
      {data.affiliate.sweetwater && (
        <Pressable
          onPress={() => openExternal(data.affiliate.sweetwater)}
          style={[styles.ctaButton, { backgroundColor: theme.primary }]}
          accessibilityRole="link"
          accessibilityLabel={`Shop the ${data.brand} ${data.series} at Sweetwater`}
        >
          <Text style={styles.ctaButtonText}>🛒 Shop at Sweetwater (US)</Text>
        </Pressable>
      )}
    </View>
  );
}

function QuickFactsBox({ data, theme }) {
  const facts = [
    { label: 'Brand', value: data.brand },
    { label: 'Series', value: data.series },
    { label: 'Price (est.)', value: data.priceLabel + (data.priceUsd ? ` / ${data.priceUsd}` : '') },
    { label: 'Pro Drummers', value: String(data.drummerCount) },
    { label: 'Signature Player', value: data.signatureDrummer || '—' },
  ];
  return (
    <View style={[styles.quickFacts, { backgroundColor: theme.cardBg, borderColor: theme.primary }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>⚡ Quick Facts</Text>
      {facts.map((f, i) => (
        <View key={i} style={styles.factRow}>
          <Text style={[styles.factLabel, { color: theme.secondaryText }]}>{f.label}</Text>
          <Text style={[styles.factValue, { color: theme.text }]}>{f.value}</Text>
        </View>
      ))}
    </View>
  );
}

function DrummersList({ drummers, brand, series, theme, onSelectDrummer }) {
  if (!drummers || drummers.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>🥁 Drummers</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>Drummer list coming soon.</Text>
      </View>
    );
  }
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        🥁 Drummers Who Play the {brand} {series}
      </Text>
      {drummers.map((d, index) => (
        <Pressable
          key={d.id ?? index}
          onPress={() => onSelectDrummer && d.slug && onSelectDrummer(d.slug)}
          style={[styles.drummerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`${d.name}${d.band ? ` - ${d.band}` : ''} — view profile`}
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>{d.name}</Text>
          {d.band ? <Text style={[styles.drummerBand, { color: theme.secondaryText }]}>{d.band}</Text> : null}
          {d.configString ? (
            <Text style={[styles.drummerConfig, { color: theme.primary }]}>{d.configString}</Text>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}

function FaqList({ faq, theme }) {
  const [expanded, setExpanded] = useState({});
  if (!faq || faq.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>❓ Frequently Asked Questions</Text>
      {faq.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))}
          style={[styles.faqItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
        >
          <Text style={[styles.faqQuestion, { color: theme.text }]}>
            {expanded[index] ? '▼' : '▶'} {item.question}
          </Text>
          {expanded[index] && (
            <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>{item.answer}</Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

function RelatedSeries({ related, theme, onSelectSeries }) {
  if (!related || related.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>🔗 Related Series</Text>
      <View style={styles.chipsRow}>
        {related.slice(0, 8).map((r, index) => (
          <Pressable
            key={index}
            onPress={() => onSelectSeries && onSelectSeries(r.brandSlug, r.seriesSlug)}
            style={[styles.chip, { backgroundColor: theme.primary + '20', borderColor: theme.primary }]}
            accessibilityRole="link"
            accessibilityLabel={`${r.brand} ${r.series} — ${r.drummerCount} drummers`}
          >
            <Text style={[styles.chipText, { color: theme.primary }]}>
              {r.series} ({r.drummerCount})
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export function GearSeriesPage({
  brandSlug,
  seriesSlug,
  drummers = [],
  theme: themeProp,
  onBack,
  onNavigateToDrummer,
  onNavigate,
}) {
  const themeContext = useContext(ThemeContext);
  const theme = themeProp || themeContext;

  const data = brandSlug && seriesSlug ? getGearSeriesData(brandSlug, seriesSlug, drummers) : null;

  useEffect(() => {
    if (data && Platform.OS === 'web') {
      updateGearSeriesMeta(data);
      injectSchema(data.schema);
    }
    return () => removeSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandSlug, seriesSlug, data?.drummerCount]);

  if (!data) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={styles.emoji}>🥁</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Gear Series Not Found</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          This gear series page doesn't exist or has fewer than two known players.
        </Text>
        {onBack && (
          <Pressable onPress={onBack} style={[styles.backButton, { backgroundColor: theme.primary }]} accessibilityRole="link">
            <Text style={styles.backButtonText}>← Go Back</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          {data.drummerCount} Metal Drummers Who Use the {data.brand} {data.series}
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          See the pros who play the {data.brand} {data.series}, their exact configurations,
          estimated street price, and where to buy.
        </Text>
      </View>

      <AffiliateCTA data={data} theme={theme} />
      <QuickFactsBox data={data} theme={theme} />
      <DrummersList
        drummers={data.drummers}
        brand={data.brand}
        series={data.series}
        theme={theme}
        onSelectDrummer={onNavigateToDrummer}
      />
      <FaqList faq={data.faq} theme={theme} />
      <RelatedSeries related={data.relatedSeries} theme={theme} onSelectSeries={onNavigate} />

      {onBack && (
        <Pressable onPress={onBack} style={[styles.backButton, { backgroundColor: theme.primary }]} accessibilityRole="link">
          <Text style={styles.backButtonText}>← Back</Text>
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
  header: { marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16, marginTop: 8 },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  ctaButton: { paddingHorizontal: 18, paddingVertical: 12, borderRadius: 8, marginRight: 8, marginBottom: 8 },
  ctaButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  quickFacts: { padding: 20, borderRadius: 12, borderWidth: 2, marginBottom: 20 },
  factRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  factLabel: { fontSize: 14 },
  factValue: { fontSize: 14, fontWeight: '600' },
  drummerCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  drummerName: { fontSize: 16, fontWeight: '600' },
  drummerBand: { fontSize: 14, marginTop: 4 },
  drummerConfig: { fontSize: 14, marginTop: 8, fontStyle: 'italic' },
  faqItem: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  faqQuestion: { fontSize: 16, fontWeight: '600' },
  faqAnswer: { fontSize: 14, marginTop: 12, lineHeight: 22 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, marginRight: 8, marginBottom: 8 },
  chipText: { fontSize: 14, fontWeight: '600' },
  backButton: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, marginVertical: 20 },
  backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default GearSeriesPage;
