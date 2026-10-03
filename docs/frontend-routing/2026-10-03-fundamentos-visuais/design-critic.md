Result: passed (round 3, F1 excepted for this page; rounds 1–2 blocked, kept below)

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

---

# Round 2

Result: blocked

Target: `DESIGN-fundamentos-visuais.html`, branch `agent/cluos-design-system/fundamentos-visuais-20261003`, commit 6f14e58, level N2. Reviewer: design-critic (independent, no edits made). Round 1 above is unchanged.

Score: 40/50, lowest dimension: Clareza de interacao 3/5 (tied with Acessibilidade 3/5)
Bar: >= 42/50, no dimension below 4, zero open P0-P2. Not met: two dimensions at 3 (Clareza de interacao from F1 on main + N1 on the page; Acessibilidade from F1 on main), one new open page P2 (N1).

## Evidence base (round 2)

- Rendered with `render.mjs` at 1920, 1280, 768, 390, 375. No horizontal page overflow at any width (scrollWidth == clientWidth, hscroll 0). Manrope and Instrument Sans loaded at every width. `hexCheck` empty.
- Viewed this round: desktop-1920 in full (4 segments at 0.5x), laptop-1280 header + 01, section 05, section 06 (full resolution), tablet-768 header/01, 02, 03 (whole contrast list), 04, 05, 06 (visual review that round 1 skipped), phone-375 header, 03, 04, 05, 06, 07 and footer, plus 4x zooms of the Neutral 700 sample (768 and 375) and of the layout `gutter` row (1280). phone-390 by metrics only (no overflow, wraps identical to 375 minus the 12 px scroll).
- Measured in Chrome (`measure2.mjs`, scratchpad): font-size histogram, `.table-wrap` attributes at five widths, stacked-row geometry at 375 and 768, computed outline and pseudo-element boxes, legend and footer text, real `:focus-visible` on primary, ghost and the new regions.
- Not done: no screen reader or Safari/VoiceOver pass over the re-displayed tables (see N4); desktop widths between 768 and 1280 (for example 1024) were not rendered.

## Identity test (re-run)

1. Without logo and copy still CluOS? Yes: Manrope Light display at tight tracking, hung light-weight numerals, hairlines, zero radius and shadow, tech green only as specimen. Chrome is now fully role-based (`--cluos-color-*`).
2. Attributable to 500 startups? No.
3. Clear visual idea? Yes: the document reads as the system it describes.
4. Positioning (command center / premium consulting)? Yes, restrained.
5. Density matches task? Desktop yes. Tablet 768 is as long as a phone (19.6k px) because it takes the phone treatments (N2).
6. Brand in composition and details? Yes (section numeral grid, step numeral with hairline, operational navy block).
7. Elements a model puts there by habit? None. At 1920 the content is a centered 1152 px column with about 380 px of white each side, no stretching.

## Round-1 findings: status

