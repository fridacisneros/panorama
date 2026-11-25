"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fish, Waves, FileText, Calendar, Home, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SelectorTema } from "@/components/selector-tema"
import { SelectorIdioma } from "@/components/selector-idioma"
import { useIdioma } from "@/components/idioma-provider"
import { sinPrefijo, type Idioma } from "@/lib/i18n"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigation = [
  { name: { es: "Inicio", en: "Home" }, href: "/", icon: Home },
  { name: { es: "Pesquerías", en: "Fisheries" }, href: "/especies", icon: Fish },
  { name: { es: "Vedas", en: "Closures" }, href: "/vedas", icon: Calendar },
  { name: { es: "Normativas", en: "Regulations" }, href: "/normativas", icon: FileText },
]

const TEXTOS: Record<Idioma, { abrirMenu: string; lema: string }> = {
  es: { abrirMenu: "Abrir menú", lema: "Sistema de consulta en pesca sustentable" },
  en: { abrirMenu: "Open menu", lema: "A reference system for sustainable fishing" },
}

export function Navbar() {
  const { idioma, ruta } = useIdioma()
  const t = TEXTOS[idioma]
  // Sin prefijo de idioma, para comparar con los href de `navigation`.
  const pathname = sinPrefijo(usePathname())
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={ruta("/")} className="flex items-center space-x-2">
              <Waves className="h-8 w-8 text-teal-600" />
              <span className="whitespace-nowrap text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Panorama Pesquero
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="ml-4 hidden md:flex items-center space-x-5 lg:space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={ruta(item.href)}
                  className={cn(
                    "flex items-center space-x-2 py-2 text-sm font-medium border-b-2 transition-colors duration-200",
                    isActive(item.href)
                      ? "border-teal-500 text-teal-700"
                      : "border-transparent text-gray-600 hover:text-teal-600"
                  )}
                >
                  {/* Sin icono en tabletas: con el selector de idioma no cabe todo en una línea */}
                  <Icon className="hidden h-4 w-4 lg:block" />
                  <span>{item.name[idioma]}</span>
                </Link>
              )
            })}
            <SelectorIdioma />
            <SelectorTema />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1 md:hidden">
            <SelectorTema />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  aria-label={t.abrirMenu}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader className="text-left">
                  <SheetTitle>
                    <Link
                      href={ruta("/")}
                      onClick={() => setOpen(false)}
                      className="flex items-center space-x-2"
                    >
                      <Waves className="h-7 w-7 text-teal-600" />
                      <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                        Panorama Pesquero
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <nav className="mt-8 flex flex-col space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={ruta(item.href)}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                          isActive(item.href)
                            ? "bg-teal-100 text-teal-700"
                            : "text-gray-700 hover:text-teal-600 hover:bg-teal-50"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name[idioma]}</span>
                      </Link>
                    )
                  })}
                </nav>

                {/* En móvil el selector de idioma va aquí: en la barra no cabe junto al logo. */}
                <SelectorIdioma className="mt-6 w-fit" />

                <div className="absolute bottom-8 left-6 right-6">
                  <p className="text-xs text-gray-500 text-center">
                    {t.lema}
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
