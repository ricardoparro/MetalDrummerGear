// StudiesHubPage — /studies
// Issue #4764 (phase 1/3 of epic #4763): index of MetalForge's data-driven studies.
// Grows in phase 2/3 as more studies ship (see data/studies/index.js registry).

import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { STUDIES } from '../data/studies';

const BASE_URL = 'https://metalforge.io';

function navigate(path) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

function buildCollectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MetalForge Studies',
    description: 'Data-driven studies analyzing gear, technique, and trends across MetalForge’s documented roster of metal drummers.',
    url: `${BASE_URL}/studies`,
    hasPart: STUDIES.map((s) => ({
      '@type': 'Article',
      name: s.seoTitle,
      description: s.description,
      url: `${BASE_URL}/studies/${s.slug}`,
      dateModified: s.dateModified,
    })),
  };
}

function injectSchema() {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="studies-hub"]');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'studies-hub');
  script.textContent = JSON.stringify(buildCollectionSchema());
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const el = document.querySelector('script[type="application/ld+json"][data-page="studies-hub"]');
  if (el) el.remove();
}

export function StudiesHubPage() {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Studies — Data-Driven Metal Drumming Analysis | MetalForge';
      injectSchema();
    }
    return () => removeSchema();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>Studies</Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Data-driven analysis computed directly from MetalForge's documented drummer roster —
          every number traces back to a build-time stats engine, not a hand-written claim.
        </Text>
      </View>

      <View style={styles.section}>
        {STUDIES.map((study) => (
          <Pressable
            key={study.slug}
            style={[styles.studyCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => navigate(`/studies/${study.slug}`)}
            accessibilityRole="link"
            accessibilityLabel={study.seoTitle}
          >
            <Text style={[styles.studyTitle, { color: theme.text }]}>{study.title}</Text>
            <Text style={[styles.studyDescription, { color: theme.secondaryText }]}>{study.description}</Text>
            <Text style={[styles.studyMeta, { color: theme.mutedText || theme.secondaryText }]}>
              Dataset: {study.datasetSize} drummers · Updated {study.dateModified}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 40 },
  header: { marginBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  section: { marginBottom: 24 },
  studyCard: { padding: 20, borderRadius: 8, borderWidth: 1, marginBottom: 16 },
  studyTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  studyDescription: { fontSize: 15, lineHeight: 22, marginBottom: 10 },
  studyMeta: { fontSize: 13 },
});

export default StudiesHubPage;
