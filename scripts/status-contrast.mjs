#!/usr/bin/env node
// Status text contrast for cluos-design-system.
//
// Parses tokens/tokens.css, resolves the status tokens for every style,
// palette and register, and measures each text pair (WCAG 2.1 contrast).
// No dependencies.
//
//   node scripts/status-contrast.mjs          markdown report, before and after
//   node scripts/status-contrast.mjs --json   every measured pair
//
// "before" is the status fill used as text, which is what consumers did until
// the text tokens existed. "after" is the text token on the same surface.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const AA_TEXT = 4.5;

export const STATUSES = [
  { status: "success", role: "success" },
  { status: "info", role: "info" },
  { status: "warn", role: "warning" },
  { status: "error", role: "danger" },
];

export const PALETTES = ["pal-tealcool", "pal-tealink", "pal-forest", "pal-copper", "pal-cold", "pal-terracotta"];
export const PALETTE_ROLES = ["success", "warning", "danger"];

const SURFACES = [
  "--cluos-bg",
  "--cluos-bg-subtle",
  "--cluos-bg-muted",
  "--cluos-color-bg-canvas",
  "--cluos-color-bg-surface",
  "--cluos-color-bg-elevated",
  "--cluos-color-bg-subtle",
];

// palette-policy.md fixes dark error at #C46A6A. On the dark muted surface it
// stays below AA; the limit is recorded, not hidden.
const KNOWN_LIMIT = { register: "dark", status: "error", bg: "#132952" };

/* ----- Stylesheet ------------------------------------------------------ */

export function parseRules(css) {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const rules = [];
  let depth = 0;
  let prelude = "";
  let body = "";
  let atRule = false;
  for (const char of text) {
    if (char === "{") {
      depth += 1;
      if (depth === 1) atRule = prelude.trim().startsWith("@");
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        if (!atRule) rules.push({ selectors: prelude.split(",").map((s) => s.trim()), declarations: parseDeclarations(body) });
        prelude = "";
        body = "";
      }
    } else if (depth === 0) {
      prelude += char;
    } else if (!atRule) {
      body += char;
    }
  }
  return rules;
}

function parseDeclarations(body) {
  return body
    .split(";")
    .filter((entry) => entry.includes(":"))
    .map((entry) => {
      const at = entry.indexOf(":");
      return [entry.slice(0, at).trim(), entry.slice(at + 1).trim()];
    });
}

export function loadRules(file = "tokens/tokens.css") {
  return parseRules(fs.readFileSync(path.resolve(REPO_ROOT, file), "utf8"));
}

// tokens.css selects with :root and attribute selectors only, alone or
// compounded. Anything else is outside this model and never matches.
function simpleParts(selector) {
  const parts = selector.match(/:root|\[[^\]]+\]/g) ?? [];
  return parts.join("") === selector ? parts : null;
}

// Winning declarations for a root element that carries `selectors`.
// Higher specificity wins; on a tie the later rule wins.
export function cascade(rules, selectors) {
  const winners = new Map();
  for (const rule of rules) {
    const weights = rule.selectors
      .map(simpleParts)
      .filter((parts) => parts && parts.every((part) => selectors.includes(part)))
      .map((parts) => parts.length);
    if (!weights.length) continue;
    const weight = Math.max(...weights);
    for (const [name, value] of rule.declarations) {
      const current = winners.get(name);
      if (!current || weight >= current.weight) winners.set(name, { value, weight });
    }
  }
  return new Map([...winners].map(([name, winner]) => [name, winner.value]));
}

export function resolve(values, name, seen = []) {
  if (seen.includes(name)) throw new Error(`Circular reference: ${[...seen, name].join(" -> ")}`);
  const raw = values.get(name);
  if (raw === undefined) return undefined;
  let missing = false;
  const value = raw.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, inner) => {
    const resolved = resolve(values, inner, [...seen, name]);
    if (resolved === undefined) missing = true;
    return resolved;
  });
  return missing ? undefined : value;
}

/* ----- Colour ---------------------------------------------------------- */

export function parseColor(value) {
  const hex = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const digits = hex[1].length === 3 ? [...hex[1]].map((digit) => digit + digit).join("") : hex[1];
    return [0, 2, 4].map((at) => parseInt(digits.slice(at, at + 2), 16)).concat(1);
  }
  const rgb = value.trim().match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const [red, green, blue, alpha = 1] = rgb[1].split(",").map(Number);
    return [red, green, blue, alpha];
  }
  throw new Error(`Unsupported colour: ${value}`);
}

