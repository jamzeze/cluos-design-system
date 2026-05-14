# @cluos/design-system

The single source of truth for the CluOS visual language, UX principles, product patterns, and agent governance.
Tokens, logos, patterns, and rules — consumed by every CluOS repository.

> **v0.3.0** — Added interactive light/dark design preview with action color selector (teal, copper, champagne, oxblood) and 8 approved product variants.

---

## What lives here

- **`DESIGN-preview.html`** — the canonical interactive visual reference. Includes light/dark mode toggle and action color selector (teal / copper / champagne / oxblood). Open in a browser when working on any CluOS product.
- **`PRODUCT-THEME-VARIANTS.md`** — the 8 approved product visual variants, recommended variant per product, and semantic rules for action colors.
- **`DESIGN.md`** — the full narrative spec. Explains the preview and must stay in sync with it.
- **`DESIGN-WORKFLOW.md`** — the preview-first refactor workflow for humans and agents.
- **`PRODUCT-SIMPLICITY-CANON.md`** — mandatory product simplicity canon: reduce cognitive load, remove unnecessary complexity, improve perceived quality, and make the main user action obvious.
- **`APPLE-INSPIRED-PRODUCT-UX.md`** — UX principles: progressive disclosure, clarity, focus, motion, per-product guidelines.
- **`PRODUCT-PATTERNS.md`** — reusable patterns for every CluOS product type (Hub, Dashboard, CRM, AEO, Editor, Suporte, Settings, Login, Upload, etc.).
- **`patterns/`** — detailed specs: `components.md`, `page-templates.md`, `states.md`, `accessibility.md`, `content-guidelines.md`.
- **`examples/apple-inspired-product-ui/`** — implementation examples: Next.js+Tailwind, React components, plain HTML, CSS tokens, Hub, Upload flow, Settings, Dashboard, Error/Empty/Loading states.
- **`tokens/`** — machine-readable tokens in three formats: `tokens.css`, `tokens.ts` / `tokens.js`, `tailwind-preset.js`.
- **`brand-assets/`** — shipped SVG assets for the stacked lockup, symbol, favicon, and mono variants.
- **`guides/`** — versioned source material used to derive the shipped assets.
- **`MIGRATION-AUDIT.md`** — audit report of the legacy `cluos-design` repo unification.

## Install

In any Cluos project:

```bash
# Option A — install from GitHub (simplest, no registry setup)
npm install github:jamzeze/cluos-design-system

# Option B — install from GitHub Packages (requires auth setup)
npm install @cluos/design-system
```

## Use

### Option A — Tailwind

```js
// tailwind.config.js
module.exports = {
  presets: [require("@cluos/design-system/tailwind-preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
};
```

Then use classes like `bg-cluos-teal`, `text-cluos-navy`,
`rounded-cluos-md`, `shadow-cluos-sm`, `bg-cluos-brand-hero`.

### Option B — CSS / SCSS

```css
/* globals.css */
@import "@cluos/design-system/tokens.css";
```

Then use vars: `color: var(--cluos-navy)`, `background: var(--cluos-teal)`.

### Option C — CSS-in-JS

```ts
import tokens from "@cluos/design-system";

const Button = styled.button`
  background: ${tokens.color.teal};
  color: ${tokens.color.textOnTeal};
  padding: ${tokens.space[3]} ${tokens.space[4]};
  border-radius: ${tokens.radius.md};
`;
```

## Pointing Agents At The System

So Claude Code / Cursor / any agent picks up the rules when working in
a consuming repo:

```bash
# From your project root, create a symlink to the installed DESIGN.md
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```

For product or UX work, also expose the Product Simplicity Canon:

```bash
ln -s node_modules/@cluos/design-system/PRODUCT-SIMPLICITY-CANON.md ./PRODUCT-SIMPLICITY-CANON.md
```

Open `node_modules/@cluos/design-system/DESIGN-preview.html` side by
side with the code whenever the task is visual or component-focused.
The preview is the canonical visual source of truth; `DESIGN.md`
explains it, `PRODUCT-SIMPLICITY-CANON.md` defines the mandatory product
simplicity rules, and `DESIGN-WORKFLOW.md` describes how to keep everything
in sync.

Or, for teams that prefer a copy (easier to review in PRs), add this to
your `package.json`:

```json
{
  "scripts": {
    "postinstall": "cp node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md && cp node_modules/@cluos/design-system/PRODUCT-SIMPLICITY-CANON.md ./PRODUCT-SIMPLICITY-CANON.md"
  }
}
```

## Updating the system

1. Edit `DESIGN-preview.html` first for visual changes.
2. For product-governance changes, edit `PRODUCT-SIMPLICITY-CANON.md` first.
3. Sync `DESIGN.md`, `DESIGN-WORKFLOW.md`, `APPLE-INSPIRED-PRODUCT-UX.md`, and any affected token or asset docs in the same change.
4. Update `guides/` and `brand-assets/` if the source artwork changed.
5. Run `npm pack --dry-run`.
6. Bump `version` in `package.json` (semver).
7. Update `CHANGELOG.md`.
8. Tag and push: `git tag v0.x.y && git push --tags`.
9. The release workflow publishes automatically to GitHub Packages.

