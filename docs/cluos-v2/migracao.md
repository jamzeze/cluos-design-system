# Migração cluos-mms-v1 para cluos-v2

Status: guia de referência · pacote 1.0.0 · 2026-10-24
Escopo: este documento descreve a migração. **A migração dos produtos é uma onda
separada** e não faz parte da entrega do pacote (decisão 27). Nenhum produto foi
alterado.

Fonte dos nomes: seção "Compatibilidade cluos-mms-v1" de `tokens/tokens.css` e
`compat.aliases` de `tokens/cluos-v2.yaml`. Os aliases ficam por uma versão e
saem na 2.0.0. Alias existe para o produto não quebrar enquanto migra; não é
licença para escrever código novo com o nome antigo.

## O que muda de sentido

Trocar o nome sem trocar o papel é o erro mais provável. Estes pontos mudam de
significado, não só de nome:

1. **Teal, copper, oxblood e champagne deixam de ser papéis.** Teal era a cor de
   execução e a cor de ação de várias variantes; copper era aviso; oxblood era
   erro e negação; champagne era variante de ação. Agora a ação primária é só o
   verde tech, e os status vêm de `--cluos-status-*`. Os aliases antigos mantêm
   os hex antigos (`--cluos-teal` continua `#16A39A`), então um produto que não
   migra o papel continua teal.
2. **Ação nunca vira estado.** Verde tech não é sucesso, link nem série de
   gráfico. Sucesso é o verde distinto `--cluos-status-success`.
3. **Raio 0 vira 4/8.** O MMS usava raio zero; agora controles têm
   `--cluos-radius-sm` (4 px) e regiões `--cluos-radius-md` (8 px). O visual muda
   em todo componente.
4. **Texto sutil passa de `#A5A5A5` para `#616367`.** `#A5A5A5` mede 2,46:1 sobre
   branco e reprova texto. `--cluos-text-subtle` (alias de `--cluos-fg-3`) agora
   passa AA (6,02:1). `#A5A5A5` fica só em `--cluos-fg-disabled`. Telas do MMS com
   muito texto sutil (356 usos de `text-cluos-text-subtle`) ficam mais escuras.
5. **Sem sombra.** Os tokens `--cluos-shadow-*` existem como `none`. Separação é
   por hairline, espaço e tom.
6. **Gradientes saem.** `--cluos-gradient-*` e `--cluos-bg-brand-hero` mantêm o
   valor antigo como alias; o contrato novo é navy chapado.
7. **`--cluos-text-on-teal` continua branco.** Em botão verde o texto é
   `--cluos-action-fg` (navy). Branco sobre `#C4DB7B` não passa.
8. **Tema escuro de verdade.** Os papéis (`--cluos-color-*`, `--cluos-text-*`)
   são redeclarados dentro de cada escopo de tema; um subtree com
   `data-theme="dark"` resolve certo. O escuro vira navy, não só inversão.
9. **Containers.** Produto é 72rem (`--cluos-container-product`), painel e
   tabela larga é 80rem (`--cluos-container-wide`). Documentos antigos diziam 960 px.

## Tabela de nomes antigos para novos

### Variáveis CSS

