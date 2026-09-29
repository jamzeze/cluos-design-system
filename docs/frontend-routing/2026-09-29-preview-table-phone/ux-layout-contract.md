# UX Layout Contract — DESIGN-preview.html · Estados table on narrow screens

Contract: UXLayoutContractV1
Contract ID: cluos-design-system/design-preview/estados-table
Revision ID: r1
Status: provisional
Approved by: unset
Approved at: unset

Written by the agent on 2026-09-29 for branch `agent/cluos-design-system/preview-table-phone-20260929`. An agent cannot approve a contract; review of the pull request is the approval path.

## Job and risk

User: a designer, developer or agent reading the canonical specimen to learn how each element is treated.
Moment/environment: reference lookup on desktop, on a phone (360px to 390px), or on desktop at 400% zoom (a 320px layout viewport).
Primary job: for each element, compare the canonical treatment with what to avoid.
Entry → completion: arrive at section 04 · Estados → read each row: element, treatment, avoid.
Repeated-use loop: return to the table while building or reviewing a screen.
Highest-cost errors: the "Evitar" column clipped or pushed off-screen, so the reader adopts a banned pattern; the whole page scrolling sideways, which moves every section off its gutter.
Non-goals: table content, typography, colour, other sections, the system focus token.

## Task flow

| Step | User question/decision | Input/evidence | Action | Result/recovery |
|---|---|---|---|---|
| 1 | Which element am I building? | Column "Elemento" | Scan the first column | Row found |
| 2 | How is it treated? | Column "Tratamento canônico" in the same row | Read across | Treatment known |
| 3 | What must I avoid? | Column "Evitar" in the same row | Read across | Banned pattern known; if the table does not fit, scroll it inside its region |

## Element placement matrix

| Element ID | Element | P0–P3 | Frequency/risk | Related/co-visible with | Zone | Visibility | States | Visual order | DOM/focus order | Responsive behavior | Rationale |
|---|---|---|---|---|---|---|---|---|---|---|---|
| E1 | Section head (kicker, h2, lede) | P1 | every visit | E2, E3 | Z1 | persistent | static | 1 | 1, no focus stop | stacks at ≤48rem (existing) | unchanged |
| E2 | Three state cards | P1 | every visit | E1 | Z2 | persistent | static; card link focusable | 2 | 2 | one column at ≤48rem (existing) | unchanged |
| E3 | Table region (new wrapper) | P1 | every visit | E4, E5 | Z3 | persistent | focusable; scrolls only when the table is wider than the region | 3 | 3, one focus stop after the card link | full width of the shell content box at every width | lets the table scroll instead of the page |
| E4 | Header row: Elemento, Tratamento canônico, Evitar | P1 | every visit | E5 | Z3 | persistent | static | inside E3 | inside E3 | three columns at every width | column labels |
| E5 | Body rows: element, treatment, avoid | P1 | every visit | E4; the three cells of a row must stay co-visible | Z3 | persistent | static | inside E3 | inside E3 | three columns at every width; inline padding `--cluos-space-2` below 32rem | the comparison is the point of the table |

## Topology decision

Recommended topology: table-first, unchanged.
Why it fits: four elements compared on the same two attributes; reading across a row is the task.
Alternatives rejected and why:
- Stacked cards per row below a breakpoint: loses the column comparison, needs duplicated labels (`data-label` or generated content) and can drop table semantics in some browsers.
- Hiding the "Evitar" column: removes half of the comparison.
- `overflow-wrap: anywhere` on cells: the table layout then ignores word boundaries and breaks words that would fit.

## Screen zones

| Zone ID | Order | Zone | Purpose | Contains | Excludes | Persistent? |
|---|---|---|---|---|---|---|
| Z1 | 1 | Section head | orient | E1 | table | yes |
| Z2 | 2 | State cards | show the three state treatments | E2 | table | yes |
| Z3 | 3 | Table region | treatment reference | E3, E4, E5 | page-level scrolling | yes |

## Action hierarchy

