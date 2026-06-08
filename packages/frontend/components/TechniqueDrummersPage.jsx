// Technique Drummers Page Component
// Issue #992 (split 1/3 of #870): /technique/<slug>/drummers
//
// Renders the route, reusable component, and schema generators for technique
// landing pages that list the drummers known for a given technique.
// This split builds the SKELETON only — #993 (split 2/3) fills richer data on top
// without re-architecting. Stub/derived data is intentional here.

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import {
  getTechniqueBySlug,
  getRelatedTechniques,
  getAllTechniqueSlugs,
} from '../data/techniques';

const BASE_URL = 'https://metalforge.io';

// ==========================================
// ROUTING HELPERS — /technique/<slug>/drummers
// (singular "technique"; distinct from existing /techniques/<slug>)
// ==========================================
export function isTechniqueDrummersPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  return /^\/technique\/[a-z0-9-]+\/drummers\/?$/i.test(window.location.pathname);
}

export function getTechniqueDrummersSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/technique\/([a-z0-9-]+)\/drummers\/?$/i);
  return match ? match[1] : null;
}

// All canonical URLs for this route — used by the sitemap generator (#994).
export function getTechniqueDrummersUrls() {
  return getAllTechniqueSlugs().map((slug) => `/technique/${slug}/drummers`);
}

// ==========================================
// CONTENT HELPERS (skeleton — #993 enriches)
// ==========================================

// Build a self-contained FAQ (≥3 Q&A) from technique data.
export function buildTechniqueFaq(technique) {
  if (!technique) return [];
  const masters = technique.masters || [];
  const originator = masters[0];
  const inventedAnswer = originator
    ? `${technique.title} was pioneered and popularized by drummers such as ${originator.name}${originator.band ? ` (${originator.band})` : ''}. See the full list of masters above.`
    : `${technique.title} was developed by extreme and progressive metal drummers over decades of innovation.`;
  const howToAnswer = Array.isArray(technique.howToLearn) && technique.howToLearn.length > 0
    ? `Start slowly with a metronome and build up speed. ${technique.howToLearn[0]}`
    : `Practice slowly with a metronome and gradually increase tempo while staying relaxed.`;
  return [
    {
      question: `What is the ${technique.title} drumming technique?`,
      answer: technique.description || `${technique.title} is a metal drumming technique.`,
    },
    {
      question: `Who are the drummers known for ${technique.title}?`,
      answer: inventedAnswer,
    },
    {
      question: `How do you learn ${technique.title}?`,
      answer: howToAnswer,
    },
    {
      question: `What BPM is ${technique.title} played at?`,
      answer: technique.bpmRange
        ? `${technique.title} is typically played around ${technique.bpmRange}.`
        : `Tempo varies widely depending on the song and subgenre.`,
    },
  ];
}

