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
      { title: 'Understanding Polyrhythms for Drummers', url: 'https://www.youtube.com/watch?v=U9CgR2Y6XO4', platform: 'YouTube' },
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
      { title: 'Danny Carey - Tool Drumming Breakdown', url: 'https://www.youtube.com/watch?v=FssULNGSZIA', platform: 'YouTube' },
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
    ],
    relatedTechniques: ['linear-drumming', 'blast-beat'],
    seoKeywords: ['metal drum fills', 'drum fill patterns', 'drum transitions', 'drum fill tutorial', 'tom patterns'],
  },

  'ghost-notes': {
    slug: 'ghost-notes',
    title: 'Ghost Notes',
    emoji: '👻',
    metaTitle: 'Ghost Notes Drumming Technique - How to Play Ghost Notes | MetalForge',
    metaDescription: 'Learn the ghost note drumming technique. History, how to practice dynamic control, famous metal drummers who use it, gear recommendations, and tips.',
    category: 'foundational',
    difficulty: 'intermediate',
    bpmRange: 'Any',
    description: `Ghost notes are quiet, subtle snare drum hits played between the main backbeat accents, adding rhythmic complexity and groove without altering the overall volume dynamic of a pattern. In metal drumming, ghost notes create the illusion of a busier, more intricate performance while the backbone groove remains locked in place. Mastering dynamic control between loud accents and near-silent ghost strokes separates mechanically precise drummers from those with true musicality and pocket.`,
    history: `Ghost notes trace their origin to funk and R&B drumming of the 1960s and 70s, where drummers like Clyde Stubblefield (James Brown) and David Garibaldi (Tower of Power) used low-velocity snare hits to create syncopated, danceable grooves. As metal absorbed groove and funk influences throughout the 1990s and 2000s, drummers began incorporating ghost notes into heavier contexts. Progressive metalcore and djent drummers such as Chris Turner (Oceans Ate Alaska) weave dense ghost-note patterns beneath compositionally independent hand parts, using the technique to add textural depth without disrupting the primary backbeat. Drummers influenced by fusion and funk vocabulary, like John Otto (Limp Bizkit) and Matt Halpern (Periphery), integrate ghost notes into nu-metal and djent contexts respectively, proving the technique's versatility across metal's many subgenres. What began as a subtle funk ornamentation has become an essential tool for adding groove and sophistication to modern metal drumming, especially in genres where technical density needs to coexist with pocket and feel.`,
    howToLearn: [
      'Start by playing a basic backbeat pattern (snare on 2 and 4) at a comfortable tempo',
      'Add quiet snare hits on the 16th note subdivisions between the main backbeat, keeping them nearly silent',
      'Practice with a metronome, focusing on dramatic dynamic contrast between accents and ghost notes',
      'Use wrist and finger control rather than arm motion to produce consistent low-velocity strokes',
      'Isolate the snare hand and practice accent-ghost-ghost-accent patterns repeatedly',
      'Study funk drumming (James Brown, Tower of Power) to internalize the feel',
      'Gradually increase pattern complexity by adding ghost notes to more 16th note subdivisions',
      'Record yourself to check that ghost notes are audible but clearly subordinate to accents',
    ],
    variations: [
      { name: 'Single Ghost Note', description: 'One quiet snare hit inserted between backbeat accents' },
      { name: 'Ghost Note Flurries', description: 'Multiple consecutive ghost notes creating a rolling, syncopated texture' },
      { name: 'Cross-Stick Ghosting', description: 'Using a rim click instead of a full snare hit for a different ghost tone' },
      { name: 'Displaced Ghost Patterns', description: 'Shifting ghost note placement to create asymmetric, syncopated grooves' },
    ],
    masters: [
      { name: 'Chris Turner', slug: 'chris-turner', band: 'Oceans Ate Alaska', note: 'Weaves dense ghost-note patterns beneath polyrhythmic hand parts' },
      { name: 'John Otto', slug: 'john-otto', band: 'Limp Bizkit', note: 'Brings funk-informed ghost note vocabulary to nu-metal grooves' },
      { name: 'Matt Halpern', slug: 'matt-halpern', band: 'Periphery', note: 'Uses ghost notes to add texture to djent-style patterns' },
    ],
    gearRecommendations: {
      snares: [
        { name: 'Shallow maple snares (5"-5.5")', reason: 'Fast response captures low-velocity ghost strokes clearly' },
        { name: 'Tama S.L.P. G-Maple', reason: 'Sensitive head response for ghost note articulation' },
      ],
      sticks: [
        { name: 'Lighter sticks (5A or 7A)', reason: 'Easier control for low-velocity finger strokes' },
      ],
      heads: [
        { name: 'Coated Ambassador', reason: 'Sensitive to light touches without sacrificing backbeat crack' },
      ],
      tips: 'Head tension and snare wire adjustment matter enormously for ghost notes - too tight and quiet hits disappear, too loose and they buzz uncontrollably. Spend time dialing in your snare specifically for dynamic range.',
    },
    videos: [
    ],
    relatedTechniques: ['groove-drumming', 'fill-techniques', 'linear-drumming'],
    seoKeywords: ['ghost notes drumming', 'ghost note technique', 'how to play ghost notes', 'metal drum dynamics', 'snare ghost notes tutorial'],
  },

  'rudiments': {
    slug: 'rudiments',
    title: 'Rudiments & Stick Control',
    emoji: '🥁',
    metaTitle: 'Rudiments & Stick Control for Metal Drummers | MetalForge',
    metaDescription: 'Master drum rudiments and stick control for metal drumming. Single strokes, paradiddles, flams, and more. Famous metal drummers, gear, and practice tips.',
    category: 'foundational',
    difficulty: 'beginner',
    bpmRange: 'Any',
    description: `Rudiments are the standardized sticking patterns and combinations - single strokes, double strokes, paradiddles, flams, drags, and rolls - that form the alphabet of drumming technique. Originally codified for military and marching percussion, the 40 essential rudiments (as defined by the Percussive Arts Society) provide the vocabulary from which virtually all drum fills, patterns, and independence exercises are built. In metal drumming, rudimental control translates directly into cleaner fills, faster single-hand technique, and the stick control necessary for extreme tempos.`,
    history: `Rudiments date back centuries to military drumming, where standardized patterns allowed drum corps to communicate battlefield commands with precision. The rudiments were formalized in the United States by the National Association of Rudimental Drummers in the 1930s, later expanded to the 40 International Drum Rudiments recognized by the Percussive Arts Society. Drum corps and marching percussion programs became the training ground for generations of technically elite drummers. In metal, Mike Mangini (Dream Theater) brought his drum corps and rudimental background directly into progressive metal, using paradiddle-based sticking to construct intricate fills and odd-time patterns. Gavin Harrison (Porcupine Tree, King Crimson) is renowned for applying rudimental sticking concepts to displaced and polymetric grooves, while Matt Garstka (Animals as Leaders) uses rudiment-derived linear patterns extensively in his progressive, jazz-influenced metal playing. Though rudiments originated far from metal's aesthetic, their systematic approach to sticking control underlies nearly every fast, clean technical passage in modern metal drumming.`,
    howToLearn: [
      'Master the single stroke roll first - alternating RLRL at a slow, controlled tempo',
      'Learn the double stroke roll (RRLL) focusing on even volume between both strokes',
      'Practice the paradiddle (RLRR LRLL) - the gateway rudiment connecting singles and doubles',
      'Work through flams, drags, and ruffs slowly before adding speed',
      "Use a rudiment book or app (Vic Firth's 40 rudiments) as a structured curriculum",
      'Practice each rudiment starting slow and gradually increasing tempo over weeks',
      'Apply rudiments around the drum kit, not just on a practice pad',
      'Record yourself to check for consistent volume and timing between hands',
    ],
    variations: [
      { name: 'Single Stroke Roll', description: 'Basic alternating RLRL pattern - the foundation of all rudiments' },
      { name: 'Double Stroke Roll', description: 'RRLL pattern building control and speed through bounced strokes' },
      { name: 'Paradiddle', description: 'RLRR LRLL sticking combining singles and doubles for versatile patterns' },
      { name: 'Flam', description: 'A grace note plus main note struck almost simultaneously for a fat accent' },
      { name: 'Drag (Ruff)', description: 'Two grace notes before the main stroke, adding rhythmic texture' },
    ],
    masters: [
      { name: 'Mike Mangini', slug: 'mike-mangini', band: 'Dream Theater', note: 'Drum corps background makes him the most rudiment-centric player in progressive metal' },
      { name: 'Gavin Harrison', slug: 'gavin-harrison', band: 'Porcupine Tree / King Crimson', note: 'Applies rudimental sticking to displaced and polymetric grooves' },
      { name: 'Matt Garstka', slug: 'matt-garstka', band: 'Animals as Leaders', note: 'Builds linear fills and independence exercises from rudiment vocabulary' },
    ],
    gearRecommendations: {
      sticks: [
        { name: 'Vic Firth American Classic 5A', reason: 'Balanced weight ideal for rudiment practice and stick control drills' },
        { name: 'Practice sticks with rubber tips', reason: 'Reduce bounce noise for quiet rudiment practice' },
      ],
      practice: [
        { name: 'Drum practice pad (Evans RealFeel)', reason: 'Realistic bounce for developing rudiment technique without a full kit' },
        { name: 'Metronome with subdivisions', reason: 'Essential for building rudiments cleanly at any tempo' },
      ],
      tips: 'Rudiments should be practiced daily, even for just 15-20 minutes. Consistency beats intensity - slow, controlled repetition builds the muscle memory that translates into clean technique at performance tempo.',
    },
    videos: [
    ],
    relatedTechniques: ['fill-techniques', 'one-handed-roll', 'linear-drumming'],
    seoKeywords: ['drum rudiments', 'stick control', 'rudiments for metal drummers', 'paradiddle tutorial', 'drum rudiments for beginners'],
  },

  'hand-foot-independence': {
    slug: 'hand-foot-independence',
    title: 'Hand-Foot Independence',
    emoji: '🧩',
    metaTitle: 'Hand-Foot Independence Drumming Technique | MetalForge',
    metaDescription: 'Learn hand-foot independence for metal drumming. Play distinct, non-overlapping rhythms with hands and feet. Masters like Meshuggah, Tool, gear, and tips.',
    category: 'foundational',
    difficulty: 'intermediate',
    bpmRange: 'Any',
    description: `Hand-foot independence is the ability to play rhythmically distinct patterns with the hands and feet simultaneously, without one limb's motion influencing another's. This foundational skill underlies nearly every advanced metal drumming technique, from polyrhythms to linear drumming to Meshuggah-style polymetric riffing. Without genuine independence, limbs tend to "leak" into each other, causing accents to blur and complex patterns to collapse into simpler, more habitual groupings.`,
    history: `Independence training has roots in jazz drumming, where Elvin Jones and Tony Williams pioneered playing conversational, independent patterns across the kit while maintaining time. In metal, hand-foot independence became a defining skill through Tomas Haake of Meshuggah, whose polymetric riffs require the hands to lock with guitar riffs in odd note groupings while the feet maintain a separate, often conflicting pulse - a technique that redefined what was rhythmically possible in extreme metal. Danny Carey (Tool) similarly built a career on layering independent hand and foot patterns influenced by Eastern rhythmic systems, creating grooves that feel simultaneously hypnotic and mathematically complex. Mike Portnoy (Dream Theater) developed independence through relentless practice routines derived from Gary Chester's "New Breed" system, applying four-way coordination to progressive metal's demanding compositions. Together these drummers demonstrated that true independence isn't about playing more notes - it's about liberating each limb to serve the music's rhythmic architecture rather than defaulting to familiar, connected patterns.`,
    howToLearn: [
      'Start with basic ostinatos - keep a simple repeating pattern on hi-hat while varying the snare',
      'Practice one limb at a time until each pattern is completely automatic',
      "Use Gary Chester's \"New Breed\" system for structured four-way coordination exercises",
      'Isolate hands and feet separately before attempting to combine them',
      'Practice extremely slowly - independence breaks down first at speed, not at complexity',
      'Layer polyrhythmic foot patterns under simple hand grooves, then reverse the roles',
      'Use a loop pedal or drum machine to hold one pattern steady while you vary another',
      'Be patient - true independence takes months or years of consistent practice to internalize',
    ],
    variations: [
      { name: 'Ostinato Independence', description: 'One steady repeating pattern (usually hi-hat or kick) while other limbs improvise' },
      { name: 'Polymetric Independence', description: 'Hands and feet playing patterns of different lengths that phase against each other' },
      { name: 'Four-Way Coordination', description: 'All four limbs playing independent, interlocking rhythmic roles simultaneously' },
      { name: 'Melodic Independence', description: 'Feet carrying a rhythmic "riff" while hands provide coloristic accents' },
    ],
    masters: [
      { name: 'Tomas Haake', slug: 'tomas-haake', band: 'Meshuggah', note: "Polymetric limb independence defines Meshuggah's rhythmic identity" },
      { name: 'Danny Carey', slug: 'danny-carey', band: 'Tool', note: 'Layers Eastern-influenced independent patterns across all four limbs' },
      { name: 'Mike Portnoy', slug: 'mike-portnoy', band: 'Dream Theater', note: 'Built independence through Gary Chester-derived coordination systems' },
    ],
    gearRecommendations: {
      electronics: [
        { name: 'Metronome with subdivisions', reason: 'Essential for keeping time while limbs diverge rhythmically' },
        { name: 'Loop pedal', reason: 'Hold one independent pattern steady while practicing variations on another limb' },
      ],
      drums: [
        { name: "Sonor SQ2 or DW Collector's", reason: 'Clear tonal separation helps distinguish independent limb patterns' },
      ],
      tips: 'Independence is built slowly and cannot be rushed. Practice each limb combination at a tempo where you can maintain it flawlessly for several minutes before increasing speed.',
    },
    videos: [
    ],
    relatedTechniques: ['linear-drumming', 'polyrhythms', 'double-bass'],
    seoKeywords: ['hand foot independence drumming', 'drum independence exercises', 'limb independence', 'meshuggah drumming technique', 'four way coordination drums'],
  },

  'd-beat': {
    slug: 'd-beat',
    title: 'D-Beat',
    emoji: '🚂',
    metaTitle: 'D-Beat Drumming Technique - How to Play D-Beat | MetalForge',
    metaDescription: 'Learn the D-beat drumming technique. History, how to practice the Discharge beat, famous drummers who use it, gear recommendations, and crust/extreme metal context.',
    category: 'extreme',
    difficulty: 'beginner',
    bpmRange: '160-220+ BPM',
    description: `The D-beat is the driving, syncopated punk drumbeat named after the pioneering UK hardcore band Discharge, built around a galloping bass-and-snare pulse under a steady, often washy hi-hat or crash-ride pattern. Rhythmically it is deceptively simple compared to a blast beat or gravity blast, but its relentless forward momentum and stamina demands make it a foundational extreme-metal pattern in its own right. Since the early 1980s, the D-beat has migrated far beyond hardcore punk into crust punk, blackened crust, and D-beat-adjacent extreme metal, where it provides a driving counterpoint to blast beats and downtuned, sludge-weighted breakdowns.`,
    history: `Discharge's UK anarcho-punk recordings of the early 1980s codified the pattern that would carry the band's own name, and it quickly became the rhythmic backbone of the wider UK anarcho-punk scene alongside Amebix and Antisect. Sweden's Wolfpack and Skitsystem carried a faster, more distorted D-beat lineage through the 1990s, while America's Tragedy and His Hero Is Gone fused the pattern with metal-scale weight to define modern crust's template. The D-beat also crossed directly into metal through crossover thrash: Charlie Benante's Stormtroopers of Death recordings paired D-beat-adjacent hardcore urgency with thrash precision, and Dave Lombardo's punk-rooted session catalog across Fantômas, Dead Cross, and Suicidal Tendencies kept that hardcore pulse alive alongside his foundational Slayer thrash work. Igor Cavalera's raw, politically charged early Sepultura and Soulfly recordings carried a similar hardcore-informed intensity, paralleling crust's anarcho-political, DIY ethos. Today the D-beat remains one of metal's most recognizable patterns, powering everything from straightforward crust punk to blackened crust bands that alternate it with full blast-beat extremity.`,
    howToLearn: [
      'Start with the core pattern: bass drum on every downbeat with the snare landing on the off-beats, creating a galloping feel',
      'Keep the hi-hat or ride steady and driving underneath - the pattern lives or dies on consistent time',
      'Practice at a moderate 120-140 BPM first, focusing on evenness before chasing speed',
      'Add the "skank beat" variation - snare and kick both landing on the same subdivision for a more chaotic, driving feel',
      'Build stamina - D-beat songs are often played at sustained tempo for full song lengths with little rest',
      'Listen to Discharge\'s early recordings to internalize the phrasing before adding your own variations',
      'Practice transitioning between D-beat and blast beat or breakdown sections for blackened crust applications',
      'Work on open hi-hat and crash-ride variations to add texture without losing the driving pulse',
    ],
    variations: [
      { name: 'Classic D-Beat', description: 'The original Discharge pattern - driving kick and off-beat snare under a steady hi-hat' },
      { name: 'Swedish D-Beat', description: 'Faster, more distorted variation popularized by Wolfpack and Skitsystem' },
      { name: 'Blackened Crust D-Beat', description: 'D-beat alternated or layered with blast beats and tremolo-picked riffing' },
      { name: 'Crossover D-Beat', description: 'D-beat hybridized with thrash metal precision, as heard in crossover thrash' },
    ],
    masters: [
      { name: 'Dave Lombardo', slug: 'dave-lombardo', band: 'Slayer', note: 'Punk-rooted session catalog across Fantômas, Dead Cross, and Suicidal Tendencies keeps D-beat energy alive alongside his foundational thrash work' },
      { name: 'Charlie Benante', slug: 'charlie-benante', band: 'Anthrax', note: 'Stormtroopers of Death recordings fused D-beat-adjacent hardcore urgency with thrash-metal precision' },
      { name: 'Igor Cavalera', slug: 'igor-cavalera', band: 'Sepultura', note: 'Raw, politically-charged early Sepultura and Soulfly work parallels D-beat-driven crust\'s DIY intensity' },
    ],
    gearRecommendations: {
      snares: [
        { name: 'Tama SLP Steel', reason: 'Cutting, raw crack that suits D-beat\'s driving, unpolished character' },
        { name: 'Pearl Sensitone Steel', reason: 'Crisp response for sustained off-beat snare work' },
      ],
      cymbals: [
        { name: 'Trashy/washy crash-rides', reason: 'A dirtier, less controlled cymbal wash matches the raw D-beat aesthetic' },
      ],
      sticks: [
        { name: 'Vic Firth 5B', reason: 'Extra weight helps drive the pattern\'s relentless energy without excess fatigue' },
      ],
      tips: 'D-beat rewards raw, slightly loose tuning and cymbal choices over pristine, controlled tones. Many D-beat and crust drummers favor a rough, live-room sound over studio polish.',
    },
    videos: [
    ],
    relatedTechniques: ['blast-beat', 'groove-drumming', 'double-bass'],
    seoKeywords: ['d-beat', 'd-beat drumming', 'how to play d-beat', 'discharge beat', 'crust punk drums', 'd-beat tutorial'],
  },

  'moeller-technique': {
    slug: 'moeller-technique',
    title: 'Moeller Technique',
    emoji: '🌊',
    metaTitle: 'Moeller Technique - Whip Stroke Drumming Method | MetalForge',
    metaDescription: 'Learn the Moeller technique drumming method. Master the whip-like down-up-tap stroke for speed, power, and control. Metal drummers who use it, practice steps, and gear tips.',
    category: 'foundational',
    difficulty: 'intermediate',
    bpmRange: 'Any',
    description: `The Moeller technique is a whip-like stroke method built around a down-up-tap motion sequence, using the arm, wrist, and fingers together to generate multiple strokes from a single arm movement. Rather than muscling out each note individually, the technique lets gravity and rebound do the work, producing speed, power, and volume control while conserving energy over long passages. It is foundational to many metal drummers' fast single-stroke rolls, efficient blast-beat endurance, and sustained double-bass technique, because it replaces repetitive muscular effort with a whipping motion that recovers itself for the next stroke. Drummers who rely on the Moeller technique tend to show noticeably less arm and leg fatigue during extended fast passages than those relying on pure muscle strength, which is precisely why it underlies so much of extreme metal's sustained speed.`,
    history: `The technique takes its name from Sanford "Gus" Moeller, who documented a whip-like stroke method rooted in Civil War-era drum corps playing in his 1925 book "The Moeller Book." Jazz and rock drummers carried the technique forward through the 20th century as a way to generate speed and power without tension. In metal, Mike Mangini (Dream Theater) applied biomechanical analysis to refine and expand traditional Moeller principles into a personal system enabling sustained speed without injury, part of the mathematical "Rhythm Knowledge" framework he built around efficient stick motion. Inferno (Behemoth) uses a Moeller-influenced technique on his single-stroke blast beats, optimizing for endurance across full live sets rather than chasing maximum tempo alone. Frost (Satyricon, 1349) applies an ankle-driven, Moeller-adjacent approach to his double-kick work, allowing sustained blast-beat velocity across long extreme-metal passages without the leg fatigue that a purely muscular technique would cause.`,
    howToLearn: [
      'Start with a single downstroke - let the stick fall and strike the drum with a relaxed wrist',
      'Add the "whip" - after the downstroke, let the stick rebound upward before the next motion, rather than lifting it manually',
      'Practice the full down-up-tap sequence slowly: a full stroke, a rebounding upstroke, and a small tap, all from one arm motion',
      'Keep the wrist and fingers loose - tension kills the whip motion that makes the technique efficient',
      'Practice on a pad first so you can feel the rebound clearly before applying it to a drum',
      'Apply the motion to single-stroke rolls, gradually increasing speed as the whip becomes automatic',
      'Work the same whip motion into your feet for double-bass and blast-beat endurance',
      'Be patient - Moeller technique often takes months of slow, deliberate practice before it feels natural at speed',
    ],
    variations: [
      { name: 'Full Moeller Whip', description: 'Complete down-up-tap motion generating multiple distinct strokes from one arm movement' },
      { name: 'Moeller for Feet', description: 'Ankle-driven whip motion applied to double bass pedal work for sustained speed' },
      { name: 'Accented Moeller', description: 'Using the whip\'s natural accent on the downstroke to build dynamic phrasing into fills' },
      { name: 'Moeller-Assisted Blast Beat', description: 'Whip motion applied to single-stroke blast patterns for endurance over raw top speed' },
    ],
    masters: [
      { name: 'Mike Mangini', slug: 'mike-mangini', band: 'Dream Theater', note: 'Refined traditional Moeller principles into a biomechanical system for sustained speed without injury' },
      { name: 'Inferno', slug: 'inferno', band: 'Behemoth', note: 'Moeller-influenced single-stroke blast beats built for endurance across full live sets' },
      { name: 'Frost', slug: 'frost', band: 'Satyricon/1349', note: 'Ankle-driven, Moeller-adjacent double-kick technique sustains blast velocity without leg fatigue' },
    ],
    gearRecommendations: {
      sticks: [
        { name: 'Vic Firth American Classic 5A', reason: 'Balanced weight lets the whip motion and rebound do the work' },
        { name: 'Practice sticks with rubber tips', reason: 'Quiet, controlled rebound practice for the down-up-tap motion' },
      ],
      practice: [
        { name: 'Drum practice pad (Evans RealFeel)', reason: 'Consistent, realistic bounce for feeling the Moeller rebound' },
      ],
      pedals: [
        { name: 'Direct-drive double pedal', reason: 'Responsive footboard supports an ankle-driven Moeller-style whip motion' },
      ],
      tips: 'The Moeller whip should feel effortless once mastered - if your arm or ankle feels tense or tired quickly, you are still muscling the stroke rather than letting gravity and rebound generate it.',
    },
    videos: [
    ],
    relatedTechniques: ['blast-beat', 'one-handed-roll', 'hand-foot-independence'],
    seoKeywords: ['moeller technique', 'moeller method drumming', 'whip stroke drumming', 'moeller technique tutorial', 'drum stroke technique'],
  },

  'heel-toe-technique': {
    slug: 'heel-toe-technique',
    title: 'Heel-Toe Technique',
    emoji: '🥾',
    metaTitle: 'Heel-Toe Technique - Double Bass Pedal Footwork | MetalForge',
    metaDescription: 'Learn the heel-toe drumming technique for faster double bass. History, practice steps, pedal gear recommendations, and the metal drummers who use it.',
    category: 'foundational',
    difficulty: 'intermediate',
    bpmRange: 'Any',
    description: `Heel-toe technique is a bass drum pedal method that produces two beater strokes from a single downward leg motion, using the ball of the foot for an initial toe stroke and a quick heel-drop rebound for a second stroke immediately after. Rather than driving every note with a fresh leg lift, the foot rocks forward-to-back across the footboard, doubling the strokes available per motion and unlocking bursts of double bass speed well beyond what pure ankle-driven playing can sustain on its own. It is most often layered on top of a primary footwork style rather than used for an entire performance - many extreme metal drummers rely on heel-up ankle technique as their endurance baseline and drop into heel-toe only for short, demanding passages that call for an extra gear of speed. Because the technique depends on the heel having room to rock without losing contact with the board, it is closely tied to pedal choice: a short, standard-length footboard limits it, while a longer plate makes the second stroke far easier to control.`,
    history: `Heel-toe pedal technique grew out of the same drum-corps and rudimental-percussion lineage that produced hand techniques like the Moeller stroke, adapted to the bass drum pedal as drummers chased faster single- and double-pedal speeds through the 1990s and 2000s. George Kollias (Nile) is the technique's most visible modern practitioner, sustaining blast beats past 240-280 BPM with a heel-toe approach refined well enough that he co-designed the Pearl Demon XR double pedal specifically around its footboard demands, then documented the technique in instructional books and clinics that spread it to a global audience of extreme metal drummers. Derek Roddy (Hate Eternal, ex-Nile) built his career on heel-up ankle technique for sustained blast-beat endurance, layering heel-toe strokes in only for short bursts of extra double bass speed - a deliberate two-technique approach that helped him record entire albums in single takes without punch-ins or editing. Gene Hoglan has likewise built his double bass approach around heel-toe motion and consistent stroke weight, prioritizing pedal feel and response time over any single brand or model.`,
    howToLearn: [
      'Set your pedal up with a longboard or extended footboard - a short standard board makes the heel-drop hard to control',
      'Place your whole foot flat on the footboard, with the ball resting near the beater pivot point',
      'Press down with the ball of the foot for the first (toe) stroke',
      'Immediately let your heel drop onto the back of the footboard for the second (heel) stroke - it should feel like one rocking motion, not two separate presses',
      'Practice the two-stroke rock slowly on a single pedal at 40-60 BPM until both strokes are even in volume',
      'Isolate the motion on a practice pad or unplugged pedal before applying it to a mic\'d-up kick drum',
      'Apply short heel-toe bursts inside a heel-up double bass groove rather than defaulting to heel-toe for everything',
      'Increase speed gradually, and only tighten spring tension once the motion is already comfortable and even',
    ],
    variations: [
      { name: 'Full Heel-Toe', description: 'Continuous heel-toe strokes on one foot for sustained, doubled-speed passages' },
      { name: 'Burst Heel-Toe', description: 'Heel-toe strokes used only for short bursts of extra speed within an otherwise heel-up pattern' },
      { name: 'Double Pedal Heel-Toe', description: 'Heel-toe applied to both feet on a double pedal for maximal sustained double bass output' },
      { name: 'Heel-Toe with Swivel', description: 'Combining heel-toe rocking with ankle swivel rotation for even more strokes per motion' },
    ],
    masters: [
      { name: 'George Kollias', slug: 'george-kollias', band: 'Nile', note: 'Co-designed the Pearl Demon XR pedal around his heel-toe technique and sustains blast beats past 240 BPM with it' },
      { name: 'Derek Roddy', slug: 'derek-roddy', band: 'Hate Eternal', note: 'Layers heel-toe strokes into a heel-up foundation for short bursts of extra double bass speed' },
      { name: 'Gene Hoglan', slug: 'gene-hoglan', band: 'Death/Testament', note: 'Builds his double bass approach around heel-toe motion and consistent stroke weight' },
    ],
    gearRecommendations: {
      pedals: [
        { name: 'Pearl Demon XR', reason: 'Co-designed with George Kollias specifically around heel-toe footboard demands' },
        { name: 'Axis A Longboard', reason: 'Extended footboard gives the heel room to rock without losing contact' },
        { name: 'Tama Speed Cobra 910', reason: 'Longboard footboard suited to heel-toe and sliding technique' },
      ],
      tips: 'A short, standard-length footboard limits how far the heel can travel - most heel-toe players prefer a longboard or extended-plate pedal for a cleaner second stroke.',
    },
    videos: [
    ],
    relatedTechniques: ['double-bass', 'hand-foot-independence'],
    seoKeywords: ['heel-toe technique', 'heel toe drumming', 'double bass pedal technique', 'how to play heel toe', 'bass drum footwork technique'],
  },

  'buzz-roll': {
    slug: 'buzz-roll',
    title: 'Buzz Roll',
    emoji: '🔁',
    metaTitle: 'Buzz Roll Technique - Multiple Bounce Roll Rudiment | MetalForge',
    metaDescription: 'Learn the buzz roll (multiple-bounce roll) drumming rudiment. History, practice steps, dynamics control, and how metal drummers use roll technique.',
    category: 'foundational',
    difficulty: 'beginner',
    bpmRange: 'Any',
    description: `The buzz roll - also called the multiple-bounce roll or press roll - is produced by pressing the stick into the head just enough that it bounces several times per stroke instead of once, creating a sustained, blurred "buzz" of sound rather than distinct individual hits. It is one of the Percussive Arts Society's 40 essential rudiments and the foundation of concert snare and drum corps roll vocabulary, used to sustain volume and tension across a held note the same way a bowed string instrument sustains a note. In metal drumming, buzz rolls show up less as a groove element and more as a texture and dynamics tool - a crescendo into a fill, a sustained wash under a cymbal swell, or a dramatic build leading into a breakdown or blast section.`,
    history: `The buzz roll's technical foundation goes back to military and concert snare drumming, where a controlled multiple-bounce stroke let a single drummer sustain volume across long passages without the stamina cost of playing every note as a discrete single stroke. It was formally codified as one of the Percussive Arts Society's 40 essential rudiments, alongside the closely related closed (concert) roll and open double-stroke roll, and remains core vocabulary in drum corps and orchestral percussion training today. Metal drummers with rudimental or drum corps backgrounds carry the buzz roll's control and touch into their extreme-metal playing even when the roll itself rarely appears note-for-note in a groove - Mike Mangini (Dream Theater) built his drum-corps-rooted approach to stick control around exactly this kind of multiple-bounce roll vocabulary, while Gavin Harrison (Porcupine Tree, King Crimson) applies the same rudimental roll discipline to the dynamic control that defines his playing.`,
    howToLearn: [
      'Start with a single controlled stroke - let the stick fall and press slightly into the head rather than lifting immediately',
      'Find the right pressure - too little produces a single clean hit, too much chokes the head and kills the bounce',
      'Practice one buzz per hand slowly, focusing on getting 3-5 even bounces per stroke before speeding up',
      'Alternate hands (RLRL) once single-hand buzzes are controlled, keeping the transition between hands seamless',
      'Practice dynamics - build a slow crescendo from pianissimo to fortissimo across a sustained roll',
      'Use a practice pad first, since the rebound feel is easier to isolate there than on a full-tension batter head',
      'Apply the roll musically - use it as a short fill-in before a section change rather than as a constant groove element',
    ],
    variations: [
      { name: 'Closed (Concert) Buzz Roll', description: 'Tight, pressed bounces for a smooth, sustained orchestral-style roll' },
      { name: 'Open Buzz Roll', description: 'Looser bounce with more separation between pulses, for a rawer, driving roll' },
      { name: 'Crescendo Roll', description: 'Buzz roll built from quiet to loud, common as a build before a chorus or blast section' },
      { name: 'Buzz Roll Fill', description: 'A short buzz roll used to fill a beat or half-beat, common in doom and sludge for tension before a riff hit' },
    ],
    masters: [
      { name: 'Mike Mangini', slug: 'mike-mangini', band: 'Dream Theater', note: 'Drum corps background gives him the multiple-bounce roll control that underlies his rudiment-centric playing' },
      { name: 'Gavin Harrison', slug: 'gavin-harrison', band: 'Porcupine Tree / King Crimson', note: 'Applies rudimental roll discipline to the dynamic control that defines his playing' },
    ],
    gearRecommendations: {
      sticks: [
        { name: 'Vic Firth American Classic 5A', reason: 'Balanced weight and rebound make press-roll control easier to feel' },
        { name: 'Practice sticks with rubber tips', reason: 'Quiet, controlled bounce practice for isolating buzz pressure' },
      ],
      practice: [
        { name: 'Drum practice pad (Evans RealFeel)', reason: 'Firm, consistent rebound ideal for dialing in buzz roll pressure' },
      ],
      tips: 'Buzz roll control comes from stick pressure and wrist relaxation, not extra force - if your rolls sound choppy, you are pressing too hard or lifting too soon between hands.',
    },
    videos: [
    ],
    relatedTechniques: ['one-handed-roll', 'rudiments'],
    seoKeywords: ['buzz roll', 'multiple bounce roll', 'press roll drumming', 'buzz roll rudiment', 'how to play a buzz roll'],
  },

  'flams': {
    slug: 'flams',
    title: 'Flams',
    emoji: '⚡',
    metaTitle: 'Flams - Grace Note Rudiment for Accents & Fills | MetalForge',
    metaDescription: 'Learn the flam drumming rudiment - a grace note plus main note for fat accents. History, practice steps, variations, and metal drummers who use it.',
    category: 'foundational',
    difficulty: 'beginner',
    bpmRange: 'Any',
    description: `A flam is one of the Percussive Arts Society's 40 essential rudiments, built from a quiet grace note struck almost simultaneously with a louder main note on the opposite hand, producing a single fat, textured accent instead of two separate sounds. The grace note lands just a fraction of a second before the main stroke, wide enough to be heard as a distinct "fla-m" rather than a clean unison hit, but tight enough that the two strokes read as one event. In metal drumming, flams are the go-to tool for adding weight and emphasis to accents in fills and grooves - a flammed snare hit lands noticeably heavier than a plain single stroke, which is why the rudiment shows up constantly in tom fills, crash accents, and groove-metal snare work.`,
    history: `Flams originated in military and rudimental drumming, where the technique's ability to add emphasis and texture to a single stroke made it essential vocabulary for signaling and cadence work centuries before it entered popular music. It was carried into the modern 40 International Drum Rudiments recognized by the Percussive Arts Society, alongside closely related figures like the flam tap, flamacue, and flam paradiddle, and remains one of the first accent-based rudiments taught to beginning drummers after the single and double stroke rolls. In metal, flams appear throughout groove and progressive playing as a way to add weight without extra volume - Martin Lopez (ex-Opeth, Soen) weaves flam accents through his ghost-note-dense grooves, a texture that comes directly from his jazz training, giving his playing a living, breathing quality even at driving tempos. Mike Mangini (Dream Theater) brings the same rudiment-centric, drum-corps-rooted precision to his flam-based accents that defines his broader approach to sticking.`,
    howToLearn: [
      'Start by playing both hands together as a unison hit, then slightly stagger one hand earlier',
      'Keep the grace note quiet and the main note loud - the volume contrast is what makes a flam sound "fat" instead of sloppy',
      'Practice both flam directions (right-hand flam and left-hand flam) so the grace note can lead from either hand',
      'Play flams slowly on a practice pad first, checking that the two strokes stay close together without merging into one hit',
      'Move on to flam-based rudiments like the flam tap and flammed paradiddle once single flams are solid',
      'Apply flams to tom fills and crash accents to hear how the extra texture changes the weight of a hit',
      'Record yourself and listen back - flams that are too wide sound like two separate notes instead of one accented stroke',
    ],
    variations: [
      { name: 'Flam', description: 'A single grace note plus main note struck almost simultaneously for a fat accent' },
      { name: 'Flam Tap', description: 'A flam followed by a tap on the same hand, common in fill vocabulary' },
      { name: 'Flammed Paradiddle', description: 'A paradiddle with a flam added to the accented strokes for extra weight' },
      { name: 'Flam Fill', description: 'Flams applied across the toms for a fat, powerful fill sound' },
    ],
    masters: [
      { name: 'Martin Lopez', slug: 'martin-lopez', band: 'Opeth / Soen', note: 'Weaves flam accents through his ghost-note-dense, jazz-influenced progressive metal grooves' },
      { name: 'Mike Mangini', slug: 'mike-mangini', band: 'Dream Theater', note: 'Drum-corps-rooted, rudiment-centric precision carries directly into his flam-based accents' },
    ],
    gearRecommendations: {
      sticks: [
        { name: 'Vic Firth American Classic 5A', reason: 'Balanced weight makes it easier to feel the grace-note/main-note volume contrast' },
        { name: 'Practice sticks with rubber tips', reason: 'Quiet, controlled practice for isolating flam spacing' },
      ],
      practice: [
        { name: 'Drum practice pad (Evans RealFeel)', reason: 'Consistent bounce for hearing exactly how tight or wide a flam lands' },
      ],
      tips: 'A flam is a rudiment about spacing, not force - if you need to hit harder to make it sound fat, the grace note is probably too far from the main note, not too quiet.',
    },
    videos: [
    ],
    relatedTechniques: ['rudiments', 'ghost-notes'],
    seoKeywords: ['flams', 'flam rudiment', 'flam drumming technique', 'how to play a flam', 'drum accent technique'],
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
