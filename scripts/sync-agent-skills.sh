#!/usr/bin/env bash
# Idempotent sync of agent-skills/frontend/* plus their shared/profile support
# files into the Claude, Codex, and cross-runtime ~/.agents directories.
# Copies, not symlinks — cross-repo symlinks are fragile if either side moves.
# Backs up any pre-existing managed content before overwriting. Safe to re-run;
# it preserves unrelated files in the destination shared/profile directories.
#
# Usage:
#   scripts/sync-agent-skills.sh            # sync all targets
#   scripts/sync-agent-skills.sh --check     # report drift only, no writes
#   scripts/sync-agent-skills.sh --claude-only
#   scripts/sync-agent-skills.sh --codex-only
#   scripts/sync-agent-skills.sh --agents-only

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/agent-skills/frontend"
SHARED_SRC="$REPO_ROOT/agent-skills/shared"
PROFILES_SRC="$REPO_ROOT/agent-skills/profiles"
AGENT_DEFS_SRC="$REPO_ROOT/agent-skills/agents"
CLAUDE_DEST="$HOME/.claude/skills"
CODEX_DEST="$HOME/.codex/skills"
AGENTS_DEST="$HOME/.agents/skills"
RUN_ID="$(date +%Y%m%d-%H%M%S)-$$"
BACKUP_ROOT="$REPO_ROOT/.skill-sync-backups/$RUN_ID"

CHECK_ONLY=false
DO_CLAUDE=true
DO_CODEX=true
DO_AGENTS=true
DRIFT=0

