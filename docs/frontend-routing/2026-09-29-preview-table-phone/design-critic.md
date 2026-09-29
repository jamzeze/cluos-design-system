Result: blocked
Score: 42/50 on the combined render (B3 preview + B1 `tokens.css`), lowest dimension: Acessibilidade 3/5
Bar (rubric): total >= 42, no dimension below 4, zero open P0/P1/P2. Not met: Acessibilidade 3/5 and one open P1 (F1).

Reviewer: design-critic, independent subagent, 2026-09-29. Branch `agent/cluos-design-system/preview-table-phone-20260929` @ `7da6f50` on `origin/main` @ `3fc656f`. Level N1, direction `cluos-mms-v1`. No repository file was edited; this is the only file created.

## Verdict

1. B3's own diff introduces no P0, P1 or P2. The overflow fix works and is measured below. Nothing in this branch has to change to clear the block.
2. The page-level bar fails on the combined render because of one open P1 that is already on `main` and that neither B1 nor B3 touches: the focus-ring token (F1). It fails on every focusable element, and the new region is one more consumer of it.
3. The block is not a waiver I can grant. "Known, not part of either fix" is the author's scoping. The exits are (a) a token fix merged with or before the pair, then a re-render and re-review appended here, or (b) an exception recorded by a human.
4. B3 alone also fails: Acessibilidade 2/5, 41/50, two open P1 (F1 and F2, both already on `main`). Merge B3 with B1 or the table this branch repairs ships with header labels at 2.05:1.

## Evidence

`S` = `/private/tmp/claude-501/-Users-rafacosta-Documents-GitHub-cluos-design-system--claude-worktrees-competent-proskuriakova-7879d6/b3fd690d-1562-4f2c-b9b6-46fb7cdd9a52/scratchpad` (session scratchpad, not in the repo).

- Pack renders: `$S/critic-b3/preview-{main,b1,b3,combined}-{1440,390,375,360,320}.png`, `focus-{b3,combined}-{1440,390}.png`, `table-main-vs-combined-{360,320}.png`. The pack checked the copies with `cmp` and reported b1 changes only `tokens.css`, b3 only the preview.
- My renders and probes: `focus-combined-320.png` (focused, scrolled to the end), `c1440-a.png`, `c1440-b.png`, `c390-montage.png`, `nav-strips.png`; expression files `$S/crit-*.js` run through `$S/cdp-eval.mjs` on the combined site.
- A custom CDP script I wrote (real key events, forced-colors emulation) was denied by the permission system. I did not work around it; see "Could not check".

Measured on the combined render (bundled fonts unless stated):

| Check | Result |
|---|---|
| Page sideways scroll (`scrollWidth` vs viewport) | equal at 300, 320, 340, 356, 357, 358, 360, 375, 390, 412, 430, 480, 512, 513, 600, 768, 1024 (my sweep) and 1440 (pack). `main`: 389 at 375, 360, 320 and a 1px gutter at 390 (pack) |
| Region hides (`scrollWidth - clientWidth`) | 57px at 300, 37 at 320, 17 at 340, 1 at 356, 0 at 357 and wider |
| Fallback fonts (I pointed `@font-face` at a missing directory; no face loaded) | table 325.4px, fits from 357, hides 17 at 340 and 37 at 320; headroom at 360 is 2.6px (bundled 3.1px). Matches the author |
| Cell padding | 8px up to 512px, 16px from 513px |
| Region edges | 16/16px gutters up to 768px, 24/24px at 1024px |
| Vertical overflow inside the region | 0 at 320, 360, 390, 412, 513, 768, 1024, 1440; region height equals table height |
| Text spacing override (line-height 1.5, letter-spacing .12em, word-spacing .16em) | 390: fits. 360: table 352.3px, region hides 24px, page stays 360. 320: region hides 64px, page 343 (F6) |
| Pixel diff `main` vs B3 | 1440 identical (pack). 360 same height, changes only in the table (y 5856-6461). 390 and 375: page 90px and 45px shorter, first differing row is the table top (5987 and 5912). Below the table, after shifting exactly 90/45px, 5,416/1,955 pixels still differ; region heights are fractional (606.40625px), so most likely a sub-pixel offset and the CSS diff touches only table rules. Identity below the table at 390 and 375 is not proven |
| Semantics | `role="region"`, `aria-label="Tratamento canônico por elemento"`, `tabindex="0"`, table `display: table`, `th scope="col"`. Tab order (pack) ends "Atualizar dados", region, "Reproduzir atualização" at 1440 and 390; `:focus-visible` matches |
| Table text contrast (combined) | `th` #666666 on #EAEAEA 4.77:1; first column #010D28 on white 19.27:1; other cells #132952 on white 14.32:1. `main` `th`: #A5A5A5 on #EAEAEA 2.05:1 |
| Focus ring (computed) | `0 0 0 2px #C4DB7B`, `outline-style: none`: 1.53:1 vs white, 1.27:1 vs `--cluos-bg-muted`, 1.00:1 vs `.button--primary` fill. Confirms the author's numbers |

