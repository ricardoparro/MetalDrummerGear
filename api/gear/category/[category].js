// Vercel Serverless Function - Get gear by category
// Issue #339: Individual gear pages for SEO

// Import gear data
const gearItems = [
  {
    id: 1,
    slug: 'tama-iron-cobra-900-double-pedal',
    name: 'Tama Iron Cobra 900 Power Glide Double Pedal',
    category: 'pedals',
    subcategory: 'double-bass-pedals',
    brand: 'Tama',
    description: 'The Tama Iron Cobra 900 is one of the most popular double bass pedals in metal drumming. Known for its smooth Power Glide cam, quick response, and durability, it has been the pedal of choice for many legendary drummers.',
    image: 'https://www.tama.com/usa/products/images/HP900PTWN_main.jpg',
    specs: {
      camType: 'Power Glide',
      beaterType: 'Dual-surface (felt/plastic)',
      footboard: 'Speed Cobra-style footboard',
      case: 'Included hard case'
    },
    priceEur: 450,
    priceUsd: 486,
    drummerCount: 6
  },
  {
    id: 2,
    slug: 'meinl-byzance-series-cymbals',
    name: 'Meinl Byzance Series Cymbals',
    category: 'cymbals',
    subcategory: 'professional-cymbals',
    brand: 'Meinl',
    description: 'Meinl Byzance cymbals are hand-hammered in Turkey using traditional B20 bronze alloy. Popular with progressive and extreme metal drummers for their complex overtones.',
    image: 'https://meinlcymbals.com/images/products/cymbal_byzance.jpg',
    specs: {
      material: 'B20 Bronze',
      finish: 'Traditional/Brilliant/Extra Dry',
      manufacturing: 'Hand-hammered',
      origin: 'Turkey'
    },
    priceEur: 2400,
    priceUsd: 2592,
    drummerCount: 5
  },
  {
    id: 3,
    slug: 'paiste-rude-series-cymbals',
    name: 'Paiste RUDE Series Cymbals',
    category: 'cymbals',
    subcategory: 'professional-cymbals',
    brand: 'Paiste',
    description: 'Paiste RUDE cymbals are designed specifically for heavy hitting drummers. A staple in thrash and death metal drumming since the 1980s.',
    image: 'https://www.paiste.com/images/products/rude.jpg',
    specs: {
      material: 'CuSn8 Bronze (2002 Bronze)',
      finish: 'Colored finish (various)',
      manufacturing: 'Machine-made',
      origin: 'Switzerland'
    },
    priceEur: 2000,
    priceUsd: 2160,
    drummerCount: 4
  },
  {
    id: 4,
    slug: 'zildjian-a-custom-series-cymbals',
    name: 'Zildjian A Custom Series Cymbals',
    category: 'cymbals',
    subcategory: 'professional-cymbals',
    brand: 'Zildjian',
    description: 'The Zildjian A Custom series delivers bright, cutting tones with a quick response. A standard in rock and metal drumming.',
    image: 'https://zildjian.com/images/products/a-custom.jpg',
    specs: {
      material: 'B20 Bronze',
      finish: 'Brilliant',
      manufacturing: 'Machine-hammered',
      origin: 'USA'
    },
    priceEur: 2200,
    priceUsd: 2376,
    drummerCount: 4
  },
  {
    id: 5,
    slug: 'vic-firth-american-classic-5b',
    name: 'Vic Firth American Classic 5B Drumsticks',
    category: 'sticks',
    subcategory: 'wood-tip-sticks',
    brand: 'Vic Firth',
    description: 'The Vic Firth American Classic 5B is one of the most popular drumstick models in the world. Great balance and durability.',
    image: 'https://vicfirth.zildjian.com/images/products/5b.jpg',
    specs: {
      length: '16"',
      diameter: '.595"',
      tip: 'Tear drop wood',
      material: 'Hickory'
    },
    priceEur: 12,
    priceUsd: 13,
    drummerCount: 4
  },
  {
    id: 6,
    slug: 'pearl-demon-drive-double-pedal',
    name: 'Pearl Demon Drive Double Pedal',
    category: 'pedals',
    subcategory: 'double-bass-pedals',
    brand: 'Pearl',
    description: 'The Pearl Demon Drive is an advanced double bass pedal featuring the innovative NiNjA Bearing technology for ultra-smooth action.',
    image: 'https://pearldrum.com/images/products/demon-drive.jpg',
    specs: {
      camType: 'Interchangeable (Direct/Standard)',
      beaterType: 'Demon Beater (switchable)',
      footboard: 'PowerShifter Long Board',
      bearings: 'NiNjA Bearings'
    },
    priceEur: 550,
    priceUsd: 594,
    drummerCount: 4
  },
  {
    id: 7,
    slug: 'tama-starclassic-walnut-birch-drums',
    name: 'Tama Starclassic Walnut/Birch Drums',
    category: 'drums',
    subcategory: 'professional-drum-kits',
    brand: 'Tama',
    description: 'Tama Starclassic Walnut/Birch drums combine the warmth and low-end of walnut with the attack and projection of birch.',
    image: 'https://www.tama.com/images/products/starclassic-wb.jpg',
    specs: {
      shells: 'Walnut/Birch hybrid',
      plies: '6mm (5-ply)',
      hoops: 'Die-Cast',
      lugs: 'Star-Cast mounting system'
    },
    priceEur: 3800,
    priceUsd: 4104,
    drummerCount: 3
  },
  {
    id: 8,
    slug: 'pearl-reference-series-drums',
    name: 'Pearl Reference Series Drums',
    category: 'drums',
    subcategory: 'professional-drum-kits',
    brand: 'Pearl',
    description: 'Pearl Reference drums feature the innovative Reference Shell construction with birch, maple, and mahogany plies.',
    image: 'https://pearldrum.com/images/products/reference.jpg',
    specs: {
      shells: 'Birch/Maple/Mahogany hybrid',
      plies: 'Size-specific',
      hoops: 'MasterCast',
      lugs: 'Reference lug design'
    },
    priceEur: 3500,
    priceUsd: 3780,
    drummerCount: 3
  },
  {
    id: 9,
    slug: 'sonor-sq2-heavy-beech-drums',
    name: 'Sonor SQ2 Heavy Beech Drums',
    category: 'drums',
    subcategory: 'professional-drum-kits',
    brand: 'Sonor',
    description: 'Sonor SQ2 drums with Heavy Beech shells are custom-built in Germany. Ideal for heavy music.',
    image: 'https://www.sonor.com/images/products/sq2.jpg',
    specs: {
      shells: 'Heavy Beech',
      plies: '9mm (7-ply)',
      hoops: 'Die-Cast',
      hardware: 'TAR (Tube And Ring) mount'
    },
    priceEur: 5500,
    priceUsd: 5940,
    drummerCount: 3
  },
  {
    id: 10,
    slug: 'sabian-hhx-series-cymbals',
    name: 'Sabian HHX Series Cymbals',
    category: 'cymbals',
    subcategory: 'professional-cymbals',
    brand: 'Sabian',
    description: 'Sabian HHX cymbals combine hand-hammering with modern manufacturing for a dark, complex sound.',
    image: 'https://www.sabian.com/images/products/hhx.jpg',
    specs: {
      material: 'B20 Bronze',
      finish: 'Natural/Brilliant',
      manufacturing: 'Hand-hammered',
      origin: 'Canada'
    },
    priceEur: 2200,
    priceUsd: 2376,
    drummerCount: 2
  },
  // Add snares for the snare category
  {
    id: 11,
    slug: 'tama-slp-black-brass-snare',
    name: 'Tama SLP Black Brass Snare 14x6.5',
    category: 'snares',
    subcategory: 'metal-snares',
    brand: 'Tama',
    description: 'The Tama SLP Black Brass snare delivers powerful, cutting tones with excellent projection. The black brass shell provides a warm fundamental with bright overtones.',
    image: 'https://www.tama.com/images/products/slp-black-brass.jpg',
    specs: {
      shell: 'Black Brass (1.2mm)',
      size: '14" x 6.5"',
      hoops: 'Die-Cast',
      snareWires: 'Super Sensitive Hi-Carbon'
    },
    priceEur: 650,
    priceUsd: 700,
    drummerCount: 4
  },
  {
    id: 12,
    slug: 'pearl-sensitone-steel-snare',
    name: 'Pearl Sensitone Steel Snare 14x5.5',
    category: 'snares',
    subcategory: 'metal-snares',
    brand: 'Pearl',
    description: 'The Pearl Sensitone Steel snare is a versatile studio workhorse with bright, articulate tones and excellent sensitivity.',
    image: 'https://pearldrum.com/images/products/sensitone-steel.jpg',
    specs: {
      shell: 'Beaded Steel (1.2mm)',
      size: '14" x 5.5"',
      hoops: 'Triple-Flanged',
      snareWires: 'Ultra Sound Snare Wires'
    },
    priceEur: 280,
    priceUsd: 300,
    drummerCount: 3
  }
];

