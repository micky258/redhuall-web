import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, type CategoriaHome, type Servicio, type Trabajo } from "../lib/supabase";
import { WHATSAPP_URL } from "./Header";

/* ---------- Nosotros (stats fijos, texto editable en el futuro) ---------- */
export function About() {
  return (
    <section id="nosotros" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">¿Quiénes somos?</span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Experiencia y respaldo en cada solución para tu estación
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              En <strong className="text-red-600">RedHuall Surtidores</strong> trabajamos
              para que tu estación de servicio funcione con equipos confiables, tecnología
              moderna y soporte técnico especializado. Desde La Paz, Bolivia, ofrecemos
              venta, instalación, mantenimiento y repuestos de surtidores de combustible.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Más que productos, ofrecemos <strong>soluciones integrales</strong>: un
              servicio 360° que cubre todo el ciclo de vida de tus equipos para que tu
              operación nunca se detenga.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              {[
                ["10+", "Años de experiencia"],
                ["100+", "Estaciones atendidas"],
                ["24/7", "Soporte técnico"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl font-bold text-red-600 sm:text-4xl">{n}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { icon: "🏆", title: "Experiencia comprobada", text: "Empresa boliviana con amplia trayectoria brindando soluciones para estaciones de servicio en La Paz y todo el país." },
              { icon: "⚙️", title: "Marcas líderes", text: "Trabajamos con equipos y repuestos de fabricantes reconocidos internacionalmente, robustos y confiables." },
              { icon: "🛠️", title: "Soporte especializado", text: "Un equipo de técnicos expertos disponible para mantener tu operación siempre en marcha, sin interrupciones." },
              { icon: "✅", title: "Equipos certificados", text: "Productos que cumplen normas internacionales, con garantía y repuestos disponibles para el mercado boliviano." },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-2xl">{f.icon}</div>
                <h3 className="mt-4 font-display text-xl font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Productos (leer de Supabase) ---------- */
export function Products() {
  const [items, setItems] = useState<CategoriaHome[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("categorias_home")
        .select("*")
        .eq("activo", true)
        .order("orden");
      if (data && data.length > 0) {
        setItems(data as CategoriaHome[]);
      } else {
        // Fallback con datos de referencia si Supabase está vacío
        if (error) console.error("Supabase error:", error.message);
        setItems([
          { id: 1, titulo: "Surtidores de combustible", descripcion: "Dispensadores para gasolina y diésel de alta precisión, diseñados para operar 24/7 con bajo mantenimiento.", imagen_url: "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", orden: 1, activo: true },
          { id: 2, titulo: "Bombas y pistolas de despacho", descripcion: "Bombas sumergibles y de succión, mangueras, pistolas y accesorios compatibles con las principales marcas del mercado.", imagen_url: "https://images.pexels.com/photos/29370541/pexels-photo-29370541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", orden: 2, activo: true },
          { id: 3, titulo: "Repuestos y accesorios", descripcion: "Stock permanente de repuestos originales: medidores, computadores, válvulas, filtros y componentes electrónicos.", imagen_url: "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", orden: 3, activo: true },
          { id: 4, titulo: "Telemedición de tanques", descripcion: "Consolas y sondas de nivel para monitorear el volumen de combustible, detectar variaciones y reducir pérdidas de inventario.", imagen_url: "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", orden: 4, activo: true },
          { id: 5, titulo: "Construcción de estaciones", descripcion: "Diseño y construcción de estaciones de servicio cumpliendo normas NB-648, API, NFPA, OSH y medio ambiente de YPFB.", imagen_url: "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", orden: 5, activo: true },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="productos" className="bg-slate-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Nuestros productos</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Categorías destacadas</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Equipamiento completo para estaciones de servicio, flotas y consumo interno, con soporte técnico y repuestos en Bolivia.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="h-8 w-8 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {items.map((p) => (
                <div key={p.id} className="group overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-white/10 transition hover:-translate-y-1.5 hover:ring-red-500/50">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.imagen_url} alt={p.titulo} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-white">{p.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.descripcion}</p>
                    <a
                      href={`${WHATSAPP_URL.replace(
                        "quisiera%20m%C3%A1s%20informaci%C3%B3n",
                        encodeURIComponent(`Hola RedHuall, quisiera cotizar: ${p.titulo}`)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-red-500 transition group-hover:gap-3"
                    >
                      Cotizar <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                to="/productos"
                className="inline-flex items-center gap-2 rounded-full border-2 border-red-600 bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-red-600"
              >
                Ver catálogo completo
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- Servicios (leer de Supabase) ---------- */
export function Services() {
  const [services, setServices] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("servicios")
        .select("*")
        .eq("activo", true)
        .order("orden");
      if (data && data.length > 0) {
        setServices(data as Servicio[]);
      } else {
        setServices([
          { id: 1, titulo: "Mantenimiento mecánico 24/7", descripcion: "Mantenimiento preventivo y correctivo de surtidores y bombas, con atención de emergencias las 24 horas.", icono: "🔧", orden: 1, activo: true },
          { id: 2, titulo: "Soluciones eléctricas y electrónicas", descripcion: "Diagnóstico y reparación de computadores de surtidor, tarjetas electrónicas, displays y sistemas eléctricos.", icono: "⚡", orden: 2, activo: true },
          { id: 3, titulo: "Calibración de precisión", descripcion: "Calibración y certificación de surtidores con serafines patrón, garantizando despachos exactos.", icono: "⚙️", orden: 3, activo: true },
          { id: 4, titulo: "Instalación de estaciones", descripcion: "Montaje e instalación completa de islas de despacho, tuberías, tanques y surtidores con estándares internacionales.", icono: "🏗️", orden: 4, activo: true },
          { id: 5, titulo: "Automatización y control", descripcion: "Sistemas de facturación, control de despachos y automatización para gestionar tu estación en tiempo real.", icono: "🖥️", orden: 5, activo: true },
          { id: 6, titulo: "Asesoría especializada", descripcion: "Consultoría técnica para proyectos nuevos, ampliaciones y modernización de estaciones de servicio.", icono: "💡", orden: 6, activo: true },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="servicios" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Nuestros servicios</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Más que productos, soluciones integrales</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            En RedHuall ofrecemos tecnología y soporte para que tu operación funcione de manera eficiente y segura.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="h-8 w-8 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : services.length === 0 ? (
          <p className="py-12 text-center text-slate-500">Próximamente...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.id}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-xl hover:shadow-red-100"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-white text-2xl shadow-lg shadow-red-300 transition group-hover:scale-110">
                  {s.icono || "🔧"}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-slate-900">{s.titulo}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{s.descripcion}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Trabajos Preview (leer de Supabase) ---------- */
export function WorksPreview() {
  const [works, setWorks] = useState<Trabajo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("trabajos")
        .select("*")
        .eq("activo", true)
        .order("orden")
        .limit(4);
      if (data && data.length > 0) {
        setWorks(data as Trabajo[]);
      } else {
        setWorks([
          { id: 1, titulo: "Estación Villa Fátima", cliente: "Estación Comercializadora del Sur", ubicacion: "La Paz, Bolivia", anio: "2024", categoria: "Construcción", descripcion: "Diseño y construcción completa de estación de servicio con 4 islas de despacho.", imagen_principal: "https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", imagenes: [], orden: 1, activo: true },
          { id: 2, titulo: "Surtidores El Alto", cliente: "Distribuidora Andina SRL", ubicacion: "El Alto, La Paz", anio: "2024", categoria: "Instalación", descripcion: "Instalación de 6 surtidores cuádruples con sistema de facturación electrónica.", imagen_principal: "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", imagenes: [], orden: 2, activo: true },
          { id: 3, titulo: "Mantenimiento Red Nacional", cliente: "Grupo Combustibles Bolivia", ubicacion: "La Paz, Cochabamba", anio: "2023", categoria: "Mantenimiento", descripcion: "Mantenimiento preventivo y correctivo en 12 estaciones a nivel nacional.", imagen_principal: "https://images.pexels.com/photos/19895885/pexels-photo-19895885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", imagenes: [], orden: 3, activo: true },
          { id: 4, titulo: "Estación GNV Zona Sur", cliente: "Transportes del Sur Ltda.", ubicacion: "La Paz, Bolivia", anio: "2023", categoria: "Construcción", descripcion: "Conversión y equipamiento de estación para despacho de Gas Natural Vehicular.", imagen_principal: "https://images.pexels.com/photos/12377481/pexels-photo-12377481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", imagenes: [], orden: 4, activo: true },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Portafolio</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">Trabajos realizados</h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Conoce algunos de los proyectos que hemos ejecutado para estaciones de servicio y plantas industriales en Bolivia.
            </p>
          </div>
          <Link
            to="/trabajos"
            className="inline-flex items-center gap-2 self-start rounded-full bg-red-600 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:bg-red-500 sm:self-auto"
          >
            Ver galería completa
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="h-8 w-8 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : works.length === 0 ? (
          <div className="py-12 text-center text-slate-500">Próximamente subiremos trabajos aquí.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {works.map((w) => (
              <Link
                key={w.id}
                to="/trabajos"
                className="group relative h-64 overflow-hidden rounded-2xl shadow-md"
              >
                <img src={w.imagen_principal} alt={w.titulo} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition group-hover:from-slate-950/95" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="mb-2 inline-block w-fit rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    {w.categoria}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white">{w.titulo}</h3>
                  <p className="mt-0.5 text-xs text-slate-300">{w.anio}</p>
                </div>
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/0 text-white opacity-0 transition group-hover:bg-white/20 group-hover:opacity-100">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Banner 24/7 ---------- */
export function MaintenanceBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
      <img src="https://images.pexels.com/photos/19895885/pexels-photo-19895885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600" alt="Técnico" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-slate-950/85 to-slate-950/95" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <span className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Emergencias 24/7</span>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Mantenimiento mecánico 24/7 para tu estación de servicio
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          ¿Surtidor parado? ¿Falla en el despacho? Nuestro equipo técnico atiende emergencias a cualquier hora en La Paz y El Alto.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="tel:+59173741891" className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100">
            📞 +591 73741891
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-green-900/40 transition hover:-translate-y-0.5 hover:bg-green-500">
            WhatsApp directo
          </a>
        </div>
      </div>
    </section>
  );
}
