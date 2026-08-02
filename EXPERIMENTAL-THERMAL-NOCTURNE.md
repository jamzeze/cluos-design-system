# DESIGN.md - CluOS Experimental Identity

Experimental mode: **Thermal Nocturne**

Status: approved design direction, not yet a replacement for the canonical CluOS
Design System.

This document defines the visual contract for the experimental showcase and for
future evaluation in CluOS products. Existing official CluOS logo artwork remains
unchanged; use the prepared white or navy assets and never reconstruct or recolor
the mark.

## 1. Theme

Thermal Nocturne is a dark-primary system with a light operational companion.
It combines deep architectural fields with luminous, data-driven traces.

- Dark mode is the expressive brand and monitoring register.
- Light mode is the operational, long-session, and content-dense register.
- The same semantic roles, spacing, type, and interaction patterns apply to both.
- A screen may use one dominant appearance. Do not alternate dark and light cards
  as decoration.

## 2. Color foundation

### 2.1 Official Azigos colors promoted to primary CluOS roles

| Token | Value | Role |
| --- | --- | --- |
| `--cluos-primary-950` | `#010D28` | Primary brand field, text on light surfaces |
| `--cluos-primary-800` | `#132952` | Elevated dark surface, secondary brand field |
| `--cluos-signal-400` | `#C4DB7B` | Primary signal, CTA with navy text, active focus |
| `--cluos-white` | `#FFFFFF` | High-contrast foreground and base surface |
| `--cluos-neutral-100` | `#EAEAEA` | Light neutral source |
| `--cluos-neutral-500` | `#A5A5A5` | Decorative neutral only; not body text on white |

### 2.2 Preserved CluOS nuance and semantic colors

| Token | Value | Role |
| --- | --- | --- |
| `--cluos-copper-500` | `#BD7845` | Attention, material nuance, progress transition |
| `--cluos-copper-700` | `#965D34` | Copper hover/pressed and strong text on light tint |
| `--cluos-oxblood-500` | `#8A3A3A` | Error, blocked state, destructive emphasis |
| `--cluos-oxblood-700` | `#662828` | Oxblood pressed and strong error text |
| `--cluos-teal-500` | `#008080` | Success and stable completion |
| `--cluos-info-500` | `#3E6E82` | Informational state |

### 2.3 Derived surfaces

Derive all non-source colors with OKLCH mixing. Never introduce unrelated raw
hex colors inside components.

```css
:root {
  --surface-light: oklch(0.975 0 0);
  --surface-light-raised: #FFFFFF;
  --surface-light-muted: color-mix(in oklch, #FFFFFF 92%, #C4DB7B);
  --surface-night: #010D28;
  --surface-night-raised: color-mix(in oklch, #010D28 78%, #132952);
  --surface-night-deep: color-mix(in oklch, #010D28 92%, black);
  --text-on-night: oklch(0.975 0.008 110);
  --text-on-night-muted: color-mix(in oklch, var(--text-on-night) 68%, transparent);
  --border-on-night: color-mix(in oklch, white 14%, transparent);
}
```

### 2.4 Verified contrast pairs

| Foreground / background | Contrast | Permission |
| --- | ---: | --- |
| `#010D28` / `#C4DB7B` | 12.63:1 | AAA text and controls |
| `#010D28` / `#FFFFFF` | 19.27:1 | AAA text |
| `#FFFFFF` / `#132952` | 14.32:1 | AAA text |
| `#010D28` / `#BD7845` | 5.45:1 | AA text and controls |
| `#FFFFFF` / `#8A3A3A` | 7.64:1 | AAA text |
| `#FFFFFF` / `#008080` | 4.77:1 | AA text and controls |
| `#FFFFFF` / `#BD7845` | 3.54:1 | Large text or non-text only |
| `#A5A5A5` / `#FFFFFF` | 2.46:1 | Prohibited for text |

Use navy text on copper buttons. Use white text on oxblood and teal controls.

## 3. Typography

### 3.1 Voice

Typography should feel like a precise instrument with a human rhythm. It is not
a terminal costume and it does not imitate the modified Virtual typography used
by Azigos.

### 3.2 Families

- **Onest Variable**: display, headings, body, navigation, and controls.
- **Azeret Mono**: telemetry, timestamps, agent IDs, trace labels, and compact
  technical data only.
- System fallbacks: `ui-sans-serif`, `system-ui`, sans-serif and `ui-monospace`,
  `SFMono-Regular`, monospace.

```css
--font-sans: "Onest", ui-sans-serif, system-ui, sans-serif;
--font-mono: "Azeret Mono", ui-monospace, "SFMono-Regular", monospace;
```

### 3.3 Weight and scale

- Display: 500-600, `clamp(2.75rem, 6vw, 5.5rem)`, minimum tracking `-0.04em`.
- H1-H3: 500-600. Never use 800 or 900.
- Body: 400, 16px minimum, 1.55-1.7 line height, 65-75ch maximum.
- UI labels: 500. Uppercase is reserved for telemetry labels under 18 characters.
- Technical data: Azeret Mono 400-500 with tabular figures.

## 4. Layout and material

