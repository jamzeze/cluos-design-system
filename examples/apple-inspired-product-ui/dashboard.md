# Dashboard — CluOS Example

> Pattern: Minimal dashboard with metric cards, pending action, and a secondary list.
> Reference: `PRODUCT-PATTERNS.md §4`, `patterns/page-templates.md §2`.

## MetricCard component

```tsx
// components/MetricCard.tsx
interface MetricCardProps {
  label: string;
  value: string | number;
  variant?: "default" | "warn" | "success";
  trend?: { delta: string; direction: "up" | "down" | "neutral" };
}

export function MetricCard({ label, value, variant = "default", trend }: MetricCardProps) {
  const valueColor = {
    default: "var(--cluos-navy)",
    warn: "var(--cluos-status-warn)",
    success: "var(--cluos-status-success)",
  }[variant];

  const trendColor = trend
    ? trend.direction === "up" ? "var(--cluos-status-success)"
      : trend.direction === "down" ? "var(--cluos-status-error)"
      : "var(--cluos-text-subtle)"
    : undefined;

  return (
    <div style={{ background: "var(--cluos-bg)", border: "1px solid var(--cluos-border)", borderRadius: "var(--cluos-radius-lg)", padding: "1.25rem" }}>
      <div style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "var(--cluos-text-muted)", marginBottom: "0.5rem" }}>
        {label}
      </div>
      <div style={{ fontSize: "2rem", fontWeight: 600, lineHeight: 1, color: valueColor }}>
        {value}
      </div>
      {trend && (
        <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: trendColor }}>
          {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "—"} {trend.delta}
        </div>
      )}
    </div>
  );
}
```

## PendingActionCallout component

```tsx
// components/PendingActionCallout.tsx
interface PendingActionCalloutProps {
  message: string;
  description?: string;
  actionLabel: string;
  onAction: () => void;
}

export function PendingActionCallout({ message, description, actionLabel, onAction }: PendingActionCalloutProps) {
  return (
    <div style={{ background: "var(--cluos-status-warn-bg)", border: "1px solid #e8c49a", borderRadius: "var(--cluos-radius-lg)", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
      <div>
        <div style={{ fontWeight: 500, color: "var(--cluos-navy)", fontSize: "0.9375rem" }}>{message}</div>
        {description && (
          <div style={{ fontSize: "0.8125rem", color: "var(--cluos-text-muted)", marginTop: "0.25rem" }}>{description}</div>
        )}
      </div>
      <button
        onClick={onAction}
        style={{ background: "var(--cluos-teal)", color: "#fff", border: "none", borderRadius: "var(--cluos-radius-md)", padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" as const, flexShrink: 0 }}
      >
        {actionLabel}
      </button>
    </div>
  );
}
```

## Full dashboard page

```tsx
// app/dashboard/page.tsx
"use client";
import { PageHeader } from "@/components/PageHeader";
import { MetricCard } from "@/components/MetricCard";
import { PendingActionCallout } from "@/components/PendingActionCallout";
import { useRouter } from "next/navigation";

const recentItems = [
  { id: "1", title: "Como o CluOS simplifica processos médicos", status: "pending" },
  { id: "2", title: "Inteligência artificial na triagem de pacientes", status: "published" },
  { id: "3", title: "B3 e a automação de relatórios financeiros", status: "published" },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending:   { label: "Aguardando revisão", color: "var(--cluos-status-warn)" },
  published: { label: "Publicado", color: "var(--cluos-status-success)" },
  error:     { label: "Com erro", color: "var(--cluos-status-error)" },
};

export default function DashboardPage() {
  const router = useRouter();
  const pendingCount = recentItems.filter(i => i.status === "pending").length;

  return (
    <main style={{ maxWidth: "var(--cluos-container-product)", margin: "0 auto", padding: "2rem 2rem" }}>
      <PageHeader title="Dashboard" description="Visão geral da sua atividade no CluOS" />

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
        <MetricCard label="Conteúdos publicados" value={47} trend={{ delta: "+4 este mês", direction: "up" }} />
        <MetricCard label="Aguardando revisão" value={pendingCount} variant={pendingCount > 0 ? "warn" : "default"} />
        <MetricCard label="Leads ativos" value={12} />
        <MetricCard label="Sistemas online" value="4/5" />
      </div>

      {/* Pending callout — only shown when there are items pending */}
      {pendingCount > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <PendingActionCallout
            message={`${pendingCount} conteúdo${pendingCount > 1 ? "s" : ""} aguardando revisão`}
            description="Revise antes de publicar"
            actionLabel="Revisar agora"
            onAction={() => router.push("/content?filter=pending")}
          />
        </div>
      )}

      {/* Recent content */}
      <div>
        <h2 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--cluos-navy)", marginBottom: "0.75rem" }}>Conteúdos recentes</h2>
        <div style={{ background: "var(--cluos-bg)", border: "1px solid var(--cluos-border)", borderRadius: "var(--cluos-radius-lg)", overflow: "hidden" }}>
          {recentItems.map((item, idx) => {
            const s = statusLabels[item.status] ?? statusLabels.pending;
            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.875rem 1.25rem",
                  borderTop: idx > 0 ? "1px solid var(--cluos-border)" : "none",
                }}
              >
                <span style={{ fontSize: "0.875rem", color: "var(--cluos-navy)", flex: 1, marginRight: "1rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
                  {item.title}
                </span>
                <span style={{ fontSize: "0.75rem", fontWeight: 500, color: s.color, whiteSpace: "nowrap" as const }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
```
