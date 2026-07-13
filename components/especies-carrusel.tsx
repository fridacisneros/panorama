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

// Especies destacadas (más consultadas / de mayor relevancia comercial).
const DESTACADAS = [
  "pulpo",
  "almejas",
  "caracoles",
  "camaron-cafe",
  "robalo-chucumite",
  "mero-negrillo",
  "pez-espada",
  "bagre-bandera",
]

const destacadas = (() => {
  const orden = new Map(DESTACADAS.map((id, i) => [id, i]))
  const seleccion = especies.filter((e) => orden.has(e.id))
  seleccion.sort((a, b) => (orden.get(a.id) ?? 0) - (orden.get(b.id) ?? 0))
  return seleccion.length > 0 ? seleccion : especies
})()

export function EspeciesCarrusel() {
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
            <Link href={`/especies?id=${especie.id}`} className="group block">
              <Card className="overflow-hidden border-teal-200 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
                <div className="aspect-square w-full overflow-hidden">
                  <EspecieImagen
                    id={especie.id}
                    nombre={especie.nombre}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-2.5">
                  <h3 className="truncate text-sm font-bold leading-tight text-gray-900 transition-colors group-hover:text-teal-700">
                    {especie.nombre}
                  </h3>
                  <div className="mt-1 flex items-center text-[11px] text-gray-600">
                    <MapPin className="mr-1 h-3 w-3 flex-shrink-0 text-teal-600" />
                    <span className="truncate">{especie.region}</span>
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
