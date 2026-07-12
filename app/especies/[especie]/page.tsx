import { redirect } from "next/navigation"

// Las fichas de especie ahora viven en el panel lateral de /especies (fuente
// única en lib/especies-data.ts). Esta ruta se conserva solo para no romper
// enlaces antiguos: redirige a la vista de panel lateral con la especie abierta.
export default async function EspecieRedirect({
  params,
}: {
  params: Promise<{ especie: string }>
}) {
  const { especie } = await params
  redirect(`/especies?id=${encodeURIComponent(especie)}`)
}
