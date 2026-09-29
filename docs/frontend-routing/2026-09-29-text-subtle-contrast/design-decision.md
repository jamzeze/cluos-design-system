# design-decision — cluos-design-system · subtle text contrast (N3)

Date: 2026-09-29. Branch `agent/cluos-design-system/text-subtle-contrast-20260929`, from `origin/main@3fc656f`.
Conducted by `design-system-refactor-director`.

Rafael asked for this blocker to be fixed. He did not choose the value: every value and name below is the agent's proposal, and merging the pull request is the approval. No entry was added to `agent-skills/profiles/cluos/palette-decisions.yaml` or `design-decisions.yaml`.

Context: design-critic finding B1 on pull request jamzeze/cluos-design-system#4 (`docs/frontend-routing/2026-09-29-status-token-contrast/design-critic.md` on that branch). `--cluos-text-subtle` fails WCAG AA on the canonical page, so the reviewer gate of any task that renders `DESIGN-preview.html` blocks. Finding B3 of the same review is fixed separately, on branch `agent/cluos-design-system/preview-table-phone-20260929`.

## 1. Inventory

| Consumer | Use | In this change |
|---|---|---|
| `tokens/tokens.css` | `--cluos-neutral-500: #A5A5A5`; `--cluos-text-subtle: var(--cluos-neutral-500)`; dark block `--cluos-text-subtle: rgba(247, 248, 245, 0.54)`; role `--cluos-color-fg-muted: var(--cluos-text-subtle)`; legacy styles `A`–`E`, `G` set `--cluos-color-fg-muted` to their own literals | edited |
| `tokens/tokens.ts`, `tokens/tokens.js` | `color.neutral500`, `color.textSubtle`, `appearance.{light,dark}.textSubtle`, `styles.*.fgMuted` | edited |
| `tokens/tailwind-preset.js` | `cluos.neutral-500`, `cluos.text-subtle`, `cluosc.fg-muted` | edited |
| `tokens/mms-canonical.yaml` | `palette.neutral_500` with roles `[subtle_text, disabled_context]` | edited |
| `DESIGN-preview.html` | `.token-name` (swatch and rule labels), `th` (on `--cluos-bg-muted`), `.motion-feedback`, `.chart__header span` | not edited; renders through the token |
| `DESIGN.md`, `AGENTS.md` | palette table; colour rules | edited |
| `patterns/accessibility.md` | contrast list with pre-MMS values (`--cluos-text-subtle (#8A939B)`) | edited |
| `patterns/components.md` | section label and empty-state icon in `--cluos-text-subtle` | unchanged; both still correct |
| `examples/apple-inspired-product-ui/hub-systems.md` | disabled "Abrir" button in `text-cluos-text-subtle` | edited: disabled token |
| other examples (`dashboard`, `error-empty-loading`, `plain-html`, `settings-page`, `upload-video-flow`) | hints, URLs, section labels, neutral trend, decorative glyphs | unchanged; they render through the token |
| `guides/mms-canonical-identity-proposal.html`, `guides/mms-campaign-signal-prototype.html` | labels and table headers in `--cluos-text-subtle`; both link `tokens/tokens.css` | not edited; they render darker labels through the token |
| `design-gallery/index.html`, `DESIGN-preview-legacy-v0.2.1.html`, `tokens-experimental/` | own values | unaffected |

No product installs `@cluos/design-system` today (`AGENTS.md`), so the rendered change reaches this repository's pages and future consumers.

## 2. Audit

WCAG 2.1 relative luminance, text threshold 4.5:1. Every use in the inventory is readable text except the disabled button of `hub-systems.md` (exempt under WCAG 1.4.3, inactive control) and two decorative glyphs.

