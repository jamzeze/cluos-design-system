# DESIGN.md — CluOS v2

Status: canônico · `cluos-v2` · aprovado por Rafael · 2026-10-24
Substitui: `cluos-mms-v1` (2026-08-30), agora entrada histórica.

Este documento é o contrato visual de todos os produtos CluOS. Quieto por
padrão, preciso onde importa: hierarquia vem de tipografia, peso e espaço; cor
comunica estrutura ou estado, nunca decoração. Produtos novos herdam este
contrato por padrão. Não há hierarquia entre marcas: a Azigos é a referência
de cor e todas as suas cores entram no CluOS.

## Ordem de fontes

1. `tokens/cluos-v2.yaml` — contrato canônico, única fonte editável de valores.
2. `tokens/tokens.css`, `fonts.css`, `tailwind-preset.js`, `tailwind.css`,
   `shadcn.css`, `design.json`, `tokens.ts`/`tokens.js`/`index.ts` e
   `AGENT-BRIEF.md` — exports gerados por `python3 scripts/build-tokens.py`.
   Nunca edite à mão.
3. `DESIGN-preview.html` — especime renderizado.
4. Este documento — regras narrativas e orientação de uso.

Se duas camadas divergirem, vale a de número menor. Identidades de conteúdo de
terceiros dentro de um produto (por exemplo, a marca de um cliente) ficam
isoladas do chrome CluOS.

## Dois registros, mesmos tokens

| | Produto | Público |
|---|---|---|
| Canvas | `--cluos-bg` branco; faixas em `--cluos-bg-subtle` | branco ou off-white `--cluos-off-white` |
| Campos | superfícies claras com hairline | navy `--cluos-deep-navy` e verde `--cluos-tech-green` |
| Raio | 4 px em controles, 8 px em regiões | 4/8 px mais pílula (`--cluos-radius-pill`) nos botões |
| Sombra | nenhuma | nenhuma |
| Densidade | operacional, `comfortable` por padrão | editorial |
| Tipografia | Manrope + Instrument Sans | idem, display fluido; Orbitron só como destaque |

O registro de produto está completo neste contrato. O registro público é uma
segunda passada pendente: aguarda referências visuais de Rafael. Até lá, não
invente templates públicos; use apenas as regras já fixadas aqui (campos navy e
verde, recorte do símbolo uma vez por composição, CTA em pílula, fotografia
real fria, movimento limitado, ver "Movimento").

## Identidade

Marca CluOS: o desenho do logotipo é preservado; só existem variantes mono em
navy, branco, preto e verde tech. Variantes em gradiente e teal saíram do
pacote. Use os SVGs de `brand-assets/`; nunca redesenhe a marca.

## Cor

### Marca (referência Azigos, Brand Book NDesigns 03/2026)

| Nome | Token | Valor | Papel |
|---|---|---|---|
| Azul profundo | `--cluos-deep-navy` | `#010D28` | texto, campos densos, autoridade |
| Azul médio | `--cluos-medium-blue` | `#132952` | estrutura, navegação, ação secundária, progresso |
| Verde tech | `--cluos-tech-green` | `#C4DB7B` | ação primária, seleção |
| Branco | `--cluos-white` | `#FFFFFF` | canvas de produto, superfícies |
| Cinza claro | `--cluos-neutral-100` | `#EAEAEA` | hairlines, superfície muda |
| Cinza médio | `--cluos-neutral-500` | `#A5A5A5` | desabilitado, decorativo |
| Off-white | `--cluos-off-white` | `#F4EFED` | canvas alternativo do registro público |

Neutros frios `--cluos-neutral-50` a `-800` derivam do matiz do azul médio.
Componentes consomem só os papéis semânticos abaixo, nunca o hex.

### Papéis semânticos

