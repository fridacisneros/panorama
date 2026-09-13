import type React from "react"
import type { Metadata } from "next"
import { metadataSeccion } from "@/lib/site"

// La página es un componente de cliente y no puede exportar metadata: se define aquí.
export const metadata: Metadata = metadataSeccion({
  titulo: "Biblioteca normativa",
  descripcion: "Leyes, reglamentos, normas oficiales mexicanas y acuerdos que regulan la pesca en México, con enlaces para consultar y descargar cada documento.",
  path: "/normativas",
})

export default function NormativasLayout({ children }: { children: React.ReactNode }) {
  return children
}
