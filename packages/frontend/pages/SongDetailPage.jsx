// SongDetailPage — /songs/<slug>
// Issue #4761 (songs epic #4758, phase 3/4): per-song pages behind the
// content-richness gate in data/metalSongsBpm.js (getSongPageSlugs /
// getSongPageData). Only songs that clear the gate ever route here — App.js
// checks membership in getSongPageSlugs() before rendering this component,
// so a direct hit on an under-gate slug never reaches this file at all (it
// falls through to the normal 404, matching the SignatureStickPage/
// SongsByDrummerPage convention elsewhere in this epic).

import React, { useEffect, useContext, useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { ThemeContext } from '../ThemeContext';
import { getSongPageData } from '../data/metalSongsBpm';

const BASE_URL = 'https://metalforge.io';

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

function buildMusicRecordingSchema(song) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: song.song,
    byArtist: { '@type': 'MusicGroup', name: song.band },
    ...(song.albumArticle ? { inAlbum: { '@type': 'MusicAlbum', name: song.album, url: `${BASE_URL}/articles/${song.albumArticle.slug}` } } : { inAlbum: { '@type': 'MusicAlbum', name: song.album } }),
    datePublished: String(song.year),
    genre: song.genre,
    url: `${BASE_URL}/songs/${song.slug}`,
    additionalProperty: { '@type': 'PropertyValue', name: 'BPM', value: song.bpm },
  };
}

function buildFaqSchema(song, drummerName) {
  const bpmAnswer = song.bpmNote
    ? `"${song.song}" by ${song.band} is ${song.bpm} BPM (${song.tier.label}). Note: ${song.bpmNote}.`
    : `"${song.song}" by ${song.band} is ${song.bpm} BPM (${song.tier.label} tempo range).`;
  const drummerAnswer = `${drummerName} played drums on "${song.song}" by ${song.band}, from the album ${song.album} (${song.year}).`;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: `What BPM is ${song.song}?`, acceptedAnswer: { '@type': 'Answer', text: bpmAnswer } },
      { '@type': 'Question', name: `Who played drums on ${song.song}?`, acceptedAnswer: { '@type': 'Answer', text: drummerAnswer } },
    ],
  };
}

function buildBreadcrumbSchema(song) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Songs', item: `${BASE_URL}/songs` },
      { '@type': 'ListItem', position: 3, name: song.song, item: `${BASE_URL}/songs/${song.slug}` },
    ],
  };
}

