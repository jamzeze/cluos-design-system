# Status Text Contrast Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every status colour written as text in `cluos-design-system` reaches WCAG AA (4.5:1) on its tint and on every surface of its register, without changing any existing token.

**Architecture:** Additive tokens in `tokens/tokens.css` in two layers (constants `--cluos-status-*-text` and `-on-navy`; roles `--cluos-color-status-*-text` per style, palette and register), mirrored in the TS, JS, Tailwind and YAML exports. A dependency-free Node script parses the stylesheet, resolves the cascade for each selector context and measures each pair; a `node:test` suite asserts the pairs, the frozen fills and the mirrors.

**Tech Stack:** CSS custom properties, Node 20+ (`node:test`, `node:assert`), headless Chrome for renders. No new dependency.

**Spec:** `docs/frontend-routing/2026-09-29-status-token-contrast/design-decision.md`

## Global Constraints

- Direction `cluos-mms-v1` and the `palette` block of `tokens/mms-canonical.yaml` do not change.
- No existing token is renamed, removed or given a new value. Status fills and tints are frozen at `origin/main@3fc656f`.
- Error family: `#8A3A3A` light, `#C46A6A` dark, `#973B3B` for style `C` only. No other error value.
- No entry in `agent-skills/profiles/cluos/palette-decisions.yaml` or `design-decisions.yaml`. Nothing under `agent-skills/` changes.
- Not edited: `guides/`, `design-gallery/`, `DESIGN-preview-legacy-v0.2.1.html`, `tokens-experimental/`, `DESIGN-preview-experimental-thermal-nocturne.html`.
- Docs and examples name tokens (`var(--cluos-*)`), never a raw hex.
- Single writer. Reviewers (`design-critic`, `design-qa`) read and run; they do not edit.
- No merge, no package publish, no version bump.
- Commits: conventional message, ending with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## File Structure

| File | Responsibility |
|---|---|
| `scripts/status-contrast.mjs` (create) | parse `tokens.css`, cascade per context, contrast, pair enumeration, report CLI |
| `scripts/test-status-contrast.mjs` (create) | assertions: pairs, known limit, frozen fills, error family, hue, mirrors |
| `package.json` (modify) | `scripts.test` |
| `tokens/tokens.css` (modify) | the new tokens |
| `tokens/tokens.ts`, `tokens/tokens.js` (modify) | mirrors, byte-identical data literals |
| `tokens/tailwind-preset.js` (modify) | colour keys |
| `tokens/mms-canonical.yaml` (modify) | `status_tokens` block |
| `DESIGN-preview.html` (modify) | status labels and one table row |
| `DESIGN.md`, `AGENTS.md`, `DESIGN-WORKFLOW.md`, `PRODUCT-PATTERNS.md`, `README.md`, `CHANGELOG.md`, `patterns/*.md`, `examples/**` (modify) | usage rules and examples |
| `docs/frontend-routing/2026-09-29-status-token-contrast/` (create) | `routing.md`, `design-decision.md`, `plan.md`, `design-critic.md`, `design-qa.md`, `renders/` |

---

### Task 1: Contrast library and failing test

**Files:**
- Create: `scripts/status-contrast.mjs`
- Create: `scripts/test-status-contrast.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces, from `scripts/status-contrast.mjs`:
  - `REPO_ROOT: string`, `AA_TEXT = 4.5`
  - `STATUSES: Array<{ status: "success"|"info"|"warn"|"error", role: "success"|"info"|"warning"|"danger" }>`
  - `PALETTES: string[]` (six ids), `PALETTE_ROLES = ["success", "warning", "danger"]`
  - `loadRules(file = "tokens/tokens.css"): Rule[]`, `Rule = { selectors: string[], declarations: Array<[string, string]> }`
  - `cascade(rules, selectors: string[]): Map<string, string>`: winning raw declarations for a root element that carries `selectors`; higher specificity wins, then later source order
  - `resolve(values, name): string | undefined`: value with every `var()` expanded
  - `contrast(fg: string, bg: string): number`, `hue(color: string): number`
  - `contexts(): Context[]`, `Context = { id, style, palette?, selectors, register: "light"|"dark" }`: 8 base contexts (`MMS`, `MMS dark`, `A`…`E`, `G`) and each of them with each palette, 56 in total
  - `pairs(rules, context): Pair[]`, `Pair = { context, register, layer: "constant"|"role", status, token, fg, surface, bg, ratio, beforeToken, beforeFg, beforeRatio, knownLimit }`
- Pair rules:
  - Surfaces of a context: `--cluos-bg`, `--cluos-bg-subtle`, `--cluos-bg-muted`, `--cluos-color-bg-canvas`, `--cluos-color-bg-surface`, `--cluos-color-bg-elevated`, `--cluos-color-bg-subtle`.
  - Light context: `--cluos-status-<status>-text` and `--cluos-color-status-<role>-text`, each on every surface and on `--cluos-status-<status>-bg`. Base light contexts also measure `--cluos-status-<status>-on-navy` on `--cluos-deep-navy`.
  - Dark context: `--cluos-status-<status>-on-navy` and `--cluos-color-status-<role>-text`, each on every surface.
  - `before` is the fill of the same layer (`--cluos-status-<status>` or `--cluos-color-status-<role>`) on the same surface.
  - `knownLimit`: dark register, status `error`, background `#132952`.

