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
import { CATEGORY_META } from "@/lib/normativas-data"
import { isVedaActive, type VedaData } from "@/lib/vedas-data"
import { vinculosDe, type PlanVinculado } from "@/lib/vinculos-data"
import { useIdioma } from "@/components/idioma-provider"
import { fechaDiaMes, type Idioma } from "@/lib/i18n"

const TEXTOS = {
  es: {
    permanente: "Permanente",
    y: "y",
    enVedaHoy: "En veda hoy",
    sinVedaHoy: "Sin veda hoy",
    conVeda: "Con veda",
    planLocal: "Plan de manejo local",
    plan: "Plan de manejo",
    talla: "Talla mínima",
    verRegulacionAria: "Ver la regulación de esta pesquería",
    verRegulacion: "Ver regulación",
    planLocalCorto: "Plan local",
    titulo: "Regulación de esta pesquería",
    veda: "Veda",
    abiertaHoy: "Abierta hoy",
    acuerdoDOF: "Acuerdo en el DOF",
    verCalendario: "Ver en el calendario de vedas",
    sinVeda: "La CNP no registra veda para esta pesquería.",
    nom: "Norma Oficial Mexicana",
    sinNom: "Sin NOM específica.",
    planManejo: "Plan de manejo pesquero",
    sinPlanCompleto: "La Carta Nacional Pesquera no registra un plan de manejo para toda la pesquería («No aplica»).",
    sinPlan: "Sin plan de manejo publicado.",
    sinTalla: "Sin talla mínima establecida.",
    zrp: "Zonas de refugio pesquero",
    sinZrp: "Sin zonas de refugio vinculadas.",
    verZrp: "Ver todas las ZRP",
  },
  en: {
    permanente: "Permanent",
    y: "and",
    enVedaHoy: "Closed today",
    sinVedaHoy: "Open today",
    conVeda: "Has closure",
    planLocal: "Local management plan",
    plan: "Management plan",
    talla: "Minimum size",
    verRegulacionAria: "See this fishery's regulation",
    verRegulacion: "See regulation",
    planLocalCorto: "Local plan",
    titulo: "Regulation of this fishery",
    veda: "Closure",
    abiertaHoy: "Open today",
    acuerdoDOF: "Agreement in the DOF",
    verCalendario: "See in the closure calendar",
    sinVeda: "The CNP lists no closure for this fishery.",
    nom: "Official Mexican Standard (NOM)",
    sinNom: "No specific NOM.",
    planManejo: "Fishery management plan",
    sinPlanCompleto: "The National Fisheries Chart lists no management plan for the whole fishery (“No aplica”).",
    sinPlan: "No published management plan.",
    sinTalla: "No minimum size established.",
    zrp: "Fishery refuge zones",
    sinZrp: "No linked refuge zones.",
    verZrp: "See all refuge zones",
  },
} satisfies Record<Idioma, unknown>

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

