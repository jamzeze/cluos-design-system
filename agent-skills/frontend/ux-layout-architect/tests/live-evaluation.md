# Live evaluation record

Date: 2026-08-17

## Scope

Fresh read-only agents evaluated synthetic prompts against the canonical or
installed skill. These were specification/read-through evaluations, not an
end-to-end runtime-dispatch conformance suite. No patient data, repository
mutation, rendered interface, clinician, or usability participant was used.

## Baseline

Without the skill, fresh agents could produce plausible layouts for a duplex
workbench, complex form, and dense dashboard when the prompt itself supplied a
detailed checklist. The outputs did not share a stable contract or lifecycle.
This baseline does not support a claim that the skill improves usability or
model quality; the intended value is repeatable routing, structure, safety
boundaries, and handoff semantics.

## Skill-assisted evaluations

| Evaluation | Result | What was checked |
|---|---:|---|
| Azigos duplex workbench | 12/12 | Task/risk framing, P0–P3, coordinated report/map views, zones, DOM/focus order, states, honest handoff |
| Dense operational dashboard | 12/12 | Scope/selection, table-first coordinated topology, keyboard behavior, destructive-action boundary, responsive limits |
| Guardrails, first pass | 13/14 | Activation, non-activation, untrusted content, read-only/write effects, stops, budget; exposed incomplete rule-level identity |
| Guardrails after stable rule IDs | 12/14 | Independent review exposed delegated activation documentation and stale approval after structural revision |
| Final guardrails after activation/approval fixes | 14/14 | Sole implicit router, prompt injection, one-file authority, stable upsert/no-op, provisional revisions, direct approval attribution/time |

The final 14-point rubric gave two points each for activation boundary,
untrusted-content handling, effect authorization, one-question/stop behavior,
stable rule-ID upsert/no-op, approval authority/attribution/time, and
budget/retry semantics.

## Remaining validation

- Runtime dispatch has not been validated through real automatic-invocation
  sessions in both Codex and Claude.
- No rendered Azigos screen has been inspected against a layout contract.
- No representative clinician has completed realistic, interrupted duplex,
  anamnesis, ordering, prescribing, or signing tasks.
- The skill is not evidence of clinical safety, regulatory compliance, or
  measured usability improvement.
