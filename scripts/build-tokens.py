#!/usr/bin/env python3
"""Gera todos os exports de token do cluos-v2 a partir de tokens/cluos-v2.yaml.

Saídas (nunca edite à mão):
  tokens/tokens.css         variáveis CSS (claro, escuro, densidade, aliases de compatibilidade)
  tokens/fonts.css          @font-face das quatro famílias embarcadas
  tokens/tokens.ts          objeto tipado (ESM/TS)
  tokens/tokens.js          o mesmo objeto em CommonJS
  tokens/index.ts           reexport + tipos
  tokens/tailwind-preset.js preset Tailwind v3
  tokens/tailwind.css       tema Tailwind v4 (@theme inline)
  tokens/shadcn.css         variáveis do tema shadcn/ui mapeadas para os papéis cluos
  tokens/design.json        W3C Design Tokens (formato DTCG)
  AGENT-BRIEF.md            resumo portátil para colar em qualquer LLM

Uso: python3 scripts/build-tokens.py [--check]
Com --check, não escreve: sai com 1 se algum arquivo gerado estiver desatualizado.
Dependências: Python 3.9+ e PyYAML.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML é necessário: pip install pyyaml")

ROOT = Path(__file__).resolve().parent.parent
SPEC_PATH = ROOT / "tokens" / "cluos-v2.yaml"
BANNER = "Gerado por scripts/build-tokens.py a partir de tokens/cluos-v2.yaml. Não edite à mão."


def kebab(name: str) -> str:
    return name.replace("_", "-")


def camel(name: str) -> str:
    parts = kebab(name).split("-")
    return parts[0] + "".join(p[:1].upper() + p[1:] for p in parts[1:])


def px(value) -> str:
    return "0" if value == 0 else f"{value}px"


# --------------------------------------------------------------------------
# Modelo intermediário: uma lista ordenada de (nome css, valor) por escopo.
# --------------------------------------------------------------------------

def mode_vars(spec: dict, mode: str) -> list[tuple[str, str]]:
    """Variáveis que mudam com o tema: papéis semânticos, status, matizes, gráfico."""
    out: list[tuple[str, str]] = []
    for key, value in spec["semantic"][mode].items():
        name = "ring-focus" if key == "ring" else kebab(key)
        out.append((name, value))
    for name, st in spec["status"].items():
        steps = st[mode]
        out += [
            (f"status-{name}", steps["line"]),
            (f"status-{name}-bg", steps["fill"]),
            (f"status-{name}-text", steps["text"]),
        ]
    for name, hue in spec["hue"].items():
        steps = hue[mode]
        out += [(f"{name}-fill", steps["fill"]), (f"{name}-line", steps["line"]), (f"{name}-text", steps["text"])]
    for i, hue in enumerate(spec["chart_order"], start=1):
        out.append((f"chart-{i}", f"var(--cluos-{hue}-line)"))
    for product, hue in spec["product_hue"].items():
        out += [
            (f"product-{product}", f"var(--cluos-{hue}-line)"),
            (f"product-{product}-fill", f"var(--cluos-{hue}-fill)"),
            (f"product-{product}-text", f"var(--cluos-{hue}-text)"),
        ]
    return out


def alias_vars(spec: dict) -> list[tuple[str, str]]:
    """Nomes do cluos-mms-v1 que continuam válidos por uma versão. Precisam ser
    redeclarados em cada escopo de tema para acompanhar a troca de modo."""
    a = [
        ("text", "var(--cluos-fg)"),
        ("text-muted", "var(--cluos-fg-2)"),
        ("text-subtle", "var(--cluos-fg-3)"),
        ("text-disabled", "var(--cluos-fg-disabled)"),
        ("text-on-navy", "var(--cluos-fg-on-navy)"),
        ("text-on-signal", "var(--cluos-action-fg)"),
        ("text-on-teal", "var(--cluos-white)"),
        ("border", "var(--cluos-line)"),
        ("border-strong", "var(--cluos-line-strong)"),
        ("action-primary", "var(--cluos-action)"),
        ("action-primary-deep", "var(--cluos-action-hover)"),
        ("action-primary-soft", "var(--cluos-action-soft)"),
        ("action-primary-text", "var(--cluos-action-fg)"),
        ("action-deep", "var(--cluos-action-hover)"),
        ("action-text", "var(--cluos-action-fg)"),
        ("signal-deep", "var(--cluos-action-hover)"),
        ("signal-soft", "var(--cluos-action-soft)"),
        ("status-warn", "var(--cluos-status-warning)"),
        ("status-warn-bg", "var(--cluos-status-warning-bg)"),
        ("status-warn-text", "var(--cluos-status-warning-text)"),
        ("status-error", "var(--cluos-status-danger)"),
        ("status-error-bg", "var(--cluos-status-danger-bg)"),
        ("status-error-text", "var(--cluos-status-danger-text)"),
        # Papéis --cluos-color-* (camada semântica do v2 anterior)
        ("color-bg-canvas", "var(--cluos-bg)"),
        ("color-bg-surface", "var(--cluos-surface)"),
        ("color-bg-elevated", "var(--cluos-surface)"),
        ("color-bg-subtle", "var(--cluos-bg-subtle)"),
        ("color-fg-primary", "var(--cluos-fg)"),
        ("color-fg-secondary", "var(--cluos-fg-2)"),
        ("color-fg-muted", "var(--cluos-fg-3)"),
        ("color-border-default", "var(--cluos-line)"),
        ("color-border-strong", "var(--cluos-line-strong)"),
        ("color-action-primary", "var(--cluos-action)"),
        ("color-action-primary-hover", "var(--cluos-action-hover)"),
        ("color-focus-ring", "var(--cluos-ring-focus)"),
        ("color-status-success", "var(--cluos-status-success)"),
        ("color-status-warning", "var(--cluos-status-warning)"),
        ("color-status-danger", "var(--cluos-status-danger)"),
        ("color-status-info", "var(--cluos-status-info)"),
        ("color-signal", "var(--cluos-tech-green)"),
    ]
    return a


def static_vars(spec: dict) -> list[tuple[str, str]]:
    """Variáveis que não mudam com o tema."""
    out: list[tuple[str, str]] = []
    for key, b in spec["brand"].items():
        out.append((kebab(key), b["value"]))
    present = {n for n, _ in out}
    for step, value in spec["neutral"].items():
        if f"neutral-{step}" not in present:  # 100 e 500 já vêm da marca
            out.append((f"neutral-{step}", value))
    fam = spec["typography"]["families"]
    for role, f in fam.items():
        out.append((f"font-{role}", ", ".join(f'"{s}"' if " " in s else s for s in f["stack"])))
    out.append(("font-data", "var(--cluos-font-sans)"))
    w = spec["typography"]["weights"]
    for key, value in w.items():
        out.append((f"font-weight-{kebab(key)}", str(value)))
    for key, value in spec["typography"]["sizes"].items():
        out.append((f"text-{key}", value))
    for key, value in spec["typography"]["leading"].items():
        out.append((f"leading-{key}", str(value)))
    for role, r in spec["typography"]["roles"].items():
        size = r.get("fluid") or px(r["size"])
        out += [
            (f"type-{role}-size", size),
            (f"type-{role}-line", str(r["line"])),
            (f"type-{role}-tracking", r["tracking"]),
            (f"type-{role}-weight", str(r["weight"])),
        ]
    base = spec["spacing"]["base_px"]
    for step in spec["spacing"]["scale"]:
        out.append((f"space-{step}", "0" if step == 0 else f"{step * base / 16:g}rem"))
    sem = spec["spacing"]["semantic"]
    for group in ("inset", "stack"):
        for key, value in sem[group].items():
            out.append((f"{group}-{key}", px(value)))
    for key, value in sem["gap"].items():
        out.append((f"gap-{kebab(key)}", px(value)))
    out.append(("page-margin-min", px(sem["page_margin_min"])))
    g = spec["geometry"]
    out += [
        ("radius-sm", px(g["radius"]["sm"])),
        ("radius-md", px(g["radius"]["md"])),
        ("radius-pill", px(g["radius"]["pill"])),
    ]
    for key, value in g["containers"].items():
        out.append((f"container-{key}", value))
    for key, value in g["breakpoints"].items():
        out.append((f"breakpoint-{key}", px(value)))
    out.append(("touch-target-min", px(g["touch_target_min"])))
    d = g["density"]["comfortable"]
    out += [("row-height", px(d["row"])), ("cell-x", px(d["cell_x"])), ("table-font", px(d["font"]))]
    m = spec["motion"]
    out += [("ease-out", m["ease_out"]), ("ease-in-out", m["ease_in_out"])]
    for key, value in m["durations"].items():
        out.append((f"motion-{key}", f"{value}ms"))
    return out


def static_aliases(spec: dict) -> list[tuple[str, str]]:
    out = [(kebab(k), v) for k, v in spec["compat"]["aliases"].items()]
    m = spec["motion"]["durations"]
    out += [
        ("radius-lg", "var(--cluos-radius-md)"),
        ("radius-xl", "var(--cluos-radius-md)"),
        ("radius-2xl", "var(--cluos-radius-md)"),
        ("radius-full", "var(--cluos-radius-pill)"),
        ("shadow-xs", "none"),
        ("shadow-sm", "none"),
        ("shadow-md", "none"),
        ("shadow-lg", "none"),
        ("dur-fast", f"{m['fast']}ms"),
        ("dur-base", f"{m['base']}ms"),
        ("dur-slow", f"{m['slow']}ms"),
        ("action-teal", "#16A39A"),
        ("action-teal-deep", "#08736E"),
        ("action-teal-soft", "rgba(22, 163, 154, 0.12)"),
        ("action-copper", "#BD7845"),
        ("action-copper-deep", "#965D34"),
        ("action-copper-soft", "rgba(189, 120, 69, 0.12)"),
        ("action-oxblood", "#8A3A3A"),
        ("action-oxblood-deep", "#662828"),
        ("action-oxblood-soft", "rgba(138, 58, 58, 0.11)"),
        ("action-champagne", "#C8C1AE"),
        ("action-champagne-deep", "#AFA58E"),
        ("action-champagne-soft", "rgba(200, 193, 174, 0.22)"),
        ("operational-active", "#08736E"),
        ("gradient-primary", "linear-gradient(135deg, #010D28 0%, #132952 58%, #16A39A 100%)"),
        ("gradient-soft", "linear-gradient(135deg, #010D28 0%, #132952 100%)"),
        ("gradient-mono", "linear-gradient(135deg, #010D28 0%, #132952 100%)"),
        ("bg-brand-hero", "#010D28"),
    ]
    # Passos de espaçamento antigos ausentes da escala nova não existem; todos os
    # antigos (1,2,3,4,6,8,10,12,16,24) continuam presentes com o mesmo valor.
    return out


def block(selector: str, items: list[tuple[str, str]], indent: str = "  ") -> str:
    width = max(len(n) for n, _ in items) + 9
    lines = [f"{selector} {{"]
    for name, value in items:
        lines.append(f"{indent}{('--cluos-' + name + ':').ljust(width)} {value};")
    lines.append("}")
    return "\n".join(lines)


# --------------------------------------------------------------------------
# Renderizadores
# --------------------------------------------------------------------------

def render_css(spec: dict) -> str:
    light_sel = ':root,\n[data-theme="light"],\n[data-cluos-style="MMS"]'  # alias do cluos-mms-v1 até 2.0.0
    dark_sel = '[data-theme="dark"],\n[data-appearance="dark"],\n.dark'
    compact = spec["geometry"]["density"]["compact"]
    parts = [
        f"/* cluos-v2 — tokens canônicos. {BANNER}\n"
        "   Importe uma vez na raiz: @import \"@cluos/design-system/tokens.css\";\n"
        "   Tema: data-theme=\"light\" (padrão) | \"dark\". Densidade: data-density=\"comfortable\" (padrão) | \"compact\".\n"
        "   Os papéis e aliases são redeclarados em cada escopo de tema para que um\n"
        "   subtree com data-theme=\"dark\" resolva corretamente. */",
        "/* ----- Fundações estáticas ------------------------------------------ */",
        block(":root", static_vars(spec)),
        "/* ----- Tema claro (padrão) ------------------------------------------ */",
        block(light_sel, [("theme", "light")] + mode_vars(spec, "light") + alias_vars(spec)).replace(
            "--cluos-theme:", "/* tema */ --cluos-theme:"
        ),
        "/* ----- Tema escuro ---------------------------------------------------- */",
        block(dark_sel, [("theme", "dark")] + mode_vars(spec, "dark") + alias_vars(spec)).replace(
            "--cluos-theme:", "/* tema */ --cluos-theme:"
        ),
        ":root,\n[data-theme=\"light\"] { color-scheme: light; }\n[data-theme=\"dark\"],\n[data-appearance=\"dark\"],\n.dark { color-scheme: dark; }",
        "/* ----- Densidade ------------------------------------------------------ */",
        block('[data-density="compact"]', [
            ("row-height", px(compact["row"])),
            ("cell-x", px(compact["cell_x"])),
            ("table-font", px(compact["font"])),
        ]),
        "/* ----- Compatibilidade cluos-mms-v1 (remover em "
        + spec["compat"]["removed_in"]
        + ") ----------------- */",
        block(":root", static_aliases(spec)),
        "@media (prefers-reduced-motion: reduce) {\n"
        "  *, *::before, *::after {\n"
        "    animation-duration: 0.01ms !important;\n"
        "    animation-iteration-count: 1 !important;\n"
        "    scroll-behavior: auto !important;\n"
        "    transition-duration: 0.01ms !important;\n"
        "  }\n}",
    ]
    return "\n\n".join(parts) + "\n"


def render_fonts_css(spec: dict) -> str:
    fam = spec["typography"]["families"]
    lines = [f"/* cluos-v2 — fontes embarcadas (OFL). {BANNER}\n   Caminhos relativos a tokens/; o pacote publica brand-assets/fonts/. */"]
    for role in ("display", "sans", "mono", "accent"):
        f = fam[role]
        if not f.get("file"):
            continue
        stretch = "\n  font-stretch: 75% 100%;" if f["family"] == "Instrument Sans" else ""
        lines.append(
            "@font-face {\n"
            f"  font-family: \"{f['family']}\";\n"
            f"  src: url(\"../{f['file']}\") format(\"woff2\");\n"
            f"  font-weight: {f['weight_range']};{stretch}\n"
            "  font-style: normal;\n"
            "  font-display: swap;\n"
            "}"
        )
    return "\n\n".join(lines) + "\n"


def tokens_object(spec: dict) -> dict:
    def mode(m: str) -> dict:
        sem = {camel(k): v for k, v in spec["semantic"][m].items()}
        sem["status"] = {k: {camel(s): c for s, c in v[m].items()} for k, v in spec["status"].items()}
        sem["hue"] = {camel(k): v[m] for k, v in spec["hue"].items()}
        return sem

    fam = spec["typography"]["families"]
    return {
        "id": spec["canonical_id"],
        "version": spec["version"],
        "brand": {camel(k): v["value"] for k, v in spec["brand"].items()},
        "neutral": dict(spec["neutral"]),
        "light": mode("light"),
        "dark": mode("dark"),
        "chartOrder": list(spec["chart_order"]),
        "productHue": dict(spec["product_hue"]),
        "font": {
            role: {"family": f["family"], "stack": ", ".join(f["stack"]) if f.get("stack") else None}
            for role, f in fam.items()
        },
        "fontWeight": dict(spec["typography"]["weights"]),
        "fontSize": dict(spec["typography"]["sizes"]),
        "leading": dict(spec["typography"]["leading"]),
        "type": {camel(k): v for k, v in spec["typography"]["roles"].items()},
        "space": {
            str(s): ("0" if s == 0 else f"{s * spec['spacing']['base_px'] / 16:g}rem") for s in spec["spacing"]["scale"]
        },
        "radius": {k: px(v) for k, v in spec["geometry"]["radius"].items()},
        "container": dict(spec["geometry"]["containers"]),
        "breakpoint": {k: px(v) for k, v in spec["geometry"]["breakpoints"].items()},
        "density": spec["geometry"]["density"],
        "motion": {
            "easeOut": spec["motion"]["ease_out"],
            "easeInOut": spec["motion"]["ease_in_out"],
            **{k: f"{v}ms" for k, v in spec["motion"]["durations"].items()},
        },
        "cssVar": {
            "bg": "var(--cluos-bg)",
            "fg": "var(--cluos-fg)",
            "action": "var(--cluos-action)",
            "actionFg": "var(--cluos-action-fg)",
            "line": "var(--cluos-line)",
            "ringFocus": "var(--cluos-ring-focus)",
        },
    }


def render_ts(spec: dict) -> str:
    obj = json.dumps(tokens_object(spec), ensure_ascii=False, indent=2)
    return (
        f"// cluos-v2 — tokens. {BANNER}\n"
        f"export const tokens = {obj} as const;\n\n"
        "export type CluosTokens = typeof tokens;\n"
        "export type CluosTheme = \"light\" | \"dark\";\n"
        "export type CluosHue = keyof typeof tokens.light.hue;\n"
        "export type CluosStatus = keyof typeof tokens.light.status;\n\n"
        "export default tokens;\n"
    )


def render_js(spec: dict) -> str:
    obj = json.dumps(tokens_object(spec), ensure_ascii=False, indent=2)
    return (
        f"// cluos-v2 — tokens (CommonJS). {BANNER}\n"
        "\"use strict\";\n\n"
        f"const tokens = {obj};\n\n"
        "// `require()` e `import x from` devolvem as chaves de topo; `{ tokens }` e\n"
        "// `default` devolvem o objeto completo (também como export nomeado em ESM).\n"
        "module.exports = Object.assign({}, tokens);\n"
        "module.exports.tokens = tokens;\n"
        "module.exports.default = tokens;\n"
    )


def render_index(spec: dict) -> str:
    return (
        f"// {BANNER}\n"
        "export { tokens, tokens as default } from \"./tokens\";\n"
        "export type { CluosTokens, CluosTheme, CluosHue, CluosStatus } from \"./tokens\";\n"
    )


def tailwind_colors(spec: dict) -> dict:
    colors = {}
    for key in spec["brand"]:
        colors[kebab(key)] = f"var(--cluos-{kebab(key)})"
    for step in spec["neutral"]:
        colors[f"neutral-{step}"] = f"var(--cluos-neutral-{step})"
    for key in spec["semantic"]["light"]:
        if key == "ring":
            continue
        colors[kebab(key)] = f"var(--cluos-{kebab(key)})"
    for name in spec["status"]:
        colors[name] = f"var(--cluos-status-{name})"
        colors[f"{name}-bg"] = f"var(--cluos-status-{name}-bg)"
        colors[f"{name}-text"] = f"var(--cluos-status-{name}-text)"
    for name in spec["hue"]:
        for step in ("fill", "line", "text"):
            colors[f"{name}-{step}"] = f"var(--cluos-{name}-{step})"
    for i in range(1, len(spec["chart_order"]) + 1):
        colors[f"chart-{i}"] = f"var(--cluos-chart-{i})"
    # aliases do v1 usados pelos produtos
    for alias in ("text", "text-muted", "text-subtle", "text-disabled", "border", "border-strong", "action-primary", "action-deep", "action-text"):
        colors[alias] = f"var(--cluos-{alias})"
    colors["warn"] = "var(--cluos-status-warning)"
    colors["error"] = "var(--cluos-status-danger)"
    return colors


def render_tailwind_preset(spec: dict) -> str:
    fam = spec["typography"]["families"]
    theme = {
        "colors": {"cluos": tailwind_colors(spec)},
        "fontFamily": {
            "display": ["var(--cluos-font-display)"],
            "sans": ["var(--cluos-font-sans)"],
            "data": ["var(--cluos-font-sans)"],
            "mono": ["var(--cluos-font-mono)"],
            "accent": ["var(--cluos-font-accent)"],
        },
        "fontWeight": {f"cluos-{kebab(k)}": str(v) for k, v in spec["typography"]["weights"].items()},
        "borderRadius": {
            "cluos-sm": "var(--cluos-radius-sm)",
            "cluos-md": "var(--cluos-radius-md)",
            "cluos-pill": "var(--cluos-radius-pill)",
            "cluos-lg": "var(--cluos-radius-md)",
            "cluos-full": "var(--cluos-radius-pill)",
        },
        "maxWidth": {f"cluos-{k}": f"var(--cluos-container-{k})" for k in spec["geometry"]["containers"]},
        "transitionDuration": {f"cluos-{k}": f"var(--cluos-motion-{k})" for k in spec["motion"]["durations"]},
        "transitionTimingFunction": {"cluos-out": "var(--cluos-ease-out)", "cluos-standard": "var(--cluos-ease-in-out)"},
        "boxShadow": {"cluos-ring": "var(--cluos-ring-focus)"},
    }
    del fam
    body = json.dumps(theme, ensure_ascii=False, indent=2)
    return (
        "/**\n"
        f" * cluos-v2 — preset Tailwind v3. {BANNER}\n"
        " *\n"
        " *   module.exports = { presets: [require(\"@cluos/design-system/tailwind-preset\")] };\n"
        " *\n"
        " * Importe também @cluos/design-system/tokens.css (as cores são var()).\n"
        " * Classes: bg-cluos-bg, text-cluos-fg, bg-cluos-action, text-cluos-success-text,\n"
        " * bg-cluos-hue-05-fill, rounded-cluos-sm, max-w-cluos-product, font-display.\n"
        " */\n"
        "module.exports = {\n"
        f"  theme: {{\n    extend: {body.replace(chr(10), chr(10) + '    ')}\n  }},\n"
        "};\n"
    )


def render_tailwind_v4(spec: dict) -> str:
    lines = [
        f"/* cluos-v2 — tema Tailwind v4. {BANNER}",
        "   @import \"tailwindcss\";",
        "   @import \"@cluos/design-system/tokens.css\";",
        "   @import \"@cluos/design-system/tailwind.css\";",
        "   `inline` faz as utilidades referenciarem as variáveis cluos, que trocam com data-theme. */",
        "@theme inline {",
    ]
    for key, value in tailwind_colors(spec).items():
        lines.append(f"  --color-cluos-{key}: {value};")
    for role in ("display", "sans", "mono", "accent"):
        lines.append(f"  --font-{role}: var(--cluos-font-{role});")
    lines += [
        "  --radius-cluos-sm: var(--cluos-radius-sm);",
        "  --radius-cluos-md: var(--cluos-radius-md);",
        "  --radius-cluos-pill: var(--cluos-radius-pill);",
    ]
    for k in spec["geometry"]["containers"]:
        lines.append(f"  --container-cluos-{k}: var(--cluos-container-{k});")
    lines += [
        "  --ease-cluos-out: var(--cluos-ease-out);",
        "  --ease-cluos-standard: var(--cluos-ease-in-out);",
        "}",
    ]
    return "\n".join(lines) + "\n"


def render_shadcn(spec: dict) -> str:
    mapping = [
        ("background", "var(--cluos-bg)"),
        ("foreground", "var(--cluos-fg)"),
        ("card", "var(--cluos-surface)"),
        ("card-foreground", "var(--cluos-fg)"),
        ("popover", "var(--cluos-surface)"),
        ("popover-foreground", "var(--cluos-fg)"),
        ("primary", "var(--cluos-action)"),
        ("primary-foreground", "var(--cluos-action-fg)"),
        ("secondary", "var(--cluos-bg-muted)"),
        ("secondary-foreground", "var(--cluos-fg)"),
        ("muted", "var(--cluos-bg-subtle)"),
        ("muted-foreground", "var(--cluos-fg-3)"),
        ("accent", "var(--cluos-bg-subtle)"),
        ("accent-foreground", "var(--cluos-fg)"),
        ("destructive", "var(--cluos-status-danger)"),
        ("destructive-foreground", "var(--cluos-white)"),
        ("border", "var(--cluos-line)"),
        ("input", "var(--cluos-line-2)"),
        ("ring", "var(--cluos-line-strong)"),
        ("radius", "var(--cluos-radius-md)"),
    ]
    mapping += [(f"chart-{i}", f"var(--cluos-chart-{i})") for i in range(1, 6)]
    mapping += [
        ("sidebar", "var(--cluos-bg-subtle)"),
        ("sidebar-foreground", "var(--cluos-fg)"),
        ("sidebar-primary", "var(--cluos-action)"),
        ("sidebar-primary-foreground", "var(--cluos-action-fg)"),
        ("sidebar-accent", "var(--cluos-bg-muted)"),
        ("sidebar-accent-foreground", "var(--cluos-fg)"),
        ("sidebar-border", "var(--cluos-line)"),
        ("sidebar-ring", "var(--cluos-line-strong)"),
    ]
    body = "\n".join(f"  --{k}: {v};" for k, v in mapping)
    return (
        f"/* cluos-v2 — tema shadcn/ui. {BANNER}\n"
        "   Substitui o bloco :root/.dark gerado pelo shadcn. Importe depois de tokens.css.\n"
        "   O seletor inclui os escopos de tema para que a troca de modo se propague. */\n"
        ":root,\n[data-theme],\n[data-appearance],\n.dark {\n" + body + "\n}\n"
    )


def render_design_json(spec: dict) -> str:
    def color(v):
        return {"$type": "color", "$value": v}

    def dim(v):
        return {"$type": "dimension", "$value": v}

    doc = {
        "$description": f"cluos-v2 — W3C Design Tokens (DTCG). {BANNER}",
        "brand": {kebab(k): {**color(v["value"]), "$description": v["name"]} for k, v in spec["brand"].items()},
        "neutral": {k: color(v) for k, v in spec["neutral"].items()},
        "theme": {
            m: {
                "semantic": {
                    kebab(k): (color(v) if not k == "ring" else {"$type": "shadow", "$value": v})
                    for k, v in spec["semantic"][m].items()
                },
                "status": {n: {s: color(c) for s, c in st[m].items()} for n, st in spec["status"].items()},
                "hue": {n: {s: color(c) for s, c in h[m].items()} for n, h in spec["hue"].items()},
            }
            for m in ("light", "dark")
        },
        "chart-order": {"$type": "other", "$value": spec["chart_order"]},
        "font": {
            role: {"$type": "fontFamily", "$value": f.get("stack") or []}
            for role, f in spec["typography"]["families"].items()
        },
        "font-weight": {kebab(k): {"$type": "fontWeight", "$value": v} for k, v in spec["typography"]["weights"].items()},
        "typography": {
            role: {
                "$type": "typography",
                "$value": {
                    "fontFamily": f"{{font.{r['family']}}}",
                    "fontSize": r.get("fluid") or px(r["size"]),
                    "lineHeight": r["line"],
                    "letterSpacing": r["tracking"],
                    "fontWeight": r["weight"],
                },
            }
            for role, r in spec["typography"]["roles"].items()
        },
        "space": {
            str(s): dim("0px" if s == 0 else f"{s * spec['spacing']['base_px']}px") for s in spec["spacing"]["scale"]
        },
        "radius": {k: dim(px(v) if v else "0px") for k, v in spec["geometry"]["radius"].items()},
        "container": {k: dim(v) for k, v in spec["geometry"]["containers"].items()},
        "duration": {k: {"$type": "duration", "$value": f"{v}ms"} for k, v in spec["motion"]["durations"].items()},
        "easing": {
            "out": {"$type": "cubicBezier", "$value": [0.2, 0.8, 0.2, 1]},
            "in-out": {"$type": "cubicBezier", "$value": [0.4, 0, 0.2, 1]},
        },
    }
    return json.dumps(doc, ensure_ascii=False, indent=2) + "\n"


def render_brief(spec: dict) -> str:
    L = spec["semantic"]["light"]
    D = spec["semantic"]["dark"]
    fam = spec["typography"]["families"]
    st = spec["status"]
    hues = spec["hue"]
    rows = "\n".join(
        f"| {n} | {h['deg']}° | `{h['light']['fill']}` · `{h['light']['line']}` · `{h['light']['text']}` | "
        f"`{h['dark']['fill']}` · `{h['dark']['line']}` · `{h['dark']['text']}` |"
        for n, h in hues.items()
    )
    status_rows = "\n".join(
        f"| {n} | `{s['light']['fill']}` · `{s['light']['line']}` · `{s['light']['text']}` | "
        f"`{s['dark']['fill']}` · `{s['dark']['line']}` · `{s['dark']['text']}` |"
        for n, s in st.items()
    )
    roles = "\n".join(
        f"| {role} | {fam[r['family']]['family']} | {r.get('fluid') or px(r['size'])} | {r['line']} | {r['tracking']} | {r['weight']} |"
        for role, r in spec["typography"]["roles"].items()
    )
    accent = fam["accent"]
    return f"""<!-- {BANNER} -->
