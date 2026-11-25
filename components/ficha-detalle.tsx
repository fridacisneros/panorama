"use client"

import { useState } from "react"
import {
  Fish,
  TrendingUp,
  Thermometer,
  Shield,
  Target,
  FileText,
  MapPin,
  Anchor,
  Ship,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Info,
  CalendarClock,
  Ruler,
  Activity,
  BadgeCheck,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ReferenceLine,
  BarChart,
  Bar,
  LabelList,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { EspecieImagen } from "@/components/especie-imagen"
import { RegulacionVinculada, ResumenRegulacion } from "@/components/ficha-vinculos"
import { Sustentabilidad } from "@/components/ficha-sustentabilidad"
import { useIdioma } from "@/components/idioma-provider"
import { etiquetaEstatus, etiquetaRegion, type Idioma } from "@/lib/i18n"
import type {
  Especie,
  FiguraCNP,
  GraficaCapturaEstados,
  GraficaFrecuenciaTallas,
  GraficaParticipacionApilada,
  ParticipacionEstado,
} from "@/lib/especies-data"

const toArray = <T,>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])

const statusPillClass = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-100 text-green-800 border-green-200 hover:bg-green-100"
    case "red":
      return "bg-red-100 text-red-800 border-red-200 hover:bg-red-100"
    case "yellow":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100"
  }
}

const statusIcon = (color: string) => {
  switch (color) {
    case "green":
      return <CheckCircle className="w-3.5 h-3.5" />
    case "red":
      return <XCircle className="w-3.5 h-3.5" />
    case "yellow":
      return <TrendingUp className="w-3.5 h-3.5" />
    default:
      return <AlertTriangle className="w-3.5 h-3.5" />
  }
}

type SeccionId =
  | "generalidades"
  | "indicadores"
  | "ambiente"
  | "normatividad"
  | "status"
  | "sustentabilidad"

const SECCIONES: { id: SeccionId; icon: typeof Fish }[] = [
  { id: "generalidades", icon: Fish },
  { id: "indicadores", icon: TrendingUp },
  { id: "ambiente", icon: Thermometer },
  { id: "normatividad", icon: Shield },
  { id: "status", icon: Target },
  { id: "sustentabilidad", icon: BadgeCheck },
]

// Textos de la interfaz de la ficha. El contenido (párrafos, tablas, notas de
// la CNP) se queda en el español de la fuente.
const TEXTOS = {
  es: {
    pestanas: {
      generalidades: "Generalidades",
      indicadores: "Indicadores",
      ambiente: "Ambiente y clima",
      normatividad: "Normatividad",
      status: "Estado",
      sustentabilidad: "Sustentabilidad",
    } satisfies Record<SeccionId, string>,
    actualizacion: "Última actualización CNP:",
    proximamente: "Próximamente",
    fichaPendiente: "La ficha detallada de esta pesquería estará disponible próximamente.",
    descripcion: "Descripción general",
    embarcacionesArtes: "Embarcaciones y artes de pesca",
    embarcaciones: "Embarcaciones",
    artes: "Artes de pesca",
    objetivo: "Especies objetivo",
    asociadas: "Especies asociadas",
    toneladas: "Toneladas",
    año: "Año",
    organismos: "% de los organismos",
    rango: (a: number, b: number, u: string) => `${a} a ${b} ${u}`,
    notaTallas: (u: string) =>
      `Talla en ${u === "mm" ? "milímetros" : u}; todos los paneles comparten la misma escala vertical.`,
    nacional: "nacional",
    nal: "nal.",
    capturaAnual: "Captura anual",
    unidadToneladas: "toneladas",
    valorProduccion: "Valor producción",
    millones: "millones MXN",
    empleos: "Empleos directos",
    pescadores: "pescadores",
    embarcacionesKpi: "Embarcaciones",
    activas: "activas",
    historica: "Captura histórica",
    captura: "Captura",
    valor: "Valor",
    valorMillones: "Valor (millones)",
    participacion: "Participación por estado",
    ambiente: "Efectos ambientales y del cambio climático",
    aplica: "Aplica",
    noAplica: "No aplica",
    sinDato: "Sin dato",
    instrumentos: "Instrumentos de manejo según la CNP",
    disposicion: "Disposición",
    sustento: "Sustento",
    estadoPesqueria: "Estado de la pesquería",
    estrategia: "Estrategia",
    tacticas: "Tácticas",
    rms: "Rendimiento máximo sostenible por estado",
    estado: "Estado",
    recomendaciones: "Recomendaciones de manejo",
  },
  en: {
    pestanas: {
      generalidades: "Overview",
      indicadores: "Indicators",
      ambiente: "Environment & climate",
      normatividad: "Regulation",
      status: "Status",
      sustentabilidad: "Sustainability",
    } satisfies Record<SeccionId, string>,
    actualizacion: "Last CNP update:",
    proximamente: "Coming soon",
    fichaPendiente: "The detailed profile of this fishery will be available soon.",
    descripcion: "General description",
    embarcacionesArtes: "Vessels and fishing gear",
    embarcaciones: "Vessels",
    artes: "Fishing gear",
    objetivo: "Target species",
    asociadas: "Associated species",
    toneladas: "Tonnes",
    año: "Year",
    organismos: "% of individuals",
    rango: (a: number, b: number, u: string) => `${a} to ${b} ${u}`,
    notaTallas: (u: string) =>
      `Size in ${u === "mm" ? "millimeters" : u}; all panels share the same vertical scale.`,
    nacional: "national",
    nal: "nat.",
    capturaAnual: "Annual catch",
    unidadToneladas: "tonnes",
    valorProduccion: "Production value",
    millones: "million MXN",
    empleos: "Direct jobs",
    pescadores: "fishers",
    embarcacionesKpi: "Vessels",
    activas: "active",
    historica: "Historical catch",
    captura: "Catch",
    valor: "Value",
    valorMillones: "Value (millions)",
    participacion: "Share by state",
    ambiente: "Environmental and climate change effects",
    aplica: "Applies",
    noAplica: "Doesn't apply",
    sinDato: "No data",
    instrumentos: "Management instruments according to the CNP",
    disposicion: "Provision",
    sustento: "Basis",
    estadoPesqueria: "Fishery status",
    estrategia: "Strategy",
    tacticas: "Tactics",
    rms: "Maximum sustainable yield by state",
    estado: "State",
    recomendaciones: "Management recommendations",
  },
} satisfies Record<Idioma, unknown>

