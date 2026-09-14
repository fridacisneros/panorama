"use client"

import { useState, useMemo } from "react"
import { Download, ExternalLink, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/page-header"
import { FilterBar } from "@/components/filter-bar"
import { VedasList } from "@/components/vedas-list"
import { vedasData, type VedaData } from "@/lib/vedas-data"
import { documents, CATEGORY_META, type DocumentItem, type LibraryCategory } from "@/lib/normativas-data"

// Solo se descargan los PDF que el servidor puede obtener; el resto se abre en el
// sitio oficial: páginas web (DOF, gob.mx) y PDF de CONAPESCA, cuyo servidor no
// envía el certificado intermedio y Node rechaza la conexión.
const HOSTS_SIN_DESCARGA = new Set(["conapesca.gob.mx", "www.conapesca.gob.mx"])
const sePuedeDescargar = (url: string) => {
  const { hostname, pathname } = new URL(url)
  return pathname.toLowerCase().endsWith(".pdf") && !HOSTS_SIN_DESCARGA.has(hostname)
}

export default function NormativasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Documentos y vedas se muestran según la categoría seleccionada:
  // "vedas" solo lista vedas, cualquier otra solo documentos, y "all" ambos.
  const showDocuments = selectedCategory !== "vedas"
  const showVedas = selectedCategory === "all" || selectedCategory === "vedas"

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const filteredVedas = useMemo<VedaData[]>(() => {
    const term = searchTerm.toLowerCase()
    return vedasData.filter((veda) =>
      [veda.pesqueria, veda.nombreCientifico, veda.region, veda.zona, veda.tipoVeda].some((campo) =>
        campo.toLowerCase().includes(term),
      ),
    )
  }, [searchTerm])

  // Si la descarga falla, se abre el documento en el sitio oficial para no dejar
  // al usuario sin respuesta. Si el navegador bloquea la pestaña, se navega ahí.
  const abrirEnSitioOficial = (doc: DocumentItem) => {
    const ventana = window.open(doc.url, "_blank")
    if (ventana) {
      ventana.opener = null
    } else {
      window.location.assign(doc.url)
    }
  }

  const handleDownload = async (doc: DocumentItem) => {
    try {
      const response = await fetch(`/api/download?file=${encodeURIComponent(doc.url)}`)
      if (!response.ok) {
        abrirEnSitioOficial(doc)
        return
      }
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = window.document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `${doc.title}.pdf`
      window.document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      window.document.body.removeChild(a)
    } catch {
      abrirEnSitioOficial(doc)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          icon={FileText}
          title="Biblioteca Normativa"
          subtitle="Accede a leyes, reglamentos, normas oficiales y documentos técnicos"
        />

        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Buscar documentos, leyes, normas..."
          onClear={
            searchTerm || selectedCategory !== "all"
              ? () => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }
              : undefined
          }
        >
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-9 w-full md:w-56 bg-white border-gray-200 focus:border-teal-400">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {(Object.keys(CATEGORY_META) as LibraryCategory[]).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  <span className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${CATEGORY_META[cat].dot}`} />
                    {CATEGORY_META[cat].full}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterBar>

        {showDocuments && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => {
            const meta = CATEGORY_META[doc.category]
            return (
              <Card
                key={doc.id}
                className="relative overflow-hidden bg-white/90 backdrop-blur-sm border-teal-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className={`absolute left-0 top-0 bottom-0 w-1 ${meta.rail}`} aria-hidden="true" />
                <CardContent className="flex h-full flex-col gap-3 p-5 pl-6">
                  <Badge variant="outline" className={`w-fit text-xs font-semibold ${meta.badge}`}>
                    {meta.short}
                  </Badge>

                  <h3 className="flex-1 text-base font-semibold leading-snug text-gray-900">
                    {doc.title}
                  </h3>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-500 tabular-nums">
                      {new Date(doc.date).toLocaleDateString("es-MX")}
                    </span>
                    {sePuedeDescargar(doc.url) ? (
                      <Button
                        size="sm"
                        onClick={() => handleDownload(doc)}
                        className="bg-teal-600 hover:bg-teal-700"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </Button>
                    ) : (
                      // Páginas web y PDF de CONAPESCA: se abren en el sitio oficial
                      <Button asChild size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Ver en sitio oficial
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        )}

        {showDocuments && filteredDocuments.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron documentos</h3>
              <p className="text-gray-600">
                {searchTerm
                  ? `No hay documentos que coincidan con "${searchTerm}".`
                  : "No hay documentos disponibles en esta categoría."}
              </p>
            </CardContent>
          </Card>
        )}

        {showVedas && (
          <div className={showDocuments ? "mt-6" : ""}>
            <VedasList vedas={filteredVedas} />
          </div>
        )}
      </div>
    </div>
  )
}