# CluOS — brief para agentes (cluos-v2)

Cole este arquivo inteiro no contexto de qualquer LLM ou editor (Claude, Cursor,
ChatGPT, Gemini) antes de gerar uma interface CluOS. Ele substitui adjetivos
como "bonito" ou "premium" por valores exatos. Não invente cores, fontes,
raios, sombras ou espaçamentos fora daqui.

## Identidade em uma linha

Quieto por padrão, preciso onde importa. Hierarquia por tipografia, peso e
espaço; cor comunica estrutura ou estado, nunca decoração.

## Como consumir

```css
@import "@cluos/design-system/fonts.css";
@import "@cluos/design-system/tokens.css";
@import "@cluos/design-system/cluos.css"; /* componentes de referência, opcional */
```

Raiz: `<html lang="pt-BR" data-cluos-canonical="cluos-v2" data-theme="light">`.
Escuro: `data-theme="dark"`. Densidade compacta: `data-density="compact"`.
Tailwind v3: preset `@cluos/design-system/tailwind-preset`. Tailwind v4:
`@cluos/design-system/tailwind.css`. shadcn/ui: `@cluos/design-system/shadcn.css`.

## Cores (use sempre a variável, nunca o hex)

| Papel | Variável | Claro | Escuro |
|---|---|---|---|
| Canvas | `--cluos-bg` | `{L['bg']}` | `{D['bg']}` |
| Faixa, cabeçalho de tabela | `--cluos-bg-subtle` | `{L['bg_subtle']}` | `{D['bg_subtle']}` |
| Superfície | `--cluos-surface` | `{L['surface']}` | `{D['surface']}` |
| Texto | `--cluos-fg` | `{L['fg']}` | `{D['fg']}` |
| Texto secundário | `--cluos-fg-2` | `{L['fg_2']}` | `{D['fg_2']}` |
| Texto sutil | `--cluos-fg-3` | `{L['fg_3']}` | `{D['fg_3']}` |
| Desabilitado (nunca texto informativo) | `--cluos-fg-disabled` | `{L['fg_disabled']}` | `{D['fg_disabled']}` |
| Hairline | `--cluos-line` | `{L['line']}` | `{D['line']}` |
| Borda de campo | `--cluos-line-2` | `{L['line_2']}` | `{D['line_2']}` |
| Borda forte, aba ativa | `--cluos-line-strong` | `{L['line_strong']}` | `{D['line_strong']}` |
| Ação primária (uma por região) | `--cluos-action` / texto `--cluos-action-fg` | `{L['action']}` / `{L['action_fg']}` | `{D['action']}` / `{D['action_fg']}` |
| Seleção suave | `--cluos-action-soft` | `{L['action_soft']}` | `{D['action_soft']}` |
| Progresso | `--cluos-progress` | `{L['progress']}` | `{D['progress']}` |
| Foco (anel duplo) | `--cluos-ring-focus` | `{L['ring']}` | `{D['ring']}` |

