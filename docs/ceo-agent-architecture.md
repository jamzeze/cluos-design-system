# CEO Agent CluOS — Architecture

## Overview

The CEO Agent is the conversational intelligence layer of CluOS Hermes.
It receives natural-language messages from the CEO via Telegram, classifies intent
and risk, routes to the appropriate connector, and ensures all high-impact actions
require explicit human approval.

```
CEO (Telegram)
     │
     ▼
┌─────────────────────────────────────┐
│  Telegram Webhook / Polling Worker  │
│  telegram/message-router            │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  CEO Agent Core                     │
│  agents/ceo/agent.yaml              │
│                                     │
│  1. Intent Classification           │
│     (prompts/router.md)             │
│                                     │
│  2. Risk Assessment                 │
│     (prompts/risk-policy.md)        │
│                                     │
│  3. Action Dispatch                 │
│     → connectors/manifest.yaml      │
│                                     │
│  4. Approval Gate                   │
│     (prompts/approval.md)           │
│                                     │
│  5. Audit Log → Obsidian            │
└─────────────┬───────────────────────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
GitHub   Google WS  Browserbase
Firecrawl  Obsidian   Apify
YouTube    Granola    Fathom
```

---

## Components

### Telegram Layer (`telegram/`)

- **Webhook / Polling worker** — receives updates from Telegram Bot API
- **Message Router** — validates sender ID, routes to CEO Agent
- **Access Control** — only `TELEGRAM_ALLOWED_USER_IDS` can interact

### CEO Agent Core (`agents/ceo/`)

- **`agent.yaml`** — agent configuration: connectors, modes, limits
- **`prompts/system.md`** — base system prompt with persona and rules
- **`prompts/router.md`** — intent and connector routing logic
- **`prompts/risk-policy.md`** — risk classification (read / low / high / blocked)
- **`prompts/approval.md`** — approval request formatting for Telegram
- **`workflows/`** — named workflows for common multi-step tasks

### Secrets Layer

- All credentials read via `bw-export-env.sh` or GitHub Actions secrets
- CEO Agent never stores credentials in memory beyond the current request
- Bitwarden session required for local development

---

## Operation Modes

| Mode | `CEO_AGENT_MODE` | Behavior |
|---|---|---|
| Auto | `auto` | Execute low-risk actions without asking |
| Approval | `approval` | All write actions require confirmation (default) |
| Dry Run | `dry-run` | Plan actions but never execute; report intent only |

Default mode: **`approval`** — safest for production.

---

## Request Lifecycle

1. Telegram message arrives (text, voice, photo)
2. Bot validates sender ID against `TELEGRAM_ALLOWED_USER_IDS`
3. Message routed to CEO Agent
4. Agent classifies intent using `prompts/router.md`
5. Agent assesses risk using `prompts/risk-policy.md`
6. If risk ≤ `read`: execute immediately, reply with result
7. If risk = `execute-low-risk` and mode = `auto`: execute, log, reply
8. If risk ≥ `execute-high-risk` OR mode = `approval`:
   - Format approval request via `prompts/approval.md`
   - Send `DEFINIÇÃO DE CEO HUMANO PENDENTE` to Telegram
   - Queue action with unique ID
   - Await `/approve <id>` or `/reject <id>`
9. On approval: execute → log to Obsidian → reply with result
10. On rejection: log → reply with cancellation confirmation

---

## Telegram Commands

| Command | Permission | Description |
|---|---|---|
| `/status` | read | Show system status: connectors health, pending approvals |
| `/pending` | read | List all actions awaiting CEO approval |
| `/approve <id>` | execute | Approve a queued action |
| `/reject <id>` | execute | Reject and cancel a queued action |

---

## Audit Trail

Every action at risk level ≥ execute-low-risk is appended to:
```
<OBSIDIAN_VAULT_PATH>/Hermes/Decisions/YYYY-MM-DD.md
```

Format:
```markdown
## HH:MM — <Action Title>

- **Connector:** <id>
- **Risk:** <level>
- **Approved by:** CEO via Telegram
- **Outcome:** success / failure
- **Details:** <summary>
```

---

## Security Constraints

- Bot token is never printed to terminal or logs
- Allowed user IDs are validated on every request (not cached per session)
- No action persists credentials beyond the request lifecycle
- All secrets read from environment (populated by Bitwarden scripts)
- Blocked actions (payment, push to main, bulk email) are hardcoded — cannot be overridden even with approval
