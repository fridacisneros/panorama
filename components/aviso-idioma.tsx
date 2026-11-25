"use client"

import { Languages } from "lucide-react"
import { useIdioma } from "@/components/idioma-provider"
import { cn } from "@/lib/utils"

// En inglés sólo se traduce la interfaz: este aviso explica que los contenidos
// (fichas de la CNP, vedas, normas) se muestran en el español de sus fuentes.
// En español no se muestra.
export function AvisoIdioma({ className }: { className?: string }) {
  const { idioma } = useIdioma()
  if (idioma !== "en") return null
  return (
    <p
      className={cn(
        "mb-4 flex items-start gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-800",
        className,
      )}
    >
      <Languages className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>
        Fishery profiles, closure details and legal documents are shown in Spanish, as published by Mexico&apos;s
        official sources (National Fisheries Chart and Official Gazette of the Federation).
      </span>
    </p>
  )
}
