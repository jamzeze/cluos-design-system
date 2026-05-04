# Apple-inspired Product UX for CluOS

> **Frase central:** "A interface CluOS deve parecer simples porque o sistema absorve a complexidade pelo usuário."

Este documento define os princípios de UX de produto para todos os sistemas CluOS. Ele não copia esteticamente nenhuma marca. Aplica princípios universais de excelência em produto: simplicidade, clareza, foco, hierarquia visual e redução de carga cognitiva.

---

## 1. Filosofia

CluOS deve ser:

- **Simples** — o usuário vê apenas o que precisa para agir.
- **Intuitivo** — o fluxo segue a intenção, não a arquitetura técnica.
- **Minimalista** — cada elemento ganha o seu lugar ou não aparece.
- **Calmo** — nada compete pela atenção de forma agressiva.
- **Premium** — acabamento cuidadoso, consistência visual, zero estados quebrados.
- **Preciso** — palavras certas, estado correto, ação no lugar certo.
- **Orientado à ação** — toda tela tem uma próxima ação clara.
- **Com poucos botões** — muitos botões significam ausência de decisão de produto.
- **Com pouca fricção** — não peça confirmação onde ela não é necessária.
- **Com complexidade oculta** — logs, parâmetros, pipelines e IDs ficam recolhidos até o usuário pedir.

---

## 2. Simplicidade não é falta de poder

A complexidade técnica pode existir. Ela não deve ser despejada na tela.

- Logs, parâmetros, pipelines, IDs e estados técnicos ficam **escondidos por padrão**.
- O usuário comum vê **decisão e próxima ação**.
- O usuário avançado pode abrir "Detalhes técnicos" sob demanda.
- O poder do sistema está nos bastidores; o usuário sente o resultado, não o processo.

**Errado:** exibir pipeline de processamento com 7 etapas como navegação principal.  
**Certo:** exibir "Gerando vídeo..." com progresso e ação disponível quando pronto.

---

## 3. Uma tela, uma intenção principal

Toda tela deve ter uma **intenção dominante**.

| Tela | Intenção principal |
|------|-------------------|
| Login | Entrar |
| Hub | Abrir ou verificar sistemas |
| CRM | Decidir próximo contato |
| AEO | Revisar e publicar conteúdo |
| Editor de vídeo | Subir vídeo e baixar versão final |
| Suporte | Identificar problema e resolver |
| Configurações | Ajustar preferências com segurança |
| Upload | Enviar arquivo e confirmar processamento |
| Dashboard | Decidir próxima ação com base no estado atual |

Se uma tela não tem intenção clara, ela precisa ser redesenhada ou dividida.

---

## 4. Uma ação primária por região

Não usar múltiplos botões primários competindo na mesma região visual.

Cada tela deve ter:
- **Uma ação primária** — clara, visível, teal.
- **Ações secundárias** — discretas, borda leve, fora do caminho.
- **Ações destrutivas** — separadas, com confirmação, visual contido.
- **Detalhes técnicos** — recolhidos em accordion ou drawer.

Se houver dois botões primários competindo, um deles não é primário — é secundário mal classificado.

---

## 5. Progressive disclosure

Mostrar o essencial primeiro. Revelar opções avançadas sob demanda.

**Como revelar:**
- Accordion — configurações avançadas em formulários.
- Drawer / painel lateral — detalhes contextuais.
- Popover / tooltip — ajuda pontual.
- Modal — confirmações e fluxos curtos.
- Página separada — configurações complexas ou raras.

**Regras:**
- Nunca expor pipeline técnico como aba principal para usuário comum.
- Logs só aparecem em "Detalhes técnicos", acessível por link/botão discreto.
- Parâmetros avançados ficam em seção "Avançado", recolhida por padrão.
- IDs, UUIDs, hashes nunca aparecem no fluxo principal.

---

## 6. Clareza em 3 segundos

Toda tela deve responder em 3 segundos:

1. **Onde estou?** — título claro, contexto no breadcrumb ou topbar.
2. **Qual é o estado atual?** — status visível, badge de estado, indicador de progresso.
3. **Qual é a próxima ação?** — botão primário próximo ao contexto relevante.
4. **O que está pendente?** — pendências agrupadas, não espalhadas.
5. **O que pode dar errado?** — warnings contextuais, não genéricos.
6. **Como corrijo?** — erro sempre orienta ação; nunca "Ocorreu um erro".

