// Drumming Techniques Data for MetalForge
// Issue #344: Drumming techniques pages (blast beat, double bass, etc.)

/**
 * Metal drumming techniques with SEO-optimized content
 * Each technique includes educational content, masters, gear recommendations, and video examples
 */

export const techniques = {
  'blast-beat': {
    slug: 'blast-beat',
    title: 'Blast Beat',
    emoji: '💥',
    metaTitle: 'Blast Beat Technique - How to Play Blast Beats | MetalForge',
    metaDescription: 'Learn the blast beat drumming technique. History, how to practice, famous drummers who use it, gear recommendations, and video tutorials. Master extreme metal drumming.',
    category: 'extreme',
    difficulty: 'advanced',
    bpmRange: '180-280+ BPM',
    description: `The blast beat is the definitive extreme metal drumming technique, characterized by rapid alternating strokes between the snare drum and bass drum, typically played in unison with the hi-hat or ride cymbal. Originally emerging from hardcore punk and grindcore, blast beats became the backbone of death metal, black metal, and grindcore drumming.`,
    history: `The blast beat evolved in the mid-1980s from hardcore punk and thrash metal. Bands like Repulsion, Napalm Death, and early death metal pioneers developed what we now recognize as the classic blast beat. The technique was further refined by drummers like Pete Sandoval (Morbid Angel), who popularized the "hyper blast," and Flo Mounier (Cryptopsy), known for his technical variations. In black metal, drummers like Hellhammer (Mayhem) and Frost (Satyricon) adapted the technique to create a more relentless, hypnotic feel.`,
    howToLearn: [
      'Start slow - practice at 60-80 BPM with a metronome',
      'Focus on even strokes between snare and bass drum',
      'Build stamina gradually - increase BPM by 5-10 after mastering current tempo',
      'Practice with a click track for at least 30 minutes daily',
      'Use lighter sticks initially to prevent fatigue',
      'Work on your bass drum technique separately before combining',
      'Practice the traditional blast (snare-kick) and the hammer blast separately',
      'Focus on relaxation - tension kills speed and endurance',
    ],
    variations: [
      { name: 'Traditional Blast', description: 'Alternating snare and kick on 8th or 16th notes with ride/hi-hat accents' },
      { name: 'Hammer Blast', description: 'Both hands play the snare while feet alternate - creates denser sound' },
      { name: 'Bomb Blast', description: 'Snare accents on beat with constant kick and cymbal 16ths' },
      { name: 'Gravity Blast', description: 'One-handed roll technique using cymbal bounce - see gravity-blast technique' },
      { name: 'Hyper Blast', description: 'Extremely fast blast beats, typically 250+ BPM' },
    ],
    masters: [
      { name: 'Pete Sandoval', slug: 'pete-sandoval', band: 'Morbid Angel', note: 'Pioneer of the hyper blast' },
      { name: 'George Kollias', slug: 'george-kollias', band: 'Nile', note: 'Known for sustained 280+ BPM blasts' },
      { name: 'Inferno', slug: 'inferno', band: 'Behemoth', note: 'Combines technicality with raw power' },
      { name: 'Hellhammer', slug: 'hellhammer', band: 'Mayhem', note: 'Black metal blast beat icon' },
      { name: 'Gene Hoglan', slug: 'gene-hoglan', band: 'Death/Testament', note: 'Technical precision in blast patterns' },
      { name: 'Tomas Haake', slug: 'tomas-haake', band: 'Meshuggah', note: 'Polyrhythmic blast variations' },
    ],
    gearRecommendations: {
      pedals: [
        { name: 'Pearl Demon Drive', reason: 'Ultra-smooth bearings for sustained high-speed playing' },
        { name: 'Tama Speed Cobra', reason: 'Lightweight footboard for faster response' },
        { name: 'Axis A Longboard', reason: 'Direct drive precision for extreme speeds' },
      ],
      snares: [
        { name: 'Tama SLP Steel', reason: 'Cutting attack that penetrates blast sections' },
        { name: 'Pearl Sensitone Steel', reason: 'Crisp response for fast snare work' },
      ],
      sticks: [
        { name: 'Vic Firth 5A', reason: 'Balanced weight for endurance' },
        { name: 'Ahead Lars Ulrich', reason: 'Aluminum core reduces fatigue' },
      ],
      tips: 'Consider trigger pads or electronic triggers for consistent sound at extreme speeds. Many blast beat masters use triggered kicks for live performance clarity.',
    },
    videos: [
      { title: 'George Kollias Blast Beat Tutorial', url: 'https://www.youtube.com/watch?v=example1', platform: 'YouTube' },
      { title: 'Pete Sandoval Blast Beat Masterclass', url: 'https://www.youtube.com/watch?v=example2', platform: 'YouTube' },
    ],
    relatedTechniques: ['gravity-blast', 'double-bass', 'triggered-drums'],
    seoKeywords: ['blast beat', 'how to play blast beats', 'extreme metal drumming', 'blast beat tutorial', 'death metal drums'],
  },

  'double-bass': {
    slug: 'double-bass',
    title: 'Double Bass Drumming',
    emoji: '🦶',
    metaTitle: 'Double Bass Drumming Technique - Master Your Feet | MetalForge',
    metaDescription: 'Master double bass drumming technique. Learn heel-toe, swivel, and slide techniques. Famous metal drummers, gear recommendations, and practice tips.',
    category: 'foundational',
    difficulty: 'intermediate',
    bpmRange: '120-260+ BPM',
    description: `Double bass drumming uses two bass drums or a double pedal to create rapid, sustained bass drum patterns that form the rhythmic foundation of heavy metal. From the galloping rhythms of Iron Maiden to the machine-gun fire of death metal, double bass technique is essential for any metal drummer.`,
    history: `While double bass drums existed in jazz (Louie Bellson pioneered them in the 1940s), metal drummers transformed the technique into an art form. Cozy Powell, Carmine Appice, and Tommy Aldridge brought double bass to hard rock. In the 1980s, Dave Lombardo (Slayer), Lars Ulrich (Metallica), and Gene Hoglan elevated speed and precision. The 1990s saw Pete Sandoval and George Kollias push boundaries beyond 250 BPM.`,
    howToLearn: [
      'Master single-foot technique first - clean strokes at various dynamics',
      'Practice heel-toe technique for efficient high-speed playing',
      'Start with simple 8th note patterns at 80-100 BPM',
      'Use a practice pad under your desk for silent foot practice',
      'Build independence - practice different patterns between feet',
      'Focus on even volume between left and right foot',
      'Incorporate fills that transition between single and double bass',
      'Practice with music - play along to metal songs at various tempos',
    ],
    variations: [
      { name: 'Heel-Toe', description: 'Alternating heel and toe strikes for doubled speed per foot' },
      { name: 'Swivel Technique', description: 'Ankle rotation for rapid single-foot patterns' },
      { name: 'Slide Technique', description: 'Sliding foot forward for quick double strokes' },
      { name: 'Constant 16ths', description: 'Sustained alternating foot patterns (RLRL)' },
      { name: 'Gallop', description: 'Triplet-based pattern popularized by Iron Maiden' },
      { name: 'Broken 16ths', description: 'Syncopated patterns mixing single and double strokes' },
    ],
    masters: [
      { name: 'Dave Lombardo', slug: 'dave-lombardo', band: 'Slayer', note: 'Pioneer of thrash double bass' },
      { name: 'George Kollias', slug: 'george-kollias', band: 'Nile', note: 'Extreme speed and endurance master' },
      { name: 'Gene Hoglan', slug: 'gene-hoglan', band: 'Death/Testament', note: 'Technical precision and creativity' },
      { name: 'Joey Jordison', slug: 'joey-jordison', band: 'Slipknot', note: 'Explosive power and speed' },
      { name: 'Mario Duplantier', slug: 'mario-duplantier', band: 'Gojira', note: 'Groove-focused double bass' },
      { name: 'Tomas Haake', slug: 'tomas-haake', band: 'Meshuggah', note: 'Polyrhythmic double bass patterns' },
    ],
    gearRecommendations: {
      pedals: [
        { name: 'Pearl Demon Drive', reason: 'Direct drive feel with interchangeable cams' },
        { name: 'Tama Iron Cobra 900', reason: 'Industry standard for reliability and speed' },
        { name: 'DW 9000 Series', reason: 'Smooth chain drive with excellent feel' },
      ],
      kicks: [
        { name: '22" Bass Drums', reason: 'Standard metal size for punch and speed' },
        { name: '20" Bass Drums', reason: 'Faster response for extreme metal' },
      ],
      heads: [
        { name: 'Evans EMAD', reason: 'Built-in dampening for focused attack' },
        { name: 'Remo Powerstroke P3', reason: 'Clear attack with controlled sustain' },
      ],
      tips: 'Consider spring tension carefully - too tight causes fatigue, too loose loses control. Many pros use slightly different tensions for lead vs. following foot.',
    },
    videos: [
      { title: 'Dave Lombardo Double Bass Lesson', url: 'https://www.youtube.com/watch?v=example3', platform: 'YouTube' },
      { title: 'George Kollias Extreme Feet Workout', url: 'https://www.youtube.com/watch?v=example4', platform: 'YouTube' },
    ],
    relatedTechniques: ['blast-beat', 'triggered-drums', 'odd-time-signatures'],
    seoKeywords: ['double bass drumming', 'double kick technique', 'heel toe technique', 'metal bass drum', 'double pedal tutorial'],
  },

  'gravity-blast': {
    slug: 'gravity-blast',
    title: 'Gravity Blast',
    emoji: '🌀',
    metaTitle: 'Gravity Blast Technique - One-Handed Roll Tutorial | MetalForge',
    metaDescription: 'Learn the gravity blast (one-handed roll) technique. Use gravity and cymbal bounce to achieve incredible snare speeds. Masters, tips, and video tutorials.',
    category: 'extreme',
    difficulty: 'expert',
    bpmRange: '200-320+ BPM',
    description: `The gravity blast (also called one-handed roll or push-pull technique) uses gravity and surface bounce to achieve impossibly fast single-hand snare rolls. By letting the stick fall onto the snare and bounce off the hi-hat or rim, drummers can double their effective stroke rate, achieving speeds that would be impossible with traditional alternating strokes.`,
    history: `The gravity blast technique was popularized in the extreme metal scene during the early 2000s. Johnny Rabb is credited with developing the modern one-handed roll, though similar techniques existed in marching percussion. Derek Roddy (Hate Eternal, Nile) brought the technique to death metal prominence, and it has since been adopted by drummers like Flo Mounier (Cryptopsy) and many modern extreme metal drummers.`,
    howToLearn: [
      'Understand the physics - use gravity and bounce, not muscle',
      'Start by dropping the stick onto the snare and catching the bounce',
      'Practice the push-pull motion slowly before adding speed',
      'Use matched grip with a fulcrum point on the stick',
      'Let the stick do the work - tension is your enemy',
      'Practice with a hard, bouncy surface first',
      'Combine with foot patterns once the hand motion is automatic',
      'Watch slow-motion videos of masters to understand the motion',
    ],
    variations: [
      { name: 'Standard Gravity Blast', description: 'Stick bounces between snare head and hi-hat/rim' },
      { name: 'Free-Hand Gravity', description: 'One hand plays gravity roll while other plays fills' },
      { name: 'Gravity Blast Fill', description: 'Using gravity blast technique for rapid fill patterns' },
    ],
    masters: [
      { name: 'Johnny Rabb', slug: null, band: 'Collective Soul', note: 'Inventor of the modern technique' },
      { name: 'Derek Roddy', slug: null, band: 'Hate Eternal', note: 'Death metal gravity blast pioneer' },
      { name: 'George Kollias', slug: 'george-kollias', band: 'Nile', note: 'Combines gravity blasts with traditional techniques' },
      { name: 'Inferno', slug: 'inferno', band: 'Behemoth', note: 'Uses gravity blasts in black/death metal context' },
    ],
    gearRecommendations: {
      snares: [
        { name: 'High-tension snare heads', reason: 'More bounce = better gravity blast response' },
        { name: 'Shallow snares (5" or less)', reason: 'Faster response and easier stick control' },
      ],
      sticks: [
        { name: 'Balanced sticks (Vic Firth 5A)', reason: 'Proper fulcrum point for gravity technique' },
        { name: 'Hickory or maple', reason: 'Good bounce characteristics' },
      ],
      cymbals: [
        { name: 'Tight hi-hats', reason: 'Provide consistent bounce surface for stick' },
      ],
      tips: 'Head tension is critical - too loose and the stick absorbs into the head; too tight and bounce becomes unpredictable. Find the sweet spot for your playing style.',
    },
    videos: [
      { title: 'Johnny Rabb One-Handed Roll Lesson', url: 'https://www.youtube.com/watch?v=example5', platform: 'YouTube' },
      { title: 'Derek Roddy Gravity Blast Tutorial', url: 'https://www.youtube.com/watch?v=example6', platform: 'YouTube' },
    ],
    relatedTechniques: ['blast-beat', 'one-handed-roll'],
    seoKeywords: ['gravity blast', 'one-handed roll', 'push-pull technique', 'extreme drumming', 'fast snare technique'],
  },

  'polyrhythms': {
    slug: 'polyrhythms',
    title: 'Polyrhythms',
    emoji: '🔢',
    metaTitle: 'Polyrhythms in Metal Drumming - Master Complex Rhythms | MetalForge',
    metaDescription: 'Learn polyrhythmic drumming for metal. Understand 4 over 3, 5 over 4, and other complex rhythms. Famous prog metal drummers and practice techniques.',
    category: 'progressive',
    difficulty: 'advanced',
    bpmRange: 'Any',
    description: `Polyrhythms involve playing two or more conflicting rhythmic patterns simultaneously. In metal drumming, polyrhythms create tension, complexity, and that distinctive "off-kilter" feeling heard in bands like Meshuggah, Tool, and Gojira. Mastering polyrhythms opens up a world of creative possibilities and distinguishes great drummers from good ones.`,
    history: `While polyrhythms have roots in African and Indian classical music, they entered metal through progressive rock. Bill Bruford (King Crimson, Yes) and Neil Peart (Rush) pioneered complex rhythms in rock. In metal, Danny Carey (Tool), Tomas Haake (Meshuggah), and Mario Duplantier (Gojira) have made polyrhythms central to their sound. Meshuggah's trademark sound is built on overlaying 4/4 patterns over odd meter phrases.`,
    howToLearn: [
      'Start with 3:2 polyrhythm - say "pass the golden butter" (3) over a beat (2)',
      'Use a metronome with subdivisions to internalize the patterns',
      'Practice each limb independently before combining',
      'Learn the "convergence point" where both rhythms align',
      'Start with feet playing one pattern, hands playing another',
      'Study Indian tabla counting systems (tala) for deeper understanding',
      'Practice with music that uses polyrhythms (Meshuggah, Tool)',
      'Count out loud while playing to internalize the math',
    ],
    variations: [
      { name: '3:2 (Hemiola)', description: 'Three notes against two - fundamental polyrhythm' },
      { name: '4:3', description: 'Four against three - common in prog metal' },
      { name: '5:4', description: 'Five against four - creates complex tension' },
      { name: '7:4', description: 'Seven against four - Meshuggah signature sound' },
      { name: 'Grouping Displacement', description: 'Shifting accent patterns over steady pulse' },
    ],
    masters: [
      { name: 'Tomas Haake', slug: 'tomas-haake', band: 'Meshuggah', note: 'Master of complex polymetric patterns' },
      { name: 'Danny Carey', slug: 'danny-carey', band: 'Tool', note: 'Incorporates Eastern rhythmic concepts' },
      { name: 'Mario Duplantier', slug: 'mario-duplantier', band: 'Gojira', note: 'Groove-focused polyrhythms' },
      { name: 'Matt Halpern', slug: 'matt-halpern', band: 'Periphery', note: 'Djent-style polyrhythmic patterns' },
      { name: 'Brann Dailor', slug: 'brann-dailor', band: 'Mastodon', note: 'Progressive metal polyrhythm pioneer' },
      { name: 'Mike Portnoy', slug: 'mike-portnoy', band: 'Dream Theater', note: 'Technical prog-metal complexity' },
    ],
    gearRecommendations: {
      electronics: [
        { name: 'Metronome with subdivisions', reason: 'Essential for practicing polyrhythms accurately' },
        { name: 'Loop pedal', reason: 'Record one pattern, play another over it' },
      ],
      drums: [
        { name: 'Sonor SQ2', reason: 'Articulate sound helps distinguish overlapping patterns' },
        { name: 'DW Collector\'s', reason: 'Clear tone separation for complex rhythms' },
      ],
      tips: 'Polyrhythms are about feel, not just math. Once you understand the numbers, forget them and feel the groove. Record yourself to hear how the patterns interact.',
    },
    videos: [
      { title: 'Tomas Haake Polyrhythm Masterclass', url: 'https://www.youtube.com/watch?v=example7', platform: 'YouTube' },
      { title: 'Danny Carey Rhythm Concepts', url: 'https://www.youtube.com/watch?v=example8', platform: 'YouTube' },
    ],
    relatedTechniques: ['odd-time-signatures', 'double-bass'],
    seoKeywords: ['polyrhythms', 'polyrhythmic drumming', 'meshuggah drums', 'complex rhythms', 'prog metal drums'],
  },

  'odd-time-signatures': {
    slug: 'odd-time-signatures',
    title: 'Odd Time Signatures',
    emoji: '⏱️',
    metaTitle: 'Odd Time Signatures in Metal - 7/8, 5/4, and Beyond | MetalForge',
    metaDescription: 'Master odd time signatures in metal drumming. Learn to play in 7/8, 5/4, 11/8 and more. Progressive metal drummers, practice tips, and examples.',
    category: 'progressive',
    difficulty: 'intermediate',
    bpmRange: 'Any',
    description: `Odd time signatures move beyond the standard 4/4 meter that dominates rock and pop music. Playing in 7/8, 5/4, 11/8, or even more complex meters requires a different mindset and creates the distinctive "progressive" sound. From Tool's hypnotic 7/8 grooves to Dream Theater's complex meter changes, odd times are essential for progressive metal.`,
    history: `Odd meters entered rock through progressive bands like King Crimson, Yes, and Rush in the 1970s. Neil Peart's work with Rush brought complex meters to mainstream rock. In metal, Dream Theater (with Mike Portnoy) pushed technical boundaries in the late 1980s. Tool's Danny Carey made odd meters feel natural and groovy. Today, bands like Meshuggah, Animals as Leaders, and Periphery continue to expand rhythmic possibilities.`,
    howToLearn: [
      'Feel odd meters as grouped beats (7/8 = 4+3 or 3+4)',
      'Tap your foot on the "1" of each measure while counting',
      'Start with 5/4 - it\'s closest to 4/4 with an extra beat',
      'Learn songs in odd time - "Schism" (Tool) is 7/8',
      'Practice rudiments in odd time groupings',
      'Use a metronome with programmable accents',
      'Write out patterns on paper to visualize the meter',
      'Practice transitioning between odd and even meters',
    ],
    variations: [
      { name: '5/4', description: 'Five quarter notes per measure - "Take Five" feel' },
      { name: '7/8', description: 'Seven eighth notes - common in Tool songs' },
      { name: '9/8', description: 'Nine eighth notes - often felt as 4+5 or 3+3+3' },
      { name: '11/8', description: 'Eleven eighth notes - complex prog territory' },
      { name: 'Mixed Meters', description: 'Alternating between different time signatures' },
      { name: 'Metric Modulation', description: 'Changing the pulse relationship between meters' },
    ],
    masters: [
      { name: 'Danny Carey', slug: 'danny-carey', band: 'Tool', note: 'Makes odd times feel completely natural' },
      { name: 'Mike Portnoy', slug: 'mike-portnoy', band: 'Dream Theater', note: 'Technical mastery of complex meters' },
      { name: 'Brann Dailor', slug: 'brann-dailor', band: 'Mastodon', note: 'Progressive odd-time fills' },
      { name: 'Matt Garstka', slug: null, band: 'Animals as Leaders', note: 'Modern prog-metal odd time innovator' },
      { name: 'Tomas Haake', slug: 'tomas-haake', band: 'Meshuggah', note: 'Odd groupings over 4/4 foundation' },
      { name: 'Chris Adler', slug: 'chris-adler', band: 'Lamb of God', note: 'Groove metal in complex meters' },
    ],
    gearRecommendations: {
      electronics: [
        { name: 'Programmable metronome', reason: 'Set up odd time clicks with accents' },
        { name: 'DAW with click track', reason: 'Program complex meter changes' },
      ],
      cymbals: [
        { name: 'Meinl Byzance', reason: 'Complex harmonics complement complex rhythms' },
        { name: 'Sabian HHX', reason: 'Articulate for defining odd time accents' },
      ],
      tips: 'Don\'t count - feel. Once you internalize odd meters, they become as natural as 4/4. Start by listening extensively to bands that use odd times before trying to play them.',
    },
    videos: [
      { title: 'Danny Carey Tool Drumming Analysis', url: 'https://www.youtube.com/watch?v=example9', platform: 'YouTube' },
      { title: 'Mike Portnoy Odd Time Masterclass', url: 'https://www.youtube.com/watch?v=example10', platform: 'YouTube' },
    ],
    relatedTechniques: ['polyrhythms', 'double-bass'],
    seoKeywords: ['odd time signatures', 'prog metal drums', '7/8 time', '5/4 drumming', 'complex meters'],
  },

  'one-handed-roll': {
    slug: 'one-handed-roll',
    title: 'One-Handed Roll',
    emoji: '✋',
    metaTitle: 'One-Handed Roll Technique - Push-Pull Drumming | MetalForge',
    metaDescription: 'Learn the one-handed roll (push-pull) technique. Achieve rapid single-hand strokes for fills and blast patterns. Tutorial and famous drummers.',
    category: 'extreme',
    difficulty: 'advanced',
    bpmRange: '200+ notes per minute',
    description: `The one-handed roll allows drummers to play rapid consecutive strokes with a single hand, achieving speeds impossible with standard alternating technique. Using a push-pull or finger control motion, the stick produces two notes per hand motion, effectively doubling your speed potential.`,
    history: `The one-handed roll evolved from traditional rudimental techniques like the push-pull and finger technique. Buddy Rich and other jazz drummers used variations of this technique for rapid single-hand passages. In extreme metal, drummers adapted these concepts for blast beats and rapid fills. Johnny Rabb systematized the "gravity blast" version, while many metal drummers developed their own variations.`,
    howToLearn: [
      'Understand the motion: down stroke followed by an upward flick',
      'Practice on a pillow first to develop muscle memory',
      'Use finger control to bounce the stick for the second stroke',
      'Start at very slow tempos, focusing on two distinct sounds per motion',
      'Keep your wrist loose and relaxed',
      'Practice in front of a mirror to check your form',
      'Build up speed gradually over weeks, not days',
      'Combine with standard alternating for musical application',
    ],
    variations: [
      { name: 'Push-Pull', description: 'Down stroke + upward flip for two notes per hand motion' },
      { name: 'Finger Control', description: 'Using fingers to create bounce for rapid strokes' },
      { name: 'Moeller Technique', description: 'Whipping motion that generates multiple strokes' },
      { name: 'Gravity Blast Application', description: 'One-handed roll combined with surface bounce' },
    ],
    masters: [
      { name: 'Johnny Rabb', slug: null, band: 'Various', note: 'Modern pioneer of the technique' },
      { name: 'George Kollias', slug: 'george-kollias', band: 'Nile', note: 'Applies one-handed rolls in extreme metal' },
      { name: 'Jojo Mayer', slug: null, band: 'Nerve', note: 'Technical master of hand techniques' },
      { name: 'Thomas Lang', slug: null, band: 'Various', note: 'Technical virtuoso' },
    ],
    gearRecommendations: {
      sticks: [
        { name: 'Balanced sticks', reason: 'Proper balance point for push-pull motion' },
        { name: 'Medium weight (5A-5B)', reason: 'Not too heavy for rapid motion' },
      ],
      heads: [
        { name: 'Coated ambassador', reason: 'Good bounce response for technique' },
      ],
      tips: 'The second stroke should come from the rebound, not from additional effort. If you\'re working hard for the second note, you\'re doing it wrong. Let the stick do the work.',
    },
    videos: [
      { title: 'Jojo Mayer Hand Technique', url: 'https://www.youtube.com/watch?v=example11', platform: 'YouTube' },
      { title: 'One-Handed Roll Tutorial', url: 'https://www.youtube.com/watch?v=example12', platform: 'YouTube' },
    ],
    relatedTechniques: ['gravity-blast', 'blast-beat'],
    seoKeywords: ['one-handed roll', 'push-pull technique', 'fast drumming', 'drum roll technique', 'single hand roll'],
  },

  'triggered-drums': {
    slug: 'triggered-drums',
    title: 'Triggered Drums',
    emoji: '🎛️',
    metaTitle: 'Triggered Drums in Metal - Drum Triggers Guide | MetalForge',
    metaDescription: 'Complete guide to triggered drums in metal. Learn why pros use triggers, how to set them up, best trigger systems, and maintain organic feel.',
    category: 'production',
    difficulty: 'intermediate',
    bpmRange: 'Any',
    description: `Drum triggers convert acoustic drum hits into electronic signals, allowing drummers to enhance, replace, or augment their acoustic sound with samples. In extreme metal, triggers ensure consistent kick drum sound at high speeds. While controversial among purists, triggers are an essential tool for modern metal production and live performance.`,
    history: `Electronic triggers emerged in the 1980s with pioneers like Bill Bruford and Neil Peart using them for hybrid kits. In metal, triggered drums became standard in death metal by the mid-1990s as tempo demands exceeded what acoustic drums could reliably deliver. Bands like Fear Factory and Meshuggah embraced the mechanical precision of triggered sounds. Today, most touring metal bands use triggers, though the art lies in maintaining organic feel while gaining consistency.`,
    howToLearn: [
      'Start with a quality trigger module (Roland TM-2, ddrum)',
      'Position triggers correctly on the drum head',
      'Adjust sensitivity to avoid double-triggering',
      'Blend triggered and acoustic sounds for natural feel',
      'Practice with triggers at slow speeds first',
      'Learn to adjust velocity curves for dynamic response',
      'Experiment with different samples for your style',
      'Record with and without triggers to hear the difference',
    ],
    variations: [
      { name: 'Full Replacement', description: 'Triggered sample fully replaces acoustic sound' },
      { name: 'Layered/Blended', description: 'Triggered sample added to acoustic for enhancement' },
      { name: 'Multi-Zone', description: 'Different samples for different hit locations' },
      { name: 'Velocity Sensitive', description: 'Sample changes with hit intensity' },
    ],
    masters: [
      { name: 'Tomas Haake', slug: 'tomas-haake', band: 'Meshuggah', note: 'Pioneered triggered precision in metal' },
      { name: 'Gene Hoglan', slug: 'gene-hoglan', band: 'Death/Testament', note: 'Uses triggers while maintaining dynamic feel' },
      { name: 'Joey Jordison', slug: 'joey-jordison', band: 'Slipknot', note: 'Balanced triggered and acoustic' },
      { name: 'George Kollias', slug: 'george-kollias', band: 'Nile', note: 'Triggers essential for extreme speed clarity' },
      { name: 'Mario Duplantier', slug: 'mario-duplantier', band: 'Gojira', note: 'Triggers with groove sensibility' },
    ],
    gearRecommendations: {
      triggers: [
        { name: 'Roland RT-30K', reason: 'Industry standard kick trigger' },
        { name: 'ddrum Acoustic Pro', reason: 'Great for snare triggering' },
        { name: 'Triggera Krigg', reason: 'Premium precision triggering' },
      ],
      modules: [
        { name: 'Roland TM-2', reason: 'Compact, reliable, industry standard' },
        { name: 'ddrum DDTi', reason: 'Cost-effective with good features' },
        { name: 'Roland TD-27', reason: 'Full-featured for complex setups' },
      ],
      samples: [
        { name: 'GetGood Drums', reason: 'Premium metal drum samples' },
        { name: 'Superior Drummer 3', reason: 'Industry standard with Metal Foundry expansion' },
        { name: 'Steven Slate Drums', reason: 'Punchy metal sounds' },
      ],
      tips: 'The goal is consistency, not replacement. Best triggered sounds still rely on good acoustic technique. Practice without triggers first, then add them for enhancement.',
    },
    videos: [
      { title: 'How to Set Up Drum Triggers', url: 'https://www.youtube.com/watch?v=example13', platform: 'YouTube' },
      { title: 'Triggered vs Acoustic Drums Comparison', url: 'https://www.youtube.com/watch?v=example14', platform: 'YouTube' },
    ],
    relatedTechniques: ['blast-beat', 'double-bass'],
    seoKeywords: ['drum triggers', 'triggered drums', 'metal drum triggering', 'kick trigger', 'drum samples'],
  },

  'groove-drumming': {
    slug: 'groove-drumming',
    title: 'Groove Metal Drumming',
    emoji: '🔨',
    metaTitle: 'Groove Metal Drumming Technique - Heavy Pocket Playing | MetalForge',
    metaDescription: 'Master groove metal drumming technique. Learn to play heavy, in-the-pocket beats. Pantera, Lamb of God, and Gojira style drumming tips and techniques.',
    category: 'foundational',
    difficulty: 'intermediate',
    bpmRange: '90-150 BPM',
    description: `Groove metal drumming prioritizes feel, pocket, and heaviness over speed or technicality. Emerging from thrash metal in the early 1990s, groove metal drumming emphasizes syncopated kick patterns, half-time feels, and the space between notes. It's about making people move, not impressing with chops.`,
    history: `Groove metal emerged in the early 1990s as bands like Pantera, Sepultura, and later Lamb of God shifted focus from thrash speed to heavy, syncopated grooves. Vinnie Paul (Pantera) is considered the godfather of groove metal drumming, with his distinctive half-time feels and powerful kick patterns. Chris Adler (Lamb of God) and Mario Duplantier (Gojira) continued to evolve the style, adding technical elements while maintaining pocket.`,
    howToLearn: [
      'Focus on the kick drum - it carries the groove',
      'Practice playing behind the beat for heavy feel',
      'Learn syncopated kick patterns (the "and" of beats)',
      'Master half-time feels - 1 and 3 on kick, 2 and 4 on snare',
      'Practice with simple patterns before adding fills',
      'Listen to Pantera, Lamb of God, Gojira for reference',
      'Record yourself and check if it "grooves"',
      'Play with a bass player - the pocket lives there',
    ],
    variations: [
      { name: 'Half-Time Feel', description: 'Snare on beat 3 instead of 2 and 4' },
      { name: 'Syncopated Kicks', description: 'Kick drums on off-beats for rhythmic tension' },
      { name: 'Djent-Style', description: 'Tight, palm-muted groove patterns from modern metal' },
      { name: 'Stop-Start Dynamics', description: 'Dramatic pauses followed by heavy hits' },
    ],
    masters: [
      { name: 'Vinnie Paul', slug: 'vinnie-paul', band: 'Pantera', note: 'The godfather of groove metal' },
      { name: 'Chris Adler', slug: 'chris-adler', band: 'Lamb of God', note: 'Technical groove pioneer' },
      { name: 'Mario Duplantier', slug: 'mario-duplantier', band: 'Gojira', note: 'Heavy groove with environmental themes' },
      { name: 'Eloy Casagrande', slug: 'eloy-casagrande', band: 'Sepultura', note: 'Modern groove metal excellence' },
      { name: 'Matt Halpern', slug: 'matt-halpern', band: 'Periphery', note: 'Djent-style progressive groove' },
    ],
    gearRecommendations: {
      drums: [
        { name: 'Tama Starclassic', reason: 'Punchy attack for groove playing' },
        { name: 'Pearl Reference', reason: 'Big low end for heavy grooves' },
      ],
      cymbals: [
        { name: 'Sabian HHX', reason: 'Dark wash without overwhelming the groove' },
        { name: 'Meinl Byzance Dark', reason: 'Complex without being distracting' },
      ],
      snares: [
        { name: 'Deep snares (6.5"+)', reason: 'Fat crack for groove accents' },
        { name: 'Tama S.L.P. G-Maple', reason: 'Big sound with definition' },
      ],
      tips: 'Groove is about restraint. Less is more. A well-placed kick drum hit matters more than a hundred notes. Serve the song, not your ego.',
    },
    videos: [
      { title: 'Vinnie Paul Groove Breakdown', url: 'https://www.youtube.com/watch?v=example15', platform: 'YouTube' },
      { title: 'Chris Adler Lamb of God Tutorial', url: 'https://www.youtube.com/watch?v=example16', platform: 'YouTube' },
    ],
    relatedTechniques: ['double-bass', 'odd-time-signatures'],
    seoKeywords: ['groove metal drumming', 'pantera drums', 'heavy drumming', 'metal groove', 'pocket drumming'],
  },

  'linear-drumming': {
    slug: 'linear-drumming',
    title: 'Linear Drumming',
    emoji: '➡️',
    metaTitle: 'Linear Drumming in Metal - No Overlapping Strokes | MetalForge',
    metaDescription: 'Learn linear drumming technique for metal. No two limbs hit at the same time, creating unique rhythmic textures. Masters, patterns, and practice tips.',
    category: 'progressive',
    difficulty: 'intermediate',
    bpmRange: 'Any',
    description: `Linear drumming is a technique where no two limbs strike simultaneously - each note is separated, creating a continuous stream of single attacks. This approach creates unique textures and rhythmic possibilities, popular in progressive and technical metal. The separation allows each voice of the kit to speak clearly.`,
    history: `Linear drumming became prominent through funk and fusion drummers like Gary Chaffee, Steve Gadd, and David Garibaldi. In metal, progressive drummers adopted linear concepts to add complexity. Matt Garstka (Animals as Leaders) has become synonymous with linear metal drumming, while Brann Dailor (Mastodon) incorporates linear fills throughout his playing.`,
    howToLearn: [
      'Start with simple 4-note patterns (kick-hat-snare-hat)',
      'Practice RLKH patterns (Right hand, Left hand, Kick, Hi-hat)',
      'Use Gary Chaffee\'s Linear Time Playing book',
      'Focus on keeping all notes at equal volume',
      'Practice displacement - moving patterns to different start points',
      'Add variations by changing which drum/cymbal receives which hit',
      'Combine linear patterns with traditional grooves',
      'Write out patterns to visualize the separation',
    ],
    variations: [
      { name: 'Four-Limb Linear', description: 'All four limbs playing in sequence' },
      { name: 'Hand-Foot Linear', description: 'Alternating between hands and feet' },
      { name: 'Linear Fills', description: 'Fills with no overlapping strokes' },
      { name: 'Displaced Linear', description: 'Linear patterns starting on different beats' },
    ],
    masters: [
      { name: 'Matt Garstka', slug: null, band: 'Animals as Leaders', note: 'Modern linear drumming master' },
      { name: 'Brann Dailor', slug: 'brann-dailor', band: 'Mastodon', note: 'Linear fills and progressive patterns' },
      { name: 'Matt Halpern', slug: 'matt-halpern', band: 'Periphery', note: 'Djent-style linear grooves' },
      { name: 'Mario Duplantier', slug: 'mario-duplantier', band: 'Gojira', note: 'Linear elements in groove metal context' },
    ],
    gearRecommendations: {
      cymbals: [
        { name: 'Dry cymbals', reason: 'Quick decay allows linear patterns to speak' },
        { name: 'Stacked cymbals', reason: 'Short sounds for rhythmic definition' },
      ],
      drums: [
        { name: 'Sonor SQ2', reason: 'Articulate attack for defined linear patterns' },
        { name: 'Well-muffled drums', reason: 'Clear separation between notes' },
      ],
      tips: 'Linear drumming requires precise independence. Practice slowly with a metronome, focusing on equal spacing between all notes. Speed comes with accuracy.',
    },
    videos: [
      { title: 'Matt Garstka Linear Drumming Lesson', url: 'https://www.youtube.com/watch?v=example17', platform: 'YouTube' },
      { title: 'Gary Chaffee Linear Concepts', url: 'https://www.youtube.com/watch?v=example18', platform: 'YouTube' },
    ],
    relatedTechniques: ['polyrhythms', 'groove-drumming'],
    seoKeywords: ['linear drumming', 'linear drum patterns', 'progressive metal drums', 'no overlapping drumming', 'drum independence'],
  },

  'fill-techniques': {
    slug: 'fill-techniques',
    title: 'Metal Drum Fills',
    emoji: '🎯',
    metaTitle: 'Metal Drum Fills - Techniques and Patterns | MetalForge',
    metaDescription: 'Master metal drum fills. Learn classic patterns, modern techniques, and how to create powerful transitions. From basic to advanced fill concepts.',
    category: 'foundational',
    difficulty: 'beginner',
    bpmRange: 'Any',
    description: `Drum fills are the transitions that connect musical phrases, build intensity, and showcase a drummer's creativity. In metal, fills range from simple tom patterns to complex polyrhythmic cascades. Great fills serve the song while adding excitement - they're not just technical displays but musical statements.`,
    history: `Metal drum fills evolved from hard rock patterns of the 1970s. John Bonham's thunderous tom fills influenced generations. In thrash, Dave Lombardo and Lars Ulrich developed rapid, aggressive fills. Progressive metal saw complex fills from Portnoy and Carey. Modern metal combines all these elements with technical innovation from drummers like Matt Garstka and Brann Dailor.`,
    howToLearn: [
      'Start with basic 8th note tom patterns descending',
      'Learn the "money fill" - 1 bar of 16th notes ending on beat 1',
      'Practice fills that resolve strongly to the downbeat',
      'Study fills from your favorite drummers and transcribe them',
      'Experiment with ghost notes and dynamics within fills',
      'Practice transitioning smoothly from groove to fill and back',
      'Learn to construct fills using rudiments',
      'Practice fills at various tempos - they feel different at different speeds',
    ],
    variations: [
      { name: 'Tom Cascades', description: 'Descending patterns across toms' },
      { name: 'Single Stroke Rolls', description: 'Rapid alternating strokes for intensity' },
      { name: 'Paradiddle Fills', description: 'Using paradiddle sticking around the kit' },
      { name: 'Flam Fills', description: 'Flams on toms for fat, powerful sound' },
      { name: 'Blast Fill', description: 'Brief blast beat used as fill' },
      { name: 'Linear Fills', description: 'Non-overlapping hand and foot patterns' },
    ],
    masters: [
      { name: 'Dave Lombardo', slug: 'dave-lombardo', band: 'Slayer', note: 'Explosive thrash fills' },
      { name: 'Brann Dailor', slug: 'brann-dailor', band: 'Mastodon', note: 'Complex melodic fills' },
      { name: 'Mike Portnoy', slug: 'mike-portnoy', band: 'Dream Theater', note: 'Technical precision' },
      { name: 'Gene Hoglan', slug: 'gene-hoglan', band: 'Death', note: 'Creative musical fills' },
      { name: 'Joey Jordison', slug: 'joey-jordison', band: 'Slipknot', note: 'Aggressive power fills' },
    ],
    gearRecommendations: {
      toms: [
        { name: 'Well-tuned toms', reason: 'Clear pitch relationships for melodic fills' },
        { name: 'Medium heads', reason: 'Balance of attack and tone' },
      ],
      sticks: [
        { name: 'Vic Firth 5B', reason: 'Extra weight for powerful tom strokes' },
        { name: 'Hickory sticks', reason: 'Durability for hard hitting' },
      ],
      tips: 'Fills should lead somewhere - usually back to the groove. Practice fills that end on beat 1 with a crash. The resolution matters as much as the fill itself.',
    },
    videos: [
      { title: 'Essential Metal Drum Fills', url: 'https://www.youtube.com/watch?v=example19', platform: 'YouTube' },
      { title: 'Dave Lombardo Fill Breakdown', url: 'https://www.youtube.com/watch?v=example20', platform: 'YouTube' },
    ],
    relatedTechniques: ['linear-drumming', 'blast-beat'],
    seoKeywords: ['metal drum fills', 'drum fill patterns', 'drum transitions', 'drum fill tutorial', 'tom patterns'],
  },
};