- [ ] **Step 1: Write `scripts/status-contrast.mjs`** with the exports above. Parser: strip comments, walk the text with a brace depth counter, skip any block whose prelude starts with `@`, split each prelude on commas and each body on semicolons. A selector matches a context when every simple part (`:root` or `[attr="value"]`) is in the context list; its specificity is the number of parts. CLI (when run directly): markdown report grouped by layer, one line per context and status with the worst surface before and after; `--json` prints every pair.

- [ ] **Step 2: Write `scripts/test-status-contrast.mjs`** with these tests:

| Test | Assertion |
|---|---|
| `pairs · <context id>` (56) | every pair has `fg` and `bg` defined; every pair with `knownLimit === false` has `ratio >= 4.5` |
| `known limit is still a limit` | every `knownLimit` pair has `3 <= ratio < 4.5` |
| `fills and tints keep their values` | the 8 constants, the 4 fill roles of 7 styles and the 3 fill roles of 6 palettes equal the snapshot below |
| `error family` | `--cluos-status-error-text` is `#8A3A3A`, `--cluos-status-error-on-navy` is `#C46A6A`; danger text is `#C46A6A` in dark contexts, `#973B3B` in context `C`, `#8A3A3A` in every other light context |
| `text keeps the hue of its fill` | light contexts: hue distance between each text token and its fill is at most 6 degrees |
| `tokens.js mirrors tokens.css` | `tokens.status` (16 keys), `styles` (8 status keys, 7 styles), `palettes` (6 keys, on `MMS`), `palettesDark` text keys (on `G`), `resolveTheme` text keys for 7 styles with and without each palette |
| `tokens.ts mirrors tokens.js` | the literals `tokens`, `styles`, `palettes`, `palettesDark` are identical text; `tokens.ts` declares the four `status*Text` fields and picks three of them for palettes |
| `tailwind preset exposes the tokens` | the 12 new keys map to the matching `var(--cluos-…)` |
| `mms-canonical.yaml status_tokens block mirrors tokens.css` | `canonical_id` is `cluos-mms-v1` and `status` is still `active`; `fill`, `text`, `on_navy`, `background` of each status equal the resolved CSS values |

Snapshot (fills as of `origin/main@3fc656f`):

```
constants  success #6F8F19 / bg #F1F6DF · info #3E6E82 / bg #EDF1F4 · warn #BD7845 / bg #F8EBDF · error #8A3A3A / bg #F5EAEA
roles      MMS #6F8F19 #BD7845 #8A3A3A #3E6E82   (success, warning, danger, info)
           A   #008080 #B06A34 #8A3A3A #3E6E82
           B   #6F8F19 #BD7845 #8A3A3A #3E6E82
           C   #3D7A46 #A96A2F #973B3B #3E6E82
           D   #007070 #A96A2F #8A3A3A #3E6E82
           E   #0E6E68 #A96A2F #8A3A3A #3E6E82
           G   #9CC24A #D08A54 #C46A6A #6FA8C4
palettes   pal-tealcool   #008080 #B06A34 #8A3A3A   (success, warning, danger)
           pal-tealink    #00696B #B06A34 #8A3A3A
           pal-forest     #3D7A46 #B5773A #8A3A3A
           pal-copper     #0E6E68 #BD7845 #8A3A3A
           pal-cold       #2D6CDF #B5773A #8A3A3A
           pal-terracotta #4A7A5E #B5623A #8A3A3A
```

