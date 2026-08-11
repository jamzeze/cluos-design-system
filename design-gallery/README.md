# Design Gallery

`index.html` is the canonical, self-contained Design Gallery artifact
required by the `design-gallery` skill (§9.2 of the source metaprompt). Open
it directly in a browser — no build step, no dependencies.

Contains:

- An interactive workbench (`#workbench`) — pick any of the 6 approved
  archetypes and any of the 7 registered palettes, the mockup updates live.
  This is the fastest way to compare options for a real task.
- Full three-screen mockups (dashboard, service detail, invite form) for
  archetypes A, B, C, D, E, G, each rendered on real `suporte.cluos.online`
  content.
- The rejected archetype (F · Grid Manifest) has been removed from this
  file per Rafael's 2026-08-10 decision — see
  `../agent-skills/shared/design-archetypes.yaml` (`status: rejected`) if
  you need the historical record.
- The extended palette library and three live palette-swap proofs.

Data backing this artifact (archetype theses, palette hex values, decisions)
lives in `../agent-skills/shared/` and `../agent-skills/profiles/cluos/` —
treat those as the source of truth if this file and the YAML/MD ever
disagree; update both together.
