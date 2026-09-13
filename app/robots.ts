import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

// Genera /robots.txt. Se excluye /api/: solo expone el proxy de descargas de
// documentos oficiales, que no aporta contenido propio para indexar.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
