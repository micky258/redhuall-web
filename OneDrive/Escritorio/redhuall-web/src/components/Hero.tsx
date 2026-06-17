import { useEffect, useState } from "react";
import { supabase, type HeroSlide } from "../lib/supabase";
import { WHATSAPP_URL } from "./Header";

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("hero_slides")
        .select("*")
        .eq("activo", true)
        .order("orden", { ascending: true });
      if (data && data.length > 0) {
        setSlides(data as HeroSlide[]);
      } else {
        // Fallback si no hay datos
        setSlides([
          {
            id: 1,
            tag: "Surtidores de combustible",
            titulo: "Surtidores y dispensadores para combustible líquido",
            texto: "En RedHuall te ofrecemos surtidores para gasolina y diésel diseñados para operar 24/7.",
            imagen_url: "https://images.pexels.com/photos/3971795/pexels-photo-3971795.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
            orden: 1,
            activo: true,
          },
          {
            id: 2,
            tag: "Soluciones integrales",
            titulo: "Soluciones integrales para estaciones de servicio",
            texto: "Proveemos equipamiento completo: surtidores, bombas, telemedición y sistemas de control.",
            imagen_url: "https://images.pexels.com/photos/7908624/pexels-photo-7908624.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
            orden: 2,
            activo: true,
          },
          {
            id: 3,
            tag: "Mantenimiento especializado",
            titulo: "Mantenimiento y calibración con precisión garantizada",
            texto: "Instalación, mantenimiento preventivo y correctivo, y calibración de surtidores.",
            imagen_url: "https://images.pexels.com/photos/34058522/pexels-photo-34058522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
            orden: 3,
            activo: true,
          },
        ]);
      }
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [slides.length]);

  if (loading) {
    return (
      <section className="flex h-[92vh] min-h-[600px] items-center justify-center bg-slate-950">
        <svg className="h-10 w-10 animate-spin text-red-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </section>
    );
  }

  const current = slides[index];

  return (
    <section id="inicio" className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-slate-950">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <img src={s.imagen_url} alt={s.titulo} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
        <div key={current.id} className="max-w-2xl animate-fade-up pt-20">
          <span className="mb-4 inline-block rounded-full border border-red-500/40 bg-red-600/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-400 backdrop-blur">
            {current.tag}
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {current.titulo}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {current.texto}
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
