import type React from "react"
import type { Metadata } from "next"
import { esIdioma, type Idioma } from "@/lib/i18n"
import { metadataSeccion } from "@/lib/site"

const TEXTOS: Record<Idioma, { titulo: string; descripcion: string }> = {
  es: {
    titulo: "Biblioteca normativa",
    descripcion: "Leyes, reglamentos, normas oficiales mexicanas y acuerdos que regulan la pesca en México, con enlaces para consultar y descargar cada documento.",
  },
  en: {
    titulo: "Regulations library",
    descripcion: "Laws, regulations, Official Mexican Standards and agreements governing fishing in Mexico, with links to view and download each document.",
  },
}

// La página es un componente de cliente y no puede exportar metadata: se define aquí.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const idioma: Idioma = esIdioma(lang) ? lang : "es"
  return metadataSeccion({ ...TEXTOS[idioma], path: "/normativas", idioma })
}

export default function NormativasLayout({ children }: { children: React.ReactNode }) {
  return children
}
