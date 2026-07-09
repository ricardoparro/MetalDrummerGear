// Best Drumsticks for Metal guide — Issue #4139 (epic #4135 phase 4/4)
// Renders /drumsticks/best-for-metal: why metal favours heavier, front-weighted,
// durable sticks, then the confirmed signature sticks pulled live from
// data/drumsticks.js. Each recommendation card is affiliate-CTA-ready — it
// renders retailer buttons automatically once retailerUrls is populated, and
// falls back to a link to the full spec page until then.

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import { toSlug } from '../utils/urlHelpers';
import { DRUMSTICKS } from '../data/drumsticks';
import {
  BEST_FOR_METAL_PAGE,
  generateBestForMetalCanonicalUrl,
  generateBestForMetalFaqSchema,
  generateBestForMetalArticleSchema,
  generateBestForMetalItemListSchema,
  generateBestForMetalBreadcrumbSchema,
} from '../data/drumstickBestForMetal';

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
// retailerUrls has entries; until then, falls back to the spec-page link so
// the card is never a dead end.
function StickCta({ stick, theme, onNavigateToSignaturePage }) {
  const retailerEntries = stick.retailerUrls ? Object.entries(stick.retailerUrls).filter(([, url]) => url) : [];
  if (retailerEntries.length === 0) {
    return (
      <CrawlableLink
        href={`/drumsticks/signature/${stick.drummerSlug}`}
        onPress={onNavigateToSignaturePage ? () => onNavigateToSignaturePage(stick.drummerSlug) : undefined}
      >
        <Text style={[styles.ctaFallback, { color: theme.primary || theme.text }]}>See full specs & source →</Text>
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

function RecommendationCard({ stick, drummer, theme, onNavigateToSignaturePage }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{stick.brand} {stick.model}</Text>
      <Text style={[styles.cardSubtitle, { color: theme.secondaryText || theme.text }]}>
        {drummer ? `Played by ${drummer.name}` : `Drummer: ${stick.drummerSlug}`}
      </Text>
      <View style={styles.specRow}>
        <Text style={[styles.specText, { color: theme.text }]}>{stick.size}</Text>
        <Text style={[styles.specText, { color: theme.secondaryText || theme.text }]}>
          {stick.diameterIn}" × {stick.lengthIn}" · {stick.material} · {stick.tip}
        </Text>
      </View>
      <StickCta stick={stick} theme={theme} onNavigateToSignaturePage={onNavigateToSignaturePage} />
    </View>
  );
}

export function BestForMetalPage({ theme: themeProp, drummers = [], onBack, onNavigateToSignaturePage, onNavigateBrandsHub }) {
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
    injectSchema('best-for-metal-article', generateBestForMetalArticleSchema());
    injectSchema('best-for-metal-faq', generateBestForMetalFaqSchema());
    injectSchema('best-for-metal-itemlist', generateBestForMetalItemListSchema(DRUMSTICKS));
    injectSchema('best-for-metal-breadcrumb', generateBestForMetalBreadcrumbSchema());
    return () => {
      removeSchema('best-for-metal-article');
      removeSchema('best-for-metal-faq');
      removeSchema('best-for-metal-itemlist');
      removeSchema('best-for-metal-breadcrumb');
    };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <CrawlableLink href="/drumsticks" onPress={onBack} style={{ marginBottom: 12 }}>
        <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Drumsticks guide</Text>
      </CrawlableLink>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">{page.h1}</Text>
      <Text style={[styles.intro, { color: theme.text }]}>{page.intro}</Text>

      {[page.whyHeavier, page.whyFrontWeighted, page.whyDurability].map((section) => (
        <View key={section.heading} style={styles.subsection}>
          <Text style={[styles.h2, { color: theme.text }]}>{section.heading}</Text>
          <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{section.body}</Text>
        </View>
      ))}

      <View style={styles.subsection}>
        <Text style={[styles.h2, { color: theme.text }]}>Wood vs nylon tips for metal</Text>
        <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{page.woodVsNylonForMetal}</Text>
      </View>

      <Text style={[styles.h2, { color: theme.text }]}>Confirmed signature sticks metal drummers play</Text>
      <View style={styles.grid}>
        {DRUMSTICKS.map((stick) => {
          const drummer = drummers.find((d) => toSlug(d.name) === stick.drummerSlug);
          return (
            <View key={stick.id} style={styles.cell}>
              <RecommendationCard stick={stick} drummer={drummer} theme={theme} onNavigateToSignaturePage={onNavigateToSignaturePage} />
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

      <CrawlableLink href="/drumsticks/brands" onPress={onNavigateBrandsHub} style={{ marginTop: 12 }}>
        <View style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
          <Text style={[styles.linkCardText, { color: theme.text }]}>🥢 Browse Drumstick Brands →</Text>
        </View>
      </CrawlableLink>
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
  specRow: { marginBottom: 10 },
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
  linkCard: { padding: 14, borderRadius: 8, borderWidth: 1 },
  linkCardText: { fontSize: 15, fontWeight: '600' },
});

export default BestForMetalPage;
