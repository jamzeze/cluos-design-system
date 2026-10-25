# Tailwind Setup

## 1. Install

```bash
npm install github:jamzeze/cluos-design-system#v1.0.0
```

## 2. Configure

```js
// tailwind.config.js
module.exports = {
  presets: [require("@cluos/design-system/tailwind-preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
};
```

## 3. Fontes

As fontes (Manrope, Instrument Sans, JetBrains Mono, Orbitron) são embarcadas no pacote; não use CDN em tempo de execução.

```css
@import "@cluos/design-system/fonts.css";
```

## 4. Use

```jsx
<button className="bg-cluos-action hover:bg-cluos-action-hover text-cluos-action-fg font-medium px-4 py-2 rounded-cluos-sm">
  Primary action
</button>

<div className="bg-cluos-deep-navy rounded-cluos-md p-12 text-cluos-action-fg">
  Bloco de hero em campo navy (registro público)
</div>

<span className="inline-flex items-center gap-1.5 bg-cluos-warning-bg text-cluos-warning-text text-xs font-medium px-3 py-1 rounded-cluos-pill">
  Aviso: ícone + texto
</span>
```

## 5. Use the logo

```jsx
import logo from "@cluos/design-system/brand-assets/cluos-logo-navy.svg";
// or in HTML: <img src="/node_modules/@cluos/design-system/brand-assets/cluos-logo-navy.svg">
```

## 6. Point your LLM at the rules

```bash
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```

Then in Cursor / Claude Code: *"Refactor this repo to follow DESIGN.md,
using only the token classes from the Cluos Tailwind preset."*