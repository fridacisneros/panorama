import { NextResponse, type NextRequest } from "next/server"

// Enlaces antiguos /especies?id=pulpo → /especies/pulpo (308 permanente, para que
// los buscadores trasladen el enlace a la ruta propia de la pesquería). Se hace
// aquí y no en la página porque su loading.tsx empieza a enviar la respuesta
// antes de que redirect() pueda fijar el código HTTP.
export function middleware(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")
  if (!id) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/especies/${encodeURIComponent(id)}`
  url.searchParams.delete("id")
  return NextResponse.redirect(url, 308)
}

export const config = { matcher: "/especies" }
