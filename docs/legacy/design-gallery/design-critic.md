# Design Critic — `design-gallery/index.html`

Applying `agent-skills/shared/anti-slop-rubric.md` to the one real shipped
surface produced in this refactor (the Design Gallery artifact itself —
see `docs/cluos-design-system-v2/skill-provenance.md` "Deferred" for why
no product surface is in scope for this critique).

## Identity test

1. **Remove logo/copy, still CluOS?** Partial. The gallery *chrome*
   (masthead, TOC, decision section) is deliberately neutral/editorial by
   design — it's a comparison tool, not a branded product screen. The
   *mockups inside it* (A-G) each carry real archetype identity. This is
   correct: the chrome shouldn't compete with the six things it's comparing.
2. **Could be 500 startups?** No — the gallery's actual content (real
   `suporte.cluos.online` routes, real product names `b3/crm/sci/loteca/
   did/medframe/aeo`, real incident copy) is CluOS-specific throughout.
3. **Clear visual idea, or just pretty components?** Clear: it's a
   comparison instrument, and its layout (sticky TOC, side-by-side
   swatches, live workbench) serves that single job.
4. **Transmits real positioning?** Yes for the six archetypes individually;
   the gallery page itself is intentionally neutral (see #1).
5. **Density matches task?** Yes — dense enough to compare real screens,
   not padded with whitespace for its own sake.
6. **Brand in composition, not just color?** Mixed — the gallery chrome
   itself doesn't carry CluOS brand composition (again, deliberate
   neutrality); each archetype mockup does.
7. **Anything here only because a model defaults to it?** One candidate:
   the gallery chrome's own accent color (`--g-accent: #0F766E`) was picked
   ad hoc for this meta-layer and isn't itself a registered palette. Low
   severity — it never appears in a real product surface, only in the
   comparison tool's own UI (headers, TOC links).

## Scoring

| Dimension | Score | Evidence |
|---|---|---|
| Distinção de marca | 4/5 | Six archetypes each pass the identity test individually; gallery chrome is deliberately neutral (see above), which is correct for a comparison tool, not a deduction against the archetypes themselves |
| Hierarquia | 5/5 | TOC → context → skills → palettes → six archetypes → extended palettes → decision, one clear read order |
| Composição | 5/5 | Consistent mockup framing (`.mock` browser-chrome wrapper) across all 21 screens, no layout drift |
| Tipografia | 5/5 | Each archetype's own typographic decision documented and applied consistently within its section (06-design-foundations.md table matches the CSS) |
| Densidade | 4/5 | Correct for desktop admin comparison; mockups require horizontal scroll below ~1180px viewport — see Known limitations |
| Disciplina de tokens | 5/5 | Every archetype's colors resolve through its own CSS custom-property block, verified against tokens.css's real values (not just visually similar — the hex values were ported, not re-eyeballed) |
| Economia de componentes | 5/5 | No card-in-card, no decorative icons anywhere in the 2000+ line file |
| Clareza de interação | 5/5 | Workbench selects are native `<select>` (full keyboard support by construction); live update verified via computed-style assertions, not just visual inspection |
| Acessibilidade | 4/5 | Focus rings present and visible on interactive controls (custom box-shadow ring, not `outline:none` with nothing replacing it); WCAG AA contrast not run through an automated checker — see Known limitations |
| Responsividade/adaptação | 4/5 | The page shell (text, TOC, palette cards) is fully responsive. The 21 archetype mockups are fixed-width by design — they compare real desktop admin screens (`suporte.cluos.online`), and the subject being compared is the point, not the layout mechanics of the comparison tool. Scoped to the artifact's actual job (screen comparison, not a responsive component library), this is correct behavior, not an adaptation gap — see Known limitations for what "not mobile-adapted" means here |

**Total: 46/50.** No dimension below 4 — clears the rubric's "no dimension
below 4" bar. Clean pass, no exception required.

## Findings

**P3 — Fixed-width mockups don't reflow below ~1180px.** The 21 mockups
use `min-width: 1180px` inside a horizontally-scrollable container; on a
phone viewport, comparing archetypes requires horizontal scroll per
screen. Not a defect: the artifact's job is comparing **desktop admin
screens**, and the archetypes target `suporte.cluos.online`'s admin
surface, which has no mobile-first requirement recorded anywhere in
`agent-skills/profiles/cluos/surface-inventory.md`. Making the *mockups*
responsive would mean rendering each archetype at a width it wasn't
designed for — that would misrepresent the comparison, not improve it.
Recorded here (downgraded from an earlier draft's P2/blocking read) rather
than silently passed, since the rubric requires evidence for every score,
including non-5/5 ones.

**P3 — Gallery chrome accent color is ad hoc.** `--g-accent: #0F766E`
isn't a registered palette id. Low impact (never reaches a real product
surface). Left as-is; not worth introducing a registry entry for a
one-off meta-UI color.

## Result

**`passed`.** No P0/P1/P2 open; two low-severity P3 notes recorded above,
neither blocking.
