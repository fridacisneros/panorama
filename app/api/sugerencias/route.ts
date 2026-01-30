import { NextRequest, NextResponse } from "next/server"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, sugerencia } = body

    // Validación básica
    if (!nombre || typeof nombre !== "string") {
      return NextResponse.json(
        { error: "El nombre es obligatorio." },
        { status: 400 }
      )
    }

    const nombreTrim = nombre.trim()
    if (nombreTrim.length < 2) {
      return NextResponse.json(
        { error: "El nombre debe tener al menos 2 caracteres." },
        { status: 400 }
      )
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "El correo electrónico es obligatorio." },
        { status: 400 }
      )
    }

    const emailTrim = email.trim().toLowerCase()
    if (!EMAIL_REGEX.test(emailTrim)) {
      return NextResponse.json(
        { error: "Introduce un correo electrónico válido." },
        { status: 400 }
      )
    }

    if (!sugerencia || typeof sugerencia !== "string") {
      return NextResponse.json(
        { error: "La sugerencia o comentario es obligatorio." },
        { status: 400 }
      )
    }

    const sugerenciaTrim = sugerencia.trim()
    if (sugerenciaTrim.length < 10) {
      return NextResponse.json(
        { error: "El comentario debe tener al menos 10 caracteres." },
        { status: 400 }
      )
    }

    // Aquí se podría guardar en BD o enviar por email; por ahora solo confirmamos
    // Ejemplo futuro: await db.insert(sugerencias).values({ nombre: nombreTrim, email: emailTrim, mensaje: sugerenciaTrim })

    return NextResponse.json({
      success: true,
      message: "Tu sugerencia ha sido recibida. Gracias por participar.",
    })
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la sugerencia. Intenta de nuevo." },
      { status: 500 }
    )
  }
}
