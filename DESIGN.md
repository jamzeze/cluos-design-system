# DESIGN.md — Cluos

Design system for the Cluos brand. Derived from the clean, reading-optimized
philosophy of Mintlify, adapted to Cluos's teal-and-navy visual language.

Use this file as the single source of truth when generating any UI for Cluos:
marketing pages, product/dashboard, documentation, or collateral. Every
decision here comes from the official Cluos brand manual (logo, gradient
system, type) — so following it keeps the brand coherent across surfaces.

Mode: **light only**. No dark-mode tokens are defined.

---

## 1. Brand essence

Cluos is **quiet confidence**. The wordmark uses ultra-light geometric type.
The symbol is a broken concentric "C" that feels like a sound wave or
ripple — movement, resonance, listening. The gradient drifts from deep
navy into warm champagne, or from navy into sage-teal.

Pick one adjective pair and design to it: **serene + precise**. Never loud.
Never decorative for its own sake. Space, air, and restraint are part of
the brand — the same principle that makes Mintlify readable.

**Do**
- Large amounts of whitespace. Don't be afraid of empty canvas.
- Thin strokes, thin type, thin dividers.
- One accent color per screen, max. Teal does the work.
- Editorial rhythm: wide gutters, generous line-height, unhurried pacing.

**Don't**
- No decorative gradients that the brand doesn't already use (navy→champagne
  and navy→sage are the only approved gradients — see §3).
- No bold/heavy type weights for display. The brand is light-weight type.
- No red, yellow, orange, magenta — Cluos's palette does not include them,
  including for semantic status (see §3.4 for the approved alternatives).
- No rounded-heavy UI. Corners are soft but restrained (8–12px), never pill.

---

## 2. Logo & brand assets

Brand assets must live inside the project (or be installed via the
`@cluos/design-system` package). LLMs operating on code do not access
external URLs — they only see files on disk. Keep a local copy.

Local canonical location: `./brand-assets/` in this repository.

**Canonical source of truth** (for download / re-export by a human):
`https://drive.google.com/drive/folders/1rdCIaQaynvDb80Tpb6Py0fhOIWnCHGjj`

### 2.1 Expected local layout

Every consuming repository must have a `brand-assets/` directory
(either copied into the repo, installed via package, or symlinked).
The canonical filenames are:

```
brand-assets/
├── cluos-logo-gradient.svg   # horizontal lockup, default gradient
├── cluos-logo-teal.svg       # horizontal lockup, solid teal
├── cluos-logo-navy.svg       # horizontal lockup, solid navy
├── cluos-logo-white.svg      # horizontal lockup, solid white
├── cluos-symbol.svg          # symbol only (C-ripple), default navy
├── cluos-symbol-teal.svg     # symbol only, solid teal
├── cluos-symbol-white.svg    # symbol only, solid white
└── favicon.svg               # square, optimized for small sizes
```

### 2.2 When to use which (decision table)

| Context                                     | Use                           |
| ------------------------------------------- | ----------------------------- |
| Default header, light background            | `cluos-logo-gradient.svg`    |
| Any surface with a solid dark / teal / gradient background | `cluos-logo-white.svg` |
| Surface that already has a gradient (avoid gradient-on-gradient) | `cluos-logo-navy.svg` or `-teal.svg` |
| Footer on muted/subtle background           | `cluos-logo-navy.svg`        |
| Size is below 96px wide                     | Use a `cluos-symbol-*` variant instead of the full lockup |
| Favicon, avatar slot, app icon              | `favicon.svg`                |
| Loading indicators, empty-state decoration  | `cluos-symbol.svg`           |

### 2.3 Hard rules

- Never recolor the gradient lockup. If a solid color is needed, use
  one of the pre-prepared solid variants.
- Below 96px horizontal width, drop the wordmark and use the symbol
  alone — the wordmark becomes unreadable.
- Never stretch, skew, or rotate any variant.
- Maintain clearspace equal to the height of the "C" around the mark
  (empty padding, no other element should intrude).
- Never apply drop shadows or outlines to the logo.

---

## 3. Color system

Colors are extracted from the official brand manual by sampling the
wordmark, symbol, and application pages directly.

### 3.1 Core tokens

