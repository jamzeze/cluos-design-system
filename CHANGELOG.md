# Changelog

All notable changes to the Cluos design system are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com).

## [Unreleased] — 2026-09-16 — Frontend routing v2

### Changed

- `routing-matrix.yaml` v2: new `N-skip` level for domain/state/geometry logic
  that only renders differently (exits the chain after the router); `N0` is
  router + `frontend-craftsman` + render, without critic or QA; every level
  now declares `loads` (support files read only after classification) and
  `artifacts`.
- `anti-ai-slop-frontend` rewritten as a router with trigger, non-trigger,
  predicate table, a single output file for `N1`+, a 4-call budget and stop
  conditions. It no longer reads archetypes, palette policy or the profile
  before classifying.
- `frontend-craftsman`, `design-critic`, `design-gallery` and
  `design-system-refactor-director` trimmed; artifacts of one task live in
  `docs/frontend-routing/<YYYY-MM-DD>-<slug>/` of the consuming repo.
- Global block rewritten; third-party frontend skills declared manual-only.
- `AGENTS.md` consumer list now names the repos that exist and states that no
  product installs the package yet.
- `EXPERIMENTAL-THERMAL-NOCTURNE.md` marked superseded.

### Added

- `design-qa` skill: compares the rendered implementation with its approved
  target. Previously referenced by every flow but never installed.
- `test-frontend-routing.sh` now fails on any skill reference that does not
  exist (allowlist reduced to superpowers skills and manual checks) and
  checks `N-skip`/`N0` do not run critic or QA.
- `sync-agent-skills.sh --check` lists unmanaged skills per client root
  (informational).

### Removed

- References to `get-context`, `audit` and `image-to-code`, which never
  existed as skills.

### Added (same day, second pass)

- `agent-skills/agents/design-critic.md` and `design-qa.md`: reviewer
  subagents (fresh context, no Edit, sonnet), installed to `~/.claude/agents/`
  by `sync-agent-skills.sh`.
- `agent-skills/.claude-plugin/plugin.json` and `agent-skills/evals/`: the
  chain as a Claude Code plugin with a `claude plugin eval` suite (five
  cases, free graders) for the routing matrix.
- `scripts/sync-claude-rules.sh`: installs the frontend block as the
  path-scoped rule `<repo>/.claude/rules/cluos-frontend.md` (loads only when a
  UI file is read) and `cluos-ops.md` from GCOS into each product repo.
- `sync-global-config.sh` now targets only `~/.codex/AGENTS.md`; the Claude
  global and the workspace root carry a pointer instead of the block.

## [Unreleased] — 2026-08-30 — MMS identity promoted to global canon

### Changed

- Promoted `cluos-mms-v1` to the default visual contract for CluOS and future
  products: Swiss Ledger light surfaces, Manrope + Instrument Sans, deep navy,
  medium blue, tech green, copper and oxblood semantic roles.
- Rebuilt `DESIGN-preview.html` as the canonical specimen, including the
  explicit chart motion (progressive line draw + rising bars) and reduced-motion
  fallback.
- Added `tokens/mms-canonical.yaml`; synchronized CSS, TypeScript, JavaScript,
  Tailwind and package docs while retaining legacy selectors as opt-outs.
- Superseded the 2026-08-10 “style/palette per task” decisions with an
  append-only decision entry.

### Migration

- GCOS now records the canonical id and consumer contract.
- MMS is the first aligned consumer; other catalogued products inherit the
  contract in subsequent dependency/migration waves.

## [Unreleased] — Thermal Nocturne (experimental, not adopted)

Preserves work originally built in a Codex sandbox
(`~/Documents/Codex/2026-07-28/que`, outside any git repository) so it
survives on the record instead of depending on a temp folder on one machine.

**Status: approved design direction, not yet a replacement for the
canonical design system in this repo.** No default token, variant, or
package export changes. `package.json` version is unchanged. Any product
consuming `@cluos/design-system` today is unaffected until this is
explicitly promoted.