Se alguma dessas perguntas não tem resposta imediata na tela, a tela está incompleta.

---

## 7. Hierarquia visual

**Regras:**
- Título curto (3–7 palavras).
- Subtítulo útil — explica estado ou contexto, não decora.
- Status visível — badge, cor de border, ícone de status.
- Ação primária próxima ao contexto — não flutuando no rodapé.
- Cards só quando ajudam a decidir — não use card para tudo.
- Grupos visuais por **intenção**, não por categoria técnica.
- Não use ícones decorativos em excesso — ícone funcional ou nenhum.
- Não use cores como enfeite — cor carrega significado semântico.

**Hierarquia de tamanho visual:**
1. Título da tela (h1) — intenção principal.
2. Status / resumo (badge/callout) — estado atual.
3. Ação primária (btn-primary) — próximo passo.
4. Conteúdo / lista / cards — contexto de decisão.
5. Ações secundárias — alternativas.
6. Metadados / detalhes — informação de suporte.

---

## 8. Navegação

**Regras:**
- Reduzir abas — prefira fluxo linear a 7 abas.
- Prefira fluxos — o usuário avança, não navega.
- Evite menus profundos (mais de 2 níveis).
- Navegação global deve ser estável — não muda por contexto de página.
- Navegação local (abas dentro de uma seção) apenas quando necessária e quando o usuário precisa alternar.
- Breadcrumbs apenas para profundidade real — não para decoração.
- Ações próximas ao conteúdo — não coloque ação no topo e conteúdo no final.

**Máximo de itens por nível de navegação:**
- Sidebar global: 5–7 itens.
- Abas locais: 3–5 abas.
- Submenu: evitar; se necessário, máximo 4 itens.

---

## 9. Botões

### Botão primário
- Ação principal da tela.
- Cor `--cluos-teal`.
- Um por região visual.
- Texto verbal e direto: "Publicar", "Gerar vídeo", "Salvar alterações".
- Nunca: "OK", "Confirmar", "Enviar" sem contexto.

### Botão secundário
- Ação alternativa ou complementar.
- Background transparente, borda `--cluos-border-strong`.
- Discreto — não compete com o primário.

### Botão ghost
- Ação leve: navegação secundária, "Ver detalhes", "Cancelar", "Voltar".
- Sem borda, sem background padrão.
- Cor `--cluos-teal-deep`.

### Botão destrutivo
- Visual contido — não usar vermelho brilhante.
- Sempre acompanhado de confirmação em modal.
- Copy clara: "Excluir conta", não "Deletar".
- Cor `--cluos-status-error` apenas no estado confirmado.

### Proibido
- 4+ botões lado a lado.
- Múltiplos botões primários na mesma tela.
- Botão primário para ação rara ou avançada.
- Botão sem verbo claro.
- Botão com jargão técnico no fluxo principal.

---

## 10. Estados

Todo componente com dados dinâmicos deve ter todos os estados abaixo definidos:

| Estado | Descrição | Ação recomendada |
|--------|-----------|-----------------|
| `loading` | Requisição em andamento | Skeleton ou spinner com contexto |
| `skeleton` | Carregamento de estrutura | Placeholder com shape do conteúdo |
| `empty` | Sem dados para exibir | Título + explicação + ação primária |
| `success` | Operação concluída com sucesso | Toast ou callout green |
| `warning` | Atenção necessária, mas não bloqueante | Callout copper/warn |
| `error` | Operação falhou | Callout error + ação de recuperação |
| `offline` | Sem conexão | Banner informativo + retry |
| `unauthorized` | Usuário não autenticado | Redirecionar para login |
| `forbidden` | Usuário sem permissão | Mensagem clara + ação disponível |
| `no-data` | Filtro/busca sem resultado | Explicar, limpar filtro |
| `processing` | Processamento longo em andamento | Progresso + estimativa |
| `queued` | Na fila, aguardando | Posição + estimativa |
| `failed` | Falha permanente ou irrecuperável | Explicar + alternativa |
| `retrying` | Tentando novamente automaticamente | Informar + opção de cancelar |
| `completed` | Tarefa finalizada | Resumo do resultado + próxima ação |

