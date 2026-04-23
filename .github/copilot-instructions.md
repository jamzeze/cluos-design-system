# Copilot Instructions

- For any UI or design-system refactor in this repository, start from
  `DESIGN-preview.html`.
- Treat `DESIGN-preview.html` as the canonical visual source of truth.
- Treat `DESIGN.md` as the narrative contract that must explain the
  preview, not contradict it.
- If a change modifies the official visual language, update
  `DESIGN-preview.html`, `DESIGN.md`, `DESIGN-WORKFLOW.md`, and any
  relevant token or asset files in the same change.
- Do not invent alternative logo compositions or rename brand assets
  without updating `brand-assets/README.md` and `DESIGN.md`.
- Prefer the shipped SVG assets in `brand-assets/` over redrawing brand
  marks in code.