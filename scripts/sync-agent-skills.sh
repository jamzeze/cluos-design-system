#!/usr/bin/env bash
# Idempotent sync of agent-skills/frontend/* (canonical) into the Claude and
# Codex skill directories. Copies, not symlinks — cross-repo symlinks are
# fragile if either side moves. Backs up any pre-existing skill with the
# same slug before overwriting, once per run, never overwriting its own
# backup. Safe to re-run; only touches files whose content actually changed.
#
# Usage:
#   scripts/sync-agent-skills.sh            # sync both targets
#   scripts/sync-agent-skills.sh --check     # report drift only, no writes
#   scripts/sync-agent-skills.sh --claude-only
#   scripts/sync-agent-skills.sh --codex-only

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/agent-skills/frontend"
CLAUDE_DEST="$HOME/.claude/skills"
CODEX_DEST="$HOME/.codex/skills"
BACKUP_ROOT="$REPO_ROOT/.skill-sync-backups/$(date +%Y%m%d-%H%M%S)"

CHECK_ONLY=false
DO_CLAUDE=true
DO_CODEX=true

for arg in "$@"; do
  case "$arg" in
    --check) CHECK_ONLY=true ;;
    --claude-only) DO_CODEX=false ;;
    --codex-only) DO_CLAUDE=false ;;
    *) echo "unknown flag: $arg" >&2; exit 1 ;;
  esac
done

if [ ! -d "$SRC" ]; then
  echo "canonical source not found: $SRC" >&2
  exit 1
fi

sync_target() {
  local dest_root="$1"
  local label="$2"

  if [ ! -d "$dest_root" ]; then
    echo "[$label] destination not accessible: $dest_root" >&2
    return 1
  fi

  for skill_dir in "$SRC"/*/; do
    local slug
    slug="$(basename "$skill_dir")"
    local dest="$dest_root/$slug"

    if [ ! -f "$skill_dir/SKILL.md" ]; then
      echo "[$label] SKIP $slug: no SKILL.md in canonical source" >&2
      continue
    fi

    if [ -d "$dest" ] && ! diff -rq "$skill_dir" "$dest" >/dev/null 2>&1; then
      # existing install diverges from canonical — back it up before touching it,
      # unless it's just our own previous sync (identical content = no-op below anyway)
      if [ "$CHECK_ONLY" = true ]; then
        echo "[$label] DRIFT $slug (would back up + overwrite)"
        continue
      fi
      mkdir -p "$BACKUP_ROOT/$label"
      cp -R "$dest" "$BACKUP_ROOT/$label/$slug"
      echo "[$label] BACKED UP $slug -> $BACKUP_ROOT/$label/$slug"
    fi

    if [ "$CHECK_ONLY" = true ]; then
      if [ ! -d "$dest" ]; then
        echo "[$label] MISSING $slug (would install)"
      fi
      continue
    fi

    mkdir -p "$dest"
    rsync -a --delete "$skill_dir" "$dest/" 2>/dev/null || cp -R "$skill_dir." "$dest/"
    echo "[$label] SYNCED $slug"
  done
}

if [ "$DO_CLAUDE" = true ]; then
  sync_target "$CLAUDE_DEST" "claude"
fi
if [ "$DO_CODEX" = true ]; then
  sync_target "$CODEX_DEST" "codex"
fi

if [ "$CHECK_ONLY" = false ]; then
  echo "done. Canonical source: $SRC"
  if [ -d "$BACKUP_ROOT" ]; then
    echo "backups: $BACKUP_ROOT"
  fi
fi

exit 0
