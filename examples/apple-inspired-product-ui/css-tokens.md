# CSS Tokens — CluOS Examples

> Use tokens from `@cluos/design-system/tokens.css` directly in CSS.
> No framework required.

## Setup

```css
/* In your global CSS entry point */
@import "@cluos/design-system/tokens.css";
```

Or copy `tokens/tokens.css` into your project directly.

## Page layout with tokens

```css
/* layout.css */
.app-shell {
  display: grid;
  grid-template-rows: 56px 1fr;
  min-height: 100vh;
  background: var(--cluos-bg);
}

.topnav {
  display: flex;
  align-items: center;
  padding: 0 var(--cluos-space-8);
  background: var(--cluos-bg);
  border-bottom: 1px solid var(--cluos-border);
  position: sticky;
  top: 0;
  z-index: 50;
}

.sidebar {
  width: 256px;
  background: var(--cluos-bg-subtle);
  border-right: 1px solid var(--cluos-border);
  padding: var(--cluos-space-4) 0;
}

.main-content {
  padding: var(--cluos-space-8);
  max-width: var(--cluos-container-product);
  margin: 0 auto;
  width: 100%;
}
```

## Components

```css
/* components.css */

/* ---- Buttons ---- */
.btn {
  font-family: var(--cluos-font-sans);
  font-weight: 500;
  font-size: var(--cluos-text-sm);
  line-height: 1;
  padding: 0.625rem 1rem;
  border-radius: var(--cluos-radius-md);
  border: 1px solid transparent;
  transition: background var(--cluos-motion-fast) var(--cluos-ease-out),
              border-color var(--cluos-motion-fast) var(--cluos-ease-out),
              color var(--cluos-motion-fast) var(--cluos-ease-out);
  cursor: pointer;
}
.btn:focus-visible {
  outline: none;
  box-shadow: var(--cluos-ring-focus);
}
.btn-primary { background: var(--cluos-action); color: var(--cluos-action-fg); }
.btn-primary:hover { background: var(--cluos-action-hover); }
.btn-secondary { background: transparent; color: var(--cluos-fg); border-color: var(--cluos-border-strong); }
.btn-secondary:hover { border-color: var(--cluos-fg); background: var(--cluos-bg-subtle); }
.btn-ghost { background: transparent; color: var(--cluos-action-hover); }
.btn-ghost:hover { background: var(--cluos-action-soft); }

/* ---- Card ---- */
.card {
  background: var(--cluos-bg);
  border: 1px solid var(--cluos-border);
  border-radius: var(--cluos-radius-md);
  padding: var(--cluos-space-6);
}
.card-interactive:hover {
  border-color: var(--cluos-line-strong);
}

/* ---- Status badge ---- */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: var(--cluos-text-xs);
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: var(--cluos-radius-sm);
}
.badge-success { background: var(--cluos-status-success-bg); color: var(--cluos-status-success-text); }
.badge-warn    { background: var(--cluos-status-warning-bg);    color: var(--cluos-status-warning-text); }
.badge-error   { background: var(--cluos-status-danger-bg);   color: var(--cluos-status-danger-text); }
.badge-info    { background: var(--cluos-status-info-bg);    color: var(--cluos-status-info-text); }

/* Status dot */
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.status-dot-success { background: var(--cluos-status-success); }
.status-dot-warn    { background: var(--cluos-status-warning); }
.status-dot-error   { background: var(--cluos-status-danger); }

/* ---- Input ---- */
.input {
  font-family: var(--cluos-font-sans);
  font-size: var(--cluos-text-sm);
  color: var(--cluos-text);
  background: var(--cluos-bg);
  border: 1px solid var(--cluos-border);
  border-radius: var(--cluos-radius-md);
  padding: 0.625rem 0.875rem;
  width: 100%;
  transition: border-color var(--cluos-motion-fast) var(--cluos-ease-out);
}
.input:focus {
  outline: none;
  border-color: var(--cluos-action);
  box-shadow: var(--cluos-ring-focus);
}
.input.error {
  border-color: var(--cluos-status-danger-text);
}

/* ---- Empty state ---- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--cluos-space-16) var(--cluos-space-6);
}
.empty-state__title {
  font-size: var(--cluos-text-lg);
  font-weight: 650;
  color: var(--cluos-fg);
  margin: var(--cluos-space-4) 0 var(--cluos-space-2);
}
.empty-state__description {
  font-size: var(--cluos-text-sm);
  color: var(--cluos-text-muted);
  max-width: 280px;
  margin-bottom: var(--cluos-space-6);
}

/* ---- Skeleton ---- */
@keyframes shimmer {
  0%   { opacity: 0.5; }
  50%  { opacity: 1; }
  100% { opacity: 0.5; }
}
.skeleton {
  background: var(--cluos-bg-muted);
  border-radius: var(--cluos-radius-sm);
  animation: shimmer 1.5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; opacity: 0.7; }
}

/* ---- Progress bar ---- */
.progress {
  height: 4px;
  background: var(--cluos-bg-muted);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--cluos-action);
  border-radius: 2px;
  transition: width var(--cluos-motion-base) var(--cluos-ease-out);
}
```
