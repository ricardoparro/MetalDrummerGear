// SongsListPages — /songs/fastest-metal-songs, /songs/tempo/<tier>, /songs/drummer/<slug>
// Issue #4760 (songs epic #4758, phase 2/4): the ranked list pages that carry
// the query volume ("fastest metal songs", "thrash metal songs bpm"). All
// three share one ranked-table renderer and schema builder since they're the
// same shape (a ranked ItemList of songs) filtered a different way.

import React, { useEffect, useContext, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import {
  getTempoTierBySlug,
  getFastestMetalSongs,
  getSongsByDrummerSlug,
  FASTEST_SONGS_MIN_BPM,
} from '../data/metalSongsBpm';

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

// Drummer roster slug -> display name, built from the live roster prop so a
// song's `drummer` slug only ever links to a profile that actually exists.
function useDrummerLookup(drummers) {
  return useMemo(() => new Map(
    (drummers || []).map(d => [
      d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      d,
    ])
  ), [drummers]);
}

function buildItemListSchema({ name, description, url, songs }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url,
    numberOfItems: songs.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: songs.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MusicRecording',
        name: s.song,
        byArtist: { '@type': 'MusicGroup', name: s.band },
        url: `${BASE_URL}/songs#${s.slug}`,
        additionalProperty: { '@type': 'PropertyValue', name: 'BPM', value: s.bpm },
      },
    })),
  };
}

function buildBreadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

function injectSchema(pageKey, schemas) {
  if (typeof document === 'undefined') return;
  document.querySelectorAll(`script[data-page="${pageKey}"]`).forEach(el => el.remove());
  schemas.filter(Boolean).forEach((schema, i) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page', pageKey);
    script.setAttribute('data-index', String(i));
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

function removeSchema(pageKey) {
  if (typeof document === 'undefined') return;
  document.querySelectorAll(`script[data-page="${pageKey}"]`).forEach(el => el.remove());
}

function DrummerRef({ slug, drummerBySlug, theme }) {
  const drummer = drummerBySlug.get(slug);
  const name = drummer?.name || humanize(slug);
  if (!drummer) return <Text style={{ color: theme.secondaryText }}>{name}</Text>;
  return (
    <WebLink href={`/drummer/${slug}`} style={{ color: theme.primary, fontWeight: '700' }}>
      {name}
    </WebLink>
  );
}

// Shared ranked-table renderer for tempo tier / flagship / by-drummer pages.
// Each row links its drummer (when the slug resolves to a live roster
// profile) and offers a "practice at this tempo" CTA into the /bpm tool.
function RankedSongsTable({ songs, drummerBySlug, theme, showDrummerColumn = true }) {
  return (
    <View style={[styles.table, { borderColor: theme.border }]}>
      {songs.map((s, i) => (
        <View
          key={s.slug}
          nativeID={s.slug}
          style={[
            styles.row,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.rank, { color: theme.mutedText || theme.secondaryText }]}>#{i + 1}</Text>
          <View style={styles.rowMain}>
            <Text style={[styles.songTitle, { color: theme.text }]}>{s.song}</Text>
            <Text style={[styles.songMeta, { color: theme.secondaryText }]}>
              {s.band} · {s.album} ({s.year})
              {showDrummerColumn ? (
                <>
                  {' · '}
                  <DrummerRef slug={s.drummer} drummerBySlug={drummerBySlug} theme={theme} />
                </>
              ) : null}
            </Text>
            {s.bpmNote ? (
              <Text style={[styles.songNote, { color: theme.mutedText || theme.secondaryText }]}>{s.bpmNote}</Text>
            ) : null}
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
      ))}
    </View>
  );
}

function ListPageShell({ title, subtitle, breadcrumb, children }) {
  const theme = useContext(ThemeContext);
  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.breadcrumbRow}>
        {breadcrumb.map((c, i) => (
          <Text key={c.name} style={{ color: theme.secondaryText, fontSize: 13 }}>
            {i > 0 ? ' / ' : ''}
            {c.href ? (
              <WebLink href={c.href} style={{ color: theme.secondaryText }}>{c.name}</WebLink>
            ) : c.name}
          </Text>
        ))}
      </View>
      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="1">
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>{subtitle}</Text>
      </View>
      {children}
    </ScrollView>
  );
}

