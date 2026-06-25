// DrummersUsingKitPage
// Issue #2403 (split 1/4 of #2215): /gear/:brand/:series/drummers-using
// Purchase-intent landing pages mapping kit slugs → pro metal drummers.

import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { DRUMMERS_BY_KIT } from '../data/drummersByKit';

const BASE_URL = 'https://metalforge.io';

function toDisplayName(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function buildItemListSchema(brandSlug, seriesSlug, drummers) {
  const brandName = toDisplayName(brandSlug);
  const seriesName = toDisplayName(seriesSlug);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Metal Drummers Who Use ${brandName} ${seriesName}`,
    description: `Professional metal drummers who play the ${brandName} ${seriesName} drum kit.`,
    url: `${BASE_URL}/gear/${brandSlug}/${seriesSlug}/drummers-using`,
    numberOfItems: drummers.length,
    itemListElement: drummers.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: d.name,
      url: `${BASE_URL}/drummers/${d.slug}`,
      description: `${d.name} (${d.band}) uses the ${brandName} ${seriesName}${d.yearsUsed ? ` — ${d.yearsUsed}` : ''}.`,
    })),
  };
}

function buildFaqSchema(brandName, seriesName, drummers) {
  const first = drummers[0]?.name || 'Professional metal drummers';
  const second = drummers[1]?.name;
  const nameList = drummers.map(d => d.name).join(', ') || 'various metal drummers';
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Which metal drummers use the ${brandName} ${seriesName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${nameList} are among the metal drummers known to use the ${brandName} ${seriesName}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is the ${brandName} ${seriesName} good for metal drumming?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes — the ${brandName} ${seriesName} is chosen by professional metal artists like ${first}${second ? ` and ${second}` : ''} for its projection, durability, and tuning stability under heavy playing.`,
        },
      },
      {
        '@type': 'Question',
        name: `What configuration does ${first} use on the ${brandName} ${seriesName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: drummers[0]?.config
            ? `${first} plays: ${drummers[0].config}.`
            : `Configuration details for ${first} on the ${brandName} ${seriesName} are available on their full gear profile.`,
        },
      },
    ],
  };
}

function injectSchema(brandSlug, seriesSlug, drummers) {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="drummers-by-kit"]');
  if (existing) existing.remove();
  const brandName = toDisplayName(brandSlug);
  const seriesName = toDisplayName(seriesSlug);
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'drummers-by-kit');
  script.textContent = JSON.stringify([
    buildItemListSchema(brandSlug, seriesSlug, drummers),
    buildFaqSchema(brandName, seriesName, drummers),
  ]);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const el = document.querySelector('script[type="application/ld+json"][data-page="drummers-by-kit"]');
  if (el) el.remove();
}

function navigate(path) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

export function DrummersUsingKitPage({ brandSlug, seriesSlug, onBack }) {
  const theme = useContext(ThemeContext);
  const kitKey = `${brandSlug}/${seriesSlug}`;
  const drummers = DRUMMERS_BY_KIT[kitKey] || [];
  const brandName = toDisplayName(brandSlug);
  const seriesName = toDisplayName(seriesSlug);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = `${seriesName} Drummers — Which Metal Drummers Use ${brandName} ${seriesName}?`;
      injectSchema(brandSlug, seriesSlug, drummers);
    }
    return () => removeSchema();
  }, [brandSlug, seriesSlug]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          {seriesName} Drummers
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Which metal drummers use the{' '}
          <Text
            style={[styles.brandLink, { color: theme.primary }]}
            onPress={() => navigate(`/gear/${brandSlug}`)}
            accessibilityRole="link"
          >
            {brandName}
          </Text>{' '}
          {seriesName}?
        </Text>
      </View>

      {drummers.length === 0 ? (
        <View style={[styles.section, styles.emptyBox, { borderColor: theme.border }]}>
          <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
            Drummer list coming soon — check back after splits 2–4 of this feature.
          </Text>
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Pro Drummers Using the {brandName} {seriesName}
          </Text>
          {drummers.map((d, i) => (
            <Pressable
              key={d.slug || i}
              style={[styles.drummerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
              onPress={() => navigate(`/drummers/${d.slug}`)}
              accessibilityRole="link"
              accessibilityLabel={`${d.name} (${d.band}) — view drummer profile`}
            >
              <View style={styles.drummerHeader}>
                <Text style={[styles.drummerName, { color: theme.text }]}>{d.name}</Text>
                {d.endorsee && (
                  <Text style={[styles.endorseeBadge, { backgroundColor: theme.primary }]}>
                    Endorsee
                  </Text>
                )}
              </View>
              {d.band ? (
                <Text style={[styles.drummerBand, { color: theme.secondaryText }]}>{d.band}</Text>
              ) : null}
              {d.yearsUsed ? (
                <Text style={[styles.drummerYears, { color: theme.secondaryText }]}>
                  Years used: {d.yearsUsed}
                </Text>
              ) : null}
              {d.config ? (
                <Text style={[styles.drummerConfig, { color: theme.primary }]}>{d.config}</Text>
              ) : null}
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Frequently Asked Questions</Text>
        <View style={[styles.faqItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <Text style={[styles.faqQ, { color: theme.text }]}>
            Which metal drummers use the {brandName} {seriesName}?
          </Text>
          <Text style={[styles.faqA, { color: theme.secondaryText }]}>
            {drummers.length > 0
              ? `${drummers.map(d => d.name).join(', ')} are among the professional metal drummers known to use the ${brandName} ${seriesName}.`
              : `Drummer data is being added — check back soon.`}
          </Text>
        </View>
        <View style={[styles.faqItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <Text style={[styles.faqQ, { color: theme.text }]}>
            Is the {brandName} {seriesName} good for metal?
          </Text>
          <Text style={[styles.faqA, { color: theme.secondaryText }]}>
            The {brandName} {seriesName} is chosen by professional metal artists for its projection,
            durability, and tuning stability under heavy playing.
          </Text>
        </View>
        <View style={[styles.faqItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
          <Text style={[styles.faqQ, { color: theme.text }]}>
            Where can I buy the {brandName} {seriesName}?
          </Text>
          <Text style={[styles.faqA, { color: theme.secondaryText }]}>
            The {brandName} {seriesName} is available through major music retailers. See the{' '}
            <Text
              style={{ color: theme.primary }}
              onPress={() => navigate(`/gear/${brandSlug}`)}
              accessibilityRole="link"
            >
              {brandName} brand page
            </Text>{' '}
            for pricing and retailer links.
          </Text>
        </View>
      </View>

      {onBack && (
        <Pressable
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: theme.primary }]}
          accessibilityRole="link"
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 40 },
  header: { marginBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  brandLink: { fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  emptyBox: { padding: 20, borderRadius: 8, borderWidth: 1 },
  emptyText: { fontSize: 15, lineHeight: 22 },
  drummerCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  drummerHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  drummerName: { fontSize: 17, fontWeight: '700', flex: 1 },
  endorseeBadge: { fontSize: 11, fontWeight: '700', color: '#fff', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, overflow: 'hidden' },
  drummerBand: { fontSize: 14, marginBottom: 2 },
  drummerYears: { fontSize: 13, marginBottom: 4 },
  drummerConfig: { fontSize: 13, fontStyle: 'italic', marginTop: 4 },
  faqItem: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  faqQ: { fontSize: 15, fontWeight: '600', marginBottom: 8 },
  faqA: { fontSize: 14, lineHeight: 22 },
  backButton: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, marginTop: 8 },
  backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default DrummersUsingKitPage;
