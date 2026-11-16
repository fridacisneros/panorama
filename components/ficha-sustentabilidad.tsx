// Pestaña "Sustentabilidad" de la ficha: certificación MSC, FIP y Seafood Watch,
// Los datos vienen de lib/sustentabilidad-data.ts.
//
// Cada aval es un bloque propio: encabezado con su estado general y qué mide, y
// debajo el desglose. Así el resumen y el detalle quedan juntos y no se pierden.

import { Award, ChevronDown, ExternalLink, Fish, Info, Wrench } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  FECHA_CONSULTA,
  FUENTES_SUSTENTABILIDAD,
  sustentabilidadDe,
  type AvalMSC,
  type FIP,
  type RecomendacionSFW,
} from "@/lib/sustentabilidad-data"

// "AAAA-MM-DD" → "DD/MM/AAAA" (a mano, sin Intl, para no desentonar al hidratar).
const fechaLegible = (iso: string) => iso.split("-").reverse().join("/")

type Recomendacion = RecomendacionSFW["recomendacion"]

const ORDEN_MSC: AvalMSC["estado"][] = ["Certificada", "En evaluación", "Programa de mejora"]
const ORDEN_SFW: Recomendacion[] = ["Mejor opción", "Buena alternativa", "Evitar"]

const claseMSC: Record<AvalMSC["estado"], string> = {
  Certificada: "border-blue-200 bg-blue-50 text-blue-700",
  "En evaluación": "border-sky-200 bg-sky-50 text-sky-700",
  "Programa de mejora": "border-amber-200 bg-amber-50 text-amber-700",
}

const claseSFW: Record<Recomendacion, string> = {
  "Mejor opción": "border-green-200 bg-green-50 text-green-700",
  "Buena alternativa": "border-yellow-200 bg-yellow-50 text-yellow-800",
  Evitar: "border-red-200 bg-red-50 text-red-700",
}

const barraSFW: Record<Recomendacion, string> = {
  "Mejor opción": "bg-green-500",
  "Buena alternativa": "bg-yellow-400",
  Evitar: "bg-red-500",
}

const claseCalificacion: Record<string, string> = {
  A: "bg-green-600",
  B: "bg-lime-600",
  C: "bg-yellow-500",
  D: "bg-orange-500",
  E: "bg-red-600",
}

const SIN_DATO = "border-gray-200 bg-gray-100 text-gray-600"
const TEAL = "border-teal-200 bg-teal-50 text-teal-700"

function Pastilla({ clase, children }: { clase: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium", clase)}>
      {children}
    </span>
  )
}

function EnlaceExterno({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-start gap-1.5 font-medium text-teal-700 hover:underline"
    >
      <span>{children}</span>
      <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  )
}

// Un aval: encabezado (icono, nombre, qué mide y estado general) + desglose.
function Bloque({
  icono: Icono,
  titulo,
  queMide,
  estado,
  claseEstado,
  vacio,
  children,
}: {
  icono: typeof Award
  titulo: string
  queMide: string
  estado: string
  claseEstado: string
  vacio: boolean
  children?: React.ReactNode
}) {
  return (
    <section className={cn("rounded-lg border", vacio ? "border-gray-200 bg-gray-50/60" : "border-gray-200 bg-white")}>
      <header className={cn("flex items-start gap-3 p-3", !vacio && "border-b border-gray-100")}>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
            vacio ? "bg-gray-200 text-gray-500" : "bg-teal-100 text-teal-700",
          )}
        >
          <Icono className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <h4 className={cn("text-sm font-semibold", vacio ? "text-gray-600" : "text-gray-900")}>{titulo}</h4>
            <Pastilla clase={claseEstado}>{estado}</Pastilla>
          </div>
          <p className="mt-0.5 text-xs text-gray-500">{queMide}</p>
        </div>
      </header>
      {!vacio && <div className="space-y-3 p-3 text-sm">{children}</div>}
    </section>
  )
}

