#!/bin/bash
# Drummer Research Agent - Researches metal drummers and their gear
# Usage: ./drummer-research.sh "Drummer Name"

DRUMMER="${1:?Usage: drummer-research.sh 'Drummer Name'}"

echo "🥁 Researching: $DRUMMER"
echo "---"

# This script outputs instructions for the AI agent
cat << EOF
Research task for: $DRUMMER

## Search Queries to Execute
1. "$DRUMMER drum kit gear setup 2024 2025"
2. "$DRUMMER drummer equipment endorsement"
3. "$DRUMMER signature snare drums cymbals"
4. "$DRUMMER drum magazine interview gear"

## Sources to Check
- Modern Drummer magazine
- Drumeo
- Pearl Drums, Tama, DW, Sonor (endorsement pages)
- Zildjian, Sabian, Meinl, Paiste (cymbal endorsements)
- YouTube gear tour videos

## Required Information
1. **Bio**: Birth year, nationality, bands played with
2. **Current Kit**:
   - Drums: Brand, series, sizes
   - Snare: Brand, model, size
   - Cymbals: Brand, models (hi-hats, crashes, rides, chinas)
   - Hardware: Pedals, throne, stands
   - Sticks: Brand, model
3. **Signature Gear**: Any signature products
4. **Photo**: Find a usable image URL

## Output Format
Return a JSON object:
{
  "name": "$DRUMMER",
  "band": "Primary band",
  "otherBands": ["band1", "band2"],
  "genre": "Metal subgenre",
  "country": "Country",
  "birthYear": 1990,
  "bio": "Brief bio",
  "gear": {
    "drums": "Brand Model",
    "snare": "Brand Model Size",
    "cymbals": "Brand Series",
    "hardware": "Pedals, etc",
    "sticks": "Brand Model"
  },
  "signatureGear": ["item1", "item2"],
  "sources": ["url1", "url2"]
}
EOF
