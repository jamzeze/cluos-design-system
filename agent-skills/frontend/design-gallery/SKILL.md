---
name: design-gallery
description: Generates real, comparable visual alternatives for N2/N3 frontend work when a comparison or explicit opt-out is needed. The canonical default is cluos-mms-v1; this skill never changes it implicitly.
---

# design-gallery

Produces real, comparable visual alternatives — not a template catalog, not
a list of adjectives. For CluOS specifically, most of this work is already
done. Resolve the support roots first: installed clients use
`../../shared/cluos-design-system` and
`../../profiles/cluos-design-system/cluos`; the canonical source checkout uses
`../../shared` and `../../profiles/cluos`. Use the first complete pair and
stop on a missing or mixed pair. Read `design-archetypes.yaml` and
`palette-policy.md` from the resolved shared root. In the common case this
skill's job is to **compare the existing library or document a deliberate
opt-out**, not to replace the canonical default.

For N2, and N3 when screens/flows change, read the approved
`ux-layout-contract.md` first. Visual alternatives must preserve its task flow,
zones, co-visibility, P0/P1 priority, action boundaries, and DOM/focus order.
If the contract is absent, provisional, blocked, or structurally changed by an
option, stop and return to `ux-layout-architect` for explicit approval.

## When new archetypes/palettes ARE needed

Only generate a genuinely new archetype or palette when none of the
registered options fit the surface (e.g. a marketing/landing surface, which
the current library was not designed for — see
`surface-inventory.md` in the resolved profile root, "Not yet inventoried").
When you do:

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
4. Present the canonical MMS contract first. Show the palette table only when
   the task explicitly requests a comparison or legacy opt-out.
5. A human choice is required only for a non-canonical opt-out; otherwise
   proceed with `cluos-mms-v1`.
6. Record the choice: append an entry to
   `design-decisions.yaml` (style) and `palette-decisions.yaml` (palette) in
   the resolved profile root if it's a new pairing
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

The legacy palette library remains registered for compatibility — see
`palette-policy.md`.

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

→ `frontend-craftsman` with the recorded archetype + palette choice and the
approved layout contract when one is required.
