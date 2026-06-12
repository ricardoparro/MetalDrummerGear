// Shared-Gear Drummers Block — Issue #1006 (split 2/3 of #874)
//
// Reusable internal-linking block: given a drummer, surface OTHER drummers who
// play the same gear series. Source of truth is the generated GEAR_INDEX
// (#995), which maps brand → series → [drummers using it]. For each series the
// current drummer appears in, we render a line — e.g.
//   "Lars Ulrich plays Tama Starclassic Maple — so do Dave Lombardo, …"
// linking each co-user with descriptive anchor text.
//
// Depends on #995 (GEAR_INDEX). Page wiring across every drummer/gear page is
// #1007 (split 3/3 of #874); this PR stub-tests it on the Lars Ulrich page.

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { GEAR_INDEX } from '../data/gearIndex';

// Max co-users listed per gear series.
const MAX_PER_SERIES = 5;
// Cap total outbound links in this block so a page stays well under the
// 50-internal-links budget once every block is combined (#1006 verify #3).
const MAX_TOTAL_LINKS = 20;

function toSlug(name) {
  return (name || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// Is `entry` the current drummer? Match on id first, fall back to slug.
function isSelf(entry, drummer) {
  if (entry.id != null && drummer.id != null) return entry.id === drummer.id;
  return entry.slug === toSlug(drummer.name);
}

// Build the shared-gear lines for a drummer by scanning GEAR_INDEX for every
// (brand, series) the drummer belongs to and collecting the other members.
// Returns [{ brand, series, label, others: [{ name, slug }] }].
export function getSharedGearLines(drummer, indexOverride) {
  const index = indexOverride || GEAR_INDEX;
  if (!drummer || !index) return [];

  const lines = [];
  let linkBudget = MAX_TOTAL_LINKS;

  for (const [brand, seriesObj] of Object.entries(index)) {
    if (linkBudget <= 0) break;
    for (const [series, members] of Object.entries(seriesObj)) {
      if (linkBudget <= 0) break;
      if (!Array.isArray(members) || !members.some((m) => isSelf(m, drummer))) continue;

      const others = members
        .filter((m) => !isSelf(m, drummer))
        .slice(0, MAX_PER_SERIES)
        .map((m) => ({ name: m.name, slug: m.slug || toSlug(m.name) }))
        .slice(0, linkBudget);

      if (others.length === 0) continue;
      linkBudget -= others.length;

      lines.push({
        brand,
        series,
        label: `${brand} ${series}`,
        others,
      });
    }
  }

  return lines;
}

// One co-user link. Visible text is the name (reads naturally inside the
// sentence), but the accessible label is descriptive — not a bare name — so
// the link carries SEO/a11y weight (#1006 action 4).
function CoUserLink({ person, gearLabel }) {
  const url = `/drummer/${person.slug}`;
  const aria = `${person.name} also plays ${gearLabel}`;
  if (Platform.OS === 'web') {
    return (
      <a href={url} aria-label={aria} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 600 }}>
        {person.name}
      </a>
    );
  }
  return (
    <Text accessibilityRole="link" accessibilityLabel={aria} style={styles.link}>
      {person.name}
    </Text>
  );
}

function GearLine({ line, drummerName, theme }) {
  return (
    <Text style={[styles.line, { color: theme.text }]}>
      {`${drummerName} plays `}
      <Text style={styles.gear}>{line.label}</Text>
      {' — so do '}
      {line.others.map((person, i) => (
        <Text key={person.slug}>
          {i > 0 ? (i === line.others.length - 1 ? ' and ' : ', ') : ''}
          <CoUserLink person={person} gearLabel={line.label} />
        </Text>
      ))}
      {'.'}
    </Text>
  );
}

export default function SharedGearDrummersBlock({ drummer, theme, gearIndex }) {
  const t = theme || { text: '#111', secondaryText: '#666', background: '#fff', border: '#e5e5e5', card: '#fff' };
  const lines = useMemo(() => getSharedGearLines(drummer, gearIndex), [drummer, gearIndex]);

  if (lines.length === 0) return null;

  const firstName = (drummer.name || '').split(' ')[0];

  return (
    <View style={[styles.section, { backgroundColor: t.card, borderColor: t.border }]}>
      <Text style={[styles.title, { color: t.text }]} accessibilityRole="header">
        Drummers Using the Same Gear
      </Text>
      {lines.map((line) => (
        <GearLine key={`${line.brand}-${line.series}`} line={line} drummerName={firstName} theme={t} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  line: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
  },
  gear: {
    fontWeight: '700',
  },
  link: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
