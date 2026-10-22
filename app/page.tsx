import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Calendar,
  FileText,
  Fish,
  Layers,
  Scale,
  ShieldCheck,
  Smartphone,
  Waves,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BuscadorInicio } from "@/components/buscador-inicio"
import { VedasHoy } from "@/components/vedas-hoy"
import { EspeciesCarrusel } from "@/components/especies-carrusel"
import { especies } from "@/lib/especies-data"
import { vedasData } from "@/lib/vedas-data"
import { documents } from "@/lib/normativas-data"

// Trazo de ola que se repite (dos pistas idénticas) para animarse sin cortes.
const WAVE_PATH =
  "M0 60 C 240 30, 480 90, 720 60 C 960 30, 1200 90, 1440 60 C 1680 30, 1920 90, 2160 60 C 2400 30, 2640 90, 2880 60 L 2880 120 L 0 120 Z"

// Qué se puede hacer en el sitio: cada tarjeta lleva a su sección y conserva
// la cifra que antes se mostraba sola.
const acciones = [
  {
    titulo: "Vedas",
    texto: "Consulta cuándo y dónde no se puede pescar cada especie.",
    cifra: `${vedasData.length} vedas`,
    href: "/vedas",
    icono: Calendar,
    chip: "bg-cyan-100 text-cyan-700",
  },
  {
    titulo: "Pesquerías",
    texto: "Estado, capturas, artes de pesca y regulación de cada pesquería.",
    cifra: `${especies.length} pesquerías`,
    href: "/especies",
    icono: Fish,
    chip: "bg-teal-100 text-teal-700",
  },
  {
    titulo: "Normas",
    texto: "Leyes, NOMs, planes de manejo y zonas de refugio, listos para descargar.",
    cifra: `${documents.length} documentos`,
    href: "/normativas",
    icono: FileText,
    chip: "bg-blue-100 text-blue-700",
  },
]

const razones = [
  {
    titulo: "Todo conectado",
    texto: "Vedas, fichas de pesquerías y normas en un mismo sitio, sin saltar entre el DOF y la Carta Nacional Pesquera.",
    icono: Layers,
  },
  {
    titulo: "Rápido o a detalle",
    texto: "Una consulta rápida desde el celular, o el análisis completo de cada pesquería desde la compu.",
    icono: Smartphone,
  },
  {
    titulo: "Basado en fuentes oficiales",
    texto: "Datos de la Carta Nacional Pesquera 2025 y el Diario Oficial de la Federación, con enlace a cada documento.",
    icono: ShieldCheck,
  },
]

// Pesquerías y vedas por litoral (las vedas nacionales y continentales no cuentan aquí).
const litorales = [
  {
    nombre: "Litoral del Pacífico",
    alcance: "De Baja California a Chiapas",
    region: "Litoral del Pacífico",
    zonaVeda: "Océano Pacífico",
    fondo: "from-teal-600 to-cyan-600",
  },
  {
    nombre: "Golfo de México y Mar Caribe",
    alcance: "De Tamaulipas a Quintana Roo",
    region: "Golfo de México y Mar Caribe",
    zonaVeda: "Golfo de México y Mar Caribe",
    fondo: "from-cyan-600 to-blue-700",
  },
].map((l) => ({
  ...l,
  pesquerias: especies.filter((e) => e.region === l.region).length,
  vedas: vedasData.filter((v) => v.zona === l.zonaVeda).length,
}))

const fichasCompletas = especies.filter((e) => e.ficha).length
const avanceFichas = Math.round((fichasCompletas / especies.length) * 100)

