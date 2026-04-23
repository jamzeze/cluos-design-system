# @cluos/design-system

The single source of truth for the Cluos visual language.
Tokens, logos, and rules — consumed by every Cluos repository.

## What lives here

- **`DESIGN.md`** — the full design system spec. LLMs read this to
  refactor UI. Humans read this to understand the system.
- **`tokens/`** — machine-readable tokens in three formats:
  `tokens.css`, `tokens.ts`/`tokens.js`, `tailwind-preset.js`.
- **`brand-assets/`** — the canonical logo files (drop them in manually;
  see `brand-assets/README.md`).

## Install

In any Cluos project:

```bash
# If you're using GitHub Packages (recommended for private use)
npm install @cluos/design-system

# Or via direct GitHub URL
npm install github:jamzeze/cluos-design-system
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
`rounded-cluos-md`, `shadow-cluos-sm`.

### Option B — CSS / SCSS

```css
/* In your global stylesheet, e.g. globals.css */
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

## Pointing LLMs at DESIGN.md

So Claude Code, Cursor, or any agent can pick up the rules:

```bash
# From your project root, create a symlink to the installed DESIGN.md
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```

Or, for teams that prefer a copy, add this to your CI / postinstall:

```json
{
  "scripts": {
    "postinstall": "cp node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md"
  }
}
```

## Updating the system

1. Edit `DESIGN.md` and the relevant token file(s).
2. Bump the version in `package.json` (semver).
3. Update `CHANGELOG.md`.
4. Tag the commit: `git tag v0.x.y && git push --tags`.
5. The release workflow publishes automatically.

## Consuming repos stay in sync

```bash
# In each consuming repo:
npm update @cluos/design-system
```

## Examples

- [`examples/tailwind-setup.md`](examples/tailwind-setup.md)
- [`examples/css-setup.md`](examples/css-setup.md)
- [`examples/css-in-js-setup.md`](examples/css-in-js-setup.md)