# Changelog

All notable changes to the Cluos design system are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com).

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