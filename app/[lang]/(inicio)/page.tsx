import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Calendar,
  FileText,
  Fish,
  Layers,
  ShieldCheck,
  Smartphone,
  Waves,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BuscadorInicio } from "@/components/buscador-inicio"
import { VedasHoy } from "@/components/vedas-hoy"
import { EspeciesCarrusel } from "@/components/especies-carrusel"
import { especies } from "@/lib/especies-data"
import { fechaHoyMexico, vedasData } from "@/lib/vedas-data"
import { documents } from "@/lib/normativas-data"
import { esIdioma, etiquetaRegion, rutaLocal, type Idioma } from "@/lib/i18n"

// Trazo de ola que se repite (dos pistas idénticas) para animarse sin cortes.
const WAVE_PATH =
  "M0 60 C 240 30, 480 90, 720 60 C 960 30, 1200 90, 1440 60 C 1680 30, 1920 90, 2160 60 C 2400 30, 2640 90, 2880 60 L 2880 120 L 0 120 Z"

// Textos de la portada por idioma.
const TEXTOS = {
  es: {
    lema: "Vedas, pesquerías y normas de pesca de México, en un solo lugar",
    acciones: {
      vedas: { titulo: "Vedas", texto: "Consulta cuándo y dónde no se puede pescar cada especie.", cifra: "vedas" },
      especies: { titulo: "Pesquerías", texto: "Estado, capturas, artes de pesca y regulación de cada pesquería.", cifra: "pesquerías" },
      normas: { titulo: "Normas", texto: "Leyes, NOMs, planes de manejo y zonas de refugio, listos para descargar.", cifra: "documentos" },
    },
    porQue: "¿Por qué Panorama Pesquero?",
    porQueTexto:
      "La información pesquera de México está repartida entre el Diario Oficial de la Federación, la Carta Nacional Pesquera, los acuerdos de veda y los planes de manejo. Panorama Pesquero la reúne en un solo lugar para que consultes rápido y, si lo necesitas, veas el detalle.",
    razones: [
      {
        titulo: "Todo conectado",
        texto: "Vedas, fichas de pesquerías y normas en un mismo sitio, sin saltar entre el DOF y la Carta Nacional Pesquera.",
      },
      {
        titulo: "Rápido o a detalle",
        texto: "Una consulta rápida desde el celular, o el análisis completo de cada pesquería desde la compu.",
      },
      {
        titulo: "Basado en fuentes oficiales",
        texto: "Datos de la Carta Nacional Pesquera 2025 y el Diario Oficial de la Federación, con enlace a cada documento.",
      },
    ],
    litorales: "Explora por litoral",
    litoralesTexto: "Elige una costa para ver sus pesquerías y sus vedas.",
    alcancePacifico: "De Baja California a Chiapas",
    alcanceGolfo: "De Tamaulipas a Quintana Roo",
    pesquerias: "pesquerías",
    vedas: "vedas",
    ademas: "Además de las vedas de cada litoral, hay",
    nacional: "de alcance nacional",
    nacionalEjemplos: "(mamíferos marinos, tortugas, tiburones, mantarrayas y picudos, entre otras) y",
    continentales: "en aguas continentales",
    total: ", para un total de",
    totalFin: "vedas.",
    explora: "Explora las pesquerías",
    exploraTexto: "Desliza para ver algunas de las principales especies de la Carta Nacional Pesquera",
    verTodas: "Ver todas",
    proximamente: "Próximamente",
    anuarios: "Datos de los anuarios",
    anuariosTexto:
      "Series de producción, valor y captura por estado a partir de los anuarios estadísticos de pesca, para ver cómo ha cambiado cada pesquería.",
  },
  en: {
    lema: "Mexico's fishing closures, fisheries and regulations in one place",
    acciones: {
      vedas: { titulo: "Closures", texto: "See when and where each species can't be fished.", cifra: "closures" },
      especies: { titulo: "Fisheries", texto: "Status, catch, fishing gear and regulation of each fishery.", cifra: "fisheries" },
      normas: { titulo: "Regulations", texto: "Laws, NOMs, management plans and refuge zones, ready to download.", cifra: "documents" },
    },
    porQue: "Why Panorama Pesquero?",
    porQueTexto:
      "Mexico's fisheries information is spread across the Official Gazette of the Federation, the National Fisheries Chart, closure agreements and management plans. Panorama Pesquero brings it together in one place so you can check things quickly and, when you need to, dig into the details.",
    razones: [
      {
        titulo: "All connected",
        texto: "Closures, fishery profiles and regulations on one site, without jumping between the DOF and the National Fisheries Chart.",
      },
      {
        titulo: "Quick or in depth",
        texto: "A quick check from your phone, or the full analysis of each fishery from your computer.",
      },
      {
        titulo: "Based on official sources",
        texto: "Data from the 2025 National Fisheries Chart and the Official Gazette of the Federation, with a link to each document.",
      },
    ],
    litorales: "Explore by coast",
    litoralesTexto: "Choose a coast to see its fisheries and closures.",
    alcancePacifico: "From Baja California to Chiapas",
    alcanceGolfo: "From Tamaulipas to Quintana Roo",
    pesquerias: "fisheries",
    vedas: "closures",
    ademas: "Besides each coast's closures, there are",
    nacional: "nationwide",
    nacionalEjemplos: "(marine mammals, turtles, sharks, manta rays and billfish, among others) and",
    continentales: "in inland waters",
    total: ", for a total of",
    totalFin: "closures.",
    explora: "Explore the fisheries",
    exploraTexto: "Swipe to see some of the main species in the National Fisheries Chart",
    verTodas: "See all",
    proximamente: "Coming soon",
    anuarios: "Yearbook data",
    anuariosTexto:
      "Production, value and catch series by state from the fisheries statistical yearbooks, to see how each fishery has changed.",
  },
} satisfies Record<Idioma, unknown>

