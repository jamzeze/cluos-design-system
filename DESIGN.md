# DESIGN.md — Cluos

Design system for the Cluos brand. Derived from the clean, reading-optimized
philosophy of Mintlify, adapted to Cluos's teal-and-navy visual language.

Use this file as the single source of truth when generating any UI for
Cluos: marketing pages, product/dashboard, documentation, or collateral.
Every color here comes directly from the official Cluos brand manual
(`Paleta de Cores_CluOs.pdf`).

Mode: **light only**. No dark-mode tokens are defined.

---

## 1. Brand essence

Cluos is **quiet confidence**. The wordmark uses ultra-light geometric
type. The symbol is a broken concentric "C" that feels like a sound
wave or ripple — movement, resonance, listening. The gradient drifts
from deep navy into warm champagne or cool silver.

Pick one adjective pair and design to it: **serene + precise**. Never
loud. Never decorative for its own sake. Space, air, and restraint are
part of the brand.

**Do**
- Large amounts of whitespace. Don't be afraid of empty canvas.
- Thin strokes, thin type, thin dividers.
- One accent color per screen, max. Teal does the work.
- Editorial rhythm: wide gutters, generous line-height, unhurried pacing.

**Don't**
- No decorative gradients that the brand doesn't already use (only the
  approved gradients in §3.2).
- No bold/heavy type weights for display. The brand is light-weight type.
- No yellow. Cluos's palette does not include it for semantic states —
  we use a light copper instead (see §3.4).
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
├── cluos-logo-gradient.svg     # horizontal lockup, default gradient
├── cluos-logo-teal.svg         # horizontal lockup, solid teal
├── cluos-logo-navy.svg         # horizontal lockup, solid navy
├── cluos-logo-white.svg        # horizontal lockup, solid white
├── cluos-logo-black.svg        # horizontal lockup, solid black
├── cluos-symbol-gradient.svg   # symbol only, default gradient
├── cluos-symbol-navy.svg       # symbol only, solid navy
├── cluos-symbol-teal.svg       # symbol only, solid teal
├── cluos-symbol-white.svg      # symbol only, solid white
└── favicon.svg                 # square, optimized for small sizes
```

### 2.2 When to use which (decision table)

| Context                                     | Use                          |
| ------------------------------------------- | ----------------------------- |
| Default header, light background            | `cluos-logo-gradient.svg`    |
| Any solid dark / teal / gradient background | `cluos-logo-white.svg`       |
| Surface that already has a gradient         | `cluos-logo-navy.svg` or `-teal.svg` |
| Footer on muted/subtle background           | `cluos-logo-navy.svg`        |
| Marketing collateral on warm/champagne bg   | `cluos-logo-black.svg`       |
| Size below 96px wide                        | a `cluos-symbol-*` variant   |
| Favicon, avatar slot, app icon              | `favicon.svg`                |
| Loading indicators, empty-state decoration  | `cluos-symbol-gradient.svg`  |

### 2.3 Hard rules

- Never recolor the gradient lockup. If a solid color is needed, use
  one of the pre-prepared solid variants.
- Below 96px horizontal width, drop the wordmark and use the symbol
  alone — the wordmark becomes unreadable.
- Never stretch, skew, or rotate any variant.
- Maintain clearspace equal to the height of the "C" around the mark.
- Never apply drop shadows or outlines to the logo.

---

## 3. Color system

All core colors are taken verbatim from the official Cluos palette:

| Official HEX | Role in system       |
| ------------ | -------------------- |
| `#008080`    | Teal (primary accent)|
| `#1B2F36`    | Navy (primary text)  |
| `#1D1D1B`    | Black (mono / high-contrast) |
| `#C8C1AE`    | Champagne (warm secondary) |
| `#B5B4B5`    | Silver (cool secondary)|
| `#FFFFFF`    | White                |

### 3.1 Core tokens

