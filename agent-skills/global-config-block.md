<!-- BEGIN CLUOS FRONTEND WORKFLOW -->
# CluOS Frontend Workflow (canonical, installed 2026-08-10)

Source of truth: `cluos-design-system/agent-skills/` (this block is
generated from it — do not hand-edit divergently; re-run
`cluos-design-system/scripts/sync-agent-skills.sh` after changing the
source, which also re-syncs the skill files themselves).

For any change touching frontend, UI, UX visual design, design system, CSS,
layout, typography, color, responsiveness, animation, components, or pages:

- Invoke `anti-ai-slop-frontend` before writing any code. It classifies the
  task (N0-N3) and starts the correct skill chain.
- Tela, fluxo, ou redesign (N2) e refatoração de design system (N3) exigem
  contexto, escolha explícita de estilo, e escolha explícita de paleta antes
  da implementação — via `design-gallery`. CluOS mantém seis arquétipos
  aprovados como biblioteca reutilizável (`agent-skills/shared/design-archetypes.yaml`)
  e sete paletas (`agent-skills/shared/palette-policy.md`); o estilo é
  escolhido a cada tarefa, não fixado (decisão de Rafael, 2026-08-10).
- Refatorações sistêmicas (N3) exigem `design-system-refactor-director`.
- A implementação usa `frontend-craftsman`.
- Antes do handoff, execute `design-critic`, `design-qa`, e
  `verification-before-completion`.
- Não use padrões genéricos de SaaS como default (ver
  `agent-skills/shared/anti-slop-rubric.md`).
- Não altere paleta ou arquétipo global sem registrar em
  `cluos-design-system/agent-skills/profiles/cluos/design-decisions.yaml` /
  `palette-decisions.yaml`.
- Não declare conclusão apenas porque o código compila — abra o resultado
  renderizado.
<!-- END CLUOS FRONTEND WORKFLOW -->