| Token, register | Value | `--cluos-bg` | `--cluos-bg-subtle` | `--cluos-bg-muted` |
|---|---|---|---|---|
| `--cluos-text`, light | `#010D28` | 19.27 | 19.27 | 16.02 |
| `--cluos-text-muted`, light | `#132952` | 14.32 | 14.32 | 11.90 |
| `--cluos-text-subtle`, light | `#A5A5A5` | **2.46** | **2.46** | **2.05** |
| `--cluos-text`, dark | `#F7F8F5` | 18.08 | 16.77 | 13.43 |
| `--cluos-text-muted`, dark | `rgba(247, 248, 245, 0.72)` | 9.48 | 9.03 | 7.65 |
| `--cluos-text-subtle`, dark | `rgba(247, 248, 245, 0.54)` | 5.69 | 5.57 | 4.96 |

Findings:

1. Only the light `--cluos-text-subtle` fails, on every surface. The preview shows it on the table headers of section 04 (2.05:1 on `--cluos-bg-muted`) and on every swatch and rule label (2.46:1 on white).
2. `neutral_500` holds two jobs in the canonical palette, `subtle_text` and `disabled_context`. The second is exempt from contrast; the first is not. No single grey can do both: a grey dark enough for text no longer reads as disabled.
3. The legacy styles set their own `--cluos-color-fg-muted`, and all fail as text on at least one of their surfaces: `A` `#8A939B` 2.59–3.12, `B` `#68748A` 3.92–4.72, `C` `#84888E` 2.96–3.56, `D` `#8B9095` 2.68–3.22, `E` `#8E9788` 2.52–3.03, `G` `#66738F` 3.01–4.20. `E` also fails with `--cluos-color-fg-secondary` `#63705F` on `--cluos-bg-muted` (4.35). These are explicit opt-out values, not the canonical token, and not what blocks the reviewer gate.
4. `patterns/accessibility.md` still lists Teal Classic values (`--cluos-navy (#1B2F36)`, `--cluos-teal (#008080)`, `--cluos-text-muted (#5A6570)`, `--cluos-text-subtle (#8A939B)`); none matches the tokens of `cluos-mms-v1`.

## 3. Principles

- Fix the token, not its consumers: a token named `text-subtle` must be safe as text wherever its register puts it.
- Keep every existing palette value. `--cluos-neutral-500` stays `#A5A5A5`.
- No new hue: the subtle text tone is a darker step of the same neutral axis.
- Split the two jobs of `neutral_500` instead of letting a darker grey make disabled controls look enabled.
- The text tokens are tested against every surface of both registers.

## 4. Layout contract

Not applicable: no zone, order, hierarchy or flow changes. Labels change colour; nothing moves.

## 5. Visual direction

Unchanged: `cluos-mms-v1`. Palette mode `preserve`, which `palette-policy.md` §2 describes as able to "correct contrast, build tonal scales … improve neutrals".

## 6. Decisions

**D1. A darker neutral step, `--cluos-neutral-700: #666666`.** It is the same achromatic axis as `#EAEAEA` and `#A5A5A5`. Measured: 5.74:1 on white, 4.77:1 on `--cluos-bg-muted`. The lightest grey that clears 4.5:1 on `--cluos-bg-muted` is `#696969` (4.563); `#6A6A6A` falls just under (4.496). `#666666` keeps a margin of 0.27 on the worst surface. The name was unused on `main`.

**D2. `--cluos-text-subtle: var(--cluos-neutral-700)`.** This is the fix: the value of an existing token changes. Every consumer that writes readable text in it now passes, with no edit. Dark `--cluos-text-subtle` is unchanged; it already passes (4.96–5.69).

**D3. `--cluos-text-disabled` for the second job of `neutral_500`.** Light: `var(--cluos-neutral-500)`, the colour disabled labels had until now (2.05–2.46, exempt). Dark: `rgba(247, 248, 245, 0.38)`, which continues the existing opacity ladder of the dark register (text 1, muted .72, subtle .54) at 3.19–3.38. Without a dark value the token would inherit `#A5A5A5`, 7.82:1 on deep navy, brighter than subtle text. It is for the label of an inactive control only.

