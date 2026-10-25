# Palette Policy — CluOS

Governa como a cor é escolhida e aplicada em qualquer superfície CluOS.
Contrato canônico: `cluos-v2` (Rafael, 2026-10-24). Valores exatos vêm de
`tokens/cluos-v2.yaml` e dos exports gerados (`tokens/tokens.css`,
`AGENT-BRIEF.md`) na fonte; nunca invente hex.

## 1. Estado da biblioteca anterior

A biblioteca `pal-*`, as paletas nativas (`teal-classic`, `thermal-nocturne`,
`editorial-cobalt`, `swiss-mono`, `clinic-warm`) e os arquétipos A–G deixam de
existir no pacote publicado. Ficam arquivados em `docs/legacy/` como histórico
(decisão 26). Nenhuma superfície nova escolhe paleta por tarefa.
`data-cluos-palette` e `--u-*` não fazem parte do contrato.

Qualquer paleta global nova exige decisão registrada em
`palette-decisions.yaml` do profile CluOS resolvido (instalado:
`../../profiles/cluos-design-system/cluos`; fonte: `../profiles/cluos`). Pare
se nenhum dos dois caminhos estiver completo.

## 2. Paleta de marca (referência Azigos)

A Azigos é a referência de cor; não há hierarquia entre marcas.

| Cor | Valor | Papel |
|---|---|---|
| Azul profundo | `#010D28` | texto, campos densos, canvas escuro |
| Azul médio | `#132952` | estrutura, navegação, ação secundária, progresso |
| Verde tech | `#C4DB7B` | ação primária e seleção (texto navy) |
| Branco | `#FFFFFF` | canvas e superfícies de produto |
| Cinza claro | `#EAEAEA` | hairlines, superfície muda |
| Cinza médio | `#A5A5A5` | desabilitado, decorativo; nunca texto informativo |
| Off-white | `#F4EFED` | canvas alternativo, só no registro público |

Neutros são frios, derivados do matiz do azul médio; `bg-subtle` não é branco.
Tema claro por padrão no produto, escuro de primeira classe (navy como campo);
todo token tem par claro/escuro. Consuma sempre a variável `--cluos-*`.

## 3. Mapa semântico

- Ação primária = verde tech, texto navy, uma por região. A cor de ação não
  vaza para estado, link, gráfico nem fundo decorativo.
- Azul médio: estrutura, navegação, ação secundária, progresso.
- Link em texto corrido: cor do texto com sublinhado.
- Status = ícone + texto, nunca cor sozinha. Quatro status, cada um com
  fundo, linha e texto, em claro e escuro, nos matizes 15° (perigo), 75°
  (aviso), 165° (sucesso) e 225° (informação). Sucesso é distinto do verde
  tech. A linha de status é mais escura que a de categoria para um chip de
  status nunca parecer série de gráfico.

## 4. Arco-íris (12 matizes)

`hue-01` … `hue-12`, a 30° em OKLCH (`hue-01` = matiz do verde tech, `hue-06` =
matiz do azul médio), três degraus (fundo, linha, texto) em claro e escuro.

- Uso permitido: categorias de dados, etiquetas, calendário, avatares,
  ilustração, identificação de produto.
- Proibido: ação primária, status, navegação.
- Gráficos: `chart_order` da fonte (oito matizes, nunca reciclada; a nona
  série vira "Outros"). Quando as séries são produtos, cada barra usa o
  `product_hue` do produto.
- `product_hue`: um matiz por produto, só em chrome (etiqueta no hub, tile do
  favicon, ponto de tabela, estado vazio). Núcleo visual idêntico entre
  produtos.

## 5. Aliases de compatibilidade

Teal, copper, oxblood e demais valores do `cluos-mms-v1` deixam de ser papéis
de marca e permanecem apenas como aliases (`compat.aliases` na fonte) até
2.0.0. Código novo não os usa; código existente migra para status e matizes.

## 6. Restrições (inalteradas da rubrica anti-slop)

- Sem gradiente roxo-azul por reflexo.
- Sem cor de marca em todo estado.
- Sem dependência exclusiva de cor para comunicar estado.
- Banidos como padrão: brilho neon, glassmorphism, combinação
  bege + latão + oxblood + espresso de "luxo", acento único com saturação
  acima de 80%.
- Contraste alvo WCAG 2.2 AA; foco = anel duplo (verde tech interno + navy
  externo).