const useTextos = () => TEXTOS[useIdioma().idioma]

// Textos de relleno de la CNP que no aportan contenido por sí solos.
const esRelleno = (texto: string) =>
  /^(—|-|sin información\.?|por desarrollar\.?|no aplica\.?|en proceso( de \p{L}+)?\.?)$/iu.test(texto.trim())

export function FichaDetalle({ especie }: { especie: Especie }) {
  const { idioma } = useIdioma()
  const t = TEXTOS[idioma]
  const ficha = especie.ficha
  const disponibles = SECCIONES.filter((s) => {
    if (!ficha) return false
    if (s.id === "ambiente")
      return !!ficha.ambiente?.some((p) => !esRelleno(p)) || !!ficha.ambienteGraficas?.length
    if (s.id === "status") return !!(ficha.status?.cards?.length || ficha.status?.estrategia || ficha.status?.tacticas?.length)
    // Normatividad incluye al final las recomendaciones de manejo de la CNP.
    if (s.id === "normatividad") return !!ficha.normatividad?.length || !!ficha.recomendaciones?.length
    // Siempre visible: que no haya aval también es información.
    if (s.id === "sustentabilidad") return true
    return !!ficha[s.id]
  })

  const [activa, setActiva] = useState<SeccionId>(disponibles[0]?.id ?? "generalidades")
  const seccionActiva = disponibles.some((s) => s.id === activa) ? activa : disponibles[0]?.id

  const estados = especie.status ? toArray(especie.status) : []
  const colores = especie.statusColor ? toArray(especie.statusColor) : []

  return (
    <div className="flex flex-col h-full">
      {/* Encabezado */}
      <div className="flex gap-4 p-5 border-b border-teal-100">
        <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-sm bg-white">
          <EspecieImagen id={especie.id} nombre={especie.nombre} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">{especie.nombre}</h2>
          {especie.nombreCientifico && (
            <p className="text-base text-gray-500 italic">{especie.nombreCientifico}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-teal-600" />
              {etiquetaRegion(idioma, especie.region)}
            </span>
            {especie.ultimaActualizacion && (
              <span className="flex items-center gap-1">
                <CalendarClock className="w-4 h-4 text-teal-600" />
                {t.actualizacion}{" "}
                <span className="font-semibold text-gray-900 tabular-nums">{especie.ultimaActualizacion}</span>
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {estados.map((estado, i) => {
              const color = colores[i] ?? colores[0]
              return (
                <Badge key={i} className={cn(statusPillClass(color), "flex items-center gap-1")}>
                  {statusIcon(color)}
                  <span className="text-xs">{etiquetaEstatus(idioma, estado)}</span>
                </Badge>
              )
            })}
          </div>
          {ficha && disponibles.some((s) => s.id === "normatividad") && (
            <ResumenRegulacion especie={especie} onVerDetalle={() => setActiva("normatividad")} />
          )}
        </div>
      </div>

      {!ficha ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 text-gray-500">
          <Fish className="w-12 h-12 text-teal-300 mb-3" />
          <p className="font-medium text-gray-700">{t.proximamente}</p>
          <p className="text-sm max-w-sm">{especie.descripcion ?? t.fichaPendiente}</p>
        </div>
      ) : (
        <>
          {/* Sub-pestañas del detalle */}
          {/* Sin JavaScript las pestañas no responden: se ocultan y se muestran todas las
              secciones seguidas (el HTML del servidor ya las trae completas). */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: "<style>.ficha-pestanas{display:none}.ficha-seccion[hidden]{display:block}</style>",
            }}
          />
          <div className="ficha-pestanas flex gap-1 px-4 pt-3 border-b border-teal-100 overflow-x-auto">
            {disponibles.map((s) => {
              const Icon = s.icon
              const on = seccionActiva === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiva(s.id)}
                  className={cn(
                    "flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                    on
                      ? "border-teal-500 text-teal-700"
                      : "border-transparent text-gray-500 hover:text-teal-600",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t.pestanas[s.id]}
                </button>
              )
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Todas las secciones van en el HTML (para buscadores y lectores sin
                JavaScript); las pestañas sólo deciden cuál se ve. */}
            {disponibles.map((s) => (
              <section key={s.id} hidden={s.id !== seccionActiva} className="ficha-seccion space-y-6">
                {s.id === "generalidades" && <Generalidades ficha={ficha} />}
                {s.id === "indicadores" && <Indicadores ficha={ficha} />}
                {s.id === "ambiente" && <Ambiente ficha={ficha} />}
                {s.id === "normatividad" && (
                  <>
                    <RegulacionVinculada especie={especie} />
                    <Normatividad ficha={ficha} />
                    <Recomendaciones ficha={ficha} />
                  </>
                )}
                {s.id === "status" && <StatusSeccion ficha={ficha} />}
                {s.id === "sustentabilidad" && <Sustentabilidad especieId={especie.id} />}
              </section>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

type Ficha = NonNullable<Especie["ficha"]>

function SectionTitle({ icon: Icon, children }: { icon: typeof Fish; children: React.ReactNode }) {
  return (
    <CardTitle className="flex items-center text-teal-700 text-base">
      <Icon className="w-5 h-5 mr-2" />
      {children}
    </CardTitle>
  )
}

function Generalidades({ ficha }: { ficha: Ficha }) {
  const t = useTextos()
  const g = ficha.generalidades
  if (!g) return null
  return (
    <>
      {!!g.descripcion?.length && (
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <SectionTitle icon={Fish}>{t.descripcion}</SectionTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {g.descripcion.map((p, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed">
                {p}
              </p>
            ))}
          </CardContent>
        </Card>
      )}

      {(g.embarcaciones || g.artesPesca) && (
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <SectionTitle icon={Ship}>{t.embarcacionesArtes}</SectionTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {g.embarcaciones && (
              <div>
                {/* El subtítulo solo aparece cuando conviven ambos apartados */}
                {g.artesPesca && (
                  <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">
                    <Ship className="h-3.5 w-3.5" /> {t.embarcaciones}
                  </p>
                )}
                <p className="text-gray-700 leading-relaxed text-sm">{g.embarcaciones}</p>
              </div>
            )}
            {g.artesPesca && (
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">
                  <Anchor className="h-3.5 w-3.5" /> {t.artes}
                </p>
                <p className="text-gray-700 leading-relaxed text-sm">{g.artesPesca}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {(g.especiesObjetivo?.length || g.especiesAsociadas?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!!g.especiesObjetivo?.length && (
            <Card className="border-teal-200">
              <CardHeader className="pb-3">
                <SectionTitle icon={Target}>{t.objetivo}</SectionTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {g.especiesObjetivo.map((e, i) => (
                  <div key={i} className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <h5 className="font-medium text-teal-800">{e.nombre}</h5>
                    <p className="text-sm text-teal-700 italic">{e.cientifico}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          {!!g.especiesAsociadas?.length && (
            <Card className="border-teal-200">
              <CardHeader className="pb-3">
                <SectionTitle icon={Fish}>{t.asociadas}</SectionTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {g.especiesAsociadas.map((e, i) => (
                  <div key={i} className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-800 text-sm">{e.nombre}</h5>
                    <p className="text-xs text-blue-700 italic">{e.cientifico}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  )
}

function Kpi({
  label,
  value,
  unit,
  icon: Icon,
  color,
}: { label: string; value: string; unit: string; icon: typeof Fish; color?: string }) {
  return (
    <Card className="border-teal-200" style={color ? { borderColor: color } : undefined}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">{label}</p>
            <p
              className={cn("font-bold text-teal-800 tabular-nums", value.length > 8 ? "text-xl" : "text-2xl")}
              style={color ? { color } : undefined}
            >
              {value}
            </p>
            <p className="text-xs text-gray-500">{unit}</p>
          </div>
          <Icon className="w-7 h-7 text-teal-500" style={color ? { color } : undefined} />
        </div>
      </CardContent>
    </Card>
  )
}

const ICONOS_CLAVE = { talla: Ruler, rendimiento: TrendingUp, tasa: Activity } as const

// Paleta de reserva para series de estado sin color explícito.
const COLORES_SERIE = ["#0d9488", "#0891b2", "#f59e0b", "#8b5cf6", "#ec4899", "#65a30d"]

// Series de "tinta" casi negra (#0f172a): en modo nocturno se perderían contra el
// fondo, así que leen la escala de texto, que se aclara bajo `.dark`.
const COLORES_TINTA: Record<string, string> = { "#0f172a": "rgb(var(--txt-gray-900))" }
const colorSerie = (color: string) => COLORES_TINTA[color.toLowerCase()] ?? color

function GraficaEstados({ grafica }: { grafica: GraficaCapturaEstados }) {
  const t = useTextos()
  // Combina las series (posiblemente con años distintos) en filas por año.
  const años = Array.from(new Set(grafica.series.flatMap((s) => s.datos.map((d) => d.año)))).sort((a, b) => a - b)
  const data = años.map((año) => {
    const fila: Record<string, number> = { año }
    for (const s of grafica.series) {
      const punto = s.datos.find((d) => d.año === año)
      if (punto) fila[s.estado] = punto.captura
    }
    return fila
  })
  const unidadIzq = grafica.unidadIzquierda ?? t.toneladas
  const unidadDer = grafica.unidadDerecha
  // Unidad que corresponde a cada serie según el eje en el que se dibuja.
  const unidadDe = (nombre: string) =>
    grafica.series.find((s) => s.estado === nombre)?.eje === "derecho" ? (unidadDer ?? "") : unidadIzq
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-teal-700 text-base">{grafica.titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="año" tick={{ fontSize: 12 }} minTickGap={20} />
              <YAxis
                yAxisId="izq"
                tick={{ fontSize: 12 }}
                domain={grafica.dominioIzquierda}
                label={{ value: unidadIzq, angle: -90, position: "insideLeft" }}
              />
              {unidadDer && (
                <YAxis
                  yAxisId="der"
                  orientation="right"
                  tick={{ fontSize: 12 }}
                  label={{ value: unidadDer, angle: 90, position: "insideRight" }}
                />
              )}
              <Tooltip
                formatter={(value: number, name: string) => [`${value.toLocaleString()} ${unidadDe(name)}`, name]}
                labelFormatter={(label) => `${t.año}: ${label}`}
              />
              {grafica.series.length > 1 && <Legend />}
              {grafica.referencias?.map((r) => (
                <ReferenceLine
                  key={r.etiqueta}
                  yAxisId="izq"
                  y={r.valor}
                  stroke="rgb(var(--txt-gray-600))"
                  strokeWidth={r.tipo === "punteada" ? 1 : 1.5}
                  strokeDasharray={r.tipo === "punteada" ? "4 4" : undefined}
                  ifOverflow="extendDomain"
                  label={{ value: r.etiqueta, position: "insideTopRight", fontSize: 11, fill: "rgb(var(--txt-gray-600))" }}
                />
              ))}
              {grafica.series.map((s, i) => (
                <Line
                  key={s.estado}
                  yAxisId={s.eje === "derecho" ? "der" : "izq"}
                  // Las series anuales completas se dibujan rectas, como en la Carta Nacional;
                  // las de puntos dispersos conservan la curva suavizada.
                  type={s.datos.length > 12 ? "linear" : "monotone"}
                  dataKey={s.estado}
                  stroke={colorSerie(s.color ?? COLORES_SERIE[i % COLORES_SERIE.length])}
                  strokeWidth={2}
                  strokeDasharray={s.punteada ? "5 4" : undefined}
                  name={s.estado}
                  connectNulls
                  dot={(s.marcadores ?? s.datos.length <= 12) ? { r: 3 } : false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        {grafica.nota && <p className="mt-3 text-xs leading-relaxed text-gray-500">{grafica.nota}</p>}
      </CardContent>
    </Card>
  )
}

// Frecuencia de tallas por estado, como pequeños múltiplos: un panel por estado y el
// mismo eje vertical en todos, para que los histogramas se comparen entre sí (la figura
// original de la Carta Nacional escala cada panel por separado). Es una sola serie, así
// que no lleva leyenda: bastan el título del panel y la etiqueta del intervalo modal.
function FrecuenciaTallasCard({ grafica }: { grafica: GraficaFrecuenciaTallas }) {
  const t = useTextos()
  const unidad = grafica.unidad ?? "mm"
  // Techo común redondeado a la decena superior, para que el eje tenga marcas limpias.
  const techo = Math.ceil(Math.max(...grafica.paneles.flatMap((p) => p.porcentajes)) / 10) * 10
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-teal-700 text-base">{grafica.titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 sm:grid-cols-2">
          {grafica.paneles.map((panel) => {
            const data = panel.porcentajes.map((porcentaje, i) => ({
              talla: grafica.tallaInicial + i * grafica.anchoBin,
              porcentaje,
            }))
            const moda = Math.max(...panel.porcentajes)
            return (
              <div key={panel.estado}>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-medium text-gray-700">{panel.estado}</p>
                  <p className="text-xs tabular-nums text-gray-500">n = {panel.n.toLocaleString("es-MX")}</p>
                </div>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 14, right: 4, bottom: 0, left: -20 }} barCategoryGap={1}>
                      <CartesianGrid stroke="rgb(var(--sup-gray-200))" vertical={false} />
                      <XAxis dataKey="talla" tick={{ fontSize: 11 }} interval={1} tickLine={false} />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        domain={[0, techo]}
                        tickFormatter={(v: number) => `${v}%`}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "rgba(13, 148, 136, 0.08)" }}
                        formatter={(value: number) => [`${value}${t.organismos}`, panel.estado]}
                        labelFormatter={(label: number) => t.rango(label, label + grafica.anchoBin, unidad)}
                      />
                      <Bar dataKey="porcentaje" fill="#0d9488" radius={[2, 2, 0, 0]} isAnimationActive={false}>
                        {/* Se etiqueta sólo el intervalo modal: una cifra por panel, no una por barra. */}
                        <LabelList
                          dataKey="porcentaje"
                          position="top"
                          fontSize={10}
                          fill="rgb(var(--txt-gray-700))"
                          formatter={(value: unknown) => (value === moda ? `${moda}%` : "")}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          {t.notaTallas(unidad)}
          {grafica.nota ? ` ${grafica.nota}` : ""}
        </p>
      </CardContent>
    </Card>
  )
}

function ParticipacionCard({
  titulo,
  estados,
  nota,
}: {
  titulo: string
  estados: ParticipacionEstado[]
  nota?: string
}) {
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-teal-700 text-base">{titulo}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {estados.map((item) => (
          <div key={item.estado} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.estado}</span>
              <span className="text-sm font-bold text-teal-600 tabular-nums">{item.porcentaje}%</span>
            </div>
            <Progress value={item.porcentaje} className="h-2.5" />
          </div>
        ))}
        {nota && <p className="pt-1 text-xs leading-relaxed text-gray-500">{nota}</p>}
      </CardContent>
    </Card>
  )
}

// Parte-de-un-todo en una sola gráfica: un renglón por estado, escalado a su
// participación nacional, y dentro de cada uno la composición por especie.
// Paleta validada con el validador de dataviz (superficie clara, pares
// adyacentes): banda de luminosidad, piso de croma, separación CVD (peor par
// #e34948↔#4a3aa7, ΔE 22.7 en protanopía) y piso de visión normal, todos PASS.
// El amarillo #eda100 queda en 2.11:1 de contraste, así que la gráfica lleva
// leyenda y etiquetas visibles: ninguna especie se comunica sólo con color.
function ParticipacionApiladaCard({ grafica }: { grafica: GraficaParticipacionApilada }) {
  const t = useTextos()
  const especies: string[] = []
  const colores = new Map<string, string>()
  for (const e of grafica.estados) {
    for (const s of e.especies) {
      if (!colores.has(s.especie)) {
        especies.push(s.especie)
        colores.set(s.especie, s.color)
      }
    }
  }
  const data = grafica.estados.map((e) => {
    const fila: Record<string, number | string> = { estado: e.estado, total: e.porcentaje }
    for (const esp of especies) {
      const seg = e.especies.find((s) => s.especie === esp)
      // Aportación al total nacional = % dentro del estado x participación del estado.
      fila[esp] = seg ? Number(((seg.porcentaje * e.porcentaje) / 100).toFixed(3)) : 0
    }
    return fila
  })
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-teal-700 text-base">{grafica.titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 52, bottom: 4, left: 0 }}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="estado"
                width={132}
                tick={{ fontSize: 12, fill: "rgb(var(--txt-gray-600))" }}
                tickLine={false}
                axisLine={false}
              />
              {/* Tooltip compacto: sólo las especies presentes en el estado y en tinta
                  neutra, con una marca de color al lado; el recuadro anterior tapaba
                  las barras porque repetía la leyenda completa en texto largo. */}
              <Tooltip
                cursor={{ fill: "rgb(var(--sup-teal-50))" }}
                content={({ active, payload, label }: any) => {
                  if (!active || !payload?.length) return null
                  const total = Number(payload[0]?.payload?.total) || 100
                  const filas = payload.filter((p: any) => Number(p.value) > 0)
                  if (!filas.length) return null
                  return (
                    <div className="rounded-lg border border-teal-200 bg-white/95 px-2.5 py-2 shadow-sm">
                      <p className="mb-1 text-[11px] font-semibold text-gray-700">
                        {label} · {total}% {t.nacional}
                      </p>
                      {filas.map((p: any) => (
                        <p key={p.name} className="whitespace-nowrap text-[11px] text-gray-600">
                          <span
                            className="mr-1.5 inline-block h-2 w-2 rounded-[2px] align-middle"
                            style={{ backgroundColor: p.color }}
                          />
                          {p.name}{" "}
                          <span className="font-semibold tabular-nums text-gray-700">
                            {((Number(p.value) / total) * 100).toFixed(1)}%
                          </span>
                          <span className="text-gray-400"> · {Number(p.value).toFixed(2)}% {t.nal}</span>
                        </p>
                      ))}
                    </div>
                  )
                }}
              />
              {/* La leyenda de recharts pinta el texto del color de la serie; la tinta
                  se mantiene neutra y el color lo carga el cuadrito. */}
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value: string) => <span className="text-gray-600">{value}</span>}
              />
              {especies.map((esp, i) => (
                <Bar
                  key={esp}
                  dataKey={esp}
                  stackId="participacion"
                  fill={colores.get(esp)}
                  barSize={26}
                  stroke="#ffffff"
                  strokeWidth={1}
                  isAnimationActive={false}
                >
                  {i === especies.length - 1 && (
                    <LabelList
                      dataKey="total"
                      position="right"
                      className="fill-gray-700 text-[11px] font-semibold tabular-nums"
                      formatter={(v: any) => `${v}%`}
                    />
                  )}
                </Bar>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        {grafica.nota && <p className="pt-1 text-xs leading-relaxed text-gray-500">{grafica.nota}</p>}
      </CardContent>
    </Card>
  )
}

function Indicadores({ ficha }: { ficha: Ficha }) {
  const t = useTextos()
  const ind = ficha.indicadores
  if (!ind) return null
  const hist = ind.capturaHistorica ?? []
  return (
    <>
      {(ind.capturaAnual ||
        ind.valorProduccion ||
        ind.empleos ||
        ind.embarcaciones ||
        ind.indicadoresClave?.length) && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ind.capturaAnual && <Kpi label={t.capturaAnual} value={ind.capturaAnual} unit={t.unidadToneladas} icon={TrendingUp} />}
          {ind.valorProduccion && <Kpi label={t.valorProduccion} value={ind.valorProduccion} unit={t.millones} icon={DollarSign} />}
          {ind.empleos && <Kpi label={t.empleos} value={ind.empleos} unit={t.pescadores} icon={Users} />}
          {ind.embarcaciones && <Kpi label={t.embarcacionesKpi} value={ind.embarcaciones} unit={t.activas} icon={Anchor} />}
          {ind.indicadoresClave?.map((d) => (
            <Kpi
              key={d.etiqueta}
              label={d.etiqueta}
              value={d.valor}
              unit={d.unidad}
              icon={d.icono ? ICONOS_CLAVE[d.icono] : Info}
              color={d.color}
            />
          ))}
        </div>
      )}

      {!!ind.datosDestacados?.length && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ind.datosDestacados.map((dato, i) => (
            <div key={i} className="flex gap-3 rounded-lg border border-teal-200 bg-teal-50/60 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
              <p className="text-sm leading-relaxed text-gray-700">{dato}</p>
            </div>
          ))}
        </div>
      )}

      {ind.capturaPorEstado?.map((grafica, i) => <GraficaEstados key={i} grafica={grafica} />)}

      {ind.frecuenciaTallas && <FrecuenciaTallasCard grafica={ind.frecuenciaTallas} />}

      {hist.length > 0 && (
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-teal-700 text-base">{t.historica}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hist}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="año" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} label={{ value: t.toneladas, angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value.toLocaleString()} ${name === "captura" ? "ton" : "MXN"}`,
                      name === "captura" ? t.captura : t.valor,
                    ]}
                    labelFormatter={(label) => `${t.año}: ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="captura" stroke="#0d9488" strokeWidth={2} name={t.captura} />
                  <Line type="monotone" dataKey="valor" stroke="#0891b2" strokeWidth={2} name={t.valorMillones} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {!!ind.indicadoresParticipacion?.length && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ind.indicadoresParticipacion.map((d) => (
            <Kpi
              key={d.etiqueta}
              label={d.etiqueta}
              value={d.valor}
              unit={d.unidad}
              icon={d.icono ? ICONOS_CLAVE[d.icono] : Info}
              color={d.color}
            />
          ))}
        </div>
      )}

      {!!ind.participacionEstados?.length && (
        <ParticipacionCard titulo={t.participacion} estados={ind.participacionEstados} />
      )}

      {ind.participacionPorEspecie?.map((g) => (
        <ParticipacionCard key={g.titulo} titulo={g.titulo} estados={g.estados} nota={g.nota} />
      ))}

      {ind.participacionApilada && <ParticipacionApiladaCard grafica={ind.participacionApilada} />}
    </>
  )
}

function Ambiente({ ficha }: { ficha: Ficha }) {
  const t = useTextos()
  if (!ficha.ambiente?.length && !ficha.ambienteGraficas?.length) return null
  return (
    <>
      {!!ficha.ambiente?.length && (
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <SectionTitle icon={Thermometer}>{t.ambiente}</SectionTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ficha.ambiente.map((p, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed">
                {p}
              </p>
            ))}
          </CardContent>
        </Card>
      )}
      {ficha.ambienteGraficas?.map((grafica, i) => <GraficaEstados key={i} grafica={grafica} />)}
    </>
  )
}

function AplicaBadge({ aplica }: { aplica: boolean | null }) {
  const t = useTextos()
  if (aplica === true) {
    return (
      <Badge className="gap-1 border border-green-200 bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="h-3 w-3" /> {t.aplica}
      </Badge>
    )
  }
  if (aplica === false) {
    return (
      <Badge className="gap-1 border border-red-200 bg-red-100 text-red-800 hover:bg-red-100">
        <XCircle className="h-3 w-3" /> {t.noAplica}
      </Badge>
    )
  }
  return (
    <Badge className="border border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-100">{t.sinDato}</Badge>
  )
}

function Normatividad({ ficha }: { ficha: Ficha }) {
  const t = useTextos()
  const [abiertos, setAbiertos] = useState<Set<number>>(new Set())
  if (!ficha.normatividad?.length) return null

  const toggle = (i: number) =>
    setAbiertos((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <SectionTitle icon={Shield}>{t.instrumentos}</SectionTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200">
          {ficha.normatividad.map((row, i) => {
            // Solo son expandibles las filas con disposición o sustento
            const tieneContenido = Boolean(row.disposicion || row.sustento)
            const abierto = abiertos.has(i)
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => tieneContenido && toggle(i)}
                  disabled={!tieneContenido}
                  aria-expanded={tieneContenido ? abierto : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors",
                    tieneContenido ? "cursor-pointer hover:bg-teal-50/60" : "cursor-default",
                  )}
                >
                  <span
                    className={cn(
                      "flex-1 font-semibold",
                      tieneContenido ? "text-gray-800" : "text-gray-500",
                    )}
                  >
                    {row.instrumento}
                  </span>
                  <span className="flex w-28 shrink-0 justify-start">
                    <AplicaBadge aplica={row.aplica} />
                  </span>
                  <span className="flex w-4 shrink-0 justify-center">
                    {tieneContenido && (
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-gray-400 transition-transform duration-200",
                          abierto && "rotate-90",
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </button>

                {tieneContenido && (
                  <div
                    className="grid transition-[grid-template-rows] duration-200 ease-in-out"
                    style={{ gridTemplateRows: abierto ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="space-y-3 px-4 pb-4 pt-1 text-sm">
                        {row.disposicion && (
                          <div>
                            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                              {t.disposicion}
                            </p>
                            <p className="leading-relaxed text-gray-700">{row.disposicion}</p>
                          </div>
                        )}
                        {row.sustento && (
                          <div>
                            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                              {t.sustento}
                            </p>
                            <p className="leading-relaxed text-gray-700">{row.sustento}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Figura de la CNP mostrada tal cual, para gráficas que no pueden reconstruirse
// fielmente a partir de los datos.
function FiguraCNPBloque({ figura }: { figura: FiguraCNP }) {
  return (
    <div>
      <h3 className="text-base font-bold text-teal-800 border-b border-teal-200 pb-1.5 mb-2">{figura.titulo}</h3>
      <div className="rounded-lg border border-gray-200 bg-white p-2">
        <img src={figura.src} alt={figura.alt} className="mx-auto h-auto w-full max-w-lg" loading="lazy" />
      </div>
      {figura.nota && <p className="mt-2 text-xs leading-relaxed text-gray-500">{figura.nota}</p>}
    </div>
  )
}

// Las cifras de RMS de la CNP vienen con dos decimales.
const fmtRMS = (n: number) => n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function StatusSeccion({ ficha }: { ficha: Ficha }) {
  const { idioma } = useIdioma()
  const t = TEXTOS[idioma]
  const s = ficha.status
  if (!s) return null
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <SectionTitle icon={Target}>{t.estadoPesqueria}</SectionTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {!!s.cards?.length && (
          <div className="space-y-3">
            {s.cards.map((c, i) => (
              <div
                key={i}
                className={cn("border-2 rounded-lg p-4 flex items-center gap-4", statusPillClass(c.color))}
              >
                <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center flex-shrink-0">
                  {statusIcon(c.color)}
                </div>
                <div>
                  <h4 className="font-bold mb-0.5">{etiquetaEstatus(idioma, c.categoria)}</h4>
                  <p className="text-sm font-medium text-gray-700">{c.especie}</p>
                  <p className="text-xs text-gray-600">{c.zona}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {s.figuras?.map((f) => <FiguraCNPBloque key={f.src} figura={f} />)}

        {s.estrategia && (
          <div>
            <h3 className="text-base font-bold text-teal-800 border-b border-teal-200 pb-1.5 mb-2">{t.estrategia}</h3>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-sm text-gray-800">{s.estrategia}</p>
            </div>
          </div>
        )}

        {!!s.tacticas?.length && (
          <div>
            <h3 className="text-base font-bold text-teal-800 border-b border-teal-200 pb-1.5 mb-2">{t.tacticas}</h3>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <ul className="space-y-1.5">
                {s.tacticas.map((t, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-800">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!!s.rmsPorEstado?.length && (
          <div>
            <h3 className="text-base font-bold text-teal-800 border-b border-teal-200 pb-1.5 mb-2">
              {t.rms}
            </h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-teal-50 text-teal-800">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">{t.estado}</th>
                    <th className="px-3 py-2 text-right font-semibold">RMS (t)</th>
                    <th className="px-3 py-2 text-right font-semibold">IC −</th>
                    <th className="px-3 py-2 text-right font-semibold">IC +</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {s.rmsPorEstado.map((f, i) => {
                    // La CNP cierra la tabla con el total regional, que se resalta.
                    const esTotal = i === s.rmsPorEstado!.length - 1
                    return (
                      <tr key={f.estado} className={cn(esTotal ? "bg-teal-50/60 font-semibold" : "bg-white")}>
                        <td className="px-3 py-2 text-gray-800 whitespace-nowrap">{f.estado}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-teal-800">{fmtRMS(f.rms)}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-gray-600">{fmtRMS(f.icMenos)}</td>
                        <td className="px-3 py-2 text-right tabular-nums text-gray-600">{fmtRMS(f.icMas)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {s.rmsNota && <p className="mt-2 text-xs leading-relaxed text-gray-500">{s.rmsNota}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function Recomendaciones({ ficha }: { ficha: Ficha }) {
  const t = useTextos()
  if (!ficha.recomendaciones?.length) return null
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <SectionTitle icon={FileText}>{t.recomendaciones}</SectionTitle>
      </CardHeader>
      <CardContent>
        <ol className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200">
          {ficha.recomendaciones.map((row, i) => {
            // "Sin información", "Sin avance", "Sin datos" (o vacío) se consideran sin avance; el resto, con avance
            const conAvance =
              Boolean(row.avance.trim()) && !/^sin\s+(informaci[oó]n|avance|dato)/i.test(row.avance.trim())
            return (
              <li key={i} className="flex gap-4 px-4 py-4 transition-colors hover:bg-teal-50/40">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold tabular-nums text-teal-700">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="font-medium leading-snug text-gray-800">{row.recomendacion}</p>
                  {conAvance && (
                    <p className="text-sm leading-relaxed text-gray-600">{row.avance}</p>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </CardContent>
    </Card>
  )
}
