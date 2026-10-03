Result: blocked

# design-critic: Fundamentos visuais (cluos-mms-v1), round 1

Target: `DESIGN-fundamentos-visuais.html`, branch `agent/cluos-design-system/fundamentos-visuais-20261003`, commit b2b24dc, level N2.
Reviewer: design-critic (independent, no edits made).

Score: 38/50, lowest dimension: Clareza de interacao 3/5 (tied with Acessibilidade 3/5 and Responsividade 3/5)
Bar: >= 42/50, no dimension below 4, zero open P0-P2. Not met: 3 dimensions at 3, 5 open P2.

## Evidence base

- Rendered with `render.mjs` at 1920, 1280, 768, 390, 375. No horizontal page overflow at any width (scrollWidth == clientWidth). Manrope and Instrument Sans loaded at every width. `hexCheck` empty (all 18 hex labels match the rendered chip and the data-hex).
- Viewed: laptop-1280 in full (12 crops), phone-390 (stitched sheets), single-page PDF raster (1440x8343 pt, 1 page, 1920 px layout) and the SoulClin reference raster. Structure parity with the reference holds: header with provenance legend, 01 to 07 in the same order, footer, same fields per section (swatch name/hex/token/role, 4 semantic columns, Amostra/Uso/Contraste/Veredito, style/family/celular/uso x sample, scale + layout + radius/stroke, base components, Faca/Evite).
- Measured in Chrome (`measure.mjs`): font-size histogram, focusable list, target sizes, real keyboard focus rendering, phone table geometry.
- Recomputed all 20 contrast ratios from the hex values: every figure on the page is correct (e.g. neutral 500/white 2.46 shown 2.5; tech green/white 1.53 shown 1.5; oxblood/navy 2.52 shown 2.5).
- Not done: tablet-768 and desktop-1920 PNGs were checked by overflow metrics only, not visually (the 1920 layout was seen through the PDF raster). The zoom crop of the dashed proposal markers was generated but not viewed (F6 is therefore marked unverified). Phone screenshots 4 and 5 of the stitched set repeat content because the last chunk clamps its scroll; that is a capture artifact, not a page defect, and was ignored.

## Identity test

1. Without logo and copy still CluOS? Mostly yes: Manrope Light display at -4.5% tracking, numerals hanging in medium blue, hairlines as structure, zero radius and shadow, tech green confined to specimens. The page chrome itself is monochrome navy, so identity lives in type and rules, not in color.
2. Attributable to 500 startups? No for the type and rule system; the 6-column swatch grid is generic by design, because the reference prescribes it.
3. Clear visual idea? Yes: "one document reads as the system it describes" (light type, hairlines, color only as specimen).
4. Positioning (command center / premium consulting)? Yes, restrained and technical.
5. Density matches task? Reading and verification of specs: yes on desktop, long on phone (about 19.6k px).
6. Brand in composition and details? Yes (section numeral + title grid, step numeral with hairline, operational navy block), not only the primary color.
7. Elements that exist because a model puts them there? None found: no decorative icons, no cards in cards, no gradients.

## Scores

| Dimension | Score | Evidence |
|---|---|---|
| Distincao de marca | 4 | Type, hairlines, zero radius/shadow, color only as specimen. Header has no brand moment beyond type; lockup appears only inside the `lockup` type row. |
| Hierarquia | 4 | H1 60 px, H2 48 px with 36 px hanging numeral, 16 px semibold subheads. Failing contrast rows are distinguished only by red verdict text; the 06 section has no sub-grouping (buttons, links, fields, step, quote, surface) other than captions. |
| Composicao | 4 | Grids 6 -> 3 -> 2, Escala beside Layout, type rows as meta | sample. Dead area under "Escala" at 1280 (about 400 px); bar placement inconsistent (F7, F8). |
| Tipografia | 4 | Manrope + Instrument Sans, scale and weight carry hierarchy. 12 px is 32% of all characters (3676 of about 11.6k), including the core type specs, contradicting the page's own `miudo` 14/22 (F5). |
| Densidade | 4 | Airy by reference design; type rows are 150 px tall for a 14 px sample (`botao`, `miudo`); phone length. Intentional, not wrong. |
| Disciplina de tokens | 4 | No stray hex; everything through `var(--cluos-*)`; one declared doc-local property (`--doc-proposta-neutral-700`). Literals remain (font-weight 300/450/650, letter-spacing -.045em/.11em/.12em, `clamp()`), and the chrome consumes primitives (`--cluos-medium-blue`, `--cluos-deep-navy`, `--cluos-tech-green`) while section 02 says to use the `color-*` roles (F10). |
| Economia de componentes | 5 | No card nesting; one bordered container (the field group); hairlines, alignment and type do the separation; no decorative icons. |
| Clareza de interacao | 3 | Hover/focus specimens are explicit (`.is-hover`, `.is-focus`, `tabindex=-1`), checkbox and error states are clear. But real keyboard focus on the primary button is invisible (F1) and the provenance key is incomplete (F4). |
| Acessibilidade | 3 | Page text is AA everywhere (navy/medium blue on white 14.3 to 19.3:1), lang pt-BR, header/main/footer, label/legend, `aria-invalid` + `aria-describedby`, state = text + marker. Fails: F1 (focus 1.0:1 on primary), F3 (scroll region not keyboard-reachable), F2 (verdict unreadable on phone), F9 (aria-label on role-less elements). |
| Responsividade/adaptacao | 3 | No overflow at 1920/1280/768/390/375; grids and single column adapt as the contract says. But the Veredito column is entirely off-screen on phones with no cue (F2) and identifiers break mid-hyphen in the layout table (F11). Tablet not visually reviewed. |