// FAQPage + ItemList(Person) JSON-LD. Valid even when masters is empty.
export function buildTechniqueDrummersSchema(technique, faq) {
  if (!technique) return null;
  const url = `${BASE_URL}/technique/${technique.slug}/drummers`;
  const masters = technique.masters || [];

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Drummers known for the ${technique.title} technique`,
    description: `Metal drummers recognized for mastery of the ${technique.title} drumming technique.`,
    url,
    numberOfItems: masters.length,
    itemListElement: masters.map((m, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: m.name,
        url: m.slug ? `${BASE_URL}/drummer/${m.slug}` : undefined,
        ...(m.band ? { memberOf: { '@type': 'MusicGroup', name: m.band } } : {}),
      },
    })),
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url,
    mainEntity: (faq || []).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return [itemList, faqPage];
}

// SEO schema injection (mirrors DrummerGearCategoryPage pattern)
function injectSchema(schema) {
  if (typeof document === 'undefined' || !schema) return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="technique-drummers"]');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'technique-drummers');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="technique-drummers"]');
  if (existing) existing.remove();
}

// Update document meta tags for SEO
function updateMeta(technique) {
  if (typeof document === 'undefined' || !technique) return;
  const title = `Drummers Known for ${technique.title} | MetalForge`;
  const description = `Discover the metal drummers famous for the ${technique.title} technique${technique.bpmRange ? ` (${technique.bpmRange})` : ''}. Masters, FAQ, and related techniques.`;
  document.title = title;
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', description);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', `${BASE_URL}/technique/${technique.slug}/drummers`);
}

// ==========================================
// SECTION SUB-COMPONENTS
// ==========================================

function QuickFactsBox({ technique, theme }) {
  const masters = technique.masters || [];
  const originator = masters[0];
  const facts = [
    { label: 'Technique', value: technique.title },
    { label: 'BPM Range', value: technique.bpmRange || '—' },
    { label: 'Signature Drummers', value: String(masters.length) },
    { label: 'Pioneer', value: originator ? originator.name : '—' },
  ];
  return (
    <View style={[styles.quickFacts, { backgroundColor: theme.cardBg, borderColor: theme.primary }]}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>⚡ Quick Facts</Text>
      {facts.map((f, i) => (
        <View key={i} style={styles.factRow}>
          <Text style={[styles.factLabel, { color: theme.secondaryText }]}>{f.label}</Text>
          <Text style={[styles.factValue, { color: theme.text }]}>{f.value}</Text>
        </View>
      ))}
    </View>
  );
}

function DrummersList({ masters, theme, onSelectDrummer }) {
  if (!masters || masters.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>🥁 Drummers</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          Drummer list coming soon.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>🥁 Drummers Known for This Technique</Text>
      {masters.map((m, index) => (
        <Pressable
          key={index}
          onPress={() => onSelectDrummer && m.slug && onSelectDrummer(m.slug)}
          style={[styles.drummerCard, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
          accessibilityRole="link"
          accessibilityLabel={`${m.name}${m.band ? ` - ${m.band}` : ''}`}
        >
          <Text style={[styles.drummerName, { color: theme.text }]}>{m.name}</Text>
          {m.band && <Text style={[styles.drummerBand, { color: theme.secondaryText }]}>{m.band}</Text>}
          {m.note && <Text style={[styles.drummerNote, { color: theme.primary }]}>{m.note}</Text>}
        </Pressable>
      ))}
    </View>
  );
}

function FaqList({ faq, theme }) {
  const [expanded, setExpanded] = useState({});
  if (!faq || faq.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>❓ Frequently Asked Questions</Text>
      {faq.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))}
          style={[styles.faqItem, { backgroundColor: theme.cardBg, borderColor: theme.border }]}
        >
          <Text style={[styles.faqQuestion, { color: theme.text }]}>
            {expanded[index] ? '▼' : '▶'} {item.question}
          </Text>
          {expanded[index] && (
            <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>{item.answer}</Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

function RelatedTechniques({ related, theme, onSelectTechnique }) {
  if (!related || related.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>🔗 Related Techniques</Text>
      <View style={styles.chipsRow}>
        {related.map((t, index) => (
          <Pressable
            key={index}
            onPress={() => onSelectTechnique && onSelectTechnique(t.slug)}
            style={[styles.chip, { backgroundColor: theme.primary + '20', borderColor: theme.primary }]}
            accessibilityRole="link"
          >
            <Text style={[styles.chipText, { color: theme.primary }]}>
              {t.emoji ? `${t.emoji} ` : ''}{t.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export function TechniqueDrummersPage({ slug: propSlug, onBack, onSelectDrummer, onSelectTechnique }) {
  const theme = useContext(ThemeContext);
  const slug = propSlug || getTechniqueDrummersSlugFromURL();
  const [loading, setLoading] = useState(true);

  const technique = slug ? getTechniqueBySlug(slug) : null;
  const related = slug ? getRelatedTechniques(slug) : [];
  const faq = buildTechniqueFaq(technique);

  useEffect(() => {
    setLoading(false);
    if (technique && Platform.OS === 'web') {
      updateMeta(technique);
      injectSchema(buildTechniqueDrummersSchema(technique, faq));
    }
    return () => removeSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>Loading technique…</Text>
      </View>
    );
  }

  if (!technique) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={styles.emoji}>🥁</Text>
        <Text style={[styles.notFoundTitle, { color: theme.text }]}>Technique Not Found</Text>
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>This technique page doesn't exist.</Text>
        {onBack && (
          <Pressable onPress={onBack} style={[styles.backButton, { backgroundColor: theme.primary }]}>
            <Text style={styles.backButtonText}>← Go Back</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>
          {technique.emoji ? `${technique.emoji} ` : ''}Drummers Known for {technique.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          The metal drummers who define the {technique.title} technique.
        </Text>
      </View>

      <QuickFactsBox technique={technique} theme={theme} />
      <DrummersList masters={technique.masters} theme={theme} onSelectDrummer={onSelectDrummer} />
      <FaqList faq={faq} theme={theme} />
      <RelatedTechniques related={related} theme={theme} onSelectTechnique={onSelectTechnique} />

      {onBack && (
        <Pressable onPress={onBack} style={[styles.backButton, { backgroundColor: theme.primary }]} accessibilityRole="link">
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  centered: { alignItems: 'center', justifyContent: 'center' },
  scrollContent: { paddingBottom: 40 },
  loadingText: { textAlign: 'center', marginTop: 16, fontSize: 16 },
  emoji: { fontSize: 48, marginBottom: 12 },
  notFoundTitle: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  emptyText: { fontSize: 14, textAlign: 'center', marginBottom: 16 },
  header: { marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 16, marginTop: 8 },
  quickFacts: { padding: 20, borderRadius: 12, borderWidth: 2, marginBottom: 20 },
  factRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  factLabel: { fontSize: 14 },
  factValue: { fontSize: 14, fontWeight: '600' },
  drummerCard: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  drummerName: { fontSize: 16, fontWeight: '600' },
  drummerBand: { fontSize: 14, marginTop: 4 },
  drummerNote: { fontSize: 14, marginTop: 8, fontStyle: 'italic' },
  faqItem: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 12 },
  faqQuestion: { fontSize: 16, fontWeight: '600' },
  faqAnswer: { fontSize: 14, marginTop: 12, lineHeight: 22 },
  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, marginRight: 8, marginBottom: 8 },
  chipText: { fontSize: 14, fontWeight: '600' },
  backButton: { alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, marginVertical: 20 },
  backButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default TechniqueDrummersPage;
