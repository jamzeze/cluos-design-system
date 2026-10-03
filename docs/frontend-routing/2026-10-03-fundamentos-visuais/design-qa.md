Result: passed (round 2)

Target: `docs/frontend-routing/2026-10-03-fundamentos-visuais/ux-layout-contract.md` (priority 1); structural parity with `/Users/rafacosta/Downloads/design-system-site-soulclin.pdf` (priority 2, compared through the extracted text `scratchpad/src/soul.txt`; the reference rasters `sec0..sec6.png` were not opened); `cluos-mms-v1` in `DESIGN.md`, `tokens/mms-canonical.yaml`, `tokens/tokens.css` (priority 3).

Subject: `DESIGN-fundamentos-visuais.html`, branch `agent/cluos-design-system/fundamentos-visuais-20261003`, commit 860c4ef, level N2. design-critic: `Result: passed` (round 3, 43/50, F1 focus ring excepted for this page by `exception-focus-ring.md`). Reviewer: design-qa, no edits made to page, contract or tokens.

Evidence: render at 1920, 1280, 768, 390, 375 (JSON: no overflow incl. inside table wrappers, Manrope and Instrument Sans loaded, `hexCheck: []`); composites `scratchpad/qa-out/v-desk-a.png`, `v-desk-b.png` (desktop 1920, content column 1280, two halves side by side), `v-phone375.png` (375, 8 strips); chunks `scratchpad/qa-out/<size>-<i>.png`. The last chunk of every render is bottom-aligned and overlaps the previous one, so repeated content in the composites is a chunking artefact, not a page defect. Source greps of the page CSS; PDF read with `pdfinfo`.

## Checks

| Check | Result | Evidence |
|---|---|---|
| Structure | pass | All 9 contract zones exist, in contract order, DOM order equals visual order (header, 01 to 07, footer). Each section opens numeral + title + short description over a hairline. Hover and focus specimens carry `tabindex=-1`, so they stay out of the focus order. Every field group of the reference is present (table below). |
| Priority | pass | No disclosure, tab or accordion anywhere. The provenance legend sits in the header; the Veredito column is visible at 375 (stacked as `Veredito: ...`); proposal marks (dashed, bar, "(proposta)") are visible at every width. |
| Identity | **fail** | Fonts, radius, elevation, hex, ratios, spacing and containers match (pass list below), but two places present non-token names or measures as canonical: D1 and D3 (blocking). D2 is a P3 note. |
| States | pass | Contract names field states by reference: button primário, hover, foco, secundário; field repouso, foco, erro; checkbox marcada e repouso; surface states Concluída / Atenção / Negada. All render (`v-desk-b.png`). Contract names no loading, empty or disabled state. The focus-ring failure (1,5:1 on white, 1,0:1 on the primary button) is shown as found, which is what the exception requires. |
| Responsive | pass with P3 | 375 and 390: single column, swatches 2-up, semantic roles, type rows, scale and layout stack, no horizontal overflow (JSON, all five widths). Breakpoints in the page: 64rem, 47.99rem (single column, matches "abaixo de 48rem"), 32rem. Swatches 6 on desktop (viewed), 2 on phone (viewed); the 3-column step at tablet is not visually verified by QA. Contract says "tabelas com rolagem própria"; the build stacks both tables instead (D5). |
| Behavior | pass | `git diff --stat main...HEAD -- tokens DESIGN.md DESIGN-preview.html` is empty (out of scope respected). Only in-page anchors (`#s1`, `#s3`) exist and their targets exist. No data, routes or events added. |

### Identity: what matches

