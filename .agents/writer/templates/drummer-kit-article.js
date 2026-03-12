/**
 * Template: What's In [Drummer]'s Kit
 * 
 * Use this template to generate drummer kit articles.
 * Fill in from drummer data + research.
 */

export function generateDrummerKitArticle(drummer, additionalInfo = {}) {
  const slug = `whats-in-${drummer.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-kit`;
  const year = new Date().getFullYear();
  
  return {
    slug,
    type: 'drummer-kit',
    isArticle: true,
    datePublished: new Date().toISOString().split('T')[0],
    dateModified: new Date().toISOString().split('T')[0],
    author: 'MetalForge Editorial',
    
    // SEO
    title: `What's In ${drummer.name}'s Kit (${year} Setup)`,
    description: `Complete breakdown of ${drummer.name}'s drum kit setup. Discover the exact drums, cymbals, and gear ${drummer.name} from ${drummer.band} uses, plus where to buy similar equipment.`,
    seoKeywords: [
      `${drummer.name.toLowerCase()} drum kit`,
      `${drummer.name.toLowerCase()} setup`,
      `${drummer.name.toLowerCase()} gear`,
      `${drummer.band.toLowerCase()} drummer`,
      `${drummer.name.toLowerCase()} ${year}`,
    ],
    ogImage: drummer.image || `/images/drummers/${slug}.webp`,
    
    // Article Data
    drummer: drummer.name,
    drummerId: drummer.id,
    band: drummer.band,
    genre: drummer.genre,
    
    // Content Sections
    intro: {
      title: `Inside ${drummer.name}'s World-Class Setup`,
      content: generateIntro(drummer, additionalInfo),
      keyPoints: [
        `Current primary kit: ${drummer.gear?.drums || 'See below'}`,
        `Cymbal brand: ${extractBrand(drummer.gear?.cymbals)}`,
        `Signature endorsements: ${drummer.endorsements?.map(e => e.name).join(', ') || 'Various'}`,
        `Years active: ${additionalInfo.yearsActive || 'Multiple decades'}`,
      ]
    },
    
    // Drum Kit Section
    drumKit: {
      title: `${drummer.name}'s Drum Kit`,
      brand: extractBrand(drummer.gear?.drums),
      model: drummer.gear?.drums || '',
      shells: additionalInfo.shells || 'Maple shells',
      sizes: additionalInfo.drumSizes || {
        kick: '22"',
        snare: '14"',
        toms: ['12"', '13"'],
        floorToms: ['16"'],
      },
      description: generateDrumKitDescription(drummer, additionalInfo),
    },
    
    // Snare Section
    snare: {
      title: 'Snare Drum',
      model: drummer.gear?.snare || '',
      specs: additionalInfo.snareSpecs || '',
      description: generateSnareDescription(drummer, additionalInfo),
    },
    
    // Cymbals Section
    cymbals: {
      title: 'Cymbal Setup',
      brand: extractBrand(drummer.gear?.cymbals),
      series: drummer.gear?.cymbals || '',
      setup: additionalInfo.cymbalSetup || [
        { type: 'Hi-Hats', model: '14"' },
        { type: 'Crashes', model: '16", 18"' },
        { type: 'Ride', model: '20"' },
      ],
      description: generateCymbalDescription(drummer, additionalInfo),
    },
    
    // Hardware Section
    hardware: {
      title: 'Hardware & Pedals',
      pedals: drummer.gear?.sticks?.includes('Pedal') ? drummer.gear.sticks : additionalInfo.pedals || '',
      hardware: drummer.gear?.hardware || '',
      items: additionalInfo.hardwareItems || [],
      description: generateHardwareDescription(drummer, additionalInfo),
    },
    
    // Evolution Section
    evolution: {
      title: 'How The Setup Evolved',
      description: additionalInfo.evolutionDescription || `${drummer.name}'s setup has evolved over the years as their playing style and band's sound developed.`,
      timeline: additionalInfo.timeline || [],
    },
    
    // Where to Buy
    whereToBuy: {
      title: 'Get Similar Gear',
      description: `Looking to achieve a similar sound to ${drummer.name}? Here are some options:`,
      items: generateBuyingGuide(drummer),
    },
    
    // Related Content
    relatedDrummers: findRelatedDrummers(drummer),
    relatedAlbums: additionalInfo.relatedAlbums || [],
    
    // Schema.org data
    schema: {
      '@type': 'Article',
      'headline': `What's In ${drummer.name}'s Kit (${year} Setup)`,
      'author': {
        '@type': 'Organization',
        'name': 'MetalForge'
      }
    }
  };
}

