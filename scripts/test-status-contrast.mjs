// Status text contrast: every status text token reaches WCAG AA (4.5:1) on
// its tint and on every surface of its register, in every style and palette.
// Also guards what the change promised: fills and tints keep their values,
// the error family is untouched, and the TS, JS, Tailwind and YAML exports
// agree with tokens.css.
//
// Run: npm test   (node --test scripts/test-status-contrast.mjs)

import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { test } from "node:test";

import {
  AA_TEXT,
  PALETTES,
  PALETTE_ROLES,
  REPO_ROOT,
  STATUSES,
  allPairs,
  cascade,
  contexts,
  hue,
  loadRules,
  pairs,
  resolve,
} from "./status-contrast.mjs";

const require = createRequire(import.meta.url);
const read = (file) => fs.readFileSync(path.resolve(REPO_ROOT, file), "utf8");
// Two undefined values are not a match: a token missing on both sides must fail.
const same = (a, b) => a !== undefined && b !== undefined && String(a).toUpperCase() === String(b).toUpperCase();

const rules = loadRules();
const valuesOf = (selectors) => cascade(rules, selectors);
const styleSelectors = (id) => (id === "MMS" ? [":root"] : [":root", `[data-cluos-style="${id}"]`]);
const paletteSelector = (id) => `[data-cluos-palette="${id}"]`;
const STYLES = ["MMS", "A", "B", "C", "D", "E", "G"];
const ROLE_KEYS = { success: "statusSuccess", warning: "statusWarning", danger: "statusDanger", info: "statusInfo" };

// Status fills and tints as of origin/main@3fc656f. The text tokens were added
// beside them; none of these may change without a recorded decision.
const FROZEN = {
  constants: {
    "--cluos-status-success": "#6F8F19",
    "--cluos-status-success-bg": "#F1F6DF",
    "--cluos-status-info": "#3E6E82",
    "--cluos-status-info-bg": "#EDF1F4",
    "--cluos-status-warn": "#BD7845",
    "--cluos-status-warn-bg": "#F8EBDF",
    "--cluos-status-error": "#8A3A3A",
    "--cluos-status-error-bg": "#F5EAEA",
  },
  styles: {
    MMS: { success: "#6F8F19", warning: "#BD7845", danger: "#8A3A3A", info: "#3E6E82" },
    A: { success: "#008080", warning: "#B06A34", danger: "#8A3A3A", info: "#3E6E82" },
    B: { success: "#6F8F19", warning: "#BD7845", danger: "#8A3A3A", info: "#3E6E82" },
    C: { success: "#3D7A46", warning: "#A96A2F", danger: "#973B3B", info: "#3E6E82" },
    D: { success: "#007070", warning: "#A96A2F", danger: "#8A3A3A", info: "#3E6E82" },
    E: { success: "#0E6E68", warning: "#A96A2F", danger: "#8A3A3A", info: "#3E6E82" },
    G: { success: "#9CC24A", warning: "#D08A54", danger: "#C46A6A", info: "#6FA8C4" },
  },
  palettes: {
    "pal-tealcool": { success: "#008080", warning: "#B06A34", danger: "#8A3A3A" },
    "pal-tealink": { success: "#00696B", warning: "#B06A34", danger: "#8A3A3A" },
    "pal-forest": { success: "#3D7A46", warning: "#B5773A", danger: "#8A3A3A" },
    "pal-copper": { success: "#0E6E68", warning: "#BD7845", danger: "#8A3A3A" },
    "pal-cold": { success: "#2D6CDF", warning: "#B5773A", danger: "#8A3A3A" },
    "pal-terracotta": { success: "#4A7A5E", warning: "#B5623A", danger: "#8A3A3A" },
  },
};

const describePair = (pair) =>
  `${pair.token} (${pair.fg}) on ${pair.surface} (${pair.bg}) in "${pair.context}": ${pair.ratio.toFixed(2)}:1`;

/* ----- Contrast -------------------------------------------------------- */

for (const context of contexts()) {
  test(`pairs · ${context.id}`, () => {
    const measured = pairs(rules, context);
    assert.ok(measured.length > 0);
    for (const pair of measured) {
      assert.ok(pair.fg, `${pair.token} is not defined in "${pair.context}"`);
      assert.ok(pair.bg, `${pair.surface} is not defined in "${pair.context}"`);
    }
    const failing = measured.filter((pair) => !pair.knownLimit && !(pair.ratio >= AA_TEXT));
    assert.deepEqual(failing.map(describePair), [], `below ${AA_TEXT}:1`);
  });
}

// palette-policy.md fixes dark error at #C46A6A, which cannot reach 4.5:1 on
// the dark muted surface. If this starts passing, the error family changed:
// remove the limit from status-contrast.mjs and from the docs.
test("known limit is still a limit", () => {
  const limits = allPairs(rules).filter((pair) => pair.knownLimit);
  assert.ok(limits.length > 0);
  for (const pair of limits) {
    assert.ok(pair.ratio >= 3 && pair.ratio < AA_TEXT, describePair(pair));
  }
});

