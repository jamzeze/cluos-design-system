# Brand Assets

Drop the Cluos logo files into this folder using these exact filenames:

| Filename                     | Description                                     |
| ---------------------------- | ----------------------------------------------- |
| `cluos-logo-gradient.svg`    | Horizontal lockup, default gradient             |
| `cluos-logo-teal.svg`        | Horizontal lockup, solid teal                   |
| `cluos-logo-navy.svg`        | Horizontal lockup, solid navy                   |
| `cluos-logo-white.svg`       | Horizontal lockup, solid white                  |
| `cluos-symbol.svg`           | Symbol only (C-ripple), default navy            |
| `cluos-symbol-teal.svg`      | Symbol only, solid teal                         |
| `cluos-symbol-white.svg`     | Symbol only, solid white                        |
| `favicon.svg`                | Square, optimized for small sizes               |

## Export notes for the human operator

Source files are in the Cluos Drive folder:
https://drive.google.com/drive/folders/1rdCIaQaynvDb80Tpb6Py0fhOIWnCHGjj

Recommended export settings from the master `.eps`:
- Format: SVG 1.1
- Styling: presentation attributes (not embedded CSS)
- Responsive: yes (no fixed width/height, only viewBox)
- Minify: optional (tools like svgo help)
- Do NOT embed raster images — pure vector only

## Usage rules

See `../DESIGN.md` §2 for the full decision table on which variant to
use in which context.