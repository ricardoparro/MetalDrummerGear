/**
 * Metal Drummer Name Generator Data
 * Issue #704: Create viral 'Metal Drummer Name Generator' tool
 * 
 * Name transformation algorithms and data for generating metal drummer names
 */

// First name metal variations - maps common names to their metal variants
export const METAL_FIRST_NAMES = {
  // Common male names
  'john': 'Johnny',
  'jonathan': 'Johnny',
  'mike': 'Mikey',
  'michael': 'Mikey',
  'james': 'Jimmy',
  'jim': 'Jimmy',
  'robert': 'Bobby',
  'rob': 'Bobby',
  'bob': 'Bobby',
  'william': 'Billy',
  'will': 'Billy',
  'bill': 'Billy',
  'richard': 'Ricky',
  'rick': 'Ricky',
  'ricardo': 'Rico',
  'thomas': 'Tommy',
  'tom': 'Tommy',
  'daniel': 'Danny',
  'dan': 'Danny',
  'david': 'Davey',
  'dave': 'Davey',
  'patrick': 'Paddy',
  'pat': 'Paddy',
  'anthony': 'Tony',
  'christopher': 'Chris',
  'alexander': 'Alex',
  'matthew': 'Matt',
  'joseph': 'Joey',
  'joe': 'Joey',
  'charles': 'Charlie',
  'edward': 'Eddie',
  'ed': 'Eddie',
  'peter': 'Pete',
  'steven': 'Stevie',
  'steve': 'Stevie',
  'george': 'Georgie',
  'nicholas': 'Nick',
  'nick': 'Nicky',
  'kevin': 'Kev',
  'brian': 'Bri',
  'paul': 'Paulie',
  'mark': 'Marky',
  'donald': 'Donnie',
  'don': 'Donnie',
  'ronald': 'Ronnie',
  'ron': 'Ronnie',
  'larry': 'Lars',
  'lawrence': 'Lars',
  'vincent': 'Vinnie',
  'vince': 'Vinnie',
  'phillip': 'Phil',
  'philip': 'Phil',
  'eugene': 'Gene',
  'raymond': 'Ray',
  'andrew': 'Andy',
  'timothy': 'Timmy',
  'tim': 'Timmy',
  'jason': 'Jase',
  'jeffrey': 'Jeff',
  'jeff': 'Jeffro',
  'scott': 'Scotty',
  'benjamin': 'Benny',
  'ben': 'Benny',
  'samuel': 'Sammy',
  'sam': 'Sammy',
  'gregory': 'Greg',
  'frank': 'Frankie',
  'francisco': 'Frankie',
  'tony': 'Tone',
  'marcus': 'Marc',
  'marc': 'Marco',
  'marco': 'Marco',
  'carlos': 'Carlo',
  'carl': 'Carlo',
  'sergio': 'Serge',
  'fernando': 'Fernie',
  'miguel': 'Mikey',
  'pedro': 'Pete',
  'jose': 'Joey',
  'juan': 'Johnny',
  'alex': 'Axl',
  'sean': 'Shawn',
  'shawn': 'Shawnie',
  'shane': 'Shank',
  'ryan': 'Ry',
  'justin': 'Jus',
  'brandon': 'Bran',
  'brann': 'Bran',
  'tyler': 'Ty',
  'eric': 'E',
  'erik': 'E',
  'aaron': 'A',
  'adam': 'Adz',
  'jordan': 'Jord',
  'nathan': 'Nate',
  'nate': 'Natey',
  'dylan': 'Dyl',
  'ethan': 'E',
  'noah': 'No',
  'oliver': 'Oli',
  'elijah': 'Eli',
  'lucas': 'Luc',
  'liam': 'Li',
  'mason': 'Mace',
  'logan': 'Lo',
  'jacob': 'Jake',
  'jake': 'Jakey',
  'aiden': 'Aid',
  'jackson': 'Jax',
  'jack': 'Jax',
  'henry': 'Hank',
  'leo': 'Leon',
  'owen': 'O',
  'wyatt': 'Wy',
  'caleb': 'Cal',
  'gabriel': 'Gabe',
  'gabe': 'Gabey',
  'isaiah': 'Iz',
  'connor': 'Con',
  'hunter': 'Hunt',
  'cameron': 'Cam',
  'dominic': 'Dom',
  'luis': 'Lou',
  'louis': 'Lou',
  'diego': 'D',
  'angel': 'Ange',
  'evan': 'Ev',
  'max': 'Maxx',
  'maxwell': 'Maxx',
  'xavier': 'X',
  'tobias': 'Tobi',
  'toby': 'Tobi',
  'elmer': 'El',
  'tomas': 'Tom',
  'tomás': 'Tom',
  
  // Common female names
  'jennifer': 'Jenny',
  'jessica': 'Jess',
  'amanda': 'Mandy',
  'melissa': 'Mel',
  'stephanie': 'Steph',
  'nicole': 'Nicky',
  'michelle': 'Shelly',
  'elizabeth': 'Liz',
  'heather': 'Heath',
  'samantha': 'Sam',
  'katherine': 'Kat',
  'kate': 'Kat',
  'katie': 'Kat',
  'catherine': 'Cat',
  'christina': 'Chrissy',
  'christine': 'Chrissy',
  'rebecca': 'Bex',
  'rachel': 'Rach',
  'laura': 'Laur',
  'andrea': 'Andi',
  'sarah': 'Sare',
  'sara': 'Sare',
  'kimberly': 'Kim',
  'kim': 'Kimmy',
  'brittany': 'Brit',
  'ashley': 'Ash',
  'emily': 'Em',
  'emma': 'Em',
  'maria': 'Mari',
  'anna': 'Annie',
  'anne': 'Annie',
  'ann': 'Annie',
  'victoria': 'Vicky',
  'natalie': 'Nat',
  'jacqueline': 'Jackie',
  'jackie': 'Jack',
  'danielle': 'Dani',
  'alexandria': 'Alex',
  'alexandra': 'Alex',
  'alexis': 'Lex',
  'megan': 'Meg',
  'olivia': 'Liv',
  'sophia': 'Sophie',
  'isabella': 'Bella',
  'abigail': 'Abby',
  'madison': 'Maddie',
  'chloe': 'Clo',
  'grace': 'Gracie',
  'zoey': 'Zo',
  'lily': 'Lil',
  'lillian': 'Lil',
  'hannah': 'Han',
  'addison': 'Addie',
  'avery': 'Ave',
  'leah': 'Lee',
  'audrey': 'Auds',
  'brooklyn': 'Brook',
  'skylar': 'Sky',
  'riley': 'Riles',
  'claire': 'Clare',
  'savannah': 'Sav',
  'lucy': 'Luce',
  'elena': 'Lena',
  'elena': 'Lena',
  'maya': 'May',
  'julia': 'Jules',
  'piper': 'Pipes',
  'violet': 'Vi',
  'scarlett': 'Scar',
  'stella': 'Stell',
  'hazel': 'Haze',
  'aurora': 'Rora',
  'penelope': 'Penny',
  'layla': 'Lay',
  'willow': 'Will',
  'ivy': 'Ivs',
  'luna': 'Lu',
  'eliana': 'Eli',
};

