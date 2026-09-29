Result: blocked

Reviewer: design-critic, clean context, no edits to the repository. Date 2026-09-29.
Change: branch agent/cluos-design-system/status-token-contrast-20260929 (87ea15c) against origin/main (3fc656f). Level N3, direction cluos-mms-v1, layout contract not applicable (routing.md). No process failure: the contract is present and design-decision.md records palette mode "preserve".
Blocking: A1 (P2, introduced by this diff) and N1 (phone width not verified). Everything else is P3, or was already present in the before render.

Score: 37/45 over nine dimensions, lowest dimension: Acessibilidade 3/5.
Responsividade/adaptação is not scored (N1), so the 42/50 bar cannot be evaluated on a complete scale. It would fail anyway: Acessibilidade is below 4 and A1 is an open P2.

## What I rendered

Chrome 154 headless, isolated profile, from scratch copies. My files are in /private/tmp/claude-501/-Users-rafacosta-Documents-GitHub-cluos-design-system--claude-worktrees-competent-proskuriakova-7879d6/b3fd690d-1562-4f2c-b9b6-46fb7cdd9a52/scratchpad/critic/.

- Copies checked with diff: site-after DESIGN-preview.html, tokens/tokens.css and renders/status-pairs.html are identical to the worktree; site-before DESIGN-preview.html and tokens/tokens.css are identical to origin/main. document.fonts reports Manrope and Instrument Sans loaded.
- DESIGN-preview.html before and after at 1440 px, full page, plus crops of the navy block and of section 04 (before-1440.png, after-1440.png, *-1440-navy.png, *-1440-estados.png), and a pixel diff of the two full pages.
- status-pairs.html at 1440 px in five contexts: :root, ?appearance=dark, ?style=A, ?style=G, ?style=B&palette=pal-forest (sp-*-1440.png). The ratios it computes in the browser match design-decision.md section 7 in every cell I compared.
- A DOM probe (getComputedStyle and geometry) of both previews at 1440 px and at the 500 px floor of headless Chrome.

## What the diff changes on screen (pixel diff, 1440 px)

Nothing above y=1983 changes: hero, sections 01 and 02 and the palette swatches are pixel-identical. Changed: the three labels in the navy block (y1983-2090, x1208-1302); the warn label in "Aviso operacional" (y2444-2453, x561-757: text only); everything from the table header down (y>=2554: column reflow, the new row, later content shifted 55 px; page height 3541 -> 3596 px). "Publicação negada" (error on white) is pixel-identical.

## Identity test

| # | Question | Answer |
|---|---|---|
| 1 | Logo and copy removed, still CluOS? | Yes for the preview: hairline grid, zero radius, one deep-navy operation block with the tech-green accent, Manrope over Instrument Sans. The diff touches none of it. |
| 2 | Attributable to 500 startups? | No for the preview. The evidence page is a plain token table by design and is not a product surface. |
| 3 | Clear visual idea or pretty components? | Clear idea: "clareza operacional" carried by rules, type weight and one dark mass. |
| 4 | Conveys the real positioning? | Yes. The change makes operational status legible on the navy block, which "Visão de operação" needs. |
| 5 | Density matches the task? | Yes: specimen density. The evidence table is dense on purpose (8 columns x 4 statuses x 2 samples). |
| 6 | Brand in composition and details, not only colour? | In the unchanged parts, yes. In the changed part the brand loosens: on navy the status tones no longer match the Copper and Tech-green swatches above them (A1). |
| 7 | Elements a generative model would add? | None in the preview. Evidence page: no ornament; five of its eight columns render identical white in :root (bg, bg-subtle, canvas, surface, subtle), which test token names, not values. |

## Rubric

