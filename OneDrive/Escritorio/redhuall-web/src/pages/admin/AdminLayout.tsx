import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import type { User } from "@supabase/supabase-js";
import Login from "./Login";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: "📊" },
  { label: "Hero Slides", path: "/admin/hero", icon: "🎬" },
  { label: "Categorías Home", path: "/admin/categorias", icon: "🏷️" },
  { label: "Productos", path: "/admin/productos", icon: "⛽" },
  { label: "Servicios", path: "/admin/servicios", icon: "🔧" },
  { label: "Trabajos", path: "/admin/trabajos", icon: "🖼️" },
  { label: "Configuración", path: "/admin/config", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <svg className="h-10 w-10 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (!user) return <Login />;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col bg-slate-950 lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
              <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5z" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-bold text-white">RED<span className="text-red-500">HUALL</span></span>
            <span className="block text-[9px] uppercase tracking-widest text-slate-500">Admin Panel</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-red-600/15 text-red-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            🌐 Ver página web
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-bold text-slate-900">RED<span className="text-red-600">HUALL</span> Admin</span>
        <button onClick={handleLogout} className="text-xs font-bold text-red-500">Salir</button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          <div onClick={() => setSidebarOpen(false)} className="absolute inset-0 bg-black/50" />
          <aside className="relative z-10 w-64 bg-slate-950">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-5">
              <span className="text-sm font-bold text-white">RED<span className="text-red-500">HUALL</span></span>
              <button onClick={() => setSidebarOpen(false)} className="text-slate-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-1 p-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                    location.pathname === item.path
                      ? "bg-red-600/15 text-red-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 pt-14 lg:ml-64 lg:pt-0">
        <div className="mx-auto max-w-6xl p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
