/**
 * Signature Licks Database - Issue #749
 * Drummer signature drum fills, beats, and patterns with video examples
 * 
 * Phase 1: 5 drummers × 3 licks = 15 total
 * - Joey Jordison (Slipknot)
 * - Lars Ulrich (Metallica)
 * - Dave Lombardo (Slayer)
 * - George Kollias (Nile)
 * - Mario Duplantier (Gojira)
 */

// ==========================================
// SIGNATURE LICKS DATABASE
// ==========================================


// ==========================================
// SIGNATURE LICKS DATABASE
// ==========================================
// Issue #1056: the lick data now lives in per-drummer modules under ./licks/.
// Adding a drummer is a new-file op (./licks/<slug>.js + one line in ./licks/index.js),
// not an append to this file — eliminating the merge-conflict serialization that
// stalled the lick-batch queue. The composed export shape is unchanged, so every
// consumer (and the helpers below) keeps working as-is.
import { SIGNATURE_LICKS } from './licks/index.js';

export { SIGNATURE_LICKS };


// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get lick by slug
 */
export function getLickBySlug(slug) {
  return SIGNATURE_LICKS[slug] || null;
}

/**
 * Get all licks for a drummer
 */
export function getLicksByDrummerSlug(drummerSlug) {
  return Object.values(SIGNATURE_LICKS).filter(
    lick => lick.drummerSlug === drummerSlug
  );
}

/**
 * Get all licks
 */
export function getAllLicks() {
  return Object.values(SIGNATURE_LICKS);
}

/**
 * Filter licks by criteria
 */
export function filterLicks({ difficulty, style, bpmMin, bpmMax, technique } = {}) {
  let results = Object.values(SIGNATURE_LICKS);
  
  if (difficulty) {
    results = results.filter(l => l.difficulty === difficulty);
  }
  
  if (style) {
    results = results.filter(l => l.style === style);
  }
  
  if (bpmMin) {
    results = results.filter(l => l.bpm >= bpmMin);
  }
  
  if (bpmMax) {
    results = results.filter(l => l.bpm <= bpmMax);
  }
  
  if (technique) {
    results = results.filter(l => l.techniques.includes(technique));
  }
  
  return results;
}

/**
 * Get unique styles from all licks
 */
export function getAvailableStyles() {
  const styles = new Set(Object.values(SIGNATURE_LICKS).map(l => l.style));
  return Array.from(styles).sort();
}

/**
 * Get unique techniques from all licks
 */
export function getAvailableTechniques() {
  const techniques = new Set();
  Object.values(SIGNATURE_LICKS).forEach(l => {
    l.techniques.forEach(t => techniques.add(t));
  });
  return Array.from(techniques).sort();
}

/**
 * Get unique difficulties
 */
export function getAvailableDifficulties() {
  return ['beginner', 'intermediate', 'advanced', 'expert'];
}

/**
 * Get BPM ranges for filtering
 */
export function getBpmRanges() {
  return [
    { label: 'Slow (< 120)', min: 0, max: 119 },
    { label: 'Medium (120-180)', min: 120, max: 180 },
    { label: 'Fast (180-220)', min: 180, max: 220 },
    { label: 'Extreme (220+)', min: 220, max: 999 },
  ];
}

/**
 * Generate Schema.org VideoObject + HowTo markup for a lick
 */
/**
 * Resolve a representative YouTube ID for a lick's thumbnail/imagery.
 * Falls back to the tutorial video when a lick has no primary video,
 * and returns null when neither exists (caller renders a placeholder).
 */
export function getLickThumbId(lick) {
  return lick?.video?.youtubeId || lick?.tutorial?.youtubeId || null;
}