## Identity test

1. Without logo and text, still CluOS? Mostly. The light/bold Manrope split with tight tracking, hairline ledger with zero radius and shadow, tech green only on actions and the dark navy operations panel carry it (`c1440-a.png`, `c1440-b.png`). Not "inconfundível".
2. Attributable to five hundred startups? Partly. Numbered tracked eyebrows ("01 · ...") over hairline sections are a common specimen look. The colour semantics (green is action; copper and oxblood only with text and a state square) and the lockup separate it.
3. A clear visual idea? Yes: lines as structure, colour only for action, state and consequence. The new region keeps it: no border, fill or shadow of its own.
4. Conveys the positioning (operational clarity)? Yes: the "Visão de operação" panel and the ledger rows.
5. Density fits the task? Yes for a reference specimen and for the table at 390 and 360. The palette on a phone is loose: five stacked blocks of about 320px each (`c390-montage.png`).
6. Brand in composition and detail, or only in the primary colour? Both: lockup hairline, kicker/H2/lede pattern, hairline rows; green appears only as action.
7. Elements that exist because a model usually puts them there? A few, all on `main`: numbered tracked eyebrows, two hero CTAs, a bordered chart that is empty at rest, literal backticks in the footer copy (F8). This branch adds none: one unstyled wrapper, its attributes and one padding rule.

## Rubric scores (combined render)

| Dimension | Score | Evidence |
|---|---|---|
| Distinção de marca | 4 | `c1440-a.png`: H1 "Minimalismo técnico com **clareza operacional.**", lockup hairline, green only on actions. Held at 4: the ledger-with-numbered-eyebrows look is common; the mark carries much of the recognition |
| Hierarquia | 5 | One green action per region; kicker, H2, lede, hairline repeat in every section; the table is deliberately secondary (muted header, hairlines) |
| Composição | 4 | Form follows the task. Deductions: the chart panel of section 05 is blank at rest beside a three-line column; on a phone the palette is five full-width blocks (`c390-montage.png`) |
| Tipografia | 5 | Manrope and Instrument Sans loaded on every render (pack `fonts`); weight and size do the hierarchy; tracked uppercase labels in Instrument Sans |
| Densidade | 4 | Table rows wrap to 3-4 lines at 390 with 8px padding and stay scannable (`focus-combined-390.png`); airy at 1440; palette heavy on phones |
| Disciplina de tokens | 4 | B3's CSS is fully tokenised (`--cluos-space-8`, `--cluos-space-2`, `--cluos-ring-focus`; the 32rem breakpoint already exists). Page still carries literal tracking (`letter-spacing: .11em` on `th`, kickers) |
| Economia de componentes | 5 | One unstyled wrapper `div`; no card in card; table stays hairline |
| Clareza de interação | 4 | One ring token on links, buttons and region; tab order correct; ring visible on the region at 1440, 390 and 320. The faint ring is scored under Acessibilidade to avoid double counting; counted here too it is 3 and the total is 41 |
| Acessibilidade | 3 | Passes: text contrast on combined, correct scroll-region pattern, reflow at 320 without page scroll (data tables are exempt from WCAG 1.4.10), tab reach. Fails: focus indicator below 3:1 (F1). Not verified: forced colors, screen reader (see below). "AA completo, foco visível" is not reachable while F1 is open |
| Responsividade/adaptação | 4 | Sweep above: page never scrolls, region absorbs the excess, three breakpoints used on purpose. Deductions: nav clipped at 375 and below (F7), scroll state has no cue (F3) |

