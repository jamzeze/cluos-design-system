#!/usr/bin/env bash
# Install path-scoped Claude Code rules into each CluOS product repository.
#
#   <repo>/.claude/rules/cluos-frontend.md  = paths frontmatter + the canonical
#       CLUOS FRONTEND WORKFLOW block (agent-skills/global-config-block.md).
#       Loads only when Claude reads a UI file, instead of in every session.
#   <repo>/.claude/rules/cluos-ops.md       = copied from
#       global-copilot-os/claude-global/rules/cluos-ops.md when present.
#
# Idempotent. --check reports drift without writing. Backs up a differing
# file next to the sync backups before overwriting. Codex has no path-scoped
# rules; it keeps the full block in ~/.codex/AGENTS.md via sync-global-config.sh.
#
# Usage:
#   scripts/sync-claude-rules.sh            # apply to every repo in REPOS
#   scripts/sync-claude-rules.sh --check    # drift only

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE="${CLUOS_WORKSPACE:-$(cd "$REPO_ROOT/.." && pwd)}"
BLOCK_SRC="$REPO_ROOT/agent-skills/global-config-block.md"
OPS_SRC="$WORKSPACE/global-copilot-os/claude-global/rules/cluos-ops.md"
RUN_ID="$(date +%Y%m%d-%H%M%S)-$$"
BACKUP_ROOT="$REPO_ROOT/.skill-sync-backups/$RUN_ID/rules"
CHECK_ONLY=false
DRIFT=0

REPOS=(
  azigos
  MMS
  automatic-aeo
  termos
  suporte
  medframe
  sci-os
  cluos-design-system
)

FRONTMATTER='---
paths:
  - "**/*.{tsx,jsx,vue,svelte,astro,css,scss,html}"
  - "ui/**"
  - "apps/web/**"
  - "app/**"
  - "components/**"
  - "frontend/**"
  - "src/components/**"
  - "src/app/**"
  - "**/tailwind.config.*"
  - "**/tokens*.css"
---
'

for arg in "$@"; do
  case "$arg" in
    --check) CHECK_ONLY=true ;;
    *) echo "unknown flag: $arg" >&2; exit 1 ;;
  esac
done

[ -f "$BLOCK_SRC" ] || { echo "canonical block not found: $BLOCK_SRC" >&2; exit 1; }

FRONTEND_CONTENT="$FRONTMATTER
$(cat "$BLOCK_SRC")
"

install_file() {
  local repo="$1" name="$2" content="$3"
  local dir="$WORKSPACE/$repo/.claude/rules"
  local target="$dir/$name"
  if [ -L "$dir" ] || [ -L "$target" ]; then
    echo "[$repo] ERROR symlinked rules path: $target" >&2; return 1
  fi
  if [ -f "$target" ] && [ "$(cat "$target")" = "$(printf '%s' "$content")" ]; then
    echo "[$repo] OK   $name"; return 0
  fi
  if [ "$CHECK_ONLY" = true ]; then
    if [ -f "$target" ]; then echo "[$repo] DRIFT $name"; else echo "[$repo] MISSING $name"; fi
    DRIFT=$((DRIFT + 1)); return 0
  fi
  if [ -f "$target" ]; then
    mkdir -p "$BACKUP_ROOT/$repo"; cp "$target" "$BACKUP_ROOT/$repo/$name"
    echo "[$repo] BACKED UP $name -> $BACKUP_ROOT/$repo/$name"
  fi
  mkdir -p "$dir"
  printf '%s' "$content" > "$target"
  echo "[$repo] SYNCED $name"
}

for repo in "${REPOS[@]}"; do
  if [ ! -d "$WORKSPACE/$repo" ]; then
    echo "[$repo] SKIP repo not present"; continue
  fi
  install_file "$repo" "cluos-frontend.md" "$FRONTEND_CONTENT"
  if [ -f "$OPS_SRC" ]; then
    install_file "$repo" "cluos-ops.md" "$(cat "$OPS_SRC")
"
  fi
done

if [ "$CHECK_ONLY" = true ] && [ "$DRIFT" -gt 0 ]; then
  echo "rules drift detected: $DRIFT file(s)"; exit 1
fi
[ "$CHECK_ONLY" = true ] && echo "claude rules in sync" || echo "done. Source block: $BLOCK_SRC"
exit 0
