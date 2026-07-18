import Link from "next/link"
import { ArrowRight, Fish, Waves, Shield, Calendar, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { EspeciesCarrusel } from "@/components/especies-carrusel"
import { NormativasCarrusel } from "@/components/normativas-carrusel"
import { PanoramaGraficas } from "@/components/panorama-graficas"
import { especies } from "@/lib/especies-data"
import { vedasData } from "@/lib/vedas-data"

// Trazo de ola que se repite (dos pistas idénticas) para animarse sin cortes.
const WAVE_PATH =
  "M0 60 C 240 30, 480 90, 720 60 C 960 30, 1200 90, 1440 60 C 1680 30, 1920 90, 2160 60 C 2400 30, 2640 90, 2880 60 L 2880 120 L 0 120 Z"

// Pesquerías con estatus principal "En deterioro" (rojo). Se calcula sobre los
// datos para que el indicador de la portada no quede desfasado.
const enDeterioro = especies.filter((e) => {
  const c = Array.isArray(e.statusColor) ? e.statusColor[0] : e.statusColor
  return c === "red"
}).length

// Indicadores informativos de la portada (un vistazo, no navegación: la
// navegación la dan el navbar y los botones "Ver todas" de cada sección).
const stats = [
  {
    label: "Pesquerías",
    value: String(especies.length),
    sub: "en la Carta Nacional",
    icon: Fish,
    chip: "bg-teal-100 text-teal-700",
  },
  {
    label: "En deterioro",
    value: String(enDeterioro),
    sub: "requieren atención",
    icon: AlertTriangle,
    chip: "bg-red-100 text-red-700",
  },
  {
    label: "Vedas",
    value: String(vedasData.length),
    sub: "programadas",
    icon: Shield,
    chip: "bg-cyan-100 text-cyan-700",
  },
  {
    label: "Normativas",
    value: "114",
    sub: "vigentes · CNP 2025",
    icon: Waves,
    chip: "bg-blue-100 text-blue-700",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 text-white">
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6"></div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-teal-200 via-cyan-200 to-blue-200 bg-clip-text text-white">
              Panorama
            </h1>

            <p className="text-xl md:text-2xl text-teal-100 mb-8 leading-relaxed">
              Plataforma de consulta para navegar a través de la legislación mexicana
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-teal-500 hover:bg-teal-600 text-white border-0 px-8 py-4 text-lg">
                <Link href="/especies">
                  <Fish className="w-5 h-5 mr-2" />
                  Explorar Pesquerías
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-teal-300 text-teal-100 hover:bg-teal-500/20 px-8 py-4 text-lg bg-transparent"
              >
                <Link href="/vedas">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ver Vedas
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Olas animadas del encabezado */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 leading-none" aria-hidden="true">
          <svg
            className="animate-wave-slow relative block h-16 w-[200%] md:h-24"
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
          >
            <path d={WAVE_PATH} fill="rgba(255,255,255,0.12)" />
          </svg>
          <svg
            className="animate-wave-fast absolute bottom-0 left-0 block h-11 w-[200%] md:h-16"
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
          >
            <path d={WAVE_PATH} fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>
      </section>

      {/* Indicadores (informativos, no navegación) */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="bg-white border-teal-100 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-800 tabular-nums">{stat.value}</p>
                        <p className="text-xs text-gray-400">{stat.sub}</p>
                      </div>
                      <div className={`${stat.chip} p-3 rounded-full`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Panorama en cifras (gráficas con datos reales de las fichas) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">El panorama en cifras</h2>
            <p className="text-xl text-gray-600">
              Un vistazo al estado de las pesquerías mexicanas según la Carta Nacional Pesquera
            </p>
          </div>
          <PanoramaGraficas />
        </div>
      </section>

      {/* Explora las pesquerías (carrusel de fichas) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Explora las pesquerías</h2>
              <p className="text-xl text-gray-600">
                Desliza para ver algunas de las principales especies de la Carta Nacional Pesquera
              </p>
            </div>
            <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white flex-shrink-0">
              <Link href="/especies">
                Ver todas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="px-2 sm:px-12">
            <EspeciesCarrusel />
          </div>
        </div>
      </section>

      {/* Explora la biblioteca (últimas normativas por fecha de publicación) */}
      <section className="py-16 bg-white/40">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Explora la biblioteca</h2>
              <p className="text-xl text-gray-600">
                Las normativas más recientes de acuerdo a su fecha de publicación
              </p>
            </div>
            <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white flex-shrink-0">
              <Link href="/normativas">
                Ver biblioteca
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="px-2 sm:px-12">
            <NormativasCarrusel />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
