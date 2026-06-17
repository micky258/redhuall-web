import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase, type Producto } from "../lib/supabase";
import { WHATSAPP_URL } from "../components/Header";

const categories = [
  { id: "todos", label: "Todos" },
  { id: "dispensadores", label: "Dispensadores" },
  { id: "repuestos", label: "Repuestos" },
  { id: "bombas", label: "Bombas y accesorios" },
  { id: "telemedicion", label: "Telemedición" },
  { id: "construccion", label: "Construcción" },
];

function cotizar(texto: string) {
  return `${WHATSAPP_URL.replace(
    "Hola%20RedHuall%20Surtidores%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n",
    encodeURIComponent(`Hola RedHuall Surtidores, quisiera cotizar: ${texto}`)
  )}`;
}

function ProductCard({ p }: { p: Producto }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="relative h-52 overflow-hidden">
        <img src={p.imagen_url} alt={p.titulo} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-60" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-slate-900">{p.titulo}</h3>
        {p.tags && p.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600">{t}</span>
            ))}
          </div>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.descripcion}</p>
        <a href={cotizar(p.titulo)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-red-600 transition group-hover:gap-3">
          Cotizar este producto <span>→</span>
        </a>
      </div>
    </div>
  );
}

const normas = [
  "NB-648 – Norma Boliviana para instalaciones de estaciones de servicio",
  "API – Estándares americanos para equipos de almacenamiento y dispensado",
  "NFPA – Normas de protección contra incendios",
  "OSH / seguridad industrial – Protocolos de salud ocupacional",
  "Medio ambiente – Tratamiento de aguas, derrames y residuos peligrosos",
  "YPFB – Requisitos y lineamientos de Yacimientos Petrolíferos Fiscales Bolivianos",
];

