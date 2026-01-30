import Link from "next/link"
import { Fish, Calendar, FileText, Home, LayoutDashboard, Waves } from "lucide-react"

const enlaces = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pesquerías", href: "/especies", icon: Fish },
  { name: "Vedas", href: "/vedas", icon: Calendar },
  { name: "Normativas", href: "/normativas", icon: FileText },
]

export function Footer() {
  const año = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Waves className="h-7 w-7 text-teal-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Panorama
            </span>
          </Link>

          <p className="text-gray-400 text-sm mb-6">
            Plataforma de consulta para navegar a través de la legislación pesquera mexicana.
          </p>

          {/* Enlaces en fila */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {enlaces.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/#buzon-sugerencias"
              className="text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium"
            >
              Sugerencias
            </Link>
          </nav>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-xs">
              © {año} Panorama. Sistema de consulta en pesca sustentable.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