```css
:root {
  /* Brand — official palette (exact values from Paleta de Cores_CluOs.pdf) */
  --cluos-teal:       #008080;
  --cluos-navy:       #1B2F36;
  --cluos-black:      #1D1D1B;
  --cluos-champagne:  #C8C1AE;
  --cluos-silver:     #B5B4B5;
  --cluos-white:      #FFFFFF;

  /* Brand — derived (UI states) */
  --cluos-teal-deep:  #006666;  /* hover, pressed, emphasis */
  --cluos-teal-soft:  #4DA3A3;  /* tinted teal for subtle emphasis */

  /* Neutrals — for UI surfaces */
  --cluos-bg:            #FFFFFF;
  --cluos-bg-subtle:     #FAFAF8;
  --cluos-bg-muted:      #F3F4F1;
  --cluos-border:        #E7E8E3;
  --cluos-border-strong: #CFD1CA;

  /* Text */
  --cluos-text:         #1B2F36;
  --cluos-text-muted:   #5A6570;
  --cluos-text-subtle:  #8A939B;
  --cluos-text-on-teal: #FFFFFF;
  --cluos-text-on-navy: #FAFAF8;
}
```

### 3.2 Approved gradients

Use sparingly — hero blocks, feature cards, brand moments. Never behind
text.

```css
/* Primary wordmark gradient — black → navy → champagne → silver.
   Stop percentages derived from the official SVG.                  */
--cluos-gradient-primary:
  linear-gradient(135deg, #1D1D1B 0%, #1B2F36 18%, #C8C1AE 67%, #B5B4B5 100%);

/* Soft — navy to champagne only */
--cluos-gradient-soft:
  linear-gradient(135deg, #1B2F36 0%, #C8C1AE 100%);

/* Mono — navy to silver, cool */
--cluos-gradient-mono:
  linear-gradient(135deg, #1B2F36 0%, #B5B4B5 100%);

/* Radial hero — teal field with champagne halo (app page 20 style) */
--cluos-bg-brand-hero:
  radial-gradient(ellipse at 85% 25%,
    #C8C1AE 0%, #008080 55%, #006666 100%);
```

### 3.3 Usage rules

| Role                  | Token                          |
| --------------------- | ------------------------------ |
| Primary action / CTA  | `--cluos-teal`                 |
| Primary hover/pressed | `--cluos-teal-deep`            |
| Focus ring            | `--cluos-teal` @ 30% opacity   |
| Links                 | `--cluos-teal-deep`            |
| Link hover            | `--cluos-teal`                 |
| Selected state tint   | `--cluos-teal` @ 8% opacity    |
| Heading text          | `--cluos-navy`                 |
| Body text             | `--cluos-text`                 |
| Secondary text        | `--cluos-text-muted`           |
| Borders               | `--cluos-border`               |
| Code background       | `--cluos-bg-muted`             |

### 3.4 Semantic status (no yellow)

Four status colors. Two of them (success, info) reuse brand-adjacent
tones. Two (warn, error) are explicit additions chosen to belong with
the teal + champagne palette without looking like stock Material colors.

```css
--cluos-status-success:    #008080;   /* = teal. positive / confirmation */
--cluos-status-success-bg: #E6F2F2;

--cluos-status-info:       #3E6E82;   /* slate-blue, adjacent to navy */
--cluos-status-info-bg:    #EDF1F4;

--cluos-status-warn:       #BD7845;   /* light copper — metallic, warm */
--cluos-status-warn-bg:    #F8EBDF;

--cluos-status-error:      #8A3A3A;   /* muted oxblood — quiet, not scarlet */
--cluos-status-error-bg:   #F5EAEA;
```

Rationale: error can't be avoided in real products, but a loud scarlet
would fight the brand. A muted oxblood reads as "stop" without breaking
the palette. Warnings use a light copper — metallic, warm, mineral —
which gives the system a distinctive non-yellow warning color that
still reads as "caution" on first glance.

