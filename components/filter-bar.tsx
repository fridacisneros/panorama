"use client"

import type { ReactNode } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface FilterBarProps {
  searchValue: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  onClear?: () => void
  /** Filtros adicionales (ej. <Select/>). Se muestran en la misma fila. */
  children?: ReactNode
}

/**
 * Barra de búsqueda y filtros unificada para todas las secciones.
 * Barra compacta con fondo sutil: búsqueda, filtros y "Limpiar" en una sola línea.
 */
export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  onClear,
  children,
}: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-col gap-2 rounded-xl border border-gray-200 bg-gray-50/80 p-2 md:flex-row md:flex-wrap md:items-center">
      <div className="relative flex-1 md:min-w-[220px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="h-9 pl-9 bg-white border-gray-200 focus:border-teal-400"
        />
      </div>

      {children}

      {onClear && (
        <Button
          variant="ghost"
          onClick={onClear}
          className="h-9 text-gray-600 hover:text-teal-700 hover:bg-teal-100/60"
        >
          <Filter className="w-4 h-4 mr-2" />
          Limpiar
        </Button>
      )}
    </div>
  )
}
