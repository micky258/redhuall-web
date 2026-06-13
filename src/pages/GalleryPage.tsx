import { useState } from "react";
import { Link } from "react-router-dom";
import { WHATSAPP_URL } from "../components/Header";

type Project = {
  id: number;
  title: string;
  client: string;
  location: string;
  year: string;
  category: string;
  description: string;
  image: string;
  images: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "Estación de servicio Villa Fátima",
    client: "Estación Comercializadora del Sur",
    location: "La Paz, Bolivia",
    year: "2024",
    category: "Construcción",
    description:
      "Diseño y construcción completa de estación de servicio con 4 islas de despacho, sistema de telemedición y tienda de conveniencia. Ejecutado bajo normas NB-648, API y NFPA.",
    image: "https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    images: [
      "https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
      "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
      "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    ],
  },
  {
    id: 2,
    title: "Surtidores cuádruples en El Alto",
    client: "Distribuidora Andina SRL",
    location: "El Alto, La Paz",
    year: "2024",
    category: "Instalación",
    description:
      "Instalación de 6 surtidores cuádruples con sistema de facturación electrónica y control de inventarios en tiempo real.",
    image: "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    images: [
      "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
      "https://images.pexels.com/photos/29370541/pexels-photo-29370541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    ],
  },
  {
    id: 3,
    title: "Mantenimiento integral – Red de Estaciones",
    client: "Grupo Combustibles Bolivia",
    location: "La Paz, Cochabamba, Santa Cruz",
    year: "2023",
    category: "Mantenimiento",
    description:
      "Servicio de mantenimiento preventivo y correctivo en 12 estaciones a nivel nacional. Calibración anual y soporte 24/7.",
    image: "https://images.pexels.com/photos/19895885/pexels-photo-19895885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    images: [
      "https://images.pexels.com/photos/19895885/pexels-photo-19895885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
      "https://images.pexels.com/photos/34194575/pexels-photo-34194575.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
      "https://images.pexels.com/photos/19895870/pexels-photo-19895870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    ],
  },
  {
    id: 4,
    title: "Telemedición de tanques – Planta Industrial",
    client: "Minera del Altiplano S.A.",
    location: "Oruro, Bolivia",
    year: "2023",
    category: "Telemedición",
    description:
      "Implementación de sistema de telemedición con sondas capacitivas y consola central para monitoreo remoto de inventarios.",
    image: "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    images: [
      "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
      "https://images.pexels.com/photos/19286387/pexels-photo-19286387.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    ],
  },
  {
    id: 5,
    title: "Estación GNV – Zona Sur",
    client: "Transportes del Sur Ltda.",
    location: "La Paz, Bolivia",
    year: "2023",
    category: "Construcción",
    description:
      "Conversión y equipamiento de estación para despacho de Gas Natural Vehicular con compresores y dispensadores certificados.",
    image: "https://images.pexels.com/photos/12377481/pexels-photo-12377481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    images: [
      "https://images.pexels.com/photos/12377481/pexels-photo-12377481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
      "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    ],
  },
  {
    id: 6,
    title: "Repotenciación de surtidores",
    client: "Estación Miraflores",
    location: "La Paz, Bolivia",
    year: "2022",
    category: "Modernización",
    description:
      "Modernización de 4 surtidores con reemplazo total de computadores, displays LED y actualización de firmware.",
    image: "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    images: [
      "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
      "https://images.pexels.com/photos/36872836/pexels-photo-36872836.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1100",
    ],
  },
];

const categories = ["Todos", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function GalleryPage() {
  const [active, setActive] = useState("Todos");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = active === "Todos" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pb-20 pt-40 lg:pb-28 lg:pt-48">
        <img
          src="https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
          alt="Trabajos realizados"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400">
            <Link to="/" className="transition hover:text-white">Inicio</Link>
            <span>/</span>
            <span className="text-slate-400">Trabajos realizados</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Nuestros trabajos realizados
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
            Más de una década equipando estaciones de servicio en Bolivia.
            Conoce algunos de los proyectos que hemos ejecutado para nuestros clientes.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
            <div>
              <p className="font-display text-3xl font-bold text-red-500">50+</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">Proyectos ejecutados</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-red-500">3</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">Departamentos</p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-red-500">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">Normativa cumplida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <div className="sticky top-[72px] z-40 border-b border-slate-200 bg-white/95 py-4 shadow-sm backdrop-blur md:top-[88px]">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                active === c
                  ? "bg-red-600 text-white shadow-md shadow-red-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de proyectos */}
      <div className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          {filtered.length === 0 ? (
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
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {p.category}
                    </span>
                    <span className="absolute bottom-4 left-4 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900">
                      {p.year}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                      {p.client}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {p.location}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {p.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-red-600 transition group-hover:gap-3">
                      Ver detalles <span>→</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalle */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="grid lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-1 p-2 lg:grid-cols-1 lg:gap-2 lg:p-4">
                {selected.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${selected.title} - foto ${i + 1}`}
                    className="h-40 w-full rounded-xl object-cover lg:h-48"
                  />
                ))}
              </div>
              <div className="p-7 lg:p-10">
                <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">
                  {selected.category} · {selected.year}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-slate-900 lg:text-3xl">
                  {selected.title}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-red-600">
                  {selected.client}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {selected.location}
                </p>
                <p className="mt-5 leading-relaxed text-slate-600">{selected.description}</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-200 transition hover:bg-red-500"
                >
                  Quiero un proyecto similar
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="bg-slate-950 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            ¿Listo para tu próximo proyecto?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Conversemos sobre tu estación o negocio. Cotización sin compromiso y respuesta en menos de 24 horas.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500"
            >
              Cotizar mi proyecto
            </a>
            <Link
              to="/#contacto"
              className="rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-red-500 hover:text-red-400"
            >
              Más información
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
