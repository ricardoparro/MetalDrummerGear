# Embeddable Gear Widget

> Issue #744: Distributed Marketing via Content Creators

The MetalForge Embeddable Widget allows content creators, bloggers, and websites to embed drummer gear information directly into their pages.

## Quick Start

Add this code to your website:

```html
<iframe 
  src="https://metalforge.io/embed/joey-jordison" 
  width="400" 
  height="600"
  frameborder="0"
  style="border: none; border-radius: 12px;"
></iframe>
```

Replace `joey-jordison` with any drummer's slug (lowercase name with hyphens).

## Drummer Slugs

Slugs are generated from drummer names:
- Joey Jordison → `joey-jordison`
- Lars Ulrich → `lars-ulrich`
- Dave Lombardo → `dave-lombardo`
- Tomas Haake → `tomas-haake`
- Danny Carey → `danny-carey`

Find all drummers at [metalforge.io/drummers](https://metalforge.io/drummers)

## Customization

### Theme

Add `?theme=light` or `?theme=dark` (default):

```html
<!-- Light theme -->
<iframe src="https://metalforge.io/embed/joey-jordison?theme=light" ...></iframe>

<!-- Dark theme (default) -->
<iframe src="https://metalforge.io/embed/joey-jordison?theme=dark" ...></iframe>
```

### Sizing

Recommended dimensions:
- **Compact:** 300×500
- **Standard:** 400×600
- **Large:** 500×700

The widget is responsive and adapts to any size, but minimum width of 280px is recommended.

## Widget Features

- ✅ **Responsive design** — Works on mobile and desktop
- ✅ **Lightweight** — No heavy JavaScript, fast load times
- ✅ **Click-through** — Opens full setup on MetalForge.io in new tab
- ✅ **Branding** — "Powered by MetalForge" badge
- ✅ **Dark/Light themes** — Match your site's design
- ✅ **Verified badge** — Shows if gear info is verified

## Example Embed Code

### Basic Embed

```html
<iframe 
  src="https://metalforge.io/embed/joey-jordison"
  width="400"
  height="600"
  frameborder="0"
  loading="lazy"
  title="Joey Jordison Gear Setup - MetalForge"
></iframe>
```

### With Styling

```html
<div style="max-width: 400px; margin: 20px auto;">
  <iframe 
    src="https://metalforge.io/embed/lars-ulrich?theme=dark"
    width="100%"
    height="600"
    frameborder="0"
    loading="lazy"
    style="border: none; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);"
    title="Lars Ulrich Gear Setup - MetalForge"
  ></iframe>
</div>
```

### Multiple Widgets

```html
<div style="display: flex; gap: 20px; flex-wrap: wrap;">
  <iframe src="https://metalforge.io/embed/joey-jordison" width="300" height="500"></iframe>
  <iframe src="https://metalforge.io/embed/lars-ulrich" width="300" height="500"></iframe>
  <iframe src="https://metalforge.io/embed/dave-lombardo" width="300" height="500"></iframe>
</div>
```

## Use Cases

### YouTube Creators
Add widgets to video descriptions for drummer gear breakdowns.

### Gear Blogs
Embed accurate gear data in review articles.

### Reddit Wikis
Upgrade static text lists to live embeds in r/drums or r/Metal.

### Forum Signatures
Add drummer widgets to forum profile signatures.

## Analytics

MetalForge tracks:
- Number of embed views per drummer
- Referrer domains (where widgets are embedded)
- Click-through rates

This data helps us understand which content creators are using embeds and optimize accordingly.

## API Reference

### Embed Endpoint

```
GET https://metalforge.io/embed/[slug]
```

**Parameters:**
- `slug` (required): Drummer name slug
- `theme` (optional): `dark` (default) or `light`

**Response:** HTML page suitable for iframe embedding

### Tracking Endpoint (Internal)

```
GET https://metalforge.io/api/embed/track
```

**Parameters:**
- `slug`: Drummer slug
- `referrer`: Referrer URL

**Response:** 1x1 transparent GIF (tracking pixel)

### Stats Endpoint (Internal)

```
GET https://metalforge.io/api/embed/stats
```

**Parameters:**
- `slug` (optional): Filter by drummer
- `days` (optional): Number of days (default: 30, max: 90)

**Response:** JSON with embed statistics

## Support

Questions? Contact us at [contact@metalforge.io](mailto:contact@metalforge.io) or open an issue on [GitHub](https://github.com/ricardoparro/MetalDrummerGear).

---

**🔥 MetalForge.io** — The Ultimate Metal Drummer Gear Database