const periodos = (idioma: Idioma, veda: VedaData) =>
  veda.tipoVeda === "Permanente"
    ? TEXTOS[idioma].permanente
    : [
        [veda.fechaInicio1, veda.fechaTermino1],
        [veda.fechaInicio2, veda.fechaTermino2],
        [veda.fechaInicio3, veda.fechaTermino3],
      ]
        .filter(([ini, fin]) => ini && fin)
        .map(([ini, fin]) => `${fechaDiaMes(idioma, ini)} – ${fechaDiaMes(idioma, fin)}`)
        .join(` ${TEXTOS[idioma].y} `)

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
  const t = TEXTOS[useIdioma().idioma]
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
        ? { etiqueta: t.enVedaHoy, clase: "bg-red-50 text-red-700 border-red-200" }
        : { etiqueta: t.sinVedaHoy, clase: "bg-green-50 text-green-700 border-green-200" },
    )
  } else if (hayVeda) {
    pastillas.push({ etiqueta: t.conVeda, clase: CATEGORY_META.vedas.badge })
  }
  if (v.noms.length) pastillas.push({ etiqueta: v.noms.length > 1 ? `${v.noms.length} NOM` : "NOM", clase: CATEGORY_META.noms.badge })
  if (v.planes.length) {
    // Si todos los planes son locales, la pastilla lo dice: la CNP no registra plan
    // para la pesquería completa.
    const soloLocales = v.planes.every((p) => p.alcanceLocal)
    pastillas.push({ etiqueta: soloLocales ? t.planLocal : t.plan, clase: CATEGORY_META.planes.badge })
  }
  if (talla) pastillas.push({ etiqueta: t.talla, clase: "bg-sky-50 text-sky-700 border-sky-200" })
  if (v.zrp.length) pastillas.push({ etiqueta: v.zrp.length > 1 ? `${v.zrp.length} ZRP` : "ZRP", clase: CATEGORY_META.zrp.badge })

  if (!pastillas.length) return null

  return (
    <button
      type="button"
      onClick={onVerDetalle}
      className="group mt-2 flex flex-wrap items-center gap-1.5 text-left"
      aria-label={t.verRegulacionAria}
    >
      {pastillas.map((p) => (
        <span key={p.etiqueta} className={cn("rounded-full border px-2 py-0.5 text-xs font-medium", p.clase)}>
          {p.etiqueta}
        </span>
      ))}
      <span className="flex items-center text-xs font-medium text-teal-700 group-hover:underline">
        {t.verRegulacion}
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

function EnlacesDocumentos({ docs }: { docs: PlanVinculado[] }) {
  const t = TEXTOS[useIdioma().idioma]
  return (
    <ul className="space-y-1.5">
      {docs.map((d) => (
        <li key={d.id}>
          {d.alcanceLocal && (
            <span className="mb-1 inline-block rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
              {t.planLocalCorto}
            </span>
          )}
          <a
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-1.5 text-sm font-medium text-teal-700 hover:underline"
          >
            <span>{d.title}</span>
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
          {d.alcanceLocal && <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{d.alcanceLocal}</p>}
          {d.nota && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{d.nota}</p>}
        </li>
      ))}
    </ul>
  )
}

export function RegulacionVinculada({ especie }: { especie: Especie }) {
  const { idioma, ruta } = useIdioma()
  const t = TEXTOS[idioma]
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
        <CardTitle className="text-base text-teal-700">{t.titulo}</CardTitle>
      </CardHeader>
      <CardContent className="divide-y divide-gray-100">
        <Bloque icono={CalendarDays} titulo={t.veda}>
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
                            {activa ? t.enVedaHoy : t.abiertaHoy}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 text-gray-600">
                        <span className="tabular-nums">{periodos(idioma, veda)}</span>
                        {veda.enlaceDOF && (
                          <a
                            href={veda.enlaceDOF}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-teal-700 hover:underline"
                          >
                            {t.acuerdoDOF}
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Link
                href={busqueda ? `${ruta("/vedas")}?q=${encodeURIComponent(busqueda)}` : ruta("/vedas")}
                className="mt-2 inline-flex items-center text-sm font-medium text-teal-700 hover:underline"
              >
                {t.verCalendario}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </>
          ) : vedaCNP ? (
            <p className="text-sm leading-relaxed text-gray-700">{vedaCNP}</p>
          ) : (
            <SinDato>{t.sinVeda}</SinDato>
          )}
        </Bloque>

        <Bloque icono={FileText} titulo={t.nom}>
          {v.noms.length > 0 ? (
            <EnlacesDocumentos docs={v.noms} />
          ) : nomCNP ? (
            <p className="text-sm leading-relaxed text-gray-700">{nomCNP}</p>
          ) : (
            <SinDato>{t.sinNom}</SinDato>
          )}
        </Bloque>

        <Bloque icono={BookOpen} titulo={t.planManejo}>
          {v.planes.length > 0 ? (
            <>
              <EnlacesDocumentos docs={v.planes} />
              {v.planes.every((p) => p.alcanceLocal) && (
                <p className="mt-2 text-xs text-gray-500">
                  {t.sinPlanCompleto}
                </p>
              )}
            </>
          ) : planCNP ? (
            <p className="text-sm leading-relaxed text-gray-700">{planCNP}</p>
          ) : (
            <SinDato>{t.sinPlan}</SinDato>
          )}
        </Bloque>

        <Bloque icono={Ruler} titulo={t.talla}>
          {talla ? (
            <p className="text-sm leading-relaxed text-gray-700">{talla}</p>
          ) : (
            <SinDato>{t.sinTalla}</SinDato>
          )}
        </Bloque>

        <Bloque icono={MapPinned} titulo={t.zrp}>
          {v.zrp.length > 0 ? (
            <EnlacesDocumentos docs={v.zrp} />
          ) : (
            <SinDato>
              {t.sinZrp}{" "}
              <Link href={`${ruta("/normativas")}?categoria=zrp`} className="font-medium text-teal-700 hover:underline">
                {t.verZrp}
              </Link>
            </SinDato>
          )}
        </Bloque>
      </CardContent>
    </Card>
  )
}
