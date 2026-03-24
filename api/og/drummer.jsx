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

// Drummer data mapping
const DRUMMERS = {
  'lars-ulrich': { name: 'Lars Ulrich', band: 'Metallica', genre: 'Thrash Metal', country: '🇩🇰' },
  'joey-jordison': { name: 'Joey Jordison', band: 'Slipknot', genre: 'Nu Metal', country: '🇺🇸' },
  'dave-lombardo': { name: 'Dave Lombardo', band: 'Slayer', genre: 'Thrash Metal', country: '🇺🇸' },
  'gene-hoglan': { name: 'Gene Hoglan', band: 'Testament', genre: 'Death/Thrash', country: '🇺🇸' },
  'mike-portnoy': { name: 'Mike Portnoy', band: 'Dream Theater', genre: 'Progressive', country: '🇺🇸' },
  'vinnie-paul': { name: 'Vinnie Paul', band: 'Pantera', genre: 'Groove Metal', country: '🇺🇸' },
  'charlie-benante': { name: 'Charlie Benante', band: 'Anthrax', genre: 'Thrash Metal', country: '🇺🇸' },
  'nicko-mcbrain': { name: 'Nicko McBrain', band: 'Iron Maiden', genre: 'Heavy Metal', country: '🇬🇧' },
  'bill-ward': { name: 'Bill Ward', band: 'Black Sabbath', genre: 'Heavy Metal', country: '🇬🇧' },
  'chris-adler': { name: 'Chris Adler', band: 'Lamb of God', genre: 'Groove Metal', country: '🇺🇸' },
  'brann-dailor': { name: 'Brann Dailor', band: 'Mastodon', genre: 'Progressive', country: '🇺🇸' },
  'mario-duplantier': { name: 'Mario Duplantier', band: 'Gojira', genre: 'Progressive Death', country: '🇫🇷' },
  'tomas-haake': { name: 'Tomas Haake', band: 'Meshuggah', genre: 'Djent', country: '🇸🇪' },
  'inferno': { name: 'Inferno', band: 'Behemoth', genre: 'Black/Death', country: '🇵🇱' },
  'hellhammer': { name: 'Hellhammer', band: 'Mayhem', genre: 'Black Metal', country: '🇳🇴' },
  'gavin-harrison': { name: 'Gavin Harrison', band: 'Porcupine Tree', genre: 'Progressive', country: '🇬🇧' },
  'george-kollias': { name: 'George Kollias', band: 'Nile', genre: 'Death Metal', country: '🇬🇷' },
  'matt-halpern': { name: 'Matt Halpern', band: 'Periphery', genre: 'Djent', country: '🇺🇸' },
  'dirk-verbeuren': { name: 'Dirk Verbeuren', band: 'Megadeth', genre: 'Thrash Metal', country: '🇧🇪' },
  'alex-bent': { name: 'Alex Bent', band: 'Trivium', genre: 'Thrash/Metalcore', country: '🇺🇸' },
  'danny-carey': { name: 'Danny Carey', band: 'Tool', genre: 'Progressive', country: '🇺🇸' },
  'igor-cavalera': { name: 'Igor Cavalera', band: 'Sepultura', genre: 'Thrash/Groove', country: '🇧🇷' },
  'abe-cunningham': { name: 'Abe Cunningham', band: 'Deftones', genre: 'Alternative', country: '🇺🇸' },
  'eloy-casagrande': { name: 'Eloy Casagrande', band: 'Slipknot', genre: 'Nu Metal', country: '🇧🇷' },
  'flo-mounier': { name: 'Flo Mounier', band: 'Cryptopsy', genre: 'Tech Death', country: '🇨🇦' },
  'pete-sandoval': { name: 'Pete Sandoval', band: 'Morbid Angel', genre: 'Death Metal', country: '🇸🇻' },
  'art-cruz': { name: 'Art Cruz', band: 'Lamb of God', genre: 'Groove Metal', country: '🇺🇸' },
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug') || 'joey-jordison';
    
    // Get drummer info
    const drummer = DRUMMERS[slug] || {
      name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      band: 'Metal Legend',
      genre: 'Metal',
      country: '🤘',
    };
    
    // Drummer image URL
    const imageUrl = `https://metalforge.io/images/drummers/${slug}.webp`;

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.background,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Left side - Drummer photo */}
          <div
            style={{
              display: 'flex',
              width: '45%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={imageUrl}
              alt={drummer.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                background: `linear-gradient(to left, ${COLORS.background}, transparent)`,
              }}
            />
          </div>

          {/* Right side - Info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '55%',
              padding: '40px 60px 40px 20px',
            }}
          >
            {/* MetalForge Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <span style={{ fontSize: '36px', marginRight: '12px' }}>🥁</span>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: COLORS.text,
                  letterSpacing: '-0.5px',
                }}
              >
                MetalForge
              </span>
            </div>

            {/* Drummer Name */}
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                color: COLORS.text,
                margin: '0 0 12px 0',
                lineHeight: 1.1,
              }}
            >
              {drummer.name}
            </h1>

            {/* Band */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '32px',
                color: COLORS.accent,
                marginBottom: '20px',
              }}
            >
              {drummer.band}
            </div>

            {/* Genre & Country */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '30px',
              }}
            >
              <span
                style={{
                  fontSize: '20px',
                  color: COLORS.secondary,
                  backgroundColor: COLORS.cardBg,
                  padding: '8px 16px',
                  borderRadius: '8px',
                }}
              >
                {drummer.genre}
              </span>
              <span style={{ fontSize: '28px' }}>{drummer.country}</span>
            </div>

            {/* CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                color: COLORS.secondary,
                marginTop: 'auto',
              }}
            >
              <span
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.text,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                }}
              >
                View Complete Gear Setup →
              </span>
            </div>
          </div>
        </div>
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
