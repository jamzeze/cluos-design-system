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

Coluna única abaixo de 48rem; grades de amostras 6 → 3 → 2; tabelas com
rolagem própria; nenhuma rolagem horizontal da página em 375px.

## Fora de escopo

Alterar `tokens/*`, `DESIGN.md` ou `DESIGN-preview.html`.