/**
 * Get all techniques
 */
export function getAllTechniques() {
  return Object.values(techniques);
}

/**
 * Get technique by slug
 */
export function getTechniqueBySlug(slug) {
  return techniques[slug] || null;
}

/**
 * Check if a technique exists
 */
export function hasTechnique(slug) {
  return slug in techniques;
}

/**
 * Get all technique slugs
 */
export function getAllTechniqueSlugs() {
  return Object.keys(techniques);
}

/**
 * Get techniques by category
 */
export function getTechniquesByCategory(category) {
  return Object.values(techniques).filter(t => t.category === category);
}

/**
 * Get techniques by difficulty
 */
export function getTechniquesByDifficulty(difficulty) {
  return Object.values(techniques).filter(t => t.difficulty === difficulty);
}

/**
 * Get related techniques for a given technique slug
 */
export function getRelatedTechniques(slug) {
  const technique = techniques[slug];
  if (!technique || !technique.relatedTechniques) return [];
  return technique.relatedTechniques.map(relSlug => techniques[relSlug]).filter(Boolean);
}

/**
 * Get techniques that feature a specific drummer
 */
export function getTechniquesForDrummer(drummerSlug) {
  return Object.values(techniques).filter(t => 
    t.masters.some(m => m.slug === drummerSlug)
  );
}

/**
 * Categories with metadata
 */
export const TECHNIQUE_CATEGORIES = {
  extreme: { label: 'Extreme Metal', emoji: '🔥', description: 'High-speed techniques for death, black, and grind' },
  progressive: { label: 'Progressive', emoji: '🧠', description: 'Complex rhythms and odd time signatures' },
  foundational: { label: 'Foundational', emoji: '🎯', description: 'Essential techniques for all metal drummers' },
  production: { label: 'Production', emoji: '🎛️', description: 'Studio and live sound techniques' },
};

/**
 * Difficulty levels
 */
export const DIFFICULTY_LEVELS = {
  beginner: { label: 'Beginner', emoji: '🌱', color: '#22c55e' },
  intermediate: { label: 'Intermediate', emoji: '🌿', color: '#eab308' },
  advanced: { label: 'Advanced', emoji: '🌲', color: '#f97316' },
  expert: { label: 'Expert', emoji: '🔥', color: '#dc2626' },
};
