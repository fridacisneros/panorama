import { notFound } from "next/navigation"

// Cualquier ruta que no exista dentro de un idioma muestra el 404 de
// app/[lang]/not-found.tsx, con la barra de navegación y en su idioma.
export default function RutaDesconocida() {
  notFound()
}