export function generateLickSchema(lick) {
  const url = `https://metalforge.io/drummers/${lick.drummerSlug}/licks/${lick.slug}`;
  
  const thumbId = getLickThumbId(lick);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // VideoObject for the main video (only when a primary video exists)
      ...(lick.video ? [{
        "@type": "VideoObject",
        "name": lick.video.title,
        "description": lick.video.description,
        "thumbnailUrl": `https://i.ytimg.com/vi/${lick.video.youtubeId}/hqdefault.jpg`,
        "uploadDate": "2024-01-01", // Approximation
        "contentUrl": `https://www.youtube.com/watch?v=${lick.video.youtubeId}`,
        "embedUrl": `https://www.youtube.com/embed/${lick.video.youtubeId}`,
        "duration": lick.video.endTime ? `PT${lick.video.endTime - (lick.video.startTime || 0)}S` : undefined,
      }] : []),
      // HowTo for learning the lick
      {
        "@type": "HowTo",
        "name": `How to Play ${lick.name}`,
        "description": lick.description,
        ...(thumbId ? { "image": `https://i.ytimg.com/vi/${thumbId}/hqdefault.jpg` } : {}),
        "totalTime": "PT30M",
        "tool": lick.gearUsed.map(g => ({
          "@type": "HowToTool",
          "name": g.name,
        })),
        // HowTo steps describe how to play the lick — source them from the
        // technique breakdown (techniqueDetails) per #1010, falling back to
        // learningTips for older entries that predate techniqueDetails.
        "step": ((lick.techniqueDetails && lick.techniqueDetails.length)
          ? lick.techniqueDetails
          : (lick.learningTips || [])
        ).map((text, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": `Step ${index + 1}`,
          "text": text,
        })),
        "supply": lick.techniques.map(t => ({
          "@type": "HowToSupply",
          "name": t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        })),
      },
      // MusicRecording
      {
        "@type": "MusicRecording",
        "name": lick.song,
        "byArtist": {
          "@type": "MusicGroup",
          "name": lick.band,
        },
        "inAlbum": {
          "@type": "MusicAlbum",
          "name": lick.album.split(' (')[0],
        },
      },
      // Breadcrumb
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://metalforge.io" },
          { "@type": "ListItem", "position": 2, "name": lick.drummerName, "item": `https://metalforge.io/drummer/${lick.drummerSlug}` },
          { "@type": "ListItem", "position": 3, "name": "Signature Licks", "item": `https://metalforge.io/drummers/${lick.drummerSlug}/licks` },
          { "@type": "ListItem", "position": 4, "name": lick.name, "item": url },
        ],
      },
    ],
  };
  
  // Add tutorial video if available
  if (lick.tutorial) {
    schema["@graph"].push({
      "@type": "VideoObject",
      "name": lick.tutorial.title,
      "description": lick.tutorial.description,
      "thumbnailUrl": `https://i.ytimg.com/vi/${lick.tutorial.youtubeId}/hqdefault.jpg`,
      "uploadDate": "2024-01-01", // Approximation — required by Google; matches the main video block
      "contentUrl": `https://www.youtube.com/watch?v=${lick.tutorial.youtubeId}`,
      "embedUrl": `https://www.youtube.com/embed/${lick.tutorial.youtubeId}`,
    });
  }
  
  return schema;
}

/**
 * Generate Schema.org for the licks hub page
 */
export function generateLicksHubSchema(drummerName, drummerSlug, licks) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${drummerName} Signature Licks`,
    "description": `Learn ${drummerName}'s most iconic drum fills, patterns, and techniques with video tutorials.`,
    "url": `https://metalforge.io/drummers/${drummerSlug}/licks`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": licks.map((lick, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": lick.name,
        "url": `https://metalforge.io/drummers/${drummerSlug}/licks/${lick.slug}`,
      })),
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://metalforge.io" },
        { "@type": "ListItem", "position": 2, "name": drummerName, "item": `https://metalforge.io/drummer/${drummerSlug}` },
        { "@type": "ListItem", "position": 3, "name": "Signature Licks", "item": `https://metalforge.io/drummers/${drummerSlug}/licks` },
      ],
    },
  };
}

/**
 * Generate Schema.org markup for the top-level /licks index hub (Issue #1042).
 * CollectionPage wrapping an ItemList of every signature lick, plus a
 * Home › Licks BreadcrumbList. Each ListItem points at the live per-lick route.
 */
export function generateLicksIndexSchema(licks) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Signature Metal Drum Licks",
    "description": "Browse iconic metal drum licks, fills, and beats from the world's best drummers — with tempo, technique breakdown, and video for each.",
    "url": "https://metalforge.io/licks",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": licks.length,
      "itemListElement": licks.map((lick, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": `${lick.name} — ${lick.drummerName}`,
        "url": `https://metalforge.io/drummers/${lick.drummerSlug}/licks/${lick.slug}`,
      })),
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://metalforge.io" },
        { "@type": "ListItem", "position": 2, "name": "Licks", "item": "https://metalforge.io/licks" },
      ],
    },
  };
}

