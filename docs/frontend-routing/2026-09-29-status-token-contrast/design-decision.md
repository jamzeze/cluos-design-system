# design-decision — cluos-design-system · status text contrast (N3)

Date: 2026-09-29. Branch `agent/cluos-design-system/status-token-contrast-20260929`, from `origin/main@3fc656f`.
Conducted by `design-system-refactor-director`.

Every decision below is the agent's proposal under the task brief. None is recorded as Rafael's: no entry was added to `agent-skills/profiles/cluos/palette-decisions.yaml` or `design-decisions.yaml`. Merging the pull request is the approval.

## 1. Inventory

Status tokens exist in two layers of `tokens/tokens.css`:

- Constants: `--cluos-status-{success,info,warn,error}` and their `-bg` tints, in the canonical block. Register-independent: the dark block does not redefine them.
- Roles: `--cluos-color-status-{success,warning,danger,info}`, defined for `MMS`, for the legacy styles `A` to `E` and `G`, and overridden by the six palette selectors.

| Consumer | How it uses status tokens | In this change |
|---|---|---|
| `tokens/tokens.css` | defines both layers | edited |
| `tokens/tokens.ts`, `tokens/tokens.js` | mirror: `tokens.status`, `styles`, `palettes`, `palettesDark`, `resolveTheme` | edited |
| `tokens/tailwind-preset.js` | `cluos.*` (8 status keys) and `cluosc.*` (4 status roles) | edited |
| `tokens/mms-canonical.yaml` | names copper and oxblood roles; held no status values | `status_tokens` block added |
| `tokens/index.ts` | re-exports by name | unchanged |
| `DESIGN-preview.html` | status colour as 12px text on white and on deep navy | edited |
| `DESIGN.md`, `AGENTS.md`, `DESIGN-WORKFLOW.md`, `PRODUCT-PATTERNS.md` | usage rules | edited |
| `patterns/components.md`, `patterns/states.md`, `patterns/accessibility.md` | token guidance per component and state | edited |
| `examples/tailwind-setup.md` | badge: status text on its tint | edited |
| `examples/apple-inspired-product-ui/css-tokens.md` | four badges: status text on its tint | edited |
| `examples/apple-inspired-product-ui/plain-html.md`, `hub-systems.md`, `dashboard.md`, `react-components.md`, `settings-page.md` | status colour as label, metric or feedback text | edited |
| `examples/apple-inspired-product-ui/next-tailwind.md` | badge classes `text-cluos-status-*`, which the preset never generated | edited |
| `examples/apple-inspired-product-ui/error-empty-loading.md`, `upload-video-flow.md`, `APPLE-INSPIRED-PRODUCT-UX.md` | tints and fills only | unchanged |
| `guides/mms-canonical-identity-proposal.html`, `guides/mms-campaign-signal-prototype.html` | link `tokens.css`; warn as text on white | measured, not edited (approved source artifacts) |
| `design-gallery/index.html` | own `--ok/--warn/--err` layer with copied values; does not read `tokens.css` | measured, not edited (record of the alternatives Rafael compared) |
| `DESIGN-preview-legacy-v0.2.1.html` | inline copy of the v0.2.1 tokens | measured, not edited (frozen) |
| `tokens-experimental/`, `DESIGN-preview-experimental-thermal-nocturne.html` | superseded experiment, inline copies | not edited |
| `agent-skills/` | no status token reference outside `palette-policy.md` | unchanged |

## 2. Audit

Method: WCAG 2.1 relative luminance, computed by `scripts/status-contrast.mjs` from the parsed stylesheet, with the selector attributes on the root element. Threshold 4.5:1 (every status text in this repo is 12px to 14px, below the large-text size). Reproduce with `node scripts/status-contrast.mjs`.

### 2.1 Canonical register, status colour used as text

| Status | Value | Own tint | `--cluos-bg` `#FFFFFF` | `--cluos-bg-muted` `#EAEAEA` |
|---|---|---|---|---|
| success | `#6F8F19` | 3.38 fail | 3.74 fail | 3.11 fail |
| info | `#3E6E82` | 4.92 | 5.59 | 4.65 |
| warn | `#BD7845` | 3.02 fail | 3.54 fail | 2.94 fail |
| error | `#8A3A3A` | 6.49 | 7.64 | 6.35 |

