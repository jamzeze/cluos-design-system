# Anti-Slop Rubric — CluOS

Used by the `design-critic` skill. Not proprietary to any one archetype —
applies to every CluOS surface regardless of which archetype/palette was
chosen for it.

## Identity test (answer honestly, in writing)

1. Se o logotipo e os textos forem removidos, a interface ainda parece
   pertencer ao CluOS?
2. Esta tela poderia ser atribuída a quinhentas startups diferentes?
3. Há uma ideia visual clara ou apenas um conjunto de componentes "bonitos"?
4. A interface transmite o posicionamento real do produto (central de
   comando / consultoria hospitalar premium)?
5. A densidade corresponde à tarefa?
6. A marca aparece na composição e nos detalhes, ou somente na cor primária?
7. Há elementos que existem apenas porque um modelo generativo costuma
   colocá-los ali?

## Scoring rubric (0-5 each, 50 total)

| Dimension | 0-1 | 2-3 | 4-5 |
|---|---|---|---|
| Distinção de marca | Genérico, trocável por qualquer SaaS | Reconhecível com esforço | Inconfundível sem logo |
| Hierarquia | Tudo com o mesmo peso | Hierarquia parcial | Um foco primário claro por tela |
| Composição | Grid uniforme sem relação com conteúdo | Composição correta mas sem intenção | Forma reflete a tarefa |
| Tipografia | Default sem decisão (Inter porque sim) | Escala consistente, sem personalidade | Escala + peso fazem trabalho de hierarquia |
| Densidade | Errada para a tarefa | Aceitável | Proporcional e intencional |
| Disciplina de tokens | Valores arbitrários espalhados | Maioria via token | 100% via token semântico |
| Economia de componentes | Card dentro de card, ornamento sem função | Componentes corretos mas redundantes | Cada elemento justifica sua existência |
| Clareza de interação | Estados ambíguos, foco invisível | Estados presentes mas inconsistentes | Todos os estados claros e consistentes |
| Acessibilidade | Falha WCAG AA | Passa AA parcialmente | AA completo, foco visível, teclado funcional |
| Responsividade/adaptação | Quebra fora do desktop | Funciona mas sem cuidado | Adaptação intencional por breakpoint |

**Aprovação: total ≥ 42/50, nenhuma dimensão abaixo de 4, zero P0/P1/P2
abertos.** O score nunca substitui julgamento — toda nota exige evidência
(arquivo, seletor, captura).

## Severity

- **P0** — quebra de uso, falha grave de acessibilidade, layout inviável.
- **P1** — falha importante de hierarquia, identidade ou usabilidade.
- **P2** — inconsistência relevante, drift visual, polimento necessário.
- **P3** — refinamento opcional, não bloqueia handoff.

P0/P1/P2 abertos bloqueiam o handoff para `design-qa`. Corrija, renderize de
novo, revise de novo, registre o histórico.

## Anti-slop signal checklist (composition, color, typography, icons, copy, motion)

Pull the concrete banned-by-default patterns from the source metaprompt
(`~/Downloads/metaprompt_refatoracao_cluos_anti_ai_slop.md` §15) — not
duplicated here to avoid drift between two copies. Key ones most relevant to
CluOS's dashboard/table/form surface inventory:

- Card como solução universal de separação (prefira agrupamento →
  alinhamento → tipografia → espaçamento → separador → superfície → borda →
  sombra, nessa ordem).
- Cor de marca usada em todo estado (teal não é "sucesso E ação E link").
- Ícone decorativo em todo título de seção.
- Grid uniforme quando o conteúdo tem hierarquia diferente.
- Teste de intercambiabilidade: remova mentalmente logo, nome do produto,
  cor primária e copy específica — se o resto ainda serve qualquer produto
  genérico, a direção não está suficientemente definida.
