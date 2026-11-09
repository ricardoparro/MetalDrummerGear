/**
 * Default OG Image Generator for Homepage/Generic Pages
 * Issue #769: Add Rich Social Meta Tags to All Pages
 * 
 * Usage: /api/og or /api/og?page=<page-name>
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
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || 'home';

    // Page-specific content
    const pageContent = {
      home: {
        title: 'MetalForge',
        subtitle: 'Metal Drummer Gear Database',
        description: 'Discover what 60+ legendary metal drummers actually use',
        stats: ['60+ Drummers', '500+ Gear Items', 'Verified Setups'],
      },
      techniques: {
        title: 'Metal Drumming Techniques',
        subtitle: 'Master the Skills',
        description: 'Blast beats, double bass, polyrhythms & more',
        stats: ['Step-by-Step Guides', 'Video Examples', 'Pro Tips'],
      },
      'gear-news': {
        title: 'Gear News & Updates',
        subtitle: 'Stay Informed',
        description: 'Latest metal drumming gear releases and announcements',
        stats: ['Daily Updates', 'Product Reviews', 'Artist News'],
      },
      'beginner-guide': {
        title: "Beginner's Guide",
        subtitle: 'Start Your Journey',
        description: 'Everything you need to start metal drumming',
        stats: ['Gear Guides', 'Technique Basics', 'Budget Tips'],
      },
    };

    const content = pageContent[page] || pageContent.home;

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
            backgroundColor: COLORS.background,
            backgroundImage: `radial-gradient(ellipse at 50% 0%, ${COLORS.primary}15 0%, transparent 60%)`,
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          },}

          /* Logo */
          , h('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '30px',
            },}

            , h('span', { style: { fontSize: '72px', marginRight: '20px' },}, "🥁")
          )

          /* Title */
          , h('h1', {
            style: {
              fontSize: '72px',
              fontWeight: 'bold',
              color: COLORS.text,
              margin: '0 0 8px 0',
              textAlign: 'center',
              lineHeight: 1.1,
            },}

            , content.title
          )

          /* Subtitle */
          , h('h2', {
            style: {
              fontSize: '36px',
              fontWeight: '600',
              color: COLORS.accent,
              margin: '0 0 20px 0',
              textAlign: 'center',
            },}

            , content.subtitle
          )

          /* Description */
          , h('p', {
            style: {
              fontSize: '28px',
              color: COLORS.secondary,
              margin: '0 0 40px 0',
              textAlign: 'center',
            },}

            , content.description
          )

          /* Stats Row */
          , h('div', {
            style: {
              display: 'flex',
              gap: '24px',
            },}

            , content.stats.map((stat, i) => (
              h('div', {
                key: i,
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: COLORS.cardBg,
                  padding: '16px 28px',
                  borderRadius: '12px',
                  border: `2px solid ${COLORS.primary}30`,
                },}

                , h('span', {
                  style: {
                    fontSize: '22px',
                    fontWeight: '600',
                    color: COLORS.text,
                  },}

                  , stat
                )
              )
            ))
          )

          /* URL */
          , h('div', {
            style: {
              display: 'flex',
              marginTop: '40px',
              fontSize: '22px',
              color: COLORS.secondary,
            },}
, "metalforge.io"

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