- 17 of 17 token swatch hexes equal `tokens.css`; `hexCheck` returned `[]` (chip colour equals printed hex).
- All 21 contrast rows recomputed (WCAG 2.1): maximum difference 0,04, none outside rounding. Neutral 700 `#666666` is only in the proposal swatch and the proposal row.
- Swatch counts in the 01 description (9 canonical + 8 derived + 1 proposal = 18) equal the 18 swatches rendered.
- Spacing scale lists exactly 1, 2, 3, 4, 6, 8, 10, 12, 16, 24 (no step 5, 7, 9, 11, 13). Containers 1280 / 1152 / 768 / 672 px equal `wide` 80rem, `product` 72rem, `docs` 48rem, `prose` 42rem. Product 1152 px confirmed.
- 16 of 16 type rows: desktop size/line equals `--cluos-text-*` x `--cluos-leading-*` (for example 60/72, 48/58, 30/36, 24/34, 24/29, 36/36, 12/19, 20/24, 16/26, 14/22, 14/14); the only off-step value is `titulo-pagina` Celular 44/53 (D2, P3: it is the `clamp(2.75rem, ...)` floor that `DESIGN-preview.html:61` uses for its h1). Tracking values equal those in `DESIGN-preview.html` (-.045, -.055, -.025, -.04, -.03, .11, .12 em), weights 300 / 400 / 550 / 650, 450 only on the lockup descriptor (`DESIGN.md` lockup table), no 700, no italic (`font-style: normal`).
- Radius 0 on buttons, inputs, checkbox; `radius-full` only on the geometry specimen; the only `box-shadow` is the canonical focus ring; `shadow-*` documented as none.
- Dark surface is limited to the single operational block (06), with states written in white.
- No SoulClin content found by reading the full text (no clinic, doctors, WhatsApp, Playfair, Rosana, AN1, italics as a style). Sanity grep result is printed at the end of this run.

### Reference parity (field groups)

| Group | Reference | Built | Status |
|---|---|---|---|
| Header | eyebrow, title, subtitle, description with sources, date, legend | all present; legend has 3 items (defined, proposal, bar) | match (legend item added, see adaptations) |
| 01 | name, hex, token, function; dashed = proposal | present x18, grouped in 3 labelled rows of 6; Neutral 700 dashed and "(proposta)" | match, adaptation A1 |
| 02 | Fundo / Texto / Borda / Ação, role to primitive | 4 columns; status in Fundo (4) and Texto (4) as the contract says; 3 proposals dashed | match, but D1 |
| 03 | Amostra / Uso / Contraste / Veredito + footnote | present, 21 rows; footnote replaced by "Pendências abertas" | match, adaptation A2 |
| 04 | name, family, size/line, tracking, Celular, uso, sample, bar, note | present for 16 rows; 5 bars; note below | match (D2 note); adaptation A3 |
| 05 | scale with bars, layout table, Raio e espessura | present; 10 bars, 15 layout rows, 6 geometry items | match, but D3; adaptation A4 |
| 06 | 4 buttons, text link, source link, field rest/focus/error, checkbox group, numbered step, quote, contrast block | all present in the same 2 x 2 form grid; plus ghost and destructive buttons; dark operational block | match, adaptation A5 |
| 07 | Faça / Evite 8 + 8 | 8 + 8 | match |
| Footer | signature + meta | present | match |

## Divergences

Blocking (P2). Recorded = written in the contract, routing or exception files. Neither of the two below is recorded.

| ID | Sev | Check | Location | Evidence | Recorded? | Route |
|---|---|---|---|---|---|---|
| D1 | P2 | Identity | 02, Ação column, rows `secundaria-borda` and `secundaria-texto` (4th and 5th `.role` of the 4th `.semantic > div`); `v-desk-a.png` right half, Ação | `tokens.css` has no `--cluos-secundaria-*` (roles that exist: `color-action-primary`, `color-action-primary-hover`, `action-primary-text`, `action-oxblood`). The names are the reference's role names carried over, rendered as solid canonical rows. The note under 02 says "Nomes sem o prefixo --cluos-", which tells the reader these tokens exist. | no: drift | frontend-craftsman: point the rows at existing roles (`color-border-strong`, `color-fg-primary`) or mark them dashed with "(proposta)" |
| D3 | P2 | Identity | 05, layout table, unbarred rows `margem` (24 / 16), `secao-vertical` (64 / 96), `botao-altura` (40); `v-desk-b.png` left, Layout | No token of their own in `tokens.css`, `mms-canonical.yaml` or `DESIGN.md`. The descriptions cite the space steps they are built from (space-6/4, 16/24, 8 + 2), which is the same derivation as the barred rows `bloco`, `toque-min`, `campo-altura`; `botao-altura` is built exactly like barred `toque-min` (space-8 + space-2). The note under the table says a bar means "não existe token próprio para ela", so unbarred rows read as having a token. | no: drift | frontend-craftsman: bar the three rows (or cite a canonical source) and keep the note true |

Non-blocking (P3).