- [ ] **Step 3: Add the script to `package.json`**, after `"types"`:

```json
  "scripts": {
    "test": "node --test scripts/test-status-contrast.mjs"
  },
```

- [ ] **Step 4: Run the test and confirm it fails for the right reason**

Run: `npm test`
Expected: FAIL. `fills and tints keep their values`, the fill half of `error family` and `tokens.ts mirrors tokens.js` (literal equality) pass. Every `pairs · …` test fails with `--cluos-status-success-text is not defined`; the mirror tests fail on the missing keys.

- [ ] **Step 5: Run the report for the baseline**

Run: `node scripts/status-contrast.mjs`
Expected: the `before` column matches section 2 of the spec (warn 3.02 on its tint, 3.54 on white; success 3.38 and 3.74; info 4.92; error 6.49).

- [ ] **Step 6: Commit**

```bash
git add scripts/status-contrast.mjs scripts/test-status-contrast.mjs package.json docs/frontend-routing/2026-09-29-status-token-contrast
git commit -m "test(tokens): measure status text contrast for every style, palette and register"
```

---

### Task 2: Tokens in `tokens/tokens.css`

**Files:**
- Modify: `tokens/tokens.css` (canonical block lines 54-62, roles block lines 195-214, styles lines 217-258, palettes lines 260-266)

**Interfaces:**
- Consumes: the `pairs · …`, `error family`, `text keeps the hue of its fill` tests of Task 1.
- Produces: the custom properties that Tasks 3 and 4 mirror and use.

- [ ] **Step 1: Canonical block.** Replace the status section with:

```css
  /* ----- Status semantics ------------------------------------------ */
  /* Unsuffixed tokens are fills (marker, bar, border) and -bg is the tint.
     Success and warn fall below 4.5:1 as text: write with the -text tokens. */
  --cluos-status-success:    #6F8F19;
  --cluos-status-success-bg: #F1F6DF;
  --cluos-status-info:       var(--cluos-info);
  --cluos-status-info-bg:    #EDF1F4;
  --cluos-status-warn:       var(--cluos-copper);
  --cluos-status-warn-bg:    #F8EBDF;
  --cluos-status-error:      var(--cluos-oxblood);
  --cluos-status-error-bg:   #F5EAEA;

  /* Status text: 4.5:1 or more on the matching -bg tint and on bg,
     bg-subtle and bg-muted. */
  --cluos-status-success-text: #546D13;
  --cluos-status-info-text:    var(--cluos-status-info);
  --cluos-status-warn-text:    #8A5A2B;
  --cluos-status-error-text:   var(--cluos-status-error);

  /* Status text and marker on deep navy and the dark register surfaces. */
  --cluos-status-success-on-navy: #9CC24A;
  --cluos-status-info-on-navy:    #6FA8C4;
  --cluos-status-warn-on-navy:    #D08A54;
  --cluos-status-error-on-navy:   #C46A6A;
```

- [ ] **Step 2: Roles block.** After `--cluos-color-status-info`, add:

```css
  --cluos-color-status-success-text:  var(--cluos-status-success-text);
  --cluos-color-status-warning-text:  var(--cluos-status-warn-text);
  --cluos-color-status-danger-text:   var(--cluos-status-error-text);
  --cluos-color-status-info-text:     var(--cluos-status-info-text);
```

- [ ] **Step 3: Dark register roles.** Directly after the roles block (it must come after it: same specificity, later rule wins):

```css
/* Dark register: status text roles take the on-navy tones. The -bg tints stay
   light in every register and pair with --cluos-status-*-text. */
[data-appearance="dark"] {
  --cluos-color-status-success-text: var(--cluos-status-success-on-navy);
  --cluos-color-status-warning-text: var(--cluos-status-warn-on-navy);
  --cluos-color-status-danger-text:  var(--cluos-status-error-on-navy);
  --cluos-color-status-info-text:    var(--cluos-status-info-on-navy);
}
```

- [ ] **Step 4: Legacy styles.** Append one line to each block, values from spec D3:

