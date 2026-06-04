#!/usr/bin/env node
/**
 * Fetch GA4 + Search Console metrics and rewrite .agents/ceo/metrics.md
 * so the CEO agent always reads fresh numbers before deciding anything.
 *
 * Run automatically by .agents/run-agent.sh when invoked with agent=ceo.
 *
 * Required env (when credentials available):
 *   GOOGLE_APPLICATION_CREDENTIALS  path to service-account JSON
 *   GA4_PROPERTY_ID                 GA4 numeric Property ID (not the G-XXX measurement ID)
 *   GSC_SITE                        Search Console site URL, e.g. "https://metalforge.io/"
 *
 * Fallback: if credentials are missing, writes a clearly-flagged placeholder
 * section so metrics.md stays honest about being stale instead of silently
 * showing old numbers.
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const METRICS_FILE = path.join(REPO_ROOT, '.agents/ceo/metrics.md');

const LOOKBACK_DAYS = 7;
const TOP_N = 10;

function isoDaysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().split('T')[0];
}

async function fetchGA4() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!propertyId || !creds) {
    return { available: false, reason: !propertyId ? 'GA4_PROPERTY_ID missing' : 'GOOGLE_APPLICATION_CREDENTIALS missing' };
  }
  let BetaAnalyticsDataClient;
  try {
    ({ BetaAnalyticsDataClient } = require('@google-analytics/data'));
  } catch {
    return { available: false, reason: '@google-analytics/data not installed (npm i @google-analytics/data)' };
  }
  const client = new BetaAnalyticsDataClient();
  const property = `properties/${propertyId}`;
  const dateRanges = [{ startDate: isoDaysAgo(LOOKBACK_DAYS), endDate: 'today' }];

  const [totals] = await client.runReport({
    property,
    dateRanges,
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
    ],
  });

  const [byDay] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
  });

  const [topPages] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: TOP_N,
  });

  const [sources] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: TOP_N,
  });

  const num = (r, i) => parseFloat(r.metricValues[i].value || '0');
  return {
    available: true,
    totals: totals.rows?.[0] ? {
      activeUsers: num(totals.rows[0], 0),
      sessions: num(totals.rows[0], 1),
      pageViews: num(totals.rows[0], 2),
      engagementRate: num(totals.rows[0], 3),
      avgSessionDuration: num(totals.rows[0], 4),
    } : null,
    byDay: (byDay.rows || []).map(r => ({
      date: r.dimensionValues[0].value,
      users: num(r, 0),
      pageViews: num(r, 1),
    })),
    topPages: (topPages.rows || []).map(r => ({
      path: r.dimensionValues[0].value,
      pageViews: num(r, 0),
      users: num(r, 1),
    })),
    sources: (sources.rows || []).map(r => ({
      channel: r.dimensionValues[0].value,
      sessions: num(r, 0),
      users: num(r, 1),
    })),
  };
}

async function fetchGSC() {
  const site = process.env.GSC_SITE;
  const creds = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!site || !creds) {
    return { available: false, reason: !site ? 'GSC_SITE missing' : 'GOOGLE_APPLICATION_CREDENTIALS missing' };
  }
  let google;
  try {
    ({ google } = require('googleapis'));
  } catch {
    return { available: false, reason: 'googleapis not installed (npm i googleapis)' };
  }
  const auth = new google.auth.GoogleAuth({ scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
  const client = await auth.getClient();
  const webmasters = google.webmasters({ version: 'v3', auth: client });

  const startDate = isoDaysAgo(LOOKBACK_DAYS);
  const endDate = new Date().toISOString().split('T')[0];

  const query = async (dimensions) => {
    const res = await webmasters.searchanalytics.query({
      siteUrl: site,
      requestBody: { startDate, endDate, dimensions, rowLimit: TOP_N },
    });
    return res.data.rows || [];
  };

  const [totals, topQueries, topPages, gaps] = await Promise.all([
    query([]),
    query(['query']),
    query(['page']),
    webmasters.searchanalytics.query({
      siteUrl: site,
      requestBody: {
        startDate, endDate,
        dimensions: ['query'],
        rowLimit: 25,
        dimensionFilterGroups: [{ filters: [{ dimension: 'query', operator: 'contains', expression: '' }] }],
      },
    }).then(r => (r.data.rows || []).filter(row => row.impressions >= 50 && row.ctr < 0.02).slice(0, TOP_N)),
  ]);

  return {
    available: true,
    totals: totals[0] ? {
      impressions: totals[0].impressions,
      clicks: totals[0].clicks,
      ctr: totals[0].ctr,
      position: totals[0].position,
    } : null,
    topQueries: topQueries.map(r => ({
      query: r.keys[0],
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      position: r.position,
    })),
    topPages: topPages.map(r => ({
      page: r.keys[0],
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      position: r.position,
    })),
    gaps: gaps.map(r => ({
      query: r.keys[0],
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      position: r.position,
    })),
  };
}

function renderTable(headers, rows) {
  if (!rows.length) return '_no data_';
  const out = [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`];
  for (const r of rows) out.push(`| ${r.join(' | ')} |`);
  return out.join('\n');
}

function pct(x) { return x == null ? '?' : `${(x * 100).toFixed(2)}%`; }
function num(x) { return x == null ? '?' : Math.round(x).toLocaleString(); }

function renderMarkdown(ga4, gsc) {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const lines = [];
  lines.push(`# MetalForge Metrics`);
  lines.push('');
  lines.push(`*Auto-refreshed by \`.agents/scripts/fetch-metrics.cjs\` — last run ${now}*`);
  lines.push(`*Lookback: last ${LOOKBACK_DAYS} days*`);
  lines.push('');
  lines.push('---');
  lines.push('');

  lines.push('## GA4 — Audience');
  if (!ga4.available) {
    lines.push(`> ⚠️ **GA4 data unavailable:** ${ga4.reason}`);
  } else if (ga4.totals) {
    lines.push(renderTable(
      ['Metric', 'Last 7d'],
      [
        ['Active users', num(ga4.totals.activeUsers)],
        ['Sessions', num(ga4.totals.sessions)],
        ['Page views', num(ga4.totals.pageViews)],
        ['Engagement rate', pct(ga4.totals.engagementRate)],
        ['Avg session (s)', Math.round(ga4.totals.avgSessionDuration || 0)],
      ],
    ));
    lines.push('');
    lines.push('### Top pages (by page views, last 7d)');
    lines.push(renderTable(
      ['Page', 'Views', 'Users'],
      ga4.topPages.map(p => [p.path, num(p.pageViews), num(p.users)]),
    ));
    lines.push('');
    lines.push('### Traffic sources');
    lines.push(renderTable(
      ['Channel', 'Sessions', 'Users'],
      ga4.sources.map(s => [s.channel, num(s.sessions), num(s.users)]),
    ));
  }
  lines.push('');

  lines.push('## Search Console — Search performance');
  if (!gsc.available) {
    lines.push(`> ⚠️ **GSC data unavailable:** ${gsc.reason}`);
  } else if (gsc.totals) {
    lines.push(renderTable(
      ['Metric', 'Last 7d'],
      [
        ['Impressions', num(gsc.totals.impressions)],
        ['Clicks', num(gsc.totals.clicks)],
        ['CTR', pct(gsc.totals.ctr)],
        ['Avg position', (gsc.totals.position || 0).toFixed(1)],
      ],
    ));
    lines.push('');
    lines.push('### Top queries');
    lines.push(renderTable(
      ['Query', 'Impr', 'Clicks', 'CTR', 'Pos'],
      gsc.topQueries.map(q => [q.query, num(q.impressions), num(q.clicks), pct(q.ctr), q.position.toFixed(1)]),
    ));
    lines.push('');
    lines.push('### 🎯 Content-gap queries (impr ≥50, CTR <2%) — CEO MUST address');
    if (gsc.gaps.length === 0) {
      lines.push('_no significant gaps detected — all queries with traction have decent CTR_');
    } else {
      lines.push(renderTable(
        ['Query', 'Impr', 'CTR', 'Pos', 'Action'],
        gsc.gaps.map(q => [q.query, num(q.impressions), pct(q.ctr), q.position.toFixed(1), 'open issue to answer better']),
      ));
    }
  }
  lines.push('');
  lines.push('---');
  lines.push(`*Re-run manually: \`node .agents/scripts/fetch-metrics.cjs\`*`);
  lines.push('');

  return lines.join('\n');
}

(async () => {
  let ga4, gsc;
  try { ga4 = await fetchGA4(); } catch (e) { ga4 = { available: false, reason: `GA4 error: ${e.message}` }; }
  try { gsc = await fetchGSC(); } catch (e) { gsc = { available: false, reason: `GSC error: ${e.message}` }; }
  const md = renderMarkdown(ga4, gsc);
  fs.writeFileSync(METRICS_FILE, md);
  process.stderr.write(`Wrote ${METRICS_FILE} (GA4=${ga4.available} GSC=${gsc.available})\n`);
})();
