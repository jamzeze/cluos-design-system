// Text contrast: the text tokens and foreground roles reach WCAG AA (4.5:1)
// on every surface of both registers, disabled text stays below subtle text,
// the palette values are frozen, and the TS, JS, Tailwind and YAML exports
// agree with tokens.css. Legacy styles (data-cluos-style A to G) are explicit
// opt-outs and are not covered here.
//
// Run: npm test   (no dependencies)

import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const require = createRequire(import.meta.url);
const AA_TEXT = 4.5;

/* ----- tokens.css cascade ---------------------------------------------- */

// Top-level rules. A rule nested in @media gets a selector that matches no
// context below, so it is ignored.
const rules = [...read("tokens/tokens.css").replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(
  ([, selectors, body]) => ({
    selectors: selectors.split(",").map((selector) => selector.trim()),
    declarations: body
      .split(";")
      .filter((entry) => entry.includes(":"))
      .map((entry) => {
        const at = entry.indexOf(":");
        return [entry.slice(0, at).trim(), entry.slice(at + 1).trim()];
      }),
  })
);

// tokens.css selects with :root and attribute selectors, alone or compounded.
const parts = (selector) => {
  const found = selector.match(/:root|\[[^\]]+\]/g) ?? [];
  return found.join("") === selector ? found : null;
};

// Resolved custom properties for a root element that carries `context`.
// Higher specificity wins; on a tie the later rule wins.
function valuesFor(context) {
  const winners = new Map();
  for (const rule of rules) {
    const weights = rule.selectors
      .map(parts)
      .filter((found) => found && found.every((part) => context.includes(part)))
      .map((found) => found.length);
    if (!weights.length) continue;
    const weight = Math.max(...weights);
    for (const [name, value] of rule.declarations) {
      const current = winners.get(name);
      if (!current || weight >= current.weight) winners.set(name, { value, weight });
    }
  }
  const resolve = (name, seen = []) => {
    if (seen.includes(name)) throw new Error(`Circular reference: ${[...seen, name].join(" -> ")}`);
    const raw = winners.get(name)?.value;
    if (raw === undefined) return undefined;
    let missing = false;
    const value = raw.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, inner) => {
      const resolved = resolve(inner, [...seen, name]);
      if (resolved === undefined) missing = true;
      return resolved;
    });
    return missing ? undefined : value;
  };
  return resolve;
}

/* ----- colour ---------------------------------------------------------- */

function rgba(value) {
  const hex = value.trim().match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((at) => parseInt(hex[1].slice(at, at + 2), 16)).concat(1);
  const fn = value.trim().match(/^rgba?\(([^)]+)\)$/i);
  if (fn) {
    const [red, green, blue, alpha = 1] = fn[1].split(",").map(Number);
    return [red, green, blue, alpha];
  }
  throw new Error(`Unsupported colour: ${value}`);
}

function luminance([red, green, blue]) {
  const linear = (channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);
}

