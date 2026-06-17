import { createClient } from "@supabase/supabase-js";

// Credenciales públicas de Supabase (anon key es segura para el frontend)
const SUPABASE_URL = "https://zxafvswyaygmmohplsgo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_d2R5J781B80RwiF0TnKMqA_YzsSkwOi";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---- Tipos ---- */
export type HeroSlide = {
  id: number;
  tag: string;
  titulo: string;
  texto: string;
  imagen_url: string;
  orden: number;
  activo: boolean;
};

export type CategoriaHome = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  orden: number;
  activo: boolean;
};

export type Producto = {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  imagen_url: string;
  tags: string[];
  orden: number;
  activo: boolean;
};

export type Servicio = {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  orden: number;
  activo: boolean;
};

export type Trabajo = {
  id: number;
  titulo: string;
  cliente: string;
  ubicacion: string;
  anio: string;
  categoria: string;
  descripcion: string;
  imagen_principal: string;
  imagenes: string[];
  orden: number;
  activo: boolean;
};

export type Configuracion = {
  id: number;
  clave: string;
  valor: string;
};