// Epic metal middle nicknames
export const METAL_NICKNAMES = [
  'Thunderstick',
  'Hellhammer',
  'Blastbeat',
  'Ironclad',
  'Chaos',
  'Fury',
  'Slayer',
  'Bonecrusher',
  'Deathgrip',
  'Viper',
  'Reaper',
  'Devastator',
  'Brutality',
  'Annihilator',
  'Warhead',
  'Carnage',
  'Inferno',
  'Destroyer',
  'Havoc',
  'Rampage',
  'Vengeance',
  'Berserker',
  'Savage',
  'Mayhem',
  'Tempest',
  'Nightmare',
  'Warlord',
  'Titan',
  'Colossus',
  'Demolisher',
  'Shredder',
  'Tormentor',
  'Deathmarch',
  'Stormrider',
  'Gravedigger',
  'Skullcrusher',
  'Doombringer',
  'Steelhead',
  'Ironside',
  'Warmonger',
  'Blackout',
  'Bloodlust',
  'Cataclysm',
  'Oblivion',
  'Apocalypse',
  'Executioner',
  'Riffmaster',
  'Beatdown',
  'Tomahawk',
  'Barrage',
  'Avalanche',
  'Pyro',
  'Razor',
  'Vortex',
  'Phantom',
  'Spectre',
  'Thunder',
  'Lightning',
  'Storm',
  'Wolfpack',
  'Viking',
  'Crusader',
  'Gladiator',
  'Centurion',
  'Spartan',
  'Barbarian',
  'Conqueror',
  'Overlord',
  'Terminator',
  'Predator',
  'Prowler',
  'Stalker',
  'Hunter',
  'Killer',
  'Madman',
  'Maniac',
  'Lunatic',
  'Psycho',
  'Ramrod',
  'Sledgehammer',
  'Jackhammer',
  'Pistonhead',
  'Crankshaft',
  'Turbine',
  'Nuclear',
  'Atomic',
  'Radioactive',
  'Toxic',
  'Acid',
  'Venom',
  'Poison',
  'Chainsaw',
  'Buzzsaw',
  'Ripper',
  'Slasher',
  'Butcher',
  'Cleaver',
  'Hatchet',
];