| Style | success-text | warning-text | danger-text | info-text |
|---|---|---|---|---|
| A | `#006666` | `#8A5A2B` | `#8A3A3A` | `#3E6E82` |
| B | `#546D13` | `#8A5A2B` | `#8A3A3A` | `#3E6E82` |
| C | `#2C5A34` | `#8A5A2B` | `#973B3B` | `#3E6E82` |
| D | `#007070` | `#8A5A2B` | `#8A3A3A` | `#3E6E82` |
| E | `#0E6E68` | `#8A5A2B` | `#8A3A3A` | `#3E6E82` |
| G | `#9CC24A` | `#D08A54` | `#C46A6A` | `#6FA8C4` |

Line format, style `A`:

```css
  --cluos-color-status-success-text: #006666; --cluos-color-status-warning-text: #8A5A2B; --cluos-color-status-danger-text: #8A3A3A; --cluos-color-status-info-text: #3E6E82;
```

- [ ] **Step 5: Palettes.** Append the three text roles to each palette rule, before the closing brace:

| Palette | success-text | warning-text | danger-text |
|---|---|---|---|
| `pal-tealcool` | `#006666` | `#8A5A2B` | `#8A3A3A` |
| `pal-tealink` | `#00696B` | `#8A5A2B` | `#8A3A3A` |
| `pal-forest` | `#2C5A34` | `#8A5A2B` | `#8A3A3A` |
| `pal-copper` | `#0E6E68` | `#8A5A2B` | `#8A3A3A` |
| `pal-cold` | `#1F4FAE` | `#8A5A2B` | `#8A3A3A` |
| `pal-terracotta` | `#416C53` | `#8F4B2B` | `#8A3A3A` |

- [ ] **Step 6: Palettes against the dark register.** After the palette rules, one rule per palette with the `palettesDark` values of `tokens.ts`:

```css
/* Palette text roles against the dark register: the dark-tuned tones that
   tokens.ts registers as palettesDark. */
[data-cluos-style="G"][data-cluos-palette="pal-tealcool"], [data-appearance="dark"][data-cluos-palette="pal-tealcool"] { --cluos-color-status-success-text: #3FB3B3; --cluos-color-status-warning-text: #D89A5D; --cluos-color-status-danger-text: #C46A6A; }
```

| Palette | success-text | warning-text | danger-text |
|---|---|---|---|
| `pal-tealcool` | `#3FB3B3` | `#D89A5D` | `#C46A6A` |
| `pal-tealink` | `#3FB3B3` | `#D89A5D` | `#C46A6A` |
| `pal-forest` | `#6FBE72` | `#D89A5D` | `#C46A6A` |
| `pal-copper` | `#34A79E` | `#E0A46B` | `#C46A6A` |
| `pal-cold` | `#6E9DF2` | `#D89A5D` | `#C46A6A` |
| `pal-terracotta` | `#6FBE72` | `#E08F63` | `#C46A6A` |

- [ ] **Step 7: Run the test**

Run: `npm test`
Expected: all `pairs · …` tests, `known limit is still a limit`, `fills and tints keep their values`, `error family` and `text keeps the hue of its fill` PASS. The four mirror tests still FAIL.

- [ ] **Step 8: Confirm nothing else moved**

Run: `git diff origin/main -- tokens/tokens.css | grep '^-' | grep -v '^---'`
Expected: only the lines that gained text roles at their end (6 style lines cannot appear: they are untouched; 6 palette lines appear once each) and the status section comment. No value of an existing declaration differs.

- [ ] **Step 9: Commit**

```bash
git add tokens/tokens.css
git commit -m "feat(tokens): add text-safe status tokens for every style, palette and register"
```

---

### Task 3: Mirrors

**Files:**
- Modify: `tokens/tokens.ts`, `tokens/tokens.js`, `tokens/tailwind-preset.js`, `tokens/mms-canonical.yaml`

**Interfaces:**
- Consumes: the values of Task 2.
- Produces: `tokens.status.{successText,infoText,warnText,errorText,successOnNavy,infoOnNavy,warnOnNavy,errorOnNavy}`; role fields `statusSuccessText`, `statusWarningText`, `statusDangerText`, `statusInfoText`; Tailwind keys `cluos.{success,info,warn,error}-text`, `cluos.{success,info,warn,error}-on-navy`, `cluosc.{success,warning,danger,info}-text`; YAML `status_tokens.<status>.{fill,text,on_navy,background}`.

- [ ] **Step 1: `tokens.status`** in both files, after `errorBg`:

