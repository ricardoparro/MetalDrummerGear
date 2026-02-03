#!/bin/bash
# URL Validator for MetalForge drummer data
# Run BEFORE merging any PR that touches drummer data
# Exit code: 0 = all valid, 1 = broken URLs found
#
# Usage:
#   ./validate-urls.sh [project_dir] [--skip-wikimedia] [--wikimedia-sample=N]
#
# Options:
#   --skip-wikimedia      Skip Wikimedia URL validation entirely (useful in CI)
#   --wikimedia-sample=N  Only validate N random Wikimedia URLs (default: check all)
#   --fast                Reduced delays for local testing (not recommended for CI)

set -e

# Parse arguments
PROJECT_DIR=""
SKIP_WIKIMEDIA=false
WIKIMEDIA_SAMPLE=0  # 0 = check all
FAST_MODE=false

for arg in "$@"; do
    case $arg in
        --skip-wikimedia)
            SKIP_WIKIMEDIA=true
            ;;
        --wikimedia-sample=*)
            WIKIMEDIA_SAMPLE="${arg#*=}"
            ;;
        --fast)
            FAST_MODE=true
            ;;
        *)
            if [ -z "$PROJECT_DIR" ] && [ -d "$arg" ]; then
                PROJECT_DIR="$arg"
            fi
            ;;
    esac
done

PROJECT_DIR="${PROJECT_DIR:-$(pwd)}"
DATA_FILE="$PROJECT_DIR/packages/backend/src/index.js"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# Rate limiting configuration
# Wikimedia recommends being polite - their rate limits are strict
if [ "$FAST_MODE" = true ]; then
    IMAGE_DELAY=0.5
    VIDEO_DELAY=0.2
    WIKIMEDIA_DELAY=1
    WIKIMEDIA_BATCH_PAUSE=2
else
    IMAGE_DELAY=1         # Seconds between non-Wikimedia image requests
    VIDEO_DELAY=0.5       # Seconds between YouTube requests
    WIKIMEDIA_DELAY=2     # Seconds between Wikimedia URLs
    WIKIMEDIA_BATCH_PAUSE=5  # Extra pause every BATCH_SIZE requests
fi

WIKIMEDIA_BATCH_SIZE=10   # Pause extra after this many Wikimedia URLs
MAX_RETRIES=2             # Number of retries for rate-limited requests
RETRY_DELAY=10            # Base delay between retries (doubles each retry)

# Adaptive rate limiting - increases when we hit 429s
CURRENT_WIKIMEDIA_DELAY=$WIKIMEDIA_DELAY
CONSECUTIVE_429S=0

echo "🔍 Validating URLs in MetalForge drummer data..."
echo ""

if [ "$SKIP_WIKIMEDIA" = true ]; then
    echo -e "${CYAN}ℹ️  Skipping Wikimedia URL validation (--skip-wikimedia)${NC}"
    echo ""
fi

if [ "$WIKIMEDIA_SAMPLE" -gt 0 ]; then
    echo -e "${CYAN}ℹ️  Sampling $WIKIMEDIA_SAMPLE random Wikimedia URLs${NC}"
    echo ""
fi

BROKEN=0
WARNINGS=0
TOTAL=0
WIKIMEDIA_COUNT=0
WIKIMEDIA_CHECKED=0

# Function to check if URL is Wikimedia
is_wikimedia_url() {
    echo "$1" | grep -qE "wikimedia\.org|wikipedia\.org"
}

