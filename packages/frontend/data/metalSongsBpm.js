/**
 * Metal Songs BPM Database
 * A curated collection of famous metal songs with their BPMs
 * Issue #342: BPM Tap Calculator with Song Database
 * 
 * BPM values are approximate and based on common tempo markings.
 * Songs are categorized by tempo range and subgenre.
 */

// Tempo range definitions for metal
export const TEMPO_RANGES = {
  slow: { min: 40, max: 89, label: 'Doom/Sludge', emoji: '🐢' },
  mid: { min: 90, max: 129, label: 'Groove/Heavy', emoji: '🤘' },
  fast: { min: 130, max: 169, label: 'Thrash/Power', emoji: '⚡' },
  extreme: { min: 170, max: 250, label: 'Death/Black', emoji: '💀' },
  blast: { min: 251, max: 400, label: 'Grindcore/Blast', emoji: '🔥' },
};

/**
 * Get tempo range for a given BPM
 * @param {number} bpm - Beats per minute
 * @returns {object} Tempo range info
 */
export function getTempoRange(bpm) {
  if (bpm < 90) return TEMPO_RANGES.slow;
  if (bpm < 130) return TEMPO_RANGES.mid;
  if (bpm < 170) return TEMPO_RANGES.fast;
  if (bpm < 251) return TEMPO_RANGES.extreme;
  return TEMPO_RANGES.blast;
}

/**
 * Main metal songs database
 * Organized by band for easy browsing
 */
