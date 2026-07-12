// Pedals pillar page — Issue #4392 (epic #4387 phase 2/4)
// Renders /pedals: why the bass drum pedal is a metal drummer's most personal
// gear choice, how to choose one, links to the reference pages
// (drive-types/single-vs-double/setup-tuning), brand overview, and the
// verified pedals of drummers pulled from data/pedals.js (phase 1).

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image';
import { themes } from '../ThemeContext';
import { updateOgMeta } from '../utils/ogMetaTags';
import { toSlug } from '../utils/urlHelpers';
import {
  PILLAR_PAGE,
  REFERENCE_PAGE_ORDER,
  REFERENCE_PAGES,
  generateFaqSchema,
  generateArticleSchema,
  generateCanonicalUrl,
} from '../data/pedalReferencePages';
import { PEDALS } from '../data/pedals';
import { FACE_FOCUS } from '../data/drummerPhotoFocus';
import { isValidPedalBrandSlug } from '../data/pedalBrands';

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

function ReferenceCard({ slug, theme, onNavigate }) {
  const page = REFERENCE_PAGES[slug];
  const url = `/pedals/${slug}`;
  const card = (
    <View style={[styles.refCard, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
      <Text style={[styles.refCardTitle, { color: theme.text }]}>{page.h1}</Text>
      <Text style={[styles.refCardDesc, { color: theme.secondaryText || theme.text }]} numberOfLines={3}>
        {page.description}
      </Text>
    </View>
  );

  if (Platform.OS === 'web') {
    return (
      <a
        href={url}
        onClick={(e) => {
          if (onNavigate) {
            e.preventDefault();
            onNavigate(slug);
          }
        }}
        style={{ textDecoration: 'none', display: 'block', width: '100%' }}
      >
        {card}
      </a>
    );
  }
  return card;
}

function SignaturePedalCard({ drummer, pedal, theme }) {
  const slug = toSlug(drummer.name);
  const url = `/drummer/${slug}`;
  const anchorText = `${drummer.name}'s ${pedal.brand ? `${pedal.brand} ` : ''}signature pedal`;
  const card = (
    <View style={[styles.drummerCard, { backgroundColor: theme.cardBg || theme.background, borderColor: theme.border }]}>
      <Image
        source={drummer.image ? { uri: drummer.image } : undefined}
        style={styles.drummerImage}
        contentFit="cover"
        contentPosition={{ left: '50%', top: FACE_FOCUS[slug] || '50%' }}
        cachePolicy="memory-disk"
        accessibilityLabel={`Photo of ${drummer.name}`}
      />
      <View style={styles.drummerInfo}>
        <Text style={[styles.drummerName, { color: theme.text }]} numberOfLines={1}>{drummer.name}</Text>
        <Text style={[styles.drummerStick, { color: theme.secondaryText || theme.text }]} numberOfLines={2}>
          {pedal.summary}
        </Text>
      </View>
    </View>
  );

  if (Platform.OS === 'web') {
    return (
      <a href={url} aria-label={anchorText} style={{ textDecoration: 'none', display: 'block', width: '100%' }}>
        {card}
      </a>
    );
  }
  return card;
}

function BrandRow({ brand, theme, onNavigateBrand }) {
  const slug = toSlug(brand.name);
  const row = (
    <View style={styles.brandRow}>
      <Text style={[styles.brandName, { color: theme.primary || theme.text }]}>{brand.name}</Text>
      <Text style={[styles.brandNote, { color: theme.secondaryText || theme.text }]}>{brand.note}</Text>
    </View>
  );

  if (isValidPedalBrandSlug(slug)) {
    const url = `/pedals/brands/${slug}`;
    if (Platform.OS === 'web') {
      return (
        <a
          href={url}
          onClick={(e) => {
            if (onNavigateBrand) {
              e.preventDefault();
              onNavigateBrand(slug);
            }
          }}
          style={{ textDecoration: 'none', display: 'block', width: '100%' }}
        >
          {row}
        </a>
      );
    }
  }
  return row;
}

export function PedalsHubPage({ theme: themeProp, drummers = [], onNavigateReference, onNavigateBrand }) {
  const theme = themeProp || themes.dark;

  useEffect(() => {
    const url = generateCanonicalUrl();
    updateOgMeta({
      title: PILLAR_PAGE.title,
      description: PILLAR_PAGE.description,
      keywords: PILLAR_PAGE.keywords,
      url,
      type: 'website',
    });
    injectSchema('pedals-hub-article', generateArticleSchema(PILLAR_PAGE, url));
    injectSchema('pedals-hub-faq', generateFaqSchema(PILLAR_PAGE.faq));
    return () => {
      removeSchema('pedals-hub-article');
      removeSchema('pedals-hub-faq');
    };
  }, []);

  const signaturePedals = PEDALS
    .map((pedal) => {
      const drummer = drummers.find((d) => toSlug(d.name) === pedal.drummerSlug);
      return drummer ? { drummer, pedal } : null;
    })
    .filter(Boolean);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.h1, { color: theme.text }]} accessibilityRole="header">{PILLAR_PAGE.h1}</Text>
      <Text style={[styles.intro, { color: theme.text }]}>{PILLAR_PAGE.intro}</Text>

      <Text style={[styles.h2, { color: theme.text }]}>How to choose a bass drum pedal</Text>
      {PILLAR_PAGE.howToChoose.map((item) => (
        <View key={item.heading} style={styles.subsection}>
          <Text style={[styles.h3, { color: theme.text }]}>{item.heading}</Text>
          <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{item.body}</Text>
        </View>
      ))}

      <Text style={[styles.h2, { color: theme.text }]}>Reference guides</Text>
      <View style={styles.refGrid}>
        {REFERENCE_PAGE_ORDER.map((slug) => (
          <View key={slug} style={styles.refCell}>
            <ReferenceCard slug={slug} theme={theme} onNavigate={onNavigateReference} />
          </View>
        ))}
      </View>

      <Text style={[styles.h2, { color: theme.text }]}>Major pedal brands</Text>
      {PILLAR_PAGE.brands.map((brand) => (
        <BrandRow key={brand.name} brand={brand} theme={theme} onNavigateBrand={onNavigateBrand} />
      ))}

      <Text style={[styles.h2, { color: theme.text }]}>Best pedals for metal</Text>
      <Text style={[styles.body, { color: theme.secondaryText || theme.text }]}>{PILLAR_PAGE.bestForMetal}</Text>

      {signaturePedals.length > 0 && (
        <>
          <Text style={[styles.h2, { color: theme.text }]}>Verified signature pedals</Text>
          <View style={styles.drummerGrid}>
            {signaturePedals.map(({ drummer, pedal }) => (
              <View key={drummer.id} style={styles.drummerCell}>
                <SignaturePedalCard drummer={drummer} pedal={pedal} theme={theme} />
              </View>
            ))}
          </View>
        </>
      )}

      <Text style={[styles.h2, { color: theme.text }]}>Frequently asked questions</Text>
      {PILLAR_PAGE.faq.map((item) => (
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
  h1: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  h2: { fontSize: 22, fontWeight: '700', marginTop: 24, marginBottom: 12 },
  h3: { fontSize: 17, fontWeight: '600', marginBottom: 4 },
  intro: { fontSize: 16, lineHeight: 24 },
  body: { fontSize: 15, lineHeight: 22 },
  subsection: { marginBottom: 14 },
  refGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  refCell: { width: '32%', minWidth: 200, marginBottom: 12 },
  refCard: { borderWidth: 1, borderRadius: 10, padding: 14, height: '100%' },
  refCardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  refCardDesc: { fontSize: 13, lineHeight: 18 },
  brandRow: { marginBottom: 10 },
  brandName: { fontSize: 16, fontWeight: '700' },
  brandNote: { fontSize: 14, lineHeight: 20 },
  drummerGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  drummerCell: { width: '48%', marginBottom: 12 },
  drummerCard: { borderWidth: 1, borderRadius: 10, overflow: 'hidden' },
  drummerImage: { width: '100%', height: 120 },
  drummerInfo: { padding: 10 },
  drummerName: { fontSize: 15, fontWeight: '700' },
  drummerStick: { fontSize: 13, marginTop: 2 },
  faqItem: { borderTopWidth: 1, paddingTop: 12, marginBottom: 12 },
  faqQuestion: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  faqAnswer: { fontSize: 14, lineHeight: 21 },
});

export default PedalsHubPage;
