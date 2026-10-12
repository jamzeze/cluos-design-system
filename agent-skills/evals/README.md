# Evals do roteador de frontend

Suíte para `claude plugin eval` (Claude Code). Cada caso é um prompt real
mais graders determinísticos `tool_used`/`regex`; não há graders `llm`.
As chamadas ao agente continuam consumindo tokens.

- `n-skip-*`: o roteador dispara e sai; critic e layout-architect não rodam;
  a resposta cita `N-skip`.
- `n0-*`: roteador dispara, sem design-critic.
- `n2-*`: roteador e `ux-layout-architect` disparam.
- `nao-frontend-*`: tarefa de backend; o roteador **não** dispara (grader
  `arm: both`, `min: 0`, `max: 0`).

Rodar do diretório `agent-skills/` (raiz do plugin):

```bash
claude plugin validate .
claude plugin eval . --case n-skip-calibre-crossa --runs 1 --ablation none   # iteração barata
claude plugin eval .                                                          # suíte completa, 3 runs × 2 braços
```

Resultados em `evals/results/<timestamp>/` (ignorado pelo git). Baseline
de falha documentado antes desta suíte: sessão de 2026-09-16 no azigos e
`termos/frontend-routing-decision.md`, ambos N0 com cinco passos.

## Regressão do roteador v3 (2026-10-12)

`routing-cases.yaml` preserva os casos e acrescenta limites de escopo, token
local versus compartilhado, revisão, termos isolados, conteúdo citado e
comparação explicitamente pedida. O arquivo fica fora da matriz carregada
no uso normal. `scripts/test-frontend-routing.sh` valida estrutura, dependências
e consistência; não executa o agente nem comprova o comportamento.

Para avaliação independente, entregue somente `prompt` e `context` a um agente
em contexto limpo, junto à skill e matriz, ocultando os resultados esperados.
Peça classificação, contrato de layout, necessidade de pergunta e galeria,
sem implementar interfaces ou ler o gabarito. Verifique ambiguidades com
contexto suficiente antes de interpretar uma divergência como falha.

A avaliação desta revisão acertou os 27 cenários; é uma amostra declarativa,
não um teste completo de produto nem uma nova comparação nativa entre clientes.
[Relatório e limites](../../docs/reviews/2026-10-12-anti-slop-router.md).
