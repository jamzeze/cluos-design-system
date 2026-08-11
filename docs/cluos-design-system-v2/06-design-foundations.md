# 06 — Design Foundations

Because CluOS runs six archetypes as a permanent library rather than one
committed identity (`04-selected-direction.md`), foundations split into two
tiers: **cross-archetype primitives** (apply everywhere, regardless of
which archetype/palette a screen uses) and **per-archetype specifics**
(vary by design).

## 1. Principles (cross-archetype)

- Precisão antes de decoração.
- Confiança sem frieza.
- Densidade proporcional à tarefa (an archetype choice IS a density
  choice — see the table below).
- Hierarquia evidente por tipografia/hairline antes de recorrer a cor.
- Um foco primário por tela.
- Estado nunca depende só de cor.
- Acessibilidade como requisito, não extra.

## 2. Token architecture (cross-archetype, the actual mechanism)

Every archetype's component CSS reads color through semantic role tokens:
`--u-accent`, `--u-accent-deep`, `--u-ink`, `--u-bg`, `--u-surface`,
`--u-line`, `--u-line2`, `--u-mut`, `--u-sub`, `--u-ok`, `--u-warn`,
`--u-err`, `--u-signal` (plus `-dark` suffixed variants for the Night Watch
dark register). An archetype's own CSS variable (e.g. `.dA{--teal:
var(--u-accent, #008080)}`) falls back to its native color when no palette
class is applied, and picks up any `.pal-*` class's override otherwise.

This is not a proposal — it's the pattern validated in the interactive
workbench (`design-gallery/index.html#workbench`, 6 styles × 7 palettes,
tested live) and then ported unchanged into `tokens/tokens.css` (see
Subproject D in `agent-skills/frontend/design-system-refactor-director/SKILL.md`).

**What stays fixed per archetype, never reskinned by palette:** structural
brand chrome that is part of an archetype's identity — the dark navy rail
in Data Precision, the fully-dark canvas in Night Watch, the serif
typography in Editorial Intelligence. Style and palette are independent
axes; structure and typography are part of style, not of palette.

## 3. Typography (per archetype — no single system-wide choice)

| Archetype | Display | Body | Mono |
|---|---|---|---|
| A · Calm Command | Inter | Inter | JetBrains Mono |
| B · Data Precision | Manrope | Instrument Sans | JetBrains Mono |
| G · Night Watch | Manrope | Instrument Sans | JetBrains Mono |
| C · Editorial Intelligence | Newsreader (serif) | Instrument Sans | JetBrains Mono |
| D · Swiss Ledger | Inter | Inter | JetBrains Mono |
| E · Clinic Premium | Instrument Sans | Instrument Sans | JetBrains Mono |

Cross-archetype rule: max two families per screen (display + body, or one
family doing both). Mono is always JetBrains Mono for tabular/numeric data,
no exceptions — this is the one typographic constant across all six.

## 4. Spacing & grid (cross-archetype)

Base scale carried over unchanged from v0.3
(`--cluos-space-1` … `--cluos-space-24`, 0.25rem to 6rem). Breakpoints:
`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`. Container widths:
prose 42rem, docs 48rem, product 72rem, wide 80rem — unchanged from v0.3,
already sane, no reason to redesign.

## 5. Radius & elevation (per archetype — deliberately different)

| Archetype | Radius scale | Elevation |
|---|---|---|
| A | 6/8/12px | shadow only in popover/menu |
| B / G | 4/5/6px | near-zero; border does the separating |
| C | 0/2px | none |
| D | 0px only | none |
| E | 10/12px | soft, tinted shadow only |

Cross-archetype rule (unchanged from source rubric): max 3 radius steps and
max 3 elevation steps *per archetype* — never mix an archetype's own scale
with another's.

## 6. Iconography (cross-archetype)

No icon library dependency was added in this pass — none of the six
archetypes lean on decorative icons (status is conveyed by a semantic dot,
by text, or by tag color, never by a generic icon-per-item). If a future
surface needs a real icon set, pick one library project-wide per the
`frontend-craftsman` anti-pattern list (no mixing families) — not decided
here because no consuming project exists yet to decide it for.

## 7. Motion (cross-archetype)

Baseline unchanged from v0.3: `ease-out`/`ease-in-out`, 120/200/400ms
steps. All six archetypes use motion at "low intensity" — transitions on
hover/focus, no scroll-driven or decorative animation, consistent with
CluOS being an operational product, not a marketing site. Respect
`prefers-reduced-motion` universally.

## 8. Data density patterns (cross-archetype)

Tables: numeric columns always right-aligned, mono, tabular-nums. Status:
semantic dot or tag color + text label, never color alone. Empty/loading/
error states: every archetype's mockup includes at minimum an empty and an
error path in its component set (see `frontend-craftsman` SKILL.md).
