# Palette Policy — CluOS

## Canonical default (2026-08-30)

`cluos-mms-v1` is the global default palette. New products inherit it without
setting a palette class: deep navy and medium blue provide structure, tech
green is the positive action/signal, operational teal is progress, copper is
warning/review, and oxblood is denial/error/risk. The full contract lives in
`../../tokens/mms-canonical.yaml` in the source checkout.

The composable palette library below is retained as a compatibility API for
existing surfaces only. It is not a valid global default for new work. Any
explicit legacy palette must be documented as a temporary opt-out and must
not change the semantic meaning of copper or oxblood.

Governs how color is chosen and applied across CluOS surfaces. Read this
before changing any color in a CluOS product.

## 1. Palette is decoupled from archetype

The 2026-08-10 per-task library decision is superseded for the global default
by the 2026-08-30 `cluos-mms-v1` decision. The legacy style/palette API remains
implemented in the token architecture for controlled migration:

- Each archetype's component CSS reads **semantic role tokens**
  (`--u-accent`, `--u-ink`, `--u-bg`, `--u-surface`, `--u-line`, `--u-line2`,
  `--u-mut`, `--u-sub`, `--u-ok`, `--u-warn`, `--u-err`, `--u-signal`) via
  `var(--u-x, native-value)`.
- A palette is a CSS class (`data-cluos-palette="pal-forest"` etc.) that sets
  those `--u-*` custom properties. No palette class applied = the
  archetype's own native/default colors.
- Structural "brand chrome" that is part of an archetype's identity (e.g.
  the dark navy rail in Data Precision, the fully-dark canvas in Night
  Watch) does **not** reskin with palette choice — that is style, not
  palette. Night Watch instead exposes `-dark` variants of the accent/status
  roles (`--u-accent-dark` etc.) so palettes remain legible against a fixed
  dark field.

This pattern was prototyped and validated in the interactive workbench
(`design-gallery/index.html#workbench`) before being ported into the real
token file — do not reintroduce a second, divergent palette-swap mechanism.

## 2. Palette modes

Every palette declares exactly one mode:

- **`preserve`** — keeps the CluOS anchor colors (teal `#008080`, navy
  `#1B2F36`) intact. May reorganize semantic roles, correct contrast, build
  tonal scales, reduce saturation, improve neutrals. Does not change the
  cromatic identity.
- **`evolve`** — keeps one or two anchor colors, redesigns neutrals,
  surfaces, states, auxiliary colors.
- **`new`** — a fresh palette aligned to an archetype's thesis, with
  rationale and brand-risk noted.

## 3. Registered palettes

| id | mode | accent | ink | bg | pairs well with |
|---|---|---|---|---|---|
| `teal-classic` (native, no class needed) | preserve | `#008080` | `#1B2F36` | `#FBFBF9` | A |
| `thermal-nocturne` (native, no class needed) | evolve | `#0E8F87` | `#0B1730` | `#F5F7F4` | B |
| `thermal-nocturne-dark` (native, no class needed) | evolve | `#1FB5AB` | `#E8ECF4` | `#010D28` | G |
| `editorial-cobalt` (native, no class needed) | new | `#2B49C7` | `#16181D` | `#FAFAF7` | C |
| `swiss-mono` (native, no class needed) | preserve | `#007070` | `#111417` | `#FFFFFF` | D |
| `clinic-warm` (native, no class needed) | evolve | `#0E6E68` | `#24403C` | `#F6F3EE` | E |
| `pal-tealcool` — Teal Cool Slate | preserve | `#008080` | `#1B2F36` | `#F7F8FA` | A, D |
| `pal-tealink` — Teal Ink | preserve | `#00696B` | `#10181C` | `#FFFFFF` | A, D |
| `pal-forest` — Forest Command | evolve | `#3D7A46` | `#16201A` | `#F6F5EF` | B, G |
| `pal-copper` — Copper Signal | evolve | `#0E6E68` | `#0B1730` | `#F5F7F4` | B, G, E |
| `pal-cold` — Cold Luxury | new | `#2D6CDF` | `#1B1E22` | `#F4F5F6` | C, D |
| `pal-terracotta` — Terracotta Slate | new | `#B5623A` | `#24303A` | `#F3F1EC` | E, C |

Full token values (including `-deep`/`-dark` variants) live in
`tokens/tokens.css` under `.pal-*` classes and in
`docs/cluos-design-system-v2/05-palette-options.md`.

## 4. Restrictions (unchanged from the anti-slop rubric)

- No purple-blue gradient by reflex.
- No brand color used for every semantic state.
- No dependence on color alone to convey state.
- No new palette applied globally without a decision recorded in
  `palette-decisions.yaml` in the resolved CluOS profile root. From this file,
  that root is `../../profiles/cluos-design-system/cluos` when installed and
  `../profiles/cluos` in the canonical source checkout. Stop if neither exact
  path is complete.
- `err` stays oxblood-family (`#8A3A3A` light / `#C46A6A` dark) across every
  registered palette — status colors are semantic, not decorative, and
  changing error red per palette would break pattern-recognition across
  surfaces.
- Banned as default reach (see `anti-slop-rubric.md` §Color): neon glow,
  glassmorphism, beige+brass+oxblood+espresso "premium luxury" combo,
  oversaturated single accent >80% saturation.

## 5. Adding a new palette

1. Define the 4-5 core swatches (accent, accent-deep, ink, bg, one
   secondary) and justify the mode.
2. Add `.pal-<id>` to `tokens/tokens.css` with the full `--u-*` set
   (including `-dark` variants if it will ever run against Night Watch).
3. Add a row to the table above and to `05-palette-options.md`.
4. Render it against at least one archetype's dashboard before shipping —
   swatches alone are not sufficient evidence (`design-gallery` skill rule).
