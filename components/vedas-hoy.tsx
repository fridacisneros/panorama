"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarClock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fechaDesdeISO, finPeriodoActual, proximoInicio, vedasData, type VedaData } from "@/lib/vedas-data"

// Días hacia adelante para "Próximas a iniciar".
const HORIZONTE_DIAS = 30
// Una sola fila por sección: 4 tarjetas en escritorio; en pantallas menores la
// fila se desplaza de lado.
const MAX_TARJETAS = 4

// Fechas formateadas a mano y no con Intl: el texto lo genera el servidor y lo
// vuelve a generar el navegador al hidratar, y las abreviaturas de Intl cambian
// entre motores ("nov" / "nov.").
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
const fechaCorta = { format: (f: Date) => `${f.getDate()} ${MESES[f.getMonth()].slice(0, 3)}` }
const fechaLarga = (f: Date) => `${f.getDate()} de ${MESES[f.getMonth()]} de ${f.getFullYear()}`

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

function unirConY(valores: string[]) {
  return valores.length <= 1 ? valores.join("") : `${valores.slice(0, -1).join(", ")} y ${valores[valores.length - 1]}`
}

function TarjetaVeda({ vedas, texto, tono }: Grupo & { tono: "activa" | "proxima" }) {
  const pesquerias = unicos(vedas.map((v) => v.pesqueria))
  const especies = unicos(vedas.map((v) => v.nombreCientifico))
  return (
    <Link
      href={`/vedas?ids=${vedas.map((v) => v.id).join(",")}`}
      className={
        "group flex w-56 flex-shrink-0 snap-start flex-col rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md lg:w-auto " +
        (tono === "activa" ? "border-red-100" : "border-amber-100")
      }
    >
      <span className="truncate font-semibold text-gray-900 group-hover:text-teal-700">{unirConY(pesquerias)}</span>
      <span className="truncate text-xs text-gray-500">{vedas[0].region}</span>
      {especies.length > 1 && (
        <span className="mt-1 line-clamp-2 text-xs text-gray-600" title={especies.join(", ")}>
          {especies.length} especies: <span className="italic">{especies.join(", ")}</span>
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
  const resto = grupos.slice(MAX_TARJETAS).reduce((n, g) => n + g.vedas.length, 0)
  if (resto === 0) return null
  return (
    <p className="mt-2 text-sm text-gray-500">
      y {resto} más en el{" "}
      <Link href="/vedas" className="font-medium text-teal-700 underline-offset-2 hover:underline">
        calendario de vedas
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
        activas.push({ veda, fin, texto: `En veda hasta el ${fechaCorta.format(fin)}` })
        continue
      }
      const prox = proximoInicio(veda, hoy)
      if (prox && prox.dias <= HORIZONTE_DIAS) {
        proximas.push({
          veda,
          dias: prox.dias,
          texto:
            prox.dias === 1
              ? `Inicia mañana (${fechaCorta.format(prox.fecha)})`
              : `Inicia en ${prox.dias} días (${fechaCorta.format(prox.fecha)})`,
        })
      }
    }

    // Primero las que terminan (o empiezan) antes.
    activas.sort((a, b) => a.fin.getTime() - b.fin.getTime())
    proximas.sort((a, b) => a.dias - b.dias)
    return { activas: agrupar(activas), vedasActivas: activas.length, permanentes, proximas: agrupar(proximas) }
  }, [hoy])

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
            En veda hoy
          </h2>
          <p className="mt-1 text-gray-600">
            <span className="font-semibold text-gray-800">{vedasActivas}</span> vedas temporales vigentes
            {" "}y <span className="font-semibold text-gray-800">{permanentes}</span> permanentes ·{" "}
            {fechaLarga(hoy)}
          </p>
        </div>
        <Button asChild variant="outline" className="w-fit flex-shrink-0 border-teal-200 text-teal-700 hover:bg-teal-50">
          <Link href="/vedas">
            Ver calendario completo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {activas.length === 0 ? (
        <p className="flex items-center gap-2 rounded-xl bg-teal-50 p-4 text-sm text-teal-800">
          <Shield className="h-4 w-4" /> Hoy no hay vedas temporales vigentes; solo aplican las permanentes.
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
            Próximas a iniciar
            <span className="basis-full text-sm font-normal text-gray-500 sm:basis-auto">en los siguientes {HORIZONTE_DIAS} días</span>
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
