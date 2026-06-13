import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "./Header";

const slides = [
  {
    image:
      "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    tag: "Surtidores de combustible",
    title: "Surtidores y dispensadores para combustible líquido",
    text: "En RedHuall te ofrecemos surtidores para gasolina y diésel diseñados para operar 24/7, con alta precisión de despacho y respaldo técnico en toda Bolivia.",
  },
  {
    image:
      "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    tag: "Soluciones integrales",
    title: "Soluciones integrales para estaciones de servicio",
    text: "Proveemos equipamiento completo: surtidores, bombas, telemedición y sistemas de control. Un servicio 360° que integra venta, instalación, soporte técnico y repuestos.",
  },
  {
    image:
      "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    tag: "Mantenimiento especializado",
    title: "Mantenimiento y calibración con precisión garantizada",
    text: "Instalación, mantenimiento preventivo y correctivo, y calibración de surtidores con estándares internacionales. Tu estación siempre operativa.",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="inicio" className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
        <div key={index} className="max-w-2xl animate-fade-up pt-20">
          <span className="mb-4 inline-block rounded-full border border-red-500/40 bg-red-600/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-400 backdrop-blur">
            {slides[index].tag}
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {slides[index].title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {slides[index].text}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-red-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-red-900/40 transition hover:-translate-y-0.5 hover:bg-red-500"
            >
              Solicitar cotización
            </a>
            <a
              href="#productos"
              className="rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur transition hover:border-red-500 hover:text-red-400"
            >
              Ver productos
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-10 bg-red-500" : "w-5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