```css
:root {
  /* Brand — core */
  --cluos-navy:       #1A252D;  /* primary text, dark logo, brand anchor */
  --cluos-teal:       #2E8A82;  /* PRIMARY ACCENT — replaces Mintlify green */
  --cluos-teal-deep:  #1F6F6A;  /* hover / pressed / focus rings */
  --cluos-teal-soft:  #5A9F98;  /* secondary teal, subtle emphasis */
  --cluos-champagne:  #B2B0A0;  /* warm secondary, gradient terminus */
  --cluos-sage:       #6A9888;  /* alternate gradient terminus, soft mode */
  --cluos-pearl:      #C6CDBC;  /* halo highlight, pale tinted surface */

  /* Neutrals — warm-cool balanced, tuned to sit beside navy */
  --cluos-bg:         #FFFFFF;  /* page background */
  --cluos-bg-subtle:  #FAFAF8;  /* alternating section / card background */
  --cluos-bg-muted:   #F3F4F1;  /* code blocks, inert surfaces */
  --cluos-border:     #E7E8E3;  /* default divider */
  --cluos-border-strong: #CFD1CA; /* emphasized divider */

  /* Text */
  --cluos-text:        #1A252D; /* = navy. primary body text */
  --cluos-text-muted:  #5A6570; /* secondary copy, captions */
  --cluos-text-subtle: #8A939B; /* metadata, disabled */
  --cluos-text-on-teal: #FFFFFF;
  --cluos-text-on-navy: #FAFAF8;
}
```

### 3.2 Approved gradients

Only these two gradients are on-brand. Use them **sparingly** — hero
backgrounds, feature cards, brand moments. Never behind text.

```css
--cluos-gradient-primary:
  linear-gradient(135deg, #1A252D 0%, #2E8A82 55%, #B2B0A0 100%);

--cluos-gradient-soft:
  linear-gradient(135deg, #1A252D 0%, #6A9888 100%);
```

For the application-style background (see page 20 of the brand book —
deep teal field with champagne halo), use:

```css
--cluos-bg-brand-hero:
  radial-gradient(ellipse at 85% 25%, #C6CDBC 0%, #6A9888 30%, #2E8A82 70%, #1F6F6A 100%);
```

### 3.3 Usage rules

| Role                  | Token                       |
| --------------------- | --------------------------- |
| Primary action / CTA  | `--cluos-teal`              |
| Primary hover/pressed | `--cluos-teal-deep`         |
| Focus ring            | `--cluos-teal` @ 35% opacity|
| Links                 | `--cluos-teal-deep`         |
| Link hover            | `--cluos-teal`              |
| Selected state tint   | `--cluos-teal` @ 8% opacity |
| Heading text          | `--cluos-navy`              |
| Body text             | `--cluos-text`              |
| Secondary text        | `--cluos-text-muted`        |
| Borders               | `--cluos-border`            |
| Code background       | `--cluos-bg-muted`          |

### 3.4 Semantic status (no red / yellow)

The Cluos palette does not include red, yellow, or orange. Semantic states
are handled with desaturated, brand-sympathetic variants:

```css
--cluos-status-success: #2E8A82;  /* = teal. positive/confirmation */
--cluos-status-success-bg: #E8F2F0;

--cluos-status-info:    #3E6E82;  /* slate-blue — adjacent to navy */
--cluos-status-info-bg: #EDF1F4;

--cluos-status-warn:    #BD7845;  /* light copper — metallic, warmer than olive */
--cluos-status-warn-bg: #F8EBDF;

--cluos-status-error:   #8A3A3A;  /* muted oxblood — quiet, not alarming */
--cluos-status-error-bg:#F5EAEA;
```

Rationale: error can't be avoided in real products, but a loud scarlet
would fight the brand. A muted oxblood reads as "stop" without breaking
the palette. Warnings use a **light copper** — metallic, warm, mineral —
which gives the system a distinctive non-yellow warning color that still
reads as "caution" on first glance.

---

## 4. Typography

### 4.1 Font stack

One family does all UI and content work: **Inter**. This matches
Mintlify's reading-optimized approach — excellent on-screen at any
size, neutral enough to disappear when the content should speak.
`JetBrains Mono` handles code and data.

```css
--font-sans: "Inter", "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace;
```

Load via Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 4.2 Scale

Mintlify-style reading scale. Body is 16px, line-height 1.7 for long-form.

```css
--text-xs:   0.75rem;   /* 12px — metadata, labels */
--text-sm:   0.875rem;  /* 14px — captions, secondary */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — lead paragraph */
--text-xl:   1.25rem;   /* 20px — h4 */
--text-2xl:  1.5rem;    /* 24px — h3 */
--text-3xl:  1.875rem;  /* 30px — h2 */
--text-4xl:  2.25rem;   /* 36px — h1 */
--text-5xl:  3rem;      /* 48px — display */
--text-6xl:  3.75rem;   /* 60px — hero */

--leading-tight:  1.2;
--leading-snug:   1.4;
--leading-normal: 1.6;
--leading-relaxed:1.75;  /* preferred for body copy, matches Mintlify feel */
```

