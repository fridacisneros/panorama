"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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
  const [selectedPesqueria, setSelectedPesqueria] = useState("all")

  // Obtener valores únicos para los filtros
  const estado = Array.from(new Set(vedas.map((veda) => veda.status)))
  const tiposVeda = Array.from(new Set(vedas.map((veda) => veda.tipoVeda)))
  const zonas = Array.from(new Set(vedas.map((veda) => veda.zona)))
  const pesquerias = Array.from(new Set(vedas.map((veda) => veda.pesqueria)))

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

    // Filtro por pesquería
    if (selectedPesqueria !== "all") {
      filtered = filtered.filter((veda) => veda.pesqueria === selectedPesqueria)
    }

    onFilter(filtered)
  }, [searchTerm, selectedEstado, selectedTipoVeda, selectedZona, selectedPesqueria, vedas, onFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedEstado("all")
    setSelectedTipoVeda("all")
    setSelectedZona("all")
    setSelectedPesqueria("all")
  }

  return (
    <div className="space-y-4">
      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Búsqueda por especie, región o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white border-teal-200 focus:border-teal-400 h-9"
        />
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Select value={selectedPesqueria} onValueChange={setSelectedPesqueria}>
          <SelectTrigger className="bg-white border-teal-200 focus:border-teal-400 h-9">
            <SelectValue placeholder="Pesquería" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las pesquerías</SelectItem>
            {pesquerias.map((pesqueria) => (
              <SelectItem key={pesqueria} value={pesqueria}>
                {pesqueria}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedEstado} onValueChange={setSelectedEstado}>
          <SelectTrigger className="bg-white border-teal-200 focus:border-teal-400 h-9">
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
          <SelectTrigger className="bg-white border-teal-200 focus:border-teal-400 h-9">
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
          <SelectTrigger className="bg-white border-teal-200 focus:border-teal-400 h-9">
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

        <Button
          variant="outline"
          onClick={clearFilters}
          className="border-teal-200 hover:bg-teal-50 bg-transparent h-9"
        >
          <Filter className="w-4 h-4 mr-2" />
          Limpiar
        </Button>
      </div>
    </div>
  )
}
