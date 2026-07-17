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
    members: [
      { name: "James Hetfield", role: "vocals, rhythm guitar", period: "1981-present", notes: "Co-founder" },
      { name: "Lars Ulrich", role: "drums", period: "1981-present", notes: "Co-founder; placed the recruitment ad in The Recycler that led to the band's formation" },
      { name: "Kirk Hammett", role: "lead guitar", period: "1983-present", notes: "Replaced Dave Mustaine" },
      { name: "Robert Trujillo", role: "bass", period: "2003-present", notes: "Replaced Jason Newsted; first album St. Anger (2003)" }
    ],
    formerMembers: [
      { name: "Ron McGovney", role: "bass", period: "1981-1982", notes: "Founding bassist" },
      { name: "Dave Mustaine", role: "lead guitar", period: "1981-1983", notes: "Founding guitarist; departed and formed Megadeth" },
      { name: "Cliff Burton", role: "bass", period: "1982-1986", notes: "Replaced McGovney; died September 27, 1986 in a tour bus accident near Dorarp, Sweden" },
      { name: "Jason Newsted", role: "bass", period: "1986-2001", notes: "Replaced Burton; departed citing personal reasons" }
    ],
    drummerHistory: [
      { drummer: "lars-ulrich", period: "1981-present", notes: "Co-founder; only drummer to ever record on a Metallica studio album. A one-off live exception occurred at the June 2004 Download Festival, where Ulrich was hospitalized and Dave Lombardo and Joey Jordison filled in for a single show." }
    ],
    discography: [
      { title: "Kill 'Em All", year: 1983, drummer: "lars-ulrich", notes: "Debut album" },
      { title: "Ride the Lightning", year: 1984, drummer: "lars-ulrich" },
      { title: "Master of Puppets", year: 1986, drummer: "lars-ulrich", notes: "Last album with Cliff Burton" },
      { title: "...And Justice for All", year: 1988, drummer: "lars-ulrich", notes: "First album with Jason Newsted" },
      { title: "Metallica", year: 1991, drummer: "lars-ulrich", notes: "The \"Black Album\"" },
      { title: "Load", year: 1996, drummer: "lars-ulrich" },
      { title: "Reload", year: 1997, drummer: "lars-ulrich" },
      { title: "St. Anger", year: 2003, drummer: "lars-ulrich", notes: "First album with Robert Trujillo" },
      { title: "Death Magnetic", year: 2008, drummer: "lars-ulrich" },
      { title: "Hardwired... to Self-Destruct", year: 2016, drummer: "lars-ulrich" },
      { title: "72 Seasons", year: 2023, drummer: "lars-ulrich" }
    ],
    relatedBands: ["slayer", "megadeth", "anthrax"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Metallica",
      "https://www.discogs.com/artist/18839-Metallica",
      "https://musicbrainz.org/artist/65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab",
      "https://www.wikidata.org/wiki/Q15920"
    ],
    faq: [
      { q: "Who is the drummer for Metallica?", a: "Lars Ulrich has been Metallica's drummer since the band's founding in 1981. He is a co-founder who placed the original newspaper ad that led to the band's formation." },
      { q: "Has Metallica ever used a different drummer on a studio album?", a: "No. Lars Ulrich has drummed on every Metallica studio album, from Kill 'Em All (1983) through 72 Seasons (2023), including St. Anger (2003)." },
      { q: "Did anyone ever fill in for Lars Ulrich?", a: "Yes, but only once and only for a single live show: at the Download Festival in June 2004, Ulrich was hospitalized and Dave Lombardo (Slayer) and Joey Jordison (Slipknot) filled in on drums, with drum tech Flemming Larsen covering one song. No studio recordings were affected." },
      { q: "Who are Metallica's founding members?", a: "James Hetfield and Lars Ulrich founded Metallica in Los Angeles in 1981; the original lineup also included Dave Mustaine (guitar) and Ron McGovney (bass), both of whom later departed." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Metallica",
      "https://en.wikipedia.org/wiki/Lars_Ulrich",
      "https://www.loudersound.com/features/what-happened-the-night-metallica-lars-ulrich-disappeared",
      "https://en.wikipedia.org/wiki/Download_Festival"
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
    members: [
      { name: "Paulo Jr.", role: "bass", period: "1984-2024", notes: "Founding member (Paulo Xisto Pinto Jr.)" },
      { name: "Andreas Kisser", role: "guitar", period: "1987-2024", notes: "Joined after Jairo Guedz's departure" },
      { name: "Derrick Green", role: "vocals", period: "1997-2024", notes: "Replaced Max Cavalera" },
      { name: "Greyson Nekrutman", role: "drums", period: "2024-2024", notes: "Ex-Suicidal Tendencies; joined on short notice after Eloy Casagrande's departure; drummed the band's farewell-era release" }
    ],
    formerMembers: [
      { name: "Max Cavalera", role: "vocals, guitar", period: "1984-1997", notes: "Co-founder; left acrimoniously; later formed Soulfly and Cavalera Conspiracy" },
      { name: "Igor Cavalera", role: "drums", period: "1984-2006", notes: "Co-founder with brother Max" },
      { name: "Jean Dolabella", role: "drums", period: "2006-2011", notes: "Replaced Igor Cavalera; drummed on A-Lex (2009) and Kairos (2011); departed around November 2011" },
      { name: "Eloy Casagrande", role: "drums", period: "2011-2024", notes: "Joined November 2011; departed abruptly in February 2024 to join Slipknot" }
    ],
    drummerHistory: [
      { drummer: "igor-cavalera", period: "1984-2006", notes: "Co-founder with brother Max" },
      { drummer: "jean-dolabella", period: "2006-2011", notes: "Drummed A-Lex (2009) and Kairos (2011)" },
      { drummer: "eloy-casagrande", period: "2011-2024", notes: "Joined November 2011, departed February 2024 to join Slipknot; drummed Mediator (2013), Machine Messiah (2017), Quadra (2020)" },
      { drummer: "greyson-nekrutman", period: "2024", notes: "Joined on short notice after Casagrande's departure for the band's farewell-tour era" }
    ],
    discography: [
      { title: "Morbid Visions", year: 1986, drummer: "igor-cavalera", notes: "Debut full-length" },
      { title: "Schizophrenia", year: 1987, drummer: "igor-cavalera" },
      { title: "Beneath the Remains", year: 1989, drummer: "igor-cavalera" },
      { title: "Arise", year: 1991, drummer: "igor-cavalera" },
      { title: "Chaos A.D.", year: 1993, drummer: "igor-cavalera" },
      { title: "Roots", year: 1996, drummer: "igor-cavalera", notes: "Last album with Max Cavalera" },
      { title: "Against", year: 1998, drummer: "igor-cavalera", notes: "First album with Derrick Green" },
      { title: "Nation", year: 2001, drummer: "igor-cavalera" },
      { title: "Roorback", year: 2003, drummer: "igor-cavalera" },
      { title: "Dante XXI", year: 2006, drummer: "igor-cavalera", notes: "Igor Cavalera's last album; he left later in 2006" },
      { title: "A-Lex", year: 2009, drummer: "jean-dolabella", notes: "Dolabella's first album; concept album based on A Clockwork Orange" },
      { title: "Kairos", year: 2011, drummer: "jean-dolabella", notes: "Verified NOT Eloy Casagrande, despite the timeline overlap. Recorded Dec 2010-Mar 2011, released June 24, 2011, with Dolabella credited on drums/percussion. Dolabella left roughly five months after release; Casagrande joined afterward." },
      { title: "The Mediator Between Head and Hands Must Be the Heart", year: 2013, drummer: "eloy-casagrande", notes: "Casagrande's first studio album, joined Nov 2011" },
      { title: "Machine Messiah", year: 2017, drummer: "eloy-casagrande" },
      { title: "Quadra", year: 2020, drummer: "eloy-casagrande" }
    ],
    relatedBands: ["cavalera-conspiracy", "slipknot"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Sepultura",
      "https://www.discogs.com/artist/18291-Sepultura",
      "https://musicbrainz.org/artist/c44e9c22-ef82-4a77-9bcd-af6c958446d6",
      "https://www.wikidata.org/wiki/Q207036"
    ],
    faq: [
      { q: "Who is the drummer for Sepultura?", a: "Sepultura's final drummer was Greyson Nekrutman, who joined in February 2024 after Eloy Casagrande's abrupt departure to join Slipknot. Nekrutman drummed the band's farewell-era output before Sepultura's retirement from touring." },
      { q: "Is Sepultura still active?", a: "No, they completed a farewell tour in 2024." },
      { q: "Why did Igor Cavalera leave?", a: "He left in 2006 due to conflicts with management." },
      { q: "Did Eloy Casagrande drum on Kairos?", a: "No, this is a common point of confusion. Kairos (2011) was recorded and released while Jean Dolabella was still Sepultura's drummer; Dolabella is credited with drums and percussion on the album, released June 24, 2011. Eloy Casagrande did not join Sepultura until November 2011, after Kairos was already out. Casagrande's first studio album with the band was The Mediator Between Head and Hands Must Be the Heart (2013)." },
      { q: "Has Sepultura broken up?", a: "Not through a formal legal dissolution. The band announced a farewell tour, \"Celebrating Life Through Death,\" in December 2023, framing it as the end of touring rather than an outright breakup." },
      { q: "Who replaced Igor Cavalera as Sepultura's drummer?", a: "Jean Dolabella replaced founding drummer Igor Cavalera in 2006. Dolabella recorded two studio albums (A-Lex, 2009, and Kairos, 2011) before departing in late 2011, when Eloy Casagrande took over." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Sepultura",
      "https://en.wikipedia.org/wiki/Sepultura_discography",
      "https://en.wikipedia.org/wiki/Kairos_(album)",
      "https://en.wikipedia.org/wiki/Jean_Dolabella"
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
      { name: "Maynard James Keenan", role: "vocals", period: "1990-present", notes: "Founding member" },
      { name: "Adam Jones", role: "guitars", period: "1990-present", notes: "Founding member" },
      { name: "Danny Carey", role: "drums, percussion", period: "1990-present", notes: "Founding member; only drummer in band history" },
      { name: "Justin Chancellor", role: "bass", period: "1995-present", notes: "Replaced Paul D'Amour" }
    ],
    formerMembers: [
      { name: "Paul D'Amour", role: "bass", period: "1990-1995", notes: "Founding bassist; left amicably to pursue other projects" }
    ],
    drummerHistory: [
      { drummer: "danny-carey", period: "1990-present", notes: "Founding member, only drummer in band history" }
    ],
    discography: [
      { title: "Opiate", year: 1992, type: "EP" },
      { title: "Undertow", year: 1993, drummer: "danny-carey", type: "Album" },
      { title: "Ænima", year: 1996, drummer: "danny-carey", type: "Album", notes: "Grammy: Best Metal Performance" },
      { title: "Lateralus", year: 2001, drummer: "danny-carey", type: "Album", notes: "Grammy: Best Metal Performance (Schism)" },
      { title: "10,000 Days", year: 2006, drummer: "danny-carey", type: "Album", notes: "Grammy: Best Recording Package" },
      { title: "Fear Inoculum", year: 2019, drummer: "danny-carey", type: "Album", notes: "Grammy: Best Metal Performance" }
    ],
    relatedBands: ["volto"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Tool_(band)",
      "https://www.discogs.com/artist/24069-Tool",
      "https://musicbrainz.org/artist/66fc5bf8-daa4-4241-b378-9bc9077571d6",
      "https://www.wikidata.org/wiki/Q184188",
      "https://www.allmusic.com/artist/tool-mn0000036614"
    ],
    faq: [
      { q: "Who is the drummer for Tool?", a: "Danny Carey has been Tool's drummer since the band's founding in 1990 and is the only drummer in the band's history, having recorded all five studio albums." },
      { q: "Why did Tool take 13 years between albums?", a: "Tool's gap between 10,000 Days (2006) and Fear Inoculum (2019) was due to legal battles with their record label and the band's meticulous creative process." },
      { q: "How many Grammys has Tool won?", a: "Tool has won four Grammy Awards for Best Metal Performance: Ænima (1998), Schism (2002), 10,000 Days (2006 - packaging), and Fear Inoculum (2020)." },
      { q: "What drums does Danny Carey play?", a: "Danny Carey plays Sonor SQ2 Heavy Beech drums with Paiste cymbals, Mandala electronic pads, and his signature bronze snare drum." },
      { q: "What time signature does Tool use?", a: "Tool frequently uses complex and unusual time signatures like 7/8, 5/4, 11/8, and polyrhythms. Songs like 'Schism' famously shift between multiple time signatures." },
      { q: "Is Danny Carey in the Modern Drummer Hall of Fame?", a: "Yes, Danny Carey was inducted into the Modern Drummer Hall of Fame in 2016." },
      { q: "Did Tool's lineup ever change?", a: "Yes, on bass: founding bassist Paul D'Amour left in 1995 and was replaced by Justin Chancellor, who has held the position ever since. The other three members (Maynard James Keenan, Adam Jones, Danny Carey) have been in the band since 1990." },
      { q: "How many studio albums has Tool released?", a: "Five: Undertow (1993), AEnima (1996), Lateralus (2001), 10,000 Days (2006), and Fear Inoculum (2019), all recorded with Danny Carey on drums." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Tool_(band)"
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
      { name: "Joe Duplantier", role: "vocals, guitar", period: "1996-present", notes: "Co-founder" },
      { name: "Mario Duplantier", role: "drums", period: "1996-present", notes: "Co-founder with brother Joe" },
      { name: "Christian Andreu", role: "guitar", period: "1996-present", notes: "Founding member" },
      { name: "Jean-Michel Labadie", role: "bass", period: "1998-present", notes: "Replaced Alexandre Cornillon" }
    ],
    formerMembers: [
      { name: "Alexandre Cornillon", role: "bass", period: "1996-1998", notes: "Original bassist, replaced by Jean-Michel Labadie" }
    ],
    drummerHistory: [
      { drummer: "mario-duplantier", period: "1996-present", notes: "Co-founder with brother Joe, has been the only drummer in band history" }
    ],
    discography: [
      { title: "Terra Incognita", year: 2001, drummer: "mario-duplantier" },
      { title: "The Link", year: 2003, drummer: "mario-duplantier" },
      { title: "From Mars to Sirius", year: 2005, drummer: "mario-duplantier" },
      { title: "The Way of All Flesh", year: 2008, drummer: "mario-duplantier" },
      { title: "L'Enfant Sauvage", year: 2012, drummer: "mario-duplantier" },
      { title: "Magma", year: 2016, drummer: "mario-duplantier" },
      { title: "Fortitude", year: 2021, drummer: "mario-duplantier" }
    ],
    relatedBands: ["mastodon", "opeth", "meshuggah", "lamb-of-god", "periphery"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Gojira_(band)",
      "https://www.discogs.com/artist/283955-Gojira",
      "https://musicbrainz.org/artist/1c5e1c3b-3f69-4bfe-9143-4e60c6ed8bf5",
      "https://www.wikidata.org/wiki/Q645883"
    ],
    faq: [
      { q: "Who is the drummer for Gojira?", a: "Mario Duplantier has been Gojira's drummer since the band's founding in 1996, making him the only drummer in the band's history." },
      { q: "Why is Gojira called Gojira?", a: "The band was originally named Godzilla but changed to Gojira (the Japanese name for Godzilla) in 2001 to avoid trademark issues." },
      { q: "Are Joe and Mario Duplantier brothers?", a: "Yes, Joe (vocals/guitar) and Mario (drums) Duplantier are brothers who co-founded the band in 1996." },
      { q: "What is Gojira's most famous song?", a: "'Flying Whales' from the 2005 album 'From Mars to Sirius' is widely considered their signature song and a modern metal classic." },
      { q: "Has Gojira won a Grammy?", a: "While they haven't won, Gojira has received multiple Grammy nominations including Best Metal Performance for 'Silvera' (2017) and 'Amazonia' (2022)." },
      { q: "Where is Gojira from?", a: "Gojira is from Bayonne, a city in the Basque region of southwestern France near the Spanish border." },
      { q: "Was Gojira always called Gojira?", a: "No. The band formed in 1996 under the name Godzilla and released two demos under that name before changing it to Gojira in 2001 due to a trademark dispute with Toho, the studio behind the Godzilla films." },
      { q: "Has Gojira's lineup always been the same?", a: "The current four-piece lineup (Joe Duplantier, Mario Duplantier, Christian Andreu, Jean-Michel Labadie) has been stable since 1998, when bassist Jean-Michel Labadie replaced original bassist Alexandre Cornillon." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Gojira_(band)",
      "https://en.wikipedia.org/wiki/Mario_Duplantier"
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
    members: [
      { name: "Shawn \"Clown\" Crahan", role: "percussion, vocals", period: "1995-present", notes: "Founding member; only original member remaining" },
      { name: "Mick Thomson", role: "guitar", period: "1996-present", notes: "" },
      { name: "Corey Taylor", role: "lead vocals", period: "1997-present", notes: "" },
      { name: "Sid Wilson", role: "turntables, samples, keyboards", period: "1998-present", notes: "" },
      { name: "Jim Root", role: "guitar", period: "1999-present", notes: "" },
      { name: "Alessandro Venturella", role: "bass, keyboards", period: "2014-present", notes: "Joined as touring replacement for Donnie Steele during .5: The Gray Chapter sessions; became full member" },
      { name: "Michael \"Tortilla Man\" Pfaff", role: "percussion, keyboards, backing vocals", period: "2019-present", notes: "Replaced Chris Fehn as touring member in 2019; became official member during The End, So Far recording sessions (2021-2022)" },
      { name: "Eloy Casagrande", role: "drums", period: "2024-present", notes: "Former Sepultura drummer; officially confirmed May 1, 2024; first live appearance April 25, 2024. Has not yet recorded on a released Slipknot studio album." }
    ],
    formerMembers: [
      { name: "Joey Jordison", role: "drums", period: "1995-2013", notes: "Founding member; dismissed December 12, 2013; later revealed to have been diagnosed with acute transverse myelitis; died July 26, 2021 at age 46" },
      { name: "Paul Gray", role: "bass, backing vocals", period: "1995-2010", notes: "Founding member; died May 24, 2010; cause of death confirmed as accidental overdose of morphine and fentanyl" },
      { name: "Chris Fehn", role: "percussion, backing vocals", period: "1998-2019", notes: "Filed a lawsuit alleging withheld payments in March 2019; dismissed from the band March 18, 2019" },
      { name: "Craig Jones", role: "samples, keyboards, media", period: "1996-2023", notes: "Departed after 27 years; announced June 7, 2023" },
      { name: "Jay Weinberg", role: "drums", period: "2014-2023", notes: "Son of Max Weinberg (E Street Band); recruited after Jordison's dismissal, first recorded on .5: The Gray Chapter (2014); band announced parting ways November 5, 2023, calling it a \"creative decision\"" },
      { name: "Donnie Steele", role: "bass", period: "2011-2014", notes: "Temporary touring replacement for the late Paul Gray; left during .5: The Gray Chapter sessions, replaced by Alessandro Venturella" },
      { name: "Josh Brainard", role: "guitar", period: "1995-1998", notes: "Left during recording of the band's 1999 debut album" }
    ],
    drummerHistory: [
      { drummer: "joey-jordison", period: "1995-2013", notes: "Founding member, iconic masked drummer; dismissed December 12, 2013" },
      { drummer: "jay-weinberg", period: "2014-2023", notes: "Son of Max Weinberg; joined 2014, parted ways with band November 5, 2023" },
      { drummer: "eloy-casagrande", period: "2024-present", notes: "Former Sepultura drummer; joined 2024, first live show April 25, 2024. No documented interim/stand-in drummer filled the Nov 2023-Apr 2024 gap. Has not yet recorded a Slipknot studio album." }
    ],
    discography: [
      { title: "Slipknot", year: 1999, drummer: "joey-jordison" },
      { title: "Iowa", year: 2001, drummer: "joey-jordison" },
      { title: "Vol. 3: (The Subliminal Verses)", year: 2004, drummer: "joey-jordison" },
      { title: "All Hope Is Gone", year: 2008, drummer: "joey-jordison" },
      { title: ".5: The Gray Chapter", year: 2014, drummer: "jay-weinberg", notes: "Weinberg's first album; Jordison was dismissed in Dec 2013 before recording began and did not contribute; also first album without Paul Gray" },
      { title: "We Are Not Your Kind", year: 2019, drummer: "jay-weinberg" },
      { title: "The End, So Far", year: 2022, drummer: "jay-weinberg", notes: "Weinberg's final studio album with the band before his November 2023 departure. Most recent Slipknot studio album as of this writing; Eloy Casagrande has not yet recorded on a studio album." }
    ],
    relatedBands: ["murderdolls", "sepultura"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Slipknot_(band)",
      "https://www.discogs.com/artist/163683-Slipknot",
      "https://musicbrainz.org/artist/a466c2a2-6517-42fb-a160-1087c3bafd9f",
      "https://www.wikidata.org/wiki/Q188840"
    ],
    faq: [
      { q: "Who is the drummer for Slipknot?", a: "As of 2024, Slipknot's drummer is Eloy Casagrande, the former Sepultura drummer who officially joined the band, first performing live on April 25, 2024. As of this writing he has not yet appeared on a released Slipknot studio album; the band's most recent album, The End, So Far (2022), was recorded by previous drummer Jay Weinberg." },
      { q: "What happened in Slipknot's transition from Joey Jordison to Jay Weinberg?", a: "Founding drummer Joey Jordison was dismissed from Slipknot on December 12, 2013, after 18 years in the band; the band cited \"personal reasons,\" though Jordison said he was fired. It later emerged he had been diagnosed with acute transverse myelitis, a neurological condition affecting his drumming. Jay Weinberg, son of E Street Band drummer Max Weinberg, was brought in and recorded the band's next album, .5: The Gray Chapter (2014), as the new masked drummer." },
      { q: "Why did Jay Weinberg leave Slipknot, and how did Eloy Casagrande replace him?", a: "Slipknot announced on November 5, 2023, that they were parting ways with Jay Weinberg, describing it as a \"creative decision.\" Several months later, former Sepultura drummer Eloy Casagrande, who auditioned in Palm Springs, CA in January 2024, was confirmed as the new drummer, debuting live on April 25, 2024, and officially announced by the band on May 1, 2024." },
      { q: "How did Paul Gray's death affect Slipknot's lineup?", a: "Founding bassist Paul Gray died on May 24, 2010; his cause of death was confirmed as an accidental overdose of morphine and fentanyl. The band's following studio album, .5: The Gray Chapter (2014), is dedicated to his memory and was also the first Slipknot album made without Joey Jordison, who was dismissed in December 2013." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Slipknot_(band)",
      "https://en.wikipedia.org/wiki/List_of_Slipknot_band_members",
      "https://en.wikipedia.org/wiki/.5:_The_Gray_Chapter",
      "https://en.wikipedia.org/wiki/The_End,_So_Far"
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
    formerMembers: [
      { name: "Tom Araya", role: "bass, vocals", period: "1981-2019", notes: "Founding member; band ended touring in 2019, sporadic reunion festival dates from 2024" },
      { name: "Kerry King", role: "guitar", period: "1981-2019", notes: "Founding member" },
      { name: "Jeff Hanneman", role: "guitar", period: "1981-2013", notes: "Founding member; died May 2, 2013" },
      { name: "Gary Holt", role: "guitar", period: "2011, 2013-2019", notes: "Ex-Exodus; filled in for ailing Jeff Hanneman starting 2011, became permanent member in 2013" },
      { name: "Dave Lombardo", role: "drums", period: "1981-1986, 1987-1992, 2001-2013", notes: "Co-founder; three separate stints; fired February 2013 amid a pay/contract dispute" },
      { name: "Paul Bostaph", role: "drums", period: "1992-1996, 1997-2001, 2013-2019", notes: "Replaced Lombardo in 1992; played the band's final show November 30, 2019 at The Forum, Los Angeles" },
      { name: "Jon Dette", role: "drums", period: "1996-1997", notes: "Ex-Testament; filled in between Bostaph's first and second stints" }
    ],
    drummerHistory: [
      { drummer: "dave-lombardo", period: "1981-1986, 1987-1992, 2001-2013", notes: "Co-founder, pioneered extreme thrash drumming" },
      { drummer: "paul-bostaph", period: "1992-1996, 1997-2001, 2013-2019", notes: "Three separate stints; played Slayer's final show, November 30, 2019" },
      { drummer: "jon-dette", period: "1996-1997", notes: "Ex-Testament; filled in between Bostaph's first and second stints. No verified fill-in drummer exists for the 1992 Lombardo-to-Bostaph transition or for the 2019 farewell-tour finale; Bostaph played through to the band's last show." }
    ],
    discography: [
      { title: "Show No Mercy", year: 1983, drummer: "dave-lombardo", notes: "Debut album" },
      { title: "Hell Awaits", year: 1985, drummer: "dave-lombardo" },
      { title: "Reign in Blood", year: 1986, drummer: "dave-lombardo" },
      { title: "South of Heaven", year: 1988, drummer: "dave-lombardo" },
      { title: "Seasons in the Abyss", year: 1990, drummer: "dave-lombardo", notes: "Lombardo's last album of this stint; left 1992" },
      { title: "Divine Intervention", year: 1994, drummer: "paul-bostaph", notes: "Bostaph's first studio album" },
      { title: "Undisputed Attitude", year: 1996, drummer: "paul-bostaph", notes: "Covers album" },
      { title: "Diabolus in Musica", year: 1998, drummer: "paul-bostaph", notes: "Bostaph rejoined in 1997 and is the credited recording drummer" },
      { title: "God Hates Us All", year: 2001, drummer: "paul-bostaph", notes: "Bostaph's last before his December 2001 departure" },
      { title: "Christ Illusion", year: 2006, drummer: "dave-lombardo", notes: "Lombardo's return, post-2001 rejoining" },
      { title: "World Painted Blood", year: 2009, drummer: "dave-lombardo" },
      { title: "Repentless", year: 2015, drummer: "paul-bostaph", notes: "Bostaph's return stint; Lombardo was fired in Feb 2013 before this album" }
    ],
    relatedBands: ["metallica", "megadeth", "anthrax", "testament"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Slayer",
      "https://www.discogs.com/artist/18843-Slayer",
      "https://musicbrainz.org/artist/bdacc37b-8633-4bf0-9a08-fc8c98014ad5",
      "https://www.wikidata.org/wiki/Q188859"
    ],
    faq: [
      { q: "Who is the drummer for Slayer?", a: "Slayer's last drummer before the band stopped touring was Paul Bostaph (2013-2019), who played the final show on November 30, 2019, at The Forum in Los Angeles. Founding drummer Dave Lombardo had departed in 2013." },
      { q: "Did Jon Dette drum for Slayer during the 2019 farewell tour?", a: "No. Jon Dette's Slayer tenure was 1996-1997, filling in between Paul Bostaph's first and second stints. Bostaph took over full-time from 2013 onward and remained through the entire farewell tour, including the final show in 2019." },
      { q: "How many times did Dave Lombardo leave and rejoin Slayer?", a: "Three stints: 1981-1986 (founding period), 1987-1992 (returned, then left in 1992), and 2001-2013 (rejoined for the band's 2000s-era albums, then was fired in February 2013 amid a pay/contract dispute)." },
      { q: "Who replaced Dave Lombardo when he first left Slayer in 1992?", a: "Paul Bostaph, formerly of Forbidden, replaced Lombardo directly in 1992, with no documented interim fill-in drummer. Bostaph debuted with Slayer at the 1992 Monsters of Rock festival at Castle Donington." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Slayer",
      "https://en.wikipedia.org/wiki/Slayer_discography",
      "https://en.wikipedia.org/wiki/Paul_Bostaph",
      "https://en.wikipedia.org/wiki/Dave_Lombardo"
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
    members: [
      { name: "Jens Kidman", role: "lead vocals", period: "1987-present", notes: "Founding member; also rhythm guitar 1987-1993" },
      { name: "Fredrik Thordendal", role: "lead guitar, backing vocals", period: "1987-present", notes: "Founding member" },
      { name: "Tomas Haake", role: "drums, backing/spoken vocals", period: "1990-present", notes: "Replaced founding drummer Niklas Lundgren" },
      { name: "Marten Hagstrom", role: "rhythm guitar, backing vocals", period: "1993-present", notes: "" },
      { name: "Dick Lovgren", role: "bass", period: "2004-present", notes: "Touring bassist from 2001; full member from 2004, replacing Gustaf Hielm" }
    ],
    formerMembers: [
      { name: "Niklas Lundgren", role: "drums", period: "1987-1990", notes: "Original drummer; played on the band's 1989 self-titled EP before being replaced by Tomas Haake in 1990" },
      { name: "Peter Nordin", role: "bass", period: "1987-1995", notes: "Founding bassist" },
      { name: "Gustaf Hielm", role: "bass", period: "1995-2004", notes: "Replaced Peter Nordin; replaced by Dick Lovgren" }
    ],
    drummerHistory: [
      { drummer: "niklas-lundgren", period: "1987-1990", notes: "Original drummer; played on the band's 1989 self-titled EP (Psykisk Testbild) before being replaced by Tomas Haake in 1990" },
      { drummer: "tomas-haake", period: "1990-present", notes: "Replaced founding drummer Niklas Lundgren in 1990; has recorded every Meshuggah studio album since the 1991 debut Contradictions Collapse" }
    ],
    discography: [
      { title: "Contradictions Collapse", year: 1991, drummer: "tomas-haake" },
      { title: "Destroy Erase Improve", year: 1995, drummer: "tomas-haake" },
      { title: "Chaosphere", year: 1998, drummer: "tomas-haake" },
      { title: "Nothing", year: 2002, drummer: "tomas-haake" },
      { title: "Catch Thirtythree", year: 2005, drummer: "tomas-haake" },
      { title: "obZen", year: 2008, drummer: "tomas-haake" },
      { title: "Koloss", year: 2012, drummer: "tomas-haake" },
      { title: "The Violent Sleep of Reason", year: 2016, drummer: "tomas-haake" },
      { title: "Immutable", year: 2022, drummer: "tomas-haake" }
    ],
    relatedBands: ["periphery", "animals-as-leaders"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Meshuggah",
      "https://www.discogs.com/artist/73547-Meshuggah",
      "https://musicbrainz.org/artist/cf8b3b8c-118e-4136-8d1d-c37091173413",
      "https://www.wikidata.org/wiki/Q498476"
    ],
    faq: [
      { q: "Who is the drummer for Meshuggah?", a: "Tomas Haake has been Meshuggah's drummer since 1990 and has recorded every studio album from Contradictions Collapse (1991) through Immutable (2022)." },
      { q: "Was Tomas Haake Meshuggah's first drummer?", a: "No. Meshuggah's original drummer was Niklas Lundgren, who played in the band from its 1987 formation and appeared on the 1989 self-titled EP before being replaced by Tomas Haake in 1990." },
      { q: "Has Meshuggah's lineup changed much over the years?", a: "The core lineup has been remarkably stable. Founders Jens Kidman and Fredrik Thordendal have been present since 1987; Marten Hagstrom joined in 1993; bassist Dick Lovgren became a full member in 2004, replacing longtime bassist Gustaf Hielm, who had himself replaced founding bassist Peter Nordin in 1995." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Meshuggah",
      "https://en.wikipedia.org/wiki/Meshuggah_discography",
      "https://en.wikipedia.org/wiki/Tomas_Haake"
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
    members: [
      { name: "James LaBrie", role: "vocals", period: "1991-present", notes: "Joined after debut album, replacing Charlie Dominici" },
      { name: "John Petrucci", role: "guitar", period: "1985-present", notes: "Co-founder" },
      { name: "John Myung", role: "bass", period: "1985-present", notes: "Co-founder" },
      { name: "Jordan Rudess", role: "keyboards", period: "1999-present", notes: "Joined after Derek Sherinian's departure" },
      { name: "Mike Portnoy", role: "drums", period: "1985-2010, 2023-present", notes: "Co-founder; departed 2010, rejoined October 2023" }
    ],
    formerMembers: [
      { name: "Chris Collins", role: "vocals", period: "1985-1986", notes: "Original vocalist in the band's Majesty/early Dream Theater era" },
      { name: "Charlie Dominici", role: "vocals", period: "1987-1989", notes: "Sang on debut album When Dream and Day Unite, then dismissed" },
      { name: "Kevin Moore", role: "keyboards", period: "1985-1994", notes: "Founding keyboardist, left after Awake (1994)" },
      { name: "Derek Sherinian", role: "keyboards", period: "1994-1999", notes: "Replaced Moore, left before Metropolis Pt. 2" },
      { name: "Mike Mangini", role: "drums", period: "2011-2023", notes: "Selected via public audition process after Portnoy's 2010 exit; former Berklee College of Music faculty" }
    ],
    drummerHistory: [
      { drummer: "mike-portnoy", period: "1985-2010", notes: "Co-founder, played on all albums from When Dream and Day Unite (1989) through Black Clouds & Silver Linings (2009)" },
      { drummer: "mike-mangini", period: "2011-2023", notes: "Selected via public 2010-2011 audition process; played on A Dramatic Turn of Events through A View from the Top of the World" },
      { drummer: "mike-portnoy", period: "2023-present", notes: "Rejoined the band October 2023; returned to the studio for Parasomnia (2025)" }
    ],
    discography: [
      { title: "When Dream and Day Unite", year: 1989, drummer: "mike-portnoy", notes: "Debut album, with Charlie Dominici on vocals" },
      { title: "Images and Words", year: 1992, drummer: "mike-portnoy", notes: "First album with James LaBrie" },
      { title: "Awake", year: 1994, drummer: "mike-portnoy", notes: "Last album with Kevin Moore" },
      { title: "Falling into Infinity", year: 1997, drummer: "mike-portnoy" },
      { title: "Metropolis Pt. 2: Scenes from a Memory", year: 1999, drummer: "mike-portnoy", notes: "First album with Jordan Rudess" },
      { title: "Six Degrees of Inner Turbulence", year: 2002, drummer: "mike-portnoy" },
      { title: "Train of Thought", year: 2003, drummer: "mike-portnoy" },
      { title: "Octavarium", year: 2005, drummer: "mike-portnoy" },
      { title: "Systematic Chaos", year: 2007, drummer: "mike-portnoy" },
      { title: "Black Clouds & Silver Linings", year: 2009, drummer: "mike-portnoy", notes: "Portnoy's final studio album before his 2010 departure" },
      { title: "A Dramatic Turn of Events", year: 2011, drummer: "mike-mangini", notes: "Mangini's first album with the band" },
      { title: "Dream Theater", year: 2013, drummer: "mike-mangini", notes: "Self-titled album" },
      { title: "The Astonishing", year: 2016, drummer: "mike-mangini", notes: "Double-disc concept album" },
      { title: "Distance Over Time", year: 2019, drummer: "mike-mangini" },
      { title: "A View from the Top of the World", year: 2021, drummer: "mike-mangini", notes: "Mangini's final album before Portnoy's return" },
      { title: "Parasomnia", year: 2025, drummer: "mike-portnoy", notes: "First album with Portnoy since his 2023 return" }
    ],
    relatedBands: ["sons-of-apollo"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Dream_Theater",
      "https://www.discogs.com/artist/140607-Dream-Theater",
      "https://musicbrainz.org/artist/28503ab7-8bf2-4666-a7bd-2644bfc7cb1d",
      "https://www.wikidata.org/wiki/Q191248"
    ],
    faq: [
      { q: "Who is the drummer for Dream Theater?", a: "Mike Portnoy is Dream Theater's drummer. He co-founded the band in 1985, played on every album through Black Clouds & Silver Linings (2009), left in 2010, and rejoined in October 2023, returning to the studio for Parasomnia (2025)." },
      { q: "Why did Mike Portnoy leave Dream Theater in 2010?", a: "Portnoy announced his departure in September 2010 after 25 years in the band, citing a need for a break and creative differences; the remaining members opted to continue rather than go on hiatus." },
      { q: "How did Dream Theater find Mike Mangini as Portnoy's replacement?", a: "The band publicly auditioned seven drummers — including Mike Mangini, Derek Roddy, Thomas Lang, Virgil Donati, Marco Minnemann, Aquiles Priester, and Peter Wildoer — documenting the process on YouTube before selecting Mangini, a Berklee College of Music faculty member, in April 2011." },
      { q: "What was Dream Theater's original name?", a: "The band formed in 1985 at Berklee College of Music under the name Majesty, changing to Dream Theater in 1987 after a legal dispute over the name with another band." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Dream_Theater",
      "https://en.wikipedia.org/wiki/Black_Clouds_%26_Silver_Linings",
      "https://en.wikipedia.org/wiki/Mike_Portnoy"
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
    members: [
      { name: "Phil Anselmo", role: "vocals", period: "1986-2003, 2022-present", notes: "Joined classic lineup in 1986, band inactive 2003-2022, reunion frontman since 2022" },
      { name: "Rex Brown", role: "bass", period: "1981-2003, 2022-present", notes: "Original bassist, active in 2022 reunion lineup" }
    ],
    formerMembers: [
      { name: "Terry Glaze", role: "vocals/guitar", period: "1981-1986", notes: "Original frontman during the band's glam-metal era before Anselmo joined" },
      { name: "Vinnie Paul Abbott", role: "drums", period: "1981-2003", notes: "Co-founder with brother Dimebag Darrell; played on every studio album from Metal Magic (1983) to Reinventing the Steel (2000); died June 2018" },
      { name: "Dimebag Darrell Abbott", role: "guitar", period: "1981-2003", notes: "Co-founder; murdered on stage December 8, 2004, while playing with Damageplan" }
    ],
    drummerHistory: [
      { drummer: "vinnie-paul", period: "1981-2003", notes: "Co-founder; played on all nine studio albums, Metal Magic (1983) through Reinventing the Steel (2000)" },
      { drummer: "charlie-benante", period: "2022-present", notes: "Anthrax's drummer, serving as a touring musician for the reunion lineup; no new studio album recorded as of 2026" }
    ],
    discography: [
      { title: "Metal Magic", year: 1983, drummer: "vinnie-paul", notes: "Independent debut on the band's own Metal Magic Records, glam metal era with Terry Glaze on vocals" },
      { title: "Projects in the Jungle", year: 1984, drummer: "vinnie-paul" },
      { title: "I Am the Night", year: 1985, drummer: "vinnie-paul" },
      { title: "Power Metal", year: 1988, drummer: "vinnie-paul", notes: "Last album before Phil Anselmo replaced Terry Glaze on vocals" },
      { title: "Cowboys from Hell", year: 1990, drummer: "vinnie-paul", notes: "Major-label debut, first with Phil Anselmo, marked shift to groove metal" },
      { title: "Vulgar Display of Power", year: 1992, drummer: "vinnie-paul" },
      { title: "Far Beyond Driven", year: 1994, drummer: "vinnie-paul", notes: "Debuted at #1 on the Billboard 200" },
      { title: "The Great Southern Trendkill", year: 1996, drummer: "vinnie-paul" },
      { title: "Reinventing the Steel", year: 2000, drummer: "vinnie-paul", notes: "Final Pantera studio album" }
    ],
    relatedBands: ["damageplan", "hellyeah", "anthrax"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Pantera",
      "https://www.discogs.com/artist/81780-Pantera",
      "https://musicbrainz.org/artist/eb11dd1b-83ff-4e0e-9f0f-e78ad639a5d3",
      "https://www.wikidata.org/wiki/Q334382"
    ],
    faq: [
      { q: "Who is the drummer for Pantera?", a: "Vinnie Paul Abbott was Pantera's drummer and co-founder from 1981 until the band's 2003 breakup, playing on every studio album. He died in 2018. Since the band's 2022 reunion tour, Anthrax drummer Charlie Benante has filled the drum seat as a touring musician." },
      { q: "Is Pantera still an active band making new music?", a: "Pantera reunited for touring in 2022-2023 with Phil Anselmo and Rex Brown alongside Zakk Wylde (guitar) and Charlie Benante (drums) standing in for the late Abbott brothers. As of 2026 there are no new studio recordings; Benante has said there are no plans for new Pantera music, though a live album documenting the reunion lineup has been discussed." },
      { q: "Why did the original Pantera lineup end?", a: "The Abbott brothers effectively ended Pantera in November 2003 following tensions with Phil Anselmo. Any chance of reconciliation ended when guitarist Dimebag Darrell was murdered on stage on December 8, 2004." },
      { q: "Did Pantera always play groove metal?", a: "No. Pantera's first four albums (Metal Magic, Projects in the Jungle, I Am the Night, Power Metal), released 1983-1988 on their own Metal Magic Records with Terry Glaze on vocals, were glam/power metal. The band's sound shifted to the groove metal style it's known for starting with Cowboys from Hell (1990), its major-label debut with Phil Anselmo." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Pantera",
      "https://en.wikipedia.org/wiki/Pantera_discography",
      "https://www.loudersound.com/bands-artists/i-would-love-to-release-a-live-album-of-this-lineup-no-plans-for-new-pantera-music-but-charlie-benante-wants-to-document-the-comeback"
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
    members: [
      { name: "Scott Ian", role: "guitar", period: "1981-present", notes: "Founding member, rhythm guitar" },
      { name: "Charlie Benante", role: "drums", period: "1983-present", notes: "Joined September 1983; also handles some studio guitar/songwriting duties" },
      { name: "Frank Bello", role: "bass", period: "1984-2004, 2005-present", notes: "Joined the classic lineup in 1984" },
      { name: "Joey Belladonna", role: "vocals", period: "1984-1992, 2005-2007, 2010-present", notes: "Classic-era vocalist, returned for good in 2010" },
      { name: "Jonathan Donais", role: "lead guitar", period: "2013-present", notes: "Also guitarist for Shadows Fall" }
    ],
    formerMembers: [
      { name: "Dave Weiss", role: "drums", period: "1980-1981", notes: "Original drummer during the band's formation" },
      { name: "Greg D'Angelo", role: "drums", period: "1982-1983", notes: "Appeared on the 'Soldiers of Metal' single before Benante joined" },
      { name: "Dan Lilker", role: "bass", period: "1980-1984", notes: "Founding bassist, later of Nuclear Assault and S.O.D." },
      { name: "Neil Turbin", role: "vocals", period: "1982-1984", notes: "Sang on debut album Fistful of Metal (1984)" },
      { name: "Dan Spitz", role: "guitar", period: "1983-1995, 2005-2007", notes: "Lead guitarist for the band's classic thrash era; later became a watchmaker" },
      { name: "John Bush", role: "vocals", period: "1992-2005, 2009-2010", notes: "Formerly of Armored Saint; fronted the band's alternative-leaning 1990s-2000s era" },
      { name: "Rob Caggiano", role: "guitar", period: "2001-2005, 2007-2013", notes: "Later joined Volbeat" }
    ],
    drummerHistory: [
      { drummer: "dave-weiss", period: "1980-1981", notes: "Original drummer during the band's formation" },
      { drummer: "greg-dangelo", period: "1982-1983", notes: "Appeared on the 'Soldiers of Metal' single" },
      { drummer: "charlie-benante", period: "1983-present", notes: "Joined September 1983; drummer on all studio albums from Fistful of Metal (1984) onward, with no documented tenure gaps" }
    ],
    discography: [
      { title: "Fistful of Metal", year: 1984, drummer: "charlie-benante", notes: "Debut album, with Neil Turbin on vocals" },
      { title: "Spreading the Disease", year: 1985, drummer: "charlie-benante", notes: "First album with Joey Belladonna and Frank Bello" },
      { title: "Among the Living", year: 1987, drummer: "charlie-benante" },
      { title: "State of Euphoria", year: 1988, drummer: "charlie-benante" },
      { title: "Persistence of Time", year: 1990, drummer: "charlie-benante", notes: "Earned the band's first Grammy nomination" },
      { title: "Sound of White Noise", year: 1993, drummer: "charlie-benante", notes: "First album with John Bush on vocals" },
      { title: "Stomp 442", year: 1995, drummer: "charlie-benante", notes: "Benante also handled much of the lead guitar work on this album" },
      { title: "Volume 8: The Threat Is Real", year: 1998, drummer: "charlie-benante" },
      { title: "We've Come for You All", year: 2003, drummer: "charlie-benante" },
      { title: "Worship Music", year: 2011, drummer: "charlie-benante", notes: "First album with Joey Belladonna since 1990's Persistence of Time" },
      { title: "For All Kings", year: 2016, drummer: "charlie-benante" }
    ],
    relatedBands: ["metallica", "slayer", "megadeth", "pantera"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Anthrax_(American_band)",
      "https://www.discogs.com/artist/79761-Anthrax",
      "https://musicbrainz.org/artist/f5511464-5e72-415c-8336-0e5f31e36633",
      "https://www.wikidata.org/wiki/Q188836"
    ],
    faq: [
      { q: "Who is the drummer for Anthrax?", a: "Charlie Benante has been Anthrax's drummer since September 1983, appearing on every album from Fistful of Metal (1984) to the present, including the upcoming Cursum Perficio (2026)." },
      { q: "Who played drums for Anthrax before Charlie Benante?", a: "Before Benante joined in 1983, Anthrax had two earlier drummers during the band's 1981-1983 formative period: original drummer Dave Weiss, followed by Greg D'Angelo, who appeared on the 'Soldiers of Metal' single." },
      { q: "Why did Anthrax have two different eras with different singers?", a: "Joey Belladonna fronted Anthrax's classic thrash lineup from 1984 until being fired in 1992. He was replaced by John Bush of Armored Saint, who sang on the band's 1990s and early-2000s albums. Belladonna returned for touring in 2005 and rejoined permanently in 2010, singing on Worship Music (2011) onward." },
      { q: "Is Anthrax releasing new music in 2026?", a: "Yes. Anthrax's twelfth studio album, Cursum Perficio, is scheduled for release on September 18, 2026 — its first new album in a decade, following For All Kings (2016)." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Anthrax_(American_band)",
      "https://en.wikipedia.org/wiki/List_of_Anthrax_members",
      "https://en.wikipedia.org/wiki/Stomp_442",
      "https://ultimateclassicrock.com/anthrax-new-album-new-song-2026/"
    ],
  },
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
    members: [
      { name: "Jonathan Davis", role: "vocals", period: "1993-present", notes: "Founding member" },
      { name: "James \"Munky\" Shaffer", role: "guitar", period: "1993-present", notes: "Founding member" },
      { name: "Brian \"Head\" Welch", role: "guitar", period: "1993-2005, 2013-present", notes: "Left for religious reasons in 2005, rejoined permanently in 2013" },
      { name: "Ray Luzier", role: "drums", period: "2007-present", notes: "Became full-time member in 2009; recorded first album Korn III: Remember Who You Are (2010)" }
    ],
    formerMembers: [
      { name: "David Silveria", role: "drums", period: "1993-2006", notes: "Founding member; last album was See You on the Other Side (2005); announced hiatus in December 2006" },
      { name: "Reginald \"Fieldy\" Arvizu", role: "bass", period: "1993-2021", notes: "Founding member; on indefinite hiatus since 2021, has said he does not anticipate returning" }
    ],
    drummerHistory: [
      { drummer: "david-silveria", period: "1993-2006", notes: "Founding member; played on all studio albums from Korn (1994) through See You on the Other Side (2005)" },
      { drummer: "terry-bozzio", period: "2007", notes: "Session drummer for portions of the 2007 self-titled/untitled album, alongside Brooks Wackerman" },
      { drummer: "brooks-wackerman", period: "2007", notes: "Session drummer for portions of the 2007 self-titled/untitled album, alongside Terry Bozzio" },
      { drummer: "joey-jordison", period: "2007-2008", notes: "Slipknot drummer, filled in for live shows before Ray Luzier's hiring" },
      { drummer: "ray-luzier", period: "2009-present", notes: "Became full-time official member in 2009; first studio album Korn III: Remember Who You Are (2010)" }
    ],
    discography: [
      { title: "Korn", year: 1994, drummer: "david-silveria", notes: "Self-titled debut album" },
      { title: "Life Is Peachy", year: 1996, drummer: "david-silveria" },
      { title: "Follow the Leader", year: 1998, drummer: "david-silveria", notes: "Debuted at #1 on the Billboard 200" },
      { title: "Issues", year: 1999, drummer: "david-silveria", notes: "Debuted at #1 on the Billboard 200" },
      { title: "Untouchables", year: 2002, drummer: "david-silveria" },
      { title: "Take a Look in the Mirror", year: 2003, drummer: "david-silveria" },
      { title: "See You on the Other Side", year: 2005, drummer: "david-silveria", notes: "Silveria's final studio album before his 2006 hiatus/departure" },
      { title: "Untitled album", year: 2007, notes: "No single official drummer — recorded using session musicians Terry Bozzio and Brooks Wackerman after Silveria's departure; drummer field omitted due to shared/disputed credit" },
      { title: "Korn III: Remember Who You Are", year: 2010, drummer: "ray-luzier", notes: "Ray Luzier's first studio album as official drummer" },
      { title: "The Path of Totality", year: 2011, drummer: "ray-luzier", notes: "Dubstep-influenced album" },
      { title: "The Paradigm Shift", year: 2013, drummer: "ray-luzier", notes: "First album with Brian \"Head\" Welch since his 2013 return" },
      { title: "The Serenity of Suffering", year: 2016, drummer: "ray-luzier" },
      { title: "The Nothing", year: 2019, drummer: "ray-luzier" },
      { title: "Requiem", year: 2022, drummer: "ray-luzier" }
    ],
    relatedBands: ["limp-bizkit", "deftones", "slipknot"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Korn",
      "https://www.discogs.com/artist/3270-Korn",
      "https://musicbrainz.org/artist/ac865b2e-bba8-4f5a-8756-dd40d5e39f46",
      "https://www.wikidata.org/wiki/Q244815"
    ],
    faq: [
      { q: "Who is the drummer for Korn?", a: "Ray Luzier has been Korn's drummer since 2007, becoming a full-time official member in 2009. His first studio album with the band was Korn III: Remember Who You Are (2010)." },
      { q: "What happened to Korn's original drummer David Silveria?", a: "Founding drummer David Silveria went on hiatus in December 2006 after touring for See You on the Other Side (2005), and left the band permanently. Korn's 2007 self-titled 'Untitled Album' was recorded using session drummers Terry Bozzio and Brooks Wackerman rather than a single official replacement." },
      { q: "Was there a drummer between David Silveria and Ray Luzier?", a: "There was no single permanent replacement. Session players Terry Bozzio and Brooks Wackerman recorded the 2007 self-titled album, and Slipknot's Joey Jordison filled in on tour, before Ray Luzier was hired as the full-time drummer in 2007-2009." },
      { q: "Is bassist Fieldy still in Korn?", a: "Reginald 'Fieldy' Arvizu has been on hiatus from Korn since 2021 and stated in May 2025 that he does not anticipate returning to the band." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Korn",
      "https://en.wikipedia.org/wiki/Korn_discography",
      "https://en.wikipedia.org/wiki/David_Silveria",
      "https://en.wikipedia.org/wiki/Untitled_Korn_album"
    ],
  },
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
      { name: "Matt Honeycutt", role: "vocals", period: "2009-present", notes: "Founding member" },
      { name: "Isaac Lamb", role: "drums", period: "2009-present", notes: "Founding member, only drummer in band history" },
      { name: "Eric English", role: "bass, vocals", period: "2013-present", notes: "" },
      { name: "Nicholas Adams", role: "guitar, vocals", period: "2025-present", notes: "Joined after Nolan Ashley's 2025 departure" }
    ],
    formerMembers: [
      { name: "Nolan Ashley", role: "guitar", period: "2009-2025", notes: "Founding guitarist" },
      { name: "Eric Waldrum", role: "guitar", period: "early lineup", notes: "Early-era member" },
      { name: "Korey Keeton", role: "bass", period: "early lineup", notes: "Early-era member" }
    ],
    drummerHistory: [
      { drummer: "isaac-lamb", period: "2009-present", notes: "Founding member, only drummer in band history, no documented gaps" }
    ],
    discography: [
      { title: "Youth War", year: 2010, drummer: "isaac-lamb", type: "EP", label: "Self-Released", notes: "Self-released debut EP" },
      { title: "Balancing Survival and Happiness", year: 2014, drummer: "isaac-lamb", type: "Album", label: "Artery Records", notes: "Debut full-length" },
      { title: "New Strength", year: 2015, drummer: "isaac-lamb", type: "Album", label: "Artery Records" },
      { title: "Nomad", year: 2017, drummer: "isaac-lamb", type: "Album", label: "Rise Records", notes: "First release after signing to Rise Records" },
      { title: "Absolute", year: 2019, drummer: "isaac-lamb", type: "Album", label: "Rise Records" },
      { title: "Lowest Form of Animal", year: 2022, drummer: "isaac-lamb", type: "EP", label: "Rise Records", notes: "EP" },
      { title: "Exhibition of Prowess", year: 2024, drummer: "isaac-lamb", type: "Album", label: "Rise Records" }
    ],
    relatedBands: [],
    sameAs: [
      "https://en.wikipedia.org/wiki/Kublai_Khan_(band)",
      "https://www.discogs.com/artist/5066893-Kublai-Khan-5",
      "https://musicbrainz.org/artist/f67e0b3e-d350-435a-b8ea-9f5a1ab4a4e1",
      "https://www.wikidata.org/wiki/Q19829437"
    ],
    faq: [
      { q: "Who is the drummer for Kublai Khan TX?", a: "Isaac Lamb has been Kublai Khan TX's drummer since the band's founding in 2009 — he is the only drummer in the band's entire history." },
      { q: "Why is Kublai Khan called Kublai Khan TX?", a: "The band added 'TX' to their name due to a legal dispute with a Minnesota thrash metal band also named Kublai Khan." },
      { q: "What genre is Kublai Khan TX?", a: "Kublai Khan TX plays beatdown hardcore and metalcore, influenced by bands like Hatebreed, Earth Crisis, and Integrity." },
      { q: "Where is Kublai Khan TX from?", a: "The band is from Sherman, Texas, about 60 miles north of Dallas." },
      { q: "Why does the band's name include \"TX\"?", a: "The Texas hardcore band added \"TX\" to its name following a naming conflict with a Minnesota thrash metal band also called Kublai Khan, distinguishing the two acts." },
      { q: "What was Kublai Khan TX's breakthrough release?", a: "Their debut full-length, Balancing Survival and Happiness (2014), was named to Alternative Press's 'Best Albums of 2014 So Far' list, helping establish the band nationally." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Kublai_Khan_(band)"
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
    members: [
      { name: "Chino Moreno", role: "vocals, rhythm guitar", period: "1988-present", notes: "Co-founder" },
      { name: "Stephen Carpenter", role: "lead guitar", period: "1988-present", notes: "Co-founder; intermittent touring participation since 2022" },
      { name: "Abe Cunningham", role: "drums", period: "1988-1990, 1993-present", notes: "Co-founder; briefly left 1990-1993 to join another band, returned in 1993 before any studio album was recorded" },
      { name: "Frank Delgado", role: "keyboards, turntables, samples", period: "1999-present", notes: "Touring member since 1994, official member since 1999" }
    ],
    formerMembers: [
      { name: "Dominic Garcia", role: "bass (1988-1990), drums (1990-1991)", period: "", notes: "Early-era member who briefly drummed during Abe Cunningham's 1990-1993 absence" },
      { name: "John Taylor", role: "drums", period: "1991-1993", notes: "Drummed during Abe Cunningham's absence, before the band's 1995 debut album Adrenaline" },
      { name: "Chi Cheng", role: "bass, backing vocals", period: "1990-2008", notes: "Fell into a minimally conscious state after a 2008 car accident; died in 2013. Played on all studio albums from Adrenaline (1995) through Saturday Night Wrist (2006)" },
      { name: "Sergio Vega", role: "bass, backing vocals", period: "2009-2021", notes: "Formerly of Quicksand; joined full-time after Chi Cheng's accident; departed 2021" }
    ],
    drummerHistory: [
      { drummer: "abe-cunningham", period: "1988-1990", notes: "Co-founder, before briefly leaving the band" },
      { drummer: "dominic-garcia", period: "1990-1991", notes: "Covered drums during Cunningham's absence, prior to any studio album" },
      { drummer: "john-taylor", period: "1991-1993", notes: "Covered drums during Cunningham's absence, prior to any studio album" },
      { drummer: "abe-cunningham", period: "1993-present", notes: "Returned in 1993; has drummed on every studio album from Adrenaline (1995) onward with no further gaps" }
    ],
    discography: [
      { title: "Adrenaline", year: 1995, drummer: "abe-cunningham", notes: "Debut album" },
      { title: "Around the Fur", year: 1997, drummer: "abe-cunningham", notes: "Certified platinum in the US" },
      { title: "White Pony", year: 2000, drummer: "abe-cunningham" },
      { title: "Deftones", year: 2003, drummer: "abe-cunningham", notes: "Self-titled album" },
      { title: "Saturday Night Wrist", year: 2006, drummer: "abe-cunningham", notes: "Last album with Chi Cheng before his 2008 accident" },
      { title: "Diamond Eyes", year: 2010, drummer: "abe-cunningham", notes: "First album with Sergio Vega on bass" },
      { title: "Koi No Yokan", year: 2012, drummer: "abe-cunningham" },
      { title: "Gore", year: 2016, drummer: "abe-cunningham" },
      { title: "Ohms", year: 2020, drummer: "abe-cunningham" },
      { title: "Private Music", year: 2025, drummer: "abe-cunningham", notes: "First album featuring Fred Sablan on bass" }
    ],
    relatedBands: ["korn"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Deftones",
      "https://www.discogs.com/artist/3279-Deftones",
      "https://musicbrainz.org/artist/7527f6c2-d762-4b88-b5e2-9244f1e34c46",
      "https://www.wikidata.org/wiki/Q214839"
    ],
    faq: [
      { q: "Who is the drummer for Deftones?", a: "Abe Cunningham has been Deftones' drummer since co-founding the band in 1988, aside from a brief 1990-1993 absence before the band's first studio album, and has played on every Deftones studio album since Adrenaline (1995)." },
      { q: "What happened to bassist Chi Cheng?", a: "Founding bassist Chi Cheng was left in a minimally conscious state after a November 2008 car accident and died in 2013. Quicksand bassist Sergio Vega, who had filled in previously, became his full-time replacement." },
      { q: "Did Deftones always have their classic lineup?", a: "No. Before recording any studio album, Abe Cunningham briefly left the band from 1990 to 1993 (with Dominic Garcia and John Taylor covering drums), returning in 1993 to record 1995's Adrenaline with the lineup that became the band's classic era." },
      { q: "Who plays bass for Deftones now?", a: "Fred Sablan has served as Deftones' touring bassist since 2022, following Sergio Vega's 2021 departure, and played on the 2025 album Private Music." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Deftones",
      "https://en.wikipedia.org/wiki/Abe_Cunningham"
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
    formerMembers: [
      { name: "Chuck Schuldiner", role: "guitar, vocals, founder", period: "1983-2001", notes: "Founded the band (originally as Mantas) in 1983; died December 13, 2001, of complications from brain cancer (glioma) and pneumonia, ending the band" },
      { name: "Kam Lee", role: "drums, vocals", period: "1983-1985", notes: "Early-era member on pre-debut demos including 'Death by Metal' and 'Reign of Terror' (1984); did not play on a studio album" },
      { name: "Rick Rozz", role: "guitar", period: "1983-1985, 1987-1989", notes: "Played on Leprosy (1988); later founded Massacre" },
      { name: "Chris Reifert", role: "drums", period: "1986-1987", notes: "Recorded drums on debut album Scream Bloody Gore (1987) at age 17; later founded Autopsy" },
      { name: "Bill Andrews", role: "drums", period: "1987-1990", notes: "Recorded drums on Leprosy (1988) and Spiritual Healing (1990)" },
      { name: "Terry Butler", role: "bass", period: "1987-1990", notes: "Played on Leprosy and Spiritual Healing" },
      { name: "James Murphy", role: "guitar", period: "1989-1990", notes: "Played on Spiritual Healing" },
      { name: "Sean Reinert", role: "drums", period: "1991-1992", notes: "Recorded drums on Human (1991); also of Cynic" },
      { name: "Paul Masvidal", role: "guitar", period: "1989-1990 (touring), 1991-1992", notes: "Played on Human (1991); also of Cynic" },
      { name: "Steve Di Giorgio", role: "bass", period: "1991, 1993-1995, 1997-1998", notes: "Played on Individual Thought Patterns (1993) and Symbolic (1995); also of Testament and Sadus" },
      { name: "Gene Hoglan", role: "drums", period: "1992-1995", notes: "Joined December 1992; recorded drums on Individual Thought Patterns (1993) and Symbolic (1995)" },
      { name: "Andy LaRocque", role: "guitar", period: "1993", notes: "Played on Individual Thought Patterns; also of King Diamond" },
      { name: "Bobby Koelble", role: "guitar", period: "1995-1998", notes: "Played on Symbolic and The Sound of Perseverance" },
      { name: "Kelly Conlon", role: "bass", period: "1995", notes: "Played on Symbolic" },
      { name: "Richard Christy", role: "drums", period: "1997-2001", notes: "Recorded drums on The Sound of Perseverance (1998); remained until the band's dissolution after Schuldiner's death" },
      { name: "Shannon Hamm", role: "guitar", period: "1997-2001", notes: "Played on The Sound of Perseverance" },
      { name: "Scott Clendenin", role: "bass", period: "1998-2001", notes: "Played on The Sound of Perseverance; died 2015" }
    ],
    drummerHistory: [
      { drummer: "kam-lee", period: "1983-1985", notes: "Drummed/sang on pre-debut demos ('Death by Metal', 'Reign of Terror'); did not appear on a studio album" },
      { drummer: "chris-reifert", period: "1986-1987", notes: "Recorded Scream Bloody Gore (1987)" },
      { drummer: "bill-andrews", period: "1987-1990", notes: "Recorded Leprosy (1988) and Spiritual Healing (1990)" },
      { drummer: "sean-reinert", period: "1991-1992", notes: "Recorded Human (1991)" },
      { drummer: "gene-hoglan", period: "1992-1995", notes: "Joined December 1992; recorded Individual Thought Patterns (1993) and Symbolic (1995)" },
      { drummer: "richard-christy", period: "1997-2001", notes: "Recorded The Sound of Perseverance (1998); remained until the band's dissolution" }
    ],
    discography: [
      { title: "Scream Bloody Gore", year: 1987, drummer: "chris-reifert", notes: "Debut album; Reifert recorded drums at age 17 before later founding Autopsy" },
      { title: "Leprosy", year: 1988, drummer: "bill-andrews" },
      { title: "Spiritual Healing", year: 1990, drummer: "bill-andrews" },
      { title: "Human", year: 1991, drummer: "sean-reinert", notes: "Reinert (of Cynic) recorded drums on this album only" },
      { title: "Individual Thought Patterns", year: 1993, drummer: "gene-hoglan" },
      { title: "Symbolic", year: 1995, drummer: "gene-hoglan" },
      { title: "The Sound of Perseverance", year: 1998, drummer: "richard-christy", notes: "Final Death studio album" }
    ],
    relatedBands: ["morbid-angel", "cynic"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Death_(metal_band)",
      "https://www.discogs.com/artist/252889-Death",
      "https://musicbrainz.org/artist/f3f70cdc-6226-44e1-a9f7-d1af77cac979",
      "https://www.wikidata.org/wiki/Q488464"
    ],
    faq: [
      { q: "Who is the drummer for Death?", a: "Richard Christy was Death's final drummer, joining in 1997 and recording the band's last album, The Sound of Perseverance (1998), remaining until the band's dissolution following founder Chuck Schuldiner's death in December 2001." },
      { q: "Why did Death have so many lineup changes?", a: "Death was essentially the vehicle for founder Chuck Schuldiner, who rebuilt the backing lineup around himself for nearly every album, drawing on session and touring musicians (including members of Cynic, Massacre, Testament, and King Diamond) rather than maintaining a stable band." },
      { q: "Is Death considered the first death metal band?", a: "Death's 1987 debut, Scream Bloody Gore, is widely regarded as one of the first true death metal albums, alongside early releases by Possessed and Necrophagia, and the band is considered a foundational, pioneering act in the genre." },
      { q: "How did Death come to an end?", a: "Chuck Schuldiner was diagnosed with brain cancer (glioma) while working on his side project Control Denied's debut album. He died on December 13, 2001, from complications including pneumonia, which ended Death permanently." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Death_(metal_band)",
      "https://en.wikipedia.org/wiki/List_of_Death_(metal_band)_members"
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
    members: [
      { name: "Fred Durst", role: "lead vocals", period: "1994-present", notes: "Founding member" },
      { name: "John Otto", role: "drums", period: "1994-present", notes: "Founding member; studied jazz drumming at Douglas Anderson School of the Arts" },
      { name: "Wes Borland", role: "guitar", period: "1994-2001, 2004-present", notes: "Founding member; left twice and returned" },
      { name: "DJ Lethal", role: "turntables", period: "1994-present", notes: "Founding member" }
    ],
    formerMembers: [
      { name: "Sam Rivers", role: "bass", period: "1994-2015, 2018-2025", notes: "Founding member; died October 18, 2025" },
      { name: "Sammy Siegler", role: "drums", period: "2005", notes: "Filled in on drums for much of The Unquestionable Truth (Part 1) while John Otto was unavailable" }
    ],
    drummerHistory: [
      { drummer: "john-otto", period: "1994-present", notes: "Founding member; drummer on every studio album" },
      { drummer: "sammy-siegler", period: "2005", notes: "Session fill-in for much of The Unquestionable Truth (Part 1) EP only, not a full member" }
    ],
    discography: [
      { title: "Three Dollar Bill, Y'all", year: 1997, drummer: "john-otto", notes: "Debut studio album" },
      { title: "Significant Other", year: 1999, drummer: "john-otto" },
      { title: "Chocolate Starfish and the Hot Dog Flavored Water", year: 2000, drummer: "john-otto", notes: "Band's best-selling album" },
      { title: "Results May Vary", year: 2003, drummer: "john-otto" },
      { title: "Gold Cobra", year: 2011, drummer: "john-otto" },
      { title: "Still Sucks", year: 2021, drummer: "john-otto" }
    ],
    relatedBands: ["korn", "slipknot"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Limp_Bizkit",
      "https://www.discogs.com/artist/65858-Limp-Bizkit",
      "https://musicbrainz.org/artist/e5db18cb-4b1f-496d-a308-548b611090d3",
      "https://www.wikidata.org/wiki/Q213936"
    ],
    faq: [
      { q: "Who is the drummer for Limp Bizkit?", a: "John Otto has been Limp Bizkit's drummer since the band's founding in 1994. He is one of four founding members alongside Fred Durst, Wes Borland, and DJ Lethal." },
      { q: "Did anyone else ever drum for Limp Bizkit besides John Otto?", a: "Sammy Siegler filled in on drums for much of the 2005 EP The Unquestionable Truth (Part 1), but John Otto has otherwise been the band's drummer on all albums and tours since 1994." },
      { q: "What is Limp Bizkit's best-selling album?", a: "Chocolate Starfish and the Hot Dog Flavored Water (2000) was Limp Bizkit's most commercially successful album, debuting at number one on the Billboard 200 and selling over a million copies in its first week." },
      { q: "When did Limp Bizkit form and where?", a: "Limp Bizkit formed in 1994 in Jacksonville, Florida, blending nu-metal and rap-metal." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Limp_Bizkit",
      "https://en.wikipedia.org/wiki/John_Otto_(drummer)"
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
    members: [
      { name: "Mike Muir", role: "lead vocals", period: "1980-1995, 1996-present", notes: "Founding member" },
      { name: "Dean Pleasants", role: "lead guitar, backing vocals", period: "1996-present", notes: "" },
      { name: "Ben Weinman", role: "rhythm guitar, backing vocals", period: "2018-present", notes: "Former Dillinger Escape Plan guitarist" },
      { name: "Tye Trujillo", role: "bass", period: "2021-present", notes: "Son of Metallica bassist Robert Trujillo" },
      { name: "Xavier Ware", role: "drums", period: "2026-present", notes: "Announced January 2026 as replacement for Jay Weinberg" }
    ],
    formerMembers: [
      { name: "Robert Trujillo", role: "bass", period: "1989-1995", notes: "Later joined Metallica" },
      { name: "Rocky George", role: "lead guitar", period: "1983-1994", notes: "" },
      { name: "Mike Clark", role: "rhythm guitar", period: "1983-1994", notes: "" },
      { name: "Carlos Egert", role: "drums", period: "1980-1981", notes: "Founding drummer; left after the band's first demo recording" },
      { name: "Sean Dunnigan", role: "drums", period: "1981-1982", notes: "Replaced Egert" },
      { name: "Amery Smith", role: "drums", period: "1982-1984", notes: "Drummer on the self-titled 1983 debut album" },
      { name: "R.J. Herrera", role: "drums", period: "1984-1991", notes: "Drummer through the band's classic thrash-crossover era; left in late 1991" },
      { name: "Josh Freese", role: "drums (session)", period: "1991-1992", notes: "Session drummer on The Art of Rebellion, filling in for the departed Herrera" },
      { name: "Jimmy DeGrasso", role: "drums", period: "1992-1995", notes: "Took over full-time after The Art of Rebellion tour began" },
      { name: "Brooks Wackerman", role: "drums", period: "1996-2001", notes: "Rejoined from Infectious Grooves during the band's late-90s reformation" },
      { name: "Ronald Bruner Jr.", role: "drums", period: "2001-2008", notes: "Full-time initially, then shared duties with David Hidalgo Jr. from 2002" },
      { name: "David Hidalgo Jr.", role: "drums", period: "2002-2008", notes: "Shared drumming duties with Ronald Bruner Jr." },
      { name: "Eric Moore", role: "drums", period: "2008-2016", notes: "Became full-time drummer in October 2008" },
      { name: "Thomas Pridgen", role: "drums", period: "2014", notes: "Brief tenure before joining Chiodos" },
      { name: "Dave Lombardo", role: "drums", period: "2016-2021", notes: "Former Slayer drummer; drummer on World Gone Mad (2016) and Still Cyco Punk After All These Years (2018)" },
      { name: "Brandon Pertzborn", role: "drums", period: "2021-2023", notes: "Replaced Lombardo; later joined The Offspring" },
      { name: "Greyson Nekrutman", role: "drums", period: "2023-2024", notes: "Replaced Pertzborn; later joined Sepultura" },
      { name: "Jay Weinberg", role: "drums", period: "2024-2026", notes: "Former Slipknot drummer; departed January 2026 citing the birth of his first child and other music projects" }
    ],
    drummerHistory: [
      { drummer: "carlos-egert", period: "1980-1981", notes: "Founding drummer; left after the band's first demo" },
      { drummer: "sean-dunnigan", period: "1981-1982", notes: "Replaced Egert" },
      { drummer: "amery-smith", period: "1982-1984", notes: "Drummer on the self-titled 1983 debut album" },
      { drummer: "rj-herrera", period: "1984-1991", notes: "Drummer through the classic thrash-crossover era (Join the Army through Lights...Camera...Revolution!)" },
      { drummer: "josh-freese", period: "1991-1992", notes: "Session drummer on The Art of Rebellion" },
      { drummer: "jimmy-degrasso", period: "1992-1995", notes: "Took over full-time after The Art of Rebellion tour" },
      { drummer: "brooks-wackerman", period: "1996-2001", notes: "Rejoined from Infectious Grooves during reformation" },
      { drummer: "ronald-bruner-jr", period: "2001-2008", notes: "Full-time initially, then shared duties with David Hidalgo Jr. from 2002" },
      { drummer: "david-hidalgo-jr", period: "2002-2008", notes: "Shared drumming duties with Ronald Bruner Jr." },
      { drummer: "eric-moore", period: "2008-2016", notes: "Full-time drummer from October 2008" },
      { drummer: "thomas-pridgen", period: "2014", notes: "Brief six-month tenure" },
      { drummer: "dave-lombardo", period: "2016-2021", notes: "Former Slayer drummer" },
      { drummer: "brandon-pertzborn", period: "2021-2023", notes: "Replaced Lombardo; later joined The Offspring" },
      { drummer: "greyson-nekrutman", period: "2023-2024", notes: "Replaced Pertzborn; later joined Sepultura" },
      { drummer: "jay-weinberg", period: "2024-2026", notes: "Former Slipknot drummer; departed January 2026" },
      { drummer: "xavier-ware", period: "2026-present", notes: "Announced as new drummer January 2026" }
    ],
    discography: [
      { title: "Suicidal Tendencies", year: 1983, drummer: "amery-smith", notes: "Debut album" },
      { title: "Join the Army", year: 1987, drummer: "rj-herrera" },
      { title: "How Will I Laugh Tomorrow When I Can't Even Smile Today", year: 1988, drummer: "rj-herrera" },
      { title: "Controlled by Hatred/Feel Like Shit...Deja Vu", year: 1989, drummer: "rj-herrera", notes: "Herrera was the band's drummer at the time of this release, though exact per-track session credits were not independently confirmed" },
      { title: "Lights...Camera...Revolution!", year: 1990, drummer: "rj-herrera" },
      { title: "The Art of Rebellion", year: 1992, drummer: "josh-freese", notes: "Recorded without an official drummer; session drummer Josh Freese filled in after R.J. Herrera's departure" },
      { title: "Suicidal for Life", year: 1994, drummer: "jimmy-degrasso", notes: "Only Suicidal Tendencies album to feature Jimmy DeGrasso" },
      { title: "Freedumb", year: 1999, drummer: "brooks-wackerman" },
      { title: "Free Your Soul and Save My Mind", year: 2000, drummer: "brooks-wackerman" },
      { title: "No Mercy Fool!/The Suicidal Family", year: 2010, drummer: "eric-moore" },
      { title: "13", year: 2013, drummer: "eric-moore" },
      { title: "World Gone Mad", year: 2016, drummer: "dave-lombardo" }
    ],
    relatedBands: ["slayer"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Suicidal_Tendencies",
      "https://www.discogs.com/artist/23913-Suicidal-Tendencies",
      "https://musicbrainz.org/artist/55d9aa71-5e72-4bc1-b1c0-7bf4e50b4d63",
      "https://www.wikidata.org/wiki/Q592786"
    ],
    faq: [
      { q: "Who is the drummer for Suicidal Tendencies?", a: "Xavier Ware became Suicidal Tendencies' drummer in January 2026, replacing Jay Weinberg. Ware also played drums on frontman Mike Muir's Cyco Miko solo album." },
      { q: "Has Suicidal Tendencies had many drummers?", a: "Yes — Suicidal Tendencies has had one of the most extensive drummer successions in metal/hardcore, with well over a dozen drummers since forming in 1980, including Amery Smith, R.J. Herrera, Jimmy DeGrasso, Brooks Wackerman, Eric Moore, Dave Lombardo, and Jay Weinberg." },
      { q: "Did Dave Lombardo and Jay Weinberg overlap as Suicidal Tendencies' drummer?", a: "No, they did not overlap. Dave Lombardo (formerly of Slayer) drummed from 2016 to 2021. He was followed by Brandon Pertzborn (2021-2023) and Greyson Nekrutman (2023-2024) before Jay Weinberg (formerly of Slipknot) took over in 2024." },
      { q: "Who drummed on Suicidal Tendencies' classic late-1980s albums?", a: "R.J. Herrera drummed on Join the Army (1987), How Will I Laugh Tomorrow When I Can't Even Smile Today (1988), and Lights...Camera...Revolution! (1990), helping define the band's transition from hardcore punk to crossover thrash." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/List_of_Suicidal_Tendencies_band_members",
      "https://en.wikipedia.org/wiki/Suicidal_Tendencies",
      "https://en.wikipedia.org/wiki/The_Art_of_Rebellion",
      "https://consequence.net/2026/01/suicidal-tendencies-new-drummer-xavier-ware/"
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
    members: [
      { name: "Karl Sanders", role: "guitars, vocals, keyboards", period: "1993-present", notes: "Founding member" },
      { name: "George Kollias", role: "drums", period: "2004-present", notes: "Greek drummer known for extreme speed; joined before the recording of Annihilation of the Wicked (2005)" },
      { name: "Brian Kingsland", role: "guitars, vocals", period: "2015-present", notes: "" },
      { name: "Zach Jeter", role: "guitars, vocals", period: "2022-present", notes: "" },
      { name: "Adam Roethlisberger", role: "bass, vocals", period: "2022-present", notes: "" }
    ],
    formerMembers: [
      { name: "Pete Hammoura", role: "drums", period: "1993-2000", notes: "Original drummer; drummer on Amongst the Catacombs of Nephren-Ka (1998)" },
      { name: "Tony Laureano", role: "drums", period: "2000-2004", notes: "Drummer on In Their Darkened Shrines (2002)" },
      { name: "Derek Roddy", role: "drums (session)", period: "2000", notes: "Session drummer who performed most tracks on Black Seeds of Vengeance after Pete Hammoura suffered a shoulder injury" }
    ],
    drummerHistory: [
      { drummer: "pete-hammoura", period: "1993-2000", notes: "Original drummer; drummer on the band's debut album" },
      { drummer: "derek-roddy", period: "2000", notes: "Session drummer who performed most of the drum tracks on Black Seeds of Vengeance while Hammoura was injured (Hammoura retained the booklet credit)" },
      { drummer: "tony-laureano", period: "2000-2004", notes: "Drummer on In Their Darkened Shrines" },
      { drummer: "george-kollias", period: "2004-present", notes: "Joined before Annihilation of the Wicked; drummer on all Nile albums since 2005" }
    ],
    discography: [
      { title: "Amongst the Catacombs of Nephren-Ka", year: 1998, drummer: "pete-hammoura", notes: "Debut album" },
      { title: "Black Seeds of Vengeance", year: 2000, notes: "Drummer credit is disputed: Pete Hammoura received the official booklet credit, but session drummer Derek Roddy performed most of the actual drum tracks after Hammoura suffered a shoulder injury before recording." },
      { title: "In Their Darkened Shrines", year: 2002, drummer: "tony-laureano" },
      { title: "Annihilation of the Wicked", year: 2005, drummer: "george-kollias", notes: "Kollias's first album with the band" },
      { title: "Ithyphallic", year: 2007, drummer: "george-kollias" },
      { title: "Those Whom the Gods Detest", year: 2009, drummer: "george-kollias" },
      { title: "At the Gate of Sethu", year: 2012, drummer: "george-kollias" },
      { title: "What Should Not Be Unearthed", year: 2015, drummer: "george-kollias" },
      { title: "Vile Nilotic Rites", year: 2019, drummer: "george-kollias" },
      { title: "The Underworld Awaits Us All", year: 2024, drummer: "george-kollias" }
    ],
    relatedBands: ["behemoth", "cannibal-corpse", "morbid-angel"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Nile_(band)",
      "https://www.discogs.com/artist/287805-Nile-3",
      "https://musicbrainz.org/artist/5a6b3210-3d77-417e-ad30-5d2f4ae8aa07",
      "https://www.wikidata.org/wiki/Q1412988"
    ],
    faq: [
      { q: "Who is the drummer for Nile?", a: "George Kollias has been Nile's drummer since 2004, first recording on Annihilation of the Wicked (2005). He is known for his extreme speed and endurance and has also released instructional drumming material." },
      { q: "Who drummed for Nile before George Kollias?", a: "Pete Hammoura was Nile's original drummer from the band's 1993 formation through 2000, playing on the debut Amongst the Catacombs of Nephren-Ka (1998). Tony Laureano then drummed from 2000 to 2004, playing on In Their Darkened Shrines (2002)." },
      { q: "Is there any dispute over who drummed on Black Seeds of Vengeance?", a: "Yes. Pete Hammoura is credited as drummer in the album's booklet, but he suffered a shoulder injury shortly before recording, and session drummer Derek Roddy actually performed the drum tracks on most songs (all except 'To Dream of Ur')." },
      { q: "What is Nile known for musically?", a: "Nile is known for technical and brutal death metal steeped in ancient Egyptian mythology and history, with unusually complex, high-speed drumming that has influenced the technical death metal genre." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Nile_(band)",
      "https://en.wikipedia.org/wiki/Black_Seeds_of_Vengeance"
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
    members: [
      { name: "George Fisher", role: "vocals", period: "1995-present", notes: "Replaced Chris Barnes" },
      { name: "Alex Webster", role: "bass", period: "1988-present", notes: "Founding member" },
      { name: "Paul Mazurkiewicz", role: "drums", period: "1988-present", notes: "Founding member; drummer on every studio album" },
      { name: "Rob Barrett", role: "guitar", period: "1993-1997, 2005-present", notes: "Replaced founding guitarist Bob Rusay in 1993, left in 1997, rejoined in 2005" },
      { name: "Erik Rutan", role: "guitar", period: "2005-present", notes: "Former Morbid Angel guitarist" }
    ],
    formerMembers: [
      { name: "Chris Barnes", role: "vocals", period: "1988-1995", notes: "Founding member; later formed Six Feet Under" },
      { name: "Bob Rusay", role: "guitar", period: "1988-1993", notes: "Founding member; fired in February 1993" },
      { name: "Jack Owen", role: "guitar", period: "1988-2004", notes: "Founding member" },
      { name: "Pat O'Brien", role: "guitar", period: "1997-2018", notes: "" }
    ],
    drummerHistory: [
      { drummer: "paul-mazurkiewicz", period: "1988-present", notes: "Founding member; drummer on every Cannibal Corpse studio album with no gaps" }
    ],
    discography: [
      { title: "Eaten Back to Life", year: 1990, drummer: "paul-mazurkiewicz", notes: "Debut album" },
      { title: "Butchered at Birth", year: 1991, drummer: "paul-mazurkiewicz" },
      { title: "Tomb of the Mutilated", year: 1992, drummer: "paul-mazurkiewicz" },
      { title: "The Bleeding", year: 1994, drummer: "paul-mazurkiewicz" },
      { title: "Vile", year: 1996, drummer: "paul-mazurkiewicz", notes: "First album with George Fisher on vocals" },
      { title: "Gallery of Suicide", year: 1998, drummer: "paul-mazurkiewicz" },
      { title: "Bloodthirst", year: 1999, drummer: "paul-mazurkiewicz" },
      { title: "Gore Obsessed", year: 2002, drummer: "paul-mazurkiewicz" },
      { title: "The Wretched Spawn", year: 2004, drummer: "paul-mazurkiewicz" },
      { title: "Kill", year: 2006, drummer: "paul-mazurkiewicz" },
      { title: "Evisceration Plague", year: 2009, drummer: "paul-mazurkiewicz" },
      { title: "Torture", year: 2012, drummer: "paul-mazurkiewicz" },
      { title: "A Skeletal Domain", year: 2014, drummer: "paul-mazurkiewicz" },
      { title: "Red Before Black", year: 2017, drummer: "paul-mazurkiewicz" },
      { title: "Violence Unimagined", year: 2021, drummer: "paul-mazurkiewicz" },
      { title: "Chaos Horrific", year: 2023, drummer: "paul-mazurkiewicz" }
    ],
    relatedBands: ["morbid-angel"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Cannibal_Corpse",
      "https://www.discogs.com/artist/288259-Cannibal-Corpse",
      "https://musicbrainz.org/artist/9b63b8fa-e219-45b1-9d0e-bbdb8b8b93eb",
      "https://www.wikidata.org/wiki/Q467574"
    ],
    faq: [
      { q: "Who is the drummer for Cannibal Corpse?", a: "Paul Mazurkiewicz has been Cannibal Corpse's drummer since the band's founding in December 1988, and has drummed on every studio album the band has released." },
      { q: "Has Cannibal Corpse ever changed drummers?", a: "No — Paul Mazurkiewicz and bassist Alex Webster are the only two members who have been in Cannibal Corpse continuously since its 1988 formation, making the drum seat one of the most stable in death metal." },
      { q: "Why did Cannibal Corpse change vocalists in 1995?", a: "Founding vocalist Chris Barnes was fired in 1995 due to reported conflicts within the band; he was replaced by George 'Corpsegrinder' Fisher, who has remained the band's vocalist since." },
      { q: "How did Cannibal Corpse form?", a: "Cannibal Corpse formed in Buffalo, New York in December 1988 when members of two recently disbanded local death metal bands, Beyond Death (Alex Webster, Jack Owen) and Tirant Sin (Paul Mazurkiewicz, Chris Barnes, Bob Rusay), began writing music together." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Cannibal_Corpse"
    ],
  },
  megadeth: {
    slug: "megadeth",
    name: "Megadeth",
    formed: 1983,
    origin: "Los Angeles, California, USA",
    genres: ["thrash-metal"],
    status: "active",
    metaTitle: "Megadeth - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Megadeth's drumming legacy with Nick Menza and Dirk Verbeuren.",
    summary: "Megadeth, formed in 1983 in Los Angeles by Dave Mustaine, is one of the 'Big Four' of thrash metal alongside Metallica, Slayer, and Anthrax.",
    keywords: ["megadeth", "nick menza", "dirk verbeuren", "thrash metal", "big four", "drummer gear"],
    members: [
      { name: "Dave Mustaine", role: "vocals, guitar", period: "1983-present", notes: "Founding member" },
      { name: "James LoMenzo", role: "bass", period: "2006-2010, 2010-present", notes: "" },
      { name: "Dirk Verbeuren", role: "drums", period: "2016-present", notes: "Former Soilwork drummer" },
      { name: "Teemu Mantysaari", role: "guitar", period: "2022-present", notes: "" }
    ],
    formerMembers: [
      { name: "Dijon Carruthers", role: "drums", period: "1983", notes: "Megadeth's first drummer" },
      { name: "Lee Rauch", role: "drums", period: "1983-1984", notes: "Never recorded in the studio with the band; replaced by Gar Samuelson before the Last Rites demo" },
      { name: "Gar Samuelson", role: "drums", period: "1984-1987", notes: "Jazz-fusion drummer; played on Killing Is My Business...and Business Is Good! and Peace Sells...but Who's Buying?; died 1999" },
      { name: "Chuck Behler", role: "drums", period: "1987-1989", notes: "Played on So Far, So Good...So What!" },
      { name: "Nick Menza", role: "drums", period: "1989-1998, 2004", notes: "Powered Rust in Peace and Countdown to Extinction; brief 2004 reunion ended when he was let go before touring resumed" },
      { name: "Jimmy DeGrasso", role: "drums", period: "1998-2002", notes: "Hired as a touring fill-in for Menza in 1998, became full-time; drummer on Risk (1999) and The World Needs a Hero (2001)" },
      { name: "Vinnie Colaiuta", role: "drums (session)", period: "2004", notes: "Session drummer for The System Has Failed only; never a touring/live member" },
      { name: "Shawn Drover", role: "drums", period: "2004-2014", notes: "Megadeth's longest-serving drummer; played on United Abominations, Endgame, Th1rt3en, and Super Collider" },
      { name: "Chris Adler", role: "drums", period: "2015-2016", notes: "Former Lamb of God drummer; recorded Dystopia (2016) before Dirk Verbeuren took over touring and then the permanent role" }
    ],
    drummerHistory: [
      { drummer: "dijon-carruthers", period: "1983", notes: "Megadeth's first drummer" },
      { drummer: "lee-rauch", period: "1983-1984", notes: "Never recorded in the studio with the band" },
      { drummer: "gar-samuelson", period: "1984-1987", notes: "Played on the first two studio albums" },
      { drummer: "chuck-behler", period: "1987-1989", notes: "Played on So Far, So Good...So What!" },
      { drummer: "nick-menza", period: "1989-1998, 2004", notes: "Powered Rust in Peace and Countdown to Extinction; brief 2004 reunion" },
      { drummer: "jimmy-degrasso", period: "1998-2002", notes: "Drummer on Risk and The World Needs a Hero" },
      { drummer: "vinnie-colaiuta", period: "2004", notes: "Session drummer for The System Has Failed only" },
      { drummer: "shawn-drover", period: "2004-2014", notes: "Longest-serving Megadeth drummer; four studio albums" },
      { drummer: "chris-adler", period: "2015-2016", notes: "Recorded Dystopia but did not tour with the band" },
      { drummer: "dirk-verbeuren", period: "2016-present", notes: "Former Soilwork drummer; took over touring duties in 2016 and was made permanent" }
    ],
    discography: [
      { title: "Killing Is My Business...and Business Is Good!", year: 1985, drummer: "gar-samuelson", notes: "Debut album" },
      { title: "Peace Sells...but Who's Buying?", year: 1986, drummer: "gar-samuelson" },
      { title: "So Far, So Good...So What!", year: 1988, drummer: "chuck-behler" },
      { title: "Rust in Peace", year: 1990, drummer: "nick-menza" },
      { title: "Countdown to Extinction", year: 1992, drummer: "nick-menza" },
      { title: "Youthanasia", year: 1994, drummer: "nick-menza" },
      { title: "Cryptic Writings", year: 1997, drummer: "nick-menza", notes: "Menza's last studio album with the band" },
      { title: "Risk", year: 1999, drummer: "jimmy-degrasso" },
      { title: "The World Needs a Hero", year: 2001, drummer: "jimmy-degrasso" },
      { title: "The System Has Failed", year: 2004, drummer: "vinnie-colaiuta", notes: "Session drummer; Colaiuta never toured with the band" },
      { title: "United Abominations", year: 2007, drummer: "shawn-drover" },
      { title: "Endgame", year: 2009, drummer: "shawn-drover" },
      { title: "Th1rt3en", year: 2011, drummer: "shawn-drover" },
      { title: "Super Collider", year: 2013, drummer: "shawn-drover" },
      { title: "Dystopia", year: 2016, drummer: "chris-adler", notes: "Adler recorded the album but did not tour it; Verbeuren took over live duties" },
      { title: "The Sick, the Dying...and the Dead!", year: 2022, drummer: "dirk-verbeuren" }
    ],
    relatedBands: ["metallica", "slayer", "anthrax", "testament"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Megadeth",
      "https://www.wikidata.org/wiki/Q83431"
    ],
    faq: [
      { q: "Who is the drummer for Megadeth?", a: "Dirk Verbeuren, formerly of Soilwork, has been Megadeth's drummer since 2016, and recorded The Sick, the Dying...and the Dead! (2022)." },
      { q: "Why has Megadeth had so many drummers?", a: "Megadeth is notorious for lineup instability, especially on drums, driven by a mix of firings, health issues (Nick Menza's knee tumor), band hiatuses, and members leaving for other projects. The band has had at least nine different drummers since 1983." },
      { q: "Did Chris Adler record an album with Megadeth?", a: "Yes. Former Lamb of God drummer Chris Adler was hired in 2015 and recorded the drum tracks for Dystopia (2016), but he did not tour behind the album; Dirk Verbeuren stepped in for touring and was later made the permanent drummer." },
      { q: "Who drummed on Megadeth's classic Rust in Peace and Countdown to Extinction albums?", a: "Nick Menza drummed on both Rust in Peace (1990) and Countdown to Extinction (1992), widely regarded as among the band's most acclaimed work." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Megadeth",
      "https://en.wikipedia.org/wiki/List_of_Megadeth_band_members",
      "https://en.wikipedia.org/wiki/The_World_Needs_a_Hero",
      "https://en.wikipedia.org/wiki/The_System_Has_Failed"
    ],
  },
  testament: {
    slug: "testament",
    name: "Testament",
    formed: 1983,
    origin: "Berkeley, California, USA",
    genres: ["thrash-metal"],
    status: "active",
    metaTitle: "Testament - Drummer History & Gear | MetalForge",
    metaDescription: "Complete history of Testament drummers including Paul Bostaph, Gene Hoglan, and Jon Dette.",
    summary: "Testament, formed in 1983 in Berkeley, California, is one of the most enduring bands of the Bay Area thrash metal scene.",
    keywords: ["testament", "paul bostaph", "gene hoglan", "jon dette", "bay area thrash", "thrash metal", "drummer gear"],
    members: [
      { name: "Eric Peterson", role: "rhythm and lead guitar, backing vocals", period: "1983-present", notes: "Founding member" },
      { name: "Chuck Billy", role: "lead vocals", period: "1986-present", notes: "" },
      { name: "Alex Skolnick", role: "lead and rhythm guitar, backing vocals", period: "1983-1992, 2005-present", notes: "" },
      { name: "Steve Di Giorgio", role: "bass, backing vocals", period: "1998-2005, 2014-present", notes: "" },
      { name: "Chris Dovas", role: "drums", period: "2023-present", notes: "Former Seven Spires drummer; replaced Dave Lombardo" }
    ],
    formerMembers: [
      { name: "Louie Clemente", role: "drums", period: "1983-1992", notes: "Original drummer; played on the band's first five studio albums" },
      { name: "Paul Bostaph", role: "drums", period: "1992-1993, 2004 (touring), 2007-2011", notes: "Interim touring drummer in 1992-1993 before Tempesta joined; later returned full-time and recorded The Formation of Damnation" },
      { name: "John Tempesta", role: "drums", period: "1993-1994", notes: "Former Exodus drummer; recorded Low (1994), then left to join White Zombie" },
      { name: "Jon Dette", role: "drums", period: "1994-1996, 1999-2001", notes: "Filled in for touring after Tempesta's departure; also toured with Slayer and Anthrax" },
      { name: "Gene Hoglan", role: "drums", period: "1996-1997, 2011-2022", notes: "Known as 'The Atomic Clock'; recorded Demonic (1997) in his first stint, then Dark Roots of Earth, Brotherhood of the Snake, and Titans of Creation after rejoining in 2011" },
      { name: "Dave Lombardo", role: "drums", period: "1999-2000, 2022-2023", notes: "Recorded The Gathering (1999); rejoined briefly in 2022 before Chris Dovas took over in 2023" }
    ],
    drummerHistory: [
      { drummer: "louie-clemente", period: "1983-1992", notes: "Original/founding drummer; played on the first five studio albums" },
      { drummer: "paul-bostaph", period: "1992-1993", notes: "Interim touring drummer for The Ritual tour before John Tempesta joined; no studio album from this stint" },
      { drummer: "john-tempesta", period: "1993-1994", notes: "Recorded Low, then left to join White Zombie" },
      { drummer: "jon-dette", period: "1994-1996", notes: "Touring drummer after Tempesta's departure" },
      { drummer: "gene-hoglan", period: "1996-1997", notes: "First stint; recorded Demonic" },
      { drummer: "dave-lombardo", period: "1999-2000", notes: "Recorded The Gathering" },
      { drummer: "jon-dette", period: "1999-2001", notes: "Second touring stint" },
      { drummer: "paul-bostaph", period: "2004", notes: "Touring only" },
      { drummer: "paul-bostaph", period: "2007-2011", notes: "Full-time stint; recorded The Formation of Damnation" },
      { drummer: "gene-hoglan", period: "2011-2022", notes: "Second, longer stint; recorded Dark Roots of Earth, Brotherhood of the Snake, and Titans of Creation" },
      { drummer: "dave-lombardo", period: "2022-2023", notes: "Brief second stint after Hoglan's departure; no studio album" },
      { drummer: "chris-dovas", period: "2023-present", notes: "Current drummer; recorded Para Bellum" }
    ],
    discography: [
      { title: "The Legacy", year: 1987, drummer: "louie-clemente", notes: "Debut album, released under the band's classic lineup" },
      { title: "The New Order", year: 1988, drummer: "louie-clemente" },
      { title: "Practice What You Preach", year: 1989, drummer: "louie-clemente" },
      { title: "Souls of Black", year: 1990, drummer: "louie-clemente" },
      { title: "The Ritual", year: 1992, drummer: "louie-clemente", notes: "Clemente's last album with the band" },
      { title: "Low", year: 1994, drummer: "john-tempesta", notes: "Tempesta's only studio album with Testament" },
      { title: "Demonic", year: 1997, drummer: "gene-hoglan" },
      { title: "The Gathering", year: 1999, drummer: "dave-lombardo" },
      { title: "The Formation of Damnation", year: 2008, drummer: "paul-bostaph", notes: "Bostaph's only studio album recorded during his full-time 2007-2011 stint" },
      { title: "Dark Roots of Earth", year: 2012, drummer: "gene-hoglan" },
      { title: "Brotherhood of the Snake", year: 2016, drummer: "gene-hoglan" },
      { title: "Titans of Creation", year: 2020, drummer: "gene-hoglan", notes: "Hoglan's last studio album with the band before his 2022 departure" },
      { title: "Para Bellum", year: 2025, drummer: "chris-dovas", notes: "Dovas's first studio album with the band" }
    ],
    relatedBands: ["slayer", "megadeth", "metallica", "anthrax"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Testament_(band)",
      "https://www.wikidata.org/wiki/Q309312"
    ],
    faq: [
      { q: "Who is the drummer for Testament?", a: "Chris Dovas, formerly of Seven Spires, has been Testament's drummer since April 2023, and recorded the band's Para Bellum (2025) album." },
      { q: "Why has Testament had so many different drummers?", a: "Testament's drum seat has changed hands more than a dozen times since 1983 due to a mix of member departures, touring-only fill-ins, and drummers splitting time with other high-profile bands (Slayer, Death, Dark Angel, Exodus). Gene Hoglan (1996-1997, 2011-2022) and founding drummer Louie Clemente (1983-1992) are the two longest-tenured." },
      { q: "Did Dave Lombardo ever play in Testament?", a: "Yes, twice. Lombardo recorded The Gathering (1999), and briefly rejoined the band in 2022 after Gene Hoglan's departure, before Chris Dovas took over the drum seat in April 2023." },
      { q: "Who drummed on Testament's classic late-1980s thrash albums?", a: "Louie Clemente, the band's original drummer, played on The Legacy (1987), The New Order (1988), Practice What You Preach (1989), and Souls of Black (1990)." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Testament_(band)",
      "https://en.wikipedia.org/wiki/Low_(Testament_album)",
      "https://en.wikipedia.org/wiki/The_Formation_of_Damnation",
      "https://en.wikipedia.org/wiki/Titans_of_Creation"
    ],
  },
  "lamb-of-god": {
    slug: "lamb-of-god",
    name: "Lamb of God",
    formed: 1994,
    origin: "Richmond, Virginia, USA",
    genres: ["groove-metal", "metalcore"],
    status: "active",
    metaTitle: "Lamb of God - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Lamb of God's drumming legacy with founding drummer Chris Adler and successor Art Cruz.",
    summary: "Lamb of God, formed in 1994 in Richmond, Virginia, is one of the most influential groove metal bands of the 21st century.",
    keywords: ["lamb of god", "chris adler", "art cruz", "groove metal", "metalcore", "drummer gear"],
    members: [
      { name: "Randy Blythe", role: "vocals", period: "1995-present", notes: "" },
      { name: "Mark Morton", role: "lead guitar", period: "1994, 1997-present", notes: "Founding member" },
      { name: "Willie Adler", role: "rhythm guitar", period: "1999-present", notes: "" },
      { name: "John Campbell", role: "bass", period: "1994-present", notes: "Founding member" },
      { name: "Art Cruz", role: "drums", period: "2019-present", notes: "Former Winds of Plague and Prong drummer" }
    ],
    formerMembers: [
      { name: "Chris Adler", role: "drums", period: "1994-2019", notes: "Founding member and drummer; departed in 2019 amid a mix of cited creative differences and health issues" },
      { name: "Matt Conner", role: "guitar", period: "1994", notes: "Early/founding-era member" },
      { name: "Abe Spear", role: "guitar", period: "1994-1999", notes: "" }
    ],
    drummerHistory: [
      { drummer: "chris-adler", period: "1994-2019", notes: "Founding member and drummer on every album from Burn the Priest (1999) through VII: Sturm und Drang (2015)" },
      { drummer: "art-cruz", period: "2019-present", notes: "Filled in on tour in 2018-2019 before becoming the permanent drummer in July 2019; drummer on the self-titled 2020 album and Omens (2022)" }
    ],
    discography: [
      { title: "Burn the Priest", year: 1999, drummer: "chris-adler", notes: "Released under the band's original name, Burn the Priest, before renaming to Lamb of God" },
      { title: "New American Gospel", year: 2000, drummer: "chris-adler", notes: "First album released as Lamb of God" },
      { title: "As the Palaces Burn", year: 2003, drummer: "chris-adler" },
      { title: "Ashes of the Wake", year: 2004, drummer: "chris-adler" },
      { title: "Sacrament", year: 2006, drummer: "chris-adler" },
      { title: "Wrath", year: 2009, drummer: "chris-adler" },
      { title: "Resolution", year: 2012, drummer: "chris-adler" },
      { title: "VII: Sturm und Drang", year: 2015, drummer: "chris-adler" },
      { title: "Lamb of God", year: 2020, drummer: "art-cruz", notes: "First album with Art Cruz on drums" },
      { title: "Omens", year: 2022, drummer: "art-cruz" }
    ],
    relatedBands: ["gojira", "mastodon", "pantera"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Lamb_of_God_(band)",
      "https://www.wikidata.org/wiki/Q207731"
    ],
    faq: [
      { q: "Who is the drummer for Lamb of God?", a: "Art Cruz, formerly of Winds of Plague and Prong, has been Lamb of God's drummer since 2019, and has recorded the self-titled Lamb of God (2020) and Omens (2022) albums with the band." },
      { q: "Why did Chris Adler leave Lamb of God?", a: "Chris Adler, the band's founding drummer, departed in 2019. Accounts point to a mix of factors: Adler said he was not given a choice and described the situation as 'toxic,' while also citing physical/health complications (including musician's dystonia affecting his foot) after a 2017 motorcycle accident." },
      { q: "Was there an interim drummer between Chris Adler and Art Cruz?", a: "Art Cruz filled in on tour before formally becoming Lamb of God's permanent drummer in July 2019; no other drummer served as a separate interim member between Adler's exit and Cruz's appointment." },
      { q: "Did Lamb of God exist under a different name?", a: "Yes — the band formed in Richmond, Virginia in 1994 as Burn the Priest, releasing one self-titled album under that name in 1999 before renaming to Lamb of God and releasing New American Gospel in 2000." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Lamb_of_God_(band)",
      "https://consequence.net/2019/10/chris-adler-lamb-of-god-departure-statement/"
    ],
  },
  opeth: {
    slug: "opeth",
    name: "Opeth",
    formed: 1990,
    origin: "Stockholm, Sweden",
    genres: ["progressive-death-metal", "progressive-rock"],
    status: "active",
    metaTitle: "Opeth - Drummer History & Gear | MetalForge",
    metaDescription: "Complete history of Opeth drummers from Martin Lopez to Martin Axenrot.",
    summary: "Opeth, formed in 1990 in Stockholm, Sweden, pioneered a fusion of death metal and progressive rock across a genre-defying discography.",
    keywords: ["opeth", "martin lopez", "martin axenrot", "progressive death metal", "swedish metal", "drummer gear"],
    members: [
      { name: "Mikael Åkerfeldt", role: "vocals, guitars", period: "1990-present", notes: "Founding member and primary songwriter" },
      { name: "Martín Méndez", role: "bass", period: "1997-present", notes: "Joined alongside Martin Lopez in 1997" },
      { name: "Fredrik Åkesson", role: "lead guitar", period: "2007-present", notes: "Also plays in Arch Enemy live" },
      { name: "Joakim Svalberg", role: "keyboards, backing vocals", period: "2011-present", notes: "" },
      { name: "Waltteri Väyrynen", role: "drums", period: "2022-present", notes: "Formerly of Paradise Lost and Bodom After Midnight" }
    ],
    formerMembers: [
      { name: "Amirion \"Rille\" Evén", role: "drums", period: "1990", notes: "Founding drummer of the very first Opeth lineup; no album recordings" },
      { name: "Anders Nordin", role: "drums", period: "1990-1997", notes: "Drummer on Orchid (1995) and Morningrise (1996)" },
      { name: "Martin Lopez", role: "drums", period: "1997-2006", notes: "Left due to stress-related illness; also founding member of Soen" },
      { name: "Martin Axenrot", role: "drums", period: "2006-2021", notes: "Left in November 2021 citing conflict of interest and refusal to be vaccinated against COVID-19; also plays in Bloodbath" },
      { name: "Johan De Farfalla", role: "bass", period: "1991", notes: "Left after the band's second show" },
      { name: "Peter Lindgren", role: "guitars", period: "1990-2007", notes: "Founding guitarist" }
    ],
    drummerHistory: [
      { drummer: "amirion-even", period: "1990", notes: "Founding drummer of the original 1990 lineup; no album recordings, left before the band's rebuild" },
      { drummer: "anders-nordin", period: "1990-1997", notes: "Drummer on Orchid and Morningrise; left in 1997 after De Farfalla's dismissal" },
      { drummer: "martin-lopez", period: "1997-2006", notes: "Also founding member of Soen; left due to stress-related illness" },
      { drummer: "martin-axenrot", period: "2006-2021", notes: "Also plays in Bloodbath; left November 2021 over vaccination conflict" },
      { drummer: "waltteri-vayrynen", period: "2022-present", notes: "Formerly of Paradise Lost and Bodom After Midnight" }
    ],
    discography: [
      { title: "Orchid", year: 1995, drummer: "anders-nordin" },
      { title: "Morningrise", year: 1996, drummer: "anders-nordin" },
      { title: "My Arms, Your Hearse", year: 1998, drummer: "martin-lopez" },
      { title: "Still Life", year: 1999, drummer: "martin-lopez" },
      { title: "Blackwater Park", year: 2001, drummer: "martin-lopez" },
      { title: "Deliverance", year: 2002, drummer: "martin-lopez" },
      { title: "Damnation", year: 2003, drummer: "martin-lopez" },
      { title: "Ghost Reveries", year: 2005, drummer: "martin-lopez", notes: "Lopez's last full studio album before leaving due to illness" },
      { title: "Watershed", year: 2008, drummer: "martin-axenrot" },
      { title: "Heritage", year: 2011, drummer: "martin-axenrot" },
      { title: "Pale Communion", year: 2014, drummer: "martin-axenrot" },
      { title: "Sorceress", year: 2016, drummer: "martin-axenrot" },
      { title: "In Cauda Venenum", year: 2019, drummer: "martin-axenrot" },
      { title: "The Last Will and Testament", year: 2024, drummer: "waltteri-vayrynen", notes: "First album with Väyrynen on drums" }
    ],
    relatedBands: ["gojira", "meshuggah", "tool"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Opeth",
      "https://www.wikidata.org/wiki/Q18557"
    ],
    faq: [
      { q: "Who is the drummer for Opeth?", a: "Waltteri Väyrynen has been Opeth's drummer since September 2022, when he was announced as the replacement for Martin Axenrot. Väyrynen previously drummed for Paradise Lost and Alexi Laiho's Bodom After Midnight." },
      { q: "Why did Martin Axenrot leave Opeth?", a: "Axenrot departed in November 2021 after 15 years in the band. The band cited a conflict of interest and stated Axenrot had refused to get vaccinated against COVID-19, which prevented him from touring." },
      { q: "Who drummed on Opeth's earliest albums, Orchid and Morningrise?", a: "Anders Nordin drummed on Opeth's first two albums, Orchid (1995) and Morningrise (1996), before Martin Lopez joined in 1997." },
      { q: "Why did Martin Lopez leave Opeth?", a: "Lopez stopped performing with Opeth in August 2005 after suffering stress-related illness and panic attacks; his departure was made official in 2006, with Martin Axenrot taking over." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Opeth",
      "https://en.wikipedia.org/wiki/List_of_Opeth_band_members",
      "https://en.wikipedia.org/wiki/Opeth_discography"
    ],
  },
  periphery: {
    slug: "periphery",
    name: "Periphery",
    formed: 2005,
    origin: "Washington, D.C., USA",
    genres: ["progressive-metal", "djent"],
    status: "active",
    metaTitle: "Periphery - Drummer History & Gear | MetalForge",
    metaDescription: "Explore Periphery's drumming legacy from founding drummer Travis Orbin to Matt Halpern.",
    summary: "Periphery, formed in 2005 in the Washington D.C. area, helped pioneer the djent movement within progressive metal.",
    keywords: ["periphery", "travis orbin", "matt halpern", "djent", "progressive metal", "drummer gear"],
    members: [
      { name: "Misha Mansoor", role: "guitar, programming, synthesizer", period: "2005-present", notes: "Founding member" },
      { name: "Mark Holcomb", role: "guitar", period: "2007-present", notes: "" },
      { name: "Jake Bowen", role: "guitar, programming, synthesizer", period: "2007-present", notes: "" },
      { name: "Spencer Sotelo", role: "lead vocals", period: "2010-present", notes: "" },
      { name: "Matt Halpern", role: "drums", period: "2009-present", notes: "Scouted by Mansoor while playing in a local pop band; regarded as one of the architects of the djent movement" }
    ],
    formerMembers: [
      { name: "Jason S. Berlin", role: "drums", period: "2005-2008", notes: "Early drummer before departing to pursue interests in Los Angeles" },
      { name: "Travis Orbin", role: "drums", period: "2008-2009", notes: "Replaced Berlin; left in 2009 to join Sky Eats Airplane" },
      { name: "Tom Murphy", role: "bass", period: "2005-2011", notes: "" },
      { name: "Adam \"Nolly\" Getgood", role: "bass", period: "2012-2017", notes: "Left citing lack of investment in the band; continues to produce and play bass on studio recordings as a guest" },
      { name: "Chris Barretto", role: "lead vocals", period: "2008-2010", notes: "" }
    ],
    drummerHistory: [
      { drummer: "jason-berlin", period: "2005-2008", notes: "Early drummer; departed to pursue interests in Los Angeles" },
      { drummer: "travis-orbin", period: "2008-2009", notes: "Replaced Berlin; left in 2009 to join Sky Eats Airplane" },
      { drummer: "matt-halpern", period: "2009-present", notes: "One of the architects of the djent movement" }
    ],
    discography: [
      { title: "Periphery", year: 2010, drummer: "matt-halpern" },
      { title: "Periphery II: This Time It's Personal", year: 2012, drummer: "matt-halpern" },
      { title: "Juggernaut: Alpha", year: 2015, drummer: "matt-halpern" },
      { title: "Juggernaut: Omega", year: 2015, drummer: "matt-halpern" },
      { title: "Periphery III: Select Difficulty", year: 2016, drummer: "matt-halpern" },
      { title: "Periphery IV: Hail Stan", year: 2019, drummer: "matt-halpern" },
      { title: "Periphery V: Djent Is Not a Genre", year: 2023, drummer: "matt-halpern" }
    ],
    relatedBands: ["meshuggah", "animals-as-leaders", "tesseract"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Periphery_(band)",
      "https://www.wikidata.org/wiki/Q2071101"
    ],
    faq: [
      { q: "Who is the drummer for Periphery?", a: "Matt Halpern has been Periphery's drummer since 2009, when he replaced Travis Orbin. He was scouted by founder Misha Mansoor while playing in a local pop band, and is regarded as one of the architects of the djent movement." },
      { q: "Did Periphery have a drummer before Matt Halpern?", a: "Yes. Jason S. Berlin was the band's first drummer from 2005 until he left to pursue interests in Los Angeles, followed by Travis Orbin (2008-2009), who left to join Sky Eats Airplane. Matt Halpern joined in 2009." },
      { q: "Does Periphery currently have a live bassist?", a: "No. Since Adam \"Nolly\" Getgood's 2017 departure, Periphery has performed live using backing bass tracks rather than a full-time touring bassist, though Getgood continues to record bass parts and co-produce their studio albums as a guest." },
      { q: "What does 'djent' mean and how is Periphery connected to it?", a: "Djent is an onomatopoeic term for the palm-muted, distorted guitar sound popularized by Meshuggah; Periphery, founded by Misha Mansoor, is widely credited as one of the bands that developed djent into a recognized subgenre of progressive metal in the late 2000s." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Periphery_(band)",
      "https://en.wikipedia.org/wiki/Matt_Halpern"
    ],
  },
  "morbid-angel": {
    slug: "morbid-angel",
    name: "Morbid Angel",
    formed: 1983,
    origin: "Tampa, Florida, USA",
    genres: ["death-metal"],
    status: "active",
    metaTitle: "Morbid Angel - Drummer History & Gear | MetalForge",
    metaDescription: "Complete history of Morbid Angel drummers including Pete Sandoval and Tim Yeung.",
    summary: "Morbid Angel, formed in 1983 in Tampa, Florida, is one of the founding bands of death metal.",
    keywords: ["morbid angel", "pete sandoval", "tim yeung", "death metal", "florida death metal", "drummer gear"],
    members: [
      { name: "Trey Azagthoth", role: "guitars, keyboards", period: "1983-present", notes: "Founding member, sole constant member" },
      { name: "Steve Tucker", role: "bass, vocals", period: "1996-2004, 2015-present", notes: "" },
      { name: "Dan Vadim Von", role: "guitars", period: "2022-present", notes: "" },
      { name: "Charlie Koryn", role: "drums", period: "2023-present", notes: "Joined for the band's 2023 spring American tour" }
    ],
    formerMembers: [
      { name: "Mike Browning", role: "drums, vocals", period: "1983-1986", notes: "Co-founder; drummed on demos and Abominations of Desolation (recorded 1986, released 1991). Died July 13, 2026, at age 62." },
      { name: "Wayne Hartsell", role: "drums", period: "1986-1988", notes: "Drummer on Thy Kingdom Come demo (1987)" },
      { name: "Pete Sandoval", role: "drums", period: "1988-2010", notes: "Joined July 1988; recorded Altars of Madness through Heretic; sidelined by back surgery in 2010; also co-founder of Terrorizer" },
      { name: "Tim Yeung", role: "drums", period: "2010-2015", notes: "Stepped in after Sandoval's 2010 back surgery; recorded all drums on Illud Divinum Insanus (2011); also played in Vital Remains and Hate Eternal" },
      { name: "Scott Fuller", role: "drums", period: "2017-2023", notes: "Recorded Kingdoms Disdained (2017)" }
    ],
    drummerHistory: [
      { drummer: "mike-browning", period: "1983-1986", notes: "Co-founder; drums and vocals on demos and Abominations of Desolation (recorded 1986). Died July 13, 2026." },
      { drummer: "wayne-hartsell", period: "1986-1988", notes: "Drummer on the Thy Kingdom Come demo (1987)" },
      { drummer: "pete-sandoval", period: "1988-2010", notes: "Joined July 1988; recorded Altars of Madness through Heretic; also co-founder of Terrorizer" },
      { drummer: "tim-yeung", period: "2010-2015", notes: "Filled in after Sandoval's back surgery; recorded Illud Divinum Insanus; also played in Vital Remains and Hate Eternal" },
      { drummer: "scott-fuller", period: "2017-2023", notes: "Recorded Kingdoms Disdained" },
      { drummer: "charlie-koryn", period: "2023-present", notes: "Joined for 2023 spring American tour" }
    ],
    discography: [
      { title: "Altars of Madness", year: 1989, drummer: "pete-sandoval", notes: "Sandoval's first recording with the band, completed within months of joining in July 1988" },
      { title: "Blessed Are the Sick", year: 1991, drummer: "pete-sandoval" },
      { title: "Covenant", year: 1993, drummer: "pete-sandoval" },
      { title: "Domination", year: 1995, drummer: "pete-sandoval" },
      { title: "Formulas Fatal to the Flesh", year: 1998, drummer: "pete-sandoval" },
      { title: "Gateways to Annihilation", year: 2000, drummer: "pete-sandoval" },
      { title: "Heretic", year: 2003, drummer: "pete-sandoval" },
      { title: "Illud Divinum Insanus", year: 2011, drummer: "tim-yeung", notes: "Sandoval was recovering from back surgery; Yeung recorded all drums" },
      { title: "Kingdoms Disdained", year: 2017, drummer: "scott-fuller", notes: "Return to traditional death metal sound" }
    ],
    relatedBands: ["death", "nile", "cannibal-corpse", "vader"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Morbid_Angel",
      "https://www.wikidata.org/wiki/Q309001"
    ],
    faq: [
      { q: "Who is the drummer for Morbid Angel?", a: "Charlie Koryn has drummed with Morbid Angel since joining for their 2023 spring American tour, following Scott Fuller's departure." },
      { q: "Who drummed on Morbid Angel's classic album Altars of Madness?", a: "Pete Sandoval, who joined the band in July 1988, recorded Altars of Madness (1989) within a couple months of joining -- his first Morbid Angel recording, despite never having played double bass drums before." },
      { q: "Did Pete Sandoval play on Illud Divinum Insanus?", a: "No. Sandoval was recovering from prolapsed disc surgery in 2010, so Tim Yeung (formerly of Hate Eternal) recorded all the drum tracks for Illud Divinum Insanus (2011), making it the first Morbid Angel album without Sandoval since he joined in 1988." },
      { q: "Who was Morbid Angel's original drummer?", a: "Mike Browning, who co-founded the band with guitarist Trey Azagthoth in 1983, was the original drummer (and vocalist), playing from 1984 to 1986 and recording Abominations of Desolation before departing. Browning died on July 13, 2026, at age 62." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Morbid_Angel",
      "https://en.wikipedia.org/wiki/List_of_Morbid_Angel_members",
      "https://en.wikipedia.org/wiki/Illud_Divinum_Insanus",
      "https://en.wikipedia.org/wiki/Mike_Browning"
    ],
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
    summary: "Animals as Leaders, formed in 2007 in Washington D.C. by guitarist Tosin Abasi, is a leading instrumental progressive metal act known for its complex, technical compositions.",
    keywords: ["animals as leaders", "navene koperweis", "matt garstka", "djent", "progressive metal", "instrumental metal", "drummer gear"],
    members: [
      { name: "Tosin Abasi", role: "lead guitar", period: "2007-present", notes: "Founding member" },
      { name: "Javier Reyes", role: "rhythm guitar", period: "2009-present", notes: "" },
      { name: "Matt Garstka", role: "drums", period: "2012-present", notes: "Known for jazz-fusion approach and polyrhythmic mastery" }
    ],
    formerMembers: [
      { name: "Chebon Littlefield", role: "bass, keyboards", period: "2007-2008", notes: "" },
      { name: "Navene Koperweis", role: "drums, keyboards", period: "2009-2012", notes: "Left in March 2012; also drummer in Entheos" }
    ],
    drummerHistory: [
      { drummer: "navene-koperweis", period: "2009-2012", notes: "First live drummer, joined 2009 (debut album drums were programmed, not performed by him); also drummer in Entheos" },
      { drummer: "matt-garstka", period: "2012-present", notes: "Known for jazz-fusion approach and polyrhythmic mastery" }
    ],
    discography: [
      { title: "Animals as Leaders", year: 2009, notes: "Drums were programmed (primarily by engineer Misha Mansoor), not performed by a live drummer, so no drummer slug is attributed" },
      { title: "Weightless", year: 2011, drummer: "navene-koperweis" },
      { title: "The Joy of Motion", year: 2014, drummer: "matt-garstka" },
      { title: "The Madness of Many", year: 2016, drummer: "matt-garstka" },
      { title: "Parrhesia", year: 2022, drummer: "matt-garstka" }
    ],
    relatedBands: ["periphery", "meshuggah", "tesseract"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Animals_as_Leaders",
      "https://www.wikidata.org/wiki/Q547666"
    ],
    faq: [
      { q: "Who is the drummer for Animals as Leaders?", a: "Matt Garstka has been the band's drummer since March 2012, when he replaced Navene Koperweis. He is known for a jazz-fusion approach and polyrhythmic mastery." },
      { q: "Who played drums on Animals as Leaders' 2009 self-titled debut?", a: "No live drummer performed on the 2009 debut -- the drums were programmed, largely by engineer/producer Misha Mansoor (of Periphery), while Tosin Abasi recorded most of the guitar and bass tracks himself." },
      { q: "Is Animals as Leaders a vocal band?", a: "No, Animals as Leaders is an instrumental progressive metal / djent band with no vocalist; the guitar work of Tosin Abasi and Javier Reyes carries the melodic lead role." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Animals_as_Leaders"
    ],
  },
  mastodon: {
    slug: "mastodon",
    name: "Mastodon",
    formed: 2000,
    origin: "Atlanta, Georgia, USA",
    genres: ["progressive-metal", "sludge-metal"],
    status: "active",
    metaTitle: "Mastodon - Brann Dailor Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Brann Dailor's dynamic drumming and vocals with Mastodon.",
    summary: "Mastodon, formed in 2000 in Atlanta, Georgia, blends sludge metal heaviness with progressive rock complexity.",
    keywords: ["mastodon", "brann dailor", "progressive metal", "sludge metal", "drummer gear"],
    members: [
      { name: "Brann Dailor", role: "drums, percussion, vocals", period: "2000-present", notes: "Founding member, also handles vocals" },
      { name: "Bill Kelliher", role: "rhythm guitar, backing vocals", period: "2000-present", notes: "Founding member" },
      { name: "Troy Sanders", role: "bass, lead and backing vocals", period: "2000-present", notes: "Founding member" },
      { name: "Nick Johnston", role: "lead guitar, backing vocals", period: "2025-present", notes: "Joined the recording lineup following Brent Hinds' departure" },
      { name: "João Nogueira", role: "keyboards, synthesizers", period: "2025-present", notes: "" }
    ],
    formerMembers: [
      { name: "Brent Hinds", role: "lead guitar, vocals", period: "2000-2025", notes: "Founding member; departed by mutual decision in March 2025; died in a motorcycle accident on August 20, 2025" },
      { name: "Eric Saner", role: "lead vocals", period: "2000", notes: "Very early, brief member" }
    ],
    drummerHistory: [
      { drummer: "brann-dailor", period: "2000-present", notes: "Founding member, sole drummer throughout the band's history; also handles vocals" }
    ],
    discography: [
      { title: "Remission", year: 2002, drummer: "brann-dailor" },
      { title: "Leviathan", year: 2004, drummer: "brann-dailor" },
      { title: "Blood Mountain", year: 2006, drummer: "brann-dailor" },
      { title: "Crack the Skye", year: 2009, drummer: "brann-dailor" },
      { title: "The Hunter", year: 2011, drummer: "brann-dailor" },
      { title: "Once More 'Round the Sun", year: 2014, drummer: "brann-dailor" },
      { title: "Emperor of Sand", year: 2017, drummer: "brann-dailor" },
      { title: "Hushed and Grim", year: 2021, drummer: "brann-dailor" },
      { title: "Marrow Deep", year: 2026, drummer: "brann-dailor", notes: "First album following the departure and death of founding guitarist Brent Hinds; features new guitarist Nick Johnston" }
    ],
    relatedBands: ["gojira", "lamb-of-god", "tool"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Mastodon_(band)",
      "https://www.wikidata.org/wiki/Q548844"
    ],
    faq: [
      { q: "Who is the drummer for Mastodon?", a: "Brann Dailor has been Mastodon's sole drummer since the band's formation in January 2000; he also contributes lead and backing vocals." },
      { q: "Did Mastodon ever change drummers?", a: "No. Unlike many of their peers, Mastodon has had the same drummer, Brann Dailor, for their entire history since forming in 2000." },
      { q: "What happened to founding guitarist Brent Hinds?", a: "Brent Hinds departed Mastodon by mutual decision in March 2025. He died in a motorcycle accident in Atlanta on August 20, 2025, at age 51." },
      { q: "What genre is Mastodon known for?", a: "Mastodon blends progressive metal, sludge metal, and heavy metal, evolving from the sludgier sound of early albums like Remission (2002) toward the more progressive, melodic style of later records like Crack the Skye (2009)." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Mastodon_(band)",
      "https://en.wikipedia.org/wiki/Marrow_Deep",
      "https://en.wikipedia.org/wiki/Brent_Hinds"
    ],
  },
  "cavalera-conspiracy": {
    slug: "cavalera-conspiracy",
    name: "Cavalera Conspiracy",
    formed: 2007,
    origin: "Phoenix, Arizona, USA",
    genres: ["thrash-metal", "groove-metal"],
    status: "active",
    metaTitle: "Cavalera Conspiracy - Igor Cavalera Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Igor Cavalera's drumming with Cavalera Conspiracy, reuniting the Cavalera brothers after Sepultura.",
    summary: "Cavalera Conspiracy, formed in 2007, reunited brothers Max and Igor Cavalera after their departures from Sepultura.",
    keywords: ["cavalera conspiracy", "igor cavalera", "max cavalera", "thrash metal", "groove metal", "drummer gear"],
    members: [
      { name: "Max Cavalera", role: "vocals, rhythm guitar", period: "2007-present", notes: "Founding member; also of Soulfly and formerly Sepultura" },
      { name: "Igor Cavalera", role: "drums", period: "2007-present", notes: "Founding member and co-founder; former Sepultura drummer; has remained the band's drummer continuously since founding" },
      { name: "Igor Amadeus Cavalera", role: "bass", period: "2023-present", notes: "Son of Max Cavalera" },
      { name: "Travis Stone", role: "lead guitar", period: "2023-present", notes: "" }
    ],
    formerMembers: [
      { name: "Marc Rizzo", role: "lead guitar", period: "2007-2021", notes: "Also of Soulfly" },
      { name: "Joe Duplantier", role: "bass", period: "2007-2008", notes: "Also of Gojira" },
      { name: "Johny Chow", role: "bass", period: "2008-2012, 2015-2016 (touring)", notes: "" },
      { name: "Nate Newton", role: "bass", period: "2013-2015", notes: "Also of Converge" },
      { name: "Mike Leon", role: "bass", period: "2017-2019, 2022", notes: "" }
    ],
    drummerHistory: [
      { drummer: "igor-cavalera", period: "2007-present", notes: "Co-founder, former Sepultura drummer; has drummed on all four studio albums and remains the band's drummer" }
    ],
    discography: [
      { title: "Inflikted", year: 2008, drummer: "igor-cavalera" },
      { title: "Blunt Force Trauma", year: 2011, drummer: "igor-cavalera" },
      { title: "Pandemonium", year: 2014, drummer: "igor-cavalera" },
      { title: "Psychosis", year: 2017, drummer: "igor-cavalera" }
    ],
    relatedBands: ["sepultura"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Cavalera_Conspiracy",
      "https://www.wikidata.org/wiki/Q1051751"
    ],
    faq: [
      { q: "Who is the drummer for Cavalera Conspiracy?", a: "Igor Cavalera, co-founder of the band and former Sepultura drummer, has drummed for Cavalera Conspiracy continuously since it was founded in 2007 -- he has not left the band." },
      { q: "How did Cavalera Conspiracy form?", a: "Brothers Max and Igor Cavalera, who had been estranged since Igor's 2006 departure from Sepultura, reconciled after Igor joined Max on stage at a 2006 Soulfly concert commemorating Dana Wells. This reunion led to the formation of the band, initially called Inflikted, in 2007." },
      { q: "Is Cavalera Conspiracy related to Sepultura?", a: "Yes. Founders Max and Igor Cavalera are the brothers who co-founded Sepultura; Max left Sepultura in 1996 and Igor left in 2006, after which they formed Cavalera Conspiracy together to play a thrash sound reminiscent of classic Sepultura." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Cavalera_Conspiracy"
    ],
  },
  cynic: {
    slug: "cynic",
    name: "Cynic",
    formed: 1987,
    origin: "Miami, Florida, USA",
    genres: ["technical-death-metal", "progressive-metal"],
    status: "active",
    metaTitle: "Cynic - Sean Reinert Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Sean Reinert's jazz-influenced technical drumming with Cynic.",
    summary: "Cynic, formed in 1987 in Miami, Florida, fused technical death metal with jazz fusion, most notably on their 1993 landmark album Focus.",
    keywords: ["cynic", "sean reinert", "technical death metal", "progressive metal", "jazz fusion metal", "drummer gear"],
    members: [
      { name: "Paul Masvidal", role: "guitar, keyboards, vocals", period: "1987-present", notes: "Founding member" },
      { name: "Mike Gilbert", role: "guitar", period: "2024-present", notes: "" },
      { name: "Brandon Giffin", role: "bass", period: "2011-2014, 2022-present", notes: "" },
      { name: "Michel Bélanger", role: "drums", period: "2025-present", notes: "Also drummer for Gorguts; joined May 2025 after Matt Lynch's departure, debuted at Maryland Deathfest" }
    ],
    formerMembers: [
      { name: "Sean Reinert", role: "drums", period: "1987-1994, 2006-2015", notes: "Co-founder; drummer on Focus, Traced in Air, and Kindly Bent to Free Us. Died unexpectedly in January 2020 at age 48." },
      { name: "Matt Lynch", role: "drums", period: "2015-2025", notes: "Joined September 2015 after Reinert's exit; recorded Ascension Codes (2021); left the band in May 2025 after 10 years" }
    ],
    drummerHistory: [
      { drummer: "sean-reinert", period: "1987-1994, 2006-2015", notes: "Drummer and co-founder; died January 2020 at age 48" },
      { drummer: "matt-lynch", period: "2015-2025", notes: "Joined September 2015, recorded Ascension Codes; left May 2025 after 10 years" },
      { drummer: "michel-belanger", period: "2025-present", notes: "Also drummer for Gorguts; joined May 2025" }
    ],
    discography: [
      { title: "Focus", year: 1993, drummer: "sean-reinert" },
      { title: "Traced in Air", year: 2008, drummer: "sean-reinert" },
      { title: "Kindly Bent to Free Us", year: 2014, drummer: "sean-reinert" },
      { title: "Ascension Codes", year: 2021, drummer: "matt-lynch" }
    ],
    relatedBands: ["death", "morbid-angel"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Cynic_(band)",
      "https://www.wikidata.org/wiki/Q370835"
    ],
    faq: [
      { q: "Who is the drummer for Cynic?", a: "Michel Bélanger, also known as the drummer for Gorguts, has drummed for Cynic since May 2025, when he replaced Matt Lynch." },
      { q: "Is Cynic still active after Sean Reinert's death?", a: "Yes. Founding drummer Sean Reinert died unexpectedly in January 2020, but Cynic, led by co-founder Paul Masvidal, has remained active with successive drummers Matt Lynch (2015-2025) and now Michel Bélanger (2025-present)." },
      { q: "Who drummed on Cynic's landmark album Focus?", a: "Sean Reinert, who co-founded Cynic with Paul Masvidal in 1987, drummed on the band's influential 1993 debut Focus, widely credited as a foundational album of technical/progressive death metal." },
      { q: "Who replaced Sean Reinert when he left Cynic?", a: "Matt Lynch, formerly of Trioscapes, first filled in for Cynic in October 2015 and became the band's primary drummer, recording the 2021 album Ascension Codes before departing in May 2025." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Cynic_(band)",
      "https://en.wikipedia.org/wiki/List_of_Cynic_band_members",
      "https://blabbermouth.net/news/cynic-parts-ways-with-drummer-matt-lynch-recruits-gorguts-michel-belanger"
    ],
  },
  damageplan: {
    slug: "damageplan",
    name: "Damageplan",
    formed: 2003,
    origin: "Dallas, Texas, USA",
    genres: ["groove-metal"],
    status: "disbanded",
    metaTitle: "Damageplan - Vinnie Paul Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Vinnie Paul's drumming with Damageplan, formed with brother Dimebag Darrell after Pantera.",
    summary: "Damageplan, formed in 2003 by brothers Vinnie Paul and Dimebag Darrell Abbott after Pantera's breakup, disbanded following Dimebag's murder onstage in 2004.",
    keywords: ["damageplan", "vinnie paul", "dimebag darrell", "groove metal", "drummer gear"],
    formerMembers: [
      { name: "Vinnie Paul", role: "drums", period: "2003-2004", notes: "Co-founder with brother Dimebag Darrell; former Pantera drummer; band ended after Dimebag's death Dec 2004" },
      { name: "Dimebag Darrell", role: "guitar, backing vocals", period: "2003-2004", notes: "Co-founder; killed onstage Dec 8, 2004 at the Alrosa Villa in Columbus, Ohio" },
      { name: "Patrick Lachman", role: "lead vocals", period: "2003-2004", notes: "Formerly of Halford" },
      { name: "Bob Zilla", role: "bass, backing vocals", period: "2003-2004", notes: "Later joined Hellyeah with Vinnie Paul" },
      { name: "Shawn Matthews", role: "bass, backing vocals", period: "2003", notes: "Early bassist before Bob Zilla" }
    ],
    drummerHistory: [
      { drummer: "vinnie-paul", period: "2003-2004", notes: "Co-founder with brother Dimebag Darrell; the band's only drummer" }
    ],
    discography: [
      { title: "New Found Power", year: 2004, drummer: "vinnie-paul", notes: "Damageplan's only studio album, released Feb 10, 2004; features guest appearances from Corey Taylor, Jerry Cantrell, and Zakk Wylde" }
    ],
    relatedBands: ["pantera", "hellyeah"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Damageplan",
      "https://www.wikidata.org/wiki/Q983933"
    ],
    faq: [
      { q: "Who is the drummer for Damageplan?", a: "Vinnie Paul (former Pantera drummer) was Damageplan's only drummer, from the band's formation in 2003 until it ended in December 2004." },
      { q: "Why did Damageplan break up?", a: "The band effectively ended on December 8, 2004, when guitarist Dimebag Darrell was shot and killed onstage at the Alrosa Villa nightclub in Columbus, Ohio, along with three other people, by a gunman named Nathan Gale." },
      { q: "How many albums did Damageplan release?", a: "Just one: New Found Power, released February 10, 2004, which debuted at number 38 on the Billboard 200." },
      { q: "Was Damageplan a continuation of Pantera?", a: "Not officially — Damageplan was formed by brothers Vinnie Paul and Dimebag Darrell after Pantera's breakup, with new vocalist Patrick Lachman (ex-Halford) and bassist Bob Zilla, but it drew heavily on their groove-metal sound." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Damageplan",
      "https://en.wikipedia.org/wiki/New_Found_Power"
    ],
  },
  hellyeah: {
    slug: "hellyeah",
    name: "Hellyeah",
    formed: 2006,
    origin: "Dallas, Texas, USA",
    genres: ["groove-metal", "southern-metal"],
    status: "hiatus",
    metaTitle: "Hellyeah - Vinnie Paul Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Vinnie Paul's groove metal drumming with Hellyeah, his final full-time band.",
    summary: "Hellyeah, formed in 2006, was a groove metal supergroup featuring Pantera's Vinnie Paul on drums until his death in 2018.",
    keywords: ["hellyeah", "vinnie paul", "groove metal", "southern metal", "drummer gear"],
    members: [
      { name: "Chad Gray", role: "lead vocals", period: "2006-present", notes: "Also vocalist of Mudvayne" },
      { name: "Tom Maxwell", role: "rhythm guitar", period: "2006-present", notes: "Founding member" },
      { name: "Kyle Sanders", role: "bass", period: "2014-present", notes: "Also of Bloodsimple" }
    ],
    formerMembers: [
      { name: "Vinnie Paul", role: "drums", period: "2006-2018", notes: "Founding member; former Pantera/Damageplan drummer; died June 22, 2018" },
      { name: "Roy Mayorga", role: "drums", period: "2019-2021", notes: "Stone Sour drummer who joined after Vinnie Paul's death; toured and completed the Welcome Home album cycle" },
      { name: "Greg Tribbett", role: "lead guitar", period: "2006-2014", notes: "Also of Mudvayne" },
      { name: "Christian Brady", role: "lead guitar", period: "2014-2021", notes: "" },
      { name: "Bob Zilla", role: "bass", period: "2007-2014", notes: "Also formerly of Damageplan with Vinnie Paul" },
      { name: "Jerry Montano", role: "bass", period: "2006-2007", notes: "Founding bassist" }
    ],
    drummerHistory: [
      { drummer: "vinnie-paul", period: "2006-2018", notes: "Founding drummer; recorded on all studio albums through Welcome Home (2019), completing most of its tracks before his death in June 2018" },
      { drummer: "roy-mayorga", period: "2019-2021", notes: "Joined as touring/live drummer after Vinnie Paul's death; did not record studio drum tracks on any Hellyeah album; band went on hiatus circa 2021" }
    ],
    discography: [
      { title: "Hellyeah", year: 2007, drummer: "vinnie-paul", notes: "Debut album" },
      { title: "Stampede", year: 2010, drummer: "vinnie-paul" },
      { title: "Band of Brothers", year: 2012, drummer: "vinnie-paul" },
      { title: "Blood for Blood", year: 2014, drummer: "vinnie-paul" },
      { title: "Unden!able", year: 2016, drummer: "vinnie-paul" },
      { title: "Welcome Home", year: 2019, drummer: "vinnie-paul", notes: "Vinnie Paul recorded drum tracks for 9 of 10 songs before his June 2018 death; the tenth track, 'Skyy and Water,' is drumless. Roy Mayorga later toured behind this album but did not record on it." }
    ],
    relatedBands: ["pantera", "damageplan"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Hellyeah",
      "https://www.wikidata.org/wiki/Q281253"
    ],
    faq: [
      { q: "Who is the drummer for Hellyeah?", a: "Roy Mayorga (also of Stone Sour) is Hellyeah's most recent drummer, joining in 2019 to tour behind the Welcome Home album and continuing until the band went on hiatus around 2021. Founding drummer Vinnie Paul recorded with the band from 2006 until his death in June 2018." },
      { q: "What happened to Hellyeah after Vinnie Paul's death?", a: "Vinnie Paul died on June 22, 2018. He had already recorded drum tracks for nine of the ten songs on what became the album Welcome Home (2019) before he passed. The band completed the album as a tribute and brought in Roy Mayorga to handle touring/live drums." },
      { q: "Is Hellyeah still active?", a: "As of the most recent public statements, Hellyeah is on hiatus (reported by Roy Mayorga in 2021), partly due to vocalist Chad Gray's commitments with Mudvayne." },
      { q: "Who founded Hellyeah?", a: "Hellyeah was founded in 2006 by drummer Vinnie Paul (Pantera, Damageplan), vocalist Chad Gray and guitarist Greg Tribbett (both of Mudvayne), and guitarist Tom Maxwell (Nothingface)." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Hellyeah",
      "https://en.wikipedia.org/wiki/Welcome_Home_(Hellyeah_album)",
      "https://blabbermouth.net/news/roy-mayorga-on-playing-with-hellyeah-after-vinnie-pauls-death-its-bittersweet",
      "https://loudwire.com/hellyeah-welcome-home-interview-vinnie-paul-tribute/"
    ],
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
    formerMembers: [
      { name: "Wednesday 13", role: "lead vocals, studio guitars and bass", period: "2002-2004, 2010-2011, 2018 (reunion appearance)", notes: "Co-founder" },
      { name: "Joey Jordison", role: "guitars, backing vocals, studio drums, percussion, keyboards, piano", period: "2002-2004, 2010-2011", notes: "Co-founder; also Slipknot's original drummer, but in Murderdolls he played guitar AND studio drums on both albums; died July 26, 2021" },
      { name: "Ben \"The Ghoul\" Graves", role: "touring drums", period: "2002-2004", notes: "Featured on debut album artwork/touring lineup but did not play on the studio recording; died of cancer May 9, 2018" },
      { name: "Tripp Eisen", role: "guitars (solos)", period: "2002", notes: "" },
      { name: "Acey Slade", role: "guitars", period: "2002-2004, 2018", notes: "" },
      { name: "Eric Griffin", role: "bass", period: "2002-2004, 2018", notes: "" },
      { name: "Roman Surman", role: "guitars", period: "2010-2011", notes: "" },
      { name: "Racci Shay", role: "touring drums", period: "2010-2011", notes: "Live/touring drummer for the Women and Children Last cycle; Jordison recorded the studio drum tracks" }
    ],
    drummerHistory: [
      { drummer: "joey-jordison", period: "2002-2004, 2010-2011", notes: "Recorded studio drums on both Murderdolls albums despite being billed/touring as guitarist; died 2021" }
    ],
    discography: [
      { title: "Beyond the Valley of the Murderdolls", year: 2002, drummer: "joey-jordison", notes: "Jordison played drums (plus guitar, bass, keyboards) in the studio; touring drummer Ben Graves appeared on the album artwork/lineup but did not perform on the recording" },
      { title: "Women and Children Last", year: 2010, drummer: "joey-jordison", notes: "Jordison recorded the studio drum tracks; touring drummer Racci Shay handled live performances for this album cycle but did not record on it" }
    ],
    relatedBands: ["slipknot"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Murderdolls"
    ],
    faq: [
      { q: "Who is the drummer for Murderdolls?", a: "Joey Jordison (better known as Slipknot's original drummer) played guitar in Murderdolls' touring lineup but actually recorded the studio drum tracks on both Murderdolls albums himself. Ben Graves (2002-2004) and Racci Shay (2010-2011) were touring-only drummers who did not play on the studio recordings." },
      { q: "Did Joey Jordison play drums or guitar in Murderdolls?", a: "Both, in different roles: on stage and in press photos he was billed as the guitarist, but in the studio he recorded drums, guitar, bass, keyboards and piano on Beyond the Valley of the Murderdolls (2002), and drums again on Women and Children Last (2010)." },
      { q: "Is Murderdolls still active?", a: "No. The band has been inactive since their last performance together on April 24, 2011. Co-founder Joey Jordison died on July 26, 2021." },
      { q: "How many albums did Murderdolls release?", a: "Two studio albums: Beyond the Valley of the Murderdolls (2002) and Women and Children Last (2010)." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Murderdolls",
      "https://en.wikipedia.org/wiki/Beyond_the_Valley_of_the_Murderdolls",
      "https://en.wikipedia.org/wiki/Women_and_Children_Last",
      "https://loudwire.com/ben-graves-death/"
    ],
  },
  "sons-of-apollo": {
    slug: "sons-of-apollo",
    name: "Sons of Apollo",
    formed: 2017,
    origin: "United States",
    genres: ["progressive-metal"],
    status: "hiatus",
    metaTitle: "Sons of Apollo - Mike Mangini Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Mike Mangini's drumming with progressive metal supergroup Sons of Apollo.",
    summary: "Sons of Apollo, formed in 2017, is a progressive metal supergroup featuring Dream Theater drummer Mike Mangini alongside members of Journey, Mr. Big, and Guns N' Roses.",
    keywords: ["sons of apollo", "mike mangini", "progressive metal", "supergroup", "drummer gear"],
    formerMembers: [
      { name: "Mike Portnoy", role: "drums, percussion, co-lead vocals", period: "2017-2023", notes: "Also Dream Theater co-founder; rejoined Dream Theater in October 2023, effectively ending Sons of Apollo's active period" },
      { name: "Jeff Scott Soto", role: "lead vocals, acoustic guitar", period: "2017-2023", notes: "Later joined Bumblefoot in Art of Anarchy" },
      { name: "Ron \"Bumblefoot\" Thal", role: "electric guitar, vocals", period: "2017-2023", notes: "Formed Whom Gods Destroy with Sherinian after Sons of Apollo folded" },
      { name: "Billy Sheehan", role: "bass, vocals", period: "2017-2023", notes: "" },
      { name: "Derek Sherinian", role: "keyboards, string arrangements", period: "2017-2023", notes: "Invited Portnoy to start the project in 2017; later confirmed MMXX as the band's final album" }
    ],
    drummerHistory: [
      { drummer: "mike-portnoy", period: "2017-2023", notes: "Sole drummer for the band's entire active run; also Dream Theater co-founder, which he rejoined in Oct 2023" }
    ],
    discography: [
      { title: "Psychotic Symphony", year: 2017, drummer: "mike-portnoy", notes: "Debut album" },
      { title: "MMXX", year: 2020, drummer: "mike-portnoy", notes: "Later confirmed by Derek Sherinian as the band's final album" }
    ],
    relatedBands: ["dream-theater"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Sons_of_Apollo",
      "https://www.wikidata.org/wiki/Q35835169"
    ],
    faq: [
      { q: "Who is the drummer for Sons of Apollo?", a: "Mike Portnoy (also known for Dream Theater) was Sons of Apollo's drummer for the band's entire run, from its 2017 formation until it disbanded around 2023." },
      { q: "Is Sons of Apollo still active?", a: "No. The band has been inactive since completing a South American tour in August 2022, and members have confirmed the split — guitarist Ron 'Bumblefoot' Thal called it 'past tense' in October 2023, and keyboardist Derek Sherinian described MMXX as their 'second and final album.'" },
      { q: "Did Mike Portnoy leave Sons of Apollo to rejoin Dream Theater?", a: "Portnoy has publicly denied that his October 2023 return to Dream Theater caused Sons of Apollo's breakup, saying the band had already stopped moving forward during the pandemic when not all members wanted to continue." },
      { q: "How many albums did Sons of Apollo release?", a: "Two studio albums: Psychotic Symphony (2017) and MMXX (2020)." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Sons_of_Apollo",
      "https://loudwire.com/what-mike-portnoys-return-to-dream-theater-means-for-sons-of-apollo/",
      "https://blabbermouth.net/news/mike-portnoy-denies-his-return-to-dream-theater-had-anything-to-do-with-sons-of-apollos-demise"
    ],
  },
  vader: {
    slug: "vader",
    name: "Vader",
    formed: 1983,
    origin: "Olsztyn, Poland",
    genres: ["death-metal", "thrash-metal"],
    status: "active",
    metaTitle: "Vader - Daray Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Daray's extreme drumming with Polish death metal band Vader.",
    summary: "Vader, formed in 1983 in Olsztyn, Poland, is one of the longest-running and most influential death metal bands in Europe.",
    keywords: ["vader", "daray", "death metal", "polish metal", "drummer gear"],
    members: [
      { name: "Piotr \"Peter\" Wiwczarek", role: "lead guitar, lead vocals", period: "1983-present", notes: "Founder; only constant member throughout the band's history; lead guitar from 1983, lead vocals added in 1988" },
      { name: "Marek \"Spider\" Pająk", role: "rhythm guitar", period: "2010-present", notes: "" },
      { name: "Tomasz \"Hal\" Halicki", role: "bass guitar", period: "2011-present", notes: "" },
      { name: "Michał Andrzejczyk", role: "drums", period: "2022-present", notes: "Joined February 2022 replacing James Stewart" }
    ],
    formerMembers: [
      { name: "Daniel Markowski", role: "drums", period: "1983", notes: "Original drummer, fired after poor rehearsal performance" },
      { name: "Adam Skwarek", role: "drums", period: "1983", notes: "Dismissed after one rehearsal" },
      { name: "Grzegorz \"Belial\" Jackowski", role: "drums", period: "1984-1988", notes: "" },
      { name: "Krzysztof \"Doc\" Raczkowski", role: "drums", period: "1988-2005", notes: "Joined May 1988; recorded on albums from The Ultimate Incantation (1992) through Black to the Blind (1997) and beyond; fired March 2005 due to struggles with alcoholism; died of heart failure five months later at age 34" },
      { name: "Marcin \"Ząbek\" Gołębiewski", role: "drums (temporary fill-in)", period: "1999", notes: "Brief touring fill-in during late 1999" },
      { name: "Dariusz \"Daray\" Brzozowski", role: "drums", period: "2004-2008", notes: "Temporary stand-in from Feb 2004, permanent from March 2005 after Doc's departure; also drummer for Dimmu Borgir; left in 2008" },
      { name: "Paweł \"Paul\" Jaroszewicz", role: "drums", period: "2008-2011", notes: "First appeared on Necropolis (2009); left July 2011 for family reasons" },
      { name: "James Stewart", role: "drums", period: "2011-2022", notes: "Departed February 2022, deciding he could not maintain full commitment to the band" },
      { name: "Maurycy \"Mauser\" Stefanowicz", role: "rhythm guitar", period: "1997-2008, 2024-present", notes: "" }
    ],
    drummerHistory: [
      { drummer: "daniel-markowski", period: "1983", notes: "Original drummer, fired after a poor rehearsal; no recordings" },
      { drummer: "adam-skwarek", period: "1983", notes: "Dismissed after one rehearsal; no recordings" },
      { drummer: "grzegorz-jackowski", period: "1984-1988", notes: "Known as \"Belial\"; predates the band's studio album era" },
      { drummer: "doc", period: "1988-2005", notes: "Krzysztof \"Doc\" Raczkowski; recorded The Ultimate Incantation through Revelations; fired March 2005 for alcoholism struggles, died months later" },
      { drummer: "marcin-golebiewski", period: "1999", notes: "Known as \"Ząbek\"; brief touring fill-in only, did not appear on a studio album" },
      { drummer: "daray", period: "2004-2008", notes: "Dariusz Brzozowski; stand-in from Feb 2004, permanent from March 2005; recorded The Beast and Impressions in Blood; also drummer for Dimmu Borgir" },
      { drummer: "pawel-jaroszewicz", period: "2008-2011", notes: "Recorded Necropolis and Welcome to the Morbid Reich; left July 2011 for family reasons" },
      { drummer: "james-stewart", period: "2011-2022", notes: "Recorded Tibi et Igni, The Empire, and Solitude in Madness; departed Feb 2022" },
      { drummer: "michal-andrzejczyk", period: "2022-present", notes: "Current drummer since Feb 2022" }
    ],
    discography: [
      { title: "The Ultimate Incantation", year: 1992, drummer: "doc", notes: "Krzysztof \"Doc\" Raczkowski on drums" },
      { title: "De Profundis", year: 1995, drummer: "doc" },
      { title: "Black to the Blind", year: 1997, drummer: "doc" },
      { title: "Litany", year: 2000, drummer: "doc" },
      { title: "Revelations", year: 2002, drummer: "doc" },
      { title: "The Beast", year: 2004, drummer: "daray", notes: "Daray began as a temporary stand-in for Doc in Feb 2004, then became permanent in March 2005" },
      { title: "Impressions in Blood", year: 2006, drummer: "daray" },
      { title: "Necropolis", year: 2009, drummer: "pawel-jaroszewicz", notes: "First Vader release to feature Paweł \"Paul\" Jaroszewicz on drums" },
      { title: "Welcome to the Morbid Reich", year: 2011, drummer: "pawel-jaroszewicz", notes: "Jaroszewicz left in July 2011; unclear if he completed all recording or if James Stewart contributed — attribution based on his listed 2008-2011 tenure" },
      { title: "Tibi et Igni", year: 2014, drummer: "james-stewart" },
      { title: "The Empire", year: 2016, drummer: "james-stewart" },
      { title: "Solitude in Madness", year: 2020, drummer: "james-stewart" }
    ],
    relatedBands: ["behemoth", "morbid-angel"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Vader_(band)",
      "https://www.wikidata.org/wiki/Q622982"
    ],
    faq: [
      { q: "Who is the drummer for Vader?", a: "Michał Andrzejczyk has been Vader's drummer since February 2022, when he replaced James Stewart (who had drummed for the band since 2011)." },
      { q: "Where does the band name Vader come from?", a: "The name was inspired by Darth Vader from the Star Wars film series." },
      { q: "Why did longtime drummer Doc leave Vader?", a: "Krzysztof 'Doc' Raczkowski, Vader's drummer since 1988, was fired in March 2005 due to struggles with alcoholism. He died five months later, in 2005, from heart failure at age 34." },
      { q: "Has Vader had a stable lineup?", a: "No — founder Piotr 'Peter' Wiwczarek is the band's only constant member since 1983. Vader has cycled through numerous drummers (at least eight across its history) and several bassists and second guitarists." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Vader_(band)",
      "https://en.wikipedia.org/wiki/List_of_Vader_band_members",
      "https://en.wikipedia.org/wiki/Necropolis_(album)",
      "https://en.wikipedia.org/wiki/Vader_discography"
    ],
  },
  volto: {
    slug: "volto",
    name: "Volto!",
    formed: 2000,
    origin: "Los Angeles, California, USA",
    genres: ["progressive-rock", "jazz-fusion"],
    status: "active",
    metaTitle: "Volto! - Danny Carey Drummer Profile & Gear | MetalForge",
    metaDescription: "Explore Danny Carey's jazz-fusion drumming with instrumental progressive rock trio Volto!.",
    summary: "Volto!, formed in Los Angeles in the early 2000s, is an instrumental progressive rock/jazz-fusion project featuring Tool drummer Danny Carey.",
    keywords: ["volto", "danny carey", "progressive rock", "jazz fusion", "instrumental rock", "drummer gear"],
    members: [
      { name: "Danny Carey", role: "drums", period: "early 2000s-present", notes: "Also Tool's drummer since 1990; founding member of Volto!" },
      { name: "John Ziegler", role: "guitars", period: "early 2000s-present", notes: "Previously played with Carey in Pigmy Love Circus" },
      { name: "Lance Morrison", role: "bass", period: "early 2000s-present", notes: "" },
      { name: "Matt Rohde", role: "keyboards", period: "unknown-present", notes: "" }
    ],
    drummerHistory: [
      { drummer: "danny-carey", period: "early 2000s-present", notes: "Sole drummer throughout the band's history; also drummer for Tool since 1990" }
    ],
    discography: [
      { title: "Incitare", year: 2013, drummer: "danny-carey", notes: "Volto!'s only studio album to date; recorded live in Carey's home studio" }
    ],
    relatedBands: ["tool"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Volto!",
      "https://www.wikidata.org/wiki/Q14915736"
    ],
    faq: [
      { q: "Who is the drummer for Volto!?", a: "Danny Carey, also known as the longtime drummer of Tool (since 1990), is Volto!'s drummer and a founding member." },
      { q: "How did Volto! form?", a: "Volto! grew out of prior musical relationships: Danny Carey and guitarist John Ziegler had previously played together in Pigmy Love Circus, and both jammed with bassist Lance Morrison at a jazz club in Southern California's San Fernando Valley." },
      { q: "How many albums has Volto! released?", a: "One studio album, Incitare, released July 23, 2013, recorded live in Danny Carey's home studio." },
      { q: "What genre is Volto!?", a: "Volto! is classified as a rock jam band spanning rock, jazz fusion, jam band, and progressive rock." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Volto!",
      "https://loudwire.com/danny-carey-debut-volto-album-how-music-differs-from-tool-more/"
    ],
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
    members: [
      { name: "Adam \"Nergal\" Darski", role: "guitar, lead vocals", period: "1991-present", notes: "Founder; also played bass and rhythm guitar during various periods; recovered from leukemia diagnosed August 2010" },
      { name: "Zbigniew \"Inferno\" Promiński", role: "drums", period: "1997-1999, 2000-present", notes: "Left briefly around the release of Satanica in 1999, returned in early 2000; took paternity leave in July 2017 with Jan \"the Charn\" Rice filling in" },
      { name: "Tomasz \"Orion\" Wróblewski", role: "bass, backing vocals", period: "2003-present", notes: "" },
      { name: "Patryk \"Seth\" Sztyber", role: "guitar, backing vocals", period: "2004-present", notes: "" }
    ],
    formerMembers: [
      { name: "Adam \"Baal Ravenlock\" Muraszko", role: "drums", period: "1991-1996", notes: "Original drummer during Behemoth's early black metal era, including debut album Sventevith (Storming Near the Baltic) 1995 and Grom 1996" },
      { name: "Adam \"Desecrator\" Malinowski", role: "rhythm guitar, backing vocals", period: "1991-1992", notes: "" },
      { name: "Rafał \"Frost\" Brauer", role: "rhythm guitar, backing vocals", period: "1993-1994", notes: "" },
      { name: "Sławomir \"Orcus\" Kolasa", role: "bass, backing vocals", period: "1993", notes: "" },
      { name: "Leszek \"Les\" Dziegielewski", role: "bass, rhythm guitar, backing vocals", period: "1995-1997, 1998-1999", notes: "" },
      { name: "Mefisto", role: "bass, backing vocals", period: "1997-1998", notes: "" },
      { name: "Mateusz \"Havoc\" Śmierzchalski", role: "rhythm guitar, backing vocals", period: "2000-2003", notes: "" },
      { name: "Marcin \"Novy\" Nowak", role: "bass, backing vocals (session)", period: "2000-2003", notes: "Session/touring musician" }
    ],
    drummerHistory: [
      { drummer: "baal-ravenlock", period: "1991-1996", notes: "Adam \"Baal Ravenlock\" Muraszko; original drummer during the band's early black metal era" },
      { drummer: "inferno", period: "1997-1999, 2000-present", notes: "Zbigniew Promiński; briefly left around the release of Satanica (1999), returned early 2000; took paternity leave July 2017 with Jan \"the Charn\" Rice filling in on tour" }
    ],
    discography: [
      { title: "Sventevith (Storming Near the Baltic)", year: 1995, drummer: "baal-ravenlock", notes: "Debut album; pre-Inferno era" },
      { title: "Grom", year: 1996, drummer: "baal-ravenlock" },
      { title: "Pandemonic Incantations", year: 1998, drummer: "inferno", notes: "Inferno's first studio album with the band" },
      { title: "Satanica", year: 1999, drummer: "inferno", notes: "Recorded April-May 1999; marked the band's shift toward blended black/death metal" },
      { title: "Thelema.6", year: 2000, drummer: "inferno", notes: "Inferno had returned to the band by early 2000 after a brief departure" },
      { title: "Zos Kia Cultus (Here and Beyond)", year: 2002, drummer: "inferno" },
      { title: "Demigod", year: 2004, drummer: "inferno" },
      { title: "The Apostasy", year: 2007, drummer: "inferno" },
      { title: "Evangelion", year: 2009, drummer: "inferno", notes: "Produced by Colin Richardson" },
      { title: "The Satanist", year: 2014, drummer: "inferno", notes: "Recorded following Nergal's recovery from leukemia; received widespread acclaim" },
      { title: "I Loved You at Your Darkest", year: 2018, drummer: "inferno" },
      { title: "Opvs Contra Natvram", year: 2022, drummer: "inferno", notes: "Released for the band's 30th anniversary" }
    ],
    relatedBands: ["nile", "morbid-angel", "vader"],
    sameAs: [
      "https://en.wikipedia.org/wiki/Behemoth_(band)",
      "https://www.discogs.com/artist/278269-Behemoth-3",
      "https://musicbrainz.org/artist/bdc6da18-a0d4-4f3a-ae33-05dc5af2dec2",
      "https://www.wikidata.org/wiki/Q213498"
    ],
    faq: [
      { q: "Who is the drummer for Behemoth?", a: "Zbigniew \"Inferno\" Promiński has been Behemoth's drummer since 1997 (with a brief gap around 1999-2000), making him the band's longest-serving drummer by far." },
      { q: "Who drummed for Behemoth before Inferno?", a: "Adam \"Baal Ravenlock\" Muraszko was Behemoth's original drummer from the band's 1991 formation through 1996, playing on their early black metal releases including the debut album Sventevith (Storming Near the Baltic) (1995) and Grom (1996)." },
      { q: "How did Nergal's leukemia diagnosis affect the band?", a: "Frontman Nergal (Adam Darski) was hospitalized with leukemia in August 2010 and underwent a bone marrow transplant; the band cancelled multiple tours during his treatment and recovery before he returned to performing." },
      { q: "How has Behemoth's genre evolved?", a: "Behemoth started as a traditional black metal band in the early 1990s and gradually incorporated death metal elements through the late 1990s (notably by Satanica, 1999), becoming classified as \"blackened death metal\" by the 2000s." },
      { q: "Where does the name Behemoth come from?", a: "The band's name derives from the biblical creature referenced in the Book of Job." }
    ],
    sources: [
      "https://en.wikipedia.org/wiki/Behemoth_(band)",
      "https://en.wikipedia.org/wiki/Satanica_(Behemoth_album)",
      "https://en.wikipedia.org/wiki/Zbigniew_Robert_Promi%C5%84ski"
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

/**
 * Derive a band's current drummer from drummerHistory instead of storing a
 * separate field that could drift out of sync (Issue #4769, epic #4753
 * extension). The last entry in drummerHistory is always the most recent
 * drummer, whether their period is still open-ended ("...-present") or the
 * band has since disbanded and that entry was their final drummer.
 * @param {Object} band - Band data object
 * @returns {Object|null} The last drummerHistory entry, plus `isFinal` (true
 *   when the band has disbanded and this was its last drummer)
 */
export function getCurrentDrummer(band) {
  if (!band || !Array.isArray(band.drummerHistory) || band.drummerHistory.length === 0) {
    return null;
  }
  const entry = band.drummerHistory[band.drummerHistory.length - 1];
  return {
    ...entry,
    isFinal: band.status === 'disbanded',
  };
}

/**
 * Derive every drum-chair change (one drummer handing off to the next)
 * across all bands, sourced entirely from each band's drummerHistory —
 * Issue #4769. Grows automatically as bands.js gains history entries; no
 * separately maintained list to fall out of sync.
 * @returns {Array} Change records sorted by year, most recent first
 */
export function getDrumChairChanges() {
  const changes = [];
  for (const band of Object.values(bands)) {
    const history = band.drummerHistory || [];
    for (let i = 1; i < history.length; i++) {
      const fromEntry = history[i - 1];
      const toEntry = history[i];
      const year = parseInt(String(toEntry.period).split('-')[0], 10);
      if (!Number.isFinite(year)) continue;
      changes.push({
        bandSlug: band.slug,
        bandName: band.name,
        fromDrummer: fromEntry.drummer,
        toDrummer: toEntry.drummer,
        year,
        period: toEntry.period,
        notes: toEntry.notes || '',
      });
    }
  }
  changes.sort((a, b) => b.year - a.year);
  return changes;
}

export default bands;
