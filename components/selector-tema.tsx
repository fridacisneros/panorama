"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useIdioma } from "@/components/idioma-provider"

// Alterna entre modo claro y nocturno. Los dos iconos se pintan siempre y el
// CSS (`dark:`) decide cuál se ve, para no depender del tema en el servidor y
// evitar un desajuste de hidratación.
export function SelectorTema() {
  const { resolvedTheme, setTheme } = useTheme()
  const etiqueta = useIdioma().idioma === "en" ? "Switch between light and dark mode" : "Cambiar entre modo claro y nocturno"

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-600 hover:text-teal-600 hover:bg-teal-50"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={etiqueta}
      title={etiqueta}
    >
      <Sun className="h-5 w-5 dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
    </Button>
  )
}
