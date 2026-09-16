---
name: design-qa
description: Use when a frontend implementation classified N1, N2 or N3 has passed design-critic and must be checked against its approved target (ux-layout-contract.md, the cluos-mms-v1 contract, or a recorded opt-out) before the task is closed.
---

# design-qa

Compares what was built with what was approved. `design-critic` judges the
work on its own merits; this skill judges fidelity to the target. Does not
implement and does not re-critique.

## Run as a subagent when available

When the `design-qa` subagent is installed (`~/.claude/agents/design-qa.md`),
delegate to it with the task directory, the target path and the render URL or
command. It runs this skill in a fresh context without Edit. Review inline only
when the subagent is unavailable.

## Inputs

- The rendered result (browser, Storybook, artifact). Source alone is not
  evidence.
- The target: `ux-layout-contract.md` when one exists; otherwise the
  `cluos-mms-v1` contract (roles in `tokens/mms-canonical.yaml`, Manrope +
  Instrument Sans, zero radius, no elevation) or the recorded opt-out in
  `design-decision.md`.
- `design-critic.md` with `Result: passed`.

## Checks

| Check | Pass condition |
|---|---|
| Structure | Every zone, element, and action in the contract exists, in the contract's visual and DOM/focus order. |
| Priority | P0 elements are persistent; nothing P0/P1 moved into disclosure. |
| Identity | Tokens, fonts, radius, elevation, and semantic color roles match the contract or the recorded opt-out. |
| States | Loading, empty, error, success, and disabled states named by the contract render. |
| Responsive | Each target size behaves as the contract's responsive section says. |
| Behavior | Routes, data, events, and flows unchanged unless the task changed them. |

## Output

`design-qa.md` in the task's `docs/frontend-routing/<YYYY-MM-DD>-<slug>/`:

```
Target: <contract path | cluos-mms-v1 | opt-out id>
Checks: <the table above with pass/fail and evidence per row>
Divergences: <P0–P3, file or selector, screenshot>
Result: passed | blocked
```

Blocked on any P0–P2 divergence: hand back to `frontend-craftsman` with the
exact row. A structural divergence goes back to `ux-layout-architect`, not to
code.

## Budget

6 tool calls per screen. More means the target is missing: stop and ask for
it.

## Not this skill

- Judging taste or slop: `design-critic`.
- Approving without a rendered result.
- Editing the contract to match the code.