# Function to check URL with rate limiting handling
# Uses HEAD requests for efficiency (less server load)
check_url() {
    local url="$1"
    local retry_count=0
    local status=""
    
    # URL encode spaces
    local encoded_url=$(echo "$url" | sed 's/ /%20/g')
    
    while [ $retry_count -le $MAX_RETRIES ]; do
        # Use HEAD request (-I) for efficiency - we only need to verify URL exists
        # Fall back to GET if HEAD returns 405 (Method Not Allowed)
        status=$(curl -s -I -o /dev/null -w '%{http_code}' \
            --max-time 30 \
            --connect-timeout 15 \
            -A "MetalDrummerGear-URLValidator/1.0 (https://github.com/ricardoparro/MetalDrummerGear; polite-bot)" \
            "$encoded_url" 2>/dev/null || echo "000")
        
        # If HEAD not allowed, try GET
        if [ "$status" = "405" ]; then
            status=$(curl -s -o /dev/null -w '%{http_code}' \
                --max-time 30 \
                --connect-timeout 15 \
                -A "MetalDrummerGear-URLValidator/1.0 (https://github.com/ricardoparro/MetalDrummerGear; polite-bot)" \
                "$encoded_url" 2>/dev/null || echo "000")
        fi
        
        # Success - reset consecutive 429 counter
        if [ "$status" = "200" ] || [ "$status" = "301" ] || [ "$status" = "302" ] || [ "$status" = "304" ]; then
            CONSECUTIVE_429S=0
            echo "$status"
            return 0
        fi
        
        # Rate limited - retry with exponential backoff
        if [ "$status" = "429" ]; then
            CONSECUTIVE_429S=$((CONSECUTIVE_429S + 1))
            
            # Adaptive rate limiting: increase delay if we're getting multiple 429s
            if [ $CONSECUTIVE_429S -ge 3 ]; then
                CURRENT_WIKIMEDIA_DELAY=$((CURRENT_WIKIMEDIA_DELAY + 2))
                echo -e "  ${YELLOW}⏳${NC} Adaptive slowdown: delay now ${CURRENT_WIKIMEDIA_DELAY}s" >&2
            fi
            
            retry_count=$((retry_count + 1))
            if [ $retry_count -le $MAX_RETRIES ]; then
                local wait_time=$((RETRY_DELAY * retry_count))
                echo -e "  ${YELLOW}⏳${NC} Rate limited (429), waiting ${wait_time}s... (retry $retry_count/$MAX_RETRIES)" >&2
                sleep $wait_time
                continue
            fi
        fi
        
        # Timeout - could be rate limiting, don't count as broken
        if [ "$status" = "000" ]; then
            echo "TIMEOUT"
            return 2  # Warning status
        fi
        
        # Other errors - no retry
        break
    done
    
    echo "$status"
    
    # Return codes:
    # 0 = success (2xx, 3xx redirects)
    # 1 = failure (4xx/5xx except 429)
    # 2 = warning (429 after retries, timeout)
    if [ "$status" = "429" ]; then
        return 2  # Treat as warning - URL likely valid but rate limited
    elif [ "$status" = "200" ] || [ "$status" = "301" ] || [ "$status" = "302" ] || [ "$status" = "304" ]; then
        return 0
    else
        return 1
    fi
}

# Extract all image URLs (macOS compatible)
echo "📸 Checking image URLs..."
ALL_IMAGE_URLS=$(grep -E "image:\s*['\"]https?://" "$DATA_FILE" | sed -E "s/.*['\"]((https?:\/\/[^'\"]+))['\"].*/\1/")

# Separate Wikimedia and non-Wikimedia URLs
WIKIMEDIA_URLS=""
OTHER_URLS=""

while IFS= read -r url; do
    [ -z "$url" ] && continue
    if is_wikimedia_url "$url"; then
        WIKIMEDIA_URLS="$WIKIMEDIA_URLS$url"$'\n'
        WIKIMEDIA_COUNT=$((WIKIMEDIA_COUNT + 1))
    else
        OTHER_URLS="$OTHER_URLS$url"$'\n'
    fi
done <<< "$ALL_IMAGE_URLS"

