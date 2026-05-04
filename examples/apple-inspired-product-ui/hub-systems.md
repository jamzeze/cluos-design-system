# Hub de Sistemas — CluOS Example

> Pattern: SystemCard grid with status indicators and progressive disclosure.
> Reference: `PRODUCT-PATTERNS.md §3`.

## SystemCard component

```tsx
// components/SystemCard.tsx
type SystemStatus = "online" | "attention" | "offline";

interface SystemCardProps {
  name: string;
  url: string;
  status: SystemStatus;
  statusMessage?: string;
  href: string;
}

const statusConfig = {
  online: {
    dot: "bg-[var(--cluos-status-success)]",
    label: "Online",
    text: "text-[var(--cluos-status-success)]",
  },
  attention: {
    dot: "bg-[var(--cluos-status-warn)]",
    label: "Atenção",
    text: "text-[var(--cluos-status-warn)]",
  },
  offline: {
    dot: "bg-[var(--cluos-status-error)]",
    label: "Offline",
    text: "text-[var(--cluos-status-error)]",
  },
};

export function SystemCard({ name, url, status, statusMessage, href }: SystemCardProps) {
  const s = statusConfig[status];
  const isOffline = status === "offline";

  return (
    <div className={`bg-white border border-cluos-border rounded-cluos-lg p-5 transition-shadow hover:shadow-cluos-sm ${isOffline ? "opacity-70" : ""}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
        <span className={`text-xs font-medium ${s.text}`}>{s.label}</span>
      </div>
      <div className="font-semibold text-cluos-navy mb-1">{name}</div>
      <div className="text-xs text-cluos-text-subtle mb-1">{url}</div>
      {statusMessage && (
        <div className={`text-xs mb-3 ${s.text}`}>{statusMessage}</div>
      )}
      <div className="flex items-center gap-2 mt-3">
        {isOffline ? (
          <button
            disabled
            className="px-4 py-2 bg-cluos-bg-muted text-cluos-text-subtle rounded-cluos-md text-sm font-medium cursor-not-allowed"
            aria-label="Sistema offline — indisponível"
          >
            Abrir
          </button>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-cluos-teal text-white rounded-cluos-md text-sm font-medium hover:bg-cluos-teal-deep transition-colors"
          >
            Abrir
          </a>
        )}
        <button className="px-3 py-2 text-sm text-cluos-teal-deep font-medium hover:text-cluos-teal transition-colors">
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
```

## Hub page

```tsx
// app/hub/page.tsx
import { SystemCard } from "@/components/SystemCard";
import { PageHeader } from "@/components/PageHeader";

const systems = [
  { name: "CRM CluOS", url: "crm.cluos.online", status: "online" as const, href: "https://crm.cluos.online" },
  { name: "Automatic-AEO", url: "aeo.cluos.online", status: "attention" as const, statusMessage: "Alta latência detectada", href: "https://aeo.cluos.online" },
  { name: "B3", url: "b3.cluos.online", status: "offline" as const, statusMessage: "Serviço indisponível", href: "#" },
  { name: "Sci-OS", url: "sci.cluos.online", status: "online" as const, href: "https://sci.cluos.online" },
  { name: "Medframe", url: "medframe.cluos.online", status: "online" as const, href: "https://medframe.cluos.online" },
];

export default function HubPage() {
  const online = systems.filter(s => s.status === "online").length;
  const attention = systems.filter(s => s.status === "attention").length;

  return (
    <main className="max-w-cluos-product mx-auto px-8 py-8">
      <PageHeader
        title="Hub CluOS"
        description={`${online} sistemas online${attention > 0 ? `, ${attention} com atenção` : ""}`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map(system => (
          <SystemCard key={system.name} {...system} />
        ))}
      </div>
    </main>
  );
}
```
