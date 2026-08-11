#!/usr/bin/env bash
# First-time install of CluOS agent skills into Claude and Codex.
# Thin wrapper over sync-agent-skills.sh — that script is the single
# source of copy logic; this one just prints setup context first so a
# first run reads differently from an ongoing re-sync.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "CluOS agent skills — install"
echo "canonical source: $REPO_ROOT/agent-skills/frontend"
echo "targets: ~/.claude/skills/, ~/.codex/skills/"
echo ""

if [ ! -d "$HOME/.claude/skills" ] && [ ! -d "$HOME/.codex/skills" ]; then
  echo "neither ~/.claude/skills nor ~/.codex/skills exists — nothing to install into." >&2
  echo "create the directory for whichever agent you use, then re-run." >&2
  exit 1
fi

exec "$REPO_ROOT/scripts/sync-agent-skills.sh" "$@"
