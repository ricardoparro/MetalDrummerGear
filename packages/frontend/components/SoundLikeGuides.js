/**
 * "How to Sound Like [Drummer]" Guides Component
 * Issue #685: SEO content hub for drummer sound guides
 * 
 * This component renders both the guides hub page (/guides) and individual
 * guide pages (/guides/how-to-sound-like-[drummer-slug]).
 */

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Platform, 
  Linking,
  StyleSheet 
} from 'react-native';
import { Image } from 'expo-image';
import { 
  getAllSoundLikeGuides, 
  getSoundLikeGuideBySlug,
  generateGuideSchema,
  generateGuideFaqSchema 
} from '../data/soundLikeGuides';
import { getAllBeginnerGuides } from '../data/beginnerGuides';
import { updateSoundLikeGuideMeta } from '../utils/ogMetaTags';

// ==========================================
// Guides Hub Page Component
// ==========================================
export function GuidesHubPage({ theme, onBack, onSelectGuide }) {
  const guides = getAllSoundLikeGuides();
  const beginnerGuides = getAllBeginnerGuides();
  
  useEffect(() => {
    // Update OG meta for hub page
    updateSoundLikeGuideMeta(null);
    
    // Track page view
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'How to Sound Like Guides Hub',
        page_location: window.location.href,
        content_type: 'guides_hub'
      });
    }
  }, []);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={onBack}
          style={[styles.backButton, { borderColor: theme.border }]}
          accessibilityLabel="Go back"
        >
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={[styles.heroSection, { backgroundColor: theme.card }]}>
        <Text style={[styles.heroTitle, { color: theme.text }]}>
          🥁 Metal Drumming Guides
        </Text>
        <Text style={[styles.heroSubtitle, { color: theme.secondaryText }]}>
          Master the techniques, gear, and tuning secrets of metal drumming. 
          Each guide includes detailed breakdowns, practice tips, and gear recommendations.
        </Text>
        <View style={styles.statsBadges}>
          <View style={[styles.statBadge, { backgroundColor: theme.primary + '20' }]}>
            <Text style={[styles.statNumber, { color: theme.primary }]}>{guides.length + beginnerGuides.length}</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Guides</Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: theme.primary + '20' }]}>
            <Text style={[styles.statNumber, { color: theme.primary }]}>10+ min</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Each</Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: theme.primary + '20' }]}>
            <Text style={[styles.statNumber, { color: theme.primary }]}>Free</Text>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>Forever</Text>
          </View>
        </View>
      </View>

      {/* Featured Beginner Guide (Issue #702) */}
      {beginnerGuides.length > 0 && (
        <View style={styles.featuredSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>🔥 Getting Started</Text>
          {beginnerGuides.map((guide) => (
            <TouchableOpacity
              key={guide.slug}
              style={[styles.featuredCard, { backgroundColor: theme.primary, borderColor: theme.primary }]}
              onPress={() => onSelectGuide(guide.slug)}
              accessibilityLabel={`Read guide: ${guide.title}`}
            >
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredBadgeText}>BEGINNER GUIDE</Text>
              </View>
              <Text style={styles.featuredTitle}>{guide.hero?.title || guide.title}</Text>
              <Text style={styles.featuredDescription}>
                {guide.description}
              </Text>
              <View style={styles.featuredFooter}>
                <Text style={styles.featuredReadTime}>📖 {guide.readingTime} read</Text>
                <Text style={styles.featuredBudget}>💰 Under ${guide.budgetBreakdown?.totalBudget?.toLocaleString() || '1,000'}</Text>
                <Text style={styles.featuredArrow}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Sound Like Guides Grid */}
      <View style={styles.guidesSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>🎯 How to Sound Like...</Text>
        <View style={styles.guidesGrid}>
          {guides.map((guide) => (
            <TouchableOpacity
              key={guide.slug}
              style={[styles.guideCard, { backgroundColor: theme.card, borderColor: theme.border }]}
              onPress={() => onSelectGuide(guide.slug)}
              accessibilityLabel={`Read guide: ${guide.title}`}
            >
              <View style={styles.guideCardHeader}>
                <Text style={[styles.guidePriority, { color: theme.primary }]}>
                  #{guide.priority}
                </Text>
                <Text style={[styles.guideGenre, { color: theme.secondaryText }]}>
                  {guide.genre}
                </Text>
              </View>
              <Text style={[styles.guideDrummerName, { color: theme.text }]}>
                {guide.drummerName}
              </Text>
              <Text style={[styles.guideBand, { color: theme.secondaryText }]}>
                {guide.band}
              </Text>
              <Text style={[styles.guideDescription, { color: theme.secondaryText }]} numberOfLines={2}>
                {guide.description}
              </Text>
              <View style={styles.guideCardFooter}>
                <Text style={[styles.guideReadTime, { color: theme.primary }]}>
                  📖 {guide.readingTime} read
                </Text>
                <Text style={[styles.guideArrow, { color: theme.primary }]}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* SEO Content Section */}
      <View style={[styles.seoSection, { backgroundColor: theme.card }]}>
        <Text style={[styles.seoTitle, { color: theme.text }]}>
          Why These Guides?
        </Text>
        <Text style={[styles.seoText, { color: theme.secondaryText }]}>
          MetalForge has meticulously researched each drummer's setup, technique, and approach. 
          Our guides combine verified gear data from our database with expert analysis of their 
          playing style. Whether you're a beginner learning metal drumming basics or an advanced 
          player refining your technique, these guides provide actionable insights you won't find 
          anywhere else.
        </Text>
        <Text style={[styles.seoText, { color: theme.secondaryText, marginTop: 12 }]}>
          Each guide covers: signature techniques, complete gear breakdowns, tuning approaches, 
          practice exercises, video references, and budget-friendly alternatives to achieve 
          similar sounds.
        </Text>
      </View>
    </ScrollView>
  );
}

// ==========================================
// Individual Guide Page Component
// ==========================================
export function GuidePage({ theme, onBack, guideSlug, onSelectDrummer }) {
  const [guide, setGuide] = useState(null);
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const loadedGuide = getSoundLikeGuideBySlug(guideSlug);
    setGuide(loadedGuide);

    if (loadedGuide) {
      // Update OG meta
      updateSoundLikeGuideMeta(loadedGuide);

      // Inject schema markup
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        // HowTo schema
        const howToSchema = generateGuideSchema(loadedGuide);
        if (howToSchema) {
          let ldScript = document.querySelector('script[data-schema="guide-howto"]');
          if (!ldScript) {
            ldScript = document.createElement('script');
            ldScript.type = 'application/ld+json';
            ldScript.setAttribute('data-schema', 'guide-howto');
            document.head.appendChild(ldScript);
          }
          ldScript.textContent = JSON.stringify(howToSchema);
        }

        // FAQ schema
        const faqSchema = generateGuideFaqSchema(loadedGuide);
        if (faqSchema) {
          let faqScript = document.querySelector('script[data-schema="guide-faq"]');
          if (!faqScript) {
            faqScript = document.createElement('script');
            faqScript.type = 'application/ld+json';
            faqScript.setAttribute('data-schema', 'guide-faq');
            document.head.appendChild(faqScript);
          }
          faqScript.textContent = JSON.stringify(faqSchema);
        }
      }

      // Track page view
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'guide_view', {
          guide_slug: loadedGuide.slug,
          drummer_name: loadedGuide.drummerName,
          content_type: 'sound_like_guide'
        });
      }
    }

    // Cleanup schemas on unmount
    return () => {
      if (Platform.OS === 'web' && typeof document !== 'undefined') {
        const howToScript = document.querySelector('script[data-schema="guide-howto"]');
        const faqScript = document.querySelector('script[data-schema="guide-faq"]');
        if (howToScript) howToScript.remove();
        if (faqScript) faqScript.remove();
      }
    };
  }, [guideSlug]);

  if (!guide) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={[styles.backButton, { borderColor: theme.border }]}>
            <Text style={[styles.backButtonText, { color: theme.text }]}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.text }]}>Loading guide...</Text>
        </View>
      </View>
    );
  }

  const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'technique', label: 'Technique' },
    { id: 'gear', label: 'Gear' },
    { id: 'tuning', label: 'Tuning' },
    { id: 'practice', label: 'Practice' },
    { id: 'faq', label: 'FAQ' }
  ];

  const handleAffiliateClick = (item, platform) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        guide_slug: guide.slug,
        drummer_name: guide.drummerName,
        gear_item: item,
        platform: platform
      });
    }
  };

  const handleShare = (platform) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const url = window.location.href;
      const text = `Learn how to sound like ${guide.drummerName} with this complete gear & technique guide from MetalForge!`;
      
      let shareUrl;
      if (platform === 'twitter') {
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      } else if (platform === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      } else if (platform === 'copy') {
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank');
      }

      // Track share
      if (window.gtag) {
        window.gtag('event', 'guide_share', {
          guide_slug: guide.slug,
          drummer_name: guide.drummerName,
          platform: platform
        });
      }
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={[styles.backButton, { borderColor: theme.border }]}>
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Back to Guides</Text>
        </TouchableOpacity>
      </View>

      {/* Article Header */}
      <View style={[styles.articleHeader, { backgroundColor: theme.card }]}>
        <View style={styles.articleMeta}>
          <Text style={[styles.articleGenre, { color: theme.primary }]}>{guide.genre}</Text>
          <Text style={[styles.articleDate, { color: theme.secondaryText }]}>
            Updated {guide.dateModified}
          </Text>
        </View>
        <Text style={[styles.articleTitle, { color: theme.text }]}>{guide.title}</Text>
        <Text style={[styles.articleDrummer, { color: theme.secondaryText }]}>
          {guide.drummerName} • {guide.band}
        </Text>
        <Text style={[styles.articleDescription, { color: theme.secondaryText }]}>
          {guide.description}
        </Text>
        <View style={styles.articleStats}>
          <Text style={[styles.articleStat, { color: theme.secondaryText }]}>
            📖 {guide.readingTime}
          </Text>
          <Text style={[styles.articleStat, { color: theme.secondaryText }]}>
            📝 {guide.wordCount?.toLocaleString()} words
          </Text>
        </View>

        {/* Share Buttons */}
        <View style={styles.shareButtons}>
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: '#1DA1F2' }]}
            onPress={() => handleShare('twitter')}
          >
            <Text style={styles.shareButtonText}>𝕏 Share</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: '#4267B2' }]}
            onPress={() => handleShare('facebook')}
          >
            <Text style={styles.shareButtonText}>f Share</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: theme.border }]}
            onPress={() => handleShare('copy')}
          >
            <Text style={[styles.shareButtonText, { color: theme.text }]}>🔗 Copy</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Section Navigation */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.sectionNav}
        contentContainerStyle={styles.sectionNavContent}
      >
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[
              styles.sectionNavButton,
              activeSection === section.id && { backgroundColor: theme.primary },
              { borderColor: theme.primary }
            ]}
            onPress={() => setActiveSection(section.id)}
          >
            <Text style={[
              styles.sectionNavText,
              { color: activeSection === section.id ? '#fff' : theme.primary }
            ]}>
              {section.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Introduction Section */}
      {activeSection === 'intro' && guide.intro && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.intro.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.intro.content}
          </Text>
          {guide.intro.keyPoints && (
            <View style={styles.keyPoints}>
              <Text style={[styles.keyPointsTitle, { color: theme.text }]}>Key Takeaways:</Text>
              {guide.intro.keyPoints.map((point, index) => (
                <Text key={index} style={[styles.keyPoint, { color: theme.secondaryText }]}>
                  • {point}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Technique Section */}
      {activeSection === 'technique' && guide.technique && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.technique.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.technique.overview}
          </Text>

          {/* Stick Grip */}
          {guide.technique.stickGrip && (
            <View style={[styles.subsection, { borderColor: theme.border }]}>
              <Text style={[styles.subsectionTitle, { color: theme.text }]}>
                Stick Grip: {guide.technique.stickGrip.type}
              </Text>
              <Text style={[styles.subsectionContent, { color: theme.secondaryText }]}>
                {guide.technique.stickGrip.description}
              </Text>
              {guide.technique.stickGrip.tips && (
                <View style={styles.tipsList}>
                  {guide.technique.stickGrip.tips.map((tip, index) => (
                    <Text key={index} style={[styles.tip, { color: theme.secondaryText }]}>
                      💡 {tip}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Signature Patterns */}
          {guide.technique.signaturePatterns && (
            <View style={styles.patterns}>
              <Text style={[styles.patternsTitle, { color: theme.text }]}>Signature Patterns</Text>
              {guide.technique.signaturePatterns.map((pattern, index) => (
                <View key={index} style={[styles.patternCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
                  <View style={styles.patternHeader}>
                    <Text style={[styles.patternName, { color: theme.text }]}>{pattern.name}</Text>
                    <Text style={[styles.patternDifficulty, { color: theme.primary }]}>{pattern.difficulty}</Text>
                  </View>
                  <Text style={[styles.patternDescription, { color: theme.secondaryText }]}>
                    {pattern.description}
                  </Text>
                  <Text style={[styles.patternTempo, { color: theme.secondaryText }]}>
                    🎵 Tempo: {pattern.tempo}
                  </Text>
                  <View style={[styles.practiceHint, { backgroundColor: theme.primary + '15' }]}>
                    <Text style={[styles.practiceHintText, { color: theme.primary }]}>
                      💡 {pattern.practiceHint}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Key Songs */}
          {guide.technique.keySongs && (
            <View style={styles.keySongs}>
              <Text style={[styles.keySongsTitle, { color: theme.text }]}>Essential Songs to Study</Text>
              {guide.technique.keySongs.map((song, index) => (
                <View key={index} style={[styles.songItem, { borderColor: theme.border }]}>
                  <Text style={[styles.songName, { color: theme.text }]}>{song.song}</Text>
                  <Text style={[styles.songAlbum, { color: theme.secondaryText }]}>
                    {song.album} ({song.year})
                  </Text>
                  <Text style={[styles.songWhy, { color: theme.secondaryText }]}>{song.why}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Gear Section */}
      {activeSection === 'gear' && guide.gear && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.gear.title}</Text>

          {/* Drum Kit */}
          {guide.gear.drumKit && (
            <View style={[styles.gearItem, { borderColor: theme.border }]}>
              <Text style={[styles.gearItemTitle, { color: theme.text }]}>🥁 Drum Kit</Text>
              <Text style={[styles.gearItemBrand, { color: theme.primary }]}>
                {guide.gear.drumKit.brand} {guide.gear.drumKit.model}
              </Text>
              <Text style={[styles.gearItemDescription, { color: theme.secondaryText }]}>
                {guide.gear.drumKit.description}
              </Text>
              {guide.gear.drumKit.config && (
                <View style={styles.kitConfig}>
                  <Text style={[styles.configItem, { color: theme.secondaryText }]}>
                    Bass: {guide.gear.drumKit.config.kick}
                  </Text>
                  <Text style={[styles.configItem, { color: theme.secondaryText }]}>
                    Snare: {guide.gear.drumKit.config.snare}
                  </Text>
                </View>
              )}
              {guide.gear.drumKit.affiliateNote && (
                <Text style={[styles.affiliateNote, { color: theme.primary }]}>
                  💡 {guide.gear.drumKit.affiliateNote}
                </Text>
              )}
            </View>
          )}

          {/* Snare */}
          {guide.gear.snare && (
            <View style={[styles.gearItem, { borderColor: theme.border }]}>
              <Text style={[styles.gearItemTitle, { color: theme.text }]}>🎯 Snare Drum</Text>
              <Text style={[styles.gearItemBrand, { color: theme.primary }]}>
                {guide.gear.snare.brand} {guide.gear.snare.model}
              </Text>
              <Text style={[styles.gearItemSpec, { color: theme.secondaryText }]}>
                {guide.gear.snare.size} • {guide.gear.snare.shell}
              </Text>
              <Text style={[styles.gearItemDescription, { color: theme.secondaryText }]}>
                {guide.gear.snare.description}
              </Text>
              {guide.gear.snare.alternative && (
                <Text style={[styles.alternativeNote, { color: theme.secondaryText }]}>
                  Alternative: {guide.gear.snare.alternative}
                </Text>
              )}
            </View>
          )}

          {/* Cymbals */}
          {guide.gear.cymbals && (
            <View style={[styles.gearItem, { borderColor: theme.border }]}>
              <Text style={[styles.gearItemTitle, { color: theme.text }]}>🔔 Cymbals</Text>
              <Text style={[styles.gearItemBrand, { color: theme.primary }]}>
                {guide.gear.cymbals.brand} {guide.gear.cymbals.series}
              </Text>
              <Text style={[styles.gearItemDescription, { color: theme.secondaryText }]}>
                {guide.gear.cymbals.description}
              </Text>
              {guide.gear.cymbals.setup && (
                <View style={styles.cymbalSetup}>
                  {guide.gear.cymbals.setup.map((cymbal, index) => (
                    <View key={index} style={[styles.cymbalItem, { borderColor: theme.border }]}>
                      <Text style={[styles.cymbalType, { color: theme.text }]}>{cymbal.type}</Text>
                      <Text style={[styles.cymbalModel, { color: theme.secondaryText }]}>{cymbal.model}</Text>
                      {cymbal.notes && (
                        <Text style={[styles.cymbalNotes, { color: theme.secondaryText }]}>{cymbal.notes}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Pedals */}
          {guide.gear.pedals && (
            <View style={[styles.gearItem, { borderColor: theme.border }]}>
              <Text style={[styles.gearItemTitle, { color: theme.text }]}>👟 Pedals</Text>
              <Text style={[styles.gearItemBrand, { color: theme.primary }]}>
                {guide.gear.pedals.brand} {guide.gear.pedals.model}
              </Text>
              <Text style={[styles.gearItemDescription, { color: theme.secondaryText }]}>
                {guide.gear.pedals.description}
              </Text>
              {guide.gear.pedals.alternative && (
                <Text style={[styles.alternativeNote, { color: theme.secondaryText }]}>
                  Alternative: {guide.gear.pedals.alternative}
                </Text>
              )}
            </View>
          )}

          {/* Sticks */}
          {guide.gear.sticks && (
            <View style={[styles.gearItem, { borderColor: theme.border }]}>
              <Text style={[styles.gearItemTitle, { color: theme.text }]}>🥢 Sticks</Text>
              <Text style={[styles.gearItemBrand, { color: theme.primary }]}>
                {guide.gear.sticks.brand} {guide.gear.sticks.model}
              </Text>
              <Text style={[styles.gearItemSpec, { color: theme.secondaryText }]}>
                {guide.gear.sticks.specs}
              </Text>
              <Text style={[styles.gearItemDescription, { color: theme.secondaryText }]}>
                {guide.gear.sticks.description}
              </Text>
            </View>
          )}

          {/* Budget Setups */}
          {guide.budgetSetups && (
            <View style={styles.budgetSetups}>
              <Text style={[styles.budgetTitle, { color: theme.text }]}>
                Recommended Gear by Budget
              </Text>
              {['budget', 'mid', 'pro'].map((tier) => {
                const setup = guide.budgetSetups[tier];
                if (!setup) return null;
                return (
                  <View key={tier} style={[styles.budgetCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
                    <View style={styles.budgetHeader}>
                      <Text style={[styles.budgetLabel, { color: theme.text }]}>{setup.label}</Text>
                      <Text style={[styles.budgetPrice, { color: theme.primary }]}>{setup.price}</Text>
                    </View>
                    <Text style={[styles.budgetKit, { color: theme.secondaryText }]}>
                      Kit: {setup.kit}
                    </Text>
                    <Text style={[styles.budgetCymbals, { color: theme.secondaryText }]}>
                      Cymbals: {setup.cymbals}
                    </Text>
                    <Text style={[styles.budgetPedals, { color: theme.secondaryText }]}>
                      Pedals: {setup.pedals}
                    </Text>
                    {setup.notes && (
                      <Text style={[styles.budgetNotes, { color: theme.secondaryText }]}>
                        💡 {setup.notes}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      )}

      {/* Tuning Section */}
      {activeSection === 'tuning' && guide.tuning && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.tuning.title}</Text>
          <Text style={[styles.sectionContent, { color: theme.secondaryText }]}>
            {guide.tuning.overview}
          </Text>

          {['kickDrum', 'snare', 'toms'].map((drum) => {
            const tuning = guide.tuning[drum];
            if (!tuning) return null;
            const drumName = drum === 'kickDrum' ? 'Kick Drum' : drum.charAt(0).toUpperCase() + drum.slice(1);
            return (
              <View key={drum} style={[styles.tuningItem, { borderColor: theme.border }]}>
                <Text style={[styles.tuningDrum, { color: theme.text }]}>{drumName}</Text>
                <View style={styles.tuningSpecs}>
                  <Text style={[styles.tuningSpec, { color: theme.primary }]}>
                    Tension: {tuning.tension}
                  </Text>
                  <Text style={[styles.tuningSpec, { color: theme.primary }]}>
                    Muffling: {tuning.muffling}
                  </Text>
                </View>
                <Text style={[styles.tuningDescription, { color: theme.secondaryText }]}>
                  {tuning.description}
                </Text>
                {tuning.tip && (
                  <View style={[styles.tuningTip, { backgroundColor: theme.primary + '15' }]}>
                    <Text style={[styles.tuningTipText, { color: theme.primary }]}>
                      💡 {tuning.tip}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* Practice Section */}
      {activeSection === 'practice' && guide.practice && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{guide.practice.title}</Text>

          {/* Exercises */}
          {guide.practice.exercises && (
            <View style={styles.exercises}>
              {guide.practice.exercises.map((exercise, index) => (
                <View key={index} style={[styles.exerciseCard, { backgroundColor: theme.background, borderColor: theme.border }]}>
                  <Text style={[styles.exerciseName, { color: theme.text }]}>{exercise.name}</Text>
                  <Text style={[styles.exerciseDescription, { color: theme.secondaryText }]}>
                    {exercise.description}
                  </Text>
                  <Text style={[styles.exerciseInstructions, { color: theme.secondaryText }]}>
                    {exercise.instructions}
                  </Text>
                  <View style={styles.exerciseMeta}>
                    <Text style={[styles.exerciseDuration, { color: theme.primary }]}>
                      ⏱️ {exercise.duration}
                    </Text>
                    <Text style={[styles.exerciseGoal, { color: theme.primary }]}>
                      🎯 {exercise.goal}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Common Mistakes */}
          {guide.practice.commonMistakes && (
            <View style={styles.mistakes}>
              <Text style={[styles.mistakesTitle, { color: theme.text }]}>Common Mistakes to Avoid</Text>
              {guide.practice.commonMistakes.map((mistake, index) => (
                <Text key={index} style={[styles.mistake, { color: theme.secondaryText }]}>
                  ❌ {mistake}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}

      {/* FAQ Section */}
      {activeSection === 'faq' && guide.faq && (
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Frequently Asked Questions</Text>
          {guide.faq.map((item, index) => (
            <View key={index} style={[styles.faqItem, { borderColor: theme.border }]}>
              <Text style={[styles.faqQuestion, { color: theme.text }]}>{item.question}</Text>
              <Text style={[styles.faqAnswer, { color: theme.secondaryText }]}>{item.answer}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Related Content */}
      {guide.related && (
        <View style={[styles.relatedSection, { backgroundColor: theme.card }]}>
          <Text style={[styles.relatedTitle, { color: theme.text }]}>Related Content</Text>
          
          {guide.related.drummerProfile && (
            <TouchableOpacity 
              style={[styles.relatedLink, { borderColor: theme.border }]}
              onPress={() => {
                if (onSelectDrummer && guide.drummerId) {
                  onSelectDrummer(guide.drummerId);
                }
              }}
            >
              <Text style={[styles.relatedLinkText, { color: theme.primary }]}>
                🥁 View {guide.drummerName}'s Full Profile & Gear →
              </Text>
            </TouchableOpacity>
          )}

          {guide.related.relatedGuides && guide.related.relatedGuides.length > 0 && (
            <View style={styles.relatedGuides}>
              <Text style={[styles.relatedGuidesLabel, { color: theme.secondaryText }]}>
                Similar Guides:
              </Text>
              {guide.related.relatedGuides.map((slug, index) => {
                const relatedGuide = getSoundLikeGuideBySlug(slug);
                if (!relatedGuide) return null;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.relatedGuideLink, { borderColor: theme.border }]}
                    onPress={() => {
                      if (Platform.OS === 'web' && typeof window !== 'undefined') {
                        window.location.href = `/guides/${slug}`;
                      }
                    }}
                  >
                    <Text style={[styles.relatedGuideLinkText, { color: theme.primary }]}>
                      📖 How to Sound Like {relatedGuide.drummerName} →
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      )}

      {/* Go Deeper: Lick Hub + Album Article Cross-links */}
      {(guide.licksUrl || (guide.relatedArticles && guide.relatedArticles.length > 0)) && (
        <View style={[styles.relatedSection, { backgroundColor: theme.card }]}>
          <Text style={[styles.relatedTitle, { color: theme.text }]}>Go Deeper</Text>

          {guide.licksUrl && (
            <TouchableOpacity
              style={[styles.relatedLink, { borderColor: theme.border }]}
              onPress={() => {
                if (Platform.OS === 'web' && typeof window !== 'undefined') {
                  window.location.href = guide.licksUrl;
                }
              }}
            >
              <Text style={[styles.relatedLinkText, { color: theme.primary }]}>
                🥁 Practice {guide.drummerName}'s Signature Licks →
              </Text>
            </TouchableOpacity>
          )}

          {guide.relatedArticles && guide.relatedArticles.map((article, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.relatedLink, { borderColor: theme.border }]}
              onPress={() => {
                if (Platform.OS === 'web' && typeof window !== 'undefined') {
                  window.location.href = `/articles/${article.slug}`;
                }
              }}
            >
              <Text style={[styles.relatedLinkText, { color: theme.primary }]}>
                📖 {article.label} →
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Author & Update Info */}
      <View style={[styles.authorSection, { backgroundColor: theme.card }]}>
        <Text style={[styles.authorText, { color: theme.secondaryText }]}>
          Written by {guide.author}
        </Text>
        <Text style={[styles.updateText, { color: theme.secondaryText }]}>
          Last updated: {guide.dateModified}
        </Text>
      </View>
    </ScrollView>
  );
}

// ==========================================
// Helper Functions for Routing
// ==========================================
export function isGuidesHubPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/guides' || pathname === '/guides/';
}

export function isGuidePage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname.startsWith('/guides/how-to-sound-like-');
}

export function getGuideSlugFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/guides\/(how-to-sound-like-[a-z0-9-]+)$/);
  return match ? match[1] : null;
}

// ==========================================
// Styles
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    padding: 16,
    paddingTop: Platform.OS === 'web' ? 16 : 50,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 18,
  },
  heroSection: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  statsBadges: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
  },
  guidesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  guidesGrid: {
    gap: 16,
  },
  guideCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  guideCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  guidePriority: {
    fontSize: 12,
    fontWeight: '700',
  },
  guideGenre: {
    fontSize: 12,
  },
  guideDrummerName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  guideBand: {
    fontSize: 14,
    marginBottom: 8,
  },
  guideDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  guideCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guideReadTime: {
    fontSize: 12,
    fontWeight: '600',
  },
  guideArrow: {
    fontSize: 18,
    fontWeight: '700',
  },
  seoSection: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  seoTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  seoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  articleHeader: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  articleGenre: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  articleDate: {
    fontSize: 12,
  },
  articleTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 34,
  },
  articleDrummer: {
    fontSize: 16,
    marginBottom: 12,
  },
  articleDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  articleStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  articleStat: {
    fontSize: 13,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  shareButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  sectionNav: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionNavContent: {
    gap: 8,
  },
  sectionNavButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  sectionNavText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  keyPoints: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128,128,128,0.2)',
  },
  keyPointsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  keyPoint: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  subsection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  subsectionContent: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  tipsList: {
    marginTop: 8,
  },
  tip: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  patterns: {
    marginTop: 20,
  },
  patternsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  patternCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  patternHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  patternName: {
    fontSize: 16,
    fontWeight: '700',
  },
  patternDifficulty: {
    fontSize: 12,
    fontWeight: '600',
  },
  patternDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  patternTempo: {
    fontSize: 13,
    marginBottom: 12,
  },
  practiceHint: {
    padding: 12,
    borderRadius: 8,
  },
  practiceHintText: {
    fontSize: 13,
    lineHeight: 18,
  },
  keySongs: {
    marginTop: 20,
  },
  keySongsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  songItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  songName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  songAlbum: {
    fontSize: 13,
    marginBottom: 4,
  },
  songWhy: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  gearItem: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  gearItemTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  gearItemBrand: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  gearItemSpec: {
    fontSize: 13,
    marginBottom: 8,
  },
  gearItemDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  affiliateNote: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 8,
  },
  alternativeNote: {
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 8,
  },
  kitConfig: {
    marginTop: 8,
    marginBottom: 8,
  },
  configItem: {
    fontSize: 13,
    marginBottom: 2,
  },
  cymbalSetup: {
    marginTop: 12,
    gap: 8,
  },
  cymbalItem: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  cymbalType: {
    fontSize: 14,
    fontWeight: '600',
  },
  cymbalModel: {
    fontSize: 13,
  },
  cymbalNotes: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  budgetSetups: {
    marginTop: 24,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  budgetCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  budgetLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  budgetPrice: {
    fontSize: 18,
    fontWeight: '700',
  },
  budgetKit: {
    fontSize: 13,
    marginBottom: 4,
  },
  budgetCymbals: {
    fontSize: 13,
    marginBottom: 4,
  },
  budgetPedals: {
    fontSize: 13,
    marginBottom: 8,
  },
  budgetNotes: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  tuningItem: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  tuningDrum: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  tuningSpecs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  tuningSpec: {
    fontSize: 14,
    fontWeight: '600',
  },
  tuningDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  tuningTip: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  tuningTipText: {
    fontSize: 13,
    lineHeight: 18,
  },
  exercises: {
    marginTop: 8,
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  exerciseDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  exerciseInstructions: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  exerciseMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  exerciseDuration: {
    fontSize: 13,
    fontWeight: '600',
  },
  exerciseGoal: {
    fontSize: 13,
    fontWeight: '600',
  },
  mistakes: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128,128,128,0.2)',
  },
  mistakesTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  mistake: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  faqItem: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    lineHeight: 22,
  },
  relatedSection: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  relatedLink: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  relatedLinkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  relatedGuides: {
    marginTop: 8,
  },
  relatedGuidesLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  relatedGuideLink: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 6,
  },
  relatedGuideLinkText: {
    fontSize: 14,
    fontWeight: '600',
  },
  authorSection: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  authorText: {
    fontSize: 14,
  },
  updateText: {
    fontSize: 12,
    marginTop: 4,
  },
  // Featured Beginner Guide styles (Issue #702)
  featuredSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  featuredCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 0,
  },
  featuredBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  featuredBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 28,
  },
  featuredDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  featuredFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  featuredReadTime: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
  },
  featuredBudget: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
  },
  featuredArrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 'auto',
  },
});

export default { GuidesHubPage, GuidePage, isGuidesHubPage, isGuidePage, getGuideSlugFromURL };