### 4.3 Weight discipline

Keep weights low. The brand reads better in light-to-medium weights:

- `font-weight: 400` (Regular) — default body
- `font-weight: 500` (Medium) — UI emphasis, buttons, nav items, labels
- `font-weight: 600` (Semibold) — headings h1–h4
- `font-weight: 700` (Bold) — avoid; use only for extreme emphasis

**Never use 800 or 900.** They break the brand tone.

### 4.4 Hero / display headings

For hero blocks and the largest "brand moment" heading per page:

```css
.display {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  letter-spacing: -0.02em;   /* tight tracking, editorial */
  line-height: 1.08;
  color: var(--cluos-navy);
}
```

Hero display lives in the same Inter family as everything else — just
larger and tighter. The brand distinctiveness comes from color and
composition, not from a second typeface.

---

## 5. Layout & spacing

Mintlify feel = narrow content column, wide gutters, air above and below.

```css
--space-1:  0.25rem;  /*  4px */
--space-2:  0.5rem;   /*  8px */
--space-3:  0.75rem;  /* 12px */
--space-4:  1rem;     /* 16px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */

--container-prose:   42rem;  /* 672px — long-form reading */
--container-docs:    48rem;  /* 768px — docs content */
--container-product: 72rem;  /* 1152px — dashboard/product */
--container-wide:    80rem;  /* 1280px — marketing hero */

--radius-sm: 6px;
--radius-md: 8px;     /* default for buttons, inputs */
--radius-lg: 12px;    /* default for cards */
--radius-xl: 16px;    /* feature cards, modal */
```

**Section rhythm for marketing/docs:** `padding-block: var(--space-24)`
between major sections. Don't crowd.

---

## 6. Elevation & borders

Shadows are **quiet**. Cluos doesn't punch — it whispers.

```css
--shadow-xs: 0 1px 2px rgba(26, 37, 45, 0.04);
--shadow-sm: 0 1px 3px rgba(26, 37, 45, 0.06), 0 1px 2px rgba(26, 37, 45, 0.04);
--shadow-md: 0 4px 12px rgba(26, 37, 45, 0.06), 0 2px 4px rgba(26, 37, 45, 0.04);
--shadow-lg: 0 12px 32px rgba(26, 37, 45, 0.08), 0 4px 8px rgba(26, 37, 45, 0.04);

/* Tinted with navy, not pure black — matches the brand base */
--ring-focus: 0 0 0 3px rgba(46, 138, 130, 0.25); /* teal @ 25% */
```

Border-first, shadow-second. Prefer a 1px border over a drop shadow for
cards; add shadow only when elevation needs to be felt (modals, popovers).

---

## 7. Component patterns

Terse descriptions — enough for an LLM to generate a faithful component,
not a pixel-perfect spec.

### 7.1 Button

```css
.btn {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--text-sm);
  line-height: 1;
  padding: 0.625rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  cursor: pointer;
}
.btn-primary {
  background: var(--cluos-teal);
  color: var(--cluos-text-on-teal);
}
.btn-primary:hover  { background: var(--cluos-teal-deep); }
.btn-primary:focus-visible { outline: none; box-shadow: var(--ring-focus); }

.btn-secondary {
  background: transparent;
  color: var(--cluos-navy);
  border-color: var(--cluos-border-strong);
}
.btn-secondary:hover { border-color: var(--cluos-navy); background: var(--cluos-bg-subtle); }

.btn-ghost {
  background: transparent;
  color: var(--cluos-teal-deep);
}
.btn-ghost:hover { background: rgba(46, 138, 130, 0.08); }
```

### 7.2 Input / field

1px border, `--cluos-border`. On focus: border becomes `--cluos-teal`,
plus `--ring-focus`. Padding 0.625rem 0.875rem. No heavy inner shadow.

### 7.3 Card

Background `--cluos-bg`, 1px border `--cluos-border`, radius
`--radius-lg`, padding `--space-6`. No shadow by default. Add
`--shadow-sm` only on hover if interactive.

### 7.4 Docs sidebar (Mintlify pattern)

Left column ~260px wide, `--cluos-bg-subtle` background, 1px right border.
Nav items: `font-size: var(--text-sm)`, `font-weight: 500`, padding
`0.375rem 0.75rem`, radius `--radius-sm`. Active item:
`color: var(--cluos-teal-deep)`, `background: rgba(46, 138, 130, 0.08)`.
Section labels (group titles): uppercase, `--text-xs`,
`letter-spacing: 0.08em`, `color: var(--cluos-text-subtle)`.

