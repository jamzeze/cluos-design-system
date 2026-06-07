# CEO Agent Telegram — Runbook

## Prerequisites

- Telegram account with Bot API access
- `TELEGRAM_BOT_TOKEN` in Bitwarden (`Hermes / Telegram Bot`)
- Your numeric Telegram user ID stored in `TELEGRAM_ALLOWED_USER_IDS`
- All connector secrets loaded (run `scripts/bw-export-env.sh`)
- Node.js ≥ 18 or Python ≥ 3.11 (depending on runtime implementation)

---

## Step 1 — Create Your Telegram Bot

1. Open Telegram → search `@BotFather`
2. Send `/newbot`
3. Follow prompts: name = `CluOS Hermes`, username = `cluos_hermes_bot` (or similar)
4. Copy the token shown
5. Save in Bitwarden: `Hermes / Telegram Bot` → password field
6. **Do not share this token**

---

## Step 2 — Find Your Telegram User ID

Send a message to `@userinfobot` on Telegram — it replies with your numeric ID.

Alternatively:
```bash
curl -sf "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getUpdates" | jq '.result[0].message.from.id'
```
(send any message to your bot first, then run this command)

Save the numeric ID in:
- Bitwarden: `Hermes / Telegram Bot` → `Allowed User IDs` field
- `.env.local`: `TELEGRAM_ALLOWED_USER_IDS=<your-id>`

---

## Step 3 — Load Secrets

```bash
bash scripts/bw-login-check.sh
bash scripts/bw-export-env.sh
source .env.local
```

---

## Step 4 — Validate Agent Config

```bash
bash scripts/validate-ceo-agent
```

Expected output:
```
✓ TELEGRAM_BOT_TOKEN is set
✓ TELEGRAM_ALLOWED_USER_IDS is set
✓ HERMES_API_URL is set
✓ CEO_AGENT_MODE is set
✓ Agent config valid
```

---

## Step 5 — Smoke Test (without exposing token)

```bash
bash scripts/smoke-ceo-telegram
```

This script:
- Verifies bot token is valid (checks Telegram API `/getMe`)
- Confirms bot username without printing the token
- Does NOT send any message unless you pass `--send-test`

---

## Step 6 — Start the Agent

### Polling mode (local development)

```bash
# Load env and start polling worker
source .env.local
node telegram/polling-worker.js
```

### Webhook mode (production)

Set the webhook URL:
```bash
curl -sf -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -d "url=https://hermes.cluos.online/telegram/webhook"
```

Deploy the webhook handler (see `telegram/webhook.example`).

---

## Using the Bot

Once the agent is running, send messages to your bot in Telegram:

```
You: Lista os issues abertos no repo cluos-design-system
Bot: Encontrei 3 issues abertos:
     #9 — Implement design tokens ...
     #10 — Add accessibility guide ...
     (continua...)

You: /status
Bot: ✅ Sistema operacional
     GitHub: conectado
     Obsidian: conectado
     Google Workspace: ⚠️ token expirando em 7 dias
     Pendentes: 0 ações aguardando aprovação

You: Cria um rascunho de email para João sobre a reunião de segunda
Bot: ⚠️ DEFINIÇÃO DE CEO HUMANO PENDENTE
     Ação: Criar rascunho de email (Gmail)
     ...
     /approve abc123 — confirmar
     /reject abc123  — cancelar
```

---

## Troubleshooting

### Bot not responding

1. Check token: `curl -sf "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe"`
2. Verify your user ID is in `TELEGRAM_ALLOWED_USER_IDS`
3. Check polling worker / webhook is running
4. Check logs for connection errors

### "Unauthorized sender" (bot ignores messages)

Your Telegram user ID is not in `TELEGRAM_ALLOWED_USER_IDS`. Add it and restart the agent.

### Connector errors

Run `bash scripts/smoke-connectors --connector <name>` for the failing connector.

### Approval actions not executing

Check pending queue: send `/pending` to the bot.
If the action ID is there, send `/approve <id>`.

---

## Stopping the Agent

```bash
# Polling mode
Ctrl+C

# Webhook mode — delete webhook
curl -sf -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/deleteWebhook"
```

---

## Production Checklist

- [ ] `CEO_AGENT_MODE=approval` (never `auto` in production)
- [ ] `CEO_AGENT_APPROVAL_REQUIRED=true`
- [ ] Webhook uses HTTPS with valid certificate
- [ ] Bot token stored in GitHub Secrets, not `.env.local`
- [ ] Telegram user ID validated
- [ ] Obsidian vault path mounted and writable
- [ ] Log rotation configured
- [ ] All connector healthchecks passing
