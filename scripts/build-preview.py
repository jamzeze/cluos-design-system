#!/usr/bin/env python3
"""Gera DESIGN-preview.html a partir de scripts/preview.template.html e tokens/cluos-v2.yaml.

As amostras repetitivas (neutros, papéis, matizes, ordem de gráfico, etiquetas de
produto, papéis tipográficos, escala de espaço) vêm do contrato; o resto do
espécime está no modelo. Nunca edite DESIGN-preview.html à mão.

Uso: python3 scripts/build-preview.py [--check]
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "scripts" / "preview.template.html"
SYMBOL = ROOT / "scripts" / "preview-symbol.svg"
SPEC = ROOT / "tokens" / "cluos-v2.yaml"
OUT = ROOT / "DESIGN-preview.html"

PRODUCT_NAMES = {"azigos": "Azigos", "crm": "CRM", "sci": "Sci-OS", "b3": "B3", "medframe": "MedFrame",
                 "loteca": "Loteca", "did": "DID", "aeo": "AEO"}
SAMPLES = {
    "display-xl": 'Clínica em <span class="cluos-strong">foco</span>',
    "display-lg": "Visão geral da operação",
    "heading-md": "Serviços com atenção",
    "heading-sm": "Incidentes recentes",
    "metric": "99,62 %",
    "title": "Convidar usuário para o CRM",
    "body": "O convite expira em sete dias. A pessoa recebe um e-mail com o link de acesso.",
    "body-sm": "Última verificação há 2 minutos · próxima em 58 s",
    "label": "Estado do serviço",
    "mono": "2026-10-24T14:02:11-03:00 · sha 3fc656f",
}


def icon(paths: str) -> str:
    return ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{paths}</svg>')


ICONS = {  # Lucide, traço 1,5
    "I_OK": icon('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
    "I_WARN": icon('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>'
                   '<path d="M12 9v4"/><path d="M12 17h.01"/>'),
    "I_ERR": icon('<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'),
    "I_INFO": icon('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
    "I_DRAFT": icon('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>'
                    '<path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
    "I_MORE": icon('<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'),
    "I_RESTART": icon('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>'
                      '<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>'),
}


def render(spec: dict) -> str:
    tpl = TEMPLATE.read_text(encoding="utf-8")
    sym = SYMBOL.read_text(encoding="utf-8").strip().replace("<svg ", '<svg style="width:100%;height:auto;display:block" ', 1)
    neutrals = "".join(
        f'<div class="sp-swatch"><div class="sp-swatch__chip" style="background: var(--cluos-neutral-{k})"></div>'
        f'<span class="cluos-mono">{k}{" ★" if k in ("100", "500") else ""}</span></div>'
        for k in spec["neutral"])
    roles = [("bg", "canvas"), ("bg-subtle", "faixa"), ("surface", "superfície"), ("fg", "texto"), ("fg-2", "secundário"),
             ("fg-3", "sutil"), ("line", "hairline"), ("line-strong", "borda forte"), ("action", "ação"), ("progress", "progresso")]
    roles_html = "".join(
        f'<div class="sp-swatch"><div class="sp-swatch__chip" style="background: var(--cluos-{v})"></div>'
        f'<span class="sp-swatch__name">{n}</span><span class="cluos-mono">--cluos-{v}</span></div>' for v, n in roles)

    def hues(keys):
        return "".join(
            f'<span class="cluos-mono">{k.replace("hue-", "")} · {spec["hue"][k]["deg"]}°</span>'
            f'<div class="c" style="background: var(--cluos-{k}-fill)"></div>'
            f'<div class="c" style="background: var(--cluos-{k}-line)"></div>'
            f'<div class="c" style="background: var(--cluos-{k}-text)"></div>' for k in keys)

    keys = list(spec["hue"])
    chart = "".join(f'<div style="background: var(--cluos-chart-{i})" title="{k}"></div>'
                    for i, k in enumerate(spec["chart_order"], 1))
    tags = "".join(f'<span class="cluos-tag cluos-{h}">{PRODUCT_NAMES.get(p, p)}</span>' for p, h in spec["product_hue"].items())
    fam = spec["typography"]["families"]
    rows = ""
    for role, r in spec["typography"]["roles"].items():
        extra = (" text-transform: uppercase;" if r.get("transform") == "uppercase" else "") + \
                (" font-variant-numeric: tabular-nums;" if r.get("numeric") == "tabular" else "")
        size = r.get("fluid") or f'{r["size"]} px'
        rows += (f'<div class="sp-type-row"><span class="cluos-mono">{role}</span>'
                 f'<span style="font-family: var(--cluos-font-{r["family"]}); font-size: var(--cluos-type-{role}-size); '
                 f'line-height: var(--cluos-type-{role}-line); letter-spacing: var(--cluos-type-{role}-tracking); '
                 f'font-weight: var(--cluos-type-{role}-weight);{extra} min-width: 0; overflow-wrap: anywhere">{SAMPLES.get(role, role)}</span>'
                 f'<span class="cluos-mono">{fam[r["family"]]["family"]} · {size} · {r["line"]} · {r["tracking"]} · {r["weight"]}</span></div>')
    base = spec["spacing"]["base_px"]
    space = "".join(f'<span class="cluos-mono">{s}</span><span class="cluos-mono">{s * base}</span>'
                    f'<div class="sp-bar" style="width: var(--cluos-space-{s})"></div>' for s in spec["spacing"]["scale"])
    out = tpl
    for key, value in {"SYMBOL": sym, "NEUTRALS": neutrals, "ROLES": roles_html, "HUES_A": hues(keys[:6]),
                       "HUES_B": hues(keys[6:]), "CHART_ORDER": chart, "PRODUCT_TAGS": tags, "TYPE_ROWS": rows,
                       "SPACE_ROWS": space, **ICONS}.items():
        out = out.replace("{{" + key + "}}", value)
    left = re.findall(r"\{\{\w+\}\}", out)
    if left:
        raise SystemExit(f"placeholders sem valor: {left}")
    return out.replace("<!doctype html>", "<!doctype html>\n<!-- Gerado por scripts/build-preview.py. Não edite à mão. -->", 1)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()
    content = render(yaml.safe_load(SPEC.read_text(encoding="utf-8")))
    current = OUT.read_text(encoding="utf-8") if OUT.exists() else None
    if args.check:
        ok = current == content
        print("build-preview --check:", "em dia" if ok else "desatualizado")
        return 0 if ok else 1
    if current != content:
        OUT.write_text(content, encoding="utf-8")
        print("build-preview: DESIGN-preview.html atualizado")
    else:
        print("build-preview: sem mudanças")
    return 0


if __name__ == "__main__":
    sys.exit(main())
