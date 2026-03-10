/**
 * Dynamic OG Image Generator for Quiz Results
 * Issue #682: Branded social share images for quiz results
 * 
 * Generates dynamic Open Graph images with:
 * - Drummer image with MetalForge branding
 * - Match percentage badge
 * - Call-to-action text
 * 
 * Usage: /api/og/quiz?drummer=<slug>&match=<percentage>
 * Example: /api/og/quiz?drummer=joey-jordison&match=87
 */

import { ImageResponse } from '@vercel/og';

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
};

// Drummer data mapping (slug -> display info)
// This should match the main drummer database
const DRUMMER_INFO = {
  'joey-jordison': { name: 'Joey Jordison', band: 'Slipknot' },
  'lars-ulrich': { name: 'Lars Ulrich', band: 'Metallica' },
  'dave-lombardo': { name: 'Dave Lombardo', band: 'Slayer' },
  'gene-hoglan': { name: 'Gene Hoglan', band: 'Death' },
  'mike-portnoy': { name: 'Mike Portnoy', band: 'Dream Theater' },
  'vinnie-paul': { name: 'Vinnie Paul', band: 'Pantera' },
  'charlie-benante': { name: 'Charlie Benante', band: 'Anthrax' },
  'nicko-mcbrain': { name: 'Nicko McBrain', band: 'Iron Maiden' },
  'bill-ward': { name: 'Bill Ward', band: 'Black Sabbath' },
  'chris-adler': { name: 'Chris Adler', band: 'Lamb of God' },
  'brann-dailor': { name: 'Brann Dailor', band: 'Mastodon' },
  'mario-duplantier': { name: 'Mario Duplantier', band: 'Gojira' },
  'tomas-haake': { name: 'Tomas Haake', band: 'Meshuggah' },
  'inferno': { name: 'Inferno', band: 'Behemoth' },
  'hellhammer': { name: 'Hellhammer', band: 'Mayhem' },
  'gavin-harrison': { name: 'Gavin Harrison', band: 'Porcupine Tree' },
  'george-kollias': { name: 'George Kollias', band: 'Nile' },
  'matt-halpern': { name: 'Matt Halpern', band: 'Periphery' },
  'dirk-verbeuren': { name: 'Dirk Verbeuren', band: 'Megadeth' },
  'alex-bent': { name: 'Alex Bent', band: 'Trivium' },
  'art-cruz': { name: 'Art Cruz', band: 'Lamb of God' },
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const drummerSlug = searchParams.get('drummer') || 'joey-jordison';
    const matchPercentage = searchParams.get('match') || '85';
    
    // Get drummer info
    const drummer = DRUMMER_INFO[drummerSlug] || { 
      name: drummerSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      band: 'Metal Legend'
    };
    
    // Construct drummer image URL (fallback to default)
    const drummerImageUrl = `https://metalforge.io/images/drummers/${drummerSlug}.jpg`;
    const fallbackImageUrl = 'https://metalforge.io/og-quiz.png';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: BRAND_COLORS.background,
            padding: '40px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* MetalForge Logo & Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '32px', marginRight: '12px' }}>🥁</span>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: BRAND_COLORS.text,
                letterSpacing: '-1px',
              }}
            >
              MetalForge
            </span>
          </div>

          {/* Quiz Title */}
          <div
            style={{
              fontSize: '24px',
              color: BRAND_COLORS.secondaryText,
              marginBottom: '30px',
            }}
          >
            Which Metal Drummer Are You?
          </div>

          {/* Result Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: BRAND_COLORS.cardBg,
              borderRadius: '24px',
              padding: '40px 60px',
              border: `3px solid ${BRAND_COLORS.primary}`,
              boxShadow: `0 0 60px ${BRAND_COLORS.primary}40`,
            }}
          >
            {/* Match Percentage Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: BRAND_COLORS.primary,
                color: BRAND_COLORS.text,
                fontSize: '22px',
                fontWeight: 'bold',
                padding: '8px 24px',
                borderRadius: '999px',
                marginBottom: '24px',
              }}
            >
              {matchPercentage}% Match 🎯
            </div>

            {/* Drummer Photo Circle */}
            <div
              style={{
                display: 'flex',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `4px solid ${BRAND_COLORS.accent}`,
                marginBottom: '24px',
                backgroundColor: BRAND_COLORS.cardBg,
              }}
            >
              <img
                src={drummerImageUrl}
                alt={drummer.name}
                width="180"
                height="180"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>

            {/* Drummer Name */}
            <div
              style={{
                fontSize: '42px',
                fontWeight: 'bold',
                color: BRAND_COLORS.text,
                textAlign: 'center',
                marginBottom: '8px',
              }}
            >
              {drummer.name}
            </div>

            {/* Band Name */}
            <div
              style={{
                fontSize: '26px',
                color: BRAND_COLORS.accent,
                textAlign: 'center',
              }}
            >
              {drummer.band}
            </div>
          </div>

          {/* Call to Action */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '30px',
              fontSize: '22px',
              color: BRAND_COLORS.secondaryText,
            }}
          >
            <span style={{ marginRight: '8px' }}>🤘</span>
            Take the quiz at metalforge.io/quiz
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
    // Return a basic fallback image
    return new Response('Error generating image', { status: 500 });
  }
}
