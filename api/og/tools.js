/**
 * Dynamic OG Image Generator for Tools Hub
 * Issue #769: Add Rich Social Meta Tags to All Pages
 * 
 * Usage: /api/og/tools
 */

import { ImageResponse } from '@vercel/og';
import { h } from '../_lib/og-h.js';

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
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.background,
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          },}

          /* Header */
          , h('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            },}

            , h('span', { style: { fontSize: '48px', marginRight: '16px' },}, "🥁")
            , h('span', {
              style: {
                fontSize: '32px',
                fontWeight: 'bold',
                color: COLORS.text,
              },}
, "MetalForge"

            )
          )

          /* Title */
          , h('h1', {
            style: {
              fontSize: '64px',
              fontWeight: 'bold',
              color: COLORS.text,
              margin: '0 0 20px 0',
              lineHeight: 1.1,
            },}
, "Drummer Tools & Calculators"

          )

          , h('p', {
            style: {
              fontSize: '28px',
              color: COLORS.secondary,
              margin: '0 0 40px 0',
            },}
, "Free tools to level up your drumming 🤘"

          )

          /* Tools Grid */
          , h('div', {
            style: {
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginTop: 'auto',
            },}

            , [
              { name: 'BPM Calculator', icon: '⏱️' },
              { name: 'Kit Builder', icon: '🛠️' },
              { name: 'Gear Compare', icon: '⚖️' },
              { name: 'Name Generator', icon: '🎭' },
              { name: 'Sound-Like Guides', icon: '🎯' },
              { name: 'Quiz', icon: '❓' },
            ].map((tool) => (
              h('div', {
                key: tool.name,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: COLORS.cardBg,
                  padding: '16px 24px',
                  borderRadius: '12px',
                  border: `2px solid ${COLORS.primary}30`,
                },}

                , h('span', { style: { fontSize: '28px', marginRight: '12px' },}, tool.icon)
                , h('span', {
                  style: {
                    fontSize: '22px',
                    fontWeight: '600',
                    color: COLORS.text,
                  },}

                  , tool.name
                )
              )
            ))
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