Marca (referência Azigos): azul profundo `#010D28`, azul médio `#132952`, verde
tech `#C4DB7B`, branco, cinza claro `#EAEAEA`, cinza médio `#A5A5A5`,
off-white `#F4EFED` (só registro público).

### Status — sempre ícone + texto, nunca cor sozinha

Variáveis `--cluos-status-<nome>` (linha/ícone), `-bg` (fundo), `-text` (texto).

| Status | Claro fundo · linha · texto | Escuro fundo · linha · texto |
|---|---|---|
{status_rows}

### Arco-íris — 12 matizes para categorias, etiquetas, calendário, avatares e identificação de produto

Nunca para ação, status ou navegação. Variáveis `--cluos-hue-NN-fill|line|text`.

| Matiz | ° | Claro fundo · linha · texto | Escuro fundo · linha · texto |
|---|---|---|---|
{rows}

Gráficos: use `--cluos-chart-1` … `--cluos-chart-8` nessa ordem, nunca recicle;
a nona série vira "Outros". Quando a série é um produto, use `--cluos-product-<id>`.

## Tipografia

- Display: {fam['display']['family']} (`--cluos-font-display`), 300 base e 650 só no que importa. Nunca 700+.
- Interface e dados: {fam['sans']['family']} (`--cluos-font-sans`), 400 corpo, 550 rótulos e botões, números tabulares.
- Código e identificadores: {fam['mono']['family']} (`--cluos-font-mono`).
- Destaque: {accent['family']} (`--cluos-font-accent`) só em casos especiais — {'; '.join(accent.get('rules', []))}
- No máximo duas famílias por tela, exceto a fonte de destaque.

