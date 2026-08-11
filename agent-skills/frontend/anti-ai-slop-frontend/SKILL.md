---
name: anti-ai-slop-frontend
description: Use for ANY frontend, UI, UX visual, design system, CSS, layout, typography, color, responsiveness, animation, component, or page work. Mandatory router — classify the task and hand off to the right skill before writing any code. Triggers include frontend, UI, interface, tela, página, componente, layout, CSS, Tailwind, tema, design system, Storybook, responsivo, tipografia, paleta, dashboard, formulário, tabela, card, modal, redesign, "deixar mais premium", "modernizar interface".
---

# anti-ai-slop-frontend

Mandatory entry point for any frontend-touching task. Does not implement.
Classifies the task, loads the CluOS profile when relevant, and starts the
correct skill chain.

## Load first

- `../../shared/design-archetypes.yaml` — the archetype library
- `../../shared/palette-policy.md` — palette registry and rules
- `../../shared/routing-matrix.yaml` — level classification reference
- If working inside a CluOS repo: `../../profiles/cluos/*` (product,
  brand, surface inventory, decisions)

## Classify depth first

| Level | Examples | Flow |
|---|---|---|
| **N0** — mudança microscópica | correção de texto, alinhamento, bug de estado isolado, foco, um token existente | `anti-ai-slop-frontend → frontend-craftsman → design-critic (reduzido) → verificação visual → verification-before-completion` |
| **N1** — componente ou seção | novo componente, tabela, modal, formulário, navegação parcial | `+ get-context`, `design-critic` completo, `design-qa`. Use `design-gallery` só se houver mais de uma direção visual relevante. |
| **N2** — tela, fluxo ou redesign | dashboard, onboarding, área administrativa, redesign de tela inteira | `+ design-gallery` obrigatório `+ seleção humana` obrigatória antes de implementar |
| **N3** — design system ou múltiplas superfícies | refatoração do DS, mudança de paleta global, novo primitive compartilhado | `+ design-system-refactor-director` conduz, `writing-plans` antes de qualquer código |

Full test matrix: `../../shared/routing-matrix.yaml`.

## Hard gates

- Não iniciar um redesign relevante (N2+) a partir de um texto vago. Peça
  contexto primeiro (`get-context`) se a superfície-alvo não estiver clara.
- Não codificar uma direção substancial sem estilo **e** paleta escolhidos.
  Em CluOS isso é literal: consulte `design-archetypes.yaml` e
  `palette-policy.md`, apresente as opções relevantes, aguarde a escolha —
  **nunca assuma um default**, mesmo que uma recomendação exista. Isso foi
  decidido explicitamente por Rafael em 2026-08-10
  (`profiles/cluos/design-decisions.yaml`).
- Não substituir comportamento real do produto por uma imagem estática.
- Não declarar conclusão sem abrir o resultado renderizado.
- Não aceitar `build` passando como substituto de inspeção visual.
- Não alterar paleta global sem registrar em
  `profiles/cluos/palette-decisions.yaml`.
- Não criar design genérico por conveniência — nenhuma das saídas do
  `frontend-craftsman` deve reproduzir os padrões banidos em
  `anti-slop-rubric.md`.

## Outputs

Produce or update, adapting paths to the consuming repo:

- `frontend-brief.md` — one-paragraph read of what's being asked, level,
  and which skills will run.
- `frontend-routing-decision.md` — the level classification and why.
- `design-decision.md` — only for N2/N3, records the chosen archetype(s)
  and palette(s) once a human has picked.

## Handoff

N0 → `frontend-craftsman`. N1 → `get-context` then `frontend-craftsman`.
N2/N3 → `design-gallery` (present options from `design-archetypes.yaml` +
`palette-policy.md`, get the human choice, record it) then
`frontend-craftsman`. N3 additionally routes through
`design-system-refactor-director` first.

Every path ends through `design-critic → design-qa →
verification-before-completion` before the work is considered done.

## Blocking situations

- Ambiguous surface or level: ask one question, don't guess.
- N2/N3 with no style+palette decision recorded: stop, do not implement,
  route to `design-gallery`.
- A prompt implies replacing production behavior with a static mock: stop,
  clarify scope.
