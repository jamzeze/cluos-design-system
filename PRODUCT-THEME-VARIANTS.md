# PRODUCT-THEME-VARIANTS.md — CluOS

CluOS é um ecossistema coeso com uma identidade visual única. Para dar personalidade operacional distinta a cada produto sem criar marcas separadas, o sistema utiliza **variações de cor de ação** sobre uma base comum.

> A cor de ação muda a temperatura do produto. Ela não vira a marca inteira.

---

## Identidade comum preservada em todos os produtos

| Elemento | Valor |
| --- | --- |
| Fundo dark mode | Navy `#1B2F36` |
| Fundo light mode | Off-white `#FAFAF8` |
| Tipografia UI | Inter / Inter Tight |
| Tipografia técnica | JetBrains Mono |
| Autoridade visual | Navy como âncora |
| Estrutura de card | Bordas finas, sombras leves, radius consistente |
| Grid | Sutil, operacional |
| Símbolo | CluOS |
| Estética | Moderna, técnica, confiável, premium |

---

## As 8 variações oficiais

| Variant name | Appearance | Action color | Primary use |
| --- | --- | --- | --- |
| `claro-teal` | Light | Teal `#008080` | Plataforma padrão, Hub, ações neutras |
| `claro-copper` | Light | Copper `#BD7845` | CRM, operação comercial, prioridade |
| `claro-champagne` | Light | Champagne `#C8C1AE` | Editorial, premium, institucional |
| `claro-oxblood` | Light | Oxblood `#8A3A3A` | Risco, auditoria, estados de alta atenção |
| `dark-teal` | Dark/navy | Teal `#008080` | Dashboards técnicos, saúde do sistema |
| `dark-copper` | Dark/navy | Copper `#BD7845` | MedFrame, suporte, command center, decisões operacionais |
| `dark-champagne` | Dark/navy | Champagne `#C8C1AE` | Produtos criativos/editoriais premium |
| `dark-oxblood` | Dark/navy | Oxblood `#8A3A3A` | Risco, auditoria, dashboards críticos |

---

## Mapa recomendado por produto

| Produto | Variant | Razão |
| --- | --- | --- |
| CluOS Hub | `claro-teal` | Entrada institucional do ecossistema — seguro, calmo, reconhecível |
| CRM CluOS | `claro-copper` | Comercial, humano, operacional — copper dá prioridade sem parecer erro |
| Suporte / Edge | `dark-copper` | Central operacional — navy dá autoridade, copper destaca prioridade |
| AEO Engine | `claro-champagne` | Editorial, premium, autoridade de publicação |
| MedFrame | `dark-copper` | Estúdio técnico — dark surface + copper marca decisões e exportações |
| DID | `dark-champagne` | Produto criativo/mídia — dark + champagne dá sensação premium |
| Sci-OS | `claro-teal` | Científico, limpo, confiável, documental |
| B3 | `dark-oxblood` | Mercado, risco, auditoria — oxblood marca atenção, não ação positiva |
| Loteca | `claro-oxblood` | Probabilidade, risco, previsão e análise |
| Docs | `claro-teal` | Documentação neutra, legível, organizada |

---

## Explicação por produto

### CluOS Hub — `claro-teal`

Entrada institucional do ecossistema. O teal como cor de ação transmite segurança, neutralidade e familiaridade. É a temperatura padrão da plataforma — o que o usuário vê primeiro.

### CRM CluOS — `claro-copper`

Comercial, humano, operacional. O copper comunica prioridade e urgência sem parecer alerta de erro. Adequado para pipelines, negociações, tarefas pendentes e ações que precisam de atenção humana.

### Suporte / Edge / Command Center — `dark-copper`

Central operacional de decisões. O fundo navy confere autoridade e densidade técnica. O copper destaca prioridades, filas, status críticos e decisões que exigem resposta imediata.

### AEO Engine — `claro-champagne`

Motor editorial e de autoridade. O champagne comunica sofisticação, governança e qualidade de publicação. Adequado para conteúdo, autoridade e onboarding premium.

