// Vercel Serverless Function - robots.txt

export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=86400');

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://metaldrummergear.vercel.app/sitemap.xml
`;

  res.status(200).send(robotsTxt);
}
