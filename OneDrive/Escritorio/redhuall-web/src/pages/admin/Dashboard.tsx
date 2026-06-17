import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

type Stat = { label: string; count: number; icon: string; path: string; color: string };

export default function Dashboard() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    async function load() {
      const tables: { label: string; table: string; icon: string; path: string; color: string }[] = [
        { label: "Hero Slides", table: "hero_slides", icon: "🎬", path: "/admin/hero", color: "bg-blue-500" },
        { label: "Categorías Home", table: "categorias_home", icon: "🏷️", path: "/admin/categorias", color: "bg-purple-500" },
        { label: "Productos", table: "productos", icon: "⛽", path: "/admin/productos", color: "bg-amber-500" },
        { label: "Servicios", table: "servicios", icon: "🔧", path: "/admin/servicios", color: "bg-green-500" },
        { label: "Trabajos", table: "trabajos", icon: "🖼️", path: "/admin/trabajos", color: "bg-red-500" },
      ];
      const results: Stat[] = [];
      for (const t of tables) {
        const { count } = await supabase.from(t.table).select("*", { count: "exact", head: true });
        results.push({ label: t.label, count: count ?? 0, icon: t.icon, path: t.path, color: t.color });
      }
      setStats(results);
    }
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">Bienvenido al panel de administración de RedHuall Surtidores</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.path}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${s.color}/15`}>
              {s.icon}
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{s.count}</p>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            🚀 Acciones rápidas
          </h3>
          <div className="mt-4 space-y-2">
            <Link to="/admin/productos" className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600">
              ➕ Agregar nuevo producto
            </Link>
            <Link to="/admin/trabajos" className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600">
              ➕ Agregar trabajo realizado
            </Link>
            <Link to="/admin/hero" className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600">
              ✏️ Editar slides del inicio
            </Link>
            <Link to="/admin/config" className="block rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-600">
              ⚙️ Cambiar teléfono o WhatsApp
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            📌 Información
          </h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p>🌐 <strong>Página web:</strong> <a href="/" target="_blank" className="text-red-500 underline">Ver sitio web público</a></p>
            <p>✅ <strong>Cambios en tiempo real:</strong> Todo lo que edites aquí aparece automáticamente en la web.</p>
            <p>🖼️ <strong>Imágenes:</strong> Puedes subir imágenes desde tu PC, pegar con Ctrl+V o pegar una URL.</p>
            <p>👁️ <strong>Ocultar sin eliminar:</strong> Desactiva "Visible en la web" para ocultar algo sin borrarlo.</p>
            <p>🗑️ <strong>Eliminar:</strong> El botón eliminar borra el registro permanentemente.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
