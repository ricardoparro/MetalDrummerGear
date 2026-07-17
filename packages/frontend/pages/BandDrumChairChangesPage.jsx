// BandDrumChairChangesPage — /bands/drum-chair-changes
// Issue #4769 (extension of epic #4753): timeline of drum-chair changes
// (one drummer replacing another) derived entirely from every band's
// drummerHistory via getAllDrumChairChanges() — no hand-maintained list, so
// this page grows automatically as bands.js gains history. A natural
// news-adjacent landing page for "new drummer" / "who drums for X now" queries.

import React, { useEffect, useContext, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getAllDrumChairChanges } from '../data/bands';
import { toSlug } from '../utils/urlHelpers';

const BASE_URL = 'https://metalforge.io';

function navigate(path) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

function humanizeSlug(slug) {
  return String(slug).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function decadeOf(year) {
  if (!year) return 'Undated';
  return `${Math.floor(year / 10) * 10}s`;
}

function buildItemListSchema(changes) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Metal Drum Chair Changes',
    description: 'Timeline of metal drummer lineup changes — who replaced who, and when — derived from every band tracked on MetalForge.',
    url: `${BASE_URL}/bands/drum-chair-changes`,
    numberOfItems: changes.length,
    itemListElement: changes.map((c, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${c.bandName}: ${humanizeSlug(c.fromDrummerSlug)} → ${humanizeSlug(c.toDrummerSlug)}${c.year ? ` (${c.year})` : ''}`,
      url: `${BASE_URL}/bands/${c.bandSlug}`,
    })),
  };
}

function injectSchema(changes) {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector('script[type="application/ld+json"][data-page="drum-chair-changes"]');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'drum-chair-changes');
  script.textContent = JSON.stringify(buildItemListSchema(changes));
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  const el = document.querySelector('script[type="application/ld+json"][data-page="drum-chair-changes"]');
  if (el) el.remove();
}

export function BandDrumChairChangesPage({ drummers = [], onNavigateToDrummer }) {
  const theme = useContext(ThemeContext);
  const changes = useMemo(() => getAllDrumChairChanges(), []);

  const decades = useMemo(() => {
    const grouped = new Map();
    for (const change of changes) {
      const key = decadeOf(change.year);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(change);
    }
    return Array.from(grouped.entries());
  }, [changes]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Metal Drum Chair Changes: Who Replaced Who | MetalForge';
      injectSchema(changes);
    }
    return () => removeSchema();
  }, [changes]);

  const resolveDrummer = (slug) => drummers.find(d => toSlug(d.name) === slug);

  const DrummerLink = ({ slug }) => {
    const drummer = resolveDrummer(slug);
    const name = drummer?.name || humanizeSlug(slug);
    if (!drummer) {
      return <Text style={[styles.drummerName, { color: theme.text }]}>{name}</Text>;
    }
    return (
      <Pressable
        onPress={() => {
          if (onNavigateToDrummer) onNavigateToDrummer(slug);
          else navigate(`/drummer/${slug}`);
        }}
        accessibilityRole="link"
        accessibilityLabel={`View ${name}'s profile`}
      >
        <Text style={[styles.drummerName, styles.drummerLink, { color: theme.primary }]}>{name}</Text>
      </Pressable>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="1">
          Drum Chair Changes
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Every metal drummer lineup change tracked on MetalForge, newest first — who replaced who, and when.
          Derived directly from each band's documented drummer history, so this list updates as new changes are added.
        </Text>
      </View>

      {decades.map(([decade, decadeChanges], decadeIndex) => (
        <View key={decade} style={styles.decadeSection}>
          <Text
            style={[
              styles.decadeHeading,
              { color: theme.text, borderColor: theme.border },
              decadeIndex === 0 && [styles.decadeHeadingCurrent, { color: theme.primary, borderColor: theme.primary }],
            ]}
            accessibilityRole="heading"
            aria-level="2"
          >
            {decade}
          </Text>
          {decadeChanges.map((change) => (
            <Pressable
              key={`${change.bandSlug}-${change.toDrummerSlug}-${change.period}`}
              style={[styles.changeRow, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => navigate(`/bands/${change.bandSlug}`)}
              accessibilityRole="link"
              accessibilityLabel={`${change.bandName}: ${humanizeSlug(change.fromDrummerSlug)} to ${humanizeSlug(change.toDrummerSlug)}`}
            >
              <View style={styles.changeRowHeader}>
                <Text style={[styles.bandName, { color: theme.text }]}>{change.bandName}</Text>
                <Text style={[styles.changeYear, { color: theme.secondaryText }]}>{change.year || change.period}</Text>
              </View>
              <View style={styles.changeTransition}>
                <DrummerLink slug={change.fromDrummerSlug} />
                <Text style={[styles.arrow, { color: theme.secondaryText }]}> → </Text>
                <DrummerLink slug={change.toDrummerSlug} />
              </View>
              {change.notes && (
                <Text style={[styles.changeNotes, { color: theme.secondaryText }]}>{change.notes}</Text>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 40 },
  header: { marginBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  decadeSection: { marginBottom: 24 },
  decadeHeading: {
    fontSize: 18,
    fontWeight: '700',
    borderBottomWidth: 2,
    paddingBottom: 6,
    marginBottom: 12,
  },
  decadeHeadingCurrent: { fontSize: 20 },
  changeRow: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  changeRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  bandName: { fontSize: 17, fontWeight: '700' },
  changeYear: { fontSize: 14, fontWeight: '600' },
  changeTransition: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 6 },
  drummerName: { fontSize: 15 },
  drummerLink: { fontWeight: '600', textDecorationLine: 'underline' },
  arrow: { fontSize: 15 },
  changeNotes: { fontSize: 13, lineHeight: 18 },
});

export default BandDrumChairChangesPage;
