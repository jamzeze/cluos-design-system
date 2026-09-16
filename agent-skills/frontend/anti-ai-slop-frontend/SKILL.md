---
name: anti-ai-slop-frontend
description: Use when a change alters what a user sees or operates in a CluOS interface — appearance, layout, hierarchy, tokens, typography, color, motion, a component, a screen or a flow (PT triggers: tela, página, componente, layout, CSS, Tailwind, tema, design system, responsivo, tipografia, paleta, dashboard, formulário, tabela, modal, redesign, "deixar mais premium"). Not for backend, API, data or domain logic whose only visible effect is a different rendered value.
---

# anti-ai-slop-frontend

Router. Classifies the depth of a frontend task and names the skills that run
next. Does not implement, critique, or choose a visual direction.

## Trigger

- The change alters appearance, placement, hierarchy, a token, typography,
  palette, motion, a component, a screen, or a flow.
- The request uses interface vocabulary (see description).

## Non-trigger

- Domain rule, state, data, calculation, or geometry that only yields a
  different rendered value: classify `N-skip` and exit the chain.
- Backend, API, database, infrastructure, or tests without an interface.
- Review of something already built: call `design-critic` or `design-qa`
  directly.

## Support files

Resolve once, before reading anything: the installed client uses
`../../shared/cluos-design-system` and
`../../profiles/cluos-design-system/cluos`; the canonical checkout uses
`../../shared` and `../../profiles/cluos`. Use the first complete pair; stop
if either half is missing. Read `routing-matrix.yaml` now. Read any other
support file only when the level's `loads` column names it.

## Classify

Answer in order; the first true row sets the level.

| If the change… | Level |
|---|---|
| alters no token, zone, order, hierarchy, typography, palette, motion, or shared component | `N-skip` |
| alters the appearance of an existing element without a new component, zone, or token | `N0` |
| creates or refactors a component or section | `N1` |
| creates or redesigns a whole screen or flow | `N2` |
| alters the design system, the global palette, or a shared primitive | `N3` |

Target surface unclear: ask one question. Do not guess a level.

## Fixed rules

- Direction is `cluos-mms-v1` (Rafael, 2026-08-30). Any other direction needs
  an opt-out recorded in the task's `design-decision.md` and in the profile's
  `palette-decisions.yaml`.
- Completion requires the rendered result open. A passing build is not
  inspection.
- Real product behavior is never replaced by a static image.
- No output reproduces a pattern banned in `anti-slop-rubric.md`.

## Output

`N-skip` and `N0`: one line in the response, `Nível: <level> — <predicate
that matched>`. No file.

`N1` and above: `docs/frontend-routing/<YYYY-MM-DD>-<slug>/routing.md` in the
consuming repo, with exactly these fields:

```
Level: N1 | N2 | N3
Why: <the predicate row that matched>
Skills: <the level's flow, in order>
Loads: <support files read>
Layout contract: required | not applicable | <path>
```

Every later artifact of the task (`ux-layout-contract.md`,
`design-decision.md`, `design-critic.md`, `design-qa.md`) goes in the same
directory.

## Handoff

Follow the level's `flow` in `routing-matrix.yaml`. `N-skip`: implement under
the repo's engineering rules and open the render. `N0`: `frontend-craftsman`,
then open the render. `N1` and above: `design-critic → design-qa →
verification-before-completion` close the task; run the two reviewers as the
`design-critic` and `design-qa` subagents when they are installed. `N3`:
`design-system-refactor-director` leads.

## Budget

Classifying takes at most 4 tool calls: read the matrix, read the target,
look at the current render, write the output. Needing more means the surface
is unclear: ask.

## Stop

- `N2`/`N3` without the `cluos-mms-v1` contract and without a recorded
  opt-out: restore the default before implementing.
- `N2`, or `N3` that changes screens or flows, without an approved
  `ux-layout-contract.md`: run `ux-layout-architect` before any code.
- A request that would replace production behavior with a mock: stop and
  clarify.
