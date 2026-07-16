"use client"

import { useEffect, useRef, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { documents, CATEGORY_META } from "@/lib/normativas-data"

// Últimas normativas publicadas (orden descendente por fecha de publicación).
const ultimasNormativas = [...documents]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5)

export function NormativasCarrusel() {
  const [api, setApi] = useState<CarouselApi>()
  const pausado = useRef(false)

  // Autoavance: cada 3.5 s pasa a la siguiente ficha; se pausa al pasar el cursor.
  useEffect(() => {
    if (!api) return

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const intervalo = setInterval(() => {
      if (!pausado.current) api.scrollNext()
    }, 3500)

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
        {ultimasNormativas.map((doc) => {
          const meta = CATEGORY_META[doc.category]
          return (
            <CarouselItem
              key={doc.id}
              className="pl-3 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
            >
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <Card className="relative flex h-full flex-col gap-3 overflow-hidden border-teal-200 bg-white/90 p-5 pl-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
                  <span className={`absolute left-0 top-0 bottom-0 w-1 ${meta.rail}`} aria-hidden="true" />
                  <Badge variant="outline" className={`w-fit text-xs font-semibold ${meta.badge}`}>
                    {meta.short}
                  </Badge>
                  <h3 className="flex-1 text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-teal-700">
                    {doc.title}
                  </h3>
                  <span className="mt-auto text-sm text-gray-500 tabular-nums">
                    {new Date(doc.date).toLocaleDateString("es-MX")}
                  </span>
                </Card>
              </a>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50" />
      <CarouselNext className="hidden sm:flex border-teal-200 text-teal-700 hover:bg-teal-50" />
    </Carousel>
  )
}