| Action ID | Action | Object/consequence | Placement | Emphasis | Guard/recovery |
|---|---|---|---|---|---|
| X1 | Scroll the table horizontally | E3, only when the table is wider than the region | inside E3; pointer, touch, or arrow keys after focusing E3 | none | none needed: read-only |

## Structural rules

| Rule ID | Invariant | Applies to | Validation |
|---|---|---|---|
| R1 | The page never scrolls horizontally because of the table: `scrollWidth` equals `innerWidth` at 320px, 360px, 375px, 390px and 1440px | page | DevTools probe at each width |
| R2 | The three columns keep their DOM and visual order at every width; no column is hidden | E4, E5 | render at each width |
| R3 | Below 32rem, cell inline padding is `var(--cluos-space-2)`; block padding stays `var(--cluos-space-4)` | E4, E5 | computed style probe |
| R4 | When the table is wider than the region, the region scrolls and the table is not clipped by the page | E3 | probe at 320px, with and without the bundled fonts |
| R5 | At 1440px the render is pixel-identical to `main` | page | pixel diff |
| R6 | The region's box stays within the shell's content box (16px gutters at ≤48rem) | E3 | probe of the region's left and right edges |

## Responsive transformation

Desktop: unchanged.
Tablet (≤48rem): unchanged; the shell gutter is 16px (existing rule).
Narrow/mobile (≤32rem): cell inline padding drops to `var(--cluos-space-2)`. With the bundled fonts the table fits without scrolling down to a viewport of about 357px. Below that, and whenever the fonts fall back to wider system fonts, the table scrolls inside E3 and the page does not.
Unsupported unsafe tasks, if any: none.

## Accessibility order

| Rule ID | Area | Required order/behavior | Validation |
|---|---|---|---|
| A1 | E3 | DOM and focus order: after the last state card link, before the section 05 button | tab order probe |
| A2 | E3 | `role="region"`, `aria-label="Tratamento canônico por elemento"`, `tabindex="0"`, so keyboard users can scroll it; focus shows `var(--cluos-ring-focus)` like every other focusable element of the preview | markup review and focus render |
| A3 | E4, E5 | table semantics unchanged: `th scope="col"`; the region wraps the table and does not change its display | computed `display: table` on the table |

The ring token itself measures 1.53:1 against white, below the 3:1 of WCAG 1.4.11. That is a property of `--cluos-ring-focus` on `main`, shared by every focusable element of the preview, and outside this contract.

## States and recovery

| State ID | State | Visible location | User action | Data/focus recovery |
|---|---|---|---|---|
| S1 | Fits | E3 | read | n/a |
| S2 | Wider than the region | E3, right edge clipped by the region | scroll the region | scroll position is local to E3; the page keeps its position |

Loading, empty, error and permission states do not apply: the specimen is static content.

## Validation and blockers

Evidence inspected: `DESIGN-preview.html` on `origin/main@3fc656f` rendered through the DevTools protocol at 320px, 360px and 390px. The table's minimum width is 372.9px: widest words 76.7px ("Elemento"), 95.5px ("Tratamento") and 104.7px ("Copper/oxblood"), plus 96px of inline cell padding. At 360px `scrollWidth` is 389; the only other element past the viewport is a nav link inside its own scroller.
Checks passed, on the implementation (`measurements.md`): R1 at 320px, 360px, 375px, 390px and 1440px with bundled and fallback fonts; R2; R3; R4 at 320px; R5 with both font sets; R6; A1; A2 (the ring is the system token); A3. Validation tests 1 to 7 of the skill: trunk, squint and relationship unchanged from `main`; no critical action in scope; keyboard order passes; states S1 and S2 render; responsive passes.
Not yet validated: representative task testing with readers; Safari and Firefox keyboard behaviour.
Open blockers/decisions: approval of this revision.

## Handoff

Next skill: frontend-craftsman.
Structural constraints to preserve: R1 to R6, A1 to A3; no content, typography or colour change; no change outside section 04 at desktop.
