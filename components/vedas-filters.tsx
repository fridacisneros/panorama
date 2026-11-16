"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
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
  // ?ids= viene de una tarjeta agrupada de la portada: muestra sólo esas vedas.
  const [idsSeleccionados, setIdsSeleccionados] = useState<string[] | null>(null)

  // Obtener valores únicos para los filtros
  const estado = Array.from(new Set(vedas.map((veda) => veda.status)))
  const tiposVeda = Array.from(new Set(vedas.map((veda) => veda.tipoVeda)))
  const zonas = Array.from(new Set(vedas.map((veda) => veda.zona)))

  // Enlace profundo desde la portada: ?q= prellena la búsqueda, ?zona= el filtro
  // de zona e ?ids= limita a un grupo de vedas.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get("q")
    const zona = params.get("zona")
    const ids = params.get("ids")?.split(",").filter((id) => vedas.some((v) => v.id === id))
    if (q) setSearchTerm(q)
    if (ids?.length) setIdsSeleccionados(ids)
    if (zona && vedas.some((v) => v.zona === zona)) setSelectedZona(zona)
    // Sólo al montar: después los filtros los controla el usuario.
  }, [])

  useEffect(() => {
    let filtered = vedas

    if (idsSeleccionados) {
      filtered = filtered.filter((veda) => idsSeleccionados.includes(veda.id))
    }

    // Filtro por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (veda) =>
          veda.pesqueria.toLowerCase().includes(searchTerm.toLowerCase()) ||
          veda.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
          veda.nombreCientifico.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtro por estado (activa hoy o no)
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
  }, [searchTerm, selectedEstado, selectedTipoVeda, selectedZona, idsSeleccionados, vedas, onFilter])

  const quitarSeleccion = () => {
    setIdsSeleccionados(null)
    const url = new URL(window.location.href)
    url.searchParams.delete("ids")
    window.history.replaceState(window.history.state, "", url)
  }

  const vedasSeleccionadas = idsSeleccionados ? vedas.filter((v) => idsSeleccionados.includes(v.id)) : []
  const pesqueriasSeleccionadas = [...new Set(vedasSeleccionadas.map((v) => v.pesqueria))].join(" y ")
  const regionesSeleccionadas = [...new Set(vedasSeleccionadas.map((v) => v.region))].join(" · ")

  const clearFilters = () => {
    quitarSeleccion()
    setSearchTerm("")
    setSelectedEstado("all")
    setSelectedTipoVeda("all")
    setSelectedZona("all")
  }

  return (
    <>
    {idsSeleccionados && (
      <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-teal-200 bg-teal-50 px-4 py-2 text-sm text-teal-900">
        <span>
          Mostrando {vedasSeleccionadas.length} {vedasSeleccionadas.length === 1 ? "veda" : "vedas"} de{" "}
          <span className="font-semibold">{pesqueriasSeleccionadas}</span> · {regionesSeleccionadas}
        </span>
        <button
          type="button"
          onClick={quitarSeleccion}
          className="inline-flex flex-shrink-0 items-center gap-1 rounded-md px-2 py-1 font-medium text-teal-700 hover:bg-teal-100"
        >
          <X className="h-4 w-4" /> Ver todas
        </button>
      </div>
    )}
    <FilterBar
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Búsqueda por especie, región o descripción..."
      onClear={clearFilters}
    >
      <Select value={selectedEstado} onValueChange={setSelectedEstado}>
        <SelectTrigger className="h-9 w-full md:w-44 bg-white border-gray-200 focus:border-teal-400">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
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
    </>
  )
}
