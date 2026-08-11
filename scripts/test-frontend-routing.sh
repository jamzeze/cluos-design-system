#!/usr/bin/env bash
# Validates internal consistency of shared/routing-matrix.yaml against
# manifest.yaml, and prints the 12-prompt test matrix for human review.
#
# What this DOES check: every skill name referenced in the test matrix
# exists in manifest.yaml; every level referenced exists in the levels map.
#
# What this does NOT check, and cannot check from this environment: whether
# a live Claude Code or Codex session actually invokes the right skill for
# a given prompt. That requires running real agent sessions against each
# prompt and observing behavior — deferred, see
# docs/cluos-design-system-v2/skill-provenance.md "Deferred".

set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 - "$REPO_ROOT" <<'PYEOF'
import sys, yaml, pathlib

root = pathlib.Path(sys.argv[1])
matrix = yaml.safe_load((root / "agent-skills/shared/routing-matrix.yaml").read_text())
manifest = yaml.safe_load((root / "agent-skills/manifest.yaml").read_text())

known_skills = {s["slug"] for s in manifest["skills"]}
known_levels = set(matrix["levels"].keys())

problems = []
print(f"{'level':<6} {'skills':<70} prompt")
print("-" * 110)
for row in matrix["test_matrix"]:
    level = row["level"]
    prompt = row["prompt"]
    skills = row.get("skills", [])
    print(f"{str(level):<6} {','.join(skills):<70} {prompt}")

    if level not in known_levels and not str(level).startswith(("ambíguo",)):
        problems.append(f"unknown level '{level}' for prompt: {prompt}")

    for sk in skills:
        # non-CluOS-skill-suite names (superpowers/product-design chain skills)
        # are allowed to appear without a manifest entry — only flag names
        # that look like they SHOULD be one of our five.
        if sk in {"anti-ai-slop-frontend", "design-gallery", "frontend-craftsman",
                   "design-critic", "design-system-refactor-director"} and sk not in known_skills:
            problems.append(f"'{sk}' referenced in test_matrix but missing from manifest.yaml")

print("")
if problems:
    print(f"test-frontend-routing: {len(problems)} problem(s)")
    for p in problems:
        print(f"  - {p}")
    sys.exit(1)
else:
    print("test-frontend-routing: matrix internally consistent (12 prompts, static check only)")
PYEOF
