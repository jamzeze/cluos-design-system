# Decisão de design — cluos-v2

Data: 2026-10-23. Decidido por: Rafael, em entrevista (grilling) de quatro rodadas.
Status: aprovado para fase de canvas; implementação no repositório após aprovação do canvas.
Supersede: `cluos-mms-v1` (2026-08-30) como contrato visual global.

## Identidade e fontes de verdade

1. O sistema é do CluOS. Não há hierarquia entre marcas: a Azigos é a referência e
   todas as suas cores entram no CluOS. Identificador canônico `cluos-v2`; prefixo
   de tokens `--cluos-*` mantido. `cluos-mms-v1` vira entrada histórica.
2. Paleta de marca = Brand Book AZIGOS (NDesigns, 03/2026): `#010D28` azul profundo,
   `#132952` azul médio, `#C4DB7B` verde tech, `#FFFFFF`, `#EAEAEA`, `#A5A5A5`, mais o
   off-white `#F4EFED` observado nas aplicações do brand book.
3. Tipografia: mantém Manrope (display), Instrument Sans (interface e dados) e
   JetBrains Mono (código). Just Sans do brand book não é adotada. Uma fonte de
   destaque (display de hero e números grandes, nunca texto corrido) será enviada por
   Rafael; precisa ser OFL ou já licenciada para web, com WOFF2 embarcável. Nenhuma
   compra de fonte ou biblioteca.
4. Logotipo CluOS: desenho preservado; só variantes mono em navy, branco, preto e
   verde tech. Variantes gradiente e teal saem do pacote.

## Registros visuais

5. Dois registros com os mesmos tokens. **Produto**: superfícies claras, hairlines,
   raio 4 px em controles e 8 px em regiões, sem sombra, densidade operacional.
   **Público**: campos navy e verde, recortes do símbolo como forma gráfica,
   botões em pílula, fotografia real fria, off-white `#F4EFED` como canvas alternativo.
6. Produto: `bg-subtle` passa a ser um neutro frio derivado de `#EAEAEA` (hoje é branco
   igual ao canvas).
7. Modo escuro de primeira classe: todo token tem par claro/escuro; navy como campo.
   Produto abre claro por padrão; escuro por preferência do usuário ou decisão por
   produto.
8. Estados vazios tipográficos, com no máximo um recorte do símbolo em neutro. Sem
   biblioteca de ilustração.
9. Ícones: Lucide, traço 1,5, tamanhos 16/20/24.

## Cor

10. Paleta arco-íris: 12 matizes em OKLCH, um fixado exatamente no verde tech e outro
    no matiz do azul médio, os demais derivados. Três degraus por matiz (fundo, linha,
    texto) em claro e escuro. Nomes numéricos (`hue-01`…`hue-12`). Uso permitido:
    categorias de dados, tags, calendário, avatares, ilustração, identificação de
    produto. Proibido: ação primária, status, navegação.
11. Teal, copper e oxblood deixam de ser papéis de marca; permanecem como aliases por
    uma versão.
12. Mapa semântico: ação primária = verde tech (texto navy); sucesso = verde distinto
    da rampa (mais azulado que o verde tech); aviso = âmbar da rampa; erro =
    vermelho-tijolo da rampa; informação = azul da rampa; azul médio reservado a
    estrutura, navegação e ação secundária; links em texto corrido = cor do texto com
    sublinhado. A cor de ação não vaza para estado.
    Nota de implementação (2026-10-25): os status ficam a 15° dos matizes da
    rampa (165/75/15/225) e com linha mais escura, de propósito, para um chip de
    status nunca ser lido como série de dados.
13. Identidade por produto: núcleo idêntico; cada produto recebe um matiz do arco-íris
    só para identificação (etiqueta no hub, tile do favicon, estado vazio).

## Escalas e componentes

14. Espaçamento base 4 px completo (0 a 96) com tokens semânticos (inset, stack, gap).
    Tipografia fluida com `clamp()` no registro público. Tracking e entrelinha por
    papel tipográfico. Densidade `data-density="compact|comfortable"`, padrão
    `comfortable`. Breakpoints inalterados. Container de produto 72 rem (corrigir
    AGENTS.md, que diz 960 px).
15. Camada de componentes: `cluos.css` de referência (~25 componentes, sem framework)
    + tema shadcn/Tailwind v4 em variáveis CSS. Sem componentes React no pacote.
    Preset Tailwind v3 mantido e `@theme` v4 adicionado, ambos gerados dos tokens.
16. Exports para agentes: `design.json` (W3C Design Tokens), `index.css` no formato
    shadcn e `AGENT-BRIEF.md` portátil, todos derivados do YAML canônico, nunca
    editados à mão.
