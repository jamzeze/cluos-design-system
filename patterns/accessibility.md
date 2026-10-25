# CluOS Accessibility Patterns

> Requisitos mínimos de acessibilidade para todos os sistemas CluOS.
> Acessibilidade não é opcional — é requisito de qualidade.

---

## Princípio

Uma interface CluOS acessível é uma interface melhor para todos.
Foco em teclado, leitores de tela e preferências do sistema
beneficiam usuários com e sem deficiência.

---

## Nível mínimo exigido

**WCAG 2.2 AA** para todas as telas CluOS que são interfaces de usuário.

Critérios novos da 2.2 que o sistema já atende por padrão:

- 2.4.11 Foco não obscurecido: cabeçalhos e rodapés fixos não cobrem o elemento focado.
- 2.5.7 Movimentos de arrastar: todo arrastar (upload, reordenar) tem alternativa de clique ou teclado.
- 2.5.8 Tamanho do alvo: mínimo de 24 px pela norma; o CluOS usa `--cluos-touch-target-min` (40 px).
- 3.3.7 Entrada redundante e 3.3.8 Autenticação acessível: não peça de novo o que o usuário já informou e não bloqueie colar senha.

---

## Estrutura semântica

### Landmarks

Todo layout deve usar as regiões semânticas HTML:

```html
<header role="banner">       <!-- TopNav -->
<nav aria-label="...">       <!-- Sidebar e menus de navegação -->
<main>                       <!-- Área de conteúdo principal -->
<aside aria-label="...">     <!-- Painel contextual -->
<footer>                     <!-- Rodapé, se houver -->
```

### Hierarquia de headings

- Uma `<h1>` por página — o título da tela (PageHeader).
- `<h2>` para seções principais.
- `<h3>` para subseções.
- Nunca pular nível (h1 → h3 sem h2).
- Headings descrevem o conteúdo que os segue — não são decorativos.

---

## Foco e navegação por teclado

**Todos os elementos interativos devem ser acessíveis por Tab.**

### Ordem de foco

A ordem de foco deve seguir o fluxo visual lógico: topo → baixo, esquerda → direita.

### Focus ring

Nunca remover outline sem substituição:
```css
/* NUNCA FAZER */
:focus { outline: none; }

/* CORRETO — substituir por ring customizado */
:focus-visible {
  outline: none;
  box-shadow: var(--cluos-ring-focus);
}
```

O `--cluos-ring-focus` é um anel duplo: verde tech interno (2 px) e navy externo (2 px) no tema claro; no escuro, o anel externo é `#F7F8F5`. O anel externo tem 3:1 ou mais contra o canvas nos dois temas, inclusive quando o componente focado é o botão verde.

### Teclas especiais

| Componente | Tecla | Comportamento |
|-----------|-------|--------------|
| Modal | `Escape` | Fechar modal |
| Dropdown | `Escape` | Fechar dropdown |
| Dropdown | `Arrow keys` | Navegar opções |
| Sidebar accordion | `Enter/Space` | Abrir/fechar |
| Toast | `Escape` | Dispensar |
| Tabs | `Arrow keys` | Navegar abas |

### Focus trap

Modais e drawers devem capturar o foco:
- Foco entra no modal ao abrir.
- Tab/Shift+Tab circula dentro do modal.
- Foco retorna ao elemento que ativou o modal ao fechar.

---

## Componentes interativos

### Botões

```html
<!-- Botão com texto descritivo -->
<button type="button">Publicar conteúdo</button>

<!-- Botão com ícone apenas — aria-label obrigatório -->
<button type="button" aria-label="Fechar painel">
  <IconClose aria-hidden="true" />
</button>

<!-- Botão em loading state -->
<button type="button" aria-busy="true" disabled>
  <Spinner aria-hidden="true" />
  <span>Publicando...</span>
</button>
```

### Formulários

```html
<!-- Label sempre visível (nunca apenas placeholder) -->
<label for="email">E-mail</label>
<input id="email" type="email" name="email" autocomplete="email" />

<!-- Erro associado ao campo -->
<input id="email" type="email" aria-describedby="email-error" aria-invalid="true" />
<span id="email-error" role="alert">E-mail inválido. Use o formato usuario@dominio.com</span>

<!-- Campo obrigatório -->
<label for="name">Nome <span aria-hidden="true">*</span></label>
<input id="name" required aria-required="true" />
```

### Links vs. Botões

- `<a href="...">` — navegação para outra página ou âncora.
- `<button>` — ação que não navega (enviar, abrir modal, toggle).
- Nunca `<div>` ou `<span>` clicável sem role e tabindex.

### Selects e dropdowns customizados

Use `role="combobox"`, `role="listbox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`.
Prefira o `<select>` nativo quando possível — é mais acessível por padrão.

---

## Conteúdo visual

### Contraste de cor

| Tipo de texto | Contraste mínimo |
|-------------|-----------------|
| Texto normal (< 18px) | 4.5:1 |
| Texto grande (≥ 18px regular ou ≥ 14px bold) | 3:1 |
| Ícone funcional | 3:1 |
| Estado de foco (focus ring) | 3:1 |

**Tokens CluOS e contraste** (valores medidos por `python3 scripts/test-contrast.py`, 150 pares, 0 falhas; razões aqui calculadas com as mesmas funções):

