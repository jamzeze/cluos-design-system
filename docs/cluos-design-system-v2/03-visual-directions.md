# 03 — Visual Directions

## What was built and approved

Seven archetypes were mocked on real `suporte.cluos.online` content
(dashboard, service detail, invite form) and presented to Rafael on
2026-08-10 via `design-gallery/index.html`. Six approved, one rejected.
Full spec for each: `agent-skills/shared/design-archetypes.yaml`.

| id | name | base archetypes (§10 vocabulary) | status |
|---|---|---|---|
| cluos-calm-command | A · Calm Command | luxury-medical + data-precision + swiss-minimal | approved |
| data-precision | B · Data Precision | data-precision + swiss-minimal | approved |
| night-watch | G · Night Watch | data-precision (dark register) | approved |
| cluos-editorial-intelligence | C · Editorial Intelligence | editorial-luxury + contemporary-magazine + data-precision | approved |
| swiss-ledger | D · Swiss Ledger | swiss-minimal | approved |
| clinic-premium | E · Clinic Premium | luxury-medical | approved |
| refined-brutalist | F · Grid Manifest | refined-brutalist | **rejected 2026-08-10** |

## Reference vocabulary not built as CluOS mockups (scoping decision)

The source metaprompt's §10 lists ten base archetypes plus two named
CluOS hybrids. Four base archetypes were not adapted into full CluOS
mockups: `editorial-luxury` (standalone — only used as an ingredient of C),
`contemporary-magazine` (standalone — same), `high-end-architecture`,
`apple-like-precision`/Product Precision, `fashion-luxury`,
`japanese-minimal`. Reason: CluOS's actual surface inventory (dashboards,
tables, forms, health monitoring — see
`agent-skills/profiles/cluos/surface-inventory.md`) is operational, not
marketing/portfolio-oriented, and the metaprompt's own guidance for each of
these explicitly flags them as poor fits for operational surfaces (e.g.
"high-end-architecture: evitar telas operacionais excessivamente vazias";
"fashion-luxury: evitar aplicar a estética a tabelas e formulários"). If a
marketing/landing surface enters scope later, `design-gallery` generates
from this remaining vocabulary rather than reusing an operational archetype
that doesn't fit — do not force B/D/G onto a landing page.

## Artifact

`design-gallery/index.html` — self-contained, no build step. Includes:

- `#workbench` — live interactive style+palette picker (6 x 7 combinations,
  see `06-design-foundations.md` for how the token aliasing makes this
  possible without per-combination markup).
- Full three-screen mockups for the six approved archetypes.
- The extended palette swatch library with three live decoupling proofs.

## Decision record

See `04-selected-direction.md` and
`agent-skills/profiles/cluos/design-decisions.yaml` for the actual decision
(a library, not a single winner) and its rationale.
