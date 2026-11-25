"use client"

import { createContext, useContext, type ReactNode } from "react"
import { IDIOMA_PREDETERMINADO, rutaLocal, type Idioma } from "@/lib/i18n"

const IdiomaContext = createContext<Idioma>(IDIOMA_PREDETERMINADO)

// Lo pone app/[lang]/layout.tsx: los componentes de cliente leen el idioma de
// aquí en vez de deducirlo de la URL.
export function IdiomaProvider({ idioma, children }: { idioma: Idioma; children: ReactNode }) {
  return <IdiomaContext.Provider value={idioma}>{children}</IdiomaContext.Provider>
}

// Idioma actual y `ruta()` para armar enlaces internos con su prefijo.
export function useIdioma() {
  const idioma = useContext(IdiomaContext)
  return { idioma, ruta: (path: string) => rutaLocal(idioma, path) }
}
