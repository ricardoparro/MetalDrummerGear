// Vercel Serverless Function - Auto-Generated Drummer Gear Cards
// Issue #747: Viral Social Sharing Cards

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Drummer data (embedded for edge runtime)
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
  };
  return flags[country] || '🌍';
}

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const format = searchParams.get('format') || 'instagram'; // instagram (1080x1080), twitter (1200x675)
    const type = searchParams.get('type') || 'full'; // full, stats, spotlight
    
    const drummer = drummers[slug];
    
    if (!drummer) {
      return new Response(`Drummer not found: ${slug}`, { status: 404 });
    }
    
    // Dimensions based on format
    const dimensions = format === 'twitter' 
      ? { width: 1200, height: 675 }
      : { width: 1080, height: 1080 };

    // Generate different card types
    if (type === 'stats') {
      return generateStatsCard(drummer, dimensions);
    } else if (type === 'spotlight') {
      return generateSpotlightCard(drummer, dimensions);
    } else {
      return generateFullCard(drummer, dimensions);
    }
  } catch (e) {
    console.error('Card generation error:', e);
    return new Response(`Failed to generate card: ${e.message}`, { status: 500 });
  }
}

// Full Setup Card - Drummer photo + complete gear list + total cost
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
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #1a0a0a 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)',
            display: 'flex',
          }}
        />
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isSquare ? '40px 50px' : '30px 50px',
            borderBottom: '2px solid rgba(255, 107, 53, 0.3)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: isSquare ? 56 : 48,
                fontWeight: 'bold',
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(255, 107, 53, 0.3)',
              }}
            >
              {drummer.name}
            </span>
            <span
              style={{
                fontSize: isSquare ? 28 : 24,
                color: '#FF6B35',
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
            <span style={{ fontSize: 48 }}>{getCountryFlag(drummer.country)}</span>
            <span style={{ fontSize: 16, color: '#888888', marginTop: 4 }}>{drummer.country}</span>
          </div>
        </div>

        {/* Gear Grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: isSquare ? '40px 50px' : '25px 50px',
            flex: 1,
            gap: isSquare ? 24 : 16,
          }}
        >
          {Object.entries(drummer.gear).map(([category, item]) => (
            <div
              key={category}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: isSquare ? '16px 24px' : '12px 20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                borderLeft: '4px solid #FF6B35',
              }}
            >
              <span
                style={{
                  fontSize: isSquare ? 32 : 28,
                  marginRight: isSquare ? 20 : 16,
                }}
              >
                {category === 'drums' ? '🥁' : 
                 category === 'snare' ? '🪘' : 
                 category === 'cymbals' ? '🎵' : 
                 category === 'hardware' ? '⚙️' : 
                 category === 'sticks' ? '🥢' : '🎶'}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span
                  style={{
                    fontSize: isSquare ? 14 : 12,
                    color: '#888888',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  {category}
                </span>
                <span
                  style={{
                    fontSize: isSquare ? 22 : 18,
                    color: '#ffffff',
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
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            borderTop: '2px solid rgba(255, 107, 53, 0.3)',
          }}
        >
          <div style={{ display: 'flex', gap: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14, color: '#888888', textTransform: 'uppercase' }}>
                Total Pieces
              </span>
              <span style={{ fontSize: 32, color: '#FF6B35', fontWeight: 'bold' }}>
                {drummer.stats.totalPieces}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14, color: '#888888', textTransform: 'uppercase' }}>
                Setup Value
              </span>
              <span style={{ fontSize: 32, color: '#4ECDC4', fontWeight: 'bold' }}>
                {formatCurrency(drummer.stats.totalCost)}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 24, fontWeight: 'bold', color: '#FF6B35' }}>
              🔥 MetalForge.io
            </span>
          </div>
        </div>
      </div>
    ),
    dimensions
  );
}

// Stats Card - Drummer name + key statistics
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
          backgroundColor: '#0a0a0a',
          backgroundImage: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 50%, #16213e 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Country Flag */}
        <span style={{ fontSize: 80, marginBottom: 20 }}>
          {getCountryFlag(drummer.country)}
        </span>
        
        {/* Drummer Name */}
        <span
          style={{
            fontSize: isSquare ? 72 : 64,
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          {drummer.name}
        </span>
        
        {/* Band */}
        <span
          style={{
            fontSize: isSquare ? 36 : 32,
            color: '#FF6B35',
            marginBottom: 40,
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
              padding: 30,
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              borderRadius: 20,
              border: '2px solid #FF6B35',
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 'bold', color: '#FF6B35' }}>
              {drummer.stats.totalPieces}
            </span>
            <span style={{ fontSize: 20, color: '#888888', textTransform: 'uppercase' }}>
              Pieces
            </span>
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 30,
              backgroundColor: 'rgba(78, 205, 196, 0.1)',
              borderRadius: 20,
              border: '2px solid #4ECDC4',
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 'bold', color: '#4ECDC4' }}>
              {formatCurrency(drummer.stats.totalCost)}
            </span>
            <span style={{ fontSize: 20, color: '#888888', textTransform: 'uppercase' }}>
              Setup Value
            </span>
          </div>
        </div>
        
        {/* Genre */}
        <span
          style={{
            fontSize: 24,
            color: '#666666',
            marginTop: 40,
          }}
        >
          {drummer.genre}
        </span>
        
        {/* MetalForge branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 'bold', color: '#FF6B35' }}>
            🔥 MetalForge.io
          </span>
        </div>
      </div>
    ),
    dimensions
  );
}

// Spotlight Card - Focus on primary gear
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
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at center, #1a1a2e 0%, #0a0a0a 70%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Big drum emoji */}
        <span style={{ fontSize: 120, marginBottom: 30 }}>🥁</span>
        
        {/* Drummer Name */}
        <span
          style={{
            fontSize: isSquare ? 56 : 48,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 10,
          }}
        >
          {drummer.name}
        </span>
        
        {/* Band */}
        <span
          style={{
            fontSize: isSquare ? 28 : 24,
            color: '#FF6B35',
            marginBottom: 40,
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
            padding: '40px 60px',
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            borderRadius: 24,
            border: '3px solid #FF6B35',
            maxWidth: isSquare ? 800 : 900,
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: '#888888',
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 10,
            }}
          >
            Signature Setup
          </span>
          <span
            style={{
              fontSize: isSquare ? 36 : 32,
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {drummer.gear.drums}
          </span>
          <span
            style={{
              fontSize: isSquare ? 24 : 22,
              color: '#4ECDC4',
              textAlign: 'center',
            }}
          >
            + {drummer.gear.snare}
          </span>
        </div>
        
        {/* Total cost badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 40,
            padding: '12px 30px',
            backgroundColor: 'rgba(78, 205, 196, 0.2)',
            borderRadius: 50,
          }}
        >
          <span style={{ fontSize: 24, color: '#4ECDC4', fontWeight: 'bold' }}>
            💰 {formatCurrency(drummer.stats.totalCost)} Total Setup
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
          <span style={{ fontSize: 24, fontWeight: 'bold', color: '#FF6B35' }}>
            🔥 MetalForge.io
          </span>
        </div>
      </div>
    ),
    dimensions
  );
}