### 2.2 Dark surfaces, status colour used as text

| Status | Value | `#010D28` deep navy | `#081634` dark bg-subtle | `#132952` dark bg-muted |
|---|---|---|---|---|
| success | `#6F8F19` | 5.16 | 4.78 | 3.83 fail |
| info | `#3E6E82` | 3.45 fail | 3.20 fail | 2.56 fail |
| warn | `#BD7845` | 5.45 | 5.05 | 4.05 fail |
| error | `#8A3A3A` | 2.52 fail | 2.34 fail | 1.87 fail |

### 2.3 Legacy styles, role colour used as text

Worst light surface is `--cluos-bg-muted` `#EAEAEA`, which every light style inherits from the canonical block.

| Style | success | warning | danger | info |
|---|---|---|---|---|
| A | `#008080`: white 4.77, subtle `#F3F4F1` 4.32 fail, muted 3.97 fail | `#B06A34`: white 4.24 fail, muted 3.52 fail | `#8A3A3A`: 6.35 to 7.64 | `#3E6E82`: 4.65 to 5.59 |
| B | `#6F8F19`: white 3.74 fail, muted 3.11 fail | `#BD7845`: white 3.54 fail, muted 2.94 fail | same as A | same as A |
| C | `#3D7A46`: white 5.16, muted 4.29 fail | `#A96A2F`: white 4.38 fail, muted 3.64 fail | `#973B3B`: 5.81 to 6.99 | same as A |
| D | `#007070`: 4.91 to 5.91 | `#A96A2F`: white 4.38 fail | same as A | same as A |
| E | `#0E6E68`: 5.06 to 6.09 | `#A96A2F`: canvas `#F6F3EE` 3.96 fail | same as A | same as A |
| G (dark) | `#9CC24A`: 6.97 to 9.73 | `#D08A54`: 5.08 to 7.08 | `#C46A6A`: surface `#0B1B41` 4.50, bg-muted `#132952` 3.83 fail | `#6FA8C4`: 5.50 to 7.68 |

### 2.4 Palettes, role colour used as text (light styles, worst surface `#EAEAEA`)

| Palette | success | warning | danger |
|---|---|---|---|
| `pal-tealcool` | `#008080` 3.97 fail | `#B06A34` 3.52 fail | `#8A3A3A` 6.35 |
| `pal-tealink` | `#00696B` 5.40 | `#B06A34` 3.52 fail | 6.35 |
| `pal-forest` | `#3D7A46` 4.29 fail | `#B5773A` 3.08 fail | 6.35 |
| `pal-copper` | `#0E6E68` 5.06 | `#BD7845` 2.94 fail | 6.35 |
| `pal-cold` | `#2D6CDF` 4.04 fail | `#B5773A` 3.08 fail | 6.35 |
| `pal-terracotta` | `#4A7A5E` 4.12 fail | `#B5623A` 3.66 fail | 6.35 |

### 2.5 Consumers measured and left as they are

| File | Pair | Ratio |
|---|---|---|
| `guides/mms-canonical-identity-proposal.html` | `.status--warning` `#BD7845` on white | 3.54 fail |
| `guides/mms-campaign-signal-prototype.html` | `.metric--warning span` `#BD7845` on white | 3.54 fail |
| `design-gallery/index.html` | A `.badge.warn` `#B06A34` on `#F8EFE6` | 3.73 fail |
| | B `.lat.hot` `#BD7845` on `#FFFFFF` | 3.54 fail |
| | C `.state.warn` `#A96A2F` on `#FAFAF7` | 4.19 fail |
| | D `.stx.warn` `#A96A2F` on `#FFFFFF` | 4.38 fail |
| | E `.badgeE` `#A96A2F` on `#F5E7D8` | 3.61 fail |
| | G `.badgeG` `#D08A54` on its 16% tint over `#0B1B41` | 4.79 |
| | G `.stG.err` `#C46A6A` on `#0B1B41` | 4.50 |
| `DESIGN-preview-legacy-v0.2.1.html` | `.badge-warn` `#BD7845` on `#F8EBDF` | 3.02 fail |
| | `.badge-success` `#008080` on `#E6F2F2` | 4.17 fail |

