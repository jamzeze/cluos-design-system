# Design Workflow

This repository is maintained with a preview-first workflow. Visual
refactors should not start from memory or from prose alone.

## Source of truth order

1. `DESIGN-preview.html` — the canonical visual specimen.
2. `DESIGN.md` — the narrative contract that explains the preview.
3. `tokens/` — machine-readable values that must match both.
4. `brand-assets/` — shipped SVG artwork and naming conventions.

If two layers disagree, resolve the conflict in that order.

`guides/` stores raw source artifacts for traceability, but it does not
override the official source-of-truth order above.

## Required refactor flow

1. Open `DESIGN-preview.html` and inspect the closest matching section
   before editing code.
2. Match spacing, radius, typography, color, shadows, and motion to the
   preview.
3. If the refactor changes the official system, update the preview
   first.
4. In the same PR, sync `DESIGN.md`, `tokens/`, and any relevant asset
   docs so the repository has no split brain.
5. Run `npm pack --dry-run` before release or publish-related changes.

## When the preview changes

Any change to `DESIGN-preview.html` is a design-system change, not just
a demo tweak. The same change must update, when relevant:

- `DESIGN.md`
- `tokens/tokens.css`
- `tokens/tokens.ts`
- `tokens/tokens.js`
- `tokens/tailwind-preset.js`
- `brand-assets/README.md`
- `CHANGELOG.md`
- `guides/` when the upstream source files themselves changed

## Hard rules

- Do not create `v3`, `v4`, or side-preview forks. Edit
  `DESIGN-preview.html` in place so there is only one official preview.
- Do not invent new components or states in implementation code unless
  the preview and spec are updated in the same change.
- Do not redraw or reconstruct Cluos marks by hand. Use the shipped SVGs
  in `brand-assets/`.
- Do not leave a visual delta between `DESIGN-preview.html` and
  `DESIGN.md` after merging.

## Validation checklist

- Preview still opens cleanly in a browser.
- Token values still match the preview.
- Asset filenames and usage notes still match `brand-assets/README.md`.
- `npm pack --dry-run` includes `DESIGN-preview.html`, `DESIGN.md`,
  `DESIGN-WORKFLOW.md`, `tokens/`, `brand-assets/`, and `guides/`.

---

## Product UI changes

When the change involves product UI, screens, or interaction patterns:

1. Read `DESIGN.md` — visual identity contract.
2. Read `APPLE-INSPIRED-PRODUCT-UX.md` — UX principles and per-product guidelines.
3. Read `PRODUCT-PATTERNS.md` — patterns for the relevant product type.
4. Check `patterns/` — component specs, templates, states, accessibility.
5. Update `DESIGN-preview.html` if the visual pattern changes.
6. Update tokens only if a new semantic is needed (rare).
7. Update examples if the pattern is new.
8. Update `CHANGELOG.md`.

### Implementation gate

Do not implement a UI screen if it violates any of the following:

- One dominant intention per screen.
- One primary action per visual region.
- Clarity in 3 seconds (user knows: where am I, what is the state, what is next).
- Few buttons — no 4+ primary buttons competing.
- Progressive disclosure — advanced options, logs, and technical detail are collapsed.
- Defined states — loading, empty, and error are mandatory for dynamic components.
- Official tokens — no new hardcoded colors outside `tokens/tokens.css`.

If the screen violates any of these, return to design before implementing.