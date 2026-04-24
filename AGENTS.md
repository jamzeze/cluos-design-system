# AGENTS.md — cluos-design-system

## Mission
Maintain the canonical Cluos visual language package, shipping consistent tokens, assets, guides, and preview references that downstream repositories can trust.

## Operating Rules
- `DESIGN-preview.html` is the visual source of truth; `DESIGN.md` and tokens must stay aligned with it.
- Prefer small, reviewable changes that preserve package stability for consuming repositories.
- Do not add unnecessary runtime infrastructure to this package repository.
- Treat release artifacts, docs, and tokens as one coherent system.

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