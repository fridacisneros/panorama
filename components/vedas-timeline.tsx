"use client"

import { useEffect, useMemo, useState } from "react"
import { Fish, MapPin, Clock, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type VedaData, isVedaActive, formatDateToDDMM } from "@/lib/vedas-data"

interface VedasTimelineProps {
  vedas: VedaData[]
}

const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

// Color de la barra según el tipo de veda.
const tipoColor: Record<string, string> = {
  Permanente: "bg-red-500",
  "Temporal Fija": "bg-orange-500",
  "Temporal Variable": "bg-amber-400",
}

// Fracción del año (0..1) para una fecha ISO YYYY-MM-DD, sin problemas de zona horaria.
function fraccionAnual(dateStr: string): number | null {
  if (!dateStr || dateStr === "Todo el año" || dateStr === "Por definir") return null
  const m = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return null
  const year = +m[1]
  const cur = Date.UTC(year, +m[2] - 1, +m[3])
  const start = Date.UTC(year, 0, 1)
  const end = Date.UTC(year + 1, 0, 1)
  return (cur - start) / (end - start)
}

// Devuelve los segmentos {left, width} en % para una veda (maneja varios periodos y cruce de año).
function segmentos(veda: VedaData): { left: number; width: number }[] {
  if (veda.tipoVeda === "Permanente") return [{ left: 0, width: 100 }]

  const periodos: [string, string][] = [
    [veda.fechaInicio1, veda.fechaTermino1],
    [veda.fechaInicio2, veda.fechaTermino2],
    [veda.fechaInicio3, veda.fechaTermino3],
  ]

  const segs: { left: number; width: number }[] = []
  for (const [ini, fin] of periodos) {
    const s = fraccionAnual(ini)
    const e = fraccionAnual(fin)
    if (s == null || e == null) continue
    if (e >= s) {
      segs.push({ left: s * 100, width: Math.max((e - s) * 100, 1.2) })
    } else {
      // cruza el fin de año: se parte en dos
      segs.push({ left: s * 100, width: (1 - s) * 100 })
      segs.push({ left: 0, width: Math.max(e * 100, 1.2) })
    }
  }
  return segs
}

export function VedasTimeline({ vedas }: VedasTimelineProps) {
  const [seleccion, setSeleccion] = useState<VedaData | null>(null)
  const [hoy, setHoy] = useState<number | null>(null)

  // El marcador de "hoy" se calcula tras el montaje para evitar desajustes SSR.
  useEffect(() => {
    const d = new Date()
    const start = Date.UTC(d.getFullYear(), 0, 1)
    const end = Date.UTC(d.getFullYear() + 1, 0, 1)
    const cur = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
    setHoy((cur - start) / (end - start))
  }, [])

  // Las vedas permanentes se agrupan al final (orden estable dentro de cada grupo).
  const filas = useMemo(() => {
    const temporales = vedas.filter((v) => v.tipoVeda !== "Permanente")
    const permanentes = vedas.filter((v) => v.tipoVeda === "Permanente")
    return [...temporales, ...permanentes].map((veda) => ({ veda, segs: segmentos(veda) }))
  }, [vedas])

  const gridBg =
    "repeating-linear-gradient(to right, transparent, transparent calc(100%/12 - 1px), rgba(15,23,42,0.08) calc(100%/12 - 1px), rgba(15,23,42,0.08) calc(100%/12))"

  if (vedas.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
        <CardContent className="p-12 text-center">
          <Fish className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Sin vedas</h3>
          <p className="text-gray-600">No hay vedas que coincidan con los filtros seleccionados.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
        <span className="flex items-center gap-2">
          <span className="h-3 w-4 rounded bg-red-500" /> Permanente
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-4 rounded bg-orange-500" /> Temporal Fija
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-4 rounded bg-amber-400" /> Temporal Variable
        </span>
        <span className="ml-auto text-xs text-gray-500">Clic en una fila para ver el detalle</span>
      </div>

      {/* Detalle de la veda seleccionada */}
      {seleccion && (
        <Card className="border-teal-300 bg-teal-50/60">
          <CardContent className="relative p-5">
            <button
              onClick={() => setSeleccion(null)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
              aria-label="Cerrar detalle"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="flex items-center text-lg font-bold text-gray-900">
                <Fish className="mr-2 h-4 w-4 text-teal-600" />
                {seleccion.pesqueria}
              </h3>
              <Badge className={isVedaActive(seleccion) ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}>
                {isVedaActive(seleccion) ? "ACTIVA" : "INACTIVA"}
              </Badge>
              <Badge variant="outline">{seleccion.tipoVeda}</Badge>
            </div>
            <p className="mb-3 text-sm italic text-gray-600">{seleccion.nombreCientifico}</p>
            <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-600" /> {seleccion.region} · {seleccion.zona}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-600" />
                {seleccion.tipoVeda === "Permanente"
                  ? "Todo el año"
                  : [
                      [seleccion.fechaInicio1, seleccion.fechaTermino1],
                      [seleccion.fechaInicio2, seleccion.fechaTermino2],
                      [seleccion.fechaInicio3, seleccion.fechaTermino3],
                    ]
                      .filter(([a, b]) => a && b)
                      .map(([a, b]) => `${formatDateToDDMM(a)}–${formatDateToDDMM(b)}`)
                      .join(" · ")}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Línea de tiempo */}
      <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Encabezado de meses */}
              <div className="mb-2 flex items-end">
                <div className="w-32 shrink-0 sm:w-44" />
                <div className="grid flex-1 grid-cols-12">
                  {MESES.map((m) => (
                    <div key={m} className="text-center text-xs font-medium text-gray-500">
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Filas con scroll vertical si hay muchas */}
              <div className="max-h-[60vh] space-y-1 overflow-y-auto pr-1">
                {filas.map(({ veda, segs }) => {
                  const activa = isVedaActive(veda)
                  const sel = seleccion?.id === veda.id
                  return (
                    <button
                      key={veda.id}
                      onClick={() => setSeleccion(veda)}
                      className={`flex w-full items-center rounded-md py-0.5 text-left transition-colors hover:bg-teal-50 ${
                        sel ? "bg-teal-100" : ""
                      }`}
                    >
                      <div className="w-32 shrink-0 truncate pr-2 text-xs font-medium text-gray-800 sm:w-44 sm:text-sm">
                        {veda.pesqueria}
                      </div>
                      <div className="relative h-5 flex-1 rounded" style={{ backgroundImage: gridBg }}>
                        {/* Marcador de hoy */}
                        {hoy != null && (
                          <div
                            className="absolute inset-y-0 w-px bg-teal-600/70"
                            style={{ left: `${hoy * 100}%` }}
                          />
                        )}
                        {segs.map((seg, i) => (
                          <div
                            key={i}
                            className={`absolute inset-y-0.5 rounded ${tipoColor[veda.tipoVeda] ?? "bg-gray-400"} ${
                              activa ? "" : "opacity-60"
                            }`}
                            style={{ left: `${seg.left}%`, width: `${seg.width}%` }}
                          />
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            {filas.length} {filas.length === 1 ? "veda" : "vedas"} · la línea vertical marca el día de hoy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
