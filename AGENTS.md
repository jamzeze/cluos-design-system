# AGENTS.md — cluos-design-system

## Mission

`cluos-design-system` is the **single, canonical source** of CluOS visual identity, design tokens, UX principles, product patterns, and agent governance.

Every product (`crm-cluos`, `automatic-aeo`, `medframe`, `b3`, `scireg`, `prognus-ui`, `suporte`) must consume this package for all design decisions.
No other repository may define colors, typography, spacing, or interaction patterns from scratch.

---

## Mandatory Reading (read before making any change)

1. `DESIGN.md` — visual identity contract: color palette, typography, spacing, borders, shadows.
2. `APPLE-INSPIRED-PRODUCT-UX.md` — UX principles: progressive disclosure, clarity, focus, motion, per-product guidelines.
3. `PRODUCT-PATTERNS.md` — page and feature patterns for every CluOS product type.
4. `patterns/components.md` — component anatomy, tokens, states, accessibility.
5. `patterns/states.md` — all dynamic states (loading, empty, error, processing, success…).
6. `patterns/accessibility.md` — WCAG 2.1 AA requirements.
7. `patterns/content-guidelines.md` — interface copy rules.
8. `DESIGN-WORKFLOW.md` — how to make and validate design changes.
9. `DESIGN-preview.html` — visual reference; must stay aligned with tokens.

---

## Operating Rules

- `DESIGN-preview.html` is the visual source of truth. `DESIGN.md` and tokens must stay aligned with it.
- Prefer small, reviewable changes that preserve package stability for consuming repositories.
- Do not add unnecessary runtime infrastructure to this package repository.
- Treat release artifacts, docs, and tokens as one coherent system.
- Never define a new color or spacing value without adding it to `tokens/tokens.css`, `tokens/tokens.ts`, and `tokens/tokens.js`.
- Never hardcode a hex value, RGB value, or pixel measurement in any example, component, or documentation. Always use `var(--cluos-*)`.
- The primary accent is `#008080` (--cluos-teal). Do not introduce alternative accent colors.

---

## Design System Rules

### Tokens
- All visual values (color, spacing, radius, shadow, duration) come from `tokens/tokens.css`.
- Consuming repos import `@cluos/design-system/tokens.css` or use the Tailwind preset.
- Do not fork or shadow tokens locally in consuming repos.

### Colors
- Accent: `var(--cluos-teal)` only. No secondary brand colors.
- Text: `var(--cluos-navy)`, `var(--cluos-text)`, `var(--cluos-text-muted)`, `var(--cluos-text-subtle)`.
- Status: `success`, `warn`, `error`, `info` — use the token, never a raw hex.
- Background: `var(--cluos-bg)`, `var(--cluos-bg-subtle)`, `var(--cluos-bg-muted)`.
- Light mode only in MVP. No dark mode tokens yet.

### Typography
- Font: Inter (system-ui fallback). `var(--cluos-font-sans)`.
- Scale: `var(--cluos-text-xs)` through `var(--cluos-text-4xl)`.
- Weights: 400 (body), 500 (labels/buttons), 600 (headings). Never 700+ in product UI.

### Buttons
- One primary action per visual region (card, section, page). Never two `btn-primary` side by side.
- Primary: `var(--cluos-teal)` background.
- Secondary: border + text, no fill.
- Ghost: text-only, teal color.
- Destructive: `var(--cluos-status-error)` background, used only in confirm dialogs.

### Layout
- Max container (product): `var(--cluos-container-product)` (960px).
- Max container (narrow): `var(--cluos-container-narrow)` (640px).
- Spacing scale: `var(--cluos-space-*)`.
- Border radius: `var(--cluos-radius-sm/md/lg/xl)`.

---

## UX Implementation Rules (Apple-Inspired)

1. **One primary action per region.** Each card, section, or page has exactly one emphasized CTA.
2. **3-second clarity.** The user must understand what to do next within 3 seconds of landing.
3. **Progressive disclosure.** Show only what is needed. Advanced options collapse by default.
4. **All dynamic states defined.** Every data-dependent component implements: loading (skeleton), empty, error, and at least one success state.
5. **No gratuitous animation.** Motion only for state transitions (`prefers-reduced-motion` must be respected).
6. **Labels, never placeholders.** Form fields always have visible `<label>` elements. Placeholders are supplemental hints only.
7. **Honest feedback.** If a system is offline, say "Offline". If processing, say "Processando". Never hide system state from the user.
8. **Semantic HTML.** Use `main`, `header`, `nav`, `section`, `article`, proper `aria-*` attributes throughout.

---

## Apple-Inspired Checklist (run before shipping any UI)

Answer YES to all before marking a UI task complete:

