#!/usr/bin/env bash
# Idempotent sync of the CLUOS FRONTEND WORKFLOW delimited block into the
# three global instruction files it belongs in. Never touches anything
# outside the BEGIN/END markers. Backs up each target (once per run, only
# if it's about to change) into ~/.claude/config-backups/<date>/ before
# writing.
#
# Usage:
#   scripts/sync-global-config.sh          # apply
#   scripts/sync-global-config.sh --check  # report drift only, no writes

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BLOCK_SRC="$REPO_ROOT/agent-skills/global-config-block.md"
BACKUP_DIR="$HOME/.claude/config-backups/$(date +%Y%m%d-%H%M%S)"
CHECK_ONLY=false
[ "${1:-}" = "--check" ] && CHECK_ONLY=true

TARGETS=(
  "$HOME/.claude/CLAUDE.md"
  "/Users/rafacosta/Documents/GitHub/AGENTS.md"
  "$HOME/.codex/AGENTS.md"
)

if [ ! -f "$BLOCK_SRC" ]; then
  echo "canonical block not found: $BLOCK_SRC" >&2
  exit 1
fi

BEGIN_MARK='<!-- BEGIN CLUOS FRONTEND WORKFLOW -->'
END_MARK='<!-- END CLUOS FRONTEND WORKFLOW -->'

for target in "${TARGETS[@]}"; do
  if [ ! -f "$target" ]; then
    echo "SKIP $target: does not exist" >&2
    continue
  fi

  if grep -qF "$BEGIN_MARK" "$target"; then
    # extract current block, compare, replace in place if different
    current="$(awk -v b="$BEGIN_MARK" -v e="$END_MARK" '
      $0 ~ b {flag=1}
      flag {print}
      $0 ~ e {flag=0}
    ' "$target")"
    canonical="$(cat "$BLOCK_SRC")"

    if [ "$current" = "$canonical" ]; then
      echo "OK   $target (block up to date)"
      continue
    fi

    if [ "$CHECK_ONLY" = true ]; then
      echo "DRIFT $target (block differs from canonical)"
      continue
    fi

    mkdir -p "$BACKUP_DIR"
    cp "$target" "$BACKUP_DIR/$(basename "$target")"
    python3 - "$target" "$BLOCK_SRC" "$BEGIN_MARK" "$END_MARK" <<'PYEOF'
import sys
target, block_src, begin, end = sys.argv[1:5]
with open(target) as f:
    lines = f.readlines()
with open(block_src) as f:
    block = f.read()
out, skipping = [], False
for line in lines:
    if begin in line:
        skipping = True
        continue
    if end in line:
        skipping = False
        continue
    if not skipping:
        out.append(line)
text = "".join(out).rstrip("\n") + "\n\n\n" + block
with open(target, "w") as f:
    f.write(text)
PYEOF
    echo "UPDATED $target (backup: $BACKUP_DIR/$(basename "$target"))"

  else
    if [ "$CHECK_ONLY" = true ]; then
      echo "MISSING $target (block absent, would append)"
      continue
    fi
    mkdir -p "$BACKUP_DIR"
    cp "$target" "$BACKUP_DIR/$(basename "$target")"
    printf '\n\n' >> "$target"
    cat "$BLOCK_SRC" >> "$target"
    echo "APPENDED $target (backup: $BACKUP_DIR/$(basename "$target"))"
  fi
done

exit 0
