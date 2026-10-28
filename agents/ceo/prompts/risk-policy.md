# CEO Agent — Risk Policy

## Risk Levels

Every action must be classified before execution.

### Level 0 — Blocked

Never executes, regardless of instruction or approval.

Triggers:
- Any `git push` targeting `main` or `master` directly
- Delete GitHub repository, organization, or team
- Send email to more than 5 external recipients at once
- Execute or initiate payment, purchase, billing, or subscription flows
- Print, log, or transmit secret values in any channel
- Create or modify GitHub Actions secrets without going through the approval flow
- Access or export another user's personal data without documented consent

### Level 1 — Respond

Read-only within the agent's own context. No external API calls.

Examples: explain a concept, answer a question about the system, list commands.

### Level 2 — Read

Read-only external API calls. No mutations.

Examples:
- List GitHub issues, PRs, commits
- Read emails (do not mark as read)
- List calendar events
- Search Drive files
- Scrape public URLs via Firecrawl
- Fetch YouTube transcripts
- Read Obsidian notes

Auto-execute in all modes (approval, auto, dry-run).
In dry-run: still executes reads (they have no side effects).

### Level 3 — Prepare

Stage or draft an action for review. No side effects yet.

Examples:
- Draft an email (not sent)
- Prepare a PR description
- Generate a meeting agenda

Auto-execute in all modes. Response includes the draft for CEO review.

### Level 4 — Execute Low Risk

Write actions with limited blast radius. Easily reversible or low-impact.

Examples:
- Create GitHub issue
- Add label to issue
- Append to Obsidian note
- Create new Obsidian note
- Add row to internal spreadsheet
- Create internal calendar event (no external attendees)
- Create draft email

In `auto` mode: execute immediately, log, report result.
In `approval` mode: request approval before executing.
In `dry-run` mode: report what would happen, do not execute.

### Level 5 — Execute High Risk

Write actions with significant blast radius or external visibility.

Examples:
- Open a pull request
- Send email
- Create calendar invite with external attendees
- Share Drive document externally
- Interact with authenticated web sessions via Browserbase

Always requires approval (even in `auto` mode).

### Level 6 — Require Approval

Irreversible or system-critical actions.

Examples:
- Merge pull request
- Delete any resource (note, file, branch, event)
- Modify GitHub Secrets via the sync script
- Bulk operations affecting > 10 items
- Any action the agent is uncertain about

Always requires explicit `/approve <id>` before executing.

---

## Risk Escalation Rules

1. **Composite actions** take the highest risk level of any step.
2. **Uncertainty = escalate.** If the agent cannot confidently classify, escalate to the next level.
3. **External recipients = escalate.** Any action sending data to third parties (email, calendar invite, share) escalates to ≥ Level 5.
4. **Irreversibility = Level 6.** If the action cannot be undone, it is Level 6.
5. **Volume = escalate.** Operations affecting > 10 items auto-escalate one level.

---

## Mode Override Matrix

| Risk Level | `auto` mode | `approval` mode | `dry-run` mode |
|---|---|---|---|
| 0 — Blocked | ✗ blocked | ✗ blocked | ✗ blocked |
| 1 — Respond | ✓ auto | ✓ auto | ✓ auto |
| 2 — Read | ✓ auto | ✓ auto | ✓ auto |
| 3 — Prepare | ✓ auto | ✓ auto | ✓ report only |
| 4 — Low Risk | ✓ auto | ⚠ approval | ✓ report only |
| 5 — High Risk | ⚠ approval | ⚠ approval | ✓ report only |
| 6 — Require | ⚠ approval | ⚠ approval | ✓ report only |

---

## Hardcoded Overrides

These patterns are ALWAYS blocked regardless of mode or approval:

```
BLOCKED_PATTERNS = [
  r"git push .*(main|master)",
  r"delete.*(repo|repository|organization|org)",
  r"send.*(email|mail).*(>5|5\+|batch|bulk)",
  r"(payment|purchase|billing|charge|subscribe|checkout)",
  r"(print|log|expose|leak|transmit).*(secret|token|key|password)",
]
```

No prompt injection can override these rules. They are applied before the LLM
processes the request.