// Iconos de "¿Por qué?", en el mismo orden que `razones`.
const ICONOS_RAZONES = [Layers, Smartphone, ShieldCheck]

// Pesquerías y vedas por litoral (las vedas nacionales y continentales no cuentan aquí).
const litorales = [
  {
    clave: "alcancePacifico",
    region: "Litoral del Pacífico",
    zonaVeda: "Océano Pacífico",
    fondo: "from-teal-600 to-cyan-600",
  },
  {
    clave: "alcanceGolfo",
    region: "Golfo de México y Mar Caribe",
    zonaVeda: "Golfo de México y Mar Caribe",
    fondo: "from-cyan-600 to-blue-700",
  },
].map((l) => ({
  ...l,
  clave: l.clave as "alcancePacifico" | "alcanceGolfo",
  pesquerias: especies.filter((e) => e.region === l.region).length,
  vedas: vedasData.filter((v) => v.zona === l.zonaVeda).length,
}))

// Vedas que no pertenecen a un solo litoral, para que las cifras de arriba
// cuadren con el total del calendario.
const vedasFueraDeLitoral = (["Nacional", "Aguas continentales"] as const).map((zona) => ({
  zona,
  total: vedasData.filter((v) => v.zona === zona).length,
}))
const [vedasNacionales, vedasContinentales] = vedasFueraDeLitoral

