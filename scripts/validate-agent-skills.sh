#!/usr/bin/env bash
# Read-only validation of agent-skills/. Checks:
#   - every SKILL.md has name + description frontmatter
#   - no duplicate slugs
#   - every manifest.yaml entry has a matching SKILL.md on disk
#   - no placeholder text (TODO, TBD, "implementar depois")
#   - references from shared/routing-matrix.yaml resolve to real skills
#   - drift between canonical source and installed copies (via sync --check)
#
# Exit code 0 = clean, 1 = problems found. Never writes anything.

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/agent-skills/frontend"
PROBLEMS=0

fail() { echo "FAIL: $1" >&2; PROBLEMS=$((PROBLEMS + 1)); }
ok()   { echo "ok: $1"; }

echo "== frontmatter and placeholder check =="
SEEN_SLUGS=" "
for skill_md in "$SRC"/*/SKILL.md; do
  dir="$(dirname "$skill_md")"
  slug="$(basename "$dir")"

  if ! head -1 "$skill_md" | grep -q '^---$'; then
    fail "$slug: SKILL.md does not start with YAML frontmatter (---)"
    continue
  fi

  name_line="$(sed -n '2,/^---$/p' "$skill_md" | grep -E '^name:' | head -1)"
  desc_line="$(sed -n '2,/^---$/p' "$skill_md" | grep -E '^description:' | head -1)"

  [ -z "$name_line" ] && fail "$slug: missing 'name:' in frontmatter"
  [ -z "$desc_line" ] && fail "$slug: missing 'description:' in frontmatter"

  extracted_name="$(echo "$name_line" | sed -E 's/^name:[[:space:]]*//')"
  if [ -n "$extracted_name" ] && [ "$extracted_name" != "$slug" ]; then
    fail "$slug: frontmatter name '$extracted_name' does not match directory slug"
  fi

  case "$SEEN_SLUGS" in
    *" $slug "*) fail "duplicate slug: $slug" ;;
  esac
  SEEN_SLUGS="$SEEN_SLUGS$slug "

  if grep -qE '\bTODO\b|\bTBD\b|implementar depois' "$skill_md"; then
    fail "$slug: contains a placeholder marker (TODO/TBD/implementar depois)"
  fi

  ok "$slug frontmatter"
done

echo ""
echo "== manifest completeness =="
MANIFEST="$REPO_ROOT/agent-skills/manifest.yaml"
if [ ! -f "$MANIFEST" ]; then
  fail "manifest.yaml not found at $MANIFEST"
else
  while IFS= read -r slug; do
    if [ ! -f "$SRC/$slug/SKILL.md" ]; then
      fail "manifest references '$slug' but $SRC/$slug/SKILL.md does not exist"
    else
      ok "manifest entry '$slug' resolves"
    fi
  done < <(grep -E 'slug:' "$MANIFEST" | sed -E 's/^.*slug:[[:space:]]*//')
fi

echo ""
echo "== shared reference files exist =="
for f in design-archetypes.yaml palette-policy.md anti-slop-rubric.md routing-matrix.yaml; do
  if [ ! -f "$REPO_ROOT/agent-skills/shared/$f" ]; then
    fail "shared/$f missing"
  else
    ok "shared/$f present"
  fi
done

echo ""
echo "== install drift (canonical vs ~/.claude/skills, ~/.codex/skills, ~/.agents/skills) =="
if "$REPO_ROOT/scripts/sync-agent-skills.sh" --check; then
  ok "installed skills and support files match canonical source"
else
  fail "installed skills or support files drift from canonical source"
fi

echo ""
echo "== routing matrix consistency =="
if "$REPO_ROOT/scripts/test-frontend-routing.sh"; then
  ok "frontend routing matrix"
else
  fail "frontend routing matrix inconsistency"
fi

echo ""
echo "== ux-layout-architect contract and scenarios =="
if python3 "$REPO_ROOT/scripts/test-ux-layout-architect.py"; then
  ok "ux-layout-architect contract"
else
  fail "ux-layout-architect contract or scenario coverage"
fi

echo ""
echo "== installed path and support namespace resolution =="
if python3 "$REPO_ROOT/scripts/test-skill-install-layouts.py"; then
  ok "installed skill/support layouts"
else
  fail "installed skill/support layout mismatch"
fi

echo ""
echo "== sync isolation and symlink safety =="
if python3 "$REPO_ROOT/scripts/test-sync-safety.py"; then
  ok "sync safety regression"
else
  fail "sync safety regression"
fi

echo ""
echo "== path-scoped Claude rules in product repos =="
if "$REPO_ROOT/scripts/sync-claude-rules.sh" --check; then
  ok "cluos-frontend.md / cluos-ops.md rules match canonical sources"
else
  fail "path-scoped rules drift"
fi

echo ""
echo "== global frontend workflow block =="
if "$REPO_ROOT/scripts/sync-global-config.sh" --check; then
  ok "global frontend workflow block matches canonical source"
else
  fail "global frontend workflow block drift"
fi

echo ""
if [ "$PROBLEMS" -eq 0 ]; then
  echo "validate-agent-skills: CLEAN"
  exit 0
else
  echo "validate-agent-skills: $PROBLEMS problem(s) found"
  exit 1
fi
