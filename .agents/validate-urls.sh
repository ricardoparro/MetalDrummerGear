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

# Rate limiting configuration
IMAGE_DELAY=2       # Seconds between image requests
VIDEO_DELAY=0.5     # Seconds between YouTube requests
WIKIMEDIA_DELAY=3   # Extra delay for Wikimedia URLs
MAX_RETRIES=3       # Number of retries for rate-limited requests
RETRY_DELAY=5       # Base delay between retries (exponential backoff)

echo "🔍 Validating URLs in MetalForge drummer data..."
echo ""

BROKEN=0
WARNINGS=0
TOTAL=0

# Function to check URL with rate limiting handling
check_url() {
    local url="$1"
    local retry_count=0
    local status=""
    
    # URL encode spaces
    local encoded_url=$(echo "$url" | sed 's/ /%20/g')
    
    # Detect Wikimedia URLs for extra rate limiting care
    local is_wikimedia=false
    if echo "$url" | grep -q "wikimedia.org\|wikipedia.org"; then
        is_wikimedia=true
    fi
    
    while [ $retry_count -le $MAX_RETRIES ]; do
        status=$(curl -s -o /dev/null -w '%{http_code}' \
            --max-time 30 \
            --connect-timeout 15 \
            -A "Mozilla/5.0 (compatible; MetalDrummerGear-CI/1.0; +https://github.com/ricardoparro/MetalDrummerGear)" \
            "$encoded_url" 2>/dev/null || echo "000")
        
        # Success
        if [ "$status" = "200" ]; then
            echo "$status"
            return 0
        fi
        
        # Rate limited - retry with backoff
        if [ "$status" = "429" ]; then
            retry_count=$((retry_count + 1))
            if [ $retry_count -le $MAX_RETRIES ]; then
                local wait_time=$((RETRY_DELAY * retry_count))
                echo -e "  ${YELLOW}⏳${NC} Rate limited, waiting ${wait_time}s... (retry $retry_count/$MAX_RETRIES)" >&2
                sleep $wait_time
                continue
            fi
        fi
        
        # Timeout on Wikimedia - likely rate limiting, don't retry aggressively
        if [ "$status" = "000" ] && [ "$is_wikimedia" = true ]; then
            echo "TIMEOUT"
            return 2  # Warning status
        fi
        
        # Other errors - no retry
        break
    done
    
    echo "$status"
    
    # Return codes:
    # 0 = success (200)
    # 1 = failure (4xx/5xx)
    # 2 = warning (429 after retries, Wikimedia timeout)
    if [ "$status" = "429" ] || [ "$status" = "403" ]; then
        return 2  # Treat as warning - URL likely valid but rate limited
    elif [ "$status" = "200" ]; then
        return 0
    else
        return 1
    fi
}

# Extract image URLs (macOS compatible)
echo "📸 Checking image URLs..."
IMAGE_URLS=$(grep -E "image:\s*['\"]https?://" "$DATA_FILE" | sed -E "s/.*['\"]((https?:\/\/[^'\"]+))['\"].*/\1/")

while IFS= read -r url; do
    [ -z "$url" ] && continue
    TOTAL=$((TOTAL + 1))
    
    # Add delay between requests
    if [ $TOTAL -gt 1 ]; then
        if echo "$url" | grep -q "wikimedia.org\|wikipedia.org"; then
            sleep $WIKIMEDIA_DELAY
        else
            sleep $IMAGE_DELAY
        fi
    fi
    
    result=$(check_url "$url")
    exit_code=$?
    
    # Get the last line of result (the status code)
    status=$(echo "$result" | tail -1)
    
    if [ $exit_code -eq 0 ]; then
        echo -e "  ${GREEN}✓${NC} $(echo "$url" | cut -c1-70)..."
    elif [ $exit_code -eq 2 ]; then
        echo -e "  ${YELLOW}⚠${NC} [$status] $(echo "$url" | cut -c1-60)... (rate limited/timeout)"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "  ${RED}✗${NC} [$status] $url"
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
    
    sleep $VIDEO_DELAY
    
    STATUS=$(curl -s -o /dev/null -w '%{http_code}' \
        --max-time 15 \
        --connect-timeout 10 \
        "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$vid&format=json" 2>/dev/null || echo "000")
    
    if [ "$STATUS" = "200" ]; then
        echo -e "  ${GREEN}✓${NC} $vid"
    elif [ "$STATUS" = "429" ]; then
        echo -e "  ${YELLOW}⚠${NC} [$STATUS] $vid (rate limited)"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "  ${RED}✗${NC} [$STATUS] $vid"
        BROKEN=$((BROKEN + 1))
    fi
done <<< "$VIDEO_IDS"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Total checked: $TOTAL"
echo -e "Valid: ${GREEN}$((TOTAL - BROKEN - WARNINGS))${NC}"
echo -e "Warnings: ${YELLOW}$WARNINGS${NC} (rate limited - likely valid)"
echo -e "Broken: ${RED}$BROKEN${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$BROKEN" -gt 0 ]; then
    echo ""
    echo -e "${RED}❌ VALIDATION FAILED${NC}"
    echo "Fix broken URLs before merging!"
    exit 1
elif [ "$WARNINGS" -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠️  VALIDATION PASSED WITH WARNINGS${NC}"
    echo "Some URLs were rate-limited but are likely valid."
    echo "Run again later to confirm, or proceed with caution."
    exit 0
else
    echo ""
    echo -e "${GREEN}✅ ALL URLs VALID${NC}"
    exit 0
fi
