# Examples — Apple-Inspired Product UI

This folder contains implementation examples for building CluOS product interfaces that follow the Apple-inspired UX principles defined in [`APPLE-INSPIRED-PRODUCT-UX.md`](../../APPLE-INSPIRED-PRODUCT-UX.md).

## Files

| File | Description |
|------|-------------|
| [next-tailwind.md](./next-tailwind.md) | Next.js + Tailwind preset setup, PageHeader, Button classes |
| [react-components.md](./react-components.md) | AppShell, TopNav, Toast, ConfirmDialog, InlineFeedback |
| [plain-html.md](./plain-html.md) | No-framework HTML + CSS using only `tokens.css` |
| [css-tokens.md](./css-tokens.md) | Full CSS component library using CSS custom properties |
| [hub-systems.md](./hub-systems.md) | Hub page with SystemCard grid (online/warn/offline states) |
| [upload-video-flow.md](./upload-video-flow.md) | Upload flow with idle → uploading → processing → done → error states |
| [settings-page.md](./settings-page.md) | Settings page with SettingsSection + progressive disclosure |
| [dashboard.md](./dashboard.md) | Minimal dashboard with MetricCard, PendingActionCallout, RecentList |
| [error-empty-loading.md](./error-empty-loading.md) | EmptyState, ErrorState, SkeletonList components |

## Rules

All examples in this folder must:

1. **Use official tokens only** — `var(--cluos-*)` or Tailwind classes from `@cluos/design-system/tailwind-preset`. No hardcoded hex values.
2. **Implement all dynamic states** — loading, empty, error, success at minimum.
3. **Define one primary action per region** — never two `btn-primary` in the same visual block.
4. **Use semantic HTML** — `main`, `header`, `nav`, `section`, proper `aria-*` attributes.
5. **Not include secrets or real credentials** — placeholders only.
6. **Be minimal** — illustrate the pattern, nothing more.

## Related documentation

- [`APPLE-INSPIRED-PRODUCT-UX.md`](../../APPLE-INSPIRED-PRODUCT-UX.md) — UX principles
- [`PRODUCT-PATTERNS.md`](../../PRODUCT-PATTERNS.md) — Full pattern specifications
- [`patterns/components.md`](../../patterns/components.md) — Component anatomy and tokens
- [`patterns/states.md`](../../patterns/states.md) — State specifications
- [`patterns/accessibility.md`](../../patterns/accessibility.md) — WCAG 2.1 AA requirements
