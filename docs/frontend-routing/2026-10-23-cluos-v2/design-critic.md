# design-critic — canvas cluos-v2 (fase de design)

Revisor: subagente `design-critic` em contexto limpo, sobre renders headless das
pranchetas do canvas https://claude.ai/artifact/G8VLmYcyHCZy23d6cnfjzt
(renders em 1440 px; a partir da rodada 2 também 768 e 390 px). Rubrica:
`agent-skills/shared/anti-slop-rubric.md`. Alvo: `design-decision.md` desta pasta.
Este registro é append-only; cada rodada fica abaixo da anterior.

## Rodada 1 — 2026-10-23 · 30/50 · bloqueado

Menor dimensão: Responsividade 2/5. Sem P0. P1: F1 coluna de ações cortada na
tabela de Componentes; F2 chips de status sem ícone e indistinguíveis das pílulas
de produto; F3 nenhuma evidência abaixo de 1440 px. P2: F4 ações coladas na borda
(Dashboard); F5 coluna de spec invadindo "Regras" e linha mono cortada
(Tipografia); F6 sete "Reiniciar" vermelhos por linha; F7 gráfico com cores que
cruzavam a identidade de produto; F8 progresso invisível no escuro; F9 aba ativa
em verde tech; F10 container de 1296 px e densidade fora do token; F11 mono em
valores numéricos; F12 chips decorativos no hero da capa.

Correções aplicadas: tabela de componentes reduzida com menu "⋯"; ícone em todo
chip de status e produto como ponto de 8 px + nome neutro; pranchetas de 390 px e
renders em 768/390; coluna "Última verificação" removida; Tipografia
reequilibrada; ações de linha no "⋯" e "silenciado até 18:00" como texto de
estado; barras no matiz do produto; progresso `#6591E1` no escuro; aba ativa com
linha em azul médio; Dashboard em 80 rem e Detalhe em 72 rem; Instrument Sans
tabular nos valores; rodapé textual no hero.

## Rodada 2 — 2026-10-23 · 34/50 · bloqueado

Sem P0/P1. F1, F3–F9, F11, F12 resolvidos; F2 e F10 parciais. P2 novos: N1
controles de formulário no escuro com saliência invertida; N2 linhas de 53 px
contra o token de 44; N3 cabeçalho em três linhas e tabela sem indício de
rolagem no 390; N4 texto de Movimento cortado em Espaço; N5 arcos do símbolo
cruzando o rodapé da capa; N6 chips de incidente sem ícone.

Correções aplicadas: `color-scheme: dark` e `accent-color` no token de progresso;
células de 43 px + hairline (passo 44) em Dashboard, Componentes e Espaço;
cabeçalho em duas linhas abaixo de 1024 px e tabela do celular com Serviço,
Estado e "⋯"; Espaço com colunas em grid e altura ajustada; rodapé do hero em
duas linhas curtas; ícones nos chips de incidente; espécimes de foco (caixa,
rádio, toggle, aba, link, "⋯", select) e menu "⋯" aberto em Componentes;
recorte neutro do símbolo no estado vazio; peso 650 no trecho que importa do
subtítulo do Dashboard; alturas das pranchetas medidas e ajustadas ao conteúdo.

Limites declarados pelo revisor nas duas rodadas: contraste medido por amostra
de pixel ou cálculo, foco e teclado não exercitados (espécime estático), uma voz
só — o teste cego de três revisores (decisão 24) roda sobre a implementação.

## Rodada 3 — 2026-10-23 · 37/50 · bloqueado

N1, N2, N4, N5, N6 resolvidos; N3 parcial. P1: texto branco sobre `#E87782` no
botão destrutivo do tema escuro (~2,8:1). P2: navegação truncada no 390; incidentes
espremidos no 390; matiz de `did` divergente entre Dashboard e Componentes;
cabeçalho diferente entre Dashboard e Detalhe (largura, descritor e sino);
destaque do item de menu invisível no escuro. P3: rótulos "linha 44/36" contra
43/35 medidos; legenda do anel de foco; gráfico com 4 de 7 produtos sem dizer.

Correções aplicadas: texto navy no destrutivo escuro (~6,8:1); item de menu em
destaque com `bg-muted`; navegação de 13 px sem respiro extra abaixo de 768 px,
com a regra depois das regras base; incidentes em uma coluna no 390 (hora, título,
texto, chip); KPIs em 2×2 no 390; `did` em hue-08 nos dois modos; cabeçalho de
80 rem com descritor e sino nas duas páginas; rótulos de densidade como "passo
44 (célula 43 + hairline)"; gráfico rotulado "4 maiores" com link para os 7.

