// Vercel Serverless Function - Homepage as markdown (Markdown for Agents)
// Served when `/` is requested with `Accept: text/markdown` (via middleware.js).

// Rough token estimate (~4 chars/token) so agents can budget context.
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

export default function handler(req, res) {
  const today = new Date().toISOString().split('T')[0];

  const markdown = `# MetalForge

> The database of professional metal drummers and their gear.
> ${today} · https://metalforge.io

MetalForge catalogs the kits, cymbals, pedals, hardware, and sticks used by the
world's top metal drummers — verified and structured for both humans and agents.

## Start here

- **All drummers:** https://metalforge.io
- **LLM content index:** https://metalforge.io/llms/index.md
- **Full LLM corpus:** https://metalforge.io/llms-full.txt
- **API catalog:** https://metalforge.io/.well-known/api-catalog

## Featured drummers

- [Lars Ulrich (Metallica)](https://metalforge.io/drummer/lars-ulrich)
- [Danny Carey (Tool)](https://metalforge.io/drummer/danny-carey)
- [Mario Duplantier (Gojira)](https://metalforge.io/drummer/mario-duplantier)
- [Tomas Haake (Meshuggah)](https://metalforge.io/drummer/tomas-haake)
- [Dave Lombardo (Slayer)](https://metalforge.io/drummer/dave-lombardo)

## For agents

Request any drummer page with \`Accept: text/markdown\` to get a markdown
profile, e.g. \`GET /drummer/lars-ulrich\` with header \`Accept: text/markdown\`.

---

*Source: [MetalForge.io](https://metalforge.io)*
`;

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.setHeader('Vary', 'Accept');
  res.setHeader('x-markdown-tokens', String(estimateTokens(markdown)));
  res.status(200).send(markdown);
}
