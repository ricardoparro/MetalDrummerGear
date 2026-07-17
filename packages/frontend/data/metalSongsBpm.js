/**
 * Metal Songs BPM Database
 * A curated collection of famous metal songs with their BPMs
 * Issue #342: BPM Tap Calculator with Song Database
 * Issue #4759 (songs epic #4758, phase 1/4): every song below now carries a
 * stable `slug`, a `source` describing how its BPM was verified, and — where
 * a lineup change means a different drummer recorded the track — the
 * drummer who actually performed on that specific recording (binding rule 3
 * of the epic: recording-window attribution, not "current/best-known
 * drummer"). BPMs were verified against published tempo trackers (SongBPM,
 * GetSongBPM, Tunebat), Metal Archives / Wikipedia lineup and track-listing
 * data, drummer interviews (Modern Drummer, Drumeo, Sick Drummer), or — for
 * extremely well-documented classics — cross-checked against the tab/
 * drum-lesson tempo consensus for that recording. `bpmNote` flags songs with
 * a significant tempo change within the track (verse vs. double-time
 * section, etc.) or documents a correction made during this pass. This
 * dataset is a reference for the /bpm tap tool and future song/tempo pages —
 * it is NOT audio-metronome-measured for every entry; see each song's
 * `source` for its specific verification method.
 *
 * TEMPO_RANGES / getTempoRange / metalSongs / getAllBands / getAllGenres /
 * searchSongs / findSongsNearBpm / getSongsByTempoCategory / getDatabaseStats
 * are the module's public API — unchanged by this pass so existing
 * consumers (the /bpm tap tool's import surface, scripts/compute-studies.cjs)
 * keep working without modification.
 *
 * Issue #4760 (songs epic #4758, phase 2/4): added TEMPO_TIER_SLUGS plus
 * getSongBySlug / getAllSongSlugs / getTempoTiers / getTempoTierBySlug /
 * getFastestMetalSongs / getSongsByDrummerSlug / getDrummersWithSongCounts —
 * the read surface for the new /songs hub, tempo-tier, flagship, and
 * by-drummer list pages. Purely additive; nothing above changed.
 *
 * Issue #4761 (songs epic #4758, phase 3/4): added the content-richness gate
 * (getSongPageGate / getSongPageSlugs / getSongPageData) that decides which
 * songs earn a real /songs/<slug> page (binding rule 4 — the thin-page
 * lesson from the bands epic). Unlike getDrummersWithSongCounts above, the
 * gate DOES carry a roster dependency (packages/frontend/data/birthdays.js)
 * plus album-article and signature-lick lookups, because "drummer is on the
 * live roster" and "has technique content/a verified video" are exactly the
 * two richness signals the gate has to check — pushing that back out to
 * every caller would mean re-deriving the same gate three different ways in
 * App.js, api/meta/[...path].js, and api/sitemap.js. This keeps rule 1 (ONE
 * data module) intact: every consumer imports getSongPageSlugs() instead of
 * reimplementing the criteria.
 */

import { drummerBirthdays } from './birthdays.js';
import { ALBUM_ARTICLES } from './albumArticles/index.js';
import { SIGNATURE_LICKS } from './licks/index.js';

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
 * Organized by band for easy browsing. Every song has a stable `slug`
 * (collision-safe: band-prefixed only where a bare song-title slug would
 * collide with another entry) and a `source` describing its BPM
 * verification. See the module header for methodology.
 */
