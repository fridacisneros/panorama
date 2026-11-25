"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarClock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fechaDesdeISO, finPeriodoActual, proximoInicio, vedasData, type VedaData } from "@/lib/vedas-data"
import { useIdioma } from "@/components/idioma-provider"
import { MESES, unirLista, type Idioma } from "@/lib/i18n"

// Días hacia adelante para "Próximas a iniciar".
const HORIZONTE_DIAS = 30
// Una sola fila por sección: 4 tarjetas en escritorio; en pantallas menores la
// fila se desplaza de lado.
const MAX_TARJETAS = 4

// Fechas formateadas a mano y no con Intl: el texto lo genera el servidor y lo
// vuelve a generar el navegador al hidratar, y las abreviaturas de Intl cambian
// entre motores ("nov" / "nov.").
const fechaCorta = (idioma: Idioma, f: Date) =>
  idioma === "en"
    ? `${MESES.en[f.getMonth()].slice(0, 3)} ${f.getDate()}`
    : `${f.getDate()} ${MESES.es[f.getMonth()].slice(0, 3)}`
const fechaLarga = (idioma: Idioma, f: Date) =>
  idioma === "en"
    ? `${MESES.en[f.getMonth()]} ${f.getDate()}, ${f.getFullYear()}`
    : `${f.getDate()} de ${MESES.es[f.getMonth()]} de ${f.getFullYear()}`

const TEXTOS = {
  es: {
    hasta: (f: string) => `En veda hasta el ${f}`,
    manana: (f: string) => `Inicia mañana (${f})`,
    enDias: (n: number, f: string) => `Inicia en ${n} días (${f})`,
    especies: "especies",
    restantes: "más en el",
    calendario: "calendario de vedas",
    titulo: "En veda hoy",
    vigentes: "vedas temporales vigentes",
    y: "y",
    permanentes: "permanentes",
    verCalendario: "Ver calendario completo",
    ninguna: "Hoy no hay vedas temporales vigentes; solo aplican las permanentes.",
    proximas: "Próximas a iniciar",
    siguientes: (n: number) => `en los siguientes ${n} días`,
  },
  en: {
    hasta: (f: string) => `Closed until ${f}`,
    manana: (f: string) => `Starts tomorrow (${f})`,
    enDias: (n: number, f: string) => `Starts in ${n} days (${f})`,
    especies: "species",
    restantes: "more in the",
    calendario: "closure calendar",
    titulo: "Closed today",
    vigentes: "seasonal closures in effect",
    y: "and",
    permanentes: "permanent",
    verCalendario: "See full calendar",
    ninguna: "No seasonal closures are in effect today; only the permanent ones apply.",
    proximas: "Starting soon",
    siguientes: (n: number) => `in the next ${n} days`,
  },
} satisfies Record<Idioma, unknown>

type Tarjeta = { veda: VedaData; texto: string }

// Varias vedas comparten región y fechas y sólo cambia la especie (p. ej. cuatro
// de callo de hacha en Bahía de Kino, o lisa y liseta en Tamaulipas). Se juntan
// en una tarjeta que nombra las especies y enlaza a /vedas con todas desglosadas.
type Grupo = { clave: string; vedas: VedaData[]; texto: string }

function agrupar(tarjetas: Tarjeta[]): Grupo[] {
  const grupos = new Map<string, Grupo>()
  for (const { veda, texto } of tarjetas) {
    const clave = `${veda.region}|${texto}`
    const grupo = grupos.get(clave)
    if (grupo) grupo.vedas.push(veda)
    else grupos.set(clave, { clave, vedas: [veda], texto })
  }
  return [...grupos.values()]
}

const unicos = (valores: string[]) => [...new Set(valores.filter(Boolean))]

