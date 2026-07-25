// Vercel Serverless Function - bot-facing meta HTML for `/`.
//
// Issue #5038 (3rd occurrence of #4368/#4727): `/` has a physical index.html
// in the Expo static export, and Vercel gives the filesystem precedence over
// vercel.json rewrites ("the source property should NOT be a file because
// precedence is given to the filesystem prior to rewrites being applied" —
// Vercel docs), so vercel.json:534's bot-UA rewrite for "/" never actually
// runs. middleware.js runs before that filesystem check (already proven for
// the markdown-negotiation feature, see api/home/markdown.js), so it routes
// bot UAs here directly instead of relying on the vercel.json rewrite.
//
// Delegates to the exact same handler every other route uses so title/OG/
// JSON-LD output can't drift from api/meta/[...path].js (CLAUDE.md: one data
// module per domain, never a second copy - see the now-dead api/meta/index.js
// this file deliberately does NOT repeat that mistake).
import handler from '../meta/[...path].js';

export default function homeMetaHandler(req, res) {
  req.query = { ...(req.query || {}), path: '' };
  return handler(req, res);
}