// Last name metallification rules
// Transform a regular last name into a metal variant
export function metallifyLastName(lastName) {
  if (!lastName || lastName.length < 2) return lastName || 'Steele';
  
  const lower = lastName.toLowerCase().trim();
  
  // Random transformation selection based on name hash
  const hash = lower.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const transformType = hash % 7;
  
  // Capitalize first letter helper
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  
  switch (transformType) {
    case 0:
      // Add 'us' suffix (Latin style)
      if (lower.endsWith('s') || lower.endsWith('x') || lower.endsWith('z')) {
        return capitalize(lower + 'ius');
      }
      return capitalize(lower.replace(/[aeiou]$/, '') + 'us');
    
    case 1:
      // Drop vowels and add 'or' (Terminator style)
      const noVowels = lower.replace(/[aeiou]/gi, '');
      return capitalize(noVowels.length > 1 ? noVowels + 'or' : lower + 'or');
    
    case 2:
      // Add 'heim' suffix (Viking style)
      return capitalize(lower.replace(/[aeiou]$/, '') + 'heim');
    
    case 3:
      // Add 'blade' suffix
      return capitalize(lower.replace(/[aeiou]$/, '') + 'blade');
    
    case 4:
      // Add 'skull' suffix
      if (lower.length > 4) {
        return capitalize(lower.substring(0, 4) + 'skull');
      }
      return capitalize(lower + 'skull');
    
    case 5:
      // Double consonants + 'sson' (Norse style)
      if (lower.length > 3) {
        const base = lower.substring(0, 4);
        const lastChar = base.charAt(base.length - 1);
        if (!/[aeiou]/.test(lastChar)) {
          return capitalize(base + lastChar + 'sson');
        }
      }
      return capitalize(lower + 'sson');
    
    case 6:
    default:
      // Convert to all caps with X replacing vowels
      const metalName = lower.replace(/[aeiou]/gi, () => Math.random() > 0.5 ? 'x' : 'z');
      return capitalize(metalName);
  }
}

// First name transformation
export function transformFirstName(firstName) {
  if (!firstName || firstName.length < 1) return '';
  
  const lower = firstName.toLowerCase().trim();
  
  // Check for known mapping
  if (METAL_FIRST_NAMES[lower]) {
    return METAL_FIRST_NAMES[lower];
  }
  
  // Default transformation: shorten or stylize
  const name = firstName.trim();
  
  // If already short (3 letters or less), add 'y' or 'ie'
  if (name.length <= 3) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + 'y';
  }
  
  // Shorten longer names to first 3-4 letters
  const shortened = name.substring(0, Math.min(4, name.length));
  return shortened.charAt(0).toUpperCase() + shortened.slice(1).toLowerCase() + (shortened.length <= 3 ? 'y' : '');
}

// Get a random metal nickname
export function getRandomNickname() {
  return METAL_NICKNAMES[Math.floor(Math.random() * METAL_NICKNAMES.length)];
}

// Get deterministic nickname based on name
export function getNicknameForName(name) {
  if (!name) return getRandomNickname();
  const hash = name.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return METAL_NICKNAMES[hash % METAL_NICKNAMES.length];
}