| Par | Claro | Escuro | Mínimo |
|---|---|---|---|
| `--cluos-fg` sobre `--cluos-bg` | 19,27:1 | 18,08:1 | 4,5:1 |
| `--cluos-fg-2` sobre `--cluos-bg` | 14,32:1 | 12,32:1 | 4,5:1 |
| `--cluos-fg-3` (texto sutil) sobre `--cluos-bg` | 6,02:1 | 6,57:1 | 4,5:1 |
| `--cluos-fg-3` sobre `--cluos-bg-subtle` | 5,56:1 | 6,09:1 | 4,5:1 |
| `--cluos-action-fg` sobre `--cluos-action` | 12,63:1 | 12,63:1 | 4,5:1 |
| `--cluos-action-fg` sobre `--cluos-action-hover` | 9,47:1 | 9,47:1 | 4,5:1 |
| Texto de status sobre o próprio fundo (menor dos quatro) | 6,69:1 | 8,25:1 | 4,5:1 |
| Linha de status sobre `--cluos-bg` (menor dos quatro) | 5,21:1 | 6,78:1 | 3:1 |
| `--cluos-progress` sobre `--cluos-bg` | 14,32:1 | 6,14:1 | 3:1 |
| Anel de foco externo sobre `--cluos-bg` | 19,27:1 | 18,08:1 | 3:1 |

**Texto sutil x desabilitado.** São papéis diferentes e não se trocam:

- `--cluos-fg-3` (`#616367` no claro) é texto informativo secundário (legenda, metadado, data). Passa 4,5:1.
- `--cluos-fg-disabled` (`#A5A5A5` no claro) mede 2,46:1 sobre o canvas claro e 3,34:1 sobre o escuro. Não passa 4,5:1 e por isso é restrito a controles desabilitados, onde a norma dispensa contraste. Nunca use para texto que o usuário precise ler, nem para placeholder.
- O estado desabilitado não depende só da cor: mantenha o atributo `disabled` ou `aria-disabled="true"`.

**Cor nunca sozinha.** Status, erro de campo, link em texto corrido (sublinhado) e item selecionado têm sempre um segundo sinal: ícone, texto, sublinhado ou forma. Os 12 matizes e o status usam os degraus `-text` para texto e `-line` para ícone e borda.

**Tabelas largas.** A tabela vive numa região rotulada e focável, com `overflow-x: auto`:

```html
<div role="region" aria-label="Leads por origem" tabindex="0" class="table-region">
  <table>...</table>
</div>
```

Teclado: a região recebe foco e rola com as setas. Abaixo de 32rem a região tem padding horizontal `--cluos-space-2`. A página nunca rola na horizontal (critério 1.4.10 Refluxo).

### Imagens e ícones

```html
<!-- Imagem informativa — alt descritivo -->
<img src="chart.png" alt="Gráfico de crescimento de 23% em maio de 2026" />

<!-- Imagem decorativa — alt vazio -->
<img src="decoration.svg" alt="" role="presentation" />

<!-- Ícone funcional -->
<svg aria-label="Configurações" role="img">...</svg>

<!-- Ícone decorativo -->
<svg aria-hidden="true">...</svg>
```

---

## Estados e feedback

### Live regions

Para conteúdo que muda dinamicamente (toasts, resultados de busca, contadores):

```html
<!-- Status não urgente (espera o leitor terminar o que está lendo) -->
<div aria-live="polite" aria-atomic="true">
  3 resultados encontrados
</div>

<!-- Alerta urgente (interrompe o leitor) -->
<div role="alert">
  Erro: não foi possível salvar as alterações.
</div>
```

### Loading states

```html
<!-- Área em carregamento -->
<div aria-busy="true" aria-label="Carregando conteúdos...">
  <!-- skeleton content -->
</div>
```

---

## Motion e animação

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Nunca desabilitar funcionalidade por causa de `prefers-reduced-motion` —
apenas desabilitar animações cosméticas.

---

## Checklist de acessibilidade por tela

Antes de concluir qualquer tela, verificar:

- [ ] `<h1>` único e descritivo.
- [ ] Hierarquia de headings sem pulos.
- [ ] Landmarks semânticos (header, nav, main).
- [ ] Todos os elementos interativos acessíveis por teclado.
- [ ] Focus ring visível em todos os elementos interativos.
- [ ] Focus trap em modais e drawers.
- [ ] Labels em todos os campos de formulário.
- [ ] Erros de formulário associados ao campo (`aria-describedby`).
- [ ] Alt text em imagens informativas; alt vazio em decorativas.
- [ ] Ícones funcionais com `aria-label`.
- [ ] Ícones decorativos com `aria-hidden="true"`.
- [ ] Live regions para feedback dinâmico.
- [ ] Botões com texto descritivo (não apenas ícone sem label).
- [ ] Links com texto descritivo (não apenas "clique aqui").
- [ ] `prefers-reduced-motion` respeitado.
- [ ] Contraste de cor verificado (WCAG 2.2 AA) e status com ícone + texto.
- [ ] Tabelas largas em região rotulada e focável; a página não rola na horizontal.
- [ ] Texto informativo nunca usa `--cluos-fg-disabled`.
- [ ] Testado com navegação apenas por teclado.
