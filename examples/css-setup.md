# CSS / SCSS Setup

## 1. Install

```bash
npm install @cluos/design-system
```

## 2. Import tokens

In your global stylesheet (e.g. `src/styles/globals.css`):

```css
@import "@cluos/design-system/tokens.css";
```

## 3. Load fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## 4. Use CSS variables

```css
.btn-primary {
  background: var(--cluos-teal);
  color: var(--cluos-text-on-teal);
  padding: var(--cluos-space-3) var(--cluos-space-4);
  border-radius: var(--cluos-radius-md);
  font-family: var(--cluos-font-sans);
  transition: background var(--cluos-dur-fast) var(--cluos-ease-out);
}
.btn-primary:hover {
  background: var(--cluos-teal-deep);
}
.btn-primary:focus-visible {
  box-shadow: var(--cluos-ring-focus);
  outline: none;
}
```

## 5. Point your LLM at the rules

```bash
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```
