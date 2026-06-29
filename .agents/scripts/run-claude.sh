#!/usr/bin/env bash
# run-claude.sh — run `claude --print` with automatic failover between two
# Claude subscription tokens.
#
# Non-interactive agents (CEO, SEO, …) bill a Claude *subscription*, so when that
# plan hits its rolling session/usage limit the CLI exits non-zero with a message
# like "You've hit your session limit · resets 11pm (UTC)". With a single token
# the whole run dies. This wrapper tries the primary token
# (CLAUDE_CODE_OAUTH_TOKEN) and, if it hits such a limit, replays the SAME prompt
# on the backup (CLAUDE_CODE_OAUTH_TOKEN_2) — so one exhausted subscription no
# longer kills the run. Mirrors the failover already in .roadie/drain.sh.
#
# Usage:   <prompt-on-stdin> | .agents/scripts/run-claude.sh
# Reads the prompt from stdin and runs `claude --print --dangerously-skip-permissions`.
#
# Flags:
#   --self-test   exercise the limit-detection regex against fixtures; no network.
#
# Exit code: the exit code of whichever attempt produced a non-limit result;
#            1 if both subscriptions are limited or no token is configured.

set -uo pipefail

# Match the subscription-exhaustion wording the CLI emits, plus generic
# rate-limit / quota signals. Case-insensitive.
looks_limited() {
  printf '%s' "${1:-}" | grep -qiE \
    'session limit|usage limit|rate.?limit|hit your (session|usage|limit)|too many requests|\b429\b|quota|overloaded|resets [0-9]'
}

self_test() {
  local fails=0 got
  check() { # desc, text, expect(0=limited,1=not)
    if looks_limited "$2"; then got=0; else got=1; fi
    if [ "$got" -eq "$3" ]; then echo "PASS — $1"; else echo "FAIL — $1 (got $got want $3)"; fails=$((fails+1)); fi
  }
  check "session limit msg"  "You've hit your session limit · resets 11pm (UTC)" 0
  check "usage limit msg"    "Claude AI usage limit reached"                     0
  check "rate limit"         "rate_limit_error: please slow down"                0
  check "429"                "Error: 429 Too Many Requests"                      0
  check "overloaded"         "overloaded_error"                                  0
  check "quota"              "quota exceeded for this org"                       0
  check "normal output"      "Done. Filed 3 proposals and logged decisions."    1
  check "empty output"       ""                                                  1
  if [ "$fails" -eq 0 ]; then echo "ALL PASS"; exit 0; else echo "$fails FAILED"; exit 1; fi
}

[ "${1:-}" = "--self-test" ] && self_test

PRIMARY="${CLAUDE_CODE_OAUTH_TOKEN:-}"
BACKUP="${CLAUDE_CODE_OAUTH_TOKEN_2:-}"
PROMPT="$(cat)"  # buffer stdin so the prompt can be replayed on the backup token

if [ -z "$PRIMARY" ] && [ -z "$BACKUP" ]; then
  echo "[run-claude] No CLAUDE_CODE_OAUTH_TOKEN or CLAUDE_CODE_OAUTH_TOKEN_2 set." >&2
  exit 1
fi

# Run claude with a given token. Prints its combined output. Returns the CLI's
# exit code, or 10 when that exit looks like a subscription-limit hit.
run_with() {
  local token="$1" out rc
  out="$(printf '%s' "$PROMPT" | env CLAUDE_CODE_OAUTH_TOKEN="$token" ANTHROPIC_API_KEY="" \
        claude --print --dangerously-skip-permissions 2>&1)"
  rc=$?
  printf '%s\n' "$out"
  if [ "$rc" -ne 0 ] && looks_limited "$out"; then
    return 10
  fi
  return "$rc"
}

if [ -n "$PRIMARY" ]; then
  run_with "$PRIMARY"; rc=$?
  if [ "$rc" -ne 10 ]; then exit "$rc"; fi
  echo "[run-claude] Primary subscription hit its limit — failing over to backup token." >&2
fi

if [ -n "$BACKUP" ]; then
  run_with "$BACKUP"; rc=$?
  if [ "$rc" -eq 10 ]; then
    echo "[run-claude] Backup subscription is also limited — giving up this run." >&2
    exit 1
  fi
  exit "$rc"
fi

echo "[run-claude] Primary limited and no CLAUDE_CODE_OAUTH_TOKEN_2 configured." >&2
exit 1
