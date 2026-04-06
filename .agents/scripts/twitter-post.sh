#!/bin/bash
# Post to Twitter via AppleScript (fallback when browser automation fails)
# Usage: ./twitter-post.sh "Tweet text here"

if [ -z "$1" ]; then
    echo "❌ Usage: ./twitter-post.sh \"Tweet text\""
    exit 1
fi

# Escape quotes for AppleScript
TWEET_TEXT=$(echo "$1" | sed 's/"/\\"/g')

osascript -e '
set tweetText to "'"$TWEET_TEXT"'"

-- Open compose URL directly
tell application "Google Chrome"
    activate
    open location "https://x.com/compose/tweet"
end tell

delay 3

-- Type and post
tell application "System Events"
    tell process "Google Chrome"
        keystroke tweetText
        delay 0.5
        keystroke return using command down
    end tell
end tell

return "done"
'

if [ $? -eq 0 ]; then
    echo "✅ Tweet enviado via AppleScript"
else
    echo "❌ Falha no AppleScript"
    exit 1
fi
