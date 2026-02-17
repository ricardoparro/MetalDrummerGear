// Vercel Serverless Function - Get drummer profile as markdown
// Issue #451 - Create markdown API endpoints

// Import drummers data from the main index
import drummersHandler from '../../drummers/index.js';

// Drummers data - simplified copy for markdown generation
const drummers = [
  { id: 1, slug: 'lars-ulrich', name: 'Lars Ulrich', band: 'Metallica', genre: 'Thrash Metal', country: 'Denmark' },
  { id: 2, slug: 'joey-jordison', name: 'Joey Jordison', band: 'Slipknot', genre: 'Nu-Metal', country: 'USA' },
  { id: 3, slug: 'gene-hoglan', name: 'Gene Hoglan', band: 'Death/Testament', genre: 'Death/Thrash Metal', country: 'USA' },
  { id: 4, slug: 'dave-lombardo', name: 'Dave Lombardo', band: 'Slayer', genre: 'Thrash Metal', country: 'Cuba/USA' },
  { id: 5, slug: 'tomas-haake', name: 'Tomas Haake', band: 'Meshuggah', genre: 'Djent/Extreme Metal', country: 'Sweden' },
  { id: 6, slug: 'george-kollias', name: 'George Kollias', band: 'Nile', genre: 'Technical Death Metal', country: 'Greece' },
  { id: 7, slug: 'eloy-casagrande', name: 'Eloy Casagrande', band: 'Slipknot', genre: 'Groove/Nu-Metal', country: 'Brazil' },
  { id: 8, slug: 'ray-luzier', name: 'Ray Luzier', band: 'Korn', genre: 'Nu-Metal', country: 'USA' },
  { id: 9, slug: 'john-otto', name: 'John Otto', band: 'Limp Bizkit', genre: 'Nu-Metal', country: 'USA' },
  { id: 10, slug: 'jay-weinberg', name: 'Jay Weinberg', band: 'Slipknot', genre: 'Nu-Metal', country: 'USA' },
  { id: 11, slug: 'vinnie-paul', name: 'Vinnie Paul', band: 'Pantera', genre: 'Groove Metal', country: 'USA' },
  { id: 12, slug: 'charlie-benante', name: 'Charlie Benante', band: 'Anthrax', genre: 'Thrash Metal', country: 'USA' },
  { id: 13, slug: 'mike-portnoy', name: 'Mike Portnoy', band: 'Dream Theater', genre: 'Progressive Metal', country: 'USA' },
  { id: 14, slug: 'danny-carey', name: 'Danny Carey', band: 'Tool', genre: 'Progressive Metal', country: 'USA' },
  { id: 15, slug: 'mario-duplantier', name: 'Mario Duplantier', band: 'Gojira', genre: 'Progressive Death Metal', country: 'France' },
  { id: 16, slug: 'brann-dailor', name: 'Brann Dailor', band: 'Mastodon', genre: 'Progressive Sludge Metal', country: 'USA' },
  { id: 17, slug: 'chris-adler', name: 'Chris Adler', band: 'Lamb of God', genre: 'Groove Metal', country: 'USA' },
  { id: 18, slug: 'matt-halpern', name: 'Matt Halpern', band: 'Periphery', genre: 'Djent/Progressive Metal', country: 'USA' },
  { id: 19, slug: 'inferno', name: 'Inferno', band: 'Behemoth', genre: 'Blackened Death Metal', country: 'Poland' },
  { id: 20, slug: 'hellhammer', name: 'Hellhammer', band: 'Mayhem', genre: 'Black Metal', country: 'Norway' },
  { id: 21, slug: 'pete-sandoval', name: 'Pete Sandoval', band: 'Morbid Angel', genre: 'Death Metal', country: 'USA' },
  { id: 22, slug: 'art-cruz', name: 'Art Cruz', band: 'Lamb of God', genre: 'Groove Metal', country: 'USA' },
];

function generateSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    res.status(400).send('# Error\n\nMissing drummer ID parameter.');
    return;
  }

  // Fetch the full drummer data from the main API
  let drummerData = null;
  
  // Create a mock request/response to call the drummers API
  const mockReq = { query: { id } };
  let capturedData = null;
  const mockRes = {
    setHeader: () => {},
    status: (code) => ({
      json: (data) => { capturedData = { code, data }; },
      send: (data) => { capturedData = { code, data }; }
    }),
    json: (data) => { capturedData = { code: 200, data }; }
  };

  // Try to find by slug or id
  const searchId = id.toLowerCase();
  const localDrummer = drummers.find(d => 
    d.slug === searchId || 
    d.id.toString() === searchId ||
    generateSlug(d.name) === searchId
  );

  if (!localDrummer) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.status(404).send(`# Drummer Not Found

The drummer "${id}" was not found in our database.

[Browse all drummers](https://metalforge.io)
`);
    return;
  }

  // Generate markdown response
  const today = new Date().toISOString().split('T')[0];
  
  const markdown = `# ${localDrummer.name}

**Band:** ${localDrummer.band}  
**Genre:** ${localDrummer.genre}  
**Country:** ${localDrummer.country}

---

## Profile

${localDrummer.name} is a professional metal drummer known for their work with ${localDrummer.band}.

For full biography, gear details, videos, and more, visit:
**[${localDrummer.name} on MetalForge](https://metalforge.io/drummer/${localDrummer.slug})**

---

## Quick Links

- [Full Profile](https://metalforge.io/drummer/${localDrummer.slug})
- [All Drummers](https://metalforge.io)
- [LLM-Optimized Data](https://metalforge.io/llms-full.txt)

---

*Last updated: ${today}*  
*Source: [MetalForge.io](https://metalforge.io)*
`;

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.status(200).send(markdown);
}