### 7.5 Prose / long-form body

```css
.prose {
  max-width: var(--container-docs);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--cluos-text);
}
.prose h1 { font-size: var(--text-4xl); font-weight: 600; letter-spacing: -0.02em; margin-block: var(--space-12) var(--space-4); }
.prose h2 { font-size: var(--text-2xl); font-weight: 600; letter-spacing: -0.01em; margin-block: var(--space-12) var(--space-3); }
.prose h3 { font-size: var(--text-xl);  font-weight: 600; margin-block: var(--space-8) var(--space-2); }
.prose p + p { margin-top: var(--space-4); }
.prose a { color: var(--cluos-teal-deep); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.prose a:hover { color: var(--cluos-teal); }
.prose code { font-family: var(--font-mono); font-size: 0.875em; background: var(--cluos-bg-muted); padding: 0.125em 0.375em; border-radius: 4px; }
.prose pre { background: var(--cluos-bg-muted); border: 1px solid var(--cluos-border); border-radius: var(--radius-md); padding: var(--space-4); overflow-x: auto; }
.prose blockquote { border-left: 2px solid var(--cluos-teal); padding-left: var(--space-4); color: var(--cluos-text-muted); font-style: normal; }
```

### 7.6 Callout / admonition (Mintlify-style)

Tinted background matching status color, 1px border in the same hue at
higher opacity, icon on the left. Example (info):

```
background: var(--cluos-status-info-bg)
border:     1px solid rgba(62, 110, 130, 0.25)
color:      var(--cluos-text)
padding:    var(--space-4) var(--space-5)
radius:     var(--radius-md)
```

---

## 8. Motion

Subtle. Cluos doesn't bounce.

```css
--ease-out:  cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

--dur-fast:   120ms;  /* hover, focus */
--dur-base:   200ms;  /* most transitions */
--dur-slow:   400ms;  /* enter/exit, reveal */
```

Stagger and fade-in on scroll are acceptable; never slide from far off-screen,
never bounce, never spin. The brand is calm.

---

## 9. Imagery & illustration

- **Photography:** soft, airy, low-contrast, slightly desaturated. Avoid
  high-saturation stock imagery. Cool shadows, warm highlights reflect
  the teal→champagne logic.
- **Abstract / hero textures:** use `--cluos-bg-brand-hero` (see §3.2) as
  the sanctioned on-brand hero background. For lighter surfaces, a very
  subtle grain overlay (opacity ≤ 3%) adds organic warmth without noise.
- **Icons:** thin, linear, 1.5px stroke, rounded caps. Match the thin
  geometry of the wordmark. Lucide or Phosphor at `weight=light` or
  `weight=regular` only.
- **No iconography with multiple colors.** Icons inherit `currentColor`.

---

## 10. Voice checklist (for any UI copy)

Short. Present tense. No exclamation points. First line does the work —
don't preface. Lowercase labels are fine. Never shout.

Mintlify-like: welcoming but precise, technical without being cold,
explanatory without being wordy.

---

## 11. Quick reference — cheat sheet

| I need…                    | Use                                  |
| -------------------------- | ------------------------------------ |
| Main text color            | `--cluos-navy` / `--cluos-text`      |
| Primary CTA                | `--cluos-teal` background            |
| Any "accent" moment        | `--cluos-teal`                       |
| A warm tone                | `--cluos-champagne`                  |
| A soft-mode gradient       | `--cluos-gradient-soft`              |
| A brand-hero background    | `--cluos-bg-brand-hero`              |
| Page background            | `--cluos-bg` (#FFFFFF)               |
| Section alt-background     | `--cluos-bg-subtle`                  |
| Card / input border        | `--cluos-border`                     |
| Body font                  | `var(--font-sans)` (Inter)           |
| Hero / display heading     | `var(--font-sans)` @ 600, tight tracking |
| Code                       | `var(--font-mono)` (JetBrains Mono)  |
| Error state                | `--cluos-status-error` (muted oxblood) |
| Warning state              | `--cluos-status-warn` (light copper) |
| Success state              | `--cluos-status-success` (= teal)    |
| Default radius (buttons)   | `--radius-md` (8px)                  |
| Default radius (cards)     | `--radius-lg` (12px)                 |

---

## 12. Three hard rules

1. **Teal is the only accent.** Don't introduce a second accent color to
   "add pop". The brand's pop is space, not color.
2. **Restraint in weight.** Default to 400–500. Semibold 600 for headings,
   no heavier. Bold type does not fit the brand.
3. **Gradients are brand moments, not decoration.** Hero, feature card,
   or one landing block — not behind body text, not on buttons, not on
   the sidebar.# DESIGN.md — Cluos

Design system for the Cluos brand. Derived from the clean, reading-optimized
philosophy of Mintlify, adapted to Cluos's teal-and-navy visual language.

Use this file as the single source of truth when generating any UI for Cluos:
marketing pages, product/dashboard, documentation, or collateral. Every
decision here comes from the official Cluos brand manual (logo, gradient
system, type) — so following it keeps the brand coherent across surfaces.

Mode: **light only**. No dark-mode tokens are defined.

---

## 1. Brand essence

Cluos is **quiet confidence**. The wordmark uses ultra-light geometric type.
The symbol is a broken concentric "C" that feels like a sound wave or
ripple — movement, resonance, listening. The gradient drifts from deep
navy into warm champagne, or from navy into sage-teal.

Pick one adjective pair and design to it: **serene + precise**. Never loud.
Never decorative for its own sake. Space, air, and restraint are part of
the brand — the same principle that makes Mintlify readable.

**Do**
- Large amounts of whitespace. Don't be afraid of empty canvas.
- Thin strokes, thin type, thin dividers.
- One accent color per screen, max. Teal does the work.
- Editorial rhythm: wide gutters, generous line-height, unhurried pacing.

**Don't**
- No decorative gradients that the brand doesn't already use (navy→champagne
  and navy→sage are the only approved gradients — see §3).
