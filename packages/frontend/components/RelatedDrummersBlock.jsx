// Related Drummers Block — Issue #1005 (split 1/3 of #874)
//
// Reusable internal-linking block: given a drummer, surface up to 4 OTHER
// drummers related by shared genre OR shared primary gear brand. Uses
// descriptive anchor text ("Lars Ulrich's Metallica setup" style) rather than
// bare names so the outbound links carry SEO weight. Images are lazy-loaded
// with explicit dimensions to avoid CLS.
//
// This component is intentionally self-contained (computes its own related set
// from `allDrummers`). Page wiring across every drummer/gear page is #1007
// (split 3/3 of #874); this PR stub-tests it on the Lars Ulrich page only.

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { extractBrand } from '../data/gearCategoryPages';

// Slugify a drummer name into the /drummer/<slug> path segment.
// Mirrors toSlug() in App.js so links resolve to canonical profile URLs.
function toSlug(name) {
  return (name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Normalise a drummer's genre(s) into an array (records use either `genres[]`
// or a single `genre` string).
function getGenres(drummer) {
  if (!drummer) return [];
  if (Array.isArray(drummer.genres) && drummer.genres.length) return drummer.genres;
  return drummer.genre ? [drummer.genre] : [];
}

// The drummer's primary gear brand — their drum kit brand, falling back to
// cymbals. Used both to find related drummers and to phrase the "why related".
function getPrimaryBrand(drummer) {
  if (!drummer?.gear) return null;
  return extractBrand(drummer.gear.drums, 'drums') || extractBrand(drummer.gear.cymbals, 'cymbals');
}

// First genre shared between two drummers, if any.
function sharedGenre(a, b) {
  const ag = getGenres(a);
  const bg = getGenres(b).map((g) => g.toLowerCase());
  return ag.find((g) => bg.includes(g.toLowerCase())) || null;
}

// Compute up to `limit` related drummers. A drummer is related when they share
// a genre OR a primary brand with the source. Genre matches are preferred
// (broader relevance) and used to build the descriptive "why related" line.
export function getRelatedDrummers(drummer, allDrummers = [], limit = 4) {
  if (!drummer || !Array.isArray(allDrummers) || allDrummers.length === 0) return [];
  const sourceBrand = getPrimaryBrand(drummer);

  const candidates = [];
  for (const other of allDrummers) {
    if (!other || other.id === drummer.id || other.name === drummer.name) continue;

    const genre = sharedGenre(drummer, other);
    const otherBrand = getPrimaryBrand(other);
    const brandMatch = sourceBrand && otherBrand && sourceBrand.toLowerCase() === otherBrand.toLowerCase();

    if (!genre && !brandMatch) continue;

    // Prefer a genre-based reason; fall back to the shared brand.
    const reason = genre
      ? `Also ${genre.toLowerCase()}`
      : `Also plays ${otherBrand}`;

    candidates.push({
      drummer: other,
      reason,
      // Genre matches rank above brand-only matches.
      score: genre ? 2 : 1,
    });
  }

  return candidates
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function RelatedDrummerCard({ item, theme }) {
  const { drummer: related, reason } = item;
  const url = `/drummer/${toSlug(related.name)}`;
  // Descriptive anchor text — not the bare name — to carry SEO weight.
  const anchorText = `${related.name}'s ${related.band} setup`;

  const card = (
    <View style={[styles.card, { backgroundColor: theme.background, borderColor: theme.border }]}>
      <Image
        source={related.image ? { uri: related.image } : undefined}
        style={styles.image}
        contentFit="cover"
        cachePolicy="memory-disk"
        accessibilityLabel={`Photo of ${related.name}`}
      />
      <View style={styles.info}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
          {related.name}
        </Text>
        <Text style={[styles.anchorLine, { color: theme.text }]} numberOfLines={1}>
          {anchorText}
        </Text>
        <Text style={[styles.reason, { color: theme.secondaryText || theme.text }]} numberOfLines={1}>
          {reason}
        </Text>
      </View>
    </View>
  );

  if (Platform.OS === 'web') {
    return (
      <a
        href={url}
        aria-label={anchorText}
        style={{ textDecoration: 'none', display: 'block', width: '100%' }}
      >
        {card}
      </a>
    );
  }

  return (
    <TouchableOpacity accessibilityRole="link" accessibilityLabel={anchorText} style={{ width: '100%' }}>
      {card}
    </TouchableOpacity>
  );
}

export default function RelatedDrummersBlock({ drummer, allDrummers = [], theme }) {
  const t = theme || { text: '#111', secondaryText: '#666', background: '#fff', border: '#e5e5e5', card: '#fff' };
  const related = useMemo(
    () => getRelatedDrummers(drummer, allDrummers, 4),
    [drummer, allDrummers]
  );

  if (related.length === 0) return null;

  return (
    <View style={[styles.section, { backgroundColor: t.card, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.text }]} accessibilityRole="header">
        Related Drummers
      </Text>
      <View style={styles.grid}>
        {related.map((item) => (
          <View key={item.drummer.id} style={styles.cell}>
            <RelatedDrummerCard item={item} theme={t} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cell: {
    width: '48%',
    marginBottom: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  // Explicit dimensions reserve layout space → no CLS as the photo loads.
  image: {
    width: '100%',
    height: 140,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  anchorLine: {
    fontSize: 13,
    marginTop: 2,
  },
  reason: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
});
