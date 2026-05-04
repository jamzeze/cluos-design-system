# CluOS Content Guidelines

> Diretrizes de linguagem, tom e escrita para interfaces CluOS.
> Todo texto de interface é parte do design.

---

## Princípio

A escrita de interface CluOS deve:

- Ser curta e direta — a primeira frase faz o trabalho.
- Usar tempo presente — "Gerando..." não "A geração foi iniciada".
- Ser humana — "Não conseguimos conectar", não "Erro de conexão 503".
- Orientar ação — todo estado problemático sugere o próximo passo.
- Ser consistente — o mesmo conceito tem o mesmo nome em toda a interface.
- Ser calma — sem exclamações em estados normais, sem drama em erros.

---

## Tom e voz

CluOS é uma plataforma profissional para pessoas que trabalham com dados, conteúdo e sistemas. O tom deve ser:

| Atributo | Significa |
|----------|-----------|
| Claro | O usuário entende imediatamente |
| Direto | Sem rodeios ou jargão desnecessário |
| Calmo | Sem pânico em erros, sem euforia em sucessos |
| Profissional | Não infantil, não formal demais |
| Útil | Cada palavra serve ao usuário |

**Não é:**
- Corporativo-formal: "Prezado usuário, sua solicitação foi processada com êxito."
- Casual demais: "Oba! Tudo certo! 🎉"
- Técnico-cru: "HTTP 503 Service Unavailable — backend gateway timeout."

---

## Títulos de tela e seção

- Use substantivos ou verbos no infinitivo para identificar seções.
- Use frases curtas, não parágrafos.

**Exemplos:**

| Ruim | Bom |
|------|-----|
| "Lista de todos os conteúdos gerados automaticamente" | "Conteúdos gerados" |
| "Configurações e preferências do sistema" | "Configurações" |
| "Área de upload de vídeos para processamento" | "Upload de vídeo" |
| "Dashboard de acompanhamento de métricas" | "Visão geral" |

---

## Botões e ações

Use sempre **verbo + objeto**. O usuário deve saber o que vai acontecer ao clicar.

| Ruim | Bom |
|------|-----|
| "OK" | "Confirmar exclusão" |
| "Enviar" | "Publicar conteúdo" |
| "Sim" | "Excluir conta" |
| "Continuar" | "Avançar para configuração" |
| "Processar" | "Gerar vídeo" |
| "Submit" | "Salvar alterações" |

**Regras:**
- Capitalize apenas a primeira letra: "Publicar conteúdo", não "Publicar Conteúdo".
- Sem ponto final em botões.
- Sem exclamações: "Publicar", não "Publicar!".
- O botão de cancelar deve sempre dizer "Cancelar" (não "Não", "Fechar", "Voltar" inconsistentemente).

---

## Mensagens de estado

### Loading

**Formato:** Verbo + gerúndio + contexto.

| Ruim | Bom |
|------|-----|
| "Carregando..." | "Carregando conteúdos..." |
| "Aguarde..." | "Gerando vídeo... (isso pode levar até 2 minutos)" |
| "Processando..." | "Aplicando identidade visual... (etapa 2 de 4)" |

### Success

**Formato:** O que mudou, de forma específica.

| Ruim | Bom |
|------|-----|
| "Sucesso!" | "Conteúdo publicado em aeo.cluos.online." |
| "Operação realizada." | "Alterações salvas." |
| "Feito!" | "Vídeo exportado. Pronto para download." |

### Error

**Formato:** O que aconteceu + causa provável + como resolver.

| Ruim | Bom |
|------|-----|
| "Erro inesperado." | "Não foi possível publicar o conteúdo. Verifique sua conexão e tente novamente." |
| "Falha ao salvar." | "As alterações não foram salvas. Verifique sua conexão e tente novamente." |
| "Formato inválido." | "O arquivo enviado não é suportado. Use PDF, JPG ou PNG (máx. 10MB)." |
| "Acesso negado." | "Você não tem permissão para esta ação. Contate um administrador." |

