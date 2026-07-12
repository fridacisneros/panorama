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
              <p key={i} className="text-gray-700 leading-relaxed">
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
          <p key={i} className="text-gray-700 leading-relaxed">
            {p}
          </p>
        ))}
      </CardContent>
    </Card>
  )
}

function Normatividad({ ficha }: { ficha: Ficha }) {
  if (!ficha.normatividad?.length) return null
  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <SectionTitle icon={Shield}>Normatividad e instrumentos de manejo</SectionTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-teal-50 text-left">
                <th className="px-4 py-3 font-bold text-gray-700 border-b border-gray-200">Instrumento de manejo</th>
                <th className="px-3 py-3 font-bold text-gray-700 border-b border-gray-200 text-center">Aplica</th>
                <th className="px-4 py-3 font-bold text-gray-700 border-b border-gray-200">Disposición</th>
                <th className="px-4 py-3 font-bold text-gray-700 border-b border-gray-200">Sustento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ficha.normatividad.map((row, i) => (
                <tr key={i} className="hover:bg-teal-50/40 align-top">
                  <td className="px-4 py-3 font-semibold text-gray-800">{row.instrumento}</td>
                  <td className="px-3 py-3 text-center">
                    {row.aplica === true ? (
                      <span className="text-green-700 font-bold">✓ Sí</span>
                    ) : row.aplica === false ? (
                      <span className="text-red-600 font-bold">✗ No</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700 leading-relaxed">{row.disposicion}</td>
                  <td className="px-4 py-3 text-gray-700 leading-relaxed">{row.sustento}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <p className="text-gray-800">{s.estrategia}</p>
            </div>
          </div>
        )}

        {!!s.tacticas?.length && (
          <div>
            <h3 className="text-base font-bold text-teal-800 border-b border-teal-200 pb-1.5 mb-2">Tácticas</h3>
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <ul className="space-y-1.5">
                {s.tacticas.map((t, i) => (
                  <li key={i} className="flex items-start text-gray-800">
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
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-teal-50 text-left">
                <th className="px-4 py-3 font-bold text-gray-700 border-b border-gray-200">Recomendación</th>
                <th className="px-4 py-3 font-bold text-gray-700 border-b border-gray-200">Implementado / Avance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ficha.recomendaciones.map((row, i) => (
                <tr key={i} className="hover:bg-teal-50/40 align-top">
                  <td className="px-4 py-3 text-gray-800 font-medium">{row.recomendacion}</td>
                  <td className="px-4 py-3 text-gray-700 leading-relaxed">{row.avance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
