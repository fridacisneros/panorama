import type React from "react"
import type { Metadata } from "next"
import { esIdioma, type Idioma } from "@/lib/i18n"
import { metadataSeccion } from "@/lib/site"

const TEXTOS: Record<Idioma, { titulo: string; descripcion: string }> = {
  es: {
    titulo: "Calendario de vedas",
    descripcion: "Consulta los periodos de veda de las pesquerías de México por especie y región, con su fundamento en el Diario Oficial de la Federación.",
  },
  en: {
    titulo: "Fishing closure calendar",
    descripcion: "Check the closure periods of Mexico's fisheries by species and region, with their legal basis in the Official Gazette of the Federation.",
  },
}

// La página es un componente de cliente y no puede exportar metadata: se define aquí.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const idioma: Idioma = esIdioma(lang) ? lang : "es"
  return metadataSeccion({ ...TEXTOS[idioma], path: "/vedas", idioma })
}

export default function VedasLayout({ children }: { children: React.ReactNode }) {
  return children
}
