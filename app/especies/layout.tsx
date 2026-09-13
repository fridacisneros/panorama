import type React from "react"
import type { Metadata } from "next"
import { metadataSeccion } from "@/lib/site"

// La página es un componente de cliente y no puede exportar metadata: se define aquí.
export const metadata: Metadata = metadataSeccion({
  titulo: "Pesquerías",
  descripcion: "Fichas de las principales pesquerías de México según la Carta Nacional Pesquera: especies, regiones, captura, estado de aprovechamiento y normatividad aplicable.",
  path: "/especies",
})

export default function EspeciesLayout({ children }: { children: React.ReactNode }) {
  return children
}
