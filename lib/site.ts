import { IDIOMAS, LOCALE_OG, rutaLocal, type Idioma } from "@/lib/i18n"

// Nombre del sitio (títulos, imagen al compartir). Es la marca: no se traduce.
export const siteName = "Panorama Pesquero"

// URL del sitio en producción (imagen al compartir, robots.txt y sitemap.xml).
// Se puede sobrescribir con NEXT_PUBLIC_SITE_URL; si no está, en producción se usa
// el dominio oficial y en desarrollo localhost.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://panoramapesca.org" : "http://localhost:3000")
).replace(/\/+$/, "")

// Enlaces canónico y alternos (hreflang) de `path` ("/vedas") en cada idioma.
export function alternos(idioma: Idioma, path: string) {
  return {
    canonical: rutaLocal(idioma, path),
    languages: {
      ...Object.fromEntries(IDIOMAS.map((i) => [i, rutaLocal(i, path)])),
      "x-default": path,
    },
  }
}

// Metadatos de una sección. Next reemplaza (no combina) los objetos openGraph y
// twitter del layout raíz, así que se repiten aquí los campos compartidos.
// `path` va sin prefijo de idioma.
export function metadataSeccion({
  titulo,
  descripcion,
  path,
  idioma,
}: {
  titulo: string
  descripcion: string
  path: string
  idioma: Idioma
}) {
  return {
    title: titulo,
    description: descripcion,
    alternates: alternos(idioma, path),
    openGraph: {
      title: `${titulo} · ${siteName}`,
      description: descripcion,
      url: `${siteUrl}${rutaLocal(idioma, path)}`,
      siteName,
      locale: LOCALE_OG[idioma],
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${titulo} · ${siteName}`,
      description: descripcion,
    },
  }
}