```js
    // Text: 4.5:1 or more on the matching Bg tint and on every light surface.
    successText: "#546D13",
    infoText:    "#3E6E82",
    warnText:    "#8A5A2B",
    errorText:   "#8A3A3A",
    // Text and marker on deep navy and the dark register surfaces.
    successOnNavy: "#9CC24A",
    infoOnNavy:    "#6FA8C4",
    warnOnNavy:    "#D08A54",
    errorOnNavy:   "#C46A6A",
```

- [ ] **Step 2: `styles`** in both files: after each style's `statusSuccess…statusInfo` line add one line with the four text fields (values of Task 2 Step 4; `MMS` takes `#546D13`, `#8A5A2B`, `#8A3A3A`, `#3E6E82`).

- [ ] **Step 3: `palettes` and `palettesDark`** in both files: add `statusSuccessText`, `statusWarningText`, `statusDangerText` to each row, after `statusDanger` (values of Task 2 Steps 5 and 6).

- [ ] **Step 4: Types** in `tokens.ts`: add the four fields to `CluosThemeRoles` after `statusInfo`, and the three palette fields to the `Pick` of `CluosPaletteRoles`.

- [ ] **Step 5: Tailwind preset**: add the 8 `cluos` keys after `"error-bg"` and the 4 `cluosc` keys after `info`.

- [ ] **Step 6: YAML**: add after the `palette` block. The key is `status_tokens`: the top-level key `status` already holds `active`.

```yaml
status_tokens:
  decision_record: docs/frontend-routing/2026-09-29-status-token-contrast/design-decision.md
  added_at: "2026-09-29"
  text_contrast_minimum: 4.5
  usage:
    fill: [marker, bar, border, icon]
    text: [status_text_on_light_surfaces, status_text_on_own_background]
    on_navy: [status_text_and_marker_on_dark_surfaces]
    background: [callout_tint]
  success:
    fill: "#6F8F19"
    text: "#546D13"
    on_navy: "#9CC24A"
    background: "#F1F6DF"
  info:
    fill: "#3E6E82"
    text: "#3E6E82"
    on_navy: "#6FA8C4"
    background: "#EDF1F4"
  warn:
    fill: "#BD7845"
    text: "#8A5A2B"
    on_navy: "#D08A54"
    background: "#F8EBDF"
  error:
    fill: "#8A3A3A"
    text: "#8A3A3A"
    on_navy: "#C46A6A"
    background: "#F5EAEA"
```

- [ ] **Step 7: Run the test and the import checks**

Run: `npm test`
Expected: PASS, 0 failures.

Run: `node -e 'const t=require("./tokens/tokens.js");console.log(t.tokens.status.warnText,t.resolveTheme("G","pal-forest").statusWarningText,t.resolveTheme("A").statusSuccessText)'`
Expected: `#8A5A2B #D89A5D #006666`

Run: `node --input-type=module -e 'const m=await import(process.cwd()+"/tokens/tokens.ts");console.log(m.tokens.status.successText)'`
Expected: `#546D13` (Node 22.18+ strips the types; a module-type warning is expected).

Run: `python3 -c "import yaml;d=yaml.safe_load(open('tokens/mms-canonical.yaml'));print(d['canonical_id'],d['status'],d['status_tokens']['warn']['text'])"`
Expected: `cluos-mms-v1 active #8A5A2B`

- [ ] **Step 8: Commit**

```bash
git add tokens/tokens.ts tokens/tokens.js tokens/tailwind-preset.js tokens/mms-canonical.yaml
git commit -m "feat(tokens): mirror status text tokens in TS, JS, Tailwind preset and canonical YAML"
```

---

### Task 4: Preview, rules and examples

**Files:**
- Modify: `DESIGN-preview.html:97-101` and the states table (line 216)
- Modify: `DESIGN.md`, `AGENTS.md`, `DESIGN-WORKFLOW.md`, `PRODUCT-PATTERNS.md:74`, `README.md`, `CHANGELOG.md`
- Modify: `patterns/components.md`, `patterns/states.md`, `patterns/accessibility.md`
- Modify: `examples/tailwind-setup.md`, and in `examples/apple-inspired-product-ui/`: `css-tokens.md`, `plain-html.md`, `hub-systems.md`, `dashboard.md`, `react-components.md`, `settings-page.md`, `next-tailwind.md`

**Interfaces:**
- Consumes: token and class names of Tasks 2 and 3.
- Produces: the rendered preview that Tasks 5 and 6 review.

