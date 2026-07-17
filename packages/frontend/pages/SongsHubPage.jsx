// SongsHubPage — /songs
// Issue #4760 (songs epic #4758, phase 2/4): browsable hub over the full
// metalSongsBpm.js database — by tempo range (reusing TEMPO_RANGES), genre,
// band, and drummer. Tempo tiers and the flagship link out to their own real
// pages (SongsListPages.jsx); genre/band browsing is an in-page filter since
// those don't get dedicated routes in this phase.

import React, { useEffect, useContext, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import {
  metalSongs,
  getAllGenres,
  getAllBands,
  getTempoTiers,
  getFastestMetalSongs,
  FASTEST_SONGS_MIN_BPM,
} from '../data/metalSongsBpm';

const BASE_URL = 'https://metalforge.io';

function navigate(path) {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}

function WebLink({ href, children, style, onPress }) {
  if (Platform.OS !== 'web') {
    return <Text style={style}>{children}</Text>;
  }
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        if (onPress) onPress();
        navigate(href);
      }}
      style={{ textDecoration: 'none', ...style }}
    >
      {children}
    </a>
  );
}

function humanizeGenre(genre) {
  return genre.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function buildCollectionSchema(tiers) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Metal Songs Database',
    description: `Browse ${metalSongs.length} metal songs by tempo, genre, band, and drummer.`,
    url: `${BASE_URL}/songs`,
    hasPart: [
      {
        '@type': 'ItemList',
        name: 'Fastest Metal Songs',
        url: `${BASE_URL}/songs/fastest-metal-songs`,
      },
      ...tiers.map(t => ({
        '@type': 'ItemList',
        name: `${t.label} Metal Songs`,
        url: `${BASE_URL}/songs/tempo/${t.slug}`,
      })),
    ],
  };
}

function injectSchema(schema) {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('script[data-page="songs-hub"]').forEach(el => el.remove());
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-page', 'songs-hub');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('script[data-page="songs-hub"]').forEach(el => el.remove());
}

