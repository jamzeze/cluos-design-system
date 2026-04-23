# Tailwind Setup

## 1. Install

```bash
npm install @cluos/design-system
```

## 2. Configure

Update `tailwind.config.js`:

```js
module.exports = {
  presets: [require("@cluos/design-system/tailwind-preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
};
```

## 3. Load fonts

Inter and JetBrains Mono. Add to your HTML `<head>` or via `next/font`:

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
  Hero block with the on-brand radial gradient
</div>
```

## 5. Point your LLM at the rules

```bash
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```

Open Cursor / Claude Code in the project. Say:
"Refactor this repository to follow the rules in DESIGN.md, using only
the token classes defined in the Cluos Tailwind preset."