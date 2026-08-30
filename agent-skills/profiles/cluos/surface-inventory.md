# CluOS — Surface Inventory

Reference surfaces used to build and validate the design gallery. Not an
exhaustive map of every screen in every CluOS repo — scoped to what was
actually auditable and representative when this profile was written
(2026-08-10).

## Reference application: `suporte`

`/Users/rafacosta/Documents/GitHub/suporte` — public hub (React/Vite,
`apps/hub`), admin hub (React/Vite, `apps/web`), health API (FastAPI,
`apps/api`). Does not currently import `@cluos/design-system` as a package;
its own token/component setup is independent. Used as the *content and
structure* reference for the design gallery mockups (same routes, same
data shape, same copy) — not as a live consumer whose code was touched by
this refactor.

### Surfaces mocked and used for archetype/palette comparison

| Surface | Route (reference) | Represents |
|---|---|---|
| Dashboard denso | Operação / Visão geral | health across `b3, crm, sci, loteca, did, medframe, aeo` |
| Detalhe de serviço | Produtos / crm | incident timeline, endpoints, supervised (L2) actions |
| Formulário | Acessos / Convidar | role-gated invite flow backed by Authelia |

## Other product repos (local copies of tokens, not live package consumers)

- `MMS` — its shell now follows `cluos-mms-v1` and keeps
  `src/styles/cluos-tokens.css` as a checked-in fallback until the package is
  installed. Adoption and the explicit legacy dark surface are documented in
  `MMS/docs/design/2026-08-30-cluos-mms-canonical-adoption.md`.
- `estrut/estrut-mvp/dashboard` — has a `cluos-tokens.css` explicitly
  labeled "cópia local sincronizada," sourced from MMS, not from this
  package.
- Several timestamped snapshots under `_cluos-maintenance/` and
  `_cluos-worktrees/` carry the same local-copy pattern — these are
  historical/archived working directories, not active consumers.

**Implication for any token refactor:** zero real packages currently
`import '@cluos/design-system'`. Compatibility aliasing (old `--cluos-*`
variable names resolving unchanged) is done anyway, cheaply, so that MMS and
estrut can adopt the real package later without a rewrite — but it is not
required to avoid breaking a live consumer today, because there isn't one.

## Not yet inventoried

Marketing/landing surfaces, mobile views, and other product repos beyond
`suporte`/`MMS`/`estrut` were not audited for this pass. Do not assume the
archetype library (dashboard/table/form-oriented) fits marketing or
public-facing surfaces without a fresh `get-context` pass.
