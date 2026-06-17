import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Credenciales incorrectas. Verifica tu email y contraseña.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-800 shadow-xl shadow-red-900/40">
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-white" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            RED<span className="text-red-500">HUALL</span>
          </h1>
          <p className="mt-1 text-sm text-slate-400">Panel de Administración</p>
        </div>

        <form onSubmit={handleLogin} className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
          <h2 className="mb-6 text-center text-lg font-bold text-white">Iniciar sesión</h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/15 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@redhuallsurtidores.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500 disabled:opacity-60"
            >
              {loading ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                "Ingresar al panel"
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          RedHuall Surtidores · Panel de administración
        </p>
      </div>
    </div>
  );
}
