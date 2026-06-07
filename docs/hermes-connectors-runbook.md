# Hermes Connectors — Runbook

> Operational guide for installing, configuring, and troubleshooting each connector.

---

## Prerequisites

- Bitwarden CLI installed (`bw --version`)
- Session unlocked (`export BW_SESSION=$(bw unlock --raw)`)
- Env loaded (`source scripts/bw-export-env.sh` or `.env.local` active)
- Node.js ≥ 18 (for JS-based connectors)

---

## GitHub

**Bitwarden item:** `Hermes / GitHub PAT`

### Setup

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained
2. Scopes: `repo`, `workflow`, `read:org`, `admin:repo_hook`
3. Save token in Bitwarden item `Hermes / GitHub PAT` → password field
4. Run `bash scripts/bw-export-env.sh` to load `GITHUB_TOKEN`

### Healthcheck

```bash
curl -sf -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user | jq .login
```

Expected: your GitHub username.

### Troubleshoot

- 401 → token expired or wrong scopes; regenerate and update Bitwarden
- 403 → missing org scope; ensure `read:org` is set

---

## Google Workspace

**Bitwarden item:** `Hermes / Google OAuth`

### Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create project `cluos-hermes` (or reuse existing)
3. Enable APIs: Gmail, Calendar, Drive, Docs, Sheets
4. Create OAuth 2.0 Client ID (type: Desktop or Web)
5. Download credentials JSON — **do not commit**
6. Store Client ID in Bitwarden field `Client ID`, Client Secret in `Client Secret`
7. Run OAuth flow once to get refresh token:
   ```bash
   # Example using google-auth-library (Node)
   node scripts/google-oauth-init.js  # (if added)
   ```
8. Save refresh token in Bitwarden field `Refresh Token`

### Healthcheck

```bash
curl -sf "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=$(
  curl -sf -X POST https://oauth2.googleapis.com/token \
    -d "client_id=$GOOGLE_CLIENT_ID" \
    -d "client_secret=$GOOGLE_CLIENT_SECRET" \
    -d "refresh_token=$GOOGLE_REFRESH_TOKEN" \
    -d "grant_type=refresh_token" | jq -r .access_token
)" | jq .email
```

### Sub-connectors

All Gmail, Calendar, Drive, Docs, Sheets connectors inherit the same OAuth credentials.
No additional auth steps needed once Google Workspace is configured.

---

## Gmail

Inherits Google Workspace auth.

**Required env:** `GMAIL_DELEGATED_EMAIL`

Use case: read inbox, send emails, label and archive on CEO's behalf.

---

## Google Calendar

Inherits Google Workspace auth.

**Required env:** `GOOGLE_CALENDAR_ID` (default: `primary`)

Use case: read/create events, suggest meeting slots, create meet links.

---

## Google Drive

Inherits Google Workspace auth.

**Required env:** `GOOGLE_DRIVE_ROOT_FOLDER_ID`

Use case: upload briefings, download reports, search files by name.

---

## Google Docs

Inherits Google Workspace auth.

Use case: create documents for briefs, specs, meeting notes.

---

## Google Sheets

Inherits Google Workspace auth.

Use case: read KPI sheets, append rows to pipeline/log sheets.

---

## Browserbase

**Bitwarden item:** `Hermes / Browserbase API Key`

### Setup

1. Create account at [browserbase.com](https://browserbase.com)
2. Copy API Key and Project ID
3. Save in Bitwarden:
   - `password` → API Key
   - `Project ID` → Project ID
4. Run `bw-export-env.sh` to load `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID`

### Login Policy

When a connector needs web login (OAuth, 2FA, session-based):
1. Hermes opens a Browserbase session
2. Sends live URL to CEO via Telegram
3. CEO completes login manually
4. Hermes continues with session cookies — **cookies never stored to disk**

### Healthcheck

```bash
curl -sf -H "x-bb-api-key: $BROWSERBASE_API_KEY" \
  "https://www.browserbase.com/v1/sessions" | jq '.data | length'
```

---

## Firecrawl

**Bitwarden item:** `Hermes / Firecrawl API Key`

### Setup

1. Create account at [firecrawl.dev](https://firecrawl.dev)
2. Copy API Key
3. Save in Bitwarden item `Hermes / Firecrawl API Key` → password
4. Export with `bw-export-env.sh`

### Healthcheck

```bash
curl -sf -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  https://api.firecrawl.dev/v1/crawl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","limit":1}' | jq .success
```

Expected: `true`

---

## Obsidian

**Bitwarden item:** `Hermes / Obsidian REST API Key`

### Setup

1. Install [obsidian-local-rest-api](https://github.com/coddingtonbear/obsidian-local-rest-api) plugin
2. Enable plugin and generate API key in Obsidian settings
3. Save in Bitwarden:
   - `password` → API Key
   - `Vault Path` → absolute path to vault on the machine running Hermes
4. Export with `bw-export-env.sh`

### Healthcheck

```bash
curl -sf -H "Authorization: Bearer $OBSIDIAN_LOCAL_REST_API_KEY" \
  "http://localhost:27123/vault/" | jq .files | head -5
```

### Write Policy

- All Hermes decisions append to `Hermes/Decisions/YYYY-MM-DD.md`
- Destructive edits (delete, rename) require CEO approval flag

---

## Apify

**Bitwarden item:** `Hermes / Apify API Token`

### Setup

1. Create account at [apify.com](https://apify.com)
2. Go to Settings → Integrations → API tokens
3. Save token in Bitwarden → password
4. Export with `bw-export-env.sh`

### Healthcheck

```bash
curl -sf "https://api.apify.com/v2/users/me?token=$APIFY_API_TOKEN" | jq .data.username
```

---

## YouTube Transcripts

**Bitwarden item:** `Hermes / YouTube API Key`

### Setup

1. Enable YouTube Data API v3 in Google Cloud Console
2. Create API Key (restrict to YouTube Data API v3)
3. Save in Bitwarden → password
4. Export with `bw-export-env.sh`

### Note

Public video transcripts can be fetched without an API key using the
`youtube-transcript` npm package. API key is only needed for private video metadata.

### Healthcheck

```bash
curl -sf "https://www.googleapis.com/youtube/v3/videos?part=id&id=dQw4w9WgXcQ&key=$YOUTUBE_API_KEY" | jq .pageInfo.totalResults
```

Expected: `1`

---

## Granola / Fathom

**Bitwarden items:** `Hermes / Granola API Key`, `Hermes / Fathom API Key`

### Setup

- **Granola:** sign in at granola.ai, go to Settings → API → generate key
- **Fathom:** sign in at fathom.video, go to Settings → API → generate key
- Save each in respective Bitwarden items
- Export with `bw-export-env.sh`

### Note

Configure whichever service is actively used. Both are optional.
Hermes will skip gracefully if keys are absent.

---

## Smoke Test All Connectors

```bash
bash scripts/smoke-connectors
```

Runs non-destructive checks on every connector that has credentials present.
Skips recommended connectors if their keys are absent.

## Validate Connector Config

```bash
bash scripts/validate-connectors
```

Validates `connectors/manifest.yaml` schema and checks all required env vars are set.
Does not make network calls.