// /songs/fastest-metal-songs — the flagship, 200+ BPM ranked, with FAQPage
// schema answering "what is the fastest metal song?" from our top entry.
export function FastestMetalSongsPage({ drummers = [] }) {
  const theme = useContext(ThemeContext);
  const songs = useMemo(() => getFastestMetalSongs(), []);
  const drummerBySlug = useDrummerLookup(drummers);
  const top = songs[0];

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    document.title = 'Fastest Metal Songs Ranked by BPM | MetalForge';
    const faqAnswer = top
      ? `The fastest metal song in MetalForge's database is "${top.song}" by ${top.band} at ${top.bpm} BPM, drummed by ${humanize(top.drummer)}. ` +
        `Source: ${top.source}. Note that BPM figures in this database aren't audio-metronome-measured for every entry — see each song's source for its specific verification method, and some fast passages (like double-time sections) push a track's felt tempo well beyond its listed BPM.`
      : '';
    injectSchema('fastest-metal-songs', [
      buildItemListSchema({
        name: 'Fastest Metal Songs',
        description: `Metal songs at ${FASTEST_SONGS_MIN_BPM}+ BPM, ranked fastest first.`,
        url: `${BASE_URL}/songs/fastest-metal-songs`,
        songs,
      }),
      buildBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Songs', url: `${BASE_URL}/songs` },
        { name: 'Fastest Metal Songs', url: `${BASE_URL}/songs/fastest-metal-songs` },
      ]),
      top ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [{
          '@type': 'Question',
          name: 'What is the fastest metal song?',
          acceptedAnswer: { '@type': 'Answer', text: faqAnswer },
        }],
      } : null,
    ]);
    return () => removeSchema('fastest-metal-songs');
  }, [songs, top]);

  return (
    <ListPageShell
      title="Fastest Metal Songs"
      subtitle={`${songs.length} metal songs at ${FASTEST_SONGS_MIN_BPM}+ BPM, ranked fastest first — from blast-beat grindcore down to the slowest song that still clears the ${FASTEST_SONGS_MIN_BPM} BPM bar. Tap "Practice at this tempo" to drop any of these into the BPM tool.`}
      breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Songs', href: '/songs' }, { name: 'Fastest Metal Songs' }]}
    >
      {top ? (
        <View style={[styles.faqBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.faqQuestion, { color: theme.text }]}>What is the fastest metal song?</Text>
          <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>
            "{top.song}" by {top.band} at {top.bpm} BPM, drummed by <DrummerRef slug={top.drummer} drummerBySlug={drummerBySlug} theme={theme} />.
            BPM figures here aren't audio-metronome-measured for every entry — see each song's source note for its
            verification method, and double-time passages can make a track feel considerably faster than its listed BPM.
          </Text>
        </View>
      ) : null}
      <RankedSongsTable songs={songs} drummerBySlug={drummerBySlug} theme={theme} />
    </ListPageShell>
  );
}

// /songs/tempo/<tier> — one page per TEMPO_RANGES tier (doom/groove/thrash/extreme/blast).
export function SongsTempoTierPage({ tierSlug, drummers = [] }) {
  const theme = useContext(ThemeContext);
  const tier = useMemo(() => getTempoTierBySlug(tierSlug), [tierSlug]);
  const drummerBySlug = useDrummerLookup(drummers);

  useEffect(() => {
    if (Platform.OS !== 'web' || !tier) return;
    document.title = `${tier.label} Metal Songs (${tier.min}-${tier.max} BPM) | MetalForge`;
    injectSchema('songs-tempo-tier', [
      buildItemListSchema({
        name: `${tier.label} Metal Songs`,
        description: `Metal songs in the ${tier.label} tempo range (${tier.min}-${tier.max} BPM), ranked fastest first.`,
        url: `${BASE_URL}/songs/tempo/${tier.slug}`,
        songs: tier.songs,
      }),
      buildBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Songs', url: `${BASE_URL}/songs` },
        { name: tier.label, url: `${BASE_URL}/songs/tempo/${tier.slug}` },
      ]),
    ]);
    return () => removeSchema('songs-tempo-tier');
  }, [tier]);

  if (!tier) {
    return (
      <ListPageShell
        title="Tempo Tier Not Found"
        subtitle="That tempo tier doesn't exist."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Songs', href: '/songs' }]}
      >
        <WebLink href="/songs" style={{ color: theme.primary }}>← Back to Songs</WebLink>
      </ListPageShell>
    );
  }

  return (
    <ListPageShell
      title={`${tier.emoji} ${tier.label} Metal Songs`}
      subtitle={`${tier.songs.length} metal songs in the ${tier.min}-${tier.max} BPM range, ranked fastest first. This is where ${tier.label.toLowerCase()} lives — tap "Practice at this tempo" to drill any of these in the BPM tool.`}
      breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Songs', href: '/songs' }, { name: tier.label }]}
    >
      <RankedSongsTable songs={tier.songs} drummerBySlug={drummerBySlug} theme={theme} />
    </ListPageShell>
  );
}

