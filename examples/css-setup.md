# CSS / SCSS Setup

## 1. Install

```bash
npm install github:jamzeze/cluos-design-system#v1.0.0
```

## 2. Import tokens

```css
/* globals.css */
@import "@cluos/design-system/tokens.css";
```

## 3. Fontes

As fontes (Manrope, Instrument Sans, JetBrains Mono, Orbitron) são embarcadas no pacote; não use CDN em tempo de execução.

```css
@import "@cluos/design-system/fonts.css";
```

## 4. Use CSS variables

```css
.btn-primary {
  background: var(--cluos-action);
  color: var(--cluos-action-fg);
  padding: var(--cluos-space-3) var(--cluos-space-4);
  border-radius: var(--cluos-radius-md);
  font-family: var(--cluos-font-sans);
  transition: background var(--cluos-motion-fast) var(--cluos-ease-out);
}
.btn-primary:hover { background: var(--cluos-action-hover); }
.btn-primary:focus-visible {
  outline: none;
  box-shadow: var(--cluos-ring-focus);
}
```

## 5. Use the logo

```html
<img src="/path/to/node_modules/@cluos/design-system/brand-assets/cluos-logo-navy.svg" alt="Cluos">
```

## 6. Point your LLM at the rules

```bash
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```
