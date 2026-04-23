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
          navy:       "#1A252D",
          teal:       "#2E8A82",
          "teal-deep":"#1F6F6A",
          "teal-soft":"#5A9F98",
          champagne:  "#B2B0A0",
          sage:       "#6A9888",
          pearl:      "#C6CDBC",

          bg:           "#FFFFFF",
          "bg-subtle":  "#FAFAF8",
          "bg-muted":   "#F3F4F1",
          border:       "#E7E8E3",
          "border-strong": "#CFD1CA",

          text:          "#1A252D",
          "text-muted":  "#5A6570",
          "text-subtle": "#8A939B",

          success:    "#2E8A82",
          "success-bg":"#E8F2F0",
          info:       "#3E6E82",
          "info-bg":  "#EDF1F4",
          warn:       "#BD7845",
          "warn-bg":  "#F8EBDF",
          error:      "#8A3A3A",
          "error-bg": "#F5EAEA",
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
        "cluos-xs": "0 1px 2px rgba(26, 37, 45, 0.04)",
        "cluos-sm": "0 1px 3px rgba(26, 37, 45, 0.06), 0 1px 2px rgba(26, 37, 45, 0.04)",
        "cluos-md": "0 4px 12px rgba(26, 37, 45, 0.07), 0 2px 4px rgba(26, 37, 45, 0.04)",
        "cluos-lg": "0 12px 32px rgba(26, 37, 45, 0.10), 0 4px 8px rgba(26, 37, 45, 0.04)",
        "cluos-focus": "0 0 0 3px rgba(46, 138, 130, 0.30)",
      },
      backgroundImage: {
        "cluos-gradient-primary":
          "linear-gradient(135deg, #1A252D 0%, #2E8A82 55%, #B2B0A0 100%)",
        "cluos-gradient-soft":
          "linear-gradient(135deg, #1A252D 0%, #6A9888 100%)",
        "cluos-brand-hero":
          "radial-gradient(ellipse at 85% 25%, #C6CDBC 0%, #6A9888 30%, #2E8A82 70%, #1F6F6A 100%)",
      },
    },
  },
};