// Vercel Serverless Function - List all gear items

const gearItems = [
  {
    id: 1,
    slug: 'tama-iron-cobra-900-double-pedal',
    name: 'Tama Iron Cobra 900 Power Glide Double Pedal',
    category: 'hardware',
    brand: 'Tama',
    description: 'The Tama Iron Cobra 900 is one of the most popular double bass pedals in metal drumming. Known for its smooth Power Glide cam, quick response, and durability, it has been the pedal of choice for many legendary drummers. The Iron Cobra features a rolling glide design that provides a linear feel throughout the stroke.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dixon-double-pedal.jpg',
    specs: {
      camType: 'Power Glide',
      beaterType: 'Dual-surface (felt/plastic)',
      footboard: 'Speed Cobra-style footboard',
      case: 'Included hard case'
    },
    priceEur: 450,
    priceUsd: 486,
    drummerIds: [1, 3, 7, 15, 16, 13]
  },
  {
    id: 2,
    slug: 'meinl-byzance-series-cymbals',
    name: 'Meinl Byzance Series Cymbals',
    category: 'cymbals',
    brand: 'Meinl',
    description: 'Meinl Byzance cymbals are hand-hammered in Turkey using traditional B20 bronze alloy. The series offers a wide range of sounds from dark and trashy to bright and cutting. Popular with progressive and extreme metal drummers for their complex overtones and dynamic response.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Cymbal_Hammering.JPG',
    specs: {
      material: 'B20 Bronze',
      finish: 'Traditional/Brilliant/Extra Dry',
      manufacturing: 'Hand-hammered',
      origin: 'Turkey'
    },
    priceEur: 2400,
    priceUsd: 2592,
    drummerIds: [15, 16, 17, 18, 20]
  },
  {
    id: 3,
    slug: 'paiste-rude-series-cymbals',
    name: 'Paiste RUDE Series Cymbals',
    category: 'cymbals',
    brand: 'Paiste',
    description: 'Paiste RUDE cymbals are designed specifically for heavy hitting drummers. Made from CuSn8 bronze (2002 Bronze), they deliver cutting, aggressive tones that cut through the loudest stage volumes. A staple in thrash and death metal drumming since the 1980s.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/SABIAN_Paragon_Ride_Limited_Edition_Steampunk.jpg',
    specs: {
      material: 'CuSn8 Bronze (2002 Bronze)',
      finish: 'Colored finish (various)',
      manufacturing: 'Machine-made',
      origin: 'Switzerland'
    },
    priceEur: 2000,
    priceUsd: 2160,
    drummerIds: [2, 4, 12, 19]
  },
  {
    id: 4,
    slug: 'zildjian-a-custom-series-cymbals',
    name: 'Zildjian A Custom Series Cymbals',
    category: 'cymbals',
    brand: 'Zildjian',
    description: 'The Zildjian A Custom series delivers bright, cutting tones with a quick response. Created with a proprietary process that includes machine hammering and brilliant finishing, A Customs have become a standard in rock and metal drumming for their projection and clarity.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Zildjian_Quick_Beat_Hi_Hat_15.jpg',
    specs: {
      material: 'B20 Bronze',
      finish: 'Brilliant',
      manufacturing: 'Machine-hammered',
      origin: 'USA'
    },
    priceEur: 2200,
    priceUsd: 2376,
    drummerIds: [1, 3, 6, 10]
  },
  {
    id: 5,
    slug: 'vic-firth-american-classic-5b',
    name: 'Vic Firth American Classic 5B Drumsticks',
    category: 'sticks',
    brand: 'Vic Firth',
    description: 'The Vic Firth American Classic 5B is one of the most popular drumstick models in the world. Slightly larger than a 5A with a bold sound and full feel, the 5B offers excellent balance and durability. The tear drop tip produces a rich, full tone on cymbals.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Plain_wooden_drumsticks.JPG',
    specs: {
      length: '16"',
      diameter: '.595"',
      tip: 'Tear drop wood',
      material: 'Hickory'
    },
    priceEur: 12,
    priceUsd: 13,
    drummerIds: [3, 4, 11, 20]
  },
  {
    id: 6,
    slug: 'pearl-demon-drive-double-pedal',
    name: 'Pearl Demon Drive Double Pedal',
    category: 'hardware',
    brand: 'Pearl',
    description: 'The Pearl Demon Drive is an advanced double bass pedal featuring the innovative NiNjA Bearing technology for ultra-smooth action. With interchangeable cams and click-lock spring tension, it offers unparalleled customization for demanding drummers.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dixon-double-pedal.jpg',
    specs: {
      camType: 'Interchangeable (Direct/Standard)',
      beaterType: 'Demon Beater (switchable)',
      footboard: 'PowerShifter Long Board',
      bearings: 'NiNjA Bearings'
    },
    priceEur: 550,
    priceUsd: 594,
    drummerIds: [2, 4, 18, 19]
  },
  {
    id: 7,
    slug: 'tama-starclassic-walnut-birch-drums',
    name: 'Tama Starclassic Walnut/Birch Drums',
    category: 'drums',
    brand: 'Tama',
    description: 'Tama Starclassic Walnut/Birch drums combine the warmth and low-end of walnut with the attack and projection of birch. This hybrid shell construction delivers a versatile sound suitable for studio and stage, favored by many professional metal drummers.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Acoustic_Drums_Kit_%2829965183378%29.jpg',
    specs: {
      shells: 'Walnut/Birch hybrid',
      plies: '6mm (5-ply)',
      hoops: 'Die-Cast',
      lugs: 'Star-Cast mounting system'
    },
    priceEur: 3800,
    priceUsd: 4104,
    drummerIds: [3, 15, 16]
  },
  {
    id: 8,
    slug: 'pearl-reference-series-drums',
    name: 'Pearl Reference Series Drums',
    category: 'drums',
    brand: 'Pearl',
    description: 'Pearl Reference drums feature the innovative Reference Shell construction with birch, maple, and mahogany plies. Each shell size is specifically designed with optimal wood combinations for that drum\'s role, delivering focused tone and maximum projection.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Acoustic_Drums_Kit_%2829965183378%29.jpg',
    specs: {
      shells: 'Birch/Maple/Mahogany hybrid',
      plies: 'Size-specific',
      hoops: 'MasterCast',
      lugs: 'Reference lug design'
    },
    priceEur: 3500,
    priceUsd: 3780,
    drummerIds: [4, 8, 18]
  },
  {
    id: 9,
    slug: 'sonor-sq2-heavy-beech-drums',
    name: 'Sonor SQ2 Heavy Beech Drums',
    category: 'drums',
    brand: 'Sonor',
    description: 'Sonor SQ2 drums with Heavy Beech shells are custom-built in Germany. The dense beech wood delivers powerful projection and sustain, making them ideal for heavy music. The SQ2 system allows complete customization of shell configurations.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Acoustic_Drums_Kit_%2829965183378%29.jpg',
    specs: {
      shells: 'Heavy Beech',
      plies: '9mm (7-ply)',
      hoops: 'Die-Cast',
      hardware: 'TAR (Tube And Ring) mount'
    },
    priceEur: 5500,
    priceUsd: 5940,
    drummerIds: [5, 14, 20]
  },
  {
    id: 10,
    slug: 'sabian-hhx-series-cymbals',
    name: 'Sabian HHX Series Cymbals',
    category: 'cymbals',
    brand: 'Sabian',
    description: 'Sabian HHX cymbals combine hand-hammering with modern manufacturing for a dark, complex sound. The HHX line offers excellent dynamic range and musical warmth, making them popular with progressive and modern metal drummers.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Avedis_Zildjian_Cymbal.jpg',
    specs: {
      material: 'B20 Bronze',
      finish: 'Natural/Brilliant',
      manufacturing: 'Hand-hammered',
      origin: 'Canada'
    },
    priceEur: 2200,
    priceUsd: 2376,
    drummerIds: [5, 13]
  }
];

// Generate URL-friendly slug from gear name
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category, brand } = req.query;
  let results = gearItems;

  if (category) {
    results = results.filter(g =>
      g.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand) {
    results = results.filter(g =>
      g.brand.toLowerCase().includes(brand.toLowerCase())
    );
  }

  res.status(200).json(results.map(({ id, slug, name, category, brand, image, priceEur, priceUsd }) => ({
    id, slug, name, category, brand, image, priceEur, priceUsd
  })));
}

// Export gear items for use in other files
export { gearItems, generateSlug };
