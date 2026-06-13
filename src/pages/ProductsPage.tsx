import { useState } from "react";
import { Link } from "react-router-dom";
import { WHATSAPP_URL } from "../components/Header";

const categories = [
  { id: "todos", label: "Todos" },
  { id: "dispensadores", label: "Dispensadores" },
  { id: "repuestos", label: "Repuestos" },
  { id: "bombas", label: "Bombas y accesorios" },
  { id: "telemedicions", label: "Telemedición" },
  { id: "construccion", label: "Construcción" },
];

function cotizar(texto: string) {
  return `${WHATSAPP_URL.replace(
    "Hola%20RedHuall%20Surtidores%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n",
    encodeURIComponent(`Hola RedHuall Surtidores, quisiera cotizar: ${texto}`)
  )}`;
}

/* ---------- Subtarjetas de producto ---------- */

function ProductCard({
  image,
  title,
  description,
  tags,
  cta,
}: {
  image: string;
  title: string;
  description: string;
  tags?: string[];
  cta?: string;
}) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-60" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold text-slate-900">{title}</h3>
        {tags && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-600">
                {t}
              </span>
            ))}
          </div>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
        <a
          href={cotizar(cta || title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-red-600 transition group-hover:gap-3"
        >
          Cotizar este producto <span>→</span>
        </a>
      </div>
    </div>
  );
}

/* ---------- Secciones del catálogo ---------- */

const dispensadores = [
  {
    image: "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Surtidor monoblock 1 manguera",
    description: "Ideal para puntos de venta pequeños o consumo interno. Alta precisión, lectura clara y bajo mantenimiento.",
    tags: ["Gasolina", "Diésel"],
  },
  {
    image: "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Surtidor doble 2 mangueras",
    description: "Permite despachar dos productos simultáneamente. Perfecto para estaciones de servicio medianas con alto flujo.",
    tags: ["2 productos", "24/7"],
  },
  {
    image: "https://images.pexels.com/photos/12377481/pexels-photo-12377481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Surtidor cuádruple 4 mangueras",
    description: "Máxima capacidad de despacho para estaciones de alto volumen. Robustos, certificados y con múltiples configuraciones.",
    tags: ["Alto volumen", "4 mangueras"],
  },
  {
    image: "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Surtidor para GNV / GLP",
    description: "Dispensadores para gas natural vehicular y gas licuado de petróleo, con válvulas de seguridad y certificación para uso comercial.",
    tags: ["GNV", "GLP"],
  },
];

const repuestos = [
  {
    image: "https://images.pexels.com/photos/16679540/pexels-photo-16679540.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Medidores de flujo",
    description: "Medidores volumétricos y de desplazamiento positivo para gasolina, diésel y gasohol. Precisión garantizada.",
    tags: ["Volumétrico", "PD"],
  },
  {
    image: "https://images.pexels.com/photos/34194575/pexels-photo-34194575.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Computadores electrónicos",
    description: "CPU, displays, tarjetas principales y teclados para surtidores de las principales marcas del mercado.",
    tags: ["CPU", "Display"],
  },
  {
    image: "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Pistolas, mangueras y acoples",
    description: "Pistolas automáticas, mangueras reforzadas, acoples giratorios y breakaways para un despacho seguro.",
    tags: ["Pistolas", "Mangueras"],
  },
  {
    image: "https://images.pexels.com/photos/29370541/pexels-photo-29370541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Válvulas y filtros",
    description: "Válvulas de retención, solenoide, filtros de línea y cartuchos para proteger tus equipos y asegurar la calidad del combustible.",
    tags: ["Válvulas", "Filtros"],
  },
];

const bombas = [
  {
    image: "https://images.pexels.com/photos/16679540/pexels-photo-16679540.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Bombas sumergibles",
    description: "Bombas sumergibles para tanques de combustible. Silenciosas, eficientes y compatibles con distintos diámetros de tanque.",
    tags: ["Sumergible", "Tanque"],
  },
  {
    image: "https://images.pexels.com/photos/19895870/pexels-photo-19895870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Bombas de succión",
    description: "Equipos de succión para instalaciones sobre tanque. Robustas y fáciles de mantener.",
    tags: ["Succión", "Industrial"],
  },
  {
    image: "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Kits de instalación",
    description: "Tuberías, conexiones, racores, cajas de sumidero y todo lo necesario para una instalación profesional.",
    tags: ["Instalación", "Kits"],
  },
];

