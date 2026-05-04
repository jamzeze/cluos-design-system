# CluOS Product Patterns

> Padrões reutilizáveis para todos os sistemas do ecossistema CluOS.
> Leia também: `APPLE-INSPIRED-PRODUCT-UX.md` e `patterns/`.

---

## 1. AppShell

Estrutura de layout global para todas as aplicações CluOS.

```
┌────────────────────────────────────────────┐
│ TopNav (fixo, altura 56–64px)              │
├──────────┬─────────────────────────────────┤
│ Sidebar  │ Área principal (scroll)         │
│ (opcion.)│                                 │
│          │  ┌───────────────────────────┐  │
│          │  │ PageHeader                │  │
│          │  ├───────────────────────────┤  │
│          │  │ Conteúdo principal        │  │
│          │  └───────────────────────────┘  │
├──────────┴─────────────────────────────────┤
│ Área de Toasts (canto inferior direito)    │
└────────────────────────────────────────────┘
```

**Tokens:**
- TopNav: `background: var(--cluos-bg)`, `border-bottom: 1px solid var(--cluos-border)`, `height: 56px`
- Sidebar: `background: var(--cluos-bg-subtle)`, `border-right: 1px solid var(--cluos-border)`, `width: 256px`
- Área principal: `background: var(--cluos-bg)`, `padding: var(--cluos-space-6) var(--cluos-space-8)`
- Max-width do conteúdo: `var(--cluos-container-product)` (72rem)

**Mobile:** Sidebar se torna drawer (off-canvas), acionado por ícone no TopNav.

---

## 2. PageHeader

Cabeçalho padrão de toda tela principal.

**Anatomia:**
```
[ Breadcrumb opcional ]
[ Título da tela — h1 ]
[ Descrição curta — uma linha ]
[ Status badge — se relevante ]
[ Ação primária ]  [ Ação secundária ]
```

**Regras:**
- Título: máximo 6 palavras.
- Descrição: máximo 1 frase — estado atual ou contexto da tela.
- Ação primária: sempre presente se há ação possível.
- Ação secundária: no máximo uma, discreta.
- Status badge: apenas se o estado da página/recurso importa (ex.: "Publicado", "Rascunho", "Offline").

**Tokens:**
- Título: `font-size: var(--cluos-text-3xl)`, `font-weight: 600`, `color: var(--cluos-navy)`
- Descrição: `font-size: var(--cluos-text-base)`, `color: var(--cluos-text-muted)`
- Espaço abaixo do header: `var(--cluos-space-8)`

---

## 3. Hub de sistemas

Visão geral dos sistemas do ecossistema CluOS.

**Padrão:**
- Grid de cards — 3 colunas em desktop, 2 em tablet, 1 em mobile.
- Cada card: nome do sistema, status (online/atenção/offline), botão "Abrir".
- Detalhes técnicos (último deploy, healthcheck, versão) recolhidos por padrão — disponíveis em "Ver detalhes".
- Filtro por status no topo (todos/online/atenção/offline) — discreto, não dominante.
- Status "atenção" usa `--cluos-status-warn`, status "offline" usa `--cluos-status-error`, "online" usa `--cluos-status-success`.

**SystemCard anatomy:**
```
[ Status indicator (dot) ]
[ Nome do sistema ]
[ URL / domínio — muted ]
[ "Ver detalhes" (ghost) ] [ "Abrir" (primary) ]
```

---

## 4. Dashboard

**Princípio:** O dashboard ajuda a decidir, não apenas a decorar.

**Ordem visual:**
1. Resumo do estado atual — "3 conteúdos aguardando publicação" (não apenas "3 conteúdos").
2. Pendências com ação — lista curta, cada item com próxima ação possível.
3. Métricas relevantes — apenas as que orientam decisão.
4. Atividade recente — recolhida por padrão ou no rodapé.

**Regras:**
- Máximo 4 métricas de destaque no topo.
- Cada métrica com: valor, label, tendência (se relevante), ação disponível (se houver).
- Não use gráficos apenas para preencher espaço.
- Pendências aparecem antes de métricas — o que precisa de ação é mais importante do que o que informa.

---

## 5. CRM

**Intenção:** Decidir próximo contato e executar.

**Padrão:**
- Visão principal: kanban simplificado (3–5 colunas = estágios de negociação).
- Lead card: nome, empresa, próximo passo, data prevista, ação primária.
- "Próximo passo" visível sem abrir o card.
- Histórico de interações: recolhido dentro do card, disponível ao clicar.
- Automações (sequências de email, lembretes): discretas, configuráveis em painel lateral.
- Filtros no topo: responsável, estágio, urgência. Sem excesso.

