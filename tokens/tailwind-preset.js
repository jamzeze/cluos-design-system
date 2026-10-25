/**
 * cluos-v2 — preset Tailwind v3. Gerado por scripts/build-tokens.py a partir de tokens/cluos-v2.yaml. Não edite à mão.
 *
 *   module.exports = { presets: [require("@cluos/design-system/tailwind-preset")] };
 *
 * Importe também @cluos/design-system/tokens.css (as cores são var()).
 * Classes: bg-cluos-bg, text-cluos-fg, bg-cluos-action, text-cluos-success-text,
 * bg-cluos-hue-05-fill, rounded-cluos-sm, max-w-cluos-product, font-display.
 */
module.exports = {
  theme: {
    extend: {
      "colors": {
        "cluos": {
          "deep-navy": "var(--cluos-deep-navy)",
          "medium-blue": "var(--cluos-medium-blue)",
          "tech-green": "var(--cluos-tech-green)",
          "white": "var(--cluos-white)",
          "neutral-100": "var(--cluos-neutral-100)",
          "neutral-500": "var(--cluos-neutral-500)",
          "off-white": "var(--cluos-off-white)",
          "neutral-50": "var(--cluos-neutral-50)",
          "neutral-200": "var(--cluos-neutral-200)",
          "neutral-300": "var(--cluos-neutral-300)",
          "neutral-400": "var(--cluos-neutral-400)",
          "neutral-600": "var(--cluos-neutral-600)",
          "neutral-700": "var(--cluos-neutral-700)",
          "neutral-800": "var(--cluos-neutral-800)",
          "bg": "var(--cluos-bg)",
          "bg-subtle": "var(--cluos-bg-subtle)",
          "bg-muted": "var(--cluos-bg-muted)",
          "surface": "var(--cluos-surface)",
          "fg": "var(--cluos-fg)",
          "fg-2": "var(--cluos-fg-2)",
          "fg-3": "var(--cluos-fg-3)",
          "fg-disabled": "var(--cluos-fg-disabled)",
          "fg-on-navy": "var(--cluos-fg-on-navy)",
          "line": "var(--cluos-line)",
          "line-2": "var(--cluos-line-2)",
          "line-strong": "var(--cluos-line-strong)",
          "action": "var(--cluos-action)",
          "action-hover": "var(--cluos-action-hover)",
          "action-fg": "var(--cluos-action-fg)",
          "action-soft": "var(--cluos-action-soft)",
          "progress": "var(--cluos-progress)",
          "success": "var(--cluos-status-success)",
          "success-bg": "var(--cluos-status-success-bg)",
          "success-text": "var(--cluos-status-success-text)",
          "warning": "var(--cluos-status-warning)",
          "warning-bg": "var(--cluos-status-warning-bg)",
          "warning-text": "var(--cluos-status-warning-text)",
          "danger": "var(--cluos-status-danger)",
          "danger-bg": "var(--cluos-status-danger-bg)",
          "danger-text": "var(--cluos-status-danger-text)",
          "info": "var(--cluos-status-info)",
          "info-bg": "var(--cluos-status-info-bg)",
          "info-text": "var(--cluos-status-info-text)",
          "hue-01-fill": "var(--cluos-hue-01-fill)",
          "hue-01-line": "var(--cluos-hue-01-line)",
          "hue-01-text": "var(--cluos-hue-01-text)",
          "hue-02-fill": "var(--cluos-hue-02-fill)",
          "hue-02-line": "var(--cluos-hue-02-line)",
          "hue-02-text": "var(--cluos-hue-02-text)",
          "hue-03-fill": "var(--cluos-hue-03-fill)",
          "hue-03-line": "var(--cluos-hue-03-line)",
          "hue-03-text": "var(--cluos-hue-03-text)",
          "hue-04-fill": "var(--cluos-hue-04-fill)",
          "hue-04-line": "var(--cluos-hue-04-line)",
          "hue-04-text": "var(--cluos-hue-04-text)",
          "hue-05-fill": "var(--cluos-hue-05-fill)",
          "hue-05-line": "var(--cluos-hue-05-line)",
          "hue-05-text": "var(--cluos-hue-05-text)",
          "hue-06-fill": "var(--cluos-hue-06-fill)",
          "hue-06-line": "var(--cluos-hue-06-line)",
          "hue-06-text": "var(--cluos-hue-06-text)",
          "hue-07-fill": "var(--cluos-hue-07-fill)",
          "hue-07-line": "var(--cluos-hue-07-line)",
          "hue-07-text": "var(--cluos-hue-07-text)",
          "hue-08-fill": "var(--cluos-hue-08-fill)",
          "hue-08-line": "var(--cluos-hue-08-line)",
          "hue-08-text": "var(--cluos-hue-08-text)",
          "hue-09-fill": "var(--cluos-hue-09-fill)",
          "hue-09-line": "var(--cluos-hue-09-line)",
          "hue-09-text": "var(--cluos-hue-09-text)",
          "hue-10-fill": "var(--cluos-hue-10-fill)",
          "hue-10-line": "var(--cluos-hue-10-line)",
          "hue-10-text": "var(--cluos-hue-10-text)",
          "hue-11-fill": "var(--cluos-hue-11-fill)",
          "hue-11-line": "var(--cluos-hue-11-line)",
          "hue-11-text": "var(--cluos-hue-11-text)",
          "hue-12-fill": "var(--cluos-hue-12-fill)",
          "hue-12-line": "var(--cluos-hue-12-line)",
          "hue-12-text": "var(--cluos-hue-12-text)",
          "chart-1": "var(--cluos-chart-1)",
          "chart-2": "var(--cluos-chart-2)",
          "chart-3": "var(--cluos-chart-3)",
          "chart-4": "var(--cluos-chart-4)",
          "chart-5": "var(--cluos-chart-5)",
          "chart-6": "var(--cluos-chart-6)",
          "chart-7": "var(--cluos-chart-7)",
          "chart-8": "var(--cluos-chart-8)",
          "text": "var(--cluos-text)",
          "text-muted": "var(--cluos-text-muted)",
          "text-subtle": "var(--cluos-text-subtle)",
          "text-disabled": "var(--cluos-text-disabled)",
          "border": "var(--cluos-border)",
          "border-strong": "var(--cluos-border-strong)",
          "action-primary": "var(--cluos-action-primary)",
          "action-deep": "var(--cluos-action-deep)",
          "action-text": "var(--cluos-action-text)",
          "warn": "var(--cluos-status-warning)",
          "error": "var(--cluos-status-danger)"
        }
      },
      "fontFamily": {
        "display": [
          "var(--cluos-font-display)"
        ],
        "sans": [
          "var(--cluos-font-sans)"
        ],
        "data": [
          "var(--cluos-font-sans)"
        ],
        "mono": [
          "var(--cluos-font-mono)"
        ],
        "accent": [
          "var(--cluos-font-accent)"
        ]
      },
      "fontWeight": {
        "cluos-display": "300",
        "cluos-heading": "400",
        "cluos-body": "400",
        "cluos-label": "550",
        "cluos-strong": "650",
        "cluos-max-product": "650"
      },
      "borderRadius": {
        "cluos-sm": "var(--cluos-radius-sm)",
        "cluos-md": "var(--cluos-radius-md)",
        "cluos-pill": "var(--cluos-radius-pill)",
        "cluos-lg": "var(--cluos-radius-md)",
        "cluos-full": "var(--cluos-radius-pill)"
      },
      "maxWidth": {
        "cluos-prose": "var(--cluos-container-prose)",
        "cluos-docs": "var(--cluos-container-docs)",
        "cluos-product": "var(--cluos-container-product)",
        "cluos-wide": "var(--cluos-container-wide)"
      },
      "transitionDuration": {
        "cluos-fast": "var(--cluos-motion-fast)",
        "cluos-base": "var(--cluos-motion-base)",
        "cluos-slow": "var(--cluos-motion-slow)",
        "cluos-hover": "var(--cluos-motion-hover)",
        "cluos-press": "var(--cluos-motion-press)",
        "cluos-enter": "var(--cluos-motion-enter)",
        "cluos-trail": "var(--cluos-motion-trail)",
        "cluos-data": "var(--cluos-motion-data)",
        "cluos-stagger": "var(--cluos-motion-stagger)"
      },
      "transitionTimingFunction": {
        "cluos-out": "var(--cluos-ease-out)",
        "cluos-standard": "var(--cluos-ease-in-out)"
      },
      "boxShadow": {
        "cluos-ring": "var(--cluos-ring-focus)"
      }
    }
  },
};
