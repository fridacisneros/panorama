import type React from "react"
import type { Metadata } from "next"
import { metadataSeccion } from "@/lib/site"

// La página es un componente de cliente y no puede exportar metadata: se define aquí.
export const metadata: Metadata = metadataSeccion({
  titulo: "Calendario de vedas",
  descripcion: "Consulta los periodos de veda de las pesquerías de México por especie y región, con su fundamento en el Diario Oficial de la Federación.",
  path: "/vedas",
})

export default function VedasLayout({ children }: { children: React.ReactNode }) {
  return children
}
