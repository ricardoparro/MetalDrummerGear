/**
 * Dynamic OG Image Generator for Drummer Profiles
 * Issue #769: Add Rich Social Meta Tags to All Pages
 * 
 * Generates dynamic Open Graph images with:
 * - Drummer photo with MetalForge branding
 * - Band name and genre
 * - Key gear highlights
 * 
 * Usage: /api/og/drummer?slug=<drummer-slug>
 * Example: /api/og/drummer?slug=joey-jordison
 */

import { ImageResponse } from '@vercel/og';
import { h } from '../_lib/og-h.js';
import { drummers as canonicalDrummers } from '../drummers/index.js';

export const config = {
  runtime: 'edge',
};

// MetalForge brand colors
const COLORS = {
  primary: '#dc2626',
  background: '#0a0a0a',
  cardBg: '#141414',
  text: '#ffffff',
  secondary: '#a1a1aa',
  accent: '#f59e0b',
};

// Drummer lookup comes from the one canonical drummer module (CLAUDE.md
// rule 1) instead of the 27-name copy that used to live here.
const FLAGS = {
  USA: '🇺🇸', Denmark: '🇩🇰', UK: '🇬🇧', Sweden: '🇸🇪', Norway: '🇳🇴', Brazil: '🇧🇷',
  Poland: '🇵🇱', Greece: '🇬🇷', France: '🇫🇷', Canada: '🇨🇦', Germany: '🇩🇪',
  Finland: '🇫🇮', Belgium: '🇧🇪', 'Cuba/USA': '🇨🇺',
};

function drummerSlug(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

const DRUMMERS = Object.fromEntries(canonicalDrummers.map(d => [drummerSlug(d.name), {
  name: d.name,
  band: d.band,
  genre: d.genre,
  country: FLAGS[d.country] || '🤘',
}]));

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug') || 'joey-jordison';
    
    // Get drummer info
    const drummer = DRUMMERS[slug];
    if (!drummer) {
      // Never render a card for a drummer we do not cover.
      return new Response('Unknown drummer', { status: 404 });
    }

    // Text-only card: satori/resvg cannot decode the WebP profile photos, and
    // a remote image fetch per render is not worth it for a fallback card.
    const imageUrl = null;

    return new ImageResponse(
      (
        h('div', {
          style: {
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.background,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          },}

          /* Left side - Drummer photo */
          , imageUrl && h('div', {
            style: {
              display: 'flex',
              width: '45%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            },}

            , h('img', {
              src: imageUrl,
              alt: drummer.name,
              // Explicit intrinsic size: satori cannot probe WebP dimensions
              // ("Image size cannot be determined") and would 500 without it.
              width: 540,
              height: 630,
              style: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              },}
            )
            /* Gradient overlay */
            , h('div', {
              style: {
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                background: `linear-gradient(to left, ${COLORS.background}, transparent)`,
              },}
            )
          )

          /* Right side - Info */
          , h('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: imageUrl ? '55%' : '100%',
              padding: '40px 60px 40px 20px',
            },}

            /* MetalForge Logo */
            , h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              },}

              , h('span', { style: { fontSize: '36px', marginRight: '12px' },}, "🥁")
              , h('span', {
                style: {
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: COLORS.text,
                  letterSpacing: '-0.5px',
                },}
, "MetalForge"

              )
            )

            /* Drummer Name */
            , h('h1', {
              style: {
                fontSize: '56px',
                fontWeight: 'bold',
                color: COLORS.text,
                margin: '0 0 12px 0',
                lineHeight: 1.1,
              },}

              , drummer.name
            )

            /* Band */
            , h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                fontSize: '32px',
                color: COLORS.accent,
                marginBottom: '20px',
              },}

              , drummer.band
            )

            /* Genre & Country */
            , h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '30px',
              },}

              , h('span', {
                style: {
                  fontSize: '20px',
                  color: COLORS.secondary,
                  backgroundColor: COLORS.cardBg,
                  padding: '8px 16px',
                  borderRadius: '8px',
                },}

                , drummer.genre
              )
              , h('span', { style: { fontSize: '28px' },}, drummer.country)
            )

            /* CTA */
            , h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                color: COLORS.secondary,
                marginTop: 'auto',
              },}

              , h('span', {
                style: {
                  backgroundColor: COLORS.primary,
                  color: COLORS.text,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                },}
, "View Complete Gear Setup →"

              )
            )
          )
        )
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e) {
    console.error('OG Image generation error:', e);
    return new Response('Error generating image', { status: 500 });
  }
}
