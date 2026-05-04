# React Components — CluOS Core Components

> Minimal, framework-agnostic React components using official CluOS tokens.
> No inline hardcoded colors. Every value references a CSS custom property.

## AppShell

```tsx
// components/AppShell.tsx
interface AppShellProps {
  topNav: React.ReactNode;
  children: React.ReactNode;
}

export function AppShell({ topNav, children }: AppShellProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--cluos-bg)" }}>
      <header
        role="banner"
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          padding: "0 var(--cluos-space-8)",
          background: "var(--cluos-bg)",
          borderBottom: "1px solid var(--cluos-border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {topNav}
      </header>
      <main id="main-content" style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
```

## TopNav

```tsx
// components/TopNav.tsx
interface TopNavProps {
  logo: React.ReactNode;
  actions?: React.ReactNode;
}

export function TopNav({ logo, actions }: TopNavProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center" }}>{logo}</div>
      {actions && <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>{actions}</div>}
    </div>
  );
}
```

## Toast

```tsx
// components/Toast.tsx
type ToastVariant = "success" | "error" | "warn" | "info";

interface ToastProps {
  message: string;
  variant: ToastVariant;
  onDismiss?: () => void;
}

const variantStyles: Record<ToastVariant, React.CSSProperties> = {
  success: { background: "var(--cluos-status-success-bg)", borderColor: "#b8dcb8", color: "var(--cluos-navy)" },
  error:   { background: "var(--cluos-status-error-bg)",   borderColor: "#dcb8b8", color: "var(--cluos-navy)" },
  warn:    { background: "var(--cluos-status-warn-bg)",    borderColor: "#e8c49a", color: "var(--cluos-navy)" },
  info:    { background: "var(--cluos-status-info-bg)",    borderColor: "#b8d4e8", color: "var(--cluos-navy)" },
};

export function Toast({ message, variant, onDismiss }: ToastProps) {
  const s = variantStyles[variant];
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        borderRadius: "var(--cluos-radius-md)",
        border: `1px solid ${s.borderColor}`,
        background: s.background,
        color: s.color,
        fontSize: "0.875rem",
        maxWidth: "400px",
        boxShadow: "var(--cluos-shadow-sm)",
      }}
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Fechar notificação"
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--cluos-text-muted)", lineHeight: 1, padding: "0.125rem" }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
```

## ConfirmDialog

```tsx
// components/ConfirmDialog.tsx
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export function ConfirmDialog({
  open, title, description,
  confirmLabel = "Confirmar", cancelLabel = "Cancelar",
  onConfirm, onCancel, destructive,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby={description ? "confirm-desc" : undefined}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.3)", padding: "1rem",
      }}
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div style={{ background: "var(--cluos-bg)", borderRadius: "var(--cluos-radius-xl)", padding: "1.75rem", maxWidth: "400px", width: "100%", boxShadow: "var(--cluos-shadow-md)" }}>
        <h2 id="confirm-title" style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--cluos-navy)", marginBottom: "0.5rem" }}>{title}</h2>
        {description && (
          <p id="confirm-desc" style={{ fontSize: "0.875rem", color: "var(--cluos-text-muted)", marginBottom: "1.5rem" }}>{description}</p>
        )}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{ background: "transparent", color: "var(--cluos-text-muted)", border: "none", padding: "0.5rem 0.875rem", fontSize: "0.875rem", borderRadius: "var(--cluos-radius-md)", cursor: "pointer" }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: destructive ? "var(--cluos-status-error)" : "var(--cluos-teal)",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1.125rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              borderRadius: "var(--cluos-radius-md)",
              cursor: "pointer",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## InlineFeedback

```tsx
// components/InlineFeedback.tsx
type FeedbackVariant = "success" | "error" | "warn" | "info";

interface InlineFeedbackProps {
  message: string;
  variant: FeedbackVariant;
}

const colors: Record<FeedbackVariant, string> = {
  success: "var(--cluos-status-success)",
  error:   "var(--cluos-status-error)",
  warn:    "var(--cluos-status-warn)",
  info:    "var(--cluos-status-info)",
};

export function InlineFeedback({ message, variant }: InlineFeedbackProps) {
  return (
    <p
      role={variant === "error" ? "alert" : "status"}
      style={{ fontSize: "0.75rem", color: colors[variant], margin: "0.25rem 0 0" }}
    >
      {message}
    </p>
  );
}
```
