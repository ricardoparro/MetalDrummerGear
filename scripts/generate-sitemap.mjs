// Build-time sitemap pre-render.
//
// Why: /sitemap.xml was served by the api/sitemap.js serverless function,
// which imports albumArticles.js (~50k lines) plus several other data modules
// on every Googlebot fetch. The cold-start latency risked sitemap-fetch
// timeouts. Emitting a static dist/sitemap.xml at build time makes the
// response instant and removes the function from the crawl hot path.
//
// The XML is byte-identical to what the function returns (same buildSitemapXml),
// so discovery is unaffected — only latency improves. The serverless function
// stays in place as a fallback, reachable directly at /api/sitemap.

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { buildSitemapXml } from '../api/sitemap.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'packages', 'frontend', 'dist', 'sitemap.xml');

const xml = buildSitemapXml();
const urlCount = (xml.match(/<loc>/g) || []).length;

writeFileSync(outPath, xml, 'utf8');
console.log(`[generate-sitemap] wrote ${urlCount} URLs to ${outPath}`);
