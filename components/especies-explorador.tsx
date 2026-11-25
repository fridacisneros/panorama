"use client"

import { useMemo, useState } from "react"
import {
  Fish,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MapPin,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { FilterBar } from "@/components/filter-bar"
import { FichaDetalle } from "@/components/ficha-detalle"
import { EspecieImagen } from "@/components/especie-imagen"
import { cn } from "@/lib/utils"
import { especies } from "@/lib/especies-data"
import { siteName } from "@/lib/site"
import { useIdioma } from "@/components/idioma-provider"
import { AvisoIdioma } from "@/components/aviso-idioma"
import { etiquetaRegion, type Idioma } from "@/lib/i18n"

const toArray = <T,>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])

const getUniqueRegions = () => [...new Set(especies.map((e) => e.region))].sort()

const TEXTOS = {
  es: {
    titulo: "Pesquerías",
    subtitulo: "Información sobre las principales pesquerías de México de acuerdo a la Carta Nacional Pesquera.",
    buscar: "Buscar especies...",
    estado: "Estado",
    todosEstados: "Todos los estados",
    potencial: "Con potencial de desarrollo",
    maximo: "Aprovechado al máximo sustentable",
    deterioro: "En deterioro",
    indeterminado: "Indeterminado",
    region: "Región",
    todasRegiones: "Todas las regiones",
    conteo: (n: number) => `${n} ${n === 1 ? "pesquería" : "pesquerías"}`,
    sinResultados: "No se encontraron especies",
    ajustar: "Intenta ajustar los filtros",
    limpiar: "Limpiar filtros",
    volver: "Volver a la lista",
  },
  en: {
    titulo: "Fisheries",
    subtitulo: "Information on Mexico's main fisheries according to the National Fisheries Chart.",
    buscar: "Search species...",
    estado: "Status",
    todosEstados: "All statuses",
    potencial: "Underfished",
    maximo: "Maximally sustainably fished",
    deterioro: "Overfished",
    indeterminado: "Undetermined",
    region: "Region",
    todasRegiones: "All regions",
    conteo: (n: number) => `${n} ${n === 1 ? "fishery" : "fisheries"}`,
    sinResultados: "No species found",
    ajustar: "Try adjusting the filters",
    limpiar: "Clear filters",
    volver: "Back to the list",
  },
} satisfies Record<Idioma, unknown>

