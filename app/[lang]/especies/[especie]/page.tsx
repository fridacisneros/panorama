import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EspeciesExplorador } from "@/components/especies-explorador"
import { especies } from "@/lib/especies-data"
import { metadataSeccion, siteName } from "@/lib/site"
import { IDIOMAS, esIdioma, etiquetaRegion, type Idioma } from "@/lib/i18n"

// Ruta propia de cada pesquería, generada en el servidor al compilar: el HTML ya
// incluye su ficha, así que se puede compartir y la indexan los buscadores.
export const dynamicParams = false

export function generateStaticParams() {
  return IDIOMAS.flatMap((lang) => especies.map((e) => ({ lang, especie: e.id })))
}

const buscarEspecie = (id: string) => especies.find((e) => e.id === decodeURIComponent(id))

const recortar = (texto: string, max = 160) =>
  texto.length <= max ? texto : `${texto.slice(0, max - 1).replace(/\s+\S*$/, "")}…`

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; especie: string }>
}): Promise<Metadata> {
  const { lang, especie: id } = await params
  const idioma: Idioma = esIdioma(lang) ? lang : "es"
  const especie = buscarEspecie(id)
  if (!especie) return {}

  // Las fichas están en español: en inglés la descripción es genérica.
  const descripcion =
    idioma === "en"
      ? `${especie.nombre} fishery (${etiquetaRegion("en", especie.region)}): profile from Mexico's National Fisheries Chart, with status, catch, closures and regulations.`
      : recortar(
          especie.ficha?.generalidades?.descripcion?.[0] ??
            especie.descripcion ??
            `Pesquería de ${especie.nombre} (${especie.region}) según la Carta Nacional Pesquera.`,
        )

  return {
    ...metadataSeccion({
      titulo: especie.nombre,
      descripcion,
      path: `/especies/${especie.id}`,
      idioma,
    }),
    // El título "Pesquerías" de especies/layout.tsx anula la plantilla del layout
    // raíz para sus hijos, así que el sufijo del sitio se pone a mano.
    title: { absolute: `${especie.nombre} · ${siteName}` },
  }
}

export default async function EspeciePage({
  params,
}: {
  params: Promise<{ especie: string }>
}) {
  const especie = buscarEspecie((await params).especie)
  if (!especie) notFound()

  return <EspeciesExplorador idInicial={especie.id} />
}
