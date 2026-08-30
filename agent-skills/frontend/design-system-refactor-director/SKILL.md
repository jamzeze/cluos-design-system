---
name: design-system-refactor-director
description: Conducts systemic design system refactors — prevents polishing isolated screens while leaving a weak foundation in place. Use for N3-level work (routed here by anti-ai-slop-frontend): design system refactors, global palette/token changes, new shared primitives. Not for single-screen or single-component work.
---

# design-system-refactor-director

Conducts refactors that touch the foundation, not a single screen. If
`anti-ai-slop-frontend` routed here, do not let the work shrink back down to
"fix this one screen" without going back through the router.

## Phases (adapt scope, don't skip)

1. Inventário — what exists today (tokens, components, patterns, usage).
2. Auditoria — problems, metrics, AI-slop signals (see
   `docs/cluos-design-system-v2/01-current-system-audit.md` for the CluOS
   baseline as of 2026-08-10).
3. Princípios — what this refactor is optimizing for.
4. Contratos de layout — record `not applicable` when no screen/flow structure
   changes; otherwise use `ux-layout-architect` for golden screens and changed
   flows, and approve structure before visual exploration.
5. Direção visual — `cluos-mms-v1` por padrão; use `design-gallery` somente
   para comparação ou opt-out explícito, preservando contratos aprovados.
6. Decisão de paleta — só para uma exceção registrada em `palette-policy.md`.
7. Tokens.
8. Primitives.
9. Componentes.
10. Padrões.
11. Telas de referência (golden screens).
12. Migração.
13. Remoção ou compatibilidade com legado.
14. Documentação.
15. QA.
16. Manutenção futura.

## CluOS-specific state (read before starting any new N3 work)

Resolve support roots as one complete pair before reading project state:

- Installed client: `../../shared/cluos-design-system` and
  `../../profiles/cluos-design-system/cluos`.
- Canonical source checkout: `../../shared` and `../../profiles/cluos`.

Use the first complete pair. Stop if either half is missing or if the pair is
mixed; do not silently fall back to stale global copies.

As of 2026-08-30, `cluos-mms-v1` is the global direction for the token
architecture and all new product surfaces. The A–G archetype library remains
available for explicit legacy opt-outs and comparative review. A real target
screen migrates from phase 7 using the canonical MMS contract unless an
append-only decision records a temporary exception.

## Migration strategy (when there IS a real target)

- Compatibility layer / token aliases first — never a hard cutover.
- Explicit deprecation, not silent removal.
- Comparative stories/screenshots (before/after).
- Codemod when it's justified by volume.
- Migrate by component family, then by representative surface.
- Remove legacy only after a global search confirms zero remaining
  references, and only with tests passing.
- Rollback documented before the migration starts, not after.

## Handoff

`ux-layout-architect` for changed golden screens/flows → `design-gallery`
(direction) → `writing-plans` (before any code) →
`frontend-craftsman` (implementation) → `design-critic` → `design-qa` →
`verification-before-completion`.
