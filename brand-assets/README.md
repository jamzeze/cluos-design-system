# Brand Assets

These files now ship with the package. Consumers should use the SVGs in
this folder directly instead of manually downloading and renaming assets.

## Shipped files

| Filename                    | Type                                  | Provenance |
| --------------------------- | ------------------------------------- | ---------- |
| `cluos-logo-gradient.svg`   | Stacked lockup, primary gradient      | direct     |
| `cluos-logo-duo.svg`        | Stacked lockup, navy + teal           | direct     |
| `cluos-logo-black.svg`      | Stacked lockup, mono black            | direct     |
| `cluos-logo-white.svg`      | Stacked lockup, mono white            | direct     |
| `cluos-logo-navy.svg`       | Stacked lockup, mono navy             | derived     |
| `cluos-logo-teal.svg`       | Stacked lockup, mono teal             | derived     |
| `cluos-symbol-gradient.svg` | Symbol only, primary gradient         | direct     |
| `cluos-symbol-black.svg`    | Symbol only, mono black               | direct     |
| `cluos-symbol-white.svg`    | Symbol only, mono white               | direct     |
| `cluos-symbol-navy.svg`     | Symbol only, mono navy                | derived     |
| `cluos-symbol-teal.svg`     | Symbol only, mono teal                | direct     |
| `favicon.svg`               | Symbol on the brand gradient tile     | direct     |

## Important note on the artwork

The current official source pack contains a **stacked lockup**
(symbol above the wordmark). It does **not** contain a horizontal
lockup. Do not reconstruct a horizontal version by hand.

## Source mapping

The direct source files live in `../guides/SVG/`.

| Source file                                 | Published file |
| ------------------------------------------- | -------------- |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 8.svg`   | `cluos-logo-gradient.svg` |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 12.svg`  | `cluos-logo-duo.svg` |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 20.svg`  | `cluos-logo-black.svg` |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 23.svg`  | `cluos-logo-white.svg` |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 14.svg`  | `cluos-symbol-gradient.svg` |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 16.svg`  | `cluos-symbol-teal.svg` |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 22.svg`  | `cluos-symbol-black.svg` |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 25.svg`  | `cluos-symbol-white.svg` |
| `CLUOS_FINAL_SVG_Prancheta 1 cópia 29.svg`  | `favicon.svg` |

`cluos-logo-navy.svg`, `cluos-logo-teal.svg`, and
`cluos-symbol-navy.svg` are convenience mono variants derived from the
black masters using the official Cluos palette.

## Export rules

- Format: SVG 1.1
- Responsive: keep `viewBox`; avoid fixed `width` / `height`
- Preserve gradients exactly as exported from the source pack
- Do not embed raster images
- If a new asset is added, update `DESIGN.md`, `DESIGN-WORKFLOW.md`, and
  this file in the same PR

## Usage rules

See `../DESIGN.md` §2 for the decision table and `../DESIGN-WORKFLOW.md`
for the preview-first sync process.