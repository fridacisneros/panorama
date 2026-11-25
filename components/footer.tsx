"use client"

import Link from "next/link"
import { Fish, Calendar, FileText, Home, Waves } from "lucide-react"
import { useIdioma } from "@/components/idioma-provider"
import type { Idioma } from "@/lib/i18n"

const enlaces = [
  { name: { es: "Inicio", en: "Home" }, href: "/", icon: Home },
  { name: { es: "Pesquerías", en: "Fisheries" }, href: "/especies", icon: Fish },
  { name: { es: "Vedas", en: "Closures" }, href: "/vedas", icon: Calendar },
  { name: { es: "Normativas", en: "Regulations" }, href: "/normativas", icon: FileText },
]

const TEXTOS: Record<
  Idioma,
  { lema: string; avisoTitulo: string; avisoAntes: string; dof: string; avisoDespues: string; derechos: string }
> = {
  es: {
    lema: "Vedas, pesquerías y normas de pesca de México, en un solo lugar.",
    avisoTitulo: "Aviso legal:",
    avisoAntes:
      "Panorama Pesquero es un sitio de carácter informativo y no oficial. La información sobre vedas y normativas puede estar desactualizada o contener errores. La única fuente con validez legal es el",
    dof: "Diario Oficial de la Federación (DOF)",
    avisoDespues: ". Antes de realizar cualquier actividad pesquera, verifica las disposiciones vigentes.",
    derechos: "Panorama Pesquero. Sistema de consulta en pesca sustentable.",
  },
  en: {
    lema: "Mexico's fishing closures, fisheries and regulations in one place.",
    avisoTitulo: "Legal notice:",
    avisoAntes:
      "Panorama Pesquero is an informational, unofficial website. Information on closures and regulations may be out of date or contain errors. The only legally valid source is the",
    dof: "Official Gazette of the Federation (DOF)",
    avisoDespues: ". Before any fishing activity, check the regulations currently in force.",
    derechos: "Panorama Pesquero. A reference system for sustainable fishing.",
  },
}

export function Footer() {
  const año = new Date().getFullYear()
  const { idioma, ruta } = useIdioma()
  const t = TEXTOS[idioma]

  return (
    <footer className="bg-gray-900 text-white tema-fijo">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <Link href={ruta("/")} className="inline-flex items-center space-x-2 mb-4">
            <Waves className="h-7 w-7 text-teal-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Panorama Pesquero
            </span>
          </Link>

          <p className="text-gray-400 text-sm mb-6">
            {t.lema}
          </p>

          {/* Enlaces en fila */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {enlaces.map((item) => (
              <Link
                key={item.href}
                href={ruta(item.href)}
                className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
              >
                {item.name[idioma]}
              </Link>
            ))}
          </nav>

          {/* Aviso legal */}
          <p className="text-gray-500 text-xs leading-relaxed mb-6">
            <span className="font-semibold text-gray-400">{t.avisoTitulo}</span> {t.avisoAntes}{" "}
            <a
              href="https://dof.gob.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-teal-400"
            >
              {t.dof}
            </a>
            {t.avisoDespues}
          </p>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-xs">
              © {año} {t.derechos}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
