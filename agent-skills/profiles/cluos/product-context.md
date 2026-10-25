# CluOS — Product Context

Loaded automatically by `anti-ai-slop-frontend` whenever work happens inside
a CluOS repository (any repo under `/Users/rafacosta/Documents/GitHub` that
consumes or is expected to consume `@cluos/design-system`).

## What CluOS is

An operating loop across several products under one identity: `b3`, `crm`,
`sci`, `loteca`, `did`, `medframe`, `aeo`, plus the `suporte` hub that
aggregates health, users, and access for all of them. Rafael runs the whole
ecosystem largely autonomously through Claude Code and Codex.

## Users

- Rafael — operator, admin, the one making frontend design decisions.
- Isabel and a small number of other named users — operators/viewers inside
  `suporte`'s Authelia-gated access.
- No general public-facing consumer surface exists yet inside the reference
  used for design work (`suporte` admin). Marketing/landing surfaces usam o
  registro público do `cluos-v2` (segunda passada; primeira página
  recomendada: azigos.com.br) com o checklist de página pública da rubrica
  anti-slop; não aplique o registro de produto a elas por analogia.

## Core workflows the UI serves

1. **Monitor** — service health, uptime, latency, incidents across products.
2. **Operate** — supervised (L2) actions: restart service, silence alert,
   open runbook.
3. **Grant access** — invite users, assign per-product roles, manage
   expiration, all backed by Authelia.
4. **Report** — executive/consulting-facing summaries (hospital consulting
   engagements are a real line of business); números de destaque podem usar a
   fonte de destaque, uma por composição.

## Identidade por produto (cluos-v2)

Núcleo visual idêntico; cada produto recebe um matiz do arco-íris só para
identificação (`product_hue` em `tokens/cluos-v2.yaml`): azigos hue-05, crm
hue-11, sci hue-07, b3 hue-10, medframe hue-03, loteca hue-12, did hue-08, aeo
hue-01. Nunca em ação, status ou navegação. Nenhum produto migrou ainda para
o `cluos-v2`; a migração de MMS, azigos e suporte é uma onda separada.

## Non-negotiable functional constraints for any redesign

- Supervised (L2) destructive-adjacent actions (restart, reinstate) must
  stay visually distinct from reversible actions (silence, export) in every
  register and theme — this is a safety property, not a style choice.
- Role-gated products (e.g. `did` requiring Administrador) must show the
  gate in the UI, not hide it silently.
- Status must never depend on color alone (see anti-slop-rubric
  accessibility row).