// Random first names for random generation
export const RANDOM_FIRST_NAMES = [
  'Lars', 'Joey', 'Dave', 'Gene', 'Vinnie', 'Mike', 'Chris', 'Tomas',
  'Brann', 'Matt', 'Danny', 'Jay', 'Charlie', 'Ray', 'Nick', 'Mario',
  'Eloy', 'George', 'Dirk', 'Gar', 'Scott', 'Morgan', 'Flo', 'Inferno',
  'Jaska', 'Shannon', 'John', 'Jimmy', 'Tommy', 'Bobby', 'Frankie', 'Ricky',
  'Billy', 'Eddie', 'Pete', 'Phil', 'Paul', 'Steve', 'Eric', 'Mark',
  'Rob', 'Don', 'Ron', 'Sam', 'Dan', 'Ben', 'Tim', 'Joe',
  'Max', 'Alex', 'Jake', 'Tony', 'Brian', 'Kevin', 'Andrew', 'Ryan'
];

// Random last name bases for random generation
export const RANDOM_LAST_BASES = [
  'Storm', 'Iron', 'Steel', 'Blood', 'Death', 'Dark', 'Black', 'War',
  'Fire', 'Thunder', 'Shadow', 'Bone', 'Skull', 'Grave', 'Hell', 'Doom',
  'Wolf', 'Raven', 'Dragon', 'Serpent', 'Viper', 'Hawk', 'Bear', 'Lion',
  'Stone', 'Rock', 'Mountain', 'Abyss', 'Void', 'Chaos', 'Night', 'Frost',
  'Blade', 'Edge', 'Fang', 'Claw', 'Horn', 'Spike', 'Chain', 'Hammer'
];

// Generate a completely random metal name
export function generateRandomMetalName() {
  const firstName = RANDOM_FIRST_NAMES[Math.floor(Math.random() * RANDOM_FIRST_NAMES.length)];
  const nickname = getRandomNickname();
  const lastBase = RANDOM_LAST_BASES[Math.floor(Math.random() * RANDOM_LAST_BASES.length)];
  
  // Random suffix for last name
  const suffixes = ['sson', 'heim', 'blade', 'skull', 'us', 'or', 'ax'];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const lastName = lastBase + suffix;
  
  return {
    firstName,
    nickname,
    lastName,
    fullName: `${firstName} "${nickname}" ${lastName}`
  };
}

// Generate metal name from input
export function generateMetalName(inputName) {
  if (!inputName || inputName.trim().length === 0) {
    return generateRandomMetalName();
  }
  
  const parts = inputName.trim().split(/\s+/);
  const inputFirstName = parts[0] || '';
  const inputLastName = parts.length > 1 ? parts[parts.length - 1] : '';
  
  const firstName = transformFirstName(inputFirstName);
  const nickname = getNicknameForName(inputName);
  const lastName = metallifyLastName(inputLastName || inputFirstName);
  
  return {
    firstName: firstName || inputFirstName,
    nickname,
    lastName,
    fullName: `${firstName || inputFirstName} "${nickname}" ${lastName}`
  };
}

