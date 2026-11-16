"use client"

// Regulación vinculada a una pesquería: su veda (con el estado de hoy), NOM, plan de
// manejo, talla mínima y zonas de refugio pesquero, enlazadas al calendario de vedas
// y a los documentos oficiales. Los vínculos vienen de lib/vinculos-data.ts.

import { useEffect, useState } from "react"
import Link from "next/link"
import { CalendarDays, ExternalLink, FileText, BookOpen, Ruler, MapPinned, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Especie } from "@/lib/especies-data"
import type { DocumentItem } from "@/lib/normativas-data"
import { CATEGORY_META } from "@/lib/normativas-data"
import { formatDateToDDMM, isVedaActive, type VedaData } from "@/lib/vedas-data"
import { vinculosDe } from "@/lib/vinculos-data"

type Ficha = NonNullable<Especie["ficha"]>

// Fila de la tabla de normatividad de la CNP cuyo instrumento empieza con `prefijo` ("4." …).
const filaNormatividad = (ficha: Ficha, prefijo: string) =>
  ficha.normatividad?.find((r) => r.instrumento.startsWith(prefijo))

// Texto de la CNP sólo si el instrumento aplica y dice algo.
const textoQueAplica = (ficha: Ficha, prefijo: string) => {
  const fila = filaNormatividad(ficha, prefijo)
  return fila?.aplica && fila.disposicion && fila.disposicion !== "—" ? fila.disposicion : null
}

// El estado de hoy depende del reloj del navegador: se calcula después de montar para
// que el HTML del servidor (generado al compilar) no desentone al hidratar.
function useVedasActivas(vedas: VedaData[]): Set<string> | null {
  const [activas, setActivas] = useState<Set<string> | null>(null)
  useEffect(() => {
    setActivas(new Set(vedas.filter(isVedaActive).map((v) => v.id)))
  }, [vedas])
  return activas
}

const periodos = (veda: VedaData) =>
  veda.tipoVeda === "Permanente"
    ? "Permanente"
    : [
        [veda.fechaInicio1, veda.fechaTermino1],
        [veda.fechaInicio2, veda.fechaTermino2],
        [veda.fechaInicio3, veda.fechaTermino3],
      ]
        .filter(([ini, fin]) => ini && fin)
        .map(([ini, fin]) => `${formatDateToDDMM(ini)} – ${formatDateToDDMM(fin)}`)
        .join(" y ")

// ---------------------------------------------------------------------------
// Resumen en el encabezado de la ficha: una pastilla por instrumento que lleva
// a la pestaña de normatividad.
// ---------------------------------------------------------------------------

export function ResumenRegulacion({
  especie,
  onVerDetalle,
}: {
  especie: Especie
  onVerDetalle: () => void
}) {
  const ficha = especie.ficha
  const [v] = useState(() => vinculosDe(especie.id))
  const activas = useVedasActivas(v.vedas)
  if (!ficha) return null

  const talla = textoQueAplica(ficha, "4.")
  const hayVeda = v.vedas.length > 0 || !!textoQueAplica(ficha, "6.")
  const enVeda = activas ? v.vedas.some((x) => activas.has(x.id)) : null

  const pastillas: { etiqueta: string; clase: string }[] = []
  if (v.vedas.length > 0 && enVeda !== null) {
    pastillas.push(
      enVeda
        ? { etiqueta: "En veda hoy", clase: "bg-red-50 text-red-700 border-red-200" }
        : { etiqueta: "Sin veda hoy", clase: "bg-green-50 text-green-700 border-green-200" },
    )
  } else if (hayVeda) {
    pastillas.push({ etiqueta: "Con veda", clase: CATEGORY_META.vedas.badge })
  }
  if (v.noms.length) pastillas.push({ etiqueta: v.noms.length > 1 ? `${v.noms.length} NOM` : "NOM", clase: CATEGORY_META.noms.badge })
  if (v.planes.length) pastillas.push({ etiqueta: "Plan de manejo", clase: CATEGORY_META.planes.badge })
  if (talla) pastillas.push({ etiqueta: "Talla mínima", clase: "bg-sky-50 text-sky-700 border-sky-200" })
  if (v.zrp.length) pastillas.push({ etiqueta: v.zrp.length > 1 ? `${v.zrp.length} ZRP` : "ZRP", clase: CATEGORY_META.zrp.badge })

  if (!pastillas.length) return null

  return (
    <button
      type="button"
      onClick={onVerDetalle}
      className="group mt-2 flex flex-wrap items-center gap-1.5 text-left"
      aria-label="Ver la regulación de esta pesquería"
    >
      {pastillas.map((p) => (
        <span key={p.etiqueta} className={cn("rounded-full border px-2 py-0.5 text-xs font-medium", p.clase)}>
          {p.etiqueta}
        </span>
      ))}
      <span className="flex items-center text-xs font-medium text-teal-700 group-hover:underline">
        Ver regulación
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </button>
  )
}

