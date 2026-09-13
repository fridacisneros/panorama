"use client"

// ---------------------------------------------------------------------------
// "El panorama en cifras" — recorrido guiado de la portada. Cada gráfica tiene
// su propio bloque y los bloques se intercalan: la gráfica queda fija (sticky)
// a un lado mientras el texto avanza al otro, alternando izquierda y derecha.
// Dentro de cada bloque, el paso que cruza el centro de la pantalla resalta la
// parte del dato que se está contando.
//
// Todo se calcula en tiempo real a partir del arreglo `especies`
// (lib/especies-data.ts), de modo que al agregar o editar una ficha tanto las
// gráficas como las cifras del texto se actualizan solas.
//
// Paleta de estatus validada con el validador de dataviz (superficie clara,
// todos los pares): banda de luminosidad PASS, separación CVD PASS (peor par
// #10b981↔#d97706, ΔE 10.7 en deuteranopía) y piso de visión normal PASS
// (18.8). Se aceptan a propósito dos avisos: el gris de "Indeterminado" es
// deliberadamente neutro (croma bajo, es la categoría "sin dato") y el verde
// queda en 2.47:1 de contraste. Por eso ningún estatus se comunica sólo con
// color: siempre va acompañado de etiqueta y conteo visibles.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { especies } from "@/lib/especies-data"

const ESTATUS = {
  yellow: { label: "Aprovechado al máximo", color: "#d97706" },
  green: { label: "Con potencial de desarrollo", color: "#10b981" },
  red: { label: "En deterioro", color: "#b91c1c" },
  gray: { label: "Indeterminado", color: "#475569" },
} as const

type EstatusKey = keyof typeof ESTATUS

const ORDEN_ESTATUS: EstatusKey[] = ["yellow", "green", "red", "gray"]

// Qué significa cada estatus, para el texto del paso correspondiente.
const GLOSA_ESTATUS: Record<EstatusKey, string> = {
  yellow:
    "Se explotan en su límite: el recurso soporta la pesca actual, pero no admite más esfuerzo sin ponerse en riesgo.",
  green:
    "Admiten crecimiento ordenado, con cuotas, permisos de fomento y seguimiento de la biomasa disponible.",
  red: "Muestran señales de sobreexplotación y requieren medidas de recuperación antes de aumentar la captura.",
  gray: "No hay información suficiente para determinar en qué condición se encuentra la población.",
}

// Litoral: dos categorías (identidad), colores de la marca. Validados: todos
// los chequeos PASS (peor par ΔE 20.7 en deuteranopía).
const LITORAL = {
  pacifico: { label: "Pacífico", color: "#0d9488" },
  golfo: { label: "Golfo y Caribe", color: "#2563eb" },
}

// Magnitud (una sola serie): un solo tono; el máximo se oscurece para destacar.
const CAPTURA_COLOR = "#5eead4"
const CAPTURA_COLOR_MAX = "#0f766e"

const first = <T,>(v: T | T[] | undefined): T | undefined =>
  Array.isArray(v) ? v[0] : v

const parseCaptura = (s?: string): number => {
  if (!s) return 0
  const n = Number.parseInt(s.replace(/[^\d]/g, ""), 10)
  return Number.isNaN(n) ? 0 : n
}

const fmt = new Intl.NumberFormat("es-MX")

const pct = (n: number, total: number) => (total ? Math.round((n / total) * 100) : 0)

const TOOLTIP_STYLE = {
  borderRadius: 8,
  border: "1px solid #ccfbf1",
  fontSize: 13,
} as const

// Un paso del recorrido. Los campos de resaltado son opcionales: cada bloque
// usa el que le toca (estatus, litoral o el foco de la mayor captura).
type Paso = {
  etiqueta: string
  cifra: string
  titulo: string
  texto: string
  color: string
  estatus?: EstatusKey
  litoral?: keyof typeof LITORAL
  foco?: boolean
}

// Paso activo: el que cruza una franja estrecha al centro de la pantalla.
function usePasoActivo(total: number) {
  const [activo, setActivo] = useState(0)
  const pasosRef = useRef<Array<HTMLDivElement | null>>([])

  const setPasoRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      pasosRef.current[i] = el
    },
    [],
  )

  useEffect(() => {
    const nodos = pasosRef.current.filter(Boolean) as HTMLDivElement[]
    if (!nodos.length || typeof IntersectionObserver === "undefined") return
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setActivo(Number(e.target.getAttribute("data-paso")))
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    nodos.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [total])

  const irAPaso = useCallback((i: number) => {
    pasosRef.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [])

  return { activo, setPasoRef, irAPaso }
}

function usePrefiereMenosMovimiento() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sincroniza = () => setReduce(mq.matches)
    sincroniza()
    mq.addEventListener("change", sincroniza)
    return () => mq.removeEventListener("change", sincroniza)
  }, [])
  return reduce
}

