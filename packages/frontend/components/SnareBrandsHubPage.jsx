// Snare brands hub — Issue #4483
// Renders /snares/brands: one card per major snare brand, linking to each
// brand's detail page at /snares/brands/<brand>.

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import {
  SNARE_BRANDS,
  getSnaresForBrand,
  generateBrandsHubCanonicalUrl,
  generateBrandsHubSchema,
} from '../data/snareBrands';

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
  const confirmedCount = getSnaresForBrand(brand).length;
  return (
    <CrawlableLink href={`/snares/brands/${brand.slug}`} onPress={onNavigate ? () => onNavigate(brand.slug) : undefined}>
      <View style={[styles.card, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
        <Text style={[styles.cardName, { color: theme.text }]}>{brand.name}</Text>
        <Text style={[styles.cardPositioning, { color: theme.secondaryText || theme.text }]} numberOfLines={3}>
          {brand.positioning}
        </Text>
        <Text style={[styles.cardMeta, { color: theme.primary || theme.text }]}>
          {confirmedCount > 0
            ? `${confirmedCount} confirmed metal drummer${confirmedCount === 1 ? '' : 's'} →`
            : `${brand.notableLines.length} notable model${brand.notableLines.length === 1 ? '' : 's'} →`}
        </Text>
      </View>
    </CrawlableLink>
  );
}

export function SnareBrandsHubPage({ theme: themeProp, onNavigateBrand, onBack }) {
  const theme = themeProp || themes.dark;

  useEffect(() => {
    const url = generateBrandsHubCanonicalUrl();
    updateOgMeta({
      title: 'Snare Brands: Tama, Pearl, Ludwig, Sonor, Mapex & DW | MetalForge',
      description: 'Positioning, metal-relevant models, and confirmed drummer usage for the snare brands metal drummers actually play.',
      keywords: 'snare brands, tama snares, pearl snares, ludwig snares, sonor snares, mapex snares, dw snares',
      url,
      type: 'website',
    });
    const [itemListSchema, breadcrumbSchema] = generateBrandsHubSchema();
    injectSchema('snare-brands-hub-itemlist', itemListSchema);
    injectSchema('snare-brands-hub-breadcrumb', breadcrumbSchema);
    return () => {
      removeSchema('snare-brands-hub-itemlist');
      removeSchema('snare-brands-hub-breadcrumb');
    };
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <CrawlableLink href="/snares" onPress={onBack} style={{ marginBottom: 12 }}>
        <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Snares guide</Text>
      </CrawlableLink>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">Snare Brands</Text>
      <Text style={[styles.intro, { color: theme.text }]}>
        Six major snare makers — their positioning, metal-relevant models, and which drummers in our
        database are confirmed to play them.
      </Text>

      <View style={styles.grid}>
        {SNARE_BRANDS.map((brand) => (
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

export default SnareBrandsHubPage;