// ---------------------------------------------------------------------------
// Tarjeta detallada, al inicio de la pestaña de normatividad.
// ---------------------------------------------------------------------------

function Bloque({
  icono: Icono,
  titulo,
  children,
}: {
  icono: typeof FileText
  titulo: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
      <Icono className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">{titulo}</p>
        {children}
      </div>
    </div>
  )
}

function SinDato({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>
}

function EnlacesDocumentos({ docs }: { docs: DocumentItem[] }) {
  return (
    <ul className="space-y-1.5">
      {docs.map((d) => (
        <li key={d.id}>
          <a
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-1.5 text-sm font-medium text-teal-700 hover:underline"
          >
            <span>{d.title}</span>
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export function RegulacionVinculada({ especie }: { especie: Especie }) {
  const ficha = especie.ficha
  const [v] = useState(() => vinculosDe(especie.id))
  const activas = useVedasActivas(v.vedas)
  if (!ficha) return null

  const vedaCNP = textoQueAplica(ficha, "6.")
  const nomCNP = textoQueAplica(ficha, "1.")
  const planCNP = textoQueAplica(ficha, "2.")
  const talla = textoQueAplica(ficha, "4.")
  // Búsqueda para el calendario: el nombre de la pesquería, o la palabra que comparten
  // todas (p. ej. "Langosta" para langosta azul y verde).
  const pesquerias = [...new Set(v.vedas.map((x) => x.pesqueria))]
  const primeras = new Set(pesquerias.map((p) => p.split(" ")[0]))
  const busqueda = pesquerias.length === 1 ? pesquerias[0] : primeras.size === 1 ? [...primeras][0] : ""

  return (
    <Card className="border-teal-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-teal-700">Regulación de esta pesquería</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-gray-100">
        <Bloque icono={CalendarDays} titulo="Veda">
          {v.vedas.length > 0 ? (
            <>
              <ul className="space-y-2">
                {v.vedas.map((veda) => {
                  const activa = activas?.has(veda.id)
                  return (
                    <li key={veda.id} className="text-sm">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-medium text-gray-800">{veda.pesqueria}</span>
                        <span className="text-gray-500">· {veda.region}</span>
                        {activas && (
                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-xs font-medium",
                              activa
                                ? "border-red-200 bg-red-50 text-red-700"
                                : "border-green-200 bg-green-50 text-green-700",
                            )}
                          >
                            {activa ? "En veda hoy" : "Abierta hoy"}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 text-gray-600">
                        <span className="tabular-nums">{periodos(veda)}</span>
                        {veda.enlaceDOF && (
                          <a
                            href={veda.enlaceDOF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-teal-700 hover:underline"
                          >
                            Acuerdo en el DOF
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Link
                href={busqueda ? `/vedas?q=${encodeURIComponent(busqueda)}` : "/vedas"}
                className="mt-2 inline-flex items-center text-sm font-medium text-teal-700 hover:underline"
              >
                Ver en el calendario de vedas
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </>
          ) : vedaCNP ? (
            <p className="text-sm leading-relaxed text-gray-700">{vedaCNP}</p>
          ) : (
            <SinDato>La CNP no registra veda para esta pesquería.</SinDato>
          )}
        </Bloque>

        <Bloque icono={FileText} titulo="Norma Oficial Mexicana">
          {v.noms.length > 0 ? (
            <EnlacesDocumentos docs={v.noms} />
          ) : nomCNP ? (
            <p className="text-sm leading-relaxed text-gray-700">{nomCNP}</p>
          ) : (
            <SinDato>Sin NOM específica.</SinDato>
          )}
        </Bloque>

        <Bloque icono={BookOpen} titulo="Plan de manejo pesquero">
          {v.planes.length > 0 ? (
            <EnlacesDocumentos docs={v.planes} />
          ) : planCNP ? (
            <p className="text-sm leading-relaxed text-gray-700">{planCNP}</p>
          ) : (
            <SinDato>Sin plan de manejo publicado.</SinDato>
          )}
        </Bloque>

        <Bloque icono={Ruler} titulo="Talla mínima">
          {talla ? (
            <p className="text-sm leading-relaxed text-gray-700">{talla}</p>
          ) : (
            <SinDato>Sin talla mínima establecida.</SinDato>
          )}
        </Bloque>

        <Bloque icono={MapPinned} titulo="Zonas de refugio pesquero">
          {v.zrp.length > 0 ? (
            <EnlacesDocumentos docs={v.zrp} />
          ) : (
            <SinDato>
              Sin zonas de refugio vinculadas.{" "}
              <Link href="/normativas?categoria=zrp" className="font-medium text-teal-700 hover:underline">
                Ver todas las ZRP
              </Link>
            </SinDato>
          )}
        </Bloque>
      </CardContent>
    </Card>
  )
}