**Lead card anatomy:**
```
[ Nome ] [ Empresa ]
[ Próximo passo — "Ligar até 05/05" ]
[ Tag de estágio ]
[ "Registrar contato" (primary) ] [ "Ver histórico" (ghost) ]
```

---

## 6. AEO / Geração de conteúdo

**Intenção:** Revisar conteúdo gerado e publicar.

**Padrão:**
- Lista de conteúdos com status (rascunho / em revisão / publicado / agendado).
- Ao abrir um conteúdo: preview à direita, editor/metadados à esquerda.
- Pipeline de geração completamente escondido — o usuário vê "Gerando..." e depois o resultado.
- Ação primária por conteúdo: "Publicar" ou "Revisar".
- Histórico de versões recolhido no painel inferior.
- Logs de geração em "Detalhes técnicos", acessíveis por link discreto.

**Content item anatomy:**
```
[ Título do conteúdo ]
[ Status badge ] [ Canal/plataforma ]
[ Data prevista de publicação ]
[ "Revisar" (primary) ] [ "Agendar" (secondary) ]
```

---

## 7. Editor de vídeo

**Fluxo sequencial:**

```
Upload → Preview → Configuração → Gerar → Progresso → Resultado → Download
```

**Regras por etapa:**
- **Upload:** dropzone grande, tipos aceitos visíveis, limite visível.
- **Preview:** mostrar o vídeo original. Confirmar antes de processar.
- **Configuração:** mínima. Apenas: preset de identidade, duração máxima. Nada mais por padrão.
- **Gerar:** botão primário único. Ao clicar, transição para tela de progresso.
- **Progresso:** barra de progresso + mensagem do estágio atual ("Aplicando identidade visual...").
- **Resultado:** preview do vídeo final. Duas ações: "Baixar" (primary) e "Gerar nova versão" (secondary).
- **Download:** confirmar formato e iniciar.

Configurações avançadas (watermark, resolução, codec) ficam em "Configurações avançadas" — accordion recolhido.

---

## 8. Suporte / Status de sistemas

**Intenção:** Identificar problema e resolver.

**Padrão:**
- Lista de sistemas com status atual.
- Ao clicar: impacto, ação recomendada, tempo desde incidente.
- Ações por sistema: "Abrir sistema", "Criar ticket", "Ver logs".
- Logs e stack traces em "Detalhes técnicos" — nunca como primeira informação.
- Status global: banner no topo se houver degradação ampla.

**Status page anatomy:**
```
[ Status global — "Todos os sistemas operacionais" ou banner de incidente ]
[ Lista de sistemas ]
  [ Nome ] [ Status dot ] [ Último check ]
  [ Impacto — 1 frase ]
  [ "Abrir" (primary) ] [ "Ver logs" (ghost) ]
```

---

## 9. Configurações

**Agrupamento por intenção do usuário:**

| Grupo | O que contém |
|-------|-------------|
| Perfil | Nome, e-mail, senha, avatar, preferências pessoais |
| Identidade visual | Logo, cores, templates (quando aplicável) |
| Usuários e permissões | Adicionar/remover membros, grupos, roles |
| Integrações | APIs externas, webhooks, OAuth apps |
| Notificações | Canal, frequência, eventos |
| Segurança | 2FA, sessions ativas, audit log |
| Avançado | Configurações técnicas, flags de feature, exports |

**Regras:**
- Cada grupo é uma seção ou página separada — não tudo em uma única tela.
- Configurações avançadas ficam no grupo "Avançado" — recolhido por padrão na listagem.
- Salvar automático para toggles e selects simples.
- Botão "Salvar" explícito para formulários críticos (ex.: configurações de segurança).
- Confirmação modal para ações irreversíveis (ex.: revogar acesso, excluir integração).

---

## 10. Login

**Padrão:**
- Logo CluOS centralizada.
- Frase curta abaixo do logo (opcional): "Acesse o painel CluOS".
- Formulário: e-mail + senha + "Entrar" (primary).
- Authelia SSO quando aplicável — o redirecionamento é transparente.
- Erro: inline abaixo do formulário, não modal. "E-mail ou senha incorretos."
- Link "Esqueci minha senha" — discreto, ghost, abaixo do botão.
- Sem marketing, sem banners, sem excesso de links.
- Fundo: `--cluos-bg-subtle` ou gradiente de marca discreto.

---

## 11. Upload de arquivos