/* ----- What the change promised ---------------------------------------- */

test("fills and tints keep their values", () => {
  const canonical = valuesOf([":root"]);
  for (const [token, value] of Object.entries(FROZEN.constants)) {
    assert.ok(same(resolve(canonical, token), value), `${token} is ${resolve(canonical, token)}, expected ${value}`);
  }
  for (const [style, roles] of Object.entries(FROZEN.styles)) {
    const values = valuesOf(styleSelectors(style));
    for (const [role, value] of Object.entries(roles)) {
      const token = `--cluos-color-status-${role}`;
      assert.ok(same(resolve(values, token), value), `${token} in style ${style} is ${resolve(values, token)}, expected ${value}`);
    }
  }
  for (const [palette, roles] of Object.entries(FROZEN.palettes)) {
    const values = valuesOf([":root", paletteSelector(palette)]);
    for (const [role, value] of Object.entries(roles)) {
      const token = `--cluos-color-status-${role}`;
      assert.ok(same(resolve(values, token), value), `${token} in ${palette} is ${resolve(values, token)}, expected ${value}`);
    }
  }
});

test("error family", () => {
  const canonical = valuesOf([":root"]);
  assert.ok(same(resolve(canonical, "--cluos-status-error-text"), "#8A3A3A"));
  assert.ok(same(resolve(canonical, "--cluos-status-error-on-navy"), "#C46A6A"));
  for (const context of contexts()) {
    const value = resolve(valuesOf(context.selectors), "--cluos-color-status-danger-text");
    const expected = context.register === "dark" ? "#C46A6A" : context.id === "C" ? "#973B3B" : "#8A3A3A";
    assert.ok(same(value, expected), `danger text in "${context.id}" is ${value}, expected ${expected}`);
  }
});

test("text keeps the hue of its fill", () => {
  const distance = (a, b) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
  for (const context of contexts().filter((candidate) => candidate.register === "light")) {
    const values = valuesOf(context.selectors);
    for (const { status, role } of STATUSES) {
      for (const [text, fill] of [
        [`--cluos-status-${status}-text`, `--cluos-status-${status}`],
        [`--cluos-color-status-${role}-text`, `--cluos-color-status-${role}`],
      ]) {
        const [textValue, fillValue] = [resolve(values, text), resolve(values, fill)];
        assert.ok(textValue, `${text} is not defined in "${context.id}"`);
        const degrees = distance(hue(textValue), hue(fillValue));
        assert.ok(degrees <= 6, `${text} (${textValue}) is ${degrees.toFixed(1)} degrees from ${fill} (${fillValue}) in "${context.id}"`);
      }
    }
  }
});

/* ----- Mirrors --------------------------------------------------------- */

test("tokens.js mirrors tokens.css", () => {
  const { tokens, styles, palettes, palettesDark, resolveTheme } = require("../tokens/tokens.js");
  const canonical = valuesOf([":root"]);

  for (const { status } of STATUSES) {
    for (const [key, token] of [
      [status, `--cluos-status-${status}`],
      [`${status}Bg`, `--cluos-status-${status}-bg`],
      [`${status}Text`, `--cluos-status-${status}-text`],
      [`${status}OnNavy`, `--cluos-status-${status}-on-navy`],
    ]) {
      assert.ok(same(tokens.status[key], resolve(canonical, token)), `tokens.status.${key} is ${tokens.status[key]}, ${token} is ${resolve(canonical, token)}`);
    }
  }

  const compare = (label, object, values, roles, suffixes) => {
    for (const role of roles) {
      for (const suffix of suffixes) {
        const key = `${ROLE_KEYS[role]}${suffix}`;
        const token = `--cluos-color-status-${role}${suffix ? "-text" : ""}`;
        assert.ok(same(object[key], resolve(values, token)), `${label}.${key} is ${object[key]}, ${token} is ${resolve(values, token)}`);
      }
    }
  };
  const allRoles = Object.keys(ROLE_KEYS);

  for (const style of STYLES) {
    compare(`styles.${style}`, styles[style], valuesOf(styleSelectors(style)), allRoles, ["", "Text"]);
    compare(`resolveTheme(${style})`, resolveTheme(style), valuesOf(styleSelectors(style)), allRoles, ["Text"]);
  }
  for (const palette of PALETTES) {
    compare(`palettes.${palette}`, palettes[palette], valuesOf([":root", paletteSelector(palette)]), PALETTE_ROLES, ["", "Text"]);
    // Fills are not compared for palettesDark: tokens.css has no dark-tuned
    // palette fills (design-decision.md, finding 7). Text roles are mirrored.
    compare(`palettesDark.${palette}`, palettesDark[palette], valuesOf([...styleSelectors("G"), paletteSelector(palette)]), PALETTE_ROLES, ["Text"]);
    for (const style of STYLES) {
      const values = valuesOf([...styleSelectors(style), paletteSelector(palette)]);
      compare(`resolveTheme(${style}, ${palette})`, resolveTheme(style, palette), values, allRoles, ["Text"]);
    }
  }
});

