# MIGRATION-AUDIT.md — cluos-design consolidation

**Date:** 2026-05-04  
**Auditor:** Senior Architecture Agent  
**Purpose:** Document the unification of `cluos-design` (legacy) into `cluos-design-system` (canonical).

---

## Executive Summary

`cluos-design` is an earlier, less structured design repository. It contains useful governance
text and a large collection of raw brand asset exports, but its visual spec is divergent from
the official palette and uses an outdated horizontal lockup. `cluos-design-system` is the more
mature, package-ready repository with correct official values sourced from the brand PDF.

**Decision: `cluos-design-system` is the single source of truth. `cluos-design` becomes legacy.**

---

## Repository State at Audit

### `cluos-design`
| Property | Value |
|----------|-------|
| Branch | `main` |
| Files | `design.md`, `AGENTS.md`, `logo/` |
| Package | None |
| Version | None |
| Tokens | Embedded in `design.md` only |
| Assets | `logo/SVG/` — 23+ SVG variants (raw export board, all artboards), JPEG, PNG, EPS |
| Lockup documented | Horizontal ("horizontal lockup") |
| Primary teal | `#2E8A82` |
| Navy | `#1A252D` |

### `cluos-design-system`
| Property | Value |
|----------|-------|
| Branch | `main` |
| Package name | `@cluos/design-system` |
| Version | `0.1.1` |
| Tokens | `tokens/tokens.css`, `tokens/tokens.ts`, `tokens/tokens.js`, `tokens/tailwind-preset.js` |
| Assets | `brand-assets/` — 12 curated SVG files (stacked lockup, symbols, favicon) |
| Lockup documented | Stacked (symbol above wordmark) |
| Primary teal | `#008080` (official from `Paleta de Cores_CluOs.pdf`) |
| Navy | `#1B2F36` (official) |
| Preview | `DESIGN-preview.html` |
| Guides | `guides/` (raw SVG board, palette PDF) |

---

## Color Divergence

| Token | `cluos-design` | `cluos-design-system` | Resolution |
|-------|----------------|-----------------------|------------|
| `--cluos-teal` | `#2E8A82` | `#008080` | **`#008080` wins** — sourced from official brand PDF |
| `--cluos-navy` | `#1A252D` | `#1B2F36` | **`#1B2F36` wins** — sourced from official brand PDF |
| `--cluos-teal-deep` | `#1F6F6A` | `#006666` | **`#006666` wins** |
| `--cluos-champagne` | `#B2B0A0` | `#C8C1AE` | **`#C8C1AE` wins** — from palette PDF |
| Warn color | `#BD7845` | `#BD7845` | Identical — no conflict |
| Error color | `#8A3A3A` | `#8A3A3A` | Identical — no conflict |

---

## Logo / Lockup Divergence

| Aspect | `cluos-design` | `cluos-design-system` | Resolution |
|--------|----------------|-----------------------|------------|
| Lockup orientation | Horizontal (text beside symbol) | **Stacked** (symbol above text) | **Stacked wins** — matches shipped SVGs |
| Asset naming | Unnamed raw artboards in `logo/SVG/` | Named convention (e.g. `cluos-logo-gradient.svg`) | **Design-system naming wins** |
| Gradient | navy→champagne | black→navy→champagne→silver | **Design-system wins** — matches SVG source |
| Mono variants | Teal, navy | Black, white, navy, teal | **Design-system wins** — more complete |

---

## Content Comparison

### Items migrated from `cluos-design` → `cluos-design-system`

| Item | Source | Destination | Notes |
|------|--------|-------------|-------|
| Authelia governance rules | `cluos-design/AGENTS.md` | Already in `cluos-design-system/AGENTS.md` | Identical — no migration needed |
| Secrets policy | `cluos-design/AGENTS.md` | Already in `cluos-design-system/AGENTS.md` | Identical — no migration needed |
| Domain list | `cluos-design/AGENTS.md` | Already in `cluos-design-system/AGENTS.md` | Identical — no migration needed |
| Production Readiness Gate | `cluos-design/AGENTS.md` | Already in `cluos-design-system/AGENTS.md` | Identical — no migration needed |

### Items NOT migrated

| Item | Reason |
|------|--------|
| `logo/SVG/CLUOS_FINAL_SVG_Prancheta *.svg` (23 artboards) | Raw export board with unnamed/numbered artboards. Not useful as individual assets. Design-system has the curated, named set. |
| `logo/JPEG_CMYK/`, `logo/PNG_CMYK/`, `logo/PNG_RGB/`, `logo/JPEG_RGB/` | Binary raster files. Large, not needed in package. |
| `logo/CLUOS_FINAL.eps` | Binary EPS master file. Belongs in private storage, not in a public package. |
| `logo/Paleta de Cores/` | Source PDF already mirrored in `cluos-design-system/guides/`. |
| Divergent teal `#2E8A82` | Contradicts official palette. Must not be introduced. |
| Horizontal lockup reference | Contradicts shipped stacked lockup. Must not be introduced. |
| `design.md` body (most sections) | Superceded by `DESIGN.md` in design-system, which is more accurate and complete. |

---

## Security Audit

- **No passwords, API keys, OAuth tokens, or access credentials found** in either repository.
- `design.md` contains a Google Drive URL (canonical public reference for brand assets). This URL also appears in `cluos-design-system/DESIGN.md` and is safe to retain.
- No `.env`, `.env.local`, `.env.production` files found.
- No database URLs, webhook secrets, or private keys found.
- Binary files (JPEG, PNG, EPS) reviewed for embedded metadata — none contain sensitive data.
- **No rotation required.**

---

## Divergences Resolved

1. **Official teal:** `#008080` (design-system) is the canonical value. The `#2E8A82` value in `cluos-design` is retired.
2. **Official navy:** `#1B2F36` (design-system) is the canonical value.
3. **Lockup:** Stacked mark is official. Horizontal lockup reference in `cluos-design` is historical and does not reflect shipped assets.
4. **Authority:** `cluos-design-system` is the single source of truth. `cluos-design` is marked as legacy/non-canonical.

---

## Files That Remain Only in Legacy (`cluos-design`)

These files are NOT in `cluos-design-system` and were intentionally not migrated:

- `logo/CLUOS_FINAL.eps` — EPS master; keep in private storage if needed.
- `logo/JPEG_*`, `logo/PNG_*` — Raster exports; not needed in the package.
- `logo/SVG/CLUOS_FINAL_SVG_Prancheta *.svg` — Raw artboard exports (23 files). Historical only.

---

## Recommendation on `cluos-design`

**Status: Archive after validation.**

Recommended action:
1. Confirm no other repository imports from `cluos-design` directly (no NPM package, no `git submodule`).
2. Update `cluos-design/README.md` to mark it as legacy.
3. Archive the repository on GitHub (Settings → Archive repository).

If the EPS master or raw artboards are needed for future print/brand work, export them to a private storage bucket (Google Drive, already referenced) before archiving.

---

## Post-Migration State

After this migration:

- `cluos-design-system` = canonical, installable, documented, governed.
- `cluos-design` = legacy, non-canonical, marked with warnings, ready to archive.
- No two design files have equal authority over the CluOS visual language.
- Agents following `AGENTS.md` in `cluos-design-system` will find a complete, non-contradictory system.
