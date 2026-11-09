// Vercel Serverless Function - OG Image Generator for Gear Comparison Tool
// Issue #721: Generate social share images for /tools/compare

import { ImageResponse } from '@vercel/og';
import { h } from '../_lib/og-h.js';

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
        h('div', {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 50%, #16213e 100%)',
          },}

          /* Header */
          , h('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            },}

            , h('span', { style: { fontSize: 40 },}, "⚔️")
            , h('span', {
              style: {
                fontSize: 32,
                fontWeight: 'bold',
                color: '#ffffff',
                marginLeft: 10,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              },}
, "Gear Comparison"

            )
          )

          /* Main comparison */
          , h('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
            },}

            /* Drummer 1 */
            , h('div', {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 30,
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                borderRadius: 16,
                border: '2px solid #FF6B35',
              },}

              , h('span', { style: { fontSize: 60, marginBottom: 10 },}, "🥁")
              , h('span', {
                style: {
                  fontSize: 36,
                  fontWeight: 'bold',
                  color: '#ffffff',
                  textAlign: 'center',
                  maxWidth: 300,
                },}

                , d1
              )
            )

            /* VS */
            , h('div', {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              },}

              , h('span', {
                style: {
                  fontSize: 72,
                  fontWeight: 'bold',
                  color: '#FF6B35',
                  textShadow: '0 0 20px rgba(255, 107, 53, 0.5)',
                },}
, "VS"

              )
            )

            /* Drummer 2 */
            , h('div', {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 30,
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                borderRadius: 16,
                border: '2px solid #4ECDC4',
              },}

              , h('span', { style: { fontSize: 60, marginBottom: 10 },}, "🥁")
              , h('span', {
                style: {
                  fontSize: 36,
                  fontWeight: 'bold',
                  color: '#ffffff',
                  textAlign: 'center',
                  maxWidth: 300,
                },}

                , d2
              )
            )
          )

          /* Footer */
          , h('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 40,
            },}

            , h('span', {
              style: {
                fontSize: 24,
                color: '#888888',
                letterSpacing: '1px',
              },}
, "Side-by-Side Drummer Setup Battle"

            )
          )

          /* MetalForge branding */
          , h('div', {
            style: {
              position: 'absolute',
              bottom: 30,
              display: 'flex',
              alignItems: 'center',
            },}

            , h('span', {
              style: {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#FF6B35',
              },}
, "🔥 MetalForge.io"

            )
          )
        )
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