- No bold/heavy type weights for display. The brand is light-weight type.
- No red, yellow, orange, magenta — Cluos's palette does not include them,
  including for semantic status (see §3.4 for the approved alternatives).
- No rounded-heavy UI. Corners are soft but restrained (8–12px), never pill.

---

## 2. Logo & brand assets

Brand assets must live inside the project (or be installed via the
`@cluos/design-system` package). LLMs operating on code do not access
external URLs — they only see files on disk. Keep a local copy.

**Canonical source of truth** (for download / re-export by a human):
`https://drive.google.com/drive/folders/1rdCIaQaynvDb80Tpb6Py0fhOIWnCHGjj`

### 2.1 Expected local layout

Every consuming repository must have a `brand-assets/` directory
(either copied into the repo, installed via package, or symlinked).
The canonical filenames are:

```
brand-assets/
├── cluos-logo-gradient.svg   # horizontal lockup, default gradient
├── cluos-logo-teal.svg       # horizontal lockup, solid teal
├── cluos-logo-navy.svg       # horizontal lockup, solid navy
├── cluos-logo-white.svg      # horizontal lockup, solid white
├── cluos-symbol.svg          # symbol only (C-ripple), default navy
├── cluos-symbol-teal.svg     # symbol only, solid teal
├── cluos-symbol-white.svg    # symbol only, solid white
└── favicon.svg               # square, optimized for small sizes
```

### 2.2 When to use which (decision table)

| Context                                     | Use                           |
| ------------------------------------------- | ----------------------------- |
| Default header, light background            | `cluos-logo-gradient.svg`    |
| Any surface with a solid dark / teal / gradient background | `cluos-logo-white.svg` |
| Surface that already has a gradient (avoid gradient-on-gradient) | `cluos-logo-navy.svg` or `-teal.svg` |
| Footer on muted/subtle background           | `cluos-logo-navy.svg`        |
| Size is below 96px wide                     | Use a `cluos-symbol-*` variant instead of the full lockup |
| Favicon, avatar slot, app icon              | `favicon.svg`                |
| Loading indicators, empty-state decoration  | `cluos-symbol.svg`           |

### 2.3 Hard rules

- Never recolor the gradient lockup. If a solid color is needed, use
  one of the pre-prepared solid variants.
- Below 96px horizontal width, drop the wordmark and use the symbol
  alone — the wordmark becomes unreadable.
- Never stretch, skew, or rotate any variant.
- Maintain clearspace equal to the height of the "C" around the mark
  (empty padding, no other element should intrude).
- Never apply drop shadows or outlines to the logo.

---

## 3. Color system

Colors are extracted from the official brand manual by sampling the
wordmark, symbol, and application pages directly.

### 3.1 Core tokens