---

## 4. Typography

### 4.1 Font stack

One family does all UI and content work: **Inter**. Matches Mintlify's
reading-optimized approach — excellent on-screen at any size, neutral
enough to disappear when the content should speak. `JetBrains Mono`
handles code and data.

```css
--font-sans: "Inter", "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace;
```

Google Fonts loader:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 4.2 Scale

Body 16px. Line-height 1.75 for long-form reading.

```css
--text-xs:   0.75rem;
--text-sm:   0.875rem;
--text-base: 1rem;
--text-lg:   1.125rem;
--text-xl:   1.25rem;
--text-2xl:  1.5rem;
--text-3xl:  1.875rem;
--text-4xl:  2.25rem;
--text-5xl:  3rem;
--text-6xl:  3.75rem;

--leading-tight:   1.2;
--leading-snug:    1.4;
--leading-normal:  1.6;
--leading-relaxed: 1.75;
```

### 4.3 Weight discipline

- `400` — default body
- `500` — UI emphasis (buttons, nav, labels)
- `600` — headings h1–h4
- `700` — avoid; extreme emphasis only
- **Never 800 / 900.**

### 4.4 Hero / display headings

```css
.display {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  letter-spacing: -0.02em;
  line-height: 1.08;
  color: var(--cluos-navy);
}
```

Hero display is just Inter 600 with tighter tracking. Distinctiveness
comes from color and composition, not a second typeface.

---

## 5. Layout & spacing

```css
--space-1:  0.25rem;
--space-2:  0.5rem;
--space-3:  0.75rem;
--space-4:  1rem;
--space-6:  1.5rem;
--space-8:  2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;

--container-prose:   42rem;
--container-docs:    48rem;
--container-product: 72rem;
--container-wide:    80rem;

--radius-sm:  6px;
--radius-md:  8px;
--radius-lg:  12px;
--radius-xl:  16px;
--radius-2xl: 24px;
```

Section rhythm: `padding-block: var(--space-24)` between major sections.

---

## 6. Elevation & borders

```css
--shadow-xs: 0 1px 2px rgba(27, 47, 54, 0.04);
--shadow-sm: 0 1px 3px rgba(27, 47, 54, 0.06), 0 1px 2px rgba(27, 47, 54, 0.04);
--shadow-md: 0 4px 12px rgba(27, 47, 54, 0.06), 0 2px 4px rgba(27, 47, 54, 0.04);
--shadow-lg: 0 12px 32px rgba(27, 47, 54, 0.08), 0 4px 8px rgba(27, 47, 54, 0.04);

--ring-focus: 0 0 0 3px rgba(0, 128, 128, 0.30);
```

Border-first, shadow-second. Prefer 1px border over drop shadow.

---

## 7. Component patterns

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
  transition: all 120ms cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: pointer;
}
.btn-primary    { background: var(--cluos-teal); color: var(--cluos-text-on-teal); }
.btn-primary:hover { background: var(--cluos-teal-deep); }
.btn-primary:focus-visible { outline: none; box-shadow: var(--ring-focus); }

.btn-secondary  { background: transparent; color: var(--cluos-navy); border-color: var(--cluos-border-strong); }
.btn-secondary:hover { border-color: var(--cluos-navy); background: var(--cluos-bg-subtle); }

