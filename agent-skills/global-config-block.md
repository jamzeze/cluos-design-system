<!-- BEGIN CLUOS FRONTEND WORKFLOW -->
# CluOS Frontend Workflow (canonical, installed 2026-08-17)

Source of truth: `cluos-design-system/agent-skills/`. Do not hand-edit installed
copies divergently. After changing skills/support, run
`cluos-design-system/scripts/sync-agent-skills.sh`; after changing this block,
also run `cluos-design-system/scripts/sync-global-config.sh`.

For any change touching frontend, UI, UX visual design, design system, CSS,
layout, typography, color, responsiveness, animation, components, or pages:

- Invoke `anti-ai-slop-frontend` before writing any code. It classifies the
  task (N0-N3) and starts the correct skill chain.
- Para telas, fluxos, dashboards, tabelas/formulários complexos, workbenches,
  ou qualquer pedido sobre posicionamento/hierarquia de elementos, use
  `ux-layout-architect` para gerar `ux-layout-contract.md` antes de escolher
  direção visual ou implementar. Em N2, e em N3 quando telas/fluxos mudarem,
  isso é obrigatório antes de `design-gallery`.
- `ux-layout-architect` owns task-to-placement and the approved layout contract.
  Use UI UX Pro Max only for targeted pattern lookup; use Impeccable Shape
  upstream for unresolved product scope and Impeccable/Layout/Critic after the
  structure exists. Downstream visual/code work must preserve the contract.
- Tela, fluxo, ou redesign (N2) e refatoração de design system (N3) herdam
  `cluos-mms-v1` por padrão: Swiss Ledger claro, Manrope + Instrument Sans,
  deep navy/medium blue e tech green. `design-gallery` passa a ser ferramenta
  de comparação ou de opt-out explícito; a biblioteca legada não governa novos
  produtos (decisão de Rafael, 2026-08-30).
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