17. Fontes versionadas em `brand-assets/fonts` (WOFF2 variáveis, latin + latin-ext).
18. Acessibilidade: alvo WCAG 2.2 AA. Correções dos PRs #4, #5 e #6 incorporadas;
    anel de foco = verde tech interno + navy externo.

## Registro público (segunda passada, aguarda insumos de Rafael)

19. Templates: landing, preços, docs/blog, legal, login/registro. Regras de imagem
    (fotografia real fria, recortes do símbolo; sem blobs 3D, sem gradiente roxo),
    de copy (sem superlativos ou percentuais sem fonte) e de layout (um H1, no
    máximo dois CTAs, screenshot real do produto). Checklist anti-IA próprio e rota
    `N2-público` no roteador. Primeira página recomendada: azigos.com.br.
20. Movimento permitido: uma entrada por seção (opacidade + 8 px, 300–600 ms, sem
    vínculo com rolagem), desenho progressivo de dados, hover e foco. Proibido:
    ScrollSmoother e sequestro de rolagem, pinning, rolagem horizontal falsa,
    parallax, revelação caractere a caractere, máscara clip-path a partir do centro,
    máscara de hero que cresce com o scroll, tilt reativo ao cursor. GSAP pode ser a
    ferramenta dentro desse vocabulário. `prefers-reduced-motion` sempre.
21. Navegação que some ao rolar para baixo e volta ao subir é permitida sem mudar de
    estilo; áudio ambiente é proibido. Bento grid só com hierarquia real de conteúdo.
22. Proibido clonar pixel a pixel ou raspar sites de terceiros; capturas de página
    inteira servem só para análise estrutural registrada por escrito. Bibliotecas de
    efeitos (Aceternity UI, React Bits) banidas; Radix/shadcn permitidos.
23. Documento "Metaprompt Master" recebido de Rafael é referência de método, não
    visual. Cópia e tabela adotado/adaptado/rejeitado em `docs/sources/`.

## Aceitação, entrega e governança

24. Aceitação: rubrica do design-critic (≥ 42/50, nenhuma dimensão < 4) estendida com
    checklist de página pública, mais teste cego de intercambialidade com três
    revisores em contexto limpo (passa com 2 de 3 atribuindo a tela ao CluOS sem logo).
25. Ordem: canvas de Design do registro de produto → aprovação → implementação no
    repositório (LONG_REFACTOR: um escritor, um commit, PR para main) → registro
    público em segunda passada quando referências e fonte chegarem.
26. Legado removido do pacote publicado (A–G, oito variantes, Thermal Nocturne,
    preview legado, classes `pal-*`), arquivado em `docs/legacy/`. Versão 1.0.0.
27. Produtos instalam via `npm install github:jamzeze/cluos-design-system#v1.0.0`;
    migração de MMS, azigos e suporte é onda separada.
28. Documentação narrativa em português; contratos de máquina em inglês.
29. Nesta sessão: sem publicação, tag ou merge. Entrega = canvas + PR.

## Adendo — 2026-10-24

30. Fonte de destaque: **Bruno Ace** (OFL, gratuita, peso único 400), escolhida por
    Rafael após avaliar Degular e Aeonik (ambas pagas, descartadas pela regra de
    não comprar). Manrope e Instrument Sans mantidas. Uso restrito a casos
    especiais: hero público, número de destaque em relatório, splash/login e peças
    de evento; uma ocorrência por composição, 32–120 px; nunca em texto corrido,
    controles, navegação, tabelas ou formulários; não substitui o lockup. É a única
    exceção à regra de duas famílias por tela. Espécime: prancheta "Fonte de
    destaque · Bruno Ace" no canvas.

31. 2026-10-25 — Fonte de destaque trocada para **Orbitron** (OFL, Google Fonts,
    variável 400–900). Rafael comparou doze candidatas no canvas (Bruno Ace,
    Syncopate, Anta, Turret Road, Panchang, Nippo, Orbitron, Michroma, Oxanium,
    Chakra Petch, Tomorrow, Unbounded). As regras de uso do item 30 continuam
    valendo; Bruno Ace deixa de ser a escolha.
    Revisão de 2026-10-25, depois da implementação: Rafael viu a Orbitron nos
    seis pesos e comparou de novo com Unbounded, Panchang e Virtual (a fonte do
    logotipo da Azigos) no espécime. Decidiu manter a Orbitron, peso 500. A
    Virtual tem um peso só e a cópia disponível é demo para uso pessoal
    (Sensatype Studio); só volta à mesa com licença comercial que cubra web e
    distribuição no pacote. A Panchang (ITF FFL) não é redistribuível no pacote.
