import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, type Trabajo } from "../lib/supabase";
import { WHATSAPP_URL } from "../components/Header";

function cotizar(texto: string) {
  return `${WHATSAPP_URL.replace(
    "Hola%20RedHuall%20Surtidores%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n",
    encodeURIComponent(`Hola RedHuall Surtidores, quisiera cotizar: ${texto}`)
  )}`;
}

export default function GalleryPage() {
  const [active, setActive] = useState("Todos");
  const [selected, setSelected] = useState<Trabajo | null>(null);
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("trabajos")
        .select("*")
        .eq("activo", true)
        .order("orden");
      if (data && data.length > 0) {
        setTrabajos(data as Trabajo[]);
      } else {
        // Fallback con datos de referencia
        setTrabajos([
          { id: 1, titulo: "Estación de servicio Villa Fátima", cliente: "Estación Comercializadora del Sur", ubicacion: "La Paz, Bolivia", anio: "2024", categoria: "Construcción", descripcion: "Diseño y construcción completa de estación de servicio con 4 islas de despacho, sistema de telemedición y tienda de conveniencia. Bajo normas NB-648, API y NFPA.", imagen_principal: "https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", imagenes: ["https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100"], orden: 1, activo: true },
          { id: 2, titulo: "Surtidores cuádruples en El Alto", cliente: "Distribuidora Andina SRL", ubicacion: "El Alto, La Paz", anio: "2024", categoria: "Instalación", descripcion: "Instalación de 6 surtidores cuádruples con sistema de facturación electrónica y control de inventarios en tiempo real.", imagen_principal: "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", imagenes: ["https://images.pexels.com/photos/29370541/pexels-photo-29370541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100"], orden: 2, activo: true },
          { id: 3, titulo: "Mantenimiento integral – Red de Estaciones", cliente: "Grupo Combustibles Bolivia", ubicacion: "La Paz, Cochabamba, Santa Cruz", anio: "2023", categoria: "Mantenimiento", descripcion: "Servicio de mantenimiento preventivo y correctivo en 12 estaciones a nivel nacional. Calibración anual y soporte 24/7.", imagen_principal: "https://images.pexels.com/photos/19895885/pexels-photo-19895885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", imagenes: ["https://images.pexels.com/photos/34194575/pexels-photo-34194575.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100"], orden: 3, activo: true },
          { id: 4, titulo: "Estación GNV Zona Sur", cliente: "Transportes del Sur Ltda.", ubicacion: "La Paz, Bolivia", anio: "2023", categoria: "Construcción", descripcion: "Conversión y equipamiento de estación para despacho de Gas Natural Vehicular con compresores y dispensadores certificados.", imagen_principal: "https://images.pexels.com/photos/12377481/pexels-photo-12377481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", imagenes: ["https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100"], orden: 4, activo: true },
          { id: 5, titulo: "Telemedición – Planta Industrial", cliente: "Minera del Altiplano S.A.", ubicacion: "Oruro, Bolivia", anio: "2023", categoria: "Telemedición", descripcion: "Implementación de sistema de telemedición con sondas capacitivas y consola central para monitoreo remoto de inventarios.", imagen_principal: "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", imagenes: [], orden: 5, activo: true },
          { id: 6, titulo: "Repotenciación de surtidores", cliente: "Estación Miraflores", ubicacion: "La Paz, Bolivia", anio: "2022", categoria: "Modernización", descripcion: "Modernización de 4 surtidores con reemplazo total de computadores, displays LED y actualización de firmware.", imagen_principal: "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100", imagenes: [], orden: 6, activo: true },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const categories = ["Todos", ...Array.from(new Set(trabajos.map((p) => p.categoria).filter(Boolean)))];
  const filtered = active === "Todos" ? trabajos : trabajos.filter((p) => p.categoria === active);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-40 lg:pb-28 lg:pt-48">
        <img src="https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600" alt="Trabajos realizados" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            <Link to="/" className="transition hover:text-white">Inicio</Link><span>/</span><span className="text-slate-400">Trabajos realizados</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">Nuestros trabajos realizados</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Más de una década equipando estaciones de servicio en Bolivia. Conoce algunos de los proyectos que hemos ejecutado.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
            <div>
              <p className="font-display text-3xl font-bold text-red-500">{trabajos.length}+</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">Proyectos ejecutados</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-red-500">{categories.length - 1}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">Categorías</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-red-500">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">Normativa cumplida</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-[72px] z-40 border-b border-slate-200 bg-white/95 py-4 shadow-sm backdrop-blur md:top-[88px]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                active === c ? "bg-red-600 text-white shadow-md shadow-red-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <svg className="h-10 w-10 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-12 text-center text-slate-500">No hay proyectos en esta categoría.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={p.imagen_principal} alt={p.titulo} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{p.categoria}</span>
                    <span className="absolute bottom-4 left-4 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900">{p.anio}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-slate-900">{p.titulo}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-red-600">{p.cliente}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {p.ubicacion}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{p.descripcion}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-red-600 transition group-hover:gap-3">Ver detalles <span>→</span></span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div onClick={() => setSelected(null)} className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur">
          <div onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <button onClick={() => setSelected(null)} aria-label="Cerrar" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="grid lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-1 p-2 lg:grid-cols-1 lg:gap-2 lg:p-4">
                {[selected.imagen_principal, ...(selected.imagenes || [])].map((img, i) => (
                  <img key={i} src={img} alt={`${selected.titulo} - foto ${i + 1}`} className="h-40 w-full rounded-xl object-cover lg:h-48" />
                ))}
              </div>
              <div className="p-7 lg:p-10">
                <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">{selected.categoria} · {selected.anio}</span>
                <h2 className="mt-4 font-display text-2xl font-bold text-slate-900 lg:text-3xl">{selected.titulo}</h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-red-600">{selected.cliente}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {selected.ubicacion}
                </p>
                <p className="mt-5 leading-relaxed text-slate-600">{selected.descripcion}</p>
                <a href={cotizar(`proyecto similar: ${selected.titulo}`)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-200 transition hover:bg-red-500">
                  Quiero un proyecto similar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">¿Listo para tu próximo proyecto?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">Conversemos sobre tu estación. Cotización sin compromiso.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500">Cotizar mi proyecto</a>
            <Link to="/#contacto" className="rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-red-500 hover:text-red-400">Más información</Link>
          </div>
        </div>
      </section>
    </>
  );
}