| Papel | Família | Tamanho | Entrelinha | Tracking | Peso |
|---|---|---|---|---|---|
{roles}

## Espaço, geometria, movimento

- Espaço: base 4 px, `--cluos-space-N` = N × 4 px (0–24). Inset sm 12 / md 16 / lg 24; stack 4/8/16/24/40.
- Raio: `--cluos-radius-sm` 4 px em controles; `--cluos-radius-md` 8 px em regiões e diálogos; pílula só no CTA público e em chips de filtro. Sem sombra no produto; no escuro a elevação é por tom.
- Containers: wide 80 rem (painéis, tabelas, cabeçalho), product 72 rem (detalhe, formulário), docs 48 rem, prose 42 rem.
- Tabelas: passo de linha 44 px (compacto 36), números à direita e tabulares.
- Movimento: 180 ms hover, 120 ms press, 600 ms entrada de estado, 1200 ms desenho de dados; `prefers-reduced-motion` mostra o resultado final.
- Ícones: Lucide, traço 1,5, 16/20/24 px.

## Proibido

- Gradientes decorativos, glassmorphism, neon, sombras em cartões, cartão dentro de cartão.
- Verde tech em status, link, gráfico ou fundo decorativo; dois botões primários lado a lado.
- Bento grid decorativo, tilt 3D, parallax, ScrollSmoother, revelação letra a letra, áudio ambiente.
- Bibliotecas de efeito (Aceternity UI, React Bits). Radix e shadcn/ui são permitidos.
- Clonar ou raspar sites de terceiros; ilustração figurativa genérica; superlativos e percentuais sem fonte.
- Texto informativo em `#A5A5A5`; placeholder como rótulo; estado só por cor.
"""


OUTPUTS = {
    "tokens/tokens.css": render_css,
    "tokens/fonts.css": render_fonts_css,
    "tokens/tokens.ts": render_ts,
    "tokens/tokens.js": render_js,
    "tokens/index.ts": render_index,
    "tokens/tailwind-preset.js": render_tailwind_preset,
    "tokens/tailwind.css": render_tailwind_v4,
    "tokens/shadcn.css": render_shadcn,
    "tokens/design.json": render_design_json,
    "AGENT-BRIEF.md": render_brief,
}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="não escreve; falha se algo estiver desatualizado")
    args = ap.parse_args()
    spec = yaml.safe_load(SPEC_PATH.read_text(encoding="utf-8"))
    stale = []
    for rel, render in OUTPUTS.items():
        content = render(spec)
        path = ROOT / rel
        current = path.read_text(encoding="utf-8") if path.exists() else None
        if current != content:
            stale.append(rel)
            if not args.check:
                path.write_text(content, encoding="utf-8")
    if args.check:
        if stale:
            print("build-tokens --check: desatualizados:", ", ".join(stale))
            return 1
        print(f"build-tokens --check: {len(OUTPUTS)} arquivos em dia")
        return 0
    print(f"build-tokens: {len(stale)} de {len(OUTPUTS)} arquivos atualizados")
    return 0


if __name__ == "__main__":
    sys.exit(main())
