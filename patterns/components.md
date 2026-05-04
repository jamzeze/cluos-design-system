# CluOS Component Patterns

> Especificação de componentes para todos os sistemas CluOS.
> Use os tokens de `tokens/tokens.css`. Não use cores hardcoded.

---

## AppShell

**Objetivo:** Estrutura de layout global que envolve toda a aplicação.

**Quando usar:** Em todas as aplicações CluOS com mais de uma tela.

**Quando não usar:** Em páginas de login, landing pages, ou páginas standalone.

**Anatomia:**
- `TopNav` — barra de navegação global fixa no topo.
- `Sidebar` — navegação lateral, opcional, recolhível.
- `MainArea` — área de conteúdo principal com scroll.
- `ToastContainer` — container de notificações transitórias (canto inferior direito).

**Hierarquia de ações:** Nenhuma ação direta — é estrutura, não conteúdo.

**Tokens obrigatórios:**
- TopNav height: 56px.
- Sidebar width: 256px.
- Background área principal: `var(--cluos-bg)`.
- Background sidebar: `var(--cluos-bg-subtle)`.
- Border sidebar: `1px solid var(--cluos-border)`.

**Estados:** N/A (estrutural).

**Acessibilidade:**
- `<header>` para o TopNav com `role="banner"`.
- `<nav>` para Sidebar com `aria-label="Navegação principal"`.
- `<main>` para a área principal.
- `<aside>` para painel contextual quando presente.

---

## TopNav

**Objetivo:** Navegação global, identidade da aplicação, acesso ao perfil.

**Quando usar:** Em todas as telas com AppShell.

**Quando não usar:** Em páginas de login e modais fullscreen.

**Anatomia:**
- Logo CluOS (esquerda).
- Nome da aplicação (opcional, ao lado do logo).
- Itens de navegação global (centro — apenas itens de alto nível).
- Notificações (ícone com badge de contagem).
- Menu do usuário (avatar + nome, direita).

**Tokens:** `background: var(--cluos-bg)`, `border-bottom: 1px solid var(--cluos-border)`.

**Estados:**
- Item ativo: `color: var(--cluos-teal-deep)`.
- Item hover: `color: var(--cluos-navy)`, `background: var(--cluos-bg-subtle)`.

**Acessibilidade:**
- `aria-current="page"` no item de navegação ativo.
- Badge de notificação com `aria-label="X notificações"`.

---

## Sidebar

**Objetivo:** Navegação dentro de uma seção da aplicação.

**Quando usar:** Quando a aplicação tem 4+ seções com sub-páginas.

**Quando não usar:** Quando a navegação cabe no TopNav ou quando a tela é simples.

**Anatomia:**
- Grupos de itens com label de seção.
- Items de navegação com ícone + label.
- Item ativo com tint de teal.
- Botão de recolher (desktop).

**Tokens:**
- Width: 256px aberta, 56px recolhida.
- Background: `var(--cluos-bg-subtle)`.
- Item ativo: `background: rgba(0, 128, 128, 0.08)`, `color: var(--cluos-teal-deep)`.
- Section label: `font-size: var(--cluos-text-xs)`, uppercase, `color: var(--cluos-text-subtle)`.

**Estados:** Aberta / Recolhida (só ícones) / Mobile (drawer off-canvas).

**Acessibilidade:**
- `<nav aria-label="Navegação lateral">`.
- `aria-expanded` no botão de recolher.
- `aria-current="page"` no item ativo.

---

## PageHeader

**Objetivo:** Cabeçalho padrão de toda tela principal.

**Quando usar:** No topo de qualquer página principal.

**Quando não usar:** Em modais, drawers, e sub-componentes internos.

**Anatomia:**
- Breadcrumb (opcional — apenas quando há profundidade real).
- Título (h1).
- Descrição curta (opcional — máximo 1 linha).
- Status badge (opcional).
- ActionBar (alinhada à direita do título ou abaixo em mobile).