// Barra apilada con cuántas evaluaciones caen en cada color.
function DistribucionSFW({ conteo, total }: { conteo: Record<Recomendacion, number>; total: number }) {
  return (
    <div>
      <div className="flex h-2 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
        {ORDEN_SFW.map((r) =>
          conteo[r] ? (
            <div key={r} className={barraSFW[r]} style={{ width: `${(conteo[r] / total) * 100}%` }} />
          ) : null,
        )}
      </div>
      <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        {ORDEN_SFW.map((r) =>
          conteo[r] ? (
            <li key={r} className="flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", barraSFW[r])} aria-hidden="true" />
              <span>
                <strong className="font-semibold text-gray-800">{conteo[r]}</strong> {r.toLowerCase()}
              </span>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  )
}

const contar = (lista: RecomendacionSFW[]) =>
  Object.fromEntries(ORDEN_SFW.map((r) => [r, lista.filter((s) => s.recomendacion === r).length])) as Record<
    Recomendacion,
    number
  >

export function Sustentabilidad({ especieId }: { especieId: string }) {
  const { msc = [], fips = [], seafoodWatch = [], nota } = sustentabilidadDe(especieId)

  // MSC: el mejor estado de todas las unidades registradas.
  const mscPrincipal = ORDEN_MSC.find((e) => msc.some((m) => m.estado === e))
  const mscOrdenado = [...msc].sort((a, b) => ORDEN_MSC.indexOf(a.estado) - ORDEN_MSC.indexOf(b.estado))

  // FIP: de mejor a peor calificación; los que aún no tienen van al final.
  const fipsOrdenados = [...fips].sort((a, b) => (a.calificacion ?? "Z").localeCompare(b.calificacion ?? "Z"))
  const mejorCalificacion = fipsOrdenados[0]?.calificacion

  // Seafood Watch: agrupado por especie, cada grupo de mejor a peor recomendación.
  const conteoSFW = contar(seafoodWatch)
  const grupos = new Map<string, RecomendacionSFW[]>()
  for (const s of seafoodWatch) {
    const clave = `${s.especie}|${s.cientifico}`
    grupos.set(clave, [...(grupos.get(clave) ?? []), s])
  }
  const gruposSFW = [...grupos.values()].map((filas) =>
    [...filas].sort(
      (a, b) => ORDEN_SFW.indexOf(a.recomendacion) - ORDEN_SFW.indexOf(b.recomendacion) || b.puntuacion - a.puntuacion,
    ),
  )
  // Con pocas filas se muestra todo abierto; con muchas, cada especie se despliega.
  const sfwPlegado = seafoodWatch.length > 6
  const sfwMejor = ORDEN_SFW.find((r) => conteoSFW[r] > 0)
  const sfwVarios = ORDEN_SFW.filter((r) => conteoSFW[r] > 0).length > 1

  const sinNada = !msc.length && !fips.length && !seafoodWatch.length

  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base text-teal-700">
          <Award className="mr-2 h-5 w-5" aria-hidden="true" />
          Sustentabilidad
        </CardTitle>
        <p className="text-sm text-gray-600">
          {sinNada
            ? "Esta pesquería no tiene certificación MSC, proyecto de mejora (FIP) activo ni recomendación de Seafood Watch registrados en las fuentes consultadas."
            : "Las tres referencias más usadas en el mercado para saber si un producto del mar proviene de una pesca sustentable."}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {nota && (
          <p className="flex gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{nota}</span>
          </p>
        )}

        {/* MSC */}
        <Bloque
          icono={Award}
          titulo="Certificación MSC"
          queMide="Sello azul del Marine Stewardship Council: certifica que la pesquería cumple un estándar de sustentabilidad tras una auditoría independiente."
          estado={mscPrincipal ?? "Sin certificación"}
          claseEstado={mscPrincipal ? claseMSC[mscPrincipal] : SIN_DATO}
          vacio={!msc.length}
        >
          <ul className="space-y-3">
            {mscOrdenado.map((m) => (
              <li key={m.url}>
                <div className="flex flex-wrap items-center gap-2">
                  <EnlaceExterno href={m.url}>{m.nombre}</EnlaceExterno>
                  {msc.length > 1 && <Pastilla clase={claseMSC[m.estado]}>{m.estado}</Pastilla>}
                </div>
                {m.alcance && (
                  <p className="mt-1 text-xs font-medium text-amber-700">Alcance: {m.alcance}</p>
                )}
                {m.detalle && <p className="mt-0.5 text-gray-600">{m.detalle}</p>}
              </li>
            ))}
          </ul>
        </Bloque>

        {/* FIP */}
        <Bloque
          icono={Wrench}
          titulo="Proyectos de mejora pesquera (FIP)"
          queMide="Proyectos con un plan de trabajo para que la pesquería alcance el estándar MSC. FisheryProgress califica su avance de A (alto) a E (sin avance reciente)."
          estado={
            fips.length
              ? `${fips.length} FIP activo${fips.length > 1 ? "s" : ""}${mejorCalificacion ? ` · mejor: ${mejorCalificacion}` : ""}`
              : "Sin FIP activo"
          }
          claseEstado={fips.length ? TEAL : SIN_DATO}
          vacio={!fips.length}
        >
          <ul className="divide-y divide-gray-100">
            {fipsOrdenados.map((f) => (
              <li key={f.url} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white",
                    f.calificacion ? claseCalificacion[f.calificacion] : "bg-gray-300",
                  )}
                  title={f.calificacion ? `Calificación de avance ${f.calificacion}` : "Sin calificación aún"}
                >
                  {f.calificacion ?? "–"}
                  <span className="sr-only">
                    {f.calificacion ? ` (calificación de avance ${f.calificacion})` : " (sin calificación aún)"}
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <EnlaceExterno href={f.url}>{f.nombre}</EnlaceExterno>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    <Pastilla clase={SIN_DATO}>FIP {f.tipo.toLowerCase()}</Pastilla>
                    {f.estado !== "Activo" && <Pastilla clase={claseMSC["En evaluación"]}>{f.estado}</Pastilla>}
                  </div>
                  {f.nota && <p className="mt-1 text-xs text-amber-700">{f.nota}</p>}
                </div>
              </li>
            ))}
          </ul>
          {fips.some((f) => f.tipo === "Prospectivo") && (
            <p className="text-xs text-gray-500">Los FIP prospectivos aún no publican plan de trabajo ni calificación.</p>
          )}
        </Bloque>

        {/* Seafood Watch */}
        <Bloque
          icono={Fish}
          titulo="Seafood Watch"
          queMide="Guía del Monterey Bay Aquarium: califica cada combinación de especie, zona y arte de pesca como mejor opción (verde), buena alternativa (amarillo) o evitar (rojo)."
          estado={
            sfwMejor
              ? sfwVarios
                ? `${seafoodWatch.length} evaluaciones · varía`
                : seafoodWatch.length > 1
                  ? `${seafoodWatch.length} evaluaciones · ${sfwMejor.toLowerCase()}`
                  : sfwMejor
              : "Sin evaluación"
          }
          claseEstado={sfwMejor ? (sfwVarios ? TEAL : claseSFW[sfwMejor]) : SIN_DATO}
          vacio={!seafoodWatch.length}
        >
          {seafoodWatch.length > 1 && <DistribucionSFW conteo={conteoSFW} total={seafoodWatch.length} />}
          <div className="space-y-2">
            {gruposSFW.map((filas) => {
              const { especie, cientifico } = filas[0]
              const conteo = contar(filas)
              const lista = (
                <ul className="divide-y divide-gray-100">
                  {filas.map((s, i) => (
                    <li key={i} className="flex items-center justify-between gap-3 px-3 py-2">
                      <div className="min-w-0">
                        <p className="text-gray-800">{s.arte}</p>
                        <p className="text-xs text-gray-500">{s.zona}</p>
                      </div>
                      <Pastilla clase={claseSFW[s.recomendacion]}>{s.recomendacion}</Pastilla>
                    </li>
                  ))}
                </ul>
              )
              const nombre = (
                <span className="min-w-0">
                  <span className="font-medium text-gray-800">{especie}</span>{" "}
                  <span className="text-xs italic text-gray-500">{cientifico}</span>
                </span>
              )
              const conteos = (
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-gray-500">
                  {ORDEN_SFW.map((r) =>
                    conteo[r] ? (
                      <span key={r} className="flex items-center gap-1" title={r}>
                        <span className={cn("h-2 w-2 rounded-full", barraSFW[r])} aria-hidden="true" />
                        {conteo[r]}
                        <span className="sr-only"> {r.toLowerCase()}</span>
                      </span>
                    ) : null,
                  )}
                </span>
              )
              return sfwPlegado ? (
                <details key={especie + cientifico} className="group rounded-md border border-gray-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 hover:bg-gray-50 [&::-webkit-details-marker]:hidden">
                    <span className="flex min-w-0 items-center gap-2">
                      <ChevronDown
                        className="h-4 w-4 shrink-0 -rotate-90 text-gray-400 transition-transform group-open:rotate-0"
                        aria-hidden="true"
                      />
                      {nombre}
                    </span>
                    {conteos}
                  </summary>
                  <div className="border-t border-gray-100">{lista}</div>
                </details>
              ) : (
                <div key={especie + cientifico} className="rounded-md border border-gray-200">
                  <div className="flex items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-3 py-2">
                    {nombre}
                    {conteos}
                  </div>
                  {lista}
                </div>
              )
            })}
          </div>
        </Bloque>

        <div className="pt-2 text-xs text-gray-500">
          <p>
            Consultado el {fechaLegible(FECHA_CONSULTA)}. Estos estados cambian con frecuencia: verifique la información
            en la fuente.
          </p>
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {Object.values(FUENTES_SUSTENTABILIDAD).map((f) => (
              <li key={f.url}>
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:underline">
                  {f.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
