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

**WCAG 2.1 AA** para todas as telas CluOS que são interfaces de usuário.

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

O `--cluos-ring-focus` está definido nos tokens: `0 0 0 3px rgba(0, 128, 128, 0.30)`.

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

**Tokens CluOS e contraste:**
- `--cluos-navy (#1B2F36)` sobre `--cluos-bg (#FFFFFF)`: ✓ ~13:1
- `--cluos-teal (#008080)` sobre `--cluos-bg (#FFFFFF)`: ✓ ~3.4:1 (OK para grande, verificar pequeno)
- `--cluos-text-muted (#5A6570)` sobre `--cluos-bg (#FFFFFF)`: ✓ ~5.5:1
- `--cluos-text-subtle (#8A939B)` sobre `--cluos-bg (#FFFFFF)`: verificar — pode não passar em texto pequeno.

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
- [ ] Contraste de cor verificado (WCAG AA).
- [ ] Testado com navegação apenas por teclado.
