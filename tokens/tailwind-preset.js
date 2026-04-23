/**
 * Cluos Design System — Tailwind CSS preset
 *
 * Usage in a consuming project's tailwind.config.js:
 *
 *   module.exports = {
 *     presets: [require('@cluos/design-system/tailwind-preset')],
 *     content: ['./src/**\/*.{js,ts,jsx,tsx,html}'],
 *   };
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        cluos: {
          teal:       "#008080",
          "teal-deep":"#006666",
          "teal-soft":"#4DA3A3",
          navy:       "#1B2F36",
          black:      "#1D1D1B",
          champagne:  "#C8C1AE",
          silver:     "#B5B4B5",
          white:      "#FFFFFF",

          bg:              "#FFFFFF",
          "bg-subtle":     "#FAFAF8",
          "bg-muted":      "#F3F4F1",
          border:          "#E7E8E3",
          "border-strong": "#CFD1CA",

          text:          "#1B2F36",
          "text-muted":  "#5A6570",
          "text-subtle": "#8A939B",

          success:      "#008080",
          "success-bg": "#E6F2F2",
          info:       "#3E6E82",
          "info-bg":    "#EDF1F4",
          warn:       "#BD7845",
          "warn-bg":    "#F8EBDF",
          error:      "#8A3A3A",
          "error-bg":   "#F5EAEA",
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        "cluos-sm":  "6px",
        "cluos-md":  "8px",
        "cluos-lg":  "12px",
        "cluos-xl":  "16px",
        "cluos-2xl": "24px",
      },
      boxShadow: {
        "cluos-xs":    "0 1px 2px rgba(27, 47, 54, 0.04)",
        "cluos-sm":    "0 1px 3px rgba(27, 47, 54, 0.06), 0 1px 2px rgba(27, 47, 54, 0.04)",
        "cluos-md":    "0 4px 12px rgba(27, 47, 54, 0.06), 0 2px 4px rgba(27, 47, 54, 0.04)",
        "cluos-lg":    "0 12px 32px rgba(27, 47, 54, 0.08), 0 4px 8px rgba(27, 47, 54, 0.04)",
        "cluos-focus": "0 0 0 3px rgba(0, 128, 128, 0.30)",
      },
      backgroundImage: {
        "cluos-gradient-primary":
          "linear-gradient(135deg, #1D1D1B 0%, #1B2F36 18%, #C8C1AE 67%, #B5B4B5 100%)",
        "cluos-gradient-soft":
          "linear-gradient(135deg, #1B2F36 0%, #C8C1AE 100%)",
        "cluos-gradient-mono":
          "linear-gradient(135deg, #1B2F36 0%, #B5B4B5 100%)",
        "cluos-brand-hero":
          "radial-gradient(ellipse at 85% 25%, #C8C1AE 0%, #008080 55%, #006666 100%)",
      },
    },
  },
};