### Added

- `EXPERIMENTAL-THERMAL-NOCTURNE.md` — the full narrative design contract
  (color foundation, typography, motion, components) as authored, with its
  own explicit "not yet a replacement" status line preserved verbatim.
- `DESIGN-preview-experimental-thermal-nocturne.html` — the interactive
  showcase (foundation, typography lab, approved effects, motion library,
  components, operational examples, accessibility contrast proof).
- `tokens-experimental/thermal-nocturne-tokens.css` and
  `thermal-nocturne-fonts.css` — the full token extraction already in
  production use by MMS (`src/styles/cluos-tokens.css`, labeled v0.4 there),
  copied here so the design-system repo and its first real consumer stop
  drifting apart.
- `guides/thermal-nocturne-2026-07-28/` — source PRODUCT.md, the sandbox's
  own README/RELEASE notes and version.json, brand asset exports, and the
  original visual-QA screenshot set (mobile/tablet/desktop, light/dark,
  motion and reduced-motion) as traceability evidence.

### Not done in this change

- No promotion to a numbered release or default variant.
- No change to `tokens/tokens.css`, `tokens.ts`, `tokens.js`, or
  `tailwind-preset.js` — the files every current consumer actually imports.
- No reconciliation between MMS's ad-hoc vendored copy and this repo as the
  single source of truth — that decision belongs to whoever owns the
  promotion call.

## [Unreleased] — 2026-08-10 — Anti-slop skills + style/palette architecture

Full canonical implementation, approved by Rafael. Not yet a version bump —
`package.json` stays at 0.3.0 per this repo's Alpha-readiness freeze
(`.github/workflows/release.yml`); a maintainer decides when to cut a
release. See `docs/cluos-design-system-v2/` for the complete audit,
decision log, and skill provenance behind this change.

### Added

- `agent-skills/` — canonical source for five frontend skills
  (`anti-ai-slop-frontend`, `design-gallery`, `frontend-craftsman`,
  `design-critic`, `design-system-refactor-director`), a shared reference
  library (`design-archetypes.yaml`, `palette-policy.md`,
  `anti-slop-rubric.md`, `routing-matrix.yaml`), and the CluOS profile
  (`profiles/cluos/`). Installed into `~/.claude/skills/` and
  `~/.codex/skills/` via `scripts/sync-agent-skills.sh` (idempotent) —
  installed and validated clean as of this entry.
- `design-gallery/index.html` — the canonical Design Gallery artifact: an
  interactive style+palette workbench plus full three-screen mockups for
  six approved archetypes, rendered on real `suporte.cluos.online` content.
- **`tokens/tokens.css`**: a new semantic role layer
  (`--cluos-color-bg-canvas`, `--cluos-color-action-primary`, etc.)
  selectable via `[data-cluos-style="A".."G"]` and composable with
  `[data-cluos-palette="pal-*"]` (six archetypes × seven palettes,
  including dark-register-tuned compound overrides for style `G`). This IS
  Thermal Nocturne v0.4 finally reconciled with v0.3 — both are now
  first-class style options rather than two competing systems.
- `tokens/tokens.js` / `tokens.ts`: `styles`, `palettes`, `palettesDark`,
  and `resolveTheme()` mirroring the CSS cascade exactly (verified against
  each other, not just visually).
- `tokens/tailwind-preset.js`: `cluosc-*` color utilities resolving live
  against the active `data-cluos-*` attributes.

### Changed

- `tokens-experimental/thermal-nocturne-tokens.css` header comment
  corrected — it no longer claims to be "the current canonical identity"
  (that claim became inaccurate the moment a second, non-Thermal-Nocturne
  archetype was approved). Values in the file are unchanged.

### Compatibility

Zero regressions: every `--cluos-*` (v0.3) custom property keeps its
existing value; the new semantic layer defaults to Archetype A's palette
(closest to v0.3) when no `data-cluos-style` is set. Confirmed via
computed-style assertions in a real browser
(`docs/cluos-design-system-v2/skill-provenance.md` records the verification
method). No current repo imports this package as a live dependency (see
`docs/cluos-design-system-v2/00-baseline.md`), so there is no consumer to
break.