| Dimension | Score | Evidence |
|---|---|---|
| Distinção de marca | 4 | Pixel-identical above y=1983, identity intact. Not 5: the on-navy status tones drift from the palette swatches directly above (A1). |
| Hierarquia | 5 | after-1440.png: one focal point (H1 with the bold second line, then the single tech-green CTA). Status labels stay tertiary; the diff changes hue and lightness, not scale or weight. |
| Composição | 4 | Form follows the task (numbered sections, hairline table). Not 5: the new row reflows the auto-layout table by 4 to 10 px (A3). |
| Tipografia | 5 | Manrope and Instrument Sans both loaded; weight contrast in the H1 and small tracked uppercase labels do the hierarchy work; unchanged by the diff. Phone-width typography not checked (N1). |
| Densidade | 4 | Proportional in both pages; the row adds 55 px at 1440. Evidence-page cells print two samples and two ratio lines each: readable at 1440, unchecked at phone width. |
| Disciplina de tokens | 4 | The DESIGN-preview.html diff uses only var(--cluos-status-*), -text and -on-navy, no hex. Not 5: #8A5A2B is a literal in ten selector blocks (A5) and the dark role/tint mismatch (A4). |
| Economia de componentes | 4 | No component added, one table row, no ornament. Not 5: the new row overlaps the "Cor" row ("Uma semântica por estado, sempre com texto.") and the evidence page repeats five identical columns. |
| Clareza de interação | 4 | Covers status-state clarity only: each state carries text plus marker and is legible on white, tint, muted and navy in the specimen. Not 5: the marker follows the label on navy but not on light (A2). Hover, focus and keyboard were not rendered; the diff touches none (N3). |
| Acessibilidade | 3 | Diff-attributable: status text is at or above 4.5:1 on every surface of its register in every context I rendered (MMS success on white 3.74 -> 5.88, warn 3.54 -> 5.87, error on navy 2.52 -> 5.16), except error on dark bg-muted, 3.83 (B2). Page as rendered: capped at 3 by pre-existing neutral text (B1). Focus visibility and keyboard not checked (N3). |
| Responsividade/adaptação | not scored | 390 px was not rendered (N1). At the 500 px floor there is no horizontal overflow, but that is not the phone width asked for. |

## Findings introduced by this diff

### A1. P2. On-navy success and warn changed although they already passed AA

- Evidence: before-1440-navy.png against after-1440-navy.png; pixel bands y1983-1995, y2030-2044, y2081-2090 at x1208-1302. Before, CONCLUÍDA #6F8F19 was 5.16:1 and ATENÇÃO #BD7845 was 5.45:1 on #010D28 (both pass; the specimen column "deep navy" prints "antes 5.16" and "antes 5.45"). After: #9CC24A (9.39) and #D08A54 (6.83). Only NEGADA needed to change (#8A3A3A 2.52 -> #C46A6A 5.16). In the after render, ATENÇÃO no longer matches the Copper swatch of section 03 above it, and CONCLUÍDA reads as a second green beside the tech-green accent "operação" in the same block.
- Impact: visible palette drift in the canonical specimen against the constraint that the palette does not change, and it blurs "tech green = next step" against "green = success". It comes from design-decision.md D2, which the author records as an unapproved proposal.
- Fix, one of: (a) in DESIGN-preview.html override only `.surface .status--error` and leave success and warn on their fills, which pass on #010D28; keep the four on-navy tokens for the dark register, where the fills fail on bg-muted (3.83 and 4.05), and state that rule in DESIGN.md. (b) Keep D2 and record Rafael's approval of the uniform on-navy set in design-decision.md and palette-decisions.yaml.
- Where: DESIGN-preview.html `.surface .status--success`, `.surface .status--warn`; tokens/tokens.css `--cluos-status-success-on-navy`, `--cluos-status-warn-on-navy`.

### A2. P3. Warn label on light is bronze while its marker stays copper

- Evidence: after-1440-estados.png, "REVISAR ANTES DE PUBLICAR": label #8A5A2B, marker #BD7845. The pixel band covers x561-757 only, so the marker at x545-553 is unchanged. On navy the marker follows the label (currentColor); on light it does not: two marker rules.
- Impact: the card copy says "Copper informa…" and the label now reads brown. The trade-off is needed for AA (white 3.54 -> 5.87). Not a blocker.
- Fix: none required. Note the label/marker split in DESIGN.md next to the Estados rule.
- Where: DESIGN-preview.html `.status--warn`, `.status--warn::before`.

### A3. P3. The new table row reflows the table

- Evidence: before/after-1440-estados.png. The "Tratamento canônico" column starts at x≈302 before and x≈312 after; "Evitar" at x≈866 and x≈870. The header band y2554-2566 (x302-918) appears in the pixel diff; probe reports table-layout: auto. Page height 3541 -> 3596 px.
- Impact: contradicts "nothing else in the preview changed" by 4 to 10 px on every row. Cosmetic.
- Fix: shorten the new cells (for example "Token de texto no claro; on-navy no escuro." and "Preenchimento usado como texto.") or set column widths, then re-measure.
- Where: DESIGN-preview.html `#states table`.

### A4. P3. In the dark register the text role and the light tint form a failing pair that the evidence page never shows

