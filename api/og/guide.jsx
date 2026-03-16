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

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const guideType = searchParams.get('type') || 'beginner';
    
    const guide = GUIDES[guideType] || GUIDES.beginner;

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
            padding: '48px',
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(135deg, ${BRAND_COLORS.background} 0%, #1f1f1f 50%, ${BRAND_COLORS.background} 100%)`,
            }}
          />
          
          {/* Content container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              maxWidth: '1000px',
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: BRAND_COLORS.primary,
                paddingLeft: '24px',
                paddingRight: '24px',
                paddingTop: '12px',
                paddingBottom: '12px',
                borderRadius: '9999px',
                marginBottom: '32px',
              }}
            >
              <span style={{ color: BRAND_COLORS.text, fontSize: '24px', fontWeight: 700, letterSpacing: '2px' }}>
                {guide.badge}
              </span>
            </div>

            {/* Emoji */}
            <div style={{ fontSize: '80px', marginBottom: '24px' }}>
              {guide.emoji}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: '56px',
                fontWeight: 800,
                color: BRAND_COLORS.text,
                textAlign: 'center',
                marginBottom: '16px',
                lineHeight: 1.1,
              }}
            >
              {guide.title}
            </div>
            
            {/* Subtitle */}
            <div
              style={{
                fontSize: '42px',
                fontWeight: 700,
                color: BRAND_COLORS.primary,
                textAlign: 'center',
                marginBottom: '40px',
              }}
            >
              {guide.subtitle}
            </div>

            {/* Features */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                marginBottom: '48px',
              }}
            >
              {guide.features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: BRAND_COLORS.cardBg,
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: `1px solid ${BRAND_COLORS.primary}40`,
                  }}
                >
                  <span style={{ color: BRAND_COLORS.success, fontSize: '20px' }}>✓</span>
                  <span style={{ color: BRAND_COLORS.secondaryText, fontSize: '18px' }}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 700, color: BRAND_COLORS.text }}>
                MetalForge
              </span>
              <span style={{ fontSize: '24px', color: BRAND_COLORS.secondaryText }}>
                .io
              </span>
            </div>
          </div>
        </div>
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
