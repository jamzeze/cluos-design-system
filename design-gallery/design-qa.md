# Design QA

Per the `design-qa` pattern: compare a chosen **target** against its
**implementation**, render both, verify, iterate until `passed`.

Two comparisons apply here (there is no third-party target/implementation
pair in the usual sense — see below for why).

## Comparison 1 — target: `design-gallery/index.html#workbench` (approved by Rafael) vs. implementation: `tokens/tokens.css`

The workbench is what Rafael actually tested and approved
(`docs/cluos-design-system-v2/decision-log.md`, 2026-08-10 entry). The real
token architecture in `tokens/tokens.css` is a *port* of that exact
mechanism (`var(--u-x, native)` in the prototype → `[data-cluos-style]` /
`[data-cluos-palette]` in the shipped file). This comparison checks the
port didn't drift from what was approved.

| Combination | Target (workbench, tested live in-session) | Implementation (tokens.css, tested via computed-style assertions) | Match |
|---|---|---|---|
| B, no palette | action `#0E8F87`, canvas `#F5F7F4` | action `#0E8F87`, canvas `#F5F7F4` | ✅ |
| B + Forest Command | action `#3D7A46`, canvas unchanged | action `#3D7A46`, canvas unchanged `#F5F7F4` | ✅ |
| G, no palette | action `#1FB5AB`, canvas `#010D28` (fixed dark) | action `#1FB5AB`, canvas `#010D28` | ✅ |
| G + Terracotta Slate | action `#E08F63` (dark-tuned, not `#B5623A`), canvas unchanged dark | action `#E08F63`, canvas unchanged `#010D28` | ✅ |
| G + Forest Command | action `#6FBE72` (dark-tuned) | action `#6FBE72` | ✅ |
| C + Cold Luxury | action `#2D6CDF`, canvas `#FAFAF7` (C's own, unaffected) | action `#2D6CDF`, canvas `#FAFAF7` | ✅ |
| D + Teal Ink | action `#00696B`, canvas `#FFFFFF` | action `#00696B`, canvas `#FFFFFF` | ✅ |

**Method:** the implementation side was not eyeballed — verified via
`getComputedStyle()` reading `--cluos-color-*` custom properties in a real
Chromium-based browser render (`docs/cluos-design-system-v2/
skill-provenance.md` records this method), for all 9 combinations tested,
9/9 matched.

**Result: passed.** No drift between what was approved and what shipped.

## Comparison 2 — target: `design-archetypes.yaml` specs vs. implementation: the six mockups in `design-gallery/index.html`

Since the archetypes were mocked first and the YAML spec was written to
describe what was already approved (not the other way around), this
comparison checks the *documentation* didn't drift from the *artifact*,
not the usual "did we build the target correctly" direction.

| Archetype | Spec claims (design-archetypes.yaml) | Mockup evidence | Match |
|---|---|---|---|
| A | preserve, teal `#008080`/navy `#1B2F36`, radius 6/8/12 | `.dA` CSS: identical values | ✅ |
| B | evolve, teal `#0E8F87`, radius 4/5/6 | `.dB` CSS: identical | ✅ |
| C | new, cobalt `#2B49C7`, radius 0/2, serif display | `.dC` CSS: identical, `font-family:"Newsreader"` present | ✅ |
| D | preserve mono, teal `#007070`, radius 0 | `.dD` CSS: identical, no `border-radius` declared anywhere in `.dD` rules | ✅ |
| E | evolve warm, teal `#0E6E68`, radius 10/12 | `.dE` CSS: identical | ✅ |
| G | evolve dark, teal `#1FB5AB`, dark canvas `#010D28` | `.dG` CSS: identical | ✅ |

**Result: passed.**

## Why there is no "canonical target screen vs. shipped product screen" comparison

No real product surface was migrated (Subproject D was reframed — see
`docs/cluos-design-system-v2/04-selected-direction.md`). The usual
design-qa shape (open the target mockup, open the live product page,
compare pixel-for-pixel) has no live product page to open, because none
exists yet that consumes this architecture. This is reported here rather
than silently omitted — the first real screen built against this
architecture is where that comparison first becomes possible.

## Overall QA result

**`passed`** for both comparisons in scope. Viewport tested: 1280px
desktop (the mockups' native width) and default browser width for the
gallery page chrome. Dark-mode-specific comparison (G) included above.
