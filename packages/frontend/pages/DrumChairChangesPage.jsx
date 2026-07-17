// DrumChairChangesPage — /bands/drum-chair-changes
// Issue #4769 (epic #4753 extension): timeline of every drum-chair change
// (one drummer handing off to the next) across all bands, derived entirely
// from data/bands.js's drummerHistory via getDrumChairChanges(). Grows
// automatically as bands gain history entries — nothing here is hand-typed.

import React, { useEffect, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getDrumChairChanges } from '../data/bands';

const BASE_URL = 'https://metalforge.io';

function humanize(slug) {
  if (!slug) return '';
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function navigate(path) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

function WebLink({ href, children, style }) {
  if (Platform.OS !== 'web') {
    return <Text style={style}>{children}</Text>;
  }
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      style={{ textDecoration: 'none', ...style }}
    >
      {children}
    </a>
  );
}

function buildItemListSchema(changes) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Drum Chair Changes Timeline',
    description: 'Every documented drum-chair change across MetalForge’s tracked metal bands, most recent first.',
    url: `${BASE_URL}/bands/drum-chair-changes`,
    numberOfItems: changes.length,
    itemListElement: changes.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: `${c.bandName}: ${humanize(c.fromDrummer)} → ${humanize(c.toDrummer)}`,
        startDate: String(c.year),
        url: `${BASE_URL}/bands/${c.bandSlug}`,
      },
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

// Group changes (already sorted year-desc by getDrumChairChanges) by decade,
// preserving the incoming order within each decade.
function groupByDecade(changes) {
  const groups = [];
  let current = null;
  for (const change of changes) {
    const decade = Math.floor(change.year / 10) * 10;
    if (!current || current.decade !== decade) {
      current = { decade, changes: [] };
      groups.push(current);
    }
    current.changes.push(change);
  }
  return groups;
}

export function DrumChairChangesPage({ drummers = [] }) {
  const theme = useContext(ThemeContext);
  const changes = getDrumChairChanges();
  const decadeGroups = groupByDecade(changes);
  const mostRecentDecade = decadeGroups[0]?.decade;
  const drummerBySlug = new Map(
    drummers.map(d => [
      d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      d,
    ])
  );

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Drum Chair Changes — Who Replaced Who in Metal | MetalForge';
      injectSchema(changes);
    }
    return () => removeSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function DrummerRef({ slug }) {
    const drummer = drummerBySlug.get(slug);
    const name = drummer?.name || humanize(slug);
    if (!drummer) return <Text style={{ color: theme.text, fontWeight: fontWeightBold }}>{name}</Text>;
    return (
      <WebLink href={`/drummer/${slug}`} style={{ color: theme.primary, fontWeight: fontWeightBold }}>
        {name}
      </WebLink>
    );
  }

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
          Every documented drummer handoff across MetalForge's tracked bands, newest first —
          derived directly from each band's drummer history, so this list grows automatically
          as new lineup changes are added.
        </Text>
      </View>

      {decadeGroups.map((group) => (
        <View key={group.decade} style={styles.decadeSection}>
          <Text
            style={[
              styles.decadeHeading,
              { color: theme.text },
              group.decade === mostRecentDecade && [styles.decadeHeadingEmphasized, { color: theme.primary }],
            ]}
            accessibilityRole="heading"
            aria-level="2"
          >
            {group.decade}s
          </Text>
          {group.changes.map((c) => (
            <View
              key={`${c.bandSlug}-${c.toDrummer}-${c.year}`}
              style={[
                styles.changeRow,
                { backgroundColor: theme.card, borderColor: theme.border },
                group.decade === mostRecentDecade && styles.changeRowEmphasized,
              ]}
            >
              <Text style={[styles.changeYear, { color: theme.secondaryText }]}>{c.year}</Text>
              <View style={styles.changeContent}>
                <Text style={styles.changeLine}>
                  <WebLink href={`/bands/${c.bandSlug}`} style={{ color: theme.text, fontWeight: fontWeightBold }}>
                    {c.bandName}
                  </WebLink>
                  <Text style={{ color: theme.secondaryText }}>: </Text>
                  <DrummerRef slug={c.fromDrummer} />
                  <Text style={{ color: theme.secondaryText }}> → </Text>
                  <DrummerRef slug={c.toDrummer} />
                </Text>
                {c.notes ? (
                  <Text style={[styles.changeNotes, { color: theme.secondaryText }]}>{c.notes}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const fontWeightBold = '700';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 40 },
  header: { marginBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  decadeSection: { marginBottom: 24 },
  decadeHeading: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  decadeHeadingEmphasized: { fontSize: 24 },
  changeRow: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
  },
  changeRowEmphasized: { borderWidth: 2 },
  changeYear: { fontSize: 14, fontWeight: '700', width: 56 },
  changeContent: { flex: 1 },
  changeLine: { fontSize: 15, lineHeight: 22 },
  changeNotes: { fontSize: 13, lineHeight: 18, marginTop: 4 },
});

export default DrumChairChangesPage;