## [0.3.0] — Product action color variants

### Added

- `DESIGN-preview.html` — rebuilt as a fully interactive light/dark preview with action color selector (teal, copper, champagne, oxblood). Previous version preserved as `DESIGN-preview-legacy-v0.2.1.html`.
- `PRODUCT-THEME-VARIANTS.md` — documents the 8 approved product visual variants, recommended variant per product, and semantic rules for each action color.
- Action color system with 4 themes: teal (default), copper (priority), champagne (premium), oxblood (risk/critical).
- 8 named product variants: `claro-teal`, `claro-copper`, `claro-champagne`, `claro-oxblood`, `dark-teal`, `dark-copper`, `dark-champagne`, `dark-oxblood`.
- Dark / navy appearance layer (`data-appearance="dark"`): navy `#1B2F36` base, not pure black.
- Additive action theme tokens in `tokens/tokens.css`: `[data-theme]` and `[data-appearance="dark"]` selectors.
- `action` and `appearance` keys in `tokens/tokens.ts` and `tokens/tokens.js` for CSS-in-JS consumers.

### Changed

- `DESIGN.md` — updated section 12 (action color is semantic, not just teal); added section 13 "Action color system" with the four action temperatures, dark mode spec, and link to `PRODUCT-THEME-VARIANTS.md`; updated mode declaration from "light only" to "light and dark".
- `README.md` — added "Product theme variants" section with the 8 variants and product map; updated brand paragraph.
- `package.json` — bumped version to 0.3.0; added `PRODUCT-THEME-VARIANTS.md` to `files` and `exports`.

---

## [0.2.0] — Apple-inspired Product UX Layer

### Added

**UX Principles & Governance**
- `APPLE-INSPIRED-PRODUCT-UX.md` — 16-section UX principles document: philosophy, progressive disclosure, states, feedback, motion, per-product guidelines (Hub, CRM, AEO, Medframe, B3, Suporte, Settings), anti-patterns, and implementation checklist.
- `PRODUCT-PATTERNS.md` — full page and feature patterns for every CluOS product type (Hub, Dashboard, CRM, AEO, Video Editor, Support, Settings, Login, Upload, Empty states, Error states, Tables, Forms).
- `MIGRATION-AUDIT.md` — complete audit of the `cluos-design` → `cluos-design-system` unification: color divergences, logo decisions, items migrated/not-migrated, security audit, archive recommendation.

**Pattern Library (`patterns/`)**
- `patterns/README.md` — index of patterns folder.
- `patterns/components.md` — 23 component specifications (AppShell, TopNav, Sidebar, PageHeader, ActionBar, StatusCard, SystemCard, MetricCard, EmptyState, ErrorState, LoadingState, UploadDropzone, PreviewPanel, SettingsSection, PermissionGate, ConfirmDialog, Toast, InlineFeedback, ProgressStepper, DetailsDisclosure, TechnicalDetails, and more). Each spec includes: objective, anatomy, tokens, states, accessibility, examples.
- `patterns/page-templates.md` — 9 page layout templates: Hub, Dashboard, Lista com ações, Detalhe de item, Upload+processamento, Configurações, Login, Review+Publish, Error/Unauthorized.
- `patterns/states.md` — complete state specifications: loading, skeleton, empty, no-data, success, warning, error, processing, queued, retrying, failed, completed, unauthorized, forbidden, offline. Includes implementation checklist.
- `patterns/accessibility.md` — WCAG 2.1 AA requirements and patterns: landmarks, heading hierarchy, focus rings, keyboard navigation, form accessibility, live regions, `prefers-reduced-motion`, per-screen checklist.
- `patterns/content-guidelines.md` — writing guidelines: tone/voice, button copy rules (verb+object), loading/success/error text examples, validation messages, labels vs placeholders, consistency vocabulary table.