function injectSchema(schemas) {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('script[data-page="song-detail"]').forEach(el => el.remove());
  schemas.filter(Boolean).forEach((schema, i) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page', 'song-detail');
    script.setAttribute('data-index', String(i));
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

function removeSchema() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('script[data-page="song-detail"]').forEach(el => el.remove());
}

// Click-to-load YouTube embed, same facade pattern as TechniqueDrummersPage's
// VideoExample — no iframe cost paid until the user actually wants to watch.
function SongVideo({ video, theme }) {
  const { width } = useWindowDimensions();
  const [activated, setActivated] = useState(false);
  if (!video || !video.youtubeId) return null;

  const videoWidth = Math.min((width || 360) - 48, 640);
  const videoHeight = Math.round((videoWidth * 9) / 16);
  const thumbnailUrl = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`;

  if (Platform.OS !== 'web') return null;

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Video</Text>
      {activated ? (
        <View style={[styles.videoContainer, { width: videoWidth, height: videoHeight }]}>
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ borderRadius: 12, border: 0 }}
          />
        </View>
      ) : (
        <View
          style={[styles.videoContainer, { width: videoWidth, height: videoHeight, cursor: 'pointer', position: 'relative' }]}
          onClick={() => setActivated(true)}
          role="button"
          aria-label={`Play ${video.title}`}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActivated(true); }}
        >
          <img
            src={thumbnailUrl}
            alt={`${video.title} video thumbnail`}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
          />
          <View style={styles.playButtonOverlay}>
            <Text style={styles.playButtonIcon}>▶</Text>
          </View>
        </View>
      )}
    </View>
  );
}

export function SongDetailPage({ slug, drummers = [] }) {
  const theme = useContext(ThemeContext);
  const song = useMemo(() => getSongPageData(slug), [slug]);

  const drummerBySlug = useMemo(() => new Map(
    (drummers || []).map(d => [
      d.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      d,
    ])
  ), [drummers]);
  const drummer = song ? drummerBySlug.get(song.drummer) : null;
  const drummerName = drummer?.name || (song ? song.drummer.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '');

  useEffect(() => {
    if (Platform.OS !== 'web' || !song) return;
    document.title = `"${song.song}" by ${song.band} — BPM, Drummer & Tempo | MetalForge`;
    injectSchema([
      buildMusicRecordingSchema(song),
      buildFaqSchema(song, drummerName),
      buildBreadcrumbSchema(song),
    ]);
    return () => removeSchema();
  }, [song, drummerName]);

  if (!song) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.pageTitle, { color: theme.text }]}>Song Not Found</Text>
        <WebLink href="/songs" style={{ color: theme.primary }}>← Back to Songs</WebLink>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <View style={styles.breadcrumbRow}>
        <WebLink href="/" style={{ color: theme.secondaryText, fontSize: 13 }}>Home</WebLink>
        <Text style={{ color: theme.secondaryText, fontSize: 13 }}> / </Text>
        <WebLink href="/songs" style={{ color: theme.secondaryText, fontSize: 13 }}>Songs</WebLink>
        <Text style={{ color: theme.secondaryText, fontSize: 13 }}> / {song.song}</Text>
      </View>

      <View style={styles.header}>
        <Text style={[styles.pageTitle, { color: theme.text }]} accessibilityRole="heading" aria-level="1">
          {song.song}
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          {song.band} · {song.album} ({song.year})
        </Text>
      </View>

      <View style={[styles.bpmHero, { backgroundColor: theme.card, borderColor: theme.primary }]}>
        <Text style={{ fontSize: 24 }}>{song.tier.emoji}</Text>
        <Text style={[styles.bpmValue, { color: theme.primary }]}>{song.bpm} BPM</Text>
        <WebLink href={`/songs/tempo/${song.tier.slug}`} style={[styles.tierBadge, { color: theme.text, borderColor: theme.border }]}>
          {song.tier.label} ({song.tier.min}-{song.tier.max} BPM)
        </WebLink>
        {song.bpmNote ? (
          <Text style={[styles.bpmNote, { color: theme.secondaryText }]}>{song.bpmNote}</Text>
        ) : null}
        <WebLink href={`/bpm?bpm=${song.bpm}`} style={[styles.practiceLink, { color: theme.accent, borderColor: theme.accent }]}>
          Practice at this tempo →
        </WebLink>
      </View>

      <View style={[styles.drummerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Drummer</Text>
        {drummer ? (
          <WebLink href={`/drummer/${song.drummer}`} style={{ color: theme.primary, fontWeight: '700', fontSize: 16 }}>
            {drummerName} — full gear profile →
          </WebLink>
        ) : (
          <Text style={{ color: theme.text, fontWeight: '700', fontSize: 16 }}>{drummerName}</Text>
        )}
      </View>

      {song.albumArticle ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Album</Text>
          <WebLink href={`/articles/${song.albumArticle.slug}`} style={{ color: theme.primary, fontWeight: '600' }}>
            {song.albumArticle.title} →
          </WebLink>
        </View>
      ) : null}

      {song.techniqueSummary ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Technique Notes</Text>
          <Text style={[styles.bodyText, { color: theme.secondaryText }]}>{song.techniqueSummary}</Text>
        </View>
      ) : null}

      <SongVideo video={song.video} theme={theme} />

      {song.relatedSongs.length > 0 ? (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Related Songs</Text>
          <View style={styles.relatedGrid}>
            {song.relatedSongs.map(s => (
              <WebLink key={s.slug} href={`/songs/${s.slug}`} style={[styles.relatedCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <Text style={{ color: theme.text, fontWeight: '700', fontSize: 14 }}>{s.song}</Text>
                <Text style={{ color: theme.secondaryText, fontSize: 12, marginTop: 2 }}>{s.band} · {s.bpm} BPM</Text>
              </WebLink>
            ))}
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { paddingBottom: 40 },
  breadcrumbRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  header: { marginBottom: 16 },
  pageTitle: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22 },
  bpmHero: { padding: 20, borderRadius: 12, borderWidth: 2, alignItems: 'flex-start', marginBottom: 16, gap: 8 },
  bpmValue: { fontSize: 36, fontWeight: '800' },
  tierBadge: { fontSize: 13, fontWeight: '600', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, borderWidth: 1 },
  bpmNote: { fontSize: 14, fontStyle: 'italic', lineHeight: 20 },
  practiceLink: { fontSize: 13, fontWeight: '600', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1, marginTop: 4 },
  drummerCard: { padding: 16, borderRadius: 10, borderWidth: 1, marginBottom: 16 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  bodyText: { fontSize: 15, lineHeight: 22 },
  videoContainer: { borderRadius: 12, overflow: 'hidden' },
  playButtonOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center',
  },
  playButtonIcon: { fontSize: 48, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.6)' },
  relatedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  relatedCard: { padding: 12, borderRadius: 8, borderWidth: 1, width: 180 },
});

export default SongDetailPage;