.btn-ghost      { background: transparent; color: var(--cluos-teal-deep); }
.btn-ghost:hover { background: rgba(0, 128, 128, 0.08); }
```

### 7.2 Input / field

1px border `--cluos-border`. On focus: border `--cluos-teal` + `--ring-focus`.
Padding `0.625rem 0.875rem`. No heavy inner shadow.

### 7.3 Card

`--cluos-bg` background, 1px `--cluos-border`, `--radius-lg`, padding
`--space-6`. No shadow by default. `--shadow-sm` on hover if interactive.

### 7.4 Docs sidebar (Mintlify pattern)

Left column ~260px, `--cluos-bg-subtle` background. Nav items 14px /500,
`0.375rem 0.75rem` padding, `--radius-sm`. Active item
`color: var(--cluos-teal-deep)`, `background: rgba(0, 128, 128, 0.08)`.
Section labels uppercase, `--text-xs`, `0.08em` tracking,
`--cluos-text-subtle`.

### 7.5 Prose / long-form

```css
.prose {
  max-width: var(--container-docs);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--cluos-text);
}
.prose h1 { font-size: var(--text-4xl); font-weight: 600; letter-spacing: -0.02em; margin-block: var(--space-12) var(--space-4); }
.prose h2 { font-size: var(--text-2xl); font-weight: 600; letter-spacing: -0.01em; margin-block: var(--space-12) var(--space-3); }
.prose h3 { font-size: var(--text-xl);  font-weight: 600; margin-block: var(--space-8) var(--space-2); }
.prose a  { color: var(--cluos-teal-deep); text-decoration: underline; text-underline-offset: 3px; }
.prose a:hover { color: var(--cluos-teal); }
.prose code { font-family: var(--font-mono); font-size: 0.875em; background: var(--cluos-bg-muted); padding: 0.125em 0.375em; border-radius: 4px; }
.prose pre  { background: var(--cluos-bg-muted); border: 1px solid var(--cluos-border); border-radius: var(--radius-md); padding: var(--space-4); overflow-x: auto; }
.prose blockquote { border-left: 2px solid var(--cluos-teal); padding-left: var(--space-4); color: var(--cluos-text-muted); }
```

### 7.6 Callout / admonition

Tinted background from `--cluos-status-<type>-bg`, 1px border in the
same hue at higher opacity, icon in `--cluos-status-<type>`.

---

## 8. Motion

```css
--ease-out:    cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--dur-fast: 120ms;
--dur-base: 200ms;
--dur-slow: 400ms;
```

Never bounce, never spin, never slide from far off-screen. Calm.

---

## 9. Imagery & illustration

- **Photography:** soft, airy, low-contrast, slightly desaturated.
- **Hero textures:** `--cluos-bg-brand-hero`. For lighter surfaces, a
  subtle grain overlay (opacity ≤ 3%).
- **Icons:** thin linear, 1.5px stroke, rounded caps. Lucide or Phosphor
  at weight=light or regular. Inherit `currentColor`.

---

## 10. Voice (UI copy)

Short. Present tense. No exclamation points. First line does the work.
Lowercase labels are fine. Never shout.

---

## 11. Cheat sheet

| Need                      | Token                                |
| ------------------------- | ------------------------------------ |
| Primary text              | `--cluos-navy`                       |
| Primary CTA               | `--cluos-teal`                       |
| Accent moment             | `--cluos-teal`                       |
| Warm tone                 | `--cluos-champagne`                  |
| Cool tone                 | `--cluos-silver`                     |
| Brand gradient            | `--cluos-gradient-primary`           |
| Hero background           | `--cluos-bg-brand-hero`              |
| Page background           | `--cluos-bg`                         |
| Alt section background    | `--cluos-bg-subtle`                  |
| Border                    | `--cluos-border`                     |
| Body font                 | `var(--font-sans)`                   |
| Display                   | `var(--font-sans)` @ 600, -0.02em    |
| Code                      | `var(--font-mono)`                   |
| Error                     | `--cluos-status-error` (oxblood)     |
| Warning                   | `--cluos-status-warn` (copper)       |
| Success                   | `--cluos-status-success` (teal)      |
| Default button radius     | `--radius-md` (8px)                  |
| Default card radius       | `--radius-lg` (12px)                 |

---

## 12. Three hard rules

1. **Teal is the only accent.** No second accent to "add pop".
2. **Restraint in weight.** 400–500 default, 600 for headings, no more.
3. **Gradients are brand moments, not decoration.**
