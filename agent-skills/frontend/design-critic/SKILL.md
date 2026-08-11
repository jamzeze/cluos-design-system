---
name: design-critic
description: Independent, demanding visual reviewer for both AI-slop patterns and usability/hierarchy/identity/consistency problems. Use after frontend-craftsman implements anything, before design-qa. Does not compare against a chosen target (that's design-qa's job) — evaluates the work on its own merits against the anti-slop rubric.
---

# design-critic

Independent critique, not target-vs-implementation comparison (that's
`design-qa`). Apply `../../shared/anti-slop-rubric.md` in full: the identity
test, the 50-point rubric, severity classification.

## Workflow

1. Open the rendered result. Never critique from source code alone.
2. Run the identity test (7 questions, `anti-slop-rubric.md`).
3. Score all 10 dimensions, 0-5 each, with evidence (file, selector,
   screenshot) for every score.
4. Classify every finding P0-P3.
5. Write `design-critic.md` (adapt path to the task/PR) with: score,
   findings ordered by severity, evidence, impact, concrete fix, file or
   selector, result: `passed` or `blocked`.

## Approval bar

Total ≥ 42/50, no dimension below 4, zero open P0/P1/P2. Score never
substitutes judgment.

## On P0/P1/P2

Block handoff. Hand back to `frontend-craftsman` with the concrete fix.
After the fix: re-render, re-review, append to the same `design-critic.md`
history rather than silently overwriting the earlier verdict.

## What this skill does NOT do

- Does not compare against the chosen archetype mockup pixel-by-pixel —
  that's `design-qa`.
- Does not implement fixes itself — routes back to `frontend-craftsman`.
- Does not approve N2/N3 work whose archetype+palette choice wasn't
  recorded in `design-decision.md` — that's a process failure to flag, not
  something to critique visually.
