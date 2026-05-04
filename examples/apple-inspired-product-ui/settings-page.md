# Settings Page — CluOS Example

> Pattern: Section-based settings with progressive disclosure of advanced options.
> Reference: `PRODUCT-PATTERNS.md §9`, `patterns/page-templates.md §5`.

## SettingsSection component

```tsx
// components/SettingsSection.tsx
import React, { useState } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  advanced?: boolean;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, advanced, children }: SettingsSectionProps) {
  const [expanded, setExpanded] = useState(false);

  if (advanced) {
    return (
      <div style={{ borderTop: "1px solid var(--cluos-border)" }}>
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "1rem 1.25rem",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--cluos-text-muted)" }}>
            {title}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--cluos-text-subtle)", transition: "transform var(--cluos-dur-fast)" }}>
            {expanded ? "▾" : "▸"}
          </span>
        </button>
        {expanded && (
          <div style={{ padding: "0 1.25rem 1.25rem" }}>
            {description && (
              <p style={{ fontSize: "0.8125rem", color: "var(--cluos-text-muted)", marginBottom: "1rem" }}>{description}</p>
            )}
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--cluos-border)" }}>
      <div style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.08em", color: "var(--cluos-text-subtle)", marginBottom: "0.75rem" }}>
        {title}
      </div>
      {description && (
        <p style={{ fontSize: "0.8125rem", color: "var(--cluos-text-muted)", marginBottom: "0.75rem" }}>{description}</p>
      )}
      {children}
    </div>
  );
}
```

## FormField component

```tsx
// components/FormField.tsx
interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, htmlFor, error, hint, required, children }: FormFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <label
        htmlFor={htmlFor}
        style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--cluos-navy)" }}
      >
        {label}
        {required && <span style={{ color: "var(--cluos-status-error)", marginLeft: "0.25rem" }} aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && (
        <span style={{ fontSize: "0.75rem", color: "var(--cluos-text-subtle)" }}>{hint}</span>
      )}
      {error && (
        <span role="alert" style={{ fontSize: "0.75rem", color: "var(--cluos-status-error)" }}>{error}</span>
      )}
    </div>
  );
}
```

## Full settings page

```tsx
// app/settings/page.tsx
"use client";
import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { SettingsSection } from "@/components/SettingsSection";
import { FormField } from "@/components/FormField";

export default function SettingsPage() {
  const [name, setName] = useState("Rafael Costa");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Save logic here — no credentials in this file
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <main style={{ maxWidth: "var(--cluos-container-narrow)", margin: "0 auto", padding: "2rem 2rem" }}>
      <PageHeader title="Configurações" description="Gerencie preferências da conta" />

      <form onSubmit={handleSave}>
        <div style={{ background: "var(--cluos-bg)", border: "1px solid var(--cluos-border)", borderRadius: "var(--cluos-radius-lg)", overflow: "hidden" }}>
          
          <SettingsSection title="Perfil">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <FormField label="Nome" htmlFor="name" required>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ border: "1px solid var(--cluos-border)", borderRadius: "var(--cluos-radius-md)", padding: "0.5rem 0.75rem", fontSize: "0.875rem", fontFamily: "inherit", color: "var(--cluos-text)" }}
                />
              </FormField>
              <FormField label="E-mail" htmlFor="email" hint="Altere o e-mail pela central de suporte">
                <input
                  id="email"
                  type="email"
                  defaultValue="costarafaelhr@gmail.com"
                  disabled
                  style={{ border: "1px solid var(--cluos-border)", borderRadius: "var(--cluos-radius-md)", padding: "0.5rem 0.75rem", fontSize: "0.875rem", fontFamily: "inherit", color: "var(--cluos-text-muted)", background: "var(--cluos-bg-subtle)", cursor: "not-allowed" }}
                />
              </FormField>
            </div>
          </SettingsSection>

          <SettingsSection title="Notificações">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Conteúdos prontos para revisão", defaultChecked: true },
                { label: "Publicações realizadas", defaultChecked: true },
                { label: "Erros de processamento", defaultChecked: true },
                { label: "Resumo semanal", defaultChecked: false },
              ].map(({ label, defaultChecked }) => (
                <label key={label} style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer", fontSize: "0.875rem", color: "var(--cluos-text)" }}>
                  <input type="checkbox" defaultChecked={defaultChecked} style={{ accentColor: "var(--cluos-teal)", width: "1rem", height: "1rem" }} />
                  {label}
                </label>
              ))}
            </div>
          </SettingsSection>

          <SettingsSection title="Avançado" advanced description="Opções para usuários técnicos.">
            <FormField label="Webhook URL" htmlFor="webhook" hint="Receba eventos em sua aplicação">
              <input id="webhook" type="url" placeholder="https://seu-servidor.com/webhook" style={{ border: "1px solid var(--cluos-border)", borderRadius: "var(--cluos-radius-md)", padding: "0.5rem 0.75rem", fontSize: "0.875rem", fontFamily: "inherit", color: "var(--cluos-text)", width: "100%" }} />
            </FormField>
          </SettingsSection>

          <div style={{ padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {saved && <span role="status" style={{ fontSize: "0.875rem", color: "var(--cluos-status-success)" }}>Alterações salvas</span>}
            {!saved && <span />}
            <button type="submit" style={{ background: "var(--cluos-teal)", color: "#fff", border: "none", borderRadius: "var(--cluos-radius-md)", padding: "0.5625rem 1.25rem", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}>
              Salvar alterações
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
```
