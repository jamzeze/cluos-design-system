# Legado — arquivo morto do cluos-mms-v1 e das explorações anteriores

**Este material foi superado pelo `cluos-v2` em 2026-10-24 e não é referência
ativa.** Ele não é publicado no pacote npm (saiu de `files` e `exports` na
1.0.0), não deve ser usado como fonte de valores, e nenhum produto novo pode
herdar dele. O contrato vigente é `tokens/cluos-v2.yaml` e o `DESIGN.md` da raiz.

Tudo foi movido com `git mv`, então o histórico de cada arquivo está preservado
(`git log --follow`). Nada foi apagado.

## O que há aqui

| Item | O que é |
|---|---|
| `DESIGN-preview-legacy-v0.2.1.html` | Especime da versão 0.2.1, anterior ao cluos-mms-v1: Inter, teal como cor de ação, oito variantes. Carrega fontes de CDN. O link para `./DESIGN.md` não resolve mais a partir desta pasta. |
| `DESIGN-preview-experimental-thermal-nocturne.html` | Especime da exploração Thermal Nocturne (2026-07-28), 110 KB. Referencia `assets/fonts/*.woff2` e `assets/cluos-logo-*.svg`, caminhos que não existem na raiz do repositório; para renderizar com fidelidade use os arquivos de `brand-assets/` e `brand-assets/fonts/`. Os caminhos relativos não foram reescritos para preservar o arquivo como estava. |
| `EXPERIMENTAL-THERMAL-NOCTURNE.md` | Documento da exploração Thermal Nocturne, já marcado como superado antes do v2. |
| `PRODUCT-THEME-VARIANTS.md` | Catálogo das oito variantes de produto (claro/escuro × teal, copper, champagne, oxblood). Substituído por um único núcleo e pelos matizes de identidade de produto (`--cluos-product-<id>`). |
| `MIGRATION-AUDIT.md` | Auditoria da unificação do antigo repositório `cluos-design`, aposentado. |
| `tokens-experimental/` | Tokens da exploração Thermal Nocturne. O `url()` das fontes em `thermal-nocturne-fonts.css` foi ajustado para `../../../brand-assets/fonts/`, única edição de conteúdo feita no legado. |
| `design-gallery/` | Galeria de direções visuais usada para comparação. |
| `guides/thermal-nocturne-2026-07-28/` | Pacote de entrega da exploração Thermal Nocturne (README, RELEASE, PRODUCT, version.json, capturas). |
| `cluos-design-system-v2/` | Dossiê da rodada de 2026-08-10 (arquétipos A a G, baseline, auditoria, paletas, fundamentos, registro de decisões). Já superado pelo cluos-mms-v1 e agora pelo cluos-v2; o registro vigente está em `docs/frontend-routing/2026-10-23-cluos-v2/`. Apesar do nome da pasta, não é o "v2" atual. |

## Se você precisar de um nome antigo

Os nomes de token do cluos-mms-v1 continuam como aliases de compatibilidade em
`tokens/tokens.css` até a 2.0.0. O mapa de nomes antigos para novos está em
[`../cluos-v2/migracao.md`](../cluos-v2/migracao.md). O contrato do mms-v1 em si
permanece em `tokens/mms-canonical.yaml`, como registro histórico.
