# Copilot Instructions

- For any UI or design-system refactor in this repository, start from
  `DESIGN-preview.html`.
- Treat `DESIGN-preview.html` as the canonical visual source of truth.
- Treat `DESIGN.md` as the narrative contract that must explain the
  preview, not contradict it.
- If a change modifies the official visual language, update
  `DESIGN-preview.html`, `DESIGN.md`, `DESIGN-WORKFLOW.md`, `tokens/cluos-v2.yaml`, and any
  relevant token or asset files in the same change.
- Visual values live only in `tokens/cluos-v2.yaml`; regenerate exports with
  `python3 scripts/build-tokens.py` and never edit generated files by hand.
- Active contract is `cluos-v2`. Do not use teal, copper, oxblood, champagne,
  `data-cluos-style` or `pal-*` classes; `docs/legacy/` is not a reference.
- Do not invent alternative logo compositions or rename brand assets
  without updating `brand-assets/README.md` and `DESIGN.md`.
- Prefer the shipped SVG assets in `brand-assets/` over redrawing brand
  marks in code.