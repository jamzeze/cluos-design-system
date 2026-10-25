# @cluos/design-system

Fonte única da linguagem visual CluOS: tokens, componentes de referência,
logotipos, princípios de UX, padrões de produto e governança para agentes.
Consumido por todos os repositórios CluOS.

> **Contrato ativo: `cluos-v2`** (aprovado em 2026-10-24, versão 1.0.0). Ele
> substitui o `cluos-mms-v1`. Paleta Azigos, 12 matizes para categorias, uma
> única cor de ação (verde tech), Manrope + Instrument Sans + JetBrains Mono,
> raio 4/8 px, sem sombra no produto, WCAG 2.2 AA, dois registros (produto e
> público) sobre os mesmos tokens. O registro de produto está completo; o
> registro público é segunda passada pendente. O legado está arquivado em
> [`docs/legacy/`](docs/legacy/README.md) e não é referência.

## O que existe aqui

- **`tokens/cluos-v2.yaml`** — contrato canônico. Única fonte editável de valores.
- **Exports gerados** (não edite à mão): `tokens/tokens.css`, `fonts.css`,
  `tailwind-preset.js`, `tailwind.css`, `shadcn.css`, `design.json`,
  `tokens.ts`, `tokens.js`, `index.ts` e `AGENT-BRIEF.md`.
- **`cluos.css`** — componentes de referência em CSS puro, sem framework.
- **`DESIGN-preview.html`** — especime renderizado do contrato.
- **`DESIGN.md`** — contrato visual narrativo.
- **`DESIGN-WORKFLOW.md`** — fluxo para mudar o sistema.
- **`PRODUCT-SIMPLICITY-CANON.md`**, **`APPLE-INSPIRED-PRODUCT-UX.md`**,
  **`PRODUCT-PATTERNS.md`** — regras de produto, UX e padrões por tipo de produto.
- **`patterns/`** — componentes, modelos de página, estados, acessibilidade, copy.
- **`examples/`** — exemplos de implementação (CSS, Tailwind, CSS-in-JS, telas).
- **`brand-assets/`** — logotipos CluOS e Azigos em SVG, fontes WOFF2 em `fonts/`.
- **`guides/`** — material-fonte dos logotipos.
- **`docs/cluos-v2/migracao.md`** — migração dos produtos do cluos-mms-v1.
- **`AGENT-BRIEF.md`** — brief portátil para colar no contexto de qualquer agente.

## Instalação

```bash
npm install github:jamzeze/cluos-design-system#v1.0.0
```

A publicação em registro continua manual, pelo workflow congelado
(`.github/workflows/release.yml`, só `workflow_dispatch` com confirmação).

## Uso

Importe uma vez, na raiz da aplicação:

```css
@import "@cluos/design-system/fonts.css";
@import "@cluos/design-system/tokens.css";
@import "@cluos/design-system/cluos.css"; /* componentes de referência, opcional */
```

```html
<html lang="pt-BR" data-cluos-canonical="cluos-v2" data-theme="light" data-density="comfortable">
```

Tema: `data-theme="light" | "dark"`. Densidade: `data-density="comfortable" | "compact"`.

### Tailwind v3

```js
// tailwind.config.js
module.exports = {
  presets: [require("@cluos/design-system/tailwind-preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
};
```

### Tailwind v4

```css
@import "tailwindcss";
@import "@cluos/design-system/tailwind.css";
```

### shadcn/ui

```css
@import "@cluos/design-system/shadcn.css";
```

Tema shadcn em variáveis CSS; o pacote não traz componentes React.

### CSS puro e CSS-in-JS

Use as variáveis `--cluos-*` (por exemplo `var(--cluos-fg)`,
`var(--cluos-action)`, `var(--cluos-status-danger)`). Em TypeScript:
`import tokens from "@cluos/design-system"`.

### Agentes e ferramentas

- `@cluos/design-system/design.json` — tokens no formato W3C Design Tokens.
- `@cluos/design-system/AGENT-BRIEF.md` — brief portátil (valores exatos no
  lugar de adjetivos). Cole inteiro no contexto de Claude, Cursor, ChatGPT ou
  Gemini antes de gerar interface.

Em um repositório consumidor, exponha as regras para o agente:

```bash
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
ln -s node_modules/@cluos/design-system/AGENT-BRIEF.md ./AGENT-BRIEF.md
ln -s node_modules/@cluos/design-system/PRODUCT-SIMPLICITY-CANON.md ./PRODUCT-SIMPLICITY-CANON.md
```

## Atualizando o sistema

1. Edite `tokens/cluos-v2.yaml` (nunca os exports).
2. Regere: `npm run build` (requer Python 3.9+ e PyYAML: `pip install pyyaml`) (exports com `build-tokens.py` e especime com `build-preview.py`).
3. Valide: `npm test` (`build-tokens.py --check`, `build-preview.py --check` e `test-contrast.py`).
4. Sincronize `DESIGN-preview.html`, `DESIGN.md` e os documentos afetados na
   mesma mudança (ordem em `DESIGN-WORKFLOW.md`).
5. Rode `npm pack --dry-run` e abra o especime renderizado.
6. Registre a decisão em `agent-skills/profiles/cluos/*-decisions.yaml`.
7. Atualize `CHANGELOG.md`.
8. Tag e publicação seguem o workflow manual congelado; não publique sem decisão explícita.

## Camada de UX de produto

- [`PRODUCT-SIMPLICITY-CANON.md`](PRODUCT-SIMPLICITY-CANON.md) — reduzir carga
  cognitiva, remover complexidade desnecessária e tornar óbvia a ação principal.
  Toda tela responde: para que serve, qual o próximo passo, qual informação é
  essencial agora, o que pode ser ocultado ou removido, o que pode quebrar.
- [`APPLE-INSPIRED-PRODUCT-UX.md`](APPLE-INSPIRED-PRODUCT-UX.md) — divulgação
  progressiva, uma ação primária por região, teste dos 3 segundos, estados
  dinâmicos definidos, foco acessível.
- [`PRODUCT-PATTERNS.md`](PRODUCT-PATTERNS.md) — padrões por tipo de produto.
- [`patterns/components.md`](patterns/components.md),
  [`page-templates.md`](patterns/page-templates.md),
  [`states.md`](patterns/states.md),
  [`accessibility.md`](patterns/accessibility.md),
  [`content-guidelines.md`](patterns/content-guidelines.md).

## Exemplos

[`examples/`](examples/): `css-setup.md`, `tailwind-setup.md`,
`css-in-js-setup.md` e `examples/apple-inspired-product-ui/` (Next.js +
Tailwind, componentes React, HTML puro, tokens CSS, hub, upload, configurações,
dashboard, estados de erro/vazio/carregando).

## Legado

O `cluos-mms-v1`, as oito variantes de produto (teal, copper, champagne,
oxblood × claro/escuro), o Thermal Nocturne, o preview v0.2.1 e a galeria de
design foram arquivados em [`docs/legacy/`](docs/legacy/README.md) e saíram do
pacote publicado. Os nomes antigos de token seguem como aliases de
compatibilidade até a 2.0.0. O repositório `cluos-design` está aposentado; este
é a única autoridade de design dos sistemas CluOS.