// Category metadata for SEO
const categoryMeta = {
  cymbals: {
    title: 'Metal Cymbals',
    metaTitle: 'Best Cymbals for Metal Drumming - Professional Metal Cymbals Guide',
    description: 'Discover the best cymbals for metal drumming. From crashes to rides, hi-hats to chinas - explore professional cymbal setups used by legendary metal drummers.',
    longDescription: 'Professional metal drummers demand cymbals that can cut through distorted guitars and deliver the power and projection needed for heavy music. From the dark, complex tones of hand-hammered B20 bronze to the bright, cutting attack of brilliant finishes, the right cymbal setup can define your sound.',
    icon: '🥁',
    keywords: ['metal cymbals', 'heavy metal drumming', 'crash cymbals', 'ride cymbals', 'hi-hats', 'china cymbals', 'B20 bronze', 'cymbal setup']
  },
  snares: {
    title: 'Metal Snare Drums',
    metaTitle: 'Best Snare Drums for Metal - Professional Metal Snare Guide',
    description: 'Find the perfect snare drum for metal. Compare steel, brass, and wood snares used by professional metal drummers for that powerful, cutting crack.',
    longDescription: 'The snare drum is the heartbeat of metal drumming. Metal snares deliver the cutting crack and projection needed to punch through heavy mixes, while wood snares offer warmth and body. Many metal drummers use deep snares (6.5"+) for maximum power and low-end punch.',
    icon: '🥁',
    keywords: ['metal snare drums', 'steel snare', 'brass snare', 'wood snare', 'deep snare', 'metal drumming']
  },
  drums: {
    title: 'Metal Drum Kits',
    metaTitle: 'Best Drum Kits for Metal - Professional Metal Drums Guide',
    description: 'Explore professional drum kits used by metal drummers. From Tama Starclassic to Sonor SQ2, find the perfect drums for heavy music.',
    longDescription: 'Professional metal drum kits need to deliver power, projection, and durability. The best metal drums feature dense hardwood shells, reinforced hoops, and mounting systems designed for double bass configurations. Explore the kits that define the sound of metal.',
    icon: '🥁',
    keywords: ['metal drum kits', 'professional drums', 'drum shells', 'maple drums', 'birch drums', 'metal drumming']
  },
  pedals: {
    title: 'Metal Bass Drum Pedals',
    metaTitle: 'Best Bass Drum Pedals for Metal - Double Bass Pedal Guide',
    description: 'Compare the best bass drum pedals for metal drumming. Double pedals, speed pedals, and direct drive options used by pro metal drummers.',
    longDescription: 'Double bass drumming is the foundation of metal. Professional metal drummers need pedals that offer speed, power, and reliability. From the smooth action of the Tama Iron Cobra to the precision of direct drive pedals, the right bass drum pedal can unlock your speed potential.',
    icon: '🦶',
    keywords: ['double bass pedals', 'bass drum pedals', 'metal drumming', 'speed pedals', 'direct drive', 'chain drive', 'double kick']
  },
  sticks: {
    title: 'Metal Drumsticks',
    metaTitle: 'Best Drumsticks for Metal - Heavy Duty Drumstick Guide',
    description: 'Find the perfect drumsticks for metal. Heavy-hitting sticks, signature models, and durable options used by professional metal drummers.',
    longDescription: 'Metal drumming demands sticks that can handle hard-hitting, fast playing without breaking. From heavy 2B and 5B models to signature sticks from metal legends, the right drumsticks provide the power, balance, and durability for demanding performances.',
    icon: '🥢',
    keywords: ['metal drumsticks', 'heavy drumsticks', '5B sticks', '2B sticks', 'signature sticks', 'durable drumsticks']
  },
  hardware: {
    title: 'Metal Drum Hardware',
    metaTitle: 'Best Drum Hardware for Metal - Professional Hardware Guide',
    description: 'Explore professional drum hardware for metal. Hi-hat stands, cymbal stands, thrones, and rack systems built for heavy use.',
    longDescription: 'Professional metal drumming requires heavy-duty hardware that can withstand aggressive playing. From double-braced stands to rack systems, the right hardware keeps your kit stable and secure during the most intense performances.',
    icon: '🔩',
    keywords: ['drum hardware', 'hi-hat stands', 'cymbal stands', 'drum throne', 'rack system', 'metal drumming hardware']
  }
};

