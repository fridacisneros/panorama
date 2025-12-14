-- Schema para datos de producción pesquera
-- Este archivo se ejecuta automáticamente si usas Docker con PostgreSQL

-- Crear la base de datos si no existe (ejecutar manualmente si es necesario)
-- CREATE DATABASE fisheries;

-- Tabla principal para datos de producción pesquera
CREATE TABLE IF NOT EXISTS produccion_pesquera (
    id SERIAL PRIMARY KEY,
    ano_archivo INTEGER NOT NULL,  -- Año del archivo CSV de origen
    
    -- Información del activo/embarcación
    rnp_activo BIGINT,  -- NULL si no es número válido
    nombre_activo VARCHAR(255),
    
    -- Sitio de desembarque
    clave_sitio_desembarque VARCHAR(50),
    nombre_sitio_desembarque VARCHAR(255),
    
    -- Unidad económica
    rnpa_unidad_economica BIGINT,  -- NULL si no es número válido
    unidad_economica VARCHAR(500),
    
    -- Ubicación/Oficina
    nombre_estado VARCHAR(100),
    clave_oficina VARCHAR(20),
    nombre_oficina VARCHAR(255),
    
    -- Información del aviso
    tipo_aviso VARCHAR(50),
    folio_aviso VARCHAR(50),
    fecha_aviso VARCHAR(50),
    
    -- Origen y lugar de captura
    origen VARCHAR(100),
    clave_lugar_captura VARCHAR(50),
    nombre_lugar_captura VARCHAR(255),
    
    -- Información de la operación
    numero_embarcaciones INTEGER,  -- NULL si el valor original es inválido
    mes_corte VARCHAR(50),
    ano_corte INTEGER,
    periodo_inicio VARCHAR(50),
    periodo_fin VARCHAR(50),
    duracion INTEGER,  -- NULL si el valor original es inválido
    dias_efectivos INTEGER,  -- NULL si el valor original es inválido
    tipo_zona VARCHAR(50),
    produccion_acuacultural VARCHAR(10),
    
    -- Permisos
    numero_permiso VARCHAR(100),
    fecha_expedicion VARCHAR(50),
    fecha_vigencia VARCHAR(50),
    
    -- Especie
    nombre_principal VARCHAR(255),
    clave_especie VARCHAR(50),
    nombre_especie VARCHAR(500),
    
    -- Producción
    peso_desembarcado_kilogramos DECIMAL(15,2),
    peso_vivo_kilogramos DECIMAL(15,2),
    precio_pesos DECIMAL(15,2),
    valor_pesos DECIMAL(15,2),
    
    -- Región
    litoral VARCHAR(100),
    
    -- Metadatos
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento de consultas comunes
CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_ano_archivo 
    ON produccion_pesquera(ano_archivo);

CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_nombre_estado 
    ON produccion_pesquera(nombre_estado);

CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_nombre_especie 
    ON produccion_pesquera(nombre_especie);

CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_litoral 
    ON produccion_pesquera(litoral);

CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_ano_corte 
    ON produccion_pesquera(ano_corte);

CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_mes_corte 
    ON produccion_pesquera(mes_corte);

CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_nombre_principal 
    ON produccion_pesquera(nombre_principal);

-- Índice compuesto para consultas de producción por año y estado
CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_ano_estado 
    ON produccion_pesquera(ano_archivo, nombre_estado);

-- Índice compuesto para consultas de producción por año y especie
CREATE INDEX IF NOT EXISTS idx_produccion_pesquera_ano_especie 
    ON produccion_pesquera(ano_archivo, nombre_especie);

-- Comentarios descriptivos
COMMENT ON TABLE produccion_pesquera IS 'Datos de producción pesquera reportados en avisos de arribo y cosecha';
COMMENT ON COLUMN produccion_pesquera.ano_archivo IS 'Año del archivo CSV de donde provienen los datos';
COMMENT ON COLUMN produccion_pesquera.peso_desembarcado_kilogramos IS 'Peso desembarcado en kilogramos';
COMMENT ON COLUMN produccion_pesquera.peso_vivo_kilogramos IS 'Peso vivo en kilogramos';
COMMENT ON COLUMN produccion_pesquera.valor_pesos IS 'Valor en pesos mexicanos';