Total 42/50.

## Findings

Attribution tags: [this branch], [main], [B1 fixes it].

### F1 - P1 - [main]; B3 adds one consumer; neither branch changes it
- Evidence: computed ring on the focused region `rgb(196, 219, 123) 0 0 0 2px`, `outline-style: none`; 1.53:1 vs page, 1.27:1 vs the `th` band, 1.00:1 vs the primary button fill. The page has 11 tab stops, all using it (`focus-combined-1440.png`, `focus-combined-390.png`, `focus-combined-320.png`). `DESIGN.md` lines 117-118 mandate this token for every control, so the fix belongs to the token.
- Impact: WCAG 1.4.11 (AA) fails for every focusable element; on the primary buttons the ring merges with the fill and only a 1.53:1 edge against white remains. P1 not P0: the indicator is visible and nothing stops working.
- B3 verdict: reusing the system token is correct; a local ring would be drift. Do not block B3's diff on this, but the combined page cannot pass while it is open.
- Fix (separate slice, tokens owner): in `tokens/tokens.css` change the light-register `--cluos-ring-focus` to reach 3:1 against white, `--cluos-bg-muted` and the tech-green fill, for example a `--cluos-bg` inner gap plus a deep-navy outer ring (`--cluos-text` #010D28 is 19.27:1 on white and 16.02:1 on muted; against #C4DB7B about 12.6:1 by my arithmetic, not rendered). Keep tech green for the dark register. In `DESIGN-preview.html` replace `outline: none` with `outline: 2px solid transparent` in the `:focus-visible` rule so forced-colors mode keeps an indicator (that mode drops `box-shadow`; unverified).

### F2 - P1 on B3 alone only - [main], [B1 fixes it]
- Evidence: `th` #A5A5A5 on #EAEAEA 2.05:1; kickers and eyebrows on white 2.46:1 (`table-main-vs-combined-360.png`, left panel). Combined: 4.77:1 and 5.74:1.
- Impact: WCAG 1.4.3 fails for the header labels of the table this branch repairs.
- Fix: merge B1 (`8c51bbd`) together with B3. Nothing to change in this branch.

### F3 - P3 - [this branch]: the scroll state loses the row label and gives no cue
- Evidence: at 320 (or 360 with fallback fonts and text spacing) the region scrolls. Unscrolled, "Evitar" is cut mid-word by 37px ("Card dentro", "Badges cáps"; `table-main-vs-combined-320.png`). Scrolled to the end, the "Elemento" column is cut ("ls e", "os"; `focus-combined-320.png`), so the row label is gone while reading "Evitar". The contract (E5) says the three cells of a row must stay co-visible; that holds only from 357px. First-column cells are `td`, not `th scope="row"`.
- Impact: at 400% zoom or on 320-340px phones the reader must scroll back to know which element a "Evitar" cell belongs to. Allowed by WCAG 1.4.10 (data table); degrades safely (page stays put).
- Fix (optional): `th scope="row"` on the first-column cells and, inside the existing `@media (max-width: 32rem)`, `position: sticky; inset-inline-start: 0; background: var(--cluos-bg)` on them; or amend E5 to say "from 357px". File: `DESIGN-preview.html`, `ux-layout-contract.md`.

### F4 - P3 - [this branch]: the region is a tab stop and a landmark where nothing scrolls
- Evidence: hides 0px at every width from 357px up, yet `tabindex="0"` is unconditional; keyboard focus draws a ring around a static table (`focus-combined-1440.png`). The table has no `<caption>` or `aria-label` of its own; the region carries the name (one more landmark, 6 labelled sections already).
- Impact: one extra tab stop at most widths. This is the recommended pattern for scrollable regions and the contract accepted it (A1), so optional.
- Fix (optional): set `tabindex` only when `scrollWidth > clientWidth` (the page already has script), or record the trade-off in the contract.

### F5 - P3 - [this branch]: the `PRODUCT-PATTERNS.md` §14 line generalises a specimen decision
- Evidence: the added bullet applies to every product table ("mantém colunas e ordem ... A página nunca rola na horizontal"). The contract rejected stacked cards only for this four-row comparison table; §14 also allows 5-6 columns with row actions. "Nunca" is contradicted by F6. No conflicting guidance elsewhere in the file (only sidebar drawer, line 34, and card grid, line 70).
- Fix: scope it ("quando a comparação entre colunas é a tarefa") and soften the last sentence.

### F6 - P3 - [main]: hero word overflows the page under user text spacing at 320px
- Evidence: with the 1.4.12 override, `scrollWidth` is 343 at 320px; the offender is the hero `strong` "clareza operacional." (right edge 343). The table is not the cause (the region hides 64px).
- Fix: `overflow-wrap: anywhere` on the hero heading. Not in scope for B3.

### F7 - P3 - [main]: last nav link is clipped or hidden with no cue
- Evidence: `nav { overflow-x: auto }` cuts "Movimento" mid-word at 375 and 360 and hides it at 320 (`nav-strips.png`).
- Fix: an edge fade or wrapping at 32rem. Not in scope for B3.

### F8 - P3 - [main]: literal backticks in the footer copy
- Evidence: "Fonte canônica: `tokens/mms-canonical.yaml`." renders with visible backticks (`c1440-b.png`, `c390-montage.png`). Fix: wrap in `<code>`.

## Bar summary

| Target | Total | Lowest | Open P0-P2 | Bar |
|---|---|---|---|---|
| Combined (what `main` becomes) | 42/50 | Acessibilidade 3 | F1 (P1) | not met |
| B3 alone (main tokens) | 41/50 | Acessibilidade 2 | F1, F2 (P1 each) | not met |
| B3 diff itself | n/a | n/a | none introduced | nothing to change in this branch |

## Process notes

- `ux-layout-contract.md` is provisional and unapproved, as it should be: an agent cannot approve it; PR review is the path. N1 needs the contract and it exists, so this is not a process failure. Its R1, R3-R6 and A1-A3 hold in my measurements; E5 does not hold below 357px (F3).
- `design-qa` should not start until F1 is fixed or excepted.

## Could not check

1. Arrow-key scrolling with real key events. My test set `scrollLeft` from script (37 of 37, page did not move) and Tab reach comes from the pack; the key-event probe was denied.
2. Forced-colors / Windows high contrast: not emulated. The loss of the ring is inferred from CSS, not rendered.
3. Screen readers and the browser accessibility tree; only computed attributes were read.
4. Safari, Firefox, iOS momentum scrolling, classic (non-overlay) scrollbars; headless Chrome ran with hidden scrollbars.
5. Real devices and OS font scaling (110-130% on Android is the likeliest way to land in the scroll state at 360px).
6. Hover, active and disabled states; dark-register contrast pairs beyond what the pack's `text-pairs-*.json` shows (not re-verified); reader task testing.

## Next action

1. Open a token slice for `--cluos-ring-focus` (F1), re-render combined, append the re-review here.
2. Merge B1 and B3 together.
3. Take F3 to F5 as follow-ups or record them as accepted.
