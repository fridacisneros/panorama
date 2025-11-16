"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fish, Waves, FileText, Calendar, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Pesquerías", href: "/especies", icon: Fish },
  { name: "Vedas", href: "/vedas", icon: Calendar },
  { name: "Normativas", href: "/normativas", icon: FileText },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-teal-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Waves className="h-8 w-8 text-teal-600" />
                
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Panorama
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-teal-100 text-teal-700 shadow-sm"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
