"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { MapPin } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { EspecieImagen } from "@/components/especie-imagen"
import { especies } from "@/lib/especies-data"
import { useIdioma } from "@/components/idioma-provider"
import { etiquetaRegion } from "@/lib/i18n"

// Especies destacadas (más consultadas / de mayor relevancia comercial), de los
// dos litorales. Se intercalan Golfo y Caribe con Pacífico para que el carrusel
// muestre ambos desde la primera vista.
const DESTACADAS_GOLFO = [
  "pulpo",
  "camaron-cafe",
  "almejas",
  "mero-negrillo",
  "robalo-chucumite",
  "caracoles",
  "pez-espada",
  "bagre-bandera",
]
const DESTACADAS_PACIFICO = [
  "pac-camaron-del-pacifico",
  "pac-tunidos-del-pacifico",
  "pac-calamar-gigante",
  "pac-pelagicos-menores",
  "pac-abulon",
  "pac-langostas-espinosas-del-pacifico",
  "pac-pulpo-del-pacifico",
  "pac-huachinango-y-pargos-del-pacifico",
]

// Solo pesquerías con ficha: un id que cambie o se quede sin ficha se omite.
const destacadas = (() => {
  const conFicha = new Map(especies.filter((e) => e.ficha).map((e) => [e.id, e]))
  const seleccion = DESTACADAS_GOLFO.flatMap((id, i) => [id, DESTACADAS_PACIFICO[i]])
    .map((id) => (id ? conFicha.get(id) : undefined))
    .filter((e): e is (typeof especies)[number] => Boolean(e))
  return seleccion.length > 0 ? seleccion : especies.filter((e) => e.ficha)
})()

export function EspeciesCarrusel() {
  const { idioma, ruta } = useIdioma()
  const [api, setApi] = useState<CarouselApi>()
  const pausado = useRef(false)

  // Autoavance: cada 3 s pasa a la siguiente ficha; se pausa al pasar el cursor.
  useEffect(() => {
    if (!api) return

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const intervalo = setInterval(() => {
      if (!pausado.current) api.scrollNext()
    }, 3000)

    return () => clearInterval(intervalo)
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", loop: true }}
      className="w-full"
      onMouseEnter={() => (pausado.current = true)}
      onMouseLeave={() => (pausado.current = false)}
    >
      <CarouselContent className="-ml-3">
        {destacadas.map((especie) => (
          <CarouselItem
            key={especie.id}
            className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
          >
            <Link href={ruta(`/especies/${especie.id}`)} className="group block">
              <Card className="overflow-hidden border-teal-200 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
                <div className="aspect-square w-full overflow-hidden bg-white">
                  <EspecieImagen
                    id={especie.id}
                    nombre={especie.nombre}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-2.5">
                  <h3 className="truncate text-sm font-bold leading-tight text-gray-900 transition-colors group-hover:text-teal-700">
                    {especie.nombre}
                  </h3>
                  <div className="mt-1 flex items-center text-[11px] text-gray-600">
                    <MapPin className="mr-1 h-3 w-3 flex-shrink-0 text-teal-600" />
                    <span className="truncate">{etiquetaRegion(idioma, especie.region)}</span>
                  </div>
                </div>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50" />
      <CarouselNext className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50" />
    </Carousel>
  )
}
