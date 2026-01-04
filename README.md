# Panorama - Sistema de Gestión Pesquera

Plataforma web de consulta para navegar a través de la legislación mexicana y datos de producción pesquera. Panorama proporciona acceso a información detallada sobre pesquerías, vedas, normativas y estadísticas de producción pesquera en México.

## 📋 Descripción

Panorama es una aplicación web desarrollada con Next.js que centraliza información sobre:

- **Pesquerías**: Información detallada sobre 10 especies pesqueras principales según la Carta Nacional Pesquera (CNP) 2025
- **Vedas**: Calendario interactivo de períodos de veda por especie y región (147 vedas programadas)
- **Normativas**: Biblioteca con 114 documentos normativos (leyes, NOMs, planes de manejo, zonas de refugio, CNP)
- **Datos de Producción**: API para consultar datos históricos de producción pesquera (2018-2025)

## 🚀 Tecnologías

### Frontend
- **Next.js 15.5.2** - Framework React con App Router
- **React 18** - Biblioteca UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 3.4** - Estilos
- **shadcn/ui** - Componentes UI (Radix UI)
- **Recharts 3.5** - Gráficos y visualizaciones
- **Lucide React** - Iconos

### Backend & Base de Datos
- **PostgreSQL** - Base de datos relacional
- **Drizzle ORM 0.45** - ORM type-safe
- **Node.js** - Runtime
- **Python 3.9+** - Scripts de carga de datos

### Herramientas
- **pnpm** - Gestor de paquetes
- **Drizzle Kit** - Migraciones y generación de esquemas

## 📁 Estructura del Proyecto

```
fisheries-system/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── datos/               # Endpoint de datos de producción
│   │   ├── especies/            # Endpoint de especies
│   │   └── stats/               # Endpoint de estadísticas
│   ├── especies/                # Páginas de especies pesqueras
│   │   ├── [especie]/           # Página dinámica por especie
│   │   └── page.tsx             # Listado de especies
│   ├── vedas/                   # Página de vedas
│   ├── normativas/              # Biblioteca normativa
│   ├── dashboard/               # Dashboard (en desarrollo)
│   └── page.tsx                 # Página principal
├── components/                  # Componentes React
│   ├── ui/                      # Componentes shadcn/ui
│   ├── navbar.tsx               # Barra de navegación
│   ├── vedas-calendar.tsx       # Calendario de vedas
│   ├── vedas-filters.tsx        # Filtros de vedas
│   └── vedas-list.tsx           # Lista de vedas
├── lib/                         # Utilidades y configuración
│   ├── db.ts                    # Configuración Drizzle/PostgreSQL
│   ├── schema.ts                # Esquema de base de datos
│   ├── utils.ts                 # Utilidades generales
│   └── vedas-data.ts            # Datos de vedas
├── data/                        # Archivos CSV de producción
│   ├── datos-2018.csv
│   ├── datos-2019.csv
│   ├── datos-2020.csv
│   ├── datos-2021.csv
│   ├── datos-2022.csv
│   ├── datos-2023.csv
│   ├── datos-2024.csv
│   └── datos-2025.csv
├── scripts/                     # Scripts Python
│   ├── load_csv_to_postgres.py  # Carga de CSV a PostgreSQL
│   └── README.md                # Documentación de scripts
├── initdb.d/                    # Scripts SQL de inicialización
│   └── 01_create_tables.sql
└── public/                      # Archivos estáticos
    └── images/                  # Imágenes de especies
```

## ✨ Características Implementadas

### 1. Pesquerías (Especies)
- ✅ Listado de 10 especies pesqueras principales
- ✅ Información detallada por especie (estado de conservación, región, captura)
- ✅ Filtros por estado de conservación y región
- ✅ Búsqueda por nombre científico o común
- ✅ Páginas individuales por especie con:
  - Indicadores de producción
  - Gráficos de rendimiento
  - Información de manejo
  - Mapas de distribución

### 2. Vedas y Temporadas
- ✅ Calendario interactivo de vedas
- ✅ Vista de lista y calendario
- ✅ Filtros por especie, tipo de veda, región y estado
- ✅ 147 vedas programadas
- ✅ Clasificación por tipo:
  - Vedas fijas
  - Vedas variables
  - Vedas permanentes
- ✅ Indicador de vedas activas

### 3. Biblioteca Normativa
- ✅ 114 documentos normativos organizados en categorías:
  - Leyes y Reglamentos (8)
  - NOMs (Normas Oficiales Mexicanas) (50+)
  - Planes de Manejo Pesquero (28)
  - Zonas de Refugio Pesquero (18)
  - Carta Nacional Pesquera (10 versiones)
- ✅ Búsqueda por título, descripción y etiquetas
- ✅ Filtros por categoría
- ✅ Enlaces de descarga y visualización

