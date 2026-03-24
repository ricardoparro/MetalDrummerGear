// Vercel Serverless Function - Auto-Generated Drummer Gear Cards
// Issue #764: Viral Social Sharing Cards with Download & Share
// 
// Usage:
//   /api/card/lars-ulrich?format=instagram  → 1080x1080
//   /api/card/lars-ulrich?format=twitter    → 1200x675
//   /api/card/lars-ulrich?type=stats        → Stats-focused card
//   /api/card/lars-ulrich?type=spotlight    → Signature gear spotlight

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Drummer data (embedded for edge runtime - synced with main database)
const drummers = {
  'lars-ulrich': {
    name: 'Lars Ulrich',
    band: 'Metallica',
    genre: 'Thrash Metal',
    country: 'Denmark',
    image: 'https://metalforge.io/images/drummers/lars-ulrich.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series',
      hardware: 'Tama Iron Cobra 900 Power Glide',
      sticks: 'Ahead Lars Ulrich Signature',
    },
    stats: { totalPieces: 42, totalCost: 27450 },
  },
  'joey-jordison': {
    name: 'Joey Jordison',
    band: 'Slipknot',
    genre: 'Nu Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/joey-jordison.webp',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Joey Jordison Signature 13x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series',
      hardware: 'Pearl Demon Drive Double Pedal',
      sticks: 'Promark Joey Jordison Signature',
    },
    stats: { totalPieces: 38, totalCost: 24800 },
  },
  'gene-hoglan': {
    name: 'Gene Hoglan',
    band: 'Testament',
    genre: 'Death/Thrash Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/gene-hoglan.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama Gene Hoglan Signature',
      cymbals: 'Zildjian A Custom Series',
      hardware: 'Tama Iron Cobra 900',
      sticks: 'Vater Gene Hoglan Signature',
    },
    stats: { totalPieces: 45, totalCost: 28200 },
  },
  'dave-lombardo': {
    name: 'Dave Lombardo',
    band: 'Slayer',
    genre: 'Thrash Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/dave-lombardo.webp',
    gear: {
      drums: 'Pearl Masterworks',
      snare: 'Pearl Dave Lombardo Signature',
      cymbals: 'Paiste RUDE Series',
      hardware: 'Pearl Eliminator Demon Drive',
      sticks: 'Vic Firth Dave Lombardo Signature',
    },
    stats: { totalPieces: 40, totalCost: 26500 },
  },
  'tomas-haake': {
    name: 'Tomas Haake',
    band: 'Meshuggah',
    genre: 'Progressive Metal',
    country: 'Sweden',
    image: 'https://metalforge.io/images/drummers/tomas-haake.webp',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor Tomas Haake Signature',
      cymbals: 'Meinl Byzance Series',
      hardware: 'Sonor Giant Step Twin Pedal',
      sticks: 'Vic Firth Tomas Haake Signature',
    },
    stats: { totalPieces: 35, totalCost: 32500 },
  },
  'danny-carey': {
    name: 'Danny Carey',
    band: 'Tool',
    genre: 'Progressive Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/danny-carey.webp',
    gear: {
      drums: 'Sonor Designer Series',
      snare: 'Sonor Danny Carey Signature',
      cymbals: 'Paiste Signature Series',
      hardware: 'Sonor Giant Step Pedal',
      sticks: 'Vic Firth Danny Carey Signature',
    },
    stats: { totalPieces: 48, totalCost: 45000 },
  },
  'chris-adler': {
    name: 'Chris Adler',
    band: 'Lamb of God',
    genre: 'Groove Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/chris-adler.webp',
    gear: {
      drums: 'Mapex Saturn Series',
      snare: 'Mapex Chris Adler Signature',
      cymbals: 'Meinl Byzance Extra Dry',
      hardware: 'Mapex Falcon Double Pedal',
      sticks: 'Vic Firth Chris Adler Signature',
    },
    stats: { totalPieces: 32, totalCost: 18500 },
  },
  'george-kollias': {
    name: 'George Kollias',
    band: 'Nile',
    genre: 'Death Metal',
    country: 'Greece',
    image: 'https://metalforge.io/images/drummers/george-kollias.webp',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl George Kollias Signature',
      cymbals: 'Meinl Byzance Brilliant',
      hardware: 'Pearl Demon Drive',
      sticks: 'Vic Firth George Kollias Signature',
    },
    stats: { totalPieces: 36, totalCost: 22800 },
  },
  'mike-portnoy': {
    name: 'Mike Portnoy',
    band: 'Dream Theater',
    genre: 'Progressive Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/mike-portnoy.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama Mike Portnoy Signature',
      cymbals: 'Sabian HHX Series',
      hardware: 'Tama Iron Cobra 900',
      sticks: 'Promark Mike Portnoy Signature',
    },
    stats: { totalPieces: 55, totalCost: 38000 },
  },
  'vinnie-paul': {
    name: 'Vinnie Paul',
    band: 'Pantera',
    genre: 'Groove Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/vinnie-paul.webp',
    gear: {
      drums: 'ddrum Vinnie Paul Signature',
      snare: 'ddrum Vinnie Paul Signature',
      cymbals: 'Sabian AAX/HH Series',
      hardware: 'DW 9000 Double Pedal',
      sticks: 'Vic Firth Vinnie Paul Signature',
    },
    stats: { totalPieces: 44, totalCost: 28500 },
  },
  'charlie-benante': {
    name: 'Charlie Benante',
    band: 'Anthrax',
    genre: 'Thrash Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/charlie-benante.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama Charlie Benante Signature',
      cymbals: 'Zildjian A Custom Series',
      hardware: 'Tama Speed Cobra 910',
      sticks: 'Vic Firth Charlie Benante Signature',
    },
    stats: { totalPieces: 38, totalCost: 25800 },
  },
  'igor-cavalera': {
    name: 'Igor Cavalera',
    band: 'Sepultura',
    genre: 'Thrash/Groove Metal',
    country: 'Brazil',
    image: 'https://metalforge.io/images/drummers/igor-cavalera.webp',
    gear: {
      drums: 'Roland TD-50KV',
      snare: 'Roland PD-140DS',
      cymbals: 'Roland CY Series',
      hardware: 'Roland KD-A22',
      sticks: 'Vic Firth 5A',
    },
    stats: { totalPieces: 28, totalCost: 18000 },
  },
  'nicko-mcbrain': {
    name: 'Nicko McBrain',
    band: 'Iron Maiden',
    genre: 'Heavy Metal',
    country: 'UK',
    image: 'https://metalforge.io/images/drummers/nicko-mcbrain.webp',
    gear: {
      drums: 'Sonor SQ2',
      snare: 'Sonor Nicko McBrain Signature',
      cymbals: 'Paiste RUDE Series',
      hardware: 'Sonor Giant Step Pedal',
      sticks: 'Vic Firth Nicko McBrain Signature',
    },
    stats: { totalPieces: 42, totalCost: 35000 },
  },
  'abe-cunningham': {
    name: 'Abe Cunningham',
    band: 'Deftones',
    genre: 'Alternative Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/abe-cunningham.webp',
    gear: {
      drums: 'DW Collector\'s Series',
      snare: 'DW Collector\'s Brass',
      cymbals: 'Zildjian K Custom',
      hardware: 'DW 9000 Series',
      sticks: 'Vater Power 5B',
    },
    stats: { totalPieces: 30, totalCost: 24000 },
  },
  'brann-dailor': {
    name: 'Brann Dailor',
    band: 'Mastodon',
    genre: 'Progressive Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/brann-dailor.webp',
    gear: {
      drums: 'DW Collector\'s Maple',
      snare: 'DW Collector\'s Brass',
      cymbals: 'Meinl Byzance Series',
      hardware: 'DW 9000 Series',
      sticks: 'Vic Firth Brann Dailor Signature',
    },
    stats: { totalPieces: 34, totalCost: 28000 },
  },
  'mario-duplantier': {
    name: 'Mario Duplantier',
    band: 'Gojira',
    genre: 'Progressive Death Metal',
    country: 'France',
    image: 'https://metalforge.io/images/drummers/mario-duplantier.webp',
    gear: {
      drums: 'Tama Starclassic Performer',
      snare: 'Tama S.L.P. Steel',
      cymbals: 'Meinl Byzance Vintage',
      hardware: 'Tama Iron Cobra 900',
      sticks: 'Vic Firth 5A',
    },
    stats: { totalPieces: 32, totalCost: 19500 },
  },
  'eloy-casagrande': {
    name: 'Eloy Casagrande',
    band: 'Sepultura/Slipknot',
    genre: 'Thrash/Nu Metal',
    country: 'Brazil',
    image: 'https://metalforge.io/images/drummers/eloy-casagrande.webp',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference Cast Steel',
      cymbals: 'Paiste RUDE Series',
      hardware: 'Pearl Eliminator Redline',
      sticks: 'Vic Firth X5A',
    },
    stats: { totalPieces: 38, totalCost: 26500 },
  },
  'inferno': {
    name: 'Inferno',
    band: 'Behemoth',
    genre: 'Black/Death Metal',
    country: 'Poland',
    image: 'https://metalforge.io/images/drummers/inferno.webp',
    gear: {
      drums: 'Pearl Masterworks',
      snare: 'Pearl Reference',
      cymbals: 'Meinl Byzance Brilliant',
      hardware: 'Pearl Demon Drive',
      sticks: 'Vic Firth American Classic 5B',
    },
    stats: { totalPieces: 40, totalCost: 28000 },
  },
  'flo-mounier': {
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    genre: 'Technical Death Metal',
    country: 'Canada',
    image: 'https://metalforge.io/images/drummers/flo-mounier.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. G-Maple',
      cymbals: 'Sabian HHX Series',
      hardware: 'Tama Speed Cobra 910',
      sticks: 'Vic Firth 5A',
    },
    stats: { totalPieces: 35, totalCost: 22000 },
  },
  'hellhammer': {
    name: 'Hellhammer',
    band: 'Mayhem',
    genre: 'Black Metal',
    country: 'Norway',
    image: 'https://metalforge.io/images/drummers/hellhammer.webp',
    gear: {
      drums: 'Pearl Masters Premium',
      snare: 'Pearl Sensitone',
      cymbals: 'Zildjian A Custom Series',
      hardware: 'Pearl Demon Drive',
      sticks: 'Vic Firth 5B',
    },
    stats: { totalPieces: 36, totalCost: 21500 },
  },
  'pete-sandoval': {
    name: 'Pete Sandoval',
    band: 'Morbid Angel',
    genre: 'Death Metal',
    country: 'USA',
    image: 'https://metalforge.io/images/drummers/pete-sandoval.webp',
    gear: {
      drums: 'Pearl Masters Premium',
      snare: 'Pearl Reference Pure Steel',
      cymbals: 'Zildjian A Custom Series',
      hardware: 'Pearl Eliminator',
      sticks: 'Vic Firth American Classic 5B',
    },
    stats: { totalPieces: 38, totalCost: 24000 },
  },
};

