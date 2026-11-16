import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"
import { especies } from "@/lib/especies-data"

// Genera /sitemap.xml con las páginas públicas y la ruta propia de cada
// pesquería que ya tiene ficha (las "Próximamente" no se listan).
const rutas: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/especies", priority: 0.9 },
  { path: "/vedas", priority: 0.9 },
  { path: "/normativas", priority: 0.8 },
  ...especies.filter((e) => e.ficha).map((e) => ({ path: `/especies/${e.id}`, priority: 0.7 })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority,
  }))
}
