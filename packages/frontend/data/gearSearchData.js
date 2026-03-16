/**
 * Gear Search Data Module - Issue #719
 * Searchable gear database for finding drummers by equipment brand/type
 */

// ==========================================
// GEAR DATABASE - All searchable gear items
// ==========================================

export const GEAR_DATABASE = {
  drums: [
    { id: 'tama-starclassic-maple', name: 'Tama Starclassic Maple', brand: 'tama', category: 'drums', tier: 'pro', price: 3500, keywords: ['maple', 'starclassic', 'tama'] },
    { id: 'tama-starclassic-bubinga', name: 'Tama Starclassic Bubinga', brand: 'tama', category: 'drums', tier: 'pro', price: 4200, keywords: ['bubinga', 'starclassic', 'tama'] },
    { id: 'tama-starclassic-walnut-birch', name: 'Tama Starclassic Walnut/Birch', brand: 'tama', category: 'drums', tier: 'pro', price: 3800, keywords: ['walnut', 'birch', 'starclassic', 'tama'] },
    { id: 'tama-superstar-classic', name: 'Tama Superstar Classic', brand: 'tama', category: 'drums', tier: 'mid', price: 1200, keywords: ['superstar', 'tama', 'classic'] },
    { id: 'pearl-reference-pure', name: 'Pearl Reference Pure', brand: 'pearl', category: 'drums', tier: 'pro', price: 3500, keywords: ['reference', 'pure', 'maple', 'pearl'] },
    { id: 'pearl-reference-series', name: 'Pearl Reference Series', brand: 'pearl', category: 'drums', tier: 'pro', price: 3200, keywords: ['reference', 'pearl'] },
    { id: 'pearl-masterworks', name: 'Pearl Masterworks Stadium Exotic', brand: 'pearl', category: 'drums', tier: 'pro', price: 4800, keywords: ['masterworks', 'exotic', 'stadium', 'pearl'] },
    { id: 'pearl-masters', name: 'Pearl Masters Premium Maple', brand: 'pearl', category: 'drums', tier: 'pro', price: 3200, keywords: ['masters', 'maple', 'premium', 'pearl'] },
    { id: 'pearl-session-studio', name: 'Pearl Session Studio Select', brand: 'pearl', category: 'drums', tier: 'mid', price: 1800, keywords: ['session', 'studio', 'pearl'] },
    { id: 'sonor-sq2', name: 'Sonor SQ2 Heavy Beech', brand: 'sonor', category: 'drums', tier: 'pro', price: 5500, keywords: ['sq2', 'beech', 'sonor', 'heavy'] },
    { id: 'sonor-sq1', name: 'Sonor SQ1', brand: 'sonor', category: 'drums', tier: 'mid', price: 2500, keywords: ['sq1', 'sonor'] },
    { id: 'sonor-prolite', name: 'Sonor ProLite', brand: 'sonor', category: 'drums', tier: 'mid', price: 2200, keywords: ['prolite', 'sonor'] },
    { id: 'dw-collectors', name: "DW Collector's Series Maple", brand: 'dw', category: 'drums', tier: 'pro', price: 5000, keywords: ['collectors', 'maple', 'dw', 'custom'] },
    { id: 'dw-performance', name: 'DW Performance Series', brand: 'dw', category: 'drums', tier: 'mid', price: 2500, keywords: ['performance', 'dw'] },
    { id: 'mapex-saturn', name: 'Mapex Saturn V MH Exotic', brand: 'mapex', category: 'drums', tier: 'mid', price: 2600, keywords: ['saturn', 'exotic', 'mapex', 'mh'] },
    { id: 'mapex-armory', name: 'Mapex Armory Series', brand: 'mapex', category: 'drums', tier: 'mid', price: 1500, keywords: ['armory', 'mapex'] },
    { id: 'ddrum-vinnie', name: 'ddrum Vinnie Paul Signature', brand: 'ddrum', category: 'drums', tier: 'mid', price: 2800, keywords: ['vinnie', 'paul', 'signature', 'ddrum'] },
    { id: 'sjc-custom', name: 'SJC Custom Drums', brand: 'sjc', category: 'drums', tier: 'pro', price: 3500, keywords: ['sjc', 'custom'] },
    { id: 'ludwig-classic-maple', name: 'Ludwig Classic Maple', brand: 'ludwig', category: 'drums', tier: 'pro', price: 3200, keywords: ['ludwig', 'classic', 'maple'] },
    { id: 'ludwig-legacy', name: 'Ludwig Legacy Mahogany', brand: 'ludwig', category: 'drums', tier: 'pro', price: 4000, keywords: ['ludwig', 'legacy', 'mahogany'] },
    { id: 'gretsch-usa-custom', name: 'Gretsch USA Custom', brand: 'gretsch', category: 'drums', tier: 'pro', price: 4500, keywords: ['gretsch', 'usa', 'custom'] },
    { id: 'yamaha-recording-custom', name: 'Yamaha Recording Custom', brand: 'yamaha', category: 'drums', tier: 'pro', price: 3500, keywords: ['yamaha', 'recording', 'custom'] },
  ],
  snare: [
    { id: 'tama-lars-ulrich', name: 'Tama LU1465 Lars Ulrich Signature 14x6.5"', brand: 'tama', category: 'snare', tier: 'pro', price: 650, keywords: ['lars', 'ulrich', 'signature', 'tama'] },
    { id: 'tama-slp', name: 'Tama S.L.P. 14x6.5" G-Maple', brand: 'tama', category: 'snare', tier: 'mid', price: 450, keywords: ['slp', 'maple', 'tama'] },
    { id: 'tama-bell-brass', name: 'Tama Bell Brass 14x5.5"', brand: 'tama', category: 'snare', tier: 'pro', price: 800, keywords: ['bell', 'brass', 'tama'] },
    { id: 'tama-metalworks', name: 'Tama Metalworks 14x5.5"', brand: 'tama', category: 'snare', tier: 'budget', price: 200, keywords: ['metalworks', 'tama', 'steel'] },
    { id: 'pearl-sensitone', name: 'Pearl Sensitone Elite 14x5"', brand: 'pearl', category: 'snare', tier: 'mid', price: 400, keywords: ['sensitone', 'elite', 'pearl'] },
    { id: 'pearl-joey', name: 'Pearl Joey Jordison Signature 13x6.5"', brand: 'pearl', category: 'snare', tier: 'mid', price: 480, keywords: ['joey', 'jordison', 'signature', 'pearl'] },
    { id: 'pearl-kollias', name: 'Pearl George Kollias Signature 14x6.5"', brand: 'pearl', category: 'snare', tier: 'mid', price: 520, keywords: ['george', 'kollias', 'signature', 'pearl'] },
    { id: 'sonor-haake', name: 'Sonor Tomas Haake Signature 14x6.5"', brand: 'sonor', category: 'snare', tier: 'pro', price: 700, keywords: ['tomas', 'haake', 'signature', 'sonor'] },
    { id: 'sonor-danny', name: 'Sonor Danny Carey Signature 14x8" Bronze', brand: 'sonor', category: 'snare', tier: 'pro', price: 750, keywords: ['danny', 'carey', 'signature', 'bronze', 'sonor'] },
    { id: 'ludwig-black-beauty', name: 'Ludwig Black Beauty 14x6.5"', brand: 'ludwig', category: 'snare', tier: 'pro', price: 900, keywords: ['black', 'beauty', 'ludwig', 'brass'] },
    { id: 'ludwig-supraphonic', name: 'Ludwig Supraphonic 14x6.5"', brand: 'ludwig', category: 'snare', tier: 'pro', price: 600, keywords: ['supraphonic', 'ludwig', 'chrome'] },
    { id: 'dw-collectors-snare', name: "DW Collector's Maple Snare 14x6\"", brand: 'dw', category: 'snare', tier: 'pro', price: 700, keywords: ['collectors', 'maple', 'dw'] },
  ],
  cymbals: [
    { id: 'zildjian-a-custom', name: 'Zildjian A Custom Series', brand: 'zildjian', category: 'cymbals', tier: 'pro', price: 2200, keywords: ['a custom', 'zildjian', 'brilliant'] },
    { id: 'zildjian-k-custom', name: 'Zildjian K Custom Series', brand: 'zildjian', category: 'cymbals', tier: 'pro', price: 2500, keywords: ['k custom', 'dark', 'zildjian'] },
    { id: 'zildjian-a', name: 'Zildjian A Series', brand: 'zildjian', category: 'cymbals', tier: 'pro', price: 1800, keywords: ['a series', 'zildjian', 'classic'] },
    { id: 'zildjian-s', name: 'Zildjian S Family', brand: 'zildjian', category: 'cymbals', tier: 'mid', price: 800, keywords: ['s family', 'zildjian'] },
    { id: 'paiste-rude', name: 'Paiste RUDE Series', brand: 'paiste', category: 'cymbals', tier: 'pro', price: 2000, keywords: ['rude', 'paiste', 'loud', 'aggressive'] },
    { id: 'paiste-2002', name: 'Paiste 2002 Series', brand: 'paiste', category: 'cymbals', tier: 'pro', price: 2000, keywords: ['2002', 'paiste', 'classic'] },
    { id: 'paiste-signature', name: 'Paiste Signature Series', brand: 'paiste', category: 'cymbals', tier: 'pro', price: 2800, keywords: ['signature', 'paiste', 'precision'] },
    { id: 'paiste-pst7', name: 'Paiste PST 7', brand: 'paiste', category: 'cymbals', tier: 'mid', price: 600, keywords: ['pst', 'paiste'] },
    { id: 'sabian-hhx', name: 'Sabian HHX Series', brand: 'sabian', category: 'cymbals', tier: 'pro', price: 2200, keywords: ['hhx', 'sabian', 'evolution'] },
    { id: 'sabian-aax', name: 'Sabian AAX Series', brand: 'sabian', category: 'cymbals', tier: 'mid', price: 1800, keywords: ['aax', 'sabian', 'bright'] },
    { id: 'sabian-b8x', name: 'Sabian B8X Series', brand: 'sabian', category: 'cymbals', tier: 'budget', price: 400, keywords: ['b8x', 'sabian', 'beginner'] },
    { id: 'meinl-byzance', name: 'Meinl Byzance Series', brand: 'meinl', category: 'cymbals', tier: 'pro', price: 2400, keywords: ['byzance', 'meinl', 'dark', 'hand-hammered'] },
    { id: 'meinl-classics', name: 'Meinl Classics Custom', brand: 'meinl', category: 'cymbals', tier: 'mid', price: 1200, keywords: ['classics', 'custom', 'meinl'] },
    { id: 'meinl-hcs', name: 'Meinl HCS', brand: 'meinl', category: 'cymbals', tier: 'budget', price: 300, keywords: ['hcs', 'meinl', 'beginner'] },
  ],
  hardware: [
    { id: 'tama-iron-cobra', name: 'Tama Iron Cobra 900 Double Pedal', brand: 'tama', category: 'hardware', tier: 'pro', price: 450, keywords: ['iron cobra', 'tama', 'pedal', 'double'] },
    { id: 'tama-speed-cobra', name: 'Tama Speed Cobra 910 Double Pedal', brand: 'tama', category: 'hardware', tier: 'pro', price: 500, keywords: ['speed cobra', 'tama', 'pedal'] },
    { id: 'tama-dyna-sync', name: 'Tama Dyna-Sync Double Pedal', brand: 'tama', category: 'hardware', tier: 'pro', price: 550, keywords: ['dyna-sync', 'tama', 'direct drive'] },
    { id: 'pearl-demon-drive', name: 'Pearl Demon Drive Double Pedal', brand: 'pearl', category: 'hardware', tier: 'pro', price: 550, keywords: ['demon drive', 'pearl', 'direct'] },
    { id: 'pearl-eliminator', name: 'Pearl Eliminator Redline Double Pedal', brand: 'pearl', category: 'hardware', tier: 'mid', price: 400, keywords: ['eliminator', 'redline', 'pearl'] },
    { id: 'dw-9000', name: 'DW 9000 Series Double Pedal', brand: 'dw', category: 'hardware', tier: 'pro', price: 700, keywords: ['9000', 'dw', 'precision'] },
    { id: 'dw-5000', name: 'DW 5000 Series Double Pedal', brand: 'dw', category: 'hardware', tier: 'mid', price: 500, keywords: ['5000', 'dw'] },
    { id: 'sonor-giant', name: 'Sonor Giant Step Twin Effect Double Pedal', brand: 'sonor', category: 'hardware', tier: 'pro', price: 650, keywords: ['giant step', 'twin', 'sonor'] },
    { id: 'mapex-falcon', name: 'Mapex Falcon Double Pedal', brand: 'mapex', category: 'hardware', tier: 'mid', price: 450, keywords: ['falcon', 'mapex'] },
    { id: 'axis-a', name: 'Axis A Series Longboard Double Pedal', brand: 'axis', category: 'hardware', tier: 'pro', price: 800, keywords: ['axis', 'longboard', 'direct drive'] },
  ],
  sticks: [
    { id: 'ahead-lars', name: 'Ahead Lars Ulrich Signature', brand: 'ahead', category: 'sticks', tier: 'mid', price: 45, keywords: ['lars', 'ulrich', 'ahead', 'aluminum'] },
    { id: 'promark-joey', name: 'Promark Joey Jordison Signature TX515W', brand: 'promark', category: 'sticks', tier: 'budget', price: 15, keywords: ['joey', 'jordison', 'promark'] },
    { id: 'promark-lombardo', name: 'Promark Dave Lombardo Signature', brand: 'promark', category: 'sticks', tier: 'budget', price: 15, keywords: ['dave', 'lombardo', 'promark'] },
    { id: 'vicfirth-kollias', name: 'Vic Firth George Kollias Signature', brand: 'vicfirth', category: 'sticks', tier: 'budget', price: 15, keywords: ['george', 'kollias', 'vic firth'] },
    { id: 'vicfirth-haake', name: 'Vic Firth Tomas Haake Signature', brand: 'vicfirth', category: 'sticks', tier: 'budget', price: 15, keywords: ['tomas', 'haake', 'vic firth'] },
    { id: 'vicfirth-5a', name: 'Vic Firth American Classic 5A', brand: 'vicfirth', category: 'sticks', tier: 'budget', price: 12, keywords: ['5a', 'american', 'classic', 'vic firth'] },
    { id: 'vicfirth-5b', name: 'Vic Firth American Classic 5B', brand: 'vicfirth', category: 'sticks', tier: 'budget', price: 12, keywords: ['5b', 'american', 'classic', 'vic firth'] },
    { id: 'vater-5a', name: 'Vater Hickory 5A', brand: 'vater', category: 'sticks', tier: 'budget', price: 12, keywords: ['5a', 'hickory', 'vater'] },
  ],
};

