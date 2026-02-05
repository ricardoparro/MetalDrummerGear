// Vercel Serverless Function - Gear Finder API
// Search drummers by specific gear item

// Import drummers data (we'll inline it for serverless function)
// In production, this would come from a database

const drummers = [
  {
    id: 1,
    name: 'Lars Ulrich',
    band: 'Metallica',
    genre: 'Thrash Metal',
    image: '/images/drummers/1.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama LU1465 Lars Ulrich Signature 14x6.5"',
      cymbals: 'Zildjian A Custom Series (14" Dyno Beat Hi-Hats, 16", 17" & 18" Rock Crashes, 20" Z Custom China, 22" Ride)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Throne',
      sticks: 'Ahead Lars Ulrich Signature Drumsticks',
      heads: 'Remo'
    }
  },
  {
    id: 2,
    name: 'Joey Jordison',
    band: 'Slipknot',
    genre: 'Nu Metal / Death Metal',
    image: '/images/drummers/2.webp',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Joey Jordison Signature 13x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" Wild Hi-Hats, 16", 17", 18", 19" Power Crashes, 20" & 22" Wild Chinas, 22" Power Ride)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl DR-501C Icon Rack, Pearl D-2000BR Throne',
      sticks: 'Promark Joey Jordison Signature TX515W',
      heads: 'Evans'
    }
  },
  {
    id: 3,
    name: 'Gene Hoglan',
    band: 'Death / Testament / Dethklok',
    genre: 'Death Metal / Thrash Metal',
    image: '/images/drummers/3.webp',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (15" Hi-Hats, 18" & 20" Crashes, 22" Ride, 20" China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Promark 5B',
      heads: 'Evans'
    }
  },
  {
    id: 4,
    name: 'Dave Lombardo',
    band: 'Slayer',
    genre: 'Thrash Metal',
    image: '/images/drummers/4.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Paiste RUDE & 2002 Series (15" Sound Edge Hi-Hats, 18" & 19" Crashes, 22" Reign Power Ride, 18" China)',
      hardware: 'Tama Iron Cobra 900 Double Pedal, Tama 1st Chair Throne',
      sticks: 'Promark Dave Lombardo Signature 2Bx'
    }
  },
  {
    id: 5,
    name: 'Tomas Haake',
    band: 'Meshuggah',
    genre: 'Progressive Metal / Djent',
    image: '/images/drummers/5.webp',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech (24"x18" Bass, 10"x8", 12"x9", 13"x10", 16"x14", 18"x16" Toms)',
      snare: 'Sonor Tomas Haake Signature 14x6.5" & Artist Series Bronze',
      cymbals: 'Sabian HHX & AAX Series (14" HHX Compression Hi-Hats, 15" Artisan Hi-Hats, 19" & 20" & 21" HHX Stage Crashes, 22" Legacy Ride, 19" AAXtreme China)',
      hardware: 'Tama Speed Cobra Single Pedals (x2), Porter & Davies BC2 Throne',
      sticks: 'Wincent Tomas Haake Signature',
      heads: 'Remo'
    }
  },
  {
    id: 6,
    name: 'George Kollias',
    band: 'Nile',
    genre: 'Technical Death Metal',
    image: '/images/drummers/6.webp',
    gear: {
      drums: 'Pearl Masterworks Stadium Exotic (Piano Black with Gold Hardware)',
      snare: 'Pearl George Kollias Signature 14x6.5"',
      cymbals: 'Zildjian (14" K Mastersound Hi-Hats, 17" & 18" K Custom Dark Crashes, 21" A Custom Mega Bell Ride, 18" China)',
      hardware: 'Pearl Demon XR Double Pedal (Co-designed), Pearl D-3000 Throne',
      sticks: 'Vic Firth George Kollias Signature SGK',
      heads: 'Evans'
    }
  },
  {
    id: 7,
    name: 'Eloy Casagrande',
    band: 'Slipknot',
    genre: 'Nu Metal / Thrash Metal',
    image: '/images/drummers/7.webp',
    gear: {
      drums: 'Tama Starclassic Bubinga (22"x16" & 24"x14" Bass Drums, 10", 12", 13" Toms, 16" & 18" Floor Toms)',
      snare: 'Tama Bell Brass 14x5.5" (BB146)',
      cymbals: 'Paiste (15" Masters Dark Hi-Hats, 20" Masters Dark Ride, 20" & 20" 602 Crashes, 10" Rude Splash, 20" Masters Dark Crash, 20" 2002 Heavy Ride, 20" 2002 Novo China, 10" 2002 Mega Bell, Symphonic Gong)',
      hardware: 'Tama Iron Cobra Double Pedal, Yamaha DTX Electronic Pads',
      sticks: 'Promark Eloy Casagrande Signature',
      heads: 'Evans'
    }
  },
  {
    id: 8,
    name: 'Ray Luzier',
    band: 'Korn',
    genre: 'Nu Metal',
    image: '/images/drummers/8.webp',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Stage Ride, 18" AAXtreme China)',
      hardware: 'DW 9002 Double Pedal, Pearl D-2000 Roadster Throne',
      sticks: 'Vic Firth Ray Luzier Signature'
    }
  },
  {
    id: 9,
    name: 'John Otto',
    band: 'Limp Bizkit',
    genre: 'Nu Metal / Rap Metal',
    image: '/images/drummers/9.webp',
    gear: {
      drums: 'Orange County Drum & Percussion (OCDP) Custom Type 5 Acrylic',
      snare: 'OCDP 14x6.5" 40-ply Vented, OCDP 10x6" 20-ply',
      cymbals: 'Zildjian (13" A Custom Mastersound Hi-Hats, 16" & 17" A Custom Projection Crashes, 20" A Custom EFX, 20" FX Oriental Crash of Doom)',
      hardware: 'Gibraltar G Class Bass Drum Pedals, Gibraltar Custom Racks',
      sticks: 'Zildjian Artist Series',
      heads: 'Remo Emperor Coated'
    }
  },
  {
    id: 10,
    name: 'Jay Weinberg',
    band: 'Suicidal Tendencies',
    genre: 'Hardcore / Thrash Crossover',
    image: '/images/drummers/10.webp',
    gear: {
      drums: 'SJC Custom Drums (OBEY x ST Collaboration Kit)',
      snare: 'SJC Jay Weinberg "The Crucible" 14x6.5" 48-ply Brass',
      cymbals: 'Zildjian (14" A New Beat Hi-Hats, 18" & 19" A Custom Crashes, 21" K Custom Ride, 19" K China, 7" FX Break Bell)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Vater Jay Weinberg 908 Signature',
      heads: 'Evans Black Chrome'
    }
  },
  {
    id: 11,
    name: 'Vinnie Paul',
    band: 'Pantera / Damageplan / Hellyeah',
    genre: 'Groove Metal / Heavy Metal',
    image: '/images/drummers/11.webp',
    gear: {
      drums: 'ddrum Vinnie Paul Signature Series',
      snare: 'ddrum Vinnie Paul Signature 14x8"',
      cymbals: 'Sabian AA & AAX Series (14" Hi-Hats, 18" & 19" Crashes, 21" Ride, 18" China)',
      hardware: 'ddrum Double Pedal, ddrum Throne',
      sticks: 'Vic Firth American Classic 5B'
    }
  },
  {
    id: 12,
    name: 'Charlie Benante',
    band: 'Anthrax / S.O.D. / Pantera',
    genre: 'Thrash Metal',
    image: '/images/drummers/12.webp',
    gear: {
      drums: 'Tama Starclassic',
      snare: 'Tama Charlie Benante Signature 14x6.5"',
      cymbals: 'Paiste RUDE & 2002 Series (14" Hi-Hats, 18" & 19" Crashes, 20" Power Ride, 18" China)',
      hardware: 'Tama Speed Cobra Double Pedal, Roland Electronics',
      sticks: 'Vic Firth Charlie Benante Signature'
    }
  },
  {
    id: 13,
    name: 'Mike Portnoy',
    band: 'Dream Theater / Liquid Tension Experiment / The Winery Dogs',
    genre: 'Progressive Metal',
    image: '/images/drummers/13.webp',
    gear: {
      drums: 'Tama Starclassic Maple/Birch',
      snare: 'Tama Mike Portnoy Signature Melody Master 14x5.5"',
      cymbals: 'Sabian HHX Series (14" Evolution Hi-Hats, 18" & 19" Evolution Crashes, 21" Raw Bell Dry Ride, 10" & 12" Evolution Splashes, 19" O-Zone Crash)',
      hardware: 'Tama Iron Cobra Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Promark Mike Portnoy Signature TX420N'
    }
  },
  {
    id: 14,
    name: 'Danny Carey',
    band: 'Tool',
    genre: 'Progressive Metal',
    image: '/images/drummers/14.webp',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor Danny Carey Signature 14x8" Bronze',
      cymbals: 'Paiste Signature Series (15" Sound Edge Hi-Hats, 18" & 19" Power Crashes, 22" Dry Heavy Ride, 20" & 22" Chinas, various Rude crashes)',
      hardware: 'Sonor Giant Step Twin Effect Double Pedal, Sonor Drummer Throne, Mandala Drum electronic pads',
      sticks: 'Vic Firth Danny Carey Signature'
    }
  },
  {
    id: 15,
    name: 'Mario Duplantier',
    band: 'Gojira',
    genre: 'Progressive Death Metal',
    image: '/images/drummers/15.webp',
    gear: {
      drums: 'Tama Starclassic Bubinga (22"x18" Bass Drums x2, 12"x9" & 13"x10" Toms, 16"x16" Floor Tom)',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Zildjian (14" K Sweet Hi-Hats, 14" A Custom Hi-Hats, 18" K Custom Hybrid Crash, 19" A Custom Crash, 20" K Sweet Crash, 21" Z Custom Mega Bell Ride, 18" & 20" Chinas)',
      hardware: 'Tama Iron Cobra 900 Power Glide Double Pedal, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Tama Mario Duplantier Signature'
    }
  },
  {
    id: 16,
    name: 'Brann Dailor',
    band: 'Mastodon',
    genre: 'Progressive/Sludge Metal',
    image: '/images/drummers/16.webp',
    gear: {
      drums: 'Tama Starclassic Performer B/B',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Brilliant Heavy Hammered Crashes, 21" Ghost Ride, 18" Extra Dry China)',
      hardware: 'Tama Speed Cobra Double Pedal, Tama Iron Cobra Lever Glide Hi-Hat Stand, Tama 1st Chair Ergo-Rider Throne',
      sticks: 'Vater 5B'
    }
  },
  {
    id: 17,
    name: 'Chris Adler',
    band: 'Lamb of God',
    genre: 'Groove Metal',
    image: '/images/drummers/17.webp',
    gear: {
      drums: 'Mapex Black Panther Design Lab',
      snare: 'Mapex Chris Adler Signature 14x5.5" Walnut/Maple',
      cymbals: 'Meinl Byzance Series (14" Dark Hi-Hats, 18" & 19" Dark Crashes, 21" Transition Ride, 18" Extra Dry China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Promark TX5AXW Chris Adler Signature'
    }
  },
  {
    id: 18,
    name: 'Matt Halpern',
    band: 'Periphery',
    genre: 'Progressive/Djent',
    image: '/images/drummers/18.webp',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Meinl Byzance Series (15" Dark Hi-Hats, 18" & 20" Extra Dry Medium Crashes, 22" Transition Ride, 18" Extra Dry China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Promark Matt Halpern Signature'
    }
  },
  {
    id: 19,
    name: 'Inferno',
    band: 'Behemoth',
    genre: 'Black/Death Metal',
    image: '/images/drummers/19.webp',
    gear: {
      drums: 'Pearl Masterworks',
      snare: 'Pearl Reference 14x5" Steel',
      cymbals: 'Paiste RUDE Series (14" Hi-Hats, 14" Blast China, 18" & 19" Crashes, 24" Mega Power Ride, 18" China)',
      hardware: "Czarcie Kopyto (Devil's Hoof) Double Pedal, Pearl D-2000 Throne",
      sticks: 'Vic Firth 5B'
    }
  },
  {
    id: 20,
    name: 'Hellhammer',
    band: 'Mayhem',
    genre: 'Black Metal',
    image: '/images/drummers/20.webp',
    gear: {
      drums: 'Sonor SQ2 Heavy Beech',
      snare: 'Sonor SQ2 14x5.5" Maple',
      cymbals: 'Paiste (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 20" RUDE Ride, 18" RUDE China)',
      hardware: 'Axis Double Pedal, Sonor Drummer Throne, Roland Electronics',
      sticks: 'Vic Firth American Classic 5B'
    }
  },
  {
    id: 21,
    name: 'Pete Sandoval',
    band: 'Morbid Angel',
    genre: 'Death Metal',
    image: '/images/drummers/21.webp',
    gear: {
      drums: 'ddrum Dios Series',
      snare: 'ddrum Dios 14x6.5" Maple',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 20" Stage Ride, 18" Chinese)',
      hardware: 'ddrum Mercury Double Pedal, ddrum Throne',
      sticks: 'Ahead Lars Ulrich Signature'
    }
  },
  {
    id: 22,
    name: 'Art Cruz',
    band: 'Lamb of God',
    genre: 'Groove Metal / Thrash Metal',
    image: '/images/drummers/22.webp',
    gear: {
      drums: 'Ludwig Drums',
      snare: 'Ludwig 14x6.5" Black Beauty',
      cymbals: 'Zildjian (14" A Custom Mastersound Hi-Hats, 18" A Custom EFX, 18" A Custom Medium Crash, 19" A Custom Projection Crash, 20" A Custom Crash, 21" A Zildjian Mega Bell Ride, 19" A Ultra Hammered Chinas, 17" K China w/ EFX Holes, 9" FX Trash Splashes, FX Blast Bell)',
      hardware: 'Trick Pro 1-V Double Pedal, Gibraltar Hardware, Ludwig Atlas Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans'
    }
  },
  {
    id: 23,
    name: 'Arin Ilejay',
    band: 'ex-Avenged Sevenfold',
    genre: 'Heavy Metal / Hard Rock',
    image: '/images/drummers/23.webp',
    gear: {
      drums: 'Mapex Saturn Series',
      snare: 'Mapex Black Panther 14x6.5"',
      cymbals: 'Zildjian (14" A Custom Mastersound Hi-Hats, 18" & 19" A Custom Crashes, 21" A Sweet Ride, 18" A Custom China)',
      hardware: 'Mapex Falcon Double Pedal, Mapex T865 Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans'
    }
  },
  {
    id: 24,
    name: 'Navene Koperweis',
    band: 'Entheos / ex-Animals as Leaders',
    genre: 'Progressive Metal / Djent / Technical Death Metal',
    image: '/images/drummers/24.webp',
    gear: {
      drums: 'DW Drums Performance Series',
      snare: 'DW Performance 14x6.5" Steel',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 19" Extra Dry Medium Crashes, 21" Transition Ride, 18" Extra Dry China, 10" Splash)',
      hardware: 'DW 9000 Series Double Pedal, DW Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans'
    }
  },
  {
    id: 25,
    name: 'Alex Bent',
    band: 'ex-Trivium / Arkaik / Dragonlord',
    genre: 'Heavy Metal / Thrash Metal / Technical Death Metal',
    image: '/images/drummers/25.webp',
    gear: {
      drums: 'Pearl Reference Pure Series',
      snare: 'Pearl Reference 14x5" Brass',
      cymbals: 'Zildjian (14" K Custom Hybrid Hi-Hats, 18" & 19" K Custom Hybrid Crashes, 21" K Custom Hybrid Ride, 18" A Custom China)',
      hardware: 'Axis A Longboard Double Pedal, Pearl D-3000 Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Remo'
    }
  },
  {
    id: 26,
    name: 'Shannon Larkin',
    band: 'Godsmack / Ugly Kid Joe / Amen',
    genre: 'Hard Rock / Heavy Metal / Nu Metal',
    image: '/images/drummers/26.webp',
    gear: {
      drums: 'ddrum Dios Series',
      snare: 'ddrum Dios 14x6.5" Maple',
      cymbals: 'Sabian AAX & HHX Series (14" AAX Stage Hi-Hats, 18" & 19" AAX X-Plosion Crashes, 21" HHX Raw Bell Dry Ride, 10" AAX Splash, 18" AAX Chinese)',
      hardware: 'DW 9000 Series Double Pedal, ddrum Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans'
    }
  },
  {
    id: 27,
    name: 'Raymond Herrera',
    band: "Fear Factory / Arkaea / Brujeria",
    genre: 'Industrial Metal / Death Metal',
    image: '/images/drummers/27.webp',
    gear: {
      drums: 'Tama Starclassic',
      snare: 'Tama 14x6.5" Brass',
      cymbals: 'Zildjian A Custom & Z Custom Series (14" A Custom Hi-Hats, 18" & 19" A Custom Crashes, 21" Z Custom Mega Bell Ride, 18" A Custom China)',
      hardware: 'DW 5000 Series Double Pedal, Tama Power Tower Custom Rack, Tama Wide Rider Throne',
      sticks: 'Pro-Mark 5A Oak Nylon Tip',
      heads: 'Attack Drumheads'
    }
  },
  {
    id: 28,
    name: 'Morgan Ågren',
    band: "Mats/Morgan Band / Kaipa / Fredrik Thordendal's Special Defects",
    genre: 'Progressive Rock / Progressive Metal / Jazz Fusion',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Morgan_Agren_04.jpg',
    gear: {
      drums: 'Sonor SQ2 Designer Series',
      snare: 'Sonor Designer 14x5.5" Maple',
      cymbals: 'Paiste Signature & 2002 Series (14" Signature Heavy Hi-Hats, 18" & 20" Signature Fast Crashes, 22" Signature Dry Heavy Ride, 18" 2002 China)',
      hardware: 'Sonor Giant Step Double Pedal, Sonor Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Remo'
    }
  },
  {
    id: 29,
    name: 'Igor Cavalera',
    band: 'Sepultura / Cavalera Conspiracy / Soulwax',
    genre: 'Thrash Metal / Groove Metal / Death Metal',
    image: '/images/drummers/29.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6.5" G-Maple',
      cymbals: 'Paiste RUDE & 2002 Series (14" RUDE Hi-Hats, 18" & 19" RUDE Crashes, 22" RUDE Power Ride, 18" 2002 China)',
      hardware: 'Tama Iron Cobra Double Pedal, Tama Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans'
    }
  },
  {
    id: 30,
    name: 'Bill Ward',
    band: 'Black Sabbath',
    genre: 'Heavy Metal / Hard Rock / Blues Rock',
    image: '/images/drummers/30.webp',
    gear: {
      drums: 'Ludwig Classic Maple',
      snare: 'Ludwig Supraphonic 14x6.5" LM402',
      cymbals: 'Paiste 2002 & Giant Beat Series (15" Giant Beat Hi-Hats, 18" & 20" 2002 Crashes, 24" 2002 Ride, 18" 2002 China)',
      hardware: 'Ludwig Atlas Pro Double Pedal, Ludwig Throne',
      sticks: 'Vic Firth American Classic 2B',
      heads: 'Remo'
    }
  },
  {
    id: 31,
    name: 'Nick Augusto',
    band: 'ex-Trivium',
    genre: 'Metalcore / Thrash Metal',
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nick_Augusto_2016.jpg',
    gear: {
      drums: 'Pearl Reference Pure',
      snare: 'Pearl Reference 14x6.5" Brass',
      cymbals: 'Sabian AAX Series (14" Stage Hi-Hats, 18" & 19" X-Plosion Crashes, 21" Stage Ride, 18" AAXtreme China)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Evans'
    }
  },
  {
    id: 32,
    name: 'Chris Turner',
    band: 'Oceans Ate Alaska',
    genre: 'Progressive Metalcore',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Oceans_Ate_Alaska_0002.jpg',
    gear: {
      drums: 'Tama Starclassic Maple/Birch',
      snare: 'Tama S.L.P. 14x5.5" G-Maple',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 20" Extra Dry Medium Crashes, 22" Dual Ride, 18" Extra Dry China)',
      hardware: 'Tama Speed Cobra 910 Double Pedal, Tama 1st Chair Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans'
    }
  },
  {
    id: 33,
    name: 'Matt Greiner',
    band: 'August Burns Red',
    genre: 'Metalcore / Christian Metal',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/2017_Matt_Greiner_%28cropped%29.jpg',
    gear: {
      drums: 'Meinl Drum Festival Kit / Greiner & Kilmer Custom',
      snare: 'Greiner & Kilmer Custom 14x6.5" Maple',
      cymbals: 'Meinl Byzance Series (15" Dual Hi-Hats, 18" & 19" Dual Crashes, 21" Transition Ride, 18" Extra Dry China, 10" & 12" Splashes)',
      hardware: 'DW 9000 Series Double Pedal, DW 9100 Throne',
      sticks: 'Vic Firth American Classic 5A',
      heads: 'Evans'
    }
  },
  {
    id: 34,
    name: 'Blake Richardson',
    band: 'Between the Buried and Me',
    genre: 'Progressive Metal / Technical Death Metal',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Between_the_Buried_and_Me_%C3%A0_Aarau_%2844226638080%29.jpg',
    gear: {
      drums: 'Tama Starclassic Bubinga (Custom Finish)',
      snare: 'Tama STARPHONIC 14x6" Brass',
      cymbals: 'Sabian (14" HHX Evolution Hi-Hats, 18" HHX Evolution Crash, 17" & 21" AAX Holy Chinas, 21" HH Raw Bell Dry Ride, 10" HH Duo Splash, 9" Radia Cup Chime)',
      hardware: 'Tama Iron Cobra Power Glide Single Pedals (x2), Tama Hardware',
      sticks: 'Vic Firth American Classic 3A',
      heads: 'Evans (Hybrid on snare, EMAD on kicks, EC2 SST on toms)'
    }
  },
  {
    id: 35,
    name: 'Ben Koller',
    band: 'Converge / Mutoid Man / Killer Be Killed',
    genre: 'Metalcore / Hardcore Punk / Grindcore',
    image: '/images/drummers/35.webp',
    gear: {
      drums: 'Tama Starclassic Maple',
      snare: 'Tama S.L.P. 14x6" Brass',
      cymbals: 'Zildjian (14" K Dark Thin Hi-Hats, 18" & 19" K Dark Medium Thin Crashes, 21" K Custom Ride, 18" K China)',
      hardware: 'Tama Iron Cobra 900 Double Pedal, Tama Throne',
      sticks: 'Vic Firth American Classic 5B',
      heads: 'Remo'
    }
  },
  {
    id: 36,
    name: 'Flo Mounier',
    band: 'Cryptopsy',
    genre: 'Technical Death Metal / Brutal Death Metal',
    image: '/images/drummers/36.webp',
    gear: {
      drums: 'Pearl Reference Series',
      snare: 'Pearl Reference 14x5.5" Brass',
      cymbals: 'Sabian (14" HHX Evolution Hi-Hats, 18" & 19" HHX Evolution Crashes, 21" HHX Evolution Ride, 18" AAX Chinese)',
      hardware: 'Pearl Demon Drive Double Pedal, Pearl D-2000 Throne',
      sticks: 'Vic Firth Extreme 5B',
      heads: 'Evans'
    }
  }
];

