import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const WHATSAPP_URL =
  "https://wa.me/59173741891?text=Hola%20RedHuall%20Surtidores%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Productos", href: "/productos" },
  { label: "Trabajos", href: "/trabajos" },
  { label: "Contacto", href: "/#contacto" },
];

export function Logo(_: { dark?: boolean } = {}) {
  // Logo de RedHuall cargado desde la carpeta public/images/
  // Coloca tu archivo logo.png en public/images/logo.png
  const logoUrl = "/images/logo.png";

  const [imgError, setImgError] = useState(false);

  return (
    <Link to="/" className="flex items-center">
      {!imgError ? (
        <img
          src={logoUrl}
          alt="RedHuall Surtidores"
          className="h-12 w-auto object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        // Logo provisional mejorado (se muestra si el logo de Drive no carga)
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 via-red-700 to-red-900 shadow-lg shadow-red-900/40">
          <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
          <svg viewBox="0 0 24 24" className="relative h-7 w-7 text-white" fill="currentColor">
            <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
        </div>
      )}
    </Link>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const location = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const path = href.replace("/#", "");
      const el = document.getElementById(path);
      if (location.pathname !== "/") {
        window.location.href = href;
        return;
      }
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        onClick?.();
      }
    }
  };

  if (href.startsWith("/#")) {
    return (
      <a href={href} onClick={handleClick} className="text-sm font-semibold uppercase tracking-wider text-slate-200 transition hover:text-red-500">
        {children}
      </a>
    );
  }

  return (
    <Link to={href} onClick={onClick} className="text-sm font-semibold uppercase tracking-wider text-slate-200 transition hover:text-red-500">
      {children}
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [location]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-slate-950/95 shadow-xl shadow-black/20 backdrop-blur" : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      {/* Top bar */}
      <div className="hidden border-b border-white/10 bg-slate-950/60 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-slate-300">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              La Paz – Bolivia
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +591 73741891
            </span>
          </div>
          <span className="font-medium text-amber-400">⚙ Atención y soporte técnico 24/7</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 transition hover:bg-red-500"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Cotizar ahora
          </a>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-white lg:hidden"
          aria-label="Menú"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-white/10 bg-slate-950/98 px-4 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <div key={l.href} className="border-b border-white/5 py-3">
              <NavLink href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            </div>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-full bg-red-600 px-5 py-3 text-center text-sm font-bold text-white"
          >
            Cotizar por WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}

export { WHATSAPP_URL };