const telemedicions = [
  {
    image: "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Sondas de nivel capacitivas",
    description: "Sondas para medición continua de nivel, temperatura y detección de agua en tanques de combustible.",
    tags: ["Nivel", "Agua"],
  },
  {
    image: "https://images.pexels.com/photos/19286387/pexels-photo-19286387.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Consolas de telemedición",
    description: "Monitorea volumen, entradas, salidas y alarmas de fugas desde una sola consola centralizada.",
    tags: ["Consola", "Alarmas"],
  },
];

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

  const show = (id: string) => active === "todos" || active === id;

  return (
    <>
      {/* Hero de página */}
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-40 lg:pb-28 lg:pt-48">
        <img
          src="https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
          alt="Estación de servicio moderna"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            <Link to="/" className="transition hover:text-white">Inicio</Link>
            <span>/</span>
            <span className="text-slate-400">Productos</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Catálogo de productos y soluciones
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Explora nuestro catálogo completo de surtidores, repuestos, bombas,
            telemedición y servicios de construcción de estaciones de servicio.
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
                active === c.id
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* Dispensadores */}
        {show("dispensadores") && (
          <section id="dispensadores" className="mb-20 scroll-mt-40">
            <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Línea principal</span>
                <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Dispensadores y surtidores</h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Equipos para gasolina, diésel, gasohol, GNV y GLP. Monoblock, dobles y cuádruples según la necesidad de tu estación.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dispensadores.map((p) => (
                <ProductCard key={p.title} {...p} />
              ))}
            </div>
          </section>
        )}

        {/* Repuestos */}
        {show("repuestos") && (
          <section id="repuestos" className="mb-20 scroll-mt-40">
            <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Stock permanente</span>
                <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Repuestos y accesorios</h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Repuestos originales y genéricos de alta calidad para mantener tus equipos operando al 100%.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {repuestos.map((p) => (
                <ProductCard key={p.title} {...p} />
              ))}
            </div>
          </section>
        )}

        {/* Bombas */}
        {show("bombas") && (
          <section id="bombas" className="mb-20 scroll-mt-40">
            <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Sistemas de bombeo</span>
                <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Bombas y accesorios de instalación</h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Bombas sumergibles y de succión, kits de tubería y accesorios para instalaciones nuevas o repotenciación.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bombas.map((p) => (
                <ProductCard key={p.title} {...p} />
              ))}
            </div>
          </section>
        )}

        {/* Telemedición */}
        {show("telemedicions") && (
          <section id="telemedicions" className="mb-20 scroll-mt-40">
            <div className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">Control de inventario</span>
                <h2 className="mt-1 font-display text-3xl font-bold text-slate-900">Telemedición de tanques</h2>
              </div>
              <p className="max-w-md text-sm text-slate-600">
                Controla tu inventario de combustible en tiempo real y reduce pérdidas por fugas, errores o desajustes.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {telemedicions.map((p) => (
                <ProductCard key={p.title} {...p} />
              ))}
            </div>
          </section>
        )}

        {/* Construcción de estaciones */}
        {show("construccion") && (
          <section id="construccion" className="scroll-mt-40">
            <div className="overflow-hidden rounded-3xl bg-slate-950">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src="https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200"
                    alt="Construcción de estación de servicio"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-slate-950/80 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950" />
                </div>
                <div className="p-8 lg:p-12">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">Servicio integral</span>
                  <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                    Construcción de estaciones de servicio
                  </h2>
                  <p className="mt-4 leading-relaxed text-slate-300">
                    Diseñamos y construimos estaciones de servicio llave en mano, cumpliendo
                    con todas las normativas nacionales e internacionales vigentes en Bolivia.
                    Gestionamos el proyecto desde el plano inicial hasta la puesta en marcha.
                  </p>

                  <h3 className="mt-8 font-display text-lg font-bold uppercase tracking-wide text-white">
                    Normas y estándares que aplicamos
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {normas.map((n) => (
                      <li key={n} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                          ✓
                        </span>
                        {n}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={cotizar("Construcción de estación de servicio")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-red-600 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500"
                    >
                      Solicitar proyecto
                    </a>
                    <Link
                      to="/#contacto"
                      className="rounded-full border-2 border-white/30 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-red-500 hover:text-red-400"
                    >
                      Hablar con un asesor
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CTA final */}
      <section className="bg-red-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-red-100">
            Contamos con catálogo extendido de repuestos y accesorios. Escríbenos y te
            ayudamos a identificar exactamente lo que necesitas.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-red-600 shadow-xl transition hover:-translate-y-0.5"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