## Consuming repos stay in sync

```bash
# In each consuming repo:
npm update @cluos/design-system
```

## Examples

- [`examples/apple-inspired-product-ui/README.md`](examples/apple-inspired-product-ui/README.md)
- [`examples/apple-inspired-product-ui/next-tailwind.md`](examples/apple-inspired-product-ui/next-tailwind.md)
- [`examples/apple-inspired-product-ui/react-components.md`](examples/apple-inspired-product-ui/react-components.md)
- [`examples/apple-inspired-product-ui/plain-html.md`](examples/apple-inspired-product-ui/plain-html.md)
- [`examples/apple-inspired-product-ui/css-tokens.md`](examples/apple-inspired-product-ui/css-tokens.md)
- [`examples/apple-inspired-product-ui/hub-systems.md`](examples/apple-inspired-product-ui/hub-systems.md)
- [`examples/apple-inspired-product-ui/upload-video-flow.md`](examples/apple-inspired-product-ui/upload-video-flow.md)
- [`examples/apple-inspired-product-ui/settings-page.md`](examples/apple-inspired-product-ui/settings-page.md)
- [`examples/apple-inspired-product-ui/dashboard.md`](examples/apple-inspired-product-ui/dashboard.md)
- [`examples/apple-inspired-product-ui/error-empty-loading.md`](examples/apple-inspired-product-ui/error-empty-loading.md)

---

## Product theme variants

CluOS supports 8 approved product visual variants combining appearance (light / dark) with action color (teal / copper / champagne / oxblood):

- `claro-teal` — light + teal. CluOS Hub, Sci-OS, Docs.
- `claro-copper` — light + copper. CRM CluOS.
- `claro-champagne` — light + champagne. AEO Engine.
- `claro-oxblood` — light + oxblood. Loteca.
- `dark-teal` — dark/navy + teal. Technical dashboards.
- `dark-copper` — dark/navy + copper. Suporte, MedFrame, Edge.
- `dark-champagne` — dark/navy + champagne. DID.
- `dark-oxblood` — dark/navy + oxblood. B3.

`DESIGN-preview.html` is the canonical interactive preview — open it in a browser to see all 8 variants live.
`PRODUCT-THEME-VARIANTS.md` documents the recommended variant per product, semantic rules, and token usage.

---

## Product UX Layer (v0.2.1)

### Product Simplicity Canon
See [`PRODUCT-SIMPLICITY-CANON.md`](PRODUCT-SIMPLICITY-CANON.md) for the mandatory product rule used by every CluOS project:

> Reduce cognitive load, remove unnecessary complexity, improve perceived quality, and make the main user action obvious.

Every screen must answer:

1. What is this screen for?
2. What should the user do next?
3. What information is essential now?
4. What can be hidden, moved, collapsed, delayed, or removed?
5. What can break if this is simplified?

If a screen cannot answer these questions, it must be redesigned, merged, or removed.

### UX Principles
See [`APPLE-INSPIRED-PRODUCT-UX.md`](APPLE-INSPIRED-PRODUCT-UX.md) for the full philosophy:
- Progressive disclosure (advanced options hidden by default)
- One primary action per region
- 3-second clarity test
- All dynamic states defined (loading, empty, error, success)
- Honest feedback, semantic HTML, accessible focus

### Product Patterns
See [`PRODUCT-PATTERNS.md`](PRODUCT-PATTERNS.md) for patterns per product type:
Hub · Dashboard · CRM · AEO · Editor de vídeo · Suporte · Configurações · Login · Upload · Empty/Error states · Tabelas · Formulários

### Component & Pattern Specs
- [`patterns/components.md`](patterns/components.md) — 23 component specs with tokens, states, accessibility
- [`patterns/page-templates.md`](patterns/page-templates.md) — 9 page layout templates
- [`patterns/states.md`](patterns/states.md) — loading, skeleton, empty, error, processing, success, offline states
- [`patterns/accessibility.md`](patterns/accessibility.md) — WCAG 2.1 AA requirements
- [`patterns/content-guidelines.md`](patterns/content-guidelines.md) — writing rules for UI copy

---

## Legacy Note

`cluos-design` (private repo `jamzeze/cluos-design`) has been retired as an active design source.
It is now legacy-only. Its AGENTS.md prohibits agents from treating it as a design reference.
This repository is the **only valid design authority** for all CluOS systems.
See [`MIGRATION-AUDIT.md`](MIGRATION-AUDIT.md) for the full unification audit.

## The CluOS brand in one paragraph

CluOS is **quiet confidence**. One shared identity across all products. Teal as the default action color, copper for priority, champagne for premium, oxblood for risk. Navy anchors every surface. Inter and Inter Tight for UI, JetBrains Mono for technical metadata. The wordmark gradient drifts from black → navy → champagne → silver. Restrained weights, generous whitespace, and one semantic action temperature per product.