- [ ] **Step 1: Preview status rules.** Replace lines 99-101 with:

```css
    .status--success { color: var(--cluos-status-success-text); }
    .status--success::before { background: var(--cluos-status-success); }
    .status--warn { color: var(--cluos-status-warn-text); }
    .status--warn::before { background: var(--cluos-status-warn); }
    .status--error { color: var(--cluos-status-error-text); }
    .status--error::before { background: var(--cluos-status-error); }
    .surface .status--success { color: var(--cluos-status-success-on-navy); }
    .surface .status--warn { color: var(--cluos-status-warn-on-navy); }
    .surface .status--error { color: var(--cluos-status-error-on-navy); }
    .surface .status::before { background: currentColor; }
```

- [ ] **Step 2: Preview table row.** Append to the states table body, after the `Cor` row:

```html
<tr><td>Texto de estado</td><td>Token de texto no claro, token on-navy no escuro; marcador no tom de preenchimento.</td><td>Cor de preenchimento usada como texto.</td></tr>
```

- [ ] **Step 3: Rules.** `DESIGN.md`: a "Status tokens" subsection (token names per status, the four usages), the states bullet and the accessibility bullet. `AGENTS.md`: one line under Colors and one checklist line. `DESIGN-WORKFLOW.md`: `npm test` in the validation checklist. `PRODUCT-PATTERNS.md:74`: the label takes the `-text` token. `README.md`: `npm test` in "Updating the system". `patterns/components.md`: StatusCard label tokens, InlineFeedback tokens. `patterns/states.md`: marker, text and background token per state. `patterns/accessibility.md`: measured table of the four text tokens.

- [ ] **Step 4: Examples.** Every status colour written as text takes the `-text` token; fills (dots, bars, borders, destructive button background) and tints stay. `next-tailwind.md` takes class names the preset generates: `bg-cluos-<status>-bg text-cluos-<status>-text border border-cluos-<status>`.

- [ ] **Step 5: `CHANGELOG.md`**: entry `## [Unreleased] — 2026-09-29 — Status text contrast` with Added, Changed and Known limits.

- [ ] **Step 6: Check that no status fill is still written as text**

