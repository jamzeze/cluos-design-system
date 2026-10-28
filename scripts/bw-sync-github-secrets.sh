#!/usr/bin/env bash
# Sync secrets from Bitwarden → GitHub Repository Secrets.
#
# ⚠️  DEFINIÇÃO DE CEO HUMANO PENDENTE
# This script will NOT execute automatically.
# It must be invoked manually after explicit CEO approval.
# It prints which secrets it WOULD sync, then asks for confirmation.
#
# Requirements: bw CLI, gh CLI, jq, python3
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MAP_FILE="$REPO_ROOT/secrets/bitwarden-map.yaml"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BOLD='\033[1m'; NC='\033[0m'

ok()   { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC}  $*"; }
fail() { echo -e "${RED}✗${NC} $*"; exit 1; }

# ─── Safety gate ──────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${YELLOW}⚠️  DEFINIÇÃO DE CEO HUMANO PENDENTE${NC}"
echo ""
echo "  This script will sync secrets from Bitwarden to GitHub Repository Secrets."
echo "  This is a HIGH-IMPACT action:"
echo "    - It writes to GitHub Secrets (CI/CD credentials)"
echo "    - It cannot be undone without manual deletion via GitHub UI"
echo "    - Incorrect values will break all automated workflows"
echo ""
echo "  Repository target: ${GITHUB_REPO:-$(git remote get-url origin 2>/dev/null | sed 's/.*github.com\///' | sed 's/\.git//')}"
echo ""
read -rp "  Type 'CONFIRM' to proceed (anything else aborts): " confirmation
if [[ "$confirmation" != "CONFIRM" ]]; then
  echo ""
  warn "Aborted by user — no secrets were synced."
  exit 0
fi

echo ""
echo "=== Bitwarden → GitHub Secrets Sync ==="

# ─── Prerequisites ────────────────────────────────────────────────────────────
[[ -z "${BW_SESSION:-}" ]] && fail "BW_SESSION not set. Run: export BW_SESSION=\$(bw unlock --raw)"
command -v gh    &>/dev/null || fail "gh CLI not installed. Install: https://cli.github.com"
command -v jq    &>/dev/null || fail "jq not installed."
command -v python3 &>/dev/null || fail "python3 required."

REPO="${GITHUB_REPO:-$(git remote get-url origin 2>/dev/null | sed 's/.*github.com\///' | sed 's/\.git//')}"
[[ -z "$REPO" ]] && fail "Cannot determine repository. Set GITHUB_REPO=owner/repo"

echo "Target repo: $REPO"
echo ""

# ─── Parse map and sync ───────────────────────────────────────────────────────
python3 - "$MAP_FILE" "$BW_SESSION" "$REPO" <<'PYEOF'
import sys, json, subprocess, re

map_file  = sys.argv[1]
bw_session = sys.argv[2]
repo       = sys.argv[3]

with open(map_file) as f:
    text = f.read()

entries = []
blocks = re.split(r'\n  - ', text)
for block in blocks[1:]:
    bw_item_m = re.search(r'bw_item:\s*["\']?([^"\'\n]+)["\']?', block)
    bw_field_m = re.search(r'bw_field:\s*["\']?([^"\'\n]+)["\']?', block)
    env_var_m  = re.search(r'env_var:\s*["\']?([^"\'\n]+)["\']?', block)
    class_m    = re.search(r'class:\s*(required|recommended)', block)
    if bw_item_m and env_var_m:
        entries.append({
            'bw_item':  bw_item_m.group(1).strip(),
            'bw_field': bw_field_m.group(1).strip() if bw_field_m else 'password',
            'env_var':  env_var_m.group(1).strip(),
            'class':    class_m.group(1) if class_m else 'recommended',
        })

synced = 0
failed = 0

for entry in entries:
    item_name  = entry['bw_item']
    field_name = entry['bw_field']
    env_var    = entry['env_var']

    try:
        result = subprocess.run(
            ['bw', 'list', 'items', '--search', item_name, '--session', bw_session],
            capture_output=True, text=True, check=True
        )
        items   = json.loads(result.stdout)
        matched = [i for i in items if i['name'] == item_name]
        if not matched:
            print(f"  ⚠  SKIP {env_var} — item not found in vault")
            failed += 1
            continue

        item  = matched[0]
        value = None
        if field_name.lower() == 'password':
            value = item.get('login', {}).get('password')
        else:
            for f in item.get('fields', []):
                if f.get('name', '').lower() == field_name.lower():
                    value = f.get('value')
                    break

        if not value:
            print(f"  ⚠  SKIP {env_var} — field empty")
            failed += 1
            continue

        # Set GitHub secret — value passed via stdin, never via arg
        proc = subprocess.run(
            ['gh', 'secret', 'set', env_var, '--repo', repo],
            input=value, capture_output=True, text=True
        )
        if proc.returncode == 0:
            print(f"  ✓  {env_var}")
            synced += 1
        else:
            print(f"  ✗  {env_var} — gh error: {proc.stderr.strip()[:60]}")
            failed += 1

    except Exception as e:
        print(f"  ✗  {env_var} — {str(e)[:60]}")
        failed += 1

print()
print(f"Synced: {synced}, Failed/Skipped: {failed}")
PYEOF

echo ""
ok "Sync complete. Verify secrets at: https://github.com/$REPO/settings/secrets/actions"
