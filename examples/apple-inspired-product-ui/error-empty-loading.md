# Error, Empty & Loading States — CluOS Examples

> Every dynamic component must implement all three states.
> Reference: `patterns/states.md`.

## EmptyState component

```tsx
// components/EmptyState.tsx
interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {/* Cluos symbol placeholder — replace with actual SVG from brand-assets */}
      <div className="w-12 h-12 rounded-full bg-cluos-bg-muted flex items-center justify-center mb-4">
        <span className="text-cluos-text-subtle text-lg">◎</span>
      </div>
      <h3 className="text-lg font-semibold text-cluos-navy mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-cluos-text-muted max-w-xs mb-6">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 py-2.5 bg-cluos-teal text-white rounded-cluos-md text-sm font-medium hover:bg-cluos-teal-deep transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
```

## ErrorState component

```tsx
// components/ErrorState.tsx
interface ErrorStateProps {
  title: string;
  description?: string;
  onRetry?: () => void;
  technicalDetails?: string;
}

export function ErrorState({ title, description, onRetry, technicalDetails }: ErrorStateProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="rounded-cluos-lg border border-[var(--cluos-status-error-bg)] bg-[var(--cluos-status-error-bg)] p-5 max-w-lg">
      <h3 className="font-semibold text-cluos-navy mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-cluos-text-muted mb-4">{description}</p>
      )}
      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-cluos-teal text-white rounded-cluos-md text-sm font-medium hover:bg-cluos-teal-deep transition-colors"
          >
            Tentar novamente
          </button>
        )}
        {technicalDetails && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-cluos-text-subtle hover:text-cluos-text-muted transition-colors"
          >
            Detalhes técnicos {showDetails ? "↑" : "↓"}
          </button>
        )}
      </div>
      {showDetails && technicalDetails && (
        <pre className="mt-3 p-3 bg-cluos-bg-muted rounded-cluos-sm text-xs font-mono text-cluos-text-muted overflow-x-auto">
          {technicalDetails}
        </pre>
      )}
    </div>
  );
}
```

## SkeletonList component

```tsx
// components/SkeletonList.tsx
function SkeletonLine({ width = "100%", height = "1rem" }: { width?: string; height?: string }) {
  return (
    <div
      className="rounded bg-cluos-bg-muted animate-pulse"
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-cluos-border rounded-cluos-lg p-5 space-y-3">
      <SkeletonLine width="60%" height="1.125rem" />
      <SkeletonLine width="90%" height="0.875rem" />
      <SkeletonLine width="75%" height="0.875rem" />
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Carregando...">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
```

## Usage in a content list

```tsx
// app/content/page.tsx
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { SkeletonList } from "@/components/SkeletonList";

export default function ContentPage() {
  const { data, isLoading, error } = useContent(); // your data hook

  if (isLoading) return <SkeletonList count={4} />;

  if (error) return (
    <ErrorState
      title="Não foi possível carregar os conteúdos"
      description="Verifique sua conexão e tente novamente."
      onRetry={() => window.location.reload()}
      technicalDetails={error.message}
    />
  );

  if (!data?.length) return (
    <EmptyState
      title="Nenhum conteúdo ainda"
      description="Gere seu primeiro conteúdo para começar a publicar no AEO."
      action={{ label: "Gerar conteúdo", onClick: () => router.push("/content/new") }}
    />
  );

  return (
    <div className="space-y-4">
      {data.map(item => <ContentCard key={item.id} item={item} />)}
    </div>
  );
}
```
