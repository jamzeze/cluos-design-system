# Fonte externa: "Metaprompt Master — diretrizes para webpages premium antídoto à IA"

Recebido de Rafael em 2026-10-23, colado na sessão de revisão do sistema de
design. Autor e origem não informados. Tratado como **referência de método,
não visual** (decisão 26 de `docs/frontend-routing/2026-10-23-cluos-v2/design-decision.md`).
Este arquivo registra o que o documento propõe e o que o cluos-v2 fez com cada
item, para que o repositório seja dono das suas fontes.

## Resumo do documento

Seis seções:

1. **Diagnóstico.** Páginas geradas por IA ficam genéricas porque recebem
   adjetivos ("bonito", "profissional") em vez de parâmetros. Propõe um
   `design.json` extraído de referências premium e anexado ao contexto do agente.
2. **Sistema de design.** Tema shadcn/ui pré-configurado (Tweak CN), variáveis
   CSS pareadas claro/escuro, fontes premium via `@font-face`, extensão do
   `tailwind.config.js` e classes utilitárias com `@layer components`. Exemplos
   de paleta neon (amarelo `#EDFF66`, violeta `#5724FF`) e fontes comerciais.
3. **Clonagem com fidelidade.** Captura de página inteira pelo DevTools,
   marcação multimodal, fatiamento de um arquivo gerado em componentes por
   script, Figma MCP e raspagem de sites ativos com Firecrawl.
4. **Componentes interativos.** Bibliotecas React Bits e Aceternity UI, card
   com tilt 3D reativo ao cursor e bento grid obrigatório.
5. **Animação cinematográfica.** GSAP com SplitText (revelação letra a letra),
   máscaras `clip-path`, ScrollTrigger com `scrub`, ScrollSmoother, pinning e
   rolagem horizontal falsa. Afirma uma "regra de ouro": não exagerar.
6. **System prompt pronto.** Bloco de instruções que fixa paleta neon, fontes de
   terceiros, bento obrigatório, tilt 3D, áudio ambiente e navegação flutuante.

## O que o cluos-v2 fez com cada item

| Item do documento | Destino | Onde está no cluos-v2 |
|---|---|---|
| Substituir adjetivos por tokens tipados | **Adotado** | `tokens/cluos-v2.yaml` como contrato único; exports gerados por `scripts/build-tokens.py` |
| `design.json` anexado ao contexto do agente | **Adotado** | `tokens/design.json` (W3C Design Tokens) |
| Tema shadcn pré-configurado em variáveis CSS | **Adotado** | `tokens/shadcn.css` mapeado para os papéis cluos |
| Pares claro/escuro obrigatórios | **Adotado** | todo papel tem valor claro e escuro em `tokens/tokens.css` |
| `@layer components` / classes utilitárias limpas | **Adotado** (sem framework) | `cluos.css` com componentes de referência |
| Captura de página inteira para análise | **Adotado** só para análise estrutural | regra em `agent-skills/shared/anti-slop-rubric.md` |
| Fatiamento de arquivo gerado em componentes | **Adotado** como prática de modularidade | não vira script no pacote |
| Regra de ouro do movimento ("não exagere") | **Adaptado** | vocabulário fechado em `cluos-v2.yaml` → `motion.public_register` |
| Navegação flutuante que some ao rolar | **Adaptado** | permitida sem mudar de estilo ao reaparecer |
| Bloco de prompt portátil | **Adaptado** | `AGENT-BRIEF.md`, gerado dos tokens |
| Paleta neon e fontes do exemplo | **Rejeitado** | contradiz a paleta Azigos e a decisão de não comprar fontes |
| Clonar ou raspar sites de terceiros | **Rejeitado** | risco de propriedade intelectual e identidade derivada |
| React Bits, Aceternity UI | **Rejeitado** | Radix e shadcn/ui permitidos |
| Tilt 3D, áudio ambiente | **Rejeitado** | ruído em contexto clínico, falha de acessibilidade |
| Bento grid obrigatório | **Rejeitado** | só com hierarquia real de conteúdo |
| ScrollSmoother, pinning, parallax, rolagem horizontal falsa, SplitText por caractere, `clip-path` a partir do centro | **Rejeitado** | lista de proibidos em `motion.public_register.banned` |
| System prompt da seção 6 | **Rejeitado** | substituído pelo `AGENT-BRIEF.md` |

Observação de licença registrada na sessão: GSAP, incluindo SplitText e
ScrollSmoother, é gratuito para uso comercial desde 2025; a rejeição é de
identidade e acessibilidade, não de custo.