// Get brands for a category
function getBrandsForCategory(category) {
  const categoryGear = gearItems.filter(g => g.category === category);
  const brands = [...new Set(categoryGear.map(g => g.brand))].sort();
  return brands;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { category, brand, sort } = req.query;

  // Normalize category (handle legacy 'hardware' -> 'pedals' mapping)
  const normalizedCategory = category === 'hardware' ? 'pedals' : category;

  // Check if category exists
  if (!categoryMeta[normalizedCategory]) {
    return res.status(404).json({ 
      error: 'Category not found',
      availableCategories: Object.keys(categoryMeta)
    });
  }

  // Filter gear by category
  let results = gearItems.filter(g => g.category === normalizedCategory);

  // Filter by brand if specified
  if (brand) {
    results = results.filter(g => g.brand.toLowerCase() === brand.toLowerCase());
  }

  // Sort results
  if (sort === 'price-asc') {
    results = results.sort((a, b) => a.priceEur - b.priceEur);
  } else if (sort === 'price-desc') {
    results = results.sort((a, b) => b.priceEur - a.priceEur);
  } else if (sort === 'popularity') {
    results = results.sort((a, b) => b.drummerCount - a.drummerCount);
  } else {
    // Default: sort by drummer count (popularity)
    results = results.sort((a, b) => b.drummerCount - a.drummerCount);
  }

  // Get available brands for filtering
  const availableBrands = getBrandsForCategory(normalizedCategory);

  // Return category data with metadata
  res.status(200).json({
    category: normalizedCategory,
    meta: categoryMeta[normalizedCategory],
    brands: availableBrands,
    itemCount: results.length,
    items: results.map(({ id, slug, name, brand, image, priceEur, priceUsd, drummerCount, description }) => ({
      id, slug, name, brand, image, priceEur, priceUsd, drummerCount,
      shortDescription: description.substring(0, 120) + '...'
    }))
  });
}

// Export for sitemap
export { categoryMeta, gearItems };
