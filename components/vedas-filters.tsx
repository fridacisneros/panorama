"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilterBar } from "@/components/filter-bar"

import { type VedaData, isVedaActive } from "@/lib/vedas-data"

interface VedasFiltersProps {
  vedas: VedaData[]
  onFilter: (filteredVedas: VedaData[]) => void
}

export function VedasFilters({ vedas, onFilter }: VedasFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEstado, setSelectedEstado] = useState("all")
  const [selectedTipoVeda, setSelectedTipoVeda] = useState("all")
  const [selectedZona, setSelectedZona] = useState("all")

  // Obtener valores únicos para los filtros
  const estado = Array.from(new Set(vedas.map((veda) => veda.status)))
  const tiposVeda = Array.from(new Set(vedas.map((veda) => veda.tipoVeda)))
  const zonas = Array.from(new Set(vedas.map((veda) => veda.zona)))

  useEffect(() => {
    let filtered = vedas

    // Filtro por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (veda) =>
          veda.pesqueria.toLowerCase().includes(searchTerm.toLowerCase()) ||
          veda.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
          veda.nombreCientifico.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por status
    if (selectedEstado !== "all") {
      filtered = filtered.filter((veda) => {
        const isActive = isVedaActive(veda)
        return selectedEstado === "Activa" ? isActive : !isActive
      })
    }

    // Filtro por tipo de veda
    if (selectedTipoVeda !== "all") {
      filtered = filtered.filter((veda) => veda.tipoVeda === selectedTipoVeda)
    }

    // Filtro por zona
    if (selectedZona !== "all") {
      filtered = filtered.filter((veda) => veda.zona === selectedZona)
    }

    onFilter(filtered)
  }, [searchTerm, selectedEstado, selectedTipoVeda, selectedZona, vedas, onFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedEstado("all")
    setSelectedTipoVeda("all")
    setSelectedZona("all")
  }

  return (
    <FilterBar
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Búsqueda por especie, región o descripción..."
      onClear={clearFilters}
    >
      <Select value={selectedEstado} onValueChange={setSelectedEstado}>
        <SelectTrigger className="h-9 w-full md:w-44 bg-white border-gray-200 focus:border-teal-400">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los status</SelectItem>
          {estado.map((estadoItem) => (
            <SelectItem key={estadoItem} value={estadoItem}>
              {estadoItem === "Activa" ? "Vedas Activas" : "Vedas Inactivas"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedTipoVeda} onValueChange={setSelectedTipoVeda}>
        <SelectTrigger className="h-9 w-full md:w-44 bg-white border-gray-200 focus:border-teal-400">
          <SelectValue placeholder="Tipo de Veda" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos de veda</SelectItem>
          {tiposVeda.map((tipo) => (
            <SelectItem key={tipo} value={tipo}>
              {tipo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedZona} onValueChange={setSelectedZona}>
        <SelectTrigger className="h-9 w-full md:w-44 bg-white border-gray-200 focus:border-teal-400">
          <SelectValue placeholder="Zona" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las zonas</SelectItem>
          {zonas.map((zona) => (
            <SelectItem key={zona} value={zona}>
              {zona}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FilterBar>
  )
}