// MetalForge brand colors
const BRAND = {
  primary: '#FF6B35',      // Metal orange
  secondary: '#4ECDC4',    // Teal accent
  background: '#0a0a0a',   // Near black
  cardBg: '#1a1a1a',       // Dark gray
  text: '#ffffff',         // White
  textMuted: '#888888',    // Gray text
  gradient1: '#1a1a2e',    // Dark blue tint
  gradient2: '#16213e',    // Navy
  success: '#22c55e',      // Green
};

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Get flag emoji for country
function getCountryFlag(country) {
  const flags = {
    'USA': '🇺🇸',
    'Denmark': '🇩🇰',
    'UK': '🇬🇧',
    'Sweden': '🇸🇪',
    'Norway': '🇳🇴',
    'Brazil': '🇧🇷',
    'Poland': '🇵🇱',
    'Greece': '🇬🇷',
    'France': '🇫🇷',
    'Canada': '🇨🇦',
    'Germany': '🇩🇪',
    'Finland': '🇫🇮',
    'Japan': '🇯🇵',
    'Australia': '🇦🇺',
  };
  return flags[country] || '🌍';
}

// Get gear emoji
function getGearEmoji(category) {
  const emojis = {
    drums: '🥁',
    snare: '🪘',
    cymbals: '🎵',
    hardware: '⚙️',
    sticks: '🥢',
    electronics: '🎛️',
  };
  return emojis[category] || '🎶';
}

