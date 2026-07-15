/**
 * Band data structure for MetalForge
 * Contains band information with drummer history
 * Issue #359: Added Sepultura band data
 * Issue #429: Added sameAs links for MusicGroup schema
 */

export const bands = {
  metallica: {
    slug: "metallica",
    name: "Metallica",
    formed: 1981,
    origin: "Los Angeles, California, USA",
    genres: ["thrash-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Metallica - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Metallica drumming legacy with Lars Ulrich.",
    summary: "Metallica, formed in 1981 in Los Angeles, is one of the most influential thrash metal bands.",
    keywords: ["metallica", "lars ulrich", "thrash metal", "metal drums", "drummer gear"],
    drummerHistory: [{ drummer: "lars-ulrich", period: "1981-present", notes: "Co-founder" }],
    relatedBands: ["slayer", "megadeth", "anthrax"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Metallica",
      "https://www.discogs.com/artist/18839-Metallica",
      "https://musicbrainz.org/artist/65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab",
      "https://www.wikidata.org/wiki/Q15920"
    ],
  },
  sepultura: {
    slug: "sepultura",
    name: "Sepultura",
    formed: 1984,
    origin: "Belo Horizonte, Brazil",
    genres: ["thrash-metal", "groove-metal", "death-metal"],
    status: "disbanded",
    metaTitle: "Sepultura Drummer History - Igor to Eloy | MetalForge",
    metaDescription: "Complete Sepultura drummer history from Igor Cavalera to Eloy Casagrande.",
    summary: "Sepultura formed 1984, Brazilian thrash pioneers, disbanded 2024.",
    keywords: ["sepultura", "igor cavalera", "eloy casagrande", "brazilian metal"],
    drummerHistory: [
      { drummer: "igor-cavalera", period: "1984-2006", notes: "Co-founder with brother Max" },
      { drummer: "jean-dolabella", period: "2006-2011", notes: "" },
      { drummer: "eloy-casagrande", period: "2011-2024", notes: "Final drummer, now in Slipknot" }
    ],
    relatedBands: ["cavalera-conspiracy", "slipknot"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Sepultura",
      "https://www.discogs.com/artist/18291-Sepultura",
      "https://musicbrainz.org/artist/c44e9c22-ef82-4a77-9bcd-af6c958446d6",
      "https://www.wikidata.org/wiki/Q207036"
    ],
    faq: [
      { q: "Is Sepultura still active?", a: "No, they completed a farewell tour in 2024." },
      { q: "Who was Sepultura's last drummer?", a: "Eloy Casagrande (2011-2024), now in Slipknot." },
      { q: "Why did Igor Cavalera leave?", a: "He left in 2006 due to conflicts with management." }
    ],
  },
  tool: {
    slug: "tool",
    name: "Tool",
    formed: 1990,
    origin: "Los Angeles, California, USA",
    genres: ["progressive-metal", "alternative-metal", "art-rock"],
    status: "active",
    metaTitle: "Tool - Danny Carey Drummer Profile & Gear | MetalForge",
    metaDescription: "Complete profile of Tool's legendary drummer Danny Carey. Explore his polyrhythmic genius, Sonor drum setup, sacred geometry influences, and Grammy-winning career.",
    summary: "Tool, formed in 1990 in Los Angeles, is one of the most influential progressive metal bands, known for complex polyrhythmic compositions, unusual time signatures, visual artistry, and philosophical lyrics. With four Grammy wins and five studio albums (including the 13-year-awaited Fear Inoculum), Tool has redefined the boundaries of heavy music.",
    keywords: ["tool", "danny carey", "progressive metal", "polyrhythm", "drummer gear", "maynard james keenan", "lateralus", "fear inoculum", "sacred geometry", "sonor drums", "grammy winners"],
    members: [
      { name: "Danny Carey", role: "Drums", period: "1990-present", notes: "Founding member, polyrhythmic genius" },
      { name: "Maynard James Keenan", role: "Vocals", period: "1990-present", notes: "Also frontman of A Perfect Circle and Puscifer" },
      { name: "Adam Jones", role: "Guitar", period: "1990-present", notes: "Founding member, visual effects artist, stop-motion video director" },
      { name: "Justin Chancellor", role: "Bass", period: "1995-present", notes: "Replaced Paul D'Amour" }
    ],
    formerMembers: [
      { name: "Paul D'Amour", role: "Bass", period: "1990-1995", notes: "Founding member, played on Undertow" }
    ],
    drummerHistory: [{ drummer: "danny-carey", period: "1990-present", notes: "Founding member, only drummer in band history" }],
    relatedBands: ["volto"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Tool_(band)",
      "https://www.discogs.com/artist/24069-Tool",
      "https://musicbrainz.org/artist/66fc5bf8-daa4-4241-b378-9bc9077571d6",
      "https://www.wikidata.org/wiki/Q184188",
      "https://www.allmusic.com/artist/tool-mn0000036614"
    ],
    discography: [
      { name: "Opiate", year: 1992, type: "EP" },
      { name: "Undertow", year: 1993, type: "Album" },
      { name: "Ænima", year: 1996, type: "Album", note: "Grammy: Best Metal Performance" },
      { name: "Lateralus", year: 2001, type: "Album", note: "Grammy: Best Metal Performance (Schism)" },
      { name: "10,000 Days", year: 2006, type: "Album", note: "Grammy: Best Recording Package" },
      { name: "Fear Inoculum", year: 2019, type: "Album", note: "Grammy: Best Metal Performance" }
    ],
    faq: [
      { q: "Who is Tool's drummer?", a: "Danny Carey has been Tool's only drummer since their formation in 1990. He's known for polyrhythmic patterns and sacred geometry influences." },
      { q: "Why did Tool take 13 years between albums?", a: "Tool's gap between 10,000 Days (2006) and Fear Inoculum (2019) was due to legal battles with their record label and the band's meticulous creative process." },
      { q: "How many Grammys has Tool won?", a: "Tool has won four Grammy Awards for Best Metal Performance: Ænima (1998), Schism (2002), 10,000 Days (2006 - packaging), and Fear Inoculum (2020)." },
      { q: "What drums does Danny Carey play?", a: "Danny Carey plays Sonor SQ2 Heavy Beech drums with Paiste cymbals, Mandala electronic pads, and his signature bronze snare drum." },
      { q: "What time signature does Tool use?", a: "Tool frequently uses complex and unusual time signatures like 7/8, 5/4, 11/8, and polyrhythms. Songs like 'Schism' famously shift between multiple time signatures." },
      { q: "Is Danny Carey in the Modern Drummer Hall of Fame?", a: "Yes, Danny Carey was inducted into the Modern Drummer Hall of Fame in 2016." }
    ],
  },
  gojira: {
    slug: "gojira",
    name: "Gojira",
    formed: 1996,
    origin: "Bayonne, France",
    genres: ["progressive-death-metal", "groove-metal", "technical-metal"],
    status: "active",
    metaTitle: "Gojira - Mario Duplantier Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Gojira's powerhouse drummer Mario Duplantier and his complete gear setup.",
    summary: "Gojira is a French progressive/technical death metal band formed in 1996 in Bayonne by brothers Joe and Mario Duplantier. Originally named Godzilla, they changed to Gojira in 2001. Known for their environmentally-conscious lyrics, crushing grooves, and technical precision, Gojira has become one of the most influential metal bands of the 21st century. Albums like 'From Mars to Sirius' and 'Magma' have earned Grammy nominations and critical acclaim worldwide.",
    keywords: ["gojira", "mario duplantier", "joe duplantier", "progressive death metal", "french metal", "drummer gear", "flying whales", "environmental metal"],
    members: [
      { name: "Joe Duplantier", role: "Vocals, Guitar", period: "1996-present", notes: "Co-founder" },
      { name: "Mario Duplantier", role: "Drums", period: "1996-present", notes: "Co-founder, visual artist" },
      { name: "Christian Andreu", role: "Guitar", period: "1996-present", notes: "Co-founder" },
      { name: "Jean-Michel Labadie", role: "Bass", period: "2001-present", notes: "Joined after Godzilla era" }
    ],
    pastMembers: [
      { name: "Alexandre Cornillon", role: "Bass", period: "1996-2001", notes: "Original bassist during Godzilla era" }
    ],
    drummerHistory: [{ drummer: "mario-duplantier", period: "1996-present", notes: "Co-founder with brother Joe, has been the only drummer in band history" }],
    discography: [
      { album: "Terra Incognita", year: 2001 },
      { album: "The Link", year: 2003 },
      { album: "From Mars to Sirius", year: 2005 },
      { album: "The Way of All Flesh", year: 2008 },
      { album: "L'Enfant Sauvage", year: 2012 },
      { album: "Magma", year: 2016 },
      { album: "Fortitude", year: 2021 }
    ],
    relatedBands: ["mastodon", "opeth", "meshuggah", "lamb-of-god", "periphery"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Gojira_(band)",
      "https://www.discogs.com/artist/283955-Gojira",
      "https://musicbrainz.org/artist/1c5e1c3b-3f69-4bfe-9143-4e60c6ed8bf5",
      "https://www.wikidata.org/wiki/Q645883"
    ],
    faq: [
      { q: "Why is Gojira called Gojira?", a: "The band was originally named Godzilla but changed to Gojira (the Japanese name for Godzilla) in 2001 to avoid trademark issues." },
      { q: "Are Joe and Mario Duplantier brothers?", a: "Yes, Joe (vocals/guitar) and Mario (drums) Duplantier are brothers who co-founded the band in 1996." },
      { q: "What is Gojira's most famous song?", a: "'Flying Whales' from the 2005 album 'From Mars to Sirius' is widely considered their signature song and a modern metal classic." },
      { q: "Has Gojira won a Grammy?", a: "While they haven't won, Gojira has received multiple Grammy nominations including Best Metal Performance for 'Silvera' (2017) and 'Amazonia' (2022)." },
      { q: "Where is Gojira from?", a: "Gojira is from Bayonne, a city in the Basque region of southwestern France near the Spanish border." }
    ],
  },
  slipknot: {
    slug: "slipknot",
    name: "Slipknot",
    formed: 1995,
    origin: "Des Moines, Iowa, USA",
    genres: ["nu-metal", "alternative-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Slipknot - Drummer History & Gear | MetalForge",
    metaDescription: "Complete history of Slipknot drummers from Joey Jordison to Eloy Casagrande.",
    summary: "Slipknot, formed in 1995 in Des Moines, pioneered the masked nu-metal movement.",
    keywords: ["slipknot", "joey jordison", "jay weinberg", "eloy casagrande", "nu metal", "drummer gear"],
    drummerHistory: [
      { drummer: "joey-jordison", period: "1995-2013", notes: "Founding member, iconic masked drummer" },
      { drummer: "jay-weinberg", period: "2014-2023", notes: "Son of Max Weinberg" },
      { drummer: "eloy-casagrande", period: "2023-present", notes: "Former Sepultura drummer" }
    ],
    relatedBands: ["murderdolls", "sepultura"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Slipknot_(band)",
      "https://www.discogs.com/artist/163683-Slipknot",
      "https://musicbrainz.org/artist/a466c2a2-6517-42fb-a160-1087c3bafd9f",
      "https://www.wikidata.org/wiki/Q188840"
    ],
  },
  slayer: {
    slug: "slayer",
    name: "Slayer",
    formed: 1981,
    origin: "Huntington Park, California, USA",
    genres: ["thrash-metal", "speed-metal"],
    status: "disbanded",
    metaTitle: "Slayer - Dave Lombardo Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Slayer's legendary drummer Dave Lombardo and his iconic gear.",
    summary: "Slayer, formed in 1981, defined extreme thrash metal with aggressive drumming.",
    keywords: ["slayer", "dave lombardo", "thrash metal", "double bass", "drummer gear"],
    drummerHistory: [
      { drummer: "dave-lombardo", period: "1981-1992, 2001-2013", notes: "Co-founder, pioneered extreme thrash drumming" },
      { drummer: "paul-bostaph", period: "1992-2001, 2013-2019", notes: "Two separate stints" }
    ],
    relatedBands: ["metallica", "megadeth", "anthrax", "testament"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Slayer",
      "https://www.discogs.com/artist/18843-Slayer",
      "https://musicbrainz.org/artist/bdacc37b-8633-4bf0-9a08-fc8c98014ad5",
      "https://www.wikidata.org/wiki/Q188859"
    ],
  },
  meshuggah: {
    slug: "meshuggah",
    name: "Meshuggah",
    formed: 1987,
    origin: "Umeå, Sweden",
    genres: ["progressive-metal", "djent", "extreme-metal"],
    status: "active",
    metaTitle: "Meshuggah - Tomas Haake Drummer Profile & Gear | MetalForge",
    metaDescription: "Discover Tomas Haake's revolutionary polyrhythmic drumming with Meshuggah.",
    summary: "Meshuggah, formed in 1987 in Sweden, pioneered djent and polyrhythmic metal.",
    keywords: ["meshuggah", "tomas haake", "djent", "polyrhythm", "progressive metal", "drummer gear"],
    drummerHistory: [{ drummer: "tomas-haake", period: "1990-present", notes: "Joined shortly after formation" }],
    relatedBands: ["periphery", "animals-as-leaders"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Meshuggah",
      "https://www.discogs.com/artist/73547-Meshuggah",
      "https://musicbrainz.org/artist/cf8b3b8c-118e-4136-8d1d-c37091173413",
      "https://www.wikidata.org/wiki/Q498476"
    ],
  },
  "dream-theater": {
    slug: "dream-theater",
    name: "Dream Theater",
    formed: 1985,
    origin: "Boston, Massachusetts, USA",
    genres: ["progressive-metal", "progressive-rock"],
    status: "active",
    metaTitle: "Dream Theater - Mike Portnoy Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Mike Portnoy's legendary progressive metal drumming with Dream Theater.",
    summary: "Dream Theater, formed in 1985, defined progressive metal with virtuosic musicianship.",
    keywords: ["dream theater", "mike portnoy", "progressive metal", "technical drumming", "drummer gear"],
    drummerHistory: [
      { drummer: "mike-portnoy", period: "1985-2010, 2023-present", notes: "Co-founder, returned in 2023" },
      { drummer: "mike-mangini", period: "2010-2023", notes: "Berklee professor" }
    ],
    relatedBands: ["sons-of-apollo"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Dream_Theater",
      "https://www.discogs.com/artist/140607-Dream-Theater",
      "https://musicbrainz.org/artist/28503ab7-8bf2-4666-a7bd-2644bfc7cb1d",
      "https://www.wikidata.org/wiki/Q191248"
    ],
  },
  pantera: {
    slug: "pantera",
    name: "Pantera",
    formed: 1981,
    origin: "Arlington, Texas, USA",
    genres: ["groove-metal", "thrash-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Pantera - Vinnie Paul & Charlie Benante Drummer History | MetalForge",
    metaDescription: "Complete history of Pantera drummers from Vinnie Paul to Charlie Benante.",
    summary: "Pantera, formed in 1981, defined groove metal with Vinnie Paul's powerful drumming.",
    keywords: ["pantera", "vinnie paul", "charlie benante", "groove metal", "drummer gear"],
    drummerHistory: [
      { drummer: "vinnie-paul", period: "1981-2003", notes: "Co-founder with brother Dimebag Darrell" },
      { drummer: "charlie-benante", period: "2022-present", notes: "Anthrax drummer filling in for reunion" }
    ],
    relatedBands: ["damageplan", "hellyeah", "anthrax"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Pantera",
      "https://www.discogs.com/artist/81780-Pantera",
      "https://musicbrainz.org/artist/eb11dd1b-83ff-4e0e-9f0f-e78ad639a5d3",
      "https://www.wikidata.org/wiki/Q334382"
    ],
  },
  anthrax: {
    slug: "anthrax",
    name: "Anthrax",
    formed: 1981,
    origin: "New York City, USA",
    genres: ["thrash-metal", "speed-metal"],
    status: "active",
    metaTitle: "Anthrax - Charlie Benante Drummer Profile & Gear | MetalForge",
    metaDescription: "Discover Charlie Benante's pioneering thrash drumming with Anthrax.",
    summary: "Anthrax, formed in 1981, is one of the Big Four of thrash metal.",
    keywords: ["anthrax", "charlie benante", "thrash metal", "big four", "drummer gear"],
    drummerHistory: [{ drummer: "charlie-benante", period: "1983-present", notes: "Joined shortly after formation" }],
    relatedBands: ["metallica", "slayer", "megadeth", "pantera"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Anthrax_(American_band)",
      "https://www.discogs.com/artist/79761-Anthrax",
      "https://musicbrainz.org/artist/f5511464-5e72-415c-8336-0e5f31e36633",
      "https://www.wikidata.org/wiki/Q188836"
    ],
  },
  // Issue #483: Added additional bands for MusicGroup schema coverage
  korn: {
    slug: "korn",
    name: "Korn",
    formed: 1993,
    origin: "Bakersfield, California, USA",
    genres: ["nu-metal", "alternative-metal"],
    status: "active",
    metaTitle: "Korn - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Korn's drummer history from David Silveria to Ray Luzier.",
    summary: "Korn, formed in 1993 in Bakersfield, California, is credited with pioneering the nu-metal genre.",
    keywords: ["korn", "ray luzier", "david silveria", "nu metal", "drummer gear"],
    drummerHistory: [
      { drummer: "david-silveria", period: "1993-2006", notes: "Founding member" },
      { drummer: "ray-luzier", period: "2007-present", notes: "Session and touring drummer, later official member" }
    ],
    relatedBands: ["limp-bizkit", "deftones", "slipknot"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Korn",
      "https://www.discogs.com/artist/3270-Korn",
      "https://musicbrainz.org/artist/ac865b2e-bba8-4f5a-8756-dd40d5e39f46",
      "https://www.wikidata.org/wiki/Q244815"
    ],
  },
  // Issue #543: Added Kublai Khan TX band data
  "kublai-khan-tx": {
    slug: "kublai-khan-tx",
    name: "Kublai Khan TX",
    formed: 2009,
    origin: "Sherman, Texas, USA",
    genres: ["metalcore", "beatdown-hardcore"],
    status: "active",
    metaTitle: "Kublai Khan TX - Isaac Lamb Drummer Profile & Gear | MetalForge",
    metaDescription: "Complete profile of Kublai Khan TX drummer Isaac Lamb. Explore his powerful beatdown hardcore style and the band's crushing breakdowns.",
    summary: "Kublai Khan TX, formed in 2009 in Sherman, Texas, is a leading force in beatdown hardcore and metalcore. Known for crushing breakdowns and socially conscious lyrics.",
    keywords: ["kublai khan tx", "isaac lamb", "beatdown hardcore", "metalcore", "texas hardcore", "drummer gear", "heavy breakdowns"],
    members: [
      { name: "Matt Honeycutt", role: "Vocals", period: "2009-present", notes: "Founding member" },
      { name: "Eric English", role: "Bass, Vocals", period: "2013-present", notes: "" },
      { name: "Isaac Lamb", role: "Drums", period: "2009-present", notes: "Founding member" },
      { name: "Nicholas Adams", role: "Guitar, Vocals", period: "2025-present", notes: "" }
    ],
    formerMembers: [
      { name: "Nolan Ashley", role: "Guitar", period: "2009-2025", notes: "Founding member" },
      { name: "Eric Waldrum", role: "Guitar", period: "", notes: "" },
      { name: "Micah Hutson", role: "Guitar", period: "", notes: "" },
      { name: "BJ Ownby", role: "Bass", period: "", notes: "" }
    ],
    drummerHistory: [
      { drummer: "isaac-lamb", period: "2009-present", notes: "Founding member, only drummer in band history" }
    ],
    discography: [
      { name: "Youth War", year: 2010, type: "EP", label: "Self-Released" },
      { name: "Balancing Survival and Happiness", year: 2014, type: "Album", label: "Artery Records" },
      { name: "New Strength", year: 2015, type: "Album", label: "Artery Records" },
      { name: "Nomad", year: 2017, type: "Album", label: "Rise Records" },
      { name: "Absolute", year: 2019, type: "Album", label: "Rise Records" },
      { name: "Lowest Form of Animal", year: 2022, type: "EP", label: "Rise Records" },
      { name: "Exhibition of Prowess", year: 2024, type: "Album", label: "Rise Records" }
    ],
    relatedBands: [],
    sameAs: [
      "https://en.wikipedia.org/wiki/Kublai_Khan_(band)",
      "https://www.discogs.com/artist/5066893-Kublai-Khan-5",
      "https://musicbrainz.org/artist/f67e0b3e-d350-435a-b8ea-9f5a1ab4a4e1",
      "https://www.wikidata.org/wiki/Q19829437"
    ],
    faq: [
      { q: "Why is Kublai Khan called Kublai Khan TX?", a: "The band added 'TX' to their name due to a legal dispute with a Minnesota thrash metal band also named Kublai Khan." },
      { q: "Who is Kublai Khan TX's drummer?", a: "Isaac Lamb has been the drummer since the band's formation in 2009—he is a founding member." },
      { q: "What genre is Kublai Khan TX?", a: "Kublai Khan TX plays beatdown hardcore and metalcore, influenced by bands like Hatebreed, Earth Crisis, and Integrity." },
      { q: "Where is Kublai Khan TX from?", a: "The band is from Sherman, Texas, about 60 miles north of Dallas." }
    ],
  },
  deftones: {
    slug: "deftones",
    name: "Deftones",
    formed: 1988,
    origin: "Sacramento, California, USA",
    genres: ["alternative-metal", "nu-metal", "shoegaze"],
    status: "active",
    metaTitle: "Deftones - Abe Cunningham Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Abe Cunningham's dynamic drumming with Deftones.",
    summary: "Deftones, formed in 1988 in Sacramento, blend heavy music with atmospheric, shoegaze textures.",
    keywords: ["deftones", "abe cunningham", "alternative metal", "shoegaze", "drummer gear"],
    drummerHistory: [
      { drummer: "abe-cunningham", period: "1988-present", notes: "Founding member" }
    ],
    relatedBands: ["korn"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Deftones",
      "https://www.discogs.com/artist/3279-Deftones",
      "https://musicbrainz.org/artist/7527f6c2-d762-4b88-b5e2-9244f1e34c46",
      "https://www.wikidata.org/wiki/Q214839"
    ],
  },
  death: {
    slug: "death",
    name: "Death",
    formed: 1984,
    origin: "Altamonte Springs, Florida, USA",
    genres: ["death-metal", "progressive-death-metal"],
    status: "disbanded",
    metaTitle: "Death - Drummer History & Gear | MetalForge",
    metaDescription: "Complete history of drummers for Death, the pioneering death metal band.",
    summary: "Death, formed in 1984 by Chuck Schuldiner, is considered the pioneer of death metal.",
    keywords: ["death", "chuck schuldiner", "death metal", "gene hoglan", "richard christy", "drummer gear"],
    drummerHistory: [
      { drummer: "gene-hoglan", period: "1993-1995", notes: "Played on Individual Thought Patterns and Symbolic" },
      { drummer: "richard-christy", period: "1996-1999", notes: "Played on The Sound of Perseverance" }
    ],
    relatedBands: ["morbid-angel", "cynic"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Death_(metal_band)",
      "https://www.discogs.com/artist/252889-Death",
      "https://musicbrainz.org/artist/f3f70cdc-6226-44e1-a9f7-d1af77cac979",
      "https://www.wikidata.org/wiki/Q488464"
    ],
  },
  "limp-bizkit": {
    slug: "limp-bizkit",
    name: "Limp Bizkit",
    formed: 1994,
    origin: "Jacksonville, Florida, USA",
    genres: ["nu-metal", "rap-metal"],
    status: "active",
    metaTitle: "Limp Bizkit - John Otto Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore John Otto's hip-hop influenced drumming with Limp Bizkit.",
    summary: "Limp Bizkit, formed in 1994, fused rap and metal to become one of the biggest nu-metal bands.",
    keywords: ["limp bizkit", "john otto", "nu metal", "rap metal", "drummer gear"],
    drummerHistory: [
      { drummer: "john-otto", period: "1994-present", notes: "Founding member" }
    ],
    relatedBands: ["korn", "slipknot"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Limp_Bizkit",
      "https://www.discogs.com/artist/65858-Limp-Bizkit",
      "https://musicbrainz.org/artist/e5db18cb-4b1f-496d-a308-548b611090d3",
      "https://www.wikidata.org/wiki/Q213936"
    ],
  },
  "suicidal-tendencies": {
    slug: "suicidal-tendencies",
    name: "Suicidal Tendencies",
    formed: 1980,
    origin: "Venice, California, USA",
    genres: ["crossover-thrash", "hardcore-punk", "thrash-metal"],
    status: "active",
    metaTitle: "Suicidal Tendencies - Drummer History & Gear | MetalForge",
    metaDescription: "Complete history of Suicidal Tendencies drummers.",
    summary: "Suicidal Tendencies, formed in 1980, pioneered the crossover thrash genre.",
    keywords: ["suicidal tendencies", "dave lombardo", "jay weinberg", "crossover thrash", "drummer gear"],
    drummerHistory: [
      { drummer: "dave-lombardo", period: "2016-present", notes: "Former Slayer drummer" },
      { drummer: "jay-weinberg", period: "2023-present", notes: "Former Slipknot drummer, touring" }
    ],
    relatedBands: ["slayer"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Suicidal_Tendencies",
      "https://www.discogs.com/artist/23913-Suicidal-Tendencies",
      "https://musicbrainz.org/artist/55d9aa71-5e72-4bc1-b1c0-7bf4e50b4d63",
      "https://www.wikidata.org/wiki/Q592786"
    ],
  },
  nile: {
    slug: "nile",
    name: "Nile",
    formed: 1993,
    origin: "Greenville, South Carolina, USA",
    genres: ["technical-death-metal", "brutal-death-metal"],
    status: "active",
    metaTitle: "Nile - George Kollias Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore George Kollias's extreme drumming with Nile.",
    summary: "Nile, formed in 1993, combines technical death metal with ancient Egyptian themes.",
    keywords: ["nile", "george kollias", "technical death metal", "egyptian metal", "drummer gear"],
    drummerHistory: [
      { drummer: "george-kollias", period: "2004-present", notes: "Greek drummer known for extreme speed" }
    ],
    relatedBands: ["behemoth", "cannibal-corpse", "morbid-angel"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Nile_(band)",
      "https://www.discogs.com/artist/287805-Nile-3",
      "https://musicbrainz.org/artist/5a6b3210-3d77-417e-ad30-5d2f4ae8aa07",
      "https://www.wikidata.org/wiki/Q1412988"
    ],
  },
  "cannibal-corpse": {
    slug: "cannibal-corpse",
    name: "Cannibal Corpse",
    formed: 1988,
    origin: "Buffalo, New York, USA",
    genres: ["death-metal"],
    status: "active",
    metaTitle: "Cannibal Corpse - Paul Mazurkiewicz Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Paul Mazurkiewicz's brutal drumming with Cannibal Corpse.",
    summary: "Cannibal Corpse, formed in 1988, is one of the best-selling and most influential death metal bands.",
    keywords: ["cannibal corpse", "paul mazurkiewicz", "death metal", "brutal death metal", "drummer gear"],
    drummerHistory: [
      { drummer: "paul-mazurkiewicz", period: "1988-present", notes: "Founding member" }
    ],
    relatedBands: ["morbid-angel"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Cannibal_Corpse",
      "https://www.discogs.com/artist/288259-Cannibal-Corpse",
      "https://musicbrainz.org/artist/9b63b8fa-e219-45b1-9d0e-bbdb8b8b93eb",
      "https://www.wikidata.org/wiki/Q467574"
    ],
  },
  // Issue #4704: Added 16 bands grounded in existing extendedBios.js drummer tenure data
  megadeth: {
    slug: "megadeth",
    name: "Megadeth",
    formed: 1983,
    origin: "Los Angeles, California, USA",
    genres: ["thrash-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Megadeth - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Megadeth's drumming legacy with Nick Menza and Dirk Verbeuren.",
    summary: "Megadeth, formed in 1983 in Los Angeles by Dave Mustaine after his departure from Metallica, is one of the 'Big Four' of thrash metal, known for technically complex musicianship.",
    keywords: ["megadeth", "nick menza", "dirk verbeuren", "thrash metal", "drummer gear"],
    drummerHistory: [
      { drummer: "nick-menza", period: "1989-1998, 2004", notes: "Powered Rust in Peace and Countdown to Extinction" },
      { drummer: "dirk-verbeuren", period: "2016-present", notes: "Former Soilwork drummer, current drummer" }
    ],
    relatedBands: ["metallica", "slayer", "anthrax"],
    sameAs: ["https://en.wikipedia.org/wiki/Megadeth"],
  },
  testament: {
    slug: "testament",
    name: "Testament",
    formed: 1983,
    origin: "Berkeley, California, USA",
    genres: ["thrash-metal"],
    status: "active",
    metaTitle: "Testament - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Testament's drumming legacy with Paul Bostaph, Gene Hoglan, and Jon Dette.",
    summary: "Testament, formed in 1983 in Berkeley, California under the name Legacy, is one of the most enduring thrash metal bands, renamed Testament in 1986.",
    keywords: ["testament", "paul bostaph", "gene hoglan", "jon dette", "thrash metal", "drummer gear"],
    drummerHistory: [
      { drummer: "paul-bostaph", period: "1999-2001, 2024-present", notes: "Two stints as Testament drummer" },
      { drummer: "gene-hoglan", period: "2007-present", notes: "Known as 'The Atomic Clock' for precision" },
      { drummer: "jon-dette", period: "1997-1999, 2001-2012", notes: "Also toured with Slayer and Anthrax" }
    ],
    relatedBands: ["slayer"],
    sameAs: ["https://en.wikipedia.org/wiki/Testament_(band)"],
  },
  "lamb-of-god": {
    slug: "lamb-of-god",
    name: "Lamb of God",
    formed: 1994,
    origin: "Richmond, Virginia, USA",
    genres: ["groove-metal", "metalcore"],
    status: "active",
    metaTitle: "Lamb of God - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Lamb of God's drumming legacy with Chris Adler and Art Cruz.",
    summary: "Lamb of God, formed in 1994 in Richmond, Virginia as Burn the Priest, became a leading force in the new wave of American heavy metal.",
    keywords: ["lamb of god", "chris adler", "art cruz", "groove metal", "drummer gear"],
    drummerHistory: [
      { drummer: "chris-adler", period: "1994-2019", notes: "Drummer and co-founder" },
      { drummer: "art-cruz", period: "2019-present", notes: "Former Winds of Plague and Prong drummer" }
    ],
    relatedBands: ["gojira"],
    sameAs: ["https://en.wikipedia.org/wiki/Lamb_of_God_(band)"],
  },
  opeth: {
    slug: "opeth",
    name: "Opeth",
    formed: 1990,
    origin: "Stockholm, Sweden",
    genres: ["progressive-metal", "death-metal"],
    status: "active",
    metaTitle: "Opeth - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Opeth's drumming legacy with Martin Lopez and Martin Axenrot.",
    summary: "Opeth, formed in 1990 in Stockholm, Sweden, blends death metal roots with progressive, folk, and jazz influences.",
    keywords: ["opeth", "martin lopez", "martin axenrot", "progressive metal", "drummer gear"],
    drummerHistory: [
      { drummer: "martin-lopez", period: "1997-2006", notes: "Also founding member of Soen" },
      { drummer: "martin-axenrot", period: "2006-present", notes: "Also plays in Bloodbath" }
    ],
    relatedBands: ["gojira"],
    sameAs: ["https://en.wikipedia.org/wiki/Opeth"],
  },
  periphery: {
    slug: "periphery",
    name: "Periphery",
    formed: 2005,
    origin: "Bethesda, Maryland, USA",
    genres: ["djent", "progressive-metal"],
    status: "active",
    metaTitle: "Periphery - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Periphery's drumming legacy with Travis Orbin and Matt Halpern.",
    summary: "Periphery, formed in 2005 by guitarist Misha Mansoor near Washington, D.C., became one of the architects of the djent movement.",
    keywords: ["periphery", "travis orbin", "matt halpern", "djent", "drummer gear"],
    drummerHistory: [
      { drummer: "travis-orbin", period: "2009-2012", notes: "Early drummer before Halpern" },
      { drummer: "matt-halpern", period: "2009-present", notes: "One of the architects of the djent movement" }
    ],
    relatedBands: ["meshuggah", "gojira", "animals-as-leaders"],
    sameAs: ["https://en.wikipedia.org/wiki/Periphery_(band)"],
  },
  "morbid-angel": {
    slug: "morbid-angel",
    name: "Morbid Angel",
    formed: 1983,
    origin: "Tampa, Florida, USA",
    genres: ["death-metal"],
    status: "active",
    metaTitle: "Morbid Angel - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Morbid Angel's drumming legacy with Pete Sandoval and Tim Yeung.",
    summary: "Morbid Angel, formed in 1983 in Tampa, Florida, is a pioneering and highly influential death metal band.",
    keywords: ["morbid angel", "pete sandoval", "tim yeung", "death metal", "drummer gear"],
    drummerHistory: [
      { drummer: "pete-sandoval", period: "1988-2013", notes: "Also co-founder of Terrorizer" },
      { drummer: "tim-yeung", period: "2004-2015", notes: "Also played in Vital Remains and Hate Eternal" }
    ],
    relatedBands: ["nile", "cannibal-corpse", "behemoth", "vader"],
    sameAs: ["https://en.wikipedia.org/wiki/Morbid_Angel"],
  },
  "animals-as-leaders": {
    slug: "animals-as-leaders",
    name: "Animals as Leaders",
    formed: 2007,
    origin: "Washington, D.C., USA",
    genres: ["progressive-metal", "djent"],
    status: "active",
    metaTitle: "Animals as Leaders - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Animals as Leaders' drumming legacy with Navene Koperweis and Matt Garstka.",
    summary: "Animals as Leaders, formed in 2007 in Washington, D.C. as a solo project by guitarist Tosin Abasi, is an instrumental progressive metal band.",
    keywords: ["animals as leaders", "matt garstka", "navene koperweis", "djent", "drummer gear"],
    drummerHistory: [
      { drummer: "navene-koperweis", period: "2010-2012", notes: "Also drummer in Entheos" },
      { drummer: "matt-garstka", period: "2012-present", notes: "Known for jazz-fusion approach and polyrhythmic mastery" }
    ],
    relatedBands: ["meshuggah", "periphery"],
    sameAs: ["https://en.wikipedia.org/wiki/Animals_as_Leaders"],
  },
  mastodon: {
    slug: "mastodon",
    name: "Mastodon",
    formed: 2000,
    origin: "Atlanta, Georgia, USA",
    genres: ["progressive-metal", "sludge-metal", "heavy-metal"],
    status: "active",
    metaTitle: "Mastodon - Brann Dailor Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Brann Dailor's dynamic drumming and vocals with Mastodon.",
    summary: "Mastodon, formed in 2000 in Atlanta, Georgia, fuses progressive metal with sludge and southern rock influences across acclaimed concept albums.",
    keywords: ["mastodon", "brann dailor", "progressive metal", "sludge metal", "drummer gear"],
    drummerHistory: [
      { drummer: "brann-dailor", period: "2000-present", notes: "Founding member, also handles vocals" }
    ],
    relatedBands: ["gojira"],
    sameAs: ["https://en.wikipedia.org/wiki/Mastodon_(band)"],
  },
  "cavalera-conspiracy": {
    slug: "cavalera-conspiracy",
    name: "Cavalera Conspiracy",
    formed: 2006,
    origin: "Phoenix, Arizona, USA",
    genres: ["thrash-metal", "groove-metal"],
    status: "active",
    metaTitle: "Cavalera Conspiracy - Igor Cavalera Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Igor Cavalera's powerful drumming with the Cavalera brothers' reunion band.",
    summary: "Cavalera Conspiracy formed in 2006 when brothers Max and Igor Cavalera reunited a decade after Igor's departure from Sepultura.",
    keywords: ["cavalera conspiracy", "igor cavalera", "max cavalera", "thrash metal", "drummer gear"],
    drummerHistory: [
      { drummer: "igor-cavalera", period: "2007-present", notes: "Co-founder, former Sepultura drummer" }
    ],
    relatedBands: ["sepultura"],
    sameAs: ["https://en.wikipedia.org/wiki/Cavalera_Conspiracy"],
  },
  cynic: {
    slug: "cynic",
    name: "Cynic",
    formed: 1987,
    origin: "Miami, Florida, USA",
    genres: ["progressive-metal", "death-metal"],
    status: "active",
    metaTitle: "Cynic - Sean Reinert Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Sean Reinert's technical, jazz-influenced drumming with Cynic.",
    summary: "Cynic, formed in 1987 in Miami, Florida, pioneered a technical, jazz-fusion-infused strand of progressive death metal.",
    keywords: ["cynic", "sean reinert", "progressive metal", "death metal", "drummer gear"],
    drummerHistory: [
      { drummer: "sean-reinert", period: "1987-1994, 2006-2017", notes: "Drummer and co-founder" }
    ],
    relatedBands: ["death"],
    sameAs: ["https://en.wikipedia.org/wiki/Cynic_(band)"],
  },
  damageplan: {
    slug: "damageplan",
    name: "Damageplan",
    formed: 2003,
    origin: "Dallas, Texas, USA",
    genres: ["groove-metal", "heavy-metal"],
    status: "disbanded",
    metaTitle: "Damageplan - Vinnie Paul Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Vinnie Paul's drumming with Damageplan, the band he formed with brother Dimebag Darrell after Pantera.",
    summary: "Damageplan, formed in 2003 in Dallas, Texas, by brothers Vinnie Paul and Dimebag Darrell Abbott after Pantera's breakup, disbanded following Dimebag's murder onstage in 2004.",
    keywords: ["damageplan", "vinnie paul", "dimebag darrell", "groove metal", "drummer gear"],
    drummerHistory: [
      { drummer: "vinnie-paul", period: "2003-2004", notes: "Co-founder with brother Dimebag Darrell" }
    ],
    relatedBands: ["pantera", "hellyeah"],
    sameAs: ["https://en.wikipedia.org/wiki/Damageplan"],
  },
  hellyeah: {
    slug: "hellyeah",
    name: "Hellyeah",
    formed: 2006,
    origin: "Dallas, Texas, USA",
    genres: ["groove-metal", "alternative-metal"],
    status: "active",
    metaTitle: "Hellyeah - Vinnie Paul Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Vinnie Paul's drumming with the groove metal supergroup Hellyeah.",
    summary: "Hellyeah, formed in 2006 in Dallas, Texas, is a heavy metal supergroup that gave former Pantera drummer Vinnie Paul his final full-time band.",
    keywords: ["hellyeah", "vinnie paul", "groove metal", "supergroup", "drummer gear"],
    drummerHistory: [
      { drummer: "vinnie-paul", period: "2006-2018", notes: "Founding drummer, recorded until his death in 2018" }
    ],
    relatedBands: ["pantera", "damageplan"],
    sameAs: ["https://en.wikipedia.org/wiki/Hellyeah"],
  },
  murderdolls: {
    slug: "murderdolls",
    name: "Murderdolls",
    formed: 2002,
    origin: "Hollywood, California, USA",
    genres: ["horror-punk", "heavy-metal"],
    status: "active",
    metaTitle: "Murderdolls - Drummer History & Gear | MetalForge",
    metaDescription: "Explore the Murderdolls, the horror punk project co-founded by Slipknot's Joey Jordison.",
    summary: "Murderdolls, formed in 2002 in Hollywood, California, is a horror punk project co-founded by Wednesday 13 and Slipknot's Joey Jordison.",
    keywords: ["murderdolls", "joey jordison", "wednesday 13", "horror punk", "drummer gear"],
    drummerHistory: [
      { drummer: "joey-jordison", period: "2002-2011", notes: "Co-founder; played guitar in Murderdolls rather than drums" }
    ],
    relatedBands: ["slipknot"],
    sameAs: ["https://en.wikipedia.org/wiki/Murderdolls"],
  },
  "sons-of-apollo": {
    slug: "sons-of-apollo",
    name: "Sons of Apollo",
    formed: 2017,
    origin: "Los Angeles, California, USA",
    genres: ["progressive-metal"],
    status: "active",
    metaTitle: "Sons of Apollo - Mike Portnoy Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Mike Portnoy's drumming with the progressive metal supergroup Sons of Apollo.",
    summary: "Sons of Apollo, formed in 2017, is a progressive metal supergroup built around former Dream Theater bandmates Mike Portnoy and Derek Sherinian.",
    keywords: ["sons of apollo", "mike portnoy", "progressive metal", "supergroup", "drummer gear"],
    drummerHistory: [
      { drummer: "mike-portnoy", period: "2017-present", notes: "Also Dream Theater co-founder" }
    ],
    relatedBands: ["dream-theater"],
    sameAs: ["https://en.wikipedia.org/wiki/Sons_of_Apollo"],
  },
  vader: {
    slug: "vader",
    name: "Vader",
    formed: 1983,
    origin: "Olsztyn, Poland",
    genres: ["death-metal"],
    status: "active",
    metaTitle: "Vader - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Vader's drumming legacy including Daray's decade-long tenure.",
    summary: "Vader, formed in 1983 in Olsztyn, Poland, is one of the longest-running and most influential death metal bands in Europe.",
    keywords: ["vader", "daray", "death metal", "polish metal", "drummer gear"],
    drummerHistory: [
      { drummer: "daray", period: "2006-2016", notes: "Also drummer for Dimmu Borgir" }
    ],
    relatedBands: ["behemoth", "morbid-angel"],
    sameAs: ["https://en.wikipedia.org/wiki/Vader_(band)"],
  },
  volto: {
    slug: "volto",
    name: "Volto!",
    formed: 2003,
    origin: "Los Angeles, California, USA",
    genres: ["progressive-rock", "jazz-fusion"],
    status: "active",
    metaTitle: "Volto! - Danny Carey Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Danny Carey's instrumental jazz-fusion drumming with Volto!.",
    summary: "Volto!, formed around 2003 in Los Angeles, is an instrumental jam band rooted in fusion and rock improvisation, featuring Tool's Danny Carey on drums.",
    keywords: ["volto", "danny carey", "jazz fusion", "instrumental rock", "drummer gear"],
    drummerHistory: [
      { drummer: "danny-carey", period: "2000-present", notes: "Also Tool's drummer since 1990" }
    ],
    relatedBands: ["tool"],
    sameAs: ["https://en.wikipedia.org/wiki/Volto!"],
  },
  behemoth: {
    slug: "behemoth",
    name: "Behemoth",
    formed: 1991,
    origin: "Gdańsk, Poland",
    genres: ["blackened-death-metal", "death-metal"],
    status: "active",
    metaTitle: "Behemoth - Inferno Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Inferno's extreme drumming with Polish blackened death metal band Behemoth.",
    summary: "Behemoth, formed in 1991, evolved from black metal to become a leading blackened death metal band.",
    keywords: ["behemoth", "inferno", "nergal", "blackened death metal", "polish metal", "drummer gear"],
    drummerHistory: [
      { drummer: "inferno", period: "1997-present", notes: "Real name: Zbigniew Promiński" }
    ],
    relatedBands: ["nile", "morbid-angel", "vader"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Behemoth_(band)",
      "https://www.discogs.com/artist/278269-Behemoth-3",
      "https://musicbrainz.org/artist/bdc6da18-a0d4-4f3a-ae33-05dc5af2dec2",
      "https://www.wikidata.org/wiki/Q213498"
    ],
  },
};

export function getBand(slug) { return bands[slug] || null; }
export function getAllBandSlugs() { return Object.keys(bands); }
export function getAllBands() { return Object.values(bands); }
export function hasBand(slug) { return slug in bands; }
export function hasFaq(slug) { const band = bands[slug]; return band && Array.isArray(band.faq) && band.faq.length > 0; }
export function getBandFaq(slug) { const band = bands[slug]; return band?.faq || null; }

/**
 * Get bands for a drummer based on their slug
 * @param {string} drummerSlug - The drummer's slug (e.g., "lars-ulrich")
 * @returns {Array} Array of band data objects
 */
export function getBandsForDrummer(drummerSlug) {
  return Object.values(bands).filter(band => 
    band.drummerHistory?.some(h => h.drummer === drummerSlug)
  );
}

/**
 * Generate MusicGroup JSON-LD schema for a band
 * Issue #429: Added for enhanced SEO entity recognition
 * @param {Object} band - Band data object
 * @returns {Object} MusicGroup schema object
 */
export function generateMusicGroupSchema(band) {
  if (!band) return null;
  
  const schema = {
    "@type": "MusicGroup",
    "@id": `https://metalforge.io/bands/${band.slug}#band`,
    "name": band.name,
    "url": `https://metalforge.io/bands/${band.slug}`,
  };
  
  // Add founding date if available
  if (band.formed) {
    schema.foundingDate = String(band.formed);
  }
  
  // Add origin location
  if (band.origin) {
    schema.foundingLocation = {
      "@type": "Place",
      "name": band.origin
    };
  }
  
  // Add genres (convert slug format to readable)
  if (band.genres && band.genres.length > 0) {
    schema.genre = band.genres.map(g => 
      g.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    );
  }
  
  // Add sameAs links for entity disambiguation
  if (band.sameAs && band.sameAs.length > 0) {
    schema.sameAs = band.sameAs;
  }
  
  // Add description
  if (band.summary) {
    schema.description = band.summary;
  }
  
  return schema;
}

/**
 * Generate MusicGroup schema from drummer data (fallback when band data not available)
 * Issue #429: Enhanced schema generation for drummers without full band data
 * @param {Object} drummer - Drummer data object with band and genre fields
 * @returns {Object} MusicGroup schema object (for primary band only)
 */
export function generateMusicGroupSchemaFromDrummer(drummer) {
  if (!drummer || !drummer.band) return null;
  
  // Generate slug from band name
  const bandSlug = drummer.band.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  
  // Check if we have full band data
  const bandData = getBand(bandSlug);
  if (bandData) {
    return generateMusicGroupSchema(bandData);
  }
  
  // Fallback: generate basic schema from drummer data
  const schema = {
    "@type": "MusicGroup",
    "@id": `https://metalforge.io/bands/${bandSlug}#band`,
    "name": drummer.band,
  };
  
  // Add genre from drummer data
  if (drummer.genre) {
    // Handle multiple genres separated by slashes
    const genres = drummer.genre.split(/\s*[\/,]\s*/).map(g => g.trim());
    schema.genre = genres;
  }
  
  // Generate basic sameAs links (Wikipedia-based fallback)
  const wikiSlug = drummer.band.replace(/\s+/g, '_');
  schema.sameAs = [
    `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiSlug)}`
  ];
  
  return schema;
}

/**
 * Helper to generate URL slug from a name
 * @param {string} name - Name to convert to slug
 * @returns {string} URL-safe slug
 */
function toSlug(name) {
  return name.toLowerCase()
    .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u')
    .replace(/é|è|ê|ë/g, 'e').replace(/í|ì|î|ï/g, 'i').replace(/ó|ò|ô/g, 'o')
    .replace(/ú|ù|û/g, 'u').replace(/ñ/g, 'n').replace(/ß/g, 'ss')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

/**
 * Generate multiple MusicGroup schemas from drummer's bands array
 * Issue #444: Added for drummer-band relationships with multiple bands
 * Issue #516: Fixed @id references to use slug-based URLs
 * @param {Object} drummer - Drummer data object with bands array
 * @returns {Array} Array of MusicGroup schema objects
 */
export function generateAllMusicGroupSchemasFromDrummer(drummer) {
  if (!drummer) return [];
  
  // Generate drummer slug for @id references (Issue #516)
  const drummerSlug = toSlug(drummer.name);
  
  // Use the bands array if available, otherwise fallback to single band
  const bandsArray = drummer.bands || (drummer.band ? [{ name: drummer.band }] : []);
  
  return bandsArray.map((bandEntry, index) => {
    const bandName = bandEntry.name || bandEntry;
    const bandSlug = toSlug(bandName);
    
    // Check if we have full band data
    const bandData = getBand(bandSlug);
    if (bandData) {
      const schema = generateMusicGroupSchema(bandData);
      // Add member reference to the drummer (Issue #516: use slug-based @id)
      schema.member = {
        "@type": "Person",
        "@id": `https://metalforge.io/drummer/${drummerSlug}#person`,
        "name": drummer.name
      };
      return schema;
    }
    
    // Fallback: generate basic schema from band entry
    const schema = {
      "@type": "MusicGroup",
      "@id": `https://metalforge.io/bands/${bandSlug}#band`,
      "name": bandName,
      "url": `https://metalforge.io/bands/${bandSlug}`,
    };
    
    // Add period if available
    if (bandEntry.period) {
      schema.description = `${drummer.name} was a member ${bandEntry.period}`;
    }
    
    // Add genre from drummer data (for first/primary band only)
    if (index === 0 && drummer.genre) {
      const genres = drummer.genre.split(/\s*[\/,]\s*/).map(g => g.trim());
      schema.genre = genres;
    }
    
    // Generate basic sameAs links (Wikipedia-based fallback)
    const wikiSlug = bandName.replace(/\s+/g, '_');
    schema.sameAs = [
      `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiSlug)}`
    ];
    
    // Add member reference (Issue #516: use slug-based @id)
    schema.member = {
      "@type": "Person",
      "@id": `https://metalforge.io/drummer/${drummerSlug}#person`,
      "name": drummer.name
    };
    
    return schema;
  });
}

/**
 * Generate memberOf array for Person schema from drummer's bands
 * Issue #444: Create memberOf references for all bands
 * @param {Object} drummer - Drummer data object with bands array
 * @returns {Array} Array of memberOf references
 */
export function generateMemberOfFromDrummer(drummer) {
  if (!drummer) return [];
  
  const bandsArray = drummer.bands || (drummer.band ? [{ name: drummer.band }] : []);
  
  return bandsArray.map(bandEntry => {
    const bandName = bandEntry.name || bandEntry;
    const bandSlug = bandName.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    
    return {
      "@type": "MusicGroup",
      "@id": `https://metalforge.io/bands/${bandSlug}#band`,
      "name": bandName
    };
  });
}

export default bands;