// Normalize search text for matching
function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Search gear across all drummers
function searchGear(query) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery || normalizedQuery.length < 2) {
    return { results: [], total: 0, query };
  }

  const queryTerms = normalizedQuery.split(' ').filter(t => t.length >= 2);
  const results = [];

  for (const drummer of drummers) {
    if (!drummer.gear) continue;

    const matchedGear = [];

    // Search through each gear category
    for (const [category, gearText] of Object.entries(drummer.gear)) {
      if (typeof gearText !== 'string') continue;

      const normalizedGear = normalizeText(gearText);
      
      // Check if all query terms match
      const allTermsMatch = queryTerms.every(term => normalizedGear.includes(term));
      
      if (allTermsMatch) {
        matchedGear.push({
          category,
          item: gearText,
          // Calculate match score (more matching terms = higher score)
          score: queryTerms.reduce((score, term) => {
            const count = (normalizedGear.match(new RegExp(term, 'g')) || []).length;
            return score + count;
          }, 0)
        });
      }
    }

    if (matchedGear.length > 0) {
      // Sort matched gear by score (highest first)
      matchedGear.sort((a, b) => b.score - a.score);
      
      results.push({
        id: drummer.id,
        name: drummer.name,
        band: drummer.band,
        genre: drummer.genre,
        image: drummer.image,
        matchedGear: matchedGear.map(({ category, item }) => ({ category, item })),
        totalScore: matchedGear.reduce((sum, g) => sum + g.score, 0)
      });
    }
  }

  // Sort results by total score (highest first)
  results.sort((a, b) => b.totalScore - a.totalScore);

  return {
    results,
    total: results.length,
    query
  };
}