- Evidence: tokens/tokens.css `[data-appearance="dark"]` sets `--cluos-color-status-success-text` to `--cluos-status-success-on-navy` (#9CC24A) while `--cluos-status-success-bg` stays #F1F6DF. By hand from the hex, not rendered: 1.86:1, against 3.38:1 for the fill on the same tint. status-pairs.html lines 91 and 98 drop the tint column whenever the context is dark, so no render shows the pair.
- Impact: a dark badge built from the role tokens fails badly. The CSS comment and D6 say to pair the tint with the `--cluos-status-*-text` constants, but the role layer is the themable API. New token, new failure mode; no existing rendering regresses.
- Fix: render the dark tint column with the constants (passing) and label the role-plus-tint pairing unsupported in DESIGN.md and patterns/states.md, or add dark tints (D6 leaves that to Rafael).
- Where: tokens/tokens.css; docs/frontend-routing/2026-09-29-status-token-contrast/renders/status-pairs.html lines 91 and 98.

### A5. P3. The same literal is repeated instead of referenced

- Evidence: the diff of tokens/tokens.css writes #8A5A2B as a literal in ten selector blocks (styles A to E, five palettes) and again as the canonical token. Only pal-terracotta differs (#8F4B2B).
- Impact: drift risk if the canonical warn text changes. I did not read or run the test, so I cannot say whether it catches a divergence.
- Fix: `var(--cluos-status-warn-text)` in those ten blocks.

## Findings already present in the before render

### B1. P2. Neutral text below AA next to the new row

- Evidence: both estados crops show the table header labels ELEMENTO, TRATAMENTO CANÔNICO, EVITAR in light grey on #EAEAEA. Author's figures (design-decision.md section 9, not recomputed by me): `--cluos-text-subtle` #A5A5A5 is 2.05:1 on bg-muted and 2.46:1 on white. The same token sets the swatch captions (DEEP NAVY, MEDIUM BLUE, and so on) in section 03.
- Impact: the table that received the new row keeps an AA failure; it caps Acessibilidade at 3 for the page as rendered. The author put it out of scope and the diff does not touch it.
- Fix: a separate task or Rafael's recorded exception: header and caption text in a neutral token that passes 4.5:1, or darken `--cluos-text-subtle` (touches neutral_500, his decision).

### B2. P3 (residual). Error text on the dark bg-muted, improved but not cleared

- Evidence: status-pairs.html ?style=G and ?appearance=dark, last cell of the error row: "3.83 abaixo" (1.87 before, in ?appearance=dark). Error on the style G surface passes at exactly 4.50:1.
- Impact: one AA failure remains in the shipped tokens (28 pairs, per the author) on a dark surface, held by the rule that the error family does not change (D5). The documented workaround is to state the error in `--cluos-text` beside the marker.
- Fix: Rafael's decision: a lighter dark oxblood, or a recorded exception.

## Not verified

### N1. Phone width (390 px). Blocks Responsividade

Headless Chrome here floors the layout viewport at 500 px: the probe launched with --window-size=390,900 reported innerWidth 500. My 390-px PNGs are the left 390 px of a 500-px layout, so I did not use or inspect them. At 500 px, before and after: scrollWidth 500 = innerWidth (no horizontal overflow), overflow list empty, table x16 to x484, page height 7626 -> 7727 px. Re-render at 390 with a device-metrics override (Playwright --viewport-size=390,844, or CDP Emulation.setDeviceMetricsOverride) and check the navy block (label beside row title) and the 3-column table.

### N2. Scripts, tests, mirrors and documentation

Not run or read by me: node scripts/status-contrast.mjs, npm test, tokens/tokens.ts and tokens.js parity with the CSS, tailwind-preset.js, and the markdown and example edits. The browser ratios in status-pairs.html agree with design-decision.md section 7 in every cell I compared, which supports the stylesheet but not the mirrors. The author's renders/*.png were not reviewed; I rendered my own.

### N3. Interaction and the remaining contexts

Not rendered: hover, focus and keyboard for the preview's links and buttons; status-pairs.html with ?style=B to E without a palette and with pal-tealcool, pal-tealink, pal-copper, pal-cold, pal-terracotta. The diff touches no interactive element.

## Handoff

Return to frontend-craftsman: (1) resolve A1 with option a or b; (2) shorten the new row or fix the table widths (A3); (3) render the preview and status-pairs.html at a true 390 px and send the images (N1). Then re-render, re-review and append to this file; do not overwrite this verdict.
B1 and B2 were already there and are not attributable to this diff, but B1 is an open P2 on the page: the bar (no dimension below 4, zero open P2) cannot be met until B1 is fixed or Rafael records an exception.
