---
name: design-gallery
description: Generates real, comparable visual alternatives before implementation for N2/N3 frontend work — a library of design archetypes and palettes, not a template catalog. Use after anti-ai-slop-frontend classifies a task as N2 or N3, or whenever more than one visual direction is genuinely relevant to an N1 task. For CluOS, this skill presents the existing archetype+palette library and requires an explicit human choice per task — it does not pick a default.
---

# design-gallery

Produces real, comparable visual alternatives — not a template catalog, not
a list of adjectives. For CluOS specifically, most of this work is already
done: read `../../shared/design-archetypes.yaml` and
`../../shared/palette-policy.md` first. In the common case this skill's job
is to **present the existing library and capture a choice**, not to invent
new archetypes from scratch.

## When new archetypes/palettes ARE needed

Only generate a genuinely new archetype or palette when none of the
registered options fit the surface (e.g. a marketing/landing surface, which
the current library was not designed for — see
`profiles/cluos/surface-inventory.md` "Not yet inventoried"). When you do:

- Generate exactly 3 options per round unless told otherwise.
- Each option must differ in composition, hierarchy, density, and
  typography — not just color.
- Same content, same viewport, same functional structure across options —
  comparability is the point.
- Present at least one `preserve` option and at least one `new` option for
  palette (see `palette-policy.md` §2).
- Render as a real artifact (an HTML page, a Storybook story, a route) —
  never ship descriptions only.

## Standard flow for CluOS (the common case)

1. Read `design-archetypes.yaml`. Filter to `status: approved` (currently
   A, B, C, D, E, G — `refined-brutalist`/F is `status: rejected`, never
   re-offer it without a fresh explicit request).
2. Filter to archetypes whose `surfaces_recommended` plausibly fit the
   task's surface. If unsure, include the full approved set rather than
   guessing narrow.
3. Present each candidate with: name, thesis, native palette, and a link
   to its mockup in `design-gallery/index.html` (or the live workbench at
   `design-gallery/index.html#workbench` for a quick live compare).
4. Present the palette table from `palette-policy.md` §3 alongside, noting
   this is chosen **independently** of archetype.
5. Wait for an explicit choice of archetype **and** palette. Do not
   proceed to `frontend-craftsman` without both, for any N2/N3 task.
6. Record the choice: append an entry to
   `profiles/cluos/design-decisions.yaml` (style) and
   `profiles/cluos/palette-decisions.yaml` (palette) if it's a new pairing
   not already logged, and write the pairing into `design-decision.md` for
   this specific task/PR.

## Registered library snapshot (see design-archetypes.yaml for full detail)

| Archetype | Palette mode | Best for |
|---|---|---|
| A · Calm Command | preserve | dashboards médios, configuração |
| B · Data Precision | evolve | operação de alta densidade |
| G · Night Watch | evolve (dark) | monitoramento contínuo, salas de comando |
| C · Editorial Intelligence | new | relatórios, visão executiva |
| D · Swiss Ledger | preserve | telas simples, baixo risco |
| E · Clinic Premium | evolve | superfícies para clientes hospitalares |

7 palettes registered independently — see `palette-policy.md`.

## Artifact requirement

The gallery must exist as a navigable or visually-consultable artifact.
Priority order: Figma (if connected) > Storybook > local gallery route >
static HTML (current state — `design-gallery/index.html`) > organized
screenshots. Never text-only descriptions as the final deliverable.

## Selection record

Save, per task:

- opção escolhida (archetype id)
- paleta escolhida (palette id)
- viewport
- feedback do usuário, se houver
- data
- consequências para tokens/componentes (normalmente nenhuma — a
  arquitetura de tokens já suporta qualquer combinação registrada)

## Handoff

→ `frontend-craftsman` with the recorded archetype + palette choice.