// Get all unique gear items for suggestions
function getAllGearItems() {
  const gearSet = new Map();
  
  for (const drummer of drummers) {
    if (!drummer.gear) continue;
    
    for (const [category, gearText] of Object.entries(drummer.gear)) {
      if (typeof gearText !== 'string') continue;
      
      // Extract brand and model names
      const parts = gearText.split(/[,()]/);
      for (const part of parts) {
        const cleaned = part.trim();
        if (cleaned.length >= 3 && !cleaned.match(/^\d+/)) {
          const key = normalizeText(cleaned);
          if (!gearSet.has(key)) {
            gearSet.set(key, { text: cleaned, category, count: 1 });
          } else {
            gearSet.get(key).count++;
          }
        }
      }
    }
  }
  
  // Sort by count (popularity)
  return Array.from(gearSet.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 100); // Top 100 gear items
}

// Get popular search suggestions
function getPopularGear() {
  return [
    { text: 'Tama Iron Cobra', category: 'hardware' },
    { text: 'Pearl Demon Drive', category: 'hardware' },
    { text: 'Tama Starclassic', category: 'drums' },
    { text: 'Pearl Reference', category: 'drums' },
    { text: 'Sonor SQ2', category: 'drums' },
    { text: 'Zildjian A Custom', category: 'cymbals' },
    { text: 'Sabian AAX', category: 'cymbals' },
    { text: 'Paiste RUDE', category: 'cymbals' },
    { text: 'Meinl Byzance', category: 'cymbals' },
    { text: 'Vic Firth 5B', category: 'sticks' },
    { text: 'Evans', category: 'heads' },
    { text: 'Remo', category: 'heads' },
    { text: 'DW 9000', category: 'hardware' },
    { text: 'Ludwig Black Beauty', category: 'snare' },
    { text: 'Promark', category: 'sticks' }
  ];
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q, suggestions } = req.query;

  // If suggestions requested, return popular gear
  if (suggestions === 'true' || suggestions === '1') {
    return res.status(200).json({
      suggestions: getPopularGear(),
      total: getPopularGear().length
    });
  }

  // Search by query
  if (q) {
    const searchResults = searchGear(q);
    return res.status(200).json(searchResults);
  }

  // No query - return empty results with suggestions
  return res.status(200).json({
    results: [],
    total: 0,
    suggestions: getPopularGear()
  });
}
