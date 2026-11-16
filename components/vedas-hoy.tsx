"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, CalendarClock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fechaDesdeISO, finPeriodoActual, proximoInicio, vedasData, type VedaData } from "@/lib/vedas-data"

// Días hacia adelante para "Próximas a iniciar".
const HORIZONTE_DIAS = 30
const MAX_TARJETAS = 8

// Fechas formateadas a mano y no con Intl: el texto lo genera el servidor y lo
// vuelve a generar el navegador al hidratar, y las abreviaturas de Intl cambian
// entre motores ("nov" / "nov.").
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
const fechaCorta = { format: (f: Date) => `${f.getDate()} ${MESES[f.getMonth()].slice(0, 3)}` }
const fechaLarga = (f: Date) => `${f.getDate()} de ${MESES[f.getMonth()]} de ${f.getFullYear()}`

type Tarjeta = { veda: VedaData; texto: string }

function TarjetaVeda({ veda, texto, tono }: Tarjeta & { tono: "activa" | "proxima" }) {
  return (
    <Link
      href={`/vedas?q=${encodeURIComponent(veda.pesqueria)}`}
      className={
        "group flex w-56 flex-shrink-0 snap-start flex-col rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:w-auto " +
        (tono === "activa" ? "border-red-100" : "border-amber-100")
      }
    >
      <span className="truncate font-semibold text-gray-900 group-hover:text-teal-700">{veda.pesqueria}</span>
      <span className="truncate text-xs text-gray-500">{veda.region}</span>
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

  const { activas, permanentes, proximas } = useMemo(() => {
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
    return { activas, permanentes, proximas }
  }, [hoy])

  const fila = "-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4"

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
            <span className="font-semibold text-gray-800">{activas.length}</span> vedas temporales vigentes
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
              <TarjetaVeda key={t.veda.id} {...t} tono="activa" />
            ))}
          </div>
          {activas.length > MAX_TARJETAS && (
            <p className="mt-2 text-sm text-gray-500">
              y {activas.length - MAX_TARJETAS} más en el{" "}
              <Link href="/vedas" className="font-medium text-teal-700 underline-offset-2 hover:underline">
                calendario de vedas
              </Link>
              .
            </p>
          )}
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
              <TarjetaVeda key={t.veda.id} {...t} tono="proxima" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