export default async function handler(req) {
  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    
    // Extract slug from path: /api/card/[slug]
    const slug = pathParts[pathParts.length - 1];
    const format = url.searchParams.get('format') || 'instagram';
    const type = url.searchParams.get('type') || 'full';
    const download = url.searchParams.get('download') === 'true';
    
    const drummer = drummers[slug];
    
    if (!drummer) {
      return new Response(JSON.stringify({ 
        error: 'Drummer not found', 
        slug,
        available: Object.keys(drummers) 
      }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Dimensions based on format
    const dimensions = format === 'twitter' 
      ? { width: 1200, height: 675 }
      : { width: 1080, height: 1080 };

    // Generate the appropriate card type
    let imageResponse;
    if (type === 'stats') {
      imageResponse = generateStatsCard(drummer, dimensions);
    } else if (type === 'spotlight') {
      imageResponse = generateSpotlightCard(drummer, dimensions);
    } else {
      imageResponse = generateFullCard(drummer, dimensions);
    }

    // Add caching and download headers
    const response = await imageResponse;
    const headers = new Headers(response.headers);
    
    // Cache for 1 hour on CDN, allow stale for 24 hours while revalidating
    headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    // Add Content-Disposition for downloads
    if (download) {
      const filename = `${drummer.name.toLowerCase().replace(/\s+/g, '-')}-gear-card-${format}.png`;
      headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    }
    
    // Add meta headers for tracking
    headers.set('X-Drummer-Slug', slug);
    headers.set('X-Card-Format', format);
    headers.set('X-Card-Type', type);
    
    return new Response(response.body, {
      status: 200,
      headers,
    });
  } catch (e) {
    console.error('Card generation error:', e);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate card', 
      message: e.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Full Setup Card - Complete gear list with stats
function generateFullCard(drummer, dimensions) {
  const { width, height } = dimensions;
  const isSquare = width === height;
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: BRAND.background,
          backgroundImage: `linear-gradient(135deg, ${BRAND.gradient1} 0%, ${BRAND.background} 50%, #1a0a0a 100%)`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)`,
            display: 'flex',
          }}
        />
        
        {/* Header with drummer info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isSquare ? '40px 50px' : '30px 50px',
            borderBottom: `2px solid ${BRAND.primary}40`,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: isSquare ? 56 : 48,
                fontWeight: 'bold',
                color: BRAND.text,
                textShadow: `0 2px 10px ${BRAND.primary}40`,
                letterSpacing: '-0.5px',
              }}
            >
              {drummer.name}
            </span>
            <span
              style={{
                fontSize: isSquare ? 28 : 24,
                color: BRAND.primary,
                fontWeight: '600',
              }}
            >
              {drummer.band} • {drummer.genre}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <span style={{ fontSize: 52 }}>{getCountryFlag(drummer.country)}</span>
            <span style={{ fontSize: 16, color: BRAND.textMuted, marginTop: 4 }}>
              {drummer.country}
            </span>
          </div>
        </div>

        {/* Gear Grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: isSquare ? '40px 50px' : '25px 50px',
            flex: 1,
            gap: isSquare ? 20 : 14,
          }}
        >
          {Object.entries(drummer.gear).map(([category, item]) => (
            <div
              key={category}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isSquare ? '18px 24px' : '14px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                borderLeft: `4px solid ${BRAND.primary}`,
              }}
            >
              <span
                style={{
                  fontSize: isSquare ? 32 : 28,
                  marginRight: isSquare ? 20 : 16,
                }}
              >
                {getGearEmoji(category)}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span
                  style={{
                    fontSize: isSquare ? 14 : 12,
                    color: BRAND.textMuted,
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    fontWeight: '600',
                  }}
                >
                  {category}
                </span>
                <span
                  style={{
                    fontSize: isSquare ? 22 : 18,
                    color: BRAND.text,
                    fontWeight: '500',
                  }}
                >
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isSquare ? '30px 50px' : '20px 50px',
            backgroundColor: `${BRAND.primary}15`,
            borderTop: `2px solid ${BRAND.primary}40`,
          }}
        >
          <div style={{ display: 'flex', gap: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>
                Total Pieces
              </span>
              <span style={{ fontSize: 36, color: BRAND.primary, fontWeight: 'bold' }}>
                {drummer.stats.totalPieces}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>
                Setup Value
              </span>
              <span style={{ fontSize: 36, color: BRAND.secondary, fontWeight: 'bold' }}>
                {formatCurrency(drummer.stats.totalCost)}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 28, fontWeight: 'bold', color: BRAND.primary }}>
              🔥 MetalForge.io
            </span>
          </div>
        </div>
      </div>
    ),
    dimensions
  );
}

// Stats Card - Focused on key statistics
function generateStatsCard(drummer, dimensions) {
  const { width, height } = dimensions;
  const isSquare = width === height;
  
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
          backgroundColor: BRAND.background,
          backgroundImage: `linear-gradient(135deg, ${BRAND.gradient1} 0%, ${BRAND.background} 50%, ${BRAND.gradient2} 100%)`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `${BRAND.primary}10`,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `${BRAND.secondary}10`,
            display: 'flex',
          }}
        />
        
        {/* Country Flag */}
        <span style={{ fontSize: 80, marginBottom: 20 }}>
          {getCountryFlag(drummer.country)}
        </span>
        
        {/* Drummer Name */}
        <span
          style={{
            fontSize: isSquare ? 72 : 64,
            fontWeight: 'bold',
            color: BRAND.text,
            textAlign: 'center',
            marginBottom: 10,
            letterSpacing: '-1px',
          }}
        >
          {drummer.name}
        </span>
        
        {/* Band & Genre */}
        <span
          style={{
            fontSize: isSquare ? 32 : 28,
            color: BRAND.primary,
            marginBottom: 50,
            fontWeight: '600',
          }}
        >
          {drummer.band}
        </span>
        
        {/* Stats Grid */}
        <div
          style={{
            display: 'flex',
            gap: 60,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '36px 48px',
              backgroundColor: `${BRAND.primary}15`,
              borderRadius: 24,
              border: `3px solid ${BRAND.primary}`,
            }}
          >
            <span style={{ fontSize: 72, fontWeight: 'bold', color: BRAND.primary }}>
              {drummer.stats.totalPieces}
            </span>
            <span style={{ fontSize: 22, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 2 }}>
              Pieces
            </span>
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '36px 48px',
              backgroundColor: `${BRAND.secondary}15`,
              borderRadius: 24,
              border: `3px solid ${BRAND.secondary}`,
            }}
          >
            <span style={{ fontSize: 56, fontWeight: 'bold', color: BRAND.secondary }}>
              {formatCurrency(drummer.stats.totalCost)}
            </span>
            <span style={{ fontSize: 22, color: BRAND.textMuted, textTransform: 'uppercase', letterSpacing: 2 }}>
              Setup Value
            </span>
          </div>
        </div>
        
        {/* Genre Badge */}
        <div
          style={{
            display: 'flex',
            marginTop: 50,
            padding: '12px 28px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 50,
          }}
        >
          <span style={{ fontSize: 20, color: BRAND.textMuted }}>
            🎸 {drummer.genre}
          </span>
        </div>
        
        {/* MetalForge branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 'bold', color: BRAND.primary }}>
            🔥 MetalForge.io
          </span>
        </div>
      </div>
    ),
    dimensions
  );
}

// Spotlight Card - Focus on signature gear
function generateSpotlightCard(drummer, dimensions) {
  const { width, height } = dimensions;
  const isSquare = width === height;
  
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
          backgroundColor: BRAND.background,
          backgroundImage: `radial-gradient(ellipse at center, ${BRAND.gradient1} 0%, ${BRAND.background} 70%)`,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Decorative ring */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: `2px solid ${BRAND.primary}20`,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: `1px solid ${BRAND.primary}10`,
            display: 'flex',
          }}
        />
        
        {/* Big drum emoji */}
        <span style={{ fontSize: 120, marginBottom: 30 }}>🥁</span>
        
        {/* Drummer Name */}
        <span
          style={{
            fontSize: isSquare ? 56 : 48,
            fontWeight: 'bold',
            color: BRAND.text,
            marginBottom: 10,
            letterSpacing: '-0.5px',
          }}
        >
          {drummer.name}
        </span>
        
        {/* Band */}
        <span
          style={{
            fontSize: isSquare ? 28 : 24,
            color: BRAND.primary,
            marginBottom: 50,
            fontWeight: '600',
          }}
        >
          {drummer.band}
        </span>
        
        {/* Primary Gear Spotlight */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '44px 64px',
            backgroundColor: `${BRAND.primary}15`,
            borderRadius: 28,
            border: `3px solid ${BRAND.primary}`,
            maxWidth: isSquare ? 800 : 950,
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: BRAND.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 3,
              marginBottom: 16,
              fontWeight: '600',
            }}
          >
            ⭐ Signature Setup ⭐
          </span>
          <span
            style={{
              fontSize: isSquare ? 38 : 34,
              fontWeight: 'bold',
              color: BRAND.text,
              textAlign: 'center',
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            {drummer.gear.drums}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28, color: BRAND.secondary }}>+</span>
            <span
              style={{
                fontSize: isSquare ? 24 : 22,
                color: BRAND.secondary,
                textAlign: 'center',
              }}
            >
              {drummer.gear.snare}
            </span>
          </div>
        </div>
        
        {/* Total cost badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 44,
            padding: '16px 36px',
            backgroundColor: `${BRAND.secondary}20`,
            borderRadius: 50,
            border: `2px solid ${BRAND.secondary}40`,
          }}
        >
          <span style={{ fontSize: 28, color: BRAND.secondary, fontWeight: 'bold' }}>
            💰 {formatCurrency(drummer.stats.totalCost)} Total Setup
          </span>
        </div>
        
        {/* MetalForge branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 28, fontWeight: 'bold', color: BRAND.primary }}>
            🔥 MetalForge.io
          </span>
        </div>
      </div>
    ),
    dimensions
  );
}