**Para cada estado, definir:**
- Título curto.
- Descrição humana.
- Ação recomendada.
- Detalhe técnico recolhido (se necessário).

---

## 11. Feedback

**Regras:**
- Todo clique importante gera feedback visual imediato (loading state no botão, disabled após clique).
- Toda ação longa mostra progresso — nunca loading sem contexto.
- Toda falha orienta recuperação — nunca "Erro inesperado" sem próximo passo.
- Todo sucesso confirma o que mudou — "Conteúdo publicado em aeo.cluos.online", não "Operação realizada".
- Nunca deixar o usuário em silêncio após uma ação.

**Tipos de feedback:**
- **Toast** — sucesso ou informação transitória (auto-dismiss 4s).
- **Callout inline** — erro em formulário, warning contextual.
- **Banner** — estado global (offline, manutenção, degradação).
- **Modal** — confirmação de ação destrutiva.
- **Progress bar/stepper** — fluxos longos com etapas.

---

## 12. Movimento

**Regras:**
- Transições curtas: `--cluos-dur-fast` (120ms) para micro-interações, `--cluos-dur-base` (200ms) para transições de estado.
- Motion calmo — sem bounce, sem spring exagerado.
- Sem animação infinita sem mensagem — loading sem contexto é pior que nenhum loading.
- Entradas de elementos: fade + slide suave (4–8px de deslocamento).
- Saídas: fade simples, mais rápido que entrada.
- Respeitar `prefers-reduced-motion` — desativar transições quando preferência for reduce.

```css
@media (prefers-reduced-motion: reduce) {
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
```

---

## 13. Texto de interface

**Regras:**
- Curto — primeira frase faz o trabalho.
- Presente — "Gerando vídeo", não "Geração de vídeo iniciada".
- Humano — "Não conseguimos conectar", não "Falha na requisição HTTP 503".
- Sem jargão — UUIDs, endpoints, stack traces ficam em "Detalhes técnicos".
- Sem exclamações em fluxos normais — "Publicado!" uma vez; não cada ação.
- Sem tom infantil — CluOS é ferramenta profissional.
- Erro sempre orienta ação.

**Exemplos:**

| Ruim | Bom |
|------|-----|
| "Erro inesperado." | "Não foi possível gerar o vídeo. Verifique o formato do arquivo e tente novamente." |
| "Operação concluída com sucesso." | "Conteúdo publicado em aeo.cluos.online." |
| "Falha ao salvar." | "Não salvamos as alterações. Verifique sua conexão e tente novamente." |
| "Dados inválidos." | "O campo e-mail está inválido. Confira e tente novamente." |
| "Processando..." | "Gerando vídeo... (isso pode levar até 2 minutos)" |

---

## 14. Sensação de controle

O usuário deve sempre sentir que está no controle, mesmo quando o sistema opera autonomamente.

**Regras:**
- Mostrar preview antes de publicar.
- Mostrar antes/depois quando relevante (vídeo original vs. vídeo com identidade).
- Confirmar ações irreversíveis com modal claro.
- Permitir cancelar quando possível — "Cancelar" é sempre uma opção em processos longos.
- Mostrar histórico quando útil — última publicação, último deploy, última configuração.
- Permitir rollback em deploys e configurações críticas.
- Mostrar versão online quando relevante — "Você está editando a versão publicada em 2026-05-01".

---

## 15. Aplicação por produto CluOS

### Hub CluOS
- Card por sistema com status (online/atenção/offline).
- Botão "Abrir" como ação primária por card.
- Detalhes técnicos (último deploy, healthcheck) recolhidos.
- Filtro simples por status.
- Um botão primário global apenas se houver ação principal do hub.

### CRM CluOS
- Foco no próximo lead/contato pendente.
- Próximo passo claro por lead.
- Kanban simples (colunas = estágios, não status técnico).
- Histórico de interações recolhido por padrão.
- Ação de contato como primária; automações visíveis mas discretas.

