#!/bin/bash
# Download photos for drummers 51-60 using Wikimedia Commons API

OUTPUT_DIR="$(dirname "$0")/../public/images/drummers"
USER_AGENT="MetalDrummerGear/1.0 (contact@metaldrummergear.com)"

# Function to get Wikimedia Commons URL from file title
get_commons_url() {
    local title="$1"
    # Use Wikimedia API to get the actual URL
    local encoded_title=$(echo "$title" | sed 's/ /_/g' | python3 -c "import sys, urllib.parse; print(urllib.parse.quote(sys.stdin.read().strip()))")
    local api_url="https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encoded_title}&prop=imageinfo&iiprop=url&format=json"
    local url=$(curl -s -A "$USER_AGENT" "$api_url" | python3 -c "import sys, json; d=json.load(sys.stdin); pages=d.get('query',{}).get('pages',{}); p=list(pages.values())[0] if pages else {}; info=p.get('imageinfo',[{}])[0]; print(info.get('url',''))")
    echo "$url"
}

# Download and resize function
download_and_resize() {
    local url="$1"
    local output="$2"
    
    if [ -f "$output" ]; then
        echo "  Already exists"
        return 0
    fi
    
    echo "  Downloading from: $url"
    curl -s -L -A "$USER_AGENT" -o "$output" "$url"
    
    if [ -f "$output" ] && [ -s "$output" ]; then
        # Resize if needed (max 800px width)
        local width=$(sips -g pixelWidth "$output" 2>/dev/null | grep pixelWidth | awk '{print $2}')
        if [ -n "$width" ] && [ "$width" -gt 800 ]; then
            sips --resampleWidth 800 "$output" >/dev/null 2>&1
            echo "  Resized to 800px"
        fi
        echo "  Downloaded successfully"
        return 0
    else
        echo "  FAILED to download"
        rm -f "$output"
        return 1
    fi
}

echo "Downloading missing drummer photos..."

# 51: Paul Mazurkiewicz
echo "[51] Paul Mazurkiewicz -> paul-mazurkiewicz.jpg"
url=$(get_commons_url "Cannibal_Corpse_-_2024275214539_2024-10-01_Cannibal_Corpse_-_Sven_-_1D_X_MK_II_-_1326_-_AK8I0150_(cropped).jpg")
download_and_resize "$url" "$OUTPUT_DIR/paul-mazurkiewicz.jpg"

# 52: Mike Mangini
echo "[52] Mike Mangini -> mike-mangini.jpg"
url=$(get_commons_url "Mike_Mangini_at_Moscow_12_Jul_2011_(cropped).jpg")
download_and_resize "$url" "$OUTPUT_DIR/mike-mangini.jpg"

# 53: Matt Garstka
echo "[53] Matt Garstka -> matt-garstka.jpg"
url=$(get_commons_url "Matt_Garstka_-_2014_NAMM_Show_(cropped).jpg")
download_and_resize "$url" "$OUTPUT_DIR/matt-garstka.jpg"

# 54: Daniel Erlandsson
echo "[54] Daniel Erlandsson -> daniel-erlandsson.jpg"
url=$(get_commons_url "2023_Rock_im_Park_-_Arch_Enemy_-_Daniel_Erlandsson_-_by_2eight_-_ZSC4502.jpg")
download_and_resize "$url" "$OUTPUT_DIR/daniel-erlandsson.jpg"

# 55: Jaska Raatikainen
echo "[55] Jaska Raatikainen -> jaska-raatikainen.jpg"
url=$(get_commons_url "Jaska_Raatikainen_-_Ilosaarirock_2009_2.jpg")
download_and_resize "$url" "$OUTPUT_DIR/jaska-raatikainen.jpg"

# 56: Hannes Grossmann
echo "[56] Hannes Grossmann -> hannes-grossmann.jpg"
url=$(get_commons_url "Hannes_wiki2.jpg")
download_and_resize "$url" "$OUTPUT_DIR/hannes-grossmann.jpg"

# 57: Daray
echo "[57] Daray -> daray.jpg"
url=$(get_commons_url "Dariusz_Daray_Brzozowski_Hunter.JPG")
download_and_resize "$url" "$OUTPUT_DIR/daray.jpg"

# 58: Jocke Wallgren - Try band photo
echo "[58] Jocke Wallgren -> jocke-wallgren.jpg"
url=$(get_commons_url "Amon_Amarth_Rockharz_2019_15.jpg")
download_and_resize "$url" "$OUTPUT_DIR/jocke-wallgren.jpg"

# 59: Tim Yeung
echo "[59] Tim Yeung -> tim-yeung.jpg"
url=$(get_commons_url "DevineHerecy002_sharp.jpg")
download_and_resize "$url" "$OUTPUT_DIR/tim-yeung.jpg"

# 60: Kevin Talley
echo "[60] Kevin Talley -> kevin-talley.jpg"
url=$(get_commons_url "Battlecross_Mayhemfest_2013_Dallas.jpg")
download_and_resize "$url" "$OUTPUT_DIR/kevin-talley.jpg"

echo ""
echo "Done! Checking results..."
for i in 51 52 53 54 55 56 57 58 59 60; do
    case $i in
        51) name="paul-mazurkiewicz" ;;
        52) name="mike-mangini" ;;
        53) name="matt-garstka" ;;
        54) name="daniel-erlandsson" ;;
        55) name="jaska-raatikainen" ;;
        56) name="hannes-grossmann" ;;
        57) name="daray" ;;
        58) name="jocke-wallgren" ;;
        59) name="tim-yeung" ;;
        60) name="kevin-talley" ;;
    esac
    if [ -f "$OUTPUT_DIR/${name}.jpg" ]; then
        echo "✓ ${name}.jpg"
    else
        echo "✗ ${name}.jpg MISSING"
    fi
done
