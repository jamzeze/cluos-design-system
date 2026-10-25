# Fluxo de design

Este repositório trabalha com o contrato primeiro: valor de design nasce no
YAML, é gerado para os exports e só então aparece no especime e na prosa. Não
comece uma refatoração visual de memória.

## Ordem de fontes

1. `tokens/cluos-v2.yaml` — contrato canônico, única fonte editável de valores.
2. `python3 scripts/build-tokens.py` — gera os exports a partir do YAML.
3. Exports gerados: `tokens/tokens.css`, `fonts.css`, `tailwind-preset.js`,
   `tailwind.css`, `shadcn.css`, `design.json`, `tokens.ts`, `tokens.js`,
   `index.ts` e `AGENT-BRIEF.md`. Nunca edite à mão.
4. `DESIGN-preview.html` — especime renderizado (com `cluos.css`), gerado por
   `python3 scripts/build-preview.py` a partir de `scripts/preview.template.html`
   e do YAML. Nunca edite o HTML gerado; edite o modelo.
5. `DESIGN.md` — contrato narrativo que explica o especime.
6. `brand-assets/` — artwork e fontes embarcadas.

Se duas camadas divergirem, resolva na ordem acima. `guides/` guarda material
bruto para rastreabilidade e não altera a ordem.

## Fluxo obrigatório

1. Abra `DESIGN-preview.html` e a seção mais próxima antes de editar código.
2. Case espaçamento, raio, tipografia, cor e movimento com o especime.
3. Se a mudança altera o sistema, edite `tokens/cluos-v2.yaml` (e, se for o caso,
   `scripts/preview.template.html` e `cluos.css`) e rode `npm run build`, que
   regera os exports e o especime.
4. Na mesma mudança, sincronize `DESIGN.md` e os documentos afetados, para não
   haver duas verdades.
5. Rode `npm test` e `npm pack --dry-run` antes de qualquer mudança ligada a
   publicação. A publicação em si é manual e congelada.

## Quando o especime muda

Mudar o especime (`scripts/preview.template.html`) é mudar o sistema, não só uma demonstração. A mesma
mudança deve atualizar, quando couber: `tokens/cluos-v2.yaml` (e os exports
regerados), `cluos.css`, `DESIGN.md`, `brand-assets/README.md`,
`CHANGELOG.md` e `guides/` se a fonte original mudou.

## Regras duras

- Um único especime oficial. Não crie forks `v3`, `v4` nem previews paralelos.
- Não invente componentes ou estados em código sem atualizar especime e spec.
- Não redesenhe o logotipo; use os SVGs de `brand-assets/`.
- Nenhum valor de cor, tamanho ou nome de variável fora de `tokens/`. Sem
  `--cluos-*` inventado.
- Não deixe diferença visual entre `DESIGN-preview.html` e `DESIGN.md`.
- O legado (`docs/legacy/`) não é referência e não volta ao pacote.

## Checklist de validação

- `npm test` passa: exports e especime em dia com o YAML (`build-tokens.py --check`,
  `build-preview.py --check`) e contraste (`test-contrast.py`).
- `python3 scripts/test-contrast.py` passa (WCAG 2.2 AA).
- O especime abre sem erro e mostra os dois temas.
- O identificador do contrato é `cluos-v2`.
- Nomes de arquivos e usos de ativos batem com `brand-assets/README.md`.
- `npm pack --dry-run` inclui `tokens/`, `brand-assets/`, `patterns/`,
  `examples/`, `guides/`, `cluos.css`, `DESIGN-preview.html`, `DESIGN.md`,
  `DESIGN-WORKFLOW.md` e `AGENT-BRIEF.md`.

---

## Mudanças de UI de produto

1. Leia `DESIGN.md` (identidade visual).
2. Leia `APPLE-INSPIRED-PRODUCT-UX.md` (princípios e diretrizes por produto).
3. Leia `PRODUCT-PATTERNS.md` (padrões do tipo de produto).
4. Consulte `patterns/` (componentes, modelos, estados, acessibilidade).
5. Atualize `DESIGN-preview.html` se o padrão visual mudar.
6. Atualize tokens só se um novo papel semântico for necessário (raro).
7. Atualize `examples/` se o padrão for novo.
8. Atualize `CHANGELOG.md`.

### Portão de implementação

Não implemente uma tela que viole qualquer item:

- Uma intenção dominante por tela.
- Uma ação primária por região visual.
- Clareza em 3 segundos: onde estou, qual o estado, qual o próximo passo.
- Poucos botões: nunca 4 ou mais primários competindo.
- Divulgação progressiva: opções avançadas, logs e detalhe técnico recolhidos.
- Estados definidos: carregando, vazio e erro são obrigatórios em componente dinâmico.
- Tokens oficiais: nenhuma cor nova fora de `tokens/tokens.css`.

Se a tela violar algum item, volte ao design antes de implementar.