**D4. The canonical palette contract records the split.** `tokens/mms-canonical.yaml`: `neutral_500.role` becomes `[disabled_context]`; a new entry `neutral_700: {value: "#666666", role: [subtle_text]}`. This is the change Rafael approves by merging.

**D5. Mirrors.** `tokens.color.neutral700`, `tokens.color.textDisabled`, `tokens.appearance.{light,dark}.textDisabled`; `tokens.color.textSubtle`, `tokens.appearance.light.textSubtle` and `styles.MMS.fgMuted` become `#666666`. Tailwind: `cluos-neutral-700`, `cluos-text-disabled`.

**D6. Legacy `fg-muted` values stay as they are** (finding 3). They are temporary opt-outs; changing them changes explicit legacy renders. Recorded for follow-up (section 10).

**D7. Test.** `scripts/test-text-contrast.mjs` (`node:test`, no dependency, self-contained parser) asserts the three text tokens and the three foreground roles at 4.5:1 or more on every surface of both registers, disabled text below subtle text on every surface, the frozen palette values, and the mirrors. `package.json` gains `"test": "node --test scripts/test-*.mjs"`.

**D8. Documentation.** `DESIGN.md` palette table and a note on text tokens; one bullet in the `AGENTS.md` colour rules; the contrast list of `patterns/accessibility.md` rewritten with measured values of the current tokens, and its large-text threshold corrected to WCAG's 24px, or 18.66px in bold (it said 18px and 14px, the point sizes read as pixels); the disabled button of `hub-systems.md` takes `text-cluos-text-disabled`.

## 7. Before and after

Ratios on `--cluos-bg` / `--cluos-bg-subtle` / `--cluos-bg-muted`, measured by `npm test` and, independently, in the browser by `renders/text-pairs.html`.

| Token, register | Before | After |
|---|---|---|
| `--cluos-text-subtle`, light | `#A5A5A5` 2.46 / 2.46 / 2.05 | `#666666` 5.74 / 5.74 / 4.77 |
| `--cluos-color-fg-muted`, light | `#A5A5A5` 2.46 / 2.46 / 2.05 | `#666666` 5.74 / 5.74 / 4.77 |
| `--cluos-text-subtle`, dark | `rgba(247, 248, 245, 0.54)` 5.69 / 5.57 / 4.96 | unchanged |
| `--cluos-text-disabled`, light | not defined | `#A5A5A5` 2.46 / 2.46 / 2.05, exempt |
| `--cluos-text-disabled`, dark | not defined | `rgba(247, 248, 245, 0.38)` 3.35 / 3.38 / 3.19, exempt |

`npm test` on `main` values: 14 failing pairs (the two light tokens on seven surfaces) and 5 of 8 tests failing; after: 8 of 8 pass. Six deliberate mutations (subtle back to `#A5A5A5`, subtle at `#6B6B6B`, dark disabled removed, `neutral-500` changed, a JS mirror drifting, the YAML role reverted) each fail the tests they should; a no-op control passes.

`DESIGN-preview.html`, pixel diff against `main` (`renders/preview-pixel-diff.txt`): at 1440px, 7,206 pixels in 8 bands; at 390px, 7,209 pixels in 12 bands. In every band the dominant colour goes from `#A5A5A5` to `#666666`: rule labels, swatch labels, table headers, the motion feedback line and the chart period. The page height is unchanged. Crops: `renders/preview-{rules,palette,table}-before-after-1440.png`.

## 8. Compatibility and rollback

