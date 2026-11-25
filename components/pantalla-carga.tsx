"use client"

import { useIdioma } from "@/components/idioma-provider"
import type { Idioma } from "@/lib/i18n"

// Pantalla de carga de las secciones (loading.tsx), con el texto en el idioma actual.
export function PantallaCarga({ texto }: { texto: Record<Idioma, string> }) {
  const { idioma } = useIdioma()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:bg-none dark:bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto mb-4"></div>
        <p className="text-teal-600 text-lg font-medium">{texto[idioma]}</p>
      </div>
    </div>
  )
}
