"use client"

import { useEffect, useMemo, useState } from "react"
import { Fish, MapPin, Clock, X, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type VedaData, isVedaActive } from "@/lib/vedas-data"
import { useIdioma } from "@/components/idioma-provider"
import { MESES_CORTOS, etiquetaTipoVeda, etiquetaZona, fechaDiaMes, type Idioma } from "@/lib/i18n"

interface VedasTimelineProps {
  vedas: VedaData[]
}

const TEXTOS = {
  es: {
    temporales: "Temporales",
    permanentes: "Permanentes",
    continentales: "Aguas continentales",
    sinVedas: "Sin vedas",
    sinCoincidencias: "No hay vedas que coincidan con los filtros seleccionados.",
    clic: "Clic en una fila para ver el detalle",
    cerrar: "Cerrar detalle",
    activa: "ACTIVA",
    inactiva: "INACTIVA",
    verDOF: "Ver DOF",
    todoElAño: "Todo el año",
    pie: (n: number) => `${n} ${n === 1 ? "veda" : "vedas"} · la línea vertical marca el día de hoy`,
  },
  en: {
    temporales: "Seasonal",
    permanentes: "Permanent",
    continentales: "Inland waters",
    sinVedas: "No closures",
    sinCoincidencias: "No closures match the selected filters.",
    clic: "Click a row to see the details",
    cerrar: "Close details",
    activa: "ACTIVE",
    inactiva: "INACTIVE",
    verDOF: "See DOF",
    todoElAño: "All year",
    pie: (n: number) => `${n} ${n === 1 ? "closure" : "closures"} · the vertical line marks today`,
  },
} satisfies Record<Idioma, unknown>

// Color de la barra según el tipo de veda.
const tipoColor: Record<string, string> = {
  Permanente: "bg-red-500",
  "Temporal Fija": "bg-orange-500",
  "Temporal Variable": "bg-amber-400",
}