### Findings

1. `warn` and `success` fail as text on every light surface, not only on their tints. The brief named the tint pairs; the canonical preview shows `warn` as 12px text on white at 3.54:1.
2. No warning value in the file passes as text: the five distinct legacy values range from 3.54:1 to 4.40:1 on white.
3. The canonical preview puts oxblood text on deep navy at 2.52:1 (`Publicação · Negada`). No status token is defined for dark surfaces outside style `G`.
4. `--cluos-action-copper-deep` `#965D34`, the darker copper already in the file, gives 4.59:1 on the warn tint and 5.37:1 on white but 4.46:1 on `--cluos-bg-muted`. It is not safe on every surface.
5. `palette-policy.md` fixes dark error at `#C46A6A`. On the dark `--cluos-bg-muted` (`#132952`) it gives 3.83:1. No value of the fixed family passes there.
6. The status tints do not change with the register. In `[data-appearance="dark"]` a tint is still a light chip, and `--cluos-text` flips to near white.
7. `tokens.ts` registers dark-tuned palettes (`palettesDark`) and states that `resolveTheme` mirrors the CSS cascade. `tokens.css` has no such selectors: style `G` with a palette gets the light palette fills (danger `#8A3A3A` on `#0B1B41`: 2.20:1).
8. `examples/apple-inspired-product-ui/next-tailwind.md` uses `text-cluos-status-warn` and `bg-cluos-status-warn-bg`. The preset generates `text-cluos-warn` and `bg-cluos-warn-bg`; the example classes never resolved.

## 3. Principles

- Additive. Every existing token keeps its name and value. Fills and tints render as before.
- A text token is safe wherever its register can put it: on its own tint and on every surface token of that register.
- No new hue. A text tone is a darker tone of its fill, or a value the file or a shipped CluOS product already uses.
- The error family is not touched: `#8A3A3A` light, `#C46A6A` dark.
- The pair is tested. The test parses the stylesheet; it does not restate the values.

## 4. Layout contract

Not applicable. No zone, order, hierarchy or flow changes. The preview keeps its sections; one row is added to an existing table.

## 5. Visual direction

Unchanged: `cluos-mms-v1`. Palette mode `preserve` (corrects contrast, no chromatic change). `tokens/mms-canonical.yaml` `palette` block is untouched.

## 6. Decisions

**D1. Text tokens in the canonical block.**

| Token | Value | Source |
|---|---|---|
| `--cluos-status-success-text` | `#546D13` | new: success fill hue (76°), lightness 33% to 25% |
| `--cluos-status-info-text` | `var(--cluos-status-info)` | alias, the fill passes |
| `--cluos-status-warn-text` | `#8A5A2B` | the value `suporte` ships as `--cluos-amber-text` |
| `--cluos-status-error-text` | `var(--cluos-status-error)` | alias, the fill passes |

`#8A5A2B` was preferred to a same-hue darkening of copper (`#8B5831`, 26°) because it is already rendered and reviewed in `suporte`, and one value across repos avoids a fork. Its hue is 30°, 4° from copper and equal to the legacy warnings `#A96A2F` and `#B5773A`. `#965D34` was rejected (finding 4).

**D2. On-navy tokens in the canonical block.** `--cluos-status-success-on-navy: #9CC24A`, `-info-on-navy: #6FA8C4`, `-warn-on-navy: #D08A54`, `-error-on-navy: #C46A6A`. These are the four status values style `G` already registers; error is the dark oxblood of `palette-policy.md`. They serve text and marker on deep navy and on the dark register surfaces. Name follows `--cluos-text-on-navy`.

Rejected: keeping the fills on navy where they pass (success, warn) and replacing only info and error. It leaves two rules for one surface.

**D3. Text roles in the role layer.** `--cluos-color-status-{success,warning,danger,info}-text`.