| ID | Check | Location | Finding | Recorded? | Route |
|---|---|---|---|---|---|
| D2 | Identity | 04 row `titulo-pagina`, meta "Celular: 44/53"; `.t-titulo-pagina` and `.doc-head h1` use `clamp(2.75rem, 6vw, var(--cluos-text-6xl))`; `v-phone375.png` strip 5 | 44 px is the clamp floor, not a `--cluos-text-*` step (steps 36 and 48); 44 x 1.2 = 52.8 gives the printed 53. Not barred. Downgraded from P2 because `DESIGN-preview.html:61` (part of the contract) uses the same clamp for its h1, so the value is canonical in the preview but is not traceable to a token step. | no (source exists, not cited) | frontend-craftsman: add "clamp floor, as DESIGN-preview.html" to the row or use a step |
| D4 | Identity | 05 layout rows `topnav-altura` 56, `sidebar` 256 / 56, `grade` | Unbarred. 56 and 256 trace to `PRODUCT-PATTERNS.md:29-30` and `patterns/components.md:25`, which are pattern docs, not tokens, so the "defined" reading overstates the source. The collapsed 56 and the `grade` text ("1:2, 3 ou 5 colunas") have no source found. | no | frontend-craftsman: bar or cite the pattern doc |
| D5 | Responsive | 03 and 05 tables below 48rem | Contract: "tabelas com rolagem própria". Build: tables stack into labelled rows (`data-label`, `role` kept), no scroll; verdict and proposal marks stay visible. Behaviour is better than the contract wording, but only design-critic rounds 2 and 3 record it. | partly (design-critic only) | ux-layout-architect: amend the contract; do not change the code |
| D6 | Identity | `Deep teal` swatch function "texto de ação ghost"; contrast row "Deep teal sobre white" | Ghost text in deep teal is a proposal in 02 (`ghost-texto (proposta)`) and in 06, but the swatch and the contrast row present it as defined. | no | frontend-craftsman |
| D7 | Identity | 02 `color-fg-muted`, 03 row "Neutral 500 sobre white" | "só desabilitado / Reprovado para texto" narrows the yaml role `subtle_text`. Partly recorded by the PR #6 note in 03. | partly | none, informational |
| D8 | Identity | 06 "Campo com erro" specimen | Error border in oxblood is `campo-erro (proposta)` in 02, but the 06 caption has no "(proposta)" and no bar (the repouso field does). | no | frontend-craftsman |
| D9 | Structure | 06 identifier link | Label is a file path; `href="#s1"` (in-page), the reference's "abre em nova aba" and "sublinhado fino" description were dropped. Adaptation, no content loss. | no | none |
| D10 | Identity | 03 note "Pendências abertas" | PR #6 (neutral 700) and PR #4 (success `#546D13`, warn `#8A5A2B`) are cited as text only and marked as proposals; their numbers were not verified against the PRs. | n/a | verify before publishing |
| D11 | Identity | header eyebrow, 06 quote caption | `text-transform: uppercase` renders "CluOS" as "CLUOS" (follows the sobrelinha spec). The quote caption says "sem itálico" (a negation, not italic content). | n/a | none |

## Adaptations

Recorded: (R1) provenance marks, dashed swatch and bar, contract section "Proveniência"; (R2) status in Fundo and Texto, contract zone 3; (R3) focus-ring failure shown, not fixed, `exception-focus-ring.md`; (R4) the dark block is the operational surface, contract zone 7.

Unrecorded but inside Rafael's "adapt where CluOS lacks a colour or font" (not blocking; recommend ux-layout-architect lists them in the contract):
- A1 swatches in 3 labelled groups of 6 (18) instead of one 6 x 2 grid (12); no overlay swatch.
- A2 contrast table has 21 rows (reference 11); the video-overlay footnote became the open-PR note.
- A3 type: `titulo-pagina-interna` to `titulo-tela`, `titulo-dobra` to `titulo-secao`, `nome-tecnica-medico` to `lockup`, extra `codigo` (16 rows against 15); JetBrains Mono is not in `brand-assets/fonts`, the page states the fallback.
- A4 layout: 15 rows (adds the four containers, `topnav-altura`, `sidebar`; `grade` rewritten); geometry gets a sixth item, `shadow-xs ... lg`.
- A5 06 adds ghost and destructive buttons; quote mark is medium blue, not champagne (CluOS has no champagne in the contract).
- A6 legend gets a third item (bar), page adds a "Pendências abertas" note in place of the video-overlay note.