export default function ProductsPage() {
  const [active, setActive] = useState("todos");
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("productos")
        .select("*")
        .eq("activo", true)
        .order("orden");
      if (data && data.length > 0) {
        setProductos(data as Producto[]);
      } else {
        // Fallback con datos de referencia
        setProductos([
          { id: 1, categoria: "dispensadores", titulo: "Surtidor monoblock 1 manguera", descripcion: "Ideal para puntos de venta pequeños o consumo interno. Alta precisión, lectura clara y bajo mantenimiento.", imagen_url: "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Gasolina","Diésel"], orden: 1, activo: true },
          { id: 2, categoria: "dispensadores", titulo: "Surtidor doble 2 mangueras", descripcion: "Permite despachar dos productos simultáneamente. Perfecto para estaciones medianas con alto flujo.", imagen_url: "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["2 productos","24/7"], orden: 2, activo: true },
          { id: 3, categoria: "dispensadores", titulo: "Surtidor cuádruple 4 mangueras", descripcion: "Máxima capacidad de despacho para estaciones de alto volumen. Robustos y certificados.", imagen_url: "https://images.pexels.com/photos/12377481/pexels-photo-12377481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Alto volumen","4 mangueras"], orden: 3, activo: true },
          { id: 4, categoria: "dispensadores", titulo: "Surtidor para GNV / GLP", descripcion: "Dispensadores para gas natural vehicular y gas licuado de petróleo, con válvulas de seguridad.", imagen_url: "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["GNV","GLP"], orden: 4, activo: true },
          { id: 5, categoria: "repuestos", titulo: "Medidores de flujo", descripcion: "Medidores volumétricos y de desplazamiento positivo para gasolina, diésel y gasohol.", imagen_url: "https://images.pexels.com/photos/16679540/pexels-photo-16679540.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Volumétrico","PD"], orden: 5, activo: true },
          { id: 6, categoria: "repuestos", titulo: "Computadores electrónicos", descripcion: "CPU, displays, tarjetas principales y teclados para surtidores de las principales marcas.", imagen_url: "https://images.pexels.com/photos/34194575/pexels-photo-34194575.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["CPU","Display"], orden: 6, activo: true },
          { id: 7, categoria: "repuestos", titulo: "Pistolas, mangueras y acoples", descripcion: "Pistolas automáticas, mangueras reforzadas, acoples giratorios y breakaways para un despacho seguro.", imagen_url: "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Pistolas","Mangueras"], orden: 7, activo: true },
          { id: 8, categoria: "repuestos", titulo: "Válvulas y filtros", descripcion: "Válvulas de retención, solenoide, filtros de línea y cartuchos para proteger tus equipos.", imagen_url: "https://images.pexels.com/photos/29370541/pexels-photo-29370541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Válvulas","Filtros"], orden: 8, activo: true },
          { id: 9, categoria: "bombas", titulo: "Bombas sumergibles", descripcion: "Bombas sumergibles para tanques de combustible. Silenciosas, eficientes y compatibles con distintos tanques.", imagen_url: "https://images.pexels.com/photos/16679540/pexels-photo-16679540.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Sumergible","Tanque"], orden: 9, activo: true },
          { id: 10, categoria: "bombas", titulo: "Bombas de succión", descripcion: "Equipos de succión para instalaciones sobre tanque. Robustas y fáciles de mantener.", imagen_url: "https://images.pexels.com/photos/19895870/pexels-photo-19895870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Succión","Industrial"], orden: 10, activo: true },
          { id: 11, categoria: "bombas", titulo: "Kits de instalación", descripcion: "Tuberías, conexiones, racores, cajas de sumidero y todo lo necesario para una instalación profesional.", imagen_url: "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Instalación","Kits"], orden: 11, activo: true },
          { id: 12, categoria: "telemedicion", titulo: "Sondas de nivel capacitivas", descripcion: "Sondas para medición continua de nivel, temperatura y detección de agua en tanques.", imagen_url: "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Nivel","Agua"], orden: 12, activo: true },
          { id: 13, categoria: "telemedicion", titulo: "Consolas de telemedición", descripcion: "Monitorea volumen, entradas, salidas y alarmas de fugas desde una sola consola centralizada.", imagen_url: "https://images.pexels.com/photos/19286387/pexels-photo-19286387.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800", tags: ["Consola","Alarmas"], orden: 13, activo: true },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  const show = (id: string) => active === "todos" || active === id;

  const productosByCategory = (cat: string) => productos.filter((p) => p.categoria === cat);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-40 lg:pb-28 lg:pt-48">
        <img src="https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600" alt="Estación de servicio moderna" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            <Link to="/" className="transition hover:text-white">Inicio</Link><span>/</span><span className="text-slate-400">Productos</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">Catálogo de productos y soluciones</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Explora nuestro catálogo completo de surtidores, repuestos, bombas, telemedición y servicios de construcción de estaciones de servicio.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <div className="sticky top-[72px] z-40 border-b border-slate-200 bg-white/95 py-4 shadow-sm backdrop-blur md:top-[88px]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                active === c.id ? "bg-red-600 text-white shadow-md shadow-red-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14">
        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="h-10 w-10 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : productos.length === 0 ? (
          <div className="py-20 text-center text-slate-500">Próximamente subiremos el catálogo aquí.</div>
        ) : (
          <>
            {/* Dispensadores */}
            {show("dispensadores") && productosByCategory("dispensadores").length > 0 && (
              <section id="dispensadores" className="mb-20 scroll-mt-40">
                <div className="mb-8 border-b border-slate-200 pb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Línea principal</span>
                  <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Dispensadores y surtidores</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {productosByCategory("dispensadores").map((p) => <ProductCard key={p.id} p={p} />)}
                </div>
              </section>
            )}
            {show("repuestos") && productosByCategory("repuestos").length > 0 && (
              <section id="repuestos" className="mb-20 scroll-mt-40">
                <div className="mb-8 border-b border-slate-200 pb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Stock permanente</span>
                  <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Repuestos y accesorios</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {productosByCategory("repuestos").map((p) => <ProductCard key={p.id} p={p} />)}
                </div>
              </section>
            )}
            {show("bombas") && productosByCategory("bombas").length > 0 && (
              <section id="bombas" className="mb-20 scroll-mt-40">
                <div className="mb-8 border-b border-slate-200 pb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Sistemas de bombeo</span>
                  <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Bombas y accesorios de instalación</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {productosByCategory("bombas").map((p) => <ProductCard key={p.id} p={p} />)}
                </div>
              </section>
            )}
            {show("telemedicion") && productosByCategory("telemedicion").length > 0 && (
              <section id="telemedicion" className="mb-20 scroll-mt-40">
                <div className="mb-8 border-b border-slate-200 pb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Control de inventario</span>
                  <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Telemedición de tanques</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {productosByCategory("telemedicion").map((p) => <ProductCard key={p.id} p={p} />)}
                </div>
              </section>
            )}
            {show("construccion") && (
              <section id="construccion" className="scroll-mt-40">
                <div className="overflow-hidden rounded-3xl bg-slate-950">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <img src="https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200" alt="Construcción de estación de servicio" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-slate-950/80 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950" />
                    </div>
                    <div className="p-8 lg:p-12">
                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Servicio integral</span>
                      <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Construcción de estaciones de servicio</h2>
                      <p className="mt-4 leading-relaxed text-slate-300">
                        Diseñamos y construimos estaciones de servicio llave en mano, cumpliendo con todas las normativas nacionales e internacionales vigentes en Bolivia.
                      </p>
                      <h3 className="mt-8 font-display text-lg font-bold uppercase tracking-wide text-white">Normas y estándares que aplicamos</h3>
                      <ul className="mt-4 space-y-3">
                        {normas.map((n) => (
                          <li key={n} className="flex items-start gap-3 text-sm text-slate-300">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">✓</span>
                            {n}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-8 flex flex-wrap gap-4">
                        <a href={cotizar("Construcción de estación de servicio")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-red-600 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500">
                          Solicitar proyecto
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <section className="bg-red-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">¿No encuentras lo que buscas?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-red-100">Contamos con catálogo extendido de repuestos y accesorios. Escríbenos y te ayudamos.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-red-600 shadow-xl transition hover:-translate-y-0.5">
            💬 Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
