# 00 — Baseline

Recorded before any edit in this refactor.

## Repo state (2026-08-10, before this branch)

- Repo: `cluos-design-system`
- Branch at start: `design/thermal-nocturne-experimental` (1 commit ahead
  of `main`: `9c87d1f docs(experimental): preserve Thermal Nocturne design
  work from Codex sandbox`)
- Working tree: clean, no stashes
- New branch created for this work: `feat/cluos-design-system-anti-slop`
  (off the experimental branch, so the Thermal Nocturne docs are included)

## Environment

- Node v22.22.3, npm 10.9.8
- `package.json` has zero `scripts` — no build/lint/test step exists for
  this package. Verification for this refactor is: shell script syntax
  (`bash -n`), the validator (`scripts/validate-agent-skills.sh`), the
  routing consistency check (`scripts/test-frontend-routing.sh`), and
  manual rendering of `design-gallery/index.html`.
- `.github/workflows/release.yml` is a manual `workflow_dispatch`-only,
  Alpha-frozen publish gate — untouched by this refactor, no risk of
  triggering a publish.

## Package shape before this refactor

```
package.json            @cluos/design-system v0.3.0
tokens/                 tokens.css, tokens.js, tokens.ts, tailwind-preset.js, index.ts
tokens-experimental/    thermal-nocturne-tokens.css, thermal-nocturne-fonts.css
brand-assets/           logo/symbol SVGs
guides/, patterns/, examples/
DESIGN.md, DESIGN-WORKFLOW.md, APPLE-INSPIRED-PRODUCT-UX.md,
PRODUCT-PATTERNS.md, PRODUCT-SIMPLICITY-CANON.md, PRODUCT-THEME-VARIANTS.md,
MIGRATION-AUDIT.md, DESIGN-preview*.html, CHANGELOG.md
```

## Skill locations (empirically confirmed, not assumed)

- Claude: `~/.claude/skills/<slug>/SKILL.md`
- Codex: `~/.codex/skills/<slug>/SKILL.md`
- Same frontmatter contract works for both (`name`, `description` minimum;
  Codex tolerates extra fields like `version`, `positive_triggers`, Claude
  ignores fields it doesn't use). Confirmed by inspecting
  `~/.claude/skills/repo-audit/SKILL.md` and `~/.codex/skills/impeccable/SKILL.md`
  before writing the canonical skills.
- No prior sync mechanism existed between the two — 18 skills in
  `~/.claude/skills/`, 14 in `~/.codex/skills/`, overlapping but divergent
  sets, confirmed by directory listing.

## Consumer blast radius (why Subproject D was reframed)

`grep -rl '@cluos/design-system|cluos-design-system|cluos/tokens.css'` across
every repo under `/Users/rafacosta/Documents/GitHub` found **zero** real
`import '@cluos/design-system'` or `require('@cluos/design-system/...')`
usages. What exists instead:

- `MMS/tailwind.config.ts` — local CSS variables in
  `src/styles/cluos-tokens.css`, with an explicit code comment: "Quando MMS
  virar produto, instalar @cluos/design-system via npm e migrar."
- `estrut/estrut-mvp/dashboard/cluos-tokens.css` — explicitly labeled "cópia
  local sincronizada," sourced from MMS, not from this package.
- A long tail of timestamped snapshots under `_cluos-maintenance/` and
  `_cluos-worktrees/` with the same pattern (historical/archived, not live).

Conclusion: this package has no live consumers today. See
`agent-skills/profiles/cluos/surface-inventory.md` for the full breakdown.
This is why the token refactor (Subproject D) ships as new architecture
with zero-regression compatibility aliases, not as a coordinated multi-repo
migration.

## Pre-existing gaps (not introduced by this refactor, noted for honesty)

- `tokens-experimental/` (Thermal Nocturne v0.4) coexisted with `tokens/`
  (v0.3) with no resolution — CHANGELOG explicitly says "Status: approved
  design direction, not yet a replacement." This refactor resolves the
  ambiguity (§Subproject D) by making both first-class palettes inside one
  semantic layer, per Rafael's 2026-08-10 decision to not pick a single
  winner.
- No design lint, no visual regression test, no Storybook existed for this
  package before this refactor. None are added in this pass beyond what's
  scoped in Subproject E — see that doc's "Deferred" section for why.