| Antigo | Novo | Observação |
|---|---|---|
| `--cluos-teal`, `--cluos-operational-teal`, `--cluos-action-teal` | `--cluos-action` | Se era ação. Se era categoria, use um matiz `--cluos-hue-NN-*` (por exemplo `hue-03`, teal do arco-íris). Se era progresso, `--cluos-progress`. |
| `--cluos-teal-deep`, `--cluos-deep-teal`, `--cluos-action-teal-deep`, `--cluos-operational-active` | `--cluos-action-hover` | Hover de ação. Como cor de texto de link ou ghost, use `--cluos-fg` com sublinhado. |
| `--cluos-teal-soft`, `--cluos-action-teal-soft` | `--cluos-action-soft` | Seleção suave. |
| `--cluos-text-on-teal` | `--cluos-action-fg` | Texto sobre a ação (navy). |
| `--cluos-copper`, `--cluos-status-warn` | `--cluos-status-warning` | Mais `-bg` e `-text`. Copper como ação: remover. |
| `--cluos-status-warn-bg`, `--cluos-status-warn-text` | `--cluos-status-warning-bg`, `--cluos-status-warning-text` | |
| `--cluos-oxblood`, `--cluos-status-error` | `--cluos-status-danger` | Mais `-bg` e `-text`. Oxblood como ação: remover. |
| `--cluos-status-error-bg`, `--cluos-status-error-text` | `--cluos-status-danger-bg`, `--cluos-status-danger-text` | |
| `--cluos-info` | `--cluos-status-info` | Era `#3E6E82`; o novo é azul da rampa. |
| `--cluos-action-copper*`, `--cluos-action-oxblood*`, `--cluos-action-champagne*` | `--cluos-action` | Variantes de ação por produto saem. Identificação de produto: `--cluos-product-<id>`. |
| `--cluos-champagne`, `--cluos-silver` | sem papel direto | Escolha o papel: superfície muda `--cluos-bg-muted`, linha `--cluos-line-2`, ou um matiz `--cluos-hue-NN-*`. |
| `--cluos-black` | `--cluos-fg` | Preto `#1D1D1B` sai; texto é azul profundo. |
| `--cluos-navy` | `--cluos-deep-navy` | Mesmo valor `#010D28`; o alias continua. |
| `--cluos-radius-lg`, `-xl`, `-2xl` | `--cluos-radius-md` | 8 px. |
| `--cluos-radius-full` | `--cluos-radius-pill` | Só CTA público e chips de filtro. |
| `--cluos-shadow-xs` a `-lg` | remover | Valem `none`. |
| `--cluos-dur-fast`, `-base`, `-slow` | `--cluos-motion-fast`, `-base`, `-slow` | Mesmos tempos. |
| `--cluos-gradient-primary`, `-soft`, `-mono`, `--cluos-bg-brand-hero` | `--cluos-deep-navy` | Campo navy chapado. |
| `--cluos-text-subtle` | `--cluos-text-subtle` (valor novo) | `#A5A5A5` para `#616367`. Desabilitado: `--cluos-text-disabled`. |
| `--cluos-ring-focus` | `--cluos-ring-focus` (valor novo) | Anel duplo, verde tech dentro, navy fora. |
| `--cluos-color-signal` | `--cluos-tech-green` | O alias aponta para o verde tech. |
| `--cluos-color-*` (`fg-primary`, `bg-canvas`, `border-default` etc.) | sem mudança de nome | Continuam, agora por escopo de tema. Para código novo prefira `--cluos-fg`, `--cluos-bg`, `--cluos-line`. |
| `--cluos-tech-green`, `--cluos-medium-blue`, `--cluos-deep-navy`, `--cluos-neutral-100`, `--cluos-neutral-500`, `--cluos-white` | sem mudança | Marca preservada (azigos usa vários destes). |

### Atributos de runtime

| Antigo | Novo |
|---|---|
| `data-cluos-style="MMS"` | remover |
| `data-cluos-canonical="cluos-mms-v1"` | `data-cluos-canonical="cluos-v2"` |
| `data-cluos-palette="..."`, classes `pal-*`, `data-theme="teal|copper|champagne|oxblood"` | remover; produto não escolhe paleta global |
| `data-appearance="dark"`, classe `.dark` | `data-theme="dark"` (o CSS ainda reconhece `data-appearance="dark"` e `.dark` como alias de transição) |
| (novo) | `data-theme="light"` (padrão) e `data-density="comfortable|compact"` |

### Classes Tailwind

O preset v3 e o tema v4 não geram mais utilitários de teal, copper, oxblood,
navy nem de gradiente. Equivalências:

| Antigo | Novo |
|---|---|
| `text-cluos-warn`, `bg-cluos-warn-bg` | `text-cluos-warning-text`, `bg-cluos-warning-bg` |
| `text-cluos-error`, `border-cluos-error`, `text-cluos-oxblood` | `text-cluos-danger-text`, `border-cluos-danger` |
| `text-cluos-action-deep`, `bg-cluos-signal-deep` | `bg-cluos-action-hover` |
| `text-cluos-navy` | `text-cluos-fg` |
| `rounded-cluos-lg`, `-xl` | `rounded-cluos-md` (`rounded-cluos-lg` segue como alias no preset v3) |
| `bg-cluos-gradient-*`, `bg-cluos-brand-hero` | `bg-cluos-deep-navy` |
| `shadow-cluos-*` | remover; `shadow-cluos-ring` é só o anel de foco |
| `text-cluos-text`, `-text-muted`, `-text-subtle`, `border-cluos-border`, `bg-cluos-bg`, `-bg-muted`, `-bg-subtle`, `-action`, `-action-soft`, `-deep-navy`, `-medium-blue`, `-tech-green` | sem mudança (existem no preset) |
| `bg-cluos-surface-muted` (MMS), `text-cluos-accent` (MMS) | classes que nunca existiram; decidir o papel na migração, não aliasar em silêncio |

## Consumidores conhecidos

Levantamento de 2026-10-24 (leitura apenas). Os demais repositórios com cópia de
tokens (estrut, medframe, neuro-est, sci-os, scireg, suporte) **não foram
analisados** e devem ser levantados antes de sua migração.

### MMS

- `src/styles/cluos-tokens.css`: cópia de fallback de 223 linhas do `tokens.css`,
  importada por `globals.css`. Ainda com `--cluos-text-subtle` em `#A5A5A5`.
- `src/styles/cluos-fonts.css`: `@font-face` de Manrope e Instrument Sans.
- `tailwind.config.ts`: mapeia utilitários `cluos-*` a variáveis, sem usar o preset.
- Uso real mais pesado: `text-cluos-text`, `text-cluos-text-muted`,
  `border-cluos-border`, `text-cluos-text-subtle`, `rounded-cluos-md`
  (inclusive via `@apply` em `.cluos-btn-primary`, `.cluos-btn-ghost` e
  `.cluos-input`), `bg-cluos-bg-muted`, `border-cluos-action`.
