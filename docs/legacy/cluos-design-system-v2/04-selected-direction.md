# 04 — Selected Direction

> Historical record from 2026-08-10. Superseded on 2026-08-30 by the global
> `cluos-mms-v1` contract. New products inherit MMS Swiss Ledger; the options
> below remain only as explicit compatibility opt-outs.

## The decision, stated precisely

There is **no single selected direction**. On 2026-08-10 Rafael reviewed
all seven mocked archetypes and:

1. Approved six (A, B, C, D, E, G), rejected one (F · Grid Manifest).
2. Explicitly requested to keep choosing style **per task, at build time**
   ("quero escolher cada vez"), rather than committing this design system
   to one canonical visual identity.
3. Requested the same for color: more palette variations, chosen
   independently of style, live-previewable before committing.

This is recorded as the authoritative decision in
`agent-skills/profiles/cluos/design-decisions.yaml` (three dated entries)
and governs how every subsequent piece of this refactor was scoped.

## Why this changes the shape of "the CluOS Design System refactor"

The source metaprompt's Section 27 gate format assumes the end state is
"pick one direction, migrate toward it." That end state does not exist
here. What replaces it:

- The **library** (6 archetypes, `design-archetypes.yaml`) and the
  **palette registry** (7 palettes, `palette-policy.md`) are the permanent,
  reusable deliverable — not a means to a single answer.
- `anti-ai-slop-frontend`'s N2/N3 flow is written to *require* a
  per-task style+palette choice, never assume a default (see that skill's
  "Hard gates").
- Subproject D (token/component refactor) ships the **architecture that
  makes any archetype+palette combination possible**, not a migration of
  real screens toward one look — because there was never a single look to
  migrate toward, and (independently) no real product surface currently
  imports this package to migrate (see `00-baseline.md`).

## What a default recommendation still exists for, and why it's not binding

`agent-skills/shared/design-archetypes.yaml` and the original gallery
carried a recommendation (B as the operational default, G as its dark
mode, C for reports) formed before Rafael's "escolher cada vez" instruction.
That recommendation is kept as a *documented starting suggestion* inside
`design-gallery`'s skill body — useful as a fast path when nobody has a
strong opinion — but it is explicitly non-binding. Every N2/N3 task still
requires an explicit choice; the router must never silently apply the
recommendation as a default.

## Section 26 acceptance criteria that do not apply here

Reported honestly rather than silently skipped:

- "A direção foi escolhida" — not applicable; six directions are live by
  design.
- "A paleta foi escolhida" — not applicable; seven palettes are live by
  design, chosen per task.
- "As superfícies do escopo foram migradas" — not applicable; zero real
  product surfaces were in scope (see consumer blast-radius finding in
  `00-baseline.md`). The architecture is shipped and ready for the first
  real surface whenever one is chosen.
