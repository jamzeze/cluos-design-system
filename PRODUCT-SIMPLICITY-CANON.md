# Product Simplicity Canon — CluOS

This document is canonical for every CluOS product, new project, UI refactor, repository redesign, dashboard, admin panel, internal tool, and customer-facing workflow.

It must be read together with:

1. `DESIGN.md` — visual identity, typography, colors, spacing, radius, shadows, motion.
2. `APPLE-INSPIRED-PRODUCT-UX.md` — UX principles and anti-patterns.
3. `PRODUCT-PATTERNS.md` — reusable page and product patterns.
4. `patterns/` — component, state, accessibility, and content rules.

No CluOS product should invent its own visual language, navigation philosophy, spacing system, typography scale, state model, or interaction pattern from scratch.

---

## 1. Goal

The goal is to reduce cognitive load, remove unnecessary complexity, improve perceived quality, and make the main user action obvious.

The product should feel Apple-like:

- calm
- clear
- focused
- elegant
- fast
- forgiving
- predictable
- visually consistent

Do not make the product ultra-minimalist if this removes useful context. Use progressive disclosure: show what matters now, hide what matters later.

Simplicity is not the absence of information. Simplicity is the correct ordering of information.

---

## 2. Canonical Product Rule

Every screen must answer:

1. What is this screen for?
2. What should the user do next?
3. What information is essential now?
4. What can be hidden, moved, collapsed, delayed, or removed?
5. What can break if this is simplified?

If a screen cannot answer these questions, it must be redesigned, merged, or removed.

This rule applies before creating new screens, modifying existing screens, adding navigation, adding dashboards, adding forms, adding filters, adding cards, adding tables, or exposing technical details.

---

## 3. Execution Mode for Product Work

For every new product, feature, redesign, or UI refactor, the agent must work in this order:

1. Read `DESIGN.md`, this file, `APPLE-INSPIRED-PRODUCT-UX.md`, `PRODUCT-PATTERNS.md`, and the relevant files in `patterns/`.
2. Identify the main user, main workflow, and main decision the product must support.
3. Define the primary action for each screen before designing components.
4. Map protected functionality that must not break, including authentication, authorization, LGPD/data privacy, integrations, database contracts, production deploy paths, and business-critical automations.
5. Identify information that is operational, managerial, technical, or rare.
6. Place operational information in the daily workflow.
7. Move managerial information to dashboards.
8. Move technical configuration, logs, IDs, webhooks, pipeline internals, and diagnostics to settings, integrations, or collapsed technical details.
9. Remove, merge, or hide screens that do not support a clear user decision.
10. Propose the simplification before implementation when the change affects navigation, core flows, product structure, or feature visibility.

The agent must not start a broad UI refactor by changing colors or components first. Product structure comes before decoration.

---

## 4. Visual Foundation

Every CluOS interface must use the CluOS design system:

- Typeface: Inter for UI and content.
- Monospace: JetBrains Mono only for code, logs, IDs, and technical snippets.
- Accent: `var(--cluos-teal)` only.
- Primary text: `var(--cluos-navy)` / `var(--cluos-text)`.
- Backgrounds: `var(--cluos-bg)`, `var(--cluos-bg-subtle)`, `var(--cluos-bg-muted)`.
- Status: semantic tokens only: success, warn, error, info.
- Spacing: `var(--cluos-space-*)` only.
- Radius: `var(--cluos-radius-*)` only.
- Shadows: restrained, token-based, and secondary to borders.
- Motion: short, calm, state-driven, and compatible with `prefers-reduced-motion`.

Do not hardcode raw hex colors, arbitrary pixel spacing, unapproved font stacks, heavy shadows, decorative gradients, or new accent colors.

---

## 5. Information Architecture

A CluOS product should be organized around user decisions, not database tables or backend modules.

Prefer:

- action queues over generic dashboards for daily operations
- dashboards only when they help management decide
- detail drawers over separate pages when context matters
- collapsed technical details over visible logs
- simple filters over complex query builders
- workflow steps over scattered tabs
- one stable global navigation with no more than 5–7 primary items

Avoid:

- exposing implementation architecture as navigation
- using pipeline steps as product tabs
- placing logs on the primary screen
- showing all metrics upfront
- opening with a chart dashboard when the user needs a next action
- creating separate screens for small variants of the same task
- adding tables without row-level actions

---

## 6. Screen Model

Each screen should have:

