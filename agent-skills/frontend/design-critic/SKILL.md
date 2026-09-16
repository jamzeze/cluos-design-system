---
name: design-critic
description: Use when a frontend implementation classified N1, N2 or N3 by anti-ai-slop-frontend has been rendered and must be judged on its own merits for AI-slop patterns, hierarchy, identity, consistency and usability, before design-qa.
---

# design-critic

Independent critique of the rendered work against `anti-slop-rubric.md`. Not
a comparison with the approved target; that is `design-qa`. Does not
implement.

## Support files

`anti-slop-rubric.md` from `../../shared/cluos-design-system` (installed
client) or `../../shared` (canonical checkout): identity test, 50-point
rubric, severity scale.

## Run as a subagent when available

When the `design-critic` subagent is installed (`~/.claude/agents/design-critic.md`,
synced from `agent-skills/agents/`), delegate to it with the task directory and
the render URL or command. It runs this skill in a fresh context without Edit,
so the author's reasoning cannot anchor the verdict. Review inline only when
the subagent is unavailable.

## Workflow

1. Open the rendered result. Source alone is not evidence.
2. Run the identity test (7 questions).
3. Score the 10 dimensions, 0–5 each, with evidence (file, selector,
   screenshot) per score.
4. Classify every finding P0–P3.
5. Write `design-critic.md` in the task's
   `docs/frontend-routing/<YYYY-MM-DD>-<slug>/`:

```
Score: <total>/50, lowest dimension: <name> <n>/5
Findings: <P0–P3, evidence, impact, concrete fix, file or selector>
Result: passed | blocked
```

## Bar

Total ≥ 42/50, no dimension below 4, zero open P0/P1/P2. The score never
replaces judgment.

## On P0/P1/P2

Block. Hand back to `frontend-craftsman` with the concrete fix. After the fix:
re-render, re-review, append to the same `design-critic.md` instead of
overwriting the earlier verdict.

## Not this skill

- Comparison with the contract or mockup: `design-qa`.
- Fixing anything.
- Approving N2/N3 work that has neither the `cluos-mms-v1` contract nor a
  recorded opt-out: flag it as a process failure and stop.

## Budget

8 tool calls per screen. More means the render is not available: stop and
ask for it.
