# Decision Log

Human-readable log. Machine-readable source of truth:
`agent-skills/profiles/cluos/design-decisions.yaml` and
`palette-decisions.yaml`. Append-only.

## 2026-08-10 — Style chosen per task, no single canonical direction

Rafael reviewed seven mocked archetypes on real `suporte` surfaces.
Approved A, B, C, D, E, G. Rejected F (Grid Manifest). Explicit
instruction: "quero escolher cada vez" — style is picked at build time for
each task, not fixed for the whole design system.

**Consequence:** `design-archetypes.yaml` is a permanent library, not a
staging area for one winner. `anti-ai-slop-frontend` must present options
and capture an explicit choice for every N2/N3 task.

## 2026-08-10 — Palette decoupled from archetype; live workbench requested and built

Rafael requested more palette variations and a live style+color picker on
the main mockup. Delivered: interactive workbench (6 styles × 7 palettes)
using a `var(--u-x, native)` CSS custom-property alias layer. Tested live
by Rafael, confirmed working (verified via computed-style assertions and
visual screenshot during the session, including the G + Terracotta Slate
combination which exercises the dark-register `-dark` token variants).

**Consequence:** this alias pattern became the real semantic token
architecture in `tokens/tokens.css`, not just a prototype-only trick.

## 2026-08-10 — "Pode implementar tudo": full canonical implementation authorized

Rafael approved the complete metaprompt scope. Advisor consulted before
starting; four concrete corrections applied per its review:

1. Subproject D reframed (no single direction to migrate real surfaces
   toward — see `04-selected-direction.md`).
2. Pre-flight git check run before any edit (repo was clean; new branch
   `feat/cluos-design-system-anti-slop` created).
3. The approved gallery artifact moved into version control
   (`design-gallery/index.html`) rather than left loose outside any repo.
4. Consumer blast-radius checked properly (nested packages, not just
   top-level `package.json`) before touching `tokens/` — found zero live
   consumers, which is why the token refactor ships as additive
   architecture with compatibility aliases rather than a coordinated
   migration.

**Consequence:** this refactor proceeds as a LONG_REFACTOR-style
continuous single-writer pass (per `/Users/rafacosta/Documents/GitHub/CLAUDE.md`),
ending in a full diff review and one question about tests/commit — not
per-file check-ins.
