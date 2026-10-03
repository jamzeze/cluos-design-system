# UX layout contract — Fundamentos visuais (cluos-mms-v1)

Status: aprovado pela referência. Rafael pediu, em 2026-10-03, um documento
com a mesma estrutura e todos os campos de `design-system-site-soulclin.pdf`,
preenchido com as especificações do `cluos-mms-v1`.

## Tarefa

Ler o design system em uma página: o que existe, para que serve, onde passa
ou falha em contraste e o que ainda é proposta.

## Superfície

`DESIGN-fundamentos-visuais.html` (raiz, irmão de `DESIGN-preview.html`) e o
PDF de página única `docs/fundamentos-visuais/cluos-fundamentos-visuais.pdf`.

## Zonas, na ordem visual, de DOM e de foco

1. Cabeçalho: sobrelinha, título, subtítulo, descrição com fontes, data e
   legenda de proveniência (definido / proposta).
2. 01 Cores primitivas: grade de amostras com nome, hex, token e função.
3. 02 Cores semânticas: quatro colunas (Fundo, Texto, Borda, Ação) com
   papel → primitiva. Status entra em Fundo e Texto.
4. 03 Contraste: tabela Amostra / Uso / Contraste / Veredito e nota.
5. 04 Tipografia: linhas estilo (nome, família · tamanho/entrelinha,
   celular, uso) × amostra; nota da barra de proposta.
6. 05 Espaçamento e layout: escala com barras, tabela de layout, raio e
   espessura.
7. 06 Componentes base: botões, links, campos, passo numerado, fala em
   destaque, superfície operacional.
8. 07 Regras de uso: Faça / Evite.
9. Rodapé: assinatura e metadados.

Cada seção abre com numeral + título + descrição curta, separada por hairline,
como na referência.

## Proveniência

- Contorno sólido: token em `main`.
- Contorno tracejado (amostra) ou barra vertical (estilo): adequação ou
  valor pendente, fora do contrato canônico.

## Responsivo

Coluna única abaixo de 48rem; grades de amostras 6 → 3 → 2; abaixo de 48rem
as tabelas de contraste e de layout empilham cada linha (nada rola na
horizontal, nem a página nem as tabelas) e mantêm a semântica de tabela com
`role`; nenhuma rolagem horizontal da página em 375px.

## Adequações em relação à referência

Registradas em 2026-10-03, dentro da instrução do Rafael de adequar onde o
CluOS não tem equivalente:

- 01: 18 amostras em três grupos de 6 (estrutura e neutros, ação e estado,
  status) no lugar de 12; uma proposta tracejada (neutral 700).
- 03: 21 linhas no lugar de 11, porque o CluOS tem mais pares de estado; a
  nota final lista as pendências abertas (PR #4, PR #6, anel de foco) no lugar
  da nota do overlay de vídeo.
- 04: `titulo-pagina-interna` → `titulo-tela`, `titulo-dobra` →
  `titulo-secao`, `nome-tecnica-medico` → `lockup`; linha extra `codigo`
  (16 no lugar de 15). Sem Playfair e sem itálico.
- 05: 14 linhas de layout com a fonte de cada medida; sexto item de geometria
  (sombra: nenhuma).
- 06: botões ghost e destrutivo além dos quatro da referência; aspas em
  medium blue (o CluOS não tem champanhe); bloco de urgência → superfície
  operacional escura do DESIGN-preview.
- Cabeçalho: terceiro item de legenda (barra).
- Anel de foco: falha mostrada, não corrigida (`exception-focus-ring.md`).

## Fora de escopo

Alterar `tokens/*`, `DESIGN.md` ou `DESIGN-preview.html`.
