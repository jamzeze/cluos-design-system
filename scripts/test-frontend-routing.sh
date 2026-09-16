#!/usr/bin/env bash
# Read-only structural validation for the frontend routing matrix, manifest,
# canonical references, and hard-coded layout-contract expectations. Live
# activation behavior is evaluated separately.

set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

python3 - "$REPO_ROOT" <<'PYEOF'
import pathlib
import sys

import yaml


root = pathlib.Path(sys.argv[1])
agent_skills = root / "agent-skills"
frontend = agent_skills / "frontend"
agent_skills_resolved = agent_skills.resolve()
matrix = yaml.safe_load((agent_skills / "shared/routing-matrix.yaml").read_text())
manifest = yaml.safe_load((agent_skills / "manifest.yaml").read_text())

# Steps that are real skills outside this package (superpowers) or manual
# checks. Anything else referenced by the matrix must exist in manifest.yaml.
external_skills = {
    "systematic-debugging",
    "verification-before-completion",
    "verificação-visual",
    "writing-plans",
}
human_steps = {"seleção humana"}
expected_layout_contract = {
    "Corrija o alinhamento deste botão.": False,
    "Crie um novo componente de filtro.": False,
    "Refatore esta tabela.": True,
    "Crie uma tela de dashboard.": True,
    "Redesenhe o onboarding.": True,
    "Mude a paleta do produto.": False,
    "Refatore o design system.": False,
    "Refatore o design system e a estrutura das telas de referência.": True,
    "Implemente esta imagem.": False,
    "Melhore o frontend.": None,
    "Adicione uma animação ao modal.": False,
    "Corrija um bug de teclado no combobox.": False,
    "Crie uma landing page.": True,
    "Otimize a disposição dos elementos na tela de laudo do Azigos.": True,
    "Ajuste a regra de calibre da crossa no mapa de varizes.": False,
    "Corrija o gate de autorização que habilita a seleção de procedimento.": False,
}
chain_skills_forbidden_after_skip = {
    "ux-layout-architect", "design-gallery", "frontend-craftsman",
    "design-critic", "design-qa", "design-system-refactor-director",
}

problems = []


def is_inside(path, root):
    try:
        path.relative_to(root)
        return True
    except ValueError:
        return False


skills = manifest.get("skills", [])
if not isinstance(skills, list):
    problems.append("manifest skills must be a list")
    skills = []

slugs = [skill.get("slug") for skill in skills if isinstance(skill, dict)]
known_skills = {slug for slug in slugs if isinstance(slug, str)}
if len(known_skills) != len(slugs):
    problems.append("manifest has a missing or duplicate skill slug")

for skill in skills:
    slug = skill.get("slug", "<missing>")
    if set(skill.get("compatible_with", [])) != {"claude", "codex", "agents"}:
        problems.append(f"{slug}: compatible_with must cover claude, codex, and agents")
    for dependency in skill.get("depends_on", []):
        if dependency not in known_skills and dependency not in external_skills:
            problems.append(f"{slug}: unknown dependency '{dependency}'")
    for successor in skill.get("precedes", []):
        if successor not in known_skills and successor not in external_skills:
            problems.append(f"{slug}: unknown successor '{successor}'")

    skill_path = (agent_skills / skill.get("path", "")).resolve()
    if not is_inside(skill_path, agent_skills_resolved):
        problems.append(f"{slug}: manifest path escapes agent-skills/: {skill.get('path')}")
    if not skill_path.is_file():
        problems.append(f"{slug}: manifest path does not resolve: {skill_path}")
    profile_path = (agent_skills / skill.get("cluos_profile", "")).resolve()
    if not is_inside(profile_path, agent_skills_resolved):
        problems.append(
            f"{slug}: CluOS profile path escapes agent-skills/: {skill.get('cluos_profile')}"
        )
    if not profile_path.is_dir():
        problems.append(f"{slug}: CluOS profile does not resolve: {profile_path}")
    for reference in skill.get("references", []):
        reference_path = (frontend / reference).resolve()
        if not is_inside(reference_path, agent_skills_resolved):
            problems.append(f"{slug}: manifest reference escapes agent-skills/: {reference}")
            continue
        if not reference_path.is_file():
            problems.append(f"{slug}: manifest reference does not resolve: {reference}")