function over(top, base) {
  const blend = (at) => top[at] * top[3] + base[at] * (1 - top[3]);
  return [blend(0), blend(1), blend(2), 1];
}

function luminance([red, green, blue]) {
  const linear = (channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue);
}

export function contrast(fg, bg) {
  const base = parseColor(bg);
  if (base[3] !== 1) throw new Error(`Background must be opaque: ${bg}`);
  const [lighter, darker] = [luminance(over(parseColor(fg), base)), luminance(base)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

// Hue in degrees; NaN for a grey.
export function hue(color) {
  const [red, green, blue] = parseColor(color).slice(0, 3).map((channel) => channel / 255);
  const max = Math.max(red, green, blue);
  const delta = max - Math.min(red, green, blue);
  if (delta === 0) return NaN;
  let sector;
  if (max === red) sector = ((green - blue) / delta) % 6;
  else if (max === green) sector = (blue - red) / delta + 2;
  else sector = (red - green) / delta + 4;
  return (sector * 60 + 360) % 360;
}

/* ----- Contexts and pairs ---------------------------------------------- */

// A context is the set of selectors on the root element. `:root` and
// [data-cluos-style="MMS"] share their blocks, so MMS is `:root` alone.
export function contexts() {
  const style = (id) => `[data-cluos-style="${id}"]`;
  const base = [
    { id: "MMS", style: "MMS", selectors: [":root"], register: "light" },
    { id: "MMS dark", style: "MMS", selectors: [":root", '[data-appearance="dark"]'], register: "dark" },
    ...["A", "B", "C", "D", "E"].map((id) => ({ id, style: id, selectors: [":root", style(id)], register: "light" })),
    { id: "G", style: "G", selectors: [":root", style("G")], register: "dark" },
  ];
  const withPalette = base.flatMap((context) =>
    PALETTES.map((palette) => ({
      ...context,
      id: `${context.id} + ${palette}`,
      palette,
      selectors: [...context.selectors, `[data-cluos-palette="${palette}"]`],
    }))
  );
  return [...base, ...withPalette];
}

function measure(values, context, status, layer, token, beforeToken, surface) {
  const fg = resolve(values, token);
  const bg = resolve(values, surface);
  const beforeFg = resolve(values, beforeToken);
  const ratio = fg && bg ? contrast(fg, bg) : NaN;
  return {
    context: context.id,
    register: context.register,
    palette: context.palette ?? null,
    layer,
    status,
    token,
    fg,
    surface,
    bg,
    ratio,
    beforeToken,
    beforeFg,
    beforeRatio: beforeFg && bg ? contrast(beforeFg, bg) : NaN,
    knownLimit:
      context.register === KNOWN_LIMIT.register &&
      status === KNOWN_LIMIT.status &&
      String(bg).toUpperCase() === KNOWN_LIMIT.bg,
  };
}

// Every pair a status text token must satisfy in a context.
export function pairs(rules, context) {
  const values = cascade(rules, context.selectors);
  const light = context.register === "light";
  const out = [];
  for (const { status, role } of STATUSES) {
    const constantFill = `--cluos-status-${status}`;
    const texts = [
      { layer: "constant", token: `${constantFill}-${light ? "text" : "on-navy"}`, before: constantFill },
      { layer: "role", token: `--cluos-color-status-${role}-text`, before: `--cluos-color-status-${role}` },
    ];
    // The tints do not change with the register: they pair with a text token only on light.
    const surfaces = light ? [...SURFACES, `${constantFill}-bg`] : SURFACES;
    for (const text of texts) {
      for (const surface of surfaces) out.push(measure(values, context, status, text.layer, text.token, text.before, surface));
    }
    // A navy block inside a light page, as in DESIGN-preview.html.
    if (light && !context.palette) {
      out.push(measure(values, context, status, "constant", `${constantFill}-on-navy`, constantFill, "--cluos-deep-navy"));
    }
  }
  return out;
}

export function allPairs(rules = loadRules()) {
  return contexts().flatMap((context) => pairs(rules, context));
}

/* ----- Report ---------------------------------------------------------- */

const fixed = (ratio) => (Number.isNaN(ratio) ? "undefined" : ratio.toFixed(2));
const verdict = (ratio) => (ratio >= AA_TEXT ? "" : " fail");
const cell = (color, ratio) => `\`${color ?? "undefined"}\` ${fixed(ratio)}${verdict(ratio)}`;

function worst(list, key) {
  return list.reduce((low, pair) => (pair[key] < low[key] ? pair : low));
}

function report(rules) {
  const all = allPairs(rules);
  const lines = [];
  const say = (line = "") => lines.push(line);
  const of = (context, layer) => all.filter((pair) => pair.context === context && pair.layer === layer);

  say("# Status text contrast");
  say();
  say(`Source: \`tokens/tokens.css\`. Threshold ${AA_TEXT}:1. Before: the fill used as text. After: the text token.`);
  say();

  say("## Canonical constants, light register");
  say();
  say("| Status | Surface | Before | After |");
  say("|---|---|---|---|");
  for (const pair of of("MMS", "constant").filter((pair) => !pair.surface.startsWith("--cluos-color-") && pair.surface !== "--cluos-deep-navy")) {
    say(`| ${pair.status} | \`${pair.surface}\` \`${pair.bg}\` | ${cell(pair.beforeFg, pair.beforeRatio)} | ${cell(pair.fg, pair.ratio)} |`);
  }
  say();

  say("## Canonical constants on dark surfaces");
  say();
  say("| Status | Surface | Before | After |");
  say("|---|---|---|---|");
  const navy = [
    ...of("MMS", "constant").filter((pair) => pair.surface === "--cluos-deep-navy"),
    ...of("MMS dark", "constant").filter((pair) => !pair.surface.startsWith("--cluos-color-")),
  ];
  for (const { status } of STATUSES) {
    for (const pair of navy.filter((candidate) => candidate.status === status)) {
      const note = pair.knownLimit ? " (known limit)" : "";
      say(`| ${pair.status} | \`${pair.surface}\` \`${pair.bg}\` | ${cell(pair.beforeFg, pair.beforeRatio)} | ${cell(pair.fg, pair.ratio)}${note} |`);
    }
  }
  say();

  say("## Roles by style, worst surface");
  say();
  say("| Context | Role | Before | on | After | on |");
  say("|---|---|---|---|---|---|");
  for (const context of contexts().filter((candidate) => !candidate.palette)) {
    for (const { status, role } of STATUSES) {
      const group = of(context.id, "role").filter((pair) => pair.status === status && !pair.knownLimit);
      const before = worst(group, "beforeRatio");
      const after = worst(group, "ratio");
      say(`| ${context.id} | ${role} | ${cell(before.beforeFg, before.beforeRatio)} | \`${before.bg}\` | ${cell(after.fg, after.ratio)} | \`${after.bg}\` |`);
    }
  }
  say();

  say("## Roles by palette, worst surface over every style of the register");
  say();
  say("| Palette | Register | Role | Before | on | After | on |");
  say("|---|---|---|---|---|---|---|");
  for (const palette of PALETTES) {
    for (const register of ["light", "dark"]) {
      for (const { status, role } of STATUSES.filter((entry) => PALETTE_ROLES.includes(entry.role))) {
        const group = all.filter(
          (pair) => pair.palette === palette && pair.register === register && pair.layer === "role" && pair.status === status && !pair.knownLimit
        );
        const before = worst(group, "beforeRatio");
        const after = worst(group, "ratio");
        say(`| ${palette} | ${register} | ${role} | ${cell(before.beforeFg, before.beforeRatio)} | \`${before.bg}\` | ${cell(after.fg, after.ratio)} | \`${after.bg}\` |`);
      }
    }
  }
  say();

  const limits = all.filter((pair) => pair.knownLimit);
  const counted = all.filter((pair) => !pair.knownLimit);
  say("## Totals");
  say();
  say(`- Pairs measured: ${all.length} in ${contexts().length} contexts.`);
  say(`- Below ${AA_TEXT}:1 before: ${counted.filter((pair) => !(pair.beforeRatio >= AA_TEXT)).length} of ${counted.length}.`);
  say(`- Below ${AA_TEXT}:1 after: ${counted.filter((pair) => !(pair.ratio >= AA_TEXT)).length} of ${counted.length}.`);
  if (limits.length) {
    const low = worst(limits, "ratio");
    const high = limits.reduce((top, pair) => (pair.ratio > top.ratio ? pair : top));
    say(
      `- Known limit (error text on the dark \`--cluos-bg-muted\` \`${KNOWN_LIMIT.bg}\`): ${limits.length} pairs, ` +
        `${fixed(low.ratio)} to ${fixed(high.ratio)}; before ${fixed(worst(limits, "beforeRatio").beforeRatio)}.`
    );
  }
  return lines.join("\n");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const rules = loadRules();
  console.log(process.argv.includes("--json") ? JSON.stringify(allPairs(rules), null, 2) : report(rules));
}
