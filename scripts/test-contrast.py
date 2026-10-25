#!/usr/bin/env python3
"""Verifica os contratos de contraste do cluos-v2 a partir de tokens/cluos-v2.yaml.

Regras verificadas (WCAG 2.2):
- texto (fg, fg_2, fg_3) sobre bg, bg_subtle e surface: >= 4,5:1 nos dois modos;
- texto de status sobre o próprio fill e sobre bg: >= 4,5:1; linha de status sobre bg: >= 3:1;
- texto de matiz sobre o próprio fill e sobre bg: >= 4,5:1; linha de matiz sobre bg: >= 3:1;
- texto da ação (action_fg) sobre action e action_hover: >= 4,5:1;
- anel de foco: o anel externo >= 3:1 contra o canvas (bg e bg_subtle);
- progresso (progress) sobre bg: >= 3:1.

Uso: python3 scripts/test-contrast.py [--yaml tokens/cluos-v2.yaml]
Sai com 1 em qualquer falha. Não usa dependências além da biblioteca padrão e PyYAML.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML é necessário: pip install pyyaml")


def _lin(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def parse(color: str) -> tuple[float, float, float, float]:
    """Devolve (r, g, b, a) em 0..1 para #RRGGBB ou rgba(r, g, b, a)."""
    color = color.strip()
    if color.startswith("#"):
        h = color[1:]
        return int(h[0:2], 16) / 255, int(h[2:4], 16) / 255, int(h[4:6], 16) / 255, 1.0
    m = re.match(r"rgba?\(([^)]+)\)", color)
    if not m:
        raise ValueError(f"cor não reconhecida: {color}")
    parts = [p.strip() for p in m.group(1).split(",")]
    r, g, b = (float(p) / 255 for p in parts[:3])
    a = float(parts[3]) if len(parts) > 3 else 1.0
    return r, g, b, a


def composite(fg: str, bg: str) -> tuple[float, float, float]:
    r, g, b, a = parse(fg)
    br, bgc, bb, _ = parse(bg)
    return (r * a + br * (1 - a), g * a + bgc * (1 - a), b * a + bb * (1 - a))


def luminance(rgb: tuple[float, float, float]) -> float:
    r, g, b = (_lin(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(fg: str, bg: str) -> float:
    """Contraste WCAG; cores com alfa são compostas sobre bg antes da medida."""
    l1 = luminance(composite(fg, bg))
    l2 = luminance(composite(bg, bg))
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


MACHADO = {
    "protan": ((0.152286, 1.052583, -0.204868), (0.114503, 0.786281, 0.099216), (-0.003882, -0.048116, 1.051998)),
    "deutan": ((0.367322, 0.860646, -0.227968), (0.280085, 0.672501, 0.047413), (-0.011820, 0.042940, 0.968881)),
}


def _oklab(lin: tuple[float, float, float]) -> tuple[float, float, float]:
    r, g, b = lin
    l_ = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
    m_ = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s_ = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    return (
        0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
    )


def delta_e(a: str, b: str, sim: str | None = None) -> float:
    """Distância OKLab ×100, opcionalmente sob simulação de daltonismo."""

    def lab(color: str) -> tuple[float, float, float]:
        r, g, bl, _ = parse(color)
        lin = (_lin(r), _lin(g), _lin(bl))
        if sim:
            m = MACHADO[sim]
            lin = tuple(min(1.0, max(0.0, sum(m[i][j] * lin[j] for j in range(3)))) for i in range(3))
        return _oklab(lin)

    la, lb = lab(a), lab(b)
    return 100 * sum((x - y) ** 2 for x, y in zip(la, lb)) ** 0.5


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--yaml", default=str(Path(__file__).resolve().parent.parent / "tokens" / "cluos-v2.yaml"))
    args = ap.parse_args()
    spec = yaml.safe_load(Path(args.yaml).read_text(encoding="utf-8"))

    failures: list[str] = []
    checks = 0

    def need(label: str, fg: str, bg: str, minimum: float) -> None:
        nonlocal checks
        checks += 1
        ratio = contrast(fg, bg)
        if ratio < minimum:
            failures.append(f"{label}: {ratio:.2f}:1 < {minimum}:1 ({fg} sobre {bg})")

    for mode in ("light", "dark"):
        sem = spec["semantic"][mode]
        for surface in ("bg", "bg_subtle", "surface"):
            for text in ("fg", "fg_2", "fg_3"):
                need(f"{mode} {text}/{surface}", sem[text], sem[surface], 4.5)
        need(f"{mode} action_fg/action", sem["action_fg"], sem["action"], 4.5)
        need(f"{mode} action_fg/action_hover", sem["action_fg"], sem["action_hover"], 4.5)
        need(f"{mode} progress/bg", sem["progress"], sem["bg"], 3.0)
        need(f"{mode} line_strong/bg", sem["line_strong"], sem["bg"], 3.0)
        # O anel é duplo: o interno (verde) encosta no componente, o externo
        # encosta no canvas. O externo é o indicador que precisa de 3:1 contra o
        # canvas em qualquer componente, inclusive sobre o botão verde.
        rings = re.findall(r"(#[0-9A-Fa-f]{6})", sem["ring"])
        need(f"{mode} anel externo/bg", rings[1], sem["bg"], 3.0)
        need(f"{mode} anel externo/bg_subtle", rings[1], sem["bg_subtle"], 3.0)
        for name, st in spec["status"].items():
            steps = st[mode]
            need(f"{mode} status {name} text/fill", steps["text"], steps["fill"], 4.5)
            need(f"{mode} status {name} text/bg", steps["text"], sem["bg"], 4.5)
            need(f"{mode} status {name} line/bg", steps["line"], sem["bg"], 3.0)
        for name, hue in spec["hue"].items():
            steps = hue[mode]
            need(f"{mode} {name} text/fill", steps["text"], steps["fill"], 4.5)
            need(f"{mode} {name} text/bg", steps["text"], sem["bg"], 4.5)
            need(f"{mode} {name} line/bg", steps["line"], sem["bg"], 3.0)
            need(f"{mode} {name} fg/fill", sem["fg"], steps["fill"], 4.5)

    # Ordem de gráficos: pares vizinhos precisam se distinguir sob protanopia e
    # deuteranopia (Machado, Oliveira e Fernandes 2009, severidade 1,0) com
    # ΔE OKLab×100 >= 8, em visão normal com ΔE >= 15, e ter >= 3:1 sobre o canvas.
    for mode in ("light", "dark"):
        lines = [spec["hue"][h][mode]["line"] for h in spec["chart_order"]]
        bg = spec["semantic"][mode]["bg"]
        for i, c in enumerate(lines):
            need(f"{mode} gráfico {i + 1} ({spec['chart_order'][i]})/bg", c, bg, 3.0)
        for i in range(len(lines) - 1):
            a, b = lines[i], lines[i + 1]
            checks += 2
            normal = delta_e(a, b)
            cvd = min(delta_e(a, b, "protan"), delta_e(a, b, "deutan"))
            if normal < 15:
                failures.append(f"{mode} gráfico {i + 1}-{i + 2}: ΔE normal {normal:.1f} < 15 ({a} × {b})")
            if cvd < 8:
                failures.append(f"{mode} gráfico {i + 1}-{i + 2}: ΔE daltonismo {cvd:.1f} < 8 ({a} × {b})")

    print(f"test-contrast: {checks} pares verificados, {len(failures)} falhas")
    for f in failures:
        print("  FALHA", f)
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
