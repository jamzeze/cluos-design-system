---
name: frontend-craftsman
description: Use when anti-ai-slop-frontend has classified a task N0, N1, N2 or N3 and the code must now be written, or when an existing CluOS frontend implementation must change without changing its approved structure or visual direction.
---

# frontend-craftsman

Turns an approved direction into code. Never invents a visual direction or a
screen structure while building: a structural change goes back to
`ux-layout-architect`; a direction change goes through a recorded opt-out.

## Support files

`anti-slop-rubric.md` from `../../shared/cluos-design-system` (installed
client) or `../../shared` (canonical checkout).

## Before writing code

| Level | Confirm |
|---|---|
| N0 | which existing tokens and components apply |
| N1 | the same, plus the approved `ux-layout-contract.md` when the task's `routing.md` names one |
| N2, N3 | the `cluos-mms-v1` contract or the recorded opt-out in `design-decision.md`, plus the approved `ux-layout-contract.md` |

Preserve the contract's task flow, stable IDs, zones, P0/P1 visibility,
co-visibility, action boundaries, responsive rules, and visual/DOM/focus
order.

## Rules

- Every value that has a token in `tokens/tokens.css` uses the token. No
  hardcoded hex, spacing, radius, or shadow outside the scale.
- No global legacy `.pal-*` class or `data-cluos-palette` without a recorded
  opt-out; canonical surfaces use the semantic roles of
  `tokens/mms-canonical.yaml`.
- Routes, data, events, and flows stay exactly as they are unless the task
  changes them.
- States: default, hover, active, focus-visible, loading, empty, error,
  success, disabled.
- Keyboard and focus work for every interactive element.
  `prefers-reduced-motion` is respected for any non-trivial animation.
- Breakpoints: the project's; if none, `sm 640 / md 768 / lg 1024 / xl 1280 /
  2xl 1536`.
- Small, composed components. No new dependency when the stack already solves
  it. No placeholder in shipped code, no emoji as icon, no hand-rolled
  decorative SVG when an asset exists.
- Behavior (variants, states, callbacks, keyboard, responsive logic, business
  rules) is test-first when the project has a test setup. Appearance is
  verified by rendering, never by asserting class names.

## Banned by default

Card as universal separator; brand color reused for every semantic state;
decorative icon on every section title; arbitrary spacing, radius, or shadow;
uniform grid over content with real hierarchy differences. Full list in
`anti-slop-rubric.md`.

## Handoff

`N0`: open the rendered result, then done. `N1` and above: `design-critic →
design-qa → verification-before-completion`. Never claim completion from a
passing build.