### 4. API de Datos
- ✅ Endpoint `/api/datos` para consultar producción pesquera
- ✅ Filtros por:
  - Año (rango o específico)
  - Estado
  - Especie
  - Litoral
  - Origen
- ✅ Paginación
- ✅ Ordenamiento

### 5. Base de Datos
- ✅ Esquema completo de producción pesquera (35+ columnas)
- ✅ Tabla `produccion_pesquera` con:
  - Información de embarcaciones
  - Sitios de desembarque
  - Unidades económicas
  - Información de captura
  - Producción por especie
  - Valores económicos

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+ y pnpm
- PostgreSQL 12+
- Python 3.9+ (para scripts de carga)

### 1. Clonar e Instalar Dependencias

```bash
# Instalar dependencias
pnpm install
```

### 2. Configurar Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=fisheries
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contraseña

# Next.js
NODE_ENV=development
```

### 3. Configurar Base de Datos

```bash
# Crear base de datos
createdb fisheries

# Ejecutar script de inicialización (opcional)
psql -h localhost -U postgres -d fisheries -f initdb.d/01_create_tables.sql
```

### 4. Cargar Datos CSV

```bash
cd scripts
pip install -r requirements.txt

# Cargar todos los archivos CSV
python load_csv_to_postgres.py \
    --host localhost \
    --port 5432 \
    --database fisheries \
    --user postgres \
    --password tu_contraseña
```

Para más detalles sobre la carga de datos, ver [scripts/README.md](scripts/README.md).

### 5. Ejecutar en Desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`.

## 📊 Datos Disponibles

### Archivos CSV (2018-2025)
- `datos-2018.csv` hasta `datos-2025.csv`
- Cada archivo contiene datos de producción pesquera del año correspondiente
- Estructura: 35+ columnas con información de embarcaciones, capturas, especies, etc.

### Especies Pesqueras
10 especies principales documentadas:
1. Bagres marinos
2. Mero y Negrillo
3. Pepino de Mar
4. Pez Espada
5. Camarón Café
6. Camarón Rojo y Roca
7. Caracoles
8. Langostinos
9. Pulpo
10. Robalo y Chucumite
11. Almejas

## 🔌 API Endpoints

### GET `/api/datos`
Consulta datos de producción pesquera con filtros y paginación.

**Parámetros de consulta:**
- `page` - Número de página (default: 1)
- `limit` - Resultados por página (default: 50)
- `año` - Año específico
- `añoInicio` / `añoFin` - Rango de años
- `estado` - Nombre del estado
- `especie` - Nombre de especie
- `litoral` - Litoral (Pacífico/Atlántico)
- `origen` - Origen de captura

**Ejemplo:**
```bash
GET /api/datos?año=2023&especie=pulpo&limit=10
```

### GET `/api/especies/[especie]/indicadores`
Obtiene indicadores de producción para una especie específica.

## 🗄️ Esquema de Base de Datos

### Tabla: `produccion_pesquera`

Principales columnas:
- Información de activo/embarcación (RNP, nombre)
- Sitio de desembarque (clave, nombre)
- Unidad económica (RNPA, nombre)
- Ubicación (estado, oficina)
- Información de aviso (tipo, folio, fecha)
- Origen y lugar de captura
- Información de operación (mes, año, período, duración)
- Especie (nombre principal, clave, nombre científico)
- Producción (peso desembarcado, peso vivo, precio, valor)
- Región (litoral)

## 🧪 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Linting
pnpm lint
```

### Migraciones de Base de Datos

```bash
# Generar migraciones
npx drizzle-kit generate

# Aplicar migraciones
npx drizzle-kit migrate
```

## 📝 Estado Actual del Proyecto

### ✅ Completado
- [x] Estructura base de Next.js con App Router
- [x] Sistema de diseño con shadcn/ui
- [x] Páginas de especies pesqueras
- [x] Sistema de vedas con calendario
- [x] Biblioteca normativa
- [x] API de datos de producción
- [x] Esquema de base de datos
- [x] Scripts de carga de datos CSV
- [x] Componentes UI reutilizables
- [x] Sistema de navegación

### 🚧 En Desarrollo
- [ ] Dashboard de estadísticas
- [ ] Visualizaciones avanzadas de datos
- [ ] Exportación de datos
- [ ] Sistema de autenticación (si es necesario)
- [ ] Tests unitarios e integración

### 📋 Pendiente
- [ ] Documentación de API completa
- [ ] Optimización de rendimiento
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Mejoras de accesibilidad

## 🤝 Contribución

Este es un proyecto personal. Para sugerencias o mejoras, por favor abre un issue o pull request.

## 📄 Licencia

Este proyecto es de uso personal/educacional.

## 📚 Referencias

- [Carta Nacional Pesquera 2025](https://www.gob.mx/conapesca)
- [CONAPESCA](https://www.gob.mx/conapesca)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)

---

**Última actualización**: 2025