- [ ] Is there only one primary action (teal button) per visual region?
- [ ] Can the user understand the next step within 3 seconds?
- [ ] Are advanced options progressively disclosed (collapsed by default)?
- [ ] Does every data-fetching component have a loading skeleton?
- [ ] Does every list/grid have an empty state?
- [ ] Does every async operation have an error state with retry?
- [ ] Is all copy consistent with `patterns/content-guidelines.md` (verb+object buttons, no jargon)?
- [ ] Are all form fields labeled with `<label>` (not just placeholder)?
- [ ] Does the component respect `prefers-reduced-motion`?
- [ ] Does every interactive element have a visible focus ring (`var(--cluos-ring-focus)`)?
- [ ] Are all colors from `var(--cluos-*)` tokens? (no raw hex values)
- [ ] Does every status use the correct semantic token (success/warn/error/info)?
- [ ] Is there no decorative animation without a motion-safe fallback?
- [ ] Does the page have a proper heading hierarchy (h1 → h2 → h3)?
- [ ] Is the layout max-width capped at `var(--cluos-container-product)` or narrower?

## Secrets, Credentials, Bitwarden and GitHub Secrets Policy

- Secrets include passwords, API keys, tokens, private keys, database URLs, OAuth credentials, webhook signing secrets, service-account JSON files, recovery codes, package publishing credentials, and any value that grants access to infrastructure or protected data.
- Never commit, print, screenshot, log, or document real secrets in code, markdown, issues, PRs, terminal output, CI logs, or final reports.
- Human credentials belong in Bitwarden only, restricted to the `Cluos Infra` vault or collection.
- Automation, runtime, deploy, and CI/CD credentials belong in GitHub Secrets.
- Hybrid credentials must exist in Bitwarden plus GitHub Secrets.
- Agents must never request or use unrestricted access to the user's personal vault.
- Local `.env` files are development fallbacks only; they are never the canonical production source of truth.
- `.env.example` may contain only safe placeholders in `UPPER_SNAKE_CASE`; prefer `AUTHELIA_STORAGE_ENCRYPTION_KEY` as the canonical Authelia storage secret name.
- Browser procedure for login or 2FA: let Rafael log in, navigate to the target page, create or wire the credential, validate presence without revealing the value, and then clear temporary exposure paths.
- Classification is mandatory for every new credential: `human`, `automation`, `hybrid`, or `local_dev`.
- Authelia human admin credentials and recovery codes go to Bitwarden; Authelia machine secrets such as `AUTHELIA_JWT_SECRET`, `AUTHELIA_SESSION_SECRET`, `AUTHELIA_STORAGE_ENCRYPTION_KEY`, `AUTHELIA_ADMIN_*`, and `INTERNAL_PROXY_TOKEN` go to GitHub Secrets when automation needs them.
- If any secret is exposed, stop, remove the exposure when allowed, rotate the credential, and document only the secret type and location.

## Authelia, Hub and Access Governance

- Online apps must sit behind the shared edge trust boundary: Browser -> Caddy -> Authelia -> App.
- Applications may trust identity only from proxy-injected headers: `Remote-User`, `Remote-Email`, `Remote-Name`, and `Remote-Groups`.
- Sensitive internal APIs in production must also require `X-Internal-Proxy-Token` or an equivalent GitHub-managed runtime secret.
- Use simple app groups for MVP, not complex RBAC.
- Login is email-first; the master admin is `costarafaelhr@gmail.com` in group `admins` with access to all scoped apps.
- 2FA is mandatory only for administrators in the MVP. Common users should not be forced into 2FA unless a documented technical limitation requires it.
- `admin.cluos.online` is the Hub Master entrypoint and operational source for user creation, deactivation, password reset, group assignment, and audit review.
- This package is not part of the default public app rollout; any future hosted preview, documentation portal, or admin surface must use the shared edge and Authelia before exposure.
- Administrative actions must preserve or emit audit trails.

## Default Online App Domains

- `cluos.online` -> Hub/landing
- `admin.cluos.online` -> administrative area
- `auth.cluos.online` -> Authelia
- `b3.cluos.online` -> B3
- `crm.cluos.online` -> CRM Cluos
- `sci.cluos.online` -> Sci-OS
- `neuro.cluos.online` -> Neuro-Est
- `loteca.cluos.online` -> Loteca
- `did.cluos.online` -> DID
- `aeo.cluos.online` -> Automatic-AEO

## Production Readiness Gate

- Domain configured.
- Caddy route configured.
- Authelia policy configured.
- Access group defined.
- Healthcheck working.
- Logs redacted; no secrets in logs.
- GitHub Secrets populated for deploy and runtime.
- `.env.example` contains placeholders only.
- Rollback path documented.
- Minimum audit trail active.
- Master admin `costarafaelhr@gmail.com` validated.
- No sample users or default passwords in production.