export const metalSongs = [
  { id: 1, slug: "enter-sandman", song: "Enter Sandman", band: "Metallica", album: "Metallica (Black Album)", year: 1991, bpm: 123, genre: "heavy-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 2, slug: "master-of-puppets", song: "Master of Puppets", band: "Metallica", album: "Master of Puppets", year: 1986, bpm: 212, genre: "thrash-metal", drummer: "lars-ulrich", source: "GetSongBPM/SongBPM half-time reading (105-110) doubled to match the universally cited 212 BPM drum-lesson/tab tempo", bpmNote: "main riff/verse 212; clean intro section has no fixed backbeat" },
  { id: 3, slug: "one", song: "One", band: "Metallica", album: "...And Justice for All", year: 1988, bpm: 108, genre: "thrash-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording", bpmNote: "intro/verse ~108; double-time 'machine gun' outro riff feels like ~216" },
  { id: 4, slug: "fade-to-black", song: "Fade to Black", band: "Metallica", album: "Ride the Lightning", year: 1984, bpm: 116, genre: "heavy-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording", bpmNote: "ballad intro ~90; uptempo outro solo section ~150" },
  { id: 5, slug: "battery", song: "Battery", band: "Metallica", album: "Master of Puppets", year: 1986, bpm: 196, genre: "thrash-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 6, slug: "creeping-death", song: "Creeping Death", band: "Metallica", album: "Ride the Lightning", year: 1984, bpm: 200, genre: "thrash-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 7, slug: "seek-destroy", song: "Seek & Destroy", band: "Metallica", album: "Kill 'Em All", year: 1983, bpm: 140, genre: "thrash-metal", drummer: "lars-ulrich", source: "GetSongBPM: 140 BPM (corrected from a prior 136 estimate)" },
  { id: 8, slug: "for-whom-the-bell-tolls", song: "For Whom the Bell Tolls", band: "Metallica", album: "Ride the Lightning", year: 1984, bpm: 120, genre: "heavy-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 9, slug: "raining-blood", song: "Raining Blood", band: "Slayer", album: "Reign in Blood", year: 1986, bpm: 216, genre: "thrash-metal", drummer: "dave-lombardo", source: "GetSongBPM: 216 BPM (corrected from a prior 225 estimate)" },
  { id: 10, slug: "angel-of-death", song: "Angel of Death", band: "Slayer", album: "Reign in Blood", year: 1986, bpm: 212, genre: "thrash-metal", drummer: "dave-lombardo", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 11, slug: "south-of-heaven", song: "South of Heaven", band: "Slayer", album: "South of Heaven", year: 1988, bpm: 80, genre: "thrash-metal", drummer: "dave-lombardo", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 12, slug: "seasons-in-the-abyss", song: "Seasons in the Abyss", band: "Slayer", album: "Seasons in the Abyss", year: 1990, bpm: 112, genre: "thrash-metal", drummer: "dave-lombardo", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 13, slug: "war-ensemble", song: "War Ensemble", band: "Slayer", album: "Seasons in the Abyss", year: 1990, bpm: 230, genre: "thrash-metal", drummer: "dave-lombardo", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 14, slug: "duality", song: "Duality", band: "Slipknot", album: "Vol. 3: (The Subliminal Verses)", year: 2004, bpm: 128, genre: "nu-metal", drummer: "joey-jordison", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 15, slug: "psychosocial", song: "Psychosocial", band: "Slipknot", album: "All Hope Is Gone", year: 2008, bpm: 135, genre: "nu-metal", drummer: "joey-jordison", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 16, slug: "wait-and-bleed", song: "Wait and Bleed", band: "Slipknot", album: "Slipknot", year: 1999, bpm: 155, genre: "nu-metal", drummer: "joey-jordison", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 17, slug: "before-i-forget", song: "Before I Forget", band: "Slipknot", album: "Vol. 3: (The Subliminal Verses)", year: 2004, bpm: 140, genre: "nu-metal", drummer: "joey-jordison", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 18, slug: "people-shit", song: "People = Shit", band: "Slipknot", album: "Iowa", year: 2001, bpm: 165, genre: "nu-metal", drummer: "joey-jordison", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 19, slug: "the-devil-in-i", song: "The Devil in I", band: "Slipknot", album: "5: The Gray Chapter", year: 2014, bpm: 120, genre: "nu-metal", drummer: "jay-weinberg", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 20, slug: "unsainted", song: "Unsainted", band: "Slipknot", album: "We Are Not Your Kind", year: 2019, bpm: 145, genre: "nu-metal", drummer: "jay-weinberg", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 21, slug: "walk", song: "Walk", band: "Pantera", album: "Vulgar Display of Power", year: 1992, bpm: 114, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 22, slug: "cowboys-from-hell", song: "Cowboys from Hell", band: "Pantera", album: "Cowboys from Hell", year: 1990, bpm: 118, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 23, slug: "domination", song: "Domination", band: "Pantera", album: "Cowboys from Hell", year: 1990, bpm: 104, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 24, slug: "cemetery-gates", song: "Cemetery Gates", band: "Pantera", album: "Cowboys from Hell", year: 1990, bpm: 82, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 25, slug: "5-minutes-alone", song: "5 Minutes Alone", band: "Pantera", album: "Far Beyond Driven", year: 1994, bpm: 92, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 26, slug: "mouth-for-war", song: "Mouth for War", band: "Pantera", album: "Vulgar Display of Power", year: 1992, bpm: 148, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording", bpmNote: "half-time intro groove ~74; verse riff doubles to ~148" },
  { id: 27, slug: "holy-wars-the-punishment-due", song: "Holy Wars...The Punishment Due", band: "Megadeth", album: "Rust in Peace", year: 1990, bpm: 180, genre: "thrash-metal", drummer: "nick-menza", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 28, slug: "symphony-of-destruction", song: "Symphony of Destruction", band: "Megadeth", album: "Countdown to Extinction", year: 1992, bpm: 126, genre: "thrash-metal", drummer: "nick-menza", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 29, slug: "hangar-18", song: "Hangar 18", band: "Megadeth", album: "Rust in Peace", year: 1990, bpm: 165, genre: "thrash-metal", drummer: "nick-menza", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 30, slug: "peace-sells", song: "Peace Sells", band: "Megadeth", album: "Peace Sells...but Who's Buying?", year: 1986, bpm: 125, genre: "thrash-metal", drummer: "gar-samuelson", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 31, slug: "tornado-of-souls", song: "Tornado of Souls", band: "Megadeth", album: "Rust in Peace", year: 1990, bpm: 178, genre: "thrash-metal", drummer: "nick-menza", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 32, slug: "schism", song: "Schism", band: "Tool", album: "Lateralus", year: 2001, bpm: 96, genre: "progressive-metal", drummer: "danny-carey", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 33, slug: "lateralus", song: "Lateralus", band: "Tool", album: "Lateralus", year: 2001, bpm: 102, genre: "progressive-metal", drummer: "danny-carey", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 34, slug: "parabola", song: "Parabola", band: "Tool", album: "Lateralus", year: 2001, bpm: 91, genre: "progressive-metal", drummer: "danny-carey", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 35, slug: "forty-six-2", song: "Forty Six & 2", band: "Tool", album: "Ænima", year: 1996, bpm: 92, genre: "progressive-metal", drummer: "danny-carey", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 36, slug: "the-pot", song: "The Pot", band: "Tool", album: "10,000 Days", year: 2006, bpm: 127, genre: "progressive-metal", drummer: "danny-carey", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 37, slug: "fear-inoculum", song: "Fear Inoculum", band: "Tool", album: "Fear Inoculum", year: 2019, bpm: 92, genre: "progressive-metal", drummer: "danny-carey", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 38, slug: "pull-me-under", song: "Pull Me Under", band: "Dream Theater", album: "Images and Words", year: 1992, bpm: 134, genre: "progressive-metal", drummer: "mike-portnoy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 39, slug: "metropolis-part-i", song: "Metropolis—Part I", band: "Dream Theater", album: "Images and Words", year: 1992, bpm: 120, genre: "progressive-metal", drummer: "mike-portnoy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 40, slug: "the-dance-of-eternity", song: "The Dance of Eternity", band: "Dream Theater", album: "Metropolis Pt. 2: Scenes from a Memory", year: 1999, bpm: 170, genre: "progressive-metal", drummer: "mike-portnoy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 41, slug: "panic-attack", song: "Panic Attack", band: "Dream Theater", album: "Octavarium", year: 2005, bpm: 168, genre: "progressive-metal", drummer: "mike-portnoy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 42, slug: "flying-whales", song: "Flying Whales", band: "Gojira", album: "From Mars to Sirius", year: 2005, bpm: 85, genre: "progressive-death-metal", drummer: "mario-duplantier", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 43, slug: "stranded", song: "Stranded", band: "Gojira", album: "Magma", year: 2016, bpm: 115, genre: "progressive-metal", drummer: "mario-duplantier", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 44, slug: "silvera", song: "Silvera", band: "Gojira", album: "Magma", year: 2016, bpm: 130, genre: "progressive-metal", drummer: "mario-duplantier", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 45, slug: "l-enfant-sauvage", song: "L'Enfant Sauvage", band: "Gojira", album: "L'Enfant Sauvage", year: 2012, bpm: 150, genre: "progressive-death-metal", drummer: "mario-duplantier", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 46, slug: "backbone", song: "Backbone", band: "Gojira", album: "From Mars to Sirius", year: 2005, bpm: 138, genre: "progressive-death-metal", drummer: "mario-duplantier", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 47, slug: "bleed", song: "Bleed", band: "Meshuggah", album: "obZen", year: 2008, bpm: 100, genre: "djent", drummer: "tomas-haake", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording", bpmNote: "12/8-over-4/4 polymeter at a 100 BPM pulse; often perceived as double-time (~200) due to the shifting accent pattern" },
  { id: 48, slug: "rational-gaze", song: "Rational Gaze", band: "Meshuggah", album: "Nothing", year: 2002, bpm: 78, genre: "djent", drummer: "tomas-haake", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 49, slug: "demiurge", song: "Demiurge", band: "Meshuggah", album: "Koloss", year: 2012, bpm: 95, genre: "djent", drummer: "tomas-haake", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 50, slug: "future-breed-machine", song: "Future Breed Machine", band: "Meshuggah", album: "Destroy Erase Improve", year: 1995, bpm: 115, genre: "djent", drummer: "tomas-haake", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 51, slug: "clockworks", song: "Clockworks", band: "Meshuggah", album: "The Violent Sleep of Reason", year: 2016, bpm: 92, genre: "djent", drummer: "tomas-haake", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 52, slug: "laid-to-rest", song: "Laid to Rest", band: "Lamb of God", album: "Ashes of the Wake", year: 2004, bpm: 130, genre: "groove-metal", drummer: "chris-adler", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 53, slug: "redneck", song: "Redneck", band: "Lamb of God", album: "Sacrament", year: 2006, bpm: 115, genre: "groove-metal", drummer: "chris-adler", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 54, slug: "walk-with-me-in-hell", song: "Walk with Me in Hell", band: "Lamb of God", album: "Sacrament", year: 2006, bpm: 105, genre: "groove-metal", drummer: "chris-adler", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 55, slug: "hourglass", song: "Hourglass", band: "Lamb of God", album: "Ashes of the Wake", year: 2004, bpm: 120, genre: "groove-metal", drummer: "chris-adler", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 56, slug: "omerta", song: "Omerta", band: "Lamb of God", album: "Ashes of the Wake", year: 2004, bpm: 145, genre: "groove-metal", drummer: "chris-adler", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 57, slug: "blood-and-thunder", song: "Blood and Thunder", band: "Mastodon", album: "Leviathan", year: 2004, bpm: 125, genre: "progressive-sludge-metal", drummer: "brann-dailor", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 58, slug: "oblivion", song: "Oblivion", band: "Mastodon", album: "Crack the Skye", year: 2009, bpm: 92, genre: "progressive-metal", drummer: "brann-dailor", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 59, slug: "the-motherload", song: "The Motherload", band: "Mastodon", album: "Once More 'Round the Sun", year: 2014, bpm: 108, genre: "progressive-metal", drummer: "brann-dailor", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 60, slug: "colony-of-birchmen", song: "Colony of Birchmen", band: "Mastodon", album: "Blood Mountain", year: 2006, bpm: 110, genre: "progressive-sludge-metal", drummer: "brann-dailor", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 61, slug: "paranoid", song: "Paranoid", band: "Black Sabbath", album: "Paranoid", year: 1970, bpm: 164, genre: "heavy-metal", drummer: "bill-ward", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 62, slug: "iron-man", song: "Iron Man", band: "Black Sabbath", album: "Paranoid", year: 1970, bpm: 76, genre: "heavy-metal", drummer: "bill-ward", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 63, slug: "war-pigs", song: "War Pigs", band: "Black Sabbath", album: "Paranoid", year: 1970, bpm: 92, genre: "heavy-metal", drummer: "bill-ward", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording", bpmNote: "slow intro riff ~65; main verse groove ~92" },
  { id: 64, slug: "black-sabbath", song: "Black Sabbath", band: "Black Sabbath", album: "Black Sabbath", year: 1970, bpm: 62, genre: "doom-metal", drummer: "bill-ward", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 65, slug: "n-i-b", song: "N.I.B.", band: "Black Sabbath", album: "Black Sabbath", year: 1970, bpm: 80, genre: "heavy-metal", drummer: "bill-ward", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 66, slug: "the-trooper", song: "The Trooper", band: "Iron Maiden", album: "Piece of Mind", year: 1983, bpm: 160, genre: "heavy-metal", drummer: "nicko-mcbrain", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 67, slug: "run-to-the-hills", song: "Run to the Hills", band: "Iron Maiden", album: "The Number of the Beast", year: 1982, bpm: 168, genre: "heavy-metal", drummer: "clive-burr", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 68, slug: "aces-high", song: "Aces High", band: "Iron Maiden", album: "Powerslave", year: 1984, bpm: 180, genre: "heavy-metal", drummer: "nicko-mcbrain", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 69, slug: "fear-of-the-dark", song: "Fear of the Dark", band: "Iron Maiden", album: "Fear of the Dark", year: 1992, bpm: 104, genre: "heavy-metal", drummer: "nicko-mcbrain", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 70, slug: "hallowed-be-thy-name", song: "Hallowed Be Thy Name", band: "Iron Maiden", album: "The Number of the Beast", year: 1982, bpm: 108, genre: "heavy-metal", drummer: "clive-burr", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 71, slug: "painkiller", song: "Painkiller", band: "Judas Priest", album: "Painkiller", year: 1990, bpm: 210, genre: "heavy-metal", drummer: "scott-travis", source: "Tunebat/GetSongBPM half-time reading (103) doubled (corrected from a prior 171 estimate that understated the track's documented reputation as one of Priest's fastest recordings)" },
  { id: 72, slug: "breaking-the-law", song: "Breaking the Law", band: "Judas Priest", album: "British Steel", year: 1980, bpm: 128, genre: "heavy-metal", drummer: "dave-holland", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 73, slug: "electric-eye", song: "Electric Eye", band: "Judas Priest", album: "Screaming for Vengeance", year: 1982, bpm: 130, genre: "heavy-metal", drummer: "dave-holland", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 74, slug: "you-ve-got-another-thing-comin", song: "You've Got Another Thing Comin'", band: "Judas Priest", album: "Screaming for Vengeance", year: 1982, bpm: 130, genre: "heavy-metal", drummer: "dave-holland", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 75, slug: "the-philosopher", song: "The Philosopher", band: "Death", album: "Individual Thought Patterns", year: 1993, bpm: 140, genre: "death-metal", drummer: "gene-hoglan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 76, slug: "crystal-mountain", song: "Crystal Mountain", band: "Death", album: "Symbolic", year: 1995, bpm: 148, genre: "death-metal", drummer: "gene-hoglan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 77, slug: "spirit-crusher", song: "Spirit Crusher", band: "Death", album: "The Sound of Perseverance", year: 1998, bpm: 156, genre: "death-metal", drummer: "richard-christy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 78, slug: "symbolic", song: "Symbolic", band: "Death", album: "Symbolic", year: 1995, bpm: 160, genre: "death-metal", drummer: "gene-hoglan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 79, slug: "hammer-smashed-face", song: "Hammer Smashed Face", band: "Cannibal Corpse", album: "Tomb of the Mutilated", year: 1992, bpm: 145, genre: "death-metal", drummer: "paul-mazurkiewicz", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording", bpmNote: "verse/blast sections ~145; breakdown drops to half-time" },
  { id: 80, slug: "i-cum-blood", song: "I Cum Blood", band: "Cannibal Corpse", album: "Tomb of the Mutilated", year: 1992, bpm: 110, genre: "death-metal", drummer: "paul-mazurkiewicz", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 81, slug: "stripped-raped-and-strangled", song: "Stripped, Raped and Strangled", band: "Cannibal Corpse", album: "The Bleeding", year: 1994, bpm: 140, genre: "death-metal", drummer: "paul-mazurkiewicz", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 82, slug: "sacrifice-unto-sebek", song: "Sacrifice Unto Sebek", band: "Nile", album: "Annihilation of the Wicked", year: 2005, bpm: 265, genre: "death-metal", drummer: "george-kollias", source: "Metal-Archives / Wikipedia track listing correction: this song is on Annihilation of the Wicked (2005, Kollias's debut with Nile), not In Their Darkened Shrines (2002) as previously listed here; Kollias's blast/double-bass foot speed is documented at ~265 BPM (16th notes) on this track", bpmNote: "corrected from a prior entry that misattributed this song to the 2002 In Their Darkened Shrines album and drummer Tony Laureano, who did not record it" },
  { id: 83, slug: "lashed-to-the-slave-stick", song: "Lashed to the Slave Stick", band: "Nile", album: "Annihilation of the Wicked", year: 2005, bpm: 240, genre: "death-metal", drummer: "george-kollias", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 84, slug: "kafir", song: "Kafir!", band: "Nile", album: "Those Whom the Gods Detest", year: 2009, bpm: 245, genre: "death-metal", drummer: "george-kollias", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 85, slug: "blow-your-trumpets-gabriel", song: "Blow Your Trumpets Gabriel", band: "Behemoth", album: "The Satanist", year: 2014, bpm: 115, genre: "blackened-death-metal", drummer: "inferno", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 86, slug: "conquer-all", song: "Conquer All", band: "Behemoth", album: "Demigod", year: 2004, bpm: 160, genre: "blackened-death-metal", drummer: "inferno", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 87, slug: "ora-pro-nobis-lucifer", song: "Ora Pro Nobis Lucifer", band: "Behemoth", album: "The Satanist", year: 2014, bpm: 175, genre: "blackened-death-metal", drummer: "inferno", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 88, slug: "progenies-of-the-great-apocalypse", song: "Progenies of the Great Apocalypse", band: "Dimmu Borgir", album: "Death Cult Armageddon", year: 2003, bpm: 155, genre: "symphonic-black-metal", drummer: "nick-barker", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 89, slug: "mourning-palace", song: "Mourning Palace", band: "Dimmu Borgir", album: "Enthrone Darkness Triumphant", year: 1997, bpm: 165, genre: "symphonic-black-metal", drummer: "tjodalv", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 90, slug: "ghost-of-perdition", song: "Ghost of Perdition", band: "Opeth", album: "Ghost Reveries", year: 2005, bpm: 100, genre: "progressive-death-metal", drummer: "martin-lopez", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 91, slug: "blackwater-park", song: "Blackwater Park", band: "Opeth", album: "Blackwater Park", year: 2001, bpm: 85, genre: "progressive-death-metal", drummer: "martin-lopez", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 92, slug: "the-drapery-falls", song: "The Drapery Falls", band: "Opeth", album: "Blackwater Park", year: 2001, bpm: 75, genre: "progressive-death-metal", drummer: "martin-lopez", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 93, slug: "roots-bloody-roots", song: "Roots Bloody Roots", band: "Sepultura", album: "Roots", year: 1996, bpm: 95, genre: "groove-metal", drummer: "igor-cavalera", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 94, slug: "refuse-resist", song: "Refuse/Resist", band: "Sepultura", album: "Chaos A.D.", year: 1993, bpm: 120, genre: "groove-metal", drummer: "igor-cavalera", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 95, slug: "territory", song: "Territory", band: "Sepultura", album: "Chaos A.D.", year: 1993, bpm: 145, genre: "groove-metal", drummer: "igor-cavalera", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 96, slug: "arise", song: "Arise", band: "Sepultura", album: "Arise", year: 1991, bpm: 185, genre: "thrash-metal", drummer: "igor-cavalera", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 97, slug: "chop-suey", song: "Chop Suey!", band: "System of a Down", album: "Toxicity", year: 2001, bpm: 127, genre: "nu-metal", drummer: "john-dolmayan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 98, slug: "toxicity", song: "Toxicity", band: "System of a Down", album: "Toxicity", year: 2001, bpm: 105, genre: "nu-metal", drummer: "john-dolmayan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 99, slug: "b-y-o-b", song: "B.Y.O.B.", band: "System of a Down", album: "Mesmerize", year: 2005, bpm: 155, genre: "nu-metal", drummer: "john-dolmayan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 100, slug: "aerials", song: "Aerials", band: "System of a Down", album: "Toxicity", year: 2001, bpm: 116, genre: "nu-metal", drummer: "john-dolmayan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 101, slug: "freak-on-a-leash", song: "Freak on a Leash", band: "Korn", album: "Follow the Leader", year: 1998, bpm: 94, genre: "nu-metal", drummer: "david-silveria", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 102, slug: "blind", song: "Blind", band: "Korn", album: "Korn", year: 1994, bpm: 75, genre: "nu-metal", drummer: "david-silveria", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 103, slug: "falling-away-from-me", song: "Falling Away from Me", band: "Korn", album: "Issues", year: 1999, bpm: 100, genre: "nu-metal", drummer: "david-silveria", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 104, slug: "here-to-stay", song: "Here to Stay", band: "Korn", album: "Untouchables", year: 2002, bpm: 90, genre: "nu-metal", drummer: "david-silveria", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 105, slug: "my-own-summer-shove-it", song: "My Own Summer (Shove It)", band: "Deftones", album: "Around the Fur", year: 1997, bpm: 98, genre: "alternative-metal", drummer: "abe-cunningham", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 106, slug: "change-in-the-house-of-flies", song: "Change (In the House of Flies)", band: "Deftones", album: "White Pony", year: 2000, bpm: 110, genre: "alternative-metal", drummer: "abe-cunningham", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 107, slug: "digital-bath", song: "Digital Bath", band: "Deftones", album: "White Pony", year: 2000, bpm: 95, genre: "alternative-metal", drummer: "abe-cunningham", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 108, slug: "bat-country", song: "Bat Country", band: "Avenged Sevenfold", album: "City of Evil", year: 2005, bpm: 145, genre: "heavy-metal", drummer: "the-rev", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 109, slug: "nightmare", song: "Nightmare", band: "Avenged Sevenfold", album: "Nightmare", year: 2010, bpm: 107, genre: "heavy-metal", drummer: "mike-portnoy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 110, slug: "afterlife", song: "Afterlife", band: "Avenged Sevenfold", album: "Avenged Sevenfold", year: 2007, bpm: 115, genre: "heavy-metal", drummer: "the-rev", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 111, slug: "beast-and-the-harlot", song: "Beast and the Harlot", band: "Avenged Sevenfold", album: "City of Evil", year: 2005, bpm: 180, genre: "heavy-metal", drummer: "the-rev", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 112, slug: "pull-harder-on-the-strings-of-your-martyr", song: "Pull Harder on the Strings of Your Martyr", band: "Trivium", album: "Ascendancy", year: 2005, bpm: 165, genre: "metalcore", drummer: "travis-smith", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 113, slug: "in-waves", song: "In Waves", band: "Trivium", album: "In Waves", year: 2011, bpm: 132, genre: "metalcore", drummer: "nick-augusto", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 114, slug: "strife", song: "Strife", band: "Trivium", album: "Vengeance Falls", year: 2013, bpm: 125, genre: "metalcore", drummer: "nick-augusto", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 115, slug: "icarus-lives", song: "Icarus Lives!", band: "Periphery", album: "Periphery", year: 2010, bpm: 120, genre: "djent", drummer: "matt-halpern", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 116, slug: "scarlet", song: "Scarlet", band: "Periphery", album: "Periphery II: This Time It's Personal", year: 2012, bpm: 132, genre: "djent", drummer: "matt-halpern", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 117, slug: "marigold", song: "Marigold", band: "Periphery", album: "Periphery III: Select Difficulty", year: 2016, bpm: 140, genre: "djent", drummer: "matt-halpern", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 118, slug: "the-bad-thing", song: "The Bad Thing", band: "Periphery", album: "Juggernaut: Alpha", year: 2015, bpm: 135, genre: "djent", drummer: "matt-halpern", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 119, slug: "cafo", song: "CAFO", band: "Animals as Leaders", album: "Animals as Leaders", year: 2009, bpm: 155, genre: "progressive-metal", drummer: "navene-koperweis", source: "Wikipedia — Animals as Leaders (2009) drum credits: Navene Koperweis performed/programmed drums on the self-titled debut; Matt Garstka did not join the band until The Joy of Motion (2014)", bpmNote: "corrected from a prior entry that credited Matt Garstka, who joined five years after this album was recorded" },
  { id: 120, slug: "physical-education", song: "Physical Education", band: "Animals as Leaders", album: "The Joy of Motion", year: 2014, bpm: 148, genre: "progressive-metal", drummer: "matt-garstka", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 121, slug: "over-the-wall", song: "Over the Wall", band: "Testament", album: "The Legacy", year: 1987, bpm: 195, genre: "thrash-metal", drummer: "louie-clemente", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 122, slug: "practice-what-you-preach", song: "Practice What You Preach", band: "Testament", album: "Practice What You Preach", year: 1989, bpm: 120, genre: "thrash-metal", drummer: "louie-clemente", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 123, slug: "caught-in-a-mosh", song: "Caught in a Mosh", band: "Anthrax", album: "Among the Living", year: 1987, bpm: 175, genre: "thrash-metal", drummer: "charlie-benante", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 124, slug: "madhouse", song: "Madhouse", band: "Anthrax", album: "Spreading the Disease", year: 1985, bpm: 158, genre: "thrash-metal", drummer: "charlie-benante", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 125, slug: "indians", song: "Indians", band: "Anthrax", album: "Among the Living", year: 1987, bpm: 145, genre: "thrash-metal", drummer: "charlie-benante", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 126, slug: "slowly-we-rot", song: "Slowly We Rot", band: "Obituary", album: "Slowly We Rot", year: 1989, bpm: 95, genre: "death-metal", drummer: "donald-tardy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 127, slug: "chopped-in-half", song: "Chopped in Half", band: "Obituary", album: "Cause of Death", year: 1990, bpm: 105, genre: "death-metal", drummer: "donald-tardy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 128, slug: "immortal-rites", song: "Immortal Rites", band: "Morbid Angel", album: "Altars of Madness", year: 1989, bpm: 200, genre: "death-metal", drummer: "pete-sandoval", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 129, slug: "where-the-slime-live", song: "Where the Slime Live", band: "Morbid Angel", album: "Covenant", year: 1993, bpm: 185, genre: "death-metal", drummer: "pete-sandoval", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 130, slug: "freezing-moon", song: "Freezing Moon", band: "Mayhem", album: "De Mysteriis Dom Sathanas", year: 1994, bpm: 150, genre: "black-metal", drummer: "hellhammer", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 131, slug: "chainsaw-gutsfuck", song: "Chainsaw Gutsfuck", band: "Mayhem", album: "Deathcrush", year: 1987, bpm: 200, genre: "black-metal", drummer: "manheim", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 132, slug: "transilvanian-hunger", song: "Transilvanian Hunger", band: "Darkthrone", album: "Transilvanian Hunger", year: 1994, bpm: 190, genre: "black-metal", drummer: "fenriz", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 133, slug: "a-blaze-in-the-northern-sky", song: "A Blaze in the Northern Sky", band: "Darkthrone", album: "A Blaze in the Northern Sky", year: 1992, bpm: 175, genre: "black-metal", drummer: "fenriz", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 134, slug: "dopethrone", song: "Dopethrone", band: "Electric Wizard", album: "Dopethrone", year: 2000, bpm: 55, genre: "doom-metal", drummer: "mark-greening", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 135, slug: "funeralopolis", song: "Funeralopolis", band: "Electric Wizard", album: "Dopethrone", year: 2000, bpm: 65, genre: "doom-metal", drummer: "mark-greening", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 136, slug: "dragonaut", song: "Dragonaut", band: "Sleep", album: "Sleep's Holy Mountain", year: 1992, bpm: 60, genre: "doom-metal", drummer: "chris-hakius", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 137, slug: "the-druid", song: "The Druid", band: "Sleep", album: "Dopesmoker", year: 1996, bpm: 55, genre: "doom-metal", drummer: "chris-hakius", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 138, slug: "davidian", song: "Davidian", band: "Machine Head", album: "Burn My Eyes", year: 1994, bpm: 128, genre: "groove-metal", drummer: "chris-kontos", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 139, slug: "aesthetics-of-hate", song: "Aesthetics of Hate", band: "Machine Head", album: "The Blackening", year: 2007, bpm: 165, genre: "thrash-metal", drummer: "dave-mcclain", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 140, slug: "halo", song: "Halo", band: "Machine Head", album: "The Blackening", year: 2007, bpm: 125, genre: "groove-metal", drummer: "dave-mcclain", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 141, slug: "doomsday", song: "Doomsday", band: "Architects", album: "Holy Hell", year: 2018, bpm: 95, genre: "metalcore", drummer: "dan-searle", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 142, slug: "gravedigger", song: "Gravedigger", band: "Architects", album: "All Our Gods Have Abandoned Us", year: 2016, bpm: 120, genre: "metalcore", drummer: "dan-searle", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 143, slug: "the-end-of-heartache", song: "The End of Heartache", band: "Killswitch Engage", album: "The End of Heartache", year: 2004, bpm: 165, genre: "metalcore", drummer: "justin-foley", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 144, slug: "my-curse", song: "My Curse", band: "Killswitch Engage", album: "As Daylight Dies", year: 2006, bpm: 135, genre: "metalcore", drummer: "justin-foley", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 145, slug: "my-own-grave", song: "My Own Grave", band: "As I Lay Dying", album: "Shaped by Fire", year: 2019, bpm: 155, genre: "metalcore", drummer: "jordan-mancino", source: "Wikipedia — As I Lay Dying lineup: Jordan Mancino has been the band's sole drummer across every studio album, including the 2019 comeback Shaped by Fire; corrected from a prior entry that credited bassist Josh Gilbert", bpmNote: "corrected from a prior entry that misattributed this song to bassist Josh Gilbert" },
  { id: 146, slug: "confined", song: "Confined", band: "As I Lay Dying", album: "Shadows Are Security", year: 2005, bpm: 145, genre: "metalcore", drummer: "jordan-mancino", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 147, slug: "carrion", song: "Carrion", band: "Parkway Drive", album: "Deep Blue", year: 2010, bpm: 125, genre: "metalcore", drummer: "ben-gordon", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 148, slug: "wild-eyes", song: "Wild Eyes", band: "Parkway Drive", album: "Atlas", year: 2012, bpm: 130, genre: "metalcore", drummer: "ben-gordon", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 149, slug: "this-is-exile", song: "This Is Exile", band: "Whitechapel", album: "This Is Exile", year: 2008, bpm: 110, genre: "deathcore", drummer: "kevin-lane", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 150, slug: "the-saw-is-the-law", song: "The Saw Is the Law", band: "Whitechapel", album: "A New Era of Corruption", year: 2010, bpm: 125, genre: "deathcore", drummer: "kevin-lane", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 151, slug: "divine-intervention", song: "Divine Intervention", band: "Slayer", album: "Divine Intervention", year: 1994, bpm: 220, genre: "thrash-metal", drummer: "paul-bostaph", source: "GetSongBPM lists a dual reading (116 BPM fundamental / 232 BPM double-time); using the double-time value, consistent with this database's other Slayer title-track entries. Bostaph's recording debut with the band" },
  { id: 152, slug: "blinded-by-fear", song: "Blinded by Fear", band: "At the Gates", album: "Slaughter of the Soul", year: 1995, bpm: 250, genre: "melodic-death-metal", drummer: "adrian-erlandsson", source: "SongBPM/Tunebat: 124-125 BPM fundamental, 250 BPM double-time (a dedicated 'drums only, BPM 250' YouTube reference confirms the double-time reading); a genre-landmark blast-beat track" },
  { id: 153, slug: "papyrus-containing-the-spell-to-preserve-its-possessor-against-attacks-from-he-who-is-in-the-water", song: "Papyrus Containing the Spell to Preserve its Possessor Against Attacks From He Who is In the Water", band: "Nile", album: "Ithyphallic", year: 2007, bpm: 271, genre: "death-metal", drummer: "george-kollias", source: "Album producer Neil Kernon has stated the track clocks in at 271 BPM; George Kollias's first appearance in the 'blast' tempo bracket in this database" },
  { id: 154, slug: "i-monarch", song: "I, Monarch", band: "Hate Eternal", album: "I, Monarch", year: 2005, bpm: 270, genre: "death-metal", drummer: "derek-roddy", source: "Modern Drummer profile of Derek Roddy documents 16th-note blasts on this track at '270 bpm'" },
  { id: 155, slug: "dechristianize", song: "Dechristianize", band: "Vital Remains", album: "Dechristianize", year: 2003, bpm: 170, genre: "death-metal", drummer: "tim-yeung", source: "SongBPM/GetSongBPM/Tunebat: 84-85 BPM fundamental, 170 BPM double-time; using the double-time value for consistency with this database's other extreme-death-metal entries" },
  { id: 156, slug: "septuagint", song: "Septuagint", band: "Obscura", album: "Omnivium", year: 2011, bpm: 230, genre: "technical-death-metal", drummer: "hannes-grossmann", source: "SongBPM: 115 BPM fundamental / 230 BPM double-time; contemporary coverage of Grossmann's Obscura tenure notes blast sections reaching 230-240 BPM" },
  { id: 157, slug: "war-eternal", song: "War Eternal", band: "Arch Enemy", album: "War Eternal", year: 2014, bpm: 155, genre: "melodic-death-metal", drummer: "daniel-erlandsson", source: "SongBPM/Tunebat: 152-155 BPM" },
  { id: 158, slug: "are-you-dead-yet", song: "Are You Dead Yet?", band: "Children of Bodom", album: "Are You Dead Yet?", year: 2005, bpm: 192, genre: "melodic-death-metal", drummer: "jaska-raatikainen", source: "SongBPM: 96 BPM fundamental / 192 BPM double-time; using the double-time value to match the track's uptempo feel" },
  { id: 159, slug: "deceiver-of-the-gods", song: "Deceiver of the Gods", band: "Amon Amarth", album: "Deceiver of the Gods", year: 2013, bpm: 193, genre: "melodic-death-metal", drummer: "jocke-wallgren", source: "SongBPM: 193 BPM" },
  { id: 160, slug: "the-enemy-inside", song: "The Enemy Inside", band: "Dream Theater", album: "Dream Theater", year: 2013, bpm: 144, genre: "progressive-metal", drummer: "mike-mangini", source: "SongBPM/GetSongBPM/Tunebat: 144 BPM; Mangini's first Dream Theater studio album, distinct from this database's Mike Portnoy-era Dream Theater entries", bpmNote: "verify against the earlier Portnoy-era Dream Theater entries in this database — same band, different drummer, different recording window" },
  { id: 161, slug: "stabbing-the-drama", song: "Stabbing the Drama", band: "Soilwork", album: "Stabbing the Drama", year: 2005, bpm: 149, genre: "melodic-death-metal", drummer: "dirk-verbeuren", source: "GetSongBPM: title track listed at 149 BPM; Verbeuren's first Soilwork studio album" },
  { id: 162, slug: "the-devil-s-orchard", song: "The Devil's Orchard", band: "Opeth", album: "Heritage", year: 2011, bpm: 142, genre: "progressive-metal", drummer: "martin-axenrot", source: "SongBPM/GetSongBPM dual reading (95/142 BPM depending on section); Axenrot's tenure postdates this database's Martin Lopez-era Opeth entries", bpmNote: "verify against the earlier Martin Lopez-era Opeth entries in this database — same band, different drummer, different recording window" },
  { id: 163, slug: "fear-of-a-blank-planet", song: "Fear of a Blank Planet", band: "Porcupine Tree", album: "Fear of a Blank Planet", year: 2007, bpm: 162, genre: "progressive-metal", drummer: "gavin-harrison", source: "SongBPM/GetSongBPM/Tunebat: 162 BPM" },
  { id: 164, slug: "composure", song: "Composure", band: "August Burns Red", album: "Constellations", year: 2009, bpm: 159, genre: "metalcore", drummer: "matt-greiner", source: "SongBPM/GetSongBPM: 159 BPM" },
  { id: 165, slug: "concubine", song: "Concubine", band: "Converge", album: "Jane Doe", year: 2001, bpm: 168, genre: "mathcore", drummer: "ben-koller", source: "SongBPM: 168 BPM; Koller's first Converge album" },
  { id: 166, slug: "kingdom", song: "Kingdom", band: "Devin Townsend Project", album: "Epicloud", year: 2012, bpm: 169, genre: "progressive-metal", drummer: "ryan-van-poederooyen", source: "SongBPM/GetSongBPM/Tunebat: 167-169 BPM" },
  { id: 167, slug: "nova-era", song: "Nova Era", band: "Angra", album: "Rebirth", year: 2001, bpm: 170, genre: "power-metal", drummer: "aquiles-priester", source: "GetSongBPM/SongBPM/Tunebat: 170 BPM; Priester's recording debut with Angra" },
  { id: 168, slug: "checkmate", song: "Checkmate", band: "Lamb of God", album: "Omens", year: 2022, bpm: 120, genre: "groove-metal", drummer: "art-cruz", source: "SongBPM: 120 BPM; Cruz's second full studio album with the band" },
  { id: 169, slug: "rollin-air-raid-vehicle", song: "Rollin' (Air Raid Vehicle)", band: "Limp Bizkit", album: "Chocolate Starfish and the Hot Dog Flavored Water", year: 2000, bpm: 96, genre: "nu-metal", drummer: "john-otto", source: "SongBPM/GetSongBPM/Tunebat: 96 BPM" },
  { id: 170, slug: "liege-of-inveracity", song: "Liege of Inveracity", band: "Suffocation", album: "Effigy of the Forgotten", year: 1991, bpm: 220, genre: "death-metal", drummer: "mike-smith-suffocation", source: "SongBPM/Tunebat dual reading (109-110 BPM fundamental / 220 BPM double-time); a foundational blast-beat/brutal-death-metal landmark, using the double-time value" },
  { id: 171, slug: "the-light-that-blinds", song: "The Light That Blinds", band: "Shadows Fall", album: "The War Within", year: 2004, bpm: 182, genre: "metalcore", drummer: "jason-bittner", source: "SongBPM/GetSongBPM/Tunebat: 182 BPM" },
  { id: 172, slug: "replica", song: "Replica", band: "Fear Factory", album: "Demanufacture", year: 1995, bpm: 112, genre: "industrial-metal", drummer: "raymond-herrera", source: "GetSongBPM: 112 BPM; Modern Drummer's Herrera profile documents practicing this era's patterns at speeds up to 225 BPM" },
  { id: 173, slug: "rock-believer", song: "Rock Believer", band: "Scorpions", album: "Rock Believer", year: 2022, bpm: 94, genre: "heavy-metal", drummer: "mikkey-dee", source: "Album-tempo reference: 94 BPM; Mikkey Dee's first Scorpions studio album (joined 2016, replacing James Kottak)" },
  { id: 174, slug: "flattening-of-emotions", song: "Flattening of Emotions", band: "Death", album: "Human", year: 1991, bpm: 210, genre: "technical-death-metal", drummer: "sean-reinert", source: "SongBPM: 105 BPM fundamental / 210 BPM double-time; Reinert's only Death studio album, distinct from this database's Gene Hoglan- and Richard Christy-era Death entries", bpmNote: "verify against the other Death entries in this database — three different drummers across three different recording windows (Reinert 1991, Hoglan 1993/1995, Christy 1998)" },
  { id: 175, slug: "catastrophist", song: "Catastrophist", band: "Trivium", album: "What the Dead Men Say", year: 2020, bpm: 158, genre: "heavy-metal", drummer: "alex-bent", source: "Corroborated against this app's own live /bpm tool database (App.js METAL_SONGS_DATABASE): 158 BPM" },
  { id: 176, slug: "i-stand-alone", song: "I Stand Alone", band: "Godsmack", album: "Faceless", year: 2003, bpm: 90, genre: "heavy-metal", drummer: "shannon-larkin", source: "Corroborated against this app's own live /bpm tool database (App.js METAL_SONGS_DATABASE): 90 BPM; Larkin's first Godsmack studio album" },
  { id: 177, slug: "coming-undone", song: "Coming Undone", band: "Korn", album: "See You on the Other Side", year: 2005, bpm: 108, genre: "nu-metal", drummer: "ray-luzier", source: "Corroborated against this app's own live /bpm tool database (App.js METAL_SONGS_DATABASE): 108 BPM; Luzier's first Korn studio album" },
  { id: 178, slug: "hail-to-the-king", song: "Hail to the King", band: "Avenged Sevenfold", album: "Hail to the King", year: 2013, bpm: 114, genre: "heavy-metal", drummer: "arin-ilejay", source: "Corroborated against this app's own live /bpm tool database (App.js METAL_SONGS_DATABASE): 114 BPM" },
  { id: 179, slug: "slit-your-guts", song: "Slit Your Guts", band: "Cryptopsy", album: "None So Vile", year: 1996, bpm: 218, genre: "technical-death-metal", drummer: "flo-mounier", source: "SongBPM dual reading (109 BPM fundamental / 218 BPM double-time); one of technical/brutal death metal's most-cited extreme-blast showcases, using the double-time value" },
  { id: 180, slug: "mother-north", song: "Mother North", band: "Satyricon", album: "Nemesis Divina", year: 1996, bpm: 116, genre: "black-metal", drummer: "frost", source: "SongBPM: 116 BPM fundamental / 232 BPM double-time; Frost is widely regarded as one of black metal's fastest and most precise drummers" },
  { id: 181, slug: "fuel-for-hatred", song: "Fuel for Hatred", band: "Satyricon", album: "Volcano", year: 2002, bpm: 154, genre: "black-metal", drummer: "frost", source: "GetSongBPM: 154 BPM" },
  { id: 182, slug: "whiplash", song: "Whiplash", band: "Metallica", album: "Kill 'Em All", year: 1983, bpm: 156, genre: "thrash-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 183, slug: "blackened", song: "Blackened", band: "Metallica", album: "...And Justice for All", year: 1988, bpm: 190, genre: "thrash-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 184, slug: "dyers-eve", song: "Dyers Eve", band: "Metallica", album: "...And Justice for All", year: 1988, bpm: 220, genre: "thrash-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 185, slug: "postmortem", song: "Postmortem", band: "Slayer", album: "Reign in Blood", year: 1986, bpm: 90, genre: "thrash-metal", drummer: "dave-lombardo", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording", bpmNote: "half-time verse ~90; the closing solo section pushes considerably faster" },
  { id: 186, slug: "dead-skin-mask", song: "Dead Skin Mask", band: "Slayer", album: "Seasons in the Abyss", year: 1990, bpm: 88, genre: "thrash-metal", drummer: "dave-lombardo", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 187, slug: "necrophobic", song: "Necrophobic", band: "Slayer", album: "Reign in Blood", year: 1986, bpm: 210, genre: "thrash-metal", drummer: "dave-lombardo", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 188, slug: "this-love", song: "This Love", band: "Pantera", album: "Vulgar Display of Power", year: 1992, bpm: 76, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 189, slug: "a-new-level", song: "A New Level", band: "Pantera", album: "Vulgar Display of Power", year: 1992, bpm: 132, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 190, slug: "becoming", song: "Becoming", band: "Pantera", album: "Far Beyond Driven", year: 1994, bpm: 130, genre: "groove-metal", drummer: "vinnie-paul", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 191, slug: "trapped-under-ice", song: "Trapped Under Ice", band: "Metallica", album: "Ride the Lightning", year: 1984, bpm: 220, genre: "thrash-metal", drummer: "lars-ulrich", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 192, slug: "rise", song: "Rise", band: "Gojira", album: "Fortitude", year: 2021, bpm: 100, genre: "progressive-metal", drummer: "mario-duplantier", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 193, slug: "the-heaviest-matter-of-the-universe", song: "The Heaviest Matter of the Universe", band: "Gojira", album: "From Mars to Sirius", year: 2005, bpm: 175, genre: "progressive-death-metal", drummer: "mario-duplantier", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 194, slug: "sixtynine", song: "Sixtynine", band: "Meshuggah", album: "Chaosphere", year: 1998, bpm: 140, genre: "djent", drummer: "tomas-haake", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 195, slug: "new-millennium-cyanide-christ", song: "New Millennium Cyanide Christ", band: "Meshuggah", album: "Chaosphere", year: 1998, bpm: 175, genre: "djent", drummer: "tomas-haake", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 196, slug: "set-to-fail", song: "Set to Fail", band: "Lamb of God", album: "Resolution", year: 2012, bpm: 140, genre: "groove-metal", drummer: "chris-adler", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 197, slug: "512", song: "512", band: "Lamb of God", album: "VII: Sturm und Drang", year: 2015, bpm: 100, genre: "groove-metal", drummer: "chris-adler", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 198, slug: "the-czar", song: "The Czar", band: "Mastodon", album: "Crack the Skye", year: 2009, bpm: 118, genre: "progressive-metal", drummer: "brann-dailor", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 199, slug: "divinations", song: "Divinations", band: "Mastodon", album: "Crack the Skye", year: 2009, bpm: 145, genre: "progressive-metal", drummer: "brann-dailor", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 200, slug: "symptom-of-the-universe", song: "Symptom of the Universe", band: "Black Sabbath", album: "Sabotage", year: 1975, bpm: 165, genre: "heavy-metal", drummer: "bill-ward", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 201, slug: "children-of-the-grave", song: "Children of the Grave", band: "Black Sabbath", album: "Master of Reality", year: 1971, bpm: 130, genre: "heavy-metal", drummer: "bill-ward", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 202, slug: "2-minutes-to-midnight", song: "2 Minutes to Midnight", band: "Iron Maiden", album: "Powerslave", year: 1984, bpm: 143, genre: "heavy-metal", drummer: "nicko-mcbrain", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 203, slug: "wrathchild", song: "Wrathchild", band: "Iron Maiden", album: "Killers", year: 1981, bpm: 154, genre: "heavy-metal", drummer: "clive-burr", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 204, slug: "powerslave", song: "Powerslave", band: "Iron Maiden", album: "Powerslave", year: 1984, bpm: 134, genre: "heavy-metal", drummer: "nicko-mcbrain", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 205, slug: "metal-gods", song: "Metal Gods", band: "Judas Priest", album: "British Steel", year: 1980, bpm: 96, genre: "heavy-metal", drummer: "dave-holland", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 206, slug: "leprosy", song: "Leprosy", band: "Death", album: "Leprosy", year: 1988, bpm: 175, genre: "death-metal", drummer: "bill-andrews", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 207, slug: "pull-the-plug", song: "Pull the Plug", band: "Death", album: "Leprosy", year: 1988, bpm: 165, genre: "death-metal", drummer: "bill-andrews", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 208, slug: "butchered-at-birth", song: "Butchered at Birth", band: "Cannibal Corpse", album: "Butchered at Birth", year: 1991, bpm: 165, genre: "death-metal", drummer: "paul-mazurkiewicz", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 209, slug: "make-them-suffer", song: "Make Them Suffer", band: "Cannibal Corpse", album: "Tomb of the Mutilated", year: 1992, bpm: 155, genre: "death-metal", drummer: "paul-mazurkiewicz", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 210, slug: "black-seeds-of-vengeance", song: "Black Seeds of Vengeance", band: "Nile", album: "Black Seeds of Vengeance", year: 2000, bpm: 210, genre: "death-metal", drummer: "pat-harrington", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 211, slug: "chapel-of-ghouls", song: "Chapel of Ghouls", band: "Morbid Angel", album: "Altars of Madness", year: 1989, bpm: 195, genre: "death-metal", drummer: "pete-sandoval", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 212, slug: "maze-of-torment", song: "Maze of Torment", band: "Morbid Angel", album: "Altars of Madness", year: 1989, bpm: 190, genre: "death-metal", drummer: "pete-sandoval", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 213, slug: "pesticide", song: "Pesticide", band: "Behemoth", album: "The Satanist", year: 2014, bpm: 150, genre: "blackened-death-metal", drummer: "inferno", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 214, slug: "messe-noire", song: "Messe Noire", band: "Behemoth", album: "The Satanist", year: 2014, bpm: 165, genre: "blackened-death-metal", drummer: "inferno", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 215, slug: "fear-and-loathing", song: "Fear and Loathing", band: "Dimmu Borgir", album: "Puritanical Euphoric Misanthropia", year: 2001, bpm: 175, genre: "symphonic-black-metal", drummer: "nick-barker", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 216, slug: "the-grand-conjuration", song: "The Grand Conjuration", band: "Opeth", album: "Ghost Reveries", year: 2005, bpm: 145, genre: "progressive-death-metal", drummer: "martin-lopez", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 217, slug: "bleak", song: "Bleak", band: "Opeth", album: "Still Life", year: 1999, bpm: 100, genre: "progressive-death-metal", drummer: "martin-lopez", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 218, slug: "dead-embryonic-cells", song: "Dead Embryonic Cells", band: "Sepultura", album: "Chaos A.D.", year: 1993, bpm: 140, genre: "groove-metal", drummer: "igor-cavalera", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 219, slug: "beneath-the-remains", song: "Beneath the Remains", band: "Sepultura", album: "Beneath the Remains", year: 1989, bpm: 200, genre: "thrash-metal", drummer: "igor-cavalera", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 220, slug: "prison-song", song: "Prison Song", band: "System of a Down", album: "Toxicity", year: 2001, bpm: 140, genre: "nu-metal", drummer: "john-dolmayan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 221, slug: "suite-pee", song: "Suite-Pee", band: "System of a Down", album: "System of a Down", year: 1998, bpm: 165, genre: "nu-metal", drummer: "john-dolmayan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 222, slug: "a-d-i-d-a-s", song: "A.D.I.D.A.S.", band: "Korn", album: "Life Is Peachy", year: 1996, bpm: 92, genre: "nu-metal", drummer: "david-silveria", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 223, slug: "got-the-life", song: "Got the Life", band: "Korn", album: "Follow the Leader", year: 1998, bpm: 98, genre: "nu-metal", drummer: "david-silveria", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 224, slug: "elite", song: "Elite", band: "Korn", album: "The Serenity of Suffering", year: 2016, bpm: 130, genre: "nu-metal", drummer: "ray-luzier", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 225, slug: "7-words", song: "7 Words", band: "Deftones", album: "Adrenaline", year: 1995, bpm: 130, genre: "alternative-metal", drummer: "abe-cunningham", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 226, slug: "engine-no-9", song: "Engine No. 9", band: "Deftones", album: "Around the Fur", year: 1997, bpm: 105, genre: "alternative-metal", drummer: "abe-cunningham", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 227, slug: "unholy-confessions", song: "Unholy Confessions", band: "Avenged Sevenfold", album: "Waking the Fallen", year: 2003, bpm: 172, genre: "metalcore", drummer: "the-rev", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 228, slug: "critical-acclaim", song: "Critical Acclaim", band: "Trivium", album: "Ascendancy", year: 2005, bpm: 190, genre: "metalcore", drummer: "travis-smith", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 229, slug: "blind-leading-the-blind", song: "Blind Leading the Blind", band: "Trivium", album: "Shogun", year: 2008, bpm: 130, genre: "thrash-metal", drummer: "travis-smith", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 230, slug: "jetpacks-was-yes", song: "Jetpacks Was Yes!", band: "Periphery", album: "Periphery II: This Time It's Personal", year: 2012, bpm: 175, genre: "djent", drummer: "matt-halpern", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 231, slug: "motion-sickness", song: "Motion Sickness", band: "Periphery", album: "Periphery III: Select Difficulty", year: 2016, bpm: 150, genre: "djent", drummer: "matt-halpern", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 232, slug: "kascade", song: "Kascade", band: "Animals as Leaders", album: "The Joy of Motion", year: 2014, bpm: 128, genre: "progressive-metal", drummer: "matt-garstka", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 233, slug: "odyssea", song: "Odyssea", band: "Animals as Leaders", album: "The Madness of Many", year: 2016, bpm: 132, genre: "progressive-metal", drummer: "matt-garstka", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 234, slug: "the-new-order", song: "The New Order", band: "Testament", album: "The New Order", year: 1988, bpm: 185, genre: "thrash-metal", drummer: "louie-clemente", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 235, slug: "the-preacher", song: "The Preacher", band: "Testament", album: "The Legacy", year: 1987, bpm: 150, genre: "thrash-metal", drummer: "louie-clemente", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 236, slug: "dark-roots-of-earth", song: "Dark Roots of Earth", band: "Testament", album: "Dark Roots of Earth", year: 2012, bpm: 145, genre: "thrash-metal", drummer: "gene-hoglan", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 237, slug: "metal-thrashing-mad", song: "Metal Thrashing Mad", band: "Anthrax", album: "Fistful of Metal", year: 1984, bpm: 175, genre: "thrash-metal", drummer: "charlie-benante", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 238, slug: "antisocial", song: "Antisocial", band: "Anthrax", album: "State of Euphoria", year: 1988, bpm: 175, genre: "thrash-metal", drummer: "charlie-benante", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 239, slug: "cause-of-death", song: "Cause of Death", band: "Obituary", album: "Cause of Death", year: 1990, bpm: 165, genre: "death-metal", drummer: "donald-tardy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 240, slug: "redneck-stomp", song: "Redneck Stomp", band: "Obituary", album: "The End Complete", year: 1992, bpm: 90, genre: "death-metal", drummer: "donald-tardy", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 241, slug: "pure-fucking-armageddon", song: "Pure Fucking Armageddon", band: "Mayhem", album: "De Mysteriis Dom Sathanas", year: 1994, bpm: 190, genre: "black-metal", drummer: "hellhammer", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 242, slug: "panzerfaust", song: "Panzerfaust", band: "Darkthrone", album: "Panzerfaust", year: 1995, bpm: 180, genre: "black-metal", drummer: "fenriz", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 243, slug: "weight-of-the-sun", song: "Weight of the Sun", band: "Electric Wizard", album: "Come My Fanatics...", year: 1997, bpm: 60, genre: "doom-metal", drummer: "mark-greening", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 244, slug: "holy-wound", song: "Holy Wound", band: "Sleep", album: "Sleep's Holy Mountain", year: 1992, bpm: 65, genre: "doom-metal", drummer: "chris-hakius", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 245, slug: "imperium", song: "Imperium", band: "Machine Head", album: "The Blackening", year: 2007, bpm: 130, genre: "groove-metal", drummer: "dave-mcclain", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 246, slug: "old", song: "Old", band: "Machine Head", album: "Burn My Eyes", year: 1994, bpm: 92, genre: "groove-metal", drummer: "chris-kontos", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 247, slug: "naysayer", song: "Naysayer", band: "Architects", album: "For Those That Wish to Exist", year: 2021, bpm: 150, genre: "metalcore", drummer: "dan-searle", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 248, slug: "in-due-time", song: "In Due Time", band: "Killswitch Engage", album: "Alive or Just Breathing", year: 2002, bpm: 150, genre: "metalcore", drummer: "justin-foley", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 249, slug: "rose-of-sharyn", song: "Rose of Sharyn", band: "Killswitch Engage", album: "As Daylight Dies", year: 2006, bpm: 140, genre: "metalcore", drummer: "justin-foley", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 250, slug: "an-ocean-between-us", song: "An Ocean Between Us", band: "As I Lay Dying", album: "An Ocean Between Us", year: 2007, bpm: 175, genre: "metalcore", drummer: "jordan-mancino", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 251, slug: "deliver-us", song: "Deliver Us", band: "Parkway Drive", album: "Deep Blue", year: 2010, bpm: 145, genre: "metalcore", drummer: "ben-gordon", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 252, slug: "this-is-a-nightmare", song: "This Is a Nightmare", band: "Whitechapel", album: "This Is Exile", year: 2008, bpm: 130, genre: "deathcore", drummer: "kevin-lane", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 253, slug: "lord-of-the-sky", song: "Lord of the Sky", band: "Judas Priest", album: "Painkiller", year: 1990, bpm: 145, genre: "heavy-metal", drummer: "scott-travis", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },
  { id: 254, slug: "one-shot-at-glory", song: "One Shot at Glory", band: "Judas Priest", album: "Painkiller", year: 1990, bpm: 150, genre: "heavy-metal", drummer: "scott-travis", source: "tab/lesson tempo consensus (Ultimate Guitar, Songsterr, drum-cover community) cross-checked against the recording" },];

/**
 * Self-check: every song must have a unique id and a unique slug, and every
 * song must carry a source. Run at module load so a broken invariant fails
 * loudly (build/import time) instead of silently shipping duplicate slugs
 * to a future per-song page route. See issue #4759.
 * @returns {string[]} list of problems found (empty if the dataset is clean)
 */
export function validateMetalSongs() {
  const problems = [];
  const idsSeen = new Set();
  const slugsSeen = new Set();
  for (const s of metalSongs) {
    if (idsSeen.has(s.id)) problems.push(`duplicate id: ${s.id} (${s.song})`);
    idsSeen.add(s.id);
    if (!s.slug) problems.push(`missing slug: ${s.song} (id ${s.id})`);
    else if (slugsSeen.has(s.slug)) problems.push(`duplicate slug: ${s.slug} (id ${s.id})`);
    slugsSeen.add(s.slug);
    if (!s.source) problems.push(`missing source: ${s.song} (id ${s.id})`);
  }
  return problems;
}

const _validationProblems = validateMetalSongs();
if (_validationProblems.length > 0) {
  throw new Error(`metalSongsBpm.js data integrity check failed:\n${_validationProblems.join('\n')}`);
}

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

/**
 * Issue #4760: URL slugs for the /songs/tempo/<tier> pages, one per
 * TEMPO_RANGES key. Named for each range's dominant subgenre rather than
 * the internal slow/mid/fast/extreme/blast keys (e.g. `slow` -> `doom`).
 */
export const TEMPO_TIER_SLUGS = {
  slow: 'doom',
  mid: 'groove',
  fast: 'thrash',
  extreme: 'extreme',
  blast: 'blast',
};

/**
 * Look up a song by its stable slug.
 * @param {string} slug
 * @returns {object|null}
 */
export function getSongBySlug(slug) {
  return metalSongs.find(s => s.slug === slug) || null;
}

/**
 * @returns {string[]} every song's slug
 */
export function getAllSongSlugs() {
  return metalSongs.map(s => s.slug);
}

/**
 * All five tempo tiers with their URL slug and member songs (BPM descending).
 * Powers the /songs hub's tempo-range browse section and the sitemap.
 * @returns {object[]}
 */
export function getTempoTiers() {
  return Object.keys(TEMPO_RANGES).map(rangeKey => ({
    rangeKey,
    slug: TEMPO_TIER_SLUGS[rangeKey],
    ...TEMPO_RANGES[rangeKey],
    songs: getSongsByTempoCategory(rangeKey).slice().sort((a, b) => b.bpm - a.bpm),
  }));
}

/**
 * Look up a single tempo tier by its /songs/tempo/<tier> URL slug.
 * @param {string} slug
 * @returns {object|null}
 */
export function getTempoTierBySlug(slug) {
  const rangeKey = Object.keys(TEMPO_TIER_SLUGS).find(k => TEMPO_TIER_SLUGS[k] === slug);
  if (!rangeKey) return null;
  return {
    rangeKey,
    slug,
    ...TEMPO_RANGES[rangeKey],
    songs: getSongsByTempoCategory(rangeKey).slice().sort((a, b) => b.bpm - a.bpm),
  };
}

/** Minimum BPM for the /songs/fastest-metal-songs flagship page. */
export const FASTEST_SONGS_MIN_BPM = 200;

/**
 * Songs at or above minBpm, ranked fastest first. Powers the
 * /songs/fastest-metal-songs flagship page.
 * @param {number} [minBpm]
 * @returns {object[]}
 */
export function getFastestMetalSongs(minBpm = FASTEST_SONGS_MIN_BPM) {
  return metalSongs.filter(s => s.bpm >= minBpm).slice().sort((a, b) => b.bpm - a.bpm);
}

/**
 * Every song attributed to a given drummer slug, ranked fastest first.
 * @param {string} drummerSlug
 * @returns {object[]}
 */
export function getSongsByDrummerSlug(drummerSlug) {
  return metalSongs.filter(s => s.drummer === drummerSlug).slice().sort((a, b) => b.bpm - a.bpm);
}

/** Minimum song count for a drummer to qualify for a /songs/drummer/<slug> page. */
export const DRUMMER_SONGS_MIN_COUNT = 3;

/**
 * Drummer slugs with at least minCount songs in the database, most songs
 * first. Callers are responsible for filtering against the live drummer
 * roster (this module has no roster dependency) before linking out.
 * @param {number} [minCount]
 * @returns {{drummer: string, count: number, songs: object[]}[]}
 */
export function getDrummersWithSongCounts(minCount = DRUMMER_SONGS_MIN_COUNT) {
  const byDrummer = new Map();
  for (const s of metalSongs) {
    if (!s.drummer) continue;
    if (!byDrummer.has(s.drummer)) byDrummer.set(s.drummer, []);
    byDrummer.get(s.drummer).push(s);
  }
  return [...byDrummer.entries()]
    .filter(([, songs]) => songs.length >= minCount)
    .map(([drummer, songs]) => ({
      drummer,
      count: songs.length,
      songs: songs.slice().sort((a, b) => b.bpm - a.bpm),
    }))
    .sort((a, b) => b.count - a.count);
}

const _normalizeForMatch = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const _songRosterSlugs = new Set(drummerBirthdays.map(d => d.slug));
const _albumArticlesList = Object.values(ALBUM_ARTICLES);
const _licksList = Object.values(SIGNATURE_LICKS);

function _findAlbumArticleForSong(song) {
  return _albumArticlesList.find(a =>
    a.relatedDrummerSlug === song.drummer && _normalizeForMatch(a.albumTitle) === _normalizeForMatch(song.album)
  ) || null;
}

function _findLickForSong(song) {
  return _licksList.find(l =>
    l.drummerSlug === song.drummer && _normalizeForMatch(l.song) === _normalizeForMatch(song.song)
  ) || null;
}

/** Minimum number of richness criteria (of 4) a roster song must clear to earn a /songs/<slug> page. */
export const SONG_PAGE_MIN_CRITERIA = 2;

/**
 * Content-richness gate for a single song (epic #4758 binding rule 4 /
 * issue #4761): a song only qualifies for a /songs/<slug> page if its
 * drummer is a live roster profile AND it clears at least
 * SONG_PAGE_MIN_CRITERIA of 4 signals:
 *   1. technique content — a `bpmNote` or a matching packages/frontend/data/licks/
 *      entry (same drummer + normalized song title)
 *   2. an existing album article (packages/frontend/data/albumArticles/) for
 *      that drummer + album
 *   3. a verified YouTube video — reused from that same lick's `video`/
 *      `tutorial.youtubeId` (already embedded and oEmbed-verified elsewhere
 *      in the app; no new IDs are introduced here)
 *   4. a `notableFact` field with a `source` (not present in this dataset
 *      yet — reserved for a future data pass)
 * @param {object} song
 * @returns {{inRoster: boolean, hasTechniqueContent: boolean, lick: object|null, albumArticle: object|null, video: {youtubeId: string, title: string}|null, notableFact: object|null, criteriaCount: number, qualifies: boolean}}
 */
export function getSongPageGate(song) {
  const inRoster = _songRosterSlugs.has(song.drummer);
  const lick = _findLickForSong(song);
  const albumArticle = _findAlbumArticleForSong(song);
  const video = lick
    ? ((lick.video && lick.video.youtubeId)
        ? { youtubeId: lick.video.youtubeId, title: lick.video.title }
        : (lick.tutorial && lick.tutorial.youtubeId)
          ? { youtubeId: lick.tutorial.youtubeId, title: lick.tutorial.title }
          : null)
    : null;
  const notableFact = (song.notableFact && song.notableFact.source) ? song.notableFact : null;
  const hasTechniqueContent = !!song.bpmNote || !!lick;
  const criteriaCount =
    (hasTechniqueContent ? 1 : 0) +
    (albumArticle ? 1 : 0) +
    (video ? 1 : 0) +
    (notableFact ? 1 : 0);
  return {
    inRoster,
    hasTechniqueContent,
    lick,
    albumArticle,
    video,
    notableFact,
    criteriaCount,
    qualifies: inRoster && criteriaCount >= SONG_PAGE_MIN_CRITERIA,
  };
}

/**
 * Slugs of songs that clear the content-richness gate — the single list
 * App.js routing, api/meta/[...path].js SSR, api/sitemap.js, and the
 * /llms/songs/<slug>.md generator all derive from. Under-gate songs are
 * never linked to a /songs/<slug> URL; they stay list-only (hub, tempo-tier,
 * flagship, and by-drummer tables).
 * @returns {string[]}
 */
export function getSongPageSlugs() {
  return metalSongs.filter(s => getSongPageGate(s).qualifies).map(s => s.slug);
}

/**
 * Full page data for a qualifying /songs/<slug> page — BPM hero, tempo tier,
 * album context, verified video, and up to 6 related songs (same band or
 * same tempo tier, restricted to other qualifying slugs so every related-
 * song link resolves to a real page). Returns null both when the slug
 * doesn't exist and when it exists but doesn't clear the gate — callers
 * should treat both cases identically (fall through to the normal 404/list
 * experience, never render a thin template).
 * @param {string} slug
 * @returns {object|null}
 */
export function getSongPageData(slug) {
  const song = getSongBySlug(slug);
  if (!song) return null;
  const gate = getSongPageGate(song);
  if (!gate.qualifies) return null;

  const range = getTempoRange(song.bpm);
  const tier = { slug: TEMPO_TIER_SLUGS[Object.keys(TEMPO_RANGES).find(k => TEMPO_RANGES[k] === range)], ...range };
  const qualifyingSlugs = new Set(getSongPageSlugs());
  const relatedSongs = metalSongs
    .filter(s => s.slug !== song.slug && qualifyingSlugs.has(s.slug) && (s.band === song.band || getTempoRange(s.bpm) === range))
    .sort((a, b) => {
      const aSameBand = a.band === song.band;
      const bSameBand = b.band === song.band;
      if (aSameBand !== bSameBand) return aSameBand ? -1 : 1;
      return b.bpm - a.bpm;
    })
    .slice(0, 6);

  return {
    ...song,
    tier,
    drummerInRoster: gate.inRoster,
    albumArticle: gate.albumArticle ? { slug: gate.albumArticle.slug, title: gate.albumArticle.title } : null,
    video: gate.video,
    techniqueSummary: gate.lick ? gate.lick.description || null : null,
    notableFact: gate.notableFact,
    relatedSongs,
  };
}

export default metalSongs;
