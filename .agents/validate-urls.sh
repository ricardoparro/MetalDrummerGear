#!/bin/bash
# URL Validator for MetalForge drummer data
# Run BEFORE merging any PR that touches drummer data
# Exit code: 0 = all valid, 1 = broken URLs found

set -e

PROJECT_DIR="${1:-$(pwd)}"
DATA_FILE="$PROJECT_DIR/packages/backend/src/index.js"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "🔍 Validating URLs in MetalForge drummer data..."
echo ""

BROKEN=0
TOTAL=0

# Extract image URLs (macOS compatible)
echo "📸 Checking image URLs..."
IMAGE_URLS=$(grep -E "image:\s*['\"]https?://" "$DATA_FILE" | sed -E "s/.*['\"]((https?:\/\/[^'\"]+))['\"].*/\1/")

while IFS= read -r url; do
    [ -z "$url" ] && continue
    TOTAL=$((TOTAL + 1))
    
    # URL encode spaces
    encoded_url=$(echo "$url" | sed 's/ /%20/g')
    
    STATUS=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$encoded_url" 2>/dev/null || echo "000")
    
    if [ "$STATUS" = "200" ]; then
        echo -e "  ${GREEN}✓${NC} $(echo "$url" | cut -c1-60)..."
    else
        echo -e "  ${RED}✗${NC} [$STATUS] $url"
        BROKEN=$((BROKEN + 1))
    fi
done <<< "$IMAGE_URLS"

echo ""

# Extract YouTube video IDs and validate (macOS compatible)
echo "🎬 Checking YouTube video URLs..."
VIDEO_IDS=$(grep -oE "youtube\.com/watch\?v=[A-Za-z0-9_-]+" "$DATA_FILE" | sed 's/.*v=//' | sort -u)

while IFS= read -r vid; do
    [ -z "$vid" ] && continue
    TOTAL=$((TOTAL + 1))
    
    STATUS=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$vid&format=json" 2>/dev/null || echo "000")
    
    if [ "$STATUS" = "200" ]; then
        echo -e "  ${GREEN}✓${NC} $vid"
    else
        echo -e "  ${RED}✗${NC} [$STATUS] $vid"
        BROKEN=$((BROKEN + 1))
    fi
done <<< "$VIDEO_IDS"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Total checked: $TOTAL"
echo -e "Valid: ${GREEN}$((TOTAL - BROKEN))${NC}"
echo -e "Broken: ${RED}$BROKEN${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$BROKEN" -gt 0 ]; then
    echo ""
    echo -e "${RED}❌ VALIDATION FAILED${NC}"
    echo "Fix broken URLs before merging!"
    exit 1
else
    echo ""
    echo -e "${GREEN}✅ ALL URLs VALID${NC}"
    exit 0
fi