| ID | Round 1 | Round 2 | Evidence |
|---|---|---|---|
| F1 | P2, tokens on main | OPEN, P2, tokens on main, needs Rafael | `--cluos-ring-focus` unchanged: `rgb(196,219,123) 0 0 0 2px` on `.button--primary` (1.0:1), `.button--ghost` and now on the two `.table-wrap` regions (1.5:1). Page still documents it honestly (rows 1,5:1 and 1,0:1, caption on the focus specimen, "Pendencias abertas"). Not a page defect; cannot be closed by the critic. The two new focus stops inherit it (see N4). |
| F2 | P2 | CLOSED | At 375/390/768 `.contrast tr` is a grid: sample (80 px) beside title, then "Contraste 19,3:1" and "Veredito: Aprovado" lines. Verified in render (P1.png, T2.png): the red "Reprovado para texto; so contexto desabilitado" is fully readable on a phone, wraps to two lines at 375. Wrap scrollWidth == clientWidth (343/343), so there is no hidden column. Thead is visually hidden (1x1, `clip-path: inset(50%)`). |
| F3 | P2 | CLOSED | Both `.table-wrap` have `role="region"`, `aria-label` ("Tabela de contraste", "Tabela de layout") and `tabindex="0"` at every width; real focus lands on the region. See N4 for the side effect. |
| F4 | P2 | CLOSED except the layout table, reopened as N1 | Legend has the third item with `.legend__mark--bar` at 1920, 1280, 768, 375. Note repeated under the layout table (exists in render). Neutral 700 contrast sample has the dashed mark (T2.png). Ghost and resting-field captions carry the bar (L_comp.png, P3.png). The layout-table bars are not rendered (N1), so the note under the table points at a mark the reader cannot see. |
| F5 | P3 | CLOSED | 12 px is now 972 of 11,780 characters (8%) versus 3,676 of about 11.6k (32%) in round 1. `.caption`, `.type-meta p`, `.use__sub` and legend text render at 14 px; the spec lines in section 04 now match the `miudo` 14/22 they describe. |
| F6 | P3, unverified | CLOSED | `.swatch--proposal .swatch__chip` and `.role--proposal .role__chip`: `outline: dashed 2px rgb(19,41,82)`, offset 4 px / 2 px, outside the chip. Visible on the dark Neutral 700 chip, on the three small role chips (campo, campo-erro, ghost-texto) and in the legend at 1920, 1280, 768, 375. One clipping case at <= 48rem, folded into N1. |
| F7 | P3 | PARTLY CLOSED, folded into N1 | Type rows and the two captions share one rule (`left: -12px`, 2 px, `color-border-strong`) and align at 1920/1280/768/375. The layout-table bars use the same rule but are clipped by `.table-wrap` (N1). |
| F8 | P3 | OPEN, P3, accepted by author | "Raio e espessura" stays a full-width block under Escala/Layout. At 1280 and 1920 the Escala column ends about 470 px above the end of the Layout table (L_layout.png). Reference parity is a valid reason; it is a composition cost, not a blocker. |
| F9 | P3 | CLOSED (index declined, accepted) | `.legend` has `role="group"` + label; the `aria-label` on the numeral is gone (ariaMisuse list empty at all widths); footer reads "CluOS Design System . cluos-mms-v1 . 03/10/2026" (no duplicate "v1"). No in-page index or skip link on a 19.6k px phone document: accepted because the reference has none; `header/main/footer` and the heading outline remain the navigation. |
| F10 | P3 | CLOSED | Chrome now uses `--cluos-color-*` roles; the remaining primitive references in the stylesheet are specimens (buttons, field, error) plus `.verdict--fail { color: var(--cluos-status-error) }`, a chrome rule that could use `--cluos-color-status-danger`. Nit, not a finding. |
| F11 | P3 | CLOSED, with a side effect (N3) | Identifiers are `white-space: nowrap` on <= 48rem (computed on all 14 first cells); no `container-/wide` breaks. Subtitle token `cluos-mms-v1` is `.nowrap` and wraps as a unit at 375 (P1.png). |

## Scores (round 2)

| Dimension | Score | Evidence |
|---|---|---|
| Distincao de marca | 4 | Unchanged. Identity lives in type and rules; the header still has no brand moment beyond type. |
| Hierarquia | 4 | H1 60/44 px, H2 48 px with hung numeral. "Veredito: Reprovado" in red now sits on its own line next to its ratio, so failures read faster on phones. Section 06 still has no sub-grouping other than captions. |
| Composicao | 4 | Grid 6 -> 2 and type meta / sample hold at all widths; 1920 is a clean centered column. Held back by F8 (470 px dead area) and by N1 (layout-row provenance missing). |
| Tipografia | 5 | F5 closed: spec text is 14 px, 12 px kept for eyebrow, token names and descriptors. No mid-word or mid-hyphen breaks at 375. Declared fallbacks (JetBrains Mono, arrow glyph) are documented on the page. |
| Densidade | 4 | Airy by reference. Tablet 768 is 19.6k px tall (N2); layout table on phone is squeezed (N3). |
| Disciplina de tokens | 4 | No stray hex, chrome on roles. Literals remain: font-weight 300/450/650, letter-spacing -.045em/.11em/.12em, `clamp()`, two `!important` on `.contrast td`. One doc-local property family (`--doc-*`) declared. |
| Economia de componentes | 5 | No card nesting, no icons, one bordered container (the field group). The added legend item and note reuse existing marks. |
| Clareza de interacao | 3 | Hover and focus specimens are explicit, but real keyboard focus on the primary button is invisible (F1, main), and the proposal bar is missing in the layout table (N1) although the legend and the note promise it. |
| Acessibilidade | 3 | Page-level items closed (F2, F3, F9): AA text, named focusable regions, group role, no ARIA misuse. F1 remains a WCAG 2.4.7 / 1.4.11 failure in practice; table semantics under `display:grid` are unverified (N4). |
| Responsividade/adaptacao | 4 | No overflow at 1920/1280/768/390/375; the verdict is reachable on phones; tablet reviewed visually this round. Costs: tablet takes phone treatments (N2) and the layout table squeezes the description column (N3). |

