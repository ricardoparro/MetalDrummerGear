// Drumstick reference pages — Issue #4137 (epic #4135 phase 2/4)
// Renders /drumsticks/sizes, /drumsticks/materials, /drumsticks/tips.
// One generic component driven by `slug` since the three pages share the same
// shape: intro sections, an optional spec/trade-off table with a cited
// source, and an FAQ block.

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import {
  getReferencePage,
  REFERENCE_PAGE_ORDER,
  REFERENCE_PAGES,
  generateFaqSchema,
  generateArticleSchema,
  generateCanonicalUrl,
} from '../data/drumstickReferencePages';

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

function SizesTable({ page, theme }) {
  return (
    <View style={[styles.table, { borderColor: theme.border }]}>
      <View style={[styles.tableRow, styles.tableHeaderRow, { borderColor: theme.border }]}>
        <Text style={[styles.tableCellHeader, styles.colSize, { color: theme.text }]}>Size</Text>
        <Text style={[styles.tableCellHeader, styles.colSpec, { color: theme.text }]}>Diameter</Text>
        <Text style={[styles.tableCellHeader, styles.colSpec, { color: theme.text }]}>Length</Text>
        <Text style={[styles.tableCellHeader, styles.colUse, { color: theme.text }]}>Typical use</Text>
      </View>
      {page.table.map((row) => (
        <View key={row.size} style={[styles.tableRow, { borderColor: theme.border }]}>
          <Text style={[styles.tableCell, styles.colSize, { color: theme.text, fontWeight: '700' }]}>{row.size}</Text>
          <Text style={[styles.tableCell, styles.colSpec, { color: theme.text }]}>
            {row.diameterIn}" / {row.diameterMm}mm
          </Text>
          <Text style={[styles.tableCell, styles.colSpec, { color: theme.text }]}>
            {row.lengthIn}" / {row.lengthCm}cm
          </Text>
          <Text style={[styles.tableCell, styles.colUse, { color: theme.secondaryText || theme.text }]}>{row.typicalUse}</Text>
        </View>
      ))}
      <Text style={[styles.tableCaveat, { color: theme.secondaryText || theme.text }]}>
        Typical specs — exact diameter and length vary by brand. Worked example sourced from{' '}
        {page.tableSource.brand} {page.tableSource.line}.
      </Text>
    </View>
  );
}

function MaterialsTable({ page, theme }) {
  return (
    <View style={[styles.table, { borderColor: theme.border }]}>
      <View style={[styles.tableRow, styles.tableHeaderRow, { borderColor: theme.border }]}>
        <Text style={[styles.tableCellHeader, styles.colUse, { color: theme.text }]}>Material</Text>
        <Text style={[styles.tableCellHeader, styles.colSpec, { color: theme.text }]}>Weight</Text>
        <Text style={[styles.tableCellHeader, styles.colSpec, { color: theme.text }]}>Durability</Text>
        <Text style={[styles.tableCellHeader, styles.colUse, { color: theme.text }]}>Feel</Text>
      </View>
      {page.tradeoffTable.map((row) => (
        <View key={row.material} style={[styles.tableRow, { borderColor: theme.border }]}>
          <Text style={[styles.tableCell, styles.colUse, { color: theme.text, fontWeight: '700' }]}>{row.material}</Text>
          <Text style={[styles.tableCell, styles.colSpec, { color: theme.text }]}>{row.weight}</Text>
          <Text style={[styles.tableCell, styles.colSpec, { color: theme.text }]}>{row.durability}</Text>
          <Text style={[styles.tableCell, styles.colUse, { color: theme.secondaryText || theme.text }]}>{row.feel}</Text>
        </View>
      ))}
    </View>
  );
}