// Text is composited over its surface first, so rgba() text is measured as rendered.
function contrast(text, surface) {
  const base = rgba(surface);
  const top = rgba(text);
  const shown = top.map((channel, at) => (at < 3 ? channel * top[3] + base[at] * (1 - top[3]) : 1));
  const [lighter, darker] = [luminance(shown), luminance(base)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

/* ----- fixtures --------------------------------------------------------- */

const REGISTERS = { light: [":root"], dark: [":root", '[data-appearance="dark"]'] };
const TEXT = ["--cluos-text", "--cluos-text-muted", "--cluos-text-subtle", "--cluos-color-fg-primary", "--cluos-color-fg-secondary", "--cluos-color-fg-muted"];
const SURFACES = ["--cluos-bg", "--cluos-bg-subtle", "--cluos-bg-muted", "--cluos-color-bg-canvas", "--cluos-color-bg-surface", "--cluos-color-bg-elevated", "--cluos-color-bg-subtle"];
const light = valuesFor(REGISTERS.light);
const dark = valuesFor(REGISTERS.dark);

// Two undefined values are not a match: a name missing on both sides must fail.
const same = (a, b) => a !== undefined && b !== undefined && String(a).replace(/\s+/g, "").toUpperCase() === String(b).replace(/\s+/g, "").toUpperCase();

/* ----- contrast --------------------------------------------------------- */

for (const [register, context] of Object.entries(REGISTERS)) {
  test(`text tokens · ${register}`, () => {
    const values = valuesFor(context);
    const failing = [];
    for (const token of TEXT) {
      for (const surface of SURFACES) {
        const [fg, bg] = [values(token), values(surface)];
        assert.ok(fg, `${token} is not defined in the ${register} register`);
        assert.ok(bg, `${surface} is not defined in the ${register} register`);
        const ratio = contrast(fg, bg);
        if (ratio < AA_TEXT) failing.push(`${token} (${fg}) on ${surface} (${bg}): ${ratio.toFixed(2)}:1`);
      }
    }
    assert.deepEqual(failing, [], `below ${AA_TEXT}:1`);
  });
}

// --cluos-text-disabled labels inactive controls (exempt under WCAG 1.4.3).
// It must stay dimmer than subtle text, or disabled reads as enabled.
test("disabled text stays below subtle text", () => {
  for (const [register, context] of Object.entries(REGISTERS)) {
    const values = valuesFor(context);
    const disabled = values("--cluos-text-disabled");
    assert.ok(disabled, `--cluos-text-disabled is not defined in the ${register} register`);
    for (const surface of ["--cluos-bg", "--cluos-bg-subtle", "--cluos-bg-muted"]) {
      const bg = values(surface);
      const [subtleRatio, disabledRatio] = [contrast(values("--cluos-text-subtle"), bg), contrast(disabled, bg)];
      assert.ok(disabledRatio < subtleRatio, `${register}: disabled ${disabledRatio.toFixed(2)}:1 is not below subtle ${subtleRatio.toFixed(2)}:1 on ${surface}`);
    }
  }
});

/* ----- what the change promised ---------------------------------------- */

test("palette values are frozen", () => {
  const frozen = {
    "--cluos-deep-navy": "#010D28",
    "--cluos-medium-blue": "#132952",
    "--cluos-tech-green": "#C4DB7B",
    "--cluos-operational-teal": "#16A39A",
    "--cluos-copper": "#BD7845",
    "--cluos-oxblood": "#8A3A3A",
    "--cluos-white": "#FFFFFF",
    "--cluos-neutral-100": "#EAEAEA",
    "--cluos-neutral-500": "#A5A5A5",
  };
  for (const [token, value] of Object.entries(frozen)) {
    assert.ok(same(light(token), value), `${token} is ${light(token)}, expected ${value}`);
  }
  // The dark register already passed; its text values do not move.
  assert.ok(same(dark("--cluos-text-subtle"), "rgba(247, 248, 245, 0.54)"), `dark --cluos-text-subtle is ${dark("--cluos-text-subtle")}`);
  assert.ok(same(dark("--cluos-text-muted"), "rgba(247, 248, 245, 0.72)"), `dark --cluos-text-muted is ${dark("--cluos-text-muted")}`);
});

/* ----- mirrors ---------------------------------------------------------- */

test("tokens.js mirrors tokens.css", () => {
  const { tokens, styles } = require("../tokens/tokens.js");
  const pairs = [
    ["color.neutral500", tokens.color.neutral500, light("--cluos-neutral-500")],
    ["color.neutral700", tokens.color.neutral700, light("--cluos-neutral-700")],
    ["color.textSubtle", tokens.color.textSubtle, light("--cluos-text-subtle")],
    ["color.textDisabled", tokens.color.textDisabled, light("--cluos-text-disabled")],
    ["appearance.light.textSubtle", tokens.appearance.light.textSubtle, light("--cluos-text-subtle")],
    ["appearance.light.textDisabled", tokens.appearance.light.textDisabled, light("--cluos-text-disabled")],
    ["appearance.dark.textSubtle", tokens.appearance.dark.textSubtle, dark("--cluos-text-subtle")],
    ["appearance.dark.textDisabled", tokens.appearance.dark.textDisabled, dark("--cluos-text-disabled")],
    ["styles.MMS.fgMuted", styles.MMS.fgMuted, light("--cluos-color-fg-muted")],
  ];
  for (const [key, js, css] of pairs) assert.ok(same(js, css), `${key} is ${js}, tokens.css resolves to ${css}`);
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
  for (const name of ["tokens", "styles"]) assert.equal(literal(ts, name), literal(js, name), `${name} differs between tokens.ts and tokens.js`);
});

test("tailwind preset exposes the text tokens", () => {
  const { cluos } = require("../tokens/tailwind-preset.js").theme.extend.colors;
  for (const key of ["text-subtle", "text-disabled", "neutral-500", "neutral-700"]) {
    assert.equal(cluos[key], `var(--cluos-${key})`, `cluos.${key}`);
  }
});

test("mms-canonical.yaml palette records the split", () => {
  const yaml = read("tokens/mms-canonical.yaml");
  assert.match(yaml, /^canonical_id: cluos-mms-v1$/m);
  const entry = (name) => {
    const found = yaml.match(new RegExp(`^  ${name}:\\n    value: "(#[0-9A-Fa-f]{6})"\\n    role: \\[([^\\]]*)\\]`, "m"));
    assert.ok(found, `palette.${name} is missing or not in the value/role form`);
    return { value: found[1], roles: found[2].split(",").map((role) => role.trim()) };
  };
  const [n500, n700] = [entry("neutral_500"), entry("neutral_700")];
  assert.ok(same(n500.value, light("--cluos-neutral-500")), `palette.neutral_500 is ${n500.value}`);
  assert.ok(same(n700.value, light("--cluos-neutral-700")), `palette.neutral_700 is ${n700.value}, --cluos-neutral-700 is ${light("--cluos-neutral-700")}`);
  assert.deepEqual(n500.roles, ["disabled_context"]);
  assert.deepEqual(n700.roles, ["subtle_text"]);
});
