import { supabase } from "./supabase";

/**
 * Sube una imagen al Storage de Supabase y retorna la URL pública
 */
export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from("imagenes")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new Error("Error al subir imagen: " + error.message);

  const { data } = supabase.storage.from("imagenes").getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Convierte un blob/archivo pegado (Ctrl+V) en File
 */
export function blobToFile(blob: Blob, name = "imagen-pegada.png"): File {
  return new File([blob], name, { type: blob.type || "image/png" });
}
