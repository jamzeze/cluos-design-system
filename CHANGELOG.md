# Changelog

All notable changes to the Cluos design system are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com).

## [0.1.1] — Preview-first workflow and shipped assets

### Added
- Official `DESIGN-preview.html` as the canonical visual reference for
  refactors.
- `DESIGN-WORKFLOW.md` to define the sync order between preview,
  markdown spec, tokens, and assets.
- Shipped SVG assets in `brand-assets/`, including the official stacked
  lockups, symbol marks, favicon, and mono convenience variants.
- Repository-level agent instructions so UI refactors start from the
  preview instead of inventing new patterns.

### Changed
- `DESIGN.md` now documents the preview-first workflow and the actual
  stacked logo assets that ship in the package.
- `README.md` and package exports now expose the preview and workflow
  docs alongside the tokens.

## [0.1.0] — Initial release

### Added
- Official Cluos brand palette from `Paleta de Cores_CluOs.pdf`:
  teal #008080, navy #1B2F36, black #1D1D1B, champagne #C8C1AE,
  silver #B5B4B5, white #FFFFFF.
- Derived UI state colors: `teal-deep` #006666, `teal-soft` #4DA3A3.
- Semantic status colors (muted oxblood for error, light copper for
  warn) chosen to belong with the core palette.
- Full typography scale in Inter + JetBrains Mono.
- Spacing, radius, shadow, and motion tokens.
- Tailwind preset, CSS variables, TypeScript/JavaScript token exports.
- Brand assets directory with canonical filename convention and
  mapping guide for the source SVGs.
- DESIGN.md source of truth for LLMs.