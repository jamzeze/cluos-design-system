# Subtle Text Contrast Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `--cluos-text-subtle` reaches WCAG AA (4.5:1) on every surface of both registers, without changing any palette value and without making disabled labels look enabled.

**Architecture:** One new neutral foundation step (`--cluos-neutral-700`) takes the subtle-text job; `--cluos-text-subtle` points at it; a new `--cluos-text-disabled` keeps the pale grey for inactive controls. A dependency-free `node:test` file parses `tokens/tokens.css` and checks every text token on every surface, the frozen palette values, and the TS, JS, Tailwind and YAML mirrors.

**Tech Stack:** CSS custom properties, Node 20+ (`node:test`), headless Chrome for renders.

**Spec:** `docs/frontend-routing/2026-09-29-text-subtle-contrast/design-decision.md`

## Global Constraints

- Direction `cluos-mms-v1` unchanged. Palette values unchanged: `--cluos-neutral-100: #EAEAEA`, `--cluos-neutral-500: #A5A5A5`, and every brand colour.
- Names are added, never removed.
- No entry in `agent-skills/profiles/cluos/palette-decisions.yaml` or `design-decisions.yaml`; nothing under `agent-skills/` changes.
- Legacy style values (`[data-cluos-style="A"]` … `"G"`) unchanged.
- Docs and examples name tokens, never a raw hex.
- Commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. No merge, no publish.
- Keep clear of the lines pull request jamzeze/cluos-design-system#4 edits where a different place works (`AGENTS.md` lines 48–49, `DESIGN.md` after the palette paragraph); `patterns/accessibility.md` line 154 and the top of `CHANGELOG.md` will conflict and are resolved when #4 is rebased.

---

### Task 1: Failing test

**Files:**
- Create: `scripts/test-text-contrast.mjs`
- Modify: `package.json` (add `"scripts": { "test": "node --test scripts/test-*.mjs" }` after `"types"`)

**Interfaces:**
- Produces: tests named `text tokens · light`, `text tokens · dark`, `disabled text stays below subtle text`, `palette values are frozen`, `tokens.js mirrors tokens.css`, `tokens.ts mirrors tokens.js`, `tailwind preset exposes the text tokens`, `mms-canonical.yaml palette records the split`.

- [ ] **Step 1:** Write the test. Parser: strip comments, match `([^{}]+)\{([^{}]*)\}` (rules inside `@media` never match `:root`), split selectors on commas and compounds into `:root` / `[attr="value"]` parts; a rule applies when all parts are in the context; higher part count wins, then later rule. Resolve `var()` recursively; composite `rgba()` text over its surface before measuring.
- [ ] **Step 2:** Run `npm test`. Expected on `main` values: `text tokens · light` fails with `--cluos-text-subtle (#A5A5A5) on --cluos-bg-muted (#EAEAEA): 2.05:1`; the disabled, mirror and YAML tests fail on missing names; `palette values are frozen` and `text tokens · dark` pass.

### Task 2: Tokens

**Files:** Modify `tokens/tokens.css`.

- [ ] **Step 1:** Foundations, after `--cluos-neutral-500`: `--cluos-neutral-700:      #666666;`
- [ ] **Step 2:** Text block: `--cluos-text-subtle: var(--cluos-neutral-700);` and `--cluos-text-disabled: var(--cluos-neutral-500);` with a comment that disabled is for inactive controls only.
- [ ] **Step 3:** Dark block: `--cluos-text-disabled: rgba(247, 248, 245, 0.38);`
- [ ] **Step 4:** Run `npm test`: the two text-token tests and the disabled test pass; mirror and YAML tests still fail.

### Task 3: Mirrors

**Files:** Modify `tokens/tokens.ts`, `tokens/tokens.js` (identical data literals), `tokens/tailwind-preset.js`, `tokens/mms-canonical.yaml`.

- [ ] **Step 1:** `color`: add `neutral700: "#666666"` after `neutral500`; `textSubtle: "#666666"`; add `textDisabled: "#A5A5A5"` after `textSubtle`.
- [ ] **Step 2:** `appearance.light`: `textSubtle: "#666666"`, add `textDisabled: "#A5A5A5"`; `appearance.dark`: add `textDisabled: "rgba(247, 248, 245, 0.38)"`.
- [ ] **Step 3:** `styles.MMS.fgMuted: "#666666"`.
- [ ] **Step 4:** Tailwind `cluos`: `"neutral-700": "var(--cluos-neutral-700)"`, `"text-disabled": "var(--cluos-text-disabled)"`.
- [ ] **Step 5:** YAML `palette`: `neutral_500.role: [disabled_context]`; add `neutral_700: {value: "#666666", role: [subtle_text]}`.
- [ ] **Step 6:** Run `npm test`: all pass. Run `node -e 'const t=require("./tokens/tokens.js");console.log(t.tokens.color.textSubtle,t.tokens.appearance.dark.textDisabled,t.styles.MMS.fgMuted)'`; expected `#666666 rgba(247, 248, 245, 0.38) #666666`.

### Task 4: Documentation and examples

**Files:** Modify `DESIGN.md`, `AGENTS.md`, `patterns/accessibility.md`, `examples/apple-inspired-product-ui/hub-systems.md`, `CHANGELOG.md`.

- [ ] **Step 1:** `DESIGN.md` palette table: `--cluos-neutral-500` → "disabled context: labels of inactive controls"; add `--cluos-neutral-700` → "subtle text"; a paragraph after the table on readable text tokens and the disabled exception.
- [ ] **Step 2:** `AGENTS.md`: one bullet after "Background:" for `--cluos-text-disabled`.
- [ ] **Step 3:** `patterns/accessibility.md`: replace the four pre-MMS lines of "Tokens CluOS e contraste" with measured values of the current tokens.
- [ ] **Step 4:** `hub-systems.md`: disabled button `text-cluos-text-subtle` → `text-cluos-text-disabled`.
- [ ] **Step 5:** `CHANGELOG.md` entry.

### Task 5: Evidence

- [ ] **Step 1:** Render `DESIGN-preview.html` before and after at 1440px and 390px; pixel-diff; crop the changed labels.
- [ ] **Step 2:** Specimen `renders/text-pairs.html`: every text token on every surface, light and dark, ratios computed in the browser; cross-check with the test's numbers.
- [ ] **Step 3:** Fill sections 7 and 9 of the decision record. Commit.

### Task 6: Review and delivery

- [ ] **Step 1:** design-critic, then design-qa, as subagents. Page-level judgement on a scratch merge of this branch with the table fix branch, because each branch alone leaves the other P2 on the page.
- [ ] **Step 2:** `npm test`, `git diff --check`, YAML parse, Node import, `npm pack --dry-run`, `scripts/test-frontend-routing.sh`, `scripts/validate-agent-skills.sh` (4 problems expected, identical to `main`).
- [ ] **Step 3:** Push; open the pull request. No merge.

## Self-Review

- Spec coverage: D1–D3 are Task 2; D4–D5 Task 3; D6 is a constraint; D7 Task 1; D8 Task 4; section 7 Task 5.
- Names: `--cluos-neutral-700`, `--cluos-text-disabled`, `neutral700`, `textDisabled`, `neutral_700` are spelled the same in every task.
