/**
 * Cluos Design System — TypeScript tokens
 * Single source of truth. Use in CSS-in-JS projects.
 * Core color values are the official Cluos brand palette.
 */
export const tokens = {
  color: {
    teal:       "#008080",
    navy:       "#1B2F36",
    black:      "#1D1D1B",
    champagne:  "#C8C1AE",
    silver:     "#B5B4B5",
    white:      "#FFFFFF",

    tealDeep:  "#006666",
    tealSoft:  "#4DA3A3",

    bg:           "#FFFFFF",
    bgSubtle:     "#FAFAF8",
    bgMuted:      "#F3F4F1",
    border:       "#E7E8E3",
    borderStrong: "#CFD1CA",

    text:         "#1B2F36",
    textMuted:    "#5A6570",
    textSubtle:   "#8A939B",
    textOnTeal:   "#FFFFFF",
    textOnNavy:   "#FAFAF8",
  },
  status: {
    success:    "#008080",
    successBg:  "#E6F2F2",
    info:       "#3E6E82",
    infoBg:     "#EDF1F4",
    warn:       "#BD7845",
    warnBg:     "#F8EBDF",
    error:      "#8A3A3A",
    errorBg:    "#F5EAEA",
  },
  gradient: {
    primary:
      "linear-gradient(135deg, #1D1D1B 0%, #1B2F36 18%, #C8C1AE 67%, #B5B4B5 100%)",
    soft:
      "linear-gradient(135deg, #1B2F36 0%, #C8C1AE 100%)",
    mono:
      "linear-gradient(135deg, #1B2F36 0%, #B5B4B5 100%)",
    brandHero:
      "radial-gradient(ellipse at 85% 25%, #C8C1AE 0%, #008080 55%, #006666 100%)",
  },
  font: {
    sans: '"Inter", "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "SF Mono", Menlo, Consolas, monospace',
  },
  fontSize: {
    xs:    "0.75rem",
    sm:    "0.875rem",
    base:  "1rem",
    lg:    "1.125rem",
    xl:    "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  lineHeight: {
    tight:   1.2,
    snug:    1.4,
    normal:  1.6,
    relaxed: 1.75,
  },
  space: {
    1:  "0.25rem",
    2:  "0.5rem",
    3:  "0.75rem",
    4:  "1rem",
    6:  "1.5rem",
    8:  "2rem",
    12: "3rem",
    16: "4rem",
    24: "6rem",
  },
  container: {
    prose:   "42rem",
    docs:    "48rem",
    product: "72rem",
    wide:    "80rem",
  },
  radius: {
    sm:    "6px",
    md:    "8px",
    lg:    "12px",
    xl:    "16px",
    "2xl": "24px",
  },
  shadow: {
    xs: "0 1px 2px rgba(27, 47, 54, 0.04)",
    sm: "0 1px 3px rgba(27, 47, 54, 0.06), 0 1px 2px rgba(27, 47, 54, 0.04)",
    md: "0 4px 12px rgba(27, 47, 54, 0.06), 0 2px 4px rgba(27, 47, 54, 0.04)",
    lg: "0 12px 32px rgba(27, 47, 54, 0.08), 0 4px 8px rgba(27, 47, 54, 0.04)",
    ringFocus: "0 0 0 3px rgba(0, 128, 128, 0.30)",
  },
  motion: {
    easeOut:   "cubic-bezier(0.2, 0.8, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    durFast:   "120ms",
    durBase:   "200ms",
    durSlow:   "400ms",
  },
} as const;

export type CluosTokens = typeof tokens;
export default tokens;