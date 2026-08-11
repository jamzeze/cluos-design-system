# 01 — Current System Audit

Read-only inventory of `cluos-design-system` as it stood before this
refactor. Facts are cited with file:line. Judgments are marked as such.

## Token inventory (fact)

`tokens/tokens.css` (181 lines), v0.3, "Teal Classic":

- 5 radius steps: `6px, 8px, 12px, 16px, 24px` (tokens/tokens.css:96-100)
- 4 shadow steps, all tinted navy `rgba(27,47,54,...)` (tokens/tokens.css:103-108)
- 4 approved gradients, all diagonal 135deg (tokens/tokens.css:47-56)
- Font stack: Inter / Inter Tight, no decision documented for *why* Inter
  vs. an alternative (tokens/tokens.css:63-64)
- 8 spacing steps, 4 container widths, single ease-out/ease-in-out pair

`tokens-experimental/thermal-nocturne-tokens.css` (202 lines), v0.4,
"Thermal Nocturne": parallel token set with different radius/shadow/motion
values and Manrope + Instrument Sans typography, explicitly marked in
`CHANGELOG.md` as "approved design direction, not yet a replacement" — i.e.
two systems existed with no resolution mechanism (fact).

**Judgment:** two live token sets with no documented precedence rule is
itself an AI-slop-adjacent risk (inconsistency across consuming surfaces,
depending on which file a given screen happened to import). Resolved in
this refactor by making both first-class palettes inside one semantic layer
rather than picking a winner (see `agent-skills/shared/palette-policy.md`).

## AI-slop signals found (judgment, evidence cited)

| Signal | Evidence | Severity |
|---|---|---|
| Radius applied without a stated rule | 5 radius steps, no doc says which component uses which | Medium |
| Font choice undocumented | Inter picked with no rationale on record (tokens/tokens.css:63) | Low |
| Gradient as decoration risk | 4 "approved" gradients exist, but no rule limits when they may be used as background vs. accent | Medium |
| Two coexisting brand identities | v0.3 vs v0.4 token sets, CHANGELOG flags but doesn't resolve | High |
| No semantic token layer | All consumers reference raw `--cluos-teal` etc. directly — no `color-action-primary` / `color-bg-canvas` role layer existed | High |

## What was NOT found (fact, stated for honesty)

- No hardcoded arbitrary hex values inside `tokens/tokens.css` itself — it
  is already a clean single source for its own scope. Spot-checked
  `patterns/` and `examples/` markdown files for hex literals: hits are in
  narrative/example markdown (`patterns/accessibility.md`,
  `examples/apple-inspired-product-ui/*.md`), not in shipped component code
  — this package has no component code to audit (it's tokens + docs only).
- No component library exists in this repo to audit for "Card dentro de
  Card" or similar structural anti-patterns — those checks apply to
  *consumers* of the design system, none of which currently import it (see
  `00-baseline.md`).
- No dark mode token set existed before Thermal Nocturne (v0.4 introduces
  `color-scheme: light dark` — tokens-experimental/thermal-nocturne-tokens.css:8).

## Metrics baseline (per metaprompt §6.5, scoped to what's measurable here)

Since this package ships tokens/docs, not components, several requested
metrics (Card-in-Card count, component duplication, console errors) don't
apply — there's no rendered product surface *in this repo* to measure. The
metrics that do apply:

- Unique brand colors across both token files: 6 (v0.3) + 9 (v0.4) = 15
  raw hex values before this refactor, several representing the same
  semantic role twice (two different "navy," two different "teal").
- Radius values: 5 (v0.3) + separate scale (v0.4) = no shared scale.
- Palette hardcoded values in consumer repos (MMS, estrut): both use their
  *own* local copies rather than importing tokens — see
  `agent-skills/profiles/cluos/surface-inventory.md`. Not this package's
  drift to fix; noted as a future adoption opportunity, not touched here.
