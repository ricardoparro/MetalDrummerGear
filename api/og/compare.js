// Vercel Serverless Function - OG Image Generator for Gear Comparison Tool
// Issue #721: Generate social share images for /tools/compare

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const d1 = searchParams.get('d1') || 'Drummer 1';
    const d2 = searchParams.get('d2') || 'Drummer 2';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 50%, #16213e 100%)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 40 }}>⚔️</span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: '#ffffff',
                marginLeft: 10,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Gear Comparison
            </span>
          </div>

          {/* Main comparison */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
            }}
          >
            {/* Drummer 1 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 30,
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                borderRadius: 16,
                border: '2px solid #FF6B35',
              }}
            >
              <span style={{ fontSize: 60, marginBottom: 10 }}>🥁</span>
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 'bold',
                  color: '#ffffff',
                  textAlign: 'center',
                  maxWidth: 300,
                }}
              >
                {d1}
              </span>
            </div>

            {/* VS */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 'bold',
                  color: '#FF6B35',
                  textShadow: '0 0 20px rgba(255, 107, 53, 0.5)',
                }}
              >
                VS
              </span>
            </div>

            {/* Drummer 2 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 30,
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                borderRadius: 16,
                border: '2px solid #4ECDC4',
              }}
            >
              <span style={{ fontSize: 60, marginBottom: 10 }}>🥁</span>
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 'bold',
                  color: '#ffffff',
                  textAlign: 'center',
                  maxWidth: 300,
                }}
              >
                {d2}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            }}
          >
            <span
              style={{
                fontSize: 24,
                color: '#888888',
                letterSpacing: '1px',
              }}
            >
              Side-by-Side Drummer Setup Battle
            </span>
          </div>

          {/* MetalForge branding */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#FF6B35',
              }}
            >
              🔥 MetalForge.io
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('OG image generation error:', e);
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
}
