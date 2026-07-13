"use client"

import { useState } from "react"
import { Fish } from "lucide-react"
import { cn } from "@/lib/utils"

// Imagen de la pesquería con respaldo. Se intentan varias extensiones en orden
// (public/images/especies/{id}.{ext}); si ninguna existe, se muestra el ícono.
const EXTENSIONES = ["jpg", "png", "webp"] as const

export function EspecieImagen({
  id,
  nombre,
  className,
  iconClassName = "w-1/3 h-1/3",
}: {
  id: string
  nombre: string
  className?: string
  iconClassName?: string
}) {
  const [intento, setIntento] = useState(0)

  if (intento >= EXTENSIONES.length) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100", className)}>
        <Fish className={cn("text-teal-400", iconClassName)} />
      </div>
    )
  }

  return (
    <img
      src={`/images/especies/${id}.${EXTENSIONES[intento]}`}
      alt={nombre}
      className={className}
      onError={() => setIntento((i) => i + 1)}
    />
  )
}
