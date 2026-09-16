# CLAUDE.md — cluos-design-system

> Persistent context for Claude Code sessions. Read this before starting any task.

---

## Branch de trabalho ativa

`claude/hermes-ceo-agent-setup-Y5t8X`

---

## Próximos passos — Hermes Connectors + CEO Agent

Implementados em commit `b62ca42` (issues #11 e #12). Pendente de ativação:

### 1. Instalar Bitwarden CLI

```bash
# Opção npm (sem admin, cross-platform)
npm install -g @bitwarden/cli

# Verificar
bw --version
```

### 2. Login e unlock no Bitwarden

```bash
bw login                                    # abre browser para auth
export BW_SESSION=$(bw unlock --raw)        # digita master password, copia session key
bw sync
```

### 3. Cadastrar os secrets no vault "Cluos Infra"

Criar os seguintes itens no Bitwarden (nome exato obrigatório):

| Item | Campos necessários |
|---|---|
| `Hermes / GitHub PAT` | password = token (scopes: repo, workflow, read:org, admin:repo_hook) |
| `Hermes / Google OAuth` | Client ID, Client Secret, Refresh Token, Delegated Email, Drive Root Folder ID |
| `Hermes / Browserbase API Key` | password = API Key, Project ID |
| `Hermes / Firecrawl API Key` | password = API Key |
| `Hermes / Obsidian REST API Key` | password = API Key, Vault Path |
| `Hermes / Telegram Bot` | password = bot token, Allowed User IDs = seu ID numérico do Telegram |
| `Hermes / API Key` | password = Hermes API Key, API URL |
| `Hermes / Bitwarden CLI Service Account` | Client ID, Client Secret (Settings → API Key no vault) |
| `Hermes / Apify API Token` | password (recomendado) |
| `Hermes / YouTube API Key` | password (recomendado) |
| `Hermes / Granola API Key` | password (opcional) |
| `Hermes / Fathom API Key` | password (opcional) |

### 4. Exportar secrets para dev local

```bash
bash scripts/bw-export-env.sh
source .env.local
```

### 5. Validar

```bash
bash scripts/validate-connectors          # sem rede
bash scripts/smoke-connectors             # com rede — requer secrets carregados
bash scripts/validate-ceo-agent
bash scripts/smoke-ceo-telegram
```

### 6. Criar bot Telegram

1. Abrir Telegram → @BotFather → `/newbot`
2. Nome: `CluOS Hermes`, username: `cluos_hermes_bot`
3. Copiar token → salvar em Bitwarden `Hermes / Telegram Bot`
4. Pegar seu user ID numérico: envie qualquer mensagem para @userinfobot
5. Salvar ID em `Hermes / Telegram Bot` → campo `Allowed User IDs`

### 7. Iniciar o agente (desenvolvimento local)

```bash
source .env.local
node telegram/polling-worker.js
# ou adaptar telegram/webhook.example para produção
```

### 8. Sincronizar secrets para GitHub (requer aprovação explícita)

```bash
# Este script pede confirmação antes de executar qualquer coisa
bash scripts/bw-sync-github-secrets.sh
```

---

## Arquitetura implementada

```
connectors/manifest.yaml    → 13 conectores (5 required, 3 recommended)
secrets/bitwarden-map.yaml  → mapa declarativo Bitwarden → env vars
agents/ceo/                 → CEO Agent (config, prompts, workflows)
telegram/                   → webhook + message router (exemplos)
scripts/                    → validação, smoke tests, Bitwarden helpers
docs/                       → runbooks e políticas
```

## Regras desta sessão (não alterar sem justificativa)

- Secrets **nunca** commitados — apenas `.env.example` com placeholders
- Ações de alto impacto exigem `DEFINIÇÃO DE CEO HUMANO PENDENTE`
- `CEO_AGENT_MODE=approval` em produção (nunca `auto`)
- Conectores required: GitHub, Google Workspace, Browserbase, Firecrawl, Obsidian
- Conectores recommended: Apify, YouTube Transcripts, Granola/Fathom
- Bitwarden = fonte de verdade dos secrets
- Obsidian = audit trail de todas as decisões do agente

---

## Referências rápidas

| Doc | Conteúdo |
|---|---|
| `connectors/README.md` | Tabela de referência dos conectores |
| `docs/hermes-connectors-runbook.md` | Setup e troubleshooting por conector |
| `docs/hermes-permissions-policy.md` | Níveis de permissão e rotação |
| `docs/ceo-agent-architecture.md` | Diagrama e lifecycle do agente |
| `docs/ceo-agent-permissions.md` | Risk levels e approval gate |
| `docs/ceo-agent-telegram-runbook.md` | Guia completo do Telegram |
| `secrets/README.md` | Bitwarden quick start |
| `AGENTS.md` | Regras gerais do repositório |