**Exemplo de texto:**
- Título: "Conteúdos gerados"
- Descrição: "12 conteúdos aguardando revisão"

**Tokens:**
- Título: `font-size: var(--cluos-text-3xl)`, `font-weight: 600`.
- Descrição: `font-size: var(--cluos-text-base)`, `color: var(--cluos-text-muted)`.

---

## ActionBar

**Objetivo:** Grupo de ações relacionadas a uma página ou seleção.

**Quando usar:** No PageHeader ou em contexto de seleção de itens em lista/tabela.

**Quando não usar:** No meio de formulários ou dentro de cards.

**Anatomia:** `[ PrimaryAction ]  [ SecondaryAction ]  [ DestructiveAction ]`

**Hierarquia:** Primária → Secundária → Destrutiva (separada por espaço).

**Regras:**
- Máximo 1 PrimaryAction.
- Máximo 2 ações no estado normal.
- Ações bulk aparecem apenas quando itens estão selecionados.

---

## PrimaryAction

**Objetivo:** Ação principal da tela ou contexto.

**Quando usar:** Uma vez por tela ou região visual.

**Quando não usar:** Para ações secundárias, raras, destrutivas, ou de navegação.

**Anatomia:** `[ Ícone? ] Verbo + objeto`

**Exemplo de texto:** "Publicar conteúdo", "Gerar vídeo", "Adicionar lead", "Salvar alterações".

**Tokens:** `background: var(--cluos-teal)`, `color: var(--cluos-text-on-teal)`.

**Estados:** default / hover (`--cluos-teal-deep`) / focus / loading / disabled.

**Acessibilidade:**
- Em loading state: `aria-busy="true"` + texto "Carregando..." visível ou via `aria-label`.
- Em disabled: `aria-disabled="true"` + tooltip explicando por quê.

---

## SecondaryAction

**Objetivo:** Ação alternativa ou complementar à primária.

**Quando usar:** Quando há uma alternativa legítima à ação primária.

**Quando não usar:** Para substituir o botão primário, ou para ações destrutivas.

**Tokens:** `background: transparent`, `border: 1px solid var(--cluos-border-strong)`, `color: var(--cluos-navy)`.

---

## StatusCard

**Objetivo:** Exibir status de um sistema, processo ou item com contexto.

**Quando usar:** No Hub de sistemas, no dashboard de status, em listas de processos.

**Anatomia:**
```
[ Status dot (success/warn/error) ] [ Nome ]
[ Descrição — 1 linha ]
[ Ação primária ]  [ Ação ghost ]
```

**Tokens status dot:**
- Online: `background: var(--cluos-status-success)`.
- Atenção: `background: var(--cluos-status-warn)`.
- Offline: `background: var(--cluos-status-error)`.

---

## SystemCard

**Objetivo:** Card de sistema no Hub CluOS.

**Quando usar:** Na tela Hub para representar cada sistema CluOS disponível.

**Anatomia:**
- Status indicator (ponto colorido + label texto).
- Nome do sistema.
- URL / domínio (muted).
- Detalhes recolhidos (último deploy, uptime — em accordion).
- `[ "Abrir" (primary) ]  [ "Ver detalhes" (ghost) ]`.

**Tokens:** Card base do DESIGN.md — `background: var(--cluos-bg)`, `border: 1px solid var(--cluos-border)`, `border-radius: var(--cluos-radius-lg)`.

---

## MetricCard

**Objetivo:** Exibir métrica importante com contexto de decisão.

**Quando usar:** Em dashboards, máximo 4 por tela.

**Quando não usar:** Para dados sem ação ou decisão associada.

**Anatomia:**
- Label (o que é a métrica).
- Valor principal (número/status).
- Tendência opcional (↑ +12% em relação a semana passada).
- Ação disponível (link ghost — "Ver detalhe").

**Tokens:**
- Label: `font-size: var(--cluos-text-sm)`, `color: var(--cluos-text-muted)`.
- Valor: `font-size: var(--cluos-text-3xl)`, `font-weight: 600`, `color: var(--cluos-navy)`.