safe_relative_path() {
  local relative_path="$1"
  case "$relative_path" in
    ""|/*|.|./*|../*|*/..|*/../*|*/./*) return 1 ;;
    *) return 0 ;;
  esac
}

has_symlink_component() {
  local absolute_path="$1"
  local current_path=""
  local component
  local -a components

  case "$absolute_path" in
    /*) ;;
    *) return 0 ;;
  esac

  IFS='/' read -r -a components <<< "${absolute_path#/}"
  for component in "${components[@]}"; do
    [ -n "$component" ] || continue
    current_path="$current_path/$component"
    if [ -L "$current_path" ]; then
      return 0
    fi
  done
  return 1
}

for arg in "$@"; do
  case "$arg" in
    --check) CHECK_ONLY=true ;;
    --claude-only) DO_CODEX=false; DO_AGENTS=false ;;
    --codex-only) DO_CLAUDE=false; DO_AGENTS=false ;;
    --agents-only) DO_CLAUDE=false; DO_CODEX=false ;;
    *) echo "unknown flag: $arg" >&2; exit 1 ;;
  esac
done

if [ "$DO_CLAUDE" = false ] && [ "$DO_CODEX" = false ] && [ "$DO_AGENTS" = false ]; then
  echo "no sync target selected" >&2
  exit 1
fi

for required_source in "$SRC" "$SHARED_SRC" "$PROFILES_SRC"; do
  if [ ! -d "$required_source" ]; then
    echo "canonical source not found: $required_source" >&2
    exit 1
  fi
  if has_symlink_component "$required_source"; then
    echo "canonical source path contains a symlink component: $required_source" >&2
    exit 1
  fi
done

source_symlink="$(find "$SRC" "$SHARED_SRC" "$PROFILES_SRC" -type l -print -quit)"
if [ -n "$source_symlink" ]; then
  echo "canonical source contains unsupported symlink: $source_symlink" >&2
  exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
  echo "required command not found: rsync" >&2
  exit 1
fi

if has_symlink_component "$BACKUP_ROOT"; then
  echo "backup path contains a symlink component: $BACKUP_ROOT" >&2
  exit 1
fi

preflight_support_namespace() {
  local source_root="$1"
  local dest_root="$2"
  local label="$3"
  local category="$4"
  local ledger="$dest_root/.managed-files"
  local current_list
  local previous_list=""
  local relative_path

  if has_symlink_component "$dest_root"; then
    echo "[$label] unsafe symlink component in support root: $category" >&2
    return 1
  fi
  if has_symlink_component "$ledger"; then
    echo "[$label] unsafe symlink component in managed-file ledger: $category" >&2
    return 1
  fi
  if [ -e "$ledger" ] && [ ! -f "$ledger" ]; then
    echo "[$label] managed-file ledger is not a regular file: $category" >&2
    return 1
  fi
  if [ -f "$ledger" ]; then
    previous_list="$(cat "$ledger")"
  fi

  current_list="$(
    cd "$source_root"
    find . -type f -print | sed 's#^\./##' | LC_ALL=C sort
  )"
  if [ -z "$current_list" ]; then
    echo "[$label] EMPTY canonical support source: $source_root" >&2
    return 1
  fi

  while IFS= read -r relative_path; do
    [ -n "$relative_path" ] || continue
    if ! safe_relative_path "$relative_path"; then
      echo "[$label] unsafe canonical support path: $category/$relative_path" >&2
      return 1
    fi
    if has_symlink_component "$dest_root/$relative_path"; then
      echo "[$label] unsafe symlink component in support destination: $category/$relative_path" >&2
      return 1
    fi
  done <<< "$current_list"

  while IFS= read -r relative_path; do
    [ -n "$relative_path" ] || continue
    if ! safe_relative_path "$relative_path"; then
      echo "[$label] unsafe path in managed-file ledger: $category/$relative_path" >&2
      return 1
    fi
    if has_symlink_component "$dest_root/$relative_path"; then
      echo "[$label] unsafe symlink component in managed support path: $category/$relative_path" >&2
      return 1
    fi
  done <<< "$previous_list"
}

sync_support_namespace() {
  local source_root="$1"
  local dest_root="$2"
  local label="$3"
  local category="$4"
  local ledger="$dest_root/.managed-files"
  local current_list
  local previous_list=""

  preflight_support_namespace "$source_root" "$dest_root" "$label" "$category"

  current_list="$(
    cd "$source_root"
    find . -type f -print | sed 's#^\./##' | LC_ALL=C sort
  )"
  if [ -z "$current_list" ]; then
    echo "[$label] EMPTY canonical support source: $source_root" >&2
    return 1
  fi

  if [ -f "$ledger" ]; then
    previous_list="$(cat "$ledger")"
  fi

  while IFS= read -r relative_path; do
    [ -n "$relative_path" ] || continue
    if ! safe_relative_path "$relative_path"; then
      echo "[$label] unsafe canonical support path: $category/$relative_path" >&2
      return 1
    fi
  done <<< "$current_list"

  while IFS= read -r relative_path; do
    [ -n "$relative_path" ] || continue
    if ! safe_relative_path "$relative_path"; then
      echo "[$label] unsafe path in managed-file ledger: $category/$relative_path" >&2
      return 1
    fi
    local managed_path="$dest_root/$relative_path"
    if has_symlink_component "$managed_path"; then
      echo "[$label] unsafe symlink component in managed support file: $category/$relative_path" >&2
      return 1
    fi
  done <<< "$previous_list"

  while IFS= read -r relative_path; do
    [ -n "$relative_path" ] || continue
    local candidate_path="$dest_root/$relative_path"
    if has_symlink_component "$candidate_path"; then
      echo "[$label] unsafe symlink component in support destination: $category/$relative_path" >&2
      return 1
    fi
  done <<< "$current_list"

  if [ "$CHECK_ONLY" = true ]; then
    if [ ! -f "$ledger" ] || [ "$previous_list" != "$current_list" ]; then
      echo "[$label] DRIFT $category managed-file ledger"
      DRIFT=$((DRIFT + 1))
    fi

    while IFS= read -r relative_path; do
      [ -n "$relative_path" ] || continue
      local source_path="$source_root/$relative_path"
      local dest_path="$dest_root/$relative_path"
      if [ ! -f "$dest_path" ]; then
        echo "[$label] MISSING $category/$relative_path"
        DRIFT=$((DRIFT + 1))
      elif ! cmp -s "$source_path" "$dest_path"; then
        echo "[$label] DRIFT $category/$relative_path"
        DRIFT=$((DRIFT + 1))
      fi
    done <<< "$current_list"

    while IFS= read -r relative_path; do
      [ -n "$relative_path" ] || continue
      if ! grep -Fqx -- "$relative_path" <<< "$current_list"; then
        echo "[$label] STALE $category/$relative_path"
        DRIFT=$((DRIFT + 1))
      fi
    done <<< "$previous_list"
    return 0
  fi

  if has_symlink_component "$dest_root"; then
    echo "[$label] support root changed to an unsafe symlink path: $category" >&2
    return 1
  fi
  mkdir -p "$dest_root"

  if [ -f "$ledger" ] && [ "$previous_list" != "$current_list" ]; then
    local ledger_backup="$BACKUP_ROOT/$label/support/$category/.managed-files"
    mkdir -p "$(dirname "$ledger_backup")"
    cp "$ledger" "$ledger_backup"
  fi

  while IFS= read -r relative_path; do
    [ -n "$relative_path" ] || continue
    if ! grep -Fqx -- "$relative_path" <<< "$current_list"; then
      local stale_path="$dest_root/$relative_path"
      if [ -f "$stale_path" ]; then
        if has_symlink_component "$stale_path"; then
          echo "[$label] stale managed path contains a symlink: $category/$relative_path" >&2
          return 1
        fi
        local stale_backup="$BACKUP_ROOT/$label/support/$category/$relative_path"
        mkdir -p "$(dirname "$stale_backup")"
        cp "$stale_path" "$stale_backup"
        rm "$stale_path"
        echo "[$label] REMOVED stale managed $category/$relative_path"
      fi
    fi
  done <<< "$previous_list"

  while IFS= read -r relative_path; do
    [ -n "$relative_path" ] || continue
    local source_path="$source_root/$relative_path"
    local dest_path="$dest_root/$relative_path"

    if has_symlink_component "$dest_path"; then
      echo "[$label] support destination changed to a symlink path: $category/$relative_path" >&2
      return 1
    fi

    if [ -f "$dest_path" ] && ! cmp -s "$source_path" "$dest_path"; then
      local backup_path="$BACKUP_ROOT/$label/support/$category/$relative_path"
      mkdir -p "$(dirname "$backup_path")"
      cp "$dest_path" "$backup_path"
      echo "[$label] BACKED UP $category/$relative_path"
    fi

    if [ ! -f "$dest_path" ] || ! cmp -s "$source_path" "$dest_path"; then
      mkdir -p "$(dirname "$dest_path")"
      cp "$source_path" "$dest_path"
      echo "[$label] SYNCED $category/$relative_path"
    fi
  done <<< "$current_list"

  local ledger_tmp
  if has_symlink_component "$dest_root"; then
    echo "[$label] support root changed before ledger write: $category" >&2
    return 1
  fi
  ledger_tmp="$(mktemp "$dest_root/.managed-files.tmp.XXXXXX")"
  printf '%s\n' "$current_list" > "$ledger_tmp"
  mv "$ledger_tmp" "$ledger"
}

preflight_target() {
  local dest_root="$1"
  local label="$2"

  if has_symlink_component "$dest_root" || [ ! -d "$dest_root" ]; then
    echo "[$label] destination not accessible: $dest_root" >&2
    return 1
  fi

  # Reject unsafe source/destination links before copying any skill for this
  # client, so one bad path cannot produce a partial skill sync.
  for skill_dir in "$SRC"/*/; do
    local preflight_slug
    preflight_slug="$(basename "$skill_dir")"
    if has_symlink_component "$skill_dir" || has_symlink_component "$dest_root/$preflight_slug"; then
      echo "[$label] unsafe symlinked skill path: $preflight_slug" >&2
      return 1
    fi
    if [ -d "$dest_root/$preflight_slug" ]; then
      local installed_symlink
      installed_symlink="$(find "$dest_root/$preflight_slug" -type l -print -quit)"
      if [ -n "$installed_symlink" ]; then
        echo "[$label] installed skill contains unsupported symlink: $installed_symlink" >&2
        return 1
      fi
    fi
  done

  local client_root
  client_root="$(dirname "$dest_root")"
  preflight_support_namespace \
    "$SHARED_SRC" \
    "$client_root/shared/cluos-design-system" \
    "$label" \
    "shared/cluos-design-system"
  preflight_support_namespace \
    "$PROFILES_SRC" \
    "$client_root/profiles/cluos-design-system" \
    "$label" \
    "profiles/cluos-design-system"
}

