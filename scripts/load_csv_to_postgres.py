#!/usr/bin/env python3
"""
Script para cargar archivos CSV de producción pesquera a PostgreSQL.

Este script:
1. Verifica que todos los CSVs tengan la misma estructura (normalizando headers)
2. Crea la tabla si no existe
3. Carga los datos de forma eficiente usando COPY
4. Agrega una columna 'ano_archivo' para identificar de qué archivo viene cada registro
"""

import os
import sys
import csv
import re
import io
import argparse
from pathlib import Path
from typing import Optional

# psycopg2 es opcional para el modo dry-run
psycopg2 = None
sql = None

def import_psycopg2():
    """Importa psycopg2 de forma lazy."""
    global psycopg2, sql
    if psycopg2 is None:
        try:
            import psycopg2 as pg
            from psycopg2 import sql as pg_sql
            psycopg2 = pg
            sql = pg_sql
        except ImportError:
            print("Error: psycopg2 no está instalado.")
            print("Instálalo con: pip install psycopg2-binary")
            sys.exit(1)
    return psycopg2, sql


# Configuración por defecto
DEFAULT_DATA_DIR = Path(__file__).parent.parent / "data"
TABLE_NAME = "produccion_pesquera"

# Headers normalizados (basados en la estructura común)
NORMALIZED_HEADERS = [
    "rnp_activo",
    "nombre_activo",
    "clave_sitio_desembarque",
    "nombre_sitio_desembarque",
    "rnpa_unidad_economica",
    "unidad_economica",
    "nombre_estado",
    "clave_oficina",
    "nombre_oficina",
    "tipo_aviso",
    "folio_aviso",
    "fecha_aviso",
    "origen",
    "clave_lugar_captura",
    "nombre_lugar_captura",
    "numero_embarcaciones",
    "mes_corte",
    "ano_corte",
    "periodo_inicio",
    "periodo_fin",
    "duracion",
    "dias_efectivos",
    "tipo_zona",
    "produccion_acuacultural",
    "numero_permiso",
    "fecha_expedicion",
    "fecha_vigencia",
    "nombre_principal",
    "clave_especie",
    "nombre_especie",
    "peso_desembarcado_kilogramos",
    "peso_vivo_kilogramos",
    "precio_pesos",
    "valor_pesos",
    "litoral",
]


def normalize_header(header: str) -> str:
    """Normaliza un nombre de header para comparación."""
    # Convertir a minúsculas
    h = header.lower().strip()
    # Remover caracteres especiales y normalizar espacios
    h = re.sub(r'[áàäâã]', 'a', h)
    h = re.sub(r'[éèëê]', 'e', h)
    h = re.sub(r'[íìïî]', 'i', h)
    h = re.sub(r'[óòöôõ]', 'o', h)
    h = re.sub(r'[úùüû]', 'u', h)
    h = re.sub(r'[ñ]', 'n', h)
    # Reemplazar espacios y guiones con guion bajo
    h = re.sub(r'[\s\-]+', '_', h)
    # Remover caracteres no alfanuméricos excepto guion bajo
    h = re.sub(r'[^a-z0-9_]', '', h)
    
    # Normalizar variaciones conocidas
    mappings = {
        'origen_pesca': 'origen',
        'clave_lugarcaptura': 'clave_lugar_captura',
        'nombre_lugarcaptura': 'nombre_lugar_captura',
        'ano_corte': 'ano_corte',
        'ao_corte': 'ano_corte',
    }
    
    return mappings.get(h, h)


def find_header_row(file_path: Path) -> int:
    """Encuentra la fila que contiene los headers."""
    with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
        for i, line in enumerate(f):
            # Los headers comienzan con "RNP ACTIVO"
            if line.strip().upper().startswith('RNP ACTIVO'):
                return i
            if i > 10:  # No buscar más allá de las primeras 10 líneas
                break
    raise ValueError(f"No se encontró la fila de headers en {file_path}")


def get_csv_headers(file_path: Path) -> tuple[list[str], int]:
    """Obtiene los headers de un archivo CSV."""
    header_row = find_header_row(file_path)
    
    with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
        for i, line in enumerate(f):
            if i == header_row:
                reader = csv.reader([line])
                headers = next(reader)
                return headers, header_row
    
    raise ValueError(f"No se pudieron leer los headers de {file_path}")


