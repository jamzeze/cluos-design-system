# CluOS Interface States

> Todo componente com dados dinâmicos deve implementar os estados abaixo.
> Referência completa de comportamento, texto e tokens para cada estado.

---

## Princípio

**Nenhum componente pode ficar num estado indefinido.**

Se o dado está carregando: loading.  
Se não há dado: empty.  
Se falhou: error.  
Se está processando: processing.  
Se concluiu: success ou completed.

---

## Estados de carregamento

### `loading`

Quando usar: Requisição em andamento, dado ainda não disponível.

**Comportamento:**
- Skeleton para listas, tabelas e cards (previsível estruturalmente).
- Spinner + texto para operações indetermináveis.
- Nunca apenas spinner sem contexto textual.

**Texto:** "Carregando [nome do contexto]..." — ex.: "Carregando conteúdos..."

**Tokens:**
- Skeleton background: `var(--cluos-bg-muted)`.
- Skeleton animation: shimmer suave (opacity 0.6 → 1, loop).
- Respeitar `prefers-reduced-motion`: desativar animação, manter shape.

---

### `skeleton`

Quando usar: Como variante de `loading` para estruturas de conteúdo conhecidas.

**Comportamento:**
- Renderizar shapes aproximadas do conteúdo que virá.
- Um bloco de título (100% width, altura 20px).
- Linhas de texto (80%, 90%, 60% widths).
- Cards em grid com background muted.

---

## Estados de conteúdo

### `empty`

Quando usar: Quando a lista, tabela, ou área de conteúdo não tem dados para exibir (não é erro — simplesmente está vazia).

**Anatomia:**
- Ícone discreto (símbolo CluOS ou ícone contextual).
- Título curto.
- Descrição (máximo 2 frases).
- PrimaryAction.

**Exemplos:**

| Contexto | Título | Descrição | Ação |
|---------|--------|-----------|------|
| Lista de conteúdos | "Nenhum conteúdo ainda" | "Gere seu primeiro conteúdo para começar." | "Gerar conteúdo" |
| Busca sem resultado | "Nenhum resultado" | "Tente outros termos ou limpe os filtros." | "Limpar filtros" |
| Notificações | "Tudo em dia" | "Nenhuma notificação pendente." | (nenhuma) |
| Logs | "Nenhum log disponível" | "Os logs aparecem aqui após a execução." | (nenhuma) |

---

### `no-data`

Quando usar: Quando filtros ou busca retornam zero resultados (diferente de `empty` — há dados no sistema, mas nenhum correspondeu).

**Anatomia:**
- Título: "Nenhum resultado para '[termo buscado]'"
- Ação: "Limpar filtros" ou "Ajustar busca".
- Não mostrar ação de criar novo item — o usuário está buscando algo existente.

---

## Estados de feedback de ação

### `success`

Quando usar: Após ação bem-sucedida.

**Comportamento:**
- Toast auto-dismiss (4s) para ações leves.
- Callout inline para ações com mais contexto.
- Atualizar estado do item (badge, label) automaticamente.

**Texto:** Específico sobre o que mudou. "Conteúdo publicado em aeo.cluos.online.", não "Operação realizada com sucesso."

**Tokens:** `--cluos-status-success`, `--cluos-status-success-bg`.

---

### `warning`

Quando usar: Atenção necessária mas não bloqueante.

**Comportamento:**
- Callout contextual próximo ao item afetado.
- Não interrompe o fluxo — o usuário pode continuar.
- Indica o que deve ser verificado.

**Exemplo:** "Este conteúdo usa uma imagem sem alt text. Recomendamos adicionar antes de publicar."

**Tokens:** `--cluos-status-warn`, `--cluos-status-warn-bg`.

---

### `error`

Quando usar: Operação falhou.

**Comportamento:**
- Callout inline (formulários, ações em contexto).
- ErrorState (falha de carregamento de página/seção).
- Toast error (ação assíncrona falhou no background).

**Texto:** O que aconteceu + causa provável + como resolver.

**Tokens:** `--cluos-status-error`, `--cluos-status-error-bg`.

**Detalhes técnicos:** Sempre recolhidos em `DetailsDisclosure`.

---

## Estados de processo assíncrono

### `processing`

Quando usar: Operação longa em andamento (geração de vídeo, export, análise).

**Comportamento:**
- Tela de progresso dedicada (para processos > 5s).
- Barra de progresso com percentual quando estimável.
- Mensagem do estágio atual: "Aplicando identidade visual... (etapa 2 de 4)".
- Botão "Cancelar" disponível quando possível.

---

### `queued`

Quando usar: Recurso está aguardando processamento em fila.

**Texto:** "Na fila — posição 3 de 7. Tempo estimado: 2 minutos."

**Tokens:** Usar `--cluos-status-info`, `--cluos-status-info-bg`.

---

### `retrying`

Quando usar: Sistema tentando novamente automaticamente após falha.

**Texto:** "Tentando novamente... (tentativa 2 de 3)"

**Comportamento:** Botão "Cancelar" visível. Após esgotar tentativas → `failed`.

---

### `failed`

Quando usar: Falha permanente após todas as tentativas.

**Diferença do `error`:** `error` é para falhas imediatas; `failed` é para processos que tentaram e não conseguiram.

**Texto:** "Não foi possível gerar o vídeo após 3 tentativas. [Detalhes técnicos]"

**Ação:** "Tentar novamente do início" ou "Contatar suporte".

---

### `completed`

Quando usar: Processo assíncrono finalizado com sucesso.

**Comportamento:**
- Notificação (toast ou banner) com resultado.
- Transição automática para tela de resultado.
- Ação primária clara: "Ver resultado", "Baixar", "Publicar".

**Texto:** "Vídeo gerado com sucesso. Pronto para download."

---

## Estados de acesso

### `unauthorized`

Quando usar: Usuário não autenticado tenta acessar recurso protegido.

**Comportamento:** Redirecionar para login. Não mostrar conteúdo parcial.

**Texto:** "Faça login para continuar."

---

### `forbidden`

Quando usar: Usuário autenticado sem permissão para o recurso.

**Comportamento:** Mostrar mensagem clara. Não redirecionar para login (o usuário já está autenticado).

**Texto:** "Você não tem permissão para acessar esta seção. Contate um administrador."

**Ação:** "Voltar ao início" ou "Solicitar acesso".

---

## Estados de conectividade

### `offline`

Quando usar: Perda de conexão detectada.

**Comportamento:**
- Banner no topo da aplicação (não modal — não bloquear a interface).
- Interface pode continuar visível mas com interações desabilitadas.
- Reconectar automaticamente + informar quando voltar online.

**Texto:** "Sem conexão com a internet. Algumas funcionalidades podem estar indisponíveis."

---

## Checklist de implementação de estados

Para qualquer componente com dados dinâmicos, verificar:

- [ ] `loading` — skeleton ou spinner com contexto definido.
- [ ] `empty` — título + descrição + ação (quando aplicável).
- [ ] `error` — título + causa + ação + detalhes técnicos recolhidos.
- [ ] Estado de dado presente — layout principal.
- [ ] Estados de ação: `success`, `warning`, `error` para operações mutáveis.
- [ ] Para processos longos: `processing`, `queued`, `completed`, `failed`.
- [ ] `prefers-reduced-motion` respeitado em animações de loading.
