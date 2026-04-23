# Brand Assets

Logo files for the Cluos brand. The consuming LLMs (in downstream
repositories) read this folder directly — so **filenames matter**.

## Required filenames

Drop your SVG files into this folder using **exactly** these names:

| Filename                       | What it is                                      |
| ------------------------------ | ----------------------------------------------- |
| `cluos-logo-gradient.svg`      | Horizontal lockup (C + wordmark), brand gradient|
| `cluos-logo-teal.svg`          | Horizontal lockup, solid teal (#008080)         |
| `cluos-logo-navy.svg`          | Horizontal lockup, solid navy (#1B2F36)         |
| `cluos-logo-white.svg`         | Horizontal lockup, solid white                  |
| `cluos-logo-black.svg`         | Horizontal lockup, solid black (#1D1D1B)        |
| `cluos-symbol-gradient.svg`    | Symbol only (C-ripple), brand gradient          |
| `cluos-symbol-navy.svg`        | Symbol only, solid navy                         |
| `cluos-symbol-teal.svg`        | Symbol only, solid teal                         |
| `cluos-symbol-white.svg`       | Symbol only, solid white                        |
| `favicon.svg`                  | Square icon (symbol only, 32×32 viewBox ideal)  |

## Source files

The raw SVGs are in the Cluos Drive folder, subdirectory `SVG/`:
https://drive.google.com/drive/folders/1rdCIaQaynvDb80Tpb6Py0fhOIWnCHGjj

The source files there have generic names (`CLUOS_FINAL_SVG_Prancheta 1 cópia 8.svg`,
etc.). You must open them in a browser or vector editor and **rename
them to match the table above** based on what you see.

Mapping cues:
- If the SVG contains multiple `<linearGradient>` definitions with
	stops on `#1b2f36`, `#c8c1ae`, `#b5b5b5` → it's a **gradient** variant.
- If a solid `fill="#008080"` appears throughout → it's the **teal** variant.
- If fill is `#1b2f36` → **navy** variant.
- If fill is `#ffffff` → **white** variant.
- If fill is `#1d1d1b` or `#000000` → **black** variant.
- If the SVG shows only the circular ripple (no "CLUOS" text) → it's
	a **symbol** variant (not a full logo).
- If it shows both circle AND "CLUOS" text → it's a full **logo** variant.

## Export rules (if re-exporting from Illustrator / Figma)

- Format: SVG 1.1
- Styling: presentation attributes (not embedded CSS classes with `url(#id)`
	unless unavoidable for gradients)
- Responsive: yes — no fixed `width` / `height`, only `viewBox`
- Optimize: optional (svgo helps, but keep gradient stops intact)
- Do NOT embed raster images — pure vector only

## Usage rules

See `../DESIGN.md` §2 for the full decision table on which variant to
use in which context.