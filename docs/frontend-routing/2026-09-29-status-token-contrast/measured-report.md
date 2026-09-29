# Status text contrast

Source: `tokens/tokens.css`. Threshold 4.5:1. Before: the fill used as text. After: the text token.

## Canonical constants, light register

| Status | Surface | Before | After |
|---|---|---|---|
| success | `--cluos-bg` `#FFFFFF` | `#6F8F19` 3.74 fail | `#546D13` 5.88 |
| success | `--cluos-bg-subtle` `#FFFFFF` | `#6F8F19` 3.74 fail | `#546D13` 5.88 |
| success | `--cluos-bg-muted` `#EAEAEA` | `#6F8F19` 3.11 fail | `#546D13` 4.88 |
| success | `--cluos-status-success-bg` `#F1F6DF` | `#6F8F19` 3.38 fail | `#546D13` 5.31 |
| info | `--cluos-bg` `#FFFFFF` | `#3E6E82` 5.59 | `#3E6E82` 5.59 |
| info | `--cluos-bg-subtle` `#FFFFFF` | `#3E6E82` 5.59 | `#3E6E82` 5.59 |
| info | `--cluos-bg-muted` `#EAEAEA` | `#3E6E82` 4.65 | `#3E6E82` 4.65 |
| info | `--cluos-status-info-bg` `#EDF1F4` | `#3E6E82` 4.92 | `#3E6E82` 4.92 |
| warn | `--cluos-bg` `#FFFFFF` | `#BD7845` 3.54 fail | `#8A5A2B` 5.87 |
| warn | `--cluos-bg-subtle` `#FFFFFF` | `#BD7845` 3.54 fail | `#8A5A2B` 5.87 |
| warn | `--cluos-bg-muted` `#EAEAEA` | `#BD7845` 2.94 fail | `#8A5A2B` 4.88 |
| warn | `--cluos-status-warn-bg` `#F8EBDF` | `#BD7845` 3.02 fail | `#8A5A2B` 5.01 |
| error | `--cluos-bg` `#FFFFFF` | `#8A3A3A` 7.64 | `#8A3A3A` 7.64 |
| error | `--cluos-bg-subtle` `#FFFFFF` | `#8A3A3A` 7.64 | `#8A3A3A` 7.64 |
| error | `--cluos-bg-muted` `#EAEAEA` | `#8A3A3A` 6.35 | `#8A3A3A` 6.35 |
| error | `--cluos-status-error-bg` `#F5EAEA` | `#8A3A3A` 6.49 | `#8A3A3A` 6.49 |

## Canonical constants on deep navy

| Status | Surface | Before | After |
|---|---|---|---|
| success | `--cluos-deep-navy` `#010D28` | `#6F8F19` 5.16 | `#6F8F19` 5.16 |
| info | `--cluos-deep-navy` `#010D28` | `#3E6E82` 3.45 fail | `#6FA8C4` 7.41 |
| warn | `--cluos-deep-navy` `#010D28` | `#BD7845` 5.45 | `#BD7845` 5.45 |
| error | `--cluos-deep-navy` `#010D28` | `#8A3A3A` 2.52 fail | `#C46A6A` 5.16 |

## Dark register (`data-appearance="dark"`), text roles

| Role | Surface | Before | After |
|---|---|---|---|
| success | `--cluos-bg` `#010D28` | `#6F8F19` 5.16 | `#9CC24A` 9.39 |
| success | `--cluos-bg-subtle` `#081634` | `#6F8F19` 4.78 | `#9CC24A` 8.71 |
| success | `--cluos-bg-muted` `#132952` | `#6F8F19` 3.83 fail | `#9CC24A` 6.97 |
| info | `--cluos-bg` `#010D28` | `#3E6E82` 3.45 fail | `#6FA8C4` 7.41 |
| info | `--cluos-bg-subtle` `#081634` | `#3E6E82` 3.20 fail | `#6FA8C4` 6.87 |
| info | `--cluos-bg-muted` `#132952` | `#3E6E82` 2.56 fail | `#6FA8C4` 5.50 |
| warning | `--cluos-bg` `#010D28` | `#BD7845` 5.45 | `#D08A54` 6.83 |
| warning | `--cluos-bg-subtle` `#081634` | `#BD7845` 5.05 | `#D08A54` 6.34 |
| warning | `--cluos-bg-muted` `#132952` | `#BD7845` 4.05 fail | `#D08A54` 5.08 |
| danger | `--cluos-bg` `#010D28` | `#8A3A3A` 2.52 fail | `#C46A6A` 5.16 |
| danger | `--cluos-bg-subtle` `#081634` | `#8A3A3A` 2.34 fail | `#C46A6A` 4.78 |
| danger | `--cluos-bg-muted` `#132952` | `#8A3A3A` 1.87 fail | `#C46A6A` 3.83 fail (known limit) |

