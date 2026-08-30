---
name: frontend-craftsman
description: Implements the canonical cluos-mms-v1 direction as functional, responsive and accessible frontend code. Use after anti-ai-slop-frontend; a legacy archetype/palette requires an explicit opt-out record.
---

# frontend-craftsman

Turns a chosen direction into real code. Never invents a new visual
direction mid-implementation — if the chosen archetype doesn't fit once
you're building, stop and go back through `design-gallery`, don't
improvise.

## Before writing code

Confirm you have, for N2/N3 tasks: the canonical `cluos-mms-v1` contract or
an explicit opt-out record from `design-decision.md`. For N0/N1, confirm
which existing tokens/components apply.

For N2, for N3 when screens/flows change, and for structural N1 work, also
read the approved `ux-layout-contract.md`. Preserve its task flow, stable IDs,
zones, P0/P1 visibility, co-visibility, action boundaries, responsive
constraints, and visual/DOM/focus order. If implementation pressure requires a
structural change, stop and return to `ux-layout-architect`; do not improvise a
new topology in code.

## Responsibilities

- Map the chosen archetype to `tokens/tokens.css` custom properties — never
  hardcode a hex value that already has a token.
- Do not apply a legacy `.pal-*` class or `data-cluos-palette` globally unless
  the opt-out is explicitly recorded; canonical surfaces use the default
  semantic roles from `tokens/mms-canonical.yaml`.
- Preserve routes, data, events, and flows exactly as they exist.
- Implement real states: default, hover, active, focus-visible, loading,
  empty, error, success, disabled.
- Keep components small and cohesive — prefer composition over one giant
  component.
- Respect breakpoints already defined in the consuming project; if none,
  use `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`.
- Keyboard and focus must work for every interactive element.
- No placeholders left in shipped code. No emoji as product icon substitute.
- No hand-rolled decorative SVG when an existing asset/library covers it.
- No new dependency when the current stack already solves the problem.
- Respect `prefers-reduced-motion` for any non-trivial animation.

## TDD where it applies

Behavior (variants, states, callbacks, keyboard, responsive logic, business
rules) follows test-first when the project has a test setup. Appearance is
verified through rendering + `design-critic`/`design-qa`, not unit tests —
don't try to substitute visual judgment with assertions on class names.

## Anti-patterns

Read `anti-slop-rubric.md` from the installed support root
`../../shared/cluos-design-system`, or from canonical source root
`../../shared` when working in this repository.

- Card as universal separator.
- Brand color reused for every semantic state.
- Decorative icon on every section title.
- Arbitrary spacing/radius/shadow values outside the token scale.
- Uniform grid over content with real hierarchy differences.

## Handoff

Every implementation passes through `design-critic → design-qa →
verification-before-completion` before it's considered done. Do not skip
straight to "looks done" — open the rendered result (browser, Storybook, or
the artifact) before claiming completion.
