---
paths:
  - "infra/**"
  - "**/Caddyfile*"
  - "**/docker-compose*.yml"
  - "**/docker-compose*.yaml"
  - ".github/workflows/**"
  - "**/*.sql"
  - "supabase/**"
  - "drizzle/**"
  - "prisma/**"
  - "**/authelia/**"
  - "**/deploy*.sh"
---

# CluOS — regras para arquivos de infraestrutura, deploy e banco

Carregada só quando um arquivo acima é lido. Fonte:
`global-copilot-os/claude-global/rules/cluos-ops.md`, instalada por
`cluos-design-system/scripts/sync-claude-rules.sh`.

- Editar Caddy, Authelia, DNS, deploy, migração ou template de segredo **como
  código, em branch, sem aplicar ao runtime** segue
  `cluos-harness/canonical/25-protected-action-supervisor-policy.md`.
- Aplicar ao runtime (reload, restart, deploy, rollback, migração aditiva em
  produção) segue a autorização permanente e a lista de evidências do
  `AGENTS.md` raiz do workspace §Standing Operational Authorization: classificação,
  host/repo/path exato, pré-checagem, rollback que sobrevive à ação,
  pós-checagem e audit log.
- Gates humanos: `cluos-harness/canonical/26-autonomous-ops-policy.md`
  §Human-Only Gates. Migração destrutiva, `DROP`, `TRUNCATE` e `DELETE` sem
  `WHERE` são gate 3; o hook `guard_irreversible.py` os bloqueia.
- Hosts e limites: `cluos-harness/canonical/20-multi-host-topology.md` e
  `cluos-harness/registry/hosts.yaml`. KVM4 nunca possui DNS, Caddy, Authelia
  ou edge público; `suporte` é o único dono do edge.
- Nunca ler `.env*` reais, chaves privadas ou valores de segredo; `.env.example`
  só com placeholders.