| Selector | success-text | warning-text | danger-text | info-text |
|---|---|---|---|---|
| `:root`, `MMS` | `var(--cluos-status-success-text)` | `var(--cluos-status-warn-text)` | `var(--cluos-status-error-text)` | `var(--cluos-status-info-text)` |
| `[data-appearance="dark"]` | `var(--cluos-status-success-on-navy)` | `var(--cluos-status-warn-on-navy)` | `var(--cluos-status-error-on-navy)` | `var(--cluos-status-info-on-navy)` |
| `A` | `#006666` | `#8A5A2B` | `#8A3A3A` | `#3E6E82` |
| `B` | `#546D13` | `#8A5A2B` | `#8A3A3A` | `#3E6E82` |
| `C` | `#2C5A34` | `#8A5A2B` | `#973B3B` | `#3E6E82` |
| `D` | `#007070` | `#8A5A2B` | `#8A3A3A` | `#3E6E82` |
| `E` | `#0E6E68` | `#8A5A2B` | `#8A3A3A` | `#3E6E82` |
| `G` | `#9CC24A` | `#D08A54` | `#C46A6A` | `#6FA8C4` |
| `pal-tealcool` | `#006666` | `#8A5A2B` | `#8A3A3A` | from style |
| `pal-tealink` | `#00696B` | `#8A5A2B` | `#8A3A3A` | from style |
| `pal-forest` | `#2C5A34` | `#8A5A2B` | `#8A3A3A` | from style |
| `pal-copper` | `#0E6E68` | `#8A5A2B` | `#8A3A3A` | from style |
| `pal-cold` | `#1F4FAE` | `#8A5A2B` | `#8A3A3A` | from style |
| `pal-terracotta` | `#416C53` | `#8F4B2B` | `#8A3A3A` | from style |

Rule applied: where the fill passes on every light surface the text role repeats it (`D`, `E`, `pal-tealink`, `pal-copper`, every danger and info). Where it fails, the text role takes the deep tone that style or palette already registers as its action hover (`#2C5A34` forest, `#1F4FAE` cold, `#8F4B2B` terracotta). Two exceptions: teal takes `#006666`, the value `suporte` (a style `A` product) ships as `--cluos-teal-text`, instead of the registered `#005959`; `pal-terracotta` success has no registered deep tone and takes `#416C53`, its own hue at lightness 34%.

Dark register with a palette: compound selectors `[data-cluos-style="G"][data-cluos-palette="…"]` and `[data-appearance="dark"][data-cluos-palette="…"]` set the three text roles to the values `palettesDark` already registers in `tokens.ts`. Without them the palette selector, which comes later in the file, would put a light-register tone on a dark surface.

**D4. Fills and tints are frozen.** The test holds a snapshot of every status fill and tint as of `origin/main@3fc656f` and fails if one changes.

**D5. Known limit, not fixed.** Error text on the dark `--cluos-bg-muted` (`#132952`) stays at 3.83:1. Fixing it needs a lighter oxblood, which is a change to the error family and is Rafael's decision. The test asserts the limit so the record stays true. Until then: on that surface, state the error in `--cluos-text` beside the marker.

**D6. Tints stay as they are in the dark register.** A tint pairs with `--cluos-status-*-text` in every register, because both are constants. Dark tints would make the role layer fully themable, but they are new colours and a visible change to existing tokens. They also have little room: with `#C46A6A` fixed, an error tint of 15% over deep navy gives 4.46:1, and one of 8% over the dark `--cluos-bg-subtle` gives 4.43:1. Left for a separate decision (section 9).

**D7. Mirrors.** `tokens.status` gains `successText`, `infoText`, `warnText`, `errorText`, `successOnNavy`, `infoOnNavy`, `warnOnNavy`, `errorOnNavy`. `CluosThemeRoles` gains `statusSuccessText`, `statusWarningText`, `statusDangerText`, `statusInfoText`; `palettes` and `palettesDark` gain the first three. The Tailwind preset gains `cluos.{success,info,warn,error}-text`, `cluos.{success,info,warn,error}-on-navy` and `cluosc.{success,warning,danger,info}-text`. `tokens/mms-canonical.yaml` gains a `status_tokens` block with fill, text, on-navy and background per status (the top-level key `status` already holds `active`).