## Not checked

- Tablet 768 visual (composite `v-tablet.png` was built but not opened). Evidence for 768: no overflow, breakpoints in the CSS, design-critic round 3 visual review.
- The PDF `docs/fundamentos-visuais/cluos-fundamentos-visuais.pdf` was read with `pdfinfo` only: 1 page, 1920 x 11454 pt (render height 11452 px). Not inspected visually.
- 1280 and 1920 were viewed only at 1920; 1280 by overflow metrics only. Keyboard tab order was inferred from DOM, not exercised in a browser.
- Reference rasters `sec0..sec6.png` not opened; reference parity relies on `soul.txt`.

## Next action

1. frontend-craftsman fixes D1 and D3 (and D2, D4, D6, D8 in the same pass); no token, `DESIGN.md` or preview edit is needed.
2. ux-layout-architect amends the contract for D5 and lists A1 to A6.
3. Re-run design-qa on the same render command; if D1 and D3 are closed the verdict is passed.

---

## Round 2

Verdict: passed (round 2). Round 1 was blocked on D1 and D3 (P2). Both are closed, as are D2 and D4 to D11. No P0 to P2 is open; two new P3 notes (N1, N2) are informational.

Target: unchanged (`ux-layout-contract.md`, as amended in b9f3c34; `cluos-mms-v1`; reference parity from `soul.txt`).

Subject: `DESIGN-fundamentos-visuais.html` at commit b9f3c34 (`git diff 860c4ef b9f3c34`: page 34 lines, contract +27 lines, PDF regenerated). design-critic result unchanged (`passed`, round 3). Reviewer: design-qa, no edits to page, contract or tokens.

Evidence (paths relative to the scratchpad root `/private/tmp/claude-501/-Users-rafacosta-Documents-GitHub-cluos-design-system/cff45263-6712-4eee-99d8-f1067eff8e36/scratchpad/`):
- Render at 1920, 1280, 768, 390, 375 (`qa2-out/<size>-<i>.png`). Per width `scrollWidth` equals `clientWidth` (1920, 1280, 768, 390, 375), `overflow: []`, Manrope and Instrument Sans loaded, `hexCheck: []`. Page height 11586 / 11586 / 14600 / 21352 / 21521 px.
- Viewed (all under `qa2-out/`): desktop crops `qa2-A-02.png` (02, four columns), `qa2-B-layout.png` (05 scale, layout table, note), `qa2-C-forms.png` (06 links and form); tablet composite `v2-tablet.png` (3 chunks of 768 px side by side); PDF raster `v2-pdf.png` (`pdftoppm -r 20`, two halves side by side).
- Sources read: `tokens/tokens.css`, `DESIGN-preview.html`, `patterns/components.md`, `PRODUCT-PATTERNS.md`, `git diff main...origin/...` for PR #4 and PR #6 branches, `gh pr list` (PR #4 and #6 open), `pdftotext` on the PDF.

### Checks (round 2, only what the diff touches)

| Check | Result | Evidence |
|---|---|---|
| Structure | pass | Same 9 zones in the same order; the diff adds no element except the "(proposta)" marks. 02 Ação column renders 7 rows (`qa2-A-02.png`); layout table renders 14 rows (`qa2-B-layout.png`; 14 `<tr role="row">`, 4 `is-proposal`). `grep` finds no `secundaria-*` in the HTML or in the PDF text. |
| Priority | pass | Proposal marks stay visible, now also on the deep teal contrast sample (dashed), the "Campo com erro" caption (bar) and the deep teal swatch text. Nothing moved into disclosure. |
| Identity | pass | `color-border-strong` and `color-fg-primary` exist (`tokens.css:205`, `:201`) and the chips render medium blue and deep navy. No new colour, font, radius or shadow. Beyond text, the diff adds two existing proposal classes (`sample--proposal` on the deep teal contrast sample, `caption--proposal` on the error caption), swaps one chip variable (`--cluos-text` to `--cluos-color-fg-primary`, same deep navy) and changes one `href`. `hexCheck: []`. |
| States | pass | Field repouso / foco / erro, checkbox marcada / repouso, buttons render as in round 1 (`qa2-C-forms.png`); the error caption now carries the proposal bar. |
| Responsive | pass | 1920 and 768 viewed; 1280, 390, 375 by metrics (no overflow). Tablet 768 viewed for the first time, see below. Contract text now matches the build: tables stack below 48rem (the page breakpoint is 47.99rem). |
| Behavior | pass | No data, route or event change. One link changed: the identifier link now points to `tokens/mms-canonical.yaml` with `target="_blank" rel="noopener"` (the file exists, 2985 bytes). Residual risk: the relative path resolves only while the page stays at the repo root. |

