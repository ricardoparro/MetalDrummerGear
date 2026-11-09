// Vercel Serverless Function - Auto-Generated Drummer Gear Cards
// Issue #764: Viral Social Sharing Cards with Download & Share
// 
// Usage:
//   /api/card/lars-ulrich?format=instagram  → 1080x1080
//   /api/card/lars-ulrich?format=twitter    → 1200x675
//   /api/card/lars-ulrich?type=stats        → Stats-focused card
//   /api/card/lars-ulrich?type=spotlight    → Signature gear spotlight

import { ImageResponse } from '@vercel/og';
import { h } from '../_lib/og-h.js';
import { STUDIES } from '../../packages/frontend/data/studies/index.js';
import { drummers as canonicalDrummers } from '../drummers/index.js';

export const config = {
  runtime: 'edge',
};

// Drummer data (embedded for edge runtime - synced with main database)
// Issue: this function used to embed its own copy of 21 drummers (with
// invented "total pieces" / "setup value" figures), so the other 51 profile
// pages' og:image 404'd and the 21 that rendered showed unsourced numbers.
// It now reads the one canonical drummer module (CLAUDE.md rule 1) and only
// prints values that are computed from that data.
// Five rows is what the landscape (1200x675) layout fits above the footer.
const GEAR_CATEGORIES = ['drums', 'snare', 'cymbals', 'hardware', 'sticks'];

