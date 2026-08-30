/**
 * Cluos Design System — TypeScript tokens
 * Single source of truth. Use in CSS-in-JS projects.
 * Canonical color values are the MMS Swiss Ledger CluOS palette.
 */
export const tokens = {
  color: {
    deepNavy:   "#010D28",
    mediumBlue: "#132952",
    techGreen:  "#C4DB7B",
    operationalTeal: "#16A39A",
    copper:     "#BD7845",
    oxblood:    "#8A3A3A",
    neutral100: "#EAEAEA",
    neutral500: "#A5A5A5",
    teal:       "#16A39A", // compatibility alias for operational teal
    navy:       "#010D28", // compatibility alias for deep navy
    black:      "#1D1D1B",
    champagne:  "#C8C1AE",
    silver:     "#B5B4B5",
    white:      "#FFFFFF",

    tealDeep:  "#08736E",
    tealSoft:  "#6FC7C0",

    bg:           "#FFFFFF",
    bgSubtle:     "#FFFFFF",
    bgMuted:      "#EAEAEA",
    border:       "#EAEAEA",
    borderStrong: "#132952",

    text:         "#010D28",
    textMuted:    "#132952",
    textSubtle:   "#A5A5A5",
    textOnTeal:   "#FFFFFF",
    textOnNavy:   "#FFFFFF",
  },
  status: {
    success:    "#6F8F19",
    successBg:  "#F1F6DF",
    info:       "#3E6E82",
    infoBg:     "#EDF1F4",
    warn:       "#BD7845",
    warnBg:     "#F8EBDF",
    error:      "#8A3A3A",
    errorBg:    "#F5EAEA",
  },
  gradient: {
    primary:
      "linear-gradient(135deg, #010D28 0%, #132952 42%, #16A39A 72%, #C4DB7B 100%)",
    soft:
      "linear-gradient(135deg, #010D28 0%, #132952 66%, #16A39A 100%)",
    mono:
      "linear-gradient(135deg, #010D28 0%, #132952 100%)",
    brandHero:
      "radial-gradient(circle at 72% 24%, rgba(196, 219, 123, 0.34), transparent 28rem), radial-gradient(circle at 30% 74%, rgba(22, 163, 154, 0.24), transparent 24rem), #010D28",
  },
  font: {
    display: '"Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    sans: '"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    data: '"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
    sm:    "0",
    md:    "0",
    lg:    "0",
    xl:    "0",
    "2xl": "0",
    full:  "999px",
  },
  shadow: {
    xs: "none",
    sm: "none",
    md: "none",
    lg: "none",
    ringFocus: "0 0 0 2px #C4DB7B",
  },
  motion: {
    easeOut:   "cubic-bezier(0.2, 0.8, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    durFast:   "180ms",
    durBase:   "280ms",
    durSlow:   "600ms",
    data:      "1200ms",
    trail:     "600ms",
    stagger:   "120ms",
  },
  action: {
    primary: {
      base:  "#C4DB7B",
      deep:  "#A6C05D",
      soft:  "rgba(196, 219, 123, 0.18)",
      text:  "#010D28",
    },
    teal: {
      base:  "#16A39A",
      deep:  "#08736E",
      soft:  "rgba(22, 163, 154, 0.12)",
      text:  "#FFFFFF",
    },
    copper: {
      base:  "#BD7845",
      deep:  "#965D34",
      soft:  "rgba(189, 120, 69, 0.12)",
      text:  "#FFFFFF",
    },
    champagne: {
      base:  "#C8C1AE",
      deep:  "#AFA58E",
      soft:  "rgba(200, 193, 174, 0.22)",
      text:  "#010D28",
    },
    oxblood: {
      base:  "#8A3A3A",
      deep:  "#662828",
      soft:  "rgba(138, 58, 58, 0.11)",
      text:  "#FFFFFF",
    },
  },
  appearance: {
    light: {
      bg:          "#FFFFFF",
      bgSubtle:    "#FFFFFF",
      bgMuted:     "#EAEAEA",
      border:      "#EAEAEA",
      borderStrong:"#132952",
      text:        "#010D28",
      textMuted:   "#132952",
      textSubtle:  "#A5A5A5",
    },
    dark: {
      bg:          "#010D28",
      bgSubtle:    "#081634",
      bgMuted:     "#132952",
      border:      "rgba(255, 255, 255, 0.15)",
      borderStrong:"rgba(255, 255, 255, 0.26)",
      text:        "#F7F8F5",
      textMuted:   "rgba(247, 248, 245, 0.72)",
      textSubtle:  "rgba(247, 248, 245, 0.54)",
    },
  },
} as const;

export type CluosTokens = typeof tokens;
export default tokens;

/**
 * Style + palette architecture. MMS is the canonical default; the other
 * style ids remain explicit legacy opt-outs for a controlled migration.
 */
