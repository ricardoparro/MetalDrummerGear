/**
 * Dynamic OG Image Generator for Stats Hub
 * Issue #769: Add Rich Social Meta Tags to All Pages
 * 
 * Usage: /api/og/stats
 */

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const COLORS = {
  primary: '#dc2626',
  background: '#0a0a0a',
  cardBg: '#141414',
  text: '#ffffff',
  secondary: '#a1a1aa',
  accent: '#f59e0b',
};

export default async function handler(req) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.background,
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <span style={{ fontSize: '48px', marginRight: '16px' }}>🥁</span>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: COLORS.text,
              }}
            >
              MetalForge
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: COLORS.text,
              margin: '0 0 20px 0',
              lineHeight: 1.1,
            }}
          >
            Gear Statistics
          </h1>

          <p
            style={{
              fontSize: '28px',
              color: COLORS.secondary,
              margin: '0 0 40px 0',
            }}
          >
            Data-driven insights from 60+ legendary metal drummers
          </p>

          {/* Stats Grid */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: 'auto',
            }}
          >
            {[
              { label: 'Drummers', value: '60+', icon: '🎸' },
              { label: 'Gear Items', value: '500+', icon: '🥁' },
              { label: 'Brands', value: '50+', icon: '🏷️' },
              { label: 'Videos', value: '200+', icon: '🎬' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: COLORS.cardBg,
                  padding: '24px 40px',
                  borderRadius: '16px',
                  border: `2px solid ${COLORS.primary}20`,
                }}
              >
                <span style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</span>
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: COLORS.accent,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    color: COLORS.secondary,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
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