// "En veda hoy" se calcula en el servidor con la fecha de México: la portada se
// regenera como máximo cada hora para que el día no se quede atrasado.
export const revalidate = 3600

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const idioma: Idioma = esIdioma(lang) ? lang : "es"
  const t = TEXTOS[idioma]
  const ruta = (path: string) => rutaLocal(idioma, path)
  const acciones = [
    { ...t.acciones.vedas, cifra: `${vedasData.length} ${t.acciones.vedas.cifra}`, href: ruta("/vedas"), icono: Calendar, chip: "bg-cyan-100 text-cyan-700" },
    { ...t.acciones.especies, cifra: `${especies.length} ${t.acciones.especies.cifra}`, href: ruta("/especies"), icono: Fish, chip: "bg-teal-100 text-teal-700" },
    { ...t.acciones.normas, cifra: `${documents.length} ${t.acciones.normas.cifra}`, href: ruta("/normativas"), icono: FileText, chip: "bg-blue-100 text-blue-700" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:bg-none dark:bg-background">
      {/* Encabezado: nombre, titular y buscador */}
      <section className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-700 text-white tema-fijo">
        <div className="relative z-20 container mx-auto px-4 pt-20 pb-28 md:pt-24 md:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Panorama Pesquero</h1>

            <p className="text-xl md:text-2xl text-teal-100 mb-10 leading-relaxed text-balance">
              {t.lema}
            </p>

            <BuscadorInicio />
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
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.porQue}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{t.porQueTexto}</p>
              </div>
              <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {t.razones.map(({ titulo, texto }, i) => {
                  const Icono = ICONOS_RAZONES[i]
                  return (
                  <li key={titulo} className="flex gap-4">
                    <div className="h-fit rounded-full bg-teal-50 p-2.5 text-teal-700">
                      <Icono className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{titulo}</h3>
                      <p className="text-sm text-gray-600">{texto}</p>
                    </div>
                  </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* En veda hoy y próximas a iniciar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <VedasHoy fecha={fechaHoyMexico()} />
        </div>
      </section>

      {/* Explora por litoral */}
      <section id="litorales" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center md:text-left">{t.litorales}</h2>
          <p className="text-lg text-gray-600 mb-8 text-center md:text-left">{t.litoralesTexto}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {litorales.map((l) => (
              <div key={l.region} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${l.fondo} p-6 text-white shadow-lg md:p-8 tema-fijo`}>
                <Waves className="absolute -right-6 -bottom-6 h-40 w-40 text-white/10" aria-hidden="true" />
                <h3 className="text-2xl font-bold">{etiquetaRegion(idioma, l.region)}</h3>
                <p className="text-teal-100">{t[l.clave]}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`${ruta("/especies")}?region=${encodeURIComponent(l.region)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/25"
                  >
                    <Fish className="h-4 w-4" aria-hidden="true" />
                    <span className="tabular-nums">{l.pesquerias}</span> {t.pesquerias}
                  </Link>
                  <Link
                    href={`${ruta("/vedas")}?zona=${encodeURIComponent(l.zonaVeda)}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/25"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <span className="tabular-nums">{l.vedas}</span> {t.vedas}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center md:text-left">
            {t.ademas}{" "}
            <Link href={`${ruta("/vedas")}?zona=${encodeURIComponent(vedasNacionales.zona)}`} className="font-medium text-teal-700 underline-offset-2 hover:underline">
              <span className="tabular-nums">{vedasNacionales.total}</span> {t.nacional}
            </Link>{" "}
            {t.nacionalEjemplos}{" "}
            <Link href={`${ruta("/vedas")}?zona=${encodeURIComponent(vedasContinentales.zona)}`} className="font-medium text-teal-700 underline-offset-2 hover:underline">
              <span className="tabular-nums">{vedasContinentales.total}</span> {t.continentales}
            </Link>
            {t.total} <span className="tabular-nums">{vedasData.length}</span> {t.totalFin}
          </p>
        </div>
      </section>

      {/* Explora las pesquerías (carrusel de fichas) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{t.explora}</h2>
              <p className="text-xl text-gray-600">{t.exploraTexto}</p>
            </div>
            <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white flex-shrink-0">
              <Link href={ruta("/especies")}>
                {t.verTodas}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="px-2 sm:px-12">
            <EspeciesCarrusel />
          </div>
        </div>
      </section>

      {/* Lo que viene: datos de los anuarios */}
      <section id="novedades" className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-600 p-6 text-white shadow-lg tema-fijo">
            <span className="inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
              {t.proximamente}
            </span>
            <h2 className="mt-3 flex items-center gap-2 text-lg font-bold">
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
              {t.anuarios}
            </h2>
            <p className="mt-1 text-sm text-cyan-50">{t.anuariosTexto}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
