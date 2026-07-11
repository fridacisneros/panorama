import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: LucideIcon
}

export function PageHeader({ title, subtitle, icon: Icon }: PageHeaderProps) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white shadow-sm">
      {/* Patrón de olas sutil */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] w-full"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 50 C 60 30, 120 70, 200 50 S 340 30, 400 50 L400 80 L0 80 Z" fill="rgba(255,255,255,0.10)" />
        <path d="M0 60 C 70 45, 130 80, 210 60 S 350 45, 400 62 L400 80 L0 80 Z" fill="rgba(255,255,255,0.08)" />
      </svg>

      <div className="relative flex items-center gap-4 px-6 py-7 md:px-8 md:py-9">
        {Icon && (
          <div className="flex-shrink-0 rounded-xl bg-white/15 p-3">
            <Icon className="w-7 h-7 md:w-8 md:h-8" />
          </div>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm md:text-base text-white/85">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