// Helper functions

function generateIntro(drummer, info) {
  return `${drummer.name} is one of the most influential drummers in ${drummer.genre || 'metal'}. As the drummer for ${drummer.band}, they've developed a signature sound that countless drummers try to emulate.

In this article, we break down exactly what gear ${drummer.name} uses — from drums to cymbals to hardware — so you can understand what goes into creating that legendary sound.

${info.additionalIntro || ''}`;
}

function generateDrumKitDescription(drummer, info) {
  const brand = extractBrand(drummer.gear?.drums);
  return `${drummer.name} plays ${drummer.gear?.drums || 'a professional-level kit'}. ${brand ? `${brand} drums are known for their ${getBrandCharacteristics(brand)}.` : ''} ${info.drumKitNotes || ''}`;
}

function generateSnareDescription(drummer, info) {
  return `The snare drum is crucial for ${drummer.genre || 'metal'} drumming, and ${drummer.name}'s choice reflects that. ${drummer.gear?.snare ? `The ${drummer.gear.snare} delivers the punch needed for this style.` : ''} ${info.snareNotes || ''}`;
}

function generateCymbalDescription(drummer, info) {
  const brand = extractBrand(drummer.gear?.cymbals);
  return `${drummer.name} uses ${drummer.gear?.cymbals || 'professional-grade cymbals'}. ${brand ? `${brand} cymbals are favored in metal for their ${getCymbalBrandCharacteristics(brand)}.` : ''} ${info.cymbalNotes || ''}`;
}

function generateHardwareDescription(drummer, info) {
  return `Professional-grade hardware is essential for metal drumming. ${drummer.name} relies on ${drummer.gear?.hardware || 'top-tier hardware'} to withstand intense playing. ${info.hardwareNotes || ''}`;
}

function generateBuyingGuide(drummer) {
  const items = [];
  
  if (drummer.gear?.drums) {
    items.push({
      category: 'Drums',
      item: drummer.gear.drums,
      note: 'Or similar from the same brand',
    });
  }
  
  if (drummer.gear?.cymbals) {
    items.push({
      category: 'Cymbals', 
      item: drummer.gear.cymbals,
      note: 'Start with hi-hats and ride, add crashes later',
    });
  }
  
  if (drummer.gear?.snare) {
    items.push({
      category: 'Snare',
      item: drummer.gear.snare,
      note: 'The heart of the kit',
    });
  }
  
  return items;
}

function findRelatedDrummers(drummer) {
  // Would query database for similar genre/band drummers
  // Returns array of drummer IDs
  return [];
}

function extractBrand(gearString) {
  if (!gearString) return '';
  const brands = ['Tama', 'Pearl', 'DW', 'Sonor', 'Mapex', 'Ludwig', 'Zildjian', 'Sabian', 'Paiste', 'Meinl'];
  for (const brand of brands) {
    if (gearString.toLowerCase().includes(brand.toLowerCase())) {
      return brand;
    }
  }
  return '';
}

function getBrandCharacteristics(brand) {
  const characteristics = {
    'Tama': 'punchy attack and clear tone',
    'Pearl': 'versatile sound and reliable construction',
    'DW': 'premium quality and exceptional resonance',
    'Sonor': 'warm European tone and precise engineering',
    'Mapex': 'aggressive sound at great value',
    'Ludwig': 'classic American tone and heritage',
  };
  return characteristics[brand] || 'professional quality';
}

function getCymbalBrandCharacteristics(brand) {
  const characteristics = {
    'Zildjian': 'bright, cutting tone that projects in heavy mixes',
    'Sabian': 'versatile sound suitable for many styles',
    'Paiste': 'consistent tone and precise manufacturing',
    'Meinl': 'dark, complex sounds favored in progressive metal',
  };
  return characteristics[brand] || 'professional-grade tone';
}

export default generateDrummerKitArticle;
