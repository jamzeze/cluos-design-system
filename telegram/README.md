# Telegram Integration — CluOS CEO Agent

The Telegram layer is the only interface the CEO uses to interact with Hermes.
All messages are validated for sender identity before any processing.

## Security Model

- Only numeric user IDs in `TELEGRAM_ALLOWED_USER_IDS` can issue commands
- Unknown senders are silently ignored (no reply that reveals bot existence)
- Bot token is never printed, logged, or stored outside Bitwarden / GitHub Secrets

## Delivery Modes

### Polling (local development)

The bot polls the Telegram API for updates every few seconds.
Suitable for local testing and development. Not for production.

```bash
source .env.local
node telegram/polling-worker.js
```

### Webhook (production)

The bot receives updates via HTTPS webhook from Telegram servers.
Requires a public HTTPS endpoint.

```bash
# Register webhook
curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -d "url=https://hermes.cluos.online/telegram/webhook" \
  -d "secret_token=$WEBHOOK_SECRET_TOKEN"
```

See `telegram/webhook.example` for handler implementation.

## Message Flow

```
Telegram API
    │
    ▼ (HTTP update)
Message Router (telegram/message-router.example)
    │
    ├─ Validate sender ID
    ├─ Parse command or free text
    └─ Route to CEO Agent
          │
          ├─ /status → system health
          ├─ /pending → approval queue
          ├─ /approve <id> → execute queued action
          ├─ /reject <id>  → cancel queued action
          └─ <natural language> → intent classification → connector
```

## Files

| File | Purpose |
|---|---|
| `README.md` | This file |
| `webhook.example` | Webhook HTTP handler example (adapt to your runtime) |
| `message-router.example` | Message routing and access control logic |
| `polling-worker.js` | (create from polling-worker.example) local dev polling |

## Setup Steps

1. Create bot via @BotFather — see `docs/ceo-agent-telegram-runbook.md`
2. Store token in Bitwarden: `Hermes / Telegram Bot`
3. Get your Telegram user ID (send `/start` to @userinfobot)
4. Run `bash scripts/smoke-ceo-telegram` to verify connectivity
5. Start with polling mode for local dev

## Commands Reference

| Command | Args | Description |
|---|---|---|
| `/status` | — | Show connector health and pending approvals count |
| `/pending` | — | List all actions awaiting CEO approval with IDs |
| `/approve` | `<id>` | Execute the queued action |
| `/reject` | `<id>` | Cancel the queued action |