export const metalSongs = [
  // === METALLICA ===
  { id: 1, song: "Enter Sandman", band: "Metallica", album: "Metallica (Black Album)", year: 1991, bpm: 123, genre: "heavy-metal", drummer: "lars-ulrich" },
  { id: 2, song: "Master of Puppets", band: "Metallica", album: "Master of Puppets", year: 1986, bpm: 212, genre: "thrash-metal", drummer: "lars-ulrich" },
  { id: 3, song: "One", band: "Metallica", album: "...And Justice for All", year: 1988, bpm: 108, genre: "thrash-metal", drummer: "lars-ulrich" },
  { id: 4, song: "Fade to Black", band: "Metallica", album: "Ride the Lightning", year: 1984, bpm: 116, genre: "heavy-metal", drummer: "lars-ulrich" },
  { id: 5, song: "Battery", band: "Metallica", album: "Master of Puppets", year: 1986, bpm: 196, genre: "thrash-metal", drummer: "lars-ulrich" },
  { id: 6, song: "Creeping Death", band: "Metallica", album: "Ride the Lightning", year: 1984, bpm: 200, genre: "thrash-metal", drummer: "lars-ulrich" },
  { id: 7, song: "Seek & Destroy", band: "Metallica", album: "Kill 'Em All", year: 1983, bpm: 136, genre: "thrash-metal", drummer: "lars-ulrich" },
  { id: 8, song: "For Whom the Bell Tolls", band: "Metallica", album: "Ride the Lightning", year: 1984, bpm: 120, genre: "heavy-metal", drummer: "lars-ulrich" },

  // === SLAYER ===
  { id: 9, song: "Raining Blood", band: "Slayer", album: "Reign in Blood", year: 1986, bpm: 225, genre: "thrash-metal", drummer: "dave-lombardo" },
  { id: 10, song: "Angel of Death", band: "Slayer", album: "Reign in Blood", year: 1986, bpm: 212, genre: "thrash-metal", drummer: "dave-lombardo" },
  { id: 11, song: "South of Heaven", band: "Slayer", album: "South of Heaven", year: 1988, bpm: 80, genre: "thrash-metal", drummer: "dave-lombardo" },
  { id: 12, song: "Seasons in the Abyss", band: "Slayer", album: "Seasons in the Abyss", year: 1990, bpm: 112, genre: "thrash-metal", drummer: "dave-lombardo" },
  { id: 13, song: "War Ensemble", band: "Slayer", album: "Seasons in the Abyss", year: 1990, bpm: 230, genre: "thrash-metal", drummer: "dave-lombardo" },

  // === SLIPKNOT ===
  { id: 14, song: "Duality", band: "Slipknot", album: "Vol. 3: (The Subliminal Verses)", year: 2004, bpm: 128, genre: "nu-metal", drummer: "joey-jordison" },
  { id: 15, song: "Psychosocial", band: "Slipknot", album: "All Hope Is Gone", year: 2008, bpm: 135, genre: "nu-metal", drummer: "joey-jordison" },
  { id: 16, song: "Wait and Bleed", band: "Slipknot", album: "Slipknot", year: 1999, bpm: 155, genre: "nu-metal", drummer: "joey-jordison" },
  { id: 17, song: "Before I Forget", band: "Slipknot", album: "Vol. 3: (The Subliminal Verses)", year: 2004, bpm: 140, genre: "nu-metal", drummer: "joey-jordison" },
  { id: 18, song: "People = Shit", band: "Slipknot", album: "Iowa", year: 2001, bpm: 165, genre: "nu-metal", drummer: "joey-jordison" },
  { id: 19, song: "The Devil in I", band: "Slipknot", album: "5: The Gray Chapter", year: 2014, bpm: 120, genre: "nu-metal", drummer: "jay-weinberg" },
  { id: 20, song: "Unsainted", band: "Slipknot", album: "We Are Not Your Kind", year: 2019, bpm: 145, genre: "nu-metal", drummer: "jay-weinberg" },

  // === PANTERA ===
  { id: 21, song: "Walk", band: "Pantera", album: "Vulgar Display of Power", year: 1992, bpm: 114, genre: "groove-metal", drummer: "vinnie-paul" },
  { id: 22, song: "Cowboys from Hell", band: "Pantera", album: "Cowboys from Hell", year: 1990, bpm: 118, genre: "groove-metal", drummer: "vinnie-paul" },
  { id: 23, song: "Domination", band: "Pantera", album: "Cowboys from Hell", year: 1990, bpm: 104, genre: "groove-metal", drummer: "vinnie-paul" },
  { id: 24, song: "Cemetery Gates", band: "Pantera", album: "Cowboys from Hell", year: 1990, bpm: 82, genre: "groove-metal", drummer: "vinnie-paul" },
  { id: 25, song: "5 Minutes Alone", band: "Pantera", album: "Far Beyond Driven", year: 1994, bpm: 92, genre: "groove-metal", drummer: "vinnie-paul" },
  { id: 26, song: "Mouth for War", band: "Pantera", album: "Vulgar Display of Power", year: 1992, bpm: 148, genre: "groove-metal", drummer: "vinnie-paul" },

  // === MEGADETH ===
  { id: 27, song: "Holy Wars...The Punishment Due", band: "Megadeth", album: "Rust in Peace", year: 1990, bpm: 180, genre: "thrash-metal", drummer: "nick-menza" },
  { id: 28, song: "Symphony of Destruction", band: "Megadeth", album: "Countdown to Extinction", year: 1992, bpm: 126, genre: "thrash-metal", drummer: "nick-menza" },
  { id: 29, song: "Hangar 18", band: "Megadeth", album: "Rust in Peace", year: 1990, bpm: 165, genre: "thrash-metal", drummer: "nick-menza" },
  { id: 30, song: "Peace Sells", band: "Megadeth", album: "Peace Sells...but Who's Buying?", year: 1986, bpm: 125, genre: "thrash-metal", drummer: "gar-samuelson" },
  { id: 31, song: "Tornado of Souls", band: "Megadeth", album: "Rust in Peace", year: 1990, bpm: 178, genre: "thrash-metal", drummer: "nick-menza" },

  // === TOOL ===
  { id: 32, song: "Schism", band: "Tool", album: "Lateralus", year: 2001, bpm: 96, genre: "progressive-metal", drummer: "danny-carey" },
  { id: 33, song: "Lateralus", band: "Tool", album: "Lateralus", year: 2001, bpm: 102, genre: "progressive-metal", drummer: "danny-carey" },
  { id: 34, song: "Parabola", band: "Tool", album: "Lateralus", year: 2001, bpm: 91, genre: "progressive-metal", drummer: "danny-carey" },
  { id: 35, song: "Forty Six & 2", band: "Tool", album: "Ænima", year: 1996, bpm: 92, genre: "progressive-metal", drummer: "danny-carey" },
  { id: 36, song: "The Pot", band: "Tool", album: "10,000 Days", year: 2006, bpm: 127, genre: "progressive-metal", drummer: "danny-carey" },
  { id: 37, song: "Fear Inoculum", band: "Tool", album: "Fear Inoculum", year: 2019, bpm: 92, genre: "progressive-metal", drummer: "danny-carey" },

  // === DREAM THEATER ===
  { id: 38, song: "Pull Me Under", band: "Dream Theater", album: "Images and Words", year: 1992, bpm: 134, genre: "progressive-metal", drummer: "mike-portnoy" },
  { id: 39, song: "Metropolis—Part I", band: "Dream Theater", album: "Images and Words", year: 1992, bpm: 120, genre: "progressive-metal", drummer: "mike-portnoy" },
  { id: 40, song: "The Dance of Eternity", band: "Dream Theater", album: "Metropolis Pt. 2: Scenes from a Memory", year: 1999, bpm: 170, genre: "progressive-metal", drummer: "mike-portnoy" },
  { id: 41, song: "Panic Attack", band: "Dream Theater", album: "Octavarium", year: 2005, bpm: 168, genre: "progressive-metal", drummer: "mike-portnoy" },

  // === GOJIRA ===
  { id: 42, song: "Flying Whales", band: "Gojira", album: "From Mars to Sirius", year: 2005, bpm: 85, genre: "progressive-death-metal", drummer: "mario-duplantier" },
  { id: 43, song: "Stranded", band: "Gojira", album: "Magma", year: 2016, bpm: 115, genre: "progressive-metal", drummer: "mario-duplantier" },
  { id: 44, song: "Silvera", band: "Gojira", album: "Magma", year: 2016, bpm: 130, genre: "progressive-metal", drummer: "mario-duplantier" },
  { id: 45, song: "L'Enfant Sauvage", band: "Gojira", album: "L'Enfant Sauvage", year: 2012, bpm: 150, genre: "progressive-death-metal", drummer: "mario-duplantier" },
  { id: 46, song: "Backbone", band: "Gojira", album: "From Mars to Sirius", year: 2005, bpm: 138, genre: "progressive-death-metal", drummer: "mario-duplantier" },

  // === MESHUGGAH ===
  { id: 47, song: "Bleed", band: "Meshuggah", album: "obZen", year: 2008, bpm: 100, genre: "djent", drummer: "tomas-haake" },
  { id: 48, song: "Rational Gaze", band: "Meshuggah", album: "Nothing", year: 2002, bpm: 78, genre: "djent", drummer: "tomas-haake" },
  { id: 49, song: "Demiurge", band: "Meshuggah", album: "Koloss", year: 2012, bpm: 95, genre: "djent", drummer: "tomas-haake" },
  { id: 50, song: "Future Breed Machine", band: "Meshuggah", album: "Destroy Erase Improve", year: 1995, bpm: 115, genre: "djent", drummer: "tomas-haake" },
  { id: 51, song: "Clockworks", band: "Meshuggah", album: "The Violent Sleep of Reason", year: 2016, bpm: 92, genre: "djent", drummer: "tomas-haake" },

  // === LAMB OF GOD ===
  { id: 52, song: "Laid to Rest", band: "Lamb of God", album: "Ashes of the Wake", year: 2004, bpm: 130, genre: "groove-metal", drummer: "chris-adler" },
  { id: 53, song: "Redneck", band: "Lamb of God", album: "Sacrament", year: 2006, bpm: 115, genre: "groove-metal", drummer: "chris-adler" },
  { id: 54, song: "Walk with Me in Hell", band: "Lamb of God", album: "Sacrament", year: 2006, bpm: 105, genre: "groove-metal", drummer: "chris-adler" },
  { id: 55, song: "Hourglass", band: "Lamb of God", album: "Ashes of the Wake", year: 2004, bpm: 120, genre: "groove-metal", drummer: "chris-adler" },
  { id: 56, song: "Omerta", band: "Lamb of God", album: "Ashes of the Wake", year: 2004, bpm: 145, genre: "groove-metal", drummer: "chris-adler" },

  // === MASTODON ===
  { id: 57, song: "Blood and Thunder", band: "Mastodon", album: "Leviathan", year: 2004, bpm: 125, genre: "progressive-sludge-metal", drummer: "brann-dailor" },
  { id: 58, song: "Oblivion", band: "Mastodon", album: "Crack the Skye", year: 2009, bpm: 92, genre: "progressive-metal", drummer: "brann-dailor" },
  { id: 59, song: "The Motherload", band: "Mastodon", album: "Once More 'Round the Sun", year: 2014, bpm: 108, genre: "progressive-metal", drummer: "brann-dailor" },
  { id: 60, song: "Colony of Birchmen", band: "Mastodon", album: "Blood Mountain", year: 2006, bpm: 110, genre: "progressive-sludge-metal", drummer: "brann-dailor" },

  // === BLACK SABBATH ===
  { id: 61, song: "Paranoid", band: "Black Sabbath", album: "Paranoid", year: 1970, bpm: 164, genre: "heavy-metal", drummer: "bill-ward" },
  { id: 62, song: "Iron Man", band: "Black Sabbath", album: "Paranoid", year: 1970, bpm: 76, genre: "heavy-metal", drummer: "bill-ward" },
  { id: 63, song: "War Pigs", band: "Black Sabbath", album: "Paranoid", year: 1970, bpm: 92, genre: "heavy-metal", drummer: "bill-ward" },
  { id: 64, song: "Black Sabbath", band: "Black Sabbath", album: "Black Sabbath", year: 1970, bpm: 62, genre: "doom-metal", drummer: "bill-ward" },
  { id: 65, song: "N.I.B.", band: "Black Sabbath", album: "Black Sabbath", year: 1970, bpm: 80, genre: "heavy-metal", drummer: "bill-ward" },

  // === IRON MAIDEN ===
  { id: 66, song: "The Trooper", band: "Iron Maiden", album: "Piece of Mind", year: 1983, bpm: 160, genre: "heavy-metal", drummer: "nicko-mcbrain" },
  { id: 67, song: "Run to the Hills", band: "Iron Maiden", album: "The Number of the Beast", year: 1982, bpm: 168, genre: "heavy-metal", drummer: "clive-burr" },
  { id: 68, song: "Aces High", band: "Iron Maiden", album: "Powerslave", year: 1984, bpm: 180, genre: "heavy-metal", drummer: "nicko-mcbrain" },
  { id: 69, song: "Fear of the Dark", band: "Iron Maiden", album: "Fear of the Dark", year: 1992, bpm: 104, genre: "heavy-metal", drummer: "nicko-mcbrain" },
  { id: 70, song: "Hallowed Be Thy Name", band: "Iron Maiden", album: "The Number of the Beast", year: 1982, bpm: 108, genre: "heavy-metal", drummer: "clive-burr" },

  // === JUDAS PRIEST ===
  { id: 71, song: "Painkiller", band: "Judas Priest", album: "Painkiller", year: 1990, bpm: 171, genre: "heavy-metal", drummer: "scott-travis" },
  { id: 72, song: "Breaking the Law", band: "Judas Priest", album: "British Steel", year: 1980, bpm: 128, genre: "heavy-metal", drummer: "dave-holland" },
  { id: 73, song: "Electric Eye", band: "Judas Priest", album: "Screaming for Vengeance", year: 1982, bpm: 130, genre: "heavy-metal", drummer: "dave-holland" },
  { id: 74, song: "You've Got Another Thing Comin'", band: "Judas Priest", album: "Screaming for Vengeance", year: 1982, bpm: 130, genre: "heavy-metal", drummer: "dave-holland" },

  // === DEATH ===
  { id: 75, song: "The Philosopher", band: "Death", album: "Individual Thought Patterns", year: 1993, bpm: 140, genre: "death-metal", drummer: "gene-hoglan" },
  { id: 76, song: "Crystal Mountain", band: "Death", album: "Symbolic", year: 1995, bpm: 148, genre: "death-metal", drummer: "gene-hoglan" },
  { id: 77, song: "Spirit Crusher", band: "Death", album: "The Sound of Perseverance", year: 1998, bpm: 156, genre: "death-metal", drummer: "richard-christy" },
  { id: 78, song: "Symbolic", band: "Death", album: "Symbolic", year: 1995, bpm: 160, genre: "death-metal", drummer: "gene-hoglan" },

  // === CANNIBAL CORPSE ===
  { id: 79, song: "Hammer Smashed Face", band: "Cannibal Corpse", album: "Tomb of the Mutilated", year: 1992, bpm: 145, genre: "death-metal", drummer: "paul-mazurkiewicz" },
  { id: 80, song: "I Cum Blood", band: "Cannibal Corpse", album: "Tomb of the Mutilated", year: 1992, bpm: 110, genre: "death-metal", drummer: "paul-mazurkiewicz" },
  { id: 81, song: "Stripped, Raped and Strangled", band: "Cannibal Corpse", album: "The Bleeding", year: 1994, bpm: 140, genre: "death-metal", drummer: "paul-mazurkiewicz" },

  // === NILE ===
  { id: 82, song: "Sacrifice Unto Sebek", band: "Nile", album: "In Their Darkened Shrines", year: 2002, bpm: 220, genre: "death-metal", drummer: "tony-laureano" },
  { id: 83, song: "Lashed to the Slave Stick", band: "Nile", album: "Annihilation of the Wicked", year: 2005, bpm: 240, genre: "death-metal", drummer: "george-kollias" },
  { id: 84, song: "Kafir!", band: "Nile", album: "Those Whom the Gods Detest", year: 2009, bpm: 245, genre: "death-metal", drummer: "george-kollias" },

  // === BEHEMOTH ===
  { id: 85, song: "Blow Your Trumpets Gabriel", band: "Behemoth", album: "The Satanist", year: 2014, bpm: 115, genre: "blackened-death-metal", drummer: "inferno" },
  { id: 86, song: "Conquer All", band: "Behemoth", album: "Demigod", year: 2004, bpm: 160, genre: "blackened-death-metal", drummer: "inferno" },
  { id: 87, song: "Ora Pro Nobis Lucifer", band: "Behemoth", album: "The Satanist", year: 2014, bpm: 175, genre: "blackened-death-metal", drummer: "inferno" },

  // === DIMMU BORGIR ===
  { id: 88, song: "Progenies of the Great Apocalypse", band: "Dimmu Borgir", album: "Death Cult Armageddon", year: 2003, bpm: 155, genre: "symphonic-black-metal", drummer: "nick-barker" },
  { id: 89, song: "Mourning Palace", band: "Dimmu Borgir", album: "Enthrone Darkness Triumphant", year: 1997, bpm: 165, genre: "symphonic-black-metal", drummer: "tjodalv" },

  // === OPETH ===
  { id: 90, song: "Ghost of Perdition", band: "Opeth", album: "Ghost Reveries", year: 2005, bpm: 100, genre: "progressive-death-metal", drummer: "martin-lopez" },
  { id: 91, song: "Blackwater Park", band: "Opeth", album: "Blackwater Park", year: 2001, bpm: 85, genre: "progressive-death-metal", drummer: "martin-lopez" },
  { id: 92, song: "The Drapery Falls", band: "Opeth", album: "Blackwater Park", year: 2001, bpm: 75, genre: "progressive-death-metal", drummer: "martin-lopez" },

  // === SEPULTURA ===
  { id: 93, song: "Roots Bloody Roots", band: "Sepultura", album: "Roots", year: 1996, bpm: 95, genre: "groove-metal", drummer: "igor-cavalera" },
  { id: 94, song: "Refuse/Resist", band: "Sepultura", album: "Chaos A.D.", year: 1993, bpm: 120, genre: "groove-metal", drummer: "igor-cavalera" },
  { id: 95, song: "Territory", band: "Sepultura", album: "Chaos A.D.", year: 1993, bpm: 145, genre: "groove-metal", drummer: "igor-cavalera" },
  { id: 96, song: "Arise", band: "Sepultura", album: "Arise", year: 1991, bpm: 185, genre: "thrash-metal", drummer: "igor-cavalera" },

  // === SYSTEM OF A DOWN ===
  { id: 97, song: "Chop Suey!", band: "System of a Down", album: "Toxicity", year: 2001, bpm: 127, genre: "nu-metal", drummer: "john-dolmayan" },
  { id: 98, song: "Toxicity", band: "System of a Down", album: "Toxicity", year: 2001, bpm: 105, genre: "nu-metal", drummer: "john-dolmayan" },
  { id: 99, song: "B.Y.O.B.", band: "System of a Down", album: "Mesmerize", year: 2005, bpm: 155, genre: "nu-metal", drummer: "john-dolmayan" },
  { id: 100, song: "Aerials", band: "System of a Down", album: "Toxicity", year: 2001, bpm: 116, genre: "nu-metal", drummer: "john-dolmayan" },

  // === KORN ===
  { id: 101, song: "Freak on a Leash", band: "Korn", album: "Follow the Leader", year: 1998, bpm: 94, genre: "nu-metal", drummer: "david-silveria" },
  { id: 102, song: "Blind", band: "Korn", album: "Korn", year: 1994, bpm: 75, genre: "nu-metal", drummer: "david-silveria" },
  { id: 103, song: "Falling Away from Me", band: "Korn", album: "Issues", year: 1999, bpm: 100, genre: "nu-metal", drummer: "david-silveria" },
  { id: 104, song: "Here to Stay", band: "Korn", album: "Untouchables", year: 2002, bpm: 90, genre: "nu-metal", drummer: "david-silveria" },

  // === DEFTONES ===
  { id: 105, song: "My Own Summer (Shove It)", band: "Deftones", album: "Around the Fur", year: 1997, bpm: 98, genre: "alternative-metal", drummer: "abe-cunningham" },
  { id: 106, song: "Change (In the House of Flies)", band: "Deftones", album: "White Pony", year: 2000, bpm: 110, genre: "alternative-metal", drummer: "abe-cunningham" },
  { id: 107, song: "Digital Bath", band: "Deftones", album: "White Pony", year: 2000, bpm: 95, genre: "alternative-metal", drummer: "abe-cunningham" },

  // === AVENGED SEVENFOLD ===
  { id: 108, song: "Bat Country", band: "Avenged Sevenfold", album: "City of Evil", year: 2005, bpm: 145, genre: "heavy-metal", drummer: "the-rev" },
  { id: 109, song: "Nightmare", band: "Avenged Sevenfold", album: "Nightmare", year: 2010, bpm: 107, genre: "heavy-metal", drummer: "mike-portnoy" },
  { id: 110, song: "Afterlife", band: "Avenged Sevenfold", album: "Avenged Sevenfold", year: 2007, bpm: 115, genre: "heavy-metal", drummer: "the-rev" },
  { id: 111, song: "Beast and the Harlot", band: "Avenged Sevenfold", album: "City of Evil", year: 2005, bpm: 180, genre: "heavy-metal", drummer: "the-rev" },

  // === TRIVIUM ===
  { id: 112, song: "Pull Harder on the Strings of Your Martyr", band: "Trivium", album: "Ascendancy", year: 2005, bpm: 165, genre: "metalcore", drummer: "travis-smith" },
  { id: 113, song: "In Waves", band: "Trivium", album: "In Waves", year: 2011, bpm: 132, genre: "metalcore", drummer: "nick-augusto" },
  { id: 114, song: "Strife", band: "Trivium", album: "Vengeance Falls", year: 2013, bpm: 125, genre: "metalcore", drummer: "nick-augusto" },

  // === PERIPHERY ===
  { id: 115, song: "Icarus Lives!", band: "Periphery", album: "Periphery", year: 2010, bpm: 120, genre: "djent", drummer: "matt-halpern" },
  { id: 116, song: "Scarlet", band: "Periphery", album: "Periphery II: This Time It's Personal", year: 2012, bpm: 132, genre: "djent", drummer: "matt-halpern" },
  { id: 117, song: "Marigold", band: "Periphery", album: "Periphery III: Select Difficulty", year: 2016, bpm: 140, genre: "djent", drummer: "matt-halpern" },
  { id: 118, song: "The Bad Thing", band: "Periphery", album: "Juggernaut: Alpha", year: 2015, bpm: 135, genre: "djent", drummer: "matt-halpern" },

  // === ANIMALS AS LEADERS ===
  { id: 119, song: "CAFO", band: "Animals as Leaders", album: "Animals as Leaders", year: 2009, bpm: 155, genre: "progressive-metal", drummer: "matt-garstka" },
  { id: 120, song: "Physical Education", band: "Animals as Leaders", album: "The Joy of Motion", year: 2014, bpm: 148, genre: "progressive-metal", drummer: "matt-garstka" },

  // === TESTAMENT ===
  { id: 121, song: "Over the Wall", band: "Testament", album: "The Legacy", year: 1987, bpm: 195, genre: "thrash-metal", drummer: "louie-clemente" },
  { id: 122, song: "Practice What You Preach", band: "Testament", album: "Practice What You Preach", year: 1989, bpm: 120, genre: "thrash-metal", drummer: "louie-clemente" },

  // === ANTHRAX ===
  { id: 123, song: "Caught in a Mosh", band: "Anthrax", album: "Among the Living", year: 1987, bpm: 175, genre: "thrash-metal", drummer: "charlie-benante" },
  { id: 124, song: "Madhouse", band: "Anthrax", album: "Spreading the Disease", year: 1985, bpm: 158, genre: "thrash-metal", drummer: "charlie-benante" },
  { id: 125, song: "Indians", band: "Anthrax", album: "Among the Living", year: 1987, bpm: 145, genre: "thrash-metal", drummer: "charlie-benante" },

  // === OBITUARY ===
  { id: 126, song: "Slowly We Rot", band: "Obituary", album: "Slowly We Rot", year: 1989, bpm: 95, genre: "death-metal", drummer: "donald-tardy" },
  { id: 127, song: "Chopped in Half", band: "Obituary", album: "Cause of Death", year: 1990, bpm: 105, genre: "death-metal", drummer: "donald-tardy" },

  // === MORBID ANGEL ===
  { id: 128, song: "Immortal Rites", band: "Morbid Angel", album: "Altars of Madness", year: 1989, bpm: 200, genre: "death-metal", drummer: "pete-sandoval" },
  { id: 129, song: "Where the Slime Live", band: "Morbid Angel", album: "Covenant", year: 1993, bpm: 185, genre: "death-metal", drummer: "pete-sandoval" },

  // === MAYHEM ===
  { id: 130, song: "Freezing Moon", band: "Mayhem", album: "De Mysteriis Dom Sathanas", year: 1994, bpm: 150, genre: "black-metal", drummer: "hellhammer" },
  { id: 131, song: "Chainsaw Gutsfuck", band: "Mayhem", album: "Deathcrush", year: 1987, bpm: 200, genre: "black-metal", drummer: "manheim" },

  // === DARKTHRONE ===
  { id: 132, song: "Transilvanian Hunger", band: "Darkthrone", album: "Transilvanian Hunger", year: 1994, bpm: 190, genre: "black-metal", drummer: "fenriz" },
  { id: 133, song: "A Blaze in the Northern Sky", band: "Darkthrone", album: "A Blaze in the Northern Sky", year: 1992, bpm: 175, genre: "black-metal", drummer: "fenriz" },

  // === ELECTRIC WIZARD ===
  { id: 134, song: "Dopethrone", band: "Electric Wizard", album: "Dopethrone", year: 2000, bpm: 55, genre: "doom-metal", drummer: "mark-greening" },
  { id: 135, song: "Funeralopolis", band: "Electric Wizard", album: "Dopethrone", year: 2000, bpm: 65, genre: "doom-metal", drummer: "mark-greening" },

  // === SLEEP ===
  { id: 136, song: "Dragonaut", band: "Sleep", album: "Sleep's Holy Mountain", year: 1992, bpm: 60, genre: "doom-metal", drummer: "chris-hakius" },
  { id: 137, song: "The Druid", band: "Sleep", album: "Dopesmoker", year: 1996, bpm: 55, genre: "doom-metal", drummer: "chris-hakius" },

  // === MACHINE HEAD ===
  { id: 138, song: "Davidian", band: "Machine Head", album: "Burn My Eyes", year: 1994, bpm: 128, genre: "groove-metal", drummer: "chris-kontos" },
  { id: 139, song: "Aesthetics of Hate", band: "Machine Head", album: "The Blackening", year: 2007, bpm: 165, genre: "thrash-metal", drummer: "dave-mcclain" },
  { id: 140, song: "Halo", band: "Machine Head", album: "The Blackening", year: 2007, bpm: 125, genre: "groove-metal", drummer: "dave-mcclain" },

  // === ARCHITECTS ===
  { id: 141, song: "Doomsday", band: "Architects", album: "Holy Hell", year: 2018, bpm: 95, genre: "metalcore", drummer: "dan-searle" },
  { id: 142, song: "Gravedigger", band: "Architects", album: "All Our Gods Have Abandoned Us", year: 2016, bpm: 120, genre: "metalcore", drummer: "dan-searle" },

  // === KILLSWITCH ENGAGE ===
  { id: 143, song: "The End of Heartache", band: "Killswitch Engage", album: "The End of Heartache", year: 2004, bpm: 165, genre: "metalcore", drummer: "justin-foley" },
  { id: 144, song: "My Curse", band: "Killswitch Engage", album: "As Daylight Dies", year: 2006, bpm: 135, genre: "metalcore", drummer: "justin-foley" },

  // === AS I LAY DYING ===
  { id: 145, song: "My Own Grave", band: "As I Lay Dying", album: "Shaped by Fire", year: 2019, bpm: 155, genre: "metalcore", drummer: "josh-gilbert" },
  { id: 146, song: "Confined", band: "As I Lay Dying", album: "Shadows Are Security", year: 2005, bpm: 145, genre: "metalcore", drummer: "jordan-mancino" },

  // === PARKWAY DRIVE ===
  { id: 147, song: "Carrion", band: "Parkway Drive", album: "Deep Blue", year: 2010, bpm: 125, genre: "metalcore", drummer: "ben-gordon" },
  { id: 148, song: "Wild Eyes", band: "Parkway Drive", album: "Atlas", year: 2012, bpm: 130, genre: "metalcore", drummer: "ben-gordon" },

  // === WHITECHAPEL ===
  { id: 149, song: "This Is Exile", band: "Whitechapel", album: "This Is Exile", year: 2008, bpm: 110, genre: "deathcore", drummer: "kevin-lane" },
  { id: 150, song: "The Saw Is the Law", band: "Whitechapel", album: "A New Era of Corruption", year: 2010, bpm: 125, genre: "deathcore", drummer: "kevin-lane" },
];