// ==========================================
// DRUMMER-GEAR MAPPINGS
// ==========================================

export const DRUMMER_GEAR = {
  'lars-ulrich': {
    drums: ['tama-starclassic-maple'],
    snare: ['tama-lars-ulrich'],
    cymbals: ['zildjian-a-custom'],
    hardware: ['tama-iron-cobra'],
    sticks: ['ahead-lars'],
  },
  'joey-jordison': {
    drums: ['pearl-reference-series'],
    snare: ['pearl-joey'],
    cymbals: ['paiste-rude'],
    hardware: ['pearl-demon-drive'],
    sticks: ['promark-joey'],
  },
  'gene-hoglan': {
    drums: ['pearl-reference-pure'],
    snare: ['pearl-sensitone'],
    cymbals: ['sabian-aax'],
    hardware: ['pearl-demon-drive'],
    sticks: ['vicfirth-5b'],
  },
  'dave-lombardo': {
    drums: ['tama-starclassic-maple'],
    snare: ['tama-slp'],
    cymbals: ['paiste-rude'],
    hardware: ['tama-iron-cobra'],
    sticks: ['promark-lombardo'],
  },
  'tomas-haake': {
    drums: ['sonor-sq2'],
    snare: ['sonor-haake'],
    cymbals: ['sabian-hhx'],
    hardware: ['tama-speed-cobra'],
    sticks: ['vicfirth-haake'],
  },
  'george-kollias': {
    drums: ['pearl-masterworks'],
    snare: ['pearl-kollias'],
    cymbals: ['zildjian-a-custom'],
    hardware: ['pearl-demon-drive'],
    sticks: ['vicfirth-kollias'],
  },
  'eloy-casagrande': {
    drums: ['tama-starclassic-bubinga'],
    snare: ['tama-bell-brass'],
    cymbals: ['paiste-2002'],
    hardware: ['tama-speed-cobra'],
    sticks: ['promark-joey'],
  },
  'ray-luzier': {
    drums: ['pearl-reference-series'],
    snare: ['pearl-sensitone'],
    cymbals: ['zildjian-a-custom'],
    hardware: ['pearl-demon-drive'],
    sticks: ['vicfirth-5a'],
  },
  'john-otto': {
    drums: ['pearl-reference-series'],
    snare: ['pearl-sensitone'],
    cymbals: ['zildjian-a-custom'],
    hardware: ['pearl-eliminator'],
    sticks: ['vicfirth-5b'],
  },
  'jay-weinberg': {
    drums: ['sjc-custom'],
    snare: ['tama-slp'],
    cymbals: ['zildjian-k-custom'],
    hardware: ['dw-9000'],
    sticks: ['vater-5a'],
  },
  'vinnie-paul': {
    drums: ['ddrum-vinnie'],
    snare: ['tama-slp'],
    cymbals: ['sabian-aax'],
    hardware: ['dw-5000'],
    sticks: ['vicfirth-5b'],
  },
  'charlie-benante': {
    drums: ['tama-starclassic-maple'],
    snare: ['tama-slp'],
    cymbals: ['paiste-rude'],
    hardware: ['tama-iron-cobra'],
    sticks: ['vicfirth-5a'],
  },
  'mike-portnoy': {
    drums: ['tama-starclassic-maple'],
    snare: ['tama-slp'],
    cymbals: ['sabian-hhx'],
    hardware: ['tama-iron-cobra'],
    sticks: ['promark-joey'],
  },
  'danny-carey': {
    drums: ['sonor-sq2'],
    snare: ['sonor-danny'],
    cymbals: ['paiste-signature'],
    hardware: ['sonor-giant'],
    sticks: ['vicfirth-5b'],
  },
  'mario-duplantier': {
    drums: ['tama-starclassic-walnut-birch'],
    snare: ['tama-slp'],
    cymbals: ['meinl-byzance'],
    hardware: ['tama-speed-cobra'],
    sticks: ['vicfirth-5a'],
  },
  'brann-dailor': {
    drums: ['dw-collectors'],
    snare: ['dw-collectors-snare'],
    cymbals: ['meinl-byzance'],
    hardware: ['dw-9000'],
    sticks: ['vicfirth-5a'],
  },
  'chris-adler': {
    drums: ['mapex-saturn'],
    snare: ['tama-slp'],
    cymbals: ['meinl-byzance'],
    hardware: ['mapex-falcon'],
    sticks: ['vicfirth-5b'],
  },
  'matt-halpern': {
    drums: ['pearl-masters'],
    snare: ['pearl-sensitone'],
    cymbals: ['meinl-byzance'],
    hardware: ['pearl-eliminator'],
    sticks: ['vicfirth-5a'],
  },
};

