/**
 * Dynamic OG Image Generator for Guides
 * Issue #714: Branded social share images for gear guides
 * 
 * Generates dynamic Open Graph images with:
 * - Guide title and budget
 * - MetalForge branding
 * - Call-to-action text
 * 
 * Usage: /api/og/guide?type=beginner
 */

import { ImageResponse } from '@vercel/og';
import { h } from '../_lib/og-h.js';

export const config = {
  runtime: 'edge',
};

// MetalForge brand colors
const BRAND_COLORS = {
  primary: '#dc2626',      // Red
  background: '#0f0f0f',   // Dark background
  cardBg: '#1a1a1a',       // Card background
  text: '#ffffff',         // White text
  secondaryText: '#a1a1aa', // Gray text
  accent: '#f59e0b',       // Gold accent
  success: '#22c55e',      // Green
};

// Guide configurations
const GUIDES = {
  'beginner': {
    title: 'Ultimate Beginner Metal Drummer',
    subtitle: 'Gear Guide Under $1,000',
    emoji: '🥁',
    badge: 'BEGINNER GUIDE',
    features: ['Complete Kit Recommendations', 'Budget Breakdown', 'Pro Tips'],
  },
};

const GEAR_LABELS = {
  'bass-drum': 'Bass Drums', 'china-cymbals': 'China Cymbals', 'crash': 'Crash Cymbals',
  'cymbals': 'Cymbals', 'drumheads': 'Drum Heads', 'electronic-kit': 'Electronic Kits',
  'hardware': 'Drum Hardware', 'hearing-protection': 'Hearing Protection',
  'iem': 'In-Ear Monitors', 'kits': 'Drum Kits', 'metronomes': 'Metronomes',
  'modules': 'Drum Modules', 'pedals': 'Drum Pedals', 'practice-pads': 'Practice Pads',
  'ride': 'Ride Cymbals', 'shields': 'Drum Shields', 'snare': 'Snare Drums',
  'snare-drums': 'Snare Drums', 'snares': 'Snare Drums', 'splash': 'Splash Cymbals',
  'sticks': 'Drumsticks', 'thrones': 'Drum Thrones', 'triggers': 'Drum Triggers',
};

function titleCase(slug) {
  return String(slug || '').replace(/[^a-z0-9-]/gi, '').split('-').filter(Boolean)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function genreGearGuide(gear, genre) {
  const gearLabel = GEAR_LABELS[gear] || titleCase(gear) || 'Drum Gear';
  const genreLabel = titleCase(genre) || 'Metal';
  return {
    title: `Best ${gearLabel}`,
    subtitle: `for ${genreLabel}`,
    emoji: '🥁',
    badge: 'GEAR GUIDE',
    features: ['Top Picks Compared', 'What the Pros Play', 'FAQ'],
  };
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const guideType = searchParams.get('type') || 'beginner';
    
    // The 278 genre gear guides all point here with
    // ?type=genre-gear&gear=<slug>&genre=<slug>; without this branch every one
    // of them rendered the beginner-guide card.
    const guide = guideType === 'genre-gear'
      ? genreGearGuide(searchParams.get('gear'), searchParams.get('genre'))
      : (GUIDES[guideType] || GUIDES.beginner);

    return new ImageResponse(
      (
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: BRAND_COLORS.background,
            padding: '48px',
          },}

          /* Background gradient */
          , h('div', {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${BRAND_COLORS.background} 0%, #1f1f1f 50%, ${BRAND_COLORS.background} 100%)`,
            },}
          )

          /* Content container */
          , h('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              maxWidth: '1000px',
            },}

            /* Badge */
            , h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                backgroundColor: BRAND_COLORS.primary,
                paddingLeft: '24px',
                paddingRight: '24px',
                paddingTop: '12px',
                paddingBottom: '12px',
                borderRadius: '9999px',
                marginBottom: '32px',
              },}

              , h('span', { style: { color: BRAND_COLORS.text, fontSize: '24px', fontWeight: 700, letterSpacing: '2px' },}
                , guide.badge
              )
            )

            /* Emoji */
            , h('div', { style: { fontSize: '80px', marginBottom: '24px' },}
              , guide.emoji
            )

            /* Title */
            , h('div', {
              style: {
                fontSize: '56px',
                fontWeight: 800,
                color: BRAND_COLORS.text,
                textAlign: 'center',
                marginBottom: '16px',
                lineHeight: 1.1,
              },}

              , guide.title
            )

            /* Subtitle */
            , h('div', {
              style: {
                fontSize: '42px',
                fontWeight: 700,
                color: BRAND_COLORS.primary,
                textAlign: 'center',
                marginBottom: '40px',
              },}

              , guide.subtitle
            )

            /* Features */
            , h('div', {
              style: {
                display: 'flex',
                gap: '24px',
                marginBottom: '48px',
              },}

              , guide.features.map((feature, index) => (
                h('div', {
                  key: index,
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: BRAND_COLORS.cardBg,
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: `1px solid ${BRAND_COLORS.primary}40`,
                  },}

                  , h('span', { style: { color: BRAND_COLORS.success, fontSize: '20px' },}, "✓")
                  , h('span', { style: { color: BRAND_COLORS.secondaryText, fontSize: '18px' },}, feature)
                )
              ))
            )

            /* Logo */
            , h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              },}

              , h('span', { style: { fontSize: '28px', fontWeight: 700, color: BRAND_COLORS.text },}, "MetalForge"

              )
              , h('span', { style: { fontSize: '24px', color: BRAND_COLORS.secondaryText },}, ".io"

              )
            )
          )
        )
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG image generation error:', error);
    // Return a fallback response
    return new Response('Error generating image', { status: 500 });
  }
}
