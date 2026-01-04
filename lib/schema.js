// lib/schema.js
// Esquema de Drizzle para la base de datos de producción pesquera
import { 
  pgTable, 
  serial, 
  varchar, 
  integer, 
  bigint, 
  decimal, 
  timestamp 
} from 'drizzle-orm/pg-core';

// Tabla principal de producción pesquera
export const produccionPesquera = pgTable('produccion_pesquera', {
  id: serial('id').primaryKey(),
  
  // Información del activo/embarcación
  rnpActivo: bigint('rnp_activo', { mode: 'number' }),
  nombreActivo: varchar('nombre_activo', { length: 255 }),
  
  // Sitio de desembarque
  claveSitioDesembarque: varchar('clave_sitio_desembarque', { length: 50 }),
  nombreSitioDesembarque: varchar('nombre_sitio_desembarque', { length: 255 }),
  
  // Unidad económica
  rnpaUnidadEconomica: bigint('rnpa_unidad_economica', { mode: 'number' }),
  unidadEconomica: varchar('unidad_economica', { length: 500 }),
  
  // Ubicación/Oficina
  nombreEstado: varchar('nombre_estado', { length: 100 }),
  claveOficina: varchar('clave_oficina', { length: 20 }),
  nombreOficina: varchar('nombre_oficina', { length: 255 }),
  
  // Información del aviso
  tipoAviso: varchar('tipo_aviso', { length: 50 }),
  folioAviso: varchar('folio_aviso', { length: 50 }),
  fechaAviso: varchar('fecha_aviso', { length: 50 }),
  
  // Origen y lugar de captura
  origen: varchar('origen', { length: 100 }),
  claveLugarCaptura: varchar('clave_lugar_captura', { length: 50 }),
  nombreLugarCaptura: varchar('nombre_lugar_captura', { length: 255 }),
  
  // Información de la operación
  numeroEmbarcaciones: integer('numero_embarcaciones'),
  mesCorte: varchar('mes_corte', { length: 50 }),
  anoCorte: integer('ano_corte'),
  periodoInicio: varchar('periodo_inicio', { length: 50 }),
  periodoFin: varchar('periodo_fin', { length: 50 }),
  duracion: integer('duracion'),
  diasEfectivos: integer('dias_efectivos'),
  tipoZona: varchar('tipo_zona', { length: 50 }),
  produccionAcuacultural: varchar('produccion_acuacultural', { length: 10 }),
  
  // Permisos
  numeroPermiso: varchar('numero_permiso', { length: 100 }),
  fechaExpedicion: varchar('fecha_expedicion', { length: 50 }),
  fechaVigencia: varchar('fecha_vigencia', { length: 50 }),
  
  // Especie
  nombrePrincipal: varchar('nombre_principal', { length: 255 }),
  claveEspecie: varchar('clave_especie', { length: 50 }),
  nombreEspecie: varchar('nombre_especie', { length: 500 }),
  
  // Producción
  pesoDesembarcadoKilogramos: decimal('peso_desembarcado_kilogramos', { precision: 15, scale: 2 }),
  pesoVivoKilogramos: decimal('peso_vivo_kilogramos', { precision: 15, scale: 2 }),
  precioPesos: decimal('precio_pesos', { precision: 15, scale: 2 }),
  valorPesos: decimal('valor_pesos', { precision: 15, scale: 2 }),
  
  // Región
  litoral: varchar('litoral', { length: 100 }),
  
  // Metadatos
  createdAt: timestamp('created_at').defaultNow(),
});

