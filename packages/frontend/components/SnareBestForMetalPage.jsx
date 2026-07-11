// Best Snares for Metal guide — Issue #4312 (epic #4308 phase 4/4)
// Renders /snares/best-for-metal: why metal favours high-tension steel/brass
// shells (with the verified wood-shell exceptions), then the confirmed
// signature snares pulled live from data/snares.js. Each recommendation card
// is affiliate-CTA-ready — it renders retailer buttons automatically once
// retailerUrls is populated, and falls back to a link to the drummer profile
// until then (no /snares/signature/<drummer> page exists yet).

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import { toSlug } from '../utils/urlHelpers';
import { SIGNATURE_SNARES } from '../data/snares';
import {
  BEST_FOR_METAL_PAGE,
  generateBestForMetalCanonicalUrl,
  generateBestForMetalFaqSchema,
  generateBestForMetalArticleSchema,
  generateBestForMetalItemListSchema,
  generateBestForMetalBreadcrumbSchema,
} from '../data/snareBestForMetal';

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

// Affiliate-CTA-ready: shows a "Shop" button per populated retailer once
// retailerUrls has entries; until then, falls back to the drummer-profile
// link so the card is never a dead end.
function SnareCta({ snare, theme, onNavigateToDrummer }) {
  const retailerEntries = snare.retailerUrls ? Object.entries(snare.retailerUrls).filter(([, url]) => url) : [];
  if (retailerEntries.length === 0) {
    return (
      <CrawlableLink
        href={`/drummer/${snare.drummerSlug}`}
        onPress={onNavigateToDrummer ? () => onNavigateToDrummer(snare.drummerSlug) : undefined}
      >
        <Text style={[styles.ctaFallback, { color: theme.primary || theme.text }]}>See drummer profile & source →</Text>
      </CrawlableLink>
    );
  }
  return (
    <View style={styles.ctaRow}>
      {retailerEntries.map(([retailer, url]) => (
        <a key={retailer} href={url} target="_blank" rel="noopener noreferrer nofollow sponsored" style={{ textDecoration: 'none' }}>
          <View style={[styles.ctaButton, { backgroundColor: theme.primary }]}>
            <Text style={styles.ctaButtonText}>Shop at {retailer}</Text>
          </View>
        </a>
      ))}
    </View>
  );
}

function RecommendationCard({ snare, drummer, theme, onNavigateToDrummer }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{snare.brand ? `${snare.brand} ` : ''}{snare.model || snare.summary}</Text>
      <Text style={[styles.cardSubtitle, { color: theme.secondaryText || theme.text }]}>
        {drummer ? `Played by ${drummer.name}` : `Drummer: ${snare.drummerSlug}`}
      </Text>
      <View style={styles.specRow}>
        <Text style={[styles.specText, { color: theme.text }]}>{snare.sizeIn}" x {snare.depthIn}"</Text>
        {snare.shellMaterial && (
          <Text style={[styles.specText, { color: theme.secondaryText || theme.text }]}>{snare.shellMaterial}</Text>
        )}
      </View>
      <SnareCta snare={snare} theme={theme} onNavigateToDrummer={onNavigateToDrummer} />
    </View>
  );
}

export function SnareBestForMetalPage({ theme: themeProp, drummers = [], onBack, onNavigateToDrummer }) {
  const theme = themeProp || themes.dark;
  const page = BEST_FOR_METAL_PAGE;

  useEffect(() => {
    const url = generateBestForMetalCanonicalUrl();
    updateOgMeta({
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      url,
      type: 'article',
    });
    injectSchema('snare-best-for-metal-article', generateBestForMetalArticleSchema());
    injectSchema('snare-best-for-metal-faq', generateBestForMetalFaqSchema());
    injectSchema('snare-best-for-metal-itemlist', generateBestForMetalItemListSchema(SIGNATURE_SNARES));
    injectSchema('snare-best-for-metal-breadcrumb', generateBestForMetalBreadcrumbSchema());
    return () => {
      removeSchema('snare-best-for-metal-article');
      removeSchema('snare-best-for-metal-faq');
      removeSchema('snare-best-for-metal-itemlist');
      removeSchema('snare-best-for-metal-breadcrumb');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <CrawlableLink href="/snares" onPress={onBack} style={{ marginBottom: 12 }}>
        <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Snares guide</Text>
      </CrawlableLink>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">{page.h1}</Text>
      <Text style={[styles.intro, { color: theme.text }]}>{page.intro}</Text>

      {[page.whyMetalShells, page.whyHighTension, page.woodExceptions].map((section) => (
        <View key={section.heading} style={styles.subsection}>
          <Text style={[styles.h2, { color: theme.text }]}>{section.heading}</Text>
          <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{section.body}</Text>
        </View>
      ))}

      <Text style={[styles.h2, { color: theme.text }]}>Confirmed signature snares metal drummers play</Text>
      <View style={styles.grid}>
        {SIGNATURE_SNARES.map((snare) => {
          const drummer = drummers.find((d) => toSlug(d.name) === snare.drummerSlug);
          return (
            <View key={snare.drummerSlug} style={styles.cell}>
              <RecommendationCard snare={snare} drummer={drummer} theme={theme} onNavigateToDrummer={onNavigateToDrummer} />
            </View>
          );
        })}
      </View>

      {page.sources && page.sources.length > 0 && (
        <View style={styles.sources}>
          <Text style={[styles.sourcesTitle, { color: theme.secondaryText || theme.text }]}>Sources</Text>
          {page.sources.map((source) => (
            <Text key={source.url} style={[styles.sourceLine, { color: theme.secondaryText || theme.text }]}>
              {source.label}
            </Text>
          ))}
        </View>
      )}

      <Text style={[styles.h2, { color: theme.text }]}>Frequently asked questions</Text>
      {page.faq.map((item) => (
        <View key={item.question} style={[styles.faqItem, { borderColor: theme.border }]}>
          <Text style={[styles.faqQuestion, { color: theme.text }]}>{item.question}</Text>
          <Text style={[styles.faqAnswer, { color: theme.secondaryText || theme.text }]}>{item.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 48 },
  backLink: { fontSize: 15, fontWeight: '600' },
  h1: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  h2: { fontSize: 20, fontWeight: '700', marginTop: 22, marginBottom: 10 },
  intro: { fontSize: 16, lineHeight: 24, marginBottom: 8 },
  subsection: { marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 23 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cell: { width: '48%', minWidth: 260, marginBottom: 14 },
  card: { borderWidth: 1, borderRadius: 12, padding: 14, height: '100%' },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, marginBottom: 8 },
  specRow: { marginBottom: 10, flexDirection: 'row', gap: 8 },
  specText: { fontSize: 13, lineHeight: 18 },
  ctaFallback: { fontSize: 13, fontWeight: '700' },
  ctaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  ctaButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, marginRight: 8, marginBottom: 6 },
  ctaButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  sources: { marginBottom: 20, marginTop: 8 },
  sourcesTitle: { fontSize: 12, fontWeight: '700', marginBottom: 4 },
  sourceLine: { fontSize: 12, marginBottom: 2 },
  faqItem: { borderTopWidth: 1, paddingTop: 12, marginBottom: 12 },
  faqQuestion: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  faqAnswer: { fontSize: 14, lineHeight: 21 },
});

export default SnareBestForMetalPage;