// La portada es estática: esta fecha es la de la última publicación del sitio.
const actualizado = new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(new Date())

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Encabezado: nombre, titular y buscador */}
      <section className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 text-white">
        <div className="relative z-20 container mx-auto px-4 pt-20 pb-28 md:pt-24 md:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Panorama Pesquero</h1>

            <p className="text-xl md:text-2xl text-teal-100 mb-10 leading-relaxed text-balance">
              Vedas, pesquerías y normas de pesca de México, en un solo lugar
            </p>

            <BuscadorInicio />

            <nav className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-teal-100" aria-label="Secciones">
              {acciones.map(({ titulo, href, icono: Icono }) => (
                <Link key={href} href={href} className="inline-flex items-center gap-1.5 hover:text-white hover:underline underline-offset-4">
                  <Icono className="h-4 w-4" aria-hidden="true" />
                  {titulo}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Olas animadas del encabezado (recortadas aquí para que el buscador pueda desbordar) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden leading-none" aria-hidden="true">
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

      {/* Tarjetas de acción, encimadas sobre el encabezado */}
      <section className="relative z-10 -mt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {acciones.map(({ titulo, texto, cifra, href, icono: Icono, chip }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col rounded-2xl border border-teal-100 bg-white p-6 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className={`${chip} mb-4 w-fit rounded-full p-3`}>
                  <Icono className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{titulo}</h3>
                <p className="mt-2 flex-1 text-gray-600">{texto}</p>
                <span className="mt-5 inline-flex items-center font-semibold text-teal-700">
                  <span className="tabular-nums">{cifra}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Por qué Panorama Pesquero? */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-lg md:p-10">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¿Por qué Panorama Pesquero?</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  La información pesquera de México está repartida entre el Diario Oficial de la Federación, la
                  Carta Nacional Pesquera, los acuerdos de veda y los planes de manejo. Panorama Pesquero la reúne
                  en un solo lugar para que consultes rápido y, si lo necesitas, veas el detalle.
                </p>
              </div>
              <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {razones.map(({ titulo, texto, icono: Icono }) => (
                  <li key={titulo} className="flex gap-4">
                    <div className="h-fit rounded-full bg-teal-50 p-2.5 text-teal-700">
                      <Icono className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{titulo}</h3>
                      <p className="text-sm text-gray-600">{texto}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fuentes y actualización */}
            <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-gray-100 pt-5 text-sm text-gray-500">
              <Scale className="h-4 w-4 text-teal-600" aria-hidden="true" />
              Datos de la Carta Nacional Pesquera 2025 y el DOF
              <span aria-hidden="true">·</span>
              Actualizado: {actualizado}
              <span aria-hidden="true">·</span>
              Sitio independiente, no oficial
            </p>
          </div>
        </div>
      </section>

      {/* En veda hoy y próximas a iniciar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <VedasHoy />
        </div>
      </section>

      {/* Explora por litoral */}
      <section id="litorales" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center md:text-left">Explora por litoral</h2>
          <p className="text-lg text-gray-600 mb-8 text-center md:text-left">
            Elige una costa para ver sus pesquerías y sus vedas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {litorales.map((l) => (
              <div key={l.nombre} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${l.fondo} p-6 text-white shadow-lg md:p-8`}>
                <Waves className="absolute -right-6 -bottom-6 h-40 w-40 text-white/10" aria-hidden="true" />
                <h3 className="text-2xl font-bold">{l.nombre}</h3>
                <p className="text-teal-100">{l.alcance}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/especies?region=${encodeURIComponent(l.region)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/25"
                  >
                    <Fish className="h-4 w-4" aria-hidden="true" />
                    <span className="tabular-nums">{l.pesquerias}</span> pesquerías
                  </Link>
                  <Link
                    href={`/vedas?zona=${encodeURIComponent(l.zonaVeda)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/25"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span className="tabular-nums">{l.vedas}</span> vedas
                  </Link>
                </div>
              </div>
            ))}
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

      {/* Avance del proyecto y lo que viene */}
      <section id="novedades" className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Avance de las fichas */}
            <div className="rounded-2xl border border-teal-100 bg-white p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-800">Avance de las fichas</h2>
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-semibold text-gray-800 tabular-nums">{fichasCompletas}</span> de{" "}
                <span className="tabular-nums">{especies.length}</span> pesquerías ya tienen ficha completa. Las demás
                aparecen como “Próximamente”.
              </p>
              <div
                className="mt-4 h-3 overflow-hidden rounded-full bg-teal-50"
                role="progressbar"
                aria-valuenow={avanceFichas}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Fichas completas"
              >
                <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" style={{ width: `${avanceFichas}%` }} />
              </div>
              <p className="mt-1 text-right text-xs font-medium text-teal-700 tabular-nums">{avanceFichas}%</p>
            </div>

            {/* Lo que viene: anuarios */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-600 p-6 text-white shadow-lg">
              <span className="inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
                Próximamente
              </span>
              <h2 className="mt-3 flex items-center gap-2 text-lg font-bold">
                <BarChart3 className="h-5 w-5" aria-hidden="true" />
                Datos de los anuarios
              </h2>
              <p className="mt-1 text-sm text-cyan-50">
                Series de producción, valor y captura por estado a partir de los anuarios estadísticos de
                pesca, para ver cómo ha cambiado cada pesquería.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
