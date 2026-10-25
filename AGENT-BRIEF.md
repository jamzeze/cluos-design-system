<!-- Gerado por scripts/build-tokens.py a partir de tokens/cluos-v2.yaml. Não edite à mão. -->
# CluOS — brief para agentes (cluos-v2)

Cole este arquivo inteiro no contexto de qualquer LLM ou editor (Claude, Cursor,
ChatGPT, Gemini) antes de gerar uma interface CluOS. Ele substitui adjetivos
como "bonito" ou "premium" por valores exatos. Não invente cores, fontes,
raios, sombras ou espaçamentos fora daqui.

## Identidade em uma linha

Quieto por padrão, preciso onde importa. Hierarquia por tipografia, peso e
espaço; cor comunica estrutura ou estado, nunca decoração.

## Como consumir

```css
@import "@cluos/design-system/fonts.css";
@import "@cluos/design-system/tokens.css";
@import "@cluos/design-system/cluos.css"; /* componentes de referência, opcional */
```

Raiz: `<html lang="pt-BR" data-cluos-canonical="cluos-v2" data-theme="light">`.
Escuro: `data-theme="dark"`. Densidade compacta: `data-density="compact"`.
Tailwind v3: preset `@cluos/design-system/tailwind-preset`. Tailwind v4:
`@cluos/design-system/tailwind.css`. shadcn/ui: `@cluos/design-system/shadcn.css`.

## Cores (use sempre a variável, nunca o hex)

| Papel | Variável | Claro | Escuro |
|---|---|---|---|
| Canvas | `--cluos-bg` | `#FFFFFF` | `#010D28` |
| Faixa, cabeçalho de tabela | `--cluos-bg-subtle` | `#F4F6F8` | `#081634` |
| Superfície | `--cluos-surface` | `#FFFFFF` | `#081634` |
| Texto | `--cluos-fg` | `#010D28` | `#F7F8F5` |
| Texto secundário | `--cluos-fg-2` | `#132952` | `#C8CFDD` |
| Texto sutil | `--cluos-fg-3` | `#616367` | `#8E97AA` |
| Desabilitado (nunca texto informativo) | `--cluos-fg-disabled` | `#A5A5A5` | `#5C667A` |
| Hairline | `--cluos-line` | `#EAEAEA` | `rgba(255, 255, 255, 0.14)` |
| Borda de campo | `--cluos-line-2` | `#DCDEE2` | `rgba(255, 255, 255, 0.22)` |
| Borda forte, aba ativa | `--cluos-line-strong` | `#132952` | `#C8CFDD` |
| Ação primária (uma por região) | `--cluos-action` / texto `--cluos-action-fg` | `#C4DB7B` / `#010D28` | `#C4DB7B` / `#010D28` |
| Seleção suave | `--cluos-action-soft` | `rgba(196, 219, 123, 0.18)` | `rgba(196, 219, 123, 0.11)` |
| Progresso | `--cluos-progress` | `#132952` | `#6591E1` |
| Foco (anel duplo) | `--cluos-ring-focus` | `0 0 0 2px #C4DB7B, 0 0 0 4px #010D28` | `0 0 0 2px #C4DB7B, 0 0 0 4px #F7F8F5` |

Marca (referência Azigos): azul profundo `#010D28`, azul médio `#132952`, verde
tech `#C4DB7B`, branco, cinza claro `#EAEAEA`, cinza médio `#A5A5A5`,
off-white `#F4EFED` (só registro público).

### Status — sempre ícone + texto, nunca cor sozinha

Variáveis `--cluos-status-<nome>` (linha/ícone), `-bg` (fundo), `-text` (texto).

| Status | Claro fundo · linha · texto | Escuro fundo · linha · texto |
|---|---|---|
| success | `#C3F5DE` · `#007C59` · `#005C41` | `#0B3C2B` · `#22B988` · `#8FE6C1` |
| warning | `#FFE3BE` · `#8D5E00` · `#694500` | `#442E09` · `#D0901E` · `#F8C885` |
| danger | `#FFDFE0` · `#AE3B4C` · `#7E2E39` | `#4D2529` · `#E87782` · `#FFBDC1` |
| info | `#C9EFFF` · `#007493` · `#00566E` | `#01394A` · `#00AFDC` · `#8BDEFF` |

### Arco-íris — 12 matizes para categorias, etiquetas, calendário, avatares e identificação de produto

Nunca para ação, status ou navegação. Variáveis `--cluos-hue-NN-fill|line|text`.

