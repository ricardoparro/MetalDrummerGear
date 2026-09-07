// Study link-derivation helpers (issue #7150 — split out of ./index.js).
//
// getDrummerStudyLinks/getGenreStudyLinks are imported directly by App.js, and
// getBrandStudyLinks by the brand-page components (PedalBrandPage.jsx etc.) — all
// of them only need to know whether a drummer/genre/brand appears in a study's top
// ranking, not the full ~200KB of study datasets (mostUsedGearBrands.js/
// drumEndorsementLandscape.js/tempoBySubgenre.js/kitConfigurations.js) that
// ./index.js imports for headlineStat. Reading the small generated
// ./studyMembership.js instead keeps those datasets out of App.js's eager bundle.
// ./index.js re-exports these same functions so Node-side callers (api/meta,
// api/sitemap, api/card, scripts/generate-llms-*.cjs) see an unchanged export
// surface.

import { STUDY_MEMBERSHIP } from './studyMembership.js';

function normalizeBrandName(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Brand display names differ slightly across the per-category brand pages
// (e.g. "Vater Percussion" vs. the studies' canonical "Vater", "Pro-Mark" vs.
// "Promark") — matched by normalized substring rather than exact equality.
function brandNamesMatch(displayName, canonicalName) {
  const a = normalizeBrandName(displayName);
  const b = normalizeBrandName(canonicalName);
  return a.includes(b) || b.includes(a);
}

// Returns up to 2 links: the brand's best rank in the gear-usage study (if any
// category features it) and its rank in the endorsement-reach study (if any).
export function getBrandStudyLinks(displayBrandName) {
  const links = [];

  for (const cat of Object.values(STUDY_MEMBERSHIP.mostUsedGearBrands.categories)) {
    const idx = cat.ranked.findIndex((r) => brandNamesMatch(displayBrandName, r.brand));
    if (idx !== -1) {
      const r = cat.ranked[idx];
      links.push({
        studySlug: 'most-used-gear-brands-metal',
        studyTitle: 'Most-Used Drum & Cymbal Brands in Metal',
        sentence: `${r.brand} ranks #${idx + 1} in ${cat.label.toLowerCase()} usage in our brand-usage study (${r.percent}% of the roster).`,
      });
      break;
    }
  }

  const reachIdx = STUDY_MEMBERSHIP.drumEndorsementLandscape.brandReach.findIndex((b) =>
    brandNamesMatch(displayBrandName, b.brand)
  );
  if (reachIdx !== -1) {
    const b = STUDY_MEMBERSHIP.drumEndorsementLandscape.brandReach[reachIdx];
    links.push({
      studySlug: 'drum-endorsement-landscape',
      studyTitle: 'The Drum Endorsement Landscape in Metal',
      sentence: `${b.brand} ranks #${reachIdx + 1} for overall brand reach in our endorsement-landscape study (${b.percent}% of the roster).`,
    });
  }

  return links;
}

// Drummer pages: every study whose generated data module lists this drummer
// slug in a "counted" array (top-ranked brand per category, or the endorsement
// study's top brand-reach list).
export function getDrummerStudyLinks(drummerSlug) {
  const links = [];

  if (STUDY_MEMBERSHIP.mostUsedGearBrands.topDrummerSlugs.includes(drummerSlug)) {
    links.push({
      studySlug: 'most-used-gear-brands-metal',
      studyTitle: 'Most-Used Drum & Cymbal Brands in Metal',
      sentence: 'Counted in our most-used gear brands study.',
    });
  }

  if (STUDY_MEMBERSHIP.drumEndorsementLandscape.topDrummerSlugs.includes(drummerSlug)) {
    links.push({
      studySlug: 'drum-endorsement-landscape',
      studyTitle: 'The Drum Endorsement Landscape in Metal',
      sentence: 'Counted in our drum endorsement landscape study.',
    });
  }

  return links;
}

// Genre pages: tempo-by-subgenre (genre slugs, e.g. "death-metal") and
// kit-configurations (genre labels, e.g. "Death Metal") key their per-genre
// breakdowns differently — both are matched against a normalized form of the
// genre page's own slug/name.
export function getGenreStudyLinks(genreSlugOrName) {
  const norm = normalizeBrandName(genreSlugOrName);
  const links = [];

  const tempoGenre = STUDY_MEMBERSHIP.tempoBySubgenre.genres.find(
    (g) => normalizeBrandName(g.genre) === norm || normalizeBrandName(g.label) === norm
  );
  if (tempoGenre) {
    links.push({
      studySlug: 'metal-tempo-by-subgenre',
      studyTitle: 'Metal Tempo by Subgenre: How Fast Is Death Metal, Really?',
      sentence: `${tempoGenre.label} averages ${tempoGenre.avgBpm} BPM across ${tempoGenre.songCount} songs in our tempo-by-subgenre study.`,
    });
  }

  const pedalGenre = STUDY_MEMBERSHIP.kitConfigurations.genres.find((g) => normalizeBrandName(g) === norm);
  if (pedalGenre) {
    links.push({
      studySlug: 'metal-kit-configurations',
      studyTitle: 'Metal Drum Kit Configurations: Double Bass vs. Double Pedal',
      sentence: `${pedalGenre} drummers' bass-pedal configurations are broken down in our kit-configurations study.`,
    });
  }

  return links;
}
