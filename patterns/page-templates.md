# CluOS Page Templates

> Templates reutilizáveis para os fluxos mais comuns nos sistemas CluOS.

---

## Template: Hub de sistemas

**Intenção:** Visão geral de todos os sistemas com acesso rápido.

**Estrutura:**
```
AppShell
└── PageHeader
    ├── Título: "Sistemas CluOS"
    ├── Descrição: "X sistemas — Y online, Z com atenção"
    └── Filtro de status (todos / online / atenção / offline)
└── Grid de SystemCards (3 col desktop / 2 tablet / 1 mobile)
```

**Notas:** Detalhes técnicos por card recolhidos. Ação primária: "Abrir".

---

## Template: Dashboard operacional

**Intenção:** Resumo do estado atual + próximas ações.

**Estrutura:**
```
AppShell
└── PageHeader
    └── Título: [Nome do sistema]
    └── Status global (badge)
└── Seção: Resumo (4 MetricCards max)
└── Seção: Pendências (lista com ação por item)
└── Seção: Atividade recente (DetailsDisclosure — recolhido)
```

---

## Template: Lista com ações

**Intenção:** Listar itens e permitir ação por item ou em bulk.

**Estrutura:**
```
AppShell
└── PageHeader
    └── Título, PrimaryAction ("Adicionar")
└── Barra de filtros e busca
└── Tabela / Lista
    ├── Estado loading: TableSkeleton
    ├── Estado vazio: EmptyState
    ├── Estado erro: ErrorState
    └── Itens: ação por linha, bulk actions na seleção
└── Paginação
```

---

## Template: Detalhe de item

**Intenção:** Exibir e editar um item específico.

**Estrutura:**
```
AppShell
└── PageHeader
    ├── Breadcrumb: "Lista > Item atual"
    ├── Título: nome do item
    ├── Status badge
    └── ActionBar: [PrimaryAction] [SecondaryAction] [DestructiveAction]
└── Conteúdo principal
    ├── Seção principal (campos mais importantes)
    └── DetailsDisclosure (campos avançados)
└── Painel lateral contextual (histórico, metadados — opcional)
```

---

## Template: Fluxo de upload + processamento

**Intenção:** Subir arquivo, confirmar, processar, ver resultado.

**Estrutura:**
```
AppShell
└── PageHeader
    └── ProgressStepper: [Upload] → [Confirmar] → [Processar] → [Resultado]
└── Etapa 1 — Upload:
    └── UploadDropzone
└── Etapa 2 — Confirmar:
    └── PreviewPanel + metadados
    └── PrimaryAction: "Iniciar processamento"
└── Etapa 3 — Processar:
    └── LoadingState com progress bar + mensagem de etapa
└── Etapa 4 — Resultado:
    └── PreviewPanel do resultado
    └── PrimaryAction: "Baixar" | SecondaryAction: "Gerar nova versão"
```

---

## Template: Configurações

**Intenção:** Ajustar preferências agrupadas por intenção.

**Estrutura:**
```
AppShell
└── Sidebar de configurações (grupos: Perfil / Usuários / Integrações / Segurança / Avançado)
└── MainArea
    └── PageHeader: "Configurações — [Grupo ativo]"
    └── SettingsSection 1
    └── SettingsSection 2
    └── [Salvar alterações] (primary — apenas se houver campos críticos)
```

---

## Template: Login

**Intenção:** Autenticar usuário com mínima fricção.

**Estrutura:**
```
Tela fullscreen (sem AppShell)
└── Área centralizada max-width 400px
    ├── Logo CluOS (stacked)
    ├── Frase curta (opcional)
    ├── Formulário: e-mail + senha
    ├── PrimaryAction: "Entrar"
    ├── InlineFeedback para erro
    └── Link ghost: "Esqueci minha senha"
```

---

## Template: Review + Publish

**Intenção:** Revisar conteúdo gerado e publicar.

**Estrutura:**
```
AppShell
└── PageHeader
    ├── Título: nome do conteúdo
    ├── Status: "Em revisão"
    └── ActionBar: [Publicar] [Agendar] [Rejeitar]
└── Layout 2 colunas:
    ├── Esquerda: editor / metadados
    └── Direita: PreviewPanel (preview fiel ao canal de destino)
└── DetailsDisclosure: "Histórico de versões"
└── DetailsDisclosure: "Detalhes técnicos de geração"
```

---

## Template: Error / Unauthorized

**Intenção:** Comunicar falha e orientar o próximo passo.

**Estrutura:**
```
Tela standalone (com ou sem AppShell)
└── ErrorState
    ├── Título: "Acesso não autorizado" / "Página não encontrada" / "Erro inesperado"
    ├── Descrição + ação recomendada
    ├── PrimaryAction: "Voltar ao início" ou "Tentar novamente"
    └── DetailsDisclosure: "Detalhes técnicos"
```
