// Best Bass Drum Pedals for Metal guide — Issue #4433 (split 2/3 of #4394)
// Renders /pedals/best-for-metal: double-bass focus, a drive-type
// recommendation matrix by playing style and budget tier, then the verified
// pedals pulled live from data/pedals.js. Affiliate-CTA-ready — each
// recommendation card renders retailer buttons automatically once
// retailerUrls is populated, and falls back to a link to the drummer's pedal
// setup page until then.

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import { toSlug } from '../utils/urlHelpers';
import { PEDALS } from '../data/pedals';
import {
  BEST_FOR_METAL_PAGE,
  generateBestForMetalCanonicalUrl,
  generateBestForMetalFaqSchema,
  generateBestForMetalArticleSchema,
  generateBestForMetalItemListSchema,
  generateBestForMetalBreadcrumbSchema,
} from '../data/pedalBestForMetal';

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

function DriveTypeMatrix({ matrix, theme }) {
  return (
    <View style={[styles.table, { borderColor: theme.border }]}>
      <View style={[styles.tableRow, styles.tableHeaderRow, { borderColor: theme.border }]}>
        <Text style={[styles.tableCellHeader, styles.colStyle, { color: theme.text }]}>Playing style</Text>
        <Text style={[styles.tableCellHeader, styles.colDrive, { color: theme.text }]}>Drive type</Text>
        <Text style={[styles.tableCellHeader, styles.colBudget, { color: theme.text }]}>Budget tier</Text>
        <Text style={[styles.tableCellHeader, styles.colExample, { color: theme.text }]}>Verified example</Text>
      </View>
      {matrix.map((row) => (
        <View key={row.style} style={[styles.tableRow, { borderColor: theme.border }]}>
          <Text style={[styles.tableCell, styles.colStyle, { color: theme.text, fontWeight: '700' }]}>{row.style}</Text>
          <Text style={[styles.tableCell, styles.colDrive, { color: theme.text }]}>{row.driveType}</Text>
          <Text style={[styles.tableCell, styles.colBudget, { color: theme.text }]}>{row.budgetTier}</Text>
          <Text style={[styles.tableCell, styles.colExample, { color: theme.secondaryText || theme.text }]}>{row.example}</Text>
        </View>
      ))}
      <Text style={[styles.tableCaveat, { color: theme.secondaryText || theme.text }]}>
        Typical — style and budget both push toward a drive type, not a fixed rule. Examples pulled from the verified drummer roster.
      </Text>
    </View>
  );
}

// Affiliate-CTA-ready: shows a "Shop" button per populated retailer once
// retailerUrls has entries; until then, falls back to the pedal setup page
// so the card is never a dead end.
function PedalCta({ pedal, theme, onNavigateToSetup }) {
  const retailerEntries = pedal.retailerUrls ? Object.entries(pedal.retailerUrls).filter(([, url]) => url) : [];
  if (retailerEntries.length === 0) {
    return (
      <CrawlableLink
        href={`/pedals/setups/${pedal.drummerSlug}`}
        onPress={onNavigateToSetup ? () => onNavigateToSetup(pedal.drummerSlug) : undefined}
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

function RecommendationCard({ pedal, drummer, theme, onNavigateToSetup }) {
  return (
    <View style={[styles.card, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{pedal.brand ? `${pedal.brand} ${pedal.model || ''}`.trim() : pedal.summary}</Text>
      <Text style={[styles.cardSubtitle, { color: theme.secondaryText || theme.text }]}>
        {drummer ? `Played by ${drummer.name}` : `Drummer: ${pedal.drummerSlug}`}
      </Text>
      <Text style={[styles.specText, { color: theme.secondaryText || theme.text }]} numberOfLines={3}>
        {pedal.summary}
      </Text>
      <PedalCta pedal={pedal} theme={theme} onNavigateToSetup={onNavigateToSetup} />
    </View>
  );
}

export function PedalBestForMetalPage({ theme: themeProp, drummers = [], onBack, onNavigateToSetup }) {
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
    injectSchema('pedal-best-for-metal-article', generateBestForMetalArticleSchema());
    injectSchema('pedal-best-for-metal-faq', generateBestForMetalFaqSchema());
    injectSchema('pedal-best-for-metal-itemlist', generateBestForMetalItemListSchema(PEDALS));
    injectSchema('pedal-best-for-metal-breadcrumb', generateBestForMetalBreadcrumbSchema());
    return () => {
      removeSchema('pedal-best-for-metal-article');
      removeSchema('pedal-best-for-metal-faq');
      removeSchema('pedal-best-for-metal-itemlist');
      removeSchema('pedal-best-for-metal-breadcrumb');
    };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <CrawlableLink href="/pedals" onPress={onBack} style={{ marginBottom: 12 }}>
        <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Pedals guide</Text>
      </CrawlableLink>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">{page.h1}</Text>
      <Text style={[styles.intro, { color: theme.text }]}>{page.intro}</Text>

      {[page.doubleBassDefault, page.matchingDriveToStyle].map((section) => (
        <View key={section.heading} style={styles.subsection}>
          <Text style={[styles.h2, { color: theme.text }]}>{section.heading}</Text>
          <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{section.body}</Text>
        </View>
      ))}

      <Text style={[styles.h2, { color: theme.text }]}>Drive type by playing style and budget</Text>
      <DriveTypeMatrix matrix={page.matrix} theme={theme} />

      <Text style={[styles.h2, { color: theme.text }]}>Recommended by budget tier</Text>
      {page.budgetTiers.map((tier) => (
        <View key={tier.heading} style={styles.subsection}>
          <Text style={[styles.h3, { color: theme.text }]}>{tier.heading}</Text>
          <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{tier.body}</Text>
        </View>
      ))}

      <Text style={[styles.h2, { color: theme.text }]}>Verified metal drummer pedals</Text>
      <View style={styles.grid}>
        {PEDALS.map((pedal) => {
          const drummer = drummers.find((d) => toSlug(d.name) === pedal.drummerSlug);
          return (
            <View key={pedal.drummerSlug} style={styles.cell}>
              <RecommendationCard pedal={pedal} drummer={drummer} theme={theme} onNavigateToSetup={onNavigateToSetup} />
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
  h3: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  intro: { fontSize: 16, lineHeight: 24, marginBottom: 8 },
  subsection: { marginBottom: 16 },
  body: { fontSize: 15, lineHeight: 23 },
  table: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 8 },
  tableHeaderRow: { borderBottomWidth: 1 },
  tableCellHeader: { fontSize: 13, fontWeight: '700' },
  tableCell: { fontSize: 13, paddingRight: 6 },
  colStyle: { flex: 1.3 },
  colDrive: { flex: 1 },
  colBudget: { flex: 0.9 },
  colExample: { flex: 1.6 },
  tableCaveat: { fontSize: 12, fontStyle: 'italic', marginTop: 10, lineHeight: 18 },
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
});

export default PedalBestForMetalPage;
