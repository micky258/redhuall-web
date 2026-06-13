import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Logo, WHATSAPP_URL } from "./Header";

/* ---------- Contacto ---------- */

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hola RedHuall Surtidores, soy ${form.name || "—"} (Tel: ${form.phone || "—"}).\n\n${form.message || "Quisiera más información sobre sus productos y servicios."}`
    );
    window.open(`https://wa.me/59173741891?text=${text}`, "_blank");
  };

  return (
    <section id="contacto" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">
              Contáctanos
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
              Impulsa tu estación al futuro energético
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-slate-600">
              Escríbenos y un asesor de RedHuall Surtidores te responderá a la brevedad.
              Cotizaciones sin compromiso para equipos, repuestos y servicios.
            </p>

            <div className="mt-8 space-y-5">
              <a href="tel:+59173741891" className="flex items-start gap-4 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-900">Teléfono / WhatsApp</p>
                  <p className="text-slate-600">+591 73741891</p>
                </div>
              </a>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-900">Ubicación</p>
                  <p className="text-slate-600">La Paz – Bolivia · Atendemos a nivel nacional</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-slate-900">Horario de atención</p>
                  <p className="text-slate-600">Lun – Sáb: 8:00 a 18:30 · Emergencias 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-xl shadow-slate-200/60 sm:p-9"
          >
            <h3 className="font-display text-2xl font-bold text-slate-900">
              Solicita tu cotización
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Completa el formulario y te contactamos por WhatsApp.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Tu nombre"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+591 ..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600">
                  ¿Qué necesitas?
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Ej.: Necesito mantenimiento para 2 surtidores en mi estación..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-200"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-green-200 transition hover:bg-green-500"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enviar por WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-14 text-slate-400">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 pb-12 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Soluciones integrales para estaciones de servicio: venta, instalación,
              mantenimiento y repuestos de surtidores de combustible en Bolivia.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold uppercase tracking-wider text-white">
              Enlaces
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="transition hover:text-red-500">Inicio</Link>
              </li>
              <li>
                <Link to="/#nosotros" className="transition hover:text-red-500">Nosotros</Link>
              </li>
              <li>
                <Link to="/productos" className="transition hover:text-red-500">Productos</Link>
              </li>
              <li>
                <Link to="/trabajos" className="transition hover:text-red-500">Trabajos realizados</Link>
              </li>
              <li>
                <Link to="/#servicios" className="transition hover:text-red-500">Servicios</Link>
              </li>
              <li>
                <Link to="/#contacto" className="transition hover:text-red-500">Contacto</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold uppercase tracking-wider text-white">
              Contacto
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>📍 La Paz – Bolivia</li>
              <li>
                📞{" "}
                <a href="tel:+59173741891" className="transition hover:text-red-500">
                  +591 73741891
                </a>
              </li>
              <li>
                💬{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-green-500"
                >
                  WhatsApp directo
                </a>
              </li>
              <li>🕒 Emergencias 24/7</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs">
          © {new Date().getFullYear()} RedHuall Surtidores · La Paz, Bolivia. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  );
}

/* ---------- Botón flotante WhatsApp ---------- */

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="whatsapp-pulse fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 hover:bg-green-400"
    >
      <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
