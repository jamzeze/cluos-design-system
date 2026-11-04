# CEO Agent — Intent Router

Given a natural language message, classify the intent and select the appropriate connector(s).

## Classification Schema

```
intent:
  category: <category>
  connector: <connector-id>
  action: <specific action>
  risk: read | execute-low-risk | execute-high-risk | require-approval | blocked
  reversible: true | false | partial
```

## Categories and Routing

### GitHub

Keywords: issue, PR, pull request, branch, commit, review, CI, workflow, repo, repositório, código

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Lista os issues abertos" | github | list-issues | read |
| "Qual o status do CI?" | github | get-check-runs | read |
| "Cria um issue sobre X" | github | create-issue | execute-low-risk |
| "Abre um PR de X para main" | github | create-pr | execute-high-risk |
| "Faz merge do PR #N" | github | merge-pr | require-approval |
| "Deleta a branch X" | github | delete-branch | require-approval |

### Gmail

Keywords: email, e-mail, mensagem, inbox, caixa, remetente, assunto, responder, encaminhar

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Lê os últimos emails" | gmail | list-messages | read |
| "Procura email de João" | gmail | search | read |
| "Cria rascunho de resposta" | gmail | create-draft | execute-low-risk |
| "Envia email para X" | gmail | send | require-approval |

### Google Calendar

Keywords: reunião, meeting, agenda, evento, calendário, horário, convite, schedule

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Minha agenda de amanhã?" | google-calendar | list-events | read |
| "Cria reunião interna" | google-calendar | create-event | execute-low-risk |
| "Agenda reunião com cliente" | google-calendar | create-event+invite | require-approval |
| "Cancela evento X" | google-calendar | delete-event | require-approval |

### Google Drive / Docs / Sheets

Keywords: arquivo, documento, planilha, Drive, doc, sheet, pasta, upload, download

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Encontra o doc de estratégia" | google-drive | search | read |
| "Cria doc de briefing" | google-docs | create | execute-low-risk |
| "Atualiza linha na planilha KPI" | google-sheets | append-row | execute-low-risk |
| "Compartilha doc com X" | google-drive | share | require-approval |

### Browserbase

Keywords: abre, login, navega, site, página, formulário, scrape autenticado

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Abre o LinkedIn de X" | browserbase | navigate | read |
| "Preenche formulário em Y" | browserbase | fill-form | execute-high-risk |
| "Faz login no portal Z" | browserbase | login-session | require-approval |

### Firecrawl

Keywords: pesquisa, artigo, página, URL, site, raspa, extrai, resumo de site

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Extrai conteúdo de <url>" | firecrawl | scrape | read |
| "Pesquisa sobre X na web" | firecrawl | crawl | read |

### Obsidian

Keywords: nota, vault, anotação, decisão, log, registro, Obsidian

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Lê a nota X" | obsidian | read-note | read |
| "Adiciona nota sobre X" | obsidian | append-note | execute-low-risk |
| "Cria nova nota Y" | obsidian | create-note | execute-low-risk |
| "Apaga nota Z" | obsidian | delete-note | require-approval |

### Apify

Keywords: LinkedIn, prospecção, scrape, dados públicos, lista de empresas

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Raspa perfis do LinkedIn" | apify | run-actor | execute-low-risk |
| "Lista empresas de X setor" | apify | run-actor | execute-low-risk |

### YouTube Transcripts

Keywords: transcrição, vídeo, YouTube, legenda, resumo de vídeo

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Transcreve o vídeo <url>" | youtube-transcripts | get-transcript | read |
| "Resume o vídeo X" | youtube-transcripts | get-transcript+summarize | read |

### Granola / Fathom

Keywords: reunião gravada, notas de call, transcrição de call, Granola, Fathom

| User Intent | Connector | Action | Risk |
|---|---|---|---|
| "Resume a reunião de hoje" | granola-fathom | get-notes | read |
| "Itens de ação da call X" | granola-fathom | get-action-items | read |

## Multi-Step Routing

Some requests require multiple connectors in sequence:

- "Cria briefing sobre reunião de hoje → salva no Drive → cria issue no GitHub"
  → granola-fathom (read) → google-docs (create) → github (create-issue)
  → Risk: execute-low-risk (all individual steps)

- "Envia resumo da reunião para João por email"
  → granola-fathom (read) → gmail (send)
  → Risk: require-approval (send step escalates)

Always take the highest risk level of any step in the chain.

## Ambiguous Requests

If intent is unclear, ask ONE clarifying question before routing.
Never guess the connector when the user could mean multiple things.
