# Ativos de marca (cluos-v2)

Estes arquivos fazem parte do pacote. Use-os diretamente; não redesenhe,
estique, sombreie nem aplique gradiente às marcas.

## Logotipo CluOS — só variantes mono (decisão 16)

O desenho não muda; só a cor. As variantes em gradiente, duo e teal saíram do
pacote em 2026-10-24 e estão em `../docs/legacy/brand-assets/`.

| Arquivo | Conteúdo | Origem |
| --- | --- | --- |
| `cluos-logo-navy.svg` | Lockup empilhado, azul profundo | derivado do mestre preto |
| `cluos-logo-white.svg` | Lockup empilhado, branco | direto (`guides/SVG/… cópia 23.svg`) |
| `cluos-logo-black.svg` | Lockup empilhado, preto | direto (`… cópia 20.svg`) |
| `cluos-logo-green.svg` | Lockup empilhado, verde tech `#C4DB7B` | derivado do mestre preto |
| `cluos-symbol-navy.svg` | Símbolo, azul profundo | derivado |
| `cluos-symbol-white.svg` | Símbolo, branco | direto (`… cópia 25.svg`) |
| `cluos-symbol-black.svg` | Símbolo, preto | direto (`… cópia 22.svg`) |
| `cluos-symbol-green.svg` | Símbolo, verde tech | derivado |
| `favicon.svg` | Símbolo verde tech sobre tile azul profundo | derivado |

O pacote oficial só tem o lockup empilhado (símbolo acima do nome). Não
reconstrua uma versão horizontal à mão; nas interfaces use o lockup de produto
tipográfico (`.cluos-lockup` em `cluos.css`), que não substitui o logotipo.

## Logotipo Azigos — referência de marca

Convertidos do PDF `Logo_Azigos_Final_RGB_TELAS.pdf` (NDesigns, 03/2026),
recortados ao conteúdo, sem alteração de desenho. A fonte do wordmark
("Virtual") existe só dentro do logotipo.

| Arquivo | Conteúdo |
| --- | --- |
| `azigos-lockup-color.svg` | Símbolo verde tech + nome azul profundo |
| `azigos-lockup-white.svg` | Símbolo verde tech + nome branco, para fundo escuro |
| `azigos-lockup-navy.svg`, `-green.svg`, `-black.svg` | Mono (`fill="currentColor"`) |
| `azigos-symbol-color.svg`, `-white.svg` | Símbolo nas cores do PDF |
| `azigos-symbol-navy.svg`, `-green.svg`, `-black.svg` | Símbolo mono (`fill="currentColor"`) |

## Fontes (`fonts/`)

Todas OFL, subconjunto latin (cobre o português), WOFF2 variável. Carregue com
`@cluos/design-system/fonts.css`; nunca por CDN em tempo de execução.

| Arquivo | Família | Pesos | Papel |
| --- | --- | --- | --- |
| `manrope-latin-variable.woff2` | Manrope | 200–800 | Display, métricas |
| `instrument-sans-latin-variable.woff2` | Instrument Sans | 400–700 | Interface, dados |
| `jetbrains-mono-latin-variable.woff2` | JetBrains Mono | 100–800 | Código, identificadores |
| `orbitron-latin-variable.woff2` | Orbitron | 400–900 | Destaque, casos especiais |

As licenças estão ao lado de cada arquivo (`LICENSE-*.txt`), sem alteração.

## Regras de exportação

- SVG 1.1 com `viewBox`, sem `width`/`height` fixos e sem imagem embutida.
- Clearspace igual à altura do símbolo; mínimo de 24 px para o símbolo e 32 px
  para o lockup empilhado.
- Novo ativo: atualize este arquivo, `DESIGN.md` e `CHANGELOG.md` na mesma mudança.