**Examples (`examples/apple-inspired-product-ui/`)**
- `README.md` — index of examples folder with rules.
- `next-tailwind.md` — Next.js + Tailwind preset setup, PageHeader, Button classes.
- `react-components.md` — AppShell, TopNav, Toast, ConfirmDialog, InlineFeedback.
- `plain-html.md` — no-framework HTML+CSS using only `tokens.css`.
- `css-tokens.md` — full CSS component library using CSS custom properties.
- `hub-systems.md` — Hub page with SystemCard grid (online/warn/offline states).
- `upload-video-flow.md` — UploadVideoFlow component with idle/uploading/processing/done/error states.
- `settings-page.md` — Settings page with SettingsSection + progressive disclosure.
- `dashboard.md` — Minimal dashboard with MetricCard, PendingActionCallout, RecentList.
- `error-empty-loading.md` — EmptyState, ErrorState, SkeletonList components.

**Updated files**
- `DESIGN.md` — added section 13 "Product UX layer" linking to new docs.
- `DESIGN-WORKFLOW.md` — added "Product UI changes" section with 8-step workflow and implementation gate rules.
- `DESIGN-preview.html` — added section "07 / Product UX Patterns" with 7 visual examples (SystemCard, Upload Flow, Dashboard, Empty State, Error State, Settings Screen, Review/Publish Flow). Version updated to v0.2.0 in footer.
- `AGENTS.md` — full rewrite: mission statement, mandatory reading list, design system rules (tokens, colors, typography, buttons, layout), UX implementation rules, and 15-item Apple-Inspired Checklist.
- `README.md` — added "Product UX Layer" section, "Legacy Note" section, updated examples list.
- `package.json` — bumped version to 0.2.0, added `patterns/`, `examples/`, `APPLE-INSPIRED-PRODUCT-UX.md`, `PRODUCT-PATTERNS.md`, `MIGRATION-AUDIT.md` to `files` and `exports`.

### Changed
- Clarified that `cluos-design-system` is the **only valid design authority** for all CluOS systems.
- `cluos-design` (jamzeze/cluos-design) is now officially retired as a design source. Its README, AGENTS.md, and legacy-design.md redirect agents and humans to this repository.
- Token usage policy is now explicit: all hex values must go through `var(--cluos-*)` — no raw colors in any product code.

---

## [0.1.1] — Preview-first workflow and shipped assets

### Added
- Official `DESIGN-preview.html` as the canonical visual reference for
  refactors.
- `DESIGN-WORKFLOW.md` to define the sync order between preview,
  markdown spec, tokens, and assets.
- Shipped SVG assets in `brand-assets/`, including the official stacked
  lockups, symbol marks, favicon, and mono convenience variants.
- Versioned `guides/` source material so the raw SVG board and palette
  references remain in the repository and published package.
- Repository-level agent instructions so UI refactors start from the
  preview instead of inventing new patterns.

### Changed
- `DESIGN.md` now documents the preview-first workflow and the actual
  stacked logo assets that ship in the package.
- `README.md` and package exports now expose the preview and workflow
  docs alongside the tokens.

## [0.1.0] — Initial release

### Added
- Official Cluos brand palette from `Paleta de Cores_CluOs.pdf`:
  teal #008080, navy #1B2F36, black #1D1D1B, champagne #C8C1AE,
  silver #B5B4B5, white #FFFFFF.
- Derived UI state colors: `teal-deep` #006666, `teal-soft` #4DA3A3.
- Semantic status colors (muted oxblood for error, light copper for
  warn) chosen to belong with the core palette.
- Full typography scale in Inter + JetBrains Mono.
- Spacing, radius, shadow, and motion tokens.
- Tailwind preset, CSS variables, TypeScript/JavaScript token exports.
- Brand assets directory with canonical filename convention and
  mapping guide for the source SVGs.
- DESIGN.md source of truth for LLMs.
