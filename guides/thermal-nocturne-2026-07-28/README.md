# CluOS Design System — Current

Canonical current snapshot of the CluOS Design System visual identity.

- Release: `2026.07.29`
- Direction: `Thermal Nocturne`
- Status: `current`

The page includes visual foundations, typography, the approved effects, component
states, form patterns, an operational queue, an orchestration console, an
accessible Agent Mesh, the Motion Library and the technology decision matrix.

## Typography

- **Manrope Lead** uses Manrope for display and Instrument Sans for interface and data.
- **Instrument Lead** uses Instrument Sans for display and interface, with Manrope for data.
- Manrope is limited to its 200–800 variable range; Instrument Sans is limited to
  its 400–700 variable range. The local WOFF2 files and their OFL license texts
  are in `assets/fonts/`.

## View

Open `index.html` directly in a browser, or serve the directory:

```bash
python3 -m http.server 4188 --bind 127.0.0.1 --directory outputs/cluos-design-system-current
```

Then visit `http://127.0.0.1:4188/`.

## Interaction

- Switch between dark and light appearance from the sticky navigation.
- Toggle reduced motion locally; the page also follows `prefers-reduced-motion`.
- Open the command palette with the **Comando** button or `/`.
- Resolve queue items and advance the orchestration gate to inspect feedback states.

## Motion Library

The eight reusable behaviors are Data rise, Progress trace, Spectral hover,
Surface lift, Queue resolve, Veil open, Flow draw and Agent pulse. Every
production chart must retain visible values and render its completed state when
motion is reduced; animation is never the only way to read a chart.

## Notes

- Official CluOS SVG assets are copied unchanged from the local design-system worktree.
- This directory is the canonical current design snapshot. The dated release remains available separately for historical reference.
- The implementation uses HTML, CSS custom properties, SVG, and dependency-free JavaScript.
- The content and hierarchy remain usable when JavaScript is disabled.
