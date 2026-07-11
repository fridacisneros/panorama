import Link from "next/link"
import { ArrowRight, Fish, Waves, Shield, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { BuzonSugerencias } from "@/components/buzon-sugerencias"
import { EspeciesCarrusel } from "@/components/especies-carrusel"

// Trazo de ola que se repite (dos pistas idénticas) para animarse sin cortes.
const WAVE_PATH =
  "M0 60 C 240 30, 480 90, 720 60 C 960 30, 1200 90, 1440 60 C 1680 30, 1920 90, 2160 60 C 2400 30, 2640 90, 2880 60 L 2880 120 L 0 120 Z"

const stats = [
  {
    label: "Pesquerías",
    value: "10",
    sub: "registradas",
    href: "/especies",
    icon: Fish,
    card: "from-teal-500 to-teal-600",
    label2: "text-teal-100",
    sub2: "text-teal-200",
    chip: "bg-teal-400/30",
  },
  {
    label: "Vedas",
    value: "147",
    sub: "programadas",
    href: "/vedas",
    icon: Shield,
    card: "from-cyan-500 to-cyan-600",
    label2: "text-cyan-100",
    sub2: "text-cyan-200",
    chip: "bg-cyan-400/30",
  },
  {
    label: "Normativas",
    value: "114",
    sub: "registradas",
    href: "/normativas",
    icon: Waves,
    card: "from-blue-500 to-blue-600",
    label2: "text-blue-100",
    sub2: "text-blue-200",
    chip: "bg-blue-400/30",
  },
  {
    label: "Carta Nacional Pesquera",
    value: "2025",
    sub: "última actualización",
    href: "/normativas",
    icon: BookOpen,
    card: "from-emerald-500 to-emerald-600",
    label2: "text-emerald-100",
    sub2: "text-emerald-200",
    chip: "bg-emerald-400/30",
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

      {/* Stats Section (tarjetas clicables) */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Link key={stat.label} href={stat.href} className="group">
                  <Card
                    className={`bg-gradient-to-br ${stat.card} text-white border-0 shadow-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`${stat.label2} text-sm font-medium`}>{stat.label}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                          <p className={`${stat.sub2} text-xs`}>{stat.sub}</p>
                        </div>
                        <div className={`${stat.chip} p-3 rounded-full transition-transform duration-300 group-hover:scale-110`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
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

      <BuzonSugerencias />

      <Footer />
    </div>
  )
}
