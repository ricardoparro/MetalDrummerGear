// Composes the per-drummer album drum-setup article modules into ALBUM_ARTICLES.
// New drummers: add a './<slug>.js' module + one import + one spread line below.

import larsUlrichArticles from './lars-ulrich.js';
import daveLombardoArticles from './dave-lombardo.js';
import paulBostaphArticles from './paul-bostaph.js';
import tosinAbasiProgrammedArticles from './tosin-abasi-programmed.js';
import vinniePaulArticles from './vinnie-paul.js';
import nickoMcbrainArticles from './nicko-mcbrain.js';
import joeyJordisonArticles from './joey-jordison.js';
import dannyCareyArticles from './danny-carey.js';
import tomasHaakeArticles from './tomas-haake.js';
import geneHoglanArticles from './gene-hoglan.js';
import eloyCasagrandeArticles from './eloy-casagrande.js';
import scottTravisArticles from './scott-travis.js';
import mikePortnoyArticles from './mike-portnoy.js';
import marioDuplantierArticles from './mario-duplantier.js';
import brannDailorArticles from './brann-dailor.js';
import chrisAdlerArticles from './chris-adler.js';
import charlieBenanteArticles from './charlie-benante.js';
import billWardArticles from './bill-ward.js';
import floMounierArticles from './flo-mounier.js';
import peteSandovalArticles from './pete-sandoval.js';
import georgeKolliasArticles from './george-kollias.js';
import mikeManginiArticles from './mike-mangini.js';
import igorCavaleraArticles from './igor-cavalera.js';
import mattGarstkaArticles from './matt-garstka.js';
import derekRoddyArticles from './derek-roddy.js';
import infernoArticles from './inferno.js';
import seanReinertArticles from './sean-reinert.js';
import alexBentArticles from './alex-bent.js';
import martinLopezArticles from './martin-lopez.js';
import martinAxenrotArticles from './martin-axenrot.js';
import dirkVerbeurenArticles from './dirk-verbeuren.js';
import richardChristyArticles from './richard-christy.js';
import nickMenzaArticles from './nick-menza.js';
import artCruzArticles from './art-cruz.js';
import mikkeyDeeArticles from './mikkey-dee.js';
import abeCunninghamArticles from './abe-cunningham.js';
import gavinHarrisonArticles from './gavin-harrison.js';
import mattHalpernArticles from './matt-halpern.js';
import mattGreinerArticles from './matt-greiner.js';
import aquilesPriesterArticles from './aquiles-priester.js';
import benKollerArticles from './ben-koller.js';
import frostArticles from './frost.js';
import rayLuzierArticles from './ray-luzier.js';
import naveneKoperweisArticles from './navene-koperweis.js';
import jaskaRaatikainenArticles from './jaska-raatikainen.js';
import paulMazurkiewiczArticles from './paul-mazurkiewicz.js';
import jayWeinbergArticles from './jay-weinberg.js';
import variousArticles from './various.js';
import shannonLarkinArticles from './shannon-larkin.js';
import hellhammerArticles from './hellhammer.js';
import travisOrbinArticles from './travis-orbin.js';
import blakeRichardsonArticles from './blake-richardson.js';
import jockeWallgrenArticles from './jocke-wallgren.js';
import timYeungArticles from './tim-yeung.js';
import raymondHerreraArticles from './raymond-herrera.js';
import chrisTurnerArticles from './chris-turner.js';
import isaacLambArticles from './isaac-lamb.js';
import danielErlandssonArticles from './daniel-erlandsson.js';
import jasonBittnerArticles from './jason-bittner.js';
import hannesGrossmannArticles from './hannes-grossmann.js';
import darayArticles from './daray.js';
import jonDetteArticles from './jon-dette.js';
import ryanVanPoederooyenArticles from './ryan-van-poederooyen.js';
import kevinTalleyArticles from './kevin-talley.js';
import morganGrenArticles from './morgan-gren.js';
import johnOttoArticles from './john-otto.js';
import nickAugustoArticles from './nick-augusto.js';
import arinIlejayArticles from './arin-ilejay.js';
import adrianErlandssonArticles from './adrian-erlandsson.js';
import theRevArticles from './the-rev.js';

export const ALBUM_ARTICLES = {
  ...larsUlrichArticles,
  ...daveLombardoArticles,
  ...paulBostaphArticles,
  ...tosinAbasiProgrammedArticles,
  ...vinniePaulArticles,
  ...nickoMcbrainArticles,
  ...joeyJordisonArticles,
  ...dannyCareyArticles,
  ...tomasHaakeArticles,
  ...geneHoglanArticles,
  ...eloyCasagrandeArticles,
  ...scottTravisArticles,
  ...mikePortnoyArticles,
  ...marioDuplantierArticles,
  ...brannDailorArticles,
  ...chrisAdlerArticles,
  ...charlieBenanteArticles,
  ...billWardArticles,
  ...floMounierArticles,
  ...peteSandovalArticles,
  ...georgeKolliasArticles,
  ...mikeManginiArticles,
  ...igorCavaleraArticles,
  ...mattGarstkaArticles,
  ...derekRoddyArticles,
  ...infernoArticles,
  ...seanReinertArticles,
  ...alexBentArticles,
  ...martinLopezArticles,
  ...martinAxenrotArticles,
  ...dirkVerbeurenArticles,
  ...richardChristyArticles,
  ...nickMenzaArticles,
  ...artCruzArticles,
  ...mikkeyDeeArticles,
  ...abeCunninghamArticles,
  ...gavinHarrisonArticles,
  ...mattHalpernArticles,
  ...mattGreinerArticles,
  ...aquilesPriesterArticles,
  ...benKollerArticles,
  ...frostArticles,
  ...rayLuzierArticles,
  ...naveneKoperweisArticles,
  ...jaskaRaatikainenArticles,
  ...paulMazurkiewiczArticles,
  ...jayWeinbergArticles,
  ...variousArticles,
  ...shannonLarkinArticles,
  ...hellhammerArticles,
  ...travisOrbinArticles,
  ...blakeRichardsonArticles,
  ...jockeWallgrenArticles,
  ...timYeungArticles,
  ...raymondHerreraArticles,
  ...chrisTurnerArticles,
  ...isaacLambArticles,
  ...danielErlandssonArticles,
  ...jasonBittnerArticles,
  ...hannesGrossmannArticles,
  ...darayArticles,
  ...jonDetteArticles,
  ...ryanVanPoederooyenArticles,
  ...kevinTalleyArticles,
  ...morganGrenArticles,
  ...johnOttoArticles,
  ...nickAugustoArticles,
  ...arinIlejayArticles,
  ...adrianErlandssonArticles,
  ...theRevArticles,
};

export default ALBUM_ARTICLES;
