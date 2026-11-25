import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"
import { especies } from "@/lib/especies-data"
import { IDIOMAS, rutaLocal } from "@/lib/i18n"

// Genera /sitemap.xml con las páginas públicas y la ruta propia de cada
// pesquería (todas las publicadas tienen ficha), en español (sin prefijo) y en
// inglés (/en), cada una con sus alternas por idioma.
const rutas: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/especies", priority: 0.9 },
  { path: "/vedas", priority: 0.9 },
  { path: "/normativas", priority: 0.8 },
  ...especies.map((e) => ({ path: `/especies/${e.id}`, priority: 0.7 })),
]

const url = (path: string) => `${siteUrl}${path === "/" ? "" : path}`

export default function sitemap(): MetadataRoute.Sitemap {
  return IDIOMAS.flatMap((idioma) =>
    rutas.map(({ path, priority }) => ({
      url: url(rutaLocal(idioma, path)),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(IDIOMAS.map((i) => [i, url(rutaLocal(i, path))])),
      },
    })),
  )
}
