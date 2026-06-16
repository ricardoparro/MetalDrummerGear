// Composes the per-drummer signature-lick modules into the SIGNATURE_LICKS map.
// New drummers: add a './<slug>.js' module + one import + one spread line below. Issue #1056.

import mattGreinerLicks from './matt-greiner.js';
import benKollerLicks from './ben-koller.js';
import dannyCareyLicks from './danny-carey.js';
import geneHoglanLicks from './gene-hoglan.js';
import tomasHaakeLicks from './tomas-haake.js';
import joeyJordisonLicks from './joey-jordison.js';
import larsUlrichLicks from './lars-ulrich.js';
import daveLombardoLicks from './dave-lombardo.js';
import georgeKolliasLicks from './george-kollias.js';
import marioDuplantierLicks from './mario-duplantier.js';
import mattGarstkaLicks from './matt-garstka.js';
import jaskaRaatikainenLicks from './jaska-raatikainen.js';
import brannDailorLicks from './brann-dailor.js';
import mikePortnoyLicks from './mike-portnoy.js';
import eloyCasagrandeLicks from './eloy-casagrande.js';
import mattHalpernLicks from './matt-halpern.js';
import vinniePaulLicks from './vinnie-paul.js';
import charlieBenanteLicks from './charlie-benante.js';
import chrisAdlerLicks from './chris-adler.js';
import derekRoddyLicks from './derek-roddy.js';
import floMounierLicks from './flo-mounier.js';
import hannesGrossmannLicks from './hannes-grossmann.js';
import danielErlandssonLicks from './daniel-erlandsson.js';
import mikeManginiLicks from './mike-mangini.js';
import peteSandovalLicks from './pete-sandoval.js';

export const SIGNATURE_LICKS = {
  ...mattGreinerLicks,
  ...benKollerLicks,
  ...dannyCareyLicks,
  ...geneHoglanLicks,
  ...tomasHaakeLicks,
  ...joeyJordisonLicks,
  ...larsUlrichLicks,
  ...daveLombardoLicks,
  ...georgeKolliasLicks,
  ...marioDuplantierLicks,
  ...mattGarstkaLicks,
  ...jaskaRaatikainenLicks,
  ...brannDailorLicks,
  ...mikePortnoyLicks,
  ...eloyCasagrandeLicks,
  ...mattHalpernLicks,
  ...vinniePaulLicks,
  ...charlieBenanteLicks,
  ...chrisAdlerLicks,
  ...derekRoddyLicks,
  ...floMounierLicks,
  ...hannesGrossmannLicks,
  ...danielErlandssonLicks,
  ...mikeManginiLicks,
  ...peteSandovalLicks,
};

export default SIGNATURE_LICKS;
