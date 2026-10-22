// Nombre del sitio (títulos, imagen al compartir).
export const siteName = "Panorama Pesquero"

// URL del sitio en producción (imagen al compartir, robots.txt y sitemap.xml).
// Se puede sobrescribir con NEXT_PUBLIC_SITE_URL; si no está, en producción se usa
// el dominio oficial y en desarrollo localhost.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? "https://panoramapesca.org" : "http://localhost:3000")
).replace(/\/+$/, "")

// Metadatos de una sección. Next reemplaza (no combina) los objetos openGraph y
// twitter del layout raíz, así que se repiten aquí los campos compartidos.
export function metadataSeccion({
  titulo,
  descripcion,
  path,
}: {
  titulo: string
  descripcion: string
  path: string
}) {
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: path },
    openGraph: {
      title: `${titulo} · ${siteName}`,
      description: descripcion,
      url: `${siteUrl}${path}`,
      siteName,
      locale: "es_MX",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${titulo} · ${siteName}`,
      description: descripcion,
    },
  }
}
