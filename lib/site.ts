// URL del sitio en producción (imagen al compartir, robots.txt y sitemap.xml).
// Configura NEXT_PUBLIC_SITE_URL en el hosting; el fallback es solo para local.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "")

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
      title: `${titulo} · Panorama`,
      description: descripcion,
      url: `${siteUrl}${path}`,
      siteName: "Panorama",
      locale: "es_MX",
      type: "website" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${titulo} · Panorama`,
      description: descripcion,
    },
  }
}
