// lib/db.ts
// Configuración de Drizzle ORM con PostgreSQL (Neon)
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Configuración del pool de conexiones con soporte SSL para Neon
const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE || 'fisheries',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  // SSL requerido para Neon
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false,
});

// Crear instancia de Drizzle con el esquema
export const db = drizzle(pool, { schema });

// Exportar el esquema para usarlo en queries
export { schema };

// Exportar el pool por si se necesita acceso directo
export { pool };

// Tipo de la base de datos
export type Database = typeof db;
