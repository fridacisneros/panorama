"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Compass, Fish, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIdioma } from "@/components/idioma-provider"
import type { Idioma } from "@/lib/i18n"

// Es componente de cliente para leer el idioma del layout (not-found.tsx no
// recibe params), así que no exporta metadata: Next le pone su título de 404.

// Accesos directos a las secciones principales para no dejar al usuario sin salida.
const secciones = [
  { href: "/especies", label: { es: "Pesquerías", en: "Fisheries" }, icon: Fish },
  { href: "/vedas", label: { es: "Vedas", en: "Closures" }, icon: Calendar },
  { href: "/normativas", label: { es: "Normativas", en: "Regulations" }, icon: Scale },
]

const TEXTOS: Record<Idioma, { titulo: string; texto: string; volver: string }> = {
  es: {
    titulo: "Página no encontrada",
    texto:
      "La página que buscas no existe o cambió de dirección. Revisa la URL o explora alguna de las secciones de Panorama Pesquero.",
    volver: "Volver al inicio",
  },
  en: {
    titulo: "Page not found",
    texto:
      "The page you're looking for doesn't exist or has moved. Check the URL or explore one of Panorama Pesquero's sections.",
    volver: "Back to home",
  },
}

export default function NotFound() {
  const { idioma, ruta } = useIdioma()
  const t = TEXTOS[idioma]
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:bg-none dark:bg-background">
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
            <Compass className="h-10 w-10 text-teal-600" />
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-600">Error 404</p>
          <h1 className="mb-3 text-3xl font-bold text-gray-800">{t.titulo}</h1>
          <p className="mb-8 text-gray-600">{t.texto}</p>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {secciones.map(({ href, label, icon: Icon }) => (
              <Button key={href} asChild variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                <Link href={ruta(href)}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label[idioma]}
                </Link>
              </Button>
            ))}
          </div>
          <Button asChild className="bg-teal-600 text-white hover:bg-teal-700">
            <Link href={ruta("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.volver}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