| Papel | Variável | Claro | Escuro |
|---|---|---|---|
| Canvas | `--cluos-bg` | `#FFFFFF` | `#010D28` |
| Faixa, cabeçalho de tabela | `--cluos-bg-subtle` | `#F4F6F8` | `#081634` |
| Superfície muda | `--cluos-bg-muted` | `#EAEAEA` | `#132952` |
| Superfície | `--cluos-surface` | `#FFFFFF` | `#081634` |
| Texto | `--cluos-fg` | `#010D28` | `#F7F8F5` |
| Texto secundário | `--cluos-fg-2` | `#132952` | `#C8CFDD` |
| Texto sutil | `--cluos-fg-3` | `#616367` | `#8E97AA` |
| Desabilitado | `--cluos-fg-disabled` | `#A5A5A5` | `#5C667A` |
| Hairline | `--cluos-line` | `#EAEAEA` | `rgba(255, 255, 255, 0.14)` |
| Borda de campo | `--cluos-line-2` | `#DCDEE2` | `rgba(255, 255, 255, 0.22)` |
| Borda forte, aba ativa | `--cluos-line-strong` | `#132952` | `#C8CFDD` |
| Ação primária | `--cluos-action` (texto `--cluos-action-fg`) | `#C4DB7B` (`#010D28`) | `#C4DB7B` (`#010D28`) |
| Hover da ação | `--cluos-action-hover` | `#A6C05D` | `#A6C05D` |
| Seleção suave | `--cluos-action-soft` | `rgba(196, 219, 123, 0.18)` | `rgba(196, 219, 123, 0.11)` |
| Progresso | `--cluos-progress` | `#132952` | `#6591E1` |
| Anel de foco | `--cluos-ring-focus` | `0 0 0 2px #C4DB7B, 0 0 0 4px #010D28` | `0 0 0 2px #C4DB7B, 0 0 0 4px #F7F8F5` |

Aliases de leitura (`--cluos-text`, `--cluos-text-muted`, `--cluos-text-subtle`,
`--cluos-text-disabled`, `--cluos-border`, `--cluos-color-*`) apontam para os
papéis acima e são redeclarados em cada escopo de tema; um subtree com
`data-theme="dark"` resolve corretamente.

Regras de uso:

- Uma ação primária (verde tech, texto navy) por região. Ação secundária usa
  azul médio; link em texto corrido usa a cor do texto com sublinhado.
- A cor de ação não vaza para estado: verde tech nunca representa sucesso,
  link, série de gráfico nem fundo decorativo.
- Texto sutil (`--cluos-fg-3`) é leitura informativa com contraste AA.
  `--cluos-fg-disabled` é só para controle desabilitado e nunca para texto que
  o usuário precise ler.

### Status

Sempre ícone mais texto, nunca cor sozinha. Três variáveis por status:
`--cluos-status-<nome>` (linha, ícone, marca), `-bg` (fundo) e `-text`
(texto). Nomes: `success`, `warning`, `danger`, `info`. Os aliases `warn` e
`error` existem por compatibilidade.

| Status | Claro fundo · linha · texto | Escuro fundo · linha · texto |
|---|---|---|
| success | `#C3F5DE` · `#007C59` · `#005C41` | `#0B3C2B` · `#22B988` · `#8FE6C1` |
| warning | `#FFE3BE` · `#8D5E00` · `#694500` | `#442E09` · `#D0901E` · `#F8C885` |
| danger | `#FFDFE0` · `#AE3B4C` · `#7E2E39` | `#4D2529` · `#E87782` · `#FFBDC1` |
| info | `#C9EFFF` · `#007493` · `#00566E` | `#01394A` · `#00AFDC` · `#8BDEFF` |

### Arco-íris: 12 matizes

`--cluos-hue-01` a `--cluos-hue-12`, cada um com `-fill`, `-line` e `-text`, em
claro e escuro, calculados em OKLCH. `hue-01` está fixado no verde tech (120°)
e `hue-06` no azul médio (262°). Valores completos em `tokens/tokens.css` e no
`AGENT-BRIEF.md`.

- Permitido: categorias de dados, etiquetas, calendário, avatares, ilustração,
  identificação de produto.
- Proibido: ação primária, status, navegação.
- Gráficos: `--cluos-chart-1` a `--cluos-chart-8`, nessa ordem, sem reciclar. A
  nona série vira "Outros". Quando a série é produto, cada barra usa o matiz do
  produto (`--cluos-product-<id>`, `-fill`, `-text`).
