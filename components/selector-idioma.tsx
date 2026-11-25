"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useIdioma } from "@/components/idioma-provider"
import { cn } from "@/lib/utils"
import { rutaLocal, sinPrefijo, type Idioma } from "@/lib/i18n"

const OPCIONES: { idioma: Idioma; corto: string; nombre: string }[] = [
  { idioma: "es", corto: "ES", nombre: "Español" },
  { idioma: "en", corto: "EN", nombre: "English" },
]

// Cambia entre español e inglés conservando la página. El href sirve para
// buscadores y para abrir en otra pestaña; al hacer clic se arma la ruta con la
// URL real del navegador, porque la ficha de especies la cambia con replaceState
// y conserva los filtros (?q=, ?zona=…).
export function SelectorIdioma({ className }: { className?: string }) {
  const { idioma } = useIdioma()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div
      className={cn("flex items-center rounded-full border border-teal-200 p-0.5 text-xs font-semibold", className)}
      role="group"
      aria-label={idioma === "en" ? "Language" : "Idioma"}
    >
      {OPCIONES.map((o) => {
        const activo = o.idioma === idioma
        return (
          <Link
            key={o.idioma}
            href={rutaLocal(o.idioma, sinPrefijo(pathname))}
            hrefLang={o.idioma}
            lang={o.idioma}
            title={o.nombre}
            aria-label={o.nombre}
            aria-current={activo ? "true" : undefined}
            onClick={(e) => {
              if (activo) return e.preventDefault()
              e.preventDefault()
              const { pathname: actual, search, hash } = window.location
              router.push(`${rutaLocal(o.idioma, sinPrefijo(actual))}${search}${hash}`)
            }}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              activo ? "bg-teal-600 text-white" : "text-gray-600 hover:text-teal-700",
            )}
          >
            {o.corto}
          </Link>
        )
      })}
    </div>
  )
}
