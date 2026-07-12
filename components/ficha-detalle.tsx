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
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { Especie } from "@/lib/especies-data"

const toArray = <T,>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])

const statusPillClass = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-100 text-green-800 border-green-200"
    case "red":
      return "bg-red-100 text-red-800 border-red-200"
    case "yellow":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
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

type SeccionId = "generalidades" | "indicadores" | "ambiente" | "normatividad" | "status" | "recomendaciones"

const SECCIONES: { id: SeccionId; label: string; icon: typeof Fish }[] = [
  { id: "generalidades", label: "Generalidades", icon: Fish },
  { id: "indicadores", label: "Indicadores", icon: TrendingUp },
  { id: "ambiente", label: "Amb. y Clima", icon: Thermometer },
  { id: "normatividad", label: "Normatividad", icon: Shield },
  { id: "status", label: "Status", icon: Target },
  { id: "recomendaciones", label: "Recomendaciones", icon: FileText },
]

function EspecieImagen({ id, nombre, className }: { id: string; nombre: string; className?: string }) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100", className)}>
        <Fish className="w-1/3 h-1/3 text-teal-400" />
      </div>
    )
  }
  return <img src={`/images/especies/${id}.jpg`} alt={nombre} className={className} onError={() => setError(true)} />
}

export function FichaDetalle({ especie }: { especie: Especie }) {
  const ficha = especie.ficha
  const disponibles = SECCIONES.filter((s) => {
    if (!ficha) return false
    if (s.id === "ambiente") return !!ficha.ambiente?.length
    if (s.id === "status") return !!(ficha.status?.cards?.length || ficha.status?.estrategia || ficha.status?.tacticas?.length)
    if (s.id === "recomendaciones") return !!ficha.recomendaciones?.length
    return !!ficha[s.id]
  })

  const [activa, setActiva] = useState<SeccionId>(disponibles[0]?.id ?? "generalidades")
  const seccionActiva = disponibles.some((s) => s.id === activa) ? activa : disponibles[0]?.id

  const estados = toArray(especie.status)
  const colores = toArray(especie.statusColor)

  return (
    <div className="flex flex-col h-full">
      {/* Encabezado */}
      <div className="flex gap-4 p-5 border-b border-teal-100">
        <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
          <EspecieImagen id={especie.id} nombre={especie.nombre} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">{especie.nombre}</h2>
          <p className="text-base text-gray-500 italic">{especie.nombreCientifico}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-teal-600" />
              {especie.region}
            </span>
            <span>
              Captura: <span className="font-semibold text-gray-900 tabular-nums">{especie.captura}</span>
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {estados.map((estado, i) => {
              const color = colores[i] ?? colores[0]
              return (
                <Badge key={i} className={cn(statusPillClass(color), "flex items-center gap-1")}>
                  {statusIcon(color)}
                  <span className="text-xs">{estado}</span>
                </Badge>
              )
            })}
          </div>
        </div>
      </div>

      {!ficha ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 text-gray-500">
          <Fish className="w-12 h-12 text-teal-300 mb-3" />
          <p className="font-medium text-gray-700">Ficha en preparación</p>
          <p className="text-sm">{especie.descripcion}</p>
        </div>
      ) : (
        <>
          {/* Sub-pestañas del detalle */}
          <div className="flex gap-1 px-4 pt-3 border-b border-teal-100 overflow-x-auto">
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
                  {s.label}
                </button>
              )
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {seccionActiva === "generalidades" && <Generalidades ficha={ficha} />}
            {seccionActiva === "indicadores" && <Indicadores ficha={ficha} />}
            {seccionActiva === "ambiente" && <Ambiente ficha={ficha} />}
            {seccionActiva === "normatividad" && <Normatividad ficha={ficha} />}
            {seccionActiva === "status" && <StatusSeccion ficha={ficha} />}
            {seccionActiva === "recomendaciones" && <Recomendaciones ficha={ficha} />}
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
  const g = ficha.generalidades
  if (!g) return null
  return (
    <>
      {!!g.descripcion?.length && (
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <SectionTitle icon={Fish}>Descripción general</SectionTitle>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {g.embarcaciones && (
            <Card className="border-teal-200">
              <CardHeader className="pb-3">
                <SectionTitle icon={Ship}>Tipos de embarcaciones</SectionTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-sm">{g.embarcaciones}</p>
              </CardContent>
            </Card>
          )}
          {g.artesPesca && (
            <Card className="border-teal-200">
              <CardHeader className="pb-3">
                <SectionTitle icon={Anchor}>Artes de pesca</SectionTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-sm">{g.artesPesca}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {(g.especiesObjetivo?.length || g.especiesAsociadas?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {!!g.especiesObjetivo?.length && (
            <Card className="border-teal-200">
              <CardHeader className="pb-3">
                <SectionTitle icon={Target}>Especies objetivo</SectionTitle>
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
                <SectionTitle icon={Fish}>Especies asociadas</SectionTitle>
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

function Kpi({ label, value, unit, icon: Icon }: { label: string; value: string; unit: string; icon: typeof Fish }) {
  return (
    <Card className="border-teal-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-teal-800 tabular-nums">{value}</p>
            <p className="text-xs text-gray-500">{unit}</p>
          </div>
          <Icon className="w-7 h-7 text-teal-500" />
        </div>
      </CardContent>
    </Card>
  )
}

function Indicadores({ ficha }: { ficha: Ficha }) {
  const ind = ficha.indicadores
  if (!ind) return null
  const hist = ind.capturaHistorica ?? []
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ind.capturaAnual && <Kpi label="Captura anual" value={ind.capturaAnual} unit="toneladas" icon={TrendingUp} />}
        {ind.valorProduccion && <Kpi label="Valor producción" value={ind.valorProduccion} unit="millones MXN" icon={DollarSign} />}
        {ind.empleos && <Kpi label="Empleos directos" value={ind.empleos} unit="pescadores" icon={Users} />}
        {ind.embarcaciones && <Kpi label="Embarcaciones" value={ind.embarcaciones} unit="activas" icon={Anchor} />}
      </div>

      {hist.length > 0 && (
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-teal-700 text-base">Captura histórica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hist}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="año" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} label={{ value: "Toneladas", angle: -90, position: "insideLeft" }} />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value.toLocaleString()} ${name === "captura" ? "ton" : "MXN"}`,
                      name === "captura" ? "Captura" : "Valor",
                    ]}
                    labelFormatter={(label) => `Año: ${label}`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="captura" stroke="#0d9488" strokeWidth={2} name="Captura" />
                  <Line type="monotone" dataKey="valor" stroke="#0891b2" strokeWidth={2} name="Valor (millones)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {!!ind.participacionEstados?.length && (
        <Card className="border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-teal-700 text-base">Participación por estado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ind.participacionEstados.map((item) => (
              <div key={item.estado} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.estado}</span>
                  <span className="text-sm font-bold text-teal-600 tabular-nums">{item.porcentaje}%</span>
                </div>
                <Progress value={item.porcentaje} className="h-2.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  )
}

function Ambiente({ ficha }: { ficha: Ficha }) {
  if (!ficha.ambiente?.length) return null
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <SectionTitle icon={Thermometer}>Efectos ambientales y del cambio climático</SectionTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ficha.ambiente.map((p, i) => (
          <p key={i} className="text-sm text-gray-700 leading-relaxed">
            {p}
          </p>
        ))}
      </CardContent>
    </Card>
  )
}

function AplicaBadge({ aplica }: { aplica: boolean | null }) {
  if (aplica === true) {
    return (
      <Badge className="gap-1 border border-green-200 bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="h-3 w-3" /> Aplica
      </Badge>
    )
  }
  if (aplica === false) {
    return (
      <Badge className="gap-1 border border-red-200 bg-red-100 text-red-800 hover:bg-red-100">
        <XCircle className="h-3 w-3" /> No aplica
      </Badge>
    )
  }
  return (
    <Badge className="border border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-100">Sin dato</Badge>
  )
}

function Normatividad({ ficha }: { ficha: Ficha }) {
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
        <SectionTitle icon={Shield}>Normatividad e instrumentos de manejo</SectionTitle>
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
                  <AplicaBadge aplica={row.aplica} />
                  {tieneContenido && (
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200",
                        abierto && "rotate-90",
                      )}
                      aria-hidden="true"
                    />
                  )}
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
                              Disposición
                            </p>
                            <p className="leading-relaxed text-gray-700">{row.disposicion}</p>
                          </div>
                        )}
                        {row.sustento && (
                          <div>
                            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-gray-500">
                              Sustento
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

function StatusSeccion({ ficha }: { ficha: Ficha }) {
  const s = ficha.status
  if (!s) return null
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <SectionTitle icon={Target}>Estado de la pesquería</SectionTitle>
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
                  <h4 className="font-bold mb-0.5">{c.categoria}</h4>
                  <p className="text-sm font-medium text-gray-700">{c.especie}</p>
                  <p className="text-xs text-gray-600">{c.zona}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {s.estrategia && (
          <div>
            <h3 className="text-base font-bold text-teal-800 border-b border-teal-200 pb-1.5 mb-2">Estrategia</h3>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <p className="text-sm text-gray-800">{s.estrategia}</p>
            </div>
          </div>
        )}

        {!!s.tacticas?.length && (
          <div>
            <h3 className="text-base font-bold text-teal-800 border-b border-teal-200 pb-1.5 mb-2">Tácticas</h3>
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
      </CardContent>
    </Card>
  )
}

function Recomendaciones({ ficha }: { ficha: Ficha }) {
  if (!ficha.recomendaciones?.length) return null
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <SectionTitle icon={FileText}>Recomendaciones de manejo</SectionTitle>
      </CardHeader>
      <CardContent>
        <ol className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200">
          {ficha.recomendaciones.map((row, i) => {
            // "Sin información de avance" (o vacío) se marca como sin avance; el resto, con avance
            const conAvance =
              Boolean(row.avance.trim()) && !/sin (informaci[oó]n de )?avance/i.test(row.avance)
            return (
              <li key={i} className="flex gap-4 px-4 py-4 transition-colors hover:bg-teal-50/40">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold tabular-nums text-teal-700">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="font-medium leading-snug text-gray-800">{row.recomendacion}</p>
                  {row.avance && (
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold",
                          conAvance
                            ? "border-teal-200 bg-teal-50 text-teal-700"
                            : "border-gray-200 bg-gray-100 text-gray-500",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            conAvance ? "bg-teal-500" : "bg-gray-400",
                          )}
                          aria-hidden="true"
                        />
                        {conAvance ? "Con avance" : "Sin avance"}
                      </span>
                      <span className="leading-relaxed">{row.avance}</span>
                    </div>
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
