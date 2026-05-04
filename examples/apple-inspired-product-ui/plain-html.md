# Plain HTML — CluOS Design System

> No framework. No build step. Just tokens and semantic HTML.
> Ideal for: static pages, email-safe previews, smoke-testing, prototyping.

## Setup

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CluOS · Page</title>
  <!-- Option 1: local copy -->
  <link rel="stylesheet" href="path/to/tokens.css" />
  <!-- Option 2: import from package (bundler required) -->
  <!-- <link rel="stylesheet" href="node_modules/@cluos/design-system/tokens/tokens.css" /> -->
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--cluos-font-sans);
      background: var(--cluos-bg);
      color: var(--cluos-text);
      font-size: 1rem;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    a { color: var(--cluos-teal-deep); text-decoration: none; }
    a:hover { text-decoration: underline; }
    :focus-visible { outline: none; box-shadow: var(--cluos-ring-focus); border-radius: var(--cluos-radius-sm); }
  </style>
</head>
<body>
  ...
</body>
</html>
```

## System card example

```html
<article class="system-card" aria-label="CRM CluOS — Online">
  <div class="system-card__status">
    <span class="status-dot status-dot--online" aria-hidden="true"></span>
    <span class="status-label status-label--online">Online</span>
  </div>
  <h2 class="system-card__name">CRM CluOS</h2>
  <p class="system-card__url">crm.cluos.online</p>
  <div class="system-card__actions">
    <a href="https://crm.cluos.online" target="_blank" rel="noopener" class="btn btn--primary">Abrir</a>
    <button class="btn btn--ghost">Ver detalhes</button>
  </div>
</article>

<style>
  .system-card {
    background: var(--cluos-bg);
    border: 1px solid var(--cluos-border);
    border-radius: var(--cluos-radius-lg);
    padding: 1.25rem;
    max-width: 300px;
  }
  .system-card__status { display: flex; align-items: center; gap: 6px; margin-bottom: 0.5rem; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .status-dot--online  { background: var(--cluos-status-success); }
  .status-dot--warn    { background: var(--cluos-status-warn); }
  .status-dot--offline { background: var(--cluos-status-error); }
  .status-label { font-size: 0.75rem; font-weight: 500; }
  .status-label--online  { color: var(--cluos-status-success); }
  .status-label--warn    { color: var(--cluos-status-warn); }
  .status-label--offline { color: var(--cluos-status-error); }
  .system-card__name { font-size: 1rem; font-weight: 600; color: var(--cluos-navy); margin-bottom: 0.25rem; }
  .system-card__url  { font-size: 0.8125rem; color: var(--cluos-text-subtle); margin-bottom: 1rem; }
  .system-card__actions { display: flex; gap: 0.5rem; }

  .btn {
    font-family: var(--cluos-font-sans);
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--cluos-radius-md);
    border: 1px solid transparent;
    cursor: pointer;
    transition: background 120ms ease, border-color 120ms ease;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
  .btn--primary { background: var(--cluos-teal); color: var(--cluos-text-on-teal); }
  .btn--primary:hover { background: var(--cluos-teal-deep); text-decoration: none; }
  .btn--ghost { background: transparent; color: var(--cluos-teal-deep); }
  .btn--ghost:hover { background: rgba(0,128,128,0.08); }
</style>
```

## Empty state example

```html
<div class="empty-state" role="status">
  <div class="empty-state__icon" aria-hidden="true">◎</div>
  <h2 class="empty-state__title">Nenhum conteúdo ainda</h2>
  <p class="empty-state__description">
    Gere seu primeiro conteúdo para começar a publicar no AEO.
  </p>
  <button class="btn btn--primary">Gerar conteúdo</button>
</div>

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 4rem 1.5rem;
  }
  .empty-state__icon { font-size: 2.5rem; color: var(--cluos-text-subtle); margin-bottom: 1rem; }
  .empty-state__title { font-size: 1.0625rem; font-weight: 600; color: var(--cluos-navy); margin-bottom: 0.5rem; }
  .empty-state__description { font-size: 0.875rem; color: var(--cluos-text-muted); max-width: 280px; margin-bottom: 1.5rem; }
</style>
```

## Form input example

```html
<div class="field">
  <label class="field__label" for="nome">Nome <span aria-hidden="true">*</span></label>
  <input class="field__input" type="text" id="nome" name="nome" required autocomplete="name" />
  <span class="field__hint">Seu nome completo</span>
</div>

<style>
  .field { display: flex; flex-direction: column; gap: 0.25rem; }
  .field__label { font-size: 0.8125rem; font-weight: 500; color: var(--cluos-navy); }
  .field__label span { color: var(--cluos-status-error); margin-left: 0.2em; }
  .field__input {
    font-family: var(--cluos-font-sans);
    font-size: 0.875rem;
    color: var(--cluos-text);
    background: var(--cluos-bg);
    border: 1px solid var(--cluos-border);
    border-radius: var(--cluos-radius-md);
    padding: 0.625rem 0.875rem;
    transition: border-color 120ms ease;
  }
  .field__input:focus { outline: none; border-color: var(--cluos-teal); box-shadow: var(--cluos-ring-focus); }
  .field__hint { font-size: 0.75rem; color: var(--cluos-text-subtle); }
  .field__error { font-size: 0.75rem; color: var(--cluos-status-error); }
</style>
```
