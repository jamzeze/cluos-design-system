# Anti-Slop Rubric — CluOS

Apply to the affected surface using its task, current visual contract and
rendered evidence. Familiar controls are useful when they fit the task;
novelty, minimalism or a high aesthetic score alone does not prove usability.
These are local product criteria, not a WCAG certification or measured user study.

## Identity test (seven evidence-based questions)

| Check | Question |
|---|---|
| Identity | Does composition express the current CluOS contract beyond the logo? |
| Task | Does the structure help this product's actual task instead of a generic template? |
| Hierarchy | Are dominant intention and one primary action per region clear? |
| Density | Is density appropriate to the task and supported device? |
| Relationships | Are critical state, evidence and consequences visible next to the decision? |
| Economy | Does each element have a useful function, with secondary detail disclosed progressively? |
| Behavior | Do real interactions, honest states and recovery work as represented? |

Prefer the current `cluos-mms-v1` profile over superseded palette examples.
Professional users may need dense tables or coordinated views; neither uniform
cards nor an empty single column is a universal answer. For each consequential
design choice, identify the task it helps. Preserve critical information and
real behavior, including applicable loading, empty, error and unavailable states.

## Scoring (0–5 each, 50 total)

| Dimension | 0–1 | 2–3 | 4–5 |
|---|---|---|---|
| Identidade | Direção genérica ou incompatível | Identidade parcial | Contrato vigente reconhecível na composição e nos detalhes |
| Hierarquia | Pesos sem prioridade | Próxima ação pouco clara | Intenção dominante e ação primária clara por região |
| Composição | Forma atrapalha a tarefa | Agrupamento parcialmente útil | Relações e evidências necessárias permanecem próximas |
| Tipografia | Ilegível ou arbitrária | Escala parcialmente coerente | Famílias/tokens canônicos, hierarquia e leitura funcionais |
| Densidade | Oculta ou dispersa informação | Exige esforço evitável | Proporcional à tarefa e ao dispositivo |
| Tokens | Valores arbitrários | Drift demonstrável | Papéis semânticos e contrato respeitados |
| Economia | Ornamento/contêiner sem função | Redundância relevante | Cada elemento tem função observável |
| Interação | Fluxo ou estado engana/falha | Recuperação ou foco inconsistentes | Estados, ação, feedback e recuperação verificados |
| Acessibilidade | Barreira crítica | Critério aplicável falha | Critérios aplicáveis verificados, com escopo declarado |
| Adaptação | Quebra ou perde conteúdo | Funciona com problemas | Ordem e informação preservadas nos tamanhos suportados |

Approval remains **≥42/50, no dimension below 4, no open P0/P1/P2**. Attach
file/selector plus observed evidence to every score; mark missing verification
as unverified and withhold approval. A source reference or screenshot cannot
prove keyboard behavior, state transitions or complete WCAG conformance.
Do not invent scores to satisfy the threshold or use it as a user-research metric.

- **P0:** essential task blocked, severe accessibility failure, unusable layout.
- **P1:** substantial usability, hierarchy, identity or safety failure.
- **P2:** demonstrated inconsistency or visual drift with concrete task/contract impact.
- **P3:** optional refinement or preference; does not block handoff.

Correct P0/P1/P2, re-render the affected result, recheck the changed evidence
and retain review history. Do not turn taste-only suggestions into blockers.

## Patterns requiring a task-based justification

These are banned as **unjustified defaults**, not reasons to replace suitable
existing controls. Record a necessary exception briefly in the existing task
artifact; changing the approved visual identity still requires explicit opt-out.

| Risk | Prefer |
|---|---|
| Centered generic hero, identical card triplets, uniform grid despite different priorities | Hierarchy and rhythm derived from the content and task |
| Cards inside cards, every row/metric boxed, excessive whitespace in operational views | Grouping → alignment → typography → spacing → separator → surface → border → necessary shadow |
| Brand color for every state; decorative neon, glow, glass or dark-violet “tech” styling | Canonical semantic roles; color carries state, action or orientation |
| Oversized headlines, tiny body text, arbitrary fonts/weights, disconnected scales | Canonical typography, readable lines and appropriate tabular numbers |
| Decorative icon on every title, emoji as product icons, unlabeled critical symbols | Existing approved assets and explicit action labels |
| Generic copy or invented logos, testimonials, metrics, savings or clinical data | Product vocabulary; PT-BR verb + object; minimal synthetic examples clearly labeled |
| Floating/parallax decoration, delays or movement competing with work | Motion that explains change; functional reduced-motion alternative |

## Rendered verification

Exercise the changed user task and relevant states. Inspect supported narrow
and wide layouts; preserve reading/DOM/focus order, critical information and
co-visibility. Identify page/component, viewport, state, test and result in the
existing review artifact. Rendering unavailable means unverified, not passed.

For affected controls, check applicable **WCAG 2.2 AA** requirements, including
keyboard access, accessible names/labels, text and non-text contrast, visible
focus (2.4.7), focus not entirely obscured (2.4.11), and target size or a valid
spacing/other exception (2.5.8). A static screenshot or automated scan alone is
insufficient. Confirm dialog focus entry, containment and return when relevant;
hover-only actions must remain usable by keyboard and touch.

Measure contrast on actual foreground/background/state pairs. A canonical
token is not an accessibility exemption. Prefer another valid semantic pairing
within the contract; if the foundation itself must change, report the evidence
and route that authorized repair as N3. Do not silently invent a local palette
or mark the issue passed to preserve visual fidelity.

CluOS additionally requires meaningful reduced-motion behavior: enable
`prefers-reduced-motion: reduce` and exercise animated interactions. Preserve
function and information while suppressing non-essential motion. This is a
product requirement; WCAG 2.3.3 is AAA, not AA. Do not confuse other AAA criteria
with mandatory AA requirements.

## Current references (checked 2026-10-12)

Consult for criterion details or a disputed interpretation, not every N0 task:
[WCAG 2.2](https://www.w3.org/TR/WCAG22/),
[reduced-motion technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html),
[GOV.UK design principles](https://www.gov.uk/guidance/government-design-principles).
This file contains the operative anti-slop rules; no personal Downloads file
is required. Standards inform validation; CluOS identity remains canonical.
