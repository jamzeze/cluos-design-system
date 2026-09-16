# Hermes Connectors

Canonical connector registry for the CluOS Hermes agent system.

## Quick Reference

| Connector | Class | Auth | Status |
|---|---|---|---|
| GitHub | required | PAT | `scripts/smoke-connectors --connector github` |
| Google Workspace | required | OAuth2 | `scripts/smoke-connectors --connector google-workspace` |
| Gmail | required | (inherits GWS) | — |
| Google Calendar | required | (inherits GWS) | — |
| Google Drive | required | (inherits GWS) | — |
| Google Docs | required | (inherits GWS) | — |
| Google Sheets | required | (inherits GWS) | — |
| Browserbase | required | API Key | `scripts/smoke-connectors --connector browserbase` |
| Firecrawl | required | API Key | `scripts/smoke-connectors --connector firecrawl` |
| Obsidian | required | Local API Key | `scripts/smoke-connectors --connector obsidian` |
| Apify | recommended | API Token | `scripts/smoke-connectors --connector apify` |
| YouTube Transcripts | recommended | API Key | `scripts/smoke-connectors --connector youtube-transcripts` |
| Granola / Fathom | recommended | API Keys | `scripts/smoke-connectors --connector granola-fathom` |

## Setup Workflow

1. **Install secrets** — populate Bitwarden items listed in `secrets/bitwarden-map.yaml`
2. **Export env** — run `scripts/bw-export-env.sh` to create local `.env.local`
3. **Validate** — run `scripts/validate-connectors`
4. **Smoke test** — run `scripts/smoke-connectors`

## Full Documentation

- Runbook: `docs/hermes-connectors-runbook.md`
- Permissions policy: `docs/hermes-permissions-policy.md`
- Secrets map: `secrets/bitwarden-map.yaml`
- Manifest source: `connectors/manifest.yaml`