## Roles by style, worst surface

| Context | Role | Before | on | After | on |
|---|---|---|---|---|---|
| MMS | success | `#6F8F19` 3.11 fail | `#EAEAEA` | `#546D13` 4.88 | `#EAEAEA` |
| MMS | info | `#3E6E82` 4.65 | `#EAEAEA` | `#3E6E82` 4.65 | `#EAEAEA` |
| MMS | warning | `#BD7845` 2.94 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| MMS | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| MMS dark | success | `#6F8F19` 3.83 fail | `#132952` | `#9CC24A` 6.97 | `#132952` |
| MMS dark | info | `#3E6E82` 2.56 fail | `#132952` | `#6FA8C4` 5.50 | `#132952` |
| MMS dark | warning | `#BD7845` 4.05 fail | `#132952` | `#D08A54` 5.08 | `#132952` |
| MMS dark | danger | `#8A3A3A` 2.34 fail | `#081634` | `#C46A6A` 4.78 | `#081634` |
| A | success | `#008080` 3.97 fail | `#EAEAEA` | `#006666` 5.64 | `#EAEAEA` |
| A | info | `#3E6E82` 4.65 | `#EAEAEA` | `#3E6E82` 4.65 | `#EAEAEA` |
| A | warning | `#B06A34` 3.52 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| A | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| B | success | `#6F8F19` 3.11 fail | `#EAEAEA` | `#546D13` 4.88 | `#EAEAEA` |
| B | info | `#3E6E82` 4.65 | `#EAEAEA` | `#3E6E82` 4.65 | `#EAEAEA` |
| B | warning | `#BD7845` 2.94 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| B | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| C | success | `#3D7A46` 4.29 fail | `#EAEAEA` | `#2C5A34` 6.66 | `#EAEAEA` |
| C | info | `#3E6E82` 4.65 | `#EAEAEA` | `#3E6E82` 4.65 | `#EAEAEA` |
| C | warning | `#A96A2F` 3.64 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| C | danger | `#973B3B` 5.81 | `#EAEAEA` | `#973B3B` 5.81 | `#EAEAEA` |
| D | success | `#007070` 4.91 | `#EAEAEA` | `#007070` 4.91 | `#EAEAEA` |
| D | info | `#3E6E82` 4.65 | `#EAEAEA` | `#3E6E82` 4.65 | `#EAEAEA` |
| D | warning | `#A96A2F` 3.64 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| D | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| E | success | `#0E6E68` 5.06 | `#EAEAEA` | `#0E6E68` 5.06 | `#EAEAEA` |
| E | info | `#3E6E82` 4.65 | `#EAEAEA` | `#3E6E82` 4.65 | `#EAEAEA` |
| E | warning | `#A96A2F` 3.64 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| E | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| G | success | `#9CC24A` 6.97 | `#132952` | `#9CC24A` 6.97 | `#132952` |
| G | info | `#6FA8C4` 5.50 | `#132952` | `#6FA8C4` 5.50 | `#132952` |
| G | warning | `#D08A54` 5.08 | `#132952` | `#D08A54` 5.08 | `#132952` |
| G | danger | `#C46A6A` 4.50 | `#0B1B41` | `#C46A6A` 4.50 | `#0B1B41` |

## Roles by palette, worst surface over every style of the register

