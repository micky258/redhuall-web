import { Link } from "react-router-dom";
import { WHATSAPP_URL } from "./Header";

/* ---------- Nosotros / Por qué elegirnos ---------- */

const features = [
  {
    icon: "🏆",
    title: "Experiencia comprobada",
    text: "Empresa boliviana con amplia trayectoria brindando soluciones para estaciones de servicio en La Paz y todo el país.",
  },
  {
    icon: "⚙️",
    title: "Marcas líderes",
    text: "Trabajamos con equipos y repuestos de fabricantes reconocidos internacionalmente, robustos y confiables.",
  },
  {
    icon: "🛠️",
    title: "Soporte especializado",
    text: "Un equipo de técnicos expertos disponible para mantener tu operación siempre en marcha, sin interrupciones.",
  },
  {
    icon: "✅",
    title: "Equipos certificados",
    text: "Productos que cumplen normas internacionales, con garantía y repuestos disponibles para el mercado boliviano.",
  },
];

export function About() {
  return (
    <section id="nosotros" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
              ¿Quiénes somos?
            </span>
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
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-100"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-2xl">
                  {f.icon}
                </div>
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

/* ---------- Productos ---------- */

const products = [
  {
    image:
      "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Surtidores de combustible",
    text: "Dispensadores para gasolina y diésel de alta precisión, diseñados para operar 24/7 con bajo mantenimiento.",
  },
  {
    image:
      "https://images.pexels.com/photos/29370541/pexels-photo-29370541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Bombas y pistolas de despacho",
    text: "Bombas sumergibles y de succión, mangueras, pistolas y accesorios compatibles con las principales marcas del mercado.",
  },
  {
    image:
      "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Repuestos y accesorios",
    text: "Stock permanente de repuestos originales: medidores, computadores, válvulas, filtros y componentes electrónicos.",
  },
  {
    image:
      "https://images.pexels.com/photos/12756856/pexels-photo-12756856.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Telemedición de tanques",
    text: "Consolas y sondas de nivel para monitorear el volumen de combustible, detectar variaciones y reducir pérdidas de inventario.",
  },
  {
    image:
      "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Construcción de estaciones",
    text: "Diseño y construcción de estaciones de servicio cumpliendo normas NB-648, API, NFPA, OSH y medio ambiente de YPFB.",
  },
];

export function Products() {
  return (
    <section id="productos" className="bg-slate-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
            Nuestros productos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Categorías destacadas
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Equipamiento completo para estaciones de servicio, flotas y consumo interno,
            con soporte técnico y repuestos en Bolivia.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {products.map((p) => (
            <div
              key={p.title}
              className="group overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-white/10 transition hover:-translate-y-1.5 hover:ring-red-500/50"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.text}</p>
                <a
                  href={WHATSAPP_URL}
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
      </div>
    </section>
  );
}

/* ---------- Servicios ---------- */

const services = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
    title: "Mantenimiento mecánico 24/7",
    text: "Mantenimiento preventivo y correctivo de surtidores y bombas, con atención de emergencias las 24 horas para que tu estación nunca pare.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Soluciones eléctricas y electrónicas",
    text: "Diagnóstico y reparación de computadores de surtidor, tarjetas electrónicas, displays y sistemas eléctricos de la estación.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Calibración de precisión",
    text: "Calibración y certificación de surtidores con serafines patrón, garantizando despachos exactos y cumplimiento de normativas.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75m4.5-10.5v1.5m0 3v1.5m0 3v1.5" />
      </svg>
    ),
    title: "Instalación de estaciones",
    text: "Montaje e instalación completa de islas de despacho, tuberías, tanques y surtidores con estándares internacionales de seguridad.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    title: "Automatización y control",
    text: "Sistemas de facturación, control de despachos y automatización para supervisar y gestionar tu estación en tiempo real.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: "Asesoría especializada",
    text: "Consultoría técnica para proyectos nuevos, ampliaciones y modernización de estaciones de servicio en todo el territorio boliviano.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
            Nuestros servicios
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
            Más que productos, soluciones integrales
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            En RedHuall ofrecemos tecnología y soporte para que tu operación funcione de
            manera eficiente y segura.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-red-300 hover:shadow-xl hover:shadow-red-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-300 transition group-hover:scale-110">
                {s.icon}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Trabajos Realizados (preview) ---------- */

const workPreview = [
  {
    image:
      "https://images.pexels.com/photos/28861585/pexels-photo-28861585.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Estación Villa Fátima",
    category: "Construcción",
    year: "2024",
  },
  {
    image:
      "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Surtidores El Alto",
    category: "Instalación",
    year: "2024",
  },
  {
    image:
      "https://images.pexels.com/photos/19895885/pexels-photo-19895885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Mantenimiento Red Nacional",
    category: "Mantenimiento",
    year: "2023",
  },
  {
    image:
      "https://images.pexels.com/photos/12377481/pexels-photo-12377481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=800",
    title: "Estación GNV Zona Sur",
    category: "Construcción",
    year: "2023",
  },
];

export function WorksPreview() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
              Portafolio
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Trabajos realizados
            </h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Conoce algunos de los proyectos que hemos ejecutado para estaciones de
              servicio y plantas industriales en Bolivia.
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {workPreview.map((w) => (
            <Link
              key={w.title}
              to="/trabajos"
              className="group relative h-64 overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={w.image}
                alt={w.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition group-hover:from-slate-950/95" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="mb-2 inline-block w-fit rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  {w.category}
                </span>
                <h3 className="font-display text-lg font-bold text-white">{w.title}</h3>
                <p className="mt-0.5 text-xs text-slate-300">{w.year}</p>
              </div>
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/0 text-white opacity-0 transition group-hover:bg-white/20 group-hover:opacity-100">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Banner Mantenimiento 24/7 ---------- */

export function MaintenanceBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
      <img
        src="https://images.pexels.com/photos/19895885/pexels-photo-19895885.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600"
        alt="Técnico especializado"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-slate-950/85 to-slate-950/95" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        <span className="inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
          Emergencias 24/7
        </span>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          Mantenimiento mecánico 24/7 para tu estación de servicio
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          ¿Surtidor parado? ¿Falla en el despacho? Nuestro equipo técnico atiende
          emergencias a cualquier hora en La Paz y El Alto. Llámanos y volvemos a poner tu
          estación en marcha.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+59173741891"
            className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            📞 +591 73741891
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-green-900/40 transition hover:-translate-y-0.5 hover:bg-green-500"
          >
            WhatsApp directo
          </a>
        </div>
      </div>
    </section>
  );
}