Total: 4+4+4+4+4+4+5+3+3+3 = 38/50.

## Findings

### F1. P2. Tokens on main. Focus ring invisible on the primary button, faint elsewhere
- Evidence: `--cluos-ring-focus: 0 0 0 2px #C4DB7B`. Real keyboard focus on this page (screenshots in scratchpad `measure-out/focus-*.png`): on `.button--primary` the ring is indistinguishable from the unfocused button (1.0:1); on white, link, secondary button, input, checkbox and ghost button the ring is visible but 1.53:1. The page documents this honestly (contrast table rows 1,5:1 and 1,0:1, caption on the focus specimen, "Pendencias abertas" note), and the specimen `.is-focus` renders the real state.
- Page contribution: `DESIGN-fundamentos-visuais.html` `:focus-visible { outline: none; box-shadow: var(--cluos-ring-focus); }` removes the browser outline, so there is no fallback indicator. This mirrors the canonical rule and is not a page-only choice.
- Impact: keyboard users cannot see where they are on the four page buttons; fails WCAG 1.4.11 / 2.4.7 in practice.
- Fix: not in this page's scope. Rafael's decision on the focus colour (candidate already on file: inner tech-green ring plus outer deep-navy ring, which keeps tech green). Until decided or an exception is recorded by Rafael, this stays open and blocks under the rubric. The critic cannot grant the exception.
- Status: known blocker F1 from main; rated P2 here.

### F2. P2. Page layout. Verdict column unreadable on phones
- Evidence: at 375 and 390 px `.contrast` has `min-width: 648px` inside `.table-wrap` (clientWidth 343). The `Veredito` header sits at x=444..664 of a 375 px viewport, so the pass/fail column (and the red "Reprovado" text) is entirely off-screen, with no shadow, fade or hint that the table scrolls. Row "Neutral 500 sobre white 2,5:1" shows no verdict on a phone. Contract: "tabelas com rolagem propria", satisfied literally, but the page's main purpose (where it passes or fails) is hidden.
- Impact: on the device class that the contract calls out, the most important column is invisible.
- Fix: in `@media (max-width: 48rem)` for `.contrast`, drop `min-width` and render each row as a block (sample + title, then ratio and verdict on one line), or at minimum merge Contraste and Veredito into one cell. File: `DESIGN-fundamentos-visuais.html` `.contrast`, `.table-wrap`, `@media (max-width: 48rem)`.

### F3. P2. Page chrome. Scrollable table region has no keyboard access or name
- Evidence: `.table-wrap` (contrast table) scrolls (scrollWidth 648 > clientWidth 343 at 375) and has `tabindex`, `role` and `aria-label` all null.
- Impact: keyboard-only users in browsers that do not make scrollers focusable cannot reach hidden columns (WCAG 2.1.1). Resolves automatically if F2 is fixed by stacking; if horizontal scroll stays, this is required.
- Fix: `<div class="table-wrap" tabindex="0" role="region" aria-label="Tabela de contraste">` (same for the layout table).

### F4. P2. Page chrome. Provenance key is incomplete and inconsistently applied
- Evidence: the header legend defines only the dashed swatch. The vertical bar is used on 5 type rows (`titulo-tela`, `citacao`, `assinatura`, `numeral`, `rotulo-campo`) and 4 layout rows (`gutter`, `bloco`, `toque-min`, `campo-altura`) but is explained only by a note after the last type row (and nowhere near the layout table). `.legend__mark--bar` is defined (line 68) and never used, so the legend item was dropped. Other proposals (Neutral 700 row in the contrast table, ghost button, resting field) are marked only with the word "(proposta)", not with either mark.
- Impact: the legend is the page's provenance contract ("definido" vs "proposta"); a reader cannot decode the bars from the top of the page.
- Fix: add a third legend item with `.legend__mark--bar` ("Barra: estilo ou medida proposta"); repeat the one-line note under the layout table; mark the Neutral 700 contrast row with the same bar or dashed sample.

