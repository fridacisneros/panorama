# Scripts de Carga de Datos

Este directorio contiene scripts para cargar datos CSV de producción pesquera a PostgreSQL.

## Requisitos

- Python 3.9+
- PostgreSQL 12+

## Instalación

```bash
cd scripts
pip install -r requirements.txt
```

## Uso

### Cargar todos los archivos CSV

```bash
python load_csv_to_postgres.py \
    --host localhost \
    --port 5432 \
    --database fisheries \
    --user postgres \
    --password tu_contraseña
```

### Cargar un archivo específico

```bash
python load_csv_to_postgres.py \
    --file ../data/datos-2024.csv \
    --database fisheries
```

### Usar variables de entorno

Puedes configurar la conexión usando variables de entorno:

```bash
export PGHOST=localhost
export PGPORT=5432
export PGDATABASE=fisheries
export PGUSER=postgres
export PGPASSWORD=tu_contraseña

python load_csv_to_postgres.py
```

### Opciones disponibles

| Opción | Descripción | Default |
|--------|-------------|---------|
| `--host` | Host de PostgreSQL | localhost |
| `--port` | Puerto de PostgreSQL | 5432 |
| `--database`, `-d` | Nombre de la base de datos | fisheries |
| `--user`, `-u` | Usuario de PostgreSQL | postgres |
| `--password`, `-p` | Contraseña | (vacío) |
| `--data-dir` | Directorio con archivos CSV | ../data |
| `--table` | Nombre de la tabla destino | produccion_pesquera |
| `--file`, `-f` | Cargar un archivo específico | (todos) |
| `--force` | Recargar años ya existentes | false |
| `--dry-run` | Solo validar, no cargar | false |

### Validar archivos sin cargar

```bash
python load_csv_to_postgres.py --dry-run
```

### Forzar recarga de datos

Si necesitas recargar datos de un año que ya existe:

```bash
python load_csv_to_postgres.py --force
```

## Estructura de la tabla

El script crea automáticamente la tabla `produccion_pesquera` con las siguientes columnas:

- `id`: Identificador único (serial)
- `ano_archivo`: Año del archivo CSV de origen
- Columnas de datos del CSV (35 columnas)
- `created_at`: Timestamp de inserción

## Características

1. **Validación de estructura**: Verifica que todos los CSVs tengan los mismos headers
2. **Normalización de headers**: Maneja variaciones en nombres de columnas entre años
3. **Carga eficiente**: Usa COPY para cargar grandes volúmenes de datos rápidamente
4. **Control de duplicados**: Detecta años ya cargados y permite forzar recarga
5. **Manejo de encoding**: Soporta caracteres especiales en los datos

## Inicialización manual de la base de datos

Si prefieres crear la tabla manualmente, usa el script SQL:

```bash
psql -h localhost -U postgres -d fisheries -f ../initdb.d/01_create_tables.sql
```

