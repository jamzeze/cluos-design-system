# Next.js + Tailwind — CluOS UI Example

> Uses `@cluos/design-system/tailwind-preset` and `@cluos/design-system/tokens.css`.

## Setup

```bash
npm install github:jamzeze/cluos-design-system
```

```js
// tailwind.config.js
module.exports = {
  presets: [require("@cluos/design-system/tailwind-preset")],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};
```

```css
/* globals.css */
@import "@cluos/design-system/tokens.css";
```

## PageHeader component

```tsx
// components/PageHeader.tsx
interface PageHeaderProps {
  title: string;
  description?: string;
  status?: { label: string; variant: "success" | "warning" | "danger" | "info" };
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export function PageHeader({ title, description, status, primaryAction, secondaryAction }: PageHeaderProps) {
  const statusColors = {
    success: "bg-cluos-success-bg text-cluos-success-text border border-cluos-success",
    warning: "bg-cluos-warning-bg text-cluos-warning-text border border-cluos-warning",
    danger: "bg-cluos-danger-bg text-cluos-danger-text border border-cluos-danger",
    info: "bg-cluos-info-bg text-cluos-info-text border border-cluos-info",
  };

  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-semibold text-cluos-fg tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-base text-cluos-text-muted">{description}</p>
        )}
        {status && (
          <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${statusColors[status.variant]}`}>
            {status.label}
          </span>
        )}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-2 flex-shrink-0">
          {secondaryAction}
          {primaryAction}
        </div>
      )}
    </div>
  );
}
```

## Usage

```tsx
// app/content/page.tsx
import { PageHeader } from "@/components/PageHeader";

export default function ContentPage() {
  return (
    <main className="max-w-cluos-product mx-auto px-8 py-8">
      <PageHeader
        title="Conteúdos gerados"
        description="3 conteúdos aguardando revisão"
        status={{ label: "3 pendentes", variant: "warning" }}
        primaryAction={
          <button className="btn-primary">Revisar agora</button>
        }
        secondaryAction={
          <button className="btn-secondary">Gerar conteúdo</button>
        }
      />
      {/* page content */}
    </main>
  );
}
```

## Button classes (from Tailwind preset)

```tsx
// Primary — one per region
<button className="bg-cluos-action text-cluos-action-fg px-4 py-2.5 rounded-cluos-md text-sm font-medium hover:bg-cluos-action-hover transition-colors duration-cluos-fast focus-visible:outline-none focus-visible:shadow-cluos-ring">
  Publicar conteúdo
</button>

// Secondary
<button className="bg-transparent text-cluos-fg border border-cluos-line-strong px-4 py-2.5 rounded-cluos-md text-sm font-medium hover:border-cluos-fg hover:bg-cluos-bg-subtle transition-colors duration-cluos-fast">
  Agendar
</button>

// Ghost
<button className="bg-transparent text-cluos-fg-2 underline px-3 py-2 rounded-cluos-sm text-sm font-medium hover:bg-cluos-action-soft transition-colors duration-cluos-fast">
  Ver detalhes
</button>
```
