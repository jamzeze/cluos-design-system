#!/usr/bin/env bash
# Idempotent sync of the CLUOS FRONTEND WORKFLOW delimited block into the
# global instruction file(s) that carry it in full (Codex). Never touches anything
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
RUN_ID="$(date +%Y%m%d-%H%M%S)-$$"
BACKUP_DIR="$HOME/.claude/config-backups/$RUN_ID"
CHECK_ONLY=false
DRIFT=0
PROBLEMS=0

for arg in "$@"; do
  case "$arg" in
    --check) CHECK_ONLY=true ;;
    *) echo "unknown flag: $arg" >&2; exit 1 ;;
  esac
done

# Since 2026-09-16 the block is installed only into the Codex global file.
# Claude Code reads it as a path-scoped rule (<repo>/.claude/rules/cluos-frontend.md,
# see sync-claude-rules.sh), so ~/.claude/CLAUDE.md and the workspace root
# AGENTS.md carry a short pointer instead of the full block.
TARGETS=(
  "$HOME/.codex/AGENTS.md"
)

if [ ! -f "$BLOCK_SRC" ]; then
  echo "canonical block not found: $BLOCK_SRC" >&2
  exit 1
fi

BEGIN_MARK='<!-- BEGIN CLUOS FRONTEND WORKFLOW -->'
END_MARK='<!-- END CLUOS FRONTEND WORKFLOW -->'

source_begin_count="$(grep -cF "$BEGIN_MARK" "$BLOCK_SRC" || true)"
source_end_count="$(grep -cF "$END_MARK" "$BLOCK_SRC" || true)"
if [ "$source_begin_count" -ne 1 ] || [ "$source_end_count" -ne 1 ]; then
  echo "canonical block must contain exactly one ordered marker pair" >&2
  exit 1
fi
source_begin_line="$(grep -nF "$BEGIN_MARK" "$BLOCK_SRC" | cut -d: -f1)"
source_end_line="$(grep -nF "$END_MARK" "$BLOCK_SRC" | cut -d: -f1)"
if [ "$source_begin_line" -ge "$source_end_line" ]; then
  echo "canonical block markers are out of order" >&2
  exit 1
fi

backup_name_for() {
  case "$1" in
    "$HOME/.claude/CLAUDE.md") echo "claude-CLAUDE.md" ;;
    "/Users/rafacosta/Documents/GitHub/AGENTS.md") echo "github-AGENTS.md" ;;
    "$HOME/.codex/AGENTS.md") echo "codex-AGENTS.md" ;;
    *) basename "$1" ;;
  esac
}

# Preflight every target before making any write. A malformed or missing target
# blocks the whole run so configuration cannot be only partially synchronized.
for target in "${TARGETS[@]}"; do
  if [ ! -f "$target" ]; then
    echo "ERROR $target: does not exist" >&2
    PROBLEMS=$((PROBLEMS + 1))
    continue
  fi

  if [ -L "$target" ]; then
    echo "ERROR $target: symlinked targets are not supported" >&2
    PROBLEMS=$((PROBLEMS + 1))
    continue
  fi

  begin_count="$(grep -cF "$BEGIN_MARK" "$target" || true)"
  end_count="$(grep -cF "$END_MARK" "$target" || true)"

  if [ "$begin_count" -ne "$end_count" ] || [ "$begin_count" -gt 1 ]; then
    echo "ERROR $target: malformed or duplicate workflow markers" >&2
    PROBLEMS=$((PROBLEMS + 1))
    continue
  fi

  if [ "$begin_count" -eq 1 ]; then
    begin_line="$(grep -nF "$BEGIN_MARK" "$target" | cut -d: -f1)"
    end_line="$(grep -nF "$END_MARK" "$target" | cut -d: -f1)"
    if [ "$begin_line" -ge "$end_line" ]; then
      echo "ERROR $target: workflow markers are out of order" >&2
      PROBLEMS=$((PROBLEMS + 1))
      continue
    fi
  fi
done

if [ "$PROBLEMS" -gt 0 ]; then
  echo "global config sync failed preflight: $PROBLEMS target problem(s)" >&2
  exit 1
fi

for target in "${TARGETS[@]}"; do
  begin_count="$(grep -cF "$BEGIN_MARK" "$target" || true)"

  if [ "$begin_count" -eq 1 ]; then

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
      DRIFT=$((DRIFT + 1))
      continue
    fi

    mkdir -p "$BACKUP_DIR"
    backup_name="$(backup_name_for "$target")"
    cp "$target" "$BACKUP_DIR/$backup_name"
    python3 - "$target" "$BLOCK_SRC" "$BEGIN_MARK" "$END_MARK" <<'PYEOF'
import os
import stat
import sys
import tempfile
target, block_src, begin, end = sys.argv[1:5]
with open(target) as f:
    lines = f.readlines()
with open(block_src) as f:
    block = f.read()
out, skipping, inserted = [], False, False
for line in lines:
    if begin in line:
        skipping = True
        if not inserted:
            out.append(block.rstrip("\n") + "\n")
            inserted = True
        continue
    if end in line:
        skipping = False
        continue
    if not skipping:
        out.append(line)
mode = stat.S_IMODE(os.stat(target).st_mode)
with tempfile.NamedTemporaryFile(
    mode="w", dir=os.path.dirname(target), prefix=".cluos-global-config-", delete=False
) as f:
    temporary = f.name
    f.write("".join(out))
os.chmod(temporary, mode)
os.replace(temporary, target)
PYEOF
    echo "UPDATED $target (backup: $BACKUP_DIR/$backup_name)"

  else
    if [ "$CHECK_ONLY" = true ]; then
      echo "MISSING $target (block absent, would append)"
      DRIFT=$((DRIFT + 1))
      continue
    fi
    mkdir -p "$BACKUP_DIR"
    backup_name="$(backup_name_for "$target")"
    cp "$target" "$BACKUP_DIR/$backup_name"
    printf '\n\n' >> "$target"
    cat "$BLOCK_SRC" >> "$target"
    echo "APPENDED $target (backup: $BACKUP_DIR/$backup_name)"
  fi
done

if [ "$CHECK_ONLY" = true ] && [ "$DRIFT" -gt 0 ]; then
  echo "global config drift detected: $DRIFT target(s)"
  exit 1
fi

exit 0
