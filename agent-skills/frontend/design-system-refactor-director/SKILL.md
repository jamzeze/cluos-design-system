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
4. Direções visuais — via `design-gallery`.
5. Decisão de paleta — via `palette-policy.md`.
6. Tokens.
7. Primitives.
8. Componentes.
9. Padrões.
10. Telas de referência (golden screens).
11. Migração.
12. Remoção ou compatibilidade com legado.
13. Documentação.
14. QA.
15. Manutenção futura.

## CluOS-specific state (read before starting any new N3 work)

As of 2026-08-10, phases 1-6 for the *skill infrastructure and token
architecture* are done — see `docs/cluos-design-system-v2/`. Phases
7-10 (primitives, components, patterns, golden screens as real shipped UI)
are **not** done: no real product surface has been migrated, because no
single direction was chosen to migrate toward (see
`profiles/cluos/design-decisions.yaml`, decision dated 2026-08-10). The
next N3 pass that has a real target screen picks up at phase 7 for that
screen's chosen archetype.

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

`design-gallery` (direction) → `writing-plans` (before any code) →
`frontend-craftsman` (implementation) → `design-critic` → `design-qa` →
`verification-before-completion`.