1. Clear title: 3–7 words.
2. Useful subtitle: current state, scope, or purpose.
3. One dominant action in the main region.
4. Essential status visible without scrolling.
5. Secondary details progressively disclosed.
6. Loading, empty, error, success, and disabled states.
7. Recovery path for every failure.
8. No technical jargon unless the user is in a technical area.

Every screen must pass the 3-second clarity test:

- Where am I?
- What is happening?
- What should I do next?

---

## 7. Component Behavior

Use components to clarify decisions, not to fill space.

### Buttons

- One primary button per visual region.
- Button text must be verb + object when possible: `Salvar alterações`, `Gerar vídeo`, `Publicar conteúdo`, `Abrir lead`.
- Do not use vague labels such as `OK`, `Enviar`, or `Confirmar` when the object is unclear.

### Cards

- Cards exist to group a decision or status.
- Do not wrap every element in a card.
- Interactive cards must have clear hover/focus states.

### Tables

- Tables are for comparison and dense operational review.
- Every table must have row-level actions or a clear reason to exist.
- Bulk actions appear only when rows are selected.

### Forms

- Labels are mandatory.
- Placeholders are hints, not labels.
- Advanced fields collapse by default.
- Validation is inline and human.
- Do not ask for fields before they affect the workflow.

### Dashboards

- A dashboard must answer: what changed, what matters, and what action should be taken.
- Metrics without decision value should be removed, delayed, or moved to a secondary view.

---

## 8. Progressive Disclosure Rules

Show first:

- next action
- user-relevant status
- pending items
- current owner/responsible person
- outcome or expected result
- concise explanation

Hide by default:

- raw logs
- UUIDs and internal IDs
- webhook payloads
- stack traces
- database fields
- pipeline internals
- advanced configuration
- rare actions
- historical detail not needed for the current decision

Hidden does not mean unavailable. Advanced users can access details through accordions, drawers, secondary pages, or technical details panels.

---

## 9. Quality Gates

Before shipping a CluOS UI or product refactor, verify:

- The main action is obvious.
- Navigation has been reduced as much as possible without hiding necessary workflows.
- The screen does not expose backend structure as UI.
- The user can recover from errors.
- All dynamic states exist.
- Visual hierarchy uses the design system tokens.
- Typography, spacing, colors, borders, radius, shadows, and motion follow `DESIGN.md`.
- The UI remains functional without decorative animation.
- The product does not require memorizing where things are.
- Important functionality was preserved and tested.

For refactors, also produce a before/after note:

1. What was removed.
2. What was merged.
3. What was hidden.
4. What was moved.
5. What core behavior was preserved.
6. What risks remain.

---

## 10. CRM Pilot Interpretation

For `crm-cluos`, the first screen should not be a generic dashboard.

The CRM home screen should be an operational action queue answering:

> Who needs attention now, why, and what is the next best action?

Recommended CRM structure:

1. `Hoje` / action queue — leads needing action, priority, reason, next step.
2. `Leads` — searchable list, filters, lead detail, timeline, funnel stage.
3. `Automações` — GPTMaker, webhooks, ingestion, qualification rules, failed events.
4. `Dashboard` — conversion, sources, bottlenecks, lost leads, performance by doctor/owner.
5. `Configurações` — users, permissions, integrations, technical settings.

Preserve lead ingestion, GPTMaker integration, webhook contracts, automatic qualification, funnel/status management, authentication, database integrity, deploy compatibility, and LGPD-safe behavior.

---

## 11. Product Anti-Patterns

These are not allowed in CluOS products:

- Dashboard-first design when the user needs an action queue.
- More than 7 primary navigation items without explicit justification.
- Technical logs in the main workflow.
- Multiple primary buttons competing in the same region.
- Dense table as the default first screen when prioritization is needed.
- UI organized by backend modules instead of user tasks.
- Raw IDs, UUIDs, hashes, or payloads in primary UI.
- Decorative cards without decision value.
- Error messages without recovery action.
- Empty states without a suggested next step.
- Advanced configuration visible by default.
- Raw colors, arbitrary spacing, or non-canonical fonts.

---

## 12. Agent Instruction

When an agent is asked to create, refactor, simplify, or evaluate any CluOS product UI, it must explicitly apply this canon.

The expected output before implementation is:

1. Current product diagnosis.
2. Main user action.
3. Screens to keep.
4. Screens to merge.
5. Screens to remove.
6. Information to hide or move.
7. Proposed navigation.
8. Design-system compliance notes.
9. Protected functionality that must not break.
10. Test plan.
11. Risks and rollback plan.

Implementation should start only after the proposed product simplification is accepted when the change is broad, navigational, or behavior-affecting.
