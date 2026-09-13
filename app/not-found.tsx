import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calendar, Compass, Fish, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Página no encontrada",
}

// Accesos directos a las secciones principales para no dejar al usuario sin salida.
const secciones = [
  { href: "/especies", label: "Pesquerías", icon: Fish },
  { href: "/vedas", label: "Vedas", icon: Calendar },
  { href: "/normativas", label: "Normativas", icon: Scale },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
            <Compass className="h-10 w-10 text-teal-600" />
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-teal-600">Error 404</p>
          <h1 className="mb-3 text-3xl font-bold text-gray-800">Página no encontrada</h1>
          <p className="mb-8 text-gray-600">
            La página que buscas no existe o cambió de dirección. Revisa la URL o explora alguna de
            las secciones de Panorama.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {secciones.map(({ href, label, icon: Icon }) => (
              <Button key={href} asChild variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                <Link href={href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Link>
              </Button>
            ))}
          </div>
          <Button asChild className="bg-teal-600 text-white hover:bg-teal-700">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