export type CluosStyleId = "MMS" | "A" | "B" | "C" | "D" | "E" | "G";
export type CluosPaletteId =
  | "pal-tealcool"
  | "pal-tealink"
  | "pal-forest"
  | "pal-copper"
  | "pal-cold"
  | "pal-terracotta";

export interface CluosThemeRoles {
  bgCanvas: string;
  bgSurface: string;
  bgElevated: string;
  bgSubtle: string;
  fgPrimary: string;
  fgSecondary: string;
  fgMuted: string;
  borderDefault: string;
  borderStrong: string;
  actionPrimary: string;
  actionPrimaryHover: string;
  focusRing: string;
  statusSuccess: string;
  statusWarning: string;
  statusDanger: string;
  statusInfo: string;
  signal: string;
}

export const styles: Record<CluosStyleId, CluosThemeRoles> = {
  MMS: {
    bgCanvas: "#FFFFFF", bgSurface: "#FFFFFF", bgElevated: "#FFFFFF", bgSubtle: "#FFFFFF",
    fgPrimary: "#010D28", fgSecondary: "#132952", fgMuted: "#A5A5A5",
    borderDefault: "#EAEAEA", borderStrong: "#132952",
    actionPrimary: "#C4DB7B", actionPrimaryHover: "#A6C05D", focusRing: "rgba(196, 219, 123, 0.72)",
    statusSuccess: "#6F8F19", statusWarning: "#BD7845", statusDanger: "#8A3A3A", statusInfo: "#3E6E82",
    signal: "#C4DB7B",
  },
  A: {
    bgCanvas: "#FBFBF9", bgSurface: "#FFFFFF", bgElevated: "#FFFFFF", bgSubtle: "#F3F4F1",
    fgPrimary: "#1B2F36", fgSecondary: "#5A6570", fgMuted: "#8A939B",
    borderDefault: "#E6E7E1", borderStrong: "#D4D6CD",
    actionPrimary: "#008080", actionPrimaryHover: "#005959", focusRing: "rgba(0, 128, 128, 0.30)",
    statusSuccess: "#008080", statusWarning: "#B06A34", statusDanger: "#8A3A3A", statusInfo: "#3E6E82",
    signal: "#008080",
  },
  B: {
    bgCanvas: "#F5F7F4", bgSurface: "#FFFFFF", bgElevated: "#FFFFFF", bgSubtle: "#F5F7F4",
    fgPrimary: "#0B1730", fgSecondary: "#46536B", fgMuted: "#68748A",
    borderDefault: "#DCE2E3", borderStrong: "#C2CDD1",
    actionPrimary: "#0E8F87", actionPrimaryHover: "#0A6B65", focusRing: "rgba(14, 143, 135, 0.20)",
    statusSuccess: "#6F8F19", statusWarning: "#BD7845", statusDanger: "#8A3A3A", statusInfo: "#3E6E82",
    signal: "#C4DB7B",
  },
  C: {
    bgCanvas: "#FAFAF7", bgSurface: "#FFFFFF", bgElevated: "#FFFFFF", bgSubtle: "#FAFAF7",
    fgPrimary: "#16181D", fgSecondary: "#565A61", fgMuted: "#84888E",
    borderDefault: "#E4E3DD", borderStrong: "#CBCAC2",
    actionPrimary: "#2B49C7", actionPrimaryHover: "#1D339B", focusRing: "rgba(43, 73, 199, 0.24)",
    statusSuccess: "#3D7A46", statusWarning: "#A96A2F", statusDanger: "#973B3B", statusInfo: "#3E6E82",
    signal: "#2B49C7",
  },
  D: {
    bgCanvas: "#FFFFFF", bgSurface: "#FFFFFF", bgElevated: "#FFFFFF", bgSubtle: "#FFFFFF",
    fgPrimary: "#111417", fgSecondary: "#5B6166", fgMuted: "#8B9095",
    borderDefault: "#E3E4E1", borderStrong: "#111417",
    actionPrimary: "#007070", actionPrimaryHover: "#005050", focusRing: "rgba(0, 112, 112, 0.22)",
    statusSuccess: "#007070", statusWarning: "#A96A2F", statusDanger: "#8A3A3A", statusInfo: "#3E6E82",
    signal: "#007070",
  },
  E: {
    bgCanvas: "#F6F3EE", bgSurface: "#FFFFFF", bgElevated: "#FFFFFF", bgSubtle: "#F6F3EE",
    fgPrimary: "#24403C", fgSecondary: "#63705F", fgMuted: "#8E9788",
    borderDefault: "#E7DFD2", borderStrong: "#D6CCBA",
    actionPrimary: "#0E6E68", actionPrimaryHover: "#0A524E", focusRing: "rgba(14, 110, 104, 0.18)",
    statusSuccess: "#0E6E68", statusWarning: "#A96A2F", statusDanger: "#8A3A3A", statusInfo: "#3E6E82",
    signal: "#0E6E68",
  },
  G: {
    bgCanvas: "#010D28", bgSurface: "#0B1B41", bgElevated: "#0B1B41", bgSubtle: "#01081A",
    fgPrimary: "#E8ECF4", fgSecondary: "#9AA7C0", fgMuted: "#66738F",
    borderDefault: "rgba(199, 213, 235, 0.14)", borderStrong: "rgba(199, 213, 235, 0.26)",
    actionPrimary: "#1FB5AB", actionPrimaryHover: "#17958D", focusRing: "rgba(31, 181, 171, 0.30)",
    statusSuccess: "#9CC24A", statusWarning: "#D08A54", statusDanger: "#C46A6A", statusInfo: "#6FA8C4",
    signal: "#C4DB7B",
  },
};

