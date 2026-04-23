# Tailwind Setup

## 1. Install

```bash
npm install github:jamzeze/cluos-design-system
```

## 2. Configure

```js
// tailwind.config.js
module.exports = {
  presets: [require("@cluos/design-system/tailwind-preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
};
```

## 3. Load fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## 4. Use

```jsx
<button className="bg-cluos-teal hover:bg-cluos-teal-deep text-white font-medium px-4 py-2 rounded-cluos-md shadow-cluos-sm">
  Primary action
</button>

<div className="bg-cluos-brand-hero rounded-cluos-2xl p-12 text-white">
  Hero block with on-brand radial gradient
</div>

<span className="inline-flex items-center gap-1.5 bg-cluos-warn-bg text-cluos-warn text-xs font-medium px-3 py-1 rounded-full">
  Warning — copper
</span>
```

## 5. Use the logo

```jsx
import logo from "@cluos/design-system/brand-assets/cluos-logo-gradient.svg";
// or in HTML: <img src="/node_modules/@cluos/design-system/brand-assets/cluos-logo-gradient.svg">
```

## 6. Point your LLM at the rules

```bash
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```

Then in Cursor / Claude Code: *"Refactor this repo to follow DESIGN.md,
using only the token classes from the Cluos Tailwind preset."*