// ==========================================
// BRAND METADATA FOR SEO PAGES
// ==========================================

export const BRAND_SEO_DATA = {
  // Drum Brands
  tama: {
    slug: 'tama',
    name: 'Tama',
    type: 'drums',
    icon: '🥁',
    color: '#e11d48',
    country: 'Japan',
    founded: '1974',
    description: 'Japanese drum manufacturer known for precision engineering and innovation.',
    metaTitle: 'Metal Drummers Who Use Tama | MetalForge Gear Search',
    metaDescription: 'Discover which legendary metal drummers play Tama drums. From Lars Ulrich to Dave Lombardo, explore their Tama setups and gear.',
    keywords: ['tama drums', 'tama metal drummers', 'tama starclassic', 'lars ulrich drums'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=tama+drums&tag=metalforge',
  },
  pearl: {
    slug: 'pearl',
    name: 'Pearl',
    type: 'drums',
    icon: '🥁',
    color: '#0ea5e9',
    country: 'Japan',
    founded: '1946',
    description: "One of the world's largest drum manufacturers, known for innovation and quality.",
    metaTitle: 'Metal Drummers Who Use Pearl | MetalForge Gear Search',
    metaDescription: 'Explore which metal drummers play Pearl drums. From Joey Jordison to George Kollias, discover their Pearl setups.',
    keywords: ['pearl drums', 'pearl metal drummers', 'pearl reference', 'joey jordison drums'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=pearl+drums&tag=metalforge',
  },
  sonor: {
    slug: 'sonor',
    name: 'Sonor',
    type: 'drums',
    icon: '🥁',
    color: '#8b5cf6',
    country: 'Germany',
    founded: '1875',
    description: 'German precision drum manufacturer trusted by progressive metal drummers.',
    metaTitle: 'Metal Drummers Who Use Sonor | MetalForge Gear Search',
    metaDescription: 'Discover which metal drummers play Sonor drums. From Tomas Haake to Danny Carey, explore their premium setups.',
    keywords: ['sonor drums', 'sonor sq2', 'tomas haake drums', 'danny carey drums'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=sonor+drums&tag=metalforge',
  },
  dw: {
    slug: 'dw',
    name: 'DW (Drum Workshop)',
    type: 'drums',
    icon: '🥁',
    color: '#f59e0b',
    country: 'USA',
    founded: '1972',
    description: 'American premium drum manufacturer known for meticulous craftsmanship.',
    metaTitle: 'Metal Drummers Who Use DW | MetalForge Gear Search',
    metaDescription: 'Explore which metal drummers play DW drums. Discover the premium setups of progressive metal legends.',
    keywords: ['dw drums', 'drum workshop', 'dw collectors', 'brann dailor drums'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=dw+drums&tag=metalforge',
  },
  ludwig: {
    slug: 'ludwig',
    name: 'Ludwig',
    type: 'drums',
    icon: '🥁',
    color: '#dc2626',
    country: 'USA',
    founded: '1909',
    description: 'The oldest American drum company, known for legendary snare drums.',
    metaTitle: 'Metal Drummers Who Use Ludwig | MetalForge Gear Search',
    metaDescription: 'Discover which metal drummers play Ludwig drums. Explore the legendary Black Beauty and classic Ludwig kits.',
    keywords: ['ludwig drums', 'ludwig black beauty', 'ludwig supraphonic', 'ludwig metal'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=ludwig+drums&tag=metalforge',
  },
  mapex: {
    slug: 'mapex',
    name: 'Mapex',
    type: 'drums',
    icon: '🥁',
    color: '#16a34a',
    country: 'Taiwan',
    founded: '1989',
    description: 'Known for excellent value and quality professional drums.',
    metaTitle: 'Metal Drummers Who Use Mapex | MetalForge Gear Search',
    metaDescription: 'Explore which metal drummers play Mapex drums. From Chris Adler to rising stars, discover their setups.',
    keywords: ['mapex drums', 'mapex saturn', 'chris adler drums', 'mapex metal'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=mapex+drums&tag=metalforge',
  },
  ddrum: {
    slug: 'ddrum',
    name: 'ddrum',
    type: 'drums',
    icon: '🥁',
    color: '#7c3aed',
    country: 'Sweden',
    founded: '1983',
    description: 'Known for innovative designs and metal drummer endorsements.',
    metaTitle: 'Metal Drummers Who Use ddrum | MetalForge Gear Search',
    metaDescription: 'Discover which metal drummers play ddrum drums. Explore the Vinnie Paul legacy and modern metal setups.',
    keywords: ['ddrum drums', 'vinnie paul ddrum', 'ddrum metal', 'ddrum signature'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=ddrum&tag=metalforge',
  },
  sjc: {
    slug: 'sjc',
    name: 'SJC Custom Drums',
    type: 'drums',
    icon: '🥁',
    color: '#ea580c',
    country: 'USA',
    founded: '2000',
    description: 'Massachusetts custom drum company known for unique designs.',
    metaTitle: 'Metal Drummers Who Use SJC | MetalForge Gear Search',
    metaDescription: 'Explore which metal drummers play SJC Custom Drums. Discover the handcrafted setups of modern metal stars.',
    keywords: ['sjc drums', 'sjc custom', 'jay weinberg drums', 'sjc metal'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=sjc+drums&tag=metalforge',
  },
  // Cymbal Brands
  zildjian: {
    slug: 'zildjian',
    name: 'Zildjian',
    type: 'cymbals',
    icon: '🔔',
    color: '#eab308',
    country: 'USA',
    founded: '1623',
    description: 'The oldest cymbal company in the world, Armenian family business.',
    metaTitle: 'Metal Drummers Who Use Zildjian | MetalForge Gear Search',
    metaDescription: 'Discover which legendary metal drummers play Zildjian cymbals. From Lars Ulrich to George Kollias, explore their setups.',
    keywords: ['zildjian cymbals', 'zildjian a custom', 'zildjian k custom', 'zildjian metal'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=zildjian&tag=metalforge',
  },
  paiste: {
    slug: 'paiste',
    name: 'Paiste',
    type: 'cymbals',
    icon: '🔔',
    color: '#ef4444',
    country: 'Switzerland',
    founded: '1906',
    description: 'Swiss cymbal maker known for bright, cutting tones.',
    metaTitle: 'Metal Drummers Who Use Paiste | MetalForge Gear Search',
    metaDescription: 'Explore which metal drummers play Paiste cymbals. From Joey Jordison to Dave Lombardo, discover their RUDE setups.',
    keywords: ['paiste cymbals', 'paiste rude', 'paiste 2002', 'paiste metal', 'joey jordison cymbals'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=paiste&tag=metalforge',
  },
  sabian: {
    slug: 'sabian',
    name: 'Sabian',
    type: 'cymbals',
    icon: '🔔',
    color: '#3b82f6',
    country: 'Canada',
    founded: '1981',
    description: 'Canadian cymbal manufacturer founded by the Zildjian family.',
    metaTitle: 'Metal Drummers Who Use Sabian | MetalForge Gear Search',
    metaDescription: 'Discover which metal drummers play Sabian cymbals. From Tomas Haake to Mike Portnoy, explore their HHX setups.',
    keywords: ['sabian cymbals', 'sabian hhx', 'sabian aax', 'sabian metal', 'tomas haake cymbals'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=sabian&tag=metalforge',
  },
  meinl: {
    slug: 'meinl',
    name: 'Meinl',
    type: 'cymbals',
    icon: '🔔',
    color: '#22c55e',
    country: 'Germany',
    founded: '1951',
    description: 'German cymbal manufacturer popular in progressive metal.',
    metaTitle: 'Metal Drummers Who Use Meinl | MetalForge Gear Search',
    metaDescription: 'Explore which metal drummers play Meinl cymbals. From Matt Halpern to Brann Dailor, discover their Byzance setups.',
    keywords: ['meinl cymbals', 'meinl byzance', 'meinl metal', 'matt halpern cymbals', 'brann dailor cymbals'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=meinl&tag=metalforge',
  },
  // Hardware Brands
  axis: {
    slug: 'axis',
    name: 'Axis',
    type: 'hardware',
    icon: '⚙️',
    color: '#6366f1',
    country: 'USA',
    founded: '1993',
    description: 'Known for high-end direct drive bass drum pedals.',
    metaTitle: 'Metal Drummers Who Use Axis | MetalForge Gear Search',
    metaDescription: 'Discover which extreme metal drummers use Axis pedals for their blistering speed.',
    keywords: ['axis pedals', 'axis longboard', 'axis direct drive', 'axis metal'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=axis+pedal&tag=metalforge',
  },
  // Stick Brands
  vicfirth: {
    slug: 'vicfirth',
    name: 'Vic Firth',
    type: 'sticks',
    icon: '🥢',
    color: '#78716c',
    country: 'USA',
    founded: '1963',
    description: 'American drumstick manufacturer, the most popular in the world.',
    metaTitle: 'Metal Drummers Who Use Vic Firth | MetalForge Gear Search',
    metaDescription: 'Explore which metal drummers use Vic Firth sticks. Discover signature models from George Kollias and more.',
    keywords: ['vic firth sticks', 'vic firth metal', 'vic firth signature', 'george kollias sticks'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=vic+firth&tag=metalforge',
  },
  promark: {
    slug: 'promark',
    name: 'Promark',
    type: 'sticks',
    icon: '🥢',
    color: '#0891b2',
    country: 'USA',
    founded: '1957',
    description: 'American drumstick manufacturer owned by D\'Addario.',
    metaTitle: 'Metal Drummers Who Use Promark | MetalForge Gear Search',
    metaDescription: 'Discover which metal drummers use Promark sticks. Explore signature models from Joey Jordison and Dave Lombardo.',
    keywords: ['promark sticks', 'promark metal', 'joey jordison sticks', 'dave lombardo sticks'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=promark&tag=metalforge',
  },
  ahead: {
    slug: 'ahead',
    name: 'Ahead',
    type: 'sticks',
    icon: '🥢',
    color: '#9ca3af',
    country: 'USA',
    founded: '1992',
    description: 'Known for aluminum core drumsticks that never break.',
    metaTitle: 'Metal Drummers Who Use Ahead | MetalForge Gear Search',
    metaDescription: 'Explore which metal drummers use Ahead sticks. Discover why Lars Ulrich chooses aluminum core sticks.',
    keywords: ['ahead sticks', 'ahead aluminum', 'lars ulrich sticks', 'ahead metal'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=ahead+sticks&tag=metalforge',
  },
  vater: {
    slug: 'vater',
    name: 'Vater',
    type: 'sticks',
    icon: '🥢',
    color: '#a855f7',
    country: 'USA',
    founded: '1956',
    description: 'Family-owned American drumstick manufacturer.',
    metaTitle: 'Metal Drummers Who Use Vater | MetalForge Gear Search',
    metaDescription: 'Discover which metal drummers use Vater sticks and why they trust this family-owned brand.',
    keywords: ['vater sticks', 'vater metal', 'vater signature'],
    affiliateUrl: 'https://www.thomann.de/intl/search_dir.html?sw=vater&tag=metalforge',
  },
};

// ==========================================
// PRICE RANGE FILTERS
// ==========================================

export const PRICE_RANGES = [
  { id: 'budget', label: 'Budget-Friendly', min: 0, max: 500, emoji: '💰' },
  { id: 'mid', label: 'Mid-Range', min: 500, max: 2000, emoji: '⚖️' },
  { id: 'pro', label: 'Pro Tier', min: 2000, max: Infinity, emoji: '🏆' },
];

// ==========================================
// QUICK TAGS
// ==========================================

export const QUICK_TAGS = {
  popularBrands: [
    { id: 'tama', label: 'Tama', icon: '🥁' },
    { id: 'pearl', label: 'Pearl', icon: '🥁' },
    { id: 'zildjian', label: 'Zildjian', icon: '🔔' },
    { id: 'paiste', label: 'Paiste', icon: '🔔' },
    { id: 'meinl', label: 'Meinl', icon: '🔔' },
    { id: 'sabian', label: 'Sabian', icon: '🔔' },
  ],
  budgetFriendly: [
    { id: 'tama-superstar-classic', label: 'Tama Superstar', icon: '💰' },
    { id: 'pearl-session-studio', label: 'Pearl Session Studio', icon: '💰' },
    { id: 'sabian-b8x', label: 'Sabian B8X', icon: '💰' },
    { id: 'meinl-hcs', label: 'Meinl HCS', icon: '💰' },
  ],
  proTier: [
    { id: 'sonor-sq2', label: 'Sonor SQ2', icon: '🏆' },
    { id: 'dw-collectors', label: 'DW Collectors', icon: '🏆' },
    { id: 'paiste-signature', label: 'Paiste Signature', icon: '🏆' },
    { id: 'meinl-byzance', label: 'Meinl Byzance', icon: '🏆' },
  ],
};

// ==========================================
// SEARCH UTILITIES
// ==========================================

/**
 * Search gear database with fuzzy matching
 */
export function searchGear(query, filters = {}) {
  const normalizedQuery = query.toLowerCase().trim();
  let results = [];
  
  // Search all categories
  Object.values(GEAR_DATABASE).forEach(categoryItems => {
    categoryItems.forEach(item => {
      // Check if item matches query
      const matchesQuery = !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.brand.toLowerCase().includes(normalizedQuery) ||
        item.keywords.some(kw => kw.includes(normalizedQuery));
      
      // Check if item matches filters
      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesBrand = !filters.brand || item.brand === filters.brand;
      const matchesTier = !filters.tier || item.tier === filters.tier;
      const matchesPriceRange = !filters.priceRange || (
        item.price >= PRICE_RANGES.find(r => r.id === filters.priceRange)?.min &&
        item.price < PRICE_RANGES.find(r => r.id === filters.priceRange)?.max
      );
      
      if (matchesQuery && matchesCategory && matchesBrand && matchesTier && matchesPriceRange) {
        results.push(item);
      }
    });
  });
  
  return results;
}

/**
 * Get all drummers using a specific gear item
 */
export function getDrummersUsingGear(gearId) {
  const drummers = [];
  
  Object.entries(DRUMMER_GEAR).forEach(([drummerSlug, gear]) => {
    Object.values(gear).forEach(gearList => {
      if (gearList.includes(gearId)) {
        drummers.push(drummerSlug);
      }
    });
  });
  
  return [...new Set(drummers)];
}

/**
 * Get all drummers using a specific brand
 */
export function getDrummersUsingBrand(brandSlug) {
  const drummers = [];
  
  Object.entries(DRUMMER_GEAR).forEach(([drummerSlug, gear]) => {
    Object.values(gear).forEach(gearList => {
      gearList.forEach(gearId => {
        // Find the gear item in database
        let found = false;
        Object.values(GEAR_DATABASE).forEach(categoryItems => {
          const item = categoryItems.find(i => i.id === gearId);
          if (item && item.brand === brandSlug) {
            found = true;
          }
        });
        if (found && !drummers.includes(drummerSlug)) {
          drummers.push(drummerSlug);
        }
      });
    });
  });
  
  return drummers;
}

/**
 * Get all gear items for a specific brand
 */
export function getGearByBrand(brandSlug) {
  const items = [];
  
  Object.values(GEAR_DATABASE).forEach(categoryItems => {
    categoryItems.forEach(item => {
      if (item.brand === brandSlug) {
        items.push(item);
      }
    });
  });
  
  return items;
}

/**
 * Get all unique brands from gear database
 */
export function getAllBrands() {
  const brands = new Set();
  
  Object.values(GEAR_DATABASE).forEach(categoryItems => {
    categoryItems.forEach(item => {
      brands.add(item.brand);
    });
  });
  
  return Array.from(brands).map(slug => ({
    slug,
    ...BRAND_SEO_DATA[slug],
  })).filter(b => b.name);
}

/**
 * Get gear item by ID
 */
export function getGearById(gearId) {
  for (const categoryItems of Object.values(GEAR_DATABASE)) {
    const item = categoryItems.find(i => i.id === gearId);
    if (item) return item;
  }
  return null;
}

/**
 * Get drummer's full gear setup
 */
export function getDrummerGear(drummerSlug) {
  const gear = DRUMMER_GEAR[drummerSlug];
  if (!gear) return null;
  
  const fullGear = {};
  Object.entries(gear).forEach(([category, gearIds]) => {
    fullGear[category] = gearIds.map(id => getGearById(id)).filter(Boolean);
  });
  
  return fullGear;
}

/**
 * Get top brands by number of drummers
 */
export function getTopBrands(limit = 20) {
  const brandCounts = {};
  
  Object.entries(DRUMMER_GEAR).forEach(([, gear]) => {
    const brands = new Set();
    Object.values(gear).forEach(gearList => {
      gearList.forEach(gearId => {
        Object.values(GEAR_DATABASE).forEach(categoryItems => {
          const item = categoryItems.find(i => i.id === gearId);
          if (item) brands.add(item.brand);
        });
      });
    });
    brands.forEach(brand => {
      brandCounts[brand] = (brandCounts[brand] || 0) + 1;
    });
  });
  
  return Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug, count]) => ({
      slug,
      count,
      ...BRAND_SEO_DATA[slug],
    }));
}

// ==========================================
// URL UTILITIES
// ==========================================

export function isGearSearchPage() {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/tools/gear-search' || 
         window.location.pathname === '/tools/gear-search/';
}

export function isGearBrandPage() {
  if (typeof window === 'undefined') return false;
  return /^\/gear\/[a-z0-9-]+$/i.test(window.location.pathname) &&
         !window.location.pathname.includes('/gear/item/');
}

export function getGearBrandSlugFromURL() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/gear\/([a-z0-9-]+)$/i);
  return match ? match[1] : null;
}

export function getSearchParamsFromURL() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get('q') || '',
    category: params.get('category') || '',
    brand: params.get('brand') || '',
    price: params.get('price') || '',
    sort: params.get('sort') || 'popularity',
  };
}

export function updateSearchURL(params) {
  if (typeof window === 'undefined') return;
  const urlParams = new URLSearchParams();
  if (params.q) urlParams.set('q', params.q);
  if (params.category) urlParams.set('category', params.category);
  if (params.brand) urlParams.set('brand', params.brand);
  if (params.price) urlParams.set('price', params.price);
  if (params.sort && params.sort !== 'popularity') urlParams.set('sort', params.sort);
  
  const queryString = urlParams.toString();
  const newPath = queryString ? `/tools/gear-search?${queryString}` : '/tools/gear-search';
  window.history.pushState({}, '', newPath);
}

// ==========================================
// EXPORT TOP BRANDS FOR SITEMAP GENERATION
// ==========================================

export const TOP_BRAND_SLUGS = [
  'tama', 'pearl', 'sonor', 'dw', 'ludwig', 'mapex', 'ddrum', 'sjc',
  'zildjian', 'paiste', 'sabian', 'meinl',
  'vicfirth', 'promark', 'ahead', 'vater',
  'axis'
];
