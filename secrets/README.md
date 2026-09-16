# Secrets Management — CluOS Hermes

Bitwarden is the **single source of truth** for all credentials.
No real secret ever touches this repository.

## Architecture

```
Bitwarden Vault "Cluos Infra"
        │
        ├─ bw-export-env.sh ──► .env.local (local dev, gitignored)
        │
        └─ bw-sync-github-secrets.sh ──► GitHub Secrets (CI/CD)
                                         ⚠️ requires CEO approval
```

## Files in This Directory

| File | Purpose |
|---|---|
| `bitwarden-map.yaml` | Declarative map of all secrets: Bitwarden item → env var |
| `README.md` | This file |

## Scripts (in `/scripts/`)

| Script | Purpose |
|---|---|
| `bw-login-check.sh` | Verify Bitwarden CLI is installed and session is active |
| `bw-validate-required-secrets.sh` | Check all required secrets exist in vault (names only, no values printed) |
| `bw-export-env.sh` | Export secrets to `.env.local` for local dev |
| `bw-sync-github-secrets.sh` | Sync vault → GitHub Secrets (requires explicit CEO approval) |

## Quick Start

```bash
# 1. Verify bw CLI is installed and logged in
bash scripts/bw-login-check.sh

# 2. Check all required secrets exist (names only, no values shown)
bash scripts/bw-validate-required-secrets.sh

# 3. Export to local .env.local (gitignored)
bash scripts/bw-export-env.sh

# 4. Validate connectors can read env vars
bash scripts/validate-connectors
```

## Security Rules

- Never print secret values to terminal
- Never commit `.env`, `.env.local`, or any export file
- Never log secret values in CI
- Rotate secrets per schedule in `bitwarden-map.yaml`
- GitHub Secrets sync requires explicit human CEO approval every time

## Bitwarden Item Naming Convention

All Hermes items live in vault **"Cluos Infra"** with names following:

```
Hermes / <Service Name>
```

Examples:
- `Hermes / GitHub PAT`
- `Hermes / Google OAuth`
- `Hermes / Telegram Bot`

## Installing Bitwarden CLI

```bash
# Option 1: npm (cross-platform, no admin required)
npm install -g @bitwarden/cli

# Option 2: winget (Windows)
winget install Bitwarden.CLI

# Option 3: homebrew (macOS)
brew install bitwarden-cli

# Option 4: snap (Linux)
sudo snap install bw
```

After install:
```bash
bw login            # first time — opens browser for auth
bw unlock           # subsequent — enter master password, copy session key
export BW_SESSION="<session-key-from-unlock>"
bw sync
```