**D8. Test.** `scripts/status-contrast.mjs` (parser, cascade, contrast, report) and `scripts/test-status-contrast.mjs` (`node:test`, no dependency). `package.json` gains `"test": "node --test scripts/test-status-contrast.mjs"`.

**D9. Preview.** Status labels take the text tokens; the marker keeps the fill on light surfaces, so the only visible change on white is the label colour. On the navy surface label and marker take the on-navy tones. One row is added to the states table.

**D10. Example classes.** `next-tailwind.md` is corrected to class names the preset generates (finding 8), since the lines change anyway.

## 7. Before and after

Measured by `node scripts/status-contrast.mjs` on this branch. Before: the fill used as text. After: the text token on the same surface. The full output, with every legacy style and palette, is in `measured-report.md`. The browser computed the same ratios from `getComputedStyle` for 144 pairs in five contexts (`renders/browser-crosscheck.txt`, largest difference 1.8e-15).

### Canonical status pairs, light register

| Status | Surface | Before | After |
|---|---|---|---|
| success | `--cluos-bg` `#FFFFFF` | `#6F8F19` 3.74 fail | `#546D13` 5.88 |
| success | `--cluos-bg-subtle` `#FFFFFF` | `#6F8F19` 3.74 fail | `#546D13` 5.88 |
| success | `--cluos-bg-muted` `#EAEAEA` | `#6F8F19` 3.11 fail | `#546D13` 4.88 |
| success | `--cluos-status-success-bg` `#F1F6DF` | `#6F8F19` 3.38 fail | `#546D13` 5.31 |
| info | `--cluos-bg` `#FFFFFF` | `#3E6E82` 5.59 | `#3E6E82` 5.59 |
| info | `--cluos-bg-subtle` `#FFFFFF` | `#3E6E82` 5.59 | `#3E6E82` 5.59 |
| info | `--cluos-bg-muted` `#EAEAEA` | `#3E6E82` 4.65 | `#3E6E82` 4.65 |
| info | `--cluos-status-info-bg` `#EDF1F4` | `#3E6E82` 4.92 | `#3E6E82` 4.92 |
| warn | `--cluos-bg` `#FFFFFF` | `#BD7845` 3.54 fail | `#8A5A2B` 5.87 |
| warn | `--cluos-bg-subtle` `#FFFFFF` | `#BD7845` 3.54 fail | `#8A5A2B` 5.87 |
| warn | `--cluos-bg-muted` `#EAEAEA` | `#BD7845` 2.94 fail | `#8A5A2B` 4.88 |
| warn | `--cluos-status-warn-bg` `#F8EBDF` | `#BD7845` 3.02 fail | `#8A5A2B` 5.01 |
| error | `--cluos-bg` `#FFFFFF` | `#8A3A3A` 7.64 | `#8A3A3A` 7.64 |
| error | `--cluos-bg-subtle` `#FFFFFF` | `#8A3A3A` 7.64 | `#8A3A3A` 7.64 |
| error | `--cluos-bg-muted` `#EAEAEA` | `#8A3A3A` 6.35 | `#8A3A3A` 6.35 |
| error | `--cluos-status-error-bg` `#F5EAEA` | `#8A3A3A` 6.49 | `#8A3A3A` 6.49 |

### Canonical status on dark surfaces