// Famous drummer matches - pulled from actual MetalForge drummer data
export const DRUMMER_MATCHES = [
  {
    id: 'lars-ulrich',
    name: 'Lars Ulrich',
    band: 'Metallica',
    image: '/images/drummers/lars-ulrich.webp',
    traits: ['iconic', 'aggressive', 'thrash'],
    matchQuote: 'You drum with legendary intensity!'
  },
  {
    id: 'joey-jordison',
    name: 'Joey Jordison',
    band: 'Slipknot',
    image: '/images/drummers/joey-jordison.webp',
    traits: ['speed', 'technical', 'masked'],
    matchQuote: 'Your speed is otherworldly!'
  },
  {
    id: 'dave-lombardo',
    name: 'Dave Lombardo',
    band: 'Slayer',
    image: '/images/drummers/dave-lombardo.webp',
    traits: ['godfather', 'thrash', 'pioneer'],
    matchQuote: 'You are a true pioneer of thrash!'
  },
  {
    id: 'gene-hoglan',
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    image: '/images/drummers/gene-hoglan.webp',
    traits: ['atomic', 'technical', 'versatile'],
    matchQuote: 'The Atomic Clock chose you!'
  },
  {
    id: 'mike-portnoy',
    name: 'Mike Portnoy',
    band: 'Dream Theater',
    image: '/images/drummers/mike-portnoy.webp',
    traits: ['progressive', 'complex', 'emotional'],
    matchQuote: 'You think in odd time signatures!'
  },
  {
    id: 'danny-carey',
    name: 'Danny Carey',
    band: 'Tool',
    image: '/images/drummers/danny-carey.webp',
    traits: ['polyrhythm', 'mystic', 'powerful'],
    matchQuote: 'You possess rhythmic enlightenment!'
  },
  {
    id: 'tomas-haake',
    name: 'Tomas Haake',
    band: 'Meshuggah',
    image: '/images/drummers/tomas-haake.webp',
    traits: ['djent', 'polyrhythm', 'machine'],
    matchQuote: 'Your precision is machine-like!'
  },
  {
    id: 'george-kollias',
    name: 'George Kollias',
    band: 'Nile',
    image: '/images/drummers/george-kollias.webp',
    traits: ['extreme', 'endurance', 'blastbeat'],
    matchQuote: 'Your feet are weapons of destruction!'
  },
  {
    id: 'vinnie-paul',
    name: 'Vinnie Paul',
    band: 'Pantera / Hellyeah',
    image: '/images/drummers/vinnie-paul.webp',
    traits: ['groove', 'power', 'texas'],
    matchQuote: 'You groove harder than anyone!'
  },
  {
    id: 'chris-adler',
    name: 'Chris Adler',
    band: 'Lamb of God',
    image: '/images/drummers/chris-adler.webp',
    traits: ['groove', 'technical', 'modern'],
    matchQuote: 'Your groove metal game is strong!'
  },
  {
    id: 'brann-dailor',
    name: 'Brann Dailor',
    band: 'Mastodon',
    image: '/images/drummers/brann-dailor.webp',
    traits: ['progressive', 'fills', 'creative'],
    matchQuote: 'You fill every space with gold!'
  },
  {
    id: 'matt-halpern',
    name: 'Matt Halpern',
    band: 'Periphery',
    image: '/images/drummers/matt-halpern.webp',
    traits: ['djent', 'modern', 'educator'],
    matchQuote: 'You are the future of metal drumming!'
  },
  {
    id: 'charlie-benante',
    name: 'Charlie Benante',
    band: 'Anthrax',
    image: '/images/drummers/charlie-benante.webp',
    traits: ['thrash', 'innovator', 'artist'],
    matchQuote: 'You helped define thrash metal!'
  },
  {
    id: 'mario-duplantier',
    name: 'Mario Duplantier',
    band: 'Gojira',
    image: '/images/drummers/mario-duplantier.webp',
    traits: ['environmental', 'powerful', 'unique'],
    matchQuote: 'You hit like a force of nature!'
  },
  {
    id: 'eloy-casagrande',
    name: 'Eloy Casagrande',
    band: 'Sepultura / Slipknot',
    image: '/images/drummers/eloy-casagrande.webp',
    traits: ['brazilian', 'diverse', 'rising'],
    matchQuote: 'Your rise to greatness is unstoppable!'
  },
  {
    id: 'ray-luzier',
    name: 'Ray Luzier',
    band: 'Korn',
    image: '/images/drummers/ray-luzier.webp',
    traits: ['nu-metal', 'versatile', 'studio'],
    matchQuote: 'Your versatility knows no bounds!'
  },
  {
    id: 'jay-weinberg',
    name: 'Jay Weinberg',
    band: 'Slipknot',
    image: '/images/drummers/jay-weinberg.webp',
    traits: ['legacy', 'chaotic', 'energy'],
    matchQuote: 'You carry the torch with honor!'
  },
  {
    id: 'inferno',
    name: 'Inferno',
    band: 'Behemoth',
    image: '/images/drummers/inferno.webp',
    traits: ['blackened', 'extreme', 'polish'],
    matchQuote: 'Your darkness is your power!'
  },
  {
    id: 'shannon-larkin',
    name: 'Shannon Larkin',
    band: 'Godsmack',
    image: '/images/drummers/shannon-larkin.webp',
    traits: ['rock', 'hard-hitting', 'tribal'],
    matchQuote: 'You bring tribal power to metal!'
  },
  {
    id: 'nick-menza',
    name: 'Nick Menza',
    band: 'Megadeth',
    image: '/images/drummers/nick-menza.webp',
    traits: ['legendary', 'thrash', 'technical'],
    matchQuote: 'You drum with legendary status!'
  },
];

// Get a random drummer match
export function getRandomDrummerMatch() {
  return DRUMMER_MATCHES[Math.floor(Math.random() * DRUMMER_MATCHES.length)];
}

// Get deterministic drummer match based on generated name
export function getDrummerMatchForName(metalName) {
  const hash = metalName.fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return DRUMMER_MATCHES[hash % DRUMMER_MATCHES.length];
}