// Catálogo + panel lateral de pesquerías. Lo usan /especies (sin selección) y
// /especies/[especie] (con la pesquería elegida desde el servidor, para que el
// HTML inicial ya contenga su ficha).
export function EspeciesExplorador({
  idInicial,
  regionInicial,
}: {
  idInicial?: string
  regionInicial?: string
}) {
  const { idioma, ruta } = useIdioma()
  const t = TEXTOS[idioma]
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [regionFilter, setRegionFilter] = useState(regionInicial ?? "todas")
  const [selectedId, setSelectedId] = useState<string>(idInicial ?? especies[0]?.id ?? "")
  const [detailOpenMobile, setDetailOpenMobile] = useState(Boolean(idInicial))

  const uniqueRegions = useMemo(getUniqueRegions, [])

  const filteredEspecies = useMemo(
    () =>
      especies.filter((especie) => {
        const statusColors = especie.statusColor ? toArray(especie.statusColor) : []
        const term = searchTerm.toLowerCase()
        const matchesSearch =
          especie.nombre.toLowerCase().includes(term) ||
          (especie.nombreCientifico?.toLowerCase().includes(term) ?? false) ||
          (especie.zona?.toLowerCase().includes(term) ?? false)
        const matchesStatus = statusFilter === "todos" || statusColors.includes(statusFilter)
        const matchesRegion = regionFilter === "todas" || especie.region === regionFilter
        return matchesSearch && matchesStatus && matchesRegion
      }),
    [searchTerm, statusFilter, regionFilter],
  )

  // Agrupa la lista por región para mostrar encabezados.
  const groupedEspecies = useMemo(() => {
    const groups = new Map<string, typeof filteredEspecies>()
    for (const especie of filteredEspecies) {
      const arr = groups.get(especie.region) ?? []
      arr.push(especie)
      groups.set(especie.region, arr)
    }
    return [...groups.entries()]
  }, [filteredEspecies])

  const selected = especies.find((e) => e.id === selectedId) ?? filteredEspecies[0] ?? especies[0]

  // Cambia de ficha sin recargar y deja en la barra de direcciones la ruta propia
  // de la pesquería (/especies/{id}), que se puede compartir o recargar.
  const selectEspecie = (id: string) => {
    setSelectedId(id)
    setDetailOpenMobile(true)
    window.history.replaceState(null, "", ruta(`/especies/${encodeURIComponent(id)}`))
    const nombre = especies.find((e) => e.id === id)?.nombre
    if (nombre) document.title = `${nombre} · ${siteName}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:bg-none dark:bg-background">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          icon={Fish}
          title={t.titulo}
          subtitle={t.subtitulo}
        />

        <AvisoIdioma />

        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder={t.buscar}
          onClear={() => {
            setSearchTerm("")
            setStatusFilter("todos")
            setRegionFilter("todas")
          }}
        >
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-full md:w-52 bg-white border-gray-200 [&>span]:min-w-0">
              <SelectValue placeholder={t.estado} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">{t.todosEstados}</SelectItem>
              <SelectItem value="green">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle className="w-4 h-4 shrink-0 text-green-600" />
                  <span className="truncate">{t.potencial}</span>
                </div>
              </SelectItem>
              <SelectItem value="yellow">
                <div className="flex items-center gap-2 min-w-0">
                  <TrendingUp className="w-4 h-4 shrink-0 text-yellow-600" />
                  <span className="truncate">{t.maximo}</span>
                </div>
              </SelectItem>
              <SelectItem value="red">
                <div className="flex items-center gap-2 min-w-0">
                  <XCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span className="truncate">{t.deterioro}</span>
                </div>
              </SelectItem>
              <SelectItem value="gray">
                <div className="flex items-center gap-2 min-w-0">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-gray-600" />
                  <span className="truncate">{t.indeterminado}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="h-9 w-full md:w-52 bg-white border-gray-200 [&>span]:min-w-0">
              <SelectValue placeholder={t.region} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 shrink-0 text-blue-600" />
                  <span className="truncate">{t.todasRegiones}</span>
                </div>
              </SelectItem>
              {uniqueRegions.map((region) => (
                <SelectItem key={region} value={region}>
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-4 h-4 shrink-0 text-blue-600" />
                    <span className="truncate">{etiquetaRegion(idioma, region)}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterBar>

        <p className="text-sm text-gray-600 mb-4">
          {t.conteo(filteredEspecies.length)}
        </p>

        {/* Panel lateral: lista + detalle en la misma pantalla */}
        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-5 lg:items-start">
          {/* Lista */}
          <div
            className={cn(
              "rounded-xl border border-teal-200 bg-white/90 backdrop-blur-sm p-2 lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto",
              detailOpenMobile && "hidden lg:block",
            )}
            role="listbox"
            aria-label={t.titulo}
          >
            {filteredEspecies.length === 0 ? (
              <div className="text-center py-10 px-4">
                <Fish className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-700 font-medium mb-1">{t.sinResultados}</p>
                <p className="text-sm text-gray-500 mb-3">{t.ajustar}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("todos")
                    setRegionFilter("todas")
                  }}
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                >
                  {t.limpiar}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {groupedEspecies.map(([region, items]) => (
                  <div key={region} className="flex flex-col gap-1">
                    {/* -top-2/-mx-2 compensan el p-2 del contenedor para que el encabezado
                        tape también el relleno y no se asome la lista por encima */}
                    <p className="sticky -top-2 z-10 -mx-2 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-teal-700">
                      {etiquetaRegion(idioma, region)}
                    </p>
                    {items.map((especie) => {
                      const activo = selected?.id === especie.id
                      return (
                        <button
                          key={especie.id}
                          type="button"
                          role="option"
                          aria-selected={activo}
                          onClick={() => selectEspecie(especie.id)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg p-2 text-left transition-colors border",
                            activo
                              ? "bg-teal-50 border-teal-300"
                              : "border-transparent hover:bg-gray-50",
                          )}
                        >
                          <div className="w-11 h-11 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                            <EspecieImagen id={especie.id} nombre={especie.nombre} className="w-full h-full object-contain" iconClassName="w-1/2 h-1/2" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("font-semibold text-sm leading-tight truncate", activo ? "text-teal-700" : "text-gray-900")}>
                              {especie.nombre}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{etiquetaRegion(idioma, especie.region)}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detalle */}
          <div className={cn("mt-4 lg:mt-0", !detailOpenMobile && "hidden lg:block")}>
            <div className="rounded-xl border border-teal-200 bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden">
              <div className="lg:hidden border-b border-teal-100 p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDetailOpenMobile(false)}
                  className="text-teal-700 hover:bg-teal-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  {t.volver}
                </Button>
              </div>
              {selected && <FichaDetalle key={selected.id} especie={selected} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
