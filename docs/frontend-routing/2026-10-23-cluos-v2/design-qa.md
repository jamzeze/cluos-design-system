# design-qa — cluos-v2

Data: 2026-10-25. Revisor: subagente `design-qa`, contexto limpo, sem edição.
Alvo: `tokens/cluos-v2.yaml`, `design-decision.md` (itens 1–31), `DESIGN.md`,
`AGENT-BRIEF.md`. Implementação: `tokens/*`, `cluos.css`,
`DESIGN-preview.html`, `brand-assets/`, `package.json`.

## Rodada 1 (canvas e espécime)

Falhou com: estados de hover e foco ausentes no espécime, `@font-face` mono
ausente, arquivo da JetBrains Mono nulo no YAML. Corrigidos antes da rodada 2.

## Rodada 2 — veredito: passa

Sem divergência P0–P2.

- Fontes: os quatro `@font-face` de `tokens/fonts.css` apontam para WOFF2
  válidos em `brand-assets/fonts/`, com licenças; `npm pack --dry-run` inclui
  todos.
- Foco: `0 0 0 2px #C4DB7B, 0 0 0 4px #010D28` no claro (item 18); externo
  `#F7F8F5` no escuro.
- Raio 4/8 px; todos os `--cluos-shadow-*` são `none`.
- Paridade de tema: 138 tokens no escopo claro e 138 no escuro.
- `npm test`: build e preview em dia, 194 pares de contraste, 0 falhas.

| Desvio | Nível | Destino |
| --- | --- | --- |
| Status a 15° dos matizes da rampa | P3 | Intencional; nota acrescentada ao item 12 de `design-decision.md` |
| Pílula em switch, ponto, contador e progresso | P3 | `DESIGN.md` agora lista essas formas funcionais |
| Anel de foco inline no herói | P3 | Trocado por `.is-focus` |
| Foco some em `forced-colors` | P3 | `cluos.css` ganhou `outline: Highlight` em `@media (forced-colors: active)` |

Risco residual: forced-colors, ordem de foco por teclado e o layout de 768 px
não foram exercitados em navegador real; hover e foco aparecem por classe
forçada, não por pseudo-estado.
