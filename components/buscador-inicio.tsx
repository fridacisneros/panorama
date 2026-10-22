"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, FileText, Fish, Search, X } from "lucide-react"
import { especies } from "@/lib/especies-data"
import { vedasData } from "@/lib/vedas-data"
import { documents } from "@/lib/normativas-data"

// Minúsculas y sin acentos, para que "camaron" encuentre "Camarón".
const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")

type Resultado = {
  clave: string
  titulo: string
  detalle: string
  href: string
  externo?: boolean
}

type Grupo = {
  nombre: string
  icono: typeof Fish
  resultados: Resultado[]
}

const MAX_POR_GRUPO = 4

// Buscador de la portada: busca a la vez en pesquerías, vedas y normas y
// lleva directo a cada sección (o al documento oficial).
export function BuscadorInicio() {
  const router = useRouter()
  const [consulta, setConsulta] = useState("")
  const [abierto, setAbierto] = useState(false)
  const contenedorRef = useRef<HTMLDivElement>(null)

  // Cerrar al hacer clic fuera del buscador.
  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      if (!contenedorRef.current?.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener("mousedown", alClic)
    return () => document.removeEventListener("mousedown", alClic)
  }, [])

  const grupos = useMemo<Grupo[]>(() => {
    const termino = normalizar(consulta.trim())
    if (termino.length < 2) return []
    const coincide = (...textos: (string | undefined)[]) =>
      textos.some((t) => t && normalizar(t).includes(termino))

    const pesquerias: Resultado[] = especies
      .filter((e) => coincide(e.nombre, e.nombreCientifico))
      .slice(0, MAX_POR_GRUPO)
      .map((e) => ({
        clave: `e-${e.id}`,
        titulo: e.nombre,
        detalle: e.ficha ? e.region : `${e.region} · Próximamente`,
        href: `/especies?id=${encodeURIComponent(e.id)}`,
      }))

    // Una veda por pesquería: varias regiones de la misma especie se ven juntas en /vedas.
    const vistas = new Set<string>()
    const vedas: Resultado[] = []
    for (const v of vedasData) {
      if (vedas.length >= MAX_POR_GRUPO) break
      if (vistas.has(v.pesqueria) || !coincide(v.pesqueria, v.nombreCientifico, v.region)) continue
      vistas.add(v.pesqueria)
      const regiones = vedasData.filter((o) => o.pesqueria === v.pesqueria).length
      vedas.push({
        clave: `v-${v.id}`,
        titulo: v.pesqueria,
        detalle: regiones > 1 ? `${regiones} vedas · ${v.tipoVeda}` : `${v.region} · ${v.tipoVeda}`,
        href: `/vedas?q=${encodeURIComponent(v.pesqueria)}`,
      })
    }

    const normas: Resultado[] = documents
      .filter((d) => coincide(d.title, d.description, ...d.tags))
      .slice(0, MAX_POR_GRUPO)
      .map((d) => ({
        clave: `d-${d.id}`,
        titulo: d.title,
        detalle: d.description,
        href: d.url,
        externo: true,
      }))

    return [
      { nombre: "Pesquerías", icono: Fish, resultados: pesquerias },
      { nombre: "Vedas", icono: Calendar, resultados: vedas },
      { nombre: "Normas", icono: FileText, resultados: normas },
    ].filter((g) => g.resultados.length > 0)
  }, [consulta])

  const primero = grupos[0]?.resultados[0]
  const mostrarPanel = abierto && consulta.trim().length >= 2

  const enviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!primero) return
    if (primero.externo) window.open(primero.href, "_blank", "noopener,noreferrer")
    else router.push(primero.href)
  }

  return (
    <div ref={contenedorRef} className="relative mx-auto w-full max-w-2xl text-left">
      <form onSubmit={enviar} role="search">
        <label htmlFor="buscador-inicio" className="sr-only">
          Busca una especie, veda o norma
        </label>
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-teal-300">
          <Search className="h-5 w-5 flex-shrink-0 text-teal-600" aria-hidden="true" />
          <input
            id="buscador-inicio"
            type="search"
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value)
              setAbierto(true)
            }}
            onFocus={() => setAbierto(true)}
            onKeyDown={(e) => e.key === "Escape" && setAbierto(false)}
            placeholder="Busca una especie, veda o norma…"
            autoComplete="off"
            className="w-full bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none md:text-lg [&::-webkit-search-cancel-button]:hidden"
          />
          {consulta && (
            <button
              type="button"
              onClick={() => setConsulta("")}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Borrar búsqueda"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {mostrarPanel && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 max-h-[60vh] overflow-y-auto rounded-2xl bg-white p-2 text-gray-900 shadow-2xl ring-1 ring-black/5">
          {grupos.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-gray-500">
              Sin resultados para “{consulta.trim()}”. Prueba con el nombre común o científico.
            </p>
          ) : (
            grupos.map(({ nombre, icono: Icono, resultados }) => (
              <div key={nombre} className="py-1">
                <p className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
                  <Icono className="h-3.5 w-3.5" aria-hidden="true" />
                  {nombre}
                </p>
                {resultados.map((r) => {
                  const contenido = (
                    <>
                      <span className="block truncate text-sm font-medium">{r.titulo}</span>
                      <span className="block truncate text-xs text-gray-500">{r.detalle}</span>
                    </>
                  )
                  const clase = "block rounded-lg px-3 py-2 hover:bg-teal-50 focus:bg-teal-50 focus:outline-none"
                  return r.externo ? (
                    <a key={r.clave} href={r.href} target="_blank" rel="noopener noreferrer" className={clase}>
                      {contenido}
                    </a>
                  ) : (
                    <Link key={r.clave} href={r.href} className={clase} onClick={() => setAbierto(false)}>
                      {contenido}
                    </Link>
                  )
                })}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