| Status | Surface | Before | After |
|---|---|---|---|
| success | `--cluos-deep-navy` `#010D28` | `#6F8F19` 5.16 | `#9CC24A` 9.39 |
| success | `--cluos-bg` `#010D28` | `#6F8F19` 5.16 | `#9CC24A` 9.39 |
| success | `--cluos-bg-subtle` `#081634` | `#6F8F19` 4.78 | `#9CC24A` 8.71 |
| success | `--cluos-bg-muted` `#132952` | `#6F8F19` 3.83 fail | `#9CC24A` 6.97 |
| info | `--cluos-deep-navy` `#010D28` | `#3E6E82` 3.45 fail | `#6FA8C4` 7.41 |
| info | `--cluos-bg` `#010D28` | `#3E6E82` 3.45 fail | `#6FA8C4` 7.41 |
| info | `--cluos-bg-subtle` `#081634` | `#3E6E82` 3.20 fail | `#6FA8C4` 6.87 |
| info | `--cluos-bg-muted` `#132952` | `#3E6E82` 2.56 fail | `#6FA8C4` 5.50 |
| warn | `--cluos-deep-navy` `#010D28` | `#BD7845` 5.45 | `#D08A54` 6.83 |
| warn | `--cluos-bg` `#010D28` | `#BD7845` 5.45 | `#D08A54` 6.83 |
| warn | `--cluos-bg-subtle` `#081634` | `#BD7845` 5.05 | `#D08A54` 6.34 |
| warn | `--cluos-bg-muted` `#132952` | `#BD7845` 4.05 fail | `#D08A54` 5.08 |
| error | `--cluos-deep-navy` `#010D28` | `#8A3A3A` 2.52 fail | `#C46A6A` 5.16 |
| error | `--cluos-bg` `#010D28` | `#8A3A3A` 2.52 fail | `#C46A6A` 5.16 |
| error | `--cluos-bg-subtle` `#081634` | `#8A3A3A` 2.34 fail | `#C46A6A` 4.78 |
| error | `--cluos-bg-muted` `#132952` | `#8A3A3A` 1.87 fail | `#C46A6A` 3.83 fail (known limit) |

### Totals

- Pairs measured: 3496 in 56 contexts.
- Below 4.5:1 before: 1549 of 3468.
- Below 4.5:1 after: 0 of 3468.
- Known limit (error text on the dark `--cluos-bg-muted` `#132952`): 28 pairs, 3.83 to 3.83; before 1.87.

### Renders

| File | Shows |
|---|---|
| `renders/preview-before.png`, `renders/preview-after.png` | `DESIGN-preview.html`, sections Paleta (navy surface) and Estados, 1440px |
| `renders/specimen-mms.png` | every status on every light surface, `:root` |
| `renders/specimen-mms-dark.png` | `data-appearance="dark"` |
| `renders/specimen-style-a.png` | legacy style `A` (the system `suporte` follows) |
| `renders/specimen-style-g.png` | legacy style `G` (dark), with the known limit on `--cluos-bg-muted` |
| `renders/specimen-style-b-pal-forest.png` | style `B` with `pal-forest` |

`renders/status-pairs.html` is the page behind the specimen renders. It reads `tokens/tokens.css` and takes the context from the query string.

## 8. Compatibility and rollback

- No name removed, no value changed. A consumer that does nothing renders exactly as before.
- `CluosThemeRoles` gains four required fields. Code that builds such an object by hand must add them; code that reads `styles`, `palettes` or `resolveTheme()` is unaffected. No product installs the package today (`AGENTS.md`).
- Rollback: revert the commit. Nothing outside this repository changes.
- `suporte` can later replace its local `--cluos-amber-text` and `--cluos-teal-text` with the style `A` text roles; the values are equal.

## 9. Out of scope, recorded for follow-up

- Dark-register tints (finding 6) and the dark error limit (D5): need a decision on new colours and on the error family.
- `tokens.css` lacks the dark-tuned palette fills that `tokens.ts` registers (finding 7).
- `--cluos-text-subtle` (`#A5A5A5`) is 2.46:1 on white and 2.05:1 on `--cluos-bg-muted`; the preview uses it for table headers and token labels. Not a status token; changing it changes `neutral_500` in the canonical palette.
- The two `guides/` pages and `design-gallery/index.html` keep their failing pairs (section 2.5).
- `patterns/accessibility.md`, `patterns/components.md` and the examples still describe teal primary buttons and `#1B2F36` navy from before `cluos-mms-v1`.
- `brand-assets/fonts/` and three test scripts called by `scripts/validate-agent-skills.sh` exist only as untracked files in the main checkout. A clean clone renders the preview in fallback fonts and fails that script.
