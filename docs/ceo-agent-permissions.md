# CEO Agent — Permissions Policy

## Access Levels

The CEO Agent enforces a six-level permission system on every action:

| Level | Name | Requires Approval | Examples |
|---|---|---|---|
| 0 | blocked | N/A — never executes | Push to main, bulk email, payment flows |
| 1 | respond | No | Answer a question, explain a concept |
| 2 | read | No | List GitHub issues, read emails, fetch page |
| 3 | prepare | No | Draft email, stage PR description, plan task |
| 4 | execute-low-risk | No (auto) / Yes (approval mode) | Create issue, append Obsidian note, add label |
| 5 | execute-high-risk | Always | Send email, open PR, create calendar invite with external attendees |
| 6 | require-approval | Always | Merge PR, modify secrets, delete resources |

---

## Telegram Identity Verification

- Only numeric Telegram user IDs listed in `TELEGRAM_ALLOWED_USER_IDS` can issue commands
- Every incoming message validates the sender before any processing
- Unknown sender → silently ignored (no error reply that confirms bot existence)
- Multi-user support: comma-separated IDs in env var

---

## Approval Gate Protocol

When an action requires approval, the agent sends:

```
⚠️ DEFINIÇÃO DE CEO HUMANO PENDENTE

Ação solicitada: <descrição em português>
Conector: <nome do conector>
Risco: <execute-high-risk | require-approval>
Reversível: <sim / não / parcialmente>
Impacto estimado: <descrição>
ID da ação: <uuid>

Responda:
  /approve <uuid>  — para executar
  /reject <uuid>   — para cancelar
```

- Actions expire after 24h if not approved or rejected
- Expired actions are logged as `abandoned`
- The agent never auto-retries expired approvals

---

## Risk Classification Rules

### Automatically Blocked (Level 0)

These are hardcoded in the risk policy and cannot be overridden:

1. `git push` to `main` or `master`
2. Delete GitHub repository or organization
3. Send email to > 5 external recipients without draft review
4. Execute payment, purchase, or billing flows
5. Expose secret values in any output channel
6. Create or modify GitHub Actions secrets without explicit approval flow

### High-Risk Triggers (Levels 5–6)

Any action matching these patterns is escalated:

- Sends communication to external parties (email, calendar invite, Slack)
- Creates or merges a pull request
- Modifies production configuration
- Accesses private data (non-public repos, personal Drive files)
- Uses Browserbase to interact with authenticated sessions
- Writes to shared spreadsheets used as production data sources

### Low-Risk Actions (Level 4)

- Create GitHub issue in owned repos
- Append text to existing Obsidian notes
- Create new Obsidian note
- Add GitHub label to issue
- Create draft email (not sent)
- Read-only Firecrawl / Apify / YouTube calls
- Fetch transcript from YouTube

---

## Connector-Specific Overrides

| Connector | Override | Reason |
|---|---|---|
| Obsidian | append = low-risk, delete = blocked | Audit log integrity |
| Gmail | send = require-approval | Prevent accidental emails |
| GitHub | push to main = blocked | Branch protection |
| Browserbase | payment flows = blocked | Financial safety |

---

## Logging and Accountability

- All level ≥ 4 actions are written to Obsidian audit log
- Approval decisions (approve / reject) are logged with timestamp
- Failed actions (errors from connectors) are logged with error details
- Log rotation: daily files, kept indefinitely in vault

---

## Changing Permissions

Permission levels are defined in `agents/ceo/prompts/risk-policy.md`.
Changes require:
1. Edit to the file in this repository
2. Code review (PR)
3. Deployment to the agent runtime

No runtime override is possible — the policy is baked into the prompt.
