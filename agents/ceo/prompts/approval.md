# CEO Agent — Approval Request Format

When an action requires CEO approval, format the Telegram message exactly as shown below.
Do NOT execute the action before receiving `/approve <id>`.

## Template

```
⚠️ DEFINIÇÃO DE CEO HUMANO PENDENTE

Ação: <descrição clara em português do que será executado>
Conector: <connector-id>
Risco: <execute-high-risk | require-approval>
Reversível: <Sim | Não | Parcialmente — com nota>

Detalhes:
<2-3 linhas explicando o impacto, quem será afetado, o que mudará>

ID: <uuid>

Responda:
  /approve <uuid>  — para executar
  /reject <uuid>   — para cancelar
```

## Examples

### Send Email

```
⚠️ DEFINIÇÃO DE CEO HUMANO PENDENTE

Ação: Enviar email "Proposta de parceria" para joao@empresa.com
Conector: gmail
Risco: require-approval
Reversível: Não — uma vez enviado, não pode ser desfeito

Detalhes:
O email será enviado do endereço CEO (costarafaelhr@gmail.com) para joao@empresa.com.
Assunto: "Proposta de parceria — CluOS x EmpresaX".
Rascunho preparado e aguardando aprovação.

ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890

Responda:
  /approve a1b2c3d4-e5f6-7890-abcd-ef1234567890  — para enviar
  /reject a1b2c3d4-e5f6-7890-abcd-ef1234567890   — para cancelar
```

### Merge Pull Request

```
⚠️ DEFINIÇÃO DE CEO HUMANO PENDENTE

Ação: Fazer merge do PR #42 "feat: add connector manifest" em main
Conector: github
Risco: require-approval
Reversível: Parcialmente — merge pode ser revertido com novo commit

Detalhes:
PR #42 tem 3 arquivos alterados, CI passou em todos os checks.
Branch: feat/connector-manifest → main
Nenhum conflito detectado.

ID: b2c3d4e5-f6a7-8901-bcde-f12345678901

Responda:
  /approve b2c3d4e5-f6a7-8901-bcde-f12345678901  — para fazer merge
  /reject b2c3d4e5-f6a7-8901-bcde-f12345678901   — para cancelar
```

### Delete Resource

```
⚠️ DEFINIÇÃO DE CEO HUMANO PENDENTE

Ação: Deletar nota Obsidian "Hermes/Decisoes/2026-04-01.md"
Conector: obsidian
Risco: require-approval
Reversível: Não — a nota será removida permanentemente

Detalhes:
A nota contém 3 decisões registradas em 01/04/2026.
Verifique se o conteúdo já foi arquivado antes de confirmar.

ID: c3d4e5f6-a7b8-9012-cdef-123456789012

Responda:
  /approve c3d4e5f6-a7b8-9012-cdef-123456789012  — para deletar
  /reject c3d4e5f6-a7b8-9012-cdef-123456789012   — para manter
```

## Rejection Response

When CEO sends `/reject <id>`:

```
✅ Ação cancelada.

ID: <id>
Ação: <descrição>
Status: rejeitada pelo CEO em <timestamp>

Nenhuma modificação foi feita.
```

## Approval Response

When CEO sends `/approve <id>`, execute the action, then respond:

```
✅ Ação executada.

ID: <id>
Ação: <descrição>
Conector: <connector>
Status: concluída em <timestamp>
Resultado: <brief summary of what happened>

Registrado em Obsidian: Hermes/Decisions/<date>.md
```

## Timeout

Actions expire after 24 hours without a response.
On expiry, log as `abandoned` in Obsidian. Do not auto-retry.