function TipShapesTable({ page, theme }) {
  return (
    <View style={[styles.table, { borderColor: theme.border }]}>
      <View style={[styles.tableRow, styles.tableHeaderRow, { borderColor: theme.border }]}>
        <Text style={[styles.tableCellHeader, styles.colUse, { color: theme.text }]}>Tip shape</Text>
        <Text style={[styles.tableCellHeader, { flex: 2, color: theme.text }]}>Articulation effect</Text>
      </View>
      {page.tipShapes.map((row) => (
        <View key={row.shape} style={[styles.tableRow, { borderColor: theme.border }]}>
          <Text style={[styles.tableCell, styles.colUse, { color: theme.text, fontWeight: '700' }]}>{row.shape}</Text>
          <Text style={[styles.tableCell, { flex: 2, color: theme.secondaryText || theme.text }]}>{row.effect}</Text>
        </View>
      ))}
    </View>
  );
}

export function DrumstickReferencePage({ theme: themeProp, slug, onBack, onNavigateReference }) {
  const theme = themeProp || themes.dark;
  const page = getReferencePage(slug);

  useEffect(() => {
    if (!page) return;
    const url = generateCanonicalUrl(page.slug);
    updateOgMeta({
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      url,
      type: 'article',
    });
    injectSchema(`drumstick-ref-${page.slug}-article`, generateArticleSchema(page, url));
    injectSchema(`drumstick-ref-${page.slug}-faq`, generateFaqSchema(page.faq));
    return () => {
      removeSchema(`drumstick-ref-${page.slug}-article`);
      removeSchema(`drumstick-ref-${page.slug}-faq`);
    };
  }, [slug]);

  if (!page) return null;

  const otherPages = REFERENCE_PAGE_ORDER.filter((s) => s !== slug);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <CrawlableLink href="/drumsticks" onPress={onBack} style={{ marginBottom: 12 }}>
        <Text style={[styles.backLink, { color: theme.primary || theme.text }]}>&larr; Drumsticks guide</Text>
      </CrawlableLink>

      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">{page.h1}</Text>

      {page.sections.map((section) => (
        <View key={section.heading} style={styles.subsection}>
          <Text style={[styles.h2, { color: theme.text }]}>{section.heading}</Text>
          <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{section.body}</Text>
        </View>
      ))}

      {slug === 'sizes' && page.table && <SizesTable page={page} theme={theme} />}
      {slug === 'materials' && page.tradeoffTable && <MaterialsTable page={page} theme={theme} />}
      {slug === 'tips' && page.tipShapes && <TipShapesTable page={page} theme={theme} />}

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

      <View style={styles.otherPages}>
        <Text style={[styles.h2, { color: theme.text }]}>More drumstick guides</Text>
        {otherPages.map((s) => (
          <CrawlableLink
            key={s}
            href={`/drumsticks/${s}`}
            onPress={onNavigateReference ? () => onNavigateReference(s) : undefined}
            style={{ marginBottom: 8 }}
          >
            <Text style={[styles.otherPageLink, { color: theme.primary || theme.text }]}>{REFERENCE_PAGES[s].h1}</Text>
          </CrawlableLink>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 48 },
  backLink: { fontSize: 15, fontWeight: '600' },
  h1: { fontSize: 26, fontWeight: '700', marginBottom: 16 },
  h2: { fontSize: 20, fontWeight: '700', marginBottom: 8, marginTop: 8 },
  body: { fontSize: 15, lineHeight: 23 },
  subsection: { marginBottom: 18 },
  table: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 8 },
  tableHeaderRow: { borderBottomWidth: 1 },
  tableCellHeader: { fontSize: 13, fontWeight: '700' },
  tableCell: { fontSize: 13, paddingRight: 6 },
  colSize: { flex: 0.7 },
  colSpec: { flex: 1 },
  colUse: { flex: 1.6 },
  tableCaveat: { fontSize: 12, fontStyle: 'italic', marginTop: 10, lineHeight: 18 },
  sources: { marginBottom: 20 },
  sourcesTitle: { fontSize: 12, fontWeight: '700', marginBottom: 4 },
  sourceLine: { fontSize: 12, marginBottom: 2 },
  faqItem: { borderTopWidth: 1, paddingTop: 12, marginBottom: 12 },
  faqQuestion: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  faqAnswer: { fontSize: 14, lineHeight: 21 },
  otherPages: { marginTop: 12 },
  otherPageLink: { fontSize: 15, fontWeight: '600' },
});

export default DrumstickReferencePage;
