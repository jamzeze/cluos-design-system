# CEO Agent CluOS

Conversational AI layer for the CEO. Operates via Telegram.
Routes natural-language requests to Hermes connectors with approval gates.

## Quick Start

```bash
# 1. Load secrets
bash scripts/bw-login-check.sh
bash scripts/bw-export-env.sh
source .env.local

# 2. Validate config
bash scripts/validate-ceo-agent

# 3. Smoke test (no messages sent)
bash scripts/smoke-ceo-telegram

# 4. Start polling (local dev)
node telegram/polling-worker.js
```

## Architecture

```
Telegram → Message Router → CEO Agent Core → Connector(s) → Response
                                          ↓
                              Approval gate (if needed)
                                          ↓
                              Obsidian audit log
```

Full architecture: `docs/ceo-agent-architecture.md`

## Modes

| Mode | Env value | Behavior |
|---|---|---|
| Approval (default) | `approval` | All writes need `/approve` |
| Auto | `auto` | Low-risk writes execute automatically |
| Dry Run | `dry-run` | Plans only, never executes |

Set via `CEO_AGENT_MODE` in `.env.local` or Bitwarden.

## Commands

| Command | Description |
|---|---|
| `/status` | System health and pending approvals |
| `/pending` | List queued actions |
| `/approve <id>` | Approve queued action |
| `/reject <id>` | Cancel queued action |

## Prompts

| File | Purpose |
|---|---|
| `prompts/system.md` | Agent identity and constraints |
| `prompts/router.md` | Intent classification → connector routing |
| `prompts/risk-policy.md` | Risk levels and blocked actions |
| `prompts/approval.md` | Approval message template |

## Secrets Required

See `secrets/bitwarden-map.yaml` for full list.
Key ones:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_ALLOWED_USER_IDS`
- `HERMES_API_KEY`
- `HERMES_API_URL`

## Full Documentation

- Architecture: `docs/ceo-agent-architecture.md`
- Permissions: `docs/ceo-agent-permissions.md`
- Telegram runbook: `docs/ceo-agent-telegram-runbook.md`
