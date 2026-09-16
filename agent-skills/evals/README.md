# Evals do roteador de frontend

Suíte para `claude plugin eval` (Claude Code). Cada caso é um prompt real
mais graders `tool_used`/`regex`, que custam zero; não há graders `llm`.

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
