---
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

<!-- BEGIN CLUOS FRONTEND WORKFLOW -->
# CluOS Frontend Workflow (canonical, revisado 2026-10-25)

Fonte: `cluos-design-system/agent-skills/`. Não edite cópias instaladas. Após
mudar skills ou suporte, rode `cluos-design-system/scripts/sync-agent-skills.sh`;
após mudar este bloco, `cluos-design-system/scripts/sync-global-config.sh`
(Codex) e `cluos-design-system/scripts/sync-claude-rules.sh` (regra por
caminho nos repos).

Para qualquer mudança que altere o que o usuário vê ou opera em uma interface
(aparência, layout, hierarquia, tokens, tipografia, cor, movimento, componente,
tela, fluxo):

- Invoque `anti-ai-slop-frontend` antes de qualquer código. Ele classifica em
  `N-skip`, `N0`, `N1`, `N2` ou `N3` e diz quais skills rodam depois.
- `N-skip` (lógica de domínio, estado ou geometria que só produz um valor
  renderizado diferente) sai da cadeia: implemente sob as regras do repo e
  abra o render. `N0` (aparência de um elemento existente) usa só
  `frontend-craftsman` e o render.
- `N1`+ passa por `ux-layout-architect` quando posicionamento ou hierarquia
  estão em escopo (obrigatório em `N2`, e em `N3` quando telas ou fluxos
  mudam), depois `frontend-craftsman`, e fecha com `design-critic →
  design-qa → verification-before-completion`, com os dois revisores rodando
  como subagentes de contexto limpo quando instalados (`~/.claude/agents/`).
  `N3` é conduzido por `design-system-refactor-director`.
- Direção visual: `cluos-v2` (decisão de Rafael, 2026-10-24; substitui
  `cluos-mms-v1`): claro por padrão com escuro de primeira classe, Manrope +
  Instrument Sans (Orbitron só como destaque), paleta Azigos (azul profundo,
  azul médio, verde tech como ação), raio 4/8 px, sem sombra. Valores em
  `tokens/cluos-v2.yaml` e `AGENT-BRIEF.md`; componentes de referência em
  `cluos.css`. `design-gallery` só para comparação registrada ou opt-out
  explícito; opt-out exige registro em `design-decision.md` da tarefa e em
  `palette-decisions.yaml` do profile. Página pública: checklist e teste cego
  de `anti-slop-rubric.md`.
- Artefatos da tarefa (`routing.md`, `ux-layout-contract.md`,
  `design-decision.md`, `design-critic.md`, `design-qa.md`) ficam em
  `docs/frontend-routing/<YYYY-MM-DD>-<slug>/` do repo consumidor.
- `impeccable`, `ui-ux-pro-max`, `epic-design`, `design-taste-frontend`,
  `building-nextjs-landing-pages` e `design-converting-experiences` são
  invocação manual. O roteador decide se e quando chamá-las; nenhuma dispara
  sozinha por vocabulário de frontend.
- Não declare conclusão porque o `build` passou: abra o resultado renderizado.
- Padrões banidos: `agent-skills/shared/anti-slop-rubric.md`.
<!-- END CLUOS FRONTEND WORKFLOW -->