---

## EmptyState

**Objetivo:** Orientar o usuário quando não há dados para exibir.

**Quando usar:** Sempre que uma lista, tabela, ou área de conteúdo está vazia.

**Quando não usar:** Para erros — use ErrorState.

**Anatomia:**
- Ícone discreto ou símbolo CluOS (opcional).
- Título curto.
- Descrição (máximo 2 frases).
- Ação primária.
- Exemplo ou screenshot pequeno (opcional).

**Exemplo de texto:**
- Título: "Nenhum conteúdo ainda"
- Descrição: "Gere seu primeiro conteúdo para começar a publicar."
- Ação: "Gerar conteúdo"

**Tokens:**
- Texto: centralizado, `max-width: 320px`.
- Ícone: `color: var(--cluos-text-subtle)`, tamanho 48px.

---

## ErrorState

**Objetivo:** Comunicar falha e orientar recuperação.

**Quando usar:** Quando uma operação falhou ou um recurso não pôde ser carregado.

**Quando não usar:** Para dados vazios — use EmptyState.

**Anatomia:**
- Título: o que aconteceu (curto).
- Descrição: causa provável + como resolver.
- Ação primária: "Tentar novamente" ou ação de recuperação.
- Detalhes técnicos: accordion recolhido (código de erro, request ID, stack trace).

**Exemplo:**
- Título: "Não foi possível carregar os conteúdos"
- Descrição: "Verifique sua conexão e tente novamente."
- Ação: "Tentar novamente"

**Tokens:**
- Borda do callout: `1px solid var(--cluos-status-error-bg)`.
- Background: `var(--cluos-status-error-bg)`.

---

## LoadingState

**Objetivo:** Indicar que conteúdo está sendo carregado.

**Quando usar:** Sempre que há latência de rede ou processamento.

**Quando não usar:** Para processamentos muito rápidos (<200ms) — não mostrar loading para evitar flash.

**Tipos:**
- **Skeleton:** para carregamento de estrutura conhecida (lista, tabela, cards). Prefira skeleton a spinner.
- **Spinner + contexto:** para operações longas sem estrutura previsível.
- **Progress bar:** para uploads, exports, geração de conteúdo com duração estimável.

**Regras:**
- Skeleton usa `background: var(--cluos-bg-muted)` com animação suave de shimmer.
- Spinner nunca sozinho — sempre com mensagem de contexto.
- Progress bar com percentual quando possível.
- Respeitar `prefers-reduced-motion`.

---

## UploadDropzone

**Objetivo:** Área de drag-and-drop para upload de arquivos.

**Anatomia:**
- Área delimitada com borda dashed.
- Ícone de upload.
- Texto: "Arraste arquivos aqui ou" + botão "Selecionar arquivo" (secondary).
- Tipos aceitos e limite de tamanho visíveis abaixo.

**Estados:** idle / drag-over (tint teal) / uploading (progress) / success / error.

**Tokens:**
- Border: `2px dashed var(--cluos-border)`.
- Drag-over: `border-color: var(--cluos-teal)`, `background: rgba(0, 128, 128, 0.04)`.
- Border-radius: `var(--cluos-radius-lg)`.

---

## PreviewPanel

**Objetivo:** Mostrar preview de conteúdo antes da ação final.

**Quando usar:** Antes de publicar, enviar, ou confirmar uma ação irreversível.

**Anatomia:** Painel lateral ou área abaixo do editor com renderização do resultado final.

**Regras:** Preview deve ser fiel ao resultado real. "O que você vê é o que será publicado."

---

## SettingsSection

**Objetivo:** Bloco de configurações por grupo de intenção.

**Anatomia:**
- Título da seção.
- Descrição curta do que está aqui.
- Campos/controles do grupo.
- Botão "Salvar" (se necessário para o grupo).

---

## PermissionGate

**Objetivo:** Controlar renderização com base em permissões do usuário.

**Quando usar:** Para esconder ações que o usuário não tem permissão de executar.

