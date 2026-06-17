import { useEffect, useRef, useState } from "react";
import { uploadImage, blobToFile } from "../../lib/uploadImage";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function ImageUploader({ value, onChange, label = "Imagen" }: Props) {
  const [mode, setMode] = useState<"url" | "file" | "paste">("url");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const pasteZoneRef = useRef<HTMLDivElement>(null);

  /* ---- Subir archivo ---- */
  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen (JPG, PNG, WEBP...)");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al subir imagen");
    }
    setUploading(false);
  };

  /* ---- Drag & Drop ---- */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  /* ---- Pegar con Ctrl+V ---- */
  useEffect(() => {
    if (mode !== "paste") return;
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          if (blob) {
            await handleFile(blobToFile(blob));
          }
          break;
        }
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [mode]);

  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      {/* Tabs de modo */}
      <div className="mb-3 flex gap-1 rounded-xl bg-slate-100 p-1">
        {[
          { id: "url", icon: "🔗", label: "URL" },
          { id: "file", icon: "📁", label: "Archivo" },
          { id: "paste", icon: "📋", label: "Pegar (Ctrl+V)" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => { setMode(tab.id as typeof mode); setError(""); }}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition ${
              mode === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Modo URL */}
      {mode === "url" && (
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
      )}

      {/* Modo Archivo */}
      {mode === "file" && (
        <div
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 text-center transition ${
            dragOver
              ? "border-red-400 bg-red-50"
              : "border-slate-300 bg-slate-50 hover:border-red-400 hover:bg-red-50"
          }`}
        >
          {uploading ? (
            <>
              <svg className="h-8 w-8 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-sm font-medium text-slate-500">Subiendo imagen...</p>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">📁</div>
              <p className="text-sm font-bold text-slate-700">Haz clic para seleccionar</p>
              <p className="text-xs text-slate-400">o arrastra y suelta aquí</p>
              <p className="text-xs text-slate-400">JPG, PNG, WEBP · Máximo 5MB</p>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}

      {/* Modo Pegar */}
      {mode === "paste" && (
        <div
          ref={pasteZoneRef}
          tabIndex={0}
          className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-8 text-center outline-none transition focus:border-red-400 focus:bg-red-50"
        >
          {uploading ? (
            <>
              <svg className="h-8 w-8 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-sm font-medium text-slate-500">Subiendo imagen...</p>
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl">📋</div>
              <p className="text-sm font-bold text-slate-700">Presiona Ctrl+V para pegar</p>
              <p className="text-xs text-slate-400">Copia cualquier imagen y pégala aquí</p>
              <p className="text-xs text-slate-400">También funciona desde capturas de pantalla</p>
            </>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600">
          ❌ {error}
        </p>
      )}

      {/* Preview de la imagen actual */}
      {value && (
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-3 py-2">
            <p className="text-xs font-bold text-slate-500">✅ Vista previa</p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs font-bold text-red-500 hover:text-red-700"
            >
              ✕ Quitar imagen
            </button>
          </div>
          <img
            src={value}
            alt="Preview"
            className="h-36 w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "";
              e.currentTarget.className = "hidden";
            }}
          />
        </div>
      )}
    </div>
  );
}