Run: `grep -rnE "(^|[^-])color: *\"?var\(--cluos-status-(success|warn|info|error)\)|text-\[var\(--cluos-status-(success|warn|info|error)\)\]|text-cluos-(success|warn|info|error)( |\"|$)|text-cluos-status-" DESIGN-preview.html DESIGN.md AGENTS.md patterns examples PRODUCT-PATTERNS.md`
Expected: no output.

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add DESIGN-preview.html DESIGN.md AGENTS.md DESIGN-WORKFLOW.md PRODUCT-PATTERNS.md README.md CHANGELOG.md patterns examples
git commit -m "docs(design): write status text with the text tokens in preview, rules and examples"
```

---

### Task 5: Render evidence and measured result

**Files:**
- Create: `docs/frontend-routing/2026-09-29-status-token-contrast/renders/status-pairs.html`
- Create: `docs/frontend-routing/2026-09-29-status-token-contrast/renders/*.png`
- Modify: `docs/frontend-routing/2026-09-29-status-token-contrast/design-decision.md` (section "Measured result")

**Interfaces:**
- Consumes: `tokens/tokens.css`, `node scripts/status-contrast.mjs`.
- Produces: renders and the browser-side measurement that `design-critic` and `design-qa` read.

- [ ] **Step 1: Specimen page.** `status-pairs.html` links `../../../../tokens/tokens.css`, reads `style`, `palette` and `appearance` from the query string and sets them as attributes on `<html>`. It renders, for each status and each surface of the register, the same 12px label twice (fill as text, text token), and writes beside each label the ratio it computes from `getComputedStyle`. It also writes every measured pair as JSON into `<script type="application/json" id="measured">`. Colours come from tokens only.

- [ ] **Step 2: Render.** Headless Chrome, 1440px wide: the preview before (from `origin/main`) and after; the specimen for `MMS`, `MMS` dark, `A`, `G` and `B + pal-forest`. Fonts: the clean checkout has no `brand-assets/fonts/`; render from a scratch copy that links the fonts of the main checkout, and say so in `design-qa.md`.

- [ ] **Step 3: Cross-check.** Dump the specimen DOM (`--dump-dom`), read the JSON and compare each ratio with `node scripts/status-contrast.mjs --json`. Expected: equal to two decimals for every pair.

- [ ] **Step 4: Measured result.** Paste the report of `node scripts/status-contrast.mjs` into the spec, replacing the pointer in section 7.

- [ ] **Step 5: Commit**

```bash
git add docs/frontend-routing/2026-09-29-status-token-contrast
git commit -m "docs(frontend-routing): record renders and measured contrast for the status tokens"
```

---

### Task 6: Independent review

- [ ] **Step 1: `design-critic` subagent**, fresh context. Input: the task folder, the renders, the diff range `origin/main..HEAD`. Output: `design-critic.md` in the task folder (rubric score with evidence, P0 to P3 findings).
- [ ] **Step 2:** Fix every P0, P1 and P2 that is inside the scope of the spec; render again; ask for a new verdict. A finding outside the scope is recorded in section 9 of the spec with its evidence and reported in the pull request.
- [ ] **Step 3: `design-qa` subagent**, fresh context, after the critic passes. Target: `tokens/mms-canonical.yaml`, `DESIGN.md` and the spec. Output: `design-qa.md`.
- [ ] **Step 4: Commit** the two reports and any fix.

---

### Task 7: Verification and pull request

- [ ] **Step 1: Validation**, each command run fresh and its output read:

```bash
npm test
git diff --check origin/main
python3 -c "import yaml,glob;[yaml.safe_load(open(f)) for f in ['tokens/mms-canonical.yaml']+glob.glob('agent-skills/**/*.yaml',recursive=True)];print('yaml ok')"
node -e 'require("./tokens/tokens.js");require("./tokens/tailwind-preset.js");console.log("node ok")'
npm pack --dry-run
./scripts/test-frontend-routing.sh
./scripts/validate-agent-skills.sh
```

Expected: all pass except `validate-agent-skills.sh`, which reports the same 4 problems as on `origin/main` (install drift of the local machine; three test scripts that were never committed). Any fifth problem is a regression.

- [ ] **Step 2: Push** `git push -u origin agent/cluos-design-system/status-token-contrast-20260929`.
- [ ] **Step 3: Pull request** against `main` with the before and after table, the known limit, the out-of-scope list and the validation output. No merge.

## Execution notes

- Commits: the plan listed one commit per task. Executed as green commits only, so the failing-test state of Task 1 was never committed: tokens, mirrors, test and `package.json` go in one commit, then docs and examples, then the task record.
- Task 2 Step 5: the palette text roles were added as separate rules after the palette rules, not appended to the existing lines. `tokens/tokens.css` has no removed or changed line.
- Task 3 Step 6: the YAML key is `status_tokens`. The first attempt used `status`, which replaced the contract's `status: active`; the test now asserts both.
- Task 4 Step 2: the new table row was shortened to keep the column widths of the states table.

- After design-critic round 1: the on-navy tokens of Task 2 Step 1 were revised (success and warn alias their fills), the dark appearance roles of Step 3 take literal dark tones, the legacy and palette text roles of Steps 4 and 5 reference repeated values, the table row of Task 4 Step 2 was removed, `tokens.appearance` and the YAML field `dark_register_text` were added to Task 3, and the library measures the on-navy constants on `--cluos-deep-navy` only. The values in the tables above are the first version; `design-decision.md` holds the current ones.
- Renders of Task 5 use the DevTools protocol with a device-metrics override, because `--window-size` cannot go below 500px in headless Chrome.

- After design-critic round 2: the dark register block defines its own on-navy success and warn, and the dark appearance roles reference the on-navy tokens again (as in Task 2 Step 3). The library also measures the on-navy constants on every surface of the dark register.

## Self-Review

- Spec coverage: D1 and D2 are Task 2 Step 1; D3 is Task 2 Steps 2 to 6; D4 and D5 are tests of Task 1; D6 is the comment of Task 2 Step 3 and the rules of Task 4; D7 is Task 3; D8 is Task 1; D9 is Task 4 Steps 1 and 2; D10 is Task 4 Step 4. Section 7 of the spec is Task 5 Step 4.
- Names: `statusSuccessText`, `statusWarningText`, `statusDangerText`, `statusInfoText`, `successText`, `successOnNavy` and the CSS names are spelled the same in Tasks 1, 2, 3 and 4.
- Execution: inline, single writer (`AGENTS.md` of the workspace), with the two reviewers as read-only subagents.