### Tablet 768 (not viewed in round 1)

Three chunks viewed. Swatch groups render 3 per row (2 rows per group of 6), matching "6 to 3 to 2". The 02 semantic columns wrap 2 x 2 (Fundo and Texto, then Borda and Ação). Contrast table keeps its 4 columns and the layout table its 3 (768 px is not below 48rem, so no stacking, as the contract says). Type rows keep meta left and sample right, scale bars and the geometry strip are intact, the dark operational block and the Faça / Evite columns fit. No overflow, no clipped text and no overlap at composite scale (about one-third of 768 px, so fine detail was not inspected).

### PDF raster (not viewed in round 1)

`docs/fundamentos-visuais/cluos-fundamentos-visuais.pdf`: 1 page, 1920 x 11587.9 pt (page render height 11586 px; round 1 was 11454, so the PDF was regenerated). At 20 dpi the sections 01 to 07 and the footer appear in the page order, split in two halves in the composite; the dashed neutral 700 swatch, the dashed neutral 700 and deep teal contrast samples, the proposal bars in the layout table and the dark operational block are visible (the field-caption bars are not resolvable at 20 dpi; they are confirmed in the HTML render). Text is not legible at 20 dpi, so text fidelity was checked with `pdftotext`: 9 lines match the new strings ("clamp do DESIGN-preview", "borda oxblood (proposta)", "reprova em texto", "borda do secundário", "texto do secundário", "Deep teal sobre white (proposta)", "abre o arquivo em nova aba", "Container e escala são tokens", "proposto para o texto da ação ghost") and none carries `secundaria-borda` or `secundaria-texto`.

### Round 1 divergences: status

| ID | Round 1 | Round 2 | Evidence |
|---|---|---|---|
| D1 | P2 | **closed** | Ação rows now `color-border-strong` (medium blue, "borda do secundário") and `color-fg-primary` (deep navy, "texto do secundário"), both solid and both existing roles (`tokens.css:205`, `:201`); the preview uses the same pair for its secondary button (`.button--secondary`: `border-color: var(--cluos-border-strong); color: var(--cluos-text)`, `DESIGN-preview.html:68`); `qa2-A-02.png`. |
| D3 | P2 | **closed** | Layout note now defines three levels (container and scale are tokens; no bar = built from tokens and used in the preview or `patterns/components.md`, source in parentheses; bar = proposed, no token, no canonical use). Sources checked: `margem` = `.shell` padding space-6, 16 px at the narrow breakpoint (`DESIGN-preview.html:41`, `:133`); `secao-vertical` = `.section` padding-top space-16 and `.hero` padding space-24 (`:70`, `:56`); `botao-altura` = `.button` min-height space-8 + space-2 (`:65`); `topnav-altura` 56 and `sidebar` 256 / 56 = `patterns/components.md:25`, `:26`, `:83`; `grade` 1:2 / 3 / 5 columns, one column on the phone = `.rule` 1fr 2fr, `.state-grid` repeat(3), `.palette-grid` repeat(5), single column in the media query (`:79`, `:102`, `:85`, `:137` to `:143`). Note renders under the table (`qa2-B-layout.png`). Residual wording points: N1, N2. |
| D2 | P3 | closed | `titulo-pagina` and `titulo-tela` cite "clamp do DESIGN-preview". Both are traceable: 44 px = `h1` clamp floor (`DESIGN-preview.html:61`), 36 px = `.type-display` clamp floor `clamp(2.25rem, 5vw, text-5xl)` (`:81`). |
| D4 | P3 | closed | `topnav-altura`, `sidebar`, `grade` now cite their source in parentheses. Wording residue: N1. |
| D5 | P3 | closed | Contract "Responsivo" now says tables stack below 48rem and keep `role`; new section "Adequações em relação à referência" exists. Build behaviour is unchanged and now recorded. |
| D6 | P3 | closed | Swatch says "proposto para o texto da ação ghost"; contrast row reads "Deep teal sobre white (proposta)" with `sample--proposal` (dashed outline; visible in the tablet composite and the PDF). |
| D7 | P3 | closed | Neutral 500 swatch: "Texto sutil no contrato, mas reprova como texto (2,5:1): só contexto desabilitado"; `color-fg-muted` reads "→ neutral 500 · reprova em texto" (`qa2-A-02.png`). |
| D8 | P3 | closed | Caption reads "Campo com erro: borda oxblood (proposta)" with the bar (`qa2-C-forms.png`). |
| D9 | P3 | closed | Link targets `tokens/mms-canonical.yaml`, `target="_blank" rel="noopener"`, underline kept; caption says "o link abre o arquivo em nova aba". |
| D10 | P3 | closed | PR #4 branch `tokens.css`: `--cluos-status-success-text: #546D13`, `--cluos-status-warn-text: #8A5A2B`. PR #6 branch: `--cluos-neutral-700: #666666` and `--cluos-text-subtle: var(--cluos-neutral-700)`. Both PRs are open (`gh pr list`). The page note matches. |
| D11 | P3 | closed, no action | Informational in round 1; unchanged. |

