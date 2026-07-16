// Issue #4771 (round 2 of #3698): single source of truth for "which YouTube
// video is THE video for this page" — resolved once here and consumed by the
// bot-facing SSR shell (api/meta/[...path].js, which drives the crawlable
// <iframe> + VideoObject JSON-LD), the video sitemap (api/sitemap.js), and
// the video-seo coverage audit (scripts/audit-video-seo.mjs). Before this,
// the SSR shell only ever looked at `lick.video` and silently produced a
// VideoObject with NO matching iframe for the 194 lick pages that only have
// a `lick.tutorial` — the exact "route family missed" class of bug #3698 was
// meant to close for good. Centralizing the resolution logic means all three
// surfaces can never drift out of sync with each other again.

// Extract an 11-char YouTube video ID from a watch/short URL. techniques.js
// stores full URLs; the lick data stores youtubeId directly.
export function extractYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function thumbnailUrlFor(youtubeId) {
  return youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : null;
}

export function embedUrlFor(youtubeId) {
  return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;
}

export function watchUrlFor(youtubeId) {
  return youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : null;
}

// A signature-lick page's primary video is `lick.video` when present, else
// `lick.tutorial` — same order the client-rendered SignatureLicks component
// renders them in (primary video section first, tutorial section second), so
// the SSR iframe always matches something the page actually shows. Returns
// null when neither field carries a real YouTube ID.
export function resolveLickVideo(lick) {
  if (!lick) return null;
  const source = lick.video?.youtubeId ? lick.video : (lick.tutorial?.youtubeId ? lick.tutorial : null);
  if (!source) return null;
  const startTime = source.startTime || 0;
  const endTime = source.endTime || null;
  return {
    youtubeId: source.youtubeId,
    title: source.title || lick.name,
    description: source.description || lick.description || '',
    startTime,
    endTime,
    durationSeconds: endTime ? Math.max(1, endTime - startTime) : null,
  };
}

// A technique page's video is the first entry in `technique.videos` that
// resolves to a real YouTube ID — same lookup api/meta/[...path].js already
// used for the (orphaned) singular /technique/<slug> route; reused as-is for
// the live plural /techniques/<slug> route.
export function resolveTechniqueVideo(technique) {
  if (!technique) return null;
  const firstVideo = (technique.videos || []).find(v => extractYouTubeId(v.url));
  if (!firstVideo) return null;
  const youtubeId = extractYouTubeId(firstVideo.url);
  return {
    youtubeId,
    title: firstVideo.title,
    description: `${firstVideo.title} — ${technique.title} demonstrated for metal drummers.`,
    startTime: 0,
    endTime: null,
    durationSeconds: null,
  };
}