sync_target() {
  local dest_root="$1"
  local label="$2"

  # Repeat the target preflight immediately before mutation to reduce the
  # window between the all-target preflight and each client sync.
  preflight_target "$dest_root" "$label"

  local client_root
  client_root="$(dirname "$dest_root")"

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
        DRIFT=$((DRIFT + 1))
        continue
      fi
      mkdir -p "$BACKUP_ROOT/$label"
      cp -R "$dest" "$BACKUP_ROOT/$label/$slug"
      echo "[$label] BACKED UP $slug -> $BACKUP_ROOT/$label/$slug"
    fi

    if [ "$CHECK_ONLY" = true ]; then
      if [ ! -d "$dest" ]; then
        echo "[$label] MISSING $slug (would install)"
        DRIFT=$((DRIFT + 1))
      fi
      continue
    fi

    mkdir -p "$dest"
    rsync -a --delete "$skill_dir" "$dest/"
    echo "[$label] SYNCED $slug"
  done

  # Informational only: skills present in this client root that this script
  # does not manage. They are neither synced nor counted as drift.
  if [ "$CHECK_ONLY" = true ]; then
    for installed_dir in "$dest_root"/*/; do
      [ -d "$installed_dir" ] || continue
      local installed_slug
      installed_slug="$(basename "$installed_dir")"
      if [ ! -d "$SRC/$installed_slug" ]; then
        echo "[$label] INFO unmanaged $installed_slug (not in canonical source)"
      fi
    done
  fi

  sync_support_namespace \
    "$SHARED_SRC" \
    "$client_root/shared/cluos-design-system" \
    "$label" \
    "shared/cluos-design-system"
  sync_support_namespace \
    "$PROFILES_SRC" \
    "$client_root/profiles/cluos-design-system" \
    "$label" \
    "profiles/cluos-design-system"
}

# Validate every selected client before writing any of them. A bad path in a
# later client therefore cannot leave earlier clients partially synchronized.
if [ "$DO_CLAUDE" = true ]; then
  preflight_target "$CLAUDE_DEST" "claude"
fi
if [ "$DO_CODEX" = true ]; then
  preflight_target "$CODEX_DEST" "codex"
fi
if [ "$DO_AGENTS" = true ]; then
  preflight_target "$AGENTS_DEST" "agents"
fi

if [ "$DO_CLAUDE" = true ]; then
  sync_target "$CLAUDE_DEST" "claude"
  # Reviewer subagents (Claude Code only): agent-skills/agents/*.md -> ~/.claude/agents/
  if [ -d "$AGENT_DEFS_SRC" ]; then
    agents_dest="$(dirname "$CLAUDE_DEST")/agents"
    for agent_file in "$AGENT_DEFS_SRC"/*.md; do
      [ -f "$agent_file" ] || continue
      agent_name="$(basename "$agent_file")"
      if has_symlink_component "$agents_dest/$agent_name"; then
        echo "[claude] unsafe symlink component in agent destination: $agent_name" >&2; exit 1
      fi
      if [ -f "$agents_dest/$agent_name" ] && cmp -s "$agent_file" "$agents_dest/$agent_name"; then
        [ "$CHECK_ONLY" = true ] && echo "[claude] OK agent $agent_name"
        continue
      fi
      if [ "$CHECK_ONLY" = true ]; then
        if [ -f "$agents_dest/$agent_name" ]; then echo "[claude] DRIFT agent $agent_name"; else echo "[claude] MISSING agent $agent_name"; fi
        DRIFT=$((DRIFT + 1)); continue
      fi
      mkdir -p "$agents_dest"
      if [ -f "$agents_dest/$agent_name" ]; then
        mkdir -p "$BACKUP_ROOT/claude/agents"; cp "$agents_dest/$agent_name" "$BACKUP_ROOT/claude/agents/$agent_name"
        echo "[claude] BACKED UP agent $agent_name"
      fi
      cp "$agent_file" "$agents_dest/$agent_name"; echo "[claude] SYNCED agent $agent_name"
    done
  fi
fi
if [ "$DO_CODEX" = true ]; then
  sync_target "$CODEX_DEST" "codex"
fi
if [ "$DO_AGENTS" = true ]; then
  sync_target "$AGENTS_DEST" "agents"
fi

if [ "$CHECK_ONLY" = true ]; then
  if [ "$DRIFT" -gt 0 ]; then
    echo "drift detected: $DRIFT managed item(s)"
    exit 1
  fi
  echo "skill installs and support files are in sync"
else
  echo "done. Canonical source: $SRC"
  if [ -d "$BACKUP_ROOT" ]; then
    echo "backups: $BACKUP_ROOT"
  fi
fi

exit 0
