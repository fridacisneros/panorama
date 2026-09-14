# Panorama — Legislación pesquera de México

Plataforma web de consulta para navegar la legislación pesquera mexicana: pesquerías, vedas y normativas de la Carta Nacional Pesquera (CNP).

> Sitio informativo **no oficial**. Para efectos legales, consulta siempre el Diario Oficial de la Federación (DOF).

## 📋 Descripción

Panorama centraliza en un solo lugar:

- **Pesquerías**: catálogo de 92 pesquerías marinas de la CNP (59 del Litoral del Pacífico y 33 del Golfo de México y Mar Caribe). 59 tienen ficha detallada; el resto se muestra como "Próximamente".
- **Vedas**: 146 vedas (permanentes, temporales fijas y temporales variables) con línea de tiempo, filtros y enlace al acuerdo en el DOF.
- **Normativas**: biblioteca con 114 documentos (leyes y reglamentos, NOMs, planes de manejo, zonas de refugio y versiones de la CNP), con descarga directa.
- **Panorama en cifras**: gráficas en la portada construidas a partir de las fichas.

Toda la información está **en el código fuente** (archivos TypeScript en `lib/`): no hay base de datos.

## 🚀 Tecnologías

- **Next.js 15** (App Router) + **React 18** + **TypeScript 5**
- **Tailwind CSS 3.4** + **shadcn/ui** (Radix UI)
- **Recharts** — gráficas
- **Lucide React** — iconos
- **Vercel Analytics** — conteo de visitas
- **pnpm** — gestor de paquetes

## 📁 Estructura del Proyecto

```
panorama/
├── app/                         # Next.js App Router
│   ├── api/download/            # Proxy de descargas de documentos oficiales
│   ├── especies/                # Catálogo de pesquerías con panel lateral de ficha
│   │   └── [especie]/           # Redirige a /especies?id=… (enlaces antiguos)
│   ├── vedas/                   # Vedas: filtros y línea de tiempo
│   ├── normativas/              # Biblioteca normativa
│   ├── page.tsx                 # Portada
│   ├── layout.tsx               # Layout raíz (navbar, footer, metadatos, Analytics)
│   ├── not-found.tsx            # Página 404
│   ├── opengraph-image.tsx      # Imagen para compartir en redes
│   ├── robots.ts / sitemap.ts   # robots.txt y sitemap.xml
│   └── icon.svg                 # Favicon
├── components/                  # Componentes de la app
│   ├── ui/                      # Componentes shadcn/ui
│   ├── ficha-detalle.tsx        # Ficha detallada de una pesquería
│   ├── panorama-graficas.tsx    # "El panorama en cifras" (portada)
│   ├── vedas-timeline.tsx       # Línea de tiempo de vedas
│   └── …
├── lib/                         # Datos estáticos y utilidades
│   ├── especies-data.ts         # Pesquerías y sus fichas
│   ├── vedas-data.ts            # Vedas
│   ├── normativas-data.ts       # Documentos normativos
│   ├── site.ts                  # URL del sitio y metadatos por sección
│   └── utils.ts
└── public/images/especies/      # Fotos de las pesquerías
```

## ✨ Características

### Pesquerías
- Catálogo agrupado por región, con filtros por región y estado de conservación, y búsqueda por nombre común, nombre científico o zona
- Panel lateral con la ficha: generalidades, indicadores (con gráficas de captura histórica y por estado), ambiente, normatividad, status y recomendaciones
- Año de la última actualización en la CNP en cada tarjeta

### Vedas
- Búsqueda por pesquería, región o nombre científico; filtros por estado (activa/inactiva), tipo de veda y zona
- Línea de tiempo con los periodos de cada veda
- Indicador de vedas activas y enlace al acuerdo en el DOF

### Normativas
- 114 documentos: Leyes y Reglamentos (8), NOMs (50), Planes de Manejo Pesquero (28), Zonas de Refugio Pesquero (18) y Carta Nacional Pesquera (10)
- Búsqueda por título, descripción y etiquetas; filtro por categoría
- Descarga mediante `/api/download`, limitada a dominios oficiales (`dof.gob.mx`, `gob.mx`, `diputados.gob.mx`, `conapesca.gob.mx`)

## 🛠️ Instalación

Requisitos: Node.js 18+ y pnpm.

```bash
pnpm install
cp .env.example .env.local   # opcional para desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Variables de entorno

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (imagen al compartir, `robots.txt`, `sitemap.xml`). En producción, el dominio real. Por defecto `http://localhost:3000`. |

## 🧪 Scripts

```bash
pnpm dev      # servidor de desarrollo
pnpm build    # build de producción
pnpm start    # servir el build de producción
npx tsc --noEmit   # verificación de tipos
```

No hay suite de pruebas configurada.

## ✏️ Cómo actualizar los datos

- **Pesquerías**: `lib/especies-data.ts`. La lista `especies` define el catálogo; el objeto `fichas` (indexado por `id`) contiene el detalle y se adjunta a cada especie.
- **Fotos**: `public/images/especies/{id}.jpg`. Si falta la foto, se muestra un ícono de respaldo. Los créditos están en `CREDITOS-IMAGENES.md`.
- **Vedas**: `lib/vedas-data.ts`.
- **Normativas**: `lib/normativas-data.ts` **y** `app/normativas/page.tsx`, que por ahora tiene su propia copia de la lista de documentos.

Los conteos de la portada se calculan a partir de estos datos.

## 📊 Analítica

Las visitas se registran con Vercel Analytics (`<Analytics />` en `app/layout.tsx`). Se consultan en el panel del proyecto en Vercel, pestaña **Analytics**; solo cuenta en producción.

## 📚 Referencias

- [Carta Nacional Pesquera — CONAPESCA](https://www.gob.mx/conapesca)
- [Diario Oficial de la Federación](https://dof.gob.mx)
- [Next.js](https://nextjs.org/docs)

## 📄 Licencia

Proyecto de uso personal/educacional.