```css
:root {
  /* Brand — core */
  --cluos-navy:       #1A252D;  /* primary text, dark logo, brand anchor */
  --cluos-teal:       #2E8A82;  /* PRIMARY ACCENT — replaces Mintlify green */
  --cluos-teal-deep:  #1F6F6A;  /* hover / pressed / focus rings */
  --cluos-teal-soft:  #5A9F98;  /* secondary teal, subtle emphasis */
  --cluos-champagne:  #B2B0A0;  /* warm secondary, gradient terminus */
  --cluos-sage:       #6A9888;  /* alternate gradient terminus, soft mode */
  --cluos-pearl:      #C6CDBC;  /* halo highlight, pale tinted surface */

  /* Neutrals — warm-cool balanced, tuned to sit beside navy */
  --cluos-bg:         #FFFFFF;  /* page background */
  --cluos-bg-subtle:  #FAFAF8;  /* alternating section / card background */
  --cluos-bg-muted:   #F3F4F1;  /* code blocks, inert surfaces */
  --cluos-border:     #E7E8E3;  /* default divider */
  --cluos-border-strong: #CFD1CA; /* emphasized divider */

  /* Text */
  --cluos-text:        #1A252D; /* = navy. primary body text */
  --cluos-text-muted:  #5A6570; /* secondary copy, captions */
  --cluos-text-subtle: #8A939B; /* metadata, disabled */
  --cluos-text-on-teal: #FFFFFF;
  --cluos-text-on-navy: #FAFAF8;
}
```

### 3.2 Approved gradients

Only these two gradients are on-brand. Use them **sparingly** — hero
backgrounds, feature cards, brand moments. Never behind text.

```css
--cluos-gradient-primary:
  linear-gradient(135deg, #1A252D 0%, #2E8A82 55%, #B2B0A0 100%);

--cluos-gradient-soft:
  linear-gradient(135deg, #1A252D 0%, #6A9888 100%);
```

For the application-style background (see page 20 of the brand book —
deep teal field with champagne halo), use:

```css
--cluos-bg-brand-hero:
  radial-gradient(ellipse at 85% 25%, #C6CDBC 0%, #6A9888 30%, #2E8A82 70%, #1F6F6A 100%);
```

### 3.3 Usage rules

| Role                  | Token                       |
| --------------------- | --------------------------- |
| Primary action / CTA  | `--cluos-teal`              |
| Primary hover/pressed | `--cluos-teal-deep`         |
| Focus ring            | `--cluos-teal` @ 35% opacity|
| Links                 | `--cluos-teal-deep`         |
| Link hover            | `--cluos-teal`              |
| Selected state tint   | `--cluos-teal` @ 8% opacity |
| Heading text          | `--cluos-navy`              |
| Body text             | `--cluos-text`              |
| Secondary text        | `--cluos-text-muted`        |
| Borders               | `--cluos-border`            |
| Code background       | `--cluos-bg-muted`          |

### 3.4 Semantic status (no red / yellow)

The Cluos palette does not include red, yellow, or orange. Semantic states
are handled with desaturated, brand-sympathetic variants:

```css
--cluos-status-success: #2E8A82;  /* = teal. positive/confirmation */
--cluos-status-success-bg: #E8F2F0;

--cluos-status-info:    #3E6E82;  /* slate-blue — adjacent to navy */
--cluos-status-info-bg: #EDF1F4;

--cluos-status-warn:    #BD7845;  /* light copper — metallic, warmer than olive */
--cluos-status-warn-bg: #F8EBDF;

--cluos-status-error:   #8A3A3A;  /* muted oxblood — quiet, not alarming */
--cluos-status-error-bg:#F5EAEA;
```

Rationale: error can't be avoided in real products, but a loud scarlet
would fight the brand. A muted oxblood reads as "stop" without breaking
the palette. Warnings use a **light copper** — metallic, warm, mineral —
which gives the system a distinctive non-yellow warning color that still
reads as "caution" on first glance.

---

## 4. Typography

### 4.1 Font stack

One family does all UI and content work: **Inter**. This matches
Mintlify's reading-optimized approach — excellent on-screen at any
size, neutral enough to disappear when the content should speak.
`JetBrains Mono` handles code and data.

```css
--font-sans: "Inter", "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace;
```

Load via Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 4.2 Scale

Mintlify-style reading scale. Body is 16px, line-height 1.7 for long-form.

```css
--text-xs:   0.75rem;   /* 12px — metadata, labels */
--text-sm:   0.875rem;  /* 14px — captions, secondary */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — lead paragraph */
--text-xl:   1.25rem;   /* 20px — h4 */
--text-2xl:  1.5rem;    /* 24px — h3 */
--text-3xl:  1.875rem;  /* 30px — h2 */
--text-4xl:  2.25rem;   /* 36px — h1 */
--text-5xl:  3rem;      /* 48px — display */
--text-6xl:  3.75rem;   /* 60px — hero */

--leading-tight:  1.2;
--leading-snug:   1.4;
--leading-normal: 1.6;
--leading-relaxed:1.75;  /* preferred for body copy, matches Mintlify feel */
```

