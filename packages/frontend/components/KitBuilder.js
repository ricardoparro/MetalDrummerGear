/**
 * KitBuilder - Interactive Drum Kit Builder Tool with Live Cost Calculator
 * Issue #724: Enhanced Kit Builder Feature
 * 
 * Features:
 * - Start options: scratch, from drummer's setup, budget templates
 * - Expanded component categories with sizes
 * - Filters/Search by brand, price, drummer usage
 * - Saved builds with unique shareable URLs
 * - Recommendations engine with smart suggestions
 * - Community features: clone, vote, share
 * - SEO-optimized with schema markup
 * - Mobile-first responsive design
 * - Dual affiliate links (Thomann EU + Sweetwater US)
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  useWindowDimensions,
  Modal,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { colors } from '../colors';
import { fontSize, fontWeight, lineHeight } from '../typography';
import { spacing } from '../spacing';
import { calculateKitCost, formatPrice, EUR_TO_USD } from '../gearPrices';
import { getThomannLink, getSweetwaterLink } from '../affiliateLinks';
import { getOptimizedImageUrl } from '../imageUtils';

// ==========================================
// CONSTANTS & DATA
// ==========================================

// Budget tier templates
export const BUDGET_TEMPLATES = [
  {
    id: 'beginner',
    name: 'Beginner Setup',
    emoji: '🌱',
    description: 'Quality starter kit under €2,000',
    maxBudget: 2000,
    recommended: {
      drums: 'tama-superstar',
      snare: 'tama-metalworks',
      cymbals: 'zildjian-s',
      hardware: 'tama-iron-cobra-600',
      sticks: 'vicfirth-5b',
    },
  },
  {
    id: 'intermediate',
    name: 'Intermediate Setup',
    emoji: '🔥',
    description: 'Solid gigging kit €2,000 - €5,000',
    maxBudget: 5000,
    recommended: {
      drums: 'pearl-session-studio',
      snare: 'tama-slp',
      cymbals: 'sabian-aax',
      hardware: 'tama-iron-cobra',
      sticks: 'promark-joey',
    },
  },
  {
    id: 'professional',
    name: 'Professional Setup',
    emoji: '⭐',
    description: 'Pro-level touring kit €5,000+',
    maxBudget: 15000,
    recommended: {
      drums: 'tama-starclassic-maple',
      snare: 'sonor-haake',
      cymbals: 'meinl-byzance',
      hardware: 'dw-9000',
      sticks: 'vicfirth-kollias',
    },
  },
];

// Expanded gear catalog with sizes and detailed specs
export const KIT_BUILDER_CATALOG = {
  drums: [
    // Shell Packs - Pro Tier
    { id: 'tama-starclassic-maple', name: 'Tama Starclassic Maple', brand: 'Tama', price: 3500, tier: 'pro', 
      sizes: ['18"x22"', '10"x8"', '12"x9"', '14"x14"', '16"x16"'],
      usedBy: ['Lars Ulrich', 'Dave Lombardo', 'Charlie Benante', 'Mike Portnoy'],
      description: 'Classic maple tone, versatile for all metal styles',
      image: 'tama-starclassic-maple.jpg' },
    { id: 'tama-starclassic-bubinga', name: 'Tama Starclassic Bubinga', brand: 'Tama', price: 4200, tier: 'pro',
      sizes: ['22"x18"', '10"x7"', '12"x8"', '16"x14"'],
      usedBy: ['Eloy Casagrande'],
      description: 'Deep, warm African Bubinga tone with excellent projection',
      image: 'tama-starclassic-bubinga.jpg' },
    { id: 'tama-starclassic-walnut-birch', name: 'Tama Starclassic Walnut/Birch', brand: 'Tama', price: 3800, tier: 'pro',
      sizes: ['22"x18"', '10"x8"', '12"x9"', '14"x14"', '16"x16"'],
      usedBy: ['Mario Duplantier'],
      description: 'Hybrid shell combining warmth of walnut with birch attack',
      image: 'tama-walnut-birch.jpg' },
    { id: 'pearl-reference-pure', name: 'Pearl Reference Pure', brand: 'Pearl', price: 3500, tier: 'pro',
      sizes: ['22"x18"', '10"x8"', '12"x9"', '16"x16"'],
      usedBy: ['Gene Hoglan'],
      description: '100% North American Maple shells with Reference Pure sound',
      image: 'pearl-reference-pure.jpg' },
    { id: 'pearl-reference-series', name: 'Pearl Reference Series', brand: 'Pearl', price: 3200, tier: 'pro',
      sizes: ['22"x18"', '10"x7"', '12"x8"', '14"x12"', '16"x14"'],
      usedBy: ['Joey Jordison', 'Ray Luzier', 'John Otto'],
      description: 'Revolutionary Reference shell technology',
      image: 'pearl-reference.jpg' },
    { id: 'pearl-masterworks', name: 'Pearl Masterworks Stadium Exotic', brand: 'Pearl', price: 4800, tier: 'pro',
      sizes: ['24"x18"', '10"x8"', '12"x9"', '14"x12"', '16"x16"', '18"x16"'],
      usedBy: ['George Kollias'],
      description: 'Custom-shop quality with exotic wood options',
      image: 'pearl-masterworks.jpg' },
    { id: 'pearl-masters', name: 'Pearl Masters Premium Maple', brand: 'Pearl', price: 3200, tier: 'pro',
      sizes: ['22"x18"', '10"x8"', '12"x9"', '16"x16"'],
      usedBy: ['Matt Halpern'],
      description: 'Premium maple shells with superior tone',
      image: 'pearl-masters.jpg' },
    { id: 'sonor-sq2', name: 'Sonor SQ2 Heavy Beech', brand: 'Sonor', price: 5500, tier: 'pro',
      sizes: ['22"x18"', '10"x8"', '12"x9"', '14"x14"', '16"x16"'],
      usedBy: ['Tomas Haake', 'Danny Carey'],
      description: 'German-made precision with heavy beech shells',
      image: 'sonor-sq2.jpg' },
    { id: 'dw-collectors', name: "DW Collector's Series Maple", brand: 'DW', price: 5000, tier: 'pro',
      sizes: ['22"x18"', '10"x8"', '12"x9"', '14"x12"', '16"x14"'],
      usedBy: ['Brann Dailor'],
      description: 'Custom DW quality with infinite finish options',
      image: 'dw-collectors.jpg' },
    { id: 'sjc-custom', name: 'SJC Custom Drums', brand: 'SJC', price: 3500, tier: 'pro',
      sizes: ['22"x20"', '10"x7"', '12"x8"', '14"x14"', '16"x16"'],
      usedBy: ['Jay Weinberg'],
      description: 'Handcrafted custom drums from Massachusetts',
      image: 'sjc-custom.jpg' },
    // Shell Packs - Mid Tier
    { id: 'tama-superstar', name: 'Tama Superstar Classic', brand: 'Tama', price: 1200, tier: 'mid',
      sizes: ['22"x18"', '10"x8"', '12"x9"', '16"x16"'],
      usedBy: [],
      description: 'Great value all-maple shells',
      image: 'tama-superstar.jpg' },
    { id: 'pearl-session-studio', name: 'Pearl Session Studio Select', brand: 'Pearl', price: 1800, tier: 'mid',
      sizes: ['22"x16"', '10"x7"', '12"x8"', '16"x14"'],
      usedBy: [],
      description: 'Professional quality at mid-range price',
      image: 'pearl-session.jpg' },
    { id: 'mapex-saturn', name: 'Mapex Saturn V MH Exotic', brand: 'Mapex', price: 2600, tier: 'mid',
      sizes: ['22"x18"', '10"x7"', '12"x8"', '14"x12"', '16"x14"'],
      usedBy: ['Chris Adler'],
      description: 'Hybrid maple/walnut shells with SONIClear edges',
      image: 'mapex-saturn.jpg' },
    { id: 'mapex-armory', name: 'Mapex Armory Series', brand: 'Mapex', price: 1500, tier: 'mid',
      sizes: ['22"x18"', '10"x8"', '12"x9"', '14"x14"', '16"x16"'],
      usedBy: [],
      description: 'Tour-ready birch/maple hybrid shells',
      image: 'mapex-armory.jpg' },
    { id: 'ddrum-vinnie', name: 'ddrum Vinnie Paul Signature', brand: 'ddrum', price: 2800, tier: 'mid',
      sizes: ['22"x22"', '8"x8"', '10"x9"', '12"x10"', '14"x14"', '16"x16"', '18"x18"'],
      usedBy: ['Vinnie Paul'],
      description: 'Massive Vinnie Paul signature setup',
      image: 'ddrum-vinnie.jpg' },
    { id: 'ocdp-custom', name: 'OCDP Custom Type 5 Acrylic', brand: 'OCDP', price: 3500, tier: 'pro',
      sizes: ['22"x18"', '12"x9"', '13"x10"', '16"x16"'],
      usedBy: ['John Otto'],
      description: 'Striking acrylic shells with punchy attack',
      image: 'ocdp-acrylic.jpg' },
    { id: 'sonor-sq1', name: 'Sonor SQ1', brand: 'Sonor', price: 2500, tier: 'mid',
      sizes: ['22"x17"', '10"x7"', '12"x8"', '16"x15"'],
      usedBy: [],
      description: 'German quality at accessible price',
      image: 'sonor-sq1.jpg' },
    { id: 'ludwig-classic-maple', name: 'Ludwig Classic Maple', brand: 'Ludwig', price: 3200, tier: 'pro',
      sizes: ['22"x16"', '12"x8"', '13"x9"', '16"x16"'],
      usedBy: [],
      description: 'Legendary Ludwig tone',
      image: 'ludwig-classic.jpg' },
    { id: 'gretsch-catalina', name: 'Gretsch Catalina Maple', brand: 'Gretsch', price: 1100, tier: 'mid',
      sizes: ['22"x18"', '10"x7"', '12"x8"', '16"x16"'],
      usedBy: [],
      description: 'Classic Gretsch sound at affordable price',
      image: 'gretsch-catalina.jpg' },
    { id: 'yamaha-stage-custom', name: 'Yamaha Stage Custom Birch', brand: 'Yamaha', price: 900, tier: 'budget',
      sizes: ['22"x17"', '10"x7"', '12"x8"', '16"x15"'],
      usedBy: [],
      description: 'Industry-standard birch shells',
      image: 'yamaha-stage.jpg' },
  ],
  snare: [
    // Signature Snares - Pro
    { id: 'tama-lars-ulrich', name: 'Tama LU1465 Lars Ulrich Signature', brand: 'Tama', price: 650, tier: 'pro',
      size: '14"x6.5"', material: 'Steel',
      usedBy: ['Lars Ulrich'],
      description: 'Iconic bell brass snare with massive attack',
      image: 'tama-lars.jpg' },
    { id: 'tama-slp', name: 'Tama S.L.P. G-Maple', brand: 'Tama', price: 450, tier: 'mid',
      size: '14"x6.5"', material: 'Maple',
      usedBy: ['Dave Lombardo', 'Mario Duplantier'],
      description: 'Versatile G-Maple snare for all genres',
      image: 'tama-slp.jpg' },
    { id: 'tama-bell-brass', name: 'Tama Bell Brass', brand: 'Tama', price: 800, tier: 'pro',
      size: '14"x5.5"', material: 'Bell Brass',
      usedBy: ['Eloy Casagrande'],
      description: 'Premium bell brass with cutting power',
      image: 'tama-bell-brass.jpg' },
    { id: 'tama-charlie', name: 'Tama Charlie Benante Signature', brand: 'Tama', price: 550, tier: 'mid',
      size: '14"x6.5"', material: 'Aluminum',
      usedBy: ['Charlie Benante'],
      description: 'Aluminum shell with fast response',
      image: 'tama-charlie.jpg' },
    { id: 'tama-portnoy', name: 'Tama Mike Portnoy Signature Melody Master', brand: 'Tama', price: 600, tier: 'mid',
      size: '14"x5.5"', material: 'Steel',
      usedBy: ['Mike Portnoy'],
      description: 'Versatile steel snare for prog metal',
      image: 'tama-portnoy.jpg' },
    { id: 'pearl-joey', name: 'Pearl Joey Jordison Signature', brand: 'Pearl', price: 480, tier: 'mid',
      size: '13"x6.5"', material: 'Steel',
      usedBy: ['Joey Jordison'],
      description: 'Compact 13" steel snare with explosive crack',
      image: 'pearl-joey.jpg' },
    { id: 'pearl-kollias', name: 'Pearl George Kollias Signature', brand: 'Pearl', price: 520, tier: 'mid',
      size: '14"x6.5"', material: 'Maple/Kapur',
      usedBy: ['George Kollias'],
      description: 'Death metal snare optimized for speed',
      image: 'pearl-kollias.jpg' },
    { id: 'pearl-reference', name: 'Pearl Reference Brass', brand: 'Pearl', price: 550, tier: 'mid',
      size: '14"x6.5"', material: 'Brass',
      usedBy: ['Gene Hoglan', 'Ray Luzier'],
      description: 'Reference-level brass snare',
      image: 'pearl-ref-brass.jpg' },
    { id: 'pearl-sensitone', name: 'Pearl Sensitone Elite', brand: 'Pearl', price: 400, tier: 'mid',
      size: '14"x5"', material: 'Steel',
      usedBy: ['Gene Hoglan'],
      description: 'Classic steel snare with sensitive response',
      image: 'pearl-sensitone.jpg' },
    { id: 'sonor-haake', name: 'Sonor Tomas Haake Signature', brand: 'Sonor', price: 700, tier: 'pro',
      size: '14"x6.5"', material: 'Bronze',
      usedBy: ['Tomas Haake'],
      description: 'Bronze shell with perfect balance for extreme metal',
      image: 'sonor-haake.jpg' },
    { id: 'sonor-danny', name: 'Sonor Danny Carey Signature', brand: 'Sonor', price: 750, tier: 'pro',
      size: '14"x8"', material: 'Bronze',
      usedBy: ['Danny Carey'],
      description: 'Deep 8" bronze snare for massive tone',
      image: 'sonor-danny.jpg' },
    { id: 'sjc-crucible', name: 'SJC "The Crucible"', brand: 'SJC', price: 600, tier: 'mid',
      size: '14"x6.5"', material: 'Brass (48-ply)',
      usedBy: ['Jay Weinberg'],
      description: 'Unique 48-ply brass snare with brutal attack',
      image: 'sjc-crucible.jpg' },
    { id: 'ddrum-vinnie-snare', name: 'ddrum Vinnie Paul Signature', brand: 'ddrum', price: 400, tier: 'mid',
      size: '14"x8"', material: 'Maple',
      usedBy: ['Vinnie Paul'],
      description: 'Deep maple shell for massive groove sound',
      image: 'ddrum-vinnie-snare.jpg' },
    { id: 'ocdp-vented', name: 'OCDP 40-ply Vented', brand: 'OCDP', price: 450, tier: 'mid',
      size: '14"x6.5"', material: 'Maple (40-ply)',
      usedBy: ['John Otto'],
      description: 'Vented shell for reduced overtones',
      image: 'ocdp-vented.jpg' },
    { id: 'ludwig-black-beauty', name: 'Ludwig Black Beauty', brand: 'Ludwig', price: 900, tier: 'pro',
      size: '14"x6.5"', material: 'Brass',
      usedBy: [],
      description: 'The legendary snare drum',
      image: 'ludwig-black-beauty.jpg' },
    { id: 'ludwig-supraphonic', name: 'Ludwig Supraphonic', brand: 'Ludwig', price: 600, tier: 'pro',
      size: '14"x6.5"', material: 'Aluminum',
      usedBy: [],
      description: 'Industry standard aluminum snare',
      image: 'ludwig-supra.jpg' },
    { id: 'tama-metalworks', name: 'Tama Metalworks', brand: 'Tama', price: 200, tier: 'budget',
      size: '14"x5.5"', material: 'Steel',
      usedBy: [],
      description: 'Affordable steel snare for beginners',
      image: 'tama-metalworks.jpg' },
    { id: 'mapex-black-panther', name: 'Mapex Black Panther Sledgehammer', brand: 'Mapex', price: 450, tier: 'mid',
      size: '14"x6.5"', material: 'Brass',
      usedBy: ['Chris Adler'],
      description: 'Hammered brass for aggressive sound',
      image: 'mapex-sledgehammer.jpg' },
  ],
  cymbals: [
    // Full Cymbal Sets - Pro
    { id: 'zildjian-a-custom', name: 'Zildjian A Custom Series', brand: 'Zildjian', price: 2200, tier: 'pro',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride'],
      usedBy: ['Lars Ulrich', 'George Kollias', 'John Otto', 'Ray Luzier'],
      description: 'Brilliant finish with cutting power',
      image: 'zildjian-a-custom.jpg' },
    { id: 'zildjian-k-custom', name: 'Zildjian K Custom Series', brand: 'Zildjian', price: 2500, tier: 'pro',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride', '18" China'],
      usedBy: ['Jay Weinberg'],
      description: 'Dark, complex tones for modern metal',
      image: 'zildjian-k-custom.jpg' },
    { id: 'zildjian-a', name: 'Zildjian A Series', brand: 'Zildjian', price: 1800, tier: 'pro',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride'],
      usedBy: [],
      description: 'Classic bright Zildjian sound',
      image: 'zildjian-a.jpg' },
    { id: 'paiste-rude', name: 'Paiste RUDE Series', brand: 'Paiste', price: 2000, tier: 'pro',
      pieces: ['14" Hi-Hats', '17" Crash', '19" Crash', '20" Ride', '18" China'],
      usedBy: ['Joey Jordison', 'Dave Lombardo', 'Charlie Benante'],
      description: 'Aggressive, loud, and made for metal',
      image: 'paiste-rude.jpg' },
    { id: 'paiste-2002', name: 'Paiste 2002 Series', brand: 'Paiste', price: 2000, tier: 'pro',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride'],
      usedBy: ['Eloy Casagrande'],
      description: 'Classic rock/metal sound since 1971',
      image: 'paiste-2002.jpg' },
    { id: 'paiste-signature', name: 'Paiste Signature Series', brand: 'Paiste', price: 2800, tier: 'pro',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '22" Ride', '18" China'],
      usedBy: ['Danny Carey'],
      description: 'Premium Swiss cymbals with rich complexity',
      image: 'paiste-signature.jpg' },
    { id: 'sabian-hhx', name: 'Sabian HHX Series', brand: 'Sabian', price: 2200, tier: 'pro',
      pieces: ['14" Hi-Hats', '17" Crash', '19" Crash', '21" Ride'],
      usedBy: ['Tomas Haake', 'Mike Portnoy'],
      description: 'Hand-hammered darkness and complexity',
      image: 'sabian-hhx.jpg' },
    { id: 'sabian-aax', name: 'Sabian AAX Series', brand: 'Sabian', price: 1800, tier: 'mid',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride'],
      usedBy: ['Gene Hoglan', 'Vinnie Paul'],
      description: 'Bright, cutting AAX tone',
      image: 'sabian-aax.jpg' },
    { id: 'meinl-byzance', name: 'Meinl Byzance Series', brand: 'Meinl', price: 2400, tier: 'pro',
      pieces: ['14" Hi-Hats', '17" Crash', '19" Crash', '21" Ride', '18" China'],
      usedBy: ['Mario Duplantier', 'Brann Dailor', 'Chris Adler', 'Matt Halpern'],
      description: 'Hand-hammered Turkish cymbals with dark complexity',
      image: 'meinl-byzance.jpg' },
    { id: 'meinl-classics-custom', name: 'Meinl Classics Custom', brand: 'Meinl', price: 1200, tier: 'mid',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride'],
      usedBy: [],
      description: 'German-made B10 bronze cymbals',
      image: 'meinl-classics.jpg' },
    // Budget options
    { id: 'zildjian-s', name: 'Zildjian S Family', brand: 'Zildjian', price: 800, tier: 'budget',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride'],
      usedBy: [],
      description: 'Great entry-level pro sound',
      image: 'zildjian-s.jpg' },
    { id: 'sabian-b8x', name: 'Sabian B8X Series', brand: 'Sabian', price: 400, tier: 'budget',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride'],
      usedBy: [],
      description: 'Solid starter cymbals',
      image: 'sabian-b8x.jpg' },
    { id: 'paiste-pst7', name: 'Paiste PST 7', brand: 'Paiste', price: 600, tier: 'mid',
      pieces: ['14" Hi-Hats', '16" Crash', '18" Crash', '20" Ride'],
      usedBy: [],
      description: 'Quality entry to Paiste sound',
      image: 'paiste-pst7.jpg' },
    { id: 'meinl-hcs', name: 'Meinl HCS', brand: 'Meinl', price: 300, tier: 'budget',
      pieces: ['14" Hi-Hats', '16" Crash', '20" Ride'],
      usedBy: [],
      description: 'Affordable brass cymbals',
      image: 'meinl-hcs.jpg' },
  ],
  hardware: [
    // Double Pedals - Pro
    { id: 'tama-iron-cobra', name: 'Tama Iron Cobra 900 Power Glide', brand: 'Tama', price: 450, tier: 'pro',
      type: 'Double Pedal',
      usedBy: ['Lars Ulrich', 'Dave Lombardo', 'Charlie Benante', 'Mike Portnoy'],
      description: 'Industry-standard double pedal with Cobra Coil',
      image: 'tama-iron-cobra.jpg' },
    { id: 'tama-speed-cobra', name: 'Tama Speed Cobra 910', brand: 'Tama', price: 500, tier: 'pro',
      type: 'Double Pedal',
      usedBy: ['Tomas Haake', 'Eloy Casagrande', 'Mario Duplantier'],
      description: 'Fast action with LiteSprocket technology',
      image: 'tama-speed-cobra.jpg' },
    { id: 'tama-dyna-sync', name: 'Tama Dyna-Sync', brand: 'Tama', price: 550, tier: 'pro',
      type: 'Double Pedal',
      usedBy: [],
      description: 'Direct drive precision',
      image: 'tama-dyna-sync.jpg' },
    { id: 'pearl-demon-drive', name: 'Pearl Demon Drive', brand: 'Pearl', price: 550, tier: 'pro',
      type: 'Double Pedal',
      usedBy: ['Joey Jordison', 'Gene Hoglan', 'George Kollias'],
      description: 'Direct drive with NiNjA bearings',
      image: 'pearl-demon-drive.jpg' },
    { id: 'pearl-eliminator', name: 'Pearl Eliminator Redline', brand: 'Pearl', price: 400, tier: 'mid',
      type: 'Double Pedal',
      usedBy: ['Matt Halpern', 'John Otto'],
      description: 'Interchangeable cam system',
      image: 'pearl-eliminator.jpg' },
    { id: 'dw-9000', name: 'DW 9000 Series', brand: 'DW', price: 700, tier: 'pro',
      type: 'Double Pedal',
      usedBy: ['Jay Weinberg', 'Brann Dailor'],
      description: 'Premium USA-made direct drive',
      image: 'dw-9000.jpg' },
    { id: 'dw-5000', name: 'DW 5000 Series', brand: 'DW', price: 500, tier: 'mid',
      type: 'Double Pedal',
      usedBy: ['Vinnie Paul'],
      description: 'Classic DW turbo/accelerator action',
      image: 'dw-5000.jpg' },
    { id: 'sonor-giant', name: 'Sonor Giant Step Twin Effect', brand: 'Sonor', price: 650, tier: 'pro',
      type: 'Double Pedal',
      usedBy: ['Danny Carey'],
      description: 'German engineering with unique feel',
      image: 'sonor-giant.jpg' },
    { id: 'mapex-falcon', name: 'Mapex Falcon', brand: 'Mapex', price: 450, tier: 'mid',
      type: 'Double Pedal',
      usedBy: ['Chris Adler'],
      description: 'Direct drive with Falcon technology',
      image: 'mapex-falcon.jpg' },
    { id: 'axis-longboard', name: 'Axis A Longboard', brand: 'Axis', price: 800, tier: 'pro',
      type: 'Double Pedal',
      usedBy: [],
      description: 'Premium direct drive for extreme speed',
      image: 'axis-longboard.jpg' },
    // Budget pedals
    { id: 'tama-iron-cobra-600', name: 'Tama Iron Cobra 600', brand: 'Tama', price: 250, tier: 'budget',
      type: 'Double Pedal',
      usedBy: [],
      description: 'Entry-level Iron Cobra',
      image: 'tama-ic600.jpg' },
    { id: 'pdp-concept', name: 'PDP Concept Series', brand: 'PDP', price: 300, tier: 'budget',
      type: 'Double Pedal',
      usedBy: [],
      description: 'DW design at budget price',
      image: 'pdp-concept.jpg' },
    // Thrones
    { id: 'tama-throne-hr', name: 'Tama 1st Chair Round Rider', brand: 'Tama', price: 280, tier: 'mid',
      type: 'Throne',
      usedBy: [],
      description: 'Comfortable round-seat throne',
      image: 'tama-throne.jpg' },
    { id: 'roc-n-soc', name: 'Roc-n-Soc Nitro', brand: 'Roc-n-Soc', price: 250, tier: 'mid',
      type: 'Throne',
      usedBy: [],
      description: 'Shock-absorbing comfort',
      image: 'roc-n-soc.jpg' },
  ],
  sticks: [
    // Signature Sticks
    { id: 'ahead-lars', name: 'Ahead Lars Ulrich Signature', brand: 'Ahead', price: 45, tier: 'mid',
      specs: 'Aluminum, .595" x 16.5"',
      usedBy: ['Lars Ulrich'],
      description: 'Aluminum sticks for durability',
      image: 'ahead-lars.jpg' },
    { id: 'promark-joey', name: 'Promark Joey Jordison TX515W', brand: 'Promark', price: 15, tier: 'budget',
      specs: 'Hickory, .531" x 16"',
      usedBy: ['Joey Jordison'],
      description: 'Compact sticks for speed and control',
      image: 'promark-joey.jpg' },
    { id: 'promark-lombardo', name: 'Promark Dave Lombardo 2Bx', brand: 'Promark', price: 15, tier: 'budget',
      specs: 'Hickory, .630" x 16.125"',
      usedBy: ['Dave Lombardo'],
      description: 'Heavy sticks for thrash power',
      image: 'promark-lombardo.jpg' },
    { id: 'promark-portnoy', name: 'Promark Mike Portnoy TX420N', brand: 'Promark', price: 15, tier: 'budget',
      specs: 'Hickory, .580" x 16.25"',
      usedBy: ['Mike Portnoy'],
      description: 'Versatile sticks for prog dynamics',
      image: 'promark-portnoy.jpg' },
    { id: 'promark-casagrande', name: 'Promark Eloy Casagrande', brand: 'Promark', price: 15, tier: 'budget',
      specs: 'Hickory, .551" x 16.375"',
      usedBy: ['Eloy Casagrande'],
      description: 'Fast response for technical metal',
      image: 'promark-casagrande.jpg' },
    { id: 'vicfirth-kollias', name: 'Vic Firth George Kollias SGK', brand: 'Vic Firth', price: 15, tier: 'budget',
      specs: 'Hickory, .540" x 16"',
      usedBy: ['George Kollias'],
      description: 'Death metal speed sticks',
      image: 'vicfirth-kollias.jpg' },
    { id: 'vicfirth-haake', name: 'Vic Firth Tomas Haake', brand: 'Vic Firth', price: 15, tier: 'budget',
      specs: 'Hickory, .580" x 16"',
      usedBy: ['Tomas Haake'],
      description: 'Polyrhythmic precision sticks',
      image: 'vicfirth-haake.jpg' },
    { id: 'vicfirth-carey', name: 'Vic Firth Danny Carey', brand: 'Vic Firth', price: 15, tier: 'budget',
      specs: 'Hickory, .590" x 16.5"',
      usedBy: ['Danny Carey'],
      description: 'Tool-approved precision',
      image: 'vicfirth-carey.jpg' },
    { id: 'vicfirth-benante', name: 'Vic Firth Charlie Benante', brand: 'Vic Firth', price: 15, tier: 'budget',
      specs: 'Hickory, .580" x 16.5"',
      usedBy: ['Charlie Benante'],
      description: 'Classic thrash feel',
      image: 'vicfirth-benante.jpg' },
    { id: 'vicfirth-adler', name: 'Vic Firth Chris Adler', brand: 'Vic Firth', price: 15, tier: 'budget',
      specs: 'Hickory, .595" x 16"',
      usedBy: ['Chris Adler'],
      description: 'Groove metal power',
      image: 'vicfirth-adler.jpg' },
    { id: 'vater-weinberg', name: 'Vater Jay Weinberg 908', brand: 'Vater', price: 15, tier: 'budget',
      specs: 'Hickory, .570" x 16.5"',
      usedBy: ['Jay Weinberg'],
      description: 'Modern metal versatility',
      image: 'vater-weinberg.jpg' },
    { id: 'vater-dailor', name: 'Vater Brann Dailor', brand: 'Vater', price: 15, tier: 'budget',
      specs: 'Hickory, .580" x 16"',
      usedBy: ['Brann Dailor'],
      description: 'Progressive drumming sticks',
      image: 'vater-dailor.jpg' },
    { id: 'wincent-haake', name: 'Wincent Tomas Haake', brand: 'Wincent', price: 18, tier: 'budget',
      specs: 'Hickory, .565" x 16.5"',
      usedBy: ['Tomas Haake'],
      description: 'Swedish quality',
      image: 'wincent-haake.jpg' },
    // Standard sticks
    { id: 'vicfirth-5a', name: 'Vic Firth American Classic 5A', brand: 'Vic Firth', price: 12, tier: 'budget',
      specs: 'Hickory, .565" x 16"',
      usedBy: [],
      description: 'Industry standard',
      image: 'vicfirth-5a.jpg' },
    { id: 'vicfirth-5b', name: 'Vic Firth American Classic 5B', brand: 'Vic Firth', price: 12, tier: 'budget',
      specs: 'Hickory, .595" x 16"',
      usedBy: [],
      description: 'Slightly heavier classic',
      image: 'vicfirth-5b.jpg' },
    { id: 'vicfirth-x5a', name: 'Vic Firth Extreme 5A', brand: 'Vic Firth', price: 12, tier: 'budget',
      specs: 'Hickory, .565" x 16.5"',
      usedBy: [],
      description: 'Extended reach 5A',
      image: 'vicfirth-x5a.jpg' },
    { id: 'promark-2b', name: 'Promark Classic 2B', brand: 'Promark', price: 12, tier: 'budget',
      specs: 'Hickory, .630" x 16.125"',
      usedBy: [],
      description: 'Heavy rock stick',
      image: 'promark-2b.jpg' },
  ],
  heads: [
    // Batter heads
    { id: 'remo-emperor', name: 'Remo Emperor Coated', brand: 'Remo', price: 80, tier: 'mid',
      type: 'Batter - 2-ply',
      usedBy: ['Lars Ulrich', 'Dave Lombardo'],
      description: 'Warm, controlled 2-ply heads',
      image: 'remo-emperor.jpg' },
    { id: 'remo-pinstripe', name: 'Remo Pinstripe', brand: 'Remo', price: 75, tier: 'mid',
      type: 'Batter - 2-ply dampened',
      usedBy: ['Joey Jordison'],
      description: 'Low overtone with focused attack',
      image: 'remo-pinstripe.jpg' },
    { id: 'remo-powerstroke', name: 'Remo Powerstroke 3', brand: 'Remo', price: 85, tier: 'mid',
      type: 'Bass Drum',
      usedBy: ['Gene Hoglan', 'George Kollias'],
      description: 'Punchy bass drum heads',
      image: 'remo-powerstroke.jpg' },
    { id: 'evans-ec2', name: 'Evans EC2 Clear', brand: 'Evans', price: 78, tier: 'mid',
      type: 'Batter - 2-ply',
      usedBy: ['Tomas Haake', 'Matt Halpern'],
      description: 'Balanced tone with sustain control',
      image: 'evans-ec2.jpg' },
    { id: 'evans-hydraulic', name: 'Evans Hydraulic Glass', brand: 'Evans', price: 82, tier: 'mid',
      type: 'Batter - Oil-filled',
      usedBy: [],
      description: 'Maximum attack, minimum sustain',
      image: 'evans-hydraulic.jpg' },
    { id: 'evans-emad', name: 'Evans EMAD', brand: 'Evans', price: 90, tier: 'mid',
      type: 'Bass Drum',
      usedBy: ['Chris Adler', 'Jay Weinberg'],
      description: 'Externally mounted adjustable dampening',
      image: 'evans-emad.jpg' },
    { id: 'aquarian-superkick', name: 'Aquarian Super-Kick II', brand: 'Aquarian', price: 75, tier: 'mid',
      type: 'Bass Drum',
      usedBy: [],
      description: 'Focused, punchy bass drum',
      image: 'aquarian-superkick.jpg' },
  ],
  accessories: [
    // Triggers
    { id: 'roland-rt30', name: 'Roland RT-30 Series', brand: 'Roland', price: 150, tier: 'mid',
      type: 'Triggers',
      usedBy: ['Tomas Haake', 'George Kollias'],
      description: 'Reliable dual-zone triggers',
      image: 'roland-rt30.jpg' },
    { id: 'ddrum-triggers', name: 'ddrum Red Shot Triggers', brand: 'ddrum', price: 100, tier: 'budget',
      type: 'Triggers',
      usedBy: ['Vinnie Paul'],
      description: 'Clip-on acoustic triggers',
      image: 'ddrum-triggers.jpg' },
    // Practice pads
    { id: 'evans-realfeel', name: 'Evans RealFeel Practice Pad', brand: 'Evans', price: 35, tier: 'budget',
      type: 'Practice Pad',
      usedBy: [],
      description: 'Realistic rebound practice pad',
      image: 'evans-realfeel.jpg' },
    // Dampening
    { id: 'moongel', name: 'Moongel Dampener Pads', brand: 'RTOM', price: 10, tier: 'budget',
      type: 'Dampening',
      usedBy: [],
      description: 'Reusable gel dampeners',
      image: 'moongel.jpg' },
    // Metronome/Click
    { id: 'boss-db90', name: 'Boss DB-90 Dr. Beat', brand: 'Boss', price: 180, tier: 'mid',
      type: 'Metronome',
      usedBy: [],
      description: 'Professional metronome with rhythm coach',
      image: 'boss-db90.jpg' },
  ],
};

// All category definitions
export const KIT_CATEGORIES = [
  { key: 'drums', label: 'Shell Pack', icon: '🥁', description: 'Bass drum, toms & rack' },
  { key: 'snare', label: 'Snare Drum', icon: '🎯', description: 'The heart of your sound' },
  { key: 'cymbals', label: 'Cymbals', icon: '🔔', description: 'Hi-hats, crashes & rides' },
  { key: 'hardware', label: 'Hardware', icon: '⚙️', description: 'Pedals & throne' },
  { key: 'sticks', label: 'Sticks', icon: '🪵', description: 'Your connection to the kit' },
  { key: 'heads', label: 'Heads', icon: '🎪', description: 'Batter & resonant heads' },
  { key: 'accessories', label: 'Accessories', icon: '🔧', description: 'Triggers, pads & more' },
];

// Preset kits from famous drummers
export const PRESET_KITS = [
  {
    id: 'joey-jordison',
    drummer: 'Joey Jordison',
    band: 'Slipknot',
    emoji: '🎭',
    genre: 'Nu Metal',
    kit: {
      drums: 'pearl-reference-series',
      snare: 'pearl-joey',
      cymbals: 'paiste-rude',
      hardware: 'pearl-demon-drive',
      sticks: 'promark-joey',
    },
  },
  {
    id: 'lars-ulrich',
    drummer: 'Lars Ulrich',
    band: 'Metallica',
    emoji: '⚡',
    genre: 'Thrash Metal',
    kit: {
      drums: 'tama-starclassic-maple',
      snare: 'tama-lars-ulrich',
      cymbals: 'zildjian-a-custom',
      hardware: 'tama-iron-cobra',
      sticks: 'ahead-lars',
    },
  },
  {
    id: 'tomas-haake',
    drummer: 'Tomas Haake',
    band: 'Meshuggah',
    emoji: '🧠',
    genre: 'Djent',
    kit: {
      drums: 'sonor-sq2',
      snare: 'sonor-haake',
      cymbals: 'sabian-hhx',
      hardware: 'tama-speed-cobra',
      sticks: 'vicfirth-haake',
    },
  },
  {
    id: 'george-kollias',
    drummer: 'George Kollias',
    band: 'Nile',
    emoji: '💀',
    genre: 'Death Metal',
    kit: {
      drums: 'pearl-masterworks',
      snare: 'pearl-kollias',
      cymbals: 'zildjian-a-custom',
      hardware: 'pearl-demon-drive',
      sticks: 'vicfirth-kollias',
    },
  },
  {
    id: 'dave-lombardo',
    drummer: 'Dave Lombardo',
    band: 'Slayer',
    emoji: '🔥',
    genre: 'Thrash Metal',
    kit: {
      drums: 'tama-starclassic-maple',
      snare: 'tama-slp',
      cymbals: 'paiste-rude',
      hardware: 'tama-iron-cobra',
      sticks: 'promark-lombardo',
    },
  },
  {
    id: 'mike-portnoy',
    drummer: 'Mike Portnoy',
    band: 'Dream Theater',
    emoji: '🎵',
    genre: 'Progressive Metal',
    kit: {
      drums: 'tama-starclassic-maple',
      snare: 'tama-portnoy',
      cymbals: 'sabian-hhx',
      hardware: 'tama-iron-cobra',
      sticks: 'promark-portnoy',
    },
  },
  {
    id: 'mario-duplantier',
    drummer: 'Mario Duplantier',
    band: 'Gojira',
    emoji: '🐋',
    genre: 'Progressive Death',
    kit: {
      drums: 'tama-starclassic-walnut-birch',
      snare: 'tama-slp',
      cymbals: 'meinl-byzance',
      hardware: 'tama-speed-cobra',
      sticks: 'vicfirth-5a',
    },
  },
  {
    id: 'danny-carey',
    drummer: 'Danny Carey',
    band: 'Tool',
    emoji: '🌀',
    genre: 'Progressive Metal',
    kit: {
      drums: 'sonor-sq2',
      snare: 'sonor-danny',
      cymbals: 'paiste-signature',
      hardware: 'sonor-giant',
      sticks: 'vicfirth-carey',
    },
  },
  {
    id: 'jay-weinberg',
    drummer: 'Jay Weinberg',
    band: 'Slipknot',
    emoji: '🔊',
    genre: 'Nu Metal',
    kit: {
      drums: 'sjc-custom',
      snare: 'sjc-crucible',
      cymbals: 'zildjian-k-custom',
      hardware: 'dw-9000',
      sticks: 'vater-weinberg',
    },
  },
  {
    id: 'brann-dailor',
    drummer: 'Brann Dailor',
    band: 'Mastodon',
    emoji: '🦣',
    genre: 'Progressive Sludge',
    kit: {
      drums: 'dw-collectors',
      snare: 'ludwig-supraphonic',
      cymbals: 'meinl-byzance',
      hardware: 'dw-9000',
      sticks: 'vater-dailor',
    },
  },
];

// ==========================================
// GA4 EVENT TRACKING
// ==========================================

export const trackKitBuilderEvent = (eventName, params = {}) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'kit_builder',
      ...params,
    });
  }
};

// ==========================================
// URL UTILITIES
// ==========================================

export function isKitBuilderPage() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return false;
  const pathname = window.location.pathname;
  return pathname === '/tools/kit-builder' || pathname === '/tools/kit-builder/' ||
         pathname === '/kit-builder' || pathname.startsWith('/kit-builder?') ||
         pathname.startsWith('/tools/kit-builder?') ||
         pathname.startsWith('/builds/');
}

export function getKitFromURL() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const kit = {};
  
  KIT_CATEGORIES.forEach(cat => {
    const value = params.get(cat.key);
    if (value) kit[cat.key] = value;
  });
  
  const kitName = params.get('name');
  if (kitName) kit.kitName = decodeURIComponent(kitName);
  
  const startFrom = params.get('start');
  if (startFrom) kit.startFrom = startFrom;
  
  return Object.keys(kit).length > 0 ? kit : null;
}

export function updateKitURL(kit, useHistory = true) {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  
  const params = new URLSearchParams();
  
  KIT_CATEGORIES.forEach(cat => {
    if (kit[cat.key]) params.set(cat.key, kit[cat.key]);
  });
  
  if (kit.kitName) params.set('name', encodeURIComponent(kit.kitName));
  
  const queryString = params.toString();
  const basePath = window.location.pathname.includes('/tools/') ? '/tools/kit-builder' : '/kit-builder';
  const newUrl = queryString ? `${basePath}?${queryString}` : basePath;
  
  if (useHistory && window.history.replaceState) {
    window.history.replaceState(null, '', newUrl);
  }
}

export function generateShareableURL(kit, kitName) {
  const baseUrl = 'https://metalforge.io/tools/kit-builder';
  const params = new URLSearchParams();
  
  KIT_CATEGORIES.forEach(cat => {
    if (kit[cat.key]) params.set(cat.key, kit[cat.key]);
  });
  
  if (kitName) params.set('name', encodeURIComponent(kitName));
  
  return `${baseUrl}?${params.toString()}`;
}

// ==========================================
// AFFILIATE LINK HELPERS
// ==========================================

export const getKitBuilderThomannLink = (item, category) => {
  const searchTerm = item.name.replace(/["']/g, '');
  return `https://www.thomann.de/intl/search_dir.html?sw=${encodeURIComponent(searchTerm)}&ref=metalforge_kit_builder`;
};

export const getKitBuilderSweetwaterLink = (item, category) => {
  const searchTerm = item.name.replace(/["']/g, '');
  return `https://www.sweetwater.com/store/search?s=${encodeURIComponent(searchTerm)}&ref=metalforge`;
};

// ==========================================
// CALCULATE KIT STATISTICS
// ==========================================

export const calculateKitStats = (kit, catalog) => {
  let totalEur = 0;
  let itemCount = 0;
  const items = [];
  const brands = new Set();
  
  KIT_CATEGORIES.forEach(cat => {
    const selectedId = kit[cat.key];
    if (selectedId && catalog[cat.key]) {
      const item = catalog[cat.key].find(i => i.id === selectedId);
      if (item) {
        totalEur += item.price;
        itemCount++;
        items.push({ category: cat.key, item });
        brands.add(item.brand);
      }
    }
  });
  
  return {
    totalEur,
    totalUsd: Math.round(totalEur * EUR_TO_USD),
    itemCount,
    items,
    brands: Array.from(brands),
    completeness: Math.round((itemCount / 5) * 100), // 5 core categories
  };
};

// ==========================================
// RECOMMENDATIONS ENGINE
// ==========================================

export const getRecommendations = (kit, catalog, drummers = []) => {
  const recommendations = [];
  const stats = calculateKitStats(kit, catalog);
  
  // Missing essential categories
  const essentials = ['drums', 'snare', 'cymbals', 'hardware', 'sticks'];
  essentials.forEach(cat => {
    if (!kit[cat]) {
      recommendations.push({
        type: 'missing',
        category: cat,
        message: `Add a ${cat === 'drums' ? 'shell pack' : cat} to complete your kit`,
        priority: 'high',
      });
    }
  });
  
  // Budget suggestions
  if (stats.totalEur > 8000) {
    const budgetOption = catalog.cymbals?.find(c => c.tier === 'mid' && !kit.cymbals?.includes(c.id));
    if (budgetOption) {
      recommendations.push({
        type: 'budget_tip',
        message: `Save money: Consider ${budgetOption.name} (€${budgetOption.price}) instead`,
        item: budgetOption,
        priority: 'low',
      });
    }
  }
  
  // Upgrade suggestions based on tier
  stats.items.forEach(({ category, item }) => {
    if (item.tier === 'budget') {
      const upgrade = catalog[category]?.find(i => i.tier === 'mid' && i.brand === item.brand);
      if (upgrade) {
        recommendations.push({
          type: 'upgrade',
          category,
          message: `Upgrade: ${upgrade.name} for €${upgrade.price - item.price} more`,
          item: upgrade,
          priority: 'medium',
        });
      }
    }
  });
  
  // Brand pairing suggestions
  if (stats.brands.length === 1) {
    const brand = stats.brands[0];
    const compatibleItems = [];
    KIT_CATEGORIES.forEach(cat => {
      if (!kit[cat.key] && catalog[cat.key]) {
        const match = catalog[cat.key].find(i => i.brand === brand);
        if (match) compatibleItems.push({ category: cat.key, item: match });
      }
    });
    if (compatibleItems.length > 0) {
      recommendations.push({
        type: 'brand_match',
        message: `Complete your ${brand} setup with matching ${compatibleItems[0].category}`,
        item: compatibleItems[0].item,
        priority: 'medium',
      });
    }
  }
  
  // Drummer style suggestions
  const selectedUsedBy = new Set();
  stats.items.forEach(({ item }) => {
    item.usedBy?.forEach(name => selectedUsedBy.add(name));
  });
  
  if (selectedUsedBy.size > 0) {
    const topDrummer = Array.from(selectedUsedBy).sort((a, b) => {
      const aCount = stats.items.filter(i => i.item.usedBy?.includes(a)).length;
      const bCount = stats.items.filter(i => i.item.usedBy?.includes(b)).length;
      return bCount - aCount;
    })[0];
    
    // Find what else this drummer uses that isn't selected
    KIT_CATEGORIES.forEach(cat => {
      if (!kit[cat.key] && catalog[cat.key]) {
        const drummerGear = catalog[cat.key].find(i => i.usedBy?.includes(topDrummer));
        if (drummerGear) {
          recommendations.push({
            type: 'drummer_match',
            message: `${topDrummer} uses ${drummerGear.name}`,
            item: drummerGear,
            category: cat.key,
            drummer: topDrummer,
            priority: 'medium',
          });
        }
      }
    });
  }
  
  return recommendations.slice(0, 5);
};

// ==========================================
// FIND SIMILAR DRUMMERS
// ==========================================

export const findSimilarDrummers = (kit, catalog, drummers) => {
  const selectedGear = [];
  
  KIT_CATEGORIES.forEach(cat => {
    const selectedId = kit[cat.key];
    if (selectedId && catalog[cat.key]) {
      const item = catalog[cat.key].find(i => i.id === selectedId);
      if (item?.usedBy) {
        selectedGear.push(...item.usedBy);
      }
    }
  });
  
  // Count occurrences
  const drummerCounts = {};
  selectedGear.forEach(name => {
    drummerCounts[name] = (drummerCounts[name] || 0) + 1;
  });
  
  // Sort by match count
  return Object.entries(drummerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      matchCount: count,
      matchPercentage: Math.round((count / 5) * 100),
      drummer: drummers?.find(d => d.name === name),
    }));
};

// ==========================================
// SCHEMA MARKUP FOR SEO
// ==========================================

export const generateKitSchema = (kit, catalog, kitName) => {
  const stats = calculateKitStats(kit, catalog);
  
  const products = stats.items.map(({ category, item }) => ({
    "@type": "Product",
    "name": item.name,
    "brand": { "@type": "Brand", "name": item.brand },
    "category": category,
    "offers": {
      "@type": "Offer",
      "price": item.price,
      "priceCurrency": "EUR",
    }
  }));
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": kitName || "Custom Metal Drum Kit",
    "description": `Custom drum kit build with ${stats.itemCount} pieces totaling €${stats.totalEur}`,
    "numberOfItems": stats.itemCount,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": product
    })),
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": Math.min(...stats.items.map(i => i.item.price)),
      "highPrice": Math.max(...stats.items.map(i => i.item.price)),
      "priceCurrency": "EUR",
      "offerCount": stats.itemCount
    }
  };
};

// ==========================================
// STYLES
// ==========================================

export const kitBuilderStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    maxWidth: 1400,
    marginHorizontal: 'auto',
    paddingHorizontal: spacing.md,
    paddingBottom: 60,
  },
  contentContainerMobile: {
    paddingHorizontal: spacing.sm,
  },
  
  // Header
  header: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  backButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  titleSection: {
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
  },
  
  // Start Options
  startOptions: {
    marginVertical: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    padding: spacing.lg,
  },
  startOptionsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  startOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  startOption: {
    flex: 1,
    minWidth: 200,
    borderRadius: 12,
    borderWidth: 2,
    padding: spacing.lg,
    alignItems: 'center',
  },
  startOptionActive: {
    borderWidth: 3,
  },
  startOptionIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  startOptionTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  startOptionDesc: {
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  
  // Budget Templates
  budgetSection: {
    marginVertical: spacing.md,
  },
  budgetScroll: {
    paddingVertical: spacing.sm,
  },
  budgetCard: {
    width: 180,
    borderRadius: 12,
    borderWidth: 2,
    padding: spacing.md,
    marginRight: spacing.md,
    alignItems: 'center',
  },
  budgetCardActive: {
    borderWidth: 3,
  },
  budgetEmoji: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  budgetName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  budgetDesc: {
    fontSize: fontSize.xs,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  budgetPrice: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  
  // Preset Kits
  presetsSection: {
    marginVertical: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
    padding: spacing.lg,
  },
  presetsHeader: {
    marginBottom: spacing.md,
  },
  presetsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  presetsSubtitle: {
    fontSize: fontSize.sm,
  },
  presetsScroll: {
    marginHorizontal: -spacing.md,
  },
  presetsScrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  presetCard: {
    width: 160,
    borderRadius: 12,
    borderWidth: 2,
    padding: spacing.md,
    alignItems: 'center',
  },
  presetCardActive: {
    borderWidth: 3,
  },
  presetEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  presetDrummer: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  presetBand: {
    fontSize: fontSize.xs,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  presetGenre: {
    fontSize: fontSize.xs,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  presetPrice: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  
  // Main Content Layout
  mainContent: {
    flexDirection: 'column',
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
  mainContentDesktop: {
    flexDirection: 'row',
  },
  
  // Left Panel - Gear Selection
  leftPanel: {
    flex: 1,
  },
  leftPanelDesktop: {
    flex: 2,
    maxWidth: '65%',
  },
  
  // Category Tabs
  categoryTabs: {
    marginBottom: spacing.md,
  },
  categoryTabsContent: {
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    gap: spacing.xs,
  },
  categoryTabActive: {
    borderWidth: 2,
  },
  categoryTabHasGear: {
    borderWidth: 2,
  },
  categoryTabIcon: {
    fontSize: 16,
  },
  categoryTabLabel: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  categoryTabCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTabCheckIcon: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Search & Filters
  filtersSection: {
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  searchInput: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
  },
  filterChipActive: {
    borderWidth: 2,
  },
  filterChipText: {
    fontSize: fontSize.sm,
  },
  
  // Gear Grid
  gearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  gearCard: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 2,
    padding: spacing.md,
  },
  gearCardDesktop: {
    width: 'calc(50% - 8px)',
  },
  gearCardSelected: {
    borderWidth: 3,
  },
  gearCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  gearCardBrand: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  gearCardTier: {
    fontSize: fontSize.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  gearCardName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  gearCardSpecs: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  gearCardPrice: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  gearCardUsedBy: {
    marginBottom: spacing.md,
  },
  gearCardUsedByLabel: {
    fontSize: fontSize.xs,
    marginBottom: 2,
  },
  gearCardUsedByNames: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  gearCardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  gearCardButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  gearCardButtonAdd: {
    backgroundColor: '#22c55e',
  },
  gearCardButtonRemove: {
    backgroundColor: '#ef4444',
  },
  gearCardButtonBuy: {
    backgroundColor: '#3b82f6',
  },
  gearCardButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: '#fff',
  },
  
  // Right Panel - Summary
  rightPanel: {
    flex: 1,
  },
  rightPanelDesktop: {
    flex: 1,
    maxWidth: '35%',
    position: 'sticky',
    top: 20,
    alignSelf: 'flex-start',
  },
  
  // Kit Summary
  summaryCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: spacing.lg,
  },
  summaryTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  summaryItems: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  summaryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  summaryItemIcon: {
    fontSize: 18,
  },
  summaryItemInfo: {
    flex: 1,
  },
  summaryItemCategory: {
    fontSize: fontSize.xs,
  },
  summaryItemName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  summaryItemPrice: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  summaryItemRemove: {
    padding: spacing.xs,
  },
  
  // Total
  summaryTotal: {
    paddingVertical: spacing.md,
    borderTopWidth: 2,
    marginTop: spacing.sm,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  summaryTotalPrice: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  summaryTotalUsd: {
    fontSize: fontSize.sm,
    textAlign: 'right',
  },
  
  // Similar Drummers
  similarSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
  },
  similarTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  similarDrummer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    gap: spacing.sm,
  },
  similarDrummerImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  similarDrummerInfo: {
    flex: 1,
  },
  similarDrummerName: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  similarDrummerMatch: {
    fontSize: fontSize.xs,
  },
  
  // Recommendations
  recommendationsSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
  },
  recommendationsTitle: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  recommendationIcon: {
    fontSize: 16,
  },
  recommendationText: {
    flex: 1,
    fontSize: fontSize.sm,
  },
  recommendationButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  recommendationButtonText: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: '#fff',
  },
  
  // Action Buttons
  actionsSection: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  shareButton: {
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
  },
  shareButtonDisabled: {
    opacity: 0.5,
  },
  shareButtonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: '#fff',
  },
  clearButton: {
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: fontSize.sm,
  },
  
  // Share Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 16,
    padding: spacing.xl,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  modalLinkBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  modalLink: {
    fontSize: fontSize.sm,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  modalButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCopy: {
    backgroundColor: '#6366f1',
  },
  modalButtonTwitter: {
    backgroundColor: '#1da1f2',
  },
  modalButtonReddit: {
    backgroundColor: '#ff4500',
  },
  modalButtonText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: '#fff',
  },
  modalClose: {
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderTopWidth: 1,
    marginTop: spacing.md,
    paddingTop: spacing.md,
  },
  modalCloseText: {
    fontSize: fontSize.md,
  },
  
  // Kit Name Input
  kitNameSection: {
    marginVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    padding: spacing.md,
  },
  kitNameLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  kitNameInput: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
  },
});

// Export default for lazy loading
export default {
  KIT_BUILDER_CATALOG,
  KIT_CATEGORIES,
  PRESET_KITS,
  BUDGET_TEMPLATES,
  isKitBuilderPage,
  getKitFromURL,
  updateKitURL,
  generateShareableURL,
  calculateKitStats,
  getRecommendations,
  findSimilarDrummers,
  generateKitSchema,
  getKitBuilderThomannLink,
  getKitBuilderSweetwaterLink,
  trackKitBuilderEvent,
  kitBuilderStyles,
};
