// app/api/download/route.ts
import { NextRequest, NextResponse } from "next/server"

// Solo se permite descargar desde los dominios oficiales usados en la
// biblioteca normativa (app/normativas/page.tsx). Esto evita que el endpoint
// se use como proxy abierto (SSRF).
const ALLOWED_HOSTS = new Set([
  "diputados.gob.mx",
  "www.diputados.gob.mx",
  "gob.mx",
  "www.gob.mx",
  "dof.gob.mx",
  "www.dof.gob.mx",
  "conapesca.gob.mx",
  "www.conapesca.gob.mx",
])

export async function GET(request: NextRequest) {
  const fileUrl = request.nextUrl.searchParams.get("file")
  if (!fileUrl) {
    return NextResponse.json({ error: "Falta el parámetro 'file'." }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(fileUrl)
  } catch {
    return NextResponse.json({ error: "URL inválida." }, { status: 400 })
  }

  if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 400 })
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (Panorama)" },
      signal: AbortSignal.timeout(20000),
    })

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: `No se pudo obtener el archivo (HTTP ${upstream.status}).` },
        { status: 502 },
      )
    }

    const headers = new Headers()
    headers.set("Content-Type", upstream.headers.get("content-type") || "application/pdf")
    const contentLength = upstream.headers.get("content-length")
    if (contentLength) headers.set("Content-Length", contentLength)
    // El nombre real lo fija el cliente (a.download); este es el respaldo.
    headers.set("Content-Disposition", 'attachment; filename="documento.pdf"')

    return new NextResponse(upstream.body, { status: 200, headers })
  } catch {
    return NextResponse.json({ error: "Error al descargar el archivo." }, { status: 502 })
  }
}