- Names: two added (`--cluos-neutral-700`, `--cluos-text-disabled`), none removed.
- Values: `--cluos-text-subtle` (light) and its mirrors change from `#A5A5A5` to `#666666`. Every page that uses the token renders darker subtle text, including the two `guides/` pages.
- Local copies do not follow. `MMS/src/styles/cluos-tokens.css` is a verbatim fallback copy (`AGENTS.md`); it still sets `--cluos-text-subtle: #A5A5A5`, has no `--cluos-text-disabled`, and 54 files under `MMS/src` use the token. `estrut/estrut-mvp/dashboard/cluos-tokens.css` carries an older `#8A939B`. MMS keeps rendering subtle text at 2.46:1 until its copy is reconciled; that is a change to the product repository and is not made here.
- A consumer that used `--cluos-text-subtle` for a disabled label now renders it darker; it should move to `--cluos-text-disabled`.
- Rollback: revert the commit.

## 9. Review history

**design-critic round 1** (on `8c51bbd`, report in `design-critic.md`): blocked. The branch introduces nothing above P3 and clears B1: 14 elements of `DESIGN-preview.html` go from 2.05–2.46:1 to 4.77–5.74:1 and no other pixel moves. The page bar is scored on the render that `main` becomes with both blocker fixes: 40/50, lowest dimensions Clareza de interação 3 and Acessibilidade 3. It still fails on P2 that are already on `main`:

- F1: `--cluos-ring-focus`, 1.53:1 against white. No branch fixes it.
- F2: two status text pairs, 2.52:1 and 3.54:1. Fixed on pull request #4.
- F5: the table scrolls the page sideways. Fixed by the sibling branch.

For this branch alone the score is 39/50; for `main` today, 38/50.

| Finding | Severity | Resolution |
|---|---|---|
| T1. Light `--cluos-text-subtle` is 3.36:1 on deep navy, and nothing said it is for light surfaces | P3 | Fixed: `DESIGN.md` and `patterns/accessibility.md` say so and name `--cluos-text-on-navy` or the dark register for navy panels. No current consumer puts it on a dark surface. |
| T2. Teal row said "só texto grande" while its `--cluos-bg-muted` value is 2.59:1 | P3 | Fixed: "só texto grande, e só sobre `--cluos-bg`". |
| T3. `neutral_700` enters the contract without a log entry | P3 | Kept, and stated in the pull request: the value is a proposal; the `palette-decisions.yaml` entry is written when Rafael accepts it. |
| T4. `--cluos-text-disabled` has no rendered consumer in the preview | P3 | Not done: a disabled control in the preview is a new element outside this fix. The specimen shows it in both registers. |

**design-qa** (on `33553c1`, report in `design-qa.md`): blocked. A passed critic is its input and that input is not met. The page also keeps three P2 findings that are already on `main`: the two status pairs (M1, fixed on pull request #4), the focus ring (M2, a decision for Rafael) and the table overflow (M3, fixed by the sibling). The six checks pass for what this branch changes: structure, priority, identity, states, responsive and behavior. The mirrors match leaf for leaf. `tokens.css` keeps every property name. The `palette` block changes only by the `neutral_500` role and the new `neutral_700` entry.

| Note | Resolution |
|---|---|
| B1-1. D1 said `#6A6A6A` is exactly 4.50:1; it is 4.496 | Fixed in D1. |
| B1-2. The large-text threshold correction was missing from D8 | Fixed in D8. |
| B1-3, B1-4. `neutral_500` changes role; `neutral_700` has no log entry | Stated in the pull request as Rafael's to accept. |
| B1-5. No disabled control renders in the preview | Same as T4. |

## 10. Out of scope, recorded for follow-up

- Legacy `--cluos-color-fg-muted` in styles `A`–`E` and `G`, and `E`'s `--cluos-color-fg-secondary` on `--cluos-bg-muted` (finding 3).
- `--cluos-ring-focus` (`0 0 0 2px #C4DB7B`) measures 1.53:1 against white, 1.27:1 against `--cluos-bg-muted` and 1.00:1 against the primary button fill, below the 3:1 of WCAG 1.4.11. It is shared by every focusable element of the preview.
- The rest of the pre-MMS values in `patterns/components.md` and the examples (teal primary buttons, `#1B2F36` navy).
