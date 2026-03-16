#!/bin/bash
# Reconnect OpenClaw Browser Relay via AppleScript
# Usage: ./reconnect-browser.sh

osascript << 'EOF'
tell application "Google Chrome"
    activate
end tell

delay 0.5

tell application "System Events"
    tell process "Google Chrome"
        try
            set uiElems to entire contents of window 1
            repeat with elem in uiElems
                try
                    set elemDesc to description of elem as text
                    set elemClass to class of elem as text
                    
                    -- Find OpenClaw extension button
                    if elemDesc contains "OpenClaw" and elemClass contains "pop up button" then
                        if elemDesc contains "click to re-attach" or elemDesc contains "click to attach" then
                            click elem
                            delay 0.5
                            return "✅ Clicked OpenClaw extension to reconnect"
                        else if elemDesc contains "attached" then
                            return "✅ OpenClaw already connected"
                        end if
                    end if
                end try
            end repeat
            
            return "⚠️ OpenClaw extension not found in toolbar"
        on error errMsg
            return "❌ Error: " & errMsg
        end try
    end tell
end tell
EOF