**Padrão:**

```
┌─────────────────────────────────────┐
│  Arraste arquivos aqui ou           │
│  [ Selecionar arquivo ] (secondary) │
│  Aceitos: PDF, JPG, PNG — Máx. 10MB │
└─────────────────────────────────────┘
↓ após seleção:
[ Nome do arquivo ] [ Tamanho ] [ Remover (ghost) ]
[ Barra de progresso durante upload ]
↓ após upload:
[ Preview (imagem/documento) ]
[ "Confirmar envio" (primary) ] [ "Trocar arquivo" (ghost) ]
```

**Regras:**
- Validação de tipo e tamanho antes do upload (client-side).
- Mensagem de erro inline se arquivo inválido — não após o upload.
- Progress com percentual, não apenas spinner.
- Preview sempre que possível (imagem, PDF, vídeo).

---

## 12. Empty states

**Padrão por contexto:**

| Contexto | Título | Ação |
|---------|--------|------|
| Sem conteúdos gerados | "Nenhum conteúdo ainda" | "Gerar primeiro conteúdo" |
| Sem leads no CRM | "Sua lista está vazia" | "Adicionar lead" |
| Busca sem resultado | "Nenhum resultado para '...'" | "Limpar filtros" |
| Sem sistemas no Hub | "Nenhum sistema configurado" | "Adicionar sistema" |
| Sem notificações | "Tudo em dia" | (nenhuma ação necessária) |

**Regras:**
- Título curto e direto.
- Máximo 2 frases de explicação.
- Uma ação primária clara.
- Exemplo opcional (captura de tela pequena, ícone ilustrativo — sem excesso).
- Visual discreto — não use ilustração chamativa em empty state de tela operacional.

---

## 13. Error states

**Para cada erro, definir:**

1. O que aconteceu (título curto).
2. Causa provável (frase direta, sem jargão).
3. Como resolver (ação sugerida).
4. "Tentar novamente" como botão primário, quando aplicável.
5. "Detalhes técnicos" recolhidos — stack trace, código de erro, request ID.

**Exemplos:**

| Situação | Título | Mensagem | Ação |
|---------|--------|---------|------|
| API offline | "Não foi possível conectar" | "Verifique sua conexão ou aguarde alguns minutos." | "Tentar novamente" |
| Arquivo inválido | "Formato não suportado" | "O arquivo enviado não é um formato aceito. Use PDF, JPG ou PNG." | "Selecionar outro arquivo" |
| Permissão negada | "Acesso não autorizado" | "Você não tem permissão para acessar esta seção." | "Voltar ao início" |
| Dados inválidos | "Verifique os campos" | Erro inline por campo, não erro genérico. | Foco no campo com problema |

---

## 14. Tabelas

**Usar tabela quando:**
- Comparação entre múltiplos itens importa.
- Há ordenação ou filtro por coluna.
- Há ação por linha (editar, excluir, ver detalhes).
- Volume de dados exige listagem densa.

**Evitar tabela para:**
- Fluxos de decisão com poucos itens — use cards.
- Configurações — use seções com formulários.
- Revisão de um único item — use página de detalhe.

**Padrão de tabela:**
- Máximo 5–6 colunas visíveis. Demais recolhidas em "mais".
- Ações por linha no hover, no final da linha.
- Bulk actions na barra superior, visível apenas quando há seleção.
- Paginação ou scroll infinito — explícito, não ambíguo.
- Estado de loading: skeleton de linhas.
- Estado vazio: empty state com ação.

---

## 15. Formulários

**Regras:**
- Dividir formulários longos por intenção (accordion, stepper, seções separadas).
- Máximo 5–6 campos por bloco visual.
- Labels permanentes — nunca apenas placeholder.
- Ajuda contextual: ícone `?` com tooltip ou texto de helper abaixo do campo.
- Validação inline — mostrar erro ao sair do campo (blur), não apenas no submit.
- Salvar automático quando fizer sentido (drafts, configurações de toggle).
- Botão "Salvar" explícito apenas quando o contexto é crítico ou irreversível.
- Nunca perder dados do usuário por timeout ou navegação acidental.
- "Cancelar" sempre disponível em formulários em modal ou página separada.

**Exemplo de agrupamento de formulário de configuração:**

```
[ Bloco: Dados pessoais ]
  Nome completo
  E-mail (não editável se vinculado ao Authelia)
  Cargo

[ Bloco: Preferências ]
  Idioma
  Fuso horário
  Formato de data

[ Salvar alterações ] (primary)
```
