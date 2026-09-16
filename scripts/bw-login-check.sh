#!/usr/bin/env bash
# Verify Bitwarden CLI is installed and session is active.
# Never prints secrets or session keys.
set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC}  $*"; }
fail() { echo -e "${RED}✗${NC} $*"; exit 1; }

echo "=== Bitwarden CLI Check ==="

# 1. Check bw is installed
if ! command -v bw &>/dev/null; then
  warn "bw CLI not found. Attempting install options:"
  echo ""
  echo "  Option 1 (npm, no admin required):"
  echo "    npm install -g @bitwarden/cli"
  echo ""
  echo "  Option 2 (snap, Linux):"
  echo "    sudo snap install bw"
  echo ""
  echo "  Option 3 (homebrew, macOS):"
  echo "    brew install bitwarden-cli"
  echo ""
  echo "  Option 4 (winget, Windows):"
  echo "    winget install Bitwarden.CLI"
  echo ""

  if command -v npm &>/dev/null; then
    read -rp "Install via npm now? [y/N] " choice
    if [[ "${choice,,}" == "y" ]]; then
      npm install -g @bitwarden/cli
      ok "bw installed via npm"
    else
      fail "Please install bw CLI and re-run this script."
    fi
  else
    fail "npm not found either. Install bw CLI manually and re-run."
  fi
fi

ok "bw CLI found: $(bw --version)"

# 2. Check login status
STATUS=$(bw status 2>/dev/null | jq -r '.status' 2>/dev/null || echo "unknown")

case "$STATUS" in
  unlocked)
    ok "Bitwarden session is active and unlocked"
    ;;
  locked)
    warn "Bitwarden is logged in but locked. Unlock with:"
    echo "    export BW_SESSION=\$(bw unlock --raw)"
    echo ""
    echo "Then re-run this script or the calling script."
    exit 1
    ;;
  unauthenticated)
    warn "Not logged in. Run:"
    echo "    bw login"
    echo "    export BW_SESSION=\$(bw unlock --raw)"
    exit 1
    ;;
  *)
    # BW_SESSION might already be in env
    if [[ -n "${BW_SESSION:-}" ]]; then
      if bw sync --session "$BW_SESSION" &>/dev/null; then
        ok "BW_SESSION env var is valid and synced"
      else
        fail "BW_SESSION is set but invalid. Run: export BW_SESSION=\$(bw unlock --raw)"
      fi
    else
      warn "Could not determine Bitwarden status (status=$STATUS). Try:"
      echo "    bw login && export BW_SESSION=\$(bw unlock --raw)"
      exit 1
    fi
    ;;
esac

# 3. Sync to latest
echo "Syncing vault..."
bw sync --session "${BW_SESSION:-}" &>/dev/null && ok "Vault synced" || warn "Sync failed — working with cached data"

echo ""
echo "=== Bitwarden ready ==="
