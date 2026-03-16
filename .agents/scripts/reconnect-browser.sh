#!/bin/bash
# Reconnect OpenClaw Browser Relay via AppleScript
# Usage: ./reconnect-browser.sh

osascript << 'EOF'
tell application "Google Chrome"
    activate
end tell

delay 0.3

tell application "System Events"
    tell process "Google Chrome"
        try
            -- Find toolbar extensions area
            set toolbarGroup to group 2 of group 3 of toolbar 1 of group 1 of group 1 of group 1 of group 1 of group 1 of window 1
            set extButtons to every pop up button of toolbarGroup
            
            repeat with btn in extButtons
                set btnDesc to description of btn as text
                
                -- Check if it's the OpenClaw extension and needs reconnecting
                if btnDesc contains "OpenClaw" and btnDesc contains "click to attach" then
                    click btn
                    delay 0.5
                    return "✅ Clicked OpenClaw extension to reconnect"
                else if btnDesc contains "OpenClaw" and btnDesc contains "attached" then
                    return "✅ OpenClaw already connected"
                end if
            end repeat
            
            return "⚠️ OpenClaw extension not found in toolbar"
        on error errMsg
            return "❌ Error: " & errMsg
        end try
    end tell
end tell
EOF