### 4.3 Weight discipline

Keep weights low. The brand reads better in light-to-medium weights:

- `font-weight: 400` (Regular) — default body
- `font-weight: 500` (Medium) — UI emphasis, buttons, nav items, labels
- `font-weight: 600` (Semibold) — headings h1–h4
- `font-weight: 700` (Bold) — avoid; use only for extreme emphasis

**Never use 800 or 900.** They break the brand tone.

### 4.4 Hero / display headings

For hero blocks and the largest "brand moment" heading per page:

```css
.display {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  letter-spacing: -0.02em;   /* tight tracking, editorial */
  line-height: 1.08;
  color: var(--cluos-navy);
}
```

Hero display lives in the same Inter family as everything else — just
larger and tighter. The brand distinctiveness comes from color and
composition, not from a second typeface.

---

## 5. Layout & spacing

Mintlify feel = narrow content column, wide gutters, air above and below.

```css
--space-1:  0.25rem;  /*  4px */
--space-2:  0.5rem;   /*  8px */
--space-3:  0.75rem;  /* 12px */
--space-4:  1rem;     /* 16px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */

--container-prose:   42rem;  /* 672px — long-form reading */
--container-docs:    48rem;  /* 768px — docs content */
--container-product: 72rem;  /* 1152px — dashboard/product */
--container-wide:    80rem;  /* 1280px — marketing hero */

--radius-sm: 6px;
--radius-md: 8px;     /* default for buttons, inputs */
--radius-lg: 12px;    /* default for cards */
--radius-xl: 16px;    /* feature cards, modal */
```

**Section rhythm for marketing/docs:** `padding-block: var(--space-24)`
between major sections. Don't crowd.

---

## 6. Elevation & borders

Shadows are **quiet**. Cluos doesn't punch — it whispers.

```css
--shadow-xs: 0 1px 2px rgba(26, 37, 45, 0.04);
--shadow-sm: 0 1px 3px rgba(26, 37, 45, 0.06), 0 1px 2px rgba(26, 37, 45, 0.04);
--shadow-md: 0 4px 12px rgba(26, 37, 45, 0.06), 0 2px 4px rgba(26, 37, 45, 0.04);
--shadow-lg: 0 12px 32px rgba(26, 37, 45, 0.08), 0 4px 8px rgba(26, 37, 45, 0.04);

/* Tinted with navy, not pure black — matches the brand base */
--ring-focus: 0 0 0 3px rgba(46, 138, 130, 0.25); /* teal @ 25% */
```

Border-first, shadow-second. Prefer a 1px border over a drop shadow for
cards; add shadow only when elevation needs to be felt (modals, popovers).

---

## 7. Component patterns

Terse descriptions — enough for an LLM to generate a faithful component,
not a pixel-perfect spec.

### 7.1 Button

```css
.btn {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: var(--text-sm);
  line-height: 1;
  padding: 0.625rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
  cursor: pointer;
}
.btn-primary {
  background: var(--cluos-teal);
  color: var(--cluos-text-on-teal);
}
.btn-primary:hover  { background: var(--cluos-teal-deep); }
.btn-primary:focus-visible { outline: none; box-shadow: var(--ring-focus); }

.btn-secondary {
  background: transparent;
  color: var(--cluos-navy);
  border-color: var(--cluos-border-strong);
}
.btn-secondary:hover { border-color: var(--cluos-navy); background: var(--cluos-bg-subtle); }

.btn-ghost {
  background: transparent;
  color: var(--cluos-teal-deep);
}
.btn-ghost:hover { background: rgba(46, 138, 130, 0.08); }
```

### 7.2 Input / field

1px border, `--cluos-border`. On focus: border becomes `--cluos-teal`,
plus `--ring-focus`. Padding 0.625rem 0.875rem. No heavy inner shadow.

### 7.3 Card

Background `--cluos-bg`, 1px border `--cluos-border`, radius
`--radius-lg`, padding `--space-6`. No shadow by default. Add
`--shadow-sm` only on hover if interactive.

### 7.4 Docs sidebar (Mintlify pattern)

Left column ~260px wide, `--cluos-bg-subtle` background, 1px right border.
Nav items: `font-size: var(--text-sm)`, `font-weight: 500`, padding
`0.375rem 0.75rem`, radius `--radius-sm`. Active item:
`color: var(--cluos-teal-deep)`, `background: rgba(46, 138, 130, 0.08)`.
Section labels (group titles): uppercase, `--text-xs`,
`letter-spacing: 0.08em`, `color: var(--cluos-text-subtle)`.

### 7.5 Prose / long-form body

