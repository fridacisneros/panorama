"use client"

import { useState } from "react"
import { MessageSquare, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Estado = "idle" | "loading" | "success" | "error"

export function BuzonSugerencias() {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [sugerencia, setSugerencia] = useState("")
  const [estado, setEstado] = useState<Estado>("idle")
  const [mensajeError, setMensajeError] = useState("")

  const validar = (): boolean => {
    const n = nombre.trim()
    const e = email.trim().toLowerCase()
    const s = sugerencia.trim()

    if (n.length < 2) {
      setMensajeError("El nombre debe tener al menos 2 caracteres.")
      return false
    }
    if (!e) {
      setMensajeError("El correo electrónico es obligatorio.")
      return false
    }
    if (!EMAIL_REGEX.test(e)) {
      setMensajeError("Introduce un correo electrónico válido.")
      return false
    }
    if (s.length < 10) {
      setMensajeError("El comentario debe tener al menos 10 caracteres.")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensajeError("")

    if (!validar()) {
      setEstado("error")
      return
    }

    setEstado("loading")

    try {
      const res = await fetch("/api/sugerencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim().toLowerCase(),
          sugerencia: sugerencia.trim(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMensajeError(data.error || "Error al enviar. Intenta de nuevo.")
        setEstado("error")
        return
      }

      setEstado("success")
      setNombre("")
      setEmail("")
      setSugerencia("")
    } catch {
      setMensajeError("Error de conexión. Intenta de nuevo.")
      setEstado("error")
    }
  }

  return (
    <section
      id="buzon-sugerencias"
      className="py-16 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-full">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Buzón de Sugerencias</h2>
            <p className="text-teal-100">
              Comparte tus ideas y comentarios para mejorar nuestra plataforma
            </p>
          </div>

          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="p-6">
              {estado === "success" ? (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>
                    Tu sugerencia ha sido recibida. Gracias por participar.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {estado === "error" && mensajeError && (
                    <Alert variant="destructive" className="border-red-200 bg-red-50 text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{mensajeError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      disabled={estado === "loading"}
                      className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      required
                      minLength={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Correo electrónico <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={estado === "loading"}
                      className="h-11 border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sugerencia" className="text-sm font-medium text-gray-700">
                      Sugerencia o comentario <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="sugerencia"
                      name="sugerencia"
                      rows={5}
                      placeholder="Comparte tu sugerencia, comentario o idea para mejorar la plataforma..."
                      value={sugerencia}
                      onChange={(e) => setSugerencia(e.target.value)}
                      disabled={estado === "loading"}
                      className="border-gray-300 focus:border-teal-500 focus:ring-teal-500 resize-none"
                      required
                      minLength={10}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={estado === "loading"}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium py-3"
                  >
                    {estado === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Sugerencia
                      </>
                    )}
                  </Button>
                </form>
              )}

              {estado === "success" && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-4 border-teal-200 text-teal-700 hover:bg-teal-50"
                  onClick={() => setEstado("idle")}
                >
                  Enviar otra sugerencia
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
