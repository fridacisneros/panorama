import type React from "react"
import type { Metadata } from "next"
import { esIdioma, type Idioma } from "@/lib/i18n"
import { metadataSeccion } from "@/lib/site"

const TEXTOS: Record<Idioma, { titulo: string; descripcion: string }> = {
  es: {
    titulo: "Pesquerías",
    descripcion:
      "Fichas de las principales pesquerías de México según la Carta Nacional Pesquera: especies, regiones, captura, estado de aprovechamiento y normatividad aplicable.",
  },
  en: {
    titulo: "Fisheries",
    descripcion:
      "Profiles of Mexico's main fisheries from the National Fisheries Chart: species, regions, catch, exploitation status and applicable regulations.",
  },
}

// La página es un componente de cliente y no puede exportar metadata: se define aquí.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const idioma: Idioma = esIdioma(lang) ? lang : "es"
  return metadataSeccion({ ...TEXTOS[idioma], path: "/especies", idioma })
}

export default function EspeciesLayout({ children }: { children: React.ReactNode }) {
  return children
}
