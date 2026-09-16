# Evidence and provenance

This skill synthesizes public standards, official guidance, and open-source
design references. Its wording and contract are original; no external skill was
copied wholesale.

## Normative accessibility layer

- [WCAG 2.2 — Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html): focus sequence must preserve meaning and operability.
- [W3C — Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html): source order must preserve the intended reading sequence.
- [W3C — Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/): related form controls need perceivable and programmatic grouping.
- [W3C ARIA APG — Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/): Tab moves among composite components while component-specific keys operate within them.
- [WCAG 2.2 — Error Prevention](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data.html): consequential submissions need review, correction, confirmation, or reversibility.

Operational use: keep visual, DOM, reading, and focus order coherent; preserve
semantic relationships; define keyboard behavior; make high-consequence actions
reviewable and recoverable.

## Task and human-factors layer

- [FDA — Applying Human Factors and Usability Engineering to Medical Devices](https://www.fda.gov/media/80481/download): identify intended users, use environments, critical tasks, and safety-related use errors; validate with representative users and realistic scenarios.
- [NISTIR 7804 — EHR Usability Protocol](https://www.nist.gov/publications/nistir-7804-technical-evaluation-testing-and-validation-usability-electronic-health): evaluate realistic clinical tasks, patient identification, data accuracy, and workflow safety.
- [ONC SAFER — Patient Identification](https://healthit.gov/wp-content/uploads/2025/06/Safer-Guide-6.-Patient-Identification-Final.pdf): make patient identity consistent and visible in clinical contexts.
- [ONC SAFER — CPOE](https://healthit.gov/wp-content/uploads/2025/06/SAFER-Guide-3.-CPOE-Final.pdf): expose incomplete orders and use clinically relevant, actionable safeguards.
- [ONC SAFER — Test Results Reporting](https://healthit.gov/wp-content/uploads/2025/06/SAFER-Guide-8.-Test-Results-Reporting-Final.pdf): preserve pertinent comparison data and distinguish abnormal from critical states.

Operational use: rank elements by task value and cost of error, keep safety
scope persistent, co-locate evidence with decisions, and validate critical tasks
under interruption and time pressure.

## General service and form patterns

- [GOV.UK Design Principles](https://www.gov.uk/guidance/government-design-principles): begin with user needs and design from evidence.
- [GOV.UK Question Pages](https://design-system.service.gov.uk/patterns/question-pages/): one question per page suits linear tasks, but related content may need to stay together.
- [USWDS Form](https://designsystem.digital.gov/components/form/): use predictable labels, grouping, errors, and form structure.

Operational use: use staged flows only when the task is actually sequential;
keep interdependent comparison work co-visible.

## Open-source skill research

Sources were inspected for methods and market coverage, not installed as
runtime dependencies:

- [Thinking Machines Inkling](https://thinkingmachines.ai/model-card/inkling/)
  and the [Inkling launch note](https://thinkingmachines.ai/news/introducing-inkling/)
  — useful as a possible model or agent-harness substrate; not a replacement
  for a layout contract, clinical task analysis, or rendered UX review.
- [Open Design](https://github.com/nexu-io/open-design) — local-first design
  agent/runtime with skills, CLI, MCP, and plugin-spec surfaces; useful for
  artifact generation or design-system package experiments, not required as a
  dependency for this placement skill.
- [Owl Listener Designer Skills](https://github.com/Owl-Listener/designer-skills) — MIT; information architecture, flow, hierarchy, grid, and wireframe methods.
- [Wondel UX Heuristics](https://github.com/wondelai/skills) — MIT; discoverability, mapping, feedback, and heuristic review.
- [Dembrandt Skills](https://github.com/dembrandt/dembrandt-skills) — MIT; coordinated data views, expert operational UI, and density patterns.
- [Cognitive Walkthrough skill](https://github.com/mastepanoski/claude-skills) — MIT; action-by-action goal, discovery, association, and feedback questions.
- [Impeccable](https://github.com/pbakaus/impeccable) — Apache-2.0; post-structure critique, layout refinement, and visual polish.

Do not invent success percentages from heuristic walkthroughs. Measured claims
require observed users, a stated protocol, and recorded evidence.

## Adjacent tools assessed

- [Inkling](https://thinkingmachines.ai/inkling/) is an open-weight multimodal
  model family, not a task-to-placement UX method. It may be evaluated as a
  model/runtime choice, but it does not replace this contract or belong in the
  layout skill chain by default.
- [Open Design](https://github.com/nexu-io/open-design) is an artifact-first
  design workbench that can generate files and refactor real code. Treat it as
  a mutating concept/prototype lane: pin the version, use a sandbox and
  synthetic data, apply a strict tool allowlist, and do not mount the Azigos
  repository or clinical data in an initial pilot.
- [Impeccable](https://github.com/pbakaus/impeccable) remains useful after the
  layout contract for critique, hierarchy refinement, and visual polish. It
  should not independently redefine the approved task topology.
- `ui-ux-pro-max` remains a targeted pattern lookup source. It can answer a
  bounded pattern question but cannot select topology or override product and
  clinical invariants.
