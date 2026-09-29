# Measurements — preview table on narrow screens

Branch `agent/cluos-design-system/preview-table-phone-20260929` against `origin/main@3fc656f`, 2026-09-29.

Method: headless Chrome 154 through the DevTools protocol with a device-metrics override, so each width is a real layout viewport (`--window-size` cannot go below 500px). "Bundled" renders link the Manrope and Instrument Sans files of `brand-assets/fonts/`, which exist only as untracked files in the main checkout; "fallback" renders are what a clean clone shows (system fonts).

## Page overflow and gutters

`scrollWidth` greater than the viewport means the whole page scrolls sideways.

| Viewport | Fonts | main: scrollWidth | main: right gutter | branch: scrollWidth | branch: gutters | branch: table scrolls in its region |
|---|---|---|---|---|---|---|
| 320px | bundled | 389 | −68.9px | 320 | 16 / 16px | yes, 37px hidden |
| 320px | fallback | 389 | −69.4px | 320 | 16 / 16px | yes, 37px hidden |
| 360px | bundled | 389 | −28.9px | 360 | 16 / 16px | no |
| 360px | fallback | 389 | −29.4px | 360 | 16 / 16px | no |
| 375px | bundled | 389 | −13.9px | 375 | 16 / 16px | no |
| 375px | fallback | 389 | −14.4px | 375 | 16 / 16px | no |
| 390px | bundled | 390 | 1.1px | 390 | 16 / 16px | no |
| 390px | fallback | 390 | 0.6px | 390 | 16 / 16px | no |
| 1440px | both | 1440 | 24px | 1440 | 24 / 24px | no |

On `main`, the only other element past the viewport at 360px and 320px is a nav link inside the nav's own scroller, which does not move the page.

## Table minimum width

| | Widest words (px) | Inline padding | Minimum width |
|---|---|---|---|
| main | 76.7 "Elemento", 95.5 "Tratamento", 104.7 "Copper/oxblood" | 6 × 16px | 372.9px (373.4px fallback) |
| branch, below 32rem | same words | 6 × 8px | 324.9px (325.4px fallback) |

With the bundled fonts the table fits without scrolling down to a viewport of about 357px (324.9 + 32px of gutters). Headroom at 360px is 3.1px bundled and 2.6px fallback; below that width, or with wider system fonts, the region scrolls and the page does not.

Rejected: a line-break opportunity (`<wbr>`) after "Copper/". It lowers the minimum width to 297.9px, but it also changes the column widths at 1440px (1,278 pixels in the last row), which breaks rule R5 of the contract.

## 1440px

Pixel diff of the full page, `main` against the branch: identical with the bundled fonts and identical with the fallback fonts (`renders/pixel-diff-1440.txt`). The region takes the table's top margin, so its box starts where the table's margin did.

## Focus

| Check | Result |
|---|---|
| Tab order | … "Atualizar dados" → table region → "Reproduzir atualização" |
| Region semantics | `role="region"`, `aria-label="Tratamento canônico por elemento"`, `tabindex="0"`; the table keeps `display: table` and `th scope="col"` |
| Focused region | `:focus-visible` matches; `box-shadow: 0 0 0 2px #C4DB7B` from `--cluos-ring-focus`, the same ring as every link and button of the preview |

The ring token measures 1.53:1 against white and 1.27:1 against `--cluos-bg-muted`, below the 3:1 of WCAG 1.4.11. That is a property of `--cluos-ring-focus` on `main`, not of this change.

## Renders

| File | Shows |
|---|---|
| `renders/table-before-{390,375,360,320}.png`, `renders/table-after-{…}.png` | section 04 table at each width, clipped to the viewport |
| `renders/focus-{1440,390,320}.png` | the focused region |
| `renders/pixel-diff-1440.txt` | full-page diff at 1440px, both font sets |
