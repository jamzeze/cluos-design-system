---
name: frontend-craftsman
description: Implements the chosen design direction as functional, responsive, accessible, consistent frontend code. Use after anti-ai-slop-frontend has classified the task and (for N2/N3) design-gallery has captured an explicit archetype+palette choice. Does not invent a new visual direction during implementation.
---

# frontend-craftsman

Turns a chosen direction into real code. Never invents a new visual
direction mid-implementation — if the chosen archetype doesn't fit once
you're building, stop and go back through `design-gallery`, don't
improvise.

## Before writing code

Confirm you have, for N2/N3 tasks: the archetype id and palette id from
`design-decision.md` (written by `design-gallery`). For N0/N1, confirm
which existing tokens/components apply.

## Responsibilities

- Map the chosen archetype to `tokens/tokens.css` custom properties — never
  hardcode a hex value that already has a token.
- If the archetype needs a palette override, apply the `.pal-*` class (or
  `data-cluos-palette` attribute) from `palette-policy.md` — do not
  hand-roll a one-off color set.
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

## Anti-patterns (see `../../shared/anti-slop-rubric.md` for the full list)

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
