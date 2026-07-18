"use client"

// ---------------------------------------------------------------------------
// Gráficas de "panorama" para la página de inicio. Todo se calcula en tiempo
// real a partir del arreglo `especies` (lib/especies-data.ts), de modo que al
// agregar o editar una ficha las gráficas se actualizan solas.
// ---------------------------------------------------------------------------

import { useMemo } from "react"
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { especies } from "@/lib/especies-data"

// Paleta de estatus (reservada, semántica: verde=potencial, ámbar=al máximo,
// rojo=deterioro, gris=indeterminado). Siempre acompañada de etiqueta y conteo,
// nunca color solo.
const ESTATUS = {
  yellow: { label: "Aprovechado al máximo", color: "#d97706" },
  green: { label: "Con potencial de desarrollo", color: "#16a34a" },
  red: { label: "En deterioro", color: "#dc2626" },
  gray: { label: "Indeterminado", color: "#94a3b8" },
} as const

type EstatusKey = keyof typeof ESTATUS

const ORDEN_ESTATUS: EstatusKey[] = ["yellow", "green", "red", "gray"]

// Litoral: dos categorías (identidad), colores distintos de la marca.
const LITORAL = {
  pacifico: { label: "Pacífico", color: "#0d9488" },
  golfo: { label: "Golfo y Caribe", color: "#2563eb" },
}

const first = <T,>(v: T | T[] | undefined): T | undefined =>
  Array.isArray(v) ? v[0] : v

const parseCaptura = (s?: string): number => {
  if (!s) return 0
  const n = Number.parseInt(s.replace(/[^\d]/g, ""), 10)
  return Number.isNaN(n) ? 0 : n
}

const fmt = new Intl.NumberFormat("es-MX")

function ChartCard({
  titulo,
  descripcion,
  children,
}: {
  titulo: string
  descripcion: string
  children: React.ReactNode
}) {
  return (
    <Card className="border-teal-100 bg-white shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-800">{titulo}</h3>
        <p className="mb-4 text-sm text-gray-500">{descripcion}</p>
        {children}
      </CardContent>
    </Card>
  )
}

export function PanoramaGraficas() {
  const { estatusData, totalEstatus, totalCatalogo, capturaData, litoralData, totalLitoral } =
    useMemo(() => {
      const totalCatalogo = especies.length
      // --- Estatus (estatus principal de cada pesquería) ---
      const conteo: Record<EstatusKey, number> = { yellow: 0, green: 0, red: 0, gray: 0 }
      for (const e of especies) {
        const c = first(e.statusColor) as EstatusKey | undefined
        if (c && c in conteo) conteo[c] += 1
      }
      const estatusData = ORDEN_ESTATUS
        .map((k) => ({ key: k, name: ESTATUS[k].label, value: conteo[k], color: ESTATUS[k].color }))
        .filter((d) => d.value > 0)
      const totalEstatus = estatusData.reduce((a, d) => a + d.value, 0)

      // --- Top capturas ---
      const capturaData = especies
        .map((e) => ({ nombre: e.nombre, captura: parseCaptura(e.captura) }))
        .filter((d) => d.captura > 0)
        .sort((a, b) => b.captura - a.captura)
        .slice(0, 8)

      // --- Litoral ---
      let pac = 0
      let gol = 0
      for (const e of especies) {
        if (e.region?.includes("Pacífico")) pac += 1
        else gol += 1
      }
      const totalLitoral = pac + gol
      const litoralData = [
        { ...LITORAL.pacifico, value: pac },
        { ...LITORAL.golfo, value: gol },
      ]

      return { estatusData, totalEstatus, totalCatalogo, capturaData, litoralData, totalLitoral }
    }, [])

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Estatus de aprovechamiento (dona) */}
      <ChartCard
        titulo="Estatus de aprovechamiento"
        descripcion={`Estado de las ${totalEstatus} pesquerías con ficha evaluada`}
      >
        <div className="flex items-center gap-4">
          <div className="relative h-40 w-40 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estatusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={2}
                  stroke="#fff"
                  strokeWidth={2}
                >
                  {estatusData.map((d) => (
                    <Cell key={d.key} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [`${value} pesquerías`, name]}
                  contentStyle={{ borderRadius: 8, border: "1px solid #ccfbf1", fontSize: 13 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-800 tabular-nums">{totalEstatus}</span>
              <span className="text-xs text-gray-500">evaluadas</span>
              <span className="text-[10px] text-gray-400">de {totalCatalogo}</span>
            </div>
          </div>
          <ul className="flex-1 space-y-2">
            {estatusData.map((d) => (
              <li key={d.key} className="flex items-center gap-2 text-sm">
                <span className="h-3 w-3 flex-shrink-0 rounded-sm" style={{ backgroundColor: d.color }} />
                <span className="flex-1 text-gray-700">{d.name}</span>
                <span className="font-semibold text-gray-900 tabular-nums">{d.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </ChartCard>

      {/* Top capturas (barras horizontales) */}
      <ChartCard
        titulo="Mayores capturas"
        descripcion="Volumen anual reportado por pesquería (toneladas)"
      >
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={capturaData}
            layout="vertical"
            margin={{ top: 0, right: 12, bottom: 0, left: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="nombre"
              width={110}
              tick={{ fontSize: 12, fill: "#4b5563" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: "#f0fdfa" }}
              formatter={(value: number) => [`${fmt.format(value)} t`, "Captura"]}
              contentStyle={{ borderRadius: 8, border: "1px solid #ccfbf1", fontSize: 13 }}
            />
            <Bar dataKey="captura" fill="#0d9488" radius={[0, 4, 4, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Distribución por litoral */}
      <ChartCard
        titulo="Pesquerías por litoral"
        descripcion="Distribución entre los dos grandes litorales del país"
      >
        <div className="space-y-5 pt-2">
          {litoralData.map((d) => {
            const pct = totalLitoral ? Math.round((d.value / totalLitoral) * 100) : 0
            return (
              <div key={d.label}>
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.color }} />
                    {d.label}
                  </span>
                  <span className="text-sm text-gray-500">
                    <span className="font-bold text-gray-900 tabular-nums">{d.value}</span> · {pct}%
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            )
          })}
          <p className="pt-1 text-xs text-gray-400">
            Total: {totalLitoral} pesquerías en el catálogo
          </p>
        </div>
      </ChartCard>
    </div>
  )
}
