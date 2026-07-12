/**
 * FACE_FOCUS — vertical anchor of short cover-crops of drummer photos,
 * per photo. SINGLE SOURCE OF TRUTH: every component that renders a roster
 * photo in a wide/short crop (hub cards, setup cards, future theme areas)
 * must import this map instead of keeping a local copy — two local copies
 * already drifted once (drumsticks vs cymbals hubs).
 *
 * Value = the percentage from the top of the source image the crop anchors
 * to (expo-image `contentPosition` / CSS `object-position` Y). Photos not
 * listed keep the centered default ('50%'), which is correct for wide/stage
 * shots and photos whose face sits mid-frame.
 *
 * Tuned by rendering every roster photo at card size (~230x120) across seven
 * focus values (0–65%) and picking the frame that shows the full face
 * (drumsticks audit #4302 + cymbals audit). When adding a photo, do the same —
 * don't guess, and don't use a global top-anchor (it breaks centered faces).
 *
 * Usage:
 *   import { FACE_FOCUS } from '../data/drummerPhotoFocus';
 *   <Image contentFit="cover"
 *          contentPosition={{ left: '50%', top: FACE_FOCUS[slug] || '50%' }} ... />
 */
export const FACE_FOCUS = {
  // — severe: face fully or mostly outside the centered crop —
  'danny-carey': '8%',
  'dirk-verbeuren': '8%',
  'bill-ward': '8%',
  'george-kollias': '10%',
  'ryan-van-poederooyen': '10%',
  'frost': '10%',
  'jaska-raatikainen': '10%',
  'jocke-wallgren': '10%',
  'tim-yeung': '10%',
  'paul-bostaph': '10%',
  'jon-dette': '10%',
  'chris-adler': '10%',
  'sean-reinert': '10%',
  'nicko-mcbrain': '12%',
  'gene-hoglan': '12%',
  'mikkey-dee': '15%',
  'derek-roddy': '15%',
  'richard-christy': '15%',
  'blake-richardson': '15%',
  'alex-bent': '15%',
  'daniel-erlandsson': '15%',
  'charlie-benante': '20%',
  'adrian-erlandsson': '20%',
  'mario-duplantier': '20%',
  'ben-koller': '20%',
  'paul-mazurkiewicz': '20%',
  'mike-mangini': '20%',
  'daray': '20%',
  'joey-jordison': '22%',
  'inferno': '25%',
  'navene-koperweis': '25%',
  'abe-cunningham': '25%',
  'dave-lombardo': '28%',
  'lars-ulrich': '30%',
  'art-cruz': '30%',
  'kevin-talley': '30%',
  'martin-axenrot': '30%',
  // — face sits BELOW the centered crop (rare) —
  'hellhammer': '65%',
};
