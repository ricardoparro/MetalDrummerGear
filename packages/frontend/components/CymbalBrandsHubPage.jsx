// Cymbal brands hub — Issue #4307 (epic #4303 phase 4/4)
// Renders /cymbals/brands: one card per major cymbal brand, linking to each
// brand's detail page at /cymbals/brands/<brand>.

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import {
  CYMBAL_BRANDS,
  getConfirmedSetupsForBrand,
  generateBrandsHubCanonicalUrl,
  generateBrandsHubSchema,
} from '../data/cymbalBrands';

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
  const confirmedCount = getConfirmedSetupsForBrand(brand).length;
  return (
    <CrawlableLink href={`/cymbals/brands/${brand.slug}`} onPress={onNavigate ? () => onNavigate(brand.slug) : undefined}>
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

export function CymbalBrandsHubPage({ theme: themeProp, onNavigateBrand, onBack }) {
  const theme = themeProp || themes.dark;

  useEffect(() => {
    const url = generateBrandsHubCanonicalUrl();
    updateOgMeta({
      title: 'Cymbal Brands: Zildjian, Paiste, Sabian & Meinl | MetalForge',
      description: 'Positioning, metal-relevant series, and confirmed drummer usage for the four cymbal brands metal drummers actually play.',
      keywords: 'cymbal brands, zildjian cymbals, sabian cymbals, paiste cymbals, meinl cymbals',
      url,
      type: 'website',
    });
    const [itemListSchema, breadcrumbSchema] = generateBrandsHubSchema();
    injectSchema('cymbal-brands-hub-itemlist', itemListSchema);
    injectSchema('cymbal-brands-hub-breadcrumb', breadcrumbSchema);
    return () => {
      removeSchema('cymbal-brands-hub-itemlist');
      removeSchema('cymbal-brands-hub-breadcrumb');
    };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <CrawlableLink href="/cymbals" onPress={onBack} style={{ marginBottom: 12 }}>
        <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Cymbals guide</Text>
      </CrawlableLink>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">Cymbal Brands</Text>
      <Text style={[styles.intro, { color: theme.text }]}>
        Four major cymbal makers — their positioning, metal-relevant series, and which drummers in our
        database are confirmed to play them.
      </Text>

      <View style={styles.grid}>
        {CYMBAL_BRANDS.map((brand) => (
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

export default CymbalBrandsHubPage;
