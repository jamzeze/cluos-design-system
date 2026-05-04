# Upload Video Flow — CluOS Example

> Pattern: three-phase upload flow (idle → uploading → processing).
> Reference: `PRODUCT-PATTERNS.md §7`, `patterns/states.md`.

## State model

```ts
type UploadPhase =
  | { type: "idle" }
  | { type: "uploading"; progress: number; fileName: string; fileSizeMB: number }
  | { type: "processing"; fileName: string }
  | { type: "done"; videoId: string; fileName: string }
  | { type: "error"; message: string; canRetry: boolean };
```

## Component

```tsx
// components/UploadVideoFlow.tsx
"use client";
import React, { useRef, useState, useCallback } from "react";

type UploadPhase =
  | { type: "idle" }
  | { type: "uploading"; progress: number; fileName: string; fileSizeMB: number }
  | { type: "processing"; fileName: string }
  | { type: "done"; videoId: string; fileName: string }
  | { type: "error"; message: string; canRetry: boolean };

const ACCEPTED = ["video/mp4", "video/quicktime", "video/x-msvideo"];
const MAX_MB = 500;

export function UploadVideoFlow({ onComplete }: { onComplete: (videoId: string) => void }) {
  const [phase, setPhase] = useState<UploadPhase>({ type: "idle" });
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      setPhase({ type: "error", message: "Formato não suportado. Use MP4, MOV ou AVI.", canRetry: true });
      return;
    }
    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > MAX_MB) {
      setPhase({ type: "error", message: `Arquivo muito grande (${sizeMB.toFixed(0)}MB). Máximo ${MAX_MB}MB.`, canRetry: true });
      return;
    }
    setPhase({ type: "uploading", progress: 0, fileName: file.name, fileSizeMB: sizeMB });
    // Simulate upload — replace with real upload logic
    uploadFile(file, (progress) => {
      setPhase(p => p.type === "uploading" ? { ...p, progress } : p);
    }).then(videoId => {
      setPhase({ type: "processing", fileName: file.name });
      return pollProcessing(videoId); // replace with real polling
    }).then(videoId => {
      setPhase({ type: "done", videoId, fileName: file.name });
      onComplete(videoId);
    }).catch(err => {
      setPhase({ type: "error", message: err.message ?? "Erro ao processar o vídeo.", canRetry: true });
    });
  }, [onComplete]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (phase.type === "idle") {
    return (
      <div
        role="region"
        aria-label="Área de envio de vídeo"
        onDrop={handleDrop}
        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        style={{
          border: `2px dashed var(--cluos-${isDragging ? "teal" : "border"})`,
          borderRadius: "var(--cluos-radius-lg)",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          background: isDragging ? "rgba(0,128,128,0.04)" : "var(--cluos-bg)",
          transition: "border-color var(--cluos-dur-fast), background var(--cluos-dur-fast)",
        }}
      >
        <div style={{ fontSize: "2rem", color: "var(--cluos-text-subtle)", marginBottom: "0.75rem" }}>↑</div>
        <div style={{ fontWeight: 600, color: "var(--cluos-navy)", marginBottom: "0.375rem" }}>
          Arraste o vídeo aqui
        </div>
        <div style={{ fontSize: "0.875rem", color: "var(--cluos-text-muted)", marginBottom: "1rem" }}>ou</div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(",")}
          onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          className="sr-only"
          aria-label="Selecionar arquivo de vídeo"
        />
        <button
          onClick={() => inputRef.current?.click()}
          style={{ background: "transparent", color: "var(--cluos-navy)", border: "1px solid var(--cluos-border-strong)", borderRadius: "var(--cluos-radius-md)", padding: "0.5rem 1rem", fontSize: "0.875rem", cursor: "pointer" }}
        >
          Selecionar arquivo
        </button>
        <div style={{ fontSize: "0.75rem", color: "var(--cluos-text-subtle)", marginTop: "0.75rem" }}>
          MP4, MOV, AVI · máx. {MAX_MB}MB
        </div>
      </div>
    );
  }

  if (phase.type === "uploading") {
    const uploadedMB = (phase.fileSizeMB * phase.progress / 100).toFixed(0);
    const totalMB = phase.fileSizeMB.toFixed(0);
    return (
      <div style={{ background: "var(--cluos-bg)", border: "1px solid var(--cluos-border)", borderRadius: "var(--cluos-radius-lg)", padding: "1.25rem" }} aria-busy="true" aria-label={`Enviando ${phase.fileName}: ${phase.progress}%`}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--cluos-navy)" }}>{phase.fileName}</span>
          <span style={{ fontSize: "0.875rem", color: "var(--cluos-text-muted)" }}>{phase.progress}%</span>
        </div>
        <div style={{ height: "4px", background: "var(--cluos-bg-muted)", borderRadius: "2px", overflow: "hidden" }}>
          <div role="progressbar" aria-valuenow={phase.progress} aria-valuemin={0} aria-valuemax={100} style={{ height: "100%", width: `${phase.progress}%`, background: "var(--cluos-teal)", borderRadius: "2px", transition: "width 0.3s ease" }} />
        </div>
        <div style={{ fontSize: "0.75rem", color: "var(--cluos-text-subtle)", marginTop: "0.5rem" }}>
          Enviando... {uploadedMB}MB de {totalMB}MB
        </div>
      </div>
    );
  }

  if (phase.type === "processing") {
    return (
      <div style={{ background: "var(--cluos-bg)", border: "1px solid var(--cluos-border)", borderRadius: "var(--cluos-radius-lg)", padding: "1.25rem" }} aria-busy="true" aria-live="polite">
        <div style={{ fontWeight: 500, color: "var(--cluos-navy)", marginBottom: "0.25rem" }}>{phase.fileName}</div>
        <div style={{ fontSize: "0.875rem", color: "var(--cluos-text-muted)" }}>Processando vídeo…</div>
      </div>
    );
  }

  if (phase.type === "done") {
    return (
      <div style={{ background: "var(--cluos-status-success-bg)", border: "1px solid #b8dcb8", borderRadius: "var(--cluos-radius-lg)", padding: "1.25rem" }} aria-live="polite">
        <div style={{ fontWeight: 600, color: "var(--cluos-navy)", marginBottom: "0.25rem" }}>Vídeo pronto</div>
        <div style={{ fontSize: "0.875rem", color: "var(--cluos-text-muted)" }}>{phase.fileName} foi processado com sucesso.</div>
      </div>
    );
  }

  // error
  return (
    <div style={{ background: "var(--cluos-status-error-bg)", border: "1px solid #dcb8b8", borderRadius: "var(--cluos-radius-lg)", padding: "1.25rem" }} role="alert">
      <div style={{ fontWeight: 600, color: "var(--cluos-navy)", marginBottom: "0.375rem" }}>Erro no upload</div>
      <div style={{ fontSize: "0.875rem", color: "var(--cluos-text-muted)", marginBottom: "1rem" }}>{phase.message}</div>
      {phase.canRetry && (
        <button onClick={() => setPhase({ type: "idle" })} style={{ background: "var(--cluos-teal)", color: "#fff", border: "none", borderRadius: "var(--cluos-radius-md)", padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer" }}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}
```

> `uploadFile()` and `pollProcessing()` are your own async functions.
> Replace with real API calls — never include credentials in this file.