/**
 * Get all unique bands from the database
 * @returns {string[]} Array of band names
 */
export function getAllBands() {
  const bands = [...new Set(metalSongs.map(s => s.band))];
  return bands.sort();
}

/**
 * Get all unique genres from the database
 * @returns {string[]} Array of genre names
 */
export function getAllGenres() {
  const genres = [...new Set(metalSongs.map(s => s.genre))];
  return genres.sort();
}

/**
 * Search songs by various criteria
 * @param {object} options - Search options
 * @returns {array} Matching songs
 */
export function searchSongs({ query = '', genre = '', band = '', minBpm = 0, maxBpm = 999, limit = 50 } = {}) {
  let results = metalSongs;

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(s =>
      s.song.toLowerCase().includes(q) ||
      s.band.toLowerCase().includes(q) ||
      s.album.toLowerCase().includes(q)
    );
  }

  if (genre) {
    results = results.filter(s => s.genre === genre);
  }

  if (band) {
    results = results.filter(s => s.band.toLowerCase() === band.toLowerCase());
  }

  results = results.filter(s => s.bpm >= minBpm && s.bpm <= maxBpm);

  return results.slice(0, limit);
}

/**
 * Find songs similar to a given BPM (within tolerance)
 * @param {number} targetBpm - Target BPM
 * @param {number} tolerance - BPM tolerance (default 5)
 * @param {number} limit - Max results
 * @returns {array} Matching songs sorted by closeness
 */
