import { EspeciesExplorador } from "@/components/especies-explorador"
import { especies } from "@/lib/especies-data"

// Catálogo de pesquerías. Cada ficha tiene su propia ruta (/especies/{id});
// los enlaces antiguos con ?id= los redirige middleware.ts.
export default async function EspeciesPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string | string[] }>
}) {
  const { region } = await searchParams
  const regionInicial =
    typeof region === "string" && especies.some((e) => e.region === region) ? region : undefined

  return <EspeciesExplorador regionInicial={regionInicial} />
}
