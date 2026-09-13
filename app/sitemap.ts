import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

// Genera /sitemap.xml con las páginas públicas. Las fichas de especie no se
// listan: /especies/[especie] solo redirige al panel lateral de /especies.
const rutas: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/especies", priority: 0.9 },
  { path: "/vedas", priority: 0.9 },
  { path: "/normativas", priority: 0.8 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority,
  }))
}
