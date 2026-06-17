import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "../../lib/supabase";
import ImageUploader from "../../components/admin/ImageUploader";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "tags" | "url" | "image";
  placeholder?: string;
  required?: boolean;
};

type Props = {
  title: string;
  subtitle: string;
  icon: string;
  table: string;
  fields: FieldDef[];
  orderBy?: string;
  extraInfo?: ReactNode;
};

export default function CrudPage({ title, subtitle, icon, table, fields, orderBy = "orden" }: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from(table).select("*").order(orderBy, { ascending: true });
    setRows(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [table]);

  const openNew = () => {
    const empty: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.type === "boolean") empty[f.name] = true;
      else if (f.type === "number") empty[f.name] = 0;
      else if (f.type === "tags") empty[f.name] = [];
      else empty[f.name] = "";
    });
    setEditing(empty);
    setIsNew(true);
    setMsg("");
  };

  const openEdit = (row: Record<string, unknown>) => {
    setEditing({ ...row });
    setIsNew(false);
    setMsg("");
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setMsg("");

    const payload = { ...editing };
    delete payload.id;
    delete payload.created_at;

    if (isNew) {
      const { error } = await supabase.from(table).insert([payload]);
      if (error) {
        setMsg("❌ Error: " + error.message);
        setSaving(false);
        return;
      }
      setMsg("✅ Creado correctamente");
    } else {
      const { error } = await supabase.from(table).update(payload).eq("id", editing.id);
      if (error) {
        setMsg("❌ Error: " + error.message);
        setSaving(false);
        return;
      }
      setMsg("✅ Guardado correctamente");
    }
    setSaving(false);
    load();
    setTimeout(() => { setEditing(null); setMsg(""); }, 1200);
  };

  const remove = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer.")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) alert("Error al eliminar: " + error.message);
    else load();
  };

  const updateField = (name: string, value: unknown) => {
    if (!editing) return;
    setEditing({ ...editing, [name]: value });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
            <span>{icon}</span> {title}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-red-500"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Agregar nuevo
        </button>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="h-8 w-8 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-4xl">📭</p>
          <p className="mt-2 font-medium text-slate-500">No hay registros todavía</p>
          <button onClick={openNew} className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-bold text-white">
            Crear el primero
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => {
            const titleField = fields.find((f) => ["titulo", "clave", "tag"].includes(f.name));
            const displayTitle = String(titleField ? (row[titleField.name] ?? "") : row.id);
            const imgField = fields.find((f) => f.type === "image" || f.name === "imagen_url" || f.name === "imagen_principal");
            const imgUrl = imgField ? String(row[imgField.name] ?? "") : "";
            const isActive = row.activo !== undefined ? Boolean(row.activo) : true;

            return (
              <div
                key={String(row.id)}
                className={`flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md ${
                  isActive ? "border-slate-200" : "border-orange-200 bg-orange-50/50"
                }`}
              >
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900">{displayTitle || "Sin título"}</p>
                  <p className="truncate text-xs text-slate-500">
                    {`ID: ${String(row.id)}`}
                    {row.categoria ? ` · ${String(row.categoria)}` : ""}
                    {row.orden !== undefined ? ` · Orden: ${String(row.orden)}` : ""}
                    {row.cliente ? ` · ${String(row.cliente)}` : ""}
                  </p>
                  {!isActive && (
                    <span className="mt-0.5 inline-block rounded bg-orange-200 px-1.5 py-0.5 text-[10px] font-bold text-orange-700">
                      OCULTO EN LA WEB
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => openEdit(row)}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => remove(Number(row.id))}
                    className="rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-100"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de edición */}
      {editing && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-16 backdrop-blur-sm">
          <div className="relative mb-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            {/* Cerrar */}
            <button
              onClick={() => { setEditing(null); setMsg(""); }}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="mb-6 pr-8 text-xl font-bold text-slate-900">
              {isNew ? `➕ Crear nuevo` : "✏️ Editar registro"}
            </h2>

            <div className="space-y-5">
              {fields.map((f) => (
                <div key={f.name}>
                  {/* Imagen (con uploader) */}
                  {f.type === "image" ? (
                    <ImageUploader
                      label={f.label}
                      value={String(editing[f.name] ?? "")}
                      onChange={(url) => updateField(f.name, url)}
                    />
                  ) : f.type === "textarea" ? (
                    <>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{f.label}</label>
                      <textarea
                        rows={3}
                        value={String(editing[f.name] ?? "")}
                        onChange={(e) => updateField(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      />
                    </>
                  ) : f.type === "boolean" ? (
                    <>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{f.label}</label>
                      <button
                        type="button"
                        onClick={() => updateField(f.name, !editing[f.name])}
                        className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                          editing[f.name] ? "bg-green-100 text-green-700 ring-1 ring-green-300" : "bg-red-100 text-red-600 ring-1 ring-red-300"
                        }`}
                      >
                        {editing[f.name] ? "✅ Visible en la web" : "❌ Oculto (no se muestra)"}
                      </button>
                    </>
                  ) : f.type === "number" ? (
                    <>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{f.label}</label>
                      <input
                        type="number"
                        value={Number(editing[f.name] ?? 0)}
                        onChange={(e) => updateField(f.name, parseInt(e.target.value) || 0)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      />
                    </>
                  ) : f.type === "tags" ? (
                    <>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{f.label}</label>
                      <input
                        type="text"
                        value={Array.isArray(editing[f.name]) ? (editing[f.name] as string[]).join(", ") : ""}
                        onChange={(e) =>
                          updateField(f.name, e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))
                        }
                        placeholder={f.placeholder || "Separar con comas: Gasolina, Diésel"}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      />
                      <p className="mt-1 text-[11px] text-slate-400">Separa las etiquetas con comas</p>
                    </>
                  ) : (
                    <>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{f.label}</label>
                      <input
                        type="text"
                        value={String(editing[f.name] ?? "")}
                        onChange={(e) => updateField(f.name, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Mensaje */}
            {msg && (
              <div className={`mt-4 rounded-xl p-3 text-center text-sm font-medium ${
                msg.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
              }`}>
                {msg}
              </div>
            )}

            {/* Botones */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={save}
                disabled={saving}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-red-500 disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Guardando...
                  </>
                ) : isNew ? "✅ Crear registro" : "✅ Guardar cambios"}
              </button>
              <button
                onClick={() => { setEditing(null); setMsg(""); }}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