**Regras:**
- Nunca apenas esconder — se o recurso existe mas está bloqueado, mostrar com estado disabled + explicação.
- "Você não tem permissão para esta ação. Contate um administrador."
- Não renderizar botões destrutivos para usuários sem permissão.

---

## ConfirmDialog

**Objetivo:** Confirmar ação irreversível antes de executar.

**Quando usar:** Para exclusões, revogações, resets, publicações críticas.

**Quando não usar:** Para ações reversíveis ou de baixo impacto.

**Anatomia:**
- Título: o que está prestes a acontecer.
- Descrição: impacto da ação (o que será perdido ou afetado).
- Ação confirmação (destrutiva visual, mas contida): "Excluir conta".
- Cancelar (secondary ou ghost).

**Regras:**
- Ação de confirmação é destrutiva — não é teal, é `--cluos-status-error` (muted oxblood) com texto claro.
- Cancelar é o foco padrão — o usuário deve escolher confirmar ativamente.
- Não usar checkbox "Tenho certeza" — é fricção desnecessária.

---

## Toast

**Objetivo:** Notificação transitória de resultado de ação.

**Quando usar:** Para sucesso, erro leve, ou informação após uma ação do usuário.

**Quando não usar:** Para erros que exigem ação — use ErrorState inline. Para avisos persistentes — use callout ou banner.

**Tipos:** success / error / warning / info.

**Regras:**
- Auto-dismiss em 4s para success/info. Para error, não auto-dismiss.
- Máximo 3 toasts visíveis ao mesmo tempo.
- Posição: canto inferior direito (desktop), topo centralizado (mobile).
- Mensagem: curta, do que aconteceu. "Conteúdo publicado.", "Não foi possível salvar."

---

## InlineFeedback

**Objetivo:** Feedback contextual próximo ao campo ou ação que gerou o resultado.

**Quando usar:** Erros e validações de formulário, avisos contextuais.

**Tipos:** error / warning / success / info.

**Tokens:** Use tokens de status (`--cluos-status-*`).

---

## ProgressStepper

**Objetivo:** Indicar progresso em fluxo multi-etapa.

**Quando usar:** Para fluxos com 3–5 etapas ordenadas (upload, configuração, geração, resultado).

**Quando não usar:** Para processos com 2 etapas — use loading state simples.

**Anatomia:** `[Etapa 1 ✓] — [Etapa 2 ativo] — [Etapa 3] — [Etapa 4]`

**Regras:**
- Etapas concluídas: checkmark teal.
- Etapa atual: teal, label visível.
- Etapas futuras: cor muted.
- Não permitir navegação para etapas futuras não concluídas.

---

## DetailsDisclosure

**Objetivo:** Revelar informações adicionais sob demanda (progressive disclosure).

**Quando usar:** Para configurações avançadas, histórico, detalhes técnicos.

**Anatomia:** Accordion com label descritivo + conteúdo recolhível.

**Exemplo de texto:** "Configurações avançadas", "Histórico de versões", "Detalhes técnicos".

**Tokens:**
- Label: `font-size: var(--cluos-text-sm)`, `font-weight: 500`, `color: var(--cluos-text-muted)`.
- Ícone: chevron que rotaciona 180° na abertura.
- Transition: `var(--cluos-dur-base)` ease.

---

## TechnicalDetails

**Objetivo:** Expor informações técnicas de forma organizada, recolhida por padrão.

**Quando usar:** Para logs, stack traces, request IDs, códigos de erro, UUIDs.

**Quando não usar:** Como informação principal — sempre recolhido.

**Anatomia:**
- Label "Detalhes técnicos" com ícone de código.
- Accordion recolhido por padrão.
- Dentro: código monospaced com tokens `--cluos-font-mono` e `--cluos-bg-muted`.
- Botão "Copiar" para cada bloco de código.

**Acessibilidade:**
- `aria-expanded` no controle do accordion.
- Conteúdo dentro de `<details>/<summary>` ou equivalente ARIA.