### MedFrame — `dark-copper`

Estúdio técnico de vídeo. As superfícies escuras combinam com edição e renderização. O copper destaca exportações, decisões de pipeline e estados de conclusão.

### DID — `dark-champagne`

Produto de identidade e mídia. A combinação dark + champagne cria uma sensação premium e criativa, adequada para uma plataforma de identidade digital sofisticada.

### Sci-OS — `claro-teal`

Plataforma científica e documental. O teal reforça confiança, precisão e limpeza. Em dashboards técnicos internos, pode usar `dark-teal`.

### B3 — `dark-oxblood`

Análise de mercado, risco e auditoria. O oxblood marca atenção e consequência. Não deve ser usado como CTA positivo genérico — é a temperatura de alta atenção.

### Loteca — `claro-oxblood`

Probabilidade, risco e análise esportiva. O oxblood em fundo claro dá personalidade de análise séria. Dashboards técnicos podem usar `dark-oxblood`.

### Docs / Knowledge Base — `claro-teal`

Documentação neutra, legível e organizada. O teal como ação padrão mantém coerência com o Hub e reforça a identidade da plataforma.

---

## Regras semânticas das cores de ação

### Teal

- Ação padrão da plataforma
- Saúde do sistema e status online
- Confirmações e sucesso neutro
- Produto técnico confiável e acessível

### Copper

- Prioridade operacional
- Decisão humana necessária
- Urgência moderada
- Comercial e relacional

### Champagne

- Premium e editorial
- Institucional e sofisticado
- Onboarding e publicação
- Relatórios e autoridade
- **Botão champagne sempre usa texto navy** — não branco

### Oxblood

- Risco e alta atenção
- Auditoria e compliance
- Falhas e estados críticos
- **Não usar como CTA positivo genérico**
- Não confundir com erro de sistema (que usa status-error)

---

## Como implementar em CSS

Adicione o atributo `data-theme` e `data-appearance` no elemento raiz (`<html>` ou `<body>`):

```html
<html data-theme="teal" data-appearance="light">
```

Os tokens `--cluos-action`, `--cluos-action-deep`, `--cluos-action-soft` e `--cluos-action-text` serão resolvidos automaticamente pelo `tokens.css`.

### Variações disponíveis

```
data-theme="teal"       + data-appearance="light"  →  claro-teal
data-theme="copper"     + data-appearance="light"  →  claro-copper
data-theme="champagne"  + data-appearance="light"  →  claro-champagne
data-theme="oxblood"    + data-appearance="light"  →  claro-oxblood
data-theme="teal"       + data-appearance="dark"   →  dark-teal
data-theme="copper"     + data-appearance="dark"   →  dark-copper
data-theme="champagne"  + data-appearance="dark"   →  dark-champagne
data-theme="oxblood"    + data-appearance="dark"   →  dark-oxblood
```

### Uso dos tokens de ação

```css
.btn-primary {
  background: var(--cluos-action);
  color: var(--cluos-action-text);
}
.btn-primary:hover {
  background: var(--cluos-action-deep);
}
.active-state {
  background: var(--cluos-action-soft);
  color: var(--cluos-action);
}
```

---

## O que a cor de ação muda

- Botão primário / CTA principal
- Estado ativo na navegação
- Anel de foco
- Pílulas de status relevantes
- Halo sutil em cards de destaque
- Microinterações de confirmação
- Destaques operacionais

## O que a cor de ação não muda

- Tipografia e família de fontes
- Estrutura de grid e layout
- Símbolo e marca CluOS
- Radius e proporções de card
- Densidade visual
- Sombras e elevação
- Linguagem de escrita
- Bordas padrão
- Todos os textos secundários

---

## Referências

- `DESIGN-preview.html` — prévia interativa com seletor de tema e toggle claro/escuro
- `tokens/tokens.css` — tokens de action theme e dark mode
- `tokens/tokens.ts` / `tokens/tokens.js` — tokens para CSS-in-JS
- `DESIGN.md` — especificação narrativa completa
