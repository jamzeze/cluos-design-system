---
name: anti-ai-slop-frontend
description: Use for ANY frontend, UI, UX visual, design system, CSS, layout, typography, color, responsiveness, animation, component, or page work. Mandatory router — classify the task and hand off to the right skill before writing any code. Triggers include frontend, UI, interface, tela, página, componente, layout, CSS, Tailwind, tema, design system, Storybook, responsivo, tipografia, paleta, dashboard, formulário, tabela, card, modal, redesign, "deixar mais premium", "modernizar interface".
---

# anti-ai-slop-frontend

Mandatory entry point for any frontend-touching task. Does not implement.
Classifies the task, loads the CluOS profile when relevant, and starts the
correct skill chain.

## Load first

Resolve the support roots before reading files:

- Installed client: `../../shared/cluos-design-system` and
  `../../profiles/cluos-design-system/cluos`.
- Canonical source checkout: `../../shared` and `../../profiles/cluos`.
- Use the first complete pair. Stop if either root is missing or mixed across
  layouts.

From the resolved shared root, read `design-archetypes.yaml`,
`palette-policy.md`, and `routing-matrix.yaml`. In a CluOS repo, also read the
resolved profile root (product, brand, surface inventory, and decisions).

## Classify depth first

| Level | Examples | Flow |
|---|---|---|
| **N0** — mudança microscópica | correção de texto, alinhamento, bug de estado isolado, foco, um token existente | `anti-ai-slop-frontend → frontend-craftsman → design-critic (reduzido) → verificação visual → verification-before-completion` |
| **N1** — componente ou seção | novo componente, tabela, modal, formulário, navegação parcial | `+ get-context`; use `ux-layout-architect` se posicionamento/hierarquia estiverem em escopo; `design-critic` completo, `design-qa`. Use `design-gallery` só se houver mais de uma direção visual relevante. |
| **N2** — tela, fluxo ou redesign | dashboard, onboarding, área administrativa, redesign de tela inteira | `+ ux-layout-architect` obrigatório quando houver mudança estrutural; herda `cluos-mms-v1`; `design-gallery` só para comparação/opt-out explícito |
| **N3** — design system ou múltiplas superfícies | refatoração do DS, mudança de paleta global, novo primitive compartilhado | `+ design-system-refactor-director` conduz, `+ ux-layout-architect` quando fluxos/telas mudarem, `writing-plans` antes de qualquer código |

Read the full test matrix from `routing-matrix.yaml` in the resolved shared
root.

## Hard gates

- Não iniciar um redesign relevante (N2+) a partir de um texto vago. Peça
  contexto primeiro (`get-context`) se a superfície-alvo não estiver clara.
- Não codificar uma direção fora de `cluos-mms-v1` sem um opt-out explícito.
  O default é Swiss Ledger claro, Manrope + Instrument Sans, deep
  navy/medium blue e tech green; consulte `design-archetypes.yaml` e
  `palette-policy.md` somente para comparação ou compatibilidade. A decisão
  global foi registrada por Rafael em 2026-08-30.
- Não substituir comportamento real do produto por uma imagem estática.
- Não declarar conclusão sem abrir o resultado renderizado.
- Não aceitar `build` passando como substituto de inspeção visual.
- Não alterar paleta global sem registrar em
  `palette-decisions.yaml` in the resolved profile root.
- Não criar design genérico por conveniência — nenhuma das saídas do
  `frontend-craftsman` deve reproduzir os padrões banidos em
  `anti-slop-rubric.md`.

## Outputs

Produce or update, adapting paths to the consuming repo:

- `frontend-brief.md` — one-paragraph read of what's being asked, level,
  and which skills will run.
- `frontend-routing-decision.md` — the level classification and why.
- `ux-layout-contract.md` — required for N2, for N3 when screens/flows change,
  and for N1 when placement, hierarchy, split panes, forms, tables,
  dashboards, or workflow structure are in scope.
- `design-decision.md` — only for N2/N3, records the chosen archetype(s)
  and palette(s) once a human has picked.

## Handoff

N0 → `frontend-craftsman`. N1 → `get-context`, then
`ux-layout-architect` if placement/hierarchy is part of the task, then
`frontend-craftsman`. N2, and N3 when screens or flows change, →
`ux-layout-architect`, then `frontend-craftsman` using `cluos-mms-v1`.
Add `design-gallery` only for comparison or an explicit legacy opt-out, and
record that decision. N3 additionally routes through
`design-system-refactor-director` first.

Every path ends through `design-critic → design-qa →
verification-before-completion` before the work is considered done.

## Blocking situations

- Ambiguous surface or level: ask one question, don't guess.
- N2/N3 sem contrato `cluos-mms-v1` ou sem registro de opt-out: stop and
  restore the canonical default before implementing.
- N2, or N3 that changes screens/flows, with no `ux-layout-contract.md`:
  stop and run `ux-layout-architect` before visual exploration or
  implementation.
- A prompt implies replacing production behavior with a static mock: stop,
  clarify scope.