// Drummer slug to ID mapping (for integration)
export const DRUMMER_SLUG_MAP = {
  'joey-jordison': 2,
  'lars-ulrich': 1,
  'dave-lombardo': 4,
  'george-kollias': 6,
  'mario-duplantier': 21,
};

// ==========================================
// DISCOVERY FEATURES (Issue #759)
// ==========================================

/**
 * Get a random lick for discovery gamification
 * Optionally filter by drummer or difficulty
 */
export function getRandomLick({ drummerSlug, difficulty } = {}) {
  let licks = Object.values(SIGNATURE_LICKS);
  
  if (drummerSlug) {
    licks = licks.filter(l => l.drummerSlug === drummerSlug);
  }
  
  if (difficulty) {
    licks = licks.filter(l => l.difficulty === difficulty);
  }
  
  if (licks.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * licks.length);
  return licks[randomIndex];
}

/**
 * Get the Lick of the Day - deterministic based on current date
 * Returns the same lick for everyone on the same day
 */
export function getLickOfTheDay(date = new Date()) {
  const licks = Object.values(SIGNATURE_LICKS);
  if (licks.length === 0) return null;
  
  // Create a deterministic "seed" from the date
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  // Simple hash: combine date parts into a single number
  const seed = year * 10000 + month * 100 + day;
  
  // Use the seed to select a lick (modulo ensures we stay in bounds)
  const index = seed % licks.length;
  
  return licks[index];
}

/**
 * Get the date string for Lick of the Day display
 */
export function getLickOfTheDayDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get a playlist of all licks from a drummer for binge-watching
 * Returns licks in a logical order (by song, difficulty, etc.)
 */
export function getPlaylist(drummerSlug) {
  const licks = getLicksByDrummerSlug(drummerSlug);
  
  if (licks.length === 0) return null;
  
  // Sort by difficulty (easiest first) for a learning progression
  const sorted = [...licks].sort((a, b) => a.difficultyRating - b.difficultyRating);
  
  // Calculate total duration (estimate 2 min per lick for learning)
  const totalDuration = sorted.length * 2; // minutes
  
  return {
    drummerName: sorted[0].drummerName,
    drummerSlug: drummerSlug,
    band: sorted[0].band,
    licks: sorted,
    count: sorted.length,
    estimatedDuration: totalDuration,
    estimatedDurationDisplay: totalDuration < 60 
      ? `${totalDuration} min` 
      : `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}min`,
  };
}

/**
 * Get all available playlists (one per drummer)
 */
export function getAllPlaylists() {
  const drummers = new Set(Object.values(SIGNATURE_LICKS).map(l => l.drummerSlug));
  return Array.from(drummers).map(slug => getPlaylist(slug)).filter(Boolean);
}

/**
 * Get next lick in sequence (for playlist navigation)
 */
export function getNextLickInPlaylist(currentSlug, drummerSlug) {
  const playlist = getPlaylist(drummerSlug);
  if (!playlist) return null;
  
  const currentIndex = playlist.licks.findIndex(l => l.slug === currentSlug);
  if (currentIndex === -1 || currentIndex >= playlist.licks.length - 1) {
    return playlist.licks[0]; // Loop back to start
  }
  
  return playlist.licks[currentIndex + 1];
}

/**
 * Get previous lick in sequence (for playlist navigation)
 */
export function getPreviousLickInPlaylist(currentSlug, drummerSlug) {
  const playlist = getPlaylist(drummerSlug);
  if (!playlist) return null;
  
  const currentIndex = playlist.licks.findIndex(l => l.slug === currentSlug);
  if (currentIndex <= 0) {
    return playlist.licks[playlist.licks.length - 1]; // Loop to end
  }
  
  return playlist.licks[currentIndex - 1];
}

/**
 * Generate Schema.org markup for Lick of the Day widget
 */
export function generateLickOfTheDaySchema(lick, date) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "name": "Lick of the Day",
    "description": `Today's featured drum lick: ${lick.name} by ${lick.drummerName}`,
    "datePublished": date.toISOString().split('T')[0],
    "mainEntity": {
      "@type": "HowTo",
      "name": `Learn ${lick.name}`,
      "description": lick.description,
      ...(getLickThumbId(lick) ? { "image": `https://i.ytimg.com/vi/${getLickThumbId(lick)}/hqdefault.jpg` } : {}),
    },
  };
}

// Export for external use
export default SIGNATURE_LICKS;