- Identidade por produto: um matiz, só em chrome (etiqueta no hub, tile do
  favicon, ponto em tabela, estado vazio). Mapa: azigos `hue-05`, crm `hue-11`,
  sci `hue-07`, b3 `hue-10`, medframe `hue-03`, loteca `hue-12`, did `hue-08`,
  aeo `hue-01`.

### Modo escuro

Primeira classe: todo token tem par claro e escuro, com navy como campo. O
produto abre claro por padrão; escuro por preferência do usuário ou decisão do
produto. Elevação no escuro é por tom (`--cluos-surface` sobre `--cluos-bg`),
não por sombra.

### Descontinuados

Teal, copper, oxblood e champagne deixam de ser papéis de marca e de status.
Seus nomes antigos permanecem como aliases de compatibilidade até a 2.0.0
(seção de compatibilidade de `tokens/tokens.css`) e não podem ser usados em
código novo. Ver `docs/cluos-v2/migracao.md`.

## Tipografia

| Família | Variável | Uso |
|---|---|---|
| Manrope | `--cluos-font-display` | lockup, títulos, nomes de produto, métricas |
| Instrument Sans | `--cluos-font-sans` (`--cluos-font-data`) | navegação, corpo, rótulos, tabelas, controles, dados |
| JetBrains Mono | `--cluos-font-mono` | código, hashes, versões, horários ISO, identificadores técnicos |
| Orbitron | `--cluos-font-accent` | destaque, ver abaixo |

Fontes embarcadas em `brand-assets/fonts/` (WOFF2 variáveis, OFL) e declaradas
em `fonts.css`. Nunca CDN em tempo de execução.

Orbitron é fonte de destaque, só para: hero público, número de destaque em
relatório, splash ou login e peças de evento. Uma palavra-chave ou um número
por composição, de 32 a 120 px, nunca abaixo de 24 px; nunca em texto corrido,
botões, rótulos, navegação, tabelas ou formulários; não substitui o lockup. É a
única exceção à regra de no máximo duas famílias por tela.

Papéis tipográficos (variáveis `--cluos-type-<papel>-size|line|tracking|weight`):

| Papel | Família | Tamanho | Entrelinha | Tracking | Peso |
|---|---|---|---|---|---|
| display-xl | Manrope | clamp(40px, 5vw, 72px) | 1.05 | -0.02em | 300 |
| display-lg | Manrope | 40px | 1.1 | -0.02em | 300 |
| heading-md | Manrope | 28px | 1.2 | -0.01em | 400 |
| heading-sm | Manrope | 22px | 1.25 | -0.01em | 400 |
| metric | Manrope | 40px | 1.0 | -0.02em | 650 |
| title | Instrument Sans | 17px | 1.4 | 0 | 550 |
| body | Instrument Sans | 15px | 1.6 | 0 | 400 |
| body-sm | Instrument Sans | 13px | 1.5 | 0 | 400 |
| label | Instrument Sans | 11px | 1.2 | 0.12em | 500 |
| mono | JetBrains Mono | 13px | 1.5 | 0 | 400 |

Regras: peso faz hierarquia antes do tamanho; 650 só na palavra ou no valor que
importa; nunca 700+ em produto. Tracking negativo cresce com o tamanho; caixa
alta só em rótulos de 11 px com +0,12em. Colunas numéricas à direita,
tabulares, em Instrument Sans. Medida de leitura de 45 a 75 caracteres.
Display fluido (`clamp()`) apenas no registro público.

## Espaço, geometria e layout

- Espaço: base 4 px, `--cluos-space-0` a `--cluos-space-24` (N × 4 px), sem
  buracos na escala. Semânticos: `--cluos-inset-sm|md|lg` (12/16/24),
  `--cluos-stack-xs|sm|md|lg|xl` (4/8/16/24/40), `--cluos-gap-control` (8),
  `--cluos-gap-grid` (24). Seções públicas: 96 a 160 px.
