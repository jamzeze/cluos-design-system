# DESIGN.md — CluOS MMS Canonical Identity

Status: canonical · `cluos-mms-v1` · approved by Rafael · 2026-08-30

This document defines the visual contract for every CluOS product. The MMS
interface is the reference: minimal, technical, light, and operationally
clear. New products inherit this contract by default; a legacy style may only
be used with an explicit, temporary opt-out.

## Source order

1. `tokens/mms-canonical.yaml` — machine-readable identity contract.
2. `DESIGN-preview.html` — rendered canonical specimen.
3. `tokens/tokens.css`, `tokens/tokens.ts`, `tokens/tokens.js` — runtime exports.
4. This document — narrative rules and usage guidance.

If a product or document conflicts with this contract, the canonical tokens
win. Product-specific content identities (for example, a client's Instagram
brand inside MMS) remain isolated from the CluOS product chrome.

## Identity in one line

`CluOS` is quiet and light; `MMS` is the bold product name; `Marketing Studio`
is a thin, tracked descriptor separated by one hairline. Contrast comes from
weight, spacing and hierarchy — not ornament.

### Lockup

| Part | Family | Weight | Treatment |
| --- | --- | ---: | --- |
| `CluOS` | Manrope | 300 | normal case, tight tracking |
| `MMS` | Manrope | 650 | bold anchor, same baseline |
| `Marketing Studio` | Instrument Sans | 450 | uppercase, `0.12em` tracking |
| Separator | — | — | one vertical hairline |

Do not add a capsule, gradient, decorative icon, drop shadow or second
separator to the lockup. The lockup is a reusable header/breadcrumb primitive.

## Typography

- **Manrope** is the display family: lockups, headings, product names and
  metrics. Use a light base and bold only for the meaningful word or value.
- **Instrument Sans** is the interface/data family: navigation, body copy,
  labels, tables, forms and chart metadata.
- **JetBrains Mono** is reserved for code and technical identifiers.
- Body is `var(--cluos-text-base)` with normal/relaxed leading. Labels use
  uppercase and tracking only where they improve scanning.
- New products should import the bundled font faces from `brand-assets/fonts`
  or the package; do not fetch fonts at runtime from a remote CDN.

## Palette and semantic use

The palette is intentionally small. Use color to communicate structure or
state, never as decoration.

| Token | Value | Canonical use |
| --- | --- | --- |
| `--cluos-deep-navy` | `#010D28` | primary text, dense operational surfaces |
| `--cluos-medium-blue` | `#132952` | structure, navigation, contextual contrast |
| `--cluos-tech-green` | `#C4DB7B` | primary action, selection, success signal |
| `--cluos-operational-teal` | `#16A39A` | progress, execution, information activity |
| `--cluos-copper` | `#BD7845` | warning, review, non-blocking priority |
| `--cluos-oxblood` | `#8A3A3A` | denial, error, risk, destructive confirmation |
| `--cluos-white` | `#FFFFFF` | canvas and surfaces |
| `--cluos-neutral-100` | `#EAEAEA` | hairlines and muted surfaces |
| `--cluos-neutral-500` | `#A5A5A5` | subtle text and disabled context |

Copper and oxblood are never positive CTAs. Every status also has a text
label or icon; color alone never carries meaning. Teal may show ongoing
execution, but tech green remains the primary positive action.

## Geometry and layout

- Swiss Ledger is the default register: white canvas, hairline borders, zero
  radius and zero elevation shadows.
- Use the spacing scale `var(--cluos-space-*)` and the standard product/docs/
  prose containers. Do not introduce one-off spacing in components.
- A bordered region is preferred to a floating card. Avoid nested cards,
  glassmorphism, gratuitous gradients and decorative pills.
- Dark surfaces are an explicit operational context, not the default page
  appearance. Use deep navy with medium-blue structure and readable white
  text.

## Actions and states

- One primary action per visual region; it uses `--cluos-action-primary`.
- Secondary actions are hairline + text. Ghost actions are text-only.
- Warning uses `--cluos-status-warn` (copper); denial/error uses
  `--cluos-status-error` (oxblood). Both use a tinted background token and an
  explicit explanation/action.
- Every data-dependent surface implements loading, empty, error, processing
  and success states. State copy is direct: “Processando”, “Offline”,
  “Publicação negada”, “Tentar novamente”.

## Motion

Motion is feedback, not decoration. The canonical timings are deliberately
slower so the transition can be perceived:

| Use | Token | Duration |
| --- | --- | ---: |
| hover/focus | `--cluos-motion-hover` | 180ms |
| press | `--cluos-motion-press` | 120ms |
| state enter | `--cluos-motion-enter` | 600ms |
| trail/progress | `--cluos-motion-trail` | 600ms |
| charts | `--cluos-motion-data` | 1200ms |
| chart stagger | `--cluos-motion-stagger` | 120ms |

Charts animate only after an explicit data update: lines draw progressively
and bars rise progressively, with no autoplay, loop, bounce or scroll-triggered
decoration. `prefers-reduced-motion: reduce` applies the final result
immediately.

## Accessibility and content

- Use semantic HTML and a visible heading hierarchy.
- Every control has a visible label and a `:focus-visible` ring from
  `--cluos-ring-focus`.
- Maintain WCAG 2.1 AA contrast and do not encode state with color alone.
- Preserve Portuguese product language: verb + object buttons, no jargon,
  no hidden system state.

## Consumption contract

Every product must consume `@cluos/design-system` (or the checked-in package
artifact) and import `@cluos/design-system/tokens.css` once at its root.
Tailwind consumers use `@cluos/design-system/tailwind-preset`. Do not fork
colors, typography, radius, shadows or motion locally. A temporary fallback
copy must carry the canonical id and be reconciled at the next dependency
update. Runtime roots should expose `data-cluos-style="MMS"` and
`data-cluos-canonical="cluos-mms-v1"` so audits can identify the active
contract.

The old `data-cluos-style`/`data-cluos-palette` API remains only as an
explicit compatibility layer. New code must not select A–G or a palette class
as its global default.

## Brand assets

Use the shipped assets in `brand-assets/` and preserve their clearspace. Never
rebuild, stretch, skew or shadow the mark. The MMS product lockup above is a
UI primitive and does not replace the official CluOS logo assets.

## Related contracts

- `tokens/mms-canonical.yaml` — exact machine-readable values.
- `DESIGN-preview.html` — rendered visual source of truth.
- `APPLE-INSPIRED-PRODUCT-UX.md` — interaction principles.
- `PRODUCT-PATTERNS.md` and `patterns/` — reusable UI patterns and states.
- `agent-skills/profiles/cluos/design-decisions.yaml` and
  `palette-decisions.yaml` — append-only decision history.
