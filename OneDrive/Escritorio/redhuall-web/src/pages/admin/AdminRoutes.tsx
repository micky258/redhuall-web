import CrudPage, { type FieldDef } from "./CrudPage";
import { useEffect, useState } from "react";
import { supabase, type Configuracion } from "../../lib/supabase";

/* ---- Hero Slides ---- */
const heroFields: FieldDef[] = [
  { name: "tag", label: "Etiqueta superior", type: "text", placeholder: "Ej: Surtidores de combustible" },
  { name: "titulo", label: "Título principal", type: "text", placeholder: "Título grande del slide", required: true },
  { name: "texto", label: "Texto descriptivo", type: "textarea", placeholder: "Descripción del slide" },
  { name: "imagen_url", label: "Imagen del slide", type: "image" },
  { name: "orden", label: "Orden (1 = primero)", type: "number" },
  { name: "activo", label: "Visible en la web", type: "boolean" },
];
export function HeroAdmin() {
  return <CrudPage title="Hero Slides" subtitle="Los slides del inicio de la página" icon="🎬" table="hero_slides" fields={heroFields} />;
}

/* ---- Categorías Home ---- */
const catFields: FieldDef[] = [
  { name: "titulo", label: "Título", type: "text", placeholder: "Ej: Surtidores de combustible", required: true },
  { name: "descripcion", label: "Descripción", type: "textarea", placeholder: "Descripción corta" },
  { name: "imagen_url", label: "Imagen de la categoría", type: "image" },
  { name: "orden", label: "Orden (1 = primero)", type: "number" },
  { name: "activo", label: "Visible en la web", type: "boolean" },
];
export function CategoriasAdmin() {
  return <CrudPage title="Categorías Home" subtitle="Las tarjetas de categorías en la página principal" icon="🏷️" table="categorias_home" fields={catFields} />;
}

/* ---- Productos ---- */
const prodFields: FieldDef[] = [
  { name: "titulo", label: "Título del producto", type: "text", placeholder: "Ej: Surtidor doble 2 mangueras", required: true },
  { name: "categoria", label: "Categoría", type: "text", placeholder: "dispensadores, repuestos, bombas, telemedicion, construccion" },
  { name: "descripcion", label: "Descripción", type: "textarea", placeholder: "Descripción del producto" },
  { name: "imagen_url", label: "Imagen del producto", type: "image" },
  { name: "tags", label: "Etiquetas (separadas con comas)", type: "tags", placeholder: "Gasolina, Diésel, 24/7" },
  { name: "orden", label: "Orden (1 = primero)", type: "number" },
  { name: "activo", label: "Visible en la web", type: "boolean" },
];
export function ProductosAdmin() {
  return <CrudPage title="Productos" subtitle="Catálogo completo de productos (se muestra en /productos)" icon="⛽" table="productos" fields={prodFields} />;
}

/* ---- Servicios ---- */
const servFields: FieldDef[] = [
  { name: "titulo", label: "Título del servicio", type: "text", placeholder: "Ej: Mantenimiento mecánico 24/7", required: true },
  { name: "descripcion", label: "Descripción", type: "textarea", placeholder: "Descripción del servicio" },
  { name: "icono", label: "Emoji del ícono", type: "text", placeholder: "🔧 (usa un emoji)" },
  { name: "orden", label: "Orden", type: "number" },
  { name: "activo", label: "Visible en la web", type: "boolean" },
];
export function ServiciosAdmin() {
  return <CrudPage title="Servicios" subtitle="Los servicios que ofrece RedHuall" icon="🔧" table="servicios" fields={servFields} />;
}

/* ---- Trabajos / Galería ---- */
const workFields: FieldDef[] = [
  { name: "titulo", label: "Título del proyecto", type: "text", placeholder: "Ej: Estación Villa Fátima", required: true },
  { name: "cliente", label: "Cliente", type: "text", placeholder: "Nombre del cliente o empresa" },
  { name: "ubicacion", label: "Ubicación", type: "text", placeholder: "La Paz, Bolivia" },
  { name: "anio", label: "Año", type: "text", placeholder: "2024" },
  { name: "categoria", label: "Categoría", type: "text", placeholder: "Construcción, Instalación, Mantenimiento..." },
  { name: "descripcion", label: "Descripción del trabajo", type: "textarea", placeholder: "Describe el trabajo realizado..." },
  { name: "imagen_principal", label: "Imagen principal del trabajo", type: "image" },
  { name: "imagenes", label: "Imágenes adicionales (URLs separadas por comas)", type: "tags", placeholder: "https://url1.jpg, https://url2.jpg" },
  { name: "orden", label: "Orden (1 = primero)", type: "number" },
  { name: "activo", label: "Visible en la web", type: "boolean" },
];
export function TrabajosAdmin() {
  return <CrudPage title="Trabajos realizados" subtitle="Galería de proyectos ejecutados (se muestra en /trabajos)" icon="🖼️" table="trabajos" fields={workFields} />;
}

/* ---- Configuración ---- */
export function ConfigAdmin() {
  const [config, setConfig] = useState<Configuracion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    const { data } = await supabase.from("configuracion").select("*").order("id");
    if (data) setConfig(data);
    setLoading(false);
  };

  const updateValue = (index: number, valor: string) => {
    const updated = [...config];
    updated[index] = { ...updated[index], valor };
    setConfig(updated);
  };

  const saveAll = async () => {
    setSaving(true);
    setMsg("");
    for (const c of config) {
      await supabase.from("configuracion").update({ valor: c.valor }).eq("id", c.id);
    }
    setMsg("✅ Configuración guardada");
    setSaving(false);
    setTimeout(() => setMsg(""), 2000);
  };

  const addNew = async () => {
    const clave = prompt("Nombre de la nueva configuración (ej: facebook, instagram):");
    if (!clave) return;
    await supabase.from("configuracion").insert({ clave, valor: "" });
    loadConfig();
  };

  const labelMap: Record<string, string> = {
    telefono: "📞 Teléfono",
    whatsapp: "💬 Número WhatsApp (sin +)",
    email: "📧 Email de contacto",
    direccion: "📍 Dirección",
    horario: "🕒 Horario de atención",
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">⚙️ Configuración</h1>
          <p className="mt-1 text-sm text-slate-500">Datos de contacto y configuración general del sitio</p>
        </div>
        <button onClick={addNew} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-500">
          + Agregar campo
        </button>
      </div>

      {msg && (
        <div className="mb-4 rounded-xl bg-green-50 p-3 text-center text-sm font-medium text-green-700">{msg}</div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <svg className="h-8 w-8 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : (
        <div className="space-y-4">
          {config.map((c, i) => (
            <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                {labelMap[c.clave] || `🔹 ${c.clave}`}
              </label>
              <input
                type="text"
                value={c.valor}
                onChange={(e) => updateValue(i, e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
              <p className="mt-1 text-[11px] text-slate-400">Clave: {c.clave}</p>
            </div>
          ))}
          <button
            onClick={saveAll}
            disabled={saving}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-red-500 disabled:opacity-60"
          >
            {saving ? "Guardando..." : "✅ Guardar todos los cambios"}
          </button>
        </div>
      )}
    </div>
  );
}
