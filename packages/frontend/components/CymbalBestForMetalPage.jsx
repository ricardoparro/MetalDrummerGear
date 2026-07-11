// Best Cymbals for Metal guide — Issue #4307 (epic #4303 phase 4/4)
// Renders /cymbals/best-for-metal: why metal favours brighter/cutting or
// heavier setups, budget-tier recommendations, then the confirmed cymbal
// setups pulled live from data/cymbalSetups.js. Affiliate-CTA-ready — each
// recommendation card renders retailer buttons automatically once
// retailerUrls is populated, and falls back to a link to the drummer's full
// profile until then.

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import { toSlug } from '../utils/urlHelpers';
import { CYMBAL_SETUPS } from '../data/cymbalSetups';
import {
  BEST_FOR_METAL_PAGE,
  generateBestForMetalCanonicalUrl,
  generateBestForMetalFaqSchema,
  generateBestForMetalArticleSchema,
  generateBestForMetalItemListSchema,
  generateBestForMetalBreadcrumbSchema,
} from '../data/cymbalBestForMetal';

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
// retailerUrls has entries; until then, falls back to the drummer link so the
// card is never a dead end.
function SetupCta({ setup, theme, onNavigateToDrummer }) {
  const retailerEntries = setup.retailerUrls ? Object.entries(setup.retailerUrls).filter(([, url]) => url) : [];
  if (retailerEntries.length === 0) {
    return (
      <CrawlableLink
        href={`/drummer/${setup.drummerSlug}`}
        onPress={onNavigateToDrummer ? () => onNavigateToDrummer(setup.drummerSlug) : undefined}
      >
        <Text style={[styles.ctaFallback, { color: theme.primary || theme.text }]}>See full setup & source →</Text>
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

function RecommendationCard({ setup, drummer, theme, onNavigateToDrummer }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{setup.brands.join(' & ')}</Text>
      <Text style={[styles.cardSubtitle, { color: theme.secondaryText || theme.text }]}>
        {drummer ? `Played by ${drummer.name}` : `Drummer: ${setup.drummerSlug}`}
      </Text>
      <Text style={[styles.specText, { color: theme.secondaryText || theme.text }]} numberOfLines={3}>
        {setup.summary}
      </Text>
      <SetupCta setup={setup} theme={theme} onNavigateToDrummer={onNavigateToDrummer} />
    </View>
  );
}

export function CymbalBestForMetalPage({ theme: themeProp, drummers = [], onBack, onNavigateToDrummer, onNavigateBrandsHub }) {
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
    injectSchema('cymbal-best-for-metal-article', generateBestForMetalArticleSchema());
    injectSchema('cymbal-best-for-metal-faq', generateBestForMetalFaqSchema());
    injectSchema('cymbal-best-for-metal-itemlist', generateBestForMetalItemListSchema(CYMBAL_SETUPS));
    injectSchema('cymbal-best-for-metal-breadcrumb', generateBestForMetalBreadcrumbSchema());
    return () => {
      removeSchema('cymbal-best-for-metal-article');
      removeSchema('cymbal-best-for-metal-faq');
      removeSchema('cymbal-best-for-metal-itemlist');
      removeSchema('cymbal-best-for-metal-breadcrumb');
    };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <CrawlableLink href="/cymbals" onPress={onBack} style={{ marginBottom: 12 }}>
        <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Cymbals guide</Text>
      </CrawlableLink>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">{page.h1}</Text>
      <Text style={[styles.intro, { color: theme.text }]}>{page.intro}</Text>

      {[page.whyBrighterOrCutting, page.whyHeavierWeight, page.rideForBlastBeats].map((section) => (
        <View key={section.heading} style={styles.subsection}>
          <Text style={[styles.h2, { color: theme.text }]}>{section.heading}</Text>
          <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{section.body}</Text>
        </View>
      ))}

      <Text style={[styles.h2, { color: theme.text }]}>Recommended series by budget</Text>
      {page.budgetTiers.map((tier) => (
        <View key={tier.heading} style={styles.subsection}>
          <Text style={[styles.h3, { color: theme.text }]}>{tier.heading}</Text>
          <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{tier.body}</Text>
        </View>
      ))}

      <Text style={[styles.h2, { color: theme.text }]}>Confirmed metal drummer cymbal setups</Text>
      <View style={styles.grid}>
        {CYMBAL_SETUPS.map((setup) => {
          const drummer = drummers.find((d) => toSlug(d.name) === setup.drummerSlug);
          return (
            <View key={setup.drummerSlug} style={styles.cell}>
              <RecommendationCard setup={setup} drummer={drummer} theme={theme} onNavigateToDrummer={onNavigateToDrummer} />
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

      <CrawlableLink href="/cymbals/brands" onPress={onNavigateBrandsHub} style={{ marginTop: 12 }}>
        <View style={[styles.linkCard, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
          <Text style={[styles.linkCardText, { color: theme.text }]}>🔔 Browse Cymbal Brands →</Text>
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
  h3: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  intro: { fontSize: 16, lineHeight: 24, marginBottom: 8 },
  subsection: { marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 23 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cell: { width: '48%', minWidth: 260, marginBottom: 14 },
  card: { borderWidth: 1, borderRadius: 12, padding: 14, height: '100%' },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, marginBottom: 8 },
  specText: { fontSize: 13, lineHeight: 18, marginBottom: 10 },
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

export default CymbalBestForMetalPage;