## Rodada 4 — 2026-10-23 · 39/50 · bloqueado

Sem P0/P1. P1 e P2-1, P2-3, P2-4 da rodada 3 resolvidos; P2-5 parcial. P2 abertos:
N1 foco do item de menu só por tinta (1,2:1 e 1,25:1); N2 incidentes no 390 ainda
em três colunas (a regra de mídia foi escrita antes da regra base e perdeu por
ordem). P3: cabeçalho de 80 rem sobre corpo de 72 rem sem regra escrita; tinta de
seleção escura a 4,53:1; "Avançado" como caixa dentro do cartão; título e meta do
gráfico em duas linhas no 390; "Reiniciar" órfão no Detalhe-390; coluna direita de
Espaço vazia.

Correções aplicadas: menu com tinta = hover e anel duplo = foco, legenda ajustada;
regras de mídia do Dashboard movidas para o fim da folha (incidentes em uma coluna,
meta do gráfico abaixo do título no celular); tinta de seleção escura reduzida
para 11 %; "Avançado" como linha de disclosure com hairlines; Runbook só com ícone
abaixo de 480 px; regra escrita em Espaço para wide × product × docs × prose.

## Rodada 5 — 2026-10-23 · 42/50 · aprovado para apresentar a Rafael

Nenhuma dimensão abaixo de 4 (Hierarquia 5, Tipografia 5, as demais 4). Zero
P0–P2. N1–N6 da rodada 4 resolvidos, com medição de pixel: anel de foco do menu
2 px verde + 2 px navy (claro) ou `#F7F8F5` (escuro); incidentes em coluna no 390;
regra de containers escrita; texto secundário na linha selecionada escura a
5,43:1; disclosure sem caixa; Runbook só com ícone no 390.

P3 restantes, levados para a implementação: P3-1 passo de linha medido 43/35
contra rótulo 44/36 (corrigido no canvas após a rodada: célula de 44/36 px com
hairline incluída); P3-2 quebras número+unidade e painel de incidentes estreito a
1440; P3-3 fundos pêssego/âmbar de "CRM CluOS" e "Atenção" próximos quando lado a
lado (no cabeçalho usar ponto + nome, como na tabela); P3-4 documentar
`aria-label` e alvo de 40 px do Runbook só com ícone; P3-5 vazio ao lado da
escala em Espaço, tinta de seleção escura ausente em Cores, legenda do foco
falando em navy externo.

Limites declarados: hover e teclado reais não exercitados; sem render do Detalhe
no escuro; o teste cego de três revisores (decisão 24) roda sobre a implementação.
Veredito do revisor independente: aprovado. Rafael decide sobre a direção.

## Rodada 6 — espécime no repositório (2026-10-25)

Revisor: subagente `design-critic`, contexto limpo, sobre renders de
`DESIGN-preview.html` a 1440, 768 e 390 px, claro e escuro.

Nota: 40/50, bloqueado (gráficos 3/5). Correções da rodada anterior
confirmadas: cartões de fonte a 390, tabelas empilhadas com `data-label`,
linha selecionada distinta de estado, hover e foco à vista, foco da navegação
fora de `.cluos`.

Achados e destino:

| Achado | Nível | Correção |
| --- | --- | --- |
| Registro empilhado da tabela com ponto solto e seleção numa linha só | P2 | `cluos-cell--select`, `--lead` e `--actions` dividem a primeira linha do registro em `cluos.css` |
| Gráficos sem eixo, unidade nem escala | P2 | Linha com grade em ms, datas e rótulo final; barras com "escala 0–50 mil" e larguras proporcionais |
| Colunas meio vazias a 768 | P3 | Último item ímpar de `.sp-grid-3` ocupa a linha inteira |
| Diálogo mais estreito que o vazio a 768 | P3 | `max-width` do diálogo liberado só no espécime |
| Amostras órfãs | P3 | Marca em 7 (4+3 no celular); papéis em 5 colunas |
| Rádio escuro com borda fraca | P3 | Não corrigido: controle nativo com `accent-color`; medir na migração dos produtos |
| Cartão público some no escuro | P3 | Hairline `line-2` no cartão |
| Navegação quebra linha no celular | P3 | Mantido: decisão anterior prefere quebrar a esconder itens atrás de rolagem |

Re-render conferido pelo autor depois das correções (`final3`): tabela,
gráficos, cartão escuro e grades. Os rótulos do eixo ficam em cerca de 10 px a
390 px.