// Bloque de recorrido: gráfica fija de un lado, pasos del otro. `lado` indica
// dónde va la gráfica en escritorio; en móvil siempre queda arriba.
function Bloque({
  lado,
  pasos,
  children,
}: {
  lado: "izquierda" | "derecha"
  pasos: Paso[]
  children: (ctx: { paso: Paso; visto: boolean }) => React.ReactNode
}) {
  const { activo, setPasoRef, irAPaso } = usePasoActivo(pasos.length)
  const escenarioRef = useRef<HTMLDivElement>(null)
  // La gráfica se dibuja la primera vez que el bloque entra a cuadro, no al
  // cargar la página: así se ve crecer en lugar de aparecer ya terminada.
  const [visto, setVisto] = useState(false)

  useEffect(() => {
    const el = escenarioRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisto(true)
      return
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setVisto(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const paso = pasos[Math.min(activo, pasos.length - 1)]
  const derecha = lado === "derecha"

  return (
    <div
      className={cn(
        "lg:grid lg:items-start lg:gap-12 xl:gap-16",
        derecha ? "lg:grid-cols-[0.95fr_1.05fr]" : "lg:grid-cols-[1.05fr_0.95fr]",
      )}
    >
      {/* Escenario fijo */}
      <div
        ref={escenarioRef}
        className={cn(
          "sticky top-[4.25rem] z-20 -mx-4 bg-cyan-50/90 px-4 py-3 backdrop-blur-sm",
          "lg:top-24 lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none",
          derecha && "lg:order-2",
        )}
      >
        <Card className="border-teal-100 bg-white shadow-sm">
          <CardContent className="h-[38vh] min-h-[250px] p-4 sm:h-[42vh] lg:h-[60vh] lg:max-h-[520px] lg:p-6">
            {children({ paso, visto })}
          </CardContent>
        </Card>

        {/* Riel de avance: también sirve para saltar de un paso a otro */}
        <div className="mt-2.5 flex items-center gap-1.5 lg:mt-4">
          {pasos.map((p, i) => (
            <button
              key={p.etiqueta}
              type="button"
              onClick={() => irAPaso(i)}
              aria-label={`Ir a: ${p.titulo}`}
              aria-current={i === activo}
              className="group flex-1 py-2"
            >
              <span
                className={cn(
                  "block h-1 rounded-full transition-colors duration-300 group-hover:bg-teal-400 motion-reduce:transition-none",
                  i <= activo ? "bg-teal-600" : "bg-teal-200",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Pasos: el texto que avanza junto a la gráfica */}
      <div className={cn("mt-4 lg:mt-0", derecha && "lg:order-1")}>
        {pasos.map((p, i) => {
          const esActivo = i === activo
          return (
            <div
              key={p.etiqueta}
              ref={setPasoRef(i)}
              data-paso={i}
              className="flex min-h-[48vh] items-center py-6 lg:min-h-[54vh]"
            >
              <div
                className={cn(
                  "border-l-4 pl-5 transition-all duration-500 motion-reduce:transition-none",
                  esActivo ? "opacity-100" : "opacity-45 lg:opacity-35",
                )}
                style={{ borderColor: esActivo ? p.color : "#e5e7eb" }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: esActivo ? p.color : "#9ca3af" }}
                >
                  {p.etiqueta}
                </p>
                <p className="mt-2 text-4xl font-bold tabular-nums text-gray-900 lg:text-5xl">
                  {p.cifra}
                </p>
                <h3 className="mt-1 text-xl font-bold text-gray-800">{p.titulo}</h3>
                <p className="mt-2 max-w-prose text-base leading-relaxed text-gray-600">{p.texto}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TituloGrafica({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wider text-teal-700">{children}</h3>
  )
}

export function PanoramaGraficas() {
  const menosMovimiento = usePrefiereMenosMovimiento()
  const anima = !menosMovimiento

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
        { ...LITORAL.pacifico, key: "pacifico" as const, value: pac },
        { ...LITORAL.golfo, key: "golfo" as const, value: gol },
      ]

      return { estatusData, totalEstatus, totalCatalogo, capturaData, litoralData, totalLitoral }
    }, [])

  // Los pasos se derivan de los datos: si una categoría desaparece del
  // catálogo, su paso desaparece con ella.
  const pasosEstatus = useMemo<Paso[]>(
    () => [
      {
        etiqueta: "Estatus",
        cifra: String(totalEstatus),
        titulo: "Pesquerías con estatus evaluado",
        texto: `La Carta Nacional Pesquera evalúa ${totalEstatus} de las ${totalCatalogo} pesquerías del catálogo. Ese estatus es el que define cuánto se puede aprovechar y qué necesita recuperarse.`,
        color: "#0d9488",
      },
      ...estatusData.map((d) => ({
        estatus: d.key,
        etiqueta: d.name,
        cifra: String(d.value),
        titulo: d.name,
        texto: `${d.value} pesquerías (${pct(d.value, totalEstatus)}% de las evaluadas). ${GLOSA_ESTATUS[d.key]}`,
        color: d.color,
      })),
    ],
    [estatusData, totalEstatus, totalCatalogo],
  )

  const pasosCapturas = useMemo<Paso[]>(() => {
    const mayor = capturaData[0]
    if (!mayor) return []
    const suma = capturaData.reduce((a, d) => a + d.captura, 0)
    const segunda = capturaData[1]
    const veces = segunda && segunda.captura ? mayor.captura / segunda.captura : 0

    return [
      {
        etiqueta: "Capturas",
        cifra: fmt.format(suma),
        titulo: "Toneladas de las ocho mayores",
        texto: `El volumen anual reportado se concentra en unas pocas pesquerías: las ocho de mayor captura suman ${fmt.format(suma)} toneladas al año.`,
        color: CAPTURA_COLOR_MAX,
      },
      {
        foco: true,
        etiqueta: mayor.nombre,
        cifra: fmt.format(mayor.captura),
        titulo: `${mayor.nombre} encabeza la lista`,
        texto:
          veces >= 1.1
            ? `Con ${fmt.format(mayor.captura)} toneladas al año, ${mayor.nombre} reporta ${veces.toFixed(1)} veces el volumen de ${segunda.nombre}, la segunda del catálogo.`
            : `${mayor.nombre} reporta ${fmt.format(mayor.captura)} toneladas al año, el mayor volumen del catálogo.`,
        color: CAPTURA_COLOR_MAX,
      },
    ]
  }, [capturaData])

  const pasosLitoral = useMemo<Paso[]>(
    () =>
      litoralData.map((d) => ({
        litoral: d.key,
        etiqueta: d.label,
        cifra: String(d.value),
        titulo: `Litoral ${d.label}`,
        texto:
          d.key === "pacifico"
            ? `${d.value} pesquerías (${pct(d.value, totalLitoral)}% del catálogo) corresponden al litoral del Pacífico, de Baja California a Chiapas.`
            : `${d.value} pesquerías (${pct(d.value, totalLitoral)}% del catálogo) corresponden al Golfo de México y el Mar Caribe, de Tamaulipas a Quintana Roo.`,
        color: d.color,
      })),
    [litoralData, totalLitoral],
  )

  return (
    <div className="space-y-12 lg:space-y-24">
      {/* Estatus — gráfica a la izquierda */}
      <Bloque lado="izquierda" pasos={pasosEstatus}>
        {({ paso, visto }) => {
          const activo = paso.estatus
          const detalle = activo ? estatusData.find((d) => d.key === activo) : undefined
          return (
            <div className="flex h-full flex-col gap-2">
              <TituloGrafica>Estatus de aprovechamiento</TituloGrafica>
              <div className="relative min-h-0 flex-1">
                {visto ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={estatusData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius="60%"
                        outerRadius="88%"
                        paddingAngle={2}
                        stroke="#fff"
                        strokeWidth={2}
                        isAnimationActive={anima}
                        animationDuration={800}
                      >
                        {estatusData.map((d) => (
                          <Cell
                            key={d.key}
                            fill={d.color}
                            fillOpacity={activo && activo !== d.key ? 0.15 : 1}
                            style={{ transition: "fill-opacity 400ms ease" }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [`${value} pesquerías`, name]}
                        contentStyle={TOOLTIP_STYLE}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : null}
                {/* Cifra al centro del hueco. El nombre completo del estatus sólo
                    aparece donde cabe sin encimarse con el anillo; en pantallas
                    chicas la identidad la dan la leyenda y el texto del paso. */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold tabular-nums text-gray-800 lg:text-5xl">
                    {detalle ? detalle.value : totalEstatus}
                  </span>
                  <span className="mt-1 hidden max-w-[9rem] text-xs font-medium leading-tight text-gray-600 sm:block lg:max-w-[11rem] lg:text-sm">
                    {detalle ? detalle.name : "pesquerías evaluadas"}
                  </span>
                  <span className="max-w-[8rem] text-[11px] leading-tight text-gray-400">
                    {detalle ? `de ${totalEstatus} evaluadas` : `de ${totalCatalogo} fichas`}
                  </span>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {estatusData.map((d) => (
                  <li
                    key={d.key}
                    className={cn(
                      "flex items-center gap-2 rounded px-1 py-0.5 text-xs transition-colors duration-300 motion-reduce:transition-none",
                      activo === d.key && "bg-gray-100",
                      activo && activo !== d.key && "opacity-45",
                    )}
                  >
                    <span
                      className="h-2.5 w-2.5 flex-shrink-0 rounded-sm"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="flex-1 truncate text-gray-700">{d.name}</span>
                    <span className="font-semibold tabular-nums text-gray-900">{d.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </Bloque>

      {/* Capturas — gráfica a la derecha */}
      {pasosCapturas.length > 0 && (
        <Bloque lado="derecha" pasos={pasosCapturas}>
          {({ paso, visto }) => (
            <div className="flex h-full flex-col gap-2">
              <TituloGrafica>Mayores capturas · toneladas al año</TituloGrafica>
              <div className="min-h-0 flex-1">
                {visto ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={capturaData}
                      layout="vertical"
                      margin={{ top: 4, right: 64, bottom: 4, left: 0 }}
                    >
                      <XAxis type="number" hide />
                      <YAxis
                        type="category"
                        dataKey="nombre"
                        width={112}
                        tick={{ fontSize: 12, fill: "#4b5563" }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        cursor={{ fill: "#f0fdfa" }}
                        formatter={(value: number) => [`${fmt.format(value)} t`, "Captura"]}
                        contentStyle={TOOLTIP_STYLE}
                      />
                      <Bar
                        dataKey="captura"
                        radius={[0, 4, 4, 0]}
                        barSize={14}
                        isAnimationActive={anima}
                        animationDuration={900}
                      >
                        {capturaData.map((d, i) => (
                          <Cell
                            key={d.nombre}
                            fill={i === 0 ? CAPTURA_COLOR_MAX : CAPTURA_COLOR}
                            fillOpacity={paso.foco && i !== 0 ? 0.35 : 1}
                            style={{ transition: "fill-opacity 400ms ease" }}
                          />
                        ))}
                        {/* Etiqueta directa sólo en la mayor: el resto se lee al pasar el cursor. */}
                        <LabelList
                          dataKey="captura"
                          content={(props: any) =>
                            props.index === 0 ? (
                              <text
                                x={Number(props.x) + Number(props.width) + 8}
                                y={Number(props.y) + Number(props.height) / 2}
                                dominantBaseline="central"
                                className="fill-gray-700 text-[11px] font-semibold tabular-nums"
                              >
                                {fmt.format(Number(props.value))} t
                              </text>
                            ) : null
                          }
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : null}
              </div>
            </div>
          )}
        </Bloque>
      )}

      {/* Litoral — gráfica a la izquierda */}
      <Bloque lado="izquierda" pasos={pasosLitoral}>
        {({ paso, visto }) => (
          <div className="flex h-full flex-col gap-2">
            <TituloGrafica>Pesquerías por litoral</TituloGrafica>
            <div className="flex min-h-0 flex-1 flex-col justify-center gap-7">
              {litoralData.map((d) => {
                const porcentaje = pct(d.value, totalLitoral)
                const atenuado = paso.litoral && paso.litoral !== d.key
                return (
                  <div
                    key={d.key}
                    className={cn(
                      "transition-opacity duration-300 motion-reduce:transition-none",
                      atenuado ? "opacity-40" : "opacity-100",
                    )}
                  >
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: d.color }} />
                        {d.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        <span className="text-2xl font-bold tabular-nums text-gray-900">
                          {d.value}
                        </span>{" "}
                        · {porcentaje}%
                      </span>
                    </div>
                    <div className="h-3.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full transition-[width] duration-[900ms] ease-out motion-reduce:transition-none"
                        style={{
                          width: visto ? `${porcentaje}%` : "0%",
                          backgroundColor: d.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-gray-400">Total: {totalLitoral} pesquerías en el catálogo</p>
          </div>
        )}
      </Bloque>
    </div>
  )
}