function drummerSlug(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function clip(text, max = 72) {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

function toCardDrummer(d) {
  const gear = {};
  for (const key of GEAR_CATEGORIES) {
    const value = d.gear && d.gear[key];
    if (typeof value === 'string' && value.trim()) gear[key] = clip(value.trim());
  }
  return {
    name: d.name,
    band: d.band,
    genre: d.genre,
    country: d.country,
    gear,
    stats: {
      categories: Object.keys(gear).length,
      sources: Array.isArray(d.gear?.sources) ? d.gear.sources.length : 0,
    },
  };
}

const drummers = Object.fromEntries(
  canonicalDrummers.map(d => [drummerSlug(d.name), toCardDrummer(d)])
);

// MetalForge brand colors
const BRAND = {
  primary: '#FF6B35',      // Metal orange
  secondary: '#4ECDC4',    // Teal accent
  background: '#0a0a0a',   // Near black
  cardBg: '#1a1a1a',       // Dark gray
  text: '#ffffff',         // White
  textMuted: '#888888',    // Gray text
  gradient1: '#1a1a2e',    // Dark blue tint
  gradient2: '#16213e',    // Navy
  success: '#22c55e',      // Green
};

// Get flag emoji for country
function getCountryFlag(country) {
  const flags = {
    'USA': '🇺🇸',
    'Denmark': '🇩🇰',
    'UK': '🇬🇧',
    'Sweden': '🇸🇪',
    'Norway': '🇳🇴',
    'Brazil': '🇧🇷',
    'Poland': '🇵🇱',
    'Greece': '🇬🇷',
    'France': '🇫🇷',
    'Canada': '🇨🇦',
    'Germany': '🇩🇪',
    'Finland': '🇫🇮',
    'Japan': '🇯🇵',
    'Australia': '🇦🇺',
    'Belgium': '🇧🇪',
    'Cuba/USA': '🇨🇺',
  };
  return flags[country] || '🌍';
}

// Get gear emoji
function getGearEmoji(category) {
  const emojis = {
    drums: '🥁',
    snare: '🪘',
    cymbals: '🎵',
    hardware: '⚙️',
    sticks: '🥢',
    electronics: '🎛️',
  };
  return emojis[category] || '🎶';
}

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    
    // Extract slug from path: /api/card/[slug]
    const slug = pathParts[pathParts.length - 1];
    const format = url.searchParams.get('format') || 'instagram';
    const type = url.searchParams.get('type') || 'full';
    const download = url.searchParams.get('download') === 'true';
    
    const drummer = drummers[slug];
    const study = !drummer ? STUDIES.find((s) => s.slug === slug) : null;

    if (!drummer && !study) {
      return new Response(JSON.stringify({
        error: 'Card not found',
        slug,
        available: Object.keys(drummers),
        availableStudies: STUDIES.map((s) => s.slug),
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Dimensions based on format
    const dimensions = format === 'twitter'
      ? { width: 1200, height: 675 }
      : { width: 1080, height: 1080 };

    // Generate the appropriate card type
    let imageResponse;
    if (study) {
      // Studies get one card style — the headline stat is the whole point of
      // sharing a study, so there's no full/stats/spotlight split here.
      imageResponse = generateStudyCard(study, dimensions);
    } else if (type === 'stats') {
      imageResponse = generateStatsCard(drummer, dimensions);
    } else if (type === 'spotlight') {
      imageResponse = generateSpotlightCard(drummer, dimensions);
    } else {
      imageResponse = generateFullCard(drummer, dimensions);
    }

    // Add caching and download headers
    const response = await imageResponse;
    const headers = new Headers(response.headers);

    // Cache for 1 hour on CDN, allow stale for 24 hours while revalidating
    headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

    // Add Content-Disposition for downloads
    if (download) {
      const filenameBase = study ? study.slug : drummer.name.toLowerCase().replace(/\s+/g, '-');
      const filename = `${filenameBase}-${study ? 'study' : 'gear'}-card-${format}.png`;
      headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    }

    // Add meta headers for tracking
    headers.set(study ? 'X-Study-Slug' : 'X-Drummer-Slug', slug);
    headers.set('X-Card-Format', format);
    headers.set('X-Card-Type', study ? 'study' : type);

    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch (e) {
    console.error('Card generation error:', e);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate card', 
      message: e.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Full Setup Card - Complete gear list with stats
function generateFullCard(drummer, dimensions) {
  const { width, height } = dimensions;
  const isSquare = width === height;
  
  return new ImageResponse(
    (
      h('div', {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: BRAND.background,
          backgroundImage: `linear-gradient(135deg, ${BRAND.gradient1} 0%, ${BRAND.background} 50%, #1a0a0a 100%)`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: 'relative',
        },}

        /* Background pattern overlay */
        , h('div', {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)`,
            display: 'flex',
          },}
        )

        /* Header with drummer info */
        , h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isSquare ? '40px 50px' : '30px 50px',
            borderBottom: `2px solid ${BRAND.primary}40`,
          },}

          , h('div', { style: { display: 'flex', flexDirection: 'column' },}
            , h('span', {
              style: {
                fontSize: isSquare ? 56 : 48,
                fontWeight: 'bold',
                color: BRAND.text,
                textShadow: `0 2px 10px ${BRAND.primary}40`,
                letterSpacing: '-0.5px',
              },}

              , drummer.name
            )
            , h('span', {
              style: {
                fontSize: isSquare ? 28 : 24,
                color: BRAND.primary,
                fontWeight: '600',
              },}

              , drummer.band, " • "  , drummer.genre
            )
          )
          , h('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            },}

            , h('span', { style: { fontSize: 52 },}, getCountryFlag(drummer.country))
            , h('span', { style: { fontSize: 16, color: BRAND.textMuted, marginTop: 4 },}
              , drummer.country
            )
          )
        )

        /* Gear Grid */
        , h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            padding: isSquare ? '40px 50px' : '25px 50px',
            flex: 1,
            gap: isSquare ? 20 : 14,
          },}

          , Object.entries(drummer.gear).map(([category, item]) => (
            h('div', {
              key: category,
              style: {
                display: 'flex',
                alignItems: 'center',
                padding: isSquare ? '18px 24px' : '14px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                borderLeft: `4px solid ${BRAND.primary}`,
              },}

              , h('span', {
                style: {
                  fontSize: isSquare ? 32 : 28,
                  marginRight: isSquare ? 20 : 16,
                },}

                , getGearEmoji(category)
              )
              , h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1 },}
                , h('span', {
                  style: {
                    fontSize: isSquare ? 14 : 12,
                    color: BRAND.textMuted,
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    fontWeight: '600',
                  },}

                  , category
                )
                , h('span', {
                  style: {
                    fontSize: isSquare ? 22 : 18,
                    color: BRAND.text,
                    fontWeight: '500',
                  },}

                  , item
                )
              )
            )
          ))
        )

        /* Stats Footer */
        , h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isSquare ? '30px 50px' : '20px 50px',
            backgroundColor: `${BRAND.primary}15`,
            borderTop: `2px solid ${BRAND.primary}40`,
          },}

          , h('div', { style: { display: 'flex', gap: 40 },}
            , h('div', { style: { display: 'flex', flexDirection: 'column' },}
              , h('span', { style: { fontSize: 14, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 1 },}, "Gear categories"

              )
              , h('span', { style: { fontSize: 36, color: BRAND.primary, fontWeight: 'bold' },}
                , drummer.stats.categories
              )
            )
            , h('div', { style: { display: 'flex', flexDirection: 'column' },}
              , h('span', { style: { fontSize: 14, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 1 },}, "Cited sources"

              )
              , h('span', { style: { fontSize: 36, color: BRAND.secondary, fontWeight: 'bold' },}
                , drummer.stats.sources
              )
            )
          )
          , h('div', { style: { display: 'flex', alignItems: 'center' },}
            , h('span', { style: { fontSize: 28, fontWeight: 'bold', color: BRAND.primary },}, "🔥 MetalForge.io"

            )
          )
        )
      )
    ),
    dimensions
  );
}

// Stats Card - Focused on key statistics
function generateStatsCard(drummer, dimensions) {
  const { width, height } = dimensions;
  const isSquare = width === height;
  
  return new ImageResponse(
    (
      h('div', {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BRAND.background,
          backgroundImage: `linear-gradient(135deg, ${BRAND.gradient1} 0%, ${BRAND.background} 50%, ${BRAND.gradient2} 100%)`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },}

        /* Decorative circles */
        , h('div', {
          style: {
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `${BRAND.primary}10`,
            display: 'flex',
          },}
        )
        , h('div', {
          style: {
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `${BRAND.secondary}10`,
            display: 'flex',
          },}
        )

        /* Country Flag */
        , h('span', { style: { fontSize: isSquare ? 80 : 56, marginBottom: isSquare ? 20 : 8 },}
          , getCountryFlag(drummer.country)
        )

        /* Drummer Name */
        , h('span', {
          style: {
            fontSize: isSquare ? 72 : 64,
            fontWeight: 'bold',
            color: BRAND.text,
            textAlign: 'center',
            marginBottom: 10,
            letterSpacing: '-1px',
          },}

          , drummer.name
        )

        /* Band & Genre */
        , h('span', {
          style: {
            fontSize: isSquare ? 32 : 28,
            color: BRAND.primary,
            marginBottom: isSquare ? 50 : 26,
            fontWeight: '600',
          },}

          , drummer.band
        )

        /* Stats Grid */
        , h('div', {
          style: {
            display: 'flex',
            gap: 60,
          },}

          , h('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '36px 48px',
              backgroundColor: `${BRAND.primary}15`,
              borderRadius: 24,
              border: `3px solid ${BRAND.primary}`,
            },}

            , h('span', { style: { fontSize: 72, fontWeight: 'bold', color: BRAND.primary },}
              , drummer.stats.categories
            )
            , h('span', { style: { fontSize: 22, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 2 },}, "Gear categories"

            )
          )

          , h('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '36px 48px',
              backgroundColor: `${BRAND.secondary}15`,
              borderRadius: 24,
              border: `3px solid ${BRAND.secondary}`,
            },}

            , h('span', { style: { fontSize: 72, fontWeight: 'bold', color: BRAND.secondary },}
              , drummer.stats.sources
            )
            , h('span', { style: { fontSize: 22, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 2 },}, "Cited sources"

            )
          )
        )

        /* Genre Badge */
        , h('div', {
          style: {
            display: 'flex',
            marginTop: isSquare ? 50 : 22,
            padding: '12px 28px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 50,
          },}

          , h('span', { style: { fontSize: 20, color: BRAND.textMuted },}, "🎸 "
             , drummer.genre
          )
        )

        /* MetalForge branding */
        , h('div', {
          style: {
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            alignItems: 'center',
          },}

          , h('span', { style: { fontSize: 28, fontWeight: 'bold', color: BRAND.primary },}, "🔥 MetalForge.io"

          )
        )
      )
    ),
    dimensions
  );
}

// Spotlight Card - Focus on signature gear
function generateSpotlightCard(drummer, dimensions) {
  const { width, height } = dimensions;
  const isSquare = width === height;
  
  return new ImageResponse(
    (
      h('div', {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BRAND.background,
          backgroundImage: `radial-gradient(ellipse at center, ${BRAND.gradient1} 0%, ${BRAND.background} 70%)`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },}

        /* Decorative ring */
        , h('div', {
          style: {
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: `2px solid ${BRAND.primary}20`,
            display: 'flex',
          },}
        )
        , h('div', {
          style: {
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: `1px solid ${BRAND.primary}10`,
            display: 'flex',
          },}
        )

        /* Big drum emoji */
        , h('span', { style: { fontSize: 120, marginBottom: 30 },}, "🥁")

        /* Drummer Name */
        , h('span', {
          style: {
            fontSize: isSquare ? 56 : 48,
            fontWeight: 'bold',
            color: BRAND.text,
            marginBottom: 10,
            letterSpacing: '-0.5px',
          },}

          , drummer.name
        )

        /* Band */
        , h('span', {
          style: {
            fontSize: isSquare ? 28 : 24,
            color: BRAND.primary,
            marginBottom: 50,
            fontWeight: '600',
          },}

          , drummer.band
        )

        /* Primary Gear Spotlight */
        , h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '44px 64px',
            backgroundColor: `${BRAND.primary}15`,
            borderRadius: 28,
            border: `3px solid ${BRAND.primary}`,
            maxWidth: isSquare ? 800 : 950,
          },}

          , h('span', {
            style: {
              fontSize: 14,
              color: BRAND.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 3,
              marginBottom: 16,
              fontWeight: '600',
            },}
, "⭐ Signature Setup ⭐"

          )
          , h('span', {
            style: {
              fontSize: isSquare ? 38 : 34,
              fontWeight: 'bold',
              color: BRAND.text,
              textAlign: 'center',
              marginBottom: 20,
              lineHeight: 1.2,
            },}

            , drummer.gear.drums || drummer.band
          )
          , drummer.gear.snare && h('div', { style: { display: 'flex', alignItems: 'center', gap: 12 },}
            , h('span', { style: { fontSize: 28, color: BRAND.secondary },}, "+")
            , h('span', {
              style: {
                fontSize: isSquare ? 24 : 22,
                color: BRAND.secondary,
                textAlign: 'center',
              },}

              , drummer.gear.snare
            )
          )
        )

        /* Total cost badge */
        , h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            marginTop: 44,
            padding: '16px 36px',
            backgroundColor: `${BRAND.secondary}20`,
            borderRadius: 50,
            border: `2px solid ${BRAND.secondary}40`,
          },}

          , h('span', { style: { fontSize: 28, color: BRAND.secondary, fontWeight: 'bold' },}, "🥁 "
             , drummer.stats.categories, " gear categories documented"
          )
        )

        /* MetalForge branding */
        , h('div', {
          style: {
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            alignItems: 'center',
          },}

          , h('span', { style: { fontSize: 28, fontWeight: 'bold', color: BRAND.primary },}, "🔥 MetalForge.io"

          )
        )
      )
    ),
    dimensions
  );
}

// Study Card — headline stat from a /studies page, for Reddit/X/Discord shares.
// The stat (value/label/sentence) comes from packages/frontend/data/studies/index.js,
// which computes it from the studies stats engine (scripts/compute-studies.cjs) —
// never hand-typed here.
function generateStudyCard(study, dimensions) {
  const { width, height } = dimensions;
  const isSquare = width === height;
  const { headlineStat } = study;

  return new ImageResponse(
    (
      h('div', {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BRAND.background,
          backgroundImage: `linear-gradient(135deg, ${BRAND.gradient1} 0%, ${BRAND.background} 50%, ${BRAND.gradient2} 100%)`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },}

        /* Decorative circles */
        , h('div', {
          style: {
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `${BRAND.primary}10`,
            display: 'flex',
          },}
        )
        , h('div', {
          style: {
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `${BRAND.secondary}10`,
            display: 'flex',
          },}
        )

        /* Eyebrow */
        , h('div', {
          style: {
            display: 'flex',
            marginBottom: 24,
            padding: '10px 24px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 50,
          },}

          , h('span', { style: { fontSize: 20, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 2 },}, "📊 MetalForge Study"

          )
        )

        /* Headline stat — the whole point of the share */
        , h('span', {
          style: {
            fontSize: isSquare ? 140 : 120,
            fontWeight: 'bold',
            color: BRAND.primary,
            textAlign: 'center',
            lineHeight: 1,
            marginBottom: 20,
            letterSpacing: '-2px',
          },}

          , headlineStat.value
        )

        /* Stat label */
        , h('span', {
          style: {
            fontSize: isSquare ? 34 : 30,
            color: BRAND.text,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 40,
            maxWidth: isSquare ? 820 : 980,
          },}

          , headlineStat.label
        )

        /* Study title badge */
        , h('div', {
          style: {
            display: 'flex',
            padding: '16px 36px',
            backgroundColor: `${BRAND.secondary}15`,
            borderRadius: 24,
            border: `2px solid ${BRAND.secondary}40`,
            maxWidth: isSquare ? 780 : 940,
          },}

          , h('span', { style: { fontSize: isSquare ? 22 : 20, color: BRAND.secondary, textAlign: 'center', fontWeight: '600' },}
            , study.title
          )
        )

        /* Dataset size */
        , h('span', { style: { fontSize: 18, color: BRAND.textMuted, marginTop: 20 },}, "Across "
           , study.datasetSize, " " , study.datasetUnit, " — MetalForge.io/studies"
        )

        /* MetalForge branding */
        , h('div', {
          style: {
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            alignItems: 'center',
          },}

          , h('span', { style: { fontSize: 28, fontWeight: 'bold', color: BRAND.primary },}, "🔥 MetalForge.io"

          )
        )
      )
    ),
    dimensions
  );
}