- Use an 8px spacing rhythm with 4px for internal optical adjustments.
- Desktop content width: 1280px maximum; prose width: 68ch.
- Radius: 6, 10, 14, and 20px. Pills are reserved for compact statuses.
- Borders establish hierarchy before shadows.
- Dark raised surfaces use a single top-edge highlight and subtle navy elevation,
  not translucent glass by default.
- Cards group a decision, state, or related controls. Do not card-wrap every block.
- Asymmetry is permitted in brand sections; operational products use a stable grid.

## 5. Canonical effects

All effects are optional and used only when the associated meaning exists.

### Effect 1 - Ambient Field

A localized radial field marks the currently active region or system focus.

- Maximum one dominant source per viewport.
- It may respond to state or pointer proximity but never chase the cursor.
- Reduced motion uses a static field.

### Effect 2 - Thermal Trace

The sequence lime -> copper -> oxblood represents nominal progress, attention,
and blocked/risk stages.

- Always include labels, shape, or values.
- Use for pipelines, verification, orchestration, and timeline progress.
- Never use it as gradient text.

### Effect 3 - Flow Contour

Laminar curves connect memory, agents, decisions, and outcomes.

- Paths must correspond to real data flow or narrative relationships.
- SVG is preferred for small networks; Canvas is reserved for dense networks.
- Motion is triggered by state changes, not perpetual decoration.

### Effect 4 - Spectral Edge

A lime-copper-oxblood edge identifies exceptional focus or advanced processing.

- Maximum one occurrence per screen.
- Prohibited as the default border of cards, inputs, or navigation.
- A solid high-contrast focus ring remains available for accessibility.

### Effect 6 - Depth Veil

Blur plus scrim isolates a modal, command palette, or focused drawer while
preserving spatial context.

- Scrim opacity: 45-60% on dark content.
- Blur never carries essential information.
- Prohibited as decorative glassmorphism on ordinary surfaces.

### Effect 8 - Agent Mesh

A topology view explains agents, dependencies, responsibility, and handoffs.

- Nodes and edges represent actual entities and relationships.
- Every visualization includes a text summary or accessible table alternative.
- No random particles or unlabeled constellations.

## 6. Motion

- Micro-interactions: 150-240ms.
- State transitions: 180-300ms.
- Complex brand transitions: maximum 400ms.
- Enter uses exponential ease-out; exit is 60-70% of enter duration.
- Animate transform, opacity, SVG path, mask, and shader uniforms. Avoid layout
  properties.
- Continuous animation is limited to loading or a justified live system signal.
- Maximum two expressive effects in one viewport and one active GPU canvas.

## 7. Technology ladder

Use the lowest capable layer.

1. Native CSS, SVG, Web Animations API.
2. Motion for product UI, SVG, controlled scroll, and shared timing.
3. Paper Shaders for approved background and masked shader effects. Pin versions.
4. Rive for interactive authored vectors; dotLottie for portable vector playback.
5. PixiJS for dense 2D maps and agent meshes.
6. Three.js plus React Three Fiber for meaningful spatial or 3D experiences.
7. Spline and GSAP are conditional tools for authored 3D or cinematic brand pages.

Vanta.js, ShaderToy assets, Theatre.js, and Unicorn Studio are not canonical
runtime dependencies. They may support research or prototyping after licensing,
performance, and export review.

## 8. Components and states

### Primary action

- Background: signal lime.
- Foreground: primary navy.
- One primary action per visual region.
- Minimum height: 44px; focus ring: 3px solid lime or white with separation.

### Secondary action

- Transparent or raised navy surface with a visible 1px border.
- Hover changes surface and border, not layout.

### Status

- Success: teal plus check icon and label.
- Info: slate-blue plus information icon and label.
- Warning: copper tint plus attention icon and recovery guidance.
- Error: oxblood plus error icon, cause, and recovery action.

### Inputs

- Visible labels, helper text, inline errors, 44px minimum height.
- Dark inputs use a raised navy field; light inputs use white with strong borders.
- Focus never depends on Spectral Edge alone.

## 9. Showcase composition

The approved HTML showcase will include:

1. Thermal Nocturne hero with Ambient Field and Thermal Trace.
2. Brand foundation and semantic color mapping.
3. Typography and spacing specimens.
4. Interactive demonstrations of effects 1, 2, 3, 4, 6, and 8.
5. Component states in dark and light appearances.
6. Modern product examples: orchestration command center, operational queue,
   command palette, and agent mesh.
7. Technology decision matrix and performance rules.
8. Accessibility and reduced-motion demonstration.

## 10. Performance and quality gates

- The base experience remains readable and operable with JavaScript disabled.
- GPU effects are progressively enhanced and provide a static fallback.
- Pause rendering when canvas content is offscreen or the tab is hidden.
- Cap device pixel ratio for GPU scenes; default target is 1.5 on mobile.
- Avoid loading multiple animation engines for the same job.
- Test at 375, 768, 1024, and 1440px; verify landscape and 200% zoom.
- Validate keyboard flow, focus visibility, screen-reader labels, contrast, and
  `prefers-reduced-motion` before delivery.

