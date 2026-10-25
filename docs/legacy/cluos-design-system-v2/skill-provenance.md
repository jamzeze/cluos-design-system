# Skill Provenance

Per the source metaprompt §4: what was actually read, at what depth, and
what was deliberately not inherited.

## Honesty note on depth of reading

Superpowers and product-design skills are delivered through Claude Code's
plugin/skill-loading system, not as flat files this session could `cat` at
an arbitrary path. What was actually available at full depth: the complete
body of `superpowers:using-superpowers`, pasted verbatim into this
session's context by the SessionStart hook at the very start of the
conversation (visible in the transcript, not re-quoted here). Everything
else in the tables below — the other superpowers skills and all
product-design skills — was available only as a one-line `description` in
the session's available-skills listing; none were invoked via the `Skill`
tool during this work. Principles attributed to them below are inferred
from those descriptions and from the source metaprompt's own summary of
what each is supposed to do (§4), not from reading their full instructions.
This is a real limitation, not an oversight — flagging it here rather than
overstating provenance.

## Superpowers — process principles

| Skill | Depth read | Principle reused | Adaptation |
|---|---|---|---|
| `using-superpowers` | Full body (verbatim in session context) | "Invoke a skill before any response if it might apply, including clarifying questions" | Applied literally — this whole refactor began by invoking `design-taste-frontend` before any other action |
| `brainstorming` | Description only | Explore intent before implementation | Not directly invoked this session — the exploration phase (galleries, workbench iteration) served the same function interactively with Rafael |
| `writing-plans` | Description only | Multi-step work gets a written plan before code | `design-system-refactor-director` SKILL.md requires this for N3 work |
| `using-git-worktrees` | Description only | Isolate feature work | Not used — worked directly on a new branch (`feat/cluos-design-system-anti-slop`) in the existing checkout rather than a worktree, since this is a single-writer, single-session change with no concurrent work to isolate from |
| `test-driven-development` | Description only | Test-first for behavior | Applied to the shell scripts (syntax-checked and run against real fixtures before being declared done) — not to the SKILL.md/YAML/CSS content, which has no "behavior" to test-first in that sense |
| `systematic-debugging` | Description only | Structured root-cause approach | Applied when `validate-agent-skills.sh` failed on bash 3.2 — diagnosed the actual macOS bash version (3.2, no associative arrays) rather than guessing a fix |
| `verification-before-completion` | Description only | Evidence before claiming done | Applied throughout — every script was executed and its real output read before being called working; the workbench was verified via computed-style JS assertions, not assumed from the code |
| `requesting-code-review` / `receiving-code-review` | Not available in this session's skill listing | — | Not applicable |

## Product-design — design/implementation principles

Not directly invoked this session (none appear in the available-skills
listing with that exact `product-design:*` namespace at the time of this
work — the closest available equivalents were `design-taste-frontend`,
`impeccable`, and `ui-ux-pro-max`, of which `design-taste-frontend` was
actually invoked for the initial mockup work). Principles required by the
source metaprompt (context before decisions, design before implementation,
real alternatives not just color swaps, target before reconstruction,
responsive+functional implementation, capture the rendered result, compare
target vs. implementation, iterate, evidence before completion,
document decisions) were applied directly rather than through an invoked
skill — this document IS that documentation requirement being satisfied.

## What was deliberately NOT inherited, and why

- `design-taste-frontend`'s scope statement explicitly excludes dashboards
  and dense product UI ("Landing pages, portfolios, and redesigns. Not
  dashboards, not data tables, not multi-step product UI"). CluOS's actual
  surfaces ARE dashboards/tables/forms. Its dial system (VARIANCE/MOTION/
  DENSITY) and landing-page-specific rules (hero copy limits, marquee caps,
  eyebrow rationing) were used for the *initial mockup session's* general
  anti-slop discipline (no purple gradients, no generic SaaS defaults) but
  its landing-page-specific structural rules were not applied to the
  archetype library, since they don't govern dashboard/table/form design.
- Long-refactor "no checkpoint commits" instruction from
  `/Users/rafacosta/Documents/GitHub/CLAUDE.md` was followed over the
  source metaprompt's more granular "commit after each subproject"
  suggestion (§24) — the repo-level CLAUDE.md is the stricter/more current
  instruction for this specific repo and takes precedence per this
  session's operating rules.

## Deferred (cannot be honestly claimed as done)

- **§18.4 "validar o comportamento em Claude e Codex"** — the routing
  matrix's *internal consistency* is checked
  (`scripts/test-frontend-routing.sh`, static check: every skill referenced
  exists, every level is valid). Whether a live Claude Code or Codex
  session actually invokes the correct skill chain for each of the 12 test
  prompts was **not** executed — that requires running real agent sessions
  against each prompt and observing behavior, which this session cannot do
  to itself. Left as a manual follow-up.
- **§17 design lint against product surfaces** — no product surface is in
  scope (zero real consumers, see `00-baseline.md`). A design lint that
  scans a *consuming* codebase for hardcoded colors, Card-in-Card, etc. has
  no target to scan yet. What exists instead: `validate-agent-skills.sh`
  lints the skill/token package itself (frontmatter completeness, no
  placeholders, no drift). A consumer-facing lint is deferred until a real
  product adopts `@cluos/design-system`.
- **WCAG contrast** — palette pairs were built to target AA (see
  `05-palette-options.md`) but not run through an automated contrast
  checker in this pass.
