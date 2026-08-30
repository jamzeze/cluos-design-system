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
          teal:       "var(--cluos-teal)",
          "teal-deep":"var(--cluos-teal-deep)",
          "teal-soft":"var(--cluos-teal-soft)",
          navy:       "var(--cluos-navy)",
          black:      "var(--cluos-black)",
          champagne:  "var(--cluos-champagne)",
          silver:     "var(--cluos-silver)",
          white:      "var(--cluos-white)",

          "deep-navy":      "var(--cluos-deep-navy)",
          "medium-blue":    "var(--cluos-medium-blue)",
          "tech-green":     "var(--cluos-tech-green)",
          "operational-teal":"var(--cluos-operational-teal)",
          copper:            "var(--cluos-copper)",
          oxblood:           "var(--cluos-oxblood)",
          "neutral-100":     "var(--cluos-neutral-100)",
          "neutral-500":     "var(--cluos-neutral-500)",
          "signal-deep":     "var(--cluos-signal-deep)",
          bg:              "var(--cluos-bg)",
          "bg-subtle":     "var(--cluos-bg-subtle)",
          "bg-muted":      "var(--cluos-bg-muted)",
          border:          "var(--cluos-border)",
          "border-strong": "var(--cluos-border-strong)",

          text:          "var(--cluos-text)",
          "text-muted":  "var(--cluos-text-muted)",
          "text-subtle": "var(--cluos-text-subtle)",

          success:      "var(--cluos-status-success)",
          "success-bg": "var(--cluos-status-success-bg)",
          info:       "var(--cluos-status-info)",
          "info-bg":    "var(--cluos-status-info-bg)",
          warn:       "var(--cluos-status-warn)",
          "warn-bg":    "var(--cluos-status-warn-bg)",
          error:      "var(--cluos-status-error)",
          "error-bg":   "var(--cluos-status-error-bg)",
        },
        /**
         * Semantic role colors (v2) — resolve live against whichever
         * [data-cluos-style]/[data-cluos-palette] is active on the page.
         * Prefer these over the raw `cluos-*` scale above for new work; see
         * ../agent-skills/shared/design-archetypes.yaml and
         * ../docs/cluos-design-system-v2/06-design-foundations.md.
         *
         *   className="bg-cluosc-canvas text-cluosc-fg-primary"
         */
        cluosc: {
          canvas:            "var(--cluos-color-bg-canvas)",
          surface:           "var(--cluos-color-bg-surface)",
          elevated:          "var(--cluos-color-bg-elevated)",
          subtle:            "var(--cluos-color-bg-subtle)",
          "fg-primary":      "var(--cluos-color-fg-primary)",
          "fg-secondary":    "var(--cluos-color-fg-secondary)",
          "fg-muted":        "var(--cluos-color-fg-muted)",
          border:            "var(--cluos-color-border-default)",
          "border-strong":   "var(--cluos-color-border-strong)",
          action:            "var(--cluos-color-action-primary)",
          "action-hover":    "var(--cluos-color-action-primary-hover)",
          success:           "var(--cluos-color-status-success)",
          warning:           "var(--cluos-color-status-warning)",
          danger:            "var(--cluos-color-status-danger)",
          info:              "var(--cluos-color-status-info)",
          signal:            "var(--cluos-color-signal)",
        },
      },
      fontFamily: {
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        data: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        "cluos-sm":  "0",
        "cluos-md":  "0",
        "cluos-lg":  "0",
        "cluos-xl":  "0",
        "cluos-2xl": "0",
        "cluos-full": "999px",
      },
      boxShadow: {
        "cluos-xs":    "none",
        "cluos-sm":    "none",
        "cluos-md":    "none",
        "cluos-lg":    "none",
        "cluos-focus": "var(--cluos-ring-focus)",
      },
      backgroundImage: {
        "cluos-gradient-primary":
          "linear-gradient(135deg, var(--cluos-deep-navy) 0%, var(--cluos-medium-blue) 42%, var(--cluos-operational-teal) 72%, var(--cluos-tech-green) 100%)",
        "cluos-gradient-soft":
          "linear-gradient(135deg, var(--cluos-deep-navy) 0%, var(--cluos-medium-blue) 66%, var(--cluos-operational-teal) 100%)",
        "cluos-gradient-mono":
          "linear-gradient(135deg, var(--cluos-deep-navy) 0%, var(--cluos-medium-blue) 100%)",
        "cluos-brand-hero":
          "var(--cluos-bg-brand-hero)",
      },
      transitionDuration: {
        "cluos-fast": "var(--cluos-dur-fast)",
        "cluos-base": "var(--cluos-dur-base)",
        "cluos-enter": "var(--cluos-motion-enter)",
        "cluos-data": "var(--cluos-motion-data)",
        "cluos-trail": "var(--cluos-motion-trail)",
        "cluos-stagger": "var(--cluos-motion-stagger)",
      },
    },
  },
};