export function findSongsNearBpm(targetBpm, tolerance = 10, limit = 10) {
  const results = metalSongs
    .map(s => ({ ...s, diff: Math.abs(s.bpm - targetBpm) }))
    .filter(s => s.diff <= tolerance)
    .sort((a, b) => a.diff - b.diff)
    .slice(0, limit);
  
  return results;
}

/**
 * Get songs by tempo category
 * @param {string} category - slow | mid | fast | extreme | blast
 * @returns {array} Songs in that tempo range
 */
export function getSongsByTempoCategory(category) {
  const range = TEMPO_RANGES[category];
  if (!range) return [];
  return metalSongs.filter(s => s.bpm >= range.min && s.bpm <= range.max);
}

/**
 * Get statistics about the song database
 * @returns {object} Database stats
 */
export function getDatabaseStats() {
  const bpms = metalSongs.map(s => s.bpm);
  const bands = getAllBands();
  const genres = getAllGenres();

  return {
    totalSongs: metalSongs.length,
    totalBands: bands.length,
    totalGenres: genres.length,
    minBpm: Math.min(...bpms),
    maxBpm: Math.max(...bpms),
    avgBpm: Math.round(bpms.reduce((a, b) => a + b, 0) / bpms.length),
    tempoDistribution: {
      slow: getSongsByTempoCategory('slow').length,
      mid: getSongsByTempoCategory('mid').length,
      fast: getSongsByTempoCategory('fast').length,
      extreme: getSongsByTempoCategory('extreme').length,
      blast: getSongsByTempoCategory('blast').length,
    }
  };
}

export default metalSongs;