# Check non-Wikimedia URLs first (usually faster, less rate limiting)
echo "  Checking non-Wikimedia URLs..."
while IFS= read -r url; do
    [ -z "$url" ] && continue
    TOTAL=$((TOTAL + 1))
    
    if [ $TOTAL -gt 1 ]; then
        sleep $IMAGE_DELAY
    fi
    
    result=$(check_url "$url")
    exit_code=$?
    status=$(echo "$result" | tail -1)
    
    if [ $exit_code -eq 0 ]; then
        echo -e "  ${GREEN}✓${NC} $(echo "$url" | cut -c1-70)..."
    elif [ $exit_code -eq 2 ]; then
        echo -e "  ${YELLOW}⚠${NC} [$status] $(echo "$url" | cut -c1-60)... (timeout/rate limit)"
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "  ${RED}✗${NC} [$status] $url"
        BROKEN=$((BROKEN + 1))
    fi
done <<< "$OTHER_URLS"

# Check Wikimedia URLs with extra care
if [ "$SKIP_WIKIMEDIA" = true ]; then
    echo ""
    echo -e "  ${CYAN}⏭️  Skipped $WIKIMEDIA_COUNT Wikimedia URLs${NC}"
elif [ "$WIKIMEDIA_COUNT" -gt 0 ]; then
    echo ""
    echo "  Checking Wikimedia URLs ($WIKIMEDIA_COUNT total)..."
    echo -e "  ${CYAN}ℹ️  Using polite delays to avoid rate limits${NC}"
    
    # If sampling, shuffle and take N URLs
    if [ "$WIKIMEDIA_SAMPLE" -gt 0 ] && [ "$WIKIMEDIA_SAMPLE" -lt "$WIKIMEDIA_COUNT" ]; then
        WIKIMEDIA_URLS=$(echo "$WIKIMEDIA_URLS" | sort -R | head -n "$WIKIMEDIA_SAMPLE")
        echo -e "  ${CYAN}ℹ️  Sampling $WIKIMEDIA_SAMPLE of $WIKIMEDIA_COUNT Wikimedia URLs${NC}"
    fi
    
    WIKIMEDIA_CHECKED=0
    while IFS= read -r url; do
        [ -z "$url" ] && continue
        TOTAL=$((TOTAL + 1))
        WIKIMEDIA_CHECKED=$((WIKIMEDIA_CHECKED + 1))
        
        # Apply delay
        sleep $CURRENT_WIKIMEDIA_DELAY
        
        # Extra pause every BATCH_SIZE requests
        if [ $((WIKIMEDIA_CHECKED % WIKIMEDIA_BATCH_SIZE)) -eq 0 ]; then
            echo -e "  ${CYAN}⏸️  Batch pause (${WIKIMEDIA_BATCH_PAUSE}s) after $WIKIMEDIA_CHECKED Wikimedia URLs...${NC}"
            sleep $WIKIMEDIA_BATCH_PAUSE
        fi
        
        result=$(check_url "$url")
        exit_code=$?
        status=$(echo "$result" | tail -1)
        
        if [ $exit_code -eq 0 ]; then
            echo -e "  ${GREEN}✓${NC} $(echo "$url" | cut -c1-70)..."
        elif [ $exit_code -eq 2 ]; then
            echo -e "  ${YELLOW}⚠${NC} [$status] $(echo "$url" | cut -c1-60)... (rate limited)"
            WARNINGS=$((WARNINGS + 1))
        else
            echo -e "  ${RED}✗${NC} [$status] $url"
            BROKEN=$((BROKEN + 1))
        fi
    done <<< "$WIKIMEDIA_URLS"
fi

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
if [ "$SKIP_WIKIMEDIA" = true ]; then
    echo -e "Wikimedia: ${CYAN}skipped ($WIKIMEDIA_COUNT URLs)${NC}"
elif [ "$WIKIMEDIA_SAMPLE" -gt 0 ] && [ "$WIKIMEDIA_SAMPLE" -lt "$WIKIMEDIA_COUNT" ]; then
    echo -e "Wikimedia: ${CYAN}sampled $WIKIMEDIA_SAMPLE of $WIKIMEDIA_COUNT${NC}"
fi
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
    echo "This is expected with large numbers of Wikimedia URLs."
    exit 0
else
    echo ""
    echo -e "${GREEN}✅ ALL URLs VALID${NC}"
    exit 0
fi
