// Pedal brands hub — Issue #4482 (fixes the dead /pedals/brands breadcrumb
// link on all 11 /pedals/brands/<slug> pages, added in #4432/#4471).
// Renders /pedals/brands: one card per pedal brand, linking to each brand's
// detail page at /pedals/brands/<brand>.

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import {
  PEDAL_BRANDS,
  getPedalsForBrand,
  generateBrandsHubCanonicalUrl,
  generateBrandsHubSchema,
} from '../data/pedalBrands';

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
        style={{ textDecoration: 'none', display: 'block', width: '100%', ...style }}
      >
        {children}
      </a>
    );
  }
  return <View>{children}</View>;
}

function BrandCard({ brand, theme, onNavigate }) {
  const confirmedCount = getPedalsForBrand(brand).length;
  return (
    <CrawlableLink href={`/pedals/brands/${brand.slug}`} onPress={onNavigate ? () => onNavigate(brand.slug) : undefined}>
      <View style={[styles.card, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
        <Text style={[styles.cardName, { color: theme.text }]}>{brand.name}</Text>
        <Text style={[styles.cardPositioning, { color: theme.secondaryText || theme.text }]} numberOfLines={3}>
          {brand.positioning}
        </Text>
        <Text style={[styles.cardMeta, { color: theme.primary || theme.text }]}>
          {confirmedCount > 0
            ? `${confirmedCount} confirmed metal drummer${confirmedCount === 1 ? '' : 's'} →`
            : `${brand.notableLines.length} notable line${brand.notableLines.length === 1 ? '' : 's'} →`}
        </Text>
      </View>
    </CrawlableLink>
  );
}

export function PedalBrandsHubPage({ theme: themeProp, onNavigateBrand, onBack }) {
  const theme = themeProp || themes.dark;

  useEffect(() => {
    const url = generateBrandsHubCanonicalUrl();
    updateOgMeta({
      title: 'Bass Drum Pedal Brands: Tama, Pearl, DW, Axis & More | MetalForge',
      description: 'Positioning, notable models, and confirmed drummer usage for the bass drum pedal brands metal drummers actually play.',
      keywords: 'pedal brands, bass drum pedal brands, tama pedals, pearl pedals, dw pedals, axis pedals',
      url,
      type: 'website',
    });
    const [itemListSchema, breadcrumbSchema] = generateBrandsHubSchema();
    injectSchema('pedal-brands-hub-itemlist', itemListSchema);
    injectSchema('pedal-brands-hub-breadcrumb', breadcrumbSchema);
    return () => {
      removeSchema('pedal-brands-hub-itemlist');
      removeSchema('pedal-brands-hub-breadcrumb');
    };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <CrawlableLink href="/pedals" onPress={onBack} style={{ marginBottom: 12 }}>
        <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Pedals guide</Text>
      </CrawlableLink>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">Pedal Brands</Text>
      <Text style={[styles.intro, { color: theme.text }]}>
        Eleven bass drum pedal makers — their positioning, notable models, and which drummers in our
        database are confirmed to play them.
      </Text>

      <View style={styles.grid}>
        {PEDAL_BRANDS.map((brand) => (
          <View key={brand.slug} style={styles.cell}>
            <BrandCard brand={brand} theme={theme} onNavigate={onNavigateBrand} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 48 },
  backLink: { fontSize: 15, fontWeight: '600' },
  h1: { fontSize: 28, fontWeight: '700', marginTop: 8, marginBottom: 12 },
  intro: { fontSize: 16, lineHeight: 24, marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cell: { width: '48%', minWidth: 260, marginBottom: 14 },
  card: { borderWidth: 1, borderRadius: 12, padding: 16, height: '100%' },
  cardName: { fontSize: 17, fontWeight: '700', marginBottom: 6 },
  cardPositioning: { fontSize: 13, lineHeight: 19, marginBottom: 10 },
  cardMeta: { fontSize: 13, fontWeight: '700' },
});

export default PedalBrandsHubPage;