| Matiz | ° | Claro fundo · linha · texto | Escuro fundo · linha · texto |
|---|---|---|---|
| hue-01 | 120° | `#E2EEC2` · `#768B0A` · `#465400` | `#2F3710` · `#889D37` · `#C8DB90` |
| hue-02 | 150° | `#CCF4D3` · `#319751` · `#0A5D2A` | `#193B22` · `#4FA866` · `#A1E4AF` |
| hue-03 | 180° | `#BDF6E9` · `#009583` · `#005A4F` | `#003C34` · `#00AA95` · `#81E7D4` |
| hue-04 | 210° | `#BAF4FE` · `#0090A2` · `#005763` | `#003A42` · `#00A4B9` · `#7BE3F5` |
| hue-05 | 240° | `#D2ECFF` · `#0089C9` · `#00527C` | `#10364E` · `#359BD9` · `#A3D8FF` |
| hue-06 | 262° | `#DCE9FF` · `#4F7ED3` · `#294B88` | `#213251` · `#6591E1` · `#B8D2FF` |
| hue-07 | 300° | `#ECE2FF` · `#8E6AC6` · `#573C7F` | `#382B4D` · `#9F7ED5` · `#D9C5FF` |
| hue-08 | 330° | `#FFDBFA` · `#AE5EA7` · `#6D3369` | `#442741` · `#BE73B8` · `#F7B9F0` |
| hue-09 | 0° | `#FFDEE7` · `#C1587C` · `#7B2E4A` | `#4B2531` · `#D16E8F` · `#FFBBCF` |
| hue-10 | 30° | `#FFE0DA` · `#C65B4B` · `#7E3126` | `#4D2620` · `#D67161` · `#FFBFB4` |
| hue-11 | 60° | `#FFE2CB` · `#BB6802` · `#733E00` | `#492B0F` · `#CB7D33` · `#FFC392` |
| hue-12 | 90° | `#F7E7BB` · `#9C7C00` · `#5F4A00` | `#3F3106` · `#B18E15` · `#EACF83` |

Gráficos: use `--cluos-chart-1` … `--cluos-chart-8` nessa ordem, nunca recicle;
a nona série vira "Outros". Quando a série é um produto, use `--cluos-product-<id>`.

## Tipografia

- Display: Manrope (`--cluos-font-display`), 300 base e 650 só no que importa. Nunca 700+.
- Interface e dados: Instrument Sans (`--cluos-font-sans`), 400 corpo, 550 rótulos e botões, números tabulares.
- Código e identificadores: JetBrains Mono (`--cluos-font-mono`).
- Destaque: Orbitron (`--cluos-font-accent`) só em casos especiais — Uma palavra-chave ou um número por composição, de 32 a 120 px; nunca abaixo de 24 px.; Nunca em texto corrido, botões, rótulos, navegação, tabelas ou formulários.; Não substitui o logotipo nem o lockup oficial.; Única exceção à regra de duas famílias por tela.
- No máximo duas famílias por tela, exceto a fonte de destaque.

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

## Espaço, geometria, movimento

- Espaço: base 4 px, `--cluos-space-N` = N × 4 px (0–24). Inset sm 12 / md 16 / lg 24; stack 4/8/16/24/40.
- Raio: `--cluos-radius-sm` 4 px em controles; `--cluos-radius-md` 8 px em regiões e diálogos; pílula só no CTA público e em chips de filtro. Sem sombra no produto; no escuro a elevação é por tom.
- Containers: wide 80 rem (painéis, tabelas, cabeçalho), product 72 rem (detalhe, formulário), docs 48 rem, prose 42 rem.
- Tabelas: passo de linha 44 px (compacto 36), números à direita e tabulares.
- Movimento: 180 ms hover, 120 ms press, 600 ms entrada de estado, 1200 ms desenho de dados; `prefers-reduced-motion` mostra o resultado final.
- Ícones: Lucide, traço 1,5, 16/20/24 px.

## Proibido

- Gradientes decorativos, glassmorphism, neon, sombras em cartões, cartão dentro de cartão.
- Verde tech em status, link, gráfico ou fundo decorativo; dois botões primários lado a lado.
- Bento grid decorativo, tilt 3D, parallax, ScrollSmoother, revelação letra a letra, áudio ambiente.
- Bibliotecas de efeito (Aceternity UI, React Bits). Radix e shadcn/ui são permitidos.
- Clonar ou raspar sites de terceiros; ilustração figurativa genérica; superlativos e percentuais sem fonte.
- Texto informativo em `#A5A5A5`; placeholder como rótulo; estado só por cor.
