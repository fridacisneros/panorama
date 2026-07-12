import Link from "next/link"
import { BarChart3, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// El dashboard con gráficas dependía de la base de datos de producción pesquera
// (Postgres). En esta versión no se usa esa base de datos, por lo que la sección
// se muestra como "Próximamente". Al reconectar la base de datos se puede
// restaurar la versión con gráficas.
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
            <BarChart3 className="h-10 w-10 text-teal-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-800">Dashboard en construcción</h1>
          <p className="mb-8 text-gray-600">
            Las gráficas y estadísticas de producción pesquera estarán disponibles próximamente.
            Mientras tanto, explora las pesquerías, vedas y normativas.
          </p>
          <Button asChild className="bg-teal-600 text-white hover:bg-teal-700">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
