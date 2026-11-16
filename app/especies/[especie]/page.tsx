import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { EspeciesExplorador } from "@/components/especies-explorador"
import { especies } from "@/lib/especies-data"
import { metadataSeccion, siteName } from "@/lib/site"

// Ruta propia de cada pesquería, generada en el servidor al compilar: el HTML ya
// incluye su ficha, así que se puede compartir y la indexan los buscadores.
export const dynamicParams = false

export function generateStaticParams() {
  return especies.map((e) => ({ especie: e.id }))
}

const buscarEspecie = (id: string) => especies.find((e) => e.id === decodeURIComponent(id))

const recortar = (texto: string, max = 160) =>
  texto.length <= max ? texto : `${texto.slice(0, max - 1).replace(/\s+\S*$/, "")}…`

export async function generateMetadata({
  params,
}: {
  params: Promise<{ especie: string }>
}): Promise<Metadata> {
  const especie = buscarEspecie((await params).especie)
  if (!especie) return {}

  const descripcion = recortar(
    especie.ficha?.generalidades?.descripcion?.[0] ??
      especie.descripcion ??
      `Pesquería de ${especie.nombre} (${especie.region}) según la Carta Nacional Pesquera.`,
  )

  return {
    ...metadataSeccion({
      titulo: especie.nombre,
      descripcion,
      path: `/especies/${especie.id}`,
    }),
    // El título "Pesquerías" de especies/layout.tsx anula la plantilla del layout
    // raíz para sus hijos, así que el sufijo del sitio se pone a mano.
    title: { absolute: `${especie.nombre} · ${siteName}` },
    // Las pesquerías aún sin ficha ("Próximamente") no aportan contenido propio.
    ...(especie.ficha ? {} : { robots: { index: false, follow: true } }),
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