test("tokens.ts mirrors tokens.js", () => {
  const literal = (source, name) => {
    const head = source.match(new RegExp(`const ${name}\\b[^=]*=\\s*\\{`));
    assert.ok(head, `no literal named ${name}`);
    const start = head.index + head[0].length - 1;
    let depth = 0;
    for (let at = start; at < source.length; at += 1) {
      if (source[at] === "{") depth += 1;
      if (source[at] === "}") depth -= 1;
      if (depth === 0) return source.slice(start, at + 1);
    }
    throw new Error(`unbalanced literal ${name}`);
  };
  const [ts, js] = [read("tokens/tokens.ts"), read("tokens/tokens.js")];
  for (const name of ["tokens", "styles", "palettes", "palettesDark"]) {
    assert.equal(literal(ts, name), literal(js, name), `${name} differs between tokens.ts and tokens.js`);
  }
  const roles = ts.slice(ts.indexOf("export interface CluosThemeRoles"), ts.indexOf("export const styles"));
  for (const key of ["statusSuccessText", "statusWarningText", "statusDangerText", "statusInfoText"]) {
    assert.match(roles, new RegExp(`\\b${key}: string;`), `CluosThemeRoles lacks ${key}`);
  }
  const picked = ts.slice(ts.indexOf("type CluosPaletteRoles"), ts.indexOf("export const palettes"));
  for (const key of ["statusSuccessText", "statusWarningText", "statusDangerText"]) {
    assert.ok(picked.includes(`"${key}"`), `CluosPaletteRoles does not pick ${key}`);
  }
});

test("tailwind preset exposes the tokens", () => {
  const { cluos, cluosc } = require("../tokens/tailwind-preset.js").theme.extend.colors;
  for (const { status, role } of STATUSES) {
    assert.equal(cluos[status], `var(--cluos-status-${status})`);
    assert.equal(cluos[`${status}-bg`], `var(--cluos-status-${status}-bg)`);
    assert.equal(cluos[`${status}-text`], `var(--cluos-status-${status}-text)`);
    assert.equal(cluos[`${status}-on-navy`], `var(--cluos-status-${status}-on-navy)`);
    assert.equal(cluosc[role], `var(--cluos-color-status-${role})`);
    assert.equal(cluosc[`${role}-text`], `var(--cluos-color-status-${role}-text)`);
  }
});

test("mms-canonical.yaml status_tokens block mirrors tokens.css", () => {
  // Reads the two-space indented scalars under one top-level key.
  const block = (source, key) => {
    const lines = source.split("\n");
    const start = lines.indexOf(`${key}:`);
    assert.notEqual(start, -1, `mms-canonical.yaml has no ${key} block`);
    const root = {};
    const stack = [{ indent: 0, node: root }];
    for (const line of lines.slice(start + 1)) {
      if (!line.trim() || line.trim().startsWith("#")) continue;
      const indent = line.length - line.trimStart().length;
      if (indent === 0) break;
      const entry = line.trim().match(/^([\w-]+):\s*(.*)$/);
      if (!entry) continue;
      while (stack.at(-1).indent >= indent) stack.pop();
      if (entry[2] === "") {
        const node = {};
        stack.at(-1).node[entry[1]] = node;
        stack.push({ indent, node });
      } else {
        stack.at(-1).node[entry[1]] = entry[2].replace(/^["']|["']$/g, "");
      }
    }
    return root;
  };
  const yaml = read("tokens/mms-canonical.yaml");
  assert.match(yaml, /^canonical_id: cluos-mms-v1$/m);
  assert.match(yaml, /^status: active$/m);
  const status = block(yaml, "status_tokens");
  const canonical = valuesOf([":root"]);
  assert.equal(Number(status.text_contrast_minimum), AA_TEXT);
  for (const { status: name } of STATUSES) {
    for (const [field, token] of [
      ["fill", `--cluos-status-${name}`],
      ["text", `--cluos-status-${name}-text`],
      ["on_navy", `--cluos-status-${name}-on-navy`],
      ["background", `--cluos-status-${name}-bg`],
    ]) {
      assert.ok(status[name], `status_tokens.${name} is missing`);
      assert.ok(same(status[name][field], resolve(canonical, token)), `status_tokens.${name}.${field} is ${status[name][field]}, ${token} is ${resolve(canonical, token)}`);
    }
  }
});