- Raio: `--cluos-radius-sm` 4 px (controles, chips, etiquetas),
  `--cluos-radius-md` 8 px (regiões, diálogos, menus), `--cluos-radius-pill`
  (CTA público e chips de filtro; no produto, só formas funcionais: trilho do
  switch, ponto de produto, contador e barra de progresso).
- Sem sombra no produto. Ordem de separação: agrupamento, alinhamento,
  tipografia, espaço, hairline, superfície, borda.
- Containers: `--cluos-container-wide` 80rem (painéis, tabelas largas,
  cabeçalho do produto), `--cluos-container-product` 72rem (detalhe,
  formulário, configurações), `--cluos-container-docs` 48rem,
  `--cluos-container-prose` 42rem. Margem mínima de página 16 px.
- Breakpoints: 640, 768, 1024, 1280, 1536 px (`--cluos-breakpoint-*`).
- Densidade: `data-density="comfortable"` (padrão: linha 44 px, célula 12 px,
  fonte 14 px) ou `"compact"` (36 px, 8 px, 13 px).
- Alvo de toque mínimo: 40 px (`--cluos-touch-target-min`).
- Ícones: Lucide, traço 1,5, tamanhos 16, 20 e 24 px.
- Estados vazios tipográficos, com no máximo um recorte do símbolo em neutro.
  Sem biblioteca de ilustração.

## Movimento

Feedback, não decoração. Durações: 180 ms hover, 120 ms press, 600 ms entrada
de estado, 1200 ms desenho de dados (`--cluos-motion-*`); curvas
`--cluos-ease-out` e `--cluos-ease-in-out`. `prefers-reduced-motion` mostra o
resultado final imediato. Gráficos desenham ao atualizar de forma explícita,
sem autoplay nem loop.

Registro público, permitido: uma entrada por seção (opacidade + 8 px,
300–600 ms, sem vínculo com rolagem), desenho progressivo de dados, hover e
foco. Proibido: ScrollSmoother ou sequestro de rolagem, pinning, rolagem
horizontal falsa, parallax, revelação caractere a caractere, máscara clip-path
a partir do centro, máscara de hero que cresce com a rolagem, tilt reativo ao
cursor, áudio ambiente. Navegação que some ao rolar para baixo e volta ao subir
é permitida.

## Acessibilidade (WCAG 2.2 AA)

- Texto (`--cluos-fg`, `-fg-2`, `-fg-3`) sobre canvas, faixa e superfície:
  4,5:1 ou mais nos dois modos; texto e linha de status e de matiz validados
  em `scripts/test-contrast.py` (150 pares, 0 falhas).
- Anel de foco: verde tech interno mais navy externo (claro) ou off-white
  externo (escuro); o anel externo passa 3:1 contra o canvas.
- Status nunca só por cor: ícone e texto. Alvo de toque mínimo 40 px.
- Tabela em região rotulada e focável, ver `PRODUCT-PATTERNS.md`.
- Tabela de contraste e regras completas em `patterns/accessibility.md`.

## Proibido

- Gradientes decorativos, glassmorphism, neon, sombras em cartões, cartão
  dentro de cartão, bento grid sem hierarquia real de conteúdo.
- Verde tech em status, link ou gráfico; dois botões primários lado a lado.
- Texto informativo em `--cluos-fg-disabled`; placeholder como rótulo; estado
  só por cor.
- Tilt 3D, parallax, ScrollSmoother, revelação letra a letra.
- Bibliotecas de efeito (Aceternity UI, React Bits). Radix e shadcn/ui são
  permitidos.
- Clonar pixel a pixel ou raspar sites de terceiros; ilustração figurativa
  genérica; superlativos e percentuais sem fonte.

## API de runtime

```html
<html lang="pt-BR" data-cluos-canonical="cluos-v2" data-theme="light" data-density="comfortable">
```

- `data-cluos-canonical="cluos-v2"` — identifica o contrato.
- `data-theme="light" | "dark"` — tema.
- `data-density="comfortable" | "compact"` — densidade.

Os atributos `data-cluos-style`, `data-cluos-palette` e `data-appearance` do
cluos-mms-v1 foram descontinuados. Forks locais de tokens e paletas globais
não registradas são proibidos. Produtos futuros herdam este contrato por
padrão.