type CluosPaletteRoles = Pick<
  CluosThemeRoles,
  "actionPrimary" | "actionPrimaryHover" | "statusSuccess" | "statusWarning" | "statusDanger" | "signal"
>;

export const palettes: Record<CluosPaletteId, CluosPaletteRoles> = {
  "pal-tealcool":   { actionPrimary: "#008080", actionPrimaryHover: "#005959", statusSuccess: "#008080", statusWarning: "#B06A34", statusDanger: "#8A3A3A", signal: "#008080" },
  "pal-tealink":    { actionPrimary: "#00696B", actionPrimaryHover: "#004F50", statusSuccess: "#00696B", statusWarning: "#B06A34", statusDanger: "#8A3A3A", signal: "#00696B" },
  "pal-forest":     { actionPrimary: "#3D7A46", actionPrimaryHover: "#2C5A34", statusSuccess: "#3D7A46", statusWarning: "#B5773A", statusDanger: "#8A3A3A", signal: "#D9C27A" },
  "pal-copper":     { actionPrimary: "#0E6E68", actionPrimaryHover: "#0A524E", statusSuccess: "#0E6E68", statusWarning: "#BD7845", statusDanger: "#8A3A3A", signal: "#BD7845" },
  "pal-cold":       { actionPrimary: "#2D6CDF", actionPrimaryHover: "#1F4FAE", statusSuccess: "#2D6CDF", statusWarning: "#B5773A", statusDanger: "#8A3A3A", signal: "#9FB3C8" },
  "pal-terracotta": { actionPrimary: "#B5623A", actionPrimaryHover: "#8F4B2B", statusSuccess: "#4A7A5E", statusWarning: "#B5623A", statusDanger: "#8A3A3A", signal: "#E3A26B" },
};

export const palettesDark: Record<CluosPaletteId, CluosPaletteRoles> = {
  "pal-tealcool":   { actionPrimary: "#3FB3B3", actionPrimaryHover: "#2D8F8F", statusSuccess: "#3FB3B3", statusWarning: "#D89A5D", statusDanger: "#C46A6A", signal: "#3FB3B3" },
  "pal-tealink":    { actionPrimary: "#3FB3B3", actionPrimaryHover: "#2D8F8F", statusSuccess: "#3FB3B3", statusWarning: "#D89A5D", statusDanger: "#C46A6A", signal: "#3FB3B3" },
  "pal-forest":     { actionPrimary: "#6FBE72", actionPrimaryHover: "#519A54", statusSuccess: "#6FBE72", statusWarning: "#D89A5D", statusDanger: "#C46A6A", signal: "#E8D28F" },
  "pal-copper":     { actionPrimary: "#34A79E", actionPrimaryHover: "#268079", statusSuccess: "#34A79E", statusWarning: "#E0A46B", statusDanger: "#C46A6A", signal: "#E0A46B" },
  "pal-cold":       { actionPrimary: "#6E9DF2", actionPrimaryHover: "#4E7DD1", statusSuccess: "#6E9DF2", statusWarning: "#D89A5D", statusDanger: "#C46A6A", signal: "#C3D2E0" },
  "pal-terracotta": { actionPrimary: "#E08F63", actionPrimaryHover: "#C06F45", statusSuccess: "#6FBE72", statusWarning: "#E08F63", statusDanger: "#C46A6A", signal: "#F0C093" },
};

/** Mirrors the CSS cascade in tokens.css exactly. */
export function resolveTheme(styleId: CluosStyleId, paletteId?: CluosPaletteId): CluosThemeRoles {
  const base = styles[styleId] ?? styles.MMS;
  if (!paletteId) return { ...base };
  const table = styleId === "G" ? palettesDark : palettes;
  const override = table[paletteId];
  return override ? { ...base, ...override } : { ...base };
}