```css
.prose {
  max-width: var(--container-docs);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--cluos-text);
}
.prose h1 { font-size: var(--text-4xl); font-weight: 600; letter-spacing: -0.02em; margin-block: var(--space-12) var(--space-4); }
.prose h2 { font-size: var(--text-2xl); font-weight: 600; letter-spacing: -0.01em; margin-block: var(--space-12) var(--space-3); }
.prose h3 { font-size: var(--text-xl);  font-weight: 600; margin-block: var(--space-8) var(--space-2); }
.prose p + p { margin-top: var(--space-4); }
.prose a { color: var(--cluos-teal-deep); text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.prose a:hover { color: var(--cluos-teal); }
.prose code { font-family: var(--font-mono); font-size: 0.875em; background: var(--cluos-bg-muted); padding: 0.125em 0.375em; border-radius: 4px; }
.prose pre { background: var(--cluos-bg-muted); border: 1px solid var(--cluos-border); border-radius: var(--radius-md); padding: var(--space-4); overflow-x: auto; }
.prose blockquote { border-left: 2px solid var(--cluos-teal); padding-left: var(--space-4); color: var(--cluos-text-muted); font-style: normal; }
```

### 7.6 Callout / admonition (Mintlify-style)

Tinted background matching status color, 1px border in the same hue at
higher opacity, icon on the left. Example (info):

```
background: var(--cluos-status-info-bg)
border:     1px solid rgba(62, 110, 130, 0.25)
color:      var(--cluos-text)
padding:    var(--space-4) var(--space-5)
radius:     var(--radius-md)
```

---

## 8. Motion

Subtle. Cluos doesn't bounce.

```css
--ease-out:  cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

--dur-fast:   120ms;  /* hover, focus */
--dur-base:   200ms;  /* most transitions */
--dur-slow:   400ms;  /* enter/exit, reveal */
```

Stagger and fade-in on scroll are acceptable; never slide from far off-screen,
never bounce, never spin. The brand is calm.

---

## 9. Imagery & illustration

- **Photography:** soft, airy, low-contrast, slightly desaturated. Avoid
  high-saturation stock imagery. Cool shadows, warm highlights reflect
  the teal→champagne logic.
- **Abstract / hero textures:** use `--cluos-bg-brand-hero` (see §3.2) as
  the sanctioned on-brand hero background. For lighter surfaces, a very
  subtle grain overlay (opacity ≤ 3%) adds organic warmth without noise.
- **Icons:** thin, linear, 1.5px stroke, rounded caps. Match the thin
  geometry of the wordmark. Lucide or Phosphor at `weight=light` or
  `weight=regular` only.
- **No iconography with multiple colors.** Icons inherit `currentColor`.

---

## 10. Voice checklist (for any UI copy)

Short. Present tense. No exclamation points. First line does the work —
don't preface. Lowercase labels are fine. Never shout.

Mintlify-like: welcoming but precise, technical without being cold,
explanatory without being wordy.

---

## 11. Quick reference — cheat sheet

| I need…                    | Use                                  |
| -------------------------- | ------------------------------------ |
| Main text color            | `--cluos-navy` / `--cluos-text`      |
| Primary CTA                | `--cluos-teal` background            |
| Any "accent" moment        | `--cluos-teal`                       |
| A warm tone                | `--cluos-champagne`                  |
| A soft-mode gradient       | `--cluos-gradient-soft`              |
| A brand-hero background    | `--cluos-bg-brand-hero`              |
| Page background            | `--cluos-bg` (#FFFFFF)               |
| Section alt-background     | `--cluos-bg-subtle`                  |
| Card / input border        | `--cluos-border`                     |
| Body font                  | `var(--font-sans)` (Inter)           |
| Hero / display heading     | `var(--font-sans)` @ 600, tight tracking |
| Code                       | `var(--font-mono)` (JetBrains Mono)  |
| Error state                | `--cluos-status-error` (muted oxblood) |
| Warning state              | `--cluos-status-warn` (light copper) |
| Success state              | `--cluos-status-success` (= teal)    |
| Default radius (buttons)   | `--radius-md` (8px)                  |
| Default radius (cards)     | `--radius-lg` (12px)                 |

---

## 12. Three hard rules

1. **Teal is the only accent.** Don't introduce a second accent color to
   "add pop". The brand's pop is space, not color.
2. **Restraint in weight.** Default to 400–500. Semibold 600 for headings,
   no heavier. Bold type does not fit the brand.
3. **Gradients are brand moments, not decoration.** Hero, feature card,
   or one landing block — not behind body text, not on buttons, not on
   the sidebar.