- Atributos fixos: `data-cluos-style="MMS"`, `data-cluos-canonical="cluos-mms-v1"`
  (há asserção em `AppShell.test.tsx`), `data-appearance="dark"`,
  `.cluos-mms-surface`.

### azigos

- `ui/src/app/globals.css`: usa `--cluos-radius-md`, `--cluos-color-fg-primary`,
  `--cluos-font-sans`, `--cluos-font-display`, `--cluos-neutral-100`; variáveis
  shadcn em triplets HSL dentro de `.cluos-mms-surface`, com `--accent` em teal e
  `--destructive` em oxblood.
- `components/laudos/varizes/VarizesMapEditor.tsx`: `--cluos-medium-blue` e
  `--cluos-tech-green` com fallback hardcoded `#6a8b21` (diferente de `#C4DB7B`).
- `ui/src/styles/cluos-mms-tokens.scoped.f58b7b8.css`: cópia do `tokens.css` com
  todo seletor prefixado em `.cluos-mms-surface[data-cluos-style=MMS]`. Cópias
  idênticas existem em worktrees auxiliares.
- Tailwind v4 sem `tailwind.config`; não depende do pacote.
- Carrega Manrope e Instrument Sans de `/cluos/fonts/` e Just Sans de
  `/azigos/fonts`. Just Sans não é adotada pelo CluOS (decisão 3).

## Passos por produto

Vale para cada produto, na ordem. Cada produto migra em seu próprio PR.

1. **Instalar.** `npm install github:jamzeze/cluos-design-system#v1.0.0`. A
   publicação do pacote continua manual pelo workflow congelado.
2. **Importar na raiz**, nesta ordem:
   ```css
   @import "@cluos/design-system/fonts.css";
   @import "@cluos/design-system/tokens.css";
   @import "@cluos/design-system/cluos.css"; /* opcional */
   ```
   Tailwind v3: `presets: [require("@cluos/design-system/tailwind-preset")]`.
   Tailwind v4: `@import "@cluos/design-system/tailwind.css";`. shadcn:
   `@import "@cluos/design-system/shadcn.css";` no lugar dos triplets HSL locais.
3. **Remover a cópia local de tokens** (`cluos-tokens.css`, o adaptador escopado
   do azigos, o `cluos-fonts.css` e os arquivos de fonte duplicados). Fork local de
   token é proibido pelo contrato. O `fonts.css` do pacote já aponta para os
   WOFF2 de `brand-assets/fonts/`; mantenha os nomes de arquivo se o produto servir
   as fontes de um caminho próprio.
4. **Trocar os atributos.** Troque `data-cluos-style="MMS"` e
   `data-cluos-canonical="cluos-mms-v1"` por `data-cluos-canonical="cluos-v2"`
   e adicione `data-theme="light"` (ou `"dark"`). Troque `data-appearance="dark"`
   por `data-theme="dark"`. Atualize asserções de teste que leem o identificador antigo.
5. **Migrar os papéis**, não só os nomes, usando a tabela acima: ação para
   `--cluos-action`, status para `--cluos-status-*`, categorias para
   `--cluos-hue-NN-*`, identidade do produto para `--cluos-product-<id>`.
6. **Remover sombras, gradientes e raio zero.** Aplique 4 px nos controles e 8 px
   nas regiões; confirme que nenhum `@apply rounded-*` quebrou.
7. **Revisar contraste.** Texto sutil mudou de valor; reabra telas densas nos dois
   temas. Status sempre com ícone e texto.
8. **Remover os fallbacks hardcoded** (como `#6a8b21`) e usar só `var(--cluos-*)`.
9. **Validar.** Build, testes, render em 320, 375, 768 e 1440 px nos dois temas,
   sem rolagem horizontal da página. Em seguida, `grep` por `--cluos-teal`,
   `copper`, `oxblood`, `champagne`, `data-cluos-style` e `pal-` deve voltar vazio.
10. **Registrar** a migração no `design-decisions.yaml` do profile do produto.

## Riscos conhecidos para a onda de migração

- O `tokens.css` v2 emite os tokens em `:root` e `[data-theme]`. Ele **não**
  emite o seletor `[data-cluos-style=MMS]`. Regerar o adaptador escopado do azigos
  (`.cluos-mms-surface[...]`) com o gerador antigo deixa de funcionar; o adaptador
  deve ser descartado ou reescrito sobre `[data-theme]`.
- Quem não migrar o papel continua teal, copper e oxblood pelos aliases até a
  2.0.0. Remover os aliases antes disso exige migrar todos os produtos.
- Classes mortas do MMS (`bg-cluos-surface-muted`, 121 usos) hoje não pintam
  nada. Criar um alias faria 121 elementos ganharem fundo; decida elemento a elemento.
- Cópias de tokens em worktrees e repositórios auxiliares continuam com o
  contrato antigo até serem migradas ou descartadas.
