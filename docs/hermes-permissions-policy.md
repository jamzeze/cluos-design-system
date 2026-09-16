# Hermes Permissions Policy

## Scope

Applies to all Hermes connector operations, CEO Agent actions, and automated workflows within CluOS.

---

## Permission Levels

| Level | Label | Description |
|---|---|---|
| 0 | `blocked` | Never executed, even with explicit request |
| 1 | `respond` | Reply to a message or question (no external side effects) |
| 2 | `read` | Read-only external calls (list issues, read emails, fetch pages) |
| 3 | `prepare` | Draft or stage an action for human review before execution |
| 4 | `execute-low-risk` | Write actions with low blast radius (append notes, create draft, add label) |
| 5 | `execute-high-risk` | Write actions that affect production, send messages, create PRs, book meetings |
| 6 | `require-approval` | Blocked until explicit `DEFINIÇÃO DE CEO HUMANO PENDENTE` is resolved |

---

## Default Permission Matrix by Connector

### GitHub

| Action | Level |
|---|---|
| List issues / PRs | read |
| Read file contents | read |
| Create issue | execute-low-risk |
| Create branch | execute-low-risk |
| Open PR | execute-high-risk → require-approval |
| Merge PR | require-approval |
| Push to main | blocked |
| Delete branch | require-approval |
| Modify GitHub Secrets | require-approval |

### Gmail

| Action | Level |
|---|---|
| Read emails | read |
| Search inbox | read |
| Create draft | execute-low-risk |
| Send email | require-approval |
| Delete email | blocked |
| Mark as read / label | execute-low-risk |

### Google Calendar

| Action | Level |
|---|---|
| List events | read |
| Create event (internal) | execute-low-risk |
| Create event (external attendees) | execute-high-risk → require-approval |
| Delete event | require-approval |
| Send calendar invite | require-approval |

### Google Drive / Docs / Sheets

| Action | Level |
|---|---|
| Read file | read |
| List folder | read |
| Create new doc/sheet | execute-low-risk |
| Append rows to sheet | execute-low-risk |
| Edit existing doc | execute-high-risk |
| Delete file | require-approval |
| Share file externally | require-approval |

### Browserbase

| Action | Level |
|---|---|
| Open session / screenshot | read |
| Navigate to URL | execute-low-risk |
| Fill form (internal tools) | execute-low-risk |
| Click confirm / submit (external) | require-approval |
| Purchase / payment flows | blocked |

### Firecrawl

| Action | Level |
|---|---|
| Crawl public URL | read |
| Scrape page content | read |
| Bulk crawl > 100 pages | require-approval |

### Obsidian

| Action | Level |
|---|---|
| Read note | read |
| Append to note | execute-low-risk |
| Create new note | execute-low-risk |
| Delete note | require-approval |
| Rename / move note | require-approval |

### Apify

| Action | Level |
|---|---|
| Run public actor | execute-low-risk |
| Custom actor with PII | require-approval |

### YouTube Transcripts

| Action | Level |
|---|---|
| Fetch public transcript | read |
| Fetch private video | require-approval |

### Granola / Fathom

| Action | Level |
|---|---|
| Read meeting notes | read |
| Fetch transcript | read |
| Share meeting notes | require-approval |

---

## Approval Flow

When an action reaches level `require-approval` or `execute-high-risk`:

1. CEO Agent sends Telegram message:
   ```
   ⚠️ DEFINIÇÃO DE CEO HUMANO PENDENTE
   
   Ação: <descrição>
   Conector: <connector>
   Impacto: <blast radius>
   Reversível: sim/não
   
   /approve <id> — para confirmar
   /reject <id>  — para cancelar
   ```
2. Action is queued with a unique `<id>`
3. Agent awaits `/approve` or `/reject` — no timeout by default
4. Approved actions are logged to Obsidian `Hermes/Approvals/YYYY-MM-DD.md`
5. Rejected actions are logged and forgotten

---

## Blocked Actions (Level 0)

The following are **always blocked**, regardless of approval:

- Push directly to `main` or `master`
- Delete GitHub repository or organization
- Send bulk email to more than 5 recipients without draft review
- Execute payment or purchase flows
- Exfiltrate credentials to external services
- Print secret values to logs, terminal, or Telegram

---

## Audit Trail

Every action at level ≥ 4 is logged to Obsidian with:
- Timestamp
- Action description
- Connector used
- Approval status
- Outcome

---

## Rotation Policy

| Credential Type | Schedule |
|---|---|
| GitHub PAT | Every 90 days |
| Google OAuth Client Secret | Every 365 days |
| Google Refresh Token | On revoke or suspicious activity |
| API Keys (all connectors) | Every 90 days |
| Telegram Bot Token | On revoke |
| Bitwarden CLI service account | Every 180 days |