| Palette | Register | Role | Before | on | After | on |
|---|---|---|---|---|---|---|
| pal-tealcool | light | success | `#008080` 3.97 fail | `#EAEAEA` | `#006666` 5.64 | `#EAEAEA` |
| pal-tealcool | light | warning | `#B06A34` 3.52 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| pal-tealcool | light | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| pal-tealcool | dark | success | `#008080` 3.00 fail | `#132952` | `#3FB3B3` 5.67 | `#132952` |
| pal-tealcool | dark | warning | `#B06A34` 3.38 fail | `#132952` | `#D89A5D` 5.93 | `#132952` |
| pal-tealcool | dark | danger | `#8A3A3A` 2.20 fail | `#0B1B41` | `#C46A6A` 4.50 | `#0B1B41` |
| pal-tealink | light | success | `#00696B` 5.40 | `#EAEAEA` | `#00696B` 5.40 | `#EAEAEA` |
| pal-tealink | light | warning | `#B06A34` 3.52 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| pal-tealink | light | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| pal-tealink | dark | success | `#00696B` 2.20 fail | `#132952` | `#3FB3B3` 5.67 | `#132952` |
| pal-tealink | dark | warning | `#B06A34` 3.38 fail | `#132952` | `#D89A5D` 5.93 | `#132952` |
| pal-tealink | dark | danger | `#8A3A3A` 2.20 fail | `#0B1B41` | `#C46A6A` 4.50 | `#0B1B41` |
| pal-forest | light | success | `#3D7A46` 4.29 fail | `#EAEAEA` | `#2C5A34` 6.66 | `#EAEAEA` |
| pal-forest | light | warning | `#B5773A` 3.08 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| pal-forest | light | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| pal-forest | dark | success | `#3D7A46` 2.78 fail | `#132952` | `#6FBE72` 6.33 | `#132952` |
| pal-forest | dark | warning | `#B5773A` 3.86 fail | `#132952` | `#D89A5D` 5.93 | `#132952` |
| pal-forest | dark | danger | `#8A3A3A` 2.20 fail | `#0B1B41` | `#C46A6A` 4.50 | `#0B1B41` |
| pal-copper | light | success | `#0E6E68` 5.06 | `#EAEAEA` | `#0E6E68` 5.06 | `#EAEAEA` |
| pal-copper | light | warning | `#BD7845` 2.94 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| pal-copper | light | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| pal-copper | dark | success | `#0E6E68` 2.35 fail | `#132952` | `#34A79E` 4.89 | `#132952` |
| pal-copper | dark | warning | `#BD7845` 4.05 fail | `#132952` | `#E0A46B` 6.61 | `#132952` |
| pal-copper | dark | danger | `#8A3A3A` 2.20 fail | `#0B1B41` | `#C46A6A` 4.50 | `#0B1B41` |
| pal-cold | light | success | `#2D6CDF` 4.04 fail | `#EAEAEA` | `#1F4FAE` 6.26 | `#EAEAEA` |
| pal-cold | light | warning | `#B5773A` 3.08 fail | `#EAEAEA` | `#8A5A2B` 4.88 | `#EAEAEA` |
| pal-cold | light | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| pal-cold | dark | success | `#2D6CDF` 2.95 fail | `#132952` | `#6E9DF2` 5.30 | `#132952` |
| pal-cold | dark | warning | `#B5773A` 3.86 fail | `#132952` | `#D89A5D` 5.93 | `#132952` |
| pal-cold | dark | danger | `#8A3A3A` 2.20 fail | `#0B1B41` | `#C46A6A` 4.50 | `#0B1B41` |
| pal-terracotta | light | success | `#4A7A5E` 4.12 fail | `#EAEAEA` | `#416C53` 4.99 | `#EAEAEA` |
| pal-terracotta | light | warning | `#B5623A` 3.66 fail | `#EAEAEA` | `#8F4B2B` 5.44 | `#EAEAEA` |
| pal-terracotta | light | danger | `#8A3A3A` 6.35 | `#EAEAEA` | `#8A3A3A` 6.35 | `#EAEAEA` |
| pal-terracotta | dark | success | `#4A7A5E` 2.89 fail | `#132952` | `#6FBE72` 6.33 | `#132952` |
| pal-terracotta | dark | warning | `#B5623A` 3.25 fail | `#132952` | `#E08F63` 5.64 | `#132952` |
| pal-terracotta | dark | danger | `#8A3A3A` 2.20 fail | `#0B1B41` | `#C46A6A` 4.50 | `#0B1B41` |

## Totals

- Pairs measured: 3168 in 56 contexts.
- Below 4.5:1 before: 1371 of 3154.
- Below 4.5:1 after: 0 of 3154.
- Known limit (error text on the dark `--cluos-bg-muted` `#132952`): 14 pairs, 3.83 to 3.83; before 1.87.