def validate_csv_structure(file_path: Path, reference_headers: list[str]) -> bool:
    """Valida que un CSV tenga la misma estructura que los headers de referencia."""
    headers, _ = get_csv_headers(file_path)
    normalized_file_headers = [normalize_header(h) for h in headers]
    normalized_ref_headers = [normalize_header(h) for h in reference_headers]
    
    if len(normalized_file_headers) != len(normalized_ref_headers):
        print(f"Error: {file_path.name} tiene {len(normalized_file_headers)} columnas, "
              f"se esperaban {len(normalized_ref_headers)}")
        return False
    
    for i, (file_h, ref_h) in enumerate(zip(normalized_file_headers, normalized_ref_headers)):
        if file_h != ref_h:
            print(f"Warning: Columna {i+1} diferente en {file_path.name}: "
                  f"'{file_h}' vs '{ref_h}' (se normalizará)")
    
    return True


def extract_year_from_filename(filename: str) -> Optional[int]:
    """Extrae el año del nombre del archivo."""
    match = re.search(r'(\d{4})', filename)
    if match:
        return int(match.group(1))
    return None


def create_table(conn, table_name: str):
    """Crea la tabla si no existe."""
    import_psycopg2()
    create_sql = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        id SERIAL PRIMARY KEY,
        ano_archivo INTEGER NOT NULL,
        rnp_activo VARCHAR(50),
        nombre_activo VARCHAR(255),
        clave_sitio_desembarque VARCHAR(50),
        nombre_sitio_desembarque VARCHAR(255),
        rnpa_unidad_economica VARCHAR(50),
        unidad_economica VARCHAR(500),
        nombre_estado VARCHAR(100),
        clave_oficina VARCHAR(20),
        nombre_oficina VARCHAR(255),
        tipo_aviso VARCHAR(50),
        folio_aviso VARCHAR(50),
        fecha_aviso VARCHAR(50),
        origen VARCHAR(100),
        clave_lugar_captura VARCHAR(50),
        nombre_lugar_captura VARCHAR(255),
        numero_embarcaciones VARCHAR(50),
        mes_corte VARCHAR(50),
        ano_corte INTEGER,
        periodo_inicio VARCHAR(50),
        periodo_fin VARCHAR(50),
        duracion VARCHAR(50),
        dias_efectivos VARCHAR(50),
        tipo_zona VARCHAR(50),
        produccion_acuacultural VARCHAR(10),
        numero_permiso VARCHAR(100),
        fecha_expedicion VARCHAR(50),
        fecha_vigencia VARCHAR(50),
        nombre_principal VARCHAR(255),
        clave_especie VARCHAR(50),
        nombre_especie VARCHAR(500),
        peso_desembarcado_kilogramos DECIMAL(15,2),
        peso_vivo_kilogramos DECIMAL(15,2),
        precio_pesos DECIMAL(15,2),
        valor_pesos DECIMAL(15,2),
        litoral VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Índices para mejorar consultas
    CREATE INDEX IF NOT EXISTS idx_{table_name}_ano_archivo ON {table_name}(ano_archivo);
    CREATE INDEX IF NOT EXISTS idx_{table_name}_nombre_estado ON {table_name}(nombre_estado);
    CREATE INDEX IF NOT EXISTS idx_{table_name}_nombre_especie ON {table_name}(nombre_especie);
    CREATE INDEX IF NOT EXISTS idx_{table_name}_litoral ON {table_name}(litoral);
    """
    
    with conn.cursor() as cur:
        cur.execute(create_sql)
    conn.commit()
    print(f"✓ Tabla '{table_name}' creada/verificada correctamente")


def safe_int(value: str) -> Optional[int]:
    """Convierte un string a int de forma segura."""
    if not value or value.strip() == '':
        return None
    try:
        # Manejar notación científica (ej: 2.31E+11)
        return int(float(value.replace(',', '')))
    except (ValueError, TypeError):
        return None


def safe_decimal(value: str) -> Optional[float]:
    """Convierte un string a decimal de forma segura."""
    if not value or value.strip() == '':
        return None
    try:
        return float(value.replace(',', ''))
    except (ValueError, TypeError):
        return None


def load_csv_to_db(conn, file_path: Path, table_name: str, year: int):
    """Carga un archivo CSV a la base de datos."""
    pg, pg_sql = import_psycopg2()
    
    header_row, _ = find_header_row(file_path), None
    
    # Encontrar la fila de headers
    headers, header_row = get_csv_headers(file_path)
    
    # Columnas para insertar (excluyendo id y created_at)
    columns = ['ano_archivo'] + NORMALIZED_HEADERS
    
    # Preparar el COPY
    copy_sql = pg_sql.SQL("COPY {} ({}) FROM STDIN WITH CSV").format(
        pg_sql.Identifier(table_name),
        pg_sql.SQL(', ').join(map(pg_sql.Identifier, columns))
    )
    
    # Procesar el archivo y crear un buffer para COPY
    buffer = io.StringIO()
    rows_processed = 0
    
    with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
        reader = csv.reader(f)
        
        # Saltar las filas de encabezado
        for i in range(header_row + 1):
            next(reader)
        
        for row in reader:
            if len(row) != len(NORMALIZED_HEADERS):
                continue  # Saltar filas con número incorrecto de columnas
            
            # Procesar y limpiar datos
            processed_row = [str(year)]  # ano_archivo
            
            for i, value in enumerate(row):
                value = value.strip()
                header = NORMALIZED_HEADERS[i]
                
                # Convertir campos numéricos (solo ano_corte que debería ser confiable)
                if header == 'ano_corte':
                    int_val = safe_int(value)
                    value = str(int_val) if int_val is not None else ''
                # numero_embarcaciones, duracion, dias_efectivos se mantienen como string por datos erróneos
                elif header in ['peso_desembarcado_kilogramos', 'peso_vivo_kilogramos', 
                               'precio_pesos', 'valor_pesos']:
                    dec_val = safe_decimal(value)
                    value = str(dec_val) if dec_val is not None else ''
                
                # Escapar comillas y limpiar
                value = value.replace('"', '""')
                processed_row.append(value)
            
            # Escribir fila al buffer
            buffer.write(','.join(f'"{v}"' if v else '' for v in processed_row) + '\n')
            rows_processed += 1
            
            # Procesar en lotes para evitar uso excesivo de memoria
            if rows_processed % 10000 == 0:
                print(f"  Procesadas {rows_processed:,} filas...")
    
    # Cargar datos usando COPY
    buffer.seek(0)
    with conn.cursor() as cur:
        cur.copy_expert(copy_sql, buffer)
    conn.commit()
    
    print(f"✓ Cargadas {rows_processed:,} filas de {file_path.name}")
    return rows_processed


def get_existing_years(conn, table_name: str) -> set[int]:
    """Obtiene los años que ya están cargados en la base de datos."""
    pg, _ = import_psycopg2()
    try:
        with conn.cursor() as cur:
            cur.execute(f"SELECT DISTINCT ano_archivo FROM {table_name}")
            return {row[0] for row in cur.fetchall()}
    except pg.errors.UndefinedTable:
        return set()


def main():
    parser = argparse.ArgumentParser(
        description='Carga archivos CSV de producción pesquera a PostgreSQL'
    )
    parser.add_argument(
        '--host', 
        default=os.environ.get('PGHOST', 'localhost'),
        help='Host de PostgreSQL (default: localhost o PGHOST)'
    )
    parser.add_argument(
        '--port', 
        default=os.environ.get('PGPORT', '5432'),
        help='Puerto de PostgreSQL (default: 5432 o PGPORT)'
    )
    parser.add_argument(
        '--database', '-d',
        default=os.environ.get('PGDATABASE', 'fisheries'),
        help='Nombre de la base de datos (default: fisheries o PGDATABASE)'
    )
    parser.add_argument(
        '--user', '-u',
        default=os.environ.get('PGUSER', 'postgres'),
        help='Usuario de PostgreSQL (default: postgres o PGUSER)'
    )
    parser.add_argument(
        '--password', '-p',
        default=os.environ.get('PGPASSWORD', ''),
        help='Contraseña de PostgreSQL (default: PGPASSWORD)'
    )
    parser.add_argument(
        '--data-dir',
        type=Path,
        default=DEFAULT_DATA_DIR,
        help=f'Directorio con archivos CSV (default: {DEFAULT_DATA_DIR})'
    )
    parser.add_argument(
        '--table',
        default=TABLE_NAME,
        help=f'Nombre de la tabla (default: {TABLE_NAME})'
    )
    parser.add_argument(
        '--file', '-f',
        type=Path,
        help='Cargar un archivo específico en lugar de todos'
    )
    parser.add_argument(
        '--force',
        action='store_true',
        help='Forzar recarga de años que ya existen en la BD'
    )
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Solo validar archivos, no cargar datos'
    )
    
    args = parser.parse_args()
    
    # Encontrar archivos CSV
    if args.file:
        csv_files = [args.file]
    else:
        csv_files = sorted(args.data_dir.glob('*.csv'))
    
    if not csv_files:
        print(f"Error: No se encontraron archivos CSV en {args.data_dir}")
        sys.exit(1)
    
    print(f"Encontrados {len(csv_files)} archivos CSV:")
    for f in csv_files:
        year = extract_year_from_filename(f.name)
        print(f"  - {f.name} (año: {year})")
    
    # Validar estructura de todos los archivos
    print("\n📋 Validando estructura de archivos...")
    reference_headers, _ = get_csv_headers(csv_files[0])
    all_valid = True
    
    for csv_file in csv_files:
        if not validate_csv_structure(csv_file, reference_headers):
            all_valid = False
    
    if not all_valid:
        print("\n❌ Error: Los archivos no tienen la misma estructura")
        sys.exit(1)
    
    print("✓ Todos los archivos tienen estructura compatible")
    
    if args.dry_run:
        print("\n🔍 Modo dry-run: no se cargarán datos")
        sys.exit(0)
    
    # Importar psycopg2 (solo necesario si no es dry-run)
    pg, _ = import_psycopg2()
    
    # Conectar a la base de datos
    print(f"\n🔌 Conectando a PostgreSQL ({args.host}:{args.port}/{args.database})...")
    try:
        conn = pg.connect(
            host=args.host,
            port=args.port,
            database=args.database,
            user=args.user,
            password=args.password
        )
    except pg.Error as e:
        print(f"❌ Error de conexión: {e}")
        sys.exit(1)
    
    print("✓ Conexión establecida")
    
    try:
        # Crear tabla
        print(f"\n📦 Creando/verificando tabla '{args.table}'...")
        create_table(conn, args.table)
        
        # Obtener años existentes
        existing_years = get_existing_years(conn, args.table)
        if existing_years:
            print(f"ℹ️  Años ya cargados: {sorted(existing_years)}")
        
        # Cargar archivos
        print("\n📤 Cargando datos...")
        total_rows = 0
        
        for csv_file in csv_files:
            year = extract_year_from_filename(csv_file.name)
            
            if year is None:
                print(f"⚠️  Saltando {csv_file.name}: no se pudo determinar el año")
                continue
            
            if year in existing_years and not args.force:
                print(f"⏭️  Saltando {csv_file.name}: año {year} ya está cargado (usa --force para recargar)")
                continue
            
            if year in existing_years and args.force:
                print(f"🗑️  Eliminando datos existentes del año {year}...")
                with conn.cursor() as cur:
                    cur.execute(f"DELETE FROM {args.table} WHERE ano_archivo = %s", (year,))
                conn.commit()
            
            print(f"\n📂 Procesando {csv_file.name}...")
            rows = load_csv_to_db(conn, csv_file, args.table, year)
            total_rows += rows
        
        print(f"\n✅ Carga completada: {total_rows:,} filas totales")
        
        # Mostrar estadísticas
        with conn.cursor() as cur:
            cur.execute(f"""
                SELECT ano_archivo, COUNT(*) as registros 
                FROM {args.table} 
                GROUP BY ano_archivo 
                ORDER BY ano_archivo
            """)
            print("\n📊 Registros por año:")
            for row in cur.fetchall():
                print(f"  {row[0]}: {row[1]:,} registros")
        
    finally:
        conn.close()
        print("\n🔌 Conexión cerrada")


if __name__ == '__main__':
    main()

