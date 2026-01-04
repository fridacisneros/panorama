// lib/db.js
// Configuración de Drizzle ORM con PostgreSQL
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Configuración del pool de conexiones
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'fisheries',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Crear instancia de Drizzle con el esquema
export const db = drizzle(pool, { schema });

// Exportar el esquema para usarlo en queries
export { schema };

// Exportar el pool por si se necesita acceso directo
export { pool };