### Automatic-AEO
- Conteúdo final (artigo, post) como unidade principal.
- Preview integrado antes de publicar.
- Pipeline de geração escondido — o usuário vê "Gerando..." e o resultado.
- Status por conteúdo (rascunho/revisão/publicado).
- Revisar e publicar no mesmo fluxo — não abas separadas.

### Suporte / Status
- Sistema + status + impacto = 3 informações na visão principal.
- Ação recomendada por problema.
- "Abrir sistema" como ação primária.
- Detalhes técnicos e logs recolhidos.
- "Criar ticket" como ação secundária.

### Medframe
- Formulário de prontuário por etapa/bloco clínico.
- Campos agrupados por intenção clínica, não por schema de banco.
- Autosave ou save explícito — nunca perder dados.
- Modo de revisão antes de assinar/finalizar.
- Alertas de interação/alerta clínico como callout proeminente.

### B3 / Loteca / DID / Sci-OS
- Dashboard de tomada de decisão — resumo primeiro, detalhe depois.
- Métricas que orientam ação, não apenas decoram.
- Ações executáveis próximas às métricas relevantes.
- Configurações técnicas separadas do fluxo principal.

### Editor de vídeo
- Fluxo: Upload → Preview → Configuração mínima → Gerar → Progresso → Resultado → Baixar.
- Identidade visual aplicada automaticamente — o usuário não configura cada elemento.
- "Gerar versão final" como única ação primária.
- "Ajustes avançados" recolhidos para usuários experientes.

### Login
- Logo + frase curta + formulário.
- Authelia quando aplicável — transparente para o usuário.
- Erro claro: "E-mail ou senha incorretos. Tente novamente."
- Sem excesso de links, banners ou opções na tela de login.

### Configurações
- Agrupadas por intenção: Perfil / Identidade visual / Usuários / Integrações / Notificações / Segurança / Avançado.
- Nunca agrupadas por arquitetura interna (models, services, controllers).
- Configurações avançadas recolhidas por padrão.
- Salvar automático quando fizer sentido (toggle, select).
- Botão "Salvar" explícito apenas quando o contexto é crítico.

### Upload de arquivos
- Dropzone com tipos aceitos e limite de tamanho visíveis.
- Progresso por arquivo.
- Validação inline — erro antes de enviar, não depois.
- Preview do arquivo antes de confirmar.
- Botão "Confirmar envio" como ação primária após preview.

### Páginas administrativas
- Tabelas com ações por linha (editar, desativar, excluir).
- Filtros no topo, discretos.
- Bulk actions visíveis apenas quando itens estão selecionados.
- Ações destrutivas com confirmação.

---

## 16. Anti-patterns proibidos

Proibido em qualquer tela CluOS:

| Anti-pattern | Por quê é proibido |
|-------------|-------------------|
| Tela com mais de 5 abas principais | Fragmenta intenção, aumenta carga cognitiva |
| Pipeline técnico como navegação | O usuário não quer saber de etapas, quer resultado |
| Muitos cards sem hierarquia | "Card para tudo" não é design — é ausência de decisão |
| 4+ botões lado a lado | Impossível para o usuário decidir qual é a ação certa |
| Tabela sem próxima ação | Dados sem decisão são decoração |
| Dashboard sem orientação de ação | "Você tem X dados" não é suficiente — "Faça Y" é |
| Logs expostos no fluxo normal | Logs são para depuração, não para operação |
| Config técnica no fluxo diário | Separar configuração de uso |
| Tela vazia sem orientação | Empty state sempre tem texto + ação |
| Erro sem solução | Nunca "Ocorreu um erro" sem próximo passo |
| Loading sem contexto | "Carregando..." é menos útil que "Gerando seu relatório..." |
| Cores novas sem token | Toda cor tem token; sem token, não existe |
| Interface genérica de SaaS colorido | CluOS tem identidade própria — teal + navy + muito espaço |
| Poluição visual | Cada elemento deve ganhar o espaço ou não estar na tela |
| Ícone decorativo sem função | Ícone funcional ou nenhum |
| Texto de placeholder como label | Label permanente é obrigatório |
| Botão desabilitado sem explicação | Se está desabilitado, o usuário deve saber por quê |
