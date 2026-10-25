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
| Tipografia | Default sem decisão (fonte arbitrária) | Escala consistente, sem personalidade | Manrope + Instrument Sans; escala + peso fazem trabalho de hierarquia. Orbitron só como destaque (uma ocorrência por composição, 32–120 px, nunca em texto corrido) |
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
- Cor de marca usada em todo estado (verde tech não é "sucesso E ação E link").
- Ícone decorativo em todo título de seção.
- Grid uniforme quando o conteúdo tem hierarquia diferente.
- Teste de intercambiabilidade: remova mentalmente logo, nome do produto,
  cor primária e copy específica — se o resto ainda serve qualquer produto
  genérico, a direção não está suficientemente definida.

## Checklist de página pública (registro público, decisões 19–22)

Aplica-se quando a superfície é landing, preços, docs/blog, legal ou
login/registro. Cada item exige evidência; falha é P1.

- [ ] Um único H1.
- [ ] No máximo dois CTAs por vista.
- [ ] Screenshot real do produto; nenhuma captura substituída por mock.
- [ ] Fotografia real e fria; sem blobs 3D e sem gradiente roxo.
- [ ] Sem superlativos nem percentuais sem fonte.
- [ ] Movimento só do vocabulário da decisão 20: uma entrada por seção
  (opacidade + 8 px, 300–600 ms, sem vínculo com rolagem), desenho progressivo
  de dados, hover e foco, com `prefers-reduced-motion`. Proibidos:
  ScrollSmoother e sequestro de rolagem, pinning, rolagem horizontal falsa,
  parallax, revelação caractere a caractere, máscara clip-path a partir do
  centro, máscara de hero que cresce com o scroll, tilt reativo ao cursor e
  áudio ambiente.
- [ ] Sem bibliotecas de efeito (Aceternity UI, React Bits); Radix/shadcn são
  permitidos.
- [ ] Não clona nem raspa site de terceiro; captura de página inteira serve
  só para análise estrutural registrada por escrito.

## Teste cego de intercambialidade (decisão 24)

Critério de aceitação da implementação, além do score ≥ 42/50: três revisores
em contexto limpo veem a tela renderizada sem logo, nome do produto ou copy
identificadora e respondem se ela pertence ao CluOS. Passa com 2 de 3
atribuindo a tela ao CluOS. Registre as três respostas e a evidência (captura)
em `design-critic.md`. Não se aplica a N-skip/N0.
