import { NextResponse, type NextRequest } from "next/server"

// Idiomas: las páginas viven en app/[lang]/. El español se sirve sin prefijo
// (/vedas se reescribe por dentro a /es/vedas) y el inglés con /en. Quien entra
// sin prefijo ve siempre el español; no se redirige según el navegador.
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // /es/… no es una URL pública: el español vive en la raíz.
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(3) || "/"
    return NextResponse.redirect(url, 308)
  }

  const ingles = pathname === "/en" || pathname.startsWith("/en/")
  const prefijo = ingles ? "/en" : ""
  const resto = ingles ? pathname.slice(3) || "/" : pathname

  // Enlaces antiguos /especies?id=pulpo → /especies/pulpo (308 permanente, para que
  // los buscadores trasladen el enlace a la ruta propia de la pesquería). Se hace
  // aquí y no en la página porque su loading.tsx empieza a enviar la respuesta
  // antes de que redirect() pueda fijar el código HTTP.
  const id = searchParams.get("id")
  if (resto === "/especies" && id) {
    const url = request.nextUrl.clone()
    url.pathname = `${prefijo}/especies/${encodeURIComponent(id)}`
    url.searchParams.delete("id")
    return NextResponse.redirect(url, 308)
  }

  if (ingles) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/es${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(url)
}

// Todo salvo la API, los archivos internos de Next, los archivos con extensión
// (imágenes, robots.txt, sitemap.xml…) y las imágenes de metadatos.
export const config = {
  matcher: ["/((?!api|_next|_vercel|opengraph-image|icon|.*\\..*).*)"],
}