// /songs/drummer/<slug> — only reachable/linked for roster drummers with
// >=3 songs in the database (the hub/tier tables only ever link qualifying
// slugs); this component itself stays permissive so a direct hit never 404s
// on a real song list, it just shows plain text instead of a drummer link
// when the roster hasn't resolved a match yet.
export function SongsByDrummerPage({ drummerSlug, drummers = [] }) {
  const theme = useContext(ThemeContext);
  const songs = useMemo(() => getSongsByDrummerSlug(drummerSlug), [drummerSlug]);
  const drummerBySlug = useDrummerLookup(drummers);
  const drummer = drummerBySlug.get(drummerSlug);
  const displayName = drummer?.name || humanize(drummerSlug);

  useEffect(() => {
    if (Platform.OS !== 'web' || songs.length === 0) return;
    document.title = `${displayName} Songs by BPM | MetalForge`;
    injectSchema('songs-by-drummer', [
      buildItemListSchema({
        name: `${displayName} Songs by BPM`,
        description: `Every song in MetalForge's database drummed by ${displayName}, ranked fastest first.`,
        url: `${BASE_URL}/songs/drummer/${drummerSlug}`,
        songs,
      }),
      buildBreadcrumbSchema([
        { name: 'Home', url: BASE_URL },
        { name: 'Songs', url: `${BASE_URL}/songs` },
        { name: displayName, url: `${BASE_URL}/songs/drummer/${drummerSlug}` },
      ]),
    ]);
    return () => removeSchema('songs-by-drummer');
  }, [songs, displayName, drummerSlug]);

  if (songs.length === 0) {
    return (
      <ListPageShell
        title="Drummer Not Found"
        subtitle="No songs are documented for that drummer."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Songs', href: '/songs' }]}
      >
        <WebLink href="/songs" style={{ color: theme.primary }}>← Back to Songs</WebLink>
      </ListPageShell>
    );
  }

  return (
    <ListPageShell
      title={`${displayName} — Songs by BPM`}
      subtitle={`${songs.length} songs in MetalForge's database drummed by ${displayName}, ranked fastest first.${drummer ? '' : ''}`}
      breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Songs', href: '/songs' }, { name: displayName }]}
    >
      {drummer ? (
        <WebLink href={`/drummer/${drummerSlug}`} style={[styles.profileLink, { color: theme.primary, borderColor: theme.primary }]}>
          View {displayName}'s full gear profile →
        </WebLink>
      ) : null}
      <RankedSongsTable songs={songs} drummerBySlug={drummerBySlug} theme={theme} showDrummerColumn={false} />
    </ListPageShell>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 40 },
  breadcrumbRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  header: { marginBottom: 20 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  faqBox: { padding: 16, borderRadius: 8, borderWidth: 1, marginBottom: 20 },
  faqQuestion: { fontSize: 17, fontWeight: '700', marginBottom: 8 },
  faqAnswer: { fontSize: 15, lineHeight: 22 },
  profileLink: {
    alignSelf: 'flex-start', fontSize: 14, fontWeight: '700', marginBottom: 16,
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6, borderWidth: 1,
  },
  table: { borderRadius: 8, overflow: 'hidden' },
  row: {
    flexDirection: 'row', alignItems: 'center', padding: 12,
    borderBottomWidth: 1, gap: 10,
  },
  rank: { width: 36, fontSize: 13, fontWeight: '700' },
  rowMain: { flex: 1 },
  songTitle: { fontSize: 15, fontWeight: '700' },
  songMeta: { fontSize: 13, marginTop: 2 },
  songNote: { fontSize: 12, marginTop: 4, fontStyle: 'italic' },
  rowActions: { alignItems: 'flex-end', gap: 4 },
  bpmValue: { fontSize: 15, fontWeight: '700' },
  practiceLink: {
    fontSize: 12, fontWeight: '600', paddingVertical: 4, paddingHorizontal: 8,
    borderRadius: 4, borderWidth: 1,
  },
});
