---
name: anti-ai-slop-frontend
description: Route CluOS interface changes by their actual impact on appearance, interaction, layout, screens or shared design foundations. Select the smallest sufficient frontend workflow before implementation. Skip backend-only work and terminology-only mentions; send review-only requests directly to the appropriate reviewer.
---

# anti-ai-slop-frontend

Classify and hand off; implementation belongs to `frontend-craftsman`, layout
to `ux-layout-architect`, rendered critique to `design-critic` and target
comparison to `design-qa`. Select automatically by purpose, including Portuguese.
Skill maintenance itself is an instruction task, not a UI redesign.

## Resolve the task

Use the user's request, current scope and inspected target. UI words in a
question, quoted file or log do not activate an implementation workflow.
For review only, invoke the appropriate reviewer; if fixes are authorized,
classify those fixes before implementation. Backend-only work exits here.
A domain/state/calculation change with an existing rendered representation
may be `N-skip`; it retains engineering checks and rendered verification.

Reuse the known surface and decisions during continuations. Inspect the named
component, callers or existing render when that resolves uncertainty. Ask one
short question only if missing scope or a consequential preference still changes
the route. Offer 2–3 choices when genuinely different approaches need Rafael's
choice; normal skill invocation and an already approved contract need no new gate.

## Support and classification

Resolve the installed support pair `../../shared/cluos-design-system` and
`../../profiles/cluos-design-system/cluos`, or the canonical pair `../../shared`
and `../../profiles/cluos`. Use the first complete pair. If incomplete, report
the missing path; do not invent rules or claim validation.

Read `routing-matrix.yaml` once. Choose the **highest impacted scope**, using its
precedence, predicates and conditional flow. A one-line edit to a shared token
or primitive is systemic. Applying an existing token to one local element is
not a token-definition change. Shared scope must be supported by source/callers,
not guessed from the word “component.”

Load only the selected level's required support. Test cases live outside the
runtime matrix. Reuse loaded material and the task's artifacts; reclassify only
when scope changes. Classification has no fixed tool-call cutoff: stop gathering
when the route is supported. Keep `N-skip`/`N0` to a concise decision and checks;
N1+ produces only the artifacts required by its route.

## Invariants

- Preserve `cluos-mms-v1`: light Swiss Ledger, Manrope + Instrument Sans,
  deep navy/medium blue structure, tech-green positive action and operational
  teal for execution. Use semantic tokens and the current profile decision;
  superseded palette examples do not override it. Another direction requires
  an explicit opt-out recorded in `design-decision.md` and `palette-decisions.yaml`.
- Judge the task, legibility, information relationships, honest states and
  accessibility. Follow `anti-slop-rubric.md`; visual novelty alone is not quality.
  Keep real behavior functional and critical information available.
- Gallery is conditional on a recorded comparison or explicit opt-out. Preserve
  manual-only third-party skills. Routing grants no new permissions, hooks,
  background processes or authority to broaden the task.
- Use an existing valid layout contract; create/update one when the matrix
  requires it. Structural blockers remain blockers. “Approved” does not mean
  asking again for routine choices within the user's established scope.

## Output and handoff

`N-skip`/`N0`: one line, `Nível: <level> — <observed reason>`; no routing file.
For N1+, create/update `docs/frontend-routing/<YYYY-MM-DD>-<slug>/routing.md`
in the consuming repo with these fields:

```
Level: N1 | N2 | N3
Why: <observed impact, target and relevant shared consumers>
Skills: <applicable flow in order>
Loads: <support actually read>
Layout contract: required | not applicable | <path>
```

Keep later artifacts in that directory. Follow the matrix's applicable skills,
not just their names. N3 is led by `design-system-refactor-director`. N1+ closes
with `design-critic → design-qa → verification-before-completion`; use available
reviewer subagents with fresh context, otherwise disclose the inline review.

For changed interfaces, open the rendered result and exercise the affected
behavior/states at relevant sizes, with keyboard or reduced-motion checks when
applicable. Record what was actually verified. Build, screenshots or aesthetic
scores alone do not prove functional or accessibility compliance. If rendering
is unavailable, report that validation gap and the concrete blocker; complete
independent checks without claiming the UI passed. A production mock replacing
real behavior requires clarification of scope before that change.
