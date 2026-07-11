// app/api/sugerencias/route.ts
import { NextRequest, NextResponse } from "next/server"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Recibe las sugerencias del buzón (components/buzon-sugerencias.tsx).
// No existe tabla para sugerencias en la base de datos, por lo que de momento
// se validan y se registran en el servidor. Para persistirlas, conectar aquí
// un envío por correo o una tabla en Postgres.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const nombre = typeof body?.nombre === "string" ? body.nombre.trim() : ""
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""
    const sugerencia = typeof body?.sugerencia === "string" ? body.sugerencia.trim() : ""

    if (nombre.length < 2) {
      return NextResponse.json({ error: "El nombre debe tener al menos 2 caracteres." }, { status: 400 })
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Introduce un correo electrónico válido." }, { status: 400 })
    }
    if (sugerencia.length < 10) {
      return NextResponse.json({ error: "El comentario debe tener al menos 10 caracteres." }, { status: 400 })
    }

    // TODO: persistir la sugerencia (correo o base de datos).
    console.log("Nueva sugerencia recibida:", { nombre, email, sugerencia })

    return NextResponse.json({ ok: true, mensaje: "Sugerencia recibida. Gracias por participar." })
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
  }
}
