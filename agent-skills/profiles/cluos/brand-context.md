# CluOS — Brand Context

## Brand essence (from DESIGN.md)

CluOS is "quiet confidence." The current product identity is the MMS Swiss
Ledger contract: Manrope display, Instrument Sans interface/data, hairlines,
zero radius and zero elevation. The wordmark remains the shipped CluOS mark;
`CluOS MMS Marketing Studio` is the canonical product lockup.

## Assets

`brand-assets/` in this repo — logo lockups (gradient, duo, black, white,
navy, teal variants), symbol-only variants, favicon. Canonical source for
re-export: the Google Drive folder referenced in `DESIGN.md` §2.

## Canonical palette and compatibility history

1. **`cluos-mms-v1` (canonical, 2026-08-30)** — deep navy and medium blue
   structure, tech green positive action, operational teal for progress,
   copper for warning/review and oxblood for denial/error. See
   `tokens/mms-canonical.yaml` for exact values.
2. **Teal Classic and Thermal Nocturne** — compatibility history only. Their
   aliases remain available for explicit legacy opt-outs during migration.

New products must not select a legacy style or palette as their global default.

## What must never change without an explicit decision

- The wordmark / symbol construction itself.
- The oxblood-family error color (`#8A3A3A` / `#C46A6A` dark) — consistent
  across every registered palette so error states pattern-match everywhere.
- Copper and oxblood remain semantic states only; neither is a positive CTA.
