# Atualização de anti-ai-slop-frontend

2026-10-12 — concluída e sincronizada no Mac. Fonte canônica:
`agent-skills/frontend/anti-ai-slop-frontend/SKILL.md`; versão 3 no manifest.

## Função e princípios preservados

A skill seleciona a profundidade do trabalho de interface e encaminha para
layout, implementação e revisores apropriados. Não desenha nem implementa
sozinha. Rafael continua sem precisar invocá-la nominalmente para uma alteração
de interface pertinente. Backend, perguntas conceituais e texto citado não
disparam a cadeia de implementação.

Foram preservados `cluos-mms-v1`, Swiss Ledger claro, Manrope + Instrument Sans,
navy/blue estruturais, tech-green para ação positiva e teal para execução;
tokens semânticos, uma intenção dominante, uma ação primária por região,
densidade proporcional, estados honestos, informação crítica visível e
verificação do resultado renderizado. A composição serve à tarefa. Não há
nova escolha obrigatória de estilo/paleta nem ativação de skills manuais por
vocabulário de frontend.

## Problemas corrigidos

| Antes | Depois |
| --- | --- |
| Primeira linha verdadeira podia classificar primitive compartilhado como N0/N1 | Maior impacto prevalece: N3 → N2 → N1 → N0 → N-skip; consumidores sustentam a decisão |
| “Ajustar token existente” confundia uso local e definição global | Aplicar token num botão local é N0; alterar sua definição compartilhada é N3 |
| Vocabulário acionava fluxo; falta de alvo ou quatro chamadas geravam pergunta | Intenção + contexto + inspeção; perguntar só quando falta uma decisão consequente |
| Casos de teste eram carregados junto às regras | Fixtures ficam em evals; apenas contrato operacional entra no caminho normal |
| Rubrica dependia de metaprompt em Downloads e podia valorizar novidade | Regras essenciais versionadas, utilidade verificável e exceções justificadas |
| Token oficial ou captura podiam sugerir aprovação de acessibilidade | Contraste real, teclado, estados e critérios aplicáveis verificados separadamente |
| Craftsman exigia contrato de layout em qualquer N3 | Contrato só quando telas/fluxos mudam; correção de fundação não inventa mudança estrutural |

A revisão independente apontou ainda o artefato `design-decision.md`
incondicional em N3; ele passou a ser condicional à mudança/opt-out de direção.
A descrição do director diferencia componente local de primitive compartilhado.

## Atualidade e critério

Descrição precisa, núcleo curto e referências por necessidade seguem a
[orientação oficial de autoria de skills da Anthropic](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).
Os princípios de utilidade, consistência e adaptação ao contexto foram
confrontados com [GOV.UK Design Principles](https://www.gov.uk/guidance/government-design-principles),
preservando a identidade própria de Rafael. São referências para decisões,
não autorização para adotar outra estética.

A rubrica agora referencia [WCAG 2.2](https://www.w3.org/TR/WCAG22/): foco visível,
foco não totalmente oculto e alvos com tamanho/espaçamento ou exceção válida,
além dos critérios pertinentes à superfície. Movimento reduzido permanece
requisito CluOS; o critério 2.3.3 é AAA, não AA. A
[técnica C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html) orienta a
verificação sem impor uma implementação única. Fontes consultadas em 2026-10-12.

## Validação e instalação

- **27/27 classificações** em agente independente de contexto limpo, sem
  gabarito. Cobriu todos os níveis, pergunta realmente necessária, revisão,
  backend, instrução citada e comparação de direções explicitamente pedida.
- **27 fixtures estruturalmente consistentes**, três skills alteradas válidas
  pelo `quick_validate.py`, manifest aprovado por `claude plugin validate`.
- `scripts/validate-agent-skills.sh`: **CLEAN**; inclui referências, layout
  instalado, segurança da sincronização, regras globais e regras por repo.
- Sincronização canônica com backup, conferida em `~/.claude`, `~/.codex` e
  `~/.agents`; configurações globais e hooks inalterados por hash.
- Revisão do diff e `git diff --check`: sem erro. Nenhuma UI, token visual,
  dependência de runtime ou serviço foi alterado.

A classificação independente é simulação declarativa, não execução completa
em uma UI nem novo experimento de modelos nativos Codex/Claude. A validação
nativa do Claude verifica manifest, sem chamar um modelo. Skill + matriz
passaram de **13.593 para 8.864 caracteres (−34,8%)**; é medida estática do
caminho de classificação, não economia comprovada de tokens. Rubrica e demais
referências carregadas por nível não entram nessa contagem.

[Evidência estruturada](2026-10-12-anti-slop-router-evidence.json).
Logs locais: `~/.local/state/gcos/frontend-router/20261012/`.
Backup: `.skill-sync-backups/20261012-092744-10098/`. Rollback: reverter a slice
canônica e sincronizar novamente; o backup preserva as cópias anteriores.

## Limites e memória compacta

Há dívida anterior fora desta atualização: exemplos antigos de CTA teal em
`APPLE-INSPIRED-PRODUCT-UX.md`/`patterns/components.md`; unidade de texto grande
em `patterns/accessibility.md`; possíveis pares de contraste insuficiente nos
tokens/preview. Usar a identidade atual não dispensa a auditoria de contraste.
A skill agora detecta essa situação e encaminha uma correção de fundação como
N3. A próxima ação para resolver essa dívida seria validar os pares nas telas
reais e corrigir os tokens/consumidores com revisão visual; não houve mudança
silenciosa de paleta nesta tarefa.

Repo `cluos-design-system`, branch
`agent/cluos-design-system/fundamentos-visuais-20261003`, base `a0f6273`.
Modo standard-slice, um writer; advisor e leitores independentes somente leitura.
Arquivos não rastreados preexistentes foram preservados. O validador completo
usou os três helpers Python locais já presentes; eles não pertencem a esta slice.
Commit convencional local, sem push, PR, merge ou deploy. Nenhum hook permanente.
