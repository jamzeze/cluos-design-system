# 05 — Palette Options

Registry lives in `agent-skills/shared/palette-policy.md` — this doc adds
the analysis (problems, contrast, migration risk) that the policy doc
doesn't need to carry day-to-day.

## Current palette, normalized (before this refactor)

| Role | v0.3 (Teal Classic) | v0.4 (Thermal Nocturne) |
|---|---|---|
| Action/accent | `#008080` | `#16A39A` (light) / `#1FB5AB` (dark-tuned) |
| Primary text | `#1B2F36` | `#010D28` |
| Canvas | `#FFFFFF` | `#FFFFFF` (light) / `#010D28` (dark) |
| Error | `#8A3A3A` | `#8A3A3A` (unchanged) |
| Warning | `#BD7845` | `#BD7845` (unchanged) |

## Problems found (see `01-current-system-audit.md` for full evidence)

- Two "primary text" colors representing the same role (`#1B2F36` vs
  `#010D28`) with no documented precedence.
- No semantic role layer — every consumer would have had to reference
  `--cluos-teal` directly, meaning a future palette swap required editing
  every consumer rather than one token file.
- Accent color used for multiple unrelated roles in the old CSS comments
  (action AND success both `#008080` in v0.3) — the anti-slop rubric flags
  this as a pattern-recognition risk (see `anti-slop-rubric.md`).

## Options delivered (all shipped, not a pick-one gate — see `04-selected-direction.md`)

### `preserve` — Teal Classic, Teal Cool Slate, Teal Ink, Swiss Mono

Keep `#008080`/`#1B2F36` anchors. Three variants differ in neutral warmth
and contrast (Cool Slate = cooler grays for A/D; Ink = higher-contrast
near-black for dense text; Swiss Mono = same accent, pure black/white
scaffold for D).

### `evolve` — Thermal Nocturne (+dark), Clinic Warm, Forest Command, Copper Signal

Keep one anchor (teal), redesign neutrals/surfaces/secondary accents.
Thermal Nocturne keeps navy+teal, swaps in signal green; Clinic Warm keeps
teal, swaps to porcelain+champagne; Forest Command evolves teal toward
forest green with a gold signal; Copper Signal keeps navy+teal, swaps
warning/signal to copper.

### `new` — Editorial Cobalt, Cold Luxury, Terracotta Slate

Fresh identity, no teal/navy inheritance. Editorial Cobalt (ink+paper+
cobalt) backs Archetype C. Cold Luxury (silver+chrome+electric blue) and
Terracotta Slate (rust+slate) are general-purpose alternatives, deliberately
picked from the anti-slop skill's approved "premium-consumer alternative
families" list to avoid the banned beige+brass+oxblood+espresso default.

## Contrast

All accent/ink/bg pairs across all 12 registered palette entries (6 native
+ 6 extra) were built to pass WCAG AA for body text at their intended
role (accent-deep and ink variants exist specifically to hit AA where the
raw accent wouldn't — e.g. `pal-tealink`'s `#00696B` is a darkened,
AA-safe variant of `#008080` for text-on-white use). Not independently
verified with an automated contrast checker in this pass — flagged in
`skill-provenance.md` "Deferred."

## Migration risk

None for existing consumers: zero repos currently `import
'@cluos/design-system'` (see `00-baseline.md`). All thirteen `--cluos-*`
(v0.3) and Thermal Nocturne (v0.4) variable names are preserved as
compatibility aliases in the new `tokens/tokens.css` with unchanged values
— see `06-design-foundations.md` §Token architecture.