Round 1 correction: the parity row for 05 said "15 layout rows". The render has 14 (4 containers, 10 other rows), which is what the amended contract says. The count was a QA miscount, not a page change.

### New divergences

| ID | Sev | Check | Location | Finding | Recorded? | Route |
|---|---|---|---|---|---|---|
| N1 | P3 | Identity | 05 note under the layout table; rows `topnav-altura`, `sidebar` | The note defines unbarred rows as "medida montada com tokens". 56 px, 256 px and 56 px (collapsed) are raw pixel values in `patterns/components.md`, not on the space scale (1, 2, 3, 4, 6, 8, 10, 12, 16, 24). The source is cited correctly, so the value is traceable; only the "montada com tokens" half of the definition is loose for these two rows. | no | optional: frontend-craftsman changes the note to "medida usada no DESIGN-preview.html ou em patterns/components.md" |
| N2 | P3 | Identity | 05 rows `gutter` (32 / 16) and `bloco` (48 / 32), barred | The bar means "sem token nem uso canônico", but `DESIGN-preview.html` already uses these steps: column gap space-8 in `.lockup-stage`, `.type-stage` and `.surface` (`:74`, `:91`), card gap space-4 in `.state-grid` (`:102`), stage padding space-12 (`:74`). The error is conservative (the page under-claims), so nothing is presented as canonical that is not. `toque-min` and `campo-altura` stay correctly barred as named measures. | no | optional: bar stays, or cite the preview and drop the bar on `gutter`; decide before publishing |

Neither blocks: no non-token value is presented as a token, which was the D1 and D3 failure.

### Adaptations

A1 to A6 of round 1 are recorded in the contract section "Adequações em relação à referência" and match the build (18 swatches in 3 groups of 6, 21 contrast rows, 16 type rows with the renames and `codigo`, 14 layout rows and the sixth geometry item, ghost and destructive buttons, medium blue quote mark, third legend item, pendências note), with two sub-points still unrecorded (P3, informational, for ux-layout-architect): (a) A1, the reference's overlay swatch is absent and the section does not say so; (b) A3, the JetBrains Mono fallback (the font is not in `brand-assets/fonts`; the page states the fallback) is not named in the contract.

### Not checked in round 2

- 1280, 390 and 375 were checked by metrics only (no overflow, fonts loaded, `hexCheck: []`). The changes there are text plus one caption bar; the bar is drawn 12 px left of the caption; the JSON reports no overflow at 390 and 375, but the bar was not viewed there.
- Keyboard tab order not exercised in a browser (unchanged DOM order; the new `target="_blank"` link was already a focusable link).
- PDF text was verified with `pdftotext`, not by reading the 20 dpi raster.
- Round-1 items not in the diff (token swatches, 21 ratios, type metrics, reference parity rows) were not re-run.

### Next action

1. No blocking work. The page can go forward.
2. Optional before publishing: frontend-craftsman or ux-layout-architect decide N1 and N2 (wording only).
3. Commit this file.