levels = matrix.get("levels", {})
known_levels = set(levels)
allowed_flow_steps = known_skills | external_skills | human_steps
for level, definition in levels.items():
    flow = definition.get("flow", [])
    if not isinstance(flow, list) or not flow:
        problems.append(f"{level}: flow must be a non-empty list")
        continue
    for raw_step in flow:
        if not isinstance(raw_step, str):
            problems.append(f"{level}: flow step must be a string")
            continue
        step = raw_step.split(" (", 1)[0]
        if step not in allowed_flow_steps:
            problems.append(f"{level}: unknown flow step '{step}'")

rows = matrix.get("test_matrix", [])
if not isinstance(rows, list):
    problems.append("test_matrix must be a list")
    rows = []

observed_prompts = set()
print(f"{'level':<6} {'layout':<7} {'skills':<68} prompt")
print("-" * 122)
for row in rows:
    if not isinstance(row, dict):
        problems.append("test_matrix row must be a mapping")
        continue
    allowed_row_keys = {
        "prompt", "level", "skills", "layout_contract", "gallery", "selection", "note"
    }
    if not set(row).issubset(allowed_row_keys):
        problems.append(f"unexpected test row keys for prompt: {row.get('prompt')}")

    level = row.get("level")
    prompt = row.get("prompt")
    row_skills = row.get("skills", [])
    layout_contract = row.get("layout_contract")
    print(
        f"{str(level):<6} {str(layout_contract):<7} "
        f"{','.join(row_skills):<68} {prompt}"
    )

    if not isinstance(prompt, str) or not prompt:
        problems.append("test_matrix prompt must be a non-empty string")
        continue
    if prompt in observed_prompts:
        problems.append(f"duplicate test prompt: {prompt}")
    observed_prompts.add(prompt)

    if level not in known_levels and not str(level).startswith("ambíguo"):
        problems.append(f"unknown level '{level}' for prompt: {prompt}")
    if not isinstance(row_skills, list) or not all(isinstance(v, str) for v in row_skills):
        problems.append(f"skills must be a string list for prompt: {prompt}")
        continue
    for skill_name in row_skills:
        if skill_name not in known_skills and skill_name not in external_skills:
            problems.append(
                f"unknown skill '{skill_name}' in test_matrix; add it to manifest.yaml "
                "or the explicit external-skill allowlist"
            )
    if row_skills and row_skills[0] != "anti-ai-slop-frontend":
        problems.append(f"frontend router must be first for prompt: {prompt}")

    hard_coded_layout = expected_layout_contract.get(prompt, "<missing>")
    if hard_coded_layout == "<missing>":
        problems.append(f"unexpected prompt missing from hard-coded expectations: {prompt}")
    elif layout_contract is not hard_coded_layout:
        problems.append(f"layout_contract expectation drift for prompt: {prompt}")
    if layout_contract is not None:
        has_layout_skill = "ux-layout-architect" in row_skills
        if has_layout_skill is not layout_contract:
            problems.append(f"layout skill/flag mismatch for prompt: {prompt}")
    if level == "N2" and layout_contract is not True:
        problems.append(f"N2 must require a layout contract: {prompt}")
    if level == "N0" and layout_contract is not False:
        problems.append(f"N0 must not require a layout contract: {prompt}")
    if level == "N-skip":
        if layout_contract is not False:
            problems.append(f"N-skip must not require a layout contract: {prompt}")
        if chain_skills_forbidden_after_skip & set(row_skills):
            problems.append(f"N-skip must exit the chain after the router: {prompt}")
    if level == "N0" and ({"design-critic", "design-qa"} & set(row_skills)):
        problems.append(f"N0 must not run design-critic or design-qa: {prompt}")

missing_prompts = sorted(set(expected_layout_contract) - observed_prompts)
if missing_prompts:
    problems.append(f"missing hard-coded test prompts: {', '.join(missing_prompts)}")

print("")
if problems:
    print(f"test-frontend-routing: {len(problems)} problem(s)")
    for problem in problems:
        print(f"  - {problem}")
    sys.exit(1)

print(
    "test-frontend-routing: manifest, flows, references, and "
    f"{len(rows)} prompt expectations are internally consistent (static check only)"
)
PYEOF