export function SongsHubPage({ drummers = [] }) {
  const theme = useContext(ThemeContext);
  const tiers = useMemo(() => getTempoTiers(), []);
  const genres = useMemo(() => getAllGenres(), []);
  const bands = useMemo(() => getAllBands(), []);
  const fastestCount = useMemo(() => getFastestMetalSongs().length, []);

  const [genreFilter, setGenreFilter] = useState('');
  const [bandFilter, setBandFilter] = useState('');
  const [search, setSearch] = useState('');

  const drummerBySlug = useMemo(() => new Map(
    (drummers || []).map(d => [
      d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      d,
    ])
  ), [drummers]);

  const filteredSongs = useMemo(() => {
    let songs = metalSongs;
    if (genreFilter) songs = songs.filter(s => s.genre === genreFilter);
    if (bandFilter) songs = songs.filter(s => s.band === bandFilter);
    if (search) {
      const q = search.toLowerCase();
      songs = songs.filter(s =>
        s.song.toLowerCase().includes(q) || s.band.toLowerCase().includes(q)
      );
    }
    return songs.slice().sort((a, b) => b.bpm - a.bpm);
  }, [genreFilter, bandFilter, search]);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    document.title = `Metal Songs Database — Browse by Tempo, Genre & Drummer | MetalForge`;
    injectSchema(buildCollectionSchema(tiers));
    return () => removeSchema();
  }, [tiers]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="1">
          Metal Songs Database
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          {metalSongs.length} metal songs across {bands.length} bands and {genres.length} subgenres, every one with a
          verified BPM and its recording drummer. Browse by tempo range, genre, band, or drummer below — or tap
          "Practice at this tempo" on any song to drop it straight into the BPM tool.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Browse by Tempo</Text>
        <View style={styles.cardGrid}>
          <TouchableOpacity
            style={[styles.tierCard, styles.flagshipCard, { backgroundColor: theme.card, borderColor: theme.primary }]}
            onPress={() => navigate('/songs/fastest-metal-songs')}
            accessibilityRole="link"
          >
            <Text style={{ fontSize: 24 }}>🔥</Text>
            <Text style={[styles.tierCardTitle, { color: theme.text }]}>Fastest Metal Songs</Text>
            <Text style={[styles.tierCardMeta, { color: theme.secondaryText }]}>
              {fastestCount} songs at {FASTEST_SONGS_MIN_BPM}+ BPM
            </Text>
          </TouchableOpacity>
          {tiers.map(tier => (
            <TouchableOpacity
              key={tier.slug}
              style={[styles.tierCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => navigate(`/songs/tempo/${tier.slug}`)}
              accessibilityRole="link"
            >
              <Text style={{ fontSize: 24 }}>{tier.emoji}</Text>
              <Text style={[styles.tierCardTitle, { color: theme.text }]}>{tier.label}</Text>
              <Text style={[styles.tierCardMeta, { color: theme.secondaryText }]}>
                {tier.min}-{tier.max} BPM · {tier.songs.length} songs
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Browse by Genre & Band</Text>
        {Platform.OS === 'web' ? (
          <View style={styles.filterRow}>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              style={{ ...selectStyle, backgroundColor: theme.card, color: theme.text, border: `1px solid ${theme.border}` }}
              aria-label="Filter by genre"
            >
              <option value="">All Genres</option>
              {genres.map(g => <option key={g} value={g}>{humanizeGenre(g)}</option>)}
            </select>
            <select
              value={bandFilter}
              onChange={(e) => setBandFilter(e.target.value)}
              style={{ ...selectStyle, backgroundColor: theme.card, color: theme.text, border: `1px solid ${theme.border}` }}
              aria-label="Filter by band"
            >
              <option value="">All Bands</option>
              {bands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search songs or bands..."
              placeholderTextColor={theme.secondaryText}
              style={[styles.searchInput, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
            />
          </View>
        ) : null}
        <Text style={[styles.resultCount, { color: theme.secondaryText }]}>
          {filteredSongs.length} songs
        </Text>
      </View>

      <View style={[styles.table, { borderColor: theme.border }]}>
        {filteredSongs.slice(0, 100).map((s, i) => {
          const drummer = drummerBySlug.get(s.drummer);
          return (
            <View key={s.slug} style={[styles.row, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.rowMain}>
                <Text style={[styles.songTitle, { color: theme.text }]}>{s.song}</Text>
                <Text style={[styles.songMeta, { color: theme.secondaryText }]}>
                  {s.band} · {humanizeGenre(s.genre)} ({s.year})
                  {drummer ? (
                    <>
                      {' · '}
                      <WebLink href={`/drummer/${s.drummer}`} style={{ color: theme.primary, fontWeight: '700' }}>
                        {drummer.name}
                      </WebLink>
                    </>
                  ) : null}
                </Text>
              </View>
              <View style={styles.rowActions}>
                <Text style={[styles.bpmValue, { color: theme.primary }]}>{s.bpm} BPM</Text>
                <WebLink
                  href={`/bpm?bpm=${s.bpm}`}
                  style={[styles.practiceLink, { color: theme.accent, borderColor: theme.accent }]}
                >
                  Practice at this tempo →
                </WebLink>
              </View>
            </View>
          );
        })}
        {filteredSongs.length > 100 ? (
          <Text style={[styles.truncationNote, { color: theme.secondaryText }]}>
            Showing the first 100 of {filteredSongs.length} matching songs — narrow your filters to see more,
            or browse the full ranked lists by tempo above.
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const selectStyle = {
  padding: 10,
  borderRadius: 6,
  fontSize: 14,
  minWidth: 160,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 40 },
  header: { marginBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tierCard: { padding: 14, borderRadius: 10, borderWidth: 2, width: 180 },
  flagshipCard: { borderWidth: 2 },
  tierCardTitle: { fontSize: 15, fontWeight: '700', marginTop: 6 },
  tierCardMeta: { fontSize: 12, marginTop: 4 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
  searchInput: { padding: 10, borderRadius: 6, borderWidth: 1, fontSize: 14, minWidth: 220 },
  resultCount: { fontSize: 13 },
  table: { borderRadius: 8, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, gap: 10 },
  rowMain: { flex: 1 },
  songTitle: { fontSize: 15, fontWeight: '700' },
  songMeta: { fontSize: 13, marginTop: 2 },
  rowActions: { alignItems: 'flex-end', gap: 4 },
  bpmValue: { fontSize: 15, fontWeight: '700' },
  practiceLink: { fontSize: 12, fontWeight: '600', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, borderWidth: 1 },
  truncationNote: { fontSize: 13, padding: 14, textAlign: 'center', fontStyle: 'italic' },
});

export default SongsHubPage;