### Warning

**Formato:** O que pode ser um problema + o que é recomendado.

Exemplo:
- "Este conteúdo usa uma imagem sem texto alternativo. Recomendamos adicionar um alt text antes de publicar."

### Empty state

**Formato:** O que não tem aqui + por quê pode estar vazio + o que fazer.

| Contexto | Título | Descrição |
|---------|--------|-----------|
| Lista de conteúdos | "Nenhum conteúdo ainda" | "Gere seu primeiro conteúdo para começar a publicar." |
| Busca sem resultado | "Nenhum resultado para '[termo]'" | "Tente outros termos ou limpe os filtros." |
| Histórico vazio | "Nenhuma atividade recente" | "As ações registradas aparecem aqui." |

---

## Validação de formulários

Mensagens de erro de campo devem ser:
- Específicas sobre qual campo e qual o problema.
- No presente.
- Orientadas à correção.

| Ruim | Bom |
|------|-----|
| "Campo obrigatório." | "O nome é obrigatório." |
| "Dados inválidos." | "O e-mail está inválido. Use o formato usuario@dominio.com" |
| "Senha incorreta." | "A senha deve ter pelo menos 8 caracteres." |
| "Erro no campo." | "O CPF informado é inválido. Verifique e tente novamente." |

---

## Labels e placeholders

**Labels:** Sempre visíveis. Descrevem o campo.  
**Placeholders:** Exemplos do formato esperado, nunca instrução obrigatória.

```
Label:        E-mail de trabalho
Placeholder:  usuario@empresa.com.br
```

```
Label:        Data de nascimento
Placeholder:  DD/MM/AAAA
```

Nunca usar apenas placeholder sem label — ele some ao digitar.

---

## Títulos de modais e drawers

Use substantivo que descreve a ação, não instruções:

| Ruim | Bom |
|------|-----|
| "Tem certeza que deseja excluir?" | "Excluir conta" |
| "Por favor, confirme sua ação." | "Confirmar publicação" |
| "Editar item" | "Editar lead" (específico ao contexto) |

---

## Números e dados

- Datas: formato BR quando o produto é em PT-BR — "05 mai. 2026" ou "05/05/2026".
- Horas: 24h por padrão — "14:30", não "2:30 PM".
- Números grandes: usar separador de milhar — "1.234.567", não "1234567".
- Percentuais: "23%", não "23 por cento".
- Unidades de arquivo: "10 MB", "2,3 GB" com espaço.

---

## Consistência de termos

Adotar um vocabulário consistente para cada conceito. Não usar sinônimos aleatórios.

| Conceito | Termo oficial | Não usar |
|---------|--------------|---------|
| Criação de texto/vídeo | "Gerar" | "Criar", "Produzir", "Fazer" |
| Tornar público | "Publicar" | "Lançar", "Enviar", "Deploy" |
| Salvar definitivamente | "Salvar" | "Gravar", "Confirmar" |
| Remover permanentemente | "Excluir" | "Deletar", "Apagar", "Remover" (use "Remover" apenas para desassociação) |
| Usuário do sistema | "Usuário" | "Cliente", "Pessoa", "Member" |
| Tela principal | "Visão geral" ou nome específico | "Home", "Dashboard" (só se o produto tem esse conceito) |

---

## Notificações e toasts

- Máximo 2 linhas.
- Primeira linha: o que aconteceu.
- Segunda linha (opcional): próximo passo ou detalhe.
- Sem exclamações.
- Auto-dismiss em 4s para success/info. Persistente para erro.

**Exemplos:**
- ✓ "Conteúdo publicado. Disponível em aeo.cluos.online."
- ✗ "Vídeo salvo com sucesso! 🎉"
- ✓ "Não foi possível salvar. Verifique sua conexão."
- ✗ "Erro! Algo deu errado ao salvar suas configurações."
