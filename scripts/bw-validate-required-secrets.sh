#!/usr/bin/env bash
# Check that all required Bitwarden items exist in the vault.
# Validates names only — never prints secret values.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MAP_FILE="$REPO_ROOT/secrets/bitwarden-map.yaml"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'

ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC}  $*"; }
fail() { echo -e "${RED}✗${NC} $*"; }

echo "=== Bitwarden Secret Validation ==="
echo "Map: $MAP_FILE"
echo ""

# Ensure bw session
if [[ -z "${BW_SESSION:-}" ]]; then
  echo "BW_SESSION not set. Run: export BW_SESSION=\$(bw unlock --raw)"
  exit 1
fi

if ! command -v yq &>/dev/null && ! command -v python3 &>/dev/null; then
  echo "Need yq or python3 to parse YAML. Install yq: https://github.com/mikefarah/yq"
  exit 1
fi

# Extract unique item names from bitwarden-map.yaml
if command -v yq &>/dev/null; then
  ITEMS=$(yq e '.secrets[].bw_item' "$MAP_FILE" | sort -u)
else
  ITEMS=$(python3 -c "
import sys, re
with open('$MAP_FILE') as f:
    text = f.read()
items = re.findall(r'bw_item:\s*\"([^\"]+)\"', text)
print('\n'.join(sorted(set(items))))
")
fi

REQUIRED_ITEMS=$(python3 -c "
import sys, re
with open('$MAP_FILE') as f:
    text = f.read()
# Find class: required sections
blocks = re.findall(r'bw_item:\s*\"([^\"]+)\".*?class:\s*required', text, re.DOTALL)
print('\n'.join(sorted(set(blocks))))
" 2>/dev/null || echo "$ITEMS")

PASS=0
FAIL=0
WARN=0

echo "Checking Bitwarden items..."
echo ""

while IFS= read -r item; do
  [[ -z "$item" || "$item" == "null" ]] && continue

  # Search for item by name — only checks existence, never prints value
  RESULT=$(bw list items --search "$item" --session "$BW_SESSION" 2>/dev/null | \
           python3 -c "import sys,json; items=json.load(sys.stdin); print(len([i for i in items if i['name']==sys.argv[1]]))" "$item" 2>/dev/null || echo "0")

  if [[ "$RESULT" -ge 1 ]]; then
    ok "Found: $item"
    ((PASS++))
  else
    fail "Missing: $item"
    ((FAIL++))
  fi
done <<< "$ITEMS"

echo ""
echo "─────────────────────────────────────"
echo "Results: ${PASS} found, ${FAIL} missing"

if [[ "$FAIL" -gt 0 ]]; then
  echo ""
  warn "Create missing items in Bitwarden vault 'Cluos Infra'"
  warn "See secrets/bitwarden-map.yaml for the exact item names and fields"
  exit 1
fi

echo ""
ok "All required secrets found in Bitwarden"
