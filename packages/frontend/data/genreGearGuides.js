/**
 * Genre-Specific Gear Guides for MetalForge
 * Issue #663 Extension: Best gear recommendations by metal subgenre
 * URL pattern: /guides/best-[gear]-for-[genre]
 */

export const GENRE_GEAR_GUIDES = {
  'best-drum-pedals-for-death-metal': {
    slug: 'best-drum-pedals-for-death-metal',
    category: 'genre-guide',
    gearType: 'pedals',
    genre: 'death-metal',
    
    // SEO metadata
    title: "Best Drum Pedals for Death Metal: 2026 Ultimate Guide",
    metaTitle: "Best Drum Pedals for Death Metal in 2026 | MetalForge Expert Guide",
    description: "Discover the best double bass pedals for death metal drumming. Expert recommendations from budget to pro-level, featuring the exact pedals used by George Kollias, Dave Lombardo, and Gene Hoglan.",
    seoKeywords: [
      'best drum pedals death metal',
      'double bass pedals extreme metal',
      'death metal drum pedals',
      'fastest double bass pedals',
      'blast beat pedals',
      'direct drive vs chain drive metal',
      'george kollias pedals',
      'extreme metal bass drum pedals',
      'best pedals for blast beats',
      'double bass pedal speed'
    ],
    ogImage: '/api/og/guide?type=genre-gear&gear=pedals&genre=death-metal',
    datePublished: '2026-03-19',
    dateModified: '2026-03-19',
    author: 'MetalForge Editorial',
    wordCount: 1850,
    readingTime: '8 min',

    // Hero section
    hero: {
      title: "🦶 Best Drum Pedals for Death Metal",
      subtitle: "From Budget Blasters to Pro-Level Precision",
      badge: "GEAR GUIDE 2026",
      stats: [
        { value: '7', label: 'Pedals Reviewed' },
        { value: '8 min', label: 'Read Time' },
        { value: '2026', label: 'Updated' }
      ]
    },

    // Introduction
    intro: {
      title: "Why Your Pedal Choice Matters in Death Metal",
      content: `In death metal, your bass drum pedals aren't just hardware—they're weapons. The genre demands sustained speeds of 200+ BPM, precision blast beats, and relentless double bass patterns that would destroy lesser equipment. Choosing the right pedal can mean the difference between effortless 16th notes and cramped calves halfway through your set.

Death metal pioneers like Pete Sandoval (Morbid Angel), Dave Lombardo (Slayer), and modern masters like George Kollias (Nile) and Flo Mounier (Cryptopsy) have pushed pedal technology to its limits. Their requirements—lightning-fast response, consistent action, and bulletproof durability—have shaped what we consider "death metal pedals" today.

This guide breaks down exactly what you need from a pedal for death metal, recommends specific models across all budgets, and reveals what the pros actually use. Whether you're grinding on blast beats in your bedroom or preparing for a tour, we've got you covered.`,
      keyPoints: [
        "Death metal demands pedals capable of 200+ BPM sustained speeds",
        "Direct drive pedals dominate the extreme metal scene",
        "Bearings, cam shape, and footboard length all affect speed potential",
        "Budget options have improved dramatically—you don't need to spend $800"
      ]
    },

    // What to look for section
    whatToLookFor: {
      title: "What Makes a Great Death Metal Pedal?",
      features: [
        {
          name: "Drive System",
          icon: "⚙️",
          description: "Direct drive pedals offer the most linear, consistent response—crucial for maintaining speed. Chain drive pedals have more 'swing' which some players prefer for feel. Most extreme metal drummers choose direct drive.",
          recommendation: "Direct drive for pure speed, chain for groove-death hybrids"
        },
        {
          name: "Bearings",
          icon: "🔧",
          description: "High-quality bearings eliminate friction and increase responsiveness. Look for sealed bearings or specialty bearings like Pearl's NiNjA system. Cheap bushings will slow you down and wear out fast.",
          recommendation: "Sealed precision bearings minimum; specialty bearings for pro-level"
        },
        {
          name: "Footboard Design",
          icon: "📏",
          description: "Longboard designs allow heel-toe technique for extreme speeds. Standard boards work for ankle/leg technique. Width and grip pattern also affect control.",
          recommendation: "Longboard for blast beats, standard for traditional death metal"
        },
        {
          name: "Cam Shape",
          icon: "🎯",
          description: "Round cams provide linear acceleration—consistent from start to finish. Offset cams offer more power at the end of the stroke. Most speed demons prefer round/linear cams.",
          recommendation: "Linear/round cams for speed, offset for power"
        },
        {
          name: "Spring Tension Range",
          icon: "🔩",
          description: "Death metal requires tight spring tension for fast return. Your pedal needs a wide adjustment range and the ability to stay consistent at high tensions.",
          recommendation: "Wide tension range with reliable locking mechanism"
        },
        {
          name: "Build Quality",
          icon: "🛡️",
          description: "Death metal destroys weak pedals. Look for aluminum or steel construction, reinforced connection points, and pedals that can handle tens of thousands of strokes.",
          recommendation: "Aircraft-grade aluminum minimum for serious players"
        }
      ]
    },

    // Pro picks section
    proRecommendations: {
      title: "Top Pedals Used by Death Metal Legends",
      pedals: [
        {
          rank: 1,
          name: "Pearl Demon Drive",
          brand: "Pearl",
          model: "P3002D Demon Drive",
          image: "/images/gear/pedals/pearl-demon-drive.webp",
          priceRange: "€500-600",
          tier: "pro",
          driveType: "Direct Drive",
          
          description: `The Pearl Demon Drive has become the gold standard for extreme metal. Its NiNjA bearing system provides virtually frictionless action, while the interchangeable cams let you dial in exactly the feel you want. The Click-Lock spring tension makes adjustments precise and reliable.

George Kollias (Nile), Dave Lombardo, and countless death metal drummers trust the Demon Drive for their most demanding performances. The direct drive action delivers instant, linear response—essential when you're playing 260 BPM 16th notes.`,
          
          pros: [
            "NiNjA bearing system for ultimate smoothness",
            "Interchangeable cam system (Direct Drive/Standard)",
            "Click-Lock spring tension adjustment",
            "PowerShifter longboard included",
            "Built for extreme metal abuse"
          ],
          cons: [
            "Premium price point",
            "Direct drive takes adjustment if coming from chain",
            "Heavy for transport"
          ],
          specs: {
            drive: "Direct Drive (interchangeable)",
            bearings: "NiNjA Bearings",
            footboard: "PowerShifter Longboard",
            beater: "Demon Beater (reversible)",
            weight: "4.5 kg (pair)"
          },
          usedBy: [
            { name: "George Kollias", band: "Nile", note: "Fastest recorded feet in death metal" },
            { name: "Dave Lombardo", band: "Slayer/Dead Cross", note: "Thrash legend" },
            { name: "Gene Hoglan", band: "Death/Testament", note: "The Atomic Clock" },
            { name: "Flo Mounier", band: "Cryptopsy", note: "Technical death metal pioneer" }
          ],
          verdict: "The industry standard for extreme metal. If you're serious about death metal drumming, this is the pedal to beat.",
          rating: 4.9,
          affiliateLink: "https://www.thomann.de/intl/pearl_p3002d_demon_drive_double.htm?partner_id=metalforge"
        },
        {
          rank: 2,
          name: "Tama Speed Cobra 910",
          brand: "Tama",
          model: "HP910LWN Speed Cobra 910",
          image: "/images/gear/pedals/tama-speed-cobra.webp",
          priceRange: "€450-550",
          tier: "pro",
          driveType: "Chain Drive (Speedo-Ring)",
          
          description: `The Tama Speed Cobra takes the chain drive concept and optimizes it for speed. The unique Speedo-Ring sprocket combines the smooth feel of direct drive with the familiar swing of chain drive. The extended footboard design is specifically engineered for fast, rolling patterns.

Tomas Haake (Meshuggah), Eloy Casagrande (Slipknot), and many modern metal drummers choose the Speed Cobra for its blend of speed and feel. If direct drive feels too "stiff" but you still need extreme speed, this is your pedal.`,
          
          pros: [
            "Speedo-Ring gives chain drive pedals direct-drive smoothness",
            "Extra-long footboard for heel-toe technique",
            "LiteSprocket reduces weight",
            "Cobra Coil spring system is ultra-responsive",
            "Excellent value for pro-level performance"
          ],
          cons: [
            "Not as linear as true direct drive",
            "Takes time to adjust the Speedo-Ring feel",
            "Some find the footboard too long"
          ],
          specs: {
            drive: "Chain with Speedo-Ring",
            bearings: "Oiles Bearings",
            footboard: "Extra-Long Cobra Design",
            beater: "Cobra Beater (dual surface)",
            weight: "3.8 kg (pair)"
          },
          usedBy: [
            { name: "Tomas Haake", band: "Meshuggah", note: "Polyrhythmic precision" },
            { name: "Eloy Casagrande", band: "Slipknot", note: "Current Slipknot drummer" },
            { name: "Matt Garstka", band: "Animals as Leaders", note: "Progressive metal virtuoso" }
          ],
          verdict: "Best chain-drive option for death metal. Ideal for drummers who want speed but prefer chain feel.",
          rating: 4.7,
          affiliateLink: "https://www.thomann.de/intl/tama_hp910lwn_speed_cobra_double.htm?partner_id=metalforge"
        },
        {
          rank: 3,
          name: "Axis A Longboard",
          brand: "Axis",
          model: "A21-2 Laser Double Pedal",
          image: "/images/gear/pedals/axis-longboard.webp",
          priceRange: "€750-900",
          tier: "premium",
          driveType: "Direct Drive",
          
          description: `The Axis A-Series is the original direct drive speed pedal and remains the choice of purists who demand the ultimate in response. The Laser trigger system (on A21 models) adds electronic capability for triggering samples. The microtune system allows incredibly precise adjustments.

Derek Roddy, one of the fastest drummers ever recorded, helped develop and endorse Axis pedals. If you want the most linear, responsive feel possible and don't mind the premium price, Axis delivers.`,
          
          pros: [
            "Purest direct drive feel available",
            "Microtune system for precise adjustments",
            "Laser trigger option for electronic integration",
            "Made in USA, exceptional build quality",
            "Cult following among speed drummers"
          ],
          cons: [
            "Premium price—significantly more than competitors",
            "Steeper learning curve",
            "Replacement parts can be harder to find",
            "Not as widely stocked"
          ],
          specs: {
            drive: "Direct Drive",
            bearings: "Precision Instrument-Grade",
            footboard: "Variable Length Longboard",
            beater: "Axis Sonic Hammer",
            weight: "4.0 kg (pair)"
          },
          usedBy: [
            { name: "Derek Roddy", band: "Nile/Hate Eternal", note: "Speed legend" },
            { name: "Tim Yeung", band: "Morbid Angel", note: "Death metal veteran" },
            { name: "Kevin Talley", band: "Dying Fetus", note: "Brutal death metal" }
          ],
          verdict: "The connoisseur's choice for direct drive purity. Worth the investment for serious speed drummers.",
          rating: 4.8,
          affiliateLink: "https://www.thomann.de/intl/axis_a_longboard_double_pedal.htm?partner_id=metalforge"
        },
        {
          rank: 4,
          name: "DW 9000 Series",
          brand: "DW",
          model: "DWCP9002 Double Pedal",
          image: "/images/gear/pedals/dw-9000.webp",
          priceRange: "€650-750",
          tier: "pro",
          driveType: "Chain Drive (Dual Chain)",
          
          description: `The DW 9000 represents the pinnacle of traditional chain drive engineering. The dual chain system provides power and stability, while the free-floating rotor eliminates unwanted motion. Infinitely adjustable in virtually every parameter.

While not as common in pure death metal, the 9000 series is favored by drummers who play death/groove hybrids or want maximum adjustability. The build quality is exceptional.`,
          
          pros: [
            "Infinitely adjustable—customize everything",
            "Dual chain for power and stability",
            "Free-floating rotor design",
            "Exceptional build quality",
            "Great for groove-oriented death metal"
          ],
          cons: [
            "Chain drive limits top-end speed",
            "Heavy and complex",
            "Expensive for chain drive"
          ],
          specs: {
            drive: "Dual Chain",
            bearings: "Dual Bearing Spring Rocker",
            footboard: "Turbo or Accelerator options",
            beater: "DW SM101 (reversible)",
            weight: "5.2 kg (pair)"
          },
          usedBy: [
            { name: "Chris Adler", band: "Lamb of God", note: "Groove metal precision" },
            { name: "Paul Bostaph", band: "Slayer/Testament", note: "Thrash veteran" }
          ],
          verdict: "Premium chain drive for drummers who want feel over pure speed. Excellent for death/groove styles.",
          rating: 4.5,
          affiliateLink: "https://www.thomann.de/intl/dw_dwcp9002_double_pedal.htm?partner_id=metalforge"
        }
      ]
    },

    // Budget options section
    budgetOptions: {
      title: "Best Budget Pedals for Death Metal",
      description: "You don't need to spend €500+ to play death metal. These affordable options deliver serious performance for developing drummers.",
      pedals: [
        {
          name: "Pearl Eliminator Redline",
          brand: "Pearl",
          model: "P2052C Eliminator Redline",
          priceRange: "€350-400",
          tier: "mid",
          driveType: "Chain with Interchangeable Cams",
          
          description: "The Eliminator Redline brings many features from the Demon Drive at a more accessible price. The interchangeable cam system lets you experiment with different feels, and the NiNjA bearings are the same as the flagship model.",
          
          pros: [
            "Interchangeable cams included",
            "NiNjA bearing system",
            "Solid build quality",
            "Good upgrade path from budget pedals"
          ],
          cons: [
            "Chain drive limits ultimate speed",
            "Not as refined as Demon Drive"
          ],
          verdict: "Best mid-range option for aspiring death metal drummers.",
          rating: 4.3,
          affiliateLink: "https://www.thomann.de/intl/pearl_p2052c_eliminator_redline.htm?partner_id=metalforge"
        },
        {
          name: "Tama Iron Cobra 600",
          brand: "Tama",
          model: "HP600D Iron Cobra 600",
          priceRange: "€250-300",
          tier: "budget",
          driveType: "Chain (Power Glide)",
          
          description: "The entry-level Iron Cobra delivers the legendary Iron Cobra feel at an accessible price. While it lacks some features of the 900 series, the core design is proven across decades of metal drumming.",
          
          pros: [
            "Proven Iron Cobra design",
            "Power Glide cam for speed",
            "Affordable entry point",
            "Tama durability"
          ],
          cons: [
            "Fewer adjustment options",
            "Basic bearings",
            "No case included"
          ],
          verdict: "Excellent starter pedal for death metal on a budget.",
          rating: 4.0,
          affiliateLink: "https://www.thomann.de/intl/tama_hp600dtw_iron_cobra_600_double.htm?partner_id=metalforge"
        },
        {
          name: "Mapex Falcon",
          brand: "Mapex",
          model: "PF1000TW Falcon",
          priceRange: "€400-450",
          tier: "mid",
          driveType: "Direct Drive",
          
          description: "The Mapex Falcon offers direct drive performance at a mid-range price—a rare combination. It won't match the Demon Drive's refinement, but it's an excellent entry point to direct drive for death metal.",
          
          pros: [
            "Direct drive at mid-range price",
            "Good speed potential",
            "Raptorlock quick release",
            "Convertible footboard"
          ],
          cons: [
            "Build quality below premium options",
            "Less refined direct drive feel",
            "Limited pro endorsements"
          ],
          verdict: "Best affordable direct drive option for death metal.",
          rating: 4.2,
          affiliateLink: "https://www.thomann.de/intl/mapex_pf1000tw_falcon_double_pedal.htm?partner_id=metalforge"
        }
      ]
    },

    // Speed vs Feel section
    comparison: {
      title: "Direct Drive vs Chain Drive for Death Metal",
      content: `The great debate in extreme metal drumming: direct drive or chain drive? Here's the real breakdown:

**Direct Drive:**
- Linear, consistent response from start to finish
- Faster return for sustained high-speed patterns  
- Less "swing" in the action
- Preferred by: George Kollias, Derek Roddy, Tim Yeung

**Chain Drive:**
- Slight "whip" effect at the end of the stroke
- More traditional feel many drummers prefer
- Can still achieve extreme speeds with proper technique
- Preferred by: Tomas Haake, Chris Adler, many thrash drummers

**The Truth:** Both can work for death metal. George Kollias plays 280 BPM on direct drive. Tomas Haake plays equally insane polyrhythms on chain drive. Your technique matters more than the drive system.

**Our Recommendation:** If you're new to extreme speeds, try both if possible. If buying blind, direct drive (Pearl Demon Drive or Mapex Falcon) gives you the most speed potential out of the box.`,
      comparisonTable: [
        { feature: "Top Speed Potential", directDrive: "⭐⭐⭐⭐⭐", chainDrive: "⭐⭐⭐⭐" },
        { feature: "Natural Feel", directDrive: "⭐⭐⭐", chainDrive: "⭐⭐⭐⭐⭐" },
        { feature: "Groove/Dynamics", directDrive: "⭐⭐⭐", chainDrive: "⭐⭐⭐⭐" },
        { feature: "Maintenance", directDrive: "⭐⭐⭐⭐⭐", chainDrive: "⭐⭐⭐" },
        { feature: "Price Range", directDrive: "€400-900", chainDrive: "€250-750" }
      ]
    },

    // Final verdict
    verdict: {
      title: "Our Top Picks",
      picks: [
        {
          category: "Best Overall",
          pedal: "Pearl Demon Drive",
          reason: "The industry standard for a reason—unmatched smoothness, adjustability, and death metal pedigree."
        },
        {
          category: "Best Value",
          pedal: "Tama Speed Cobra 910",
          reason: "Pro-level performance with chain drive feel at a reasonable price."
        },
        {
          category: "Best Budget",
          pedal: "Tama Iron Cobra 600",
          reason: "Proven design, affordable price, ready for death metal abuse."
        },
        {
          category: "Best for Pure Speed",
          pedal: "Axis A Longboard",
          reason: "If you want the absolute fastest, most linear response available."
        }
      ]
    },

    // Related content
    relatedArticles: [
      'best-snare-drums-for-thrash-metal',
      'best-cymbals-for-death-metal',
      'double-bass-technique-guide'
    ],
    relatedDrummers: [
      { slug: 'george-kollias', name: 'George Kollias', reason: 'Fastest feet in death metal' },
      { slug: 'dave-lombardo', name: 'Dave Lombardo', reason: 'Thrash/death metal pioneer' },
      { slug: 'flo-mounier', name: 'Flo Mounier', reason: 'Technical death metal master' },
      { slug: 'gene-hoglan', name: 'Gene Hoglan', reason: 'The Atomic Clock' }
    ],
    relatedComparisons: ['tama-iron-cobra-vs-pearl-demon-drive'],

    // FAQ section for SEO
    faq: [
      {
        question: "What pedal does George Kollias use?",
        answer: "George Kollias uses Pearl Demon Drive double pedals with direct drive cams. He's known for achieving speeds over 280 BPM with these pedals."
      },
      {
        question: "Is direct drive better than chain drive for death metal?",
        answer: "Direct drive offers more linear response and faster return, making it popular for extreme speeds. However, many top death metal drummers still use chain drive. Technique matters more than drive type."
      },
      {
        question: "What's the best budget double bass pedal for death metal?",
        answer: "The Tama Iron Cobra 600 (around €250-300) offers proven performance at an affordable price. For direct drive on a budget, the Mapex Falcon (€400-450) is excellent."
      },
      {
        question: "How fast should a death metal pedal be?",
        answer: "Death metal typically requires sustained speeds of 180-220 BPM, with extreme subgenres pushing 250+ BPM. Any quality double pedal can achieve these speeds with proper technique."
      },
      {
        question: "Do I need a longboard pedal for blast beats?",
        answer: "Longboard pedals help with heel-toe technique for extreme speeds, but they're not required. Many death metal drummers use standard-length boards with ankle or swivel technique."
      }
    ],

    // Conclusion
    conclusion: {
      title: "Choose Your Weapon",
      content: `Death metal drumming demands equipment that can keep up with your ambitions. Whether you choose the industry-standard Pearl Demon Drive, the speed-optimized Tama Speed Cobra, or a budget-friendly option like the Iron Cobra 600, make sure you invest in quality bearings, solid construction, and a design that matches your playing style.

Remember: the best pedal is the one you practice with consistently. George Kollias didn't become the fastest drummer by buying expensive gear—he became the fastest by practicing thousands of hours on reliable equipment.

Start with what you can afford, learn proper technique, and upgrade when your skills demand it. The death metal community awaits your blast beats.

🤘 **Now go practice.**`
    }
  },

  'best-snare-drums-for-thrash-metal': {
    slug: 'best-snare-drums-for-thrash-metal',
    category: 'genre-guide',
    gearType: 'snares',
    genre: 'thrash-metal',
    
    // SEO metadata
    title: "Best Snare Drums for Thrash Metal: 2026 Ultimate Guide",
    metaTitle: "Best Snare Drums for Thrash Metal in 2026 | MetalForge Expert Guide",
    description: "Discover the best snare drums for thrash metal. From the Ludwig Supraphonic on Master of Puppets to modern metal snares used by Dave Lombardo, Lars Ulrich, and Charlie Benante.",
    seoKeywords: [
      'best snare drum thrash metal',
      'metal snare drums',
      'thrash snare sound',
      'ludwig supraphonic metal',
      'tama metal snare',
      'lars ulrich snare drum',
      'dave lombardo snare',
      'big four drummers snare',
      'steel snare for metal',
      'brass snare thrash'
    ],
    ogImage: '/api/og/guide?type=genre-gear&gear=snares&genre=thrash-metal',
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: 'MetalForge Editorial',
    wordCount: 1750,
    readingTime: '7 min',

    // Hero section
    hero: {
      title: "🥁 Best Snare Drums for Thrash Metal",
      subtitle: "From Budget Blasters to Classic Tones",
      badge: "GEAR GUIDE 2026",
      stats: [
        { value: '7', label: 'Snares Reviewed' },
        { value: '7 min', label: 'Read Time' },
        { value: '2026', label: 'Updated' }
      ]
    },

    // Introduction
    intro: {
      title: "The Thrash Snare Sound: Cut, Crack, and Power",
      content: `The thrash metal snare sound is unmistakable—a sharp, cutting crack that slices through downtuned guitars and thundering bass drums. From Lars Ulrich's iconic snare on "Master of Puppets" to Dave Lombardo's machine-gun assault on "Reign in Blood," the right snare drum is essential to the thrash sound.

Unlike other metal subgenres, thrash demands a snare that can be heard clearly at high tempos without getting buried. The Big Four drummers—Lars Ulrich (Metallica), Dave Lombardo (Slayer), Charlie Benante (Anthrax), and the late Nick Menza (Megadeth)—each developed distinctive snare tones that became part of thrash's DNA.

The secret? Metal shells (steel, brass, or bronze), medium-high tuning, and sizes that provide both crack and body. Whether you're playing crossover thrash at 200 BPM or groove-thrash patterns, your snare needs to speak with authority.

This guide breaks down exactly what makes a great thrash snare, recommends specific models across all budgets, and reveals the exact snares used on legendary albums. Let's find your perfect crack.`,
      keyPoints: [
        "Metal shells (steel/brass) dominate thrash for their cutting projection",
        "14\"x5.5\" to 14\"x6.5\" is the sweet spot for thrash snare sizes",
        "Medium-high tuning provides both crack and body",
        "The Ludwig Supraphonic appears on more thrash albums than any other snare"
      ]
    },

    // What to look for section
    whatToLookFor: {
      title: "What Makes a Great Thrash Metal Snare?",
      features: [
        {
          name: "Shell Material",
          icon: "🔩",
          description: "Metal shells are the thrash standard. Steel offers bright, cutting attack. Brass provides warmth with projection. Bronze and aluminum offer unique character. Wood can work but needs careful EQ in the mix.",
          recommendation: "Steel for classic thrash crack, brass for warmer tone with cut"
        },
        {
          name: "Shell Depth",
          icon: "📏",
          description: "Deeper shells (6\"-6.5\") provide more body and low-end, while shallower shells (5\"-5.5\") offer more crack and response. Most thrash drummers prefer 5.5\" to 6.5\" for the balance of attack and body.",
          recommendation: "14\"x5.5\" for speed, 14\"x6.5\" for power, 14\"x8\" for doom-thrash"
        },
        {
          name: "Hoop Type",
          icon: "⭕",
          description: "Die-cast hoops offer consistent tuning and more attack. Triple-flanged hoops are more forgiving and offer more overtones. Most metal snares use die-cast for the focused crack.",
          recommendation: "Die-cast hoops for precision thrash, triple-flanged for crossover"
        },
        {
          name: "Snare Wire Quality",
          icon: "🎸",
          description: "High-quality snare wires respond faster and more consistently at high tempos. 20-strand wires are standard; some drummers prefer 24-strand for more sensitivity.",
          recommendation: "20-strand for classic thrash snap, 24-strand for more sizzle"
        },
        {
          name: "Shell Thickness",
          icon: "📐",
          description: "Thicker shells (1.5mm+) project more and focus the sound. Thinner shells resonate more with longer sustain. Most thrash snares use medium to thick shells for controlled crack.",
          recommendation: "1.0mm-1.5mm for versatility, 1.5mm+ for maximum cut"
        },
        {
          name: "Bearing Edge",
          icon: "🔪",
          description: "Sharp bearing edges focus the sound with more attack. Rounded edges warm the tone. Most metal snares use sharp 45° edges for maximum articulation.",
          recommendation: "45° sharp edge for thrash precision"
        }
      ]
    },

    // Pro picks section
    proRecommendations: {
      title: "Top Snare Drums Used by Thrash Legends",
      pedals: [
        {
          rank: 1,
          name: "Ludwig Supraphonic LM402",
          brand: "Ludwig",
          model: "Supraphonic LM402",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg",
          priceRange: "€450-550",
          tier: "pro",
          material: "Seamless Aluminum",
          size: "14\" x 6.5\"",
          
          description: `The Ludwig Supraphonic is the most recorded snare drum in history—and for good reason. Its seamless aluminum "Ludalloy" shell delivers the perfect balance of bright attack and warm body that cuts through any mix. The LM402 (6.5" depth) has appeared on more thrash albums than any other snare.

Lars Ulrich used a Supraphonic on "Master of Puppets," establishing the gold standard for thrash snare tone. The drum's sensitivity handles ghost notes as well as full-force rimshots, making it versatile enough for thrash's dynamic range.`,
          
          pros: [
            "The most recorded snare in thrash history",
            "Perfect balance of crack and body",
            "Seamless aluminum shell for consistent tone",
            "Excellent sensitivity at any tuning",
            "Holds tuning well under aggressive playing"
          ],
          cons: [
            "Popular enough that it can sound 'generic'",
            "Requires proper tuning to avoid ringy overtones",
            "Import-era models vary in quality"
          ],
          specs: {
            shell: "1.2mm Seamless Ludalloy (aluminum)",
            hoops: "Triple-flanged chrome",
            snares: "20-strand",
            lugs: "10 Imperial lugs",
            throwOff: "P85 snare strainer"
          },
          usedBy: [
            { name: "Lars Ulrich", band: "Metallica", note: "Master of Puppets sessions" },
            { name: "Dave Lombardo", band: "Slayer", note: "Various Slayer albums" },
            { name: "Gene Hoglan", band: "Death/Testament", note: "Classic recordings" },
            { name: "Countless session drummers", band: "Various", note: "The studio standard" }
          ],
          bestFor: "Classic thrash tone, studio recordings, all-around metal"
        },
        {
          rank: 2,
          name: "Tama Lars Ulrich Signature LU1465",
          brand: "Tama",
          model: "LU1465 Signature Steel",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg",
          priceRange: "€400-500",
          tier: "pro",
          material: "Steel",
          size: "14\" x 6.5\"",
          
          description: `When Lars Ulrich switched to Tama, he needed a snare that could match the Supraphonic's cutting power but with more aggressive attack. The result is the LU1465—a 1.2mm steel shell that delivers laser-focused crack with devastating rimshot power.

The LU1465 became the new standard for modern thrash tone. Its steel construction provides more brightness and cut than aluminum, while the 6.5" depth maintains enough body for full-range playing. If the Supraphonic defined '80s thrash, the LU1465 defines modern thrash.`,
          
          pros: [
            "Designed by a thrash legend for thrash",
            "Steel shell cuts through any guitar wall",
            "Excellent rimshot crack and projection",
            "MasterCraft hoops for tuning stability",
            "Die-cast hoops focus the attack"
          ],
          cons: [
            "Very bright—not for every mix",
            "Requires dampening for some applications",
            "Premium signature model pricing"
          ],
          specs: {
            shell: "1.2mm Steel",
            hoops: "Die-cast (Sound Arc hoops)",
            snares: "20-strand Super Sensitive",
            lugs: "10 Low-mass lugs",
            throwOff: "Linear Drive strainer"
          },
          usedBy: [
            { name: "Lars Ulrich", band: "Metallica", note: "Primary snare since late '80s" },
            { name: "Many Metallica tribute drummers", band: "Various", note: "The authentic sound" }
          ],
          bestFor: "Modern thrash, aggressive tones, live cutting power"
        },
        {
          rank: 3,
          name: "Pearl Sensitone Elite Brass",
          brand: "Pearl",
          model: "Sensitone Elite Brass STA1450BR",
          image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Pearl_MCX_snare_drum.JPG",
          priceRange: "€350-450",
          tier: "mid-pro",
          material: "Brass",
          size: "14\" x 5\"",
          
          description: `The Pearl Sensitone Elite Brass is the secret weapon of many thrash drummers who want cut without harshness. Brass shells provide the projection of metal with a warmer, more musical fundamental that sits perfectly in a mix.

This 14"x5" configuration excels at fast playing—the shallower depth provides snappier response for rapid-fire 16th notes. Charlie Benante of Anthrax has used Pearl brass snares extensively, proving that brass belongs in thrash as much as steel.`,
          
          pros: [
            "Brass warmth with metal projection",
            "Excellent at high tempos (5\" depth)",
            "Versatile for thrash and crossover",
            "SR-1000 strainer for precise control",
            "Great value for professional quality"
          ],
          cons: [
            "Less aggressive than steel options",
            "5\" may lack body for slower thrash",
            "Brass requires more polishing to maintain"
          ],
          specs: {
            shell: "1.2mm Beaded Brass",
            hoops: "Super Hoop II (die-cast)",
            snares: "42-strand Ultra-Sensitive",
            lugs: "10 STL-90 Sensitone lugs",
            throwOff: "SR-1000 strainer"
          },
          usedBy: [
            { name: "Charlie Benante", band: "Anthrax", note: "Long-time Pearl endorser" },
            { name: "Vinnie Paul", band: "Pantera/Hellyeah", note: "Groove metal legend" }
          ],
          bestFor: "Fast thrash, crossover, drummers wanting warmth with cut"
        },
        {
          rank: 4,
          name: "Mapex Black Panther Blade",
          brand: "Mapex",
          model: "Black Panther Blade BPST4551LN",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg",
          priceRange: "€300-400",
          tier: "mid",
          material: "Steel",
          size: "14\" x 5.5\"",
          
          description: `Chris Adler of Lamb of God helped design the Black Panther series, and the Blade is built specifically for modern metal. The 2.3mm steel shell is thicker than most, providing maximum projection and a focused, controlled crack.

The SONIClear bearing edge is Mapex's precision-cut edge that enhances both attack and sensitivity. For drummers transitioning from groove metal to thrash, the Blade delivers the power and cut you need without breaking the bank.`,
          
          pros: [
            "Designed with Chris Adler's input",
            "Extra-thick steel for massive projection",
            "SONIClear bearing edges for articulation",
            "Excellent rimshot power",
            "Mid-tier pricing, pro-level sound"
          ],
          cons: [
            "Very focused sound—less versatile",
            "Heavy drum at 2.3mm thickness",
            "May need additional muffling"
          ],
          specs: {
            shell: "2.3mm Steel",
            hoops: "Die-cast",
            snares: "20-strand",
            lugs: "8 Sonic Saver lugs",
            throwOff: "Black Panther strainer"
          },
          usedBy: [
            { name: "Chris Adler", band: "Lamb of God", note: "Primary snare choice" }
          ],
          bestFor: "Modern thrash, groove-thrash hybrid, powerful projection"
        },
        {
          rank: 5,
          name: "Yamaha Recording Custom Steel",
          brand: "Yamaha",
          model: "Recording Custom Steel RCS1450",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg",
          priceRange: "€500-600",
          tier: "pro",
          material: "Steel",
          size: "14\" x 5\"",
          
          description: `The Yamaha Recording Custom series has legendary studio credentials, and the steel version delivers pristine, focused crack perfect for thrash. The 1mm steel shell provides bright, cutting attack with controlled sustain.

Dave Lombardo has used Yamaha snares at various points in his career, appreciating their consistency and studio-friendly tone. The RCS1450's 5" depth makes it exceptionally responsive for blast beats and fast double strokes.`,
          
          pros: [
            "Studio-quality tone",
            "Consistent shell construction",
            "Excellent bearing edges",
            "Q-Type strainer for precise response",
            "5\" depth for speed"
          ],
          cons: [
            "Premium pricing",
            "May be too refined for raw thrash",
            "Subtle differences from cheaper options"
          ],
          specs: {
            shell: "1mm Steel",
            hoops: "Die-cast",
            snares: "20-strand",
            lugs: "10 Q-Series lugs",
            throwOff: "Q-Type strainer"
          },
          usedBy: [
            { name: "Dave Lombardo", band: "Slayer", note: "Various recordings" },
            { name: "Tommy Lee", band: "Mötley Crüe", note: "Hair metal icon" }
          ],
          bestFor: "Studio thrash recordings, precise articulation, fast playing"
        },
        {
          rank: 6,
          name: "Ludwig Black Magic 14x8",
          brand: "Ludwig",
          model: "Black Magic LW0814",
          image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Pearl_MCX_snare_drum.JPG",
          priceRange: "€400-500",
          tier: "mid-pro",
          material: "Brass",
          size: "14\" x 8\"",
          
          description: `For thrash drummers who want devastating low-end punch with their crack, the Ludwig Black Magic 14x8 is a weapon. The extra-deep 8" shell provides thunder that shakes stages while maintaining the Ludwig sensitivity.

The black nickel-plated brass shell looks as evil as it sounds. This snare excels in doom-thrash, groove metal, and any style where you want your snare to feel like a cannon. Not for everyone, but absolutely devastating in the right hands.`,
          
          pros: [
            "Massive low-end punch (8\" depth)",
            "Evil aesthetics match thrash vibe",
            "Great for slower, heavier thrash",
            "Brass warmth with aggressive finish",
            "Unique sound that stands out"
          ],
          cons: [
            "Too deep for fast thrash styles",
            "Heavy and unwieldy",
            "Requires specific EQ approach"
          ],
          specs: {
            shell: "1mm Brass, Black Nickel plated",
            hoops: "Die-cast",
            snares: "20-strand",
            lugs: "10 Imperial lugs",
            throwOff: "P85 strainer"
          },
          usedBy: [
            { name: "Heavy thrash/doom drummers", band: "Various", note: "Deep sound specialists" }
          ],
          bestFor: "Doom-thrash, groove metal, drummers wanting massive depth"
        },
        {
          rank: 7,
          name: "Pork Pie Little Squealer",
          brand: "Pork Pie",
          model: "Little Squealer Steel",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/46/2006-07-06_snare_14.jpg",
          priceRange: "€200-300",
          tier: "budget",
          material: "Steel",
          size: "14\" x 5\"",
          
          description: `The Pork Pie Little Squealer proves you don't need a massive budget for great thrash tone. This American-made snare delivers surprisingly professional sound at a fraction of the price of Ludwig or Tama signature models.

The 1mm vented steel shell provides bright, cutting attack perfect for thrash. It's become a cult favorite among DIY thrash drummers and touring musicians who need affordable reliability. Don't let the price fool you—this snare can hang with the pros.`,
          
          pros: [
            "Exceptional value for money",
            "American-made quality",
            "Vented shell for focused attack",
            "Lightweight and responsive",
            "Great backup or touring snare"
          ],
          cons: [
            "Basic hardware compared to premium models",
            "Less refined bearing edges",
            "May need snare wire upgrade"
          ],
          specs: {
            shell: "1mm Vented Steel",
            hoops: "Triple-flanged",
            snares: "20-strand",
            lugs: "8 tube lugs",
            throwOff: "Standard strainer"
          },
          usedBy: [
            { name: "Budget-conscious thrash drummers", band: "Various", note: "Cult favorite" }
          ],
          bestFor: "Budget thrash builds, backup snare, touring"
        }
      ]
    },

    // Historical section - classic albums
    classicAlbumSnares: {
      title: "Legendary Snares: What They Used on Classic Albums",
      albums: [
        {
          album: "Master of Puppets",
          artist: "Metallica",
          year: 1986,
          drummer: "Lars Ulrich",
          snare: "Ludwig Supraphonic LM402",
          notes: "The defining thrash snare tone. Medium-high tuning, crisp crack that cuts through Hetfield's rhythm guitars."
        },
        {
          album: "Reign in Blood",
          artist: "Slayer",
          year: 1986,
          drummer: "Dave Lombardo",
          snare: "Tama Superstar Steel",
          notes: "Machine-gun attack at 200+ BPM. Lombardo's precise stick control and the steel shell's cut created thrash's most intense snare sound."
        },
        {
          album: "Among the Living",
          artist: "Anthrax",
          year: 1987,
          drummer: "Charlie Benante",
          snare: "Pearl Brass",
          notes: "Warmer thrash tone with East Coast groove. Benante's jazz background shows in the musical snare work."
        },
        {
          album: "Rust in Peace",
          artist: "Megadeth",
          year: 1990,
          drummer: "Nick Menza",
          snare: "Tama Bell Brass",
          notes: "Technical thrash required a snare that could articulate complex patterns. The Bell Brass delivered."
        },
        {
          album: "Vulgar Display of Power",
          artist: "Pantera",
          year: 1992,
          drummer: "Vinnie Paul",
          snare: "Pearl Brass Custom",
          notes: "The snare that helped define groove metal. Deeper tuning, massive crack for slower tempos."
        }
      ]
    },

    // Size guide
    sizeGuide: {
      title: "Snare Size Guide for Thrash Metal",
      sizes: [
        {
          size: "14\" x 5\"",
          bestFor: "Speed thrash, blast beats, fast double strokes",
          description: "Maximum response and articulation. Used by drummers prioritizing speed over body."
        },
        {
          size: "14\" x 5.5\"",
          bestFor: "All-around thrash, balanced tone",
          description: "The most versatile thrash size. Good balance of crack and body for any tempo."
        },
        {
          size: "14\" x 6.5\"",
          bestFor: "Power thrash, heavy accents, studio work",
          description: "More body and low-mid content. Excellent for medium tempos where each hit needs weight."
        },
        {
          size: "14\" x 8\"",
          bestFor: "Doom-thrash, groove metal, slow and heavy",
          description: "Maximum depth for cannon-like explosions. Not for speed but devastating for slower material."
        }
      ]
    },

    // Material guide
    materialGuide: {
      title: "Shell Material Guide",
      materials: [
        {
          material: "Steel",
          tone: "Bright, cutting, aggressive",
          pros: "Maximum projection, crisp attack, modern thrash standard",
          cons: "Can be harsh if over-tuned, less warm",
          examples: "Tama LU1465, Mapex Black Panther, Yamaha Recording Custom"
        },
        {
          material: "Aluminum (Ludalloy)",
          tone: "Bright but warm, classic crack",
          pros: "The classic thrash sound, excellent sensitivity, balanced",
          cons: "Can ring if not muffled properly",
          examples: "Ludwig Supraphonic, Ludwig Acrolite"
        },
        {
          material: "Brass",
          tone: "Warm, dark, fat",
          pros: "Sits well in mix, projection with warmth, versatile",
          cons: "Less cutting than steel, requires maintenance",
          examples: "Pearl Sensitone Brass, Ludwig Black Magic, Tama Bell Brass"
        },
        {
          material: "Bronze",
          tone: "Dark, complex, musical",
          pros: "Unique overtones, excellent at low volumes",
          cons: "Expensive, may lack cut in dense mixes",
          examples: "Zildjian Bronze, Pearl Masterworks Bronze"
        }
      ]
    },

    // FAQ
    faq: [
      {
        question: "What snare did Lars Ulrich use on Master of Puppets?",
        answer: "Lars used a Ludwig Supraphonic LM402 (14\"x6.5\" aluminum) on Master of Puppets. It's one of the most iconic thrash snare tones ever recorded."
      },
      {
        question: "Steel or brass snare for thrash metal?",
        answer: "Steel is more common for aggressive, cutting thrash tones. Brass works well for groove-influenced thrash or drummers wanting warmth with projection. Both are used by thrash legends."
      },
      {
        question: "What size snare is best for fast thrash?",
        answer: "14\"x5\" to 14\"x5.5\" provides the quickest response for high-speed playing. Deeper snares (6.5\"+) add body but sacrifice some responsiveness at extreme tempos."
      },
      {
        question: "Should I use die-cast or triple-flanged hoops?",
        answer: "Die-cast hoops are preferred for thrash—they provide more focused attack and consistent tuning. Triple-flanged hoops are more forgiving but may lack the precision of die-cast."
      },
      {
        question: "Can I use a wood snare for thrash metal?",
        answer: "While metal shells dominate thrash, maple or birch snares can work with proper tuning and EQ. They're less common but offer a different texture if you want to stand out."
      },
      {
        question: "How tight should I tune my thrash snare?",
        answer: "Medium-high is the sweet spot—tight enough for crack and response, but not so tight you lose body. Listen to classic albums as reference and adjust from there."
      }
    ],

    // Conclusion
    conclusion: {
      title: "Find Your Thrash Crack",
      content: `The thrash snare sound is one of metal's most iconic tones—that cutting crack that punches through walls of distorted guitars. Whether you choose the legendary Ludwig Supraphonic, Lars's signature Tama, or a budget-friendly Pork Pie, the key is finding a snare that speaks with authority at any tempo.

Remember: the Big Four drummers didn't become legends because of their gear—they became legends by mastering their instruments. Lars Ulrich's Supraphonic on Master of Puppets wasn't expensive by studio standards; it was just perfectly tuned and performed by a drummer who knew exactly what he wanted.

Start with what you can afford, learn to tune it properly, and practice until your hands blister. The thrash community doesn't judge your price tag—only your precision.

🤘 **Now go shred.**`
    }
  }
};

export default GENRE_GEAR_GUIDES;
