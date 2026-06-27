// CI guard: verify the core data modules load as real ES modules.
//
// Why this exists: `node --check` only parses in *script* mode. A stray `};`
// that closes a big object literal early (e.g. inside albumArticles.js) still
// passes `node --check`, but at runtime the ES `import()` either throws or
// silently drops every entry after the stray brace — so article pages vanish
// and the sitemap (which imports ALBUM_ARTICLES) shrinks or 500s, with green CI.
// This happened once (a `nightmare-drum-setup` entry landed after an early `};`).
//
// This guard imports each module the way production does and asserts a sane
// minimum entry count, so that class of breakage fails the PR instead of main.

const checks = [
  { file: '../packages/frontend/data/albumArticles.js',   export: 'ALBUM_ARTICLES',     min: 200 },
  { file: '../packages/frontend/data/soundLikeGuides.js', export: 'SOUND_LIKE_GUIDES',  min: 30 },
  { file: '../packages/frontend/data/signatureLicks.js',  export: 'SIGNATURE_LICKS',    min: 60 },
];

let failed = false;
for (const c of checks) {
  try {
    const mod = await import(new URL(c.file, import.meta.url).href);
    const obj = mod[c.export];
    if (!obj || typeof obj !== 'object') {
      console.error(`✗ ${c.file}: export \`${c.export}\` missing or not an object`);
      failed = true; continue;
    }
    const n = Object.keys(obj).length;
    if (n < c.min) {
      console.error(`✗ ${c.file}: ${c.export} has ${n} entries, expected >= ${c.min} (early-close / dropped-entries bug?)`);
      failed = true; continue;
    }
    console.log(`✓ ${c.file}: ${c.export} = ${n} entries`);
  } catch (e) {
    console.error(`✗ ${c.file}: import() failed — ${e.message}`);
    failed = true;
  }
}
process.exit(failed ? 1 : 0);
