// DrummersUsingKitPage — /gear/:brand/:series/drummers-using
// Issue #2403 (split 1/4 of #2215): purchase-intent scaffold.
//
// Renders the list of pro metal drummers who use a specific brand+series kit.
// Data source: data/drummersByKit.js (populated in splits 2–4).

import React, { useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { DRUMMERS_BY_KIT } from '../data/drummersByKit';

const BASE_URL = 'https://metalforge.io';

function toDisplayName(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function injectSchema(brandSlug, seriesSlug, drummers) {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="drummers-using-kit"]');
  if (existing) existing.remove();

  const brandName = toDisplayName(brandSlug);
  const seriesName = toDisplayName(seriesSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
  const pageUrl = `${BASE_URL}/gear/${brandSlug}/${seriesSlug}/drummers-using`;

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Metal Drummers Who Use ${brandName} ${seriesName}`,
    description: `Professional metal drummers who use the ${brandName} ${seriesName}.`,
    url: pageUrl,
    numberOfItems: drummers.length,
    itemListElement: drummers.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE_URL}/drummer/${d.slug}`,
      name: d.name,
    })),
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Which metal drummers use the ${brandName} ${seriesName}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: drummers.length > 0
            ? `Notable metal drummers who use the ${brandName} ${seriesName} include ${drummers.map(d => d.name).join(', ')}.`
            : `The ${brandName} ${seriesName} is used by several professional metal drummers.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is the ${brandName} ${seriesName} good for metal drumming?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes — the ${brandName} ${seriesName} is trusted by professional metal drummers for its durability, tone, and playability at extreme tempos.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do ${brandName} ${seriesName} drummers endorse the kit?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: drummers.some(d => d.endorsee)
            ? `Yes. ${drummers.filter(d => d.endorsee).map(d => d.name).join(' and ')} are official ${brandName} endorsees.`
            : `Several drummers on this list are professional-level players who rely on the ${brandName} ${seriesName} on stage and in the studio.`,
        },
      },
    ],
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'drummers-using-kit');
  script.textContent = JSON.stringify([itemList, faqPage]);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const el = document.querySelector('script[type="application/ld+json"][data-page="drummers-using-kit"]');
  if (el) el.remove();
}

export function DrummersUsingKitPage({ brandSlug, seriesSlug, theme, onNavigateToDrummer, onBack }) {
  const kitKey = `${brandSlug}/${seriesSlug}`;
  const drummers = DRUMMERS_BY_KIT[kitKey] || [];
  const brandName = toDisplayName(brandSlug);
  const seriesName = seriesSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  useEffect(() => {
    injectSchema(brandSlug, seriesSlug, drummers);
    return () => removeSchema();
  }, [brandSlug, seriesSlug]);

  const bg = theme?.background ?? '#111';
  const fg = theme?.text ?? '#fff';
  const primary = theme?.primary ?? '#e53935';
  const card = theme?.card ?? '#1c1c1e';
  const subtle = theme?.textMuted ?? '#888';

  return (
    <ScrollView style={[s.root, { backgroundColor: bg }]} contentContainerStyle={s.content}>
      {/* Breadcrumb */}
      <View style={s.breadcrumb}>
        <Pressable onPress={() => {
          if (Platform.OS === 'web' && typeof window !== 'undefined') {
            window.history.pushState({}, '', '/gear');
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }}>
          <Text style={[s.breadLink, { color: primary }]}>Gear</Text>
        </Pressable>
        <Text style={[s.breadSep, { color: subtle }]}>{' › '}</Text>
        <Pressable onPress={() => {
          if (Platform.OS === 'web' && typeof window !== 'undefined') {
            window.history.pushState({}, '', `/gear/${brandSlug}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }}>
          <Text style={[s.breadLink, { color: primary }]}>{brandName}</Text>
        </Pressable>
        <Text style={[s.breadSep, { color: subtle }]}>{' › '}</Text>
        <Text style={[s.breadCurrent, { color: fg }]}>{seriesName} Drummers</Text>
      </View>

      {/* Heading */}
      <Text style={[s.title, { color: fg }]}>
        {seriesName} Drummers
      </Text>
      <Text style={[s.subtitle, { color: subtle }]}>
        Which metal drummers use the {brandName} {seriesName}?
      </Text>

      {/* Drummer list */}
      {drummers.length === 0 ? (
        <View style={[s.emptyCard, { backgroundColor: card }]}>
          <Text style={[s.emptyText, { color: subtle }]}>
            Drummer profiles for this kit are coming soon.
          </Text>
        </View>
      ) : (
        drummers.map((drummer) => (
          <Pressable
            key={drummer.slug}
            style={[s.drummerCard, { backgroundColor: card }]}
            onPress={() => onNavigateToDrummer?.(drummer.slug)}
            accessibilityRole="button"
            accessibilityLabel={`View ${drummer.name}'s profile`}
          >
            <View style={s.drummerHeader}>
              <Text style={[s.drummerName, { color: fg }]}>{drummer.name}</Text>
              {drummer.endorsee && (
                <View style={[s.endorseeBadge, { backgroundColor: primary }]}>
                  <Text style={s.endorseeText}>Endorsee</Text>
                </View>
              )}
            </View>
            <Text style={[s.drummerBand, { color: primary }]}>{drummer.band}</Text>
            {drummer.yearsUsed ? (
              <Text style={[s.drummerYears, { color: subtle }]}>Years used: {drummer.yearsUsed}</Text>
            ) : null}
            {drummer.config ? (
              <Text style={[s.drummerConfig, { color: subtle }]} numberOfLines={2}>{drummer.config}</Text>
            ) : null}
          </Pressable>
        ))
      )}

      {/* Internal link to brand page */}
      <View style={[s.brandLink, { borderTopColor: card }]}>
        <Text style={[s.brandLinkLabel, { color: subtle }]}>Explore more {brandName} gear →</Text>
        <Pressable
          onPress={() => {
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.history.pushState({}, '', `/gear/${brandSlug}`);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          accessibilityRole="link"
          accessibilityLabel={`View all ${brandName} gear`}
        >
          <Text style={[s.brandLinkText, { color: primary }]}>
            All {brandName} Gear
          </Text>
        </Pressable>
      </View>

      {/* Back nav */}
      <Pressable
        style={[s.backButton, { borderColor: primary }]}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back to gear"
      >
        <Text style={[s.backButtonText, { color: primary }]}>← Back to Gear</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  breadcrumb: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' },
  breadLink: { fontSize: 13 },
  breadSep: { fontSize: 13 },
  breadCurrent: { fontSize: 13 },
  title: { fontSize: 26, fontWeight: '700', marginBottom: 6 },
  subtitle: { fontSize: 15, marginBottom: 24 },
  emptyCard: { padding: 20, borderRadius: 10, marginBottom: 12, alignItems: 'center' },
  emptyText: { fontSize: 14, textAlign: 'center' },
  drummerCard: { padding: 16, borderRadius: 10, marginBottom: 12 },
  drummerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  drummerName: { fontSize: 17, fontWeight: '600', flex: 1 },
  endorseeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  endorseeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  drummerBand: { fontSize: 14, marginBottom: 4 },
  drummerYears: { fontSize: 13, marginBottom: 4 },
  drummerConfig: { fontSize: 12 },
  brandLink: { marginTop: 24, paddingTop: 20, borderTopWidth: 1 },
  brandLinkLabel: { fontSize: 14, marginBottom: 8 },
  brandLinkText: { fontSize: 16, fontWeight: '600' },
  backButton: { marginTop: 20, padding: 12, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  backButtonText: { fontSize: 15, fontWeight: '600' },
});

export default DrummersUsingKitPage;