### F5. P3. Page chrome. 12 px for a third of the text
- Evidence: font histogram at 1280: 12 px = 3676 chars of about 11.6k. Used for `.caption`, `.type-meta p` (the spec lines that are the content of section 04), `th`, `.use__sub`, token names. The page documents `miudo` as 14/22 for "notas e descricoes".
- Impact: contrast is fine (medium blue 14.3:1) and no WCAG minimum applies, but the page does not follow the scale it teaches.
- Fix: raise `.caption` and `.type-meta p` to `--cluos-text-sm`; keep `--cluos-text-xs` for eyebrow, token names and descriptor.

### F6. P3. Page chrome. Dashed proposal marker may vanish on dark chips (unverified)
- Evidence: `.swatch--proposal .swatch__chip` and `.role--proposal .role__chip` use `thin dashed var(--cluos-medium-blue)`; proposed chips are mid/dark (neutral-700 #666666, oxblood, deep teal), where a 1 px medium-blue dash is faint in the 1x render. Zoom crop was not viewed.
- Fix: 2 px dashed, or dashed in white over dark chips.

### F7. P3. Page chrome. Bar placement differs between type rows and layout table
- Evidence: `.type-row--proposal::before` hangs the bar 12 px into the left margin; `.layout tr.is-proposal td:first-child` draws it inside the cell and adds `padding-left`, shifting names (`gutter`, `bloco`, `toque-min`, `campo-altura`) 12 px right of their neighbours.
- Fix: hang the bar outside the first column in the table too.

### F8. P3. Page chrome. Dead area in section 05
- Evidence: at 1280 the "Escala" column ends about 400 px above the end of the Layout table.
- Fix: optional; move "Raio e espessura" under Escala or shorten the layout descriptions.

### F9. P3. Page chrome. ARIA and navigation details
- `aria-label` on role-less `div.legend` and `p.type-sample.t-numeral` is ignored (give `role="group"` / `role="img"`, or remove). No skip link or in-page index on an 11k px (phone 19.6k px) document; seven section anchors would help. Footer reads "cluos-mms-v1 · v1 · 03/10/2026" (duplicate "v1").

### F10. P3. Page chrome. Chrome uses primitives while section 02 says to use roles
- Evidence: e.g. `.eyebrow`, `.section__num`, `.scale__bar` (`--cluos-deep-navy`), `.ops h3 span` (`--cluos-tech-green`) use primitives, whereas the page's own note says the `color-*` roles are the layer new components consume.
- Fix: switch the chrome to `--cluos-color-*` roles where an equivalent exists.

### F11. P3. Page chrome. Identifiers break mid-hyphen on phones
- Evidence: at 375/390 the layout table first column (`width: 28%`) wraps `container-/wide`, `topnav-/altura`, `campo-/altura`; subtitle wraps `cluos-/mms-v1`.
- Fix: `.layout td:first-child { min-width: 9ch; overflow-wrap: normal }` or a non-breaking hyphen.

## Not findings (checked and accepted as deliberate)

- Documented failures on main (text-subtle #A5A5A5 2.5:1, copper 3.5:1, status success 3.7:1, operational teal 3.1:1, oxblood on navy 2.5:1, tech green ring 1.5:1 / 1.0:1): all ratios verified correct, labelled with an explicit verdict, and none of these colors is used as readable text in the page chrome. Open on main, outside this diff.
- The `→` glyph falls back to the system font: declared, cosmetic.
- JetBrains Mono falls back to the system monospace: declared in the page note.
- Proposal values (neutral 700, field border, error border, ghost in deep teal) stay in the page-local `--doc-proposta-neutral-700` and dashed/bar marks, not in `tokens/*`.

## Verdict

Result: blocked.

Attribution summary: page chrome/layout = F2, F3, F4 (P2) and F5 to F11 (P3); tokens on main = F1 (P2, needs Rafael).

Next action for frontend-craftsman: fix F2, F3, F4 (and F5, F7, F11 if cheap), re-render at 375/390/768/1280/1920, and append round 2 to this file. F1 needs Rafael's decision or a recorded exception; without it the page cannot reach passed even when the page-level findings are closed. Round 2 should also visually review tablet-768 and 1920, which this round covered by metrics and PDF raster only.