// Fracción del año (0..1) para una fecha "MM-DD". Se usa un año no bisiesto fijo
// porque las vedas se repiten el mismo día y mes cada año.
function fraccionAnual(dateStr: string): number | null {
  const m = dateStr?.match(/^(\d{2})-(\d{2})$/)
  if (!m) return null
  const cur = Date.UTC(2001, +m[1] - 1, +m[2])
  return (cur - Date.UTC(2001, 0, 1)) / (Date.UTC(2002, 0, 1) - Date.UTC(2001, 0, 1))
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
  const { idioma } = useIdioma()
  const t = TEXTOS[idioma]
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

  // Tres secciones con encabezado: temporales y permanentes marinas, y todas las
  // de aguas continentales. Dentro de cada una, orden alfabético por pesquería,
  // luego región y especie.
  const secciones = useMemo(() => {
    const ordenar = (lista: VedaData[]) =>
      [...lista].sort(
        (a, b) =>
          a.pesqueria.localeCompare(b.pesqueria, "es", { sensitivity: "base" }) ||
          a.region.localeCompare(b.region, "es") ||
          a.nombreCientifico.localeCompare(b.nombreCientifico, "es"),
      )
    const continentales = vedas.filter((v) => v.zona === "Aguas continentales")
    const marinas = vedas.filter((v) => v.zona !== "Aguas continentales")
    return [
      { titulo: t.temporales, vedas: marinas.filter((v) => v.tipoVeda !== "Permanente") },
      { titulo: t.permanentes, vedas: marinas.filter((v) => v.tipoVeda === "Permanente") },
      { titulo: t.continentales, vedas: continentales },
    ]
      .filter((sec) => sec.vedas.length > 0)
      .map((sec) => ({ titulo: sec.titulo, filas: ordenar(sec.vedas).map((veda) => ({ veda, segs: segmentos(veda) })) }))
  }, [vedas, t])
  const totalFilas = secciones.reduce((n, sec) => n + sec.filas.length, 0)

  const gridBg =
    "repeating-linear-gradient(to right, transparent, transparent calc(100%/12 - 1px), rgba(15,23,42,0.08) calc(100%/12 - 1px), rgba(15,23,42,0.08) calc(100%/12))"

  if (vedas.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
        <CardContent className="p-12 text-center">
          <Fish className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">{t.sinVedas}</h3>
          <p className="text-gray-600">{t.sinCoincidencias}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
        <span className="flex items-center gap-2">
          <span className="h-3 w-4 rounded bg-red-500" /> {etiquetaTipoVeda(idioma, "Permanente")}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-4 rounded bg-orange-500" /> {etiquetaTipoVeda(idioma, "Temporal Fija")}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-4 rounded bg-amber-400" /> {etiquetaTipoVeda(idioma, "Temporal Variable")}
        </span>
        <span className="ml-auto text-xs text-gray-500">{t.clic}</span>
      </div>

      {/* Detalle de la veda seleccionada */}
      {seleccion && (
        <Card className="border-teal-300 bg-teal-50/60">
          <CardContent className="relative p-5">
            <button
              onClick={() => setSeleccion(null)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
              aria-label={t.cerrar}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="flex items-center text-lg font-bold text-gray-900">
                <Fish className="mr-2 h-4 w-4 text-teal-600" />
                {seleccion.pesqueria}
              </h3>
              <Badge className={isVedaActive(seleccion) ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-700"}>
                {isVedaActive(seleccion) ? t.activa : t.inactiva}
              </Badge>
              <Badge variant="outline">{etiquetaTipoVeda(idioma, seleccion.tipoVeda)}</Badge>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-sm text-gray-700">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {seleccion.nombreCientifico && (
                  <>
                    <span className="italic text-gray-600">{seleccion.nombreCientifico}</span>
                    <span className="text-gray-400">·</span>
                  </>
                )}
                <MapPin className="h-4 w-4 shrink-0 text-teal-600" />
                <span>{seleccion.region} · {etiquetaZona(idioma, seleccion.zona)}</span>
              </div>
              {seleccion.enlaceDOF && (
                <a
                  href={seleccion.enlaceDOF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100 hover:border-blue-300"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t.verDOF}
                </a>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
              <Clock className="h-4 w-4 shrink-0 text-teal-600" />
              {seleccion.tipoVeda === "Permanente"
                ? t.todoElAño
                : [
                    [seleccion.fechaInicio1, seleccion.fechaTermino1],
                    [seleccion.fechaInicio2, seleccion.fechaTermino2],
                    [seleccion.fechaInicio3, seleccion.fechaTermino3],
                  ]
                    .filter(([a, b]) => a && b)
                    .map(([a, b]) => `${fechaDiaMes(idioma, a)}–${fechaDiaMes(idioma, b)}`)
                    .join(" · ")}
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
                  {MESES_CORTOS[idioma].map((m) => (
                    <div key={m} className="text-center text-xs font-medium text-gray-500">
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Filas con scroll vertical si hay muchas */}
              <div className="max-h-[60vh] overflow-y-auto pr-1">
                {secciones.map((sec) => (
                  <section key={sec.titulo} className="pb-2">
                    <h4 className="sticky top-0 z-20 mb-1 flex items-baseline gap-2 border-b border-gray-200 bg-white py-1.5 text-sm font-semibold text-gray-800">
                      {sec.titulo}
                      <span className="text-xs font-normal text-gray-500">{sec.filas.length}</span>
                    </h4>
                    <div className="space-y-1">
                      {sec.filas.map(({ veda, segs }) => {
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
                            <div className="flex w-32 shrink-0 flex-col pr-2 sm:w-44" title={`${veda.pesqueria} · ${veda.region}`}>
                              <span className="truncate text-xs font-medium text-gray-800 sm:text-sm">{veda.pesqueria}</span>
                              {veda.nombreCientifico && (
                                <span className="truncate text-[10px] italic leading-tight text-gray-500 sm:text-xs">{veda.nombreCientifico}</span>
                              )}
                            </div>
                            <div className="relative h-5 flex-1 rounded" style={{ backgroundImage: gridBg }}>
                              {/* Marcador de hoy */}
                              {hoy != null && (
                                <div
                                  className="absolute inset-y-0 z-10 -translate-x-1/2 border-l-2 border-dashed border-teal-500"
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
                  </section>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            {t.pie(totalFilas)}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