Total: 4+4+4+5+4+4+5+3+3+4 = 40/50.

## New findings (round 2)

### N1. P2. Page chrome. Proposal marks drawn outside `.table-wrap` are clipped
- Evidence: `.table-wrap { overflow-x: auto }` (line 102) clips at its padding box. `.layout tr.is-proposal td:first-child::before` is positioned at `left: -12px` (computed `-12px`, 2 px, `rgb(19,41,82)`), but the first cell's left edge equals the wrap's left edge (x = 546 at 1280, x = 16 at 768/375), so the whole bar is outside the scrollport. Rendered at 1280, 768 and 375: `gutter`, `bloco`, `toque-min`, `campo-altura` show no bar (L_layout.png, T3.png, P2.png; 4x zoom of the `gutter` row is empty). Same cause, second symptom: at <= 48rem the stacked contrast rows put the sample at the wrap's left edge, so the left side of the dashed 2 px outline on the Neutral 700 sample is clipped (top, bottom and right edges show; left is missing at 768 and 375, confirmed at 4x). On desktop the table cell padding hides this.
- Impact: the legend ("Barra a esquerda: estilo, medida ou componente proposto") and the note under the table ("Barra a esquerda = medida proposta...") describe a mark that is not there. A reader cannot tell the four proposed layout measures from the contract ones, which is the exact failure F4 was meant to fix and F7 claimed to close. It is a regression from the F7 change: in round 1 the layout bars rendered inside the cell (with `padding-left`); hanging them at -12px moved them outside the `overflow-x: auto` scrollport. The type rows and captions are fine because they are not inside a wrap.
- Fix: give the wrap room for the hung marks, for example `.table-wrap { padding-left: var(--cluos-space-3); margin-left: calc(-1 * var(--cluos-space-3)); }` (keeps first-column text aligned with its neighbours, puts the 12 px gutter inside the scrollport, also restores the dashed outline's left edge). Alternative: draw the bar at `left: 0` and give every `.layout td:first-child` the same `padding-left` so names stay aligned. File: `DESIGN-fundamentos-visuais.html` `.table-wrap`, `.layout tr.is-proposal td:first-child::before`, the contrast sample outline.
- Attribution: page chrome.

### N2. P3. Page layout. Tablet portrait takes the phone treatments
- Evidence: the single breakpoint is `max-width: 48rem`, which includes exactly 768 px. At 768 the swatches are 2 columns of 355 x 236 px chips (T1.png), the semantic roles are one list, and the contrast table is stacked at 134 px per row although `.contrast` needs only 648 px and the wrap is 736 px. Section heights at 768 versus 1920: 01 3,904 vs 1,295 px; 02 2,183 vs 866; 03 3,228 vs 1,883; total 19,601 vs 11,420 px.
- Impact: not broken, but a tablet reader scrolls as far as a phone reader and sees large chips; the contract's tablet step is not really a step.
- Fix: stack `.contrast` only below about 43.75rem (it fits above that), consider 3 swatch columns at 768, keep `max-width: 48rem` for the rest. Not rendered: 1024 px.

### N3. P3. Page chrome. Layout table squeezes the description column on phones
- Evidence: the F11 fix sets columns 1 and 2 to `nowrap`. At 375 the description column is 256..371 px (115 px wide) and wraps to 9 lines: the `gutter` row is 204 px tall, `toque-min` 204 px, `margem` 137 px, with one or two words per line (P2.png). The table is 355 px wide in a 343 px wrap, so it also scrolls 12 px sideways for no content. At 390 the wrap fits (358/358), so the problem is mostly 375 and smaller.
- Fix: apply the stacking used for the contrast table to `.layout` at <= 48rem (name and value on one line, description below), or let the value cell wrap (`white-space: normal`) and keep only the identifier `nowrap`.

### N4. P3. Page chrome. Re-displayed tables and always-focusable regions
- Evidence: `.contrast tr` is `display: grid` and `td` is `display: block`, with no `role` attributes (grep: no `role="table|row|cell"`). Some browser and assistive-tech combinations (Safari with VoiceOver historically) lose the table role when table elements get a non-table display; not verified here. Separately, both regions are `tabindex="0"` at every width although only the layout table at 375 scrolls (12 px); on all other widths they are two extra tab stops whose focus ring is the 1.5:1 tech green from F1, so focus is almost not visible there.
- Fix: verify with VoiceOver; if the semantics are lost, add `role="table"`, `rowgroup`, `row`, `cell`, `columnheader` in markup, or accept the loss since the stacked rows already read as labelled lines. Optionally set `tabindex` only when `scrollWidth > clientWidth` (small script), or remove it once N3 removes the 12 px scroll.

## Not findings (round 2)

- Documented failures on main (text-subtle 2.5:1, copper 3.5:1, status success 3.7:1, operational teal 3.1:1, tech green ring 1.5:1 / 1.0:1, oxblood on navy 2.5:1): unchanged, verified correct in round 1, labelled with an explicit verdict.
- The stacked "Contraste" and "Veredito:" labels come from `data-label` through `::before`; no layout shift, no hex change.
- JetBrains Mono and the arrow glyph fall back to system fonts: declared on the page.

## Verdict (round 2)

Result: blocked.

Open P2: N1 (page chrome) and F1 (tokens on main, needs Rafael's focus-colour decision or recorded exception). Open P3: F8 (accepted by author), N2, N3, N4.

Attribution summary: page chrome/layout = N1 (P2), N2, N3, N4 (P3), F8 (P3, accepted); tokens on main = F1 (P2).

Next action for frontend-craftsman: fix N1 (one rule on `.table-wrap` closes both symptoms), re-render at 1280/768/375 and confirm the four layout rows and the Neutral 700 outline show their marks; N3 and N2 are cheap and worth doing in the same pass. Conditions for `passed` in round 3: N1 closed; Rafael decides F1 or records an exception; Clareza de interacao and Acessibilidade both reach 4 (no dimension below 4); total at least 42/50. Without the F1 decision the page cannot pass even if every page finding is closed.

Process note: the first append attempt of this section was blocked by the PreToolUse guard as destructive SQL (gate 3) because the prose contained the phrase for removing a database table. No SQL was run; the wording was changed and the section was appended once.

---

# Round 3

Result: passed

F1 is counted as excepted for this page, per the recorded exception (see Verdict).

Target: `DESIGN-fundamentos-visuais.html`, branch `agent/cluos-design-system/fundamentos-visuais-20261003`, commit c2b7490, level N2. Reviewer: design-critic (independent, no edits made). Rounds 1 and 2 above are unchanged; the `Result:` on line 1 of this file is the round-1 verdict and is superseded by this section.

Score: 43/50, lowest dimension: 4/5 (Distincao de marca, Hierarquia, Composicao, Densidade, Disciplina de tokens, Clareza de interacao, Acessibilidade)
Bar: >= 42/50, no dimension below 4, zero open P0-P2, with F1 excepted. Met. Without the F1 exception the page would not pass (see Verdict).

## Evidence base (round 3)

- Rendered with `render2.mjs` at 1920, 1280, 768, 390, 375 (twice, identical): scrollWidth == clientWidth at all five, `overflow` list empty (including the check for elements outside `.table-wrap`), `hexCheck` empty, Manrope and Instrument Sans loaded. Heights: 1920 11,452 px; 1280 11,452; 768 14,421 (was 19,601 in round 2); 390 21,220; 375 21,345.
- Extra widths, measured in Chrome (`measure3.mjs`, scratchpad): 320, 360, 767, 768, 800, 1024 all without horizontal overflow. 767 gives the stacked grid and 2 swatch columns; 768, 800 and 1024 give the table layout and 3 swatch columns. 768, 800 and 1024 are therefore in the tablet treatment; 800 and 1024 were checked by computed layout only, not viewed.
- Viewed at 2x: layout table at 1280, 768 and 375; Neutral 700 sample at 1280, 768 and 375 (side by side at 4x); contrast list at 768 (unstacked) and 375 (stacked); swatches at 768; tablet-768 full page in strips (header, 01, 04 tail, 05, 06); PDF page raster (header to 03, and 05 to footer).
- Measured: `.table-wrap` attributes and overflow at 1280, 768, 375; computed `::before` of the four proposal rows and every ancestor with non-visible overflow; computed outline of `.sample--proposal`; Chrome accessibility tree (role counts) at 375 and 1280; real Tab sequence at 1280.
- Not done: no Safari or VoiceOver pass; 800 and 1024 not viewed; phone-390 by metrics only (same wraps as 375 with 15 px more width); PDF checked by raster of the structure, not diffed against the browser render.

## Identity test (re-run)

1. Without logo and copy still CluOS? Yes: Manrope Light display at tight tracking, hung light numerals, hairlines, zero radius and shadow, tech green only as specimen.
2. Attributable to 500 startups? No.
3. Clear visual idea? Yes: the document reads as the system it describes.
4. Positioning (command center / premium consulting)? Yes, restrained and technical.
5. Density matches task? Yes on desktop and tablet (the tablet is a real intermediate step now). Phone is long (21.3k px at 375), see Not findings.
6. Brand in composition and details? Yes (section numeral grid, step numeral with hairline, operational navy block).
7. Elements a model puts there by habit? None found.

## Open findings: status

| ID | Round 2 | Round 3 | Evidence |
|---|---|---|---|
| F1 | P2, tokens on main | EXCEPTED (page-scoped), not fixed, still attributed to main | `docs/frontend-routing/2026-10-03-fundamentos-visuais/exception-focus-ring.md`, added in commit c2b7490 (author jamzeze, the author session), quoting Rafael's 2026-10-03 answer "Excecao so para esta pagina". The critic relies on that record and did not witness the decision. Scope is this HTML and its PDF only; `--cluos-ring-focus` stays canonical on main; the brand decision on the focus colour stays open. The page still documents the failure as it is (contrast rows "Tech green sobre white 1,5:1 Reprovado como anel de foco", "Tech green sobre tech green 1,0:1 Reprovado", caption on the focus specimen "anel 2 px tech green: 1,0:1 sobre o botao"). The exception does not extend to any product surface. |
| N1 | P2 | CLOSED | `.table-wrap` has `overflow-x: visible` at 1280, 768 and 375 (scrollWidth == clientWidth 1152/720/343). Computed `::before` of `gutter`, `bloco`, `toque-min`, `campo-altura`: `left: -12px`, 2 px, `rgb(19,41,82)`, and the ancestor list with non-visible overflow is empty for all four at all three widths. Rendered: the four bars are visible at 1280 (hung left of the hairlines, aligned with the type-row bars), 768 and 375 (layout-1280/768/375.png). Neutral 700 sample: `outline: rgb(19,41,82) dashed 2px`, offset 4 px, no clipping ancestor; all four edges visible at 1280, 768, 375 at 4x (n700-sheet.png) and in the 768 swatch grid. The legend and the note under the layout table now point at a mark the reader can see. |
| N2 | P3 | CLOSED | Breakpoint is `max-width: 47.99rem`. 767 px: stacked contrast grid, 2 swatch columns. 768 px: `tr` is `table-row`, 3 swatch columns, contrast table with four columns (Amostra, Uso, Contraste, Veredito), the failing verdict "Reprovado para texto; so contexto desabilitado" readable in column 4; section 02 viewed at 768 (roles-768.png): two columns of role lists (Fundo and Texto above, Borda and Acao below), dashed marks on campo, campo-erro and ghost-texto complete. Height at 768 fell from 19,601 to 14,421 px. |
| N3 | P3 | CLOSED | At 375 `.layout tr` is a grid: name left, value right on one line, description full width below. Rows are 74 px (96 px with a two-line description) against 204 px for `gutter` and `toque-min` in round 2. Wrap 343/343, no sideways scroll. Viewed at 2x. |
| N4 | P3 | CLOSED in Chrome; Safari/VoiceOver not run | Both tables carry `role="table"`, `rowgroup`, `row`, `columnheader`, `cell` in the markup. Chrome accessibility tree at 375 (stacked) and 1280 gives identical counts: 2 tables, 36 rows (22 + 14), 126 cells (84 + 42), 4 columnheaders, 3 rowgroups. The two `.table-wrap` have no `tabindex`, `role` or `aria-label` at any width (extra tab stops gone). Real Tab sequence at 1280: 4 buttons, 2 text links, 6 inputs, then out of the document; nothing lands on a table wrapper. Residual risk: role-based semantics under `display: grid` unverified in VoiceOver. |
| F8 | P3, accepted | OPEN, P3, accepted by author | At 1280 and 1920 (PDF raster) the Escala column still ends roughly 420 to 470 px above the end of the Layout table. Reference parity is a valid reason; composition cost only. At 768 and below the two stack, so there is no dead area. |

Also verified from the round-2 follow-ups: section 04 intro (line 442) reads "Pesos 300, 400, 550 e 650 (450 so no descritor do lockup); nunca 700 ou mais", the `lockup` row spells "Instrument Sans 450 . 12 . 12%", and `DESIGN.md` line 33 lists 450 only for the `Marketing Studio` descriptor. PDF: `docs/fundamentos-visuais/cluos-fundamentos-visuais.pdf`, 1 page, 1920 x 11454 pt; raster shows the centered 1152 column, the three-item legend, the dashed Neutral 700 outline with all edges, the four layout bars and the two caption bars, sections 01 to 07 in order and the footer.

## Scores (round 3)

| Dimension | Score | Evidence |
|---|---|---|
| Distincao de marca | 4 | Unchanged. Identity lives in type, hairlines, zero radius and shadow; the header has no brand moment beyond type. |
| Hierarquia | 4 | H1 60/44 px, H2 48 px with hung numeral; failing verdicts in red on their own line on phones. Section 06 still has no sub-grouping other than captions. |
| Composicao | 4 | Grids 6 -> 3 -> 2 now hold at 1920/1280/768/375 with a true tablet step; provenance bars align between type rows, layout rows and captions. Held back by F8 (accepted) and N5. |
| Tipografia | 5 | Spec text 14 px, 12 px only for eyebrow, token names, descriptor; no mid-word or mid-hyphen breaks at 375; the weights note now matches DESIGN.md and the lockup row. |
| Densidade | 4 | Airy by reference; tablet now 14.4k px instead of 19.6k. Phone is 21.3k px and type rows stay about 150 px for a 14 px sample. Intentional, not wrong. |
| Disciplina de tokens | 4 | No stray hex, chrome on `--cluos-color-*` roles, one doc-local property family. Literals remain: weights 300/450/650, tracking -.045em/.11em/.12em, `clamp()`, and `!important` on `.contrast td` and `.layout td` widths. |
| Economia de componentes | 5 | No card nesting, no icons, one bordered container (the field group); the wrappers and tab stops that added nothing were removed. |
| Clareza de interacao | 4 | Provenance marks (dashed, bar) are all visible and decoded by the legend; hover and focus specimens explicit; no spurious tab stops. Capped at 4 by F1: real keyboard focus on `.button--primary` is still invisible (1.0:1). With the page-scoped exception recorded, this is a documented, excepted limit. Would be 3 if the exception were revoked. |
| Acessibilidade | 4 | AA text everywhere (navy/medium blue on white 14.3 to 19.3:1), `lang="pt-BR"`, header/main/footer, label/legend, `aria-invalid` + `aria-describedby`, state = text + marker, explicit table roles preserved in the accessibility tree, no ARIA misuse, no unnecessary focus stops. Capped at 4 by F1 (WCAG 2.4.7 / 1.4.11 in practice) and by the unrun VoiceOver check. Would be 3 if the exception were revoked. |
| Responsividade/adaptacao | 5 | No overflow at 320, 360, 375, 390, 767, 768, 800, 1024, 1280, 1920. Both tables stack with nothing hidden or scrolling; tablet takes the intermediate treatment; the verdict and the proposal marks are visible at every width; the PDF keeps the desktop layout. |

Total: 4+4+4+5+4+4+5+4+4+5 = 43/50.

## New findings (round 3)

### N5. P3. Page chrome. Type spec lines wrap at the separator at 768
- Evidence: now that 768 px takes the two-column type rows (N2 fix), the narrow meta column wraps spec lines at the separator and leaves the size alone on the next line: `miudo`, `menu` and `codigo` read "Instrument Sans Regular 400 . / 14/22" and "JetBrains Mono Regular 400 . / 14/22" (tablet-768 strip, section 04). Readable, but the spec is the content of the section.
- Impact: cosmetic, only between 768 and about 900 px.
- Fix: bind the tail with non-breaking spaces ("400&nbsp;&middot;&nbsp;14/22") or wrap `size/leading` in the `.nowrap` span the page already uses, or widen the meta column in the `max-width: 64rem` block. File: `DESIGN-fundamentos-visuais.html` `.type-meta p` and the type-row grid.
- Attribution: page chrome. Does not block.

## Not findings (round 3)

- At 375 the proposal bar sits 4 px from the viewport edge and the dashed outline 10 px: visible, not clipped (no ancestor with non-visible overflow). Noted, no action.
- Phone length rose from about 19.6k to 21.3k px at 375 because the stacked layout rows replaced a squeezed table; the trade (readable rows, no sideways scroll) is the right one.
- Explicit `role="table"` on a native `<table>` is redundant in browsers that keep the native role; harmless and intended for the `display: grid` case.
- Documented failures on main (text-subtle 2.5:1, copper 3.5:1, status success 3.7:1, operational teal 3.1:1, tech green ring 1.5:1 / 1.0:1, oxblood on navy 2.5:1): unchanged, verified correct in round 1, each labelled with a verdict on the page.
- JetBrains Mono and the arrow glyph fall back to system fonts: declared on the page.

## Verdict (round 3)

Result: passed.

Score 43/50, no dimension below 4, zero open P0-P2 once F1 is excepted. Open: F8 (P3, accepted by author) and N5 (P3, cosmetic). Closed this round: N1, N2, N3, N4.

F1 handling: the author session recorded Rafael's page-scoped exception of 2026-10-03 in `exception-focus-ring.md` (commit c2b7490); the critic relies on that record. F1 remains a defect in `--cluos-ring-focus` on main (tech green 2 px, 1.5:1 on white, 1.0:1 on the primary button); it is not fixed and the exception covers only this HTML and its PDF. The pass depends on that exception: if it were revoked, F1 returns as an open P2 and Clareza de interacao and Acessibilidade fall to 3, so the page would be blocked again.

Attribution summary: page chrome/layout = N5 (P3), F8 (P3, accepted); tokens on main = F1 (excepted, not fixed).

Next action: none required to merge this page. Optional, in the same file: N5. Separate, outside this task: the brand decision on the focus colour (candidate on file: inner tech-green ring plus outer deep-navy ring) that lets the exception be retired. Residual risk: VoiceOver/Safari pass on the role-based tables not run.
