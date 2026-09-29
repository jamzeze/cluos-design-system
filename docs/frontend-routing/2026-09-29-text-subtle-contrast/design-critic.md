Result: blocked
Score: 40/50 on the combined render (this branch's `tokens.css` + the sibling's preview, on `origin/main`), lowest dimension: Clareza de interação 3/5 (Acessibilidade also 3/5)
Findings: nothing introduced by this branch is above P3, and finding B1 is cleared. The page-level bar fails on three P2 that are already on `origin/main`: F1 focus ring (no branch fixes it), F2 two status text pairs (fixed on PR #4), F5 sideways scroll at 375/360/320 px (fixed by the sibling; counts only for "this branch alone").

# design-critic: text-subtle contrast (B1), N3

Branch `agent/cluos-design-system/text-subtle-contrast-20260929`, commit `8c51bbd` on `origin/main` `3fc656f`. Independent review, 2026-09-29. The only repository file written is this one; scratch files are in the session scratchpad.

## Why blocked, and what it does not mean

- This branch's own diff introduces no P0, P1 or P2. It does what it claims: 14 elements of `DESIGN-preview.html` that wrote in `#A5A5A5` (2.05 to 2.46:1) now write in `#666666` (4.77 to 5.74:1), no other pixel moves, and the dark register is unchanged. Nothing in the diff has to change before merge. It does not go back to `frontend-craftsman` for a blocker; T1 is worth doing, T2 to T4 are optional.
- The bar is defined on the rendered page, so it fails on the combined render for reasons that are on `main` and outside both fixes. This is the same convention as rounds 1 to 3 of the PR #4 review ("no finding introduced by this diff is above P3; the bar fails on P2 already in origin/main").
- `combined` is what `main` becomes if B1 and B3 merge. It is not the page that clears the gate: the two status pairs of F2 are only fixed on PR #4, and the focus ring of F1 is fixed nowhere. My projection (separate audits, not a merged render): PR #4 + B1 + B3 leaves zero failing text and F1 as the only open item; with F1 fixed the scores would be about 42/50 with a lowest dimension of 4, at the bar and not above it.

## Bars in three states (same ten dimensions)

| State | Score | Lowest | Open P2 on the page | Bar |
|---|---|---|---|---|
| `combined` (B1 + B3 on `main`) | 40/50 | Interação 3, Acessibilidade 3 | F1, F2 | not met |
| This branch alone (`main` + B1) | 39/50 | Interação 3, Acessibilidade 3, Responsividade 3 | F1, F2, F5 | not met |
| `main` today | 38/50 | Acessibilidade 2 | B1 (14 subtle-text elements), F1, F2, F5 | not met |

Each fix alone leaves the other's defect, as the delegation said: `b1` still scrolls sideways by 14 px at 375, 360 and 320; the sibling's tokens are `main`'s, so it keeps the 14 subtle-text failures (the pack confirms it does not change `tokens.css`).

## 1. What I rendered and measured

`review-pack.sh` (scratch `SCR` = `/private/tmp/claude-501/-Users-rafacosta-Documents-GitHub-cluos-design-system--claude-worktrees-competent-proskuriakova-7879d6/b3fd690d-1562-4f2c-b9b6-46fb7cdd9a52/scratchpad/critic-b1/`). Copies checked with `cmp` (`b1 tokens.css = worktree 8c51bbd`, `b3 preview = 7da6f50`). Manrope and Instrument Sans loaded on every render.

- Page: `preview-{main,b1,b3,combined}-{1440,390,375,360,320}.png`. Specimen: `text-pairs-{main,b1}-{light,dark}.{png,json}`. I viewed `text-pairs-b1-light.png`, `text-pairs-b1-dark.png`, `montage-bands.png` (main above b1, the four bands of the pixel diff at 1440) and `montage-combined-mobile.png` (Estados table at 360 and 320, main against combined, and the focus on the table region at 390).
- My own DOM audit (`audit.js`, `post.py` in `SCR`): every visible text element, computed colour against the effective solid background (0 gradient or image backgrounds found), 4.5:1, or 3:1 for large text. Disabled controls are skipped.
- `npm test` in the worktree, and mutations on scratch copies.

Page size and sideways scroll (`scrollWidth` at 1440 / 390 / 375 / 360 / 320; height at 1440 / 390 / 375 / 360 / 320):

| Render | scrollWidth | Height |
|---|---|---|
| main | 1440 / 390 / 389 / 389 / 389 | 3541 / 7648 / 7573 / 7517 / 7507 |
| b1 | identical to main | identical to main |
| b3, combined | 1440 / 390 / 375 / 360 / 320 | 3541 / 7558 / 7528 / 7517 / 7507 |

At 320 the table, rows and cells of `b3` and `combined` are listed as past the viewport, but `scrollWidth` is 320: they sit inside the sibling's `.table-region` scroller. The `a` listed at 375, 360 and 320 is the last nav link ("Movimento", x 306 to 379), inside a `nav` with `overflow-x:auto` (F3).

DOM audit of computed contrast:

| Page | Text elements | Below AA | `#666666` uses (lowest) | `#A5A5A5` text left |
|---|---|---|---|---|
| main, 1440 and 375 | 100 | 16 (14 subtle, 2 status) | 0 | 14 |
| b1, 1440 and 375 | 100 | 2 (status only) | 14 (4.77, `th` on `#EAEAEA`) | 0 |
| combined, 1440 and 375 | 100 | 2 (status only) | 14 (4.77) | 0 |
| PR #4 tip `f312812`, 1440 | 100 | 14, all `#A5A5A5`; 0 status | 0 | 14 |
| `guides/mms-canonical-identity-proposal.html`, b1 tokens, 1440 | 104 | 2 (the same status pairs) | 12 (4.77) | 0 |
| `guides/mms-campaign-signal-prototype.html`, b1 tokens, 1440 | 68 | 1 (`−4,3%`, copper `#BD7845` on white, 3.54) | 9 (5.74) | 0 |

Author's claims that reproduce:
- Pixel diff main against b1: 7,206 px in 8 bands at 1440, 7,209 px in 12 bands at 390 and at 360; every band goes `#A5A5A5` to `#666666`; page sizes identical.
- Specimen ratios to two decimals: subtle light 5.74 / 5.74 / 4.77, disabled light 2.46 / 2.46 / 2.05 (exempt), subtle dark 5.69 / 5.57 / 4.96, disabled dark 3.35 / 3.38 / 3.19 (exempt). `design-decision.md` §2 and §7 match.
- `npm test`: 8 of 8. Mutations on scratch copies: light subtle at `#787878` fails "text tokens · light" and the mirror test; dark subtle alpha .54 to .40 fails "text tokens · dark", "palette values are frozen" and the mirror test; a no-op control passes 8 of 8. The test is not vacuous.
- Focus ring, computed by me from `#C4DB7B`: 1.53:1 on white, 1.27:1 on `#EAEAEA`, 1.00:1 on the primary fill. Source `tokens/tokens.css:123` (`--cluos-ring-focus: 0 0 0 2px var(--cluos-tech-green)`), role `--cluos-color-focus-ring` at line 213.

## 2. Identity test

1. Without logo and text, is it still CluOS? Yes. Hairline ledger, zero radius, deep navy and tech green, tracked uppercase 12px labels in Instrument Sans under Manrope headings (`preview-combined-1440.png`, `montage-bands.png`). This branch keeps the label tone on the palette's achromatic axis (`#EAEAEA`, `#A5A5A5`, `#666666`).
2. Could it belong to 500 startups? No, as a page. The one generic thing this branch adds is `#666666`, the web's default mid-grey; it sits under a distinctive structure and follows the existing neutral axis, so it is not a finding.
3. A clear visual idea? Yes, Swiss Ledger.
4. Does it convey the positioning? Partly assessable: this is a design-system reference page, not a command surface. It reads precise and quiet.
5. Does density match the task? Yes for a reference page. The changed labels are 12px, weight 550, .11em tracking, and are now legible.
6. Is the brand in composition and detail, or only in the primary colour? In composition and detail (lockup rule, hairlines, label system).
7. Elements that exist because a model puts them there? None added by this branch (it adds no element). None seen on the page.

## 3. Rubric (combined | this branch alone | main)

| Dimension | Combined | B1 alone | main | Evidence |
|---|---|---|---|---|
| Distinção de marca | 4 | 4 | 4 | Identity test 1, 3 and 6. Not 5: a reference page, and the label grey is the web default. |
| Hierarquia | 4 | 4 | 4 | Text 19.27, muted 14.32, subtle 5.74:1 on white; in `montage-bands.png` the labels (MARCA-BASE, DEEP NAVY, ELEMENTO) stay below the values and headings once legible. |
| Composição | 4 | 4 | 4 | Label column against value column, five-swatch strip, ledger table. The branch moves no geometry (heights identical). |
| Tipografia | 5 | 5 | 5 | Both fonts load on every render; scale and weight carry the hierarchy (`th`, `.token-name`: 12px / 550 uppercase). |
| Densidade | 4 | 4 | 4 | Proportionate for a reference page; unchanged. |
| Disciplina de tokens | 4 | 4 | 4 | Branch: the fix is in the token, zero consumers edited, 14 uses resolve through `var(--cluos-text-subtle)`, mirrors and test added (5 on its own). Page: `.surface p` uses the primitive `--cluos-neutral-100`, and legacy `--cluos-color-fg-muted` literals still fail (F4). |
| Economia de componentes | 5 | 5 | 5 | No component or ornament added; flat hairline structure. |
| Clareza de interação | 3 | 3 | 3 | Status text and markers are clear, but the focus indicator is 1.53:1 on white and equal to the primary fill (F1). Hover and button or link focus not rendered. |
| Acessibilidade | 3 | 3 | 2 | Subtle text: 14 failures to 0 (this branch). Open on the page: F1 (non-text contrast), F2 (two text pairs). Keyboard: the sibling's region is reachable (focus order in the pack ends nav, buttons, table region, replay button). |
| Responsividade/adaptação | 4 | 3 | 3 | Combined: no sideways scroll at 1440, 390, 375, 360, 320; the table reflows at 375 and 360 and scrolls inside its region at 320. Not 5: F3, S1. Alone or on main: `scrollWidth` 389 at 375, 360 and 320 (F5). |
| Total | 40 | 39 | 38 | |

## 4. Findings

### Introduced by this branch (all P3)

- T1 (P3). Light-register `--cluos-text-subtle` is now unsafe on dark panels, and nothing says so. Computed: `#666666` on `#010D28` 3.36:1 (was 7.82 with `#A5A5A5`); on `#132952` 2.49:1 (was 5.81). Every consumer I could render is clean (35 uses on the preview and the two guides, none on a dark surface). Grep of `examples/*.md` and `patterns/components.md`: 15 usage lines, none within 11 lines of a dark container (the "navy" hits are text colours). `npm test` and the new `DESIGN.md` sentence cover only `--cluos-bg`, `--cluos-bg-subtle` and `--cluos-bg-muted`. Impact: a future light-register navy panel that keeps a subtle label fails AA where it used to pass. Fix: one sentence in `DESIGN.md` and `patterns/accessibility.md`: on navy or medium-blue panels of the light register use `--cluos-text-on-navy` or the dark register; `--cluos-text-subtle` is for light surfaces.
- T2 (P3). `patterns/accessibility.md`, new contrast table, `--cluos-operational-teal` row: "só texto grande" while its own second column, 2.59:1 on `--cluos-bg-muted`, is below the 3:1 large-text minimum. The numbers are right (3.12 and 2.59, recomputed). Fix: "só texto grande, e só sobre `--cluos-bg`".
- T3 (P3). Governance. Rafael asked for the blocker to be fixed and did not choose the value; `design-decision.md` line 6, D4 and the `CHANGELOG.md` entry say `#666666` and the names are the agent's proposal and that merging approves them. `palette-decisions.yaml` was not touched. My judgement: this is honest and acceptable. `palette-policy.md` §2 (`preserve`) explicitly allows correcting contrast and building tonal scales, and §4 requires a logged decision for a new palette, not for a neutral step. Recording the value as a Rafael decision before he chose it would have been worse. The gap is real but small: the 2026-08-30 entry still lists `neutral-100` and `neutral-500` as the light register's neutrals, and the 2026-08-24 entry says no new colour enters, so after the merge the contract (`tokens/mms-canonical.yaml`) has a third neutral the log does not mention. Fix: state in the PR body that the value is a proposal for Rafael to accept or change, and add the log entry (`made_by: rafael`) when he approves. If the policy owner reads §4 as covering any new palette value, this becomes P2 and the fix is that one entry.
- T4 (P3, optional). `--cluos-text-disabled` has no rendered consumer: no state of `DESIGN-preview.html` uses it, so "disabled reads as disabled" is judged from the specimen only (light 2.05 to 2.46, dark 3.19 to 3.38). Fix, if wanted: one disabled control in the Estados section.

### Already on `main` (not introduced by this branch or the sibling)

- F1 (P2). Focus indicator below 3:1 (WCAG 1.4.11): 1.53:1 on white, 1.27:1 on `--cluos-bg-muted`, 1.00:1 on the primary fill (verified). `tokens/tokens.css:123`; the `styles.*.focusRing` mirrors carry `rgba(196, 219, 123, 0.72)`, fainter still. Rendered: the table region in `focus-combined-390.png` shows a pale green outline on white, visible but weak. The author's statement that every link and button uses it is not something I rendered. Severity P2 for consistency with rounds 1 to 3 (text at 2.05 to 2.46 was P2); it would be P1 if keyboard-only use were the task. This is a palette-role decision for Rafael, so it goes to him, not to the craftsman. One candidate to put in front of him: a two-ring `0 0 0 2px var(--cluos-white), 0 0 0 4px var(--cluos-medium-blue)` (`#132952` is 14.32:1 on white). The sibling's new focusable `div.table-region` uses the same ring, so B3 adds one more instance of F1 but does not cause it.
- F2 (P2). Two status text pairs: `span.status--error` "Negada" `#8A3A3A` on `#010D28`, 2.52:1; `span.status--warn` "Revisar antes de publicar" `#BD7845` on white, 3.54:1. Present on `main`, `b1` and `combined`; absent on the PR #4 tip (0 status failures). Owner: PR #4. The guide `mms-campaign-signal-prototype.html` has the same copper pair on "−4,3%" (3.54:1); whether PR #4 covers it I did not check.
- F5 (P2, "B3"). The Estados table scrolls the page sideways: `scrollWidth` 389 at 375, 360 and 320 px. Present on `main` and on `b1`; gone in `b3` and `combined`. Owner: the sibling.
- F3 (P3). At 375 and below the last nav link is cut at the right edge of a scrolling `nav` with no hint that it scrolls (Movimento, x 306 to 379 at 375).
- F4 (P3). Legacy styles A to E and G keep their own `--cluos-color-fg-muted` literals and they fail as text. Documented in `design-decision.md` D6 and §10; untouched.

### From the sibling, seen on the combined render

- S1 (P3). At 320 px the third column of the Estados table is clipped inside the scroller (by design; the region is focusable, with the F1 ring). Fine at 375 and 360 (`montage-combined-mobile.png`). The sibling's own diff is judged in its own review.

## 5. Not verified

- Hover, and focus on the preview's buttons and links. Only the table region was focused.
- A merged render of PR #4 + B1 + B3. The projection comes from separate audits. PR #4 and this branch both edit `tokens/tokens.css`, `tokens/tokens.js`, `tokens/tokens.ts`, `tokens/tailwind-preset.js` and `tokens/mms-canonical.yaml` (verified from the PR #4 diff stat; shared docs such as `CHANGELOG.md` and `DESIGN.md` were not checked); conflict resolution, and `npm test` after that merge, are unverified. Whichever merges second must rebase and re-run it.
- The dark register on a real page: `DESIGN-preview.html` has no dark toggle, so it is covered by the specimen only.
- `examples/*.md` and `patterns/*.md` were searched, not rendered. `tokens/tokens.ts` was not compiled. The author's PNGs in `renders/` were not opened; I used my own renders.
- Audit limits: 100 text elements per preview render, solid backgrounds only, states behind JavaScript (loading, replay) not triggered; the guides at 1440 only.
- Not done: real devices, zoom to 200%, forced colours, `prefers-contrast`, print. No consumer product installs the package (`AGENTS.md`).

## 6. Handoff

1. This branch: nothing has to change before merge. Do T1; T2 to T4 are optional. Put T3 in the PR body.
2. The reviewer gate for a task that renders `DESIGN-preview.html` stays closed until PR #4 (F2) and the sibling (F5) are merged and F1 is fixed or Rafael records an exception. F1 goes to Rafael.
3. After the merges, re-run `npm test` and re-render; append the next round below instead of overwriting this one.
