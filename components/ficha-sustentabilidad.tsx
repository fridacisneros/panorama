// Pestaña "Sustentabilidad" de la ficha: certificación MSC, FIP y Seafood Watch,
// pensada para compradores. Los datos vienen de lib/sustentabilidad-data.ts.

import { Award, ExternalLink, Fish, Wrench } from "lucide-react"
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

const claseMSC: Record<AvalMSC["estado"], string> = {
  Certificada: "border-blue-200 bg-blue-50 text-blue-700",
  "En evaluación": "border-sky-200 bg-sky-50 text-sky-700",
  "Programa de mejora": "border-amber-200 bg-amber-50 text-amber-700",
}

const claseSFW: Record<RecomendacionSFW["recomendacion"], string> = {
  "Mejor opción": "border-green-200 bg-green-50 text-green-700",
  "Buena alternativa": "border-yellow-200 bg-yellow-50 text-yellow-800",
  Evitar: "border-red-200 bg-red-50 text-red-700",
}

const claseCalificacion: Record<string, string> = {
  A: "bg-green-600",
  B: "bg-lime-600",
  C: "bg-yellow-500",
  D: "bg-orange-500",
  E: "bg-red-600",
}

const ORDEN_SFW: RecomendacionSFW["recomendacion"][] = ["Mejor opción", "Buena alternativa", "Evitar"]

function Pastilla({ clase, children }: { clase: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium", clase)}>
      {children}
    </span>
  )
}

const SIN_DATO = "border-gray-200 bg-gray-100 text-gray-600"

function Resumen({
  icono: Icono,
  titulo,
  valor,
  clase,
  detalle,
}: {
  icono: typeof Award
  titulo: string
  valor: string
  clase: string
  detalle?: string
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">
        <Icono className="h-4 w-4 text-teal-600" aria-hidden="true" />
        {titulo}
      </div>
      <Pastilla clase={clase}>{valor}</Pastilla>
      {detalle && <p className="mt-1.5 text-xs text-gray-500">{detalle}</p>}
    </div>
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

export function Sustentabilidad({ especieId }: { especieId: string }) {
  const { msc = [], fips = [], seafoodWatch = [], nota } = sustentabilidadDe(especieId)

  // Resumen: el mejor estado de cada aval.
  const mscPrincipal = (["Certificada", "En evaluación", "Programa de mejora"] as const).find((e) =>
    msc.some((m) => m.estado === e),
  )
  const mscAlcance = msc.find((m) => m.estado === mscPrincipal)?.alcance
  const fipsCalificados = fips.map((f) => f.calificacion).filter((c): c is NonNullable<FIP["calificacion"]> => !!c)
  const mejorCalificacion = fipsCalificados.sort()[0]
  const sfwMejor = ORDEN_SFW.find((r) => seafoodWatch.some((s) => s.recomendacion === r))
  const sfwPeor = [...ORDEN_SFW].reverse().find((r) => seafoodWatch.some((s) => s.recomendacion === r))

  const sinNada = !msc.length && !fips.length && !seafoodWatch.length

  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-base text-teal-700">
          <Award className="mr-2 h-5 w-5" aria-hidden="true" />
          Sustentabilidad para compradores
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-2 sm:grid-cols-3">
          <Resumen
            icono={Award}
            titulo="Certificación MSC"
            valor={mscPrincipal ?? "Sin certificación"}
            clase={mscPrincipal ? claseMSC[mscPrincipal] : SIN_DATO}
            detalle={mscAlcance}
          />
          <Resumen
            icono={Wrench}
            titulo="Proyecto de mejora (FIP)"
            valor={fips.length ? `${fips.length} FIP activo${fips.length > 1 ? "s" : ""}` : "Sin FIP activo"}
            clase={fips.length ? "border-teal-200 bg-teal-50 text-teal-700" : SIN_DATO}
            detalle={mejorCalificacion ? `Mejor calificación de avance: ${mejorCalificacion}` : undefined}
          />
          <Resumen
            icono={Fish}
            titulo="Seafood Watch"
            valor={sfwMejor ?? "Sin evaluación"}
            clase={sfwMejor ? claseSFW[sfwMejor] : SIN_DATO}
            detalle={sfwMejor && sfwPeor && sfwPeor !== sfwMejor ? `Según el arte y la zona, hasta «${sfwPeor}»` : undefined}
          />
        </div>

        {sinNada && (
          <p className="text-sm text-gray-600">
            Esta pesquería no tiene certificación MSC, proyecto de mejora (FIP) activo ni recomendación de Seafood
            Watch registrados en las fuentes consultadas.
          </p>
        )}

        {msc.length > 0 && (
          <section>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Marine Stewardship Council (MSC)</h4>
            <ul className="space-y-2.5 text-sm">
              {msc.map((m) => (
                <li key={m.url}>
                  <div className="flex flex-wrap items-center gap-2">
                    <EnlaceExterno href={m.url}>{m.nombre}</EnlaceExterno>
                    <Pastilla clase={claseMSC[m.estado]}>{m.estado}</Pastilla>
                    {m.alcance && <span className="text-xs font-medium text-amber-700">{m.alcance}</span>}
                  </div>
                  {m.detalle && <p className="mt-0.5 text-gray-600">{m.detalle}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {fips.length > 0 && (
          <section>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              Proyectos de mejora pesquera (FIP)
            </h4>
            <ul className="space-y-2.5 text-sm">
              {fips.map((f) => (
                <li key={f.url} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white",
                      f.calificacion ? claseCalificacion[f.calificacion] : "bg-gray-300",
                    )}
                    title={f.calificacion ? `Calificación de avance ${f.calificacion}` : "Sin calificación aún"}
                  >
                    {f.calificacion ?? "–"}
                  </span>
                  <div className="min-w-0">
                    <EnlaceExterno href={f.url}>{f.nombre}</EnlaceExterno>
                    <p className="text-gray-600">
                      FIP {f.tipo.toLowerCase()} · {f.estado}
                    </p>
                    {f.nota && <p className="mt-0.5 text-xs text-amber-700">{f.nota}</p>}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-gray-500">
              La calificación de FisheryProgress mide el avance del proyecto: A = avance alto, E = sin avance
              reciente. Los FIP prospectivos aún no publican plan de trabajo.
            </p>
          </section>
        )}

        {seafoodWatch.length > 0 && (
          <section>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              Seafood Watch (Monterey Bay Aquarium)
            </h4>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Especie</th>
                    <th className="px-3 py-2 font-semibold">Zona</th>
                    <th className="px-3 py-2 font-semibold">Arte</th>
                    <th className="px-3 py-2 font-semibold">Recomendación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {seafoodWatch.map((s, i) => (
                    <tr key={i}>
                      <td className="px-3 py-2">
                        <span className="text-gray-800">{s.especie}</span>{" "}
                        <span className="italic text-gray-500">{s.cientifico}</span>
                      </td>
                      <td className="px-3 py-2 text-gray-700">{s.zona}</td>
                      <td className="px-3 py-2 text-gray-700">{s.arte}</td>
                      <td className="px-3 py-2">
                        <Pastilla clase={claseSFW[s.recomendacion]}>{s.recomendacion}</Pastilla>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {nota && <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{nota}</p>}

        <div className="border-t border-gray-100 pt-3 text-xs text-gray-500">
          <p>
            Consultado el {fechaLegible(FECHA_CONSULTA)}. Estos estados cambian con frecuencia: verifique en la fuente
            antes de una decisión de compra.
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
