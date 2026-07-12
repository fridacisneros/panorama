import { ImageResponse } from "next/og"

// Imagen que se muestra al compartir el enlace (WhatsApp, redes, etc.).
// Se genera dinámicamente, sin necesidad de subir un archivo de imagen.
export const runtime = "edge"
export const alt = "Panorama — Legislación y pesquerías de México"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #1d4ed8 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 130, fontWeight: 800, letterSpacing: -2 }}>Panorama</div>
        <div style={{ fontSize: 44, color: "#cffafe", marginTop: 12, textAlign: "center" }}>
          Legislación pesquera de México
        </div>
        <div style={{ fontSize: 30, color: "#a5f3fc", marginTop: 28 }}>
          Pesquerías · Vedas · Normativas
        </div>
      </div>
    ),
    { ...size },
  )
}
