# @cluos/design-system

The single source of truth for the Cluos visual language.
Tokens, logos, and rules — consumed by every Cluos repository.

## What lives here

- **`DESIGN-preview.html`** — the canonical visual reference. Any UI
  refactor should match this file first.
- **`DESIGN.md`** — the full narrative spec. It explains the preview
  and must stay in sync with it.
- **`DESIGN-WORKFLOW.md`** — the preview-first refactor workflow for
  humans and agents.
- **`tokens/`** — machine-readable tokens in three formats:
  `tokens.css`, `tokens.ts` / `tokens.js`, `tailwind-preset.js`.
- **`brand-assets/`** — shipped SVG assets for the stacked lockup,
  symbol, favicon, and convenience mono variants.

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

Open `node_modules/@cluos/design-system/DESIGN-preview.html` side by
side with the code whenever the task is visual or component-focused.
The preview is the canonical visual source of truth; `DESIGN.md`
explains it, and `DESIGN-WORKFLOW.md` describes how to keep everything
in sync.

Or, for teams that prefer a copy (easier to review in PRs), add this to
your `package.json`:

```json
{
  "scripts": {
    "postinstall": "cp node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md"
  }
}
```

## Updating the system

1. Edit `DESIGN-preview.html` first.
2. Sync `DESIGN.md`, `DESIGN-WORKFLOW.md`, and any affected token or
  asset docs in the same change.
3. Update SVGs in `brand-assets/` if the brand artwork changed.
4. Run `npm pack --dry-run`.
5. Bump `version` in `package.json` (semver).
6. Update `CHANGELOG.md`.
7. Tag and push: `git tag v0.x.y && git push --tags`.
8. The release workflow publishes automatically to GitHub Packages.

## Consuming repos stay in sync

```bash
# In each consuming repo:
npm update @cluos/design-system
```

## Examples

- [`examples/tailwind-setup.md`](examples/tailwind-setup.md)
- [`examples/css-setup.md`](examples/css-setup.md)
- [`examples/css-in-js-setup.md`](examples/css-in-js-setup.md)

## The Cluos brand in one paragraph

Cluos is **quiet confidence**. A single accent color (teal), a single
typeface (Inter), restrained weights, generous whitespace, and two
status colors that belong with the palette (muted oxblood for error,
light copper for warning). The wordmark gradient drifts from black →
navy → champagne → silver. Mintlify-like in its reading rhythm, but
with Cluos's own teal-and-navy temperature.