function TarjetaVeda({ vedas, texto, tono }: Grupo & { tono: "activa" | "proxima" }) {
  const { idioma, ruta } = useIdioma()
  const pesquerias = unicos(vedas.map((v) => v.pesqueria))
  const especies = unicos(vedas.map((v) => v.nombreCientifico))
  return (
    <Link
      href={`${ruta("/vedas")}?ids=${vedas.map((v) => v.id).join(",")}`}
      className={
        "group flex w-56 flex-shrink-0 snap-start flex-col rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md lg:w-auto " +
        (tono === "activa" ? "border-red-100" : "border-amber-100")
      }
    >
      <span className="truncate font-semibold text-gray-900 group-hover:text-teal-700">{unirLista(idioma, pesquerias)}</span>
      <span className="truncate text-xs text-gray-500">{vedas[0].region}</span>
      {especies.length > 1 && (
        <span className="mt-1 line-clamp-2 text-xs text-gray-600" title={especies.join(", ")}>
          {especies.length} {TEXTOS[idioma].especies}: <span className="italic">{especies.join(", ")}</span>
        </span>
      )}
      <span
        className={
          "mt-3 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium " +
          (tono === "activa" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700")
        }
      >
        {texto}
      </span>
    </Link>
  )
}

// Aviso de cuántas vedas quedaron fuera de la fila (cuenta vedas, no tarjetas).
function Restantes({ grupos }: { grupos: Grupo[] }) {
  const { idioma, ruta } = useIdioma()
  const t = TEXTOS[idioma]
  const resto = grupos.slice(MAX_TARJETAS).reduce((n, g) => n + g.vedas.length, 0)
  if (resto === 0) return null
  return (
    <p className="mt-2 text-sm text-gray-500">
      {t.y} {resto} {t.restantes}{" "}
      <Link href={ruta("/vedas")} className="font-medium text-teal-700 underline-offset-2 hover:underline">
        {t.calendario}
      </Link>
      .
    </p>
  )
}

// Vedas vigentes hoy y las que empiezan pronto. El servidor las calcula con la
// fecha de México (la portada se regenera cada hora), así que se ven aun sin
// JavaScript. Ya en el navegador, si la fecha local es otra (pasó la medianoche
// desde que se generó, u otra zona horaria), se recalcula.
export function VedasHoy({ fecha }: { fecha: string }) {
  const { idioma, ruta } = useIdioma()
  const t = TEXTOS[idioma]
  const [hoy, setHoy] = useState(() => fechaDesdeISO(fecha))
  useEffect(() => {
    const ahora = new Date()
    const local = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate())
    setHoy((actual) => (actual.getTime() === local.getTime() ? actual : local))
  }, [])

  const { activas, vedasActivas, permanentes, proximas } = useMemo(() => {
    const activas: (Tarjeta & { fin: Date })[] = []
    const proximas: (Tarjeta & { dias: number })[] = []
    let permanentes = 0

    for (const veda of vedasData) {
      if (veda.tipoVeda === "Permanente") {
        permanentes += 1
        continue
      }
      const fin = finPeriodoActual(veda, hoy)
      if (fin) {
        activas.push({ veda, fin, texto: t.hasta(fechaCorta(idioma, fin)) })
        continue
      }
      const prox = proximoInicio(veda, hoy)
      if (prox && prox.dias <= HORIZONTE_DIAS) {
        proximas.push({
          veda,
          dias: prox.dias,
          texto:
            prox.dias === 1
              ? t.manana(fechaCorta(idioma, prox.fecha))
              : t.enDias(prox.dias, fechaCorta(idioma, prox.fecha)),
        })
      }
    }

    // Primero las que terminan (o empiezan) antes.
    activas.sort((a, b) => a.fin.getTime() - b.fin.getTime())
    proximas.sort((a, b) => a.dias - b.dias)
    return { activas: agrupar(activas), vedasActivas: activas.length, permanentes, proximas: agrupar(proximas) }
  }, [hoy, idioma, t])

  const fila = "-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0"

  return (
    <div className="rounded-2xl border border-teal-100 bg-white p-5 shadow-lg md:p-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 md:text-3xl">
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
            {t.titulo}
          </h2>
          <p className="mt-1 text-gray-600">
            <span className="font-semibold text-gray-800">{vedasActivas}</span> {t.vigentes}
            {" "}{t.y} <span className="font-semibold text-gray-800">{permanentes}</span> {t.permanentes} ·{" "}
            {fechaLarga(idioma, hoy)}
          </p>
        </div>
        <Button asChild variant="outline" className="w-fit flex-shrink-0 border-teal-200 text-teal-700 hover:bg-teal-50">
          <Link href={ruta("/vedas")}>
            {t.verCalendario}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {activas.length === 0 ? (
        <p className="flex items-center gap-2 rounded-xl bg-teal-50 p-4 text-sm text-teal-800">
          <Shield className="h-4 w-4" /> {t.ninguna}
        </p>
      ) : (
        <>
          <div className={fila}>
            {activas.slice(0, MAX_TARJETAS).map((t) => (
              <TarjetaVeda key={t.clave} {...t} tono="activa" />
            ))}
          </div>
          <Restantes grupos={activas} />
        </>
      )}

      {proximas.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 flex flex-wrap items-center gap-x-2 text-lg font-semibold text-gray-800">
            <CalendarClock className="h-5 w-5 text-amber-600" aria-hidden="true" />
            {t.proximas}
            <span className="basis-full text-sm font-normal text-gray-500 sm:basis-auto">{t.siguientes(HORIZONTE_DIAS)}</span>
          </h3>
          <div className={fila}>
            {proximas.slice(0, MAX_TARJETAS).map((t) => (
              <TarjetaVeda key={t.clave} {...t} tono="proxima" />
            ))}
          </div>
          <Restantes grupos={proximas} />
        </div>
      )}
    </div>
  )
}
